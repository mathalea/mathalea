import ExerciceDecomposerEnFacteursPremiers from '../../5e/5A13.js'
export { interactifReady, interactifType } from '../../5e/5A13.js'
export const titre = 'Décomposer en produit de facteurs premiers'

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
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.consigne = `Décomposer en produit de facteurs premiers :<br>
  (facteurs dans lordre croissant)`
}
