import { PointByReflectionOverLine } from './../points/PointByReflectionOverLine';
import { PointByHomothetie } from './../points/PointByHomothetie';
import { PointByTranslationVector } from './../points/PointByTranslationVector';
import { PointByTranslation } from './../points/PointByTranslation';
import { PointBySimilitude } from './../points/PointBySimilitude';
import { Polygon } from './Polygon';
import { PointByRotation } from './../points/PointByRotation';
import { Element2D } from '../Element2D';
export class Polyline extends Element2D {
    constructor(...points) {
        super(points[0].parentFigure);
        this.points = points;
        this.g = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        this.g.setAttribute('points', `${listeXY(this.points)}`);
        this.g.setAttribute('fill', 'none');
        this.g.setAttribute('stroke', 'black');
        this.parentFigure.svg.appendChild(this.g);
        this.parentFigure.set.add(this);
        for (const point of points) {
            point.addChild(this);
        }
    }
    update() {
        try {
            this.g.setAttribute('points', `${listeXY(this.points)}`);
        }
        catch (error) {
            console.log('Erreur dans Polyline.update', error);
            this.exist = false;
        }
    }
    rotation(center, angle) {
        try {
            const points = [];
            for (let i = 0; i < this.points.length; i++) {
                points[i] = new PointByRotation(this.points[i], center, angle, { temp: true });
            }
            return new Polygon(...points);
        }
        catch (error) {
            console.log('Erreur dans PolyLine.rotation()', error);
            return new Polygon(...this.points);
        }
    }
    similitude(center, k, angle) {
        try {
            const points = [];
            for (let i = 0; i < this.points.length; i++) {
                points[i] = new PointBySimilitude(this.points[i], center, k, angle, { temp: true });
            }
            return new Polygon(...points);
        }
        catch (error) {
            console.log('Erreur dans PolyLine.similitude()', error);
            return new Polygon(...this.points);
        }
    }
    translation(xt, yt) {
        try {
            const points = [];
            for (let i = 0; i < this.points.length; i++) {
                points[i] = new PointByTranslation(this.points[i], xt, yt, { temp: true });
            }
            return new Polygon(...points);
        }
        catch (error) {
            console.log('Erreur dans Polyline.translation()', error);
            return new Polygon(...this.points);
        }
    }
    translationVector(v) {
        try {
            const points = [];
            for (let i = 0; i < this.points.length; i++) {
                points[i] = new PointByTranslationVector(this.points[i], v, { temp: true });
            }
            return new Polygon(...points);
        }
        catch (error) {
            console.log('Erreur dans Polyline.translationVector()', error);
            return new Polygon(...this.points);
        }
    }
    homothetie(center, k) {
        try {
            const points = [];
            for (let i = 0; i < this.points.length; i++) {
                points[i] = new PointByHomothetie(this.points[i], center, k, { temp: true });
            }
            return new Polygon(...points);
        }
        catch (error) {
            console.log('Erreur dans Polyline.homothetie()', error);
            return new Polygon(...this.points);
        }
    }
    reflectionOverLine(L) {
        try {
            const points = [];
            for (let i = 0; i < this.points.length; i++) {
                points[i] = new PointByReflectionOverLine(this.points[i], L, { temp: true });
            }
            return new Polygon(...points);
        }
        catch (error) {
            console.log('Erreur dans Polyline.reflectionOverLine()', error);
            return new Polygon(...this.points);
        }
    }
}
function listeXY(points) {
    try {
        const parentFigure = points[0].parentFigure;
        let liste = '';
        for (const point of points) {
            liste += `${parentFigure.xToSx(point.x)}, ${parentFigure.yToSy(point.y)} `;
        }
        return liste;
    }
    catch (error) {
        console.log('Erreur dans Polyline.listeXY', error);
        return [];
    }
}
//# sourceMappingURL=Polyline.js.map