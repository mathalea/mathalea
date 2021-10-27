import PlacerPointsAbscissesFractionnaires from '../6e/6N21.js'
export const titre = 'Utiliser les abscisses fractionnaires'
export { interactifReady, interactifType } from '../6e/6N21.js'

/**
 * Clone de 6N30-1 pour les 2nde
 *
 * @author Jean-Claude Lhote
 */
export default function PlacerPointsAbscissesFractionnaires2nde () {
  PlacerPointsAbscissesFractionnaires.call(this)
  this.sup = 5
}
