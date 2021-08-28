import { choice, randint } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Reste de division euclidienne'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 */
export default function ResteDivision5e () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.interactif = true
  this.typeExercice = 'simple'

  this.nouvelleVersion = function () {
    const a = choice([25, 20, 50, 40, 15])
    const b = randint(5, a - 1)
    const c = randint(3, 9)
    const d = c * a + b
    this.question = `Quel est le reste de la division de ${d} par ${a} ?`
    this.correction = `$${d}=${a} \\times ${c} + ${b}$ avec $${b}<${a}$ donc le reste de la division de ${d} par ${a} est ${b}.`
    this.reponse = b
  }
}
