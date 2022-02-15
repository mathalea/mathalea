import { Cartesian, Coordinates, Polar } from './coordinates.js'
import { aleaName } from '../../../modules/outilsMathjs.js'
import { dot, round } from 'mathjs'

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

  xSVG = function (coeff) {
    return round(this.x * coeff, 3)
  }

  ySVG = function (coeff) {
    return -round(this.y * coeff, 3)
  }

  getRotate(O: Point, angle: number) {
    return new Point(
      new Cartesian(
        (this.x-O.x)*Math.cos(angle)-(this.y-O.y)*Math.sin(angle) +O.x,
        (this.x-O.x)*Math.sin(angle)+(this.y-O.y)*Math.cos(angle) +O.y,
      ))
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

  getNormal (): Vector {
    return new Vector(-this.y, this.x)
  }

  add (X: Vector | Point): Vector {
    return new Vector(this.x+X.x,this.y+X.y)
  }

  sub (X: Vector | Point): Vector {
    return new Vector(this.x-X.x,this.y-X.y)
  }

  neg (): Vector {
    return new Vector(-this.x,-this.y)
  }

  dot (X: Vector | Point): number {
    return dot([this.x, this.y],[X.x,X.y])
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

  getPerpendicularLine(P: Point) {
    return new Line(P, this.direction.getNormal())
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

/**
   * @class
   * @classdesc Caracteristics of a circle in an euclidean plan
   */
 export class Circle extends GraphicObject {
  A: Point
  B: Point | number
  type: string
  a: number = 0
  b: number = 0
  r: number = 0
  constructor (A: Point, B: Point | number) {
    super()
    this.type = 'Circle'
    this.A = A
    this.B = B instanceof Point ? B : A
    this.r = B instanceof Point ? Math.sqrt((A.x - B.x) ** 2 + (A.y - B.y) ** 2) : B
  }

  getPoint (theta: number): Point {
    return new Point (
      new Cartesian (
        this.A.x + this.r * Math.cos(theta),
        this.A.y + this.r * Math.sin(theta)
      )
    )
  }
}
