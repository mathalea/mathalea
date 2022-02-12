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
    constructor(coord: any);
    getPolarCoordinates(): any;
    getCartesianCoordinates(): any;
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
}
/**
   * @class
   * @classdesc Caracteristics of a line in an euclidean plan (ax+by=c)
   */
export declare class Line extends GraphicObject {
    direction: Vector;
    A: any;
    B: Point;
    type: string;
    b: number;
    c: number;
    a: any;
    constructor(A: Point, B: Point | Vector);
    getYPoint(x: number): number;
    getXPoint(y: number): number;
    getEquation(): void;
}
/**
   * @class
   * @classdesc Caracteristics of a segment in an euclidean plan
   */
export declare class Segment extends Line {
    constructor(A: any, B: any);
}
