/*
  Alacarte
 @name      alacarte.js
 @author    Rémi Angot
 @license   MIT License
 @homepage  https://copmaths.fr
 @example   http://coopmaths.fr/alacarte
*/

var tableau_url_tex = [['items/MATHS.6.G14_ProgrammeConstruction', 'MATHS.6.G14_.tex', 'MATHS.6.G14_-cor.tex'], ['items/MATHS.6.M20_Aire_triangles', 'MATHS.6.M20v2.tex', 'MATHS.6.M20v2-cor.tex'], ['items/MATHS.6.M20_Aire_triangles', 'MATHS.6.M20_.tex', 'MATHS.6.M20_-cor.tex'], ['items/MATHS.6.G11_Perpendiculaire', 'MATHS.6.G11_.tex', 'MATHS.6.G11_-cor.tex'], ['items/MATHS.6.G23_Rapporteur', 'MATHS.6.G23.tex', 'MATHS.6.G23-cor.tex'], ['items/MATHS.6.M23_PerimetreAiresDisques', 'MATHS.6.M23.tex', 'MATHS.6.M23-cor.tex'], ['items/MATHS.6.N22_CalculsFractions', 'MATHS.6.N22_.tex', 'MATHS.6.N22_-cor.tex'], ['items/MATHS.6.G10_VocabulaireNotations', 'MATHS.6.G10_.tex', 'MATHS.6.G10_-cor.tex'], ['items/MATHS.6.R10_ProprietesParallelesPerpendiculaires', 'MATHS.6.R10_.tex', 'MATHS.6.R10_-cor.tex'], ['items/MATHS.6.N23_NombresDecimaux', 'MATHS.6.N23_.tex', 'MATHS.6.N23_-cor.tex'], ['items/MATHS.6.C11_DivisionsEuclidiennes', 'MATHS.6.C11_v1.tex', 'MATHS.6.C11_v1-cor.tex'], ['items/MATHS.6.N21_AbscissesFractionnaires', 'MATHS.6.N21_.tex', 'MATHS.6.N21_-cor.tex'], ['items/MATHS.6.R12_ProprietesDefinitionsMediatrice', 'MATHS.6.R12.tex', 'MATHS.6.R12-cor.tex'], ['items/MATHS.6.G13_CarresRectangles', 'MATHS.6.G13_.tex', 'MATHS.6.G13_-cor.tex'], ['items/MATHS.6.C12_ProblemesNiveau1', 'MATHS.6.C12_v1.tex', 'MATHS.6.C12_v1-cor.tex'], ['items/MATHS.6.G12_Paralleles', 'MATHS.6.G12_.tex', 'MATHS.6.G12_-cor.tex'], ['items/MATHS.6.R11_SchemaProprietesParallelesPerpendiculaires', 'MATHS.6.R11_v1.tex', 'MATHS.6.R11_v1-cor.tex'], ['items/MATHS.6.M21_Aire_assemblage', 'MATHS.6.M21.tex', 'MATHS.6.M21-cor.tex'], ['items/MATHS.6.M24_Portions_disque', 'MATHS.6.M24.tex', 'MATHS.6.M24-cor.tex'], ['items/MATHS.6.N20_FractionsEtEntiers', 'MATHS.6.N20_v1.tex', 'MATHS.6.N20_v1-cor.tex'], ['items/MATHS.6.C10_AddSousMulEntiers', 'MATHS.6.C10_v1.tex', 'MATHS.6.C10_v1-cor.tex'], ['items/MATHS.6.C22_Problemes2', 'MATHS.6.C22.tex', 'MATHS.6.C22-cor.tex']]
var tableau_de_demandes = [];
var code_LaTeX = "";
var besoin_des_axes_gradues=false;
var message_d_erreur = "";
var liste_packages = new Set;




/**
* tableau_url_tex est un tableau de tableaux
* 
* Chaque tableau est de la forme [nom du répertoire,nom du fichier, nom du fichier de la correction]
*
* On ajoute un dernnier element qui est une simplification du nom du répertoire (pas de points, pas /items)
*
* @Auteur Rémi Angot
*/
function creeIdPourComparaison(item, index, arr) {
  item[3]=item[0].replace(/\./g,'').replace('items/','');
  //une fois tous les points supprimés, on chercher le dernier 'tex' du string pour remettre '.tex'
  // plus utilisé : .replace(/tex(?!.*tex)/g,'.tex') pour trouver le dernier 'tex' et le remplacer par '.tex'
  item[3] = item[3].split('_')[0];
  //ne garde que ce qui est avant le caractère _
}

tableau_url_tex.forEach(creeIdPourComparaison)




/**
* Récupère le texte saisi pour le transformer en tableau de tableaux. 
*
* Premier séparateur le saut de ligne ; deuxième séparateur le point-virgule.
*
* @Auteur Rémi Angot
*/
function textarea_to_array(textarea_id_textarea) {
	let text = textarea_id_textarea.value//.replace(/[ ]/g,'');
	// récupère le texte en effaçant tous les espaces
	let tableau = text.split("\n");
	tableau.forEach(function(ligne,i){
		tableau[i]=ligne.split(";");
		// Regarde s'il y a besoin de modifier le préambule
		//if (tableau[i].includes('6N21')) {besoin_des_axes_gradues=true} inutile avec liste_package
	});
	return tableau
}

/**
* Transforme un id d'exercice en url d'exercice statique
*
* Affiche un message d'erreur s'il n'y a pas d'exercice disponible.
*
* @Auteur Rémi Angot
*/
function id_to_url(id){
	// Retourne les éléments du tableau qui inclue l'id demandé
	let tableau_items = tableau_url_tex.filter(element => element[3].includes(id))
	if (tableau_items.length==0) {
		return "pas_d_url"
	} else {
		// Choisit un fichier tex au hasard dans les répertoires 
		let item = tableau_items[Math.floor(Math.random()*tableau_items.length)]
		return [item[0]+'/'+item[1],item[0]+'/'+item[2]]
	}
}


/**
* Transforme le texte saisi par l'utilisateur en un dictionnaire avec l'id des exercices et les éventuels paramètres (sup, sup2, nb_questions)
*
*
* txt_to_objet_parametres_exercice('6C10,sup=false,nb_questions=5')
* {id: "6C10", sup: false, nb_questions: 5}
* @Auteur Rémi Angot
*/
function txt_to_objet_parametres_exercice(txt) { //
    'use strict';
    let tableau_objets_exercices = new Array
    	let CleValeur = txt.split(",");
    	let ObjetParametres = {}
	    ObjetParametres["id"] = CleValeur[0] // Récupère le premier élément qui est forcément l'id
	    CleValeur.shift() // Retire ce premier élément
	    if (CleValeur.length>0){
	    	for (let i in CleValeur){
	    		CleValeur[i]=CleValeur[i].split("=")
		    	// change le type de ce qui ne doit pas être un string
		    	if (CleValeur[i][1]=="true" || CleValeur[i][1]=="false") {//"true"=>true
		    		ObjetParametres[CleValeur[i][0]]=(CleValeur[i][1]=="true")
		    	} else if (!isNaN(CleValeur[i][1])){ //"17"=>17
		    	ObjetParametres[CleValeur[i][0]]=parseInt(CleValeur[i][1])
		    	} else {
		    	ObjetParametres[CleValeur[i][0]]=CleValeur[i][1]	
		    	}
			}
		}

return ObjetParametres;
}


/**
* Met à jour le code LaTeX à partir de l'identifiant d'un exercice.
*
* On regarde d'abord si un exercice aléatoire a le même identifiant.
*
* //// ANNULÉ   //// Si ce n'est pas le cas, on cherche dans le répertoire /items s'il y a un répertoire qui correspond
*
* @Auteur Rémi Angot
*/
function item_to_contenu(txt){
	// De préférence un exercice aléatoire
	let dictionnaire = txt_to_objet_parametres_exercice(txt);
	let e = dictionnaire['id'];
	let idExerciceMathALEA = e.replace('MATHS','').replace(/\./g,'').replace(/ /g,'')
	// Pour faire la correspondance entre SACoche et MathALEA, on supprime 'MATHS' et tous les points dans les noms des id
	if (idExerciceMathALEA in liste_des_exercices_disponibles) {
			exercice_aleatoire = new liste_des_exercices_disponibles[idExerciceMathALEA];
			if (dictionnaire['sup']) {
				exercice_aleatoire.sup = dictionnaire['sup']
			}
			if (dictionnaire['sup2']) {
				exercice_aleatoire.sup2 = dictionnaire['sup2']
			}
			if (dictionnaire['nb_questions']) {
				exercice_aleatoire.nb_questions = dictionnaire['nb_questions']
			}
			exercice_aleatoire.id = idExerciceMathALEA
			exercice_aleatoire.nouvelle_version()
			code_LaTeX += `\n\n%%% ${e} : Exercice aléatoire - ${exercice_aleatoire.titre}%%%\n\n`
			code_LaTeX += exercice_aleatoire.contenu + '\n\n'
			code_LaTeX_corr += exercice_aleatoire.contenu_correction + '\n\n'

			if (typeof exercice_aleatoire.liste_packages === 'string') {
					liste_packages.add(exercice_aleatoire.liste_packages)
				} else { // si c'est un tableau
					exercice_aleatoire.liste_packages.forEach(liste_packages.add,liste_packages)
				} 

	// Sinon un exercice statique si le nom de l'item est inclus dans le nom du répertoire
	} 
	else { 
		
		// if (id_to_url(idExerciceMathALEA)!="pas_d_url") {
		// 	// Ajout de packages pour les exercices statiques
		// 	liste_packages.add('xlop')
		// 	liste_packages.add('tkz-euclide')
		// 	$.get("../"+id_to_url(idExerciceMathALEA)[0], function( txt ) {
		// 			code_LaTeX += `\n\n%%% ${e} : Exercice statique - ${id_to_url(idExerciceMathALEA)[0]}%%%\n\n`
		// 			code_LaTeX += txt + '\n\n'
		// 			})
		// 	.fail(function() {
		// 			// S'il le fichier ne charge pas
		// 				code_LaTeX += `\n\n%%% Pas d'exercice disponible pour ${e}.\n\n`
	    // 				updateMessageErreur(`Impossible de charger un exercice pour ${e}.\n`);
	    // 				console.log(e,id_to_url(e))
	    // 			})
		// 	.done(function() { // Lorsque l'exercice a chargé, on essaie de chargé une correction
		// 		$.get("../"+id_to_url(idExerciceMathALEA)[1], function( txt ) {
		// 			code_LaTeX_corr += txt + '\n\n'
		// 			})
		// 			.fail(function() {
		// 			// S'il n'y a pas de fichier de correction disponible.
		// 				code_LaTeX_corr += `\n\n%%% Pas de correction disponible pour ${e}.\n\n\\exo{} \n\n`
		// 				// On écrit quand même un exercice vide pour garder la numérotation des exercices.
		// 				updateMessageErreur(`Pas de correction disponible pour ${e}.\n`);
		// 			});
    				
  		// 	})
				
		// 	} else { 
				// Si l'identifiant de l'exercice n'est disponible ni sur MathALEA ni dans la liste statique des url tableau_url_tex
				code_LaTeX += `\n\n%%% Pas d'exercice disponible pour ${e}.\n\n`
	    		updateMessageErreur(`Pas d'exercice disponible pour ${e}.\n`);
			// }
		}
		
}


/**
* Met à jour le message d'erreur en évitant les doublons.
*
* @Auteur Rémi Angot
*/
function updateMessageErreur(text) {
	if (message_d_erreur.indexOf(text)==-1) {
		message_d_erreur += text
	}
}



window.onload = function()  {

	jQuery.ajaxSetup({async:false}); // Tout le traitement se fait de manière synchrone. 
									// On attend le résultat des requetes url vers les fichiers statiques pour bien avoir les exercices dans l'ordre
	$('.ui.radio.checkbox').checkbox(); // active les boutons radio (pour le style)
	$('.ui.checkbox').checkbox();
	// Gestion du menu déroulant par une fonction auto-exécutante
	let attendre=0;
	(function menu_deroulant () {
		const el = document.getElementsByClassName('menu_exercices_construit');
		// Vérifie que ce div inutile a bien été créé
		if (el.length && attendre>1) {
			// S'il est présent on règle le menu
	    	$('.ui.dropdown').dropdown({ // gestion du clic sur le menu déroulant pour ajouter un item dans le textarea
	    action: function(text, value, element){$('#textarea_id_items').val($('#textarea_id_items').val()+';'+text.split(' ')[0])}
	  });  //active les menus déroulants
		} else {
    		setTimeout(menu_deroulant, 300); // retente dans 300 milliseconds
    		attendre+=1
		}
	})();


	$('.ui.radio.checkbox').checkbox(); // active les boutons radio (pour le style)

	// Gestion de la suppression des identifiants
let form_supprimer_reference = document.getElementById('supprimer_reference');
form_supprimer_reference.addEventListener('change', function(e) { // Dès que le statut change, on met à jour
	console.log('click')
	document.getElementById('valider').click();
});
	

	$('#reglages_sortie_LaTeX').hide();

	$( "#valider").click(function() {
		$('#div_code_LaTeX').html(" ")
		code_LaTeX = "";
		code_LaTeX_corr = "";
		message_d_erreur = "";
		tableau_de_demandes = textarea_to_array(textarea_id_items);
		tableau_de_demandes.forEach(function(ligne){
			ligne.forEach(function(e,i){
				let rang_premier_item=0
				if ($('#style1:checked').val()){
					rang_premier_item = 2
					if (i==0){
						code_LaTeX +=entete_eleve(ligne[0],ligne[1])
						code_LaTeX_corr +=entete_eleve(ligne[0],ligne[1])

					}
				}
				if ($('#style2:checked').val()){
					rang_premier_item = 1
					if (i==0){
						code_LaTeX +=entete_eleve(ligne[0])
						code_LaTeX_corr +=entete_eleve(ligne[0])
					}
				}
				if ($('#style3:checked').val()){
					rang_premier_item = 0
					if (i==0){
						code_LaTeX +=entete_eleve()
						code_LaTeX_corr +=entete_eleve()
					}
				}

				if (i>=rang_premier_item) {
					if (e.replace(/ /g, '').length>2){
						item_to_contenu(e);
					}
				}
					
			});
				
		});
		if (message_d_erreur.length>1) {
			alert(message_d_erreur);
		}
		// Affiche les boutons de compilation
		if (code_LaTeX.length>2) {
			$('#reglages_sortie_LaTeX').show();	
		}
		//Affiche le code LaTeX
		$('#div_code_LaTeX').html('<pre><code class="language-latex">' + code_LaTeX + intro_correction +
			code_LaTeX_corr + '</code></pre>');
		var div = document.getElementById('div_code_LaTeX');
		Prism.highlightAllUnder(div); // Met à jour la coloration syntaxique
	});




	// Gestion du téléchargement

	$( "#btn_telechargement").click(function() {
		creer_fichier()

		if ($("#nom_du_fichier").val()) {
			telechargeFichier(contenu_fichier, $("#nom_du_fichier").val()+'.tex');	
		}else
		{
			telechargeFichier(contenu_fichier, 'mathalea.tex');
		}
		
	});



	$( "#btn_overleaf").click(function() {
		creer_fichier();
		// Envoi à Overleaf.com en modifiant la valeur dans le formulaire

		$('input[name=encoded_snip]').val(encodeURIComponent(contenu_fichier));
		if ($("#nom_du_fichier").val()) {
			$('input[name=snip_name]').val($("#nom_du_fichier").val());	//nomme le projet sur Overleaf
		}
			
		});

	// Gestion des paramètres du fichier LaTeX

	$('#options_style_CoopMaths').hide(); 	// par défaut le style est classique donc on 
	$('a.lien_images').hide();				// cache les options du style Coop
	$(function(){
		$("input:radio[name='style']").change(function(){
			if ($('#style_classique:checked').val()){
				$('#options_style_CoopMaths').hide();
				$('a.lien_preambule').attr('href','fichiers/preambule.tex')
				$('a.lien_images').hide();
			} else{
				$('a.lien_images').show();
				$('#options_style_CoopMaths').show()
				$('a.lien_preambule').attr('href','fichiers/preambule_coop.tex')
			}
		});
	});

};

function creer_fichier() {
	// Gestion du style pour l'entête du fichier
		if ($('#style_classique:checked').val()){
			contenu_fichier = intro_LaTeX($("#entete_du_fichier").val()) + macro_nom_copie() + code_LaTeX + intro_correction +
			code_LaTeX_corr + '\n\n\\end{document}'
		} else
		{
			contenu_fichier = intro_LaTeX_coop() + macro_nom_copie(style='coop')
			// contenu_fichier +='\n\n\\theme{' + $('input[name=theme]:checked').val() + '}{' + $("#entete_droit_du_fichier").val() + '}'
			// contenu_fichier += '{' + $("#items").val() + '}{' + $("#domaine").val() + '}\n'
			contenu_fichier += '\\begin{document}\n\n' + code_LaTeX + intro_correction +
			code_LaTeX_corr + '\n\n\\end{document}'
		}
}



// Gestion des en-têtes

let counter = 'section';
let entete_correction = ''
if ($('#style_classique:checked').val()){
	counter = 'exo'
	entete_correction = '\\fancyhead[C]{Correction}\n'
}

function entete_eleve(prenom="",nom=""){
	return `\n\n%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n\n
\\newpage
\\NomCopie{${prenom.toUpperCase()} ${nom.toUpperCase()}}
\\bigskip
`
}


var intro_correction = '\n%%%%%%%%%%%%%%%%\n%%%CORRECTION%%%\n%%%%%%%%%%%%%%%%' +
			`\n\n\\newpage\n${entete_correction}\\setcounter{${counter}}{0}\n\n`

function macro_nom_copie(style='classique') {
	if (style=='classique') {
		return `\\newcommand\\NomCopie[1]{\\fancyhead[L]{#1}
		\\fancyhead[R]{${$("#entete_droit_du_fichier").val()}}
		\\setcounter{exo}{0}
	}\n\n`

	} else {
		return `\\newcommand\\NomCopie[1]{\\theme{${$('input[name=theme]:checked').val()}}{${$("#entete_du_fichier").val()}}{${$("#entete_droit_du_fichier").val()}}{#1}
	\\setcounter{section}{0}
	}\n\n`
	}
}





