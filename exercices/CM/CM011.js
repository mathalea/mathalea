import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,range1,combinaison_listes,tex_nombrec,tex_nombre} from "/modules/outils.js"
/**
 * Calculer le quart d'un multiple de 4, d'un impair, d'un multiple de 400, d'un multiple de 40, d'un nombre a,b avec a et b multiples de 4
 * @Auteur Rémi Angot
 * Référence CM011
*/
export default function Quart() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Quart";
  this.consigne = "Calculer";
  this.nb_questions = 10;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = range1(5);
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texte_corr, a, b, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      switch (liste_type_de_questions[i]) {
        case 1: // Table de 4
          a = randint(2, 9);
          texte = `$\\text{Le quart de }${a * 4}$`;
          texte_corr = `$\\text{Le quart de }${a * 4} \\text{ est } ${a}$`;
          break;
        case 2: // Impair
          a = randint(2, 9);
          b = choice([1, 2, 3]);
          texte = `$\\text{Le quart de }${a * 4 + b}$`;
          texte_corr = `$\\text{Le quart de }${a * 4 + b
            } \\text{ est } ${tex_nombrec(a + b / 4)}$`;
          break;
        case 3: // Table de 400
          a = randint(2, 9);
          texte = `$\\text{Le quart de }${tex_nombre(a * 4 * 100)}$`;
          texte_corr = `$\\text{Le quart de }${tex_nombre(
            a * 4 * 100
          )} \\text{ est } ${tex_nombre(a * 100)}$`;
          break;
        case 4: // Table de 40
          a = randint(2, 9);
          texte = `$\\text{Le quart de }${tex_nombre(a * 4 * 10)}$`;
          texte_corr = `$\\text{Le quart de }${tex_nombre(
            a * 4 * 10
          )} \\text{ est } ${tex_nombre(a * 10)}$`;
          break;
        case 5: // a,b avec a et b divisibles par 4
          a = randint(2, 9);
          b = randint(2, 9);
          texte = `$\\text{Le quart de }${tex_nombrec(a * 4 + (b * 4) / 100)}$`;
          texte_corr = `$\\text{Le quart de }${tex_nombrec(
            a * 4 + (b * 4) / 100
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

