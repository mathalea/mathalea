import { Point } from './Point';
import { Measure } from '../measures/Measure';
import { Coords } from '../others/Coords';
import { randint } from '../../calculus/random';
import { Const } from '../measures/Const';
export class PointOnLine extends Point {
    constructor(L, { label, k, length, style = 'x', size = 0.15, thickness = 3, color = 'Gray', draggable = true, temp = false } = {}) {
        super(L.parentFigure, 0, 0, { style, size, thickness, color, draggable, temp });
        const Llength = Point.distance(L.A, L.B);
        if (!(length instanceof Measure)) {
            this.length = new Const(L.parentFigure, length || randint(15, 85) * Llength / 100);
        }
        else {
            this.length = length;
            length.addChild(this);
        }
        if (k === undefined) {
            k = this.length.value / Llength;
        }
        const [Mx, My] = [(1 - k) * L.A.x + k * L.B.x, (1 - k) * L.A.y + k * L.B.y];
        this.x = Mx;
        this.y = My;
        this.line = L;
        this.k = new Const(L.parentFigure, k);
        this.moveTo(Mx, My);
        if (label !== undefined)
            this.label = label;
        this.line.addChild(this);
    }
    update() {
        try {
            const L = this.line;
            const Llength = Point.distance(L.A, L.B);
            this.k.value = this.length.value / (Llength === 0 ? 1 : Llength);
            this.moveTo((1 - this.k.value) * L.A.x + this.k.value * L.B.x, (1 - this.k.value) * L.A.y + this.k.value * L.B.y);
        }
        catch (error) {
            console.log('Erreur dans PointOnLine.update()', error);
            this.exist = false;
        }
    }
    moveTo(x, y) {
        try {
            const L = this.line;
            const P = { x, y };
            const M = Coords.orthogonalProjectionCoord(P, L);
            this.k.value = (L.B.x - L.A.x) === 0 ? (L.B.y - L.A.y) === 0 ? this.k.value : (M.y - L.A.y) / (L.B.y - L.A.y) : (M.x - L.A.x) / (L.B.x - L.A.x);
            this.length.value = this.k.value * Point.distance(L.A, L.B);
            super.moveTo(M.x, M.y);
        }
        catch (error) {
            console.log('Erreur dans PointOnLine.moveTo()', error);
            this.exist = false;
        }
    }
    notifyPointerMove(x, y) {
        if (this.draggable) {
            this.moveTo(x, y);
        }
    }
}
//# sourceMappingURL=PointOnLine.js.map