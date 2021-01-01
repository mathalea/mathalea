import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,liste_de_choses_a_imprimer,liste_de_question_to_contenu_sans_numero,liste_de_question_to_contenu_sans_numero_et_sans_consigne,deuxColonnes,egal,superieur,inferieur,superieurouegal,inferieurouegal,estentier,quotientier,carreParfait,ecrireNombre2D,ecrireAdditionPosee,decimal,creer_couples,randint,strRandom,enleve_element,enleve_element_bis,enleve_element_No,enleve_element_No_bis,choice,range,rangeMinMax,range1,compare_fractions,compare_nombres,numTrie,shuffle,shuffle2tableaux,tridictionnaire,filtreDictionnaire,combinaison_listes,combinaison_listes_sans_changer_ordre,rien_si_1,exposant,ecriture_nombre_relatif,ecriture_nombre_relatifc,ecriture_algebrique,ecriture_algebrique_sauf1,ecriture_algebriquec,ecriture_parenthese_si_negatif,ecriture_parenthese_si_moins,valeur_base,produit_matrice_vecteur_3x3,produit_matrice_matrice_3x3,changement_de_base_ortho_tri,changement_de_base_tri_ortho,image_point_par_transformation,signe,unSiPositifMoinsUnSinon,somme_des_chiffre,arrondi,troncature,abs,arrondi_virgule,pgcd,fraction_simplifiee,tex_fraction_reduite,produit_de_deux_fractions,simplification_de_fraction_avec_etapes,produits_en_croix,quatrieme_proportionnelle,reduire_ax_plus_b,obtenir_liste_facteurs_premiers,factorisation,extraire_racine_carree,tex_racine_carree,calcul,nombreDecimal,tex_nombrec,tex_nombrecoul,trie_positifs_negatifs,somme_des_termes_par_signe,creerNomDePolygone,possedeUnCaractereInterdit,choisit_nombres_entre_m_et_n,choisit_lettres_differentes,cesar,codeCesar,lettre_depuis_chiffre,lettre_minuscule_depuis_chiffre,minToHoraire,minToHour,prenomF,prenomM,prenom,tirer_les_des,liste_de_notes,jours_par_mois,un_mois_de_temperature,nom_du_mois,tex_enumerate,tex_enumerate_sans_numero,tex_paragraphe,tex_introduction,html_enumerate,enumerate,html_paragraphe,html_ligne,tex_multicols,html_consigne,tex_consigne,tex_nombre,tex_nombre2,tex_nombrec2,sp,nombre_avec_espace,string_nombre,mise_en_evidence,texte_en_couleur,texte_en_couleur_et_gras,couleurAleatoire,arcenciel,texcolors,texte_gras,href,tex_prix,premiere_lettre_en_majuscule,nombre_de_chiffres_dans_la_partie_decimale,tex_fraction_signe,tex_fraction_parentheses,obtenir_liste_fractions_irreductibles,obtenir_liste_fractions_irreductibles_faciles,obtenir_liste_nombres_premiers,decomposition_facteurs_premiers,liste_des_diviseurs,tex_fraction,printlatex,tex_texte,itemize,MG32_modifie_figure,MG32_modifie_toutes_les_figures,MG32_ajouter_figure,MG32_tracer_toutes_les_figures,verifie_div_MG32,SVG_Axe_vertical,SVG_Axe_horizontal,SVG_grille,SVG_graduation,SVG_label,SVG_fraction,SVG_tracer_point,SVG_tracer_flecheH,SVG_tracer_flecheV,SVG_tracer_droite_flecheV,SVG_tracer_droite_flecheH,SVG_Tracer_droite,Latex_Tracer_droite,SVG_repere,Latex_repere,SVG_reperage_sur_un_axe,Latex_reperage_sur_un_axe,tex_graphique,MatriceCarree,matriceCarree,resol_sys_lineaire_2x2,resol_sys_lineaire_3x3,crible_polynome_entier,cherche_min_max_f,cherche_polynome_deg3_a_extrema_fixes,simpExp,puissance,ecriturePuissance,simpNotPuissance,eclatePuissance,puissanceEnProduit,reorganiseProduitPuissance,creer_modal,creerBoutonMathalea2d,modal_texte_court,modal_youtube,modal_texte_long,modal_url,modal_pdf,modal_video,modal_image,liste_diviseurs,tikz_machine_maths,tikz_machine_diag,katex_Popup,katex_Popuptest,sansAccent,katex_Popup2,num_alpha,SVG_fleche_machine_maths,SVG_chemin,SVG_machine_diag_3F1_act_mono,my_svg_font,SVG_machine_maths,tex_cadre_par_orange,SVG_machine_diag_3F12,machine_maths_video,detect_safari_chrome_browser,premierMultipleSuperieur,premierMultipleInferieur,liste_nb_premiers_strict_jusqua,crible_eratosthene_n,premiers_entre_bornes,texte_ou_pas,tab_C_L,warn_message,info_message,lampe_message,SVG_engrenages,decomp_fact_prem_array,Triangles,getNom,getCotes,getLongueurs,getLongueursValeurs,getAngles,getAnglesValeurs,getSommets,getPerimetre,isTrueTriangleLongueurs,isPlatTriangleLongueurs,isTrueTriangleAngles,isPlatTriangleAngles,isQuelconque,Relatif,getSigneNumber,getSigneString,getSigneProduitNumber,getSigneProduitString,getCardNegatifs,orth_facteurs_n,setRegleSigneProduit,setRegleSigneQuotient,ListeFraction,sortFractions,ppcm,reduceSameDenominateur,fraction,Fraction,nombreEnLettres,partieEntiereEnLettres,telechargeFichier,intro_LaTeX,intro_LaTeX_coop,preambule_personnalise,scratchTraductionFr} from "/modules/outils.js"
import {ObjetMathalea2D,Point,point,TracePoint,tracePoint,TracePointSurDroite,tracePointSurDroite,milieu,pointSurSegment,pointSurCercle,pointSurDroite,pointIntersectionDD,pointAdistance,LabelPoint,labelPoint,barycentre,Droite,droite,droiteParPointEtVecteur,droiteParPointEtParallele,droiteParPointEtPerpendiculaire,droiteHorizontaleParPoint,droiteVerticaleParPoint,droiteParPointEtPente,mediatrice,CodageMediatrice,codageMediatrice,CodageMilieu,codageMilieu,ConstructionMediatrice,constructionMediatrice,bissectrice,CodageBissectrice,codageBissectrice,ConstructionBissectrice,constructionBissectrice,Polyline,polyline,Vecteur,vecteur,Segment,segment,segmentAvecExtremites,demiDroite,demiDroiteAvecExtremite,Polygone,polygone,polygoneAvecNom,polygoneRegulier,polygoneRegulierIndirect,carre,carreIndirect,CodageCarre,codageCarre,polygoneRegulierParCentreEtRayon,triangle2points2longueurs,triangle2points2angles,triangle2points1angle1longueur,triangle2points1angle1longueurOppose,NommePolygone,nommePolygone,deplaceLabel,aireTriangle,Cercle,cercle,pointIntersectionLC,pointIntersectionCC,CercleCentrePoint,cercleCentrePoint,Arc,arc,ArcPointPointAngle,arcPointPointAngle,traceCompas,CourbeDeBezier,courbeDeBezier,SegmentMainLevee,segmentMainLevee,CercleMainLevee,cercleMainLevee,DroiteMainLevee,droiteMainLevee,PolygoneMainLevee,polygoneMainLevee,ArcMainLevee,arcMainLevee,dansLaCibleCarree,dansLaCibleRonde,CibleCarree,cibleCarree,CibleRonde,cibleRonde,translation,translation2Points,rotation,homothetie,symetrieAxiale,distancePointDroite,projectionOrtho,affiniteOrtho,similitude,TranslationAnimee,translationAnimee,RotationAnimee,rotationAnimee,HomothetieAnimee,homothetieAnimee,SymetrieAnimee,symetrieAnimee,AffiniteOrthoAnimee,affiniteOrthoAnimee,montrerParDiv,cacherParDiv,afficherTempo,afficherTempoId,afficherUnParUn,medianeTriangle,centreGraviteTriangle,hauteurTriangle,CodageHauteurTriangle,codageHauteurTriangle,CodageMedianeTriangle,codageMedianeTriangle,orthoCentre,centreCercleCirconscrit,CodageAngleDroit,codageAngleDroit,AfficheLongueurSegment,afficheLongueurSegment,TexteSurSegment,texteSurSegment,AfficheMesureAngle,afficheMesureAngle,AfficheCoteSegment,afficheCoteSegment,CodeSegment,codeSegment,CodeSegments,codeSegments,CodeAngle,codeAngle,DroiteGraduee,droiteGraduee,DroiteGraduee2,droiteGraduee2,Axes,axes,LabelX,labelX,LabelY,labelY,Grille,grille,GrilleHorizontale,grilleHorizontale,GrilleVerticale,grilleVerticale,Seyes,seyes,Repere,repere,Repere2,repere2,pointDansRepere,TraceGraphiqueCartesien,traceGraphiqueCartesien,TraceBarre,traceBarre,TraceBarreHorizontale,traceBarreHorizontale,LectureImage,lectureImage,LectureAntecedent,lectureAntecedent,Courbe,courbe,Courbe2,courbe2,CourbeInterpolee,courbeInterpolee,GraphiqueInterpole,graphiqueInterpole,imageInterpolee,antecedentInterpole,AntecedentParDichotomie,CrochetD,crochetD,CrochetG,crochetG,intervalle,TexteParPoint,texteParPoint,texteParPosition,LatexParPoint,latexParPoint,latexParCoordonnees,FractionParPosition,fractionParPosition,Print2d,print2d,longueur,norme,angle,angleOriente,angleradian,ObjetLutin,creerLutin,avance,baisseCrayon,leveCrayon,orienter,tournerG,tournerD,allerA,mettrexA,mettreyA,ajouterAx,ajouterAy,AfficherCrayon,afficherCrayon,TranslationInstrument,translationInstrument,deplaceInstrument,codeSvg,codeTikz,mathalea2d,Labyrinthe,labyrinthe,Pavage,pavage} from "/modules/2d.js"
/**
 * Non Publié : base servant à faire des tutoriels vidéos
 * @Auteur Jean-Claude Lhote
 * Réf : betaExoConstruction
 * publié le 1/12/2020
 */
export default function Exercice_constructions_basiques() {
  "use strict";
  Exercice.call(this);
  this.titre = "Programmes de constructions (en chantier)";
  this.nb_questions = 1; // Ici le nombre de questions
  this.nb_questions_modifiable = false; // Active le formulaire nombre de questions
  this.nb_cols = 1; // Le nombre de colonnes dans l'énoncé LaTeX
  this.nb_cols_corr = 1; // Le nombre de colonne pour la correction LaTeX
  this.pas_de_version_LaTeX = false; // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
  this.pas_de_version_HMTL = false; // mettre à true si on ne veut pas de l'exercice en ligne

  // Voir la Classe Exercice pour une liste exhaustive des propriétés disponibles.
  //  this.sup = false; // A décommenter : valeur par défaut d'un premier paramètre
  //  this.sup2 = false; // A décommenter : valeur par défaut d'un deuxième paramètre
  //  this.sup3 = false; // A décommenter : valeur par défaut d'un troisième paramètre
  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
  this.nouvelle_version = function (numero_de_l_exercice) {
    // la variable numero_de_l_exercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page
    this.liste_questions = []; // tableau contenant la liste des questions 
    this.liste_corrections = [];
    let type_de_questions_disponibles = [1]; // tableau à compléter par valeurs possibles des types de questions
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
    // Ci-dessus On crée une liste aléatoire comprenant nb_questions parmi les types disponibles.
    /* Un exemple ci-dessous : si la classe est 6, alors les types dispo sont 1 et 2 sinon , 1,2,3 et 4.
    if (this.classe == 6) type_de_questions_disponibles = [1, 2]
        else type_de_questions_disponibles = [1, 2, 3,4]
    liste_type_de_questions = combin,aison_listes(type_de_questions_disponibles, this.nb_questions)
    */
    // boucle pour fabriquer les nb_questions questions en s'assurant que si il n'y a pas nb_questions différentes
    // La boucle s'arrête après 50 tentatives.
    let A, B, C, D, traces1, traces2, labels1, labels2, kare, aA, aB, aC, aD;
    let objets_enonce, objets_enonceml, objets_correction, params_enonce, params_enonceml, params_correction;
    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
      objets_enonce = []; // on initialise le tableau des objets Mathalea2d de l'enoncé
      objets_enonceml = []; // Idem pour l'enoncé à main levée si besoin
      objets_correction = []; // Idem pour la correction

      texte = `Construire le carré $ABCD$.<br>`; // Nous utilisons souvent cette variable pour construire le texte de la question.
      texte_corr = `Pour cette construction on peut utiliser la règle et l'équerre.<br>`; // Idem pour le texte de la correction.


      //      nom = creerNomDePolygone(3, "PQ")
      // fonction permettant de choisir un nom de polygone, soit ici 3 lettres qui se suivent à l'exclusion de la séquence PQ
      switch (liste_type_de_questions[i]) { // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
        case 1:
          A = point(0, 0, 'A', 'below');
          B = point(5, randint(-30, 30) / 10, 'B', 'below');
          C = rotation(A, B, -90, 'C', 'above');
          D = rotation(B, A, 90, 'D', 'above');
          traces1 = tracePoint(A, B);
          labels1 = labelPoint(A, B);
          traces2 = tracePoint(A, B, C, D);
          labels2 = labelPoint(A, B, C, D);
          kare = carre(A, B);
          kare.epaisseur = 2;
          aA = codageAngleDroit(B, A, D);
          aB = codageAngleDroit(A, B, C);
          aC = codageAngleDroit(B, C, D);
          aD = codageAngleDroit(C, D, A);

          objets_enonce.push(traces1, labels1);
          objets_enonceml.push(traces2, labels2, kare, aA, aB, aC, aD);
          objets_correction.push(traces2, labels2, kare, aA, aB, aC, aD);
          //ici sont créés les texte, tex_corr, objets mathalea2d divers entrant dans le contenu de l'exercice
          break;

        case 2:

          // Idem Cas1 mais avec d'autres texte, texte_corr...
          break;

        case 3:

          break;

        case 4:

          break;

      }
      //  objets_enonce.push () // On rempli les tableaux d'objets Mathalea2d
      //  objets_enonceml.push()
      //  objets_correction.push()
      //paramètres de la fenêtre Mathalea2d pour l'énoncé main levée
      params_enonceml = { xmin: -5, ymin: -5, xmax: 9, ymax: 9, pixelsParCm: 20, scale: 1, mainlevee: true, amplitude: 1 };
      //paramètres de la fenêtre Mathalea2d pour l'énoncé normal
      params_enonce = { xmin: -5, ymin: -5, xmax: 9, ymax: 9, pixelsParCm: 20, scale: 1, mainlevee: false };
      //paramètres de la fenêtre Mathalea2d pour la correction
      params_correction = { xmin: -5, ymin: -5, xmax: 9, ymax: 9, pixelsParCm: 20, scale: 1 };
      // On ajoute au texte de l'énoncé, la figure à main levée et la figure de l'enoncé.
      texte += mathalea2d(params_enonceml, objets_enonceml) + mathalea2d(params_enonce, objets_enonce);
      // On ajoute au texte de la correction, la figure de la correction
      texte_corr += mathalea2d(params_correction, objets_correction);
      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on la stocke dans la liste des questions
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this); // On envoie l'exercice à la fonction de mise en page
  };
  // Si les variables suivantes sont définies, elles provoquent l'affichage des formulaires des paramètres correspondants
  // Il peuvent être de 3 types : _numerique, _case_a_cocher ou _texte.
  // Il sont associés respectivement aux paramètres sup, sup2 et sup3.
  //	this.besoin_formulaire_numerique = ['Type de questions', 3, `1 : Perpendiculaires\n 2 : Parallèles\n 3 : Mélange`]
  //  this.besoin_formulaire2_numerique = ["Type de cahier",3,`1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`];
  // this.besoin_formulaire3_case_a_cocher =['figure à main levée',true]
} // Fin de l'exercice.

