import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes,mise_en_evidence,katex_Popup2,fraction_simplifiee} from "/modules/outils.js"




/**
 * Additions et/ou soustractions classique et/ou à trou.
 *
 * Par défaut c'est un mélange d'additions, soustractions avec et sans trou avec des nombres jusqu'à 20.
 * @Auteur Rémi Angot
 * Référence CM000
 */
export default function Tables_additions_soustractions() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = 20;
  this.sup2 = 6; // additions|additions à trous|soustractions|soustractions à trous|mélange sans trou|mélange avec trou
  this.titre = "Additions et de soustractions";
  this.consigne = "Calculer";
  this.spacing = 2;
  this.tailleDiaporama = 100;


  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let liste_type_de_questions = [];
    if (this.sup2 == 1) {
      liste_type_de_questions = combinaison_listes(
        ["addition"],
        this.nb_questions
      );
    }
    if (this.sup2 == 2) {
      liste_type_de_questions = combinaison_listes(
        ["addition_a_trou"],
        this.nb_questions
      );
    }
    if (this.sup2 == 3) {
      liste_type_de_questions = combinaison_listes(
        ["soustraction"],
        this.nb_questions
      );
    }
    if (this.sup2 == 4) {
      liste_type_de_questions = combinaison_listes(
        ["soustraction_a_trou"],
        this.nb_questions
      );
    }
    if (this.sup2 == 5) {
      liste_type_de_questions = combinaison_listes(
        ["addition", "soustraction"],
        this.nb_questions
      );
    }
    if (this.sup2 == 6) {
      liste_type_de_questions = combinaison_listes(
        ["addition", "addition_a_trou", "soustraction", "soustraction_a_trou"],
        this.nb_questions
      );
    }
    for (let i = 0, a, b, texte, texte_corr; i < this.nb_questions; i++) {
      a = randint(2, this.sup);
      b = randint(2, this.sup);

      switch (liste_type_de_questions[i]) {
        case "addition":
          texte = `$${a} + ${b} = \\dotfill$`;
          texte_corr = `$${a} + ${b} = ${a + b}$`;
          break;
        case "addition_a_trou":
          texte = `$${a} + \\ldots\\ldots = ${a + b}$`;
          texte_corr = `$${a} + ${mise_en_evidence(b)} = ${a + b}$`;
          break;
        case "soustraction":
          if (a == b) {
            a = randint(2, this.sup, b);
          }
          if (a < b) {
            b = [a, (a = b)][0]; //échange les variables a et b
          }
          texte = `$${a} - ${b} = \\dotfill$`;
          texte_corr = `$${a} - ${b} = ${a - b}$`;
          break;
        case "soustraction_a_trou":
          if (a == b) {
            a = randint(2, this.sup, b);
          }
          if (a < b) {
            b = [a, (a = b)][0]; //échange les variables a et b
          }
          texte = `$${a} - \\ldots\\ldots = ${a - b}$`;
          texte_corr = `$${a} - ${mise_en_evidence(b)} = ${a - b}$`;
          break;
      }

      if (est_diaporama) {
        texte = texte.replace("= \\dotfill", "");
      }
      this.liste_questions.push(texte);
      this.liste_corrections.push(texte_corr);
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = ["Valeur maximale", 9999]; // Texte, tooltip
  this.besoin_formulaire2_numerique = [
    "Style de questions",
    6,
    "1 : Additions\n2: Additions à trous\n3: Soustractions\n4 : Soustractions à trous\n5 : Additions et soustractions \n6 : Additions et soustractions avec ou sans trous",
  ];
}
