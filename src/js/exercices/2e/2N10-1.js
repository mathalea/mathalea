import LireAbscisseDecimaleBis2d from '../6e/6N30-1.js'
export const titre = 'Lire labscisse décimale dun point repéré par une fraction'
export { interactifReady, interactifType, amcReady, amcType } from '../6e/6C10.js'
export const dateDeModifImportante = '27/10/2021'
/**
 * Clone de 6N30-1 pour les 2nde
 *
 * @author Jean-Claude Lhote
 */
export default function LireAbscisseDecimale2nde () {
  LireAbscisseDecimaleBis2d.call(this)
  this.niveau = 2
}
