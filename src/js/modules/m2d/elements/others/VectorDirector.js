import { Vector } from './Vector';
export class VectorDirector extends Vector {
    constructor(L) {
        const [x, y] = [L.directeur.x, L.directeur.y];
        super(L.parentFigure, x, y);
        this.line = L;
        L.addChild(this);
    }
    update() {
        try {
            [this.x, this.y] = [this.line.directeur.x, this.line.directeur.y];
        }
        catch (error) {
            console.log('Erreur dans VectorDirector.update()', error);
            this.exist = false;
        }
        this.notifyAllChilds();
    }
}
//# sourceMappingURL=VectorDirector.js.map