import Exercice from '../ClasseExercice.js';
import { liste_de_question_to_contenu, combinaison_listes, randint, tex_nombrec, choice } from "/modules/outils.js"
/**
 * Description didactique de l'exercice
 * @Auteur Benjamin
 * Référence 
*/


// let a = randint()
// texte = `\\dfrac{a}{10}`
export default function NomQuelconqueDeLaFonctionQuiCreeExercice() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Donner l'écriture décimale à partir d'une décomposition partie entière et somme de fractions décimales ";
  this.consigne = "Donner l'écriture décimale des nombres suivants.";
  this.nb_questions = 10;
  this.nb_cols = 2; // Uniquement pour la sortie LaTeX
  this.nb_cols_corr = 2; // Uniquement pour la sortie LaTeX
  this.sup = 1; // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
  this.tailleDiaporama = 100; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = "" // Id YouTube ou url

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = ['type1', 'type2', 'type3']; // On créé 3 types de questions
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"

    for (let i = 0, a, b, c, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      a = choice([randint(1, 9), randint(10, 99)]);
      b = randint(1, 9);
      c = randint(1, 9);
      switch (liste_type_de_questions[i]) { // Suivant le type de question, le contenu sera différent
        case 'type1':
          texte = `$${a} + \\dfrac{${b}}{10} + \\dfrac{${c}}{100}$`;
          texte_corr = `$${a} + \\dfrac{${b}}{10} + \\dfrac{${c}}{100} = ${tex_nombrec(a + b / 10 + c / 100)} $`;
          break;
        case 'type2':
          texte = `$\\dfrac{${c}}{100} + \\dfrac{${b}}{10} + ${a}$`;
          texte_corr = `$\\dfrac{${c}}{100} + \\dfrac{${b}}{10} + ${a} = ${tex_nombrec(a + b / 10 + c / 100)} $`;
          break;
        case 'type3':
          texte = `$${a} + \\dfrac{${b}}{100}$`;
          texte_corr = `$${a} + \\dfrac{${b}}{100} = ${tex_nombrec(a + b / 100)}$`;
          break;

      }

      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = ['Niveau de difficulté', 3];
}

// python3 modules/exercices_to_json.py pour faire apparaitre l'exercice dans le menu

