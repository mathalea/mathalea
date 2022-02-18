import { context } from '../../../modules/context.js';
import { Cartesian } from './coordinates.js';
import { aleaName } from '../../../modules/outilsMathjs.js';
import { dot, round, cross } from 'mathjs';
import { latexParCoordonnees, tracePoint, point, labelPoint } from '../../../modules/2d.js';
/**
 * @class
 * @classdesc Graphic object like Point, Line, Segment etc.
 */
export class GraphicObject {
    constructor() {
        this.visible = false;
        this.name = '';
    }
    aleaName(...name) {
        this.name = aleaName(name.map(x => {
            if (x instanceof GraphicObject) {
                return x.name;
            }
            else {
                return x;
            }
        }), name.length).join('');
    }
    set name(newname) {
        this._name = newname;
    }
    get name() { return this._name; }
    getGGB() {
        return this.name;
    }
}
/**
 * @class
 * @classdesc Caracteristics of a point in an euclidean plan
 */
export class Point extends GraphicObject {
    constructor(coord) {
        super();
        this.label = false;
        this.xSVG = function (coeff) {
            return round(this.x * coeff, 3);
        };
        this.ySVG = function (coeff) {
            return -round(this.y * coeff, 3);
        };
        this.coordinates = coord;
        this.polarCoordinates = this.getPolarCoordinates();
        this.cartesianCoordinates = this.getCartesianCoordinates();
        this.name = '';
        this.type = 'Point';
        this.x = this.cartesianCoordinates.x;
        this.y = this.cartesianCoordinates.y;
        this.r = this.polarCoordinates.r;
        this.theta = this.polarCoordinates.theta;
        this.ggb = `${this.name} = (${this.x},${this.y})`;
    }
    getPolarCoordinates() {
        return this.coordinates.getPolarCoordinates();
    }
    getCartesianCoordinates() {
        return this.coordinates.getCartesianCoordinates();
    }
    getRotate(O, angle) {
        return new Point(new Cartesian((this.x - O.x) * Math.cos(angle) - (this.y - O.y) * Math.sin(angle) + O.x, (this.x - O.x) * Math.sin(angle) + (this.y - O.y) * Math.cos(angle) + O.y));
    }
    add(X) {
        return new Point(new Cartesian(this.x + X.x, this.y + X.y));
    }
    sub(X) {
        return new Point(new Cartesian(this.x - X.x, this.y - X.y));
    }
    multiply(k) {
        return new Point(new Cartesian(this.x * k, this.y * k));
    }
    divide(k) {
        return new Point(new Cartesian(this.x / k, this.y / k));
    }
    getBarycentriqueCoords(A, B, C) {
        let a, b, c;
        a = determinant(B.sub(this), C.sub(this));
        b = determinant(C.sub(this), A.sub(this));
        c = determinant(A.sub(this), B.sub(this));
        return [a, b, c];
    }
    isInTriangle(A, B, C) {
        return Math.min(...this.getBarycentriqueCoords(A, B, C)) > 0 || Math.max(...this.getBarycentriqueCoords(A, B, C)) < 0;
    }
    /**
     * Get the symétric of P with this
     * @param P
     * @returns
     */
    getSymetric(P) {
        return barycentre([this, P], [2, -1]);
    }
    getHomothetic(O, k) {
        return new Point(new Cartesian(k * this.x + (1 - k) * O.x, k * this.y + (1 - k) * O.y));
    }
    getVector() {
        return new Vector(this.x, this.y);
    }
    getGGB() {
        this.ggb = `${this.name} = (${this.x},${this.y})`;
        return `${this.name} = (${this.x},${this.y})`;
    }
    showLabel(scaleppc) {
        let label;
        const splitname = this.name.split('_');
        let nameFormat = splitname.length === 1 ? splitname[0] : `${splitname[0]}_{${splitname[1]}}`;
        if (this.labelPoints !== undefined) {
            const P1 = this.labelPoints[0];
            const P3 = this.labelPoints[2];
            const S = this.labelPoints[1];
            const v1 = P1.sub(S).getVector().getNormed();
            const v3 = P3.sub(S).getVector().getNormed();
            const corr = new Vector(0, -0.2);
            let P;
            if (v1.colinear(v3)) { // Colinéaires
                P = S.add(v1.getNormal().multiply(scaleppc * 0.4)).add(corr);
            }
            else { // Non colinéaires
                P = S.getSymetric(S.add(v1.add(v3).getNormed().multiply(scaleppc * 0.4))).add(corr);
            }
            if (context.isHtml) {
                label = latexParCoordonnees(nameFormat, P.x, P.y);
            }
            else {
                nameFormat = `$${nameFormat}$`;
                label = labelPoint(point(P.x, P.y, nameFormat, 'above'));
            }
            // 
            this.labelPoints = [P1, S, P3];
        }
        else {
            if (context.isHtml) {
                label = latexParCoordonnees(nameFormat, this.x, this.y + 0.2 * scaleppc);
            }
            else {
                nameFormat = `$${nameFormat}$`;
                label = labelPoint(point(this.x, this.y, nameFormat, 'above'));
            }
        }
        this.label = true;
        return label;
    }
    showDot() {
        const splitname = this.name.split('_');
        let nameFormat = splitname.length === 1 ? splitname[0] : `${splitname[0]}_{${splitname[1]}}`;
        if (context.isHtml)
            nameFormat = `$${nameFormat}$`;
        const newPoint = point(this.x, this.y, nameFormat, 'above');
        this.dot = tracePoint(newPoint);
        return this;
    }
    set name(newname) {
        this._name = newname;
        this.ggb = `${this.name} = (${this.x},${this.y})`;
    }
    get name() { return this._name; }
}
export class Vector {
    constructor(x = 0, y = 0) {
        this.x = 0;
        this.y = 0;
        this.norme = Math.sqrt(x ** 2 + y ** 2);
        this.x = x;
        this.y = y;
    }
    getNormed() {
        const xy = Math.sqrt(this.x ** 2 + this.y ** 2);
        return new Vector(this.x / xy, this.y / xy);
    }
    getNormal() {
        return new Vector(-this.y, this.x);
    }
    add(X) {
        return new Vector(this.x + X.x, this.y + X.y);
    }
    sub(X) {
        return new Vector(this.x - X.x, this.y - X.y);
    }
    multiply(k) {
        return new Vector(this.x * k, this.y * k);
    }
    neg() {
        return new Vector(-this.x, -this.y);
    }
    dot(X) {
        return dot([this.x, this.y], [X.x, X.y]);
    }
    cross(X) {
        const Cross = cross([this.x, this.y, 0], [X.x, X.y, 0]);
        return Cross;
    }
    colinear(V) {
        return parseFloat(cross([this.x, this.y, 0], [V.x, V.y, 0])[2].toFixed(15)) === 0;
    }
}
/**
   * @class
   * @classdesc Caracteristics of a line in an euclidean plan (ax+by=c)
   */
export class Line extends GraphicObject {
    // Une droite sera définie par deux points distincts ou un point et une direction
    // Il faudrait deux constructeurs ?
    constructor(A, B) {
        super();
        this.a = 0;
        this.b = 0;
        this.c = 0;
        this.direction = B instanceof Vector ? B : new Vector(B.x - A.x, B.y - A.y);
        this.A = A;
        this.B = B instanceof Point ? B : new Point(new Cartesian(A.x + B.x, A.y + B.y));
        this.getEquation();
        this.type = 'Line';
        this.ggb = `${this.name}: ${this.a}*x+${this.b}*y=${this.c})`;
    }
    getYPoint(x) {
        return this.b === 0 ? undefined : (this.c - this.a * x) / this.b;
    }
    getXPoint(y) {
        return this.a === 0 ? undefined : (this.c - this.b * y) / this.a;
    }
    getEquation() {
        const directionUnit = this.direction.getNormed();
        this.a = -directionUnit.y;
        this.b = directionUnit.x;
        this.c = this.a * this.A.x + this.b * this.A.y;
    }
    getIntersect(L) {
        const delta = L.a * this.b - this.a * L.b;
        if (delta.toFixed(15) !== '0') {
            const deltax = -(L.b * this.c - this.b * L.c);
            const deltay = L.a * this.c - this.a * L.c;
            const point = new Point(new Cartesian(deltax / delta, deltay / delta));
            return point;
        }
    }
    getPerpendicularLine(P) {
        return new Line(P, this.direction.getNormal());
    }
    /**
     * Get the symétric of P with this
     * @param P
     * @returns
     */
    getSymetric(P) {
        return barycentre([this.getIntersect(this.getPerpendicularLine(P)), P], [2, -1]);
    }
    set name(newname) {
        this._name = newname;
        this.ggb = `${this.name}: ${this.a}*x+${this.b}*y=${this.c})`;
    }
    get name() { return this._name; }
}
export function determinant(X, Y) {
    return X.x * Y.y - X.y * Y.x;
}
export function barycentre(P, a) {
    const pointsPonderes = P.map((x, i) => x.multiply(a[i]));
    return pointsPonderes.reduce((accumulator, curr) => accumulator.add(curr)).divide(a.reduce((accumulator, curr) => accumulator + curr));
}
/**
   * @class
   * @classdesc Caracteristics of a segment in an euclidean plan
   */
export class Segment extends Line {
    constructor(A, B) {
        super(A, B);
        this.type = 'Segment';
        this.A = A;
        this.B = B;
        this.getEquation();
    }
}
/**
   * @class
   * @classdesc Caracteristics of a circle in an euclidean plan
   */
export class Circle extends GraphicObject {
    constructor(A, B) {
        super();
        this.a = 0;
        this.b = 0;
        this.r = 0;
        this.type = 'Circle';
        this.A = A;
        this.B = B instanceof Point ? B : A;
        this.r = B instanceof Point ? Math.sqrt((A.x - B.x) ** 2 + (A.y - B.y) ** 2) : B;
    }
    getPoint(theta) {
        return new Point(new Cartesian(this.A.x + this.r * Math.cos(theta), this.A.y + this.r * Math.sin(theta)));
    }
}
