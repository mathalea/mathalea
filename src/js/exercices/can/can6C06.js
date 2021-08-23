import { calcul, randint } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Division par 9'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

export default function DivisionPar9 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.nouvelleVersion = function () {
    const b = randint(5, 9)
    const a = calcul(b * 90 + 9)
    this.reponse = b * 10 + 1
    this.question = `$${a}\\div 9$`
    this.correction = `$${a}\\div 9 = ${this.reponse}$`
  }
}
