import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,combinaison_listes,randint,choice} from "/modules/outils.js";
import {mathalea2d,scratchblock } from "/modules/2d.js";

class NoteLaCouleur{
    constructor(){
        this.plateau=[['Noir','Jaune','Bleu','Vert','Orange','Rouge','Orange','Noir','Jaune','Gris','Vert','Rose','Noir'],
        ['Rouge','Bleu','Orange','Jaune','Rose','Gris','Jaune','Rose','Gris','Jaune','Bleu','Rouge','Gris'],
        ['Rose','Vert','Gris','Rouge','Noir','Bleu','Vert','Noir','Vert','Bleu','Rose','Gris','Vert'],
        ['Vert','Bleu','Rose','Vert','Bleu','Orange','Gris','Rouge','Orange','Jaune','Gris','Rouge','Rose'],
        ['Noir','Orange','Rouge','Orange','Jaune','Rouge','Blanc','Blanc','Noir','Gris','Orange','Noir','Jaune'],
        ['Rose','Gris','Noir','Bleu','Vert','Bleu','Blanc','Blanc','Rouge','Bleu','Gris','Vert','Rouge'],
        ['Noir','Rouge','Rose','Vert','Orange','Rose','Noir','Orange','Vert','Jaune','Rose','Noir','Rose'],
        ['Orange','Gris','Rouge','Jaune','Noir','Vert','Rouge','Rose','Noir','Bleu','Vert','Jaune','Orange'],
        ['Bleu','Jaune','Orange','Vert','Gris','Jaune','Gris','Orange','Gris','Rose','Bleu','Rouge','Bleu'],
        ['Rose','Bleu','Jaune','Rose','Orange','Rouge','Bleu','Noir','Jaune','Gris','Vert','Jaune','Noir']];
        this.currentPos={x:15,y:15};
        this.currentOrientation=90;
        this.codeScratch='';
        this.currentIndex=0;
        this.nlc = function(){
          return this.plateau[Math.ceil((135-this.currentPos.y)/30)][Math.ceil((195+this.currentPos.x)/30)];
        };
        this.testInstruction =function(code){
          let testCoords=function(x,y){
            if ((x<-195)||(x>195)||(y<-135)||(y>135)) return false;
            return true;
          }
          let avance=function(d,x,y,s){
            switch (s){
              case 0:
              case 360:
                y+=d;
              break;
              case 90:
              case -270:
                x+=d;
              break;
              case 180:
              case -180:
                y-=d;
              break;
              case 270:
              case -90:
                x-=d;
              break;
            }
            return [x,y]
          }
          let x=this.currentPos.x;
          let y=this.currentPos.y;
          let orientation=this.currentOrientation;
          let latex
          switch (code){
            case 'AV30':
              [x,y]=avance(30,x,y,orientation)
              latex=`\\blockmove{avancer de \\ovalnum{30} pas}`
            break;
            case 'AV60':
              [x,y]=avance(60,x,y,orientation)
              latex=`\\blockmove{avancer de \\ovalnum{60} pas}`
              break;
            case 'AV90':
              [x,y]=avance(90,x,y,orientation)
              latex=`\\blockmove{avancer de \\ovalnum{90} pas}`
              break;
            case 'TD90':
              if (orientation==180) orientation=-90;
              else orientation+=90;
              latex=`\\blockmove{tourner \\turnright{} de \\ovalnum{90} degrés}`
            break;
            case 'TG90':
              if (orientation==-90) orientation=180;
              else orientation-=90;
              latex=`\\blockmove{tourner \\turnleft{} de \\ovalnum{90} degrés}`
              break;
            case 'TD180':
              orientation=-orientation
              latex=`\\blockmove{tourner \\turnright{} de \\ovalnum{180} degrés}`
              break;
            case 'TG180':
              orientation=-orientation
              latex=`\\blockmove{tourner \\turnleft{} de \\ovalnum{180} degrés}`
              break;
            case 'NLC':
              latex=`\\blocklist{Note la couleur}`
            break;
          }
          if (testCoords(x,y)){
            return [true,x,y,orientation,latex]
          }
          else return [false,this.currentPos.x,this.currentPos.y,this.currentOrientation,latex]
        }
    }
}

export default function Note_la_couleur() {
    "use strict";
    Exercice.call(this);
    this.titre = "Note la couleur";
    this.nb_questions = 1; 
    this.nb_questions_modifiable=true ;
    this.nb_cols = 1; 
    this.nb_cols_corr = 1;
    this.pas_de_version_LaTeX=false ;
    this.pas_de_version_HMTL=false ;
    this.type_exercice = "Scratch";
    this.liste_packages = `scratch3`;

  
 
    this.nouvelle_version = function () {

    this.liste_questions = [] ;
    this.liste_corrections = [];
    let type_de_questions_disponibles=[1];
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);

      let objets_enonce,objets_correction,params_enonce,params_correction;
      let commandes_disponibles,nb_couleurs,instruction,couleurs,nb_instructions,liste_instructions;
      let pion=new NoteLaCouleur();
      for (let i = 0, texte,test,j, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
        objets_enonce = [];
        objets_correction = [];
  
        texte = ``;
        texte_corr = ``;
        switch (liste_type_de_questions[i]) { 
          case 1:
            couleurs=[];
              nb_couleurs=3;;
              liste_instructions=[]
              nb_instructions=-1
              j=0;
              commandes_disponibles=[`AV30`,'AV60','AV90',`TD90`,`TG90`,`TD180`,`TG180`,`NLC`,`NLC`,`NLC`]
              pion.currentPos.x=15;
              pion.currentPos.y=15;
              pion.codeScratch=`\\begin{scratch}[print,fill,blocks]\n \\blockinit{quand \\greenflag est cliqué}\n `;
              while (nb_couleurs>j){
                instruction=choice(commandes_disponibles);
                test=pion.testInstruction(instruction);
                  while (test[0]&&nb_couleurs>j){
                    if (instruction=='NLC'){
                      liste_instructions.push(instruction)
                      nb_instructions++
                      couleurs.push(test[0]);
                      j++;
                      pion.codeScratch+=test[4]+'\n';
                      pion.currentIndex+=test[4].length+1
                      instruction=choice(commandes_disponibles,liste_instructions[nb_instructions])
                      test=pion.testInstruction(instruction);
                    }
                    else{
                      nb_instructions++
                      liste_instructions.push(instruction)
                      pion.currentPos.x=test[1];
                      pion.currentPos.y=test[2];
                      pion.currentOrientation=test[3];
                      pion.codeScratch+=test[4]+'\n';
                      pion.currentIndex+=test[4].length+1
                      instruction=choice(commandes_disponibles,liste_instructions[nb_instructions])
                      test=pion.testInstruction(instruction);
                    }
                }
              }
              pion.codeScratch+=`\\end{scratch}`
               texte=scratchblock(pion.codeScratch);

                /* dépotoir à instructions scratch
              \\blockif{si \\booloperator{\\ovalvariable{a} < \\ovalvariable{b}} alors}
                {
                  \\blockmove{tourner \\turnleft de \\ovalnum{90} degrés} 
                  \\blockmove{glisser en \\ovalnum{5} secondes à x: \\ovalvariable*{Xlutin} y: \\ovalnum{93} } 
                  \\blockmove{glisser en \\ovalnum{5} secondes à \\ovalvariable{position aléatoire}} 
                  \\blockmove{ajouter \\ovalnum{25} à x} 
                }
               \\end{scratch}
                `);
               
   */
          break;
  
          case 2:
              texte=scratchblock(`\\begin{scratch}[print,fill,blocks]
              \\initmoreblocks{définir \\nameblocks{trac_carré \\ovalmoreblocks{coté_carré}}}
              \\blockrepeat{répéter \\ovalnum{4} fois}
              {
                \\blockmove{avancer de \\ovalmoreblocks{coté_carré} pas}
                \\blockmove{tourner \\turnleft{} de \\ovalnnum{90} degrés}
              }
              \\end{scratch}
              `);
          break;
  
          case 3:
          /*  


          \\blockmove{tourner \\turnleft{} de \\ovalnum{90} degrés}
          \\blockmove{aller à x: \\ovalnum{10} y: \\ovalnum{15}}
          \\blockrepeat{répéter jusqu'à ce que \\boolsensing{\\ovalvariable{x} > \\ovalnum{10}}}
          {
          \\blockmove{glisser en \\ovalnum{2} secondes à x: \\ovaloperator{\\ovaloperator{\\ovalvariable{xLutin} + \\ovalnum{5}} / \\ovalnum{5}} y: \\ovaloperator{\\ovalnum{12} - \\ovalnum{7}}}
            \\blockmove{ajouter \\ovaloperator{nombre aléatoire entre \\ovalnum{-2} et \\ovalnum{2}} à x}
        }
        \\blockmove{avancer de \\ovalnum{5} pas}
        \\blockrepeat{répéter \\ovalnum{10} fois}
        {
          \\blocklook{dire \\ovalnum{Bonjour} pendant \\ovalnum{7} secondes}
          \\blockmove{ajouter \\ovalnum{25} à x}
          \\blocksound{jouer le son \\ovalsound*{Meow}}
        }
        \\blockmove{ajouter \\ovalnum{25} à x}
        \\blockrepeat{répéter indéfiniment}
        {
          \\blockmove{glisser en \\ovalnum{5} secondes à x: \\ovalvariable*{Xlutin} y: \\ovalnum{93}}
          \\blockmove{glisser en \\ovalnum{5} secondes à \\ovalvariable{position aléatoire}}
        }
        \\blockstop{stop \\selectmenu{ce script}}

          */
 
          break;
            
          case 4:
          
          break ; 
            
        }
  //  objets_enonce.push ();
    //objets_correction.push();
  

  //      params_enonce = { xmin:-10, ymin: -10, xmax: 10, ymax: 10, pixelsParCm: 20, scale: 1, mainlevee: false};
    //    params_correction = { xmin: -10, ymin: -10, xmax: 10, ymax: 10, pixelsParCm: 20, scale: 1 };
    //    texte += mathalea2d(params_enonce, objets_enonce);
      //  texte_corr += mathalea2d(params_correction, objets_correction);
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
  