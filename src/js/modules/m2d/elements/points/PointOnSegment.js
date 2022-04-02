import { Point } from './Point';
import { PointOnLine } from './PointOnLine';
import { Measure } from '../measures/Measure';
import { Coords } from '../others/Coords';
import { Const } from '../measures/Const';
export class PointOnSegment extends PointOnLine {
    constructor(L, { label, length, style = 'x', size = 0.15, thickness = 3, color = 'Gray', draggable = true, temp = false } = {}) {
        super(L, { length, style, size, thickness, color, draggable, temp });
        const Llength = Point.distance(L.A, L.B);
        if (!(length instanceof Measure)) {
            this.length = new Const(L.parentFigure, length === undefined ? length = Llength / 2 : length < 0 ? 0 : Math.min(length, Llength));
        }
        else {
            this.length = length;
            if (this.length.value > Llength)
                this.length.value = Llength;
            if (this.length.value < 0)
                this.length.value = 0;
        }
        this.size = size;
        this.style = style;
        this.thickness = thickness;
        this.color = color;
        this.draggable = draggable;
        this.temp = temp;
        if (label !== undefined)
            this.label = label;
        this.k.value = (length instanceof Measure ? length.value : length) / Llength;
        this.update();
    }
    moveTo(x, y) {
        try {
            const L = this.line;
            const P = { x, y };
            const M = Coords.orthogonalProjectionCoord(P, L);
            const [A, B] = [this.line.A, this.line.B];
            if (M.x < Math.min(A.x, B.x) || M.x > Math.max(A.x, B.x) || M.y < Math.min(A.y, B.y) || M.y > Math.max(A.y, B.y))
                return;
            this.k.value = (L.B.x - L.A.x) === 0 ? (L.B.y - L.A.y) === 0 ? this.k.value : (M.y - L.A.y) / (L.B.y - L.A.y) : (M.x - L.A.x) / (L.B.x - L.A.x);
            this.length.value = this.k.value * Point.distance(L.A, L.B);
            super.moveTo(M.x, M.y);
        }
        catch (error) {
            console.log('Erreur dans PointOnSegment.moveTo()', error);
            this.exist = false;
        }
    }
}
//# sourceMappingURL=PointOnSegment.js.map