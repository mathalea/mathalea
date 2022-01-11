import { obtenirListeFractionsIrreductibles } from '../../../modules/fractions'
import { calcul, choice, texteEnCouleur } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Calculer la fraction d’entier'
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
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur25 inline'
  this.nouvelleVersion = function () {
    const a = choice(obtenirListeFractionsIrreductibles())
    const c = choice([2, 3, 4, 5, 6])
    const b = a.d * c
    this.reponse = calcul(a.n * c)
    this.question = `$${a.texFraction}\\times ${b}$`
    if (a.n === 1) {
      this.correction = `$${a.texFraction}\\times ${b}=${a.n * c}$<br><br>`
      this.correction += `${texteEnCouleur('Mentalement :')}<br>`
      this.correction += `${texteEnCouleur('Pour multiplier $' + b + '$ par $' + a.texFraction + '$, on divise $' + b + '$ par $' + a.d + '$ : on obtient $\\dfrac{' + b + '}{' + a.d + '}=' + b / a.d + '$.')}<br>`
      this.correction += `${texteEnCouleur('Ainsi $' + a.texFraction + '\\times ' + b + ' = \\dfrac{' + b + '}{' + a.d + '}=' + a.n * c + '$.<br>')}`
    } else {
      this.correction = `$${a.texFraction}\\times ${b}=${a.n * c}$<br><br>`
      this.correction += `${texteEnCouleur('Mentalement :')}<br>`
      this.correction += `${texteEnCouleur('Pour multiplier $' + b + '$ par $' + a.texFraction + '$, on commence par diviser  $' + b + '$ par $' + a.d + '$ (car la division "tombe juste") : on obtient $\\dfrac{' + b + '}{' + a.d + '}=' + b / a.d + '$.')}<br>`
      this.correction += `${texteEnCouleur('Puis, on multiplie ce résultat par $' + a.n + '$, ce qui donne : $' + a.n + '\\times ' + b / a.d + '=' + a.n * c + '$.<br>')}`
    }
  }
}
