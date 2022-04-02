import { Circle } from './elements/lines/Circle';
import { Line } from './elements/lines/Line';
import { Segment } from './elements/lines/Segment';
import { Point } from './elements/points/Point';
export function loadJson(save, figure) {
    const elements = [];
    const exIds = {};
    for (const e in save) {
        if (save[e].className === 'Point') {
            const x = save[e].arguments[0];
            const y = save[e].arguments[1];
            const A = new Point(figure, x, y);
            elements.push(A);
            exIds[e] = A;
        }
        if (save[e].className === 'Segment') {
            const id1 = save[e].arguments[0];
            const id2 = save[e].arguments[1];
            const A = exIds[id1];
            const B = exIds[id2];
            const s = new Segment(A, B);
            elements.push(s);
        }
        if (save[e].className === 'Line') {
            const id1 = save[e].arguments[0];
            const id2 = save[e].arguments[1];
            const A = exIds[id1];
            const B = exIds[id2];
            const s = new Line(A, B);
            elements.push(s);
        }
        if (save[e].className === 'CircleCenterRadius') {
            const id = save[e].arguments[0];
            const radius = save[e].arguments[1];
            const center = exIds[id];
            const c = new Circle(center, radius);
            elements.push(c);
        }
        if (save[e].className === 'CircleCenterPointOrMeasure') {
            const id1 = save[e].arguments[0];
            const id2 = save[e].arguments[1];
            const O = exIds[id1];
            const M = exIds[id2];
            const c = new Circle(O, M);
            elements.push(c);
        }
    }
    return elements;
}
//# sourceMappingURL=load.js.map