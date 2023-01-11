
import { choice, randint, texNombre, arrondi } from '../../../modules/outils.js'
import FractionX from '../../../modules/FractionEtendue.js'
import Exercice from '../../Exercice.js'
import Decimal from 'decimal.js'
export const titre = 'Passer d\'une fraction à un décimal'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '10/01/2023'

/*!
 * @author Gilles Mora
 *
 */

export const uuid = '7a0b1'
export const ref = 'can4C13'
export default function CalculFractionDecimal () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatInteractif = 'calcul'
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const n = randint(1, 9)
    const a = choice([2, 4, 8])
    const d = new Decimal(a).div(10)

    const f = new FractionX(n * 10, d * 10).simplifie()
    const reponse = arrondi(n / d, 2)
    this.reponse = reponse
    this.question = `Écrire  $\\dfrac{${n}}{${texNombre(d, 1)}}$ sous la forme d'un décimal ou d'un entier.`
    if (arrondi((a * 10) / (10 * d), 0) === arrondi((a * 10) / (10 * d), 1)) {
      this.correction = ` $\\dfrac{${n}}{${texNombre(d, 1)}}=\\dfrac{${n}\\times 10}{${texNombre(d, 1)}\\times 10}=\\dfrac{${n * 10}}{${texNombre(d * 10, 0)}}=${texNombre(reponse, 2)}$
          `
    } else {
      this.correction = ` $\\dfrac{${n}}{${texNombre(d, 1)}}=\\dfrac{${n}\\times 10}{${texNombre(d, 1)}\\times 10}=\\dfrac{${n * 10}}{${texNombre(d * 10, 0)}}=${f.texFraction}=${texNombre(reponse, 2)}$
          `
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
