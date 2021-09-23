import { calcul, randint, texNombre } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Recomposer entier'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6N01
 */
export default function RecomposerEntier () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.nouvelleVersion = function () {
    const a = randint(1, 3)
    const b = randint(1, 9, a)
    const c = randint(1, 9, [a, b])
    this.reponse = calcul(a * 1000 + b * 10 + c * 100)
    this.question = `$${texNombre(a)}\\times 1000 + ${texNombre(b)}\\times 10 + ${texNombre(c)}\\times 100$`
    this.correction = `$${texNombre(a)}\\times 1000 + ${texNombre(b)}\\times 10 + ${texNombre(c)}\\times 100 =${texNombre(this.reponse)}$`
  }
}
