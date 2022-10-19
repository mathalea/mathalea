import Exercice from '../../Exercice.js'
import { mathalea2d } from '../../../modules/2dGeneralites.js'
import { randint, choice, texNombre, choisitLettresDifferentes } from '../../../modules/outils.js'
import {
  point, labelPoint, afficheLongueurSegment, afficheMesureAngle, pointAdistance, segment
} from '../../../modules/2d.js'
import Decimal from 'decimal.js/decimal.mjs'
import FractionX from '../../../modules/FractionEtendue.js'
export const titre = 'Calculer un produit scalaire à l’aide de normes et d’un angle '
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '26/06/2022'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can1G04
 *
*/
export const uuid = 'df08a'
export const ref = 'can1G04'
export default function ProduitScalaireNormesAngles () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.formatChampTexte = 'largeur15 inline'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    const choix = choice([true, false])
    const nom = choisitLettresDifferentes(3, 'O', true)
    const A = point(0, 0, nom[0], 'below')
    const a = randint(4, 8)//
    const B = pointAdistance(A, a, 0, nom[1], 'below')
    const b = randint(4, 8)//
    const d = (new Decimal(a * b)).div(2)
    const f1 = new FractionX(a * b, 2)
    const Angle = [[60, '$\\dfrac{\\pi}{3}$', '\\dfrac{\\pi}{3}'], [30, '$\\dfrac{\\pi}{6}$', '\\dfrac{\\pi}{6}'],
      [45, '$\\dfrac{\\pi}{4}$', '\\dfrac{\\pi}{4}'],
      [120, '$\\dfrac{2\\pi}{3}$', '\\dfrac{2\\pi}{3}'],
      [135, '$\\dfrac{3\\pi}{4}$', '\\dfrac{3\\pi}{4}'],
      [150, '$\\dfrac{5\\pi}{6}$', '\\dfrac{5\\pi}{6}']
    ]
    const angle = choice(Angle)
    const C = pointAdistance(A, b, angle[0], nom[2], 'above')
    const vAB = segment(A, B, 'blue', '->')
    vAB.epaisseur = 2
    const a1 = afficheLongueurSegment(B, A, 'black', 0.5, '')
    const a2 = afficheLongueurSegment(A, C, 'black', 0.5, '')
    const vAC = segment(A, C, 'red', '->')
    vAC.epaisseur = 2

    const a3 = choix ? afficheMesureAngle(B, A, C, 'black', 1.5, `${angle[1]}`) : afficheMesureAngle(B, A, C, 'black', 1.5, `${angle[0]}°`)
    const objets = []
    const xmin = Math.min(A.x, B.x, C.x) - 1
    const ymin = Math.min(A.y, B.y, C.y) - 1.5
    const xmax = Math.max(A.x, B.x, C.x) + 1
    const ymax = Math.max(A.y, B.y, C.y) + 1.5

    objets.push(vAB, vAC, labelPoint(A, B, C), a1, a2, a3)

    this.question = `Calculer $\\overrightarrow{${nom[0]}${nom[1]}}\\cdot\\overrightarrow{${nom[0]}${nom[2]}}$.<br>
    
    `
    this.question += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 15, mainlevee: false, amplitude: 0.3, scale: 0.5, style: 'margin: auto' }, objets)
    if (angle[0] === 30) {
      this.correction = `
    $\\begin{aligned}
    \\overrightarrow{${nom[0]}${nom[1]}}\\cdot\\overrightarrow{${nom[0]}${nom[2]}}&=${nom[0]}${nom[1]}\\times ${nom[0]}${nom[2]}\\times \\cos(\\widehat{${nom[2]}${nom[0]}${nom[1]}})\\\\
    &=${choix ? `${a}\\times ${b}\\times \\cos\\left(${angle[2]}\\right)` : `${a}\\times ${b}\\times \\cos(${angle[0]}°)`}\\\\
             &=\\dfrac{${a * b}\\sqrt{3}}{2}\\\\
             &=${texNombre(d, 1)}\\sqrt{3}
             \\end{aligned}$



   `
      this.reponse = [`${d}\\sqrt{3}`, `${f1.texFraction}\\times\\sqrt{3}`]
    }

    if (angle[0] === 45) {
      this.correction = `
      $\\begin{aligned}
      \\overrightarrow{${nom[0]}${nom[1]}}\\cdot\\overrightarrow{${nom[0]}${nom[2]}}&=${nom[0]}${nom[1]}\\times ${nom[0]}${nom[2]}\\times \\cos(\\widehat{${nom[2]}${nom[0]}${nom[1]}})\\\\
      &=${choix ? `${a}\\times ${b}\\times \\cos\\left(${angle[2]}\\right)` : `${a}\\times ${b}\\times \\cos(${angle[0]}°)`}\\\\
               &=\\dfrac{${a * b}\\times\\sqrt{2}}{2}\\\\
               &=${texNombre(d, 1)}\\sqrt{2}
               \\end{aligned}$



     `
      this.reponse = [`${d}\\sqrt{2}`, `${f1.texFraction}\\times\\sqrt{2}`]
    }

    if (angle[0] === 60) {
      this.correction = `
      $\\begin{aligned}
      \\overrightarrow{${nom[0]}${nom[1]}}\\cdot\\overrightarrow{${nom[0]}${nom[2]}}&=${nom[0]}${nom[1]}\\times ${nom[0]}${nom[2]}\\times \\cos(\\widehat{${nom[2]}${nom[0]}${nom[1]}})\\\\
               &=${choix ? `${a}\\times ${b}\\times \\cos\\left(${angle[2]}\\right)` : `${a}\\times ${b}\\times \\cos(${angle[0]}°)`}\\\\
               &=${a * b}\\times\\dfrac{1}{2}\\\\
               &=${texNombre(d, 1)}
               \\end{aligned}$



     `
      this.reponse = [`${d}`, `${f1.texFraction}`]
    }

    if (angle[0] === 120) {
      this.correction = `
    $\\begin{aligned}
    \\overrightarrow{${nom[0]}${nom[1]}}\\cdot\\overrightarrow{${nom[0]}${nom[2]}}&=${nom[0]}${nom[1]}\\times ${nom[0]}${nom[2]}\\times \\cos(\\widehat{${nom[2]}${nom[0]}${nom[1]}})\\\\
    &=${choix ? `${a}\\times ${b}\\times \\cos\\left(${angle[2]}\\right)` : `${a}\\times ${b}\\times \\cos(${angle[0]}°)`}\\\\
             &=${a * b}\\times\\dfrac{-1}{2}\\\\
             &=${texNombre(-d, 1)}
             \\end{aligned}$



   `
      this.reponse = [`${-d}`, `${f1.oppose().texFraction}`]
    }

    if (angle[0] === 135) {
      this.correction = `
  $\\begin{aligned}
  \\overrightarrow{${nom[0]}${nom[1]}}\\cdot\\overrightarrow{${nom[0]}${nom[2]}}&=${nom[0]}${nom[1]}\\times ${nom[0]}${nom[2]}\\times \\cos(\\widehat{${nom[2]}${nom[0]}${nom[1]}})\\\\
  &=${choix ? `${a}\\times ${b}\\times \\cos\\left(${angle[2]}\\right)` : `${a}\\times ${b}\\times \\cos(${angle[0]}°)`}\\\\
           &=${a * b}\\times\\dfrac{-\\sqrt{2}}{2}\\\\
           &=${texNombre(-d, 1)}\\sqrt{2}
           \\end{aligned}$



 `
      this.reponse = [`${-d}\\sqrt{2}`, `${f1.oppose().texFraction}\\times\\sqrt{2}`]
    }

    if (angle[0] === 150) {
      this.correction = `
    $\\begin{aligned}
    \\overrightarrow{${nom[0]}${nom[1]}}\\cdot\\overrightarrow{${nom[0]}${nom[2]}}&=${nom[0]}${nom[1]}\\times ${nom[0]}${nom[2]}\\times \\cos(\\widehat{${nom[2]}${nom[0]}${nom[1]}})\\\\
    &=${choix ? `${a}\\times ${b}\\times \\cos\\left(${angle[2]}\\right)` : `${a}\\times ${b}\\times \\cos(${angle[0]}°)`}\\\\
             &=${a * b}\\times\\dfrac{-\\sqrt{3}}{2}\\\\
             &=${texNombre(-d, 1)}\\sqrt{3}
             \\end{aligned}$



   `
      this.reponse = [`${-d}\\sqrt{3}`, `${f1.oppose().texFraction}\\times\\sqrt{3}`]
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
