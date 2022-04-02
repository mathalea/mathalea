import { LineByPointVector } from './LineByPointVector';
import { VectorDirector } from '../others/VectorDirector';
export class LineParallelByPoint extends LineByPointVector {
    constructor(L, A, { color = 'black', thickness = 1, dashed = false } = {}) {
        const v = new VectorDirector(L);
        super(A, v, { color, thickness, dashed });
        this.line = L;
        this.A = A;
        L.addChild(this);
        this.exist = L.exist;
    }
}
//# sourceMappingURL=LineParallelByPoint.js.map