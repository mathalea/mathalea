import { shuffle, randint, calcul, exposant } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Calcul de volume 3e'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 */
export default function CalculVolumePyramide () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.formatChampTexte = 'largeur25 inline'
  this.optionsChampTexte = { texteApres: `cm${exposant(3)}` }
  this.nouvelleVersion = function () {
    const triplet = shuffle([3, randint(2, 8) * 2, randint(1, 2) * 5])
    const a = triplet[0]
    const b = triplet[1]
    const h = triplet[2]
    this.reponse = calcul(a * b * h / 3)
    this.question = `Une pyramide a une hauteur de ${h} cm et pour base un rectangle de dimensions ${a} cm et ${b} cm.<br>Calculer son volume en cm${exposant(3)}.`
    this.correction = `Le volume de cette pyramide est : $\\dfrac{1}{3} \\times ${a} \\times ${b} \\times ${h}=${this.reponse}$ cm${exposant(3)}`
  }
}
