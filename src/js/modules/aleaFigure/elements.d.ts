import { Cartesian, Coordinates, Polar } from './coordinates.js';
import { MathArray, Matrix } from 'mathjs';
/**
 * @class
 * @classdesc Graphic object like Point, Line, Segment etc.
 */
export declare class GraphicObject {
    visible: boolean;
    _name: string;
    color: string;
    constructor();
    aleaName(...name: (string | GraphicObject)[]): void;
    set name(newname: string);
    get name(): string;
    getGGB(): string;
    /**
     * Move this right to figures
     * @param figures
     */
    moveRight(...figures: GraphicObject[]): void;
    move(V: Vector): void;
}
/**
 * @class
 * @classdesc Caracteristics of a point in an euclidean plan
 */
export declare class Point extends GraphicObject {
    coordinates: Coordinates;
    polarCoordinates: Polar;
    cartesianCoordinates: Cartesian;
    type: string;
    x: number;
    y: number;
    r: number;
    theta: number;
    ggb: string;
    dot: string;
    labelPoints: [Point, Point, Point];
    label: boolean;
    constructor(arg1: Coordinates | number, arg2?: number);
    getPolarCoordinates(): Cartesian;
    getCartesianCoordinates(): Cartesian;
    xSVG: (coeff: any) => number;
    ySVG: (coeff: any) => number;
    getRotate(O: Point, angle: number): Point;
    add(X: Vector | Point): Point;
    sub(X: Vector | Point): Point;
    multiply(k: number): Point;
    divide(k: number): Point;
    getBarycentriqueCoords(A: Point, B: Point, C: Point): number[];
    isInTriangle(A: Point, B: Point, C: Point): boolean;
    /**
     * Get the symétric of P with this
     * @param P
     * @returns
     */
    getSymetric(P: Point): Point;
    getHomothetic(O: Point, k: number): Point;
    getVector(): Vector;
    getGGB(): string;
    showLabel(scaleppc?: number): string;
    showDot(): this;
    set name(newname: string);
    get name(): string;
}
export declare class Vector {
    x: number;
    y: number;
    norme: number;
    constructor(arg1: number | Point, arg2: number | Point);
    getNormed(): Vector;
    getNormal(): Vector;
    add(X: Vector | Point): Vector;
    sub(X: Vector | Point): Vector;
    multiply(k: number): Vector;
    neg(): Vector;
    dot(X: Vector | Point): number;
    cross(X: Vector | Point): MathArray | Matrix;
    colinear(V: Vector): boolean;
}
/**
   * @class
   * @classdesc Caracteristics of a line in an euclidean plan (ax+by=c)
   */
export declare class Line extends GraphicObject {
    direction: Vector;
    A: Point;
    B: Point;
    type: string;
    a: number;
    b: number;
    c: number;
    ggb: string;
    constructor(A: Point, B: Point | Vector);
    getYPoint(x: number): number;
    getXPoint(y: number): number;
    getEquation(): void;
    getIntersect(L: Line): Point;
    getPerpendicularLine(P: Point): Line;
    /**
     * Get the symétric of P with this
     * @param P
     * @returns
     */
    getSymetric(P: Point): Point;
    set name(newname: string);
    get name(): string;
}
export declare function determinant(X: Vector | Point, Y: Vector | Point): number;
export declare function barycentre(P: Point[], a: number[]): Point;
/**
   * @class
   * @classdesc Caracteristics of a segment in an euclidean plan
   */
export declare class Segment extends Line {
    constructor(A: Point, B: Point);
}
/**
   * @class
   * @classdesc Caracteristics of a circle in an euclidean plan
   */
export declare class Circle extends GraphicObject {
    A: Point;
    B: Point | number;
    type: string;
    a: number;
    b: number;
    r: number;
    constructor(A: Point, B: Point | number);
    getPoint(theta: number): Point;
}
/**
   * @class
   * @classdesc Caracteristics of an angle
   */
export declare class Angle extends GraphicObject {
    A: Point;
    B: Point;
    C: Point;
    angle: number;
    type: string;
    direct: boolean;
    vBA: Vector;
    vBC: Vector;
    right: boolean;
    fillColor: string;
    fillOpacity: number;
    rayon: boolean;
    constructor(A: Point, B: Point, C: Point);
    scale(scale: number): void;
}
/**
   * @class
   * @classdesc Caracteristics of an angle
   */
export declare class Polygon extends GraphicObject {
    vertices: Point[];
    showLabels: boolean;
    constructor(...args: Point[]);
    getDimensions(): number[];
}
/**
  * @class
  * @classdesc Caracteristics of a triangle
  */
export declare class Triangle extends Polygon {
    constructor(...args: Point[]);
}
