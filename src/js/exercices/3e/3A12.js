import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,combinaisonListesSansChangerOrdre,texNombre,modalPdf,numAlpha,premiers_entre_bornes,warn_message,decomp_fact_prem_array} from '../../modules/outils.js'
export const titre = 'Fractions irréductibles'

/**
 * 3A12 - Fractions irreductibles
 * @author Sébastien Lozano
 */
export default function Fractions_irreductibles() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = titre;
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne = `Rendre irréductible une fraction et son inverse à partir des décompositions en produit de facteurs premiers.`;
	//this.consigne += `<br>`;
	sortieHtml ? this.spacing = 4 : this.spacing = 2;
	sortieHtml ? this.spacingCorr = 4 : this.spacingCorr = 2;
	this.nbQuestions = 1;
	//this.correctionDetailleeDisponible = true;
	this.nbCols = 1;
	this.nbColsCorr = 1;
	this.listePackages = `bclogo`;

	this.nouvelleVersion = function (numeroExercice) {
		let type_de_questions;
		if (sortieHtml) { // les boutons d'aide uniquement pour la version html
			//this.boutonAide = '';
			this.boutonAide = modalPdf(numeroExercice, "assets/pdf/FicheArithmetique-3A12.pdf", "Aide mémoire sur les fonctions (Sébastien Lozano)", "Aide mémoire");
			//this.boutonAide += modal_video('conteMathsNombresPremiers','/videos/LesNombresPremiers.mp4','Petit conte mathématique','Intro Vidéo');
		} else { // sortie LaTeX
		};

		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenuCorrection = ''; // Liste de questions corrigées


		//let type_de_questions_disponibles = [1,2,3,4];
		let type_de_questions_disponibles = [1];
		let listeTypeDeQuestions = combinaisonListesSansChangerOrdre(type_de_questions_disponibles, this.nbQuestions);

		this.introduction = warn_message(`À la question ` + numAlpha(3) + ` une observation judicieuse et argumentée pourra faire gagner du temps!`, `nombres`, `Coup de pouce`);

		for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
			type_de_questions = listeTypeDeQuestions[i];

			var nb_div_prem_communs; // nombre de diviseurs premiers communs
			var candidats_premiers_communs; // tableau des candidats premiers communs
			var premiers_communs; // tableau des diviseurs premiers communs
			var multiplicites_premiers_communs; // tableau des multiplicités des diviseurs premiers communs 
			var r; // tableau pour le choix des rangs des diviseurs premiers communs
			var r_exclus; // tableau pour la boucle de creation de r				
			var nb1_dist; // diviseur unique du premier nombre 
			var nb2_dist; // divisuer unique du second nombre
			var r_ex; // pour exlcure le rang de nb1
			var tab_nb1; // tableau pour les diviseurs de nb1
			var tab_nb2; // tableau pour les diviseurs de nb2
			var multiplicites_nb1;
			var multiplicites_nb2;
			var nb1; // nbre 1
			var nb2; // nbre 2


			// on fixe le tableau de choix
			candidats_premiers_communs = premiers_entre_bornes(2, 13);
			// on fixe le nombre de divisuers premiers communs
			nb_div_prem_communs = 4;
			// on initialise le tableau des diviseurs premiers communs
			premiers_communs = [];
			// on initialise le tableau des rangs
			r = [];
			// on initialise le tableau des rangs déjà choisis
			r_exclus = [];
			// on complète le tableau des rangs des rangs des diviseurs premiers choisis
			for (let k = 0; k < nb_div_prem_communs; k++) {
				for (let m = 0; m < k; m++) {
					r_exclus.push(r[m]);
				};
				r[k] = randint(0, candidats_premiers_communs.length - 1, r_exclus);
			};
			// on complète le tableau des diviseurs premiers communs
			for (let k = 0; k < nb_div_prem_communs; k++) {
				premiers_communs.push(candidats_premiers_communs[r[k]]);
			};
			// on initialise et on complète le tableau des multiplicités des diviseurs premiers communs
			multiplicites_premiers_communs = [];
			for (let k = 0; k < nb_div_prem_communs; k++) {
				multiplicites_premiers_communs.push(randint(0, 2));
			};
			// on supprime les diviseurs premiers de multiplicité 0 et leur multiplicité
			let idx = multiplicites_premiers_communs.indexOf(0);
			while (idx != -1) {
				premiers_communs.splice(idx, 1);
				multiplicites_premiers_communs.splice(idx, 1);
				idx = multiplicites_premiers_communs.indexOf(0);
			};
			// on initialise le tableau des diviseurs du premier et du second nombre avec les diviseurs premiers communs
			tab_nb1 = [];
			tab_nb2 = [];
			for (let k = 0; k < premiers_communs.length; k++) {
				tab_nb1[k] = premiers_communs[k];
				tab_nb2[k] = premiers_communs[k];
			};
			// on initialise les tableaux de multiplicité, ils sont les mêmes mais on pourrait vouloir qu'ils soient différents
			multiplicites_nb1 = [];
			multiplicites_nb2 = [];
			for (let k = 0; k < premiers_communs.length; k++) {
				multiplicites_nb1[k] = multiplicites_premiers_communs[k];
				multiplicites_nb2[k] = multiplicites_premiers_communs[k];
			};
			// on ajoute un facteur premier distinct pour chaque nombre plus petit que 30
			r_ex = randint(0, premiers_entre_bornes(2, 30).length - 1);
			nb1_dist = premiers_entre_bornes(2, 30)[r_ex];
			nb2_dist = premiers_entre_bornes(2, 30)[randint(0, premiers_entre_bornes(2, 30).length - 1, r_ex)];
			// on ajoute nb1_dist, nb2_dist dans les tableaux des diviseurs premiers du premier et du second nombre 
			// nb1
			let bool = false;
			let n = 0;
			while (n < tab_nb1.length && bool != true) {
				if (nb1_dist == tab_nb1[n]) { // si le diviseur premier est déjà présent on incrémente sa multiplicité
					multiplicites_nb1[n]++;
					bool = true;
				};
				n++;
			};
			// on teste la valeur de sortie de bool et on ajoute la nouvelle valeur si necessaire
			if (!bool) { // il n'est pas présent on l'ajoute avec la multipplicité 1
				tab_nb1.push(nb1_dist);
				multiplicites_nb1.push(1);
				bool = true;
			};
			// nb2
			bool = false;
			n = 0;
			while (n < tab_nb2.length && !bool) {
				if (nb2_dist == tab_nb2[n]) { // si le diviseur premier est déjà présent on incrémente sa multiplicité
					multiplicites_nb2[n]++;
					bool = true;
				};
				n++;
			};
			// on teste la valeur de sortie de bool et on ajoute la nouvelle valeur si necessaire
			if (!bool) { // il n'est pas présent on l'ajoute avec la multipplicité 1
				tab_nb2.push(nb2_dist);
				multiplicites_nb2.push(1);
				bool = true;
			};
			// on crée un tableau associatif à partir des deux tableaux tab_ni et multiplicites_ni
			let tab_prem_mult_nb1 = [];
			for (let k = 0; k < tab_nb1.length; k++) {
				tab_prem_mult_nb1[k] = { 'prem': tab_nb1[k], 'mult': multiplicites_nb1[k] };
			};
			let tab_prem_mult_nb2 = [];
			for (let k = 0; k < tab_nb2.length; k++) {
				tab_prem_mult_nb2[k] = { 'prem': tab_nb2[k], 'mult': multiplicites_nb2[k] };
			};
			// on range selon prem croissant
			tab_prem_mult_nb1.sort(function (a, b) {
				return a.prem > b.prem;
			});
			tab_prem_mult_nb2.sort(function (a, b) {
				return a.prem > b.prem;
			});
			// on initialise nb1 et nb2 et on les calcule à partir des tableaux 				
			nb1 = 1;
			for (let k = 0; k < tab_nb1.length; k++) {
				nb1 = nb1 * tab_prem_mult_nb1[k].prem ** tab_prem_mult_nb1[k].mult;
			};
			nb2 = 1;
			for (let k = 0; k < tab_nb2.length; k++) {
				nb2 = nb2 * tab_prem_mult_nb2[k].prem ** tab_prem_mult_nb2[k].mult;
			};

			switch (type_de_questions) {
				case 1: // décomposition de A
					texte = numAlpha(0) + ` Décomposer $A = ${texNombre(nb1)}$ en produit de facteurs premiers : `;
					texteCorr = numAlpha(0) + ` La décomposition en produit de facteurs premier de $A = `;
					switch (tab_prem_mult_nb1[0].mult) {
						case 1:
							texteCorr += `${tab_prem_mult_nb1[0].prem}`;
							break;
						default:
							texteCorr += `${tab_prem_mult_nb1[0].prem}^{${tab_prem_mult_nb1[0].mult}}`;
							break;
					};
					for (let k = 1; k < tab_nb1.length; k++) {
						switch (tab_prem_mult_nb1[k].mult) {
							case 1:
								texteCorr += `\\times${tab_prem_mult_nb1[k].prem}`;
								break;
							default:
								texteCorr += `\\times${tab_prem_mult_nb1[k].prem}^{${tab_prem_mult_nb1[k].mult}}`;
								break;
						};
					};
					texteCorr += `$.`;
					//	break;		
					//case 2 : // décomposition de B 	
					texte += `<br>` + numAlpha(1) + ` Décomposer $B = ${texNombre(nb2)}$ en produit de facteurs premiers : `;
					texteCorr += `<br>` + numAlpha(1) + ` La décomposition en produit de facteurs premier de $B = `;
					switch (tab_prem_mult_nb2[0].mult) {
						case 1:
							texteCorr += `${tab_prem_mult_nb2[0].prem}`;
							break;
						default:
							texteCorr += `${tab_prem_mult_nb2[0].prem}^{${tab_prem_mult_nb2[0].mult}}`;
							break;
					};
					for (let k = 1; k < tab_nb2.length; k++) {
						switch (tab_prem_mult_nb2[k].mult) {
							case 1:
								texteCorr += `\\times${tab_prem_mult_nb2[k].prem}`;
								break;
							default:
								texteCorr += `\\times${tab_prem_mult_nb2[k].prem}^{${tab_prem_mult_nb2[k].mult}}`;
								break;
						};
					};
					texteCorr += `$.`;
					//	break;	
					//case 3 : // reduction de A sur B 			
					texte += `<br>` + numAlpha(2) + ` Rendre la fraction $\\dfrac{A}{B} = \\dfrac{${texNombre(nb1)}}{${texNombre(nb2)}}$ irréductible `;
					if (sortieHtml) {
						texte += ` à l'aide des décompositions obtenues au ` + numAlpha(0) + ` et au ` + numAlpha(1);
					} else {
						texte += ` à l'aide des questions ` + numAlpha(0) + ` et ` + numAlpha(1);
					};
					texteCorr += `<br>` + numAlpha(2) + ` $\\dfrac{A}{B} = \\dfrac{${texNombre(nb1)}}{${texNombre(nb2)}} = `;
					texteCorr += `\\dfrac{`;
					texteCorr += `\\cancel{` + decomp_fact_prem_array(nb1 / nb1_dist)[0] + `}`;
					for (let k = 1; k < decomp_fact_prem_array(nb1 / nb1_dist).length; k++) {
						texteCorr += `\\times \\cancel{` + decomp_fact_prem_array(nb1 / nb1_dist)[k] + `}`;
					};
					texteCorr += `\\times ${nb1_dist}}{`;
					texteCorr += `\\cancel{` + decomp_fact_prem_array(nb1 / nb1_dist)[0] + `}`;
					for (let k = 1; k < decomp_fact_prem_array(nb1 / nb1_dist).length; k++) {
						texteCorr += `\\times \\cancel{` + decomp_fact_prem_array(nb1 / nb1_dist)[k] + `}`;
					};
					texteCorr += `\\times ${nb2_dist}} = `;
					texteCorr += `\\dfrac{${nb1_dist}}{${nb2_dist}}$.`;
					//	break;	
					//case 4 : // reduction de B sur A 			
					texte += `<br>` + numAlpha(3) + ` Rendre la fraction $\\dfrac{B}{A} = \\dfrac{${texNombre(nb2)}}{${texNombre(nb1)}}$ irréductible`;
					if (sortieHtml) {
						texte += ` à l'aide des décompositions obtenues au ` + numAlpha(0) + ` et au ` + numAlpha(1);
					} else {
						texte += ` à l'aide des questions ` + numAlpha(0) + ` et ` + numAlpha(1);
					};
					texteCorr += `<br>` + numAlpha(3) + ` $\\dfrac{B}{A}$ est l'inverse de $\\dfrac{A}{B}$ donc $\\dfrac{B}{A} = \\dfrac{${texNombre(nb2)}}{${texNombre(nb1)}} = `;
					texteCorr += `\\dfrac{`;
					texteCorr += `\\cancel{` + decomp_fact_prem_array(nb1 / nb1_dist)[0] + `}`;
					for (let k = 1; k < decomp_fact_prem_array(nb1 / nb1_dist).length; k++) {
						texteCorr += `\\times \\cancel{` + decomp_fact_prem_array(nb1 / nb1_dist)[k] + `}`;
					};
					texteCorr += `\\times ${nb2_dist}}{`;
					texteCorr += `\\cancel{` + decomp_fact_prem_array(nb1 / nb1_dist)[0] + `}`;
					for (let k = 1; k < decomp_fact_prem_array(nb1 / nb1_dist).length; k++) {
						texteCorr += `\\times \\cancel{` + decomp_fact_prem_array(nb1 / nb1_dist)[k] + `}`;
					};
					texteCorr += `\\times ${nb1_dist}} = `;
					texteCorr += `\\dfrac{${nb2_dist}}{${nb1_dist}}$.`;
					//	break;	
					//case 5 : // calculer le produit A/B x B/A et réduire. Remarque?
					// texte += `<br>`+numAlpha(4)+` Combien alculer le produit de $\\dfrac{A}{B} = \\dfrac{${texNombre(nb1)}}{${texNombre(nb2)}}$ et de $\\dfrac{B}{A} = \\dfrac{${texNombre(nb2)}}{${texNombre(nb1)}}$.`;
					// texte += `<br>Donner le résultat sous forme de fraction irréductible.`
					//texte += `<br>`+numAlpha(4)+` Remarque ?`
					//texteCorr += `<br>`+numAlpha(4)+' corr type 5';
					break;
			};

			if (this.listeQuestions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.listeQuestions.push(texte);
				this.listeCorrections.push(texteCorr);
				i++;
			};
			cpt++;
		};
		listeQuestionsToContenu(this);
	};
	//this.besoinFormulaireNumerique = ['Règle à travailler',5,"1 : Produit de deux puissances de même base\n2 : Quotient de deux puissances de même base\n3 : Puissance de puissance\n4 : Produit de puissances de même exposant\n5 : Mélange"]; 
}
