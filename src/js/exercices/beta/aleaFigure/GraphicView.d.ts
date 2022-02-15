import { Point, Line, Segment, GraphicObject } from './elements.js';
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
     * @param  {...any} args
     * @returns {Group}
     */
    show(...args: any[]): any[];
    /**
     * Resize window of graphic view to the created points
     * Keep the ratio
     */
    resize(): void;
    /**
     * Give the list sorted of object with a given type
     * @param {string} typeSelect Type
     * @returns {Array}
     */
    getListObjectTypeSelect(typeSelect?: string): any;
    /**
     * Search the last name not used and give a new name
     * @param {string} typeSelect Type of object 'Point', 'Line' etc.
     * @returns {string} New name for a new object
     */
    getLastNameNotUsed(typeSelect?: string): any;
    /**
     * Give a new name
     * @param {string} typeSelect Type of the object
     * @returns {string}
     */
    getNewName(typeSelect?: string): any;
    /**
     * Append new objects to the euclidean plan
     * @param  {...any} args // List of geometric objects
     */
    addPoint(n?: number): any[];
    /**
     * Add intersect point of two lines in the view
     * @param {Line} line1
     * @param {Line} line2
     * @returns {Point}
     */
    addIntersectLine(line1: any, line2: any): Point[];
    /**
     * Zoom in or out
     * @param {number} k
     */
    zoom(k?: number): void;
    /**
     * Give the distance between tow points, a point and a line, two lines
     * @param  {...any} args
     * @returns
     */
    distance(...args: any[]): number;
    /**
     * Tempt to estimate if a point is close to the existing points
     * @param {Point} M
     * @returns
     */
    isCloseToExistingPoints(M: any): any;
    /**
     * Tempt to estimate if a point is close to the line through the existing point
     * @param {Point} M
     * @returns
     */
    isCloseToLineThroughtExistingPoints(M: any): boolean;
    /**
     * Add a new line to the view with new name
     * @param  {Line|Point,Point} args // Line or Line through two point existing or not
     * @returns {Line}
     */
    addLine(P1?: any, P2?: any): Line;
    /**
     * Add a new Segment to the view with new name
     * @param  {Point,Point} args // Segment
     * @returns {Segment}
     */
    addSegment(P1?: any, P2?: any): Segment;
    /**
     * Get the intersect point of a line and the bordure
     * @param {Line} line
     * @returns {Point}
     */
    getExtremPointGraphicLine(line: any): Point[];
    /**
     * get a point between two existing points
     * @param {Point} point1
     * @param {Point} point2
     * @returns {Point}
     */
    getNewPointBetween(A: any, B: any): Point;
    /**
     * Add three point, two point or one point aligned to others
     * @param  {Point,Point} args // If no point or one point we creat new points
     * @returns
     */
    addPointAligned(...args: any[]): any[];
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
    addNotAlignedPoint(P1?: any, P2?: any, P3?: any): any[];
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
    addParallelogram(A?: any, B?: any, C?: any, D?: any): any[];
    addHomothetic(O: any, k: any, ...args: any[]): any[];
    /**
     * Export to Mathalea2D
     * @returns {Mathalea2D}
     */
    getMathalea2DExport(...args: any[]): any;
}
