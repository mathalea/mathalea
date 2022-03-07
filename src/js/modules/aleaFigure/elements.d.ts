import { GVCartesian, GVCoordinates, GVPolar } from './coordinates.js';
import { MathArray, Matrix } from 'mathjs';
/**
 * @class
 * @classdesc Graphic object like Point, Line, Segment etc.
 */
export declare class GVGraphicObject {
    visible: boolean;
    _name: string;
    color: string;
    constructor();
    aleaName(...name: (string | GVGraphicObject)[]): void;
    set name(newname: string);
    get name(): string;
    getGGB(): string;
    /**
     * Move this right to figures
     * @param figures
     */
    moveRight(...figures: GVGraphicObject[]): void;
    move(V: GVVector): void;
}
/**
 * @class
 * @classdesc Caracteristics of a point in an euclidean plan
 */
export declare class GVPoint extends GVGraphicObject {
    coordinates: GVCoordinates;
    polarCoordinates: GVPolar;
    cartesianCoordinates: GVCartesian;
    type: string;
    x: number;
    y: number;
    r: number;
    theta: number;
    ggb: string;
    dot: string;
    labelPoints: [GVPoint, GVPoint, GVPoint];
    label: boolean;
    M2D: string;
    constructor(arg1: GVCoordinates | number, arg2?: number);
    getPolarCoordinates(): GVCartesian;
    getCartesianCoordinates(): GVCartesian;
    xSVG: (coeff: any) => number;
    ySVG: (coeff: any) => number;
    getRotate(O: GVPoint, angle: number): GVPoint;
    add(X: GVVector | GVPoint): GVPoint;
    sub(X: GVVector | GVPoint): GVPoint;
    multiply(k: number): GVPoint;
    divide(k: number): GVPoint;
    getBarycentriqueCoords(A: GVPoint, B: GVPoint, C: GVPoint): number[];
    isInTriangle(A: GVPoint, B: GVPoint, C: GVPoint): boolean;
    /**
     * Get the symétric of P with this
     * @param P
     * @returns {GVPoint}
     */
    getSymetric(P: GVPoint): GVPoint;
    getHomothetic(O: GVPoint, k: number): GVPoint;
    getVector(): GVVector;
    getGGB(): string;
    showName(scaleppc?: number): string;
    showDot(): this;
    set name(newname: string);
    get name(): string;
}
export declare class GVVector {
    x: number;
    y: number;
    norme: number;
    constructor(arg1: number | GVPoint, arg2: number | GVPoint);
    getNormed(): GVVector;
    getNormal(): GVVector;
    add(X: GVVector | GVPoint): GVVector;
    sub(X: GVVector | GVPoint): GVVector;
    multiply(k: number): GVVector;
    neg(): GVVector;
    dot(X: GVVector | GVPoint): number;
    cross(X: GVVector | GVPoint): MathArray | Matrix;
    colinear(V: GVVector): boolean;
}
/**
   * @class
   * @classdesc Caracteristics of a line in an euclidean plan (ax+by=c)
   */
export declare class GVLine extends GVGraphicObject {
    direction: GVVector;
    A: GVPoint;
    B: GVPoint;
    type: string;
    a: number;
    b: number;
    c: number;
    ggb: string;
    constructor(A: GVPoint, B: GVPoint | GVVector);
    getYPoint(x: number): number;
    getXPoint(y: number): number;
    getEquation(): void;
    getIntersect(L: GVLine): GVPoint;
    getPerpendicularLine(P: GVPoint): GVLine;
    /**
     * Get the symétric of P with this
     * @param P
     * @returns {GVPoint}
     */
    getSymetric(P: GVPoint): GVPoint;
    set name(newname: string);
    get name(): string;
}
export declare function determinant(X: GVVector | GVPoint, Y: GVVector | GVPoint): number;
export declare function barycentre(P: GVPoint[], a: number[]): GVPoint;
/**
   * @class
   * @classdesc Caracteristics of a segment in an euclidean plan
   */
export declare class GVSegment extends GVLine {
    label: boolean;
    text: string;
    textColor: string;
    direct: boolean;
    constructor(A: GVPoint, B: GVPoint);
    showLabel(scaleppc?: number): string;
}
/**
   * @class
   * @classdesc Caracteristics of a circle in an euclidean plan
   */
export declare class GVCircle extends GVGraphicObject {
    A: GVPoint;
    B: GVPoint | number;
    type: string;
    a: number;
    b: number;
    r: number;
    constructor(A: GVPoint, B: GVPoint | number);
    getPoint(theta: number): GVPoint;
}
/**
   * @class
   * @classdesc Caracteristics of an angle
   */
export declare class GVAngle extends GVGraphicObject {
    A: GVPoint;
    B: GVPoint;
    C: GVPoint;
    angle: number;
    type: string;
    direct: boolean;
    vBA: GVVector;
    vBC: GVVector;
    right: boolean;
    fillColor: string;
    fillOpacity: number;
    rayon: boolean;
    constructor(A: GVPoint, B: GVPoint, C: GVPoint);
    scale(scale: number): void;
}
/**
   * @class
   * @classdesc Caracteristics of an angle
   */
export declare class GVPolygon extends GVGraphicObject {
    vertices: GVPoint[];
    showLabels: boolean;
    constructor(...args: GVPoint[]);
    getDimensions(): number[];
}
/**
   * @class
   * @classdesc Caracteristics of a triangle
   */
export declare class GVRectangle extends GVPolygon {
    longueur: number;
    largeur: number;
    ratio: number;
    constructor(...args: GVPoint[]);
}
/**
  * @class
  * @classdesc Caracteristics of a triangle
  */
export declare class GVTriangle extends GVPolygon {
    constructor(...args: GVPoint[]);
}
