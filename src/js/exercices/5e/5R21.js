import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,ecritureNombreRelatif,ecritureNombreRelatifc,ecritureAlgebrique,ecritureParentheseSiNegatif} from '../../modules/outils.js'


export const titre = 'Soustraction de deux entiers relatifs'

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
	this.titre = titre;
	this.consigne = 'Calculer';
	this.spacing = 2;

	this.nouvelleVersion = function () {
		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées
		for (let i = 0, a, b, k, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
			a = randint(1, this.sup);
			b = randint(1, this.sup);
			k = choice([[-1, -1], [-1, 1], [1, -1]]); // Les deux nombres relatifs ne peuvent pas être tous les deux positifs
			a = a * k[0];
			b = b * k[1];
			if (this.sup2) {
				texte = '$ ' + a + ' - ' + ecritureParentheseSiNegatif(b) + ' = \\dotfill $';
				if (b > 0) {
					texteCorr = '$ ' + a + ' - ' + ecritureParentheseSiNegatif(b) + ' = ' + (a - b) + ' $';
				} else {
					texteCorr = '$ ' + a + ' - ' + ecritureParentheseSiNegatif(b) + ' = ' + a + ecritureAlgebrique(-1 * b) + ' = ' + (a - b) + ' $';
				}
			} else {
				texte = '$ ' + ecritureNombreRelatif(a) + ' - ' + ecritureNombreRelatif(b) + ' = \\dotfill $';
				texteCorr = '$ ' + ecritureNombreRelatif(a) + ' - ' + ecritureNombreRelatif(b) + ' = ' + ecritureNombreRelatifc(a) + ' + ' + ecritureNombreRelatifc(-1 * b) + ' = ' + ecritureNombreRelatifc(a - b) + ' $';
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
	this.besoinFormulaireNumerique = ['Valeur maximale', 99999];
	this.besoin_formulaire2_case_a_cocher = ['Avec des écritures simplifiées'];
}
