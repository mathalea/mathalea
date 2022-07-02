import { calcul, choice, randint } from '../../../modules/outils'
import Exercice from '../../Exercice.js'
export const titre = 'Calculer le double ou le triple'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6C12
 */
export default function DoubleOuTriple () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(1, 3)
    const b = randint(1, 9, a)
    const c = calcul(a * 10 + b)
    if (choice([true, false])) {
      this.reponse = calcul(3 * c)
      this.question = `Quel est le triple de $${c}$ ?`
      this.correction = `Le triple de $${c}$ est $3 \\times ${c}=${calcul(3 * c)}$.`
    } else {
      this.reponse = calcul(2 * c)
      this.question = `Quel est le double de $${c}$ ?`
      this.correction = `Le double de $${c}$ est $2 \\times ${c}=${calcul(2 * c)}$.`
    }
  }
}
