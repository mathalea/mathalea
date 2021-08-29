import { calcul, choice, randint, texPrix } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Proportionnalité compliquée'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 */
export default function ProportionnaliteCompliquee () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.consigne = ''
  const fruits = [
    ['pêches', 4, 10, 30],
    ['Noix', 5, 4, 13],
    ['cerises', 6, 11, 20],
    ['pommes', 2, 20, 40],
    ['framboises', 15, 1, 5],
    ['fraises', 7, 5, 10],
    ['citrons', 1.5, 15, 30],
    ['bananes', 1.5, 15, 25]
  ]

  this.nouvelleVersion = function () {
    const a = randint(0, 7) // index du fruit
    const b = calcul(fruits[a][1] * (1 + choice([-1, 1]) * randint(1, 3) * 0.1)) // prix au kg
    const c = Math.round(randint(fruits[a][2], fruits[a][3] / 10)) // nombre de kg première valeur
    const d = randint(3, 6) // nombre de kg supplémentaires
    this.reponse = calcul(d * b)
    this.question = `$${c}$ kg de ${fruits[a][0]} coûtent $${texPrix(c * b)}$ €.<br> $${c + d}$ kg de ces mêmes ${fruits[a][0]} coûtent $${texPrix((c + d) * b)}$ €.<br>Combien coûtent ${d} kg de ces ${fruits[a][0]} ?`
    this.correction = `$${texPrix((c + d) * b)} € - ${texPrix(c * b)} € =${texPrix(this.reponse)} €$`
  }
}
