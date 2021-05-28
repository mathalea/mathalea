import Fraction from './Fraction'
import ListeFraction from './ListeFraction'

/**
 * Des fonctions pour manipuler des objets Fraction ou ListeFraction
 * @module
 */

/**
 * Retourne une liste de fractions irréducibles
 * @return {Fraction[]}
 */
export function obtenirListeFractionsIrreductibles () { // sous forme de fractions
  return [
    fraction(1, 2),
    fraction(1, 3),
    fraction(2, 3),
    fraction(1, 4),
    fraction(3, 4),
    fraction(1, 5),
    fraction(2, 5),
    fraction(3, 5),
    fraction(4, 5),
    fraction(1, 6),
    fraction(5, 6),
    fraction(1, 7),
    fraction(2, 7),
    fraction(3, 7),
    fraction(4, 7),
    fraction(5, 7),
    fraction(6, 7),
    fraction(1, 8),
    fraction(3, 8),
    fraction(5, 8),
    fraction(7, 8),
    fraction(1, 9),
    fraction(2, 9),
    fraction(4, 9),
    fraction(5, 9),
    fraction(7, 9),
    fraction(8, 9),
    fraction(1, 10),
    fraction(3, 10),
    fraction(7, 10),
    fraction(9, 10)]
}

/**
 * Retourne une liste de fractions irréducibles simples (1/2, 1/3, 2/3, 1/5 … 4/5, 1/7 … 6/7)
 * @return {Fraction[]}
 */
export function obtenirListeFractionsIrreductiblesFaciles () { // sous forme de fractions
  return [
    fraction(1, 2),
    fraction(1, 3),
    fraction(2, 3),
    fraction(1, 5),
    fraction(2, 5),
    fraction(3, 5),
    fraction(4, 5),
    fraction(1, 7),
    fraction(2, 7),
    fraction(3, 7),
    fraction(4, 7),
    fraction(5, 7),
    fraction(6, 7)
  ]
}

export function listeFractions (...fractions) {
  return new ListeFraction(...fractions)
}

/**
 * Construit et Retourne un objet Fraction(a, b)
 * @param {number} a
 * @param {number} b
 * @return {Fraction}
 */
export function fraction (a, b) {
  return new Fraction(a, b)
}
