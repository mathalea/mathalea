import { calcul, choice, randint, texNombre } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Double ou triple (décimal)'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

export default function DoubleOuTripleDecimal () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.nouvelleVersion = function () {
    const a = randint(1, 3)
    const b = randint(1, 9, a)
    const d = randint(1, 9)
    const c = calcul(a * 10 + b + d * 0.1)
    if (choice([true, false])) {
      this.reponse = calcul(3 * c)
      this.question = `Quel est le triple de $${texNombre(c)}$ ?`
      this.correction = `Le triple de $${texNombre(c)}$ est $3 \\times ${texNombre(c)}=${calcul(3 * c)}$.`
    } else {
      this.reponse = calcul(2 * c)
      this.question = `Quel est le double de $${texNombre(c)}$ ?`
      this.correction = `Le double de $${texNombre(c)}$ est $2 \\times ${texNombre(c)}=${calcul(2 * c)}$.`
    }
  }
}
