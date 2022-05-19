import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, abs, ecritureParentheseSiNegatif, fractionSimplifiee, texNombre } from '../../modules/outils.js'
import { point, tracePoint, labelPoint, segment, axes, grille, mathalea2d } from '../../modules/2d.js'

export const titre = 'Déterminer les coordonnées milieu d\'un segment dans un repère'

/**
 * 2G12-2
 * @author Stéphane Guyon
 */
export default function Milieu () {
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
    let typesDeQuestionsDisponibles = [1, 2]; let typesDeQuestions
    if (this.sup === 1) {
      typesDeQuestionsDisponibles = [1]
    }
    if (this.sup === 2) {
      typesDeQuestionsDisponibles = [2]
    }

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, a, g, s, xA, yA, xB, yB, xI0, xI1, yI0, yI1, xI, yI, A, B, T, L, M, I, J, O, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      switch (typesDeQuestions) {
        case 1:// cas simple du milieu
          xA = 0
          xB = 0
          yA = 0
          yB = 0
          while (abs(xB - xA) < 3) {
            xA = randint(0, 8) * choice([-1, 1])
            xB = randint(0, 8) * choice([-1, 1])
          }
          while (abs(yB - yA) < 3) {
            yA = randint(0, 8) * choice([-1, 1])
            yB = randint(0, 8) * choice([-1, 1])
          }

          xI0 = fractionSimplifiee(xA + xB, 2)[0]
          xI1 = fractionSimplifiee(xA + xB, 2)[1]
          yI0 = fractionSimplifiee(yA + yB, 2)[0]
          yI1 = fractionSimplifiee(yA + yB, 2)[1]

          g = grille(-9, -9, 9, 9)
          A = point(xA, yA, 'A')
          B = point(xB, yB, 'B')
          M = point((xA + xB) / 2, (yA + yB) / 2, 'M')
          I = point(1, 0, 'I')
          J = point(0, 1, 'J')
          O = point(0, 0, 'O')
          a = axes(-9, -9, 9, 9)
          s = segment(A, B, 'blue')

          s.epaisseur = 2
          // s3 = codeSegments('X', 'red', s1, s2)
          T = tracePoint(A, B, M, I, J, O) // Repère les points avec une croix
          L = labelPoint(A, B, M, I, J, O)
          texte = 'Dans un repère orthonormé $(O,I,J)$, on donne les points suivants :'
          texte += ` $A\\left(${xA};${yA}\\right)$ et $B\\left(${xB};${yB}\\right)$`
          texte += '<br>Déterminer les coordonnées du point $M$ milieu du segment $[AB]$ '

          texteCorr = mathalea2d({
            xmin: -9,
            ymin: -9,
            xmax: 9,
            ymax: 9
          }, a, g, T, L, s)

          texteCorr += '<br>On sait d\'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d\'un repère orthonormé,'
          texteCorr += '<br> alors les coordonnées du point $M$ milieu de $[AB]$ sont '
          texteCorr += '$M\\left(\\dfrac{x_A+x_B}{2};\\dfrac{y_A+y_B}{2}\\right)$ <br>'
          texteCorr += 'On applique la relation à l\'énoncé : '
          texteCorr += `$\\begin{cases}x_M=\\dfrac{${xA}+${ecritureParentheseSiNegatif(xB)}}{2} \\\\ y_M=\\dfrac{${yA}+${ecritureParentheseSiNegatif(yB)}}{2}\\end{cases}$`
          texteCorr += `<br>On en déduit :  $\\begin{cases}x_M=\\dfrac{${texNombre(xA + xB)}}{2}\\\\y_M=\\dfrac{${texNombre(yA + yB)}}{2}\\end{cases}$`
          if (xI1 !== 1 && yI1 !== 1) { texteCorr += `  <br>Ce qui donne au final : $ M\\left(\\dfrac{${xI0}}{${xI1}};\\dfrac{${yI0}}{${yI1}};\\right)$` }
          if (xI1 === 1 && yI1 !== 1) { texteCorr += `  <br>Ce qui donne au final : $ M\\left(${xI0};\\dfrac{${yI0}}{${yI1}}\\right)$` }
          if (xI1 !== 1 && yI1 === 1) { texteCorr += `  <br>Ce qui donne au final : $ M\\left(\\dfrac{${xI0}}{${xI1}};${yI0}\\right)$` }
          if (xI1 === 1 && yI1 === 1) { texteCorr += `  <br>Ce qui donne au final : $ M\\left(${xI0};${yI0}\\right)$` }

          ;
          break
        case 2: // cas où on connaît A et I, on cherche B

          xA = randint(0, 4) * choice([-1, 1])
          yA = randint(0, 4) * choice([-1, 1])
          xI = randint(0, 4) * choice([-1, 1])
          yI = randint(0, 4) * choice([-1, 1])
          while (abs(xI - xA) < 2 || abs(xI - xA) > 5) { // on choisit A et I ni trop près, ni trop loin
            xI = randint(0, 4) * choice([-1, 1])
            xA = randint(0, 4) * choice([-1, 1])
          }
          while (abs(yI - yA) < 2 || abs(yI - yA) > 5) { // on choisit A et I ni trop près, ni trop loin
            yA = randint(0, 4) * choice([-1, 1])
            yI = randint(0, 4) * choice([-1, 1])
          }

         // xI0 = fractionSimplifiee(xA + xB, 2)[0]
          // xI1 = fractionSimplifiee(xA + xB, 2)[1]
          // yI0 = fractionSimplifiee(yA + yB, 2)[0]
          // yI1 = fractionSimplifiee(yA + yB, 2)[1]
          g = grille(-9, -9, 9, 9)
          A = point(xA, yA, 'A', 'red')
          B = point(2 * xI - xA, 2 * yI - yA, 'B', 'red')
          M = point(xI, yI, 'M')
          O = point(0, 0, 'O')
          I = point(1, 0, 'I')
          J = point(0, 1, 'J')
          a = axes(-9, -9, 9, 9)
          s = segment(A, B, 'blue')
          s.epaisseur = 2
          T = tracePoint(A, B, M, O, I, J) // Repère les points avec une croix
          L = labelPoint(A, B, M, O, I, J)
          texte = 'Dans un repère orthonormé $(O,I,J)$, on donne les points suivants :'
          texte += ` $A\\left(${xA};${yA}\\right)$ et $M\\left(${xI};${yI}\\right)$`
          texte += '<br>Déterminer les coordonnées du point $B$ tel que $M$ soit le milieu du segment $[AB]$ '

          texteCorr = mathalea2d({
            xmin: -9,
            ymin: -9,
            xmax: 9,
            ymax: 9
          }, g, a, s, T, L)

          texteCorr += '<br>On sait d\'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d\'un repère orthonormé,'
          texteCorr += ' <br>alors les coordonnées du point $M$ milieu de $[AB]$ sont '
          texteCorr += '$M\\left(\\dfrac{x_A+x_B}{2};\\dfrac{y_A+y_B}{2}\\right)$ <br>'
          texteCorr += 'On applique la relation à l\'énoncé : '
          texteCorr += `$\\begin{cases}${xI}=\\dfrac{${xA}+x_B}{2} \\\\ ${yI}=\\dfrac{${yA}+y_B}{2}\\end{cases}$`
          texteCorr += `$\\iff \\begin{cases}x_B=2\\times ${xI} -${ecritureParentheseSiNegatif(xA)} \\\\ y_B=2\\times ${yI}-${ecritureParentheseSiNegatif(yA)}\\end{cases}$`
          texteCorr += `<br>On en déduit :  $\\begin{cases}x_B={${texNombre(2 * xI - xA)}}\\\\y_B=${texNombre(2 * yI - yA)}\\end{cases}$`
          texteCorr += `<br>Au final : $B\\left( ${texNombre(2 * xI - xA)};${texNombre(2 * yI - yA)}\\right)$`
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
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, '1 : Application directe 2 : Application indirecte.']
}
