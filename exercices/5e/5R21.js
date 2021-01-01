import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,ecriture_nombre_relatif,ecriture_nombre_relatifc,ecriture_algebrique,ecriture_parenthese_si_negatif} from "/modules/outils.js"


/**
* Effectuer la soustraction de  2 nombres relatifs.
*
* * On peut paramétrer la distance à zéro maximale des deux termes (par défaut égale à 20)
* * On peut choisir d'avoir une écriture simplifiée  (par défaut ce n'est pas le cas)
* @Auteur Rémi Angot
* 5R21
*/
export default function Exercice_soustractions_relatifs(max = 20) {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = max;
	this.sup2 = false; // écriture simplifiée
	this.titre = "Soustraction de deux entiers relatifs";
	this.consigne = 'Calculer';
	this.spacing = 2;

	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		for (let i = 0, a, b, k, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
			a = randint(1, this.sup);
			b = randint(1, this.sup);
			k = choice([[-1, -1], [-1, 1], [1, -1]]); // Les deux nombres relatifs ne peuvent pas être tous les deux positifs
			a = a * k[0];
			b = b * k[1];
			if (this.sup2) {
				texte = '$ ' + a + ' - ' + ecriture_parenthese_si_negatif(b) + ' = \\dotfill $';
				if (b > 0) {
					texte_corr = '$ ' + a + ' - ' + ecriture_parenthese_si_negatif(b) + ' = ' + (a - b) + ' $';
				} else {
					texte_corr = '$ ' + a + ' - ' + ecriture_parenthese_si_negatif(b) + ' = ' + a + ecriture_algebrique(-1 * b) + ' = ' + (a - b) + ' $';
				}
			} else {
				texte = '$ ' + ecriture_nombre_relatif(a) + ' - ' + ecriture_nombre_relatif(b) + ' = \\dotfill $';
				texte_corr = '$ ' + ecriture_nombre_relatif(a) + ' - ' + ecriture_nombre_relatif(b) + ' = ' + ecriture_nombre_relatifc(a) + ' + ' + ecriture_nombre_relatifc(-1 * b) + ' = ' + ecriture_nombre_relatifc(a - b) + ' $';
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
	this.besoin_formulaire2_case_a_cocher = ['Avec des écritures simplifiées'];
}
