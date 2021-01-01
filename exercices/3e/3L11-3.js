import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes,lettre_depuis_chiffre,printlatex} from "/modules/outils.js"
/**
* Utiliser la simple ou la double distributivité et réduire l'expression
*
* @Auteur Rémi Angot
* 3L11-3
*/
export default function Distributivite_simple_double_reduction() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Utiliser la distributivité (simple ou double) et réduire";
	this.consigne = "Développer et réduire les expressions suivantes.";
	this.nb_questions = 5;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1;

	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = ['cx+e(ax+b)', 'ex+(ax+b)(cx+d)', 'e+(ax+b)(cx+d)', 'e-(ax+b)(cx+d)', '(ax*b)(cx+d)', 'e(ax+b)-(d+cx)'];
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		for (let i = 0, texte, texte_corr, a, b, c, d, e, cpt = 0; i < this.nb_questions && cpt < 50;) {
			a = randint(-11, 11, 0);
			b = randint(-11, 11, 0);
			c = randint(-11, 11, 0);
			d = randint(-11, 11, 0);
			e = randint(-11, 11, 0);
			switch (liste_type_de_questions[i]) {
				case 'cx+e(ax+b)':
					texte = `$${lettre_depuis_chiffre(i + 1)}=${printlatex(`${c}*x+(${e})*(${a}*x+(${b}))`)}$`;
					texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${printlatex(`${c}*x+(${e})*(${a}*x+(${b}))`)}$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=${printlatex(`${c}*x+(${e * a})*x+(${e * b})`)}$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=${printlatex(`${c + e * a}*x+(${e * b})`)}$`;
					break;
				case 'ex+(ax+b)(cx+d)':
					texte = `$${lettre_depuis_chiffre(i + 1)}=${printlatex(`${e}*x+(${a}*x+(${b}))*(${c}x+(${d}))`)}$`;
					texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${printlatex(`${e}*x+(${a}*x+(${b}))*(${c}x+(${d}))`)}$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=${printlatex(`${e}*x+(${a * c})*x^2+(${a * d})*x+(${b * c})*x+(${b * d})`)}$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=${printlatex(`${a * c}*x^2+(${e + b * c + a * d})*x+(${b * d})`)}$`;
					break;
				case 'e+(ax+b)(cx+d)':
					texte = `$${lettre_depuis_chiffre(i + 1)}=${printlatex(`${e}+(${a}*x+(${b}))*(${c}x+(${d}))`)}$`;
					texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${printlatex(`${e}+(${a}*x+(${b}))*(${c}x+(${d}))`)}$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=${printlatex(`${e}+(${a * c})*x^2+(${a * d})*x+(${b * c})*x+(${b * d})`)}$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=${printlatex(`${a * c}*x^2+(${b * c + a * d})*x+(${e + b * d})`)}$`;
					break;
				case 'e-(ax+b)(cx+d)':
					texte = `$${lettre_depuis_chiffre(i + 1)}=${e}-${printlatex(`(${a}*x+(${b}))*(${c}x+(${d}))`)}$`;
					texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${e}-${printlatex(`(${a}*x+(${b}))*(${c}x+(${d}))`)}$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=${e}-(${printlatex(`(${a * c})*x^2+(${a * d})*x+(${b * c})*x+(${b * d})`)})$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=${printlatex(`${e}+(${-1 * a * c})*x^2+(${-1 * a * d})*x+(${-1 * b * c})*x+(${-1 * b * d})`)}$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=${printlatex(`${-1 * a * c}*x^2+(${-1 * b * c - a * d})*x+(${e - b * d})`)}$`;
					break;
				case '(ax*b)(cx+d)':
					a = randint(-3, 3, [0]);
					b = randint(2, 3);
					texte = `$${lettre_depuis_chiffre(i + 1)}=(${printlatex(`${a}*x`)}\\times${b})(${printlatex(`${c}*x+(${d})`)})$`;
					texte_corr = `$${lettre_depuis_chiffre(i + 1)}=(${printlatex(`${a}*x`)}\\times${b})(${printlatex(`${c}*x+(${d})`)})$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=${printlatex(`${a * b}*x`)}\\times(${printlatex(`${c}*x+(${d})`)})$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=${printlatex(`${a * b * c}*x^2+(${a * b * d})*x`)}$`;
					break;
				case 'e(ax+b)-(d+cx)':
					texte = `$${lettre_depuis_chiffre(i + 1)}=${e}(${printlatex(`${a}*x+(${b})`)})-(${printlatex(`${d}+(${c})*x`)})$`;
					texte_corr = texte;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=${printlatex(`(${e * a})*x+(${e * b})`)}-(${printlatex(`${d}+(${c})*x`)})$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=${printlatex(`(${e * a})*x+(${e * b})+(${-d})+(${-c})*x`)}$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=${printlatex(`(${e * a - c})*x+(${e * b - d})`)}$`;
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
