import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, texNombre, texFraction, calcul } from '../../modules/outils.js'

export const titre = 'Multiplier ou diviser un nombre entier par 10, 100 ou 1 000'

/**
 * Multiplier ou diviser un nombre entier par 10, 100 ou 1 000
 *
 * Le nombre entier est de la forme X, XX, X0X, X00X ou XXX
 * @author Rémi Angot
 * 6N24-1
 */
export default function ExerciceMultiplierOuDiviserUnNombreEntierPar101001000 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = "Donner l'écriture décimale."
  this.spacing = 2
  this.spacingCorr = 2

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    for (
      let i = 0, a, b, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      a = choice(
        [
          randint(2, 9),
          randint(11, 99),
          randint(1, 9) * 100 + randint(1, 9),
          randint(1, 9) * 1000 + randint(1, 9)
        ],
        randint(101, 999)
      )
      // X, XX, X0X, X00X,XXX
      b = choice([10, 100, 1000])
      if (choice([true, false])) {
        texte =
          '$ ' + texFraction(texNombre(a), texNombre(b)) + ' =  $'
        texteCorr =
          '$ ' +
          texFraction(texNombre(a), texNombre(b)) +
          ' = ' +
          texNombre(calcul(a / b)) +
          ' $'
      } else {
        texte =
          '$ ' + texNombre(a) + '\\times' + texNombre(b) + ' =  $'
        texteCorr =
          '$ ' +
          texNombre(a) +
          '\\times' +
          texNombre(b) +
          ' = ' +
          texNombre(calcul(a * b)) +
          ' $'
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
