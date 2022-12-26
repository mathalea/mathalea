import Exercice from '../../Exercice.js'
import { randint, choice, rienSi1 } from '../../../modules/outils.js'
export const titre = 'Écrire avec un seul quotient'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '08/12/2022'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can2L09
 * Date de publication
*/

export const uuid = '05bc2'
export const ref = 'can2L09'
export default function ÉcrireUnQuotient () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    switch (choice([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])) {
      case 1 :
        { const a = randint(1, 9)
          const b = randint(-9, 9, 0)
          this.question = ` Écrire avec un seul quotient : $${rienSi1(b)}x+\\dfrac{${a}}{x}$.`
          this.correction = `$${rienSi1(b)}x+\\dfrac{${a}}{x}=\\dfrac{${rienSi1(b)}x^2}{x}+\\dfrac{${a}}{x}=\\dfrac{${rienSi1(b)}x^2+${a}}{x}$`
          this.reponse = [`\\dfrac{${b}x^2+${a}}{x}`]
        }
        break
      case 2 :
        { const a = randint(1, 9)
          const b = randint(-9, 9, 0)
          this.question = ` Écrire avec un seul quotient : $${rienSi1(b)}x-\\dfrac{${a}}{x}$.`
          this.correction = `$${rienSi1(b)}x-\\dfrac{${a}}{x}=\\dfrac{${rienSi1(b)}x^2}{x}-\\dfrac{${a}}{x}=\\dfrac{${rienSi1(b)}x^2-${a}}{x}$`
          this.reponse = [`\\dfrac{${b}x^2-${a}}{x}`]
        }
        break
      case 3 :
        {
          const a = randint(1, 9)
          const b = randint(-9, 9, 0)

          this.question = ` Écrire avec un seul quotient : $${rienSi1(b)}x^2-\\dfrac{${a}}{x}$.`
          this.correction = `$${rienSi1(b)}x^2-\\dfrac{${a}}{x}=\\dfrac{${rienSi1(b)}x^3}{x}-\\dfrac{${a}}{x}=\\dfrac{${rienSi1(b)}x^3-${a}}{x}$`
          this.reponse = [`\\dfrac{${b}x^3-${a}}{x}`] }
        break
      case 4 :
        { const a = randint(1, 9)
          const b = randint(-9, 9, 0)
          this.question = ` Écrire avec un seul quotient : $${rienSi1(b)}x^2+\\dfrac{${a}}{x}$.`
          this.correction = `$${rienSi1(b)}x^2+\\dfrac{${a}}{x}=\\dfrac{${rienSi1(b)}x^3}{x}+\\dfrac{${a}}{x}=\\dfrac{${rienSi1(b)}x^3+${a}}{x}$`
          this.reponse = [`\\dfrac{${b}x^3+${a}}{x}`]
        }
        break
      case 5 :
        { const a = randint(1, 9)
          const b = randint(-9, 9, 0)
          this.question = ` Écrire avec un seul quotient : $${b}+\\dfrac{${a}}{x}$.`
          this.correction = `$${b}+\\dfrac{${a}}{x}=\\dfrac{${rienSi1(b)}x}{x}+\\dfrac{${a}}{x}=\\dfrac{${rienSi1(b)}x+${a}}{x}$`
          this.reponse = [`\\dfrac{${b}x+${a}}{x}`]
        }
        break
      case 6 :
        { const a = randint(1, 9)
          const b = randint(-9, 9, 0)
          this.question = ` Écrire avec un seul quotient : $${b}-\\dfrac{${a}}{x}$.`
          this.correction = `$${b}-\\dfrac{${a}}{x}=\\dfrac{${rienSi1(b)}x}{x}-\\dfrac{${a}}{x}=\\dfrac{${rienSi1(b)}x-${a}}{x}$`
          this.reponse = [`\\dfrac{${b}x-${a}}{x}`]
        }
        break

      case 7 :
        { const a = randint(1, 9)
          const b = randint(-9, 9, 0)
          this.question = ` Écrire avec un seul quotient : $${b}+\\dfrac{${a}}{x^2}$.`
          this.correction = `$${b}+\\dfrac{${a}}{x^2}=\\dfrac{${rienSi1(b)}x^2}{x^2}+\\dfrac{${a}}{x^2}=\\dfrac{${rienSi1(b)}x^2+${a}}{x^2}$`
          this.reponse = [`\\dfrac{${b}x^2+${a}}{x^2}`]
        }
        break
      case 8 :
        { const a = randint(1, 9)
          const b = randint(-9, 9, 0)
          this.question = ` Écrire avec un seul quotient : $${b}-\\dfrac{${a}}{x^2}$.`
          this.correction = `$${b}-\\dfrac{${a}}{x^2}=\\dfrac{${rienSi1(b)}x^2}{x^2}-\\dfrac{${a}}{x^2}=\\dfrac{${rienSi1(b)}x^2-${a}}{x^2}$`
          this.reponse = [`\\dfrac{${b}x^2-${a}}{x^2}`]
        }
        break
      case 9 :
        {
          const a = randint(2, 9)
          const b = randint(-9, 9, 0)

          this.question = ` Écrire avec un seul quotient : $${b}+\\dfrac{x}{${a}}$.`
          this.correction = `$${b}+\\dfrac{x}{${a}}=\\dfrac{${a * b}}{${a}}+\\dfrac{x}{${a}}=\\dfrac{${a * b}+x}{${a}}$`
          this.reponse = [`\\dfrac{${a * b}+x}{${a}}`]
        }
        break
      case 10 :
        { const a = randint(2, 9)
          const b = randint(-9, 9, 0)
          this.question = ` Écrire avec un seul quotient : $${b}-\\dfrac{x}{${a}}$.`
          this.correction = `$${b}-\\dfrac{x}{${a}}=\\dfrac{${a * b}}{${a}}-\\dfrac{x}{${a}}=\\dfrac{${a * b}-x}{${a}}$`
          this.reponse = [`\\dfrac{${a * b}-x}{${a}}`]
        }
        break
    }
    this.canEnonce = this.question// 'Compléter'
    this.canReponseACompleter = ''
  }
}
