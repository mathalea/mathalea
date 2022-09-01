import ExerciceDecomposerEnFacteursPremiers from '../5e/5A13.js'
export const titre = 'Décomposer un nombre entier en produit de (petits) facteurs premiers'
export const dateDeModifImportante = '2/11/2021'
export { interactifReady, interactifType } from '../5e/5A13.js'
/**
 * @author Guillaume Valmont
 * reference 4A11-0
 */
export const uuid = '1eaf7'
export const ref = '4A11-0'
export default function ExerciceDecomposerEnFacteursPremiers4e () {
  ExerciceDecomposerEnFacteursPremiers.call(this)
  this.titre = titre
  this.nbQuestions = 4
  this.sup = 3 // 5 facteurs par défaut
  this.sup2 = true // une multiplication par 100 une fois sur quatre
  this.besoinFormulaire4CaseACocher = ['Décomposition avec des puissances', false]
}
