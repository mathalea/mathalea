import DenombrerCubes from '../../6e/6G43.js'
export { interactifReady, interactifType } from '../../6e/6G43.js'
export const titre = 'Compter les cubes'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can5C10
 */
export default function CompterLesCubesManquant () {
  DenombrerCubes.call(this)
  this.nbQuestions = 1
  this.sup2 = 1
  this.sup = 1
}
