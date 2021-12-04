import { randint, texteEnCouleur } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Trouver le reste d’une division euclidienne'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6C18
 */
export default function ResteDivisionEuclidienne () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 1
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(7, 9)
    const b = randint(1, a - 1)
    const d = randint(5, 9)
    const c = d * a + b
    this.reponse = c % a
    this.question = `Je possède $${c}$ bonbons et je fabrique des sacs de $${a}$ bonbons.<br>
     Une fois mes sacs complétés, combien me restera-t-il de bonbons ?`
    this.correction = `Il me restera $${b}$ bonbons.`
    this.correction += texteEnCouleur(`
    <br> Mentalement : <br>
    On cherche un multiple de $${a}$ inférieur à $${c}$ (mais le plus grand possible).
     C'est $${c - c % a}$. <br>
     Comme $${c}=${c - c % a} + ${b}$, donc il me restera $${b}$ bonbons.<br>
     Remarque : je pourrais faire $${(c - c % a) / a}$ sacs complets.
     `)
  }
}
