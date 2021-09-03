import { calcul, randint } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Somme de quatre entiers qui se marient'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 */
export default function FSomme4EntiersQuiSeMarient () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true

  this.nouvelleVersion = function () {
    const a = randint(1, 9)
    const b = randint(1, 9, a)
    const c = randint(3, 7) * 10
    const d = randint(10, 15) * 10 - c
    this.consigne = 'Calculer.'
    this.reponse = calcul(2 * (c + d))
    this.question = `$${c - a} + ${d + b} + ${c + a} + ${d - b}$`
    this.correction = `$${c - a} + ${c + a} + ${d + b}  + ${d - b} = ${2 * c} + ${2 * d}= ${2 * (c + d)}$`
  }
}
