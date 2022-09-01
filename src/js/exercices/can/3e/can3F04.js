import CalculsImagesFonctions from '../../3e/3F10-2.js'
export { interactifReady, interactifType, amcReady, amcType } from '../../3e/3F10-2.js'
export const titre = 'Calculer un antécédent par une fonction linéaire'

/*!
 * @author Jean-Claude Lhote
  * Créé pendant l'été 2021
 * Référence can3C04
*/
export const uuid = '4b600'
export const ref = 'can3F04'
export default function CalculAntecedentLineaire () {
  CalculsImagesFonctions.call(this)
  this.nbQuestions = 1
  this.sup = 1
  this.sup2 = 2
}
