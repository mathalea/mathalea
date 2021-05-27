import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, enleveElement, choice, texFraction } from '../../modules/outils.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Décomposer une fraction (partie entière + fraction inférieure à 1).'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * @author Rémi Angot
 * 6N20
 */
export default function ExerciceFractionsDecomposer () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.consigne =
    "Écrire sous la forme de la somme d'un nombre entier et d'une fraction inférieure à 1."
  this.spacing = 2
  this.spacingCorr = 2
  this.sup = false // Donner l'écriture décimale

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
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
      let i = 0, fraction, a, b, c, n, texte, texteCorr, reponse;
      i < this.nbQuestions;
      i++
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
      enleveElement(fractions, fraction) // Il n'y aura pas 2 fois la même partie décimale
      texte =
        '$ ' +
        texFraction(a, b) +
        ' = \\phantom{0000} + ' +
        texFraction('\\phantom{00000000}', '') +
        ' $'
      texteCorr =
        '$ ' + texFraction(a, b) + ' = ' + n + '+' + texFraction(c, b) + ' $'
      reponse = `${n} + ${texFraction(c, b)}`

      setReponse(this, i, reponse)
      if (this.interactif) {
        texte = `$ ${texFraction(a, b)} = $`
        texte += ajouteChampTexteMathLive(this, i)
      }
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    listeQuestionsToContenu(this) // Espacement de 2 em entre chaque questions.
  }
}
