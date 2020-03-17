var liste_des_exercices_disponibles = {
		'CM001' :Tables_de_multiplications,
		'CM002' :Tables_de_divisions,
		'CM003' :Tables_de_multiplications_et_divisions,
		'CM004' : Quatre_operations,
		'CM005' : Ajouter9,
		'CM006' : Soustraire9,
		'CM007' : Ajouter11,
		'CM008' : Soustraire11,
		'CM009' : Moitie,
		'CM010' : Tiers,
		'CM011' : Quart,
		'CM012' : Complement_a_100,
		'CM013' : Complement_a_une_dizaine,
		'CM014' : Double_moitie_tiers_triple,
		'CM015' : Somme_de_deux_nombres_maries,
		'CM016' : Diviser_par_10_100_1000,
		'CM017' : Diviser_decimal_par_10_100_1000,
		'CM018' : Somme_de_deux_nombres_maries_et_un_entier,
		'CM019' : Le_compte_est_bonV2,
		'6C10' : Additions_soustractions_multiplications_posees,
		'6C11' : Divisions_euclidiennes,
		'6C10-1' :Tables_de_multiplications,
		'6C10-2' :Exercice_tables_de_multiplications_et_multiples_de_10,
		'6C10-3' :Exercice_tables_de_multiplications_et_decimaux,
		'6C10-4': Exercice_tables_d_additions,
		'6C20' : Additionner_soustraires_decimaux,
		'6C21' : Divisions_euclidiennes_niv2,
		'6C30' : Multiplier_decimaux,
		'6C30-1': Multiplier_decimaux_par_10_100_1000,
		'6C31' : Division_decimale,
		'6C32': Probleme_course,
		'6C33' : Priorites,
		'6D10' : Conversions_de_durees,
		'6D101' : Heures_decimales,
		'6D11' : Somme_de_durees,
		'6D12' : Calculs_de_durees_ou_d_horaires,
		'6M11-1' : Perimetre_ou_aire_de_carres_rectangles_triangles,
		'6M11-2' : Perimetre_ou_aire_de_figures_composees,
		'6M10' : Reglages_6M10,
		'6M12' : Reglages_6M12,
		'6M20' : Aire_de_triangles,
		'6M22' : Reglages_6M22,
		'6M22-1' : Perimetre_aire_disques,
		'6M22-2' : Perimetre_aire_et_portions_de_disques,
		'6M13' : Reglages_6M23,
		'6M25' : Connaitre_formules_de_perimetre_et_aires,
		'6M31' : Exercice_conversions_volumes,
		'6N10-1': Exercice_numeration_entier,
		'6N10-2': Decomposition_nombre_decimal,
		'6N11' : Lire_abscisse_entiere,
		'6N11-2' : Placer_un_point_abscisse_entiere,
		'6N12' : Exercice_6N12,
		'6N13' : Exercice_6N13,
		'6N20' : Exercice_fractions_decomposer,
		'6N20-2':Exercice_fractions_differentes_ecritures,
		'6N21' : Lire_abscisse_fractionnaire,
		'6N23' : Exercice_ecriture_decimale_a_partir_de_fraction_decimale,
		'6N23_1' : Exercice_differentes_ecritures_nombres_decimaux,
		'6N24' : Exercice_6N24,
		'6N24_1' : Exercice_multiplier_ou_diviser_un_nombre_entier_par_10_100_1000,
		'6N30' : Lire_abscisse_decimale,
		'6N30-2' : Placer_points_sur_axe,
		'6N31' : Comparer_decimaux,
		'6N33' : Fraction_d_un_nombre,
		'6N33-1' : Pourcentage_d_un_nombre,
		'6N34' : Reglages_6N34,
		'6N41' : Egalites_entre_fractions,
		'6N43' : Criteres_de_divisibilite,
		'6P11' : Proportionnalite_par_linearite,
		'5N12':Exercice_fractions_simplifier,
		'5N12-2': Egalites_entre_fractions,
		'5N18': Exercice_decomposer_en_facteurs_premiers,
		'5N110' : Variation_en_pourcentages,
		'5N21': Exercice_comparer_deux_fractions,
		'5N21-1': Exercice_comparer_quatre_fractions,
		'5N22': Exercice_additionner_des_fractions_5e,
		'5N22-1': Exercice_additionner_ou_soustraire_des_fractions_5e,
		'5L10' : Ecrire_une_expression_litterale,
		'5L101' : Traduire_un_programme_de_calcul,
		'5L11' : Calculer_la_valeur_d_une_expression_litterale,
		'5L11-1' : Exercice_substituer,
		'5L111' : Tester_une_egalite,
		'5L12' : Reduire_une_expression_litterale,
		'5M10' : Exercice_angles_triangles,
		'5R10' : Lire_abscisse_relative,
		'5R10-2' : Placer_points_sur_axe_relatifs,
		'5R12-1' : reperage_point_du_quart_de_plan,
		'5R12-2' : reperage_point_du_plan,
		'5R20': Exercice_additions_relatifs,
		'5R20_bis': Exercice_additions_relatifs_a_trou,
		'5R20_ter': Exercice_additions_de_5_relatifs, //on pourrait le corriger avec regroupement des termes de même signe
		'5R21': Exercice_soustractions_relatifs,
		'5R22': Exercice_additions_et_soustraction_de_relatifs,
		'5R31': Exercice_additions_et_soustraction_de_relatifsV2,
		'5R31-2': Exercice_simplification_somme_algebrique,
		'5S10': Calculer_des_frequences,
		'5S10-2': Calculer_des_moyennes,
		'5S10-3': Calculer_des_etendues,
		'4L10' : Exercice_developper,
		'4L20' : Exercice_equation1,
		'4N10': Exercice_additionner_des_fractions,
		'4N11': Exercice_additionner_ou_soustraire_des_fractions,
		'4N12': Exercice_trouver_l_inverse,
		'4N13': Exercice_multiplier_fractions,
		'4N14': Exercice_diviser_fractions,
		'4N15': Exercice_additionner_fraction_produit,
		'4N21': Puissances_d_un_relatif_1,
		'4N21-1': Puissances_d_un_relatif_2,
		'4N21-2': Puissances_de_dix,
		'4R10': Exercice_multiplications_relatifs,
		'4G10' : Exercice_Pythagore,
		'4G11' : Reciproque_Pythagore,
		'4G12' : Problemes_Pythagore,
		'4G30' : Exercice_Trigo_longueurs_4e,
		'4G31' : Exercice_Trigo_angles_4e,
		'4G20' : Thales_4eme,
		'3N10': Exercice_developper,
		'3N11' : Double_distributivite,
		'3N12' : Developper_Identites_remarquables3,
		'3N13' : Factoriser_Identites_remarquables3,
		'3N14' : Resoudre_une_equation_produit_nul,
		'3N14-2' : Resoudre_une_equation_produit_nul_niv2,
		'3G10' : Exercice_Thales,
		'3G30' : Exercice_Trigo_longueurs,
		'3G31' : Exercice_Trigo_angles,
		'3F1-act' : fonction_notion_vocabulaire,
		'3F10' : fonctions_lineaires,
		'3F11' : fonctions_affines,
		'2N10' : Developper_Identites_remarquables2,
		'2N11' : Factoriser_Identites_remarquables2,
		'P001' : Code_LaTeX_personnalise,
		// 'P002': LaTeX_static,
		'P003' : feuille_d_axes_gradues,
		'cours': Questions_de_cours,
		'LaTeX' : Code_LaTeX_personnalise,
		// 'Perso' : HTML_personnalise,
		// 'TsvgjsKatex' : tests_SVGJS_KATEX,
		
	};

//Pour modifier les exercices lorsqu'ils sont en mode diaporama
var est_diaporama = false

if (window.location.href.indexOf('cm.html')>0) {
	est_diaporama = true
}

//Efface de la liste des exercices disponibles tout ceux qui n'ont pas de version HTML
if (sortie_html){
	var codeMG32 = '';
}

for (var i in liste_des_exercices_disponibles) {
	let exercice = new liste_des_exercices_disponibles[i];
	if (sortie_html && exercice.pas_de_version_HMTL) {
		delete liste_des_exercices_disponibles[i]
	}
	if (!sortie_html && exercice.pas_de_version_LaTeX) {
		delete liste_des_exercices_disponibles[i]
	}
}

/**
* Classe parente de tous les exercices
*
* @Auteur Rémi Angot
*/
function Exercice() {
	// Classe parente de tous les exercices qui seront créés
    this.titre = '';
    this.consigne = '';
    this.consigne_correction = '';
    this.liste_questions = [];
    this.liste_corrections = [];
    this.contenu = '';
    this.contenu_correction = '';
    this.nb_questions = 10;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.spacing = 2;
    this.spacing_corr = 1;
    this.beamer = false;

   	this.besoin_formulaire_numerique = false; // Sinon this.besoin_formulaire_numerique = [texte,max,tooltip facultatif];
   	this.besoin_formulaire_texte = false; // Sinon this.besoin_formulaire_texte = [texte,tooltip];
   	this.besoin_formulaire_case_a_cocher = false; // Sinon this.besoin_formulaire_case_a_cocher = [texte];

   	this.consigne_modifiable = true;
   	this.nb_questions_modifiable = true;
   	this.nb_cols_modifiable = true;
   	this.nb_cols_corr_modifiable = true;
   	this.spacing_modifiable = true;
   	this.spacing_corr_modifiable = true;
   	this.correction_detaillee_disponible = false;
   	this.correction_detaillee = true;
   	this.bouton_aide = false;
   	// this.bouton_aide = modal_texte_court(numero_de_l_exercice,texte,label_bouton="Aide",icone="info circle")
   	// this.bouton_aide = modal_texte_long(numero_de_l_exercice,titre,texte,label_bouton="Aide",icone="info circle")
   	// this.bouton_aide = modal_youtube(numero_de_l_exercice,id_youtube,texte,label_bouton="Aide - Vidéo",icone="youtube")
   	// this.bouton_aide = modal_pdf(numero_de_l_exercice,url_pdf,texte="Aide",label_bouton="Aide - PDF",icone="file pdf")
   	this.pas_de_version_LaTeX = false ;
   	this.nouvelle_version = function(numero_de_l_exercice){}

}

function feuille_d_axes_gradues() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Tracer des droites graduées";
	this.consigne = "";
	this.nb_questions = 1;
	this.nb_questions_modifiable = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing = 3;
	this.sup=10;
	this.consigne_modifiable = false;
   	this.nb_questions_modifiable = false;
   	this.nb_cols_modifiable = false;
   	this.nb_cols_corr_modifiable = false;
   	this.spacing_modifiable = false;
   	this.spacing_corr_modifiable = false;


	this.nouvelle_version = function(numero_de_l_exercice){
		let pas;
		this.liste_questions=[];
		this.liste_corrections=[];
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées
		pas=parseInt(this.sup);
		for (let i=0, id_unique, texte;i<16;i++) {
			if (sortie_html) {
				id_unique = `${i}_${Date.now()}`;
				this.contenu += `<div id="div_svg${numero_de_l_exercice}${id_unique}" style="width: 90%; height: 200px;  "></div>`
				SVG_reperage_sur_un_axe(`div_svg${numero_de_l_exercice}${id_unique}`,'', 6, 1, pas, [], [],false)
				}
			else { //sortie Latex 
				texte=Latex_reperage_sur_un_axe(2, ' ', 1, pas, [], [],false);
				this.liste_questions.push(texte)
			}
		}
		if (!sortie_html) liste_de_question_to_contenu_sans_numero_et_sans_consigne(this);	
		}
	this.besoin_formulaire_numerique = [`Nombres de parts`,10,""];
}

/**
* Lire l'abscisse entière d'un point
* @Auteur Jean-Claude Lhote et Rémi Angot
*/
function Lire_abscisse_entiere(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Lire l'abscisse entière d'un point (grands nombres)";
	this.consigne = "Lire l'abscisse de chacun des points suivants.";
	this.nb_questions = 3;
	this.nb_questions_modifiable = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing = 1;
    this.spacing_corr = 1;
	this.sup=4;

	this.nouvelle_version = function(numero_de_l_exercice){ // numero_de_l_exercice est 0 pour l'exercice 1
		let type_de_questions;
		this.liste_questions=[];
		this.liste_corrections=[];
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées
		if (this.sup==4) 	type_de_questions=combinaison_listes([1,2,3],this.nb_questions);
		else 				type_de_questions=combinaison_listes([parseInt(this.sup)],this.nb_questions);
		

		this.contenu = html_consigne(this.consigne)
		for (let i = 0,abs0,l1,l2,l3,x1,x2,x3,x11,x22,x33, pas1,pas2, id_unique, texte, texte_corr; i < this.nb_questions;i++) {
			l1=lettre_depuis_chiffre(i*3+1)
			l2=lettre_depuis_chiffre(i*3+2)
			l3=lettre_depuis_chiffre(i*3+3)
			switch (type_de_questions[i]) {
				case 1: // Placer des entiers sur un axe (milliers)
					abs0 = randint(1, 9)*1000;
					pas1 = 0.001;
					pas2 = 10;
					break;

				case 2: // Placer des entiers sur un axe (dizaines de mille)
					abs0 = randint(5, 15) * 10000;
					pas1 = 0.0001;
					pas2 = 10;
					break;

				case 3: // Placer des entiers sur un axe (centaines de mille)
					abs0 = randint(35, 85) * 100000;
					pas1 = 0.00001;
					pas2 = 10;
					break;
			}
			x1 = randint(0, 2); x2 = randint(3, 4); x3 = randint(5, 6);
			x11 = randint(1, 9); x22 = randint(1, 9); x33 = randint(1, 3)
			if (sortie_html) {
				id_unique = `${i}_${Date.now()}`
				this.contenu += `<div id="div_svg${numero_de_l_exercice}${id_unique}" style="width: 90%; height: 200px;  "></div>`
				SVG_reperage_sur_un_axe(`div_svg${numero_de_l_exercice}${id_unique}`, abs0, 6, pas1, pas2, [[l1, x1, x11], [l2, x2, x22], [l3, x3, x33]], [[calcul(abs0 ,0), 0, 0], [calcul(abs0 + 1 / pas1,0), 1, 0]],false)
				this.contenu_correction += `<div id="div_svg_corr${numero_de_l_exercice}${id_unique}" style="width: 90%; height: 200px;  "></div>`
				SVG_reperage_sur_un_axe(`div_svg_corr${numero_de_l_exercice}${id_unique}`, abs0, 6, pas1, pas2, [[l1, x1, x11, true], [l2, x2, x22, true], [l3, x3, x33, true]], [[calcul(abs0 ,0), 0, 0], [calcul(abs0 + 1 / pas1,0), 1, 0]],false)
			}
			else { //sortie Latex 
				texte=Latex_reperage_sur_un_axe(2, abs0, pas1, pas2, [[l1, x1, x11], [l2, x2, x22], [l3, x3, x33]], [[calcul(abs0 ,0), 0, 0], [calcul(abs0 + 1 / pas1,0), 1, 0]],false);
				texte_corr=Latex_reperage_sur_un_axe(2, abs0, pas1, pas2, [[l1, x1, x11,true], [l2, x2, x22,true], [l3, x3, x33,true]], [[calcul(abs0 ,0), 0, 0], [calcul(abs0 + 1 / pas1,0), 1, 0]],false);
				this.liste_questions.push(texte)
				this.liste_corrections.push(texte_corr);
			}
		
		}
		if (!sortie_html) liste_de_question_to_contenu(this); 
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',4,"1 : Milliers\n2 : Dizaines de mille\n3 : Centaines de mille\n4 : Mélange"];
}
/**
* Placer un point d'abscisse entière
* @Auteur Jean-Claude Lhote et Rémi Angot
*/
function Placer_un_point_abscisse_entiere(){
		'use strict';
		Exercice.call(this); // Héritage de la classe Exercice()
		this.titre = "Placer un point d'abscisse entière (grands nombres)";
		this.consigne = " Placer trois points sur un axe gradué.";
		this.nb_questions = 5;
		this.nb_questions_modifiable = true;
		this.nb_cols = 1;
		this.nb_cols_corr = 1;
		this.spacing = 1;
		this.spacing_corr = 1;
		this.sup=1;
		this.type_exercice = 'SVGJS';
	
	
		this.nouvelle_version = function(numero_de_l_exercice){ // numero_de_l_exercice est 0 pour l'exercice 1
			let type_de_questions;
			this.liste_questions=[];
			this.liste_corrections=[];
			this.contenu = ''; // Liste de questions
			this.contenu_correction = ''; // Liste de questions corrigées
			if (this.sup==4) 	type_de_questions=combinaison_listes([1,2,3],this.nb_questions);
			else 				type_de_questions=combinaison_listes([parseInt(this.sup)],this.nb_questions);
			
	
			this.contenu = html_consigne(this.consigne)
			for (let i = 0,abs0,abs1,abs2,abs3,l1,l2,l3,x1,x2,x3,x11,x22,x33, pas1,pas2, id_unique, texte, texte_corr; i < this.nb_questions;i++) {
				l1=lettre_depuis_chiffre(i*3+1)
				l2=lettre_depuis_chiffre(i*3+2)
				l3=lettre_depuis_chiffre(i*3+3)
	
				switch (type_de_questions[i]) {
					case 1: // Placer des entiers sur un axe (milliers)
					abs0 = randint(1, 9)*1000;
					pas1 = 0.001;
					pas2 = 10;
					break;

				case 2: // Placer des entiers sur un axe (dizaines de mille)
					abs0 = randint(5, 15) * 10000;
					pas1 = 0.0001;
					pas2 = 10;
					break;

				case 3: // Placer des entiers sur un axe (centaines de mille)
					abs0 = randint(35, 85) * 100000;
					pas1 = 0.00001;
					pas2 = 10;
					break;
				}
				x1 = randint(0, 2); x2 = randint(3, 4); x3 = randint(5, 6);
				x11 = randint(1, 9); x22 = randint(1, 9); x33 = randint(1, 3);
				abs1 = arrondi(abs0 + x1/pas1 + x11 / pas1/pas2, type_de_questions[i]);  // le type de questions est égal au nombre de décimales.
				abs2 = arrondi(abs0 + x2/pas1 + x22 / pas1/pas2, type_de_questions[i]);
				abs3 = arrondi(abs0 + x3/pas1 + x33 / pas1/pas2, type_de_questions[i]);
	
				texte=`Placer les points : ${l1}(${string_nombre(abs1)}), ${l2}(${string_nombre(abs2)}), ${l3}(${string_nombre(abs3)})<br>`
				if (sortie_html) {
					texte_corr=''
					id_unique = `${i}_${Date.now()}`
					this.contenu += `<div id="div_svg${numero_de_l_exercice}${id_unique}" style="width: 90%; height: 110px;  "></div>`
					this.contenu +=`<h3>Placer les points : ${l1}(${string_nombre(abs1)}), ${l2}(${string_nombre(abs2)}), ${l3}(${string_nombre(abs3)})</h3>`
					SVG_reperage_sur_un_axe(`div_svg${numero_de_l_exercice}${id_unique}`, abs0, 6, pas1, pas2, [], [[calcul(abs0 ,0), 0, 0], [calcul(abs0 + 1 / pas1,0), 1, 0]],false)
					this.contenu_correction += `<div id="div_svg_corr${numero_de_l_exercice}${id_unique}" style="width: 90%; height: 200px;  "></div>`
					SVG_reperage_sur_un_axe(`div_svg_corr${numero_de_l_exercice}${id_unique}`, abs0, 6, pas1, pas2, [[l1, x1, x11, true], [l2, x2, x22, true], [l3, x3, x33, true]], [[calcul(abs0 ,0), 0, 0], [calcul(abs0 + 1 / pas1,0), 1, 0]],false)
				}
				else { //sortie Latex 
					texte+=Latex_reperage_sur_un_axe(2, abs0, pas1, pas2, [], [[calcul(abs0 ,0), 0, 0], [calcul(abs0 + 1 / pas1,0), 1, 0]],false);
					texte_corr=Latex_reperage_sur_un_axe(2, abs0, pas1, pas2, [[l1, x1, x11,true], [l2, x2, x22,true], [l3, x3, x33,true]], [[calcul(abs0 ,0), 0, 0], [calcul(abs0 + 1 / pas1,0), 1, 0]],false);
					texte_corr+=`<br>Les points ${l1}(${string_nombre(abs1)}), ${l2}(${string_nombre(abs2)}), ${l3}(${string_nombre(abs3)}) sont placés ci dessus<br>`;
					this.liste_questions.push(texte)
					this.liste_corrections.push(texte_corr);
				}
	
			}
			if (!sortie_html) liste_de_question_to_contenu(this); 
	
		}
		this.besoin_formulaire_numerique = ['Niveau de difficulté',4,"1 : Ordre de grandeur : milliers\n2 : Ordre de grandeur : dizaines de mille\n3 : centaines de mille\n4 : Mélange"];
	}
	
/**
* Questions statiques issues d'un fichier Markdown 
*
* Les thèmes sont des titres de niveaux 2
*
* suivies d'une liste qui alterne question et réponse 
* @Auteur Rémi Angot
*/
function Questions_de_cours(){
	"use strict";
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Questions de cours";
	this.consigne = "";
	this.nb_questions = 3;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.consigne_modifiable = false;
	this.sup = ''; // thème des questions
	this.sup2 = 'questions_de_cours.txt'; //url des questions
	this.pas_de_version_LaTeX = true ;
	

	this.nouvelle_version = function(numero_de_l_exercice){
		let liste_questions = []; // Liste de questions
		let liste_corrections = []; // Liste de questions corrigées
		let dictionnaire_de_questions = {} ;
		let dictionnaire_de_questions_pret = false;
		let contenu_HTML = '';
		let contenu_correction_HTML = '';
		$.get(this.sup2, function( txt ) {
		// Récupère le fichier txt et transforme en un dictionnaire {'id_theme':[[questions],[réponses]]}
			let tableau_par_theme = txt.match(/##((?=[^#]).|\n)*/g).map(v=>v.trim())
			// Recherche les chaines de caractères commençant par ## et ne comportant pas d'autres #
			for (let i = 0; i < tableau_par_theme.length; i++) {
				let tableau_titre =  tableau_par_theme[i].match(/##.*/g);
				let questions_et_reponses = tableau_par_theme[i].match(/\*((?=[^*#]).|\n)*/g).map(v=>v.trim())
			 	// Recherche les chaines de caractères commençant par * et ne comportant pas d'autres * ou de #
			 	let titre = tableau_titre[0].replace('## ','');
				// Récupère le titre du thème sans ##
			 	let tableau_questions = [];
			 	let tableau_reponses = [];
				for (let i = 0; i < questions_et_reponses.length; i++) {
					if (i%2==0) { //rang pair => questions
						tableau_questions[i/2] = questions_et_reponses[i].replace('* ','')
						// Supprime les * devant chaque questions
					} else { //rang impair => réponses
						tableau_reponses[(i-1)/2] = questions_et_reponses[i].replace('* ','')
					}
			 	dictionnaire_de_questions[titre]=[tableau_questions,tableau_reponses];
				}
			}

			// Je n'utilise pas this.nb_questions ou this.sup car this n'est pas clairement défini dans cette fonction
			if (exercice[numero_de_l_exercice].sup == ''){
				exercice[numero_de_l_exercice].sup = choice(Object.keys(dictionnaire_de_questions)) // Si on n'a pas spécifié un thème, on en prend un au hasard.
			}

			let nb_questions = exercice[numero_de_l_exercice].nb_question;
			if (dictionnaire_de_questions[exercice[numero_de_l_exercice].sup]) {
				// Si le thème existe dans le dictionnaire alors on adapte le nombre de questions
				nb_questions = Math.min (exercice[numero_de_l_exercice].nb_questions,dictionnaire_de_questions[exercice[numero_de_l_exercice].sup][0].length)
			}
			for (let i = 0; i < nb_questions; i++) {
				liste_questions.push(dictionnaire_de_questions[exercice[numero_de_l_exercice].sup][0][i]);
				liste_corrections.push(dictionnaire_de_questions[exercice[numero_de_l_exercice].sup][1][i]); 
			}
			shuffle2tableaux(liste_questions,liste_corrections)
			// Mélange les questions et les réponses (sans perdre les associations)
		 	dictionnaire_de_questions_pret = true;
	
		});

		let id_unique = `${numero_de_l_exercice}_${Date.now()}`	
		if (sortie_html) {
			this.contenu = `<div id=div_exo${id_unique}></div>`
			this.contenu_correction = `<div id=div_corr_exo${id_unique}></div>`
		}

		if (!window.divExist) {window.divExist = []} // Si divExist n'existe pas on le créé
		// divExist est un tableau dans lequel on stocke les listenner sur la création des div
		window.divExist[id_unique] = setInterval(function() {
			if ($(`#div_exo${id_unique}`).length && dictionnaire_de_questions_pret ) {
				// Attends que le div existe et que le dictionnaire de questions soit prêt
				contenu_HTML = html_enumerate(liste_questions,this.spacing);
				contenu_correction_HTML = html_enumerate(liste_corrections,this.spacing);
				$(`#div_exo${id_unique}`).html(contenu_HTML);//Vide le div pour éviter les SVG en doublon
				$(`#div_corr_exo${id_unique}`).html(contenu_correction_HTML);//Vide le div pour éviter les SVG en doublon
				renderMathInElement(document.body, {
		            delimiters: [
					{left: "\\[", right: "\\]", display: true},
					{left: "$", right: "$", display: false}
					],
					"throwOnError":true,"errorColor":"#CC0000","strict":"warn","trust":false
		        });
				clearInterval(divExist[numero_de_l_exercice]);//Arrête le timer
	    	}
		}, 100); // Vérifie toutes les 100ms



	}
	this.besoin_formulaire_texte = ["Thème des questions","De la forme 6M1"];
	this.besoin_formulaire2_texte = ["Liste des questions","URL du fichier texte contenant les questions et réponses."];
}

/**
* Lire l'abscisse décimale d'un point
* @Auteur Jean-Claude Lhote et Rémi Angot
*/
function Lire_abscisse_decimale(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Lire l'abscisse décimale d'un point";
	this.consigne = "Lire l'abscisse de chacun des points suivants.";
	this.nb_questions = 3;
	this.nb_questions_modifiable = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing = 1;
    this.spacing_corr = 1;
	this.sup=1;

	this.nouvelle_version = function(numero_de_l_exercice){ // numero_de_l_exercice est 0 pour l'exercice 1
		let type_de_questions;
		this.liste_questions=[];
		this.liste_corrections=[];
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées
		if (this.sup==4) 	type_de_questions=combinaison_listes([1,2,3],this.nb_questions);
		else 				type_de_questions=combinaison_listes([parseInt(this.sup)],this.nb_questions);
		

		this.contenu = html_consigne(this.consigne)
		for (let i = 0,abs0,l1,l2,l3,x1,x2,x3,x11,x22,x33, pas1,pas2, id_unique, texte, texte_corr; i < this.nb_questions;i++) {
			l1=lettre_depuis_chiffre(i*3+1)
			l2=lettre_depuis_chiffre(i*3+2)
			l3=lettre_depuis_chiffre(i*3+3)
			switch (type_de_questions[i]) {
				case 1: // Placer des décimaux sur un axe (1 décimale)
					abs0 = randint(0, 9);
					pas1 = 1;
					pas2 = 10;
					break;

				case 2: // Placer des décimaux sur un axe (2 décimales)
					abs0 = randint(0, 90) / 10;
					pas1 = 10;
					pas2 = 10;
					break;

				case 3: // Placer des décimaux sur un axe (3 décimales)
					abs0 = randint(0, 990) / 100;
					pas1 = 100;
					pas2 = 10;
					break;
			}
			x1 = randint(0, 2); x2 = randint(3, 4); x3 = randint(5, 6);
			x11 = randint(1, 9); x22 = randint(1, 9); x33 = randint(1, 3)
			if (sortie_html) {
				id_unique = `${i}_${Date.now()}`
				this.contenu += `<div id="div_svg${numero_de_l_exercice}${id_unique}" style="width: 90%; height: 200px;  "></div>`
				SVG_reperage_sur_un_axe(`div_svg${numero_de_l_exercice}${id_unique}`, abs0, 6, pas1, pas2, [[l1, x1, x11], [l2, x2, x22], [l3, x3, x33]], [[calcul(abs0 ,0), 0, 0], [calcul(abs0 + 1 / pas1,0), 1, 0]],false)
				this.contenu_correction += `<div id="div_svg_corr${numero_de_l_exercice}${id_unique}" style="width: 90%; height: 200px;  "></div>`
				SVG_reperage_sur_un_axe(`div_svg_corr${numero_de_l_exercice}${id_unique}`, abs0, 6, pas1, pas2, [[l1, x1, x11, true], [l2, x2, x22, true], [l3, x3, x33, true]], [[calcul(abs0 ,0), 0, 0], [calcul(abs0 + 1 / pas1,0), 1, 0]],false)
			}
			else { //sortie Latex 
				texte=Latex_reperage_sur_un_axe(2, abs0, pas1, pas2, [[l1, x1, x11], [l2, x2, x22], [l3, x3, x33]], [[calcul(abs0 ,0), 0, 0], [calcul(abs0 + 1 / pas1,0), 1, 0]],false);
				texte_corr=Latex_reperage_sur_un_axe(2, abs0, pas1, pas2, [[l1, x1, x11,true], [l2, x2, x22,true], [l3, x3, x33,true]], [[calcul(abs0 ,0), 0, 0], [calcul(abs0 + 1 / pas1,0), 1, 0]],false);
				this.liste_questions.push(texte)
				this.liste_corrections.push(texte_corr);
			}
		
		}
		if (!sortie_html) liste_de_question_to_contenu(this); 
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',4,"1 : Un chiffre après la virgule\n2 : Deux chiffres après la virgule \n3 : Trois chiffres après la virgule\n4 : Mélange"];
}
/**
* Lire l'abscisse fractionnaire d'un point
* @Auteur Jean-Claude Lhote et Rémi Angot
*/
function Lire_abscisse_fractionnaire(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Lire l'abscisse fractionnaire d'un point";
	this.consigne = "Lire l'abscisse de chacun des points suivants.";
	this.nb_questions = 3;
	this.nb_questions_modifiable = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing = 1;
    this.spacing_corr = 1;
	this.sup=1;

	this.nouvelle_version = function(numero_de_l_exercice){ // numero_de_l_exercice est 0 pour l'exercice 1
		let type_de_questions;
		this.liste_questions=[];
		this.liste_corrections=[];
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées
		if (this.sup==4) 	type_de_questions=combinaison_listes([1,2,3],this.nb_questions);
		else 				type_de_questions=combinaison_listes([parseInt(this.sup)],this.nb_questions);
		

		this.contenu = html_consigne(this.consigne)
		for (let i = 0,abs0,l1,l2,l3,x1,x2,x3,x11,x22,x33, pas1,pas2, id_unique, texte, texte_corr; i < this.nb_questions;i++) {
			l1=lettre_depuis_chiffre(i*3+1)
			l2=lettre_depuis_chiffre(i*3+2)
			l3=lettre_depuis_chiffre(i*3+3)
			switch (type_de_questions[i]) {
				case 1: // Placer des demis aux quarts sur un axe 
					abs0 = 0;
					pas1 = 1;
					pas2 = choice([2,3,4]);
					break;

				case 2: // Placer des cinquièmes aux neuvièmes sur un axe
					abs0 = 0;
					pas1 = 1;
					pas2 = randint(5,9);
					break;

				case 3: // Placer des demis aux neuvièmes à partir d'un entier >=1 sur un axe 
					abs0 = randint(1,5);
					pas1 = 1;
					pas2 = randint(2,9);
					break;
			}
			x1 = randint(0, 1); x2 = randint(2, 3); x3 = randint(4, 5);
			x11 = randint(1,pas2-1); x22 = randint(1,pas2-1); x33 = randint(1,pas2-1)
			if (sortie_html) {
				id_unique = `${i}_${Date.now()}`
				this.contenu += `<div id="div_svg${numero_de_l_exercice}${id_unique}" style="width: 90%; height: 200px;  "></div>`
				SVG_reperage_sur_un_axe(`div_svg${numero_de_l_exercice}${id_unique}`, abs0, 6, pas1, pas2, [[l1, x1, x11], [l2, x2, x22], [l3, x3, x33]], [[abs0 + 1 / pas1, 1, 0], [abs0 + 2 / pas1, 2, 0], [abs0 + 3 / pas1, 3, 0], [abs0 + 4 / pas1, 4, 0], [abs0 + 5 / pas1, 5, 0], [abs0 + 6 / pas1, 6, 0]],false)
				this.contenu_correction += `<div id="div_svg_corr${numero_de_l_exercice}${id_unique}" style="width: 90%; height: 200px;  "></div>`
				SVG_reperage_sur_un_axe(`div_svg_corr${numero_de_l_exercice}${id_unique}`, abs0, 6, pas1, pas2, [[l1, x1, x11, true], [l2, x2, x22, true], [l3, x3, x33, true]], [[abs0 + 1 / pas1, 1, 0], [abs0 + 2 / pas1, 2, 0], [abs0 + 3 / pas1, 3, 0], [abs0 + 4 / pas1, 4, 0], [abs0 + 5 / pas1, 5, 0], [abs0 + 6 / pas1, 6, 0]],true)
			}
			else { //sortie Latex 
				texte=Latex_reperage_sur_un_axe(2, abs0, pas1, pas2, [[l1, x1, x11], [l2, x2, x22], [l3, x3, x33]], [[calcul(abs0 ,0), 0, 0], [calcul(abs0 + 1 / pas1,0), 1, 0]],false);
				texte_corr=Latex_reperage_sur_un_axe(2, abs0, pas1, pas2, [[l1, x1, x11,true], [l2, x2, x22,true], [l3, x3, x33,true]], [[calcul(abs0 ,0), 0, 0], [calcul(abs0 + 1 / pas1,0), 1, 0]],true);
				this.liste_questions.push(texte)
				this.liste_corrections.push(texte_corr);
			}
		
		}
		if (!sortie_html) liste_de_question_to_contenu(this); 
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',4,"1 : Demis, tiers ou quarts avec zéro placé\n2 : Des cinquièmes aux neuvièmes avec zéro placé \n3 : Toutes les fractions précédentes mais zéro non visible\n4 : Mélange"];
}

/**
* Placer un point d'abscisse décimale
* @Auteur Jean-Claude Lhote et Rémi Angot
*/
function Placer_points_sur_axe(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Placer un point d'abscisse décimale";
	this.consigne = " Placer trois points sur un axe gradué.";
	this.nb_questions = 5;
	this.nb_questions_modifiable = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing = 1;
    this.spacing_corr = 1;
	this.sup=1;
	this.type_exercice = 'SVGJS';


	this.nouvelle_version = function(numero_de_l_exercice){ // numero_de_l_exercice est 0 pour l'exercice 1
		let type_de_questions;
		this.liste_questions=[];
		this.liste_corrections=[];
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées
		if (this.sup==4) 	type_de_questions=combinaison_listes([1,2,3],this.nb_questions);
		else 				type_de_questions=combinaison_listes([parseInt(this.sup)],this.nb_questions);
		

		this.contenu = html_consigne(this.consigne)
		for (let i = 0,abs0,abs1,abs2,abs3,l1,l2,l3,x1,x2,x3,x11,x22,x33, pas1,pas2, id_unique, texte, texte_corr; i < this.nb_questions;i++) {
			l1=lettre_depuis_chiffre(i*3+1)
			l2=lettre_depuis_chiffre(i*3+2)
			l3=lettre_depuis_chiffre(i*3+3)

			switch (type_de_questions[i]) {
				case 1: // Placer un point sur un axe (1 décimale)
					abs0 = randint(0, 9);
					pas1 = 1;
					pas2 = 10;
					break;

				case 2: // Placer un point sur un axe (2 décimales)
					abs0 = randint(0, 90) / 10;
					pas1 = 10;
					pas2 = 10;
					break;

				case 3: // Placer un point sur un axe (3 décimales)
					abs0 = randint(0, 990) / 100;
					pas1 = 100;
					pas2 = 10;
					break;
			}
			x1 = randint(0, 2); x2 = randint(3, 4); x3 = randint(5, 6);
			x11 = randint(1, 9); x22 = randint(1, 9); x33 = randint(1, 3);
			abs1 = arrondi(abs0 + x1/pas1 + x11 / pas1/pas2, type_de_questions[i]);  // le type de questions est égal au nombre de décimales.
			abs2 = arrondi(abs0 + x2/pas1 + x22 / pas1/pas2, type_de_questions[i]);
			abs3 = arrondi(abs0 + x3/pas1 + x33 / pas1/pas2, type_de_questions[i]);

			texte=`Placer les points : ${l1}(${tex_nombrec(abs1)}), ${l2}(${tex_nombrec(abs2)}), ${l3}(${tex_nombrec(abs3)})<br>`
			if (sortie_html) {
				texte_corr=''
				id_unique = `${i}_${Date.now()}`
				this.contenu += `<div id="div_svg${numero_de_l_exercice}${id_unique}" style="width: 90%; height: 110px;  "></div>`
				this.contenu +=`<h3>Placer les points : ${l1}(${tex_nombrec(abs1)}), ${l2}(${tex_nombrec(abs2)}), ${l3}(${tex_nombrec(abs3)})</h3>`
				SVG_reperage_sur_un_axe(`div_svg${numero_de_l_exercice}${id_unique}`, abs0, 6, pas1, pas2, [], [[calcul(abs0 ,0), 0, 0], [calcul(abs0 + 1 / pas1,0), 1, 0]],false)
				this.contenu_correction += `<div id="div_svg_corr${numero_de_l_exercice}${id_unique}" style="width: 90%; height: 200px;  "></div>`
				SVG_reperage_sur_un_axe(`div_svg_corr${numero_de_l_exercice}${id_unique}`, abs0, 6, pas1, pas2, [[l1, x1, x11, true], [l2, x2, x22, true], [l3, x3, x33, true]], [[calcul(abs0 ,0), 0, 0], [calcul(abs0 + 1 / pas1,0), 1, 0]],false)
			}
			else { //sortie Latex 
				texte+=Latex_reperage_sur_un_axe(2.4, abs0, pas1, pas2, [], [[calcul(abs0 ,0), 0, 0], [calcul(abs0 + 1 / pas1,0), 1, 0]],false);
				texte_corr=Latex_reperage_sur_un_axe(2.4, abs0, pas1, pas2, [[l1, x1, x11,true], [l2, x2, x22,true], [l3, x3, x33,true]],[[calcul(abs0 ,0), 0, 0], [calcul(abs0 + 1 / pas1,0), 1, 0]],false);
				texte_corr+=`<br>Les points ${l1}(${tex_nombrec(abs1)}), ${l2}(${tex_nombrec(abs2)}), ${l3}(${tex_nombrec(abs3)}) sont placés ci dessus<br>`;
				this.liste_questions.push(texte)
				this.liste_corrections.push(texte_corr);
			}

		}
		if (!sortie_html) liste_de_question_to_contenu(this); 

	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',4,"1 : Un chiffre après la virgule\n2 : Deux chiffres après la virgule \n3 : Trois chiffres après la virgule\n4 : Mélange"];
}


/**
* Conversions de durées.
* * 1 : H vers min ou H ou min ou Hmin vers s 
* * 2 : h vers j-h
* * 3 : s vers HMS
* * 4 : h vers semaines j h
* * 5 : toutes les conversions
* @Auteur Rémi Angot
*/
function Conversions_de_durees(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 5 ; 
	this.titre = "Convertir des durées";
	this.consigne = "Compléter les égalités suivantes";
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing = 2;
	this.nb_questions = 5


	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		
		let liste_sous_type_de_questionv1=combinaison_listes([1,2,3,4],this.nb_questions)
		let liste_sous_type_de_questionv2=combinaison_listes([0,1,2],this.nb_questions)
		let type_de_questions=[]
		if (this.sup<5){
			type_de_questions = combinaison_listes([this.sup],this.nb_questions)
		}
		if (this.sup==5){
			type_de_questions = combinaison_listes([1,2,3,4],this.nb_questions)
		}


		for (let i = 0, h, m, s, j, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt<50;) {
			if (type_de_questions[i]==1) {
				let sous_type_de_question = liste_sous_type_de_questionv1[i]
				if (sous_type_de_question==1) {
					h = randint(2,11)
					texte = `$${h}~\\text{h en minute}$`
					texte_corr = `$${h}~\\text{h} = ${h}\\times60~~\\text{min} = ${tex_nombre(h*60)}~\\text{min}$`
				}
				if (sous_type_de_question==2) {
					h = choice([1,2,10,20])
					texte = `$${h}~\\text{h en secondes}$`
					texte_corr = `$${h}~\\text{h} = ${h}\\times3~600~\\text{s} = ${tex_nombre(h*3600)}~\\text{s}$`
				}
				if (sous_type_de_question==3) {
					m = randint(2,59)
					texte = `$${m}~\\text{min en secondes}$`
					texte_corr = `$${m}~\\text{min} = ${m}\\times60~\\text{s} = ${tex_nombre(m*60)}~\\text{s}$`
				} 
				if (sous_type_de_question==4) {
					h = randint(1,2)
					m = randint(2,59)
					texte = `$${h}~\\text{h}~${m}~\\text{min en secondes}$`
					texte_corr = `$${h}~\\text{h}~${m}~\\text{min} = ${h}\\times3~600~\\text{s} + ${m}\\times60~\\text{s} = ${tex_nombre(h*3600)}+${tex_nombre(m*60)}~\\text{s} = ${tex_nombre(h*3600+m*60)}~\\text{s}$`
				}
			}
			if (type_de_questions[i]==2) {
				j = randint(1,6)
				h = randint(1,23)
				texte = `$${tex_nombre(h+24*j)}~\\text{h en jours et heures}$`
				texte_corr = `$${tex_nombre(h+24*j)}~\\text{h} = ${j}\\times24~\\text{h} + ${h}~\\text{h} = ${j}~\\text{j}~${h}~\\text{h}$`
			}

			if (type_de_questions[i]==3) {
				h = liste_sous_type_de_questionv2[i]
				m = randint(1,59)
				s = randint(1,59)
				if (h>0){
					texte = `$${tex_nombre(h*3600+m*60+s)}~\\text{s au format HMS}$`
					texte_corr = `$${tex_nombre(h*3600+m*60+s)}~\\text{s} = ${tex_nombre(h*3600)}~\\text{s}+${m*60+s}~\\text{s} =${h}~\\text{h}+${m}\\times60~\\text{s}+${s}~\\text{s}=${h}~\\text{h}~${m}~\\text{min}~${s}~\\text{s}$`	
				} else {
					texte = `$${tex_nombre(m*60+s)}~\\text{s au format HMS}$`
					texte_corr = `$${tex_nombre(m*60+s)}~\\text{s} = ${m}\\times60~\\text{s}+${s}~\\text{s}=${m}~\\text{min}~${s}~\\text{s}$`
				}
				
			}
			if (type_de_questions[i]==4) {
				s = randint(1,9) // nombre de semaines
				j = randint(1,6)
				h = randint(1,23)
				texte = `$${tex_nombre(h+24*j+24*7*s)}~\\text{h en semaines jours et heures}$`
				if (s>1) { // pour la gestion du pluriel de semaines
					texte_corr = `$${tex_nombre(h+24*j+24*7*s)}~\\text{h} = ${j+7*s}\\times24~\\text{h} + ${h}~\\text{h} = ${j+7*s}~\\text{j}~${h}~\\text{h} = ${s}\\times7~\\text{j} + ${j}~\\text{j}~${h}~\\text{h} = ${s}~\\text{semaines}~${j}~\\text{j}~${h}~\\text{h}$`
				} else {
					texte_corr = `$${tex_nombre(h+24*j+24*7*s)}~\\text{h} = ${j+7*s}\\times24~\\text{h} + ${h}~\\text{h} = ${j+7*s}~\\text{j}~${h}~\\text{h} = ${s}\\times7~\\text{j} + ${j}~\\text{j}~${h}~\\text{h} = ${s}~\\text{semaine}~${j}~\\text{j}~${h}~\\text{h}$`
				}
				
			}
		if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
		}
		cpt++;	
		
		}
		liste_de_question_to_contenu(this);

	}
 	this.besoin_formulaire_numerique = ['Niveau de difficulté',5,"1 : Conversions en s ou min\n2 : Conversions en jours-heures \n3 : Conversions en HMS\n4 : Conversions en semaines-jours-heures \n5 : Tous types de conversions"]
	
}

/**
* Convertir une heure décimale dans le format HMS
*
* La partie décimale est 25, 75 ou un seul chiffre
* @Auteur Rémi Angot
*/
function Heures_decimales(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Utiliser les heures décimales";
	this.consigne = "Compléter les égalités suivantes";
	this.spacing = 2;
	this.nb_questions = 5;
	this.nb_cols_corr = 1;


	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		
		for (let i = 0, partie_entiere, partie_decimale, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt<50;) {
			partie_entiere = randint(1,12)
			partie_decimale = choice([1,2,3,4,5,6,7,8,9,25,75])
			texte = `$${partie_entiere},${partie_decimale}~\\text{h}=\\dotfill$`
			if (partie_decimale==25){
				texte_corr = `$${partie_entiere},${partie_decimale}~\\text{h}=${partie_entiere}~\\text{h}+\\dfrac{1}{4}~\\text{h}`
				texte_corr += `=${partie_entiere}~\\text{h}~15~\\text{min}$`	
			} else if (partie_decimale==75){
				texte_corr = `$${partie_entiere},${partie_decimale}~\\text{h}=${partie_entiere}~\\text{h}+\\dfrac{3}{4}~\\text{h}`
				texte_corr += `=${partie_entiere}~\\text{h}~45~\\text{min}$`	
			} else if (partie_decimale==5){
				texte_corr = `$${partie_entiere},${partie_decimale}~\\text{h}=${partie_entiere}~\\text{h}+\\dfrac{1}{2}~\\text{h}`
				texte_corr += `=${partie_entiere}~\\text{h}~30~\\text{min}$`	
			} else {
				texte_corr = `$${partie_entiere},${partie_decimale}~\\text{h}=${partie_entiere}~\\text{h}+\\dfrac{${partie_decimale}}{10}~\\text{h}`
				texte_corr += `=${partie_entiere}~\\text{h}+${partie_decimale}\\times6~\\text{min}=${partie_entiere}~\\text{h}~${partie_decimale*6}~\\text{min}$`	
			}


		if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				if (est_diaporama) {
					texte = texte.replace('=\\dotfill','')
				}
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
		}
		cpt++;	
		
		}
		liste_de_question_to_contenu(this);

	}
	
}


/**
* Additions de durées de différents : 
* * MS+MS=1hMS sans retenue sur les s
* * MS+MS=1hMS avec retenue
* * HM+HM avec retenue
* * HMS+HMS avec retenue sur les min
* * HMS+HMS avec retenues min et s
* @Auteur Rémi Angot
*/
function Somme_de_durees(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Additionner des durées";
	this.consigne = "Compléter les égalités suivantes";
	this.sup = 1 // 2 niveaux de difficultés
	this.spacing = 2;
	this.nb_questions = 5;
	this.nb_cols_corr = 1;


	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		
		let type_de_questions

		if (this.sup==1) {
			type_de_questions=combinaison_listes([1,3],this.nb_questions)
		} else {
			type_de_questions=combinaison_listes([1,2,3,4,5],this.nb_questions)
		}
		for (let i = 0, h1, h2, m1, m2, s1, s2, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt<50;) {
			
			if (type_de_questions[i]==1) {
				s1 = randint(11,39)
				s2 = randint(1,20)
				m1 = randint(20,59)
				m2 = randint(40,59)
				texte = `$${m1}~\\text{min}~${s1}~\\text{s}+${m2}~\\text{min}~${s2}~\\text{s}=\\dotfill$`
				texte_corr = `$${m1}~\\text{min}~${s1}~\\text{s}+${m2}~\\text{min}~${s2}~\\text{s}= ${m1+m2}~\\text{min}~${s1+s2}~\\text{s}= 1~\\text{h}~${m1+m2-60}~\\text{min}~${s1+s2}~\\text{s}$`
			}	
			if (type_de_questions[i]==2) {
				s1 = randint(21,39)
				s2 = randint(40,59)
				m1 = randint(20,59)
				m2 = randint(40,59)
				texte = `$${m1}~\\text{min}~${s1}~\\text{s}+${m2}~\\text{min}~${s2}~\\text{s}=\\dotfill$`
				texte_corr = `$${m1}~\\text{min}~${s1}~\\text{s}+${m2}~\\text{min}~${s2}~\\text{s}= ${m1+m2}~\\text{min}~${s1+s2}~\\text{s} = ${m1+m2+1}~\\text{min}~${s1+s2-60}~\\text{s} = 1~\\text{h}~${m1+m2-60}~\\text{min}~${s1+s2-60}~\\text{s}$`
			}
			if (type_de_questions[i]==3) {
				h1 = randint(2,12)
				h2 = randint(2,11)
				m1 = randint(30,50)
				m2 = randint(30,50)
				texte = `$${h1}~\\text{h}~${m1}~\\text{min}+${h2}~\\text{h}~${m2}~\\text{min}=\\dotfill$`
				texte_corr = `$${h1}~\\text{h}~${m1}~\\text{min}+${h2}~\\text{h}~${m2}~\\text{min}= ${h1+h2}~\\text{h}~${m1+m2}~\\text{min} = ${h1+h2+1}~\\text{h}~${m1+m2-60}~\\text{min}$`
			}
			if (type_de_questions[i]==4) {
				h1 = randint(2,12)
				h2 = randint(2,11)
				m1 = randint(30,50)
				m2 = randint(30,50)
				s1 = randint(2,55)
				s2 = randint(1,60-s1-1)
				texte = `$${h1}~\\text{h}~${m1}~\\text{min}~${s1}~\\text{s}+${h2}~\\text{h}~${m2}~\\text{min}~${s2}~\\text{s}=\\dotfill$`
				texte_corr = `$${h1}~\\text{h}~${m1}~\\text{min}~${s1}~\\text{s}+${h2}~\\text{h}~${m2}~\\text{min}~${s2}~\\text{s}= ${h1+h2}~\\text{h}~${m1+m2}~\\text{min}~${s1+s2}~\\text{s} = ${h1+h2+1}~\\text{h}~${m1+m2-60}~\\text{min}~${s1+s2}~\\text{s}$`
			}
			if (type_de_questions[i]==5) {
				h1 = randint(2,12)
				h2 = randint(2,11)
				m1 = randint(30,50)
				m2 = randint(30,50)
				s1 = randint(2,55)
				s2 = randint(60-s1,59)
				texte = `$${h1}~\\text{h}~${m1}~\\text{min}~${s1}~\\text{s}+${h2}~\\text{h}~${m2}~\\text{min}~${s2}~\\text{s}=\\dotfill$`
				texte_corr = `$${h1}~\\text{h}~${m1}~\\text{min}~${s1}~\\text{s}+${h2}~\\text{h}~${m2}~\\text{min}~${s2}~\\text{s}=`
				texte_corr +=` ${h1+h2}~\\text{h}~${m1+m2}~\\text{min}~${s1+s2}~\\text{s} = ${h1+h2}~\\text{h}~${m1+m2+1}~\\text{min}~${s1+s2-60}~\\text{s} =${h1+h2+1}~\\text{h}~${m1+m2+1-60}~\\text{min}~${s1+s2-60}~\\text{s}$`
			
			}	
			
		if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				if (est_diaporama) {
					texte = texte.replace('=\\dotfill','')
				}
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
		}
		cpt++;	
		
		}
		liste_de_question_to_contenu(this);

	}
 	this.besoin_formulaire_numerique = ['Niveau de difficulté',2]//"1 : Additions simples\n2 : Additions avec d'éventuelles conversions"]
	
}

/**
* Problèmes où il faut calculer la durée d'un évèbement ou un horaire.
* Paramétrage possible : 
* * 1 : calculs de durées 
* * 2 : calculer l'heure de début
* * 3 : calculer l'heure de fin
* * 4 : mélange des 3 types précédents
* @Auteur Rémi Angot
*/
function Calculs_de_durees_ou_d_horaires(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Calculer des durées ou déterminer un horaire";
	this.consigne = "";
	this.sup = 4
	this.spacing = 2;
	this.nb_questions = 3;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;


	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		
		
		const type_de_contexte = combinaison_listes([1,2,3,4,5],this.nb_questions)
		let type_de_questions // 1 : calcul de durées // 2 : calcul de l'horaire de début // 3 : calcul de l'horaire de fin // 4 : mélange

		if (this.sup<4) { // que des questions de niveau 1 ou que des questions de niveau 2
			type_de_questions = combinaison_listes([this.sup],this.nb_questions)
		} else { // un mélange équilibré de questions
			type_de_questions = combinaison_listes([1,2,3],this.nb_questions)
		}
		
		for (let i = 0, d1, h1, m1, d2, h2, m2, d, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt<50;) {
			//d1 : heure de début (h1 heures m1 min)
			//d2 : heure de fin (h2 heures m2 min)
			//d : durée 
			if (type_de_contexte[i]==1){
				h1 = randint(20,22)
				m1 = randint(35,58)
				d1 = h1*60+m1   	
				h2 = h1 + 2
				m2 = randint (1,m1) // pour s'assurer qu'il y a une retenue dans d2-d1
				d2 = h2*60+m2
				d = d2-d1
				d1 = minToHoraire(d1)
				d2 = minToHoraire(d2)
				d = minToHour(d)
				
				if (type_de_questions[i]==1) {
					texte = `La diffusion d'un film commence à ${d1} et se termine à ${d2}. Combien de temps a duré ce film ?`;
					texte_corr = `${d2} − ${d1} = ${d}`;
					texte_corr += '<br>'
					texte_corr += `Le film dure ${d}.`;
				}
				if (type_de_questions[i]==2) {
					texte = `Un film dure ${d} et commence à ${d1}. À quelle heure se terminera-t-il ?`;
					texte_corr = `${d1} + ${d} = ${d2}`;
					texte_corr += '<br>'
					texte_corr += `Le film terminera à ${d2}.`;
				}
				if (type_de_questions[i]==3) {
					texte = `Un film de ${d} termine à ${d2}. À quelle heure a-t-il commencé ?`;
					texte_corr = `${d2} − ${d} = ${d1}`;
					texte_corr += '<br>'
					texte_corr += `Le film a commencé à ${d1}.`;
				} 

			}

			if (type_de_contexte[i]==2){
				h1 = randint(20,23)
				m1 = randint(35,58)
				d1 = h1*60+m1   	
				h2 = h1 + 1
				m2 = randint (1,m1) // pour s'assurer qu'il y a une retenue dans d2-d1
				d2 = h2*60+m2
				d = d2-d1
				while (d<27 || d>75 || d==60){
					h1 = randint(20,23)
					m1 = randint(35,58)
					d1 = h1*60+m1   	
					h2 = h1 + 2
					m2 = randint (1,m1) // pour s'assurer qu'il y a une retenue dans d2-d1
					d2 = h2*60+m2
					d = d2-d1
				}
				d1 = minToHoraire(d1)
				d2 = minToHoraire(d2)
				d = minToHour(d)
				
				if (type_de_questions[i]==1) {
					texte = `Sur son service de streaming favori, ${prenom()} commence à regarder une série à ${d1} et celle-ci se termine à ${d2}. Combien de temps a duré l'épisode ?`;
					texte_corr = `${d2} − ${d1} = ${d}`;
					texte_corr += '<br>'
					texte_corr += `La série a duré ${d}.`;
				}
				if (type_de_questions[i]==2) {
					texte = `${prenom()} allume son ordinateur à ${d1} pour regarder une série de ${d}. À quelle heure la série s'achèvera-t-elle ?`;
					texte_corr = `${d1} + ${d} = ${d2}`;
					texte_corr += '<br>'
					texte_corr += `La série s'achèvera à ${d2}.`;
				}
				if (type_de_questions[i]==3) {
					texte = `${prenom()} termine de regarder une série de ${d} à ${d2}. À quelle la série a-t-elle commencé ?`;
					texte_corr = `${d2} − ${d} = ${d1}`;
					texte_corr += '<br>'
					texte_corr += `Elle a commencé à ${d1}.`;
				}
			}

			if (type_de_contexte[i]==3){
				h1 = randint(8,21)
				m1 = randint(1,58)
				d1 = h1*60+m1   	
				h2 = h1 + randint(1,2)
				m2 = randint (1,59) // pas forcément de retenue dans d2-d1
				d2 = h2*60+m2
				d = d2-d1
				d1 = minToHoraire(d1)
				d2 = minToHoraire(d2)
				d = minToHour(d)
				
				if (type_de_questions[i]==1) {
					texte = `Une émission télévisée est diffusée de ${d1} à ${d2}. Combien de temps dure-t-elle ?`;
					texte_corr = `${d2} − ${d1} = ${d}`;
					texte_corr += '<br>'
					texte_corr += `L'émission dure ${d}.`;
				}
				if (type_de_questions[i]==2) {
					texte = `Une émission télévisée de ${d} commence à ${d1}. À quelle heure s'achèvera-t-elle ?`;
					texte_corr = `${d1} + ${d} = ${d2}`;
					texte_corr += '<br>'
					texte_corr += `L'émission s'achèvera à ${d2}.`;
				}
				if (type_de_questions[i]==3) {
					texte = `${prenom()} termine de regarder une émission de ${d} à ${d2}. À quelle heure l'émission a-t-elle commencé ?`;
					texte_corr = `${d2} − ${d} = ${d1}`;
					texte_corr += '<br>'
					texte_corr += `L'émission a commencé à ${d1}.`;
				}
			}

			if (type_de_contexte[i]==4){
				h1 = randint(13,16)
				m1 = randint(1,58)
				d1 = h1*60+m1   	
				h2 = h1 + randint(1,2)
				m2 = randint (1,58) // pas forcément de retenue dans d2-d1
				d2 = h2*60+m2
				d = d2-d1
				while (d<27 || d>75 || d==60){
					h1 = randint(13,16)
					m1 = randint(35,58)
					d1 = h1*60+m1   	
					h2 = h1 + randint(1,2)
					m2 = randint (1,m1) // pour s'assurer qu'il y a une retenue dans d2-d1
					d2 = h2*60+m2
					d = d2-d1
				}
				d1 = minToHoraire(d1)
				d2 = minToHoraire(d2)
				d = minToHour(d)
				
				if (type_de_questions[i]==1) {
					texte = `Un papa regarde la compétition de gymnastique de sa fille  de ${d1} à ${d2}. Calculer la durée de cette compétition.`;
					texte_corr = `${d2} − ${d1} = ${d}`;
					texte_corr += '<br>'
					texte_corr += `La compétition dure ${d}.`;
				}
				if (type_de_questions[i]==2) {
					texte = `Une compétition de gymnastique commence à ${d1} et dure ${d}. À quelle heure sera-t-elle terminée ?`;
					texte_corr = `${d1} + ${d} = ${d2}`;
					texte_corr += '<br>'
					texte_corr += `La compétition terminera à ${d2}.`;
				}
				if (type_de_questions[i]==3) {
					texte = `Une compétition de gymnastique qui se termine à ${d2} a duré ${d}. À quelle heure a-t-elle commencé.`;
					texte_corr = `${d2} − ${d} = ${d1}`;
					texte_corr += '<br>'
					texte_corr += `La compétition a commencé à ${d1}.`;
				}
			}

			if (type_de_contexte[i]==5){
				h1 = randint(8,15)
				m1 = randint(25,58)
				d1 = h1*60+m1   	
				h2 = h1 + randint(2,5)
				m2 = randint (1,m1) // pour s'assurer qu'il y a une retenue dans d2-d1
				d2 = h2*60+m2
				d = d2-d1
				while (d<27 || d>75 || d==60){
					h1 = randint(20,23)
					m1 = randint(35,58)
					d1 = h1*60+m1   	
					h2 = h1 + 2
					m2 = randint (1,m1) // pour s'assurer qu'il y a une retenue dans d2-d1
					d2 = h2*60+m2
					d = d2-d1
				}
				d1 = minToHoraire(d1)
				d2 = minToHoraire(d2)
				d = minToHour(d)
				
				if (type_de_questions[i]==1) {
					texte = `Un train part à ${d1} et arrive à destination à ${d2}. Calculer la durée du trajet.`;
					texte_corr = `${d2} − ${d1} = ${d}`;
					texte_corr += '<br>'
					texte_corr += `Le trajet dure ${d}.`;
				}
				if (type_de_questions[i]==2) {
					texte = `${prenomF()} monte dans le train à ${d1} pour un trajet qui doit durer ${d}. À quelle heure arrivera-t-elle ?`;
					texte_corr = `${d1} + ${d} = ${d2}`;
					texte_corr += '<br>'
					texte_corr += `Elle arrivera à ${d2}.`;
				}
				if (type_de_questions[i]==3) {
					texte = `Un train arrive en gare à ${d2} après un trajet de ${d}. À quelle heure le voyage a-t-il commencé ?`;
					texte_corr = `${d2} − ${d} = ${d1}`;
					texte_corr += '<br>'
					texte_corr += `Le voyage a commencé à ${d1}.`;
				}
			}
					

		if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
		}
		cpt++;	
		
		}
		liste_de_question_to_contenu(this);

	}
 	this.besoin_formulaire_numerique = ['Niveau de difficulté',4,"1 : Calcul de durée\n2 : Calcul de l'horaire de fin\n3 : Calcul de l'horaire de début\n4 : 3 types de questions"]
	
}



/**
* Tables de multiplications classiques, à trou ou un mélange des deux.
*
* Par défaut ce sont les tables de 2 à 9 mais on peut choisir les tables que l'on veut
* @Auteur Rémi Angot
*/
function Tables_de_multiplications(tables_par_defaut='2;3;4;5;6;7;8;9'){
//Multiplier deux nombres 
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = tables_par_defaut ;
	this.sup2 = 1 ; // classique|a_trous|melange
	this.titre = "Tables de multiplications";
	this.consigne = 'Calculer';
	this.spacing = 2;


	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		if (!this.sup) { // Si aucune table n'est saisie
			this.sup = '2;3;4;5;6;7;8;9'
		}
		let tables = []
		if (typeof(this.sup)=='number'){ // Si c'est un nombre c'est qu'il y a qu'une seule table
			tables[0] = this.sup
		} else {
			tables = this.sup.split(";");// Sinon on créé un tableau à partir des valeurs séparées par des ;
		}	
		let couples = creer_couples(tables,[2,3,4,5,6,7,8,9,10],this.nb_questions); //Liste tous les couples possibles (2,3)≠(3,2)
		var type_de_questions = 'a_trous';
		for (let i = 0, a, b, texte, texte_corr; i < this.nb_questions; i++) {
			a = couples[i][0];
			b = couples[i][1];
			if (this.sup2==1){
				type_de_questions = 'classique'
			} else if (this.sup2==2){
				type_de_questions = 'a_trous'
			} else {
				type_de_questions = choice(['classique','a_trous'])
			}
			if (type_de_questions=='classique') { // classique
				if (choice([true,false])) {
					texte = `$ ${tex_nombre(a)} \\times ${tex_nombre(b)} = \\dotfill$`;
					texte_corr = `$ ${tex_nombre(a)} \\times ${tex_nombre(b)} = ${tex_nombre(a*b)}$`;
				} else {
					texte = `$ ${tex_nombre(b)} \\times ${tex_nombre(a)} = \\dotfill$`;
					texte_corr = `$ ${tex_nombre(b)} \\times ${tex_nombre(a)} = ${tex_nombre(a*b)}$`;
				}
						
			} else { // a trous
				if (tables.length>2){ // Si pour le premier facteur il y a plus de 2 posibilités on peut le chercher
					texte = choice(['$ '+ a + ' \\times \\ldots\\ldots = ' + a * b + ' $',
						'$ \\ldots\\ldots' + ' \\times ' + b + ' = ' + a * b + ' $']);
				} else{ // Sinon on demande forcément le 2e facteur	
					texte = '$ '+ a + ' \\times \\ldots\\ldots = ' + a * b + ' $'; 
				}
				
				texte_corr = '$ '+ a + ' \\times ' + b + ' = ' + a * b +' $';
			}
			if (est_diaporama) {
					texte = texte.replace('= \\dotfill','')
				}
			this.liste_questions.push(texte);
			this.liste_corrections.push(texte_corr);
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_texte = ['Choix des tables','Nombres séparés par des points-virgules'] // Texte, tooltip
	this.besoin_formulaire2_numerique = ['Style de questions',3,'1 : Classique\n2: À trous\n3: Mélangé'] 
}

/**
* Tables de divisions classiques, à trou ou un mélange des deux.
*
* Par défaut ce sont les tables de 2 à 9 mais on peut choisir les tables que l'on veut
* @Auteur Rémi Angot
*/
function Tables_de_divisions(tables_par_defaut='2;3;4;5;6;7;8;9'){
//Diviser deux nombres 
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = tables_par_defaut ;
	this.sup2 = 1 ; // classique|a_trous|melange
	this.titre = "Tables de divisions";
	this.consigne = 'Calculer';
	this.spacing = 2;


	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		if (!this.sup) { // Si aucune table n'est saisie
			this.sup = '2;3;4;5;6;7;8;9'
		}
		let tables = []
		if (typeof(this.sup)=='number'){ // Si c'est un nombre c'est qu'il y a qu'une seule table
			tables[0] = this.sup
		} else {
			tables = this.sup.split(";");// Sinon on créé un tableau à partir des valeurs séparées par des ;
		}	
		let couples = creer_couples(tables,[2,3,4,5,6,7,8,9,10],this.nb_questions); //Liste tous les couples possibles (2,3)≠(3,2)
		let liste_type_de_questions = combinaison_listes(['classique','a_trous'],this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		var type_de_questions = 'a_trous';
		for (let i = 0, a, b, texte, texte_corr; i < this.nb_questions; i++) {
			a = couples[i][0];
			b = couples[i][1];
			if (this.sup2==1){
				type_de_questions = 'classique'
			} else if (this.sup2==2){
				type_de_questions = 'a_trous'
			} else {
				type_de_questions = liste_type_de_questions[i]
			}
			if (type_de_questions=='classique') { // classique
				texte = '$ '+ a*b + ' \\div ' + a + ' = \\dotfill $';
			} else { // a trous
				if (choice([true,false])) {
					texte = `$ ${a*b} \\div \\ldots\\ldots = ${b}$`;	
				} else {
					texte = `$ \\ldots\\ldots \\div ${a}  = ${b}$`;
				}
			}
			texte_corr = `$ ${a*b} \\div ${a} = ${b}$`;
			if (est_diaporama) {
					texte = texte.replace('= \\dotfill','')
				}
			this.liste_questions.push(texte);
			this.liste_corrections.push(texte_corr);
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_texte = ['Choix des tables','Nombres séparés par des points-virgules'] // Texte, tooltip
	this.besoin_formulaire2_numerique = ['Style de questions',3,'1 : Classique\n2: À trous\n3: Mélangé'] 
}

/**
* Tables de multiplications et de divisions classiques, à trou ou un mélange des deux.
*
* Par défaut ce sont les tables de 2 à 9 mais on peut choisir les tables que l'on veut
* @Auteur Rémi Angot
*/
function Tables_de_multiplications_et_divisions(tables_par_defaut='2;3;4;5;6;7;8;9'){
//Multiplier ou diviser deux nombres 
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = tables_par_defaut ;
	this.sup2 = 1 ; // classique|a_trous|melange
	this.titre = "Tables de multiplications et de divisions";
	this.consigne = 'Calculer';
	this.spacing = 2;


	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		if (!this.sup) { // Si aucune table n'est saisie
			this.sup = '2;3;4;5;6;7;8;9'
		}
		let tables = []
		if (typeof(this.sup)=='number'){ // Si c'est un nombre c'est qu'il y a qu'une seule table
			tables[0] = this.sup
		} else {
			tables = this.sup.split(";");// Sinon on créé un tableau à partir des valeurs séparées par des ;
		}	
		let couples = creer_couples(tables,[2,3,4,5,6,7,8,9,10],this.nb_questions); //Liste tous les couples possibles (2,3)≠(3,2)
		let liste_type_de_questions = combinaison_listes(['classique','a_trous'],this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		let operation = combinaison_listes(['x','div'],this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		let type_de_questions;
		for (let i = 0, a, b, texte, texte_corr; i < this.nb_questions; i++) {
			a = couples[i][0];
			b = couples[i][1];
			if (this.sup2==1){
				type_de_questions = 'classique'
			} else if (this.sup2==2){
				type_de_questions = 'a_trous'
			} else {
				type_de_questions = liste_type_de_questions[i]
			}

			if (operation[i]=='x') {
				if (type_de_questions=='classique') { // classique
					texte = '$ '+ a + ' \\times ' + b + ' = \\dotfill $';
					texte_corr = '$ '+ a + ' \\times ' + b + ' = ' + a * b +' $';	
				} else { // a trous
					if (tables.length>2){ // Si pour le premier facteur il y a plus de 2 posibilités on peut le chercher
						texte = choice(['$ '+ a + ' \\times \\ldots\\ldots = ' + a * b + ' $',
							'$ \\ldots\\ldots' + ' \\times ' + b + ' = ' + a * b + ' $']);
					} else{ // Sinon on demande forcément le 2e facteur	
						texte = '$ '+ a + ' \\times \\ldots\\ldots = ' + a * b + ' $'; 
					}
					
					texte_corr = '$ '+ a + ' \\times ' + b + ' = ' + a * b +' $';
				}
			} else {
				if (type_de_questions=='classique') { // classique
					texte = '$ '+ a*b + ' \\div ' + b + ' = \\dotfill $';
				} else { // a trous
					if (choice([true,false])) {
						texte = `$ ${a*b} \\div \\ldots\\ldots = ${a}$`;	
					} else {
						texte = `$ \\ldots\\ldots \\div ${b}  = ${a}$`;
					}
				}
				texte_corr = `$ ${a*b} \\div ${b} = ${a}$`;
			}
			if (est_diaporama) {
					texte = texte.replace('= \\dotfill','')
				}
			this.liste_questions.push(texte);
			this.liste_corrections.push(texte_corr);
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_texte = ['Choix des tables','Nombres séparés par des points-virgules'] // Texte, tooltip
	this.besoin_formulaire2_numerique = ['Style de questions',3,'1 : Classique\n2: À trous\n3: Mélangé'] 
}

/**
* Mélange équitable d'additions, de soustractions, de multiplications et de divisions 
*
* * Niveau 1 Addition 2 chiffres + 1 chiffre, soustraction 2 chiffres - 1 chiffre, tables de 2 à 5
* * Niveau 2 Addition 2 chiffres + 2 chiffres ne dépassant pas 100, soustraction dont le résultat est entre 11 et 19, tables de 6 à 9
* * Niveau 3 Addition 2 chiffre + 2 chiffres dépassant 100, soustraction dont le résultat est entre 21 et 39, table de 7, 8, 11 ou 12, 
* @Auteur Rémi Angot
*/
function Quatre_operations(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Les quatre opérations";
	this.consigne = "Calculer";
	this.nb_questions = 10;
	this.nb_cols = 2;
	this.nb_cols_corr = 2;
	this.sup = 1; // niveau de difficulté

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = range1(4)
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		for (let i = 0, texte, texte_corr, a, b, cpt=0; i < this.nb_questions && cpt<50; ) {
			
			switch (liste_type_de_questions[i]){
				case 1: // addition
					if (this.sup==1) {
						a = randint(11,89)
						b = randint(2,9)
						}
					if (this.sup==2) {
						a = randint(11,69)
						b = randint(11,29)
						}
					if (this.sup==3) {
						a = randint(11,89)
						b = randint(110-a,110-a+50)
						}
					texte = `$${a}+${b}$`
					texte_corr = `$${a}+${b}=${a+b}$`
					break;
				case 2: // soustraction
					if (this.sup==1) {
						a = randint(11,89)
						b = randint(2,9)
						}
					if (this.sup==2) {
						a = randint(20,89)
						b = randint(a-19,a-11)
						}
					if (this.sup==3) {
						a = randint(40,89)
						b = randint(a-39,a-21)
						}
					texte = `$${a}-${b}$`
					texte_corr = `$${a}-${b}=${a-b}$`
					break;
				case 3: // multiplication
					if (this.sup==1) {
						a = randint(2,5)
						b = randint(2,9)
						}
					if (this.sup==2) {
						a = randint(6,9)
						b = randint(6,9)
						}
					if (this.sup==3) {
						a = choice([7,8,11,12])
						b = randint(2,9)
						}
					texte = `$${a}\\times${b}$`
					texte_corr = `$${a}\\times${b}=${a*b}$`
					break;
				case 4: // division
					if (this.sup==1) {
						a = randint(2,5)
						b = randint(2,9)
						}
					if (this.sup==2) {
						a = randint(6,9)
						b = randint(6,9)
						}
					if (this.sup==3) {
						a = choice([7,8,11,12])
						b = randint(2,9)
						}
					texte = `$${a*b}\\div${a}$`
					texte_corr = `$${a*b}\\div${a}=${b}$`
					break;
			}
			
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}

/**
* Un nombre à 2 chiffres (non multiple de 10) + 9
* @Auteur Rémi Angot
*/
function Ajouter9(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Ajouter 9";
	this.consigne = "Calculer";
	this.nb_questions = 10;
	this.nb_cols = 2;
	this.nb_cols_corr = 2;
	

	this.nouvelle_version = function(numero_de_l_exercice){
		this.bouton_aide = modal_texte_court(numero_de_l_exercice,"Ajouter 9 revient à ajouter 10 et à soustraire 1.")
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		for (let i = 0, texte, texte_corr, a, b, cpt=0; i < this.nb_questions && cpt<50; ) {
			a = randint(0,9)*10+randint(1,9)
			texte = `$${a}+9$`
			texte_corr = `$${a}+9=${a+9}$`
			
			
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	//this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}

/**
* Un nombre à 2 chiffres ne terminant pas par 9 - 9
* @Auteur Rémi Angot
*/
function Soustraire9(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Soustraire 9";
	this.consigne = "Calculer";
	this.nb_questions = 10;
	this.nb_cols = 2;
	this.nb_cols_corr = 2;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		for (let i = 0, texte, texte_corr, a, b, cpt=0; i < this.nb_questions && cpt<50; ) {
			a = randint(1,9)*10+randint(0,8)
			texte = `$${a}-9$`
			texte_corr = `$${a}-9=${a-9}$`
			
			
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	//this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}

/**
* Un nombre à 2 chiffres non multiple de 10 + 11
* @Auteur Rémi Angot
*/
function Ajouter11(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Ajouter 11";
	this.consigne = "Calculer";
	this.nb_questions = 10;
	this.nb_cols = 2;
	this.nb_cols_corr = 2;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		for (let i = 0, texte, texte_corr, a, b, cpt=0; i < this.nb_questions && cpt<50; ) {
			a = randint(0,9)*10+randint(1,9)
			texte = `$${a}+11$`
			texte_corr = `$${a}+11=${a+11}$`
			
			
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	//this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}

/**
* Un nombre à 2 chiffres -11
* @Auteur Rémi Angot
*/
function Soustraire11(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Soustraire 11";
	this.consigne = "Calculer";
	this.nb_questions = 10;
	this.nb_cols = 2;
	this.nb_cols_corr = 2;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées


		let type_de_questions_disponibles = [1,1,1,1,2]
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		for (let i = 0, texte, texte_corr, a, b, cpt=0; i < this.nb_questions && cpt<50; ) {
			if (liste_type_de_questions[i]==1) {
				a = randint(12,99)	
			} else {
				a = randint(2,9)*10
			}
			
			texte = `$${a}-11$`
			texte_corr = `$${a}-11=${a-11}$`
			
			
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	//this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}

/**
* Somme de deux nombres dont les chiffres des unités sont des compléments à 10
* @Auteur Rémi Angot
*/
function Somme_de_deux_nombres_maries(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Somme de deux nombres mariés";
	this.consigne = "Calculer";
	this.nb_questions = 10;
	this.nb_cols = 2;
	this.nb_cols_corr = 2;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		for (let i = 0, texte, texte_corr, a, b, u1, u2, cpt=0; i < this.nb_questions && cpt<50; ) {
			u1 = randint(1,9)
			u2 = 10-u1
			a = randint(1,9)*10+u1
			b = randint(1,9)*10+u2
			
			texte = `$${a}+${b}$`
			texte_corr = `$${a}+${b}=${a+b}$`
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	//this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}

/**
* Somme de 3 nombres dont 2 ont des chiffres des unités compléments à 10
* @Auteur Rémi Angot
*/
function Somme_de_deux_nombres_maries_et_un_entier(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Somme de deux nombres mariés et un entier";
	this.consigne = "Calculer";
	this.nb_questions = 10;
	this.nb_cols = 2;
	this.nb_cols_corr = 2;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = [1,2]
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		for (let i = 0, texte, texte_corr, a, b, c, u1, u2, cpt=0; i < this.nb_questions && cpt<50; ) {
			u1 = randint(1,9)
			u2 = 10-u1
			a = randint(1,4)*10+u1
			b = randint(1,4)*10+u2
			c = randint(1,100-a-b)
			
			switch (liste_type_de_questions[i]){
					case 1: 
						texte = `$${a}+${b}+${c}$`
						texte_corr = `$${a}+${b}+${c}=${a+b+c}$`
						break;
					case 2: 
						texte = `$${a}+${c}+${b}$`
						texte_corr = `$${a}+${c}+${b}=${a+b+c}$`
						break;
			}	
			
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	//this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}

function Le_compte_est_bonV2(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Générateur de \"Le compte est bon\"";
	this.consigne = "Écrire un calcul égal au nombre cible en utilisant les 5 nombres, 4 opérations différentes et éventuellement des parenthèses.";
	this.nb_questions = 5;
	this.nb_cols = 2;
	this.nb_cols_corr = 2;
	this.sup=30;
	this.sup2=70;
	var max_solution=70;
	
	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let eureka;
		let solution=0;
		let min_solution=parseInt(this.sup);
		max_solution=parseInt(this.sup2);
		if (min_solution>max_solution) {
			min_solution=max_solution;
			this.sup=this.sup2;
		}
		let liste_choix=[1,2,2,3,3,4,4,4,4,5,6,6,6,6,7,7,8,8,8,8,9,9,9,9,10,11,12,13,14,15,16,17,18,19,20];
		for (let i = 0, texte, texte_corr, a, b, c, d, e, f,tirage,expression_en_cours,operations_restantes,nombres_restants,op,part1,part2,cpt=0; i < this.nb_questions && cpt<50; ) {
			eureka=false;
			while (eureka==false){
				tirage=[];
				a=parseInt(choice(liste_choix))
				b=parseInt(choice(liste_choix,[13,14,15,16,17,18,19,20,a]))
				c=parseInt(choice(liste_choix,[12,13,14,15,16,17,18,19,20,a,b]))
				d=parseInt(choice(liste_choix,[12,13,14,15,16,17,18,19,20,b,c]))
				e=parseInt(choice(liste_choix,[12,13,14,15,16,17,18,19,20]))
				tirage.push(a,b,c,d,e);
				nombres_restants=shuffle(tirage);
				operations_restantes=['\\times','+','-','\\div'];
				operations_restantes=shuffle(operations_restantes);
				expression_en_cours=[`${nombres_restants[0]}`,`${nombres_restants[1]}`,`${nombres_restants[2]}`,`${nombres_restants[3]}`,`${nombres_restants[4]}`];
				while (nombres_restants.length>1){
					b=nombres_restants.pop();
					a=nombres_restants.pop();
					part2=expression_en_cours.pop();
					part1=expression_en_cours.pop();
					op=operations_restantes.pop();
					if (op=='\\times'){
						c=a*b;
						expression_en_cours.push(`${part1}${op}${part2}`);
						nombres_restants.push(c);
					}
					else if (op=='\\div'){
						if (a%b==0) {
							c=a/b;
							if (part1[0]=='\\'){
								part1=part1.substring(6,part1.length)
								part1=part1.substring(0,part1.length-7)
								}
							if (part2[0]=='\\'){
								part2=part2.substring(6,part2.length)
								part2=part2.substring(0,part2.length-7)
								}
							expression_en_cours.push(`\\dfrac{${part1}}{${part2}}`);
							nombres_restants.push(c);	
						}
						else break;
					}
					else if (op=='-'){
						if (a>b) {
							c=a-b;
							expression_en_cours.push(`\\left(${part1}${op}${part2}\\right)`);
							nombres_restants.push(c);	
						}
						else break;
					}
					else if (op=='+'){
						c=a+b;
						if (part2.substring(0,2)=='\\l'){
							part2=part2.substring(6,part2.length)
							part2=part2.substring(0,part2.length-7)
							}
						expression_en_cours.push(`\\left(${part1}${op}${part2}\\right)`);
						nombres_restants.push(c);
					}
				}

				if (nombres_restants.length==1&&operations_restantes.length==0)	{
					solution=nombres_restants[0];
					if (solution>=min_solution&solution<=max_solution) {
						eureka=true;
						texte=`Le tirage est le suivant : $${tirage[0]}~;~${tirage[1]}~;~${tirage[2]}~;~${tirage[3]}~;~${tirage[4]}$ <br>La cible est : $${solution}$`
						if (expression_en_cours[0][0]=='\\'){
						expression_en_cours[0]=expression_en_cours[0].substring(6,expression_en_cours[0].length)
						expression_en_cours[0]=expression_en_cours[0].substring(0,expression_en_cours[0].length-7)
						}
						texte_corr=`La solution est : $${expression_en_cours[0]}=${solution}$`
						if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
							this.liste_questions.push(texte);
							this.liste_corrections.push(texte_corr);
							i++;
						}		
					}
				}
			}
			cpt++;	
		}
	liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Limite inférieure',max_solution];
	this.besoin_formulaire2_numerique = ['Limite supérieure',100];
}
/*
 function Le_compte_est_bon(){
 	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Générateur de \"Le compte est bon\"";
	this.consigne = "Écrire un calcul égal au nombre cible en utilisant les 5 nombres, 4 opérations différentes et éventuellement des parenthèses.";
	this.nb_questions = 5;
	this.nb_cols = 2;
	this.nb_cols_corr = 2;
	let liste_choix=[1,2,2,3,3,4,4,4,4,5,6,6,6,6,7,7,8,8,8,8,9,9,9,9,10,11,12,13,14,15,16,17,18,19,20];
		let liste_de_j = combinaison_listes(range1(10),this.nb_questions)

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let eureka;
		let liste_choix=[1,2,2,3,3,4,4,4,4,5,6,6,6,6,7,7,8,8,8,8,9,9,9,9,10,11,12,13,14,15,16,17,18,19,20];
		let liste_de_j = combinaison_listes(range1(10),this.nb_questions)
		for (let i = 0, texte, texte_corr, a, b, c, d, e, f,tirage,j,expression , cpt=0; i < this.nb_questions && cpt<50; ) {
			eureka=false;
			
			expression=''
			while (eureka==false){
				tirage=[];
				a=parseInt(choice(liste_choix))
				b=parseInt(choice(liste_choix,[12,13,14,15,16,17,18,19,20,a]))
				c=parseInt(choice(liste_choix,[12,13,14,15,16,17,18,19,20,a,b]))
				d=parseInt(choice(liste_choix,[12,13,14,15,16,17,18,19,20,a,b,c]))
				e=parseInt(choice(liste_choix,[12,13,14,15,16,17,18,19,20]))
				tirage.push(a,b,c,d,e);
				tirage=shuffle(tirage);
				a=tirage[0];
				b=tirage[1];
				c=tirage[2];
				d=tirage[3];
				e=tirage[4];
				// les choses sérieuses commencent ici.
				j = liste_de_j[i];
				switch (j) {
					case 1:
						if ((a+b>c)&&(((a+b-c)*d)%e==0)) {
							f=(a+b-c)*d/e;
							expression=`$(${a}+${b}-${c})\\times${d}\\div${e}$`
							if (f<100&&f>10) eureka=true;
						}
						break;
					case 2:
						if ((c*d%e==0)&&((a+b>c*d/e))) {
							f=a+b-c*d/e;
							expression=`$${a}+${b}-${c}\\times${d}\\div${e}$`
							if (f<100&&f>10) eureka=true;
						}
						break;
					case 3:
						if ((a+b>c*d)&&((a+b-c*d)%e==0)){
							f=(a+b-c*d)/e;
							expression=`$(${a}+${b}-${c}\\times${d})\\div${e}$`
							if (f<100&&f>10) eureka=true;
						}
						break;
					case 4:
						if ((b>c)&&(a%e==0)){
							f=a/e+(b-c)*d;
							expression=`$${a}\\div${e}+(${b}-${c})\\times${d}$`
							if (f<100&&f>10) eureka=true;
						}
						break;
					case 5:
						if ((b>c)&&(a%(b-c)==0)){
							f=a/(b-c)*d+e;
							expression=`$${a}\\div(${b}-${c})\\times${d}+${e}$`
							if (f<100&&f>10) eureka=true;
						}
						break;	
					case 6:
						if (((a+b)/c>d*e)&&((a+b)%c==0)){
							f=(a+b)/c-d*e;
							expression=`$(${a}+${b})\\div${c}-${d}\\times${e}$`
							if (f<100&&f>10) eureka=true;
						}
						break;					
					case 7:
						if (((a + b / c)*d > e) && (b % c == 0)) {
							f = (a + b/c) * d - e;
							expression = `$(${a}+${b}\\div${c})\\times${d}-${e}$`
							if (f<100&&f>10) eureka = true;
						}
						break;	
					case 8:
						if ((a > b/c) && (b % c == 0)) {
							f = (a-b/c+d) * e;
							expression = `$(${a}-${b}\\div${c}+${d})\\times${e}$`
							if (f<100&&f>10) eureka = true;
						}
						break;	
						case 9:
							if (((a / b + c)*e > d) && (a % b == 0)) {
								f = (a/b+c)*e-d;
								expression = `$(${a}\\div${b}+${c})\\times${e}-${d}$`
								if (f<100&&f>10) eureka = true;
							}
							break;	
						case 10:
							if ((a > b) && ((a-b) % c == 0)) {
								f = ((a-b)/c+d)*e;
								expression = `$((${a}-${b})\\div${c}+${d})\\times${e}$`
								if (f<100&&f>10) eureka = true;
							}
							break;
				}
			}
		
		
			texte=`Le tirage est le suivant : $${a}~;~${b}~;~${c}~;~${d}~;~${e}$ <br>\n La cible est : $${f}$`
			texte_corr=`La solution est : ${expression}$=${f}$`
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
		cpt++;	
	}
	liste_de_question_to_contenu(this);
	}
	//this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}
*/


/**
* Le nombre de dizaines, centaines et milliers étant donné, il faut écrire le nombre.
*
* 2 fois sur 5 il y a chevauchement entre les classes
* @Auteur Rémi Angot
*/
function Exercice_numeration_entier(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Écrire un nombre à partir de son nombre de dizaines, de centaines, de milliers...";
	this.consigne = "Écrire en chiffres chacun des nombres.";
	this.nb_questions = 5;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = [1,2] // sans chevauchement ou avec chevauchement
		let liste_type_de_questions = combinaison_listes([1,1,1,2,2],this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		for (let i = 0, texte, texte_corr, a, b, rang_a, rang_b, cpt=0; i < this.nb_questions && cpt<50; ) {
			a = randint(2,8)*10+randint(1,5)
			b = randint(2,8)*10+randint(1,5)
			let rangs = ['unités','dizaines','centaines','milliers','dizaines de mille','centaines de mille','millions']
			rang_a = randint(0,2)
			if (liste_type_de_questions[i]==1){
				rang_b = randint(rang_a+2,6)
			} else {
				rang_b = rang_a+1}
			
			texte = `$\\text{${b}  ${rangs[rang_b]} et ${a} ${rangs[rang_a]}}$`
			texte_corr = `$${b} \\text{ ${rangs[rang_b]} et }${a} \\text{ ${rangs[rang_a]} : } ${tex_nombre(b*Math.pow(10,rang_b)+a*Math.pow(10,rang_a))}$`
				
			
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	//this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}

/**
* Des questions sur le nombre ou le chiffre de centaines, de dizaines, de dixièmes, de centièmes...
* @Auteur Rémi Angot
*/
function Decomposition_nombre_decimal(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Décomposer un nombre décimal (nombre de..., chiffre de...)";
	this.consigne = "Compléter les phrases suivantes.";
	this.nb_questions = 5;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = [1,2,choice([3,4,5]),choice([6,7,8]),choice([9,10]),choice([11,12])] // sans chevauchement ou avec chevauchement
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		let m = randint(1,9); // le nombre sera le même pour tout l'exercice
		let c = randint(0,9,[m]);
		let d = randint(0,9,[m,c]);
		let u = randint(0,9,[m,c,d]);
		let di = randint(0,9,[m,c,d,u]);
		let ci = randint(0,9,[m,c,d,u,di]);
		let mi = randint(1,9,[m,c,d,u,di,ci]);
		let n = m.toString()+''+c.toString()+d.toString()+u.toString()+','+di.toString()+ci.toString()+mi;
		//calcul ne semble pas marcher avec 7 chiffres significatifs
		this.consigne = `On considère le nombre $${n}$. Compléter les phrases suivantes.`
		for (let i = 0, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) {
			
			switch (liste_type_de_questions[i]){
				case 1 : 
					texte = "La partie entière de ce nombre est : "
					texte_corr = texte + `$${tex_nombrec(m*1000+c*100+d*10+u)}$`
				break
				case 2 : 
					texte = "La partie décimale de ce nombre est : "
					texte_corr = texte + `$${tex_nombrec(di/10+ci/100+mi/1000)}$`
				break
				case 3 : 
					texte = "Le chiffre des dizaines de ce nombre est : "
					texte_corr = texte + `$${d}$`
				break
				case 4 : 
					texte = "Le chiffre des centaines de ce nombre est : "
					texte_corr = texte + `$${c}$`
				break
				case 5 : 
					texte = "Le chiffre des miliers de ce nombre est : "
					texte_corr = texte + `$${m}$`
				break
				case 6 : 
					texte = "Le chiffre des dixièmes de ce nombre est : "
					texte_corr = texte + `$${di}$`
				break
				case 7 : 
					texte = "Le chiffre des centièmes de ce nombre est : "
					texte_corr = texte + `$${ci}$`
				break
				case 8 : 
					texte = "Le chiffre des millièmes de ce nombre est : "
					texte_corr = texte + `$${mi}$`
				break
				case 9 : 
					texte = "Le nombre de dizaines de ce nombre est : "
					texte_corr = texte + `$${tex_nombrec(d+c*10+m*100)}$`
				break
				case 10 : 
					texte = "Le nombre de centaines de ce nombre est : "
					texte_corr = texte + `$${tex_nombrec(c+m*10)}$`
				break
				case 11 : 
					texte = "Le nombre de dixièmes de ce nombre est : "
					texte_corr = texte + `$${tex_nombrec(di+u*10+d*100+c*1000+m*10000)}$`
				break
				case 12 : 
					texte = "Le nombre de centièmes de ce nombre est : "
					texte_corr = texte + `$${tex_nombrec(ci+di*10+u*100+d*1000+c*10000+m*100000)}$`
				break
			}

			texte_corr += "."
			texte += "\\ldots"
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	//this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}

/**
* 100-...= 
* @Auteur Rémi Angot
*/
function Complement_a_100(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Complément à 100";
	this.consigne = "Calculer";
	this.nb_questions = 10;
	this.nb_cols = 2;
	this.nb_cols_corr = 2;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		for (let i = 0, texte, texte_corr, a, b, cpt=0; i < this.nb_questions && cpt<50; ) {
			a = randint(11,89)
			texte = `$100-${a}$`
			texte_corr = `$100-${a}=${100-a}$`
			
			
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	//this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}

/**
* Une soustraction dont le premier terme est un multiple de 10
* @Auteur Rémi Angot
*/
function Complement_a_une_dizaine(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Complément à une dizaine";
	this.consigne = "Calculer";
	this.nb_questions = 10;
	this.nb_cols = 2;
	this.nb_cols_corr = 2;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		for (let i = 0, texte, texte_corr, a, b, cpt=0; i < this.nb_questions && cpt<50; ) {
			a = randint(2,9)*10
			b = randint(2,a-11)
			texte = `$${a}-${b}$`
			texte_corr = `$${a}-${b}=${a-b}$`
			
			
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	//this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}

/**
* Division d'un entier par 10, 100, 1000
* @Auteur Rémi Angot
*/
function Diviser_par_10_100_1000(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Diviser un entier par 10, 100 ou 1000";
	this.consigne = "Calculer";
	this.nb_questions = 10;
	this.nb_cols = 2;
	this.nb_cols_corr = 2;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		for (let i = 0, texte, texte_corr, a, b, cpt=0; i < this.nb_questions && cpt<50; ) {
			a = choice([randint(1,9),randint(11,99),randint(101,999)])
			b = choice([10,100,1000])
			texte = `$${tex_nombre(a)}\\div${tex_nombre(b)}$`
			texte_corr = `$${tex_nombre(a)}\\div${tex_nombre(b)}=${tex_nombrec(a/b)}$`
			
			
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
}

/**
* Un entier à un 1 ou 2 chiffres, un nombre décimal avec une partie décimale à un ou 2 chiffres à diviser par 10, 100 ou 1000 
* @Auteur Rémi Angot
*/
function Diviser_decimal_par_10_100_1000(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Diviser un nombre décimal par 10, 100 ou 1000";
	this.consigne = "Calculer";
	this.nb_questions = 10;
	this.nb_cols = 2;
	this.nb_cols_corr = 2;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		for (let i = 0, texte, texte_corr, a, b, cpt=0; i < this.nb_questions && cpt<50; ) {
			a = choice([randint(1,9),randint(11,99),calcul(randint(11,99)/10),calcul(randint(101,999)/100),calcul(randint(1,9)/10)])
			b = choice([10,100,1000])
			texte = `$${tex_nombre(a)}\\div${tex_nombre(b)}$`
			texte_corr = `$${tex_nombre(a)}\\div${tex_nombre(b)}=${tex_nombrec(a/b)}$`
			
			
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	//this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}

/**
* Calculer la moitié d'un nombre pair, d'un impair inférieur à 20, d'un multiple de 200, d'un nombre de la forme a00 avec a impair, d'un nombre de la forme
*  a,b avec a et b pairs ou 1xx avec xx un nombre pair 
* @Auteur Rémi Angot
*/
function Moitie(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Moitié";
	this.consigne = "Calculer";
	this.nb_questions = 10;
	this.nb_cols = 2;
	this.nb_cols_corr = 2;
	this.sup = 1; // niveau de difficulté

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = range1(6)
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		for (let i = 0, texte, texte_corr, a, b, cpt=0; i < this.nb_questions && cpt<50; ) {
			
			switch (liste_type_de_questions[i]){
				case 1: // Table de 2
					a = randint(2,9)
					texte = `$\\text{La moitié de }${a*2}$`
					texte_corr = `$\\text{La moitié de }${a*2} \\text{ est } ${a}$`
					break;
				case 2: // Impair inférieur à 20
					a = randint(2,9)
					texte = `$\\text{La moitié de }${a*2+1}$`
					texte_corr = `$\\text{La moitié de }${a*2+1} \\text{ est } ${tex_nombrec(a+5/10)}$`
					break;
				case 3: // Table de 200
					a = randint(2,9)
					texte = `$\\text{La moitié de }${tex_nombre(a*2*100)}$`
					texte_corr = `$\\text{La moitié de }${tex_nombre(a*2*100)} \\text{ est } ${tex_nombre(a*100)}$`
					break;
				case 4: // a00 avec a impair
					a = randint(2,9)
					texte = `$\\text{La moitié de }${tex_nombre((a*2+1)*100)}$`
					texte_corr = `$\\text{La moitié de }${tex_nombre((a*2+1)*100)} \\text{ est } ${tex_nombre(a*100+50)}$`
					break;
				case 5: // a,b avec a et b pairs
					a = randint(2,9)
					b = randint(2,9)
					texte = `$\\text{La moitié de }${tex_nombrec(a*2+b*2/100)}$`
					texte_corr = `$\\text{La moitié de }${tex_nombrec(a*2+b*2/100)} \\text{ est } ${tex_nombrec(a+b/100)}$`
					break;
				case 6: // 1xx avec xx un nombre pair
					a = randint(2,9)
					texte = `$\\text{La moitié de }${100+a*2}$`
					texte_corr = `$\\text{La moitié de }${100+a*2} \\text{ est } ${50+a}$`
					break;
			}
			
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	//this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}


/**
* Calculer le tiers d'un multiple de 3, d'un multiple de 300, d'un multiple de 30 ou d'un nombre a,b avec a et b multiples de 3
* @Auteur Rémi Angot
*/
function Tiers(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Tiers";
	this.consigne = "Calculer";
	this.nb_questions = 10;
	this.nb_cols = 2;
	this.nb_cols_corr = 2;
	this.sup = 1; // niveau de difficulté

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = range1(4)
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		for (let i = 0, texte, texte_corr, a, b, cpt=0; i < this.nb_questions && cpt<50; ) {
			
			switch (liste_type_de_questions[i]){
				case 1: // Table de 3
					a = randint(2,9)
					texte = `$\\text{Le tiers de }${a*3}$`
					texte_corr = `$\\text{Le tiers de }${a*3} \\text{ est } ${a}$`
					break;
				case 2: // Table de 300
					a = randint(2,9)
					texte = `$\\text{Le tiers de }${tex_nombre(a*3*100)}$`
					texte_corr = `$\\text{Le tiers de }${tex_nombre(a*3*100)} \\text{ est } ${tex_nombre(a*100)}$`
					break;
				case 3: // Table de 30
					a = randint(2,9)
					texte = `$\\text{Le tiers de }${tex_nombre(a*3*10)}$`
					texte_corr = `$\\text{Le tiers de }${tex_nombre(a*3*10)} \\text{ est } ${tex_nombre(a*10)}$`
					break;
				case 4: // a,b avec a et b divisibles par 3
					a = randint(2,9)
					b = randint(2,9)
					texte = `$\\text{Le tiers de }${tex_nombrec(a*3+b*3/100)}$`
					texte_corr = `$\\text{Le tiers de }${tex_nombrec(a*3+b*3/100)} \\text{ est } ${tex_nombrec(a+b/100)}$`
					break;
			}
			
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	//this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}


/**
* Calculer le quart d'un multiple de 4, d'un impair, d'un multiple de 400, d'un multiple de 40, d'un nombre a,b avec a et b multiples de 4
* @Auteur Rémi Angot
*/
function Quart(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Quart";
	this.consigne = "Calculer";
	this.nb_questions = 10;
	this.nb_cols = 2;
	this.nb_cols_corr = 2;
	this.sup = 1; // niveau de difficulté

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = range1(5)
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		for (let i = 0, texte, texte_corr, a, b, cpt=0; i < this.nb_questions && cpt<50; ) {
			
			switch (liste_type_de_questions[i]){
				case 1: // Table de 4
					a = randint(2,9)
					texte = `$\\text{Le quart de }${a*4}$`
					texte_corr = `$\\text{Le quart de }${a*4} \\text{ est } ${a}$`
					break;
				case 2: // Impair
					a = randint(2,9)
					b = choice([1,2,3])
					texte = `$\\text{Le quart de }${a*4+b}$`
					texte_corr = `$\\text{Le quart de }${a*4+b} \\text{ est } ${tex_nombrec(a+b/4)}$`
					break;
				case 3: // Table de 400
					a = randint(2,9)
					texte = `$\\text{Le quart de }${tex_nombre(a*4*100)}$`
					texte_corr = `$\\text{Le quart de }${tex_nombre(a*4*100)} \\text{ est } ${tex_nombre(a*100)}$`
					break;
				case 4: // Table de 40
					a = randint(2,9)
					texte = `$\\text{Le quart de }${tex_nombre(a*4*10)}$`
					texte_corr = `$\\text{Le quart de }${tex_nombre(a*4*10)} \\text{ est } ${tex_nombre(a*10)}$`
					break;
				case 5: // a,b avec a et b divisibles par 4
					a = randint(2,9)
					b = randint(2,9)
					texte = `$\\text{Le quart de }${tex_nombrec(a*4+b*4/100)}$`
					texte_corr = `$\\text{Le quart de }${tex_nombrec(a*4+b*4/100)} \\text{ est } ${tex_nombrec(a+b/100)}$`
					break;
			}
			
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	//this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}


/**
* Calculer le double ou le triple d'un nombre, calculer la moitié d'un nombre pair ou le tiers d'un multiple de 3
* @Auteur Rémi Angot
*/
function Double_moitie_tiers_triple(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Double, moitié, tiers, triple";
	this.consigne = "Calculer";
	this.nb_questions = 10;
	this.nb_cols = 2;
	this.nb_cols_corr = 2;
	this.sup = 1; // niveau de difficulté

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = range1(4)
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		for (let i = 0, texte, texte_corr, a, b, cpt=0; i < this.nb_questions && cpt<50; ) {
			
			switch (liste_type_de_questions[i]){
				case 1: // Double
					a = randint(2,9)
					texte = `$\\text{Le double de }${a}$`
					texte_corr = `$\\text{Le double de }${a} \\text{ est } ${a*2}$`
					break;
				case 2: // Moitié
					a = randint(2,9)*2
					texte = `$\\text{La moitié de }${a*2}$`
					texte_corr = `$\\text{La moitié de }${a*2} \\text{ est } ${a}$`
					break;
				case 3: // Triple
					a = randint(2,9)
					texte = `$\\text{Le triple de }${a}$`
					texte_corr = `$\\text{Le triple de }${a} \\text{ est } ${a*3}$`
					break;
				case 4: // Tiers
					a = randint(2,9)
					texte = `$\\text{Le tiers de }${a*3}$`
					texte_corr = `$\\text{Le tiers de }${a*3} \\text{ est } ${a}$`
					break;
			}
			
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	//this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}



/**
* Les 2 facteurs peuvent terminer par aucun, 1, 2 ou 3 zéros
* @Auteur Rémi Angot
*/
function Exercice_tables_de_multiplications_et_multiples_de_10(tables_par_defaut='2;3;4;5;6;7;8;9'){
//Multiplier deux nombres 
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = tables_par_defaut ;
	this.titre = "Tables de multiplications et multiples de 10";
	this.consigne = 'Calculer';
	this.spacing = 2;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		if (!this.sup) { // Si aucune table n'est saisie
			this.sup = '2;3;4;5;6;7;8;9'
		}
		let tables = []
		if (typeof(this.sup)=='number'){ // Si c'est un nombre c'est qu'il y a qu'une seule table
			tables[0] = this.sup
		} else {
			tables = this.sup.split(";");// Sinon on créé un tableau à partir des valeurs séparées par des ;
		}
		let couples = creer_couples(tables,[2,3,4,5,6,7,8,9,10],this.nb_questions); //Liste tous les couples possibles (2,3)≠(3,2)
		for (let i = 0, a, b, k1, k2, texte, texte_corr,melange; i < this.nb_questions; i++) {
			a = couples[i][0];
			b = couples[i][1];
			if (a>1) {
				k1 = choice([1,10,100,1000]);	
			} else{
				k1 = choice([10,100,1000]);
			}
			k2 = choice([1,10,100,1000]);
			a = k1*a;
			b = k2*b;
			melange = randint(0,1);
			if (melange==1) { // échange a et b pour que les multiplications ne soient pas toujours dans le même ordre (surtout lorsque tables n'a qu'un seul élément)
				let c = a;
				a = b;
				b = c;
			}
			
			texte = '$ '+ tex_nombre(a) + ' \\times ' + tex_nombre(b) + ' = \\dotfill $';
			texte_corr = '$ '+ tex_nombre(a) + ' \\times ' + tex_nombre(b) + ' = ' + tex_nombre(a * b) +' $';
			this.liste_questions.push(texte);
			this.liste_corrections.push(texte_corr);
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_texte = ['Choix des tables','Nombres séparés par des points-virgules'] // Texte, tooltip
}

/**
* Multiplier deux nombres décimaux
* @Auteur Rémi Angot
*/
function Exercice_tables_de_multiplications_et_decimaux(tables_par_defaut='2;3;4;5;6;7;8;9'){
//Multiplier deux nombres 
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = tables_par_defaut ;
	this.titre = "Tables de multiplications et nombres décimaux";
	this.consigne = 'Calculer';
	this.spacing = 2;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		if (!this.sup) { // Si aucune table n'est saisie
			this.sup = '2;3;4;5;6;7;8;9'
		}
		let tables = []
		if (typeof(this.sup)=='number'){ // Si c'est un nombre c'est qu'il y a qu'une seule table
			tables[0] = this.sup
		} else {
			tables = this.sup.split(";");// Sinon on créé un tableau à partir des valeurs séparées par des ;
		}
		let couples = creer_couples(tables,[2,3,4,5,6,7,8,9,10],this.nb_questions); //Liste tous les couples possibles (2,3)≠(3,2)
		for (let i = 0, a, b, k1, k2, couple, texte, texte_corr; i < this.nb_questions; i++) {
			a = couples[i][0];
			b = couples[i][1];
			couple = choice([[1,10],[1,100],[1,1000],[10,100],[10,1000],[100,100],[100,1000]]);
			k1 = couple[0];
			k2 = couple[1];
			a = Algebrite.eval(a/k1);
			b = Algebrite.eval(b/k2);
			if (a==1) {
				a=0.01
			}
			if (b==1) {
				b=0.1
			}
			texte = '$ '+ tex_nombre(a) + ' \\times ' + tex_nombre(b) + ' = \\dotfill $';
			texte_corr = '$ '+ tex_nombre(a) + ' \\times ' + tex_nombre(b) + ' = ' + tex_nombre(Algebrite.eval(a*b)) +' $';
			this.liste_questions.push(texte);
			this.liste_corrections.push(texte_corr);
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_texte = ['Choix des tables','Nombres séparés par des points-virgules'] // Texte, tooltip
}

/**
* Additionner deux entiers
* @Auteur Rémi Angot
*/
function Exercice_tables_d_additions(max=20){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Addition de deux entiers"
	this.consigne = 'Calculer'
	this.sup = max ; // Le paramètre accessible à l'utilisateur sera la valeur maximale
	this.spacing = 2;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		for (let i = 0, a, b, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt<50;){
			a = randint(2,this.sup);
			b = randint(2,this.sup);
			texte = '$ '+ tex_nombre(a) + ' + ' + tex_nombre(b) + ' = \\dotfill $';
			texte_corr = '$ '+ tex_nombre(a) + ' + ' + tex_nombre(b) + ' = ' + tex_nombre(a + b) +' $';
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Valeur maximale',99999];	
}





/**
* Simplifier une fraction, le facteur commun est inférieur à une valeur donnée en paramètre qui est 11 par défaut 
* @Auteur Rémi Angot
*/
function Exercice_fractions_simplifier(max=11){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = max ; // Correspond au facteur commun
	this.titre = "Simplification de fractions"
	this.consigne = 'Simplifier les fractions suivantes.'
	this.spacing = 2;
	this.spacing_corr = 2;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		liste_fractions = [[1,2],[1,3],[2,3],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],
		[1,6],[5,6],[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[1,8],[3,8],[5,8],[7,8],
		[1,9],[2,9],[4,9],[5,9],[7,9],[8,9],[1,10],[3,10],[7,10],[9,10]] // Couples de nombres premiers entre eux
		for (let i = 0, fraction, a, b, texte, texte_corr, cpt=0; i < this.nb_questions;i++) {
			fraction = choice(liste_fractions); //
			a = fraction[0];
			b = fraction[1];
			k = randint(2,this.sup)
			enleve_element(liste_fractions,fraction); // Il n'y aura pas 2 fois la même réponse
			texte = '$ '+ tex_fraction(k*a,k*b) + ' = '+ tex_fraction('\\phantom{00000000000000}','') +' = '+tex_fraction('\\phantom{0000}','')+' $';
			texte_corr = '$ '+ tex_fraction(k*a,k*b) + ' = '+ tex_fraction(k+' \\times '+a,k+' \\times '+b) +' = '+tex_fraction(a,b)+' $';
			this.liste_questions.push(texte);
			this.liste_corrections.push(texte_corr);
			}
		liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
	}
	this.besoin_formulaire_numerique = ['Valeur maximale du facteur commun',99999];		
}

/**
* Écrire une fraction avec un nouveau dénominateur qui est un multiple de son dénominateur (ce multiple est inférieur à une valeur maximale de 11 par défaut)
* @Auteur Rémi Angot
*/
function Egalites_entre_fractions(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 11 ; // Correspond au facteur commun
	this.titre = "Égalités entre fractions simples"
	this.consigne = 'Compléter les égalités.'
	this.spacing = 2;
	this.spacing_corr = 2;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		liste_fractions = [[1,2],[1,3],[2,3],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],
		[1,6],[5,6],[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[1,8],[3,8],[5,8],[7,8],
		[1,9],[2,9],[4,9],[5,9],[7,9],[8,9],[1,10],[3,10],[7,10],[9,10]] // Couples de nombres premiers entre eux
		let liste_type_de_questions = combinaison_listes([1,1,1,1,2],this.nb_questions)
		for (let i = 0, fraction, a, b, c, d, k, texte, texte_corr, cpt=0; i < this.nb_questions;i++) {
			if (liste_type_de_questions[i]==1) { // égalité entre 2 fractions
				fraction = choice(liste_fractions); //
				a = fraction[0];
				b = fraction[1];
				k = randint(2,this.sup);
				c = k*a;
				d = k*b;
				enleve_element(liste_fractions,fraction); // Il n'y aura pas 2 fois la même fraction de départ
				texte = `$${tex_fraction(a,b)} = ${tex_fraction("\\phantom{00000000000000}","\\phantom{00000000000000}")} = ${tex_fraction("\\phantom{0000}",d)}$`;
				texte_corr = `$${tex_fraction(a,b)} = ${tex_fraction(a+mise_en_evidence("\\times"+k),b+mise_en_evidence("\\times"+k))} = ${tex_fraction(c,d)}$`;
			
			} else { //écrire un entier sous la forme d'une fraction
				a = randint(1,9);
				d = randint(2,9);
				c = a*d;
				texte = `$${a} = ${tex_fraction("\\phantom{00000000000000}","\\phantom{00000000000000}")} = ${tex_fraction("\\phantom{0000}",d)}$`;
				texte_corr = `$${a} = \\dfrac{${a}}{1} =${tex_fraction(a+mise_en_evidence("\\times"+d),"1"+mise_en_evidence("\\times"+d))} = ${tex_fraction(c,d)}$`;
			}

			this.liste_questions.push(texte);
			this.liste_corrections.push(texte_corr);
			}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Valeur maximale du facteur commun',99];		
}


/**
* Un nombre est-il divisible par : 
*
* * 2, 5, 10 ?
* * 3, 9 ?
* * 2, 3, 5, 9, 10 ? 
* * 2, 3, 5, 9, 10  et un autre nombre qui peut être 7, 13, 17, ou 19 ?
* @Auteur Rémi Angot
*/
function Criteres_de_divisibilite(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 4 ; // Correspond au facteur commun
	this.titre = "Critères de divisibilité"
	this.consigne = 'Répondre aux questions suivantes en justifiant.'
	this.spacing = 2;
	this.spacing_corr = 1;
	this.nb_questions = 5;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let liste_des_exercices_disponibles 
		if (this.sup==1) {liste_des_exercices_disponibles = [2,5,10]}
		if (this.sup==2) {liste_des_exercices_disponibles = [3,9]}
		if (this.sup==3) {liste_des_exercices_disponibles = [2,3,5,9,10]}
		if (this.sup>3) {liste_des_exercices_disponibles = [2,3,5,9,10,'autre']}
		let liste_type_de_questions = combinaison_listes(liste_des_exercices_disponibles,this.nb_questions)
		for (let i = 0, fraction, n, u, texte, texte_corr, somme_string, cpt=0; i < this.nb_questions && cpt<50;) {
			switch (liste_type_de_questions[i]){
				case  2:
					u = randint(1,2)
					n = randint(10,999)*10+u
					texte = `$${tex_nombre(n)}$ est-il divisible par $2$ ?`
					if (u%2==0) {
						texte_corr = `Le chiffre des unités de $${tex_nombre(n)}$ est $${u}$ donc $${tex_nombre(n)}$ est divisible par $2$.`
					} else {
						texte_corr = `Le chiffre des unités de $${tex_nombre(n)}$ est $${u}$ donc $${tex_nombre(n)}$ n'est pas divisible par $2$.`
					}
				break

				case 3 : 
					n = choice([randint(100,999),randint(10000,99999)]).toString() // transformé en string pour avoir accès aux chiffres
					somme_string = somme_des_chiffre(n);
					texte = `$${tex_nombre(n)}$ est-il divisible par $3$ ?`
					if (calcul(somme_string)%3==0) {
						texte_corr = `$${somme_string}=${calcul(somme_string)}=3\\times${calcul(somme_string)/3}$<br>`
						texte_corr += `La somme des chiffres de $${tex_nombre(n)}$ est divisible par $3$ donc $${tex_nombre(n)}$ est divisible par $3$.`
					} else {
						texte_corr = `$${somme_string}=${calcul(somme_string)}=3\\times${(calcul(somme_string)-calcul(somme_string)%3)/3}+${calcul(somme_string)%3}$<br>`
						texte_corr += `La somme des chiffres de $${tex_nombre(n)}$ n'est pas divisible par $3$ donc $${tex_nombre(n)}$ n'est pas divisible par $3$.`
					}
				break

				case 9 : 
					n = choice([randint(100,999),randint(10000,99999)]).toString() // transformé en string pour avoir accès aux chiffres
					somme_string = somme_des_chiffre(n);
					texte = `$${tex_nombre(n)}$ est-il divisible par $9$ ?`
					if (calcul(somme_string)%9==0) {
						texte_corr = `$${somme_string}=${calcul(somme_string)}=9\\times${calcul(somme_string)/9}$<br>`
						texte_corr += `La somme des chiffres de $${tex_nombre(n)}$ est divisible par $9$ donc $${tex_nombre(n)}$ est divisible par $9$.`
					} else {
						texte_corr = `$${somme_string}=${calcul(somme_string)}=9\\times${(calcul(somme_string)-calcul(somme_string)%9)/9}+${calcul(somme_string)%9}$<br>`
						texte_corr += `La somme des chiffres de $${tex_nombre(n)}$ n'est pas divisible par $9$ donc $${tex_nombre(n)}$ n'est pas divisible par $9$.`
					}
				break

				case  5:
					u = choice([randint(1,9,[0,5]),randint(1,9,[0,5]),5,0]) // 1 fois sur 2 ça sera divisible par 5
					n = randint(10,9999)*10+u
					texte = `$${tex_nombre(n)}$ est-il divisible par $5$ ?`
					if (u%5==0) {
						texte_corr = `Le chiffre des unités de $${tex_nombre(n)}$ est $${u}$ donc $${tex_nombre(n)}$ est divisible par $5$.`
					} else {
						texte_corr = `Le chiffre des unités de $${tex_nombre(n)}$ est $${u}$ donc $${tex_nombre(n)}$ n'est pas divisible par $5$.`
					}
				break

				case  10:
					u = choice([randint(1,9),0]) // 1 fois sur 2 ça sera divisible par 10
					n = randint(10,9999)*10+u
					texte = `$${tex_nombre(n)}$ est-il divisible par $10$ ?`
					if (u==0) {
						texte_corr = `Le chiffre des unités de $${tex_nombre(n)}$ est $${u}$ donc $${tex_nombre(n)}$ est divisible par $10$.`
					} else {
						texte_corr = `Le chiffre des unités de $${tex_nombre(n)}$ est $${u}$ donc $${tex_nombre(n)}$ n'est pas divisible par $10$.`
					}
				break

				case 'autre':
					n=randint(100,999);
					u=choice([7,7,7,7,13,17,19]);
					if (u==7) {
						n = choice([randint(10,99)*10+7],7*randint(11,99),randint(100,999)) //un nombre qui se termine par 7, un divisible par 7, un au hasard
					} else {
						n = choice([randint(10,99)*100+u],u*randint(11,99),randint(100,999)) //un nombre qui se termine par u, un divisible par u, un au hasard
					}	
					texte = `$${tex_nombre(n)}$ est-il divisible par $${u}$ ?`
					texte_corr = `On ne connait pas de critère de divisibilité par $${u}$, on calcule donc la division euclidienne de $${tex_nombre(n)}$ par $${u}$.<br>`
					if (n%u==0) {
						texte_corr += `$${tex_nombre(n)}=${u}\\times${tex_nombre(n/u)}$<br>`
						texte_corr += `Le reste de la division euclidienne est nul donc $${tex_nombre(n)}$ est divisible par $${u}$.`
					} else {
						texte_corr += `$${tex_nombre(n)}=${u}\\times${(n-n%u)/u}+${n%u}$<br>`
						texte_corr += `Le reste de la division euclidienne n'est pas nul donc $${tex_nombre(n)}$ n'est pas divisible par $${u}$.`
					}

				break
			}		
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
	liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique=['Choix des questions',4,"1 : Critères de divisibilité par 2, 5, 10\n\
2 : Critères de divisibilité par 3,9\n3 : Critères de divisibilité par 2, 3, 5, 9, 10\n4 : Avec ou sans critère de divisibilité"]
}

function Proportionnalite_par_linearite() {
	'use strict'y;
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Résoudre des problèmes de proportionnalité en utilisant la linéarité simple";
	this.consigne = "Répondre aux questions posées en justifiant";
	this.spacing = 2;
	this.spacing_corr = 2;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let liste_de_lieux=['dans un magasin de bricolage','dans une animalerie','au supermarché local','à l\'épicerie','dans la boutique du musée']
		let liste_de_choses=[[]]
		let liste_de_prix_unit[[]]
		liste de choses[0]=['articles','outils','accessoires','pièces d\'outillage','pinceaux','ampoules']
		liste_de_choses[1]=['poissons rouges','canards jaunes','oiseaux verts','phasmes']
		liste_de_choses[2]=['sets de tables','verres','assiettes','os à macher pour sa chienne','dosettes de café']
		liste_de_choses[3]=['ananas','fruits de la passion','melons','paquets de madeleines de Commercy']
		liste_de_choses[4]=['cartes','livres','gravures','puzzles']
		liste_de_prix_unit[0]=[5.5,4.5,1.2,3.2,0.8,1.6]
		liste_de_prix_unit[1]=[1.3,7.5,10.5,2.4]
		liste_de_prix_unit[2]=[0.7,1.4,2.2,0.9,4.7]
		liste_de_prix_unit[3]=[2.5,1.2,1.5,3.4]
		liste_de_prix_unit[4]=[0.5,4.7,6.8,13.5]
		for (let i = 0, x,y,z,pu, n,p,somme,prenoms,index1,index2,objet,met, texte, texte_corr; i < this.nb_questions;i++) {
			index1=randint(0,4);
			prenoms=prenom();
			index2=randint(0,liste_de_choses[index1].length-1);
			objet=liste_de_choses[index1][index2];
			pu=liste_de_prix[index1][index2];
			n=randint(3,6);
			y=n*randint(2,5);
			x=n*pu;
			somme=y*pu;
			met = false;
			while (met==false) {
				p=n*randint(2,5);
				if (p!=y) met=true
			}
			z=p*pu;
			texte = `${prenoms[0]} a repéré ${liste_de_lieux[index1]} des ${objets} qui l\'intéressent.<br>`;
			texte +=`Elle veut en acheter $${y}$. Combien va-t-elle dépenser ?<br>`;
			texte_corr = `$${y}$ ${objet}, c'est $${y/n}$ fois plus que $${n}$ ${objet}. Si $${n}$ ${objet} coûtent $${x}$\\euro alors $${y/n}$ fois plus de ${objet} coutent $${y/n}$ fois plus.<br>`;
			texte_corr +=`Donc ${prenom[0]} dépensera $${y/n}\\times${x}=${somme}$\\euro.<br>`;
			texte += `${prenoms[1]} veut lui aussi acheter ces ${objets}. Il dispose de $${z}$\\euro. Combien peut-il en acheter ?<br>`;
			texte_corr += `$${z}$\\euro, c'est $${z/x}$ fois plus que $${x}$\\euro. Si avec $${x}$\\euro on peut acheter $${n}$ ${objet} alors avec $${z/x}$ fois plus d'argent, on peut acheter $${z/x}$ fois plus de ${objet}.<br>`;
			texte_corr +=`Donc ${prenom[1]} pourra acheter $${z/x}\\times${n}=${p}$ ${objet}.<br>`;
			
		}
		liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
	}	
};



/**
* Décomposer une fraction (partie entière + fraction inférieure à 1) puis donner l'écriture décimale.
* @Auteur Rémi Angot
*/
function Exercice_fractions_differentes_ecritures(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Décomposer une fraction (partie entière + fraction inférieure à 1) puis donner l'écriture décimale.";
	this.consigne = "Écrire sous la forme de la somme d'un nombre entier et d'une fraction inférieure à 1 puis donner l'écriture décimale";
	this.spacing = 2;
	this.spacing_corr = 2;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		liste_fractions = [[1,2,',5'],[1,4,',25'],[3,4,',75'],[1,5,',2'],[2,5,',4'],[3,5,',6'],[4,5,',8'],
		[1,8,',125'],[3,8,',375'],[1,10,',1'],[3,10,',3'],[7,10,',7'],[9,10,',9']]; // Fractions irréductibles avec une écriture décimale exacte
		liste_fractions1 = [[1,2,',5'],[1,4,',25'],[3,4,',75'],[1,8,',125']];
		liste_fractions1.push(choice([[1,10,',1'],[2,10,',2'],[3,10,',3'],[7,10,',7'],[9,10,',9']]));
		liste_fractions1.push(choice([[1,5,',2'],[2,5,',4'],[3,5,',6'],[4,5,',8']])); // liste_fractions pour les 6 premières questions
		for (let i = 0, fraction, a, b, c, n, texte, texte_corr; i < this.nb_questions;i++) {
			if (i<6) {
				fraction = choice(liste_fractions1);
				enleve_element(liste_fractions1,fraction);
			}else{
				fraction = choice(liste_fractions);	
			}
			 //
			c = fraction[0];
			b = fraction[1];
			n = randint(1,4);
			a = n*b + c;
			ed = n + fraction[2];
			enleve_element(liste_fractions,fraction); // Il n'y aura pas 2 fois la même partie décimale
			texte = '$ '+ tex_fraction(a,b) + ' = \\phantom{0000} + '+ tex_fraction('\\phantom{00000000}','') +' =  $';
			texte_corr = '$ '+ tex_fraction(a,b) + ' = '+ n + '+' + tex_fraction(c,b) +' = '+ ed +' $';
			this.liste_questions.push(texte);
			this.liste_corrections.push(texte_corr);
			}
		liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
	}
}

/**
* @Auteur Rémi Angot
*/
function Exercice_fractions_decomposer(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Décomposer une fraction (partie entière + fraction inférieure à 1).";
	this.consigne = "Écrire sous la forme de la somme d'un nombre entier et d'une fraction inférieure à 1.";
	this.spacing = 2 ;
	this.spacing_corr = 2 ;
	this.sup = false ; // Donner l'écriture décimale

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		liste_fractions = [[1,2,',5'],[1,4,',25'],[3,4,',75'],[1,5,',2'],[2,5,',4'],[3,5,',6'],[4,5,',8'],
		[1,8,',125'],[3,8,',375'],[1,10,',1'],[3,10,',3'],[7,10,',7'],[9,10,',9']]; // Fractions irréductibles avec une écriture décimale exacte
		liste_fractions1 = [[1,2,',5'],[1,4,',25'],[3,4,',75'],[1,8,',125']];
		liste_fractions1.push(choice([[1,10,',1'],[2,10,',2'],[3,10,',3'],[7,10,',7'],[9,10,',9']]));
		liste_fractions1.push(choice([[1,5,',2'],[2,5,',4'],[3,5,',6'],[4,5,',8']])); // liste_fractions pour les 6 premières questions
		for (let i = 0, fraction, a, b, c, n, texte, texte_corr; i < this.nb_questions;i++) {
			if (i<6) {
				fraction = choice(liste_fractions1);
				enleve_element(liste_fractions1,fraction);
			}else{
				fraction = choice(liste_fractions);	
			}
			 //
			c = fraction[0];
			b = fraction[1];
			n = randint(1,4);
			a = n*b + c;
			ed = n + fraction[2];
			enleve_element(liste_fractions,fraction); // Il n'y aura pas 2 fois la même partie décimale
			texte = '$ '+ tex_fraction(a,b) + ' = \\phantom{0000} + '+ tex_fraction('\\phantom{00000000}','') +' $';
			texte_corr = '$ '+ tex_fraction(a,b) + ' = '+ n + '+' + tex_fraction(c,b) +' $';
			this.liste_questions.push(texte);
			this.liste_corrections.push(texte_corr);
			}
		liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
	}
}

/**
* Conversions de longueur en utilisant le préfixe pour déterminer la multiplication ou division à faire.
* 
* * 1 : De dam, hm, km vers m
* * 2 : De dm, cm, mm vers m
* * 3 : Conversions en mètres
* * 4 : Toutes les conversions de longueurs
* * Paramètre supplémentaire : utiliser des nombres décimaux (par défaut tous les nombres sont entiers)
* @Auteur Rémi Angot
*/
function Exercice_conversions_de_longueurs(niveau=1){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = niveau ; // Niveau de difficulté de l'exercice 
	this.sup2 = false; // Avec des nombres décimaux ou pas
	this.titre = "Conversions de longueurs"
	this.consigne = 'Compléter'
	this.spacing = 2;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let prefixe_multi = [[' da',10],[' h',100],[' k',1000]]
		let prefixe_div = [[' d',10],[' c',100,],[' m',1000]];
		let unite = 'm';
		let liste_unite = ['mm','cm','dm','m','dam','hm','km'];
		let liste_de_k = combinaison_listes([0,1,2],this.nb_questions)
		for (let i = 0, a, k, div, resultat, type_de_questions, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
			if (this.sup < 5) {
				type_de_questions = this.sup;
			} else {
				type_de_questions = randint(1,4);
			}
			// k = randint(0,2); // Choix du préfixe
			k = liste_de_k[i] //Plutôt que de prendre un préfix au hasard, on alterne entre 10,100 et 1000
			if (type_de_questions==1) { // niveau 1	
				div = false; // Il n'y aura pas de division
			} else if (type_de_questions==2) { // niveau 2
				div = true; // Avec des divisions
			} else {
				div = choice([true,false]) // Avec des multiplications ou des divisions
			} 

			if (this.sup2) { // Si la case pour les nombres décimaux est cochée
				a = choice([arrondi(randint(1,19)+randint(1,9)/10,1),arrondi(randint(1,9)/10,1),arrondi(randint(1,9)/100,2),arrondi(randint(1,9)+randint(1,9)/10+randint(1,9)/100,2)]);
				// XX,X 0,X 0,0X X,XX
			} else {
				a = choice([randint(1,9),randint(1,9)*10,randint(1,9)*100,randint(1,9)*10+randint(1,9)]);
				// X, X0, X00, XX
			}

			if (!div&&type_de_questions<4) { // Si il faut multiplier pour convertir
				
				resultat = Algebrite.eval(a*prefixe_multi[k][1]).toString(); // Utilise Algebrite pour avoir le résultat exact même avec des décimaux
				texte = '$ '+ tex_nombre(a) + tex_texte(prefixe_multi[k][0]+unite) + ' = \\dotfill ' + tex_texte('~'+unite) + '$';

				texte_corr = '$ '+ tex_nombre(a) + tex_texte(prefixe_multi[k][0]+unite) + ' =  ' + tex_nombre(a) + '\\times' + tex_nombre(prefixe_multi[k][1]) + tex_texte('~'+unite)
					 + ' = ' + tex_nombre(resultat) + tex_texte('~'+unite) + '$';

			}else if(div&&type_de_questions<4) {
				resultat = Algebrite.eval(a/prefixe_div[k][1]).toString(); // Attention aux notations scientifiques pour 10e-8
				texte = '$ '+ tex_nombre(a) + tex_texte(prefixe_div[k][0]+unite) + ' = \\dotfill ' + tex_texte('~'+unite) + '$';
				texte_corr = '$ '+ tex_nombre(a) + tex_texte(prefixe_div[k][0]+unite) + ' =  ' + tex_nombre(a) + '\\div' + tex_nombre(prefixe_div[k][1]) + tex_texte('~'+unite)
					 + ' = ' + tex_nombre(resultat) + tex_texte('~'+unite) + '$';
			}else{ // pour type de question = 4
				let unite1 = randint(0,3);
				let ecart = randint(1,2); // nombre de multiplication par 10 pour passer de l'un à l'autre
				if (ecart>4-unite1) {
					ecart = 4-unite1;
				}
				let unite2 = unite1+ecart
				if (randint(0,1)>0) {
					resultat = Algebrite.eval(a*Math.pow(10,ecart));
					texte = '$ '+ tex_nombre(a) + tex_texte(liste_unite[unite2]) + ' = \\dotfill ' + tex_texte(liste_unite[unite1]) + '$';
					texte_corr = '$ '+ tex_nombre(a) + tex_texte(liste_unite[unite2]) + ' =  ' + tex_nombre(a) + '\\times' + tex_nombre(Math.pow(10,ecart)) + tex_texte(liste_unite[unite1])
					 + ' = ' + tex_nombre(resultat) + tex_texte(liste_unite[unite1]) + '$';	

				} else {
					resultat = Algebrite.eval(a/Math.pow(10,ecart));
					texte = '$ '+ tex_nombre(a) + tex_texte(liste_unite[unite1]) + ' = \\dotfill ' + tex_texte(liste_unite[unite2]) + '$';
					texte_corr = '$ '+ tex_nombre(a) + tex_texte(liste_unite[unite1]) + ' =  ' + tex_nombre(a) + '\\div' + tex_nombre(Math.pow(10,ecart)) + tex_texte(liste_unite[unite2])
					 + ' = ' + tex_nombre(resultat) + tex_texte(liste_unite[unite2]) + '$';
				}


				
			} 
				
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				if (est_diaporama) {
					texte = texte.replace('= \\dotfill','\\text{ en }')
				}
				if (sortie_html){
					texte = texte.replace('\\dotfill','................................................')
				}
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
 	this.besoin_formulaire_numerique = ['Niveau de difficulté',4,"1 : De dam, hm, km vers m\n\
2 : De dm, cm, mm vers m\n3 : Conversions en mètres\n4 : Toutes les conversions de longueurs"];		
	this.besoin_formulaire2_case_a_cocher = ['Avec des nombres décimaux'];
}


/**
* Conversions  mètres, litres, grammes, octets (et euros pour la version LaTeX) en utilisant le préfixe pour déterminer la multiplication ou division à faire.
* 
* * 1 : De da, h, k vers l'unité de référence
* * 2 : De d, c, m vers l'unité de référence
* * 3 : Multiplications ou divisions vers l'unité de référence
* * 4 : Conversions d'octets
* * 5 : Un mélange de toutes les conversions
* * Paramètre supplémentaire : utiliser des nombres décimaux (par défaut tous les nombres sont entiers)
* @Auteur Rémi Angot
*/
function Exercice_conversions(niveau=1){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = niveau ; // Niveau de difficulté de l'exercice 
	this.sup2 = false; // Avec des nombres décimaux ou pas
	this.titre = "Conversions de longueurs, masses, contenance, prix ou unités informatiques"
	this.consigne = 'Compléter'
	this.spacing = 2;
	this.correction_avec_des_fractions = false ;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let prefixe_multi = [['da',10],['h',100],['k',1000]]//['M',1000000],['G',1000000000],['T',1000000000000]];
		let prefixe_div = [['d',10],['c',100,],['m',1000]]; //['$\\mu{}$',1000000]];
		for (let i = 0, a, k, div, resultat, unite, type_de_questions, texte, texte_corr, liste_unite_info, cpt=0; i < this.nb_questions && cpt<50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
			if (this.sup < 5) {
				type_de_questions = this.sup;
			} else {
				type_de_questions = randint(1,4);
			}
			k = randint(0,2); // Choix du préfixe
			if (type_de_questions==1) { // niveau 1	
				div = false; // Il n'y aura pas de division
			} else if (type_de_questions==2) { // niveau 2
				div = true; // Avec des divisions
			} else if (type_de_questions==3) {
				div = choice([true,false]) // Avec des multiplications ou des divisions
			} else if (type_de_questions==4) {
				liste_unite_info = ['o','ko','Mo','Go','To'];
			}

			if (this.sup2) { // Si la case pour les nombres décimaux est cochée
				a = choice([arrondi(randint(1,19)+randint(1,9)/10,1),arrondi(randint(1,9)/10,1),arrondi(randint(1,9)/100,2),arrondi(randint(1,9)+randint(1,9)/10+randint(1,9)/100,2)]);
				// XX,X 0,X 0,0X X,XX
			} else {
				a = choice([randint(1,9),randint(1,9)*10,randint(1,9)*100,randint(1,9)*10+randint(1,9)]);
				// X, X0, X00, XX
			}

			if (!div&&type_de_questions<4) { // Si il faut multiplier pour convertir
				if (k<2) {		// Choix de l'unité
						unite = choice(['m','L','g'])
					}else if (k==2){
						if (sortie_html) {
							unite = choice(['m','L','g']) // pas de signe € pour KaTeX
						} else{
							unite = choice(['m','L','g','€'])	
						}
						
					}else {
						unite = 'o'
					}
				resultat = Algebrite.eval(a*prefixe_multi[k][1]).toString(); // Utilise Algebrite pour avoir le résultat exact même avec des décimaux
				texte = '$ '+ tex_nombre(a) + tex_texte(prefixe_multi[k][0]+unite) + ' = \\dotfill ' + tex_texte('~'+unite) + '$';
				texte_corr = '$ '+ tex_nombre(a) + tex_texte(prefixe_multi[k][0]+unite) + ' =  ' + tex_nombre(a) + '\\times' + tex_nombre(prefixe_multi[k][1]) + tex_texte('~'+unite)
					 + ' = ' + tex_nombre(resultat) + tex_texte('~'+unite) + '$';

			}else if(div&&type_de_questions<4&&this.correction_avec_des_fractions) {
				unite = choice(['m','L','g'])
				resultat = Algebrite.eval(a/prefixe_div[k][1]).toString(); // Attention aux notations scientifiques pour 10e-8
				texte = '$ '+ tex_nombre(a) + tex_texte(prefixe_div[k][0]+unite) + ' = \\dotfill ' + tex_texte('~'+unite) + '$';
				texte_corr = '$ '+ tex_nombre(a) + tex_texte(prefixe_div[k][0]+unite) + ' =  ' + tex_fraction(tex_nombre(a),tex_nombre(prefixe_div[k][1])) + tex_texte('~'+unite)
					 + ' = ' + tex_nombre(resultat) + tex_texte('~'+unite) + '$';

			}else if(div&&type_de_questions<4) {
				unite = choice(['m','L','g'])
				resultat = Algebrite.eval(a/prefixe_div[k][1]).toString(); // Attention aux notations scientifiques pour 10e-8
				texte = '$ '+ tex_nombre(a) + tex_texte(prefixe_div[k][0]+unite) + ' = \\dotfill ' + tex_texte('~'+unite) + '$';
				texte_corr = '$ '+ tex_nombre(a) + tex_texte(prefixe_div[k][0]+unite) + ' =  ' + tex_nombre(a) + '\\div' + tex_nombre(prefixe_div[k][1]) + tex_texte('~'+unite)
					 + ' = ' + tex_nombre(resultat) + tex_texte('~'+unite) + '$';
			}else{ // pour type de question = 4
				let unite1 = randint(0,3);
				let ecart = randint(1,2); // nombre de multiplication par 1000 pour passer de l'un à l'autre
				if (ecart>4-unite1) {
					ecart = 4-unite1;
				}
				let unite2 = unite1+ecart
				if (randint(0,1)>0) {
					resultat = Algebrite.eval(a*Math.pow(10,3*ecart));
					texte = '$ '+ tex_nombre(a) + tex_texte(liste_unite_info[unite2]) + ' = \\dotfill ' + tex_texte(liste_unite_info[unite1]) + '$';
					texte_corr = '$ '+ tex_nombre(a) + tex_texte(liste_unite_info[unite2]) + ' =  ' + tex_nombre(a) + '\\times' + tex_nombre(Math.pow(10,3*ecart)) + tex_texte(liste_unite_info[unite1])
					 + ' = ' + tex_nombre(resultat) + tex_texte(liste_unite_info[unite1]) + '$';	

				} else {
					resultat = Algebrite.eval(a/Math.pow(10,3*ecart));
					texte = '$ '+ tex_nombre(a) + tex_texte(liste_unite_info[unite1]) + ' = \\dotfill ' + tex_texte(liste_unite_info[unite2]) + '$';
					texte_corr = '$ '+ tex_nombre(a) + tex_texte(liste_unite_info[unite1]) + ' =  ' + tex_nombre(a) + '\\div' + tex_nombre(Math.pow(10,3*ecart)) + tex_texte(liste_unite_info[unite2])
					 + ' = ' + tex_nombre(resultat) + tex_texte(liste_unite_info[unite2]) + '$';
				}


				
			} 
				
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				if (est_diaporama) {
					texte = texte.replace('= \\dotfill','\\text{ en }')
				}
				if (sortie_html){
					texte = texte.replace('\\dotfill','................................................')
				}
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
 	this.besoin_formulaire_numerique = ['Niveau de difficulté',5,"1 : De da, h, k vers l'unité de référence\n\
2 : De d, c, m vers l'unité de référence\n3 : Multiplications ou divisions vers l'unité de référence\n4 : Conversions avec les octets\n5: Toutes les conversions"];		
	this.besoin_formulaire2_case_a_cocher = ['Avec des nombres décimaux'];
}

/**
* Conversions d'aires en utilisant le préfixe pour déterminer la multiplication ou division à faire.
*
* Dans la correction, on montre que l'on multiplie ou divisie à 2 reprises par le coefficient donné par le préfixe
* 
* * 1 : De dam², hm², km² vers m²
* * 2 : De dm², cm², mm² vers m²
* * 3 : Conversions en mètres-carrés
* * 4 : Conversions avec des multiplications ou des divisions
* * 5 : Conversions avec des ares, des centiares et des hectares
* * 6 : Un mélange de toutes les conversions
* * Paramètre supplémentaire : utiliser des nombres décimaux (par défaut tous les nombres sont entiers)
* @Auteur Rémi Angot
*/
function Exercice_conversions_aires(niveau=1){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = niveau ; // Niveau de difficulté de l'exercice 
	this.sup2 = false; // Avec des nombres décimaux ou pas
	this.titre = "Conversions d'aires"
	this.consigne = 'Compléter'
	this.spacing = 2;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let prefixe_multi = [[' da','\\times10\\times10',100],[' h','\\times100\\times100',10000],[' k','\\times1~000\\times1~000',1000000]];
		let prefixe_div = [[' d','\\div10\\div10',100],[' c','\\div100\\div100',10000],[' m','\\div1~000\\div1~000',1000000]]; 
		let unite = 'm';
		let liste_unite = ['mm','cm','dm','m','dam','hm','km'];
		let liste_de_k = combinaison_listes([0,1,2],this.nb_questions)
		for (let i = 0, a, k, div, resultat, type_de_questions, texte, texte_corr, liste_unite_info, cpt=0; i < this.nb_questions && cpt<50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
			if (this.sup < 6) {
				type_de_questions = this.sup;
			} else {
				type_de_questions = randint(1,5);
			}
			// k = randint(0,2); // Choix du préfixe
			k = liste_de_k[i];
			if (type_de_questions==1) { // niveau 1	
				div = false; // Il n'y aura pas de division
			} else if (type_de_questions==2) { // niveau 2
				div = true; // Avec des divisions
			} else if (type_de_questions==3) {
				div = choice([true,false]) // Avec des multiplications ou des divisions
			} else if (type_de_questions==4) { 
				div = choice([true,false]); // Avec des multiplications ou des divisions sans toujours revenir au m^2
			}

			if (this.sup2) { // Si la case pour les nombres décimaux est cochée
				a = choice([arrondi(randint(1,19)+randint(1,9)/10,1),arrondi(randint(1,9)/10,1),arrondi(randint(1,9)/100,2),arrondi(randint(1,9)+randint(1,9)/10+randint(1,9)/100,2)]);
				// XX,X 0,X 0,0X X,XX
			} else {
				a = choice([randint(1,9),randint(1,9)*10,randint(1,9)*100,randint(1,9)*10+randint(1,9)]);
				// X, X0, X00, XX
			}

			if (!div&&type_de_questions<4) { // Si il faut multiplier pour convertir
				
				prefixe_multi = [[' da','\\times10\\times10',100],[' h','\\times100\\times100',10000],[' k','\\times1~000\\times1~000',1000000]];// On réinitialise cette liste qui a pu être modifiée dans le cas des ares
				resultat = Algebrite.eval(a*prefixe_multi[k][2]).toString(); // Utilise Algebrite pour avoir le résultat exact même avec des décimaux
				texte = '$ '+ tex_nombre(a) + tex_texte(prefixe_multi[k][0]+unite) + '^2' + ' = \\dotfill ' + tex_texte('~'+unite)  + '^2' + '$';
				texte_corr = '$ '+ tex_nombre(a) + tex_texte(prefixe_multi[k][0]+unite)+ '^2' + ' =  ' + tex_nombre(a) + prefixe_multi[k][1] + tex_texte('~'+unite)  + '^2'
					 + ' = ' + tex_nombre(resultat) + tex_texte('~'+unite)+ '^2' + '$';

			}else if(div&&type_de_questions<4) {
				k = randint(0,1); // Pas de conversions de mm^2 en m^2 avec des nombres décimaux car résultat inférieur à 10e-8
				resultat = Algebrite.eval(a/prefixe_multi[k][2]).toString(); // Attention aux notations scientifiques pour 10e-8
				texte = '$ '+ tex_nombre(a) + tex_texte(prefixe_div[k][0]+unite)+ '^2' + ' = \\dotfill ' + tex_texte('~'+unite)  + '^2' + '$';
				texte_corr = '$ '+ tex_nombre(a) + tex_texte(prefixe_div[k][0]+unite)+ '^2' + ' =  ' + tex_nombre(a) + prefixe_div[k][1] + tex_texte('~'+unite)  + '^2'
					 + ' = ' + tex_nombre(resultat) + tex_texte('~'+unite)  + '^2' + '$';
			}else if(type_de_questions==4){ 
				let unite1 = randint(0,3);
				let ecart = randint(1,2); // nombre de multiplication par 10 pour passer de l'un à l'autre
				if (ecart>4-unite1) {
					ecart = 4-unite1;
				}
				let unite2 = unite1+ecart
				if (randint(0,1)>0) {
					resultat = Algebrite.eval(a*Math.pow(10,2*ecart));
					texte = '$ '+ tex_nombre(a) + tex_texte('~'+liste_unite[unite2]) + '^2' + ' = \\dotfill ' + tex_texte('~'+liste_unite[unite1]) + '^2' + '$';
					texte_corr = '$ '+ tex_nombre(a) + tex_texte('~'+liste_unite[unite2]) + '^2' + ' =  ' + tex_nombre(a) + '\\times' + tex_nombre(Math.pow(10,2*ecart)) + tex_texte('~'+liste_unite[unite1]) + '^2'
					 + ' = ' + tex_nombre(resultat) + tex_texte('~'+liste_unite[unite1]) + '^2' + '$';	

				} else {
					resultat = Algebrite.eval(a/Math.pow(10,2*ecart));
					texte = '$ '+ tex_nombre(a) + tex_texte('~'+liste_unite[unite1]) + '^2' + ' = \\dotfill ' + tex_texte('~'+liste_unite[unite2]) + '^2' + '$';
					texte_corr = '$ '+ tex_nombre(a) + tex_texte('~'+liste_unite[unite1]) + '^2' + ' =  ' + tex_nombre(a) + '\\div' + tex_nombre(Math.pow(10,2*ecart)) + tex_texte('~'+liste_unite[unite2]) + '^2'
					 + ' = ' + tex_nombre(resultat) + tex_texte('~'+liste_unite[unite2]) + '^2' + '$';
				}
				
			} else if(type_de_questions==5) { // Pour type_de_questions==5
				prefixe_multi = [['ha',10000],['a',100]];
				k = randint(0,1)
				resultat = Algebrite.eval(a*prefixe_multi[k][1]).toString(); // Utilise Algebrite pour avoir le résultat exact même avec des décimaux
				texte = '$ '+ tex_nombre(a) + tex_texte('~'+prefixe_multi[k][0]) + ' = \\dotfill ' + tex_texte('~'+unite)  + '^2' + '$';
				texte_corr = '$ '+ tex_nombre(a) + tex_texte('~'+prefixe_multi[k][0]) + ' =  ' + tex_nombre(a) + '\\times' + tex_nombre(prefixe_multi[k][1]) + tex_texte('~'+unite)  + '^2'
					 + ' = ' + tex_nombre(resultat) + tex_texte('~'+unite)+ '^2' + '$';
			}
				
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				if (est_diaporama) {
					texte = texte.replace('= \\dotfill','\\text{ en }')
				}
				if (sortie_html){
					texte = texte.replace('\\dotfill','................................................')
				}
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
 	this.besoin_formulaire_numerique = ['Niveau de difficulté',6,"1 : Conversions en m² avec des multiplications\n\
2 : Conversions en m² avec des divisions\n3 : Conversions en m² avec des multiplications ou divisions\n4 : Conversions avec des multiplications ou divisions\n\
5 : Conversions d'hectares et ares en m² \n6 : Toutes les conversions"];		
	this.besoin_formulaire2_case_a_cocher = ['Avec des nombres décimaux'];
}


/**
* Conversions de volumes.
*
* Dans la correction, on ne voit qu'une multiplication ou qu'un division pour obtenir le résultat
* 
* * 1 : Conversions en mètres-cubes avec des multiplications
* * 2 : Conversions en mètres-cubes avec des divisions
* * 3 : Conversions en mètres-cubes avec des multiplications ou divisions
* * 4 : Conversions avec des multiplications ou divisions
* * Paramètre supplémentaire : utiliser des nombres décimaux (par défaut tous les nombres sont entiers)
* @Auteur Rémi Angot
*/
function Exercice_conversions_volumes(niveau=1){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = niveau ; // Niveau de difficulté de l'exercice 
	this.sup2 = false; // Avec des nombres décimaux ou pas
	this.titre = "Conversions de volume"
	this.consigne = 'Compléter'
	this.spacing = 2;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let prefixe_multi = [[' da','10\\times10\\times10',1000],[' h','100\\times100\\times100',1000000],[' k','1~000\\times1~000\\times1~000',1000000000]];
		let prefixe_div = [[' d','10\\div10\\div10',1000],[' c','100\\div100\\div100',1000000,],[' m','1~000\\div1~000\\div1~000',1000000000]]; 
		let unite = 'm';
		let liste_unite = [' mm',' cm',' dm',' m',' dam',' hm',' km'];
		for (let i = 0, a, k, div, resultat, type_de_questions, texte, texte_corr, liste_unite_info, cpt=0; i < this.nb_questions && cpt<50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
			if (this.sup < 5) {
				type_de_questions = this.sup;
			} else {
				type_de_questions = randint(1,4);
			}
			k = randint(0,2); // Choix du préfixe
			if (type_de_questions==1) { // niveau 1	
				div = false; // Il n'y aura pas de division
			} else if (type_de_questions==2) { // niveau 2
				div = true; // Avec des divisions
			} else if (type_de_questions==3) {
				div = choice([true,false]) // Avec des multiplications ou des divisions
			} else if (type_de_questions==4) { 
				div = choice([true,false]); // Avec des multiplications ou des divisions sans toujours revenir au m^2
			}

			if (this.sup2) { // Si la case pour les nombres décimaux est cochée
				a = choice([arrondi(randint(1,19)+randint(1,9)/10,1),arrondi(randint(1,9)/10,1),arrondi(randint(1,9)/100,2),arrondi(randint(1,9)+randint(1,9)/10+randint(1,9)/100,2)]);
				// XX,X 0,X 0,0X X,XX
			} else {
				a = choice([randint(1,9),randint(1,9)*10,randint(1,9)*100,randint(1,9)*10+randint(1,9)]);
				// X, X0, X00, XX
			}

			if (!div&&type_de_questions<4) { // Si il faut multiplier pour convertir
				
				
				resultat = Algebrite.eval(a*prefixe_multi[k][2]).toString(); // Utilise Algebrite pour avoir le résultat exact même avec des décimaux
				texte = '$ '+ tex_nombre(a) + tex_texte(prefixe_multi[k][0]+unite) + '^3' + ' = \\dotfill ' + tex_texte('~'+unite)  + '^3' + '$';
				texte_corr = '$ '+ tex_nombre(a) + tex_texte(prefixe_multi[k][0]+unite)+ '^3' + ' =  ' + tex_nombre(a) + '\\times' + prefixe_multi[k][1] + tex_texte('~'+unite)  + '^3'
					 + ' = ' + tex_nombre(resultat) + tex_texte('~'+unite)+ '^3' + '$';

			}else if(div&&type_de_questions<4) {
				k = randint(0,1); // Pas de conversions de mm^3 en m^3 avec des nombres décimaux car résultat inférieur à 10e-8
				resultat = Algebrite.eval(a/prefixe_multi[k][2]).toString(); // Attention aux notations scientifiques pour 10e-8
				texte = '$ '+ tex_nombre(a) + tex_texte(prefixe_div[k][0]+unite)+ '^3' + ' = \\dotfill ' + tex_texte('~'+unite)  + '^3' + '$';
				texte_corr = '$ '+ tex_nombre(a) + tex_texte(prefixe_div[k][0]+unite)+ '^3' + ' =  ' + tex_nombre(a) + '\\div' + prefixe_div[k][1] + tex_texte('~'+unite)  + '^3'
					 + ' = ' + tex_nombre(resultat) + tex_texte('~'+unite)  + '^3' + '$';
			}else if(type_de_questions==4){ 
				let unite1 = randint(0,3);
				let ecart = randint(1,2); // nombre de multiplication par 10 pour passer de l'un à l'autre
				if (ecart>4-unite1) {
					ecart = 4-unite1;
				}
				let unite2 = unite1+ecart
				let multiplications_par_1000 = ''
				
				if (randint(0,1)>0) {
					switch (ecart) {
						case 1 :
						multiplications_par_1000 = '\\times 1~000';
						break
						case 2 :
						multiplications_par_1000 = '\\times 1~000 \\times 1~000';
						break
						case 3 :
						multiplications_par_1000 = '\\times 1~000 \\times 1~000 \\times 1~000';
						break
					}
					resultat = Algebrite.eval(a*Math.pow(10,3*ecart));
					texte = '$ '+ tex_nombre(a) + tex_texte(liste_unite[unite2]) + '^3' + ' = \\dotfill ' + tex_texte(liste_unite[unite1]) + '^3' + '$';
					texte_corr = '$ '+ tex_nombre(a) + tex_texte(liste_unite[unite2]) + '^3' + ' =  ' + tex_nombre(a) + multiplications_par_1000 + tex_texte(liste_unite[unite1]) + '^3'
					 + ' = ' + tex_nombre(resultat) + tex_texte(liste_unite[unite1]) + '^3' + '$';	

				} else {
					switch (ecart) {
						case 1 :
						multiplications_par_1000 = '\\div 1~000';
						break
						case 2 :
						multiplications_par_1000 = '\\div 1~000 \\div 1~000';
						break
						case 3 :
						multiplications_par_1000 = '\\div 1~000 \\div 1~000 \\div 1~000';
						break
					}
					resultat = Algebrite.eval(a/Math.pow(10,3*ecart));
					texte = '$ '+ tex_nombre(a) + tex_texte(liste_unite[unite1]) + '^3' + ' = \\dotfill ' + tex_texte(liste_unite[unite2]) + '^3' + '$';
					texte_corr = '$ '+ tex_nombre(a) + tex_texte(liste_unite[unite1]) + '^3' + ' =  ' + tex_nombre(a) + multiplications_par_1000 + tex_texte(liste_unite[unite2]) + '^3'
					 + ' = ' + tex_nombre(resultat) + tex_texte(liste_unite[unite2]) + '^3' + '$';
				}
				
			} 
			// else if(type_de_questions==5) { // Pour type_de_questions==5
			// 	prefixe_multi = [['L',0.001],['dL',0.0001],['cL',0.00001],['mL',0.000001]];
			// 	k = randint(0,1)
			// 	resultat = Algebrite.eval(a*prefixe_multi[k][1]).toString(); // Utilise Algebrite pour avoir le résultat exact même avec des décimaux
			// 	texte = '$ '+ tex_nombre(a) + tex_texte(prefixe_multi[k][0]) + ' = \\dotfill ' + tex_texte('~'+unite)  + '^3' + '$';
			// 	texte_corr = '$ '+ tex_nombre(a) + tex_texte(prefixe_multi[k][0]) + ' =  ' + tex_nombre(a) + '\\times' + tex_nombre(prefixe_multi[k][1]) + tex_texte('~'+unite)  + '^3'
			// 		 + ' = ' + tex_nombre(resultat) + tex_texte('~'+unite)+ '^2' + '$';
			// }
				
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				if (est_diaporama) {
					texte = texte.replace('= \\dotfill','\\text{ en }')
				}
				if (sortie_html){
					texte = texte.replace('\\dotfill','................................................')
				}
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
 	this.besoin_formulaire_numerique = ['Niveau de difficulté',4,"1 : Conversions en mètres-cubes avec des multiplications\n\
2 : Conversions en mètres-cubes avec des divisions\n3 : Conversions en mètres-cubes avec des multiplications ou divisions\n4 : Conversions avec des multiplications ou divisions"];		
	this.besoin_formulaire2_case_a_cocher = ['Avec des nombres décimaux'];
}


/**
* Déterminer le périmètre et l'aire d'un carré, d'un rectangle, d'un triangle rectangle, d'un cercle
* 
* * 1 : Carré, rectangle et triangle rectangle
* * 2: Uniquement des cercles
* * 3 : Les 4 sont demandés
* @Auteur Rémi Angot
*/
function Exercice_perimetres_et_aires(difficulte=1){
//Calculer le périmètre et l'aire de figures 
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = difficulte ;
	this.titre = "Calculs de périmètres et d'aires";
	this.consigne = 'Pour chacune des figures, calculer son périmètre puis son aire (valeur exacte et si nécessaire valeur approchée au dixième près).';
	this.spacing = 1;
	this.nb_questions = 4;


	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		
		let triplets_pythagoriciens = [[3,4,5],[6,8,10],[15,8,17],[24,10,26],[5,12,13],[12,16,20],[21,20,29],[9,40,41]];
		let type_de_questions_disponibles = ['carre','rectangle','triangle_rectangle','cercle']
		if (this.sup==1) {
			enleve_element(type_de_questions_disponibles,'cercle')
			this.nb_cols = 1;
		} else if (this.sup==2){
			type_de_questions_disponibles = ['cercle']
		}
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		for (let i = 0, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) {
			type_de_questions = liste_type_de_questions[i];
			switch (type_de_questions){
				case 'carre' :
					let cote = randint(2,11);
					let nom_carre = polygone(4);
					if (choice([true,false])){ // 2 énoncés possibles équiprobables
						texte = `Un carré $${nom_carre}$ de $${cote}$ cm de côté .`;
					} else {
						texte = `Un carré $${nom_carre}$ tel que $${nom_carre[0]+nom_carre[1]} = ${cote}$ cm.`;
					}
					 
					texte_corr = `$\\mathcal{P}_{${nom_carre}}=4\\times${cote}~\\text{cm}=${4*cote}~\\text{cm}$<br>\n`;
					texte_corr += `$\\mathcal{A}_{${nom_carre}}=${cote}~\\text{cm}\\times${cote}~\\text{cm}=${cote*cote}~\\text{cm}^2$`;
					break ;
				case 'rectangle' : 
					let L = randint(3,11);
					let l = randint(2,L-1);
					let nom_rectangle = polygone(4);
					if (choice([true,false])){ // 2 énoncés possibles équiprobables
							texte = `Un rectangle $${nom_rectangle}$ de $${L}$ cm de longueur et de $${l}$ cm de largeur.`;
						} else{
							texte = `Un rectangle $${nom_rectangle}$ tel que $${nom_rectangle[0]+nom_rectangle[1]+' = '+L}$ cm et $${nom_rectangle[1]+nom_rectangle[2]+' = '+l}$ cm.`;
						}
					 
					texte_corr = `$\\mathcal{P}_{${nom_rectangle}}=(${L}~\\text{cm}+${l}~\\text{cm})\\times2=${(L+l)*2}~\\text{cm}$<br>\n`;
					texte_corr += `$\\mathcal{A}_{${nom_rectangle}}=${L}~\\text{cm}\\times${l}~\\text{cm}=${L*l}~\\text{cm}^2$`;
					break ;
				case 'triangle_rectangle' :
					let triplet = choice(triplets_pythagoriciens);
					enleve_element(triplets_pythagoriciens,triplet)
					let a = triplet[0];
					let b = triplet[1];
					let c = triplet[2];
					let nom_triangle = polygone(3);
					if (choice([true,false])){
						texte = `Un triangle $${nom_triangle}$ rectangle en $${nom_triangle[1]}$ tel que $${nom_triangle[0]+nom_triangle[1]+' = '+a}$ cm, $${nom_triangle[1]+nom_triangle[2]+' = '+b}$ cm\
 et $${nom_triangle[0]+nom_triangle[2]+' = '+c}$ cm.`;
					} else {
						texte = `Un triangle rectangle $${nom_triangle}$ a pour côtés : $${a}$ cm, $${c}$ cm et $${b}$ cm.`;	
					}
					
					texte_corr = `$\\mathcal{P}_{${nom_triangle}}=${a}~\\text{cm}+${b}~\\text{cm}+${c}~\\text{cm}=${a+b+c}~\\text{cm}$<br>\n`;
					texte_corr += `$\\mathcal{A}_{${nom_triangle}}=${a}~\\text{cm}\\times${b}~\\text{cm}\\div2=${Algebrite.eval(a*b/2)}~\\text{cm}^2$`;
					break ;
				case 'cercle' : 
					let R = randint(3,11)
					let donne_le_diametre = choice([true,false])
					if (donne_le_diametre) {
						texte = `Un cercle de $${2*R}$ cm de diamètre.`;
						texte_corr = `Le diamètre est de $${2*R}$ cm donc le rayon est de $${R}$~cm.<br>\n`	
					} else {
						texte = `Un cercle de $${R}$ cm de rayon.`;
						texte_corr = '';	
					}
					 
					texte_corr += `$\\mathcal{P}=2\\times${R}\\times\\pi~\\text{cm}=${2*R}\\pi~\\text{cm}\\approx${arrondi_virgule(2*R*Math.PI,1)}~\\text{cm}$<br>\n`;
					texte_corr += `$\\mathcal{A}=${R}\\times${R}\\times\\pi~\\text{cm}^2=${R*R}\\pi~\\text{cm}^2\\approx${arrondi_virgule(R*R*Math.PI,1)}~\\text{cm}^2$`;
					break ;
			}
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',3,'1 : Carré, rectangle et triangle rectangle\n2: Cercles\n3: Mélangé'] 
}


/**
* On donne une fraction qui a pour dénominateur 10, 100 ou 1 000, il faut donner l'écriture décimale.
*
* Le numérateur est de la forme X, XX, X0X, X00X ou XXX
* @Auteur Rémi Angot
*/
function Exercice_ecriture_decimale_a_partir_de_fraction_decimale(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Donner l'écriture décimale d'une fraction décimale"
	this.consigne = "Donner l'écriture décimale"
	this.spacing = 2;
	this.spacing_corr = 2;
	this.nb_questions = 8;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		for (let i = 0, a, b, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt<50;){
			a = choice([randint(2,9),randint(11,99),randint(1,9)*100+randint(1,9),randint(1,9)*1000+randint(1,9)],randint(101,999));
			// X, XX, X0X, X00X,XXX
			b = choice([10,100,1000])
			texte = '$ '+ tex_fraction(tex_nombre(a),tex_nombre(b)) + ' = \\dotfill $';
			texte_corr = '$ '+ tex_fraction(tex_nombre(a),tex_nombre(b)) + ' = ' + tex_nombre(Algebrite.eval(a/b)) +' $';
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				if (est_diaporama) {
					texte = texte.replace('=\\dotfill','')
				}
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
}

/**
* Multiplier ou diviser un nombre entier par 10, 100 ou 1 000
*
* Le nombre entier est de la forme X, XX, X0X, X00X ou XXX
* @Auteur Rémi Angot
*/
function Exercice_multiplier_ou_diviser_un_nombre_entier_par_10_100_1000(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Multiplier ou diviser un nombre entier par 10, 100 ou 1 000"
	this.consigne = "Donner l'écriture décimale"
	this.spacing = 2;
	this.spacing_corr = 2;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		for (let i = 0, a, b, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt<50;){
			a = choice([randint(2,9),randint(11,99),randint(1,9)*100+randint(1,9),randint(1,9)*1000+randint(1,9)],randint(101,999));
			// X, XX, X0X, X00X,XXX
			b = choice([10,100,1000])
			if (choice([true,false])) {
				texte = '$ '+ tex_fraction(tex_nombre(a),tex_nombre(b)) + ' = \\dotfill $';
				texte_corr = '$ '+ tex_fraction(tex_nombre(a),tex_nombre(b)) + ' = ' + tex_nombre(Algebrite.eval(a/b)) +' $';
			} else {
				texte = '$ '+ tex_nombre(a)+ '\\times' +tex_nombre(b) + ' = \\dotfill $';
				texte_corr = '$ '+ tex_nombre(a)+ '\\times' +tex_nombre(b) + ' = ' + tex_nombre(Algebrite.eval(a*b)) +' $';
			}
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Valeur maximale',99999];	
}


/**
* Comparer deux nombres décimaux
*
* Les types de comparaisons sont : 
* * ab ? ba
* * aa,bb ? aa,cc
* * a,b  a,cc avec b>c
* * 0,ab 0,ba
* * 0,a0b 0,b0a
* * a,b a,b0	
* * 0,0ab 0,0a0b
* * a,bb  a,ccc avec b>c	
* * a+1,bb  a,cccc avec cccc>bb
* 
* aa, bb, cc correspondent à des nombres à 2 chiffres (ces 2 chiffres pouvant être distincts)
* @Auteur Rémi Angot
*/
function Comparer_decimaux(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Comparer des nombres décimaux";
	this.consigne = "Compléter avec le signe < , > ou =.";
	this.nb_questions = 8;
	this.nb_cols = 2;
	this.nb_cols_corr = 2;
	

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = [choice([1,4,5]),2,2,3,6,7,8,9] // une seule question du type inversion de chiffres (1,4,5)
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

		for (let i = 0, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) {
			let x, y, a, b, c, d, zero_inutile = false
			
			switch (liste_type_de_questions[i]){
				case 1: // ab ba	
					a = randint(1,9)
					b = randint (1,9,a)
					x = a*10+b
					y = b*10+a
					break;
				case 2: // aa,bb aa,cc	
					a = randint(1,99)
					b = randint(11,99)
					c = randint(11,99)
					x = calcul(a+b/100)
					y = calcul(a+c/100)
					break;
				case 3: // a,b  a,cc avec b>c	
					a = randint(1,99)
					b = randint(1,8)
					c = randint(1,b*10)
					x = calcul(a+b/10)
					y = calcul(a+c/100)
					break;
				case 4: // 0,ab 0,ba	
					a = randint(1,9)
					b = randint (1,9,a)
					x = calcul((a*10+b)/100)
					y = calcul((b*10+a)/100)
					break;
				case 5: // 0,a0b 0,b0a	
					a = randint(1,9)
					b = randint (1,9,a)
					x = calcul((a*100+b)/1000)
					y = calcul((b*100+a)/1000)
					break;
				case 6: // a,b a,b0	
					a = randint(11,999)
					while (a%10==0){ // pas de nombre divisible par 10
						a = randint(11,999)
					}
					x = calcul(a/10)
					y = x
					zero_inutile = true
					break;
				case 7: // 0,0ab 0,0a0b	
					a = randint(1,9)
					b = randint(1,9)
					x = calcul(a/100+b/1000)
					y = calcul(a/100+b/10000)
					break;
				case 8: // a,bb  a,ccc avec b>c	
					a = randint(11,99)
					b = randint(11,99)
					c = randint(100,b*10)
					x = calcul(a+b/100)
					y = calcul(a+c/1000)
					if (randint(1,2)==1){
						[x,y]=[y,x]
					}
					break;
				case 9: // a+1,bb  a,cccc avec cccc>bb	
					a = randint(11,98)
					b = randint(11,99)
					c = randint(b*100,10000)
					x = calcul(a+1+b/100)
					y = calcul(a+c/10000)
					if (randint(1,2)==1){
						[x,y]=[y,x]
					}
					break;
				
			}
			
			texte = `${tex_nombre(x)}\\ldots\\ldots${tex_nombre(y)}`
			if (parseFloat(x)>parseFloat(y)){
				texte_corr = `${tex_nombre(x)} > ${tex_nombre(y)}`
			} else if (parseFloat(x)<parseFloat(y)){
				texte_corr = `${tex_nombre(x)} < ${tex_nombre(y)}`
			} else {
				texte_corr = `${tex_nombre(x)} = ${tex_nombre(y)}`
			}

			if (zero_inutile) {
				if (randint(1,2)==1){
					texte = `${tex_prix(x)}\\ldots\\ldots${tex_nombre(y)}`
					if (parseFloat(x)>parseFloat(y)){
						texte_corr = `${tex_prix(x)} > ${tex_nombre(y)}`
					} else if (parseFloat(x)<parseFloat(y)){
						texte_corr = `${tex_prix(x)} < ${tex_nombre(y)}`
					} else {
						texte_corr = `${tex_prix(x)} = ${tex_nombre(y)}`
					}
				} else {
					texte = `${tex_nombre(x)}\\ldots\\ldots${tex_prix(y)}`
					if (parseFloat(x)>parseFloat(y)){
						texte_corr = `${tex_nombre(x)} > ${tex_prix(y)}`
					} else if (parseFloat(x)<parseFloat(y)){
						texte_corr = `${tex_nombre(x)} < ${tex_prix(y)}`
					} else {
						texte_corr = `${tex_nombre(x)} = ${tex_prix(y)}`
					}
				}
					
			}
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	
}



/**
* Calculer 10, 20, 30, 40 ou 50% d'un nombre
* @Auteur Rémi Angot
*/
function Pourcentage_d_un_nombre(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Calculer le pourcentage d'un nombre de tête"
	this.nb_questions = 5;
	this.consigne = "Calculer"
	this.spacing = 2;
	this.spacing_corr = 2;
	this.nb_cols = 1;
	this.nb_cols_corr = 1; 

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		liste_pourcentages = [10,20,30,40,50];

		for (let i = 0, p, n, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt<50;){
			p = choice(liste_pourcentages)
			n = choice([randint(2,9),randint(2,9)*10,randint(1,9)*10+randint(1,2)]); 
			texte = `$${p}~\\%~\\text{de }${n}$`;
			if (p==50) {
			texte_corr = `$${p}~\\%~\\text{de }${n}=${tex_fraction(1,2)}\\times${n}=${tex_nombre(Algebrite.eval(n/2))}$`				
			} else {
			texte_corr = `$${p}~\\%~\\text{de }${n}=${tex_fraction(p,100)}\\times${n}=(${p}\\times${n})\\div100=${tex_nombre(p*n)}\\div100=${tex_nombre(Algebrite.eval(p*n/100))}$`				
			}
			
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Valeur maximale',99999];	
}

/**
* Calculer la fracton d'un nombre divisible par le dénominateur
*
* Par défaut la division du nombre par le dénominateur est inférieure à 11
* @Auteur Rémi Angot
*/
function Fraction_d_un_nombre(max=11){
 	Exercice.call(this); // Héritage de la classe Exercice()
 	this.titre = "Calculer la fraction d'un nombre"
 	this.nb_questions = 5;
 	this.consigne = "Calculer"
 	this.spacing = 2;
 	this.spacing_corr = 2;
 	this.sup = max;

  	this.nouvelle_version = function(numero_de_l_exercice){
 		this.liste_questions = []; // Liste de questions
 		this.liste_corrections = []; // Liste de questions corrigées
 		liste_fractions = [[1,2],[1,3],[2,3],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],
 		[1,6],[5,6],[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[1,8],[3,8],[5,8],[7,8],
 		[1,9],[2,9],[4,9],[5,9],[7,9],[8,9],[1,10],[3,10],[7,10],[9,10]] // Couples de nombres premiers entre eux

  		for (let i = 0, a, b, k, n, fraction, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt<50;){
 			fraction = choice(liste_fractions);
 			a = fraction[0];
 			b = fraction[1];
 			k = randint(1,this.sup);
 			n = b*k; 
 			texte = `$${tex_fraction(a,b)}\\times${n}=$`;
 			if (a==1){
 				texte_corr = `$${tex_fraction(a,b)}\\times${n}=${n}\\div${b}=${Algebrite.eval(n/b)}$`;	      
 			} else {
 				texte_corr = `$${tex_fraction(a,b)}\\times${n}=(${n}\\div${b})\\times${a}=${Algebrite.eval(n/b)}\\times${a}=${Algebrite.eval(n/b*a)}$`;
 			}

 
  			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
 				this.liste_questions.push(texte);
 				this.liste_corrections.push(texte_corr);
 				i++;
 			}
 			cpt++;
 		}
 		liste_de_question_to_contenu(this);
 	}
 	this.besoin_formulaire_numerique = ['Valeur maximale',99999];	
 }


/**
* On achète 2 aliments dont on connait la masse (un en grammes et l'autre en kilogrammes) et le prix au kilogramme. Il faut calculer le prix total.
* @Auteur Rémi Angot
*/
function Probleme_course(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Problème - Les courses"
	this.consigne = ""
	this.spacing = 2;
	this.spacing_corr = 2;
	this.nb_questions = 1;
	this.nb_questions_modifiable = false ;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
			let prenom = choice(['Benjamin','Léa','Aude','Julie','Corinne','Mehdi','Joaquim']);
			let masse_en_kg_de_aliment1 = Algebrite.eval(randint(2,5)+randint(1,9)/10);
			let prix_aliment1 = Algebrite.eval(randint(2,4)+randint(1,9)/10);
			let aliment1 = choice(['courgettes','carottes','pommes']);
			let masse_en_g_de_aliment2 = randint(21,97)*10;
			let prix_aliment2 = Algebrite.eval(randint(12,23)+randint(1,9)/10);
			let aliment2 = choice(['boeuf','veau','poulet']); 

			texte = `${prenom} achète ${tex_nombre(masse_en_kg_de_aliment1)} kg de ${aliment1} à ${tex_prix(prix_aliment1)} €/kg `
			texte += `et ${masse_en_g_de_aliment2} g de ${aliment2} à ${tex_prix(prix_aliment2)} €/kg. Quel est le prix total à payer ?`
			texte_corr = `Prix des ${aliment1} : ${tex_nombre(masse_en_kg_de_aliment1)} kg × ${tex_prix(prix_aliment1)} €/kg = ${tex_prix(Algebrite.eval(masse_en_kg_de_aliment1*prix_aliment1))} €`+'<br>'
			texte_corr += `Prix du ${aliment2} : ${tex_nombre(Algebrite.eval(masse_en_g_de_aliment2/1000))} kg × ${tex_prix(prix_aliment2)} €/kg = ${tex_nombre(Algebrite.eval(masse_en_g_de_aliment2*prix_aliment2/1000))} € `+'<br>'
			texte_corr += `Prix total à payer : ${tex_nombre(Algebrite.eval(masse_en_kg_de_aliment1*prix_aliment1))} € + ${tex_nombre(Algebrite.eval(masse_en_g_de_aliment2*prix_aliment2/1000))} € ≈ ${arrondi_virgule(Algebrite.eval(masse_en_kg_de_aliment1*prix_aliment1+masse_en_g_de_aliment2*prix_aliment2/1000))} €<br>`
			texte_corr += `<br><i>Le prix total aurait aussi pu être trouvé en un seul calcul</i> : ${tex_nombre(masse_en_kg_de_aliment1)} kg × ${tex_prix(prix_aliment1)} €/kg + ${tex_nombre(Algebrite.eval(masse_en_g_de_aliment2/1000))} kg × ${tex_prix(prix_aliment2)} €/kg ≈ ${arrondi_virgule(Algebrite.eval(masse_en_kg_de_aliment1*prix_aliment1+masse_en_g_de_aliment2*prix_aliment2/1000))} €.`

			
			if (!sortie_html) {
				texte_corr = `Prix des ${aliment1} : $${tex_nombre(masse_en_kg_de_aliment1)}~\\text{kg}\\times${tex_prix(prix_aliment1)}~\\text{\\euro{}/kg} = ${tex_prix(Algebrite.eval(masse_en_kg_de_aliment1*prix_aliment1))}~\\text{\\euro}$`+'<br>'
				texte_corr += `Prix du ${aliment2} : $${tex_nombre(Algebrite.eval(masse_en_g_de_aliment2/1000))}~\\text{kg}\\times${tex_prix(prix_aliment2)}~\\text{\\euro{}/kg} = ${tex_nombre(Algebrite.eval(masse_en_g_de_aliment2*prix_aliment2/1000))}~\\text{\\euro}$`+'<br>'
				texte_corr += `Prix total à payer : $${tex_nombre(Algebrite.eval(masse_en_kg_de_aliment1*prix_aliment1))}~\\text{\\euro} + ${tex_nombre(Algebrite.eval(masse_en_g_de_aliment2*prix_aliment2/1000))}~\\text{\\euro} \\approx ${arrondi_virgule(Algebrite.eval(masse_en_kg_de_aliment1*prix_aliment1+masse_en_g_de_aliment2*prix_aliment2/1000))}~\\text{\\euro}$<br>`
				
			}

			this.liste_questions.push(texte);
			this.liste_corrections.push(texte_corr);
			
			liste_de_question_to_contenu_sans_numero(this);
	}	
}

/**
* Calculer l'aire de 3 triangles dont une hauteur est tracée.
*
* Une figure dynamique est disponible sur laquelle on peut déplacer le pied de la hauteur.
*
* Il n'existe pas de version LaTeX de cet exercice.
* @Auteur Rémi Angot
*/
function Aire_de_triangles(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.pas_de_version_LaTeX = true ;
	this.titre = "Aires de triangles"
	this.consigne = "Calculer l'aire des 3 triangles suivants (vous pouvez déplacer certains points)."
	this.spacing = 2;
	sortie_html ? this.spacing_corr = 3 : this.spacing_corr = 2;
	this.nb_questions = 1;
	this.nb_questions_modifiable = false ;
	this.type_exercice = 'MG32';
	this.taille_div_MG32 = [500,450];


	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_corrections = []; // Liste de questions corrigées
		let tableau_des_cotes = shuffle ([3,4,5,6,7]); //pour s'assurer que les 3 côtés sont différents
		let c1 = tableau_des_cotes[0];
		let c2 = tableau_des_cotes[1];
		let c3 = tableau_des_cotes[2];
		let tableau_des_hauteurs = shuffle ([3,4,5,6]); //pour s'assurer que les 3 hauteurs sont différents
		let h1 = tableau_des_hauteurs[0];
		let h2 = tableau_des_hauteurs[1];
		let h3 = tableau_des_hauteurs[2];
		
		let codeBase64 =""
		if (randint(1,2)==1) {
			codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAL2AAACOAAAAQEAAAABAAAABgAQTG9uZ3VldXJPcmllbnRlZQArIzE6IExlIHByZW1pZXIgcG9pbnQKIzI6IExlIGRldXhpw6htZSBwb2ludAAAAAIAAAADAAAAAAn#####AAAAAQARQ0VsZW1lbnRHZW5lcmlxdWUAAUEAAAAA#####wAAAAAAAUIAAAAA##########8AAAABABRDRHJvaXRlRGlyZWN0aW9uRml4ZQD#####AAAAAAEQAAABAAEAAAAAAT#wAAAAAAAA#####wAAAAEAD0NQb2ludExpZURyb2l0ZQD#####AAAAAAAQAAJXJwAAAAAAAAAAAEAIAAAAAAAABQABQGDAAAAAAAAAAAAC#####wAAAAEACENTZWdtZW50Af####8AAAAAABAAAAEAAQAAAAAAAAAB#####wAAAAIAE0NNZXN1cmVBbmdsZU9yaWVudGUA#####wAEYW5nJwAAAAMAAAAAAAAAAf####8AAAABAAlDTG9uZ3VldXIB#####wAAAAAAAAAB#####wAAAAEAB0NNaWxpZXUA#####wAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAAAAAAAB#####wAAAAEAD0NWYWxldXJBZmZpY2hlZQH#####AAAAAABAAAAAAAAAAMAAAAAAAAAAAAAABxAAAAAAAAEAAAAC#####wAAAAEAD0NSZXN1bHRhdFZhbGV1cgAAAAUAAAAAAgAAAAYAAAABAAAAuP####8AAAABAApDQ2FsY0NvbnN0AP####8AAnBpABYzLjE0MTU5MjY1MzU4OTc5MzIzODQ2#####wAAAAEACkNDb25zdGFudGVACSH7VEQtGP####8AAAABAApDUG9pbnRCYXNlAP####8BAAAAAA4AAVUAwCQAAAAAAABAEAAAAAAAAAUAAEAsZmZmZmZmQCxmZmZmZmYAAAABAP####8BAAAAABAAAAEAAQAAAAEBP#AAAAAAAAAAAAACAP####8BAAAAAA4AAVYAwAAAAAAAAABAEAAAAAAAAAUAAUA8ZmZmZmZmAAAAAgAAAAMA#####wEAAAAAEAAAAQABAAAAAQAAAAMAAAAGAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAABAAAAA#####8AAAACAAxDQ29tbWVudGFpcmUA#####wEAAAAAAAAAAAAAAABAGAAAAAAAAAAAAAUMAAAAAAABAAAAAAAAAAoAAAAAAAAAAAABMQAAAAUA#####wAAAAEAAAAD#####wAAAAEAB0NDYWxjdWwA#####wACYzEAATQAAAAKQBAAAAAAAAAAAAANAP####8AAmgxAAE0AAAACkAQAAAAAAAAAAAADQD#####AAJjMgABNQAAAApAFAAAAAAAAAAAAA0A#####wACaDIAATQAAAAKQBAAAAAAAAAAAAANAP####8AAmMzAAE1AAAACkAUAAAAAAAAAAAADQD#####AAJoMwABNAAAAApAEAAAAAAAAAAAAAsA#####wAAAAAAEAABQQDAKgAAAAAAAD#wAAAAAAAAAwABQDwAAAAAAABAYSAAAAAAAP####8AAAABABRDSW1wbGVtZW50YXRpb25Qcm90bwD#####ABtTZWdtZW50IGRlIGxvbmd1ZXVyIGRvbm7DqWUAAAABAAAAAgAAAAIAAAAIAAAADv####8AAAACAAlDQ2VyY2xlT1IAAAAADwEAAAAAAQAAAA4AAAAIAAAACAD#####AAAAAQAPQ1BvaW50TGllQ2VyY2xlAQAAAA8AAAAAABAAAUIAwBgAAAAAAABAFAAAAAAAAAMAAUAXmRub7wU+AAAAEAAAAAMBAAAADwAAAAAAEAAAAQABAAAADgAAABEAAAACAP####8AAAAAABAAAUgAwCYAAAAAAABAFAAAAAAAAAMAAT#nUJEwLKgdAAAAEv####8AAAABABZDRHJvaXRlUGVycGVuZGljdWxhaXJlAP####8BAAAAABAAAAEAAQAAABMAAAASAAAADwD#####AQAAAAABAAAAEwAAAAgAAAAJAP####8AAAABABBDSW50RHJvaXRlQ2VyY2xlAP####8AAAAUAAAAFf####8AAAABABBDUG9pbnRMaWVCaXBvaW50AP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAAAwABAAAAFgAAABMA#####wAAAAAAEAABQwC#8AAAAAAAAMA7AAAAAAAAAwACAAAAFgAAAAMA#####wAAAAAAEAAAAQABAAAADgAAABgAAAADAP####8AAAAAABAAAAEAAQAAABgAAAARAAAAAwD#####AAAAAAAQAAABAQEAAAATAAAAGAAAAAsA#####wAAAAAAEAABRADAJgAAAAAAAMA7AAAAAAAAAwABQHpQAAAAAABATYAAAAAAAAAAAA4A#####wAbU2VnbWVudCBkZSBsb25ndWV1ciBkb25uw6llAAAAAQAAAAIAAAACAAAACgAAABwAAAAPAAAAAB0BAAAAAAEAAAAcAAAACAAAAAoAAAAAEAEAAAAdAAAAAAAQAAFFAMAyAAAAAAAAwDAAAAAAAAADAAFADDWm90SREAAAAB4AAAADAQAAAB0AAAAAABAAAAEAAQAAABwAAAAfAAAAAgD#####AAAAAAAQAAFHAMAkAAAAAAAAQBAAAAAAAAADAAE#5pq7A1eUfwAAACAAAAARAP####8BAAAAABAAAAEAAQAAACEAAAAgAAAADwD#####AQAAAAABAAAAIQAAAAgAAAALAAAAABIA#####wAAACIAAAAjAAAAEwD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAMAAQAAACQAAAATAP####8AAAAAABAAAUYAwBAAAAAAAABAIAAAAAAAAAMAAgAAACQAAAADAP####8AAAAAABAAAAEAAQAAABwAAAAmAAAAAwD#####AAAAAAAQAAABAAEAAAAmAAAAHwAAAAMA#####wAAAAAAEAAAAQEBAAAAIQAAACYAAAAOAP####8AEk1lc3VyZSBkZSBsb25ndWV1cgAAAAUAAAABAAAAAgAAABMAAAAY#####wAAAAEAC0NNZWRpYXRyaWNlAAAAACoBAAAAAA0AAAEAAQAAABMAAAAYAAAABgAAAAAqAQAAAAANAAABBQAAAAATAAAAGAAAAA8AAAAAKgEAAAAAAQAAACwAAAAKQDAAAAAAAAABAAAAEgAAAAAqAAAAKwAAAC0AAAATAAAAACoBAAAAAA0AAAEFAAEAAAAuAAAABQEAAAAqAAAAEwAAABgAAAAOAP####8AEk1lc3VyZSBkZSBsb25ndWV1cgAAAAUAAAABAAAAAgAAACEAAAAmAAAAFAAAAAAxAQAAAAANAAABAAEAAAAhAAAAJgAAAAYAAAAAMQEAAAAADQAAAQUAAAAAIQAAACYAAAAPAAAAADEBAAAAAAEAAAAzAAAACkAwAAAAAAAAAQAAABIAAAAAMQAAADIAAAA0AAAAEwAAAAAxAQAAAAANAAABBQABAAAANQAAAAUBAAAAMQAAACEAAAAmAAAACwD#####AAAAAAAQAAFNAMAoAAAAAAAAQBAAAAAAAAADAAFAS4AAAAAAAEBywAAAAAAAAAAADgD#####ABtTZWdtZW50IGRlIGxvbmd1ZXVyIGRvbm7DqWUAAAABAAAAAgAAAAIAAAAMAAAAOAAAAA8AAAAAOQEAAAAAAQAAADgAAAAIAAAADAAAAAAQAQAAADkAAAAAABAAAU4AwCIAAAAAAABACAAAAAAAAAMAAUAXx81SzkwjAAAAOgAAAAMBAAAAOQAAAAAAEAAAAQABAAAAOAAAADv#####AAAAAQAJQ0Ryb2l0ZUFCAP####8BAAAAABAAAAEAAQAAADgAAAA7AAAAAgD#####AAAAAAAQAAFJAAAAAAAAAAAAQAgAAAAAAAADAAE#99qox0vglgAAAD0AAAARAP####8BAAAAABAAAAEAAQAAAD4AAAA9AAAADwD#####AQAAAAABAAAAPgAAAAgAAAANAAAAABIA#####wAAAD8AAABAAAAAEwD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAMAAQAAAEEAAAATAP####8AAAAAABAAAU8AwAgAAAAAAADAPAAAAAAAAAMAAgAAAEEAAAADAP####8AAAAAABAAAAEAAQAAADsAAABDAAAAAwD#####AAAAAAAQAAABAAEAAABDAAAAOAAAAAMA#####wAAAAAAEAAAAQEBAAAAOwAAAD4AAAADAP####8AAAAAABAAAAEBAQAAAD4AAABD#####wAAAAIAF0NNYXJxdWVBbmdsZUdlb21ldHJpcXVlAP####8AAAAAAAEAAAABQDAAAAAAAAAAAABDAAAAPgAAADsAAAAWAP####8AAAAAAAEAAAABQDAAAAAAAAAAAAAYAAAAEwAAAA4AAAAWAP####8AAAAAAAEAAAABQDAAAAAAAAAAAAAmAAAAIQAAABwAAAAOAP####8AEk1lc3VyZSBkZSBsb25ndWV1cgAAAAUAAAABAAAAAgAAAD4AAABDAAAAFAAAAABLAQAAAAANAAABAAEAAAA+AAAAQwAAAAYAAAAASwEAAAAADQAAAQUAAAAAPgAAAEMAAAAPAAAAAEsBAAAAAAEAAABNAAAACkAwAAAAAAAAAQAAABIAAAAASwAAAEwAAABOAAAAEwAAAABLAQAAAAANAAABBQABAAAATwAAAAUBAAAASwAAAD4AAABDAAAADgD#####ABBMb25ndWV1ck9yaWVudGVlAAAABAAAAAMAAAACAAAAEwAAABgAAAABAAAAAFIAAAAAARAAAAEAAQAAABMBP#AAAAAAAAAAAAACAAAAAFIAAAAAABAAAlcnAAAAAAAAAAAAQAgAAAAAAAAFAAFAYMAAAAAAAAAAAFMAAAADAQAAAFIAAAAAABAAAAEBAQAAABMAAAAYAAAABAAAAABSAARhbmcnAAAAVAAAABMAAAAYAAAABQEAAABSAAAAEwAAABgAAAAGAAAAAFIAAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAATAAAAGAAAAAcBAAAAUgAAAAAAQAAAAAAAAADAAAAAAAAAAAAAAFgQAAAAAAABAAAAAgAAAAgAAABWAAAAAyBjbQIAAABXAAAADgD#####ABBMb25ndWV1ck9yaWVudGVlAAAABAAAAAMAAAACAAAAIQAAACYAAAABAAAAAFoAAAAAARAAAAEAAQAAACEBP#AAAAAAAAAAAAACAAAAAFoAAAAAABAAAlcnAAAAAAAAAAAAQAgAAAAAAAAFAAFAYMAAAAAAAAAAAFsAAAADAQAAAFoAAAAAABAAAAEBAQAAACEAAAAmAAAABAAAAABaAARhbmcnAAAAXAAAACEAAAAmAAAABQEAAABaAAAAIQAAACYAAAAGAAAAAFoAAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAhAAAAJgAAAAcBAAAAWgAAAAAAQAAAAAAAAADAAAAAAAAAAAAAAGAQAAAAAAABAAAAAgAAAAgAAABeAAAAAyBjbQIAAABfAAAADgD#####ABBMb25ndWV1ck9yaWVudGVlAAAAAwAAAAIAAAACAAAAOwAAAEMAAAABAAAAAGIAAAAAARAAAAEAAQAAADsBP#AAAAAAAAAAAAACAAAAAGIAAAAAABAAAlcnAAAAAAAAAAAAQAgAAAAAAAAFAAFAYMAAAAAAAAAAAGMAAAADAQAAAGIAAAAAABAAAAEAAQAAADsAAABDAAAABAAAAABiAARhbmcnAAAAZAAAADsAAABDAAAABQEAAABiAAAAOwAAAEMAAAAOAP####8AEExvbmd1ZXVyT3JpZW50ZWUAAAAEAAAAAwAAAAIAAAA+AAAAQwAAAAEAAAAAaAAAAAABEAAAAQABAAAAPgE#8AAAAAAAAAAAAAIAAAAAaAAAAAAAEAACVycAAAAAAAAAAABACAAAAAAAAAUAAUBgwAAAAAAAAAAAaQAAAAMBAAAAaAAAAAAAEAAAAQEBAAAAPgAAAEMAAAAEAAAAAGgABGFuZycAAABqAAAAPgAAAEMAAAAFAQAAAGgAAAA+AAAAQwAAAAYAAAAAaAAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAD4AAABDAAAABwEAAABoAAAAAABAMAAAAAAAAEAQAAAAAAAAAAAAbhAAAAAAAAEAAAACAAAACAAAAGwAAAADIGNtAgAAAG0AAAAOAP####8AEExvbmd1ZXVyT3JpZW50ZWUAAAAEAAAAAwAAAAIAAAAOAAAAEQAAAAEAAAAAcAAAAAABEAAAAQABAAAADgE#8AAAAAAAAAAAAAIAAAAAcAAAAAAAEAACVycAAAAAAAAAAABACAAAAAAAAAUAAUBgwAAAAAAAAAAAcQAAAAMBAAAAcAAAAAAAEAAAAQABAAAADgAAABEAAAAEAAAAAHAABGFuZycAAAByAAAADgAAABEAAAAFAQAAAHAAAAAOAAAAEQAAAAYAAAAAcAAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAA4AAAARAAAABwEAAABwAAAAAADAJAAAAAAAAEAyAAAAAAAAAAAAdhAAAAAAAAEAAAACAAAACAAAAHQAAAADIGNtAgAAAHUAAAAOAP####8AEExvbmd1ZXVyT3JpZW50ZWUAAAAEAAAAAwAAAAIAAAAfAAAAHAAAAAEAAAAAeAAAAAABEAAAAQABAAAAHwE#8AAAAAAAAAAAAAIAAAAAeAAAAAAAEAACVycAAAAAAAAAAABACAAAAAAAAAUAAUBgwAAAAAAAAAAAeQAAAAMBAAAAeAAAAAAAEAAAAQABAAAAHwAAABwAAAAEAAAAAHgABGFuZycAAAB6AAAAHwAAABwAAAAFAQAAAHgAAAAfAAAAHAAAAAYAAAAAeAAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAB8AAAAcAAAABwEAAAB4AAAAAABAAAAAAAAAAMAAAAAAAAAAAAAAfhAAAAAAAAEAAAACAAAACAAAAHwAAAADIGNtAgAAAH0AAAAOAP####8AEExvbmd1ZXVyT3JpZW50ZWUAAAAEAAAAAwAAAAIAAAA4AAAAOwAAAAEAAAAAgAAAAAABEAAAAQABAAAAOAE#8AAAAAAAAAAAAAIAAAAAgAAAAAAAEAACVycAAAAAAAAAAABACAAAAAAAAAUAAUBgwAAAAAAAAAAAgQAAAAMBAAAAgAAAAAAAEAAAAQABAAAAOAAAADsAAAAEAAAAAIAABGFuZycAAACCAAAAOAAAADsAAAAFAQAAAIAAAAA4AAAAOwAAAAYAAAAAgAAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAADgAAAA7AAAABwEAAACAAAAAAADAJAAAAAAAAEAyAAAAAAAAAAAAhhAAAAAAAAEAAAACAAAACAAAAIQAAAADIGNtAgAAAIUAAAAOAP####8AEExvbmd1ZXVyT3JpZW50ZWUAAAAEAAAAAwAAAAIAAAAOAAAAGAAAAAEAAAAAiAAAAAABEAAAAQABAAAADgE#8AAAAAAAAAAAAAIAAAAAiAAAAAAAEAACVycAAAAAAAAAAABACAAAAAAAAAUAAUBgwAAAAAAAAAAAiQAAAAMBAAAAiAAAAAAAEAAAAQABAAAADgAAABgAAAAEAAAAAIgABGFuZycAAACKAAAADgAAABgAAAAFAQAAAIgAAAAOAAAAGAAAAAYAAAAAiAAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAA4AAAAYAAAABwEAAACIAAAAAABAAAAAAAAAAMAAAAAAAAAAAAAAjhAAAAAAAAEAAAACAAAACAAAAIwAAAADIGNtAQAAAI0AAAAOAP####8AEExvbmd1ZXVyT3JpZW50ZWUAAAAEAAAAAwAAAAIAAAARAAAAGAAAAAEAAAAAkAAAAAABEAAAAQABAAAAEQE#8AAAAAAAAAAAAAIAAAAAkAAAAAAAEAACVycAAAAAAAAAAABACAAAAAAAAAUAAUBgwAAAAAAAAAAAkQAAAAMBAAAAkAAAAAAAEAAAAQABAAAAEQAAABgAAAAEAAAAAJAABGFuZycAAACSAAAAEQAAABgAAAAFAQAAAJAAAAARAAAAGAAAAAYAAAAAkAAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAABEAAAAYAAAABwEAAACQAAAAAABAMQAAAAAAAD#wAAAAAAAAAAAAlhAAAAAAAAEAAAACAAAACAAAAJQAAAADIGNtAQAAAJUAAAAOAP####8AEExvbmd1ZXVyT3JpZW50ZWUAAAAEAAAAAwAAAAIAAAAfAAAAJgAAAAEAAAAAmAAAAAABEAAAAQABAAAAHwE#8AAAAAAAAAAAAAIAAAAAmAAAAAAAEAACVycAAAAAAAAAAABACAAAAAAAAAUAAUBgwAAAAAAAAAAAmQAAAAMBAAAAmAAAAAAAEAAAAQABAAAAHwAAACYAAAAEAAAAAJgABGFuZycAAACaAAAAHwAAACYAAAAFAQAAAJgAAAAfAAAAJgAAAAYAAAAAmAAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAB8AAAAmAAAABwEAAACYAAAAAADAMAAAAAAAAEAqAAAAAAAAAAAAnhAAAAAAAAEAAAACAAAACAAAAJwAAAADIGNtAQAAAJ0AAAAOAP####8AEExvbmd1ZXVyT3JpZW50ZWUAAAAEAAAAAwAAAAIAAAAmAAAAHAAAAAEAAAAAoAAAAAABEAAAAQABAAAAJgE#8AAAAAAAAAAAAAIAAAAAoAAAAAAAEAACVycAAAAAAAAAAABACAAAAAAAAAUAAUBgwAAAAAAAAAAAoQAAAAMBAAAAoAAAAAAAEAAAAQABAAAAJgAAABwAAAAEAAAAAKAABGFuZycAAACiAAAAJgAAABwAAAAFAQAAAKAAAAAmAAAAHAAAAAYAAAAAoAAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAACYAAAAcAAAABwEAAACgAAAAAABAMQAAAAAAAEAUAAAAAAAAAAAAphAAAAAAAAEAAAACAAAACAAAAKQAAAADIGNtAQAAAKUAAAAOAP####8AEExvbmd1ZXVyT3JpZW50ZWUAAAAEAAAAAwAAAAIAAAA4AAAAQwAAAAEAAAAAqAAAAAABEAAAAQABAAAAOAE#8AAAAAAAAAAAAAIAAAAAqAAAAAAAEAACVycAAAAAAAAAAABACAAAAAAAAAUAAUBgwAAAAAAAAAAAqQAAAAMBAAAAqAAAAAAAEAAAAQABAAAAOAAAAEMAAAAEAAAAAKgABGFuZycAAACqAAAAOAAAAEMAAAAFAQAAAKgAAAA4AAAAQwAAAAYAAAAAqAAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAADgAAABDAAAABwEAAACoAAAAAABAAAAAAAAAAMAAAAAAAAAAAAAArhAAAAAAAAEAAAACAAAACAAAAKwAAAADIGNtAQAAAK0AAAAOAP####8AEExvbmd1ZXVyT3JpZW50ZWUAAAAEAAAAAwAAAAIAAAA7AAAAQwAAAAEAAAAAsAAAAAABEAAAAQABAAAAOwE#8AAAAAAAAAAAAAIAAAAAsAAAAAAAEAACVycAAAAAAAAAAABACAAAAAAAAAUAAUBgwAAAAAAAAAAAsQAAAAMBAAAAsAAAAAAAEAAAAQABAAAAOwAAAEMAAAAEAAAAALAABGFuZycAAACyAAAAOwAAAEMAAAAFAQAAALAAAAA7AAAAQwAAAAYAAAAAsAAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAADsAAABDAAAABwEAAACwAAAAAABAAAAAAAAAAMAAAAAAAAAAAAAAthAAAAAAAAEAAAACAAAACAAAALQAAAADIGNtAQAAALUAAAAH##########8=";
		} else {
			codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAL2AAACOAAAAQEAAAABAAAABgAQTG9uZ3VldXJPcmllbnRlZQArIzE6IExlIHByZW1pZXIgcG9pbnQKIzI6IExlIGRldXhpw6htZSBwb2ludAAAAAIAAAADAAAAAAn#####AAAAAQARQ0VsZW1lbnRHZW5lcmlxdWUAAUEAAAAA#####wAAAAAAAUIAAAAA##########8AAAABABRDRHJvaXRlRGlyZWN0aW9uRml4ZQD#####AAAAAAEQAAABAAEAAAAAAT#wAAAAAAAA#####wAAAAEAD0NQb2ludExpZURyb2l0ZQD#####AAAAAAAQAAJXJwAAAAAAAAAAAEAIAAAAAAAABQABQGDAAAAAAAAAAAAC#####wAAAAEACENTZWdtZW50Af####8AAAAAABAAAAEAAQAAAAAAAAAB#####wAAAAIAE0NNZXN1cmVBbmdsZU9yaWVudGUA#####wAEYW5nJwAAAAMAAAAAAAAAAf####8AAAABAAlDTG9uZ3VldXIB#####wAAAAAAAAAB#####wAAAAEAB0NNaWxpZXUA#####wAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAAAAAAAB#####wAAAAEAD0NWYWxldXJBZmZpY2hlZQH#####AAAAAABAAAAAAAAAAMAAAAAAAAAAAAAABxAAAAAAAAEAAAAC#####wAAAAEAD0NSZXN1bHRhdFZhbGV1cgAAAAUAAAAAAgAAAAYAAAABAAAAw#####8AAAABAApDQ2FsY0NvbnN0AP####8AAnBpABYzLjE0MTU5MjY1MzU4OTc5MzIzODQ2#####wAAAAEACkNDb25zdGFudGVACSH7VEQtGP####8AAAABAApDUG9pbnRCYXNlAP####8BAAAAAA4AAVUAwCQAAAAAAABAEAAAAAAAAAUAAEAsZmZmZmZmQCxmZmZmZmYAAAABAP####8BAAAAABAAAAEAAQAAAAEBP#AAAAAAAAAAAAACAP####8BAAAAAA4AAVYAwAAAAAAAAABAEAAAAAAAAAUAAUA8ZmZmZmZmAAAAAgAAAAMA#####wEAAAAAEAAAAQABAAAAAQAAAAMAAAAGAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAABAAAAA#####8AAAACAAxDQ29tbWVudGFpcmUA#####wEAAAAAAAAAAAAAAABAGAAAAAAAAAAAAAUMAAAAAAABAAAAAAAAAAoAAAAAAAAAAAABMQAAAAUA#####wAAAAEAAAAD#####wAAAAEAB0NDYWxjdWwA#####wACYzEAATQAAAAKQBAAAAAAAAAAAAANAP####8AAmgxAAE0AAAACkAQAAAAAAAAAAAADQD#####AAJjMgABNQAAAApAFAAAAAAAAAAAAA0A#####wACaDIAATQAAAAKQBAAAAAAAAAAAAANAP####8AAmMzAAE1AAAACkAUAAAAAAAAAAAADQD#####AAJoMwABNAAAAApAEAAAAAAAAAAAAAsA#####wAAAAAAEAABQQDAMgAAAAAAAMAwAAAAAAAAAwABQFDAAAAAAABAQoAAAAAAAP####8AAAABABRDSW1wbGVtZW50YXRpb25Qcm90bwD#####ABtTZWdtZW50IGRlIGxvbmd1ZXVyIGRvbm7DqWUAAAABAAAAAgAAAAIAAAAIAAAADv####8AAAACAAlDQ2VyY2xlT1IAAAAADwEAAAAAAQAAAA4AAAAIAAAACAD#####AAAAAQAPQ1BvaW50TGllQ2VyY2xlAQAAAA8AAAAAABAAAUIAwDMAAAAAAADACAAAAAAAAAMAAUAS60sQO3OGAAAAEAAAAAMBAAAADwAAAAAAEAAAAQABAAAADgAAABEAAAACAP####8AAAAAABAAAUgAP#AAAAAAAAA#8AAAAAAAAAMAAT#ouymi+6YKAAAAEv####8AAAABABZDRHJvaXRlUGVycGVuZGljdWxhaXJlAP####8BAAAAABAAAAEAAQAAABMAAAASAAAADwD#####AQAAAAABAAAAEwAAAAgAAAAJAP####8AAAABABBDSW50RHJvaXRlQ2VyY2xlAP####8AAAAUAAAAFf####8AAAABABBDUG9pbnRMaWVCaXBvaW50AP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAAAwABAAAAFgAAABMA#####wAAAAAAEAABQwBAIAAAAAAAAMAoAAAAAAAAAwACAAAAFgAAAAMA#####wAAAAAAEAAAAQABAAAADgAAABgAAAADAP####8AAAAAABAAAAEAAQAAABgAAAARAAAAAwD#####AAAAAAAQAAABAQEAAAATAAAAGAAAAAsA#####wAAAAAAEAABRABAEAAAAAAAAAAAAAAAAAAAAwABQH0QAAAAAABAZGAAAAAAAAAAAA4A#####wAbU2VnbWVudCBkZSBsb25ndWV1ciBkb25uw6llAAAAAQAAAAIAAAACAAAACgAAABwAAAAPAAAAAB0BAAAAAAEAAAAcAAAACAAAAAoAAAAAEAEAAAAdAAAAAAAQAAFFAMAyAAAAAAAAwDAAAAAAAAADAAFAA5gUsW2nVQAAAB4AAAADAQAAAB0AAAAAABAAAAEAAQAAABwAAAAfAAAAAgD#####AAAAAAAQAAFHAMA3AAAAAAAAwCIAAAAAAAADAAE#5pq7A1eUfwAAACAAAAARAP####8BAAAAABAAAAEAAQAAACEAAAAgAAAADwD#####AQAAAAABAAAAIQAAAAgAAAALAAAAABIA#####wAAACIAAAAjAAAAEwD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAMAAQAAACQAAAATAP####8AAAAAABAAAUYAwDIAAAAAAAC#8AAAAAAAAAMAAgAAACQAAAADAP####8AAAAAABAAAAEAAQAAABwAAAAmAAAAAwD#####AAAAAAAQAAABAAEAAAAmAAAAHwAAAAMA#####wAAAAAAEAAAAQEBAAAAIQAAACYAAAAOAP####8AEk1lc3VyZSBkZSBsb25ndWV1cgAAAAUAAAABAAAAAgAAABMAAAAY#####wAAAAEAC0NNZWRpYXRyaWNlAAAAACoBAAAAAA0AAAEAAQAAABMAAAAYAAAABgAAAAAqAQAAAAANAAABBQAAAAATAAAAGAAAAA8AAAAAKgEAAAAAAQAAACwAAAAKQDAAAAAAAAABAAAAEgAAAAAqAAAAKwAAAC0AAAATAAAAACoBAAAAAA0AAAEFAAEAAAAuAAAABQEAAAAqAAAAEwAAABgAAAAOAP####8AEk1lc3VyZSBkZSBsb25ndWV1cgAAAAUAAAABAAAAAgAAACEAAAAmAAAAFAAAAAAxAQAAAAANAAABAAEAAAAhAAAAJgAAAAYAAAAAMQEAAAAADQAAAQUAAAAAIQAAACYAAAAPAAAAADEBAAAAAAEAAAAzAAAACkAwAAAAAAAAAQAAABIAAAAAMQAAADIAAAA0AAAAEwAAAAAxAQAAAAANAAABBQABAAAANQAAAAUBAAAAMQAAACEAAAAmAAAACwD#####AAAAAAAQAAFNAMAgAAAAAAAAwD0AAAAAAAADAAFAdBAAAAAAAEBwcAAAAAAAAAAADgD#####ABtTZWdtZW50IGRlIGxvbmd1ZXVyIGRvbm7DqWUAAAABAAAAAgAAAAIAAAAMAAAAOAAAAA8AAAAAOQEAAAAAAQAAADgAAAAIAAAADAAAAAAQAQAAADkAAAAAABAAAU4AwBwAAAAAAADAOgAAAAAAAAMAAUAJOHyA#SdXAAAAOgAAAAMBAAAAOQAAAAAAEAAAAQABAAAAOAAAADv#####AAAAAQAJQ0Ryb2l0ZUFCAP####8BAAAAABAAAAEAAQAAADgAAAA7AAAAAgD#####AAAAAAAQAAFJAMAIAAAAAAAAwDwAAAAAAAADAAE#99qox0vglgAAAD0AAAARAP####8BAAAAABAAAAEAAQAAAD4AAAA9AAAADwD#####AQAAAAABAAAAPgAAAAgAAAANAAAAABIA#####wAAAD8AAABAAAAAEwD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAMAAQAAAEEAAAATAP####8AAAAAABAAAU8AwBwAAAAAAABAHAAAAAAAAAMAAgAAAEEAAAADAP####8AAAAAABAAAAEAAQAAADsAAABDAAAAAwD#####AAAAAAAQAAABAAEAAABDAAAAOAAAAAMA#####wAAAAAAEAAAAQEBAAAAOwAAAD4AAAADAP####8AAAAAABAAAAEBAQAAAD4AAABD#####wAAAAIAF0NNYXJxdWVBbmdsZUdlb21ldHJpcXVlAP####8AAAAAAAEAAAABQDAAAAAAAAAAAABDAAAAPgAAADsAAAAWAP####8AAAAAAAEAAAABQDAAAAAAAAAAAAAYAAAAEwAAAA4AAAAWAP####8AAAAAAAEAAAABQDAAAAAAAAAAAAAmAAAAIQAAABwAAAAOAP####8AEk1lc3VyZSBkZSBsb25ndWV1cgAAAAUAAAABAAAAAgAAAD4AAABDAAAAFAAAAABLAQAAAAANAAABAAEAAAA+AAAAQwAAAAYAAAAASwEAAAAADQAAAQUAAAAAPgAAAEMAAAAPAAAAAEsBAAAAAAEAAABNAAAACkAwAAAAAAAAAQAAABIAAAAASwAAAEwAAABOAAAAEwAAAABLAQAAAAANAAABBQABAAAATwAAAAUBAAAASwAAAD4AAABDAAAADgD#####ABBMb25ndWV1ck9yaWVudGVlAAAABAAAAAMAAAACAAAAEwAAABgAAAABAAAAAFIAAAAAARAAAAEAAQAAABMBP#AAAAAAAAAAAAACAAAAAFIAAAAAABAAAlcnAAAAAAAAAAAAQAgAAAAAAAAFAAFAYMAAAAAAAAAAAFMAAAADAQAAAFIAAAAAABAAAAEBAQAAABMAAAAYAAAABAAAAABSAARhbmcnAAAAVAAAABMAAAAYAAAABQEAAABSAAAAEwAAABgAAAAGAAAAAFIAAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAATAAAAGAAAAAcBAAAAUgAAAAAAQAAAAAAAAADAAAAAAAAAAAAAAFgQAAAAAAABAAAAAgAAAAgAAABWAAAAAyBjbQIAAABXAAAADgD#####ABBMb25ndWV1ck9yaWVudGVlAAAAAwAAAAIAAAACAAAAIQAAACYAAAABAAAAAFoAAAAAARAAAAEAAQAAACEBP#AAAAAAAAAAAAACAAAAAFoAAAAAABAAAlcnAAAAAAAAAAAAQAgAAAAAAAAFAAFAYMAAAAAAAAAAAFsAAAADAQAAAFoAAAAAABAAAAEBAQAAACEAAAAmAAAABAAAAABaAARhbmcnAAAAXAAAACEAAAAmAAAABQEAAABaAAAAIQAAACYAAAAOAP####8AEExvbmd1ZXVyT3JpZW50ZWUAAAADAAAAAgAAAAIAAAA7AAAAQwAAAAEAAAAAYAAAAAABEAAAAQABAAAAOwE#8AAAAAAAAAAAAAIAAAAAYAAAAAAAEAACVycAAAAAAAAAAABACAAAAAAAAAUAAUBgwAAAAAAAAAAAYQAAAAMBAAAAYAAAAAAAEAAAAQABAAAAOwAAAEMAAAAEAAAAAGAABGFuZycAAABiAAAAOwAAAEMAAAAFAQAAAGAAAAA7AAAAQwAAAA4A#####wAQTG9uZ3VldXJPcmllbnRlZQAAAAQAAAADAAAAAgAAAD4AAABDAAAAAQAAAABmAAAAAAEQAAABAAEAAAA+AT#wAAAAAAAAAAAAAgAAAABmAAAAAAAQAAJXJwAAAAAAAAAAAEAIAAAAAAAABQABQGDAAAAAAAAAAABnAAAAAwEAAABmAAAAAAAQAAABAQEAAAA+AAAAQwAAAAQAAAAAZgAEYW5nJwAAAGgAAAA+AAAAQwAAAAUBAAAAZgAAAD4AAABDAAAABgAAAABmAAAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAPgAAAEMAAAAHAQAAAGYAAAAAAMAyAAAAAAAAwAgAAAAAAAAAAABsEAAAAAAAAQAAAAIAAAAIAAAAagAAAAMgY20CAAAAawAAAA4A#####wAQTG9uZ3VldXJPcmllbnRlZQAAAAQAAAADAAAAAgAAAA4AAAARAAAAAQAAAABuAAAAAAEQAAABAAEAAAAOAT#wAAAAAAAAAAAAAgAAAABuAAAAAAAQAAJXJwAAAAAAAAAAAEAIAAAAAAAABQABQGDAAAAAAAAAAABvAAAAAwEAAABuAAAAAAAQAAABAAEAAAAOAAAAEQAAAAQAAAAAbgAEYW5nJwAAAHAAAAAOAAAAEQAAAAUBAAAAbgAAAA4AAAARAAAABgAAAABuAAAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAADgAAABEAAAAHAQAAAG4AAAAAAMA2AAAAAAAAQDQAAAAAAAAAAAB0EAAAAAAAAQAAAAIAAAAIAAAAcgAAAAMgY20CAAAAcwAAAA4A#####wAQTG9uZ3VldXJPcmllbnRlZQAAAAQAAAADAAAAAgAAAB8AAAAcAAAAAQAAAAB2AAAAAAEQAAABAAEAAAAfAT#wAAAAAAAAAAAAAgAAAAB2AAAAAAAQAAJXJwAAAAAAAAAAAEAIAAAAAAAABQABQGDAAAAAAAAAAAB3AAAAAwEAAAB2AAAAAAAQAAABAAEAAAAfAAAAHAAAAAQAAAAAdgAEYW5nJwAAAHgAAAAfAAAAHAAAAAUBAAAAdgAAAB8AAAAcAAAABgAAAAB2AAAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAHwAAABwAAAAHAQAAAHYAAAAAAEAAAAAAAAAAwAAAAAAAAAAAAAB8EAAAAAAAAQAAAAIAAAAIAAAAegAAAAMgY20CAAAAewAAAA4A#####wAQTG9uZ3VldXJPcmllbnRlZQAAAAMAAAACAAAAAgAAADgAAAA7AAAAAQAAAAB+AAAAAAEQAAABAAEAAAA4AT#wAAAAAAAAAAAAAgAAAAB+AAAAAAAQAAJXJwAAAAAAAAAAAEAIAAAAAAAABQABQGDAAAAAAAAAAAB#AAAAAwEAAAB+AAAAAAAQAAABAAEAAAA4AAAAOwAAAAQAAAAAfgAEYW5nJwAAAIAAAAA4AAAAOwAAAAUBAAAAfgAAADgAAAA7AAAADgD#####ABBMb25ndWV1ck9yaWVudGVlAAAABAAAAAMAAAACAAAAOwAAADgAAAABAAAAAIQAAAAAARAAAAEAAQAAADsBP#AAAAAAAAAAAAACAAAAAIQAAAAAABAAAlcnAAAAAAAAAAAAQAgAAAAAAAAFAAFAYMAAAAAAAAAAAIUAAAADAQAAAIQAAAAAABAAAAEAAQAAADsAAAA4AAAABAAAAACEAARhbmcnAAAAhgAAADsAAAA4AAAABQEAAACEAAAAOwAAADgAAAAGAAAAAIQAAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAA7AAAAOAAAAAcBAAAAhAAAAAAAQAAAAAAAAADAAAAAAAAAAAAAAIoQAAAAAAABAAAAAgAAAAgAAACIAAAAAyBjbQIAAACJAAAADgD#####ABBMb25ndWV1ck9yaWVudGVlAAAABAAAAAMAAAACAAAAEQAAABgAAAABAAAAAIwAAAAAARAAAAEAAQAAABEBP#AAAAAAAAAAAAACAAAAAIwAAAAAABAAAlcnAAAAAAAAAAAAQAgAAAAAAAAFAAFAYMAAAAAAAAAAAI0AAAADAQAAAIwAAAAAABAAAAEAAQAAABEAAAAYAAAABAAAAACMAARhbmcnAAAAjgAAABEAAAAYAAAABQEAAACMAAAAEQAAABgAAAAGAAAAAIwAAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAARAAAAGAAAAAcBAAAAjAAAAAAAQBQAAAAAAABAMwAAAAAAAAAAAJIQAAAAAAABAAAAAgAAAAgAAACQAAAAAyBjbQEAAACRAAAADgD#####ABBMb25ndWV1ck9yaWVudGVlAAAABAAAAAMAAAACAAAADgAAABgAAAABAAAAAJQAAAAAARAAAAEAAQAAAA4BP#AAAAAAAAAAAAACAAAAAJQAAAAAABAAAlcnAAAAAAAAAAAAQAgAAAAAAAAFAAFAYMAAAAAAAAAAAJUAAAADAQAAAJQAAAAAABAAAAEAAQAAAA4AAAAYAAAABAAAAACUAARhbmcnAAAAlgAAAA4AAAAYAAAABQEAAACUAAAADgAAABgAAAAGAAAAAJQAAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAOAAAAGAAAAAcBAAAAlAAAAAAAQAAAAAAAAADAAAAAAAAAAAAAAJoQAAAAAAABAAAAAgAAAAgAAACYAAAAAyBjbQEAAACZAAAADgD#####ABBMb25ndWV1ck9yaWVudGVlAAAABAAAAAMAAAACAAAAJgAAAB8AAAABAAAAAJwAAAAAARAAAAEAAQAAACYBP#AAAAAAAAAAAAACAAAAAJwAAAAAABAAAlcnAAAAAAAAAAAAQAgAAAAAAAAFAAFAYMAAAAAAAAAAAJ0AAAADAQAAAJwAAAAAABAAAAEAAQAAACYAAAAfAAAABAAAAACcAARhbmcnAAAAngAAACYAAAAfAAAABQEAAACcAAAAJgAAAB8AAAAGAAAAAJwAAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAmAAAAHwAAAAcBAAAAnAAAAAAAQAAAAAAAAADAAAAAAAAAAAAAAKIQAAAAAAABAAAAAgAAAAgAAACgAAAAAyBjbQEAAAChAAAADgD#####ABBMb25ndWV1ck9yaWVudGVlAAAABAAAAAMAAAACAAAAJgAAABwAAAABAAAAAKQAAAAAARAAAAEAAQAAACYBP#AAAAAAAAAAAAACAAAAAKQAAAAAABAAAlcnAAAAAAAAAAAAQAgAAAAAAAAFAAFAYMAAAAAAAAAAAKUAAAADAQAAAKQAAAAAABAAAAEAAQAAACYAAAAcAAAABAAAAACkAARhbmcnAAAApgAAACYAAAAcAAAABQEAAACkAAAAJgAAABwAAAAGAAAAAKQAAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAmAAAAHAAAAAcBAAAApAAAAAAAQAgAAAAAAABAMwAAAAAAAAAAAKoQAAAAAAABAAAAAgAAAAgAAACoAAAAAyBjbQEAAACpAAAADgD#####ABBMb25ndWV1ck9yaWVudGVlAAAABAAAAAIAAAACAAAAJgAAACEAAAABAAAAAKwAAAAAARAAAAEAAQAAACYBP#AAAAAAAAAAAAACAAAAAKwAAAAAABAAAlcnAAAAAAAAAAAAQAgAAAAAAAAFAAFAYMAAAAAAAAAAAK0AAAAEAAAAAKwABGFuZycAAACuAAAAJgAAACEAAAAFAQAAAKwAAAAmAAAAIQAAAAYAAAAArAAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAACYAAAAhAAAABwEAAACsAAAAAABALgAAAAAAAEAmAAAAAAAAAAAAsRAAAAAAAAEAAAACAAAACAAAAK8AAAADIGNtAQAAALAAAAAOAP####8AEExvbmd1ZXVyT3JpZW50ZWUAAAAEAAAAAwAAAAIAAABDAAAAOwAAAAEAAAAAswAAAAABEAAAAQABAAAAQwE#8AAAAAAAAAAAAAIAAAAAswAAAAAAEAACVycAAAAAAAAAAABACAAAAAAAAAUAAUBgwAAAAAAAAAAAtAAAAAMBAAAAswAAAAAAEAAAAQABAAAAQwAAADsAAAAEAAAAALMABGFuZycAAAC1AAAAQwAAADsAAAAFAQAAALMAAABDAAAAOwAAAAYAAAAAswAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAEMAAAA7AAAABwEAAACzAAAAAABAAAAAAAAAAMAAAAAAAAAAAAAAuRAAAAAAAAEAAAACAAAACAAAALcAAAADIGNtAQAAALgAAAAOAP####8AEExvbmd1ZXVyT3JpZW50ZWUAAAAEAAAAAwAAAAIAAABDAAAAOAAAAAEAAAAAuwAAAAABEAAAAQABAAAAQwE#8AAAAAAAAAAAAAIAAAAAuwAAAAAAEAACVycAAAAAAAAAAABACAAAAAAAAAUAAUBgwAAAAAAAAAAAvAAAAAMBAAAAuwAAAAAAEAAAAQABAAAAQwAAADgAAAAEAAAAALsABGFuZycAAAC9AAAAQwAAADgAAAAFAQAAALsAAABDAAAAOAAAAAYAAAAAuwAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAEMAAAA4AAAABwEAAAC7AAAAAABAKAAAAAAAAEAsAAAAAAAAAAAAwRAAAAAAAAEAAAACAAAACAAAAL8AAAADIGNtAQAAAMAAAAAH##########8="
		}
		texte_corr=`$\\mathcal{A}_{ABC}=\\dfrac{1}{2}\\times AB\\times HC=\\dfrac{1}{2}\\times${c1}~\\text{cm}\\times ${h1}~\\text{cm}=${tex_nombre(Algebrite.eval(c1*h1/2))}~\\text{cm}^2$`	
		texte_corr+="<br>"
		texte_corr+=`$\\mathcal{A}_{DEF}=\\dfrac{1}{2}\\times DE\\times GF=\\dfrac{1}{2}\\times${c2}~\\text{cm}\\times ${h2}~\\text{cm}=${tex_nombre(Algebrite.eval(c2*h2/2))}~\\text{cm}^2$`	
		texte_corr+="<br>"
		texte_corr+=`$\\mathcal{A}_{ABC}=\\dfrac{1}{2}\\times MN\\times IO=\\dfrac{1}{2}\\times${c3}~\\text{cm}\\times ${h3}~\\text{cm}=${tex_nombre(Algebrite.eval(c3*h3/2))}~\\text{cm}^2$`	
		
		

		this.MG32codeBase64 = codeBase64
		this.MG32code_pour_modifier_la_figure = `
	        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "c1", "${c1}");
	        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "c2", "${c2}");
	        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "c3", "${c3}");
	        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "h1", "${h1}");
	        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "h2", "${h2}");
	        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "h3", "${h3}");
	        mtg32App.calculate("MG32svg${numero_de_l_exercice}");
	        mtg32App.display("MG32svg${numero_de_l_exercice}");
	      ` 	

		
			
		this.liste_corrections.push(texte_corr);
		liste_de_question_to_contenu(this);		
	}
}

/**
* 4 cercles sont tracés, 2 dont on connait le rayon et 2 dont on connait le diamètre.
* * 1 : Calculer le périmètre de cercles
* * 2 : Calculer l'aire de disques
* * 3 : Calculer le périmètre et l'aire de disques
*
* Pas de version LaTeX
* @Auteur Rémi Angot
*/
function Perimetre_aire_disques(pa=3){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.pas_de_version_LaTeX = true ;
	this.titre = "Périmètres et aires de disques"
	this.sup = pa ; // 1 : périmètre, 2 : aire, 3 : périmètres et aires
	this.spacing = 2;
	this.spacing_corr = 2;
	this.nb_questions = 1;
	this.nb_questions_modifiable = false ;
	this.type_exercice = 'MG32';
	this.taille_div_MG32 = [500,500];


	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_corrections = []; // Liste de questions corrigées
		let tableau_des_rayons = shuffle ([2,3,4,5,6,7,8]); //pour s'assurer que les 4 rayons sont différents
		let r1 = tableau_des_rayons[0];
		let r2 = tableau_des_rayons[1];
		let r3 = tableau_des_rayons[2];
		let r4 = tableau_des_rayons[3];
		if (this.sup==1){
			this.consigne = "Calculer le périmètre des 4 cercles suivants.";
		}
		if (this.sup==2) {
			this.consigne = "Calculer l'aire des 4 disques suivants.";
		}
		if (this.sup==3) {
			this.consigne = "Calculer le périmètre et l'aire des 4 disques suivants."
		}

		this.consigne += "</br>Donner la valeur exacte et une valeur approchée au dixième près."

		let codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAL2AAACOAAAAQEAAAAAAAAAAQAAAEv#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AQAAAAAOAAFPAMAoAAAAAAAAAAAAAAAAAAAFAAFACAAAAAAAAEB#UAAAAAAA#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABAAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUA8ZmZmZmZmAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAQAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAEAAAAQUAAQAAAAcAAAAJAP####8BAAAAAA4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQANQ1BvaW50QmFzZUVudAD#####AAAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAQAAAAoAAAAAAAAAAEAyAAAAAAAAAQEAAAARAP####8BAAAAABAAAUEAAAAAAAAAAABACAAAAAAAAAUAAQAAAAoAAAAAAAAAAEAwAAAAAAAAAQEAAAARAP####8BAAAAABAAAUIAAAAAAAAAAABACAAAAAAAAAUAAQAAAApAMQAAAAAAAEAwAAAAAAAAAQEAAAARAP####8BAAAAABAAAUMAAAAAAAAAAABACAAAAAAAAAUAAQAAAApAMQAAAAAAAAAAAAAAAAAAAQH#####AAAAAQAUQ0ltcGxlbWVudGF0aW9uUHJvdG8A#####wASTWVzdXJlIGRlIGxvbmd1ZXVyAAAABQAAAAIAAAACAAAAEAAAABH#####AAAAAQALQ01lZGlhdHJpY2UAAAAAEwEAAAAAEAAAAQABAAAAEAAAABH#####AAAAAQAHQ01pbGlldQAAAAATAQAAAAAQAAABBQAAAAAQAAAAEf####8AAAACAAlDQ2VyY2xlT1IAAAAAEwEAAAAAAQAAABUAAAABQDAAAAAAAAABAAAACAAAAAATAAAAFAAAABYAAAAJAAAAABMBAAAAABAAAAEFAAEAAAAXAAAAEAEAAAATAAAAEAAAABH#####AAAAAQAPQ1ZhbGV1ckFmZmljaGVlAQAAABMBAAAAAQAAABgRAAAAAAABAAAAAQAAAAEAAAAAAAAAAAAAAAABAAAAGQAAABIA#####wASTWVzdXJlIGRlIGxvbmd1ZXVyAAAABQAAAAIAAAACAAAAEgAAABEAAAATAAAAABsBAAAAABAAAAEAAQAAABIAAAARAAAAFAAAAAAbAQAAAAAQAAABBQAAAAASAAAAEQAAABUAAAAAGwEAAAAAAQAAAB0AAAABQDAAAAAAAAABAAAACAAAAAAbAAAAHAAAAB4AAAAJAAAAABsBAAAAABAAAAEFAAEAAAAfAAAAEAEAAAAbAAAAEgAAABEAAAAWAQAAABsBAAAAAQAAACARAAAAAAABAAAAAQAAAAEAAAAAAAAAAAAAAAABAAAAIf####8AAAABABBDUG9pbnREYW5zUmVwZXJlAP####8AAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAAAwAAAAAKAAAAAUAUAAAAAAAAAAAAAUAqAAAAAAAAAAAAFwD#####AAAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAMAAAAACgAAAAFAKgAAAAAAAAAAAAFAKgAAAAAAAAAAABcA#####wAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAADAAAAAAoAAAABQBQAAAAAAAAAAAABQBDMzMzMzM0AAAAXAP####8AAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAAAwAAAAAKAAAAAUAqAAAAAAAAAAAAAUAQzMzMzMzN#####wAAAAEAB0NDYWxjdWwA#####wACcjEAATgAAAABQCAAAAAAAAAAAAAYAP####8AAnIyAAE4AAAAAUAgAAAAAAAAAAAAGAD#####AAJyMwABOAAAAAFAIAAAAAAAAAAAABgA#####wACcjQAATgAAAABQCAAAAAAAAAAAAAVAP####8AAAAAAAEAAAAjAAAADQMAAAAOAAAAJwAAAAFAAAAAAAAAAAAAAAAVAP####8AAAAAAAEAAAAkAAAADQMAAAAOAAAAKAAAAAFAAAAAAAAAAAAAAAAVAP####8AAAAAAAEAAAAlAAAADQMAAAAOAAAAKQAAAAFAAAAAAAAAAAAAAAAVAP####8AAAAAAAEAAAAmAAAADQMAAAAOAAAAKgAAAAFAAAAAAAAAAAD#####AAAAAQAPQ1BvaW50TGllQ2VyY2xlAP####8AAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAAAwABP+2jc+MfDgIAAAArAAAAGQD#####AAAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAMAAT#oCnbou8r7AAAALgAAABkA#####wAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAADAAFAA2#XuqaBNQAAACwAAAAZAP####8AAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAAAwABQAUiuM2Ua#MAAAAt#####wAAAAEADUNEZW1pRHJvaXRlT0EA#####wEAAAAAEAAAAQABAAAAMQAAACQAAAAaAP####8BAAAAABAAAAEAAQAAADIAAAAl#####wAAAAEAI0NBdXRyZVBvaW50SW50ZXJzZWN0aW9uRHJvaXRlQ2VyY2xlAP####8AAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAAAwAAAAAsAAAAMwAAADEAAAAbAP####8AAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAAAwAAAAAtAAAANAAAADL#####AAAAAQAIQ1NlZ21lbnQA#####wAAAAAAEAAAAQEBAAAAIwAAAC8AAAAcAP####8AAAAAABAAAAEBAQAAADEAAAA1AAAAHAD#####AAAAAAAQAAABAQEAAAAyAAAANgAAABwA#####wAAAAAAEAAAAQEBAAAAJgAAADAAAAAUAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAAAwAAAAAjAAAALwAAABQA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAADAAAAACYAAAAwAAAAFgD#####AAAAAABAEAAAAAAAAEAUAAAAAAAAAAAAOxAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAyBjbQIAAAAnAAAAGAD#####AAJkMgAEMipyMgAAAA0CAAAAAUAAAAAAAAAAAAAADgAAACgAAAAYAP####8AAmQzAAQyKnIzAAAADQIAAAABQAAAAAAAAAAAAAAOAAAAKQAAABYA#####wAAAAAAQBQAAAAAAADALAAAAAAAAAAAACQQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAMgY20CAAAAPgAAABYA#####wAAAAAAQBAAAAAAAADAMQAAAAAAAAAAACUQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAMgY20CAAAAPwAAABYA#####wAAAAAAQBAAAAAAAABAAAAAAAAAAAAAADwQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAJjbQIAAAAqAAAAGQD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAMAAUAC6DhJtPdjAAAAKwAAABkA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAADAAE#54KANM#JugAAACwAAAAZAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAAAwABQAH6z0QhlKUAAAAtAAAAGQD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAMAAUABlMNYoHZ0AAAALv####8AAAACAAxDQ29tbWVudGFpcmUA#####wAAAAAAwDUAAAAAAADANwAAAAAAAAAAAEMQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAGQyNMKDEpAAAAHQD#####AAAAAABAGAAAAAAAAMAwAAAAAAAAAAAARBAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAZDI0woMikAAAAdAP####8AAAAAAMA3AAAAAAAAwDUAAAAAAAAAAABFEAAAAAAAAAAAAAAAAAABAAAAAAAAAAAABkMjTCgzKQAAAB0A#####wAAAAAAwDgAAAAAAADANQAAAAAAAAAAAEYQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAGQyNMKDQpAAAADv##########";
	//	let codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAH0AAAB9AAAAQEAAAAAAAAAAQAAAEv#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AQAAAAAOAAFPAMAoAAAAAAAAAAAAAAAAAAAFAAFACAAAAAAAAEB#UAAAAAAA#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABAAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUA8ZmZmZmZmAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAQAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAEAAAAQUAAQAAAAcAAAAJAP####8BAAAAAA4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQANQ1BvaW50QmFzZUVudAD#####AAAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAQAAAAoAAAAAAAAAAEAyAAAAAAAAAQEAAAARAP####8BAAAAABAAAUEAAAAAAAAAAABACAAAAAAAAAUAAQAAAAoAAAAAAAAAAEAwAAAAAAAAAQEAAAARAP####8BAAAAABAAAUIAAAAAAAAAAABACAAAAAAAAAUAAQAAAApAMQAAAAAAAEAwAAAAAAAAAQEAAAARAP####8BAAAAABAAAUMAAAAAAAAAAABACAAAAAAAAAUAAQAAAApAMQAAAAAAAAAAAAAAAAAAAQH#####AAAAAQAUQ0ltcGxlbWVudGF0aW9uUHJvdG8A#####wASTWVzdXJlIGRlIGxvbmd1ZXVyAAAABQAAAAIAAAACAAAAEAAAABH#####AAAAAQALQ01lZGlhdHJpY2UAAAAAEwEAAAAAEAAAAQABAAAAEAAAABH#####AAAAAQAHQ01pbGlldQAAAAATAQAAAAAQAAABBQAAAAAQAAAAEf####8AAAACAAlDQ2VyY2xlT1IAAAAAEwEAAAAAAQAAABUAAAABQDAAAAAAAAABAAAACAAAAAATAAAAFAAAABYAAAAJAAAAABMBAAAAABAAAAEFAAEAAAAXAAAAEAEAAAATAAAAEAAAABH#####AAAAAQAPQ1ZhbGV1ckFmZmljaGVlAQAAABMBAAAAAQAAABgRAAAAAAABAAAAAQAAAAEAAAAAAAAAAAAAAAABAAAAGQAAABIA#####wASTWVzdXJlIGRlIGxvbmd1ZXVyAAAABQAAAAIAAAACAAAAEgAAABEAAAATAAAAABsBAAAAABAAAAEAAQAAABIAAAARAAAAFAAAAAAbAQAAAAAQAAABBQAAAAASAAAAEQAAABUAAAAAGwEAAAAAAQAAAB0AAAABQDAAAAAAAAABAAAACAAAAAAbAAAAHAAAAB4AAAAJAAAAABsBAAAAABAAAAEFAAEAAAAfAAAAEAEAAAAbAAAAEgAAABEAAAAWAQAAABsBAAAAAQAAACARAAAAAAABAAAAAQAAAAEAAAAAAAAAAAAAAAABAAAAIf####8AAAABABBDUG9pbnREYW5zUmVwZXJlAP####8AAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAAAwAAAAAKAAAAAUAUAAAAAAAAAAAAAUAqAAAAAAAAAAAAFwD#####AAAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAMAAAAACgAAAAFAKgAAAAAAAAAAAAFAKgAAAAAAAAAAABcA#####wAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAADAAAAAAoAAAABQBQAAAAAAAAAAAABQBDMzMzMzM0AAAAXAP####8AAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAAAwAAAAAKAAAAAUAqAAAAAAAAAAAAAUAQzMzMzMzN#####wAAAAEAB0NDYWxjdWwA#####wACcjEAATgAAAABQCAAAAAAAAAAAAAYAP####8AAnIyAAE4AAAAAUAgAAAAAAAAAAAAGAD#####AAJyMwABOAAAAAFAIAAAAAAAAAAAABgA#####wACcjQAATgAAAABQCAAAAAAAAAAAAAVAP####8AAAAAAAEAAAAjAAAADQMAAAAOAAAAJwAAAAFAAAAAAAAAAAAAAAAVAP####8AAAAAAAEAAAAkAAAADQMAAAAOAAAAKAAAAAFAAAAAAAAAAAAAAAAVAP####8AAAAAAAEAAAAlAAAADQMAAAAOAAAAKQAAAAFAAAAAAAAAAAAAAAAVAP####8AAAAAAAEAAAAmAAAADQMAAAAOAAAAKgAAAAFAAAAAAAAAAAD#####AAAAAQAPQ1BvaW50TGllQ2VyY2xlAP####8AAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAAAwABP+2jc+MfDgIAAAArAAAAGQD#####AAAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAMAAT#oCnbou8r7AAAALgAAABkA#####wAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAADAAFAA2#XuqaBNQAAACwAAAAZAP####8AAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAAAwABQAUiuM2Ua#MAAAAt#####wAAAAEADUNEZW1pRHJvaXRlT0EA#####wEAAAAADQAAAQABAAAAMQAAACQAAAAaAP####8BAAAAAA0AAAEAAQAAADIAAAAl#####wAAAAEAI0NBdXRyZVBvaW50SW50ZXJzZWN0aW9uRHJvaXRlQ2VyY2xlAP####8AAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAAAwAAAAAsAAAAMwAAADEAAAAbAP####8AAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAAAwAAAAAtAAAANAAAADL#####AAAAAQAIQ1NlZ21lbnQA#####wAAAAAAEAAAAQEBAAAAIwAAAC8AAAAcAP####8AAAAAABAAAAEBAQAAADEAAAA1AAAAHAD#####AAAAAAAQAAABAQEAAAAyAAAANgAAABwA#####wAAAAAAEAAAAQEBAAAAJgAAADAAAAAUAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAAAwAAAAAjAAAALwAAABQA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAADAAAAACYAAAAwAAAAFgD#####AAAAAABAEAAAAAAAAEAUAAAAAAAAAAAAOxAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAyBjbQIAAAAnAAAAGAD#####AAJkMgAEMipyMgAAAA0CAAAAAUAAAAAAAAAAAAAADgAAACgAAAAYAP####8AAmQzAAQyKnIzAAAADQIAAAABQAAAAAAAAAAAAAAOAAAAKQAAABYA#####wAAAAAAQBQAAAAAAADALAAAAAAAAAAAACQQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAMgY20CAAAAPgAAABYA#####wAAAAAAQBAAAAAAAADAMQAAAAAAAAAAACUQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAMgY20CAAAAPwAAABYA#####wAAAAAAQBAAAAAAAABAAAAAAAAAAAAAADwQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAJjbQIAAAAqAAAAGQD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAMAAUAC6DhJtPdjAAAAKwAAABkA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAADAAE#54KANM#JugAAACwAAAAZAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAAAwABQAH6z0QhlKUAAAAtAAAAGQD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAMAAUABlMNYoHZ0AAAALv####8AAAACAAxDQ29tbWVudGFpcmUA#####wAAAAAAwDAAAAAAAADAMwAAAAAAAAAAAEMQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAPJFxtYXRoY2Fse0N9XzEkAAAAHQD#####AAAAAABAGAAAAAAAAMAwAAAAAAAAAAAARBAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAA8kXG1hdGhjYWx7Q31fMiQAAAAdAP####8AAAAAAMAyAAAAAAAAwDQAAAAAAAAAAABFEAAAAAAAAAAAAAAAAAABAAAAAAAAAAAADyRcbWF0aGNhbHtDfV8zJAAAAB0A#####wAAAAAAwDMAAAAAAADAMAAAAAAAAAAAAEYQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAPJFxtYXRoY2Fse0N9XzQkAAAADv##########";
	//  Si affichage LaTeX alors bug de MG32
		texte_corr=""	
		if (this.sup ==1) { //si on ne demande pas les aires
			texte_corr = `$\\mathcal{P}_1=2\\times${r1}\\times\\pi=${2*r1}\\pi\\approx${tex_nombre(arrondi(Algebrite.eval(2*r1*Math.PI),1))}$ cm<br>`
			texte_corr += `$\\mathcal{P}_2=${2*r2}\\times\\pi\\approx${tex_nombre(arrondi(Algebrite.eval(2*r2*Math.PI),1))}$ cm<br>`
			texte_corr += `$\\mathcal{P}_3=${2*r3}\\times\\pi\\approx${tex_nombre(arrondi(Algebrite.eval(2*r3*Math.PI),1))}$ cm<br>`
			texte_corr += `$\\mathcal{P}_4=2\\times${r4}\\times\\pi=${2*r4}\\pi\\approx${tex_nombre(arrondi(Algebrite.eval(2*r4*Math.PI),1))}$ cm<br>`
		}

		
		if (this.sup ==2){
			texte_corr += `$\\mathcal{A}_1=${r1}\\times${r1}\\times\\pi=${r1*r1}\\pi\\approx${tex_nombre(arrondi(Algebrite.eval(r1*r1*Math.PI),1))}~\\text{cm}^2$<br>`
			texte_corr += `Le diamètre de $\\mathcal{C}_2$ est ${2*r2} cm donc son rayon est ${r2} cm.<br>`
			texte_corr += `$\\mathcal{A}_2=${r2}\\times${r2}\\times\\pi=${r2*r2}\\pi\\approx${tex_nombre(arrondi(Algebrite.eval(r2*r2*Math.PI),1))}~\\text{cm}^2$<br>`
			texte_corr += `Le diamètre de $\\mathcal{C}_3$ est ${2*r3} cm donc son rayon est ${r3} cm.<br>`
			texte_corr += `$\\mathcal{A}_3=${r3}\\times${r3}\\times\\pi=${r3*r3}\\pi\\approx${tex_nombre(arrondi(Algebrite.eval(r3*r3*Math.PI),1))}~\\text{cm}^2$<br>`
			texte_corr += `$\\mathcal{A}_4=${r4}\\times${r4}\\times\\pi=${r4*r4}\\pi\\approx${tex_nombre(arrondi(Algebrite.eval(r4*r4*Math.PI),1))}~\\text{cm}^2$<br>`
		}

		if (this.sup == 3){
			texte_corr = `$\\mathcal{P}_1=2\\times${r1}\\times\\pi=${2*r1}\\pi\\approx${tex_nombre(arrondi(Algebrite.eval(2*r1*Math.PI),1))}$ cm<br>`
			texte_corr += `$\\mathcal{P}_2=${2*r2}\\times\\pi\\approx${tex_nombre(arrondi(Algebrite.eval(2*r2*Math.PI),1))}$ cm<br>`
			texte_corr += `$\\mathcal{P}_3=${2*r3}\\times\\pi\\approx${tex_nombre(arrondi(Algebrite.eval(2*r3*Math.PI),1))}$ cm<br>`
			texte_corr += `$\\mathcal{P}_4=2\\times${r4}\\times\\pi=${2*r4}\\pi\\approx${tex_nombre(arrondi(Algebrite.eval(2*r4*Math.PI),1))}$ cm<br>`
			
			texte_corr += `<br>`
			
			texte_corr += `$\\mathcal{A}_1=${r1}\\times${r1}\\times\\pi=${r1*r1}\\pi\\approx${tex_nombre(arrondi(Algebrite.eval(r1*r1*Math.PI),1))}~\\text{cm}^2$<br>`
			texte_corr += `Le diamètre de $\\mathcal{C}_2$ est ${2*r2} cm donc son rayon est ${r2} cm.<br>`
			texte_corr += `$\\mathcal{A}_2=${r2}\\times${r2}\\times\\pi=${r2*r2}\\pi\\approx${tex_nombre(arrondi(Algebrite.eval(r2*r2*Math.PI),1))}~\\text{cm}^2$<br>`
			texte_corr += `Le diamètre de $\\mathcal{C}_3$ est ${2*r3} cm donc son rayon est ${r3} cm.<br>`
			texte_corr += `$\\mathcal{A}_3=${r3}\\times${r3}\\times\\pi=${r3*r3}\\pi\\approx${tex_nombre(arrondi(Algebrite.eval(r3*r3*Math.PI),1))}~\\text{cm}^2$<br>`
			texte_corr += `$\\mathcal{A}_4=${r4}\\times${r4}\\times\\pi=${r4*r4}\\pi\\approx${tex_nombre(arrondi(Algebrite.eval(r4*r4*Math.PI),1))}~\\text{cm}^2$<br>`
		}
		

		this.MG32codeBase64 = codeBase64
		this.MG32code_pour_modifier_la_figure = `
	        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "r1", "${r1}");
	        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "r2", "${r2}");
	        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "r3", "${r3}");
	        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "r4", "${r4}");
	        mtg32App.calculate("MG32svg${numero_de_l_exercice}");
	        mtg32App.display("MG32svg${numero_de_l_exercice}");
	      ` 	
		
			
		this.liste_corrections.push(texte_corr);
		liste_de_question_to_contenu(this);		
	}

	this.besoin_formulaire_numerique = ['Niveau de difficulté',3,"1 : Périmètres\n\
2 : Aires\n3 : Périmètres et aires"];			
}


/**
* 3 figures sont données, 1 quart de disque, un demi-disque et un 3-quarts de disque
* * 1 : Calculer les périmètres 
* * 2 : Calculer les aires
* * 3 : Calculer les périmètres et aires
* Pas de version LaTeX
* @Auteur Rémi Angot
*/
function Perimetre_aire_et_portions_de_disques(pa=3){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.pas_de_version_LaTeX = true ;
	this.titre = "Périmètres et aires de portions de cercles"
	this.consigne = "Calculer le périmètre et l'aire de chacune des figures suivantes"
	this.sup = pa ; // 1 : périmètre, 2 : aire, 3 : périmètres et aires
	this.spacing = 2;
	sortie_html ? this.spacing_corr = 3 : this.spacing_corr = 2 ;
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;
	this.type_exercice = 'MG32';
	this.taille_div_MG32 = [600,450];


	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_corrections = []; // Liste de questions corrigées
		let r = randint(1,5);
		let r2 = randint(2,4);
		let r3 = randint(2,4);
		let figure = randint(1,2);
		let codeBase64 =""
		if (this.sup==1){
			this.consigne = "Calculer le périmètre de chacune des figures suivantes";
		}
		if (this.sup==2) {
			this.consigne = "Calculer l'aire de chacune des figures suivantes";
		}


		if (figure==1) {
			codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAIoAAACNQAAAQEAAAAAAAAAAQAAAE######AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAHQ0NhbGN1bAD#####AAJyMwABNgAAAAFAGAAAAAAAAP####8AAAABAApDUG9pbnRCYXNlAP####8BAAAAAA4AAVUAwCQAAAAAAABAEAAAAAAAAAUAAEAsZmZmZmZmQCxmZmZmZmb#####AAAAAQAUQ0Ryb2l0ZURpcmVjdGlvbkZpeGUA#####wEAAAAAEAAAAQABAAAAAgE#8AAAAAAAAP####8AAAABAA9DUG9pbnRMaWVEcm9pdGUA#####wEAAAAADgABVgDAAAAAAAAAAEAQAAAAAAAABQABQDxmZmZmZmYAAAAD#####wAAAAEACENTZWdtZW50AP####8BAAAAABAAAAEAAQAAAAIAAAAE#####wAAAAEAB0NNaWxpZXUA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAAIAAAAE#####wAAAAIADENDb21tZW50YWlyZQD#####AQAAAAAAAAAAAAAAAEAYAAAAAAAAAAAABgwAAAAAAAEAAAAAAAAAAQAAAAAAAAAAAAEx#####wAAAAEACUNMb25ndWV1cgD#####AAAAAgAAAAQAAAADAP####8BAAAAABAAAU8AAAAAAAAAAABACAAAAAAAAAMAAUBRQAAAAAAAQGQAAAAAAAAAAAACAP####8AAXIAATQAAAABQBAAAAAAAAAAAAAEAP####8BAAAAARAAAAEAAQAAAAkBP#AAAAAAAAD#####AAAAAgAJQ0NlcmNsZU9SAP####8BAAAAAAEAAAAJ#####wAAAAEAD0NSZXN1bHRhdFZhbGV1cgAAAAoA#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAsAAAAM#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAADAAIAAAANAAAADQD#####AQAAAAAQAAFBAAAAAAAAAAAAQAgAAAAAAAADAAEAAAAN#####wAAAAEADENBcmNEZUNlcmNsZQD#####AAAAAAABAAAACQAAAA######AAAAAUBWgAAAAAAAAAAABgD#####AAAAAAAQAAABAAEAAAAJAAAAD#####8AAAABABZDRHJvaXRlUGVycGVuZGljdWxhaXJlAP####8BAAAAABAAAAEAAQAAAAkAAAARAAAADAD#####AAAAEgAAABAAAAANAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAAAwABAAAAEwAAAA0A#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAADAAIAAAATAAAABgD#####AAAAAAAQAAABAAEAAAAVAAAACf####8AAAABABRDSW1wbGVtZW50YXRpb25Qcm90bwD#####ABJNZXN1cmUgZGUgbG9uZ3VldXIAAAAFAAAAAgAAAAIAAAAJAAAAD#####8AAAABAAtDTWVkaWF0cmljZQAAAAAXAQAAAAAQAAABAAEAAAAJAAAADwAAAAcAAAAAFwEAAAAAEAAAAQUAAAAACQAAAA8AAAAKAAAAABcBAAAAAAEAAAAZAAAAAUAwAAAAAAAAAQAAAAwAAAAAFwAAABgAAAAaAAAADQAAAAAXAQAAAAAQAAABBQABAAAAGwAAAAkBAAAAFwAAAAkAAAAP#####wAAAAEAD0NWYWxldXJBZmZpY2hlZQEAAAAXAAAAAAEAAAAcEQAAAAAAAQAAAAEAAAABAAAAAAAAAAAAAAADIGNtAQAAAB3#####AAAAAQAOQ01hcnF1ZVNlZ21lbnQA#####wAAAP8AAgEAAAAWAAAAEwD#####AAAA#wACAQAAABEAAAACAP####8AAnIyAAE1AAAAAUAUAAAAAAAAAAAACgD#####AQAA#wABAAAACf####8AAAABAApDT3BlcmF0aW9uAAAAABQAAAAACwAAAAoAAAALAAAAIQAAAAFAAAAAAAAAAAAAAAAMAP####8AAAALAAAAIgAAAA0A#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAADAAIAAAAjAAAADQD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAMAAQAAACMAAAAKAP####8BAAAAAAEAAAAlAAAACwAAACEAAAAADAD#####AAAACwAAACYAAAANAP####8BAAAAABAAAUIAAAAAAAAAAABACAAAAAAAAAMAAgAAACcAAAANAP####8BAAAAABAAAUMAAAAAAAAAAABACAAAAAAAAAMAAQAAACcAAAAOAP####8AAAAAAAEAAAAlAAAAKQAAACgAAAAGAP####8AAAAAABAAAAEAAQAAACgAAAApAAAAEAD#####ABJNZXN1cmUgZGUgbG9uZ3VldXIAAAAFAAAAAgAAAAIAAAAoAAAAKQAAABEAAAAALAEAAAAAEAAAAQABAAAAKAAAACkAAAAHAAAAACwBAAAAABAAAAEFAAAAACgAAAApAAAACgAAAAAsAQAAAAABAAAALgAAAAFAMAAAAAAAAAEAAAAMAAAAACwAAAAtAAAALwAAAA0AAAAALAEAAAAAEAAAAQUAAQAAADAAAAAJAQAAACwAAAAoAAAAKQAAABIBAAAALAAAAAABAAAAMREAAAAAAAEAAAABAAAAAQAAAAAAAAAAAAAAAyBjbQEAAAAyAAAABwD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAMAAAAACQAAACkAAAAPAP####8BAAAAABAAAAEAAQAAADQAAAArAAAACgD#####AQAAAAABAAAANAAAABQAAAAACwAAAAEAAAABQAAAAAAAAAAAAAAADAD#####AAAANQAAADYAAAANAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAAAwACAAAANwAAAA0A#####wEAAAAAEAABRQAAAAAAAAAAAEAIAAAAAAAAAwABAAAANwAAAAQA#####wEAAAABEAAAAQABAAAAOQE#8AAAAAAAAAAAAAoA#####wEAAAAAAQAAADkAAAALAAAAAQAAAAAMAP####8AAAA6AAAAOwAAAA0A#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAADAAIAAAA8AAAADQD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAMAAQAAADwAAAAMAP####8AAAA1AAAAOwAAAA0A#####wEAAAAAEAABRAAAAAAAAAAAAEAIAAAAAAAAAwACAAAAPwAAAA0A#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAADAAEAAAA######wAAAAEAEUNHcmFuZEFyY0RlQ2VyY2xlAP####8AAAAAAAEAAAA5AAAAPgAAAEAAAAAGAP####8AAAAAABAAAAEAAQAAAEAAAAA5AAAABgD#####AAAAAAAQAAABAAEAAAA5AAAAPgAAABMA#####wAAAP8AAgIAAABDAAAAEwD#####AAAA#wACAgAAAEQAAAAQAP####8AEk1lc3VyZSBkZSBsb25ndWV1cgAAAAUAAAACAAAAAgAAAEAAAAA5AAAAEQAAAABHAQAAAAAQAAABAAEAAABAAAAAOQAAAAcAAAAARwEAAAAAEAAAAQUAAAAAQAAAADkAAAAKAAAAAEcBAAAAAAEAAABJAAAAAUAwAAAAAAAAAQAAAAwAAAAARwAAAEgAAABKAAAADQAAAABHAQAAAAAQAAABBQABAAAASwAAAAkBAAAARwAAAEAAAAA5AAAAEgEAAABHAAAAAABARgAAAAAAAAAAAAAAAAAAAAAATBEAAAAAAAEAAAABAAAAAQAAAAAAAAAAAAAAAyBjbQEAAABNAAAACP##########"
			
			if (this.sup ==1) { //si on ne demande pas les aires
				texte_corr = `La première figure est un quart de disque, son périmètre est composé d'un quart de cercle de rayon ${r} cm et de 2 rayons qui ferment la figure.<br>`
				texte_corr += `$\\mathcal{P}_1=\\dfrac{1}{4}\\times2\\times${r}\\times\\pi+${r}+${r}=${tex_nombre(Algebrite.eval(r/2))}\\pi+${2*r}\\approx${tex_nombre(arrondi(Algebrite.eval(r/2*Math.PI+2*r),1))}$ cm<br>`
				texte_corr += `La deuxième figure est un demi-disque, son périmètre est composé d'un demi-cercle de diamètre ${2*r2} cm et d'un diamètre qui ferme la figure.<br>`
				texte_corr += `$\\mathcal{P}_2=\\dfrac{1}{2}\\times${2*r2}\\times\\pi+${2*r2}=${r2}\\pi+${2*r2}\\approx${tex_nombre(arrondi(Algebrite.eval(r2*Math.PI+2*r2),1))}$ cm<br>`
				texte_corr += `La troisième figure est trois quarts d'un disque, son périmètre est composé de trois quarts d'un cercle de rayon ${r3} cm et 2 rayons qui ferment la figure.<br>`
				texte_corr += `$\\mathcal{P}_3=\\dfrac{3}{4}\\times2\\times${r3}\\times\\pi+${r3}+${r3}=${tex_nombre(Algebrite.eval(6*r3/4))}\\pi+${2*r3}\\approx${tex_nombre(arrondi(Algebrite.eval(6*r3/4*Math.PI+2*r3),1))}$ cm<br>`
			}

			
			if (this.sup ==2){
				texte_corr = `La première figure est un quart de disque de rayon ${r} cm.<br>`
				texte_corr += `$\\mathcal{A}_1=\\dfrac{1}{4}\\times${r}\\times${r}\\times\\pi=${tex_nombre(Algebrite.eval(r*r/4))}\\pi\\approx${tex_nombre(arrondi(Algebrite.eval(r*r/4*Math.PI),1))}~\\text{cm}^2$<br>`
				texte_corr += `La deuxième figure est la moitié d'un disque de diamètre ${2*r2} cm donc de ${r2} cm de rayon.<br>`
				texte_corr += `$\\mathcal{A}_2=\\dfrac{1}{2}\\times${r2}\\times${r2}\\times\\pi=${tex_nombre(Algebrite.eval(r2*r2/2))}\\pi\\approx${tex_nombre(arrondi(Algebrite.eval(r2*r2/2*Math.PI),1))}~\\text{cm}^2$<br>`
				texte_corr += `La troisième figure est trois quarts d'un disque de rayon ${r3} cm.<br>`
				texte_corr += `$\\mathcal{A}_3=\\dfrac{3}{4}\\times${r3}\\times${r3}\\times\\pi=${tex_nombre(Algebrite.eval(3/4*r3*r3))}\\pi\\approx${tex_nombre(arrondi(Algebrite.eval(3/4*r3*r3*Math.PI),1))}~\\text{cm}^2$`
			}

			if (this.sup == 3){
				texte_corr = `La première figure est un quart de disque, son périmètre est composé d'un quart de cercle de rayon ${r} cm et de 2 rayons qui ferment la figure.<br>`
				texte_corr += `$\\mathcal{P}_1=\\dfrac{1}{4}\\times2\\times${r}\\times\\pi+${r}+${r}=${tex_nombre(Algebrite.eval(r/2))}\\pi+${2*r}\\approx${tex_nombre(arrondi(Algebrite.eval(r/2*Math.PI+2*r),1))}$ cm<br>`
				texte_corr += `La deuxième figure est un demi-disque, son périmètre est composé d'un demi-cercle de diamètre ${2*r2} cm et d'un diamètre qui ferme la figure.<br>`
				texte_corr += `$\\mathcal{P}_2=\\dfrac{1}{2}\\times${2*r2}\\times\\pi+${2*r2}=${r2}\\pi+${2*r2}\\approx${tex_nombre(arrondi(Algebrite.eval(r2*Math.PI+2*r2),1))}$ cm<br>`
				texte_corr += `La troisième figure est trois quarts d'un disque, son périmètre est composé de trois quarts d'un cercle de rayon ${r3} cm et 2 rayons qui ferment la figure.<br>`
				texte_corr += `$\\mathcal{P}_3=\\dfrac{3}{4}\\times2\\times${r3}\\times\\pi+${r3}+${r3}=${tex_nombre(Algebrite.eval(6*r3/4))}\\pi+${2*r3}\\approx${tex_nombre(arrondi(Algebrite.eval(6*r3/4*Math.PI+2*r3),1))}$ cm<br>`
				texte_corr += `La première figure est un quart de disque de rayon ${r} cm.<br>`
				texte_corr += `$\\mathcal{A}_1=\\dfrac{1}{4}\\times${r}\\times${r}\\times\\pi=${tex_nombre(Algebrite.eval(r*r/4))}\\pi\\approx${tex_nombre(arrondi(Algebrite.eval(r*r/4*Math.PI),1))}~\\text{cm}^2$<br>`
				texte_corr += `La deuxième figure est la moitié d'un disque de diamètre ${2*r2} cm donc de ${r2} cm de rayon.<br>`
				texte_corr += `$\\mathcal{A}_2=\\dfrac{1}{2}\\times${r2}\\times${r2}\\times\\pi=${tex_nombre(Algebrite.eval(r2*r2/2))}\\pi\\approx${tex_nombre(arrondi(Algebrite.eval(r2*r2/2*Math.PI),1))}~\\text{cm}^2$<br>`
				texte_corr += `La troisième figure est trois quarts d'un disque de rayon ${r3} cm.<br>`
				texte_corr += `$\\mathcal{A}_3=\\dfrac{3}{4}\\times${r3}\\times${r3}\\times\\pi=${tex_nombre(Algebrite.eval(3/4*r3*r3))}\\pi\\approx${tex_nombre(arrondi(Algebrite.eval(3/4*r3*r3*Math.PI),1))}~\\text{cm}^2$`
			}
		}
		else {
			codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAL2AAACOAAAAQEAAAAAAAAAAQAAAGX#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAHQ0NhbGN1bAD#####AAJyMwABNgAAAAFAGAAAAAAAAP####8AAAABAApDUG9pbnRCYXNlAP####8BAAAAAA4AAVUAwCQAAAAAAABAEAAAAAAAAAUAAEAsZmZmZmZmQCxmZmZmZmb#####AAAAAQAUQ0Ryb2l0ZURpcmVjdGlvbkZpeGUA#####wEAAAAAEAAAAQABAAAAAgE#8AAAAAAAAP####8AAAABAA9DUG9pbnRMaWVEcm9pdGUA#####wEAAAAADgABVgDAAAAAAAAAAEAQAAAAAAAABQABQDxmZmZmZmYAAAAD#####wAAAAEACENTZWdtZW50AP####8BAAAAABAAAAEAAQAAAAIAAAAE#####wAAAAEAB0NNaWxpZXUA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAAIAAAAE#####wAAAAIADENDb21tZW50YWlyZQD#####AQAAAAAAAAAAAAAAAEAYAAAAAAAAAAAABgwAAAAAAAEAAAAAAAAAAQAAAAAAAAAAAAEx#####wAAAAEACUNMb25ndWV1cgD#####AAAAAgAAAAQAAAADAP####8BAAAAABAAAU8AAAAAAAAAAABACAAAAAAAAAMAAUBRQAAAAAAAQGQAAAAAAAAAAAACAP####8AAXIAATQAAAABQBAAAAAAAAAAAAAEAP####8BAAAAARAAAAEAAQAAAAkBP#AAAAAAAAD#####AAAAAgAJQ0NlcmNsZU9SAP####8BAAAAAAEAAAAJ#####wAAAAEAD0NSZXN1bHRhdFZhbGV1cgAAAAoA#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAsAAAAM#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAADAAIAAAANAAAADQD#####AQAAAAAQAAFBAAAAAAAAAAAAQAgAAAAAAAADAAEAAAANAAAABgD#####AAAAAAAQAAABAAEAAAAJAAAAD#####8AAAABABZDRHJvaXRlUGVycGVuZGljdWxhaXJlAP####8BAAAAABAAAAEAAQAAAAkAAAAQ#####wAAAAEAFENJbXBsZW1lbnRhdGlvblByb3RvAP####8AEk1lc3VyZSBkZSBsb25ndWV1cgAAAAUAAAACAAAAAgAAAAkAAAAP#####wAAAAEAC0NNZWRpYXRyaWNlAAAAABIBAAAAABAAAAEAAQAAAAkAAAAPAAAABwAAAAASAQAAAAAQAAABBQAAAAAJAAAADwAAAAoAAAAAEgEAAAAAAQAAABQAAAABQDAAAAAAAAABAAAADAAAAAASAAAAEwAAABUAAAANAAAAABIBAAAAABAAAAEFAAEAAAAWAAAACQEAAAASAAAACQAAAA######AAAAAQAPQ1ZhbGV1ckFmZmljaGVlAQAAABIAAAAAAQAAABcRAAAAAAABAAAAAQAAAAEAAAAAAAAAAAAAAAMgY20BAAAAGAAAAAIA#####wACcjIAATQAAAABQBAAAAAAAAAAAAAKAP####8BAAD#AAEAAAAJ#####wAAAAEACkNPcGVyYXRpb24AAAAAEgAAAAALAAAACgAAAAsAAAAaAAAAAUAAAAAAAAAAAAAAAAwA#####wAAAAsAAAAbAAAADQD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAMAAgAAABwAAAANAP####8BAAAAABAAAUcAAAAAAAAAAABACAAAAAAAAAMAAQAAABwAAAAKAP####8BAAAAAAEAAAAeAAAACwAAABoAAAAADAD#####AAAACwAAAB8AAAANAP####8BAAAAABAAAUIAAAAAAAAAAABACAAAAAAAAAMAAgAAACAAAAANAP####8BAAAAABAAAUMAAAAAAAAAAABACAAAAAAAAAMAAQAAACAAAAAGAP####8BAAAAABAAAAEAAQAAACEAAAAiAAAADwD#####ABJNZXN1cmUgZGUgbG9uZ3VldXIAAAAFAAAAAQAAAAIAAAAhAAAAIgAAABAAAAAAJAEAAAAAEAAAAQABAAAAIQAAACIAAAAHAAAAACQBAAAAABAAAAEFAAAAACEAAAAiAAAACgAAAAAkAQAAAAABAAAAJgAAAAFAMAAAAAAAAAEAAAAMAAAAACQAAAAlAAAAJwAAAA0AAAAAJAEAAAAAEAAAAQUAAQAAACgAAAAJAQAAACQAAAAhAAAAIgAAAAcA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAADAAAAAAkAAAAiAAAADgD#####AQAAAAAQAAABAAEAAAArAAAAIwAAAAoA#####wEAAAAAAQAAACsAAAASAgAAAAE#+AAAAAAAAAAAAAsAAAAaAAAAAAwA#####wAAACwAAAAtAAAADQD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAMAAgAAAC4AAAANAP####8BAAAAABAAAUUAAAAAAAAAAABACAAAAAAAAAMAAQAAAC4AAAAEAP####8BAAAAARAAAAEAAQAAADABP#AAAAAAAAAAAAAKAP####8BAAAAAAEAAAAwAAAACwAAAAEAAAAADAD#####AAAAMQAAADIAAAANAP####8BAAAAABAAAUkAAAAAAAAAAABACAAAAAAAAAMAAgAAADMAAAANAP####8BAAAAABAAAUgAAAAAAAAAAABACAAAAAAAAAMAAQAAADMAAAAMAP####8AAAAsAAAAMgAAAA0A#####wEAAAAAEAABRAAAAAAAAAAAAEAIAAAAAAAAAwACAAAANgAAAA0A#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAADAAEAAAA2AAAABgD#####AQAAAAAQAAABAAEAAAA3AAAAMAAAAAYA#####wAAAAAAEAAAAQABAAAAMAAAADUAAAAPAP####8AEk1lc3VyZSBkZSBsb25ndWV1cgAAAAUAAAACAAAAAgAAADcAAAAwAAAAEAAAAAA7AQAAAAAQAAABAAEAAAA3AAAAMAAAAAcAAAAAOwEAAAAAEAAAAQUAAAAANwAAADAAAAAKAAAAADsBAAAAAAEAAAA9AAAAAUAwAAAAAAAAAQAAAAwAAAAAOwAAADwAAAA+AAAADQAAAAA7AQAAAAAQAAABBQABAAAAPwAAAAkBAAAAOwAAADcAAAAwAAAAEQEAAAA7AQAAAABARgAAAAAAAAAAAAAAAAAAAAAAQBEAAAAAAAEAAAABAAAAAQAAAAAAAAAAAAAAAyBjbQEAAABBAAAADAD#####AAAAEQAAAAwAAAANAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQACAAAAQwAAAA0A#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAADAAEAAABDAAAABgD#####AAAAAAAQAAABAAEAAAAwAAAANAAAAA4A#####wEAAP8AEAAAAQACAAAAHgAAACMAAAAMAP####8AAABHAAAAHwAAAA0A#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAADAAEAAABIAAAADQD#####AQAAAAAQAAFGAAAAAAAAAAAAQAgAAAAAAAADAAIAAABIAAAABgD#####AAAAAAAQAAABAAEAAAAeAAAASgAAAAYA#####wAAAAAAEAAAAQABAAAAHgAAACH#####AAAAAQAMQ0FyY0RlQ2VyY2xlAP####8AAAAAAAEAAAAJAAAADwAAAEQAAAAPAP####8AEk1lc3VyZSBkZSBsb25ndWV1cgAAAAUAAAACAAAAAgAAAEoAAAAeAAAAEAAAAABOAQAAAAAQAAABAAEAAABKAAAAHgAAAAcAAAAATgEAAAAAEAAAAQUAAAAASgAAAB4AAAAKAAAAAE4BAAAAAAEAAABQAAAAAUAwAAAAAAAAAQAAAAwAAAAATgAAAE8AAABRAAAADQAAAABOAQAAAAAQAAABBQABAAAAUgAAAAkBAAAATgAAAEoAAAAeAAAAEQEAAABOAAAAAADAKgAAAAAAAAAAAAAAAAAAAAAAUxEAAAAAAAEAAAABAAAAAQAAAAAAAAAAAAAAAyBjbQEAAABUAAAADwD#####ABJNZXN1cmUgZGUgbG9uZ3VldXIAAAAFAAAAAgAAAAIAAAA1AAAANAAAABAAAAAAVgEAAAAAEAAAAQABAAAANQAAADQAAAAHAAAAAFYBAAAAABAAAAEFAAAAADUAAAA0AAAACgAAAABWAQAAAAABAAAAWAAAAAFAMAAAAAAAAAEAAAAMAAAAAFYAAABXAAAAWQAAAA0AAAAAVgEAAAAAEAAAAQUAAQAAAFoAAAAJAQAAAFYAAAA1AAAANAAAABEBAAAAVgAAAAAAAAAAAAAAAADACAAAAAAAAAAAAFsRAAAAAAABAAAAAQAAAAEAAAAAAAAAAAAAAAMgY20BAAAAXAAAAAYA#####wAAAAAAEAAAAQABAAAACQAAAEQAAAATAP####8AAAAAAAEAAAAwAAAANP####8AAAABQGaAAAAAAAD#####AAAAAQARQ0dyYW5kQXJjRGVDZXJjbGUA#####wAAAAAAAQAAAB4AAAAh#####wAAAAFAcOAAAAAAAP####8AAAABAA5DTWFycXVlU2VnbWVudAD#####AAAA#wACAgAAAF4AAAAVAP####8AAAD#AAICAAAAEAAAABUA#####wAAAP8AAgAAAABLAAAAFQD#####AAAA#wACAAAAAEwAAAAI##########8="
			texte_corr = `La première figure est un quart de cercle de rayon ${r} cm auquel il faut ajouter les 2 rayons qui ferment la figure.<br>`
			
			if (this.sup==1) {
				texte_corr = `La première figure est un quart de disque, son périmètre est composé d'un quart de cercle de rayon ${r} cm et de 2 rayons qui ferment la figure.<br>`
				texte_corr += `$\\mathcal{P}_1=\\dfrac{1}{4}\\times2\\times${r}\\times\\pi+${r}+${r}=${tex_nombre(Algebrite.eval(r/2))}\\pi+${2*r}\\approx${tex_nombre(arrondi(Algebrite.eval(r/2*Math.PI+2*r),1))}$ cm<br>`
				texte_corr += `La deuxième figure est trois quarts d'un disque, son périmètre est composé de trois quarts d'un cercle de rayon ${r2} cm et 2 rayons qui ferment la figure.<br>`
				texte_corr += `$\\mathcal{P}_2=\\dfrac{3}{4}\\times2\\times${r2}\\times\\pi+${r2}+${r2}=${tex_nombre(6/4*r2)}\\pi+${2*r2}\\approx${tex_nombre(arrondi(Algebrite.eval(6/4*r2*Math.PI+2*r2),1))}$ cm<br>`
				texte_corr += `La troisième figure est un demi-disque, son périmètre est composé d'un demi-cercle de diamètre ${2*r3} cm et d'un diamètre qui ferme la figure.<br>`
				texte_corr += `$\\mathcal{P}_3=\\dfrac{1}{2}\\times${2*r3}\\times\\pi+${2*r3}=${r3}\\pi+${2*r3}\\approx${tex_nombre(arrondi(Algebrite.eval(r3*Math.PI+2*r3),1))}$ cm<br>`
			}

			if (this.sup==2){
				texte_corr = `La première figure est un quart de disque de rayon ${r} cm.<br>`
				texte_corr += `$\\mathcal{A}_1=\\dfrac{1}{4}\\times${r}\\times${r}\\times\\pi=${tex_nombre(Algebrite.eval(r*r/4))}\\pi\\approx${tex_nombre(arrondi(Algebrite.eval(r*r/4*Math.PI),1))}~\\text{cm}^2$<br>`
				texte_corr += `La deuxième figure est trois quarts d'un disque rayon ${r2} cm.<br>`
				texte_corr += `$\\mathcal{A}_2=\\dfrac{3}{4}\\times${r2}\\times${r2}\\times\\pi=${tex_nombre(3/4*r2*r2)}\\pi\\approx${tex_nombre(arrondi(Algebrite.eval(3/4*r2*r2*Math.PI),1))}~\\text{cm}^2$<br>`
				texte_corr += `La troisième figure est un demi-cercle de diamètre ${2*r3} cm donc de rayon ${r3} cm.<br>`
				texte_corr += `$\\mathcal{A}_3=\\dfrac{1}{2}\\times${r3}\\times${r3}\\times\\pi=${r3*r3/2}\\pi\\approx${tex_nombre(arrondi(Algebrite.eval(r3*r3/2*Math.PI),1))}~\\text{cm}^2$<br>`
			
			}


			if (this.sup==3) {
				texte_corr = `La première figure est un quart de disque, son périmètre est composé d'un quart de cercle de rayon ${r} cm et de 2 rayons qui ferment la figure.<br>`
				texte_corr += `$\\mathcal{P}_1=\\dfrac{1}{4}\\times2\\times${r}\\times\\pi+${r}+${r}=${tex_nombre(Algebrite.eval(r/2))}\\pi+${2*r}\\approx${tex_nombre(arrondi(Algebrite.eval(r/2*Math.PI+2*r),1))}$ cm<br>`
				texte_corr += `La deuxième figure est trois quarts d'un disque, son périmètre est composé de trois quarts d'un cercle de rayon ${r2} cm et 2 rayons qui ferment la figure.<br>`
				texte_corr += `$\\mathcal{P}_2=\\dfrac{3}{4}\\times2\\times${r2}\\times\\pi+${r2}+${r2}=${tex_nombre(6/4*r2)}\\pi+${2*r2}\\approx${tex_nombre(arrondi(Algebrite.eval(6/4*r2*Math.PI+2*r2),1))}$ cm<br>`
				texte_corr += `La troisième figure est un demi-disque, son périmètre est composé d'un demi-cercle de diamètre ${2*r3} cm et d'un diamètre qui ferme la figure.<br>`
				texte_corr += `$\\mathcal{P}_3=\\dfrac{1}{2}\\times${2*r3}\\times\\pi+${2*r3}=${r3}\\pi+${2*r3}\\approx${tex_nombre(arrondi(Algebrite.eval(r3*Math.PI+2*r3),1))}$ cm<br>`
				texte_corr += `La première figure est un quart de disque de rayon ${r} cm.<br>`
				texte_corr += `$\\mathcal{A}_1=\\dfrac{1}{4}\\times${r}\\times${r}\\times\\pi=${tex_nombre(Algebrite.eval(r*r/4))}\\pi\\approx${tex_nombre(arrondi(Algebrite.eval(r*r/4*Math.PI),1))}~\\text{cm}^2$<br>`
				texte_corr += `La deuxième figure est trois quarts d'un disque rayon ${r2} cm.<br>`
				texte_corr += `$\\mathcal{A}_2=\\dfrac{3}{4}\\times${r2}\\times${r2}\\times\\pi=${tex_nombre(3/4*r2*r2)}\\pi\\approx${tex_nombre(arrondi(Algebrite.eval(3/4*r2*r2*Math.PI),1))}~\\text{cm}^2$<br>`
				texte_corr += `La troisième figure est un demi-cercle de diamètre ${2*r3} cm donc de rayon ${r3} cm.<br>`
				texte_corr += `$\\mathcal{A}_3=\\dfrac{1}{2}\\times${r3}\\times${r3}\\times\\pi=${r3*r3/2}\\pi\\approx${tex_nombre(arrondi(Algebrite.eval(r3*r3/2*Math.PI),1))}~\\text{cm}^2$<br>`
			}





			
		}
		
		this.MG32codeBase64 = codeBase64
		this.MG32code_pour_modifier_la_figure = `
	        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "r", "${r}");
	        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "r2", "${r2}");
	        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "r3", "${r3}");
	        mtg32App.calculate("MG32svg${numero_de_l_exercice}");
	        mtg32App.display("MG32svg${numero_de_l_exercice}");
	      ` 	
	
			
		this.liste_corrections.push(texte_corr);
		liste_de_question_to_contenu(this);		
	}

	this.besoin_formulaire_numerique = ['Niveau de difficulté',3,"1 : Périmètres\n\
2 : Aires\n3 : Périmètres et aires"];			
}

/**
* Un carré, un rectangle et un triangle rectangle sont tracés.
*
* Il faut calculer les aires et périmètres.
*
* Pas de version LaTeX
* @Auteur Rémi Angot
*/
function Perimetre_ou_aire_de_carres_rectangles_triangles(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.pas_de_version_LaTeX = true ;
	this.titre = "Périmètres et aires carrés, rectangles et triangles rectangles"
	this.consigne = "Calculer le périmètre et l'aire des 3 figures suivantes"
	this.spacing = 2;
	sortie_html? this.spacing_corr = 3 : this.spacing_corr = 2 ;
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;
	this.type_exercice = 'MG32';
	this.taille_div_MG32 = [600,450];


	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_corrections = []; // Liste de questions corrigées
		let c = randint(2,6)
		let L = randint(2,5)
		let l = randint(1,4)
		while (l==L) { // Le rectangle ne doit pas être un carré
			l = randint(1,4)
		}
		let a = randint(2,5)
		let b = randint(2,5)
		let codeBase64 ="TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAH0AAAB9AAAAQEAAAAAAAAAAQAAAH######AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AQAAAAAOAAFVAMAkAAAAAAAAQBAAAAAAAAAFAABAMU+dsi0OVkAxT52yLQ5W#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABAAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAVYAwAAAAAAAAABAEAAAAAAAAAUAAUBBT52yLQ5WAAAAAv####8AAAABAAhDU2VnbWVudAD#####AQAAAAAQAAABAAEAAAABAAAAA#####8AAAABAAdDTWlsaWV1AP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAABAAAAA#####8AAAACAAxDQ29tbWVudGFpcmUA#####wEAAAAAAAAAAAAAAABAGAAAAAAAAAAAAAUMAAAAAAABAAAAAAAAAAEAAAAAAAAAAAABMf####8AAAABAAlDTG9uZ3VldXIA#####wAAAAEAAAAD#####wAAAAEAB0NDYWxjdWwA#####wABYwABNQAAAAFAFAAAAAAAAAAAAAkA#####wABTAABNQAAAAFAFAAAAAAAAAAAAAkA#####wABbAABMgAAAAFAAAAAAAAAAAAAAAkA#####wABYgABNQAAAAFAFAAAAAAAAAAAAAkA#####wABYQABMwAAAAFACAAAAAAAAAAAAAIA#####wAAAAAAEAABQQDALgAAAAAAAAAAAAAAAAAABQABQDkAAAAAAABAaOAAAAAAAP####8AAAABABRDSW1wbGVtZW50YXRpb25Qcm90bwD#####ABtTZWdtZW50IGRlIGxvbmd1ZXVyIGRvbm7DqWUAAAAGAAAAAwAAAAIAAAAIAAAADf####8AAAACAAlDQ2VyY2xlT1IAAAAADgEAAAAAAQAAAA3#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAACAD#####AAAAAQAPQ1BvaW50TGllQ2VyY2xlAQAAAA4AAAAAABAAAUIAQAgAAAAAAAAAAAAAAAAAAAUAAUAYC8chUUHEAAAADwAAAAUBAAAADgAAAAAAEAAAAQABAAAADQAAABAAAAAGAAAAAA4BAAAAAA0AAAEFAAAAAA0AAAAQ#####wAAAAEAC0NNZWRpYXRyaWNlAAAAAA4BAAAAAA0AAAEAAQAAAA0AAAAQAAAACwAAAAAOAQAAAAABAAAAEgAAAAFAMAAAAAAAAAH#####AAAAAQAQQ0ludERyb2l0ZUNlcmNsZQAAAAAOAAAAEwAAABT#####AAAAAQAQQ1BvaW50TGllQmlwb2ludAAAAAAOAQAAAAANAAABBQABAAAAFf####8AAAABAA9DVmFsZXVyQWZmaWNoZWUBAAAADgAAAAABAAAAFhAAAAAAAAEAAAABAAAAAQAAAAAAAAAAAAAAAyBjbQEAAAAI#####wAAAAEAFkNEcm9pdGVQZXJwZW5kaWN1bGFpcmUA#####wEAAAAAEAAAAQABAAAADQAAABEAAAASAP####8BAAAAABAAAAEAAQAAABAAAAAR#####wAAAAEACUNDZXJjbGVPQQD#####AQAAAAABAAAAEAAAAA0AAAATAP####8BAAAAAAEAAAANAAAAEAAAAA8A#####wAAABkAAAAaAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAQAAABwAAAAQAP####8AAAAAABAAAUMAQBAAAAAAAADANQAAAAAAAAUAAgAAABwAAAAPAP####8AAAAYAAAAGwAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAEAAAAfAAAAEAD#####AAAAAAAQAAFEAMAsAAAAAAAAwDcAAAAAAAAFAAIAAAAf#####wAAAAEACUNQb2x5Z29uZQD#####AAAAAAABAAAABQAAAA0AAAAQAAAAHgAAACEAAAANAAAABQD#####AAAAAAAQAAABAAEAAAAQAAAAHgAAAAUA#####wAAAAAAEAAAAQABAAAAHgAAACEAAAAFAP####8AAAAAABAAAAEAAQAAACEAAAAN#####wAAAAIAF0NNYXJxdWVBbmdsZUdlb21ldHJpcXVlAP####8AAAD#AAIAAAABQDAAAAAAAAAAAAAhAAAADQAAABAAAAAVAP####8AAAD#AAIAAAABQDAAAAAAAAAAAAANAAAAEAAAAB4AAAAVAP####8AAAD#AAIAAAABQDAAAAAAAAAAAAAQAAAAHgAAACEAAAAVAP####8AAAD#AAIAAAABQDAAAAAAAAAAAAAeAAAAIQAAAA0AAAACAP####8AAAAAABAAAUgAwDEAAAAAAADAAAAAAAAAAAUAAUBymAAAAAAAQHEHCj1wo9cAAAAKAP####8AG1NlZ21lbnQgZGUgbG9uZ3VldXIgZG9ubsOpZQAAAAYAAAADAAAAAgAAAAkAAAAqAAAACwAAAAArAQAAAAABAAAAKgAAAAwAAAAJAAAAAA0BAAAAKwAAAAAAEAABRQBACAAAAAAAAAAAAAAAAAAABQABP8sfH32jwU4AAAAsAAAABQEAAAArAAAAAAAQAAABAAEAAAAqAAAALQAAAAYAAAAAKwEAAAAADQAAAQUAAAAAKgAAAC0AAAAOAAAAACsBAAAAAA0AAAEAAQAAACoAAAAtAAAACwAAAAArAQAAAAABAAAALwAAAAFAMAAAAAAAAAEAAAAPAAAAACsAAAAwAAAAMQAAABAAAAAAKwEAAAAADQAAAQUAAQAAADIAAAARAQAAACsAAAAAAQAAADMQAAAAAAABAAAAAQAAAAEAAAAAAAAAAAAAAAMgY20BAAAACQAAABIA#####wEAAAAAEAAAAQABAAAALQAAAC4AAAASAP####8BAAAAABAAAAEAAQAAACoAAAAuAAAACwD#####AQAAAAABAAAALQAAAAwAAAAKAAAAAAsA#####wEAAAAAAQAAACoAAAAMAAAACgAAAAAPAP####8AAAA1AAAANwAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAEAAAA5AAAAEAD#####AAAAAAAQAAFGAEAAAAAAAAAAwDgAAAAAAAAFAAIAAAA5AAAADwD#####AAAANgAAADgAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQABAAAAPAAAABAA#####wAAAAAAEAABRwDALgAAAAAAAMA2AAAAAAAABQACAAAAPAAAAAUA#####wAAAAAAEAAAAQABAAAALQAAADsAAAAFAP####8AAAAAABAAAAEAAQAAADsAAAA+AAAABQD#####AAAAAAAQAAABAAEAAAA+AAAAKgAAAAoA#####wAeQWZmaWNoYWdlIGRlIGxvbmd1ZXVyIG9yaWVudMOpAAAABwAAAAIAAAACAAAALQAAADsAAAADAAAAAEIAAAAAABAAAAEAAQAAAC0BP#AAAAAAAAAAAAAEAAAAAEIAAAAAABAAAlcnAAAAAAAAAAAAQAgAAAAAAAAFAAFAYMAAAAAAAAAAAEP#####AAAAAgATQ01lc3VyZUFuZ2xlT3JpZW50ZQAAAABCAAJhbgAAAEQAAAAtAAAAOwAAAAgBAAAAQgAAAC0AAAA7AAAABgAAAABCAAAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAALQAAADv#####AAAAAQANQ1BvaW50UHJvamV0ZQAAAABCAAAAAAAQAAJXIgAAAAAAAAAAAEAIAAAAAAAABQAAAAA7AAAAQwAAABYAAAAAQgACbWEAAABEAAAALQAAAEj#####AAAAAQAOQ1Rlc3RFeGlzdGVuY2UAAAAAQgADdG1hAAAASQAAABEBAAAAQgAAAAAAQAAAAAAAAADAAAAAAAAAAAAAAEcQAAAAAAABAAAAAv####8AAAABAA1DRm9uY3Rpb24zVmFyAAAAAAwAAABK#####wAAAAEACkNPcGVyYXRpb24AAAAADAAAAEUAAAAMAAAASQAAAAwAAABFAAAAAyBjbQEAAABGAAAAFQD#####AAAA#wACAAAAAUAwAAAAAAAAAAAALQAAADsAAAA+AAAAFQD#####AAAA#wACAAAAAUAwAAAAAAAAAAAAOwAAAD4AAAAqAAAAFQD#####AAAA#wACAAAAAUAwAAAAAAAAAAAAPgAAACoAAAAtAAAAFQD#####AAAA#wACAAAAAUAwAAAAAAAAAAAAKgAAAC0AAAA7AAAAAgD#####AAAAAAAQAAFJAEAIAAAAAAAAAAAAAAAAAAAFAAFAbkAAAAAAAEB5kAAAAAAAAAAACgD#####ABtTZWdtZW50IGRlIGxvbmd1ZXVyIGRvbm7DqWUAAAABAAAAAgAAAAIAAAAMAAAAUAAAAAsAAAAAUQEAAAAAAQAAAFAAAAAMAAAADAAAAAANAQAAAFEAAAAAABAAAUoAwAgAAAAAAADAOgAAAAAAAAUAAT##e1lPr88TAAAAUgAAAAUBAAAAUQAAAAAAEAAAAQABAAAAUAAAAFMAAAASAP####8BAAAAABAAAAEAAQAAAFMAAABUAAAACwD#####AQAAAAABAAAAUwAAAAwAAAALAAAAAA8A#####wAAAFUAAABWAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAQAAAFcAAAAQAP####8AAAAAABAAAUsAwDIAAAAAAADACAAAAAAAAAUAAgAAAFcAAAAFAP####8AAAAAABAAAAEAAQAAAFMAAABZAAAABQD#####AAAAAAAQAAABAAEAAABZAAAAUAAAAAoA#####wAeQWZmaWNoYWdlIGRlIGxvbmd1ZXVyIG9yaWVudMOpAAAABwAAAAIAAAACAAAAUwAAAFkAAAADAAAAAFwAAAAAABAAAAEAAQAAAFMBP#AAAAAAAAAAAAAEAAAAAFwAAAAAABAAAlcnAAAAAAAAAAAAQAgAAAAAAAAFAAFAYMAAAAAAAAAAAF0AAAAWAAAAAFwAAmFuAAAAXgAAAFMAAABZAAAACAEAAABcAAAAUwAAAFkAAAAGAAAAAFwAAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABTAAAAWQAAABcAAAAAXAAAAAAAEAACVyIAAAAAAAAAAABACAAAAAAAAAUAAAAAWQAAAF0AAAAWAAAAAFwAAm1hAAAAXgAAAFMAAABiAAAAGAAAAABcAAN0bWEAAABjAAAAEQEAAABcAAAAAABAAAAAAAAAAMAAAAAAAAAAAAAAYRAAAAAAAAEAAAACAAAAGQAAAAAMAAAAZAAAABoAAAAADAAAAF8AAAAMAAAAYwAAAAwAAABfAAAAAyBjbQEAAABgAAAACgD#####AB5BZmZpY2hhZ2UgZGUgbG9uZ3VldXIgb3JpZW50w6kAAAAHAAAAAgAAAAIAAABZAAAAUAAAAAMAAAAAZgAAAAAAEAAAAQABAAAAWQE#8AAAAAAAAAAAAAQAAAAAZgAAAAAAEAACVycAAAAAAAAAAABACAAAAAAAAAUAAUBgwAAAAAAAAAAAZwAAABYAAAAAZgACYW4AAABoAAAAWQAAAFAAAAAIAQAAAGYAAABZAAAAUAAAAAYAAAAAZgAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAFkAAABQAAAAFwAAAABmAAAAAAAQAAJXIgAAAAAAAAAAAEAIAAAAAAAABQAAAABQAAAAZwAAABYAAAAAZgACbWEAAABoAAAAWQAAAGwAAAAYAAAAAGYAA3RtYQAAAG0AAAARAQAAAGYAAAAAAEAAAAAAAAAAwAAAAAAAAAAAAABrEAAAAAAAAQAAAAIAAAAZAAAAAAwAAABuAAAAGgAAAAAMAAAAaQAAAAwAAABtAAAADAAAAGkAAAADIGNtAQAAAGoAAAAVAP####8AAAD#AAIAAAABQDAAAAAAAAAAAABQAAAAUwAAAFn#####AAAAAQAOQ01hcnF1ZVNlZ21lbnQA#####wAAAP8AAgEAAAARAAAAGwD#####AAAA#wACAQAAACMAAAAbAP####8AAAD#AAIBAAAAJAAAABsA#####wAAAP8AAgEAAAAlAAAACgD#####AB5BZmZpY2hhZ2UgZGUgbG9uZ3VldXIgb3JpZW50w6kAAAAHAAAAAgAAAAIAAABQAAAAUwAAAAMAAAAAdQAAAAAAEAAAAQABAAAAUAE#8AAAAAAAAAAAAAQAAAAAdQAAAAAAEAACVycAAAAAAAAAAABACAAAAAAAAAUAAUBgwAAAAAAAAAAAdgAAABYAAAAAdQACYW4AAAB3AAAAUAAAAFMAAAAIAQAAAHUAAABQAAAAUwAAAAYAAAAAdQAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAFAAAABTAAAAFwAAAAB1AAAAAAAQAAJXIgAAAAAAAAAAAEAIAAAAAAAABQAAAABTAAAAdgAAABYAAAAAdQACbWEAAAB3AAAAUAAAAHsAAAAYAAAAAHUAA3RtYQAAAHwAAAARAQAAAHUAAAAAAEAAAAAAAAAAwAAAAAAAAAAAAAB6EAAAAAAAAQAAAAIAAAAZAAAAAAwAAAB9AAAAGgAAAAAMAAAAeAAAAAwAAAB8AAAADAAAAHgAAAADIGNtAQAAAHkAAAAH##########8="
		let c2 = Math.sqrt(a*a+b*b)
		let pIJK = Algebrite.eval(a+b+c2).d.toFixed(1)

		texte_corr = `$\\mathcal{P}_{ABCD}=${c}~\\text{cm}+${c}~\\text{cm}+${c}~\\text{cm}+${c}~\\text{cm}=${4*c}~\\text{cm}$`
		texte_corr += `<br>$\\mathcal{A}_{ABCD}=${c}~\\text{cm}\\times${c}~\\text{cm}=${c*c}~\\text{cm}^2$`
		texte_corr += `<br>$\\mathcal{P}_{EFGH}=${L}~\\text{cm}+${l}~\\text{cm}+${L}~\\text{cm}+${l}~\\text{cm}=${2*L+2*l}~\\text{cm}$`
		texte_corr += `<br>$\\mathcal{A}_{EFGH}=${L}~\\text{cm}\\times${l}~\\text{cm}=${L*l}~\\text{cm}^2$`
		texte_corr += `<br>$\\mathcal{P}_{IJK}=${a}~\\text{cm}+${b}~\\text{cm}+${tex_nombre(c2.toFixed(1))}~\\text{cm}=${tex_nombre(pIJK)}~\\text{cm}$`
		texte_corr += `<br>$\\mathcal{A}_{IJK}=${a}~\\text{cm}\\times${b}~\\text{cm}\\div2=${tex_nombre(Algebrite.eval(a*b/2))}~\\text{cm}^2$`
		

		this.MG32codeBase64 = codeBase64
		this.MG32code_pour_modifier_la_figure = `
	        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "c", "${c}");
	        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "L", "${L}");
	        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "l", "${l}");
	        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "a", "${a}");
	        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "b", "${b}");
	        mtg32App.calculate("MG32svg${numero_de_l_exercice}");
	        mtg32App.display("MG32svg${numero_de_l_exercice}");
	      ` 	
		
			
		this.liste_corrections.push(texte_corr);
		liste_de_question_to_contenu(this);		
	}

// 	this.besoin_formulaire_numerique = ['Niveau de difficulté',3,"1 : Périmètres\n\
// 2 : Aires\n3 : Périmètres et aires"];

}


/**
* Deux figures composés de rectangles et de triangles sont tracés.
*
* Il faut calculer le périmètre et l'aire par addition ou soustraction d'aires
*
* Pas de version LaTeX
*
* Un seul type de figure pour l'instant.
* @Auteur Rémi Angot
*/
function Perimetre_ou_aire_de_figures_composees(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.pas_de_version_LaTeX = true ;
	this.titre = "Périmètres et aires de figures composées"
	this.consigne = "Calculer le périmètre et l'aire des 2 figures suivantes"
	this.spacing = 2;
	this.spacing_corr = 2;
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;
	this.type_exercice = 'MG32';
	this.taille_div_MG32 = [500,500];


	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_corrections = []; // Liste de questions corrigées
		let L1 = randint(4,7)
		let l1 = randint(2,4)
		let L2 = randint(2,4)
		if (L1==l1) {l1--} // pour que le rectangle ne soit pas un carré
		let c = randint(4,7)
		let h = randint(2,c-1)
		let codeBase64 ="TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAQzAAACtAAAAQEAAAAAAAAAAQAAAKj#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AQAAAAAOAAFVAMAkAAAAAAAAQBAAAAAAAAAFAABAMU+dsi0OVkAxT52yLQ5W#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABAAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAVYAwAAAAAAAAABAEAAAAAAAAAUAAUBBT52yLQ5WAAAAAv####8AAAABAAhDU2VnbWVudAD#####AQAAAAAQAAABAAEAAAABAAAAA#####8AAAABAAdDTWlsaWV1AP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAABAAAAA#####8AAAACAAxDQ29tbWVudGFpcmUA#####wEAAAAAAAAAAAAAAABAGAAAAAAAAAAAAAUMAAAAAAABAAAAAAAAAAEAAAAAAAAAAAABMf####8AAAABAAlDTG9uZ3VldXIA#####wAAAAEAAAAD#####wAAAAEAB0NDYWxjdWwA#####wACTDEAATUAAAABQBQAAAAAAAAAAAAJAP####8AAmwxAAEzAAAAAUAIAAAAAAAAAAAACQD#####AAJMMgABMwAAAAFACAAAAAAAAAAAAAIA#####wAAAAABEAABQwBACAAAAAAAAAAAAAAAAAAABQABQFKgAAAAAABAaW4UeuFHrv####8AAAABABRDSW1wbGVtZW50YXRpb25Qcm90bwD#####ABtTZWdtZW50IGRlIGxvbmd1ZXVyIGRvbm7DqWUAAAAGAAAAAwAAAAIAAAAIAAAAC#####8AAAACAAlDQ2VyY2xlT1IAAAAADAEAAAAAAQAAAAv#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAACAD#####AAAAAQAPQ1BvaW50TGllQ2VyY2xlAQAAAAwAAAAAARAAAUQAQAgAAAAAAAAAAAAAAAAAAAUAAT++v3IzOUsjAAAADQAAAAUBAAAADAAAAAAAEAAAAQABAAAACwAAAA4AAAAGAAAAAAwBAAAAABAAAAEFAAAAAAsAAAAO#####wAAAAEAC0NNZWRpYXRyaWNlAAAAAAwBAAAAABAAAAEAAQAAAAsAAAAOAAAACwAAAAAMAQAAAAABAAAAEAAAAAFAMAAAAAAAAAH#####AAAAAQAQQ0ludERyb2l0ZUNlcmNsZQAAAAAMAAAAEQAAABL#####AAAAAQAQQ1BvaW50TGllQmlwb2ludAAAAAAMAQAAAAAQAAABBQABAAAAE#####8AAAABAA9DVmFsZXVyQWZmaWNoZWUBAAAADAAAAAABAAAAFBAAAAAAAAEAAAABAAAAAQAAAAAAAAAAAAAAAAEAAAAI#####wAAAAEAFkNEcm9pdGVQZXJwZW5kaWN1bGFpcmUA#####wEAAAAAEAAAAQABAAAACwAAAA8AAAASAP####8BAAAAABAAAAEAAQAAAA4AAAAPAAAACwD#####AQAAAAABAAAACwAAAAwAAAAJAAAAAAsA#####wEAAAAAAQAAAA4AAAAMAAAACQAAAAAPAP####8AAAAWAAAAGAAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAEAAAAaAAAAEAD#####AQAAAAAQAAFCAAAAAAAAAAAAQAgAAAAAAAAFAAIAAAAaAAAADwD#####AAAAFwAAABkAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQABAAAAHQAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAIAAAAdAAAACwD#####AQAAAAABAAAAHwAAAAwAAAAKAP####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAHAAAAB8AAAAPAP####8AAAAhAAAAIAAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAIAAAAiAAAAEAD#####AQAAAAAQAAFBAAAAAAAAAAAAQAgAAAAAAAAFAAEAAAAi#####wAAAAEACUNQb2x5Z29uZQD#####AAAAAAABAAAABgAAAA4AAAALAAAAHAAAAB8AAAAkAAAADgAAAAoA#####wASTWVzdXJlIGRlIGxvbmd1ZXVyAAAABQAAAAIAAAACAAAAJAAAABwAAAAOAAAAACYBAAAAABAAAAEAAQAAACQAAAAcAAAABgAAAAAmAQAAAAAQAAABBQAAAAAkAAAAHAAAAAsAAAAAJgEAAAAAAQAAACgAAAABQDAAAAAAAAABAAAADwAAAAAmAAAAJwAAACkAAAAQAAAAACYBAAAAABAAAAEFAAEAAAAqAAAACAEAAAAmAAAAJAAAABwAAAARAQAAACYAAAAAAQAAACsRAAAAAAABAAAAAQAAAAEAAAAAAAAAAAAAAAABAAAALAAAAAoA#####wASTWVzdXJlIGRlIGxvbmd1ZXVyAAAABQAAAAIAAAACAAAAHAAAAAsAAAAOAAAAAC4BAAAAABAAAAEAAQAAABwAAAALAAAABgAAAAAuAQAAAAAQAAABBQAAAAAcAAAACwAAAAsAAAAALgEAAAAAAQAAADAAAAABQDAAAAAAAAABAAAADwAAAAAuAAAALwAAADEAAAAQAAAAAC4BAAAAABAAAAEFAAEAAAAyAAAACAEAAAAuAAAAHAAAAAsAAAARAQAAAC4AAAAAAQAAADMRAAAAAAABAAAAAQAAAAEAAAAAAAAAAAAAAAABAAAANP####8AAAACABdDTWFycXVlQW5nbGVHZW9tZXRyaXF1ZQD#####AAAAAAABAAAAAUAwAAAAAAAAAAAADgAAAAsAAAAcAAAAFQD#####AAAAAAABAAAAAUAwAAAAAAAAAAAACwAAABwAAAAkAAAAFQD#####AAAAAAABAAAAAUAwAAAAAAAAAAAAHAAAAB8AAAAOAAAAFQD#####AAAAAAABAAAAAUAwAAAAAAAAAAAACwAAAA4AAAAfAAAABQD#####AAAAAAAQAAABAQEAAAAfAAAADgAAAAoA#####wASTWVzdXJlIGRlIGxvbmd1ZXVyAAAABQAAAAEAAAACAAAADgAAACQAAAAOAAAAADsBAAAAABAAAAEAAQAAAA4AAAAkAAAABgAAAAA7AQAAAAAQAAABBQAAAAAOAAAAJAAAAAsAAAAAOwEAAAAAAQAAAD0AAAABQDAAAAAAAAABAAAADwAAAAA7AAAAPAAAAD4AAAAQAAAAADsBAAAAABAAAAEFAAEAAAA#AAAACAEAAAA7AAAADgAAACQAAAAJAP####8AAWMAATcAAAABQBwAAAAAAAAAAAACAP####8AAAAAABAAAABACAAAAAAAAAAAAAAAAAAABQABQGlwAAAAAABAfecKPXCj1wAAAAoA#####wAbU2VnbWVudCBkZSBsb25ndWV1ciBkb25uw6llAAAABgAAAAMAAAACAAAAQgAAAEMAAAALAAAAAEQBAAAAAAEAAABDAAAADAAAAEIAAAAADQEAAABEAAAAAAAQAAAAQAgAAAAAAAAAAAAAAAAAAAUAAT#LiKDqIUKnAAAARQAAAAUBAAAARAAAAAAAEAAAAQEBAAAAQwAAAEYAAAAGAAAAAEQBAAAAABAAAAEFAAAAAEMAAABGAAAADgAAAABEAQAAAAAQAAABAAEAAABDAAAARgAAAAsAAAAARAEAAAAAAQAAAEgAAAABQDAAAAAAAAABAAAADwAAAABEAAAASQAAAEoAAAAQAAAAAEQBAAAAABAAAAEFAAEAAABLAAAAEQEAAABEAAAAAAEAAABMEAAAAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAQAAAEIAAAAKAP####8ADUNhcnLDqSBkaXJlY3QAAAAFAAAAAgAAAAIAAABDAAAARgAAAAUAAAAATgEAAAAAEAAAAQABAAAAQwAAAEYAAAASAAAAAE4AAAAAABAAAAEBAQAAAEMAAABP#####wAAAAEACUNDZXJjbGVPQQAAAABOAAAAAAEBAAAAQwAAAEYAAAAPAAAAAE4AAABQAAAAUQAAABABAAAATgEAAAAAEAABSAEFAAIAAABS#####wAAAAEADENUcmFuc2xhdGlvbgAAAABOAAAAQwAAAEb#####AAAAAQALQ1BvaW50SW1hZ2UBAAAATgEAAAAAEAABRwEFAAAAAFMAAABUAAAABQD#####AAAAAAAQAAABAQEAAABGAAAAVQAAAAUA#####wAAAAAAEAAAAQEBAAAAVQAAAFMAAAAFAP####8AAAAAABAAAAEBAQAAAFMAAABDAAAAFAD#####AQAAAAEBAAAABQAAAEMAAABGAAAAVQAAAFMAAABDAAAACQD#####AAFyAAEyAAAAAUAAAAAAAAAAAAAACwD#####AQAAAAEBAAAAUwAAAAwAAABaAAAAAA8A#####wAAAFcAAABbAAAAEAD#####AAAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAQAAAFwAAAAQAP####8BAAAAABAAAUYAAAAAAAAAAABACAAAAAAAAAUAAgAAAFwAAAASAP####8BAAAAABAAAAEBAQAAAF4AAABXAAAACQD#####AAFoAAE0AAAAAUAQAAAAAAAAAAAACwD#####AQAAAAEBAAAAXgAAAAwAAABgAAAAAA8A#####wAAAF8AAABhAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAQAAAGIAAAAQAP####8BAAAAABAAAUUAAAAAAAAAAABACAAAAAAAAAUAAgAAAGIAAAAUAP####8AAAAAAAEAAAAGAAAAVQAAAEYAAABDAAAAUwAAAGQAAABVAAAABQD#####AAAAAAAQAAABAQEAAABeAAAAZP####8AAAABAA5DTWFycXVlU2VnbWVudAD#####AAAAAAABAQAAAFYAAAAZAP####8AAAAAAAEBAAAARwAAABkA#####wAAAAAAAQEAAABYAAAAFQD#####AAAAAAABAAAAAUAwAAAAAAAAAAAAVQAAAEYAAABDAAAAFQD#####AAAAAAABAAAAAUAwAAAAAAAAAAAARgAAAEMAAABTAAAAFQD#####AAAAAAABAAAAAUAwAAAAAAAAAAAAUwAAAFUAAABGAAAAFQD#####AAAAAAABAAAAAUAwAAAAAAAAAAAAVQAAAFMAAABDAAAACgD#####ABJNZXN1cmUgZGUgbG9uZ3VldXIAAAAFAAAAAQAAAAIAAABkAAAAXgAAAA4AAAAAbgEAAAAAEAAAAQABAAAAZAAAAF4AAAAGAAAAAG4BAAAAABAAAAEFAAAAAGQAAABeAAAACwAAAABuAQAAAAABAAAAcAAAAAFAMAAAAAAAAAEAAAAPAAAAAG4AAABvAAAAcQAAABAAAAAAbgEAAAAAEAAAAQUAAQAAAHIAAAAIAQAAAG4AAABkAAAAXgAAAAoA#####wASTWVzdXJlIGRlIGxvbmd1ZXVyAAAABQAAAAEAAAACAAAAVQAAAGQAAAAOAAAAAHUBAAAAABAAAAEAAQAAAFUAAABkAAAABgAAAAB1AQAAAAAQAAABBQAAAABVAAAAZAAAAAsAAAAAdQEAAAAAAQAAAHcAAAABQDAAAAAAAAABAAAADwAAAAB1AAAAdgAAAHgAAAAQAAAAAHUBAAAAABAAAAEFAAEAAAB5AAAACAEAAAB1AAAAVQAAAGQAAAAKAP####8AEk1lc3VyZSBkZSBsb25ndWV1cgAAAAUAAAABAAAAAgAAAFMAAABkAAAADgAAAAB8AQAAAAAQAAABAAEAAABTAAAAZAAAAAYAAAAAfAEAAAAAEAAAAQUAAAAAUwAAAGQAAAALAAAAAHwBAAAAAAEAAAB+AAAAAUAwAAAAAAAAAQAAAA8AAAAAfAAAAH0AAAB#AAAAEAAAAAB8AQAAAAAQAAABBQABAAAAgAAAAAgBAAAAfAAAAFMAAABkAAAACgD#####AB5BZmZpY2hhZ2UgZGUgbG9uZ3VldXIgb3JpZW50w6kAAAAHAAAAAQAAAAMAAACCAAAAUwAAAGQAAAADAAAAAIMAAAAAABAAAAEAAQAAAFMBP#AAAAAAAAAAAAAEAAAAAIMAAAAAABAAAlcnAAAAAAAAAAAAQAgAAAAAAAAFAAFAYMAAAAAAAAAAAIT#####AAAAAgATQ01lc3VyZUFuZ2xlT3JpZW50ZQAAAACDAAJhbgAAAIUAAABTAAAAZAAAAAYAAAAAgwAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAFMAAABk#####wAAAAEADUNQb2ludFByb2pldGUAAAAAgwAAAAAAEAACVyIAAAAAAAAAAABACAAAAAAAAAUAAAAAZAAAAIQAAAAaAAAAAIMAAm1hAAAAhQAAAFMAAACI#####wAAAAEADkNUZXN0RXhpc3RlbmNlAAAAAIMAA3RtYQAAAIkAAAARAQAAAIMAAAAAAEAAAAAAAAAAwAAAAAAAAAAAAACHEAAAAAAAAQAAAAL#####AAAAAQANQ0ZvbmN0aW9uM1ZhcgAAAAAMAAAAiv####8AAAABAApDT3BlcmF0aW9uAAAAAAwAAACGAAAADAAAAIkAAAAMAAAAhgAAAAABAAAAggAAAAoA#####wAeQWZmaWNoYWdlIGRlIGxvbmd1ZXVyIG9yaWVudMOpAAAABwAAAAEAAAADAAAAewAAAGQAAABVAAAAAwAAAACMAAAAAAAQAAABAAEAAABkAT#wAAAAAAAAAAAABAAAAACMAAAAAAAQAAJXJwAAAAAAAAAAAEAIAAAAAAAABQABQGDAAAAAAAAAAACNAAAAGgAAAACMAAJhbgAAAI4AAABkAAAAVQAAAAYAAAAAjAAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAGQAAABVAAAAGwAAAACMAAAAAAAQAAJXIgAAAAAAAAAAAEAIAAAAAAAABQAAAABVAAAAjQAAABoAAAAAjAACbWEAAACOAAAAZAAAAJEAAAAcAAAAAIwAA3RtYQAAAJIAAAARAQAAAIwAAAAAAEAAAAAAAAAAwAAAAAAAAAAAAACQEAAAAAAAAQAAAAIAAAAdAAAAAAwAAACTAAAAHgAAAAAMAAAAjwAAAAwAAACSAAAADAAAAI8AAAAAAQAAAHsAAAAKAP####8AHkFmZmljaGFnZSBkZSBsb25ndWV1ciBvcmllbnTDqQAAAAcAAAABAAAAAwAAAHQAAABkAAAAXgAAAAMAAAAAlQAAAAAAEAAAAQABAAAAZAE#8AAAAAAAAAAAAAQAAAAAlQAAAAAAEAACVycAAAAAAAAAAABACAAAAAAAAAUAAUBgwAAAAAAAAAAAlgAAABoAAAAAlQACYW4AAACXAAAAZAAAAF4AAAAGAAAAAJUAAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABkAAAAXgAAABsAAAAAlQAAAAAAEAACVyIAAAAAAAAAAABACAAAAAAAAAUAAAAAXgAAAJYAAAAaAAAAAJUAAm1hAAAAlwAAAGQAAACaAAAAHAAAAACVAAN0bWEAAACbAAAAEQEAAACVAAAAAABAAAAAAAAAAMAAAAAAAAAAAAAAmRAAAAAAAAEAAAACAAAAHQAAAAAMAAAAnAAAAB4AAAAADAAAAJgAAAAMAAAAmwAAAAwAAACYAAAAAAEAAAB0AAAACgD#####AB5BZmZpY2hhZ2UgZGUgbG9uZ3VldXIgb3JpZW50w6kAAAAHAAAAAQAAAAMAAABBAAAADgAAACQAAAADAAAAAJ4AAAAAABAAAAEAAQAAAA4BP#AAAAAAAAAAAAAEAAAAAJ4AAAAAABAAAlcnAAAAAAAAAAAAQAgAAAAAAAAFAAFAYMAAAAAAAAAAAJ8AAAAaAAAAAJ4AAmFuAAAAoAAAAA4AAAAkAAAABgAAAACeAAAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAADgAAACQAAAAbAAAAAJ4AAAAAABAAAlciAAAAAAAAAAAAQAgAAAAAAAAFAAAAACQAAACfAAAAGgAAAACeAAJtYQAAAKAAAAAOAAAAowAAABwAAAAAngADdG1hAAAApAAAABEBAAAAngAAAAAAQAAAAAAAAADAAAAAAAAAAAAAAKIQAAAAAAABAAAAAgAAAB0AAAAADAAAAKUAAAAeAAAAAAwAAAChAAAADAAAAKQAAAAMAAAAoQAAAAABAAAAQQAAABkA#####wAAAAAAAQEAAABXAAAAB###########"
		let DA = arrondi(Math.sqrt(L2**2+l1**2),1)
		let t1 = arrondi(Math.sqrt(4+h**2),1) // longueur d'un côté du triangle
		let t2 = arrondi(Math.sqrt((c-2)**2+h**2),1) // longueur de l'autre côté d'un triangle
		let texte_corr = ""
		texte_corr += `La première figure est composée d'un rectangle de ${L1} cm par ${l1} cm`
		texte_corr += ` et d'un triangle rectangle dont les côtés de l'angle droit mesurent ${L2} cm et ${l1} cm.<br>`
		texte_corr += `$\\mathcal{P}_{1}=${L1+L2}+${tex_nombre(DA)}+${L1}+${l1}=${tex_nombrec(L1+L2+DA+L1+l1)}$ cm.<br>`
		texte_corr += `$\\mathcal{A}_{1}=${L1}\\times${l1}+${L2}\\times${l1}\\div2=${L1*l1}+${calcul((L2*l1)/2)}=${calcul(L1*l1+(L2*l1)/2)}~${tex_texte(' cm')}^2$.`
		texte_corr += '<br><br>'
		texte_corr += `La deuxième figure est un carré de côté ${c} cm auquel il faut enlever un triangle de ${c} cm de base et ${h} cm de hauteur.<br>`
		texte_corr += `$\\mathcal{P}_{2}=${c}+${c}+${c}+${tex_nombre(t1)}+${tex_nombre(t2)}=${tex_nombrec(3*c+t1+t2)}$ cm<br>`
		texte_corr += `$\\mathcal{A}_{2}=${c}\\times${c}-${c}\\times${h}\\div2=${c*c}-${c*h}=${tex_nombrec(c**2-c*h)}~${tex_texte(' cm')}^2$.`
		
		this.MG32codeBase64 = codeBase64
		this.MG32code_pour_modifier_la_figure = `
	        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "L1", "${L1}");
	        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "l1", "${l1}");
	        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "L2", "${L2}");
	        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "c", "${c}");
	        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "h", "${h}");
	        mtg32App.calculate("MG32svg${numero_de_l_exercice}");
	        mtg32App.display("MG32svg${numero_de_l_exercice}");
	      ` 			
		this.liste_corrections.push(texte_corr);
		liste_de_question_to_contenu_sans_numero(this);		
	}
}


/**
* Citer des formules de périmètre, des formules d'aire ou la définition de π
* @Auteur Rémi Angot
*/
function Connaitre_formules_de_perimetre_et_aires(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Connaitre le cours sur le périmètre et l'aire";
	this.consigne = "Calculer";
	this.nb_questions = 4;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		liste_type_de_questions = combinaison_listes(['pi','prectangle','pcarre','acarre','arectangle','pcercle','acercle','atrianglerectangle','atriangle'],this.nb_questions)
		for (let i = 0, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) {
			switch (liste_type_de_questions[i]){
				case 'pi':
					texte = "Rappeler la définition du nombre $\\pi$."
					texte_corr = "$\\pi$ est la longueur d'un cercle de diamètre 1."
				break
				case 'prectangle':
					texte = "Donner une formule du périmètre du rectangle."
					texte_corr = "$\\mathcal{P}_{\\text{rectangle}}=(L+l)\\times2=L\\times2+l\\times2=L+l+L=l$<br><br>"
					texte_corr += "Avec $L$ la longueur et $l$ la largeur du rectangle."
				break
				case 'pcarre':
					texte = "Donner une formule du périmètre du carré."
					texte_corr = "$\\mathcal{P}_{\\text{carré}}=c\\times4=c+c+c+c$<br><br>"
					texte_corr += "Avec $c$ la longueur du côté du carré."
				break
				case 'arectangle':
					texte = "Donner une formule de l'aire du rectangle."
					texte_corr = "$\\mathcal{A}_{\\text{rectangle}}=L\\times l$<br><br>"
					texte_corr += "Avec $L$ la longueur et $l$ la largeur du rectangle."
				break
				case 'acarre':
					texte = "Donner une formule de l'aire du carré."
					texte_corr = "$\\mathcal{A}_{\\text{carré}}=c\\times c=c^2$<br><br>"
					texte_corr += "Avec $c$ la longueur du côté du carré."
				break
				case 'atrianglerectangle':
					texte = "Donner une formule de l'aire du triangle rectangle."
					texte_corr = "$\\mathcal{A}_{\\text{triangle rectangle}}=a\\times b \\div2=\\dfrac{a\\times b}{2}$<br><br>"
					texte_corr += "Avec $a$ et $b$ les longueurs des côtés de l'angle droit."
				break
				case 'atriangle':
					texte = "Donner une formule de l'aire d'un triangle quelconque."
					texte_corr = "$\\mathcal{A}_{\\text{triangle rectangle}}=b\\times h \\div2=\\dfrac{b\\times h}{2}$<br><br>"
					texte_corr += "Avec $b$ la longueur d'un côté et $h$ la longueur de la hauteur relative à ce côté."
				break
				case 'pcercle':
					texte = "Donner une formule de la longueur d'un cercle (aussi appelée circonférence)."
					texte_corr = "$\\mathcal{P}_{\\text{cercle}}=D\\times \\pi = 2\\times R \\times \\pi = 2\\pi{}R$<br><br>"
					texte_corr += "Avec $D$ le diamètre et $R$ le rayon de ce cercle."
				break
				case 'acercle':
					texte = "Donner une formule de l'aire d'un disque."
					texte_corr = "$\\mathcal{A}_{\\text{disque}}=R\\times R\\times\\pi=\\pi R^2$<br><br>"
					texte_corr += "Avec $R$ le rayon de ce disque."
				break

			}
			
			
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	//this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}


/**
* Compléter des égalités sur les nombres décimaux
* * n/100 = .../10 + .../100
* * n/100 = .../100 + .../10
* * .../100 = u+ d/10 + c/100
* * u = .../10
* * u = .../100
* * n/10 = ... + .../10 + .../100
* @Auteur Rémi Angot
*/
function Exercice_differentes_ecritures_nombres_decimaux(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Différentes écritures des nombres décimaux"
	this.consigne = "Compléter l'égalité puis donner l'écriture décimale."
	this.spacing = 2;
	this.spacing_corr = 2;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = [1,2,3,4,5,6]
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		
		for (let i = 0, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) {
			type_de_questions = liste_type_de_questions[i];
			let u = randint(2,9); //chiffre des unités
			let d = randint(1,9); //chiffre des dixièmes
			let c = randint(1,9); //chiffre des centièmes
			let n = 100*u+10*d+c;
			let ecriture_decimale;
			switch (type_de_questions){
				case 1 : // n/100 = .../10 + .../100
					ecriture_decimale = tex_nombre(calcul(u+d/10+c/100));
					texte = `$${tex_fraction(n,'100')}=\\ldots\\ldots+${tex_fraction('',10)}+${tex_fraction('',100)}=\\ldots$`;
					texte_corr = `$${tex_fraction(n,'100')}=${u}+${tex_fraction(d,'10')}+${tex_fraction(c,'100')}=${ecriture_decimale}$`;

					break ;
				case 2 : // n/100 = .../100 + .../10
					ecriture_decimale = tex_nombre(calcul(u+d/10+c/100))
					texte = `$${tex_fraction(n,'100')}=\\ldots\\ldots+${tex_fraction('',100)}+${tex_fraction('',10)}=\\ldots$`;
					texte_corr = `$${tex_fraction(n,'100')}=${u}+${tex_fraction(c,100)}+${tex_fraction(d,10)}=${ecriture_decimale}$`;
					break ;
				case 3 : // .../100 = u+ d/10 + c/100
					ecriture_decimale = tex_nombre(calcul(u+d/10+c/100))
					texte = `$${tex_fraction('','100')}=${u}+${tex_fraction(d,'10')}+${tex_fraction(c,'100')}=\\ldots$`;
					texte_corr = `$${tex_fraction(n,'100')}=${u}+${tex_fraction(d,'10')}+${tex_fraction(c,'100')}=${ecriture_decimale}$`;
					break ;
				case 4 : // u = .../10
					texte = `$${u}=${tex_fraction('','10')}$`;
					texte_corr = `$${u}=${tex_fraction(10*u,'10')}$`;
					break ;
				case 5 : // u = .../100
					texte = `$${u}=${tex_fraction('','100')}$`;
					texte_corr = `$${u}=${tex_fraction(100*u,'10')}$`;
					break ;
				case 6 : // n/10 = ... + .../10 + .../100
					ecriture_decimale = tex_nombre(calcul(n/10))
					texte = `$${tex_fraction(n,10)}=\\ldots\\ldots+${tex_fraction('',10)}+${tex_fraction('',100)}=\\ldots$`;
					texte_corr = `$${tex_fraction(n,10)}=${u*10+d}+${tex_fraction(c,10)}+${tex_fraction(0,100)}=${ecriture_decimale}$`;
					break ;
			}
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	//this.besoin_formulaire_numerique = ['Niveau de difficulté',2,'1 : Multiplication par un facteur positif\n2: Multiplication par un facteur relatif'] 
}


/**
* Additions, soustractions et multiplications posées de nombres entiers
*
* * abcd +efg
* * abc0-efg
* * 1abc-def
* * abc*d0e tables de 2 à 5
* * abc*de tables de 5 à 9
* @Auteur Rémi Angot
*/
function Additions_soustractions_multiplications_posees(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Additions, soustractions et multiplications posées de nombres entiers"
	this.consigne = "Poser et effectuer les calculs suivants."
	this.spacing = 2;
	sortie_html ? this.spacing_corr=2 : this.spacing_corr = 1; //Important sinon les opérations posées ne sont pas jolies
	this.nb_questions = 5;
	// this.pas_de_version_HMTL=true;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = [1,2,3,4,5]
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		if (this.nb_questions==3) {liste_type_de_questions = [1,2,5]}
		if (this.nb_questions==4) {liste_type_de_questions = [1,2,4,5]}

		for (let i = 0, texte, texte_corr, cpt=0, a, b, c, d,e ,f, g, x, y; i < this.nb_questions && cpt<50; ) {
			type_de_questions = liste_type_de_questions[i];
			switch (type_de_questions){
				case 1 : // abcd +efg
					a = randint(1,9)*10000+randint(5,9)*1000+randint(5,9)*100+randint(7,9)*10+randint(1,9)
					b = randint(5,9)*100+randint(7,9)*10+randint(1,9)
					texte = `$${tex_nombre(a)}+${b}$`;
					!sortie_html ? texte_corr = `$\\opadd{${a}}{${b}}$` : texte_corr = `$${tex_nombre(a)}+${b}=${tex_nombre(a+b)}$`;
					break ;
				case 2 : // abc0-efg
					a = randint(1,9)
					b = randint(1,9)
					c = randint(1,9)
					e = randint(b,9)
					f = randint(c,9)
					g = randint(2,9)
					x = a*1000+b*100+c*10
					y = e*100+f*10+g
					texte = `$${tex_nombre(x)}-${y}$`;
					!sortie_html ? texte_corr = `$\\opsub{${x}}{${y}}$` : texte_corr = `$${tex_nombre(x)}+${y}=${tex_nombre(x+y)}$`;
					break ;
				case 3 : // 1abc-def
					a = randint(1,9)
					b = randint(1,9)
					c = randint(1,9)
					d = randint(a,9)
					e = randint(1,9)
					f = randint(c,9)
					x = 1000+a*100+b*10+c
					y = d*100+e*10+f
					texte = `$${tex_nombre(x)}-${y}$`;
					!sortie_html ? texte_corr = `$\\opsub{${x}}{${y}}$` : texte_corr=`$${tex_nombre(x)}-${y}=${tex_nombre(x-y)}$`;
					break ;
				case 4 : // abc*d0e tables de 2 à 5
					a = randint(2,5)
					b = randint(2,5)
					c = randint(2,5)
					d = randint(2,5)
					e = randint(2,5)
					x = 100*a+10*b+c
					y = d*100+e
					texte = `$${tex_nombre(x)}\\times${y}$`;
					!sortie_html ? texte_corr = `$\\opmul{${x}}{${y}}$` : texte_corr=`$${tex_nombre(x)}\\times${y}=${tex_nombre(x*y)}$`;
					break ;
				case 5 : // abc*de tables de 5 à 9
					a = randint(5,9)
					b = randint(5,9)
					c = randint(5,9)
					d = randint(5,9)
					e = randint(5,9)
					x = 100*a+10*b+c
					y = 10*d+e
					texte = `$${x}\\times${y}$`;
					!sortie_html ? texte_corr = `$\\opmul{${x}}{${y}}$` : texte_corr=`$${tex_nombre(x)}\\times${y}=${tex_nombre(x*y)}$`;
					break ;
			}
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	//this.besoin_formulaire_numerique = ['Niveau de difficulté',2,'1 : Multiplication par un facteur positif\n2: Multiplication par un facteur relatif'] 
}


/**
* Additions et soustractions de nombres décimaux
* * xxx-xx,x
* * xxx-xx,xx
* * xxx,x-xxx
* * x0x-xx9,x
* * xxx+xx,x
* * xxx+xx,xx
* * xxx,x+xxx
* * x0x+xx9,x
* @Auteur Rémi Angot
*/
function Additionner_soustraires_decimaux(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Additions et soustractions de nombres décimaux"
	this.consigne = "Poser et effectuer les calculs suivants."
	this.spacing = 2;
	sortie_html ? this.spacing_corr=2 : this.spacing_corr = 1; //Important sinon les opérations posées ne sont pas jolies
	this.nb_questions = 4;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let liste_de_type_d_additions = combinaison_listes([5,6,7,8],this.nb_questions)
		let liste_de_type_de_soustractions = combinaison_listes([1,2,3,4],this.nb_questions)
		let liste_type_de_questions=[]
		for (let i = 0; i < this.nb_questions; i++) {
			if ((i+1)<(this.nb_questions/2)) { // première moitié sont des additions mais si c'est impair on prendra plus de soustractions
				liste_type_de_questions.push(liste_de_type_d_additions[i])
			} else {
				liste_type_de_questions.push(liste_de_type_de_soustractions[i])
			}
		}


		for (let i = 0, texte, texte_corr, cpt=0, a, b, c, d,e ,f, g, x, y; i < this.nb_questions && cpt<50; ) {
			type_de_questions = liste_type_de_questions[i];
			switch (type_de_questions){
				case 1 : // xxx-xx,x
					a = randint(1,4)*100+randint(2,5)*10+randint(1,9)
					b = calcul(randint(5,9)*10+randint(6,9)+randint(1,9)/10)
					texte = `$${tex_nombre(a)}-${tex_nombre(b)}$`;
					sortie_html ? texte_corr = `$${tex_nombre(a)}-${tex_nombre(b)}=${tex_nombrec(a-b)}$` : texte_corr =`$\\opsub[decimalsepsymbol={,}]{${a}}{${b}}$`;
					break ;
				case 2 : // xxx-xx,xx
					a = randint(1,4)*100+randint(2,5)*10+randint(1,9)
					b = calcul(randint(5,9)*10+randint(6,9)+randint(1,9)/10+randint(1,9)/100)
					texte = `$${tex_nombre(a)}-${tex_nombre(b)}$`;
					sortie_html ? texte_corr = `$${tex_nombre(a)}-${tex_nombre(b)}=${tex_nombrec(a-b)}$` : texte_corr =`$\\opsub[decimalsepsymbol={,}]{${a}}{${b}}$`;
					break ;
				case 3 : // xxx,x-xxx
					a = calcul(randint(5,9)*100+randint(2,5)*10+randint(1,9)+randint(1,9)/10)
					b = randint(1,4)*100+randint(6,9)*10+randint(1,9)
					texte = `$${tex_nombre(a)}-${tex_nombre(b)}$`;
					sortie_html ? texte_corr = `$${tex_nombre(a)}-${tex_nombre(b)}=${tex_nombrec(a-b)}$` : texte_corr =`$\\opsub[decimalsepsymbol={,}]{${a}}{${b}}$`;
					break ;
				case 4 : // x0x-xx9,x
					a = calcul(randint(5,9)*100+randint(1,5))
					b = calcul(randint(1,4)*100+randint(1,9)*10+9+randint(1,9)/10)
					texte = `$${tex_nombre(a)}-${tex_nombre(b)}$`;
					sortie_html ? texte_corr = `$${tex_nombre(a)}-${tex_nombre(b)}=${tex_nombrec(a-b)}$` : texte_corr =`$\\opsub[decimalsepsymbol={,}]{${a}}{${b}}$`;
					break ;
				case 5 : // xxx+xx,x
					a = randint(1,4)*100+randint(2,5)*10+randint(1,9)
					b = calcul(randint(5,9)*10+randint(6,9)+randint(1,9)/10)
					texte = `$${tex_nombre(a)}+${tex_nombre(b)}$`;
					sortie_html ? texte_corr = `$${tex_nombre(a)}+${tex_nombre(b)}=${tex_nombrec(a+b)}$` : texte_corr =`$\\opadd[decimalsepsymbol={,}]{${a}}{${b}}$`;
					break ;
				case 6 : // xxx+xx,xx
					a = randint(1,4)*100+randint(2,5)*10+randint(1,9)
					b = calcul(randint(5,9)*10+randint(6,9)+randint(1,9)/10+randint(1,9)/100)
					texte = `$${tex_nombre(a)}+${tex_nombre(b)}$`;
					sortie_html ? texte_corr = `$${tex_nombre(a)}+${tex_nombre(b)}=${tex_nombrec(a+b)}$` : texte_corr =`$\\opadd[decimalsepsymbol={,}]{${a}}{${b}}$`;
					break ;
				case 7 : // xxx,x+xxx
					a = calcul(randint(5,9)*100+randint(2,5)*10+randint(1,9)+randint(1,9)/10)
					b = randint(1,4)*100+randint(6,9)*10+randint(1,9)
					texte = `$${tex_nombre(a)}+${tex_nombre(b)}$`;
					sortie_html ? texte_corr = `$${tex_nombre(a)}+${tex_nombre(b)}=${tex_nombrec(a+b)}$` : texte_corr =`$\\opadd[decimalsepsymbol={,}]{${a}}{${b}}$`;
					break ;
				case 8 : // x0x+xx9,x
					a = calcul(randint(5,9)*100+randint(1,5))
					b = calcul(randint(1,4)*100+randint(1,9)*10+9+randint(1,9)/10)
					texte = `$${tex_nombre(a)}+${tex_nombre(b)}$`;
					sortie_html ? texte_corr = `$${tex_nombre(a)}+${tex_nombre(b)}=${tex_nombrec(a+b)}$` : texte_corr =`$\\opadd[decimalsepsymbol={,}]{${a}}{${b}}$`;
					break ;
			}
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
}

/**
* Poser et effectuer les divisions euclidiennes suivantes puis donner l'égalité fondamentale correspondante.
* 
* Niveau de difficulté 1 :
* * division par 2, 3 , 4 ou 5
* * division par 6 à 9
* * un 0 dans le quotient
*
* Niveau de difficulté 2 : 
* * division par 11, 12, 15, 25
* * division par 13,14,21,22,23 ou 24 et un 0 dans le quotient
* * division par un multiple de 10 et un 0 dans le quotient
* @Auteur Rémi Angot
*/
function Divisions_euclidiennes(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Divisions euclidiennes"
	this.consigne = "Poser et effectuer les divisions euclidiennes suivantes puis donner l'égalité fondamentale correspondante."
	this.spacing = 2;
	sortie_html ? this.spacing_corr=2 : this.spacing_corr = 1; //Important sinon opidiv n'est pas joli
	this.nb_questions = 4;
	this.sup = 1;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		this.sup==1 ? type_de_questions_disponibles = [1,2,2,3] : type_de_questions_disponibles = [4,4,5,6]
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		
		for (let i = 0, texte, texte_corr, cpt=0, a, b, q, r; i < this.nb_questions && cpt<50; ) {
			type_de_questions = liste_type_de_questions[i];
			switch (type_de_questions){
				case 1 : // division par 2, 3 , 4 ou 5
					q = randint(2,5)*100+randint(2,5)*10+randint(2,5)
					b = randint(2,5)
					break ;
				case 2 : // division par 6 à 9
					q = randint(5,9)*100+randint(2,5)*10+randint(5,9)
					b = randint(6,9)
					break ;
				case 3 : // un 0 dans le quotient
					if (randint(1,2)==1) {
						q = randint(2,9)*1000+randint(2,9)*100+randint(2,9)
					} else {
						q = randint(2,9)*1000+randint(2,9)*10+randint(2,9)
					}
					b = randint(7,9)
					break ;
				case 4 : // division par 11, 12, 15, 25
					q = randint(1,5)*100+randint(1,5)*10+randint(1,5)
					b = choice([11,12,15,25])
					break ;
				case 5 : // division par 13,14,21,22,23 ou 24 et un 0 dans le quotient
					q = randint(1,5)*1000+randint(6,9)*100+randint(1,5)
					b = choice([11,12,13,14,21,22,23,24])
					break ;
				case 6 : // division par un multiple de 10 et un 0 dans le quotient
					q = randint(6,9)*1000+randint(6,9)*10+randint(1,5)
					b = randint(2,9)*10
					break ;
			}
			r = randint(0,b-1) //reste inférieur au diviseur
			a = b*q+r
			texte = `$${tex_nombre(a)}\\div${b}$`;
			if (r==0) {
				sortie_html ? texte_corr = `$${tex_nombre(a)}\\div${b}=${q}$` : texte_corr = `$\\opidiv[voperation=top]{${a}}{${b}}$\\\\\\\\$${tex_nombre(a)}\\div${b}=${q}$`;

			} else {
				sortie_html ? texte_corr = `$${tex_nombre(a)}=${b}\\times${q}+${r}$` : texte_corr = `$\\opidiv[voperation=top]{${a}}{${b}}$\\\\\\\\$${tex_nombre(a)}=${b}\\times${q}+${r}$`;
			}
					
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',2,'1 : Quotient inférieur à 10\n2: Quotient à 2 chiffres'] 
}




/**
* Effectuer les divisions décimales suivantes et donner la valeur exacte de leur quotient.
* 
* Niveau de difficulté 1 : 
* * entier divisé par 4 quotient : xx,25 ou xx,75
* * entier divisé par 8 quotient : x,125 ou x,375 ou x,625 ou x,875
* * entier divisé par 6 quotient : xxx,5
* * quotient xx,xx division par 2, 3 , 4 ou 5
* * quotient x,xxx division par 6 à 9
* * un 0 dans le quotient
*
* Niveau de difficulté 2 : division par 3, 7 ou 9
* @Auteur Rémi Angot
*/
function Division_decimale(){ 
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Divisions décimales"
	this.consigne = "Effectuer les divisions décimales suivantes et donner la valeur exacte de leur quotient."
	this.spacing = 2;
	sortie_html ? this.spacing_corr=2 : this.spacing_corr = 1; //Important sinon opdiv n'est pas joli
	this.nb_questions = 4;
	this.sup = 1;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		this.sup==1 ? type_de_questions_disponibles = [choice([1,2,3]),4,5,6] : type_de_questions_disponibles = [7,8,9]
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		
		for (let i = 0, texte, texte_corr, cpt=0, a, b, q, r; i < this.nb_questions && cpt<50; ) {
			type_de_questions = liste_type_de_questions[i];
			switch (type_de_questions){
				case 1 : // entier divisé par 4 quotient : xx,25 ou xx,75
					b = 4
					a = (randint(2,9)*10+randint(2,9))*4+choice([1,3])
					q = calcul(a/b)
					break ;
				case 2 : // entier divisé par 8 quotient : x,125 ou x,375 ou x,625 ou x,875
					b = 8
					a = randint(2,9)*8+choice([1,3,5,7])
					q = calcul(a/b)
					break ;
				case 3 : // entier divisé par 6 quotient : xxx,5
					b = 6
					q = calcul(randint(2,9)*100+randint(2,9)*10+randint(2,9)+0.5)
					a = q*6
					break ;
				case 4 : // quotient xx,xx division par 2, 3 , 4 ou 5
					q = calcul(randint(2,5)*10+randint(2,5)+randint(2,5)/10+randint(2,5)/100)
					b = randint(2,5)
					a = calcul(b*q)
					break ;
				case 5 : // quotient x,xxx division par 6 à 9
					q = calcul(randint(6,9)+randint(5,9)/10+randint(6,9)/100+randint(6,9)/1000)
					b = randint(6,9)
					a= calcul(b*q)
					break ;
				case 6 : // un 0 dans le quotient
					if (randint(1,2)==1) { //x0x,x
						q = calcul(randint(2,9)*100+randint(2,9)+randint(2,9)/10)
					} else { //xx0,x
						q = calcul(randint(2,9)*100+randint(2,9)*10+randint(2,9)/10)
					}
					b = randint(7,9)
					a = calcul(b*q)
					break ;
				case 7 : // division par 7
					a = randint(2,9)*7+randint(1,6)
					b = 7
					q = Algebrite.eval(Math.floor(Algebrite.eval(a/b*1000))/1000);
					break ;
				case 8 : // division par 9
					a = calcul(randint(11,19)*9/10+randint(1,8)/10)
					b = 9
					q = Algebrite.eval(Math.floor(Algebrite.eval(a/b*1000))/1000);
					break ;
				case 9 : //division par 3
					a = calcul(randint(11,99)*3/100+randint(1,2)/100)
					b = 3
					q = Algebrite.eval(Math.floor(Algebrite.eval(a/b*1000))/1000);

			}
			if (this.sup==2) {
				this.consigne = "Effectuer les divisions décimales suivantes et donner une valeur approchée de leur quotient au millième près."
			}
			texte = `$${tex_nombre(a)}\\div${b}$`;
			if (this.sup==1) {
				sortie_html ? texte_corr = `$${tex_nombre(a)}\\div${b}=${tex_nombre(q)}$` : texte_corr = `$\\opdiv[displayintermediary=all,voperation=top,decimalsepsymbol={,},shiftdecimalsep=none]{${a}}{${b}}$\\\\\\\\$${tex_nombre(a)}\\div${b}=${tex_nombre(q)}$`;
			} else {
				sortie_html ? texte_corr = `$${tex_nombre(a)}\\div${b}\\approx${tex_nombre(q)}$` : texte_corr = `$\\opdiv[displayintermediary=all,voperation=top,period,decimalsepsymbol={,},shiftdecimalsep=none]{${a}}{${b}}$\\\\\\\\$${tex_nombre(a)}\\div${b}\\approx${tex_nombre(q)}$`;
			}
					
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Type de questions',2,'1 : Déterminer le quotient exact\n2: Déterminer un quotient approché au millième près'] 
}


/**
* Multiplication de deux nombres décimaux
*
* * xxx * xx,x chiffres inférieurs à 5
* * xx,x * x,x
* * x,xx * x0x
* * 0,xx * x,x
* @Auteur Rémi Angot
*/
function Multiplier_decimaux(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Multiplications posées de nombres décimaux"
	this.consigne = "Poser et effectuer les calculs suivants."
	this.spacing = 2;
	this.spacing_corr = 1; //Important sinon le calcul posé ne fonctionne pas avec opmul et spacing
	this.nb_questions = 4;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = [1,2,3,4]
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		
		for (let i = 0, texte, texte_corr, cpt=0, a, b, c, d,e ,f, g, x, y; i < this.nb_questions && cpt<50; ) {
			type_de_questions = liste_type_de_questions[i];
			switch (type_de_questions){
				case 1 : // xxx * xx,x chiffres inférieurs à 5
					a = randint(2,5)*100+randint(2,5)*10+randint(2,5)
					b = calcul(randint(2,5)*10+randint(2,5)+randint(2,5)/10)
					break ;
				case 2 : // xx,x * x,x 
					a = calcul(randint(2,9)*10+randint(2,9)+randint(2,9)/10)
					b = calcul(randint(6,9)+randint(6,9)/10)
					break ;
				case 3 : // x,xx * x0x 
					a = calcul(randint(2,9)+randint(2,9)/10+randint(2,9)/100)
					b = calcul(randint(2,9)*100+randint(2,9))
					break ;
				case 4 : // 0,xx * x,x 
					a = calcul(randint(2,9)/10+randint(2,9)/100)
					b = calcul(randint(2,9)+randint(2,9)/10)
					break ;
			}

			texte = `$${tex_nombre(a)}\\times${tex_nombre(b)}$`;
			sortie_html ? texte_corr = `$${tex_nombre(a)}\\times${tex_nombre(b)}=${tex_nombrec(a*b)}$` : texte_corr =`$\\opmul[decimalsepsymbol={,}]{${a}}{${b}}$`;
					
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
}


/**
* Multiplication d'un nombre décimal dans différentes écritures par 10, 100, 1000
*
*  * Type 1 : écriture décimale
*  * Type 2 : écriture fractionnaire
*  * Type 3 : écritures fractionnaires et décimales
*
*
*  * Sup2 : avec ou sans calculs à trous 
* @Auteur Rémi Angot
*
*/
function Multiplier_decimaux_par_10_100_1000 (){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Multiplications d'un nombre décimal par 10, 100 ou 1 000."
	this.consigne = "Calculer."
	this.sup = 3; 
	this.sup2=false;
	this.spacing = 2;
	this.spacing_corr = 2; 
	this.nb_questions = 8;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let type_de_questions_disponibles = []
		if (this.sup==1 && !this.sup2) type_de_questions_disponibles = [1,2];
		if (this.sup==1 && this.sup2) type_de_questions_disponibles = [1,2,5,6];
		if (this.sup==2 && !this.sup2) type_de_questions_disponibles = [3,4];
		if (this.sup==2 && this.sup2) type_de_questions_disponibles = [3,4,3,4,7,8,9,10];
		if (this.sup==3 && !this.sup2) type_de_questions_disponibles = [1,2,3,4];
		if (this.sup==3 && this.sup2) type_de_questions_disponibles = [1,2,3,4,5,6,7,8,9,10];

		if (this.sup2) this.consigne = "Calculer et compléter."

		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		let liste_de_facteurs = combinaison_listes([10,100,1000],this.nb_questions)

		for (let i = 0, texte, texte_corr, cpt=0, a, b, den; i < this.nb_questions && cpt<50; ) {
			type_de_questions = liste_type_de_questions[i];
			switch (type_de_questions){
				case 1 : // a,abcd × 10
					a = choice([randint(11,99),randint(100,999)]);
					a = calcul(a/choice([10,100,1000,10000]));
					b = liste_de_facteurs[i];
					texte = `$${tex_nombre(a)}\\times${tex_nombre(b)}$`;
					texte_corr = `$${tex_nombre(a)} \\times ${tex_nombre(b)} = ${tex_nombrec(a*b)}$`;
					break ;
				case 2 : // 10 × a,abcd
					a = choice([randint(11,99),randint(100,999)]);
					a = calcul(a/choice([10,100,1000,10000]));
					b = liste_de_facteurs[i];
					texte = `$${tex_nombre(b)}\\times${tex_nombre(a)}$`;
					texte_corr = `$${tex_nombre(b)} \\times ${tex_nombre(a)} = ${tex_nombrec(a*b)}$`;
					break ;
				case 3 : // abcd/10 × 10
					a = choice([randint(11,99),randint(100,999),randint(2,9)]);
					den = choice([10,100,1000])
					b = liste_de_facteurs[i];
					texte = `$${tex_fraction(a,den)}\\times${tex_nombre(b)}$`;
					texte_corr = `$${tex_fraction(a,den)} \\times ${tex_nombre(b)} = ${tex_fraction(a*b,den)} = ${tex_nombrec(a/den*b)}$`;
					break ;
				case 4 : // 10 × abcd/10
					a = choice([randint(11,99),randint(100,999),randint(2,9)]);
					den = choice([10,100,1000])
					b = liste_de_facteurs[i];
					texte = `$${tex_nombre(b)}\\times${tex_fraction(a,den)}$`;
					texte_corr = `$${tex_nombre(b)} \\times ${tex_fraction(a,den)} = ${tex_fraction(a*b,den)} = ${tex_nombrec(a/den*b)}$`;
					break ;
				case 5 : // .... × 10 = a,abcd
					a = choice([randint(11,99),randint(100,999)]);
					a = calcul(a/choice([10,100,1000,10000]));
					b = liste_de_facteurs[i];
					texte = `$\\ldots \\times${tex_nombre(b)} = ${tex_nombrec(a*b)}$`;
					texte_corr = `$${mise_en_evidence(tex_nombre(a))} \\times ${tex_nombre(b)} = ${tex_nombrec(a*b)}$`;
					break ;
				case 6 : // 10 × .... = a,abcd
					a = choice([randint(11,99),randint(100,999)]);
					a = calcul(a/choice([10,100,1000,10000]));
					b = liste_de_facteurs[i];
					texte = `$${tex_nombre(b)} \\times \\ldots = ${tex_nombrec(a*b)}$`;
					texte_corr = `$${tex_nombre(b)} \\times ${mise_en_evidence(tex_nombre(a))}  = ${tex_nombrec(a*b)}$`;
					break ;
				case 7 : // case 3 avec un trou sur l'entier 
					a = choice([randint(11,99),randint(100,999),randint(2,9)]);
					den = choice([10,100,1000])
					b = liste_de_facteurs[i];
					texte = `$${tex_fraction(a,den)}\\times \\ldots = ${tex_nombrec(a/den*b)}$`;
					texte_corr = `$${tex_fraction(a,den)} \\times ${mise_en_evidence(tex_nombre(b))} = ${tex_fraction(a*b,den)} = ${tex_nombrec(a/den*b)}$`;
					break ;
				case 8 : // case 4 avec un trou sur l'entier
					a = choice([randint(11,99),randint(100,999),randint(2,9)]);
					den = choice([10,100,1000])
					b = liste_de_facteurs[i];
					texte = `$ \\ldots \\times${tex_fraction(a,den)}= ${tex_nombrec(a/den*b)}$`;
					texte_corr = `$${mise_en_evidence(tex_nombre(b))} \\times ${tex_fraction(a,den)} = ${tex_fraction(a*b,den)} = ${tex_nombrec(a/den*b)}$`;
					break ;
				case 9 : // case 3 avec trou sur la fraction
					a = choice([randint(11,99),randint(100,999),randint(2,9)]);
					den = choice([10,100,1000])
					b = liste_de_facteurs[i];
					texte = `$${tex_fraction(a,'\\ldots')}\\times${tex_nombre(b)} = ${tex_nombrec(a/den*b)}$`;
					texte_corr = `$${tex_fraction(a,mise_en_evidence(tex_nombre(den)))} \\times ${tex_nombre(b)} = ${tex_fraction(a*b,den)} = ${tex_nombrec(a/den*b)}$`;
					break ;
				case 10 : // case 4 avec trou sur la fraction
					a = choice([randint(11,99),randint(100,999),randint(2,9)]);
					den = choice([10,100,1000])
					b = liste_de_facteurs[i];
					texte = `$${tex_nombre(b)}\\times${tex_fraction(a,'\\ldots')} = ${tex_nombrec(a/den*b)}$`;
					texte_corr = `$${tex_nombre(b)} \\times ${tex_fraction(a,mise_en_evidence(tex_nombre(den)))} = ${tex_fraction(a*b,den)} = ${tex_nombrec(a/den*b)}$`;
					break ;
			}

			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Types de calculs',3,"1 : Écriture décimale\n2 : Écriture fractionnaire\n3 : Écritures décimales et fractionnaires"];
	this.besoin_formulaire2_case_a_cocher = ['Avec des calculs à trous']
}


/**
* Plusieurs type de calcul avec des entiers.
*
* Sans parenthèses :  
* * a+b*c
* * a+b÷c
* * a÷b*c
* * a-b*c
* * a*b÷c
* * a*b+c
* * a-b+c
* * a+b+c*d
* * a*b+c*d
* * a*b*c-d
* * a*b-c÷d
* * a*b+c÷d
* 
* Avec parenthèses : 
* * a*(b-c)
* * (a-b)*c
* * (a-b)÷c
* * a÷(b+c)
* * (a-b)÷c
* * a*(b-c)*d
* * a*b*(c-d)
* * a*(b-c*d)
* * (a+b*c)÷d
* * a*(b-c*d)
* * a*b÷(c+d)
* * a*(b÷c+d)
* @Auteur Rémi Angot
*/
function Priorites(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Calculer en utilisant les priorités opératoires";
	this.consigne = "Calculer";
	this.nb_questions = 5;
	this.nb_cols = 2;
	this.nb_cols_corr = 1;
	this.sup = 3;

	
	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let liste_questions_disponibles = []//
		if (this.sup==1){
			liste_questions_disponibles = range1(12);
		} else if (this.sup==2){
			liste_questions_disponibles = range1(22,range1(12));
		} else {
			liste_questions_disponibles = range1(22);

		}
		let liste_type_de_questions = combinaison_listes(liste_questions_disponibles,this.nb_questions);
		for (let i = 0, texte, texte_corr, a, b,c, d, cpt=0; i < this.nb_questions && cpt<50; ) {
			switch (liste_type_de_questions[i]){
				case 1 : 
					a = randint(2,11);
					b = randint(2,11);
					c = randint(2,11);
					texte = `$${a}+${b}\\times${c}$`
					texte_corr = `$${a}+${mise_en_evidence(b+'\\times'+c)}=${a}+${b*c}=${a+b*c}$`
				break
				case 2 : 
					a = randint(2,11);
					c = randint(2,11);
					b = c*randint(2,11);
					texte = `$${a}+${b}\\div${c}$`
					texte_corr = `$${a}+${mise_en_evidence(b+'\\div'+c)}=${a}+${b/c}=${a+b/c}$`
				break
				case 3 : 
					b = randint(2,11);
					c = randint(2,11);
					a = b*randint(2,11);
					texte = `$${a}\\div${b}\\times${c}$`
					texte_corr = `$${mise_en_evidence(a+'\\div'+b)}\\times${c}=${a/b}\\times${c}=${a/b*c}$`
				break
				case 4 : 
					b = randint(2,11);
					c = randint(2,11);
					a = b*c+randint(2,11);
					texte = `$${a}-${b}\\times${c}$`
					texte_corr = `$${a}-${mise_en_evidence(b+'\\times'+c)}=${a}-${b*c}=${a-b*c}$`
				break
				case 5 :
					if (choice([true,false])) { //a est un multiple de c
						c = randint(2,6)
						a = c*randint(2,5)
						b = randint(2,6)
					} else { // b est un multiple de c
						c = randint(2,6)
						b = c*randint(2,5)
						a = randint(2,6)
					}
					texte = `$${a}\\times${b}\\div${c}$`
					texte_corr = `$${mise_en_evidence(a+'\\times'+b)}\\div${c}=${a*b}\\div${c}=${a*b/c}$`
				break
				case 6 :
					a = randint(2,11);
					b = randint(2,11);
					c = randint(2,11);
					texte = `$${a}\\times${b}+${c}$`
					texte_corr = `$${mise_en_evidence(a+'\\times'+b)}+${c}=${a*b}+${c}=${a*b+c}$`
				break
				case 7 :
					b = randint(20,59);
					a = b+randint(11,29);
					c = randint(11,29);
					texte = `$${a}-${b}+${c}$`
					texte_corr = `$${mise_en_evidence(a+'-'+b)}+${c}=${a-b}+${c}=${a-b+c}$`
				break
				case 8 :
					a = randint(2,20);
					b = randint(2,20);
					c = randint(2,11);
					d = randint(2,11);
					texte = `$${a}+${b}+${c}\\times${d}$`
					texte_corr = `$${a}+${b}+${mise_en_evidence(c+'\\times'+d)}=${a}+${b}+${c*d}=${a+b+c*d}$`
				break
				case 9 :
					a = randint(2,11);
					b = randint(2,11);
					c = randint(2,11);
					d = randint(2,11);
					texte = `$${a}\\times${b}+${c}\\times${d}$`
					texte_corr = `$${mise_en_evidence(a+'\\times'+b)}+${mise_en_evidence(c+'\\times'+d)}=${a*b}+${c*d}=${a*b+c*d}$`
				break
				case 10 :
					a = randint(2,5);
					b = randint(2,5);
					c = randint(2,5);
					d = randint(2,a*b*c-1);
					texte = `$${a}\\times${b}\\times${c}-${d}$`
					texte_corr = `$${mise_en_evidence(a+'\\times'+b)}\\times${c}-${d}=${mise_en_evidence(a*b+'\\times'+c)}-${d}=${a*b*c-d}$`
				break
				case 11 :
					a = randint(3,11);
					b = randint(3,11);
					d = randint(2,11);
					c = d*randint(2,8);
					texte = `$${a}\\times${b}-${c}\\div${d}$`
					texte_corr = `$${mise_en_evidence(a+'\\times'+b)}-${mise_en_evidence(c+'\\div'+d)}=${a*b}-${c/d}=${a*b-c/d}$`
				break
				case 12 :
					a = randint(2,11);
					b = randint(2,11);
					d = randint(2,11);
					c = d*randint(2,8);
					texte = `$${a}\\times${b}+${c}\\div${d}$`
					texte_corr = `$${mise_en_evidence(a+'\\times'+b)}+${mise_en_evidence(c+'\\div'+d)}=${a*b}+${c/d}=${a*b+c/d}$`
				break
				case 13 : 
					a = randint(2,11);
					c = randint(2,11);
					b = c+randint(2,11);
					texte = `$${a}\\times(${b}-${c})$`
					texte_corr = `$${a}\\times(${mise_en_evidence(b+`-`+c)})=${a}\\times${b-c}=${a*(b-c)}$`
				break
				case 14 : 
					b = randint(11,39);
					a = b+randint(2,11);
					c = randint(2,11);
					texte = `$(${a}-${b})\\times${c}$`
					texte_corr = `$(${mise_en_evidence(a+`-`+b)})\\times${c}=${a-b}\\times${c}=${(a-b)*c}$`
				break
				case 15 : 
					c = randint(2,11)
					b = randint(11,39);
					a = b+c*randint(2,9);
					texte = `$(${a}-${b})\\div${c}$`
					texte_corr = `$(${mise_en_evidence(a+`-`+b)})\\div${c}=${a-b}\\div${c}=${(a-b)/c}$`
				break
				case 16 : 
					b = randint(2,5)
					c = randint(2,6);
					a = (b+c)*randint(2,9);
					texte = `$${a}\\div(${b}+${c})$`
					texte_corr = `$${a}\\div(${mise_en_evidence(b+`+`+c)})=${a}\\div${b+c}=${a/(b+c)}$`
				break
				case 17 : 
					c = randint(2,11)
					b = randint(11,39);
					a = b+c*randint(2,9);
					texte = `$(${a}-${b})\\div${c}$`
					texte_corr = `$(${mise_en_evidence(a+`-`+b)})\\div${c}=${a-b}\\div${c}=${(a-b)/c}$`
				break
				case 18 : 
					c = randint(11,39);
					b = c+randint(2,5);
					a = randint(2,5);
					d = randint(2,5)
					texte = `$${a}\\times(${b}-${c})\\times${d}$`
					texte_corr = `$${a}\\times(${mise_en_evidence(b+`-`+c)})\\times${d}=${a}\\times${b-c}\\times${d}=${a*(b-c)*d}$`
				break
				case 19 : 
					d = randint(11,39);
					c = d+randint(2,5);
					a = randint(2,5);
					b = randint(2,5)
					texte = `$${a}\\times${b}\\times(${c}-${d})$`
					texte_corr = `$${a}\\times${b}\\times(${mise_en_evidence(c+`-`+d)})=${a}\\times${b}\\times${c-d}=${a*b*(c-d)}$`
				break
				case 20 : 
					a = randint(2,11);
					c = randint(2,11);
					d = randint(2,11);
					b = c*d+randint(2,11)
					texte = `$${a}\\times(${b}-${c}\\times${d})$`
					texte_corr = `$${a}\\times(${b}-${mise_en_evidence(c+`\\times`+d)})=${a}\\times(${mise_en_evidence(b+`-`+(c*d))})=${a}\\times${b-c*d}=${a*(b-c*d)}$`
				break
				case 21 : 
					a = randint(2,11);
					b = randint(2,11);
					if (liste_des_diviseurs(a*b).length<=2) {}
					let liste = liste_des_diviseurs(a*b)
					if (liste.length>2) {
						liste.pop() //on supprime le plus grand diviseur qui est le produit
					}
					if (liste.length>2) {
						enleve_element(liste,liste[1]) //on supprime le plus petit diviseur (autre que 1)
					}

					let somme = choice(liste,[1]) // la somme doit être un diviseur différent de 1
					c = randint(1,somme-1);
					d = somme -c;
					texte = `$${a}\\times${b}\\div(${c}+${d})$`
					texte_corr = `$${a}\\times${b}\\div(${mise_en_evidence(c+`+`+d)})=${mise_en_evidence(a+'\\times'+b)}\\div${c+d}=${a*b}\\div${c+d}=${a*b/(c+d)}$`
				break
				case 22 : 
					a = randint(2,11);
					c = randint(2,11);
					b = c*randint(2,5)
					d = randint(2,6);
					texte = `$${a}\\times(${b}\\div${c}+${d})$`
					texte_corr = `$${a}\\times(${mise_en_evidence(b+`\\div`+c)}+${d})=${a}\\times(${mise_en_evidence((b/c)+`+`+d)})=${a}\\times${b/c+d}=${a*(b/c+d)}$`
				break
			}
			
			
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Type de calculs',3,'1 : Sans parenthèses\n2: Avec parenthèses\n3: Avec ou sans parenthèses'] 
}






/**
* @Auteur Rémi Angot
*/
function Code_LaTeX_personnalise() {
	// Classe parente de tous les exercices qui seront créés
    this.titre = 'Code LaTeX personnalisé';
    this.pas_de_version_HMTL = true ;
    this.consigne = '';
    this.consigne_correction = '';
    this.liste_questions = [];
    this.liste_corrections = [];
    this.contenu = '';
    this.contenu_correction = '';
    this.nb_questions = 10;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.spacing = 1;
    this.spacing_corr = 1;
    this.beamer = false;
    this.sup = '%Votre code LaTeX'
    this.sup2 = '%Votre code LaTeX pour le corrigé'

    this.consigne_modifiable = false;
   	this.nb_questions_modifiable = false;
   	this.nb_cols_modifiable = false;
   	this.nb_cols_corr_modifiable = false;
   	this.spacing_modifiable = false;
   	this.spacing_corr_modifiable = false;

   	this.besoin_formulaire_numerique = false; // Sinon this.besoin_formulaire_numerique = [texte,max,tooltip facultatif];
   	this.besoin_formulaire_texte = ['Code LaTeX énoncé','Par exemple : \\input{mon_fichier}']; // Sinon this.besoin_formulaire_texte = [texte,tooltip];
   	this.besoin_formulaire2_texte = ['Code LaTeX correction','Par exemple : \\input{mon_fichier_corr}'];
   	this.besoin_formulaire_case_a_cocher = false; // Sinon this.besoin_formulaire_case_a_cocher = [texte];
   	
   	this.nouvelle_version = function(numero_de_l_exercice){
   		   	this.contenu = this.sup
   		   	this.contenu_correction = this.sup2
   	}

}

/**
* @Auteur Rémi Angot
*/
function HTML_personnalise() {
	// Classe parente de tous les exercices qui seront créés
    this.titre = 'Exercice personnalisé';
    this.pas_de_version_HMTL = false ;
    this.pas_de_version_LaTeX = true ;
    this.consigne = '';
    this.consigne_correction = '';
    this.liste_questions = [];
    this.liste_corrections = [];
    this.contenu = '';
    this.contenu_correction = '';
    this.nb_questions = 10;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.spacing = 1;
    this.spacing_corr = 1;
    this.beamer = false;
    this.sup = "Énoncé de l'exercice"
    this.sup2 = "Énoncé de la correction"

    this.consigne_modifiable = false;
   	this.nb_questions_modifiable = false;
   	this.nb_cols_modifiable = false;
   	this.nb_cols_corr_modifiable = false;
   	this.spacing_modifiable = false;
   	this.spacing_corr_modifiable = false;

   	this.besoin_formulaire_numerique = false; // Sinon this.besoin_formulaire_numerique = [texte,max,tooltip facultatif];
   	this.besoin_formulaire_long_texte = ['Exercice']; // Sinon this.besoin_formulaire_texte = [texte,tooltip];
   	this.besoin_formulaire2_texte = ['Correction'];
   	this.besoin_formulaire_case_a_cocher = false; // Sinon this.besoin_formulaire_case_a_cocher = [texte];
   	
   	this.nouvelle_version = function(numero_de_l_exercice){
   		   	this.contenu = this.sup
   		   	this.contenu_correction = this.sup2
   	}

}


// Exercices paramétré pour correspondre au référentiel
/**
 * Lire les coordonnées d'un point du quart de plan positif avec une précision allant de l'unité à 0,25.
 * @Auteur Jean-Claude Lhote
 */
function reperage_point_du_quart_de_plan(){
	reperage_point_du_plan.call(this);
	this.titre = "Déterminer les coordonnées (positives) d'un point";
	this.quart_de_plan=true;	;

}
function fonctions_lineaires(){
	fonctions_affines.call(this);
	this.titre="Déterminer une fonction linéaire";
	this.lineaire=true;
}

function Resoudre_une_equation_produit_nul_niv2(){
	Resoudre_une_equation_produit_nul.call(this);
	this.titre = "Résoudre une équation produit nul niveau2";
	this.sup=2;
}

function Divisions_euclidiennes_niv2(){
	Divisions_euclidiennes.call(this);
	this.sup = 2;
	this.titre = "Divisions euclidiennes - Niveau 2"
}
function Exercice_Trigo_longueurs_4e(){
	Exercice_Trigo_longueurs.call(this);
	this.sup =1;
	this.besoin_formulaire_numerique = false;
	this.titre = "Utiliser le cosinus pour calculer une longueur dans un triangle rectangle";
}

function Exercice_Trigo_angles_4e(){
	this.sup =1;
	this.quatrieme = true;
	this.titre = "Utiliser le cosinus pour calculer la mesure d'un angle dans un triangle rectangle"
	Exercice_Trigo_angles.call(this);
}

function Exercice_6N12(){
	Tables_de_multiplications.call(this);
	this.sup = "10;100;1000";
	this.titre = 'Multiplier un entier par 10, 100, 1 000...';
}

function Exercice_6N13(){
	this.sup = 1;
	this.titre = 'Utiliser les préfixes multiplicateurs (déca à kilo)';
	Exercice_conversions.call(this);
}

function Exercice_6N24(){
	Exercice_conversions.call(this);
	this.sup = 3;
	this.titre = 'Utiliser les préfixes multiplicateurs et diviseurs (milli à kilo)';
	this.correction_avec_des_fractions = true;
	this.spacing_corr = 2;
}

function Reglages_6M12(){
	Exercice_conversions_de_longueurs.call(this);
	this.sup = 3;
	this.nb_questions = 8;
}

function Reglages_6M23(){
	Exercice_conversions_aires.call(this);
	this.sup = 3;
	this.nb_cols_corr = 1;
}

function Reglages_6M10(){
	Exercice_perimetres_et_aires.call(this);
	this.sup = 1;
}

function Reglages_6M22(){
	Exercice_perimetres_et_aires.call(this);
	this.sup = 2;
	this.titre = "Périmètres et aires de disques (à partir d'un texte)."
}

function Reglages_6N34(){
	Exercice_conversions.call(this);
	this.sup = 5;
	this.titre = "Conversions avec tous les préfixes de milli à tera."
}

function Thales_4eme() {		//Dans cette version, pas de configuration papillon reservée aux 3èmes.
	Exercice_Thales.call(this);
	this.quatrieme = true
}


/**
* @Auteur Rémi Angot
*/
function LaTeX_static() {
	// Classe parente de tous les exercices qui seront créés
    this.titre = 'Fichier statique';
    this.pas_de_version_HMTL = false ;
    this.consigne = '';
    this.consigne_correction = '';
    this.liste_questions = [];
    this.liste_corrections = [];
    this.contenu = '';
    this.contenu_correction = '';
    this.nb_questions = 10;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.spacing = 1;
    this.spacing_corr = 1;
    this.beamer = false;
    this.sup = 'Nom du fichier'

    this.consigne_modifiable = false;
   	this.nb_questions_modifiable = false;
   	this.nb_cols_modifiable = false;
   	this.nb_cols_corr_modifiable = false;
   	this.spacing_modifiable = false;
   	this.spacing_corr_modifiable = false;

   	this.besoin_formulaire_numerique = false; // Sinon this.besoin_formulaire_numerique = [texte,max,tooltip facultatif];
   	this.besoin_formulaire_texte = ['url du fichier',"nom du fichier sans l'extension"]; // Sinon this.besoin_formulaire_texte = [texte,tooltip];
   	//this.besoin_formulaire2_texte = ['Code LaTeX correction','Par exemple : \\input{mon_fichier_corr}'];

   	this.nouvelle_version = function(numero_de_l_exercice){
   		//this.contenu_correction = '%£tex/probleme_altitude_corr£'
   		//this.contenu = '%£tex/probleme_altitude£'
   		this.contenu = '%£'+this.sup+'£'
   		this.contenu_correction = '%£'+this.sup+'_corr£'
   		//liste_des_exercices_statiques.push(this.sup)
   	}

}

// FIN DES EXERCICES
// Gestion des listes d'exercices

jQuery(document).ready(function() {
// Ne se fait qu'après que le DOM soit entièrement défini



	// Trie par ordre alphabétique les exercices disponibles
	liste_des_exercices_disponibles = tridictionnaire(liste_des_exercices_disponibles);
	
	// Détermine le nombre d'exercices par niveaux
	let nombre_d_exercices_disponibles_6 = 0;
	let nombre_d_exercices_disponibles_5 = 0;
	let nombre_d_exercices_disponibles_4 = 0;
	let nombre_d_exercices_disponibles_3 = 0;
	let nombre_d_exercices_disponibles_2 = 0;
	let nombre_d_exercices_disponibles_CM = 0;
	let nombre_d_exercices_disponibles_prof = 0;
	//debut ajout seb section tests
	let nombre_d_exercices_disponibles_tests = 0;
	//fin seb section tests
	for (var id in liste_des_exercices_disponibles){
		if (id[0]==6) {nombre_d_exercices_disponibles_6+=1}
		if (id[0]==5) {nombre_d_exercices_disponibles_5+=1}
		if (id[0]==4) {nombre_d_exercices_disponibles_4+=1}
		if (id[0]==3) {nombre_d_exercices_disponibles_3+=1}
		if (id[0]==2) {nombre_d_exercices_disponibles_2+=1}
		if (id[0]=='C') {nombre_d_exercices_disponibles_CM+=1}
		if (id[0]=='P') {nombre_d_exercices_disponibles_prof+=1}
		//debut ajout seb section tests
		if (id[0]=='T') {nombre_d_exercices_disponibles_tests+=1}
		//fin seb section tests
	}

	//
	let liste_html_des_exercices_6 = []
	let liste_html_des_exercices_5 = []
	let liste_html_des_exercices_4 = []
	let liste_html_des_exercices_3 = []
	let liste_html_des_exercices_2 = []
	let liste_html_des_exercices_CM = []
	let liste_html_des_exercices_prof = []
	//debut ajout seb section tests
	let liste_html_des_exercices_tests = []
	//fin seb section tests


	// Affiche de la liste des exercices disponibles 
	let liste_html_des_exercices = '<h3 class="ui block header">Exercices disponibles</h3>\n\n';
	for (var id in liste_des_exercices_disponibles) {
		let exercice_tmp = new liste_des_exercices_disponibles[id];
		if (id[0]==6) {
			liste_html_des_exercices_6 += '<span class="id_exercice">' + id + '</span> - <a class="lien_id_exercice" numero="' + id + '">'  + exercice_tmp.titre + '</a></br>\n';			
		}
		if (id[0]==5) {
			liste_html_des_exercices_5 += '<span class="id_exercice">' + id + '</span> - <a class="lien_id_exercice" numero="' + id + '">'  + exercice_tmp.titre + '</a></br>\n';			
		}
		if (id[0]==4) {
			liste_html_des_exercices_4 += '<span class="id_exercice">' + id + '</span> - <a class="lien_id_exercice" numero="' + id + '">'  + exercice_tmp.titre + '</a></br>\n';			
		}
		if (id[0]==3) {
			liste_html_des_exercices_3 += '<span class="id_exercice">' + id + '</span> - <a class="lien_id_exercice" numero="' + id + '">'  + exercice_tmp.titre + '</a></br>\n';			
		}
		if (id[0]==2) {
			liste_html_des_exercices_2 += '<span class="id_exercice">' + id + '</span> - <a class="lien_id_exercice" numero="' + id + '">'  + exercice_tmp.titre + '</a></br>\n';			
		}
		if (id[0]=='C') {
			liste_html_des_exercices_CM += '<span class="id_exercice">' + id + '</span> - <a class="lien_id_exercice" numero="' + id + '">'  + exercice_tmp.titre + '</a></br>\n';			
		}
		if (id[0]=='P') {
			liste_html_des_exercices_prof += '<span class="id_exercice">' + id + '</span> - <a class="lien_id_exercice" numero="' + id + '">'  + exercice_tmp.titre + '</a></br>\n';			
		}
		// //debut ajout seb section tests
		// if (id[0]=='T') {
		// 	liste_html_des_exercices_tests += '<span class="id_exercice">' + id + '</span> - <a class="lien_id_exercice" numero="' + id + '">'  + exercice_tmp.titre + '</a></br>\n';			
		// }
		// //fin seb section tests

	}


	// Change l'ordre des exercices suivant l'URL
	if (window.location.href.indexOf('cm.html')>0) {
		liste_html_des_exercices += `<div class="ui accordion"><div class="active title"><i class="dropdown icon"></i>Calcul mental (${nombre_d_exercices_disponibles_CM})</div><div class="active content">`
		liste_html_des_exercices += liste_html_des_exercices_CM
		liste_html_des_exercices+=`</div>`
		liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Sixième (${nombre_d_exercices_disponibles_6})</div><div class="content">`
		liste_html_des_exercices += liste_html_des_exercices_6
		liste_html_des_exercices+=`</div>`
		liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Cinquième (${nombre_d_exercices_disponibles_5})</div><div class="content">`
		liste_html_des_exercices += liste_html_des_exercices_5
		liste_html_des_exercices+=`</div>`
		liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Quatrième (${nombre_d_exercices_disponibles_4})</div><div class="content">`
		liste_html_des_exercices += liste_html_des_exercices_4
		liste_html_des_exercices+=`</div>`
		liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Troisième (${nombre_d_exercices_disponibles_3})</div><div class="content">`
		liste_html_des_exercices += liste_html_des_exercices_3
		liste_html_des_exercices+=`</div>`
		liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Seconde (${nombre_d_exercices_disponibles_2})</div><div class="content">`
		liste_html_des_exercices += liste_html_des_exercices_2
		liste_html_des_exercices+=`</div>`
		liste_html_des_exercices+=`</div>`	
	} else {
		liste_html_des_exercices += `<div class="ui accordion"><div class="title"><i class="dropdown icon"></i>Sixième (${nombre_d_exercices_disponibles_6})</div><div class="content">`
		liste_html_des_exercices += liste_html_des_exercices_6
		liste_html_des_exercices+=`</div>`
		liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Cinquième (${nombre_d_exercices_disponibles_5})</div><div class="content">`
		liste_html_des_exercices += liste_html_des_exercices_5
		liste_html_des_exercices+=`</div>`
		liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Quatrième (${nombre_d_exercices_disponibles_4})</div><div class="content">`
		liste_html_des_exercices += liste_html_des_exercices_4
		liste_html_des_exercices+=`</div>`
		liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Troisième (${nombre_d_exercices_disponibles_3})</div><div class="content">`
		liste_html_des_exercices += liste_html_des_exercices_3
		liste_html_des_exercices+=`</div>`
		liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Seconde (${nombre_d_exercices_disponibles_2})</div><div class="content">`
		liste_html_des_exercices += liste_html_des_exercices_2
		liste_html_des_exercices+=`</div>`
		liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Calcul mental (${nombre_d_exercices_disponibles_CM})</div><div class="content">`
		liste_html_des_exercices += liste_html_des_exercices_CM
		liste_html_des_exercices+=`</div>`
		// //debut ajout seb section tests
		// liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Section Tests (${nombre_d_exercices_disponibles_tests})</div><div class="content">`
		// liste_html_des_exercices += liste_html_des_exercices_tests
		// liste_html_des_exercices+=`</div>`
		//fin seb section tests
		// Ajoute les outils prof sur mathalealatex
		if (window.location.href.indexOf('mathalealatex.html')>0) {
			liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Outils pour le professeur (${nombre_d_exercices_disponibles_prof})</div><div class="content">`
			liste_html_des_exercices += liste_html_des_exercices_prof
			liste_html_des_exercices+=`</div>`
		}
		liste_html_des_exercices+=`</div>`
	}
		
	$('#liste_des_exercices').html(liste_html_des_exercices);

	

	// Gère le clic sur un exercice de la liste
	$('.lien_id_exercice').click(function(){
		let numero=$(this).attr('numero');
		if ($('#choix_des_exercices').val()=='') {
			$('#choix_des_exercices').val($('#choix_des_exercices').val() + numero);	
		} else {
			$('#choix_des_exercices').val($('#choix_des_exercices').val() + ',' + numero);
		}
		liste_des_exercices = $('#choix_des_exercices').val().replace(/\s/g, "").replace(";", ",").split(",");
		mise_a_jour_de_la_liste_d_exercice();



});

});


