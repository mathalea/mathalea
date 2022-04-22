import { GVVector } from './elements.js';
import { GVGraphicView } from './GraphicView.js';
import { aleaName } from '../outilsMathjs.js';
import { cross } from 'mathjs';
export class GVAleaThalesConfig extends GVGraphicView {
    constructor(k = undefined) {
        super(-5, -5, 5, 5);
        this.classicConfig = undefined;
        this.AOB = false;
        this.OAB = false;
        this.create(k);
    }
    create(k = undefined) {
        if (k !== undefined) {
            do {
                this.new();
            } while (this.classicConfig !== k);
        }
        else {
            this.new();
        }
    }
    new() {
        this.geometric = [];
        let O, A, B;
        if (this.AOB) {
            [O, A, B] = this.addRectPoint();
        }
        else if (this.OAB) {
            [A, O, B] = this.addRectPoint();
        }
        else {
            [O, A, B] = this.addNotAlignedPoint();
        }
        const M = this.addPointAligned(O, A)[2];
        const dOB = this.addLine(O, B);
        const dAB = this.addLine(A, B);
        const vO = new GVVector(O.x, O.y);
        const vA = new GVVector(A.x, A.y);
        const vB = new GVVector(B.x, B.y);
        const vM = new GVVector(M.x, M.y);
        const vOA = vA.sub(vO);
        const vOB = vB.sub(vO);
        const vOM = vM.sub(vO);
        const direct = cross([vOA.x, vOA.y, 0], [vOB.x, vOB.y, 0])[2] > 0;
        if (this.classicConfig !== undefined && ((this.classicConfig && vOA.dot(vOM) < 0) || (!this.classicConfig && vOA.dot(vOM) > 0))) {
            this.classicConfig = vOA.dot(vOM) > 0;
        }
        else if (this.classicConfig === undefined) {
            this.classicConfig = vOA.dot(vOM) > 0;
        }
        this.k = (vOA.dot(vOM) < 0 ? -1 : 1) * this.distance(O, M) / this.distance(O, A);
        const dMN = this.addParallelLine(M, dAB)[1];
        const [N] = this.addIntersectLine(dMN, dOB);
        const aleaNames = aleaName(5);
        const points = [O, A, B, M, N];
        points.forEach((x, i) => { x.name = aleaNames[i]; });
        dAB.name = A.name + B.name;
        dMN.aleaName(M, N);
        if (this.k < 0) {
            A.labelPoints = [O, A, B];
            B.labelPoints = [O, B, A];
            M.labelPoints = [O, M, N];
            N.labelPoints = [O, N, M];
        }
        else if (this.k < 1) {
            A.labelPoints = [O, A, B];
            B.labelPoints = [O, B, A];
            M.labelPoints = direct ? [O, M, A] : [A, M, O];
            N.labelPoints = direct ? [B, N, O] : [O, N, B];
        }
        else {
            A.labelPoints = direct ? [O, A, M] : [M, A, O];
            B.labelPoints = direct ? [N, B, O] : [O, B, N];
            M.labelPoints = [O, M, N];
            N.labelPoints = [O, N, M];
        }
        O.labelPoints = [B, O, M];
        this.geometric = [O, A, B, M, N].map(x => { x.label = true; return x; });
        this.points = [O, A, B, M, N].map(x => { x.label = true; return x; });
    }
    setDimensions(...args) {
        switch (args.length) {
            case 1: {
                this.ratio = args[0];
                this.ymax = this.xmax * this.ratio;
                this.width = this.xmax - this.xmin;
                this.height = this.ymax - this.ymin;
                break;
            }
            case 2:
            case 3: {
                this.width = args[0];
                this.height = args[1];
                this.xmin = 0;
                this.ymin = 0;
                this.xmax = this.width;
                this.ymax = this.height;
                this.ratio = this.height / this.width;
                break;
            }
            case 4: {
                this.xmin = args[0];
                this.ymin = args[1];
                this.xmax = args[2];
                this.ymax = args[3];
                this.width = this.xmax - this.xmin;
                this.height = this.ymax - this.ymin;
                this.ratio = this.height / this.width;
                break;
            }
        }
    }
}
