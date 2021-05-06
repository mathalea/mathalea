import { calcul, arrondi } from '../../modules.js'
/**
* Convertit un angle de radian vers degrés et fonction inverse
* @Example
* // PI->180
* @Auteur Jean-Claude Lhote
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
   */
export function cos (a) {
  return calcul(Math.cos(Math.radians(a)))
}
/**
   * @param {number} a angle en degrés
   * @returns flottant : le sinus de l'angle
   */
export function sin (a) {
  return calcul(Math.sin(Math.radians(a)))
}
/**
   * @param {number} a angle en degrés
   * @returns flottant : la tangente de l'angle
   */
export function tan (a) {
  return calcul(Math.tan(Math.radians(a)))
}
/**
   * @param {number} un nombre qui correspond au cosinus de l'angle
   * @returns flottant : la mesure de l'angle en degrés
   */
export function acos (x) {
  return arrondi(degres(Math.acos(x)), 1)
}
/**
   * @param {number} un nombre qui correspond au sinus de l'angle
   * @returns flottant : la mesure de l'angle en degrés
   */
export function asin (x) {
  return arrondi(degres(Math.asin(x)), 1)
}
/**
   * @param {number} un nombre qui correspond à la tangente de l'angle
   * @returns flottant : la mesure de l'angle en degrés
   */
export function atan (x) {
  return arrondi(degres(Math.atan(x)), 1)
}
