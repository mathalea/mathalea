import { choice, ecritureAlgebrique, ecritureParentheseSiNegatif, randint } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Utiliser les priorités opératoires avec des relatifs'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can4C01
 */
export default function PrioriteOperatoireEtRelatifs () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur25 inline'
  this.nouvelleVersion = function () {
    let a = randint(-12, 12, 0)
    const b = randint(-4, 4, [-1, 0, 1])
    const c = randint(2, 6)
    if (a > 0 && b > 0) {
      a = -a
    }
    if (choice([true, false])) {
      this.question = `$${a}${ecritureAlgebrique(b)}\\times ${c}=$`
      this.correction = `La multiplication étant priotitaire sur l'addition, on commence par effectuer  le produit $${b}\\times ${ecritureParentheseSiNegatif(c)}=${b * c}$.<br>
      Ainsi, $${a}${ecritureAlgebrique(b)}\\times ${c}=${a}${ecritureAlgebrique(b * c)}=${a + b * c}$`
    } else {
      this.question = `$${a}${ecritureAlgebrique(c)}\\times ${ecritureParentheseSiNegatif(b)}$`
      this.correction = `La multiplication étant priotitaire sur l'addition, on commence par effectuer  le produit $${c}\\times ${ecritureParentheseSiNegatif(b)}=${b * c}$.<br>
      Ainsi, $${a}${ecritureAlgebrique(c)}\\times ${ecritureParentheseSiNegatif(b)}=${a}${ecritureAlgebrique(b * c)}=${a + b * c}$`
    }
    this.reponse = a + b * c
  }
}
