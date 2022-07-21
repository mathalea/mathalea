import { calcul, randint } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Calculer une expression pour une valeur particulière*'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Gilles Mora
 * Réference : can4L06
 */
export default function CalculSubstitution () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.date = 1635092507483
  this.nouvelleVersion = function () {
    this.formatChampTexte = 'largeur15 inline'
    let a, b, d
    switch (randint(1, 4)) {
      case 1:
        a = randint(-5, -1)
        b = randint(1, 9)
        d = randint(1, 9)
        this.reponse = calcul(a ** 2 + b)
        this.question = `Calculer $x^2+${b}$ pour $x=${a}$`
        this.correction = `$(${a})^2+${b}=${a ** 2 + b}$.`
        break
      case 2:
        a = randint(2, 7)
        b = randint(1, 9)
        d = randint(1, 9)
        this.reponse = calcul(-b + a ** 2)
        this.question = `Calculer $-${b}+x^2$ pour $x=${a}$`
        this.correction = `$-${b}+(${a})^2=${-b + a * a}$.`
        break
      case 3:
        a = randint(2, 9)
        b = randint(1, 9)
        d = randint(1, 9)
        this.reponse = calcul(a - a * a)
        this.question = `Calculer $x-x^2$ pour $x=${a}$`
        this.correction = `$${a}-${a}^2=${a - a ** 2}$.`
        break
      case 4:
        a = randint(1, 6)
        b = randint(1, 9)
        d = randint(1, 9)
        this.reponse = calcul(a ** 2 + a - d)
        this.question = `Calculer $x^2+x-${d}$ pour $x=${a}$`
        this.correction = `$(${a})^2+${a}-${d}=${a ** 2 + a - d}$.`
        break
    }
  }
}
