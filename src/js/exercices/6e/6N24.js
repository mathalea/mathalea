import ExerciceConversions from './_Exercice_conversions.js'
export const titre = 'Utiliser les préfixes multiplicateurs et diviseurs (milli à kilo)'

/**
 * @author Rémi Angot
 * référence 6N14
 *
 */
export default function Exercice6N24 () {
  ExerciceConversions.call(this)
  this.sup = 3
  this.titre = titre
  this.correction_avec_des_fractions = true
  this.spacingCorr = 2
}
