import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,shuffle,combinaison_listes_sans_changer_ordre,obtenir_liste_facteurs_premiers,tex_nombre,mise_en_evidence,modal_pdf,modal_video,crible_eratosthene_n,premiers_entre_bornes,warn_message} from "/modules/outils.js"
/**
 * 3A11-2 - Decomposition_facteurs_premiers
 * Décomposer un nombre en facteurs premiers et compter son nombre de diviseurs à partir d'un tableau
 * plusieurs type de nombres à décomposer
 * type 1 : 3 à 5 facteurs premiers max, multiplicités 0,1,2 ou 3 max à préciser
 * type 2 : un produit de deux premiers entre 30 et 100, multiplicité 1 ... suffisamment de possibilités?
 * type 3 : un gros premiers au delà de 1000 et inférieur à 2 000
 * @author Sébastien Lozano
 */
export default function Decomposition_facteurs_premiers() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1;
	this.titre = "Décomposition en facteurs premiers d'un entier";
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne = `À l'aide de la calculatrice, décomposer pas à pas les nombres entiers en produit de facteurs premiers.`;
	//this.consigne += `<br>`;
	sortie_html ? this.spacing = 3 : this.spacing = 2;
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1;
	this.nb_questions = 3;
	//this.correction_detaillee_disponible = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1;
	this.liste_packages = `bclogo`;

	this.nouvelle_version = function (numero_de_l_exercice) {
		let type_de_questions;
		if (sortie_html) { // les boutons d'aide uniquement pour la version html
			//this.bouton_aide = '';
			this.bouton_aide = modal_pdf(numero_de_l_exercice, "pdf/FicheArithmetique-3A11.pdf", "Aide mémoire sur les nombres premiers (Sébastien Lozano)", "Aide mémoire");
			this.bouton_aide += modal_video('conteMathsNombresPremiers', 'videos/LesNombresPremiers.mp4', 'Petit conte mathématique - Les Nombres Premiers', 'Intro Vidéo');
		} else { // sortie LaTeX
		};

		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées

		let type_de_questions_disponibles = [1, 2, 3];
		type_de_questions_disponibles = shuffle(type_de_questions_disponibles); // on mélange l'ordre des questions

		//let type_de_questions_disponibles = [1];
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions);

		let string_rappel = `Cette liste des nombres premiers inférieurs à 100 pourra être utile : <br>` + crible_eratosthene_n(100)[0];
		for (let k = 1; k < crible_eratosthene_n(100).length; k++) {
			string_rappel += `, ` + crible_eratosthene_n(100)[k];
		};
		string_rappel += `.`;

		this.introduction = warn_message(string_rappel, `nombres`, `Coup de pouce`);

		for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
			type_de_questions = liste_type_de_questions[i];

			switch (type_de_questions) {
				case 1: // 3 à 5 facteurs premiers max compris entre 0 et 30, de multiplicité 1,2 ou 3 max
					// on fixe le nombre de facteurs premier entre 3 et 5
					let nb_de_premiers = randint(3, 5);
					// on fixe la limite pour le choix des premiers
					let max_premier = 11;
					// on fixe le rang max pour le choix des premiers
					let rg_max = crible_eratosthene_n(max_premier).length - 1;
					// on choisit les rangs pour les nombres premiers
					let tab_rangs = [];
					let tab_rangs_exclus = [];
					for (let k = 0; k < (nb_de_premiers); k++) {
						for (let m = 0; m < k; m++) {
							tab_rangs_exclus.push(tab_rangs[m]);
						}
						tab_rangs[k] = randint(0, rg_max, tab_rangs_exclus);
					};
					// on choisit les premiers
					let tab_premiers = [];
					for (let k = 0; k < tab_rangs.length; k++) {
						tab_premiers[k] = crible_eratosthene_n(max_premier)[tab_rangs[k]];
					};
					// on range les facteurs premiers dans l'ordre croissant
					tab_premiers.sort(function (a, b) {
						return a - b;
					});
					// on choisit les multiplicités
					let tab_multiplicites = [];
					for (let k = 0; k < tab_rangs.length; k++) {
						tab_multiplicites[k] = randint(1, 2);
					};
					// yapluka écrire le nombre dans l'énoncé et sa décomposition dans la correction
					texte = `À l'aide de la calculatrice, décomposer `;
					let nombre_a_decomposer = 1;
					for (let k = 0; k < tab_rangs.length; k++) {
						for (let m = 0; m < tab_multiplicites[k]; m++) {
							nombre_a_decomposer = nombre_a_decomposer * tab_premiers[k];
						};
					};
					let racine_premier_1 = Math.trunc(Math.sqrt(nombre_a_decomposer));
					texte += `$${tex_nombre(nombre_a_decomposer)}$ en produit de facteurs premiers.`;
					// correction						
					texte_corr = `Nous allons successivement tester la divisibilité de $${tex_nombre(nombre_a_decomposer)}$ par tous les nombres premiers inférieurs à `;
					texte_corr += `$${tex_nombre(nombre_a_decomposer)}$ en commençant par 2, 3, 5, 7, ...<br>`;
					texte_corr = `Il est suffisant de tester la divisibilité de $${tex_nombre(nombre_a_decomposer)}$ par tous les nombres premiers inférieurs ou égaux à $\\sqrt{${tex_nombre(nombre_a_decomposer)}}$ c'est à dire inférieurs à $${tex_nombre(racine_premier_1)}$.<br>`;
					texte_corr += `Ce sont les nombres de la liste : <br>`;
					texte_corr += crible_eratosthene_n(racine_premier_1)[0] + ` ; `;
					for (let k = 1; k < crible_eratosthene_n(racine_premier_1).length; k++) {
						texte_corr += crible_eratosthene_n(racine_premier_1)[k];
						if (k != crible_eratosthene_n(racine_premier_1).length - 1) {
							texte_corr += ` ; `;
						} else {
							texte_corr += `.`;
						}
						if (k % 15 == 0) {
							texte_corr += `<br>`;
						}
					};
					texte_corr += `<br>`;
					var liste_facteurs_premiers = obtenir_liste_facteurs_premiers(nombre_a_decomposer);
					var quotient_intermediaire = nombre_a_decomposer;
					for (let k = 0; k < liste_facteurs_premiers.length; k++) {
						texte_corr += `$${tex_nombre(quotient_intermediaire)}\\div${mise_en_evidence(liste_facteurs_premiers[k])} = ${tex_nombre(quotient_intermediaire / liste_facteurs_premiers[k])}$<br>`;
						quotient_intermediaire = quotient_intermediaire / liste_facteurs_premiers[k];
					};
					texte_corr += `Finalement on obtient la décomposition suivante : $ ${tex_nombre(nombre_a_decomposer)} = `;
					if (tab_multiplicites[0] == 1) {
						texte_corr += `${tab_premiers[0]}`;
					} else {
						texte_corr += `${tab_premiers[0]}^{${tab_multiplicites[0]}}`;
					};
					for (let k = 1; k < tab_premiers.length; k++) {
						if (tab_multiplicites[k] == 1) {
							texte_corr += `\\times ${tab_premiers[k]}`;
						} else {
							texte_corr += `\\times ${tab_premiers[k]}^{${tab_multiplicites[k]}}`;
						};
					};
					texte_corr += `$`;
					break;
				case 2: // deux premiers compris entre 30 et 100 de multiplicité 1
					// on choisit un rang différent pour chaque premier entre 30 et 100
					let r1 = randint(0, premiers_entre_bornes(30, 100).length - 1);
					let r2 = randint(0, premiers_entre_bornes(30, 100).length - 1, r1);
					let premier1 = premiers_entre_bornes(30, 100)[r1];
					let premier2 = premiers_entre_bornes(30, 100)[r2];
					if (premier1 > premier2) { // on inverse p1 et p2 si p1 est supérieur à p2
						let p = premier1;
						premier1 = premier2;
						premier2 = p;
					};
					texte = `À l'aide de la calculatrice, décomposer $${tex_nombre(premier1 * premier2)}$ en produit de facteurs premiers.`;
					let racine_prem = Math.trunc(Math.sqrt(premier1 * premier2));
					texte_corr = `Il est suffisant de tester la divisibilité de $${tex_nombre(premier1 * premier2)}$ par tous les nombres premiers inférieurs ou égaux à $\\sqrt{${tex_nombre(premier1 * premier2)}}$ c'est à dire inférieurs à $${tex_nombre(racine_prem)}$.<br>`;
					texte_corr += `Ce sont les nombres de la liste suivante : <br>$`;
					texte_corr += crible_eratosthene_n(racine_prem)[0];
					for (let k = 1; k < crible_eratosthene_n(racine_prem).length; k++) {
						texte_corr += `; ` + crible_eratosthene_n(racine_prem)[k];
					};
					texte_corr += `.$<br>`;
					liste_facteurs_premiers = obtenir_liste_facteurs_premiers(premier1 * premier2);
					quotient_intermediaire = premier1 * premier2;
					for (let k = 0; k < liste_facteurs_premiers.length; k++) {
						texte_corr += `$${tex_nombre(quotient_intermediaire)}\\div${mise_en_evidence(liste_facteurs_premiers[k])} = ${tex_nombre(quotient_intermediaire / liste_facteurs_premiers[k])}$<br>`;
						quotient_intermediaire = quotient_intermediaire / liste_facteurs_premiers[k];
					};
					texte_corr += ` D'où $${tex_nombre(premier1 * premier2)} = ${tex_nombre(premier1)}\\times${tex_nombre(premier2)}$.`;
					break;
				case 3: // un gros premier entre 1000 et 2000			
					// on choisit un rang pour le nombre premier entre 1000 et 2000
					let r = randint(0, premiers_entre_bornes(1000, 2000).length - 1);
					let premier = premiers_entre_bornes(1000, 2000)[r];
					let racine_premier = Math.trunc(Math.sqrt(premier));
					texte = `À l'aide de la calculatrice, décomposer $${tex_nombre(premier)}$ en produit de facteurs premiers.`;
					texte_corr = `En testant la divisibilité de $${tex_nombre(premier)}$ par tous les nombres premiers inférieurs ou égaux à $${racine_premier}$`;
					texte_corr += ` c'est à dire les nombre de la liste $`;
					texte_corr += crible_eratosthene_n(racine_premier)[0];
					for (let k = 1; k < crible_eratosthene_n(racine_premier).length; k++) {
						texte_corr += `; ` + crible_eratosthene_n(racine_premier)[k];
					};
					texte_corr += `$, `;
					texte_corr += `on se rend compte que $${tex_nombre(premier)}$ est un nombre premier donc `;
					texte_corr += `$${tex_nombre(premier)} = ${tex_nombre(premier)}$.`;
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
	//this.besoin_formulaire_numerique = ['Règle à travailler',5,"1 : Produit de deux puissances de même base\n2 : Quotient de deux puissances de même base\n3 : Puissance de puissance\n4 : Produit de puissances de même exposant\n5 : Mélange"]; 
}
