import Exercice from '../ClasseExercice.js';
import { liste_de_question_to_contenu, combinaison_listes, randint, tex_nombrec, choice } from "/modules/outils.js"
/**
 * Description didactique de l'exercice
 * @Auteur Benjamin Angot
 * Référence C3N20
 * 2021-03-24
*/


export default function NomQuelconqueDeLaFonctionQuiCreeExercice() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Donner l'écriture décimale à partir d'un somme d'entiers et de fractions décimales";
  this.consigne = "Donner l'écriture décimale des nombres suivants.";
  this.nb_questions = 6;
  this.nb_cols = 2; // Uniquement pour la sortie LaTeX
  this.nb_cols_corr = 2; // Uniquement pour la sortie LaTeX
  this.sup = 1; // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
  this.tailleDiaporama = 100; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = "" // Id YouTube ou url
  this.sup = 2;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = ['type1', 'type2', 'type3', 'type4', 'type5', 'type6']; // On créé 3 types de questions
    if (this.sup == 1) {
      type_de_questions_disponibles = ['type1', 'type5']
    }
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"

    for (let i = 0, a, b, c, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      a = choice([randint(1, 9), randint(1, 9), randint(10, 99)]);
      b = randint(1, 9,[a]); 
      c = randint(1, 9,[a,b]); // Tous les chiffres doivent être différents
      switch (liste_type_de_questions[i]) { // Suivant le type de question, le contenu sera différent
        case 'type1':
          texte = `$${a} + \\dfrac{${b}}{10} + \\dfrac{${c}}{100}$`;
          texte_corr = `$${a} + \\dfrac{${b}}{10} + \\dfrac{${c}}{100} = ${tex_nombrec(a + b / 10 + c / 100)} $`;
          break;
        case 'type2':
          texte = `$${a} + \\dfrac{${c}}{100} + \\dfrac{${b}}{10} $`;
          texte_corr = `$${a} + \\dfrac{${c}}{100} + \\dfrac{${b}}{10}  = ${tex_nombrec(a + b / 10 + c / 100)} $`;
          break;
        case 'type3':
          texte = `$\\dfrac{${c}}{100} + \\dfrac{${b}}{10} + ${a}$`;
          texte_corr = `$\\dfrac{${c}}{100} + \\dfrac{${b}}{10} + ${a} = ${tex_nombrec(a + b / 10 + c / 100)} $`;
          break;
        case 'type4':
          texte = `$\\dfrac{${c}}{100} + ${a} + \\dfrac{${b}}{10} $`;
          texte_corr = `$\\dfrac{${c}}{100} + ${a} + \\dfrac{${b}}{10}  = ${tex_nombrec(a + b / 10 + c / 100)} $`;
          break;
        case 'type5':
          texte = `$${a} + \\dfrac{${b}}{100}$`;
          texte_corr = `$${a} + \\dfrac{${b}}{100} = ${tex_nombrec(a + b / 100)}$`;
          break;
        case 'type6':
          texte = `$\\dfrac{${b}}{100} + ${a}$`;
          texte_corr = `$\\dfrac{${b}}{100} + ${a} = ${tex_nombrec(a + b / 100)}$`;
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
  this.besoin_formulaire_numerique = ['Niveau de difficulté', 2, '1 : L\'ordre est respecté\n 2 : L\'ordre des termes est aléatoire'];
}

// python3 modules/exercices_to_json.py pour faire apparaitre l'exercice dans le menu

