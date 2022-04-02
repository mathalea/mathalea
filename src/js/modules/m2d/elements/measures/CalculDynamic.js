import { Measure } from './Measure';
export class CalculDynamic extends Measure {
    constructor(calcul, args) {
        super(args[0].parentFigure);
        this.value = calcul(args);
        this.calcul = calcul;
        this.args = args;
        for (const arg of args) {
            arg.addChild(this);
        }
    }
    update() {
        try {
            this.value = this.calcul(this.args);
        }
        catch (error) {
            console.log('Erreur dans CalculDynamic.update()', error);
            this.exist = false;
        }
        this.notifyAllChilds();
    }
}
//# sourceMappingURL=CalculDynamic.js.map