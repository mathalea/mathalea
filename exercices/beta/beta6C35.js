import Exercice from '../ClasseExercice.js';
import {choice, randint, objet,jour, liste_de_question_to_contenu, combinaison_listes,prenomF,prenomM,objetF,objetM } from "/modules/outils.js"
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
  this.nb_questions = 8;
  this.nb_questions_modifiable=false;
  this.nb_cols = 2; 
  this.nb_cols_corr = 2; 
  this.tailleDiaporama = 50; 
  this.video = "" 

  this.nouvelle_version = function () {
    this.liste_questions = []; 
    this.liste_corrections = []; 

    let type_de_questions_disponibles=[1, 2, 3, 4, 5, 6, 7, 8];
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
  
  let b1 = randint(15,50);
  let c1 = randint(3,8);
  let b3 = randint(15,50);
  let c3 = randint(3,8);
  let d3 = c3*randint(7,15);
  let a5 = randint(9,13);
  let b5 = randint(15,50);
  let c5 = randint(3,8);  
  let a7 = randint(9,13);
  let b7 = randint(15,50);
  let c7 = randint(3,8);
  let d7 = c7*randint(7,15);
  let o = choice([1,2]);

    for (let i = 0, texte, schema, texte_corr, A, B, C, D, p, traitHorizontal, traitHorizontal2, traitVertical, traitVertical2, traitVertical3, tb, th1, th2, th3, th4, th5, cpt = 0; i < this.nb_questions && cpt < 50;) {  

      texte = `` 
      schema = ``
      texte_corr = ``

      switch (liste_type_de_questions[i]) { 

        case 1:
          if (o == 1){
             texte += `${jour()}, ${prenomF()} avait ${b1} ${objet()}. `;
             texte += `<br>Le lendemain, elle en a gagné ${c1}.`;
             texte += `<br>Combien en a-t-elle alors ?`;
          }
          else {
            texte += `${prenomM()} a ${c1} ans de moins que sa soeur ${prenomF()}.`;
            texte += `<br>Sachant qu'il a ${b1} ans, quel âge a sa soeur ?`;
          }

           A = point(0,0);
           B = point(12,0);
           C = point(12,4);
           D = point(0,4);
           p = polygone(A,B,C,D);
           traitHorizontal = segment(point(0,2),point(12, 2));
           traitVertical = segment(point(6,2),point(6,4));
           tb = texteParPosition('?',6, 1);
           th1 = texteParPosition(b1,3, 3);
           th2 = texteParPosition(c1,9, 3);

           schema += mathalea2d(
            {xmin: -1, ymin: -7, xmax:61, ymax: 6.5, pixelsParCm: 10, scale:1}, p, traitHorizontal, traitVertical, tb, th1, th2, 
          );  

        break;

        case 2:
          if (o == 1){
              texte +=`${prenomM()} achète ${b1} ${objet()}.`;
              texte += `<br>Il en distribue ${c1} à ses amis qui ont oublié les leurs.`;
              texte += `<br>Combien lui en reste-t-il ?`
          }
          else {
            texte += `${prenomM()} possède déjà ${c1} ${objet()}.`;
            texte += `<br>Il a besoin d'en avoir ${b1} en fin de semaine.`;
            texte += `<br>Combien doit-il encore en récupérer ?`
          }

           A = point(16,0);
           B = point(28,0);
           C = point(28,4);
           D = point(16,4);
           p = polygone(A,B,C,D);
           traitHorizontal = segment(point(16,2),point(28, 2));
           traitVertical = segment(point(22,2),point(22,4));
           tb = texteParPosition(b1,22, 1);
           th1 = texteParPosition(c1,19, 3);
           th2 = texteParPosition('?',25, 3);

           schema += mathalea2d(
            {xmin: -1, ymin: -7, xmax:61, ymax: 6.5, pixelsParCm: 10, scale:1}, p, traitHorizontal, traitVertical, tb, th1, th2, 
          );  
        break;

        case 3:
          if (o == 1){
          texte +=`J'ai ${d3} ${objet()} dans mon sac et je souhaite les partager avec mes ${c3-1} amis.`;
          texte += `<br>Quelle sera la part de chacun ?`;
          }
          else {
            texte += `${c3} ${objetF()} identiques coûtent ${d3} €.`;
            texte += `<br>Quel est le prix d'une d'entre elles ?`
          }
                    
           A = point(32,0);
           B = point(44,0);
           C = point(44,4);
           D = point(32,4);
           p = polygone(A,B,C,D);
           traitHorizontal = segment(point(32,2),point(44, 2));
           traitHorizontal2 = segment(point(32,5),point(44, 5));
           traitVertical = segment(point(34,2),point(34,4));
           traitVertical2 = segment(point(36,2),point(36,4));
           traitVertical3 = segment(point(42,2),point(42,4));
           tb = texteParPosition(d3,38, 1);
           th1 = texteParPosition('?',33, 3);
           th2 = texteParPosition('?',35, 3);
           th3 = texteParPosition('. . .',39, 3);
           th4 = texteParPosition('?',43, 3);
           th5 = texteParPosition(c3,38, 6);

           schema += mathalea2d(
            {xmin: -1, ymin: -7, xmax:61, ymax: 6.5, pixelsParCm: 10, scale:1}, p, traitHorizontal, traitHorizontal2, traitVertical, traitVertical2, traitVertical3, tb, th1, th2, th3, th4, th5,
          );  
        break;
          
        case 4:
          if (o == 1){
          texte +=`${prenomF()} a acheté ${c3} ${objet()} à ${b3} € pièce.`;
          texte += `<br>Combien a-t-elle payé ?`;
          }
          else {
            texte +=`${prenomF()} récupère ${c3} paquets de ${b3} ${objet()} chacun.`;
            texte +=`<br>Combien en a-t-elle en tout ?`;
          }

           A = point(48,0);
           B = point(60,0);
           C = point(60,4);
           D = point(48,4);
           p = polygone(A,B,C,D);
           traitHorizontal = segment(point(48,2),point(60, 2));
           traitHorizontal2 = segment(point(48,5),point(60, 5));
           traitVertical = segment(point(50,2),point(50,4));
           traitVertical2 = segment(point(52,2),point(52,4));
           traitVertical3 = segment(point(58,2),point(58,4));
           tb = texteParPosition('?',54, 1);
           th1 = texteParPosition(b3,49, 3);
           th2 = texteParPosition(b3,51, 3);
           th3 = texteParPosition('. . .',55, 3);
           th4 = texteParPosition(b3,59, 3);
           th5 = texteParPosition(c3,54, 6);
           

           schema += mathalea2d(
            {xmin: -1, ymin: -7, xmax:61, ymax: 6.5, pixelsParCm: 10, scale:1}, p, traitHorizontal, traitHorizontal2, traitVertical,  traitVertical2, traitVertical3, tb, th1, th2, th3, th4, th5,
          );  
          break;

          case 5:
            if (o == 1){
              texte +=`${prenomF()} a ${b5} ans.`;
              texte +=`<br>Sachant qu'elle a ${c5} ans de plus que son frère, quel âge a celui-ci ?`;
            }
            else {
              texte +=`${prenomF()} a acheté ${b5} ${objet()} pour les donner à ses amis.`;
              texte +=`<br>Il lui en reste encore ${c5} à donner.`;
              texte +=`<br>Combien en a-t-elle déjà distribué ?`;
            }

             A = point(0,-6);
             B = point(12,-6);
             C = point(12,-2);
             D = point(0,-2);
             p = polygone(A,B,C,D);
             traitHorizontal = segment(point(0,-4),point(12, -4));
             traitVertical = segment(point(6,-4),point(6,-2));
             tb = texteParPosition(b5,6, -5);
             th1 = texteParPosition('?',3, -3);
             th2 = texteParPosition(c5,9, -3);

             schema += mathalea2d(
              {xmin: -1, ymin: -7, xmax:61, ymax: 6.5, pixelsParCm: 10, scale:1}, p, traitHorizontal, traitVertical, tb, th1, th2, 
            );  
        break;

          case 6:
            if (o == 1){
                texte +=`${prenomF()} récupère ${b5} ${objet()} dans une salle, puis ${a5} dans une autre.`;
                texte +=`<br>Combien en a-t-elle en tout ?`;
              }
            else {
                texte +=`Un paquet de ${objetM()} coûte ${b5} € et un paquet de ${objetF()} coûte ${a5} €.`;
                texte +=`<br>Combien coûte l'ensemble ?`;
              }

               A = point(16,-6);
               B = point(28,-6);
               C = point(28,-2);
               D = point(16,-2);
               p = polygone(A,B,C,D);
               traitHorizontal = segment(point(16,-4),point(28, -4));
               traitVertical = segment(point(22,-4),point(22,-2));
               tb = texteParPosition('?',22, -5);
               th1 = texteParPosition(b5,19, -3);
               th2 = texteParPosition(a5,25, -3);

               schema += mathalea2d(
                {xmin: -1, ymin: -7, xmax:61, ymax: 6.5, pixelsParCm: 10, scale:1}, p, traitHorizontal, traitVertical, tb, th1, th2, 
              );  
              break;

          case 7:
            if (o == 1){
                  texte +=`J'ai ${d7} ${objet()} dans mon sac et je dois les regrouper par ${c7}.`;
                  texte +=`<br>Combien puis-je faire de tas ?`;
                }
            else {
                  texte +=`J'ai payé ${d7} € pour des ${objetM()} coûtant ${c7} € chacun.`;
                  texte +=`<br>Combien en ai-je acheté ?`;
                }

                 A = point(32,-6);
                 B = point(44,-6);
                 C = point(44,-2);
                 D = point(32,-2);
                 p = polygone(A,B,C,D);
                 traitHorizontal = segment(point(32,-4),point(44, -4));
                 traitHorizontal2 = segment(point(32,-1),point(44, -1));
                 traitVertical = segment(point(34,-4),point(34,-2));
                 traitVertical2 = segment(point(36,-4),point(36,-2));
                 traitVertical3 = segment(point(42,-4),point(42,-2));
                 tb = texteParPosition(d7,38, -5);
                 th1 = texteParPosition(c7,33, -3);
                 th2 = texteParPosition(c7,35, -3);
                 th3 = texteParPosition('. . .',39, -3);
                 th4 = texteParPosition(c7,43, -3);
                 th5 = texteParPosition('?',38, 0);

                 schema += mathalea2d(
                  {xmin: -1, ymin: -7, xmax:61, ymax: 6.5, pixelsParCm: 10, scale:1}, p, traitHorizontal, traitHorizontal2, traitVertical, traitVertical2, traitVertical3, tb, th1, th2, th3, th4, th5,
                );  

        break;
          case 8:
            if (o == 1){
                    texte +=`Dans un sac, il y a ${a7} ${objet()} et dans l'autre, il y en a ${b7}.`;
                    texte +=`<br>Combien y en a-t-il de plus dans ce sac ?`;
                  }
            else {
                    texte +=`${prenomF()} a trouvé ${b7} ${objet()} et ${prenomM()} en a trouvé ${a7}`;
                    texte +=`<br>Combien en a-t-il de moins qu'elle ?`;
                  }

                   A = point(48,-6);
                   B = point(60,-6);
                   C = point(60,-2);
                   D = point(48,-2);
                   p = polygone(A,B,C,D);
                   traitHorizontal = segment(point(48,-4),point(60, -4));
                   traitVertical = segment(point(54,-4),point(54,-2));
                   tb = texteParPosition(b7,54, -5);
                   th1 = texteParPosition(a7,51, -3);
                   th2 = texteParPosition('?',57, -3); 
                  schema += mathalea2d(
                    {xmin: -1, ymin: -7, xmax:61, ymax: 6.5, pixelsParCm: 10, scale:1}, p, traitHorizontal, traitVertical, tb, th1, th2, 
                  );  
        break;

 
      }  

        if (this.liste_questions.indexOf(texte) == -1) {
          // Si la question n'a jamais été posée, on la stocke dans la liste des questions
          this.liste_questions.push(texte);
          this.liste_corrections.push(schema);
          i++;
        }
        cpt++;
      }
      liste_de_question_to_contenu(this); // On envoie l'exercice à la fonction de mise en page
    };
  
  } 
  