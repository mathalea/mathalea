import { choice, randint, texteEnCouleur } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Quart ou Tiers'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6C08
 */
export default function QuartOuTiers () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.nouvelleVersion = function () {
    const a = randint(5, 10)
    let b
    if (choice([true, false])) {
      b = a * 8
      this.reponse = a * 2
      this.question = `Quel est le quart de $${b}$ ?`
      this.correction = `Le quart de $${b}$ est $${a * 2}.$`
      this.correction += texteEnCouleur(`<br> Mentalement : <br>
      Prendre le quart d'une quantité revient à la diviser par $4$.<br>
      Ainsi, le quart de $${b}$ est égal à $${b}\\div 4=${a * 2}$.
         `)
    } else {
      b = a * 6
      this.reponse = a * 2
      this.question = `Quel est le tiers de $${b}$ ?`
      this.correction = `Le tiers de $${b}$ est $${a * 2}.$`
      this.correction += texteEnCouleur(`<br> Mentalement : <br>
      Prendre le tiers d'une quantité revient à la diviser par $3$.<br>
      Ainsi, le tiers de $${b}$ est égal à $${b}\\div 3=${a * 2}$.
      
      `)
    }
  }
}
