import { randint } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Recomposition entier moins simple'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6N03
 */
export default function RecompoEntierMoinsSimple () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.nouvelleVersion = function () {
    const a = randint(20, 70)
    const b = randint(20, 70, a)
    this.reponse = a * 100 + b * 10
    this.question = `$${a}$ centaines et $${b}$ dizaines = ?`
    this.correction = `$${a} \\times 100 + ${b} \\times 10 = ${a * 100 + b * 10}$`
  }
}
