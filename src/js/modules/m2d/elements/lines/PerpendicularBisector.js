import { Middle } from '../points/Middle';
import { LinePerpendicularByPoint } from './LinePerpendicularlByPoint';
export class PerpendicularBisector extends LinePerpendicularByPoint {
    constructor(S, { color = 'black', thickness = 1, dashed = false, temp = false } = {}) {
        const M = new Middle(S, { temp: true });
        super(S, M, { color, thickness, dashed, temp });
        this.segment = S;
        this.exist = S.exist;
        S.A.addChild(this);
        S.B.addChild(this);
    }
}
//# sourceMappingURL=PerpendicularBisector.js.map