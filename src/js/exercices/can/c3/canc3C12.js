import { randint } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Calculer avec un programme de calcul'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '17/11/2022'

/*!
 * @author Gilles Mora
 * Référence canc3C12
 */

export const uuid = '9e7c7'
export const ref = 'canc3C12'
export default function ProgrammeCalculInverse () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(2, 20)
    const b = randint(2, 5)
    const res = randint(b + 1, 15)
    this.reponse = b * res - a
    this.question = `Je pense à un nombre. J'ajoute $${a}$, puis je divise le résultat par $${b}$ et j'obtiens $${res}$. <br>
      
    Quel est ce nombre ?`
    this.correction = `Le nombre qui, divisé par $${b}$ donne $${res}$ est $${res}\\times ${b}=${res * b}$.<br>
      Le nombre qui, augmenté de $${a}$ donne $${res * b}$ est $${res * b}-${a}=${this.reponse}$.<br>
      Le nombre cherché est donc $${this.reponse}$.`
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
