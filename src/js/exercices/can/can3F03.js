import CalculsImagesFonctions from '../3e/3F10-2.js'
export { interactifReady, interactifType, amcReady, amcType } from '../3e/3F10-2.js'
export const titre = 'Calcul d’image ou d’antécédent niveau 2'

/*!
 * @author Jean-Claude Lhote
 */
export default function CalculImageParFonctionAffine () {
  CalculsImagesFonctions.call(this)
  this.nbQuestions = 1
  this.interactif = true
  this.sup = 2
}
