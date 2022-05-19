import { calcul, randint, texteEnCouleur } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Calculer une somme d’entiers'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can5C02
 */
export default function SommeEntiers5e () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.typeExercice = 'simple'
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const b = randint(51, 89, [60, 70, 80])
    const a = randint(2, 39, [10, 20, 30]) + 100
    this.reponse = calcul(a + b)
    this.question = `$${a} + ${b}=$`
    this.correction = `$${a} + ${b}=${a + b}$`
    this.correction += texteEnCouleur(`<br> Mentalement : <br>
    On décompose le calcul $${a} + ${b}$ en  $(100+${a - 100})+ ${b}=100+ (\\underbrace{${a - 100} +${b}}_{${a - 100 + b}})$ .<br>
       Cela donne :  $100+${a - 100 + b}=${this.reponse}$.
      `)
  }
}
