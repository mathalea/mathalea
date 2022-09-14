
import { texNombre, randint, choice } from '../../../modules/outils.js'
import Decimal from 'decimal.js/decimal.mjs'
import Exercice from '../../Exercice.js'
export const titre = 'Calculer la moitié d’un nombre décimal'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '13/09/2022'

/*!
 * @author Gilles Mora
 *
 */

export default function CalculMoitieDecimal () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = choice([new Decimal(randint(1, 10) * 2 + 1).div(2), new Decimal(randint(0, 10) * 2 + 1).div(10)])
    this.reponse = new Decimal(a).div(2)
    this.question = `Calculer la moitié de $${texNombre(a, 1)}$.`
    this.correction = `$${texNombre(a, 1)}\\div 2=${texNombre(this.reponse, 2)}$
          `
  }
}
