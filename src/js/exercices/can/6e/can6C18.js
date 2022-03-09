import { randint, texteEnCouleur, choice } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Utiliser la division euclidienne'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDeModifImportante = '04/12/2021'
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
    let a, b, c, d, q, r
    if (choice([true, false])) {
      a = randint(7, 9)
      b = randint(1, a - 1)
      d = randint(5, 9)
      c = d * a + b
      this.reponse = c % a
      this.question = `Je possède $${c}$ bonbons et je fabrique des sacs de $${a}$ bonbons.<br>
     Une fois mes sacs complétés, combien me restera-t-il de bonbons ?`
      if (b === 1) { this.correction = `Il me restera $${b}$ bonbon.` } else { this.correction = `Il me restera $${b}$ bonbons.` }
      this.correction += texteEnCouleur(`
    <br> Mentalement : <br>
    On cherche un multiple de $${a}$ inférieur à $${c}$ (mais le plus grand possible).
     C'est $${c - c % a}$. <br> `)
      if (b === 1) {
        this.correction += texteEnCouleur(`
     Comme $${c}=${c - c % a} + ${b}$, donc il me restera $${b}$ bonbon.<br>
     Remarque : je pourrai faire $${(c - c % a) / a}$ sacs complets.
     `)
      } else {
        this.correction += texteEnCouleur(`
     Comme $${c}=${c - c % a} + ${b}$, donc il me restera $${b}$ bonbons.<br>
     Remarque : je pourrai faire $${(c - c % a) / a}$ sacs complets.
     `)
      }
    } else {
      q = randint(11, 15)
      b = randint(8, 11)
      r = randint(1, b - 1)
      a = b * q + r
      this.question = `   En utilisant l'égalité $${a}=${b}\\times ${q}+${r}$, donner le reste de la division euclidienne de $${a}$ par $${b}$.`
      this.correction = `Puisque $${r}$ est strictement inférieur à $${b}$, le reste est $${r}$.`
      this.reponse = r
    }
  }
}
