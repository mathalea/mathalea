import { randint } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Complément à 100'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote & Gilles Mora
 */
export default function ComplementACent () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.interactif = true
  this.typeExercice = 'simple'

  this.nouvelleVersion = function () {
    const a = randint(8, 15)
    this.question = `$100-${a}=$`
    this.correction = `$100-${a}=${100 - a}$`
    this.reponse = 100 - a
  }
}
