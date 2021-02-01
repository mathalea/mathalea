import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,combinaison_listes,tex_nombre,puissanceEnProduit} from "/modules/outils.js"
/**
 * Donner l'écriture décimale d'une puissance de 10
 * @Auteur Rémi Angot
* Référence 4C30-3
 */
export default function EcritureDecimalePuissance() {
  Exercice.call(this);
  this.titre = "Écriture décimale d'une puissance";
  this.consigne = "Donner l'écriture sous la forme d'un nombre entier ou d'une fraction.";
  this.nb_questions = 8;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;
  this.sup = 3; // exposants positifs et négatifs par défaut

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let liste_de_calculs = combinaison_listes([[2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [3, 2], [3, 3], [3, 4], [4, 2], [4, 3], [5, 2], [5, 3], [6, 2], [6, 3], [7, 2], [7, 3], [8, 2], [8, 3], [9, 2], [9, 3]], this.nb_questions);

    let liste_type_de_questions
    if (this.sup == 1) {
      liste_type_de_questions = combinaison_listes(['+'], this.nb_questions);
      this.consigne = "Donner l'écriture sous la forme d'un nombre entier.";
    }
    if (this.sup == 2) {
      liste_type_de_questions = combinaison_listes(['-'], this.nb_questions);
    }
    if (this.sup == 3) {
      liste_type_de_questions = combinaison_listes(['+', '-'], this.nb_questions);
    }
    for (let i = 0, texte, texte_corr, a, n, cpt = 0; i < this.nb_questions && cpt < 50;) {
      switch (liste_type_de_questions[i]) {
        case '+':
          a = liste_de_calculs[i][0];
          n = liste_de_calculs[i][1];
          texte = `$${a}^{${n}}$`;
          if (n < 2) {
            texte_corr = `${a}^${n}=$${a}**n}$`
          } else {
            texte_corr = `$${a}^{${n}}=${puissanceEnProduit(a, n)}=${tex_nombre(a ** n)}$`;
          }
          break;
        case '-':
          a = liste_de_calculs[i][0];
          n = liste_de_calculs[i][1];
          texte = `$${a}^{${-n}}$`;
          texte_corr = `$${a}^{${-n}}=\\dfrac{1}{${a}^{${n}}}=\\dfrac{1}{${puissanceEnProduit(a, n)}}=\\dfrac{1}{${tex_nombre(a ** n)}}$`;
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
  this.besoin_formulaire_numerique = ['Niveau de difficulté', 3, '1 : Exposants positifs\n2 : Exposants négatifs\n3 : Exposants relatifs'];
}


