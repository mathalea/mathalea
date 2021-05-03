import Construire_par_Symetrie from '../6e/_Construire_par_symetrie.js';
export const titre = 'Construire le symétrique d’un point par symétrie centrale'

/**
 * Référence 6G11-2
 * @Auteur Jean-Claude Lhote
 */
export default function Symetrie_centrale_point() {
	Construire_par_Symetrie.call(this);
	this.titre = titre;
	this.figure = true;
	this.sup = 2;
}
