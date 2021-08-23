import { choice, randint } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Quart ou Tiers'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

export default function QuartOuTiers () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.nouvelleVersion = function () {
    const a = randint(5, 15)
    let b
    if (choice([true, false])) {
      b = a * 8
      this.reponse = a * 2
      this.question = `Quel est le quart de $${b}$ ?`
      this.correction = `Le quart de $${b}$ est $${a * 2}.$`
    } else {
      b = a * 6
      this.reponse = a * 2
      this.question = `Quel est le tiers de $${b}$ ?`
      this.correction = `Le tiers de $${b}$ est $${a * 2}.$`
    }
  }
}
