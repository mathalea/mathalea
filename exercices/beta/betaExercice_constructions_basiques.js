import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes} from "/modules/outils.js"
import {point,tracePoint,labelPoint,carre,rotation,codageAngleDroit,mathalea2d} from "/modules/2d.js"
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
  this.nouvelle_version = function () {
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

