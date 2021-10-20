import Exercice from '../Exercice.js'
import { randint, rienSi1, ecritureParentheseSiNegatif, choice } from '../../modules/outils.js'
export const titre = 'Solution d’une inéquation'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
 * Date de publication
*/
export default function SolutionInequation () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  let a, b, c, d
  this.nouvelleVersion = function () {
    a = randint(1, 4)
    b = randint(1, 4)
    c = randint(2, 5)
    d = randint(-3, 3)
    switch (choice(['a', 'b', 'c', 'd'])) {
      case 'a':
        this.question = `$${d}$ est solution de l'inéquation &nbsp $${rienSi1(a)}x+${b}>${c}$.<br>
    Vrai (V) ou Faux (F).`
        if (a * d + b > c) {
          this.correction = `$${d}$ est solution car : $${rienSi1(a)}\\times ${ecritureParentheseSiNegatif(d)}+${b}>${c}$.`
          this.reponse = 'V'
        } else {
          this.correction = `$${d}$ n'est pas  solution car : $${rienSi1(a)}\\times ${ecritureParentheseSiNegatif(d)}+${b}<${c}$.`
          this.reponse = 'F'
        }
        break
      case 'b' :
        this.question = `$${d}$ est solution de l'inéquation&nbsp  $${rienSi1(a)}x^2-${b}>${c}$.<br>
        Vrai (V) ou Faux (F).`
        if (a * d * d - b > c) {
          this.correction = `$${d}$ est solution car : $${rienSi1(a)}\\times ${ecritureParentheseSiNegatif(d)}^2-${b}>${c}$.`
          this.reponse = 'V'
        } else {
          this.correction = `$${d}$ n'est pas  solution car : $${rienSi1(a)}\\times ${ecritureParentheseSiNegatif(d)}^2-${b}<${c}$.`
          this.reponse = 'F'
        }
        break
    }
  }
}
