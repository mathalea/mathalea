import { calcul, randint } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Reste en minutes'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote & Gilles Mora
 */
export default function ResteEnMinutes () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.interactif = true
  this.typeExercice = 'simple'

  this.nouvelleVersion = function () {
    const a = randint(1, 2)
    const b = randint(10, 59)
    const d = calcul(a * 60 + b)
    this.question = ` $${d}$ minutes $=$  $a$ heure(s) et  $b$ minute(s).<br>
    Quelle est la valeur de $b$ ?`
    this.correction = `$${d} = ${a} \\times 60 + ${b}$ donc $${d}$ minutes = ${a}h ${b}min, donc $b=${b}}$.`
    this.reponse = b
  }
}
