import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,creer_couples,randint,choice,tex_nombre} from "/modules/outils.js"
/**
 * Les 2 facteurs peuvent terminer par aucun, 1, 2 ou 3 zéros
 * @Auteur Rémi Angot
* Référence 6C10-2
 */
export default function Exercice_tables_de_multiplications_et_multiples_de_10(
  tables_par_defaut = "2-3-4-5-6-7-8-9"
) {
  //Multiplier deux nombres
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = tables_par_defaut;
  this.titre = "Tables de multiplications et multiples de 10";
  this.consigne = "Calculer";
  this.spacing = 2;
  this.tailleDiaporama = 100;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    if (!this.sup) {
      // Si aucune table n'est saisie
      this.sup = "2-3-4-5-6-7-8-9";
    }
    let tables = [];
    if (typeof this.sup == "number") {
      // Si c'est un nombre c'est qu'il y a qu'une seule table
      tables[0] = this.sup;
    } else {
      tables = this.sup.split("-"); // Sinon on crée un tableau à partir des valeurs séparées par des ;
    }
    let couples = creer_couples(
      tables,
      [2, 3, 4, 5, 6, 7, 8, 9, 10],
      this.nb_questions
    ); //Liste tous les couples possibles (2,3)≠(3,2)
    for (
      let i = 0, a, b, k1, k2, texte, texte_corr, melange;
      i < this.nb_questions;
      i++
    ) {
      a = couples[i][0];
      b = couples[i][1];
      if (a > 1) {
        k1 = choice([1, 10, 100, 1000]);
      } else {
        k1 = choice([10, 100, 1000]);
      }
      k2 = choice([1, 10, 100, 1000]);
      a = k1 * a;
      b = k2 * b;
      melange = randint(0, 1);
      if (melange == 1) {
        // échange a et b pour que les multiplications ne soient pas toujours dans le même ordre (surtout lorsque tables n'a qu'un seul élément)
        let c = a;
        a = b;
        b = c;
      }

      texte =
        "$ " + tex_nombre(a) + " \\times " + tex_nombre(b) + " = \\dotfill $";
      texte_corr =
        "$ " +
        tex_nombre(a) +
        " \\times " +
        tex_nombre(b) +
        " = " +
        tex_nombre(a * b) +
        " $";
      this.liste_questions.push(texte);
      this.liste_corrections.push(texte_corr);
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_texte = [
    "Choix des tables",
    "Nombres séparés par des tirets",
  ]; // Texte, tooltip
}

