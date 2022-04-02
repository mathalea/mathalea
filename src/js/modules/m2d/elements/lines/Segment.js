import { Point } from '../points/Point';
import { PointByHomothetie } from '../points/PointByHomothetie';
import { PointByRotation } from '../points/PointByRotation';
import { PointBySimilitude } from '../points/PointBySimilitude';
import { PointOnLineAtD } from '../points/PointOnLineAtD';
import { Line } from './Line';
import { Polyline } from './Polyline';
import { PointByTranslation } from '../points/PointByTranslation';
import { PointByReflectionOverLine } from '../points/PointByReflectionOverLine';
import { PointByTranslationVector } from './../points/PointByTranslationVector';
import { Coords } from '../others/Coords';
export class Segment extends Line {
    constructor(A, B, { color = 'black', thickness = 1, style = '', temp = false, dashed = false } = {}) {
        super(A, B, { lineType: 'Segment', color, thickness, style, temp, dashed });
        if (!this.temp)
            this.parentFigure.save[this.id] = { className: 'Segment', arguments: [A.id, B.id], color, thickness, dashed };
        this.label = (A.label && B.label) ? `[${A.label}${B.label}]` : '';
        this.color = color;
        this.thickness = thickness;
        this.style = style;
        this.dashed = dashed;
    }
    update() {
        try {
            [this.x1, this.y1, this.x2, this.y2] = [this.A.x, this.A.y, this.B.x, this.B.y];
            const x1Svg = this.parentFigure.xToSx(this.x1);
            const x2Svg = this.parentFigure.xToSx(this.x2);
            const y1Svg = this.parentFigure.yToSy(this.y1);
            const y2Svg = this.parentFigure.yToSy(this.y2);
            this.g.setAttribute('x1', `${x1Svg}`);
            this.g.setAttribute('y1', `${y1Svg}`);
            this.g.setAttribute('x2', `${x2Svg}`);
            this.g.setAttribute('y2', `${y2Svg}`);
            this.notifyAllChilds();
        }
        catch (error) {
            console.log('Erreur dans Segment.update', error);
            this.exist = false;
        }
    }
    get latex() {
        try {
            if (!this.isVisible)
                return '';
            let latex = `\n\n\t% ${this.label ?? 'Segment'}`;
            latex += `\n \t \\draw${this.tikzOptions} (${this.x1}, ${this.y1}) -- (${this.x2}, ${this.y2});`;
            return latex;
        }
        catch (error) {
            console.log('Erreur dans Segment.latex()', error);
            return '';
        }
    }
    get style() {
        return this._style;
    }
    set style(style) {
        try {
            this._style = style;
            const h = 0.2;
            const addBorder1 = () => {
                this.A.style = '';
                this.B.style = '';
                const L = new Line(this.A, this.B, { lineType: 'Segment', temp: true });
                const M = new PointOnLineAtD(L, h, { style: '' });
                const A1 = new PointByRotation(M, this.A, 90, { temp: true, style: '' });
                const A2 = new PointByRotation(M, this.A, -90, { temp: true, style: '' });
                const s = new Segment(A1, A2, { color: this.color, thickness: this.thickness });
                this.group.push(s);
            };
            const addBorder2 = () => {
                this.A.style = '';
                this.B.style = '';
                const L = new Line(this.B, this.A, { lineType: 'Segment', temp: true });
                const M = new PointOnLineAtD(L, h, { temp: true, style: '' });
                const B1 = new PointByRotation(M, this.B, 90, { temp: true, style: '' });
                const B2 = new PointByRotation(M, this.B, -90, { temp: true, style: '' });
                const s = new Segment(B1, B2, { color: this.color, thickness: this.thickness });
                this.group.push(s);
            };
            const addArrow1 = () => {
                this.A.style = '';
                this.B.style = '';
                const L = new Line(this.A, this.B, { lineType: 'Segment', temp: true });
                const M = new PointOnLineAtD(L, 3 * h, { temp: true, style: '' });
                const A1 = new PointByRotation(M, this.A, 30, { temp: true, style: '' });
                const A2 = new PointByRotation(M, this.A, -30, { temp: true, style: '' });
                const s = new Polyline(A1, this.A, A2);
                s.color = this.color;
                s.thickness = this.thickness;
                this.group.push(s);
            };
            const addArrow2 = () => {
                this.A.style = '';
                this.B.style = '';
                const L = new Line(this.B, this.A, { lineType: 'Segment', temp: true });
                const M = new PointOnLineAtD(L, 3 * h, { temp: true, style: '' });
                const B1 = new PointByRotation(M, this.B, 30, { temp: true, style: '' });
                const B2 = new PointByRotation(M, this.B, -30, { temp: true, style: '' });
                const s = new Polyline(B1, this.B, B2);
                s.color = this.color;
                s.thickness = this.thickness;
                this.group.push(s);
            };
            if (style === '|-')
                addBorder1();
            else if (style === '-|')
                addBorder2();
            else if (style === '|-|') {
                addBorder1();
                addBorder2();
            }
            else if (style === '<-')
                addArrow1();
            else if (style === '->')
                addArrow2();
            else if (style === '<->') {
                addArrow1();
                addArrow2();
            }
        }
        catch (error) {
            console.log('Erreur dans Segment.style()', error);
        }
    }
    homothetie(center, k) {
        try {
            const M = new PointByHomothetie(this.A, center, k, { temp: true });
            const N = new PointByHomothetie(this.B, center, k, { temp: true });
            return new Segment(M, N);
        }
        catch (error) {
            console.log('Erreur dans Segment.homothetie()', error);
            return new Segment(this.A, this.B);
        }
    }
    translationVector(v) {
        try {
            const M = new PointByTranslationVector(this.A, v, { temp: true });
            const N = new PointByTranslationVector(this.B, v, { temp: true });
            return new Segment(M, N);
        }
        catch (error) {
            console.log('Erreur dans segment.translationVector', error);
            return new Segment(this.A, this.B);
        }
    }
    translation(xt, yt) {
        try {
            const M = new PointByTranslation(this.A, xt, yt, { temp: true });
            const N = new PointByTranslation(this.B, xt, yt, { temp: true });
            return new Segment(M, N);
        }
        catch (error) {
            console.log('Erreur dans segment.translation', error);
            return new Segment(this.A, this.B);
        }
    }
    reflectionOverLine(L) {
        try {
            const M = new PointByReflectionOverLine(this.A, L, { temp: true });
            const N = new PointByReflectionOverLine(this.B, L, { temp: true });
            return new Segment(M, N);
        }
        catch (error) {
            console.log('Erreur dans Segment.reflectionOverLine()', error);
            return new Segment(this.A, this.B);
        }
    }
    rotation(center, angle) {
        try {
            const M = new PointByRotation(this.A, center, angle, { temp: true });
            const N = new PointByRotation(this.B, center, angle, { temp: true });
            return new Segment(M, N);
        }
        catch (error) {
            console.log('Erreur dans segment.rotation', error);
            return new Segment(this.A, this.B);
        }
    }
    similitude(center, k, angle) {
        try {
            const M = new PointBySimilitude(this.A, center, k, angle, { temp: true });
            const N = new PointBySimilitude(this.B, center, k, angle, { temp: true });
            return new Segment(M, N);
        }
        catch (error) {
            console.log('Erreur dans Segment.homothetie()', error);
            return new Segment(this.A, this.B);
        }
    }
    distancePointer(pointerX, pointerY) {
        try {
            const M = Coords.orthogonalProjectionCoord({ x: pointerX, y: pointerY }, this);
            if (M.x < Math.min(this.A.x, this.B.x) || M.x > Math.max(this.A.x, this.B.x) || M.y < Math.min(this.A.y, this.B.y) || M.y > Math.max(this.A.y, this.B.y))
                return Infinity;
            return Point.distance(M, { x: pointerX, y: pointerY });
        }
        catch (error) {
            console.log('Erreur dans Line.distancePointer', error);
            return NaN;
        }
    }
}
//# sourceMappingURL=Segment.js.map