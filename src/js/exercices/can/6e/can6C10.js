import { randint } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Tables de x du 5 au 9'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6C10
 */
export default function Tables5A9 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.nouvelleVersion = function () {
    const a = randint(3, 9)
    const b = randint(5, 9)
    this.reponse = a * b
    this.question = `$${a} \\times ${b}$`
    this.correction = `$${a} \\times ${b}=${a * b}$`
  }
}
