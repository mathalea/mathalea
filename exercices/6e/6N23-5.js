import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,combinaison_listes,randint,tex_fraction,calcul,choice,tex_nombre2,shuffle2tableaux} from "/modules/outils.js"
import {fraction} from "/modules/Fractions.js"
import { creerBoutonMathalea2d } from '../../modules/outils.js';

/**
 * Donner la fraction correspondant à un nombre ou à un calcul
 * @Auteur Jean-Claude Lhote
 * Ref 6N23-5
 * Publié le 10/03/2021
 */
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
    this.QCM_disponible=true
    this.ModeQCM=false
  
    this.nouvelle_version = function () {
      this.QCM=['6N23-5',[],"Sens de l'écriture fractionnaire",1]
      let tabrep,tabicone
      let espace =``;
      if (sortie_html) {
        espace = `&emsp;`;
      } else {
        espace = `\\qquad`;
      }
    this.liste_questions = [] 
    this.liste_corrections = []
    let type_de_questions_disponibles=[1,2,3,4]
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions)
  
      for (let i = 0, texte, texte_corr, a,b,f,cpt = 0; i < this.nb_questions && cpt < 50;) {

        texte = `` 
        texte_corr = `` 
        
        switch (liste_type_de_questions[i]) { 
          case 1:
            a=randint(10,25)
            b=randint(10,25,a)
            texte=`Le quotient de $${a}$ par $${b}$ s'écrit en écriture fractionnaire : $${tex_fraction(
              "\\phantom{00000}",
              "\\phantom{00000}"
            )}$`
            texte_corr=`Le quotient de $${a}$ par $${b}$ s'écrit $${tex_fraction(a, b)}$.`
            tabrep=[`$${tex_fraction(a, b)}$`,`$${tex_fraction(b, a)}$`,`$${tex_fraction(Math.abs(a-b),b)}$`,`$${tex_fraction(a+b,b)}$`,`$${tex_fraction(a*10,b)}$`]
            tabicone=[1,0,0,0,0]
          break;
  
          case 2:
            a=randint(10,25)
            b=randint(10,25,a)
            texte=`Le nombre qui, multiplié par $${b}$, donne $${a}$ s'écrit en écriture fractionnaire : $${tex_fraction(
              "\\phantom{00000}",
              "\\phantom{00000}"
            )}$`
            texte_corr=`Le nombre qui, multiplié par $${b}$, donne $${a}$ s'écrit $${tex_fraction(a, b)}$.`
            tabrep=[`$${tex_fraction(a, b)}$`,`$${tex_fraction(b, a)}$`,`$${tex_fraction(Math.abs(a-b),b)}$`,`$${tex_fraction(a+b,b)}$`,`$${tex_fraction(a*10,b)}$`]
            tabicone=[1,0,0,0,0]
          break
  
          case 3:
            a=randint(10,25)
            b=randint(10,25,a)
            texte=`$${a}\\div ${b}$ s'écrit en écriture fractionnaire : $${tex_fraction(
              "\\phantom{00000}",
              "\\phantom{00000}"
            )}$`
            texte_corr=`$${a}\\div ${b}$ s'écrit  $${tex_fraction(a, b)}$.`
            tabrep=[`$${tex_fraction(a, b)}$`,`$${tex_fraction(b, a)}$`,`$${tex_fraction(Math.abs(a-b),b)}$`,`$${tex_fraction(a+b,b)}$`,`$${tex_fraction(a*10,b)}$`]
            tabicone=[1,0,0,0,0]
          break
            
          case 4:

          a=randint(1,5)*2+1
          b=choice([2,4,5,10])
          a+=b
          if (Number.isInteger(a/b)){
            a++
          }
          f=fraction(a,b)

          texte=`Le nombre $${tex_nombre2(calcul(a/b))}$ s'écrit en écriture fractionnaire : $${tex_fraction(
            "\\phantom{00000}",
            "\\phantom{00000}"
          )}$`
          texte_corr=`Le nombre $${tex_nombre2(calcul(a/b))}$ s'écrit  $${f.fractionDecimale().texFraction}$`
          if (f.fractionDecimale().texFraction!=f.texFractionSimplifiee) {
            texte_corr+=` ou $${f.texFractionSimplifiee}$.`
          }
          else texte+=`.`
          tabrep=[`$${f.fractionDecimale().texFraction}$`,`$${tex_fraction(b, a)}$`,`$${tex_fraction(a,b*10)}$`,`$${tex_fraction(a*10,b)}$`,`$${tex_fraction(Math.floor(a/b),fraction(calcul((a/b-Math.floor(a/b)))*100,100).fractionDecimale().num)}$`]
          tabicone=[1,0,0,0,0]
          break  
            
        }
        if (this.ModeQCM&&!mathalea.sortieAMC) {
          texte_corr=''
          texte+=`<br><br>  Réponses possibles : ${espace}  `
          shuffle2tableaux(tabrep, tabicone);
          for (let i=0; i<tabrep.length; i++) {
            texte += `$\\square\\;$ ${tabrep[i]}` + espace ;
           if (tabicone[i]==1) {
             texte_corr += `$\\blacksquare\\;$ ${tabrep[i]}` + espace ;
           } else {
             texte_corr += `$\\square\\;$ ${tabrep[i]}` + espace ;
           }
         }
        }
         if (this.liste_questions.indexOf(texte) == -1) {
          this.liste_questions.push(texte);
          this.liste_corrections.push(texte_corr);
          this.QCM[1].push([`${texte}. \n `,
          tabrep,
          tabicone]) 
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
  