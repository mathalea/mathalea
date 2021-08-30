import { calcul, randint } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Triple et moitié'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 */
export default function TripleEtMoitie () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.interactif = true
  this.typeExercice = 'simple'

  this.nouvelleVersion = function () {
    const a = randint(5, 25)
    this.question = `Le triple d'un nombre vaut ${3 * a}, combien vaut sa moitié ?`
    this.correction = `Le nombre est ${a}, sa moitié est ${calcul(a / 2)}.`
    this.reponse = calcul(a / 2)
  }
}
