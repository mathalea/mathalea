import { randint, texNombre, choice, arrondi } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Calculer la somme de décimaux qui se marient'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '11/05/2022'
/*!
 * @author  Gilles Mora
 *
 *
 */
export default function SommeDecimaux () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.typeExercice = 'simple'
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    let a, b, c, e, f, g, k
    const choix = randint(1, 3)
    if (choix === 1) {
      a = randint(1, 9)
      b = randint(1, 9)
      c = randint(1, 9)
      e = randint(1, 9)
      f = randint(1, 9, b)
      g = randint(1, 9)
      k = choice([10, 20])
      this.reponse = arrondi(k + e + f / 10 + g / 100, 2)
      if (choice([true, false])) {
        this.question = `
    $${texNombre(a + b / 10 + c / 100, 2)}+${texNombre(e + f / 10 + g / 100, 2)}+${texNombre(k - a - b / 10 - c / 100, 2)}=$`
        this.correction = `$${texNombre(a + b / 10 + c / 100, 2)}+${texNombre(e + f / 10 + g / 100, 2)}+${texNombre(k - a - b / 10 - c / 100, 2)}=
            \\underbrace{${texNombre(a + b / 10 + c / 100, 2)}+${texNombre(k - a - b / 10 - c / 100, 2)}}_{=${k}}+${texNombre(e + f / 10 + g / 100, 2)}=${texNombre(this.reponse, 2)}$`
      } else {
        this.question = `
          $${texNombre(e + f / 10 + g / 100, 2)}+${texNombre(a + b / 10 + c / 100, 2)}+${texNombre(k - a - b / 10 - c / 100, 2)}=$`

        this.correction = `$${texNombre(e + f / 10 + g / 100, 2)}+${texNombre(a + b / 10 + c / 100, 2)}+${texNombre(k - a - b / 10 - c / 100, 2)}=
          \\underbrace{${texNombre(a + b / 10 + c / 100, 2)}+${texNombre(k - a - b / 10 - c / 100, 2)}}_{=${k}}+${texNombre(e + f / 10 + g / 100, 2)}=${texNombre(this.reponse, 2)}$`
      }
    }
    if (choix === 2) {
      a = randint(1, 9)
      b = randint(1, 9)
      c = randint(1, 9)
      e = randint(1, 9)
      f = randint(1, 9, b)
      g = randint(1, 9)
      this.reponse = arrondi(1 + f / 10 + g / 100, 2)
      if (choice([true, false])) {
        this.question = `
    $${texNombre(f / 10 + g / 100, 2)}+${texNombre(b / 10 + c / 100, 2)}+${texNombre(1 - b / 10 - c / 100, 2)}=$`
        this.correction = `$${texNombre(f / 10 + g / 100, 2)}+${texNombre(b / 10 + c / 100, 2)}+${texNombre(1 - b / 10 - c / 100, 2)}=
        ${texNombre(f / 10 + g / 100, 2)}+\\underbrace{${texNombre(b / 10 + c / 100, 2)}+${texNombre(1 - b / 10 - c / 100, 2)}}_{=1}=${texNombre(this.reponse, 2)}
            $`
      } else {
        this.question = `
        $${texNombre(b / 10 + c / 100, 2)}+${texNombre(f / 10 + g / 100, 2)}+${texNombre(1 - b / 10 - c / 100, 2)}=$`

        this.correction = `$${texNombre(b / 10 + c / 100, 2)}+${texNombre(f / 10 + g / 100, 2)}+${texNombre(1 - b / 10 - c / 100, 2)}=
        \\underbrace{${texNombre(b / 10 + c / 100, 2)}+${texNombre(1 - b / 10 - c / 100, 2)}}_{=1}+${texNombre(f / 10 + g / 100, 2)}=${texNombre(this.reponse, 2)}$`
      }
    }
    if (choix === 3) {
      a = randint(1, 9)
      b = randint(1, 9)
      c = randint(1, 9)
      e = randint(1, 9)
      f = randint(1, 9, b)
      g = randint(1, 9)
      k = randint(2, 4)
      this.reponse = arrondi(k + f / 10 + g / 100, 2)
      if (choice([true, false])) {
        this.question = `
    $${texNombre(f / 10 + g / 100, 2)}+${texNombre(b / 10 + c / 100, 2)}+${texNombre(k - b / 10 - c / 100, 2)}=$`
        this.correction = `$${texNombre(f / 10 + g / 100, 2)}+${texNombre(b / 10 + c / 100, 2)}+${texNombre(1 - b / 10 - c / 100, 2)}=
        ${texNombre(f / 10 + g / 100, 2)}+\\underbrace{${texNombre(b / 10 + c / 100, 2)}+${texNombre(k - b / 10 - c / 100, 2)}}_{=${k}}=${texNombre(this.reponse, 2)}
            $`
      } else {
        this.question = `$${texNombre(b / 10 + c / 100, 2)}+${texNombre(f / 10 + g / 100, 2)}+${texNombre(k - b / 10 - c / 100, 2)}=$`

        this.correction = `$${texNombre(b / 10 + c / 100, 2)}+${texNombre(f / 10 + g / 100, 2)}+${texNombre(k - b / 10 - c / 100, 2)}=
        \\underbrace{${texNombre(b / 10 + c / 100, 2)}+${texNombre(k - b / 10 - c / 100, 2)}}_{=${k}}+${texNombre(f / 10 + g / 100, 2)}=${texNombre(this.reponse, 2)}$`
      }
    }
  }
}
