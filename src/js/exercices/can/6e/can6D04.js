import ConversionHeuresMinutes from '../../6e/6D13.js'
export const titre = 'Convertir minutes heures'
export { interactifReady, interactifType, amcReady, amcType } from '../../6e/6D13.js'

/*!
 * Alias de 6D13.js
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6D04
 */
export default function ConvertirMinutesHeures () {
  ConversionHeuresMinutes.call(this, true)
  this.nbQuestions = 1
  this.correctionDetaillee = true
}
