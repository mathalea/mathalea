import { numTrie } from '../../../modules/outils/arrays.js'
import { randint } from '../../../modules/outils/entiers.js'
import Exercice from '../../Exercice.js'
export const titre = 'Trouver le plus grand nombre entier'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Date de publication septembre 2021
 * Référence canc3C01
 */
export const uuid = '44f8c'
export const ref = 'canc3N03'
export default function PlusGrandNombreEntier () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(1, 9)
    const b = randint(1, 9, a)
    const c = randint(1, 9, [a, b])
    const chiffres = numTrie([a, b, c])

    this.question = `Quel est le plus grand nombre que l'on peut écrire avec les trois chiffres : ${a}, ${b} et ${c} ?`
    this.reponse = chiffres[2] * 100 + chiffres[1] * 10 + chiffres[0]
    this.correction = `Le plus grand nombre possible est : $${chiffres[2]}\\times 100 + ${chiffres[1]}\\times 10 + ${chiffres[0]}=${chiffres[2] * 100 + chiffres[1] * 10 + chiffres[0]}$`
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
