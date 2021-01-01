import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,calcul,tex_nombrec,tex_nombre} from "/modules/outils.js"
/**
 * Un entier à un 1 ou 2 chiffres, un nombre décimal avec une partie décimale à un ou 2 chiffres à diviser par 10, 100 ou 1000
 * @Auteur Rémi Angot
 * Référence CM017
*/
export default function Diviser_decimal_par_10_100_1000() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Diviser un nombre décimal par 10, 100 ou 1000";
  this.consigne = "Calculer";
  this.nb_questions = 10;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    for (
      let i = 0, texte, texte_corr, a, b, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      a = choice([
        randint(1, 9),
        randint(11, 99),
        calcul(randint(11, 99) / 10),
        calcul(randint(101, 999) / 100),
        calcul(randint(1, 9) / 10),
      ]);
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
  //this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}

