import { GraphicView } from "./GraphicView";
export declare class AleaThalesConfig extends GraphicView {
    classicConfig: boolean;
    k: number;
    AOB: boolean;
    OAB: boolean;
    constructor(k?: boolean);
    create(k?: boolean): void;
    new(): void;
    /**
     * Set dimensions
     * @example
     * this.setDimensions(0.5) - > rectangle half height from the setting xmin, ymin and xmax
     * this.setDimensions(7,5) - > rectangle width=7 and height=5
     * this.setdimensions(0,0,7,6) - > xmin, ymin, xmax, ymax
     * @param args
     */
    setDimensions(...args: number[]): void;
}
