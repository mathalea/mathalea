import { fraction } from '../../../modules/fractions'
import { obtenirListeFractionsIrreductibles, choice, texFraction, randint } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Somme Entier et fraction à réduire'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 */
export default function SommeEntierEtFractionIrred () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.formatChampTexte = 'largeur25'
  this.formatInteractif = 'fraction'
  this.nouvelleVersion = function () {
    const maFraction = choice(obtenirListeFractionsIrreductibles())
    const a = randint(1, 4)
    const b = maFraction[0]
    const c = maFraction[1]
    const d = fraction(a * c + b, c).simplifie()
    this.reponse = d
    this.question = `Calculer sous la forme d'une fraction irréductible :  $${a}+${texFraction(b, c)}$`
    this.correction = `$${a}+${texFraction(b, c)} = \\dfrac{${a} \\times ${c}}{${c}} + \\dfrac{${b}}{${c}} =${d.texFraction}$`
  }
}
