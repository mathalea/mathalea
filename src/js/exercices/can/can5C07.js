import { randint } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Priorité opératoire'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 */
export default function PrioriteOperatoire5e () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.interactif = true
  this.typeExercice = 'simple'

  this.nouvelleVersion = function () {
    const a = randint(5, 9)
    const b = 20 - a
    const c = randint(3, 9)
    this.reponse = b + a * c
    this.question = `$${b} + ${a} \\times ${c}$`
    this.correction = `$${b} + ${a} \\times ${c}= ${b} + ${a * c} = ${this.reponse}$`
  }
}
