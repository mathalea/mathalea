import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes} from "/modules/outils.js"
/**
 * Somme de 3 nombres dont 2 ont des chiffres des unités compléments à 10
 * @Auteur Rémi Angot
 * Référence CM018
*/
export default function Somme_de_deux_nombres_maries_et_un_entier() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Somme de deux nombres mariés et un entier";
  this.consigne = "Calculer";
  this.nb_questions = 10;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;
  this.tailleDiaporama = 100;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = [1, 2];
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texte_corr, a, b, c, u1, u2, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      u1 = randint(1, 9);
      u2 = 10 - u1;
      a = randint(1, 4) * 10 + u1;
      b = randint(1, 4) * 10 + u2;
      c = randint(1, 100 - a - b);

      switch (liste_type_de_questions[i]) {
        case 1:
          texte = `$${a}+${b}+${c}$`;
          texte_corr = `$${a}+${b}+${c}=${a + b + c}$`;
          break;
        case 2:
          texte = `$${a}+${c}+${b}$`;
          texte_corr = `$${a}+${c}+${b}=${a + b + c}$`;
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
  //this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}



