import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,enleveElement,choice,combinaisonListes,arrondiVirgule,calcul,texNombrec,creerNomDePolygone,texNombre} from '../../modules/outils.js'

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
  this.nbQuestions = 4;

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées

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
      enleveElement(type_de_questions_disponibles, "cercle");
      this.nbCols = 1;
    } else if (this.sup == 2) {
      type_de_questions_disponibles = ["cercle"];
    }
    let listeTypeDeQuestions = combinaisonListes(
      type_de_questions_disponibles,
      this.nbQuestions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      type_de_questions = listeTypeDeQuestions[i];
      switch (type_de_questions) {
        case "carre":
          let cote = calcul(randint(2, 11) + partieDecimale1);
          let nom_carre = creerNomDePolygone(4);
          if (choice([true, false])) {
            // 2 énoncés possibles équiprobables
            texte = `Un carré $${nom_carre}$ de $${texNombre(cote)}$ cm de côté .`;
          } else {
            texte = `Un carré $${nom_carre}$ tel que $${nom_carre[0] + nom_carre[1]} = ${texNombre(cote)}$ cm.`;
          }

          texteCorr = `$\\mathcal{P}_{${nom_carre}}=4\\times${texNombre(cote)}~\\text{cm}=${texNombrec(4 * cote)}~\\text{cm}$<br>`;
          texteCorr += `$\\mathcal{A}_{${nom_carre}}=${texNombre(cote)}~\\text{cm}\\times${texNombre(cote)}~\\text{cm}=${texNombrec(cote * cote)}~\\text{cm}^2$`;
          break;
        case "rectangle":
          let L = calcul(randint(3, 11) + partieDecimale2);
          let l = randint(2, L - 1);
          let nom_rectangle = creerNomDePolygone(4);
          if (choice([true, false])) {
            // 2 énoncés possibles équiprobables
            texte = `Un rectangle $${nom_rectangle}$ de $${texNombre(L)}$ cm de longueur et de $${l}$ cm de largeur.`;
          } else {
            texte = `Un rectangle $${nom_rectangle}$ tel que $${nom_rectangle[0] + nom_rectangle[1] + " = " + texNombre(L)}$ cm et $${nom_rectangle[1] + nom_rectangle[2] + " = " + l}$ cm.`;
          }

          texteCorr = `$\\mathcal{P}_{${nom_rectangle}}=(${texNombre(L)}~\\text{cm}+${l}~\\text{cm})\\times2=${texNombrec((L + l) * 2)}~\\text{cm}$<br>`;
          texteCorr += `$\\mathcal{A}_{${nom_rectangle}}=${texNombre(L)}~\\text{cm}\\times${l}~\\text{cm}=${texNombrec(L * l)}~\\text{cm}^2$`;
          break;
        case "triangle_rectangle":
          let triplet = choice(triplets_pythagoriciens);
          enleveElement(triplets_pythagoriciens, triplet);
          let a = calcul(triplet[0] * (1 + partieDecimale1));
          let b = calcul(triplet[1] * (1 + partieDecimale1));
          let c = calcul(triplet[2] * (1 + partieDecimale1));
          let nom_triangle = creerNomDePolygone(3);
          if (choice([true, false])) {
            texte = `Un triangle $${nom_triangle}$ rectangle en $${nom_triangle[1]}$ tel que $${nom_triangle[0] + nom_triangle[1] + " = " + texNombre(a)}$ cm, $${nom_triangle[1] + nom_triangle[2] + " = " + texNombre(b)}$ cm\
 et $${nom_triangle[0] + nom_triangle[2] + " = " + texNombre(c)}$ cm.`;
          } else {
            texte = `Un triangle rectangle $${nom_triangle}$ a pour côtés : $${texNombre(a)}$ cm, $${texNombre(c)}$ cm et $${texNombre(b)}$ cm.`;
          }

          texteCorr = `$\\mathcal{P}_{${nom_triangle}}=${texNombre(a)}~\\text{cm}+${texNombre(b)}
          ~\\text{cm}+${texNombre(c)}~\\text{cm}=${texNombre(a + b + c)}~\\text{cm}$<br>`;
          texteCorr += `$\\mathcal{A}_{${nom_triangle}}=${texNombre(a)}~\\text{cm}\\times${texNombre(b)}~\\text{cm}\\div2=${texNombrec(a * b / 2)}~\\text{cm}^2$`;
          break;
        case "cercle":
          let R = randint(3, 11);
          let donne_le_diametre = choice([true, false]);
          if (donne_le_diametre) {
            texte = `Un cercle de $${2 * R}$ cm de diamètre.`;
            texteCorr = `Le diamètre est de $${2 * R}$ cm donc le rayon est de $${R}$ cm.<br>`;
          } else {
            texte = `Un cercle de $${R}$ cm de rayon.`;
            texteCorr = "";
          }

          texteCorr += `$\\mathcal{P}=2\\times${R}\\times\\pi~\\text{cm}=${2 * R}\\pi~\\text{cm}\\approx${arrondiVirgule(
            2 * R * Math.PI,
            1
          )}~\\text{cm}$<br>`;
          texteCorr += `$\\mathcal{A}=${R}\\times${R}\\times\\pi~\\text{cm}^2=${R * R}\\pi~\\text{cm}^2\\approx${arrondiVirgule(
            R * R * Math.PI,
            1
          )}~\\text{cm}^2$`;
          break;
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
  this.besoinFormulaireNumerique = [
    "Niveau de difficulté",
    3,
    "1 : Carré, rectangle et triangle rectangle\n2: Cercles\n3: Mélangé",
  ];
  this.besoinFormulaire2CaseACocher = ["Avec des décimaux", false];
}
