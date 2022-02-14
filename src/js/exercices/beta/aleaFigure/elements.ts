import { Cartesian, Coordinates, Polar } from './coordinates.js'
import { aleaName } from '../../../modules/outilsMathjs.js'

/**
 * @class
 * @classdesc Graphic object like Point, Line, Segment etc.
 */
export class GraphicObject {
  visible: boolean
  name: string
  constructor () {
    this.visible = false
    this.name = ''
  }

  aleaName (...name: (string | GraphicObject)[]) {
      this.name = aleaName(name.map(x => {
        if (x instanceof GraphicObject) {
          return x.name
        } else {
          return x
        }
      }), name.length).join('')
  }
}

/**
 * @class
 * @classdesc Caracteristics of a point in an euclidean plan
 */
export class Point extends GraphicObject {
  coordinates: Coordinates
  polarCoordinates: Polar
  cartesianCoordinates: Cartesian
  type: string
  x: number
  y: number
  r: number
  theta: number
  constructor (coord: Coordinates) {
    super()
    this.coordinates = coord
    this.polarCoordinates = this.getPolarCoordinates()
    this.cartesianCoordinates = this.getCartesianCoordinates()
    this.name = ''
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
  x: number
  y: number
  unit: boolean = true
  norme: number
  constructor (x: number, y: number, unit = true) {
    this.norme = unit ? Math.sqrt(x ** 2 + y ** 2) : 1
    this.x = x / this.norme
    this.y = y / this.norme
  }

  getUnit () {
    const xy = Math.sqrt(this.x ** 2 + this.y ** 2)
    return new Vector(this.x / xy, this.y / xy)
  }

  getNormal () {
    return new Vector(-this.y, this.x)
  }

  add (X: Vector | Point) {
    return new Vector(this.x+X.x,this.y+X.y)
  }

  sub (X: Vector | Point) {
    return new Vector(this.x-X.x,this.y-X.y)
  }

  neg () {
    return new Vector(-this.x,-this.y)
  }
}

/**
   * @class
   * @classdesc Caracteristics of a line in an euclidean plan (ax+by=c)
   */
export class Line extends GraphicObject {
  direction: Vector
  A: Point
  B: Point
  type: string
  a: number = 0
  b: number = 0
  c: number = 0
  // Une droite sera définie par deux points distincts ou un point et une direction
  // Il faudrait deux constructeurs ?
  constructor (A: Point, B: Point | Vector) {
    super()
    this.direction = B instanceof Vector ? B : new Vector(B.x - A.x, B.y - A.y)
    this.A = A
    this.B = B instanceof Point ? B : new Point(new Cartesian(A.x + B.x, A.y + B.y))
    this.getEquation()
    this.type = 'Line'
  }
  /* constructor (A: Point, B:Point) {
    super()
    this.direction = new Vector(B.x - A.x, B.y - A.y)
    this.A = A
    this.B = B
    this.getEquation()
    this.type = 'Line'
  }
  constructor (A: Point, L: Vector) {
    super()
    this.direction = new Vector(L.x - A.x, L.y - A.y)
    this.A = A
    this.B = new Point(new Cartesian(A.x + L.a, A.y + L.b))
    this.getEquation()
    this.type = 'Line'
  }*/

  getYPoint (x: number) {
    return this.b === 0 ? undefined : (this.c - this.a * x) / this.b
  }

  getXPoint (y: number) {
    return this.a === 0 ? undefined : (this.c - this.b * y) / this.a
  }

  getEquation () {
    const directionUnit = this.direction.getUnit()
    this.a = -directionUnit.y
    this.b = directionUnit.x
    this.c = this.a * this.A.x + this.b * this.A.y
  }
}

/**
   * @class
   * @classdesc Caracteristics of a segment in an euclidean plan
   */
export class Segment extends Line {
  constructor (A: Point, B: Point) {
    super(A, B)
    this.type = 'Segment'
    this.A = A
    this.B = B
    this.getEquation()
  }
}
