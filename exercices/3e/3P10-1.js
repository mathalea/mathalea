import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,calcul,tex_nombrec,tex_prix,modal_url} from "/modules/outils.js"
/**
* Déterminer le coefficient de proportionnalité associé à une évolution en pourcentage ou l'inverse
*
*
* @Auteur Rémi Angot
* 3P10-1
*/
export default function Coefficient_evolution() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Coefficient multiplicateur d'une variation en pourcentage";
	this.consigne = "Compléter.";
	this.nb_questions = 4;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1;

	this.nouvelle_version = function (numero_de_l_exercice) {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let texte_aide = '- Augmenter un nombre de $t~\\%$ revient à le multiplier par $1+\\dfrac{t}{100}$.';
		texte_aide += '<br>';
		texte_aide += '<br>- Diminuer un nombre de $t~\\%$ revient à le multiplier par $1-\\dfrac{t}{100}$.';
		texte_aide += '<br>';
		texte_aide += '<br><b>Exemples</b> :';
		texte_aide += '<br>- Diminuer un nombre de $20~\\%$ revient à le multiplier par $1-\\dfrac{20}{100}=1-0,20=0,8$.';
		texte_aide += '<br><br>- Augmenter un nombre de $5~\\%$ revient à le multiplier par $1+\\dfrac{5}{100}=1+0,05=1,05$.';

		this.bouton_aide = modal_url(numero_de_l_exercice, '/aide/3P10');

		let type_de_questions_disponibles = [];
		if (this.sup == 1) {
			type_de_questions_disponibles = ['coef+', 'coef-'];
		}
		if (this.sup == 2) {
			type_de_questions_disponibles = ['taux+', 'taux-'];
		}
		if (this.sup == 3) {
			type_de_questions_disponibles = ['coef+', 'coef-', 'taux+', 'taux-'];
		}
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		for (let i = 0, texte, texte_corr, taux, coeff, cpt = 0; i < this.nb_questions && cpt < 50;) {
			taux = choice([randint(1, 9) * 10, randint(1, 9)]);
			switch (liste_type_de_questions[i]) {
				case 'coef+':
					texte = `Augmenter de $${taux}~\\%$ revient à multiplier par...`;
					coeff = tex_prix(calcul(1 + taux / 100));
					texte_corr = `Augmenter de $${taux}~\\%$ revient à multiplier par ${coeff} car $100~\\% + ${taux}~\\% = ${100 + taux}~\\%$.`;
					break;
				case 'coef-':
					texte = `Diminuer de $${taux}~\\%$ revient à multiplier par...`;
					coeff = tex_prix(calcul(1 - taux / 100));
					texte_corr = `Diminuer de $${taux}~\\%$ revient à multiplier par ${coeff} car $100~\\% - ${taux}~\\% = ${100 - taux}~\\%$.`;
					break;
				case 'taux+':
					coeff = tex_nombrec(1 + taux / 100);
					texte = `Multiplier par ${coeff} revient à...`;
					texte_corr = `Multiplier par ${coeff} revient à augmenter de $${taux}~\\%$ car $${coeff} = ${100 + taux}~\\% = 100~\\% + ${taux}~\\%$.`;
					break;
				case 'taux-':
					coeff = tex_nombrec(1 - taux / 100);
					texte = `Multiplier par ${coeff} revient à...`;
					texte_corr = `Multiplier par ${coeff} revient à diminuer de $${taux}~\\%$ car $${coeff} = ${100 - taux}~\\% = 100~\\% - ${taux}~\\%$.`;
					break;
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
	this.besoin_formulaire_numerique = ['Niveau de difficulté', 3, '1 : Déterminer le coefficient\n2 : Exprimer une variation en pourcentage\n3 : Mélange des 2 types de questions'];
}
