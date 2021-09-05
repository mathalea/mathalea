import { calcul, randint, texNombrec } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Double et moitié'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6C16
 */
export default function DoubleEtMoitie () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true

  this.nouvelleVersion = function () {
    const a = randint(1, 25) * 2 // variables aléatoires
    this.question = `Le double d'un nombre vaut ${2 * a}, combien vaut sa moitié ?<br>`
    this.correction = `Le nombre est ${a}, sa moitié est ${texNombrec(a / 2)}.`
    this.reponse = calcul(a / 2)
  }
}
