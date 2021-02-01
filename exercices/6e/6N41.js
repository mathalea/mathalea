import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,enleve_element,choice,combinaison_listes,mise_en_evidence,tex_fraction} from "/modules/outils.js"
/**
 * Écrire une fraction avec un nouveau dénominateur qui est un multiple de son dénominateur (ce multiple est inférieur à une valeur maximale de 11 par défaut)
 * @Auteur Rémi Angot
 * 5N13-2 et 6N41
 */
export default function Egalites_entre_fractions() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = 11; // Correspond au facteur commun
  this.titre = "Égalités entre fractions simples";
  this.consigne = "Compléter les égalités.";
  this.spacing = 2;
  this.spacing_corr = 2;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let liste_fractions = [
      [1, 2],
      [1, 3],
      [2, 3],
      [1, 4],
      [3, 4],
      [1, 5],
      [2, 5],
      [3, 5],
      [4, 5],
      [1, 6],
      [5, 6],
      [1, 7],
      [2, 7],
      [3, 7],
      [4, 7],
      [5, 7],
      [6, 7],
      [1, 8],
      [3, 8],
      [5, 8],
      [7, 8],
      [1, 9],
      [2, 9],
      [4, 9],
      [5, 9],
      [7, 9],
      [8, 9],
      [1, 10],
      [3, 10],
      [7, 10],
      [9, 10],
    ]; // Couples de nombres premiers entre eux
    let liste_type_de_questions = combinaison_listes(
      [1, 1, 1, 1, 2],
      this.nb_questions
    );
    for (
      let i = 0, fraction, a, b, c, d, k, texte, texte_corr;
      i < this.nb_questions;
      i++
    ) {
      if (liste_type_de_questions[i] == 1) {
        // égalité entre 2 fractions
        fraction = choice(liste_fractions); //
        a = fraction[0];
        b = fraction[1];
        k = randint(2, this.sup);
        c = k * a;
        d = k * b;
        enleve_element(liste_fractions, fraction); // Il n'y aura pas 2 fois la même fraction de départ
        texte = `$${tex_fraction(a, b)} = ${tex_fraction(
          "\\phantom{00000000000000}",
          "\\phantom{00000000000000}"
        )} = ${tex_fraction("\\phantom{0000}", d)}$`;
        texte_corr = `$${tex_fraction(a, b)} = ${tex_fraction(
          a + mise_en_evidence("\\times" + k),
          b + mise_en_evidence("\\times" + k)
        )} = ${tex_fraction(c, d)}$`;
      } else {
        //écrire un entier sous la forme d'une fraction
        a = randint(1, 9);
        d = randint(2, 9);
        c = a * d;
        texte = `$${a} = ${tex_fraction(
          "\\phantom{00000000000000}",
          "\\phantom{00000000000000}"
        )} = ${tex_fraction("\\phantom{0000}", d)}$`;
        texte_corr = `$${a} = \\dfrac{${a}}{1} =${tex_fraction(
          a + mise_en_evidence("\\times" + d),
          "1" + mise_en_evidence("\\times" + d)
        )} = ${tex_fraction(c, d)}$`;
      }

      this.liste_questions.push(texte);
      this.liste_corrections.push(texte_corr);
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = ["Valeur maximale du facteur commun", 99];
}

