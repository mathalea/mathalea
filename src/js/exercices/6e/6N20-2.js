import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, enleveElement, choice, texFraction } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Décomposer une fraction (partie entière + fraction inférieure à 1) puis donner l\'écriture décimale'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Décomposer une fraction (partie entière + fraction inférieure à 1) puis donner l'écriture décimale.
 * @author Rémi Angot
 * 6N20-2
 */
export default function ExerciceFractionsDifferentesEcritures () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne =
    "Écrire sous la forme de la somme d'un nombre entier et d'une fraction inférieure à 1 puis donner l'écriture décimale."
  this.spacing = 2
  this.spacingCorr = 2

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    const fractions = [
      [1, 2, ',5'],
      [1, 4, ',25'],
      [3, 4, ',75'],
      [1, 5, ',2'],
      [2, 5, ',4'],
      [3, 5, ',6'],
      [4, 5, ',8'],
      [1, 8, ',125'],
      [3, 8, ',375'],
      [1, 10, ',1'],
      [3, 10, ',3'],
      [7, 10, ',7'],
      [9, 10, ',9']
    ] // Fractions irréductibles avec une écriture décimale exacte
    const fractions1 = [
      [1, 2, ',5'],
      [1, 4, ',25'],
      [3, 4, ',75'],
      [1, 8, ',125']
    ]
    fractions1.push(
      choice([
        [1, 10, ',1'],
        [2, 10, ',2'],
        [3, 10, ',3'],
        [7, 10, ',7'],
        [9, 10, ',9']
      ])
    )
    fractions1.push(
      choice([
        [1, 5, ',2'],
        [2, 5, ',4'],
        [3, 5, ',6'],
        [4, 5, ',8']
      ])
    ) // liste_fractions pour les 6 premières questions
    for (
      let i = 0, cpt = 0, fraction, a, ed, b, c, n, texte, texteCorr, reponse;
      i < this.nbQuestions && cpt < 50;

    ) {
      if (i < 6) {
        fraction = choice(fractions1)
        enleveElement(fractions1, fraction)
      } else {
        fraction = choice(fractions)
      }
      //
      c = fraction[0]
      b = fraction[1]
      n = randint(1, 4)
      a = n * b + c
      ed = n + fraction[2]
      enleveElement(fractions, fraction) // Il n'y aura pas 2 fois la même partie décimale
      texte =
        '$ ' +
        texFraction(a, b) +
        ' = \\phantom{0000} + ' +
        texFraction('\\phantom{00000000}', '') +
        ' =  $'
      texteCorr =
        '$ ' +
        texFraction(a, b) +
        ' = ' +
        n +
        '+' +
        texFraction(c, b) +
        ' = ' +
        ed +
        ' $'
      reponse = `${n}+${texFraction(c, b)}=${ed}`
      setReponse(this, i, reponse)
      if (this.interactif) texte = `$${texFraction(a, b)} = $` + ajouteChampTexteMathLive(this, i)
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // Espacement de 2 em entre chaque question.
  }
}
