import { calcul, choice, texteEnCouleur } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Résoudre un problème de vitesse'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can4P02
 */
export const uuid = '7374f'
export const ref = 'can4P02'
export default function ProblemesDeVitesse () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.formatChampTexte = 'largeur15 inline'
  this.nbQuestions = 1
  this.nouvelleVersion = function () {
    const a = choice([2, 3, 5, 6, 10]) // diviseur de l'heure
    const b = calcul(60 / a) // nombre de minutes de l'énoncé
    const c = choice([30, 60, 90, 120])
    this.reponse = calcul(c / a)
    this.question = `Une voiture roule à $${c}$ km/h. Combien de kilomètres parcourt-elle en $${b}$ minutes ?`
    this.correction = `La voiture parcourt $${calcul(c / a)}$ km.`
    this.correction += texteEnCouleur(`<br> Mentalement : <br>
    On cherche combien de "$${b}$ minutes" il y a dans $1$ heure soit $60$ minutes. Il y en a $${a}$, 
    car $${a}\\times ${b}=60$.<br>
    Cela signifie qu'en $${b}$ minutes, elle parcourt $${a}$ fois moins de km qu'en $1$ heure, soit $\\dfrac{${c}}{${a}}=
    ${calcul(c / a)}$ km.`)
  }
}
