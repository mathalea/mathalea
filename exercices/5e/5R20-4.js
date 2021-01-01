import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes_sans_changer_ordre,calcul,prenomF,prenomM,texte_en_couleur,texte_gras,tex_prix,num_alpha} from "/modules/outils.js"
/** 
 * * résoudre un problème additif avec des relatifs
 * * 5R20-4
 * @author Sébastien Lozano
 */

export default function Problemes_additifs_relatifs_5e() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.debug = false;
	this.sup = 1;
	if (this.debug) {
		this.nb_questions = 1;
	} else {
		this.nb_questions = 1;
	};

	this.titre = "Résoudre un problème en utilisant une somme algébrique de relatifs.";
	this.consigne = ``;

	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	//this.nb_questions_modifiable = false;
	sortie_html ? this.spacing = 2.5 : this.spacing = 1.5;
	sortie_html ? this.spacing_corr = 2.5 : this.spacing_corr = 1.5;

	let type_de_questions_disponibles;

	this.nouvelle_version = function () {
		if (this.debug) {
			type_de_questions_disponibles = [0];
		} else {
			//   type_de_questions_disponibles = shuffle([choice([1,3]),choice([2,4]),0]);
			type_de_questions_disponibles = [0];
		};

		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		//type_de_questions_disponibles=[1];			

		//let liste_type_de_questions  = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions) // Tous les types de questions sont posées --> à remettre comme ci dessus		

		for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
			let g_p_u; //pour le gain/perte unitaire
			let g_m; //pour le gain multiple
			// on veut des multiples de 5 pour n'avoir que des demis entiers ou des entiers
			do {
				g_p_u = randint(10, 30);
				g_m = randint(10, 30);
			} while (g_p_u % 5 != 0 || g_m % 5 != 0 || g_m <= g_p_u)

			let n_tot = randint(10, 15); // nombre totale de lancers
			let n_g_u; // nb de gains untitaires
			let n_p; // nb de pertes
			do {
				n_g_u = randint(2, 10);
				n_p = randint(2, 10);
			} while (n_g_u + n_p >= n_tot)

			// on échange parfois le nombre de gain unitaire et le nombre de perte pour avoir un bilan négatif plus souvent
			if (n_p < n_g_u) {
				if (randint(0, 1) == 0) {
					let temp = n_p;
					n_p = n_g_u;
					n_g_u = temp;
				};
			};

			let prenoms = [[prenomF(), 'Elle', 'elle'], [prenomM(), 'Il', 'il']];
			let currentPrenom = choice(prenoms);

			// une fonction pour écrire les chaine correctives
			function myGainPerteString(nb, type, valeur) {
				let sortie = ``;
				switch (type) {
					case 'gain':
						sortie = `(+${tex_prix(valeur)}$€$)`;
						for (let m = 1; m < nb; m++) {
							sortie += `+(+${tex_prix(valeur)}$€$)`;
						};
						break;
					case 'perte':
						sortie = `(-${tex_prix(valeur)}$€$)`;
						for (let m = 1; m < nb; m++) {
							sortie += `+(-${tex_prix(valeur)}$€$)`;
						};
						break;
				};
				return sortie;
			}

			// une fonction pour dire si le bilan est positif ou négatif
			function isBilanPositif(tot) {
				if (tot >= 0) {
					return true;
				} else {
					return false;
				};
			};

			let bilan;
			if (isBilanPositif(calcul((n_tot - n_g_u - n_p) * calcul(g_m / 10)) + calcul(n_g_u * calcul(g_p_u / 10)) - calcul(n_p * calcul(g_p_u / 10)))) {
				bilan = [`Globalement, le montant des gains`, `est supérieur au montant des pertes`, `${texte_en_couleur(`Le bilan est donc positif.`)}`, `a gagné`, tex_prix(calcul((n_tot - n_g_u - n_p) * calcul(g_m / 10)) + calcul(n_g_u * calcul(g_p_u / 10)) - calcul(n_p * calcul(g_p_u / 10)))];
			} else {
				bilan = [`Globalement, le montant des gains`, `est inférieur au montant des pertes`, `${texte_en_couleur(`Le bilan est donc négatif.`)}`, `a perdu`, tex_prix((-1) * (calcul((n_tot - n_g_u - n_p) * calcul(g_m / 10)) + calcul(n_g_u * calcul(g_p_u / 10)) - calcul(n_p * calcul(g_p_u / 10))))];
			}
			// pour les situations
			let situations = [
				{//case 0 --> les quilles
					nb_tot_lancers: n_tot,
					nb_gains_unitaires: n_g_u,
					nb_pertes: n_p,
					nb_gains: n_tot - n_g_u - n_p,
					perte: calcul(g_p_u / 10),
					gain_unitaire: calcul(g_p_u / 10),
					gain_multiple: calcul(g_m / 10),
					enonce_1: `lancer une balle sur des quilles.`,
					enonce_2: `- Si la balle touche plusieurs quilles, le joueur gagne `,
					enonce_3: `- Si la balle ne touche qu'une quille, le joueur gagne `,
					enonce_4: `- Si la balle ne touche aucune quille, le joueur perd `,
					enonce_5: `a lancé`,
					enonce_6: `la balle`,
					correction_1: `touché plusieurs quilles`,
					correction_2: `touché qu'une seule quille`,
					prenom: currentPrenom[0],//prenoms[choice([0,1])][0],
					pronomMaj: currentPrenom[1],//prenoms[choice([0,1])][1],
					pronomMin: currentPrenom[2],//prenoms[choice([0,1])][2],
					bilan: bilan,
				},
			];

			let enonces = [];
			let i_sous_question;
			let i_sous_question_corr;
			for (let k = 0; k < situations.length; k++) {
				i_sous_question = 0;
				i_sous_question_corr = 0;
				enonces.push({
					enonce: `
					Un jeu consiste à ${situations[k].enonce_1}
					<br>${situations[0].enonce_2} $${tex_prix(situations[0].gain_multiple)}$€.				
					<br>${situations[0].enonce_3} $${tex_prix(situations[0].gain_unitaire)}$€.
					<br>${situations[0].enonce_4} $${tex_prix(situations[0].perte)}$€.
					<br>${situations[k].prenom} ${situations[k].enonce_5} $${situations[k].nb_tot_lancers}$ fois ${situations[k].enonce_6}.
					${situations[k].pronomMaj} a perdu de l'argent $${situations[k].nb_pertes}$ fois et a gagné $${situations[k].nb_gains_unitaires}$ fois $${tex_prix(situations[k].gain_unitaire)}$€.
					<br> ${num_alpha(i_sous_question++)} A-t-${situations[k].pronomMin} globalement gagné ou perdu de l'argent ?
					<br> ${num_alpha(i_sous_question++)} Combien a-t-${situations[k].pronomMin} globalement gagné ou perdu ?
					`,
					question: ``,
					correction: `
					${situations[k].prenom} ${situations[k].enonce_5} $${situations[k].nb_tot_lancers}$ fois ${situations[k].enonce_6},
					sur les $${situations[k].nb_tot_lancers}$ lancers, on sait combien de fois ${situations[k].pronomMin} a perdu de l'argent et combien de fois ${situations[k].pronomMin} a gagné $${tex_prix(situations[k].gain_unitaire)}$€, les autres lancers correspondent donc au nombre de fois où ${situations[k].pronomMin} a ${situations[k].correction_1} et qu'${situations[k].pronomMin} a gagné $${tex_prix(situations[k].gain_multiple)}$€ 
					<br> $${situations[k].nb_tot_lancers}-${situations[k].nb_pertes}-${situations[k].nb_gains_unitaires} = ${situations[k].nb_tot_lancers - situations[k].nb_pertes - situations[k].nb_gains_unitaires}$,
					${situations[k].pronomMin} a donc ${situations[k].correction_1} $${situations[k].nb_gains}$ fois.

					<br>${texte_gras(`Gains lorsqu'${situations[k].pronomMin} a ${situations[k].correction_1} :`)}
					<br>$${myGainPerteString(situations[k].nb_gains, 'gain', situations[k].gain_multiple)} = ${situations[k].nb_gains}\\times (+${tex_prix(situations[k].gain_multiple)}$€$) = +${tex_prix(situations[k].nb_gains * situations[k].gain_multiple)}$€

					<br>${texte_gras(`Gains lorsqu'${situations[k].pronomMin} n'a ${situations[k].correction_2} :`)}
					<br>$${myGainPerteString(situations[k].nb_gains_unitaires, 'gain', situations[k].gain_unitaire)} = ${situations[k].nb_gains_unitaires}\\times (+${tex_prix(situations[k].gain_unitaire)}$€$) = +${tex_prix(situations[k].nb_gains_unitaires * situations[k].gain_unitaire)}$€

					<br>${texte_gras(`Pertes :`)}
					<br>$${myGainPerteString(situations[k].nb_pertes, 'perte', situations[k].perte)} = ${situations[k].nb_pertes}\\times (-${tex_prix(situations[k].perte)}$€$) = -${tex_prix(situations[k].nb_pertes * situations[k].perte)}$€

					<br>${num_alpha(i_sous_question_corr++)} ${situations[k].bilan[0]}, $(+${tex_prix(situations[k].nb_gains * situations[k].gain_multiple)}$€$)$ et $(+${tex_prix(situations[k].nb_gains_unitaires * situations[k].gain_unitaire)}$€$)$, ${situations[k].bilan[1]}, $(-${tex_prix(situations[k].nb_pertes * situations[k].perte)}$€$)$.
					<br> ${situations[k].bilan[2]}   

					<br>${num_alpha(i_sous_question_corr++)} 
					$(+${tex_prix(situations[k].nb_gains * situations[k].gain_multiple)}$€$)+(+${tex_prix(situations[k].nb_gains_unitaires * situations[k].gain_unitaire)}$€$)+(-${tex_prix(situations[k].nb_pertes * situations[k].perte)}$€$) = (${tex_prix(situations[k].nb_gains * situations[k].gain_multiple + situations[k].nb_gains_unitaires * situations[k].gain_unitaire - situations[k].nb_pertes * situations[k].perte)}$€$)$
					<br>${texte_en_couleur(`Globalement ${situations[k].prenom} ${situations[k].bilan[3]} $${situations[k].bilan[4]}$€`)} 

					`
				});
			};

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
	//this.besoin_formulaire_numerique = ['Niveau de difficulté',2,"1 : Entiers naturels\n2 : Entiers relatifs"];
	//this.besoin_formulaire2_case_a_cocher = ["Avec des équations du second degré"];	
};


