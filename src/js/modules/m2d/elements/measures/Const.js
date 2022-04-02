import { Measure } from './Measure';
export class Const extends Measure {
    constructor(figure, value) {
        super(figure);
        this.value = value;
        this.parentFigure.save[this.id] = { className: 'Const', arguments: [this.value] };
    }
    update() {
    }
}
//# sourceMappingURL=Const.js.map