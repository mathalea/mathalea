import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,range1,combinaison_listes,tex_nombrec,tex_nombre} from "/modules/outils.js"
/**
 * Calculer la moitié d'un nombre pair, d'un impair inférieur à 20, d'un multiple de 200, d'un nombre de la forme a00 avec a impair, d'un nombre de la forme
 *  a,b avec a et b pairs ou 1xx avec xx un nombre pair
 * @Auteur Rémi Angot
 * Référence CM009
*/
export default function Moitie() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Moitié";
  this.consigne = "Calculer";
  this.nb_questions = 10;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;
  this.sup = 1; // niveau de difficulté

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = range1(6);
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texte_corr, a, b, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      switch (liste_type_de_questions[i]) {
        case 1: // Table de 2
          a = randint(2, 9);
          texte = `$\\text{La moitié de }${a * 2}$`;
          texte_corr = `$\\text{La moitié de }${a * 2} \\text{ est } ${a}$`;
          break;
        case 2: // Impair inférieur à 20
          a = randint(2, 9);
          texte = `$\\text{La moitié de }${a * 2 + 1}$`;
          texte_corr = `$\\text{La moitié de }${a * 2 + 1
            } \\text{ est } ${tex_nombrec(a + 5 / 10)}$`;
          break;
        case 3: // Table de 200
          a = randint(2, 9);
          texte = `$\\text{La moitié de }${tex_nombre(a * 2 * 100)}$`;
          texte_corr = `$\\text{La moitié de }${tex_nombre(
            a * 2 * 100
          )} \\text{ est } ${tex_nombre(a * 100)}$`;
          break;
        case 4: // a00 avec a impair
          a = randint(2, 9);
          texte = `$\\text{La moitié de }${tex_nombre((a * 2 + 1) * 100)}$`;
          texte_corr = `$\\text{La moitié de }${tex_nombre(
            (a * 2 + 1) * 100
          )} \\text{ est } ${tex_nombre(a * 100 + 50)}$`;
          break;
        case 5: // a,b avec a et b pairs
          a = randint(2, 9);
          b = randint(2, 9);
          texte = `$\\text{La moitié de }${tex_nombrec(
            a * 2 + (b * 2) / 100
          )}$`;
          texte_corr = `$\\text{La moitié de }${tex_nombrec(
            a * 2 + (b * 2) / 100
          )} \\text{ est } ${tex_nombrec(a + b / 100)}$`;
          break;
        case 6: // 1xx avec xx un nombre pair
          a = randint(2, 9);
          texte = `$\\text{La moitié de }${100 + a * 2}$`;
          texte_corr = `$\\text{La moitié de }${100 + a * 2} \\text{ est } ${50 + a
            }$`;
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

