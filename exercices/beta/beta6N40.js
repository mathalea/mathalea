import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,combinaison_listes} from "/modules/outils.js"

export default function Sens_de_la_fraction() {
    "use strict"
    Exercice.call(this)
    this.titre = "Sens de l'écriture fractionnaire";
    this.nb_questions = 4; 
    this.nb_questions_modifiable=true 
    this.nb_cols = 1; 
    this.nb_cols_corr = 1;
    this.pas_de_version_LaTeX=false 
    this.pas_de_version_HMTL=false 

  
    this.nouvelle_version = function () {
  
    this.liste_questions = [] 
    this.liste_corrections = []
    let type_de_questions_disponibles=[1,2,3,4]
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions)
  
      for (let i = 0, texte, texte_corr, a,b,cpt = 0; i < this.nb_questions && cpt < 50;) {

        texte = `` 
        texte_corr = `` 
        
        switch (liste_type_de_questions[i]) { 
          case 1:
            a=randint(80,200)
            b=randint(80,200,a)
            texte=`Le quotient de $${a}$ par $${b}$ s'écrit : $${tex_fraction(
              "\\phantom{00000000000000}",
              "\\phantom{00000000000000}"
            )}$`
               
          break;
  
          case 2:
            
          break
  
          case 3:
            
          break
            
          case 4:
          
          break  
            
        }

        if (this.liste_questions.indexOf(texte) == -1) {
          this.liste_questions.push(texte);
          this.liste_corrections.push(texte_corr);
          i++;
        }
        cpt++;
      }
      liste_de_question_to_contenu(this); 
    };
  
  //	this.besoin_formulaire_numerique = ['Type de questions', 3, `1 : Perpendiculaires\n 2 : Parallèles\n 3 : Mélange`]
  //  this.besoin_formulaire2_numerique = ["Type de cahier",3,`1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`];
  // this.besoin_formulaire3_case_a_cocher =['figure à main levée',true]
  
  }
  