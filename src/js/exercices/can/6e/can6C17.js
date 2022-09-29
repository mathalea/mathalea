import { calcul, randint, texteEnCouleur } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Calculer la fraction d’une quantité'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6C17
 */
export const uuid = 'daaa3'
export const ref = 'can6C17'
export default function FractionSimpleDeQuantite () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.optionsChampTexte = { texteApres: ' L' }
  this.nouvelleVersion = function () {
    const a = randint(2, 6)
    this.reponse = calcul(randint(2, 9) * 10)
    const b = calcul(this.reponse * a)
    this.question = `Calculer $\\dfrac{1}{${a}} \\text{ de } ${b} \\text{ L}$.`
    this.correction = `$\\dfrac{1}{${a}}$ de $${b}$ L = $${this.reponse}$ L`
    this.correction += texteEnCouleur(`
    <br> Mentalement : <br>
    Prendre $\\dfrac{1}{${a}}$ d'une quantité revient à la diviser par $${a}$.<br>
    Ainsi, $\\dfrac{1}{${a}}$ de $${b}=${b}\\div ${a}=${b / a}$.
     `)
  }
}
