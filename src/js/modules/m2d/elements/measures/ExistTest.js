import { Measure } from './Measure';
export class ExistTest extends Measure {
    constructor(figure, element, not = false) {
        super(figure);
        this.element = element;
        this.not = not;
        if (not)
            this.value = element.exist ? 0 : 1;
        else
            this.value = element.exist ? 1 : 0;
        element.addChild(this);
    }
    update() {
        if (this.not)
            this.value = this.element.exist ? 0 : 1;
        else
            this.value = this.element.exist ? 1 : 0;
        this.notifyAllChilds();
    }
    set exist(etat) {
    }
    get exist() {
        return true;
    }
}
//# sourceMappingURL=ExistTest.js.map