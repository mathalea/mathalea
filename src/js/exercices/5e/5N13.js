/* eslint-disable camelcase */
import Exercice from '../ClasseExercice.js'
import { listeQuestionsToContenu, randint, enleveElement, choice, texFraction } from '../../modules/outils.js'
export const amcReady = true
export const amcType = 3 // type de question AMC

export const titre = 'Simplification de fractions'

/**
 * Simplifier une fraction, le facteur commun est inférieur à une valeur donnée en paramètre qui est 11 par défaut
 * @Auteur Rémi Angot
 *  5N13
 */
export default function Exercice_fractions_simplifier (max = 11) {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = max // Correspond au facteur commun
  this.titre = titre
  this.consigne = 'Simplifier les fractions suivantes.'
  this.spacing = 2
  this.spacingCorr = 2

  this.nouvelleVersion = function () {
    this.qcm = ['5N13', [], 'Simplification de fractions', 3]

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
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
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
      /*****************************************************/
      // Pour AMC
      this.qcm[1].push([texte, [texteCorr], [1]])
    /****************************************************/
    }
    listeQuestionsToContenu(this) // Espacement de 2 em entre chaque questions.
  }
  this.besoinFormulaireNumerique = [
    'Valeur maximale du facteur commun',
    99999
  ]
}
