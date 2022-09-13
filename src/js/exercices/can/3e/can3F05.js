import CalculsImagesFonctions from '../../3e/3F10-2.js'
export { interactifReady, interactifType, amcReady, amcType } from '../../3e/3F10-2.js'
export const titre = 'Calculer un antécédent par fonction affine'

/*!
 * @author Jean-Claude Lhote
  * Créé pendant l'été 2021
 * Référence can3C04
*/
export const uuid = '83a8a'
export const ref = 'can3F05'
export default function CalculAntecedentAffine () {
  CalculsImagesFonctions.call(this)
  this.nbQuestions = 1
  this.sup = 2
  this.sup2 = 2
}
