import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,shuffle,combinaison_listes_sans_changer_ordre,tex_nombre,texte_gras,warn_message} from "/modules/outils.js"
/**
 * * Calcul mental autour des identités remarquables
 * * numéro de l'exo ex : 3L11-5
 * * publié le  14/11/2020
 * @author Sébastien Lozano
 */
export default function identites_calculs() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.debug = false;
	this.sup = 1;
	if (this.debug) {
		this.nb_questions = 3;
	} else {
		this.nb_questions = 3;
	};

	this.titre = "Calcul mental et calcul littéral";
	this.consigne = `Faire les calculs suivants sans calculatrice. Utiliser la double distributivité ou les identités remarquables.`;

	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	//this.nb_questions_modifiable = false;	
	sortie_html ? this.spacing = 1 : this.spacing = 1;
	sortie_html ? this.spacing_corr = 1 : this.spacing_corr = 1;

	this.liste_packages = `bclogo`;

	let type_de_questions_disponibles;

	this.nouvelle_version = function () {
		//une fonction pour gérer un \hfill dans la sortie LaTeX
		function myhfill() {
			if (sortie_html) {
				return `<br><br>`;
			} else {
				return `\\hfill`;
			}
		};
		switch (Number(this.sup)) {
			case 1:
				type_de_questions_disponibles = [0, 0, 0]; //shuffle([choice([1,3]),choice([2,3]),0]);
				this.introduction = warn_message(`$(a+b)^2=a^2+2ab+b^2$`, `nombres`, `Coup de pouce`);
				break;
			case 2:
				type_de_questions_disponibles = [1, 1, 1]; //shuffle([choice([1,3]),choice([2,3]),0]); 
				this.introduction = warn_message(`$(a-b)^2 = a^2-2ab+b^2$`, `nombres`, `Coup de pouce`);
				break;
			case 3:
				type_de_questions_disponibles = [2, 2, 2]; //shuffle([choice([1,3]),choice([2,3]),0]);      			
				this.introduction = warn_message(`$(a+b)(a-b)=a^2-b^2$`, `nombres`, `Coup de pouce`);
				break;
			case 4:
				type_de_questions_disponibles = shuffle([0, 1, 2]); //shuffle([choice([1,3]),choice([2,3]),0]);      			
				this.introduction = warn_message(`$(a+b)^2 = a^2 +2ab + b^2$ ${myhfill()} $(a-b)^2 = a^2-2ab+b^2$ ${myhfill()} $(a+b)(a-b)=a^2-b^2$`, `nombres`, `Coup de pouce`);
				break;
		};

		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées


		//let liste_type_de_questions  = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posées --> à remettre comme ci dessus		


		for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
			// une fonction pour gérer l'affichage sous forme de carré
			// a et b  sont les facteurs du produit, s'ils sont égaux on affiche sous forme de carré
			function ifIsCarreAfficheCarre(a, b) {
				if (a == b) {
					return `${a}^2`;
				} else {
					return `${a}\\times ${b}`;
				}
			}

			// une fonction pour afficher le double terme rectangle ou pas
			function ifIsCarreAfficheDblProd(bool, dblTermeRect) {
				if (bool) {
					return dblTermeRect;
				} else {
					return ``;
				}
			};

			let a = randint(2, 9);
			let b_somme = randint(1, 4);
			let b_difference = randint(1, 4);
			let b_som_dif = randint(1, 9);
			let coeff = choice([10, 100]);
			let coeff_som_dif = 100;
			let signes_som_dif = choice([[{ str: '-', nb: -1 }, { str: '+', nb: 1 }], [{ str: '+', nb: 1 }, { str: '-', nb: -1 }]]);
			let lettres = choice(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']);

			// pour les situations, autant de situations que de cas dans le switch !
			let situations = [
				{
					lettre: lettres,
					a: a,
					b: b_somme,
					coeff: coeff,
					a_coeff: a * coeff,
					operations: [{ str: '+', nb: 1 }, { str: '+', nb: 1 }],
					facteurs: [{ str: `${tex_nombre(a * coeff)}+${b_somme}`, nb: tex_nombre(a * coeff + b_somme) }, { str: `${tex_nombre(a * coeff)}+${b_somme}`, nb: tex_nombre(a * coeff + b_somme) }],
					carre_de_a_coeff: tex_nombre(coeff * coeff * a * a),
					//carre_de_coeff:coeff*coeff,	
					carre_de_b: tex_nombre(b_somme * b_somme),
					termes_rectangles: [tex_nombre(coeff * a * b_somme), tex_nombre(coeff * a * b_somme)],
					somme_terme_rect: tex_nombre(2 * coeff * a * b_somme),
					signes_dbl_dist: ['+', '+', '+'],
					carre: true,
					resultat: tex_nombre(a * a * coeff * coeff + b_somme * b_somme + 2 * a * coeff * b_somme)
				},
				{
					lettre: lettres,
					a: a,
					b: b_difference,
					coeff: coeff,
					a_coeff: a * coeff,
					operations: [{ str: '-', nb: -1 }, { str: '-', nb: -1 }],
					facteurs: [{ str: `${tex_nombre(a * coeff)}-${b_difference}`, nb: tex_nombre(a * coeff - b_difference) }, { str: `${tex_nombre(a * coeff)}-${b_difference}`, nb: tex_nombre(a * coeff - b_difference) }],
					carre_de_a_coeff: tex_nombre(coeff * coeff * a * a),
					//carre_de_coeff:coeff*coeff,					
					carre_de_b: tex_nombre(b_difference * b_difference),
					termes_rectangles: [tex_nombre(coeff * a * b_difference), tex_nombre(coeff * a * b_difference)],
					somme_terme_rect: tex_nombre(2 * coeff * a * b_difference),
					signes_dbl_dist: ['+', '-', '-'],
					carre: true,
					resultat: tex_nombre(a * a * coeff * coeff + b_difference * b_difference - 2 * a * coeff * b_difference)
				},
				{
					lettre: lettres,
					a: a,
					b: b_som_dif,
					coeff: coeff_som_dif,
					a_coeff: a * coeff_som_dif,
					operations: signes_som_dif,
					facteurs: [{ str: `${tex_nombre(a * coeff_som_dif)} ${signes_som_dif[0].str} ${b_som_dif}`, nb: tex_nombre(a * coeff_som_dif + signes_som_dif[0].nb * b_som_dif) }, { str: `${tex_nombre(a * coeff_som_dif)} ${signes_som_dif[1].str} ${b_som_dif}`, nb: tex_nombre(a * coeff_som_dif + signes_som_dif[1].nb * b_som_dif) }],
					carre_de_a_coeff: tex_nombre(coeff_som_dif * coeff_som_dif * a * a),
					//carre_de_coeff:coeff*coeff,	
					carre_de_b: tex_nombre(b_som_dif * b_som_dif),
					termes_rectangles: [tex_nombre(coeff_som_dif * a * b_som_dif), tex_nombre(coeff_som_dif * a * b_som_dif)],
					somme_terme_rect: 0,
					signes_dbl_dist: ['-', '+', '-'],
					carre: false,
					resultat: tex_nombre(a * a * coeff_som_dif * coeff_som_dif - b_som_dif * b_som_dif)
				},
			];

			let enonces = [];
			for (let k = 0; k < situations.length; k++) {
				enonces.push({
					enonce: `					
					 $${situations[k].lettre}=${ifIsCarreAfficheCarre(situations[k].facteurs[0].nb, situations[k].facteurs[1].nb)}$
					`,
					question: ``,
					correction1: `
						${texte_gras(`Avec la double distributivité`)}<br>
						$${situations[k].lettre} = ${ifIsCarreAfficheCarre(situations[k].facteurs[0].nb, situations[k].facteurs[1].nb)}$<br>
						$${situations[k].lettre} = (${situations[k].facteurs[0].str})\\times (${situations[k].facteurs[1].str})$<br>
						$${situations[k].lettre} = ${situations[k].a_coeff}^2 ${situations[k].signes_dbl_dist[1]} ${situations[k].a_coeff}\\times ${situations[k].b} ${situations[k].signes_dbl_dist[2]} ${situations[k].b}\\times ${situations[k].a_coeff} ${situations[k].signes_dbl_dist[0]} ${situations[k].b}^2$<br>
						$${situations[k].lettre} = ${situations[k].carre_de_a_coeff} ${situations[k].signes_dbl_dist[1]} ${situations[k].termes_rectangles[0]} ${situations[k].signes_dbl_dist[2]} ${situations[k].termes_rectangles[1]}	${situations[k].signes_dbl_dist[0]} ${situations[k].carre_de_b}$<br>
						$${situations[k].lettre} = ${situations[k].carre_de_a_coeff} ${ifIsCarreAfficheDblProd(situations[k].carre, `${situations[k].signes_dbl_dist[1]} ${situations[k].somme_terme_rect}`)} ${situations[k].signes_dbl_dist[0]} ${situations[k].carre_de_b}$<br>
						$${situations[k].lettre} = ${situations[k].resultat}$
					`,
					correction2: `
					${texte_gras(`Avec une identité`)}<br>
					$${situations[k].lettre} = ${ifIsCarreAfficheCarre(situations[k].facteurs[0].nb, situations[k].facteurs[1].nb)}$<br>
					$${situations[k].lettre} = ${ifIsCarreAfficheCarre(`(${situations[k].facteurs[0].str})`, `(${situations[k].facteurs[1].str})`)} $<br>
					$${situations[k].lettre} = ${situations[k].a_coeff}^2 ${ifIsCarreAfficheDblProd(situations[k].carre, `${situations[k].signes_dbl_dist[1]} 2\\times ${situations[k].a_coeff} \\times ${situations[k].b}`)} ${situations[k].signes_dbl_dist[0]}  ${situations[k].b}^2$<br>
					$${situations[k].lettre} = ${situations[k].carre_de_a_coeff} ${ifIsCarreAfficheDblProd(situations[k].carre, `${situations[k].signes_dbl_dist[1]} 2\\times ${situations[k].termes_rectangles[0]}`)} ${situations[k].signes_dbl_dist[0]}  ${situations[k].carre_de_b}$<br>
					$${situations[k].lettre} = ${situations[k].carre_de_a_coeff} ${ifIsCarreAfficheDblProd(situations[k].carre, `${situations[k].signes_dbl_dist[1]} ${situations[k].somme_terme_rect}`)} ${situations[k].signes_dbl_dist[0]} ${situations[k].carre_de_b}$<br>
					$${situations[k].lettre} = ${situations[k].resultat}$				
				`
				});
			};

			// autant de case que d'elements dans le tableau des situations
			switch (liste_type_de_questions[i]) {
				case 0: // carré d'une somme 
					texte = `${enonces[0].enonce}`;
					if (this.debug) {
						texte += `<br>`;
						texte += `<br> =====CORRECTION======<br>${enonces[0].correction1}<br>${enonces[0].correction2}`;
						texte_corr = ``;
					} else {
						if (sortie_html) {
							texte_corr = `${enonces[0].correction1}<br><br>${enonces[0].correction2}`;
						} else {
							texte_corr = `Détaillons deux méthodes : <br><br>`;
							texte_corr += `\\begin{minipage}{8cm}`;
							texte_corr += enonces[0].correction1;
							texte_corr += `\\end{minipage}`;
							texte_corr += `\\hfill \\vrule \\hfill`;
							texte_corr += `\\begin{minipage}{8cm}`;
							texte_corr += enonces[0].correction2;
							texte_corr += `\\end{minipage}`;
							texte_corr += `<br>`;
						};
					};
					break;
				case 1: // carré d'une différence
					texte = `${enonces[1].enonce}`;
					if (this.debug) {
						texte += `<br>`;
						texte += `<br> =====CORRECTION======<br>${enonces[1].correction1}<br>${enonces[1].correction2}`;
						texte_corr = ``;
					} else {
						if (sortie_html) {
							texte_corr = `${enonces[1].correction1}<br><br>${enonces[1].correction2}`;
						} else {
							texte_corr = `Détaillons deux méthodes : <br><br>`;
							texte_corr += `\\begin{minipage}{8cm}`;
							texte_corr += enonces[1].correction1;
							texte_corr += `\\end{minipage}`;
							texte_corr += `\\hfill \\vrule \\hfill`;
							texte_corr += `\\begin{minipage}{8cm}`;
							texte_corr += enonces[1].correction2;
							texte_corr += `\\end{minipage}`;
							texte_corr += `<br>`;
						};
					};
					break;
				case 2: // Produit somme différence
					texte = `${enonces[2].enonce}`;
					if (this.debug) {
						texte += `<br>`;
						texte += `<br> =====CORRECTION======<br>${enonces[2].correction1}<br>${enonces[2].correction2}`;
						texte_corr = ``;
					} else {
						if (sortie_html) {
							texte_corr = `${enonces[2].correction1}<br><br>${enonces[2].correction2}`;
						} else {
							texte_corr = `Détaillons deux méthodes : <br><br>`;
							texte_corr += `\\begin{minipage}{8cm}`;
							texte_corr += enonces[2].correction1;
							texte_corr += `\\end{minipage}`;
							texte_corr += `\\hfill \\vrule \\hfill`;
							texte_corr += `\\begin{minipage}{8cm}`;
							texte_corr += enonces[2].correction2;
							texte_corr += `\\end{minipage}`;
							texte_corr += `<br>`;
						};
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
	this.besoin_formulaire_numerique = ['Niveau de difficulté', 4, "1 : Carré d'une somme\n2 : Carré d'une différence\n3 : Produit de la somme et de la différence\n4 : Mélange"];
	//this.besoin_formulaire2_case_a_cocher = ["Avec des équations du second degré"];	
}
