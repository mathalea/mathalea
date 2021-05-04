import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu} from '../../modules/outils.js'
import Trouver_solution_mathador from './_Trouver_solution_mathador.js'
export const titre = 'Générateur de compte est bon'

/**
 * Générateur de tirages pour un compte est bon avec en correction la solution mathador (4 opérations différentes).
 * @Auteur Jean-Claude Lhote
 * référence CM019
 */

export default function Le_compte_est_bonV3() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne =
    "Écrire un calcul égal au nombre cible en utilisant les 5 nombres, 4 opérations différentes et éventuellement des parenthèses.";
  this.nbQuestions = 5;
  this.nbCols = 2;
  this.nbColsCorr = 2;
  this.sup = 30;
  this.sup2 = 70;
  let max_solution = 70;

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    let solution_mathador = [];
    let tirage, solution, expression;
    let min_solution = parseInt(this.sup);
    max_solution = parseInt(this.sup2);
    if (min_solution > max_solution) {
      min_solution = max_solution;
      this.sup = this.sup2;
    }
    for (
      let i = 0, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      solution_mathador = Trouver_solution_mathador(min_solution, max_solution);
      tirage = solution_mathador[0];
      solution = solution_mathador[1];
      expression = solution_mathador[3];

      texte = `Le tirage est le suivant : $${tirage[0]}~;~${tirage[1]}~;~${tirage[2]}~;~${tirage[3]}~;~${tirage[4]}$ <br>La cible est : $${solution}$`;
      texteCorr = `Pour le tirage $${tirage[0]}~;~${tirage[1]}~;~${tirage[2]}~;~${tirage[3]}~;~${tirage[4]}$ et pour la cible $${solution}$, la solution est : $${expression}=${solution}$ `;
      texteCorr += `ou $${solution_mathador[4]}$.<br>`;
      texteCorr += `En effet : <br>`;
      for (let i = 0; i < 4; i++) {
        texteCorr += `$${solution_mathador[2][i]}$<br>`;
      }
      if (this.listeQuestions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte);
        this.listeCorrections.push(texteCorr);
        i++;
      }
      cpt++;
    }
    listeQuestionsToContenu(this);
  };
  this.besoinFormulaireNumerique = ["Limite inférieure", max_solution];
  this.besoin_formulaire2_numerique = ["Limite supérieure", 100];
}
