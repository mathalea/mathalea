import { choice } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
import FractionX from '../../../modules/FractionEtendue.js'
export const titre = 'Comparer deux fractions*'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '04/11/2022'
/*!
 * @author Gilles Mora
 */

export const uuid = '16c8e'
export const ref = 'can6C44'
export default function ComparerFraction () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    const listeFractions1 = [[7, 8, 11, 8], [5, 8, 7, 8], [4, 11, 7, 11], [2, 11, 10, 11],
      [8, 15, 13, 15], [14, 33, 17, 33], [34, 45, 37, 45], [18, 35, 19, 35], [14, 47, 37, 47], [11, 35, 31, 35],
      [12, 25, 16, 25], [15, 19, 17, 19], [8, 15, 11, 15], [14, 27, 17, 27],
      [17, 32, 25, 32], [3, 7, 6, 7], [16, 35, 21, 35], [11, 26, 15, 26],
      [9, 13, 10, 13], [21, 40, 27, 40], [8, 15, 14, 15], [13, 22, 15, 22]]

    const listeFractions2 = [[47, 25, 51, 25], [9, 8, 11, 8], [15, 11, 19, 11], [14, 5, 17, 5], [9, 7, 15, 7], [16, 3, 22, 3],
      [53, 45, 71, 45], [49, 45, 52, 45], [18, 7, 23, 7], [45, 16, 51, 16], [19, 3, 25, 3], [14, 9, 19, 9],
      [50, 41, 55, 41], [53, 46, 59, 46], [15, 7, 27, 7], [17, 4, 21, 4], [19, 4, 25, 4], [10, 7, 27, 7],
      [13, 10, 12, 13], [27, 12, 35, 12], [21, 11, 25, 11],
      [14, 5, 11, 5], [7, 3, 11, 3]
    ]
    this.formatChampTexte = 'largeur12 inline'
    this.formatInteractif = 'texte'

    const fraction1 = choice(listeFractions1)
    const fraction2 = choice(listeFractions2)
    const a = choice([new FractionX(fraction1[0], fraction1[1])], [new FractionX(fraction1[2], fraction1[3])])
    const b = choice([new FractionX(fraction2[0], fraction2[1])], [new FractionX(fraction2[2], fraction2[3])])
    if (choice([true, false])) { // <plus petit que 1>
      this.question = 'Compléter avec $>$ ou $<$ : <br>'
      this.question += `$${a.texFraction}$ $\\ldots$ $${b.texFraction}$`
      this.correction = `$${a.texFraction} <1$ et $${b.texFraction}>1$.<br>
      On en déduit : $${a.texFraction}<${b.texFraction}$.`
      this.reponse = '<'
      this.canEnonce = 'Compléter avec $>$ ou $<$.'
      this.canReponseACompleter = `$${a.texFraction}$ $\\ldots$ $${b.texFraction}$`
    } else { // >
      this.question = 'Compléter avec $>$ ou $<$ : <br>'
      this.question += `$${b.texFraction}$ $\\ldots$ $${a.texFraction}$`
      this.correction = `$${b.texFraction} >1$ et $${a.texFraction}<1$.<br>
      On en déduit : $${b.texFraction}>${a.texFraction}$.`
      this.reponse = '>'
      this.canEnonce = 'Compléter avec $>$ ou $<$.'
      this.canReponseACompleter = `$${b.texFraction}$ $\\ldots$ $${a.texFraction}$`
    }
  }
}
