import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,combinaisonListes,ecritureAlgebrique,ecritureParentheseSiNegatif,texFractionReduite,lettre_minuscule_depuis_chiffre,katex_Popup2,fractionSimplifiee} from '../../modules/outils.js'


export const titre = 'Déterminer l’image d’un nombre par une fonction d’après sa forme algébrique'

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
	this.titre = titre;
	this.consigne = "";
	this.nbQuestions = 5;
	this.nbCols = 1;
	this.nbColsCorr = 1;
	this.sup = 5; // niveau de difficulté

	this.nouvelleVersion = function (numeroExercice) {
		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées

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
		let liste_type_de_questions = combinaisonListes(type_de_questions_disponibles, this.nbQuestions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		let liste_de_signes_de_x = combinaisonListes([true, false], this.nbQuestions);
		for (let i = 0, texte, texteCorr, a, b, c, d, expression, nomdef, x, cpt = 0; i < this.nbQuestions && cpt < 50;) {
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
					texteCorr = `$${nomdef}(${x})=${a}\\times ${ecritureParentheseSiNegatif(x)}+${b}=${a * x}+${b}=${a * x + b}$`
					break;
				case 'ax-b':
					expression = `${a}x-${b}`
					texteCorr = `$${nomdef}(${x})=${a}\\times ${ecritureParentheseSiNegatif(x)}-${b}=${a * x}-${b}=${a * x - b}$`
					break;
				case '-ax+b':
					expression = `-${a}x+${b}`
					texteCorr = `$${nomdef}(${x})=-${a}\\times ${ecritureParentheseSiNegatif(x)}+${b}=${-1 * a * x}+${b}=${-1 * a * x + b}$`
					break;
				case '-ax-b':
					expression = `-${a}x-${b}`
					texteCorr = `$${nomdef}(${x})=-${a}\\times ${ecritureParentheseSiNegatif(x)}-${b}=${-1 * a * x}-${b}=${-1 * a * x - b}$`
					break;
				case 'ax2+bx+c':
					expression = `${a}x^2+${b}x+${c}`
					texteCorr = `$${nomdef}(${x})=${a}\\times ${ecritureParentheseSiNegatif(x)}^2+${b}\\times ${ecritureParentheseSiNegatif(x)}+${c}=${a}\\times${x * x}${ecritureAlgebrique(b * x)}+${c}=${a * x * x}${ecritureAlgebrique(b * x)}+${c}=${a * x * x + b * x + c}$`
					break;
				case 'ax2+c':
					expression = `${a}x^2+${c}`
					texteCorr = `$${nomdef}(${x})=${a}\\times ${ecritureParentheseSiNegatif(x)}^2+${c}=${a}\\times${x * x}+${c}=${a * x * x}+${c}=${a * x * x + c}$`
					break;
				case 'ax2+bx':
					expression = `${a}x^2+${b}x`
					texteCorr = `$${nomdef}(${x})=${a}\\times ${ecritureParentheseSiNegatif(x)}^2+${b}\\times ${ecritureParentheseSiNegatif(x)}=${a}\\times${x * x}${ecritureAlgebrique(b * x)}=${a * x * x}${ecritureAlgebrique(b * x)}=${a * x * x + b * x}$`
					break;
				case '-ax2+bx-c':
					expression = `-${a}x^2+${b}x-${c}`
					texteCorr = `$${nomdef}(${x})=-${a}\\times ${ecritureParentheseSiNegatif(x)}^2+${b}\\times ${ecritureParentheseSiNegatif(x)}-${c}=-${a}\\times${x * x}${ecritureAlgebrique(b * x)}-${c}=${-1 * a * x * x}${ecritureAlgebrique(b * x)}-${c}=${-1 * a * x * x + b * x - c}$`
					break;
				case '-ax2-bx-c':
					expression = `-${a}x^2-${b}x-${c}`
					texteCorr = `$${nomdef}(${x})=-${a}\\times ${ecritureParentheseSiNegatif(x)}^2-${b}\\times ${ecritureParentheseSiNegatif(x)}-${c}=-${a}\\times${x * x}${ecritureAlgebrique(-1 * b * x)}-${c}=${-1 * a * x * x}${ecritureAlgebrique(-1 * b * x)}-${c}=${-1 * a * x * x - b * x - c}$`
					break;
				case '-ax2-bx+c':
					expression = `-${a}x^2-${b}x+${c}`
					texteCorr = `$${nomdef}(${x})=-${a}\\times ${ecritureParentheseSiNegatif(x)}^2-${b}\\times ${ecritureParentheseSiNegatif(x)}+${c}=-${a}\\times${x * x}${ecritureAlgebrique(-1 * b * x)}+${c}=${-1 * a * x * x}${ecritureAlgebrique(-1 * b * x)}+${c}=${-1 * a * x * x - b * x + c}$`
					break;
				case '-ax2-bx':
					expression = `-${a}x^2-${b}x`
					texteCorr = `$${nomdef}(${x})=-${a}\\times ${ecritureParentheseSiNegatif(x)}^2-${b}\\times ${ecritureParentheseSiNegatif(x)}=-${a}\\times${x * x}${ecritureAlgebrique(-1 * b * x)}=${-1 * a * x * x}${ecritureAlgebrique(-1 * b * x)}=${-1 * a * x * x - b * x}$`
					break;
				case 'a/cx+d':
					d = randint(1, 11)
					while (c * x + d == 0) {
						c = randint(2, 11)
					}
					expression = `\\dfrac{${a}}{${c}x+${d}}`
					texteCorr = `$${nomdef}(${x})=\\dfrac{${a}}{${c}\\times${ecritureParentheseSiNegatif(x)}+${d}}=\\dfrac{${a}}{${c * x}+${d}}=\\dfrac{${a}}{${c * x + d}}=${texFractionReduite(a, c * x + d)}$`
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
					texteCorr = `$${nomdef}(${x})=\\dfrac{${a}\\times${ecritureParentheseSiNegatif(x)}+${b}}{${c}\\times${ecritureParentheseSiNegatif(x)}+${d}}=\\dfrac{${a * x}+${b}}{${c * x}+${d}}=\\dfrac{${a * x + b}}{${c * x + d}}=${texFractionReduite(a * x + b, c * x + d)}$`
					break;
				case '(ax+b)(cx+d)':
					a = randint(-4, 4, [0, 1, -1])
					b = randint(-4, 4, [0])
					c = randint(-4, 4, [0, 1, -1])
					d = randint(-4, 4, [0])
					x = randint(-2, 2, [0])

					expression = `(${a}x${ecritureAlgebrique(b)})(${c}x${ecritureAlgebrique(d)})`
					texteCorr = `$${nomdef}(${x})=\\left(${a}\\times${ecritureParentheseSiNegatif(x)}${ecritureAlgebrique(b)}\\right)\\left(${c}\\times${ecritureParentheseSiNegatif(x)}${ecritureAlgebrique(d)}\\right)=(${a * x}${ecritureAlgebrique(b)})(${c * x}${ecritureAlgebrique(d)})=${a * x + b}\\times${ecritureParentheseSiNegatif(c * x + d)}=${(a * x + b) * (c * x + d)}$`
					break;
				case '(ax+b)2':
					a = randint(-4, 4, [0, -1, 1])
					b = randint(-4, 4, [0])
					c = randint(-4, 4, [0, -1, 1])
					d = randint(-4, 4, [0])
					x = randint(-2, 2, [0])

					expression = `(${a}x${ecritureAlgebrique(b)})^2`
					texteCorr = `$${nomdef}(${x})=\\left(${a}\\times${ecritureParentheseSiNegatif(x)}${ecritureAlgebrique(b)}\\right)^2=(${a * x}${ecritureAlgebrique(b)})^2=${ecritureParentheseSiNegatif(a * x + b)}^2=${(a * x + b) * (a * x + b)}$`
					break;
			}

			texte = `On considère la fonction $${nomdef}$ définie par $${nomdef}:x\\mapsto ${expression}$. Calculer $${nomdef}(${x})$.`


			if (this.listeQuestions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.listeQuestions.push(texte);
				this.listeCorrections.push(texteCorr);
				i++;
			}
			cpt++;
		}
		listeQuestionsToContenu(this);
	}
	this.besoinFormulaireNumerique = ['Niveau de difficulté', 5, '1 : Fonctions affines\n2 : Polynome du second degré\n3 : Quotient\n4 : Produit \n5 : Mélange'];
}
