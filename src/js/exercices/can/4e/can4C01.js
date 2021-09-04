import { choice, ecritureAlgebrique, ecritureParentheseSiNegatif, randint } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Priorité opératoire et relatifs'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 */
export default function PrioriteOperatoireEtRelatifs () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.interactif = true
  this.formatChampTexte = 'largeur25 inline'
  this.nouvelleVersion = function () {
    let a = randint(-12, 12, 0)
    const b = randint(-4, 4, [-1, 0, 1])
    const c = randint(2, 6)
    if (a > 0 && b > 0) {
      a = -a
    }
    if (choice([true, false])) {
      this.question = `$${a}${ecritureAlgebrique(b)}\\times ${c}$`
      this.correction = `$${a}${ecritureAlgebrique(b)}\\times ${c}=${a}${ecritureAlgebrique(b * c)}=${a + b * c}$`
    } else {
      this.question = `$${a}${ecritureAlgebrique(c)}\\times ${ecritureParentheseSiNegatif(b)}$`
      this.correction = `$${a}${ecritureAlgebrique(c)}\\times ${ecritureParentheseSiNegatif(b)}=${a}${ecritureAlgebrique(b * c)}=${a + b * c}$`
    }
    this.reponse = a + b * c
  }
}
