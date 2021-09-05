import { calcul, choice, randint, texNombre } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Valeurs décimales quarts et cinquièmes'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/*!
 * @author Jean-Claude Lhote & Gilles Mora
 * Créé pendant l'été 2021
 * Référence can6C22
 */
export default function ValeursDecimalesQuartCinquieme () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.interactif = true
  this.typeExercice = 'simple'

  this.nouvelleVersion = function () {
    const a = randint(1, 9, 5)
    const b = choice([1, 3, 5, 6, 7, 9, 11])
    if (choice([true, false])) {
      this.reponse = calcul(a / 5)
      this.question = `Donner la valeur décimale de  $\\dfrac{${a}}{5}$ :`
      this.correction = `$\\dfrac{${a}}{5}=${texNombre(this.reponse)}$`
    } else {
      this.reponse = calcul(b / 4)
      this.question = `Donner la valeur décimale de  $\\dfrac{${b}}{4}$ :`
      this.correction = `$\\dfrac{${b}}{4}=${texNombre(this.reponse)}$`
    }
  }
}
