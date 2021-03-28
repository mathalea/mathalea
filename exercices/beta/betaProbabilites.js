import Exercice from '../ClasseExercice.js';
import { liste_de_question_to_contenu, randint, choice, tex_nombrec } from "/modules/outils.js"
/**
 * Description didactique de l'exercice
 * @Auteur 
 * Référence 
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Probabilités simples";
  this.consigne = "";
  this.nb_questions_modifiable = false;
  this.nb_cols = 2; // Uniquement pour la sortie LaTeX
  this.nb_cols_corr = 2; // Uniquement pour la sortie LaTeX
  //this.sup = 1; // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
  this.tailleDiaporama = 100; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = "" // Id YouTube ou url

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let pG = randint(20,60) // pG est un pourcentage
    let pN = randint(10,100-pG-10)
    let pP = 100 - pG -pN
    let sport = choice(["hand-ball","football","rugby"])
    this.introduction = `Lors d'un match de ${sport}, l'équipe a une probabilité de ${tex_nombrec(pG/100)} de gagner son match`;
    this.introduction += ` et ${tex_nombrec(pN/100)} de faire un match nul.`

    let question1 = `Quelle est la probabilité de ne pas perdre ce match ?`
    let correction1 = `Ne pas perdre un match, c'est le gagner ou faire un match nul, la probabilité est donc : `;
    correction1 += `<br>`
    correction1 += `p("Ne pas perdre") = p("Gagner") + p("Nul") = ${tex_nombrec(pG/100)} + ${tex_nombrec(pN/100)} = ${tex_nombrec((pG+pN)/100)}`

    let question2 = `Quelle est la probabilité de perdre ce match ?`;
    let correction2 = `Correction 2`;

    this.liste_questions.push(question1, question2);
    this.liste_corrections.push(correction1, correction2);
    liste_de_question_to_contenu(this);
  };
  //this.besoin_formulaire_numerique = ['Niveau de difficulté', 3];
}

// python3 modules/exercices_to_json.py pour faire apparaitre l'exercice dans le menu

