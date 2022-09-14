
import { texNombre, randint } from '../../../modules/outils.js'
import Decimal from 'decimal.js/decimal.mjs'
import Exercice from '../../Exercice.js'
export const titre = 'Calculer la moitié d’un nombre impair'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '13/09/2022'

/*!
 * @author Gilles Mora
 *
 */

export default function CalculMoitieImpair () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(3, 48) * 2 + 1

    this.reponse = new Decimal(a).div(2)
    this.question = `Calculer la moitié de $${a}$. `
    this.correction = `$${a}\\div 2=${texNombre(this.reponse)}$
          `
  }
}
