import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,tex_nombrec,tex_nombre} from "/modules/outils.js"
/**
 * Division d'un entier par 10, 100, 1000
 * @Auteur Rémi Angot
 * Référence CM016
*/
export default function Diviser_par_10_100_1000() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Diviser un entier par 10, 100 ou 1000";
  this.consigne = "Calculer";
  this.nb_questions = 10;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;
  this.tailleDiaporama = 100;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    for (
      let i = 0, texte, texte_corr, a, b, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      a = choice([randint(1, 9), randint(11, 99), randint(101, 999)]);
      b = choice([10, 100, 1000]);
      texte = `$${tex_nombre(a)}\\div${tex_nombre(b)}$`;
      texte_corr = `$${tex_nombre(a)}\\div${tex_nombre(b)}=${tex_nombrec(
        a / b
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
}

