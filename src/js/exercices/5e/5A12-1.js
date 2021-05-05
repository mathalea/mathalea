import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,shuffle,combinaisonListesSansChangerOrdre,nombre_avec_espace,texte_en_couleur_et_gras,modalPdf,modalVideo,cribleEratostheneN,warn_message} from '../../modules/outils.js'


export const titre = 'Primalité ou pas'

/**
 * Justifier la non primalité réinvestissement des critères de divisibilité
 * Nombres à 3 ou 4 chiffres, un multiple de 2, de 3, de 5, de 7, de 9, de 10, sous forme d'un produit de deux nombres premiers inférieurs à 30
 * et un nombre premier inferieur à 529
 * 5A12-1
 * @author Sébastien Lozano
 */
export default function Premier_ou_pas_5e() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = titre;
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne = `Justifier que les nombres suivants sont premiers ou pas.`;
	//this.consigne += `<br>`;	
	sortieHtml ? this.spacing = 3 : this.spacing = 2;
	sortieHtml ? this.spacingCorr = 2 : this.spacingCorr = 1;
	this.nbQuestions = 7;
	//this.correctionDetailleeDisponible = true;
	this.nbCols = 2;
	this.nbColsCorr = 1;
	this.sup = 1;
	this.listePackages = `bclogo`;

	this.nouvelleVersion = function (numeroExercice) {
		let type_de_questions;
		if (sortieHtml) { // les boutons d'aide uniquement pour la version html
			//this.boutonAide = '';
			this.boutonAide = modalPdf(numeroExercice, "assets/pdf/FicheArithmetique-5A11.pdf", "Aide mémoire sur les nombres premiers (Sébastien Lozano)", "Aide mémoire");
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

		let string_rappel = `Cette liste des nombres premiers inférieurs à 30 pourra être utile : <br>` + cribleEratostheneN(100)[0];
		for (let k = 1; k < cribleEratostheneN(30).length; k++) {
			string_rappel += `, ` + cribleEratostheneN(30)[k];
		};
		string_rappel += `.`;
		this.introduction = warn_message(string_rappel, `nombres`, `Coup de pouce`);

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
					let sum3 = 0; // pour la valeur de la somme;
					N = 3 * randint(34, 3333); // on initialise avant la boucle car on a peut être de la chance
					while ((N % 2 == 0) || (N % 5 == 0)) {
						N = 3 * randint(34, 3333);
					};
					texte = nombre_avec_espace(N);
					texteCorr = `Comme ` + N.toString().charAt(0);
					sum3 = Number(N.toString().charAt(0));
					for (let k = 1; k < N.toString().length; k++) {
						texteCorr += ` + ` + N.toString().charAt(k);
						sum3 += Number(N.toString().charAt(k));
					};
					texteCorr += ` = ${sum3} est un multiple de 3 donc ${nombre_avec_espace(N)} aussi, il admet donc au moins trois diviseurs qui sont 1, 3 et lui-même, `;
					texteCorr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` n'est donc pas premier.`);
					break;
				case 3: // Multiple de 5
					N = 5 * randint(20, 1999);
					texte = nombre_avec_espace(N);
					texteCorr = `Comme le dernier chiffre de ${nombre_avec_espace(N)} est un ${N.toString().charAt(N.toString().length - 1)} alors ${nombre_avec_espace(N)} est divisible par 5, `;
					texteCorr += `il admet donc au moins trois diviseurs qui sont 1, 5 et lui-même, `;
					texteCorr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` n'est donc pas premier.`);
					break;
				case 4: // Multiple de 9
					let sum9 = 0; // pour la valeur de la somme;
					N = 9 * randint(12, 1111); // on initialise avant la boucle car on a peut être de la chance
					while ((N % 2 == 0) || (N % 5 == 0)) {
						N = 9 * randint(34, 3333);
					};
					texte = nombre_avec_espace(N);
					texteCorr = `Comme ` + N.toString().charAt(0);
					sum9 = Number(N.toString().charAt(0));
					for (let k = 1; k < N.toString().length; k++) {
						texteCorr += ` + ` + N.toString().charAt(k);
						sum9 += Number(N.toString().charAt(k));
					};
					texteCorr += ` = ${sum9} est un multiple de 9 donc ${nombre_avec_espace(N)} aussi, il admet donc au moins trois diviseurs qui sont 1, 9 et lui-même, `;
					texteCorr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` n'est donc pas premier.`);
					break;
				case 5: // multiple de 10
					N = 10 * randint(10, 999);
					texte = nombre_avec_espace(N);
					texteCorr = `Comme le nombre ${nombre_avec_espace(N)} se termine par un ${N.toString().charAt(N.toString().length - 1)} alors ${nombre_avec_espace(N)} est un multiple de 10, `;
					texteCorr += `il admet donc au moins trois diviseurs qui sont 1, 10 et lui-même, `;
					texteCorr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` n'est donc pas premier.`);
					break;
				case 6: // produit de deux nombres premiers inférieurs à 30
					// rang du premier facteur premier
					let r1 = randint(0, cribleEratostheneN(30).length - 1);
					// rang du second facteur premier
					let r2 = randint(0, cribleEratostheneN(30).length - 1);
					let prime1 = cribleEratostheneN(100)[r1]; // on tire un nombre premier inférieur à 100, il n'y en a que 25!
					let prime2 = cribleEratostheneN(100)[r2]; // on tire un autre nombre premier inférieur à 100, ça peut être le même qu'avant!
					N = prime1 + `$\\times $` + prime2;
					texte = N;
					texteCorr = `${N} est le produit de ${prime1} et de ${prime2}, il admet donc au moins `;
					if (prime1 == prime2) {
						texteCorr += `trois divisieurs qui sont 1, ${prime1} et lui-même ${N}=${nombre_avec_espace(prime1 * prime2)} `;
					} else {
						texteCorr += `quatre diviseurs qui sont 1, ${prime1}, ${prime2} et lui-même ${N}=${nombre_avec_espace(prime1 * prime2)}, `;
					};
					texteCorr += texte_en_couleur_et_gras(`${N} = ` + nombre_avec_espace(prime1 * prime2) + ` n'est donc pas premier.`);
					break;
				case 7: // nombre premier inférieur à 29
					// rang du nombre premier choisi
					let r = randint(0, cribleEratostheneN(29).length - 1);
					N = cribleEratostheneN(29)[r]; //on choisit un nombre premier inférieur à 529
					texte = N + ``;
					let tab_premiers_a_tester = cribleEratostheneN(N);
					//texteCorr = `Testons la divisibilité de ${N} par tous les nombres premiers inférieurs à $\\sqrt{${N}}$, c'est à dire par les nombres `;
					texteCorr = `En effectuant la division euclidienne de ${N} par tous les nombres premiers inférieurs à $\\sqrt{${N}}$, c'est à dire par les nombres `;
					texteCorr += tab_premiers_a_tester[0];
					for (let k = 1; k < tab_premiers_a_tester.length; k++) {
						texteCorr += `, ` + tab_premiers_a_tester[k];
					};
					//texteCorr += `.`;
					// texteCorr += `<br> Aucun de ces nombres premiers ne divise ${N}, `;
					texteCorr += `, le reste n'est jamais nul.`;
					// texteCorr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` est donc un nombre premier.`);
					texteCorr += `<br>` + texte_en_couleur_et_gras(nombre_avec_espace(N) + ` est donc un nombre premier.`);
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

}
