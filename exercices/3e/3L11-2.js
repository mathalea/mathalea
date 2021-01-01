import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes,ecriture_parenthese_si_negatif,lettre_depuis_chiffre,printlatex} from "/modules/outils.js"
/**
* Réduire des expressions lorsque c'est possible
*
* @Auteur Rémi Angot
* 3L11-2
*/
export default function Reduction_si_possible() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Réduire une expression";
	this.consigne = "Réduire les expressions suivantes, si cela est possible.";
	this.nb_questions = 5;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = ['ax+b', 'ax+bx', 'ax+bx2', 'ax*b', 'b*ax', 'ax+b+cx+d', 'b+ax+d+cx', 'ax+b+x'];
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		for (let i = 0, texte, texte_corr, a, b, c, d, cpt = 0; i < this.nb_questions && cpt < 50;) {
			a = randint(-11, 11, 0);
			b = randint(-11, 11, [0, a]);
			c = randint(-11, 11, [0]);
			d = randint(-11, 11, 0);
			switch (liste_type_de_questions[i]) {
				case 'ax+b':
					texte = `$${lettre_depuis_chiffre(i + 1)}=${printlatex(`${a}*x+(${b})`)}$`;
					texte_corr = texte;
					break;
				case 'ax+bx':
					texte = `$${lettre_depuis_chiffre(i + 1)}=${printlatex(`${a}*x+(${b}*x)`)}$`;
					texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${printlatex(`${a}*x+(${b}*x)`)}=${printlatex(`${a + b}x`)}$`;
					break;
				case 'ax+bx2':
					texte = `$${lettre_depuis_chiffre(i + 1)}=${printlatex(`${a}*x+(${b}*x^2)`)}$`;
					texte_corr = texte;
					break;
				case 'ax*b':
					texte = `$${lettre_depuis_chiffre(i + 1)}=${printlatex(`${a}*x`)}\\times ${ecriture_parenthese_si_negatif(b)}$`;
					texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${printlatex(`${a}*x`)}\\times ${ecriture_parenthese_si_negatif(b)}=${printlatex(`${a * b}*x`)}$`;
					break;
				case 'b*ax':
					a = randint(1, 11);
					texte = `$${lettre_depuis_chiffre(i + 1)}=${b}\\times ${printlatex(`${a}*x`)}$`;
					texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${b}\\times ${printlatex(`${a}*x`)}=${printlatex(`${b * a}*x`)}$`;
					break;
				case 'ax+b+cx+d':
					texte = `$${lettre_depuis_chiffre(i + 1)}=${printlatex(`${a}*x+(${b})+(${c})*x+(${d})`)}$`;
					texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${printlatex(`${a}*x+(${b})+(${c})*x+(${d})`)}`;
					if (b + d == 0) {
						if (a + c == 0) {
							texte_corr += `=0$`;
						} else {
							texte_corr += `=${printlatex(`${a + c}*x`)}$`;
						}
					} else {
						if (a + c == 0) {
							texte_corr += `=${b + d}$`;
						} else {
							texte_corr += `=${printlatex(`${a + c}*x+(${b + d})`)}$`;
						}
					}
					break;
				case 'b+ax+d+cx':
					texte = `$${lettre_depuis_chiffre(i + 1)}=${printlatex(`${b}+(${a})*x+(${d})+(${c})*x`)}$`;
					texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${printlatex(`${b}+(${a})*x+(${d})+(${c})*x`)}`;
					if (b + d == 0) {
						if (a + c == 0) {
							texte_corr += `=0$`;
						} else {
							texte_corr += `=${printlatex(`${a + c}*x`)}$`;
						}
					} else {
						if (a + c == 0) {
							texte_corr += `=${b + d}$`;
						} else {
							texte_corr += `=${printlatex(`${a + c}*x+(${b + d})`)}$`;
						}
					}
					break;
				case 'ax+b+x':
					a = randint(-11, 11, [0, -1]);
					texte = `$${lettre_depuis_chiffre(i + 1)}=${printlatex(`${a}*x+(${b})+x`)}$`;
					texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${printlatex(`${a}*x+(${b})+x`)}=${printlatex(`${a + 1}*x+(${b})`)}$`;
					break;

			}

			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	};
}
