import ExerciceConversions from './_Exercice_conversions.js'

export const titre = 'Conversions de longueurs, masses, contenance, prix ou unités informatiques'
export { interactifReady, interactifType, amcReady, amcType } from './_Exercice_conversions.js'

/**
 * @author Rémi Angot
 * référence 6N13
 * Relecture : Novembre 2021 par EE
 */
export default function Exercice6N13 () {
  ExerciceConversions.call(this)
  this.sup = 1
}
