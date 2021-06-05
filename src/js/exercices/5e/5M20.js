import CalculDeVolumes from '../6e/6M30.js'

export const titre = 'Calculs de volumes'
export const interactifReady = true
export const interactifType = ['qcm', 'mathLive']

/**
 * @author Jean-claude Lhote
 */
export default function CalculDeVolumes5e () {
  CalculDeVolumes.call(this)
  this.sup = 1
  this.interactifReady = interactifReady
  this.titre = titre
  this.classe = 5
}
