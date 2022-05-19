import Transformations from '../6e/_Transformations.js'
export const titre = 'Trouver limage dun point par une symétrie axiale ou centrale'
export { interactifReady, interactifType, amcReady, amcType } from '../6e/_Transformations.js'

/**
 * Transformations : trouvers un point numéroté par une des transformations du plan. Fonction générale utilisée sur tous les niveaux
 * @author Jean-Claude Lhote
 * référence 5G11
 * Pas de version LaTeX
 */
export default function Transformations5e () {
  Transformations.call(this)
  this.sup = 2
  this.titre = titre
}
