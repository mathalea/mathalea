/*
MathALEA
Rémi Angot --- CC-By-SA
coopmaths.fr

Modules nécessaires : 
	mathsalea_exercices.js pour la définition des exercices
	mathsalea_outils.js pour les différentes fonctions de construction des exercices ou de formatage
*/



// Gestion des paramètres
var div = document.getElementById('div_code_LaTeX'); // Récupère le div dans lequel le code va être affiché
var div_overleaf = document.getElementById('overleaf'); // Récupère le div dans lequel le code va être affiché
var div_parametres_generaux = document.getElementById('parametres_generaux'); // Récupère le div dans lequel seront inscrit les paramètres
var form_consigne = [], form_nb_questions = [], form_nb_cols = [], form_nb_cols_corr = [], form_spacing = [] , form_spacing_corr = [], form_sup = [], form_sup2 = [], form_duree = []; // Création de tableaux qui recevront les éléments HTML de chaque formulaires
var duree
var sortie="html"

var URL_de_depart_complexe = false; // Si l'utilisateur a entré une URL avec des paramètres, on ne la modifie pas

var liste_des_exercices_statiques = []

function parametres_exercice(nb_exercices){
/* Pour l'exercice i, on rajoute un formulaire avec 5 inputs : 
nombre de questions, nombre de colonnes,nombre de colonnes dans le corrigé,
espacement et espacement dans le corrigé.
Les réponses modifient les caractéristiques de l'exercice puis le code LaTeX est mis à jour
*/

	div_parametres_generaux.innerHTML = ''; // Vide le div parametres_generaux
	if (nb_exercices > 0){
		div_parametres_generaux.innerHTML += '<div class="ui hidden divider"></div>'
		div_parametres_generaux.innerHTML += '<h3 class="ui block header">Réglages</h3>';
	}
	for (let i = 0; i < nb_exercices; i++) {
		if(sortie=="html") {
			// div_parametres_generaux.innerHTML += '<h4 class="ui dividing header">Exercice n°'+ (i+1) +' : '+ exercice[i].titre +'</h4>'
			
			if (exercice[i].nb_questions_modifiable){
			 	div_parametres_generaux.innerHTML +='<div class="ui labeled input"><div class = "ui label">Nombre de questions : </div> <input id="form_nb_questions'+i+'" type="number"  min="1" max="99"></div>'
			}
		} else {
			div_parametres_generaux.innerHTML += '<h4 class="ui dividing header">Exercice n°'+ (i+1) +' : '+ exercice[i].titre +'</h4>'

			if (exercice[i].consigne_modifiable){
				div_parametres_generaux.innerHTML +='<div><label for="form_consigne'+i+'">Consigne : </label> <input id="form_consigne'+i+'" type="texte" size="20"></div>'

			}
			if (exercice[i].nb_questions_modifiable){
				div_parametres_generaux.innerHTML += '<div><label for="form_nb_questions'+i+'">Nombre de questions : </label> <input id="form_nb_questions'+i+'" type="number"  min="1" max="99"></div>'
			}
			if (exercice[i].nb_cols_modifiable){
				div_parametres_generaux.innerHTML += '<div><label for="form_nb_cols'+i+'">Nombre de colonnes : </label><input id="form_nb_cols'+i+'" type="number" min="1" max="99"></div>'
			}
			if (exercice[i].nb_cols_corr_modifiable){
				div_parametres_generaux.innerHTML += '<div><label for="form_nb_cols_corr'+i+'">Nombre de colonnes dans la correction : </label><input id="form_nb_cols_corr'+i+'" type="number" min="1" max="99"></div>'
			}
			if (exercice[i].spacing_modifiable){
				div_parametres_generaux.innerHTML +='<div><label for="form_nb_cols_corr'+i+'">Espacement : </label><input id="form_spacing'+i+'" type="number" min="1" max="99"></div>'
			}
			if (exercice[i].spacing_corr_modifiable){
				div_parametres_generaux.innerHTML += '<div><label for="form_nb_cols_corr'+i+'">Espacement dans la correction : </label><input id="form_spacing_corr'+i+'" type="number" min="1" max="99"></div>'
			}
			
		}
		
			// Si un formulaire supplémentaire est défini dans l'exercice alors on l'ajoute
			if (exercice[i].besoin_formulaire_numerique||exercice[i].besoin_formulaire_texte){ // Ajout du titre pour les réglages supplémentaires
				div_parametres_generaux.innerHTML += "<h4 class='ui dividing header'></h4>";
			}

			if (exercice[i].besoin_formulaire_numerique){ // Création d'un formulaire numérique
				if (exercice[i].besoin_formulaire_numerique[2]){ // Si un tooltip est défini
					div_parametres_generaux.innerHTML += `<div data-inverted="" data-position="left" class="ui labeled input"><div class="ui label" data-tooltip="${exercice[i].besoin_formulaire_numerique[2]}">${exercice[i].besoin_formulaire_numerique[0]} : </div><input id="form_sup${i}" type="number"  min="1" max="${exercice[i].besoin_formulaire_numerique[1]}"></div>`;
					div_parametres_generaux.innerHTML += '<div class="ui hidden divider"></div>'
				}
				else{
					div_parametres_generaux.innerHTML += '<div class="ui labeled input"><div class="ui label">'+exercice[i].besoin_formulaire_numerique[0]+' : </div><input id="form_sup'+i+'" type="number"  min="1" max="'+exercice[i].besoin_formulaire_numerique[1]+'"></div>';
					div_parametres_generaux.innerHTML += '<div class="ui hidden divider"></div>'
				}
			}

			if (exercice[i].besoin_formulaire_texte){ // Création d'un formulaire texte
				div_parametres_generaux.innerHTML += "<div style='display: inline' ><label for='form_sup"+i+"'>"+exercice[i].besoin_formulaire_texte[0]+" : </label>\
			<div style='display: inline' data-tooltip='"+exercice[i].besoin_formulaire_texte[1]+"' data-inverted='' class='ui input'><input id='form_sup"+i+"' type='text' size='20' ></div></div>";
				div_parametres_generaux.innerHTML += '<div class="ui hidden divider"></div>'
			}

			if (exercice[i].besoin_formulaire_long_texte){ // Création d'un long formulaire de texte
				div_parametres_generaux.innerHTML += "<label for='form_sup"+i+"'>"+exercice[i].besoin_formulaire_long_texte[0]+" : </label>\
			<div style='display: inline' data-tooltip='"+exercice[i].besoin_formulaire_long_texte[1]+"' data-inverted=''><textarea id='form_sup"+i+"'></textarea></div>";
				div_parametres_generaux.innerHTML +=`<div class="ui form">
			  <div class="field">
			    <label>Text</label>
			    <textarea></textarea>
			  </div>
			</div>`
			}

			if (exercice[i].besoin_formulaire_case_a_cocher){ // Création d'un formulaire texte
				div_parametres_generaux.innerHTML += "<div style='display: inline'><label for='form_sup"+i+"'>"+exercice[i].besoin_formulaire_case_a_cocher[0]+" : </label>\
			<input id='form_sup"+i+"' type='checkbox'  ></div>";
				div_parametres_generaux.innerHTML += '<div class="ui hidden divider"></div>'
			}

			if (exercice[i].besoin_formulaire2_case_a_cocher){ // Création d'un formulaire texte
				div_parametres_generaux.innerHTML += "<div style='display: inline'><label for='form_sup2"+i+"'>"+exercice[i].besoin_formulaire2_case_a_cocher[0]+" : </label>\
			<input id='form_sup2"+i+"' type='checkbox'  ></div>";
				div_parametres_generaux.innerHTML += '<div class="ui hidden divider"></div>'
			}

			if (exercice[i].besoin_formulaire2_numerique){ // Création d'un formulaire numérique
				if (exercice[i].besoin_formulaire2_numerique[2]){ // Si un tooltip est défini
					div_parametres_generaux.innerHTML += `<div data-inverted="" data-position="left" class="ui labeled input"><div class="ui label" data-tooltip="${exercice[i].besoin_formulaire2_numerique[2]}">${exercice[i].besoin_formulaire2_numerique[0]} : </div><input id="form_sup2${i}" type="number"  min="1" max="${exercice[i].besoin_formulaire2_numerique[1]}"></div>`;
					div_parametres_generaux.innerHTML += '<div class="ui hidden divider"></div>'
				}
				else{
					div_parametres_generaux.innerHTML += '<div class="ui input"><label for="form_sup2'+i+'">'+exercice[i].besoin_formulaire2_numerique[0]+' : </label><input id="form_sup2'+i+'" type="number"  min="1" max="'+exercice[i].besoin_formulaire2_numerique[1]+'"></div>';
					div_parametres_generaux.innerHTML += '<div class="ui hidden divider"></div>'
				}
			}

			if (exercice[i].besoin_formulaire2_texte){ // Création d'un formulaire texte
				div_parametres_generaux.innerHTML += "<p></p><div style='display: inline'><label for='form_sup2"+i+"'>"+exercice[i].besoin_formulaire2_texte[0]+" : </label>\
			<div style='display: inline' data-tooltip='"+exercice[i].besoin_formulaire2_texte[1]+"' data-inverted='' class='ui input'><input id='form_sup2"+i+"' type='text' size='20' ></div></div>";
				div_parametres_generaux.innerHTML += '<div class="ui hidden divider"></div>'
			}

	}


	for (let i = 0; i < nb_exercices; i++) {

		if(sortie=="latex") { // Les paramètres à ne gérer que pour la version LaTeX
			// Gestion de la consigne
			if (exercice[i].consigne_modifiable){
				form_consigne[i] = document.getElementById('form_consigne'+i);
				form_consigne[i].value = exercice[i].consigne; // Rempli le formulaire avec la consigne
				form_consigne[i].addEventListener('change', function(e) { // Dès que le texte change, on met à jour
					exercice[i].consigne = e.target.value;
					mise_a_jour_du_code();
				});
			}
				
			// Gestion du nombre de colones
			if (exercice[i].nb_cols_modifiable){
				form_nb_cols[i] = document.getElementById('form_nb_cols'+i);
				form_nb_cols[i].value = exercice[i].nb_cols; // Rempli le formulaire avec le nombre de colonnes
				form_nb_cols[i].addEventListener('change', function(e) { // Dès que le nombre change, on met à jour
					exercice[i].nb_cols = e.target.value;
					mise_a_jour_du_code();
				});
			}
				
			// Gestion du nombre de colones dans la correction
			if (exercice[i].nb_cols_corr_modifiable){
				form_nb_cols_corr[i] = document.getElementById('form_nb_cols_corr'+i);
				form_nb_cols_corr[i].value = exercice[i].nb_cols_corr; // Rempli le formulaire avec le nombre de colonnes de la correction
				form_nb_cols_corr[i].addEventListener('change', function(e) { // Dès que le nombre change, on met à jour
					exercice[i].nb_cols_corr = e.target.value;
					mise_a_jour_du_code();
				});
			}
				
			// Gestion de l'espacement
			if (exercice[i].spacing_modifiable){
				form_spacing[i] = document.getElementById('form_spacing'+i);
				form_spacing[i].value = exercice[i].spacing; // Rempli le formulaire avec le nombre de colonnes de la correction
				form_spacing[i].addEventListener('change', function(e) { // Dès que le nombre change, on met à jour
					exercice[i].spacing = e.target.value;
					mise_a_jour_du_code();
				});
			}
				
			// Gestion de l'espacement dans la correction
			if (exercice[i].spacing_corr_modifiable){
				form_spacing_corr[i] = document.getElementById('form_spacing_corr'+i);
				form_spacing_corr[i].value = exercice[i].spacing_corr; // Rempli le formulaire avec le nombre de colonnes de la correction
				form_spacing_corr[i].addEventListener('change', function(e) { // Dès que le nombre change, on met à jour
					exercice[i].spacing_corr = e.target.value;
					mise_a_jour_du_code();
				});
			}
		}
		

		// Gestion du nombre de questions
		if (exercice[i].nb_questions_modifiable){
			form_nb_questions[i] = document.getElementById('form_nb_questions'+i);
			form_nb_questions[i].value = exercice[i].nb_questions; // Rempli le formulaire avec le nombre de questions
			form_nb_questions[i].addEventListener('change', function(e) { // Dès que le nombre change, on met à jour
				exercice[i].nb_questions = e.target.value;
				mise_a_jour_du_code();
			});
		}
		
		// Gestion des paramètres supplémentaires s'ils existent

		if (exercice[i].besoin_formulaire_texte){
			form_sup[i] = document.getElementById('form_sup'+i);
			form_sup[i].addEventListener('keydown', function(e) { // Appui sur la touche entrée
				if (e.keyCode == 13){
        		exercice[i].sup = e.target.value;// Récupère  la saisie de l'utilisateur
        		mise_a_jour_du_code();
        	};
        });

			form_sup[i].addEventListener('blur', function(e) { // Perte du focus
				exercice[i].sup = e.target.value;
				mise_a_jour_du_code();
			});
		}

		if (exercice[i].besoin_formulaire_long_texte){
			form_sup[i] = document.getElementById('form_sup'+i);
			form_sup[i].addEventListener('keydown', function(e) { // Appui sur la touche entrée
				if (e.keyCode == 13){
        		exercice[i].sup = e.target.value;// Récupère  la saisie de l'utilisateur
        		mise_a_jour_du_code();
        	};
        });

			form_sup[i].addEventListener('blur', function(e) { // Perte du focus
				exercice[i].sup = e.target.value;
				mise_a_jour_du_code();
			});
		}

		if (exercice[i].besoin_formulaire_numerique){
			form_sup[i] = document.getElementById('form_sup'+i);
			form_sup[i].value = exercice[i].sup; // Rempli le formulaire avec le paramètre supplémentaire
			form_sup[i].addEventListener('change', function(e) { // Dès que le nombre change, on met à jour
				exercice[i].sup = e.target.value;
				mise_a_jour_du_code();
			});
		}

		if (exercice[i].besoin_formulaire_case_a_cocher){
			form_sup[i] = document.getElementById('form_sup'+i);
			form_sup[i].checked = exercice[i].sup; // Rempli le formulaire avec le paramètre supplémentaire
			form_sup[i].addEventListener('change', function(e) { // 
				exercice[i].sup = e.target.checked;
				mise_a_jour_du_code();
			});

		}

		if (exercice[i].besoin_formulaire2_case_a_cocher){
			form_sup2[i] = document.getElementById('form_sup2'+i);
			form_sup2[i].checked = exercice[i].sup2; // Rempli le formulaire avec le paramètre supplémentaire
			form_sup2[i].addEventListener('change', function(e) { // 
				exercice[i].sup2 = e.target.checked;
				mise_a_jour_du_code();
			});

		}

		if (exercice[i].besoin_formulaire2_numerique){
			form_sup2[i] = document.getElementById('form_sup2'+i);
			form_sup2[i].value = exercice[i].sup2; // Rempli le formulaire avec le paramètre supplémentaire
			form_sup2[i].addEventListener('change', function(e) { // Dès que le nombre change, on met à jour
				exercice[i].sup2 = e.target.value;
				mise_a_jour_du_code();
			});
		}

		if (exercice[i].besoin_formulaire2_texte){
			form_sup2[i] = document.getElementById('form_sup2'+i);
			form_sup2[i].addEventListener('keydown', function(e) { // Appui sur la touche entrée
				if (e.keyCode == 13){
        		exercice[i].sup2 = e.target.value;// Récupère  la saisie de l'utilisateur
        		mise_a_jour_du_code();
        	};
        });

			form_sup2[i].addEventListener('blur', function(e) { // Perte du focus
				exercice[i].sup2 = e.target.value;
				mise_a_jour_du_code();
			});
		}

		
	}
}


// Choix des exercices


var exercice = []; // Liste des "objets" exercices
var liste_des_exercices = [];
mise_a_jour_de_la_liste_d_exercice();


// Mise à jour du formulaire de la liste des exercices
form_choix_de_la_duree = document.getElementById('choix_de_la_duree');
// form_choix_de_la_duree.value = 10;
// duree = 10*1000;


form_choix_de_la_duree.addEventListener('change', function(e) { // Changement du texte
	if (e.target.value=='') {
		duree = 10;
	} else {
		duree = e.target.value*1000
		chrono = duree
	}
});

// Si le nombre de versions changent
$("#nombre_de_versions").change(function() {
	mise_a_jour_du_code()
});



function mise_a_jour_de_la_liste_d_exercice() {
	if (liste_des_exercices.length>0) { // Pour les diaporamas tout cacher quand un exercice est choisi
		$("#liste_des_exercices").hide();
		$("#parametres_generaux").show();
	} else {
		$("#liste_des_exercices").show();
		$("h3").show();
		$("#formulaire_choix_de_la_duree").show();

	}
	for (let i=0; i<liste_des_exercices.length; i++){
		if (!exercice[i]){
			try {
				exercice[i] = new liste_des_exercices_disponibles[liste_des_exercices[i]];					
			} catch(e) {
				exercice[i] = new Exercice
				console.log("Un exercice demandé n'existe pas.") //+e)
			}

		}
	}
	parametres_exercice(liste_des_exercices.length);
	mise_a_jour_du_code();  
}


// Gestion du LaTeX statique par remplacement du texte

function ajout_de_LaTeX_statique (url_sans_extension){
	$.get(url_sans_extension+'.tex', function(txt) {
			//url_sans_extension = url_sans_extension.replace(/\//g,'\/') // echapper tous les slashs
			//let expression = `%£[${url_sans_extension}]`.replace(/\//g,'\\\/')
			let expression_reguliere = new RegExp ('%£'+url_sans_extension.replace(/\//g,'\\\/')+'£',"g")
		 	div.innerHTML = div.innerHTML.replace(expression_reguliere,txt)
		 	code_LaTeX = code_LaTeX.replace(expression_reguliere,txt)
		 });

	$.get(url_sans_extension+'_corr.tex', function(txt) {
			let expression_reguliere = new RegExp ('%£'+url_sans_extension.replace(/\//g,'\\\/')+'_corr£',"g")			
		 	div.innerHTML = div.innerHTML.replace(expression_reguliere,txt)
		 	code_LaTeX = code_LaTeX.replace(expression_reguliere,txt)
		 });	
}


// Gestion de l'affichage

var code_LaTeX = '', contenu_fichier = '';


function mise_a_jour_du_code(){
	// ajout du numéro de l'exercice dans l'URL
	if (liste_des_exercices.length>0) {
		let fin_de_l_URL = ""
		$('#icones').show();
		$('#corrections_et_parametres').show()
		// !!! URL
		if (sortie=="html") {
			fin_de_l_URL+="cm.html"	
		}
	if (exercice[0].sup2){
			fin_de_l_URL +=`?ex=${liste_des_exercices[0]},nb_questions=${exercice[0].nb_questions},sup=${exercice[0].sup},sup2=${exercice[0].sup2},duree=${duree/1000}`	
		} else{
		if (exercice[0].sup){
				fin_de_l_URL +=`?ex=${liste_des_exercices[0]},nb_questions=${exercice[0].nb_questions},sup=${exercice[0].sup},duree=${duree/1000}`	
			} else{
				fin_de_l_URL +=`?ex=${liste_des_exercices[0]},nb_questions=${exercice[0].nb_questions},duree=${duree/1000}`
			}
		}
	for (var i = 1; i < liste_des_exercices.length; i++) {
		if (exercice[i].sup2){
			fin_de_l_URL +=`&ex=${liste_des_exercices[i]},nb_questions=${exercice[i].nb_questions},sup=${exercice[i].sup},sup2=${exercice[i].sup2}`	
		} else{
		if (exercice[i].sup){
				fin_de_l_URL +=`&ex=${liste_des_exercices[i]},nb_questions=${exercice[i].nb_questions},sup=${exercice[i].sup}`	
			} else{
				fin_de_l_URL +=`&ex=${liste_des_exercices[i]},nb_questions=${exercice[i].nb_questions}`
			}
		}
	}
	window.history.pushState("","",fin_de_l_URL);
		
	}
	
	// création des figures MG32 (géométrie dynamique)	

	window.MG32_tableau_de_figures = []
	 // code pour la sortie HTML
	let code1 ='', code2='', code_LaTeX = '';
	if (liste_des_exercices.length > 0) {
		for (let i = 0; i < liste_des_exercices.length; i++) {
			exercice[i].nouvelle_version(i);
			//code1 += '<h3 class="ui dividing header">Exercice '+(i+1)+'</h3>';
			code1 +=  exercice[i].contenu;
			if (exercice[i].type_exercice=='MG32'){
				code1 += `<div id="MG32div${i}"></div>`;	
			}
			// code2 += '<h3 class="ui dividing header">Exercice '+(i+1)+'</h3>';
			code2 +=  exercice[i].contenu_correction;
		}
		code1 = '<ol>' + code1 + '</ol>';
		code2 = '<ol>' + code2 + '</ol>'; 
		$( "#message_liste_exercice_vide" ).hide();
		$('#cache').dimmer('hide');
	} else {
		$( "#message_liste_exercice_vide" ).show(); // Message au dessus de la liste des exercices
		$('#cache').dimmer('show'); // Cache au dessus du code LaTeX
	}
	

	$('#exercices').html(code1);
	$('#corrections').html(code2);
	renderMathInElement(document.body,{delimiters: [
		{left: "$", right: "$", display: false},
		{left: "$$", right: "$$", display: true}
		]})
	//Ajoute figures MG32
		for (let i = 0; i < liste_des_exercices.length; i++) {
			if (exercice[i].type_exercice=='MG32'){
				MG32_ajouter_figure(i)
			}
		}
		MG32_tracer_toutes_les_figures()


	


	
	
	
}






function getUrlVars() { // Récupère les variables de l'URL
    let url = new URL(window.location.href);
    let tableau_des_strings_exercices_et_parametres = url.searchParams.getAll("ex"); // récupère un string pour chaque paramètre ex de l'URL
    let tableau_objets_exercices = new Array
    for (var ex_i = 0; ex_i < tableau_des_strings_exercices_et_parametres.length; ex_i++) {
    	let CleValeur = tableau_des_strings_exercices_et_parametres[ex_i].split(",");
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
		tableau_objets_exercices.push(ObjetParametres)
    }
	return tableau_objets_exercices;

}


window.onload = function()  {
//$( document ).ready(function() {	

	// Gestion du menu déroulant

	$('.ui.dropdown') .dropdown();  
	
	
	// Gestion de la mise à jour de l'affichage du code

	var btn_mise_a_jour_code = document.getElementById('btn_mise_a_jour_code');
	// btn_mise_a_jour_code.addEventListener('click', mise_a_jour_du_code);


	// Gestion des effets visuels
	$('.ui.accordion').accordion(); // active les acordéons (paramètres du fichier .tex)
	$('.ui.radio.checkbox').checkbox(); // active les boutons radio (pour le style)

	// Gestion du menu déroulant par une fonction auto-exécutante
	(function menu_deroulant () {
		const el = document.getElementsByClassName('id_exercice');
		const el_accordion = document.getElementsByClassName('accordion');
		// Sélectionne les exercices de la liste des exercices disponibles
		if (el.length>50) {
			// S'il y a plus de 50 exercices, l'accordéon est initialisé
	    	
	    	$('.ui.accordion').accordion('refresh');
		} else {
    		setTimeout(menu_deroulant, 300); // retente dans 300 milliseconds
		}
	})();

	// Récupère les paramètres passés dans l'URL
	//var interrogation_dans_URL = location.href.indexOf("?");
	let tableau_objets_exercices = getUrlVars();
    if (tableau_objets_exercices.length > 0) {
    	URL_de_depart_complexe = true;
    	for (var i = 0; i < tableau_objets_exercices.length; i++) {
    		liste_des_exercices.push(tableau_objets_exercices[i]["id"])
    	}
    	mise_a_jour_de_la_liste_d_exercice();

    	for (var i = 0; i < tableau_objets_exercices.length; i++) { // récupère les éventuels paramètres dans l'URL
    		if (tableau_objets_exercices[i]["nb_questions"] && exercice[i].nb_questions_modifiable){
    			exercice[i].nb_questions = tableau_objets_exercices[i]["nb_questions"]
    			form_nb_questions[i].value = exercice[i].nb_questions;
    		}
    		if (tableau_objets_exercices[i]["sup"]){
    			exercice[i].sup = tableau_objets_exercices[i]["sup"]
    			form_sup[i].value = tableau_objets_exercices[i]["sup"]
    		}
    		if (tableau_objets_exercices[i]["sup2"]){
    			exercice[i].sup2 = tableau_objets_exercices[i]["sup2"]
    			form_sup2[i].value = tableau_objets_exercices[i]["sup2"]
    		}
    		if (tableau_objets_exercices[i]["duree"]){
    			duree = tableau_objets_exercices[i]["duree"]*1000
    			form_choix_de_la_duree.value = tableau_objets_exercices[i]["duree"]
    		}
    	}
    	mise_a_jour_du_code();
    } else {
    	duree = 10*1000
    	form_choix_de_la_duree.value = 10
    	mise_a_jour_du_code();
    }


    
// Gestion du bouton de zoom
		$( "#btn_zoom_plus").click(function() {
			$('#corrections').css("font-size", parseFloat($('#corrections').css("font-size"))*1.2 );
		});
		$( "#btn_zoom_moins").click(function() {
			$('#corrections').css("font-size", parseFloat($('#corrections').css("font-size"))*0.8 );
		});



};