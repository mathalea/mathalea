import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import {listeQuestionsToContenu,randint,combinaisonListes,calcul,lettreDepuisChiffre,htmlConsigne} from '../../modules/outils.js'
import {SvgReperageSurUnAxe,LatexReperageSurUnAxe} from '../../modules/macroSvgJs.js'

export const titre = 'Lire l’abscisse relative d’un point'

/**
* Lire l'abscisse décimale d'un point
* @author Jean-Claude Lhote et Rémi Angot
* Référence 5R11
*/
export default function Lire_abscisse_relative() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = titre;
	this.consigne = "Lire l'abscisse de chacun des points suivants.";
	this.nbQuestions = 3;
	this.nbQuestionsModifiable = true;
	this.nbCols = 1;
	this.nbColsCorr = 1;
	this.spacing = 1;
	this.spacingCorr = 1;
	this.sup = 4;
	this.listePackages = 'tkz-euclide';

	this.nouvelleVersion = function (numeroExercice) {
		let typesDeQuestions;
		this.listeQuestions = [];
		this.listeCorrections = [];
		this.contenu = ''; // Liste de questions
		this.contenuCorrection = ''; // Liste de questions corrigées
		if (this.sup == 4)
			typesDeQuestions = combinaisonListes([1, 2, 3], this.nbQuestions);
		else
			typesDeQuestions = combinaisonListes([parseInt(this.sup)], this.nbQuestions);


		this.contenu = htmlConsigne(this.consigne);
		for (let i = 0, abs0, l1, l2, l3, x1, x2, x3, x11, x22, x33, pas1, pas2, id_unique, texte, texteCorr; i < this.nbQuestions; i++) {
			l1 = lettreDepuisChiffre(i * 3 + 1);
			l2 = lettreDepuisChiffre(i * 3 + 2);
			l3 = lettreDepuisChiffre(i * 3 + 3);
			switch (typesDeQuestions[i]) {
				case 1: // Placer des décimaux relatifs sur un axe (1 décimale)
					abs0 = randint(-6, -3);
					pas1 = 1;
					pas2 = 10;
					break;

				case 2: // Placer des décimaux relatifs sur un axe (2 décimales)
					abs0 = randint(-4, -2) / 10;
					pas1 = 10;
					pas2 = 10;
					break;

				case 3: // Placer des décimaux relatifs sur un axe (3 décimales)
					abs0 = randint(-6, -2) / 100;
					pas1 = 100;
					pas2 = 10;
					break;
			}
			x1 = randint(0, 2); x2 = randint(3, 4); x3 = randint(5, 6);
			x11 = randint(1, 9); x22 = randint(1, 9); x33 = randint(1, 3);
			if (context.isHtml) {
				id_unique = `${i}_${Date.now()}`;
				this.contenu += `<div id="div_svg${numeroExercice}${id_unique}" style="width: 90%; height: 200px;  "></div>`;
				SvgReperageSurUnAxe(`div_svg${numeroExercice}${id_unique}`, abs0, 6, pas1, pas2, [[l1, x1, x11], [l2, x2, x22], [l3, x3, x33]], [[calcul(abs0 + 1 / pas1, 0), 1, 0], [calcul(abs0 + 2 / pas1, 0), 2, 0], [calcul(abs0 + 3 / pas1, 0), 3, 0], [calcul(abs0 + 4 / pas1, 0), 4, 0], [calcul(abs0 + 5 / pas1, 0), 5, 0], [calcul(abs0 + 6 / pas1, 0), 6, 0]], false);
				this.contenuCorrection += `<div id="div_svg_corr${numeroExercice}${id_unique}" style="width: 90%; height: 200px;  "></div>`;
				SvgReperageSurUnAxe(`div_svg_corr${numeroExercice}${id_unique}`, abs0, 6, pas1, pas2, [[l1, x1, x11, true], [l2, x2, x22, true], [l3, x3, x33, true]], [[calcul(abs0 + 1 / pas1, 0), 1, 0], [calcul(abs0 + 2 / pas1, 0), 2, 0], [calcul(abs0 + 3 / pas1, 0), 3, 0], [calcul(abs0 + 4 / pas1, 0), 4, 0], [calcul(abs0 + 5 / pas1, 0), 5, 0], [calcul(abs0 + 6 / pas1, 0), 6, 0]], false);
			}
			else { //sortie Latex 
				texte = LatexReperageSurUnAxe(2, abs0, pas1, pas2, [[l1, x1, x11], [l2, x2, x22], [l3, x3, x33]], [[calcul(abs0 + 1 / pas1, 0), 1, 0], [calcul(abs0 + 2 / pas1, 0), 2, 0], [calcul(abs0 + 3 / pas1, 0), 3, 0], [calcul(abs0 + 4 / pas1, 0), 4, 0], [calcul(abs0 + 5 / pas1, 0), 5, 0], [calcul(abs0 + 6 / pas1, 0), 6, 0]], false);
				texteCorr = LatexReperageSurUnAxe(2, abs0, pas1, pas2, [[l1, x1, x11, true], [l2, x2, x22, true], [l3, x3, x33, true]], [[calcul(abs0 + 1 / pas1, 0), 1, 0], [calcul(abs0 + 2 / pas1, 0), 2, 0], [calcul(abs0 + 3 / pas1, 0), 3, 0], [calcul(abs0 + 4 / pas1, 0), 4, 0], [calcul(abs0 + 5 / pas1, 0), 5, 0], [calcul(abs0 + 6 / pas1, 0), 6, 0]], false);
				this.listeQuestions.push(texte);
				this.listeCorrections.push(texteCorr);
			}

		}
		if (!context.isHtml)
			listeQuestionsToContenu(this);
	};
	this.besoinFormulaireNumerique = ['Niveau de difficulté', 4, "1 : Nombre relatif à une décimale\n2 : Nombre relatif à deux décimales\n3 : Nombre relatif à trois décimales\n4 : Mélange"];
}
