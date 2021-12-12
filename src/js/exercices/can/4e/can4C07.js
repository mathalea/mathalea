import { fraction, obtenirListeFractionsIrreductibles } from '../../../modules/fractions'
import { choice, simplificationDeFractionAvecEtapes } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Calculer la différence de fractions à dénominateurs compatibles'
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
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.formatInteractif = 'fractionEgale'
  this.nouvelleVersion = function () {
    const a = choice(obtenirListeFractionsIrreductibles())
    const c = choice([2, 3])
    const b = fraction(1, a.den * c)
    this.question = `$${a.texFraction} - ${b.texFraction}=$`
    this.correction = `Pour soustraire des fractions, on les met au même dénominateur.<br>
    <br>
    Pour écrire $${a.texFraction}$ avec le même dénominateur que $${b.texFraction}$, 
    on multiplie son numérateur et son dénominateur par $${c}$.<br><br>
    Ainsi,
    $${a.texFraction} - ${b.texFraction}=
   \\dfrac{${a.num}\\times ${c}}{${a.den}\\times ${c}}- ${b.texFraction}
    =${a.fractionEgale(c).texFraction} - ${b.texFraction}=\\dfrac{${a.num * c}-${b.num}}{${b.den}}=\\dfrac{${a.num * c - b.num}}{${b.den}}${simplificationDeFractionAvecEtapes(a.num * c - b.num, b.den)}$`
    this.reponse = a.differenceFraction(b).simplifie()
  }
}
