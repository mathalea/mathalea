import { strRandom, telechargeFichier, intro_LaTeX, intro_LaTeX_coop, scratchTraductionFr, modal_youtube } from "./modules/outils.js";
import { getUrlVars } from "./modules/getUrlVars.js";
import { menuDesExercicesDisponibles, dictionnaireDesExercices } from "./modules/menuDesExercicesDisponibles.js";

(function () {

    // IIFE principal
    mathalea.listeDesScriptsCharges = []
    let listeObjetsExercice = []; // Liste des objets listeObjetsExercices
    let liste_des_exercices = []; // Liste des identifiants des exercices
    let code_LaTeX = "";
    let liste_packages = new Set();
    // création des figures MG32 (géométrie dynamique)	

    menuDesExercicesDisponibles();

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
                if (sortie_html && !est_diaporama && window.location.pathname.indexOf('exo.html')<0) {
                    fin_de_l_URL += "exercice.html";
                }
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
                if (listeObjetsExercice[0].video.length>1) {
                    fin_de_l_URL += `,video=${listeObjetsExercice[0].video}`;
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
                    if (listeObjetsExercice[i].video.length>1) {
                        fin_de_l_URL += `,video=${listeObjetsExercice[i].video}`;
                     }
                }
                if (typeof mathalea.duree !== 'undefined'){
                    fin_de_l_URL +=`&duree=${mathalea.duree}`
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
        if (sortie_html && est_diaporama) {
            if (liste_des_exercices.length>0) { // Pour les diaporamas tout cacher quand un exercice est choisi
                $("#liste_des_exercices").hide();
                $("#parametres_generaux").show();
            } else {
                $("#liste_des_exercices").show();
                $("h3").show();
                $("#formulaire_choix_de_la_duree").show();
        
            }
            document.getElementById("exercices").innerHTML = "";
            document.getElementById("corrections").innerHTML = "";
            let contenuDesExercices = "",
                contenuDesCorrections = "";
            if (liste_des_exercices.length > 0) {
                for (let i = 0; i < liste_des_exercices.length; i++) {
                    listeObjetsExercice[i].id = liste_des_exercices[i];
                    try {
                        listeObjetsExercice[i].nouvelle_version(i);
                    } catch (error) {
                        console.log(error);
                    }

                    contenuDesExercices +=`<section class="slider single-item" id="diaporama">`
                    for(let question of listeObjetsExercice[i].liste_questions){
                        contenuDesExercices += `\n<div id="question_diap" style="font-size:${listeObjetsExercice[i].tailleDiaporama}px"><span>` + question.replace(/\\dotfill/g,'...').replace(/\\\\/g,'<br>').replace(/\\not=/g,'≠').replace(/\\ldots/g,'....') + '</span></div>'   // .replace(/~/g,' ') pour enlever les ~ mais je voulais les garder dans les formules LaTeX donc abandonné
                    }
                    contenuDesExercices += '<div id="question_diap" style="font-size:100px"><span>$\\text{Terminé !}$</span></div></section>'
                    if (listeObjetsExercice[i].type_exercice == "MG32") {    
                        contenuDesExercices += `<div id="MG32div${i}" class="MG32"></div>`;
                    }
                    contenuDesCorrections += listeObjetsExercice[i].contenu_correction;
                    if (listeObjetsExercice[i].type_exercice == "MG32" && listeObjetsExercice[i].MG32codeBase64corr) {
                        contenuDesCorrections += `<div id="MG32divcorr${i}" class="MG32"></div>`;
                    }
                }
                contenuDesCorrections = `<ol>\n${contenuDesCorrections}\n</ol>`;
                $("#message_liste_exercice_vide").hide();
                $("#cache").dimmer("hide");
            } else {
                $("#message_liste_exercice_vide").show(); // Message au dessus de la liste des exercices
                $("#cache").dimmer("show"); // Cache au dessus du code LaTeX
            }

            document.getElementById("exercices").innerHTML = contenuDesExercices;
            document.getElementById("corrections").innerHTML = contenuDesCorrections;
            // KaTeX
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
            let besoinMG32 = false;
              let besoinScratch = false;
              for (let i = 0; i < liste_des_exercices.length; i++) {
                if (listeObjetsExercice[i].type_exercice == "MG32") {
                 besoinMG32 = true
                }
                if (listeObjetsExercice[i].type_exercice == "Scratch") {
                 besoinScratch = true
                }
              }
              if (besoinMG32){
                loadScript("https://www.mathgraph32.org/js/mtgLoad/mtgLoad.min.js")
                .then(()=>{
                    //Ajoute figures MG32
                    for (let i = 0; i < liste_des_exercices.length; i++) {
                        if (listeObjetsExercice[i].type_exercice == "MG32") {
                          MG32_ajouter_figure(i);
                        }
                      }
                      MG32_tracer_toutes_les_figures();
                })
              }

              if (besoinScratch){
                  loadScript("include/scratchblocks-v3.5-min.js")
                  .then(()=>{
                    scratchTraductionFr();
                    scratchblocks.renderMatching("pre.blocks", {
                        style: "scratch3",
                        languages: ["fr"],
                    });
                    scratchblocks.renderMatching("code.b", {
                        inline: true,
                        style: "scratch3",
                        languages: ["fr"],
                    });
                    mathalea.listeDesScriptsCharges.push('Scratch')
                  })
              }
        }


        // Ajoute le contenu dans les div #exercices et #corrections
        if (sortie_html && !est_diaporama) {
            document.getElementById("exercices").innerHTML = "";
            document.getElementById("corrections").innerHTML = "";

            let contenuDesExercices = "",
                contenuDesCorrections = "";
            if (liste_des_exercices.length > 0) {
                for (let i = 0; i < liste_des_exercices.length; i++) {
                    listeObjetsExercice[i].id = liste_des_exercices[i];
                    try {
                        listeObjetsExercice[i].nouvelle_version(i);
                    } catch (error) {
                        console.log(error);
                    }
                    contenuDesExercices += `<h3 class="ui dividing header">Exercice ${i + 1} − ${listeObjetsExercice[i].id}</h3>`;
                    if (listeObjetsExercice[i].video.length>3) {
                        contenuDesExercices += `<div id=video${i}>` +modal_youtube(i,listeObjetsExercice[i].video,'',"Aide","youtube") + `</div>`;
                    }
                    if (listeObjetsExercice[i].bouton_aide) {
                        contenuDesExercices += `<div id=aide${i}> ${listeObjetsExercice[i].bouton_aide}</div>`;
                    }
                    contenuDesExercices += listeObjetsExercice[i].contenu;
                    if (listeObjetsExercice[i].type_exercice == "MG32") {
                        contenuDesExercices += `<div id="MG32div${i}" class="MG32"></div>`;
                    }
                    contenuDesCorrections += `<h3 class="ui dividing header">Exercice ${i + 1}</h3>`;
                    contenuDesCorrections += listeObjetsExercice[i].contenu_correction;
                    if (listeObjetsExercice[i].type_exercice == "MG32" && listeObjetsExercice[i].MG32codeBase64corr) {
                        contenuDesCorrections += `<div id="MG32divcorr${i}" class="MG32"></div>`;
                    }
                }
                contenuDesExercices = `<ol>\n${contenuDesExercices}\n</ol>`;
                contenuDesCorrections = `<ol>\n${contenuDesCorrections}\n</ol>`;
                $("#message_liste_exercice_vide").hide();
                $("#cache").dimmer("hide");
            } else {
                $("#message_liste_exercice_vide").show(); // Message au dessus de la liste des exercices
                $("#cache").dimmer("show"); // Cache au dessus du code LaTeX
            }

            document.getElementById("exercices").innerHTML = contenuDesExercices;
            document.getElementById("corrections").innerHTML = contenuDesCorrections;
            // KaTeX
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
              $(".katexPopup").popup({
                popup: ".special.popup",
                on: "hover",
                variation: "inverted",
                inline: true,
              });
              
              let besoinMG32 = false;
              let besoinScratch = false;
              for (let i = 0; i < liste_des_exercices.length; i++) {
                if (listeObjetsExercice[i].type_exercice == "MG32") {
                 besoinMG32 = true
                }
                if (listeObjetsExercice[i].type_exercice == "Scratch") {
                 besoinScratch = true
                }
              }
              if (besoinMG32){
                loadScript("https://www.mathgraph32.org/js/mtgLoad/mtgLoad.min.js")
                .then(()=>{
                    //Ajoute figures MG32
                    for (let i = 0; i < liste_des_exercices.length; i++) {
                        if (listeObjetsExercice[i].type_exercice == "MG32") {
                          MG32_ajouter_figure(i);
                        }
                      }
                      MG32_tracer_toutes_les_figures();
                })
              }

              if (besoinScratch){
                  loadScript("include/scratchblocks-v3.5-min.js")
                  .then(()=>{
                    scratchTraductionFr();
                    scratchblocks.renderMatching("pre.blocks", {
                        style: "scratch3",
                        languages: ["fr"],
                    });
                    scratchblocks.renderMatching("code.b", {
                        inline: true,
                        style: "scratch3",
                        languages: ["fr"],
                    });
                    mathalea.listeDesScriptsCharges.push('Scratch')
                  })
              }
        } 
        if (!sortie_html) {
            // Sortie LaTeX
            // code pour la sortie LaTeX
            let codeEnonces = "",
                codeCorrections = "";
            code_LaTeX = "";
            liste_packages = new Set();
            if (liste_des_exercices.length > 0) {
                for (let i = 0; i < liste_des_exercices.length; i++) {
                    listeObjetsExercice[i].id = liste_des_exercices[i]; // Pour récupérer l'id qui a appelé l'exercice
                    listeObjetsExercice[i].nouvelle_version();
                    if (listeObjetsExercice[i].titre == "Fichier statique") {
                        liste_des_exercices_statiques.push(listeObjetsExercice[i].sup);
                    }
                    codeEnonces += listeObjetsExercice[i].contenu;
                    codeEnonces += "\n\n";
                    codeCorrections += listeObjetsExercice[i].contenu_correction;
                    codeCorrections += "\n\n";
                    if (typeof listeObjetsExercice[i].liste_packages === "string") {
                        liste_packages.add(listeObjetsExercice[i].liste_packages);
                    } else {
                        // si c'est un tableau
                        listeObjetsExercice[i].liste_packages.forEach(liste_packages.add, liste_packages);
                    }
                }

                if ($("#supprimer_correction:checked").val()) {
                    code_LaTeX = codeEnonces;
                } else {
                    code_LaTeX =
                        codeEnonces + "\n\n%%%%%%%%%%%%%%%%%%%%%%\n%%%   CORRECTION   %%%\n%%%%%%%%%%%%%%%%%%%%%%\n\n\\newpage\n\\begin{correction}\n\n" + codeCorrections + "\\end{correction}";
                }
                $("#message_liste_exercice_vide").hide();
                $("#cache").show();

                // Gestion du nombre de versions
                if ($("#nombre_de_versions").val() > 1) {
                    code_LaTeX = "";
                    let code_exercices = "",
                        code_correction = "";
                    for (let v = 0; v < $("#nombre_de_versions").val(); v++) {
                        code_exercices += "\\version{" + (v + 1) + "}\n\n";
                        code_correction += "\n\n\\newpage\n\\version{" + (v + 1) + "}\n\\begin{correction}";
                        for (let i = 0; i < liste_des_exercices.length; i++) {
                            listeObjetsExercice[i].nouvelle_version();
                            code_exercices += listeObjetsExercice[i].contenu;
                            code_exercices += "\n\n";
                            code_correction += listeObjetsExercice[i].contenu_correction;
                            code_correction += "\n\n";
                        }
                        if (v < $("#nombre_de_versions").val() - 1) {
                            if ($("#style_classique:checked").val()) {
                                code_exercices += "\n\\newpage\n\\setcounter{exo}{0}\n";
                            } else {
                                code_exercices += "\n\\newpage\n\\setcounter{section}{0}\n";
                            }
                        }
                        code_correction += "\n\\end{correction}";
                    }
                    code_LaTeX = code_exercices + code_correction;
                }
                // for (let i = 0; i < liste_des_exercices_statiques.length; i++) {
                // 	ajout_de_LaTeX_statique(liste_des_exercices_statiques[i])
                // }

                div.innerHTML = '<pre><code class="language-latex">' + code_LaTeX + "</code></pre>";
                Prism.highlightAllUnder(div); // Met à jour la coloration syntaxique
            } else {
                code_LaTeX = "";
                $("#message_liste_exercice_vide").show(); // Message au dessus de la liste des exercices
                $("#cache").hide(); // Cache au dessus du code LaTeX
                div.innerHTML = "";
            }
        }

        if (!sortie_html) {
            // Gestion du téléchargement

            $("#btn_telechargement").click(function () {
                // Gestion du style pour l'entête du fichier

                let contenu_fichier = `
    
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    % Document généré avec MathALEA sous licence CC-BY-SA
    %
    % ${window.location.href}
    %
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    
    `;

                if ($("#style_classique:checked").val()) {
                    if ($("#entete_du_fichier").val() == "") {
                        $("#entete_du_fichier").val("Exercices");
                    }
                    contenu_fichier += `\\documentclass[a4paper,11pt,fleqn]{article}\n`;
                    contenu_fichier += `\\input{preambule}\n\\pagestyle{fancy}\n\\renewcommand{\\headrulewidth}{1pt}\n\\fancyhead[C]{${$("#entete_du_fichier").val()}}\n\\fancyhead[L]{}`;
                    contenu_fichier += `\\fancyhead[R]{}\n\\renewcommand{\\footrulewidth}{1pt}\n\\fancyfoot[C]{}\n\\fancyfoot[L]{}\n\\fancyfoot[R]{}\n\n`;
                    contenu_fichier += `\\begin{document}\n\n` + code_LaTeX + `\n\n\\end{document}`;
                } else {
                    contenu_fichier += "\\documentclass[a4paper,11pt,fleqn]{article}\n\\input{preambule_coop}\n";
                    contenu_fichier += "\\theme{" + $("input[name=theme]:checked").val() + "}{" + $("#entete_du_fichier").val() + "}";
                    contenu_fichier += "{" + $("#items").val() + "}{" + $("#domaine").val() + "}\n\\begin{document}\n\n" + code_LaTeX;
                    contenu_fichier += "\n\n\\end{document}";
                }

                if ($("#nom_du_fichier").val()) {
                    telechargeFichier(contenu_fichier, $("#nom_du_fichier").val() + ".tex");
                } else {
                    telechargeFichier(contenu_fichier, "mathalea.tex");
                }
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

                if ($("#style_classique:checked").val()) {
                    contenu_fichier += intro_LaTeX($("#entete_du_fichier").val(), liste_packages) + code_LaTeX + "\n\n\\end{document}";
                } else {
                    contenu_fichier += intro_LaTeX_coop(liste_packages);
                    contenu_fichier += "\n\n\\theme{" + $("input[name=theme]:checked").val() + "}{" + $("#entete_du_fichier").val() + "}";
                    contenu_fichier += "{" + $("#items").val() + "}{" + $("#domaine").val() + "}\n\\begin{document}\n\n" + code_LaTeX;
                    contenu_fichier += "\n\n\\end{document}";
                }

                // Gestion du LaTeX statique

                // Envoi à Overleaf.com en modifiant la valeur dans le formulaire

                $("input[name=encoded_snip]").val(encodeURIComponent(contenu_fichier));
                if ($("#nom_du_fichier").val()) {
                    $("input[name=snip_name]").val($("#nom_du_fichier").val()); //nomme le projet sur Overleaf
                }
            });

            // Gestion des paramètres du fichier LaTeX

            $("#options_style_CoopMaths").show(); // par défaut le style coop
            $("a.lien_images").show();
            $(function () {
                $("input:radio[name='style']").change(function () {
                    if ($("#style_classique:checked").val()) {
                        $("#options_style_CoopMaths").hide();
                        $("a.lien_preambule").attr("href", "fichiers/preambule.tex");
                        $("a.lien_images").hide();
                    } else {
                        $("a.lien_images").show();
                        $("#options_style_CoopMaths").show();
                        $("a.lien_preambule").attr("href", "fichiers/preambule_coop.tex");
                    }
                });
            });
        }
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
        mathalea.listeDesScriptsCharges = [];
        let promises = [];
        for (let i = 0, id; i < liste_des_exercices.length; i++) {
            id = liste_des_exercices[i];
            let url;
            try {
                url = dictionnaireDesExercices[id]["url"];
            } catch (error) {
                console.log(error);
                console.log(`Exercice ${id} non disponible`);
            }
            promises.push(
                import(url)
                .catch((error) => {
                    console.log(error)
                        listeObjetsExercice[i] = { titre: "Cet exercice n'existe pas", contenu: "", contenu_correction: "" }; // Un exercice vide pour l'exercice qui n'existe pas
                    })
                    .then((module) => {
                        if (module) {
                            listeObjetsExercice[i] = new module.default(); // Ajoute l'objet dans la liste des
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
                for (var i = 0; i < urlVars.length; i++) {
                    // récupère les éventuels paramètres dans l'URL
                    // et les recopie dans les formulaires des paramètres
                    if (urlVars[i]["nb_questions"] && listeObjetsExercice[i].nb_questions_modifiable) {
                        listeObjetsExercice[i].nb_questions = urlVars[i]["nb_questions"];
                        form_nb_questions[i].value = listeObjetsExercice[i].nb_questions;
                    }
                    if (urlVars[i]["video"] && sortie_html && !est_diaporama) {
                        listeObjetsExercice[i].video = urlVars[i]["video"];
                        form_video[i].value = listeObjetsExercice[i].video;
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

    /**
    * Actualise toutes les figures MG32 avec les nouvelles valeurs
    * @Auteur Rémi Angot
    */
    function  MG32_modifie_toutes_les_figures() {
    for (let i = 0; i < liste_des_exercices.length; i++) {
        if ( listeObjetsExercice[i].type_exercice=='MG32'){
            MG32_modifie_figure(i)
        }
    }
    }

    /**
    * Ajoute une figure MG32 dans le code HTML de la page
    * @Auteur Rémi Angot
    */
    function  MG32_ajouter_figure(numero_de_l_exercice) {
    if (window.mtg32App) {
        for (var i = 0; i < mtg32App.docs.length; i++) {
            mtg32App.removeDoc(mtg32App.docs[i].idDoc)
        }	
    }
    MG32_tableau_de_figures.push(
    // pour chaque figure on précise ici ses options
    {
    idContainer: `MG32div${numero_de_l_exercice}`,
    svgOptions: {
        width: `${ listeObjetsExercice[numero_de_l_exercice].taille_div_MG32[0]}`, 
        height: `${ listeObjetsExercice[numero_de_l_exercice].taille_div_MG32[1]}`, 
        idSvg: `MG32svg${numero_de_l_exercice}`
    },
    mtgOptions: {
            fig:  listeObjetsExercice[numero_de_l_exercice].MG32codeBase64,
            isEditable:  listeObjetsExercice[numero_de_l_exercice].MG32editable
        }
    }
    )	

    if ( listeObjetsExercice[numero_de_l_exercice].MG32codeBase64corr) {
        MG32_tableau_de_figures.push(
    // pour chaque figure on précise ici ses options
    {
    idContainer: `MG32divcorr${numero_de_l_exercice}`,
    svgOptions: {
        width: `${ listeObjetsExercice[numero_de_l_exercice].taille_div_MG32[0]}`, 
        height: `${ listeObjetsExercice[numero_de_l_exercice].taille_div_MG32[1]}`, 
        idSvg: `MG32svgcorr${numero_de_l_exercice}`
    },
    mtgOptions: {
        fig:  listeObjetsExercice[numero_de_l_exercice].MG32codeBase64corr,
        isEditable: false
    }
    }
    )		
    }
    }

    /**
    * Pour chaque figure on récupère une promesse de chargement, 
    * on lance tout en parallèle, 
    * et quand toutes seront résolues on continue
    * @Auteur Rémi Angot
    */
    function  MG32_tracer_toutes_les_figures() {
        (function  verifie_div_MG32() {
            const el = document.getElementsByClassName('MG32');
            // Sélectionne les div de classe MG32
            if (el.length) { // S'ils existent, on peut appeler MG32
                Promise.all(MG32_tableau_de_figures.map(({idContainer, svgOptions, mtgOptions}) => mtgLoad(idContainer, svgOptions, mtgOptions)))
            .then(results => {
                        // results est le tableau des valeurs des promesses résolues, avec la même instance du player pour chacune, la 1re valeur nous suffit donc
                        window.mtg32App = results[0]
                        // on peut l'utiliser…
                        MG32_modifie_toutes_les_figures()
                    })
            .catch(error => console.error(error))
        } else {
                setTimeout(verifie_div_MG32, 300); // retente dans 300 milliseconds
            }
        })();


    }




    // FIN DE GESTION DE MG32

    // Gestion des paramètres
    let div = document.getElementById("div_code_LaTeX"); // Récupère le div dans lequel le code va être affiché
    let div_overleaf = document.getElementById("overleaf"); // Récupère le div dans lequel le code va être affiché
    let div_parametres_generaux = document.getElementById("parametres_generaux"); // Récupère le div dans lequel seront inscrit les paramètres
    let form_consigne = [],
        form_nb_questions = [],
        form_video = [],
        form_correction_detaillee = [],
        form_nb_cols = [],
        form_nb_cols_corr = [],
        form_spacing = [],
        form_spacing_corr = [],
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
            if (sortie_html) {
                div_parametres_generaux.innerHTML += '<h4 class="ui dividing header">Exercice n°' + (i + 1) + " : " + exercice[i].titre + " − " + liste_des_exercices[i] + "</h4>";
                if (exercice[i].pas_de_version_LaTeX) {
                    div_parametres_generaux.innerHTML += "<p><em>Cet exercice n'a pas de version LaTeX et ne peut donc pas être exporté en PDF.</em></p>";
                }
                if (exercice[i].nb_questions_modifiable) {
                    div_parametres_generaux.innerHTML +=
                        '<div><label for="form_nb_questions' + i + '">Nombre de questions : </label> <input id="form_nb_questions' + i + '" type="number"  min="1" max="99"></div>';
                }
                if (!est_diaporama){
                    div_parametres_generaux.innerHTML += '<div><label for="form_video' + i + '" data-tooltip="URL, code iframe, identifiant YouTube" data-inverted="" >Vidéo ou complément numérique : <input id="form_video' + i + '" type="texte" size="20"  ></label></div>';
                }
                if (exercice[i].correction_detaillee_disponible) {
                    div_parametres_generaux.innerHTML +=
                        '<div><label for="form_correction_detaillee' + i + '">Correction détaillée : </label> <input id="form_correction_detaillee' + i + '" type="checkbox" ></div>';
                }
                if (!exercice[i].nb_questions_modifiable && !exercice[i].correction_detaillee_disponible && !exercice[i].besoin_formulaire_numerique && !exercice[i].besoin_formulaire_texte) {
                    div_parametres_generaux.innerHTML += "<p><em>Cet exercice ne peut pas être paramétré.</em></p>";
                }
            } else {
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
                }

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
            if (!sortie_html) {
                // Les paramètres à ne gérer que pour la version LaTeX
                // Gestion de la consigne
                if (exercice[i].consigne_modifiable) {
                    form_consigne[i] = document.getElementById("form_consigne" + i);
                    form_consigne[i].value = exercice[i].consigne; // Rempli le formulaire avec la consigne
                    form_consigne[i].addEventListener("change", function (e) {
                        // Dès que le texte change, on met à jour
                        exercice[i].consigne = e.target.value;
                        mise_a_jour_du_code();
                    });
                }

                // Gestion du nombre de la correction détaillée
                if (exercice[i].correction_detaillee_disponible) {
                    form_correction_detaillee[i] = document.getElementById("form_correction_detaillee" + i);
                    form_correction_detaillee[i].checked = exercice[i].correction_detaillee; // Rempli le formulaire avec la valeur par défaut
                    form_correction_detaillee[i].addEventListener("change", function (e) {
                        // Dès que le statut change, on met à jour
                        exercice[i].correction_detaillee = e.target.checked;
                        mise_a_jour_du_code();
                    });
                }

                // Gestion du nombre de colones
                if (exercice[i].nb_cols_modifiable) {
                    form_nb_cols[i] = document.getElementById("form_nb_cols" + i);
                    form_nb_cols[i].value = exercice[i].nb_cols; // Rempli le formulaire avec le nombre de colonnes
                    form_nb_cols[i].addEventListener("change", function (e) {
                        // Dès que le nombre change, on met à jour
                        exercice[i].nb_cols = e.target.value;
                        mise_a_jour_du_code();
                    });
                }

                // Gestion du nombre de colones dans la correction
                if (exercice[i].nb_cols_corr_modifiable) {
                    form_nb_cols_corr[i] = document.getElementById("form_nb_cols_corr" + i);
                    form_nb_cols_corr[i].value = exercice[i].nb_cols_corr; // Rempli le formulaire avec le nombre de colonnes de la correction
                    form_nb_cols_corr[i].addEventListener("change", function (e) {
                        // Dès que le nombre change, on met à jour
                        exercice[i].nb_cols_corr = e.target.value;
                        mise_a_jour_du_code();
                    });
                }

                // Gestion de l'espacement
                if (exercice[i].spacing_modifiable) {
                    form_spacing[i] = document.getElementById("form_spacing" + i);
                    form_spacing[i].value = exercice[i].spacing; // Rempli le formulaire avec le nombre de colonnes de la correction
                    form_spacing[i].addEventListener("change", function (e) {
                        // Dès que le nombre change, on met à jour
                        exercice[i].spacing = e.target.value;
                        mise_a_jour_du_code();
                    });
                }

                // Gestion de l'espacement dans la correction
                if (exercice[i].spacing_corr_modifiable) {
                    form_spacing_corr[i] = document.getElementById("form_spacing_corr" + i);
                    form_spacing_corr[i].value = exercice[i].spacing_corr; // Rempli le formulaire avec le nombre de colonnes de la correction
                    form_spacing_corr[i].addEventListener("change", function (e) {
                        // Dès que le nombre change, on met à jour
                        exercice[i].spacing_corr = e.target.value;
                        mise_a_jour_du_code();
                    });
                }

                // Gestion de la suppression de la correction
                let form_correction_affichee = document.getElementById("supprimer_correction");
                form_correction_affichee.addEventListener("change", function (e) {
                    // Dès que le statut change, on met à jour
                    mise_a_jour_du_code();
                });

                // Gestion de la suppression des identifiants
                let form_supprimer_reference = document.getElementById("supprimer_reference");
                form_supprimer_reference.addEventListener("change", function (e) {
                    // Dès que le statut change, on met à jour
                    // nouvelles_donnees();
                    mise_a_jour_du_code();
                });

                // Gestion du changement de style
                let btn_radio_style_classique = document.getElementById("style_classique");
                btn_radio_style_classique.addEventListener("change", mise_a_jour_du_code);
                let btn_radio_style_CoopMaths = document.getElementById("style_CoopMaths");
                btn_radio_style_CoopMaths.addEventListener("change", mise_a_jour_du_code);
            }

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
            
            // Gestion de la vidéo
            if (sortie_html && !est_diaporama) {
                form_video[i] = document.getElementById("form_video" + i);
                form_video[i].value = exercice[i].video; // Rempli le formulaire
                form_video[i].addEventListener("change", function (e) {
                    // Dès que ça change, on met à jour
                    exercice[i].video = e.target.value;
                    mise_a_jour_du_code();
                });
            }

            // Gestion de la correction détaillée
            if (exercice[i].correction_detaillee_disponible) {
                form_correction_detaillee[i] = document.getElementById("form_correction_detaillee" + i);
                form_correction_detaillee[i].checked = exercice[i].correction_detaillee; // Rempli le formulaire avec la valeur par défaut
                form_correction_detaillee[i].addEventListener("change", function (e) {
                    // Dès que le statut change, on met à jour
                    exercice[i].correction_detaillee = e.target.checked;
                    mise_a_jour_du_code();
                });
            }

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

        // Gestion du bouton de zoom
        // let taille = parseInt($("#affichage_exercices").css("font-size"));
        // $("#btn_zoom_plus").click(function () {
        //     taille *= 1.2;
        //     $("#affichage_exercices").css("font-size", `${taille}px`);
        //     $("#affichage_exercices").find("h3").css("font-size", `${taille}px`);
        //     $("#affichage_exercices").find("h4").css("font-size", `${taille}px`);
        // });
        // $("#btn_zoom_moins").click(function () {
        //     if (parseInt(taille) > 14) {
        //         taille *= 0.8;
        //     }
        //     $("#affichage_exercices").css("font-size", `${taille}px`);
        //     $("#affichage_exercices").find("h3").css("font-size", `${taille}px`);
        //     $("#affichage_exercices").find("h4").css("font-size", `${taille}px`);
        // });

        if (sortie_html && !est_diaporama) {
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

        // Récupère la graine pour l'aléatoire dans l'URL
        let params = new URL(document.location).searchParams;
        let serie = params.get("serie");
        if (serie) {
            mathalea.graine = serie;
        }
        if (params.get("duree")) {
            mathalea.duree = params.get("duree");
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
