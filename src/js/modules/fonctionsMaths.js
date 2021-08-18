import { multiply, resize, inv, matrix } from 'mathjs'

import { calcul, arrondi, ecritureAlgebrique, egal } from './outils.js'
/**
* Convertit un angle de radian vers degrés et fonction inverse
* @Example
* // PI->180
* @author Jean-Claude Lhote
*/
export function degres (radians) {
  return radians * 180 / Math.PI
}
export function radians (degres) {
  return degres * Math.PI / 180
}

/**
   * @param {number} a angle en degrés
   * @returns flottant : le cosinus de l'angle
   * @author Jean-Claude Lhote
   */
export function cos (a) {
  return calcul(Math.cos(radians(a)))
}
/**
   * @param {number} a angle en degrés
   * @returns flottant : le sinus de l'angle
   * @author Jean-Claude Lhote
   */
export function sin (a) {
  return calcul(Math.sin(radians(a)))
}
/**
   * @param {number} a angle en degrés
   * @returns flottant : la tangente de l'angle
   * @author Jean-Claude Lhote
   */
export function tan (a) {
  return calcul(Math.tan(radians(a)))
}
/**
   * @param {number} un nombre qui correspond au cosinus de l'angle
   * @returns flottant : la mesure de l'angle en degrés
   * @author Jean-Claude Lhote
   */
export function acos (x) {
  return arrondi(degres(Math.acos(x)), 1)
}
/**
   * @param {number} un nombre qui correspond au sinus de l'angle
   * @returns flottant : la mesure de l'angle en degrés
   * @author Jean-Claude Lhote
   */
export function asin (x) {
  return arrondi(degres(Math.asin(x)), 1)
}
/**
   * @param {number} un nombre qui correspond à la tangente de l'angle
   * @returns flottant : la mesure de l'angle en degrés
   * @author Jean-Claude Lhote
   */
export function atan (x) {
  return arrondi(degres(Math.atan(x)), 1)
}
/**
 * retourne un décimal sans décimales bizarres
 * @author Jean-Claude Lhote
 */
export function calcule (a, arrondir = false) {
  if (!arrondir) {
    if (typeof a === 'string') {
      return parseFloat(Number(a).toFixed(6))
    } else {
      return parseFloat(a.toFixed(6))
    }
  } else {
    if (typeof a === 'string') {
      return parseFloat(Number(a).toFixed(arrondir))
    } else {
      return parseFloat(a.toFixed(arrondir))
    }
  }
}

/**
 * retourne une chaine contenant le résultat du calcul avec la virgule comme séparateur et pas de décimales bizarres
 * @author Jean-Claude Lhote
 */
export function calculeS (a, arrondir = false) {
  let result
  if (!arrondir) {
    if (typeof a === 'string') {
      result = Number(a).toFixed(6).split('.')
    } else {
      result = a.toFixed(6).split('.')
    }
  } else {
    if (typeof a === 'string') {
      result = Number(a).toFixed(arrondir).split('.')
    } else {
      result = a.toFixed(arrondir).split('.')
    }
  }
  result[1] = result[1].replace(/[0]*$/, '')
  if (result[1].length !== 0) { return result[0] + ',' + result[1] } else return result[0]
}

export function expTrinome (a, b, c) {
  let expr = ''
  if (typeof a === 'number') {
    switch (a) {
      case 0:
        break
      case -1:
        expr += '-x^2'
        break
      case 1:
        expr += 'x^2'
        break
      default:
        expr += `${a}x^2`
        break
    }
  } else {
    expr += `${a}x^2`
  }
  if (typeof b === 'number') {
    switch (b) {
      case 0:
        break
      case -1:
        expr += '-x'
        break
      case 1:
        expr += '+x'
        break
      default:
        if (a === 0) {
          expr += `${b}`
        } else expr += `${ecritureAlgebrique(b)}x`
        break
    }
  } else {
    if (a === 0) {
      expr += `${b}x`
    } else {
      expr += `+${b}x`
    }
  }
  if (typeof c === 'number') {
    if (a === 0 && b === 0) {
      expr += `${c}`
    } else {
      if (c !== 0) {
        expr += `${ecritureAlgebrique(c)}`
      }
    }
  } else {
    expr += `+${c}`
  }
  return expr
}

/**
 * inspiré de l'article 'Algorithme de calcul d'une courbe spline de lissage'
 * de cet article 'spline' de wikipedia : https://fr.wikipedia.org/wiki/Spline
 * Adaptation pour Mathalea
 * @author Jean-Claude Lhote
 */
class Spline {
  constructor (tabNoeuds) {
    const x = []
    const y = []
    const h = []
    const F = matrix()
    const R = matrix()

    let n
    for (let i = 0; i < tabNoeuds.length; i++) {
      x[i] = tabNoeuds[i][0]
      y[i] = tabNoeuds[i][1]
    }
    if (trieCouples(x, y)) { // On mets les couples (x,y) dans l'ordre des x croissants.
      n = x.length
    } else {
      console.log('il y a un problème avec ce tableau des noeuds')
      return false
    }
    for (let i = 0; i < n - 1; i++) {
      h[i] = x[i + 1] - x[i] // on calcule les amplitudes des intervalles.
    }
    F.resize([n])
    for (let i = 1; i <= n; i++) { // On construit la matrice des dérivées secondes
      if (i === 1 || i === n) {
        F._data[i - 1] = 0
      } else {
        F._data[i - 1] = (y[i] - y[i - 1]) / h[i - 1] - (y[i - 1] - y[i - 2]) / h[i - 2]
      }
    }
    R.resize([n, n])
    console.log(R)
    for (let i = 1; i <= n; i++) { // On construit la matrice carrée de calcul
      if (i === 1) {
        R._data[0][0] = 1 // seul le premier élément de la première ligne n'est pas nul
      } else if (i === n) {
        R._data[n - 1][n - 1] = 1 // seul le dernier élément de la dernière ligne n'est pas nul
      } else { // on Construit les diagonales n = 2 .. n-1
        R._data[i - 1][i - 1] = (h[i - 2] + h[i - 1]) / 3
        R._data[i - 1][i] = h[i - 1] / 6
        R._data[i - 1][i - 2] = h[i - 2] / 6
      }
    }
    const Rinv = inv(R)
    const M = multiply(Rinv, F)
    const C = matrix()
    const C2 = matrix()
    C.resize([n - 1])
    C2.resize([n - 1])
    for (let i = 1; i <= n - 1; i++) {
      C._data[i - 1] = (y[i] - y[i - 1]) / h[i - 1] - h[i - 1] * (M._data[i] - M._data[i - 1]) / 6
      C2._data[i - 1] = y[i - 1] - M._data[i - 1] * h[i - 1] * h[i - 1] / 6
    }
    this.F = F
    this.R = R
    this.M = M
    this.h = h
    this.C = C
    this.C2 = C2
    this.x = x
    this.y = y

    this.image = function (X) {
      let trouveK = false
      let k = 0
      for (let i = 0; i < n - 1; i++) {
        if (X >= x[i] && X < x[i + 1]) {
          k = i
          trouveK = true
        }
      }
      if (!trouveK) {
        return false
      } else {
        return (M._data[k - 1] * (x[k] - X) ** 3 + M._data[k] * (X - x[k - 1]) ** 3) / 6 / h[k - 1] + C._data[k - 1] * (X - x[k - 1]) + C2._data[k - 1]
      }
    }

    /* code pour faire une spline de lissage ... ce n'est pas ce qu'on veut.
 const Q = matrix()
  const R = matrix()
  resize(Q, [n, n - 2])
  resize(R, [n - 2, n - 2])
  for (let i = 0; i < n; i++) { // On rempli la matrice Q
    if (i > 0 && i < n - 1) { // on s'occupe de la diagonale centrale
      Q[i][i - 1] = 1 / h[i - 1] + 1 / h[i]
    }
    if (i < n - 2) { // on s'occupe de la diagonale supérieure
      Q[i][i] = -1 / h[i]
    }
    if (i > 1) { // on s'occupe de la diagonale inférieure
      Q[i][i - 2] = -1 / h[i - 1]
    }
  }
  for (let i = 0; i < n - 2; i++) { // on rempli la matrice R
    R._data[i][i] = (h[i - 1] + h[i]) / 3
    if (i < n - 3) { // on s'occupe de la diagonale supérieure
      R._data[i][i + 1] = -h[i] / 6
    }
    if (i > 0) { // on s'occupe de la diagonale inférieure
      R._data[i][i - 1] = -h[i - 1] / 6
    }
  }
  const Qt = transpose(Q)
  const Rinv = inv(R)
*/
  }
}

export function spline (tabNoeuds) {
  return new Spline(tabNoeuds)
}

export function trieCouples (x, y) {
  let xInter, yInter
  for (let i = 0; i < x.length - 1; i++) {
    for (let j = i + 1; j < x.length; j++) {
      if (x[i] > x[j]) {
        xInter = x[i]
        x[i] = x[j]
        x[j] = xInter
        yInter = y[i]
        y[i] = y[j]
        y[j] = yInter
      } else if (egal(x[i], x[j])) {
        console.log('Deux couples ont la même valeur de x ! je ne peux pas trier')
        return false
      }
    }
  }
  return true
}
