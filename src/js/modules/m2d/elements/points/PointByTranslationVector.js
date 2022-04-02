import { Point } from './Point';
export class PointByTranslationVector extends Point {
    constructor(A, v, { label, style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false } = {}) {
        super(A.parentFigure, A.x + v.x, A.y + v.y, { style, size, thickness, color, draggable, temp });
        this.previous = A;
        this.vector = v;
        if (label !== undefined)
            this.label = label;
        A.addChild(this);
        v.addChild(this);
    }
    update() {
        try {
            this.moveTo(this.previous.x + this.vector.x, this.previous.y + this.vector.y);
        }
        catch (error) {
            console.log('Erreur dans PointByTranslationVector.update()', error);
            this.exist = false;
        }
        this.notifyAllChilds();
    }
}
//# sourceMappingURL=PointByTranslationVector.js.map