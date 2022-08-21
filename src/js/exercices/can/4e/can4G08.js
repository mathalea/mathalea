import Exercice from '../../Exercice.js'
import { mathalea2d } from '../../../modules/2dGeneralites.js'
import { randint, calcul, choice, texNombrec, texFractionReduite } from '../../../modules/outils.js'
import {
  point, labelPoint, segment, texteParPosition, milieu, tracePoint, codageAngleDroit
} from '../../../modules/2d.js'
import { fraction } from '../../../modules/fractions.js'
export const titre = 'Calculer une aire ou un périmètre (carré et rectangle)'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can4G07
 * Date de publication septembre 2021
*/
export default function QuestionsAiresEtPerimetres () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.date = 1635092507483
  this.formatChampTexte = 'largeur15 inline'
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    let a, b, c, n, d, A, B, C, D, N, maFraction
    const objets = []
    switch (choice([1, 2, 3, 4, 5, 6, 7])) {
      case 1://
        a = randint(3, 9)
        b = randint(0, 1)
        this.question = `Un carré de côté ${a} cm a le même périmètre qu'un rectangle de largeur ${a - b} cm et de longueur ${a + 1} cm ? (oui ou non)`
        if (b === 0) {
          this.correction = `Faux car $4\\times ${a}$ cm$\\neq 2\\times ${a}$ cm$ + 2\\times ${a + 1}$ cm.`
          this.reponse = 'non'
        } else {
          this.correction = `Vrai car $4\\times ${a}$ cm = $2\\times ${a - 1}$ cm $ + 2\\times ${a + 1}$ cm$= ${4 * a}$ cm.`
          this.reponse = 'oui'
        }
        this.ignoreCasse = true
        break
      case 2:// aire d'un carré connaissant son perimètre
        a = randint(2, 10)
        this.reponse = calcul(a * a)
        this.question = `Quelle est l'aire d'un carré en cm$^2$ dont le périmètre est $${4 * a}$ cm ? `
        this.correction = `Le côté du carré est $${4 * a}\\div 4=${a}$, donc son aire est : $${a}\\times ${a}=${a ** 2}$ cm$^2$.`

        break
      case 3:// perimètre d'un carré connaissant son aire
        a = randint(1, 10)
        c = a * a
        this.reponse = calcul(4 * a)
        this.question = `Déterminer le périmètre (en cm) d'un carré d'aire $${c}$ cm$^2$. `
        this.correction = `Le côté du carré est $\\sqrt{${c}}=${a}$. Son périmètre est donc $4\\times ${a}=${4 * a}$ cm.`
        break

      case 4:// côté d'un carré connaissant son perimètre
        a = randint(5, 20) * 4
        this.reponse = calcul(a / 4)
        this.question = `Le périmètre d'un carré est $${a}$ cm. Quelle est la longueur (en cm) du côté du carré ? `
        this.correction = `Le côté du carré est $${a}\\div 4=${a / 4}$.`

        break
      case 5:// périmètre d'une figure
        a = randint(1, 3)//
        b = randint(4, 7)//
        n = randint(7, 12)
        c = randint(1, 6) + randint(3, 9) / 10
        d = n - c
        A = point(0, 0, 'P')
        B = point(7, 1, 'Q', 'below')
        C = point(6.5, 4, 'R')
        D = point(2, 5, 'R')

        objets.push(segment(A, B), segment(B, C), segment(C, D), segment(D, A), tracePoint(A, B, C, D))
        objets.push(texteParPosition(`${texNombrec(b)} m`, milieu(A, D).x - 0.5, milieu(A, D).y, 'milieu', 'black', 1, 'middle', true),
          texteParPosition(`${texNombrec(a)} m`, milieu(B, C).x + 0.5, milieu(B, C).y, 'milieu', 'black', 1, 'middle', true),
          texteParPosition(`${texNombrec(c)} m`, milieu(A, B).x, milieu(A, B).y - 0.5, 'milieu', 'black', 1, 'middle', true),
          texteParPosition(`${texNombrec(d)} m`, milieu(C, D).x, milieu(C, D).y + 0.5, 'milieu', 'black', 1, 'middle', true))

        this.question = 'Quel est le périmètre de cette figure (en m) ?<br>'
        this.question += mathalea2d({ xmin: -1, ymin: -1, xmax: 8, ymax: 6, pixelsParCm: 20, mainlevee: true, amplitude: 0.5, scale: 0.7, style: 'margin: auto' }, objets)
        this.correction = ` Le périmètre est donné par : $${texNombrec(a)}+${texNombrec(b)}+${texNombrec(c)}+${texNombrec(d)}=${texNombrec(a + b + c + d)}$.<br>`
        this.reponse = a + b + c + d

        break
      case 6:// agrandissement/réduction
        N = choice(['a', 'b', 'c'])
        if (N === 'a') {
          a = randint(2, 7)// aire
          c = randint(2, 4)// coefficient
          this.question = `Les longueurs d'un rectangle de $${a}$ cm$^2$  sont multipliées par $${c}$.<br>
          Quelle est l'aire (en cm$^2$) du rectangle ainsi obtenu ?
          `

          this.correction = ` Si les longueurs sont multiplées par $k$, les aires sont multipliées par $k^2$, soit ici par $${c}^2=${c ** 2}$.<br>
          Ainsi, l'aire du nouveau rectangle est : $${a}\\times ${c * c}=${a * c * c}$ cm $^2$.
      <br>`

          this.reponse = a * c * c
        }

        if (N === 'b') {
          n = randint(1, 3)
          d = randint(n + 1, 10)
          maFraction = fraction(n, d).simplifie()
          this.question = `Les longueurs d'un triangle sont multipliées par $${maFraction.texFraction}$.<br>
          Par combien est multipliée son aire  ?
          `

          this.correction = ` Si les longueurs sont multiplées par $k$, les aires sont multipliées par $k^2$.<br>
          Ainsi, l'aire a été multipliée par : $\\left(\\dfrac{${n}}{${d}}\\right)^2=\\dfrac{${n * n}}{${d * d}}$.
      <br>`

          this.reponse = fraction(n * n, d * d)
          this.formatInteractif = 'fraction'
        }
        if (N === 'c') {
          n = randint(1, 3)
          d = randint(n + 1, 10)
          maFraction = fraction(n, d).simplifie()
          this.question = `L'aire d'un parallélogramme a été multipliée par $\\dfrac{${n * n}}{${d * d}}$.<br>
          Par combien ont été multipliées les longueurs de ses côtés ?
          `

          this.correction = ` Si les aires sont multiplées par $k$, les longueurs sont multipliées par $\\sqrt{k}$.<br>
          Ainsi, les longueurs ont été multipliées par  : $\\sqrt{\\dfrac{${n * n}}{${d * d}}}=\\dfrac{${n}}{${d}}$.
      <br>`
          this.reponse = fraction(n * n, d * d)
          this.formatInteractif = 'fraction'
        }
        break
      case 7:// longueur à trouver à partir d'une aire triangle rectangle
        a = randint(2, 10)//
        b = randint(1, 5) * a
        A = point(0, 0, 'A', 'below')
        B = point(8, 0, 'B', 'below')
        C = point(6, 3.46, 'C')

        objets.push(segment(A, B), segment(B, C), segment(C, A), labelPoint(A, B, C), tracePoint(A, B, C), codageAngleDroit(A, C, B))
        objets.push(texteParPosition(`${texNombrec(a)} m`, milieu(B, C).x + 0.5, milieu(B, C).y + 0.5, 'milieu', 'black', 1, 'middle', true)
        )

        this.question = ` L'aire du triangle $ABC$ est $${b}$ m$^2$. Donner la longueur $AC$ (en m).<br>`
        this.question += mathalea2d({ xmin: -1, ymin: -1, xmax: 9, ymax: 4.5, pixelsParCm: 20, mainlevee: true, amplitude: 0.5, scale: 0.7, style: 'margin: auto' }, objets)
        this.correction = ` L'aire de ce triangle rectangle est donnée par : $\\dfrac{BC\\times AC}{2}$.<br>
          On cherche $AC$ telle que $\\dfrac{${a}\\times AC}{2}=${b}$. <br>
          $AC=\\dfrac{2\\times ${b}}{${a}}=${texFractionReduite(2 * b, a)}$ m.
      <br>`
        this.reponse = calcul(2 * b / a)
        break
    }
  }
}
