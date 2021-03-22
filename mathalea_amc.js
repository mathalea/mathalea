import { creer_document_AMC, strRandom } from "./modules/outils.js";
import { getUrlVars } from "./modules/getUrlVars.js";
import {menuDesExercicesQCMDisponibles} from '/modules/menuDesExercicesQCMDisponibles.js'
import {dictionnaireDesExercicesQCM} from "./modules/dictionnaireDesExercicesAMC.js"

(function () {
 // IIFE principal
 mathalea.listeDesScriptsCharges = []
 let listeObjetsExercice = []; // Liste des objets listeObjetsExercices
 let liste_des_exercices = []; // Liste des identifiants des exercices
 let code_LaTeX = "";
 let liste_packages = new Set();
 let nb_exemplaires=1
 let nb_questions=[]
 let nom_fichier=''
 let type_entete=''

 menuDesExercicesQCMDisponibles();

    // Mise à jour du formulaire de la liste des exercices
    let form_choix_des_exercices = document.getElementById("choix_des_exercices");
    form_choix_des_exercices.addEventListener("change", function (e) {
        // Changement du texte
        if (e.target.value == "") {
            liste_des_exercices = [];
            listeObjetsExercice = [];
        } else {
            liste_des_exercices = [];
            listeObjetsExercice = [];
            liste_des_exercices = e.target.value.replace(/\s/g, "").replace(";", ",").split(","); // Récupère  la saisie de l'utilisateur
            //en supprimant les espaces et en remplaçant les points-virgules par des virgules.
        }
        mise_a_jour_de_la_liste_des_exercices();
    });

    function mise_a_jour_du_code() {
        window.MG32_tableau_de_figures = [];
        // Fixe la graine pour les fonctions aléatoires
        if (!mathalea.graine) {
            mathalea.graine = strRandom({
                includeUpperCase: true,
                includeNumbers: true,
                length: 4,
                startsWithLowerCase: false,
            });
            // Saisi le numéro de série dans le formulaire
            document.getElementById("form_serie").value = mathalea.graine;
        }
        // Contrôle l'aléatoire grâce à SeedRandom
        Math.seedrandom(mathalea.graine);
        // ajout des paramètres des exercices dans l'URL
        (function gestionURL() {
            if (liste_des_exercices.length > 0) {
                let fin_de_l_URL = "";
                 fin_de_l_URL += `?ex=${liste_des_exercices[0]}`
                if (typeof listeObjetsExercice[0].sup !== 'undefined') {
                    fin_de_l_URL += `,sup=${listeObjetsExercice[0].sup}`;
                }
                if (typeof listeObjetsExercice[0].sup2 !== 'undefined') {
                    fin_de_l_URL += `,sup2=${listeObjetsExercice[0].sup2}`;
                }
                if (typeof listeObjetsExercice[0].sup3 !== 'undefined') {
                    fin_de_l_URL += `,sup3=${listeObjetsExercice[0].sup3}`;
                }
                if (listeObjetsExercice[0].nb_questions_modifiable) {
                    fin_de_l_URL += `,nb_questions=${listeObjetsExercice[0].nb_questions}`;
                }
                for (let i = 1; i < liste_des_exercices.length; i++) {
                    fin_de_l_URL += `&ex=${liste_des_exercices[i]}`
                    if (typeof listeObjetsExercice[i].sup !== 'undefined') {
                        fin_de_l_URL += `,sup=${listeObjetsExercice[i].sup}`;
                    }
                    if (typeof listeObjetsExercice[i].sup2 !== 'undefined') {
                        fin_de_l_URL += `,sup2=${listeObjetsExercice[i].sup2}`;
                    }
                    if (typeof listeObjetsExercice[i].sup3 !== 'undefined') {
                        fin_de_l_URL += `,sup3=${listeObjetsExercice[i].sup3}`;
                    }
                    if (listeObjetsExercice[i].nb_questions_modifiable) {
                        fin_de_l_URL += `,nb_questions=${listeObjetsExercice[i].nb_questions}`;
                    }
                   }
                 fin_de_l_URL += `&serie=${mathalea.graine}`;
                window.history.pushState("", "", fin_de_l_URL);
                let url = window.location.href.split("&serie")[0]; //met l'URL dans le bouton de copie de l'URL sans garder le numéro de la série
                new Clipboard(".url", {
                    text: function () {
                        return url;
                    },
                });
            }
        })();

            // Sortie LaTeX quoi qu'il advienne !
            // code pour la sortie LaTeX
            let questions=[];

            code_LaTeX = "";
            liste_packages = new Set();
            if (liste_des_exercices.length > 0) {
                for (let i = 0; i < liste_des_exercices.length; i++) {
                    listeObjetsExercice[i].id = liste_des_exercices[i]; // Pour récupérer l'id qui a appelé l'exercice
                    listeObjetsExercice[i].nouvelle_version(i);
                    questions.push(listeObjetsExercice[i].QCM)

                    if (typeof listeObjetsExercice[i].liste_packages === "string") {
                        liste_packages.add(listeObjetsExercice[i].liste_packages);
                    } else {
                        // si c'est un tableau
                        listeObjetsExercice[i].liste_packages.forEach(liste_packages.add, liste_packages);
                    }
                }
                    code_LaTeX = creer_document_AMC({questions:questions,nb_questions:nb_questions,nb_exemplaires:nb_exemplaires,type_entete:type_entete}).replace(/<br><br>/g,'\n\n\\medskip\n').replace(/<br>/g,'\\\\\n')

                $("#message_liste_exercice_vide").hide();
                $("#cache").show();
         

                div.innerHTML = '<pre><code class="language-latex">' + code_LaTeX + "</code></pre>";
                Prism.highlightAllUnder(div); // Met à jour la coloration syntaxique
            } else {
                code_LaTeX = "";
                $("#message_liste_exercice_vide").show(); // Message au dessus de la liste des exercices
                $("#cache").hide(); // Cache au dessus du code LaTeX
                div.innerHTML = "";
            }

            // Gestion du téléchargement

            $("#btn_telechargement").off("click").on("click",function () {
                // Gestion du style pour l'entête du fichier

                let contenu_fichier = `
    
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    % Document généré avec MathALEA sous licence CC-BY-SA
    %
    % ${window.location.href}
    %
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    
    `;
    let  load =function(monFichier) {
        var request;
        
        if (window.XMLHttpRequest) { // Firefox
            request = new XMLHttpRequest();
        }
        else if (window.ActiveXObject) { // IE
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }
        else {
            return; // Non supporte
        }	
        
        request.open('GET', monFichier, false); // Synchro
        request.send(null);
        
        return request.responseText;
        }

    contenu_fichier+=code_LaTeX
    let monzip= new JSZip()
    if ($("#nom_du_fichier").val()!="") {
        nom_fichier=$("#nom_du_fichier").val() + ".tex"                               ;
    } else {
        nom_fichier= "mathalea.tex";
    }
    monzip.file(`${nom_fichier}`,code_LaTeX)
    monzip.file("automultiplechoice.sty",load("/fichiers/automultiplechoice.sty"))
    monzip.generateAsync({type:"blob"})
.then(function(content) {
    // see FileSaver.js
    saveAs(content, "Projet.zip");
});
         /*         if ($("#nom_du_fichier").val()) {
                    telechargeFichier(contenu_fichier, $("#nom_du_fichier").val() + ".tex");
                } else {
                    telechargeFichier(contenu_fichier, "mathalea.tex");
                }*/
            });

   
    }

    /**
     * Fonction à lancer une fois que la liste des exercices a été mise à jour.
     * Elle va importer les différents exercices depuis ./exercices/id.js et remplir listeObjetsExercice.
     * Une fois que tout est importé, elle créé les formulaires pour les paramètres des exercices.
     * Ensuite, elle regarde dans l'URL si il y a des paramètres à récupérer et à saisir dans le formulaire.
     * Enfin, elle délègue à mise_a_jour du code l'affichage
     *
     */
    function mise_a_jour_de_la_liste_des_exercices() {
        let besoinXCas = false
        mathalea.listeDesScriptsCharges = [];
        let promises = [];
        for (let i = 0, id; i < liste_des_exercices.length; i++) {
            id = liste_des_exercices[i];
            let url;
            try {
                url = dictionnaireDesExercicesQCM[id]["url"];
            } catch (error) {
                console.log(error);
                console.log(`Exercice ${id} non disponible`);
            }
            promises.push(
                import(url).catch((error) => {
 
    console.log(error)
                        listeObjetsExercice[i] = { titre: "Cet exercice n'existe pas", contenu: "", contenu_correction: "" }; // Un exercice vide pour l'exercice qui n'existe pas
                    })
                    .then((module) => {
                        if (module) {
                            listeObjetsExercice[i] = new module.default(); // Ajoute l'objet dans la liste des
                            listeObjetsExercice[i].ModeQCM=true
                            if (listeObjetsExercice[i].type_exercice == 'XCas') {
                                besoinXCas = true;
                            }
                        }
                    })
            );
        }
        Promise.all(promises)
            .then(() => {
                parametres_exercice(listeObjetsExercice);
            })
            .then(() => {
                                // Récupère les paramètres passés dans l'URL
                                let urlVars = getUrlVars();
                                //trier et mettre de côté les urlvars qui ne sont plus dans la liste des exercices
                                //	=> évite les erreurs lors de la suppression de question dans la liste.
                                for (var i = 0; i < urlVars.length; i++) {
                                    if (urlVars[i].id != liste_des_exercices[i]) {
                                        urlVars.splice(i,1);
                                    }	
                                }
                for (var i = 0; i < urlVars.length; i++) {
                    // récupère les éventuels paramètres dans l'URL
                    // et les recopie dans les formulaires des paramètres
                    if (urlVars[i]["nb_questions"] && listeObjetsExercice[i].nb_questions_modifiable) {
                        listeObjetsExercice[i].nb_questions = urlVars[i]["nb_questions"];
                        form_nb_questions[i].value = listeObjetsExercice[i].nb_questions;
                    }
                       if (typeof urlVars[i]["sup"] !== 'undefined') {
                        listeObjetsExercice[i].sup = urlVars[i]["sup"];
                        // Un exercice avec un this.sup mais pas de formulaire pouvait poser problème
                        try {
                            
                            form_sup[i].value = listeObjetsExercice[i].sup;
                        } catch {
                        }
                    }
                    if (typeof urlVars[i]["sup2"] !== 'undefined') {
                        listeObjetsExercice[i].sup2 = urlVars[i]["sup2"];
                        try {
                            form_sup2[i].value = listeObjetsExercice[i].sup2;
                        } catch (error) {
                        }
                    }
                    if (typeof urlVars[i]["sup3"] !== 'undefined') {
                        listeObjetsExercice[i].sup3 = urlVars[i]["sup3"];
                        try {
                            form_sup3[i].value = listeObjetsExercice[i].sup3;
                        } catch (error) {
                            
                        }
                    }
                    
                }
            })
            .then(() => {
                if (besoinXCas){
                    // On charge le javascript de XCas
                    document.getElementById("exercices").innerHTML = `<div class="profile-main-loader">
                    <div class="loader">
                      <svg class="circular-loader"viewBox="25 25 50 50" >
                        <circle class="loader-path" cx="50" cy="50" r="20" fill="none" stroke="#70c542" stroke-width="2" />
                      </svg>
                    </div>
                  </div>`
                    return loadScript("modules/giacsimple.js")

                }
            })
            .then(() => {
                if (besoinXCas) {
                    // On vérifie que le code WebAssembly est bien chargé en mémoire et disponible
                    return checkXCas();
                    }
            })
            .then(() => {
                mise_a_jour_du_code();
            });
    }

    const loadScript = src => {
        return new Promise((resolve, reject) => {
              if (mathalea.listeDesScriptsCharges.indexOf(src)<0){
                  const script = document.createElement('script')
                  script.type = 'text/javascript'
                  script.onload = resolve
                  script.onerror = reject
                  script.src = src
                  document.head.append(script)
                  mathalea.listeDesScriptsCharges.push(src)
              } else {
                  resolve()
              }
          })
          
    }
    const checkXCas = () => {
        return new Promise((resolve) => {
                const monInterval = setInterval(() => {
                    if (typeof(Module)!= 'undefined'){
                            if (Module.ready == true){
                                resolve();
                                clearInterval(monInterval);
                            }
                        }
                }, 500);
          })
    }

    // GESTION DE MG32
    /**
    * Récupère le code JS d'un exercice qui modifie les valeurs d'une figure MG32 et actualise la figure
    * @Auteur Rémi Angot
    */
   function  MG32_modifie_figure(numero_figure) {
    let code_pour_modifier_la_figure =  listeObjetsExercice[numero_figure].MG32code_pour_modifier_la_figure
    if (window.mtg32App.docs.length==1){
        code_pour_modifier_la_figure = code_pour_modifier_la_figure.replace("display","updateDisplay")
    }
    let modification = new Function ('numero_figure',code_pour_modifier_la_figure)
    modification(numero_figure);
    }

    // FIN DE GESTION DE MG32

    // Gestion des paramètres
    let div = document.getElementById("div_code_LaTeX"); // Récupère le div dans lequel le code va être affiché
    let div_parametres_generaux = document.getElementById("parametres_generaux"); // Récupère le div dans lequel seront inscrit les paramètres
    let form_nb_questions = [],
        form_sup = [],
        form_sup2 = [],
        form_sup3 = []; // Création de tableaux qui recevront les éléments HTML de chaque formulaires

    function parametres_exercice(exercice) {
        /* Pour l'exercice i, on rajoute un formulaire avec 5 inputs : 
        nombre de questions, nombre de colonnes,nombre de colonnes dans le corrigé,
        espacement et espacement dans le corrigé.
        Les réponses modifient les caractéristiques de l'exercice puis le code LaTeX est mis à jour
        */
        div_parametres_generaux.innerHTML = ""; // Vide le div parametres_generaux
        if (exercice.length > 0) {
            div_parametres_generaux.innerHTML += '<div class="ui hidden divider"></div>';

            div_parametres_generaux.innerHTML += `<div><label for="form_serie">Clé de la série d'exercice : </label> <input id="form_serie" type="text" style="padding: 5px;
  border: 1px solid #ccc;border-radius: 4px;"></div>`;
        }

        for (let i = 0; i < exercice.length; i++) {
            exercice[i].ModeQCM=true
                div_parametres_generaux.innerHTML += '<h4 class="ui dividing header">Exercice n°' + (i + 1) + " : " + exercice[i].titre + "</h4>";

                if (exercice[i].consigne_modifiable) {
                    div_parametres_generaux.innerHTML += '<div><label for="form_consigne' + i + '">Consigne : </label> <input id="form_consigne' + i + '" type="texte" size="20"></div>';
                }
                if (exercice[i].nb_questions_modifiable) {
                    div_parametres_generaux.innerHTML +=
                        '<div><label for="form_nb_questions' + i + '">Nombre de questions : </label> <input id="form_nb_questions' + i + '" type="number"  min="1" max="99"></div>';
                }
                if (exercice[i].correction_detaillee_disponible) {
                    div_parametres_generaux.innerHTML +=
                        '<div><label for="form_correction_detaillee' + i + '">Correction détaillée : </label> <input id="form_correction_detaillee' + i + '" type="checkbox" ></div>';
                }
                if (exercice[i].QCM_disponible) {
                    div_parametres_generaux.innerHTML +=
                        '<div><label for="form_ModeQCM' + i + '">Mode QCM : </label> <input id="form_ModeQCM' + i + '" type="checkbox" ></div>';
                }
                if (exercice[i].nb_cols_modifiable) {
                    div_parametres_generaux.innerHTML += '<div><label for="form_nb_cols' + i + '">Nombre de colonnes : </label><input id="form_nb_cols' + i + '" type="number" min="1" max="99"></div>';
                }
                if (exercice[i].nb_cols_corr_modifiable) {
                    div_parametres_generaux.innerHTML +=
                        '<div><label for="form_nb_cols_corr' + i + '">Nombre de colonnes dans la correction : </label><input id="form_nb_cols_corr' + i + '" type="number" min="1" max="99"></div>';
                }
                if (exercice[i].spacing_modifiable) {
                    div_parametres_generaux.innerHTML += '<div><label for="form_nb_cols_corr' + i + '">Espacement : </label><input id="form_spacing' + i + '" type="number" min="1" max="99"></div>';
                }
                if (exercice[i].spacing_corr_modifiable) {
                    div_parametres_generaux.innerHTML +=
                        '<div><label for="form_nb_cols_corr' + i + '">Espacement dans la correction : </label><input id="form_spacing_corr' + i + '" type="number" min="1" max="99"></div>';

                // Si le nombre de versions changent
                $("#nombre_de_versions").change(function () {
                    mise_a_jour_du_code();
                });
            }

            // Si un formulaire supplémentaire est défini dans l'exercice alors on l'ajoute
            if (exercice[i].besoin_formulaire_numerique || exercice[i].besoin_formulaire_texte) {
                // Ajout du titre pour les réglages supplémentaires
                div_parametres_generaux.innerHTML += "<h4 class='ui dividing header'></h4>";
            }

            if (exercice[i].besoin_formulaire_numerique) {
                // Création d'un formulaire numérique
                if (exercice[i].besoin_formulaire_numerique[2]) {
                    // Si un tooltip est défini
                    div_parametres_generaux.innerHTML +=
                        '<div data-tooltip="' +
                        exercice[i].besoin_formulaire_numerique[2] +
                        '"" data-inverted="" data-position="top left"><label for="form_sup' +
                        i +
                        '">' +
                        exercice[i].besoin_formulaire_numerique[0] +
                        ' : </label><input id="form_sup' +
                        i +
                        '" type="number"  min="1" max="' +
                        exercice[i].besoin_formulaire_numerique[1] +
                        '"></div>';
                } else {
                    div_parametres_generaux.innerHTML +=
                        '<div><label for="form_sup' +
                        i +
                        '">' +
                        exercice[i].besoin_formulaire_numerique[0] +
                        ' : </label><input id="form_sup' +
                        i +
                        '" type="number"  min="1" max="' +
                        exercice[i].besoin_formulaire_numerique[1] +
                        '"></div>';
                }
            }

            if (exercice[i].besoin_formulaire_texte) {
                // Création d'un formulaire texte
                div_parametres_generaux.innerHTML +=
                    "<div style='display: inline'><label for='form_sup" +
                    i +
                    "'>" +
                    exercice[i].besoin_formulaire_texte[0] +
                    " : </label>\
			<div style='display: inline' data-tooltip='" +
                    exercice[i].besoin_formulaire_texte[1] +
                    "' data-inverted=''><input id='form_sup" +
                    i +
                    "' type='text' size='20' ></div></div>";
            }

            if (exercice[i].besoin_formulaire_long_texte) {
                // Création d'un long formulaire de texte
                div_parametres_generaux.innerHTML +=
                    "<label for='form_sup" +
                    i +
                    "'>" +
                    exercice[i].besoin_formulaire_long_texte[0] +
                    " : </label>\
			<div style='display: inline' data-tooltip='" +
                    exercice[i].besoin_formulaire_long_texte[1] +
                    "' data-inverted=''><textarea id='form_sup" +
                    i +
                    "'></textarea></div>";
                div_parametres_generaux.innerHTML += `<div class="ui form">
			<div class="field">
			<label>Text</label>
			<textarea></textarea>
			</div>
			</div>`;
            }

            if (exercice[i].besoin_formulaire_case_a_cocher) {
                // Création d'un formulaire texte
                div_parametres_generaux.innerHTML +=
                    "<div style='display: inline'><label for='form_sup" +
                    i +
                    "'>" +
                    exercice[i].besoin_formulaire_case_a_cocher[0] +
                    " : </label>\
			<input id='form_sup" +
                    i +
                    "' type='checkbox'  ></div>";
            }

            if (exercice[i].besoin_formulaire2_case_a_cocher) {
                // Création d'un formulaire texte
                div_parametres_generaux.innerHTML +=
                    "<div style='display: inline'><label for='form_sup2" +
                    i +
                    "'>" +
                    exercice[i].besoin_formulaire2_case_a_cocher[0] +
                    " : </label>\
			<input id='form_sup2" +
                    i +
                    "' type='checkbox'  ></div>";
            }

            if (exercice[i].besoin_formulaire2_numerique) {
                // Création d'un formulaire numérique
                if (exercice[i].besoin_formulaire2_numerique[2]) {
                    // Si un tooltip est défini
                    div_parametres_generaux.innerHTML +=
                        '<div data-tooltip="' +
                        exercice[i].besoin_formulaire2_numerique[2] +
                        '"" data-inverted="" data-position="top left"><label for="form_sup2' +
                        i +
                        '">' +
                        exercice[i].besoin_formulaire2_numerique[0] +
                        ' : </label><input id="form_sup2' +
                        i +
                        '" type="number"  min="1" max="' +
                        exercice[i].besoin_formulaire2_numerique[1] +
                        '"></div>';
                } else {
                    div_parametres_generaux.innerHTML +=
                        '<div><label for="form_sup2' +
                        i +
                        '">' +
                        exercice[i].besoin_formulaire2_numerique[0] +
                        ' : </label><input id="form_sup2' +
                        i +
                        '" type="number"  min="1" max="' +
                        exercice[i].besoin_formulaire2_numerique[1] +
                        '"></div>';
                }
            }

            if (exercice[i].besoin_formulaire2_texte) {
                // Création d'un formulaire texte
                div_parametres_generaux.innerHTML +=
                    "<p></p><div style='display: inline'><label for='form_sup2" +
                    i +
                    "'>" +
                    exercice[i].besoin_formulaire2_texte[0] +
                    " : </label>\
			<div style='display: inline' data-tooltip='" +
                    exercice[i].besoin_formulaire2_texte[1] +
                    "' data-inverted=''><input id='form_sup2" +
                    i +
                    "' type='text' size='20' ></div></div>";
            }

            if (exercice[i].besoin_formulaire3_case_a_cocher) {
                // Création d'un formulaire texte
                div_parametres_generaux.innerHTML +=
                    "<div style='display: inline'><label for='form_sup3" +
                    i +
                    "'>" +
                    exercice[i].besoin_formulaire3_case_a_cocher[0] +
                    " : </label>\
			<input id='form_sup3" +
                    i +
                    "' type='checkbox'  ></div>";
            }

            if (exercice[i].besoin_formulaire3_numerique) {
                // Création d'un formulaire numérique
                if (exercice[i].besoin_formulaire3_numerique[2]) {
                    // Si un tooltip est défini
                    div_parametres_generaux.innerHTML +=
                        '<div data-tooltip="' +
                        exercice[i].besoin_formulaire3_numerique[2] +
                        '"" data-inverted="" data-position="top left"><label for="form_sup3' +
                        i +
                        '">' +
                        exercice[i].besoin_formulaire3_numerique[0] +
                        ' : </label><input id="form_sup3' +
                        i +
                        '" type="number"  min="1" max="' +
                        exercice[i].besoin_formulaire3_numerique[1] +
                        '"></div>';
                } else {
                    div_parametres_generaux.innerHTML +=
                        '<div><label for="form_sup3' +
                        i +
                        '">' +
                        exercice[i].besoin_formulaire3_numerique[0] +
                        ' : </label><input id="form_sup3' +
                        i +
                        '" type="number"  min="1" max="' +
                        exercice[i].besoin_formulaire3_numerique[1] +
                        '"></div>';
                }
            }

            if (exercice[i].besoin_formulaire3_texte) {
                // Création d'un formulaire texte
                div_parametres_generaux.innerHTML +=
                    "<p></p><div style='display: inline'><label for='form_sup3" +
                    i +
                    "'>" +
                    exercice[i].besoin_formulaire3_texte[0] +
                    " : </label>\
			<div style='display: inline' data-tooltip='" +
                    exercice[i].besoin_formulaire3_texte[1] +
                    "' data-inverted=''><input id='form_sup3" +
                    i +
                    "' type='text' size='20' ></div></div>";
            }
        }

        for (let i = 0; i < exercice.length; i++) {

            // Gestion du nombre de questions
            if (exercice[i].nb_questions_modifiable) {
                form_nb_questions[i] = document.getElementById("form_nb_questions" + i);
                form_nb_questions[i].value = exercice[i].nb_questions; // Rempli le formulaire avec le nombre de questions
                form_nb_questions[i].addEventListener("change", function (e) {
                    // Dès que le nombre change, on met à jour
                    exercice[i].nb_questions = e.target.value;
                    mise_a_jour_du_code();
                });
            }

         // Gestion du mode QCM
        // exercice[i].ModeQCM=true
        //mise_a_jour_du_code();

         // Gestion de l'identifiant de la série
            if (exercice.length > 0) {
                let form_serie = document.getElementById("form_serie");
                form_serie.value = mathalea.graine; // Rempli le formulaire avec la graine
                form_serie.addEventListener("change", function (e) {
                    // Dès que le statut change, on met à jour
                    mathalea.graine = e.target.value;
                    mise_a_jour_du_code();
                });
            }

            // Gestion des paramètres supplémentaires s'ils existent

            if (exercice[i].besoin_formulaire_texte) {
                form_sup[i] = document.getElementById("form_sup" + i);
                form_sup[i].addEventListener("keydown", function (e) {
                    // Appui sur la touche entrée
                    if (e.keyCode == 13) {
                        exercice[i].sup = e.target.value; // Récupère  la saisie de l'utilisateur
                        mise_a_jour_du_code();
                    }
                });

                form_sup[i].addEventListener("blur", function (e) {
                    // Perte du focus
                    exercice[i].sup = e.target.value;
                    mise_a_jour_du_code();
                });
            }

            if (exercice[i].besoin_formulaire_long_texte) {
                form_sup[i] = document.getElementById("form_sup" + i);
                form_sup[i].addEventListener("keydown", function (e) {
                    // Appui sur la touche entrée
                    if (e.keyCode == 13) {
                        exercice[i].sup = e.target.value; // Récupère  la saisie de l'utilisateur
                        mise_a_jour_du_code();
                    }
                });

                form_sup[i].addEventListener("blur", function (e) {
                    // Perte du focus
                    exercice[i].sup = e.target.value;
                    mise_a_jour_du_code();
                });
            }

            if (exercice[i].besoin_formulaire_numerique) {
                form_sup[i] = document.getElementById("form_sup" + i);
                form_sup[i].value = exercice[i].sup; // Rempli le formulaire avec le paramètre supplémentaire
                form_sup[i].addEventListener("change", function (e) {
                    // Dès que le nombre change, on met à jour
                    exercice[i].sup = e.target.value;
                    mise_a_jour_du_code();
                });
            }

            if (exercice[i].besoin_formulaire_case_a_cocher) {
                form_sup[i] = document.getElementById("form_sup" + i);
                form_sup[i].checked = exercice[i].sup; // Rempli le formulaire avec le paramètre supplémentaire
                form_sup[i].addEventListener("change", function (e) {
                    //
                    exercice[i].sup = e.target.checked;
                    mise_a_jour_du_code();
                });
            }

            if (exercice[i].besoin_formulaire2_case_a_cocher) {
                form_sup2[i] = document.getElementById("form_sup2" + i);
                form_sup2[i].checked = exercice[i].sup2; // Rempli le formulaire avec le paramètre supplémentaire
                form_sup2[i].addEventListener("change", function (e) {
                    //
                    exercice[i].sup2 = e.target.checked;
                    mise_a_jour_du_code();
                });
            }

            if (exercice[i].besoin_formulaire2_numerique) {
                form_sup2[i] = document.getElementById("form_sup2" + i);
                form_sup2[i].value = exercice[i].sup2; // Rempli le formulaire avec le paramètre supplémentaire
                form_sup2[i].addEventListener("change", function (e) {
                    // Dès que le nombre change, on met à jour
                    exercice[i].sup2 = e.target.value;
                    mise_a_jour_du_code();
                });
            }

            if (exercice[i].besoin_formulaire2_texte) {
                form_sup2[i] = document.getElementById("form_sup2" + i);
                form_sup2[i].addEventListener("keydown", function (e) {
                    // Appui sur la touche entrée
                    if (e.keyCode == 13) {
                        exercice[i].sup2 = e.target.value; // Récupère  la saisie de l'utilisateur
                        mise_a_jour_du_code();
                    }
                });

                form_sup2[i].addEventListener("blur", function (e) {
                    // Perte du focus
                    exercice[i].sup2 = e.target.value;
                    mise_a_jour_du_code();
                });
            }

            if (exercice[i].besoin_formulaire3_case_a_cocher) {
                form_sup3[i] = document.getElementById("form_sup3" + i);
                form_sup3[i].checked = exercice[i].sup3; // Rempli le formulaire avec le paramètre supplémentaire
                form_sup3[i].addEventListener("change", function (e) {
                    //
                    exercice[i].sup3 = e.target.checked;
                    mise_a_jour_du_code();
                });
            }

            if (exercice[i].besoin_formulaire3_numerique) {
                form_sup3[i] = document.getElementById("form_sup3" + i);
                form_sup3[i].value = exercice[i].sup3; // Rempli le formulaire avec le paramètre supplémentaire
                form_sup3[i].addEventListener("change", function (e) {
                    // Dès que le nombre change, on met à jour
                    exercice[i].sup3 = e.target.value;
                    mise_a_jour_du_code();
                });
            }

            if (exercice[i].besoin_formulaire3_texte) {
                form_sup3[i] = document.getElementById("form_sup3" + i);
                form_sup3[i].addEventListener("keydown", function (e) {
                    // Appui sur la touche entrée
                    if (e.keyCode == 13) {
                        exercice[i].sup3 = e.target.value; // Récupère  la saisie de l'utilisateur
                        mise_a_jour_du_code();
                    }
                });

                form_sup3[i].addEventListener("blur", function (e) {
                    // Perte du focus
                    exercice[i].sup3 = e.target.value;
                    mise_a_jour_du_code();
                });
            }
        }
    }

    // Initialisation de la page
    window.addEventListener("DOMContentLoaded", () => {
        $(".ui.dropdown").dropdown(); // Pour le menu des exercices
        $(".ui.accordion").accordion("refresh");
        $(".ui.checkbox").checkbox();
        // Gestion du bouton de copie
        $(".ui.button.toggle").state(); // initialise le bouton

        // Gestion du bouton « Nouvelles données »
        let btn_mise_a_jour_code = document.getElementById("btn_mise_a_jour_code");
        if (btn_mise_a_jour_code){
            btn_mise_a_jour_code.addEventListener("click", nouvelles_donnees);
        }
        function nouvelles_donnees() {
            mathalea.graine = strRandom({
                includeUpperCase: true,
                includeNumbers: true,
                length: 4,
                startsWithLowerCase: false,
            });
            form_serie.value = mathalea.graine; // mise à jour du formulaire
            mise_a_jour_du_code();
        }
                    // Gestion du nombre d'exemplaire
      
        let form_nb_exemplaires = document.getElementById("nombre_d_exemplaires");
        form_nb_exemplaires.value = 1; // Rempli le formulaire avec le nombre de questions
        form_nb_exemplaires.addEventListener("change", function (e) {
            // Dès que le nombre change, on met à jour
            nb_exemplaires = e.target.value;
            mise_a_jour_du_code();
        });
// Gestion des paramètres du fichier LaTeX
        // gestion de l'entête
        let form_entete=document.getElementById("options_type_entete");
        
        form_entete.addEventListener("change",function (e) {
        type_entete=e.target.value;
         });
         //gestion du nombre de questions par groupe
         let form_nb_questions=document.getElementById("nb_questions_par_groupe");
        
         form_nb_questions.addEventListener("change",function (e) {
             let saisie=e.target.value;
         nb_questions=saisie.split(',');
          });         

        $("#btn_overleaf").click(function () {
            // Gestion du style pour l'entête du fichier

            let contenu_fichier = `

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Document généré avec MathALEA sous licence CC-BY-SA
%
% ${window.location.href}
%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


`;
            contenu_fichier +=  code_LaTeX ;

            // Gestion du LaTeX statique

            // Envoi à Overleaf.com en modifiant la valeur dans le formulaire

            $("input[name=encoded_snip]").val(encodeURIComponent(contenu_fichier));
            if ($("#nom_du_fichier").val()) {
                $("input[name=snip_name]").val($("#nom_du_fichier").val()); //nomme le projet sur Overleaf
            }
        });
        // Récupère la graine pour l'aléatoire dans l'URL
        let params = new URL(document.location).searchParams;
        let serie = params.get("serie");
        if (serie) {
            mathalea.graine = serie;
        }
        let urlVars = getUrlVars();
        if (urlVars.length > 0) {
            for (let i = 0; i < urlVars.length; i++) {
                liste_des_exercices.push(urlVars[i]["id"]);
            }
            form_choix_des_exercices.value = liste_des_exercices.join(",");
            mise_a_jour_de_la_liste_des_exercices();
        }
    });
})();
