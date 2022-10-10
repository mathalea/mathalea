import Decimal from 'decimal.js/decimal.mjs'
import { round } from 'mathjs'
import { egal } from './comparateurs'

/**
* Retourne le signe d'un nombre
* @Example
* // + ou -
* @author Rémi Angot
*/
export function signe (a) { // + ou -
  let result = ''
  if (a > 0) {
    result = '+'
  } else {
    result = '-'
  }
  return result
}

/**
   *
   * @param {number} a
   * -1 si a est négatif, 1 sinon.
   * @author Jean-Claude Lhote
   */
export function unSiPositifMoinsUnSinon (a) {
  if (a < 0) return -1
  else return 1
}
/**
  * Retourne la somme des chiffres (ou d'un tableau de chiffres) d'un nombre en valeur et sous forme de String [valeur, String]
  * @Example
  * sommeDesChiffres(123)
  * // [ 6, '1+2+3']
  * @author Rémi Angot (Rajout Tableau par EE)
  */export function sommeDesChiffres (n) {
  let nString
  if (Array.isArray(n)) nString = n.join('').toString()
  else nString = n.toString()
  let somme = 0
  let sommeString = ''
  for (let i = 0; i < nString.length - 1; i++) {
    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(nString[i] !== -1)) {
      sommeString += nString[i] + '+'
      somme += Number(nString[i])
    }
  }
  if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(nString[nString.length - 1] !== -1)) {
    sommeString += nString[nString.length - 1]
    somme += Number(nString[nString.length - 1])
  }
  return [somme, sommeString]
}

/**
   * Retourne l'arrondi (par défaut au centième près)
   * @author Rémi Angot
   * @param {number} nombre
   * @param {number} precision
   * @return {number}
   */
export function arrondi (nombre, precision = 2) {
  if (isNaN(nombre)) {
    window.notify('Le nombre à arrondir n\'en est pas un, ça retourne NaN', { nombre, precision })
    return NaN
  } else {
    return round(nombre, precision)
  }
}
/**
   * Retourne la troncature signée de nombre.
   * @author Jean-Claude Lhote
   */
export function troncature (nombre, precision) {
  const tmp = Math.pow(10, precision)
  const absolu = new Decimal(nombre).abs()
  const tronc = absolu.mul(tmp).floor().div(tmp)
  if (nombre < 0) return tronc.mul(-1).toNumber()
  else return tronc.toNumber()
}

/**
  * Renvoie la valeur absolue
  * @author Rémi Angot + ajout du support des décimaux par Jean-Claude Lhote
  */
export function abs (a) {
  if (a instanceof Decimal) return a.abs()
  return Math.abs(a)
}

/**
  * Retourne un arrondi sous la forme d'un string avec une virgule comme séparateur décimal
  * @author Rémi Angot Fonction rendue inutile par Jean-Claude Lhote : lui substituer texNombre ou stringNombre selon le contexte.
  */
// export function arrondiVirgule (nombre, precision = 2) { //
// const tmp = Math.pow(10, precision)
//  return String(round(nombre, precision)).replace('.', ',')
// }

/**
  * Retourne égal si la valeur égal l'arrondi souhaité ou environ égal si ce n'est pas le cas
  * le nombre a est comparé à son arrondi à précision près. Si la différence est inférieure à epsilon, alors on retourne '=' sinon '\\approx'
  * fonctionne aussi si a est une fraction : permet de finir un calcul par la valeur décimale si on veut.
  * @author Jean-Claude Lhote
  */
export function egalOuApprox (a, precision) {
  if (typeof a === 'object' && ['Fraction', 'FractionX'].indexOf(a.type) !== -1) {
    return egal(a.n / a.d, arrondi(a.n / a.d, precision)) ? '=' : '\\approx'
  } else if (a instanceof Decimal) {
    return a.eq(a.toDP(precision)) ? '=' : '\\approx'
  } else if (!isNaN(a) && !isNaN(precision)) return egal(a, arrondi(a, precision)) ? '=' : '\\approx'
  else {
    window.notify('egalOuApprox : l\'argument n\'est pas un nombre', { a, precision })
    return 'Mauvais argument (nombres attendus).'
  }
}
