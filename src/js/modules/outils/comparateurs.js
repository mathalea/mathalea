import { round } from 'mathjs'
import { randint } from './entiers'
import { arrondi } from './nombres'

const epsilon = 0.000001

/**
 * Contraint une valeur à rester dans un intervalle donné. Si elle est trop petite, elle prend la valeur min, si elle est trop grande elle prend la valeur max
 * @author Jean-Claude Lhote à partir du code de Eric Elter
 * @param {number} min borne inférieure
 * @param {number} max borne supérieure
 * @param {number} valeur la valeur à contraindre
 * @param {number} defaut valeur par défaut si non entier
 */
export function contraindreValeur (min, max, valeur, defaut) {
  return !(Number.isNaN(valeur)) ? (Number(valeur) < min) ? min : (Number(valeur) > max) ? max : Number(valeur) : defaut
}

/** Retourne un nombre décimal entre a et b, sans être trop près de a et de b
   * @param {number} min borne inférieure
   * @param {number} max borne supérieure
   * @author Eric Elter
   * @returns {number}
   */
export function entreDeux (a, b) {
  if (a < b) return arrondi(a + (b - a) * randint(10, 90) / 100, 2)
  else return arrondi(b + (a - b) * randint(10, 90) / 100, 2)
}

/**
   * Compare deux nombres (pour les nombres en virgule flottante afin d'éviter les effets de la conversion en virgule flottante).
   * @author Jean-Claude Lhote
   * @param {number} a premier nombre
   * @param {number} b deuxième nombre
   * @param {number} [tolerance=0.000001] seuil positif en dessous duquel une valeur est considérée comme nulle
   * @return {boolean}
   */
export function egal (a, b, tolerance = epsilon) {
  return (Math.abs(a - b) < tolerance)
}

/**
   * Retourne true si a > b
   * @param {number} a premier nombre
   * @param {number} b deuxième nombre
   * @param {number} [tolerance=0.000001] seuil positif en dessous duquel une valeur est considérée comme nulle
   * @return {boolean}
   */
export function superieur (a, b, tolerance = epsilon) {
  return (a - b > tolerance)
}
/**
   * Retourne true si a < b
   * @param {number} a premier nombre
   * @param {number} b deuxième nombre
   * @param {number} [tolerance=0.000001] seuil positif en dessous duquel une valeur est considérée comme nulle
   * @return {boolean}
   */
export function inferieur (a, b, tolerance = epsilon) {
  return (b - a > tolerance)
}
/**
   * Retourne true si a ≥ b
   * @param {number} a premier nombre
   * @param {number} b deuxième nombre
   * @param {number} [tolerance=0.000001] seuil positif en dessous duquel une valeur est considérée comme nulle
   * @return {boolean}
   */
export function superieurouegal (a, b, tolerance = epsilon) {
  return (a - b > tolerance || egal(a, b, tolerance))
}
/**
   * Retourne true si a ≤ b
   * @param {number} a premier nombre
   * @param {number} b deuxième nombre
   * @param {number} [tolerance=0.000001] seuil positif en dessous duquel une valeur est considérée comme nulle
   * @return {boolean}
   */
export function inferieurouegal (a, b, tolerance = epsilon) {
  return (b - a > tolerance || egal(a, b, tolerance))
}
/**
   * Retourne true si a est entier ou "presque" entier
   * @param {number} a premier nombre
   * @param {number} [tolerance=0.000001] seuil positif en dessous duquel une valeur est considérée comme nulle
   * @return {boolean}
   */
export function estentier (a, tolerance = epsilon) {
  return (Math.abs(a - round(a)) < tolerance)
}
