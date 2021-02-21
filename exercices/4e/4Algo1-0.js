import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,shuffle,combinaison_listes_sans_changer_ordre,calcul,texte_en_couleur} from "/modules/outils.js"
import {creerLutin,avance,baisseCrayon,leveCrayon,tournerD,allerA,mathalea2d} from "/modules/2d.js"
import {combinaison_listes} from "/modules/outils.js"

/** 
 * * Dessiner selon un programme scratch
 * * 4Algo1-0
 * @author Sébastien Lozano
 * mise à plat du big ouaille suite au passage à la V2
 */

      export default function Tracer_avec_scratch() {
  'use strict';
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Dessiner avec scratch";
  this.consigne = "Laquelle des 4 figures ci-dessous va être tracée avec le script fourni ?";

  this.nb_cols = 1;
  this.nb_cols_corr = 1;

  this.liste_packages = "scratch3";
	this.type_exercice = "Scratch";

  let type_de_questions_disponibles;
  this.nb_questions = 3;
  this.debug = false;


  this.nouvelle_version = function () {

    if (this.debug) {
      type_de_questions_disponibles = [1,2,3,4,5];
    } else {
      type_de_questions_disponibles = [1,2,3,4,5];
    };

    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let fenetreMathalea2D = { xmin: -10, ymin: -15, xmax: 60, ymax: 2, pixelsParCm: 10, scale: 0.2 }
    let pixelsParCm = fenetreMathalea2D.pixelsParCm*5;// 100;
//    var unitesLutinParCm = 100;


    let liste_type_de_questions  = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    //let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions) // Tous les types de questions sont posées --> à remettre comme ci dessus		

    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
      // une fonction pour gérer la sortie HTML/LaTeX
      // code est un string contenant le code svg ou tikz
      function scratchblocks_Tikz(code_svg, code_tikz) {
        if (sortie_html) {
          return code_svg;
        } else {
          return code_tikz;
        };
      };

      // une fonction pour dire le nom du polygone
      function myPolyName(n) {
        let sortie = {
          name: ``,
          nameParSommets: ``,
          nb_pas: ``
        };
        switch (n) {
          case 2:
            sortie.name = `segment`;
            sortie.nameParSommets = `AB`;
            sortie.nb_pas = 400;
          case 3:
            sortie.name = `triangle équilatéral`;
            sortie.nameParSommets = `ABC`;
            sortie.nb_pas = 400;
            break;
          case 4:
            sortie.name = `carré`;
            sortie.nameParSommets = `ABCD`;
            sortie.nb_pas = 400;
            break;
          case 5:
            sortie.name = `pentagone régulier`;
            sortie.nameParSommets = `ABCDE`;
            sortie.nb_pas = 300;
            break;
          case 6:
            sortie.name = `hexagone régulier`;
            sortie.nameParSommets = `ABCDEF`;
            sortie.nb_pas = 250;
            break;
          case 7:
            sortie.name = `heptagone régulier`;
            sortie.nameParSommets = `ABCDEFG`;
            sortie.nb_pas = 200;
            break;
          case 8:
            sortie.name = `octogone régulier`;
            sortie.nameParSommets = `ABCDEFGH`;
            sortie.nb_pas = 200;
            break;
          case 9:
            sortie.name = `ennéagone régulier`;
            sortie.nameParSommets = `ABCDEFGHI`;
            sortie.nb_pas = 200;
            break;

        }
        return sortie;
      }

    // une fonction pour renvoyer une situation
    // n définit le nombre de côtés du polygone régulier
    function mySituation(n) {
        let situations = [
          {//polygones réguliers
            nb_cotes: n,
            nom: myPolyName(n).name,
            code_svg: `
            <pre class='blocks'>
            quand le drapeau vert pressé
            stylo en position d'écriture
            répéter (${n}) fois
              avancer de (${myPolyName(n).nb_pas}) pas
              tourner droite de ((360)/(${n})) degrés
            fin                  
            </pre>          
            `,
            code_tikz: `
            \\begin{scratch}
              \\blockinit{quand \\greenflag est cliqué}
              \\blockpen{stylo en position d’écriture}
              \\blockrepeat{répéter \\ovalnum{${n}} fois}
                {
                  \\blockmove{avancer de \\ovalnum{${myPolyName(n).nb_pas}}}
                  \\blockmove{tourner \\turnright{} de \\ovaloperator{\\ovalnum{360}/\\ovalnum{${n}}} degrés}
                }
            \\end{scratch}
            `,
            fig: ``,
            fig_corr: ``,
          },
        ];

        let tab_abs_dem_lutin2;
        if (n == 6) {
          tab_abs_dem_lutin2 = [0, 3 * myPolyName(n).nb_pas, 6 * myPolyName(n).nb_pas, 9 * myPolyName(n).nb_pas]
        } else if (n == 8) {
          tab_abs_dem_lutin2 = [0, 4 * myPolyName(n).nb_pas, 8 * myPolyName(n).nb_pas, 12 * myPolyName(n).nb_pas]
        } else {
          tab_abs_dem_lutin2 = [0, 2 * myPolyName(n).nb_pas, 4 * myPolyName(n).nb_pas, 6 * myPolyName(n).nb_pas]
        };
        // on mélange tout ça !
        tab_abs_dem_lutin2 = shuffle(tab_abs_dem_lutin2);
        // Les figures de l'énoncé         
        // le lutin2  trace le cadre en pointillés
        let lutin2 = creerLutin();
        lutin2.color = "black";
        lutin2.pointilles = true;
        allerA(fenetreMathalea2D.xmin * pixelsParCm, fenetreMathalea2D.ymax * pixelsParCm, lutin2);
        baisseCrayon(lutin2);
        allerA(fenetreMathalea2D.xmax * pixelsParCm, fenetreMathalea2D.ymax * pixelsParCm, lutin2);
        allerA(fenetreMathalea2D.xmax * pixelsParCm, fenetreMathalea2D.ymin * pixelsParCm, lutin2);
        allerA(fenetreMathalea2D.xmin * pixelsParCm, fenetreMathalea2D.ymin * pixelsParCm, lutin2);
        allerA(fenetreMathalea2D.xmin * pixelsParCm, fenetreMathalea2D.ymax * pixelsParCm, lutin2);
        leveCrayon(lutin2);
        //le lutin2 fait la bonne figure
        lutin2.pointilles = false;
        lutin2.color = "blue";
        allerA(tab_abs_dem_lutin2[0], 0, lutin2);
        baisseCrayon(lutin2);
        for (let k = 1; k < n + 1; k++) {
          avance(myPolyName(n).nb_pas, lutin2);
          tournerD(calcul(360 / n), lutin2);
        };
        // le lutin2 fait un polygone régulier avec un côté de plus 
        leveCrayon(lutin2);
        allerA(tab_abs_dem_lutin2[1], 0, lutin2);
        baisseCrayon(lutin2);
        for (let k = 1; k < n + 1 + 1; k++) {
          avance(myPolyName(n + 1).nb_pas, lutin2);
          tournerD(calcul(360 / (n + 1)), lutin2);
        };

        // le lutin2 fait un polygone régulier avec un côté de moins 
        leveCrayon(lutin2);
        allerA(tab_abs_dem_lutin2[2], 0, lutin2);
        baisseCrayon(lutin2);
        for (let k = 1; k < n; k++) {
          avance(myPolyName(n - 1).nb_pas, lutin2);
          tournerD(calcul(360 / (n - 1)), lutin2);
        };

        // le lutin2 fait une figure ouverte à n côtés
        leveCrayon(lutin2);
        allerA(tab_abs_dem_lutin2[3], 0, lutin2);
        baisseCrayon(lutin2);
        for (let k = 1; k < n + 1; k++) {
          avance(myPolyName(n).nb_pas, lutin2);
          tournerD(calcul((360 / n) - 10), lutin2);
        };
        allerA(tab_abs_dem_lutin2[3], 0, lutin2);

        let mesAppels_enonce = [
          lutin2,
        ]
        situations[0].fig = mathalea2d(
          fenetreMathalea2D,
          mesAppels_enonce
        );

        // les figures de la correction
        // le lutin3  trace le cadre
        let lutin3 = creerLutin();
        lutin3.color = "black";
        lutin3.pointilles = true;
        allerA(fenetreMathalea2D.xmin * pixelsParCm, fenetreMathalea2D.ymax * pixelsParCm, lutin3);
        baisseCrayon(lutin3);
        allerA(fenetreMathalea2D.xmax * pixelsParCm, fenetreMathalea2D.ymax * pixelsParCm, lutin3);
        allerA(fenetreMathalea2D.xmax * pixelsParCm, fenetreMathalea2D.ymin * pixelsParCm, lutin3);
        allerA(fenetreMathalea2D.xmin * pixelsParCm, fenetreMathalea2D.ymin * pixelsParCm, lutin3);
        allerA(fenetreMathalea2D.xmin * pixelsParCm, fenetreMathalea2D.ymax * pixelsParCm, lutin3);
        leveCrayon(lutin3);
        // le lutin3 fait la bonne figure      
        lutin3.pointilles = false;
        lutin3.color = "green"
        allerA(tab_abs_dem_lutin2[0], 0, lutin3);
        baisseCrayon(lutin3);
        for (let k = 1; k < n + 1; k++) {
          avance(myPolyName(n).nb_pas, lutin3);
          tournerD(calcul(360 / n), lutin3);
        };
        // le lutin3 fait un polygone régulier avec un côté de plus 
        lutin3.color = "red";
        leveCrayon(lutin3);
        allerA(tab_abs_dem_lutin2[1], 0, lutin3);
        baisseCrayon(lutin3);
        for (let k = 1; k < n + 1 + 1; k++) {
          avance(myPolyName(n + 1).nb_pas, lutin3);
          tournerD(calcul(360 / (n + 1)), lutin3);
        };

        // le lutin3 fait un polygone régulier avec un côté de moins 
        leveCrayon(lutin3);
        allerA(tab_abs_dem_lutin2[2], 0, lutin3);
        baisseCrayon(lutin3);
        for (let k = 1; k < n; k++) {
          avance(myPolyName(n - 1).nb_pas, lutin3);
          tournerD(calcul(360 / (n - 1)), lutin3);
        };

        // le lutin3 fait une figure ouverte à n côtés
        leveCrayon(lutin3);
        allerA(tab_abs_dem_lutin2[3], 0, lutin3);
        baisseCrayon(lutin3);
        for (let k = 1; k < n + 1; k++) {
          avance(myPolyName(n).nb_pas, lutin3);
          tournerD(calcul((360 / n) - 10), lutin3);
        };
        allerA(tab_abs_dem_lutin2[3], 0, lutin3);

        let mesAppels_corr = [
          lutin3,
        ]
        situations[0].fig_corr = mathalea2d(
          fenetreMathalea2D,
          mesAppels_corr
        );


        let enonces = [];
        enonces.push({
          enonce: `
          ${scratchblocks_Tikz(situations[0].code_svg, situations[0].code_tikz)}
          <br> 
          ${situations[0].fig}
          `,
          question: ``,
          correction: `
          <br> Les figures rouges sont erronées.
          <br> La figure tracée par le programme a ${situations[0].nb_cotes} côtés de même longueur et ${situations[0].nb_cotes} angles de même mesure, c'est un ${situations[0].nom}.
          <br>${texte_en_couleur(`La bonne figure est donc la figure verte.`)}
          <br><br>
          ${situations[0].fig_corr}
          `
        });

        return enonces;
    }

    
    let enonces = []
    enonces.push(mySituation(3)[0])
    enonces.push(mySituation(4)[0])
    enonces.push(mySituation(5)[0])
    enonces.push(mySituation(6)[0])
    enonces.push(mySituation(8)[0])
    switch (liste_type_de_questions[i]) {
      case 1:
        texte = `${enonces[0].enonce}`;
        if (this.debug) {
          texte += `<br>`;
          texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`;
          texte_corr = ``;
        } else {
          texte_corr = `${enonces[0].correction}`;
        };
        break;
      case 2:
        texte = `${enonces[1].enonce}`;
        if (this.debug) {
          texte += `<br>`;
          texte += `<br> =====CORRECTION======<br>${enonces[1].correction}`;
          texte_corr = ``;
        } else {
          texte_corr = `${enonces[1].correction}`;
        };
        break;
      case 3:
        texte = `${enonces[2].enonce}`;
        if (this.debug) {
          texte += `<br>`;
          texte += `<br> =====CORRECTION======<br>${enonces[2].correction}`;
          texte_corr = ``;
        } else {
          texte_corr = `${enonces[2].correction}`;
        };
        break;
      case 4:
        texte = `${enonces[3].enonce}`;
        if (this.debug) {
          texte += `<br>`;
          texte += `<br> =====CORRECTION======<br>${enonces[3].correction}`;
          texte_corr = ``;
        } else {
          texte_corr = `${enonces[3].correction}`;
        };
        break;
      case 5:
        texte = `${enonces[4].enonce}`;
        if (this.debug) {
          texte += `<br>`;
          texte += `<br> =====CORRECTION======<br>${enonces[4].correction}`;
          texte_corr = ``;
        } else {
          texte_corr = `${enonces[4].correction}`;
        };
        break;
      };


      if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  }
}

