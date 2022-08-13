import PremierOuPas from '../3e/3A10-1.js'
export const titre = 'Primalité ou pas'
export const dateDeModifImportante = '29/10/2021'
export { interactifReady, interactifType, amcReady, amcType } from '../3e/3A10-1.js'
/**
 * Clone de 3A10 pour les 2nde
 *
 * @author Jean-Claude Lhote
 */

export default function PremierOuPas2nde () {
  PremierOuPas.call(this)
  this.sup = 1
  this.sup2 = false
}
