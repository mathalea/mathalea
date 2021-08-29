import { randint } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Quart entier'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 */
export default function QuartEntier () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.interactif = true
  this.typeExercice = 'simple'

  this.nouvelleVersion = function () {
    const a = randint(5, 15)
    const b = a * 8
    this.reponse = a * 2
    this.question = `Quel est le quart de $${b}$ ?`
    this.correction = `Le quart de $${b}$ est $${this.reponse}.$`
  }
}
