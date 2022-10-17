import Exercice from '../../Exercice.js'
import { randint, ecritureAlgebriqueSauf1, reduireAxPlusB, rienSi1, ecritureParentheseSiNegatif } from '../../../modules/outils.js'
export const titre = 'Déterminer un coefficient dans un développement*'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '11/06/2022'

/**
 *
 * @author Gilles Mora
 * Référence can1L07
*/
export const uuid = 'cbbbb'
export const ref = 'can1L08'
export default function DeveloppementCoeff2 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let a, b, c, d
    a = randint(-3, 3, [0])
    b = randint(-3, 3, [0])
    c = randint(-2, 5, [-1, 0])
    d = randint(-2, 5, [0])
    const e = randint(1, 3, [0])
    const f = randint(-9, 9, [0])
    if (a * d + b * c === 0) {
      a = randint(-8, 5, [0])
      b = randint(-5, 9, [0])
      c = randint(-5, 5, [0])
      d = randint(-5, 8, [0])
    }
    this.question = `Déterminer le coefficient de $x$ dans le développement réduit de l'expression : <br>
         $ (${reduireAxPlusB(e, f)})^2+(${reduireAxPlusB(a, b)})(${reduireAxPlusB(c, d)})$
       `
    if (f > 0) {
      this.correction = `$\\bullet$ Le coefficient du terme en $x$ dans le développement de 
       $(${reduireAxPlusB(e, f)})^2$ est $2\\times ${rienSi1(e)}x\\times ${f}=${2 * e * f}x$. <br>`
    } else {
      this.correction = `$\\bullet$ Le coefficient du terme en $x$ dans le développement de 
       $(${reduireAxPlusB(e, f)})^2$ est $-2\\times ${rienSi1(e)}x\\times ${-f}=${2 * e * f}x$.<br>`
    }
    this.correction += `$\\bullet$ Le coefficient du terme en $x$ dans le développement de 
    $(${reduireAxPlusB(a, b)})(${reduireAxPlusB(c, d)})$ est la somme des produits :`
    if (c < 0) {
      this.correction += `
     $${rienSi1(a)}x\\times ${ecritureParentheseSiNegatif(d)}$ et $${b} \\times (${c}x)$,
     soit  $${rienSi1(a)}x\\times ${ecritureParentheseSiNegatif(d)}+${ecritureParentheseSiNegatif(b)} \\times (${rienSi1(c)}x)=
     ${rienSi1(a * d)}x${ecritureAlgebriqueSauf1(b * c)}x=${rienSi1(a * d + b * c)}x$.<br>
     `
    } else {
      this.correction += `
     $${rienSi1(a)}x\\times ${ecritureParentheseSiNegatif(d)}$ et $${b} \\times ${rienSi1(c)}x$,
     soit  $${rienSi1(a)}x\\times ${ecritureParentheseSiNegatif(d)}+${ecritureParentheseSiNegatif(b)} \\times ${rienSi1(c)}x=${a * d}x${ecritureAlgebriqueSauf1(b * c)}x=${rienSi1(a * d + b * c)}x$.<br>
      `
    }
    this.correction += `
     Le terme en $x$ est donc donné par la somme :  $${2 * e * f}x +${ecritureParentheseSiNegatif(rienSi1(a * d + b * c))}x=${2 * e * f + a * d + b * c}x$.<br>
     Le coefficient devant $x$ est donc $${2 * e * f + a * d + b * c}$.`

    this.reponse = 2 * e * f + a * d + b * c
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
