import { Point, Line, Segment, GraphicObject, Circle } from './elements.js';
/**
* Donne une liste d'entiers relatifs dont on connait la somme.
* @example > listeEntiersSommeConnue(4,10,-2)
* < [1,-2,6,5]
* @param {int} nbElements Nombre d'éléments de la liste
* @param {int} total Somme des éléments de la liste (peut être un nombre négatif)
* @param {int} [valMin = 1] Valeur minimale de chaque élément (peut être un nombre négatif)
* @return {Array} Liste d'entiers relatifs
* @author Frédéric PIOU
*/
export declare function listeEntiersSommeConnue(nbElements: any, total: any, valMin?: number): any[];
/**
 * @class
 * @classdesc Caracteristics of a graphic view
 * @author Frédéric PIOU
 */
export declare class GraphicView {
    names: string[];
    ppc: number;
    scale: number;
    geometric: GraphicObject[];
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
    width: number;
    height: number;
    ratio: number;
    constructor(xmin: number, ymin: number, xmax: number, ymax: number);
    setDimensions(xmin?: number, ymin?: number, xmax?: number, ymax?: number): void;
    /**
     * Show any Objects in Mathalea2D
     * @example
     * show(A,B,C,ABC)
     */
    show(...args: GraphicObject[]): GraphicObject[];
    /**
     * Resize window of graphic view to the created points
     * Keep the ratio
     */
    resize(): void;
    /**
     * Give the list sorted of object with a given type
     */
    getListObjectTypeSelect(typeSelect?: string): any;
    /**
     * Search the last name not used and give a new name
     */
    getLastNameNotUsed(typeSelect?: string): any;
    /**
     * Give a new name
     */
    getNewName(typeSelect?: string): any;
    /**
     * Append new objects to the euclidean plan
     */
    addPoint(n?: number): any[];
    /**
     * Add intersect point of two lines in the view
     */
    addIntersectLine(line1: Line, line2: Line): Point[];
    /**
     * Zoom in or out
     */
    zoom(k?: number): void;
    /**
     * Give the distance between tow points, a point and a line, two lines
     */
    distance(P: Point, Y: Point | Line): number;
    /**
     * Tempt to estimate if a point is close to the existing points
     */
    isCloseToExistingPoints(M: Point): any;
    /**
     * Tempt to estimate if a point is close to the line through the existing point
     */
    isCloseToLineThroughtExistingPoints(M: Point): boolean;
    /**
     * Add a new line to the view with new name
     */
    addLine(P1?: any, P2?: any): Line;
    /**
     * Add a new Segment to the view with new name
     */
    addSegment(P1?: any, P2?: any): Segment;
    /**
     * Add a new circle center
     * @param C
     * @param P
     * @returns
     */
    addCircle(C?: any, P?: any): Circle;
    /**
     * Get the intersect point of a line and the bordure
     */
    getExtremPointGraphicLine(L: Line): Point[];
    /**
     * get a point between two points
     * @param {Point} point1
     * @param {Point} point2
     * @returns {Point}
     */
    getNewPointBetween(A: any, B: any): Point;
    /**
     * Add point between two but not too close to extrems
     * @param A
     * @param B
     * @returns
     */
    addPointBetween(A: Point, B: Point): Point;
    addPointDistance(A: Point, r: number): Point;
    addPointInPolygon(...args: Point[]): Point;
    addPointOutPolygon(...args: Point[]): Point;
    addPointOnPolygon(...args: Point[]): Point;
    addSymetric(X: Point | Line, ...args: Point[]): Point[];
    /**
     * Add three point, two point or one point aligned to others
     * @param  {Point,Point} args // If no point or one point we creat new points
     * @returns
     */
    addPointAligned(P1?: any, P2?: any): any[];
    /**
     * P1, P2, P3 with P2P1P3 rectangular in P1
     * @param args
     * @returns
     */
    addRectPoint(...args: any[]): any[];
    /**
     * Distances to the sides of a triangle
     * @param  {Point,Point,Point} args
     * @returns
     */
    distanceMinSidesVertices(P1: any, P2: any, P3: any): number;
    /**
     * Add three points not aligned or one not aligned with the two others
     * @param  {Point,Point} args If no point we create three new points
     * @returns {Point}
     */
    addNotAlignedPoint(P1?: any, P2?: any, P3?: any): Point[];
    /**
     * Add a parallel line to another one or two parallel lines
     * @param  {Point,Line|Line} args If no args we create two parallels
     * @returns {Line}
     */
    addParallelLine(P?: any, line?: Line): Line[];
    addPerpendicularLine(P?: any, line?: Line): Line[];
    /**
     * Add the sides of a polygon
     * @param  {...any} args
     * @returns {Group}
     */
    addSidesPolygon(...args: any[]): any[];
    /**
     * Add a group of 4 points making a parallelogram
     * @param  {...any} args // 0-3 Point
     * @returns {Group}
     */
    addParallelogram(A?: any, B?: any, C?: Point, D?: any): any[];
    addRegularPolygon(A: Point, B: Point, n: number): Point[];
    addRegularPolygonCenter(A: Point, B: Point, n: number): Point;
    addHomothetic(O: Point, k: number, ...args: Point[]): Point[];
    addRotate(O: Point, angle: number, ...args: Point[]): any[];
    exportGGB(arg?: GraphicObject[]): string;
    /**
     * Export to Mathalea2D
     * @returns {Mathalea2D}
     */
    getMathalea2DExport(...args: any[]): any;
}
