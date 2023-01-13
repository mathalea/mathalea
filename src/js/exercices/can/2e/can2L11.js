import Exercice from '../../Exercice.js'
import { randint, choice, rienSi1, arrondi, ecritureAlgebrique, ecritureAlgebriqueSauf1 } from '../../../modules/outils.js'
export const titre = 'Exprimer une variable en fonction d\'une autre'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '12/01/2023'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can2L11
 * Date de publication
*/

export default function ExprimerVariable () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    { const a = randint(-9, 9, 0)
      const b = randint(-5, 9, [0, a, -a])
      const c = randint(-9, 9, 0)
      const Variable1 = ['x', 'z', 't', 'u', 'a', 'r', 'c']
      const var1 = choice(Variable1)
      const Variable2 = ['b', 'f', 'h', 'm', 'n', 'g']
      const var2 = choice(Variable2)
      const corr1 = `De la relation $${rienSi1(a)}${var1}${ecritureAlgebriqueSauf1(b)}${var2}=${c}$, on déduit en ajoutant $${rienSi1(-b)}${var2}$ dans chaque membre :
          $${rienSi1(a)}${var1}=${c}${ecritureAlgebrique(-b)}${var2}$.<br>`
      const corr2 = ` Puis, en divisant par $${a}$, on obtient $${var1}=\\dfrac{${c}${ecritureAlgebriqueSauf1(-b)}${var2}}{${a}}$`
      const corr3 = `De la relation $${rienSi1(a)}${var1}${ecritureAlgebriqueSauf1(b)}${var2}=${c}$, on déduit en ajoutant $${rienSi1(-a)}${var1}$ dans chaque membre :
          $${rienSi1(b)}${var2}=${c}${rienSi1(ecritureAlgebrique(-a))}${var1}$.<br>`
      const corr4 = ` Puis, en divisant par $${b}$, on obtient $${var2}=\\dfrac{${c}${ecritureAlgebriqueSauf1(-a)}${var1}}{${b}}$`

      if (choice([true, false])) {
        this.question = ` On donne la relation  : $${rienSi1(a)}${var1}${ecritureAlgebriqueSauf1(b)}${var2}=${c}$.<br>
        
        Exprimer $${var1}$ en fonction de $${var2}$.`
        if (a === 1) {
          this.correction = `${corr1}`
        } else {
          if (a > 0) {
            this.correction = `${corr1}`
            this.correction += `${corr2}.`
          } else {
            this.correction = `${corr1}`
            this.correction += `${corr2}`
            this.correction += ` que l'on peut écrire également $${var1}=\\dfrac{${-c}${ecritureAlgebriqueSauf1(b)}${var2}}{${-a}}$.`
          }
        }
        this.reponse = [`${var1}=\\dfrac{${c}-${b}${var2}}{${a}}`,
            `${var1}=\\dfrac{${c}+${-b}${var2}}{${a}}`,
            `${var1}=\\dfrac{${-c}+${b}${var2}}{${-a}}`,
            `${var1}=\\dfrac{${-c}}{${-a}}+\\dfrac{${b}}{${-a}}${var2}`,
            `${var1}=\\dfrac{${-c}}{${-a}}+\\dfrac{${b}${var2}}{${-a}}`,
            `${var1}=\\dfrac{${c}}{${a}}+\\dfrac{${-b}}{${a}}${var2}`,
            `${var1}=\\dfrac{${c}}{${a}}+\\dfrac{${-b}${var2}}{${a}}`,
            `${var1}=${arrondi(c / a, 2)}+\\dfrac{${-b}${var2}}{${a}}`,
            `${var1}=${arrondi(c / a, 2)}+\\dfrac{${-b}}{${a}}${var2}`,
             `${var1}=${arrondi(c / a, 2)}+${arrondi(-b / a, 2)}${var2}`,
              `${var1}=\\dfrac{${c}}{${a}}+${arrondi(-b / a, 2)}${var2}`]
      } else {
        this.question = ` On donne la relation  : $${rienSi1(a)}${var1}${ecritureAlgebriqueSauf1(b)}${var2}=${c}$.<br>
        
        Exprimer $${var2}$ en fonction de $${var1}$.`
        if (b === 1) {
          this.correction = `${corr3}`
        } else {
          if (b > 0) {
            this.correction = `${corr3}`
            this.correction += `${corr4}.`
          } else {
            this.correction = `${corr3}`
            this.correction += `${corr4}`
            this.correction += ` que l'on peut écrire également $${var2}=\\dfrac{${-c}${ecritureAlgebriqueSauf1(a)}${var1}}{${-b}}$.`
          }
        }
        this.reponse = [`${var2}=\\dfrac{${c}-${b}${var1}}{${a}}`,
                `${var2}=\\dfrac{${c}+${-a}${var1}}{${b}}`,
                `${var2}=\\dfrac{${-c}+${a}${var1}}{${-b}}`,
                `${var2}=\\dfrac{${-c}}{${-b}}+\\dfrac{${a}}{${-b}}${var1}`,
                `${var2}=\\dfrac{${-c}}{${-b}}+\\dfrac{${a}${var1}}{${-b}}`,
                `${var2}=\\dfrac{${c}}{${b}}+\\dfrac{${-a}}{${b}}${var1}`,
                `${var2}=\\dfrac{${c}}{${b}}+\\dfrac{${-a}${var1}}{${b}}`,
                    `${var2}=${arrondi(c / b, 2)}+\\dfrac{${-a}${var1}}{${b}}`,
                `${var2}=${arrondi(c / b, 2)}+\\dfrac{${-a}}{${b}}${var1}`,
                 `${var2}=${arrondi(c / b, 2)}+${arrondi(-a / b, 2)}${var1}`,
                  `${var2}=\\dfrac{${c}}{${b}}+${arrondi(-a / b, 2)}${var1}`]
      }
    }

    this.canEnonce = this.question// 'Compléter'
    this.canReponseACompleter = ''
  }
}
