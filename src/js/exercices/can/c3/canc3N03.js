import { numTrie, randint } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Le plus grand nombre entier'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Date de publication septembre 2021
 * Référence canc3C01
 */
export default function PlusGrandNombreEntier () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
    this.nouvelleVersion = function () {
    const a = randint(1, 9)
    const b = randint(1, 9, a)
    const c = randint(1, 9, [a, b])
    const chiffres = numTrie([a, b, c])

    this.question = `Quel est le plus grand nombre écrit avec les chiffres : ${a}, ${b} et ${c}.`
    this.reponse = chiffres[2] * 100 + chiffres[1] * 10 + chiffres[0]
    this.correction = `Le plus grand nombre possible est : $${chiffres[2]}\\times 100 + ${chiffres[1]}\\times 10 + ${chiffres[0]}=${chiffres[2] * 100 + chiffres[1] * 10 + chiffres[0]}$`
  }
}
