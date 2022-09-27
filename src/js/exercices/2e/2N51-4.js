import ExerciceEquation1 from '../4e/4L20.js'
export const titre = 'Équations du premier degré'
export { interactifReady, interactifType } from '../4e/4L20.js'
export { amcReady, amcType } from '../4e/4L20.js'

/**
 * Clone de 4L20 pour les 2nde
 *
 * @author Sébastien LOZANO
 */
export const uuid = 'd02da'
export const ref = '2N51-4'
export default function ExerciceEquation12nde () {
  ExerciceEquation1.call(this)
  this.sup = true
  this.sup2 = 4
}
