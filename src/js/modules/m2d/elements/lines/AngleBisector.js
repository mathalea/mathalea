import { Ray } from './Ray';
import { Angle } from '../measures/Angle';
import { CalculDynamic } from '../measures/CalculDynamic';
import { PointByRotation } from '../points/PointByRotation';
export class AngleBisector extends Ray {
    constructor(A, O, B, { color = 'black', thickness = 1, style = '', dashed, temp = false } = {}) {
        const AOB = new Angle(A, O, B);
        const halfAngle = new CalculDynamic((a) => a[0].value / 2, [AOB]);
        const M = new PointByRotation(A, O, halfAngle, { temp: true });
        super(O, M, { color, thickness, dashed, style, temp });
        B.addChild(M);
        this.side1 = A;
        this.side2 = B;
        this.origin = O;
        this.AOB = AOB;
    }
}
//# sourceMappingURL=AngleBisector.js.map