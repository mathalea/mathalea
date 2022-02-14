import { segment, polygone, tracePoint, labelPoint, point, mathalea2d, droite } from '../../../modules/2d.js';
import { context } from '../../../modules/context.js';
import { Point, Line, Segment } from './elements.js';
export function getMathalea2DExport(graphic) {
    const objs = [];
    for (const obj of graphic.geometric.filter(x => x.visible)) {
        if (obj instanceof Point) {
            const splitname = obj.name.split('_');
            obj.name = splitname.length === 1 ? splitname[0] : `${splitname[0]}_{${splitname[1]}}`;
            if (context.isHtml)
                obj.name = `$${obj.name}$`;
            const newPoint = point(obj.x, obj.y, obj.name, 'above');
            objs.push(tracePoint(newPoint));
            objs.push(labelPoint(newPoint));
        }
        if (obj instanceof Line && !(obj instanceof Segment)) {
            objs.push(droite(obj.a, obj.b, -obj.c));
        }
        if (obj instanceof Segment) {
            objs.push(segment(obj.A, obj.B));
        }
    }
    graphic.resize();
    const scaleppc = 20 / graphic.ppc;
    const clip = { xmin: graphic.xmin - scaleppc, xmax: graphic.xmax + scaleppc, ymin: graphic.ymin - scaleppc, ymax: graphic.ymax + scaleppc };
    const drawClip = polygone(point(clip.xmin, clip.ymin), point(clip.xmax, clip.ymin), point(clip.xmax, clip.ymax), point(clip.xmin, clip.ymax));
    objs.push(drawClip);
    return mathalea2d(Object.assign({ mainlevee: false, pixelsParCm: graphic.ppc, scale: graphic.scale }, clip), objs);
}
