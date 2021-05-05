import Exercice from '../ClasseExercice.js';
import {deuxColonnes,randint,texConsigne,numAlpha} from '../../modules/outils.js'
import {repere2,graphiqueInterpole,mathalea2d,} from '../../modules/2d.js'
export const titre = 'Lecture graphique d’images et d’antécédents'

/**
 * Lecture d'images et antécédents sur un graphe sinusoidale
 * @Auteur Rémi Angot
 * Référence 3F13-1
*/
export default function Antecedent_et_image_graphique() {
	Exercice.call(this);
	this.titre = titre;
	this.nbQuestions = 1;
	this.nbQuestionsModifiable = false;
	this.nbCols = 1;
	this.nbColsCorr = 1;
	if (sortieHtml)
		this.spacingCorr = 2;

	this.nouvelleVersion = function () {
		let r = repere2({
			xMin: -5,
			xMax: 5,
			yMin: -4,
			yMax: 4
		});
		let a = randint(1, 3);
		let b = a - 4;
		let c = a - 2;
		let x0 = randint(-4, -2);
		let gr = graphiqueInterpole([[randint(-8, -5), a - 1], [x0, a], [x0 + 4, b], [x0 + 6, c], [randint(6, 10), c - 1]] // Coordonnées des "sommets"
			,
			{ repere: r, color: 'blue', step: .15, epaisseur: 2 });

		if (randint(1, 2) == 1) {
			a *= -1;
			b *= -1;
			c *= -1;
			gr = graphiqueInterpole([[randint(-8, -5), a + 1], [x0, a], [x0 + 4, b], [x0 + 6, c], [randint(6, 10), c + 1]] // Coordonnées des "sommets"
				,
				{ repere: r, color: 'blue', step: .15, epaisseur: 2 });
		}
		this.contenu = `Ci-dessous, on a tracé la courbe représentative de la fonction $f$.`;
		this.contenu += `<br><br>`;
		let cont1 = `${numAlpha(0)} Quelle est l'image de $${x0}$ ?`;
		cont1 += `<br>${numAlpha(1)} Quelle est l'image de $${x0 + 5}$ ?`;
		let ordre = randint(1, 2);
		let cont2;
		if (ordre == 1) {
			cont2 = `${numAlpha(2)} Déterminer le (ou les) antécédent(s) de $${b}$.`;
			cont2 += `<br>${numAlpha(3)} Déterminer le (ou les) antécédent(s) de $${c}$.`;
		} else {
			cont2 = `${numAlpha(2)} Déterminer le (ou les) antécédent(s) de $${c}$.`;
			cont2 += `<br>${numAlpha(3)} Déterminer le (ou les) antécédent(s) de $${b}$.`;
		}
		this.contenu += deuxColonnes(cont1, cont2);
		this.contenu += mathalea2d({ xmin: -7, ymin: -4.5, xmax: 7, ymax: 4.5, pixelsParCm: 30 }, r, gr);
		this.contenuCorrection = `${numAlpha(0)} L'image de $${x0}$ est $${a}$, on note $f(${x0})=${a}$.`;
		this.contenuCorrection += `<br>${numAlpha(1)} L'image de $${x0 + 5}$ est $${(b + c) / 2}$, on note $f(${x0 + 5})=${(b + c) / 2}$.`;
		if (ordre == 1) {
			this.contenuCorrection += `<br>${numAlpha(2)} $${b}$ a pour unique antécédent $${x0 + 4}$, on note $f(${x0 + 4})=${b}$.`;
			this.contenuCorrection += `<br>${numAlpha(3)} $${c}$ a deux antécédents $${x0 + 2}$ et $${x0 + 6}$, on note $f(${x0 + 2})=f(${x0 + 6})=${c}$.`;
		} else {
			this.contenuCorrection += `<br>${numAlpha(2)} $${c}$ a deux antécédents $${x0 + 2}$ et $${x0 + 6}$, on note $f(${x0 + 2})=f(${x0 + 6})=${c}$.`;
			this.contenuCorrection += `<br>${numAlpha(3)} $${b}$ a pour unique antécédent $${x0 + 4}$, on note $f(${x0 + 4})=${b}$.`;
		}
		if (!sortieHtml) {
			this.contenu = texConsigne('') + this.contenu.replace(/<br><br>/g, '\n\n\\medskip\n').replace(/<br>/g, '\\\\\n');
			this.contenuCorrection = this.contenuCorrection.replace(/<br><br>/g, '\n\n\\medskip\n').replace(/<br>/g, '\\\\\n');
		} else {
			this.contenuCorrection = `<div style="line-height: ${this.spacingCorr};">\n${this.contenuCorrection}\n</div>`;
		}

	};
}
