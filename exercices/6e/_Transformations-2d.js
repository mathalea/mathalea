import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu_sans_numero,randint,choice,combinaison_listes,image_point_par_transformation,tex_fraction_reduite,num_alpha} from "/modules/outils.js"

/**
 * Transformations : trouvers un point numéroté par une des transformations du plan. Fonction générale utilisée sur tous les niveaux
 * @Auteur Jean-Claude Lhote
 * Pas de version LaTeX
 */
export default function Transformations() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()

  // this.titre = "Trouver l'image d'un point par une transformation du plan";
  this.consigne = "";
  this.nb_questions = 1;
  this.nb_questions_modifiable = false;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.pas_de_version_LaTeX = true;
  // this.sup = 1; // 1 pour les 6ème, 2 pour les 5èmes, 3 pour les 4èmes, et 4 pour les 3èmes.
  sortie_html ? (this.spacing_corr = 2.5) : (this.spacing_corr = 1.5);
  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = [];
    this.liste_corrections = []; // Liste de questions corrigées
    let antecedents = [0, 0, 0],
      images = [0, 0, 0],
      k = [1, 1, 1],
      k1,
      k2,
      xO = 4,
      yO = 4,
      xu,
      yu,
      point_reseau; // k : rapports d'homothéties, (xO,yO) point de rencontre des droites et centre, les composantes du vecteur de translation : (xu,yu)
    let bis1 = 0,
      bis2 = 0,
      xx = 0,
      yy = 0,
      AfficheO = 1,
      AfficheN = 0,
      AfficheM = 0;
    let n = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    let texte = ``,
      texte_corr = ``;
    let point = [[]];
    let transformation = parseInt(this.sup) - 1;
    let liste_type_de_questions = [
      [1, 2, 3, 4],
      [1, 2, 3, 4, 7],
      [1, 2, 3, 4, 7, 8],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ];
    let choix_transformation = combinaison_listes(
      liste_type_de_questions[transformation],
      3
    );
    xu = randint(-3, 3);
    if (xu == 0)
      yu = randint(-3, 3, [0]);

    // pas de vecteur nul de translation.
    else
      yu = randint(-3, 3);
    for (let j = 0; j < 3; j++) {
      if (choix_transformation[j] == 10) {
        k[j] = choice([2, 4]) * randint(-1, 1, [0]); // rapport d'homothétie < 1 ( 0.5 ou 0.25 )
        k2 = k[j];
      } else if (choix_transformation[j] == 9) {
        k[j] = choice([1, 2, 3]) * randint(-1, 1, [0]); // rapport d'homothétie >=1 (1,2 ou 3)
        k1 = k[j];
      }
      antecedents[j] = randint(0, 99);
      point[j] = image_point_par_transformation(
        choix_transformation[j],
        [antecedents[j] % 10, Math.floor(antecedents[j] / 10)],
        [xO, yO],
        [xu, yu],
        k[j]
      );
      images[j] = point[j][0] + point[j][1] * 10;
      // Limitation des points invariants
      if (choix_transformation[j] == 1 && images[j] % 11 == 0)
        point[j][0] = -1; // Point impossible sur (d1) pour sa symétrie
      if (choix_transformation[j] == 3 && Math.floor(images[j] / 10 == 4))
        point[j][0] = -1; // Point impossible sur (d3) pour sa symétrie
      if (choix_transformation[j] == 4 && images[j] % 10 == 4)
        point[j][0] = -1; // Point impossible sur  (d4) pour sa symétrie
      if ((choix_transformation[j] == 5 || choix_transformation[j] == 5) &&
        antecedents[j] == 44)
        point[j][0] = -1; // point O impossible pour rotation
      if (choix_transformation[j] == 10 && antecedents[j] == 44)
        point[j][0] = -1; // point O impossible par homothétie de rapport 1/k2

      // pour éviter les points en dehors des clous dans homothétie de rapport 1/k2
      if (point[j][0] - Math.floor(point[j][0]) == 0 &&
        point[j][1] - Math.floor(point[j][1]) == 0)
        point_reseau = true;
      else
        point_reseau = false;
      // On vérifie que l'image est bien un point du réseau sinon, on change.
      while (point[j][0] < 0 ||
        point[j][0] > 9 ||
        point[j][1] < 0 ||
        point[j][1] > 9 ||
        point_reseau == false) {
        if (choix_transformation[j] == 10) {
          k[j] = choice([2, 4]) * randint(-1, 1, [0]); // rapport d'homothétie < 1 ( 0.5 ou 0.25 )
          k2 = k[j];
        } else if (choix_transformation[j] == 9) {
          k[j] = choice([1, 2, 3]) * randint(-1, 1, [0]); // rapport d'homothétie >=1 (1,2 ou 3)
          k1 = k[j];
        }
        antecedents[j] = randint(0, 99);
        point[j] = image_point_par_transformation(
          choix_transformation[j],
          [antecedents[j] % 10, Math.floor(antecedents[j] / 10)],
          [xO, yO],
          [xu, yu],
          k[j]
        );
        images[j] = point[j][0] + point[j][1] * 10;
        // Limitation des points invariants
        if (choix_transformation[j] == 1 && images[j] % 11 == 0)
          point[j][0] = -1; // Point impossible sur (d1) pour sa symétrie
        if (choix_transformation[j] == 3 && Math.floor(images[j] / 10 == 4))
          point[j][0] = -1; // Point impossible sur (d3) pour sa symétrie
        if (choix_transformation[j] == 4 && images[j] % 10 == 4)
          point[j][0] = -1; // Point impossible sur  (d4) pour sa symétrie
        if ((choix_transformation[j] == 5 || choix_transformation[j] == 5) &&
          antecedents[j] == 44)
          point[j][0] = -1; // point O impossible pour rotation
        if (choix_transformation[j] == 10 && antecedents[j] == 44)
          point[j][0] = -1; // point O impossible par homothétie de rapport 1/k2


        // pour éviter les points en dehors des clous dans homothétie de rapport 1/k2
        if (point[j][0] - Math.floor(point[j][0]) == 0 &&
          point[j][1] - Math.floor(point[j][1]) == 0)
          point_reseau = true;
        else
          point_reseau = false;
      }
    }
    // n[i] est un tableau contenant -1 pour la transformation d'indice i si elle n'est pas utilisée, et contenant le numéro du point concerné si la transformation i est utilisée pour ce point.
    // Je l'utilise pour faire apparaître la correction liée au point et à la transformation.
    for (let j = 0; j < 3; j++) {
      n[choix_transformation[j] - 1] = antecedents[j];
    }
    for (let i = 0; i < 3; i++) {
      switch (choix_transformation[i]) {
        case 1:
          bis1 = 1;
          texte +=
            num_alpha(i) +
            ` Donner le numéro du symétrique du point ${antecedents[i]} par rapport à la droite $(d_1)$.<br>`;
          texte_corr +=
            num_alpha(i) +
            ` Le symétrique du point ${antecedents[i]} par rapport à $(d_1)$ est le point ${images[i]}.<br>`;
          break;

        case 2:
          bis2 = 1;
          texte +=
            num_alpha(i) +
            ` Donner le numéro du symétrique du point ${antecedents[i]} par rapport à la droite $(d_2)$.<br>`;
          texte_corr +=
            num_alpha(i) +
            ` Le symétrique du point ${antecedents[i]} par rapport à $(d_2)$ est le point ${images[i]}.<br>`;
          break;

        case 3:
          xx = 1;
          texte +=
            num_alpha(i) +
            ` Donner le numéro du symétrique du point ${antecedents[i]} par rapport à la droite $(d_3)$.<br>`;
          texte_corr +=
            num_alpha(i) +
            ` Le symétrique du point ${antecedents[i]} par rapport à $(d_3)$ est le point ${images[i]}.<br>`;
          break;

        case 4:
          yy = 1;
          texte +=
            num_alpha(i) +
            ` Donner le numéro du symétrique du point ${antecedents[i]} par rapport à la droite $(d_4)$.<br>`;
          texte_corr +=
            num_alpha(i) +
            ` Le symétrique du point ${antecedents[i]} par rapport à $(d_4)$ est le point ${images[i]}.<br>`;
          break;

        case 5:
          AfficheO = 1;
          texte +=
            num_alpha(i) +
            ` Donner le numéro de  l'image du point ${antecedents[i]} par la rotation de centre O et d'angle 90° dans le sens anti-horaire.<br>`;
          texte_corr +=
            num_alpha(i) +
            ` L'image du point ${antecedents[i]} par la rotation de centre O et d'angle 90° dans le sens anti-horaire est le point ${images[i]}.<br>`;
          break;

        case 6:
          AfficheO = 1;
          texte +=
            num_alpha(i) +
            ` Donner le numéro de  l'image du point ${antecedents[i]} par la rotation de centre O et d'angle 90° dans le sens horaire.<br>`;
          texte_corr +=
            num_alpha(i) +
            ` L'image du point ${antecedents[i]} par la rotation de centre O et d'angle 90° dans le sens horaire est le point ${images[i]}.<br>`;
          break;

        case 7:
          AfficheO = 1;
          texte +=
            num_alpha(i) +
            ` Donner le numéro de l'image du point ${antecedents[i]} par la symétrie de centre O.<br>`;
          texte_corr +=
            num_alpha(i) +
            ` L'image du point ${antecedents[i]} par la symétrie de centre O est le point ${images[i]}.<br>`;
          break;

        case 11:
          AfficheO = 1;
          texte +=
            num_alpha(i) +
            ` Donner le numéro de l'image du point ${antecedents[i]} par la rotation de centre O et d'angle 60° dans le sens anti-horaire.<br>`;
          texte_corr +=
            num_alpha(i) +
            ` L'image du point ${antecedents[i]} par la rotation de centre O et d'angle 60° dans le sens anti-horaire est le point ${images[i]}.<br>`;
          break;

        case 12:
          AfficheO = 1;
          texte +=
            num_alpha(i) +
            ` Donner le numéro de l'image du point ${antecedents[i]} par la rotation de centre O et d'angle 60° dans le sens horaire.<br>`;
          texte_corr +=
            num_alpha(i) +
            ` L'image du point ${antecedents[i]} par la rotation de centre O et d'angle 60° dans le sens horaire est le point ${images[i]}.<br>`;
          break;

        case 13:
          AfficheO = 1;
          texte +=
            num_alpha(i) +
            ` Donner le numéro de l'image du point ${antecedents[i]} par la rotation de centre O et d'angle 120° dans le sens anti-horaire.<br>`;
          texte_corr +=
            num_alpha(i) +
            ` L'image du point ${antecedents[i]} par la rotation de centre O et d'angle 120° dans le sens anti-horaire est le point ${images[i]}.<br>`;
          break;

        case 14:
          AfficheO = 1;
          texte +=
            num_alpha(i) +
            ` Donner le numéro de l'image du point ${antecedents[i]} par la rotation de centre O et d'angle 120° dans le sens horaire.<br>`;
          texte_corr +=
            num_alpha(i) +
            ` L'image du point ${antecedents[i]} par la rotation de centre O et d'angle 120° dans le sens horaire est le point ${images[i]}.<br>`;
          break;

        case 8:
          AfficheN = 1;
          AfficheM = 1;
          // AfficheOO=1
          texte +=
            num_alpha(i) +
            ` Donner le numéro de l'image du point ${antecedents[i]} par la translation qui transforme M en N.<br>`;
          texte_corr +=
            num_alpha(i) +
            ` L'image du point ${antecedents[i]} par la translation qui transforme M en N est le point ${images[i]}.<br>`;
          break;

        case 9:
          AfficheO = 1;
          texte +=
            num_alpha(i) +
            ` Donner le numéro de l'image du point ${antecedents[i]} par l'homothétie de centre O et de rapport ${k1}.<br>`;
          texte_corr +=
            num_alpha(i) +
            ` L'image du point ${antecedents[i]} par l'homothétie de centre O et de rapport ${k1} est le point ${images[i]}.<br>`;
          break;

        case 10:
          AfficheO = 1;
          texte +=
            num_alpha(i) +
            ` Donner le numéro de l'image du point ${antecedents[i]} par l'homothétie de centre O et de rapport $${tex_fraction_reduite(
              1,
              k2
            )}$.<br>`;
          texte_corr +=
            num_alpha(i) +
            ` L'image du point ${antecedents[i]} par l'homothétie de centre O et de rapport $${tex_fraction_reduite(
              1,
              k2
            )}$ est le point ${images[i]}.<br>`;
          break;
      }
    }
    if (sortie_html) {
      /*
      booléens permettant l'affichage des éléments si =1 et le masquage si =0
      bis1 affiche la droite de coefficient directeur 1 passant par O'
      bis2 affiche la droite de coefficient directeur -1 passant par O'
      xx' affiche la droite horizontale passant par O'
      yy' affiche la droite verticale passant par O'
      AfficheO' affiche O' comme son nom l'indique.
      AfficheN, AffichM pour afficher les points M et N définissant la translation.
        
      */
      this.MG32code_pour_modifier_la_figure = `
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "t0", "${choix_transformation[0]}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "t1", "${choix_transformation[1]}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "t2", "${choix_transformation[2]}");						
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "num0", "${antecedents[0]}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "num1", "${antecedents[1]}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "num2", "${antecedents[2]}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "yO", "${yO}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "xO", "${xO}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "yN", "${yu}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "xN", "${xu}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "yy\'", "${yy}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "xx\'", "${xx}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "bis1", "${bis1}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "bis2", "${bis2}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "AfficheO", "${AfficheO}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "AfficheM", "${AfficheM}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "AfficheN", "${AfficheN}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "k", "${k1}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "k2", "${k2}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "n1", "${n[0]}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "n2", "${n[1]}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "n3", "${n[2]}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "n4", "${n[3]}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "n5", "${n[4]}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "n6", "${n[5]}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "n7", "${n[6]}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "n8", "${n[7]}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "n9", "${n[8]}");	
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "n10", "${n[9]}");									
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "num0", "${antecedents[0]}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "num1", "${antecedents[1]}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "num2", "${antecedents[2]}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yO", "${yO}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xO", "${xO}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yN", "${yu}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xN", "${xu}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yy\'", "${yy}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xx\'", "${xx}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "bis1", "${bis1}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "bis2", "${bis2}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "AfficheO", "${AfficheO}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "AfficheM", "${AfficheM}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "AfficheN", "${AfficheN}");	

			
			
			mtg32App.calculate("MG32svg${numero_de_l_exercice}");
			mtg32App.display("MG32svg${numero_de_l_exercice}");
			mtg32App.calculate("MG32svgcorr${numero_de_l_exercice}");
			mtg32App.display("MG32svgcorr${numero_de_l_exercice}");
			`;
      this.liste_questions.push(texte);
      this.liste_corrections.push(texte_corr);
      liste_de_question_to_contenu_sans_numero(this);
    } else {
      texte = ``;
      texte_corr = ``;
      this.liste_questions.push(texte); // on envoie la question
      this.liste_corrections.push(texte_corr);
      liste_de_question_to_contenu_sans_numero(this);
    }
  };
  // this.besoin_formulaire_numerique = ['Transformations',5, '1 : Symétries axiales\n 2 : Symétries centrales\n 3 : Rotations\n 4 : Translations\n 5 : Homothéties\n'];
}
