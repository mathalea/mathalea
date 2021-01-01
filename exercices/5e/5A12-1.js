import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,shuffle,combinaison_listes_sans_changer_ordre,nombre_avec_espace,texte_en_couleur_et_gras,modal_pdf,modal_video,crible_eratosthene_n,warn_message} from "/modules/outils.js"


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
	this.titre = "Primalité ou pas";
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne = `Justifier que les nombres suivants sont premiers ou pas.`;
	//this.consigne += `<br>`;	
	sortie_html ? this.spacing = 3 : this.spacing = 2;
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1;
	this.nb_questions = 7;
	//this.correction_detaillee_disponible = true;
	this.nb_cols = 2;
	this.nb_cols_corr = 1;
	this.sup = 1;
	this.liste_packages = `bclogo`;

	this.nouvelle_version = function (numero_de_l_exercice) {
		let type_de_questions;
		if (sortie_html) { // les boutons d'aide uniquement pour la version html
			//this.bouton_aide = '';
			this.bouton_aide = modal_pdf(numero_de_l_exercice, "pdf/FicheArithmetique-5A11.pdf", "Aide mémoire sur les nombres premiers (Sébastien Lozano)", "Aide mémoire");
			this.bouton_aide += modal_video('conteMathsNombresPremiers', 'videos/LesNombresPremiers.mp4', 'Petit conte mathématique - Les Nombres Premiers', 'Intro Vidéo');
		} else { // sortie LaTeX
		};

		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées

		let type_de_questions_disponibles = [1, 2, 3, 4, 5, 6, 7];
		type_de_questions_disponibles = shuffle(type_de_questions_disponibles); // on mélange l'ordre des questions

		//let type_de_questions_disponibles = [1];
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions);

		let string_rappel = `Cette liste des nombres premiers inférieurs à 30 pourra être utile : <br>` + crible_eratosthene_n(100)[0];
		for (let k = 1; k < crible_eratosthene_n(30).length; k++) {
			string_rappel += `, ` + crible_eratosthene_n(30)[k];
		};
		string_rappel += `.`;
		this.introduction = warn_message(string_rappel, `nombres`, `Coup de pouce`);

		for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {

			type_de_questions = liste_type_de_questions[i];

			var N; // le nombre de la question

			switch (type_de_questions) {
				case 1: // nombre pair
					N = 2 * randint(51, 4999);
					texte = nombre_avec_espace(N);
					texte_corr = `Comme ${nombre_avec_espace(N)} est pair, il admet donc au moins trois diviseurs qui sont 1, 2 et lui-même, `;
					texte_corr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` n'est donc pas premier.`);
					break;
				case 2: // Multiple de 3
					let sum3 = 0; // pour la valeur de la somme;
					N = 3 * randint(34, 3333); // on initialise avant la boucle car on a peut être de la chance
					while ((N % 2 == 0) || (N % 5 == 0)) {
						N = 3 * randint(34, 3333);
					};
					texte = nombre_avec_espace(N);
					texte_corr = `Comme ` + N.toString().charAt(0);
					sum3 = Number(N.toString().charAt(0));
					for (let k = 1; k < N.toString().length; k++) {
						texte_corr += ` + ` + N.toString().charAt(k);
						sum3 += Number(N.toString().charAt(k));
					};
					texte_corr += ` = ${sum3} est un multiple de 3 donc ${nombre_avec_espace(N)} aussi, il admet donc au moins trois diviseurs qui sont 1, 3 et lui-même, `;
					texte_corr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` n'est donc pas premier.`);
					break;
				case 3: // Multiple de 5
					N = 5 * randint(20, 1999);
					texte = nombre_avec_espace(N);
					texte_corr = `Comme le dernier chiffre de ${nombre_avec_espace(N)} est un ${N.toString().charAt(N.toString().length - 1)} alors ${nombre_avec_espace(N)} est divisible par 5, `;
					texte_corr += `il admet donc au moins trois diviseurs qui sont 1, 5 et lui-même, `;
					texte_corr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` n'est donc pas premier.`);
					break;
				case 4: // Multiple de 9
					let sum9 = 0; // pour la valeur de la somme;
					N = 9 * randint(12, 1111); // on initialise avant la boucle car on a peut être de la chance
					while ((N % 2 == 0) || (N % 5 == 0)) {
						N = 9 * randint(34, 3333);
					};
					texte = nombre_avec_espace(N);
					texte_corr = `Comme ` + N.toString().charAt(0);
					sum9 = Number(N.toString().charAt(0));
					for (let k = 1; k < N.toString().length; k++) {
						texte_corr += ` + ` + N.toString().charAt(k);
						sum9 += Number(N.toString().charAt(k));
					};
					texte_corr += ` = ${sum9} est un multiple de 9 donc ${nombre_avec_espace(N)} aussi, il admet donc au moins trois diviseurs qui sont 1, 9 et lui-même, `;
					texte_corr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` n'est donc pas premier.`);
					break;
				case 5: // multiple de 10
					N = 10 * randint(10, 999);
					texte = nombre_avec_espace(N);
					texte_corr = `Comme le nombre ${nombre_avec_espace(N)} se termine par un ${N.toString().charAt(N.toString().length - 1)} alors ${nombre_avec_espace(N)} est un multiple de 10, `;
					texte_corr += `il admet donc au moins trois diviseurs qui sont 1, 10 et lui-même, `;
					texte_corr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` n'est donc pas premier.`);
					break;
				case 6: // produit de deux nombres premiers inférieurs à 30
					// rang du premier facteur premier
					let r1 = randint(0, crible_eratosthene_n(30).length - 1);
					// rang du second facteur premier
					let r2 = randint(0, crible_eratosthene_n(30).length - 1);
					let prime1 = crible_eratosthene_n(100)[r1]; // on tire un nombre premier inférieur à 100, il n'y en a que 25!
					let prime2 = crible_eratosthene_n(100)[r2]; // on tire un autre nombre premier inférieur à 100, ça peut être le même qu'avant!
					N = prime1 + `$\\times $` + prime2;
					texte = N;
					texte_corr = `${N} est le produit de ${prime1} et de ${prime2}, il admet donc au moins `;
					if (prime1 == prime2) {
						texte_corr += `trois divisieurs qui sont 1, ${prime1} et lui-même ${N}=${nombre_avec_espace(prime1 * prime2)} `;
					} else {
						texte_corr += `quatre diviseurs qui sont 1, ${prime1}, ${prime2} et lui-même ${N}=${nombre_avec_espace(prime1 * prime2)}, `;
					};
					texte_corr += texte_en_couleur_et_gras(`${N} = ` + nombre_avec_espace(prime1 * prime2) + ` n'est donc pas premier.`);
					break;
				case 7: // nombre premier inférieur à 29
					// rang du nombre premier choisi
					let r = randint(0, crible_eratosthene_n(29).length - 1);
					N = crible_eratosthene_n(29)[r]; //on choisit un nombre premier inférieur à 529
					texte = N + ``;
					let tab_premiers_a_tester = crible_eratosthene_n(N);
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

}
