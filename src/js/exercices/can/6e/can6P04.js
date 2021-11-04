import { calcul, choice, randint, texNombre, texteEnCouleur } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Appliquer un pourcentage'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6P04 Complété par des corrections de Gilles Mora
 */
export default function AppliquerUnPourcentage () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let a, b, p
    switch (choice([1, 2, 3])) {
      case 1:// prende 10%
        a = randint(2, 99)
        this.reponse = calcul(a / 10)
        this.question = `$10\\%$ de $${a}=$`
        this.correction = `$10\\%$ de $${a} = 0,1 \\times ${a}=${texNombre(this.reponse)}$`
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        Prendre $10\\%$  d'une quantité revient à la diviser par $10$.<br>
        Ainsi, $10\\%$ de $${a} = \\dfrac{${a}}{10}=${texNombre(this.reponse)}$.`)
        break

      case 2:// prendre  20%, 30%, 40%......
        a = randint(1, 9) * 10
        p = randint(2, 9, 5) * 10
        this.reponse = calcul(a * p / 100)
        this.question = `$${p}\\%$ de $${a}=$`
        this.correction = `$${p}\\%$ de $${a} = ${texNombre(this.reponse)}$`
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        Prendre $${p}\\%$  de $${a}$ revient à prendre $${p / 10}\\times 10\\%$  de $${a}$.<br>
        Comme $10\\%$  de $${a}$ vaut $${a / 10}$ (pour prendre $10\\%$  d'une quantité, on la divise par $10$), alors 
        $${p}\\%$ de $${a}=${p / 10}\\times ${a / 10}=${this.reponse}$.
       `)
        break
      case 3:
        a = randint(2, 9) * 10
        b = randint(2, 9, a) * 10
        this.reponse = calcul(a * b / 100)
        this.question = `$${a}\\%$ de $${b}=$`
        if (a === 50) {
          this.correction = `$50\\%$  de $${b} = ${this.reponse}$.`
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
            Prendre $50\\%$  d'une quantité revient à la diviser par $2$.<br>
            Ainsi, $${a}\\%$ de $${b} = ${b}\\div 2=${this.reponse}$.`)
        } else {
          this.correction = `$${a}\\%$ de $${b} = ${this.reponse}$`
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
          Prendre $${a}\\%$  de $${b}$ revient à prendre $${a / 10}\\times 10\\%$  de $${b}$.<br>
          Comme $10\\%$  de $${b}$ vaut $${b / 10}$ (pour prendre $10\\%$ d'une quantité, on la divise par $10$), alors 
          $${a}\\%$ de $${b}=${a / 10}\\times ${b / 10}=${this.reponse}$.
         `)
        }
        break
    }
  }
}
