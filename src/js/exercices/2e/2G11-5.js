import CalculDeVolumes from '../6e/6M30.js'
export const titre = 'Calculs de volumes'
export { interactifReady, interactifType } from '../6e/6M30.js'
export { amcReady, amcType } from '../6e/6M30.js'

/**
 * Clone de 6M30 pour les 2nde
 *
 * @author Sébastien LOZANO
 */
export default function CalculDeVolumes2nde () {
  CalculDeVolumes.call(this)
  this.titre = titre
  this.sup = 1
  this.classe = 3
}
