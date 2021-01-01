import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,liste_de_choses_a_imprimer,liste_de_question_to_contenu_sans_numero,liste_de_question_to_contenu_sans_numero_et_sans_consigne,deuxColonnes,egal,superieur,inferieur,superieurouegal,inferieurouegal,estentier,quotientier,carreParfait,ecrireNombre2D,ecrireAdditionPosee,decimal,creer_couples,randint,strRandom,enleve_element,enleve_element_bis,enleve_element_No,enleve_element_No_bis,choice,range,rangeMinMax,range1,compare_fractions,compare_nombres,numTrie,shuffle,shuffle2tableaux,tridictionnaire,filtreDictionnaire,combinaison_listes,combinaison_listes_sans_changer_ordre,rien_si_1,exposant,ecriture_nombre_relatif,ecriture_nombre_relatifc,ecriture_algebrique,ecriture_algebrique_sauf1,ecriture_algebriquec,ecriture_parenthese_si_negatif,ecriture_parenthese_si_moins,valeur_base,produit_matrice_vecteur_3x3,produit_matrice_matrice_3x3,changement_de_base_ortho_tri,changement_de_base_tri_ortho,image_point_par_transformation,signe,unSiPositifMoinsUnSinon,somme_des_chiffre,arrondi,troncature,abs,arrondi_virgule,pgcd,fraction_simplifiee,tex_fraction_reduite,produit_de_deux_fractions,simplification_de_fraction_avec_etapes,produits_en_croix,quatrieme_proportionnelle,reduire_ax_plus_b,obtenir_liste_facteurs_premiers,factorisation,extraire_racine_carree,tex_racine_carree,calcul,nombreDecimal,tex_nombrec,tex_nombrecoul,trie_positifs_negatifs,somme_des_termes_par_signe,creerNomDePolygone,possedeUnCaractereInterdit,choisit_nombres_entre_m_et_n,choisit_lettres_differentes,cesar,codeCesar,lettre_depuis_chiffre,lettre_minuscule_depuis_chiffre,minToHoraire,minToHour,prenomF,prenomM,prenom,tirer_les_des,liste_de_notes,jours_par_mois,un_mois_de_temperature,nom_du_mois,tex_enumerate,tex_enumerate_sans_numero,tex_paragraphe,tex_introduction,html_enumerate,enumerate,html_paragraphe,html_ligne,tex_multicols,html_consigne,tex_consigne,tex_nombre,tex_nombre2,tex_nombrec2,sp,nombre_avec_espace,string_nombre,mise_en_evidence,texte_en_couleur,texte_en_couleur_et_gras,couleurAleatoire,arcenciel,texcolors,texte_gras,href,tex_prix,premiere_lettre_en_majuscule,nombre_de_chiffres_dans_la_partie_decimale,tex_fraction_signe,tex_fraction_parentheses,obtenir_liste_fractions_irreductibles,obtenir_liste_fractions_irreductibles_faciles,obtenir_liste_nombres_premiers,decomposition_facteurs_premiers,liste_des_diviseurs,tex_fraction,printlatex,tex_texte,itemize,MG32_modifie_figure,MG32_modifie_toutes_les_figures,MG32_ajouter_figure,MG32_tracer_toutes_les_figures,verifie_div_MG32,SVG_Axe_vertical,SVG_Axe_horizontal,SVG_grille,SVG_graduation,SVG_label,SVG_fraction,SVG_tracer_point,SVG_tracer_flecheH,SVG_tracer_flecheV,SVG_tracer_droite_flecheV,SVG_tracer_droite_flecheH,SVG_Tracer_droite,Latex_Tracer_droite,SVG_repere,Latex_repere,SVG_reperage_sur_un_axe,Latex_reperage_sur_un_axe,tex_graphique,MatriceCarree,matriceCarree,resol_sys_lineaire_2x2,resol_sys_lineaire_3x3,crible_polynome_entier,cherche_min_max_f,cherche_polynome_deg3_a_extrema_fixes,simpExp,puissance,ecriturePuissance,simpNotPuissance,eclatePuissance,puissanceEnProduit,reorganiseProduitPuissance,creer_modal,creerBoutonMathalea2d,modal_texte_court,modal_youtube,modal_texte_long,modal_url,modal_pdf,modal_video,modal_image,liste_diviseurs,tikz_machine_maths,tikz_machine_diag,katex_Popup,katex_Popuptest,sansAccent,katex_Popup2,num_alpha,SVG_fleche_machine_maths,SVG_chemin,SVG_machine_diag_3F1_act_mono,my_svg_font,SVG_machine_maths,tex_cadre_par_orange,SVG_machine_diag_3F12,machine_maths_video,detect_safari_chrome_browser,premierMultipleSuperieur,premierMultipleInferieur,liste_nb_premiers_strict_jusqua,crible_eratosthene_n,premiers_entre_bornes,texte_ou_pas,tab_C_L,warn_message,info_message,lampe_message,SVG_engrenages,decomp_fact_prem_array,Triangles,getNom,getCotes,getLongueurs,getLongueursValeurs,getAngles,getAnglesValeurs,getSommets,getPerimetre,isTrueTriangleLongueurs,isPlatTriangleLongueurs,isTrueTriangleAngles,isPlatTriangleAngles,isQuelconque,Relatif,getSigneNumber,getSigneString,getSigneProduitNumber,getSigneProduitString,getCardNegatifs,orth_facteurs_n,setRegleSigneProduit,setRegleSigneQuotient,ListeFraction,sortFractions,ppcm,reduceSameDenominateur,fraction,Fraction,nombreEnLettres,partieEntiereEnLettres,telechargeFichier,intro_LaTeX,intro_LaTeX_coop,preambule_personnalise,scratchTraductionFr} from "/modules/outils.js"
import {ObjetMathalea2D,Point,point,TracePoint,tracePoint,TracePointSurDroite,tracePointSurDroite,milieu,pointSurSegment,pointSurCercle,pointSurDroite,pointIntersectionDD,pointAdistance,LabelPoint,labelPoint,barycentre,Droite,droite,droiteParPointEtVecteur,droiteParPointEtParallele,droiteParPointEtPerpendiculaire,droiteHorizontaleParPoint,droiteVerticaleParPoint,droiteParPointEtPente,mediatrice,CodageMediatrice,codageMediatrice,CodageMilieu,codageMilieu,ConstructionMediatrice,constructionMediatrice,bissectrice,CodageBissectrice,codageBissectrice,ConstructionBissectrice,constructionBissectrice,Polyline,polyline,Vecteur,vecteur,Segment,segment,segmentAvecExtremites,demiDroite,demiDroiteAvecExtremite,Polygone,polygone,polygoneAvecNom,polygoneRegulier,polygoneRegulierIndirect,carre,carreIndirect,CodageCarre,codageCarre,polygoneRegulierParCentreEtRayon,triangle2points2longueurs,triangle2points2angles,triangle2points1angle1longueur,triangle2points1angle1longueurOppose,NommePolygone,nommePolygone,deplaceLabel,aireTriangle,Cercle,cercle,pointIntersectionLC,pointIntersectionCC,CercleCentrePoint,cercleCentrePoint,Arc,arc,ArcPointPointAngle,arcPointPointAngle,traceCompas,CourbeDeBezier,courbeDeBezier,SegmentMainLevee,segmentMainLevee,CercleMainLevee,cercleMainLevee,DroiteMainLevee,droiteMainLevee,PolygoneMainLevee,polygoneMainLevee,ArcMainLevee,arcMainLevee,dansLaCibleCarree,dansLaCibleRonde,CibleCarree,cibleCarree,CibleRonde,cibleRonde,translation,translation2Points,rotation,homothetie,symetrieAxiale,distancePointDroite,projectionOrtho,affiniteOrtho,similitude,TranslationAnimee,translationAnimee,RotationAnimee,rotationAnimee,HomothetieAnimee,homothetieAnimee,SymetrieAnimee,symetrieAnimee,AffiniteOrthoAnimee,affiniteOrthoAnimee,montrerParDiv,cacherParDiv,afficherTempo,afficherTempoId,afficherUnParUn,medianeTriangle,centreGraviteTriangle,hauteurTriangle,CodageHauteurTriangle,codageHauteurTriangle,CodageMedianeTriangle,codageMedianeTriangle,orthoCentre,centreCercleCirconscrit,CodageAngleDroit,codageAngleDroit,AfficheLongueurSegment,afficheLongueurSegment,TexteSurSegment,texteSurSegment,AfficheMesureAngle,afficheMesureAngle,AfficheCoteSegment,afficheCoteSegment,CodeSegment,codeSegment,CodeSegments,codeSegments,CodeAngle,codeAngle,DroiteGraduee,droiteGraduee,DroiteGraduee2,droiteGraduee2,Axes,axes,LabelX,labelX,LabelY,labelY,Grille,grille,GrilleHorizontale,grilleHorizontale,GrilleVerticale,grilleVerticale,Seyes,seyes,Repere,repere,Repere2,repere2,pointDansRepere,TraceGraphiqueCartesien,traceGraphiqueCartesien,TraceBarre,traceBarre,TraceBarreHorizontale,traceBarreHorizontale,LectureImage,lectureImage,LectureAntecedent,lectureAntecedent,Courbe,courbe,Courbe2,courbe2,CourbeInterpolee,courbeInterpolee,GraphiqueInterpole,graphiqueInterpole,imageInterpolee,antecedentInterpole,AntecedentParDichotomie,CrochetD,crochetD,CrochetG,crochetG,intervalle,TexteParPoint,texteParPoint,texteParPosition,LatexParPoint,latexParPoint,latexParCoordonnees,FractionParPosition,fractionParPosition,Print2d,print2d,longueur,norme,angle,angleOriente,angleradian,ObjetLutin,creerLutin,avance,baisseCrayon,leveCrayon,orienter,tournerG,tournerD,allerA,mettrexA,mettreyA,ajouterAx,ajouterAy,AfficherCrayon,afficherCrayon,TranslationInstrument,translationInstrument,deplaceInstrument,codeSvg,codeTikz,mathalea2d,Labyrinthe,labyrinthe,Pavage,pavage} from "/modules/2d.js"
/**
 * @Auteur Stéphane Guyon
 */
export default function calcul_coordonnees_vecteurs() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Déterminer les coordonnées d'un vecteur.";

    this.nb_questions = 2;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.sup = 1; // 
    this.nouvelle_version = function () {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées
        let type_de_questions_disponibles = [1];


        let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
        for (let i = 0, ux, uy, xA, yA, xB, yB, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
            type_de_questions = liste_type_de_questions[i];
            switch (type_de_questions) {
                // Cas par cas, on définit le type de nombres que l'on souhaite
                // Combien de chiffres ? Quelles valeurs ?
                case 1:


                    xA = randint(0, 5) * choice([-1, 1]);
                    yA = randint(0, 5) * choice([-1, 1]);
                    ux = randint(1, 5) * choice([-1, 1]);
                    uy = randint(1, 5) * choice([-1, 1]);
                    xB = xA + ux;

                    yB = yA + uy;


                    texte = `Dans un repère orthonormé $(O,\\vec i,\\vec j)$, on donne les points suivants :`;
                    texte += ` $A\\left(${xA};${yA}\\right)$ et $B\\left(${xB};${yB}\\right)$`;
                    texte += `<br>Déterminer les coordonnées du vecteur $\\overrightarrow{AB}$ `;



                    texte_corr = `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d'un repère,`;
                    texte_corr += ` <br>alors on a : $\\overrightarrow{AB}\\begin{pmatrix}x_B-x_A  \\\\y_B-y_A\\end{pmatrix}$<br>`;
                    texte_corr += ` <br>On applique ici aux données de l'énoncé :`;
                    texte_corr += ` $\\overrightarrow{AB}\\begin{pmatrix}${xB}-${ecriture_parenthese_si_negatif(xA)}  \\\\${yB}-${ecriture_parenthese_si_negatif(yA)}\\end{pmatrix}$<br>`;
                    texte_corr += `Ce qui donne au final : $\\overrightarrow{AB}\\begin{pmatrix}${xB - xA}  \\\\${yB - yA}\\end{pmatrix}$<br>`;
                    break;
                case 2:



                    break;


            }
            if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
                this.liste_questions.push(texte);
                this.liste_corrections.push(texte_corr);
                i++;
            }
            cpt++;
        }
        liste_de_question_to_contenu(this);
    };
}
