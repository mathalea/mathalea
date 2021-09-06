import { calcul, randint, texNombrec } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Complément à 1 Niveau 2'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/*!
 * @author Jean-Claude Lhote & Gilles Mora
 * Créé pendant l'été 2021
 * Référence can6C21
 */
export default function ComplementAUn () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.interactif = true
  this.typeExercice = 'simple'

  this.nouvelleVersion = function () {
    const a = calcul(randint(1, 9) / 10 + randint(1, 9) / 100)
    this.question = `$1-${texNombrec(a)}=$`
    this.correction = `$1-${texNombrec(a)}=${texNombrec(1 - a)}$`
    this.reponse = calcul(1 - a)
  }
}
