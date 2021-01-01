import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes_sans_changer_ordre,liste_diviseurs,crible_eratosthene_n,texte_ou_pas} from "/modules/outils.js"


/**
 * 5A10 - Division Euclidienne; diviseurs, multiples, critères de divisibilité
 * Exercice bilan
 * @author Sébastien Lozano
 */
export default function Liste_des_diviseurs_5e() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1;
	this.titre = "Écrire la liste de tous les diviseurs d'un entier.";
	// pas de différence entre la version html et la version latex pour la consigne
	//this.consigne =`Écrire la liste de tous les diviseurs d'un entier.`;
	this.consigne = ``;
	//this.consigne += `<br>`;
	sortie_html ? this.spacing = 2 : this.spacing = 1;
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1;
	this.nb_questions = 3;
	//this.correction_detaillee_disponible = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function () {
		let type_de_questions;
		if (sortie_html) { // les boutons d'aide uniquement pour la version html
			//this.bouton_aide = '';
			//this.bouton_aide = modal_pdf(numero_de_l_exercice,"pdf/FicheArithmetique-3A10.pdf","Aide mémoire sur la division euclidienne (Sébastien Lozano)","Aide mémoire")		
			//this.bouton_aide += modal_video('conteMathsNombresPremiers','videos/LesNombresPremiers.mp4','Petit conte mathématique','Intro Vidéo');
		} else { // sortie LaTeX
		};

		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées

		let type_de_questions_disponibles = [1, 1, 2];
		//let type_de_questions_disponibles = [1];
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions);

		for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
			type_de_questions = liste_type_de_questions[i];

			switch (type_de_questions) {
				case 1: // Compléter un tableau pour trouver la liste de tous les diviseurs d'un entier
					// on choisit un entier non premier inférieur à 99
					let M = randint(2, 99, crible_eratosthene_n(99));
					// on calcule le nombre de diviseur de M pour prévoir le nombre de lignes du tableau
					let nbre_diviseurs_M = liste_diviseurs(M).length;

					texte = `Compléter le tableau suivant et faire la liste de tous les diviseurs de ${M}`;
					if (!sortie_html) {
						texte += `$\\medskip$`;
					};
					texte += `<br>`;
					if (sortie_html) {
						texte += `$\\def\\arraystretch{2.5}\\begin{array}{|c|c|c|}\n`;
					} else {

						texte += `$\\begin{array}{|c|c|c|}\n`;
					};
					texte += `\\hline\n`;
					texte += `\\text{Facteur n°1} & \\text{Facteur n°2} & \\text{Produit donnant } ${M} \\\\\n`;
					texte += `\\hline\n`;

					if (nbre_diviseurs_M % 2 == 0) { //si il y a un nombre pair de diviseurs
						for (let m = 0; m < (liste_diviseurs(M).length / 2); m++) {
							texte += texte_ou_pas(liste_diviseurs(M)[m]) + ` & ` + texte_ou_pas(liste_diviseurs(M)[(liste_diviseurs(M).length - m - 1)]) + `& ${texte_ou_pas(M)} \\\\\n`;
							texte += `\\hline\n`;
						};
					} else { // sinon il est impair, cela n'arrive qu'avvec les carrés parfaits
						for (let m = 0; m < ((liste_diviseurs(M).length - 1) / 2); m++) {
							texte += texte_ou_pas(liste_diviseurs(M)[m]) + ` & ` + texte_ou_pas(liste_diviseurs(M)[(liste_diviseurs(M).length - m - 1)]) + `& ${texte_ou_pas(M)} \\\\\n`;
						};
						texte += texte_ou_pas(liste_diviseurs(M)[(nbre_diviseurs_M - 1) / 2]) + ` & ` + texte_ou_pas(liste_diviseurs(M)[(nbre_diviseurs_M - 1) / 2]) + `& ${texte_ou_pas(M)} \\\\\n`;
						texte += `\\hline\n`;
					};
					texte += `\\end{array}\n$`;

					// correction
					texte_corr = `Le tableau suivant contient tous les couples de facteurs dont le produit vaut ${M}`;
					if (!sortie_html) {
						texte_corr += `$\\medskip$`;
					};
					texte_corr += `<br>`;
					if (sortie_html) {
						texte_corr += `$\\def\\arraystretch{2.5}\\begin{array}{|c|c|c|}\n`;
					} else {
						texte_corr += `$\\begin{array}{|c|c|c|}\n`;
					};
					texte_corr += `\\hline\n`;
					texte_corr += `\\text{Facteur n°1} & \\text{Facteur n°2} & \\text{Produit donnant } ${M} \\\\\n`;
					texte_corr += `\\hline\n`;

					if (nbre_diviseurs_M % 2 == 0) { //si il y a un nombre pair de diviseurs
						for (let m = 0; m < (liste_diviseurs(M).length / 2); m++) {
							texte_corr += liste_diviseurs(M)[m] + ` & ` + liste_diviseurs(M)[(liste_diviseurs(M).length - m - 1)] + `& ${M} \\\\\n`;
							texte_corr += `\\hline\n`;
						};
					} else { // sinon il est impair, cela n'arrive qu'avvec les carrés parfaits
						for (let m = 0; m < ((liste_diviseurs(M).length - 1) / 2); m++) {
							texte_corr += liste_diviseurs(M)[m] + ` & ` + liste_diviseurs(M)[(liste_diviseurs(M).length - m - 1)] + `& ${M} \\\\\n`;
						};
						texte_corr += liste_diviseurs(M)[(nbre_diviseurs_M - 1) / 2] + ` & ` + liste_diviseurs(M)[(nbre_diviseurs_M - 1) / 2] + `& ${M} \\\\\n`;
						texte_corr += `\\hline\n`;
					};
					texte_corr += `\\end{array}\n$`;
					if (!sortie_html) {
						texte_corr += `$\\medskip$`;
					};
					texte_corr += `<br>`;
					texte_corr += `${M} a donc ${nbre_diviseurs_M} diviseurs qui sont : `;
					texte_corr += `1`;
					for (let w = 1; w < liste_diviseurs(M).length; w++) {
						texte_corr += ` ; ` + liste_diviseurs(M)[w];
					};
					texte_corr += `.`;
					break;
				case 2: // liste des diviseurs
					// on définit un tableau pour les choix du nombre dont on veut les diviseurs
					// 3 parmis 2,99 y compris les premiers et 1 parmis les entiers à 3 chiffres ayant au moins 8 diviseurs, il y en a 223 !
					let tableau_de_choix = [];
					tableau_de_choix = [randint(2, 99), randint(2, 99, [tableau_de_choix[0]]), randint(2, 99, [tableau_de_choix[0], tableau_de_choix[1]]), randint(2, 99, [tableau_de_choix[0], tableau_de_choix[1], tableau_de_choix[2]])];
					let tableau_de_choix_3chiffres = [];
					for (let m = 101; m < 999; m++) {
						if (liste_diviseurs(m).length > 8) {
							tableau_de_choix_3chiffres.push(m);
						};
					};
					// on ajoute un nombre à trois chiffre avec au moins 8 diviseurs dans les choix possibles
					let rg_Nb_3chiffres = randint(0, (tableau_de_choix_3chiffres.length - 1));
					tableau_de_choix.push(tableau_de_choix_3chiffres[rg_Nb_3chiffres]);

					let N; // on déclare le nombre dont on va chercher les diviseurs
					let rg_N; // pour tirer le rang du nombre dans le tableau des choix
					rg_N = randint(0, (tableau_de_choix.length - 1));
					N = tableau_de_choix[rg_N];
					texte = `Écrire la liste de tous les diviseurs de ${N}.`;
					texte_corr = `Pour trouver la liste des diviseurs de ${N} on cherche tous les produits de deux facteurs qui donnent ${N}. En écrivant toujours le plus petit facteur en premier.<br>`;
					texte_corr += `Il est suffisant de chercher des diviseurs inférieurs au plus grand nombre dont le carré vaut ${N}, par exemple ici, ${Math.trunc(Math.sqrt(N))}$\\times $${Math.trunc(Math.sqrt(N))} = ${Math.trunc(Math.sqrt(N)) * Math.trunc(Math.sqrt(N))}<${N}`;
					texte_corr += ` et ${Math.trunc(Math.sqrt(N)) + 1}$\\times $${Math.trunc(Math.sqrt(N)) + 1} = ${(Math.trunc(Math.sqrt(N)) + 1) * (Math.trunc(Math.sqrt(N)) + 1)}>${N} donc il suffit d'arrêter la recherche de facteur à ${Math.trunc(Math.sqrt(N))}.`;
					texte_corr += ` En effet, si ${N} est le produit de deux entiers p$\\times $q avec p < q alors si p$\\times $p > ${N} c'est que q$\\times $q < ${N} mais dans ce cas p serait supérieur à q sinon p$\\times $q serait inférieur à ${N} ce qui ne doit pas être le cas.<br>`;
					if (liste_diviseurs(N).length % 2 == 0) { //si il y a un nombre pair de diviseurs
						for (let m = 0; m < (liste_diviseurs(N).length / 2); m++) {
							texte_corr += `` + liste_diviseurs(N)[m] + `$\\times $` + liste_diviseurs(N)[(liste_diviseurs(N).length - m - 1)] + ` = ${N}<br>`;
						};
					} else {
						for (let m = 0; m < ((liste_diviseurs(N).length - 1) / 2); m++) {
							texte_corr += `` + liste_diviseurs(N)[m] + `$\\times $` + liste_diviseurs(N)[(liste_diviseurs(N).length - m - 1)] + `<br>`;
						};
						texte_corr += `` + liste_diviseurs(N)[(liste_diviseurs(N).length - 1) / 2] + `$\\times $` + liste_diviseurs(N)[(liste_diviseurs(N).length - 1) / 2] + ` = ${N}<br>`;
					};
					texte_corr += `Chacun des facteurs de la liste ci-dessus est un diviseur de ${N}.<br>`;
					texte_corr += `La liste des diviseurs de ${N} est donc `;
					texte_corr += `1`;
					for (let w = 1; w < liste_diviseurs(N).length; w++) {
						texte_corr += ` ; ` + liste_diviseurs(N)[w];
					};
					texte_corr += `.`;
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
