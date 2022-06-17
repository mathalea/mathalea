import Transformations from '../6e/_Transformations.js'
export const titre = 'Trouver l\'image d\'un point par une symétrie axiale ou centrale ou par une translation'
export { interactifReady, interactifType, amcReady, amcType } from '../6e/_Transformations.js'

/**
 * Transformations : trouvers un point numéroté par une des transformations sauf rotation et homothetie
 * @author Jean-Claude Lhote
 * référence 4G10
 * Pas de version LaTeX
 */
export default function Transformations4e () {
  Transformations.call(this)
  this.sup = 3
  this.titre = titre
}
