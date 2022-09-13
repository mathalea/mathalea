import ExerciceDecomposerEnFacteursPremiers from '../5e/5A13.js'
export const titre = 'Décomposition en facteurs premiers'
export const dateDeModifImportante = '2/11/2021'
export { interactifReady, interactifType } from '../5e/5A13.js'
/**
 * Clone de 5A13 pour les 2nde
 *
 * @author Jean-Claude Lhote
 */

export const uuid = 'c14e8'
export const ref = '2N20-5'
export default function ExerciceDecomposerEnFacteursPremiers2nde () {
  ExerciceDecomposerEnFacteursPremiers.call(this)
  this.level = 2
  this.sup3 = true
  this.besoinFormulaireNumerique = false
  this.besoinFormulaire2CaseACocher = false
}
