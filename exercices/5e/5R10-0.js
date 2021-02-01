import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes_sans_changer_ordre,calcul,tex_nombre,mise_en_evidence,texte_en_couleur,tab_C_L} from "/modules/outils.js"
/** 
* * Remplir un tableau en utilisant la notion d'opposé
* * 5R10-0
* @author Sébastien Lozano
*/
export default function Trouver_oppose() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.debug = false;
	this.sup = 1;
	if (this.debug) {
		this.nb_questions = 1;
	} else {
		this.nb_questions = 1;
	};

	this.titre = "Trouver l'opposé d'un nombre relatif";
	this.consigne = "Compléter le tableau suivant.";

	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	//this.nb_questions_modifiable = false;
	//sortie_html? this.spacing = 3 : this.spacing = 2; 
	//sortie_html? this.spacing_corr = 3 : this.spacing_corr = 2;

	let type_de_questions_disponibles;

	this.nouvelle_version = function () {
		if (this.debug) {
			type_de_questions_disponibles = [1];
		} else {
			type_de_questions_disponibles = [1];
		};

		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		//type_de_questions_disponibles=[1];			

		//let liste_type_de_questions  = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions) // Tous les types de questions sont posées --> à remettre comme ci dessus		

		for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
			// une fonction pour générer un relatif et son opposé
			function nbRel_et_son_oppose() {
				let nb_num = calcul(randint(-9, 9) + calcul(randint(-9, 9) / 10));

				return {
					nb: tex_nombre(nb_num),
					opp: tex_nombre(-nb_num)
				};
			}
			let nb_ligne_nombres = ['\\text{Nombre}'];
			let nb_ligne_nombres_corr = ['\\text{Nombre}'];
			let nb_ligne_nombres_opp = [];
			let nb_ligne_nombres_opp_corr = [];
			let nb;
			for (let k = 0; k < 6; k++) {
				nb = nbRel_et_son_oppose();
				if (randint(0, 1) == 1) {
					nb_ligne_nombres[k + 1] = '';
					nb_ligne_nombres_corr[k + 1] = mise_en_evidence(nb.nb);
					nb_ligne_nombres_opp.push(nb.opp)
					nb_ligne_nombres_opp_corr.push(nb.opp)
				} else {
					nb_ligne_nombres.push(nb.nb);
					nb_ligne_nombres_corr.push(nb.nb);
					nb_ligne_nombres_opp[k] = '';
					nb_ligne_nombres_opp_corr[k] = mise_en_evidence(nb.opp);
				}
			};

			let enonces = [];
			enonces.push({
				enonce: `								
				${tab_C_L(nb_ligne_nombres, ['\\text{Opposé du nombre}'], nb_ligne_nombres_opp)}
				`,
				question: ``,
				correction: `
				${tab_C_L(nb_ligne_nombres_corr, ['\\text{Opposé du nombre}'], nb_ligne_nombres_opp_corr)}				
				`
			});
			enonces.push({
				enonce: `énoncé type 2`,
				question: ``,
				correction: `${texte_en_couleur(`correction type2`)}`
			});

			switch (liste_type_de_questions[i]) {
				case 1:
					texte = `${enonces[0].enonce}`;
					if (this.debug) {
						texte += `<br>`;
						texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`;
						texte_corr = ``;
					} else {
						texte_corr = `${enonces[0].correction}`;
					};
					break;
				case 2:
					texte = `${enonces[1].enonce}`;
					if (this.debug) {
						texte += `<br>`;
						texte += `<br> =====CORRECTION======<br>${enonces[1].correction}`;
						texte_corr = ``;
					} else {
						texte_corr = `${enonces[1].correction}`;
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
	//this.besoin_formulaire_numerique = ['Niveau de difficulté',2,"1 : Entiers naturels\n2 : Entiers relatifs"];
	//this.besoin_formulaire2_case_a_cocher = ["Avec des équations du second degré"];	
}

