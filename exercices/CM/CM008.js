import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes} from "/modules/outils.js"
/**
 * Un nombre à 2 chiffres -11
 * @Auteur Rémi Angot
 * Référence CM008
*/
export default function Soustraire11() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Soustraire 11";
  this.consigne = "Calculer";
  this.nb_questions = 10;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;
  this.tailleDiaporama = 100;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = [1, 1, 1, 1, 2];
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texte_corr, a, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      if (liste_type_de_questions[i] == 1) {
        a = randint(12, 99);
      } else {
        a = randint(2, 9) * 10;
      }

      texte = `$${a}-11$`;
      texte_corr = `$${a}-11=${a - 11}$`;

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

