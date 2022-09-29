import { calcul, randint, texteEnCouleur } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Ajouter 10n + 9'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6C04
 */
export const uuid = '5b591'
export const ref = 'can6C04'
export default function Ajoute10NPlus9 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(3, 9)
    const b = randint(2, 8)
    const c = randint(1, 5)
    this.reponse = calcul(a * 10 + b + c * 10 + 9)
    this.question = `Calculer $${a * 10 + b} + ${c * 10 + 9}$.`
    // Si les exos can avaient toujours cette propriété this.question on pourrait faire un ajout automatique
    // this.canEnonce = 'Compléter'
    // this.canReponseACompleter = `${this.question} \\dots \\dots`
    this.correction = `$${a * 10 + b} + ${c * 10 + 9}= ${this.reponse}$`
    this.correction += texteEnCouleur(`<br> Mentalement : <br>
   Pour ajouter $${c * 10 + 9}$, on ajoute $${(c + 1) * 10}$ et on retranche $1$.<br>
   Ainsi,  $${a * 10 + b} + ${c * 10 + 9}=(${a * 10 + b}+${(c + 1) * 10}) - 1 =${a * 10 + b + (c + 1) * 10} - 1=${this.reponse}$.
    `)
  }
}
