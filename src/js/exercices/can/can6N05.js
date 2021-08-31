import { calcul, choice, randint, texNombre } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Chiffre des ...'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/*!
 * @author Gilles Mora & Jean-Claude Lhote
 */
export default function ChiffreDes () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.formatInteractif = 'fractionEgale'
  this.consigne = ''

  this.nouvelleVersion = function () {
    const a = randint(1, 2)
    const b = randint(1, 9, a)
    const c = randint(1, 9, [a, b])
    const d = randint(1, 9, [a, b, c])
    const e = randint(1, 9, [a, b, c, d])
    const f = randint(1, 9, [a, b, c, d, e])
    const n = calcul(a * 100 + b * 10 + c + d * 0.1 + e * 0.01 + f * 0.001)
    const m = choice(['dizaines', 'dixièmes', 'centièmes', 'millièmes'])
    this.question = `Dans $${texNombre(n)}$ quel est le chiffre des ${m} ? `
    switch (m) {
      case 'dizaines':
        this.reponse = b
        break
      case 'dixièmes':
        this.reponse = d
        break
      case 'centièmes':
        this.reponse = e
        break
      case 'millièmes':
        this.reponse = f
        break
    }
    this.correction = `Le chiffre des ${m} est $${this.reponse}$.`
  }
}
