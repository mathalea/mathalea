import { calcul, choice, randint, texNombre } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Multiplier par 0,1 ou 0,01 ou 0,001'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Publié le 15/09/2021
 * Référence can6C24
 */
export default function MultiplierParPuissanceDixNeg () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(1, 9)
    const b = randint(1, 9, a)
    const c = randint(1, 9, b)
    const facteur = calcul(a * 100 + b * 10 + c)
    const d = choice([0.1, 0.01, 0.001])
    this.reponse = calcul(facteur * d)
    this.question = `$${facteur}\\times ${texNombre(d)}=$`
    this.correction = `$${facteur}\\times ${texNombre(d)}=${texNombre(this.reponse)}$`
  }
}
