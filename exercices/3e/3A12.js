import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes_sans_changer_ordre,tex_nombre,modal_pdf,num_alpha,premiers_entre_bornes,warn_message,decomp_fact_prem_array} from "/modules/outils.js"
/**
 * 3A12 - Fractions irreductibles
 * @author Sébastien Lozano
 */
export default function Fractions_irreductibles() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Fractions irréductibles";
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne = `Rendre irréductible une fraction et son inverse à partir des décompositons en produit de facteurs premiers.`;
	//this.consigne += `<br>`;
	sortie_html ? this.spacing = 4 : this.spacing = 2;
	sortie_html ? this.spacing_corr = 4 : this.spacing_corr = 2;
	this.nb_questions = 1;
	//this.correction_detaillee_disponible = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.liste_packages = `bclogo`;

	this.nouvelle_version = function (numero_de_l_exercice) {
		let type_de_questions;
		if (sortie_html) { // les boutons d'aide uniquement pour la version html
			//this.bouton_aide = '';
			this.bouton_aide = modal_pdf(numero_de_l_exercice, "pdf/FicheArithmetique-3A12.pdf", "Aide mémoire sur les fonctions (Sébastien Lozano)", "Aide mémoire");
			//this.bouton_aide += modal_video('conteMathsNombresPremiers','videos/LesNombresPremiers.mp4','Petit conte mathématique','Intro Vidéo');
		} else { // sortie LaTeX
		};

		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées


		//let type_de_questions_disponibles = [1,2,3,4];
		let type_de_questions_disponibles = [1];
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions);

		this.introduction = warn_message(`À la question ` + num_alpha(3) + ` une observation judicieuse et argumentée pourra faire gagner du temps!`, `nombres`, `Coup de pouce`);

		for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
			type_de_questions = liste_type_de_questions[i];

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
					texte = num_alpha(0) + ` Décomposer $A = ${tex_nombre(nb1)}$ en produit de facteurs premiers : `;
					texte_corr = num_alpha(0) + ` La décomposition en produit de facteurs premier de $A = `;
					switch (tab_prem_mult_nb1[0].mult) {
						case 1:
							texte_corr += `${tab_prem_mult_nb1[0].prem}`;
							break;
						default:
							texte_corr += `${tab_prem_mult_nb1[0].prem}^{${tab_prem_mult_nb1[0].mult}}`;
							break;
					};
					for (let k = 1; k < tab_nb1.length; k++) {
						switch (tab_prem_mult_nb1[k].mult) {
							case 1:
								texte_corr += `\\times${tab_prem_mult_nb1[k].prem}`;
								break;
							default:
								texte_corr += `\\times${tab_prem_mult_nb1[k].prem}^{${tab_prem_mult_nb1[k].mult}}`;
								break;
						};
					};
					texte_corr += `$.`;
					//	break;		
					//case 2 : // décomposition de B 	
					texte += `<br>` + num_alpha(1) + ` Décomposer $B = ${tex_nombre(nb2)}$ en produit de facteurs premiers : `;
					texte_corr += `<br>` + num_alpha(1) + ` La décomposition en produit de facteurs premier de $B = `;
					switch (tab_prem_mult_nb2[0].mult) {
						case 1:
							texte_corr += `${tab_prem_mult_nb2[0].prem}`;
							break;
						default:
							texte_corr += `${tab_prem_mult_nb2[0].prem}^{${tab_prem_mult_nb2[0].mult}}`;
							break;
					};
					for (let k = 1; k < tab_nb2.length; k++) {
						switch (tab_prem_mult_nb2[k].mult) {
							case 1:
								texte_corr += `\\times${tab_prem_mult_nb2[k].prem}`;
								break;
							default:
								texte_corr += `\\times${tab_prem_mult_nb2[k].prem}^{${tab_prem_mult_nb2[k].mult}}`;
								break;
						};
					};
					texte_corr += `$.`;
					//	break;	
					//case 3 : // reduction de A sur B 			
					texte += `<br>` + num_alpha(2) + ` Rendre la fraction $\\dfrac{A}{B} = \\dfrac{${tex_nombre(nb1)}}{${tex_nombre(nb2)}}$ irréductible `;
					if (sortie_html) {
						texte += ` à l'aide des décompositions obtenues au ` + num_alpha(0) + ` et au ` + num_alpha(1);
					} else {
						texte += ` à l'aide des questions ` + num_alpha(0) + ` et ` + num_alpha(1);
					};
					texte_corr += `<br>` + num_alpha(2) + ` $\\dfrac{A}{B} = \\dfrac{${tex_nombre(nb1)}}{${tex_nombre(nb2)}} = `;
					texte_corr += `\\dfrac{`;
					texte_corr += `\\cancel{` + decomp_fact_prem_array(nb1 / nb1_dist)[0] + `}`;
					for (let k = 1; k < decomp_fact_prem_array(nb1 / nb1_dist).length; k++) {
						texte_corr += `\\times \\cancel{` + decomp_fact_prem_array(nb1 / nb1_dist)[k] + `}`;
					};
					texte_corr += `\\times ${nb1_dist}}{`;
					texte_corr += `\\cancel{` + decomp_fact_prem_array(nb1 / nb1_dist)[0] + `}`;
					for (let k = 1; k < decomp_fact_prem_array(nb1 / nb1_dist).length; k++) {
						texte_corr += `\\times \\cancel{` + decomp_fact_prem_array(nb1 / nb1_dist)[k] + `}`;
					};
					texte_corr += `\\times ${nb2_dist}} = `;
					texte_corr += `\\dfrac{${nb1_dist}}{${nb2_dist}}$.`;
					//	break;	
					//case 4 : // reduction de B sur A 			
					texte += `<br>` + num_alpha(3) + ` Rendre la fraction $\\dfrac{B}{A} = \\dfrac{${tex_nombre(nb2)}}{${tex_nombre(nb1)}}$ irréductible`;
					if (sortie_html) {
						texte += ` à l'aide des décompositions obtenues au ` + num_alpha(0) + ` et au ` + num_alpha(1);
					} else {
						texte += ` à l'aide des questions ` + num_alpha(0) + ` et ` + num_alpha(1);
					};
					texte_corr += `<br>` + num_alpha(3) + ` $\\dfrac{B}{A}$ est l'inverse de $\\dfrac{A}{B}$ donc $\\dfrac{B}{A} = \\dfrac{${tex_nombre(nb2)}}{${tex_nombre(nb1)}} = `;
					texte_corr += `\\dfrac{`;
					texte_corr += `\\cancel{` + decomp_fact_prem_array(nb1 / nb1_dist)[0] + `}`;
					for (let k = 1; k < decomp_fact_prem_array(nb1 / nb1_dist).length; k++) {
						texte_corr += `\\times \\cancel{` + decomp_fact_prem_array(nb1 / nb1_dist)[k] + `}`;
					};
					texte_corr += `\\times ${nb2_dist}}{`;
					texte_corr += `\\cancel{` + decomp_fact_prem_array(nb1 / nb1_dist)[0] + `}`;
					for (let k = 1; k < decomp_fact_prem_array(nb1 / nb1_dist).length; k++) {
						texte_corr += `\\times \\cancel{` + decomp_fact_prem_array(nb1 / nb1_dist)[k] + `}`;
					};
					texte_corr += `\\times ${nb1_dist}} = `;
					texte_corr += `\\dfrac{${nb2_dist}}{${nb1_dist}}$.`;
					//	break;	
					//case 5 : // calculer le produit A/B x B/A et réduire. Remarque?
					// texte += `<br>`+num_alpha(4)+` Combien alculer le produit de $\\dfrac{A}{B} = \\dfrac{${tex_nombre(nb1)}}{${tex_nombre(nb2)}}$ et de $\\dfrac{B}{A} = \\dfrac{${tex_nombre(nb2)}}{${tex_nombre(nb1)}}$.`;
					// texte += `<br>Donner le résultat sous forme de fraction irréductible.`
					//texte += `<br>`+num_alpha(4)+` Remarque ?`
					//texte_corr += `<br>`+num_alpha(4)+' corr type 5';
					break;
			};

			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			};
			cpt++;
		};
		liste_de_question_to_contenu(this);
	};
	//this.besoin_formulaire_numerique = ['Règle à travailler',5,"1 : Produit de deux puissances de même base\n2 : Quotient de deux puissances de même base\n3 : Puissance de puissance\n4 : Produit de puissances de même exposant\n5 : Mélange"]; 
}
