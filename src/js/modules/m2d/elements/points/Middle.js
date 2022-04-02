import { Point } from './Point';
export class Middle extends Point {
    constructor(s, { style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false } = {}) {
        super(s.parentFigure, (s.A.x + s.B.x) / 2, (s.A.y + s.B.y) / 2, { style, size, thickness, color, draggable, temp });
        s.addChild(this);
        this.line = s;
    }
    update() {
        try {
            this.moveTo((this.line.A.x + this.line.B.x) / 2, (this.line.A.y + this.line.B.y) / 2);
        }
        catch (error) {
            console.log('Erreur dans Middle.update()', error);
            this.exist = false;
        }
    }
}
//# sourceMappingURL=Middle.js.map