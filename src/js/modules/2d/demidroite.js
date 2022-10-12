
/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%% LES DEMI-DROITES %%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

import { ObjetMathalea2D } from '../2dGeneralites'
import { pointSurSegment } from './pointsur'
import { Segment } from './segment'

/**  Trace la demi-droite d'origine A passant par B
 * @param {Point} A Origine de la droite
 * @param {Point} B Point de la demi-droite, autre que l'origine
 * @param {string} [color = 'black'] Couleur de la demi-droite : du type 'blue' ou du type '#f15929'
 * @param {boolean} [extremites = false] Trace (ou pas) l'origine de la demi-droite
 * @property {string} color Couleur de la demi-droite. À associer obligatoirement à colorToLatexOrHTML().
 * @author Rémi Angot
 * @class
 */
// JSDOC Validee par EE Aout 2022
export function DemiDroite (A, B, color = 'black', extremites = false) {
  ObjetMathalea2D.call(this, { })
  const B1 = pointSurSegment(B, A, -10)
  this.color = color
  if (extremites) return new Segment(A, B1, this.color, '|-')
  else return new Segment(A, B1, this.color)
}

/**  Trace la demi-droite d'origine A passant par B
   * @param {Point} A
   * @param {Point} B
   * @param {string} [color='black'] Facultatif, 'black' par défaut
   * @param {boolean} [extremites = false] Trace (ou pas) l'origine de la demi-droite
   * @example demiDroite(M, N) // Trace la demi-droite d'origine M passant par N et de couleur noire
   * @example demiDroite(M, N, 'blue', true) // Trace la demi-droite d'origine M passant par N et de couleur bleue, en traçant le trait signifiant l'origine de la demi-droite
   * @author Rémi Angot
   * @return {DemiDroite}
   */
// JSDOC Validee par EE Aout 2022
export function demiDroite (A, B, color = 'black', extremites = false) {
  return new DemiDroite(A, B, color, extremites)
}
