import { calcul, randint, texNombrec } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Somme de nombres décimaux'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can5N01
 */
export default function SommeDecimale5e () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.typeExercice = 'simple'

  this.nouvelleVersion = function () {
    const a = randint(1, 9)
    const b = randint(1, 9, a)
    const c = randint(1, 9, [a, b])
    const d = randint(1, 9, [a, b, c])
    this.reponse = calcul(10 + (b + d) * 0.1 + c * 0.01)
    this.question = `$${texNombrec(a + b * 0.1 + c * 0.01)}+${texNombrec(10 - a + d * 0.1)}$`
    this.correction = `$${texNombrec(a + b * 0.1 + c * 0.01)}+${texNombrec(10 - a + d * 0.1)}=${texNombrec(10 + (b + d) * 0.1 + c * 0.01)}$`
  }
}
