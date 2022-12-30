import Exercice from '../../Exercice.js'
import { randint, choice, rienSi1, arrondi } from '../../../modules/outils.js'
import FractionX from '../../../modules/FractionEtendue.js'
export const titre = 'Simplifier un quotient'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '30/12/2022'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can2L10
 * Date de publication
*/


export default function SimplifierQuotient () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    switch (choice([1])) {
      case 1 ://ax/b 
        { const a = randint(2, 9)
                   const k = randint(-9, 9, [0,1])
          const maFraction1 = new FractionX(a, k*a)
          const maFraction2 = maFraction1.inverse()
         if(choice([true, false])) {
          this.question = ` Simplifier l'écriture fractionnaire : $\\dfrac{${a}x}{${k*a}}$.`
          this.correction = `$\\dfrac{${a}x}{${k*a}}=\\dfrac{${a}x}{${k}\\times ${a}}=\\dfrac{x}{${k}}=${maFraction1.texFractionSimplifiee}x$`
          this.reponse = [`\\dfrac{x}{${k}}`, `${arrondi(1/k,2)}x`]}
          else{this.question = ` Simplifier l'écriture fractionnaire : $\\dfrac{${k*a}x}{${a}}$.`
          this.correction = `$\\dfrac{${k*a}x}{${a}}=\\dfrac{${a}\\times ${k}x}{${a}}=${k}x$`
          this.reponse = [`${k}x`]}
         
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
