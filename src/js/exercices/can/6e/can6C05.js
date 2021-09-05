import { calcul, choice, randint, texNombre } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Multiplier astucieusement'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6C05
 */
export default function MultiplierAstucieusement () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.nouvelleVersion = function () {
    const a = randint(1, 9)
    const b = randint(1, 9, a)
    const c = randint(1, 9, [a, b])
    const d = calcul(a + b * 0.1 + c * 0.01)
    this.reponse = calcul(100 * d)
    switch (choice([1, 2, 3, 4])) {
      case 1:
        this.question = `$4 \\times ${texNombre(d)}\\times 25$`
        this.correction = `$4 \\times ${texNombre(d)}\\times 25 = 100 \\times ${texNombre(d)} = ${calcul(100 * d)}$`
        break
      case 2:
        this.question = `$2 \\times ${texNombre(d)}\\times 50$`
        this.correction = `$2 \\times ${texNombre(d)}\\times 50 = 100 \\times ${texNombre(d)} = ${calcul(100 * d)}$`
        break
      case 3:
        this.question = `$25 \\times ${texNombre(d)}\\times 4$`
        this.correction = `$25 \\times ${texNombre(d)}\\times 4 = 100 \\times ${texNombre(d)} = ${calcul(100 * d)}$`
        break
      case 4:
        this.question = `$50 \\times ${texNombre(d)}\\times 2$`
        this.correction = `$50 \\times ${texNombre(d)}\\times 2 = 100 \\times ${texNombre(d)} = ${calcul(100 * d)}$`
        break
    }
  }
}
