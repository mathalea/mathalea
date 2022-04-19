import { context } from '../context.js'
import { GVCartesian, GVCoordinates } from './coordinates.js'
import { aleaName } from '../outilsMathjs.js'
import { dot, round, cross } from 'mathjs'
import { latexParCoordonnees, latexParPoint, tracePoint, point, labelPoint } from '../2d.js'
import { circularPermutation, getDimensions } from './outils.js'
/**
 * @class
 * @classdesc Graphic object like Point, Line, Segment etc.
 */
export class GVGraphicObject {
  constructor () {
    this.color = 'black'
    this.visible = false
    this.name = ''
  }

  aleaName (...name) {
    this.name = aleaName(name.map(x => {
      if (x instanceof GVGraphicObject) {
        return x.name
      } else {
        return x
      }
    }), name.length).join('')
  }

  set name (newname) {
    this._name = newname
  }

  get name () { return this._name }
  getGGB () {
    return this.name
  }

  /**
     * Move this right to figures
     * @param figures
     */
  moveRight (...figures) {
    const [xmin1, ymin1, xmax1, ymax1] = getDimensions(this)
    const [xmin2, ymin2, xmax2, ymax2] = getDimensions(...figures)
    const P1 = new GVPoint(xmin1, ymin1)
    const P2 = new GVPoint(xmax2, ymax2)
    const t = new GVVector(P1, P2)
    this.move(t.add(new GVVector(4, 0)).sub(new GVVector(0, (ymax2 - ymin2 + ymax1 - ymin1) / 2)))
  }

  move (V) {
    if (this instanceof GVPoint) {
      this.x = this.add(V).x
      this.y = this.add(V).y
    } else if (this instanceof GVPolygon) {
      for (const P of this.vertices) {
        P.x = P.add(V).x
        P.y = P.add(V).y
      }
    }
  }
}
/**
 * @class
 * @classdesc Caracteristics of a point in an euclidean plan
 */
export class GVPoint extends GVGraphicObject {
  constructor (arg1, arg2 = 0) {
    super()
    this.label = false
    this.xSVG = function (coeff) {
      return round(this.x * coeff, 3)
    }
    this.ySVG = function (coeff) {
      return -round(this.y * coeff, 3)
    }
    if (arg1 instanceof GVCoordinates) {
      this.coordinates = arg1
    } else {
      this.coordinates = new GVCartesian(arg1, arg2)
    }
    this.polarCoordinates = this.getPolarCoordinates()
    this.cartesianCoordinates = this.getCartesianCoordinates()
    this.name = ''
    this.type = 'Point'
    this.x = this.cartesianCoordinates.x
    this.y = this.cartesianCoordinates.y
    this.r = this.polarCoordinates.r
    this.theta = this.polarCoordinates.theta
    this.ggb = `${this.name} = (${this.x},${this.y})`
    this.M2D = point(this.x, this.y)
  }

  getPolarCoordinates () {
    return this.coordinates.getPolarCoordinates()
  }

  getCartesianCoordinates () {
    return this.coordinates.getCartesianCoordinates()
  }

  getRotate (O, angle) {
    return new GVPoint(new GVCartesian((this.x - O.x) * Math.cos(angle) - (this.y - O.y) * Math.sin(angle) + O.x, (this.x - O.x) * Math.sin(angle) + (this.y - O.y) * Math.cos(angle) + O.y))
  }

  add (X) {
    return new GVPoint(new GVCartesian(this.x + X.x, this.y + X.y))
  }

  sub (X) {
    return new GVPoint(new GVCartesian(this.x - X.x, this.y - X.y))
  }

  multiply (k) {
    return new GVPoint(new GVCartesian(this.x * k, this.y * k))
  }

  divide (k) {
    return new GVPoint(new GVCartesian(this.x / k, this.y / k))
  }

  getBarycentriqueCoords (A, B, C) {
    let a, b, c
    a = determinant(B.sub(this), C.sub(this))
    b = determinant(C.sub(this), A.sub(this))
    c = determinant(A.sub(this), B.sub(this))
    return [a, b, c]
  }

  isInTriangle (A, B, C) {
    return Math.min(...this.getBarycentriqueCoords(A, B, C)) > 0 || Math.max(...this.getBarycentriqueCoords(A, B, C)) < 0
  }

  /**
     * Get the symétric of P with this
     * @param P
     * @returns {GVPoint}
     */
  getSymetric (P) {
    return barycentre([this, P], [2, -1])
  }

  getHomothetic (O, k) {
    return new GVPoint(new GVCartesian(k * this.x + (1 - k) * O.x, k * this.y + (1 - k) * O.y))
  }

  getVector () {
    return new GVVector(this.x, this.y)
  }

  getGGB () {
    this.ggb = `${this.name} = (${this.x},${this.y})`
    return `${this.name} = (${this.x},${this.y})`
  }

  showName (scaleppc = 1) {
    let label
    const splitname = this.name.split('_')
    let nameFormat = splitname.length === 1 ? splitname[0] : `${splitname[0]}_{${splitname[1]}}`
    if (this.labelPoints !== undefined) {
      const P1 = this.labelPoints[0]
      const P3 = this.labelPoints[2]
      const S = this.labelPoints[1]
      const v1 = P1.sub(S).getVector().getNormed()
      const v3 = P3.sub(S).getVector().getNormed()
      const corr = new GVVector(0, -0.3 * scaleppc)
      let P
      if (v1.colinear(v3)) { // Colinéaires
        P = S.add(v1.getNormal().multiply(scaleppc * 0.4)).add(corr)
      } else { // Non colinéaires
        P = S.getSymetric(S.add(v1.add(v3).getNormed().multiply(scaleppc * 0.4))).add(corr)
      }
      if (context.isHtml) {
        label = latexParCoordonnees(nameFormat, P.x, P.y)
      } else {
        nameFormat = `$${nameFormat}$`
        label = labelPoint(point(P.x, P.y, nameFormat, 'above'))
      }
      //
      this.labelPoints = [P1, S, P3]
    } else {
      if (context.isHtml) {
        label = latexParCoordonnees(nameFormat, this.x, this.y + 0.2 * scaleppc)
      } else {
        nameFormat = `$${nameFormat}$`
        label = labelPoint(point(this.x, this.y, nameFormat, 'above'))
      }
    }
    this.label = true
    return label
  }

  showDot () {
    const splitname = this.name.split('_')
    let nameFormat = splitname.length === 1 ? splitname[0] : `${splitname[0]}_{${splitname[1]}}`
    if (context.isHtml) { nameFormat = `$${nameFormat}$` }
    const newPoint = point(this.x, this.y, nameFormat, 'above')
    this.dot = tracePoint(newPoint)
    return this
  }

  set name (newname) {
    this._name = newname
    this.ggb = `${this.name} = (${this.x},${this.y})`
  }

  get name () { return this._name }
}
export class GVVector {
  constructor (arg1, arg2) {
    this.x = 0
    this.y = 0
    if (typeof arg1 === 'number' && typeof arg2 === 'number') {
      this.x = arg1
      this.y = arg2
    } else if (arg1 instanceof GVPoint && arg2 instanceof GVPoint) {
      this.x = arg2.x - arg1.x
      this.y = arg2.y - arg1.y
    }
    this.norme = Math.sqrt(this.x ** 2 + this.y ** 2)
  }

  getNormed () {
    const xy = Math.sqrt(this.x ** 2 + this.y ** 2)
    return new GVVector(this.x / xy, this.y / xy)
  }

  getNormal () {
    return new GVVector(-this.y, this.x)
  }

  add (X) {
    return new GVVector(this.x + X.x, this.y + X.y)
  }

  sub (X) {
    return new GVVector(this.x - X.x, this.y - X.y)
  }

  multiply (k) {
    return new GVVector(this.x * k, this.y * k)
  }

  neg () {
    return new GVVector(-this.x, -this.y)
  }

  dot (X) {
    return dot([this.x, this.y], [X.x, X.y])
  }

  cross (X) {
    const Cross = cross([this.x, this.y, 0], [X.x, X.y, 0])
    return Cross
  }

  colinear (V) {
    return parseFloat(cross([this.x, this.y, 0], [V.x, V.y, 0])[2].toFixed(15)) === 0
  }
}
/**
   * @class
   * @classdesc Caracteristics of a line in an euclidean plan (ax+by=c)
   */
export class GVLine extends GVGraphicObject {
  // Une droite sera définie par deux points distincts ou un point et une direction
  // Il faudrait deux constructeurs ?
  constructor (A, B) {
    super()
    this.a = 0
    this.b = 0
    this.c = 0
    this.direction = B instanceof GVVector ? B : new GVVector(B.x - A.x, B.y - A.y)
    this.A = A
    this.B = B instanceof GVPoint ? B : new GVPoint(new GVCartesian(A.x + B.x, A.y + B.y))
    this.getEquation()
    this.type = 'Line'
    this.ggb = `${this.name}: ${this.a}*x+${this.b}*y=${this.c})`
  }

  getYPoint (x) {
    return this.b === 0 ? undefined : (this.c - this.a * x) / this.b
  }

  getXPoint (y) {
    return this.a === 0 ? undefined : (this.c - this.b * y) / this.a
  }

  getEquation () {
    const directionUnit = this.direction.getNormed()
    this.a = -directionUnit.y
    this.b = directionUnit.x
    this.c = this.a * this.A.x + this.b * this.A.y
  }

  getIntersect (L) {
    const delta = L.a * this.b - this.a * L.b
    if (delta.toFixed(15) !== '0') {
      const deltax = -(L.b * this.c - this.b * L.c)
      const deltay = L.a * this.c - this.a * L.c
      const point = new GVPoint(new GVCartesian(deltax / delta, deltay / delta))
      return point
    }
  }

  getPerpendicularLine (P) {
    return new GVLine(P, this.direction.getNormal())
  }

  /**
     * Get the symétric of P with this
     * @param P
     * @returns {GVPoint}
     */
  getSymetric (P) {
    return barycentre([this.getIntersect(this.getPerpendicularLine(P)), P], [2, -1])
  }

  set name (newname) {
    this._name = newname
    this.ggb = `${this.name}: ${this.a}*x+${this.b}*y=${this.c})`
  }

  get name () { return this._name }
}
export function determinant (X, Y) {
  return X.x * Y.y - X.y * Y.x
}
export function barycentre (P, a) {
  const pointsPonderes = P.map((x, i) => x.multiply(a[i]))
  return pointsPonderes.reduce((accumulator, curr) => accumulator.add(curr)).divide(a.reduce((accumulator, curr) => accumulator + curr))
}
/**
   * @class
   * @classdesc Caracteristics of a segment in an euclidean plan
   */
export class GVSegment extends GVLine {
  constructor (A, B) {
    super(A, B)
    this.text = ''
    this.textColor = 'black'
    this.direct = true
    this.type = 'Segment'
    this.A = A
    this.B = B
    this.aleaName(this.A, this.B)
    this.getEquation()
  }

  showLabel (scaleppc = 1) {
    let label
    const P = new GVPoint((this.A.x + this.B.x) / 2, (this.A.y + this.B.y) / 2)
    if (context.isHtml) {
      label = latexParPoint(this.name, point(P.x, P.y, '', 'center'), 'black', 50, 8, '')
      // LatexParCoordonnees(texte, x, y, color, largeur, hauteur, colorBackground, tailleCaracteres)
    } else {
      label = latexParPoint(this.name, point(P.x, P.y, '', 'center'), 'black', 20, 8, '')
      // label = labelPoint(point(P.x, P.y, `$${this.name}$`, 'center'))
    }
    this.label = true
    return label
  }
}
/**
   * @class
   * @classdesc Caracteristics of a circle in an euclidean plan
   */
export class GVCircle extends GVGraphicObject {
  constructor (A, B) {
    super()
    this.a = 0
    this.b = 0
    this.r = 0
    this.type = 'Circle'
    this.A = A
    this.B = B instanceof GVPoint ? B : A
    this.r = B instanceof GVPoint ? Math.sqrt((A.x - B.x) ** 2 + (A.y - B.y) ** 2) : B
  }

  getPoint (theta) {
    return new GVPoint(new GVCartesian(this.A.x + this.r * Math.cos(theta), this.A.y + this.r * Math.sin(theta)))
  }
}
/**
   * @class
   * @classdesc Caracteristics of an angle
   */
export class GVAngle extends GVGraphicObject {
  constructor (A, B, C) {
    super()
    this.right = false
    this.fillColor = 'none'
    this.fillOpacity = 0.2
    this.rayon = true
    this.type = 'Angle'
    const vA = new GVVector(A.x, A.y)
    const vB = new GVVector(B.x, B.y)
    const vC = new GVVector(C.x, C.y)
    const vBA = vA.sub(vB).getNormed()
    const vBC = vC.sub(vB).getNormed()
    this.vBA = vBA
    this.vBC = vBC
    const cos = vBA.x * vBC.x + vBA.y * vBC.y
    this.angle = Math.acos(cos)
    this.A = B.add(vBA)
    this.B = B
    this.C = B.add(vBC)
    this.direct = cross([vBA.x, vBA.y, 0], [vBC.x, vBC.y, 0])[2] > 0
  }

  scale (scale) {
    const vBA = this.vBA.multiply(scale)
    const vBC = this.vBC.multiply(scale)
    this.A = this.B.add(vBA)
    this.C = this.B.add(vBC)
  }
}
/**
   * @class
   * @classdesc Caracteristics of an angle
   */
export class GVPolygon extends GVGraphicObject {
  constructor (...args) {
    super()
    this.showLabels = true
    this.vertices = args
    this.name = circularPermutation(args.map(x => x.name)).join('')
  }

  getDimensions () {
    const listXPoint = this.vertices.map(M => M.x)
    const listYPoint = this.vertices.map(M => M.y)
    const xmin = Math.min(...listXPoint)
    const xmax = Math.max(...listXPoint)
    const ymin = Math.min(...listYPoint)
    const ymax = Math.max(...listYPoint)
    return [xmin, ymin, xmax, ymax]
  }
}
/**
   * @class
   * @classdesc Caracteristics of a triangle
   */
export class GVRectangle extends GVPolygon {
  constructor (...args) {
    super(...args)
    const [A, B, C, D] = args
    const dimensions = [Math.sqrt((A.x - B.x) ** 2 + (A.y - B.y) ** 2), Math.sqrt((C.x - B.x) ** 2 + (C.y - B.y) ** 2)].sort()
    this.largeur = dimensions[0]
    this.longueur = dimensions[1]
    this.ratio = this.longueur / this.largeur
  }
}
/**
  * @class
  * @classdesc Caracteristics of a triangle
  */
export class GVTriangle extends GVPolygon {
  constructor (...args) {
    super(...args)
  }
}
