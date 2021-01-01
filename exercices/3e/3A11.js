import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,shuffle,combinaison_listes_sans_changer_ordre,nombre_avec_espace,texte_en_couleur_et_gras,modal_pdf,modal_video,crible_eratosthene_n,warn_message} from "/modules/outils.js"
/**
 * 3A11 justifier la non primalité réinvestissement des critères de divisibilité
 * Nombres à 3 ou 4 chiffres, un multiple de 2, de 3, de 5, de 7, de 11, sous forme d'un produit de deux nombres premiers inférieurs à 100
 * et un nombre premier inferieur à 529
 * dans cet exo on n'utilise pas les critères par 7 et 11
 * @author Sébastien Lozano
 */
export default function Premier_ou_pas() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Primalité ou pas";
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne = `Justifier que les nombres suivants sont premiers ou pas. Penser aux critères de divisibilité.`;
	//sortie_html ? this.spacing = 3 : this.spacing = 2;
	sortie_html ? this.spacing = 1 : this.spacing = 2;
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1;


	//this.correction_detaillee_disponible = true;
	this.nb_cols = 2;
	this.nb_cols_corr = 1;
	this.sup = 1;
	this.nb_questions_modifiable = false;
	// console.log(Number(this.sup)==1);
	// if (Number(this.sup)==1) {
	// 	this.nb_questions = 4;
	// } else {
	// 	this.nb_questions = 5;
	// }
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

		let type_de_questions_disponibles; // = [1, 2, 3, 6, 7];
		if (Number(this.sup) == 1) {
			this.nb_questions = 4;
			type_de_questions_disponibles = [1, 2, 3, 8];
		} else {
			this.nb_questions = 5;
			type_de_questions_disponibles = [1, 2, 3, 6, 7];
		}
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

			var N; // le nombre de la question
			let r;
			let tab_premiers_a_tester;

			switch (type_de_questions) {
				case 1: // nombre pair
					N = 2 * randint(51, 4999);
					texte = nombre_avec_espace(N);
					texte_corr = `Comme ${nombre_avec_espace(N)} est pair, il admet donc au moins trois diviseurs qui sont 1, 2 et lui-même, `;
					texte_corr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` n'est donc pas premier.`);
					break;
				case 2: // Multiple de 3
					let sum = 0; // pour la valeur de la somme;
					N = 3 * randint(34, 3333); // on initialise avant la boucle car on a peut être de la chance
					while ((N % 2 == 0) || (N % 5 == 0)) {
						N = 3 * randint(34, 3333);
					};
					texte = nombre_avec_espace(N);
					texte_corr = `Comme ` + N.toString().charAt(0);
					sum = Number(N.toString().charAt(0));
					for (let k = 1; k < N.toString().length; k++) {
						texte_corr += ` + ` + N.toString().charAt(k);
						sum += Number(N.toString().charAt(k));
					};
					texte_corr += ` = ${sum} est un multiple de 3 donc ${nombre_avec_espace(N)} aussi, il admet donc au moins trois diviseurs qui sont 1, 3 et lui-même, `;
					texte_corr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` n'est donc pas premier.`);
					break;
				case 3: // Multiple de 5
					N = 5 * randint(20, 1999);
					texte = nombre_avec_espace(N);
					texte_corr = `Comme le dernier chiffre de ${nombre_avec_espace(N)} est un ${N.toString().charAt(N.toString().length - 1)} alors ${nombre_avec_espace(N)} est divisible par 5, `;
					texte_corr += `il admet donc au moins trois diviseurs qui sont 1, 5 et lui-même, `;
					texte_corr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` n'est donc pas premier.`);
					break;
				case 4: // Multiple de 7
					let N_longueur; // pour la taille du string N
					let N1; // pour la repetiton du critère
					let N1_longueur; // pour la taille du string N1
					let sum1; // pour la somme de la répétition du critère
					N = 7 * randint(15, 1428);
					texte = nombre_avec_espace(N);
					N_longueur = N.toString().length;
					texte_corr = ` 7 divise ${nombre_avec_espace(N)}, en effet : `;
					texte_corr += `<br>`;
					N1 = N;
					N1_longueur = N_longueur;
					sum1 = Number(N1.toString().substring(0, N1_longueur - 1)) + 5 * Number(N1.toString().charAt(N1_longueur - 1));
					while (sum1 >= 56) {
						texte_corr += `${N1.toString().substring(0, N1_longueur - 1)} + 5$\\times$${N1.toString().charAt(N1_longueur - 1)}`;
						texte_corr += ` = ${Number(N1.toString().substring(0, N1_longueur - 1)) + 5 * Number(N1.toString().charAt(N1_longueur - 1))}`;
						texte_corr += `<br>`;
						N1 = sum1;
						N1_longueur = N1.toString().length;
						sum1 = Number(N1.toString().substring(0, N1_longueur - 1)) + 5 * Number(N1.toString().charAt(N1_longueur - 1));
					};
					texte_corr += `Comme ${N1.toString().substring(0, N1_longueur - 1)} + 5$\\times$${N1.toString().charAt(N1_longueur - 1)} = ${sum1} est un multiple de 7 alors 7 divise ${N} aussi `;
					texte_corr += `qui admet donc au moins trois diviseurs : 1, 7 et lui-même, `;
					texte_corr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` n'est donc pas premier.`);
					break;
				case 5: // multiple de 11
					let even_sum; // pour la somme des chiffres de rang impair
					let odd_sum; // pour la somme des chiffres de rang pair
					N = 11 * randint(10, 909);
					texte = nombre_avec_espace(N);
					texte_corr = `D'une part, la somme des chiffres de rang impair de ${nombre_avec_espace(N)} vaut `;
					if (Number(N.toString().length) % 2 == 0) { // si N a un nombre pair de chiffres
						even_sum = Number(N.toString().charAt(1));
						texte_corr += N.toString().charAt(1);
						for (let k = 3; k < N.toString().length; k++) {
							if (k % 2 == 1) {
								texte_corr += ` + ` + N.toString().charAt(k);
								even_sum += Number(N.toString().charAt(k));
							};
						};
						texte_corr += ` = ` + even_sum + ` <br> `;
					} else { // sinon N a un nombre impair de chiffres
						even_sum = Number(N.toString().charAt(0));
						texte_corr += N.toString().charAt(0);
						for (let m = 1; m < N.toString().length; m++) {
							if (m % 2 == 0) {
								texte_corr += ` + ` + N.toString().charAt(m);
								even_sum += Number(N.toString().charAt(m));
							};

						};
						texte_corr += ` = ` + even_sum + `<br> `;
					};
					texte_corr += `d'autre part, la somme des chiffres de rang pair de ${nombre_avec_espace(N)} vaut `;
					if (Number(N.toString().length) % 2 == 0) { // si N a un nombre pair de chiffres
						odd_sum = Number(N.toString().charAt(0));
						texte_corr += N.toString().charAt(0);
						for (let k = 1; k < N.toString().length; k++) {
							if (k % 2 == 0) {
								texte_corr += ` + ` + N.toString().charAt(k);
								odd_sum += Number(N.toString().charAt(k));
							};
						};
						texte_corr += ` = ` + odd_sum + ` <br> `;
					} else { // sinon N a un nombre impair de chiffres
						odd_sum = Number(N.toString().charAt(1));
						texte_corr += N.toString().charAt(1);
						for (let m = 3; m < N.toString().length; m++) {
							if (m % 2 == 1) {
								texte_corr += ` + ` + N.toString().charAt(m);
								odd_sum += Number(N.toString().charAt(m));
							};

						};
						texte_corr += ` = ` + odd_sum + `<br> `;
					};
					texte_corr += `la différence entre la somme des chiffres de rangs pairs et celle des chiffres de rangs impairs vaut `;
					if ((odd_sum - even_sum) == 0) {
						texte_corr += `${odd_sum - even_sum}, `;

					} else {
						texte_corr += `${Math.abs(odd_sum - even_sum)} qui est un multiple de 11, `;
					};
					texte_corr += `<br>`;
					texte_corr += ` cela signifie que ${nombre_avec_espace(N)} est divisible par 11, il admet donc au moins trois diviseurs qui sont 1, 11 et lui-même,`;
					texte_corr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` n'est donc pas premier.`);
					break;
				case 6: // produit de deux nombres premiers inférieurs à 100
					// rang du premier facteur premier
					let r1 = randint(0, crible_eratosthene_n(100).length - 1);
					// rang du second facteur premier
					let r2 = randint(0, crible_eratosthene_n(100).length - 1);
					let prime1 = crible_eratosthene_n(100)[r1]; // on tire un nombre premier inférieur à 100, il n'y en a que 25!
					let prime2 = crible_eratosthene_n(100)[r2]; // on tire un autre nombre premier inférieur à 100, ça peut être le même qu'avant!
					N = prime1 + `$\\times$` + prime2;
					texte = N;
					texte_corr = `${N} est le produit de ${prime1} et de ${prime2}, il admet donc au moins `;
					if (prime1 == prime2) {
						texte_corr += `trois divisieurs qui sont 1, ${prime1} et lui-même ${N}=${nombre_avec_espace(prime1 * prime2)}, `;
					} else {
						texte_corr += `quatre diviseurs qui sont 1, ${prime1}, ${prime2} et lui-même ${N}=${nombre_avec_espace(prime1 * prime2)}, `;
					};
					texte_corr += texte_en_couleur_et_gras(`${N} = ` + nombre_avec_espace(prime1 * prime2) + ` n'est donc pas premier.`);
					break;
				case 7: // nombre premier inférieur à 529
					// rang du nombre premier choisi
					r = randint(0, crible_eratosthene_n(529).length - 1);
					N = crible_eratosthene_n(529)[r]; //on choisit un nombre premier inférieur à 529
					texte = N + ``;
					tab_premiers_a_tester = crible_eratosthene_n(Math.trunc(Math.sqrt(N)));
					//texte_corr = `Testons la divisibilité de ${N} par tous les nombres premiers inférieurs à $\\sqrt{${N}}$, c'est à dire par les nombres `;
					texte_corr = `En effectuant la division euclidienne de ${N} par tous les nombres premiers inférieurs à $\\sqrt{${N}}$, c'est à dire par les nombres `;
					texte_corr += tab_premiers_a_tester[0];
					for (let k = 1; k < tab_premiers_a_tester.length; k++) {
						texte_corr += `, ` + tab_premiers_a_tester[k];
					};
					//texte_corr += `.`;
					// texte_corr += `<br> Aucun de ces nombres premiers ne divise ${N}, `;
					texte_corr += `, le reste n'est jamais nul.`;
					// texte_corr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` est donc un nombre premier.`);
					texte_corr += `<br>` + texte_en_couleur_et_gras(nombre_avec_espace(N) + ` est donc un nombre premier.`);
					break;
				case 8: // nombre premier inférieur à 100 pour permettre les tests de divisibilité sans calculatrice
					// rang du nombre premier choisi
					r = randint(0, crible_eratosthene_n(100).length - 1);
					N = crible_eratosthene_n(100)[r]; //on choisit un nombre premier inférieur à 529
					texte = N + ``;
					tab_premiers_a_tester = crible_eratosthene_n(Math.trunc(Math.sqrt(N)));
					//texte_corr = `Testons la divisibilité de ${N} par tous les nombres premiers inférieurs à $\\sqrt{${N}}$, c'est à dire par les nombres `;
					texte_corr = `En effectuant la division euclidienne de ${N} par tous les nombres premiers inférieurs à $\\sqrt{${N}}$, c'est à dire par les nombres `;
					texte_corr += tab_premiers_a_tester[0];
					for (let k = 1; k < tab_premiers_a_tester.length; k++) {
						texte_corr += `, ` + tab_premiers_a_tester[k];
					};
					//texte_corr += `.`;
					// texte_corr += `<br> Aucun de ces nombres premiers ne divise ${N}, `;
					texte_corr += `, le reste n'est jamais nul.`;
					// texte_corr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` est donc un nombre premier.`);
					texte_corr += `<br>` + texte_en_couleur_et_gras(nombre_avec_espace(N) + ` est donc un nombre premier.`);
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
	this.besoin_formulaire_numerique = ['Difficulté', 2, "1 : Sans Calculatrice\n2 : Avec calculatrice"];
}
