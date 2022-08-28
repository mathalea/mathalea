import FactoriserParNombreOux from '../3e/3L11-4.js'
export const titre = 'Factoriser une expression littérale'
export { interactifReady, interactifType, amcReady, amcType } from '../3e/3L11-4.js'

/**
 * @author Guillaume Valmont
 * reference 4L11
 * Date de publication : 13/08/2021
 */
export const uuid = 'dd1c9'
export const ref = '4L11'
export default function Factoriser4e () {
  FactoriserParNombreOux.call(this)
  this.titre = titre
  this.sup = 4
  this.nbQuestions = 8
}
