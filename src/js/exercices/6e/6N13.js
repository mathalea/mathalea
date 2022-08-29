import ExerciceConversions from './_Exercice_conversions.js'

export const titre = 'Convertir des longueurs, masses, capacités, prix ou unités informatiques'
export { interactifReady, interactifType, amcReady, amcType } from './_Exercice_conversions.js'

/**
 * @author Rémi Angot
 * référence 6N13
 * Relecture : Novembre 2021 par EE
 */
export const uuid = '3eae0'
export const ref = '6N13'
export default function Exercice6N13 () {
  ExerciceConversions.call(this)
  this.sup = 1
  this.nbQuestions = 5
}
