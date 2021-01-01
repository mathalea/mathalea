import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint} from "/modules/outils.js"
/**
 * 100-...=
 * @Auteur Rémi Angot
* Référence CM012
 */
export default function Complement_a_100() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Complément à 100";
  this.consigne = "Calculer";
  this.nb_questions = 10;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    for (
      let i = 0, texte, texte_corr, a, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      a = randint(11, 89);
      texte = `$100-${a}$`;
      texte_corr = `$100-${a}=${100 - a}$`;

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

