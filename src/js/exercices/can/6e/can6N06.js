import { arrondi, calcul, randint, texNombre } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Arrondi au dixième'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/*!
 * Jean-Claude Lhote
 * Publié le 11 / 09 / 2021
 * Référence can6N06
 */
export default function ArrondiDixieme () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.consigne = ''

  this.nouvelleVersion = function () {
    const a = randint(1, 20)
    const b = randint(0, 9, 5)
    const c = randint(1, 9, b)
    const d = calcul(a + b * 0.1 + c * 0.01)
    this.question = `Quel est l'arrondi au dixième de $${texNombre(d)}$ ?`
    this.correction = `$${texNombre(d)} \\approx ${texNombre(arrondi(d, 1))}$`
    this.reponse = arrondi(d, 1)
  }
}
