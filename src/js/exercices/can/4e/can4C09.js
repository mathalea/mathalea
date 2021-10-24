import Exercice from '../../Exercice.js'
import { randint } from '../../../modules/outils.js'
export const titre = 'Puissances de 2, 3, 4 ou 5'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
 * Calcul de puissances
 * @author Gilles Mora
 * Publié le 22/10/2021
 * Référence can4C09
*/
export default function PuissancesDe2345 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(2, 10)
    let b
    switch (a) {
      case 2:
        b = randint(1, 6)
        break
      case 3:
        b = randint(1, 4)
        break
      case 4:
        b = randint(1, 3)
        break
      case 5:
        b = randint(1, 2)
        break
      case 6:
        b = randint(1, 2)
        break
      case 7:
        b = randint(1, 2)
        break
      case 8:
        b = randint(1, 2)
        break
      case 9:
        b = randint(1, 2)
        break
      case 10:
        b = randint(1, 2)
        break
    }
    this.question = `$${a}^${b}=$`
    this.correction = `$${a}^${b}=`
    this.correction += `${a}`
    if (b > 1) {
      for (let i = 1; i < b; i++) {
        this.correction += `\\times${a}`
      }
      this.correction += `=${a ** b}$`
    } else {
      this.correction += '$'
    }
    this.reponse = a ** b
  }
}
