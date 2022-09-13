import Exercice from '../../Exercice.js'
import { randint, ecritureAlgebriqueSauf1, reduireAxPlusB, rienSi1, ecritureParentheseSiNegatif } from '../../../modules/outils.js'
export const titre = 'Déterminer un coefficient dans un développement'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '11/06/2022'

/**
 *
 * @author Gilles Mora
 * Référence can1L07
*/
export const uuid = 'c1168'
export const ref = 'can1L07'
export default function DeveloppementCoeff () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let a, b, c, d
    a = randint(-8, 5, [0])
    b = randint(-5, 9, [0])
    c = randint(-5, 5, [0])
    d = randint(-5, 8, [0])
    if (a * d + b * c === 0) {
      a = randint(-8, 5, [0])
      b = randint(-5, 9, [0])
      c = randint(-5, 5, [0])
      d = randint(-5, 8, [0])
    }
    this.question = `Déterminer le coefficient de $x$ dans le développement réduit de l'expression : <br>
         $(${reduireAxPlusB(a, b)})(${reduireAxPlusB(c, d)})$
       `

    this.correction = `Le coefficient du terme en $x$ dans le développement de 
    $(${reduireAxPlusB(a, b)})(${reduireAxPlusB(c, d)})$ est la somme des produits :`
    if (c < 0) {
      this.correction += `
     $${rienSi1(a)}x\\times ${ecritureParentheseSiNegatif(d)}$ et $${b} \\times (${c}x)$,
     soit  $${rienSi1(a)}x\\times ${ecritureParentheseSiNegatif(d)}+${ecritureParentheseSiNegatif(b)} \\times (${rienSi1(c)}x)=
     ${rienSi1(a * d)}x${ecritureAlgebriqueSauf1(b * c)}x=${rienSi1(a * d + b * c)}x$.<br>
     Le coefficient devant $x$ est donc $${a * d + b * c}$.`
    } else {
      this.correction += `
     $${rienSi1(a)}x\\times ${ecritureParentheseSiNegatif(d)}$ et $${b} \\times ${rienSi1(c)}x$,
     soit  $${rienSi1(a)}x\\times ${ecritureParentheseSiNegatif(d)}+${ecritureParentheseSiNegatif(b)} \\times ${rienSi1(c)}x=${a * d}x${ecritureAlgebriqueSauf1(b * c)}x=${a * d + b * c}x$.<br>
     Le coefficient devant $x$ est donc $${a * d + b * c}$. `
    }

    this.reponse = a * d + b * c
  }
}
