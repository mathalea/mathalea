import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,range1,combinaison_listes,tex_nombrec,tex_nombre} from "/modules/outils.js"
/**
 * Calculer le tiers d'un multiple de 3, d'un multiple de 300, d'un multiple de 30 ou d'un nombre a,b avec a et b multiples de 3
 * @Auteur Rémi Angot
* Référence CM010
 */
export default function Tiers() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Tiers";
  this.consigne = "Calculer";
  this.nb_questions = 10;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;
  this.sup = 1; // niveau de difficulté
  this.tailleDiaporama = 100;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = range1(4);
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texte_corr, a, b, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      switch (liste_type_de_questions[i]) {
        case 1: // Table de 3
          a = randint(2, 9);
          texte = `$\\text{Le tiers de }${a * 3}$`;
          texte_corr = `$\\text{Le tiers de }${a * 3} \\text{ est } ${a}$`;
          break;
        case 2: // Table de 300
          a = randint(2, 9);
          texte = `$\\text{Le tiers de }${tex_nombre(a * 3 * 100)}$`;
          texte_corr = `$\\text{Le tiers de }${tex_nombre(
            a * 3 * 100
          )} \\text{ est } ${tex_nombre(a * 100)}$`;
          break;
        case 3: // Table de 30
          a = randint(2, 9);
          texte = `$\\text{Le tiers de }${tex_nombre(a * 3 * 10)}$`;
          texte_corr = `$\\text{Le tiers de }${tex_nombre(
            a * 3 * 10
          )} \\text{ est } ${tex_nombre(a * 10)}$`;
          break;
        case 4: // a,b avec a et b divisibles par 3
          a = randint(2, 9);
          b = randint(2, 9);
          texte = `$\\text{Le tiers de }${tex_nombrec(a * 3 + (b * 3) / 100)}$`;
          texte_corr = `$\\text{Le tiers de }${tex_nombrec(
            a * 3 + (b * 3) / 100
          )} \\text{ est } ${tex_nombrec(a + b / 100)}$`;
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
  //this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}

