import PremierOuPas from '../3e/3A11.js'
export const titre = 'Nombre premier ou pas'
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = true
export const amcType = 'qcmMono'

/**
 * @author Guillaume Valmont
 * reference 4A10
 */
export default function PremierOuPas4e () {
  PremierOuPas.call(this)
  this.titre = titre
  this.sup2 = false
}
