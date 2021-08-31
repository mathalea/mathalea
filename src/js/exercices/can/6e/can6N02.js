import { randint } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Recomposition entier simple'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 */
export default function RecompoEntierSimple () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.nouvelleVersion = function () {
    const a = randint(20, 70)
    const b = randint(20, 70, a)
    this.reponse = a * 100 + b
    this.question = `$${a}$ centaines et $${b}$ unités = ?`
    this.correction = `$${a} \\times 100 + ${b} = ${a * 100 + b}$`
  }
}
