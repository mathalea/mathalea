import { Const } from './../measures/Const';
import { Element2D } from '../Element2D';
import { Measure } from '../measures/Measure';
export class TextByPosition extends Element2D {
    constructor(figure, x, y, text, { anchor = 'middle', temp = false, draggable = true, color = 'black', snapToGrid = false } = {}) {
        super(figure);
        this.anchor = anchor;
        this.g = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        this._x = (x instanceof Measure) ? x : new Const(figure, x);
        this._y = (y instanceof Measure) ? y : new Const(figure, y);
        this._text = '';
        this._anchor = anchor;
        this.x = this._x.value;
        this.y = this._y.value;
        this.text = text ?? '';
        this.text = text.replace(/\d+\.\d+/g, (number) => (Math.round(10 * parseFloat(number)) / 10).toString());
        this.draggable = draggable;
        this.snapToGrid = snapToGrid;
        this.g.setAttribute('stroke', 'black');
        this.g.style.overflow = 'visible';
        this.g.style.lineHeight = '0';
        this.g.style.dominantBaseline = 'middle';
        this.g.style.textAnchor = anchor;
        this.g.style.cursor = this.draggable ? 'move' : 'default';
        if (!temp) {
            this.parentFigure.svg.appendChild(this.g);
            this.parentFigure.set.add(this);
        }
        this.color = color;
    }
    get anchor() {
        return this._anchor;
    }
    set anchor(anchor) {
        this._anchor = anchor;
        this.g.style.textAnchor = anchor;
    }
    get x() {
        return this._x.value;
    }
    set x(x) {
        this.g.setAttribute('x', `${this.parentFigure.xToSx(x)}`);
        this._x.value = x;
    }
    get y() {
        return this._y.value;
    }
    set y(y) {
        this.g.setAttribute('y', `${this.parentFigure.yToSy(y)}`);
        this._y.value = y;
    }
    get text() {
        return this._text;
    }
    set text(text) {
        this.g.textContent = `${text}`;
        this._text = text;
    }
    moveTo(x, y) {
        this.x = x;
        this.y = y;
    }
    update() {
    }
    get latex() {
        try {
            if (!this.isVisible)
                return '';
            let anchorLatex;
            if (this.anchor === 'start') {
                anchorLatex = 'west';
            }
            else if (this.anchor === 'middle') {
                anchorLatex = 'center';
            }
            else {
                anchorLatex = 'east';
            }
            return `\n\t\\draw${(this.color !== 'black' && this.color !== undefined) ? `[${this.color}]` : ''} (${this.x},${this.y}) node[anchor = ${anchorLatex}] {${this.text}};`;
        }
        catch (error) {
            console.log('Erreur dans TextByPosition.latex()', error);
            return '';
        }
    }
    notifyPointerMove(x, y) {
        this.moveTo(x, y);
    }
    distancePointer(pointerX, pointerY) {
        return Math.sqrt((this.x - pointerX) ** 2 + (this.y - pointerY) ** 2);
    }
}
//# sourceMappingURL=TextByPosition.js.map