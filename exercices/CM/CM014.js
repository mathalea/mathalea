import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,range1,combinaison_listes} from "/modules/outils.js"
/**
 * Calculer le double ou le triple d'un nombre, calculer la moitié d'un nombre pair ou le tiers d'un multiple de 3
 * @Auteur Rémi Angot
* Référence CM014
 */
export default function Double_moitie_tiers_triple() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Double, moitié, tiers, triple";
  this.consigne = "Calculer";
  this.nb_questions = 10;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;
  this.sup = 1; // niveau de difficulté

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = range1(4);
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texte_corr, a, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      switch (liste_type_de_questions[i]) {
        case 1: // Double
          a = randint(2, 9);
          texte = `$\\text{Le double de }${a}$`;
          texte_corr = `$\\text{Le double de }${a} \\text{ est } ${a * 2}$`;
          break;
        case 2: // Moitié
          a = randint(2, 9) * 2;
          texte = `$\\text{La moitié de }${a * 2}$`;
          texte_corr = `$\\text{La moitié de }${a * 2} \\text{ est } ${a}$`;
          break;
        case 3: // Triple
          a = randint(2, 9);
          texte = `$\\text{Le triple de }${a}$`;
          texte_corr = `$\\text{Le triple de }${a} \\text{ est } ${a * 3}$`;
          break;
        case 4: // Tiers
          a = randint(2, 9);
          texte = `$\\text{Le tiers de }${a * 3}$`;
          texte_corr = `$\\text{Le tiers de }${a * 3} \\text{ est } ${a}$`;
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


