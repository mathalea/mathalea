import { calcul, randint } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Somme de nombres entiers'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can5C02
 */
export default function SommeEntiers5e () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.interactif = true
  this.typeExercice = 'simple'

  this.nouvelleVersion = function () {
    const b = randint(50, 99)
    const a = randint(2, 50) + 100
    this.reponse = calcul(a + b)
    this.question = `$${a} + ${b}$`
    this.correction = `$${a} + ${b}=${a + b}$`
  }
}
