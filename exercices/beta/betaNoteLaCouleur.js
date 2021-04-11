import Exercice from '../ClasseExercice.js';
import { liste_de_question_to_contenu, combinaison_listes, randint, choice } from "/modules/outils.js";
import { mathalea2d, scratchblock,fond_ecran} from "/modules/2d.js";
/**
 * Classe NoteLaCouleur (objet Pion) 
 * this.plateau est le tableau des couleurs de cases.
 * this.currentPos est {x,y} les coordonnées courantes du pion
 * this.currentOrientation est l'orientation courante du pion
 * this.codeScratch est le programme en code Latex du pion.
 * this.currentIndex est l'index qui parcourt le codeScratch...
 * this.nlc() retourne la couleur de la case sur laquelle est le pion
 * this.tesCoords(x,y) est une méthode qui dit si le point de coordonnées (x,y) est bien dans le plateau de jeu.
 * this.testInstruction(code) est une méthode qui dit si une instruction est valide (ne sort pas) et retourne un tableau
 * this.testSequence([...code]) est une méthode qui retourne true si la séquence d'instructions est valide.
 */
class NoteLaCouleur {
  constructor() {
    this.plateau = [['Noir', 'Jaune', 'Bleu', 'Vert', 'Orange', 'Rouge', 'Orange', 'Noir', 'Jaune', 'Gris', 'Vert', 'Rose', 'Noir'],
    ['Rouge', 'Bleu', 'Orange', 'Jaune', 'Rose', 'Gris', 'Jaune', 'Rose', 'Gris', 'Jaune', 'Bleu', 'Rouge', 'Gris'],
    ['Rose', 'Vert', 'Gris', 'Rouge', 'Noir', 'Bleu', 'Vert', 'Noir', 'Vert', 'Bleu', 'Rose', 'Gris', 'Vert'],
    ['Vert', 'Bleu', 'Rose', 'Vert', 'Bleu', 'Orange', 'Gris', 'Rouge', 'Orange', 'Jaune', 'Gris', 'Rouge', 'Rose'],
    ['Noir', 'Orange', 'Rouge', 'Orange', 'Jaune', 'Rouge', 'Blanc', 'Blanc', 'Noir', 'Gris', 'Orange', 'Noir', 'Jaune'],
    ['Rose', 'Gris', 'Noir', 'Bleu', 'Vert', 'Bleu', 'Blanc', 'Blanc', 'Rouge', 'Bleu', 'Gris', 'Vert', 'Rouge'],
    ['Noir', 'Rouge', 'Rose', 'Vert', 'Orange', 'Rose', 'Noir', 'Orange', 'Vert', 'Jaune', 'Rose', 'Noir', 'Rose'],
    ['Orange', 'Gris', 'Rouge', 'Jaune', 'Noir', 'Vert', 'Rouge', 'Rose', 'Noir', 'Bleu', 'Vert', 'Jaune', 'Orange'],
    ['Bleu', 'Jaune', 'Orange', 'Vert', 'Gris', 'Jaune', 'Gris', 'Orange', 'Gris', 'Rose', 'Bleu', 'Rouge', 'Bleu'],
    ['Rose', 'Bleu', 'Jaune', 'Rose', 'Orange', 'Rouge', 'Bleu', 'Noir', 'Jaune', 'Gris', 'Vert', 'Jaune', 'Noir']];
    this.currentPos = { x: 15, y: 15 };
    this.currentOrientation = 90;
    this.codeScratch = '';
    this.currentIndex = 0;
    this.nlc = function () {
      return this.plateau[Math.ceil((135 - this.currentPos.y) / 30)][Math.ceil((195 + this.currentPos.x) / 30)];
    };
    this.testCoords = function (x, y) {
      if ((x < -195) || (x > 195) || (y < -135) || (y > 135)) return false;
      return true;
    }
    /**
     * méthode pour tester une séquence : retourne true si la séquence reste dans le jeu false en cas de sortie de plateau.
     */
    this.testSequence = function (codes) {
      let sorti = false;
      let test;
      let pionfantome = new NoteLaCouleur();
      pionfantome.currentPos.x = this.currentPos.x;
      pionfantome.currentPos.y = this.currentPos.y
      pionfantome.currentOrientation = this.currentOrientation;
      for (let i = 0; i < codes.length; i++) {
        test = pionfantome.testInstruction(codes[i])
        if (!test[0]) {
          sorti = true;
          break;
        }
        else {
          pionfantome.currentPos.x = test[1];
          pionfantome.currentPos.y = test[2];
          pionfantome.currentOrientation = test[3];
        }
      }
      return !sorti;
    }
    /**
     * méthode pour tester une instruction : retourne un tableau dont le premier élément indique si l'instruction est valide.
     * c'est à dire qu'elle n'entraine pas une sortie de plateau.
     * Les autres éléments du tableau sont dans cet ordre :
     * - les positions x et y du pion après l'instruction
     * - son orientation après l'instruction
     * - le code Latex de l'instruction
     */
    this.testInstruction = function (code) {
      let avance = function (d, x, y, s) {
        switch (s) {
          case 0:
          case 360:
            y += d;
            break;
          case 90:
          case -270:
            x += d;
            break;
          case 180:
          case -180:
            y -= d;
            break;
          case 270:
          case -90:
            x -= d;
            break;
        }
        return [x, y]
      }
      let x = this.currentPos.x;
      let y = this.currentPos.y;
      let orientation = this.currentOrientation;
      let latex
      switch (code) {
        case 'AV30':
          [x, y] = avance(30, x, y, orientation)
          latex = `\\blockmove{avancer de \\ovalnum{30} pas}`
          break;
        case 'AV60':
          [x, y] = avance(60, x, y, orientation)
          latex = `\\blockmove{avancer de \\ovalnum{60} pas}`
          break;
        case 'AV90':
          [x, y] = avance(90, x, y, orientation)
          latex = `\\blockmove{avancer de \\ovalnum{90} pas}`
          break;
        case 'TD90':
          if (orientation == 180) orientation = -90;
          else orientation += 90;
          latex = `\\blockmove{tourner \\turnright{} de \\ovalnum{90} degrés}`
          break;
        case 'TG90':
          if (orientation == -90) orientation = 180;
          else orientation -= 90;
          latex = `\\blockmove{tourner \\turnleft{} de \\ovalnum{90} degrés}`
          break;
        case 'TD180':
        case 'TG180':
          if (orientation == 0) orientation = 180;
          else if (orientation==-90) orientation = 90;
          else orientation-=180;
          latex = `\\blockmove{tourner \\turnright{} de \\ovalnum{180} degrés}`
          break;
        case 'NLC':
          latex = `\\blocklist{Note la couleur}`
          break;
      }
      if (this.testCoords(x, y)) {
        return [true, x, y, orientation, latex]
      }
      else return [false, this.currentPos.x, this.currentPos.y, this.currentOrientation, latex]
    }
  }
}

/**
 * Fonction exercice.
 */
export default function Note_la_couleur() {
  "use strict";
  Exercice.call(this);
  this.titre = "Note la couleur";
  this.nb_questions = 1;
  this.nb_questions_modifiable = true;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.pas_de_version_LaTeX = false;
  this.pas_de_version_HMTL = false;
  this.type_exercice = "Scratch";
  this.liste_packages = `scratch3`;



  this.nouvelle_version = function () {

    this.liste_questions = [];
    this.liste_corrections = [];
    let type_de_questions_disponibles = [1];
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);

    let objets_enonce, objets_correction, params_enonce, params_correction;
    let commandes_disponibles, sequence,result, nb_couleurs, instruction, couleurs, nb_instructions, liste_instructions;
    let pion = new NoteLaCouleur();
    for (let i = 0, texte, test, j, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
      objets_enonce = [];
      objets_correction = [fond_ecran("/images/plateauNLC.png",0,-520,640,511)];

      texte = ``;
      texte_corr = ``;
      switch (liste_type_de_questions[i]) {
        case 1:
          couleurs = [];
          nb_couleurs = 4;
          liste_instructions = []
          nb_instructions = -1
          j = 0;
          commandes_disponibles = [['AV30', 'AV30', 'AV60', 'AV60', 'AV90'], ['TD90','TD90', 'TG90', 'TG90', 'TD180','TD90', 'TG90', 'TG180']]
          pion.currentPos.x = 15;
          pion.currentPos.y = 15;
          pion.codeScratch = `\\begin{scratch}[print,fill,blocks]\n \\blockinit{quand \\greenflag est cliqué}\n `;
          pion.currentIndex += pion.codeScratch.length
          while (nb_couleurs > j) {
            sequence = [choice(commandes_disponibles[0]), choice(commandes_disponibles[1]), 'NLC'];
            test = pion.testSequence(sequence);
            while (!test) {
              sequence = [choice(commandes_disponibles[0]), choice(commandes_disponibles[1]), 'NLC'];
              test = pion.testSequence(sequence);
            }
            for (let i = 0; i < sequence.length; i++) {
              instruction = sequence[i]
              result=pion.testInstruction(instruction)
              if (instruction == 'NLC') {
                liste_instructions.push(instruction)
                nb_instructions++
                couleurs.push(pion.nlc());
                j++;
                pion.codeScratch += result[4] + '\n';
                pion.currentIndex += result[4].length + 1
              }
              else {
                nb_instructions++
                liste_instructions.push(instruction)
                pion.currentPos.x = result[1];
                pion.currentPos.y = result[2];
                pion.currentOrientation = result[3];
                pion.codeScratch += result[4] + '\n';
                pion.currentIndex += result[4].length + 1
              }
            }
          }
          console.log(pion.currentPos.x,pion.currentPos.y)


          break;

        case 2:

          break;

        case 3:

          break;

        case 4:

          break;

      }
      //  objets_enonce.push ();
      //objets_correction.push();


      //      params_enonce = { xmin:-10, ymin: -10, xmax: 10, ymax: 10, pixelsParCm: 20, scale: 1, mainlevee: false};
      params_correction = { xmin: 0, ymin: 0, xmax: 32, ymax: 26, pixelsParCm: 20, scale: 1 };
      //    texte += mathalea2d(params_enonce, objets_enonce);
      //  texte_corr += mathalea2d(params_correction, objets_correction);
      pion.codeScratch += `\\end{scratch}`
      texte = `<table><tr><td>`
      +scratchblock(pion.codeScratch)+
      `</td><td>`
      +mathalea2d(params_correction,objets_correction)+
      `</td></tr></table>`
      texte_corr = 'On obtient la série de couleurs suivante : '
      texte_corr +=`${couleurs[0]} `;
      for (let i = 1; i< couleurs.length;i++){
        texte_corr+=`- ${couleurs[i]} `;
      }
      texte_corr+='<br>'+mathalea2d(params_correction,objets_correction)
      if (this.liste_questions.indexOf(texte) == -1) {
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };


}
