import Ecrire_une_expression_numerique from './_Ecrire_une_expression_numerique.js'

export const titre = 'Traduire une phrase par une expression et la calculer'

/**
 * @Auteur Jean-Claude Lhote
 * Référence 5L14-3
 */
export default function Traduire_une_phrase_par_une_expression_litterale_et_calculer() {
	Ecrire_une_expression_numerique.call(this)
	this.version = 3
	this.titre = titre;
	this.litteral = true
}