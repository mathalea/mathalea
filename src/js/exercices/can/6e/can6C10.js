import { randint } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Connaître les tables de multiplication (de 5 à 9)'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6C10
 */
export default function Tables5A9 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(3, 9)
    const b = randint(5, 9)
    this.reponse = a * b
    this.question = `$${a} \\times ${b}=$`
    this.correction = `$${a} \\times ${b}=${a * b}$`
  }
}
