import { randint, texFraction } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Équation ax=b'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
  * Créé pendant l'été 2021
 * Référence can3L01
*/
export default function EquationAXEgalB () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.interactif = true
  this.formatChampTexte = 'largeur15 inline'
  this.nbQuestions = 1
  this.nouvelleVersion = function () {
    const a = randint(-9, 9, [0, -1, 1]) // b peut être négatif, ça sera une équation du type x-b=c
    this.reponse = randint(-9, 9, [-1, 0, 1])
    const b = a * this.reponse
    this.question = `Donner la solution de l'équtaion  $${a}x=${b}$`
    this.correction = `On cherche le nombre qui multiplié par $${a}$ donne $${b}$.<br>
    Il s'agit de  $x=${texFraction(b, a)}=${this.reponse}$`
  }
}
