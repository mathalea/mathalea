import { fraction, obtenirListeFractionsIrreductibles } from '../../../modules/fractions'
import { choice } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Opposé de fraction'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can4C02
 */
export default function OpposeDeFraction () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
    this.formatChampTexte = 'largeur25 inline'
  this.formatInteractif = 'fractionEgale'
  this.nouvelleVersion = function () {
    const a = choice(obtenirListeFractionsIrreductibles())
    const b = a.num * choice([-1, 1])
    const c = a.den
    const d = fraction(b, c)
    if (choice([true, false])) {
      this.question = `L'opposé de $\\dfrac{${b}}{${c}}$`
      this.correction = `L'opposé de $\\dfrac{${b}}{${c}}$ est ${d.texFraction}`
    } else {
      this.question = `L'opposé de $-\\dfrac{${-b}}{${c}}$`
      this.correction = `L'opposé de $-\\dfrac{${-b}}{${c}}$ est ${d.texFraction}`
    }
    this.reponse = d.oppose()
  }
}
