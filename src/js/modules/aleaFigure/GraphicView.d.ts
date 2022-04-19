// import { GVRectangle, GVTriangle, GVPolygon, GVVector, GVAngle, GVPoint, GVLine, GVSegment, GVGraphicObject, GVCircle } from './elements.js';
// /**
// * Donne une liste d'entiers relatifs dont on connait la somme.
// * @example > listeEntiersSommeConnue(4,10,-2)
// * < [1,-2,6,5]
// * @param {int} nbElements Nombre d'éléments de la liste
// * @param {int} total Somme des éléments de la liste (peut être un nombre négatif)
// * @param {int} [valMin = 1] Valeur minimale de chaque élément (peut être un nombre négatif)
// * @return {Array} Liste d'entiers relatifs
// * @author Frédéric PIOU
// */
// export declare function listeEntiersSommeConnue(nbElements: any, total: any, valMin?: number): any[];
// /**
//  * @class
//  * @classdesc Caracteristics of a graphic view
//  * @author Frédéric PIOU
//  */
// export declare class GVGraphicView {
//     names: string[];
//     ppc: number;
//     scale: number;
//     geometric: GVGraphicObject[];
//     geometricExport: GVGraphicObject[];
//     grid: GVLine[];
//     axes: GVLine[];
//     xmin: number;
//     ymin: number;
//     xmax: number;
//     ymax: number;
//     width: number;
//     height: number;
//     ratio: number;
//     clipVisible: boolean;
//     saveRatio: boolean;
//     allowResize: boolean;
//     showLabelPoint: boolean;
//     limit: number;
//     _namesAlea: boolean;
//     constructor(xmin?: number, ymin?: number, xmax?: number, ymax?: number);
//     set namesAlea(names: string[] | boolean);
//     get namesAlea(): string[] | boolean;
//     setDimensions(xmin?: number, ymin?: number, xmax?: number, ymax?: number): void;
//     /**
//      * Show any Objects in Mathalea2D
//      * @example
//      * show(A,B,C,ABC)
//      */
//     show(...args: GVGraphicObject[]): GVGraphicObject[];
//     addGrid(step?: number): void;
//     addAxes(): void;
//     getDimensions(...liste: GVGraphicObject[]): [number, number, number, number];
//     getWidth(...liste: GVGraphicObject[]): number;
//     getHeight(...liste: GVGraphicObject[]): number;
//     getUponPoint(...liste: GVGraphicObject[]): GVPoint;
//     geBelowPoint(...liste: GVGraphicObject[]): GVPoint;
//     getLeftPoint(...liste: GVGraphicObject[]): GVPoint;
//     getRightPoint(...liste: GVGraphicObject[]): GVPoint;
//     /**
//      * Resize window of graphic view to the created points
//      * Keep the ratio
//      */
//     resize(): void;
//     /**
//      * Give the list sorted of object with a given type
//      */
//     getListObjectTypeSelect(typeSelect?: string, liste?: GVGraphicObject[]): any;
//     /**
//      * Search the last name not used and give a new name
//      */
//     getLastNameNotUsed(typeSelect?: string): any;
//     /**
//      * Give a new name
//      */
//     getNewName(typeSelect?: string): any;
//     aleaNameObject(...args: GVGraphicObject[]): void;
//     /**
//      * Append new objects to the euclidean plan
//      * @param {number} n Number of point to create
//      * @param {number} step For coordinates
//      * @example
//      * this.addPoint(2,0.5) --> Add two points with coordinates step 0.5 precision
//      */
//     addPoint(n?: number, step?: number): GVPoint[];
//     /**
//      * Add intersect point of two lines in the view
//      */
//     addIntersectLine(line1: GVLine | GVCircle, line2: GVLine | GVCircle): GVPoint[];
//     /**
//      * Zoom in or out
//      */
//     zoom(k?: number): void;
//     /**
//      * Give the distance between tow points, a point and a line, two lines
//      */
//     distance(P: GVPoint, Y: GVPoint | GVLine): number;
//     /**
//      * Tempt to estimate if a point is close to the existing points
//      */
//     isCloseToExistingPoints(M: GVPoint): any;
//     /**
//      * Tempt to estimate if a point is close to the line through the existing point
//      */
//     isCloseToLineThroughtExistingPoints(M: GVPoint): boolean;
//     /**
//      * Add a new line to the view with new name
//      */
//     addLine(P1?: GVPoint, P2?: GVPoint): GVLine;
//     /**
//      * Add a new Segment to the view with new name
//      */
//     addSegment(P1?: GVPoint, P2?: GVPoint): GVSegment;
//     /**
//      * Add a new circle center
//      * @param {GVPoint} C
//      * @param {GVPoint} P
//      * @returns {GVCircle}
//      */
//     addCircle(C: GVPoint, X: GVPoint | number): GVCircle;
//     /**
//      * Get the intersect point of a line and the bordure
//      */
//     getExtremPointGraphicLine(L: GVLine): GVPoint[];
//     /**
//      * get a point between two points
//      * @param {GVPoint} point1
//      * @param {GVPoint} point2
//      * @returns {GVPoint}
//      */
//     getNewPointBetween(A: any, B: any): GVPoint;
//     /**
//      * Add point between two but not too close to extrems
//      * @param {GVPoint} A
//      * @param {GVPoint} B
//      * @returns {GVPoint}
//      */
//     addPointBetween(A: GVPoint, B: GVPoint): GVPoint;
//     addPointDistance(A: GVPoint, r: number): GVPoint;
//     addPointInPolygon(...args: GVPoint[]): GVPoint;
//     addPointOutPolygon(...args: GVPoint[]): GVPoint;
//     addPointOnPolygon(...args: GVPoint[]): GVPoint;
//     placeLabelsPolygon(...args: GVPoint[]): void;
//     addSymetric(X: GVPoint | GVLine, ...args: GVPoint[]): GVPoint[];
//     addTranslate(V: GVVector, ...args: GVPoint[]): GVPoint[];
//     move(V: GVVector, ...args: GVPoint[]): void;
//     /**
//      * Add three point, two point or one point aligned to others
//      * @param  {Point} P1 // If no point or one point we creat new points
//      * @param  {Point} P2 // If no point or one point we creat new points
//      * @returns {GVPoint[]}
//      */
//     addPointAligned(P1?: GVPoint, P2?: GVPoint): GVPoint[];
//     /**
//      * P1, P2, P3 with P2P1P3 rectangular in P1
//      * @param args
//      * @returns {GVPoint[]}
//      */
//     addRectPoint(...args: any[]): GVPoint[];
//     /**
//      * Distances to the sides of a triangle
//      * @param  {GVPoint} P1
//      * @param  {GVPoint} P2
//      * @param  {GVPoint} P3
//      * @returns {number}
//      */
//     distanceMinSidesVertices(P1: GVPoint, P2: GVPoint, P3: GVPoint): number;
//     /**
//      * Add three points not aligned or one not aligned with the two others
//      * @param  {GVPoint} P1 If no point we create three new points
//      * @param  {GVPoint} P2 If no point we create three new points
//      * @param  {GVPoint} P3 If no point we create three new points
//      * @returns {GVPoint}
//      */
//     addNotAlignedPoint(P1?: GVPoint, P2?: GVPoint, P3?: GVPoint): GVPoint[];
//     /**
//      * Add a parallel line to another one or two parallel lines
//      * @param  {GVPoint} P If no args we create two parallels
//      * @param  {GVLine} line If no args we create two parallels
//      * @returns {GVLine}
//      */
//     addParallelLine(P?: GVPoint, line?: GVLine): GVLine[];
//     addPerpendicularLine(P?: GVPoint, line?: GVLine): GVLine[];
//     /**
//      * Add the sides of a polygon
//      * @param  {...any} args
//      * @returns {}
//      */
//     addSidesPolygon(...args: any[]): GVSegment[];
//     /**
//      * Add labels to the vertices of a polygon.
//      * @param args
//      */
//     addLabelsPointsPolygon(...args: GVPoint[]): void;
//     addTriangle(arg1?: number | GVPoint, arg2?: number | GVPoint, arg3?: number | GVPoint, arg4?: number): GVTriangle;
//     /**
//      * Add a group of 4 points making a parallelogram
//      * @param  {GVPoint} A // 0-3 point
//      * @param  {GVPoint} B // 0-3 point
//      * @param  {GVPoint} C // 0-3 point
//      * @returns {GVPolygon}
//      */
//     addParallelogram(A?: GVPoint, B?: GVPoint, C?: GVPoint, D?: any): GVPolygon;
//     addRegularPolygon(n: number, A?: GVPoint, B?: GVPoint): GVPolygon;
//     addRectangle(A?: GVPoint | number, B?: GVPoint | number, C?: GVPoint): GVRectangle;
//     addRegularPolygonCenter(A: GVPoint, B: GVPoint, n: number): GVPoint;
//     addHomothetic(O: GVPoint, k: number, ...args: GVPoint[]): GVPoint[];
//     /**
//        * Add the angle ABC to the graphic view
//        * @param {Point} A
//        * @param {Point} B
//        * @param {Point} C
//        */
//     addAngle(A: GVPoint, B: GVPoint, C: GVPoint): GVAngle;
//     addAnglesPolygon(...args: GVPoint[]): GVAngle[];
//     /**
//      * Rotate points
//      * @param {Point} center
//      * @param {number} angle // Angle in radians
//      * @param {Point} args
//      * @returns {Point[]}
//      * @example
//      * this.addRotate(O, Math.PI()/2, B)
//      */
//     addRotate(center: GVPoint, angle: number, ...args: GVPoint[]): GVPoint[];
//     exportGGB(arg?: GVGraphicObject[]): string;
//     /**
//      * Export to Mathalea2D
//      * @returns {Mathalea2D}
//      */
//     getFigure(...args: any[]): any;
// }
