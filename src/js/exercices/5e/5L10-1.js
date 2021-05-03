import Ecrire_une_expression_numerique from './_Ecrire_une_expression_numerique.js'

export const titre = 'Traduire une phrase par une expression'

/**
 * @Auteur Jean-Claude Lhote
 * Référence 5L10-1
 */
export default function Traduire_une_phrase_par_une_expression_litterale() {
	Ecrire_une_expression_numerique.call(this)
	this.version = 1
	this.titre = titre;
	this.sup = false
	this.sup2 = false
	this.litteral = true
}
