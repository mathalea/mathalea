import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,tex_nombre,tex_fraction} from "/modules/outils.js"
/**
 * On donne une fraction qui a pour dénominateur 10, 100 ou 1 000, il faut donner l'écriture décimale.
 *
 * Le numérateur est de la forme X, XX, X0X, X00X ou XXX
 * @Auteur Rémi Angot
 * 6N23
 */
export default function Exercice_ecriture_decimale_a_partir_de_fraction_decimale() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Donner l'écriture décimale d'une fraction décimale";
  this.consigne = "Donner l'écriture décimale";
  this.spacing = 2;
  this.spacing_corr = 2;
  this.nb_questions = 8;

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
      texte =
        "$ " + tex_fraction(tex_nombre(a), tex_nombre(b)) + " = \\dotfill $";
      texte_corr =
        "$ " +
        tex_fraction(tex_nombre(a), tex_nombre(b)) +
        " = " +
        tex_nombre(Algebrite.eval(a / b)) +
        " $";
      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        if (est_diaporama) {
          texte = texte.replace("=\\dotfill", "");
        }
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
}

