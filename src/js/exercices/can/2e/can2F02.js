import Exercice from '../../Exercice.js'
import {
  randint, ecritureParentheseSiNegatif,
  ecritureAlgebrique, texteEnCouleur, texFractionReduite, reduireAxPlusB, simplificationDeFractionAvecEtapes, texFraction
} from '../../../modules/outils.js'
export const titre = 'Calculer une image avec un quotient'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can2F02
 * Date de publication septembre 2021
*/
export const uuid = '8b3a9'
export const ref = 'can2F02'
export default function CalculImageQuotient () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.formatChampTexte = 'largeur15 inline'
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    let a, c

    a = randint(1, 5)
    const b = randint(-5, 5, 0)
    c = randint(1, 5)
    const d = randint(-5, 5, [0, b])
    const x = randint(-3, 3, 0)
    while (c * x + d === 0) {
      c = randint(1, 5)
    }
    while (a * x + b === 0) {
      a = randint(1, 5)
    }
    const e = a * x + b
    const f = c * x + d
    const expression = `\\dfrac{${reduireAxPlusB(a, b)}}{${reduireAxPlusB(c, d)}}`
    this.reponse = texFractionReduite(a * x + b, c * x + d)
    this.question = `On considère la fonction $f$ définie par $f(x)= ${expression}$. <br>
        Calculer $f(${x})$ sous la forme d'une fraction irréductible ou d'un entier le cas échéant.`
    if (a === 1 & c === 1) {
      this.correction = `$f(${x})=\\dfrac{${ecritureParentheseSiNegatif(x)}${ecritureAlgebrique(b)}}{${ecritureParentheseSiNegatif(x)}${ecritureAlgebrique(d)}}
          =${texFractionReduite(e, f)}$.<br>
          `
      this.correction += texteEnCouleur(` Mentalement : <br>
          On calcule  le numérateur et le dénominateur pour $x=${x}$, soit 
           $ ${ecritureParentheseSiNegatif(x)}${ecritureAlgebrique(b)}=${a * x + b}$ et $ ${ecritureParentheseSiNegatif(x)}${ecritureAlgebrique(d)}=${c * x + d}$.<br>
           On obtient le quotient que l'on simplifie éventuellement : $${texFraction(e, f)}${simplificationDeFractionAvecEtapes(e, f)}$.
    `)
    }
    if (a === 1 & c !== 1) {
      this.correction = `$f(${x})=\\dfrac{${x}${ecritureAlgebrique(b)}}{${c}\\times${ecritureParentheseSiNegatif(x)}${ecritureAlgebrique(d)}}
          =${texFractionReduite(e, f)}$.<br>
          `
      this.correction += texteEnCouleur(` Mentalement : <br>
          On calcule  le numérateur et le dénominateur pour $x=${x}$, soit 
           $ ${x}${ecritureAlgebrique(b)}=${a * x + b}$ et $${c}\\times ${ecritureParentheseSiNegatif(x)}${ecritureAlgebrique(d)}=${c * x + d}$.<br>
           On obtient le quotient que l'on simplifie éventuellement : $${texFraction(e, f)}${simplificationDeFractionAvecEtapes(e, f)}$.
    `)
    }
    if (a !== 1 & c === 1) {
      this.correction = `$f(${x})=\\dfrac{${a}\\times${ecritureParentheseSiNegatif(x)}${ecritureAlgebrique(b)}}{${ecritureParentheseSiNegatif(x)}${ecritureAlgebrique(d)}}
          =${texFractionReduite(e, f)}$.<br>
          `
      this.correction += texteEnCouleur(` Mentalement : <br>
          On calcule  le numérateur et le dénominateur pour $x=${x}$, soit 
           $${a}\\times ${ecritureParentheseSiNegatif(x)}${ecritureAlgebrique(b)}=${a * x + b}$ et $ ${x}${ecritureAlgebrique(d)}=${c * x + d}$.<br>
           On obtient le quotient que l'on simplifie éventuellement : $${texFraction(e, f)}${simplificationDeFractionAvecEtapes(e, f)}$.
    `)
    }
    if (a !== 1 & c !== 1) {
      this.correction = `$f(${x})=\\dfrac{${a}\\times${ecritureParentheseSiNegatif(x)}${ecritureAlgebrique(b)}}{${c}\\times${ecritureParentheseSiNegatif(x)}${ecritureAlgebrique(d)}}
          =${texFractionReduite(e, f)}$.<br>
          `
      this.correction += texteEnCouleur(` Mentalement : <br>
          On calcule  le numérateur et le dénominateur pour $x=${x}$, soit 
           $${a}\\times ${ecritureParentheseSiNegatif(x)}${ecritureAlgebrique(b)}=${a * x + b}$ et $${c}\\times ${ecritureParentheseSiNegatif(x)}${ecritureAlgebrique(d)}=${c * x + d}$.<br>
           On obtient le quotient que l'on simplifie éventuellement : $${texFraction(e, f)}${simplificationDeFractionAvecEtapes(e, f)}$.
    `)
    }
  }
}
