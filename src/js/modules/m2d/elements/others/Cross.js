import { Element2D } from '../Element2D';
export class Cross extends Element2D {
    constructor(svgContainer, x, y, { color = 'blue', size = 0.15, thickness = 2, label = '', visibleOnlyOver = false } = {}) {
        super(svgContainer);
        this.x = x;
        this.y = y;
        this.size = size;
        this.visibleOnlyOver = visibleOnlyOver;
        this.segment1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        this.segment2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        this.zoneOver = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.zoneOver.setAttribute('r', '20');
        this.zoneOver.setAttribute('opacity', '0');
        this.g.appendChild(this.segment1);
        this.g.appendChild(this.segment2);
        this.g.appendChild(this.zoneOver);
        if (visibleOnlyOver) {
            this.setVisibleOnMouseOver();
        }
        this.parentFigure.svg.appendChild(this.g);
        this.update();
        this.color = color;
        this.label = label;
        this.thickness = thickness;
        this.parentFigure.set.add(this);
    }
    update() {
        try {
            const x1Svg = this.parentFigure.xToSx(this.x - this.size);
            const x2Svg = this.parentFigure.xToSx(this.x + this.size);
            const y1Svg = this.parentFigure.yToSy(this.y + this.size);
            const y2Svg = this.parentFigure.yToSy(this.y - this.size);
            const x12Svg = this.parentFigure.xToSx(this.x - this.size);
            const x22Svg = this.parentFigure.xToSx(this.x + this.size);
            const y12Svg = this.parentFigure.yToSy(this.y - this.size);
            const y22Svg = this.parentFigure.yToSy(this.y + this.size);
            this.segment1.setAttribute('x1', `${x1Svg}`);
            this.segment1.setAttribute('y1', `${y1Svg}`);
            this.segment1.setAttribute('x2', `${x2Svg}`);
            this.segment1.setAttribute('y2', `${y2Svg}`);
            this.segment2.setAttribute('x1', `${x12Svg}`);
            this.segment2.setAttribute('y1', `${y12Svg}`);
            this.segment2.setAttribute('x2', `${x22Svg}`);
            this.segment2.setAttribute('y2', `${y22Svg}`);
            this.zoneOver.setAttribute('cx', `${this.parentFigure.xToSx(this.x)}`);
            this.zoneOver.setAttribute('cy', `${this.parentFigure.yToSy(this.y)}`);
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
        tex += `\n \t \\draw${this.tikzOptions} (${this.x - this.size}, ${this.y + this.size}) -- (${this.x + this.size}, ${this.y - this.size});`;
        tex += `\n \t \\draw${this.tikzOptions} (${this.x - this.size}, ${this.y - this.size}) -- (${this.x + this.size}, ${this.y + this.size});`;
        return tex;
    }
}
//# sourceMappingURL=Cross.js.map