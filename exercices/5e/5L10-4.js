import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes_sans_changer_ordre,tex_nombre,num_alpha,tab_C_L} from "/modules/outils.js"
import {point,polygone,mathalea2d} from "/modules/2d.js"
/** 
 * * Traduire la dépendance entre deux grandeurs par un tableau de valeurs et produire une formule.
 * * 5L10-4
 * @author Sébastien Lozano
 */

export default function Tableaux_et_fonction() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.debug = false;
	this.sup = 1;
	if (this.debug) {
		this.nb_questions = 1;
	} else {
		this.nb_questions = 1;
	};

	this.titre = "Produire une formule à partir d'un tableau";
	this.consigne = ``;

	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	//this.nb_questions_modifiable = false;
	sortie_html ? this.spacing = 2.5 : this.spacing = 2;
	sortie_html ? this.spacing_corr = 2.5 : this.spacing_corr = 1;

	let type_de_questions_disponibles;

	this.nouvelle_version = function () {
		if (this.debug) {
			type_de_questions_disponibles = [0];
		} else {
			//type_de_questions_disponibles = shuffle([choice([1,3]),choice([2,4]),0]);      			
			type_de_questions_disponibles = [0];
		};

		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		//let liste_type_de_questions  = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions) // Tous les types de questions sont posées --> à remettre comme ci dessus		

		for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
			let L1 = randint(3, 7);
			let L2 = L1 + 1;
			let L3 = L2 * 2;
			let L4 = L2 * 3;

			let cote_inconnu = choice(['L']);
			let cote_inconnu_corr;
			let cote_inconnu_corr_num;
			let cote_connu = randint(3, 7);

			let unites;
			let grand_L;
			let grand_L_num;
			let petit_l;
			let petit_l_num;
			let unite_grand_L;
			let unite_petit_l;
			let txt_corr;
			if (this.sup == 1) {//même unités
				unites = choice([['cm', 'cm'], ['m', 'm']]);
				grand_L = [`${L1}`, `${L2}`, `${L3}`, `${L4}`];
				grand_L_num = [`${L1}`, `${L2}`, `${L3}`, `${L4}`];
				petit_l = [`${cote_connu}`, ``, ``, ``];
				petit_l_num = [`${cote_connu}`, ``, ``, ``];
				unite_grand_L = unites[0];
				unite_petit_l = unites[1];
				cote_inconnu_corr = cote_inconnu;
				cote_inconnu_corr_num = `2` + cote_inconnu;
				txt_corr = `Les unités sont les mêmes il n'est donc pas necessaire de convertir.`;
			};
			if (this.sup == 2) {// unités différentes
				unites = choice([['cm', 'm'], ['m', 'cm']]);
				if (unites[0] == 'cm') {
					grand_L = [`${L1}`, `${L2}`, `${L3}`, `${L4}`];
					grand_L_num = [`${L1}`, `${L2}`, `${L3}`, `${L4}`];
					petit_l = [`${cote_connu}\\times 100`, ``, ``, ``];
					petit_l_num = [`${100 * cote_connu}`, ``, ``, ``];
					unite_grand_L = unites[0];
					unite_petit_l = unites[0];
					cote_inconnu_corr = cote_inconnu;
					cote_inconnu_corr_num = `2` + cote_inconnu;
					txt_corr = `Les unités sont différentes, pour plus de confort, nous pouvons les convertir dans la même unité, ici en cm.`;
				};
				if (unites[0] == 'm') {
					grand_L = [`${L1}\\times 100`, `${L2}\\times 100`, `${L3}\\times 100`, `${L4}\\times 100`];
					grand_L_num = [`${100 * L1}`, `${100 * L2}`, `${100 * L3}`, `${100 * L4}`];
					petit_l = [`${cote_connu}`, ``, ``, ``];
					petit_l_num = [`${cote_connu}`, ``, ``, ``];
					unite_grand_L = unites[1];
					unite_petit_l = unites[1];
					cote_inconnu_corr = cote_inconnu + `\\times 100`;
					cote_inconnu_corr_num = `200` + cote_inconnu;

					txt_corr = `Les unités sont différentes, pour plus de confort, nous pouvons les convertir dans la même unité, ici en cm.`;
				};

			};



			// on prépare la fenetre mathalea2d
			let fenetreMathalea2D = { xmin: -5, ymin: -3, xmax: 5, ymax: 3, pixelsParCm: 20, scale: 0.5 }
			let A = point(-4, 2);
			let B = point(-4, -2);
			let C = point(4, -2);
			let D = point(4, 2);
			let mesAppels = [
				polygone(A, B, C, D),
			];
			let figure = mathalea2d(
				fenetreMathalea2D,
				mesAppels
			);

			// une fonction pour moduler l'affichage d'une étape dans la correction
			function etapeCorrective(str, sup) {
				let sortie;
				if (sup == 1) {
					sortie = ``;
				};
				if (sup == 2) {
					sortie = str;
				};
				return sortie;

			};

			// pour les situations, autant de situations que de cas dans le switch !
			let situations = [
				{//case 0 -->
					unites: unites,
					cote_connu: cote_connu,
					cote_inconnu: cote_inconnu,
					tableau: tab_C_L([`\\text{Longueur $${cote_inconnu}$ du côté (en ${unites[0]})}`, `\\phantom{000}${L1}\\phantom{000}`, `\\phantom{000}${L2}\\phantom{000}`, `\\phantom{000}${L3}\\phantom{000}`, `\\phantom{000}${L4}\\phantom{000}`], [`\\text{Périmètre du rectangle (en $${unites[1]}$)}`],
						['', '', '', '']
					),
					calculL1: `Pour ${L1} ${unites[0]} : $2\\times \\color{blue}{${cote_connu} \\; \\text{${unites[1]}}} \\color{black}{+2\\times} \\color{red}{${L1} \\; \\text{${unites[0]}}} ${etapeCorrective(`\\color{black}{\\; = 2\\times} \\color{blue}{${petit_l_num[0]} \\; \\text{${unite_petit_l}}} \\color{black}{+2\\times} \\color{red}{${tex_nombre(grand_L_num[0])} \\; \\text{${unite_grand_L}}}`, this.sup)} \\color{black}{ \\;= ${tex_nombre(2 * petit_l_num[0] + 2 * grand_L_num[0])} \\; \\text{${unite_grand_L}}}$.`,
					calculL2: `Pour ${L2} ${unites[0]} : $2\\times \\color{blue}{${cote_connu} \\; \\text{${unites[1]}}} \\color{black}{+2\\times} \\color{red}{${L2} \\; \\text{${unites[0]}}} ${etapeCorrective(`\\color{black}{\\; = 2\\times} \\color{blue}{${petit_l_num[0]} \\; \\text{${unite_petit_l}}} \\color{black}{+2\\times} \\color{red}{${tex_nombre(grand_L_num[1])} \\; \\text{${unite_grand_L}}}`, this.sup)} \\color{black}{ \\;= ${tex_nombre(2 * petit_l_num[0] + 2 * grand_L_num[1])} \\; \\text{${unite_grand_L}}}$.`,
					calculL3: `Pour ${L3} ${unites[0]} : $2\\times \\color{blue}{${cote_connu} \\; \\text{${unites[1]}}} \\color{black}{+2\\times} \\color{red}{${L3} \\; \\text{${unites[0]}}} ${etapeCorrective(`\\color{black}{\\; = 2\\times} \\color{blue}{${petit_l_num[0]} \\; \\text{${unite_petit_l}}} \\color{black}{+2\\times} \\color{red}{${tex_nombre(grand_L_num[2])} \\; \\text{${unite_grand_L}}}`, this.sup)} \\color{black}{ \\;= ${tex_nombre(2 * petit_l_num[0] + 2 * grand_L_num[2])} \\; \\text{${unite_grand_L}}}$.`,
					calculL4: `Pour ${L4} ${unites[0]} : $2\\times \\color{blue}{${cote_connu} \\; \\text{${unites[1]}}} \\color{black}{+2\\times} \\color{red}{${L4} \\; \\text{${unites[0]}}} ${etapeCorrective(`\\color{black}{\\; = 2\\times} \\color{blue}{${petit_l_num[0]} \\; \\text{${unite_petit_l}}} \\color{black}{+2\\times} \\color{red}{${tex_nombre(grand_L_num[3])} \\; \\text{${unite_grand_L}}}`, this.sup)} \\color{black}{ \\;= ${tex_nombre(2 * petit_l_num[0] + 2 * grand_L_num[3])} \\; \\text{${unite_grand_L}}}$.`,
					tableau_corr: tab_C_L([`\\text{Longueur $${cote_inconnu_corr}$ du côté (en ${unite_grand_L})}`, `\\phantom{0}${grand_L[0]}\\phantom{0}`, `\\phantom{0}${grand_L[1]}\\phantom{0}`, `\\phantom{0}${grand_L[2]}\\phantom{0}`, `\\phantom{0}${grand_L[3]}\\phantom{0}`],
						[`\\text{Périmètre du rectangle (en ${unite_petit_l})}`],
						[
							`${tex_nombre(2 * petit_l_num[0] + 2 * grand_L_num[0])} \\; \\text{${unite_grand_L}}`,
							`${tex_nombre(2 * petit_l_num[0] + 2 * grand_L_num[1])} \\; \\text{${unite_grand_L}}`,
							`${tex_nombre(2 * petit_l_num[0] + 2 * grand_L_num[2])} \\; \\text{${unite_grand_L}}`,
							`${tex_nombre(2 * petit_l_num[0] + 2 * grand_L_num[3])} \\; \\text{${unite_grand_L}}`,
						],
					),
					tableau_corr_p1: tab_C_L([`\\text{Longueur $${cote_inconnu_corr}$ du côté (en $${unite_grand_L}$)}`, `\\phantom{000}${grand_L[0]}\\phantom{000}`, `\\phantom{000}${grand_L[1]}\\phantom{000}`],//,`\\phantom{000}${grand_L[2]}\\phantom{000}`,`\\phantom{000}${grand_L[3]}\\phantom{000}`],
						[`\\text{Périmètre du rectangle (en ${unite_petit_l})}`],
						[
							//`2\\times \\color{blue}{${cote_connu} \\; \\text{${unites[1]}}} \\color{black}{+2\\times} \\color{red}{${L1} \\; \\text{${unites[0]}}} ${etapeCorrective(`\\color{black}{\\; = 2\\times} \\color{blue}{${petit_l_num[0]} \\; \\text{${unite_petit_l}}} \\color{black}{+2\\times} \\color{red}{${tex_nombre(grand_L_num[0])} \\; \\text{${unite_grand_L}}}`,this.sup)} \\color{black}{ \\;= ${tex_nombre(2*petit_l_num[0]+2*grand_L_num[0])} \\; \\text{${unite_grand_L}}}`,
							//`2\\times \\color{blue}{${cote_connu} \\; \\text{${unites[1]}}} \\color{black}{+2\\times} \\color{red}{${L2} \\; \\text{${unites[0]}}} ${etapeCorrective(`\\color{black}{\\; = 2\\times} \\color{blue}{${petit_l_num[0]} \\; \\text{${unite_petit_l}}} \\color{black}{+2\\times} \\color{red}{${tex_nombre(grand_L_num[1])} \\; \\text{${unite_grand_L}}}`,this.sup)} \\color{black}{ \\;= ${tex_nombre(2*petit_l_num[0]+2*grand_L_num[1])} \\; \\text{${unite_grand_L}}}`,
							//`2\\times \\color{blue}{${cote_connu} \\; \\text{${unites[1]}}} \\color{black}{+2\\times} \\color{red}{${L3} \\; \\text{${unites[0]}}} ${etapeCorrective(`\\color{black}{\\; = 2\\times} \\color{blue}{${petit_l_num[0]} \\; \\text{${unite_petit_l}}} \\color{black}{+2\\times} \\color{red}{${grand_L_num[2]} \\; \\text{${unite_grand_L}}}`,this.sup)} \\color{black}{ \\;= ${tex_nombre(2*petit_l_num[0]+2*grand_L_num[2])} \\; \\text{${unite_grand_L}}}`,
							//`2\\times \\color{blue}{${cote_connu} \\; \\text{${unites[1]}}} \\color{black}{+2\\times} \\color{red}{${L4} \\; \\text{${unites[0]}}} ${etapeCorrective(`\\color{black}{\\; = 2\\times} \\color{blue}{${petit_l_num[0]} \\; \\text{${unite_petit_l}}} \\color{black}{+2\\times} \\color{red}{${grand_L_num[3]} \\; \\text{${unite_grand_L}}}`,this.sup)} \\color{black}{ \\;= ${tex_nombre(2*petit_l_num[0]+2*grand_L_num[3])} \\; \\text{${unite_grand_L}}}`,`2\\times \\color{blue}{${cote_connu} \\; \\text{${unites[1]}}} \\color{black}{+2\\times} \\color{red}{${L4} \\; \\text{${unites[0]}}} \\color{black}{ = 2\\times} \\color{blue}{${petit_l_num[0]} \\; \\text{${unite_petit_l}}} \\color{black}{+2\\times} \\color{red}{${grand_L_num[3]} \\; \\text{${unite_grand_L}} = \\color{black}{${tex_nombre(2*petit_l_num[0]+2*grand_L_num[3])} \\; \\text{${unite_grand_L}}}}`,
						],
					),
					tableau_corr_p2: tab_C_L([`\\text{Longueur $${cote_inconnu_corr}$ du côté (en $${unite_grand_L}$)}`, `\\phantom{000}${grand_L[2]}\\phantom{000}`, `\\phantom{000}${grand_L[3]}\\phantom{000}`],//,`\\phantom{000}${grand_L[2]}\\phantom{000}`,`\\phantom{000}${grand_L[3]}\\phantom{000}`],
						[`\\text{Périmètre du rectangle (en $${unite_petit_l}$)}`],
						[
							//`2\\times \\color{blue}{${cote_connu} \\; \\text{${unites[1]}}} \\color{black}{+2\\times} \\color{red}{${L1} \\; \\text{${unites[0]}}} ${etapeCorrective(`\\color{black}{\\; = 2\\times} \\color{blue}{${petit_l_num[0]} \\; \\text{${unite_petit_l}}} \\color{black}{+2\\times} \\color{red}{${grand_L_num[0]} \\; \\text{${unite_grand_L}}}`,this.sup)} \\color{black}{ \\;= ${tex_nombre(2*petit_l_num[0]+2*grand_L_num[0])} \\; \\text{${unite_grand_L}}}`,
							//`2\\times \\color{blue}{${cote_connu} \\; \\text{${unites[1]}}} \\color{black}{+2\\times} \\color{red}{${L2} \\; \\text{${unites[0]}}} ${etapeCorrective(`\\color{black}{\\; = 2\\times} \\color{blue}{${petit_l_num[0]} \\; \\text{${unite_petit_l}}} \\color{black}{+2\\times} \\color{red}{${grand_L_num[1]} \\; \\text{${unite_grand_L}}}`,this.sup)} \\color{black}{ \\;= ${tex_nombre(2*petit_l_num[0]+2*grand_L_num[1])} \\; \\text{${unite_grand_L}}}`,
							//`2\\times \\color{blue}{${cote_connu} \\; \\text{${unites[1]}}} \\color{black}{+2\\times} \\color{red}{${L3} \\; \\text{${unites[0]}}} ${etapeCorrective(`\\color{black}{\\; = 2\\times} \\color{blue}{${petit_l_num[0]} \\; \\text{${unite_petit_l}}} \\color{black}{+2\\times} \\color{red}{${tex_nombre(grand_L_num[2])} \\; \\text{${unite_grand_L}}}`,this.sup)} \\color{black}{ \\;= ${tex_nombre(2*petit_l_num[0]+2*grand_L_num[2])} \\; \\text{${unite_grand_L}}}`,
							//`2\\times \\color{blue}{${cote_connu} \\; \\text{${unites[1]}}} \\color{black}{+2\\times} \\color{red}{${L4} \\; \\text{${unites[0]}}} ${etapeCorrective(`\\color{black}{\\; = 2\\times} \\color{blue}{${petit_l_num[0]} \\; \\text{${unite_petit_l}}} \\color{black}{+2\\times} \\color{red}{${tex_nombre(grand_L_num[3])} \\; \\text{${unite_grand_L}}}`,this.sup)} \\color{black}{ \\;= ${tex_nombre(2*petit_l_num[0]+2*grand_L_num[3])} \\; \\text{${unite_grand_L}}}`,
						],
					),
					secondeQ: `2\\times \\color{blue}{${cote_connu} \\; \\text{${unites[1]}}} \\color{black}{+2\\times} \\color{red}{${cote_inconnu} \\; \\text{${unites[0]}}} ${etapeCorrective(`\\color{black}{\\; = 2\\times} \\color{blue}{${petit_l_num[0]} \\; \\text{${unite_petit_l}}} \\color{black}{+2\\times} \\color{red}{${cote_inconnu_corr} \\; \\text{${unite_grand_L}}}`, this.sup)} \\color{black}{ \\;= ${tex_nombre(2 * petit_l_num[0])} + ${cote_inconnu_corr_num} \\; \\text{exprimé en ${unite_grand_L}}}`,
					intro: txt_corr,
					fig: figure,
				},
			];

			let enonces = [];
			let i_sous_question = 0;
			let i_sous_question_corr = 0;

			for (let k = 0; k < situations.length; k++) {
				enonces.push({
					enonce: `
					On considère le rectangle ci-dessous dont l'un des côtés mesure $${situations[k].cote_connu}$ $${unites[1]}$ et l'autre mesure $${situations[k].cote_inconnu}$ $${unites[0]}$.<br>
					${situations[k].fig}<br>
					${num_alpha(i_sous_question++)} Compléter le tableau suivant :<br><br>
					${situations[k].tableau}<br><br>
					${num_alpha(i_sous_question++)} Quelle formule permet de calculer le périmètre de ce rectangle en fonction de $${situations[k].cote_inconnu}$ ?								
					`,
					question: ``,
					correction: `
					${num_alpha(i_sous_question_corr++)} ${situations[k].intro}<br>
					Il y a plusieurs façons de calculer le périmètre d'un rectangle, par exemple : <br> $2\\times largeur + 2\\times Longueur$.<br>
					Ici l'un des côtés mesure toujours $\\textcolor{blue}{${petit_l[0]}}$ $${unite_petit_l}$<br>
					Calculons les périmètres pour chacune des valeurs données :<br>
					${situations[k].calculL1}<br>
					${situations[k].calculL2}<br>
					${situations[k].calculL3}<br>
					${situations[k].calculL4}<br>
					Nous pouvons alors remplir le tableau<br>
					${situations[k].tableau_corr}<br><br>
					${num_alpha(i_sous_question_corr++)} On peut généraliser le raisonnement des calculs du périmètre, et ainsi obtenir une formule.<br>
					$${situations[k].secondeQ}$

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
						texte += `             `
						texte_corr = ``;
					} else {
						texte_corr = `${enonces[0].correction}`;
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

	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté', 2, "1 : les mêmes unités\n2 : unités différentes"];
	//this.besoin_formulaire2_case_a_cocher = ["Avec des équations du second degré"];	
};

