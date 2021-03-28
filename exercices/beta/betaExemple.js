import Exercice from '../ClasseExercice.js';
import { liste_de_question_to_contenu, combinaison_listes } from "/modules/outils.js"
/**
 * Description didactique de l'exercice
 * @Auteur 
 * Référence 
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Exercice exemple";
  this.consigne = "";
  this.nb_questions_modifiable=false
  //this.nb_questions = 10;
  this.nb_cols = 2; // Uniquement pour la sortie LaTeX
  this.nb_cols_corr = 2; // Uniquement pour la sortie LaTeX
 // this.sup = 1; // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
  this.tailleDiaporama = 100; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = "" // Id YouTube ou url

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let question1,question2,correction1,correction2

    question1=`texte de la question 1.`
    question1+=`<br>`
    question2=`texte de la question 2.`
    question2+=`<br>`

    correction1=`texte de la correction 1`
    correction2=`texte de la correction2`
        this.liste_questions.push(question1,question2);
        this.liste_corrections.push(correction1,correction2);

    liste_de_question_to_contenu(this);
  };
 // this.besoin_formulaire_numerique = ['Niveau de difficulté', 3];
}

// python3 modules/exercices_to_json.py pour faire apparaitre l'exercice dans le menu

