import { ecritureAlgebrique, randint } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Équation ax+b=c'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

export default function EquationAXPlusBEgalC () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true

  this.nouvelleVersion = function () {
    const a = randint(-5, 5, [0, -1, 1])
    this.reponse = randint(-9, 9, [-1, 0, 1])
    const c = randint(-9, 9, [0])
    const b = c - a * this.reponse
    this.question = `Résoudre $${a}x${ecritureAlgebrique(b)}=${c}$<br>`
    this.correction = `$x=\\dfrac{${c}-${b}}{${a}}=${this.reponse}$`
  }
}
