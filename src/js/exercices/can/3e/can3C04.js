import { fraction } from '../../../modules/fractions.js'
import { obtenirListeFractionsIrreductibles, choice, texFraction, randint } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Calculer une somme entre fraction et entier'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
  * Créé pendant l'été 2021
 * Référence can3C04
*/
export const uuid = '1853b'
export const ref = 'can3C04'
export default function SommeEntierEtFractionIrred () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.formatInteractif = 'fraction'
  this.nouvelleVersion = function () {
    const maFraction = choice(obtenirListeFractionsIrreductibles())
    const a = randint(1, 4)
    const b = maFraction[0]
    const c = maFraction[1]
    const d = fraction(a * c + b, c).simplifie()
    this.reponse = d
    this.question = `Calculer sous la forme d'une fraction irréductible :  $${a}+${texFraction(b, c)}$.`
    this.correction = `$${a}+${texFraction(b, c)} = \\dfrac{${a} \\times ${c}}{${c}} + \\dfrac{${b}}{${c}} = \\dfrac{${a * c}}{${c}} + \\dfrac{${b}}{${c}}  =${d.texFraction}$`
    this.canEnonce = this.question// 'Compléter'
    this.canReponseACompleter = ''
  }
}
