import { Point } from './Point';
import { Coords } from '../others/Coords';
export class PointIntersectionLS extends Point {
    constructor(L1, L2, { label, style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false } = {}) {
        const coords = Coords.intersectionLLCoord(L1, L2);
        super(L1.parentFigure, coords.x, coords.y, { style, size, thickness, color, draggable, temp });
        this.L1 = L1;
        this.L2 = L2;
        if (label !== undefined)
            this.label = label;
        L1.addChild(this);
        L2.addChild(this);
        this.x = coords.x;
        this.y = coords.y;
        if (coords.x > Math.min(L2.x1, L2.x2) && coords.x < Math.max(L2.x1, L2.x2) && coords.y > Math.min(L2.y1, L2.y2) && coords.y < Math.max(L2.y1, L2.y2))
            this.exist = true;
        else
            this.exist = false;
    }
    update() {
        try {
            const coords = Coords.intersectionLLCoord(this.L1, this.L2);
            if (coords.x > Math.min(this.L2.x1, this.L2.x2) && coords.x < Math.max(this.L2.x1, this.L2.x2) && coords.y > Math.min(this.L2.y1, this.L2.y2) && coords.y < Math.max(this.L2.y1, this.L2.y2)) {
                this.exist = true;
            }
            else {
                this.exist = false;
            }
            if (!isNaN(coords.x) && !isNaN(coords.y)) {
                this.moveTo(coords.x, coords.y);
                if (this.isVisible)
                    this.show();
            }
            else
                this.hide();
        }
        catch (error) {
            console.log('Erreur dans PointIntersectionLL.update()', error);
            this.exist = false;
        }
    }
}
//# sourceMappingURL=PointIntersectionLS.js.map