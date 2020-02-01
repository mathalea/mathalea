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
var form_consigne = [], form_nb_questions = [], form_nb_cols = [], form_nb_cols_corr = [], form_spacing = [] , form_spacing_corr = [], form_sup = [], form_sup2 = []; // Création de tableaux qui recevront les éléments HTML de chaque formulaires

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
		// div_parametres_generaux.innerHTML += '<h3 class="ui block header">Paramètres des exercices</h3>';
	}
	for (let i = 0; i < nb_exercices; i++) {
		if(sortie_html) {
			div_parametres_generaux.innerHTML += '<h4 class="ui dividing header">Exercice n°'+ (i+1) +' : '+ exercice[i].titre +'</h4>'
			if (exercice[i].nb_questions_modifiable){
				div_parametres_generaux.innerHTML +='<div><label for="form_nb_questions'+i+'">Nombre de questions : </label> <input id="form_nb_questions'+i+'" type="number"  min="1" max="99"></div>'
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
					div_parametres_generaux.innerHTML += '<div data-tooltip="'+exercice[i].besoin_formulaire_numerique[2]+'"" data-inverted="" data-position="top left"><label for="form_sup'+i+'">'+exercice[i].besoin_formulaire_numerique[0]+' : </label><input id="form_sup'+i+'" type="number"  min="1" max="'+exercice[i].besoin_formulaire_numerique[1]+'"></div>';
				}
				else{
					div_parametres_generaux.innerHTML += '<div><label for="form_sup'+i+'">'+exercice[i].besoin_formulaire_numerique[0]+' : </label><input id="form_sup'+i+'" type="number"  min="1" max="'+exercice[i].besoin_formulaire_numerique[1]+'"></div>';
				}
			}

			if (exercice[i].besoin_formulaire_texte){ // Création d'un formulaire texte
				div_parametres_generaux.innerHTML += "<div style='display: inline'><label for='form_sup"+i+"'>"+exercice[i].besoin_formulaire_texte[0]+" : </label>\
			<div style='display: inline' data-tooltip='"+exercice[i].besoin_formulaire_texte[1]+"' data-inverted=''><input id='form_sup"+i+"' type='text' size='20' ></div></div>";
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
		}

			if (exercice[i].besoin_formulaire2_case_a_cocher){ // Création d'un formulaire texte
				div_parametres_generaux.innerHTML += "<div style='display: inline'><label for='form_sup2"+i+"'>"+exercice[i].besoin_formulaire2_case_a_cocher[0]+" : </label>\
			<input id='form_sup2"+i+"' type='checkbox'  ></div>";
		}

			if (exercice[i].besoin_formulaire2_numerique){ // Création d'un formulaire numérique
				if (exercice[i].besoin_formulaire2_numerique[2]){ // Si un tooltip est défini
					div_parametres_generaux.innerHTML += '<div data-tooltip="'+exercice[i].besoin_formulaire2_numerique[2]+'"" data-inverted="" data-position="top left"><label for="form_sup2'+i+'">'+exercice[i].besoin_formulaire2_numerique[0]+' : </label><input id="form_sup2'+i+'" type="number"  min="1" max="'+exercice[i].besoin_formulaire2_numerique[1]+'"></div>';
				}
				else{
					div_parametres_generaux.innerHTML += '<div><label for="form_sup2'+i+'">'+exercice[i].besoin_formulaire2_numerique[0]+' : </label><input id="form_sup2'+i+'" type="number"  min="1" max="'+exercice[i].besoin_formulaire2_numerique[1]+'"></div>';
				}
			}

			if (exercice[i].besoin_formulaire2_texte){ // Création d'un formulaire texte
				div_parametres_generaux.innerHTML += "<p></p><div style='display: inline'><label for='form_sup2"+i+"'>"+exercice[i].besoin_formulaire2_texte[0]+" : </label>\
			<div style='display: inline' data-tooltip='"+exercice[i].besoin_formulaire2_texte[1]+"' data-inverted=''><input id='form_sup2"+i+"' type='text' size='20' ></div></div>";
		}

	}


	for (let i = 0; i < nb_exercices; i++) {

		if(!sortie_html) { // Les paramètres à ne gérer que pour la version LaTeX
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
form_choix_des_exercices = document.getElementById('choix_des_exercices');


form_choix_des_exercices.addEventListener('change', function(e) { // Changement du texte
	if (e.target.value=='') {
		liste_des_exercices = [];
	} else {
		liste_des_exercices = [];
		liste_des_exercices = e.target.value.replace(/\s/g, "").replace(";", ",").split(",");// Récupère  la saisie de l'utilisateur
		//en supprimant les espaces et en remplaçant les points-virgules par des virgules.	
	}
	mise_a_jour_de_la_liste_d_exercice();
	//document.getElementById('liste_des_exercices').style.display='none';
});

// Si le nombre de versions changent
$("#nombre_de_versions").change(function() {
	mise_a_jour_du_code()
});



function mise_a_jour_de_la_liste_d_exercice() {
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
		if (sortie_html) {
			fin_de_l_URL+="exercice.html"	
		}
		if (exercice[0].sup2){
			fin_de_l_URL +=`?ex=${liste_des_exercices[0]},nb_questions=${exercice[0].nb_questions},sup=${exercice[0].sup},sup2=${exercice[0].sup2}`	
		} else{
			if (exercice[0].sup){
				fin_de_l_URL +=`?ex=${liste_des_exercices[0]},nb_questions=${exercice[0].nb_questions},sup=${exercice[0].sup}`	
			} else{
				fin_de_l_URL +=`?ex=${liste_des_exercices[0]},nb_questions=${exercice[0].nb_questions}`
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
		let url = window.location.href; //met l'URL dans le bouton de copie de l'URL
      	new Clipboard('.url', {text: function() {
          return url;
          }
      	});
		
	}
	
	// création des figures MG32 (géométrie dynamique)	
	
	window.MG32_tableau_de_figures = []
	if (sortie_html){ // code pour la sortie HTML
		
		let code1 ='', code2='', code_LaTeX = '';
		if (liste_des_exercices.length > 0) {
			for (let i = 0; i < liste_des_exercices.length; i++) {
				exercice[i].nouvelle_version(i);
				code1 += '<h3 class="ui dividing header">Exercice '+(i+1)+'</h3>';
				code1 +=  exercice[i].contenu;
				if (exercice[i].type_exercice=='MG32'){
					code1 += `<div id="MG32div${i}" class="MG32"></div>`;
					
				}
				code2 += '<h3 class="ui dividing header">Exercice '+(i+1)+'</h3>';
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
		renderMathInElement(document.body, {
            delimiters: [
			{left: "\\[", right: "\\]", display: true},
			{left: "$", right: "$", display: false}
			],
			"throwOnError":true,"errorColor":"#CC0000","strict":"warn","trust":false
        });
		//Ajoute figures MG32
		for (let i = 0; i < liste_des_exercices.length; i++) {
			if (exercice[i].type_exercice=='MG32'){
				MG32_ajouter_figure(i)
			}
		}
		MG32_tracer_toutes_les_figures()
		

	} else { // code pour la sortie LaTeX
		let code1 ='', code2='';
		code_LaTeX = '';
		if (liste_des_exercices.length > 0) {
			for (let i = 0; i < liste_des_exercices.length; i++) {
				exercice[i].nouvelle_version();
				if (exercice[i].titre=='Fichier statique') {
					liste_des_exercices_statiques.push(exercice[i].sup)
				}
				code1 += exercice[i].contenu;
				code1 += '\n\n'
				code2 += exercice[i].contenu_correction;
				code2 += '\n\n'
			}
			code_LaTeX =  code1 +
			'\n\n%%%%%%%%%%%%%%%%%%%%%%\n%%%   CORRECTION   %%%\n%%%%%%%%%%%%%%%%%%%%%%\n\n\\newpage\n\\begin{correction}\n\n' + 
			code2 + '\\end{correction}'; 
			$( "#message_liste_exercice_vide" ).hide();
			$('#cache').show();


			// Gestion du nombre de versions
			if ($("#nombre_de_versions").val()>1) {
				code_LaTeX = '';
				let code_exercices = '', code_correction = '';
				for (let v = 0; v <$("#nombre_de_versions").val(); v++) {
					code_exercices += '\\version{' + (v+1) + '}\n\n'
					code_correction += '\n\n\\newpage\n\\version{' + (v+1) + '}\n\\begin{correction}';
					for (let i = 0; i < liste_des_exercices.length; i++) {
						exercice[i].nouvelle_version();
						code_exercices += exercice[i].contenu;
						code_exercices += '\n\n';
						code_correction += exercice[i].contenu_correction;
						code_correction += '\n\n';
					}
					if (v < $("#nombre_de_versions").val() -1) {
						if ($('#style_classique:checked').val()){
							code_exercices += '\n\\newpage\n\\setcounter{exo}{0}\n';
						} else{
							code_exercices += '\n\\newpage\n\\setcounter{section}{0}\n';
						}
					}
					code_correction += '\n\\end{correction}'
				}
				code_LaTeX = code_exercices + code_correction;
			}
			for (let i = 0; i < liste_des_exercices_statiques.length; i++) {
				ajout_de_LaTeX_statique(liste_des_exercices_statiques[i])
			}


			
			div.innerHTML = '<pre><code class="language-latex">' + code_LaTeX + '</code></pre>';
			Prism.highlightAllUnder(div); // Met à jour la coloration syntaxique

		} else {
			code_LaTeX = ''
			$( "#message_liste_exercice_vide" ).show(); // Message au dessus de la liste des exercices
			$('#cache').hide(); // Cache au dessus du code LaTeX
			div.innerHTML = '';
		}
		
	}


	
	
	
}


if (!sortie_html){

	// Gestion du téléchargement

	$( "#btn_telechargement").click(function() {
			// Gestion du style pour l'entête du fichier

			if ($('#style_classique:checked').val()){
				if ($("#entete_du_fichier").val()=='') {
					$("#entete_du_fichier").val('Exercices')
				}
				contenu_fichier = `\\documentclass[a4paper,11pt,fleqn]{article}\n`
				contenu_fichier += `\\input{preambule}\n\\pagestyle{fancy}\n\\renewcommand{\\headrulewidth}{1pt}\n\\fancyhead[C]{${$("#entete_du_fichier").val()}}\n\\fancyhead[L]{}`
				contenu_fichier += `\\fancyhead[R]{}\n\\renewcommand{\\footrulewidth}{1pt}\n\\fancyfoot[C]{}\n\\fancyfoot[L]{}\n\\fancyfoot[R]{}\n\n`
				contenu_fichier += `\\begin{document}\n\n` + code_LaTeX + `\n\n\\end{document}`
			} else
			{
				contenu_fichier = '\\documentclass[a4paper,11pt,fleqn]{article}\n\\input{preambule_coop}\n'
				contenu_fichier +='\\theme{' + $('input[name=theme]:checked').val() + '}{' + $("#entete_du_fichier").val() + '}'
				contenu_fichier += '{' + $("#items").val() + '}{' + $("#domaine").val() + '}\n\\begin{document}\n\n' + code_LaTeX
				contenu_fichier += '\n\n\\end{document}'
			}

			if ($("#nom_du_fichier").val()) {
				download(contenu_fichier, $("#nom_du_fichier").val()+'.tex', "text/plain");	
			}else
			{
				download(contenu_fichier, 'mathalea.tex', "text/plain");
			}
			
		});



	$( "#btn_overleaf").click(function() {
			// Gestion du style pour l'entête du fichier

			if ($('#style_classique:checked').val()){
				contenu_fichier = intro_LaTeX($("#entete_du_fichier").val()) + code_LaTeX + '\n\n\\end{document}'
			} else
			{
				contenu_fichier = intro_LaTeX_coop()
				contenu_fichier +='\n\n\\theme{' + $('input[name=theme]:checked').val() + '}{' + $("#entete_du_fichier").val() + '}'
				contenu_fichier += '{' + $("#items").val() + '}{' + $("#domaine").val() + '}\n\\begin{document}\n\n' + code_LaTeX
				contenu_fichier += '\n\n\\end{document}'
			}

			// Gestion du LaTeX statique


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
	$('.ui.dropdown').dropdown(); // Pour le menu des exercices
	$('.ui.accordion').accordion('refresh');
	// Gestion du bouton de copie
	$('.ui.button.toggle').state(); // initialise le bouton
	if (sortie_html) {
		document.getElementById('btnCopieURL').addEventListener('click', function () {
			setTimeout(function () {
				$('#btnCopieURL').removeClass('active'); // "éteint" le bouton 1s après 
			}, 1000);
		});
	}
		


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
	
	  
	
	
	// Gestion de la mise à jour de l'affichage du code

	var btn_mise_a_jour_code = document.getElementById('btn_mise_a_jour_code');
	btn_mise_a_jour_code.addEventListener('click', mise_a_jour_du_code);

	// Gestion des effets visuels
	// $('.ui.accordion').accordion(); // active les acordéons (paramètres du fichier .tex)
	$('.ui.radio.checkbox').checkbox(); // active les boutons radio (pour le style)

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
    		}
    		if (tableau_objets_exercices[i]["sup2"]){
    			exercice[i].sup2 = tableau_objets_exercices[i]["sup2"]
    		}
    	}
    	mise_a_jour_du_code();
    } else {
    	mise_a_jour_du_code();
    }


    if (sortie_html) {
	// Gestion du bouton de zoom
		let zoom = 1;
		$( "#btn_zoom_plus").click(function() {
			zoom+=.5;
			$("#affichage_exercices").css("transform", `scale(${zoom})`);
			$("#affichage_exercices").css("transform-origin", "0 0px");
	      	//window.location.hash = 'section';
	      });
		$( "#btn_zoom_moins").click(function() {
			if (zoom>1) {
				zoom-=.5;
			}
			$("#affichage_exercices").css("transform", `scale(${zoom})`);
			$("#affichage_exercices").css("transform-origin", "0 0px");
		});
	}


};




// Gestion des styles LaTeX

function intro_LaTeX(entete="Exercices") {
	if (entete=='') {entete='Exercices'}
		return `\\documentclass[12pt]{article}
	\\usepackage[left=1.5cm,right=1.5cm,top=2cm,bottom=2cm]{geometry}
	\\usepackage[utf8]{inputenc}		        
	\\usepackage[T1]{fontenc}		
	\\usepackage[french]{babel}
	\\usepackage{multicol} 					
	\\usepackage{calc} 						
	\\usepackage{enumerate}
	\\usepackage{enumitem}
	\\usepackage{graphicx}				
	\\usepackage{tabularx}
	\\usepackage[autolanguage]{numprint}
	\\usepackage{pgf,tikz}
	\\usepackage{pgf,tikz}
	\\usetikzlibrary{arrows,calc,fit,patterns,plotmarks,shapes.geometric,shapes.misc,shapes.symbols,shapes.arrows,
		shapes.callouts, shapes.multipart, shapes.gates.logic.US,shapes.gates.logic.IEC, er, automata,backgrounds,chains,topaths,trees,petri,mindmap,matrix, calendar, folding,fadings,through,positioning,scopes,decorations.fractals,decorations.shapes,decorations.text,decorations.pathmorphing,decorations.pathreplacing,decorations.footprints,decorations.markings,shadows,babel} % Charge toutes les librairies de Tikz
		\\usepackage{tkz-tab,tkz-euclide,tkz-fct}	% Géométrie euclidienne avec TikZ
		\\usetkzobj{all}	
		\\usepackage{amsmath,amsfonts,amssymb,mathrsfs} 
		\\usepackage{cancel}
		\\usepackage{eurosym}
		\\DeclareUnicodeCharacter{20AC}{\\euro{}}
		\\usepackage{fancyhdr,lastpage}          	
		\\pagestyle{fancy}                      	
		\\usepackage{fancybox}					
		\\usepackage{xlop}						
		\\usepackage{setspace}	

		\\setlength{\\parindent}{0mm}		
		\\renewcommand{\\arraystretch}{1.5}	
		\\newcounter{exo}          				
		\\setcounter{exo}{0}   				
		\\newcommand{\\exo}[1]{				
			\\stepcounter{exo}        		
			\\subsection*{Exercice \\no{\\theexo} \\textmd{\\normalsize #1}}
		}
		\\renewcommand{\\labelenumi}{\\textbf{\\theenumi{}.}}	
		\\renewcommand{\\labelenumii}{\\textbf{\\theenumii{}.}}	
		\\newcommand{\\version}[1]{\\fancyhead[R]{Version #1}}
		\\setlength{\\fboxsep}{3mm}
		\\newenvironment{correction}{\\newpage\\fancyhead[C]{\\textbf{Correction}}\\setcounter{exo}{0}}{}
		\\fancyhead[C]{\\textbf{${entete}}}
		\\fancyfoot{}
		\\fancyfoot[R]{\\scriptsize Coopmaths.fr -- CC-BY-SA}
		\\setlength{\\headheight}{14.5pt}


		\\begin{document}`
	}

	function intro_LaTeX_coop(){

		let intro_LaTeX_coop = `
		\\documentclass[12pt]{article}
		\\usepackage[left=1.5cm,right=1.5cm,top=3.5cm,bottom=2cm]{geometry}
		\\usepackage[utf8]{inputenc}		        
		\\usepackage[T1]{fontenc}		
		\\usepackage[french]{babel}
		\\usepackage{multicol} 					
		\\usepackage{calc} 						
		\\usepackage{enumerate}
		\\usepackage{enumitem}
		\\usepackage{graphicx}				
		\\usepackage{tabularx}
		\\usepackage[autolanguage]{numprint}
		\\usepackage{pgf,tikz}
		\\usetikzlibrary{arrows,calc,fit,patterns,plotmarks,shapes.geometric,shapes.misc,shapes.symbols,shapes.arrows,
			shapes.callouts, shapes.multipart, shapes.gates.logic.US,shapes.gates.logic.IEC, er, automata,backgrounds,chains,topaths,trees,petri,mindmap,matrix, calendar, folding,fadings,through,positioning,scopes,decorations.fractals,decorations.shapes,decorations.text,decorations.pathmorphing,decorations.pathreplacing,decorations.footprints,decorations.markings,shadows,babel} % Charge toutes les librairies de Tikz
			\\usepackage{tkz-tab,tkz-euclide,tkz-fct}	% Géométrie euclidienne avec TikZ
			\\usetkzobj{all}				
			\\usepackage{amsmath,amsfonts,amssymb,mathrsfs} 
			\\usepackage{cancel}
			\\usepackage{eurosym}
			\\DeclareUnicodeCharacter{20AC}{\\euro{}}
			\\usepackage{fancyhdr,lastpage}          	
			\\pagestyle{fancy}                      	
			\\usepackage{fancybox}					
			\\usepackage{xlop}						
			\\usepackage{setspace}

			%%% COULEURS %%%

			\\definecolor{nombres}{cmyk}{0,.8,.95,0}
			\\definecolor{gestion}{cmyk}{.75,1,.11,.12}
			\\definecolor{gestionbis}{cmyk}{.75,1,.11,.12}
			\\definecolor{grandeurs}{cmyk}{.02,.44,1,0}
			\\definecolor{geo}{cmyk}{.62,.1,0,0}
			\\definecolor{algo}{cmyk}{.69,.02,.36,0}
			\\definecolor{correction}{cmyk}{.63,.23,.93,.06}
			\\usepackage{colortbl}
			\\arrayrulecolor{couleur_theme}		% Couleur des filets des tableaux

			%%% MISE EN PAGE %%%

			\\setlength{\\parindent}{0mm}		
			\\renewcommand{\\arraystretch}{1.5}	
			\\renewcommand{\\labelenumi}{\\textbf{\\theenumi{}.}}	
			\\renewcommand{\\labelenumii}{\\textbf{\\theenumii{}.}}	
			\\setlength{\\fboxsep}{3mm}

			\\setlength{\\headheight}{14.5pt}

			\\spaceskip=2\\fontdimen2\\font plus 3\\fontdimen3\\font minus3\\fontdimen4\\font\\relax %Pour doubler l'espace entre les mots
			\\newcommand{\\numb}[1]{ % Dessin autour du numéro d'exercice
			\\begin{tikzpicture}[overlay,yshift=-.3cm,scale=.8]
			\\draw[fill=couleur_numerotation,couleur_numerotation](-.3,0)rectangle(.5,.8);
			\\draw[line width=.05cm,couleur_numerotation,fill=white] (0,0)--(.5,.5)--(1,0)--(.5,-.5)--cycle;
			\\node[couleur_numerotation]  at (.5,0) { \\large \\bfseries #1};
			\\draw (-.4,.8) node[white,anchor=north west]{\\bfseries EX}; 
			\\end{tikzpicture}
		}

		%%% NUMEROS DES EXERCICES %%%

		\\usepackage{titlesec} % Le titre de section est un numéro d'exercice avec sa consigne alignée à gauche.
		\\titleformat{\\section}{}{\\numb{\\arabic{section}}}{1cm}{\\hspace{0em}}{}
		\\newcommand{\\exo}[1]{ % Un exercice est une nouvelle section avec la consigne écrite en caractêres normaux
			\\section{\\textmd{#1}}
			\\medskip
		}


		%%% ENVIRONNEMENTS - CADRES %%%
		\\usepackage[framemethod=tikz]{mdframed}

		\\newmdenv[linecolor=couleur_theme, linewidth=3pt,topline=true,rightline=false,bottomline=false,frametitlerule=false,frametitlefont={\\color{couleur_theme}\\bfseries},frametitlerulewidth=1pt]{methode}


		\\newmdenv[startcode={\\setlength{\\multicolsep}{0cm}\\setlength{\\columnsep}{.2cm}\\setlength{\\columnseprule}{0pt}\\vspace{0cm}},linecolor=white, linewidth=3pt,innerbottommargin=10pt,innertopmargin=5pt,innerrightmargin=20pt,splittopskip=20pt,splitbottomskip=10pt,everyline=true,tikzsetting={draw=couleur_theme,line width=4pt,dashed,dash pattern= on 10pt off 10pt},frametitleaboveskip=-.6cm,frametitle={\\tikz\\node[anchor= east,rectangle,fill=white]{\\textcolor{couleur_theme}{\\raisebox{-.3\\height}{\\includegraphics[width=.8cm]{\\iconeobjectif}}\\; \\bfseries \\Large Objectifs}};}]{objectif}

		\\newmdenv[startcode={\\colorlet{couleur_numerotation}{correction}\\renewcommand{\\columnseprulecolor}{\\color{correction}}
		\\setcounter{section}{0}\\arrayrulecolor{correction}},linecolor=white, linewidth=4pt,innerbottommargin=10pt,innertopmargin=5pt,splittopskip=20pt,splitbottomskip=10pt,everyline=true,frametitle=correction,tikzsetting={draw=correction,line width=3pt,dashed,dash pattern= on 15pt off 10pt},frametitleaboveskip=-.4cm,frametitle={\\tikz\\node[anchor= east,rectangle,fill=white]{\\; \\textcolor{correction}{\\raisebox{-.3\\height}{\\includegraphics[width=.6cm]{icone-correction}}\\; \\bfseries \\Large Corrections}};}]{correction}

		\\newmdenv[roundcorner=0,linewidth=0pt,frametitlerule=false, backgroundcolor=gray!40,leftmargin=8cm]{remarque}



		\\newcommand{\\theme}[4]
		{
			\\fancyhead[L]{}
			\\fancyhead[R]{}
			\\fancyhead[C]{
				\\begin{tikzpicture}[remember picture,overlay]
				\\node[anchor=north east,inner sep=0pt] at ($(current page.north east)+(0,-.8cm)$) {\\includegraphics{header-#1}};
				\\node[anchor=east, fill=white] at ($(current page.north east)+(-2,-1.4cm)$) {\\Huge \\textcolor{couleur_theme}{\\bfseries \\#} \\bfseries #2 \\textcolor{couleur_theme}{\\bfseries \\MakeUppercase{#3}}};
				\\node[anchor=center, color=white] at ($(current page.north)+(0,-2.65cm)$) {\\Large \\bfseries \\MakeUppercase{#4}};
				\\end{tikzpicture}
			}
			\\fancyfoot[C]{
				\\begin{tikzpicture}[remember picture,overlay]
				\\node[anchor=south west,inner sep=0pt] at ($(current page.south west)+(0,0)$) {\\includegraphics{footer-#1}};
				\\end{tikzpicture} 
			}
			\\colorlet{couleur_theme}{#1}
			\\colorlet{couleur_numerotation}{couleur_theme}
			\\def\\iconeobjectif{icone-objectif-#1}
			\\def\\urliconeomethode{icone-methode-#1}
			\\renewcommand{\\headrulewidth}{0pt} % Pour enlever les traits en en-tête et en pied de page
			\\renewcommand{\\footrulewidth}{0pt}
		}

		\\newcommand{\\version}[1]{
			\\fancyhead[R]{
				\\begin{tikzpicture}[remember picture,overlay]
				\\node[anchor=north east,inner sep=0pt] at ($(current page.north east)+(-.5,-.5cm)$) {\\large \\textcolor{couleur_theme}{\\bfseries V#1}};
				\\end{tikzpicture}
			}
		}


		%%%%%%%%%%%%%%%%%%%%%%%%
		%%% Fin du préambule %%%
		%%%%%%%%%%%%%%%%%%%%%%%%
		`
		return intro_LaTeX_coop

	}




