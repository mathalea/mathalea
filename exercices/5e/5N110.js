import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,tex_prix,tex_fraction} from "/modules/outils.js"


/**
* Calculer +/- 20, 30, 40 ou 60 %
* @Auteur Rémi Angot
* 5N110
*/
export default function Variation_en_pourcentages() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Variation en pourcentages";
	this.consigne = "Calculer le nouveau prix";
	this.nb_questions = 5;
	this.spacing = 1;
	this.spacing_corr = 2;
	this.nb_cols_corr = 1;
	this.nb_cols = 1;

	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		for (let i = 0, prix, taux, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
			prix = choice([randint(2, 9), randint(1, 9) * 10, randint(1, 9) * 100, Algebrite.eval(randint(11, 99) / 10)]);
			// X | X0 | X00 | X,X0
			taux = choice([20, 30, 40, 60]);
			if (choice([true, false])) {
				if (sortie_html) {
					texte = `Un article coûtait ${tex_prix(prix)} € et son prix diminue de ${taux} \%.`;
				} else {
					texte = `Un article coûtait ${tex_prix(prix)} € et son prix diminue de ${taux}~\\%.`;
				}

				texte_corr = `$\\text{Diminution : }${tex_fraction(taux, 100)}\\times  ${tex_prix(prix)} = ${tex_prix(Algebrite.eval(prix * taux))}\\div 100=${tex_prix(Algebrite.eval(prix * taux / 100))}$ €`;
				texte_corr += `<br>`;
				texte_corr += `$\\text{Nouveau prix : }${tex_prix(prix)}-${tex_prix(Algebrite.eval(prix * taux / 100))}=${tex_prix(Algebrite.eval(prix - prix * taux / 100))}$ €`;
			} else {
				if (sortie_html) {
					texte = `Un article coûtait ${tex_prix(prix)} € et son prix augmente de ${taux} \%.`;
				} else {
					texte = `Un article coûtait ${tex_prix(prix)} € et son prix augmente de ${taux}~\\%.`;

				}
				texte_corr = `$\\text{Augmentation : }${tex_fraction(taux, 100)}\\times  ${tex_prix(prix)}= ${tex_prix(Algebrite.eval(prix * taux))}\\div 100=${tex_prix(Algebrite.eval(prix * taux / 100))}$ €`;
				texte_corr += `<br>`;
				texte_corr += `$\\text{Nouveau prix : }${tex_prix(prix)}+${tex_prix(Algebrite.eval(prix * taux / 100))}=${tex_prix(Algebrite.eval(prix * (1 + taux / 100)))}$ €`;
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
}
