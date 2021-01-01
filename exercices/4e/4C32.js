import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,calcul,tex_nombrec,tex_nombre} from "/modules/outils.js"
/**
 * Ecrire un nombre décimal en notation scientifique et inversement
 * @Auteur Jean-Claude Lhote
 * 4C32
 */

export default function Notation_scientifique() {
  "use strict"
  Exercice.call(this)
  this.sup = 1;
  this.sup2 = 1;
  this.titre = `Notation scientifique`;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.nb_questions = 5

  this.nouvelle_version = function () {
    if (this.sup == 1) this.consigne = `Donner l\'écriture scientifique des nombres suivants.`;
    else this.consigne = `Donner l\'écriture décimale des nombres suivants.`;
    let type_de_questions_disponibles;
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    if (this.sup2 == 1) type_de_questions_disponibles = [0, 0, 0, 1, 1];
    else if (this.sup2 == 2) type_de_questions_disponibles = [0, 1, 1, 2, 2];
    else type_de_questions_disponibles = [2, 2, 3, 3, 3];

    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
    for (let i = 0, texte, texte_corr, mantisse, exp, decimalstring, scientifiquestring, cpt = 0;
      i < this.nb_questions && cpt < 50;) {
      switch (liste_type_de_questions[i]) {
        case 0:
          mantisse = randint(1, 9)
          exp = randint(1, 5)
          break
        case 1:
          mantisse = calcul(randint(11, 99) / 10)
          exp = randint(1, 5)
          break;
        case 2:
          if (randint(0, 1) == 1) mantisse = calcul(randint(111, 999) / 100)
          else mantisse = calcul((randint(1, 9) * 100 + randint(1, 9)) / 100)
          exp = randint(1, 7) * choice([-1, 1])
          break;
        case 3:
          if (randint(0, 1) == 1) mantisse = calcul((randint(1, 9) * 1000 + randint(1, 19) * 5) / 1000)
          else mantisse = calcul(randint(1111, 9999) / 1000)
          exp = randint(3, 7) * choice([-1, 1])
          break;
      }
      decimalstring = tex_nombrec(mantisse * 10 ** exp)
      scientifiquestring = `${tex_nombre(mantisse)}\\times 10^{${exp}}`
      if (this.sup == 1) {
        texte = `$${decimalstring}$`
        texte_corr = `$${decimalstring} = ${scientifiquestring}$`
      }
      else {
        texte_corr = `$${scientifiquestring} = ${decimalstring}$`
        texte = `$${scientifiquestring}$`

      }
      if (this.liste_questions.indexOf(texte) == -1) {
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = ["Type d\'exercices", 2, "1 : Traduire en notation scientifique\n2 : Traduire en notation décimale"];
  this.besoin_formulaire2_numerique = ["Niveaux de difficulté", 3, "1 : Facile\n2 : Moyen\n3 : Difficile"];
}
