import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,combinaisonListesSansChangerOrdre,texNombre,miseEnEvidence,modalPdf,modalVideo,listeDiviseurs,numAlpha,cribleEratostheneN,tableauColonneLigne} from '../../modules/outils.js'
export const titre = 'Compter/lister les diviseurs d’un entier à partir de sa décomposition en facteurs premiers.'

/**
 * 3A11-3 - Lister/Compter les diviseurs d'un entier à partir de sa decomposition en facteurs premiers
 * @author Sébastien Lozano
 */
export default function Lister_Diviseurs_Par_Decomposition_facteurs_premiers() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1;
	this.titre = titre;
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne = `Sans la calculatrice, compter/lister les diviseurs d'un entier à partir de sa décomposition en facteurs premiers.`;
	//this.consigne += `<br>`;
	sortieHtml ? this.spacing = 2 : this.spacing = 1;
	sortieHtml ? this.spacingCorr = 2 : this.spacingCorr = 1;
	this.nbQuestions = 2;
	//this.correctionDetailleeDisponible = true;
	this.nbCols = 1;
	this.nbColsCorr = 1;
	this.sup = 1;

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

		let type_de_questions_disponibles = [1];
		//let type_de_questions_disponibles = [1];
		let listeTypeDeQuestions = combinaisonListesSansChangerOrdre(type_de_questions_disponibles, this.nbQuestions);

		for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
			type_de_questions = listeTypeDeQuestions[i];


			switch (type_de_questions) {
				case 1: // lister/compter les diviseurs d'un entier à partir de sa décomposition en facteurs premiers			
					texte = `Lister/compter les diviseurs d'un entier à partir de sa décomposition en facteurs premiers`;
					//let premiers_dispos = premiersEntreBornes(2,11);
					// on fixe le nombre de facteurs premier à 3
					let nb_de_premiers_b = randint(3, 3);
					// on fixe la limite pour le choix des premiers
					let max_premier_b = 11;
					// on fixe le rang max pour le choix des premiers
					let rg_max_b = cribleEratostheneN(max_premier_b).length - 1;
					// on choisit les rangs pour les nombres premiers
					let tab_rangs_b = [];
					let tab_rangs_exclus_b = [];
					for (let k = 0; k < (nb_de_premiers_b); k++) {
						for (let m = 0; m < k; m++) {
							tab_rangs_exclus_b.push(tab_rangs_b[m]);
						}
						tab_rangs_b[k] = randint(0, rg_max_b, tab_rangs_exclus_b);
					};
					// on choisit les premiers
					let tab_premiers_b = [];
					for (let k = 0; k < tab_rangs_b.length; k++) {
						tab_premiers_b[k] = cribleEratostheneN(max_premier_b)[tab_rangs_b[k]];
					};
					// on range les facteurs premiers dans l'ordre croissant
					tab_premiers_b.sort(function (a, b) {
						return a - b;
					});
					// on choisit les multiplicités
					let tab_multiplicites_b = [];
					for (let k = 0; k < tab_rangs_b.length; k++) {
						tab_multiplicites_b[k] = randint(1, 2);
					};
					texte = ``;
					let nombre_a_decomposer_b = 1;
					for (let k = 0; k < tab_rangs_b.length; k++) {
						for (let m = 0; m < tab_multiplicites_b[k]; m++) {
							nombre_a_decomposer_b = nombre_a_decomposer_b * tab_premiers_b[k];
						};
					};
					texte += `La décomposition en facteurs premiers de $${texNombre(nombre_a_decomposer_b)}$ est : $`;
					if (tab_multiplicites_b[0] == 1) {
						texte += `${tab_premiers_b[0]}`;
					} else {
						texte += `${tab_premiers_b[0]}^{${tab_multiplicites_b[0]}}`;
					};
					for (let k = 1; k < tab_premiers_b.length; k++) {
						if (tab_multiplicites_b[k] == 1) {
							texte += `\\times ${tab_premiers_b[k]}`;
						} else {
							texte += `\\times ${tab_premiers_b[k]}^{${tab_multiplicites_b[k]}}`;
						};
					};
					texte += `$, <br>`;
					texte += numAlpha(0) + ` Compléter le tableau ci-dessous.`;
					if (!sortieHtml) {
						texte += `$\\medskip$`;
					};
					// on crée le tableau des entetes de lignes et des colonnes
					let ent_lignes = [];
					let contenu_lignes = [];
					let ent_colonnes = [`\\times`];
					// les entetes des lignes
					for (let k = 0; k < tab_multiplicites_b[0] + 1; k++) {
						ent_lignes.push(`\\phantom{plusLarge}` + tab_premiers_b[0] + `^{` + k + `}\\phantom{plusLarge}`);
					};
					// les entetes des colonnes 
					for (let m = 0; m < tab_multiplicites_b[1] + 1; m++) {
						for (let l = 0; l < tab_multiplicites_b[2] + 1; l++) {
							ent_colonnes.push(tab_premiers_b[1] + `^{` + m + `}\\times` + tab_premiers_b[2] + `^{` + l + `}`);
						};
					};
					// tableau pour la permutation circulaire
					let tab_temp;
					// on y affecte les lignes
					tab_temp = ent_lignes;
					// on supprime le x de l'entete des colonnes
					ent_colonnes.shift();
					// on affecte ça aux lignes;
					ent_lignes = ent_colonnes;
					// on remet le x en colonnes et on ajoute le reste
					ent_colonnes = [`\\times`].concat(tab_temp);
					// le contenu des lignes
					for (let l = 0; l < (tab_multiplicites_b[0] + 1); l++) {
						for (let c = 1; c < (tab_multiplicites_b[1] + 1) * (tab_multiplicites_b[2] + 1) + 1; c++) {
							//contenu_lignes.push(`l : `+l+`, c : `+Number(c));
							contenu_lignes.push(``);
						};
					};
					texte += `<br>`;
					texte += tableauColonneLigne(ent_colonnes, ent_lignes, contenu_lignes);
					if (!sortieHtml) {
						texte += `$\\medskip$`;
					};
					texte += `<br>`;
					texte += numAlpha(1) + ` En déduire le nombre de diviseurs de $${texNombre(nombre_a_decomposer_b)}$.<br>`;
					texte += numAlpha(2) + ` Enfin, dresser la liste des diviseurs de $${texNombre(nombre_a_decomposer_b)}$.<br>`;

					// correction
					texteCorr = `Avec la décomposition en facteurs premiers de $${texNombre(nombre_a_decomposer_b)}$ qui est : $`;
					if (tab_multiplicites_b[0] == 1) {
						texteCorr += `${tab_premiers_b[0]}`;
					} else {
						texteCorr += `${tab_premiers_b[0]}^{${tab_multiplicites_b[0]}}`;
					};
					for (let k = 1; k < tab_premiers_b.length; k++) {
						if (tab_multiplicites_b[k] == 1) {
							texteCorr += `\\times ${tab_premiers_b[k]}`;
						} else {
							texteCorr += `\\times ${tab_premiers_b[k]}^{${tab_multiplicites_b[k]}}`;
						};
					};
					texteCorr += `$, <br>`;
					texteCorr += numAlpha(0) + ` Le tableau donne :`;
					// on crée le tableau des entetes de lignes et des colonnes
					let ent_lignes_corr = [];
					let ent_lignes_corr_res = [];
					let contenu_lignes_corr = [];
					//let contenu_lignes_corr_res = [];
					let ent_colonnes_corr = [`\\times`];
					let ent_colonnes_corr_res = [1];
					// les entetes des lignes
					for (let k = 0; k < tab_multiplicites_b[0] + 1; k++) {
						ent_lignes_corr.push(tab_premiers_b[0] + `^{` + k + `}`);
						ent_lignes_corr_res.push(tab_premiers_b[0] ** k);
					};
					// les entetes des colonnes 
					for (let m = 0; m < tab_multiplicites_b[1] + 1; m++) {
						for (let l = 0; l < tab_multiplicites_b[2] + 1; l++) {
							ent_colonnes_corr.push(tab_premiers_b[1] + `^{` + m + `}\\times` + tab_premiers_b[2] + `^{` + l + `}`);
							ent_colonnes_corr_res.push(tab_premiers_b[1] ** m * tab_premiers_b[2] ** l);
						};
					};
					// tableaux pour les permutations circulaires
					let tab_temp_corr;
					let tab1_temp_corr;
					// on y affecte les lignes
					tab_temp_corr = ent_lignes_corr;
					tab1_temp_corr = ent_lignes_corr_res;
					// on supprime le x de l'entete des colonnes
					ent_colonnes_corr.shift();
					ent_colonnes_corr_res.shift();
					// on affecte ça aux lignes;
					ent_lignes_corr = ent_colonnes_corr;
					ent_lignes_corr_res = ent_colonnes_corr_res;
					// on remet le x en colonnes et on ajoute le reste
					ent_colonnes_corr = [`\\times`].concat(tab_temp_corr);
					ent_colonnes_corr_res = [1].concat(tab1_temp_corr);
					// le contenu des lignes
					for (let l = 0; l < (tab_multiplicites_b[1] + 1) * (tab_multiplicites_b[2] + 1) + 1; l++) {
						for (let c = 1; c < (tab_multiplicites_b[0] + 2); c++) {
							//contenu_lignes_corr.push(`l : `+l+`, c : `+Number(c));								
							contenu_lignes_corr.push(ent_lignes_corr[l] + `\\times` + ent_colonnes_corr[c] + `=` + miseEnEvidence(texNombre(ent_lignes_corr_res[l] * ent_colonnes_corr_res[c])));
						};
					};
					texteCorr += `<br>`;
					texteCorr += tableauColonneLigne(ent_colonnes_corr, ent_lignes_corr, contenu_lignes_corr);
					texteCorr += `<br>`;
					texteCorr += numAlpha(1) + ` $${texNombre(nombre_a_decomposer_b)}$ a donc `;
					texteCorr += `$(${tab_multiplicites_b[0]}+1)\\times(${tab_multiplicites_b[1]}+1)\\times(${tab_multiplicites_b[2]}+1) = `;
					texteCorr += `${tab_multiplicites_b[0] + 1}\\times${tab_multiplicites_b[1] + 1}\\times${tab_multiplicites_b[2] + 1} = `;
					texteCorr += `${(tab_multiplicites_b[0] + 1) * (tab_multiplicites_b[1] + 1) * (tab_multiplicites_b[2] + 1)}$ diviseurs.<br>`;
					texteCorr += `En effet, dans la décomposition apparait : `;
					texteCorr += ` <br> - Le facteur premier $${tab_premiers_b[0]}$ avec la multiplicité $${tab_multiplicites_b[0]}$`;
					texteCorr += `, le facteur $${tab_premiers_b[0]}$ apparait donc sous les formes : `;
					for (let k = 0; k < tab_multiplicites_b[0]; k++) {
						texteCorr += `$${tab_premiers_b[0]}^{` + k + `}$ ou `;
					};
					texteCorr += `$${tab_premiers_b[0]}^{` + tab_multiplicites_b[0] + `}$ d'où le facteur $(${tab_multiplicites_b[0]}+1)$.`;

					texteCorr += ` <br> - Le facteur premier $${tab_premiers_b[1]}$ avec la multiplicité $${tab_multiplicites_b[1]}$`;
					texteCorr += `, le facteur $${tab_premiers_b[1]}$ apparait donc sous les formes : `;
					for (let k = 0; k < tab_multiplicites_b[1]; k++) {
						texteCorr += `$${tab_premiers_b[1]}^{` + k + `}$ ou `;
					};
					texteCorr += `$${tab_premiers_b[1]}^{` + tab_multiplicites_b[1] + `}$ d'où le facteur $(${tab_multiplicites_b[1]}+1)$.`;

					texteCorr += ` <br> - Le facteur premier $${tab_premiers_b[2]}$ avec la multiplicité $${tab_multiplicites_b[2]}$`;
					texteCorr += `, le facteur $${tab_premiers_b[2]}$ apparait donc sous les formes : `;
					for (let k = 0; k < tab_multiplicites_b[2]; k++) {
						texteCorr += `$${tab_premiers_b[2]}^{` + k + `}$ ou `;
					};
					texteCorr += `$${tab_premiers_b[2]}^{` + tab_multiplicites_b[2] + `}$ d'où le facteur $(${tab_multiplicites_b[2]}+1)$.`;
					texteCorr += `<br>`;
					texteCorr += numAlpha(2) + ` Enfin, voici la liste des $${(tab_multiplicites_b[0] + 1) * (tab_multiplicites_b[1] + 1) * (tab_multiplicites_b[2] + 1)}$ diviseurs de $${texNombre(nombre_a_decomposer_b)}$ issus du tableau ci-dessus : `;
					texteCorr += `$1`;
					for (let w = 1; w < listeDiviseurs(nombre_a_decomposer_b).length; w++) {
						texteCorr += `\\text{ ; }` + texNombre(listeDiviseurs(nombre_a_decomposer_b)[w]);
					};
					texteCorr += `.$`;
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
