import Exercice from '../ExerciceTs.js'
import { randint } from '../../modules/outils.js'
export const titre = 'Somme de deux entiers'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '25/10/2021'
export const dateDeModifImportante = '24/10/2021'
export default class NomExercice extends Exercice {
  constructor () {
    super()
    this.typeExercice = 'simple'
    this.nbQuestions = 5
  }

  nouvelleVersion () {
    const a = randint(1, 10)
    const b = randint(1, 10)
    this.question = `$${a}+${b}$`
    this.correction = `$${a} + ${b} = ${a + b}$`
    this.reponse = a + b
  }
}
