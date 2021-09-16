import { calcul, randint } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Soustraire 10n+9'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6C09
 */
export default function SoustraireX9 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.nouvelleVersion = function () {
    const a = randint(5, 9)
    const b = randint(1, 8)
    const c = randint(1, 4)
    this.reponse = calcul(a * 10 + b - c * 10 - 9)
    this.question = `$${a * 10 + b} - ${c * 10 + 9}$`
    this.correction = `$${a * 10 + b} - ${c * 10 + 9}=${a * 10 + b}-${(c + 1) * 10} + 1 = ${this.reponse}$`
  }
}
