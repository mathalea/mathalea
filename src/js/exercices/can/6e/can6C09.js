import { calcul, randint, texteEnCouleur } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Soustraire 10n+9'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6C09
 */
export const uuid = '592c7'
export const ref = 'can6C09'
export default function SoustraireX9 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(5, 9)
    const b = randint(1, 8)
    const c = randint(1, 4)
    this.reponse = calcul(a * 10 + b - c * 10 - 9)
    this.question = `Calculer $${a * 10 + b} - ${c * 10 + 9}$.`
    this.correction = `$${a * 10 + b} - ${c * 10 + 9}= ${this.reponse}$`
    this.correction += texteEnCouleur(`<br> Mentalement : <br>
    Soustraire $${c * 10 + 9}$ revient à soustraire $${c * 10 + 10}$, puis à ajouter $1$.<br>
    Ainsi, $${a * 10 + b} - ${c * 10 + 9}=${a * 10 + b} - ${c * 10 + 10}+1=${a * 10 + b - c * 10 - 10}+1=${this.reponse}$.
       `)
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
