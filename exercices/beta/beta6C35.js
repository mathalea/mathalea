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
  this.nb_cols = 1; 
  this.nb_cols_corr = 1; 
  this.tailleDiaporama = 50; 
  this.video = "" ;
  this.correction_detaillee_disponible=true;
  this.correction_detaillee=true;

  this.nouvelle_version = function () {
  this.liste_questions = []; 
  this.liste_corrections = []; 

  let type_de_questions_disponibles=[1, 2, 3, 4, 5, 6, 7, 8];
  let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
  
  let b1 = randint(15,50);
  let c1 = randint(5,9);
  let b3 = randint(15,50);
  let c3 = randint(5,9);
  let d3 = c3*randint(7,13);
  let a5 = randint(9,13);
  let b5 = randint(15,50);
  let c5 = randint(5,9);  
  let a7 = randint(9,13);
  let b7 = randint(15,50);
  let c7 = randint(5,9);
  let d7 = c7*randint(7,13);
  let o = choice([1,2]);
  let A1, A2, A3, A4, A5, A6, A7, A8, B1, B2, B3, B4, B5, B6, B7, B8, C1, C2, C3, C4, C5, C6, C7, C8, D1, D2, D3, D4, D5, D6, D7, D8,
  p1, traitHorizontal1, traitVertical1, tb1, th1, th12,
  p2, traitHorizontal2, traitVertical2, tb2, th2, th22,
  p3, traitHorizontal3, traitVertical3, tb3, th3, th32, traitHorizontal32, traitVertical32, traitVertical33, th33, th34, th35,
  p4, traitHorizontal4, traitVertical4, tb4, th4, th42, traitHorizontal42, traitVertical42, traitVertical43, th43, th44, th45,
  p5, traitHorizontal5, traitVertical5, tb5, th5, th52,
  p6, traitHorizontal6, traitVertical6, tb6, th6, th62,
  p7, traitHorizontal7, traitVertical7, tb7, th7, th72, traitHorizontal72, traitVertical72, traitVertical73, th73, th74, th75,
  p8, traitHorizontal8, traitVertical8, tb8, th8, th82;

    for (let i = 0, texte, schemas, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {  

      texte = ``
      schemas = `` 
      texte_corr = ``

      switch (liste_type_de_questions[i]) { 

        case 1:
          if (o == 1){
             texte += `${prenomF()} avait ${b1} ${objet()} ${jour()}. `;
             texte += `<br>Le lendemain, elle en a trouvé ${c1} autres.`;
             texte += `<br>Combien cela lui en fait-il ?`;
          }
          else {
            texte += `${prenomM()} a ${c1} ans de moins que sa soeur ${prenomF()}.`;
            texte += `<br>Sachant qu'il a ${b1} ans, quel âge a sa soeur ?`;
          }

           A1 = point(0,0);
           B1 = point(12,0);
           C1 = point(12,4);
           D1 = point(0,4);
           p1 = polygone([A1,B1,C1,D1],'red');
           traitHorizontal1 = segment(point(0,2),point(12, 2));
           traitVertical1 = segment(point(6,2),point(6,4));
           tb1 = texteParPosition('?',6, 1);
           th1 = texteParPosition(b1,3, 3);
           th12 = texteParPosition(c1,9, 3);


           texte_corr += `Cet énoncé est associé avec le premier schéma rouge.`
           if (this.correction_detaillee) { 
             texte_corr += '<br>' + mathalea2d(
               {xmin: -1, ymin: -1, xmax:61, ymax: 5, pixelsParCm: 15, scale:0.25}, 
               p1, traitHorizontal1, traitVertical1, tb1, th1, th12,
               );
           texte_corr += "<br> (Pour mémoire, l'énoncé était :<br> " + texte + ')';
           }   

           if (i == 7){
            texte += '<br><br> Les schémas à associer avec chacun des énoncés sont : <br>' + mathalea2d(
              {xmin: -1, ymin: -7, xmax:61, ymax: 6.5, pixelsParCm: 15, scale:0.25}, 
              p1, traitHorizontal1, traitVertical1, tb1, th1, th12, 
              p2, traitHorizontal2, traitVertical2, tb2, th2, th22, 
              p3, traitHorizontal3, traitVertical3, tb3, th3, th32, traitHorizontal32, traitVertical32, traitVertical33, th33, th34, th35,
              p4, traitHorizontal4, traitVertical4, tb4, th4, th42, traitHorizontal42, traitVertical42, traitVertical43, th43, th44, th45,
              p5, traitHorizontal5, traitVertical5, tb5, th5, th52,
              p6, traitHorizontal6, traitVertical6, tb6, th6, th62,
              p7, traitHorizontal7, traitVertical7, tb7, th7, th72, traitHorizontal72, traitVertical72, traitVertical73, th73, th74, th75,
              p8, traitHorizontal8, traitVertical8, tb8, th8, th82,  
              ); }     
           
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

           A2 = point(16,0);
           B2 = point(28,0);
           C2 = point(28,4);
           D2 = point(16,4);
           p2 = polygone([A2,B2,C2,D2],'red');
           traitHorizontal2 = segment(point(16,2),point(28, 2));
           traitVertical2 = segment(point(22,2),point(22,4));
           tb2 = texteParPosition(b1,22, 1);
           th2 = texteParPosition(c1,19, 3);
           th22 = texteParPosition('?',25, 3);


           texte_corr += `Cet énoncé est associé avec le deuxième schéma rouge.`
           if (this.correction_detaillee) { 
             texte_corr += '<br>' + mathalea2d(
               {xmin: 15, ymin: -1, xmax:61, ymax: 5, pixelsParCm: 15, scale:0.25}, 
               p2, traitHorizontal2, traitVertical2, tb2, th2, th22, 
               );
           texte_corr += "<br> (Pour mémoire, l'énoncé était :<br> " + texte + ')';
           }

           if (i == 7){
            texte += '<br><br> Les schémas à associer avec chacun des énoncés sont : <br>' + mathalea2d(
              {xmin: -1, ymin: -7, xmax:61, ymax: 6.5, pixelsParCm: 15, scale:0.25}, 
              p1, traitHorizontal1, traitVertical1, tb1, th1, th12, 
              p2, traitHorizontal2, traitVertical2, tb2, th2, th22, 
              p3, traitHorizontal3, traitVertical3, tb3, th3, th32, traitHorizontal32, traitVertical32, traitVertical33, th33, th34, th35,
              p4, traitHorizontal4, traitVertical4, tb4, th4, th42, traitHorizontal42, traitVertical42, traitVertical43, th43, th44, th45,
              p5, traitHorizontal5, traitVertical5, tb5, th5, th52,
              p6, traitHorizontal6, traitVertical6, tb6, th6, th62,
              p7, traitHorizontal7, traitVertical7, tb7, th7, th72, traitHorizontal72, traitVertical72, traitVertical73, th73, th74, th75,
              p8, traitHorizontal8, traitVertical8, tb8, th8, th82,  
              ); }     

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
                    
           A3 = point(32,0);
           B3 = point(44,0);
           C3 = point(44,4);
           D3 = point(32,4);
           p3 = polygone([A3,B3,C3,D3],'red');
           traitHorizontal3 = segment(point(32,2),point(44, 2));
           traitHorizontal32 = segment(point(32,5),point(44, 5));
           traitHorizontal32.styleExtremites = '<->';
           traitVertical3 = segment(point(34,2),point(34,4));
           traitVertical32 = segment(point(36,2),point(36,4));
           traitVertical33 = segment(point(42,2),point(42,4));
           tb3 = texteParPosition(d3,38, 1);
           th3 = texteParPosition('?',33, 3);
           th32 = texteParPosition('?',35, 3);
           th33 = texteParPosition('. . .',39, 3);
           th34 = texteParPosition('?',43, 3);
           th35 = texteParPosition(c3,38, 6);


           texte_corr += `Cet énoncé est associé avec le troisième schéma rouge.`
           if (this.correction_detaillee) { 
             texte_corr += '<br>' + mathalea2d(
               {xmin: 31, ymin: -1, xmax:61, ymax: 6.5, pixelsParCm: 15, scale:0.25}, 
               p3, traitHorizontal3, traitVertical3, tb3, th3, th32, traitHorizontal32, traitVertical32, traitVertical33, th33, th34, th35,
               );
           texte_corr += "<br> (Pour mémoire, l'énoncé était :<br> " + texte + ')';
           }

           if (i == 7){
            texte += '<br><br> Les schémas à associer avec chacun des énoncés sont : <br>' + mathalea2d(
              {xmin: -1, ymin: -7, xmax:61, ymax: 6.5, pixelsParCm: 15, scale:0.25}, 
              p1, traitHorizontal1, traitVertical1, tb1, th1, th12, 
              p2, traitHorizontal2, traitVertical2, tb2, th2, th22, 
              p3, traitHorizontal3, traitVertical3, tb3, th3, th32, traitHorizontal32, traitVertical32, traitVertical33, th33, th34, th35,
              p4, traitHorizontal4, traitVertical4, tb4, th4, th42, traitHorizontal42, traitVertical42, traitVertical43, th43, th44, th45,
              p5, traitHorizontal5, traitVertical5, tb5, th5, th52,
              p6, traitHorizontal6, traitVertical6, tb6, th6, th62,
              p7, traitHorizontal7, traitVertical7, tb7, th7, th72, traitHorizontal72, traitVertical72, traitVertical73, th73, th74, th75,
              p8, traitHorizontal8, traitVertical8, tb8, th8, th82,  
              ); }        

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

           A4 = point(48,0);
           B4 = point(60,0);
           C4 = point(60,4);
           D4 = point(48,4);
           p4 = polygone([A4,B4,C4,D4],'red');
           traitHorizontal4 = segment(point(48,2),point(60, 2));
           traitHorizontal42 = segment(point(48,5),point(60, 5));
           traitHorizontal42.styleExtremites = '<->';
           traitVertical4 = segment(point(50,2),point(50,4));
           traitVertical42 = segment(point(52,2),point(52,4));
           traitVertical43 = segment(point(58,2),point(58,4));
           tb4 = texteParPosition('?',54, 1);
           th4 = texteParPosition(b3,49, 3);
           th42 = texteParPosition(b3,51, 3);
           th43 = texteParPosition('. . .',55, 3);
           th44 = texteParPosition(b3,59, 3);
           th45 = texteParPosition(c3,54, 6);


           texte_corr += `Cet énoncé est associé avec le quatrième schéma rouge.`
           if (this.correction_detaillee) { 
             texte_corr += '<br>' + mathalea2d(
               {xmin: 47, ymin: -1, xmax:61, ymax: 6.5, pixelsParCm: 15, scale:0.25}, 
               p4, traitHorizontal4, traitVertical4, tb4, th4, th42, traitHorizontal42, traitVertical42, traitVertical43, th43, th44, th45,
               );
           texte_corr += "<br> (Pour mémoire, l'énoncé était :<br> " + texte + ')';
           }

           if (i == 7){
            texte += '<br><br> Les schémas à associer avec chacun des énoncés sont : <br>' + mathalea2d(
              {xmin: -1, ymin: -7, xmax:61, ymax: 6.5, pixelsParCm: 15, scale:0.25}, 
              p1, traitHorizontal1, traitVertical1, tb1, th1, th12, 
              p2, traitHorizontal2, traitVertical2, tb2, th2, th22, 
              p3, traitHorizontal3, traitVertical3, tb3, th3, th32, traitHorizontal32, traitVertical32, traitVertical33, th33, th34, th35,
              p4, traitHorizontal4, traitVertical4, tb4, th4, th42, traitHorizontal42, traitVertical42, traitVertical43, th43, th44, th45,
              p5, traitHorizontal5, traitVertical5, tb5, th5, th52,
              p6, traitHorizontal6, traitVertical6, tb6, th6, th62,
              p7, traitHorizontal7, traitVertical7, tb7, th7, th72, traitHorizontal72, traitVertical72, traitVertical73, th73, th74, th75,
              p8, traitHorizontal8, traitVertical8, tb8, th8, th82,  
              ); }      

           
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

             A5 = point(0,-6);
             B5 = point(12,-6);
             C5 = point(12,-2);
             D5 = point(0,-2);
             p5 = polygone([A5,B5,C5,D5],'green');
             traitHorizontal5 = segment(point(0,-4),point(12, -4));
             traitVertical5 = segment(point(6,-4),point(6,-2));
             tb5 = texteParPosition(b5,6, -5);
             th5 = texteParPosition('?',3, -3);
             th52 = texteParPosition(c5,9, -3);


             texte_corr += `Cet énoncé est associé avec le premier schéma vert.`
             if (this.correction_detaillee) { 
               texte_corr += '<br>' + mathalea2d(
                 {xmin: -1, ymin: -7, xmax:61, ymax: -0.5, pixelsParCm: 15, scale:0.25}, 
                 p5, traitHorizontal5, traitVertical5, tb5, th5, th52,
                 );
             texte_corr += "<br> (Pour mémoire, l'énoncé était :<br> " + texte + ')';
             }

             if (i == 7){
              texte += '<br><br> Les schémas à associer avec chacun des énoncés sont : <br>' + mathalea2d(
                {xmin: -1, ymin: -7, xmax:61, ymax: 6.5, pixelsParCm: 15, scale:0.25}, 
                p1, traitHorizontal1, traitVertical1, tb1, th1, th12, 
                p2, traitHorizontal2, traitVertical2, tb2, th2, th22, 
                p3, traitHorizontal3, traitVertical3, tb3, th3, th32, traitHorizontal32, traitVertical32, traitVertical33, th33, th34, th35,
                p4, traitHorizontal4, traitVertical4, tb4, th4, th42, traitHorizontal42, traitVertical42, traitVertical43, th43, th44, th45,
                p5, traitHorizontal5, traitVertical5, tb5, th5, th52,
                p6, traitHorizontal6, traitVertical6, tb6, th6, th62,
                p7, traitHorizontal7, traitVertical7, tb7, th7, th72, traitHorizontal72, traitVertical72, traitVertical73, th73, th74, th75,
                p8, traitHorizontal8, traitVertical8, tb8, th8, th82,  
                ); }  

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

               A6 = point(16,-6);
               B6 = point(28,-6);
               C6 = point(28,-2);
               D6 = point(16,-2);
               p6 = polygone([A6,B6,C6,D6],'green');
               traitHorizontal6 = segment(point(16,-4),point(28, -4));
               traitVertical6 = segment(point(22,-4),point(22,-2));
               tb6 = texteParPosition('?',22, -5);
               th6 = texteParPosition(b5,19, -3);
               th62 = texteParPosition(a5,25, -3);


               texte_corr += `Cet énoncé est associé avec le deuxième schéma vert.`
               if (this.correction_detaillee) { 
                 texte_corr += '<br>' + mathalea2d(
                   {xmin: 15, ymin: -7, xmax:61, ymax: -0.5, pixelsParCm: 15, scale:0.25}, 
                   p6, traitHorizontal6, traitVertical6, tb6, th6, th62,
                   );
               texte_corr += "<br> (Pour mémoire, l'énoncé était :<br> " + texte + ')';
               }

               if (i == 7){
                texte += '<br><br> Les schémas à associer avec chacun des énoncés sont : <br>' + mathalea2d(
                  {xmin: -1, ymin: -7, xmax:61, ymax: 6.5, pixelsParCm: 15, scale:0.25}, 
                  p1, traitHorizontal1, traitVertical1, tb1, th1, th12, 
                  p2, traitHorizontal2, traitVertical2, tb2, th2, th22, 
                  p3, traitHorizontal3, traitVertical3, tb3, th3, th32, traitHorizontal32, traitVertical32, traitVertical33, th33, th34, th35,
                  p4, traitHorizontal4, traitVertical4, tb4, th4, th42, traitHorizontal42, traitVertical42, traitVertical43, th43, th44, th45,
                  p5, traitHorizontal5, traitVertical5, tb5, th5, th52,
                  p6, traitHorizontal6, traitVertical6, tb6, th6, th62,
                  p7, traitHorizontal7, traitVertical7, tb7, th7, th72, traitHorizontal72, traitVertical72, traitVertical73, th73, th74, th75,
                  p8, traitHorizontal8, traitVertical8, tb8, th8, th82,  
                  ); }  

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

                 A7 = point(32,-6);
                 B7 = point(44,-6);
                 C7 = point(44,-2);
                 D7 = point(32,-2);
                 p7 = polygone([A7,B7,C7,D7],'green');
                 traitHorizontal7 = segment(point(32,-4),point(44, -4));
                 traitHorizontal72 = segment(point(32,-1.3),point(44, -1.3));
                 traitHorizontal72.styleExtremites = '<->';
                 traitVertical7 = segment(point(34,-4),point(34,-2));
                 traitVertical72 = segment(point(36,-4),point(36,-2));
                 traitVertical73 = segment(point(42,-4),point(42,-2));
                 tb7 = texteParPosition(d7,38, -5);
                 th7 = texteParPosition(c7,33, -3);
                 th72 = texteParPosition(c7,35, -3);
                 th73 = texteParPosition('. . .',39, -3);
                 th74 = texteParPosition(c7,43, -3);
                 th75 = texteParPosition('?',38, -0.8);


                 texte_corr += `Cet énoncé est associé avec le troisième schéma vert.`
                 if (this.correction_detaillee) { 
                   texte_corr += '<br>' + mathalea2d(
                     {xmin: 31, ymin: -7, xmax:61, ymax: -0.5, pixelsParCm: 15, scale:0.25}, 
                     p7, traitHorizontal7, traitVertical7, tb7, th7, th72, traitHorizontal72, traitVertical72, traitVertical73, th73, th74, th75,
                     );
                 texte_corr += "<br> (Pour mémoire, l'énoncé était :<br> " + texte + ')';
                 }

                 if (i == 7){
                  texte += '<br><br> Les schémas à associer avec chacun des énoncés sont : <br>' + mathalea2d(
                    {xmin: -1, ymin: -7, xmax:61, ymax: 6.5, pixelsParCm: 15, scale:0.25}, 
                    p1, traitHorizontal1, traitVertical1, tb1, th1, th12, 
                    p2, traitHorizontal2, traitVertical2, tb2, th2, th22, 
                    p3, traitHorizontal3, traitVertical3, tb3, th3, th32, traitHorizontal32, traitVertical32, traitVertical33, th33, th34, th35,
                    p4, traitHorizontal4, traitVertical4, tb4, th4, th42, traitHorizontal42, traitVertical42, traitVertical43, th43, th44, th45,
                    p5, traitHorizontal5, traitVertical5, tb5, th5, th52,
                    p6, traitHorizontal6, traitVertical6, tb6, th6, th62,
                    p7, traitHorizontal7, traitVertical7, tb7, th7, th72, traitHorizontal72, traitVertical72, traitVertical73, th73, th74, th75,
                    p8, traitHorizontal8, traitVertical8, tb8, th8, th82,  
                    ); }  

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

                   A8 = point(48,-6);
                   B8 = point(60,-6);
                   C8 = point(60,-2);
                   D8 = point(48,-2);
                   p8 = polygone([A8,B8,C8,D8], 'green');
                   traitHorizontal8 = segment(point(48,-4),point(60, -4));
                   traitVertical8 = segment(point(54,-4),point(54,-2));
                   tb8 = texteParPosition(b7,54, -5);
                   th8 = texteParPosition(a7,51, -3);
                   th82 = texteParPosition('?',57, -3); 


                   texte_corr += `Cet énoncé est associé avec le quatrième schéma vert.`
                   if (this.correction_detaillee) { 
                     texte_corr += '<br>' + mathalea2d(
                       {xmin: 47, ymin: -7, xmax:61, ymax: -0.5, pixelsParCm: 15, scale:0.25}, 
                       p8, traitHorizontal8, traitVertical8, tb8, th8, th82,  
                       );
                   texte_corr += "<br> (Pour mémoire, l'énoncé était :<br> " + texte + ')';
                   }

                   if (i == 7){
                    texte += '<br><br> Les schémas à associer avec chacun des énoncés sont : <br>' + mathalea2d(
                      {xmin: -1, ymin: -7, xmax:61, ymax: 6.5, pixelsParCm: 15, scale:0.25}, 
                      p1, traitHorizontal1, traitVertical1, tb1, th1, th12, 
                      p2, traitHorizontal2, traitVertical2, tb2, th2, th22, 
                      p3, traitHorizontal3, traitVertical3, tb3, th3, th32, traitHorizontal32, traitVertical32, traitVertical33, th33, th34, th35,
                      p4, traitHorizontal4, traitVertical4, tb4, th4, th42, traitHorizontal42, traitVertical42, traitVertical43, th43, th44, th45,
                      p5, traitHorizontal5, traitVertical5, tb5, th5, th52,
                      p6, traitHorizontal6, traitVertical6, tb6, th6, th62,
                      p7, traitHorizontal7, traitVertical7, tb7, th7, th72, traitHorizontal72, traitVertical72, traitVertical73, th73, th74, th75,
                      p8, traitHorizontal8, traitVertical8, tb8, th8, th82,  
                      ); }           

        break; 
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
  