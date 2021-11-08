import Transformations from '../../6e/_Transformations.js'
export { interactifReady, interactifType, amcType, amcReady } from '../../6e/_Transformations.js'
export const titre = 'Symétrique de point 6e'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6G01
 */
export default function SymetriqueD1Point () {
  Transformations.call(this)
  this.nbQuestions = 1
  this.can = true
  this.sup = 1
}
