/**
 * @class for coordinates
 */
export declare class Coordinates {
    r: number;
    x: number;
    y: number;
    theta: number;
    getCartesianCoordinates(): Cartesian;
    getPolarCoordinates(): Polar;
}
/**
     * @class for cartesian coordinates
     */
export declare class Cartesian extends Coordinates {
    constructor(x: number, y: number);
}
/**
     * @class for polar coordinates
     */
export declare class Polar extends Coordinates {
    constructor(r: number, theta: number);
}
