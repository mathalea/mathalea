import ConstruireParSymetrie from '../6e/_Construire_par_symetrie.js'
export const titre = 'Construire le symétrique d’un point par rapport à une droite (cas simples)'

/**
 * Référence 6G24-1
 * @author Jean-Claude Lhote
 */
export default function SymetrieAxialePoint6e () {
  ConstruireParSymetrie.call(this)
  this.titre = titre
  this.figure = false
  this.sup = 0
}
