import { Element2D } from '../Element2D';
import { Point } from '../points/Point';
export class VectorByPoints extends Element2D {
    constructor(arg1, arg2, { color = 'black', thickness = 1, dashed = false } = {}) {
        super(arg1.parentFigure);
        if (arg1 instanceof Point && arg2 instanceof Point) {
            this.origin = arg1;
            this.end = arg2;
            this.x = arg2.x - arg1.x;
            this.y = arg2.y - arg1.y;
            if (!arg1.temp)
                arg1.addChild(this);
            if (!arg2.temp)
                arg2.addChild(this);
            this.color = color;
            this.thickness = thickness;
            this.dashed = dashed;
        }
        else {
            throw new Error('Les paramètres doivent être 2 points.');
        }
    }
    get norme() {
        try {
            return Math.hypot(this.x, this.y);
        }
        catch (error) {
            console.log('Erreur dans VectorByPoints.norme', error);
            return NaN;
        }
    }
    multiply(v) {
        try {
            return (this.x * v.x) + (this.y * v.y);
        }
        catch (error) {
            console.log('Erreur dans VectorByPoints.multiply(vector)', error);
            return NaN;
        }
    }
    update() {
        try {
            this.x = this.end.x - this.origin.x;
            this.y = this.end.y - this.origin.y;
        }
        catch (error) {
            console.log('Erreur dans VectorByPoints.update()', error);
            this.exist = false;
        }
        this.notifyAllChilds();
    }
}
//# sourceMappingURL=VectorByPoints.js.map