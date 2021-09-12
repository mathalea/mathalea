import { calcul, choice, randint, texNombrec } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Conversion Heures minutes'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote & Gilles Mora
 * Créé pendant l'été 2021
 * Référence can5D01
 */
export default function ConversionHeuresMinutes () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
    this.nouvelleVersion = function () {
    const a = randint(1, 3)
    const b = choice([0.25, 0.5, 0.75])
    const d = calcul(b * 60)
    this.question = `${texNombrec(a + b)}h$=$ (format : ...h...min)`
    this.correction = `${texNombrec(a + b)}h = ${a} h $+ ${texNombrec(b)} \\times 60$  = ${a}h ${d}min`
    this.reponse = `${a}h${d}\\min`
    this.formatInteractif = 'texte'
  }
}
