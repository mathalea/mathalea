import CalculDeVolumes from '../6e/6M30.js'

export const titre = 'Calculs de volumes'
export const amcReady = true
export const amcType = 'qcmMono' // type de question AMC
export const interactifReady = true
export const interactifType = ['qcm', 'mathLive']

/**
 * @author Jean-claude Lhote
 */
export default function CalculDeVolumes3e () {
  CalculDeVolumes.call(this)
  this.titre = titre
  this.amcReady = amcReady
  this.amcType = amcType
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.sup = 1
  this.classe = 3
}
