import CalculDeVolumes from '../6e/6M30.js'

export const titre = 'Calculs de volumes'
export { interactifReady, interactifType } from '../6e/6M30.js'
export { amcReady, amcType } from '../6e/6M30.js'

/**
 * @author Jean-claude Lhote
 */
export default function CalculDeVolumes4e () {
  CalculDeVolumes.call(this)
  this.titre = titre
  this.sup = 1
  this.classe = 4
}
