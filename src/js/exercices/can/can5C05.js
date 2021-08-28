import { randint } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Quotient entier'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 */
export default function Division5e () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.interactif = true
  this.typeExercice = 'simple'

  this.nouvelleVersion = function () {
    const a = randint(11, 19)
    const b = randint(2, 8)
    const c = a * b
    this.reponse = a
    this.question = `$${c} \\div ${b}$`
    this.correction = `$${c} \\div ${b}=${a}$`
  }
}
