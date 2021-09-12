import ExerciceDecomposerEnFacteursPremiers from '../../5e/5A13.js'
export { interactifReady, interactifType } from '../../5e/5A13.js'
export const titre = 'Décomposition en produit de facteurs premiers niveau 1'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can5C10
 */
export default function DecomposerFacteursPremierSimple () {
  ExerciceDecomposerEnFacteursPremiers.call(this)
  this.nbQuestions = 1
    this.sup2 = false
  this.sup = 1
}
