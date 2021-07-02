import CalculDeVolumes from '../6e/6M30.js'

export const titre = 'Calculs de volumes'
export const interactifReady = true
export const interactifType = ['qcm', 'mathLive']
export const amcReady = true
export const amcType = 'qcmMono'

/**
 * @author Jean-claude Lhote
 */
export default function CalculDeVolumes5e () {
  CalculDeVolumes.call(this)
  this.sup = 1
  this.amcReady = amcReady
  this.amcType = amcType
  this.interactifReady = interactifReady
  this.interactifType = ['qcm', 'mathLive']
  this.titre = titre
  this.classe = 5
}
