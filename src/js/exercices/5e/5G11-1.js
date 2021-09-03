import ConstruireParSymetrie from '../6e/_Construire_par_symetrie.js'
export const titre = 'Construire le symétrique d’un point par symétrie centrale'

/**
 * Référence 6G11-2
 * @author Jean-Claude Lhote
 */
export default function SymetrieCentralePoint () {
  ConstruireParSymetrie.call(this)
  this.figure = true
  this.sup = 2
}
