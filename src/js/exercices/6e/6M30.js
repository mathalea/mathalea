import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,combinaisonListes,arrondi,calcul,texNombrec,texNombre,texFraction} from '../../modules/outils.js'

export const titre = 'Calculs de volumes'

/**
 * Calcul de volumes (cube et pavé droit).
 * @Auteur Jean-Claude Lhote // modifié par Mireille Gain pour y ajouter les décimaux
 * référence 6M30
 */

export default function Calcul_de_volumes() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "Calculer, en détaillant, le volume des solides donnés.";
  this.nbQuestions = 4;
  this.nbCols = 1;
  this.nbColsCorr = 1;
  this.sup = 1;
  this.classe=6

  let type_de_questions_disponibles;

  this.nouvelleVersion = function () {
    if (this.classe == 6)
      type_de_questions_disponibles = [1, 2];

    // sixième : cube et pavé droit
    else if (this.classe == 5)
      type_de_questions_disponibles = [1, 2, 3, 4];

    // cinquième : on ajoute les prismes et le cylindre
    else if (this.classe == 4)
      type_de_questions_disponibles = [1, 2, 3, 4, 5, 6];

    // Quatrième : on ajoute pyramides et cones
    else
      type_de_questions_disponibles = [1, 2, 3, 4, 5, 6, 7]; // Troisième : on ajoute les boules.
    let listeTypeDeQuestions = combinaisonListes(
      type_de_questions_disponibles,
      this.nbQuestions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    let liste_unites = [
      [`~\\text{m}`, `~\\text{m}^3`],
      [`~\\text{dm}`, `~\\text{dm}^3`],
      [`~\\text{cm}`, `~\\text{cm}^3`],
      [`~\\text{mm}`, `~\\text{mm}^3`],
    ];
    let partieDecimale1, partieDecimale2, partieDecimale3;
    if (this.sup2) {
      partieDecimale1 = calcul(randint(1, 9) / 10 * randint(0, 1));
      partieDecimale2 = calcul(randint(1, 9) / 10 * randint(0, 1));
      partieDecimale3 = calcul(randint(1, 9) / 10 * randint(0, 1));
    }
    else {
      partieDecimale1 = 0;
      partieDecimale2 = 0;
      partieDecimale3 = 0;
    }
    for (let i = 0, texte, texteCorr, L, l, h, c, r, j, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (listeTypeDeQuestions[i]) {
        case 1: // cube
          c = calcul(randint(2, 10) + partieDecimale1);
          j = randint(0, 3); // pour le choix de l'unité
          texte = `Un cube de $${texNombre(c)} ${liste_unites[j][0]}$ d'arête.`;
          texteCorr = `$\\mathcal{V}= c^3 =c \\times c \\times c = ${texNombre(c)}${liste_unites[j][0]}\\times${texNombre(c)}${liste_unites[j][0]}\\times${texNombre(c)}${liste_unites[j][0]}=${texNombrec(c * c * c)}${liste_unites[j][1]}$`;
          break;
        case 2: // pavé droit
          if (this.sup == 1) {
            //sans conversion
            j = randint(0, 3); // pour le choix de l'unité
            l = calcul(randint(2, 5) + partieDecimale1);
            h = calcul(randint(3, 6) + partieDecimale2);
            L = calcul(randint(6, 10) + partieDecimale3);
            texte = `Un pavé droit de $${texNombre(l)}${liste_unites[j][0]}$ de largeur, de $${texNombre(L)}${liste_unites[j][0]}$ de longueur et de $${texNombre(h)}${liste_unites[j][0]}$ de hauteur.`;
            texteCorr = `$\\mathcal{V}= l \\times L \\times h = ${texNombre(l)}${liste_unites[j][0]}\\times${texNombre(L)}${liste_unites[j][0]}\\times${texNombre(h)}${liste_unites[j][0]}=${texNombrec(l * L * h)}${liste_unites[j][1]}$`;
          } else {
            // avec conversion
            j = randint(1, 2); // pour le choix de l'unité  centrale
            l = calcul(randint(2, 5) + partieDecimale1);
            h = calcul(randint(3, 6) * 10 + partieDecimale2);
            L = arrondi(randint(6, 10) / 10, 1);
            texte = `Un pavé droit de $${texNombre(l)}${liste_unites[j][0]}$ de largeur, de $${texNombre(L)}${liste_unites[j - 1][0]}$ de longueur et de $${texNombre(h)}${liste_unites[j + 1][0]}$ de hauteur.`;
            texteCorr = `$\\mathcal{V}= l \\times L \\times h = ${texNombre(l)}${liste_unites[j][0]}\\times${texNombre(L)}${liste_unites[j - 1][0]}\\times${texNombre(h)}${liste_unites[j + 1][0]}=${l}${liste_unites[j][0]}\\times${texNombrec(L * 10)}${liste_unites[j][0]}\\times${texNombrec(h / 10)}${liste_unites[j][0]}=${texNombrec(
              arrondi(l * L * h)
            )}${liste_unites[j][1]}$`;
          }
          break;
        case 3: // Cylindre
          if (this.sup == 1) {
            //sans conversion
            j = randint(0, 3); // pour le choix de l'unité
            r = randint(2, 10);
            h = randint(2, 15);
            texte = `Un cylindre de $${r}${liste_unites[j][0]}$ de rayon et de $${texNombre(h)}${liste_unites[j][0]}$ de hauteur.`;
            texteCorr = `$\\mathcal{V}=\\pi \\times R ^2 \\times h =\\pi\\times\\left(${r}${liste_unites[j][0]}\\right)^2\\times${h}${liste_unites[j][0]}=${texNombrec(
              r * r * h
            )}\\pi${liste_unites[j][1]}\\approx${texNombrec(
              arrondi(r * r * h * Math.PI, 1)
            )}${liste_unites[j][1]}$`;
          } else {
            j = randint(2, 3); // pour le choix de l'unité
            r = randint(2, 10);
            h = randint(20, 150);
            texte = `Un cylindre de $${r}${liste_unites[j][0]}$ de rayon et de $${texNombrec(h / 10)}${liste_unites[j - 1][0]}$ de hauteur.`;
            texteCorr = `$\\mathcal{V}=\\pi \\times R ^2 \\times h =\\pi\\times\\left(${r}${liste_unites[j][0]}\\right)^2\\times${texNombrec(h / 10)}${liste_unites[j - 1][0]}=\\pi\\times${r * r}${liste_unites[j][0]}^2\\times${h}${liste_unites[j][0]}=${texNombrec(r * r * h)}\\pi${liste_unites[j][1]}\\approx${texNombrec(calcul(r * r * h * Math.PI, 1))}${liste_unites[j][1]}$`;
          }
          break;
        case 4: // prisme droit
          if (this.sup == 1) {
            //sans conversion
            j = randint(0, 3); // pour le choix de l'unité
            c = calcul(randint(2, 10) + partieDecimale3);
            h = randint(2, 5);
            l = randint(6, 10);
            texte = `Un prisme droit de hauteur $${texNombre(l)}${liste_unites[j][0]}$ et dont les bases sont des triangles de base $${texNombre(c)}${liste_unites[j][0]}$ et de hauteur correspondante $${h}${liste_unites[j][0]}$.`;
            texteCorr = `$\\mathcal{V}=\\mathcal{B} \\times h=\\dfrac{${texNombre(c)}${liste_unites[j][0]}\\times${texNombre(h)}${liste_unites[j][0]}}{2}\\times${texNombre(l)}${liste_unites[j][0]}=${texNombrec(arrondi(calcul((c * h * l) / 2), 1))}${liste_unites[j][1]}$`;
          } else {
            j = randint(1, 2); // pour le choix de l'unité
            c = calcul(randint(2, 10) + partieDecimale3);
            h = randint(30, 50);
            l = arrondi(randint(5, 15) / 10, 1);
            texte = `Un prisme droit de hauteur $${texNombre(l)}${liste_unites[j - 1][0]}$ et dont les bases sont des triangles de base $${texNombre(c)}${liste_unites[j][0]}$ et de hauteur correspondante $${h}${liste_unites[j + 1][0]}$.`;
            texteCorr = `$\\mathcal{V}=\\mathcal{B} \\times h=\\dfrac{${c}${liste_unites[j][0]}\\times${h}${liste_unites[j + 1][0]}}{2}\\times${texNombrec(l)}${liste_unites[j - 1][0]}=\\dfrac{${c}${liste_unites[j][0]}\\times${texNombrec(
              calcul(h / 10)
            )}${liste_unites[j][0]}}{2}\\times${l * 10}${liste_unites[j][0]}=${texNombrec(calcul((c * h * l) / 2))}${liste_unites[j][1]}$`;
          }
          break;
        case 5: // cone
          if (this.sup == 1) {
            //sans conversion
            j = randint(0, 3); // pour le choix de l'unité
            r = randint(2, 10);
            h = randint(2, 15);
            texte = `Un cône de $${r}${liste_unites[j][0]}$ de rayon et de $${texNombre(h)}${liste_unites[j][0]}$ de hauteur.`;
            texteCorr = `$\\mathcal{V}=\\dfrac{1}{3} \\times \\mathcal{B} \\times h=\\dfrac{1}{3}\\times\\pi\\times\\left(${r}${liste_unites[j][0]}\\right)^2\\times${h}${liste_unites[j][0]}=${texFraction(
              r * r * h,
              3
            )}\\pi${liste_unites[j][1]}\\approx${texNombrec(
              arrondi((r * r * h * Math.PI) / 3)
            )}${liste_unites[j][1]}$`;
          } else {
            j = randint(2, 3); // pour le choix de l'unité
            r = randint(2, 10);
            h = randint(20, 150);
            texte = `Un cône de $${texNombre(r)}${liste_unites[j][0]}$ de rayon et de $${texNombrec(h / 10)}${liste_unites[j - 1][0]}$ de hauteur.`;
            texteCorr = `$\\mathcal{V}=\\dfrac{1}{3} \\times \\mathcal{B} \\times h=\\dfrac{1}{3}\\times\\pi\\times\\left(${r}${liste_unites[j][0]}\\right)^2\\times${texNombrec(calcul(h / 10))}${liste_unites[j - 1][0]}=\\dfrac{1}{3}\\times\\pi\\times\\left(${r}${liste_unites[j][0]}\\right)^2\\times${texNombrec(h)}${liste_unites[j][0]}=${texFraction(r * r * h, 3)}\\pi\\approx${texNombrec(
              calcul((r * r * h * Math.PI) / 3, 1)
            )}${liste_unites[j][1]}$`;
          }
          break;
        case 6: // pyramide
          if (this.sup == 1) {
            //sans conversion
            j = randint(0, 3); // pour le choix de l'unité
            c = calcul(randint(2, 10) + partieDecimale2);
            h = randint(2, 5);
            l = randint(6, 10);
            texte = `Une pyramide de hauteur $${h}${liste_unites[j][0]}$ et dont la base  est un carré de $${texNombre(c)}${liste_unites[j][0]}$ de côté.`;
            texteCorr = `$\\mathcal{V}=\\dfrac{1}{3} \\times \\mathcal{B} \\times h=\\dfrac{1}{3}\\times\\left(${texNombre(c)}${liste_unites[j][0]}\\right)^2\\times${h}${liste_unites[j][0]}`;
            if (calcul((c * c * h) / 3, false) == arrondi((c * c * h) / 3, 1))
              texteCorr += `=${texNombrec(
                arrondi(calcul((c * c * h) / 3), 1)
              )}${liste_unites[j][1]}$`;

            else
              texteCorr += `\\approx${texNombrec(
                arrondi(calcul((c * c * h) / 3), 1)
              )}${liste_unites[j][1]}$`;
          } else {
            j = randint(1, 2); // pour le choix de l'unité
            c = calcul(randint(2, 10) + partieDecimale2);
            h = randint(30, 50);
            l = arrondi(randint(5, 15) / 10, 1);
            texte = `Une pyramide de hauteur $${texNombrec(h / 10)}${liste_unites[j - 1][0]}$ et dont la base  est un carré de $${texNombre(c)}${liste_unites[j][0]}$ et de hauteur correspondante $${h}${liste_unites[j + 1][0]}$.`;
            texteCorr = `$\\mathcal{V}=\\dfrac{1}{3} \\times \\mathcal{B} \\times h=\\dfrac{1}{3}\\times\\left(${texNombre(c)}${liste_unites[j][0]}\\right)^2\\times${texNombrec(h / 10)}${liste_unites[j - 1][0]}=\\dfrac{1}{3}\\times${c * c}${liste_unites[j][0]}^2\\times${texNombrec(h)}${liste_unites[j][0]}`;
            if (calcul((c * c * h) / 3, false) == arrondi((c * c * h) / 3, 1))
              texteCorr += `=${texNombrec(
                arrondi(calcul((c * h * c) / 3), 1)
              )}${liste_unites[j][1]}$`;

            else
              texteCorr += `\\approx${texNombrec(
                arrondi(calcul((c * h * c) / 3), 1)
              )}${liste_unites[j][1]}$`;
          }
          break;
        case 7: // boule
          j = randint(0, 3); // pour le choix de l'unité
          r = randint(2, 10);
          texte = `Une boule de $${r}${liste_unites[j][0]}$ de rayon.`;
          texteCorr = `$\\mathcal{V}=\\dfrac{4}{3} \\times \\pi \\times R^3=\\dfrac{4}{3}\\times\\pi\\times\\left(${r}${liste_unites[j][0]}\\right)^3=${texFraction(calcul(4 * r * r * r), 3)}\\pi${liste_unites[j][1]}\\approx${texNombrec(
            arrondi(calcul((4 * Math.PI * r * r * r) / 3), 1)
          )}${liste_unites[j][1]}$`;
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
    2,
    "1 : Sans conversions\n2 : Avec des conversions",
  ];
  this.besoin_formulaire2_case_a_cocher = ["Avec des décimaux", false];
}
