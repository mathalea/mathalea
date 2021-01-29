import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,liste_de_choses_a_imprimer,liste_de_question_to_contenu_sans_numero,liste_de_question_to_contenu_sans_numero_et_sans_consigne,deuxColonnes,egal,superieur,inferieur,superieurouegal,inferieurouegal,estentier,quotientier,carreParfait,ecrireNombre2D,decimal,creer_couples,randint,strRandom,enleve_element,enleve_element_bis,enleve_element_No,enleve_element_No_bis,choice,range,rangeMinMax,range1,compare_fractions,compare_nombres,numTrie,shuffle,shuffle2tableaux,tridictionnaire,filtreDictionnaire,combinaison_listes,combinaison_listes_sans_changer_ordre,rien_si_1,exposant,ecriture_nombre_relatif,ecriture_nombre_relatifc,ecriture_algebrique,ecriture_algebrique_sauf1,ecriture_algebriquec,ecriture_parenthese_si_negatif,ecriture_parenthese_si_moins,valeur_base,produit_matrice_vecteur_3x3,produit_matrice_matrice_3x3,changement_de_base_ortho_tri,changement_de_base_tri_ortho,image_point_par_transformation,signe,unSiPositifMoinsUnSinon,somme_des_chiffre,arrondi,troncature,abs,arrondi_virgule,pgcd,fraction_simplifiee,tex_fraction_reduite,produit_de_deux_fractions,simplification_de_fraction_avec_etapes,produits_en_croix,quatrieme_proportionnelle,reduire_ax_plus_b,obtenir_liste_facteurs_premiers,factorisation,extraire_racine_carree,tex_racine_carree,calcul,nombreDecimal,tex_nombrec,tex_nombrecoul,trie_positifs_negatifs,somme_des_termes_par_signe,creerNomDePolygone,possedeUnCaractereInterdit,choisit_nombres_entre_m_et_n,choisit_lettres_differentes,cesar,codeCesar,lettre_depuis_chiffre,lettre_minuscule_depuis_chiffre,minToHoraire,minToHour,prenomF,prenomM,prenom,tirer_les_des,liste_de_notes,jours_par_mois,un_mois_de_temperature,nom_du_mois,tex_enumerate,tex_enumerate_sans_numero,tex_paragraphe,tex_introduction,html_enumerate,enumerate,html_paragraphe,html_ligne,tex_multicols,html_consigne,tex_consigne,tex_nombre,tex_nombre2,tex_nombrec2,nombrec2,sp,nombre_avec_espace,string_nombre,mise_en_evidence,texte_en_couleur,texte_en_couleur_et_gras,couleurAleatoire,arcenciel,texcolors,texte_gras,href,tex_prix,premiere_lettre_en_majuscule,nombre_de_chiffres_dans_la_partie_decimale,tex_fraction_signe,tex_fraction_parentheses,obtenir_liste_fractions_irreductibles,obtenir_liste_fractions_irreductibles_faciles,obtenir_liste_nombres_premiers,decomposition_facteurs_premiers,liste_des_diviseurs,tex_fraction,printlatex,tex_texte,itemize,MG32_modifie_figure,MG32_modifie_toutes_les_figures,MG32_ajouter_figure,MG32_tracer_toutes_les_figures,SVG_Axe_vertical,SVG_Axe_horizontal,SVG_grille,SVG_graduation,SVG_label,SVG_fraction,SVG_tracer_point,SVG_tracer_flecheV,SVG_tracer_droite_flecheV,SVG_tracer_droite_flecheH,SVG_Tracer_droite,Latex_Tracer_droite,SVG_repere,Latex_repere,SVG_reperage_sur_un_axe,Latex_reperage_sur_un_axe,tex_graphique,MatriceCarree,matriceCarree,resol_sys_lineaire_2x2,resol_sys_lineaire_3x3,crible_polynome_entier,cherche_min_max_f,cherche_polynome_deg3_a_extrema_fixes,simpExp,puissance,ecriturePuissance,simpNotPuissance,eclatePuissance,puissanceEnProduit,reorganiseProduitPuissance,ordreDeGrandeur,creer_modal,creerBoutonMathalea2d,modal_texte_court,modal_youtube,modal_texte_long,modal_url,modal_pdf,modal_video,modal_image,liste_diviseurs,tikz_machine_maths,tikz_machine_diag,katex_Popup,katex_Popuptest,sansAccent,katex_Popup2,num_alpha,SVG_fleche_machine_maths,SVG_chemin,SVG_machine_diag_3F1_act_mono,my_svg_font,SVG_machine_maths,tex_cadre_par_orange,SVG_machine_diag_3F12,machine_maths_video,detect_safari_chrome_browser,premierMultipleSuperieur,premierMultipleInferieur,liste_nb_premiers_strict_jusqua,crible_eratosthene_n,premiers_entre_bornes,texte_ou_pas,tab_C_L,warn_message,info_message,lampe_message,SVG_engrenages,decomp_fact_prem_array,Triangles,Relatif,nombreEnLettres,partieEntiereEnLettres,Trouver_solution_mathador,telechargeFichier,intro_LaTeX,intro_LaTeX_coop,preambule_personnalise,scratchTraductionFr} from "/modules/outils.js"
import {point,tracePoint,tracePointSurDroite,milieu,pointSurSegment,pointSurCercle,pointSurDroite,pointIntersectionDD,pointAdistance,labelPoint,barycentre,droite,droiteParPointEtVecteur,droiteParPointEtParallele,droiteParPointEtPerpendiculaire,droiteHorizontaleParPoint,droiteVerticaleParPoint,droiteParPointEtPente,mediatrice,codageMediatrice,codageMilieu,constructionMediatrice,bissectrice,codageBissectrice,constructionBissectrice,polyline,pave,vecteur,segment,segmentAvecExtremites,demiDroite,demiDroiteAvecExtremite,polygone,polygoneAvecNom,polygoneRegulier,polygoneRegulierIndirect,carre,carreIndirect,codageCarre,polygoneRegulierParCentreEtRayon,triangle2points2longueurs,triangle2points2angles,triangle2points1angle1longueur,triangle2points1angle1longueurOppose,nommePolygone,deplaceLabel,aireTriangle,cercle,ellipse,pointIntersectionLC,pointIntersectionCC,cercleCentrePoint,arc,arcPointPointAngle,traceCompas,courbeDeBezier,segmentMainLevee,cercleMainLevee,droiteMainLevee,polygoneMainLevee,arcMainLevee,dansLaCibleCarree,dansLaCibleRonde,cibleCarree,cibleRonde,cibleCouronne,translation,translation2Points,rotation,sens_de_rotation,homothetie,symetrieAxiale,distancePointDroite,projectionOrtho,affiniteOrtho,similitude,translationAnimee,rotationAnimee,homothetieAnimee,symetrieAnimee,affiniteOrthoAnimee,montrerParDiv,cacherParDiv,afficherTempo,afficherTempoId,afficherUnParUn,medianeTriangle,centreGraviteTriangle,hauteurTriangle,CodageHauteurTriangle,codageHauteurTriangle,codageMedianeTriangle,orthoCentre,centreCercleCirconscrit,codageAngleDroit,afficheLongueurSegment,texteSurSegment,afficheMesureAngle,afficheCoteSegment,codeSegment,codeSegments,codeAngle,nomAngleSaillantParPosition,nomAngleRentrantParPosition,droiteGraduee,droiteGraduee2,axes,labelX,labelY,grille,grilleHorizontale,grilleVerticale,seyes,repere,repere2,pointDansRepere,traceGraphiqueCartesien,traceBarre,traceBarreHorizontale,lectureImage,lectureAntecedent,courbe,courbe2,courbeInterpolee,graphiqueInterpole,imageInterpolee,antecedentInterpole,crochetD,crochetG,intervalle,texteParPoint,texteParPosition,latexParPoint,latexParCoordonnees,fractionParPosition,print2d,longueur,norme,angle,angleOriente,angleradian,creerLutin,avance,baisseCrayon,leveCrayon,orienter,tournerG,tournerD,allerA,mettrexA,mettreyA,ajouterAx,ajouterAy,afficherCrayon,deplaceInstrument,codeSvg,codeTikz,mathalea2d,labyrinthe,pavage} from "/modules/2d.js"
import {point3d,vecteur3d,arete3d,droite3d,demicercle3d,cercle3d,polygone3d,sphere3d,cone3d,cylindre3d,prisme3d,pave3d,rotationV3d,rotation3d,translation3d} from "/modules/3d.js"
import {ListeFraction,obtenir_liste_Fractions_irreductibles_faciles,obtenir_liste_Fractions_irreductibles,fraction} from "/modules/Fractions.js"
/**
 * Déterminer une fonction affine à partir de deux images
* @auteur Stéphane Guyon
* 2F20
*/
export default function Factoriser_Identites_remarquables2() {
    'use strict';
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Déterminer une fonction affine à partir de deux images.";
    this.video = "";
    this.consigne = "Déterminer,en expliquant, l'expression de la fonctions affine $f$ vérifiant les conditions de l'énoncé :";
    this.nb_cols = 1;
    this.nb_cols_corr = 1;
    this.spacing = 1;
    this.spacing_corr = 1;
    this.nb_questions = 3;
    
    this.spacing_corr = 3

    this.nouvelle_version = function () {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées
             let type_de_questions_disponibles = [];
   
    type_de_questions_disponibles = [1]; 
            
        
        let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
        for (let i = 0, texte, texte_corr, cpt = 0, a, b, c, d, e, f,  k, fraction = [], ns, ds, type_de_questions; i < this.nb_questions && cpt < 50;) {
            type_de_questions = liste_type_de_questions[i];
            k = choice([-1, 1]); 
			a = randint(1, 9);
            a = a * k;
            b = randint(1, 9);
            k = choice([-1, 1]); 
            b = b * k;
            c = randint(1, 9,[a]);
            k = choice([-1, 1]); 
            c = c * k;
            c = randint(1, 9,[a]);
            
            d =randint(1, 9);
            k = choice([-1, 1]); 
            d = d * k;
            e=a*b-a*d;
            f=a-c;
           
            
            
           
                      switch (type_de_questions) {
                case 1:
                        texte = ` Déterminer l'expression algébrique de la fonction affine $f$ définie sur $\\mathbb R$, sachant que
                        $f(${a})=${b}$ et que $f(${c})=${d}$.`; 
                        texte_corr = `On sait que $f$ est une fonction affine qui vérifie 
                        $f(${a})=${b}$ et $f(${c})=${d}$. <br>`;
                        texte_corr += `Comme $f$ est une fonction affine, on sait d'après le cours qu'elle va s'écrire sous la forme $f(x)= a x+ b$ avec $a$ et $b$ des nombres réels.<br>`
                        texte_corr +=`L'objectif est donc de déterminer $a$ et $b$.<br>`
                        texte_corr +=`Or, on sait d'après le cours, que dans ces conditions, avec $u\\neq v$, on a :`  
                        texte_corr +=`$a=\\dfrac{f(u)-f(v)}{u-v}.$<br>` 
                        texte_corr +=`On applique cette relation avec les données de l'énoncé : $u=${a}$ et  $v=${c}$ ,<br>`
                        texte_corr +=`ce qui donne :`
                        texte_corr +=`$a=\\dfrac{f(${a})-f(${c})}{${a}-${ecriture_parentheses_si_negatif(c)}}=\\dfrac{${b}-${ecriture_parentheses_si_negatif(d)}}{${a}-${ecriture_parentheses_si_negatif(c)}}=\\dfrac{${b-d}}{${a-c}}$<br>`  
                        texte_corr +=`d'où : $a=${tex_fraction_reduite(b-d,a-c)}.$<br>`  
                    if (b==d){
                            texte_corr +=`$f$ est une fonction constante, cas particulier des fonctions affines.<br>`
                            texte_corr +=`On a donc : $f(x)=${b}$`
                    }
                    else {
                        texte_corr +=`On peut donc déjà déduire que la fonction $f$ s'écrit sous la forme : `
                        if ((b-d)/(a-c)==1){
                            texte_corr +=`$f(x)= x +b.$<br>` 
                        }
                        if ((b-d)/(a-c)==-1){
                            texte_corr +=`$f(x)= -x +b.$<br>` 
                        }
                        if (b-d!=a-c&&b-d!=-a+c)// cas général
                        {texte_corr +=`   $f(x)=${tex_fraction_reduite(b-d,a-c)} x +b.$<br>` 
                        }
                        texte_corr +=`On cherche $b$ et pour cela on peut utiliser au choix une des deux données de l'énoncé :<br>`   
                        texte_corr +=`On prend par exemple : $f(${a})=${b}$  <br>`
                        texte_corr +=`Comme`
                        if ((b-d)/(a-c)==1){
                            texte_corr +=`$f(x)= x +b.$<br>` 
                        }
                        if ((b-d)/(a-c)==-1){
                            texte_corr +=`$f(x)= -x +b.$<br>` 
                        }
                        if (b-d!=a-c&&b-d!=-a+c)// cas général
                         {texte_corr +=`   $f(x)=${tex_fraction_reduite(b-d,a-c)} x +b.$<br>` 
                        }
                        texte_corr +=`On en déduit que :$f(${a})=${tex_fraction_reduite(b-d,a-c)} \\times ${a} +b=${b}$<br>`
                        texte_corr +=`$\\phantom{On en deduit que :}\\iff b=${b}-${tex_fraction_reduite(e,f)}$<br>`  
                        texte_corr +=`$\\phantom{On en deduit que :}\\iff b=${tex_fraction_reduite(b*a-b*c-a*b+a*d,a-c)}$<br> ` 
                        texte_corr +=`On peut conclure que ` 
                        if (b-d==a-c) // cas où a=1
                           {
                            if((b*a-b*c-a*b+a*d)*(a-c)>0){
                            texte_corr +=`$f(x)= x +${tex_fraction_reduite(b*a-b*c-a*b+a*d,a-c)}.$<br>` 
                            }
                            else {
                                if (b*a-b*c==a*b+a*d)//cas où b=0
                                     {texte_corr +=`$f(x)= x.$<br>` 

                                        }
                                texte_corr +=`$f(x)= x ${tex_fraction_reduite(b*a-b*c-a*b+a*d,a-c)}.$<br>`     
                            }
                            }
                        if (b-d==-a+c)// cas où a=-1
                            {
                            if((b*a-b*c-a*b+a*d)*(a-c)>0)// b>0
                            {
                            texte_corr +=`$f(x)= -x +${tex_fraction_reduite(b*a-b*c-a*b+a*d,a-c)}.$<br>` 
                            }
                            else {
                                if (a*d-b*c==0)//cas où b=0
                                         {texte_corr +=`$f(x)= -x.$<br>` 
    
                                            }
                                else texte_corr +=`$f(x)= -x ${tex_fraction_reduite(b*a-b*c-a*b+a*d,a-c)}.$<br>` 
                                }
                            }
                        if (b-d!=a-c && b-d!=-a+c)// cas général
                            {
                            if((b*a-b*c-a*b+a*d)*(a-c)>0)// cas où b>0
                                {
                                texte_corr +=`$f(x)=${tex_fraction_reduite(b-d,a-c)}x+  ${tex_fraction_reduite(b*a-b*c-a*b+a*d,a-c)}$` 
                                }
                            else// cas où b<0
                                {
                                texte_corr +=`$f(x)=${tex_fraction_reduite(b-d,a-c)}x  ${tex_fraction_reduite(b*a-b*c-a*b+a*d,a-c)}$` 
                            }
                            
                       }   }
                        

                 break;
                 
            }
            if (this.liste_questions.indexOf(texte) == -1) {
                // Si la question n'a jamais été posée, on en créé une autre
                this.liste_questions.push(texte);
                this.liste_corrections.push(texte_corr);
                i++;
            }
            cpt++;
        }
        liste_de_question_to_contenu(this);
    };
    
}
