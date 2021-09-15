import { calcul, randint } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Addition à trou'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6C03
 */
export default function AdditionATrou () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
    this.nouvelleVersion = function () {
    const a = randint(5, 9)
    const b = randint(6, 9)
    const c = randint(1, 5)
    const d = randint(1, 4)
    this.reponse = d * 10 + b
    this.question = `$${c * 10 + a} + \\dots = ${calcul((c + d) * 10 + b + a)}$`
    this.correction = `$${calcul((c + d) * 10 + b + a)} - ${c * 10 + a} = ${this.reponse}$`
  }
}
