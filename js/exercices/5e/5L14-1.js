import Ecrire_une_expression_numerique from './_Ecrire_une_expression_numerique.js'
/**
 * @Auteur Jean-Claude Lhote
  * Référence 5L14-1
*/
export default function Calculer_une_expression_litterale() {
	Ecrire_une_expression_numerique.call(this);
	this.version = 4;
	this.titre = "Calculer une expression littérale pour les valeurs données en détaillant les calculs";
	this.litteral = true;
}
