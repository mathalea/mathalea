import Exercice from '../../Exercice.js'
import { randint, choice, ecritureParentheseSiNegatif, ecritureAlgebrique } from '../../../modules/outils.js'
import FractionX from '../../../modules/FractionEtendue.js'
export const titre = 'Calculer avec un programme de calcul*'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '16/11/2022'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
 * ref can2C16
*/

export default function ProgrammeCalcul2 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  // ${texNombrec(ecritureParenthesesSiNegatif(a / 5 - e))}^2=${texNombrec((a / 5 - e) * (a / 5 - e))}$
  this.nouvelleVersion = function () {
    let a, b, reponse, f1, f2

    switch (choice([6])) { //, 2, 2
      case 1:// x^2+y^2
        a = randint(-5, 5, 0)
        b = randint(-10, 10, [0, a])

        reponse = a ** 2 + b ** 2
        this.question = `Choisir deux nombres puis calculer la somme de leurs carrés.  <br>
      
     Quel résultat obtient-on si on choisit comme nombres $${a}$ et $${b}$ ?`
        this.correction = `$${ecritureParentheseSiNegatif(a)}^2+${ecritureParentheseSiNegatif(b)}^2=${reponse}$
      `

        this.reponse = reponse

        break
      case 2:// (x+y)^2
        a = randint(-5, 5, 0)
        b = randint(-7, 7, [0, a])

        reponse = (a + b) ** 2
        this.question = `Choisir deux nombres puis calculer le carré de leur somme.  <br>
      
     Quel résultat obtient-on si on choisit comme nombres $${a}$ et $${b}$ ?`
        this.correction = `$(${a}${ecritureAlgebrique(b)})^2=${reponse}$
      `

        this.reponse = reponse

        break

      case 3:// 2(x+y)^2
        a = randint(-5, 5, 0)
        b = randint(-5, 5, [0, a])

        reponse = 2 * (a + b) ** 2
        this.question = `Choisir deux nombres puis calculer le double du carré de leur somme.  <br>
      
     Quel résultat obtient-on si on choisit comme nombres $${a}$ et $${b}$ ?`
        this.correction = `$2\\times (${a}${ecritureAlgebrique(b)})^2=2\\times ${(a + b) ** 2}=${reponse}$
      `

        this.reponse = reponse

        break

      case 4:// 2(x*y)et 2*(x+y)

        if (choice([true, false])) {
          a = randint(-10, 10, 0)
          b = randint(-5, 5, [0, a])
          reponse = 2 * a * b
          this.question = `Choisir deux nombres puis calculer le double de leur produit.  <br>
      
     Quel résultat obtient-on si on choisit comme nombres $${a}$ et $${b}$ ?`
          this.correction = `$2\\times${ecritureParentheseSiNegatif(a)}\\times ${ecritureParentheseSiNegatif(b)} =${reponse}$
      `

          this.reponse = reponse
        } else {
          a = randint(-10, 10, 0)
          b = randint(-10, 10, [0, a, -a])
          reponse = 2 * (a + b)
          this.question = `Choisir deux nombres puis calculer le double de leur somme.  <br>
          
         Quel résultat obtient-on si on choisit comme nombres $${a}$ et $${b}$ ?`
          this.correction = `$2\\times(${a}+${ecritureParentheseSiNegatif(b)}) =${reponse}$
          `

          this.reponse = reponse
        }

        break

      case 5:// 1/x+1/y
        a = randint(-10, 10, 0)
        b = randint(-4, 4, 0) * a
        f1 = new FractionX(1, a)
        f2 = new FractionX(1, b)
        this.formatInteractif = 'fractionEgale'
        reponse = new FractionX((f1).add(f2))
        this.question = `Choisir deux nombres puis calculer la somme de leur inverse.  <br>
      
     Quel résultat obtient-on si on choisit comme nombres $${a}$ et $${b}$ ?`
        this.correction = `L'inverse de $${a}$ est : $${f1.texFraction}$ ;<br>
        L'inverse de $${b}$ est : $${f2.texFraction}$ ;<br>
        La somme des inverses est donc : $${f1.texFraction}+${f2.texFraction}=\\dfrac{1\\times${ecritureParentheseSiNegatif(b / a)}}{${a}\\times${ecritureParentheseSiNegatif(b / a)}}+${f2.texFraction}=
        \\dfrac{${(b / a)}}{${b}}+${f2.texFraction}=
        \\dfrac{${(b / a + f2.n)}}{${b}}=
         ${reponse.texFractionSimplifiee}$
      `

        this.reponse = reponse

        break

      case 6:// 1/(x+y)
        a = randint(-10, 10, 0)
        b = randint(-10, 10, [0, -a])

        this.formatInteractif = 'fractionEgale'
        reponse = new FractionX(1, a + b)
        this.question = `Choisir deux nombres puis calculer l'inverse de leur somme.  <br>
      
     Quel résultat obtient-on si on choisit comme nombres $${a}$ et $${b}$ ?`
        this.correction = `La somme de $${a}$ et $${b}$ est $${a + b}$. <br>
        Son inverse est : $${reponse.texFractionSimplifiee}$.
      `

        this.reponse = reponse

        break

      case 7:// 1/x+y
        a = randint(-10, 10, 0)
        b = randint(-10, 10, [0, -a])

        this.formatInteractif = 'fractionEgale'
        reponse = new FractionX(1, a + b)
        this.question = `Choisir deux nombres puis calculer l'inverse de leur somme.  <br>
      
     Quel résultat obtient-on si on choisit comme nombres $${a}$ et $${b}$ ?`
        this.correction = `La somme de $${a}$ et $${b}$ est $${a + b}$. <br>
        Son inverse est : $${reponse.texFractionSimplifiee}$.
      `

        this.reponse = reponse

        break
    }
    this.canEnonce = this.question// 'Compléter'
    this.canReponseACompleter = ''
  }
}
