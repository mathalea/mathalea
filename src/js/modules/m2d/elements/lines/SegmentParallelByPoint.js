import { VectorByPoints } from '../others/VectorByPoints';
import { PointByTranslationVector } from '../points/PointByTranslationVector';
import { Segment } from './Segment';
export class SegmentParallelByPoint extends Segment {
    constructor(S, A, { color = 'black', thickness = 1, style = '', temp = false, dashed = false } = {}) {
        const v = new VectorByPoints(S.A, S.B);
        const B = new PointByTranslationVector(A, v);
        super(A, B, { lineType: 'Segment', color, thickness, style, temp, dashed });
        if (!temp)
            this.parentFigure.set.add(this);
        this.label = (A.label && B.label) ? `[${A.label}${B.label}]` : '';
        if (!temp)
            this.parentFigure.svg.appendChild(this.g);
        this.color = color;
        this.thickness = thickness;
        this.style = style;
        this.dashed = dashed;
    }
}
//# sourceMappingURL=SegmentParallelByPoint.js.map