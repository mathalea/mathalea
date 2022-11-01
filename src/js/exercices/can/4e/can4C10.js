import Exercice from '../../Exercice.js'
import { choice, randint, texteEnCouleur, simplificationDeFractionAvecEtapes } from '../../../modules/outils.js'
import { fraction } from '../../../modules/fractions.js'
export const titre = 'Calculer une somme/différence de fractions égyptiennes'
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
export const uuid = '8cbb4'
export const ref = 'can4C10'
export default function SommeDifferenceFractionsEgyptiennes () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 1
  this.formatChampTexte = 'largeur15 inline'
  this.formatInteractif = 'fraction'
  this.nouvelleVersion = function () {
    const a = randint(2, 7)
    const b = randint(2, 7, a)
    if (choice([true, false])) {
      this.reponse = fraction(b + a, a * b)
      this.reponse = this.reponse.simplifie()
      this.question = `Calculer sous la forme d'une fraction irréductible $\\dfrac{1}{${a}}+\\dfrac{1}{${b}}$.`
      this.correction = `$\\dfrac{1}{${a}}+\\dfrac{1}{${b}}=\\dfrac{1\\times ${b}}{${a}\\times ${b}}+\\dfrac{1\\times ${a}}{${b}\\times ${a}}=\\dfrac{${b}+${a}}{${a * b}}=${this.reponse.texFraction}$`
      this.correction += texteEnCouleur(`<br> Mentalement : <br>
      Pour additionner des fractions, on les met au même dénominateur.<br>
      On prend pour  dénominateur commun  le produit des deux dénominateurs $${a}\\times ${b}=${a * b}$.<br>
      $\\dfrac{1}{${a}}=\\dfrac{${b}}{${a * b}}$ et $\\dfrac{1}{${b}}=\\dfrac{${a}}{${a * b}}$.<br>
      On en déduit : $\\dfrac{1}{${a}}+\\dfrac{1}{${b}}=\\dfrac{${b}+${a}}{${a * b}}=\\dfrac{${a + b}}{${a * b}}${simplificationDeFractionAvecEtapes(a + b, a * b)}$.
          `)
    } else {
      this.reponse = fraction(b - a, a * b)
      this.reponse = this.reponse.simplifie()
      this.question = `Calculer sous la forme d'une fraction irréductible $\\dfrac{1}{${a}}-\\dfrac{1}{${b}}$.`
      this.correction = `$\\dfrac{1}{${a}}-\\dfrac{1}{${b}}=\\dfrac{1\\times ${b}}{${a}\\times ${b}}-\\dfrac{1\\times ${a}}{${a}\\times ${b}}=\\dfrac{${b}-${a}}{${a * b}}=\\dfrac{${b - a}}{${a * b}}=${this.reponse.texFraction}$`
      this.correction += texteEnCouleur(`<br> Mentalement : <br>
      Pour additionner des fractions, on les met au même dénominateur.<br>
      On prend pour  dénominateur commun  le produit des deux dénominateurs $${a}\\times ${b}=${a * b}$.<br>
      $\\dfrac{1}{${a}}=\\dfrac{${b}}{${a * b}}$ et $\\dfrac{1}{${b}}=\\dfrac{${a}}{${a * b}}$.<br>
      On en déduit : $\\dfrac{1}{${a}}-\\dfrac{1}{${b}}=\\dfrac{${b}-${a}}{${a * b}}=\\dfrac{${b - a}}{${a * b}}${simplificationDeFractionAvecEtapes(b - a, a * b)}$.
          `)
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
