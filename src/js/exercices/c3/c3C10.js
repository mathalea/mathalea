import AdditionsSoustractionsMultiplicationsPosees from '../6e/6C10.js'
export const titre = 'Additions, soustractions et multiplications posées de nombres entiers'
export { interactifReady, interactifType, amcReady, amcType } from '../6e/6C10.js'
/**
 *Clone de 6C10 pour les CM1-CM2
 *
 * @author Jean-Claude Lhote
 */
export const uuid = 'fa836'
export const ref = 'c3C10'
export default function OperationsPosees () {
  AdditionsSoustractionsMultiplicationsPosees.call(this)
  this.nbQuestions = 3
}
