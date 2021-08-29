import { calcul, randint } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Nombre pair multiplié par 5'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 */
export default function NombrePairFois5 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.nouvelleVersion = function () {
    const a = randint(11, 24) * 2
    this.reponse = calcul(a * 5)
    this.question = `$${a}\\times 5$`
    this.correction = `$${a}\\times 5 = ${a} \\div 2 \\times 10 = ${calcul(a / 2)}\\times 10 =${this.reponse}$`
  }
}
