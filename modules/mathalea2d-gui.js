import {liste_de_question_to_contenu,liste_de_choses_a_imprimer,liste_de_question_to_contenu_sans_numero,liste_de_question_to_contenu_sans_numero_et_sans_consigne,deuxColonnes,egal,superieur,inferieur,superieurouegal,inferieurouegal,estentier,quotientier,carreParfait,ecrireNombre2D,decimal,creer_couples,randint,strRandom,enleve_element,enleve_element_bis,enleve_element_No,enleve_element_No_bis,choice,range,rangeMinMax,range1,compare_fractions,compare_nombres,numTrie,shuffle,shuffle2tableaux,tridictionnaire,filtreDictionnaire,combinaison_listes,combinaison_listes_sans_changer_ordre,rien_si_1,exposant,ecriture_nombre_relatif,ecriture_nombre_relatifc,ecriture_algebrique,ecriture_algebrique_sauf1,ecriture_algebriquec,ecriture_parenthese_si_negatif,ecriture_parenthese_si_moins,valeur_base,produit_matrice_vecteur_3x3,produit_matrice_matrice_3x3,changement_de_base_ortho_tri,changement_de_base_tri_ortho,image_point_par_transformation,signe,unSiPositifMoinsUnSinon,somme_des_chiffre,arrondi,troncature,abs,arrondi_virgule,pgcd,fraction_simplifiee,tex_fraction_reduite,produit_de_deux_fractions,simplification_de_fraction_avec_etapes,produits_en_croix,quatrieme_proportionnelle,reduire_ax_plus_b,obtenir_liste_facteurs_premiers,factorisation,extraire_racine_carree,tex_racine_carree,calcul,nombreDecimal,tex_nombrec,tex_nombrecoul,trie_positifs_negatifs,somme_des_termes_par_signe,creerNomDePolygone,possedeUnCaractereInterdit,choisit_nombres_entre_m_et_n,choisit_lettres_differentes,cesar,codeCesar,lettre_depuis_chiffre,lettre_minuscule_depuis_chiffre,minToHoraire,minToHour,prenomF,prenomM,prenom,tirer_les_des,liste_de_notes,jours_par_mois,un_mois_de_temperature,nom_du_mois,tex_enumerate,tex_enumerate_sans_numero,tex_paragraphe,tex_introduction,html_enumerate,enumerate,html_paragraphe,html_ligne,tex_multicols,html_consigne,tex_consigne,tex_nombre,tex_nombre2,tex_nombrec2,sp,nombre_avec_espace,string_nombre,mise_en_evidence,texte_en_couleur,texte_en_couleur_et_gras,couleurAleatoire,arcenciel,texcolors,texte_gras,href,tex_prix,premiere_lettre_en_majuscule,nombre_de_chiffres_dans_la_partie_decimale,tex_fraction_signe,tex_fraction_parentheses,obtenir_liste_fractions_irreductibles,obtenir_liste_fractions_irreductibles_faciles,obtenir_liste_nombres_premiers,decomposition_facteurs_premiers,liste_des_diviseurs,tex_fraction,printlatex,tex_texte,itemize,MG32_modifie_figure,MG32_modifie_toutes_les_figures,MG32_ajouter_figure,MG32_tracer_toutes_les_figures,SVG_Axe_vertical,SVG_Axe_horizontal,SVG_grille,SVG_graduation,SVG_label,SVG_fraction,SVG_tracer_point,SVG_tracer_flecheV,SVG_tracer_droite_flecheV,SVG_tracer_droite_flecheH,SVG_Tracer_droite,Latex_Tracer_droite,SVG_repere,Latex_repere,SVG_reperage_sur_un_axe,Latex_reperage_sur_un_axe,tex_graphique,MatriceCarree,matriceCarree,resol_sys_lineaire_2x2,resol_sys_lineaire_3x3,crible_polynome_entier,cherche_min_max_f,cherche_polynome_deg3_a_extrema_fixes,simpExp,puissance,ecriturePuissance,simpNotPuissance,eclatePuissance,puissanceEnProduit,reorganiseProduitPuissance,creer_modal,creerBoutonMathalea2d,modal_texte_court,modal_youtube,modal_texte_long,modal_url,modal_pdf,modal_video,modal_image,liste_diviseurs,tikz_machine_maths,tikz_machine_diag,katex_Popup,katex_Popuptest,sansAccent,katex_Popup2,num_alpha,SVG_fleche_machine_maths,SVG_chemin,SVG_machine_diag_3F1_act_mono,my_svg_font,SVG_machine_maths,tex_cadre_par_orange,SVG_machine_diag_3F12,machine_maths_video,detect_safari_chrome_browser,premierMultipleSuperieur,premierMultipleInferieur,liste_nb_premiers_strict_jusqua,crible_eratosthene_n,premiers_entre_bornes,texte_ou_pas,tab_C_L,warn_message,info_message,lampe_message,SVG_engrenages,decomp_fact_prem_array,Triangles,Relatif,ListeFraction,ppcm,fraction,nombreEnLettres,partieEntiereEnLettres,telechargeFichier,intro_LaTeX,intro_LaTeX_coop,preambule_personnalise,scratchTraductionFr} from "/modules/outils.js"
import {point,tracePoint,tracePointSurDroite,milieu,pointSurSegment,pointSurCercle,pointSurDroite,pointIntersectionDD,pointAdistance,labelPoint,barycentre,droite,droiteParPointEtVecteur,droiteParPointEtParallele,droiteParPointEtPerpendiculaire,droiteHorizontaleParPoint,droiteVerticaleParPoint,droiteParPointEtPente,mediatrice,codageMediatrice,codageMilieu,constructionMediatrice,bissectrice,codageBissectrice,constructionBissectrice,polyline,vecteur,segment,segmentAvecExtremites,demiDroite,demiDroiteAvecExtremite,polygone,polygoneAvecNom,polygoneRegulier,polygoneRegulierIndirect,carre,carreIndirect,codageCarre,polygoneRegulierParCentreEtRayon,triangle2points2longueurs,triangle2points2angles,triangle2points1angle1longueur,triangle2points1angle1longueurOppose,nommePolygone,deplaceLabel,aireTriangle,cercle,pointIntersectionLC,pointIntersectionCC,cercleCentrePoint,arc,arcPointPointAngle,traceCompas,courbeDeBezier,segmentMainLevee,cercleMainLevee,droiteMainLevee,polygoneMainLevee,arcMainLevee,dansLaCibleCarree,dansLaCibleRonde,cibleCarree,cibleRonde,translation,translation2Points,rotation,homothetie,symetrieAxiale,distancePointDroite,projectionOrtho,affiniteOrtho,similitude,translationAnimee,rotationAnimee,homothetieAnimee,symetrieAnimee,affiniteOrthoAnimee,montrerParDiv,cacherParDiv,afficherTempo,afficherTempoId,afficherUnParUn,medianeTriangle,centreGraviteTriangle,hauteurTriangle,codageHauteurTriangle,codageMedianeTriangle,orthoCentre,centreCercleCirconscrit,codageAngleDroit,afficheLongueurSegment,texteSurSegment,afficheMesureAngle,afficheCoteSegment,codeSegment,codeSegments,codeAngle,droiteGraduee,droiteGraduee2,axes,labelX,labelY,grille,grilleHorizontale,grilleVerticale,seyes,repere,repere2,pointDansRepere,traceGraphiqueCartesien,traceBarre,traceBarreHorizontale,lectureImage,lectureAntecedent,courbe,courbe2,courbeInterpolee,graphiqueInterpole,imageInterpolee,antecedentInterpole,crochetD,crochetG,intervalle,texteParPoint,texteParPosition,latexParPoint,latexParCoordonnees,fractionParPosition,print2d,longueur,norme,angle,angleOriente,angleradian,creerLutin,avance,baisseCrayon,leveCrayon,orienter,tournerG,tournerD,allerA,mettrexA,mettreyA,ajouterAx,ajouterAy,afficherCrayon,codeSvg,codeTikz,mathalea2d,labyrinthe,pavage} from "/modules/2d.js"


let mesObjets = []; // Liste de tous les objets construits
//Liste utilisée quand il n'y a qu'une seule construction sur la page web

mathalea.lutin = creerLutin();

let numId = 0 // Créer un identifiant numérique unique par objet SVG

let unitesLutinParCm = 50;
let amplitude=1
let scale=1
window.onload = function () {
  $(".ui.dropdown").dropdown(); //Pour les menus
  let divEditeur = document.getElementById("editeur");
  let divSvg = document.getElementById("svg");
  let divSortieSvg = document.getElementById("sortieSvg");
  let divSortieTikz = document.getElementById("sortieTikz");
  let buttonSubmit = document.getElementById("submit");
  let buttonTelecharger;
  let buttonURL;

  if (document.getElementById("telecharger")) {
    buttonTelecharger = document.getElementById("telecharger");
    buttonTelecharger.onclick = function () {
      download(myCodeMirrorSvg.getValue(), "mathalea2d.svg", "text/plain");
    };
  }
  if (document.getElementById("url")) {
    buttonURL = document.getElementById("url");
    buttonURL.onclick = function () {
      let script = encodeURIComponent(myCodeMirror.getValue());
      window.open(`/mathalea2dsvg.html?script=${script}`);
    };
  }

  let myCodeMirror = CodeMirror(divEditeur, {
    value: ``,
    mode: "javascript",
    lineNumbers: true,
    autofocus: true,
    theme: "monokai",
    autoCloseBrackets: true,
    showHint: true,
    extraKeys: { "Ctrl-Space": "autocomplete" },
    matchBrackets: true,
    lineWrapping: true,
  });

  let myCodeMirrorSvg = CodeMirror(divSortieSvg, {
    value: "",
    mode: "htmlmixed",
    readOnly: true,
    lineNumbers: true,
  });
  let myCodeMirrorTikz = CodeMirror(divSortieTikz, {
    value: "",
    mode: "stex",
    readOnly: true,
    lineNumbers: true,
  });

  let url = new URL(window.location.href);
  if (url.searchParams.get("url")) { // Si on spécifie une url
	  fetch(`/m2d/${url.searchParams.get("url")}.m2d`)
      .then(function (response) {
		  if (response.ok) {
			  return response.text();
			} else {
				return `//Fichier /m2d/${url.searchParams.get("url")}.m2d non trouvé`;
			}
		})
		.then((text) => myCodeMirror.setValue(text));
	} else if (url.searchParams.get("script")){ // Si un script est présent dans l'URL
		myCodeMirror.setValue(decodeURIComponent(url.searchParams.get("script")));
	} else { //Récupère le dernier script validé
		if (localStorage.getItem("Script Mathalea 2D")) {
		  myCodeMirror.setValue(localStorage.getItem("Script Mathalea 2D"));
		}
  }
  

  //Autocomplétion
  myCodeMirror.on("inputRead", function onChange(editor, input) {
    if (input.text[0] === ";" || input.text[0] === " ") {
      return;
    }
    CodeMirror.commands.autocomplete(editor, null, { completeSingle: false });
  });

  buttonSubmit.onclick = function () {
    numId = 0;
    localStorage.setItem("Script Mathalea 2D", myCodeMirror.getValue()); // On sauvegarde dans le navigateur le code du script
    if (buttonTelecharger) {
      buttonTelecharger.style.visibility = "visible";
    }
    if (buttonURL) {
      buttonURL.style.visibility = "visible";
    }
    executeCode(
      `mathalea.objets2D = [] ; mathalea.lutin = creerLutin() ; ${myCodeMirror.getValue()}`
    );
    let mesObjetsCopie = mathalea.objets2D.slice(); // codeSVG va ajouter des objets supplémentaires donc on en garde une copie
    let codeSvgcomplet = codeSvg(mathalea.fenetreMathalea2d, mathalea.pixelsParCm, mathalea.mainlevee, mathalea.objets2D);
    divSvg.innerHTML = codeSvgcomplet;
    myCodeMirrorSvg.setValue(codeSvgcomplet);
    mathalea.objets2D = mesObjetsCopie.slice(); // on réinitialise mesObjets à l'état où il était avant que codeSvg n'ajoute des objets
    myCodeMirrorTikz.setValue(codeTikz(mathalea.fenetreMathalea2d, mathalea.scale, mathalea.mainlevee, mathalea.objets2D));

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

    /*
		%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
		%%%%%%%%%%%% DRAG & DEPLACE %%%%%%%%%%%%%
		%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

		@SOURCE https://css-tricks.com/creating-a-panning-effect-for-svg/

		*/

    // We select the SVG into the page
    let svg = document.querySelector("svg");

    // If browser supports pointer events
    if (window.PointerEvent) {
      svg.addEventListener("pointerdown", onPointerDown); // Pointer is pressed
      svg.addEventListener("pointerup", onPointerUp); // Releasing the pointer
      svg.addEventListener("pointerleave", onPointerUp); // Pointer gets out of the SVG area
      svg.addEventListener("pointermove", onPointerMove); // Pointer is moving
    } else {
      // Add all mouse events listeners fallback
      svg.addEventListener("mousedown", onPointerDown); // Pressing the mouse
      svg.addEventListener("mouseup", onPointerUp); // Releasing the mouse
      svg.addEventListener("mouseleave", onPointerUp); // Mouse gets out of the SVG area
      svg.addEventListener("mousemove", onPointerMove); // Mouse is moving

      // Add all touch events listeners fallback
      svg.addEventListener("touchstart", onPointerDown); // Finger is touching the screen
      svg.addEventListener("touchend", onPointerUp); // Finger is no longer touching the screen
      svg.addEventListener("touchmove", onPointerMove); // Finger is moving
    }

    // This function returns an object with X & Y values from the pointer event
    function getPointFromEvent(event) {
      let point = { x: 0, y: 0 };
      // If even is triggered by a touch event, we get the position of the first finger
      if (event.targetTouches) {
        point.x = event.targetTouches[0].clientX;
        point.y = event.targetTouches[0].clientY;
      } else {
        point.x = event.clientX;
        point.y = event.clientY;
      }

      return point;
    }

    // This letiable will be used later for move events to check if pointer is down or not
    let isPointerDown = false;

    // This letiable will contain the original coordinates when the user start pressing the mouse or touching the screen
    let pointerOrigin = {
      x: 0,
      y: 0,
    };

    // Function called by the event listeners when user start pressing/touching
    function onPointerDown(event) {
      isPointerDown = true; // We set the pointer as down

      // We get the pointer position on click/touchdown so we can get the value once the user starts to drag
      let pointerPosition = getPointFromEvent(event);
      pointerOrigin.x = pointerPosition.x;
      pointerOrigin.y = pointerPosition.y;
    }

    // We save the original values from the viewBox
    let fenetrexmin = mathalea.fenetreMathalea2d[0]
    let fenetreymin = mathalea.fenetreMathalea2d[1]
    let fenetrexmax = mathalea.fenetreMathalea2d[2]
    let fenetreymax = mathalea.fenetreMathalea2d[3]
    let viewBox = {
      x: fenetrexmin*mathalea.pixelsParCm,
      y: fenetreymin*mathalea.pixelsParCm,
      width: (fenetrexmax-fenetrexmin)*mathalea.pixelsParCm,
      height: (fenetreymax-fenetreymin)*mathalea.pixelsParCm,
    };

    // The distances calculated from the pointer will be stored here
    let newViewBox = {
      x: 0,
      y: 0,
    };

    // Calculate the ratio based on the viewBox width and the SVG width
    let ratio = viewBox.width / svg.getBoundingClientRect().width;
    window.addEventListener("resize", function () {
      ratio = viewBox.width / svg.getBoundingClientRect().width;
    });

    // Function called by the event listeners when user start moving/dragging
    function onPointerMove(event) {
      // Only run this function if the pointer is down
      if (!isPointerDown) {
        return;
      }
      // This prevent user to do a selection on the page
      event.preventDefault();

      // Get the pointer position
      let pointerPosition = getPointFromEvent(event);

      // We calculate the distance between the pointer origin and the current position
      // The viewBox x & y values must be calculated from the original values and the distances
      newViewBox.x = viewBox.x - (pointerPosition.x - pointerOrigin.x) * ratio;
      newViewBox.y = viewBox.y - (pointerPosition.y - pointerOrigin.y) * ratio;

      // We create a string with the new viewBox values
      // The X & Y values are equal to the current viewBox minus the calculated distances
      let viewBoxString = `${newViewBox.x} ${newViewBox.y} ${viewBox.width} ${viewBox.height}`;
      // We apply the new viewBox values onto the SVG
      svg.setAttribute("viewBox", viewBoxString);
      myCodeMirrorSvg.setValue(divSvg.innerHTML);
      let xmin = calcul(newViewBox.x/mathalea.pixelsParCm,1);
      let xmax = calcul(xmin + viewBox.width/mathalea.pixelsParCm,1);
      let ymax = calcul(newViewBox.y/mathalea.pixelsParCm*(-1),1);
      let ymin = calcul(ymax - viewBox.height/mathalea.pixelsParCm,1)
      if (myCodeMirror.getValue().indexOf('mathalea.fenetreMathalea2d')>-1){
        myCodeMirror.setValue(myCodeMirror.getValue().replace(/mathalea.fenetreMathalea2d.*/,`mathalea.fenetreMathalea2d = [${xmin},${ymin},${xmax},${ymax}]`))
      } else {
        myCodeMirror.setValue(`mathalea.fenetreMathalea2d = [${xmin},${ymin},${xmax},${ymax}]\n`+myCodeMirror.getValue())
      }
      myCodeMirrorTikz.setValue(myCodeMirrorTikz.getValue().replace(/\\clip.*/,`\\clip (${xmin},${ymin}) rectangle (${xmax},${ymax});`))


      //document.querySelector('.viewbox').innerHTML = viewBoxString;
    }

    function onPointerUp() {
      // The pointer is no longer considered as down
      isPointerDown = false;

      // We save the viewBox coordinates based on the last pointer offsets
      viewBox.x = newViewBox.x;
      viewBox.y = newViewBox.y;
    }
  };
};

function executeCode(txt) {
  return eval(txt);
}
