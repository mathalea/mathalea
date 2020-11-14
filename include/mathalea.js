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
var form_consigne = [], form_nb_questions = [], form_correction_detaillee =[], form_nb_cols = [], form_nb_cols_corr = [], form_spacing = [] , form_spacing_corr = [], form_sup = [], form_sup2 = [], form_sup3 = []; // Création de tableaux qui recevront les éléments HTML de chaque formulaires

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

		// div_parametres_generaux.innerHTML += `<h4 class="ui dividing header"></h4>`
		div_parametres_generaux.innerHTML +=`<div><label for="form_serie">Clé de la série d'exercices : </label> <input id="form_serie" type="text" style="padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;"></div>`

	}

	

	for (let i = 0; i < nb_exercices; i++) {
		if(sortie_html) {
			div_parametres_generaux.innerHTML += '<h4 class="ui dividing header">Exercice n°'+ (i+1) +' : '+ exercice[i].titre + ' − ' +liste_des_exercices[i] + '</h4>'
			if (exercice[i].pas_de_version_LaTeX) {
				div_parametres_generaux.innerHTML += "<p><em>Cet exercice n'a pas de version LaTeX et ne peut donc pas être exporté en PDF.</em></p>"
			}
			if (exercice[i].nb_questions_modifiable){
				div_parametres_generaux.innerHTML +='<div><label for="form_nb_questions'+i+'">Nombre de questions : </label> <input id="form_nb_questions'+i+'" type="number"  min="1" max="99"></div>'
			}
			if (exercice[i].correction_detaillee_disponible){
				div_parametres_generaux.innerHTML += '<div><label for="form_correction_detaillee'+i+'">Correction détaillée : </label> <input id="form_correction_detaillee'+i+'" type="checkbox" ></div>'
			}
			if (!exercice[i].nb_questions_modifiable && !exercice[i].correction_detaillee_disponible && !exercice[i].besoin_formulaire_numerique && !exercice[i].besoin_formulaire_texte) {
				div_parametres_generaux.innerHTML += '<p><em>Cet exercice ne peut pas être paramétré.</em></p>'
			}
		} else {
			div_parametres_generaux.innerHTML += '<h4 class="ui dividing header">Exercice n°'+ (i+1) +' : '+ exercice[i].titre +'</h4>'

			if (exercice[i].consigne_modifiable){
				div_parametres_generaux.innerHTML +='<div><label for="form_consigne'+i+'">Consigne : </label> <input id="form_consigne'+i+'" type="texte" size="20"></div>'

			}
			if (exercice[i].nb_questions_modifiable){
				div_parametres_generaux.innerHTML += '<div><label for="form_nb_questions'+i+'">Nombre de questions : </label> <input id="form_nb_questions'+i+'" type="number"  min="1" max="99"></div>'
			}
			if (exercice[i].correction_detaillee_disponible){
				div_parametres_generaux.innerHTML += '<div><label for="form_correction_detaillee'+i+'">Correction détaillée : </label> <input id="form_correction_detaillee'+i+'" type="checkbox" ></div>'
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

			if (exercice[i].besoin_formulaire3_case_a_cocher){ // Création d'un formulaire texte
				div_parametres_generaux.innerHTML += "<div style='display: inline'><label for='form_sup3"+i+"'>"+exercice[i].besoin_formulaire3_case_a_cocher[0]+" : </label>\
			<input id='form_sup3"+i+"' type='checkbox'  ></div>";
		}

			if (exercice[i].besoin_formulaire3_numerique){ // Création d'un formulaire numérique
				if (exercice[i].besoin_formulaire3_numerique[2]){ // Si un tooltip est défini
					div_parametres_generaux.innerHTML += '<div data-tooltip="'+exercice[i].besoin_formulaire3_numerique[2]+'"" data-inverted="" data-position="top left"><label for="form_sup3'+i+'">'+exercice[i].besoin_formulaire3_numerique[0]+' : </label><input id="form_sup3'+i+'" type="number"  min="1" max="'+exercice[i].besoin_formulaire3_numerique[1]+'"></div>';
				}
				else{
					div_parametres_generaux.innerHTML += '<div><label for="form_sup3'+i+'">'+exercice[i].besoin_formulaire3_numerique[0]+' : </label><input id="form_sup3'+i+'" type="number"  min="1" max="'+exercice[i].besoin_formulaire3_numerique[1]+'"></div>';
				}
			}

			if (exercice[i].besoin_formulaire3_texte){ // Création d'un formulaire texte
				div_parametres_generaux.innerHTML += "<p></p><div style='display: inline'><label for='form_sup3"+i+"'>"+exercice[i].besoin_formulaire3_texte[0]+" : </label>\
			<div style='display: inline' data-tooltip='"+exercice[i].besoin_formulaire3_texte[1]+"' data-inverted=''><input id='form_sup3"+i+"' type='text' size='20' ></div></div>";
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

			// Gestion du nombre de la correction détaillée
			if (exercice[i].correction_detaillee_disponible){
				form_correction_detaillee[i] = document.getElementById('form_correction_detaillee'+i);
				form_correction_detaillee[i].checked = exercice[i].correction_detaillee; // Rempli le formulaire avec la valeur par défaut
				form_correction_detaillee[i].addEventListener('change', function(e) { // Dès que le statut change, on met à jour
					exercice[i].correction_detaillee = e.target.checked;
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

			// Gestion de la suppression de la correction
			let form_correction_affichee = document.getElementById('supprimer_correction');
			form_correction_affichee.addEventListener('change', function(e) { // Dès que le statut change, on met à jour
				mise_a_jour_du_code();
			});
			
			
			// Gestion de la suppression des identifiants
			let form_supprimer_reference = document.getElementById('supprimer_reference');
			form_supprimer_reference.addEventListener('change', function(e) { // Dès que le statut change, on met à jour
				// nouvelles_donnees();
				mise_a_jour_du_code();
			});

			// Gestion du changement de style
			let btn_radio_style_classique = document.getElementById('style_classique');
			btn_radio_style_classique.addEventListener('change', nouvelles_donnees);
			let btn_radio_style_CoopMaths = document.getElementById('style_CoopMaths');
			btn_radio_style_CoopMaths.addEventListener('change', nouvelles_donnees);
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

		// Gestion de la correction détaillée
			if (exercice[i].correction_detaillee_disponible){
				form_correction_detaillee[i] = document.getElementById('form_correction_detaillee'+i);
				form_correction_detaillee[i].checked = exercice[i].correction_detaillee; // Rempli le formulaire avec la valeur par défaut
				form_correction_detaillee[i].addEventListener('change', function(e) { // Dès que le statut change, on met à jour
					exercice[i].correction_detaillee = e.target.checked;
					mise_a_jour_du_code();
				});
			}

		// Gestion de l'identifiant de la série'
			if (nb_exercices > 0){
				var form_serie = document.getElementById('form_serie');
				form_serie.value = graine; // Rempli le formulaire avec la graine
				form_serie.addEventListener('change', function(e) { // Dès que le statut change, on met à jour
					window.graine = e.target.value;
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
		
		
		if (exercice[i].besoin_formulaire3_case_a_cocher){
			form_sup3[i] = document.getElementById('form_sup3'+i);
			form_sup3[i].checked = exercice[i].sup3; // Rempli le formulaire avec le paramètre supplémentaire
			form_sup3[i].addEventListener('change', function(e) { // 
				exercice[i].sup3 = e.target.checked;
				mise_a_jour_du_code();
			});

		}

		if (exercice[i].besoin_formulaire3_numerique){
			form_sup3[i] = document.getElementById('form_sup3'+i);
			form_sup3[i].value = exercice[i].sup3; // Rempli le formulaire avec le paramètre supplémentaire
			form_sup3[i].addEventListener('change', function(e) { // Dès que le nombre change, on met à jour
				exercice[i].sup3 = e.target.value;
				mise_a_jour_du_code();
			});
		}

		if (exercice[i].besoin_formulaire3_texte){
			form_sup3[i] = document.getElementById('form_sup3'+i);
			form_sup3[i].addEventListener('keydown', function(e) { // Appui sur la touche entrée
				if (e.keyCode == 13){
        		exercice[i].sup3 = e.target.value;// Récupère  la saisie de l'utilisateur
        		mise_a_jour_du_code();
        	};
        });

			form_sup3[i].addEventListener('blur', function(e) { // Perte du focus
				exercice[i].sup3 = e.target.value;
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
		exercice = []
	} else {
		liste_des_exercices = [];
		exercice = []
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

var code_LaTeX = '', contenu_fichier = '', liste_packages = new Set;


function mise_a_jour_du_code(){
	// Fixe la graine pour les fonctions aléatoires
	 if (!window.graine) {
		  window.graine = strRandom({
		  includeUpperCase: true,
		  includeNumbers: true,
		  length: 4,
		  startsWithLowerCase: false
		});
	 }
	Math.seedrandom(graine)
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
		if (exercice[0].sup3){
			fin_de_l_URL += `,sup3=${exercice[0].sup3}`
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
			if (exercice[i].sup3){
				fin_de_l_URL += `,sup3=${exercice[i].sup3}`
			}
		}
		fin_de_l_URL +=`&serie=${graine}`
		window.history.pushState("","",fin_de_l_URL);
		let url = window.location.href.split('&serie')[0]; //met l'URL dans le bouton de copie de l'URL sans garder le numéro de la série
      	new Clipboard('.url', {text: function() {
          return url;
          }
      	});
		
	} else {
		// liste d'exercice vide à l'arrivée ou liste d'exercice vide par modification
	}

	
	// création des figures MG32 (géométrie dynamique)	
	
	window.MG32_tableau_de_figures = []
	if (sortie_html){
                    // code pour la sortie HTML

                    let code1 = "",
                      code2 = "",
                      code_LaTeX = "";
                    if (liste_des_exercices.length > 0) {
                      for (let i = 0; i < liste_des_exercices.length; i++) {
						exercice[i].id = liste_des_exercices[i]
                        exercice[i].nouvelle_version(i);
                        code1 +=
                          `<h3 class="ui dividing header">Exercice ${(i + 1)} − ${exercice[i].id}</h3>`;
                        if (exercice[i].bouton_aide) {
                          code1 += `<div id=aide${i}> ${exercice[i].bouton_aide}</div>`;
                        }
                        code1 += exercice[i].contenu;
                        if (exercice[i].type_exercice == "MG32") {
                          code1 += `<div id="MG32div${i}" class="MG32"></div>`;
                        }
                        code2 +=
                          '<h3 class="ui dividing header">Exercice ' +
                          (i + 1) +
                          "</h3>";
                        code2 += exercice[i].contenu_correction;
                        if (
                          exercice[i].type_exercice == "MG32" &&
                          exercice[i].MG32codeBase64corr
                        ) {
                          code2 += `<div id="MG32divcorr${i}" class="MG32"></div>`;
                        }
                      }
                      code1 = "<ol>" + code1 + "</ol>";
                      code2 = "<ol>" + code2 + "</ol>";
                      $("#message_liste_exercice_vide").hide();
                      $("#cache").dimmer("hide");
                    } else {
                      $("#message_liste_exercice_vide").show(); // Message au dessus de la liste des exercices
                      $("#cache").dimmer("show"); // Cache au dessus du code LaTeX
                    }

                    $("#exercices").html(code1);
					$("#corrections").html(code2);
					if (sortie_html){
						renderMathInElement(document.body, {
						delimiters: [
							{ left: "\\[", right: "\\]", display: true },
							{ left: "$", right: "$", display: false },
						],
						throwOnError: true,
						errorColor: "#CC0000",
						strict: "warn",
						trust: false,
						});
						// Interprete toutes les balises <pre class="blocks">
						scratchblocks.renderMatching("pre.blocks", {
						style: "scratch3",
						languages: ["fr"],
						});
					}
                    $(".katexPopup").popup({
                      popup: ".special.popup",
                      on: "hover",
                      variation: "inverted",
                      inline: true,
                    });
                    //Ajoute figures MG32
                    for (let i = 0; i < liste_des_exercices.length; i++) {
                      if (exercice[i].type_exercice == "MG32") {
                        MG32_ajouter_figure(i);
                      }
                    }
                    MG32_tracer_toutes_les_figures();
                  } else { // code pour la sortie LaTeX
		let code1 ='', code2='';
		code_LaTeX = '';
		if (liste_des_exercices.length > 0) {
			for (let i = 0; i < liste_des_exercices.length; i++) {
				exercice[i].id = liste_des_exercices[i] // Pour récupérer l'id qui a appelé l'exercice
				exercice[i].nouvelle_version();
				if (exercice[i].titre=='Fichier statique') {
					liste_des_exercices_statiques.push(exercice[i].sup)
				}
				code1 += exercice[i].contenu;
				code1 += '\n\n'
				code2 += exercice[i].contenu_correction;
				code2 += '\n\n'
				if (typeof exercice[i].liste_packages === 'string') {
					liste_packages.add(exercice[i].liste_packages)
				} else { // si c'est un tableau
					exercice[i].liste_packages.forEach(liste_packages.add,liste_packages)
				} 
			}
				
			if ($('#supprimer_correction:checked').val()) {
				code_LaTeX =  code1; 
			} else {
				code_LaTeX =  code1 +
				'\n\n%%%%%%%%%%%%%%%%%%%%%%\n%%%   CORRECTION   %%%\n%%%%%%%%%%%%%%%%%%%%%%\n\n\\newpage\n\\begin{correction}\n\n' + 
				code2 + '\\end{correction}'; 
			}
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

			contenu_fichier = `

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Document généré avec MathALEA sous licence CC-BY-SA
%
% ${window.location.href}
%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

`

			if ($('#style_classique:checked').val()){
				if ($("#entete_du_fichier").val()=='') {
					$("#entete_du_fichier").val('Exercices')
				}
				contenu_fichier += `\\documentclass[a4paper,11pt,fleqn]{article}\n`
				contenu_fichier += `\\input{preambule}\n\\pagestyle{fancy}\n\\renewcommand{\\headrulewidth}{1pt}\n\\fancyhead[C]{${$("#entete_du_fichier").val()}}\n\\fancyhead[L]{}`
				contenu_fichier += `\\fancyhead[R]{}\n\\renewcommand{\\footrulewidth}{1pt}\n\\fancyfoot[C]{}\n\\fancyfoot[L]{}\n\\fancyfoot[R]{}\n\n`
				contenu_fichier += `\\begin{document}\n\n` + code_LaTeX + `\n\n\\end{document}`
			} else
			{
				contenu_fichier += '\\documentclass[a4paper,11pt,fleqn]{article}\n\\input{preambule_coop}\n'
				contenu_fichier +='\\theme{' + $('input[name=theme]:checked').val() + '}{' + $("#entete_du_fichier").val() + '}'
				contenu_fichier += '{' + $("#items").val() + '}{' + $("#domaine").val() + '}\n\\begin{document}\n\n' + code_LaTeX
				contenu_fichier += '\n\n\\end{document}'
			}

			if ($("#nom_du_fichier").val()) {
				telechargeFichier(contenu_fichier, $("#nom_du_fichier").val()+'.tex');	
			}else
			{
				telechargeFichier(contenu_fichier, 'mathalea.tex');
			}
			
		});



	$( "#btn_overleaf").click(function() {
			// Gestion du style pour l'entête du fichier

			contenu_fichier = `

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Document généré avec MathALEA sous licence CC-BY-SA
%
% ${window.location.href}
%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


`

			if ($('#style_classique:checked').val()){
				contenu_fichier += intro_LaTeX($("#entete_du_fichier").val()) + code_LaTeX + '\n\n\\end{document}'
			} else
			{
				contenu_fichier += intro_LaTeX_coop()
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

		$('#options_style_CoopMaths').show(); 	// par défaut le style coop 
		$('a.lien_images').show();				
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

function nouvelles_donnees() {
	graine = strRandom({
	  includeUpperCase: true,
	  includeNumbers: true,
	  length: 4,
	  startsWithLowerCase: false
	});
	form_serie.value = graine; // mise à jour du formulaire
	mise_a_jour_du_code();
}


window.onload = function()  {
//$( document ).ready(function() {	
	if (div_signaletique) {
		dragElement(div_signaletique); // Pour déplacer la signalétique
	}
	if (div_horloge) {
		dragElement(div_horloge);
		horloge(); // Mettre à jour l'heure
	}
	
	$('.ui.dropdown').dropdown(); // Pour le menu des exercices
	$('.ui.accordion').accordion('refresh');
	$('.ui.checkbox').checkbox();
	// Gestion du bouton de copie
	$('.ui.button.toggle').state(); // initialise le bouton
	if (sortie_html) {
		document.getElementById('btnCopieURL').addEventListener('click', function () {
			setTimeout(function () {
				$('#btnCopieURL').removeClass('active'); // "éteint" le bouton 1s après 
			}, 1000);
		});
		
		if (document.getElementById('btnQRcode')){
			document.getElementById('btnQRcode').addEventListener('click',function () {
				$('#ModalQRcode').html('');
				let qrcode = new QRCode(document.getElementById("ModalQRcode"), {
					text: window.location.href,
					width: Math.min(window.innerHeight,window.innerWidth)*.9,
					height: Math.min(window.innerHeight,window.innerWidth)*.9,
					colorDark : "#000000",
					colorLight : "#ffffff",
					correctLevel : QRCode.CorrectLevel.H
				});
				qrcode.makeCode(window.location.href)
				$('#ModalQRcode').modal('show')
			})
		}
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

	let btn_mise_a_jour_code = document.getElementById('btn_mise_a_jour_code');
	btn_mise_a_jour_code.addEventListener('click', nouvelles_donnees);
	


	// Gestion des effets visuels
	// $('.ui.accordion').accordion(); // active les acordéons (paramètres du fichier .tex)
	$('.ui.radio.checkbox').checkbox(); // active les boutons radio (pour le style)

	// Récupère la graine pour l'aléatoire dans l'URL
	let params = (new URL(document.location)).searchParams;
	let serie = params.get('serie');
	if (serie) {
		graine = serie;
	}
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
    		if (tableau_objets_exercices[i]["sup3"]){
    			exercice[i].sup3 = tableau_objets_exercices[i]["sup3"]
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

	// Gestion de la redirection vers MathaleaLaTeX
	$( "#btnLaTeX").click(function() {
			window.location.href=window.location.href.replace('exercice.html','mathalealatex.html');
	      	//window.location.hash = 'section';
	 });

};


// Gestion de la signalétique
const div_signaletique = document.getElementById("signaletique")
const div_horloge = document.getElementById("horloge")

//Source : https://www.w3schools.com/howto/howto_js_draggable.asp
// Make the DIV element draggable:

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;
  

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function horloge()
	{
	let date = new Date;
	let heure = date.getHours();
	let min = date.getMinutes();
	if (min < 10)
		min0 = "0";
	else
		min0 = "";
	if (heure < 10)
		heure0 = "0";
	else
		heure0 = "";
	let heure_dynamique = heure0 + heure + ":" + min0 + min;
	div_horloge.innerHTML=heure_dynamique.fontsize(20);
	let timer_horloge = setTimeout("horloge()", 1000)
}

if (div_signaletique && div_horloge) {
	document.addEventListener('keydown', (event) => {
		const nomTouche = event.key;

		if (nomTouche === 's') {
			if (div_signaletique.innerHTML=='<img src="images/silence.png" width="100px">') {
				div_signaletique.innerHTML = ''
				div_signaletique.style.display = 'none'
				clearTimeout(timer_horloge);
			} else {
				div_signaletique.innerHTML = '<img src="images/silence.png" width="100px">'
				div_signaletique.style.display = 'inline'
			}
		}
		if (nomTouche === 'r') {
			if (div_signaletique.innerHTML=='<img src="images/feu_rouge.png" width="100px">') {
				div_signaletique.innerHTML = ''
				div_signaletique.style.display = 'none'
			} else {
				div_signaletique.innerHTML = '<img src="images/feu_rouge.png" width="100px">'
				div_signaletique.style.display = 'inline'
			}
		}
		if (nomTouche === 'o') {
			if (div_signaletique.innerHTML=='<img src="images/feu_orange.png" width="100px">') {
				div_signaletique.innerHTML = ''
				div_signaletique.style.display = 'none'
			} else {
				div_signaletique.innerHTML = '<img src="images/feu_orange.png" width="100px">'
				div_signaletique.style.display = 'inline'
			}
		}
		if (nomTouche === 'v') {
			if (div_signaletique.innerHTML=='<img src="images/feu_vert.png" width="100px">') {
				div_signaletique.innerHTML = ''
				div_signaletique.style.display = 'none'
			} else {
				div_signaletique.innerHTML = '<img src="images/feu_vert.png" width="100px">'
				div_signaletique.style.display = 'inline'
			}
		}
		if (nomTouche === 'c') {
			if (div_signaletique.innerHTML=='<img src="images/chuchoter.png" width="100px">') {
				div_signaletique.innerHTML = ''
				div_signaletique.style.display = 'none'
			} else {
				div_signaletique.innerHTML = '<img src="images/chuchoter.png" width="100px">'
				div_signaletique.style.display = 'inline'
			}
		}
		if (nomTouche === 't') {
			if (div_horloge.style.display=='none') {
				div_horloge.style.display = 'inline'
			} else {
				div_horloge.style.display = 'none'
			}
		}
	}, false);
}
	

// Gestion des blocs Scratch
if (sortie_html){
	window.scratchblocks.loadLanguages({
		fr: {
			"commands": {
			"move %1 steps": "avancer de %1 pas",
			"turn @turnRight %1 degrees": "tourner @turnRight de %1 degrés",
			"turn @turnLeft %1 degrees": "tourner @turnLeft de %1 degrés",
			"point in direction %1": "s'orienter à %1",
			"point towards %1": "s'orienter vers %1",
			"go to x:%1 y:%2": "aller à x: %1 y: %2",
			"go to %1": "aller à %1",
			"glide %1 secs to x:%2 y:%3": "glisser en %1 secondes à x: %2 y: %3",
			"glide %1 secs to %2": "glisser en %1 secondes à %2",
			"change x by %1": "ajouter %1 à x",
			"set x to %1": "mettre x à %1",
			"change y by %1": "ajouter %1 à y",
			"set y to %1": "mettre y à %1",
			"set rotation style %1": "fixer le sens de rotation %1",
			"say %1 for %2 seconds": "dire %1 pendant %2 secondes",
			"say %1": "dire %1",
			"think %1 for %2 seconds": "penser à %1 pendant %2 secondes",
			"think %1": "penser à %1",
			"show": "montrer",
			"hide": "cacher",
			"switch costume to %1": "basculer sur le costume %1",
			"next costume": "costume suivant",
			"next backdrop": "arrière-plan suivant",
			"switch backdrop to %1": "basculer sur l'arrière-plan %1",
			"switch backdrop to %1 and wait": "basculer sur l'arrière-plan %1 et attendre",
			"change %1 effect by %2": "ajouter %2 à l'effet %1",
			"set %1 effect to %2": "mettre l'effet %1 à %2",
			"clear graphic effects": "annuler les effets graphiques",
			"change size by %1": "ajouter %1 à la taille",
			"set size to %1%": "mettre la taille à %1 % de la taille initiale",
			"go to %1 layer": "aller à l'%1 plan",
			"go %1 %2 layers": "déplacer de %2 plans vers l'%1",
			"start sound %1": "jouer le son %1",
			"clear sound effects": "annuler tous les effets sonores",
			"play sound %1 until done": "jouer le son %1 jusqu'au bout",
			"stop all sounds": "arrêter tous les sons",
			"play drum %1 for %2 beats": "jouer du tambour %1 pendant %2 temps",
			"rest for %1 beats": "faire une pause pendant %1 temps",
			"play note %1 for %2 beats": "jouer la note %1 pendant %2 temps",
			"set instrument to %1": "choisir l'instrument n° %1",
			"change volume by %1": "ajouter %1 au volume",
			"set volume to %1%": "mettre le volume à %1%",
			"change tempo by %1": "ajouter %1 au tempo",
			"set tempo to %1": "mettre le tempo à %1",
			"erase all": "effacer tout",
			"stamp": "estampiller",
			"pen down": "stylo en position d'écriture",
			"pen up": "relever le stylo",
			"set pen color to %1": "mettre la couleur du stylo à %1",
			"change pen color by %1": "ajouter %1 à la couleur du stylo",
			"set pen %1 to %2": "mettre la %1 du stylo à %2",
			"change pen %1 by %2": "ajouter %2 à la %1 du stylo",
			"change pen shade by %1": "ajouter %1 à l'intensité du stylo",
			"set pen shade to %1": "mettre l'intensité du stylo à %1",
			"change pen size by %1": "ajouter %1 à la taille du stylo",
			"set pen size to %1": "mettre la taille du stylo à %1",
			"when @greenFlag clicked": "quand @greenFlag est cliqué",
			"when %1 key pressed": "quand la touche %1 est pressée",
			"when this sprite clicked": "quand ce sprite est cliqué",
			"when stage clicked": "quand la scène est cliquée",
			"when backdrop switches to %1": "quand l'arrière-plan bascule sur %1",
			"when %1 > %2": "quand le %1 > %2",
			"when I receive %1": "quand je reçois %1",
			"broadcast %1": "envoyer à tous %1",
			"broadcast %1 and wait": "envoyer à tous %1 et attendre",
			"wait %1 seconds": "attendre %1 secondes",
			"repeat %1": "répéter %1 fois",
			"forever": "répéter indéfiniment",
			"if %1 then": "si %1 alors",
			"wait until %1": "attendre jusqu'à ce que %1",
			"repeat until %1": "répéter jusqu'à ce que %1",
			"stop %1": "stop %1",
			"when I start as a clone": "quand je commence comme un clone",
			"create clone of %1": "créer un clone de %1",
			"delete this clone": "supprimer ce clone",
			"ask %1 and wait": "demander %1 et attendre",
			"turn video %1": "vidéo %1",
			"set video transparency to %1%": "mettre la transparence vidéo sur %1",
			"when video motion > %1": "quand mouvement vidéo > %1",
			"reset timer": "réinitialiser le chronomètre",
			"set %1 to %2": "mettre %1 à %2",
			"change %1 by %2": "ajouter %2 à %1",
			"show variable %1": "montrer la variable %1",
			"hide variable %1": "cacher la variable %1",
			"add %1 to %2": "ajouter %1 à %2",
			"delete %1 of %2": "supprimer l'élément %1 de %2",
			"delete all of %1": "supprimer tous les éléments de la liste %1",
			"if on edge, bounce": "rebondir si le bord est atteint",
			"insert %1 at %2 of %3": "insérer %1 en position %2 de %3",
			"replace item %1 of %2 with %3": "remplacer l'élément %1 de la liste %2 par %3",
			"show list %1": "montrer la liste %1",
			"hide list %1": "cacher la liste %1",
			"x position": "abscisse x",
			"y position": "ordonnée y",
			"direction": "direction",
			"costume #": "numéro de costume",
			"costume %1": "%1 du costume",
			"size": "taille",
			"backdrop name": "nom de l'arrière-plan",
			"backdrop %1": "%1 de l'arrière-plan",
			"backdrop #": "numéro de l'arrière-plan",
			"volume": "volume",
			"tempo": "tempo",
			"touching %1?": "touche le %1 ?",
			"touching color %1?": "couleur %1 touchée ?",
			"color %1 is touching %2?": "couleur %1 touche %2 ?",
			"distance to %1": "distance de %1",
			"answer": "réponse",
			"key %1 pressed?": "touche %1 pressée ?",
			"mouse down?": "souris pressée ?",
			"mouse x": "souris x",
			"mouse y": "souris y",
			"set drag mode %1": "mettre mode de glissement à %1",
			"loudness": "volume sonore",
			"video %1 on %2": "vidéo %1 sur %2",
			"timer": "chronomètre",
			"%1 of %2": "%1 de %2",
			"current %1": "%1 actuelle",
			"days since 2000": "jours depuis 2000",
			"username": "nom d'utilisateur",
			"%1 + %2": "%1 + %2",
			"%1 - %2": "%1 - %2",
			"%1 * %2": "%1 * %2",
			"%1 / %2": "%1 / %2",
			"pick random %1 to %2": "nombre aléatoire entre %1 et %2",
			"%1 < %2": "%1 < %2",
			"%1 = %2": "%1 = %2",
			"%1 > %2": "%1 > %2",
			"%1 and %2": "%1 et %2",
			"%1 or %2": "%1 ou %2",
			"not %1": "non %1",
			"join %1 %2": "regrouper %1 et %2",
			"letter %1 of %2": "lettre %1 de %2",
			"length of %1": "longueur de %1",
			"%1 mod %2": "%1 modulo %2",
			"round %1": "arrondi de %1",
			"%1 contains %2?": "%1 contient %2 ?",
			"item %1 of %2": "élément %1 de %2",
			"item # of %1 in %2": "position de %1 dans %2",
			"turn %1 on": "allumer le moteur %1",
			"turn %1 off": "éteindre le moteur %1",
			"set %1 power to %2": "mettre la puissance du moteur %1 à %2",
			"set %1 direction to %2": "mettre la direction du moteur %1 à %2",
			"when distance %1 %2": "quand la distance %1 %2",
			"distance": "distance",
			"turn %1 on for %2 seconds": "allumer le moteur %1 pendant %2 secondes",
			"set light color to %1": "mettre la couleur de la lampe à %1",
			"play note %1 for %2 seconds": "jouer la note %1 pendant %2 secondes",
			"when tilted %1": "quand incliné %1",
			"tilt angle %1": "angle d'inclinaison %1",
			"else": "sinon",
			"user id": "id de l'utilisateur",
			"loud?": "fort ?"
			},
			"dropdowns": {},
			"ignorelt": [],
			"soundEffects": [
			"hauteur",
			"stéréo gauche/droite"
			],
			"osis": [
			"autres scripts dans sprite"
			],
			"definePrefix": [
			"définir"
			],
			"defineSuffix": [],
			"palette": {
			"Motion": "Mouvement",
			"Looks": "Apparence",
			"Sound": "Son",
			"Events": "Événements",
			"Control": "Contrôle",
			"Sensing": "Capteurs",
			"Operators": "Opérateurs",
			"Variables": "Variables",
			"My Blocks": "Mes Blocs"
			},
			"math": [
			"abs",
			"plancher",
			"plafond",
			"racine",
			"sin",
			"cos",
			"tan",
			"asin",
			"acos",
			"atan",
			"ln",
			"log",
			"e^",
			"10^"
			],
			"aliases": {
			"tourner gauche de %1 degrés": "turn @turnLeft %1 degrees",
			"tourner droite de %1 degrés": "turn @turnRight %1 degrees",
			"quand le drapeau vert pressé": "when @greenFlag clicked",
			"fin": "end"
			},
			"name": "Français",
			"percentTranslated": 100
		}})
}