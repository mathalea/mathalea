import { mathalea2d, point, droiteParPointEtPente, droiteHorizontaleParPoint, droiteVerticaleParPoint, tracePoint, labelPoint, segment, vecteur, texteParPosition, latexParCoordonnees, codeSegments, afficheMesureAngle, milieu, translation } from '../../modules/2d.js';
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
  // this.sup = 1; // 1 pour les 6ème, 2 pour les 5èmes, 3 pour les 4èmes, et 4 pour les 3èmes.
  sortie_html ? (this.spacing_corr = 2.5) : (this.spacing_corr = 1.5);
  this.nouvelle_version = function (numero_de_l_exercice) {
      let M=[],N=[],pointM,pointN
      let O=point(0,0,'O','below')
    let d1=droiteParPointEtPente(O,1) 
    let d3=droiteHorizontaleParPoint(O)
    let d2=droiteParPointEtPente(O,-1)
    let d4=droiteVerticaleParPoint(O)
    d1.isVisible=true
    d2.isVisible=true
    d3.isVisible=true
    d4.isVisible=true
    d1.epaisseur=2
    d2.epaisseur=2
    d3.epaisseur=2
    d4.epaisseur=2
    d1.color='green'
    d2.color='green'
    d3.color='green'
    d4.color='green'
    d1.opacite=0.5
    d2.opacite=0.5
    d3.opacite=0.5
    d4.opacite=0.5
      let objets_enonce = []
      let objets_correction = []
      for (let i=0;i<10;i++){
        for (let j=0;j<10;j++){
          objets_enonce.push(tracePoint(point(j-4,i-4)))
          objets_correction.push(tracePoint(point(j-4,i-4)))
          objets_enonce.push(texteParPosition(j+10*i,j-4.2,i-4.2,'milieu','gray',0.8,"middle",false))
          objets_correction.push(texteParPosition(j+10*i,j-4.2,i-4.2,'milieu','gray',0.8,"middle",false))
        }
      }
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
      punto_reseau; // k : rapports d'homothéties, (xO,yO) point de rencontre des droites et centre, les composantes du vecteur de translation : (xu,yu)

    let n = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    let texte = ``,
      texte_corr = ``;
    let punto = [[]];
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
      punto[j] = image_point_par_transformation(
        choix_transformation[j],
        [antecedents[j] % 10, Math.floor(antecedents[j] / 10)],
        [xO, yO],
        [xu, yu],
        k[j]
      );
      images[j] = punto[j][0] + punto[j][1] * 10;
      // Limitation des points invariants
      if (choix_transformation[j] == 1 && images[j] % 11 == 0)
        punto[j][0] = -1; // Point impossible sur (d1) pour sa symétrie
      if (choix_transformation[j] == 3 && Math.floor(images[j] / 10 == 4))
        punto[j][0] = -1; // Point impossible sur (d3) pour sa symétrie
      if (choix_transformation[j] == 4 && images[j] % 10 == 4)
        punto[j][0] = -1; // Point impossible sur  (d4) pour sa symétrie
      if ((choix_transformation[j] == 5 || choix_transformation[j] == 5) &&
        antecedents[j] == 44)
        punto[j][0] = -1; // point O impossible pour rotation
      if (choix_transformation[j] == 10 && antecedents[j] == 44)
        punto[j][0] = -1; // point O impossible par homothétie de rapport 1/k2

      // pour éviter les points en dehors des clous dans homothétie de rapport 1/k2
      if (punto[j][0] - Math.floor(punto[j][0]) == 0 &&
        punto[j][1] - Math.floor(punto[j][1]) == 0)
        punto_reseau = true;
      else
        punto_reseau = false;
      // On vérifie que l'image est bien un point du réseau sinon, on change.
      while (punto[j][0] < 0 ||
        punto[j][0] > 9 ||
        punto[j][1] < 0 ||
        punto[j][1] > 9 ||
        punto_reseau == false) {
        if (choix_transformation[j] == 10) {
          k[j] = choice([2, 4]) * randint(-1, 1, [0]); // rapport d'homothétie < 1 ( 0.5 ou 0.25 )
          k2 = k[j];
        } else if (choix_transformation[j] == 9) {
          k[j] = choice([1, 2, 3]) * randint(-1, 1, [0]); // rapport d'homothétie >=1 (1,2 ou 3)
          k1 = k[j];
        }
        antecedents[j] = randint(0, 99);
        punto[j] = image_point_par_transformation(
          choix_transformation[j],
          [antecedents[j] % 10, Math.floor(antecedents[j] / 10)],
          [xO, yO],
          [xu, yu],
          k[j]
        );
        images[j] = punto[j][0] + punto[j][1] * 10;
        // Limitation des points invariants
        if (choix_transformation[j] == 1 && images[j] % 11 == 0)
          punto[j][0] = -1; // Point impossible sur (d1) pour sa symétrie
        if (choix_transformation[j] == 3 && Math.floor(images[j] / 10 == 4))
          punto[j][0] = -1; // Point impossible sur (d3) pour sa symétrie
        if (choix_transformation[j] == 4 && images[j] % 10 == 4)
          punto[j][0] = -1; // Point impossible sur  (d4) pour sa symétrie
        if ((choix_transformation[j] == 5 || choix_transformation[j] == 5) &&
          antecedents[j] == 44)
          punto[j][0] = -1; // point O impossible pour rotation
        if (choix_transformation[j] == 10 && antecedents[j] == 44)
          punto[j][0] = -1; // point O impossible par homothétie de rapport 1/k2


        // pour éviter les points en dehors des clous dans homothétie de rapport 1/k2
        if (punto[j][0] - Math.floor(punto[j][0]) == 0 &&
          punto[j][1] - Math.floor(punto[j][1]) == 0)
          punto_reseau = true;
        else
          punto_reseau = false;
      }
      N[j]=point(punto[j][0]-4,punto[j][1]-4)
      M[j]=point(antecedents[j] % 10-4,Math.floor(antecedents[j] / 10-4))
    }
    // n[i] est un tableau contenant -1 pour la transformation d'indice i si elle n'est pas utilisée, et contenant le numéro du point concerné si la transformation i est utilisée pour ce point.
    // Je l'utilise pour faire apparaître la correction liée au point et à la transformation.
    for (let j = 0; j < 3; j++) {
      n[choix_transformation[j] - 1] = antecedents[j];
    }
    for (let i = 0; i < 3; i++) {
      switch (choix_transformation[i]) {
        case 1:
          texte +=
            num_alpha(i) +
            ` Donner le numéro du symétrique du point ${antecedents[i]} par rapport à la droite $(d_1)$.<br>`;
          texte_corr +=
            num_alpha(i) +
            ` Le symétrique du point ${antecedents[i]} par rapport à $(d_1)$ est le point ${images[i]}.<br>`;
            objets_enonce.push(d1,tracePoint(M[i]),latexParCoordonnees('(d_1)',4.5,4.2,'green',15,1,""))
            objets_correction.push(d1,tracePoint(M[i],N[i]),latexParCoordonnees('(d_1)',3.5,3,'green',15,1,""),
            segment(M[i],N[i],'purple'),codeSegments('X','red',M[i],milieu(M[i],N[i]),milieu(M[i],N[i]),N[i]))
          break;

        case 2:
          texte +=
            num_alpha(i) +
            ` Donner le numéro du symétrique du point ${antecedents[i]} par rapport à la droite $(d_2)$.<br>`;
          texte_corr +=
            num_alpha(i) +
            ` Le symétrique du point ${antecedents[i]} par rapport à $(d_2)$ est le point ${images[i]}.<br>`;
            objets_enonce.push(d2,tracePoint(M[i]),latexParCoordonnees('(d_2)',4.3,-3.7,'green',15,1,""))
            objets_correction.push(d2,tracePoint(M[i],N[i]),latexParCoordonnees('(d_2)',4.3,-3.7,'green',15,1,""),
            segment(M[i],N[i],'cyan'),codeSegments('|||','red',M[i],milieu(M[i],N[i]),milieu(M[i],N[i]),N[i]))
          break;

        case 3:
          texte +=
            num_alpha(i) +
            ` Donner le numéro du symétrique du point ${antecedents[i]} par rapport à la droite $(d_3)$.<br>`;
          texte_corr +=
            num_alpha(i) +
            ` Le symétrique du point ${antecedents[i]} par rapport à $(d_3)$ est le point ${images[i]}.<br>`;
            objets_enonce.push(d3,tracePoint(M[i]),latexParCoordonnees('(d_3)',-4.2,0.5,'green',15,1,""))
            objets_correction.push(d3,tracePoint(M[i],N[i]),latexParCoordonnees('(d_3)',-4.2,0.5,'green',15,1,""),
            segment(M[i],N[i],'brown'),codeSegments('/','red',M[i],milieu(M[i],N[i]),milieu(M[i],N[i]),N[i]))
          break;

        case 4:
          texte +=
            num_alpha(i) +
            ` Donner le numéro du symétrique du point ${antecedents[i]} par rapport à la droite $(d_4)$.<br>`;
          texte_corr +=
            num_alpha(i) +
            ` Le symétrique du point ${antecedents[i]} par rapport à $(d_4)$ est le point ${images[i]}.<br>`;
            objets_enonce.push(d4,tracePoint(M[i]),latexParCoordonnees('(d_4)',0.2,4.5,'green',15,1,""))
            objets_correction.push(d4,tracePoint(M[i],N[i]),latexParCoordonnees('(d_4)',0.2,4.5,'green',15,1,""),
            segment(M[i],N[i],'yellow'),codeSegments('||','red',M[i],milieu(M[i],N[i]),milieu(M[i],N[i]),N[i]))
          break;

        case 5:
          texte +=
            num_alpha(i) +
            ` Donner le numéro de  l'image du point ${antecedents[i]} par la rotation de centre O et d'angle 90° dans le sens anti-horaire.<br>`;
          texte_corr +=
            num_alpha(i) +
            ` L'image du point ${antecedents[i]} par la rotation de centre O et d'angle 90° dans le sens anti-horaire est le point ${images[i]}.<br>`;
            objets_enonce.push(tracePoint(M[i],O),labelPoint(O))
            objets_correction.push(tracePoint(M[i],N[i],O),labelPoint(O),segment(M[i],O,'blue'),segment(N[i],O,'blue'),codeSegments('||','red',M[i],O,O,N[i]),afficheMesureAngle(M[i],O,N[i]))
           break;

        case 6:
          texte +=
            num_alpha(i) +
            ` Donner le numéro de  l'image du point ${antecedents[i]} par la rotation de centre O et d'angle 90° dans le sens horaire.<br>`;
          texte_corr +=
            num_alpha(i) +
            ` L'image du point ${antecedents[i]} par la rotation de centre O et d'angle 90° dans le sens horaire est le point ${images[i]}.<br>`;
            objets_enonce.push(tracePoint(M[i],O),labelPoint(O))
            objets_correction.push(tracePoint(M[i],N[i],O),labelPoint(O),segment(M[i],O,'blue'),segment(N[i],O,'blue'),codeSegments('||','red',M[i],O,O,N[i]),afficheMesureAngle(M[i],O,N[i]))
           break;

        case 7:
          texte +=
            num_alpha(i) +
            ` Donner le numéro de l'image du point ${antecedents[i]} par la symétrie de centre O.<br>`;
          texte_corr +=
            num_alpha(i) +
            ` L'image du point ${antecedents[i]} par la symétrie de centre O est le point ${images[i]}.<br>`;
            objets_enonce.push(tracePoint(M[i],O),labelPoint(O))
            objets_correction.push(tracePoint(M[i],N[i],O),labelPoint(O),segment(M[i],O,'blue'),segment(N[i],O,'blue'),codeSegments('O','red',M[i],O,O,N[i]))
        break;

        case 11:
          texte +=
            num_alpha(i) +
            ` Donner le numéro de l'image du point ${antecedents[i]} par la rotation de centre O et d'angle 60° dans le sens anti-horaire.<br>`;
          texte_corr +=
            num_alpha(i) +
            ` L'image du point ${antecedents[i]} par la rotation de centre O et d'angle 60° dans le sens anti-horaire est le point ${images[i]}.<br>`;
            objets_enonce.push(tracePoint(M[i],O),labelPoint(O))
            objets_correction.push(tracePoint(M[i],N[i],O),labelPoint(O),segment(M[i],O,'blue'),segment(N[i],O,'blue'),codeSegments('||','red',M[i],O,O,N[i]),afficheMesureAngle(M[i],O,N[i]))
          break;

        case 12:
          texte +=
            num_alpha(i) +
            ` Donner le numéro de l'image du point ${antecedents[i]} par la rotation de centre O et d'angle 60° dans le sens horaire.<br>`;
          texte_corr +=
            num_alpha(i) +
            ` L'image du point ${antecedents[i]} par la rotation de centre O et d'angle 60° dans le sens horaire est le point ${images[i]}.<br>`;
            objets_enonce.push(tracePoint(M[i],O),labelPoint(O))
            objets_correction.push(tracePoint(M[i],N[i],O),labelPoint(O),segment(M[i],O,'blue'),segment(N[i],O,'blue'),codeSegments('||','red',M[i],O,O,N[i]),afficheMesureAngle(M[i],O,N[i]))
          break;

        case 13:
          texte +=
            num_alpha(i) +
            ` Donner le numéro de l'image du point ${antecedents[i]} par la rotation de centre O et d'angle 120° dans le sens anti-horaire.<br>`;
          texte_corr +=
            num_alpha(i) +
            ` L'image du point ${antecedents[i]} par la rotation de centre O et d'angle 120° dans le sens anti-horaire est le point ${images[i]}.<br>`;
            objets_enonce.push(tracePoint(M[i],O),labelPoint(O))
            objets_correction.push(tracePoint(M[i],N[i],O),labelPoint(O),segment(M[i],O,'blue'),segment(N[i],O,'blue'),codeSegments('||','red',M[i],O,O,N[i]),afficheMesureAngle(M[i],O,N[i]))
          break;

        case 14:
          texte +=
            num_alpha(i) +
            ` Donner le numéro de l'image du point ${antecedents[i]} par la rotation de centre O et d'angle 120° dans le sens horaire.<br>`;
          texte_corr +=
            num_alpha(i) +
            ` L'image du point ${antecedents[i]} par la rotation de centre O et d'angle 120° dans le sens horaire est le point ${images[i]}.<br>`;
            objets_enonce.push(tracePoint(M[i],O),labelPoint(O))
            objets_correction.push(tracePoint(M[i],N[i],O),labelPoint(O),segment(M[i],O,'blue'),segment(N[i],O,'blue'),codeSegments('||','red',M[i],O,O,N[i]),afficheMesureAngle(M[i],O,N[i]))
           break;

        case 8:
          pointM=point(randint(-1,2,[M[i].x,0]),randint(-1,2,[M[i].y,0]),'M','below')
          pointN=translation(pointM,vecteur(xu,yu),'N','below')
           texte +=
            num_alpha(i) +
            ` Donner le numéro de l'image du point ${antecedents[i]} par la translation qui transforme M en N.<br>`;
          texte_corr +=
            num_alpha(i) +
            ` L'image du point ${antecedents[i]} par la translation qui transforme M en N est le point ${images[i]}.<br>`;
            objets_enonce.push(tracePoint(M[i],pointM,pointN),labelPoint(pointM,pointN))
            objets_correction.push(tracePoint(M[i],N[i],pointM,pointN),labelPoint(pointM,pointN),vecteur(M[i],N[i]).representant(M[i]),vecteur(M[i],N[i]).representant(pointM))
       break;

        case 9:
          texte +=
            num_alpha(i) +
            ` Donner le numéro de l'image du point ${antecedents[i]} par l'homothétie de centre O et de rapport ${k1}.<br>`;
          texte_corr +=
            num_alpha(i) +
            ` L'image du point ${antecedents[i]} par l'homothétie de centre O et de rapport ${k1} est le point ${images[i]}.<br>`;
            objets_enonce.push(tracePoint(M[i],O),labelPoint(O))
            objets_correction.push(tracePoint(M[i],N[i],O),labelPoint(O),segment(M[i],O,'blue'),segment(N[i],O,'orange'))
         break;

        case 10:
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
            objets_enonce.push(tracePoint(M[i],O),labelPoint(O))
            objets_correction.push(tracePoint(M[i],N[i],O),labelPoint(O),segment(M[i],O,'blue'),segment(N[i],O,'orange'))
         break;
      }
    }
    texte+='<br>'+mathalea2d({xmin:-4.5,ymin:-4.5,xmax:5.3,ymax:5.3,pixelsParCm:40,scale:0.8,optionsTikz:['every node/.style={scale=0.6}'],mainlevee:false},objets_enonce)
    texte_corr+='<br>'+mathalea2d({xmin:-4.5,ymin:-4.5,xmax:5.3,ymax:5.3,pixelsParCm:40,scale:0.8,optionsTikz:['every node/.style={scale=0.6}'],mainlevee:false},objets_correction)
      this.liste_questions.push(texte);
      this.liste_corrections.push(texte_corr);
      liste_de_question_to_contenu_sans_numero(this);
   
  };
  // this.besoin_formulaire_numerique = ['Transformations',5, '1 : Symétries axiales\n 2 : Symétries centrales\n 3 : Rotations\n 4 : Translations\n 5 : Homothéties\n'];
}
