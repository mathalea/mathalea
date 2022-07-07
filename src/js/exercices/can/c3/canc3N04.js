import { calcul, randint, texNombre } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Arrondir à l\'unité'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/*!
 * Jean-Claude Lhote
 * Publié le 11 / 09 / 2021
 * Référence canc3N03
 */
export default function ArrondiUnite () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.consigne = ''

  this.nouvelleVersion = function () {
    const a = randint(1, 20)
    const b = randint(0, 9, 5)
    const c = randint(0, 9, b)
    const d = calcul(a + b * 0.1 + c * 0.01)
    this.question = `Quel est l'arrondi à l'unité de $${texNombre(d)}$ ?`
    this.correction = `$${texNombre(d)} \\approx ${Math.round(d)}$`
    this.reponse = Math.round(d)
  }
}
