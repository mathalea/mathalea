import { randint, texteEnCouleur } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Utiliser une priorité opératoire'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can5C07
 */
export const uuid = '14b41'
export const ref = 'can5C07'
export default function PrioriteOperatoire5e () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.typeExercice = 'simple'
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(5, 9)
    const b = 20 - a
    const c = randint(3, 9)
    this.reponse = b + a * c
    this.question = `Calculer $${b} + ${a} \\times ${c}$.`
    this.correction = `$${b} + ${a} \\times ${c}= ${b} + ${a * c} = ${this.reponse}$`
    this.correction += texteEnCouleur(`
    <br> Mentalement : <br>
    La multiplication étant prioritaire sur l'addition, on commence par calculer $${a} \\times ${c}=${a * c}$.<br>
    On ajoute ensuite  $${b}$ pour obtenir le résultat : $${a * c}+${b}=${this.reponse}$.
     `)
    this.canEnonce = this.question// 'Compléter'
    this.canReponseACompleter = ''
  }
}
