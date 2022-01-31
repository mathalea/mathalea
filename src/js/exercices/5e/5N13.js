/* eslint-disable camelcase */
import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, enleveElement, choice, texFraction } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import FractionEtendue from '../../modules/FractionEtendue.js'
export const amcReady = true
export const amcType = 'AMCOpen' // type de question AMC
export const interactifReady = true
export const interactifType = 'mathLive'

export const titre = 'Simplification de fractions'

/**
 * Simplifier une fraction, le facteur commun est inférieur à une valeur donnée en paramètre qui est 11 par défaut
 * @author Rémi Angot
 *  5N13
 */
export default function Exercice_fractions_simplifier (max = 11) {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = max // Correspond au facteur commun
  this.sup2 = false
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.consigne = 'Simplifier les fractions suivantes.'
  this.spacing = 2
  this.spacingCorr = 2
  this.amcType = amcType
  this.amcReady = amcReady

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.autoCorrection = []
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.consigne = this.sup2 ? 'Simplifier les fractions suivantes au maximum.' : 'Simplifier les fractions suivantes.'
    const liste_fractions = [
      [1, 2],
      [1, 3],
      [2, 3],
      [1, 4],
      [3, 4],
      [1, 5],
      [2, 5],
      [3, 5],
      [4, 5],
      [1, 6],
      [5, 6],
      [1, 7],
      [2, 7],
      [3, 7],
      [4, 7],
      [5, 7],
      [6, 7],
      [1, 8],
      [3, 8],
      [5, 8],
      [7, 8],
      [1, 9],
      [2, 9],
      [4, 9],
      [5, 9],
      [7, 9],
      [8, 9],
      [1, 10],
      [3, 10],
      [7, 10],
      [9, 10]
    ] // Couples de nombres premiers entre eux
    for (
      let i = 0, fraction, a, k, b, texte, texteCorr;
      i < this.nbQuestions;
      i++
    ) {
      fraction = choice(liste_fractions) //
      a = fraction[0]
      b = fraction[1]
      k = randint(2, this.sup)
      enleveElement(liste_fractions, fraction) // Il n'y aura pas 2 fois la même réponse
      texte =
          '$ ' +
          texFraction(k * a, k * b) +
          ' = ' +
          texFraction('\\phantom{00000000000000}', '') +
          ' = ' +
          texFraction('\\phantom{0000}', '') +
          ' $'
      texteCorr =
          '$ ' +
          texFraction(k * a, k * b) +
          ' = ' +
          texFraction(k + ' \\times ' + a, k + ' \\times ' + b) +
          ' = ' +
          texFraction(a, b) +
          ' $'
      texte += ajouteChampTexteMathLive(this, i)
      if (this.interactif && context.isHtml) texte = texte.replace(' \\dfrac{\\phantom{00000000000000}}{} = \\dfrac{\\phantom{0000}}{}', '')
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
      // Pour AMC question AmcOpen
      this.autoCorrection[i] = { enonce: texte, propositions: [{ texte: texteCorr, statut: 1, feedback: '' }] }
      if (this.sup2) {
        setReponse(this, i, new FractionEtendue(a, b), { formatInteractif: 'fraction' })
      } else {
        setReponse(this, i, new FractionEtendue(k * a, k * b), { formatInteractif: 'fractionPlusSimple' })
      }
    }
    listeQuestionsToContenu(this) // Espacement de 2 em entre chaque questions.
  }
  this.besoinFormulaireNumerique = ['Valeur maximale du facteur commun', 99999]
  this.besoinFormulaire2CaseACocher = ['Simplification maximale exigée']
}
