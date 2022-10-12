
/*********************************************/
/** ************* Parallélogrammes ***********/
/*********************************************/

import { randint } from '../outils'
import { pointAdistance, pointSurSegment } from './pointSur'
import { polygoneAvecNom } from './polygone'
import { homothetie, rotation, translation } from './transformations'
import { vecteur } from './vecteur'

/**
 * fonction qui retourne le parallélogramme ABCD dont on donne les 3 premiers points A, B et C
 *
 * @param {string} NOM
 * @param {objet} A
 * @param {objet} B
 * @param {objet} C
 * @return {polygoneAvecNom}
 */
export function parallelogramme3points (NOM, A, B, C, color = 'black') {
  const D = translation(A, vecteur(B, C), NOM[3])
  A.nom = NOM[0]
  B.nom = NOM[1]
  C.nom = NOM[2]
  return polygoneAvecNom([A, B, C, D], color)
}
/**
   * parallelogramme2points1hauteur(A,B,5) renvoie un parallélogramme ABCD de base [AB] et de hauteur h
   * parallelogramme2points1hauteur(A,7,5) renvoie un parallélogramme ABCD de base 7cm (le point B est choisi sur le cercle de centre A et de rayon 7cm) et de hauteur h
   *
   * @param {String} NOM
   * @param {objet} A
   * @param {objet} B
   * @param {number} h
   * @return {polygoneAvecNom}
   */
export function parallelogramme2points1hauteur (NOM, A, B, h, color = 'black') {
  if (typeof B === 'number') {
    B = pointAdistance(A, B, randint(-180, 180))
  }
  A.nom = NOM[0]
  B.nom = NOM[1]
  let H = rotation(B, A, 90)
  H = pointSurSegment(A, H, h)
  const D = translation(H, homothetie(vecteur(A, B), A, randint(-4, 4, 0) / 10), NOM[3])
  const C = translation(D, vecteur(A, B), NOM[2])
  return polygoneAvecNom([A, B, C, D], color)
}
