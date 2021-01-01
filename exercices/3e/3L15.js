import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes} from "/modules/outils.js"
/**
 * Résoudre une équation de type x²=a
* @auteur Jean-Claude Lhote
* 3L15
*/
export default function Resoudre_une_equation_x2_egal_A() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Résoudre une équation du second degré";
	this.consigne = "Résoudre les équations suivantes";
	this.nb_questions = 5;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1;
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1.5;
	this.spacing = 1;


	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let liste_fractions = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5],
		[1, 6], [5, 6], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [1, 8], [3, 8], [5, 8], [7, 8],
		[1, 9], [2, 9], [4, 9], [5, 9], [7, 9], [8, 9], [1, 10], [3, 10], [7, 10], [9, 10]];
		let liste_type_de_questions = [];
		switch (parseInt(this.sup)) {
			case 1: liste_type_de_questions = combinaison_listes([1], this.nb_questions);
				break;
			case 2: liste_type_de_questions = combinaison_listes([2], this.nb_questions);
				break;
			case 3: liste_type_de_questions = combinaison_listes([3], this.nb_questions);
				break;
			case 4: liste_type_de_questions = combinaison_listes([1, 2, 3], this.nb_questions);

		}
		for (let i = 0, fraction, ns, ds, a, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {

			switch (liste_type_de_questions[i]) {
				case 1: a = randint(1, 20); // x²=a*a donc x=a ou -a.
					texte = `$x^2=${a * a}$`;
					texte_corr = `$x^2=${a * a}$ équivaut à $x = \\sqrt{${a * a}}$ ou $x = -\\sqrt{${a * a}}$<br>Soit $x = ${a}$ ou $x = -${a}$<br>`;
					texte_corr += `Il est équivalent de résoudre $x^2 - ${a * a}=0$ c'est à dire $x^2 - ${a}^{2}=0$ <br>Soit $(x - ${a})(x + ${a})=0$ qui donne les deux solutions ci-dessus. `;
					break;
				case 2: // x²=(ns*ns)/(ds*ds) solutions rationnelles
					fraction = choice(liste_fractions);
					ns = fraction[0];
					ds = fraction[1];
					texte = `$x^2=\\dfrac{${ns * ns}}{${ds * ds}}$`;
					texte_corr = `$x^2=\\dfrac{${ns * ns}}{${ds * ds}}$ équivaut à $x = \\sqrt{\\dfrac{${ns * ns}}{${ds * ds}}}$ ou $x = -\\sqrt{\\dfrac{${ns * ns}}{${ds * ds}}}$<br>Soit $x = \\dfrac{${ns}}{${ds}}$ ou $x = -\\dfrac{${ns}}{${ds}}$<br>`;
					texte_corr += `Il est équivalent de résoudre $x^2 - \\dfrac{${ns * ns}}{${ds * ds}}=0$ c'est à dire $x^2 - (\\dfrac{${ns}}{${ds}})^{2}=0$<br>Soit $(x - \\dfrac{${ns}}{${ds}})(x + \\dfrac{${ns}}{${ds}})=0$ qui donne les deux solutions ci-dessus. `;
					break;

				case 3: a = randint(2, 50, [4, 9, 16, 25, 36, 49]); //solution irrationnelles
					texte = `$x^2=${a}$`;
					texte_corr = `$x^2=${a}$ équivaut à $x = \\sqrt{${a}}$ ou $x = -\\sqrt{${a}}$<br>`;
					texte_corr += `Il est équivalent de résoudre $x^2 - ${a}=0$  c'est à dire $x^2 - (\\sqrt{${a}})^{2}=0$<br>Soit $(x - \\sqrt{${a}})(x + \\sqrt{${a}})=0$ qui donne les deux solutions ci-dessus. `;
					break;

			}
			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				// alert(this.liste_questions)
				// alert(this.liste_corrections)
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	};
	this.besoin_formulaire_numerique = ['Niveau de difficulté', 4, '1 : solutions entières\n 2 : solutions rationnelles\n 3 : Solutions irrationnelles\n 4 : Mélange des 3 autres niveaux'];
}
