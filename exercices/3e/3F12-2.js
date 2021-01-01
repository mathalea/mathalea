import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes,ecriture_algebrique,ecriture_parenthese_si_negatif,tex_fraction_reduite,lettre_minuscule_depuis_chiffre,katex_Popup2,fraction_simplifiee} from "/modules/outils.js"


/**
* Déterminer l'image d'un nombre par une fonction d'après sa forme algébrique
*
* * Niveau 1 : Fonctions affines
* * Niveau 2 : Polynôme du second degré
* * Niveau 3 : Quotients de fonctions affines
* * Niveau 4 : (ax+b)(cx+d)
* * Niveau 5 : Mélange
* @Auteur Rémi Angot
* 3F12-2
*/
export default function Image_fonction_algebrique() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Déterminer l'image d'un nombre par une fonction d'après sa forme algébrique";
	this.consigne = "";
	this.nb_questions = 5;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 5; // niveau de difficulté

	this.nouvelle_version = function (numero_de_l_exercice) {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = [];
		if (this.sup == 1) {
			type_de_questions_disponibles = ['ax+b', 'ax-b', '-ax+b', '-ax-b'];
		}
		if (this.sup == 2) {
			type_de_questions_disponibles = ['ax2+bx+c', 'ax2+c', 'ax2+bx', '-ax2+bx-c', '-ax2-bx-c', '-ax2-bx+c', '-ax2-bx'];
		}
		if (this.sup == 3) {
			type_de_questions_disponibles = ['a/cx+d', 'ax+b/cx+d'];
		}
		if (this.sup == 4) {
			type_de_questions_disponibles = ['(ax+b)(cx+d)', '(ax+b)2'];
		}
		if (this.sup == 5) {
			type_de_questions_disponibles = ['ax+b', 'ax-b', '-ax+b', 'ax2+bx+c', '-ax2+bx-c', '-ax2-bx', 'a/cx+d', 'ax+b/cx+d', '(ax+b)(cx+d)', '(ax+b)2'];
		}
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		let liste_de_signes_de_x = combinaison_listes([true, false], this.nb_questions);
		for (let i = 0, texte, texte_corr, a, b, c, d, expression, nomdef, x, cpt = 0; i < this.nb_questions && cpt < 50;) {
			x = randint(1, 12);
			if (liste_de_signes_de_x[i]) {
				x = -1 * x;
			}
			a = randint(2, 11);
			b = randint(2, 11);
			c = randint(2, 11);
			nomdef = lettre_minuscule_depuis_chiffre(6 + i) // on commence par f puis on continue dans l'ordre alphabétique
			switch (liste_type_de_questions[i]) {
				case 'ax+b':
					expression = `${a}x+${b}`
					texte_corr = `$${nomdef}(${x})=${a}\\times ${ecriture_parenthese_si_negatif(x)}+${b}=${a * x}+${b}=${a * x + b}$`
					break;
				case 'ax-b':
					expression = `${a}x-${b}`
					texte_corr = `$${nomdef}(${x})=${a}\\times ${ecriture_parenthese_si_negatif(x)}-${b}=${a * x}-${b}=${a * x - b}$`
					break;
				case '-ax+b':
					expression = `-${a}x+${b}`
					texte_corr = `$${nomdef}(${x})=-${a}\\times ${ecriture_parenthese_si_negatif(x)}+${b}=${-1 * a * x}+${b}=${-1 * a * x + b}$`
					break;
				case '-ax-b':
					expression = `-${a}x-${b}`
					texte_corr = `$${nomdef}(${x})=-${a}\\times ${ecriture_parenthese_si_negatif(x)}-${b}=${-1 * a * x}-${b}=${-1 * a * x - b}$`
					break;
				case 'ax2+bx+c':
					expression = `${a}x^2+${b}x+${c}`
					texte_corr = `$${nomdef}(${x})=${a}\\times ${ecriture_parenthese_si_negatif(x)}^2+${b}\\times ${ecriture_parenthese_si_negatif(x)}+${c}=${a}\\times${x * x}${ecriture_algebrique(b * x)}+${c}=${a * x * x}${ecriture_algebrique(b * x)}+${c}=${a * x * x + b * x + c}$`
					break;
				case 'ax2+c':
					expression = `${a}x^2+${c}`
					texte_corr = `$${nomdef}(${x})=${a}\\times ${ecriture_parenthese_si_negatif(x)}^2+${c}=${a}\\times${x * x}+${c}=${a * x * x}+${c}=${a * x * x + c}$`
					break;
				case 'ax2+bx':
					expression = `${a}x^2+${b}x`
					texte_corr = `$${nomdef}(${x})=${a}\\times ${ecriture_parenthese_si_negatif(x)}^2+${b}\\times ${ecriture_parenthese_si_negatif(x)}=${a}\\times${x * x}${ecriture_algebrique(b * x)}=${a * x * x}${ecriture_algebrique(b * x)}=${a * x * x + b * x}$`
					break;
				case '-ax2+bx-c':
					expression = `-${a}x^2+${b}x-${c}`
					texte_corr = `$${nomdef}(${x})=-${a}\\times ${ecriture_parenthese_si_negatif(x)}^2+${b}\\times ${ecriture_parenthese_si_negatif(x)}-${c}=-${a}\\times${x * x}${ecriture_algebrique(b * x)}-${c}=${-1 * a * x * x}${ecriture_algebrique(b * x)}-${c}=${-1 * a * x * x + b * x - c}$`
					break;
				case '-ax2-bx-c':
					expression = `-${a}x^2-${b}x-${c}`
					texte_corr = `$${nomdef}(${x})=-${a}\\times ${ecriture_parenthese_si_negatif(x)}^2-${b}\\times ${ecriture_parenthese_si_negatif(x)}-${c}=-${a}\\times${x * x}${ecriture_algebrique(-1 * b * x)}-${c}=${-1 * a * x * x}${ecriture_algebrique(-1 * b * x)}-${c}=${-1 * a * x * x - b * x - c}$`
					break;
				case '-ax2-bx+c':
					expression = `-${a}x^2-${b}x+${c}`
					texte_corr = `$${nomdef}(${x})=-${a}\\times ${ecriture_parenthese_si_negatif(x)}^2-${b}\\times ${ecriture_parenthese_si_negatif(x)}+${c}=-${a}\\times${x * x}${ecriture_algebrique(-1 * b * x)}+${c}=${-1 * a * x * x}${ecriture_algebrique(-1 * b * x)}+${c}=${-1 * a * x * x - b * x + c}$`
					break;
				case '-ax2-bx':
					expression = `-${a}x^2-${b}x`
					texte_corr = `$${nomdef}(${x})=-${a}\\times ${ecriture_parenthese_si_negatif(x)}^2-${b}\\times ${ecriture_parenthese_si_negatif(x)}=-${a}\\times${x * x}${ecriture_algebrique(-1 * b * x)}=${-1 * a * x * x}${ecriture_algebrique(-1 * b * x)}=${-1 * a * x * x - b * x}$`
					break;
				case 'a/cx+d':
					d = randint(1, 11)
					while (c * x + d == 0) {
						c = randint(2, 11)
					}
					expression = `\\dfrac{${a}}{${c}x+${d}}`
					texte_corr = `$${nomdef}(${x})=\\dfrac{${a}}{${c}\\times${ecriture_parenthese_si_negatif(x)}+${d}}=\\dfrac{${a}}{${c * x}+${d}}=\\dfrac{${a}}{${c * x + d}}=${tex_fraction_reduite(a, c * x + d)}$`
					break;
				case 'ax+b/cx+d':
					d = randint(1, 11)
					while (c * x + d == 0) {
						c = randint(2, 11)
					}
					while (a * x + b == 0) {
						a = randint(2, 11)
					}
					expression = `\\dfrac{${a}x+${b}}{${c}x+${d}}`
					texte_corr = `$${nomdef}(${x})=\\dfrac{${a}\\times${ecriture_parenthese_si_negatif(x)}+${b}}{${c}\\times${ecriture_parenthese_si_negatif(x)}+${d}}=\\dfrac{${a * x}+${b}}{${c * x}+${d}}=\\dfrac{${a * x + b}}{${c * x + d}}=${tex_fraction_reduite(a * x + b, c * x + d)}$`
					break;
				case '(ax+b)(cx+d)':
					a = randint(-4, 4, [0, 1, -1])
					b = randint(-4, 4, [0])
					c = randint(-4, 4, [0, 1, -1])
					d = randint(-4, 4, [0])
					x = randint(-2, 2, [0])

					expression = `(${a}x${ecriture_algebrique(b)})(${c}x${ecriture_algebrique(d)})`
					texte_corr = `$${nomdef}(${x})=\\left(${a}\\times${ecriture_parenthese_si_negatif(x)}${ecriture_algebrique(b)}\\right)\\left(${c}\\times${ecriture_parenthese_si_negatif(x)}${ecriture_algebrique(d)}\\right)=(${a * x}${ecriture_algebrique(b)})(${c * x}${ecriture_algebrique(d)})=${a * x + b}\\times${ecriture_parenthese_si_negatif(c * x + d)}=${(a * x + b) * (c * x + d)}$`
					break;
				case '(ax+b)2':
					a = randint(-4, 4, [0, -1, 1])
					b = randint(-4, 4, [0])
					c = randint(-4, 4, [0, -1, 1])
					d = randint(-4, 4, [0])
					x = randint(-2, 2, [0])

					expression = `(${a}x${ecriture_algebrique(b)})^2`
					texte_corr = `$${nomdef}(${x})=\\left(${a}\\times${ecriture_parenthese_si_negatif(x)}${ecriture_algebrique(b)}\\right)^2=(${a * x}${ecriture_algebrique(b)})^2=${ecriture_parenthese_si_negatif(a * x + b)}^2=${(a * x + b) * (a * x + b)}$`
					break;
			}

			texte = `On considère la fonction $${nomdef}$ définie par $${nomdef}:x\\mapsto ${expression}$. Calculer $${nomdef}(${x})$.`


			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté', 5, '1 : Fonctions affines\n2 : Polynome du second degré\n3 : Quotient\n4 : Produit \n5 : Mélange'];
}
