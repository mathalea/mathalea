import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,ecriture_nombre_relatif,ecriture_algebrique} from "/modules/outils.js"


/**
* Simplifier l'écriture d'une somme de 2 relatifs et calculer
*
* On peut paramétrer les distances à zéro qui sont par défaut inférieures à 20
* @Auteur Rémi Angot
* 5R22-2
*/
export default function Exercice_simplification_somme_algebrique(max = 20) {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = max;
	this.titre = "Simplifier l'écriture d'une somme de 2 relatifs et calculer";
	this.consigne = 'Simplifier puis calculer';
	this.spacing = 2;

	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		for (let i = 0, a, b, s, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
			a = randint(1, this.sup) * choice([-1, 1]);
			b = randint(1, this.sup) * choice([-1, 1]);
			s = choice([-1, 1]); // + ou -

			if (s == 1) {
				texte = '$ ' + ecriture_nombre_relatif(a) + ' + ' + ecriture_nombre_relatif(b) + ' = \\dotfill $';
				texte_corr = '$ ' + ecriture_nombre_relatif(a) + ' + ' + ecriture_nombre_relatif(b) + ' = ' + a + ecriture_algebrique(s * b) + ' = ' + (a + b) + ' $';
			} else {
				texte = '$ ' + ecriture_nombre_relatif(a) + ' - ' + ecriture_nombre_relatif(b) + ' = \\dotfill $';
				texte_corr = '$ ' + ecriture_nombre_relatif(a) + ' - ' + ecriture_nombre_relatif(b) + ' = ' + a + ecriture_algebrique(s * b) + ' = ' + (a - b) + ' $';
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
	this.besoin_formulaire_numerique = ['Valeur maximale', 99999];
}
