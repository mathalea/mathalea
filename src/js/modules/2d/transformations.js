/** @module transformations */

import { colorToLatexOrHTML, ObjetMathalea2D } from '../2dGeneralites'
import { radians } from '../fonctionsMaths'
import { egal } from '../outils/comparateurs'
import { arc } from './arc'
import { longueur } from './calculs'
import { droite, Droite } from './droites'
import { point, Point } from './point'
import { polygone, Polygone } from './polygone'
import { segment, Segment } from './segment'
import { vecteur, Vecteur } from './vecteur'

/**
 * M = translation(O,v) //M est l'image de O dans la translation de vecteur v
 * M = translation(O,v,'M') //M est l'image de O dans la translation de vecteur v et se nomme M
 * M = translation(O,v,'M','below') //M est l'image de O dans la translation de vecteur v, se nomme M et le nom est en dessous du point
 * @param {ObjecMathalea2d} O objet à translater (Point, Droite, Segment, Polygone ou Vecteur)
 * @param {Vecteur} v vecteur de translation
 * @param {string} nom nom du translaté pour un Point
 * @param {string} positionLabel Position du label pour un Point
 * @param {string} [color='black'] Code couleur HTML acceptée
 * @author Rémi Angot
 */
export function translation (O, v, nom = '', positionLabel = 'above', color = 'black') {
  if (O instanceof Point) {
    const x = O.x + v.x
    const y = O.y + v.y
    return point(x, y, nom, positionLabel)
  }
  if (O instanceof Polygone) {
    const p2 = []
    for (let i = 0; i < O.listePoints.length; i++) {
      p2[i] = translation(O.listePoints[i], v)
      p2[i].nom = O.listePoints[i].nom + '\''
    }
    return polygone(p2, color)
  }
  if (O instanceof Droite) {
    const M = translation(point(O.x1, O.y1), v)
    const N = translation(point(O.x2, O.y2), v)
    return droite(M, N, color)
  }
  if (O instanceof Segment) {
    const M = translation(O.extremite1, v)
    const N = translation(O.extremite2, v)
    const s = segment(M, N, color)
    s.styleExtremites = O.styleExtremites
    return s
  }
  if (O instanceof Vecteur) {
    return O
  }
}

/**
   * M = translation2Points(O,A,B) //M est l'image de O dans la translation qui transforme A en B
   * M = translation2Points(O,A,B,'M') //M est l'image de O dans la translation qui transforme A en B et se nomme M
   * M = translation2Points(O,A,B,'M','below') //M est l'image de O dans la translation qui transforme A en B, se nomme M et le nom est en dessous du point
   *
   * @author Rémi Angot
   */

export function translation2Points (O, A, B, nom = '', positionLabel = 'above', color = 'black') {
  if (O instanceof Point) {
    const x = O.x + B.x - A.x
    const y = O.y + B.y - A.y
    return point(x, y, nom, positionLabel)
  }
  if (O instanceof Polygone) {
    const p2 = []
    for (let i = 0; i < O.listePoints.length; i++) {
      p2[i] = translation2Points(O.listePoints[i], O, A, B)
      p2[i].nom = A.listePoints[i].nom + '\''
    }
    return polygone(p2, color)
  }
  if (O instanceof Droite) {
    const M = translation2Points(point(O.x1, O.y1), A, B)
    const N = translation2Points(point(O.x2, O.y2), A, B)
    return droite(M, N, color)
  }
  if (O instanceof Segment) {
    const M = translation2Points(O.extremite1, A, B)
    const N = translation2Points(O.extremite2, A, B)
    const s = segment(M, N, color)
    s.styleExtremites = O.styleExtremites
    return s
  }
  if (A instanceof Vecteur) {
    return A
  }
}

/**
   * @param A Point, Polygone, Droite, Segment ou Vecteur
   * @param {Point} O Centre de rotation
   * @param {number} angle Angle de rotation
   * @param {string} [nom=''] Nom de l'image
   * @param {string} [positionLabel='above']
   * @param {string} [color='black'] Code couleur HTML acceptée
   * @return L'image de A par la rotation de centre O et d'angle angle
   * @author Rémi Angot et Jean-Claude Lhote
   */
export function rotation (A, O, angle, nom = '', positionLabel = 'above', color = 'black') {
  if (A.constructor === Point) {
    const x = O.x +
        (A.x - O.x) * Math.cos((angle * Math.PI) / 180) -
        (A.y - O.y) * Math.sin((angle * Math.PI) / 180)
    const y = O.y +
        (A.x - O.x) * Math.sin((angle * Math.PI) / 180) +
        (A.y - O.y) * Math.cos((angle * Math.PI) / 180)
    return point(x, y, nom, positionLabel)
  }
  if (A.constructor === Polygone) {
    const p2 = []
    for (let i = 0; i < A.listePoints.length; i++) {
      p2[i] = rotation(A.listePoints[i], O, angle)
      p2[i].nom = A.listePoints[i].nom + '\''
    }
    return polygone(p2, color)
  }
  if (A.constructor === Droite) {
    const M = rotation(point(A.x1, A.y1), O, angle)
    const N = rotation(point(A.x2, A.y2), O, angle)
    return droite(M, N, color)
  }
  if (A.constructor === Segment) {
    const M = rotation(A.extremite1, O, angle)
    const N = rotation(A.extremite2, O, angle)
    const s = segment(M, N, color)
    s.styleExtremites = A.styleExtremites
    return s
  }
  if (A.constructor === Vecteur) {
    const x = A.x * Math.cos((angle * Math.PI) / 180) -
        A.y * Math.sin((angle * Math.PI) / 180)
    const y = A.x * Math.sin((angle * Math.PI) / 180) +
        A.y * Math.cos((angle * Math.PI) / 180)
    const v = vecteur(x, y)
    return v
  }
}

/**
   * @author Jean-Claude Lhote
   * A1 Le point de départ de la flèche
   * centre Le centre de la rotation
   * sens Le sens (+1 ou -1) de la rotation. +1=sens trig
   */
function SensDeRotation (A1, centre, sens, color = 'black') {
  ObjetMathalea2D.call(this, { })
  const objets = []
  const arc1 = arc(A1, centre, 20 * sens)
  arc1.color = colorToLatexOrHTML(color)
  const A2 = rotation(A1, centre, 20 * sens)
  const F1 = similitude(A2, centre, -5 * sens, 0.95)
  const F2 = similitude(A2, centre, -5 * sens, 1.05)
  const s1 = segment(A2, F1, color)
  const s2 = segment(A2, F2, color)
  objets.push(arc1, s1, s2)

  this.svg = function (coeff) {
    let code = ''
    for (const objet of objets) {
      code += '\n\t' + objet.svg(coeff)
    }
    return code
  }
  this.tikz = function () {
    let code = ''
    for (const objet of objets) {
      code += '\n\t' + objet.tikz()
    }
    return code
  }
}
export function sensDeRotation (A, O, sens, color = 'black') {
  return new SensDeRotation(A, O, sens, color)
}
/** Construit l'image d'un objet par homothétie
   * @param {Point|Segment|Droite|Polygone|Vecteur} Objet Objet MathAlea2d choisi parmi un point, un segment, une droite, un polygone ou un vecteur
   * @param {oint} O Centre de l'homothétie
   * @param {number} k Rapport de l'homothétie
   * @param {string} [nom = ''] Nom du point-image
   * @param {string} [positionLabel = 'above'] Position du point-image. Les possibilités sont : 'left', 'right', 'below', 'above', 'above right', 'above left', 'below right', 'below left'. Si on se trompe dans l'orthographe, ce sera 'above left' et si on ne précise rien, pour un point ce sera 'above'.
   * @param {string} [color='black']  Couleur de l'image : du type 'blue' ou du type '#f15929' (non valable pour un point et pour un vecteur)
   * @example p2 = homothetie(p1 ,I ,2)
   * // p2 est l'image de p1 par une homothétie de centre I et de rapport 2
   * @example N = homothetie(M, I, 0.5, 'point N', 'right')
   * // N est l'image de M par une homothétie de centre I et de rapport 0.5.  Le point sera affiché comme "point N" et ce nom sera écrit à droite de sa position.
   * @example s = homothetie(segment(A, B), I, -0.5, '', '','blue')
   * // s est l'image du segment [AB] par une homothétie de centre I et de rapport -0.5.  s sera en bleu.
   * @author Rémi Angot
   * @return {Point|Segment|Droite|Polygone|Vecteur}
   */
export function homothetie (Objet, O, k, nom = '', positionLabel = 'above', color = 'black') {
  if (Objet.constructor === Point) {
    const x = O.x + k * (Objet.x - O.x)
    const y = O.y + k * (Objet.y - O.y)
    return new Point(x, y, nom, positionLabel)
  }
  if (Objet.constructor === Polygone) {
    const p2 = []
    for (let i = 0; i < Objet.listePoints.length; i++) {
      p2[i] = homothetie(Objet.listePoints[i], O, k)
      p2[i].nom = Objet.listePoints[i].nom + '\''
    }
    return polygone(p2, color)
  }
  if (Objet.constructor === Droite) {
    const M = homothetie(point(Objet.x1, Objet.y1), O, k)
    const N = homothetie(point(Objet.x2, Objet.y2), O, k)
    return droite(M, N, '', color)
  }
  if (Objet.constructor === Segment) {
    const M = homothetie(Objet.extremite1, O, k)
    const N = homothetie(Objet.extremite2, O, k)
    const s = segment(M, N, color)
    s.styleExtremites = Objet.styleExtremites
    return s
  }
  if (Objet.constructor === Vecteur) {
    const x = Objet.x
    const y = Objet.y
    const v = vecteur(x * k, y * k)
    return v
  }
}

/**
   * Renvoie le point M symétrique du point A par la droite d.
   * @param {Point} A Objet de type Point (ses coordonnées x et y renseignées)
   * @param {droite} d Objet de type Droite (son équation ax+by+c=0 renseignée)
   * @param {string} M Nom de l'image. Facultatif, vide par défaut.
   * @param {string} positionLabel Facultatif, 'above' par défaut.
   * @return {Point} M image de A par la symétrie axiale d'axe d.
   * @param {string} [color='black'] Code couleur HTML acceptée
   * @author Jean-Claude Lhote
   */
export function symetrieAxiale (A, d, nom = '', positionLabel = 'above', color = 'black') {
  let x, y
  const a = d.a
  const b = d.b
  const c = d.c
  const k = 1 / (a * a + b * b)
  if (A.constructor === Point) {
    if (a === 0) {
      x = A.x
      y = -(A.y + (2 * c) / b)
    } else if (b === 0) {
      y = A.y
      x = -(A.x + (2 * c) / a)
    } else {
      x = k * ((b * b - a * a) * A.x - 2 * a * b * A.y - 2 * a * c)
      y = k * ((a * a - b * b) * A.y - 2 * a * b * A.x + (a * a * c) / b - b * c) - c / b
    }
    return point(x, y, nom, positionLabel)
  }
  if (A.constructor === Polygone) {
    const p2 = []
    for (let i = 0; i < A.listePoints.length; i++) {
      p2[i] = symetrieAxiale(A.listePoints[i], d)
      p2[i].nom = A.listePoints[i].nom + '\''
    }
    return polygone(p2, color)
  }
  if (A.constructor === Droite) {
    const M = symetrieAxiale(point(A.x1, A.y1), d)
    const N = symetrieAxiale(point(A.x2, A.y2), d)
    return droite(M, N, color)
  }
  if (A.constructor === Segment) {
    const M = symetrieAxiale(A.extremite1, d)
    const N = symetrieAxiale(A.extremite2, d)
    const s = segment(M, N, color)
    s.styleExtremites = A.styleExtremites
    return s
  }
  if (A.constructor === Vecteur) {
    let O
    if (egal(b, 0)) {
      O = point(-c / a, 0)
    } else O = point(0, -c / b)
    const M = translation(O, A)
    const N = symetrieAxiale(M, d)
    const v = vecteur(O, N)
    return v
  }
}

/**  Donne la distance entre le point A et la droite d
 * @param {point} A
 * @param {droite} d
 * @example distancePointDroite (M, d1) // Retourne la distance entre le point M et la droite d1
 * @author Jean-Claude Lhote
 * @return {longueur}
 */
// JSDOC Validee par EE Aout 2022
export function distancePointDroite (A, d) {
  const M = projectionOrtho(A, d)
  return longueur(A, M, 9)
}

/**
   * N = projectionOrtho(M,d,'N','below left')
   *@author Jean-Claude Lhote
   */
export function projectionOrtho (M, d, nom = '', positionLabel = 'above') {
  const a = d.a
  const b = d.b
  const c = d.c
  const k = 1 / (a * a + b * b)
  let x, y
  if (M.constructor === Point) {
    if (a === 0) {
      x = M.x
      y = -c / b
    } else if (b === 0) {
      y = M.y
      x = -c / a
    } else {
      x = k * (b * b * M.x - a * b * M.y - a * c)
      y = k * (-a * b * M.x + a * a * M.y + (a * a * c) / b) - c / b
    }
    return point(x, y, nom, positionLabel)
  }
  if (M.constructor === Vecteur) {
    let O
    if (egal(b, 0)) O = point(-c / a, 0)
    else O = point(0, -c / b)
    const A = translation(O, M)
    const N = projectionOrtho(A, d)
    const v = vecteur(O, N)
    return v
  }
}

/**
   * Construit l'image d'un objet par affinité orthogonale
   * @param {Point|Segment|Droite|Polygone|Vecteur} Objet Objet MathAlea2d choisi parmi un point, un segment, une droite, un polygone ou un vecteur
   * @param {number} d Direction de l'affinité
   * @param {number} k Rapport de l'affinité
   * @param {string} [nom=''] Nom de l'image (uniquement valable pour un point)
   * @param {string} [positionLabel = 'above'] Position de l'image (uniquement valable pour un point)
   * @param {string} [color='black']  Couleur de la valeur indiquée : du type 'blue' ou du type '#f15929' (non valable pour un point et pour un vecteur)
   * @author Jean-Claude Lhote
   * @example p2 = affiniteOrtho(p1,droite(B, C),k)
   * // p2 est l'image de p1 par une affinité orthogonale dont la direction est la droite (BC) et de rapport k
   * @example N = affiniteOrtho(M,d,0.5,'point N','right')
   * // N est l'image du point M par une affinité orthogonale de direction d et de rapport 0.5. Le point sera affiché comme "point N" et ce nom sera écrit à droite de sa position.
   * @example s = affiniteOrtho(segment(A, B),d,0.1,'','','red')
   * // s est l'image du segment [AB] par une affinité orthogonale de direction d et de rapport 0.1. s sera rouge.
   * @return {Point|Segment|Droite|Polygone|Vecteur} Retourne un objet du même type que le paramètre objet de la fonction
   */
// JSDOC Validee par EE Juin 2022
export function affiniteOrtho (A, d, k, nom = '', positionLabel = 'above', color = 'black') {
  const a = d.a
  const b = d.b
  const c = d.c
  const q = 1 / (a * a + b * b)
  let x, y
  if (A.constructor === Point) {
    if (a === 0) {
      x = A.x
      y = k * A.y + (c * (k - 1)) / b
    } else if (b === 0) {
      y = A.y
      x = k * A.x + (c * (k - 1)) / a
    } else {
      x = q * (b * b * A.x - a * b * A.y - a * c) * (1 - k) + k * A.x
      y = q * (a * a * A.y - a * b * A.x + (a * a * c) / b) * (1 - k) + (k * c) / b + k * A.y - c / b
    }
    return new Point(x, y, nom, positionLabel)
  }
  if (A.constructor === Polygone) {
    const p2 = []
    for (let i = 0; i < A.listePoints.length; i++) {
      p2[i] = affiniteOrtho(A.listePoints[i], d, k)
      p2[i].nom = A.listePoints[i].nom + '\''
    }
    return new Polygone(p2, color)
  }
  if (A.constructor === Droite) {
    const M = affiniteOrtho(point(A.x1, A.y1), d, k)
    const N = affiniteOrtho(point(A.x2, A.y2), d, k)
    return new Droite(M, N, color)
  }
  if (A.constructor === Segment) {
    const M = affiniteOrtho(A.extremite1, d, k)
    const N = affiniteOrtho(A.extremite2, d, k)
    return new Segment(M, N, color, A.styleExtremites)
  }
  if (A.constructor === Vecteur) {
    let O
    if (egal(b, 0)) {
      O = point(-c / a, 0)
    } else O = point(0, -c / b)
    const M = translation(O, A)
    const N = affiniteOrtho(M, d, k)
    return new Vecteur(O, N)
  }
}
/**
   *
   * @param {Point} A // Le point dont on veut l'image
   * @param {Point} O // Le centre de la similitude
   * @param {number} a // L'angle de la rotation
   * @param {number} k // le rapport de l'homothétie
   * @param {string} nom
   * @param {string} positionLabel
   * M = similitude(B,O,30,1.1,'M') // Le point M est l'image de B dans la similitude de centre O d'angle 30° et de rapport 1.1
   * @author Jean-Claude Lhote
   */
export function similitude (A, O, a, k, nom = '', positionLabel = 'above', color = 'black') {
  if (A.constructor === Point) {
    const ra = radians(a)
    const x = O.x + k * (Math.cos(ra) * (A.x - O.x) - Math.sin(ra) * (A.y - O.y))
    const y = O.y + k * (Math.cos(ra) * (A.y - O.y) + Math.sin(ra) * (A.x - O.x))
    return point(x, y, nom, positionLabel)
  }
  if (A.constructor === Polygone) {
    const p2 = []
    for (let i = 0; i < A.listePoints.length; i++) {
      p2[i] = similitude(A.listePoints[i], O, a, k)
      p2[i].nom = A.listePoints[i].nom + '\''
    }
    return polygone(p2, color)
  }
  if (A.constructor === Droite) {
    const M = similitude(point(A.x1, A.y1), O, a, k)
    const N = similitude(point(A.x2, A.y2), O, a, k)
    return droite(M, N, color)
  }
  if (A.constructor === Segment) {
    const M = similitude(A.extremite1, O, a, k)
    const N = similitude(A.extremite2, O, a, k)
    const s = segment(M, N, color)
    s.styleExtremites = A.styleExtremites
    return s
  }
  /* if (A.constructor==DemiDroite) {
        let M = similitude(A.extremite1,O,a,k)
        let N = similitude(A.extremite2,O,a,k)
        let s = demiDroite(M,N)
        s.styleExtremites = A.styleExtremites
        return s
      } */
  if (A.constructor === Vecteur) {
    const V = rotation(A, O, a)
    const v = homothetie(V, O, k)
    return v
  }
}
