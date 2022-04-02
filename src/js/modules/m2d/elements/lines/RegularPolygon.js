import { PointByRotation } from '../points/PointByRotation';
import { Polygon } from './Polygon';
export class RegularPolygon extends Polygon {
    constructor(A, B, n, { color = 'black', thickness = 1, dashed = false } = {}) {
        const points = [A, B];
        for (let i = 1; i < n - 1; i++) {
            points.push(new PointByRotation(points[i - 1], points[i], 180 - (360 / n)));
        }
        super(...points);
        this.color = color;
        this.thickness = thickness;
        this.dashed = dashed;
    }
}
//# sourceMappingURL=RegularPolygon.js.map