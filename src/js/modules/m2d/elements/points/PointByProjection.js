import { Coords } from '../others/Coords';
import { Point } from './Point';
export class PointByProjection extends Point {
    constructor(A, L, { label, style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false } = {}) {
        const coords = Coords.orthogonalProjectionCoord(A, L);
        super(A.parentFigure, coords.x, coords.y, { label, style, size, thickness, color, draggable, temp });
        this.previous = A;
        this.line = L;
        A.addChild(this);
        L.addChild(this);
    }
    update() {
        try {
            const coords = Coords.orthogonalProjectionCoord(this.previous, this.line);
            this.moveTo(coords.x, coords.y);
        }
        catch (error) {
            console.log('Erreur dans PointByProjection.update()', error);
            this.exist = false;
        }
    }
}
//# sourceMappingURL=PointByProjection.js.map