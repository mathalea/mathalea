import { Point } from './Point';
import { Coords } from '../others/Coords';
export class PointIntersectionLC extends Point {
    constructor(L, C, n = 1, { label, style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false } = {}) {
        const coords = Coords.intersectionLCCoord(L, C, n);
        super(L.parentFigure, coords.x, coords.y, { style, size, thickness, color, draggable, temp });
        this.L = L;
        this.C = C;
        this.n = n;
        if (label !== undefined)
            this.label = label;
        L.addChild(this);
        C.addChild(this);
    }
    update() {
        try {
            const coords = Coords.intersectionLCCoord(this.L, this.C, this.n);
            if (!isNaN(coords.x) && !isNaN(coords.y)) {
                this.moveTo(coords.x, coords.y);
                if (!this.isVisible)
                    this.show();
            }
            else
                this.hide();
        }
        catch (error) {
            console.log('Erreur dans PointIntersectionLC.update()', error);
            this.exist = false;
        }
    }
}
//# sourceMappingURL=PointIntersectionLC.js.map