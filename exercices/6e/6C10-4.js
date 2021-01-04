import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,tex_nombre} from "/modules/outils.js"
/**
 * Additionner deux entiers
 * @Auteur Rémi Angot
 * Référence 6C10-4
 */
export default function Exercice_tables_d_additions(max = 20) {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Addition de deux entiers";
  this.consigne = "Calculer";
  this.sup = max; // Le paramètre accessible à l'utilisateur sera la valeur maximale
  this.spacing = 2;
  this.tailleDiaporama = 100;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    for (
      let i = 0, a, b, texte, texte_corr, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      a = randint(2, this.sup);
      b = randint(2, this.sup);
      texte = "$ " + tex_nombre(a) + " + " + tex_nombre(b) + " = \\dotfill $";
      texte_corr =
        "$ " +
        tex_nombre(a) +
        " + " +
        tex_nombre(b) +
        " = " +
        tex_nombre(a + b) +
        " $";
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
  this.besoin_formulaire_numerique = ["Valeur maximale", 99999];
}

