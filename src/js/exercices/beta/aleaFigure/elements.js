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
    this.direction = A instanceof Vector || B instanceof Vector ? [A, B].filter(x => x instanceof Vector)[0] : undefined
    this.a = undefined
    this.b = undefined
    this.c = undefined
    this.A = this.direction !== undefined ? [A, B].filter(x => x instanceof Point)[0] : A
    this.B = this.direction !== undefined ? undefined : B
    this.getEquation()
    this.name = undefined
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
    if (this.direction instanceof Vector) {
      this.a = this.direction.a
      this.b = this.direction.b
      this.c = this.a * this.A.x + this.b * this.A.y
    } else {
      this.a = this.B.y - this.A.y
      this.b = this.A.x - this.B.x
      this.c = this.A.x * this.B.y - this.B.x * this.A.y
      this.direction = new Vector(this.a, this.b)
    }
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
