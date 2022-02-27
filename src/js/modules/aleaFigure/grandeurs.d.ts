import { GraphicObject, Point } from './elements.js';
/**
 * Grandeur, methods for operations
 *
 */
export declare class Grandeur {
    value: number;
    precision: number;
    unit: string;
    toFixed: number;
    nameAndValue: string;
    private _name;
    calcul: string;
    constructor(name: string | Point[], value: number, precision?: number, unit?: string);
    set name(newname: string | Point[]);
    get name(): string | Point[];
    format(): string;
    /**
     *
     * @param nmin
     * @param nmax
     * @param digit
     * @returns
     */
    aleaName(...name: (string | GraphicObject)[]): void;
    multiply(a: Grandeur): Grandeur;
    divide(a: Grandeur): Grandeur;
    add(a: Grandeur): Grandeur;
    subtract(a: Grandeur): Grandeur;
    hypotenuse(a: Grandeur): Grandeur;
    /**
     * this^n
     * @param n // Integer
     * @returns
     */
    pow(n: number): Grandeur;
    /**
     * this^n
     * @param n // Integer
     * @returns
     */
    sqrt(): Grandeur;
    abs(): Grandeur;
    neg(): Grandeur;
    to(newUnit: string): Grandeur;
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
export declare function qrandom(nmin?: number, nmax?: number, digit?: number, name?: string, unit?: string): Grandeur;
