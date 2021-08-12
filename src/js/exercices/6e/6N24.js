import ExerciceConversions from './_Exercice_conversions.js'
export const titre = 'Utiliser les préfixes multiplicateurs et diviseurs (milli à kilo)'
export { interactifReady, interactifType, amcReady, amcType } from './_Exercice_conversions.js'

/**
 * @author Rémi Angot
 * référence 6N14
 *
 */
export default function Exercice6N24 () {
  ExerciceConversions.call(this)
  this.sup = 3
  this.correction_avec_des_fractions = true
  this.spacingCorr = 2
}
