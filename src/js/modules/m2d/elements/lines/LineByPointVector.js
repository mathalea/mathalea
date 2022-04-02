import { Line } from './Line';
import { PointByTranslationVector } from '../points/PointByTranslationVector';
export class LineByPointVector extends Line {
    constructor(A, v, { color = 'black', thickness = 1, dashed = false, temp = false } = {}) {
        const B = new PointByTranslationVector(A, v, { temp: true, draggable: false });
        super(A, B, { lineType: 'Line', color, thickness, dashed, temp });
        this.A = A;
        this.B = B;
        this.vector = v;
        this.exist = v.exist && A.exist;
    }
}
//# sourceMappingURL=LineByPointVector.js.map