import ExerciceConversions from '../6e/_Exercice_conversions.js'
export const titre = "Conversion d'unités des préfixes k,h,da vers unité de référence"
export { interactifReady, interactifType, amcReady, amcType } from '../6e/_Exercice_conversions.js'

// Gestion de la date de publication initiale
export const dateDePublication = '13/11/2020'

/**
 * Conversion vers unité de référence sens multiplication
 * ref c3N30
 * @author Jean-Claude Lhote
 * Relecture : Novembre 2021 par EE
 */
export const uuid = 'c9ba6'
export const ref = 'c3N30'
export default function ConversionsC3 () {
  ExerciceConversions.call(this)
  this.sup = 1
  this.sup2 = false
  this.nbQuestions = 5
}
