import { choice, randint, texteEnCouleur } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Trouver le reste d’une division euclidienne'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can5C06
 */
export default function ResteDivision5e () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.typeExercice = 'simple'
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = choice([25, 20, 50, 40, 15])
    const b = randint(5, a - 1)
    const c = randint(3, 9)
    const d = c * a + b
    this.question = `Quel est le reste de la division de $${d}$ par $${a}$ ?`
    this.correction = `$${d}=${a} \\times ${c} + ${b}$ avec $${b}<${a}$ donc le reste de la division de $${d}$ par $${a}$ est $${b}$.`
    this.correction += texteEnCouleur(`
    <br> Mentalement : <br>
    On cherche le plus grand multiple de $${a}$ inférieur à $${d}$. C'est $${a} \\times ${c}=${a * c}$.<br>
    Comme $${d}=${a * c}+${b}$, on en déduit que le reste de la division euclidienne de $${d}$ par $${a}$ est  $${b}$.
     `)
    this.reponse = b
  }
}
