import Construire_par_Symetrie from '../6e/_Construire_par_symetrie.js';
/**
 * @Auteur Jean-Claude Lhote
 * Fonction générale pour les exercices de construction de symétriques (centrale/axiale et points/triangles)
 * références  6G24-1, 6G24-2, 5G10-1, 5G10-2, 5G11-1 et 5G11-2
 * Permet une sortie html/pdf sur petits carreaux/gros carreaux/papier blanc
 */
export default function Construire_par_symétrie_centrale_figure() {
	Construire_par_Symetrie.call(this);
	this.titre = "Construire l'image d'une figure par symétrie centrale";
	this.sup = 2;
	this.sup2 = 1;
	this.figure = true
}