import { randint, choice, texNombre } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Résoudre un problème par soustraction/division'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '09/02/2023'

/*!
 * @author Gilles Mora
 * Référence can6C45
 */

export default function ProblemeSoustractionDivision () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(2, 10)
    const b = choice([50, 100])
    const c = randint(2, 10)
    const d = b / 10
    const res = a * b + c * d
    this.reponse = (res - a * b) / d
    this.question = `Compléter : <br>
    $${a}$ sachets de $${b}$ ballons et $\\ldots$ sachets de $${d}$ ballons contiennent $${texNombre(res, 0)}$ ballons en tout. `
    this.correction = `$${a}$ sachets de $${b}$ ballons contiennent $${a * b}$ ballons.<br>
   Puisque l'on a $${res}$ ballons au total, le nombre de sachets de $${d}$ ballons est donné par $(${res}-${a * b})\\div ${d}=${res - a * b}\\div ${d}=${this.reponse}$.`
    this.canEnonce = 'Compléter.'
    this.canReponseACompleter = `$${a}$ sachets de $${b}$ ballons et $\\ldots$ sachets de $${d}$ ballons contiennent $${texNombre(res, 0)}$ ballons en tout.`
  }
}
