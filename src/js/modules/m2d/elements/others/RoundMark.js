import { Element2D } from '../Element2D';
export class RoundMark extends Element2D {
    constructor(svgContainer, x, y, { color = 'blue', size = 0.15, thickness = 2, label = '', fill = 'blue' } = {}) {
        super(svgContainer);
        this.x = x;
        this.y = y;
        this.size = size;
        this.g = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.parentFigure.svg.appendChild(this.g);
        const xSvg = this.parentFigure.xToSx(this.x);
        const ySvg = this.parentFigure.yToSy(this.y);
        this.g.setAttribute('cx', `${xSvg}`);
        this.g.setAttribute('cy', `${ySvg}`);
        this.g.setAttribute('r', `${size * this.parentFigure.pixelsPerUnit}`);
        this.color = color;
        this.fill = fill;
        this.label = label;
        this.thickness = thickness;
        this.parentFigure.set.add(this);
    }
    update() {
        try {
            const xSvg = this.parentFigure.xToSx(this.x);
            const ySvg = this.parentFigure.yToSy(this.y);
            this.g.setAttribute('cx', `${xSvg}`);
            this.g.setAttribute('cy', `${ySvg}`);
        }
        catch (error) {
            console.log(error);
            this.exist = false;
        }
    }
    get latex() {
        if (!this.isVisible || !this.exist)
            return '';
        let tex = `\n\n\t % Point ${this.label ?? ''}`;
        tex += `\n \t \\draw${this.tikzOptions} (${this.x}, ${this.y}) circle(${this.size});`;
        return tex;
    }
}
//# sourceMappingURL=RoundMark.js.map