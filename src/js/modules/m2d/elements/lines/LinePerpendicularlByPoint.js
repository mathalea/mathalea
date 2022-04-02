import { LineByPointVector } from './LineByPointVector';
import { VectorNormal } from '../others/VectorNormal';
export class LinePerpendicularByPoint extends LineByPointVector {
    constructor(L, A, { color = 'black', thickness = 1, dashed = false, temp = false } = {}) {
        const v = new VectorNormal(L);
        super(A, v, { color, thickness, dashed, temp });
        this.line = L;
        this.A = A;
        this.exist = A.exist && L.exist;
    }
}
//# sourceMappingURL=LinePerpendicularlByPoint.js.map