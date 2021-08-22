import { randint, texFraction } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Équation ax=b'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

export default function EquationAXEgalB () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true

  this.nouvelleVersion = function () {
    const a = randint(-9, 9, [0, -1, 1]) // b peut être négatif, ça sera une équation du type x-b=c
    this.reponse = randint(-9, 9, [-1, 0, 1])
    const b = a * this.reponse
    this.question = `Résoudre $${a}x=${b}$<br>`
    this.correction = `$x=${texFraction(b, a)}=${this.reponse}$`
  }
}
