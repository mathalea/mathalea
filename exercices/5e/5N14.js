import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,enleve_element,choice,mise_en_evidence,obtenir_liste_fractions_irreductibles,tex_fraction} from "/modules/outils.js"


/**
* Comparer deux fractions dont les dénominateurs sont multiples (avec un coefficient paramétrable qui est par défaut inférieur à 11)
* @Auteur Rémi Angot
* 5N14
*/
export default function Exercice_comparer_deux_fractions(max = 11) {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = max; // Correspond au facteur commun
	this.titre = "Comparer des fractions (dénominateurs multiples)";
	this.consigne = 'Comparer les fractions suivantes.';
	this.spacing = 2;
	this.spacing_corr = 2;
	this.nb_questions = 5;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let liste_fractions = obtenir_liste_fractions_irreductibles();
		for (let i = 0, fraction, a, b, k, texte, texte_corr, signe, signe2; i < this.nb_questions; i++) {
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
			enleve_element(liste_fractions, fraction); // Il n'y aura pas 2 fois la même réponse

			let ordre_des_fractions = randint(1, 2);
			if (ordre_des_fractions == 1) {
				texte = `$${tex_fraction(a, b)} \\quad$ et $\\quad ${tex_fraction(k * a + ecart, k * b)}$`;
			} else {
				texte = `$${tex_fraction(k * a + ecart, k * b)} \\quad$ et $\\quad ${tex_fraction(a, b)}$`;
			}
			if (!sortie_html) {
				texte = texte.replace('\\quad$ et $\\quad', '\\ldots\\ldots\\ldots');
			}
			texte_corr = `$${tex_fraction(a, b)}=${tex_fraction(a + mise_en_evidence('\\times  ' + k), b + mise_en_evidence('\\times  ' + k))}=${tex_fraction(a * k, b * k)}\\quad$`;
			if (ordre_des_fractions == 1) {
				texte_corr += `  et   $\\quad${tex_fraction(a * k, b * k)} ${signe} ${tex_fraction(a * k + ecart, b * k)}\\quad$ donc $\\quad${tex_fraction(a, b)} ${signe} ${tex_fraction(a * k + ecart, b * k)}$ `;
			} else {
				texte_corr += `  et   $\\quad${tex_fraction(a * k + ecart, b * k)} ${signe2} ${tex_fraction(a * k, b * k)} \\quad$ donc $\\quad ${tex_fraction(a * k + ecart, b * k)} ${signe2} ${tex_fraction(a, b)} $ `;
			}
			this.liste_questions.push(texte);
			this.liste_corrections.push(texte_corr);
		}
		liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
	};
	this.besoin_formulaire_numerique = ['Valeur maximale du coefficient multiplicateur', 99999];
}
