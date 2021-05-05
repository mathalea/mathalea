import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,prenom, Trouver_solution_mathador} from '../../modules/outils.js'


export const titre = 'Traduire une succession des opérations par une expression'

/**
 * Transformer un programme de calcul avec les 4 opérations dans un ordre aléatoire en un seul calcul.
 * @Auteur Jean-Claude Lhote
 * Référence 5C11-2
 */
export default function Ecrire_une_expression_mathador() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = titre;
	this.consigne = "";
	this.nbQuestions = 4;
	this.nbCols = 1;
	this.nbColsCorr = 1;

	this.nouvelleVersion = function () {
		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées
		let expression, calculs_successifs, tirage, cible, solution_mathador, quidam;
		for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
			// traduire un calcul mathador
			solution_mathador = Trouver_solution_mathador(30, 90);
			tirage = solution_mathador[0];
			cible = solution_mathador[1];
			calculs_successifs = solution_mathador[2];
			expression = solution_mathador[3];
			quidam = prenom();
			texte = `${quidam} a trouvé une solution mathador pour le tirage suivant $${tirage[0]}~;~${tirage[1]}~;~${tirage[2]}~;~${tirage[3]}~;~${tirage[4]}$ et pour la cible $${cible}$, voici ses calculs :<br>`;
			for (let j = 0; j < 4; j++) {
				texte += `$${calculs_successifs[j]}$<br>`;
			}
			texte += `Écris cette succession d'opérations en une seule expression.`;
			texteCorr = `L'expression correspondante au calcul de ${quidam} est<br>$${expression}$ ou $${solution_mathador[4]}$.`;
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
