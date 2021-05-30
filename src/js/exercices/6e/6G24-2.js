import ConstruireParSymetrie from '../6e/_Construire_par_symetrie.js'
export const titre = 'Construire le symétrique d’une figure par rapport à une droite (cas simples)'

/**
 * Référence 6G24-2
 * @author Jean-Claude Lhote
 */
export default function SymetrieAxialeFigure6e () {
  ConstruireParSymetrie.call(this)
  this.titre = titre
  this.figure = true
  this.sup = 0
}
