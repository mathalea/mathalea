import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, choice, texNum } from '../../modules/outils.js'
import { segment, tracePoint, polygone, labelPoint, texteSurArc, homothetie, point, rotation, mathalea2d, fixeBordures, droite, translation, vecteur, arcPointPointAngle } from '../../modules/2d.js'
import { create, all } from 'mathjs'
import { aleaVariables, toTex, resoudre, aleaExpression, aleaName } from '../../modules/outilsMathjs.js'

// eslint-disable-next-line no-debugger
debugger

export const math = create(all)
// console.log(math.parse('2'))
export const titre = 'Thales'
// eslint-disable-next-line no-debugger
// debugger

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '03/02/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '08/01/2022' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * @class
 * @classdesc Caracteristics of a graphics view
 * @author Frédéric PIOU
 */
export class GraphicView {
  constructor () {
    this.names = 'ABCDEFGHIJKLMNOPRSTUVZ'.split('')
    this.dimensions = { xmin: -10, ymin: -10, xmax: 10, ymax: 10 }
    this.width = undefined
    this.height = undefined
    this.ppc = 20 // Pixels per Centimeter
    this.scale = 1 // Scale for Tikz
    this.ratio = undefined
    this.geometric = []
  }

  /**
   * get width from dimensions
   */
  getWidth () { this.width = this.dimensions.xmax - this.dimensions.xmin }
  
  /**
   * get height from dimensions
   */
  getHeight () { this.height = this.dimensions.ymax - this.dimensions.ymin }

  /**
   * get ratio from dimensions
   */
  getRatio () {
    this.getHeight()
    this.getWidth()
    this.ratio = this.height / this.width
  }

  /**
   * Resize window of graphic view to the created points
   * Keep the ratio
   */
  resize () {
    const listPoint = this.getListObjectTypeSelect('Point')
    const listXPoint = listPoint.map(X => { return X.x })
    const listYPoint = listPoint.map(Y => { return Y.y })
    const xmin = Math.min(...listXPoint)
    const xmax = Math.max(...listXPoint)
    const ymin = Math.min(...listYPoint)
    const ymax = Math.max(...listYPoint)
    const width = xmax - xmin
    const height = ymax - ymin
    const ratio = height / width
    this.getRatio()
    const k = ratio / this.ratio
    let newheight = 0 + height
    let newwidth = 0 + width
    if (k < 1) {
      newheight = height / k
    } else {
      newwidth = width * k
    }
    this.ppc = this.ppc * this.width / newwidth
    const deltaX = (newwidth - width) / 2
    const deltaY = (newheight - height) / 2
    this.dimensions = { xmin: xmin - deltaX, ymin: ymin - deltaY, xmax: xmax + deltaX, ymax: ymax + deltaY }
    this.getHeight()
    this.getWidth()
  }

  /**
   * Give the list sorted of object with a given type
   * @param {string} typeSelect Type
   * @returns {Array}
   */
  getListObjectTypeSelect (typeSelect = 'Point') {
    switch (typeSelect) {
      case 'Point':
        return this.geometric.filter(obj => obj instanceof Point).sort(
          (a, b) => {
            const nameA = a.name.split('_')
            const nameB = b.name.split('_')
            if (nameA[0] === nameB[0]) {
              return nameA[1] - nameB[1]
            } else {
              return (-1) ** (nameA[0] > nameB[0] ? 0 : 1)
            }
          }
        )
      default:
        return this.geometric.filter(obj => !(obj instanceof Point)).sort(
          (a, b) => {
            const nameA = a.name.split('_')
            const nameB = b.name.split('_')
            if (nameA[0] === nameB[0]) {
              return nameA[1] - nameB[1]
            } else {
              return (-1) ** (nameA[0] > nameB[0] ? 0 : 1)
            }
          }
        )
    }
  }

  /**
   * Search the last name not used and give a new name
   * @param {string} typeSelect Type of object 'Point', 'Line' etc.
   * @returns {string} New name for a new object
   */
  getLastNameNotUsed (typeSelect = 'Point') {
    switch (typeSelect) {
      case 'Point': {
        const list = this.getListObjectTypeSelect('Point')
        return this.names.find(letter => list.find(obj => obj.name.split('')[0] === letter)?.name.split('_')[0] !== letter)
      }
      case 'Segment':
      case 'Line': {
        const list = this.getListObjectTypeSelect('Segment').concat(this.getListObjectTypeSelect('Line'))
        return this.names.find(letter => list.find(obj => obj.name.split('')[0] === letter.toLowerCase())?.name.split('_')[0] !== letter.toLowerCase()).toLowerCase()
      }
    }
  }

  /**
   * Give a new name
   * @param {string} typeSelect Type of the object
   * @returns {string}
   */
  getNewName (typeSelect = 'Point') {
    switch (typeSelect) {
      case 'Point':
        return this.getLastNameNotUsed(typeSelect)
      case 'Line':
        return this.getLastNameNotUsed(typeSelect)
    }
  }

  /**
   * Append new objects to the euclidean plan
   * @param  {...any} args // List of geometric objects
   */
  addPoint (n = 1) {
    this.getWidth()
    this.getHeight()
    const created = []
    for (let i = 0; i < n; i++) {
      const obj = new Point()
      obj.name = obj.name || this.getNewName(obj.type)
      do {
        obj.x = Math.random() * this.width + this.dimensions.xmin
        obj.y = Math.random() * this.height + this.dimensions.ymin
      } while (this.isCloseToExistingPoints(obj) || this.isCloseToLineThroughtExistingPoints(obj))
      this.geometric.push(obj)
      created.push(obj)
    }
    return created.length === 1 ? created[0] : created
  }

  /**
   * Add intersect poitn of two lines in the view
   * @param {Line} line1
   * @param {Line} line2
   * @returns {Point}
   */
  addIntersectLine (line1, line2) {
    line1.getLineEquation()
    line2.getLineEquation()
    const delta = line1.a * line2.b - line2.a * line1.b
    if (delta.toFixed(15) !== 0) {
      const deltax = -(line1.b * line2.c - line2.b * line1.c)
      const deltay = line1.a * line2.c - line2.a * line1.c
      const point = new Point(new Coordinate(deltax / delta, deltay / delta))
      point.name = this.getNewName(point.type)
      this.geometric.push(point)
      return point
    }
  }

  /**
   * Zoom in or out
   * @param {*} k 
   */
  zoom (k = 1.01) {
    const xmin = k * (this.dimensions.xmin - (this.dimensions.xmax + this.dimensions.xmin) / 2) + (this.dimensions.xmax + this.dimensions.xmin) / 2
    const xmax = k * (this.dimensions.xmax - (this.dimensions.xmax + this.dimensions.xmin) / 2) + (this.dimensions.xmax + this.dimensions.xmin) / 2
    const ymin = k * (this.dimensions.ymin - (this.dimensions.ymax + this.dimensions.ymin) / 2) + (this.dimensions.ymax + this.dimensions.ymin) / 2
    const ymax = k * (this.dimensions.ymax - (this.dimensions.ymax + this.dimensions.ymin) / 2) + (this.dimensions.ymax + this.dimensions.ymin) / 2
    this.dimensions = { xmin: xmin, xmax: xmax, ymin: ymin, ymax: ymax }
    this.getWidth()
    this.getHeight()
  }

  /**
   * Give the distance between tow points, a point and a line, two lines
   * @param  {...any} args
   * @returns
   */
  distance (...args) {
    if (args.every(x => x.type === 'Point')) return Math.sqrt((args[0].x - args[1].x) ** 2 + (args[0].y - args[1].y) ** 2)
    // if (args.every(x => x.type === 'Line')) return // distance entre deux droites
    const M = args.filter(x => x.type === 'Point')[0]
    const d = args.filter(x => x.type === 'Line')[0]
    d.getLineEquation()
    return Math.abs(d.a * M.x + d.b * M.y - d.c) / Math.sqrt(d.a ** 2 + d.b ** 2)
  }

  /**
   * Tempt to estimate if a point is close to the existing points
   * @param {Point} M
   * @returns
   */
  isCloseToExistingPoints (M) {
    const listExistingPoints = this.getListObjectTypeSelect('Point')
    const maxDistance = Math.min(this.height, this.width) / listExistingPoints.length / 3
    if (listExistingPoints.length > 0) { return listExistingPoints.some(X => this.distance(X, M) < maxDistance) }
    return false
  }

  /**
   * Tempt to estimate if a point is close to the line through the existing point
   * @param {Point} M
   * @returns
   */
  isCloseToLineThroughtExistingPoints (M) {
    const listExistingPoints = this.getListObjectTypeSelect('Point')
    const numberOfPoints = listExistingPoints.length
    const result = []
    const minDimension = Math.min(this.height, this.width) / numberOfPoints / 3
    for (let i = 0; i < numberOfPoints; i++) {
      for (let j = i + 1; j < numberOfPoints; j++) {
        const d = new Line()
        d.A = listExistingPoints[i]
        d.B = listExistingPoints[j]
        result.push(this.distance(M, d))
      }
    }
    return result.some(x => x < minDimension && parseFloat(x.toFixed(15)) !== 0)
  }

  /**
   * Add a new line to the view with new name
   * @param  {Line|Point,Point} args // Line or Line through two point existing or not
   * @returns {Line}
   */
  addLine (...args) {
    let line
    if (!(args.length === 1 && args[0] instanceof Line)) {
      const points = args.concat(this.addPoint(2 - args.length))
      line = new Line(...points)
      line.getLineEquation()
    } else {
      line = args[0]
    }
    line.name = this.getNewName(line.type)
    this.geometric.push(line)
    if (line.A === undefined) {
      line.A = this.getExtremPointGraphicLine(line)[0]
    }
    if (line.B === undefined) {
      line.B = this.getExtremPointGraphicLine(line)[1]
    }
    return line
  }

  /**
   * Get the intersect point of a line and the bordure
   * @param {Line} line
   * @returns {Point}
   */
  getExtremPointGraphicLine (line) {
    const x = [
      [line.getXPoint(this.dimensions.ymin), this.dimensions.ymin], // [xmin,xmax]
      [line.getXPoint(this.dimensions.ymax), this.dimensions.ymax] // [xmin,xmax]
    ]
    const y = [
      [this.dimensions.xmin, line.getYPoint(this.dimensions.xmin)], // [ymin,ymax]
      [this.dimensions.xmax, line.getYPoint(this.dimensions.xmax)] // [ymin,ymax]
    ]
    const extremites = []
    for (const u of x) {
      if (u.every(v => v !== undefined) && u[0] >= this.dimensions.xmin && u[0] <= this.dimensions.xmax) { extremites.push(u) }
    }
    for (const u of y) {
      if (u.every(v => v !== undefined) && u[1] >= this.dimensions.ymin && u[1] <= this.dimensions.ymax) { extremites.push(u) }
    }
    const point1 = new Point()
    const point2 = new Point()
    if (extremites.length === 2) {
      point1.x = extremites[0][0]
      point1.y = extremites[0][1]
      point2.x = extremites[1][0]
      point2.y = extremites[1][1]
      return [point1, point2]
    } else {
      return undefined
    }
  }

  /**
   * get a point between two existing points
   * @param {Point} point1
   * @param {Point} point2
   * @returns {Point}
   */
  getNewPointBetween (point1, point2) {
    const k = Math.random()
    const coordinates = [
      (point1.x - point2.x) * k + point2.x,
      (point1.y - point2.y) * k + point2.y
    ]
    const point = new Point()
    point.x = coordinates[0]
    point.y = coordinates[1]
    return point
  }

  /**
   * Add three point, two point or one point aligned to others
   * @param  {Point,Point} args // If no point or one point we creat new points
   * @returns
   */
  addPointAligned (...args) {
    let obj
    let points
    do {
      if (points !== undefined) {
        for (let i = 0; i < 2 - args.length; i++) {
          this.geometric.pop()
        }
      }
      points = args.concat(this.addPoint(2 - args.length))
      const line = new Line(...points)
      obj = this.getNewPointBetween(...this.getExtremPointGraphicLine(line))
    } while (this.isCloseToExistingPoints(obj) || this.isCloseToLineThroughtExistingPoints(obj))
    obj.name = obj.name || this.getNewName(obj.type)
    points.push(obj)
    this.geometric.push(obj)
    return args.length === 2 ? points[2] : points
  }

  /**
   * Distances to the sides of a triangle
   * @param  {Point,Point,Point} args
   * @returns
   */
  distanceMinSidesVertices (...args) {
    // A faire pour n'importe quel nombre de sommets ?
    const line0 = new Line()
    const line1 = new Line()
    const line2 = new Line()
    line0.A = args[1]
    line0.B = args[2]
    line1.A = args[0]
    line1.B = args[2]
    line2.A = args[0]
    line2.B = args[1]
    return Math.min(this.distance(args[0], line0), this.distance(args[1], line1), this.distance(args[2], line2))
  }

  /**
   * Add three points not aligned or one not aligned with the two others
   * @param  {Point,Point} args If no point we create three new points
   * @returns {Point}
   */
  addNotAlignedPoint (...args) {
    // Deux points maximum
    const points = args.concat(this.addPoint(2 - args.length))
    let obj
    const line = new Line()
    line.A = points[0]
    line.B = points[1]
    line.getLineEquation()
    const minDimension = Math.min(this.height, this.width) / this.getListObjectTypeSelect('Point').length / 3
    do {
      if (obj !== undefined) this.geometric.pop()
      obj = this.addPoint()
    } while (this.distanceMinSidesVertices(...points, obj) < minDimension)
    obj.name = obj.name || this.getNewName(obj.type)
    points.push(obj)
    return points
  }

  /**
   * Add a parallel line to another one or two parallel lines
   * @param  {Point,Line|Line} args If no args we create two parallels
   * @returns {Line}
   */
  addParallelLine (...args) {
    const parallels = []
    if (args.length === 0) {
      // Deux droites parallèles au hasard
    } else if (args.length === 1 && args[0] instanceof Line) {
      // une droite parallèle à args[0] au hasard
    } else {
      // une droite parallèle à une droite donnée et passant par un point
      const point = args.filter(x => x instanceof Point)[0]
      const line = args.filter(x => x instanceof Line)[0]
      line.getLineEquation()
      const parallel = new Line()
      parallel.a = line.a
      parallel.b = line.b
      parallel.c = parallel.a * point.x + parallel.b * point.y
      parallels.push(parallel)
      this.addLine(parallel)
    }
    return parallels.length === 1 ? parallels[0] : parallels
  }

  /**
   * Export to Mathalea2D
   * @returns {Mathalea2D}
   */
  getMathalea2DExport () {
    const objs = []
    for (const obj of this.geometric) {
      if (obj instanceof Point) {
        const newPoint = point(obj.x, obj.y, obj.name, 'above')
        objs.push(tracePoint(newPoint))
        objs.push(labelPoint(newPoint))
      }
      if (obj instanceof Line) {
        objs.push(droite(obj.A, obj.B))
      }
      if (obj instanceof Segment) {
        objs.push(segment(obj.A, obj.B))
      }
    }
    this.resize()
    const scaleppc = 20 / this.ppc
    const clip = { xmin: this.dimensions.xmin - scaleppc, xmax: this.dimensions.xmax + scaleppc, ymin: this.dimensions.ymin - scaleppc, ymax: this.dimensions.ymax + scaleppc }
    const drawClip = polygone(
      point(clip.xmin, clip.ymin),
      point(clip.xmax, clip.ymin),
      point(clip.xmax, clip.ymax),
      point(clip.xmin, clip.ymax)
    )
    objs.push(drawClip)
    return mathalea2d(Object.assign({ pixelsParCm: this.ppc, scale: this.scale }, clip), objs)
  }
}

/**
 * @class for coordinates (x,y)
 */
export class Coordinate {
  constructor (x, y) {
    this.x = x
    this.y = y
  }
}

/**
 * @class for polar coordinates (r,theta)
 */
export class Polar {
  constructor (r, theta) {
    this.r = r
    this.theta = theta
  }
}

/**
 * @class
 * @classdesc Caracteristics of a point in an euclidean plan
 */
export class Point {
  constructor (arg) {
    this.x = arg !== undefined && arg instanceof Coordinate ? arg.x : undefined
    this.y = arg !== undefined && arg instanceof Coordinate ? arg.y : undefined
    this.r = arg !== undefined && arg instanceof Polar ? arg.r : undefined
    this.theta = arg !== undefined && arg instanceof Polar ? arg.theta : undefined
    this.name = undefined
    this.type = 'Point'
  }

  getPolarCoordinate () {
    this.theta = this.theta || Math.atan(this.y / this.x)
    this.r = this.r || Math.sqrt(this.x ** 2 + this.y ** 2)
    return { r: this.r, theta: this.theta }
  }

  getScalarCoordinate () {
    this.x = this.x || this.r * Math.cos(this.theta)
    this.y = this.y || this.r * Math.sin(this.theta)
    return { x: this.x, y: this.y }
  }
}

/**
 * @class
 * @classdesc Caracteristics of a line in an euclidean plan (ax+by=c)
 */
export class Line {
  constructor (A, B) {
    this.a = undefined
    this.b = undefined
    this.c = undefined
    this.A = A
    this.B = B
    this.name = undefined
    this.type = 'Line'
  }

  /**
   * Get x Point of the line
   * @param {number} x
   * @returns
   */
  getYPoint (x) {
    if (this.A !== undefined && this.B !== undefined) this.getLineEquation()
    return this.b === 0 ? undefined : (this.c - this.a * x) / this.b
  }

  /**
   * Get y Point of the line
   * @param {number} y
   * @returns
   */
  getXPoint (y) {
    if (this.A !== undefined && this.B !== undefined) this.getLineEquation()
    return this.a === 0 ? undefined : (this.c - this.b * y) / this.a
  }

  /**
   * Calculate a and b in line equation : ax+by=1
   * @param {Object} A // type = Point
   * @param {Object} B // type = Point
   */
  getLineEquation () {
    this.a = this.B.y - this.A.y
    this.b = this.A.x - this.B.x
    this.c = this.A.x * this.B.y - this.B.x * this.A.y
  }
}

/**
 * @class
 * @classdesc Caracteristics of a segment in an euclidean plan
 */
export class Segment extends Line {
  constructor () {
    super()
    this.type = 'Segment'
  }
}

/**
 * Create a configuration of Thales in a given graphic view
 * @returns
 */
function aleaThalesConfiguration () {
  // http://localhost:8080/mathalea.html?ex=betaThales,s=6
  const graphic = new GraphicView()
  graphic.dimensions = { xmin: 0, ymin: 0, xmax: 10, ymax: 7 }
  const result = graphic.addNotAlignedPoint() // Trois points non alignés
  const O = result[0]
  const A = result[1]
  const B = result[2]
  O.name = 'O'
  A.name = 'A'
  B.name = 'B'
  // On ajoute les droites (OA), (OB) et (AB)
  graphic.addLine(O, A)
  const droiteOB = graphic.addLine(O, B)
  const droiteAB = graphic.addLine(A, B)
  // M est un point de (OA)
  const M = graphic.addPointAligned(O, A)
  M.name = 'M'
  // On crée une parallèle à (AB)
  const droiteMN = graphic.addParallelLine(droiteAB, M)
  // On ajoute le point d'intersection de (OA) et (MN)
  const N = graphic.addIntersectLine(droiteMN, droiteOB)
  N.name = 'N'
  return { texte: graphic.getMathalea2DExport(), texteCorr: '' }
}

/**
 * Produire une configuration de Thalès et les éléments de rédaction d'un énoncé et de sa solution
 * @returns {Objet} // retourne un objet
 */
function thales () {
  const v = aleaVariables(
    {
      xA: 'pickRandom([-1,1])*round(random(1,3),1)', // Abscisse du point A
      yA: '0', // Ordonnée de A
      alpha: 'random(10,350)', // Angle de rotation autour de O pour B
      kB: 'pickRandom([-1,1])*pickRandom([round(random(0.3,0.7),1),round(random(1.3,3),1)])', // rapport d'ag-red de OB=kB*OA
      k: 'pickRandom([-1,1])*pickRandom([round(random(0.3,0.7),1),round(random(1.3,3),1)])', // OM = k * OA et ON = k * OB
      xB: 'kB*xA*cos(alpha/180*PI)',
      yB: 'kB*xA*sin(alpha/180*PI)',
      xM: 'k*xA',
      yM: 'k*yA',
      xN: 'k*xB',
      yN: 'k*yB',
      xmin: 'min([0,xA,xB,xM,xN])',
      xmax: 'max([0,xA,xB,xM,xN])',
      ymin: 'min([0,yA,yB,yM,yN])',
      ymax: 'max([0,yA,yB,yM,yN])',
      largeur: 'xmax-xmin',
      hauteur: 'ymax-ymin',
      ppc: '10/largeur*20',
      scale: '5/largeur',
      ratio: 'largeur/hauteur',
      test: 'abs(kB)!=1 and abs(k)!=1 and 1<ratio<1.3',
      OA: 'distance([0,0],[xA,yA])',
      OM: 'distance([0,0],[xM,yM])',
      ON: 'distance([0,0],[xN,yN])',
      AB: 'round(distance([xB,yB],[xA,yA]),1)',
      MN: 'abs(k)*AB',
      OB: 'distance([0,0],[xB,yB])'
    }, { valueOf: true }
  )
  const listeNames = aleaName(5)
  const objets = []
  const O = point(0, 0, listeNames[0], 'left')
  const A = point(v.xA, 0, listeNames[1], 'below')
  const B = homothetie(rotation(A, O, v.alpha), O, v.kB)
  B.nom = listeNames[2]
  B.positionLabel = 'above'
  const M = homothetie(A, O, v.k)
  M.nom = listeNames[3]
  M.positionLabel = 'below'
  const N = homothetie(B, O, v.k)
  N.nom = listeNames[4]
  N.positionLabel = 'above'
  const dOA = droite(O, A)
  const dOB = droite(O, B)
  // const OM = segment(O, M)
  // const ON = segment(O, N)
  const dAB = droite(A, B)
  const dMN = droite(M, N)
  objets.push(O, A, B, M, N, dOA, dOB, dAB, dMN)
  for (const i of objets) {
    if (i.typeObjet === 'point') objets.push(labelPoint(i))
  }
  const k = 20 / v.ppc
  const clip = { xmin: v.xmin - k, xmax: v.xmax + k, ymin: v.ymin - k, ymax: v.ymax + k }
  const drawClip = polygone(
    point(clip.xmin, clip.ymin),
    point(clip.xmax, clip.ymin),
    point(clip.xmax, clip.ymax),
    point(clip.xmin, clip.ymax)
  )
  objets.push(drawClip)
  const droitesparalleles = aleaName([aleaName([A, B]).map(x => { return x.nom }).join(''), aleaName([M, N]).map(x => { return x.nom }).join('')])
  const d1 = droitesparalleles[0]
  const d2 = droitesparalleles[1]
  const droitessecantes = aleaName([aleaName([A, M]).map(x => { return x.nom }).join(''), aleaName([B, N]).map(x => { return x.nom }).join('')])
  const d3 = droitessecantes[0]
  const d4 = droitessecantes[1]
  const OA = { l: v.OA, nom: [O, A].map(x => { return x.nom }).join(''), nomAlea: aleaName([O, A]).map(x => { return x.nom }).join('') }
  const OM = { l: v.OM, nom: [O, M].map(x => { return x.nom }).join(''), nomAlea: aleaName([O, M]).map(x => { return x.nom }).join('') }
  const OB = { l: v.OB, nom: [O, B].map(x => { return x.nom }).join(''), nomAlea: aleaName([O, B]).map(x => { return x.nom }).join('') }
  const ON = { l: v.ON, nom: [O, N].map(x => { return x.nom }).join(''), nomAlea: aleaName([O, N]).map(x => { return x.nom }).join('') }
  const AB = { l: v.AB, nom: [A, B].map(x => { return x.nom }).join(''), nomAlea: aleaName([A, B]).map(x => { return x.nom }).join('') }
  const MN = { l: v.MN, nom: [M, N].map(x => { return x.nom }).join(''), nomAlea: aleaName([M, N]).map(x => { return x.nom }).join('') }
  const inverse = aleaName([0, 1], 1) // Peut-être pas utile
  const quotientsEgaux = '$$'.split('').join([[OA, OM], [OB, ON], [AB, MN]].map(quotient => {
    quotient = [quotient[(0 + inverse) % 2], quotient[(1 + inverse) % 2]]
    return toTex(quotient.map(x => { return x.nom }).join('/'))
  }).join('='))
  const variables = {}
  variables[OA.nom] = OA.l
  variables[OB.nom] = OB.l
  variables[OM.nom] = OM.l
  // Calculer ON
  const deuxQuotients = '$$'.split('').join(aleaName([[OA, OM], [OB, ON]]).map(quotient => {
    quotient = [quotient[(0 + inverse) % 2], quotient[(1 + inverse) % 2]]
    return toTex(quotient.map(x => { return x.nom }).join('/'), { variables: variables })
  }).join('='))
  const resoudreQuotients = [[OA, OM], [OB, ON]].map(quotient => {
    quotient = [quotient[(0 + inverse) % 2], quotient[(1 + inverse) % 2]]
    return aleaExpression(quotient.map(x => { return x.nom }).join('/'), variables)
  }).join('=')
  const steps = []
  steps.push('$$'.split('').join([[OA, ON], [OM, OB]].map(quotient => {
    quotient = [quotient[(0 + inverse) % 2], quotient[(1 + inverse) % 2]]
    return toTex(quotient.map(x => { return x.nom }).join('*'), { variables: variables })
  }).join('=')))
  steps.push('$$'.split('').join(toTex(`${ON.nom}=(${OM.nom}*${OB.nom})/${OA.nom}`, { variables: variables })))
  // Calculer MN
  const variablesMN = {}
  variablesMN[OA.nom] = OA.l
  variablesMN[AB.nom] = AB.l
  variablesMN[OM.nom] = OM.l
  const deuxQuotientsMN = '$$'.split('').join(aleaName([[OA, OM], [AB, MN]]).map(quotient => {
    quotient = [quotient[(0 + inverse) % 2], quotient[(1 + inverse) % 2]]
    return toTex(quotient.map(x => { return x.nom }).join('/'), { variables: variablesMN })
  }).join('='))
  const stepsMN = []
  stepsMN.push('$$'.split('').join([[OA, MN], [OM, AB]].map(quotient => {
    quotient = [quotient[(0 + inverse) % 2], quotient[(1 + inverse) % 2]]
    return toTex(quotient.map(x => { return x.nom }).join('*'), { variables: variablesMN })
  }).join('=')))
  stepsMN.push('$$'.split('').join(toTex(`${MN.nom}=(${OM.nom}*${AB.nom})/${OA.nom}`, { variables: variablesMN })))
  const donnees = aleaName([OA, OB, OM]).map(x => { return `$${x.nomAlea}=${texNum(x.l)}\\text{ cm}$` }).join(', ')
  const donneesMN = aleaName([OA, AB, OM]).map(x => { return `$${x.nomAlea}=${texNum(x.l)}\\text{ cm}$` }).join(', ')
  const enonce = [
    `$(${d1})$ et $(${d2})$ sont parallèles.`,
    `$(${d3})$ et $(${d4})$ sont sécantes en $${O.nom}$.`,
    'D\'après le théorème de Thalès, on a l\'égalité suivante.',
    `${quotientsEgaux}`,
    `On a ${donnees}.`,
    `Calculer $${ON.nom}$.`,
    `${deuxQuotients}`,
    'On en déduit l\'égalité des produits en croix :',
    `${steps[0]}`,
    `${steps[1]}`,
    `Donc $${ON.nom}=${texNum(ON.l)}\\text{ cm}$.`,
    `On a ${donneesMN}.`,
    `Calculer $${MN.nom}$.`,
    `${deuxQuotientsMN}`,
    'On en déduit l\'égalité des produits en croix :',
    `${stepsMN[0]}`,
    `${stepsMN[1]}`,
    `Donc $${MN.nom}=${texNum(MN.l)}\\text{ cm}$.`,
    `${resoudre(resoudreQuotients).texteCorr}`
  ]
  const figure = '<br><br>' + mathalea2d(Object.assign({ pixelsParCm: v.ppc, scale: v.scale }, clip), objets) + '<br><br>'
  return { enonce: enonce, figure: figure, quotientsEgaux: quotientsEgaux }
}

function anglesSecantes (A, rot = { O: 60, A: 0 }) {
  const s = rotation(translation(A, vecteur(1, 0)), A, rot.A)
  const S = rotation(translation(A, vecteur(3, 0)), A, rot.A)
  const t = rotation(s, A, 180)
  const T = rotation(S, A, 180)
  const x = rotation(translation(A, vecteur(1, 0)), A, rot.O)
  const X = rotation(translation(A, vecteur(3, 0)), A, rot.O)
  const Ox = rotation(x, A, 180)
  const OX = rotation(X, A, 180)
  return {
    a: arcPointPointAngle(s, x, rot.O - rot.A, true, 'blue'),
    b: arcPointPointAngle(x, t, 180 - (rot.O - rot.A), true, 'green'),
    c: arcPointPointAngle(t, Ox, rot.O - rot.A, true, 'red'),
    d: arcPointPointAngle(Ox, s, 180 - (rot.O - rot.A), true, 'gray'),
    s: s,
    S: S,
    t: t,
    T: T,
    x: x,
    X: X,
    Ox: Ox,
    OX: OX,
    As: droite(A, s),
    Ax: droite(A, x),
    A: A,
    labela: texteSurArc((rot.O - rot.A) % 180 + '°', s, x, rot.O - rot.A, 'black'),
    labelb: texteSurArc((180 - (rot.O - rot.A)) % 180 + '°', x, t, 180 - (rot.O - rot.A), 'black'),
    labelc: texteSurArc((rot.O - rot.A) % 180 + '°', t, Ox, rot.O - rot.A, 'black'),
    labeld: texteSurArc((180 - (rot.O - rot.A)) % 180 + '°', Ox, s, 180 - (rot.O - rot.A), 'black')
  }
}
/**
 * Description didactique de l'exercice
 * @author Frédéric PIOU
 * Référence
*/
export default function exercicesAnglesAIC () {
  Exercice.call(this)
  const formulaire = [
    '1 : Angles marqués alternes-internes ou correspondants ?',
    '2 : Déterminer si des droites sont parallèles (angles marqués).',
    '3 : Calculer la mesure d\'un angle.',
    '4 : Nommer un angle alterne-interne ou correspondant à un angle marqué.',
    '5 : Nommer un angle alterne-interne ou correspondant à un angle nommé.',
    '6 : Déterminer si des droites sont parallèles (utiliser les noms d\'angles).',
    '7 : Calculer la mesure d\'un angle. (utiliser le nom des angles) ?',
    '8 : Mélange des questions'
  ]
  this.nbQuestions = 1
  this.besoinFormulaireNumerique = [
    'Type de question', 8, formulaire.join('\n')
  ]
  this.consigne = ''
  this.nbCols = 0
  this.nbColsCorr = 0
  this.tailleDiaporama = 1
  this.video = ''
  this.correctionDetailleeDisponible = false
  this.correctionDetaillee = true
  context.isHtml ? (this.spacing = 2.5) : (this.spacing = 0)
  context.isHtml ? (this.spacingCorr = 2.5) : (this.spacingCorr = 0)
  this.sup = 'all'
  this.nouvelleVersion = function (numeroExercice, dDebug = false) {
    if (this.sup === 'all') this.nbQuestions = formulaire.length - 1
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = [] // À placer même si l'exercice n'a pas vocation à être corrigé
    let nquestion = 0
    for (let i = 0, exercice, cpt = 0; i < this.nbQuestions && cpt < 100;) { // Boucle principale où i+1 correspond au numéro de la question
      if (this.sup === 'all') {
        nquestion += 1
      } else if (this.sup === 8) {
        nquestion = choice([1, 2, 3, 4, 5, 6, 7])
      } else {
        nquestion = this.sup
      }
      if (dDebug) {
        console.log(`
          ********************************
          Exercice ${i + 1} Case ${nquestion}
          ********************************`)
      }
      switch (nquestion) { // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
        case 1: {
          exercice = thales()
          exercice.texte = 'En admettant que toutes les conditions sont réunies, appliquer le théorème de Thalès à la configuration ci-dessous.' + exercice.figure
          exercice.texteCorr = exercice.enonce.slice(0, 4).join('<br>')
          break
        }
        case 2: {
          exercice = thales()
          exercice.texte = exercice.enonce.slice(5, 7).join('<br>')
          exercice.texteCorr = exercice.enonce.slice(7, 11).join('<br>')
          break
        }
        case 3: {
          exercice = thales()
          exercice.texte = exercice.enonce.slice(0, 2).join('<br>')
          exercice.texte += '<br>' + 'Faire une figure à main levée puis appliquer le théorème de Thalès.'
          exercice.texteCorr = exercice.figure + exercice.enonce.slice(3, 4).join('<br>')
          break
        }
        case 4: {
          exercice = thales()
          exercice.texte = 'On admet que toutes les conditions sont réunies pour une configuration de Thalès.'
          exercice.texte += exercice.figure
          exercice.texte += exercice.enonce.slice(4, 6).join('<br>')
          exercice.texteCorr = exercice.enonce.slice(0, 4).join('<br>')
          exercice.texteCorr += '<br>' + exercice.enonce.slice(6, 11).join('<br>')
          break
        }
        case 5: {
          exercice = thales()
          exercice.texte = 'On admet que toutes les conditions sont réunies pour une configuration de Thalès.'
          exercice.texte += exercice.figure
          exercice.texte += exercice.enonce.slice(11, 13).join('<br>')
          exercice.texteCorr = exercice.enonce.slice(0, 4).join('<br>')
          exercice.texteCorr += '<br>' + exercice.enonce.slice(13, 18).join('<br>')
          break
        }
        case 6: {
          exercice = aleaThalesConfiguration()
          break
        }
        case 7: {
          const objetsEnonce = [] // on initialise le tableau des objets Mathalea2d de l'enoncé
          const objetsCorrection = [] // Idem pour la correction
          const param = aleaVariables(
            {
              O: 'randomInt(0,90)',
              A: 'randomInt(-90,90)',
              B: 'A',
              r1: 'pickRandom([1.5,2])',
              r2: 'pickRandom([1.5,2])',
              test: '70>O-A>30 and 70>O-B>30 and abs(A-B)<45'
            }
          )
          const ab = aleaVariables(
            {
              a: 'randomInt(0,3)',
              b: 'randomInt(0,3)',
              test: 'a!=b and (a!=2 or b!=0) and (a!=3 or b!=1)'
            }
          )
          if (dDebug) console.log(param)
          const O = point(0, 0)
          const anglesA = anglesSecantes(homothetie(rotation(point(1, 0), O, param.O), O, param.r1), { O: param.O, A: param.A })
          const anglesB = anglesSecantes(homothetie(rotation(point(1, 0), O, param.O + 180), O, param.r2), { O: param.O, A: param.B })
          const nomsPoints = aleaName(['A', 'B', 'C', 'D', 'E', 'F'], 2)
          anglesA.A.nom = nomsPoints[0]
          anglesB.A.nom = nomsPoints[1]
          const nomsDirections = aleaName(['s', 't', 'u', 'v', 'x', 'y'], 6)
          anglesA.S.nom = nomsDirections[0]
          anglesA.T.nom = nomsDirections[1]
          anglesA.X.nom = nomsDirections[2]
          anglesA.OX.nom = anglesB.A.nom
          anglesB.S.nom = nomsDirections[3]
          anglesB.T.nom = nomsDirections[4]
          anglesB.OX.nom = nomsDirections[5]
          anglesB.X.nom = anglesA.A.nom
          const nameAngles = ['S A X'.split(' '), 'X A T'.split(' '), 'T A OX'.split(' '), 'OX A S'.split(' ')]
          nameAngles.forEach(function (n, i) {
            anglesA[['a', 'b', 'c', 'd'][i]].nom = ''
            anglesB[['a', 'b', 'c', 'd'][i]].nom = ''
            for (let j = 0; j < 3; j++) {
              anglesA[['a', 'b', 'c', 'd'][i]].nom += anglesA[n[j]].nom
              anglesB[['a', 'b', 'c', 'd'][i]].nom += anglesB[n[j]].nom
            }
          })
          if (Math.abs(param.A) > 70) {
            anglesA.S.positionLabel = 'left'
            anglesA.T.positionLabel = 'left'
          }
          if (Math.abs(param.B) > 70) {
            anglesB.S.positionLabel = 'left'
            anglesB.T.positionLabel = 'left'
          }
          if (Math.abs(param.O) > 70) {
            anglesA.X.positionLabel = 'left'
            anglesB.OX.positionLabel = 'left'
          }
          for (const i of ['a', 'b', 'c', 'd']) {
            anglesA[i].couleurDeRemplissage = 'blue'
            anglesB[i].couleurDeRemplissage = 'blue'
          }
          const a = ['a', 'b', 'c', 'd'][parseInt(ab.a)]
          const b = ['a', 'b', 'c', 'd'][parseInt(ab.b)]
          const epsilon = 0
          anglesA.labela = texteSurArc(((param.O - param.A) % 180 + epsilon) + '°', anglesA.s, anglesA.x, param.O - param.A, 'black')
          anglesA.labelb = texteSurArc((180 - (param.O - param.A) + epsilon) % 180 + '°', anglesA.x, anglesA.t, 180 - (param.O - param.A), 'black')
          anglesA.labelc = texteSurArc((param.O - param.A + epsilon) % 180 + '°', anglesA.t, anglesA.Ox, param.O - param.A, 'black')
          anglesA.labeld = texteSurArc((180 - (param.O - param.A) + epsilon) % 180 + '°', anglesA.Ox, anglesA.s, 180 - (param.O - param.A), 'black')
          anglesB.labela = texteSurArc(((param.O - param.A) % 180) + '°', anglesB.s, anglesB.x, param.O - param.A, 'black')
          anglesB.labelb = texteSurArc((180 - (param.O - param.A)) % 180 + '°', anglesB.x, anglesB.t, 180 - (param.O - param.A), 'black')
          anglesB.labelc = texteSurArc((param.O - param.A) % 180 + '°', anglesB.t, anglesB.Ox, param.O - param.A, 'black')
          anglesB.labeld = texteSurArc((180 - (param.O - param.A)) % 180 + '°', anglesB.Ox, anglesB.s, 180 - (param.O - param.A), 'black')
          objetsEnonce.push(
            anglesA[a],
            anglesA.As,
            anglesA.Ax,
            anglesB.As,
            anglesB.Ax,
            anglesA['label' + a],
            labelPoint(anglesA.S),
            labelPoint(anglesA.T),
            labelPoint(anglesA.X),
            labelPoint(anglesB.S),
            labelPoint(anglesB.T),
            labelPoint(anglesB.OX),
            labelPoint(anglesA.A),
            labelPoint(anglesB.A)
            // anglesB['label' + b]
          )
          objetsEnonce.forEach(objet => {
            objetsCorrection.push(objet)
          })
          objetsCorrection.push(anglesB['label' + b])
          objetsCorrection.push(anglesB[b])
          let angles, calculs, mesure
          switch (a + b) {
            case 'ab':
              anglesB[a].couleurDeRemplissage = 'green'
              anglesA[a].couleurDeRemplissage = 'red'
              objetsCorrection.push(anglesB['label' + 'a'], anglesB.a)
              angles = 'correspondants'
              calculs = `$180°- ${anglesB.labela.texte}=${anglesB.labelb.texte}$`
              mesure = anglesB.labelb.texte
              break
            case 'ac':
              anglesB[a].couleurDeRemplissage = 'green'
              anglesA[a].couleurDeRemplissage = 'red'
              objetsCorrection.push(anglesB['label' + 'a'], anglesB.a)
              angles = 'correspondants'
              mesure = anglesB.labela.texte
              break
            case 'ad':
              anglesB[a].couleurDeRemplissage = 'green'
              anglesA[a].couleurDeRemplissage = 'red'
              objetsCorrection.push(anglesB['label' + 'a'], anglesB.a)
              angles = 'correspondants'
              calculs = `$180°-${anglesB.labela.texte}=${anglesB.labeld.texte}$`
              mesure = anglesB.labeld.texte
              break
            case 'ba':
              anglesB[a].couleurDeRemplissage = 'green'
              anglesA[a].couleurDeRemplissage = 'red'
              objetsCorrection.push(anglesB['label' + 'b'], anglesB.b)
              angles = 'correspondants'
              calculs = `$180°-${anglesB.labelb.texte}=${anglesB.labela.texte}$`
              mesure = anglesB.labela.texte
              break
            case 'bc':
              anglesB[a].couleurDeRemplissage = 'green'
              anglesA[a].couleurDeRemplissage = 'red'
              objetsCorrection.push(anglesB['label' + 'b'], anglesB.b)
              angles = 'correspondants'
              calculs = `$180°- ${anglesB.labelb.texte}=${anglesB.labelc.texte}$`
              mesure = anglesB.labelc.texte
              break
            case 'bd':
              anglesB[a].couleurDeRemplissage = 'green'
              anglesA[a].couleurDeRemplissage = 'red'
              objetsCorrection.push(anglesB['label' + 'b'], anglesB.b)
              angles = 'correspondants'
              mesure = anglesB.labelb.texte
              break
            case 'cb':
              anglesB.a.couleurDeRemplissage = 'green'
              anglesA[a].couleurDeRemplissage = 'red'
              objetsCorrection.push(anglesB['label' + 'a'], anglesB.a)
              angles = 'alternes-internes'
              calculs = `$180°- ${anglesB.labela.texte}=${anglesB.labelb.texte}$`
              mesure = anglesB.labelb.texte
              break
            case 'cd':
              anglesB.a.couleurDeRemplissage = 'green'
              anglesA[a].couleurDeRemplissage = 'red'
              objetsCorrection.push(anglesB['label' + 'a'], anglesB.a)
              angles = 'alternes-internes'
              calculs = `$180°-${anglesB.labela.texte}=${anglesB.labeld.texte}$`
              mesure = anglesB.labeld.texte
              break
            case 'da':
              anglesB.b.couleurDeRemplissage = 'green'
              anglesA[a].couleurDeRemplissage = 'red'
              objetsCorrection.push(anglesB['label' + 'b'], anglesB.b)
              angles = 'alternes-internes'
              calculs = `$180°- ${anglesB.labelb.texte}=${anglesB.labela.texte}$`
              mesure = anglesB.labela.texte
              break
            case 'dc':
              anglesB.b.couleurDeRemplissage = 'green'
              anglesA[a].couleurDeRemplissage = 'red'
              objetsCorrection.push(anglesB['label' + 'b'], anglesB.b)
              calculs = `$180°- ${anglesB.labelb.texte}=${anglesB.labelc.texte}$`
              angles = 'alternes-internes'
              mesure = anglesB.labelc.texte
              break
          }
          const paramsEnonce = fixeBordures([
            ...Object.keys(anglesA).map(key => { return anglesA[key] }),
            ...Object.keys(anglesB).map(key => { return anglesB[key] })
          ])
          let texte = String.raw`
          Donnée : Les droites sont parallèles.
          <br>
          En déduire la mesure de l'angle $\widehat{${anglesB[b].nom}}$.
          `
          const nomAngleSolution = angles !== 'alternes-internes' ? anglesB[a].nom : a === 'c' ? anglesB.a.nom : anglesB.b.nom
          const texteCorr = mathalea2d(Object.assign({ scale: 0.7 }, paramsEnonce), objetsCorrection) + String.raw`
          <br>
          Les angles $\widehat{${anglesA[a].nom}}$ et $\widehat{${nomAngleSolution}}$ sont ${angles} et formés par des droites parallèles.
          <br>
          Donc ils sont de même mesure.
          <br>
          ${calculs !== undefined ? calculs : String.raw`Les angles $\widehat{${anglesB[a].nom}}$ et $\widehat{${anglesB[b].nom}}$ et vert sont opposés par le sommet.<br> Ils sont donc de même mesure.`}
          <br>
          L'angle $\widehat{${anglesB[b].nom}}$ mesure donc ${mesure}.
          `
          texte += mathalea2d(Object.assign({ scale: 0.7 }, paramsEnonce), objetsEnonce)
          exercice = { texte: texte, texteCorr: texteCorr }
          break
        }
      }
      // Les lignes ci-dessous permettent d'avoir un affichage aux dimensions optimisées
      if (this.questionJamaisPosee(i, exercice.texte)) {
        this.listeQuestions.push(exercice.texte)
        this.listeCorrections.push(exercice.texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
