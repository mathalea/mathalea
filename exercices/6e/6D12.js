import Exercice from '../ClasseExercice.js';
//import {liste_de_question_to_contenu,liste_de_choses_a_imprimer,liste_de_question_to_contenu_sans_numero,liste_de_question_to_contenu_sans_numero_et_sans_consigne,deuxColonnes,egal,superieur,inferieur,superieurouegal,inferieurouegal,estentier,quotientier,carreParfait,ecrireNombre2D,ecrireAdditionPosee,decimal,creer_couples,randint,strRandom,enleve_element,enleve_element_bis,enleve_element_No,enleve_element_No_bis,choice,range,rangeMinMax,range1,compare_fractions,compare_nombres,numTrie,shuffle,shuffle2tableaux,tridictionnaire,filtreDictionnaire,combinaison_listes,combinaison_listes_sans_changer_ordre,rien_si_1,exposant,ecriture_nombre_relatif,ecriture_nombre_relatifc,ecriture_algebrique,ecriture_algebrique_sauf1,ecriture_algebriquec,ecriture_parenthese_si_negatif,ecriture_parenthese_si_moins,valeur_base,produit_matrice_vecteur_3x3,produit_matrice_matrice_3x3,changement_de_base_ortho_tri,changement_de_base_tri_ortho,image_point_par_transformation,signe,unSiPositifMoinsUnSinon,somme_des_chiffre,arrondi,troncature,abs,arrondi_virgule,pgcd,fraction_simplifiee,tex_fraction_reduite,simplification_de_fraction_avec_etapes,produits_en_croix,quatrieme_proportionnelle,reduire_ax_plus_b,obtenir_liste_facteurs_premiers,factorisation,extraire_racine_carree,tex_racine_carree,calcul,nombreDecimal,tex_nombrec,tex_nombrecoul,somme_des_termes_par_signe,trie_positifs_negatifs,creerNomDePolygone,possedeUnCaractereInterdit,choisit_nombres_entre_m_et_n,choisit_lettres_differentes,lettre_depuis_chiffre,lettre_minuscule_depuis_chiffre,minToHoraire,minToHour,prenomF,prenomM,prenom,tirer_les_des,liste_de_notes,jours_par_mois,un_mois_de_temperature,nom_du_mois,tex_enumerate,tex_enumerate_sans_numero,tex_paragraphe,tex_introduction,html_enumerate,enumerate,html_paragraphe,html_ligne,tex_multicols,html_consigne,tex_consigne,tex_nombre,tex_nombre2,sp,nombre_avec_espace,string_nombre,mise_en_evidence,texte_en_couleur,texte_en_couleur_et_gras,couleurAleatoire,arcenciel,texcolors,texte_gras,href,tex_prix,premiere_lettre_en_majuscule,nombre_de_chiffres_dans_la_partie_decimale,tex_fraction_signe,tex_fraction_parentheses,obtenir_liste_fractions_irreductibles,obtenir_liste_nombres_premiers,decomposition_facteurs_premiers,liste_des_diviseurs,tex_fraction,printlatex,tex_texte,itemize,MG32_modifie_figure,MG32_modifie_toutes_les_figures,MG32_ajouter_figure,MG32_tracer_toutes_les_figures,verifie_div_MG32,SVG_Axe_vertical,SVG_Axe_horizontal,SVG_grille,SVG_graduation,SVG_label,SVG_fraction,SVG_tracer_point,SVG_tracer_flecheH,SVG_tracer_flecheV,SVG_tracer_droite_flecheV,SVG_tracer_droite_flecheH,SVG_Tracer_droite,Latex_Tracer_droite,SVG_repere,Latex_repere,SVG_reperage_sur_un_axe,Latex_reperage_sur_un_axe,tex_graphique,MatriceCarree,matriceCarree,resol_sys_lineaire_2x2,resol_sys_lineaire_3x3,crible_polynome_entier,cherche_min_max_f,cherche_polynome_deg3_a_extrema_fixes,simpExp,puissance,ecriturePuissance,simpNotPuissance,eclatePuissance,puissanceEnProduit,reorganiseProduitPuissance,creer_modal,modal_texte_court,modal_youtube,modal_texte_long,modal_url,modal_pdf,modal_video,modal_image,liste_diviseurs,tikz_machine_maths,tikz_machine_diag,katex_Popup,katex_Popuptest,sansAccent,katex_Popup2,katex_Popup2,num_alpha,SVG_fleche_machine_maths,SVG_chemin,SVG_machine_diag_3F1_act_mono,my_svg_font,SVG_machine_maths,tex_cadre_par_orange,SVG_machine_diag_3F12,machine_maths_video,detect_safari_chrome_browser,premierMultipleSuperieur,premierMultipleInferieur,liste_nb_premiers_strict_jusqua,crible_eratosthene_n,premiers_entre_bornes,texte_ou_pas,tab_C_L,warn_message,info_message,lampe_message,SVG_engrenages,decomp_fact_prem_array,Triangles,getNom,getCotes,getLongueurs,getLongueursValeurs,getAngles,getAnglesValeurs,getSommets,getPerimetre,isTrueTriangleLongueurs,isPlatTriangleLongueurs,isTrueTriangleAngles,isPlatTriangleAngles,isQuelconque,Relatif,getSigneNumber,getSigneString,getSigneProduitNumber,getSigneProduitString,getCardNegatifs,orth_facteurs_n,setRegleSigneProduit,setRegleSigneQuotient,ListeFraction,sortFractions,ppcm,reduceSameDenominateur,fraction_simplifiee,fraction,Fraction,nombreEnLettres,partieEntiereEnLettres,telechargeFichier,intro_LaTeX,intro_LaTeX_coop,preambule_personnalise} from "/modules/outils.js"
import {liste_de_question_to_contenu,randint,combinaison_listes,minToHoraire,minToHour,prenomF,prenom,katex_Popup2,fraction_simplifiee} from "/modules/outils.js"


/**
 * Problèmes où il faut calculer la durée d'un évèbement ou un horaire.
 * Paramétrage possible :
 * * 1 : calculs de durées
 * * 2 : calculer l'heure de début
 * * 3 : calculer l'heure de fin
 * * 4 : mélange des 3 types précédents
 * @Auteur Rémi Angot
 * Référence 6D12
 */
export default function Calculs_de_durees_ou_d_horaires() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Calculer des durées ou déterminer un horaire";
  this.consigne = "";
  this.sup = 4;
  this.spacing = 2;
  this.nb_questions = 3;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    const type_de_contexte = combinaison_listes(
      [1, 2, 3, 4, 5],
      this.nb_questions
    );
    let type_de_questions; // 1 : calcul de durées // 2 : calcul de l'horaire de début // 3 : calcul de l'horaire de fin // 4 : mélange

    if (this.sup < 4) {
      // que des questions de niveau 1 ou que des questions de niveau 2
      type_de_questions = combinaison_listes([this.sup], this.nb_questions);
    } else {
      // un mélange équilibré de questions
      type_de_questions = combinaison_listes([1, 2, 3], this.nb_questions);
    }

    for (let i = 0, d1, h1, m1, d2, h2, m2, d, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
      //d1 : heure de début (h1 heures m1 min)
      //d2 : heure de fin (h2 heures m2 min)
      //d : durée
      if (type_de_contexte[i] == 1) {
        h1 = randint(20, 22);
        m1 = randint(35, 58);
        d1 = h1 * 60 + m1;
        h2 = h1 + 2;
        m2 = randint(1, m1); // pour s'assurer qu'il y a une retenue dans d2-d1
        d2 = h2 * 60 + m2;
        d = d2 - d1;
        d1 = minToHoraire(d1);
        d2 = minToHoraire(d2);
        d = minToHour(d);

        if (type_de_questions[i] == 1) {
          texte = `La diffusion d'un film commence à ${d1} et se termine à ${d2}. Combien de temps a duré ce film ?`;
          texte_corr = `${d2} - ${d1} = ${d}`;
          texte_corr += "<br>";
          texte_corr += `Le film dure ${d}.`;
        }
        if (type_de_questions[i] == 2) {
          texte = `Un film dure ${d} et commence à ${d1}. À quelle heure se terminera-t-il ?`;
          texte_corr = `${d1} + ${d} = ${d2}`;
          texte_corr += "<br>";
          texte_corr += `Le film terminera à ${d2}.`;
        }
        if (type_de_questions[i] == 3) {
          texte = `Un film de ${d} termine à ${d2}. À quelle heure a-t-il commencé ?`;
          texte_corr = `${d2} - ${d} = ${d1}`;
          texte_corr += "<br>";
          texte_corr += `Le film a commencé à ${d1}.`;
        }
      }

      if (type_de_contexte[i] == 2) {
        h1 = randint(20, 23);
        m1 = randint(35, 58);
        d1 = h1 * 60 + m1;
        h2 = h1 + 1;
        m2 = randint(1, m1); // pour s'assurer qu'il y a une retenue dans d2-d1
        d2 = h2 * 60 + m2;
        d = d2 - d1;
        while (d < 27 || d > 75 || d == 60) {
          h1 = randint(20, 23);
          m1 = randint(35, 58);
          d1 = h1 * 60 + m1;
          h2 = h1 + 2;
          m2 = randint(1, m1); // pour s'assurer qu'il y a une retenue dans d2-d1
          d2 = h2 * 60 + m2;
          d = d2 - d1;
        }
        d1 = minToHoraire(d1);
        d2 = minToHoraire(d2);
        d = minToHour(d);

        if (type_de_questions[i] == 1) {
          texte = `Sur son service de streaming favori, ${prenom()} commence à regarder une série à ${d1} et celle-ci se termine à ${d2}. Combien de temps a duré l'épisode ?`;
          texte_corr = `${d2} - ${d1} = ${d}`;
          texte_corr += "<br>";
          texte_corr += `La série a duré ${d}.`;
        }
        if (type_de_questions[i] == 2) {
          texte = `${prenom()} allume son ordinateur à ${d1} pour regarder une série de ${d}. À quelle heure la série s'achèvera-t-elle ?`;
          texte_corr = `${d1} + ${d} = ${d2}`;
          texte_corr += "<br>";
          texte_corr += `La série s'achèvera à ${d2}.`;
        }
        if (type_de_questions[i] == 3) {
          texte = `${prenom()} termine de regarder une série de ${d} à ${d2}. À quelle la série a-t-elle commencé ?`;
          texte_corr = `${d2} - ${d} = ${d1}`;
          texte_corr += "<br>";
          texte_corr += `Elle a commencé à ${d1}.`;
        }
      }

      if (type_de_contexte[i] == 3) {
        h1 = randint(8, 21);
        m1 = randint(1, 58);
        d1 = h1 * 60 + m1;
        h2 = h1 + randint(1, 2);
        m2 = randint(1, 59); // pas forcément de retenue dans d2-d1
        d2 = h2 * 60 + m2;
        d = d2 - d1;
        d1 = minToHoraire(d1);
        d2 = minToHoraire(d2);
        d = minToHour(d);

        if (type_de_questions[i] == 1) {
          texte = `Une émission télévisée est diffusée de ${d1} à ${d2}. Combien de temps dure-t-elle ?`;
          texte_corr = `${d2} - ${d1} = ${d}`;
          texte_corr += "<br>";
          texte_corr += `L'émission dure ${d}.`;
        }
        if (type_de_questions[i] == 2) {
          texte = `Une émission télévisée de ${d} commence à ${d1}. À quelle heure s'achèvera-t-elle ?`;
          texte_corr = `${d1} + ${d} = ${d2}`;
          texte_corr += "<br>";
          texte_corr += `L'émission s'achèvera à ${d2}.`;
        }
        if (type_de_questions[i] == 3) {
          texte = `À ${d2}, ${prenom()} termine de regarder une émission de ${d}. À quelle heure l'émission a-t-elle commencé ?`;
          texte_corr = `${d2} - ${d} = ${d1}`;
          texte_corr += "<br>";
          texte_corr += `L'émission a commencé à ${d1}.`;
        }
      }

      if (type_de_contexte[i] == 4) {
        h1 = randint(13, 16);
        m1 = randint(1, 58);
        d1 = h1 * 60 + m1;
        h2 = h1 + randint(1, 2);
        m2 = randint(1, 58); // pas forcément de retenue dans d2-d1
        d2 = h2 * 60 + m2;
        d = d2 - d1;
        while (d < 27 || d > 75 || d == 60) {
          h1 = randint(13, 16);
          m1 = randint(35, 58);
          d1 = h1 * 60 + m1;
          h2 = h1 + randint(1, 2);
          m2 = randint(1, m1); // pour s'assurer qu'il y a une retenue dans d2-d1
          d2 = h2 * 60 + m2;
          d = d2 - d1;
        }
        d1 = minToHoraire(d1);
        d2 = minToHoraire(d2);
        d = minToHour(d);

        if (type_de_questions[i] == 1) {
          texte = `Un papa regarde la compétition de gymnastique de sa fille  de ${d1} à ${d2}. Calculer la durée de cette compétition.`;
          texte_corr = `${d2} - ${d1} = ${d}`;
          texte_corr += "<br>";
          texte_corr += `La compétition dure ${d}.`;
        }
        if (type_de_questions[i] == 2) {
          texte = `Une compétition de gymnastique commence à ${d1} et dure ${d}. À quelle heure sera-t-elle terminée ?`;
          texte_corr = `${d1} + ${d} = ${d2}`;
          texte_corr += "<br>";
          texte_corr += `La compétition terminera à ${d2}.`;
        }
        if (type_de_questions[i] == 3) {
          texte = `Une compétition de gymnastique qui se termine à ${d2} a duré ${d}. À quelle heure a-t-elle commencé.`;
          texte_corr = `${d2} - ${d} = ${d1}`;
          texte_corr += "<br>";
          texte_corr += `La compétition a commencé à ${d1}.`;
        }
      }

      if (type_de_contexte[i] == 5) {
        h1 = randint(8, 15);
        m1 = randint(25, 58);
        d1 = h1 * 60 + m1;
        h2 = h1 + randint(2, 5);
        m2 = randint(1, m1); // pour s'assurer qu'il y a une retenue dans d2-d1
        d2 = h2 * 60 + m2;
        d = d2 - d1;
        while (d < 27 || d > 75 || d == 60) {
          h1 = randint(20, 23);
          m1 = randint(35, 58);
          d1 = h1 * 60 + m1;
          h2 = h1 + 2;
          m2 = randint(1, m1); // pour s'assurer qu'il y a une retenue dans d2-d1
          d2 = h2 * 60 + m2;
          d = d2 - d1;
        }
        d1 = minToHoraire(d1);
        d2 = minToHoraire(d2);
        d = minToHour(d);

        if (type_de_questions[i] == 1) {
          texte = `Un train part à ${d1} et arrive à destination à ${d2}. Calculer la durée du trajet.`;
          texte_corr = `${d2} - ${d1} = ${d}`;
          texte_corr += "<br>";
          texte_corr += `Le trajet dure ${d}.`;
        }
        if (type_de_questions[i] == 2) {
          texte = `${prenomF()} monte dans le train à ${d1} pour un trajet qui doit durer ${d}. À quelle heure arrivera-t-elle ?`;
          texte_corr = `${d1} + ${d} = ${d2}`;
          texte_corr += "<br>";
          texte_corr += `Elle arrivera à ${d2}.`;
        }
        if (type_de_questions[i] == 3) {
          texte = `Un train arrive en gare à ${d2} après un trajet de ${d}. À quelle heure le voyage a-t-il commencé ?`;
          texte_corr = `${d2} - ${d} = ${d1}`;
          texte_corr += "<br>";
          texte_corr += `Le voyage a commencé à ${d1}.`;
        }
      }

      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = [
    "Niveau de difficulté",
    4,
    "1 : Calcul de durée\n2 : Calcul de l'horaire de fin\n3 : Calcul de l'horaire de début\n4 : 3 types de questions",
  ];
}
