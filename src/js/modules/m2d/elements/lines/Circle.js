import { PointByReflectionOverLine } from './../points/PointByReflectionOverLine';
import { PointByTranslationVector } from './../points/PointByTranslationVector';
import { Element2D } from '../Element2D';
import { Measure } from '../measures/Measure';
import { Point } from '../points/Point';
import { CalculDynamic } from '../measures/CalculDynamic';
import { PointByRotation } from '../points/PointByRotation';
import { PointBySimilitude } from '../points/PointBySimilitude';
import { Distance } from '../measures/Distance';
import { Const } from '../measures/Const';
import { PointByHomothetie } from './../points/PointByHomothetie';
export class Circle extends Element2D {
    constructor(center, arg2, { color = 'black', thickness = 1, fill = 'none', temp = false, dashed = false } = {}) {
        let rayon;
        if (arg2 instanceof Point)
            rayon = new Distance(center, arg2);
        else {
            if (typeof arg2 === 'number')
                rayon = new Const(center.parentFigure, arg2);
            else
                rayon = new CalculDynamic((r) => Math.abs(r[0].value), [arg2]);
        }
        super(center.parentFigure);
        this._radius = rayon;
        this.pointOnCircle = arg2 instanceof Point ? arg2 : null;
        this.center = center;
        this.temp = temp;
        if (!this.temp)
            this.parentFigure.set.add(this);
        const xSvg = this.parentFigure.xToSx(this.center.x);
        const ySvg = this.parentFigure.yToSy(this.center.y);
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', `${xSvg}`);
        circle.setAttribute('cy', `${ySvg}`);
        this.g = circle;
        if (!this.temp)
            this.parentFigure.svg.appendChild(this.g);
        this.M = new Point(this.parentFigure, 100, 100, { style: '', temp: true });
        this.M.moveTo(center.x + this.radius, center.y);
        this.fill = fill;
        this.color = color;
        this.thickness = thickness;
        this.dashed = dashed;
        if (arg2 instanceof Point) {
            this.pointOnCircle = arg2;
            center.addChild(this);
            arg2.addChild(this);
            this.exist = center.exist && this.pointOnCircle.exist;
        }
        else if (arg2 instanceof Measure) {
            this.pointOnCircle = null;
            center.addChild(this);
            arg2.addChild(this);
            this.exist = center.exist && arg2.value > 0;
        }
        else {
            center.addChild(this);
            this.exist = center.exist;
        }
        this.update();
        if (arg2 instanceof Point)
            this.parentFigure.save[this.id] = { className: 'CircleCenterPoint', arguments: [center.id, arg2.id], thickness, color };
        else
            this.parentFigure.save[this.id] = { className: 'CircleCenterRadius', arguments: [center.id, this._radius.id], thickness, color };
    }
    moveCenter(x, y) {
        try {
            this.g.setAttribute('cx', `${this.parentFigure.xToSx(x)}`);
            this.g.setAttribute('cy', `${this.parentFigure.yToSy(y)}`);
            this.M.moveTo(this.center.x + this.radius, this.center.y);
        }
        catch (error) {
            console.log('erreur dans Circle.moveCenter', error);
        }
    }
    get radius() {
        try {
            return this._radius.value;
        }
        catch (error) {
            return NaN;
        }
    }
    set radius(radius) {
        try {
            this._radius.value = radius;
            this.g.setAttribute('r', `${this._radius.value * this.parentFigure.pixelsPerUnit}`);
        }
        catch (error) {
            console.log('Erreur dans Circle set radius avec l\'argument ', radius);
        }
    }
    update() {
        try {
            this.moveCenter(this.center.x, this.center.y);
            if (this.pointOnCircle) {
                this.radius = Point.distance(this.center, this.pointOnCircle);
            }
            if (this._radius instanceof Measure) {
                this.radius = Math.max(this._radius.value, 0);
            }
            this.notifyAllChilds();
        }
        catch (error) {
            console.log('Erreur dans Circle update().', error);
            this.exist = false;
        }
    }
    rotation(O, angle) {
        try {
            let O2;
            if (angle instanceof Measure) {
                O2 = new PointByRotation(this.center, O, angle, { temp: true });
                return new Circle(O2, this._radius);
            }
            else {
                O2 = new PointByRotation(this.center, O, angle, { temp: true });
                return new Circle(O2, this._radius);
            }
        }
        catch (error) {
            console.log('Erreur dans Circle.rotation() avec les arguments ', O, angle, error);
        }
    }
    homothetie(O, k) {
        try {
            let rayon;
            if (k instanceof Measure) {
                rayon = new CalculDynamic((x) => Math.abs(x[0].value * x[1].value), [k, this._radius]);
            }
            else {
                rayon = new CalculDynamic((x) => Math.abs(x[0].value * k), [this._radius]);
            }
            const O2 = new PointByHomothetie(this.center, O, k, { temp: true });
            return new Circle(O2, rayon);
        }
        catch (error) {
            console.log('Erreur dans Circle.homothetie() avec les arguments ', O, k, error);
            return new Circle(this.center, this.radius);
        }
    }
    similitude(O, k, angle) {
        try {
            let rayon;
            if (k instanceof Measure) {
                rayon = new CalculDynamic((x) => Math.abs(x[0].value * x[1].value), [k, this._radius]);
            }
            else {
                rayon = new CalculDynamic((x) => Math.abs(x[0].value * k), [this._radius]);
            }
            const O2 = new PointBySimilitude(this.center, O, k, angle, { temp: true });
            return new Circle(O2, rayon);
        }
        catch (error) {
            console.log('Erreur dans Circle.similitude() avec les arguments ', O, k, angle, error);
            return new Circle(this.center, this.radius);
        }
    }
    translation(xt, yt) {
        try {
            const rayon = new CalculDynamic((x) => Math.abs(x[0].value), [this._radius]);
            const O2 = new Point(this.parentFigure, this.center.x + xt, this.center.y + yt);
            return new Circle(O2, rayon);
        }
        catch (error) {
            console.log('Erreur dans Circle.translation() avec les arguments', xt, yt, error);
            return new Circle(this.center, this.radius);
        }
    }
    translationVector(v) {
        try {
            const rayon = new CalculDynamic((x) => Math.abs(x[0].value), [this._radius]);
            const O2 = new PointByTranslationVector(this.center, v);
            return new Circle(O2, rayon);
        }
        catch (error) {
            console.log('Erreur dans Circle.translationVector() avec le vecteur ', v, error);
            return new Circle(this.center, this.radius);
        }
    }
    reflectionOverLine(L) {
        try {
            const rayon = new CalculDynamic((x) => Math.abs(x[0].value), [this._radius]);
            const O2 = new PointByReflectionOverLine(this.center, L);
            return new Circle(O2, rayon);
        }
        catch (error) {
            console.log('Erreur dans Circle.translationVector() avec le vecteur ', L, error);
            return new Circle(this.center, this.radius);
        }
    }
    distancePointer(pointerX, pointerY) {
        try {
            return Math.abs(Point.distance(this.center, { x: pointerX, y: pointerY }) - this.radius);
        }
        catch (error) {
            return NaN;
        }
    }
    get latex() {
        try {
            if (!this.isVisible || !this.exist)
                return '';
            let latex = `\n\n\t% Circle center : ${this.center.label}, radius ${this._radius}`;
            latex += `\n \t \\draw${this.tikzOptions} (${this.center.x}, ${this.center.y}) circle(${this.radius});`;
            return latex;
        }
        catch (error) {
            return '';
        }
    }
}
//# sourceMappingURL=Circle.js.map