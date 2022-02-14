import { Cartesian } from './coordinates.js';
import { Point, Line, Segment } from './elements.js';
import { getMathalea2DExport } from './getMathalea2DExport.js';
/**
 * @class
 * @classdesc Caracteristics of a graphic view
 * @author Frédéric PIOU
 */
export class GraphicView {
    constructor(xmin, ymin, xmax, ymax) {
        this.setDimensions(xmin, ymin, xmax, ymax);
        this.names = 'ABCDEFGHIJKLMNOPRSTUVZ'.split('');
        this.ppc = 20; // Pixels per Centimeter
        this.scale = 1; // Scale for Tikz
        this.geometric = [];
    }
    setDimensions(xmin = -5, ymin = -5, xmax = 5, ymax = 5) {
        this.xmin = xmin;
        this.ymin = ymin;
        this.xmax = xmax;
        this.ymax = ymax;
        this.width = this.xmax - this.xmin;
        this.height = this.ymax - this.ymin;
        this.ratio = this.height / this.width;
    }
    /**
     * Show any Objects in Mathalea2D
     * @param  {...any} args
     * @returns {Group}
     */
    show(...args) {
        const group = [];
        args.forEach(x => {
            if (Array.isArray(x)) {
                group.push(...x);
            }
            else {
                group.push(x);
            }
        });
        group.forEach(x => { x.visible = true; });
        return group;
    }
    /**
     * Resize window of graphic view to the created points
     * Keep the ratio
     */
    resize() {
        const listPoint = this.getListObjectTypeSelect('Point');
        const listXPoint = listPoint.map(X => { return X.x; });
        const listYPoint = listPoint.map(Y => { return Y.y; });
        const xmin = Math.min(...listXPoint);
        const xmax = Math.max(...listXPoint);
        const ymin = Math.min(...listYPoint);
        const ymax = Math.max(...listYPoint);
        const width = xmax - xmin;
        const height = ymax - ymin;
        const ratio = height / width;
        const k = ratio / this.ratio;
        let newheight = 0 + height;
        let newwidth = 0 + width;
        if (k < 1) {
            newheight = height / k;
        }
        else {
            newwidth = width * k;
        }
        this.ppc = this.ppc * this.width / newwidth;
        this.scale = this.scale * this.width / newwidth;
        const deltaX = (newwidth - width) / 2;
        const deltaY = (newheight - height) / 2;
        this.setDimensions(xmin - deltaX, ymin - deltaY, xmax + deltaX, ymax + deltaY);
    }
    /**
     * Give the list sorted of object with a given type
     * @param {string} typeSelect Type
     * @returns {Array}
     */
    getListObjectTypeSelect(typeSelect = 'Point') {
        switch (typeSelect) {
            case 'Point':
                return this.geometric.filter(obj => obj instanceof Point).sort((a, b) => {
                    const nameA = a.name.split('_');
                    const nameB = b.name.split('_');
                    if (nameA[0] === nameB[0]) {
                        return parseInt(nameA[1]) - parseInt(nameB[1]);
                    }
                    else {
                        return (-1) ** (nameA[0] > nameB[0] ? 0 : 1);
                    }
                });
            default:
                return this.geometric.filter(obj => !(obj instanceof Point)).sort((a, b) => {
                    const nameA = a.name.split('_');
                    const nameB = b.name.split('_');
                    if (nameA[0] === nameB[0]) {
                        return parseInt(nameA[1]) - parseInt(nameB[1]);
                    }
                    else {
                        return (-1) ** (nameA[0] > nameB[0] ? 0 : 1);
                    }
                });
        }
    }
    /**
     * Search the last name not used and give a new name
     * @param {string} typeSelect Type of object 'Point', 'Line' etc.
     * @returns {string} New name for a new object
     */
    getLastNameNotUsed(typeSelect = 'Point') {
        switch (typeSelect) {
            case 'Point': {
                const list = this.getListObjectTypeSelect('Point');
                let nonUseLetter;
                let i = 0;
                do {
                    const indice = i === 0 ? '' : `_${i}`;
                    nonUseLetter = this.names.find(letter => list.filter(x => x.name[0] === letter).find(obj => obj.name === letter + indice)?.name !== letter + indice);
                    if (nonUseLetter !== undefined)
                        nonUseLetter += indice;
                    i += 1;
                } while (nonUseLetter === undefined);
                return nonUseLetter;
            }
            case 'Segment':
            case 'Line': {
                const list = this.getListObjectTypeSelect('Segment').concat(this.getListObjectTypeSelect('Line'));
                return this.names.find(letter => list.find(obj => obj.name.split('')[0] === letter.toLowerCase())?.name.split('_')[0] !== letter.toLowerCase()).toLowerCase();
            }
        }
    }
    /**
     * Give a new name
     * @param {string} typeSelect Type of the object
     * @returns {string}
     */
    getNewName(typeSelect = 'Point') {
        switch (typeSelect) {
            case 'Point':
                return this.getLastNameNotUsed(typeSelect);
            case 'Segment':
            case 'Line':
                return this.getLastNameNotUsed(typeSelect);
        }
    }
    /**
     * Append new objects to the euclidean plan
     * @param  {...any} args // List of geometric objects
     */
    addPoint(n = 1) {
        // Il faudrait donner la possibilité d'ajouter des points définis par leurs coordonnées
        const newPoints = [];
        for (let i = 0; i < n; i++) {
            let obj;
            do {
                obj = new Point(new Cartesian(Math.random() * this.width + this.xmin, Math.random() * this.height + this.ymin));
            } while (this.isCloseToExistingPoints(obj) || this.isCloseToLineThroughtExistingPoints(obj));
            obj.name = this.getNewName(obj.type);
            this.geometric.push(obj);
            newPoints.push(obj);
        }
        return newPoints;
    }
    /**
     * Add intersect point of two lines in the view
     * @param {Line} line1
     * @param {Line} line2
     * @returns {Point}
     */
    addIntersectLine(line1, line2) {
        const delta = line1.a * line2.b - line2.a * line1.b;
        if (delta.toFixed(15) !== '0') {
            const deltax = -(line1.b * line2.c - line2.b * line1.c);
            const deltay = line1.a * line2.c - line2.a * line1.c;
            const point = new Point(new Cartesian(deltax / delta, deltay / delta));
            point.name = this.getNewName(point.type);
            this.geometric.push(point);
            return [point];
        }
    }
    /**
     * Zoom in or out
     * @param {number} k
     */
    zoom(k = 1.01) {
        const xmin = k * (this.xmin - (this.xmax + this.xmin) / 2) + (this.xmax + this.xmin) / 2;
        const xmax = k * (this.xmax - (this.xmax + this.xmin) / 2) + (this.xmax + this.xmin) / 2;
        const ymin = k * (this.ymin - (this.ymax + this.ymin) / 2) + (this.ymax + this.ymin) / 2;
        const ymax = k * (this.ymax - (this.ymax + this.ymin) / 2) + (this.ymax + this.ymin) / 2;
        this.setDimensions(xmin, ymin, xmax, ymax);
    }
    /**
     * Give the distance between tow points, a point and a line, two lines
     * @param  {...any} args
     * @returns
     */
    distance(...args) {
        if (args.every(x => x.type === 'Point')) {
            return Math.sqrt((args[0].x - args[1].x) ** 2 + (args[0].y - args[1].y) ** 2);
        }
        // if (args.every(x => x.type === 'Line')) return // distance entre deux droites
        const M = args.filter(x => x.type === 'Point')[0];
        const d = args.filter(x => x.type === 'Line')[0];
        return Math.abs(d.a * M.x + d.b * M.y - d.c) / Math.sqrt(d.a ** 2 + d.b ** 2);
    }
    /**
     * Tempt to estimate if a point is close to the existing points
     * @param {Point} M
     * @returns
     */
    isCloseToExistingPoints(M) {
        const listExistingPoints = this.getListObjectTypeSelect('Point');
        const maxDistance = Math.min(this.height, this.width) / listExistingPoints.length / 3;
        if (listExistingPoints.length > 0) {
            return listExistingPoints.some(X => this.distance(X, M) < maxDistance);
        }
        return false;
    }
    /**
     * Tempt to estimate if a point is close to the line through the existing point
     * @param {Point} M
     * @returns
     */
    isCloseToLineThroughtExistingPoints(M) {
        const listExistingPoints = this.getListObjectTypeSelect('Point');
        const numberOfPoints = listExistingPoints.length;
        const result = [];
        const minDimension = Math.min(this.height, this.width) / numberOfPoints / 3;
        for (let i = 0; i < numberOfPoints; i++) {
            for (let j = i + 1; j < numberOfPoints; j++) {
                const d = new Line(listExistingPoints[i], listExistingPoints[j]);
                result.push(this.distance(M, d));
            }
        }
        return result.some(x => x < minDimension && parseFloat(x.toFixed(15)) !== 0);
    }
    /**
     * Add a new line to the view with new name
     * @param  {Line|Point,Point} args // Line or Line through two point existing or not
     * @returns {Line}
     */
    addLine(P1 = this.addPoint()[0], P2 = this.addPoint()[0]) {
        const line = new Line(P1, P2);
        line.name = this.getNewName(line.type);
        this.geometric.push(line);
        return line;
    }
    /**
     * Add a new Segment to the view with new name
     * @param  {Point,Point} args // Segment
     * @returns {Segment}
     */
    addSegment(P1 = this.addPoint()[0], P2 = this.addPoint()[0]) {
        const segment = new Segment(P1, P2);
        segment.name = this.getNewName(segment.type);
        this.geometric.push(segment);
        return segment;
    }
    /**
     * Get the intersect point of a line and the bordure
     * @param {Line} line
     * @returns {Point}
     */
    getExtremPointGraphicLine(line) {
        const x = [
            [line.getXPoint(this.ymin), this.ymin],
            [line.getXPoint(this.ymax), this.ymax] // [xmin,xmax]
        ];
        const y = [
            [this.xmin, line.getYPoint(this.xmin)],
            [this.xmax, line.getYPoint(this.xmax)] // [ymin,ymax]
        ];
        const extremites = [];
        for (const u of x) {
            if (u.every(v => v !== undefined) && u[0] >= this.xmin && u[0] <= this.xmax) {
                extremites.push(u);
            }
        }
        for (const u of y) {
            if (u.every(v => v !== undefined) && u[1] >= this.ymin && u[1] <= this.ymax) {
                extremites.push(u);
            }
        }
        if (extremites.length === 2) {
            return [
                new Point(new Cartesian(extremites[0][0], extremites[0][1])),
                new Point(new Cartesian(extremites[1][0], extremites[1][1]))
            ];
        }
        else {
            return undefined;
        }
    }
    /**
     * get a point between two existing points
     * @param {Point} point1
     * @param {Point} point2
     * @returns {Point}
     */
    getNewPointBetween(A, B) {
        const k = Math.random();
        return new Point(new Cartesian((A.x - B.x) * k + B.x, (A.y - B.y) * k + B.y));
    }
    /**
     * Add three point, two point or one point aligned to others
     * @param  {Point,Point} args // If no point or one point we creat new points
     * @returns
     */
    addPointAligned(...args) {
        let P3, P1, P2;
        do {
            if (P1 !== undefined) {
                for (let i = 0; i < 2 - args.length; i++) {
                    this.geometric.pop();
                }
            }
            [P1, P2] = args.concat(this.addPoint(2 - args.length));
            const line = new Line(P1, P2);
            const [X1, X2] = this.getExtremPointGraphicLine(line);
            P3 = this.getNewPointBetween(X1, X2);
        } while (this.isCloseToExistingPoints(P3) || this.isCloseToLineThroughtExistingPoints(P3));
        P3.name = P3.name || this.getNewName(P3.type);
        this.geometric.push(P3);
        return [P1, P2, P3];
    }
    /**
     * Distances to the sides of a triangle
     * @param  {Point,Point,Point} args
     * @returns
     */
    distanceMinSidesVertices(P1, P2, P3) {
        // A faire pour n'importe quel nombre de sommets ?
        return Math.min(this.distance(P1, new Line(P2, P3)), this.distance(P2, new Line(P1, P3)), this.distance(P3, new Line(P1, P2)));
    }
    /**
     * Add three points not aligned or one not aligned with the two others
     * @param  {Point,Point} args If no point we create three new points
     * @returns {Point}
     */
    addNotAlignedPoint(P1 = this.addPoint()[0], P2 = this.addPoint()[0], P3 = undefined) {
        // Le troisième point est écrasé si existant
        // Réfléchir à un ensemble plus grand de points non alignés
        const minDimension = Math.min(this.height, this.width) / this.getListObjectTypeSelect('Point').length / 3;
        do {
            if (P3 !== undefined)
                this.geometric.pop();
            P3 = this.addPoint()[0];
        } while (this.distanceMinSidesVertices(P1, P2, P3) < minDimension);
        P3.name = P3.name || this.getNewName(P3.type);
        return [P1, P2, P3];
    }
    /**
     * Add a parallel line to another one or two parallel lines
     * @param  {Point,Line|Line} args If no args we create two parallels
     * @returns {Line}
     */
    addParallelLine(P = this.addPoint()[0], line = this.addLine()) {
        const parallel = new Line(P, line.direction);
        parallel.name = this.getNewName(parallel.type);
        this.geometric.push(parallel);
        return [line, parallel];
    }
    /**
     * Add the sides of a polygon
     * @param  {...any} args
     * @returns {Group}
     */
    addSidesPolygon(...args) {
        const lines = [];
        for (let i = 0; i < args.length - 1; i++) {
            lines.push(this.addSegment(args[i], args[i + 1]));
        }
        lines.push(this.addSegment(args[args.length - 1], args[0]));
        return lines;
    }
    /**
     * Add a group of 4 points making a parallelogram
     * @param  {...any} args // 0-3 Point
     * @returns {Group}
     */
    addParallelogram(A = this.addPoint()[0], B = this.addPoint()[0], C = this.addNotAlignedPoint(A, B)[2], D = undefined) {
        D = new Point(new Cartesian(A.x + C.x - B.x, A.y + C.y - B.y));
        D.name = D.name || this.getNewName(D.type);
        this.geometric.push(D);
        return [A, B, C, D];
    }
    addHomothetic(O, k, ...args) {
        const homotheticPoints = [];
        args.map(M => {
            const point = new Point(new Cartesian(k * M.x + (1 - k) * O.x, k * M.y + (1 - k) * O.y));
            point.name = point.name || this.getNewName(point.type);
            this.geometric.push(point);
            homotheticPoints.push(point);
            return point;
        });
        return homotheticPoints;
    }
    /**
     * Export to Mathalea2D
     * @returns {Mathalea2D}
     */
    getMathalea2DExport(...args) {
        this.show(...args);
        return getMathalea2DExport(this);
    }
}
