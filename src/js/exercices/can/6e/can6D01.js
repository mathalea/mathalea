import { calcul, randint } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Conversion Heures minutes'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6D01
 */
export default function ConversionHeuresMinutes () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  if (!this.interactif) {
    this.question += ' .... minutes'
  }
  this.optionsChampTexte = { texteApres: ' minutes' }
  this.nouvelleVersion = function () {
    const a = randint(2, 4)
    const b = randint(10, 59)
    const d = calcul(a * 60 + b)
    this.question = `Compléter : <br> $${a}$ heures $${b}$ minutes $=$`
    this.correction = `Il y a $60$ minutes dans une heure.<br>
    Comme $${a} \\times 60 + ${b}=${d}$ alors $${a}$h $${b}$min = $${d}$ minutes`
    this.reponse = d
  }
}
