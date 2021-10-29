import { obtenirListeFractionsIrreductibles } from '../../../modules/fractions'
import { calcul, choice, texteEnCouleur } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Fraction d’entier qui va bien'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can5C12
 */
export default function FractionDEntierQuiVaBien () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur25 inline'
  this.nouvelleVersion = function () {
    const a = choice(obtenirListeFractionsIrreductibles())
    const c = choice([2, 3, 4, 5, 6])
    const b = a.den * c
    this.reponse = calcul(a.num * c)
    this.question = `$${a.texFraction}\\times ${b}$`
    if (a.num === 1) {
      this.correction = `$${a.texFraction}\\times ${b}=${a.num * c}$<br><br>`
      this.correction += `${texteEnCouleur('Mentalement :')}<br>`
      this.correction += `${texteEnCouleur('Pour multiplier $' + b + '$ par $' + a.texFraction + '$, on divise $' + b + '$ par $' + a.den + '$ : on obtient $\\dfrac{' + b + '}{' + a.den + '}=' + b / a.den + '$.')}<br>`
      this.correction += `${texteEnCouleur('Ainsi $' + a.texFraction + '\\times ' + b + ' = \\dfrac{' + b + '}{' + a.den + '}=' + a.num * c + '$.<br>')}`
    } else {
      this.correction = `$${a.texFraction}\\times ${b}=${a.num * c}$<br><br>`
      this.correction += `${texteEnCouleur('Mentalement :')}<br>`
      this.correction += `${texteEnCouleur('Pour multiplier $' + b + '$ par $' + a.texFraction + '$, on commence par diviser  $' + b + '$ par $' + a.den + '$ (car la division "tombe juste") : on obtient $\\dfrac{' + b + '}{' + a.den + '}=' + b / a.den + '$.')}<br>`
      this.correction += `${texteEnCouleur('Puis, on multiplie ce résultat par $' + a.num + '$, ce qui donne : $' + a.num + '\\times ' + b / a.den + '=' + a.num * c + '$.<br>')}`
    }
  }
}
