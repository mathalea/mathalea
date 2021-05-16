import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, combinaisonListes, quotientier, randint, reduireAxPlusB, choice, ecritureAlgebrique } from '../../modules/outils.js'
import { repere2, courbe2, mathalea2d, point, tracePoint, labelPoint } from '../../modules/2d.js'



export const titre = 'Représentation graphique d’une fonction affine'

/**

*/
export default function representer_fonction_affine() {
  Exercice.call(this);
  this.titre = titre;
  this.consigne = "";
  this.nbQuestions = 3;//On complète le nb de questions
  this.nbCols = 2;
  this.nbColsCorr = 2;
  this.tailleDiaporama = 100;
  this.video = "";
  this.spacing = 1;
  this.spacingCorr = 1;
  this.spacingCorr = 3


  this.nouvelleVersion = function () {
    this.listeQuestions = [];
    this.listeCorrections = [];
    let typesDeQuestionsDisponibles = [];
    typesDeQuestionsDisponibles = [1, 2];// On complète selon le nb de cas dans l'exo (switch)

    let listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions);

    for (let i = 0, A, B, a, b, r, f, c, t, l, xA, xB, yA, yB, texte, texteCorr, cpt = 0, typesDeQuestions;
      i < this.nbQuestions && cpt < 50;) // on rajoute les variables dont on a besoin
    {
      typesDeQuestions = listeTypeDeQuestions[i];


      switch (typesDeQuestions) {

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
          texteCorr = `On sait que l'expression algébrique d'une fonction affine est de la forme :$f(x)=ax+b$, avec $a$ et $b$ deux réels.<br>`;
          texteCorr +=`Le premier coefficient qu'on peut facilement lire graphiquement est $b$, l'ordonnée à l'origine de la droite.<br>`
          texteCorr +=`On lit ici que le point $(0;${b}) \\in \\mathcal{C_f}$.<br>`
          texteCorr += `On peut alors conclure que l'ordonnée à l'origine est : $${b}$. <br>`
          texteCorr += `On peut lire le coefficient directeur de la droite, en lisant le déplacement vertical correspondant à un déplacement horizontal d'une unité .<br>`
          texteCorr += `On lit alors que le coefficient directeur de la droite est : $${a}$.<br>`          
          texteCorr += ` On peut en déduire que l'expression de la fonction $f$ est`

          texteCorr += `$f(x)=${reduireAxPlusB(a, b)}$`
          texteCorr += mathalea2d({
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
          texte = `Représenter graphiquement la fonction affinne $f$ défiie sur $\\mathbb R$ par $f(x)=${reduireAxPlusB(a, b)}$ <br>`;
          texteCorr = `On sait que la représentation graphique d'une fonction affine est une droite.<br>`
          texteCorr += `Il suffit donc de déterminer les coordonnées de deux points pour pouvoir représenter $f$.<br>`                
          texteCorr +=`On sait que si $f(x)=ax+b$, le coefficient $b$ est l'ordonnée à l'origine.<br>`
          texteCorr +=`On lit donc ici que $b=${b}$, donc que le point $(0;${b}) \\in \\mathcal{C_f}$.<br>`
          texteCorr += `On cherche un deuxième point, et on prend une abscisse au hasard :<br>` 
          texteCorr += `Soit $x=${xA}$ :<br>` 
          texteCorr += `On calcule : $y=${a} \\times ${xA}${ecritureAlgebrique(b)}$:<br>` 
          texteCorr += `On obtient : $y=${yA}$<br>` 
          texteCorr +=`Le point $(${xA};${yA}) \\in \\mathcal{C_f}$.<br>`
          texteCorr += mathalea2d({
          xmin: -6,
          ymin: -10,
          xmax: 6,
          ymax: 10
          }, r,c,t, l);
          break;
                }


                if (this.listeQuestions.indexOf(texte) === -1) {
                  // Si la question n'a jamais été posée, on en créé une autre
                  this.listeQuestions.push(texte);
                  this.listeCorrections.push(texteCorr);
                  i++;
                }
                cpt++;
              }
              
              listeQuestionsToContenu(this);



            };
          }
