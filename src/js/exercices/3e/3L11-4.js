import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,choice,combinaisonListes,abs,lettreDepuisChiffre,printlatex} from '../../modules/outils.js'
export const titre = 'Factoriser une expression'

/**
* Utiliser la simple ou la double distributivité et réduire l'expression
*
* @Auteur Rémi Angot
* 3L11-4
*/
export default function Factoriser_par_nombre_ou_x() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = titre;
	this.consigne = "Factoriser les expressions suivantes.";
	this.nbQuestions = 8;
	this.nbCols = 2;
	this.nbColsCorr = 2;
	sortieHtml ? this.spacingCorr = 2 : this.spacingCorr = 1;

	this.nouvelleVersion = function () {
		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = ['ka+nkb', '-ka+nkb', 'nka+mkb', 'nka-mkb', 'nkx+mkx2', 'nkx-mkx2', 'nx2+x', 'nx2+mx'];
		let liste_type_de_questions = combinaisonListes(type_de_questions_disponibles, this.nbQuestions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		for (let i = 0, texte, texteCorr, n, m, couplenm, k, cpt = 0; i < this.nbQuestions && cpt < 50;) {
			k = choice([2, 3, 5, 7, 11]);
			couplenm = choice([[2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [5, 6], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [3, 8], [5, 8], [7, 8], [2, 9], [4, 9], [5, 9], [7, 9], [8, 9], [3, 10], [7, 10], [9, 10]]); // n et m sont premiers entre eux
			n = couplenm[0];
			m = couplenm[1];
			switch (liste_type_de_questions[i]) {
				case 'ka+nkb':
					texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${k}*a+(${n * k})*b`)}$`;
					texteCorr = texte;
					if (n > 0) {
						texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}a+${k}\\times${n}b$`;
					} else {
						texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}a-${k}\\times${abs(n)}b$`;
					}
					texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}(${printlatex(`a+(${n})*b`)})$`;
					break;
				case '-ka+nkb':
					texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${-k}*a+(${n * k})*b`)}$`;
					texteCorr = texte;
					if (n > 0) {
						texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${-k}a+${k}\\times${n}b$`;
						texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}(${printlatex(`-a+${n}*b`)})$`;
					} else {
						texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${-k}a+(${-k})\\times${-n}b$`;
						texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${-k}(${printlatex(`a+(${-n})*b`)})$`;
					}
					break;
				case 'nka+mkb':
					texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${n * k}*a+(${m * k})*b`)}$`;
					texteCorr = texte;
					texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}\\times${n}a+${k}\\times${m}b$`;
					texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}(${n}a+${m}b)$`;
					break;
				case 'nka-mkb':
					texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${n * k}*a-(${m * k})*b`)}$`;
					texteCorr = texte;
					texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}\\times${n}a-${k}\\times${m}b$`;
					texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}(${n}a-${m}b)$`;
					break;
				case 'nkx+mkx2':
					texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${n * k}*x+(${m * k})*x^2`)}$`;
					texteCorr = texte;
					texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}x\\times${n}+${k}x\\times${m}x$`;
					texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}x(${n}+${m}x)$`;
					break;
				case 'nkx-mkx2':
					texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${n * k}*x-(${m * k})*x^2`)}$`;
					texteCorr = texte;
					texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}x\\times${n}-${k}x\\times${m}x$`;
					texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}x(${n}-${m}x)$`;
					break;
				case 'nx2+x':
					texte = `$${lettreDepuisChiffre(i + 1)}=${n}x^2+x$`;
					texteCorr = texte;
					texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=x\\times ${n}x+x\\times 1$`;
					texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=x(${n}x+1)$`;
					break;
				case 'nx2+mx':
					texte = `$${lettreDepuisChiffre(i + 1)}=${n}x^2+${m}x$`;
					texteCorr = texte;
					texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=x\\times ${n}x+x\\times ${m}$`;
					texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=x(${n}x+${m})$`;
					break;


			}
			if (this.listeQuestions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.listeQuestions.push(texte);
				this.listeCorrections.push(texteCorr);
				i++;
			}
			cpt++;
		}
		listeQuestionsToContenu(this);
	};
}
