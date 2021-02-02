import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu_sans_numero,choice,combinaison_listes,tex_nombre} from "/modules/outils.js"
/**
 * Un nombre est-il divisible par 2, 3, 5, 9 ?
 *
 *
 * @Auteur Rémi Angot
 * 6N43-2
 */
export default function Tableau_criteres_de_divisibilite() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Critères de divisibilité (plusieurs possibles)";
  this.consigne =
    "Compléter le tableau en mettant oui ou non dans chaque case.";
  this.spacing = 1;
  this.spacing_corr = 1;
  this.nb_questions = 5;
  this.nb_cols_corr = 1;
  this.nb_cols = 1;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let liste_des_nombres_possibles = [
      "div2",
      "div3",
      "div39",
      "div5",
      "div25",
      "div23",
      "div239",
      "div35",
      "div2359",
      "divrien",
    ];
    // divisible par 2, divisible par 3, divisible par 3 et 9...

    let liste_des_types_de_nombres = combinaison_listes(
      liste_des_nombres_possibles,
      this.nb_questions
    );
    let tableau_de_nombres = [],texte,texte_corr;
    let tableau_de_nombres_avec_correction = [];
    let liste_de_facteurs = [
      7,
      11,
      13,
      17,
      19,
      23,
      29,
      31,
      37,
      41,
      43,
      47,
      53,
      59,
      61,
      67,
      71,
      73,
      79,
      83,
      89,
      97,
      101,
      103,
      107,
      109,
      113,
      127,
      131,
      137,
      139,
      149,
      151,
      157,
      163,
      167,
      173,
      179,
      181,
      191,
      193,
      197,
      199,
      211,
      223,
      227,
      229,
      233,
      239,
      241,
      251,
      257,
      263,
      269,
      271,
      277,
      281,
      283,
      293,
    ];
    for (let i = 0; i < this.nb_questions; i++) {
      switch (liste_des_types_de_nombres[i]) {
        case "div2":
          tableau_de_nombres[i] = 2 * choice(liste_de_facteurs);
          tableau_de_nombres_avec_correction[i] = `${tex_nombre(
            tableau_de_nombres[i]
          )} & \\color{blue} \\text{oui} & \\text{non} & \\text{non} & \\text{non} \\\\`;
          break;
        case "div3":
          tableau_de_nombres[i] = 3 * choice(liste_de_facteurs);
          tableau_de_nombres_avec_correction[i] = `${tex_nombre(
            tableau_de_nombres[i]
          )} & \\text{non} & \\color{blue} \\text{oui} & \\text{non} & \\text{non} \\\\`;
          break;
        case "div39":
          tableau_de_nombres[i] = 9 * choice(liste_de_facteurs);
          tableau_de_nombres_avec_correction[i] = `${tex_nombre(
            tableau_de_nombres[i]
          )} & \\text{non} & \\color{blue} \\text{oui} & \\text{non} & \\color{blue} \\text{oui} \\\\`;
          break;
        case "div5":
          tableau_de_nombres[i] = 5 * choice(liste_de_facteurs);
          tableau_de_nombres_avec_correction[i] = `${tex_nombre(
            tableau_de_nombres[i]
          )} & \\text{non} & \\text{non} & \\color{blue} \\text{oui} & \\text{non} \\\\`;
          break;
        case "div25":
          tableau_de_nombres[i] = 10 * choice(liste_de_facteurs);
          tableau_de_nombres_avec_correction[i] = `${tex_nombre(
            tableau_de_nombres[i]
          )} & \\color{blue} \\text{oui} & \\text{non} & \\color{blue} \\text{oui} & \\text{non} \\\\`;
          break;
        case "div23":
          tableau_de_nombres[i] = 6 * choice(liste_de_facteurs);
          tableau_de_nombres_avec_correction[i] = `${tex_nombre(
            tableau_de_nombres[i]
          )} & \\color{blue} \\text{oui} & \\color{blue} \\text{oui} & \\text{non} & \\text{non} \\\\`;
          break;
        case "div239":
          tableau_de_nombres[i] = 18 * choice(liste_de_facteurs);
          tableau_de_nombres_avec_correction[i] = `${tex_nombre(
            tableau_de_nombres[i]
          )} & \\color{blue} \\text{oui} & \\color{blue} \\text{oui} & \\text{non} & \\color{blue} \\text{oui} \\\\`;
          break;
        case "div35":
          tableau_de_nombres[i] = 15 * choice(liste_de_facteurs);
          tableau_de_nombres_avec_correction[i] = `${tex_nombre(
            tableau_de_nombres[i]
          )} & \\text{non} & \\color{blue} \\text{oui} & \\color{blue} \\text{oui} & \\text{non} \\\\`;
          break;
        case "div2359":
          tableau_de_nombres[i] = 90 * choice(liste_de_facteurs);
          tableau_de_nombres_avec_correction[i] = `${tex_nombre(
            tableau_de_nombres[i]
          )} & \\color{blue} \\text{oui} & \\text{non} & \\text{non} & \\text{non} \\\\`;
          break;
        case "divrien":
          tableau_de_nombres[i] = choice(liste_de_facteurs);
          tableau_de_nombres_avec_correction[i] = `${tex_nombre(
            tableau_de_nombres[i]
          )} & \\text{non} & \\text{non} & \\text{non} & \\text{non} \\\\`;
          break;
      }
    }

    if (sortie_html) {
      texte = `$\\def\\arraystretch{2.5}\\begin{array}{|l|c|c|c|c|}\n`;
    } else {
      texte = `$\\begin{array}{|l|c|c|c|c|}\n`;
    }

    texte += `\\hline\n`;
    texte += `\\text{... est divisible} & \\text{par }2 & \\text{par }3 & \\text{par }5 & \\text{par }9\\\\\n`;
    texte += `\\hline\n`;
    for (var i = 0; i < this.nb_questions; i++) {
      texte += `${tex_nombre(tableau_de_nombres[i])} & & & & \\\\\n`;
      texte += `\\hline\n`;
    }

    texte += `\\end{array}\n$`;

    if (sortie_html) {
      texte_corr = `$\\def\\arraystretch{2.5}\\begin{array}{|l|c|c|c|c|}\n`;
    } else {
      texte_corr = `$\\begin{array}{|l|c|c|c|c|}\n`;
    }
    texte_corr += `\\hline\n`;
    texte_corr += `\\text{... est divisible} & \\text{par }2 & \\text{par }3 & \\text{par }5 & \\text{par }9\\\\\n`;
    texte_corr += `\\hline\n`;
    for (var i = 0; i < this.nb_questions; i++) {
      texte_corr += tableau_de_nombres_avec_correction[i];
      texte_corr += `\\hline\n`;
    }

    texte_corr += `\\end{array}$\n`;

    this.liste_questions.push(texte);
    this.liste_corrections.push(texte_corr);
    liste_de_question_to_contenu_sans_numero(this);
  };
}

