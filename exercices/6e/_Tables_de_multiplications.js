import Exercice from '../ClasseExercice.js'
import {liste_de_question_to_contenu, creer_couples} from '/modules/outils.js'
import {choice, tex_nombre} from '/modules/outils.js'

/**
 * Tables de multiplications classiques, à trou ou un mélange des deux.
 *
 * Par défaut ce sont les tables de 2 à 9 mais on peut choisir les tables que l'on veut
 * @Auteur Rémi Angot
 * Référence 6C10-1
 */
export default function Tables_de_multiplications(tables_par_defaut = "2-3-4-5-6-7-8-9") {
  //Multiplier deux nombres
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = tables_par_defaut;
  this.sup2 = 1; // classique|a_trous|melange
  this.titre = "Tables de multiplications";
  this.consigne = "Calculer";
  this.spacing = 2;

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
      tables = this.sup.split("-"); // Sinon on crée un tableau à partir des valeurs séparées par des -
    }
    let couples = creer_couples(
      tables,
      [2, 3, 4, 5, 6, 7, 8, 9, 10],
      this.nb_questions
    ); //Liste tous les couples possibles (2,3)≠(3,2)
    var type_de_questions = "a_trous";
    for (let i = 0, a, b, texte, texte_corr; i < this.nb_questions; i++) {
      a = couples[i][0];
      b = couples[i][1];
      if (this.sup2 == 1) {
        type_de_questions = "classique";
      } else if (this.sup2 == 2) {
        type_de_questions = "a_trous";
      } else {
        type_de_questions = choice(["classique", "a_trous"]);
      }
      if (type_de_questions == "classique") {
        // classique
        if (choice([true, false])) {
          texte = `$ ${tex_nombre(a)} \\times ${tex_nombre(b)} = \\dotfill$`;
          texte_corr = `$ ${tex_nombre(a)} \\times ${tex_nombre(
            b
          )} = ${tex_nombre(a * b)}$`;
        } else {
          texte = `$ ${tex_nombre(b)} \\times ${tex_nombre(a)} = \\dotfill$`;
          texte_corr = `$ ${tex_nombre(b)} \\times ${tex_nombre(
            a
          )} = ${tex_nombre(a * b)}$`;
        }
      } else {
        // a trous
        if (tables.length > 2) {
          // Si pour le premier facteur il y a plus de 2 posibilités on peut le chercher
          texte = choice([
            "$ " + a + " \\times \\ldots\\ldots = " + a * b + " $",
            "$ \\ldots\\ldots" + " \\times " + b + " = " + a * b + " $",
          ]);
        } else {
          // Sinon on demande forcément le 2e facteur
          texte = "$ " + a + " \\times \\ldots\\ldots = " + a * b + " $";
        }

        texte_corr = "$ " + a + " \\times " + b + " = " + a * b + " $";
      }
      if (est_diaporama) {
        texte = texte.replace("= \\dotfill", "");
      }
      this.liste_questions.push(texte);
      this.liste_corrections.push(texte_corr);
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_texte = [
    "Choix des tables",
    "Nombres séparés par des tirets",
  ]; // Texte, tooltip
  this.besoin_formulaire2_numerique = [
    "Style de questions",
    3,
    "1 : Classique\n2: À trous\n3: Mélangé",
  ];
}
