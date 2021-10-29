import { calcul, choice, randint, texNombre } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Position des chiffres'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * Jean-Claude Lhote
 * Publié le 11 / 09 / 2021
 * Référence can6N06
 */
export default function PositionDesChiffres () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.consigne = ''

  this.nouvelleVersion = function () {
    const a = randint(1, 2)
    const b = randint(1, 9, a)
    const c = randint(1, 9, [a, b])
    const d = randint(1, 9, [a, b, c])
    const e = randint(1, 9, [a, b, c, d])
    const f = randint(1, 9, [a, b, c, d, e])
    const m = choice(['dizaines', 'dixièmes', 'centièmes', 'millièmes'])
    const n = calcul(a * 100 + b * 10 + c + d * 0.1 + e * 0.01 + f * 0.001)
    this.question = `Dans $${texNombre(n)}$ quel est le chiffre des ${m} ? `
    if (m === 'dizaines') {
      this.correction = `Le chiffre des ${m} est $${b}$.`
      this.reponse = b
    } if (m === 'dixièmes') {
      this.correction = `Le chiffre des ${m} est $${d}$.`
      this.reponse = d
    }
    if (m === 'centièmes') {
      this.correction = `Le chiffre des ${m} est $${e}$.`
      this.reponse = e
    }
    if (m === 'millièmes') {
      this.correction = `Le chiffre des ${m} est $${f}$.`
      this.reponse = f
    }
  }
}
