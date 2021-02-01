import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,egal,randint,shuffle,shuffle2tableaux,combinaison_listes_sans_changer_ordre,nombre_avec_espace,texte_en_couleur,modal_pdf,liste_diviseurs} from "/modules/outils.js"

/**
 * 3A10 - Division Euclidienne; diviseurs, multiples, critères de divisibilité
 * Exercice bilan
 * @author Sébastien Lozano
 */
export default function DivisionEuclidienne_multiplesDiviseurs_Criteres() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Division Euclidienne - Diviseurs - Multiples";
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne = `Divisions euclidiennes - Diviseurs - Multiples.`;
	//sortie_html ? this.spacing = 3 : this.spacing = 2;
	sortie_html ? this.spacing = 1 : this.spacing = 2;
	//sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1;
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 2;
	this.nb_questions = 5;
	//this.correction_detaillee_disponible = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function (numero_de_l_exercice) {
		let type_de_questions;
		if (sortie_html) { // les boutons d'aide uniquement pour la version html
			//this.bouton_aide = '';
			this.bouton_aide = modal_pdf(numero_de_l_exercice, "pdf/FicheArithmetique-3A10.pdf", "Aide mémoire sur la division euclidienne (Sébastien Lozano)", "Aide mémoire");
			//this.bouton_aide += modal_video('conteMathsNombresPremiers','videos/LesNombresPremiers.mp4','Petit conte mathématique','Intro Vidéo');
		} else { // sortie LaTeX
		};

		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées

		let type_de_questions_disponibles = [1, 2, 3, 4, 5];
		//let type_de_questions_disponibles = [1];
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions);

		for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
			type_de_questions = liste_type_de_questions[i];

			var dividende;
			var diviseur;
			var quotient;
			var reste;

			switch (type_de_questions) {
				case 1: // plus grand reste dans une division euclidienne
					diviseur = randint(2, 99);
					texte = `Dire quel est le plus grand reste possible dans une division euclidienne par ${diviseur}.`;
					texte_corr = `Si on divise par ${diviseur}, il ne peut pas rester plus de ${diviseur - 1}, sinon c'est qu'on peut encore ajouter au moins 1 fois ${diviseur} dans le dividende et donc 1 au quotient.`;
					break;
				case 2: // quotient et reste d'une division euclidienne donnée
					diviseur = randint(2, 99);
					dividende = randint(1001, 99999);
					quotient = Math.trunc(dividende / diviseur);
					reste = dividende % diviseur;

					texte = `On a ${nombre_avec_espace(dividende)}=${nombre_avec_espace(diviseur)}$\\times$${nombre_avec_espace(quotient)} $+$ ${nombre_avec_espace(reste)}`;
					texte += `<br>`;
					texte += `Écrire le quotient et le reste de la division euclidienne de ${nombre_avec_espace(dividende)} par ${diviseur}.`;
					texte_corr = `Dans la division euclidienne de ${nombre_avec_espace(dividende)} par ${diviseur}, le quotient vaut ${nombre_avec_espace(quotient)} et le reste ${reste}.`;
					break;
				case 3: // caractérisation des multiples et diviseurs par le reste de la division euclidienne
					dividende = randint(101, 9999);
					let rg_diviseur; // rang du diviseur choisi
					if (liste_diviseurs(dividende).length % 2 == 0) { //si il y a un nombre pair de diviseurs on prend le (n/2+1) eme
						rg_diviseur = liste_diviseurs(dividende).length / 2 + 1;
					} else { // il y a nbre impair de diviseurs on prend le ((n-1)/2 +1) eme
						rg_diviseur = (liste_diviseurs(dividende).length - 1) / 2 + 1;
					}
					diviseur = liste_diviseurs(dividende)[rg_diviseur - 1]; // on choisit le diviseur central de dividende, ATTENTION rang des tableaux commence à 0 
					let candidats_diviseurs = [diviseur - 1, diviseur, diviseur + 1]; // on prend l'entier précédent et le successeur de ce diviseur

					// Faut-il que je conditionne pour éviter le diviseur 1 ?
					candidats_diviseurs = shuffle(candidats_diviseurs); // on mélange le tableau
					texte = 'Les trois divisions euclidiennes suivantes sont exactes : <br>';
					texte += `${nombre_avec_espace(dividende)} = ${nombre_avec_espace(candidats_diviseurs[0])}$\\times$${nombre_avec_espace(Math.trunc(dividende / candidats_diviseurs[0]))} $+$ ${nombre_avec_espace(dividende % candidats_diviseurs[0])}`;
					texte += `<br>`;
					texte += `${nombre_avec_espace(dividende)} = ${nombre_avec_espace(candidats_diviseurs[1])}$\\times$${nombre_avec_espace(Math.trunc(dividende / candidats_diviseurs[1]))} $+$ ${nombre_avec_espace(dividende % candidats_diviseurs[1])}`;
					texte += `<br>`;
					texte += `${nombre_avec_espace(dividende)} = ${nombre_avec_espace(candidats_diviseurs[2])}$\\times$${nombre_avec_espace(Math.trunc(dividende / candidats_diviseurs[2]))} $+$ ${nombre_avec_espace(dividende % candidats_diviseurs[2])}`;
					texte += `<br>`;
					texte += `Sans calculer, dire si les nombres ${nombre_avec_espace(candidats_diviseurs[0])}; ${nombre_avec_espace(candidats_diviseurs[1])}; ${nombre_avec_espace(candidats_diviseurs[2])} sont des diviseurs de ${nombre_avec_espace(dividende)}. Justifier.`;
					texte_corr = ``;
					if (egal(dividende % candidats_diviseurs[0], 0)) { //egal() est une fonction de JC pour éviter les problèmes de virgule flottante
						texte_corr += `Le reste de la division euclienne de ${nombre_avec_espace(dividende)} par ${nombre_avec_espace(candidats_diviseurs[0])} vaut 0 donc ${nombre_avec_espace(candidats_diviseurs[0])} est un diviseur de ${nombre_avec_espace(dividende)}`;
					} else {
						texte_corr += `Le reste de la division euclienne de ${nombre_avec_espace(dividende)} par ${nombre_avec_espace(candidats_diviseurs[0])} ne vaut pas 0 donc ${nombre_avec_espace(candidats_diviseurs[0])} n'est pas un diviseur de ${nombre_avec_espace(dividende)}`;
					}
					texte_corr += `<br>`;
					if (egal(dividende % candidats_diviseurs[1], 0)) { //egal() est une fonction de JC pour éviter les problèmes de virgule flottante
						texte_corr += `Le reste de la division euclienne de ${nombre_avec_espace(dividende)} par ${nombre_avec_espace(candidats_diviseurs[1])} vaut 0 donc ${nombre_avec_espace(candidats_diviseurs[1])} divise ${nombre_avec_espace(dividende)}`;
					} else {
						texte_corr += `Le reste de la division euclienne de ${nombre_avec_espace(dividende)} par ${nombre_avec_espace(candidats_diviseurs[1])} ne vaut pas 0 donc ${nombre_avec_espace(candidats_diviseurs[1])} ne divise pas ${nombre_avec_espace(dividende)}`;
					}
					texte_corr += `<br>`;
					if (egal(dividende % candidats_diviseurs[2], 0)) { //egal() est une fonction de JC pour éviter les problèmes de virgule flottante
						texte_corr += `Le reste de la division euclienne de ${nombre_avec_espace(dividende)} par ${nombre_avec_espace(candidats_diviseurs[2])} vaut 0 donc ${nombre_avec_espace(dividende)} est divisible par ${nombre_avec_espace(candidats_diviseurs[2])}`;
					} else {
						texte_corr += `Le reste de la division euclienne de ${nombre_avec_espace(dividende)} par ${nombre_avec_espace(candidats_diviseurs[2])} ne vaut pas 0 donc ${nombre_avec_espace(dividende)} n'est pas divisible par ${nombre_avec_espace(candidats_diviseurs[2])}`;
					}
					texte_corr += `<br>`;
					break;
				case 4: // vocabulaire diviseurs et multiples
					// on déclare des tableaux utiles 
					let diviseurs = [];
					let multiplicateurs = [];
					let multiples = [];
					let quotients = [];
					let textes = [];
					let textes_corr = [];
					// on tire au hasard 4 diviseurs différents entre 2 et 999 et 4 multiplicateurs différents entre 2 et 9 
					diviseurs = [randint(2, 999), randint(2, 999, [diviseurs[0]]), randint(2, 999, [diviseurs[0], diviseurs[1]]), randint(2, 999, [diviseurs[0], diviseurs[1], diviseurs[2]])];
					multiplicateurs = [randint(2, 9), randint(2, 9, [multiplicateurs[0]]), randint(2, 9, [multiplicateurs[0], multiplicateurs[1]]), randint(2, 9, [multiplicateurs[0], multiplicateurs[1], multiplicateurs[2]])];
					// on calcule les multiples
					for (let j = 0; j < 4; j++) {
						multiples[j] = diviseurs[j] * multiplicateurs[j];
						quotients[j] = multiples[j] / diviseurs[j];
						diviseurs[j] = nombre_avec_espace(diviseurs[j]);
						multiples[j] = nombre_avec_espace(multiples[j]);
						quotients[j] = nombre_avec_espace(quotients[j]);
					};
					// on crée les phrases 
					textes[0] = `${diviseurs[0]} $\\ldots\\ldots\\ldots\\ldots$ ${multiples[0]}`;
					textes_corr[0] = `${diviseurs[0]} est un diviseur de ${multiples[0]} car ${multiples[0]}=${diviseurs[0]}$\\times$${quotients[0]}`;
					textes[1] = `${diviseurs[1]} $\\ldots\\ldots\\ldots\\ldots$ ${multiples[1]}`;
					textes_corr[1] = `${diviseurs[1]} est un diviseur de ${multiples[1]} car ${multiples[1]}=${diviseurs[1]}$\\times$${quotients[1]}`;
					textes[2] = `${multiples[2]} $\\ldots\\ldots\\ldots\\ldots$ ${diviseurs[2]}`;
					textes_corr[2] = `${multiples[2]} est un multiple de ${diviseurs[2]} car ${multiples[2]}=${diviseurs[2]}$\\times$${quotients[2]}`;
					textes[3] = `${multiples[3]} $\\ldots\\ldots\\ldots\\ldots$ ${diviseurs[3]}`;
					textes_corr[3] = `${multiples[3]} est un multiple de ${diviseurs[3]} car ${multiples[3]}=${diviseurs[3]}$\\times$${quotients[3]}`;
					// on ajoute deux cas ni multiple ni diviseur
					// on choisit deux nombres
					let n1 = nombre_avec_espace(randint(2, 999, [diviseurs[0], diviseurs[1], diviseurs[2], diviseurs[3]]));
					let p1 = nombre_avec_espace(randint(2, 999, [diviseurs[0], diviseurs[1], diviseurs[2], diviseurs[3], n1]));
					// on choisit un autre qui n'est pas dans la liste des diviseurs de n1
					let n2 = nombre_avec_espace(randint(2, 999, liste_diviseurs(n1)));
					let p2 = nombre_avec_espace(randint(2, 999, liste_diviseurs(p1)));
					textes[4] = `${n1} $\\ldots\\ldots\\ldots\\ldots$ ${n2}`;
					textes_corr[4] = `${n1} n'est ni un multiple ni un diviseur de ${n2} car ${n1}=${n2}$\\times$${Math.trunc(n1 / n2)}+${texte_en_couleur(n1 % n2)} et ${n2}=${n1}$\\times$${Math.trunc(n2 / n1)}+${texte_en_couleur(n2 % n1)}`;
					textes[5] = `${p2} $\\ldots\\ldots\\ldots\\ldots$ ${p1}`;
					textes_corr[5] = `${p2} n'est ni un multiple ni un diviseur de ${p1} car ${p1}=${p2}$\\times$${Math.trunc(p1 / p2)}+${texte_en_couleur(p1 % p2)} et ${p2}=${p1}$\\times$${Math.trunc(p2 / p1)}+${texte_en_couleur(p2 % p1)}`;
					// on mélange pour que l'ordre change!
					shuffle2tableaux(textes, textes_corr);
					texte = `Avec la calculatrice, compléter chaque phrase avec "est un diviseur de" ou "est un multiple de" ou "n'est ni un diviseur ni un multiple de".`;
					texte += `<br>`;
					texte_corr = ``;
					for (let j = 0; j < 5; j++) {
						texte += textes[j];
						texte += `<br>`;
						texte_corr += textes_corr[j];
						texte_corr += `<br>`;
					};
					texte += textes[5];
					//texte +=`<br>`;
					texte_corr += textes_corr[5];
					texte_corr += `<br>`;
					break;
				case 5: // liste des diviseurs
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
					texte_corr += `Il est suffisant de chercher des diviseurs inférieurs au plus grand nombre dont le carré vaut ${N}, par exemple ici, ${Math.trunc(Math.sqrt(N))}$\\times$${Math.trunc(Math.sqrt(N))} = ${Math.trunc(Math.sqrt(N)) * Math.trunc(Math.sqrt(N))}<${N}`;
					texte_corr += ` et ${Math.trunc(Math.sqrt(N)) + 1}$\\times$${Math.trunc(Math.sqrt(N)) + 1} = ${(Math.trunc(Math.sqrt(N)) + 1) * (Math.trunc(Math.sqrt(N)) + 1)}>${N} donc il suffit d'arrêter la recherche de facteur à ${Math.trunc(Math.sqrt(N))}.`;
					texte_corr += ` En effet, si ${N} est le produit de deux entiers p$\\times$q avec p < q alors si p$\\times$p > ${N} c'est que q$\\times$q < ${N} mais dans ce cas p serait supérieur à q sinon p$\\times$q serait inférieur à ${N} ce qui ne doit pas être le cas.<br>`;
					if (liste_diviseurs(N).length % 2 == 0) { //si il y a un nombre pair de diviseurs
						for (let m = 0; m < (liste_diviseurs(N).length / 2); m++) {
							texte_corr += `` + liste_diviseurs(N)[m] + `$\\times$` + liste_diviseurs(N)[(liste_diviseurs(N).length - m - 1)] + ` = ${N}<br>`;
						};
					} else {
						for (let m = 0; m < ((liste_diviseurs(N).length - 1) / 2); m++) {
							texte_corr += `` + liste_diviseurs(N)[m] + `$\\times$` + liste_diviseurs(N)[(liste_diviseurs(N).length - m - 1)] + `<br>`;
						};
						texte_corr += `` + liste_diviseurs(N)[(liste_diviseurs(N).length - 1) / 2] + `$\\times$` + liste_diviseurs(N)[(liste_diviseurs(N).length - 1) / 2] + ` = ${N}<br>`;
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
