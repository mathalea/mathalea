import Exercice from '../ClasseExercice.js'
import { listeQuestionsToContenu } from '../../modules/outils.js'
export const titre = 'Exercice exemple avec un nombre fixe de questions différentes'

/**
 * Description didactique de l'exercice
 * @Auteur
 * Référence
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestionsModifiable = false
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  // this.sup = 1
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.introduction = 'Dans cet exercice...'

    const question1 = 'Question 1'
    const correction1 = 'Correction 1'

    const question2 = 'Question 2'
    const correction2 = 'Correction 2'

    this.listeQuestions.push(question1, question2)
    this.listeCorrections.push(correction1, correction2)
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 3];
}


