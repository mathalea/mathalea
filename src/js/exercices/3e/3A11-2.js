import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,shuffle,combinaisonListesSansChangerOrdre,obtenirListeFacteursPremiers,texNombre,miseEnEvidence,modalPdf,modalVideo,cribleEratostheneN,premiersEntreBornes,warnMessage} from '../../modules/outils.js'
export const titre = 'Décomposition en facteurs premiers d’un entier'

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
	this.titre = titre;
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne = `À l'aide de la calculatrice, décomposer pas à pas les nombres entiers en produit de facteurs premiers.`;
	//this.consigne += `<br>`;
	sortieHtml ? this.spacing = 3 : this.spacing = 2;
	sortieHtml ? this.spacingCorr = 2 : this.spacingCorr = 1;
	this.nbQuestions = 3;
	//this.correctionDetailleeDisponible = true;
	this.nbCols = 1;
	this.nbColsCorr = 1;
	this.sup = 1;
	this.listePackages = `bclogo`;

	this.nouvelleVersion = function (numeroExercice) {
		let type_de_questions;
		if (sortieHtml) { // les boutons d'aide uniquement pour la version html
			//this.boutonAide = '';
			this.boutonAide = modalPdf(numeroExercice, "assets/pdf/FicheArithmetique-3A11.pdf", "Aide mémoire sur les nombres premiers (Sébastien Lozano)", "Aide mémoire");
			this.boutonAide += modalVideo('conteMathsNombresPremiers', '/videos/LesNombresPremiers.mp4', 'Petit conte mathématique - Les Nombres Premiers', 'Intro Vidéo');
		} else { // sortie LaTeX
		};

		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenuCorrection = ''; // Liste de questions corrigées

		let type_de_questions_disponibles = [1, 2, 3];
		type_de_questions_disponibles = shuffle(type_de_questions_disponibles); // on mélange l'ordre des questions

		//let type_de_questions_disponibles = [1];
		let listeTypeDeQuestions = combinaisonListesSansChangerOrdre(type_de_questions_disponibles, this.nbQuestions);

		let string_rappel = `Cette liste des nombres premiers inférieurs à 100 pourra être utile : <br>` + cribleEratostheneN(100)[0];
		for (let k = 1; k < cribleEratostheneN(100).length; k++) {
			string_rappel += `, ` + cribleEratostheneN(100)[k];
		};
		string_rappel += `.`;

		this.introduction = warnMessage(string_rappel, `nombres`, `Coup de pouce`);

		for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
			type_de_questions = listeTypeDeQuestions[i];

			switch (type_de_questions) {
				case 1: // 3 à 5 facteurs premiers max compris entre 0 et 30, de multiplicité 1,2 ou 3 max
					// on fixe le nombre de facteurs premier entre 3 et 5
					let nb_de_premiers = randint(3, 5);
					// on fixe la limite pour le choix des premiers
					let max_premier = 11;
					// on fixe le rang max pour le choix des premiers
					let rg_max = cribleEratostheneN(max_premier).length - 1;
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
						tab_premiers[k] = cribleEratostheneN(max_premier)[tab_rangs[k]];
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
					texte += `$${texNombre(nombre_a_decomposer)}$ en produit de facteurs premiers.`;
					// correction						
					texteCorr = `Nous allons successivement tester la divisibilité de $${texNombre(nombre_a_decomposer)}$ par tous les nombres premiers inférieurs à `;
					texteCorr += `$${texNombre(nombre_a_decomposer)}$ en commençant par 2, 3, 5, 7, ...<br>`;
					texteCorr = `Il est suffisant de tester la divisibilité de $${texNombre(nombre_a_decomposer)}$ par tous les nombres premiers inférieurs ou égaux à $\\sqrt{${texNombre(nombre_a_decomposer)}}$ c'est à dire inférieurs à $${texNombre(racine_premier_1)}$.<br>`;
					texteCorr += `Ce sont les nombres de la liste : <br>`;
					texteCorr += cribleEratostheneN(racine_premier_1)[0] + ` ; `;
					for (let k = 1; k < cribleEratostheneN(racine_premier_1).length; k++) {
						texteCorr += cribleEratostheneN(racine_premier_1)[k];
						if (k != cribleEratostheneN(racine_premier_1).length - 1) {
							texteCorr += ` ; `;
						} else {
							texteCorr += `.`;
						}
						if (k % 15 == 0) {
							texteCorr += `<br>`;
						}
					};
					texteCorr += `<br>`;
					var liste_facteurs_premiers = obtenirListeFacteursPremiers(nombre_a_decomposer);
					var quotient_intermediaire = nombre_a_decomposer;
					for (let k = 0; k < liste_facteurs_premiers.length; k++) {
						texteCorr += `$${texNombre(quotient_intermediaire)}\\div${miseEnEvidence(liste_facteurs_premiers[k])} = ${texNombre(quotient_intermediaire / liste_facteurs_premiers[k])}$<br>`;
						quotient_intermediaire = quotient_intermediaire / liste_facteurs_premiers[k];
					};
					texteCorr += `Finalement on obtient la décomposition suivante : $ ${texNombre(nombre_a_decomposer)} = `;
					if (tab_multiplicites[0] == 1) {
						texteCorr += `${tab_premiers[0]}`;
					} else {
						texteCorr += `${tab_premiers[0]}^{${tab_multiplicites[0]}}`;
					};
					for (let k = 1; k < tab_premiers.length; k++) {
						if (tab_multiplicites[k] == 1) {
							texteCorr += `\\times ${tab_premiers[k]}`;
						} else {
							texteCorr += `\\times ${tab_premiers[k]}^{${tab_multiplicites[k]}}`;
						};
					};
					texteCorr += `$`;
					break;
				case 2: // deux premiers compris entre 30 et 100 de multiplicité 1
					// on choisit un rang différent pour chaque premier entre 30 et 100
					let r1 = randint(0, premiersEntreBornes(30, 100).length - 1);
					let r2 = randint(0, premiersEntreBornes(30, 100).length - 1, r1);
					let premier1 = premiersEntreBornes(30, 100)[r1];
					let premier2 = premiersEntreBornes(30, 100)[r2];
					if (premier1 > premier2) { // on inverse p1 et p2 si p1 est supérieur à p2
						let p = premier1;
						premier1 = premier2;
						premier2 = p;
					};
					texte = `À l'aide de la calculatrice, décomposer $${texNombre(premier1 * premier2)}$ en produit de facteurs premiers.`;
					let racine_prem = Math.trunc(Math.sqrt(premier1 * premier2));
					texteCorr = `Il est suffisant de tester la divisibilité de $${texNombre(premier1 * premier2)}$ par tous les nombres premiers inférieurs ou égaux à $\\sqrt{${texNombre(premier1 * premier2)}}$ c'est à dire inférieurs à $${texNombre(racine_prem)}$.<br>`;
					texteCorr += `Ce sont les nombres de la liste suivante : <br>$`;
					texteCorr += cribleEratostheneN(racine_prem)[0];
					for (let k = 1; k < cribleEratostheneN(racine_prem).length; k++) {
						texteCorr += `; ` + cribleEratostheneN(racine_prem)[k];
					};
					texteCorr += `.$<br>`;
					liste_facteurs_premiers = obtenirListeFacteursPremiers(premier1 * premier2);
					quotient_intermediaire = premier1 * premier2;
					for (let k = 0; k < liste_facteurs_premiers.length; k++) {
						texteCorr += `$${texNombre(quotient_intermediaire)}\\div${miseEnEvidence(liste_facteurs_premiers[k])} = ${texNombre(quotient_intermediaire / liste_facteurs_premiers[k])}$<br>`;
						quotient_intermediaire = quotient_intermediaire / liste_facteurs_premiers[k];
					};
					texteCorr += ` D'où $${texNombre(premier1 * premier2)} = ${texNombre(premier1)}\\times${texNombre(premier2)}$.`;
					break;
				case 3: // un gros premier entre 1000 et 2000			
					// on choisit un rang pour le nombre premier entre 1000 et 2000
					let r = randint(0, premiersEntreBornes(1000, 2000).length - 1);
					let premier = premiersEntreBornes(1000, 2000)[r];
					let racine_premier = Math.trunc(Math.sqrt(premier));
					texte = `À l'aide de la calculatrice, décomposer $${texNombre(premier)}$ en produit de facteurs premiers.`;
					texteCorr = `En testant la divisibilité de $${texNombre(premier)}$ par tous les nombres premiers inférieurs ou égaux à $${racine_premier}$`;
					texteCorr += ` c'est à dire les nombre de la liste $`;
					texteCorr += cribleEratostheneN(racine_premier)[0];
					for (let k = 1; k < cribleEratostheneN(racine_premier).length; k++) {
						texteCorr += `; ` + cribleEratostheneN(racine_premier)[k];
					};
					texteCorr += `$, `;
					texteCorr += `on se rend compte que $${texNombre(premier)}$ est un nombre premier donc `;
					texteCorr += `$${texNombre(premier)} = ${texNombre(premier)}$.`;
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
	//this.besoinFormulaireNumerique = ['Règle à travailler',5,"1 : Produit de deux puissances de même base\n2 : Quotient de deux puissances de même base\n3 : Puissance de puissance\n4 : Produit de puissances de même exposant\n5 : Mélange"]; 
}
