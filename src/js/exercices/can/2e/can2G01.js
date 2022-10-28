import { choice } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
import FractionEtendue from '../../../modules/FractionEtendue.js'
export const titre = 'Déterminer un agrandissement/réduction avec fraction'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Gilles Mora
 * Créé pendant l'été 2021
 * Référence can2G01
 */
export const uuid = '4a666'
export const ref = 'can2G01'
export default function AgrandissementReductionGFraction () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.formatInteractif = 'fraction'
  this.nouvelleVersion = function () {
    const listeFractions = [
      [1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 6], [5, 6], [1, 7],
      [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [1, 8], [3, 8], [5, 8], [7, 8], [1, 9], [2, 9],
      [4, 9], [5, 9], [7, 9], [8, 9], [1, 10], [3, 10], [7, 10], [9, 10]
    ] // Couples de nombres premiers entre eux
    let n, d, fraction
    switch (choice(['a', 'b'])) {
      case 'a':
        fraction = choice(listeFractions)
        n = fraction[0]
        d = fraction[1]

        this.question = `Les longueurs d'un triangle sont multipliées par $\\dfrac{${n}}{${d}}$.<br>
        
        Par quelle fraction est multipliée son aire  ?
        `

        this.reponse = new FractionEtendue(n * n, d * d)
        this.correction = ` Si les longueurs sont multiplées par $k$, les aires sont multipliées par $k^2$.<br>
        Ainsi, l'aire a été multipliée par : $\\left(\\dfrac{${n}}{${d}}\\right)^2=\\dfrac{${n * n}}{${d * d}}$.
          `
        break
      case 'b':
        fraction = choice(listeFractions)
        n = fraction[0]
        d = fraction[1]

        this.question = `L'aire d'un parallélogramme a été multipliée par $\\dfrac{${n * n}}{${d * d}}$.<br>

        Par quelle fraction ont été multipliées les longueurs de ses côtés ?
        `
        this.optionsChampTexte = { texteApres: '' }
        this.reponse = new FractionEtendue(n, d)
        this.correction = `Si les aires sont multiplées par $k$, les longueurs sont multipliées par $\\sqrt{k}$.<br>
        Ainsi, les longueurs ont été multipliées par  : $\\sqrt{\\dfrac{${n * n}}{${d * d}}}=\\dfrac{${n}}{${d}}$.
    <br>`
        break
    }
    this.canEnonce = this.question// 'Compléter'
    this.canReponseACompleter = ''
  }
}
