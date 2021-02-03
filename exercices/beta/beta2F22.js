import Exercice from '../ClasseExercice.js';
import { liste_de_question_to_contenu, combinaison_listes, quotientier, randint, reduire_ax_plus_b, choice, ecriture_algebrique } from "/modules/outils.js"
import { repere2, courbe2, mathalea2d, point, tracePoint, labelPoint } from "/modules/2d.js"



/**

*/
export default function representer_fonction_affine() {
  Exercice.call(this);
  this.titre = "Représentation graphique d'une fonction affine";
  this.consigne = "";
  this.nb_questions = 3;//On complète le nb de questions
  this.nb_cols = 2;
  this.nb_cols_corr = 2;
  this.tailleDiaporama = 100;
  this.video = "";
  this.spacing = 1;
  this.spacing_corr = 1;
  this.spacing_corr = 3


  this.nouvelle_version = function () {
    this.liste_questions = [];
    this.liste_corrections = [];
    let type_de_questions_disponibles = [];
    type_de_questions_disponibles = [1, 2];// On complète selon le nb de cas dans l'exo (switch)

    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);

    for (let i = 0, A, B, a, b, r, f, c, t, l, xA, xB, yA, yB, texte, texte_corr, cpt = 0, type_de_questions;
      i < this.nb_questions && cpt < 50;) // on rajoute les variables dont on a besoin
    {
      type_de_questions = liste_type_de_questions[i];


      switch (type_de_questions) {

        case 1:
          a = randint(0, 10)
          a = a - 5;//coefficient directeur
          b = randint(0, 10);
          b = b - 5//ordonnée à l'origine
          if (a == 0 && b == 0) {
            a = 1
          }// On évite la fonction nulle
          r = repere2()//On définit le repère
          f = x => a * x + b//On définit la fonction affine
          c = courbe2(f, { repere: r })// On définit l'objet qui tracera la courbe dans le repère
          texte = `Déterminer graphiquement l'expression algébrique de la fonction affine $f$ représentée ci-dessous :<br>`;
          texte += mathalea2d({
            xmin: -6,
            ymin: -6,
            xmax: 6,
            ymax: 6
          }, r, f, c);// On trace le graphique
          texte_corr = `On sait que l'expression algébrique d'une fonction affine est de la forme :$f(x)=ax+b$, avec $a$ et $b$ deux réels.<br>`;
          texte_corr +=`Le premier coefficient qu'on peut facilement lire graphiquement est $b$, l'ordonnée à l'origine de la droite.<br>`
          texte_corr +=`On lit ici que le point $(0;${b}) \\in \\mathcal{C_f}$.<br>`
          texte_corr += `On peut alors conclure que l'ordonnée à l'origine est : $${b}$. <br>`
          texte_corr += `On peut lire le coefficient directeur de la droite, en lisant le déplacement vertical correspondant à un déplacement horizontal d'une unité .<br>`
          texte_corr += `On lit alors que le coefficient directeur de la droite est : $${a}$.<br>`          
          texte_corr += ` On peut en déduire que l'expression de la fonction $f$ est`

          texte_corr += `$f(x)=${reduire_ax_plus_b(a, b)}$`
          texte_corr += mathalea2d({
            xmin: -6,
            ymin: -6,
            xmax: 6,
            ymax: 6
          }, r, f, c);// On trace le graphique

         
          break;
        case 2:
          a = randint(0, 3)*choice([-1,1])// coefficient a de la fonction affine
          b = randint(0, 3)*choice([-1,1])// coefficient b de la fonction affine
   
          if (a == 0 && b == 0) // On évite la fonction nulle
              { a == 1}
          r = repere2()
          f = x => a * x + b
          c = courbe2(f, { repere: r })
          xA = randint(1, 3) * choice([-1, 1])// Abscisse de A
          yA = a * xA + b// Ordonnée de A
         
          A = point(xA, yA)
          B = point(0, b)
  
             
          t = tracePoint(A, B,'red') // Variable qui trace les points avec une croix
          l = labelPoint(A,B)// Variable qui trace les nom s A et B
          l.color='red'
          texte = `Représenter graphiquement la fonction affinne $f$ défiie sur $\\mathbb R$ par $f(x)=${reduire_ax_plus_b(a, b)}$ <br>`;
          texte_corr = `On sait que la représentation graphique d'une fonction affine est une droite.<br>`
          texte_corr += `Il suffit donc de déterminer les coordonnées de deux points pour pouvoir représenter $f$.<br>`                
          texte_corr +=`On sait que si $f(x)=ax+b$, le coefficient $b$ est l'ordonnée à l'origine.<br>`
          texte_corr +=`On lit donc ici que $b=${b}$, donc que le point $(0;${b}) \\in \\mathcal{C_f}$.<br>`
          texte_corr += `On cherche un deuxième point, et on prend une abscisse au hasard :<br>` 
          texte_corr += `Soit $x=${xA}$ :<br>` 
          texte_corr += `On calcule : $y=${a} \\times ${xA}${ecriture_algebrique(b)}$:<br>` 
          texte_corr += `On obtient : $y=${yA}$<br>` 
          texte_corr +=`Le point $(${xA};${yA}) \\in \\mathcal{C_f}$.<br>`
          texte_corr += mathalea2d({
          xmin: -6,
          ymin: -10,
          xmax: 6,
          ymax: 10
          }, r,c,t, l);
          break;
                }


                if (this.liste_questions.indexOf(texte) == -1) {
                  // Si la question n'a jamais été posée, on en créé une autre
                  this.liste_questions.push(texte);
                  this.liste_corrections.push(texte_corr);
                  i++;
                }
                cpt++;
              }
              
              liste_de_question_to_contenu(this);



            };
          }
