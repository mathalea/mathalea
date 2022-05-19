import Transformations from '../6e/_Transformations.js'
export { interactifReady, interactifType, amcReady, amcType } from '../6e/_Transformations.js'
export const titre = 'Trouver l’image d’un point par une transformation choisie aléatoirement'
/**
 * Transformations : trouvers un point numéroté par une des transformations du plan. Fonction générale utilisée sur tous les niveaux
 * @author Jean-Claude Lhote
 * référence 3G10-2
 */

export default function Transformations3e () {
  Transformations.call(this)
  this.sup = 4
  this.titre = titre
}
