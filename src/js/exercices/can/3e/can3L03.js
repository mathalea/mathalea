import { ecritureAlgebrique, ecritureParentheseSiNegatif, randint } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Équation ax+b=c'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
  * Créé pendant l'été 2021
 * Référence can3L03
*/
export default function EquationAXPlusBEgalC () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(-5, 5, [0, -1, 1])
    this.reponse = randint(-9, 9, [-1, 0, 1])
    const c = randint(-9, 9, [0])
    const b = c - a * this.reponse
    this.question = `Donner la solution de l'équation $${a}x${ecritureAlgebrique(b)}=${c}$`
    this.correction = `On procède par étapes successives :<br>
    On commence par isoler $${a}x$ dans le membre de gauche en ajoutant 
    $${ecritureAlgebrique(-b)}$ dans chacun des membres, puis on divise 
    par $${a}$ pour obtenir la solution : <br>
     $\\begin{aligned}
     ${a}x${ecritureAlgebrique(b)}&=${c}\\\\
    ${a}x&=${c}${ecritureAlgebrique(-b)}\\\\
    x&=\\dfrac{${c - ecritureParentheseSiNegatif(b)}}{${a}}\\\\
    x&=${this.reponse}
    \\end{aligned}$
    `
  }
}
