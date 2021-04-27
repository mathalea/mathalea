import Exercice from '../ClasseExercice.js'
import { liste_de_question_to_contenu } from '../../modules/outils.js'
/**
 * Description didactique de l'exercice
 * @Auteur
 * Référence
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = 'Exercice exemple avec un nombre fixe de questions différentes'
  this.consigne = ''
  this.nb_questions_modifiable = false
  this.nb_cols = 2 // Uniquement pour la sortie LaTeX
  this.nb_cols_corr = 2 // Uniquement pour la sortie LaTeX
  // this.sup = 1
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelle_version = function () {
    this.liste_questions = [] // Liste de questions
    this.liste_corrections = [] // Liste de questions corrigées
    this.introduction = 'Dans cet exercice...'

    const question1 = 'Question 1'
    const correction1 = 'Correction 1'

    const question2 = 'Question 2'
    const correction2 = 'Correction 2'

    this.liste_questions.push(question1, question2)
    this.liste_corrections.push(correction1, correction2)
    liste_de_question_to_contenu(this)
  }
  // this.besoin_formulaire_numerique = ['Niveau de difficulté', 3];
}

// python3 modules/exercices_to_json.py pour faire apparaitre l'exercice dans le menu
