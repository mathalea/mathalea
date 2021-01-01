import Exercice from '../ClasseExercice.js';
import {deuxColonnes,randint,tex_consigne,num_alpha} from "/modules/outils.js"
import {repere2,graphiqueInterpole,mathalea2d,} from "/modules/2d.js"
/**
 * Lecture d'images et antécédents sur un graphe sinusoidale
 * @Auteur Rémi Angot
 * Référence 3F13-1
*/
export default function Antecedent_et_image_graphique() {
	Exercice.call(this);
	this.titre = "Lecture graphique d'images et d'antécédents.";
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	if (sortie_html)
		this.spacing_corr = 2;

	this.nouvelle_version = function () {
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
		let cont1 = `${num_alpha(0)} Quelle est l'image de $${x0}$ ?`;
		cont1 += `<br>${num_alpha(1)} Quelle est l'image de $${x0 + 5}$ ?`;
		let ordre = randint(1, 2);
		let cont2;
		if (ordre == 1) {
			cont2 = `${num_alpha(2)} Déterminer le (ou les) antécédent(s) de $${b}$.`;
			cont2 += `<br>${num_alpha(3)} Déterminer le (ou les) antécédent(s) de $${c}$.`;
		} else {
			cont2 = `${num_alpha(2)} Déterminer le (ou les) antécédent(s) de $${c}$.`;
			cont2 += `<br>${num_alpha(3)} Déterminer le (ou les) antécédent(s) de $${b}$.`;
		}
		this.contenu += deuxColonnes(cont1, cont2);
		this.contenu += mathalea2d({ xmin: -7, ymin: -4.5, xmax: 7, ymax: 4.5, pixelsParCm: 30 }, r, gr);
		this.contenu_correction = `${num_alpha(0)} L'image de $${x0}$ est $${a}$, on note $f(${x0})=${a}$.`;
		this.contenu_correction += `<br>${num_alpha(1)} L'image de $${x0 + 5}$ est $${(b + c) / 2}$, on note $f(${x0 + 5})=${(b + c) / 2}$.`;
		if (ordre == 1) {
			this.contenu_correction += `<br>${num_alpha(2)} $${b}$ a pour unique antécédent $${x0 + 4}$, on note $f(${x0 + 4})=${b}$.`;
			this.contenu_correction += `<br>${num_alpha(3)} $${c}$ a deux antécédents $${x0 + 2}$ et $${x0 + 6}$, on note $f(${x0 + 2})=f(${x0 + 6})=${c}$.`;
		} else {
			this.contenu_correction += `<br>${num_alpha(2)} $${c}$ a deux antécédents $${x0 + 2}$ et $${x0 + 6}$, on note $f(${x0 + 2})=f(${x0 + 6})=${c}$.`;
			this.contenu_correction += `<br>${num_alpha(3)} $${b}$ a pour unique antécédent $${x0 + 4}$, on note $f(${x0 + 4})=${b}$.`;
		}
		if (!sortie_html) {
			this.contenu = tex_consigne('') + this.contenu.replace(/<br><br>/g, '\n\n\\medskip\n').replace(/<br>/g, '\\\\\n');
			this.contenu_correction = this.contenu_correction.replace(/<br><br>/g, '\n\n\\medskip\n').replace(/<br>/g, '\\\\\n');
		} else {
			this.contenu_correction = `<div style="line-height: ${this.spacing_corr};">\n${this.contenu_correction}\n</div>`;
		}

	};
}
