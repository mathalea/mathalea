import { calcul, randint } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Reste de division par 3'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6C07
 */
export default function ResteDivisionPar3 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
    this.nouvelleVersion = function () {
    const b = randint(1, 9)
    const c = randint(0, 9)
    const d = randint(0, 9, [b, c])
    const a = calcul(b * 100 + c * 10 + d)
    this.reponse = a % 3
    this.question = `Quel est le reste de la division de $${a}$ par $3$ ?`
    this.correction = `Le reste de la division de $${a}$ par $3$ est ${a % 3}.`
  }
}
