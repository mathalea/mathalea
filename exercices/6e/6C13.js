import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu_sans_numero,randint,combinaison_listes,num_alpha} from "/modules/outils.js"
import Choisir_expression_numerique from '../5e/_Choisir_expression_numerique.js'
/**
 * Mettre en relation un calcul, une traduction en français, une expression, un résultat, pour les décliner dans différents exercices.
 * Exercice sur le vocabulaire : somme,différence, produit, quotient...
 * @Auteur Jean-Claude Lhote
 * Référence 6C13
 */
export default function Vocabulaire_et_operations() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Traduire des phrases en calculs et réciproquement";
  this.consigne = "";
  this.nb_questions = 5;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;
  this.sup = 4;
  this.sup2 = false;

  this.nouvelle_version = function () {
    let decimal;
    let expf, expn, expc, resultats;
    let type_de_questions_disponibles;
    if (this.sup < 4) type_de_questions_disponibles = [parseInt(this.sup)];
    else type_de_questions_disponibles = [1, 2, 3];
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    );
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    if (this.sup2) decimal = 10 ** randint(1, 2);
    else decimal = 1;

    for (
      let i = 0, texte, texte_corr, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      resultats = Choisir_expression_numerique(1, decimal);
      expf = resultats[0];
      expn = resultats[1];
      expc = resultats[2];
      texte = ``;
      texte_corr = ``;
      switch (liste_type_de_questions[i]) {
        case 1:
          texte +=
            num_alpha(i) +
            `Traduire la phrase par un calcul (il n’est pas demandé d’effectuer ce calcul) : `;
          expf = `l` + expf.substring(1);
          texte += `${expf}.`;
          texte_corr += num_alpha(i) + `${expf} s'écrit ${expn}.`;
          break;
        case 2:
          if (expn.indexOf("ou") > 0)
            expn = expn.substring(0, expn.indexOf("ou")); // on supprime la deuxième expression fractionnaire
          texte +=
            num_alpha(i) + `Traduire le calcul par une phrase en français : `;
          texte += `${expn}`;
          expf = `l` + expf.substring(1);
          texte_corr += num_alpha(i) + `${expn} est ${expf}.`;
          break;
        case 3:
          texte +=
            num_alpha(i) +
            `Traduire la phrase par un calcul et effectuer ce calcul : `;
          expf = `l` + expf.substring(1);
          texte += `${expf}.`;
          expf = `L` + expf.substring(1);
          texte_corr += num_alpha(i) + `${expf} s'écrit ${expn}.<br>`;
          texte_corr += `${expc}.`;
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
    liste_de_question_to_contenu_sans_numero(this);
  };
  this.besoin_formulaire_numerique = [
    "Type de questions",
    4,
    "1 : Phrase -> Calcul\n 2 : Calcul -> Phrase\n 3 : Phrase -> Calcul + résultat\n 4 : Mélange",
  ];
  this.besoin_formulaire2_case_a_cocher = ["Décimaux", false];
}

