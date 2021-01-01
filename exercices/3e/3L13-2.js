import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,shuffle,combinaison_listes_sans_changer_ordre,calcul,tex_nombre,texte_en_couleur_et_gras,tab_C_L,warn_message} from "/modules/outils.js"
/**
 * * Equations résolvantes pour le théorème de Thalès
 * * 3L13-2
 * @author Sébastien Lozano
 */
export default function Eq_resolvantes_Thales() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Equations résolvantes pour le théorème de Thalès";
	this.debug = false;
	if (this.debug) {
		this.nb_questions = 4;
	} else {
		this.nb_questions = 2;
	};
	this.sup = 1;
	//this.exo = '';	
	if (this.exo == '4P10-2') {
		this.consigne = `Déterminer la quatrième proportionnelle dans les tableaux suivants.`;
	} else {
		this.consigne = `Résoudre les équations suivantes.`;
	};

	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	//this.nb_questions_modifiable = false;
	sortie_html ? this.spacing = 2.5 : this.spacing = 1.5;
	sortie_html ? this.spacing_corr = 2.5 : this.spacing_corr = 1.5;

	this.liste_packages = `bclogo`;

	let type_de_questions_disponibles;

	this.nouvelle_version = function () {
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

		if (this.sup == 4) {
			this.nb_questions = 5;
		} else if (!this.debug) {
			this.nb_questions = 2;
		};

		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées


		//let liste_type_de_questions  = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posées --> à remettre comme ci dessus		

		for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {

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
					eq: `\\dfrac{${params.inc}}{${tex_nombre(params.b)}}=\\dfrac{${tex_nombre(params.a)}}{${tex_nombre(params.c)}}`,
					tab: tab_C_L([params.inc, params.a], [params.b], [params.c]),
					a: params.a,
					b: params.b,
					c: params.c,
					inc: params.inc,
					trivial: (params.b == params.c) || (params.c == params.a)
				},
				{
					eq: `\\dfrac{${tex_nombre(params.a)}}{${tex_nombre(params.c)}}=\\dfrac{${params.inc}}{${tex_nombre(params.b)}}`,
					tab: tab_C_L([params.a, params.inc], [params.c], [params.b]),
					a: params.a,
					b: params.b,
					c: params.c,
					inc: params.inc,
					trivial: (params.b == params.c) || (params.c == params.a)
				},
				{
					eq: `\\dfrac{${tex_nombre(params.b)}}{${params.inc}}=\\dfrac{${tex_nombre(params.c)}}{${tex_nombre(params.a)}}`,
					tab: tab_C_L([params.b, params.c], [params.inc], [params.a]),
					a: params.a,
					b: params.b,
					c: params.c,
					inc: params.inc,
					trivial: (params.b == params.c) || (params.c == params.a)
				},
				{
					eq: `\\dfrac{${tex_nombre(params.c)}}{${tex_nombre(params.a)}}=\\dfrac{${tex_nombre(params.b)}}{${params.inc}}`,
					tab: tab_C_L([params.c, params.b], [params.a], [params.inc]),
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
						$${tex_nombre(situations[k].c)}\\times ${situations[k].inc} = ${tex_nombre(situations[k].a)}\\times ${tex_nombre(situations[k].b)}$<br>
						${texte_en_couleur_et_gras(`On divise les deux membres par ${tex_nombre(situations[k].c)}`)}.<br>
						$\\dfrac{${tex_nombre(situations[k].c)}\\times ${situations[k].inc}}{${tex_nombre(situations[k].c)}}= \\dfrac{${tex_nombre(situations[k].a)}\\times ${tex_nombre(situations[k].b)}}{${tex_nombre(situations[k].c)}}$<br>
						${texte_en_couleur_et_gras(`On simplifie et on calcule.`)}<br>
						$${situations[k].inc}=${tex_nombre(calcul(Number(situations[k].b) * Number(situations[k].a) / Number(situations[k].c)))}$
						${trivial(situations[k].trivial, tex_nombre(situations[k].a), tex_nombre(situations[k].b), tex_nombre(situations[k].c), situations[k].inc)}
					`
				});
			};

			// autant de case que d'elements dans le tableau des situations
			switch (liste_type_de_questions[i]) {
				case 0:
					texte = `${enonces[0].enonce}`;
					if (this.debug) {
						texte += `<br>`;
						texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`;
						texte += `             `;
						texte_corr = ``;
					} else {
						texte_corr = `${enonces[0].correction}`;
					};
					break;
				case 1:
					texte = `${enonces[1].enonce}`;
					if (this.debug) {
						texte += `<br>`;
						texte += `<br> =====CORRECTION======<br>${enonces[1].correction}`;
						texte_corr = ``;
					} else {
						texte_corr = `${enonces[1].correction}`;
					};
					break;
				case 2:
					texte = `${enonces[2].enonce}`;
					if (this.debug) {
						texte += `<br>`;
						texte += `<br> =====CORRECTION======<br>${enonces[2].correction}`;
						texte_corr = ``;
					} else {
						texte_corr = `${enonces[2].correction}`;
					};
					break;
				case 3:
					texte = `${enonces[3].enonce}`;
					if (this.debug) {
						texte += `<br>`;
						texte += `<br> =====CORRECTION======<br>${enonces[3].correction}`;
						texte_corr = ``;
					} else {
						texte_corr = `${enonces[3].correction}`;
					};
					break;
			};

			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);

	};
	this.besoin_formulaire_numerique = ['Type de nombres', 4, "1 : Entiers naturels\n2 : Entiers relatifs\n3 : Décimaux\n4 : Mélange"];
	//this.besoin_formulaire2_case_a_cocher = ["Avec des équations du second degré"];
	//this.besoin_formulaire2_case_a_cocher = ["Avec décimaux.",false]	
}
