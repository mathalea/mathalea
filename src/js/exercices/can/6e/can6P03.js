import { calcul, randint, texNombrec } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Question de vitesse'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 */
export default function QuestionDeVitesse () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true

  this.nouvelleVersion = function () {
    const a = randint(3, 6) * 20
    const b = randint(1, 6)
    this.reponse = calcul(a * (b + 0.5))
    this.question = `Une voiture roule à une vitesse constante de ${a} km/h. Combien de kilomètres parcourt-elle en ${b} h et 30 min ?`
    this.correction = `$${a}\\times ${texNombrec(b + 0.5)} = ${this.reponse}$`
  }
}
