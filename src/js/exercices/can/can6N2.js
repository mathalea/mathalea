import Fraction from '../../modules/Fraction'
import { randint } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Fraction comme facteur manquant'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

export default function FractionCommeFacteurManquant () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.formatInteractif = 'fractionEgale'
  this.consigne = ''

  this.nouvelleVersion = function () {
    const a = randint(2, 25)
    const b = randint(2, 25, a)
    const c = new Fraction(a, b)
    this.reponse = c
    this.question = `Quel est le nombre qui, multiplié par ${b} donne ${a} ?`
    this.correction = `c'est $${c.texFraction}$ car $${c.texFraction}\\times ${b} = ${a}$`
  }
}
