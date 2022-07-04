import { point, vecteur, droite, segment, polyline, polygone } from './2d.js'
import { matrix, multiply, norm, cross, dot } from 'mathjs'
import { context } from './context.js'
const math = { matrix: matrix, multiply: multiply, norm: norm, cross: cross, dot: dot }

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% OBJET PARENT %%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/*
 * Classe parente de tous les objets de MathALEA2D
 *
 * @author Rémi Angot
 */
let numId = 0
function ObjetMathalea2D () {
  this.positionLabel = 'above'
  this.isVisible = true
  this.color = 'black'
  this.style = '' // stroke-dasharray="4 3" pour des hachures //stroke-width="2" pour un trait plus épais
  this.styleTikz = ''
  this.epaisseur = 1
  this.opacite = 1
  this.pointilles = false
  this.id = numId
  numId++
  //   mesObjets.push(this);
  context.objets2D.push(this)
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% OBJETS DE BASE %%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * LE POINT
 *
* @author Jean-Claude Lhote
* Point de l'espace défini par ses trois coordonnées (Si deux sont données seulement, le point est dans le plan XY)
* le paramètre visible définit si ce point est placé devant (par défaut) ou derrière une surface. Il sera utilisé pour définir la visibilité des arêtes qui en partent
*/
class Point3d {
  constructor (x, y, z, visible, label, positionLabel) {
    const alpha = context.anglePerspective * Math.PI / 180 // context.anglePerspective peut être changé globalement pour modifier la perspective
    const rapport = context.coeffPerspective // idem pour context.coefficientPerspective qui est la réduction sur l'axe y.
    const MT = math.matrix([[1, rapport * Math.cos(alpha), 0], [0, rapport * Math.sin(alpha), 1]]) // La matrice de projection 3d -> 2d
    this.x = x
    this.y = y
    this.z = z
    this.visible = visible
    this.label = label
    this.typeObjet = 'point3d'
    const V = math.matrix([this.x, this.y, this.z])
    const W = math.multiply(MT, V)
    this.c2d = point(W._data[0], W._data[1], this.label, positionLabel)
  }
}
export function point3d (x, y, z = 0, visible = true, label = '', positionLabel = 'above left') {
  return new Point3d(x, y, z, visible, label, positionLabel)
}

/**
   * LE VECTEUR
   *
   * @author Jean-Claude Lhote
   * le vecteur3d est sans doute l'objet le plus important de cette base d'objets
   * On les utilise dans tous les objets complexes et dans toutes les transformations
   * Ils servent notament à définir la direction des plans.
   *
   * 3 usages : vecteur3d(A,B) ou vecteur3d(x,y,z) ou vecteur3d(math.matrix([x,y,z]))
   * A et B sont deux objets de type Point3d
   * x,y et z sont trois nombres
   * la commande math.matrix([x,y,z]) crée une matrice colonne.
   *
   * L'objet créé est de type Vecteur3d
   * sa propriété p2d est un objet Vecteur (2 dimensions : c'est la projection du vecteur)
   * sa propriété this.representant(A) est le dessin du représentant d'origine A.
   * exemples :
   * let v = vecteur3d(3,5,1) -> définit un vecteur de composantes (3;5;1)
   * let w = vecteur(point3d(0,0,0),point3d(1,1,1)) -> définit un vecteur d'origine O et d'extrémité M(1;1;1)
   * let fleche = w.representant(point3d(5,0,0)) -> fleche est un objet 2d qui représente le vecteur w au point (5;0;0)
   */
class Vecteur3d {
  constructor (...args) {
    const alpha = context.anglePerspective * Math.PI / 180
    const rapport = context.coeffPerspective
    const MT = math.matrix([[1, rapport * Math.cos(alpha), 0], [0, rapport * Math.sin(alpha), 1]]) // ceci est la matrice de projection 3d -> 2d
    if (args.length === 2) {
      this.x = args[1].x - args[0].x
      this.y = args[1].y - args[0].y
      this.z = args[1].z - args[0].z
    } else {
      if (typeof (args[0]) === 'number') {
        this.x = args[0]
        this.y = args[1]
        this.z = args[2]
      } else if (args.length === 1) {
        this.x = args[0]._data[0]
        this.y = args[0]._data[1]
        this.z = args[0]._data[2]
      }
    }
    this.matrice = math.matrix([this.x, this.y, this.z]) // On exporte cette matrice colonne utile pour les calculs vectoriels qui seront effectués par math.js
    this.norme = Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2) // la norme du vecteur
    const W = math.multiply(MT, this.matrice) // voilà comment on obtient les composantes du projeté 2d du vecteur
    this.c2d = vecteur(W._data[0], W._data[1]) // this.c2d est l'objet 2d qui représente l'objet 3d this
    this.representant = function (A) { // méthode pour construire un représentant d'origine A (un point 3d)
      const B = translation3d(A, this)
      return vecteur(A.c2d, B.c2d).representant(A.c2d) // qui retourne un représentant de vecteur 2d (objet dessiné)
    }
  }
}

export function vecteur3d (...args) { // A,B deux Point3d ou x,y,z les composantes du vecteur
  return new Vecteur3d(...args)
}

/**
   * L'ARETE
   * @author Jean-Claude lhote
   * Une telle arête est définie par deux points
   * Si l'un des deux points n'est pas visible (propriété visible à false) alors l'arête aura aussi visible à false
   * sa propriété p2d est un segment en pointillé ou en trait plein suivant sa visibilité.
   */
class Arete3d {
  constructor (point1, point2, color, visible) {
    this.extremite1 = point1
    this.extremite2 = point2
    this.color = color
    if (!point1.visible || !point2.visible || !visible) {
      this.visible = false
    } else {
      this.visible = true
    }
    this.c2d = segment(point1.c2d, point2.c2d, color)
    if (!this.visible) {
      this.c2d.pointilles = 2
    } else {
      this.c2d.pointilles = false
    }
  }
}
// l'arête est visible par défaut sauf si p1 ou p2 sont invisibles
export function arete3d (p1, p2, color = 'black', visible = true) {
  return new Arete3d(p1, p2, color, visible)
}

/**
   * LA DROITE
   *
   * @author Jean-claude Lhote
   * Droite de l'espace définie par point et vecteur directeur droite3d(A,v)
   * Droite de l'espace définie par 2 points droite3d(A,B)
   * Les droites servent principalement à définir des axes de rotation dans l'espace
   */
class Droite3d {
  constructor (point3D, vecteur3D) {
    if (vecteur3D.constructor === Vecteur3d) {
      this.directeur = vecteur3D
    } else if (vecteur3D.constructor === Point3d) {
      this.directeur = vecteur3d(point3D, vecteur3D)
    }
    this.origine = point3D
    const M = translation3d(this.origine, this.directeur)
    this.point = M
    this.c2d = droite(this.origine.c2d, M.c2d) // la droite correspndant à la projection de cette droite dans le plan Mathalea2d
    this.c2d.isVisible = false
  }
}

export function droite3d (point3D, vecteur3D) {
  return new Droite3d(point3D, vecteur3D)
}

/**
 * LE DEMI-CERCLE
 *
 *@author Jean-Claude Lhote
 * Le nom est trompeur, il s'agit le plus souvent d'une demi-ellipse représentant un cercle projeté
 * Utilisé pour représenter un cercle dont une moitié est visible mais pas l'autre.
 *
 * normal et rayon sont deux vecteurs 3d
 * normal est un vecteur normal au plan du cercle
 * rayon est le vecteur qui part du centre et qui joint la 1ere extremité visible.
 * cote est soit 'caché' soit 'visible' et déterminera dans quel sens on crée le demi-cercle.
 * Si cote='caché' alors on tourne dans le sens direct et le tracé est en pointillés
 * Si cote='visible' alors on tourne dans le sens indirect et le tracé est plein.
 *
 */
export function demicercle3d (centre, normal, rayon, cote, color, angledepart = context.anglePerspective) {
  let signe; const M = []; const listepoints = []
  if (cote === 'caché') {
    signe = 1
  } else {
    signe = -1
  }
  const d = droite3d(centre, normal)
  M.push(rotation3d(translation3d(centre, rayon), d, angledepart))
  listepoints.push(M[0].c2d)

  for (let i = 1; i < 19; i++) {
    M.push(rotation3d(M[i - 1], d, 10 * signe))
    listepoints.push(M[i].c2d)
  }
  const demiCercle = polyline(listepoints, color)
  if (cote === 'caché') {
    demiCercle.pointilles = 2
    demiCercle.opacite = 0.3
  }
  return demiCercle
}

/**
    * LE CERCLE
    *
    * @author Jean-Claude Lhote
    *
    * C'est la version entière du cercle : soit totalement visible, soit totalement caché.
    * visible est un booléen
    *
    */
export function cercle3d (centre, normal, rayon, visible = true, color = 'black') {
  const M = []; const listepoints = []
  const d = droite3d(centre, normal)
  M.push(rotation3d(translation3d(centre, rayon), d, context.anglePerspective))
  listepoints.push(M[0].c2d)
  for (let i = 1; i < 37; i++) {
    M.push(rotation3d(M[i - 1], d, 10))
    listepoints.push(M[i].c2d)
  }
  const C = polygone(listepoints, color)
  if (!visible) {
    C.pointilles = 2
  }
  return C
}

/**
   * LE POLYGONE
   *
   * @author Jean-Claude Lhote
   * usages : polygone3d([A,B,C,...],color) ou polygone3d(A,B,C...) où A,B,C ... sont des point3d. color='black' par défaut.
   */
class Polygone3d {
  constructor (...args) {
    if (Array.isArray(args[0])) {
      // Si le premier argument est un tableau
      this.listePoints = args[0]
      if (args[1]) {
        this.color = args[1]
      }
    } else {
      this.listePoints = args
      this.color = 'black'
    }
    const segments3d = []; let A; const segments = []
    A = this.listePoints[0]
    for (let i = 1; i < this.listePoints.length; i++) {
      segments3d.push(arete3d(A, this.listePoints[i], this.color))
      segments.push(segments3d[i - 1].c2d)
      A = this.listePoints[i]
    }
    segments3d.push(arete3d(A, this.listePoints[0], this.color))
    segments.push(segments3d[this.listePoints.length - 1].c2d)
    this.aretes = segments3d
    this.c2d = segments
  }
}

export function polygone3d (...args) {
  return new Polygone3d(...args)
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% OBJETS DE COMPLEXES %%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
   * LA SPHERE
   *
   * @author Jean-Claude Lhote
   * Produit une sphère : choisir un nombre de parallèles impair pour avoir l'équateur. normal défini l'axe Nord-Sud.
   * rayon est le rayon de la sphère. l'équateur est dans le plan xy l'axe Nord-Sud est sur z
   * @param {Point3d} centre
   * @param {Number} rayon
   * @param {Number} nbParalleles
   * @param {Number} nbMeridiens
   * @param {string} color
   */
function Sphere3d (centre, rayon, nbParalleles, nbMeridiens, color) {
  ObjetMathalea2D.call(this)
  this.centre = centre
  this.rayon = vecteur3d(rayon, 0, 0)
  this.normal = vecteur3d(0, 0, 1)
  this.color = color
  this.nbMeridiens = nbMeridiens
  this.nbParalleles = nbParalleles
  this.c2d = []; let c1; let c2; let c3; let c4; let C; let D
  const prodvec = vecteur3d(math.cross(this.normal.matrice, this.rayon.matrice))
  const rayon2 = vecteur3d(math.cross(this.rayon.matrice, math.multiply(prodvec.matrice, 1 / math.norm(prodvec.matrice))))
  const R = rayon
  const cote1 = 'caché'
  const cote2 = 'visible'
  for (let k = 0, rayon3; k < 1; k += 1 / (this.nbParalleles + 1)) {
    C = point3d(centre.x, centre.y, centre.z + R * Math.sin(k * Math.PI / 2))
    D = point3d(centre.x, centre.y, centre.z + R * Math.sin(-k * Math.PI / 2))
    rayon3 = vecteur3d(R * Math.cos(k * Math.PI / 2), 0, 0)
    c1 = demicercle3d(C, this.normal, rayon3, cote1, this.color, context.anglePerspective)
    c2 = demicercle3d(C, this.normal, rayon3, cote2, this.color, context.anglePerspective)
    c3 = demicercle3d(D, this.normal, rayon3, cote1, this.color, context.anglePerspective)
    c4 = demicercle3d(D, this.normal, rayon3, cote2, this.color, context.anglePerspective)
    this.c2d.push(c1, c2, c3, c4)
  }
  for (let k = 0, V; k < 181; k += 90 / this.nbMeridiens) {
    V = rotationV3d(prodvec, this.normal, context.anglePerspective + k)
    c1 = demicercle3d(this.centre, V, rayon2, cote2, this.color, 0)
    c2 = demicercle3d(this.centre, V, rayon2, cote1, this.color, 0)
    this.c2d.push(c1, c2)
  }
}
export function sphere3d (centre, rayon, nbParalleles, nbMeridiens, color = 'black') {
  return new Sphere3d(centre, rayon, nbParalleles, nbMeridiens, color)
}

/**
    * LE CONE
    *
    * @author Jean-Claude Lhote
    *
    * centrebase est le centre du disque de base
    * sommet est le sommet du cône
    * normal est un vecteur 3d normal au plan du disque (il détermine avec rayon de quel côté se trouve la partie visible)
    *
    */
function Cone3d (centrebase, sommet, normal, rayon, generatrices = 18) {
  ObjetMathalea2D.call(this)
  this.sommet = sommet
  this.centrebase = centrebase
  this.normal = normal
  this.rayon = vecteur3d(rayon, 0, 0)
  this.c2d = []
  let s, color1, color2
  const prodvec = vecteur3d(math.cross(normal.matrice, this.rayon.matrice))
  const prodscal = math.dot(prodvec.matrice, vecteur3d(0, 1, 0).matrice)
  let cote1, cote2
  if (prodscal > 0) {
    cote1 = 'caché'
    color1 = 'gray'
    cote2 = 'visible'
    color2 = 'black'
  } else {
    cote2 = 'caché'
    cote1 = 'visible'
    color1 = 'black'
    color2 = 'gray'
  }
  const c1 = demicercle3d(this.centrebase, this.normal, this.rayon, cote1, color1)
  const c2 = demicercle3d(this.centrebase, this.normal, this.rayon, cote2, color2)

  for (let i = 0; i < c1.listePoints.length; i++) {
    if (i % generatrices === 0) {
      s = segment(this.sommet.c2d, c1.listePoints[i])
      if (cote1 === 'caché') {
        s.pointilles = 2
        s.color = 'gray'
      } else {
        s.color = 'black'
      }
      this.c2d.push(s)
    }
  }
  for (let i = 0; i < c2.listePoints.length; i++) {
    if (i % generatrices === 0) {
      s = segment(this.sommet.c2d, c2.listePoints[i])
      if (cote2 === 'caché') {
        s.pointilles = 2
        s.color = 'gray'
      } else {
        s.color = 'black'
      }
      this.c2d.push(s)
    }
  }
  this.c2d.push(c1, c2)
}
export function cone3d (centre, sommet, normal, rayon, generatrices = 18) {
  return new Cone3d(centre, sommet, normal, rayon, generatrices)
}

/**
   * LE CYLINDRE
   *
   * @author Jean-Claude Lhote
   * Crée un cylindre de révolution définit par les centres de ses 2 bases
   * Permet en faisant varier les rayons des deux bases de créer des troncs de cônes
   * @param {Point3d} centrebase1
   * @param {Point3d} centrebase2
   * @param {Vecteur3d} normal
   * @param {Vecteur3d} rayon1
   * @param {Vecteur3d} rayon2
   */
function Cylindre3d (centrebase1, centrebase2, normal, rayon1, rayon2, color) {
  ObjetMathalea2D.call(this)
  this.centrebase1 = centrebase1
  this.centrebase2 = centrebase2
  this.normal = normal
  this.rayon1 = rayon1
  this.rayon2 = rayon2
  this.color = color
  this.c2d = []
  let s, color1, color2
  const prodvec = vecteur3d(math.cross(this.normal.matrice, this.rayon1.matrice))
  const prodscal = math.dot(prodvec.matrice, vecteur3d(0, 1, 0).matrice)
  let cote1, cote2
  if (prodscal > 0) {
    cote1 = 'caché'
    color1 = this.color
    cote2 = 'visible'
    color2 = this.color
  } else {
    cote2 = 'caché'
    cote1 = 'visible'
    color1 = this.color
    color2 = this.color
  }
  const c1 = demicercle3d(this.centrebase1, this.normal, this.rayon1, cote1, color1)
  const c3 = demicercle3d(this.centrebase2, this.normal, this.rayon2, cote1, color1)
  const c2 = demicercle3d(this.centrebase1, this.normal, this.rayon1, cote2, color2)
  const c4 = demicercle3d(this.centrebase2, this.normal, this.rayon2, cote2, color2)
  c3.pointilles = false
  c3.color = this.color
  for (let i = 0; i < c1.listePoints.length; i += 2) {
    s = segment(c3.listePoints[i], c1.listePoints[i])
    if (cote1 === 'caché') {
      s.pointilles = 2
      s.color = this.color
      s.opacite = 0.3
    } else {
      s.color = this.color
    }
    this.c2d.push(s)
  }
  for (let i = 0; i < c2.listePoints.length; i += 2) {
    s = segment(c4.listePoints[i], c2.listePoints[i])
    if (cote2 === 'caché') {
      s.pointilles = 2
      s.color = this.color
      s.opacite = 0.3
    } else {
      s.color = this.color
    }
    this.c2d.push(s)
  }
  this.c2d.push(c1, c2, c3, c4)
}
export function cylindre3d (centrebase1, centrebase2, normal, rayon, rayon2, color = 'black') {
  return new Cylindre3d(centrebase1, centrebase2, normal, rayon, rayon2, color)
}

/**
   * LE PRISME
   *
   * @author Jean-Claude Lhote
   * Crée un prisme à partir du base Polygone3d et d'un vecteur3d d'extrusion (on peut faire des prismes droits ou non droits)
   */
class Prisme3d {
  constructor (base, vecteur, color) {
    ObjetMathalea2D.call(this)

    this.color = color
    base.color = color
    this.base1 = base
    this.base2 = translation3d(base, vecteur)
    this.base2.color = this.base1.color
    this.aretes = []
    this.c2d = []; let s
    for (let i = 0; i < this.base1.listePoints.length; i++) {
      this.c2d.push(this.base1.c2d[i])
    }
    for (let i = 0; i < this.base2.listePoints.length; i++) {
      this.c2d.push(this.base2.c2d[i])
    }
    for (let i = 0; i < this.base1.listePoints.length; i++) {
      s = arete3d(this.base1.listePoints[i], this.base2.listePoints[i], this.color)
      this.c2d.push(s.c2d)
    }
  }
}

export function prisme3d (base, vecteur, color = 'black') {
  return new Prisme3d(base, vecteur, color)
}
/**
   * La pyramide
   *
   * @author Jean-Claude Lhote
   * Crée une pyramide à partir d'une base Polygone3d et d'un sommet
   */
class Pyramide3d {
  constructor (base, sommet, color) {
    ObjetMathalea2D.call(this)

    this.color = color
    base.color = color
    this.base = base
    this.aretes = []
    this.sommet = sommet
    this.c2d = []; let s
    for (let i = 0; i < this.base.listePoints.length; i++) {
      s = this.base.c2d[i]
      if (this.base.listePoints[i].visible) {
        s.pointilles = false
      } else {
        s.pointilles = 2
      }
      this.c2d.push(s)
    }
    for (let i = 0; i < this.base.listePoints.length; i++) {
      s = arete3d(this.base.listePoints[i], this.sommet, this.color, true)
      if (this.base.listePoints[i].visible) {
        s.c2d.pointilles = false
      } else {
        s.c2d.pointilles = 2
      }
      this.c2d.push(s.c2d)
    }
  }
}

export function pyramide3d (base, vecteur, color = 'black') {
  return new Pyramide3d(base, vecteur, color)
}

/**
   * La pyramide tronquée
   *
   * @author Jean-Claude Lhote
   * Crée une pyramide à partir d'une base Polygone3d d'un sommet et d'un coefficient compris entre 0 et 1
   * un coefficient de 0.5 coupera la pyramide à mi-hauteur (valeur par défaut).
   */
class PyramideTronquee3d {
  constructor (base, sommet, coeff = 0.5, color = 'black') {
    ObjetMathalea2D.call(this)

    this.color = color
    base.color = color
    this.base = base
    this.coeff = coeff
    this.aretes = []
    this.sommet = sommet
    this.c2d = []
    const sommetsBase2 = []
    for (let i = 0, pointSection; i < this.base.listePoints.length; i++) {
      pointSection = homothetie3d(sommet, base.listePoints[i], coeff)
      pointSection.visible = true
      sommetsBase2.push(pointSection)
    }
    this.base2 = polygone3d(...sommetsBase2)
    this.c2d.push(...this.base.c2d)
    for (let i = 0; i < base.listePoints.length; i++) {
      this.aretes.push(arete3d(base.listePoints[i], this.base2.listePoints[i], color, base.listePoints[i].visible))
      this.c2d.push(this.aretes[i].c2d)
    }
    this.c2d.push(...this.base2.c2d)
  }
}
export function pyramideTronquee3d (base, sommet, coeff = 0.5, color = 'black') {
  return new PyramideTronquee3d(base, sommet, coeff, color)
}
/**
   * LE cube
   * @author Jean-Claude Lhote
   * usage : cube(x,y,z,c,color) construit le cube d'arète c dont le sommet en bas à gauche a les coordonnées x,y,z.
   * le face avant est dans le plan xz
   *
*/
class Cube3d {
  constructor (x, y, z, c, color = 'black') {
    ObjetMathalea2D.call(this)
    const A = point3d(x, y, z)
    const vx = vecteur3d(c, 0, 0)
    const vy = vecteur3d(0, c, 0)
    const vz = vecteur3d(0, 0, c)
    const B = translation3d(A, vx)
    const C = translation3d(B, vz)
    const D = translation3d(A, vz)
    const E = translation3d(A, vy)
    const F = translation3d(E, vx)
    const G = translation3d(F, vz)
    const H = translation3d(D, vy)
    const faceAV = polygone([A.c2d, B.c2d, C.c2d, D.c2d], color)
    const faceDr = polygone([B.c2d, F.c2d, G.c2d, C.c2d], color)
    const faceTOP = polygone([D.c2d, C.c2d, G.c2d, H.c2d], color)
    faceAV.couleurDeRemplissage = 'lightgray'
    faceTOP.couleurDeRemplissage = 'white'
    faceDr.couleurDeRemplissage = 'darkgray'
    this.c2d = [faceAV, faceDr, faceTOP]
  }
}
export function cube3d (x, y, z, c) {
  return new Cube3d(x, y, z, c)
}
/**
 * @author Jean-Claude Lhote
 * Créer une barre de l cubes de c de côté à partir du point (x,y,z)
 * La barre est positionnée suivant l'axe x
 */
class Barre3d {
  constructor (x, y, z, c, l, color = 'black') {
    ObjetMathalea2D.call(this)
    let B, C, D, E, F, G, H, faceAv, faceTop
    this.c2d = []
    const vx = vecteur3d(c, 0, 0)
    const vy = vecteur3d(0, c, 0)
    const vz = vecteur3d(0, 0, c)
    let A = point3d(x, y, z)

    for (let i = 0; i < l; i++) {
      B = translation3d(A, vx)
      C = translation3d(B, vz)
      D = translation3d(A, vz)
      E = translation3d(A, vy)
      F = translation3d(E, vx)
      G = translation3d(F, vz)
      H = translation3d(D, vy)
      faceAv = polygone([A.c2d, B.c2d, C.c2d, D.c2d], color)
      faceTop = polygone([D.c2d, C.c2d, G.c2d, H.c2d], color)
      faceAv.couleurDeRemplissage = 'lightgray'
      faceTop.couleurDeRemplissage = 'white'
      this.c2d.push(faceAv, faceTop)
      A = translation3d(A, vx)
    }
    const faceD = polygone([B.c2d, F.c2d, G.c2d, C.c2d], color)
    faceD.couleurDeRemplissage = 'darkgray'
    this.c2d.push(faceD)
  }
}

export function barre3d (x, y, z, c, l, color = 'black') {
  return new Barre3d(x, y, z, c, l, color)
}

/**
 * @author Jean-Claude Lhote
 * Crée une plaque de cubes de côtés c de dimensions l suivant x et p suivant y
 */
class Plaque3d {
  constructor (x, y, z, c, l, p, color = 'black') {
    ObjetMathalea2D.call(this)
    let A, B, C, D, F, G, H, faceAv, faceTop, faceD
    this.c2d = []
    const vx = vecteur3d(c, 0, 0)
    const vy = vecteur3d(0, c, 0)
    const vz = vecteur3d(0, 0, c)

    for (let i = 0; i < l; i++) {
      for (let j = 0; j < p; j++) {
        A = point3d(x + i * c, y + j * c, z)
        B = translation3d(A, vx)
        C = translation3d(B, vz)
        D = translation3d(A, vz)
        F = translation3d(B, vy)
        G = translation3d(F, vz)
        H = translation3d(D, vy)
        if (j === 0) {
          faceAv = polygone([A.c2d, B.c2d, C.c2d, D.c2d], color)
          faceAv.couleurDeRemplissage = 'lightgray'
          this.c2d.push(faceAv)
        }
        if (i === l - 1) {
          faceD = polygone([B.c2d, F.c2d, G.c2d, C.c2d], color)
          faceD.couleurDeRemplissage = 'darkgray'
          this.c2d.push(faceD)
        }
        faceTop = polygone([D.c2d, C.c2d, G.c2d, H.c2d], color)
        faceTop.couleurDeRemplissage = 'white'
        this.c2d.push(faceTop)
      }
    }
  }
}

export function plaque3d (x, y, z, c, l, p, color = 'black') {
  return new Plaque3d(x, y, z, c, l, p, color)
}

class PaveLPH3d {
  constructor (x, y, z, c, l, p, h, color = 'black') {
    ObjetMathalea2D.call(this)
    let A, B, C, D, F, G, H, faceAv, faceTop, faceD
    this.c2d = []
    const vx = vecteur3d(c, 0, 0)
    const vy = vecteur3d(0, c, 0)
    const vz = vecteur3d(0, 0, c)

    for (let i = 0; i < l; i++) {
      for (let j = 0; j < p; j++) {
        for (let k = 0; k < h; k++) {
          A = point3d(x + i * c, y + j * c, z + k * c)
          B = translation3d(A, vx)
          C = translation3d(B, vz)
          D = translation3d(A, vz)
          F = translation3d(B, vy)
          G = translation3d(F, vz)
          H = translation3d(D, vy)
          if (j === 0) {
            faceAv = polygone([A.c2d, B.c2d, C.c2d, D.c2d], color)
            faceAv.couleurDeRemplissage = 'lightgray'
            this.c2d.push(faceAv)
          }
          if (i === l - 1) {
            faceD = polygone([B.c2d, F.c2d, G.c2d, C.c2d], color)
            faceD.couleurDeRemplissage = 'darkgray'
            this.c2d.push(faceD)
          }
          if (k === h - 1) {
            faceTop = polygone([D.c2d, C.c2d, G.c2d, H.c2d], color)
            faceTop.couleurDeRemplissage = 'white'
            this.c2d.push(faceTop)
          }
        }
      }
    }
  }
}
/**
 *
 * @param {number} x coordonnées du sommet en bas à gauche
 * @param {number} y
 * @param {number} z
 * @param {number} c longueur de l'unité
 * @param {number} p profondeur
 * @param {number} l longueur
 * @param {number} h hauteur
 * @param {*} color couleur
 * @returns {object}
 */
export function paveLPH3d (x, y, z, c, l, p, h, color = 'black') {
  return new PaveLPH3d(x, y, z, c, l, p, h, color)
}

/**
 * @author Erwan Duplessis et Jean-Claude Lhote
 * Attention !
 * Cette Classe définit un objet cube dans une représentation en perspective axonométrique paramétrée par alpha et beta
 * et non pas context.anglePerspective (contrairement à l'objet cube3d ci-dessus ou l'objet pave3d ci-dessous)
 * Il ne s'agit pas à proprement parler d'un objet 3d, c'est un objet 2d avec sa méthode svg() et sa méthode tikz()
 * Utilisée par exemple dans 6G43
 */
class Cube {
  constructor (x, y, z, alpha, beta, colorD, colorT, colorG) {
    ObjetMathalea2D.call(this)
    this.x = x
    this.y = y
    this.z = z
    this.alpha = alpha
    this.beta = beta
    this.colorD = colorD
    this.colorG = colorG
    this.colorT = colorT

    this.lstPoints = []
    this.lstPolygone = []
    function proj (x, y, z, alpha, beta) {
      const cosa = Math.cos(alpha * Math.PI / 180)
      const sina = Math.sin(alpha * Math.PI / 180)
      const cosb = Math.cos(beta * Math.PI / 180)
      const sinb = Math.sin(beta * Math.PI / 180)
      return point(cosa * x - sina * y, -sina * sinb * x - cosa * sinb * y + cosb * z)
    }

    this.lstPoints.push(proj(this.x, this.y, this.z, this.alpha, this.beta)) // point 0 en bas
    this.lstPoints.push(proj(this.x + 1, this.y, this.z, this.alpha, this.beta)) // point 1
    this.lstPoints.push(proj(this.x + 1, this.y, this.z + 1, this.alpha, this.beta)) // point 2
    this.lstPoints.push(proj(this.x, this.y, this.z + 1, this.alpha, this.beta)) // point 3
    this.lstPoints.push(proj(this.x + 1, this.y + 1, this.z + 1, this.alpha, this.beta)) // point 4
    this.lstPoints.push(proj(this.x, this.y + 1, this.z + 1, this.alpha, this.beta)) // point 5
    this.lstPoints.push(proj(this.x, this.y + 1, this.z, this.alpha, this.beta)) // point 6
    let p
    p = polygone([this.lstPoints[0], this.lstPoints[1], this.lstPoints[2], this.lstPoints[3]], 'black')
    p.opaciteDeRemplissage = 1
    p.couleurDeRemplissage = this.colorD
    this.lstPolygone.push(p)
    p = polygone([this.lstPoints[2], this.lstPoints[4], this.lstPoints[5], this.lstPoints[3]], 'black')
    p.couleurDeRemplissage = this.colorG
    p.opaciteDeRemplissage = 1
    this.lstPolygone.push(p)
    p = polygone([this.lstPoints[3], this.lstPoints[5], this.lstPoints[6], this.lstPoints[0]], 'black')
    p.couleurDeRemplissage = this.colorT
    p.opaciteDeRemplissage = 1
    this.lstPolygone.push(p)
    this.c2d = this.lstPolygone
  }
}
export function cube (x = 0, y = 0, z = 0, alpha = 45, beta = -35, { colorD = 'green', colorT = 'white', colorG = 'gray' } = {}) {
  return new Cube(x, y, z, alpha, beta, colorD, colorG, colorT)
}
/**
   * LE PAVE
   * @author Jean-Claude Lhote
   * usage : pave(A,B,D,E) construit le pavé ABCDEFGH dont les arêtes [AB],[AD] et [AE] sont délimitent 3 faces adjacentes.
   *
*/
class Pave3d {
  constructor (A, B, D, E, color) {
    ObjetMathalea2D.call(this)
    const v1 = vecteur3d(A, B)
    const v2 = vecteur3d(A, E)
    const v3 = vecteur3d(A, D)
    const C = translation3d(D, v1)
    const H = translation3d(D, v2)
    const G = translation3d(C, v2)
    const F = translation3d(B, v2)
    E.visible = false
    this.color = color
    this.base = polygone3d([A, B, F, E])
    this.hauteur = v3
    this.c2d = []
    this.aretes = [arete3d(A, B, color), arete3d(A, D, color), arete3d(A, E, color), arete3d(C, B, color), arete3d(F, B, color), arete3d(C, D, color), arete3d(C, G, color), arete3d(F, G, color), arete3d(F, E, color), arete3d(H, G, color), arete3d(H, E, color), arete3d(H, D, color)]
    for (const arete of this.aretes) {
      this.c2d.push(arete.c2d)
    }
  }
}

export function pave3d (A, B, C, E, color = 'black') {
  return new Pave3d(A, B, C, E, color)
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% TRANSFORMATIONS%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
   * LA ROTATION VECTORIELLE
   *
   * @author Jean-Claude Lhote
   * Cette rotation se distingue de la rotation d'axe (d) par le fait qu'on tourne autour d'une droite vectorielle
   * Elle sert à faire tourner des vecteurs essentiellement.
   * Si on l'utilise sur un point, alors il tournera autour d'une droite passant par l'origine.
   *
   * @param {*} point3D pour l'instant, cette fonction ne fait tourner qu'un point3d ou un vecteur3d
   * @param {*} vecteur3D vecteur directeur de l'axe de rotation (l'axe passe par l'origine, pour tourner autour d'une droite particulière on utilise rotation3d())
   * @param {*} angle Angle de rotation
   */
export function rotationV3d (point3D, vecteur3D, angle) { // point = ce qu'on fait tourner (Point3d) ; vecteur = directeur de l'axe de rotation [x,y,z] et angle de rotation en degrés
  let V, p2
  const norme = math.norm(vecteur3D.matrice)
  const unitaire = math.multiply(vecteur3D.matrice, 1 / norme)
  const u = unitaire._data[0]; const v = unitaire._data[1]; const w = unitaire._data[2]
  const c = Math.cos(angle * Math.PI / 180); const s = Math.sin(angle * Math.PI / 180)
  const k = 1 - c
  const matrice = math.matrix([[u * u * k + c, u * v * k - w * s, u * w * k + v * s], [u * v * k + w * s, v * v * k + c, v * w * k - u * s], [u * w * k - v * s, v * w * k + u * s, w * w * k + c]])
  if (point3D.constructor === Point3d) {
    V = math.matrix([point3D.x, point3D.y, point3D.z])
    p2 = math.multiply(matrice, V)
    return point3d(p2._data[0], p2._data[1], p2._data[2])
  } else if (point3D.constructor === Vecteur3d) {
    V = point3D
    p2 = math.multiply(matrice, V.matrice)
    return vecteur3d(p2._data[0], p2._data[1], p2._data[2])
  }
}

/**
   * LA ROTATION D'AXE UNE DROITE
   *
   * @author Jean-Claude Lhote
   *
   * @param {Point3d} point3D Pour l'instant on ne fait tourner qu'un point3d
   * Remarque : ça n'a aucun sens de faire tourner un vecteur autour d'une droite particulière, on utilise la rotation vectorielle pour ça.
   * @param {Droite3d} droite3D Axe de rotation
   * @param {Number} angle Angle de rotation
   * @param {string} color couleur du polygone créé. si non précisé la couleur sera celle du polygone argument
   */
export function rotation3d (point3D, droite3D, angle, color) {
  const directeur = droite3D.directeur
  const origine = droite3D.origine
  const p = []
  if (point3D.constructor === Point3d) {
    const V = vecteur3d(origine, point3d(0, 0, 0))
    const W = vecteur3d(point3d(0, 0, 0), origine)
    const M = translation3d(point3D, V)
    const N = rotationV3d(M, directeur, angle)
    return translation3d(N, W)
  } else if (point3D.constructor === Vecteur3d) {
    return rotationV3d(point3D, directeur, angle)
  } else if (point3D.constructor === Polygone3d) {
    for (let i = 0; i < point3D.listePoints.length; i++) {
      p.push(rotation3d(point3D.listePoints[i], droite3D, angle))
    }
    if (typeof (color) !== 'undefined') {
      return polygone3d(p, color)
    } else { return polygone3d(p, point3D.color) }
  }
}

/**
 * @author Jean-Claude Lhote
 * Crée une flèche en arc de cercle pour montrer un sens de rotation autour d'un axe 3d
 * cette flèche est dessinée dans le plan orthogonal à l'axe qui passe par l'origine de l'axe
 * le rayon est ici un vecteur 3d qui permet de fixer le point de départ de la flèche par translation de l'origine de l'axe
 * l'angle définit l'arc formé par la flèche
 * son sens est définit par le vecteur directeur de l'axe (changer le signe de chaque composante de ce vecteur pour changer le sens de rotation)
 */
function SensDeRotation3d (axe, rayon, angle, epaisseur, color) {
  ObjetMathalea2D.call(this)
  this.epaisseur = epaisseur
  this.color = color
  this.c2d = []
  let M; let N; let s
  M = translation3d(axe.origine, rayon)
  for (let i = 0; i < angle; i += 5) {
    N = rotation3d(M, axe, 5)
    s = segment(M.c2d, N.c2d)
    s.color = this.color
    s.epaisseur = this.epaisseur
    this.c2d.push(s)
    M = N
  }
  N = rotation3d(M, axe, 5)
  s = segment(M.c2d, N.c2d)
  s.color = this.color
  s.epaisseur = this.epaisseur
  this.c2d.push(s)
  const d = droite3d(N, axe.directeur)
  const A = rotation3d(M, d, 30)
  const B = rotation3d(M, d, -30)
  s = segment(N.c2d, A.c2d)
  s.color = this.color
  s.epaisseur = this.epaisseur
  this.c2d.push(s)
  s = segment(N.c2d, B.c2d)
  s.color = this.color
  s.epaisseur = this.epaisseur
  this.c2d.push(s)
}
export function sensDeRotation3d (axe, rayon, angle, epaisseur, color) {
  return new SensDeRotation3d(axe, rayon, angle, epaisseur, color)
}

/**
   * LA TRANSLATION
   *
   * @author Jean-Claude Lhote
   * @param {Point3d} point3D Pour l'instant on ne translate qu'un point3d ou un polygone3d
   * @param {Vecteur3d} vecteur3D
   */
export function translation3d (point3D, vecteur3D) {
  if (point3D.constructor === Point3d) {
    const x = point3D.x + vecteur3D.x
    const y = point3D.y + vecteur3D.y
    const z = point3D.z + vecteur3D.z
    return point3d(x, y, z)
  } else if (point3D.constructor === Polygone3d) {
    const p = []
    for (let i = 0; i < point3D.listePoints.length; i++) {
      p.push(translation3d(point3D.listePoints[i], vecteur3D))
    }
    return polygone3d(p, point3D.color)
  }
}

/**
 * L'homothetie
 * @author Jean-Claude Lhote
 * La même chose qu'ne 2d, mais en 3d...
 * Pour les points3d les polygones ou les vecteurs (multiplication scalaire par rapport)
 */
export function homothetie3d (point3D, centre, rapport, color) {
  let V
  const p = []
  if (point3D.constructor === Point3d) {
    V = vecteur3d(centre, point3D)
    V.x *= rapport
    V.y *= rapport
    V.z *= rapport
    return translation3d(centre, V)
  } else if (point3D.constructor === Vecteur3d) {
    V = vecteur3d(point3D.x, point3D.y, point3D.z)
    V.x *= rapport
    V.y *= rapport
    V.z *= rapport
    return V
  } else if (point3D.constructor === Polygone3d) {
    for (let i = 0; i < point3D.listePoints.length; i++) {
      p.push(homothetie3d(point3D.listePoints[i], centre, rapport, color))
    }
    if (typeof (color) !== 'undefined') {
      return polygone3d(p, color)
    } else { return polygone3d(p, point3D.color) }
  }
}
export class CodageAngleDroit3D extends ObjetMathalea2D {
  constructor (A, B, C) {
    super()
    const BA = vecteur3d(B, A)
    const BC = vecteur3d(B, C)
    const k1 = BA.norme
    const k2 = BC.norme
    const M1 = homothetie3d(A, B, 0.5 / k1)
    const M3 = homothetie3d(C, B, 0.5 / k2)
    const BM1 = vecteur3d(B, M1)
    const BM3 = vecteur3d(B, M3)
    const x = B.x + BM1.x + BM3.x
    const y = B.y + BM1.y + BM3.y
    const z = B.z + BM1.z + BM3.z
    const M2 = point3d(x, y, z)
    const M1M2 = arete3d(M1, M2)
    const M2M3 = arete3d(M2, M3)
    this.svg = function (coeff) {
      return M1M2.c2d.svg(coeff) + M2M3.c2d.svg(coeff)
    }
    this.tikz = function () {
      return M1M2.c2d.tikz() + M2M3.c2d.tikz()
    }
  }
}
