import { fraction } from '../../modules/fractions'
import { obtenirListeFractionsIrreductibles, choice, simplificationDeFractionAvecEtapes } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Fraction irréductible'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 */
export default function FractionIrreductible () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.formatChampTexte = 'largeur25'
  this.formatInteractif = 'fraction'
  this.nouvelleVersion = function () {
    const maFraction = choice(obtenirListeFractionsIrreductibles())
    const k = choice([4, 6, 8, 12, 15, 20])
    const a = k * maFraction[0]
    const b = k * maFraction[1]
    this.reponse = fraction(maFraction[0], maFraction[1])
    this.question = `Rends la fraction $\\dfrac{${a}}{${b}}$ irréductible.`
    this.correction = `$\\dfrac{${a}}{${b}}` + simplificationDeFractionAvecEtapes(a, b) + '$'
  }
}
