import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,combinaisonListesSansChangerOrdre,calcul,texNombre,miseEnEvidence,texte_en_couleur,tableauColonneLigne} from '../../modules/outils.js'
export const titre = 'Trouver l’opposé d’un nombre relatif'

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
		this.nbQuestions = 1;
	} else {
		this.nbQuestions = 1;
	};

	this.titre = titre;
	this.consigne = "Compléter le tableau suivant.";

	this.nbCols = 1;
	this.nbColsCorr = 1;
	//this.nbQuestionsModifiable = false;
	//sortieHtml? this.spacing = 3 : this.spacing = 2; 
	//sortieHtml? this.spacingCorr = 3 : this.spacingCorr = 2;

	let type_de_questions_disponibles;

	this.nouvelleVersion = function () {
		if (this.debug) {
			type_de_questions_disponibles = [1];
		} else {
			type_de_questions_disponibles = [1];
		};

		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées

		//type_de_questions_disponibles=[1];			

		//let listeTypeDeQuestions  = combinaisonListes(type_de_questions_disponibles,this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		let listeTypeDeQuestions = combinaisonListesSansChangerOrdre(type_de_questions_disponibles, this.nbQuestions) // Tous les types de questions sont posées --> à remettre comme ci dessus		

		for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
			// une fonction pour générer un relatif et son opposé
			function nbRel_et_son_oppose() {
				let nb_num = calcul(randint(-9, 9) + calcul(randint(-9, 9) / 10));

				return {
					nb: texNombre(nb_num),
					opp: texNombre(-nb_num)
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
					nb_ligne_nombres_corr[k + 1] = miseEnEvidence(nb.nb);
					nb_ligne_nombres_opp.push(nb.opp)
					nb_ligne_nombres_opp_corr.push(nb.opp)
				} else {
					nb_ligne_nombres.push(nb.nb);
					nb_ligne_nombres_corr.push(nb.nb);
					nb_ligne_nombres_opp[k] = '';
					nb_ligne_nombres_opp_corr[k] = miseEnEvidence(nb.opp);
				}
			};

			let enonces = [];
			enonces.push({
				enonce: `								
				${tableauColonneLigne(nb_ligne_nombres, ['\\text{Opposé du nombre}'], nb_ligne_nombres_opp)}
				`,
				question: ``,
				correction: `
				${tableauColonneLigne(nb_ligne_nombres_corr, ['\\text{Opposé du nombre}'], nb_ligne_nombres_opp_corr)}				
				`
			});
			enonces.push({
				enonce: `énoncé type 2`,
				question: ``,
				correction: `${texte_en_couleur(`correction type2`)}`
			});

			switch (listeTypeDeQuestions[i]) {
				case 1:
					texte = `${enonces[0].enonce}`;
					if (this.debug) {
						texte += `<br>`;
						texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`;
						texteCorr = ``;
					} else {
						texteCorr = `${enonces[0].correction}`;
					};
					break;
				case 2:
					texte = `${enonces[1].enonce}`;
					if (this.debug) {
						texte += `<br>`;
						texte += `<br> =====CORRECTION======<br>${enonces[1].correction}`;
						texteCorr = ``;
					} else {
						texteCorr = `${enonces[1].correction}`;
					};
					break;
			}


			if (this.listeQuestions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.listeQuestions.push(texte);
				this.listeCorrections.push(texteCorr);
				i++;
			}
			cpt++;
		}
		listeQuestionsToContenu(this);

	}
	//this.besoinFormulaireNumerique = ['Niveau de difficulté',2,"1 : Entiers naturels\n2 : Entiers relatifs"];
	//this.besoinFormulaire2CaseACocher = ["Avec des équations du second degré"];	
}

