import { Vector } from './Vector';
export class VectorNormal extends Vector {
    constructor(L) {
        const [x, y] = [L.normal.x, L.normal.y];
        super(L.parentFigure, x, y);
        this.line = L;
        L.addChild(this);
    }
    update() {
        try {
            [this.x, this.y] = [this.line.normal.x, this.line.normal.y];
        }
        catch (error) {
            console.log('Erreur dans VectorNormal.update()', error);
            this.exist = false;
        }
        this.notifyAllChilds();
    }
}
//# sourceMappingURL=VectorNormal.js.map