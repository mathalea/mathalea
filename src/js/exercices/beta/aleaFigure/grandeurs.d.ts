import { GraphicObject } from './elements.js';
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
    constructor(name: string, value: number, precision?: number, unit?: string);
    set name(newname: string);
    get name(): string;
    aleaName(...name: (string | GraphicObject)[]): void;
    multiply(a: Grandeur): Grandeur;
    divide(a: Grandeur): Grandeur;
    add(a: Grandeur): Grandeur;
    subtract(a: Grandeur): Grandeur;
    abs(): Grandeur;
    neg(): Grandeur;
    to(newUnit: string): Grandeur;
}
