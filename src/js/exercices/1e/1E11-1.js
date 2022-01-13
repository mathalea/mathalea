
import Exercice from '../Exercice'
import { toTex, aleaVariables } from '../../modules/outilsMathjs'
import { simplify } from 'mathjs'
export const titre = 'calculer le discriminant d\'un polynôme du second degré'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 */
export default function calculDiscrimant () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.nouvelleVersion = function () {
    this.autoCorrection = []

    const variables = aleaVariables(
      {
        a: 'randomInt(1,5) * pickRandom([-1, 1])',
        b: 'randomInt(-5, 5)',
        c: 'randomInt(-5, 5)',
        disc: 'b^2-4*a*c'
      }
    )
    const polynomeTex = toTex(simplify('a*x^2+b*x+c', [], variables))
    const discriminantTex = toTex(simplify('b^2-4*a*c', [], variables))

    this.correction = `$\\Delta = b^2-4ac=${discriminantTex}=${variables.disc}$`
    this.question = `Le discriminant de $${polynomeTex}$ est : `
    this.reponse = variables.disc
  }
}
