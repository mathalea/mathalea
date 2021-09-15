import { calcul, choice } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Problèmes de vitesse'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can4P02
 */
export default function ProblemesDeVitesse () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.nouvelleVersion = function () {
    const a = choice([2, 3, 5, 6, 10]) // diviseur de l'heure
    const b = calcul(60 / a) // nombre de minutes de l'énoncé
    const c = choice([30, 60, 90, 120])
    this.reponse = calcul(c / a)
    this.question = `Une voiture roule à $${c}$ km/h. Combien de kilomètres parcourt-elle en $${b}$ minutes ?`
    this.correction = `Comme cette voiture parcourt $${c}$ kilomètres en $60$ minutes, en $${b}$ minutes, soit $${a}$ fois moins, elle parcourt :<br>`
    this.correction += ` $\\dfrac{${c}}{${a}}=${calcul(c / a)}$ km.`
  }
}
