import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { axes, point, polygoneAvecNom, repere } from '../../modules/2d.js'
import { extraireRacineCarree, listeQuestionsToContenu, randint, choice, combinaisonListes, ecritureParentheseSiNegatif, fractionSimplifiee, texNombre } from '../../modules/outils.js'
export const titre = 'Déterminer la nature d\'un polygone'

/**
 * 2G12
 * @author Stéphane Guyon
 */
export const uuid = 'd633a'
export const ref = '2G12-4'
export default function NaturePolygone () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.nbQuestions = 2
  this.nbCols = 2
  this.nbColsCorr = 2
  // this.sup = 1 ; //
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const typesDeQuestionsDisponibles = [1]; let typesDeQuestions
    let objets
    let A, B, C, D, P, XMIN, XMAX, YMIN, YMAX

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, a, facteur, radical, ux, uy, xA, yA, xB, yB, xC, yC, xD, yD, AB, XAB, YAB, XAC, YAC, XBC, YBC, AC, BC, XAD, YAD, AD, xI0, xI1, yI0, yI1, xJ0, xJ1, yJ0, yJ1, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      objets = []
      typesDeQuestions = listeTypeDeQuestions[i]
      switch (typesDeQuestions) {
        // Cas par cas, on définit le type de nombres que l'on souhaite
        // Combien de chiffres ? Quelles valeurs ?

        case 1: // Triangle isocèle ou équilatéral

          xA = randint(0, 5) * choice([-1, 1])
          yA = randint(0, 5) * choice([-1, 1])
          ux = randint(1, 5) * choice([-1, 1])
          uy = randint(1, 5) * choice([-1, 1])
          while (ux === uy || ux === -uy) { // ajout d'une condition pour éviter des points alignés (Jean-claude Lhote)
            uy = randint(1, 5) * choice([-1, 1])
          }// empêcher ux=uy pour éviter B=C
          xB = xA + ux

          yB = yA + uy

          xC = xA + uy
          yC = yA + ux
          xD = 0 // pour ne pas bloquer le recadrage du repère
          yD = 0
          XAB = (xB - xA) * (xB - xA)
          YAB = (yB - yA) * (yB - yA)
          AB = XAB + YAB
          XAC = (xC - xA) * (xC - xA)
          YAC = (yC - yA) * (yC - yA)
          XBC = (xC - xB) * (xC - xB)
          YBC = (yC - yB) * (yC - yB)
          AC = XAC + YAC
          texte = 'Dans un repère orthonormé $(O,I,J)$, on donne les points suivants :'
          texte += ` $A\\left(${xA};${yA}\\right)$ ; $B\\left(${xB};${yB}\\right)$ et $C\\left(${xC};${yC}\\right)$`
          texte += '<br>Déterminer la nature du triangle $ABC$ '

          texteCorr = 'A partir du repère, on a envie de prouver que$ABC$ est un triangle isocèle en $A$.'
          texteCorr += '<br> On calcule donc séparément les distances $AB$ et $AC$ '
          texteCorr += '<br>On sait d\'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d\'un repère orthonormé,'
          texteCorr += ' alors on a : $AB=\\sqrt{\\left(x_B-x_A\\right)^{2}+\\left(y_B-y_A\\right)^{2}}$<br>'
          texteCorr += `On applique la relation à l'énoncé : $AB=\\sqrt{\\left(${xB}-${ecritureParentheseSiNegatif(xA)}\\right)^{2}+\\left(${yB}-${ecritureParentheseSiNegatif(yA)}\\right)^{2}}$<br>`
          texteCorr += `$\\phantom{On applique la relation a l'enonce :        } AB=\\sqrt{${XAB}+${YAB}}$<br>`
          texteCorr += `$\\phantom{On applique la relation a l'enonce :        } AB=\\sqrt{${texNombre(XAB + YAB)}}$<br>`
          facteur = extraireRacineCarree(AB)[0]
          radical = extraireRacineCarree(AB)[1]
          if (radical !== 1) {
            if (facteur !== 1) {
              texteCorr += `$\\phantom{On applique la relation a l'enonce :   } AB=${facteur}\\sqrt{${radical}}$<br>`
            }
          } else {
            texteCorr += `$\\phantom{On applique la relation a l'enonce :   } AB=${facteur}$<br>`
          }

          texteCorr += `De même : $AC=\\sqrt{\\left(${xC}-${ecritureParentheseSiNegatif(xA)}\\right)^{2}+\\left(${yC}-${ecritureParentheseSiNegatif(yA)}\\right)^{2}}$<br>`
          texteCorr += `$\\phantom{De meme :       } AC=\\sqrt{${XAC}+${YAC}}$<br>`
          texteCorr += `$\\phantom{De meme :       } AC=\\sqrt{${texNombre(XAC + YAC)}}$<br>`
          facteur = extraireRacineCarree(AC)[0]
          radical = extraireRacineCarree(AC)[1]
          if (radical !== 1) {
            if (facteur !== 1) {
              texteCorr += `$\\phantom{On applique la relation a l'enonce :   } AB=${facteur}\\sqrt{${radical}}$<br>`
            }
          } else {
            texteCorr += `$\\phantom{On applique la relation a l'enonce :   } AB=${facteur}$<br>`
          }
          texteCorr += 'On observe que $AC=AB$ donc le triangle $ABC$ est isocèle.'
          texteCorr += '<br>On calcule $BC$ pour vérifier s\'il est ou non  équilatéral.'
          texteCorr += `<br>On obtient : $BC=\\sqrt{${XBC}+${YBC}}=\\sqrt{${texNombre(XBC + YBC)}}$<br>`
          if (XBC + YBC === XAB + YAB) { texteCorr += 'Le triangle $ABC$ est équilatéral.' } else { texteCorr += 'Le triangle $ABC$ est simplement isocèle, il n\'est pas équilatéral.' }

          ;
          A = point(xA, yA, 'A')
          B = point(xB, yB, 'B')
          C = point(xC, yC, 'C')
          P = polygoneAvecNom(A, B, C)
          objets.push(P[0], P[1])
          break
        case 2: // ABC isocèle triangle rectangle

          xA = randint(0, 5) * choice([-1, 1])
          yA = randint(0, 5) * choice([-1, 1])
          ux = randint(1, 5) * choice([-1, 1])
          uy = randint(1, 5) * choice([-1, 1])
          xB = xA + ux
          yB = yA + uy
          xC = xA - uy
          yC = yA + ux
          XAB = (xB - xA) * (xB - xA)
          YAB = (yB - yA) * (yB - yA)
          AB = XAB + YAB
          XAC = (xC - xA) * (xC - xA)
          YAC = (yC - yA) * (yC - yA)
          XBC = (xC - xB) * (xC - xB)
          YBC = (yC - yB) * (yC - yB)
          AC = XAC + YAC
          texte = 'Dans un repère orthonormé $(O,I,J)$, on donne les points suivants :'
          texte += ` $A\\left(${xA};${yA}\\right)$ ; $B\\left(${xB};${yB}\\right)$ et $C\\left(${xC};${yC}\\right)$`
          texte += '<br>Déterminer la nature du triangle $ABC$ '

          texteCorr = 'A partir du repère, on a envie de prouver que$ABC$ est un triangle rectangle en $A$.'
          texteCorr += '<br> Pour vérifier que le triangle est rectabgle, on va utiliser la réciproque du théorème de Pythagore.'
          texteCorr += '<br> On calcule donc séparément les distances $AB^{2}$ ; $AC^{2}$ et $BC^{2}$ pour vérifier si $BC^{2}=AB^{2}+AC^{2}$ .'
          texteCorr += '<br>On sait d\'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d\'un repère orthonormé,'
          texteCorr += ' alors on a : $AB^{2}=\\left(x_B-x_A\\right)^{2}+\\left(y_B-y_A\\right)^{2}$<br>'
          texteCorr += `On applique la relation à l'énoncé : $AB^{2}=\\left(${xB}-${ecritureParentheseSiNegatif(xA)}\\right)^{2}+\\left(${yB}-${ecritureParentheseSiNegatif(yA)}\\right)^{2}$<br>`
          texteCorr += `$\\phantom{On applique la relation a l'enonce :        } AB^{2}={${XAB}+${YAB}}$<br>`
          texteCorr += `$\\phantom{On applique la relation a l'enonce :        } AB^{2}={${texNombre(XAB + YAB)}}$<br>`

          texteCorr += `De même : $AC^{2}={\\left(${xC}-${ecritureParentheseSiNegatif(xA)}\\right)^{2}+\\left(${yC}-${ecritureParentheseSiNegatif(yA)}\\right)^{2}}$<br>`
          texteCorr += `$\\phantom{De meme :       } AC^{2}={${XAC}+${YAC}}$<br>`
          texteCorr += `$\\phantom{De meme :       } AC^{2}={${texNombre(XAC + YAC)}}$<br>`

          texteCorr += `Enfin : $BC^{2}={\\left(${xB}-${ecritureParentheseSiNegatif(xB)}\\right)^{2}+\\left(${yC}-${ecritureParentheseSiNegatif(yB)}\\right)^{2}}$<br>`
          texteCorr += `$\\phantom{De meme :       } BC^{2}={${XBC}+${YBC}}$<br>`
          texteCorr += `$\\phantom{De meme :       } BC^{2}={${texNombre(XBC + YBC)}}$<br>`
          texteCorr += `On observe que $AC^{2}+AB^{2}=${texNombre(XAC + YAC + XAB + YAB)} ~~et~~ BC^{2}={${texNombre(XBC + YBC)}}$.`
          texteCorr += '<br>On en déduit que $BC^{2}=AC^{2}+AB^{2}$.'
          texteCorr += '<br>D\'après la réciproque du théorème de Pythagore,  le triangle ABC est rectangle en A.'
          if (XAB + YAB === XAC + YAC) { texteCorr += '<br>On observe en plus que AB=AC. <br> Le triangle ABC est donc isocèle rectangle en A.' }
          A = point(xA, yA, 'A')
          B = point(xB, yB, 'B')
          C = point(xC, yC, 'C')
          P = polygoneAvecNom(A, B, C)
          objets.push(P[0], P[1])
          break
        case 3: // Dq ABDC losange
          xA = randint(0, 9) * choice([-1, 1])
          yA = randint(0, 9) * choice([-1, 1])
          ux = randint(1, 5)
          uy = randint(1, 5, ux) * choice([-1, 1])
          ux *= choice([-1, 1])
          xB = xA + ux
          yB = yA + uy
          xC = xB - uy
          yC = yB - ux
          xD = xC - ux
          yD = yC - uy
          xI0 = fractionSimplifiee(xA + xC, 2)[0]
          xI1 = fractionSimplifiee(xA + xC, 2)[1]
          yI0 = fractionSimplifiee(yA + yC, 2)[0]
          yI1 = fractionSimplifiee(yA + yC, 2)[1]
          xJ0 = fractionSimplifiee(xB + xD, 2)[0]
          xJ1 = fractionSimplifiee(xB + xD, 2)[1]
          yJ0 = fractionSimplifiee(yB + yD, 2)[0]
          yJ1 = fractionSimplifiee(yB + yD, 2)[1]
          XAB = (xB - xA) * (xB - xA)
          YAB = (yB - yA) * (yB - yA)
          AB = XAB + YAB
          XAD = (xD - xA) * (xD - xA)
          YAD = (yD - yA) * (yD - yA)
          AD = XAD + YAD
          XAC = (xC - xA) * (xC - xA)
          YAC = (yC - yA) * (yC - yA)
          AC = XAC + YAC
          a = axes(-9, -9, 9, 9, 0.2, 1)

          texte = 'Dans un repère orthonormé (O,I,J), on donne les 4 points suivants :<br>'
          texte += ` $A\\left(${xA};${yA}\\right)$ ; $B\\left(${xB};${yB}\\right).$`
          texte += ` $C\\left(${xC};${yC}\\right)$ ; $D\\left(${xD};${yD}\\right).$`
          texte += '<br>Démontrer que $ABCD$ est un losange.'

          texteCorr = '<br>Pour prouver que $ABCD$ est un losange, il y a deux stratégies :<br>'
          texteCorr += '$~~~~~~~~$<B>1.</B> On calcule les quatre longueurs du quadrilatère et on prouve leur égalité.<br>'
          texteCorr += '$\\phantom{~~~~~~~~}$Un quadrilatère qui possède quatre côtés de même longueur est un losange.<br>'
          texteCorr += '$~~~~~~~~$<B>2. </B> On prouve que $ABDC$ est un parallélogramme, puis il sufit de prouver qu\'il possède deux côtés consécutifs de même longueur.<br>'
          texteCorr += '$\\phantom{~~~~~~~~}$ Un parallélogramme qui possède deux côtés consécutifs de même longueur est un losange'
          texteCorr += '<br>Les deux démonstrations se valent. <br>On choisit ici la <B>démonstration n°2</B>, plus variée, mais la n°1 est valable.<br>'
          texteCorr += '<B>Démonstration :</B><br>'
          texteCorr += 'On veut prouver que $ABCD$ est un parallélogramme :'
          texteCorr += '<br>On sait que ABCD est un parallélogramme si et seulement si ses diagonales se coupent en leur milieu.'
          texteCorr += '<br>On cherche donc les coordonnées du milieu de chacune des deux diagonales du quadrilatère, pour prouver qu\'elles sont identiques. :'
          texteCorr += '<br>On sait d\'après le cours, que si $A(x_A;y_A)$ et $C(x_C;y_C)$ sont deux points d\'un repère ,'
          texteCorr += '<br> alors les coordonnées du point $I$ milieu de $[AC]$ sont '
          texteCorr += '$I\\left(\\dfrac{x_A+x_C}{2};\\dfrac{y_A+y_C}{2}\\right)$ <br>'
          texteCorr += 'On applique la relation à l\'énoncé : '
          texteCorr += `$\\begin{cases}x_I=\\dfrac{${xA}+${ecritureParentheseSiNegatif(xC)}}{2} \\\\ y_I=\\dfrac{${yA}+${ecritureParentheseSiNegatif(yC)}}{2}\\end{cases}$`
          texteCorr += `<br>On en déduit :  $\\begin{cases}x_I=\\dfrac{${texNombre(xA + xC)}}{2}\\\\y_I=\\dfrac{${texNombre(yA + yC)}}{2}\\end{cases}$`
          if (xI1 !== 1 && yI1 !== 1) { texteCorr += `  <br>Ce qui donne au final : $ I\\left(\\dfrac{${xI0}}{${xI1}};\\dfrac{${yI0}}{${yI1}};\\right)$` }
          if (xI1 === 1 && yI1 !== 1) { texteCorr += `  <br>Ce qui donne au final : $ I\\left(${xI0};\\dfrac{${yI0}}{${yI1}}\\right)$` }
          if (xI1 !== 1 && yI1 === 1) { texteCorr += `  <br>Ce qui donne au final : $ I\\left(\\dfrac{${xI0}}{${xI1}};${yI0}\\right)$` }
          if (xI1 === 1 && yI1 === 1) { texteCorr += `  <br>Ce qui donne au final : $ I\\left(${xI0};${yI0}\\right)$` }
          texteCorr += '<br> Les coordonnées du point $J$ milieu de $[BC]$ sont '
          texteCorr += '$J\\left(\\dfrac{x_B+x_C}{2};\\dfrac{y_B+y_C}{2}\\right)$ <br>'
          texteCorr += 'On applique la relation à l\'énoncé : '
          texteCorr += `$\\begin{cases}x_J=\\dfrac{${xB}+${ecritureParentheseSiNegatif(xD)}}{2} \\\\ y_J=\\dfrac{${yB}+${ecritureParentheseSiNegatif(yD)}}{2}\\end{cases}$`
          texteCorr += `<br>On en déduit :  $\\begin{cases}x_J=\\dfrac{${texNombre(xB + xD)}}{2}\\\\y_J=\\dfrac{${texNombre(yB + yD)}}{2}\\end{cases}$`
          if (xJ1 !== 1 && yJ1 !== 1) { texteCorr += `  <br>Ce qui donne au final : $ J\\left(\\dfrac{${xJ0}}{${xJ1}};\\dfrac{${yJ0}}{${yJ1}};\\right)$` }
          if (xJ1 === 1 && yJ1 !== 1) { texteCorr += `  <br>Ce qui donne au final : $ J\\left(${xJ0};\\dfrac{${yJ0}}{${yJ1}}\\right)$` }
          if (xJ1 !== 1 && yJ1 === 1) { texteCorr += `  <br>Ce qui donne au final : $ J\\left(\\dfrac{${xJ0}}{${xJ1}};${yJ0}\\right)$` }
          if (xJ1 === 1 && yJ1 === 1) { texteCorr += `  <br>Ce qui donne au final : $ J\\left(${xJ0};${yJ0}\\right)$` }
          texteCorr += '<br>On observe que $I$ et $J$ ont les mêmes coordonnées, donc les deux diagonales du quadrilatère se coupent en leur milieu.'
          texteCorr += '<br>$ABCD$ est donc un parallélogramme.'
          texteCorr += '<br>On calcule maintenant deux cotés consécutifs : $AB$ et $AD$ par exemple.'
          texteCorr += '<br>On sait d\'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d\'un repère orthonormé,'
          texteCorr += ' alors on a : $AB=\\sqrt{\\left(x_B-x_A\\right)^{2}+\\left(y_B-y_A\\right)^{2}}.$<br>'
          texteCorr += `On applique la relation à l'énoncé : $AB=\\sqrt{\\left(${xB}-${ecritureParentheseSiNegatif(xA)}\\right)^{2}+\\left(${yB}-${ecritureParentheseSiNegatif(yA)}\\right)^{2}}$<br>`
          texteCorr += `$\\phantom{On applique la relation a l'enonce :        } AB=\\sqrt{${XAB}+${YAB}}$<br>`
          texteCorr += `$\\phantom{On applique la relation a l'enonce :        } AB=\\sqrt{${texNombre(XAB + YAB)}}$<br>`

          facteur = extraireRacineCarree(AB)[0]
          radical = extraireRacineCarree(AB)[1]

          if (radical !== 1) {
            if (facteur !== 1) {
              texteCorr += `$\\phantom{On applique la relation a l'enonce :   } AB=${facteur}\\sqrt{${radical}}$<br>`
            }
          } else {
            texteCorr += `$\\phantom{On applique la relation a l'enonce :   } AB=${facteur}$<br>`
          }

          texteCorr += `On procède de même pour $AD$:<br> $AD=\\sqrt{\\left(${xD}-${ecritureParentheseSiNegatif(xA)}\\right)^{2}+\\left(${yD}-${ecritureParentheseSiNegatif(yA)}\\right)^{2}}$<br>`
          texteCorr += `$\\phantom{On applique la relation a l'enonce :        } AC=\\sqrt{${XAD}+${YAD}}$<br>`
          texteCorr += `$\\phantom{On applique la relation a l'enonce :        } AC=\\sqrt{${texNombre(XAD + YAD)}}$<br>`
          facteur = extraireRacineCarree(AD)[0]
          radical = extraireRacineCarree(AD)[1]
          if (radical !== 1) {
            if (facteur !== 1) {
              texteCorr += `$\\phantom{On applique la relation a l'enonce :   } AD=${facteur}\\sqrt{${radical}}$<br>`
            }
          } else {
            texteCorr += `$\\phantom{On applique la relation a l'enonce :   } AD=\\sqrt{${radical}}$<br>`
          }
          texteCorr += '<br>On observe que $AB=AD$, $ABDC$ est donc bien un losange.'
          A = point(xA, yA, 'A')
          B = point(xB, yB, 'B')
          C = point(xC, yC, 'C')
          D = point(xD, yD, 'D')
          P = polygoneAvecNom(A, B, C, D)
          objets.push(P[0], P[1])

          break
        case 4://  Dq rectangle
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

          xI0 = fractionSimplifiee(xA + xD, 2)[0]
          xI1 = fractionSimplifiee(xA + xD, 2)[1]
          yI0 = fractionSimplifiee(yA + yD, 2)[0]
          yI1 = fractionSimplifiee(yA + yD, 2)[1]
          xJ0 = fractionSimplifiee(xB + xC, 2)[0]
          xJ1 = fractionSimplifiee(xB + xC, 2)[1]
          yJ0 = fractionSimplifiee(yB + yC, 2)[0]
          yJ1 = fractionSimplifiee(yB + yC, 2)[1]
          XAB = (xB - xA) * (xB - xA)
          YAB = (yB - yA) * (yB - yA)
          AB = XAB + YAB
          XAC = (xC - xA) * (xC - xA)
          YAC = (yC - yA) * (yC - yA)
          AC = XAC + YAC
          XAD = (xD - xA) * (xD - xA)
          YAD = (yD - yA) * (yD - yA)
          AD = XAD + YAD
          XBC = (xB - xC) * (xB - xC)
          YBC = (yB - yC) * (yB - yC)
          BC = XBC + YBC
          a = axes(-9, -9, 9, 9, 0.2, 1)

          texte = 'Dans un repère orthonormé (O,I,J), on donne les 4 points suivants :<br>'
          texte += ` $A\\left(${xA};${yA}\\right)$ ; $B\\left(${xB};${yB}\\right).$`
          texte += ` $C\\left(${xC};${yC}\\right)$ ; $D\\left(${xD};${yD}\\right).$`
          texte += '<br>Démontrer que $ABDC$ est un rectangle.'

          texteCorr = '<br>Pour prouver que $ABDC$ est un rectangle, il y a pluieurs stratégies :<br>'
          texteCorr += '$~~~~~~~~$<B>1.</B> On prouve avec la réciproque du théorème de Pythagore que $ABDC$ possède un angle droit,<br>'
          texteCorr += '$puis on prouve qu\'il a ses côtés opposés de même longueur.<br>'
          texteCorr += '$~~~~~~~~$<B>2. </B> On prouve que $ABDC$ est un parallélogramme, puis il sufit de prouver que ses diagonales sont de même longueur.<br>'
          texteCorr += '$\\phantom{~~~~~~~~}$ Un parallélogramme qui a ses diagonales de même longueur est un rectangle.'
          texteCorr += '<br>Plusiurs démonstrations se valent. On choisit ici la <B>démonstration n°2</B>, mais d\'autres idées sont valables.<br>'
          texteCorr += '<B>Démonstration :</B><br>'
          texteCorr += 'On veut prouver que $ABDC$ est un parallélogramme :'
          texteCorr += '<br>On sait que $ABDC$ est un parallélogramme si et seulement si ses diagonales se coupent en leur milieu.'
          texteCorr += '<br>On cherche donc les coordonnées du milieu de chacune des deux diagonales du quadrilatère, pour prouver qu\'elles sont identiques. :'
          texteCorr += '<br>On sait d\'après le cours, que si $A(x_A;y_A)$ et $D(x_D;y_D)$ sont deux points d\'un repère ,'
          texteCorr += '<br> alors les coordonnées du point $I$ milieu de $[AD]$ sont '
          texteCorr += '$I\\left(\\dfrac{x_A+x_D}{2};\\dfrac{y_A+y_D}{2}\\right)$ <br>'
          texteCorr += 'On applique la relation a l\'enonce : '
          texteCorr += `$\\begin{cases}x_I=\\dfrac{${xA}+${ecritureParentheseSiNegatif(xD)}}{2} \\\\ y_I=\\dfrac{${yA}+${ecritureParentheseSiNegatif(yD)}}{2}\\end{cases}$`
          texteCorr += `<br>On en déduit :  $\\begin{cases}x_I=\\dfrac{${texNombre(xA + xD)}}{2}\\\\y_I=\\dfrac{${texNombre(yA + yD)}}{2}\\end{cases}$`
          if (xI1 !== 1 && yI1 !== 1) { texteCorr += `  <br>Ce qui donne au final : $ I\\left(\\dfrac{${xI0}}{${xI1}};\\dfrac{${yI0}}{${yI1}};\\right)$` }
          if (xI1 === 1 && yI1 !== 1) { texteCorr += `  <br>Ce qui donne au final : $ I\\left(${xI0};\\dfrac{${yI0}}{${yI1}}\\right)$` }
          if (xI1 !== 1 && yI1 === 1) { texteCorr += `  <br>Ce qui donne au final : $ I\\left(\\dfrac{${xI0}}{${xI1}};${yI0}\\right)$` }
          if (xI1 === 1 && yI1 === 1) { texteCorr += `  <br>Ce qui donne au final : $ I\\left(${xI0};${yI0}\\right)$` }
          texteCorr += '<br> Les coordonnées du point $J$ milieu de $[BC]$ sont '
          texteCorr += '$J\\left(\\dfrac{x_B+x_C}{2};\\dfrac{y_B+y_C}{2}\\right)$ <br>'
          texteCorr += 'On applique la relation à l\'énoncé : '
          texteCorr += `$\\begin{cases}x_J=\\dfrac{${xB}+${ecritureParentheseSiNegatif(xC)}}{2} \\\\ y_J=\\dfrac{${yB}+${ecritureParentheseSiNegatif(yC)}}{2}\\end{cases}$`
          texteCorr += `<br>On en déduit :  $\\begin{cases}x_J=\\dfrac{${texNombre(xB + xC)}}{2}\\\\y_J=\\dfrac{${texNombre(yB + yC)}}{2}\\end{cases}$`
          if (xJ1 !== 1 && yJ1 !== 1) { texteCorr += `  <br>Ce qui donne au final : $ J\\left(\\dfrac{${xJ0}}{${xJ1}};\\dfrac{${yJ0}}{${yJ1}};\\right)$` }
          if (xJ1 === 1 && yJ1 !== 1) { texteCorr += `  <br>Ce qui donne au final : $ J\\left(${xJ0};\\dfrac{${yJ0}}{${yJ1}}\\right)$` }
          if (xJ1 !== 1 && yJ1 === 1) { texteCorr += `  <br>Ce qui donne au final : $ J\\left(\\dfrac{${xJ0}}{${xJ1}};${yJ0}\\right)$` }
          if (xJ1 === 1 && yJ1 === 1) { texteCorr += `  <br>Ce qui donne au final : $ J\\left(${xJ0};${yJ0}\\right)$` }
          texteCorr += '<br>On observe que $I$ et $J$ ont les mêmes coordonnées, donc les deux diagonales du quadrilatère se coupent en leur milieu.'
          texteCorr += '<br>$ABDC$ est donc un parallélogramme.'
          texteCorr += '<br>On calcule maintenant les diagonales de $ABDC$ : $AD$ et $BC$ par exemple.'
          texteCorr += '<br>On sait d\'après le cours, que si $A(x_A;y_A)$ et $D(x_D;y_D)$ sont deux points d\'un repère orthonormé,'
          texteCorr += ' alors on a : $AD=\\sqrt{\\left(x_D-x_A\\right)^{2}+\\left(y_D-y_A\\right)^{2}}.$<br>'
          texteCorr += `On applique la relation à l'énoncé : $AD=\\sqrt{\\left(${xD}-${ecritureParentheseSiNegatif(xA)}\\right)^{2}+\\left(${yD}-${ecritureParentheseSiNegatif(yA)}\\right)^{2}}$<br>`
          texteCorr += `$\\phantom{On applique la relation a l'enonce :        } AD=\\sqrt{${XAD}+${YAD}}$<br>`
          texteCorr += `$\\phantom{On applique la relation a l'enonce :        } AD=\\sqrt{${texNombre(XAD + YAD)}}$<br>`
          facteur = extraireRacineCarree(AD)[0]
          radical = extraireRacineCarree(AD)[1]
          if (radical !== 1) {
            if (facteur !== 1) {
              texteCorr += `$\\phantom{On applique la relation a l'enonce :   } AD=${facteur}\\sqrt{${radical}}$<br>`
            }
          } else {
            texteCorr += `$\\phantom{On applique la relation a l'enonce :   } AD=\\sqrt{${radical}}$<br>`
          }

          texteCorr += `On procède de même pour $BC$: $BC=\\sqrt{\\left(${xC}-${ecritureParentheseSiNegatif(xB)}\\right)^{2}+\\left(${yC}-${ecritureParentheseSiNegatif(yB)}\\right)^{2}}$<br>`
          texteCorr += `$\\phantom{On applique la relation a l'enonce :        } BC=\\sqrt{${XBC}+${YBC}}$<br>`
          texteCorr += `$\\phantom{On applique la relation a l'enonce :        } BC=\\sqrt{${texNombre(XBC + YBC)}}$<br>`
          facteur = extraireRacineCarree(BC)[0]
          radical = extraireRacineCarree(BC)[1]
          if (radical !== 1) {
            if (facteur !== 1) {
              texteCorr += `$\\phantom{On applique la relation a l'enonce :   } BC=${facteur}\\sqrt{${radical}}$<br>`
            }
          } else {
            texteCorr += `$\\phantom{On applique la relation a l'enonce :   } BC=${facteur}$<br>`
          }
          texteCorr += '<br>On observe que $BC=AD$, $ABDC$ est donc bien un rectangle.'
          A = point(xA, yA, 'A')
          B = point(xB, yB, 'B')
          C = point(xC, yC, 'C')
          D = point(xD, yD, 'D')
          P = polygoneAvecNom(A, B, D, C)
          objets.push(P[0], P[1])

          break
        case 5:// carré
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

          xI0 = fractionSimplifiee(xA + xD, 2)[0]
          xI1 = fractionSimplifiee(xA + xD, 2)[1]
          yI0 = fractionSimplifiee(yA + yD, 2)[0]
          yI1 = fractionSimplifiee(yA + yD, 2)[1]
          xJ0 = fractionSimplifiee(xB + xC, 2)[0]
          xJ1 = fractionSimplifiee(xB + xC, 2)[1]
          yJ0 = fractionSimplifiee(yB + yC, 2)[0]
          yJ1 = fractionSimplifiee(yB + yC, 2)[1]
          XAB = (xB - xA) * (xB - xA)
          YAB = (yB - yA) * (yB - yA)
          AB = XAB + YAB
          XAC = (xC - xA) * (xC - xA)
          YAC = (yC - yA) * (yC - yA)
          AC = XAC + YAC
          XAD = (xD - xA) * (xD - xA)
          YAD = (yD - yA) * (yD - yA)
          AD = XAD + YAD
          XBC = (xB - xC) * (xB - xC)
          YBC = (yB - yC) * (yB - yC)
          BC = XBC + YBC
          a = axes(-9, -9, 9, 9, 0.2, 1)

          texte = 'Dans un repère orthonormé (O,I,J), on donne les 4 points suivants :<br>'
          texte += ` $A\\left(${xA};${yA}\\right)$ ; $B\\left(${xB};${yB}\\right).$`
          texte += ` $C\\left(${xC};${yC}\\right)$ ; $D\\left(${xD};${yD}\\right).$`
          texte += '<br>Démontrer que $ABDC$ est un carré.'

          texteCorr = '<br>Pour prouver que $ABDC$ est un carré, il y a pluieurs stratégies :<br>'
          texteCorr += 'Dans cette correction, on propose de procéder par étapes :<br>'
          texteCorr += 'On va prouver d\'abord que $ABDC$ est un parallélogramme en utilisant les milieux des diagonales.<br>'
          texteCorr += 'puis on prouvera qu\'il est un rectangle en comparant ses diagonales.<br>'
          texteCorr += '<br>Enfin, en vérifiant qu\'il a deux côtés consécutifs de même longueur, on aura prouvé qu\'il est un carré. '

          texteCorr += '<br><B>Démonstration :</B><br>'
          texteCorr += '<B>1. On prouve que $ABDC$ est un parallélogramme :</B>'
          texteCorr += '<br>On sait que $ABDC$ est un parallélogramme si et seulement si ses diagonales se coupent en leur milieu.'
          texteCorr += '<br>On cherche donc les coordonnées du milieu de chacune des deux diagonales du quadrilatère, pour prouver qu\'elles sont identiques. :'
          texteCorr += '<br>On sait d\'après le cours, que si $A(x_A;y_A)$ et $D(x_D;y_D)$ sont deux points d\'un repère ,'
          texteCorr += '<br> alors les coordonnées du point $I$ milieu de $[AD]$ sont '
          texteCorr += '$I\\left(\\dfrac{x_A+x_D}{2};\\dfrac{y_A+y_D}{2}\\right)$ <br>'
          texteCorr += 'On applique la relation à l\'énoncé : '
          texteCorr += `$\\begin{cases}x_I=\\dfrac{${xA}+${ecritureParentheseSiNegatif(xD)}}{2} \\\\ y_I=\\dfrac{${yA}+${ecritureParentheseSiNegatif(yD)}}{2}\\end{cases}$`
          texteCorr += `<br>On en déduit :  $\\begin{cases}x_I=\\dfrac{${texNombre(xA + xD)}}{2}\\\\y_I=\\dfrac{${texNombre(yA + yD)}}{2}\\end{cases}$`
          if (xI1 !== 1 && yI1 !== 1) { texteCorr += `  <br>Ce qui donne au final : $ I\\left(\\dfrac{${xI0}}{${xI1}};\\dfrac{${yI0}}{${yI1}};\\right)$` }
          if (xI1 === 1 && yI1 !== 1) { texteCorr += `  <br>Ce qui donne au final : $ I\\left(${xI0};\\dfrac{${yI0}}{${yI1}}\\right)$` }
          if (xI1 !== 1 && yI1 === 1) { texteCorr += `  <br>Ce qui donne au final : $ I\\left(\\dfrac{${xI0}}{${xI1}};${yI0}\\right)$` }
          if (xI1 === 1 && yI1 === 1) { texteCorr += `  <br>Ce qui donne au final : $ I\\left(${xI0};${yI0}\\right)$` }
          texteCorr += '<br> Les coordonnées du point $J$ milieu de $[BC]$ sont '
          texteCorr += '$J\\left(\\dfrac{x_B+x_C}{2};\\dfrac{y_B+y_C}{2}\\right)$ <br>'
          texteCorr += 'On applique la relation à l\'énoncé : '
          texteCorr += `$\\begin{cases}x_J=\\dfrac{${xB}+${ecritureParentheseSiNegatif(xC)}}{2} \\\\ y_J=\\dfrac{${yB}+${ecritureParentheseSiNegatif(yC)}}{2}\\end{cases}$`
          texteCorr += `<br>On en déduit :  $\\begin{cases}x_J=\\dfrac{${texNombre(xB + xC)}}{2}\\\\y_J=\\dfrac{${texNombre(yB + yC)}}{2}\\end{cases}$`
          if (xJ1 !== 1 && yJ1 !== 1) { texteCorr += `  <br>Ce qui donne au final : $ J\\left(\\dfrac{${xJ0}}{${xJ1}};\\dfrac{${yJ0}}{${yJ1}};\\right)$` }
          if (xJ1 === 1 && yJ1 !== 1) { texteCorr += `  <br>Ce qui donne au final : $ J\\left(${xJ0};\\dfrac{${yJ0}}{${yJ1}}\\right)$` }
          if (xJ1 !== 1 && yJ1 === 1) { texteCorr += `  <br>Ce qui donne au final : $ J\\left(\\dfrac{${xJ0}}{${xJ1}};${yJ0}\\right)$` }
          if (xJ1 === 1 && yJ1 === 1) { texteCorr += `  <br>Ce qui donne au final : $ J\\left(${xJ0};${yJ0}\\right)$` }
          texteCorr += '<br>On observe que $I$ et $J$ ont les mêmes coordonnées, donc les deux diagonales du quadrilatère se coupent en leur milieu.'
          texteCorr += '<br>$ABDC$ est donc un parallélogramme.'
          texteCorr += '<br><B>2. On prouve que $ABDC$ est un rectangle :</B>'
          texteCorr += '<br>On calcule maintenant les diagonales de $ABDC$ : $AD$ et $BC$ .'
          texteCorr += '<br>On sait d\'après le cours, que si $A(x_A;y_A)$ et $D(x_D;y_D)$ sont deux points d\'un repère orthonormé,'
          texteCorr += ' alors on a : $AD=\\sqrt{\\left(x_D-x_A\\right)^{2}+\\left(y_D-y_A\\right)^{2}}.$<br>'
          texteCorr += `On applique la relation à l'énoncé : $AD=\\sqrt{\\left(${xD}-${ecritureParentheseSiNegatif(xA)}\\right)^{2}+\\left(${yD}-${ecritureParentheseSiNegatif(yA)}\\right)^{2}}$<br>`
          texteCorr += `$\\phantom{On applique la relation a l'enonce :        } AD=\\sqrt{${XAD}+${YAD}}$<br>`
          texteCorr += `$\\phantom{On applique la relation a l'enonce :        } AD=\\sqrt{${texNombre(XAD + YAD)}}$<br>`
          facteur = extraireRacineCarree(AD)[0]
          radical = extraireRacineCarree(AD)[1]
          if (radical !== 1) {
            if (facteur !== 1) {
              texteCorr += `$\\phantom{On applique la relation a l'enonce :   } AD=${facteur}\\sqrt{${radical}}$<br>`
            }
          } else {
            texteCorr += `$\\phantom{On applique la relation a l'enonce :   } AD=${facteur}$<br>`
          }
          texteCorr += `On procède de même pour $BC$: $BC=\\sqrt{\\left(${xC}-${ecritureParentheseSiNegatif(xB)}\\right)^{2}+\\left(${yC}-${ecritureParentheseSiNegatif(yB)}\\right)^{2}}$<br>`
          texteCorr += `$\\phantom{On applique la relation a l'enonce :        } BC=\\sqrt{${XBC}+${YBC}}$<br>`
          facteur = extraireRacineCarree(BC)[0]
          radical = extraireRacineCarree(BC)[1]
          if (radical !== 1) {
            if (facteur !== 1) {
              texteCorr += `$\\phantom{On applique la relation a l'enonce :   } BC=${facteur}\\sqrt{${radical}}$<br>`
            } else {
              texteCorr += `$\\phantom{On applique la relation a l'enonce :   } BC=\\sqrt{${radical}}$<br>`
            }
          } else {
            texteCorr += `$\\phantom{On applique la relation a l'enonce :   } BC=${facteur}$<br>`
          }
          texteCorr += '<br>On observe que $BC=AD$, $ABDC$ est donc bien un rectangle.'
          texteCorr += '<br><B>3. On prouve que $ABDC$ est un carré :</B>'
          texteCorr += '<br>On calcule maintenant deux côtés consécutilfs de $ABDC$ : $AB$ et $AC$ par exemple.'
          texteCorr += ` <br>$AB=\\sqrt{\\left(${xB}-${ecritureParentheseSiNegatif(xA)}\\right)^{2}+\\left(${yB}-${ecritureParentheseSiNegatif(yA)}\\right)^{2}}$<br>`
          texteCorr += `$AB =\\sqrt{${XAB}+${YAB}}$<br>`
          texteCorr += `$AB =\\sqrt{${texNombre(XAB + YAB)}}$<br>`
          facteur = extraireRacineCarree(AB)[0]
          radical = extraireRacineCarree(AB)[1]
          if (radical !== 1) {
            if (facteur !== 1) {
              texteCorr += `$AB=${facteur}\\sqrt{${radical}}$<br>`
            }
          } else {
            texteCorr += `$AB=${facteur}$<br>`
          }
          texteCorr += `De même : $AC=\\sqrt{\\left(${xC}-${ecritureParentheseSiNegatif(xA)}\\right)^{2}+\\left(${yC}-${ecritureParentheseSiNegatif(yA)}\\right)^{2}}$<br>`
          texteCorr += `$\\phantom{De meme :       } AC=\\sqrt{${XAC}+${YAC}}$<br>`
          texteCorr += `$\\phantom{De meme :       } AC=\\sqrt{${texNombre(XAC + YAC)}}$<br>`
          facteur = extraireRacineCarree(AC)[0]
          radical = extraireRacineCarree(AC)[1]
          if (radical !== 1) {
            if (facteur !== 1) {
              texteCorr += `$\\phantom{De meme :       } AC=${facteur}\\sqrt{${radical}}$<br>`
            }
          } else {
            texteCorr += `$\\phantom{De meme :  } AC=${facteur}$<br>`
          }
          texteCorr += 'On observe que $AC=AB$ donc $ABDC$ est bien un carré.'
          A = point(xA, yA, 'A')
          B = point(xB, yB, 'B')
          C = point(xC, yC, 'C')
          D = point(xD, yD, 'D')
          P = polygoneAvecNom(A, B, D, C)
          objets.push(P[0], P[1])

          break
      }

      XMIN = Math.min(xA, xB, xC, xD, -1) - 1
      YMIN = Math.min(yA, yB, yC, yD, -1) - 1
      XMAX = Math.max(xA, xB, xC, xD, 1) + 1
      YMAX = Math.max(yA, yB, yC, yD, 1) + 1
      objets.push(repere({ xMin: XMIN, yMin: YMIN, xMax: XMAX, yMax: YMAX }))
      texteCorr += '<br>' + mathalea2d({ xmin: XMIN, ymin: YMIN, xmax: XMAX, ymax: YMAX }, objets)
      if (this.questionJamaisPosee(i, xA, yA, xB, yB, typesDeQuestions)) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
