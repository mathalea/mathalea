import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu} from "/modules/outils.js"
import Trouver_solution_mathador from './_Trouver_solution_mathador.js'
/**
 * @Auteur Jean-Claude Lhote
  * référence CM020
 * Dans cette version, il est possible de choisir 1,2,3,4 ou 5 nombres du tirage et de contraindre la cible entre deux valeurs
 */
export default function Le_compte_est_bonV4() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Générateur de compte est bon version semi-aléatoire";
  this.consigne =
    "Écrire un calcul égal au nombre cible en utilisant les 5 nombres, 4 opérations différentes et éventuellement des parenthèses.";
  this.nb_questions = 1;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;
  this.sup = 1;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let solution_mathador = [];
    let tirage, solution, expression, min, max, texte, texte_corr;
    let minmax = [];
    if (!this.sup2) {
      // Si rien n'est saisi
      min = 0;
      max = 100;
    } else {
      if (typeof this.sup2 == "number") {
        // Si c'est un nombre c'est qu'il y a qu'une seule grandeur
        min = 0;
        max = this.sup2;
      } else {
        minmax = this.sup2.split("-"); // Sinon on crée un tableau à partir des valeurs séparées par des -
        min = minmax[0];
        max = minmax[1];
      }
    }
    if (!this.sup) {
      // Si rien n'est saisi
      solution_mathador = Trouver_solution_mathador(min, max);
    } else {
      if (typeof this.sup == "number") {
        // Si c'est un nombre c'est qu'il y a qu'une seule grandeur
        solution_mathador = Trouver_solution_mathador(min, max, this.sup);
      } else {
        tirage = this.sup.split("-"); // Sinon on crée un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < tirage.length; i++) tirage[i] = parseInt(tirage[i]);
        solution_mathador = Trouver_solution_mathador(min, max, ...tirage);
      }
    }

    tirage = solution_mathador[0];
    solution = solution_mathador[1];
    expression = solution_mathador[3];

    texte = `Le tirage est le suivant : $${tirage[0]}~;~${tirage[1]}~;~${tirage[2]}~;~${tirage[3]}~;~${tirage[4]}$ <br>La cible est : $${solution}$`;
    texte_corr = `Pour le tirage $${tirage[0]}~;~${tirage[1]}~;~${tirage[2]}~;~${tirage[3]}~;~${tirage[4]}$ et pour la cible $${solution}$, la solution est : $${expression}=${solution}$ `;
    texte_corr += `ou $${solution_mathador[4]}$.<br>`;
    texte_corr += `En effet : <br>`;
    for (let i = 0; i < 4; i++) {
      texte_corr += `$${solution_mathador[2][i]}$<br>`;
    }
    this.liste_questions.push(texte);
    this.liste_corrections.push(texte_corr);

    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_texte = [
    "Choix des nombres du tirage (de aucun à cinq)",
    "Nombres séparés par des tirets",
  ]; // Texte, tooltip
  this.besoin_formulaire2_texte = [
    "Intervalle pour la cible (ou rien pour cible non contrainte)",
    "Minimum-Maximum (éviter de trop contraindre la cible, cela peut bloquer le programme)",
  ]; // Texte, tooltip

  // this.besoin_formulaire2_numerique = ['Limite supérieure',100];
}
