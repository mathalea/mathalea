import { randint } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Différence négative'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote & Gilles Mora
 */
export default function DifferenceNegative () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.interactif = true
  this.typeExercice = 'simple'

  this.nouvelleVersion = function () {
    const a = randint(8, 15)
    const b = randint(18, 30)
    this.question = `$${a}-${b}=$`
    this.correction = `$${a}-${b}=${a - b}$`
    this.reponse = a - b
  }
}
