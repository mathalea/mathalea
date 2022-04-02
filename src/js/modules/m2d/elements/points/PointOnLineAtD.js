import { Point } from './Point';
import { PointByHomothetie } from './PointByHomothetie';
import { Coords } from '../others/Coords';
import { Const } from '../measures/Const';
export class PointOnLineAtD extends Point {
    constructor(L, d, { label, style = 'x', size = 0.15, thickness = 3, color = 'Gray', draggable = false, temp = false } = {}) {
        const length = Point.distance(L.A, L.B);
        super(L.parentFigure, 0, 0, { style, size, thickness, color, draggable, temp });
        this.line = L;
        this.line.addChild(this);
        if (typeof d === 'number')
            this.d = new Const(L.parentFigure, d);
        else {
            this.d = d;
            d.addChild(this);
        }
        const M = new PointByHomothetie(L.B, L.A, this.d.value / (length === 0 ? 1 : length), { temp: true });
        this.x = M.x;
        this.y = M.y;
        this.moveTo(M.x, M.y);
        this.length = new Const(L.parentFigure, length);
        if (label !== undefined)
            this.label = label;
        this.exist = this.d.exist && L.exist;
    }
    update() {
        try {
            const L = this.line;
            const dist = this.d.value;
            const Llength = Point.distance(L.A, L.B);
            const coords = Coords.homothetieCoord(L.B, L.A, dist / (Llength === 0 ? 1 : Llength));
            this.moveTo(coords.x, coords.y);
        }
        catch (error) {
            console.log('Erreur dans PointOnLineAtD.update()', error);
            this.exist = false;
        }
    }
}
//# sourceMappingURL=PointOnLineAtD.js.map