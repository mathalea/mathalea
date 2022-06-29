import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, abs, ecritureParentheseSiNegatif, fractionSimplifiee, texNombre } from '../../modules/outils.js'
import { point, tracePoint, codageSegments, labelPoint, segment, axes, grille, mathalea2d } from '../../modules/2d.js'

export const titre = 'Démontrer qu\'un quadrilatère est ou non un parallélogramme'

/**
 * 2G12-3
 * @author Stéphane Guyon
 */
export default function Parallélogramme () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.sup = parseInt(this.sup)
  this.nbQuestions = 2
  this.nbCols = 2
  this.nbColsCorr = 2
  this.sup = 1 //

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const typesDeQuestionsDisponibles = [1, 2]; let typesDeQuestions

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, a, ux, uy, g, test, s1, s2, s3, s4, s5, s6, xA, yA, xB, yB, xC, yC, xD, yD, xI0, xI1, yI0, yI1, xJ0, xJ1, yJ0, yJ1, A, B, C, D, T, L, M, N, I, J, O, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      switch (typesDeQuestions) {
      // Cas par cas, on définit le type de nombres que l'on souhaite
      // Combien de chiffres ? Quelles valeurs ?
        case 1: // Dq ABDC parallélogramme
          xA = randint(0, 4) * choice([-1, 1])
          yA = randint(0, 4) * choice([-1, 1])
          xC = randint(0, 4) * choice([-1, 1])
          yC = randint(0, 4) * choice([-1, 1])
          while (abs(xC - xA) < 4) {
            xA = randint(0, 4) * choice([-1, 1])
            xC = randint(0, 4) * choice([-1, 1])
          }
          while (abs(yC - yA) < 4) {
            yA = randint(0, 4) * choice([-1, 1])
            yC = randint(0, 4) * choice([-1, 1])
          }
          uy = randint(3, 5) * choice([-1, 1])
          ux = randint(3, 5) * choice([-1, 1])

          if (abs(yC - yA) / (xC - xA) === abs((uy) / (ux))) {
            uy = uy + 2
          }
          yB = yA + uy
          xB = xA + ux
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
          g = grille(-9, -9, 9, 9)
          A = point(xA, yA, 'A', 'red')
          B = point(xB, yB, 'B', 'red')
          C = point(xC, yC, 'C', 'red')
          D = point(xD, yD, 'D', 'red')
          I = point(1, 0, 'I')
          J = point(0, 1, 'J')
          O = point(0, 0, 'O')
          M = point((xA + xD) / 2, (yA + yD) / 2, 'M')

          a = axes(-9, -9, 9, 9)
          s1 = segment(A, B, 'blue')
          s2 = segment(D, B, 'blue')
          s3 = segment(C, D, 'blue')
          s4 = segment(A, C, 'blue')
          s5 = segment(A, D, 'red')
          s6 = segment(B, C, 'red')
          s1.epaisseur = 2
          s2.epaisseur = 2
          s3.epaisseur = 2
          s4.epaisseur = 2
          s5.epaisseur = 2
          s6.epaisseur = 2
          codageSegments('X', 'red', s5, s6) // Code les segments s5 et s6
          T = tracePoint(A, B, C, D, M, I, J, O) // Repère les points avec une croix
          L = labelPoint(A, B, C, D, M, I, J, O)

          texte = 'Dans un repère orthonormé $(O,I,J)$, on donne les 4 points suivants :<br>'
          texte += ` $A\\left(${xA};${yA}\\right)$ ; $B\\left(${xB};${yB}\\right).$`
          texte += ` $C\\left(${xC};${yC}\\right)$ ; $D\\left(${xD};${yD}\\right).$`
          texte += '<br>Déterminer si le quadrilatère $ABDC$ est un parallélogramme.'

          texteCorr = mathalea2d({
            xmin: -9,
            ymin: -9,
            xmax: 9,
            ymax: 9
          }, T, L, g, a, s1, s2, s3, s4, s5, s6)

          texteCorr += '<br>On sait que $ABDC$ est un parallélogramme si et seulement si ses diagonales se coupent en leur milieu.'
          texteCorr += '<br>On cherche donc les coordonnées du milieu de chacune des deux diagonales du quadrilatère.'
          texteCorr += '<br>On sait d\'après le cours, que si $A(x_A;y_A)$ et $D(x_D;y_D)$ sont deux points d\'un repère ,'
          texteCorr += '<br> alors les coordonnées du point $M$ milieu de $[AD]$ sont '
          texteCorr += '$M\\left(\\dfrac{x_A+x_D}{2};\\dfrac{y_A+y_D}{2}\\right)$ <br>'
          texteCorr += 'On applique la relation à l\'énoncé : '
          texteCorr += `$\\begin{cases}x_M=\\dfrac{${xA}+${ecritureParentheseSiNegatif(xD)}}{2} \\\\ y_M=\\dfrac{${yA}+${ecritureParentheseSiNegatif(yD)}}{2}\\end{cases}$`
          texteCorr += `<br>On en déduit :  $\\begin{cases}x_M=\\dfrac{${texNombre(xA + xD)}}{2}\\\\y_M=\\dfrac{${texNombre(yA + yD)}}{2}\\end{cases}$`
          if (xI1 !== 1 && yI1 !== 1) { texteCorr += `  <br>Ce qui donne au final : $ M\\left(\\dfrac{${xI0}}{${xI1}};\\dfrac{${yI0}}{${yI1}};\\right)$` }
          if (xI1 === 1 && yI1 !== 1) { texteCorr += `  <br>Ce qui donne au final : $ M\\left(${xI0};\\dfrac{${yI0}}{${yI1}}\\right)$` }
          if (xI1 !== 1 && yI1 === 1) { texteCorr += `  <br>Ce qui donne au final : $ M\\left(\\dfrac{${xI0}}{${xI1}};${yI0}\\right)$` }
          if (xI1 === 1 && yI1 === 1) { texteCorr += `  <br>Ce qui donne au final : $ M\\left(${xI0};${yI0}\\right)$` }
          texteCorr += '<br> Les coordonnées du point $N$ milieu de $[BC]$ sont '
          texteCorr += '$N\\left(\\dfrac{x_B+x_C}{2};\\dfrac{y_B+y_C}{2}\\right)$ <br>'
          texteCorr += 'On applique la relation à l\'énoncé : '
          texteCorr += `$\\begin{cases}x_N=\\dfrac{${xB}+${ecritureParentheseSiNegatif(xC)}}{2} \\\\ y_N=\\dfrac{${yB}+${ecritureParentheseSiNegatif(yC)}}{2}\\end{cases}$`
          texteCorr += `<br>On en déduit :  $\\begin{cases}x_N=\\dfrac{${texNombre(xB + xC)}}{2}\\\\y_N=\\dfrac{${texNombre(yB + yC)}}{2}\\end{cases}$`
          if (xJ1 !== 1 && yJ1 !== 1) { texteCorr += `  <br>Ce qui donne au final : $ N\\left(\\dfrac{${xJ0}}{${xJ1}};\\dfrac{${yJ0}}{${yJ1}};\\right)$` }
          if (xJ1 === 1 && yJ1 !== 1) { texteCorr += `  <br>Ce qui donne au final : $ N\\left(${xJ0};\\dfrac{${yJ0}}{${yJ1}}\\right)$` }
          if (xJ1 !== 1 && yJ1 === 1) { texteCorr += `  <br>Ce qui donne au final : $ N\\left(\\dfrac{${xJ0}}{${xJ1}};${yJ0}\\right)$` }
          if (xJ1 === 1 && yJ1 === 1) { texteCorr += `  <br>Ce qui donne au final : $ N\\left(${xJ0};${yJ0}\\right)$` }
          texteCorr += '<br>On observe que $M$ et $N$ ont les mêmes coordonnées, donc les deux diagonales du quadrilatère se coupent en leur milieu.'
          texteCorr += '<br>$ABDC$ est donc un parallélogramme.'
          break
        case 2: // Dq ABDC pas un parallélogramme
          xA = randint(0, 4) * choice([-1, 1])
          yA = randint(0, 4) * choice([-1, 1])
          xC = randint(0, 4) * choice([-1, 1])
          yC = randint(0, 4) * choice([-1, 1])

          while (abs(xC - xA) < 3) {
            xA = randint(0, 4) * choice([-1, 1])
            xC = randint(0, 4) * choice([-1, 1])
          }
          while (abs(yC - yA) < 3) {
            yA = randint(0, 4) * choice([-1, 1])
            yC = randint(0, 4) * choice([-1, 1])
          }
          ux = randint(2, 4) * choice([-1, 1])
          uy = randint(2, 4) * choice([-1, 1])
          xB = xA + ux
          yB = yA + uy
          test = choice([-1, 1])

          if (test === -1) {
            xD = xC + ux + randint(1, 2) * choice([-1, 1])
            yD = yC + uy
          }
          if (test === 1) {
            xD = xC + ux
            yD = yC + uy + randint(1, 2) * choice([-1, 1])
          }
          xI0 = fractionSimplifiee(xA + xD, 2)[0]
          xI1 = fractionSimplifiee(xA + xD, 2)[1]
          yI0 = fractionSimplifiee(yA + yD, 2)[0]
          yI1 = fractionSimplifiee(yA + yD, 2)[1]
          xJ0 = fractionSimplifiee(xB + xC, 2)[0]
          xJ1 = fractionSimplifiee(xB + xC, 2)[1]
          yJ0 = fractionSimplifiee(yB + yC, 2)[0]
          yJ1 = fractionSimplifiee(yB + yC, 2)[1]
          g = grille(-9, -9, 9, 9)
          A = point(xA, yA, 'A', 'blue')
          B = point(xB, yB, 'B', 'blue')
          C = point(xC, yC, 'C', 'blue')
          D = point(xD, yD, 'D', 'blue')
          I = point(1, 0, 'I')
          J = point(0, 1, 'J')
          O = point(0, 0, 'O')
          M = point((xA + xD) / 2, (yA + yD) / 2, 'M', 'red')
          N = point((xB + xC) / 2, (yB + yC) / 2, 'N', 'red')
          a = axes(-9, -9, 9, 9)
          s1 = segment(A, B, 'blue')
          s2 = segment(D, B, 'blue')
          s3 = segment(C, D, 'blue')
          s4 = segment(A, C, 'blue')
          s5 = segment(A, D, 'red')
          s6 = segment(B, C, 'red')

          s1.epaisseur = 2
          s2.epaisseur = 2
          s3.epaisseur = 2
          s4.epaisseur = 2
          s5.epaisseur = 2
          s6.epaisseur = 2
          // codageSegments('X', 'red', s1, s2, s3, s4, s5, s6) // Code les segments s5 et s6

          T = tracePoint(A, B, C, D, I, J, M, N, O) // Repère les points avec une croix
          L = labelPoint(A, B, C, D, I, J, M, N, O)

          texte = 'Dans un repère orthonormé $(O,I,J)$, on donne les 4 points suivants :<br>'
          texte += ` $A\\left(${xA};${yA}\\right)$ ; $B\\left(${xB};${yB}\\right).$`
          texte += ` $C\\left(${xC};${yC}\\right)$ ; $D\\left(${xD};${yD}\\right).$`
          texte += '<br>Déterminer si le quadrilatère $ABDC$ est un parallélogramme.'

          texteCorr = mathalea2d({
            xmin: -9,
            ymin: -9,
            xmax: 9,
            ymax: 9
          }, T, L, g, a, s1, s2, s3, s4, s5, s6)

          texteCorr += '<br>On sait que $ABDC$ est un parallélogramme si et seulement si ses diagonales se coupent en leur milieu.'
          texteCorr += '<br>On cherche donc les coordonnées du milieu de chacune des deux diagonales du quadrilatère.'
          texteCorr += '<br>On sait d\'après le cours, que si $A(x_A;y_A)$ et $D(x_D;y_D)$ sont deux points d\'un repère,'
          texteCorr += '<br> alors les coordonnées du point $M$ milieu de $[AD]$ sont '
          texteCorr += '$M\\left(\\dfrac{x_A+x_D}{2};\\dfrac{y_A+y_D}{2}\\right)$ <br>'
          texteCorr += 'On applique la relation à l\'énoncé : '
          texteCorr += `$\\begin{cases}x_M=\\dfrac{${xA}+${ecritureParentheseSiNegatif(xD)}}{2} \\\\ y_M=\\dfrac{${yA}+${ecritureParentheseSiNegatif(yD)}}{2}\\end{cases}$`
          texteCorr += `<br>On en déduit :  $\\begin{cases}x_M=\\dfrac{${texNombre(xA + xD)}}{2}\\\\y_M=\\dfrac{${texNombre(yA + yD)}}{2}\\end{cases}$`
          if (xI1 !== 1 && yI1 !== 1) { texteCorr += `  <br>Ce qui donne au final : $ M\\left(\\dfrac{${xI0}}{${xI1}};\\dfrac{${yI0}}{${yI1}}\\right)$` }
          if (xI1 === 1 && yI1 !== 1) { texteCorr += `  <br>Ce qui donne au final : $ M\\left(${xI0};\\dfrac{${yI0}}{${yI1}}\\right)$` }
          if (xI1 !== 1 && yI1 === 1) { texteCorr += `  <br>Ce qui donne au final : $ M\\left(\\dfrac{${xI0}}{${xI1}};${yI0}\\right)$` }
          if (xI1 === 1 && yI1 === 1) { texteCorr += `  <br>Ce qui donne au final : $ M\\left(${xI0};${yI0}\\right)$` }
          texteCorr += '<br> Les coordonnées du point $N$ milieu de $[BC]$ sont '
          texteCorr += '$N\\left(\\dfrac{x_B+x_C}{2};\\dfrac{y_B+y_C}{2}\\right)$ <br>'
          texteCorr += 'On applique la relation à l\'énoncé : '
          texteCorr += `$\\begin{cases}x_N=\\dfrac{${xB}+${ecritureParentheseSiNegatif(xC)}}{2} \\\\ y_N=\\dfrac{${yB}+${ecritureParentheseSiNegatif(yC)}}{2}\\end{cases}$`
          texteCorr += `<br>On en déduit :  $\\begin{cases}x_N=\\dfrac{${texNombre(xB + xC)}}{2}\\\\y_N=\\dfrac{${texNombre(yB + yC)}}{2}\\end{cases}$`
          if (xJ1 !== 1 && yJ1 !== 1) { texteCorr += `  <br>Ce qui donne au final : $ N\\left(\\dfrac{${xJ0}}{${xJ1}};\\dfrac{${yJ0}}{${yJ1}}\\right)$` }
          if (xJ1 === 1 && yJ1 !== 1) { texteCorr += `  <br>Ce qui donne au final : $ N\\left(${xJ0};\\dfrac{${yJ0}}{${yJ1}}\\right)$` }
          if (xJ1 !== 1 && yJ1 === 1) { texteCorr += `  <br>Ce qui donne au final : $ N\\left(\\dfrac{${xJ0}}{${xJ1}};${yJ0}\\right)$` }
          if (xJ1 === 1 && yJ1 === 1) { texteCorr += `  <br>Ce qui donne au final : $ N\\left(${xJ0};${yJ0}\\right)$` }
          texteCorr += '<br>On observe que $M$ et $N$ n\'ont pas les mêmes coordonnées, donc les deux diagonales du quadrilatère ne se coupent pas en leur milieu.'
          texteCorr += '<br>$ABDC$ n\'est donc pas un parallélogramme.'
          break
      }
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
