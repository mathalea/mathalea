import Exercice from '../../Exercice.js'
import { mathalea2d } from '../../../modules/2dGeneralites.js'
import { randint, choice, texNombre } from '../../../modules/outils.js'
import {
  point, labelPoint, afficheLongueurSegment, codageAngleDroit, afficheMesureAngle, codageSegment, pointAdistance, polygone, milieu, segment
} from '../../../modules/2d.js'
import Decimal from 'decimal.js/decimal.mjs'
import FractionX from '../../../modules/FractionEtendue.js'
export const titre = 'Déterminer un produit scalaire sur des figures géométriques classiques '
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '27/06/2022'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can1G06
 *
*/
export default function ProduitScalaireFiguresClassiques () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.formatChampTexte = 'largeur15 inline'
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    let A, B, C, D, I, E, F, O, a, b, c, d, segmentEB, segmentFC, segmentAD, sol, angle, objets, f1, poly, a1, a2, a3, a4, a5, a6, choix, choixb, xmin, ymin, ymax, xmax
    switch (choice([1, 2, 3, 4])) {
      case 1:// parallelogramme
        choix = choice(['a', 'b'])
        A = point(0, 0, 'A', 'below')
        a = randint(4, 8)//
        b = randint(4, 8)//
        d = (new Decimal(a * b)).div(2)

        f1 = new FractionX(a * b, 2)
        B = pointAdistance(A, b, 0, 'B', 'below')
        angle = choice([30, 45, 60])
        C = pointAdistance(B, a, angle, 'C', 'above')
        D = pointAdistance(A, a, angle, 'D', 'above')
        poly = polygone(A, B, C, D)
        a1 = afficheLongueurSegment(B, A, 'black', 0.5, '')
        a2 = afficheLongueurSegment(C, B, 'black', 0.5, '')
        a3 = afficheMesureAngle(B, A, D, 'black', 1.5, `${angle}°`)
        objets = []
        xmin = Math.min(A.x, B.x, C.x, D.x) - 1
        ymin = Math.min(A.y, B.y, C.y, D.y) - 1
        xmax = Math.max(A.x, B.x, C.x, D.x) + 1
        ymax = Math.max(A.y, B.y, C.y, D.y) + 1

        objets.push(labelPoint(A, B, C, D), a1, a2, a3, poly)
        if (choix === 'a') {
          this.question = 'Calculer $\\overrightarrow{AB}\\cdot \\overrightarrow{AD}$.<br>'
          this.question += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 18, mainlevee: false, amplitude: 0.3, scale: 0.7, style: 'margin: auto' }, objets)
          if (angle === 30) {
            this.correction = `
      $\\begin{aligned}
     \\overrightarrow{AB}\\cdot \\overrightarrow{AD}&=AB\\times AD\\times \\cos(\\widehat{BAD})\\\\
      &=${a}\\times ${b}\\times \\cos\\left(${angle}°\\right)\\\\
               &=${a * b}\\times\\dfrac{\\sqrt{3}}{2}\\\\
               &=${texNombre(d, 1)}\\sqrt{3}
               \\end{aligned}$`
            this.reponse = [`${d}\\sqrt{3}`, `${f1.texFraction}\\times\\sqrt{3}`]
          }
          if (angle === 45) {
            this.correction = `
      $\\begin{aligned}
     \\overrightarrow{AB}\\cdot \\overrightarrow{AD}&=AB\\times AD\\times \\cos(\\widehat{BAD})\\\\
      &=${a}\\times ${b}\\times \\cos\\left(${angle}°\\right)\\\\
               &=${a * b}\\times \\dfrac{\\sqrt{2}}{2}\\\\
               &=${texNombre(d, 1)}\\sqrt{2}
               \\end{aligned}$`
            this.reponse = [`${d}\\sqrt{2}`, `${f1.texFraction}\\times\\sqrt{2}`]
          }
          if (angle === 60) {
            this.correction = `
      $\\begin{aligned}
     \\overrightarrow{AB}\\cdot \\overrightarrow{AD}&=AB\\times AD\\times \\cos(\\widehat{BAD})\\\\
      &=${a}\\times ${b}\\times \\cos\\left(${angle}°\\right)\\\\
               &=${a * b}\\times \\dfrac{1}{2}\\\\
               &=${texNombre(d, 1)}
               \\end{aligned}$`
            this.reponse = [`${d}`, `${f1.texFraction}`]
          }
        }
        if (choix === 'b') {
          if (choice([true, false])) {
            this.question = 'Calculer $\\overrightarrow{AB}\\cdot \\overrightarrow{DC}$.<br>'
            this.question += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 18, mainlevee: false, amplitude: 0.3, scale: 0.7, style: 'margin: auto' }, objets)

            this.correction = `
    Les vecteurs $\\overrightarrow{AB}$ et $\\overrightarrow{DC}$ sont colinéaires et de même sens.<br>
    On en déduit : $\\overrightarrow{AB}\\cdot \\overrightarrow{DC}=AB\\times DC=${b}\\times ${b}=${b * b}$.`
            this.reponse = b * b
          } else {
            this.question = 'Calculer $\\overrightarrow{AB}\\cdot \\overrightarrow{CD}$.<br>'
            this.question += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 18, mainlevee: false, amplitude: 0.3, scale: 0.7, style: 'margin: auto' }, objets)

            this.correction = `
      Les vecteurs $\\overrightarrow{AB}$ et $\\overrightarrow{CD}$ sont colinéaires et de sens contraires.<br>
      On en déduit : $\\overrightarrow{AB}\\cdot \\overrightarrow{CD}=-AB\\times DC=-${b}\\times ${b}=${-b * b}$.`
            this.reponse = -b * b
          }
        }
        break

      case 2:// carré
        choixb = choice([true, false])
        choix = choice(['a', 'b', 'c', 'd', 'e'])
        A = point(0, 0, 'A', 'below')
        a = choice([4, 6, 8, 10])//
        sol = (new Decimal(a * a)).div(4)
        B = pointAdistance(A, a, 0, 'B', 'below')

        C = pointAdistance(B, a, 90, 'C', 'above')
        D = pointAdistance(A, a, 90, 'D', 'above')
        poly = polygone(A, B, C, D)
        I = milieu(A, B, 'I', 'below')
        a1 = afficheLongueurSegment(D, C, 'black', 0.5, '')
        a2 = afficheLongueurSegment(C, B, 'black', 0.5, '')

        objets = []
        xmin = Math.min(A.x, B.x, C.x, D.x) - 1
        ymin = Math.min(A.y, B.y, C.y, D.y) - 1
        xmax = Math.max(A.x, B.x, C.x, D.x) + 1
        ymax = Math.max(A.y, B.y, C.y, D.y) + 1

        objets.push(labelPoint(A, B, C, D, I), a1, a2, poly, segment(I, D), codageSegment(A, I, '||'), codageSegment(I, B, '||'))
        if (choix === 'a') {
          this.question = `$ABCD$ est un carré. $I$ est le milieu de $[AB]$.<br>
          Calculer $\\overrightarrow{AB}\\cdot ${choixb ? '\\overrightarrow{AD}' : '\\overrightarrow{CB}'}$.<br>`
          this.question += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 18, mainlevee: false, amplitude: 0.3, scale: 0.7, style: 'margin: auto' }, objets)

          this.correction = `Les vecteurs $\\overrightarrow{AB}$ et $${choixb ? '\\overrightarrow{AD}' : '\\overrightarrow{CB}'}$ sont orthogonaux, on en déduit : $\\overrightarrow{AB}\\cdot ${choixb ? '\\overrightarrow{AD}' : '\\overrightarrow{CB}'}=0$.
     `
          this.reponse = 0
        }

        if (choix === 'b') {
          this.question = `$ABCD$ est un carré. $I$ est le milieu de $[AB]$.<br>
          Calculer $\\overrightarrow{DA}\\cdot \\overrightarrow{DI}$.<br>`
          this.question += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 18, mainlevee: false, amplitude: 0.3, scale: 0.7, style: 'margin: auto' }, objets)

          this.correction = `Le projeté orthogonal de $I$ sur $(DA)$ est $A$. Ainsi : <br>
          $\\overrightarrow{DA}\\cdot \\overrightarrow{DI}=\\overrightarrow{DA}\\cdot \\overrightarrow{DA}=${a}^2=${a ** 2}$.
     `
          this.reponse = a * a
        }

        if (choix === 'c') {
          this.question = `$ABCD$ est un carré. $I$ est le milieu de $[AB]$.<br>
          Calculer $\\overrightarrow{AB}\\cdot \\overrightarrow{ID}$.<br>`
          this.question += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 18, mainlevee: false, amplitude: 0.3, scale: 0.7, style: 'margin: auto' }, objets)

          this.correction = `Le projeté orthogonal de $D$ sur $(AB)$ est $A$. Ainsi : <br>
          $\\overrightarrow{AB}\\cdot \\overrightarrow{ID}=\\overrightarrow{AB}\\cdot \\overrightarrow{IA}$.<br>
          Les vecteurs $\\overrightarrow{AB}$ et $\\overrightarrow{IA}$ sont colinéaires de sens contraire. On a donc 
          $\\overrightarrow{AB}\\cdot \\overrightarrow{ID}=-${a}\\times ${texNombre(a / 2, 0)}=${texNombre(-a * a / 2, 0)}$.
     `
          this.reponse = -a * a / 2
        }

        if (choix === 'd') {
          this.question = `$ABCD$ est un carré. $I$ est le milieu de $[AB]$.<br>
          Calculer $\\overrightarrow{BI}\\cdot \\overrightarrow{ID}$.<br>`
          this.question += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 18, mainlevee: false, amplitude: 0.3, scale: 0.7, style: 'margin: auto' }, objets)

          this.correction = `Le projeté orthogonal de $D$ sur $(AB)$ est $A$. Ainsi : <br>
          $\\overrightarrow{BI}\\cdot \\overrightarrow{ID}=\\overrightarrow{BI}\\cdot \\overrightarrow{IA}$.<br>
          Les vecteurs $\\overrightarrow{BI}$ et $\\overrightarrow{IA}$ sont colinéaires de même sens. On a donc 
          $\\overrightarrow{BI}\\cdot \\overrightarrow{ID}=${texNombre(a / 2, 0)}\\times ${texNombre(a / 2, 0)}=${texNombre(sol, 0)}$.
     `
          this.reponse = sol
        }

        if (choix === 'e') {
          this.question = `$ABCD$ est un carré. $I$ est le milieu de $[AB]$.<br>
          Calculer $\\overrightarrow{BC}\\cdot  ${choixb ? '\\overrightarrow{ID}' : '\\overrightarrow{DI}'}$.<br>`
          this.question += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 18, mainlevee: false, amplitude: 0.3, scale: 0.7, style: 'margin: auto' }, objets)

          this.correction = `Le projeté orthogonal de $I$ sur $(BC)$ est $B$. Celui de $D$ sur $(BC)$ est $C$.  Ainsi : <br>
          $\\overrightarrow{BC}\\cdot ${choixb ? '\\overrightarrow{ID}' : '\\overrightarrow{DI}'}=\\overrightarrow{BC}\\cdot ${choixb ? '\\overrightarrow{BC}' : '\\overrightarrow{CB}'}$.<br>
           On a donc 
          $\\overrightarrow{BC}\\cdot ${choixb ? '\\overrightarrow{ID}' : '\\overrightarrow{DI}'}=${a}\\times ${choixb ? `${a}` : `(-${a})`}=${choixb ? `${a * a}` : `${-a * a}`}$.
     `

          this.reponse = choixb ? a * a : -a * a
        }
        break

      case 3:// trapèze
        choixb = choice([true, false])
        choix = choice(['a', 'b', 'c'])
        A = point(0, 0, 'A', 'below')
        a = randint(5, 10)//
        B = pointAdistance(A, a, 0, 'B', 'below')
        b = randint(2, 4)//
        c = randint(3, 6)
        D = pointAdistance(A, c, 90, 'D', 'above')
        C = pointAdistance(D, b, 0, 'C', 'above')

        poly = polygone(A, B, C, D)
        a1 = afficheLongueurSegment(B, A, 'black', 0.5, '')
        a2 = afficheLongueurSegment(D, C, 'black', 0.5, '')

        objets = []
        xmin = Math.min(A.x, B.x, C.x, D.x) - 1
        ymin = Math.min(A.y, B.y, C.y, D.y) - 1
        xmax = Math.max(A.x, B.x, C.x, D.x) + 1
        ymax = Math.max(A.y, B.y, C.y, D.y) + 1

        objets.push(labelPoint(A, B, C, D), a1, a2, poly, codageAngleDroit(B, A, D))
        if (choix === 'a') {
          this.question = `$ABCD$ est un trapèze rectangle.<br>
          Calculer $\\overrightarrow{AB}\\cdot ${choixb ? '\\overrightarrow{AD}' : '\\overrightarrow{DA}'}$.<br>`
          this.question += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 18, mainlevee: false, amplitude: 0.3, scale: 0.7, style: 'margin: auto' }, objets)

          this.correction = `Les vecteurs $\\overrightarrow{AB}$ et $${choixb ? '\\overrightarrow{AD}' : '\\overrightarrow{DA}'}$ sont orthogonaux. <br>
          Donc $\\overrightarrow{AB}\\cdot ${choixb ? '\\overrightarrow{AD}' : '\\overrightarrow{DA}'}=0$.
     `
          this.reponse = 0
        }

        if (choix === 'b') {
          this.question = `$ABCD$ est un trapèze rectangle.<br>
          Calculer $\\overrightarrow{AB}\\cdot \\overrightarrow{BC}$.<br>`
          this.question += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 18, mainlevee: false, amplitude: 0.3, scale: 0.7, style: 'margin: auto' }, objets)

          this.correction = `Le projeté orthogonal du point $C$ sur $(AB)$ est le point $H$ tel que $BH=${a - b}$.<br>
         On a :  $\\overrightarrow{AB}\\cdot \\overrightarrow{BC}=\\overrightarrow{AB}\\cdot \\overrightarrow{BH}$ avec $\\overrightarrow{AB}$ et  $\\overrightarrow{BH}$ colinéaires de sens contraire.<br>
         On en déduit  $\\overrightarrow{AB}\\cdot \\overrightarrow{BC}=-AB\\times BH=-${a}\\times ${a - b}=${-a * (a - b)}$.
     `
          this.reponse = -a * (a - b)
        }
        if (choix === 'c') {
          this.question = `$ABCD$ est un trapèze rectangle.<br>
          Calculer $\\overrightarrow{AB}\\cdot ${choixb ? '\\overrightarrow{DC}' : '\\overrightarrow{CD}'}$.<br>`
          this.question += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 18, mainlevee: false, amplitude: 0.3, scale: 0.7, style: 'margin: auto' }, objets)

          this.correction = `Les vecteurs $\\overrightarrow{AB}$ et  $${choixb ? '\\overrightarrow{DC}' : '\\overrightarrow{CD}'}$ sont colinéaires ${choixb ? 'même sens' : 'sens contraire'}.<br>
         On a :  $\\overrightarrow{AB}\\cdot ${choixb ? '\\overrightarrow{DC}' : '\\overrightarrow{CD}'}=${a}\\times ${choixb ? `${b}` : `(-${b})`}=${choixb ? `${a * b}` : `${-a * b}`}$ 
       
         
         
       
     `
          this.reponse = choixb ? a * b : -a * b
        }
        break

      case 4:// hexagone
        choixb = choice([true, false])
        choix = choice(['a', 'b', 'c', 'd', 'e', 'f'])
        A = point(0, 0, 'A', 'below')
        a = randint(3, 6)//
        B = pointAdistance(A, a, 0, 'B', 'below')
        C = pointAdistance(B, a, 60, 'C', 'right')
        D = pointAdistance(C, a, 120, 'D', 'above')
        E = pointAdistance(D, a, 180, 'E', 'above')
        F = pointAdistance(E, a, -120, 'F', 'left')
        O = milieu(F, C, 'O', 'below')
        poly = polygone(A, B, C, D, E, F)
        a1 = afficheLongueurSegment(B, A, 'black', 0.5, '')
        a2 = afficheLongueurSegment(D, C, 'black', 0.5, '')
        a3 = afficheLongueurSegment(E, D, 'black', 0.5, '')
        a4 = afficheLongueurSegment(F, E, 'black', 0.5, '')
        a5 = afficheLongueurSegment(A, F, 'black', 0.5, '')
        a6 = afficheLongueurSegment(C, B, 'black', 0.5, '')
        segmentEB = segment(E, B)
        segmentFC = segment(F, C)
        segmentAD = segment(A, D)
        segmentEB.pointilles = 2
        segmentFC.pointilles = 2
        segmentAD.pointilles = 2
        objets = []
        xmin = Math.min(A.x, B.x, C.x, D.x, E.x, F.x) - 1
        ymin = Math.min(A.y, B.y, C.y, D.y, E.y, F.y) - 1
        xmax = Math.max(A.x, B.x, C.x, D.x, E.x, F.x) + 1
        ymax = Math.max(A.y, B.y, C.y, D.y, E.y, F.y) + 1
        sol = (new Decimal(a * a)).div(2)
        objets.push(labelPoint(A, B, C, D, E, F, O), a1, a2, a3, a4, a5, a6, poly, segmentEB, segmentFC, segmentAD)
        if (choix === 'a') {
          this.question = `$ABCDEF$ est un hexagone régulier de centre $O$.<br>
          Calculer $\\overrightarrow{OA}\\cdot ${choixb ? '\\overrightarrow{OB}' : '\\overrightarrow{OF}'}$.<br>`
          this.question += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 18, mainlevee: false, amplitude: 0.3, scale: 0.7, style: 'margin: auto' }, objets)

          this.correction = ` $ABCDEF$ est un hexagone régulier, donc les six triangles sont équilatéraux.<br>
          $\\begin{aligned}
          \\overrightarrow{OA}\\cdot ${choixb ? '\\overrightarrow{OB}' : '\\overrightarrow{OF}'}&=OA\\times  ${choixb ? 'OB' : 'OF'}\\times \\cos(\\widehat{ ${choixb ? 'AOB' : 'AOF'}})\\\\
           &=${a}\\times ${a}\\times \\cos\\left(60°\\right)\\\\
                    &=${a * a}\\times\\dfrac{1}{2}\\\\
                    &=${texNombre(sol, 1)}
                    \\end{aligned}$`

          this.reponse = sol
        }
        if (choix === 'b') {
          this.question = `$ABCDEF$ est un hexagone régulier de centre $O$.<br>
          Calculer $\\overrightarrow{ED}\\cdot ${choixb ? '\\overrightarrow{OC}' : '\\overrightarrow{OF}'}$.<br>`
          this.question += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 18, mainlevee: false, amplitude: 0.3, scale: 0.7, style: 'margin: auto' }, objets)

          this.correction = ` $ABCDEF$ est un hexagone régulier, donc les six triangles sont équilatéraux.<br>
          Les vecteurs $\\overrightarrow{ED}$ et $${choixb ? '\\overrightarrow{OC}' : '\\overrightarrow{OF}'}$ sont colinéaires ${choixb ? 'de même sens' : 'de sens contraire'}.<br>
Ainsi, $\\overrightarrow{ED}\\cdot ${choixb ? '\\overrightarrow{OC}' : '\\overrightarrow{OF}'}=${a}\\times ${choixb ? `${a}` : `(-${a})`}=${choixb ? `${a * a}` : `${-a * a}`}$.
         `

          this.reponse = choixb ? a * a : -a * a
        }

        if (choix === 'c') {
          this.question = `$ABCDEF$ est un hexagone régulier de centre $O$.<br>
            Calculer $\\overrightarrow{OC}\\cdot ${choixb ? '\\overrightarrow{OA}' : '\\overrightarrow{OE}'}$.<br>`
          this.question += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 18, mainlevee: false, amplitude: 0.3, scale: 0.7, style: 'margin: auto' }, objets)

          this.correction = ` $ABCDEF$ est un hexagone régulier, donc les six triangles sont équilatéraux.<br>
            $\\begin{aligned}
            \\overrightarrow{OC}\\cdot ${choixb ? '\\overrightarrow{OA}' : '\\overrightarrow{OE}'}&=OC\\times  ${choixb ? 'OA' : 'OE'}\\times \\cos(\\widehat{ ${choixb ? 'AOE' : 'COE'}})\\\\
             &=${a}\\times ${a}\\times \\cos\\left(120°\\right)\\\\
                      &=${a * a}\\times\\left(-\\dfrac{1}{2}\\right)\\\\
                      &=${texNombre(-sol, 1)}
                      \\end{aligned}$`

          this.reponse = -sol
        }
        if (choix === 'd') {
          this.question = `$ABCDEF$ est un hexagone régulier de centre $O$.<br>
            Calculer $\\overrightarrow{OC}\\cdot ${choixb ? '\\overrightarrow{BD}' : '\\overrightarrow{DB}'}$.<br>`
          this.question += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 18, mainlevee: false, amplitude: 0.3, scale: 0.7, style: 'margin: auto' }, objets)

          this.correction = ` $ABCDEF$ est un hexagone régulier, donc les six triangles sont équilatéraux.<br>
           $OBCD$ est un losange (4 côtés de même longueur). Ses diagonales sont donc perpendiculaires. On en déduit : <br>
           $\\overrightarrow{OC}\\cdot ${choixb ? '\\overrightarrow{BD}' : '\\overrightarrow{DB}'}=0$.
  `
          this.reponse = 0
        }
        if (choix === 'e') {
          this.question = `$ABCDEF$ est un hexagone régulier de centre $O$.<br>
            Calculer $\\overrightarrow{DE}\\cdot \\overrightarrow{DA}$.<br>`
          this.question += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 18, mainlevee: false, amplitude: 0.3, scale: 0.7, style: 'margin: auto' }, objets)

          this.correction = ` $ABCDEF$ est un hexagone régulier, donc les six triangles sont équilatéraux.<br>
            $\\begin{aligned}
            \\overrightarrow{DE}\\cdot \\overrightarrow{DA}&=DE\\times DA\\times \\cos(\\widehat{ ADE})\\\\
             &=${a}\\times 2\\times ${a}\\times \\cos\\left(60°\\right)\\\\
                      &=${2 * a * a}\\times\\dfrac{1}{2}\\\\
                      &=${a * a}
                      \\end{aligned}$`

          this.reponse = a * a
        }
        if (choix === 'f') {
          this.question = `$ABCDEF$ est un hexagone régulier de centre $O$.<br>
            Calculer $\\overrightarrow{OB}\\cdot ${choixb ? '\\overrightarrow{EB}' : '\\overrightarrow{BE}'}$.<br>`
          this.question += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 18, mainlevee: false, amplitude: 0.3, scale: 0.7, style: 'margin: auto' }, objets)

          this.correction = ` $ABCDEF$ est un hexagone régulier, donc les six triangles sont équilatéraux.<br>
            Les vecteurs $\\overrightarrow{OB}$ et $${choixb ? '\\overrightarrow{EB}' : '\\overrightarrow{BE}'}$ sont colinéaires ${choixb ? 'de même sens' : 'de sens contraire'}.<br>
  Ainsi, $\\overrightarrow{OB}\\cdot ${choixb ? '\\overrightarrow{EB}' : '\\overrightarrow{BE}'}=${a}\\times ${choixb ? `2\\times${a}` : `(-2\\times${a})`}=${choixb ? `${2 * a * a}` : `${-2 * a * a}`}$.
           `

          this.reponse = choixb ? 2 * a * a : -2 * a * a
        }

        break
    }
  }
}
