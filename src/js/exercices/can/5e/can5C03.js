import { calcul, randint, texteEnCouleur } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Calculer une différence d’entiers'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can5C03
 */
export const uuid = '62e1f'
export const ref = 'can5C03'
export default function DifferenceEntiers5e () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.typeExercice = 'simple'
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const b = randint(41, 69, [50, 60])
    const a = randint(2, 30) + 100
    this.reponse = calcul(a - b)
    this.question = `Calculer $${a} - ${b}$.`
    this.correction = `$${a} - ${b}=${a - b}$`
    this.correction += texteEnCouleur(`<br> Mentalement : <br>
    On décompose le calcul $${a} - ${b}$ en  $(100+${a - 100})- ${b}$.<br>
    On obtient : <br>
    
    $\\begin{aligned}
    \\underbrace{100-${b}}_{${100 - b}}+${a - 100}&=${100 - b}+${a - 100}\\\\
    &=${a - b}
    \\end{aligned}$<br>
       Cela donne :  $${a} - ${b}=${a - b}$.
      `)
    this.canEnonce = this.question// 'Compléter'
    this.canReponseACompleter = ''
  }
}
