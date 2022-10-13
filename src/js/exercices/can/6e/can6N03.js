import { randint } from '../../../modules/outils/entiers.js'
import Exercice from '../../Exercice.js'
export const titre = 'Recomposer un entier*'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6N03
 */
export const uuid = '1dbee'
export const ref = 'can6N03'
export default function RecomposerEntierMoinsSimple () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(20, 70)
    const b = randint(20, 70, a)
    this.reponse = a * 100 + b * 10
    this.question = `Calculer $${a}$ centaines et $${b}$ dizaines.`
    this.correction = `$${a} \\times 100 + ${b} \\times 10 = ${a * 100} + ${b * 10}=${a * 100 + b * 10}$`
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
