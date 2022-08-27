import PuissancesEncadrement from '../4e/4C30-1.js'
export const titre = 'Encadrer avec des puissances de 10'
export const dateDeModifImportante = '2/11/2021'
export { interactifReady, interactifType } from '../4e/4C30-1.js'
/**
 * Clone de 4C30-1 pour les 2nde
 *
 * @author Jean-Claude Lhote
 */

export const uuid = '8f56e'
export const ref = '2N12-2'
export default function PuissancesEncadrement2nde () {
  PuissancesEncadrement.call(this)
  this.level = 2
  this.besoinFormulaireNumerique = false
}
