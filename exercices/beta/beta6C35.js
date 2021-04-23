import Exercice from '../ClasseExercice.js';
import {randint, objet,jour, liste_de_question_to_contenu, combinaison_listes,prenomF,prenomM,objetF,objetM } from "/modules/outils.js"
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
  
    for (let i = 0, texte, texte_corr, a, b, c, d, o,  cpt = 0; i < this.nb_questions && cpt < 50;) {  

      texte = `` 
      texte_corr = ``
      a = randint(9,13);
      b = randint(15,50);
      c = randint(3,8);
      d = c*randint(7,15);
      o = choice(1,2);

      switch (liste_type_de_questions[i]) { 

        case 1:
          if (o == 1){
             texte += `${jour}, ${prenomF} avait ${b} ${objet}. `;
             texte += `<br>Le lendemain, elle en a gagné ${a}.`;
             texte += `<br>Combien en a-t-elle alors ?`;
          }
          else {
            texte += `${prenomM} a ${c} ans de moins que ${prenomF}.`;
            texte += `<br>Sachant que ${prenomF} a ${b} ans, quel âge a ${prenomF} ?}`;
          }
        break;

        case 2:
          if (o == 1){
              texte +=`${prenomM} achète ${b} ${objet}.`;
              texte += `<br>Il en distribue ${a} à ses amis qui ont oublié les leurs.`;
              texte += `<br>Combien lui en reste-t-il ?`
          }
          else {
            texte += `${prenomM} possède déjà ${a} ${objet}.`;
            texte += `<br>Il a besoin d'en avoir ${b} en fin de semaine.`;
            texte += `<br>Combien doit-il encore en récupérer ?`
          }
        break;

        case 3:
          if (o == 1){
          texte +=`J'ai ${b} ${objet} dans mon sac et je souhaite les partager avec mes ${c-1} amis.`;
          texte += `<br>Quelle sera la part de chacun ?`;
          }
          else {
            texte += `${c} ${objetF} identiques coûtent ${b} €.`;
            texte += `<br>Quel est le prix d'une d'entre elles ?`
          }
        break;
          
        case 4:
          if (o == 1){
          texte +=`${prenomF} a acheté ${c} ${objet} à ${b} € pièce.`;
          texte += `<br>Combien a-t-elle payé ?`;
          }
          else {
            texte +=`${prenomF} récupère ${c} paquets de ${b} ${objet} chacun.`;
            texte +=`<br>Combien en a-t-elle en tout ?`;
          }

          case 5:
            if (o == 1){
              texte +=`${prenomF} a acheté ${b} ${objet} pour les donner à ses amis.`;
              texte +=`<br>Il lui en reste encore ${c} à donner.`;
              texte +=`<br>Combien en a-t-elle déjà distribué ?`;
            }
            else {
              texte +=`${prenomF} a ${b} ans.`;
              texte +=`<br>Sachant qu'elle a ${c} ans de plus que son frère, quel âge a celui-ci ?`;
            }

          case 6:
            if (o == 1){
                texte +=`${prenomF} récupère ${b} ${objet} dans une salle, puis ${a} dans une autre.`;
                texte +=`<br>Combien en a-t-elle en tout ?`;
              }
            else {
                texte +=`Un paquet de ${objetM} coûte ${c} € et un paquet de ${objetF} coûte ${a} €.`;
                texte +=`<br>Combien coûte l'ensemble ?`;
              }

          case 7:
            if (o == 1){
                  texte +=`J'ai ${d} ${objet} dans mon sac et je dois les regrouper par ${c}.`;
                  texte +=`<br>Combien puis-je faire de tas ?`;
                }
            else {
                  texte +=`J'ai payé ${d} € pour des ${objetM} coûtant ${c} € chacun.`;
                  texte +=`<br>Combien en ai-je acheté ?`;
                }

          case 8:
            if (o == 1){
                    texte +=`Dans un sac, il y a ${a} ${objet} et dans l'autre, il y en a ${b}.`;
                    texte +=`<br>Combien y en a-t-il de plus dans ce sac ?`;
                  }
            else {
                    texte +=`${prenomF} a ${b} ${objet} et elle doit les répartir équitablement sur ${c} tables.`;
                    texte +=`<br>Combien va-t-elle en poser sur chaque table ?`;
                  }
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

        let A3 = point(32,0);
        let B3 = point(44,0);
        let C3 = point(44,4);
        let D3 = point(32,4);
        let p3 = polygone(A3,B3,C3,D3);
        let traitHorizontal3 = segment(point(32,2),point(44, 2));
        let traitVertical3 = segment(point(38,2),point(38,4));
        let tb3 = texteParPosition(b,38, 1);
        let th31 = texteParPosition('?',35, 3);
        let th32 = texteParPosition('...',41, 3);

        let A4 = point(48,0);
        let B4 = point(60,0);
        let C4 = point(60,4);
        let D4 = point(48,4);
        let p4 = polygone(A4,B4,C4,D4);
        let traitHorizontal4 = segment(point(48,2),point(60, 2));
        let traitVertical4 = segment(point(54,2),point(54,4));
        let tb4 = texteParPosition(b,54, 1);
        let th41 = texteParPosition('?',51, 3);
        let th42 = texteParPosition(c,57, 3);

        let A5 = point(0,-6);
        let B5 = point(12,-6);
        let C5 = point(12,-2);
        let D5 = point(0,-2);
        let p5 = polygone(A5,B5,C5,D5);
        let traitHorizontal5 = segment(point(0,-4),point(12, -4));
        let traitVertical5 = segment(point(6,-4),point(6,-2));
        let tb5 = texteParPosition('?',6, -5);
        let th51 = texteParPosition(b,3, -3);
        let th52 = texteParPosition(a,9, -3);

       
        let A6 = point(16,-6);
        let B6 = point(28,-6);
        let C6 = point(28,-2);
        let D6 = point(16,-2);
        let p2 = polygone(A6,B6,C6,D6);
        let traitHorizontal6 = segment(point(16,-4),point(28, -4));
        let traitVertical6 = segment(point(22,-4),point(22,-2));
        let tb6 = texteParPosition(d,22, -5);
        let th61 = texteParPosition(c,19, -3);
        let th62 = texteParPosition('...',25, -3);

        let A7 = point(32,-6);
        let B7 = point(44,-6);
        let C7 = point(44,-2);
        let D7 = point(32,-2);
        let p7 = polygone(A7,B7,C7,D7);
        let traitHorizontal7 = segment(point(32,-4),point(44, -4));
        let traitVertical7 = segment(point(38,-4),point(38,-2));
        let tb7 = texteParPosition('?',38, -5);
        let th71 = texteParPosition(b,35, -3);
        let th72 = texteParPosition(b,41, -3);

        let A8 = point(48,-6);
        let B8 = point(60,-6);
        let C8 = point(60,-2);
        let D8 = point(48,-2);
        let p8 = polygone(A8,B8,C8,D8);
        let traitHorizontal8 = segment(point(48,-4),point(60, -4));
        let traitVertical8 = segment(point(54,-4),point(54,-2));
        let tb8 = texteParPosition(b,54, -5);
        let th81 = texteParPosition(a,51, -3);
        let th82 = texteParPosition('?',57, -3);


        texte += mathalea2d(
          {xmin: -1, ymin: -7, xmax:61, ymax: 4.5, pixelsParCm: 40, scale:1}, p1, traitHorizontal1, traitVertical1, tb1, th11, th12, 
                                                                            p2, traitHorizontal2, traitVertical2, tb2, th21, th22,
                                                                            p3, traitHorizontal3, traitVertical3, tb3, th31, th32, 
                                                                            p4, traitHorizontal4, traitVertical4, tb4, th41, th42,
                                                                            p5, traitHorizontal5, traitVertical5, tb5, th51, th52, 
                                                                            p6, traitHorizontal6, traitVertical6, tb6, th61, th62,
                                                                            p7, traitHorizontal7, traitVertical7, tb7, th71, th72, 
                                                                            p8, traitHorizontal8, traitVertical8, tb8, th81, th82,
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
  