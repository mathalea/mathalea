import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,range1,combinaisonListes} from '../../modules/outils.js'


export const titre = 'Calculer la valeur d’une expression littérale'

/**
* Calculer la valeur d'une expression littérale
*
* * ax+b
* * a(x+b)
* * x^2+y^2
* * x^2-y^2
* * ax^2+b(x-1)+cy^3
* * ax^2+bx+c
* * ax^2+bx-c
* * ax^2-bx+c
* * axy+x+y
* * (ax+b)(cy-d)
* @Auteur Rémi Angot
* 5L14
*/
export default function Calculer_la_valeur_d_une_expression_litterale() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = titre;
	this.consigne = "";
	this.nbQuestions = 5;
	this.nbCols = 1;
	this.nbColsCorr = 1;

	this.nouvelleVersion = function () {
		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées


		//let type_de_questions_disponibles = range1(10)
		let type_de_questions_disponibles;

		if (this.version == "5L13-5") {
			type_de_questions_disponibles = range1(2);
		} else {
			type_de_questions_disponibles = range1(10);
		};

		let listeTypeDeQuestions = combinaisonListes(type_de_questions_disponibles, this.nbQuestions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

		for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
			let a, b, c, d, x, y;
			switch (listeTypeDeQuestions[i]) {
				case 1: // ax+b
					a = randint(2, 10);
					x = randint(2, 10, a);
					b = randint(1, 10, [a, x]);
					texte = `Calculer $${a}x+${b}$ pour $x=${x}$.`;
					texteCorr = `Pour $x=${x}$ : <br>`;
					texteCorr += `$${a}x+${b}=${a}\\times ${x}+${b}=${a * x}+${b}=${a * x + b}$`;
					break;
				case 2: // a(x+b)
					a = randint(2, 10);
					x = randint(2, 10, a);
					b = randint(1, 10, [a, x]);
					texte = `Calculer $${a}(x+${b})$ pour $x=${x}$.`;
					texteCorr = `Pour $x=${x}$ : <br>`;
					texteCorr += `$${a}(x+${b})=${a}\\times (${x}+${b})=${a}\\times ${x + b}=${a * (x + b)}$`;
					break;
				case 3: // x^2+y^2
					x = randint(2, 10);
					y = randint(2, 10);
					texte = `Calculer $x^2+y^2$ pour $x=${x}$ et $y=${y}$.`;
					texteCorr = `Pour $x=${x}$ et $y=${y}$ : <br>`;
					texteCorr += `$x^2+y^2=${x}^2+${y}^2=${x ** 2}+${y ** 2}=${x ** 2 + y ** 2}$`;
					break;
				case 4: // x^2-y^2
					x = randint(2, 10);
					y = randint(1, x - 1);
					texte = `Calculer $x^2-y^2$ pour $x=${x}$ et $y=${y}$.`;
					texteCorr = `Pour $x=${x}$ et $y=${y}$ : <br>`;
					texteCorr += `$x^2-y^2=${x}^2-${y}^2=${x ** 2}-${y ** 2}=${x ** 2 - y ** 2}$`;
					break;
				case 5: // ax^2+b(x-1)+cy^3
					a = randint(2, 5);
					b = randint(2, 6);
					c = randint(2, 6);
					x = randint(3, 6);
					y = choice([1, 2, 3, 5, 10]);
					texte = `Calculer $${a}x^2+${b}(x-1)+${c}y^3$ pour $x=${x}$ et $y=${y}$.`;
					texteCorr = `Pour $x=${x}$ et $y=${y}$ : <br>`;
					texteCorr += `$${a}x^2+${b}(x-1)+${c}y^3=${a}\\times ${x}^2+${b}(${x}-1)+${c}\\times ${y}^3=${a}\\times ${x ** 2}+${b}\\times ${x - 1}+${c}\\times ${y ** 3}=${a * x ** 2 + b * (x - 1) + c * y ** 3}$.`;
					break;
				case 6: // ax^2+bx+c
					a = randint(2, 5);
					b = randint(2, 6);
					c = randint(2, 6);
					x = randint(3, 6);
					texte = `Calculer $${a}x^2+${b}x+${c}$ pour $x=${x}$.`;
					texteCorr = `Pour $x=${x}$ : <br>`;
					texteCorr += `$${a}x^2+${b}x+${c}=${a}\\times ${x}^2+${b}\\times ${x}+${c}=${a}\\times ${x ** 2}+${b * x}+${c}=${a * x ** 2 + b * x + c}$`;
					break;
				case 7: // ax^2+bx-c
					a = randint(2, 5);
					b = randint(2, 6);
					c = randint(2, 6);
					x = randint(3, 6);
					texte = `Calculer $${a}x^2+${b}x-${c}$ pour $x=${x}$.`;
					texteCorr = `Pour $x=${x}$ : <br>`;
					texteCorr += `$${a}x^2+${b}x-${c}=${a}\\times ${x}^2+${b}\\times ${x}-${c}=${a}\\times ${x ** 2}+${b * x}-${c}=${a * x ** 2 + b * x - c}$`;
					break;
				case 8: // ax^2-bx+c
					a = randint(2, 5);
					b = randint(2, a);
					c = randint(2, 6);
					x = randint(3, 6);
					texte = `Calculer $${a}x^2-${b}x+${c}$ pour $x=${x}$.`;
					texteCorr = `Pour $x=${x}$ : <br>`;
					texteCorr += `$${a}x^2-${b}x+${c}=${a}\\times ${x}^2-${b}\\times ${x}+${c}=${a}\\times ${x ** 2}-${b * x}+${c}=${a * x ** 2 - b * x + c}$`;
					break;

				case 9: // axy+x+y
					a = randint(2, 10);
					x = randint(2, 10);
					y = randint(2, 10, x);
					texte = `Calculer $${a}xy+x+y$ pour $x=${x}$ et $y=${y}$.`;
					texteCorr = `Pour $x=${x}$ et $y=${y}$ : <br>`;
					texteCorr += `$${a}xy+x+y=${a}\\times ${x}\\times ${y}+${x}+${y}=${a * x * y}+${x}+${y}=${a * x * y + x + y}$`;
					break;
				case 10: // (ax+b)(cy-d)
					a = randint(2, 10);
					x = randint(2, 10);
					b = randint(1, 10);
					y = randint(2, 10, x);
					c = randint(2, 10);
					d = randint(1, Math.min(10, c * y));
					texte = `Calculer $(${a}x+${b})(${c}y-${d})$ pour $x=${x}$ et $y=${y}$.`;
					texteCorr = `Pour $x=${x}$ et $y=${y}$ : <br>`;
					texteCorr += `$(${a}x+${b})(${c}y-${d})=(${a}\\times ${x}+${b})(${c}\\times ${y}-${d})=${a * x + b}\\times ${c * y - d}=${(a * x + b) * (c * y - d)}$`;
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
	//this.besoinFormulaireCaseACocher = true;
}
