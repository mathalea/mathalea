import { calcul, choice, randint } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Problèmes de robinets'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can4P01
 */
export default function ProblemesDeRobinets () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
    this.nouvelleVersion = function () {
    const a = choice([2, 3, 4, 5, 6, 10]) // nombre de secondes pour remplir un litre
    const b = calcul(60 / a) // nombres de litres/min
    const c = randint(2, b - 1) % 10 // volume du seau à remplir
    this.reponse = calcul(c * a)
    this.question = `Le débit d'eau d'un robinet est de $${b}$ L/min. Combien de secondes faut-il pour remplir un seau de $${c}$ L ?`
    this.correction = `Comme le débit est de $${b}$ L/min, il faut $\\dfrac{60}{${b}}=${a}$ s pour remplir un litre.<br>`
    this.correction += `Il faut donc $${a}\\times ${c}=${a * c}$ s pour remplir le seau de ${c} L.`
  }
}
