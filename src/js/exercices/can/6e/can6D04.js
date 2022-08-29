import ConversionHeuresMinutesOuMinutesEtSecondes from '../../6e/6D13.js'
export const titre = 'Convertir minutes<->heures ou secondes<->minutes'
export { interactifReady, interactifType, amcReady, amcType } from '../../6e/6D13.js'

/*!
 * Alias de 6D13.js
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6D04
 */
export const uuid = 'd34e5'
export const ref = 'can6D04'
export default function ConvertirMinutesHeures () {
  ConversionHeuresMinutesOuMinutesEtSecondes.call(this, true)
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.correctionDetaillee = true
}
