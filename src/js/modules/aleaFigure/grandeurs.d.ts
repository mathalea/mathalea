import { GVGraphicObject, GVPoint } from './elements.js';
/**
 * Grandeur, methods for operations
 *
 */
export declare class GVGrandeur {
    value: number;
    precision: number;
    unit: string;
    toFixed: number;
    nameAndValue: string;
    private _name;
    calcul: string;
    constructor(name: string | GVPoint[], value: number, precision?: number, unit?: string);
    set name(newname: string | GVPoint[]);
    get name(): string | GVPoint[];
    format(): string;
    /**
     *
     * @param nmin
     * @param nmax
     * @param digit
     * @returns
     */
    aleaName(...name: (string | GVGraphicObject)[]): void;
    multiply(a: GVGrandeur): GVGrandeur;
    divide(a: GVGrandeur): GVGrandeur;
    add(a: GVGrandeur): GVGrandeur;
    subtract(a: GVGrandeur): GVGrandeur;
    hypotenuse(a: GVGrandeur): GVGrandeur;
    /**
     * this^n
     * @param n // Integer
     * @returns
     */
    pow(n: number): GVGrandeur;
    /**
     * this^n
     * @param n // Integer
     * @returns
     */
    sqrt(): GVGrandeur;
    abs(): GVGrandeur;
    neg(): GVGrandeur;
    to(newUnit: string): GVGrandeur;
}
/**
 * Quantity random
 * @param nmin
 * @param nmax
 * @param digit
 * @param name
 * @param unit
 * @returns
 */
export declare function qrandom(nmin?: number, nmax?: number, digit?: number, name?: string, unit?: string): GVGrandeur;
