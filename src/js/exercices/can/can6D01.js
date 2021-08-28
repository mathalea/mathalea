import { calcul, randint } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Conversion Heures minutes'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 */
export default function ConversionHeuresMinutes () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.nouvelleVersion = function () {
    const a = randint(2, 4)
    const b = randint(10, 59)
    const d = calcul(a * 60 + b)
    this.question = `Convertir $${a}$ heures ${b} minutes en minutes`
    this.correction = `$${a} \\times 60 + ${b}=${d}$ donc $${a}$h $${b}$min = $${d}$ minutes`
    this.reponse = d
  }
}
