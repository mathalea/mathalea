import { Element2D } from '../Element2D';
export class Measure {
    constructor(parentFigure) {
        this.parentFigure = parentFigure;
        this.id = this.parentFigure.lastId++;
        this.childs = [];
        this.parents = [];
        this._value = 0;
        this._exist = true;
    }
    set value(x) {
        this._value = x;
    }
    get value() {
        return this._value;
    }
    addChild(child) {
        this.childs.push(child);
        child.parents.push(this);
    }
    notifyAllChilds() {
        for (const element of this.childs) {
            element.update();
        }
    }
    set exist(arg) {
        try {
            let allParentsExist = true;
            for (const parent of this.parents) {
                if (!parent.exist) {
                    allParentsExist = false;
                    break;
                }
            }
            this._exist = arg && allParentsExist;
            for (const e of this.childs) {
                e.exist = this._exist && e.exist;
                if (e instanceof Element2D && e.isVisible)
                    this._exist ? e.show(false) : e.hide(false);
            }
        }
        catch (error) {
            console.log('Erreur dans Measure.exist', error);
        }
    }
    get exist() {
        return this._exist;
    }
}
//# sourceMappingURL=Measure.js.map