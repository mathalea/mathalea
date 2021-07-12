import Exercice from '../Exercice.js'
import { listeQuestionsToContenu } from '../../modules/outils.js'
import { mathalea2d, tableauDeVariation } from '../../modules/2d.js'
export const titre = 'Exercice exemple'

/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export default function ExempleTableauDeSignes () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestionsModifiable = false
  // this.nbQuestions = 10
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  // this.sup = 1; // Niveau de difficulté
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let question1, question2

    question1 = 'Voici un premier tableau de signe<br>'
    question1 += mathalea2d({ xmin: 0, ymin: -6, xmax: 30, ymax: 1 }, tableauDeVariation({
      tabInit: [
        [
          ['$x$', 2, 30], ['\\text{Signe de }f(x)', 2, 100]
        ],
        ['$-\\infty$', 30, '$0,25$', 40, '$+\\infty$', 30]
      ],
      tabLines: [['Line', 30, 'R/', 0, '+', 20, 'z', 20, '-', 20]],
      colorBackground: '',
      escpl: 3.5,
      delatcl: 0.8,
      lgt: 5,
      hauteurLignes: [15, 15]
    }))
    question2 = 'texte de la question 2.'
    question2 += '<br>'

    const correction1 = 'texte de la correction 1'
    const correction2 = 'texte de la correction2'
    this.listeQuestions.push(question1, question2)
    this.listeCorrections.push(correction1, correction2)

    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 3];
}
