import { Cartesian, Coordinates, Polar } from './coordinates.js';
/**
 * @class
 * @classdesc Graphic object like Point, Line, Segment etc.
 */
export declare class GraphicObject {
    visible: boolean;
    name: string;
    constructor();
    aleaName(...name: (string | GraphicObject)[]): void;
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
    constructor(coord: Coordinates);
    getPolarCoordinates(): Polar;
    getCartesianCoordinates(): Cartesian;
    xSVG: (coeff: any) => number;
    ySVG: (coeff: any) => number;
}
export declare class Vector {
    x: number;
    y: number;
    unit: boolean;
    norme: number;
    constructor(x: number, y: number, unit?: boolean);
    getUnit(): Vector;
    getNormal(): Vector;
    add(X: Vector | Point): Vector;
    sub(X: Vector | Point): Vector;
    neg(): Vector;
    dot(X: Vector | Point): number;
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
    constructor(A: Point, B: Point | Vector);
    getYPoint(x: number): number;
    getXPoint(y: number): number;
    getEquation(): void;
    getPerpendicularLine(P: Point): Line;
}
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
