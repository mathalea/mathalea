import { calcul, randint } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Différence de nombres entiers'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can5C03
 */
export default function DifferenceEntiers5e () {
  Exercice.call(this)
  this.nbQuestions = 1
    this.typeExercice = 'simple'

  this.nouvelleVersion = function () {
    const b = randint(50, 99)
    const a = randint(2, 50) + 100
    this.reponse = calcul(a - b)
    this.question = `$${a} - ${b}$`
    this.correction = `$${a} - ${b}=${a - b}$`
  }
}
