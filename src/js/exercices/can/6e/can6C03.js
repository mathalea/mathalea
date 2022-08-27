import { calcul, randint, texteEnCouleur } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Rechercher un terme dans une somme'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6C03
 */
export const uuid = '2e274'
export const ref = 'can6C03'
export default function AdditionATrou () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(5, 9)
    const b = randint(6, 9)
    const c = randint(1, 5)
    const d = randint(1, 4)
    this.reponse = d * 10 + b
    this.question = `$${c * 10 + a} + \\dots = ${calcul((c + d) * 10 + b + a)}$`
    this.correction = `On obtient le nombre cherché par la différence : $${calcul((c + d) * 10 + b + a)} - ${c * 10 + a} = ${this.reponse}$`
    this.correction += texteEnCouleur(`<br> Mentalement : <br>
    On complète $${c * 10 + a}$ jusqu'à la dizaine la plus proche en ajoutant $${(c + 1) * 10 - (c * 10 + a)}$, on obtient $${(c + 1) * 10}$,
    puis de $${(c + 1) * 10}$ à $${(c + d) * 10 + b + a}$, on ajoute encore $${(c + d) * 10 + b + a - (c + 1) * 10}$. <br>
    Au total 
    on a donc ajouté $${(c + 1) * 10 - (c * 10 + a)}$ et  $${(c + d) * 10 + b + a - (c + 1) * 10}$ ce qui donne la réponse $${this.reponse}$.<br>
      `)
  }
}
