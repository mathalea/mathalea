import { calcul, randint, texteEnCouleur } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Appliquer un pourcentage'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6P04
 */
export default function AppliquerUnPourcentage () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(2, 9) * 10
    const b = randint(2, 9, a) * 10
    this.reponse = calcul(a * b / 100)
    this.question = `$${a}\\%$ de $${b}=$`
    if (a === 50) {
      this.correction = `$50$ % de $${b}=${this.reponse}$.`
      this.correction += texteEnCouleur(`<br> Mentalement : <br>
      Prendre $50$ % d'une quantité revient à la diviser par $2$.<br>
      Ainsi, $${a}\\%$ de $${b} = ${b}\\div 2=${this.reponse}$.`)
    } else {
      this.correction = `$${a}\\%$ de $${b} = ${this.reponse}$`
      this.correction += texteEnCouleur(`<br> Mentalement : <br>
    Prendre $${a}$ % de $${b}$ revient à prendre $${a / 10}\\times 10$ % de $${b}$.<br>
    Comme $10$ % de $${b}$ vaut $${b / 10}$ (pour prendre $10$ % d'une quantité, on la divise par $10$), alors 
    $${a}\\%$ de $${b}=${a / 10}\\times ${b / 10}=${this.reponse}$.
   `)
    }
  }
}
