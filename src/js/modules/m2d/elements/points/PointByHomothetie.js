import { Const } from '../measures/Const';
import { Measure } from '../measures/Measure';
import { Point } from './Point';
export class PointByHomothetie extends Point {
    constructor(A, center, k, { label, style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false } = {}) {
        const x = (center.x + (k instanceof Measure ? k.value : k) * (A.x - center.x));
        const y = (center.y + (k instanceof Measure ? k.value : k) * (A.y - center.y));
        super(A.parentFigure, x, y, { style, size, thickness, color, draggable, temp, exist: !isNaN(x) });
        this.center = center;
        if (typeof k === 'number')
            this.k = new Const(A.parentFigure, k);
        else {
            this.k = k;
            k.addChild(this);
        }
        this.previous = A;
        if (label !== undefined)
            this.label = label;
        A.addChild(this);
        center.addChild(this);
        if (isNaN(this.k.value))
            this.exist = false;
        else
            this.exist = true;
    }
    update() {
        try {
            const rapport = this.k.value;
            if (!isNaN(rapport)) {
                const x = (this.center.x + rapport * (this.previous.x - this.center.x));
                const y = (this.center.y + rapport * (this.previous.y - this.center.y));
                this.moveTo(x, y);
                this.exist = true;
            }
            else {
                this.exist = false;
            }
        }
        catch (error) {
            console.log('Erreur dans PointByHomothetie.update()', error);
            this.exist = false;
        }
    }
}
//# sourceMappingURL=PointByHomothetie.js.map