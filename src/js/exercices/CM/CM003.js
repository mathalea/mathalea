import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,creerCouples,choice,combinaisonListes} from '../../modules/outils.js'
export const titre = 'Tables de multiplications et de divisions'

/**
 * Tables de multiplications et de divisions classiques, à trou ou un mélange des deux.
 *
 * Par défaut ce sont les tables de 2 à 9 mais on peut choisir les tables que l'on veut
 * @Auteur Rémi Angot
 * Référence CM003
 */
export default function Tables_de_multiplications_et_divisions(
  tables_par_defaut = "2-3-4-5-6-7-8-9"
) {
  //Multiplier ou diviser deux nombres
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = tables_par_defaut;
  this.sup2 = 1; // classique|a_trous|melange
  this.titre = titre;
  this.consigne = "Calculer";
  this.spacing = 2;
  this.tailleDiaporama = 100;

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
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
    let couples = creerCouples(
      tables,
      [2, 3, 4, 5, 6, 7, 8, 9, 10],
      this.nbQuestions
    ); //Liste tous les couples possibles (2,3)≠(3,2)
    let listeTypeDeQuestions = combinaisonListes(
      ["classique", "a_trous"],
      this.nbQuestions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let operation = combinaisonListes(["x", "div"], this.nbQuestions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let type_de_questions;
    for (let i = 0, a, b, texte, texteCorr; i < this.nbQuestions; i++) {
      a = couples[i][0];
      b = couples[i][1];
      if (this.sup2 == 1) {
        type_de_questions = "classique";
      } else if (this.sup2 == 2) {
        type_de_questions = "a_trous";
      } else {
        type_de_questions = listeTypeDeQuestions[i];
      }

      if (operation[i] == "x") {
        if (type_de_questions == "classique") {
          // classique
          texte = "$ " + a + " \\times " + b + " = \\dotfill $";
          texteCorr = "$ " + a + " \\times " + b + " = " + a * b + " $";
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

          texteCorr = "$ " + a + " \\times " + b + " = " + a * b + " $";
        }
      } else {
        if (type_de_questions == "classique") {
          // classique
          texte = "$ " + a * b + " \\div " + b + " = \\dotfill $";
        } else {
          // a trous
          if (choice([true, false])) {
            texte = `$ ${a * b} \\div \\ldots\\ldots = ${a}$`;
          } else {
            texte = `$ \\ldots\\ldots \\div ${b}  = ${a}$`;
          }
        }
        texteCorr = `$ ${a * b} \\div ${b} = ${a}$`;
      }
      if (est_diaporama) {
        texte = texte.replace("= \\dotfill", "");
      }
      this.listeQuestions.push(texte);
      this.listeCorrections.push(texteCorr);
    }
    listeQuestionsToContenu(this);
  };
  this.besoinFormulaireTexte = [
    "Choix des tables",
    "Nombres séparés par des tirets",
  ]; // Texte, tooltip
  this.besoin_formulaire2_numerique = [
    "Style de questions",
    3,
    "1 : Classique\n2: À trous\n3: Mélangé",
  ];
}

