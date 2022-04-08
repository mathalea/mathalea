import Exercice from '../Exercice.js'
import { choice, randint } from '../../modules/outils.js'
import FractionX from '../../modules/FractionEtendue.js'
export const titre = 'Opérations simples avec des fractions'
export const interactifReady = true
export const interactifType = 'mathLive'

export const dateDeModifImportante = '27/01/2022'

/**
 * Somme ou différence de deux fractions de même dénominateur simple, produit par un entier
 * @author Rémi Angot
 * Référence c3c23
*/
export default function CalculsFractionsSimples () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.formatInteractif = 'fractionEgale'
  this.nbQuestions = 6
  this.sup = 4
  this.consigne = 'Calculer'
  this.tailleDiaporama = 4
  this.version = 'c3'

  this.nouvelleVersion = function (i) {
    if (this.version === '6') {
      this.sup = 4
    }
    const den = choice([2, 3, 4, 5, 10])
    let a = randint(1, 10, [den, 2 * den, 3 * den, 4 * den])
    let b = randint(1, 10, [den, 2 * den, 3 * den, 4 * den])
    const operation = (this.sup === 1) ? '+' : (this.sup === 2) ? '-' : (this.sup === 3) ? 'x' : (this.sup === 4) ? choice(['+', '-']) : choice(['+', '-', 'x'])
    // Le premier terme de la soustraction doit être le plus grand
    if (operation === '-' && a < b) [a, b] = [b, a]
    let num // numérateur de la réponse
    if (['+', '-'].includes(operation)) {
      this.question = `$\\dfrac{${a}}{${den}} ${operation} \\dfrac{${b}}{${den}} = $`
      num = operation === '+' ? a + b : a - b
      this.correction = `$\\dfrac{${a}}{${den}} ${operation} \\dfrac{${b}}{${den}} = \\dfrac{${num}}{${den}}$`
      this.reponse = new FractionX(num, den)
    } else {
      if (a === 1) a = randint(2, 10)
      this.question = `$${a} \\times \\dfrac{${b}}{${den}} = $`
      num = a * b
      this.correction = `$${a} \\times $\\dfrac{${b}}{${den}} = \\dfrac{${num}}{${den}}$`
    }
    this.reponse = new FractionX(num, den)
  }
}
