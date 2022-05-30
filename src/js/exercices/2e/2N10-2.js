import PlacerPointsSurAxe from '../6e/6N30-2.js'
export const titre = 'Placer un point d\'abscisse décimale'
export { interactifReady, interactifType, amcReady, amcType } from '../6e/6N30-2.js'
export const dateDeModifImportante = '27/10/2021'
/**
 * Clone de 6N30-2 pour les 2nde
 *
 * @author Jean-Claude Lhote
 */
export default function PlacerPointsSurAxe2nde () {
  PlacerPointsSurAxe.call(this)
  this.sup = 5
}
