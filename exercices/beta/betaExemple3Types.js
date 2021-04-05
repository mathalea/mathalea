import Exercice from '../ClasseExercice.js'
import { liste_de_question_to_contenu, combinaison_listes } from '../../modules/outils.js'
/**
 * Description didactique de l'exercice
 * @Auteur
 * Référence
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = 'Exercice exemple'
  this.consigne = ''
  this.nb_questions = 10
  this.nb_cols = 2 // Uniquement pour la sortie LaTeX
  this.nb_cols_corr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelle_version = function () {
    this.liste_questions = [] // Liste de questions
    this.liste_corrections = [] // Liste de questions corrigées

    const typeQuestionsDisponibles = ['type1', 'type2', 'type3'] // On créé 3 types de questions
    const listeTypeQuestions = combinaison_listes(typeQuestionsDisponibles, this.nb_questions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nb_questions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'type1':
          texte = `Question ${i + 1} de type 1`
          texteCorr = `Correction ${i + 1} de type 1`
          break
        case 'type2':
          texte = `Question ${i + 1} de type 2`
          texteCorr = `Correction ${i + 1} de type 2`
          break
        case 'type3': // Table de 200
          texte = `Question ${i + 1} de type 2`
          texteCorr = `Correction ${i + 1} de type 2`
          break
      }
      if (this.liste_questions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(texte)
        this.liste_corrections.push(texteCorr)
        i++
      }
      cpt++
    }
    liste_de_question_to_contenu(this)
  }
  // this.besoin_formulaire_numerique = ['Niveau de difficulté', 2,'1 : Facile\n2 : Difficile'];
}

// python3 modules/exercices_to_json.py pour faire apparaitre l'exercice dans le menu
