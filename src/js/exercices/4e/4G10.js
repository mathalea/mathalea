import { choice } from '../../modules/outils.js'
import Transformations from '../6e/_Transformations.js'
export const titre = 'Trouver l\'image d\'un point par une symétrie axiale ou centrale ou par une translation'
export { interactifReady, interactifType, amcReady, amcType } from '../6e/_Transformations.js'

/**
 * Transformations : trouver un point numéroté par une des transformations sauf rotation et homothetie
 * @author Jean-Claude Lhote
 * référence 4G10
 * Pas de version LaTeX
 */
export const uuid = 'cf7ce'
export const ref = '4G10'
export default function Transformations4e () {
  Transformations.call(this)
  this.sup = choice(['1-7-8', '2-7-8', '3-7-8', '4-7-8'])
  this.titre = titre
}
