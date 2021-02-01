import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,enleve_element,choice,combinaison_listes,arrondi_virgule,calcul,tex_nombrec,creerNomDePolygone,tex_nombre} from "/modules/outils.js"

/**
 * Déterminer le périmètre et l'aire d'un carré, d'un rectangle, d'un triangle rectangle, d'un cercle
 *
 * * 1 : Carré, rectangle et triangle rectangle
 * * 2: Uniquement des cercles
 * * 3 : Les 4 sont demandés
 * @Auteur Rémi Angot// modifié par Mireille Gain pour le support des décimaux
 */
export default function Exercice_perimetres_et_aires(difficulte = 1) {
  //Calculer le périmètre et l'aire de figures
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = difficulte;
  this.titre = "Calculs de périmètres et d'aires";
  this.consigne =
    "Pour chacune des figures, calculer son périmètre puis son aire (valeur exacte et si nécessaire valeur approchée au dixième près).";
  this.spacing = 1;
  this.nb_questions = 4;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let triplets_pythagoriciens = [
      [3, 4, 5],
      [6, 8, 10],
      [15, 8, 17],
      [24, 10, 26],
      [5, 12, 13],
      [12, 16, 20],
      [21, 20, 29],
      [9, 40, 41],
    ];
    let type_de_questions_disponibles = [
      "carre",
      "rectangle",
      "triangle_rectangle",
      "cercle",
    ],type_de_questions;
    let partieDecimale1, partieDecimale2, partieDecimale3;
    if (this.sup2) {
      partieDecimale1 = calcul(randint(1, 9) / 10);
      partieDecimale2 = calcul(randint(1, 9) / 10);
      partieDecimale3 = calcul(randint(1, 9) / 10 * randint(0, 1));
    }
    else {
      partieDecimale1 = 0;
      partieDecimale2 = 0;
      partieDecimale3 = 0;
    }

    if (this.sup == 1) {
      enleve_element(type_de_questions_disponibles, "cercle");
      this.nb_cols = 1;
    } else if (this.sup == 2) {
      type_de_questions_disponibles = ["cercle"];
    }
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
      type_de_questions = liste_type_de_questions[i];
      switch (type_de_questions) {
        case "carre":
          let cote = calcul(randint(2, 11) + partieDecimale1);
          let nom_carre = creerNomDePolygone(4);
          if (choice([true, false])) {
            // 2 énoncés possibles équiprobables
            texte = `Un carré $${nom_carre}$ de $${tex_nombre(cote)}$ cm de côté .`;
          } else {
            texte = `Un carré $${nom_carre}$ tel que $${nom_carre[0] + nom_carre[1]} = ${tex_nombre(cote)}$ cm.`;
          }

          texte_corr = `$\\mathcal{P}_{${nom_carre}}=4\\times${tex_nombre(cote)}~\\text{cm}=${tex_nombrec(4 * cote)}~\\text{cm}$<br>`;
          texte_corr += `$\\mathcal{A}_{${nom_carre}}=${tex_nombre(cote)}~\\text{cm}\\times${tex_nombre(cote)}~\\text{cm}=${tex_nombrec(cote * cote)}~\\text{cm}^2$`;
          break;
        case "rectangle":
          let L = calcul(randint(3, 11) + partieDecimale2);
          let l = randint(2, L - 1);
          let nom_rectangle = creerNomDePolygone(4);
          if (choice([true, false])) {
            // 2 énoncés possibles équiprobables
            texte = `Un rectangle $${nom_rectangle}$ de $${tex_nombre(L)}$ cm de longueur et de $${l}$ cm de largeur.`;
          } else {
            texte = `Un rectangle $${nom_rectangle}$ tel que $${nom_rectangle[0] + nom_rectangle[1] + " = " + tex_nombre(L)}$ cm et $${nom_rectangle[1] + nom_rectangle[2] + " = " + l}$ cm.`;
          }

          texte_corr = `$\\mathcal{P}_{${nom_rectangle}}=(${tex_nombre(L)}~\\text{cm}+${l}~\\text{cm})\\times2=${tex_nombrec((L + l) * 2)}~\\text{cm}$<br>`;
          texte_corr += `$\\mathcal{A}_{${nom_rectangle}}=${tex_nombre(L)}~\\text{cm}\\times${l}~\\text{cm}=${tex_nombrec(L * l)}~\\text{cm}^2$`;
          break;
        case "triangle_rectangle":
          let triplet = choice(triplets_pythagoriciens);
          enleve_element(triplets_pythagoriciens, triplet);
          let a = calcul(triplet[0] * (1 + partieDecimale1));
          let b = calcul(triplet[1] * (1 + partieDecimale1));
          let c = calcul(triplet[2] * (1 + partieDecimale1));
          let nom_triangle = creerNomDePolygone(3);
          if (choice([true, false])) {
            texte = `Un triangle $${nom_triangle}$ rectangle en $${nom_triangle[1]}$ tel que $${nom_triangle[0] + nom_triangle[1] + " = " + tex_nombre(a)}$ cm, $${nom_triangle[1] + nom_triangle[2] + " = " + tex_nombre(b)}$ cm\
 et $${nom_triangle[0] + nom_triangle[2] + " = " + tex_nombre(c)}$ cm.`;
          } else {
            texte = `Un triangle rectangle $${nom_triangle}$ a pour côtés : $${tex_nombre(a)}$ cm, $${tex_nombre(c)}$ cm et $${tex_nombre(b)}$ cm.`;
          }

          texte_corr = `$\\mathcal{P}_{${nom_triangle}}=${tex_nombre(a)}~\\text{cm}+${tex_nombre(b)}
          ~\\text{cm}+${tex_nombre(c)}~\\text{cm}=${tex_nombre(a + b + c)}~\\text{cm}$<br>`;
          texte_corr += `$\\mathcal{A}_{${nom_triangle}}=${tex_nombre(a)}~\\text{cm}\\times${tex_nombre(b)}~\\text{cm}\\div2=${tex_nombrec(a * b / 2)}~\\text{cm}^2$`;
          break;
        case "cercle":
          let R = randint(3, 11);
          let donne_le_diametre = choice([true, false]);
          if (donne_le_diametre) {
            texte = `Un cercle de $${2 * R}$ cm de diamètre.`;
            texte_corr = `Le diamètre est de $${2 * R}$ cm donc le rayon est de $${R}$ cm.<br>`;
          } else {
            texte = `Un cercle de $${R}$ cm de rayon.`;
            texte_corr = "";
          }

          texte_corr += `$\\mathcal{P}=2\\times${R}\\times\\pi~\\text{cm}=${2 * R}\\pi~\\text{cm}\\approx${arrondi_virgule(
            2 * R * Math.PI,
            1
          )}~\\text{cm}$<br>`;
          texte_corr += `$\\mathcal{A}=${R}\\times${R}\\times\\pi~\\text{cm}^2=${R * R}\\pi~\\text{cm}^2\\approx${arrondi_virgule(
            R * R * Math.PI,
            1
          )}~\\text{cm}^2$`;
          break;
      }

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
  this.besoin_formulaire_numerique = [
    "Niveau de difficulté",
    3,
    "1 : Carré, rectangle et triangle rectangle\n2: Cercles\n3: Mélangé",
  ];
  this.besoin_formulaire2_case_a_cocher = ["Avec des décimaux", false];
}
