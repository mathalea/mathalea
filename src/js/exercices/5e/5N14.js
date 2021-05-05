import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,enleveElement,choice,miseEnEvidence,obtenir_liste_fractions_irreductibles,tex_fraction} from '../../modules/outils.js'


export const titre = 'Comparer des fractions (dénominateurs multiples)'

/**
* Comparer deux fractions dont les dénominateurs sont multiples (avec un coefficient paramétrable qui est par défaut inférieur à 11)
* @Auteur Rémi Angot
* 5N14
*/
export default function Exercice_comparer_deux_fractions(max = 11) {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = max; // Correspond au facteur commun
	this.titre = titre;
	this.consigne = 'Comparer les fractions suivantes.';
	this.spacing = 2;
	this.spacingCorr = 2;
	this.nbQuestions = 5;
	this.nbColsCorr = 1;

	this.nouvelleVersion = function () {
		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées
		let liste_fractions = obtenir_liste_fractions_irreductibles();
		for (let i = 0, fraction, a, b, k, texte, texteCorr, signe, signe2; i < this.nbQuestions; i++) {
			fraction = choice(liste_fractions); //
			a = fraction[0];
			b = fraction[1];
			k = randint(2, this.sup);
			let ecart = choice([-4, -3, -2, -1, 1, 2, 3, 4]);
			if (k * a + ecart <= 0) {
				ecart = ecart * (-1);
			}
			if (ecart > 0) {
				signe = `<`;
				signe2 = `>`;
			} else {
				signe = `>`;
				signe2 = `<`;
			}
			enleveElement(liste_fractions, fraction); // Il n'y aura pas 2 fois la même réponse

			let ordre_des_fractions = randint(1, 2);
			if (ordre_des_fractions == 1) {
				texte = `$${tex_fraction(a, b)} \\quad$ et $\\quad ${tex_fraction(k * a + ecart, k * b)}$`;
			} else {
				texte = `$${tex_fraction(k * a + ecart, k * b)} \\quad$ et $\\quad ${tex_fraction(a, b)}$`;
			}
			if (!sortieHtml) {
				texte = texte.replace('\\quad$ et $\\quad', '\\ldots\\ldots\\ldots');
			}
			texteCorr = `$${tex_fraction(a, b)}=${tex_fraction(a + miseEnEvidence('\\times  ' + k), b + miseEnEvidence('\\times  ' + k))}=${tex_fraction(a * k, b * k)}\\quad$`;
			if (ordre_des_fractions == 1) {
				texteCorr += `  et   $\\quad${tex_fraction(a * k, b * k)} ${signe} ${tex_fraction(a * k + ecart, b * k)}\\quad$ donc $\\quad${tex_fraction(a, b)} ${signe} ${tex_fraction(a * k + ecart, b * k)}$ `;
			} else {
				texteCorr += `  et   $\\quad${tex_fraction(a * k + ecart, b * k)} ${signe2} ${tex_fraction(a * k, b * k)} \\quad$ donc $\\quad ${tex_fraction(a * k + ecart, b * k)} ${signe2} ${tex_fraction(a, b)} $ `;
			}
			this.listeQuestions.push(texte);
			this.listeCorrections.push(texteCorr);
		}
		listeQuestionsToContenu(this); //Espacement de 2 em entre chaque questions.
	};
	this.besoinFormulaireNumerique = ['Valeur maximale du coefficient multiplicateur', 99999];
}
