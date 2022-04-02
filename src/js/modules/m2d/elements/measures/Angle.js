import { Point } from '../points/Point';
import { Measure } from './Measure';
import { Coords } from '../others/Coords';
import { arrondi } from '../../calculus/round';
const epsilon = 0.00000001;
export class Angle extends Measure {
    constructor(A, O, B) {
        super(O.parentFigure);
        this.childs = [];
        if (typeof B === 'number') {
            this.B = Coords.rotationCoord(A, O, B);
            this.value = B;
            O.addChild(this);
            A.addChild(this);
        }
        else if (B instanceof Point) {
            this.B = B;
            this.value = Angle.angleOriented(A, O, B);
            O.addChild(this);
            A.addChild(this);
            B.addChild(this);
        }
        else {
            throw new Error('Le troisième paramètre doit être un point ou un nombre.');
        }
        this.O = O;
        this.A = A;
        this.valueNonOriented = Angle.angle(this.A, this.O, this.B);
    }
    update() {
        try {
            this.value = Angle.angleOriented(this.A, this.O, this.B);
            this.valueNonOriented = Angle.angle(this.A, this.O, this.B);
        }
        catch (error) {
            console.log('Erreur dans Angle.update()', error);
            this.exist = false;
        }
        this.notifyAllChilds();
    }
    static angleOriented(A, O, B) {
        const v = { x: B.x - O.x, y: B.y - O.y };
        const u = { x: A.x - O.x, y: A.y - O.y };
        const s = ((u.x * v.y - v.x * u.y) >= 0) ? 1 : -1;
        return s * Angle.angle(A, O, B);
    }
    static angle(A, O, B) {
        const OA = { x: A.x - O.x, y: A.y - O.y, norme: 0 };
        OA.norme = Math.sqrt(OA.x ** 2 + OA.y ** 2);
        const OB = { x: B.x - O.x, y: B.y - O.y, norme: 0 };
        OB.norme = Math.sqrt(OB.x ** 2 + OB.y ** 2);
        const scalaire = OA.x * OB.x + OA.y * OB.y;
        if (OA.norme * OB.norme < epsilon) {
            return 0;
        }
        return (Math.acos(arrondi(scalaire / (OA.norme * OB.norme)))) * 180 / Math.PI;
    }
}
//# sourceMappingURL=Angle.js.map