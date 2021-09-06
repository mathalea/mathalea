import { randint } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Complément à 100'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote & Gilles Mora
 * Créé pendant l'été 2021
 * Référence can6C19
 */
export default function ComplementACent () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.interactif = true
  this.typeExercice = 'simple'

  this.nouvelleVersion = function () {
    const a = randint(11, 35)
    this.question = `$100-${a}=$`
    this.correction = `$100-${a}=${100 - a}$`
    this.reponse = 100 - a
  }
}
