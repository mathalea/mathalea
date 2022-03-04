import { GVPoint, GVVector } from "./elements"
import { GVGraphicView } from "./GraphicView"
import { aleaName } from "../outilsMathjs.js"
import { cross } from "mathjs"

export class GVAleaThalesConfig extends GVGraphicView {
  classicConfig: boolean = undefined
  k: number
  AOB: boolean = false
  OAB: boolean = false
  points: GVPoint[]
  constructor (k: boolean = undefined) {
    super(-5, -5, 5, 5)
    this.create(k)         
  }

  create(k: boolean = undefined) {
    // Boucle à remplacer par quelque chose de plus efficace
    // Il faut tout simplement créer un objet configuration de Thalès en indiquant le k
    if (k !== undefined) {
      do {
        this.new()
      } while (this.classicConfig !== k)
    } else {
      this.new()
    }
  }

  new () {
    this.geometric = []
    let O: GVPoint, A: GVPoint, B: GVPoint
    if (this.AOB) {
      [O, A, B] = this.addRectPoint() // Trois points non alignés et formant un triangle OAB rectangle en O
    } else if (this.OAB) {
      [A, O, B] = this.addRectPoint() // Trois points non alignés et formant un triangle OAB rectangle en A
    } else {
      [O, A, B] = this.addNotAlignedPoint() // Trois points non alignés
    }

    // M est un point de (OA)
    const M = this.addPointAligned(O, A)[2] // C'est le troisième point de la sortie addPointAligned

    // On ajoute les droites (OB) et (AB) pour ne pas gêner le point M
    const dOB = this.addLine(O, B)
    const dAB = this.addLine(A, B)

    // Exemple d'un vecteur créé à partir de deux points
    const vO = new GVVector(O.x, O.y)
    const vA = new GVVector(A.x, A.y)
    const vB = new GVVector(B.x, B.y)
    const vM = new GVVector(M.x, M.y)
    const vOA = vA.sub(vO)
    const vOB = vB.sub(vO)
    const vOM = vM.sub(vO)

    // On détermine l'orientation de AOB pour la position des labels
    const direct = cross([vOA.x,vOA.y,0],[vOB.x,vOB.y,0])[2] > 0

    // On remplace le point M par son symétrique par rapport à O si besoin
    // Mauvaise idée !!
    // Rechercher un point qui corresponde soit par l'aléatoire soir par le barycentre bien choisi
    if (this.classicConfig !== undefined && ((this.classicConfig && vOA.dot(vOM) < 0) || (!this.classicConfig && vOA.dot(vOM) > 0))) {
      // Object.assign(M, this.addHomothetic(O, -1, M)[0])
      this.classicConfig = vOA.dot(vOM) > 0 ? true : false
    } else if (this.classicConfig === undefined) {
      this.classicConfig = vOA.dot(vOM) > 0 ? true : false
    }
    this.k = (vOA.dot(vOM) < 0 ? -1 : 1) * this.distance(O, M) / this.distance(O, A)
    // On crée une parallèle à (AB)
    const dMN = this.addParallelLine(M, dAB)[1] // C'est la seconde parallèle de addParalleleLine
    // On ajoute le point d'intersection de (OA) et (MN)
    const [N] = this.addIntersectLine(dMN, dOB) // C'est un tableau pour prévoir l'intersection de cercles par exemple
    // On commence par nommer les points et les droites
    const aleaNames = aleaName(5) // Nommage aléatoire des points
    // const aleaNames = ['O', 'A', 'B', 'M', 'N'] // Pour le debuggage
    const points = [O, A, B, M, N]
    points.forEach((x, i) => { x.name = aleaNames[i] })
    // On nomme les droites à partir des noms des points
    dAB.name = A.name + B.name // L'ordre des lettres est conservé
    dMN.aleaName(M, N) // L'ordre des lettres est aléatoirisé

    // On positionne les labels des points du mieux possible
    if (this.k<0) { // À l'extrémités des triangles
      A.labelPoints = [O, A, B]
      B.labelPoints = [O, B, A]
      M.labelPoints = [O, M, N]
      N.labelPoints = [O, N, M]
    } else if (this.k<1) { 
      // ? : http://localhost:8080/mathalea.html?ex=betaThales,s=31,s2=3,s3=1,n=1,cd=1&serie=lvxb&v=ex&z=1
      A.labelPoints = [O, A, B]
      B.labelPoints = [O, B, A]
      M.labelPoints = direct ? [O, M, A] : [A, M, O]
      N.labelPoints = direct ? [B, N, O] : [O, N, B]
    } else {
      A.labelPoints = direct ? [O, A, M] : [M, A, O]
      B.labelPoints = direct ? [N, B, O] : [O, B, N]
      M.labelPoints = [O, M, N]
      N.labelPoints = [O, N, M] 
    }
    O.labelPoints = [B, O, M]
    this.geometric = [O, A, B, M, N].map(x => {x.label = true;return x})
    this.points = [O, A, B, M, N].map(x => {x.label = true;return x})
  }

  /**
   * Set dimensions
   * @example
   * this.setDimensions(0.5) - > rectangle half height from the setting xmin, ymin and xmax
   * this.setDimensions(7,5) - > rectangle width=7 and height=5
   * this.setdimensions(0,0,7,6) - > xmin, ymin, xmax, ymax
   * @param args 
   */
  setDimensions (...args: number[]) {
    switch (args.length) {
      case 1: {
        this.ratio = args[0]
        this.ymax = this.xmax * this.ratio
        this.width = this.xmax - this.xmin
        this.height = this.ymax - this.ymin
        break
      }
      case 2:
      case 3: {
        this.width = args[0]
        this.height = args[1]
        this.xmin = 0
        this.ymin = 0
        this.xmax = this.width
        this.ymax = this.height
        this.ratio = this.height / this.width
        break
      }
      case 4: {
        this.xmin = args[0]
        this.ymin = args[1]
        this.xmax = args[2]
        this.ymax = args[3]
        this.width = this.xmax - this.xmin
        this.height = this.ymax - this.ymin
        this.ratio = this.height / this.width
        break
      }
    }
    
  }
}