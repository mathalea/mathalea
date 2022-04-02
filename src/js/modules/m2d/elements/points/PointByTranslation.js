import { Const } from './../measures/Const';
import { Measure } from '../measures/Measure';
import { Point } from './Point';
export class PointByTranslation extends Point {
    constructor(A, xt, yt, { label, style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false } = {}) {
        super(A.parentFigure, A.x, A.y, { style, size, thickness, color, draggable, temp });
        if (typeof xt === 'number') {
            xt = new Const(A.parentFigure, xt);
        }
        else {
            xt.addChild(this);
        }
        if (typeof yt === 'number') {
            yt = new Const(A.parentFigure, yt);
        }
        else {
            yt.addChild(this);
        }
        this.moveTo(A.x + xt.value, A.y + yt.value);
        this.xt = xt;
        this.yt = yt;
        this.previous = A;
        if (label !== undefined)
            this.label = label;
        A.addChild(this);
    }
    update() {
        try {
            this.moveTo(this.previous.x + (this.xt instanceof Measure ? this.xt.value : this.xt), this.previous.y + (this.yt instanceof Measure ? this.yt.value : this.yt));
        }
        catch (error) {
            console.log('Erreur dans PointByTranslation.update()', error);
            this.exist = false;
        }
    }
}
//# sourceMappingURL=PointByTranslation.js.map