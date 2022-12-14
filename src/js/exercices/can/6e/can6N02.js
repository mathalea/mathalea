import { randint, texNombre } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Recomposer un entier (bis)'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6N02
 */
export const uuid = '75d40'
export const ref = 'can6N02'
export default function RecomposerEntierSimple () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(20, 70)
    const b = randint(20, 70, a)
    this.reponse = a * 100 + b
    this.question = `Calculer $${texNombre(a)}$ centaines et $${texNombre(b)}$ unités. `
    this.correction = `$${texNombre(a)} \\times 100 + ${texNombre(b)}\\times 1 =${texNombre(a * 100)}+${b}= ${texNombre(a * 100 + b)}$`
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
