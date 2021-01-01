import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes} from "/modules/outils.js"
import Choisir_expression_litterale from './_Choisir_expression_litterale.js';
/**
 * Référence 5L14-6
 * Déterminer la dernière opération à effectuer dans une expression numérique
 * @author Sébastien Lozano 
 */
export default function Determiner_derniere_operation_exp_num() {
	'use strict'
	Exercice.call(this); // Héritage de la classe Exercice()
	this.debug = false;
	this.consigne = "";
	this.nb_questions = 4;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = true;
	this.sup2 = false; // si false alors utilisation de nombres entiers, si true alors utilisation de nombres à un chiffre après la virgule.
	this.titre = `Déterminer la dernière opération à effectuer dans une expression numérique`;

	this.nouvelle_version = function () {
		let type_de_questions_disponibles
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		type_de_questions_disponibles = [5] //expressions complexes
		let expf, expn, expc, decimal = 1, nbval, nb_operations, resultats, last_op
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions)
		if (this.sup2) decimal = 10;
		for (let i = 0, texte, texte_corr, val1, val2, cpt = 0; i < this.nb_questions && cpt < 50;) {
			nb_operations = parseInt(liste_type_de_questions[i])
			val1 = randint(2, 5)
			val2 = randint(6, 9)
			//resultats=Choisir_expression_litteraleBis(nb_operations,decimal,val1,val2)
			resultats = Choisir_expression_litterale(nb_operations, decimal, val1, val2, this.sup)
			expf = resultats[0]
			expn = resultats[1]
			expc = resultats[2]
			nbval = resultats[3]
			last_op = resultats[4];
			let str = expc.split('=');

			switch (liste_type_de_questions[i]) {
				case 5:
					if (expn.indexOf('ou') > 0) expn = expn.substring(0, expn.indexOf('ou')) // on supprime la deuxième expression fractionnaire
					this.consigne = `Déterminer la dernière opération à effectuer .`
					texte = `$${str[1]}$`
					//texte=`${expn}`
					if (this.debug) {
						texte += `<br><br>=====CORRECTION======<br>`;
						texte += `$`
						for (let l = 1; l < str.length - 1; l++) {
							texte += `${str[l]}=`
						};
						texte += `${str[str.length - 1]}`
						texte += `<br>$\\textbf{La dernière opération dans $${str[1]}$ est donc une ${last_op}.}$`;
						texte_corr = ``;
					} else {
						texte_corr = `$`
						for (let l = 1; l < str.length - 1; l++) {
							texte_corr += `${str[l]}=`
						};
						texte_corr += `${str[str.length - 1]}`
						texte_corr += `<br>$\\textbf{La dernière opération dans $${str[1]}$ est donc une ${last_op}.}$`;
					};

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
	}
	this.besoin_formulaire2_case_a_cocher = ["Avec décimaux.", false]
	this.besoin_formulaire_case_a_cocher = ["Avec le signe × devant les parenthèses", true]

}

