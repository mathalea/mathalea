import Ecrire_une_expression_numerique from './_Ecrire_une_expression_numerique.js'

/**
 * @Auteur Jean-Claude Lhote
 * Référence 5C11
 */
export default function Traduire_une_phrase_par_une_expression() {
	Ecrire_une_expression_numerique.call(this)
	this.version = 1
	this.sup = false
	this.sup2 = false
	this.titre = "Traduire une phrase par une expression";
}
