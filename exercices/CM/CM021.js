import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,range1,shuffle,combinaison_listes,calcul} from "/modules/outils.js"

/**
 * Un "Le compte est bon" avec des solutions "formatées" pour travailler certains incontournables du calcul mental
 *  @Auteur Jean-Claude Lhote
 * Référence CM021
 */
export default function Compte_Est_Bon() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Le compte est bon original";
  this.consigne =
    "Trouve le résultat en utilisant les quatre opérations et les nombres du tirage (une seule fois).";
  this.nb_questions = 5;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;
  this.sup = 1; // niveau de calcul souhaité

  this.nouvelle_version = function () {
    let type_de_questions, a, b, c, d, cible, tirage, choix;
    if (!this.sup) {
      // Si rien n'est saisi
      type_de_questions = combinaison_listes([1, 2, 3], this.nb_questions);
    } else {
      if (typeof this.sup == "number") {
        // Si c'est un nombre c'est qu'il y a qu'une seule grandeur
        type_de_questions = combinaison_listes(
          [parseInt(this.sup)],
          this.nb_questions
        );
      } else {
        type_de_questions = this.sup.split("-"); // Sinon on crée un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < type_de_questions.length; i++)
          type_de_questions[i] = parseInt(type_de_questions[i]);
        this.nb_questions = type_de_questions.length;
      }
    }
    choix = combinaison_listes(range1(5), this.nb_questions);
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
      switch (type_de_questions[i]) {
        case 1:
          a = randint(2, 9);
          b = randint(2, 8, a);
          c = randint(1, 9, [a, b]);
          d = randint(1, 9, [a, b, c]);
          switch (choix[i]) {
            case 1:
              cible = calcul(a * 100 + b * 10 + c + d);
              tirage = shuffle([100, 10, a, b, c, d]);
              texte_corr = `Le compte est bon : $${cible}=100\\times${a}+10\\times${b}+${c}+${d}$`;
              break;
            case 2:
              cible = calcul(a * 100 + b * 10 + c - d);
              tirage = shuffle([100, 10, a, b, c, d]);
              texte_corr = `Le compte est bon : $${cible}=100\\times${a}+10\\times${b}+${c}-${d}$`;
              break;
            case 3:
              cible = calcul(a * 100 - b * 10 + c + d);
              tirage = shuffle([100, 10, a, b, c, d]);
              texte_corr = `Le compte est bon : $${cible}=100\\times${a}-10\\times${b}+${c}+${d}$`;
              break;
            case 4:
              cible = calcul(a * 100 - b * 10 + c - d);
              tirage = shuffle([100, 10, a, b, c, d]);
              texte_corr = `Le compte est bon : $${cible}=100\\times${a}-10\\times${b}+${c}-${d}$`;
              break;
            default:
              cible = calcul(a * 100 + (b + c) * 10 + d);
              tirage = shuffle([100, 10, a, b, c, d]);
              texte_corr = `Le compte est bon : $${cible}=100\\times${a}+10\\times(${b}+${c})+${d}$`;
          }
          break;

        case 2:
          a = randint(3, 9);
          b = randint(3, 8, a);
          c = randint(3, 9, [a, b]);
          switch (choix[i]) {
            case 1:
              cible = calcul(a * 100 + b * 10 + c);
              tirage = shuffle([50, 50, 10, a, b, c]);
              texte_corr = `Le compte est bon : $${cible}=(50+50)\\times${a}+10\\times${b}+${c}$`;
              break;
            case 2:
              cible = calcul(a * 100 + b * 10 - c);
              tirage = shuffle([50, 50, 10, a, b, c]);
              texte_corr = `Le compte est bon : $${cible}=(50+50)\\times${a}+10\\times${b}-${c}$`;
              break;
            case 3:
              cible = calcul(a * 100 - b * 10 + c);
              tirage = shuffle([50, 50, 10, a, b, c]);
              texte_corr = `Le compte est bon : $${cible}=(50+50)\\times${a}-10\\times${b}+${c}$`;
              break;
            case 4:
              cible = calcul(a * 100 - b * 10 - c);
              tirage = shuffle([50, 2, 10, a, b, c]);
              texte_corr = `Le compte est bon : $${cible}=2\\times50\\times${a}-10\\times${b}-${c}$`;
              break;
            default:
              cible = calcul(a * 100 + b * 10 - c);
              tirage = shuffle([25, 4, 10, a, b, c]);
              texte_corr = `Le compte est bon : $${cible}=4\\times25\\times${a}+10\\times${b}-${c}$`;
          }
          break;
        case 3:
          a = randint(2, 5);
          b = randint(3, 8, a);
          c = randint(3, 9, [a, b]);
          switch (choix[i]) {
            case 1:
              cible = calcul(a * (100 + b * 10) + c);
              tirage = shuffle([50, 2, 10, a, b, c]);
              texte_corr = `Le compte est bon : $${cible}=${a}\\times(50\\times2+10\\times${b})+${c}$`;
              break;
            case 2:
              cible = calcul(a * (100 + b * 10) - c);
              tirage = shuffle([50, 2, 10, a, b, c]);
              texte_corr = `Le compte est bon : $${cible}=${a}\\times(50\\times2+10\\times${b})-${c}$`;
              break;
            case 3:
              cible = calcul(a * (100 + b * 10) + c);
              tirage = shuffle([25, 4, 10, a, b, c]);
              texte_corr = `Le compte est bon : $${cible}=${a}\\times(25\\times4+10\\times${b})+${c}$`;
              break;
            case 4:
              cible = calcul(a * (100 + b * 10) - c);
              tirage = shuffle([25, 4, 10, a, b, c]);
              texte_corr = `Le compte est bon : $${cible}=${a}\\times(25\\times4+10\\times${b})-${c}$`;
              break;
            default:
              cible = calcul(a * (100 + b * 10) + c);
              tirage = shuffle([25, 75, 10, a, b, c]);
              texte_corr = `Le compte est bon : $${cible}=${a}\\times((25+75)+10\\times${b})+${c}$`;
          }
          break;
      }
      texte = `Voici le tirage : `;
      for (let i = 0; i < 5; i++)
        texte += `${tirage[i]} ; `;
      texte += `${tirage[5]}.<br>`;
      texte += `Et le nombre à trouver est : ${cible}.`;

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
  this.besoin_formulaire_texte = [
    "Niveaux de difficultés (1 à 3)",
    "Nombres séparés par des tirets",
  ]; // Texte, tooltip
}
