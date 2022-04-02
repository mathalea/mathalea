import { Element2D } from '../Element2D';
import { Coords } from '../others/Coords';
import { Point } from './Point';
export class PointIntersectionCC extends Point {
    constructor(C1, C2, n = 1, { label, style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false } = {}) {
        let { x, y } = Coords.intersectionCCCoord(C1, C2, n);
        let exist = true;
        if (isNaN(x) || isNaN(y)) {
            [x, y] = [C1.parentFigure.xMax + 10, C1.parentFigure.yMax + 10];
            exist = false;
        }
        super(C1.parentFigure, x, y, { style, size, thickness, color, draggable, temp, exist });
        this.C1 = C1;
        this.C2 = C2;
        this.n = n;
        if (label !== undefined)
            this.label = label;
        C1.addChild(this);
        C2.addChild(this);
    }
    update() {
        try {
            const coords = Coords.intersectionCCCoord(this.C1, this.C2, this.n);
            if (!isNaN(coords.x) && !isNaN(coords.y)) {
                this.moveTo(coords.x, coords.y);
                if (!this.exist) {
                    this.show(false);
                    this.exist = true;
                    for (const e of this.childs) {
                        if (e instanceof Element2D)
                            e.show(false);
                    }
                }
            }
            else {
                this.hide(false);
                this.exist = false;
            }
        }
        catch (error) {
            console.log('Erreur dans PointIntersectionCC.update()', error);
            this.exist = false;
        }
    }
}
//# sourceMappingURL=PointIntersectionCC.js.map