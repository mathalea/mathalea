import Exercice from '../../Exercice.js'
import { randint, choice, ecritureAlgebriqueSauf1, ecritureAlgebrique, ecritureParentheseSiNegatif, rienSi1, reduireAxPlusB, reduirePolynomeDegre3 } from '../../../modules/outils.js'
export const titre = 'Déterminer un nombre dérivé'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '20/06/2022'

/**
 *
 * @author Gilles Mora

*/
export const uuid = 'a1ba2'
export const ref = 'can1F14'
export default function NombreDerivee () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let a, b, c, nbre
    switch (choice([1, 2, 3])) { //
      case 1:// second degre ax^2+bx+c
        a = randint(-5, 5, [0])
        b = randint(-5, 5, [0])
        c = randint(-10, 10, [0])
        nbre = randint(-3, 3)

        this.question = `Soit $f$ la fonction définie sur $\\mathbb{R}$ par : $f(x)= ${reduirePolynomeDegre3(0, a, b, c)}$.<br>
       Déterminer $f'(${nbre})$.`

        this.correction = `$f$ est une fonction polynôme du second degré de la forme $f(x)=ax^2+bx+c$.<br>
    La fonction dérivée est donnée par la somme des dérivées des fonctions $u$ et $v$ définies par $u(x)=${rienSi1(a)}x^2$ et $v(x)=${reduireAxPlusB(b, c)}$.<br>
     Comme $u'(x)=${2 * a}x$ et $v'(x)=${b}$, on obtient  $f'(x)=${reduireAxPlusB(2 * a, b)}$. <br>
     Ainsi, $f'(${nbre})=${2 * a}\\times ${ecritureParentheseSiNegatif(nbre)}${ecritureAlgebrique(b)}=${2 * a * nbre + b}$.`

        this.reponse = 2 * a * nbre + b
        break

      case 2:// second degre bx+c+ax^2 ou c+ax^2+bx
        a = randint(-5, 5, [0])
        b = randint(-5, 5, [0])
        c = randint(-10, 10, [0])
        nbre = randint(-3, 3)
        if (choice([true, false])) {
          this.question = `Soit $f$ la fonction définie sur $\\mathbb{R}$ par : $f(x)= ${reduireAxPlusB(b, c)}${ecritureAlgebriqueSauf1(a)}x^2$.<br>
            Déterminer $f'(${nbre})$.`
        } else {
          this.question = `Soit $f$ la fonction définie sur $\\mathbb{R}$ par : $f(x)= ${c}${ecritureAlgebriqueSauf1(a)}x^2${ecritureAlgebriqueSauf1(b)}x$.<br>
            Déterminer $f'(${nbre})$.`
        }
        this.correction = `$f$ est une fonction polynôme du second degré de la forme $f(x)=ax^2+bx+c$.<br>
    La fonction dérivée est donnée par la somme des dérivées des fonctions $u$ et $v$ définies par $u(x)=${rienSi1(a)}x^2$ et $v(x)=${reduireAxPlusB(b, c)}$.<br>
     Comme $u'(x)=${2 * a}x$ et $v'(x)=${b}$, on obtient  $f'(x)=${reduireAxPlusB(2 * a, b)}$. <br>
     Ainsi, $f'(${nbre})=${2 * a}\\times ${ecritureParentheseSiNegatif(nbre)}${ecritureAlgebrique(b)}=${2 * a * nbre + b}$.`
        this.reponse = 2 * a * nbre + b

        break

      case 3:// second degre ax^2+c ou c+ax^2
        a = randint(-10, 10, [0])
        c = randint(-10, 10, [0])
        nbre = randint(-5, 5)
        if (choice([true, false])) {
          this.question = `Soit $f$ la fonction définie sur $\\mathbb{R}$ par : $f(x)= ${reduirePolynomeDegre3(0, a, 0, c)}$.<br>
            Déterminer $f'(${nbre})$.`
        } else {
          this.question = `Soit $f$ la fonction définie sur $\\mathbb{R}$ par : $f(x)= ${c}${ecritureAlgebriqueSauf1(a)}x^2$.<br>
            Déterminer $f'(${nbre})$.`
        }

        this.correction = `$f$ est une fonction polynôme du second degré de la forme $f(x)=ax^2+b$.<br>
    La fonction dérivée est donnée par la somme des dérivées des fonctions $u$ et $v$ définies par $u(x)=${rienSi1(a)}x^2$ et $v(x)=${c}$.<br>
     Comme $u'(x)=${2 * a}x$ et $v'(x)=0$, on obtient  $f'(x)=${reduireAxPlusB(2 * a, 0)}$. <br>
     Ainsi, $f'(${nbre})=${2 * a}\\times ${ecritureParentheseSiNegatif(nbre)}=${2 * a * nbre}$.`

        this.reponse = 2 * a * nbre
        break
    }
  }
}
