import { texteSurSegment, arcPointPointAngle, cercle, segment, polygone, point, mathalea2d } from '../2d.js'
import { GVPolygon, GVAngle, GVPoint, GVLine, GVSegment, GVCircle } from './elements.js'
import { GVGraphicView } from './graphicView.js'
export function getMathalea2DExport (graphic: GVGraphicView) {
  if (graphic.allowResize) graphic.resize()
  const scaleppc = 20 / graphic.ppc
  const clip = { xmin: graphic.xmin - scaleppc, xmax: graphic.xmax + scaleppc, ymin: graphic.ymin - scaleppc, ymax: graphic.ymax + scaleppc }

  // On ajoute tous les éléments
  const objs = []

  if (graphic.clipVisible) {
    const drawClip = polygone(
      point(clip.xmin, clip.ymin),
      point(clip.xmax, clip.ymin),
      point(clip.xmax, clip.ymax),
      point(clip.xmin, clip.ymax)
    )
    objs.push(drawClip)
  }

  for (const obj of graphic.geometricExport.filter(x => x.visible)) {
    if (obj instanceof GVPoint) {
      if (obj.dot !== '') objs.push(obj.dot)
      if (obj.label) {
        objs.push(obj.showName(scaleppc))
      }
    } else if (obj instanceof GVLine && !(obj instanceof GVSegment)) {
      // objs.push(droite(obj.a, obj.b, -obj.c))
      const points = graphic.getExtremPointGraphicLine(obj)
      if (points !== undefined) objs.push(segment(...points, obj.color))
    } else if (obj instanceof GVSegment) {
      objs.push(segment(obj.A, obj.B, obj.color))
      if (obj.label) {
        objs.push(obj.showLabel(scaleppc))
      }
      if (obj.text !== '') {
        const points = obj.direct ? [obj.A.M2D, obj.B.M2D] : [obj.B.M2D, obj.A.M2D]
        objs.push(texteSurSegment(obj.text, points[0], points[1], obj.textColor, 0.5 * scaleppc))
      }
    } else if (obj instanceof GVCircle) {
      objs.push(cercle(obj.A, obj.r))
    } else if (obj instanceof GVAngle) {
      if (Math.abs(obj.angle).toFixed(13) === (Math.PI / 2).toFixed(13) && obj.right) {
        const P1 = obj.A
        const P3 = obj.C
        const S = obj.B
        const v1 = P1.sub(S).getVector().getNormed().multiply(scaleppc * 0.7)
        const v3 = P3.sub(S).getVector().getNormed().multiply(scaleppc * 0.7)
        const P = S.add(v1.add(v3)) // .add(corr)
        P.showDot()
        objs.push(...graphic.addSidesPolygon(S, S.add(v1), P, S.add(v3)).map(x => segment(x.A, x.B, obj.color)))
        /* objs.push(codageAngleDroit(
           point(obj.A.x,obj.A.y),
           point(obj.B.x,obj.B.y),
           point(obj.C.x,obj.C.y),
           obj.color,
           scaleppc
           )
         ) */
      } else if (obj instanceof GVPolygon) {
        if (obj.showLabels) {
          obj.vertices.forEach(P => {
            objs.push(P.showName(scaleppc))
          })
        } /*
        else {
        }
        */
      } else {
        obj.scale(scaleppc)
        // const extrems = obj.direct ? [point(obj.A.x,obj.A.y), point(obj.C.x,obj.C.y)] : [point(obj.C.x,obj.C.y), point(obj.A.x,obj.A.y)]
        const extrems = obj.direct ? [obj.A.M2D, obj.C.M2D] : [obj.C.M2D, obj.A.M2D]
        objs.push(arcPointPointAngle(...extrems, obj.angle / Math.PI * 180, obj.fillColor !== 'none' ? obj.rayon : true, obj.fillColor, obj.color, obj.fillOpacity))
      }
    } else {
      objs.push(obj)
    }
  }
  for (const obj of graphic.grid) {
    const points = graphic.getExtremPointGraphicLine(obj)
    if (points !== undefined) objs.push(segment(...points, obj.color))
  }
  for (const obj of graphic.axes) {
    const points = graphic.getExtremPointGraphicLine(obj)
    const arrow = segment(...points, obj.color)
    arrow.styleExtremites = '->'
    if (points !== undefined) objs.push(arrow)
  }
  return mathalea2d(Object.assign({ mainlevee: false, pixelsParCm: graphic.ppc, scale: graphic.scale * 0.7 }, clip), objs)
}
