import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes,ecriture_algebrique,lettre_depuis_chiffre,printlatex} from "/modules/outils.js"


/**
* Réduire des expressions de la forme ax+bx
*
* @Auteur Rémi Angot
* 5L13
*/
export default function Reduction_ax_bx() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Réduire une expression de la forme $ax+bx$";
	this.consigne = "Réduire les expressions suivantes, si cela est possible.";
	this.nb_questions = 5;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = ['ax+bx'];
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		for (let i = 0, texte, texte_corr, a, b, c, d, cpt = 0; i < this.nb_questions && cpt < 50;) {
			a = randint(-11, 11, 0);
			b = randint(-11, 11, [0, a]);
			c = randint(-11, 11, [0]);
			d = randint(-11, 11, 0);
			switch (liste_type_de_questions[i]) {
				case 'ax+bx':
					texte = `$${lettre_depuis_chiffre(i + 1)}=${printlatex(`${a}*x+(${b}*x)`)}$`;
					texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${printlatex(`${a}*x+(${b}*x)`)}=(${a}${ecriture_algebrique(b)})\\times x=${printlatex(`${a + b}x`)}$`;
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
