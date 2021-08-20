import { calcul, randint, texNombrec } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Double et moitié'
export const interactifReady = true
export const interactifType = 'mathLive'

export default function doubleEtMoitie () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1

  this.nouvelleVersion = function () {
    const a = randint(1, 25) // variables aléatoires
    this.question = `Le double d'un nombre vaut ${2 * a}, combien vaut sa moitié ?`
    this.correction = `Le nombre est ${a}, sa moitié est ${texNombrec(a / 2)}.`
    this.reponse = calcul(a / 2)
  }
}
