import Exercice from '../ClasseExercice.js';
import {num_alpha, randint, objet, liste_type_de_questions,type_de_questions_disponibles,jour, liste_de_question_to_contenu, combinaison_listes,prenom,prenomF,prenomM,objetF,objetM } from "/modules/outils.js"
import {point,polygone,segment,mathalea2d,texteParPosition} from "/modules/2d.js"

/**
 * Associer huit problèmes à huit types de modélisation différents
 * @Auteur Mireille Gain, 23 avril 2021
 * Référence 6C35
*/
export default function ModelisationProblemes() {
  Exercice.call(this); 
  this.titre = "Modéliser des problèmes";
  this.consigne = "Associer chaque problème avec sa modélisation";
  this.nb_questions_modifiable=false;
  this.nb_cols = 2; 
  this.nb_cols_corr = 2; 
  this.tailleDiaporama = 50; 
  this.video = "" 

  this.nouvelle_version = function () {
    this.liste_questions = []; 
    this.liste_corrections = []; 

    let type_de_questions_disponibles=[4] 
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, 2)


  
    for (let i = 0, texte, texte_corr, a, b, c,  cpt = 0; i < 2 && cpt < 50;) {  

      texte = `` 
      texte_corr = ``
      a = randint(9,13);
      b = randint(15,50);
      c = randint(3,8);

      switch (liste_type_de_questions[i]) { 

        case 1:
             texte += `${jour}, ${prenomF} avait ${b} ${objet}. `;
             texte += `<br>Le lendemain, elle en a gagné ${a}.`;
             texte += `<br>Combien en a-t-elle alors ?`;
        break;

        case 2:
              texte +=`${prenomM} achète ${b} ${objet}.`;
              texte += `<br>Il en distribue ${a} à ses amis qui ont oublié les leurs.`;
              texte += `Combien lui en reste-t-il ?`
        break;

        case 3:
          texte +=`J'ai ${b} ${objet} dans mon sac et je souhaite les partager avec mes ${c-1} amis.`;
          texte += `<br>Quelle sera la part de chacun ?`;
        break;
          
        case 4:
          texte +=`${prenomF} a acheté ${c} ${objet} à ${b} € pièce.`;
          texte += `<br>Combien a-t-elle payé ?`;
        break;

        let A1 = point(0,0);
        let B1 = point(12,0);
        let C1 = point(12,4);
        let D1 = point(0,4);
        let p1 = polygone(A1,B1,C1,D1);
        let traitHorizontal1 = segment(point(0,2),point(12, 2));
        let traitVertical1 = segment(point(6,2),point(6,4));
        let tb1 = texteParPosition('?',6, 1);
        let th11 = texteParPosition(b,3, 3);
        let th12 = texteParPosition(a,9, 3);

       
        let A2 = point(16,0);
        let B2 = point(28,0);
        let C2 = point(28,4);
        let D2 = point(16,4);
        let p2 = polygone(A2,B2,C2,D2);
        let traitHorizontal2 = segment(point(16,2),point(28, 2));
        let traitVertical2 = segment(point(22,2),point(22,4));
        let tb2 = texteParPosition(b,22, 1);
        let th21 = texteParPosition(a,19, 3);
        let th22 = texteParPosition('?',25, 3);


        texte += mathalea2d(
          {xmin: -1, ymin: -1, xmax:61, ymax: 4.5, pixelsParCm: 40, scale:1}, p1, traitHorizontal1, traitVertical1, tb1, th11, th12, 
                                                                            p2, traitHorizontal2, traitVertical2, tb2, th21, th22,
        );  
      }  

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
  
  } 
  