import ExerciceEquationASolutionEntiere from '../4e/4L20-0.js'
export { interactifReady, interactifType, amcReady, amcType } from '../4e/4L20-0.js'
export const titre = 'Résoudre une équation niveau 2'

/*!
 * @author Jean-Claude Lhote
 */
export default function UneEquationMoyenne () {
  ExerciceEquationASolutionEntiere.call(this)
  this.nbQuestions = 1
  this.interactif = true
  this.sup = false
  this.sup2 = 2
}
