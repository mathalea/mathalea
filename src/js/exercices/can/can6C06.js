import { calcul, choice, randint } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Division par 9'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 */
export default function DivisionPar9 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.nouvelleVersion = function () {
    const b = randint(2, 9)
    let a
    switch (choice([1, 2, 3])) {
      case 1:
        a = b * 90 + 9
        break
      case 2:
        a = b * 900 + 9
        break
      case 3:
        a = b * 900 + 90
        break
    }
    this.reponse = calcul(a / 9)
    this.question = `$${a}\\div 9$`
    this.correction = `$${a}\\div 9 = ${this.reponse}$`
  }
}
