import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,tex_nombre,tex_fraction} from "/modules/outils.js"
/**
 * Multiplier ou diviser un nombre entier par 10, 100 ou 1 000
 *
 * Le nombre entier est de la forme X, XX, X0X, X00X ou XXX
 * @Auteur Rémi Angot
 * 6N24-1
 */
export default function Exercice_multiplier_ou_diviser_un_nombre_entier_par_10_100_1000() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Multiplier ou diviser un nombre entier par 10, 100 ou 1 000";
  this.consigne = "Donner l'écriture décimale";
  this.spacing = 2;
  this.spacing_corr = 2;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    for (
      let i = 0, a, b, texte, texte_corr, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      a = choice(
        [
          randint(2, 9),
          randint(11, 99),
          randint(1, 9) * 100 + randint(1, 9),
          randint(1, 9) * 1000 + randint(1, 9),
        ],
        randint(101, 999)
      );
      // X, XX, X0X, X00X,XXX
      b = choice([10, 100, 1000]);
      if (choice([true, false])) {
        texte =
          "$ " + tex_fraction(tex_nombre(a), tex_nombre(b)) + " = \\dotfill $";
        texte_corr =
          "$ " +
          tex_fraction(tex_nombre(a), tex_nombre(b)) +
          " = " +
          tex_nombre(Algebrite.eval(a / b)) +
          " $";
      } else {
        texte =
          "$ " + tex_nombre(a) + "\\times" + tex_nombre(b) + " = \\dotfill $";
        texte_corr =
          "$ " +
          tex_nombre(a) +
          "\\times" +
          tex_nombre(b) +
          " = " +
          tex_nombre(Algebrite.eval(a * b)) +
          " $";
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
  this.besoin_formulaire_numerique = ["Valeur maximale", 99999];
}

