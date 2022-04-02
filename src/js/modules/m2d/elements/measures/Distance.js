import { Point } from '../points/Point';
import { Measure } from './Measure';
export class Distance extends Measure {
    constructor(A, B) {
        super(A.parentFigure);
        this.childs = [];
        this.A = A;
        this.B = B;
        A.addChild(this);
        B.addChild(this);
        this.update();
    }
    update() {
        try {
            this.value = Point.distance(this.A, this.B);
        }
        catch (error) {
            console.log('Erreur dans Distance.update()', error);
            this.exist = false;
        }
        this.notifyAllChilds();
    }
}
//# sourceMappingURL=Distance.js.map