import ExerciceDecomposerEnFacteursPremiers from '../../5e/5A13.js'
export { interactifReady, interactifType } from '../../5e/5A13.js'
export const titre = 'Décomposition en produit de facteurs premiers niveau 1'

/*!
 * @author Jean-Claude Lhote
 */
export default function DecomposerFacteursPremierSimple () {
  ExerciceDecomposerEnFacteursPremiers.call(this)
  this.nbQuestions = 1
  this.interactif = true
  this.sup2 = false
  this.sup2 = 1
}
