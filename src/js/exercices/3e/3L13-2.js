import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,shuffle,combinaisonListesSansChangerOrdre,calcul,texNombre,texte_en_couleur_et_gras,tableauColonneLigne,warn_message} from '../../modules/outils.js'
export const titre = 'Equations résolvantes pour le théorème de Thalès'

/**
 * * Equations résolvantes pour le théorème de Thalès
 * * 3L13-2
 * * modification le 11/01/2021
 * @author Sébastien Lozano
 */
export default function Eq_resolvantes_Thales() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = titre;
	this.debug = false;
	if (this.debug) {
		this.nbQuestions = 4;
	} else {
		this.nbQuestions = 2;
	};
	this.sup = 1;
	this.consigne = `Résoudre les équations suivantes.`;

	this.nbCols = 1;
	this.nbColsCorr = 1;
	sortieHtml ? this.spacing = 3 : this.spacing = 2;
	sortieHtml ? this.spacingCorr = 2.5 : this.spacingCorr = 1.5;

	this.listePackages = `bclogo`;

	let type_de_questions_disponibles;

	this.nouvelleVersion = function () {
		// une fonction pour dire que c'est trivial dans ce cas
		function trivial(bool, a, b, c, inc) {
			let sortie;
			let texte = ``;
			if (bool) {
				if (b == c) {
					texte = `Dans ce cas le recours au produit en croix est superflu.<br> Par identification, on a directement $${inc}=${a}$ !`;
					sortie = warn_message(texte, `nombres`, `Keep Cool Guy !`);
				};
				if (c == a) {
					texte = `Dans ce cas le recours au produit en croix est superflu.<br> Par identification, on a directement $${inc}=${b}$ !`;
					sortie = warn_message(texte, `nombres`, `Keep Cool Guy !`);
				}
			} else {
				sortie = ``;
			};
			return sortie;
		};

		if (this.debug) {
			type_de_questions_disponibles = [0, 1, 2, 3];
		} else {
			type_de_questions_disponibles = shuffle([choice([0, 1]), choice([2, 3])]);
		};

		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées


		//let listeTypeDeQuestions  = combinaisonListes(type_de_questions_disponibles,this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		let listeTypeDeQuestions = combinaisonListesSansChangerOrdre(type_de_questions_disponibles, this.nbQuestions); // Tous les types de questions sont posées --> à remettre comme ci dessus		

		for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {

			// on a besoin d'un coeff pour le type de nombres
			let coeff;
			let nb_alea = [1, 1, 1];
			let c_temp_case_3;
			while (c_temp_case_3 % 2 != 0 || c_temp_case_3 % 5 != 0) {
				c_temp_case_3 = randint(11, 99);
			};

			this.sup = Number(this.sup); // attention le formulaire renvoie un string, on a besoin d'un number pour le switch !
			switch (this.sup) {
				case 1: //entiers          
					coeff = [1, 1, 1];
					nb_alea[0] = randint(2, 9);
					nb_alea[1] = randint(2, 9, nb_alea[0]);
					nb_alea[2] = choice([2, 4, 5, 8], [nb_alea[0], nb_alea[1]]);
					break;
				case 2: //relatifs            
					coeff = [choice([1, -1]), choice([1, -1]), choice([1, -1])];
					nb_alea[0] = randint(2, 9);
					nb_alea[1] = randint(2, 9, nb_alea[0]);
					nb_alea[2] = choice([2, 4, 5, 8], [nb_alea[0], nb_alea[1]]);
					break;
				case 3: //décimaux            
					coeff = [0.1, 0.1, 0.1];
					nb_alea[0] = randint(2, 9);
					nb_alea[1] = randint(2, 9, nb_alea[0]);
					nb_alea[2] = c_temp_case_3;
					break;
				case 4: //mélange
					nb_alea[0] = randint(2, 9);
					nb_alea[1] = randint(2, 9, nb_alea[0]);
					nb_alea[2] = choice([2, 4, 5, 8], [nb_alea[0], nb_alea[1]]);
					let masterChoix = choice([
						{ c: [1, 1, 1], na: [nb_alea[0], nb_alea[1], nb_alea[2]] },
						{ c: [choice([1, -1]), choice([1, -1]), choice([1, -1])], na: [nb_alea[0], nb_alea[1], nb_alea[2]] },
						{ c: [0.1, 0.1, 0.1], na: [randint(11, 99), randint(11, 99), c_temp_case_3] }
					]);
					coeff = masterChoix.c;
					nb_alea = masterChoix.na;
			};

			let inc;
			if (this.exo == '4L15-1') {
				inc = choice(['r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']);

			} else if (this.exo == '4P10-2') {
				inc = ['?'];
			} else {
				inc = choice(['x', 'y', 'GO', 'AB', 'z', 'GA', 'BU', 'ZO', 'ME']);
			};

			let params = {
				a: calcul(nb_alea[0] * coeff[0]),
				b: calcul(nb_alea[1] * coeff[1]),
				c: calcul(nb_alea[2] * coeff[2]),
				inc: inc
			};

			// pour les situations, autant de situations que de cas dans le switch !
			let situations = [
				{
					eq: `\\dfrac{${params.inc}}{${texNombre(params.b)}}=\\dfrac{${texNombre(params.a)}}{${texNombre(params.c)}}`,
					tab: tableauColonneLigne([params.inc, params.a], [params.b], [params.c]),
					a: params.a,
					b: params.b,
					c: params.c,
					inc: params.inc,
					trivial: (params.b == params.c) || (params.c == params.a)
				},
				{
					eq: `\\dfrac{${texNombre(params.a)}}{${texNombre(params.c)}}=\\dfrac{${params.inc}}{${texNombre(params.b)}}`,
					tab: tableauColonneLigne([params.a, params.inc], [params.c], [params.b]),
					a: params.a,
					b: params.b,
					c: params.c,
					inc: params.inc,
					trivial: (params.b == params.c) || (params.c == params.a)
				},
				{
					eq: `\\dfrac{${texNombre(params.b)}}{${params.inc}}=\\dfrac{${texNombre(params.c)}}{${texNombre(params.a)}}`,
					tab: tableauColonneLigne([params.b, params.c], [params.inc], [params.a]),
					a: params.a,
					b: params.b,
					c: params.c,
					inc: params.inc,
					trivial: (params.b == params.c) || (params.c == params.a)
				},
				{
					eq: `\\dfrac{${texNombre(params.c)}}{${texNombre(params.a)}}=\\dfrac{${texNombre(params.b)}}{${params.inc}}`,
					tab: tableauColonneLigne([params.c, params.b], [params.a], [params.inc]),
					a: params.a,
					b: params.b,
					c: params.c,
					inc: params.inc,
					trivial: (params.b == params.c) || (params.c == params.a)
				},
			];

			let enoncePlus;
			let corrPlusPremiereLigne;

			let enonces = [];
			for (let k = 0; k < situations.length; k++) {
				if (this.exo == '4P10-2') {
					enoncePlus = `${situations[k].tab}`;
					corrPlusPremiereLigne = `${situations[k].tab} <br> Le tableau ci-dessus est un tableau de proportionnalité, pour déterminer la quatrième proportionnelle il suffit par exemple de résoudre l'équation suivante : <br>`;
				} else {
					enoncePlus = `$${situations[k].eq}$`;
					corrPlusPremiereLigne = ``;
				};
				enonces.push({
					enonce: enoncePlus,
					question: ``,
					correction: `${corrPlusPremiereLigne}
						$${situations[k].eq}$<br>
						${texte_en_couleur_et_gras(`Les produits en croix sont égaux.`)}<br>
						$${texNombre(situations[k].c)}\\times ${situations[k].inc} = ${texNombre(situations[k].a)}\\times ${texNombre(situations[k].b)}$<br>
						${texte_en_couleur_et_gras(`On divise les deux membres par ${texNombre(situations[k].c)}`)}.<br>
						$\\dfrac{${texNombre(situations[k].c)}\\times ${situations[k].inc}}{${texNombre(situations[k].c)}}= \\dfrac{${texNombre(situations[k].a)}\\times ${texNombre(situations[k].b)}}{${texNombre(situations[k].c)}}$<br>
						${texte_en_couleur_et_gras(`On simplifie et on calcule.`)}<br>
						$${situations[k].inc}=${texNombre(calcul(Number(situations[k].b) * Number(situations[k].a) / Number(situations[k].c)))}$
						${trivial(situations[k].trivial, texNombre(situations[k].a), texNombre(situations[k].b), texNombre(situations[k].c), situations[k].inc)}
					`
				});
			};

			// autant de case que d'elements dans le tableau des situations
			switch (listeTypeDeQuestions[i]) {
				case 0:
					texte = `${enonces[0].enonce}`;
					if (this.debug) {
						texte += `<br>`;
						texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`;
						texte += `             `;
						texteCorr = ``;
					} else {
						texteCorr = `${enonces[0].correction}`;
					};
					break;
				case 1:
					texte = `${enonces[1].enonce}`;
					if (this.debug) {
						texte += `<br>`;
						texte += `<br> =====CORRECTION======<br>${enonces[1].correction}`;
						texteCorr = ``;
					} else {
						texteCorr = `${enonces[1].correction}`;
					};
					break;
				case 2:
					texte = `${enonces[2].enonce}`;
					if (this.debug) {
						texte += `<br>`;
						texte += `<br> =====CORRECTION======<br>${enonces[2].correction}`;
						texteCorr = ``;
					} else {
						texteCorr = `${enonces[2].correction}`;
					};
					break;
				case 3:
					texte = `${enonces[3].enonce}`;
					if (this.debug) {
						texte += `<br>`;
						texte += `<br> =====CORRECTION======<br>${enonces[3].correction}`;
						texteCorr = ``;
					} else {
						texteCorr = `${enonces[3].correction}`;
					};
					break;
			};

			if (this.listeQuestions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.listeQuestions.push(texte);
				this.listeCorrections.push(texteCorr);
				i++;
			}
			cpt++;
		}
		listeQuestionsToContenu(this);

	};
	this.besoinFormulaireNumerique = ['Type de nombres', 4, "1 : Entiers naturels\n2 : Entiers relatifs\n3 : Décimaux\n4 : Mélange"];
}
