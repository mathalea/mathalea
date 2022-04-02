import { randint } from '../../calculus/random';
import { Angle } from '../measures/Angle';
import { Const } from '../measures/Const';
import { Coords } from '../others/Coords';
import { Point } from './Point';
import { PointByHomothetie } from './PointByHomothetie';
export class PointOnCircle extends Point {
    constructor(C, { label, angle = randint(-180, 180), style = 'x', size = 0.15, thickness = 3, color = 'Gray', draggable = true, temp = false } = {}) {
        super(C.parentFigure, 0, 0, { draggable, style, color, size, thickness, temp });
        if (typeof angle === 'number')
            this.angle = new Const(C.parentFigure, angle);
        else {
            this.angle = angle;
            angle.addChild(this);
        }
        const coords = Coords.rotationCoord(C.M, C.center, this.angle.value);
        this.x = coords.x;
        this.y = coords.y;
        this.circle = C;
        if (label !== undefined)
            this.label = label;
        C.addChild(this);
        this.update();
    }
    moveTo(x, y) {
        try {
            const O = this.circle.center;
            const P = new Point(this.circle.parentFigure, x, y, { temp: true });
            const M = new PointByHomothetie(P, O, this.circle.radius / Point.distance(O, P), { temp: true });
            this.angle.value = this.circle.pointOnCircle ? Angle.angleOriented(this.circle.pointOnCircle, this.circle.center, M) : Angle.angleOriented(this.circle.M, this.circle.center, M);
            super.moveTo(M.x, M.y);
        }
        catch (error) {
            console.log('Erreur dans PointOnCircle.moveTo()', error);
            this.exist = false;
        }
    }
    update() {
        try {
            const C = this.circle;
            const coords = C.pointOnCircle ? Coords.rotationCoord(C.pointOnCircle, C.center, this.angle.value) : Coords.rotationCoord(C.M, C.center, this.angle.value);
            this.moveTo(coords.x, coords.y);
        }
        catch (error) {
            console.log('Erreur dans PointOnCircle.update()', error);
            this.exist = false;
        }
    }
    notifyPointerMove(x, y) {
        if (this.draggable) {
            this.moveTo(x, y);
        }
    }
}
//# sourceMappingURL=PointOnCircle.js.map