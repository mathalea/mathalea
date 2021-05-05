import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,shuffle,combinaisonListesSansChangerOrdre,nombre_avec_espace,texte_en_couleur_et_gras,itemize,modalPdf,modalVideo,cribleEratostheneN,warn_message} from '../../modules/outils.js'
export const titre = 'Primalité ou pas - Variante avec les critères de divisibilité par 7 et par 11'

/**
 * 3A11-1 justifier la non primalité réinvestissement des critères de divisibilité
 * Nombres à 3 ou 4 chiffres, un multiple de 2, de 3, de 5, de 7, de 11, sous forme d'un produit de deux nombres premiers inférieurs à 100
 * et un nombre premier inferieur à 529
 * variante de 3A11 avec les critères par 7 et 11 en plus
 * @author Sébastien Lozano
 */
export default function Premier_ou_pas_critere_par7_par11() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = titre;
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne = `Justifier que les nombres suivants sont premiers ou pas. Penser aux critères de divisibilité.`;
	//this.consigne += `<br>`;
	sortieHtml ? this.spacing = 3 : this.spacing = 2;
	sortieHtml ? this.spacingCorr = 2 : this.spacingCorr = 1;
	this.nbQuestions = 7;
	//this.correctionDetailleeDisponible = true;
	this.nbCols = 2;
	this.nbColsCorr = 1;
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

		let type_de_questions_disponibles = [1, 2, 3, 4, 5, 6, 7];
		type_de_questions_disponibles = shuffle(type_de_questions_disponibles); // on mélange l'ordre des questions

		//let type_de_questions_disponibles = [1];
		let listeTypeDeQuestions = combinaisonListesSansChangerOrdre(type_de_questions_disponibles, this.nbQuestions);

		let string_rappel_b = `Ces critères de divisibilité pourront être utiles :`;
		if (sortieHtml) {
			string_rappel_b += `<br>`;
			string_rappel_b += `- Un nombre est divisible par 7 si la somme de son nombre de dizaines et de cinq fois son chiffre des unités l’est.<br>`;
			string_rappel_b += `- Un nombre est divisible par 11 si la différence entre la somme de ses chiffres de rangs pairs et la somme de ses chiffres de rangs impairs est nulle ou égale à un multiple de 11.`;
			string_rappel_b += `<br> <br>`;
		} else {
			string_rappel_b += itemize([
				`Un nombre est divisible par 7 si la somme de son nombre de dizaines et de cinq fois son chiffre des unités l’est.`,
				`Un nombre est divisible par 11 si la différence entre la somme de ses chiffres de rangs pairs et la somme de ses chiffres de rangs impairs est nulle ou égale à un multiple de 11.`
			]);
			string_rappel_b += `\\par\\vspace{0.5cm}`;
		};
		string_rappel_b += `Ainsi que cette liste des nombres premiers inférieurs à 100 : `;
		if (sortieHtml) {
			string_rappel_b += `<br>`;
		} else {
			string_rappel_b += `\\par\\vspace{0.25cm}`;
		};
		string_rappel_b += cribleEratostheneN(100)[0];
		for (let k = 1; k < cribleEratostheneN(100).length; k++) {
			string_rappel_b += `, ` + cribleEratostheneN(100)[k];
		};
		string_rappel_b += `.`;

		this.introduction = warn_message(string_rappel_b, `nombres`, `Coup de pouce`);

		for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
			type_de_questions = listeTypeDeQuestions[i];

			var N; // le nombre de la question

			switch (type_de_questions) {
				case 1: // nombre pair
					N = 2 * randint(51, 4999);
					texte = nombre_avec_espace(N);
					texteCorr = `Comme ${nombre_avec_espace(N)} est pair, il admet donc au moins trois diviseurs qui sont 1, 2 et lui-même, `;
					texteCorr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` n'est donc pas premier.`);
					break;
				case 2: // Multiple de 3
					let sum = 0; // pour la valeur de la somme;
					N = 3 * randint(34, 3333); // on initialise avant la boucle car on a peut être de la chance
					while ((N % 2 == 0) || (N % 5 == 0)) {
						N = 3 * randint(34, 3333);
					};
					texte = nombre_avec_espace(N);
					texteCorr = `Comme ` + N.toString().charAt(0);
					sum = Number(N.toString().charAt(0));
					for (let k = 1; k < N.toString().length; k++) {
						texteCorr += ` + ` + N.toString().charAt(k);
						sum += Number(N.toString().charAt(k));
					};
					texteCorr += ` = ${sum} est un multiple de 3 donc ${nombre_avec_espace(N)} aussi, il admet donc au moins trois diviseurs qui sont 1, 3 et lui-même, `;
					texteCorr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` n'est donc pas premier.`);
					break;
				case 3: // Multiple de 5
					N = 5 * randint(20, 1999);
					texte = nombre_avec_espace(N);
					texteCorr = `Comme le dernier chiffre de ${nombre_avec_espace(N)} est un ${N.toString().charAt(N.toString().length - 1)} alors ${nombre_avec_espace(N)} est divisible par 5, `;
					texteCorr += `il admet donc au moins trois diviseurs qui sont 1, 5 et lui-même, `;
					texteCorr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` n'est donc pas premier.`);
					break;
				case 4: // Multiple de 7
					let N_longueur; // pour la taille du string N
					let N1; // pour la repetiton du critère
					let N1_longueur; // pour la taille du string N1
					let sum1; // pour la somme de la répétition du critère
					N = 7 * randint(15, 1428);
					texte = nombre_avec_espace(N);
					N_longueur = N.toString().length;
					texteCorr = ` 7 divise ${nombre_avec_espace(N)}, en effet : `;
					texteCorr += `<br>`;
					N1 = N;
					N1_longueur = N_longueur;
					sum1 = Number(N1.toString().substring(0, N1_longueur - 1)) + 5 * Number(N1.toString().charAt(N1_longueur - 1));
					while (sum1 >= 56) {
						texteCorr += `${N1.toString().substring(0, N1_longueur - 1)} + 5$\\times$${N1.toString().charAt(N1_longueur - 1)}`;
						texteCorr += ` = ${Number(N1.toString().substring(0, N1_longueur - 1)) + 5 * Number(N1.toString().charAt(N1_longueur - 1))}`;
						texteCorr += `<br>`;
						N1 = sum1;
						N1_longueur = N1.toString().length;
						sum1 = Number(N1.toString().substring(0, N1_longueur - 1)) + 5 * Number(N1.toString().charAt(N1_longueur - 1));
					};
					texteCorr += `Comme ${N1.toString().substring(0, N1_longueur - 1)} + 5$\\times$${N1.toString().charAt(N1_longueur - 1)} = ${sum1} est un multiple de 7 alors 7 divise ${N} aussi `;
					texteCorr += `qui admet donc au moins trois diviseurs : 1, 7 et lui-même, `;
					texteCorr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` n'est donc pas premier.`);
					break;
				case 5: // multiple de 11
					let even_sum; // pour la somme des chiffres de rang impair
					let odd_sum; // pour la somme des chiffres de rang pair
					N = 11 * randint(10, 909);
					texte = nombre_avec_espace(N);
					texteCorr = `D'une part, la somme des chiffres de rang impair de ${nombre_avec_espace(N)} vaut `;
					if (Number(N.toString().length) % 2 == 0) { // si N a un nombre pair de chiffres
						even_sum = Number(N.toString().charAt(1));
						texteCorr += N.toString().charAt(1);
						for (let k = 3; k < N.toString().length; k++) {
							if (k % 2 == 1) {
								texteCorr += ` + ` + N.toString().charAt(k);
								even_sum += Number(N.toString().charAt(k));
							};
						};
						texteCorr += ` = ` + even_sum + ` <br> `;
					} else { // sinon N a un nombre impair de chiffres
						even_sum = Number(N.toString().charAt(0));
						texteCorr += N.toString().charAt(0);
						for (let m = 1; m < N.toString().length; m++) {
							if (m % 2 == 0) {
								texteCorr += ` + ` + N.toString().charAt(m);
								even_sum += Number(N.toString().charAt(m));
							};

						};
						texteCorr += ` = ` + even_sum + `<br> `;
					};
					texteCorr += `d'autre part, la somme des chiffres de rang pair de ${nombre_avec_espace(N)} vaut `;
					if (Number(N.toString().length) % 2 == 0) { // si N a un nombre pair de chiffres
						odd_sum = Number(N.toString().charAt(0));
						texteCorr += N.toString().charAt(0);
						for (let k = 1; k < N.toString().length; k++) {
							if (k % 2 == 0) {
								texteCorr += ` + ` + N.toString().charAt(k);
								odd_sum += Number(N.toString().charAt(k));
							};
						};
						texteCorr += ` = ` + odd_sum + ` <br> `;
					} else { // sinon N a un nombre impair de chiffres
						odd_sum = Number(N.toString().charAt(1));
						texteCorr += N.toString().charAt(1);
						for (let m = 3; m < N.toString().length; m++) {
							if (m % 2 == 1) {
								texteCorr += ` + ` + N.toString().charAt(m);
								odd_sum += Number(N.toString().charAt(m));
							};

						};
						texteCorr += ` = ` + odd_sum + `<br> `;
					};
					texteCorr += `la différence entre la somme des chiffres de rangs pairs et celle des chiffres de rangs impairs vaut `;
					if ((odd_sum - even_sum) == 0) {
						texteCorr += `${odd_sum - even_sum}, `;

					} else {
						texteCorr += `${Math.abs(odd_sum - even_sum)} qui est un multiple de 11, `;
					};
					texteCorr += `<br>`;
					texteCorr += ` cela signifie que ${nombre_avec_espace(N)} est divisible par 11, il admet donc au moins trois diviseurs qui sont 1, 11 et lui-même, `;
					texteCorr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` n'est donc pas premier.`);
					break;
				case 6: // produit de deux nombres premiers inférieurs à 100
					// rang du premier facteur premier
					let r1 = randint(0, cribleEratostheneN(100).length - 1);
					// rang du second facteur premier
					let r2 = randint(0, cribleEratostheneN(100).length - 1);
					let prime1 = cribleEratostheneN(100)[r1]; // on tire un nombre premier inférieur à 100, il n'y en a que 25!
					let prime2 = cribleEratostheneN(100)[r2]; // on tire un autre nombre premier inférieur à 100, ça peut être le même qu'avant!
					N = prime1 + `$\\times$` + prime2;
					texte = N;
					texteCorr = `${N} est le produit de ${prime1} et de ${prime2}, il admet donc au moins `;
					if (prime1 == prime2) {
						texteCorr += `trois divisieurs qui sont 1, ${prime1} et lui-même ${N}=${nombre_avec_espace(prime1 * prime2)}, `;
					} else {
						texteCorr += `quatre diviseurs qui sont 1, ${prime1}, ${prime2} et lui-même ${N}=${nombre_avec_espace(prime1 * prime2)}, `;
					};
					texteCorr += texte_en_couleur_et_gras(`${N} = ` + nombre_avec_espace(prime1 * prime2) + ` n'est donc pas premier.`);
					break;
				case 7: // nombre premier inférieur à 529
					// rang du nombre premier choisi
					let r = randint(0, cribleEratostheneN(529).length - 1);
					N = cribleEratostheneN(529)[r]; //on choisit un nombre premier inférieur à 529
					texte = N + ``;;
					let tab_premiers_a_tester = cribleEratostheneN(Math.trunc(Math.sqrt(N)));
					texteCorr = `Testons la divisibilité de ${N} par tous les nombres premiers inférieurs à $\\sqrt{${N}}$, c'est à dire par les nombres `;
					texteCorr += tab_premiers_a_tester[0];
					for (let k = 1; k < tab_premiers_a_tester.length; k++) {
						texteCorr += `, ` + tab_premiers_a_tester[k];
					};
					texteCorr += `.`;
					texteCorr += `<br> Aucun de ces nombres premiers ne divise ${N}, `;
					texteCorr += texte_en_couleur_et_gras(nombre_avec_espace(Number(N)) + ` n'est donc pas premier.`);
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
