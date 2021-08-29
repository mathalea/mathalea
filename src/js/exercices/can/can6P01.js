import { calcul, randint, texNombre, texNombrec } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Proportionnalité simple'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 */
export default function ProportionnaliteSimple () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
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
    const a = randint(0, 7)
    const b = fruits[a][1]
    const c = randint(fruits[a][2], fruits[a][3])
    this.reponse = calcul(c / 5 * b)
    this.question = `$${texNombrec(c / 10)}$ kg de ${fruits[a][0]} coûtent $${texNombrec(c / 10 * b)}$ €, combien coûtent $${texNombrec(c / 5)}$ kg de ${fruits[a][0]} ?`
    this.correction = `$${texNombrec(c / 10 * b)} \\times 2 = ${texNombre(this.reponse)}$`
  }
}
