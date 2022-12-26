import Exercice from '../../Exercice.js'
import { randint, choice, arrondi, rienSi1 } from '../../../modules/outils.js'
export const titre = 'Réduire une expression avec une fraction'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '08/12/2022'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can3L06
 * Date de publication
*/

export const uuid = '3cf30'
export const ref = 'can3L06'
export default function ReduireAvecFraction () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    switch (choice([1, 2, 3, 4])) {
      case 1 :
        { const a = randint(1, 9)
          const couplend = choice([[1, 3], [2, 3], [4, 3], [5, 3], [3, 4], [2, 5], [3, 5], [4, 5], [5, 6], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [3, 8], [5, 8], [7, 8], [2, 9], [4, 9], [5, 9], [7, 9], [8, 9], [3, 10], [7, 10], [9, 10]]) // n et m sont premiers entre eux
          const n = couplend[0]
          const d = couplend[1]
          if (choice([true, false])) {
            this.question = ` Réduire l'expression : $\\dfrac{${n}}{${d}}x+${rienSi1(a)}x$.`
            this.correction = `$\\dfrac{${n}}{${d}}x+${rienSi1(a)}x=\\dfrac{${n}}{${d}}x+\\dfrac{${a}\\times${d}}{${d}}x=\\dfrac{${n}}{${d}}x+\\dfrac{${a * d}}{${d}}x=\\dfrac{${n}+${a * d}}{${d}}x=\\dfrac{${n + a * d}}{${d}}x$`
          } else {
            this.question = ` Réduire l'expression : $${rienSi1(a)}x+\\dfrac{${n}}{${d}}x$.`
            this.correction = `$${rienSi1(a)}x+\\dfrac{${n}}{${d}}x=\\dfrac{${a}\\times${d}}{${d}}x+\\dfrac{${n}}{${d}}x=\\dfrac{${a * d}}{${d}}x+\\dfrac{${n}}{${d}}x=\\dfrac{${a * d}+${n}}{${d}}x=\\dfrac{${n + a * d}}{${d}}x$`
          }
          this.reponse = [`\\dfrac{${n + a * d}}{${d}}x`, `${arrondi((n + a * d) / d, 2)}x`]
        }
        break
      case 2 :
        { const a = randint(1, 9)
          const couplend = choice([[1, 3], [2, 3], [4, 3], [5, 3], [3, 4], [2, 5], [3, 5], [4, 5], [5, 6], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [3, 8], [5, 8], [7, 8], [2, 9], [4, 9], [5, 9], [7, 9], [8, 9], [3, 10], [7, 10], [9, 10]]) // n et m sont premiers entre eux
          const n = couplend[0]
          const d = couplend[1]
          if (choice([true, false])) {
            this.question = ` Réduire l'expression : $\\dfrac{${n}}{${d}}x-${rienSi1(a)}x$.`
            this.correction = `$\\dfrac{${n}}{${d}}x-${rienSi1(a)}x=\\dfrac{${n}}{${d}}x-\\dfrac{${a}\\times${d}}{${d}}x=\\dfrac{${n}}{${d}}x-\\dfrac{${a * d}}{${d}}x=\\dfrac{${n}-${a * d}}{${d}}x=\\dfrac{${n - a * d}}{${d}}x$`
            this.reponse = [`\\dfrac{${n - a * d}}{${d}}x`, `${arrondi((n - a * d) / d, 2)}x`]
          } else {
            this.question = ` Réduire l'expression : $${rienSi1(a)}x-\\dfrac{${n}}{${d}}x$.`
            this.correction = `$${rienSi1(a)}x-\\dfrac{${n}}{${d}}x=\\dfrac{${a}\\times ${d}}{${d}}x-\\dfrac{${n}}{${d}}x=\\dfrac{${a * d}}{${d}}x-\\dfrac{${n}}{${d}}x=\\dfrac{${a * d}-${n}}{${d}}x=\\dfrac{${a * d - n}}{${d}}x$`
            this.reponse = [`\\dfrac{${a * d - n}}{${d}}x`, `${arrondi((a * d - n) / d, 2)}x`]
          }
        }
        break

      case 3 :
        { const a = randint(1, 9)
          const d = randint(2, 9)
          if (choice([true, false])) {
            this.question = ` Réduire l'expression : $\\dfrac{x}{${d}}+${rienSi1(a)}x$.`
            this.correction = `$\\dfrac{x}{${d}}+${rienSi1(a)}x=\\dfrac{x}{${d}}+\\dfrac{${rienSi1(a)}x\\times ${d}}{${d}}=\\dfrac{x}{${d}}+\\dfrac{${a * d}x}{${d}}=\\dfrac{x+${a * d}x}{${d}}=\\dfrac{${1 + a * d}x}{${d}}=\\dfrac{${1 + a * d}}{${d}}x$`
            this.reponse = [`\\dfrac{${1 + a * d}}{${d}}x`, `${arrondi((1 + a * d) / d, 2)}x`]
          } else {
            this.question = ` Réduire l'expression : $${rienSi1(a)}x+\\dfrac{x}{${d}}$.`
            this.correction = ` $${rienSi1(a)}x+\\dfrac{x}{${d}}=\\dfrac{${rienSi1(a)}x\\times ${d}}{${d}}+\\dfrac{x}{${d}}=\\dfrac{${a * d}x}{${d}}+\\dfrac{x}{${d}}=\\dfrac{${a * d}x+x}{${d}}=\\dfrac{${1 + a * d}x}{${d}}=\\dfrac{${1 + a * d}}{${d}}x$`
            this.reponse = [`\\dfrac{${1 + a * d}}{${d}}x`, `${arrondi((1 + a * d) / d, 2)}x`]
          }
        }
        break

      case 4 :
        { const a = randint(1, 9)
          const d = randint(2, 9)
          if (choice([true, false])) {
            this.question = ` Réduire l'expression : $\\dfrac{x}{${d}}-${rienSi1(a)}x$.`
            this.correction = `$\\dfrac{x}{${d}}-${rienSi1(a)}x=\\dfrac{x}{${d}}-\\dfrac{${rienSi1(a)}x\\times ${d}}{${d}}=\\dfrac{x}{${d}}-\\dfrac{${a * d}x}{${d}}=\\dfrac{x-${a * d}x}{${d}}=\\dfrac{${1 - a * d}x}{${d}}=\\dfrac{${1 - a * d}}{${d}}x$`
            this.reponse = [`\\dfrac{${1 - a * d}}{${d}}x`, `${arrondi((1 - a * d) / d, 2)}x`]
          } else {
            this.question = ` Réduire l'expression : $${rienSi1(a)}x-\\dfrac{x}{${d}}$.`
            this.correction = ` $${rienSi1(a)}x-\\dfrac{x}{${d}}=\\dfrac{${rienSi1(a)}x\\times ${d}}{${d}}-\\dfrac{x}{${d}}=\\dfrac{${a * d}x}{${d}}-\\dfrac{x}{${d}}=\\dfrac{${a * d}x-x}{${d}}=\\dfrac{${a * d - 1}x}{${d}}=\\dfrac{${a * d - 1}}{${d}}x$`
            this.reponse = [`\\dfrac{${a * d - 1}}{${d}}x`, `${arrondi((a * d - 1) / d, 2)}x`]
          }
        }
        break
    }
    this.canEnonce = this.question// 'Compléter'
    this.canReponseACompleter = ''
  }
}
