import CalculsImagesFonctions from '../../3e/3F10-2.js'
export { interactifReady, interactifType, amcReady, amcType } from '../../3e/3F10-2.js'
export const titre = 'Calcul d’image niveau 3'

/*!
 * @author Jean-Claude Lhote
  * Créé pendant l'été 2021
 * Référence can3C04
*/
export default function CalculImageParFonctionPolynome () {
  CalculsImagesFonctions.call(this)
  this.nbQuestions = 1
  this.interactif = true
  this.sup = 3
}
