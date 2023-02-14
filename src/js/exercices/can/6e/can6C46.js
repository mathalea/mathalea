import { choice, prenomF, prenomM, rangeMinMax, miseEnEvidence } from '../../../modules/outils.js'
import { mathalea2d } from '../../../modules/2dGeneralites.js'
import { context } from '../../../modules/context.js'//
import FractionX from '../../../modules/FractionEtendue.js'
import Exercice from '../../Exercice.js'
import { fractionCliquable } from '../../../modules/2dinteractif.js'
export const titre = 'Résoudre un problème de reste en fraction'
export const interactifReady = true
export const interactifType = 'mathLive'

export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '13/02/2023'

/*!
 * @author Gilles Mora
 * Référence can6C46
 */

export const uuid = '1cee6'
export const ref = 'can6C46'
export default function ProblemeResteFraction () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.formatInteractif = 'fractionEgale'
  this.nouvelleVersion = function () {
    const listeFractions1 = [[1, 3], [1, 5], [2, 3], [3, 4], [2, 5], [4, 5],
      [1, 6], [5, 6], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [1, 8], [3, 8], [5, 8], [7, 8],
      [1, 9], [2, 9], [4, 9], [5, 9], [7, 9], [8, 9]]
    const listeVille = [['La Rochelle'], ['Bordeaux'], ['Nancy'], ['Metz'], ['Paris'],
      ['Montpellier'], ['Marseille'], ['Nice'], ['Lyon'], ['Nantes'], ['Strasbourg'],
      ['Toulouse']]
    const fraction1 = choice(listeFractions1)
    const Ville1 = choice(listeVille)
    const n1 = fraction1[0]
    const d1 = fraction1[1]
    const f1 = new FractionX(n1, d1)
    const f2 = new FractionX(d1 - n1, d1)
    const p1 = prenomF()
    const p2 = prenomM()
    const longueur = 15

    const schemaCorr = fractionCliquable(0, 0, 1, d1, { cliquable: false, longueur, liste1: rangeMinMax(1, n1), liste2: rangeMinMax(n1 + 1, n1 + d1) })
    this.reponse = new FractionX(d1 - n1, d1)
    if (choice([true, false])) {
      this.question = `${p1} rejoint une amie à ${Ville1} en voiture. <br>
    Elle a déjà parcouru $${f1.texFraction}$ de la distance. <br>
    Quelle fraction de la distance lui reste-t-il à parcourir ?`

      this.correction = `Comme $\\dfrac{${d1}}{${d1}}-${!context.isHtml ? `${miseEnEvidence(f1.texFraction, 'lightgray')}` : `${miseEnEvidence(f1.texFraction, '#f15929')}`}=${!context.isHtml ? `${miseEnEvidence(f2.texFraction, 'gray')}` : `${miseEnEvidence(f2.texFraction, '#1DA962')}`}$, il lui reste à parcourir $\\dfrac{${d1 - n1}}{${d1}}$ de la distance.`
      this.correction += '<br>' + mathalea2d({ scale: 0.5, xmin: -0.2, xmax: 20, ymin: -1, ymax: 2 }, schemaCorr)
      this.canEnonce = this.question
      this.canReponseACompleter = ''
    } else {
      this.question = `${p1} et ${p2} participent à une course à pied en relais. <br>
    ${p1} a déjà parcouru $${f1.texFraction}$ de la distance. ${p2} réalise le reste de la distance. <br>
    Quelle fraction de la distance lui reste-t-il à parcourir ?`
      this.correction = `Comme $\\dfrac{${d1}}{${d1}}-${!context.isHtml ? `${miseEnEvidence(f1.texFraction, 'lightgray')}` : `${miseEnEvidence(f1.texFraction, '#f15929')}`}=${!context.isHtml ? `${miseEnEvidence(f2.texFraction, 'gray')}` : `${miseEnEvidence(f2.texFraction, '#1DA962')}`}$, il lui reste à parcourir $\\dfrac{${d1 - n1}}{${d1}}$ de la distance.`
      this.correction += '<br>' + mathalea2d({ scale: 0.5, xmin: -0.2, xmax: 20, ymin: -1, ymax: 2 }, schemaCorr)
      this.canEnonce = this.question
      this.canReponseACompleter = ''
    }
  }
}
