import { calcul, randint } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Produit de nombres entiers'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 */
export default function ProduitEntiers5e () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true

  this.nouvelleVersion = function () {
    const b = randint(5, 9)
    const a = randint(12, 19)
    this.reponse = calcul(a * b)
    this.question = `$${a} \\times ${b}$`
    this.correction = `$${a} \\times ${b}=${a * b}$`
  }
}
