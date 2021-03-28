import Exercice from '../ClasseExercice.js';
import { liste_de_question_to_contenu, combinaison_listes, calcul, randint } from "/modules/outils.js"
/**
 * Description didactique de l'exercice
 * @Matthieu_Devillers
 * Référence 
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Ceci est le titre de l'exercice BetaExosimpleMatthieu";
  this.consigne = "Ceci est la consigne (en gras) de l'exercice.";
  this.introduction = "Ceci est l'introduction (pas en gras) de l'exercice"
  this.nb_questions_modifiable=false // le nombre de questions est fixe dans cet exercice.
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
    let a = randint(1,10)
    let b = randint(20,50)
    question1=`Combien fait ${a} + ${b} ?`
    question1+=`<br>`
    question2=`Combien fait ${a*10} + ${b*10} ?`
    question2+=`<br>`
    correction1=`${a} + ${b} = ${a+b}`
    correction2=`${a*10} + ${b*10 = ${a*10 + b*10}`
        this.liste_questions.push(question1,question2);
        this.liste_corrections.push(correction1,correction2);
    liste_de_question_to_contenu(this);
  };
 // this.besoin_formulaire_numerique = ['Niveau de difficulté', 3];
}
// python3 modules/exercices_to_json.py pour faire apparaitre l'exercice dans le menu