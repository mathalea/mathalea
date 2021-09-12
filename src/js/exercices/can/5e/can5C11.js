import { randint } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Différence négative'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote & Gilles Mora
 * Créé pendant l'été 2021
 * Référence can5C11
 */
export default function DifferenceNegative () {
  Exercice.call(this)
  this.nbQuestions = 1
    this.typeExercice = 'simple'

  this.nouvelleVersion = function () {
    const a = randint(8, 15)
    const b = randint(18, 30)
    this.question = `$${a}-${b}=$`
    this.correction = `$${a}-${b}=${a - b}$`
    this.reponse = a - b
  }
}
