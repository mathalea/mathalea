import { obtenirListeFractionsIrreductibles } from '../../../modules/fractions'
import { calcul, choice } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Fraction d’entier qui va bien'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 */
export default function FractionDEntierQuiVaBien () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.formatChampTexte = 'largeur25 inline'
  this.formatInteractif = 'calcul'
  this.nouvelleVersion = function () {
    const a = choice(obtenirListeFractionsIrreductibles())
    const c = choice([2, 3, 4, 5, 6])
    const b = a.den * c
    this.question = `$${a.texFraction}\\times ${b}$`
    this.correction = `$${a.texFraction}\\times ${b}=${a.num}\\times \\dfrac{${b}}{${a.den}}=${a.num}\\times ${c}=${a.num * c}$`
    this.reponse = calcul(a.num * c)
  }
}
