import ConstruireParSymetrie from '../6e/_Construire_par_symetrie.js'

export const titre = 'Construire le symétrique d’une figure par rapport à une droite'

/**
 * Référence 5G10-2
 * @author Jean-Claude Lhote
 */
export default function SymetrieAxialeFigure5e () {
  ConstruireParSymetrie.call(this)
  this.figure = true
  this.sup = 1
}
