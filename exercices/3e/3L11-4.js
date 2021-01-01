import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,choice,combinaison_listes,abs,lettre_depuis_chiffre,printlatex} from "/modules/outils.js"
/**
* Utiliser la simple ou la double distributivité et réduire l'expression
*
* @Auteur Rémi Angot
* 3L11-4
*/
export default function Factoriser_par_nombre_ou_x() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Factoriser une expression";
	this.consigne = "Factoriser les expressions suivantes.";
	this.nb_questions = 8;
	this.nb_cols = 2;
	this.nb_cols_corr = 2;
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1;

	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = ['ka+nkb', '-ka+nkb', 'nka+mkb', 'nka-mkb', 'nkx+mkx2', 'nkx-mkx2', 'nx2+x', 'nx2+mx'];
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		for (let i = 0, texte, texte_corr, n, m, couplenm, k, cpt = 0; i < this.nb_questions && cpt < 50;) {
			k = choice([2, 3, 5, 7, 11]);
			couplenm = choice([[2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [5, 6], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [3, 8], [5, 8], [7, 8], [2, 9], [4, 9], [5, 9], [7, 9], [8, 9], [3, 10], [7, 10], [9, 10]]); // n et m sont premiers entre eux
			n = couplenm[0];
			m = couplenm[1];
			switch (liste_type_de_questions[i]) {
				case 'ka+nkb':
					texte = `$${lettre_depuis_chiffre(i + 1)}=${printlatex(`${k}*a+(${n * k})*b`)}$`;
					texte_corr = texte;
					if (n > 0) {
						texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=${k}a+${k}\\times${n}b$`;
					} else {
						texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=${k}a-${k}\\times${abs(n)}b$`;
					}
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=${k}(${printlatex(`a+(${n})*b`)})$`;
					break;
				case '-ka+nkb':
					texte = `$${lettre_depuis_chiffre(i + 1)}=${printlatex(`${-k}*a+(${n * k})*b`)}$`;
					texte_corr = texte;
					if (n > 0) {
						texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=${-k}a+${k}\\times${n}b$`;
						texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=${k}(${printlatex(`-a+${n}*b`)})$`;
					} else {
						texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=${-k}a+(${-k})\\times${-n}b$`;
						texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=${-k}(${printlatex(`a+(${-n})*b`)})$`;
					}
					break;
				case 'nka+mkb':
					texte = `$${lettre_depuis_chiffre(i + 1)}=${printlatex(`${n * k}*a+(${m * k})*b`)}$`;
					texte_corr = texte;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=${k}\\times${n}a+${k}\\times${m}b$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=${k}(${n}a+${m}b)$`;
					break;
				case 'nka-mkb':
					texte = `$${lettre_depuis_chiffre(i + 1)}=${printlatex(`${n * k}*a-(${m * k})*b`)}$`;
					texte_corr = texte;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=${k}\\times${n}a-${k}\\times${m}b$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=${k}(${n}a-${m}b)$`;
					break;
				case 'nkx+mkx2':
					texte = `$${lettre_depuis_chiffre(i + 1)}=${printlatex(`${n * k}*x+(${m * k})*x^2`)}$`;
					texte_corr = texte;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=${k}x\\times${n}+${k}x\\times${m}x$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=${k}x(${n}+${m}x)$`;
					break;
				case 'nkx-mkx2':
					texte = `$${lettre_depuis_chiffre(i + 1)}=${printlatex(`${n * k}*x-(${m * k})*x^2`)}$`;
					texte_corr = texte;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=${k}x\\times${n}-${k}x\\times${m}x$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=${k}x(${n}-${m}x)$`;
					break;
				case 'nx2+x':
					texte = `$${lettre_depuis_chiffre(i + 1)}=${n}x^2+x$`;
					texte_corr = texte;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=x\\times ${n}x+x\\times 1$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=x(${n}x+1)$`;
					break;
				case 'nx2+mx':
					texte = `$${lettre_depuis_chiffre(i + 1)}=${n}x^2+${m}x$`;
					texte_corr = texte;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=x\\times ${n}x+x\\times ${m}$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i + 1)}}=x(${n}x+${m})$`;
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
