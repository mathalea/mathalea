import { Point } from './Point';
export class PointByReflectionOverLine extends Point {
    constructor(A, line, { label, style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false } = {}) {
        let x, y;
        const [a, b, c] = line.equation;
        const k = 1 / (a * a + b * b);
        if (a === 0) {
            x = A.x;
            y = -(A.y + (2 * c) / b);
        }
        else if (b === 0) {
            y = A.y;
            x = -(A.x + (2 * c) / a);
        }
        else {
            x = k * ((b * b - a * a) * A.x - 2 * a * b * A.y - 2 * a * c);
            y = k * ((a * a - b * b) * A.y - 2 * a * b * A.x + (a * a * c) / b - b * c) - c / b;
        }
        super(A.parentFigure, x, y, { style, size, thickness, color, draggable, temp });
        this.line = line;
        this.previous = A;
        if (label !== undefined)
            this.label = label;
        A.addChild(this);
        line.addChild(this);
    }
    update() {
        try {
            let x, y;
            const [a, b, c] = this.line.equation;
            const k = 1 / (a * a + b * b);
            if (a === 0) {
                x = this.previous.x;
                y = -(this.previous.y + (2 * c) / b);
            }
            else if (b === 0) {
                y = this.previous.y;
                x = -(this.previous.x + (2 * c) / a);
            }
            else {
                x = k * ((b * b - a * a) * this.previous.x - 2 * a * b * this.previous.y - 2 * a * c);
                y = k * ((a * a - b * b) * this.previous.y - 2 * a * b * this.previous.x + (a * a * c) / b - b * c) - c / b;
            }
            this.moveTo(x, y);
        }
        catch (error) {
            console.log('Erreur dans PointByreflectionOverLine.update()', error);
            this.exist = false;
        }
    }
}
//# sourceMappingURL=PointByReflectionOverLine.js.map