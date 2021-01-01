import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,liste_de_question_to_contenu_sans_numero,randint,combinaison_listes,ecriture_algebrique,ecriture_parenthese_si_negatif,pgcd,tex_fraction_reduite,lettre_minuscule_depuis_chiffre} from "/modules/outils.js"
/**
* Déterminer l'image d'un nombre par une fonction d'après sa forme algébrique
*
* * Niveau 1 : Fonctions affines
* * Niveau 2 : Polynôme du second degré
* * Niveau 3 : Quotients de fonctions affines
* * Niveau 4 : (ax+b)(cx+d)
* * Niveau 5 : Mélange
* @Auteur Rémi Angot
* 3F12-3
*/
export default function Tableau_de_valeurs() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Compléter un tableau de valeurs";
	this.consigne = "";
	this.nb_questions = 1;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing = 1;
	this.sup = 5; // niveau de difficulté
	this.correction_detaillee_disponible = true;

	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = [];
		if (this.sup == 1) {
			type_de_questions_disponibles = ['ax+b', 'ax'];
		}
		if (this.sup == 2) {
			type_de_questions_disponibles = ['ax2+bx+c', 'ax2+c', 'ax2+bx'];
		}
		if (this.sup == 3) {
			type_de_questions_disponibles = ['a/cx+d', 'ax+b/cx+d'];
		}
		if (this.sup == 4) {
			type_de_questions_disponibles = ['(ax+b)(cx+d)', '(ax+b)2'];
		}
		if (this.sup == 5) {
			type_de_questions_disponibles = ['ax+b', 'ax', 'ax2+bx+c', 'ax2+c', 'ax2+bx', 'a/cx+d', 'ax+b/cx+d', '(ax+b)(cx+d)', '(ax+b)2'];
		}
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		let liste_de_x = combinaison_listes([[-3, 0, 3], [-2, 0, 2], [1, 2, 5], [-3, 6, 9]], this.nb_questions);
		for (let i = 0, texte, texte_corr, a, b, c, d, x1, x2, x3, expression, nomdef, ligne2, calculs = "", cpt = 0; i < this.nb_questions && cpt < 50;) {
			nomdef = lettre_minuscule_depuis_chiffre(6 + i); // on commence par f puis on continue dans l'ordre alphabétique
			x1 = liste_de_x[i][0];
			x2 = liste_de_x[i][1];
			x3 = liste_de_x[i][2];
			switch (liste_type_de_questions[i]) {
				case 'ax+b':
					a = randint(-10, 10, [0, -1, 1]);
					b = randint(-10, 10, [0]);
					expression = `${a}x${ecriture_algebrique(b)}`;
					ligne2 = `${nomdef}(x) & ${a * liste_de_x[i][0] + b} & ${a * liste_de_x[i][1] + b} & ${a * liste_de_x[i][2] + b} \\\\\n`;
					calculs = `$${nomdef}(${x1})=${a}\\times${ecriture_parenthese_si_negatif(x1)}${ecriture_algebrique(b)}=${a * x1}${ecriture_algebrique(b)}=${a * x1 + b}$<br>`;
					calculs += `$${nomdef}(${x2})=${a}\\times${ecriture_parenthese_si_negatif(x2)}${ecriture_algebrique(b)}=${a * x2}${ecriture_algebrique(b)}=${a * x2 + b}$<br>`;
					calculs += `$${nomdef}(${x3})=${a}\\times${ecriture_parenthese_si_negatif(x3)}${ecriture_algebrique(b)}=${a * x3}${ecriture_algebrique(b)}=${a * x3 + b}$<br>`;
					break;
				case 'ax':
					a = randint(-10, 10, [0, -1, 1]);
					expression = `${a}x`;
					ligne2 = `${nomdef}(x) & ${a * liste_de_x[i][0]} & ${a * liste_de_x[i][1]} & ${a * liste_de_x[i][2]} \\\\\n`;
					calculs = `$${nomdef}(${x1})=${a}\\times${ecriture_parenthese_si_negatif(x1)}=${a * x1}$<br>`;
					calculs += `$${nomdef}(${x2})=${a}\\times${ecriture_parenthese_si_negatif(x2)}=${a * x2}$<br>`;
					calculs += `$${nomdef}(${x3})=${a}\\times${ecriture_parenthese_si_negatif(x3)}=${a * x3}$<br>`;
					break;
				case 'ax2+bx+c':
					a = randint(-3, 3, [0, -1, 1]);
					b = randint(-5, 5, [0, -1, 1]);
					c = randint(-10, 10, [0]);
					expression = `${a}x^2${ecriture_algebrique(b)}x${ecriture_algebrique(c)}`;
					ligne2 = `${nomdef}(x) & ${a * liste_de_x[i][0] ** 2 + b * liste_de_x[i][0] + c} & ${a * liste_de_x[i][1] ** 2 + b * liste_de_x[i][1] + c} & ${a * liste_de_x[i][2] ** 2 + b * liste_de_x[i][2] + c} \\\\\n`;
					calculs = `$${nomdef}(${x1})=${a}\\times${ecriture_parenthese_si_negatif(x1)}^2${ecriture_algebrique(b)}\\times${ecriture_parenthese_si_negatif(x1)}${ecriture_algebrique(c)}=${a}\\times${x1 ** 2}${ecriture_algebrique(b * x1)}${ecriture_algebrique(c)}=${a * x1 ** 2 + b * x1 + c}$<br>`;
					calculs += `$${nomdef}(${x2})=${a}\\times${ecriture_parenthese_si_negatif(x2)}^2${ecriture_algebrique(b)}\\times${ecriture_parenthese_si_negatif(x2)}${ecriture_algebrique(c)}=${a}\\times${x2 ** 2}${ecriture_algebrique(b * x2)}${ecriture_algebrique(c)}=${a * x2 ** 2 + b * x2 + c}$<br>`;
					calculs += `$${nomdef}(${x3})=${a}\\times${ecriture_parenthese_si_negatif(x3)}^2${ecriture_algebrique(b)}\\times${ecriture_parenthese_si_negatif(x3)}${ecriture_algebrique(c)}=${a}\\times${x3 ** 2}${ecriture_algebrique(b * x3)}${ecriture_algebrique(c)}=${a * x3 ** 2 + b * x3 + c}$<br>`;
					break;
				case 'ax2+c':
					a = randint(-4, 4, [0, -1, 1]);
					c = randint(-10, 10, [0]);
					expression = `${a}x^2${ecriture_algebrique(c)}`;
					ligne2 = `${nomdef}(x) & ${a * liste_de_x[i][0] ** 2 + c} & ${a * liste_de_x[i][1] ** 2 + c} & ${a * liste_de_x[i][2] ** 2 + c} \\\\\n`;
					calculs = `$${nomdef}(${x1})=${a}\\times${ecriture_parenthese_si_negatif(x1)}^2${ecriture_algebrique(c)}=${a}\\times${x1 ** 2}${ecriture_algebrique(c)}=${a * x1 ** 2 + c}$<br>`;
					calculs += `$${nomdef}(${x2})=${a}\\times${ecriture_parenthese_si_negatif(x2)}^2${ecriture_algebrique(c)}=${a}\\times${x2 ** 2}${ecriture_algebrique(c)}=${a * x2 ** 2 + c}$<br>`;
					calculs += `$${nomdef}(${x3})=${a}\\times${ecriture_parenthese_si_negatif(x3)}^2${ecriture_algebrique(c)}=${a}\\times${x3 ** 2}${ecriture_algebrique(c)}=${a * x3 ** 2 + c}$<br>`;
					break;
				case 'ax2+bx':
					a = randint(-3, 3, [0, -1, 1]);
					b = randint(-5, 5, [0, -1, 1]);
					c = randint(-10, 10, [0]);
					expression = `${a}x^2${ecriture_algebrique(b)}x`;
					ligne2 = `${nomdef}(x) & ${a * liste_de_x[i][0] ** 2 + b * liste_de_x[i][0]} & ${a * liste_de_x[i][1] ** 2 + b * liste_de_x[i][1]} & ${a * liste_de_x[i][2] ** 2 + b * liste_de_x[i][2]} \\\\\n`;
					calculs = `$${nomdef}(${x1})=${a}\\times${ecriture_parenthese_si_negatif(x1)}^2${ecriture_algebrique(b)}\\times${ecriture_parenthese_si_negatif(x1)}=${a}\\times${x1 ** 2}${ecriture_algebrique(b * x1)}=${a * x1 ** 2 + b * x1}$<br>`;
					calculs += `$${nomdef}(${x2})=${a}\\times${ecriture_parenthese_si_negatif(x2)}^2${ecriture_algebrique(b)}\\times${ecriture_parenthese_si_negatif(x2)}=${a}\\times${x2 ** 2}${ecriture_algebrique(b * x2)}=${a * x2 ** 2 + b * x2}$<br>`;
					calculs += `$${nomdef}(${x3})=${a}\\times${ecriture_parenthese_si_negatif(x3)}^2${ecriture_algebrique(b)}\\times${ecriture_parenthese_si_negatif(x3)}=${a}\\times${x3 ** 2}${ecriture_algebrique(b * x3)}=${a * x3 ** 2 + b * x3}$<br>`;
					break;
				case 'a/cx+d':
					a = randint(-10, 10, [0]);
					c = randint(-10, 10, [0, -1, 1]);
					d = randint(-10, 10, [0]);
					while (c * x1 + d == 0 || c * x2 + d == 0 || c * x3 + d == 0) {
						c = randint(-10, 10, [0, -1, 1]);
					}
					expression = `\\dfrac{${a}}{${c}x${ecriture_algebrique(d)}}`;
					ligne2 = `${nomdef}(x) & ${tex_fraction_reduite(a, c * liste_de_x[i][0] + d)} & ${tex_fraction_reduite(a, c * liste_de_x[i][1] + d)} & ${tex_fraction_reduite(a, c * liste_de_x[i][2] + d)} \\\\\n`;
					calculs = `$${nomdef}(${x1})=\\dfrac{${a}}{${c}\\times${ecriture_parenthese_si_negatif(x1)}${ecriture_algebrique(d)}}=\\dfrac{${a}}{${c * x1}${ecriture_algebrique(d)}}=\\dfrac{${a}}{${c * x1 + d}}`;
					if (pgcd(a, c * x1 + d) == 1) {
						calculs += '$<br><br>';
					} else {
						calculs += '=' + tex_fraction_reduite(a, c * x1 + d) + '$<br><br>';
					}
					calculs += `$${nomdef}(${x2})=\\dfrac{${a}}{${c}\\times${ecriture_parenthese_si_negatif(x2)}${ecriture_algebrique(d)}}=\\dfrac{${a}}{${c * x2}${ecriture_algebrique(d)}}=\\dfrac{${a}}{${c * x2 + d}}`;
					if (pgcd(a, c * x2 + d) == 1) {
						calculs += '$<br><br>';
					} else {
						calculs += '=' + tex_fraction_reduite(a, c * x2 + d) + '$<br><br>';
					}
					calculs += `$${nomdef}(${x3})=\\dfrac{${a}}{${c}\\times${ecriture_parenthese_si_negatif(x3)}${ecriture_algebrique(d)}}=\\dfrac{${a}}{${c * x3}${ecriture_algebrique(d)}}=\\dfrac{${a}}{${c * x3 + d}}`;
					if (pgcd(a, c * x3 + d) == 1) {
						calculs += '$<br><br>';
					} else {
						calculs += '=' + tex_fraction_reduite(a, c * x3 + d) + '$<br><br>';
					}
					break;
				case 'ax+b/cx+d':
					a = randint(-10, 10, [0, 1, -1]);
					b = randint(-10, 10, [0]);
					c = randint(-10, 10, [0, -1, 1]);
					d = randint(-10, 10, [0]);
					while (c * x1 + d == 0 || c * x2 + d == 0 || c * x3 + d == 0) {
						c = randint(-10, 10, [0, -1, 1]);
					}
					expression = `\\dfrac{${a}x${ecriture_algebrique(b)}}{${c}x${ecriture_algebrique(d)}}`;
					ligne2 = `${nomdef}(x) & ${tex_fraction_reduite(a * liste_de_x[i][0] + b, c * liste_de_x[i][0] + d)} & ${tex_fraction_reduite(a * liste_de_x[i][1] + b, c * liste_de_x[i][1] + d)} & ${tex_fraction_reduite(a * liste_de_x[i][2] + b, c * liste_de_x[i][2] + d)} \\\\\n`;
					calculs = `$${nomdef}(${x1})=\\dfrac{${a}\\times${ecriture_parenthese_si_negatif(x1)}${ecriture_algebrique(b)}}{${c}\\times${ecriture_parenthese_si_negatif(x1)}${ecriture_algebrique(d)}}=\\dfrac{${a * x1}${ecriture_algebrique(b)}}{${c * x1}${ecriture_algebrique(d)}}=\\dfrac{${a * x1 + b}}{${c * x1 + d}}`;
					if (pgcd(a * x1 + b, c * x1 + d) == 1) {
						calculs += '$<br><br>';
					} else {
						calculs += '=' + tex_fraction_reduite(a * x1 + b, c * x1 + d) + '$<br><br>';
					}
					calculs += `$${nomdef}(${x2})=\\dfrac{${a}\\times${ecriture_parenthese_si_negatif(x2)}${ecriture_algebrique(b)}}{${c}\\times${ecriture_parenthese_si_negatif(x2)}${ecriture_algebrique(d)}}=\\dfrac{${a * x2}${ecriture_algebrique(b)}}{${c * x2}${ecriture_algebrique(d)}}=\\dfrac{${a * x2 + b}}{${c * x2 + d}}`;
					if (pgcd(a * x2 + b, c * x2 + d) == 1) {
						calculs += '$<br><br>';
					} else {
						calculs += '=' + tex_fraction_reduite(a * x2 + b, c * x2 + d) + '$<br><br>';
					}
					calculs += `$${nomdef}(${x3})=\\dfrac{${a}\\times${ecriture_parenthese_si_negatif(x3)}${ecriture_algebrique(b)}}{${c}\\times${ecriture_parenthese_si_negatif(x3)}${ecriture_algebrique(d)}}=\\dfrac{${a * x3}${ecriture_algebrique(b)}}{${c * x3}${ecriture_algebrique(d)}}=\\dfrac{${a * x3 + b}}{${c * x3 + d}}`;
					if (pgcd(a * x3 + b, c * x3 + d) == 1) {
						calculs += '$<br><br>';
					} else {
						calculs += '=' + tex_fraction_reduite(a * x3 + b, c * x3 + d) + '$<br><br>';
					}
					break;
				case '(ax+b)(cx+d)':
					a = randint(-5, 5, [0, 1, -1]);
					b = randint(-5, 5, [0]);
					c = randint(-3, 3, [0, -1, 1]);
					d = randint(-3, 3, [0]);
					if (a < 0 && b < 0 && c < 0 && d < 0) {
						d = randint(1, 3);
					}
					expression = `(${a}x${ecriture_algebrique(b)})(${c}x${ecriture_algebrique(d)})`;
					ligne2 = `${nomdef}(x) & ${(a * liste_de_x[i][0] + b) * (c * liste_de_x[i][0] + d)} & ${(a * liste_de_x[i][1] + b) * (c * liste_de_x[i][1] + d)} & ${(a * liste_de_x[i][2] + b) * (c * liste_de_x[i][2] + d)} \\\\\n`;
					calculs = `$${nomdef}(${x1})=\\left(${a}\\times${ecriture_parenthese_si_negatif(x1)}${ecriture_algebrique(b)}\\right)\\left(${c}\\times${ecriture_parenthese_si_negatif(x1)}${ecriture_algebrique(d)}\\right)=(${a * x1}${ecriture_algebrique(b)})(${c * x1}${ecriture_algebrique(d)})=${a * x1 + b}\\times ${ecriture_parenthese_si_negatif(c * x1 + d)}=${(a * x1 + b) * (c * x1 + d)}$<br>`;
					calculs += `$${nomdef}(${x2})=\\left(${a}\\times${ecriture_parenthese_si_negatif(x2)}${ecriture_algebrique(b)}\\right)\\left(${c}\\times${ecriture_parenthese_si_negatif(x2)}${ecriture_algebrique(d)}\\right)=(${a * x2}${ecriture_algebrique(b)})(${c * x2}${ecriture_algebrique(d)})=${a * x2 + b}\\times ${ecriture_parenthese_si_negatif(c * x2 + d)}=${(a * x2 + b) * (c * x2 + d)}$<br>`;
					calculs += `$${nomdef}(${x3})=\\left(${a}\\times${ecriture_parenthese_si_negatif(x3)}${ecriture_algebrique(b)}\\right)\\left(${c}\\times${ecriture_parenthese_si_negatif(x3)}${ecriture_algebrique(d)}\\right)=(${a * x3}${ecriture_algebrique(b)})(${c * x3}${ecriture_algebrique(d)})=${a * x3 + b}\\times ${ecriture_parenthese_si_negatif(c * x3 + d)}=${(a * x3 + b) * (c * x3 + d)}$<br>`;
					break;
				case '(ax+b)2':
					a = randint(-3, 3, [0, 1, -1]);
					b = randint(-3, 3, [0]);
					expression = `(${a}x${ecriture_algebrique(b)})^2`;
					ligne2 = `${nomdef}(x) & ${(a * liste_de_x[i][0] + b) ** 2} & ${(a * liste_de_x[i][1] + b) ** 2} & ${(a * liste_de_x[i][2] + b) ** 2} \\\\\n`;
					calculs = `$${nomdef}(${x1})=\\left(${a}\\times${ecriture_parenthese_si_negatif(x1)}${ecriture_algebrique(b)}\\right)^2=(${a * x1}${ecriture_algebrique(b)})^2=${ecriture_parenthese_si_negatif(a * x1 + b)}^2=${(a * x1 + b) ** 2}$<br>`;
					calculs += `$${nomdef}(${x2})=\\left(${a}\\times${ecriture_parenthese_si_negatif(x2)}${ecriture_algebrique(b)}\\right)^2=(${a * x2}${ecriture_algebrique(b)})^2=${ecriture_parenthese_si_negatif(a * x2 + b)}^2=${(a * x2 + b) ** 2}$<br>`;
					calculs += `$${nomdef}(${x3})=\\left(${a}\\times${ecriture_parenthese_si_negatif(x3)}${ecriture_algebrique(b)}\\right)^2=(${a * x3}${ecriture_algebrique(b)})^2=${ecriture_parenthese_si_negatif(a * x3 + b)}^2=${(a * x3 + b) ** 2}$<br>`;

					break;
			}


			texte = `On considère la fonction $${nomdef}$ définie par $${nomdef}:x\\mapsto ${expression}$. Compléter le tableau de valeurs suivant.`;
			texte_corr = '';
			texte += `<br><br>`;
			if (sortie_html) {
				texte += `$\\def\\arraystretch{2.5}\\begin{array}{|l|c|c|c|}\n`;
			} else {
				texte += `$\\begin{array}{|l|c|c|c|}\n`;
			}

			texte += `\\hline\n`;
			texte += `x & ${liste_de_x[i][0]} & ${liste_de_x[i][1]} & ${liste_de_x[i][2]} \\\\\n`;
			texte += `\\hline\n`;
			texte += `${nomdef}(x) & \\phantom{-10} & \\phantom{-10} & \\phantom{-10} \\\\\n`;
			texte += `\\hline\n`;
			texte += `\\end{array}\n$`;


			if (sortie_html) {
				texte_corr = `$\\def\\arraystretch{2.5}\\begin{array}{|l|c|c|c|}\n`;
			} else {
				texte_corr = `$\\begin{array}{|l|c|c|c|}\n`;
			}

			texte_corr += `\\hline\n`;
			texte_corr += `x & ${liste_de_x[i][0]} & ${liste_de_x[i][1]} & ${liste_de_x[i][2]} \\\\\n`;
			texte_corr += `\\hline\n`;
			texte_corr += ligne2;
			texte_corr += `\\hline\n`;
			texte_corr += `\\end{array}\n$`;
			if (this.correction_detaillee) {
				texte_corr += '<br><br>';
				texte_corr += calculs;
			}




			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		this.nb_questions == 1 ? liste_de_question_to_contenu_sans_numero(this) : liste_de_question_to_contenu(this);
	};
	this.besoin_formulaire_numerique = ['Niveau de difficulté', 5, '1 : Fonctions affines\n2 : Polynome du second degré\n3 : Quotient\n4 : Produit \n5 : Mélange'];
}
