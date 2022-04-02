import { TextByPosition } from './TextByPosition';
export class TextByPoint extends TextByPosition {
    constructor(A, text, { dx = 0, dy = 0, anchor = 'middle', color = 'black', draggable = true, temp = false } = {}) {
        super(A.parentFigure, A.x + dx, A.y + dy, text, { anchor, color, temp, draggable });
        this.A = A;
        this._dx = dx;
        this._dy = dy;
        A.addChild(this);
    }
    notifyPointerMove(x, y) {
        this.x = x;
        this.y = y;
        this._dx = this.x - this.A.x;
        this._dy = this.y - this.A.y;
    }
    update() {
        try {
            this.x = this.A.x + this._dx;
            this.y = this.A.y + this._dy;
        }
        catch (error) {
            console.log('Erreur dans TextByPoint.update()', error);
            this.exist = false;
        }
    }
    get dx() {
        return this._dx;
    }
    set dx(dx) {
        this._dx = dx;
        this.update();
    }
    get dy() {
        return this._dy;
    }
    set dy(dy) {
        this._dy = dy;
        this.update();
    }
}
//# sourceMappingURL=TextByPoint.js.map