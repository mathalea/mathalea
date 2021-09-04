import { fraction, obtenirListeFractionsIrreductibles } from '../../../modules/fractions'
import { calcul, choice } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Quotient d’entier qui va bien par fraction'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 */
export default function QuotientEntierQuiVaBienParFraction () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.formatChampTexte = 'largeur25 inline'
  this.formatInteractif = 'calcul'
  this.nouvelleVersion = function () {
    const a = choice(obtenirListeFractionsIrreductibles())
    const c = choice([2, 3, 4, 5, 6])
    const b = a.num * c
    this.question = `$${b}\\div ${a.texFraction}$`
    this.correction = `$${b}\\div ${a.texFraction}=${b}\\times ${a.inverse().texFraction}=\\dfrac{${b}}{${a.num}}\\times ${a.den}=${c}\\times ${a.den}=${c * a.den}$`
    this.reponse = calcul(a.den * c)
  }
}
