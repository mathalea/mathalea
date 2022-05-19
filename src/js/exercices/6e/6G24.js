import Transformations from './_Transformations.js'
export const titre = 'Trouver limage dun point par une symétrie axiale'
export { interactifReady, interactifType, amcReady, amcType } from '../6e/_Transformations.js'

/**
 * Transformations : trouvers un point numéroté par une des transformations du plan. Fonction générale utilisée sur tous les niveaux
 * @author Jean-Claude Lhote
 * référence 6G24
 * Pas de version LaTeX
 * Relecture : Novembre 2021 par EE
 */
export default function Transformations6e () {
  Transformations.call(this)
  this.sup = 1
  this.titre = titre
}
