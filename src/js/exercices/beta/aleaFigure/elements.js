import { Cartesian } from './coordinates.js'

/**
 * @class
 * @classdesc Graphic object like Point, Line, Segment etc.
 */
export class GraphicObject {
  constructor () {
    this.visible = false
  }
}

/**
 * @class
 * @classdesc Caracteristics of a point in an euclidean plan
 */
export class Point extends GraphicObject {
  constructor (arg) {
    super()
    this.coordinates = arg
    this.polarCoordinates = this.getPolarCoordinates()
    this.cartesianCoordinates = this.getCartesianCoordinates()
    this.name = undefined
    this.type = 'Point'
    this.x = this.cartesianCoordinates.x
    this.y = this.cartesianCoordinates.y
    this.r = this.polarCoordinates.r
    this.theta = this.polarCoordinates.theta
  }

  getPolarCoordinates () {
    return this.coordinates.getPolarCoordinates()
  }

  getCartesianCoordinates () {
    return this.coordinates.getCartesianCoordinates()
  }
}

export class Vector {
  constructor (a, b) {
    const ab = Math.sqrt(a ** 2 + b ** 2)
    this.a = a / ab
    this.b = b / ab
  }

  getNormal () {
    return new Vector(-this.b, this.a)
  }
}

/**
   * @class
   * @classdesc Caracteristics of a line in an euclidean plan (ax+by=c)
   */
export class Line extends GraphicObject {
  // Une droite sera définie par deux points distincts ou un point et une direction
  constructor (A, B) {
    super()
    this.direction = B instanceof Vector ? B : new Vector(B.x - A.x, B.y - A.y)
    this.A = A
    this.B = B instanceof Point ? B : new Point(new Cartesian(A.x + B.b, A.y + B.b))
    this.getEquation()
    this.type = 'Line'
  }

  /**
     * Get x Point of the line
     * @param {number} x
     * @returns
     */
  getYPoint (x) {
    return this.b === 0 ? undefined : (this.c - this.a * x) / this.b
  }

  /**
     * Get y Point of the line
     * @param {number} y
     * @returns
     */
  getXPoint (y) {
    return this.a === 0 ? undefined : (this.c - this.b * y) / this.a
  }

  /**
     * Calculate a and b in line equation : ax+by=1
     * @param {Object} A // type = Point
     * @param {Object} B // type = Point
     */
  getEquation () {
    this.a = -this.direction.b
    this.b = this.direction.a
    this.c = this.a * this.A.x + this.b * this.A.y
  }
}

/**
   * @class
   * @classdesc Caracteristics of a segment in an euclidean plan
   */
export class Segment extends Line {
  constructor (A, B) {
    super(A, B)
    this.type = 'Segment'
    this.A = A
    this.B = B
    this.getEquation()
  }
}
