import { Point } from './Point';
import { Const } from '../measures/Const';
export class PointByRotation extends Point {
    constructor(A, center, angle, { label, style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false } = {}) {
        const angleMeasure = (typeof angle === 'number') ? angle : angle.value;
        const x = (center.x + (A.x - center.x) * Math.cos((angleMeasure * Math.PI) / 180) - (A.y - center.y) * Math.sin((angleMeasure * Math.PI) / 180));
        const y = (center.y + (A.x - center.x) * Math.sin((angleMeasure * Math.PI) / 180) + (A.y - center.y) * Math.cos((angleMeasure * Math.PI) / 180));
        super(A.parentFigure, x, y, { style, size, thickness, color, draggable, temp });
        this.center = center;
        if (typeof angle === 'number')
            this.angle = new Const(A.parentFigure, angle);
        else {
            this.angle = angle;
            angle.addChild(this);
        }
        this.previous = A;
        if (label !== undefined)
            this.label = label;
        A.addChild(this);
        center.addChild(this);
        if (typeof angle !== 'number') {
            this.exist = A.exist && angle.exist && center.exist;
        }
        else
            this.exist = A.exist && center.exist;
    }
    update() {
        try {
            const angleMeasure = this.angle.value;
            const x = (this.center.x + (this.previous.x - this.center.x) * Math.cos((angleMeasure * Math.PI) / 180) - (this.previous.y - this.center.y) * Math.sin((angleMeasure * Math.PI) / 180));
            const y = (this.center.y + (this.previous.x - this.center.x) * Math.sin((angleMeasure * Math.PI) / 180) + (this.previous.y - this.center.y) * Math.cos((angleMeasure * Math.PI) / 180));
            this.moveTo(x, y);
        }
        catch (error) {
            console.log('Erreur dans PointByRotation.update()', error);
            this.exist = false;
        }
    }
}
//# sourceMappingURL=PointByRotation.js.map