import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,tex_fraction} from "/modules/outils.js"
/**
 * Factoriser a²-b²
* @auteur Jean-Claude Lhote
* 3L12
*/
export default function Factoriser_Identites_remarquables3() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Factoriser a²-b²";
	this.consigne = "Factoriser les expressions suivantes.";
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing = 1;
	this.spacing_corr = 1;
	this.nb_questions = 5;
	this.sup = 2;

	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let liste_fractions = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5],
		[1, 6], [5, 6], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [1, 8], [3, 8], [5, 8], [7, 8],
		[1, 9], [2, 9], [4, 9], [5, 9], [7, 9], [8, 9], [1, 10], [3, 10], [7, 10], [9, 10]];
		for (let i = 0, texte, texte_corr, cpt = 0, a, b, ns, ds, fraction = []; i < this.nb_questions && cpt < 50;) {
			if (this.sup == 1) {
				a = randint(1, 9); // coef de x est égal à 1
				texte = `$x^2-${a * a}$`; // (x-a)(x+a)
				texte_corr = `$x^2-${a * a}=x^2-${a}^2=(x-${a})(x+${a})$`;
			}
			else if (this.sup == 2) {
				a = randint(1, 9); // (bx-a)(bx+a) avec a et b entier positifs entre 1 et 9,  b différent de 1
				b = randint(2, 9);
				texte = `$${b * b}x^2-${a * a}$`; // b>1
				texte_corr = `$${b * b}x^2-${a * a}=(${b}x)^2-${a}^2=(${b}x-${a})(${b}x+${a})$`;
			}
			else { //  (bx-a)(bx+a) avec a entier et b rationnel simple
				a = randint(1, 9);
				fraction = choice(liste_fractions);
				ns = fraction[0];
				ds = fraction[1];
				texte = `$${tex_fraction(ns * ns, ds * ds)}x^2-${a * a}$`; // b>1
				texte_corr = `$${tex_fraction(ns * ns, ds * ds)}x^2-${a * a}=\\left(${tex_fraction(ns, ds)}x\\right)^2-${a}^2=\\left(${tex_fraction(ns, ds)}x-${a}\\right)\\left(${tex_fraction(ns, ds)}x+${a}\\right)$`;

			}

			if (this.liste_questions.indexOf(texte) == -1) {
				// Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	};
	this.besoin_formulaire_numerique = ['Niveau de difficulté', 3, '1 : Coefficient de x égal à 1\n 2 : Coefficient de x supérieur à 1\n 3 : Coefficient de x rationnel'];
}
