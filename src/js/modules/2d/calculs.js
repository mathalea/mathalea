/** @module calculs (2d) */

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%% LES FONCTIONS - CALCULS %%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

import { egal } from '../outils/comparateurs'
import { arrondi, unSiPositifMoinsUnSinon } from '../outils/nombres'
import { calcul } from '../outils/texNombres'
import { rotation } from './transformations'
import { vecteur } from './vecteur'

/**
 * Renvoie la distance de A à B
 * @param {Point} A
 * @param {Point} B
 * @param {integer} [arrondi=2] Nombre de chiffres après la virgule. Facultatif, 2 par défaut.
 * @author Rémi Angot
 */
export function longueur (A, B, arrondi) {
  if (arrondi === undefined) {
    return Math.sqrt((B.x - A.x) ** 2 + (B.y - A.y) ** 2)
  } else {
    return calcul(Math.sqrt((B.x - A.x) ** 2 + (B.y - A.y) ** 2), arrondi)
  }
}

/**
   * norme(V) renvoie la norme du vecteur
   *
   * @author Rémi Angot
   */
export function norme (v) {
  return Math.sqrt(v.x ** 2 + v.y ** 2)
}

/**
   * Renvoie la mesure d'angle en degré
   * @param {Point} A Point sur un côté de l'angle
   * @param {Point} O Sommet de l'angle
   * @param {Point} B Point sur l'autre côté de l'angle
   * @param {integer} [precision = 2] Nombre maximal de décimales de la valeur arrondie de la mesure de l'angle
   * @example x = angle(H,E,T)
   * // x contient la mesure en degré de l'angle HET, arrondi au centième
   * @example x = angle(H,E,T,0)
   * // x contient la mesure en degré de l'angle HET, arrondi à l'unité
   * @return {number}
   * @author Rémi Angot
   */
// JSDOC Validee par EE Juin 2022
export function angle (A, O, B, precision = 2) {
  const OA = longueur(O, A)
  const OB = longueur(O, B)
  const AB = longueur(A, B)
  const v = vecteur(O, A)
  const w = vecteur(O, B)
  if (egal(v.x * w.y - v.y * w.x, 0)) { // vecteurs colinéaires à epsilon près pour éviter les effets de bords dus aux flottants.
    if (v.x * w.x > 0) return 0
    else if (v.x * w.x < 0) return 180
    else if (v.y * w.y > 0) return 0
    else return 180
  } else {
    return arrondi((Math.acos(arrondi((AB ** 2 - OA ** 2 - OB ** 2) / (-2 * OA * OB), 12)) * 180) / Math.PI, precision)
  }
}

/**
   * Convertit un nombre de degrés quelconque en une mesure comprise entre -180 et 180
   * @param {number} a Valeur en degrés dont on cherche la valeur entre -180 et 180
   * @example x = angleModulo(170)
   * // x contient 170
   * @example x = angleModulo(190)
   * // x contient -170
   * @example x = angleModulo(3690)
   * // x contient 90
   * @example x = angleModulo(180)
   * // x contient 180
   * @example x = angleModulo(-180)
   * // x contient 180
   * @return {number}
   */
// JSDOC Validee par EE Juin 2022
export function angleModulo (a) {
  while (a <= -180) a = a + 360
  while (a > 180) a = a - 360
  return a
}

/**
   * Retourne la valeur signée de la mesure d'un angle en degré
   * @param {Point} A Point sur un côté de l'angle
   * @param {Point} O Sommet de l'angle
   * @param {Point} B Point sur l'autre côté de l'angle
   * @param {integer} [precision = 2] Nombre maximal de décimales de la valeur arrondie de la mesure de l'angle orienté
   * @example x = angleOriente(H,E,T)
   * // x contient la valeur de la mesure de l'angle orienté HET, arrondie au centième
   * @example x = angleOriente(H,E,T,0)
   * // x contient la valeur de la mesure de l'angle orienté HET, arrondie à l'unité
   * @return {number}
   * @author Jean-Claude Lhote
   */
// JSDOC Validee par EE Juin 2022
export function angleOriente (A, O, B, precision = 2) {
  const A2 = rotation(A, O, 90)
  const v = vecteur(O, B); const u = vecteur(O, A2)
  return arrondi(unSiPositifMoinsUnSinon(arrondi(v.x * u.x + v.y * u.y, 10)) * angle(A, O, B), precision)
}

/**
   * Retourne la valeur la mesure d'un angle en radian
   * @param {Point} A Point sur un côté de l'angle
   * @param {Point} O Sommet de l'angle
   * @param {Point} B Point sur l'autre côté de l'angle
   * @param {integer} [precision = 2] Nombre maximal de décimales de la valeur arrondie de la mesure de l'angle orienté
   * @example x = angleradian(H,E,T)
   * // x contient la valeur de la mesure de l'angle HET en radians, arrondie au centième
   * @example x = angleradian(H,E,T,0)
   * // x contient la valeur de la mesure de l'angle HET en radians, arrondie à l'unité
   * @return {number}
   * @author Rémi Angot
   */
// JSDOC Validee par EE Juin 2022
export function angleradian (A, O, B, precision = 2) {
  const OA = longueur(O, A)
  const OB = longueur(O, B)
  const AB = longueur(A, B)
  return calcul(Math.acos(arrondi((AB ** 2 - OA ** 2 - OB ** 2) / (-2 * OA * OB), 12)), precision)
}
