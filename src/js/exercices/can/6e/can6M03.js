import { calcul, randint, texNombre } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Conversions en mètres'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote & Gilles Mora
 * Créé pendant l'été 2021
 * Référence can6M03
 */
export default function ConversionEnM () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  
  this.nouvelleVersion = function () {
    const a = randint(11, 24) * 10 + randint(0, 9)
    this.reponse = calcul(a / 100)
    this.question = `$${a}$ cm font combien de mètres ?`
    this.correction = `$${a} cm = ${texNombre(this.reponse)} m$`
  }
}
