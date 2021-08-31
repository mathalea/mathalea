import { calcul, randint } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Appliquer un pourcentage'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 */
export default function AppliquerUnPourcentage () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true

  this.nouvelleVersion = function () {
    const a = randint(2, 9) * 10
    const b = randint(2, 9, a) * 10
    this.reponse = calcul(a * b / 100)
    this.question = `$${a}\\%$ de $${b}$`
    this.correction = `$${a}\\%$ de $${b} = ${this.reponse}$`
  }
}
