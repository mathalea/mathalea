import { cercle, segment, polygone, point, mathalea2d, droite } from '../../../modules/2d.js';
import { Point, Line, Segment, Circle } from './elements.js';
export function getMathalea2DExport(graphic) {
    graphic.resize();
    const scaleppc = 20 / graphic.ppc;
    const clip = { xmin: graphic.xmin - scaleppc, xmax: graphic.xmax + scaleppc, ymin: graphic.ymin - scaleppc, ymax: graphic.ymax + scaleppc };
    const drawClip = polygone(point(clip.xmin, clip.ymin), point(clip.xmax, clip.ymin), point(clip.xmax, clip.ymax), point(clip.xmin, clip.ymax));
    // objs.push(drawClip)
    // On ajoute tous les éléments
    const objs = [];
    for (const obj of graphic.geometric.filter(x => x.visible)) {
        if (obj instanceof Point) {
            if (obj.dot !== '')
                objs.push(obj.dot);
            if (obj.label) {
                objs.push(obj.showLabel(scaleppc));
            }
        }
        else if (obj instanceof Line && !(obj instanceof Segment)) {
            objs.push(droite(obj.a, obj.b, -obj.c));
        }
        else if (obj instanceof Segment) {
            objs.push(segment(obj.A, obj.B));
        }
        else if (obj instanceof Circle) {
            objs.push(cercle(obj.A, obj.r));
        }
        else {
            objs.push(obj);
        }
    }
    return mathalea2d(Object.assign({ mainlevee: false, pixelsParCm: graphic.ppc, scale: graphic.scale * 0.7 }, clip), objs);
}
