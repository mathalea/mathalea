import { randomInt, round } from 'mathjs'
import { GVCartesian } from './coordinates.js'
import { GVRectangle, GVTriangle, GVPolygon, GVVector, GVAngle, GVPoint, GVLine, GVSegment, GVGraphicObject, GVCircle, barycentre } from './elements.js'
import { getMathalea2DExport } from './getMathalea2DExport.js'
import { circularPermutation, quotient } from './outils.js'
import { aleaName } from '../outilsMathjs.js'

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

/**
 * @class
 * @classdesc Caracteristics of a graphic view
 * @author Frédéric PIOU
 */
export class GVGraphicView {
  names: string[]
  ppc: number
  scale: number
  geometric: GVGraphicObject[]
  geometricExport: GVGraphicObject[]
  grid: GVLine[]
  axes: GVLine[]
  xmin: number = 0
  ymin: number = 0
  xmax: number = 10
  ymax: number = 10
  width: number
  height: number
  ratio: number
  clipVisible : boolean = false
  saveRatio : boolean = true
  allowResize: boolean = true
  showLabelPoint: boolean = false
  limit: number = Infinity
  _namesAlea: boolean = true 
  constructor (xmin: number = 0, ymin: number = 0, xmax:number = 10, ymax:number = 10) {
    this.setDimensions(xmin, ymin, xmax, ymax)
    this.names = aleaName('ABCDEFGHIJKLMNOPRSTUVZ'.split(''))
    this.ppc = 20 // Pixels per Centimeter
    this.scale = 1 // Scale for Tikz
    this.geometric = []
    this.grid = []
    this.axes = []
  }

  set namesAlea(names: string[] | boolean) {
    if (typeof names === 'string') this.names = aleaName(names)
    if (names === false) this.names = 'ABCDEFGHIJKLMNOPRSTUVZ'.split('')
  }

  get namesAlea() {
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

  /**
   * Show any Objects in Mathalea2D
   * @example
   * show(A,B,C,ABC)
   */
  show (...args: GVGraphicObject[]): GVGraphicObject[] {
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

  addGrid (step: number = 1) { 
    for (let i = this.xmin ; i<quotient(this.width,step) ; i++) {
      const lineX = new GVLine(new GVPoint(i,0),new GVVector(0,1))
      lineX.color = 'gray'
      this.grid.push(lineX)
    }
    for (let i = this.ymin ; i<quotient(this.height,step) ; i++) {
      const lineY = new GVLine(new GVPoint(0,i),new GVVector(1,0))
      lineY.color = 'gray'
      this.grid.push(lineY)
    }
  }

  addAxes () { 
    const lineX = new GVLine(new GVPoint(0,0),new GVVector(0,1))
    this.axes.push(lineX)
    const lineY = new GVLine(new GVPoint(0,0),new GVVector(1,0))
    this.axes.push(lineY)
  }

  getDimensions (...liste: GVGraphicObject[]): [number, number, number, number] { 
    const listPoint = this.getListObjectTypeSelect('Point', liste)
    const listXPoint = listPoint.map((X: { x: GVPoint }) => { return X.x })
    const listYPoint = listPoint.map((Y: { y: GVPoint }) => { return Y.y })
    const xmin = Math.min(...listXPoint)
    const xmax = Math.max(...listXPoint)
    const ymin = Math.min(...listYPoint)
    const ymax = Math.max(...listYPoint)
    return [xmin, ymin, xmax, ymax]
  }

  getWidth (...liste: GVGraphicObject[]): number { 
    const [xmin, ymin, xmax, ymax] = this.getDimensions(...liste)
    return  xmax-xmin
  }

  getHeight (...liste: GVGraphicObject[]): number { 
    const [xmin, ymin, xmax, ymax] = this.getDimensions(...liste)
    return  ymax-ymin
  }

  getUponPoint (...liste: GVGraphicObject[]) : GVPoint {
    const listePoints = this.getListObjectTypeSelect('Point', liste)
    return this.getListObjectTypeSelect('Point', liste).sort((a,b) => b.y-a.y)[listePoints.length - 1]
  }

  geBelowPoint (...liste: GVGraphicObject[]) : GVPoint {
    const listePoints = this.getListObjectTypeSelect('Point', liste)
    return this.getListObjectTypeSelect('Point', liste).sort((a,b) => b.y-a.y)[0]
  }

  getLeftPoint (...liste: GVGraphicObject[]) : GVPoint {
    const listePoints = this.getListObjectTypeSelect('Point', liste)
    return this.getListObjectTypeSelect('Point', liste).sort((a,b) => b.x-a.x)[listePoints.length - 1]
  }

  getRightPoint (...liste: GVGraphicObject[]): GVPoint {
    const listePoints = this.getListObjectTypeSelect('Point', liste)
    return listePoints.sort((a,b) => b.x-a.x)[0]
  }
  /**
   * Resize window of graphic view to the created points
   * Keep the ratio
   */
  resize () {
    // On commence par déterminer les dimensions à partir des abscisses et des ordonnées extrèmes
    const [xmin, ymin, xmax, ymax] = this.getDimensions()
    const [width, height] = [xmax-xmin, ymax-ymin]
    // On fait une copie des dimensions obtenues
    let newheight = 0 + height
    let newwidth = 0 + width
    // On calcule le ratio obtenu
    const ratio = height / width
    const k = ratio / this.ratio
    // S'il faut conserver le ratio on ne modifie qu'une seule dimension
    if (this.saveRatio) {
      if (k < 1) { // La largeur est plus grande
        newheight = height / k
      } else { // La hauteur est plus grande
        newwidth = width * k
      }
    } else { // Sinon seul le ratio change
      this.ratio = newheight/newwidth
    }
    // La hauteur sera utilisée dans tous les cas pour le calcul de l'échelle.
    // Elle sera donc conservée si le ratio ne l'est pas.
    this.ppc = this.ppc * this.height / newheight
    this.scale = this.scale * this.height / newheight
    const deltaX = (newwidth - width) / 2
    const deltaY = (newheight - height) / 2
    this.setDimensions(xmin - deltaX, ymin - deltaY, xmax + deltaX, ymax + deltaY)
  }

  /**
   * Give the list sorted of object with a given type
   */
  getListObjectTypeSelect (typeSelect = 'Point', liste: GVGraphicObject[] = this.geometric): any {
    if (liste.length === 0) liste = this.geometric
    switch (typeSelect) {
      case 'Point':
        return liste.filter(obj => obj instanceof GVPoint).sort(
          (a, b) => {
            const nameA = a.name.split('_')
            const nameB = b.name.split('_')
            if (nameA[0] === nameB[0]) {
              return parseInt(nameA[1]) - parseInt(nameB[1])
            } else {
              return (-1) ** (nameA[0] > nameB[0] ? 0 : 1)
            }
          }
        )
      default:
        return this.geometric.filter(obj => !(obj instanceof GVPoint)).sort(
          (a, b) => {
            const nameA = a.name.split('_')
            const nameB = b.name.split('_')
            if (nameA[0] === nameB[0]) {
              return parseInt(nameA[1]) - parseInt(nameB[1])
            } else {
              return (-1) ** (nameA[0] > nameB[0] ? 0 : 1)
            }
          }
        )
    }
  }

  /**
   * Search the last name not used and give a new name
   */
  getLastNameNotUsed (typeSelect = 'Point') {
    switch (typeSelect) {
      case 'Point': {
        const list = this.getListObjectTypeSelect('Point')
        let nonUseLetter
        let i = 0
        do {
          const indice = i === 0 ? '' : `_${i}`
          nonUseLetter = this.names.find(
            letter => list.filter(x => x.name[0] === letter).find(
              obj => obj.name === letter + indice
            )?.name !== letter + indice)
          if (nonUseLetter !== undefined) nonUseLetter += indice
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
          nonUseLetter = this.names.find(
            letter => list.filter(x => x.name[0] === letter.toLowerCase()).find(
              obj => obj.name === letter.toLowerCase() + indice
            )?.name !== letter.toLowerCase() + indice)
          if (nonUseLetter !== undefined) nonUseLetter = nonUseLetter.toLowerCase() + indice
          i += 1
        } while (nonUseLetter === undefined)
        return nonUseLetter
        // return this.names.find(letter => list.find(obj => obj.name.split('')[0] === letter.toLowerCase())?.name.split('_')[0] !== letter.toLowerCase()).toLowerCase()
      }
    }
  }

  /**
   * Give a new name
   */
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

  aleaNameObject (...args: GVGraphicObject[]) {
    const names = aleaName(args.length)
    args.forEach((x,i) => {x.name = names[i]})
  }

  /**
   * Append new objects to the euclidean plan
   * @param {number} n Number of point to create
   * @param {number} step For coordinates
   * @example
   * this.addPoint(2,0.5) --> Add two points with coordinates step 0.5 precision
   */
  addPoint (n: number = 1, step?: number): GVPoint[] {
    // Il faudrait donner la possibilité d'ajouter des points définis par leurs coordonnées
    const newPoints = []
    for (let i = 0; i < n; i++) {
      let obj: GVPoint
      let cpt = 0
      do {
        cpt += 1
        obj = new GVPoint(
          new GVCartesian(
            step === undefined ? Math.random() * this.width + this.xmin : quotient(Math.random() * this.width + this.xmin, step),
            step === undefined ? Math.random() * this.height + this.ymin : quotient(Math.random() * this.height + this.ymin, step)
          )
        )
      } while (cpt<this.limit && (this.isCloseToExistingPoints(obj) || this.isCloseToLineThroughtExistingPoints(obj)))
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

  /**
   * Add intersect point of two lines in the view
   */
  addIntersectLine (line1: GVLine | GVCircle, line2: GVLine | GVCircle) {
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
    const d = this.distance(line1.A,line2.A)
    if (d>line1.r+line2.r || d<(Math.abs(line1.r-line2.r))) {
      return []
    } else {
      const a=(line1.r**2-line2.r**2+d**2)/(2*d)
      const h=Math.sqrt(line1.r**2-a**2)
      const x2=line1.A.x+a*(line2.A.x-line1.A.x)/d   
      const y2=line1.A.y+a*(line2.A.y-line1.A.y)/d   
      const x3=x2+h*(line2.A.y-line1.A.y)/d     
      const y3=y2-h*(line2.A.x-line1.A.x)/d 
      const P1 = new GVPoint(new GVCartesian(x3,y3))
      const x4=x2-h*(line2.A.y-line1.A.y)/d
      const y4=y2+h*(line2.A.x-line1.A.x)/d
      const P2 = new GVPoint(new GVCartesian(x4,y4))
      P1.name = P1.name || this.getNewName(P1.type)
      P2.name = P2.name || this.getNewName(P2.type)
      this.geometric.push(P1,P2)
      return [P1, P2]
    }
  }
  }

  /**
   * Zoom in or out
   */
  zoom (k: number = 1.01) {
    const xmin = k * (this.xmin - (this.xmax + this.xmin) / 2) + (this.xmax + this.xmin) / 2
    const xmax = k * (this.xmax - (this.xmax + this.xmin) / 2) + (this.xmax + this.xmin) / 2
    const ymin = k * (this.ymin - (this.ymax + this.ymin) / 2) + (this.ymax + this.ymin) / 2
    const ymax = k * (this.ymax - (this.ymax + this.ymin) / 2) + (this.ymax + this.ymin) / 2
    this.setDimensions(xmin, ymin, xmax, ymax)
  }

  /**
   * Give the distance between tow points, a point and a line, two lines
   */
  distance (P: GVPoint, Y: GVPoint | GVLine) {
    if (Y instanceof GVPoint) {
      return Math.sqrt((P.x - Y.x) ** 2 + (P.y - Y.y) ** 2)
    } else {
      return Math.abs(Y.a * P.x + Y.b * P.y - Y.c) / Math.sqrt(Y.a ** 2 + Y.b ** 2)
    }
  }

  /**
   * Tempt to estimate if a point is close to the existing points
   */
  isCloseToExistingPoints (M: GVPoint) {
    const listExistingPoints = this.getListObjectTypeSelect('Point')
    const maxDistance = Math.min(this.height, this.width) / listExistingPoints.length / 3
    if (listExistingPoints.length > 0) { return listExistingPoints.some(X => this.distance(X, M) < maxDistance) }
    return false
  }

  /**
   * Tempt to estimate if a point is close to the line through the existing point
   */
  isCloseToLineThroughtExistingPoints (M: GVPoint) {
    const listExistingPoints = this.getListObjectTypeSelect('Point')
    const litsExistingLine = this.getListObjectTypeSelect('Line')
    // const numberOfPoints = listExistingPoints.length
    const numberOfObjects = listExistingPoints.length + litsExistingLine.length
    const result = []
    const minDimension = Math.min(this.height, this.width) / numberOfObjects / 3
    for (let i = 0; i < listExistingPoints.length; i++) {
      for (let j = i + 1; j < listExistingPoints.length; j++) {
        const d = new GVLine(listExistingPoints[i], listExistingPoints[j])
        result.push(this.distance(M, d))
      }
    }
    for (let i=0; i < litsExistingLine.length; i++) {
      result.push(this.distance(M, litsExistingLine[i]))
    }
    return result.some(x => x < minDimension && parseFloat(x.toFixed(15)) !== 0)
  }

  /**
   * Add a new line to the view with new name
   */
  addLine (P1 = this.addPoint()[0], P2 = this.addPoint()[0]) {
    const line = new GVLine(P1, P2)
    line.name = this.getNewName(line.type)
    this.geometric.push(line)
    return line
  }

  /**
   * Add a new Segment to the view with new name
   */
  addSegment (P1 = this.addPoint()[0], P2 = this.addPoint()[0]) {
    const segment = new GVSegment(P1, P2)
    this.geometric.push(segment)
    return segment
  }

  /**
   * Add a new circle center
   * @param C
   * @param P 
   * @returns 
   */
  addCircle (C = this.addPoint()[0], X: GVPoint | number): GVCircle {
    let circle
    circle = new GVCircle(C, X)
    circle.name = this.getNewName(circle.type)
    this.geometric.push(circle)
    return circle
  }
  /**
   * Get the intersect point of a line and the bordure
   */
  getExtremPointGraphicLine (L: GVLine) {
    const x = [
      [L.getXPoint(this.ymin), this.ymin], // [xmin,xmax]
      [L.getXPoint(this.ymax), this.ymax] // [xmin,xmax]
    ]
    const y = [
      [this.xmin, L.getYPoint(this.xmin)], // [ymin,ymax]
      [this.xmax, L.getYPoint(this.xmax)] // [ymin,ymax]
    ]
    const extremites = []
    for (const u of x) {
      if (u.every(v => v !== undefined) && u[0] >= this.xmin && u[0] <= this.xmax) { extremites.push(u) }
    }
    for (const u of y) {
      if (u.every(v => v !== undefined) && u[1] >= this.ymin && u[1] <= this.ymax) { extremites.push(u) }
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

  /**
   * get a point between two points
   * @param {Point} point1
   * @param {Point} point2
   * @returns {Point}
   */
  getNewPointBetween (A, B) {
    const k = Math.random()
    return new GVPoint(
      new GVCartesian(
        (A.x - B.x) * k + B.x,
        (A.y - B.y) * k + B.y
      )
    )
  }

  /**
   * Add point between two but not too close to extrems
   * @param A 
   * @param B 
   * @returns 
   */
  addPointBetween (A: GVPoint,B: GVPoint): GVPoint {
    const barycentricsCoords = listeEntiersSommeConnue(2,100,15)
    const P = barycentre([A,B],barycentricsCoords)
    P.name = P.name || this.getNewName(P.type)
    this.geometric.push(P)
    return P
  }

  addPointDistance (A: GVPoint, r: number) {
    let P: GVPoint
    const circle = new GVCircle (A, r)
    do {
      const theta = Math.random() * Math.PI * 2
      P = circle.getPoint(theta)
    } while (this.isCloseToExistingPoints(P) || this.isCloseToLineThroughtExistingPoints(P))
    P.name = this.getNewName(P.type)
    this.geometric.push(P)
    return P
  }

  addPointInPolygon(...args: GVPoint[]) {
    const barycentricsCoords = listeEntiersSommeConnue(args.length,100,20*3/args.length)
    const P = barycentre(args,barycentricsCoords)
    P.name = P.name || this.getNewName(P.type)
    this.geometric.push(P)
    return P
  }

  addPointOutPolygon(...args: GVPoint[]): GVPoint {
    const barycentricsCoords = listeEntiersSommeConnue(args.length,100,20*3/args.length)
    const aleaI = Math.round(Math.random()*(barycentricsCoords.length-2))
    const P = new GVLine(args[aleaI],args[aleaI+1]).getSymetric(barycentre(args,barycentricsCoords))
    P.name = P.name || this.getNewName(P.type)
    this.geometric.push(P)
    return P
  }

  addPointOnPolygon(...args: GVPoint[]): GVPoint {
    const barycentricsCoords = listeEntiersSommeConnue(2, 100, 20 * 3 / 2)
    const P = barycentre(circularPermutation(args).slice(0,2), barycentricsCoords)
    P.name = P.name || this.getNewName(P.type)
    this.geometric.push(P)
    return P
    /*
    const barycentricsCoords = listeEntiersSommeConnue(args.length,100,20*3/args.length)
    barycentricsCoords[Math.round(Math.random()*(barycentricsCoords.length-2))] = 0
    const P = barycentre(args,barycentricsCoords)
    P.name = P.name || this.getNewName(P.type)
    this.geometric.push(P)
    return P
    */
  }

  placeLabelsPolygon(...args: GVPoint[]) {
    for (let i = 1; i < args.length+1; i++) {
      const names = [args[args.length-1]].concat(args).concat([args[0]])
      names[i].showName()
      names[i].labelPoints = [names[i-1],names[i],names[i+1]]
    }
  }
  
  addSymetric(X: GVPoint | GVLine, ...args: GVPoint[]): GVPoint[] {
    return args.map(x => {
      const P = X.getSymetric(x)
      P.name = P.name || this.getNewName(P.type)
      this.geometric.push(P)
      return P
    })
  }

  addTranslate (V: GVVector, ...args: GVPoint[]): GVPoint[] {
    return args.map(X => {
      const P = X.add(V)
      P.name = P.name || this.getNewName(P.type)
      this.geometric.push(P)
      return P
    })
  }

  move (V: GVVector, ...args: GVPoint[]) {
    for (let X of args) {
      X.x = X.add(V).x
      X.y = X.add(V).y
    }
  }

  /**
   * Add three point, two point or one point aligned to others
   * @param  {Point,Point} args // If no point or one point we creat new points
   * @returns
   */
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

  /**
   * P1, P2, P3 with P2P1P3 rectangular in P1
   * @param args 
   * @returns 
   */
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

  /**
   * Distances to the sides of a triangle
   * @param  {Point,Point,Point} args
   * @returns
   */
  distanceMinSidesVertices (P1, P2, P3) {
    // A faire pour n'importe quel nombre de sommets ?
    return Math.min(
      this.distance(P1, new GVLine(P2, P3)),
      this.distance(P2, new GVLine(P1, P3)),
      this.distance(P3, new GVLine(P1, P2))
    )
  }

  /**
   * Add three points not aligned or one not aligned with the two others
   * @param  {Point,Point} args If no point we create three new points
   * @returns {Point}
   */
  addNotAlignedPoint (P1 = this.addPoint()[0], P2 = this.addPoint()[0], P3 = undefined): GVPoint[] {
    // Le troisième point est écrasé si existant
    // Réfléchir à un ensemble plus grand de points non alignés
    const minDimension = Math.min(this.height, this.width) / this.getListObjectTypeSelect('Point').length / 3
    do {
      if (P3 !== undefined) this.geometric.pop()
      P3 = this.addPoint()[0]
    } while (this.distanceMinSidesVertices(P1, P2, P3) < minDimension)
    P3.name = P3.name || this.getNewName(P3.type)
    return [P1, P2, P3]
  }

  /**
   * Add a parallel line to another one or two parallel lines
   * @param  {Point,GVLine|GVLine} args If no args we create two parallels
   * @returns {GVLine}
   */
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
  
  /**
   * Add the sides of a polygon
   * @param  {...any} args
   * @returns {}
   */
  addSidesPolygon (...args): GVSegment[] {
    const sides = []
    for (let i = 0; i < args.length - 1; i++) {
      // sides.push(this.addSegment(args[i], args[i + 1]))
      sides.push(this.addSegment(args[i], args[i + 1]))
    }
    sides.push(this.addSegment(args[args.length - 1], args[0]))
    return sides
  }

  /**
   * Add labels to the vertices of a polygon.
   * @param args 
   */
  addLabelsPointsPolygon (...args: GVPoint[]) {
    const last = args.length - 1
    const vertices = [args[last]].concat(args).concat(args[0])
    for (let i = 1;i < args.length+1;i++) {
      vertices[i].showName()
      vertices[i].labelPoints = [vertices[i - 1], vertices[i], vertices[i+1]]
    }
  }

  addTriangle (arg1?: number | GVPoint, arg2?: number | GVPoint, arg3?: number | GVPoint, arg4?: number): GVTriangle {
    let triangle
    if (arg1 instanceof GVPoint && arg2 !== undefined && arg2 instanceof GVPoint && arg3 instanceof GVPoint) {
      triangle = new GVTriangle(arg1,arg2,arg3)
    } else if (arg1 instanceof GVPoint && arg2 instanceof GVPoint && arg3 instanceof GVPoint) {
      triangle = new GVTriangle(...this.addNotAlignedPoint(...[arg1,arg2,arg3].filter(P => P !== undefined)))
    } else if (arg1 instanceof GVPoint && typeof arg2 === 'number' && arg3 instanceof GVPoint && typeof arg4 === 'number') {
      const cercle1 = this.addCircle(arg1, arg2)
      const cercle2 = this.addCircle(arg3, arg4)
      const [P] = this.addIntersectLine(cercle1, cercle2)
      triangle = new GVTriangle(arg1,arg3,P)
    } else if (typeof arg1 === 'number' && typeof arg2 === 'number' && typeof arg3 === 'number') {
      const A = this.addPoint()[0]
      const B = this.addPointDistance(A,arg1)
      const cercle1 = this.addCircle(A, arg2)
      const cercle2 = this.addCircle(B, arg3)
      const [C] = this.addIntersectLine(cercle1, cercle2)
      triangle = new GVTriangle(A,B,C)
    } else if (arg1 === undefined) {
      triangle = new GVTriangle(...this.addNotAlignedPoint())
    }
    return triangle
  }

  /**
   * Add a group of 4 points making a parallelogram
   * @param  {...any} args // 0-3 Point
   * @returns {Group}
   */
  addParallelogram (A = this.addPoint()[0], B = this.addPoint()[0], C = this.addNotAlignedPoint(A, B)[2], D = undefined) {
    D = new GVPoint(
      new GVCartesian(
        A.x + C.x - B.x,
        A.y + C.y - B.y
      )
    )
    D.name = D.name || this.getNewName(D.type)
    this.geometric.push(D)
    return new GVPolygon(A, B, C, D)
  }

  addRegularPolygon (n: number, A: GVPoint = this.addPoint()[0], B: GVPoint = this.addPoint()[0]): GVPolygon {
    const points: GVPoint[] = [A,B]
    for (let i=2;i<n;i++) {
      const P = points[i-2].getRotate(points[i-1],Math.PI - 2 * Math.PI / n)
      P.name = P.name || this.getNewName(P.type)
      this.geometric.push(P)
      points.push(P)
    }
    return new GVPolygon(...points)
  }

  addRectangle(A?: GVPoint | number, B?: GVPoint | number, C?: GVPoint) {
    let rectangle
    if (A === undefined) {
      const [A, B, D] = this.addRectPoint()
      const C = this.addParallelogram(D,A,B).vertices[3]
      rectangle = new GVRectangle(A,B,C,D)
    }
    return rectangle
  }
  addRegularPolygonCenter (A: GVPoint = this.addPoint()[0], B: GVPoint = this.addPoint()[0], n: number): GVPoint {
    const angle = Math.PI * (1/2 - 1 / n)
    const coeff = 1 / (2 * Math.sin(Math.PI / n))
    const P =  new GVPoint(
      new GVCartesian(
        ((A.x-B.x)*Math.cos(angle)-(A.y-B.y)*Math.sin(angle)) * coeff + B.x,
        ((A.x-B.x)*Math.sin(angle)+(A.y-B.y)*Math.cos(angle)) * coeff + B.y
      ))
    P.name = P.name || this.getNewName(P.type)
    this.geometric.push(P)
    return P
  }

  addHomothetic (O: GVPoint, k: number, ...args: GVPoint[]): GVPoint[] {
    const homotheticPoints = []
    args.map(M => {
      const point = new GVPoint(
        new GVCartesian(
          k * M.x + (1 - k) * O.x,
          k * M.y + (1 - k) * O.y
        ))
      point.name = point.name || this.getNewName(point.type)
      this.geometric.push(point)
      homotheticPoints.push(point)
      return point
    })
    return homotheticPoints
  }

  /**
     * Add the angle ABC to the graphic view
     * @param {Point} A 
     * @param {Point} B 
     * @param {Point} C 
     */
  addAngle(A: GVPoint,B: GVPoint,C: GVPoint) {
    const newAngle = new GVAngle(A,B,C)
    this.geometric.push(newAngle)
    return newAngle
  }

  addAnglesPolygon(...args: GVPoint[]): GVAngle[] {
    const last = args.length - 1
    const vertices = [args[last]].concat(args).concat(args[0])
    const angles: GVAngle[] = []
    for (let i = 1;i < args.length+1;i++) {
      const newAngle = new GVAngle(vertices[i - 1], vertices[i], vertices[i+1])
      angles.push(newAngle)
      this.geometric.push(newAngle)
    }
    return angles
  }

  /**
   * Rotate points
   * @param {Point} center
   * @param {number} angle // Angle in radians
   * @param {Point} args 
   * @returns {Point[]}
   * @example
   * this.addRotate(O, Math.PI()/2, B)
   */
  addRotate(center: GVPoint, angle: number, ...args : GVPoint[]): GVPoint[]{
    const rotatePoints = []
    args.map(M => {
      const point = new GVPoint(
        new GVCartesian(
          (M.x-center.x)*Math.cos(angle)-(M.y-center.y)*Math.sin(angle) +center.x,
          (M.x-center.x)*Math.sin(angle)+(M.y-center.y)*Math.cos(angle) +center.y,
        ))
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

  /**
   * Export to Mathalea2D
   * @returns {Mathalea2D}
   */
  getFigure (...args) {
    this.geometricExport = this.show(...args)
    return getMathalea2DExport(this)
  }
}
