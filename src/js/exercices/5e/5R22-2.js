import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,ecritureNombreRelatif,ecritureAlgebrique} from '../../modules/outils.js'


export const titre = 'Simplifier l’écriture d’une somme de 2 relatifs et calculer'

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
	this.titre = titre;
	this.consigne = 'Simplifier puis calculer';
	this.spacing = 2;

	this.nouvelleVersion = function () {
		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées
		for (let i = 0, a, b, s, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
			a = randint(1, this.sup) * choice([-1, 1]);
			b = randint(1, this.sup) * choice([-1, 1]);
			s = choice([-1, 1]); // + ou -

			if (s == 1) {
				texte = '$ ' + ecritureNombreRelatif(a) + ' + ' + ecritureNombreRelatif(b) + ' = \\dotfill $';
				texteCorr = '$ ' + ecritureNombreRelatif(a) + ' + ' + ecritureNombreRelatif(b) + ' = ' + a + ecritureAlgebrique(s * b) + ' = ' + (a + b) + ' $';
			} else {
				texte = '$ ' + ecritureNombreRelatif(a) + ' - ' + ecritureNombreRelatif(b) + ' = \\dotfill $';
				texteCorr = '$ ' + ecritureNombreRelatif(a) + ' - ' + ecritureNombreRelatif(b) + ' = ' + a + ecritureAlgebrique(s * b) + ' = ' + (a - b) + ' $';
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
}
