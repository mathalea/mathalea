import Exercice from '../../Exercice.js'
import { choice, randint } from '../../../modules/outils.js'
import { fraction } from '../../../modules/fractions.js'
export const titre = 'Somme ou différence de fractions égyptiennes'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
 * 1/n +/- 1/m
 * @author Gilles Mora
 * publié le 23/10/2021
 * Référence can4C10
*/
export default function SommeDifferenceFractionsEgyptiennes () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.formatInteractif = 'fraction'
  this.nouvelleVersion = function () {
    const a = randint(2, 7)
    const b = randint(2, 7, a)
    if (choice([true, false])) {
      this.reponse = fraction(b + a, a * b)
      this.reponse = this.reponse.simplifie()
      this.question = `Calculer sous la fomre d'une fraction irréductible : $\\dfrac{1}{${a}}+\\dfrac{1}{${b}}$`
      this.correction = `$\\dfrac{1}{${a}}+\\dfrac{1}{${b}}=\\dfrac{${b}+${a}}{${a}\\times ${b}}=${this.reponse.texFraction}$`
    } else {
      this.reponse = fraction(b - a, a * b)
      this.reponse = this.reponse.simplifie()
      this.question = `Calculer sous la fomre d'une fraction irréductible : $\\dfrac{1}{${a}}-\\dfrac{1}{${b}}$`
      this.correction = `$\\dfrac{1}{${a}}-\\dfrac{1}{${b}}=\\dfrac{${b}-${a}}{${a}\\times ${b}}=${this.reponse.texFraction}$`
    }
  }
}
