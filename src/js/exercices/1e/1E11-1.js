
import Exercice from '../Exercice'
import { choice, ecritureAlgebrique, ecritureAlgebriqueSauf1, randint } from '../../modules/outils'
export const titre = 'calculer le discriminant d\'un polynôme du second degré'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 */
export default function NombrePairFois5 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.nouvelleVersion = function () {
    this.autoCorrection = []
    const a = randint(1, 5) * choice([-1, 1])
    const b = randint(-5, 5)
    const c = randint(-5, 5)
    const d = b * b - 4 * a * c
    if (b === 0) { this.question = `Le discriminant de  $${ecritureAlgebriqueSauf1(a)}x^2$` } else { this.question = `Le discriminant de  $${ecritureAlgebriqueSauf1(a)}x^2${ecritureAlgebriqueSauf1(b)}x$` }
    if (c !== 0) { this.question += `$${ecritureAlgebrique(c)}$` }
    this.question += '  est '
    this.correction = `$\\Delta =b^2-4ac=${b}^2 - 4 \\times ${a} \\times ${c}=${b * b - 4 * a * c}$`
    this.reponse = d
  }
}
