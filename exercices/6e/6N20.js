import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,enleve_element,choice,tex_fraction} from "/modules/outils.js"
/**
 * @Auteur Rémi Angot
 * 6N20
 */
export default function Exercice_fractions_decomposer() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Décomposer une fraction (partie entière + fraction inférieure à 1).";
  this.consigne =
    "Écrire sous la forme de la somme d'un nombre entier et d'une fraction inférieure à 1.";
  this.spacing = 2;
  this.spacing_corr = 2;
  this.sup = false; // Donner l'écriture décimale

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let liste_fractions = [
      [1, 2, ",5"],
      [1, 4, ",25"],
      [3, 4, ",75"],
      [1, 5, ",2"],
      [2, 5, ",4"],
      [3, 5, ",6"],
      [4, 5, ",8"],
      [1, 8, ",125"],
      [3, 8, ",375"],
      [1, 10, ",1"],
      [3, 10, ",3"],
      [7, 10, ",7"],
      [9, 10, ",9"],
    ]; // Fractions irréductibles avec une écriture décimale exacte
    let liste_fractions1 = [
      [1, 2, ",5"],
      [1, 4, ",25"],
      [3, 4, ",75"],
      [1, 8, ",125"],
    ];
    liste_fractions1.push(
      choice([
        [1, 10, ",1"],
        [2, 10, ",2"],
        [3, 10, ",3"],
        [7, 10, ",7"],
        [9, 10, ",9"],
      ])
    );
    liste_fractions1.push(
      choice([
        [1, 5, ",2"],
        [2, 5, ",4"],
        [3, 5, ",6"],
        [4, 5, ",8"],
      ])
    ); // liste_fractions pour les 6 premières questions
    for (
      let i = 0, fraction, a,ed, b, c, n, texte, texte_corr;
      i < this.nb_questions;
      i++
    ) {
      if (i < 6) {
        fraction = choice(liste_fractions1);
        enleve_element(liste_fractions1, fraction);
      } else {
        fraction = choice(liste_fractions);
      }
      //
      c = fraction[0];
      b = fraction[1];
      n = randint(1, 4);
      a = n * b + c;
      ed = n + fraction[2];
      enleve_element(liste_fractions, fraction); // Il n'y aura pas 2 fois la même partie décimale
      texte =
        "$ " +
        tex_fraction(a, b) +
        " = \\phantom{0000} + " +
        tex_fraction("\\phantom{00000000}", "") +
        " $";
      texte_corr =
        "$ " + tex_fraction(a, b) + " = " + n + "+" + tex_fraction(c, b) + " $";
      this.liste_questions.push(texte);
      this.liste_corrections.push(texte_corr);
    }
    liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
  };
}


