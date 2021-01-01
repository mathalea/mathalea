import Exercice from '../ClasseExercice.js';
import { axes, } from "/modules/2d.js"
import { extraire_racine_carree, liste_de_question_to_contenu, randint, choice, combinaison_listes, ecriture_parenthese_si_negatif, fraction_simplifiee, tex_nombre } from "/modules/outils.js"
/**
 * 2G12
 * @Auteur Stéphane Guyon
 */
export default function Nature_polygone() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Déterminer la nature d'un polygone.";
  this.nb_questions = 2;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;
  // this.sup = 1 ; // 
  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles = [1, 2, 3, 4, 5], type_de_questions

    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
    for (let i = 0, a, facteur, radical, ux, uy, xA, yA, xB, yB, xC, yC, xD, yD, AB, XAB, YAB, XAC, YAC, XBC, YBC, AC, BC, XAD, YAD, AD, xI0, xI1, yI0, yI1, xJ0, xJ1, yJ0, yJ1, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
      type_de_questions = liste_type_de_questions[i];
      switch (type_de_questions) {
        // Cas par cas, on définit le type de nombres que l'on souhaite
        // Combien de chiffres ? Quelles valeurs ?

        case 1:


          xA = randint(0, 5) * choice([-1, 1])
          yA = randint(0, 5) * choice([-1, 1])
          ux = randint(1, 5) * choice([-1, 1])
          uy = randint(1, 5) * choice([-1, 1])
          xB = xA + ux

          yB = yA + uy

          xC = xA - uy
          yC = yA + ux
          XAB = (xB - xA) * (xB - xA)
          YAB = (yB - yA) * (yB - yA);
          AB = XAB + YAB;
          XAC = (xC - xA) * (xC - xA)
          YAC = (yC - yA) * (yC - yA)
          XBC = (xC - xB) * (xC - xB)
          YBC = (yC - yB) * (yC - yB)
          AC = XAC + YAC;
          texte = `Dans un repère orthonormé $(O,I,J)$, on donne les points suivants :`
          texte += ` $A\\left(${xA};${yA}\\right)$ ; $B\\left(${xB};${yB}\\right)$ et $C\\left(${xC};${yC}\\right)$`
          texte += `<br>Déterminer la nature du triangle $ABC$ `;


          texte_corr = `A partir du repère, on a envie de prouver que$ABC$ est un triangle isocèle en $A$.`
          texte_corr += `<br> On calcule donc séparément les distances $AB$ et $AC$ `
          texte_corr += `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d'un repère orthonormé,`
          texte_corr += ` alors on a : $AB=\\sqrt{\\left(x_B-x_A\\right)^{2}+\\left(y_B-y_A\\right)^{2}}$<br>`
          texte_corr += `On applique la relation à l'énoncé : $AB=\\sqrt{\\left(${xB}-${ecriture_parenthese_si_negatif(xA)}\\right)^{2}+\\left(${yB}-${ecriture_parenthese_si_negatif(yA)}\\right)^{2}}$<br>`
          texte_corr += `$\\phantom{On applique la relation a l'enonce :        } AB=\\sqrt{${XAB}+${YAB}}$<br>`
          texte_corr += `$\\phantom{On applique la relation a l'enonce :        } AB=\\sqrt{${tex_nombre(XAB + YAB)}}$<br>`
          facteur = extraire_racine_carree(AB)[0]
          radical = extraire_racine_carree(AB)[1]
          if (radical != 1) {
            if (facteur != 1) {
              texte_corr += `$\\phantom{On applique la relation a l'enonce :   } AB=${facteur}\\sqrt{${radical}}$<br>`
            }
          }
          else {
            texte_corr += `$\\phantom{On applique la relation a l'enonce :   } AB=${facteur}$<br>`
          }

          texte_corr += `De même : $AC=\\sqrt{\\left(${xC}-${ecriture_parenthese_si_negatif(xA)}\\right)^{2}+\\left(${yC}-${ecriture_parenthese_si_negatif(yA)}\\right)^{2}}$<br>`
          texte_corr += `$\\phantom{De meme :       } AC=\\sqrt{${XAC}+${YAC}}$<br>`
          texte_corr += `$\\phantom{De meme :       } AC=\\sqrt{${tex_nombre(XAC + YAC)}}$<br>`
          facteur = extraire_racine_carree(AC)[0]
          radical = extraire_racine_carree(AC)[1]
          if (radical != 1) {
            if (facteur != 1) {
              texte_corr += `$\\phantom{On applique la relation a l'enonce :   } AB=${facteur}\\sqrt{${radical}}$<br>`
            }
          }
          else {
            texte_corr += `$\\phantom{On applique la relation a l'enonce :   } AB=${facteur}$<br>`
          }
          texte_corr += `On observe que $AC=AB$ donc le triangle $ABC$ est isocèle.`
          texte_corr += `<br>On calcule $BC$ pour vérifier s'il est ou non  équilatéral.`
          texte_corr += `<br>On obtient : $BC=\\sqrt{${XBC}+${YBC}}=\\sqrt{${tex_nombre(XBC + YBC)}}$<br>`
          if (XBC + YBC == XAB + YAB) { texte_corr += `Le triangle $ABC$ est équilatéral.` }
          else { texte_corr += `Le triangle $ABC$ est simplement isocèle, il n'est pas équilatéral.` }

          ;
          break;
        case 2:


          xA = randint(0, 5) * choice([-1, 1])
          yA = randint(0, 5) * choice([-1, 1])
          ux = randint(1, 5) * choice([-1, 1])
          uy = randint(1, 5) * choice([-1, 1])
          xB = xA + ux;
          yB = yA + uy;
          xC = xA - uy;
          yC = yA + ux;
          XAB = (xB - xA) * (xB - xA)
          YAB = (yB - yA) * (yB - yA);
          AB = XAB + YAB;
          XAC = (xC - xA) * (xC - xA)
          YAC = (yC - yA) * (yC - yA)
          XBC = (xC - xB) * (xC - xB)
          YBC = (yC - yB) * (yC - yB)
          AC = XAC + YAC;
          texte = `Dans un repère orthonormé $(O,I,J)$, on donne les points suivants :`
          texte += ` $A\\left(${xA};${yA}\\right)$ ; $B\\left(${xB};${yB}\\right)$ et $C\\left(${xC};${yC}\\right)$`
          texte += `<br>Déterminer la nature du triangle $ABC$ `;



          texte_corr = `A partir du repère, on a envie de prouver que$ABC$ est un triangle rectangle en $A$.`
          texte_corr += `<br> Pour vérifier que le triangle est rectabgle, on va utiliser la réciproque du théorème de Pythagore.`
          texte_corr += `<br> On calcule donc séparément les distances $AB^{2}$ ; $AC^{2}$ et $BC^{2}$ pour vérifier si $BC^{2}=AB^{2}+AC^{2}$ .`
          texte_corr += `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d'un repère orthonormé,`
          texte_corr += ` alors on a : $AB^{2}=\\left(x_B-x_A\\right)^{2}+\\left(y_B-y_A\\right)^{2}$<br>`
          texte_corr += `On applique la relation à l'énoncé : $AB^{2}=\\left(${xB}-${ecriture_parenthese_si_negatif(xA)}\\right)^{2}+\\left(${yB}-${ecriture_parenthese_si_negatif(yA)}\\right)^{2}$<br>`
          texte_corr += `$\\phantom{On applique la relation a l'enonce :        } AB^{2}={${XAB}+${YAB}}$<br>`
          texte_corr += `$\\phantom{On applique la relation a l'enonce :        } AB^{2}={${tex_nombre(XAB + YAB)}}$<br>`

          texte_corr += `De même : $AC^{2}={\\left(${xC}-${ecriture_parenthese_si_negatif(xA)}\\right)^{2}+\\left(${yC}-${ecriture_parenthese_si_negatif(yA)}\\right)^{2}}$<br>`
          texte_corr += `$\\phantom{De meme :       } AC^{2}={${XAC}+${YAC}}$<br>`
          texte_corr += `$\\phantom{De meme :       } AC^{2}={${tex_nombre(XAC + YAC)}}$<br>`

          texte_corr += `Enfin : $BC^{2}={\\left(${xB}-${ecriture_parenthese_si_negatif(xB)}\\right)^{2}+\\left(${yC}-${ecriture_parenthese_si_negatif(yB)}\\right)^{2}}$<br>`
          texte_corr += `$\\phantom{De meme :       } BC^{2}={${XBC}+${YBC}}$<br>`
          texte_corr += `$\\phantom{De meme :       } BC^{2}={${tex_nombre(XBC + YBC)}}$<br>`
          texte_corr += `On observe que $AC^{2}+AB^{2}=${tex_nombre(XAC + YAC + XAB + YAB)} ~~et~~ BC^{2}={${tex_nombre(XBC + YBC)}}$.`
          texte_corr += `<br>On en déduit que $BC^{2}=AC^{2}+AB^{2}$.`
          texte_corr += `<br>D'après la réciproque du théorème de Pythagore,  le triangle ABC est rectangle en A.`;
          break;
        case 3:
          xA = randint(0, 9) * choice([-1, 1])
          yA = randint(0, 9) * choice([-1, 1])
          ux = randint(1, 5) * choice([-1, 1])
          uy = randint(1, 5) * choice([-1, 1])
          xB = xA + ux
          yB = yA + uy
          xC = xA - ux
          yC = yA - uy
          xD = xC + ux
          yD = yC + uy
          xI0 = fraction_simplifiee(xA + xD, 2)[0]
          xI1 = fraction_simplifiee(xA + xD, 2)[1]
          yI0 = fraction_simplifiee(yA + yD, 2)[0]
          yI1 = fraction_simplifiee(yA + yD, 2)[1]
          xJ0 = fraction_simplifiee(xB + xC, 2)[0]
          xJ1 = fraction_simplifiee(xB + xC, 2)[1]
          yJ0 = fraction_simplifiee(yB + yC, 2)[0]
          yJ1 = fraction_simplifiee(yB + yC, 2)[1]
          XAB = (xB - xA) * (xB - xA)
          YAB = (yB - yA) * (yB - yA);
          AB = XAB + YAB;
          XAD = (xD - xA) * (xD - xA)
          YAD = (yD - yA) * (yD - yA);
          AD = XAD + YAD;
          XAC = (xC - xA) * (xC - xA)
          YAC = (yC - yA) * (yC - yA)
          AC = XAC + YAC;
          a = axes(-9, -9, 9, 9, .2, 1)


          texte = `Dans un repère orthonormé (O,I,J), on donne les 4 points suivants :<br>`
          texte += ` $A\\left(${xA};${yA}\\right)$ ; $B\\left(${xB};${yB}\\right).$`
          texte += ` $C\\left(${xC};${yC}\\right)$ ; $D\\left(${xD};${yD}\\right).$`
          texte += `<br>Démontrer que $ABDC$ est un losange.`;

          texte_corr = `<br>Pour prouver que $ABDC$ est un losange, il y a deux stratégies :<br>`
          texte_corr += `$~~~~~~~~$<B>1.</B> On calcule les quatre longueurs du quadrilatère et on prouve leur égalité.<br>`
          texte_corr += `$\\phantom{~~~~~~~~}$Un quadrilatère qui possède quatre côtés de même longueur est un losange.<br>`
          texte_corr += `$~~~~~~~~$<B>2. </B> On prouve que $ABDC$ est un parallélogramme, puis il sufit de prouver qu'il possède deux côtés consécutifs de même longueur.<br>`
          texte_corr += `$\\phantom{~~~~~~~~}$ Un parallélogramme qui possède deux côtés consécutifs de même longueur est un losange`
          texte_corr += `<br>Les deux démonstrations se valent. On choisit ici la <B>démonstration n°2</B>, plus variée, mais la n°1 est valable.<br>`
          texte_corr += `<B>Démonstration :</B><br>`
          texte_corr += `On veut prouver que $ABDC$ est un parallélogramme :`
          texte_corr += `<br>On sait que ABDC est un parallélogramme si et seulement si ses diagonales se coupent en leur milieu.`
          texte_corr += `<br>On cherche donc les coordonnées du milieu de chacune des deux diagonales du quadrilatère, pour prouver qu'elles sont identiques. :`
          texte_corr += `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $D(x_D;y_D)$ sont deux points d'un repère ,`
          texte_corr += `<br> alors les coordonnées du point $I$ milieu de $[AD]$ sont `
          texte_corr += `$I\\left(\\dfrac{x_A+x_D}{2};\\dfrac{y_A+y_D}{2}\\right)$ <br>`
          texte_corr += `On applique la relation à l'énoncé : `
          texte_corr += `$\\begin{cases}x_I=\\dfrac{${xA}+${ecriture_parenthese_si_negatif(xD)}}{2} \\\\ y_I=\\dfrac{${yA}+${ecriture_parenthese_si_negatif(yD)}}{2}\\end{cases}$`
          texte_corr += `<br>On en déduit :  $\\begin{cases}x_I=\\dfrac{${tex_nombre(xA + xD)}}{2}\\\\y_I=\\dfrac{${tex_nombre(yA + yD)}}{2}\\end{cases}$`
          if (xI1 != 1 && yI1 != 1) { texte_corr += `  <br>Ce qui donne au final : $ I\\left(\\dfrac{${xI0}}{${xI1}};\\dfrac{${yI0}}{${yI1}};\\right)$` }
          if (xI1 == 1 && yI1 != 1) { texte_corr += `  <br>Ce qui donne au final : $ I\\left(${xI0};\\dfrac{${yI0}}{${yI1}}\\right)$` }
          if (xI1 != 1 && yI1 == 1) { texte_corr += `  <br>Ce qui donne au final : $ I\\left(\\dfrac{${xI0}}{${xI1}};${yI0}\\right)$` }
          if (xI1 == 1 && yI1 == 1) { texte_corr += `  <br>Ce qui donne au final : $ I\\left(${xI0};${yI0}\\right)$` }
          texte_corr += `<br> Les coordonnées du point $J$ milieu de $[BC]$ sont `
          texte_corr += `$J\\left(\\dfrac{x_B+x_C}{2};\\dfrac{y_B+y_C}{2}\\right)$ <br>`
          texte_corr += `On applique la relation à l'énoncé : `
          texte_corr += `$\\begin{cases}x_J=\\dfrac{${xB}+${ecriture_parenthese_si_negatif(xC)}}{2} \\\\ y_J=\\dfrac{${yB}+${ecriture_parenthese_si_negatif(yC)}}{2}\\end{cases}$`
          texte_corr += `<br>On en déduit :  $\\begin{cases}x_J=\\dfrac{${tex_nombre(xB + xC)}}{2}\\\\y_J=\\dfrac{${tex_nombre(yB + yC)}}{2}\\end{cases}$`
          if (xJ1 != 1 && yJ1 != 1) { texte_corr += `  <br>Ce qui donne au final : $ J\\left(\\dfrac{${xJ0}}{${xJ1}};\\dfrac{${yJ0}}{${yJ1}};\\right)$` }
          if (xJ1 == 1 && yJ1 != 1) { texte_corr += `  <br>Ce qui donne au final : $ J\\left(${xJ0};\\dfrac{${yJ0}}{${yJ1}}\\right)$` }
          if (xJ1 != 1 && yJ1 == 1) { texte_corr += `  <br>Ce qui donne au final : $ J\\left(\\dfrac{${xJ0}}{${xJ1}};${yJ0}\\right)$` }
          if (xJ1 == 1 && yJ1 == 1) { texte_corr += `  <br>Ce qui donne au final : $ J\\left(${xJ0};${yJ0}\\right)$` }
          texte_corr += `<br>On observe que $I$ et $J$ ont les mêmes coordonnées, donc les deux diagonales du quadrilatère se coupent en leur milieu.`
          texte_corr += `<br>$ABDC$ est donc un parallélogramme.`
          texte_corr += `<br>On calcule maintenant deux cotés consécutifs : $AB$ et $AC$ par exemple.`
          texte_corr += `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d'un repère orthonormé,`
          texte_corr += ` alors on a : $AB=\\sqrt{\\left(x_B-x_A\\right)^{2}+\\left(y_B-y_A\\right)^{2}}.$<br>`
          texte_corr += `On applique la relation à l'énoncé : $AB=\\sqrt{\\left(${xB}-${ecriture_parenthese_si_negatif(xA)}\\right)^{2}+\\left(${yB}-${ecriture_parenthese_si_negatif(yA)}\\right)^{2}}$<br>`
          texte_corr += `$\\phantom{On applique la relation a l'enonce :        } AB=\\sqrt{${XAB}+${YAB}}$<br>`
          texte_corr += `$\\phantom{On applique la relation a l'enonce :        } AB=\\sqrt{${tex_nombre(XAB + YAB)}}$<br>`

          facteur = extraire_racine_carree(AB)[0]
          radical = extraire_racine_carree(AB)[1]

          if (radical != 1) {
            if (facteur != 1) {
              texte_corr += `$\\phantom{On applique la relation a l'enonce :   } AB=${facteur}\\sqrt{${radical}}$<br>`
            }
          }
          else {
            texte_corr += `$\\phantom{On applique la relation a l'enonce :   } AB=${facteur}$<br>`
          }

          texte_corr += `On procède de même pour $AC$: $AC=\\sqrt{\\left(${xC}-${ecriture_parenthese_si_negatif(xA)}\\right)^{2}+\\left(${yC}-${ecriture_parenthese_si_negatif(yA)}\\right)^{2}}$<br>`
          texte_corr += `$\\phantom{On applique la relation a l'enonce :        } AC=\\sqrt{${XAC}+${YAC}}$<br>`
          texte_corr += `$\\phantom{On applique la relation a l'enonce :        } AC=\\sqrt{${tex_nombre(XAC + YAC)}}$<br>`
          facteur = extraire_racine_carree(AC)[0]
          radical = extraire_racine_carree(AC)[1]
          if (radical != 1) {
            if (facteur != 1) {
              texte_corr += `$\\phantom{On applique la relation a l'enonce :   } AC=${facteur}\\sqrt{${radical}}$<br>`
            }
          }
          else {
            texte_corr += `$\\phantom{On applique la relation a l'enonce :   } AC=\\sqrt{${radical}}$<br>`
          }
          texte_corr += `<br>On observe que $AB=AC$, $ABDC$ est donc bien un losange.`
            ;
          break;
        case 4:
          xA = randint(0, 6) * choice([-1, 1])
          yA = randint(0, 6) * choice([-1, 1])
          ux = randint(1, 3) * choice([-1, 1])
          uy = randint(1, 3) * choice([-1, 1])
          a = randint(2, 4)
          xB = xA + ux * a
          yB = yA + uy * a
          xC = xA - uy
          yC = yA + ux
          xD = xC + ux * a
          yD = yC + uy * a

          xI0 = fraction_simplifiee(xA + xD, 2)[0]
          xI1 = fraction_simplifiee(xA + xD, 2)[1]
          yI0 = fraction_simplifiee(yA + yD, 2)[0]
          yI1 = fraction_simplifiee(yA + yD, 2)[1]
          xJ0 = fraction_simplifiee(xB + xC, 2)[0]
          xJ1 = fraction_simplifiee(xB + xC, 2)[1]
          yJ0 = fraction_simplifiee(yB + yC, 2)[0]
          yJ1 = fraction_simplifiee(yB + yC, 2)[1]
          XAB = (xB - xA) * (xB - xA)
          YAB = (yB - yA) * (yB - yA);
          AB = XAB + YAB;
          XAC = (xC - xA) * (xC - xA)
          YAC = (yC - yA) * (yC - yA);
          AC = XAC + YAC;
          XAD = (xD - xA) * (xD - xA)
          YAD = (yD - yA) * (yD - yA);
          AD = XAD + YAD;
          XBC = (xB - xC) * (xB - xC)
          YBC = (yB - yC) * (yB - yC);
          BC = XBC + YBC;
          a = axes(-9, -9, 9, 9, .2, 1)


          texte = `Dans un repère orthonormé (O,I,J), on donne les 4 points suivants :<br>`
          texte += ` $A\\left(${xA};${yA}\\right)$ ; $B\\left(${xB};${yB}\\right).$`
          texte += ` $C\\left(${xC};${yC}\\right)$ ; $D\\left(${xD};${yD}\\right).$`
          texte += `<br>Démontrer que $ABDC$ est un rectangle.`;

          texte_corr = `<br>Pour prouver que $ABDC$ est un rectangle, il y a pluieurs stratégies :<br>`
          texte_corr += `$~~~~~~~~$<B>1.</B> On prouve avec la réciproque du théorème de Pythagore que $ABDC$ possède un angle droit,<br>`
          texte_corr += `$puis on prouve qu'il a ses côtés opposés de même longueur.<br>`
          texte_corr += `$~~~~~~~~$<B>2. </B> On prouve que $ABDC$ est un parallélogramme, puis il sufit de prouver que ses diagonales sont de même longueur.<br>`
          texte_corr += `$\\phantom{~~~~~~~~}$ Un parallélogramme qui a ses diagonales de même longueur est un rectangle.`
          texte_corr += `<br>Plusiurs démonstrations se valent. On choisit ici la <B>démonstration n°2</B>, mais d'autres idées sont valables.<br>`
          texte_corr += `<B>Démonstration :</B><br>`
          texte_corr += `On veut prouver que $ABDC$ est un parallélogramme :`
          texte_corr += `<br>On sait que $ABDC$ est un parallélogramme si et seulement si ses diagonales se coupent en leur milieu.`
          texte_corr += `<br>On cherche donc les coordonnées du milieu de chacune des deux diagonales du quadrilatère, pour prouver qu'elles sont identiques. :`
          texte_corr += `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $D(x_D;y_D)$ sont deux points d'un repère ,`
          texte_corr += `<br> alors les coordonnées du point $I$ milieu de $[AD]$ sont `
          texte_corr += `$I\\left(\\dfrac{x_A+x_D}{2};\\dfrac{y_A+y_D}{2}\\right)$ <br>`
          texte_corr += `On applique la relation a l'enonce : `
          texte_corr += `$\\begin{cases}x_I=\\dfrac{${xA}+${ecriture_parenthese_si_negatif(xD)}}{2} \\\\ y_I=\\dfrac{${yA}+${ecriture_parenthese_si_negatif(yD)}}{2}\\end{cases}$`
          texte_corr += `<br>On en déduit :  $\\begin{cases}x_I=\\dfrac{${tex_nombre(xA + xD)}}{2}\\\\y_I=\\dfrac{${tex_nombre(yA + yD)}}{2}\\end{cases}$`
          if (xI1 != 1 && yI1 != 1) { texte_corr += `  <br>Ce qui donne au final : $ I\\left(\\dfrac{${xI0}}{${xI1}};\\dfrac{${yI0}}{${yI1}};\\right)$` }
          if (xI1 == 1 && yI1 != 1) { texte_corr += `  <br>Ce qui donne au final : $ I\\left(${xI0};\\dfrac{${yI0}}{${yI1}}\\right)$` }
          if (xI1 != 1 && yI1 == 1) { texte_corr += `  <br>Ce qui donne au final : $ I\\left(\\dfrac{${xI0}}{${xI1}};${yI0}\\right)$` }
          if (xI1 == 1 && yI1 == 1) { texte_corr += `  <br>Ce qui donne au final : $ I\\left(${xI0};${yI0}\\right)$` }
          texte_corr += `<br> Les coordonnées du point $J$ milieu de $[BC]$ sont `
          texte_corr += `$J\\left(\\dfrac{x_B+x_C}{2};\\dfrac{y_B+y_C}{2}\\right)$ <br>`
          texte_corr += `On applique la relation à l'énoncé : `
          texte_corr += `$\\begin{cases}x_J=\\dfrac{${xB}+${ecriture_parenthese_si_negatif(xC)}}{2} \\\\ y_J=\\dfrac{${yB}+${ecriture_parenthese_si_negatif(yC)}}{2}\\end{cases}$`
          texte_corr += `<br>On en déduit :  $\\begin{cases}x_J=\\dfrac{${tex_nombre(xB + xC)}}{2}\\\\y_J=\\dfrac{${tex_nombre(yB + yC)}}{2}\\end{cases}$`
          if (xJ1 != 1 && yJ1 != 1) { texte_corr += `  <br>Ce qui donne au final : $ J\\left(\\dfrac{${xJ0}}{${xJ1}};\\dfrac{${yJ0}}{${yJ1}};\\right)$` }
          if (xJ1 == 1 && yJ1 != 1) { texte_corr += `  <br>Ce qui donne au final : $ J\\left(${xJ0};\\dfrac{${yJ0}}{${yJ1}}\\right)$` }
          if (xJ1 != 1 && yJ1 == 1) { texte_corr += `  <br>Ce qui donne au final : $ J\\left(\\dfrac{${xJ0}}{${xJ1}};${yJ0}\\right)$` }
          if (xJ1 == 1 && yJ1 == 1) { texte_corr += `  <br>Ce qui donne au final : $ J\\left(${xJ0};${yJ0}\\right)$` }
          texte_corr += `<br>On observe que $I$ et $J$ ont les mêmes coordonnées, donc les deux diagonales du quadrilatère se coupent en leur milieu.`
          texte_corr += `<br>$ABDC$ est donc un parallélogramme.`
          texte_corr += `<br>On calcule maintenant les diagonales de $ABDC$ : $AD$ et $BC$ par exemple.`
          texte_corr += `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $D(x_D;y_D)$ sont deux points d'un repère orthonormé,`
          texte_corr += ` alors on a : $AD=\\sqrt{\\left(x_D-x_A\\right)^{2}+\\left(y_D-y_A\\right)^{2}}.$<br>`
          texte_corr += `On applique la relation à l'énoncé : $AD=\\sqrt{\\left(${xD}-${ecriture_parenthese_si_negatif(xA)}\\right)^{2}+\\left(${yD}-${ecriture_parenthese_si_negatif(yA)}\\right)^{2}}$<br>`
          texte_corr += `$\\phantom{On applique la relation a l'enonce :        } AD=\\sqrt{${XAD}+${YAD}}$<br>`
          texte_corr += `$\\phantom{On applique la relation a l'enonce :        } AD=\\sqrt{${tex_nombre(XAD + YAD)}}$<br>`
          facteur = extraire_racine_carree(AD)[0]
          radical = extraire_racine_carree(AD)[1]
          if (radical != 1) {
            if (facteur != 1) {
              texte_corr += `$\\phantom{On applique la relation a l'enonce :   } AD=${facteur}\\sqrt{${radical}}$<br>`
            }
          }
          else {
            texte_corr += `$\\phantom{On applique la relation a l'enonce :   } AD=\\sqrt{${radical}}$<br>`
          }

          texte_corr += `On procède de même pour $BC$: $BC=\\sqrt{\\left(${xC}-${ecriture_parenthese_si_negatif(xB)}\\right)^{2}+\\left(${yC}-${ecriture_parenthese_si_negatif(yB)}\\right)^{2}}$<br>`
          texte_corr += `$\\phantom{On applique la relation a l'enonce :        } BC=\\sqrt{${XBC}+${YBC}}$<br>`
          texte_corr += `$\\phantom{On applique la relation a l'enonce :        } BC=\\sqrt{${tex_nombre(XBC + YBC)}}$<br>`
          facteur = extraire_racine_carree(BC)[0]
          radical = extraire_racine_carree(BC)[1]
          if (radical != 1) {
            if (facteur != 1) {
              texte_corr += `$\\phantom{On applique la relation a l'enonce :   } BC=${facteur}\\sqrt{${radical}}$<br>`
            }
          }
          else {
            texte_corr += `$\\phantom{On applique la relation a l'enonce :   } BC=${facteur}$<br>`
          }
          texte_corr += `<br>On observe que $BC=AD$, $ABDC$ est donc bien un rectangle.`

            ;
          break;
        case 5:
          xA = randint(0, 9) * choice([-1, 1])
          yA = randint(0, 9) * choice([-1, 1])
          ux = randint(1, 9) * choice([-1, 1])
          uy = randint(1, 9) * choice([-1, 1])
          xB = xA + ux
          yB = yA + uy
          xC = xA - uy
          yC = yA + ux
          xD = xC + ux
          yD = yC + uy

          xI0 = fraction_simplifiee(xA + xD, 2)[0]
          xI1 = fraction_simplifiee(xA + xD, 2)[1]
          yI0 = fraction_simplifiee(yA + yD, 2)[0]
          yI1 = fraction_simplifiee(yA + yD, 2)[1]
          xJ0 = fraction_simplifiee(xB + xC, 2)[0]
          xJ1 = fraction_simplifiee(xB + xC, 2)[1]
          yJ0 = fraction_simplifiee(yB + yC, 2)[0]
          yJ1 = fraction_simplifiee(yB + yC, 2)[1]
          XAB = (xB - xA) * (xB - xA)
          YAB = (yB - yA) * (yB - yA);
          AB = XAB + YAB;
          XAC = (xC - xA) * (xC - xA)
          YAC = (yC - yA) * (yC - yA);
          AC = XAC + YAC;
          XAD = (xD - xA) * (xD - xA)
          YAD = (yD - yA) * (yD - yA);
          AD = XAD + YAD;
          XBC = (xB - xC) * (xB - xC)
          YBC = (yB - yC) * (yB - yC);
          BC = XBC + YBC;
          a = axes(-9, -9, 9, 9, .2, 1)


          texte = `Dans un repère orthonormé (O,I,J), on donne les 4 points suivants :<br>`
          texte += ` $A\\left(${xA};${yA}\\right)$ ; $B\\left(${xB};${yB}\\right).$`
          texte += ` $C\\left(${xC};${yC}\\right)$ ; $D\\left(${xD};${yD}\\right).$`
          texte += `<br>Démontrer que $ABDC$ est un carré.`;

          texte_corr = `<br>Pour prouver que $ABDC$ est un carré, il y a pluieurs stratégies :<br>`
          texte_corr += `Dans cette correction, on propose de procéder par étapes :<br>`
          texte_corr += `On va prouver d'abord que $ABDC$ est un parallélogramme en utilisant les milieux des diagonales.<br>`
          texte_corr += `puis on prouvera qu'il est un rectangle en comparant ses diagonales.<br>`
          texte_corr += `<br>Enfin, en vérifiant qu'il a deux côtés consécutifs de même longueur, on aura prouvé qu'il est un carré. `

          texte_corr += `<br><B>Démonstration :</B><br>`
          texte_corr += `<B>1. On prouve que $ABDC$ est un parallélogramme :</B>`
          texte_corr += `<br>On sait que $ABDC$ est un parallélogramme si et seulement si ses diagonales se coupent en leur milieu.`
          texte_corr += `<br>On cherche donc les coordonnées du milieu de chacune des deux diagonales du quadrilatère, pour prouver qu'elles sont identiques. :`
          texte_corr += `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $D(x_D;y_D)$ sont deux points d'un repère ,`
          texte_corr += `<br> alors les coordonnées du point $I$ milieu de $[AD]$ sont `
          texte_corr += `$I\\left(\\dfrac{x_A+x_D}{2};\\dfrac{y_A+y_D}{2}\\right)$ <br>`
          texte_corr += `On applique la relation à l'énoncé : `
          texte_corr += `$\\begin{cases}x_I=\\dfrac{${xA}+${ecriture_parenthese_si_negatif(xD)}}{2} \\\\ y_I=\\dfrac{${yA}+${ecriture_parenthese_si_negatif(yD)}}{2}\\end{cases}$`
          texte_corr += `<br>On en déduit :  $\\begin{cases}x_I=\\dfrac{${tex_nombre(xA + xD)}}{2}\\\\y_I=\\dfrac{${tex_nombre(yA + yD)}}{2}\\end{cases}$`
          if (xI1 != 1 && yI1 != 1) { texte_corr += `  <br>Ce qui donne au final : $ I\\left(\\dfrac{${xI0}}{${xI1}};\\dfrac{${yI0}}{${yI1}};\\right)$` }
          if (xI1 == 1 && yI1 != 1) { texte_corr += `  <br>Ce qui donne au final : $ I\\left(${xI0};\\dfrac{${yI0}}{${yI1}}\\right)$` }
          if (xI1 != 1 && yI1 == 1) { texte_corr += `  <br>Ce qui donne au final : $ I\\left(\\dfrac{${xI0}}{${xI1}};${yI0}\\right)$` }
          if (xI1 == 1 && yI1 == 1) { texte_corr += `  <br>Ce qui donne au final : $ I\\left(${xI0};${yI0}\\right)$` }
          texte_corr += `<br> Les coordonnées du point $J$ milieu de $[BC]$ sont `
          texte_corr += `$J\\left(\\dfrac{x_B+x_C}{2};\\dfrac{y_B+y_C}{2}\\right)$ <br>`
          texte_corr += `On applique la relation à l'énoncé : `
          texte_corr += `$\\begin{cases}x_J=\\dfrac{${xB}+${ecriture_parenthese_si_negatif(xC)}}{2} \\\\ y_J=\\dfrac{${yB}+${ecriture_parenthese_si_negatif(yC)}}{2}\\end{cases}$`
          texte_corr += `<br>On en déduit :  $\\begin{cases}x_J=\\dfrac{${tex_nombre(xB + xC)}}{2}\\\\y_J=\\dfrac{${tex_nombre(yB + yC)}}{2}\\end{cases}$`
          if (xJ1 != 1 && yJ1 != 1) { texte_corr += `  <br>Ce qui donne au final : $ J\\left(\\dfrac{${xJ0}}{${xJ1}};\\dfrac{${yJ0}}{${yJ1}};\\right)$` }
          if (xJ1 == 1 && yJ1 != 1) { texte_corr += `  <br>Ce qui donne au final : $ J\\left(${xJ0};\\dfrac{${yJ0}}{${yJ1}}\\right)$` }
          if (xJ1 != 1 && yJ1 == 1) { texte_corr += `  <br>Ce qui donne au final : $ J\\left(\\dfrac{${xJ0}}{${xJ1}};${yJ0}\\right)$` }
          if (xJ1 == 1 && yJ1 == 1) { texte_corr += `  <br>Ce qui donne au final : $ J\\left(${xJ0};${yJ0}\\right)$` }
          texte_corr += `<br>On observe que $I$ et $J$ ont les mêmes coordonnées, donc les deux diagonales du quadrilatère se coupent en leur milieu.`
          texte_corr += `<br>$ABDC$ est donc un parallélogramme.`
          texte_corr += `<br><B>2. On prouve que $ABDC$ est un rectangle :</B>`
          texte_corr += `<br>On calcule maintenant les diagonales de $ABDC$ : $AD$ et $BC$ .`
          texte_corr += `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $D(x_D;y_D)$ sont deux points d'un repère orthonormé,`
          texte_corr += ` alors on a : $AD=\\sqrt{\\left(x_D-x_A\\right)^{2}+\\left(y_D-y_A\\right)^{2}}.$<br>`
          texte_corr += `On applique la relation à l'énoncé : $AD=\\sqrt{\\left(${xD}-${ecriture_parenthese_si_negatif(xA)}\\right)^{2}+\\left(${yD}-${ecriture_parenthese_si_negatif(yA)}\\right)^{2}}$<br>`
          texte_corr += `$\\phantom{On applique la relation a l'enonce :        } AD=\\sqrt{${XAD}+${YAD}}$<br>`
          texte_corr += `$\\phantom{On applique la relation a l'enonce :        } AD=\\sqrt{${tex_nombre(XAD + YAD)}}$<br>`
          facteur = extraire_racine_carree(AD)[0]
          radical = extraire_racine_carree(AD)[1]
          if (radical != 1) {
            if (facteur != 1) {
              texte_corr += `$\\phantom{On applique la relation a l'enonce :   } AD=${facteur}\\sqrt{${radical}}$<br>`
            }
          }
          else {
            texte_corr += `$\\phantom{On applique la relation a l'enonce :   } AD=${facteur}$<br>`
          }
          texte_corr += `On procède de même pour $BC$: $BC=\\sqrt{\\left(${xC}-${ecriture_parenthese_si_negatif(xB)}\\right)^{2}+\\left(${yC}-${ecriture_parenthese_si_negatif(yB)}\\right)^{2}}$<br>`
          texte_corr += `$\\phantom{On applique la relation a l'enonce :        } BC=\\sqrt{${XBC}+${YBC}}$<br>`
          facteur = extraire_racine_carree(BC)[0]
          radical = extraire_racine_carree(BC)[1]
          if (radical != 1) {
            if (facteur != 1) {
              texte_corr += `$\\phantom{On applique la relation a l'enonce :   } BC=${facteur}\\sqrt{${radical}}$<br>`
            }
            else {
              texte_corr += `$\\phantom{On applique la relation a l'enonce :   } BC=\\sqrt{${radical}}$<br>`
            }
          }
          else {
            texte_corr += `$\\phantom{On applique la relation a l'enonce :   } BC=${facteur}$<br>`
          }
          texte_corr += `<br>On observe que $BC=AD$, $ABDC$ est donc bien un rectangle.`
          texte_corr += `<br><B>3. On prouve que $ABDC$ est un carré :</B>`
          texte_corr += `<br>On calcule maintenant deux côtés consécutilfs de $ABDC$ : $AB$ et $AC$ par exemple.`
          texte_corr += ` <br>$AB=\\sqrt{\\left(${xB}-${ecriture_parenthese_si_negatif(xA)}\\right)^{2}+\\left(${yB}-${ecriture_parenthese_si_negatif(yA)}\\right)^{2}}$<br>`
          texte_corr += `$AB =\\sqrt{${XAB}+${YAB}}$<br>`
          texte_corr += `$AB =\\sqrt{${tex_nombre(XAB + YAB)}}$<br>`
          facteur = extraire_racine_carree(AB)[0]
          radical = extraire_racine_carree(AB)[1]
          if (radical != 1) {
            if (facteur != 1) {
              texte_corr += `$AB=${facteur}\\sqrt{${radical}}$<br>`
            }
          }
          else {
            texte_corr += `$AB=${facteur}$<br>`
          }
          texte_corr += `De même : $AC=\\sqrt{\\left(${xC}-${ecriture_parenthese_si_negatif(xA)}\\right)^{2}+\\left(${yC}-${ecriture_parenthese_si_negatif(yA)}\\right)^{2}}$<br>`
          texte_corr += `$\\phantom{De meme :       } AC=\\sqrt{${XAC}+${YAC}}$<br>`
          texte_corr += `$\\phantom{De meme :       } AC=\\sqrt{${tex_nombre(XAC + YAC)}}$<br>`
          facteur = extraire_racine_carree(AC)[0]
          radical = extraire_racine_carree(AC)[1]
          if (radical != 1) {
            console.log(facteur)
            if (facteur != 1) {
              texte_corr += `$\\phantom{De meme :       } AC=${facteur}\\sqrt{${radical}}$<br>`
            }
          }
          else {
            texte_corr += `$\\phantom{De meme :  } AC=${facteur}$<br>`
          }
          texte_corr += `On observe que $AC=AB$ donc $ABDC$ est bien un carré.`
            ;
          break;

      }
      if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  }
}
