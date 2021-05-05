import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,combinaisonListes,ecritureAlgebrique,lettreDepuisChiffre,printlatex} from '../../modules/outils.js'


export const titre = 'Réduire une expression de la forme $ax+bx$ '

/**
* Réduire des expressions de la forme ax+bx
*
* @Auteur Rémi Angot
* 5L13
*/
export default function Reduction_ax_bx() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = titre
	this.consigne = "Réduire les expressions suivantes, si cela est possible.";
	this.nbQuestions = 5;
	this.nbCols = 1;
	this.nbColsCorr = 1;

	this.nouvelleVersion = function () {
		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = ['ax+bx'];
		let listeTypeDeQuestions = combinaisonListes(type_de_questions_disponibles, this.nbQuestions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		for (let i = 0, texte, texteCorr, a, b, c, d, cpt = 0; i < this.nbQuestions && cpt < 50;) {
			a = randint(-11, 11, 0);
			b = randint(-11, 11, [0, a]);
			c = randint(-11, 11, [0]);
			d = randint(-11, 11, 0);
			switch (listeTypeDeQuestions[i]) {
				case 'ax+bx':
					texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${a}*x+(${b}*x)`)}$`;
					texteCorr = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${a}*x+(${b}*x)`)}=(${a}${ecritureAlgebrique(b)})\\times x=${printlatex(`${a + b}x`)}$`;
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
