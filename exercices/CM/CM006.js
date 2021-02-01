import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint} from "/modules/outils.js"
/**
 * Un nombre à 2 chiffres ne terminant pas par 9 - 9
 * @Auteur Rémi Angot
 * Référence CM006
*/
export default function Soustraire9() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Soustraire 9";
  this.consigne = "Calculer";
  this.nb_questions = 10;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;
  this.tailleDiaporama = 100;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    for (
      let i = 0, texte, texte_corr, a, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      a = randint(1, 9) * 10 + randint(0, 8);
      texte = `$${a}-9$`;
      texte_corr = `$${a}-9=${a - 9}$`;

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

