import CalculDeVolumes from '../6e/6M30.js'

export const titre = 'Calculs de volumes'
export { interactifReady, interactifType } from '../6e/6M30.js'
export { amcReady, amcType } from '../6e/6M30.js'

/**
 * @author Jean-claude Lhote
 */
export default function CalculDeVolumes5e () {
  CalculDeVolumes.call(this)
  this.sup = 1
  this.titre = titre
  this.classe = 5
}
