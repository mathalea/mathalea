import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,rangeMinMax,ecriturePuissance,num_alpha} from "/modules/outils.js"

/**
 * * Comparer des puissances de 10.
 *
 * Paramétrages possibles :
 * 1 : Puissances de 10 seules
 * 2 : mantisses différentes et même exposant
 * 3 : mêmes mantisses et exposants différents
 * 4 : mantisses et exposants différents
 * 5 : mantisses (négatives) et exposants différents
 * 6 : Tous types
 * Programmes : p130 : "Comparer, ranger, encadrer des nombres rationnels en écriture décimale, fractionnaire ou scientifique
 * @auteur Erwan Duplessy
 * date : 15/11/2020
 * 4C30-4
 */
export default function Comparer_puissance10() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = 1; // Avec ou sans relatifs
  this.titre = "Puissances de 10";
  this.consigne = "Dans chaque cas, comparer les deux nombres.";
  this.spacing = 2;
  this.spacing_corr = 2;
  this.nb_questions = 5;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;
  this.sup = 1;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    texte = ` `; // texte énoncé
    texte_corr = ` `; // texte correction
    let a1 = 0; // mantisse 1
    let a2 = 0; // mantisse 2
    let n1 = 0; // puissance 1
    let n2 = 0; // puissance 2
    let nbA1 = 0; // valeur numérique du nombre 1
    let nbA2 = 0; // valeur numérique du nombre 2
    let c = parseInt(this.sup);
    for (let i = 0; i < this.nb_questions; i++) {
      if (this.sup == 6) {
        c = randint(1, 5); // si le choix est "tous type", on choisit un choix précédent
      }
      switch (c) {
        case 1:
          a1 = 1;
          n1 = randint(-9, 9);
          a2 = 1;
          n2 = choice(rangeMinMax(-9, 9), [n1]);
          break;
        case 2:
          a1 = randint(1, 9) + 0.1 * randint(1, 9) * randint(0, 1);
          n1 = randint(-9, 9);
          a2 = choice([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [a1]) + 0.1 * randint(1, 9) * randint(0, 1);
          n2 = n1;
          break;
        case 3:
          a1 = randint(1, 9) + 0.1 * randint(0, 9) + 0.01 * randint(0, 9);
          n1 = randint(-9, 9);
          a2 = a1;
          n2 = randint(-9, 9);
          break;
        case 4:
          a1 = randint(1, 9) + 0.1 * randint(0, 9);
          n1 = randint(-9, 9);
          a2 = choice(rangeMinMax(1, 99)) / 10;
          n2 = randint(-9, 9);
          break;
        case 5:
          a1 = choice(rangeMinMax(-99, 99, [0])) / 10;
          n1 = randint(-9, 9);
          a2 = choice(rangeMinMax(-99, 99, [0])) / 10;
          n2 = randint(-9, 9);
          break;
        default:
          break;
      }
      nbA1 = a1 * 10 ** n1;
      nbA2 = a2 * 10 ** n2;

      texte += num_alpha(i) + "  " + ecriturePuissance(a1, 10, n1) + " et " + ecriturePuissance(a2, 10, n2) + "<br>";
      if (nbA1 > nbA2) {
        texte_corr += num_alpha(i) + ` ${ecriturePuissance(a1, 10, n1)} $>$ ${ecriturePuissance(a2, 10, n2)} <br>`;
      } else {
        if (nbA1 == nbA2) {
          texte_corr += num_alpha(i) + ` ${ecriturePuissance(a1, 10, n1)} $=$ ${ecriturePuissance(a2, 10, n2)} <br>`;
        } else {
          texte_corr += num_alpha(i) + ` ${ecriturePuissance(a1, 10, n1)} $<$ ${ecriturePuissance(a2, 10, n2)} <br>`;
        }
      }
    }
    this.liste_questions.push(texte);
    this.liste_corrections.push(texte_corr);
    liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
  };
  this.besoin_formulaire_numerique = ["Niveau de difficulté", 6,
    "1 : puissances de 10 seules\n 2 : mantisses différentes et même exposant\n 3 : mêmes mantisses et exposants différents\n 4 : mantisses et exposants différents\n 5 : mantisses (négatives) et exposants différents\n 6 : tous types"];
}
