import CalculDeVolumes from '../6e/6M30.js'

export const titre = 'Calculs de volumes'
export const interactifReady = true
export const interactifType = ['qcm', 'mathLive']

/**
 * @author Jean-claude Lhote
 */
export default function CalculDeVolumes_4e () {
  CalculDeVolumes.call(this)
  this.titre = titre
  this.interactifReady = interactifReady
  this.sup = 1
  this.classe = 4
}
