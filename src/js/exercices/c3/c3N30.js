import ExerciceConversions from '../6e/_Exercice_conversions.js'
export const titre = "Conversion d'unités des préfixes k,h,da vers unité de référence"
export { interactifReady, interactifType, amcReady, amcType } from '../6e/_Exercice_conversions.js'

/**
 * Conversion vers unité de référence sens multiplication
 * ref c3N30
 * Publié le 13/11/2020
 * @author Jean-Claude Lhote
 */
export default function ConversionsC3 () {
  ExerciceConversions.call(this)
  this.sup = 1
  this.sup2 = false
  this.nbQuestions = 5
}
