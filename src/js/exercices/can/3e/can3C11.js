import { fraction } from '../../../modules/fractions.js'
import { calcul, choice, randint, texNombre } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Simplifier des fractions ou des racines carrées'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Gilles Mora
 */
export default function SimplifieFractionOuRacinesCarrees () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    let a, b, n, k, maFraction
    let resultat
    this.formatChampTexte = 'largeur15 inline'
    switch (randint(1, 3)) {
      case 1:// simplification de fraction
        do {
          a = randint(1, 12)
          b = randint(2, 12, [a, calcul(a / 2), calcul(a / 3), calcul(a / 4), 11])
        } while (Number.isInteger((calcul(a / b))))
        k = choice([2, 4, 6, 8, 9, 10])
        maFraction = fraction(a * k, b * k)
        k = calcul(maFraction.n / maFraction.numIrred)
        resultat = maFraction.simplifie()
        this.question = `Écrire $${maFraction.texFraction}$ sous la forme d'une fraction irréductible.`
        this.correction = `$${maFraction.texFraction}=\\dfrac{${resultat.n}\\times ${k}}{${resultat.d}\\times ${k}} =${resultat.texFraction}$.`
        this.reponse = resultat
        this.formatInteractif = 'fraction'
        break

      case 2:// racine carrée ()^2 ou rac(0,04) par ex
        n = choice(['a', 'b'])
        if (n === 'a') {
          a = randint(2, 3)
          b = choice([2, 5, 6, 7, 10])
          resultat = a * a * b
          this.question = `$(${a}\\sqrt{${b}})^2=$`
          this.correction = `$(${a}\\sqrt{${b}})^2=${a}^2\\times (\\sqrt{${b}})^2=${a * a}\\times ${b}=${a * a * b}$.`
          this.reponse = resultat
          this.formatInteractif = 'calcul'
        }
        if (n === 'b') {
          a = randint(1, 9) / 10

          resultat = a
          this.question = `$\\sqrt{${texNombre(a ** 2)}}=$`
          this.correction = `$${texNombre(a ** 2)}$ est le carré du nombre positif $${texNombre(a)}$ donc $\\sqrt{${texNombre(a ** 2)}}=${texNombre(a)}$.`
          this.reponse = resultat
          this.formatInteractif = 'calcul'
        }
        break

      case 3:// somme racine carrée ()^2
        a = randint(2, 10)
        b = randint(2, 10, a)
        resultat = (a - b) * (a - b)

        if (a - b < 0) {
          this.question = `$(\\sqrt{${a * a}}-\\sqrt{${b * b}})^2=$`
          this.correction = `$(\\sqrt{${a * a}}-\\sqrt{${b * b}})^2=(${a}-${b})^2=(${a - b})^2=${(a - b) * (a - b)}$.`
          this.reponse = resultat
          this.formatInteractif = 'calcul'
        } else {
          this.question = `$(\\sqrt{${a * a}}-\\sqrt{${b * b}})^2=$`
          this.correction = `$(\\sqrt{${a * a}}-\\sqrt{${b * b}})^2=(${a}-${b})^2=${a - b}^2=${(a - b) * (a - b)}$.`
          this.reponse = resultat
          this.formatInteractif = 'calcul'
        }
        break
    }
  }
}
