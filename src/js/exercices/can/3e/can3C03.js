import { fraction } from '../../../modules/fractions.js'
import { obtenirListeFractionsIrreductibles, choice, simplificationDeFractionAvecEtapes } from '../../../modules/outils'
import Exercice from '../../Exercice.js'
export const titre = 'Rendre irréductible une fraction'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
  * Créé pendant l'été 2021
 * Référence can3C03
*/
export default function FractionIrreductible () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.formatInteractif = 'fraction'
  this.nouvelleVersion = function () {
    const maFraction = choice(obtenirListeFractionsIrreductibles())
    const k = choice([4, 6, 8, 12, 15, 20])
    const a = k * maFraction[0]
    const b = k * maFraction[1]
    this.reponse = fraction(maFraction[0], maFraction[1])
    this.question = `Rendre la fraction $\\dfrac{${a}}{${b}}$ irréductible.`
    this.correction = `$\\dfrac{${a}}{${b}}` + simplificationDeFractionAvecEtapes(a, b) + '$'
  }
}
