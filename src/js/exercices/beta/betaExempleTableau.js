import Exercice from '../Exercice.js'
import { listeQuestionsToContenu } from '../../modules/outils.js'
import { mathalea2d, tableau } from '../../modules/2d.js'
export const titre = 'Exercice exemple'

/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice () {
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
    const monTableau = tableau({
      ligne1: ['\\text{Masse (en g)}', 150, 450, 600, '4~500'],
      ligne2: ['\\text{Prix (en euros)}', 3],
      flecheHaut: [[1, 2, '\\times3'], [2, 4, '\\times10']],
      flecheBas: [[1, 2, '\\times3'], [2, 3, '\\times \\dfrac{4}{3}', 3]],
      flecheDroite: '\\times 50',
      flecheDroiteSens: 'haut'
    })

    this.introduction = mathalea2d({ xmin: -1, xmax: 22, ymin: -5, ymax: 10 }, monTableau)

    const question1 = 'texte de la question 1.<br>'
    const question2 = 'texte de la question 2.<br>'

    const correction1 = 'texte de la correction 1'
    const correction2 = 'texte de la correction2'
    this.listeQuestions.push(question1, question2)
    this.listeCorrections.push(correction1, correction2)

    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 3];
}
