import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,tex_fraction_reduite,tex_fraction} from "/modules/outils.js"
/**
 * Résolution d'équations de type (ax+b)(cx+d)=0
* @auteur Jean-Claude Lhote
* Tout est dans le nom de la fonction.
* 3L14
*/
export default function Resoudre_une_equation_produit_nul() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Résoudre une équation produit nul";
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
			case 1: liste_type_de_questions = combinaison_listes([1, 2], this.nb_questions);
				break;
			case 2: liste_type_de_questions = combinaison_listes([3, 4], this.nb_questions);
				break;
			case 3: liste_type_de_questions = combinaison_listes([5, 6], this.nb_questions);
				break;
			case 4: liste_type_de_questions = combinaison_listes([1, 2, 3, 4, 5, 6], this.nb_questions);

		}
		for (let i = 0, a, b, c, d, fraction1, fraction2, ns1, ns2, ds1, ds2, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
			fraction1 = choice(liste_fractions);
			ns1 = fraction1[0];
			ds1 = fraction1[1];
			fraction2 = choice(liste_fractions);
			ns2 = fraction2[0];
			ds2 = fraction2[1];
			switch (liste_type_de_questions[i]) {
				case 1: b = randint(1, 20); // (x+a)(x+b)=0 avec a et b entiers
					d = randint(1, 20, [b]);
					texte = `$(x+${b})(x+${d})=0$`;
					texte_corr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.';
					texte_corr += '<br>' + `$(x+${b})(x+${d})=0$`;
					texte_corr += '<br> Soit ' + `$x+${b}=0$` + ' ou ' + `$x+${d}=0$`;
					texte_corr += '<br> Donc ' + `$x=${0 - b}$` + ' ou ' + `$x=${0 - d}$`;
					break;
				case 2: b = randint(1, 20); // (x-a)(x+b)=0 avec a et b entiers
					d = randint(1, 20, [b]);
					texte = `$(x-${b})(x+${d})=0$`;
					texte_corr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.';
					texte_corr += '<br>' + `$(x-${b})(x+${d})=0$`;
					texte_corr += '<br> Soit ' + `$x-${b}=0$` + ' ou  ' + `$x+${d}=0$`;
					texte_corr += '<br> Donc ' + `$x=${b}$` + ' ou ' + `$x=${0 - d}$`;
					break;

				case 3: a = randint(2, 6); //(ax+b)(cx+d)=0  avec b/a et d/c entiers.
					b = Math.round(randint(1, 5) * a);
					c = randint(2, 6, [a]);
					d = Math.round(randint(1, 5) * c);
					texte = `$(${a}x+${b})(${c}x+${d})=0$`;
					texte_corr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.';
					texte_corr += '<br>' + `$(${a}x+${b})(${c}x+${d})=0$`;
					texte_corr += '<br> Soit ' + `$${a}x+${b}=0$` + ' ou ' + `$${c}x+${d}=0$`;
					texte_corr += '<br> Donc ' + `$${a}x=${0 - b}$` + ' ou ' + `$${c}x=${0 - d}$`;
					texte_corr += '<br> Donc ' + `$x=-${tex_fraction(b, a)}$` + ' ou ' + `$x=-${tex_fraction(d, c)}$`;
					texte_corr += '<br> Donc ' + `$x=${0 - b / a}$` + ' ou ' + `$x=${0 - d / c}$`;
					break;
				case 4: a = randint(2, 6); //(ax+b)(cx-d)=0  avec b/a et d/c entiers.
					b = Math.round(randint(1, 5) * a);
					c = randint(2, 6, [a]);
					d = Math.round(randint(1, 5) * c);
					texte = `$(${a}x+${b})(${c}x-${d})=0$`;
					texte_corr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.';
					texte_corr += '<br>' + `$(${a}x+${b})(${c}x-${d})=0$`;
					texte_corr += '<br> Soit ' + `$${a}x+${b}=0$` + ' ou ' + `$${c}x-${d}=0$`;
					texte_corr += '<br> Donc ' + `$${a}x=${0 - b}$` + ' ou ' + `$${c}x=${d}$`;
					texte_corr += '<br> Donc ' + `$x=-${tex_fraction(b, a)}$` + ' ou ' + `$x=${tex_fraction(d, c)}$`;
					texte_corr += '<br> Donc ' + `$x=${0 - b / a}$` + ' ou ' + `$x=${d / c}$`;
					break;
				case 5:
					a = randint(2, 9); //(ax+b)(cx+d)=0 	avec b/a et d/c quelconques.
					b = randint(1, 20, [a]);
					c = randint(2, 9, [a]);
					d = randint(1, 20, [b, c]);
					texte = `$(${a}x+${b})(${c}x+${d})=0$`;
					texte_corr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.';
					texte_corr += '<br>' + `$(${a}x+${b})(${c}x+${d})=0$`;
					texte_corr += '<br> Soit ' + `$${a}x+${b}=0$` + ' ou ' + `$${c}x+${d}=0$`;
					texte_corr += '<br> Donc ' + `$${a}x=${0 - b}$` + ' ou ' + `$${c}x=${0 - d}$`;
					texte_corr += '<br> Donc ' + `$x=-${tex_fraction(b, a)}$`;
					if (tex_fraction(b, a) != tex_fraction_reduite(b, a)) { texte_corr += `$=-${tex_fraction_reduite(b, a)}$`; }
					texte_corr += ' ou ' + `$x=-${tex_fraction(d, c)}$`;
					if (tex_fraction(d, c) != tex_fraction_reduite(d, c)) { texte_corr += `$=-${tex_fraction_reduite(d, c)}$`; }
					break;
				case 6:
					a = randint(2, 9); //(ax+b)(cx-d)=0 	avec b/a et d/c quelconques.
					b = randint(1, 20, [a]);
					c = randint(2, 9, [a]);
					d = randint(1, 20, [b, c]);
					texte = `$(${a}x+${b})(${c}x-${d})=0$`;
					texte_corr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.';
					texte_corr += '<br>' + `$(${a}x+${b})(${c}x-${d})=0$`;
					texte_corr += '<br> Soit ' + `$${a}x+${b}=0$` + ' ou ' + `$${c}x-${d}=0$`;
					texte_corr += '<br> Donc ' + `$${a}x=${0 - b}$` + ' ou ' + `$${c}x=${d}$`;
					texte_corr += '<br> Donc ' + `$x=-${tex_fraction(b, a)}$`;
					if (tex_fraction(b, a) != tex_fraction_reduite(b, a)) { texte_corr += `$=-${tex_fraction_reduite(b, a)}$`; }
					texte_corr += ' ou ' + `$x=${tex_fraction(d, c)}$`;
					if (tex_fraction(d, c) != tex_fraction_reduite(d, c)) { texte_corr += `$=${tex_fraction_reduite(d, c)}$`; }

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
	this.besoin_formulaire_numerique = ['Niveau de difficulté', 4, '1 : Coefficient de x = 1\n 2 : Coefficient de x>1 et solutions entières\n 3 : Solutions rationnelles\n 4 : Mélange des 3 autres niveaux'];
}
