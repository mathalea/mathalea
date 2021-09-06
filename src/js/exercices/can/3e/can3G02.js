import Transformations from '../../6e/_Transformations.js'
export { interactifReady, interactifType } from '../../6e/_Transformations.js'
export const titre = 'Image de point par transformation 3e'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can5C10
 */
export default function ImageD1Point () {
  Transformations.call(this)
  this.nbQuestions = 1
  this.interactif = true
  this.can = true
  this.sup = 4
}
