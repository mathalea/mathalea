import { calcul, choice, randint, texNombrec } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Complément à 1'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote & Gilles Mora
 */
export default function ComplementAUn () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.interactif = true
  this.typeExercice = 'simple'

  this.nouvelleVersion = function () {
    const a = choice([true, false]) ? calcul(randint(2, 9) / 100) : calcul(randint(2, 9) / 10)
    this.question = `$1-${texNombrec(a)}=$`
    this.correction = `$1-${texNombrec(a)}=${texNombrec(1 - a)}$`
    this.reponse = calcul(1 - a)
  }
}
