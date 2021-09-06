import { fraction, obtenirListeFractionsIrreductibles } from '../../../modules/fractions'
import { choice, randint, simplificationDeFractionAvecEtapes } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Différence de fractions à dénominateurs compatibles'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can4C07
 */
export default function DifferenceFractionsCompatibles () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.formatChampTexte = 'largeur25 inline'
  this.formatInteractif = 'fraction'
  this.nouvelleVersion = function () {
    const a = choice(obtenirListeFractionsIrreductibles())
    const c = choice([2, 3])
    const b = fraction(randint(2, 6), a.den * c)
    this.question = `$${a.texFraction} - ${b.texFraction}$`
    this.correction = `$${a.texFraction} - ${b.texFraction}=${a.fractionEgale(c).texFraction} - ${b.texFraction}=\\dfrac{${a.num * c}-${b.num}}{${b.den}}=\\dfrac{${a.num * c - b.num}}{${b.den}}${simplificationDeFractionAvecEtapes(a.num * c - b.num, b.den)}$`
    this.reponse = a.differenceFraction(b).simplifie()
  }
}
