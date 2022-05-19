import ExerciceEquationASolutionEntiere from '../../4e/4L20-0.js'
export { interactifReady, interactifType, amcReady, amcType } from '../../4e/4L20-0.js'
export const titre = 'Résoudre une équation ax+b=cx+d'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can4L03
 */
export default function UneEquationDifficile () {
  ExerciceEquationASolutionEntiere.call(this)
  this.nbQuestions = 1
  this.correctionDetaillee = false
  this.sup = false
  this.sup2 = 3
  this.spacingCorr = 1
  this.consigne = 'Résoudre léquation :'
}
