/* eslint-disable no-unused-vars */
import { randomInt } from 'mathjs'
import { GVCartesian } from './coordinates.js'
import { GVRectangle, GVTriangle, GVPolygon, GVVector, GVAngle, GVPoint, GVLine, GVSegment, GVCircle, barycentre } from './elements.js'
import { getMathalea2DExport } from './getMathalea2DExport.js'
import { circularPermutation, quotient } from './outils.js'
import { aleaName } from '../outilsMathjs.js'
export function listeEntiersSommeConnue (nbElements, total, valMin = 1) {
  const liste = []
  liste.push(randomInt(valMin, total - (nbElements - 1) * valMin + 1))
  for (let j = 1; j < nbElements - 1; j++) {
    liste.push(randomInt(liste[j - 1] + valMin, total - (nbElements - j - 1) * valMin + 1))
  }
  liste.push(total)
  for (let j = nbElements - 1; j > 0; j--) {
    liste[j] = liste[j] - liste[j - 1]
  }
  return liste
}
export class GVGraphicView {
  constructor (xmin = 0, ymin = 0, xmax = 10, ymax = 10) {
    this.xmin = 0
    this.ymin = 0
    this.xmax = 10
    this.ymax = 10
    this.clipVisible = false
    this.saveRatio = true
    this.allowResize = true
    this.showLabelPoint = false
    this.limit = Infinity
    this._namesAlea = true
    this.setDimensions(xmin, ymin, xmax, ymax)
    this.names = aleaName('ABCDEFGHIJKLMNOPRSTUVZ'.split(''))
    this.ppc = 20
    this.scale = 1
    this.geometric = []
    this.grid = []
    this.axes = []
  }

  set namesAlea (names) {
    if (typeof names === 'string') { this.names = aleaName(names) }
    if (names === false) { this.names = 'ABCDEFGHIJKLMNOPRSTUVZ'.split('') }
  }

  get namesAlea () {
    return this.names
  }

  setDimensions (xmin = -5, ymin = -5, xmax = 5, ymax = 5) {
    this.xmin = xmin
    this.ymin = ymin
    this.xmax = xmax
    this.ymax = ymax
    this.width = this.xmax - this.xmin
    this.height = this.ymax - this.ymin
    this.ratio = this.height / this.width
  }

  show (...args) {
    const group = []
    args.forEach(x => {
      if (Array.isArray(x)) {
        group.push(...x)
      } else if (x instanceof GVPolygon) {
        group.push(...x.vertices)
        group.push(...this.addSidesPolygon(...x.vertices))
        this.addLabelsPointsPolygon(...x.vertices)
      } else {
        group.push(x)
      }
    })
    group.forEach(x => { x.visible = true })
    return group
  }

  addGrid (step = 1) {
    for (let i = this.xmin; i < quotient(this.width, step); i++) {
      const lineX = new GVLine(new GVPoint(i, 0), new GVVector(0, 1))
      lineX.color = 'gray'
      this.grid.push(lineX)
    }
    for (let i = this.ymin; i < quotient(this.height, step); i++) {
      const lineY = new GVLine(new GVPoint(0, i), new GVVector(1, 0))
      lineY.color = 'gray'
      this.grid.push(lineY)
    }
  }

  addAxes () {
    const lineX = new GVLine(new GVPoint(0, 0), new GVVector(0, 1))
    this.axes.push(lineX)
    const lineY = new GVLine(new GVPoint(0, 0), new GVVector(1, 0))
    this.axes.push(lineY)
  }

  getDimensions (...liste) {
    const listPoint = this.getListObjectTypeSelect('Point', liste)
    const listXPoint = listPoint.map((X) => { return X.x })
    const listYPoint = listPoint.map((Y) => { return Y.y })
    const xmin = Math.min(...listXPoint)
    const xmax = Math.max(...listXPoint)
    const ymin = Math.min(...listYPoint)
    const ymax = Math.max(...listYPoint)
    return [xmin, ymin, xmax, ymax]
  }

  getWidth (...liste) {
    const [xmin, ymin, xmax, ymax] = this.getDimensions(...liste)
    return xmax - xmin
  }

  getHeight (...liste) {
    const [xmin, ymin, xmax, ymax] = this.getDimensions(...liste)
    return ymax - ymin
  }

  getUponPoint (...liste) {
    const listePoints = this.getListObjectTypeSelect('Point', liste)
    return this.getListObjectTypeSelect('Point', liste).sort((a, b) => b.y - a.y)[listePoints.length - 1]
  }

  geBelowPoint (...liste) {
    const listePoints = this.getListObjectTypeSelect('Point', liste)
    return this.getListObjectTypeSelect('Point', liste).sort((a, b) => b.y - a.y)[0]
  }

  getLeftPoint (...liste) {
    const listePoints = this.getListObjectTypeSelect('Point', liste)
    return this.getListObjectTypeSelect('Point', liste).sort((a, b) => b.x - a.x)[listePoints.length - 1]
  }

  getRightPoint (...liste) {
    const listePoints = this.getListObjectTypeSelect('Point', liste)
    return listePoints.sort((a, b) => b.x - a.x)[0]
  }

  resize () {
    const [xmin, ymin, xmax, ymax] = this.getDimensions()
    const [width, height] = [xmax - xmin, ymax - ymin]
    let newheight = 0 + height
    let newwidth = 0 + width
    const ratio = height / width
    const k = ratio / this.ratio
    if (this.saveRatio) {
      if (k < 1) {
        newheight = height / k
      } else {
        newwidth = width * k
      }
    } else {
      this.ratio = newheight / newwidth
    }
    this.ppc = this.ppc * this.height / newheight
    this.scale = this.scale * this.height / newheight
    const deltaX = (newwidth - width) / 2
    const deltaY = (newheight - height) / 2
    this.setDimensions(xmin - deltaX, ymin - deltaY, xmax + deltaX, ymax + deltaY)
  }

  getListObjectTypeSelect (typeSelect = 'Point', liste = this.geometric) {
    if (liste.length === 0) { liste = this.geometric }
    switch (typeSelect) {
      case 'Point':
        return liste.filter(obj => obj instanceof GVPoint).sort((a, b) => {
          const nameA = a.name.split('_')
          const nameB = b.name.split('_')
          if (nameA[0] === nameB[0]) {
            return parseInt(nameA[1]) - parseInt(nameB[1])
          } else {
            return (-1) ** (nameA[0] > nameB[0] ? 0 : 1)
          }
        })
      default:
        return this.geometric.filter(obj => !(obj instanceof GVPoint)).sort((a, b) => {
          const nameA = a.name.split('_')
          const nameB = b.name.split('_')
          if (nameA[0] === nameB[0]) {
            return parseInt(nameA[1]) - parseInt(nameB[1])
          } else {
            return (-1) ** (nameA[0] > nameB[0] ? 0 : 1)
          }
        })
    }
  }

  getLastNameNotUsed (typeSelect = 'Point') {
    switch (typeSelect) {
      case 'Point': {
        const list = this.getListObjectTypeSelect('Point')
        let nonUseLetter
        let i = 0
        do {
          const indice = i === 0 ? '' : `_${i}`
          nonUseLetter = this.names.find(letter => list.filter(x => x.name[0] === letter).find(obj => obj.name === letter + indice)?.name !== letter + indice)
          if (nonUseLetter !== undefined) { nonUseLetter += indice }
          i += 1
        } while (nonUseLetter === undefined)
        return nonUseLetter
      }
      case 'Segment':
      case 'Circle':
      case 'Line': {
        const list = this.getListObjectTypeSelect('Segment').concat(this.getListObjectTypeSelect('Line'))
        let nonUseLetter
        let i = 0
        do {
          const indice = i === 0 ? '' : `_${i}`
          nonUseLetter = this.names.find(letter => list.filter(x => x.name[0] === letter.toLowerCase()).find(obj => obj.name === letter.toLowerCase() + indice)?.name !== letter.toLowerCase() + indice)
          if (nonUseLetter !== undefined) { nonUseLetter = nonUseLetter.toLowerCase() + indice }
          i += 1
        } while (nonUseLetter === undefined)
        return nonUseLetter
      }
    }
  }

  getNewName (typeSelect = 'Point') {
    switch (typeSelect) {
      case 'Point':
        return this.getLastNameNotUsed(typeSelect)
      case 'Segment':
      case 'Circle':
      case 'Line':
        return this.getLastNameNotUsed(typeSelect)
    }
  }

  aleaNameObject (...args) {
    const names = aleaName(args.length)
    args.forEach((x, i) => { x.name = names[i] })
  }

  addPoint (n = 1, step) {
    const newPoints = []
    for (let i = 0; i < n; i++) {
      let obj
      let cpt = 0
      do {
        cpt += 1
        obj = new GVPoint(new GVCartesian(step === undefined ? Math.random() * this.width + this.xmin : quotient(Math.random() * this.width + this.xmin, step), step === undefined ? Math.random() * this.height + this.ymin : quotient(Math.random() * this.height + this.ymin, step)))
      } while (cpt < this.limit && (this.isCloseToExistingPoints(obj) || this.isCloseToLineThroughtExistingPoints(obj)))
      obj.name = this.getNewName(obj.type)
      if (this.showLabelPoint) {
        obj.showDot()
        obj.showName()
      }
      this.geometric.push(obj)
      newPoints.push(obj)
    }
    return newPoints
  }

  addIntersectLine (line1, line2) {
    if (line1 instanceof GVLine && line2 instanceof GVLine) {
      const delta = line1.a * line2.b - line2.a * line1.b
      if (delta.toFixed(15) !== '0') {
        const deltax = -(line1.b * line2.c - line2.b * line1.c)
        const deltay = line1.a * line2.c - line2.a * line1.c
        const point = new GVPoint(new GVCartesian(deltax / delta, deltay / delta))
        point.name = this.getNewName(point.type)
        this.geometric.push(point)
        return [point]
      }
    } else if (line1 instanceof GVCircle && line2 instanceof GVCircle) {
      const d = this.distance(line1.A, line2.A)
      if (d > line1.r + line2.r || d < (Math.abs(line1.r - line2.r))) {
        return []
      } else {
        const a = (line1.r ** 2 - line2.r ** 2 + d ** 2) / (2 * d)
        const h = Math.sqrt(line1.r ** 2 - a ** 2)
        const x2 = line1.A.x + a * (line2.A.x - line1.A.x) / d
        const y2 = line1.A.y + a * (line2.A.y - line1.A.y) / d
        const x3 = x2 + h * (line2.A.y - line1.A.y) / d
        const y3 = y2 - h * (line2.A.x - line1.A.x) / d
        const P1 = new GVPoint(new GVCartesian(x3, y3))
        const x4 = x2 - h * (line2.A.y - line1.A.y) / d
        const y4 = y2 + h * (line2.A.x - line1.A.x) / d
        const P2 = new GVPoint(new GVCartesian(x4, y4))
        P1.name = P1.name || this.getNewName(P1.type)
        P2.name = P2.name || this.getNewName(P2.type)
        this.geometric.push(P1, P2)
        return [P1, P2]
      }
    }
  }

  zoom (k = 1.01) {
    const xmin = k * (this.xmin - (this.xmax + this.xmin) / 2) + (this.xmax + this.xmin) / 2
    const xmax = k * (this.xmax - (this.xmax + this.xmin) / 2) + (this.xmax + this.xmin) / 2
    const ymin = k * (this.ymin - (this.ymax + this.ymin) / 2) + (this.ymax + this.ymin) / 2
    const ymax = k * (this.ymax - (this.ymax + this.ymin) / 2) + (this.ymax + this.ymin) / 2
    this.setDimensions(xmin, ymin, xmax, ymax)
  }

  distance (P, Y) {
    if (Y instanceof GVPoint) {
      return Math.sqrt((P.x - Y.x) ** 2 + (P.y - Y.y) ** 2)
    } else {
      return Math.abs(Y.a * P.x + Y.b * P.y - Y.c) / Math.sqrt(Y.a ** 2 + Y.b ** 2)
    }
  }

  isCloseToExistingPoints (M) {
    const listExistingPoints = this.getListObjectTypeSelect('Point')
    const maxDistance = Math.min(this.height, this.width) / listExistingPoints.length / 3
    if (listExistingPoints.length > 0) {
      return listExistingPoints.some(X => this.distance(X, M) < maxDistance)
    }
    return false
  }

  isCloseToLineThroughtExistingPoints (M) {
    const listExistingPoints = this.getListObjectTypeSelect('Point')
    const litsExistingLine = this.getListObjectTypeSelect('Line')
    const numberOfObjects = listExistingPoints.length + litsExistingLine.length
    const result = []
    const minDimension = Math.min(this.height, this.width) / numberOfObjects / 3
    for (let i = 0; i < listExistingPoints.length; i++) {
      for (let j = i + 1; j < listExistingPoints.length; j++) {
        const d = new GVLine(listExistingPoints[i], listExistingPoints[j])
        result.push(this.distance(M, d))
      }
    }
    for (let i = 0; i < litsExistingLine.length; i++) {
      result.push(this.distance(M, litsExistingLine[i]))
    }
    return result.some(x => x < minDimension && parseFloat(x.toFixed(15)) !== 0)
  }

  addLine (P1 = this.addPoint()[0], P2 = this.addPoint()[0]) {
    const line = new GVLine(P1, P2)
    line.name = this.getNewName(line.type)
    this.geometric.push(line)
    return line
  }

  addSegment (P1 = this.addPoint()[0], P2 = this.addPoint()[0]) {
    const segment = new GVSegment(P1, P2)
    this.geometric.push(segment)
    return segment
  }

  addCircle (C = this.addPoint()[0], X) {
    const circle = new GVCircle(C, X)
    circle.name = this.getNewName(circle.type)
    this.geometric.push(circle)
    return circle
  }

  getExtremPointGraphicLine (L) {
    const x = [
      [L.getXPoint(this.ymin), this.ymin],
      [L.getXPoint(this.ymax), this.ymax]
    ]
    const y = [
      [this.xmin, L.getYPoint(this.xmin)],
      [this.xmax, L.getYPoint(this.xmax)]
    ]
    const extremites = []
    for (const u of x) {
      if (u.every(v => v !== undefined) && u[0] >= this.xmin && u[0] <= this.xmax) {
        extremites.push(u)
      }
    }
    for (const u of y) {
      if (u.every(v => v !== undefined) && u[1] >= this.ymin && u[1] <= this.ymax) {
        extremites.push(u)
      }
    }
    if (extremites.length === 2) {
      return [
        new GVPoint(new GVCartesian(extremites[0][0], extremites[0][1])),
        new GVPoint(new GVCartesian(extremites[1][0], extremites[1][1]))
      ]
    } else {
      return undefined
    }
  }

  getNewPointBetween (A, B) {
    const k = Math.random()
    return new GVPoint(new GVCartesian((A.x - B.x) * k + B.x, (A.y - B.y) * k + B.y))
  }

  addPointBetween (A, B) {
    const barycentricsCoords = listeEntiersSommeConnue(2, 100, 15)
    const P = barycentre([A, B], barycentricsCoords)
    P.name = P.name || this.getNewName(P.type)
    this.geometric.push(P)
    return P
  }

  addPointDistance (A, r) {
    let P
    const circle = new GVCircle(A, r)
    do {
      const theta = Math.random() * Math.PI * 2
      P = circle.getPoint(theta)
    } while (this.isCloseToExistingPoints(P) || this.isCloseToLineThroughtExistingPoints(P))
    P.name = this.getNewName(P.type)
    this.geometric.push(P)
    return P
  }

  addPointInPolygon (...args) {
    const barycentricsCoords = listeEntiersSommeConnue(args.length, 100, 20 * 3 / args.length)
    const P = barycentre(args, barycentricsCoords)
    P.name = P.name || this.getNewName(P.type)
    this.geometric.push(P)
    return P
  }

  addPointOutPolygon (...args) {
    const barycentricsCoords = listeEntiersSommeConnue(args.length, 100, 20 * 3 / args.length)
    const aleaI = Math.round(Math.random() * (barycentricsCoords.length - 2))
    const P = new GVLine(args[aleaI], args[aleaI + 1]).getSymetric(barycentre(args, barycentricsCoords))
    P.name = P.name || this.getNewName(P.type)
    this.geometric.push(P)
    return P
  }

  addPointOnPolygon (...args) {
    const barycentricsCoords = listeEntiersSommeConnue(2, 100, 20 * 3 / 2)
    const P = barycentre(circularPermutation(args).slice(0, 2), barycentricsCoords)
    P.name = P.name || this.getNewName(P.type)
    this.geometric.push(P)
    return P
  }

  placeLabelsPolygon (...args) {
    for (let i = 1; i < args.length + 1; i++) {
      const names = [args[args.length - 1]].concat(args).concat([args[0]])
      names[i].showName()
      names[i].labelPoints = [names[i - 1], names[i], names[i + 1]]
    }
  }

  addSymetric (X, ...args) {
    return args.map(x => {
      const P = X.getSymetric(x)
      P.name = P.name || this.getNewName(P.type)
      this.geometric.push(P)
      return P
    })
  }

  addTranslate (V, ...args) {
    return args.map(X => {
      const P = X.add(V)
      P.name = P.name || this.getNewName(P.type)
      this.geometric.push(P)
      return P
    })
  }

  move (V, ...args) {
    for (const X of args) {
      X.x = X.add(V).x
      X.y = X.add(V).y
    }
  }

  addPointAligned (P1 = this.addPoint()[0], P2 = this.addPoint()[0]) {
    let P3
    do {
      const line = new GVLine(P1, P2)
      const [X1, X2] = this.getExtremPointGraphicLine(line)
      P3 = this.getNewPointBetween(X1, X2)
    } while (this.isCloseToExistingPoints(P3) || this.isCloseToLineThroughtExistingPoints(P3))
    P3.name = P3.name || this.getNewName(P3.type)
    this.geometric.push(P3)
    return [P1, P2, P3]
  }

  addRectPoint (...args) {
    let P3, P1, P2
    do {
      if (P1 !== undefined) {
        for (let i = 0; i < 2 - args.length; i++) {
          this.geometric.pop()
          this.geometric.pop()
        }
      }
      [P1, P2] = args.concat(this.addPoint(2 - args.length))
      const line = (new GVLine(P1, P2)).getPerpendicularLine(P1)
      const [X1, X2] = this.getExtremPointGraphicLine(line)
      P3 = this.getNewPointBetween(X1, X2)
    } while (this.isCloseToExistingPoints(P3) || this.isCloseToLineThroughtExistingPoints(P3))
    P3.name = P3.name || this.getNewName(P3.type)
    this.geometric.push(P3)
    return [P1, P2, P3]
  }

  distanceMinSidesVertices (P1, P2, P3) {
    return Math.min(this.distance(P1, new GVLine(P2, P3)), this.distance(P2, new GVLine(P1, P3)), this.distance(P3, new GVLine(P1, P2)))
  }

  addNotAlignedPoint (P1 = this.addPoint()[0], P2 = this.addPoint()[0], P3) {
    const minDimension = Math.min(this.height, this.width) / this.getListObjectTypeSelect('Point').length / 3
    do {
      if (P3 !== undefined) { this.geometric.pop() }
      P3 = this.addPoint()[0]
    } while (this.distanceMinSidesVertices(P1, P2, P3) < minDimension)
    P3.name = P3.name || this.getNewName(P3.type)
    return [P1, P2, P3]
  }

  addParallelLine (P = this.addPoint()[0], line = this.addLine()) {
    const parallel = new GVLine(P, line.direction)
    parallel.name = this.getNewName(parallel.type)
    this.geometric.push(parallel, P, line)
    return [line, parallel]
  }

  addPerpendicularLine (P = this.addPoint()[0], line = this.addLine()) {
    const perpendicular = new GVLine(P, line.direction.getNormal())
    perpendicular.name = this.getNewName(perpendicular.type)
    this.geometric.push(perpendicular)
    return [line, perpendicular]
  }

  addSidesPolygon (...args) {
    const sides = []
    for (let i = 0; i < args.length - 1; i++) {
      sides.push(this.addSegment(args[i], args[i + 1]))
    }
    sides.push(this.addSegment(args[args.length - 1], args[0]))
    return sides
  }

  addLabelsPointsPolygon (...args) {
    const last = args.length - 1
    const vertices = [args[last]].concat(args).concat(args[0])
    for (let i = 1; i < args.length + 1; i++) {
      vertices[i].showName()
      vertices[i].labelPoints = [vertices[i - 1], vertices[i], vertices[i + 1]]
    }
  }

  addTriangle (arg1, arg2, arg3, arg4) {
    let triangle
    if (arg1 instanceof GVPoint && arg2 !== undefined && arg2 instanceof GVPoint && arg3 instanceof GVPoint) {
      triangle = new GVTriangle(arg1, arg2, arg3)
    } else if (arg1 instanceof GVPoint && arg2 instanceof GVPoint && arg3 instanceof GVPoint) {
      triangle = new GVTriangle(...this.addNotAlignedPoint(...[arg1, arg2, arg3].filter(P => P !== undefined)))
    } else if (arg1 instanceof GVPoint && typeof arg2 === 'number' && arg3 instanceof GVPoint && typeof arg4 === 'number') {
      const cercle1 = this.addCircle(arg1, arg2)
      const cercle2 = this.addCircle(arg3, arg4)
      const [P] = this.addIntersectLine(cercle1, cercle2)
      triangle = new GVTriangle(arg1, arg3, P)
    } else if (typeof arg1 === 'number' && typeof arg2 === 'number' && typeof arg3 === 'number') {
      const A = this.addPoint()[0]
      const B = this.addPointDistance(A, arg1)
      const cercle1 = this.addCircle(A, arg2)
      const cercle2 = this.addCircle(B, arg3)
      const [C] = this.addIntersectLine(cercle1, cercle2)
      triangle = new GVTriangle(A, B, C)
    } else if (arg1 === undefined) {
      triangle = new GVTriangle(...this.addNotAlignedPoint())
    }
    return triangle
  }

  addParallelogram (A = this.addPoint()[0], B = this.addPoint()[0], C = this.addNotAlignedPoint(A, B)[2], D = undefined) {
    D = new GVPoint(new GVCartesian(A.x + C.x - B.x, A.y + C.y - B.y))
    D.name = D.name || this.getNewName(D.type)
    this.geometric.push(D)
    return new GVPolygon(A, B, C, D)
  }

  addRegularPolygon (n, A = this.addPoint()[0], B = this.addPoint()[0]) {
    const points = [A, B]
    for (let i = 2; i < n; i++) {
      const P = points[i - 2].getRotate(points[i - 1], Math.PI - 2 * Math.PI / n)
      P.name = P.name || this.getNewName(P.type)
      this.geometric.push(P)
      points.push(P)
    }
    return new GVPolygon(...points)
  }

  addRectangle (A, B, C) {
    let rectangle
    if (A === undefined) {
      do {
        if (rectangle !== undefined) {
          this.geometric.pop()
          this.geometric.pop()
          this.geometric.pop()
          this.geometric.pop()
        }
        const [A, B, D] = this.addRectPoint()
        const C = this.addParallelogram(D, A, B).vertices[3]
        rectangle = new GVRectangle(A, B, C, D)
      } while (rectangle.ratio < 1.2 || rectangle.ratio > 1.7)
    }
    return rectangle
  }

  addRegularPolygonCenter (A = this.addPoint()[0], B = this.addPoint()[0], n) {
    const angle = Math.PI * (1 / 2 - 1 / n)
    const coeff = 1 / (2 * Math.sin(Math.PI / n))
    const P = new GVPoint(new GVCartesian(((A.x - B.x) * Math.cos(angle) - (A.y - B.y) * Math.sin(angle)) * coeff + B.x, ((A.x - B.x) * Math.sin(angle) + (A.y - B.y) * Math.cos(angle)) * coeff + B.y))
    P.name = P.name || this.getNewName(P.type)
    this.geometric.push(P)
    return P
  }

  addHomothetic (O, k, ...args) {
    const homotheticPoints = []
    args.map(M => {
      const point = new GVPoint(new GVCartesian(k * M.x + (1 - k) * O.x, k * M.y + (1 - k) * O.y))
      point.name = point.name || this.getNewName(point.type)
      this.geometric.push(point)
      homotheticPoints.push(point)
      return point
    })
    return homotheticPoints
  }

  addAngle (A, B, C) {
    const newAngle = new GVAngle(A, B, C)
    this.geometric.push(newAngle)
    return newAngle
  }

  addAnglesPolygon (...args) {
    const last = args.length - 1
    const vertices = [args[last]].concat(args).concat(args[0])
    const angles = []
    for (let i = 1; i < args.length + 1; i++) {
      const newAngle = new GVAngle(vertices[i - 1], vertices[i], vertices[i + 1])
      angles.push(newAngle)
      this.geometric.push(newAngle)
    }
    return angles
  }

  addRotate (center, angle, ...args) {
    const rotatePoints = []
    args.map(M => {
      const point = new GVPoint(new GVCartesian((M.x - center.x) * Math.cos(angle) - (M.y - center.y) * Math.sin(angle) + center.x, (M.x - center.x) * Math.sin(angle) + (M.y - center.y) * Math.cos(angle) + center.y))
      point.name = point.name || this.getNewName(point.type)
      this.geometric.push(point)
      rotatePoints.push(point)
      return point
    })
    return rotatePoints
  }

  exportGGB (arg = this.geometric) {
    const ggb = []
    arg.forEach(x => {
      ggb.push(x.getGGB())
    })
    return ggb.join('\n')
  }

  getFigure (...args) {
    this.geometricExport = this.show(...args)
    return getMathalea2DExport(this)
  }
}
