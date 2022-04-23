/**
 * @class for coordinates
 */
export declare class GVCoordinates {
    r: number;
    x: number;
    y: number;
    theta: number;
    getCartesianCoordinates(): GVCartesian;
    getPolarCoordinates(): GVPolar;
    format(): string;
}
/**
     * @class for cartesian coordinates
     */
export declare class GVCartesian extends GVCoordinates {
  constructor(x: number, y: number);
  format(): string;
}
/**
     * @class for polar coordinates
     */
export declare class GVPolar extends GVCoordinates {
  constructor(r: number, theta: number);
  format(): string;
}
