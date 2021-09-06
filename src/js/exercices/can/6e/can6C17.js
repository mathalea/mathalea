import { calcul, randint } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Fraction simple de quantité'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6C17
 */
export default function FractionSimpleDeQuantite () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true

  this.nouvelleVersion = function () {
    const a = randint(2, 6)
    this.reponse = calcul(randint(2, 9) * 10)
    const b = calcul(this.reponse * a)
    this.question = `$\\dfrac{1}{${a}} \\text{ de } ${b} \\text{ L} = \\dots \\text{ L}$`
    this.correction = `$\\dfrac{1}{${a}}$ de $${b}$ L = ${this.reponse} L`
  }
}
