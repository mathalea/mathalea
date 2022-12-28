import { choice } from '../../modules/outils.js'
import Transformations from '../6e/_Transformations.js'
export const titre = 'Trouver l\'image d\'un point par une symétrie axiale ou centrale'
export { interactifReady, interactifType, amcReady, amcType } from '../6e/_Transformations.js'

/**
 * Transformations : trouvers un point numéroté par une des transformations du plan. Fonction générale utilisée sur tous les niveaux
 * @author Jean-Claude Lhote
 * référence 5G11
 * Pas de version LaTeX
 */
export const uuid = 'ec32b'
export const ref = '5G11'
export default function Transformations5e () {
  Transformations.call(this)
  this.sup = choice(['1-3-7', '1-4-7', '2-3-7', '2-4-7'])
  this.titre = titre
}
