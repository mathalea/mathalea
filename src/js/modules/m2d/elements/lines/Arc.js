import { Element2D } from '../Element2D';
import { Angle } from '../measures/Angle';
import { Const } from '../measures/Const';
import { Coords } from '../others/Coords';
import { Point } from '../points/Point';
export class Arc extends Element2D {
    constructor(O, A, angle, { color = 'black', thickness = 1, dashed = false, fill = 'none' } = {}) {
        super(O.parentFigure);
        this.center = O;
        this.point = A;
        if (typeof angle === 'number')
            this.angle = new Const(O.parentFigure, angle);
        else {
            this.angle = angle;
            angle.addChild(this);
        }
        this.parentFigure.set.add(this);
        const B = Coords.rotationCoord(A, O, this.angle.value);
        this.point2 = B;
        this._label = (O.label ?? '') + (A.label ?? '') + ' ' + this.angle.value.toString() + '°';
        this.horiz = { x: this.center.x + 1, y: this.center.y };
        const radius = this.parentFigure.xToSx(Point.distance(O, A));
        const [large, sweep] = getLargeSweep(this.angle.value);
        this.g = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.g.setAttribute('d', `M${this.parentFigure.xToSx(A.x)} ${this.parentFigure.yToSy(A.y)} A ${radius} ${radius} 0 ${large} ${sweep} ${this.parentFigure.xToSx(B.x)} ${this.parentFigure.yToSy(B.y)}`);
        this.color = color;
        this.fill = fill;
        this.thickness = thickness;
        this.dashed = dashed;
        this.parentFigure.svg.appendChild(this.g);
        A.addChild(this);
        O.addChild(this);
    }
    update() {
        try {
            const [large, sweep] = getLargeSweep(this.angle.value);
            this.point2 = Coords.rotationCoord(this.point, this.center, this.angle.value);
            const d = this.parentFigure.xToSx(Point.distance(this.center, this.point));
            this.g.setAttribute('d', `M${this.parentFigure.xToSx(this.point.x)} ${this.parentFigure.yToSy(this.point.y)} A ${d} ${d} 0 ${large} ${sweep} ${this.parentFigure.xToSx(this.point2.x)} ${this.parentFigure.yToSy(this.point2.y)}`);
        }
        catch (error) {
            console.log('Erreur dans Arc.update()', error);
            this.exist = false;
        }
    }
    get latex() {
        if (!this.isVisible || !this.exist)
            return '';
        try {
            const radius = Point.distance(this.center, this.point);
            const azimut = Angle.angleOriented(this.horiz, this.center, this.point);
            const anglefin = azimut + this.angle.value;
            let latex = `\n\n\t% Arc ${this._label}`;
            latex += `\n\t\\draw${this.tikzOptions} (${this.point.x},${this.point.y}) arc (${azimut}:${anglefin}:${radius}) ;`;
            return latex;
        }
        catch (error) {
            return '';
        }
    }
}
function getLargeSweep(angle) {
    try {
        let large;
        let sweep;
        if (angle > 180) {
            angle = angle - 360;
            large = 1;
            sweep = 0;
        }
        else if (angle < -180) {
            angle = 360 + angle;
            large = 1;
            sweep = 1;
        }
        else {
            large = 0;
            sweep = (angle > 0) ? 0 : 1;
        }
        return [large, sweep];
    }
    catch (error) {
        return [NaN, NaN];
    }
}
//# sourceMappingURL=Arc.js.map