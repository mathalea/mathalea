import { tridictionnaire, filtreDictionnaire, filtreDictionnaireValeurCle, filtreDictionnaireValeurTableauCle, enleve_element, compteOccurences }  from "./outils.js" ;
import {dictionnaireDesExercicesAleatoires} from "./dictionnaireDesExercicesAleatoires.js"
import {dictionnaireC3} from "./dictionnaireC3.js" 
import {dictionnaireDNB} from "./dictionnaireDNB.js"

// Liste tous les tags qui ont été utilisé
let tags = new Set()
for (let item in dictionnaireDNB){
  for (let k of dictionnaireDNB[item]["tags"]){
    tags.add(k)
  }
}
// transforme le set en tableau dans l'ordre alphabétique
let tableauTags = ([...tags].sort())
enleve_element(tableauTags,"Système d'équations")
enleve_element(tableauTags,"Hors programme")

// On concatène les différentes listes d'exercices
export let dictionnaireDesExercices = {...dictionnaireDesExercicesAleatoires,...dictionnaireDNB, ...dictionnaireC3};
let liste_des_exercices_disponibles = tridictionnaire(dictionnaireDesExercices);

function coupe_chaine(titre,max_length) {
	for (var i=max_length ; i>5 ; i--) {
		if (titre[i] == ' ') {
			return titre.substr(0,i) + '\n' + titre.substr(i+1, titre.length)
		}
	}
}

function span_exercice(id,titre) {
	var max_length,tooltip, titre_tronque;
	if (document.getElementById('exercices_disponibles') && document.getElementById('exercices_disponibles').clientWidth > 600) {
		max_length = 80;		
	} else if (document.getElementById('exercices_disponibles') && document.getElementById('exercices_disponibles').clientWidth > 490) {
		max_length = 60;
	} else {
		max_length = 50;
	}
	tooltip = titre.length > max_length ? 
		'data-tooltip="' + coupe_chaine(titre,max_length+20) + '"'
		: "";
	titre_tronque = titre.length > max_length ? titre.substr(0,max_length) + '...' : titre;
	return `<span class="id_exercice">${id}</span> - <a class="ui bouton lien_id_exercice" ${tooltip} numero="${id}">${titre_tronque}</a></a><span data-content="Prévisualiser l\'exercice."><i id="${id}" class="eye icon icone_preview" size="mini"></i></span></br>\n`
}

function liste_html_des_exercices_d_un_theme(theme){
  let liste = '';
  let dictionnaire = filtreDictionnaire(liste_des_exercices_disponibles,theme);
  for (let id in dictionnaire) {
    liste += span_exercice(id,dictionnaire[id].titre);
  }
  return liste;
}
function liste_html_des_exercices_DNB_annee(annee){
  let liste = '';
  let dictionnaire = filtreDictionnaireValeurCle(dictionnaireDNB,"annee",annee);
  for (let id in dictionnaire) {
    liste +=
      `<a style="line-height:2.5" class="lien_id_exercice" numero="${id}">${dictionnaire[id]["lieu"]} - ${dictionnaire[id]["mois"]} -  Ex ${dictionnaire[id]["numeroExercice"]}</a> ${liste_html_des_tags(dictionnaire[id])} <i id="${id}" class="eye icon icone_preview"></i></br>\n`;
  }
  return liste;
}
function liste_html_des_exercices_DNB_theme(theme){
  let liste = '';
  let dictionnaire = filtreDictionnaireValeurTableauCle(dictionnaireDNB,"tags",theme);
  let tableauDesExercices = []
  for (let id in dictionnaire){
      tableauDesExercices.push(id)
  }
  // On créé un tableau "copie" du dictionnaire pour pouvoir le trier dans l'inverse de l'ordre alphabétique et faire ainsi apparaitre les exercices les plus récents
  tableauDesExercices = tableauDesExercices.sort().reverse()
  for (let id of tableauDesExercices) {
    liste +=
      `<a style="line-height:2.5" class="lien_id_exercice" numero="${id}">${dictionnaire[id]["annee"]} - ${id.substr(9,2)} - ${dictionnaire[id]["lieu"]} - Ex ${dictionnaire[id]["numeroExercice"]}</a> ${liste_html_des_tags(dictionnaire[id])} <i id="${id}" class="eye icon icone_preview"></i></br>\n`;
  }
  return liste;
}

function liste_html_des_exercices_d_un_niveau(liste_de_themes){ // liste_de_themes = [['6N1','6N1 - Numérations et fractions niveau 1'] , [' ',' '] ]
  let liste = '';
  for (let theme of liste_de_themes){
    liste += `<h3>${theme[1]}</h3>`;
    liste += liste_html_des_exercices_d_un_theme(theme[0]);
  }
  return liste;
}

function get_liste_html_des_exercices_DNB(){ 
  let liste = '<div class="accordion">';
  for (let annee of ["2020","2019","2018","2017","2016","2015","2014","2013"]){
    liste += `<div class="title"><i class="dropdown icon"></i> ${annee}</div><div class="content">`;
    liste += liste_html_des_exercices_DNB_annee(annee);
    liste += `</div>`
  }
  liste += `</div>`
  return liste;
}

function get_liste_html_des_exercices_DNB_theme(){ 
  let liste = '<div class="accordion">';
  for (let theme of tableauTags){
//     [
//   "Agrandissement-réduction",
//   "Aires et périmètres",
//   "Algorithmique-programmation",
//   "Arithmétique",
//   "Calcul littéral",
//   "Calculs numériques",
//   "Géométrie dans l'espace",
//   "Durées",
//   "Equations",
//   "Fractions",
//   "Fonctions",
//   "Géométrie plane",
//   "Grandeurs composées",
//   "Pourcentages",
//   "Prise d'initiatives",
//   "Programme de calculs",
//   "Probabilités",
//   "Proportionnalité",
//   "Puissances",
//   "Pythagore",
//   "QCM",
//   "Thalès",
//   "Transformations",
//   "Trigonométrie",
//   "Vitesses",
//   "Volumes",
//   "Vrai-faux",
//   "Statistiques",
//   "Tableur"
// ]){
    liste += `<div class="title"><i class="dropdown icon"></i> ${theme}</div><div class="content">`;
    liste += liste_html_des_exercices_DNB_theme(theme);
    liste += `</div>`
  }
  liste += `</div>`
  return liste;
}

function liste_html_des_tags(objet){
    let result = ''
    if (objet["tags"]!==undefined){
        for (let tag of objet["tags"]){
            if (tag == "Hors programme") {
              result += `<div class="ui mini red label">${tag}</div>`
            } else {
              result += `<div class="ui mini blue label">${tag}</div>`
            }
        }
    }
    return result
}

function div_niveau(obj,active,id) {
	var nombre_exo= "";
	if (id!="DNB" && id != "DNBtheme") {
		nombre_exo = "("+obj.nombre_exercices_dispo+")";
	}
	return `<div id=${id} class="${active ? "active title fermer_niveau" : "title ouvrir_niveau"}"><i class="dropdown icon"></i>${obj.label} ${nombre_exo}</div><div id="content${id}" class="${active} content">${active ? obj.liste_html_des_exercices : '' }</div>`
}

//fonction ajout d'un exercice : ajoute l'exercice dans l'input avec la liste des exercice et provoque l'evt change pour recalcul de la page.
function addExercice(e) {
	let numero = $(e.target).attr("numero");
  if ($("#choix_des_exercices").val() == "") {
    $("#choix_des_exercices").val($("#choix_des_exercices").val() + numero);
  } else {
    $("#choix_des_exercices").val(
      $("#choix_des_exercices").val() + "," + numero
    );
  }
  
  // Créé un évènement de changement de la valeur du champ pour déclencher la mise à jour
  let event = new Event('change');
  document.getElementById('choix_des_exercices').dispatchEvent(event);
  
  // Actualise KaTeX pour les titres d'exercices utilisant LaTeX
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
}

export function apparence_exercice_actif() {
	$(".exerciceactif").removeClass("exerciceactif");
	$(".delexercice").remove();
	let liste_exercices_selectionnes = document.getElementById("choix_des_exercices").value.split(",");
    for (let i = 0; i < liste_exercices_selectionnes.length; i++) {
        let elem_liste = $(`a.lien_id_exercice[numero='${liste_exercices_selectionnes[i]}']`);
		
		if (!elem_liste.hasClass("exerciceactif")) {
			elem_liste.after(`<span data-tooltip="Supprimer le dernière occurence de l\'exercice."><i class="minus square icon delexercice" id="del¤${liste_exercices_selectionnes[i]}" ></i></span>`);
		}
		elem_liste.addClass("exerciceactif");
        // Si un exercice a été mis plus d'une fois, on affiche le nombre de fois où il est demandé
        if (compteOccurences(liste_exercices_selectionnes, liste_exercices_selectionnes[i]) > 1) {
            // Ajout de first() car un exercice de DNB peut apparaitre à plusieurs endroits
            let ancienTexte = elem_liste.first().text()
            let txt = ancienTexte.split('✖︎')[0] + ` ✖︎ ${compteOccurences(liste_exercices_selectionnes, liste_exercices_selectionnes[i])}`
            elem_liste.text(txt)
        } else {
            let ancienTexte = elem_liste.first().text()
            let txt = ancienTexte.split('✖︎')[0]
            elem_liste.text(txt)
        }
    }
	$(".delexercice").off("click").on("click", function (e) {
		supprimerExo(event.target.id,true);
	});
	$(".icone_preview").off("click").on("click", function (e) {
			$(".popup").trigger('click');
	});
}

export function supprimerExo(num,last) {  
//fonction suppression d'un exercice : supprime l'exercice dans l'input avec la liste des exercice et provoque l'evt change pour recalcul de la page.
	var id_exo, liste_exercices_selectionnes, form_choix_des_exercices = document.getElementById("choix_des_exercices");
	liste_exercices_selectionnes = form_choix_des_exercices.value.replace(/\s/g, "").replace(";", ",").split(",");
	if (last) { // alors on est dans le cas de la liste : on supprime la dernière occurence de l'identifiant de l'exercice.
		id_exo = num.split("¤");
		num = liste_exercices_selectionnes.lastIndexOf(id_exo[1]);
	} else {
		num = parseInt(num);
	}
	liste_exercices_selectionnes.splice(num,1);
	form_choix_des_exercices.value = liste_exercices_selectionnes.toString();
	let event = new Event('change');
    document.getElementById('choix_des_exercices').dispatchEvent(event);
}
	
export function menuDesExercicesDisponibles(){
// Détermine le nombre d'exercices par niveaux
    var i, liste_affichage, liste_html_des_exercices, liste_affichage_length, liste_html_des_exercicestab;
	var obj_exercices_disponibles = {
		c3:{
			label:"CM1 /CM2",
			nombre_exercices_dispo:0,
			liste_html_des_exercices:liste_html_des_exercices_d_un_niveau([
				['c3C1','c3C1 - Calculs niveau 1'],['c3C2','c3C2 - Calculs niveau 2'],['c3C3','c3C3 - Calculs niveau 3'],
				['c3N1','c3N1 - Numération Niveau 1'],['c3N2','c3N2 - Numération Niveau 2'],['c3N3','c3N3 - Numération Niveau 3']]),
			},
		6:{
			label:"Sixième",
			nombre_exercices_dispo:0,
			liste_html_des_exercices:liste_html_des_exercices_d_un_niveau([
				['6C1','6C1 - Calculs niveau 1'],['6C2','6C2 - Calculs niveau 2'],['6C3','6C3 - Calculs niveau 3'],
				['6D1','6D1 - Les durées'],
				['6G1','6G1 - Géométrie niveau 1'],['6G2','6G2 - Géométrie niveau 2'],['6G3','6G3 - Géométrie niveau 3'],['6G4','6G4 - Géométrie niveau 4'],
				['6M1','6M1 - Grandeurs et mesures niveau 1'],['6M2','6M2 - Grandeurs et mesures niveau 2'],['6M3', '6M3 - Volumes'],
				['6N1','6N1 - Numération et fractions niveau 1'],['6N2','6N2 - Numération et fractions niveau 2'],['6N3','6N3 - Numération et fractions niveau 3'],['6N4','6N4 - Numération et fractions niveau 4'],
				['6P1','6P1 - Proportionnalité'],['6S1','6S1 - Statistiques'],
				['6Algo1','6A - Algorithmique']]),
			},
		5:{
			label:"Cinquième",
			nombre_exercices_dispo:0,
			liste_html_des_exercices:liste_html_des_exercices_d_un_niveau([
				['5A1','5A1 - Arithmetique'],['5C1','5C1 - Calculs'],
				['5G1','5G1 - Symétries'],['5G2','5G2 - Triangles'],['5G3','5G3 - Angles'],['5G4','5G4 - Parallélogrammes'],['5G5','5G5 - Espace'],
				['5L1','5L1 - Calcul littéral'],
				['5M1','5M1 - Périmètres et aires'],['5M2','5M2 - Volumes'],['5M3','5M3 - Durées'],
				['5N1','5N1 - Numération et fractions niveau 1'],['5N2','5N2 - Calculs avec les fractions'],
				['5P1','5P1 - Proportionnalité'],['5R1','5R1 - Relatifs niveau 1'],['5R2','5R2 - Relatifs niveau 2'],
				['5S1','5S1 - Statistiques'],['5S2','5S2 - Probabilités']]),
			},
		4:{
			label:"Quatrième",
			nombre_exercices_dispo:0,
			liste_html_des_exercices:liste_html_des_exercices_d_un_niveau([
				['4C1','4C1 - Relatifs'],['4C2','4C2 - Fractions'],['4C3','4C3 - Puissances'],
				['4F1','4F1 - Notion de fonction'],
				['4G1','4G1 - Translation et rotation'],['4G2','4G2 - Théorème de Pythagore'],['4G3','4G3 - Théorème de Thalès'],['4G4',"4G4 - Cosinus d'un angle"],['4G5',"4G5 - Espace"],
				['4L1','4L1 - Calcul littéral'],['4L2','4L2 - Équation'],['4P1','4P1 - Proportionnalité'],['4S1','4S1 - Statistiques'],['4S2','4S2 - Probabilités'],
				['4Algo1','4A1 - Algorithmique']]),
			},
		3:{
			label:"Troisième",
			nombre_exercices_dispo:0,
			liste_html_des_exercices:liste_html_des_exercices_d_un_niveau([
				['3A1','3A1 - Arithmetique'],
				['3F1','3F1 - Généralités sur les fonctions'],['3F2','3F2 - Fonctions affines et linéaires'],
				['3G1','3G1 - Homothétie et rotation'],['3G2','3G2 - Théorème de Thalès'],['3G3','3G3 - Trigonométrie'],['3G4',"3G4 - Espace"],
				['3L1','3L1 - Calcul littéral'],['3P1','3P1 - Proportionnalité'],['3S1','3S1 - Statistiques'],['3S2','3S2 - Probabilités'],
				['3Algo1','3Algo1 - Algorithmique premier niveau']]),
			},
		DNB:{
			label:"Exercices de brevet (classés par année)",
			nombre_exercices_dispo:0,
			liste_html_des_exercices:get_liste_html_des_exercices_DNB(),
			},
		DNBtheme:{
			label:"Exercices de brevet (classés par thème)",
			nombre_exercices_dispo:0,
			liste_html_des_exercices:get_liste_html_des_exercices_DNB_theme(),
			},
		C:{
			label:"Calcul mental",
			nombre_exercices_dispo:0,
			liste_html_des_exercices:"",
			},
		2:{
			label:"Seconde",
			nombre_exercices_dispo:0,
			liste_html_des_exercices:"",
			},
		1:{
			label:"Première",
			nombre_exercices_dispo:0,
			liste_html_des_exercices:"",
			},
		T:{
			label:"Terminale",
			nombre_exercices_dispo:0,
			liste_html_des_exercices:"",
			},
		be:{
			label:"Beta",
			nombre_exercices_dispo:0,
			liste_html_des_exercices:"",
			},
		PE:{
			label:"CRPE",
			nombre_exercices_dispo:0,
			liste_html_des_exercices:"",
			},
		P0:{
			label:"Outils pour le professeur",
			nombre_exercices_dispo:0,
			liste_html_des_exercices:"",
			},
	};	

	liste_html_des_exercicestab = "";
    for (let id in liste_des_exercices_disponibles) {
		if ((id[0] == "c" && id[1] == "3") || (id[0] == "P" && id[1] == "0") || (id[0] == "P" && id[1] == "E") || (id[0] == "b" && id[1] == "e")) {
			obj_exercices_disponibles[id[0]+id[1]].nombre_exercices_dispo += 1;
		}
		if (id[0] == 6 || id[0] == 5 || id[0] == 4 || id[0] == 3 || id[0] == 2 || id[0] == 1 || id[0] == "T" || id[0] == "C") {
			obj_exercices_disponibles[id[0]].nombre_exercices_dispo += 1;
		}
	
		let exercice_tmp = id;     
		if (id[0] == 2 || id[0] == 1 || id[0] == "T" || id[0] == "C") {
			obj_exercices_disponibles[id[0]].liste_html_des_exercices += span_exercice(id,dictionnaireDesExercices[exercice_tmp].titre);
		}     
		if ((id[0] == "P" && id[1] == "0") || (id[0] == "P" && id[1] == "E") || (id[0] == "b" && id[1] == "e")) {
			obj_exercices_disponibles[id[0]+id[1]].liste_html_des_exercices += span_exercice(id,dictionnaireDesExercices[exercice_tmp].titre);
		}
		//cg 04-2021 Génération du tableau des exercices.
		if (exercice_tmp[0] != "b" || exercice_tmp[1] != "e") { //on exclu les beta
			if (dictionnaireDesExercices[exercice_tmp].titre) { //tous les non dnb
				liste_html_des_exercicestab += '<tr><td class="colonnecode"><span class="id_exercice">' +
				id +
				'</span></td> <td> <a class="lien_id_exercice" numero="' +id +'">' + dictionnaireDesExercices[exercice_tmp].titre +
				'</a></td><td data-tooltip="Prévisualiser l\'exercice."><i id="'+id+'" class="eye icon icone_preview" ></td></tr>';
			}
			else {
				liste_html_des_exercicestab += '<tr><td class="colonnecode"><span class="id_exercice">' +
			id +
			'</span></td> <td>'+
			`<a style="line-height:2.5" class="lien_id_exercice" numero="${exercice_tmp}">${dictionnaireDesExercices[exercice_tmp]["annee"]} - ${exercice_tmp.substr(9,2)} - ${dictionnaireDesExercices[exercice_tmp]["lieu"]} - Ex ${dictionnaireDesExercices[exercice_tmp]["numeroExercice"]}</a> ${liste_html_des_tags(dictionnaireDesExercices[exercice_tmp])} </br>\n`
			+'</td><td><i id='+id+' class="eye icon icone_preview"></i></td></tr>';
			}
		}
		//*********
    }

	liste_html_des_exercices ='<div class="ui accordion">'; 
    // Change l'ordre des exercices suivant l'URL
    if (window.location.href.indexOf("beta") > 0) {
		liste_html_des_exercices += div_niveau(obj_exercices_disponibles.be,"active","be");
		liste_html_des_exercices += `</div>`;
    } else if (window.location.href.indexOf("cm.html") > 0) {
		liste_affichage = ["C","c3",6,5,4,3,2,1,"T","PE"];
		liste_affichage_length = liste_affichage.length;
		for (i = 0; i<liste_affichage_length; i++) {
			if (liste_affichage[i] == "C") { //liste active
				liste_html_des_exercices += div_niveau(obj_exercices_disponibles[liste_affichage[i]],"active",liste_affichage[i]);
			} else {
				liste_html_des_exercices += div_niveau(obj_exercices_disponibles[liste_affichage[i]],"",liste_affichage[i]);
			}
		}
		liste_html_des_exercices += `</div>`;
    } else if (window.location.href.indexOf("outils") > 0) {
		liste_html_des_exercices += div_niveau(obj_exercices_disponibles.P0,"active","P0");
		liste_html_des_exercices += `</div>`;
    } else if (window.location.href.indexOf("dnb.html") > 0) {
		liste_html_des_exercices += div_niveau(obj_exercices_disponibles.DNB,"active","DNB");
		liste_html_des_exercices += div_niveau(obj_exercices_disponibles.DNBtheme,"active","DNBtheme");
		liste_html_des_exercices += `</div>`;
    }
    else {
		liste_affichage = ["c3",6,5,4,3,"DNB","DNBtheme",2,1,"T","PE","C"];
		liste_affichage_length = liste_affichage.length;
		for (i=0; i<liste_affichage_length; i++) {
			liste_html_des_exercices += div_niveau(obj_exercices_disponibles[liste_affichage[i]],"",liste_affichage[i]);
		}
      // Ajoute les outils prof sur mathalealatex
		if (window.location.href.indexOf("mathalealatex.html") > 0) {
			liste_html_des_exercices += div_niveau(obj_exercices_disponibles.P0,"","P0");
		}
      liste_html_des_exercices += `</div>`;
    }

	$("#liste_des_exercices").html(liste_html_des_exercices);
	
	//cg 04-2021 Génération du tableau des exercices.
	liste_html_des_exercicestab = `<div id="recherche"> </div><table id=\'listtab\' class="stripe"><thead>
		<tr><th class="colonnecode">Code</th><th>Intitulé de l\'exercice</th><th>prévisualiser</th></thead><tbody>
		${liste_html_des_exercicestab}
		</tbody><tfoot><tr><th class="colonnecode">Code</th><th>Intitulé de l\'exercice</th><th>prévisualiser</th></tr>
		</tfoot></table>`;
    $("#liste_des_exercices_tableau").html(liste_html_des_exercicestab);
	$("#liste_des_exercices_tableau").hide();
	$("#mode_choix_liste").hide(); 
	$(".popuptext").hide();
	
	//on active datatable.
	if (typeof $('#listtab').DataTable != 'undefined') { //pour les pages ne supportant pas le tableau.
		$('#listtab').DataTable({
			"language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.24/i18n/French.json"
            },
			initComplete : function() {
				$("#listtab_filter").detach().appendTo('#recherche');
			}
		});
	} else {
		$(".lien_id_exercice").off("click").on("click",function () {addExercice(event); });
	}
	
		
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

    // Gère le clic sur un exercice de la liste
    
	
	//Lorsqu'on change de page le tableau il faut ajouter le handler d'evenement sur la liste des exercices.
	$('#listtab').on( 'draw.dt', function () {
		apparence_exercice_actif();
		$(".lien_id_exercice").off("click").on("click",function () {addExercice(event); });
		$('.popup').trigger('click');
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
	} );
	
	function afficher_niveau() {
		var elem , evenement;
		if ($(event.target).hasClass('dropdown')) {
			elem = event.target.parentElement;
		} else {
			elem = event.target;
		}
		$('.fermer_niveau').trigger('click');
		$(elem).replaceWith(div_niveau(obj_exercices_disponibles[elem.id],"active",elem.id));
		$(elem).removeClass("ouvrir_niveau");
		$(elem).addClass("fermer_niveau");
		$(".fermer_niveau").off("click").on("click",function () {
			masquer_niveau();
		});
		// Actualise KaTeX pour les titres d'exercices utilisant LaTeX
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
		apparence_exercice_actif();
		$(".lien_id_exercice").off("click").on("click",function () {addExercice(event); });
		$(".popup").trigger('click');
	}
	
	function masquer_niveau() {
		$('.fermer_niveau').next().html("");
		$('.fermer_niveau').addClass("ouvrir_niveau");
		$('.fermer_niveau').removeClass("fermer_niveau");
		$(".ouvrir_niveau").off("click").on("click",function () {
			afficher_niveau();
		});
	}
	
	$(".ouvrir_niveau").off("click").on("click",function () {
		afficher_niveau();
	});
	$(".fermer_niveau").off("click").on("click",function () {
		masquer_niveau();
	});
	
	//Gestion d'affichage de l'un ou l'autre des modes.
	$("#mode_choix_liste").off("click").on("click",function () {
		$("#liste_des_exercices_tableau").hide();
		$("#liste_des_exercices").show();
		$("#mode_choix_liste").hide();
		$("#mode_choix_tableau").show();
		$("#replier").html('-');
	});
	$("#mode_choix_tableau").off("click").on("click",function () {
		$("#liste_des_exercices_tableau").show();
		$("#liste_des_exercices").hide();
		$("#mode_choix_liste").show();
		$("#mode_choix_tableau").hide();
		$("#replier").html('-');
	});
	$("#replier").off("click").on("click",function () {
		if ($("#liste_des_exercices").is(":visible") || $("#liste_des_exercices_tableau").is(":visible")) {
			$("#liste_des_exercices_tableau").hide();
			$("#liste_des_exercices").hide();
			$("#replier").html('+');
		} else if ($("#mode_choix_liste").is(":visible")) {
			$("#liste_des_exercices_tableau").show();
			$("#liste_des_exercices").hide();
			$("#replier").html('-');
		} else {
			$("#liste_des_exercices_tableau").hide();
			$("#liste_des_exercices").show();
			$("#replier").html('-');
		}
	});
}
	
export function menuTheme(theme) {
  let codeHTML = '<h2 class="ui horizontal divider header">Exercices en ligne à données aléatoires</h2>'
  codeHTML += '\n<div class="ui middle aligned animated selection divided list">'
  let dictionnaire = filtreDictionnaire(liste_des_exercices_disponibles,theme);
  for (let id in dictionnaire) {
    codeHTML +=
      `<a class="item" href="/exercice.html?ex=${id}" target="_blank">
      <img class="ui avatar image" src="/images/dice.png"> <div class="header content">${id} - ${dictionnaire[id].titre} </div>
    </a>`
  }
  codeHTML += '\n</div>'
  return codeHTML
  
}

export function menuThemeDNB(theme) {
  let codeHTML = `<h2 class="ui horizontal divider header">Exercices du brevet des collèges - ${theme}</h2>`;
  codeHTML += '\n<div class="ui middle aligned animated selection divided list">';
  
  let dictionnaire = filtreDictionnaireValeurTableauCle(dictionnaireDNB,"tags",theme);
  let tableauDesExercices = []
  for (let id in dictionnaire){
      tableauDesExercices.push(id)
  }
  // On créé un tableau "copie" du dictionnaire pour pouvoir le trier dans l'inverse de l'ordre alphabétique et faire ainsi apparaitre les exercices les plus récents
  tableauDesExercices = tableauDesExercices.sort().reverse()
  for (let id of tableauDesExercices) {
    codeHTML +=
      `<a style="line-height:2.5" class="item" href="/exercice.html?ex=${id}" target="_blank"><div class="header content"> ${dictionnaire[id]["annee"]} - ${dictionnaire[id]["lieu"]} - Ex ${dictionnaire[id]["numeroExercice"]} ${liste_html_des_tags(dictionnaire[id])} </div></a> \n`;
  }
  codeHTML += '\n</div>';
  return codeHTML
  
}


function listeTheme(theme) {
  let codeHTML = ''
  let dictionnaire = filtreDictionnaire(liste_des_exercices_disponibles,theme);
  for (let id in dictionnaire) {
    codeHTML +=
      `<a class="item" href="/exercice.html?ex=${id}" target="_blank">
      <img class="ui avatar image" src="/images/dice.png"> <div class="header content">${id} - ${dictionnaire[id].titre} </div>
    </a>`
  }
  return codeHTML 
}