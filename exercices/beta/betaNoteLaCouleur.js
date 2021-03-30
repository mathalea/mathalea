import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,combinaison_listes} from "/modules/outils.js";
import {mathalea2d,scratchblock} from "/modules/2d.js";

class NoteLaCouleur{
    constructor(){
        this.plateau=[[Noir,Jaune,Bleu,Vert,Orange,Rouge,Orange,Noir,Jaune,Gris,Vert,Rose,Noir],
        [Rouge,Bleu,Orange,Jaune,Rose,Gris,Jaune,Rose,Gris,Jaune,Bleu,Rouge,Gris],
        [Rose,Vert,Gris,Rouge,Noir,Bleu,Vert,Noir,Vert,Bleu,Rose,Gris,Vert],
        [Vert,Bleu,Rose,Vert,Bleu,Orange,Gris,Rouge,Orange,Jaune,Gris,Rouge,Rose],
        [Noir,Orange,Rouge,Orange,Jaune,Rouge,Blanc,Blanc,Noir,Gris,Orange,Noir,Jaune],
        [Rose,Gris,Noir,Bleu,Vert,Bleu,Blanc,Blanc,Rouge,Bleu,Gris,Vert,Rouge],
        [Noir,Rouge,Rose,Vert,Orange,Rose,Noir,Orange,Vert,Jaune,Rose,Noir,Rose],
        [Orange,Gris,Rouge,Jaune,Noir,Vert,Rouge,Rose,Noir,Bleu,Vert,Jaune,Orange],
        [Bleu,Jaune,Orange,Vert,Gris,Jaune,Gris,Orange,Gris,Rose,Bleu,Rouge,Bleu],
        [Rose,Bleu,Jaune,Rose,Orange,Rouge,Bleu,Noir,Jaune,Gris,Vert,Jaune,Noir]];
        this.PositionCourante={x:15,y:15};

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
  
      for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
        objets_enonce = [];
        objets_correction = [];
  
        texte = ``;
        texte_corr = ``;

        switch (liste_type_de_questions[i]) { 
          case 1:
               texte=scratchblock(["Aller en haut","Aller en bas"])
               
   
          break;
  
          case 2:

          break;
  
          case 3:
            
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
  