import { calcul, choice, randint, texNombre, texteEnCouleur } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
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
export const uuid = 'da0c1'
export const ref = 'can6P04'
export default function AppliquerUnPourcentage () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.bis = false
  this.nouvelleVersion = function () {
    let a, p
    switch (this.bis ? choice([4, 5, 6]) : choice([1, 2, 3])) {
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
        p = randint(2, 9) * 10
        a = randint(2, 9, p) * 10
        this.reponse = calcul(p * a / 100)
        this.question = `$${p}\\%$ de $${a}=$`
        if (p === 50) {
          this.correction = `$50\\%$  de $${a} = ${this.reponse}$.`
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
            Prendre $50\\%$  d'une quantité revient à la diviser par $2$.<br>
            Ainsi, $${p}\\%$ de $${a} = ${a}\\div 2=${this.reponse}$.`)
        } else {
          this.correction = `$${p}\\%$ de $${a} = ${this.reponse}$`
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
          Prendre $${p}\\%$  de $${a}$ revient à prendre $${p / 10}\\times 10\\%$  de $${a}$.<br>
          Comme $10\\%$  de $${a}$ vaut $${a / 10}$ (pour prendre $10\\%$ d'une quantité, on la divise par $10$), alors 
          $${p}\\%$ de $${a}=${p / 10}\\times ${a / 10}=${this.reponse}$.
         `)
        }
        break
      case 4: // prende 1%
        a = randint(100, 999)
        this.reponse = calcul(a / 100)
        this.question = `$1\\%$ de $${a}=$`
        this.correction = texteEnCouleur(`<br> Mentalement : <br>
        Prendre $1\\%$  d'une quantité revient à la diviser par $100$.<br>
        Ainsi, $1\\%$ de $${a} = \\dfrac{${a}}{100}=${texNombre(this.reponse)}$.`)
        break

      case 5:// prendre  25%, 50%, 75%......
        a = randint(10, 50) * 20
        p = choice([25, 50, 75])
        this.reponse = calcul(a * p / 100)
        this.question = `$${p}\\%$ de $${a}=$`
        this.correction = `$${p}\\%$ de $${a} = ${texNombre(this.reponse)}$`
        if (p === 25) {
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
        Prendre $25\\%$  de $${a}$ revient à diviser $${a}$ par $4$.<br>
        $${p}\\%$ de $${a}=\\dfrac{${a}}{4}=${this.reponse}$.
       `)
        } else if (p === 75) {
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
          Prendre $75\\%$  de $${a}$ revient à diviser $${a}$ par 4 et à multiplier le résultat par $3$.<br>
          Comme $25\\%$  de $${a}$ vaut $${calcul(a / 4)}$, alors 
          $75\\%$ de $${a}=${calcul(a / 4)}\\times 3=${this.reponse}$.
         `)
        } else {
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
          Prendre $50\\%$  d'une quantité revient à la diviser par $2$.<br>
          Ainsi, $50\\%$ de $${a} = \\dfrac{${a}}{2}=${this.reponse}$.`)
        }
        break
      case 6:
        a = randint(10, 50) * 20
        p = choice([5, 10, 20])
        this.reponse = calcul(a * p / 100)
        this.question = `$${p}\\%$ de $${a}=$`
        if (p === 5) {
          this.correction = `$5\\%$  de $${a} = ${this.reponse}$.`
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
            Prendre $5\\%$  d'une quantité revient à la diviser par $20$ soit la diviser par $10$ puis par $2$.<br>
            Ainsi, $5\\%$ de $${a} = ${a}\\div 10 \\div 2=${this.reponse * 2}\\div 2=${this.reponse}$.`)
        } else if (p === 10) {
          this.correction = `$10\\%$ de $${a} = ${this.reponse}$`
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
          Prendre $10\\%$  de $${a}$ revient à diviser $${a}$ par $10$, alors 
          $10\\%$ de $${a}=\\dfrac{${a}}{10}=${this.reponse}$.
         `)
        } else {
          this.correction = `$20\\%$ de $${a} = ${this.reponse}$`
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
          Prendre $20\\%$  de $${a}$ revient à diviser $${a}$ par $5$ soit diviser par $10$ puis multiplier le résultat par $2$.<br> 
          Donc $20\\%$ de $${a}=\\dfrac{${a}}{10}\\times 2=${calcul(this.reponse / 2)}\\times 2=${this.reponse}$.
         `)
        }
        break
    }
  }
}
