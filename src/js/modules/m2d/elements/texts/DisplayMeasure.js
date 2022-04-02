import { TextByPosition } from './TextByPosition';
export class DisplayMeasure extends TextByPosition {
    constructor(x, y, measure, { precision = 1, textBefore = '', textAfter = '', anchor = 'start', draggable = false } = {}) {
        super(measure.parentFigure, x, y, textBefore + measure.value.toString().replace(/\d+\.\d+/g, (number) => (Math.round(10 ** precision * parseFloat(number)) / 10 ** precision).toString()) + textAfter);
        measure.addChild(this);
        this.anchor = anchor;
        this.measure = measure;
        this.textBefore = textBefore;
        this.textAfter = textAfter;
        this.precision = precision;
        this.draggable = draggable;
    }
    update() {
        try {
            this.text = this.textBefore + this.measure.value.toString().replace(/\d+\.\d+/g, (number) => (Math.round(10 ** this.precision * parseFloat(number)) / 10 ** this.precision).toString()) + this.textAfter;
        }
        catch (error) {
            console.log('Erreur dans DisplayMeasure.update()', error);
            this.exist = false;
        }
        this.notifyAllChilds();
    }
}
//# sourceMappingURL=DisplayMeasure.js.map