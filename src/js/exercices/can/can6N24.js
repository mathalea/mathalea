import { randint } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Reste de la division euclidienne'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

export default function ResteDivisionEuclidienne () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true

  this.nouvelleVersion = function () {
    const a = randint(7, 9)
    const b = randint(1, a - 1)
    const d = randint(5, 9)
    const c = d * a + b
    this.reponse = c % a
    this.question = `Je possède ${c} bonbons et je fabrique des sacs de ${a} bonbons. Une fois mes sacs complétés, combien me restera-t-il de bonbons ?`
    this.correction = `$${c}=${d}\\times ${a} + ${b}$ , donc il me restera ${b} bonbons.`
  }
}
