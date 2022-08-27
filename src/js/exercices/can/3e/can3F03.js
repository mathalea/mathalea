import CalculsImagesFonctions from '../../3e/3F10-2.js'
export { interactifReady, interactifType, amcReady, amcType } from '../../3e/3F10-2.js'
export const titre = 'Calculer une image par une fonction affine'

/*!
 * @author Jean-Claude Lhote
  * Créé pendant l'été 2021
 * Référence can3F03
*/
export const uuid = 'cf55d'
export const ref = 'can3F03'
export default function CalculImageParFonctionAffine () {
  CalculsImagesFonctions.call(this)
  this.nbQuestions = 1
  this.sup = 2
  this.sup2 = 1
}
