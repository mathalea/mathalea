import { ecritureAlgebrique, randint, texFraction } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Équation ax+b=0'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

export default function EquationAXPlusBEgalZero () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true

  this.nouvelleVersion = function () {
    const a = randint(-5, 5, [0, -1, 1])
    this.reponse = randint(-9, 9, [-1, 0, 1])
    const b = -a * this.reponse
    this.question = `Résoudre $${a}x${ecritureAlgebrique(b)}=0$`
    this.correction = `$x=${texFraction(-b, a)}=${this.reponse}$`
  }
}
