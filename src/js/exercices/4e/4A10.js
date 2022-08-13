import PremierOuPas from '../3e/3A10-1.js'
export const titre = 'Nombre premier ou pas'
export { interactifReady, interactifType, amcReady, amcType } from '../3e/3A10-1.js'

/**
 * @author Guillaume Valmont
 * reference 4A10
 */
export default function PremierOuPas4e () {
  PremierOuPas.call(this)
  this.titre = titre
  this.sup2 = false
}
