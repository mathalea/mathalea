import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint} from "/modules/outils.js"
/**
 * Somme de deux nombres dont les chiffres des unités sont des compléments à 10
 * @Auteur Rémi Angot
 * Référence CM015
*/
export default function Somme_de_deux_nombres_maries() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Somme de deux nombres mariés";
  this.consigne = "Calculer";
  this.nb_questions = 10;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    for (
      let i = 0, texte, texte_corr, a, b, u1, u2, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      u1 = randint(1, 9);
      u2 = 10 - u1;
      a = randint(1, 9) * 10 + u1;
      b = randint(1, 9) * 10 + u2;

      texte = `$${a}+${b}$`;
      texte_corr = `$${a}+${b}=${a + b}$`;

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

