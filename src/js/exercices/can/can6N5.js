import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif'
import { calcul, choice, listeQuestionsToContenuSansNumero, randint } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Double ou triple'
export const interactifReady = true
export const interactifType = 'mathLive'

export default function doubleEtMoitie () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
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
