import { choice, randint } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Ajouter des durées'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '20/11/2021'

/*!
 * @author Jean-Claude Lhote
 * Référence canc3D03
 */
export const uuid = 'e3b7d'
export const ref = 'canc3D03'
export default function AjouterDesDurees () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  if (!this.interactif) {
    this.question += ' .... minutes'
  }
  this.nouvelleVersion = function () {
    const a = randint(1, 2)
    const b = choice([choice([10, 20, 30]), randint(1, 5) * 5, randint(11, 29, 20), 30])
    const c = randint(1, 3)
    const variante = choice([true, false])
    const d = 60 - b - (variante ? choice([10, 20]) : 0)
    this.question = `$${a}\\text{h } ${b}$min + $${c}\\text{h } ${d}$min $=$`
    this.correction = variante
      ? 'On ajoute les heures avec les heures et les minutes avec les minutes<br>' + `$(${a}\\text{h }+${c}\\text{h })+(${b}\\text{min }+${d}\\text{min })=${a + c}\\text{h }${b + d}\\text{min}$.`
      : `On remarque qu'il y a $${b}\\text{min } + ${d}\\text{min }=60\\text{min}$ qui font une heure.<br>
      On ajoute donc : $1\\text{h }+${a}\\text{h }+${c}\\text{h }=${1 + a + c}\\text{h}$.`
    this.reponse = variante ? `${a + c}h${b + d}min` : `${1 + a + c}h`
  }
}
