import { randint, texteEnCouleur } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Déterminer le complément à 100'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote & Gilles Mora
 * Créé pendant l'été 2021
 * Référence can6C19
 */
export const uuid = 'd656b'
export const ref = 'can6C19'
export default function ComplementACent () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.typeExercice = 'simple'
  this.nouvelleVersion = function () {
    const a = randint(11, 49, [20, 30, 40])
    this.question = `$100-${a}=$`
    this.correction = `$100-${a}=${100 - a}$`
    this.reponse = 100 - a
    this.correction += texteEnCouleur(`
    <br> Mentalement : <br>
    On décompose $${a}$ en $${a - a % 10}+${a % 10}$. Retrancher $${a}$ revient à retrancher d'abord  $${a - a % 10}$  puis $${a % 10}$. <br>
    Ainsi, $100-${a}=\\underbrace{100-${a - a % 10}}_{${100 - (a - a % 10)}}-${a % 10}=${100 - (a - a % 10)}-${a % 10}=${100 - a}$.
     `)
  }
}
