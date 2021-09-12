import { prenomM, randint } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Calcul de durée en minutes'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote & Gilles Mora
 * Créé pendant l'été 2021
 * Référence can6D03
 */
export default function CalculDureeMinutes () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.typeExercice = 'simple'

  this.nouvelleVersion = function () {
    const a = randint(13, 15)
    const b = a + 1
    const c = randint(1, 4) * 10
    const d = randint(10, 58)
    this.reponse = b * 60 + d - (a * 60 + c)
    this.question = `${prenomM()} est parti à  ${a}h${c} de son domicile. Il est arrivé à ${b}h${d}.<br>
    Combien de temps (en minutes) à duré son trajet ?`
    this.correction = `${b}h${d}-${a}h${c}=${this.reponse} min`
  }
}
