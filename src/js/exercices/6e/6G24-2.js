import Construire_par_Symetrie from '../6e/_Construire_par_symetrie.js';
export const titre = 'Construire le symétrique d’une figure par rapport à une droite (cas simples)'

/**
 * Référence 6G24-2
 * @Auteur Jean-Claude Lhote
 */
export default function Symetrie_axiale_figure_6e() {
	Construire_par_Symetrie.call(this);
	this.titre = titre;
	this.figure = true;
	this.sup = 0;
}
