import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,egal,randint,combinaison_listes,printlatex} from "/modules/outils.js"
/**
 * Développer des expressions de la forme(ax+ou-b)(cx+ou-d)
* @auteur Jean-Claude Lhote
* 3L11-1
*/
export default function Double_distributivite() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Utiliser la double distributivité";
	this.consigne = "Développer et réduire les expressions suivantes.";
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing = 1;
	this.spacing_corr = 1;
	this.nb_questions = 5;
	this.sup = 1;

	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let type_de_questions_disponibles = [1, 2];
		if (this.sup == 2) {
			type_de_questions_disponibles = [3, 4];
		}
		if (this.sup == 3) {
			type_de_questions_disponibles = [1, 2, 3, 4];
		}


		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
		for (let i = 0, texte, texte_corr, cpt = 0, a, b, c, d, type_de_questions; i < this.nb_questions && cpt < 50;) {
			type_de_questions = liste_type_de_questions[i];
			a = randint(2, 9);
			b = randint(2, 9);
			c = randint(2, 9, [a]);
			d = randint(2, 9, [b]);
			switch (type_de_questions) {
				case 1: //(x+b)(x+d)
					b = randint(2, 10);
					d = randint(2, 12);
					texte = `$(x+${b})(x+${d})$`;
					texte_corr = `$(x+${b})(x+${d})=x^2+${b}x+${d}x+${b * d}=x^2+${b + d}x+${b * d}$`;
					break;
				case 2: //(ax+b)(cx+d)
					texte = `$(${a}x+${b})(${c}x+${d})$`;
					texte_corr = `$(${a}x+${b})(${c}x+${d})=${a * c}x^2+${a * d}x+${b * c}x+${b * d}=${a * c}x^2+${a * d + b * c}x+${b * d}$`;
					break;
				case 3: //(ax-b)(cx+d)
					texte = `$(${a}x-${b})(${c}x+${d})$`;
					if (egal(a * d - b * c, 0))
						texte_corr = `$(${a}x-${b})(${c}x+${d})=${a * c}x^2+${d * a}x-${b * c}x-${b * d}=${printlatex(`${a * c}*x^2-${b * d}`)}$`;
					else
						texte_corr = `$(${a}x-${b})(${c}x+${d})=${a * c}x^2+${d * a}x-${b * c}x-${b * d}=${printlatex(`${a * c}*x^2+(${d * a - b * c})*x-${b * d}`)}$`;
					break;
				case 4: //(ax-b)(cx-d)
					texte = `$(${a}x-${b})(${c}x-${d})$`;
					texte_corr = `$(${a}x-${b})(${c}x-${d})=${a * c}x^2-${a * d}x-${b * c}x+${b * d}=${a * c}x^2-${a * d + b * c}x+${b * d}$`;
					break;
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
	this.besoin_formulaire_numerique = ['Niveau de difficulté', 3, '1 : (x+a)(x+b) et (ax+b)(cx+d)\n 2 : (ax-b)(cx+d) et (ax-b)(cx-d)\n 3 : Tous les types'];
}
