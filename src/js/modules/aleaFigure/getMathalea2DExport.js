<<<<<<< HEAD
import { texteSurSegment, arcPointPointAngle, cercle, segment, polygone, point, mathalea2d } from '../2d.js';
import { Polygon, Angle, Point, Line, Segment, Circle } from './elements.js';
export function getMathalea2DExport(graphic) {
    graphic.resize();
    const scaleppc = 20 / graphic.ppc;
    const clip = { xmin: graphic.xmin - scaleppc, xmax: graphic.xmax + scaleppc, ymin: graphic.ymin - scaleppc, ymax: graphic.ymax + scaleppc };
    // On ajoute tous les éléments
    const objs = [];
    if (graphic.clipVisible) {
        const drawClip = polygone(point(clip.xmin, clip.ymin), point(clip.xmax, clip.ymin), point(clip.xmax, clip.ymax), point(clip.xmin, clip.ymax));
        objs.push(drawClip);
    }
    for (const obj of graphic.geometric.filter(x => x.visible)) {
        if (obj instanceof Point) {
            if (obj.dot !== '')
                objs.push(obj.dot);
            if (obj.label) {
                objs.push(obj.showName(scaleppc));
            }
        }
        else if (obj instanceof Line && !(obj instanceof Segment)) {
            // objs.push(droite(obj.a, obj.b, -obj.c))
            const points = graphic.getExtremPointGraphicLine(obj);
            if (points !== undefined)
                objs.push(segment(...points, obj.color));
        }
        else if (obj instanceof Segment) {
            objs.push(segment(obj.A, obj.B, obj.color));
            if (obj.label) {
                objs.push(obj.showLabel(scaleppc));
            }
            if (obj.text !== '') {
                const points = obj.direct ? [obj.A.M2D, obj.B.M2D] : [obj.B.M2D, obj.A.M2D];
                objs.push(texteSurSegment(obj.text, points[0], points[1], obj.textColor, 0.5 * scaleppc));
            }
        }
        else if (obj instanceof Circle) {
            objs.push(cercle(obj.A, obj.r));
        }
        else if (obj instanceof Angle) {
            if (Math.abs(obj.angle).toFixed(13) === (Math.PI / 2).toFixed(13) && obj.right) {
                const P1 = obj.A;
                const P3 = obj.C;
                const S = obj.B;
                const v1 = P1.sub(S).getVector().getNormed().multiply(scaleppc * 0.7);
                const v3 = P3.sub(S).getVector().getNormed().multiply(scaleppc * 0.7);
                const P = S.add(v1.add(v3)); // .add(corr)
                P.showDot();
                objs.push(...graphic.addSidesPolygon(S, S.add(v1), P, S.add(v3)).map(x => segment(x.A, x.B, obj.color)));
                /* objs.push(codageAngleDroit(
=======
import { texteSurSegment, arcPointPointAngle, cercle, segment, polygone, point, mathalea2d } from '../2d.js'
import { Polygon, Angle, Point, Line, Segment, Circle } from './elements.js'
export function getMathalea2DExport (graphic) {
  graphic.resize()
  const scaleppc = 20 / graphic.ppc
  const clip = { xmin: graphic.xmin - scaleppc, xmax: graphic.xmax + scaleppc, ymin: graphic.ymin - scaleppc, ymax: graphic.ymax + scaleppc }
  // On ajoute tous les éléments
  const objs = []
  if (graphic.clipVisible) {
    const drawClip = polygone(point(clip.xmin, clip.ymin), point(clip.xmax, clip.ymin), point(clip.xmax, clip.ymax), point(clip.xmin, clip.ymax))
    objs.push(drawClip)
  }
  for (const obj of graphic.geometric.filter(x => x.visible)) {
    if (obj instanceof Point) {
      if (obj.dot !== '') { objs.push(obj.dot) }
      if (obj.label) {
        objs.push(obj.showName(scaleppc))
      }
    } else if (obj instanceof Line && !(obj instanceof Segment)) {
      // objs.push(droite(obj.a, obj.b, -obj.c))
      const points = graphic.getExtremPointGraphicLine(obj)
      if (points !== undefined) { objs.push(segment(...points, obj.color)) }
    } else if (obj instanceof Segment) {
      objs.push(segment(obj.A, obj.B, obj.color))
      if (obj.label) {
        objs.push(obj.showLabel(scaleppc))
      }
      if (obj.text !== '') {
        const points = obj.direct ? [obj.A.M2D, obj.B.M2D] : [obj.B.M2D, obj.A.M2D]
        objs.push(texteSurSegment(obj.text, points[0], points[1], obj.textColor, 0.5 * scaleppc))
      }
    } else if (obj instanceof Circle) {
      objs.push(cercle(obj.A, obj.r))
    } else if (obj instanceof Angle) {
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
>>>>>>> fpiou-3L13-4
                  point(obj.A.x,obj.A.y),
                  point(obj.B.x,obj.B.y),
                  point(obj.C.x,obj.C.y),
                  obj.color,
                  scaleppc
                  )
<<<<<<< HEAD
                )*/
            }
            else if (obj instanceof Polygon) {
                if (obj.showLabels) {
                    obj.vertices.forEach(P => {
                        objs.push(P.showName(scaleppc));
                    });
                }
                else {
                }
            }
            else {
                obj.scale(scaleppc);
                // const extrems = obj.direct ? [point(obj.A.x,obj.A.y), point(obj.C.x,obj.C.y)] : [point(obj.C.x,obj.C.y), point(obj.A.x,obj.A.y)]
                const extrems = obj.direct ? [obj.A.M2D, obj.C.M2D] : [obj.C.M2D, obj.A.M2D];
                objs.push(arcPointPointAngle(...extrems, obj.angle / Math.PI * 180, obj.fillColor !== 'none' ? obj.rayon : true, obj.fillColor, obj.color, obj.fillOpacity));
            }
        }
        else {
            objs.push(obj);
        }
    }
    return mathalea2d(Object.assign({ mainlevee: false, pixelsParCm: graphic.ppc, scale: graphic.scale * 0.7 }, clip), objs);
=======
                ) */
      } else if (obj instanceof Polygon) {
        if (obj.showLabels) {
          obj.vertices.forEach(P => {
            objs.push(P.showName(scaleppc))
          })
        } else {
        }
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
  return mathalea2d(Object.assign({ mainlevee: false, pixelsParCm: graphic.ppc, scale: graphic.scale * 0.7 }, clip), objs)
>>>>>>> fpiou-3L13-4
}
