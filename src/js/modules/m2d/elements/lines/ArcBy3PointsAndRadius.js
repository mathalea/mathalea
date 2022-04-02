import { Angle } from '../measures/Angle';
import { PointOnLineAtD } from '../points/PointOnLineAtD';
import { Arc } from './Arc';
import { Segment } from './Segment';
export class ArcBy3Points extends Arc {
    constructor(A, O, B, { radius = 1, color = 'black', thickness = 1, dashed = false } = {}) {
        const sOA = new Segment(O, A, { temp: true });
        const M = new PointOnLineAtD(sOA, radius, { temp: true });
        const dynamicAngle = new Angle(A, O, B);
        super(O, M, dynamicAngle, { color, thickness, dashed });
    }
}
//# sourceMappingURL=ArcBy3PointsAndRadius.js.map