import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,calcul,tex_nombrec,tex_nombre,mise_en_evidence,tex_fraction} from "/modules/outils.js"
/**
 * Multiplication d'un nombre décimal dans différentes écritures par 10, 100, 1000
 *
 *  * Type 1 : écriture décimale
 *  * Type 2 : écriture fractionnaire
 *  * Type 3 : écritures fractionnaires et décimales
 *
 *
 *  * Sup2 : avec ou sans calculs à trous
 * @Auteur Rémi Angot
* Référence 6C30-1
  *
 */
export default function Multiplier_decimaux_par_10_100_1000() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Multiplications d'un nombre décimal par 10, 100 ou 1 000.";
  this.consigne = "Calculer.";
  this.sup = 3;
  this.sup2 = false;
  this.spacing = 2;
  this.spacing_corr = 2;
  this.nb_questions = 8;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles = [],type_de_questions;
    if (this.sup == 1 && !this.sup2) type_de_questions_disponibles = [1, 2];
    if (this.sup == 1 && this.sup2)
      type_de_questions_disponibles = [1, 2, 5, 6];
    if (this.sup == 2 && !this.sup2) type_de_questions_disponibles = [3, 4];
    if (this.sup == 2 && this.sup2)
      type_de_questions_disponibles = [3, 4, 3, 4, 7, 8, 9, 10];
    if (this.sup == 3 && !this.sup2)
      type_de_questions_disponibles = [1, 2, 3, 4];
    if (this.sup == 3 && this.sup2)
      type_de_questions_disponibles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    if (this.sup2) this.consigne = "Calculer et compléter.";

    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let liste_de_facteurs = combinaison_listes(
      [10, 100, 1000],
      this.nb_questions
    );

    for (
      let i = 0, texte, texte_corr, cpt = 0, a, b, den;
      i < this.nb_questions && cpt < 50;

    ) {
      type_de_questions = liste_type_de_questions[i];
      switch (type_de_questions) {
        case 1: // a,abcd × 10
          a = choice([randint(11, 99), randint(100, 999)]);
          a = calcul(a / choice([10, 100, 1000, 10000]));
          b = liste_de_facteurs[i];
          texte = `$${tex_nombre(a)}\\times${tex_nombre(b)}$`;
          texte_corr = `$${tex_nombre(a)} \\times ${tex_nombre(
            b
          )} = ${tex_nombrec(a * b)}$`;
          break;
        case 2: // 10 × a,abcd
          a = choice([randint(11, 99), randint(100, 999)]);
          a = calcul(a / choice([10, 100, 1000, 10000]));
          b = liste_de_facteurs[i];
          texte = `$${tex_nombre(b)}\\times${tex_nombre(a)}$`;
          texte_corr = `$${tex_nombre(b)} \\times ${tex_nombre(
            a
          )} = ${tex_nombrec(a * b)}$`;
          break;
        case 3: // abcd/10 × 10
          a = choice([randint(11, 99), randint(100, 999), randint(2, 9)]);
          den = choice([10, 100, 1000]);
          b = liste_de_facteurs[i];
          texte = `$${tex_fraction(a, den)}\\times${tex_nombre(b)}$`;
          texte_corr = `$${tex_fraction(a, den)} \\times ${tex_nombre(
            b
          )} = ${tex_fraction(a * b, den)} = ${tex_nombrec((a / den) * b)}$`;
          break;
        case 4: // 10 × abcd/10
          a = choice([randint(11, 99), randint(100, 999), randint(2, 9)]);
          den = choice([10, 100, 1000]);
          b = liste_de_facteurs[i];
          texte = `$${tex_nombre(b)}\\times${tex_fraction(a, den)}$`;
          texte_corr = `$${tex_nombre(b)} \\times ${tex_fraction(
            a,
            den
          )} = ${tex_fraction(a * b, den)} = ${tex_nombrec((a / den) * b)}$`;
          break;
        case 5: // .... × 10 = a,abcd
          a = choice([randint(11, 99), randint(100, 999)]);
          a = calcul(a / choice([10, 100, 1000, 10000]));
          b = liste_de_facteurs[i];
          texte = `$\\ldots \\times${tex_nombre(b)} = ${tex_nombrec(a * b)}$`;
          texte_corr = `$${mise_en_evidence(
            tex_nombre(a)
          )} \\times ${tex_nombre(b)} = ${tex_nombrec(a * b)}$`;
          break;
        case 6: // 10 × .... = a,abcd
          a = choice([randint(11, 99), randint(100, 999)]);
          a = calcul(a / choice([10, 100, 1000, 10000]));
          b = liste_de_facteurs[i];
          texte = `$${tex_nombre(b)} \\times \\ldots = ${tex_nombrec(a * b)}$`;
          texte_corr = `$${tex_nombre(b)} \\times ${mise_en_evidence(
            tex_nombre(a)
          )}  = ${tex_nombrec(a * b)}$`;
          break;
        case 7: // case 3 avec un trou sur l'entier
          a = choice([randint(11, 99), randint(100, 999), randint(2, 9)]);
          den = choice([10, 100, 1000]);
          b = liste_de_facteurs[i];
          texte = `$${tex_fraction(a, den)}\\times \\ldots = ${tex_nombrec(
            (a / den) * b
          )}$`;
          texte_corr = `$${tex_fraction(a, den)} \\times ${mise_en_evidence(
            tex_nombre(b)
          )} = ${tex_fraction(a * b, den)} = ${tex_nombrec((a / den) * b)}$`;
          break;
        case 8: // case 4 avec un trou sur l'entier
          a = choice([randint(11, 99), randint(100, 999), randint(2, 9)]);
          den = choice([10, 100, 1000]);
          b = liste_de_facteurs[i];
          texte = `$ \\ldots \\times${tex_fraction(a, den)}= ${tex_nombrec(
            (a / den) * b
          )}$`;
          texte_corr = `$${mise_en_evidence(
            tex_nombre(b)
          )} \\times ${tex_fraction(a, den)} = ${tex_fraction(
            a * b,
            den
          )} = ${tex_nombrec((a / den) * b)}$`;
          break;
        case 9: // case 3 avec trou sur la fraction
          a = choice([randint(11, 99), randint(100, 999), randint(2, 9)]);
          den = choice([10, 100, 1000]);
          b = liste_de_facteurs[i];
          texte = `$${tex_fraction(a, "\\ldots")}\\times${tex_nombre(
            b
          )} = ${tex_nombrec((a / den) * b)}$`;
          texte_corr = `$${tex_fraction(
            a,
            mise_en_evidence(tex_nombre(den))
          )} \\times ${tex_nombre(b)} = ${tex_fraction(
            a * b,
            den
          )} = ${tex_nombrec((a / den) * b)}$`;
          break;
        case 10: // case 4 avec trou sur la fraction
          a = choice([randint(11, 99), randint(100, 999), randint(2, 9)]);
          den = choice([10, 100, 1000]);
          b = liste_de_facteurs[i];
          texte = `$${tex_nombre(b)}\\times${tex_fraction(
            a,
            "\\ldots"
          )} = ${tex_nombrec((a / den) * b)}$`;
          texte_corr = `$${tex_nombre(b)} \\times ${tex_fraction(
            a,
            mise_en_evidence(tex_nombre(den))
          )} = ${tex_fraction(a * b, den)} = ${tex_nombrec((a / den) * b)}$`;
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
  this.besoin_formulaire_numerique = [
    "Types de calculs",
    3,
    "1 : Écriture décimale\n2 : Écriture fractionnaire\n3 : Écritures décimales et fractionnaires",
  ];
  this.besoin_formulaire2_case_a_cocher = ["Avec des calculs à trous"];
}

