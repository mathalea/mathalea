/** @module point sur */

import { radians } from '../fonctionsMaths'
import { egal, randint } from '../outils'
import { longueur } from './calculs'
import { point } from './point'
import { homothetie, similitude } from './transformations'

/**
   * M = pointSurSegment(A,B,l) //M est le point de [AB] à l cm de A
   * M = pointSurSegment(A,B,l,'M') //M est le point de [AB] à l cm de A et se nomme M
   * M = pointSurSegment(A,B,l,'M','below') //M est le point de [AB] à l cm de A, se nomme M et le nom est en dessous du point
   *
   * M = pointSurSegment(A,B,'h','M') // M est un point au hasard sur [AB] (on peut écrire n'importe quel texte à la place de 'h')
   * M = pointSurSegment(A,B) // M est un point au hasard sur [AB]
   * Sécurité ajoutée par Jean-Claude Lhote : si AB=0, alors on retourne A
   * @author Rémi Angot
   */
export function pointSurSegment (A, B, l, nom = '', positionLabel = 'above') {
  if (isNaN(longueur(A, B))) window.notify('pointSurSegment : Quelque chose ne va pas avec les points', { A, B })
  if (longueur(A, B) === 0) return A
  if (l === undefined || typeof l === 'string') {
    l = (longueur(A, B) * randint(15, 85)) / 100
  }
  return homothetie(B, A, l / longueur(A, B), nom, positionLabel)
}

/**
   *
   * @param {Cercle} c
   * @param {number} angle
   * @param {string} nom
   * @param {string} positionLabel
   * M = pointSurCercle(c,'','M') // M est un point choisi au hasard sur le cercle c et se nomme M.
   * N = pointSurCercle(c,90) // N est le point du cercle c situé à 90° par rapport à l'horizontale, donc au dessus du centre de c
   * P = pointSurCercle(c,-90) // P est le point du cercle c situé à l'opposé du point N précédent.
   * @author Jean-Claude Lhote
   */
export function pointSurCercle (c, angle, nom, positionLabel = 'above') {
  if (typeof angle !== 'number') angle = randint(-180, 180)
  const x = c.centre.x + c.rayon * Math.cos(radians(angle))
  const y = c.centre.y + c.rayon * Math.sin(radians(angle))
  return point(x, y, nom, positionLabel)
}
/**
   * Retourne un point sur la droite d dont l'abscisse est x. Si c'est impossible (droite verticale) alors ce sera le point dont l'ordonnée vaut x.
   * @param {Droite} d
   * @param {number} x Abscisse du point
   * @param {string} nom Nom du point
   * @param {string} [positionLabel='above'] Facultatif, 'above' par défaut.
   * @return {Point} Point de la droite d dont l'abscisse est x
   * @author Jean-Claude Lhote
   */
export function pointSurDroite (d, x, nom, positionLabel = 'above') {
  // si d est parallèle à l'axe des ordonnées, le paramètre x servira pour y.
  if (d.b === 0) return point(-d.c / d.a, x, nom, positionLabel)
  else if (d.a === 0) return point(x, -d.c / d.b, nom, positionLabel)
  else return point(x, (-d.c - d.a * x) / d.b, nom, positionLabel)
}

/**
   * Renvoie 'M' le point d'intersection des droites d1 et d2
   * @param {Droite} d1
   * @param {Droite} d2
   * @param {string} [M=''] Nom du point d'intersection. Facultatif, vide par défaut.
   * @param {string} [positionLabel='above'] Facultatif, 'above' par défaut.
   * @return {Point} Point 'M' d'intersection de d1 et de d2
   * @author Jean-Claude Lhote
   */
export function pointIntersectionDD (d, f, nom = '', positionLabel = 'above') {
  let x, y
  if (f.a * d.b - f.b * d.a === 0) {
    console.log('Les droites sont parallèles, pas de point d\'intersection')
    return false
  } else { y = (f.c * d.a - d.c * f.a) / (f.a * d.b - f.b * d.a) }
  if (d.a === 0) { // si d est horizontale alors f ne l'est pas donc f.a<>0
    x = (-f.c - f.b * y) / f.a
  } else { // d n'est pas horizontale donc ...
    x = (-d.c - d.b * y) / d.a
  }
  return point(x, y, nom, positionLabel)
}
/**
   * @example pointAdistance(A,d,angle,nom="",positionLabel="above") // Seuls le point A et la distance d sont obligatoires,
   *  angle peut être choisi : il s'agit de l'angle signé avec l'axe [OI) sinon, il est choisi aléatoirement.
   * @example p=pointAdistance(A,5,'M') // Place un point aléatoirement à 5 unités de A et lui donne le nom de 'M'.
   * @author Jean-Claude Lhote
   */
export function pointAdistance (...args) {
  const l = args.length
  const angle = randint(1, 360)
  const A = args[0]
  const B = point(A.x + 1, A.y)
  const d = args[1]
  if (l < 2) { return false }
  if (l === 2) { return similitude(B, A, angle, d) } else
  if (l === 3) {
    if (typeof (args[2]) === 'number') { return similitude(B, A, args[2], d) } else { return similitude(B, A, angle, d, args[2]) }
  } else
  if (l === 4) {
    if (typeof (args[2]) === 'number') { return similitude(B, A, args[2], d, args[3]) } else { return similitude(B, A, angle, d, args[2], args[3]) }
  } else { return similitude(B, A, args[2], d, args[3], args[4]) }
}

/**
 * M = pointIntersectionCC(c1,c2,'M') // M est le point d'intersection le plus haut des cercles c1 et c2
 * M = pointIntersectionCC(c1,c2,'M',2) // M est le point d'intersection le plus bas des cercles c1 et c2
 * La fonction ne renvoie rien si les cercles n'ont pas de points d'intersection
 * @author Rémi Angot
 * @Source https://stackoverflow.com/questions/12219802/a-javascript-function-that-returns-the-x-y-points-of-intersection-between-two-ci
 */
export function pointIntersectionCC (c1, c2, nom = '', n = 1) {
  const O1 = c1.centre
  const O2 = c2.centre
  const r0 = c1.rayon
  const r1 = c2.rayon
  const x0 = O1.x
  const x1 = O2.x
  const y0 = O1.y
  const y1 = O2.y
  const dx = x1 - x0
  const dy = y1 - y0
  const d = Math.sqrt(dy * dy + dx * dx)
  if (d > r0 + r1) {
    return false
  }
  if (d < Math.abs(r0 - r1)) {
    return false
  }
  const a = (r0 * r0 - r1 * r1 + d * d) / (2.0 * d)
  const x2 = x0 + (dx * a) / d
  const y2 = y0 + (dy * a) / d
  const h = Math.sqrt(r0 * r0 - a * a)
  const rx = -dy * (h / d)
  const ry = dx * (h / d)
  const xi = x2 + rx
  const xiPrime = x2 - rx
  const yi = y2 + ry
  const yiPrime = y2 - ry
  if (n === 1) {
    if (yiPrime > yi) {
      return point(xiPrime, yiPrime, nom)
    } else {
      return point(xi, yi, nom)
    }
  } else {
    if (yiPrime > yi) {
      return point(xi, yi, nom)
    } else {
      return point(xiPrime, yiPrime, nom)
    }
  }
}

/**
   * @param {Droite} d la droite qui intecepte (ou pas le cercle)
   * @param {Cercle} C le cercle
   * @param {string} nom le nom du point d'intersection
   * @param {entier} n 1 pour le premier point, 2 sinon. Si il n'y a qu'un seul point d'intesection, l'un ou l'autre renvoie ce point.
   * @example I = pointItersectionLC(d,c,'I',1) // I est le premier point d'intersection si il existe de la droite (d) et du cercle (c)
   * @author Jean-Claude Lhote
   */
export function pointIntersectionLC (d, C, nom = '', n = 1) {
  const O = C.centre
  const r = C.rayon
  const a = d.a
  const b = d.b
  const c = d.c
  const xO = O.x
  const yO = O.y
  let Delta, delta, xi, yi, xiPrime, yiPrime
  if (egal(b, 0, 0.000001)) {
    // la droite est verticale
    xi = -c / a
    xiPrime = xi
    Delta = 4 * (-xO * xO - (c * c) / (a * a) - (2 * xO * c) / a + r * r)
    if (Delta < 0) return false
    else if (egal(Delta, 0)) {
      // un seul point d'intersection
      yi = yO + Math.sqrt(Delta) / 2
      yiPrime = yi
    } else {
      // deux points d'intersection
      yi = yO - Math.sqrt(Delta) / 2
      yiPrime = yO + Math.sqrt(Delta) / 2
    }
  } else if (egal(a, 0, 0.0000001)) {
    // la droite est horizontale
    yi = -c / b
    yiPrime = yi
    Delta = 4 * (-yO * yO - (c * c) / (b * b) - (2 * yO * c) / b + r * r)
    if (Delta < 0) return false
    else if (egal(Delta, 0)) {
      // un seul point d'intersection
      xi = xO + Math.sqrt(Delta) / 2
      xiPrime = xi
    } else {
      // deux points d'intersection
      xi = xO - Math.sqrt(Delta) / 2
      xiPrime = xO + Math.sqrt(Delta) / 2
    }
  } else {
    // cas général
    Delta = (2 * ((a * c) / (b * b) + (yO * a) / b - xO)) ** 2 - 4 * (1 + (a / b) ** 2) * (xO * xO + yO * yO + (c / b) ** 2 + (2 * yO * c) / b - r * r)
    if (Delta < 0) return false
    else if (egal(Delta, 0)) {
      // un seul point d'intersection
      delta = Math.sqrt(Delta)
      xi = (-2 * ((a * c) / (b * b) + (yO * a) / b - xO) - delta) / (2 * (1 + (a / b) ** 2))
      xiPrime = xi
      yi = (-a * xi - c) / b
      yiPrime = yi
    } else {
      // deux points d'intersection
      delta = Math.sqrt(Delta)
      xi = (-2 * ((a * c) / (b * b) + (yO * a) / b - xO) - delta) / (2 * (1 + (a / b) ** 2))
      xiPrime = (-2 * ((a * c) / (b * b) + (yO * a) / b - xO) + delta) / (2 * (1 + (a / b) ** 2))
      yi = (-a * xi - c) / b
      yiPrime = (-a * xiPrime - c) / b
    }
  }
  if (n === 1) {
    if (yiPrime > yi) {
      return point(xiPrime, yiPrime, nom)
    } else {
      return point(xi, yi, nom)
    }
  } else {
    if (yiPrime > yi) {
      return point(xi, yi, nom)
    } else {
      return point(xiPrime, yiPrime, nom)
    }
  }
}
