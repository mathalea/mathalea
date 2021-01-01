import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes,tex_nombre} from "/modules/outils.js"
/**
 * Le nombre de dizaines, centaines et milliers étant donné, il faut écrire le nombre.
 *
 * 2 fois sur 5 il y a chevauchement entre les classes
 * @Auteur Rémi Angot
 * 6N10-1
 */
export default function Exercice_numeration_entier() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Écrire un nombre à partir de son nombre de dizaines, de centaines, de milliers...";
  this.consigne = "Écrire en chiffres chacun des nombres.";
  this.nb_questions = 5;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let liste_type_de_questions = combinaison_listes(
      [1, 1, 1, 2, 2],
      this.nb_questions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texte_corr, a, b, rang_a, rang_b, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      a = randint(2, 8) * 10 + randint(1, 5);
      b = randint(2, 8) * 10 + randint(1, 5);
      let rangs = [
        "unités",
        "dizaines",
        "centaines",
        "milliers",
        "dizaines de mille",
        "centaines de mille",
        "millions",
      ];
      rang_a = randint(0, 2);
      if (liste_type_de_questions[i] == 1) {
        rang_b = randint(rang_a + 2, 6);
      } else {
        rang_b = rang_a + 1;
      }

      texte = `$\\text{${b}  ${rangs[rang_b]} et ${a} ${rangs[rang_a]}}$`;
      texte_corr = `$${b} \\text{ ${rangs[rang_b]} et }${a} \\text{ ${rangs[rang_a]
        } : } ${tex_nombre(b * Math.pow(10, rang_b))} + ${a * tex_nombre(Math.pow(10, rang_a))} =${tex_nombre(
          b * Math.pow(10, rang_b) + a * Math.pow(10, rang_a)
        )}$`;

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
  //this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}

