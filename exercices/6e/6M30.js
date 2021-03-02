import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes,arrondi,calcul,tex_nombrec,tex_nombre,tex_fraction} from "/modules/outils.js"

/**
 * Calcul de volumes (cube et pavé droit).
 * @Auteur Jean-Claude Lhote // modifié par Mireille Gain pour y ajouter les décimaux
 * référence 6M30
 */

export default function Calcul_de_volumes() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Calculs de volumes";
  this.consigne = "Calculer, en détaillant, le volume des solides donnés.";
  this.nb_questions = 4;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.sup = 1;
  this.classe=6

  let type_de_questions_disponibles;

  this.nouvelle_version = function () {
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
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
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
    for (let i = 0, texte, texte_corr, L, l, h, c, r, j, cpt = 0; i < this.nb_questions && cpt < 50;) {
      switch (liste_type_de_questions[i]) {
        case 1: // cube
          c = calcul(randint(2, 10) + partieDecimale1);
          j = randint(0, 3); // pour le choix de l'unité
          texte = `Un cube de $${tex_nombre(c)} ${liste_unites[j][0]}$ d'arête.`;
          texte_corr = `$\\mathcal{V}= c^3 =c \\times c \\times c = ${tex_nombre(c)}${liste_unites[j][0]}\\times${tex_nombre(c)}${liste_unites[j][0]}\\times${tex_nombre(c)}${liste_unites[j][0]}=${tex_nombrec(c * c * c)}${liste_unites[j][1]}$`;
          break;
        case 2: // pavé droit
          if (this.sup == 1) {
            //sans conversion
            j = randint(0, 3); // pour le choix de l'unité
            l = calcul(randint(2, 5) + partieDecimale1);
            h = calcul(randint(3, 6) + partieDecimale2);
            L = calcul(randint(6, 10) + partieDecimale3);
            texte = `Un pavé droit de $${tex_nombre(l)}${liste_unites[j][0]}$ de largeur, de $${tex_nombre(L)}${liste_unites[j][0]}$ de longueur et de $${tex_nombre(h)}${liste_unites[j][0]}$ de hauteur.`;
            texte_corr = `$\\mathcal{V}= l \\times L \\times h = ${tex_nombre(l)}${liste_unites[j][0]}\\times${tex_nombre(L)}${liste_unites[j][0]}\\times${tex_nombre(h)}${liste_unites[j][0]}=${tex_nombrec(l * L * h)}${liste_unites[j][1]}$`;
          } else {
            // avec conversion
            j = randint(1, 2); // pour le choix de l'unité  centrale
            l = calcul(randint(2, 5) + partieDecimale1);
            h = calcul(randint(3, 6) * 10 + partieDecimale2);
            L = arrondi(randint(6, 10) / 10, 1);
            texte = `Un pavé droit de $${tex_nombre(l)}${liste_unites[j][0]}$ de largeur, de $${tex_nombre(L)}${liste_unites[j - 1][0]}$ de longueur et de $${tex_nombre(h)}${liste_unites[j + 1][0]}$ de hauteur.`;
            texte_corr = `$\\mathcal{V}= l \\times L \\times h = ${tex_nombre(l)}${liste_unites[j][0]}\\times${tex_nombre(L)}${liste_unites[j - 1][0]}\\times${tex_nombre(h)}${liste_unites[j + 1][0]}=${l}${liste_unites[j][0]}\\times${tex_nombrec(L * 10)}${liste_unites[j][0]}\\times${tex_nombrec(h / 10)}${liste_unites[j][0]}=${tex_nombrec(
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
            texte = `Un cylindre de $${r}${liste_unites[j][0]}$ de rayon et de $${tex_nombre(h)}${liste_unites[j][0]}$ de hauteur.`;
            texte_corr = `$\\mathcal{V}=\\pi \\times R ^2 \\times h =\\pi\\times\\left(${r}${liste_unites[j][0]}\\right)^2\\times${h}${liste_unites[j][0]}=${tex_nombrec(
              r * r * h
            )}\\pi${liste_unites[j][1]}\\approx${tex_nombrec(
              arrondi(r * r * h * Math.PI, 1)
            )}${liste_unites[j][1]}$`;
          } else {
            j = randint(2, 3); // pour le choix de l'unité
            r = randint(2, 10);
            h = randint(20, 150);
            texte = `Un cylindre de $${r}${liste_unites[j][0]}$ de rayon et de $${tex_nombrec(h / 10)}${liste_unites[j - 1][0]}$ de hauteur.`;
            texte_corr = `$\\mathcal{V}=\\pi \\times R ^2 \\times h =\\pi\\times\\left(${r}${liste_unites[j][0]}\\right)^2\\times${tex_nombrec(h / 10)}${liste_unites[j - 1][0]}=\\pi\\times${r * r}${liste_unites[j][0]}^2\\times${h}${liste_unites[j][0]}=${tex_nombrec(r * r * h)}\\pi${liste_unites[j][1]}\\approx${tex_nombrec(calcul(r * r * h * Math.PI, 1))}${liste_unites[j][1]}$`;
          }
          break;
        case 4: // prisme droit
          if (this.sup == 1) {
            //sans conversion
            j = randint(0, 3); // pour le choix de l'unité
            c = calcul(randint(2, 10) + partieDecimale3);
            h = randint(2, 5);
            l = randint(6, 10);
            texte = `Un prisme droit de hauteur $${tex_nombre(l)}${liste_unites[j][0]}$ et dont les bases sont des triangles de base $${tex_nombre(c)}${liste_unites[j][0]}$ et de hauteur correspondante $${h}${liste_unites[j][0]}$.`;
            texte_corr = `$\\mathcal{V}=\\mathcal{B} \\times h=\\dfrac{${tex_nombre(c)}${liste_unites[j][0]}\\times${tex_nombre(h)}${liste_unites[j][0]}}{2}\\times${tex_nombre(l)}${liste_unites[j][0]}=${tex_nombrec(arrondi(calcul((c * h * l) / 2), 1))}${liste_unites[j][1]}$`;
          } else {
            j = randint(1, 2); // pour le choix de l'unité
            c = calcul(randint(2, 10) + partieDecimale3);
            h = randint(30, 50);
            l = arrondi(randint(5, 15) / 10, 1);
            texte = `Un prisme droit de hauteur $${tex_nombre(l)}${liste_unites[j - 1][0]}$ et dont les bases sont des triangles de base $${tex_nombre(c)}${liste_unites[j][0]}$ et de hauteur correspondante $${h}${liste_unites[j + 1][0]}$.`;
            texte_corr = `$\\mathcal{V}=\\mathcal{B} \\times h=\\dfrac{${c}${liste_unites[j][0]}\\times${h}${liste_unites[j + 1][0]}}{2}\\times${tex_nombrec(l)}${liste_unites[j - 1][0]}=\\dfrac{${c}${liste_unites[j][0]}\\times${tex_nombrec(
              calcul(h / 10)
            )}${liste_unites[j][0]}}{2}\\times${l * 10}${liste_unites[j][0]}=${tex_nombrec(calcul((c * h * l) / 2))}${liste_unites[j][1]}$`;
          }
          break;
        case 5: // cone
          if (this.sup == 1) {
            //sans conversion
            j = randint(0, 3); // pour le choix de l'unité
            r = randint(2, 10);
            h = randint(2, 15);
            texte = `Un cône de $${r}${liste_unites[j][0]}$ de rayon et de $${tex_nombre(h)}${liste_unites[j][0]}$ de hauteur.`;
            texte_corr = `$\\mathcal{V}=\\dfrac{1}{3} \\times \\mathcal{B} \\times h=\\dfrac{1}{3}\\times\\pi\\times\\left(${r}${liste_unites[j][0]}\\right)^2\\times${h}${liste_unites[j][0]}=${tex_fraction(
              r * r * h,
              3
            )}\\pi${liste_unites[j][1]}\\approx${tex_nombrec(
              arrondi((r * r * h * Math.PI) / 3)
            )}${liste_unites[j][1]}$`;
          } else {
            j = randint(2, 3); // pour le choix de l'unité
            r = randint(2, 10);
            h = randint(20, 150);
            texte = `Un cône de $${tex_nombre(r)}${liste_unites[j][0]}$ de rayon et de $${tex_nombrec(h / 10)}${liste_unites[j - 1][0]}$ de hauteur.`;
            texte_corr = `$\\mathcal{V}=\\dfrac{1}{3} \\times \\mathcal{B} \\times h=\\dfrac{1}{3}\\times\\pi\\times\\left(${r}${liste_unites[j][0]}\\right)^2\\times${tex_nombrec(calcul(h / 10))}${liste_unites[j - 1][0]}=\\dfrac{1}{3}\\times\\pi\\times\\left(${r}${liste_unites[j][0]}\\right)^2\\times${tex_nombrec(h)}${liste_unites[j][0]}=${tex_fraction(r * r * h, 3)}\\pi\\approx${tex_nombrec(
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
            texte = `Une pyramide de hauteur $${h}${liste_unites[j][0]}$ et dont la base  est un carré de $${tex_nombre(c)}${liste_unites[j][0]}$ de côté.`;
            texte_corr = `$\\mathcal{V}=\\dfrac{1}{3} \\times \\mathcal{B} \\times h=\\dfrac{1}{3}\\times\\left(${tex_nombre(c)}${liste_unites[j][0]}\\right)^2\\times${h}${liste_unites[j][0]}`;
            if (calcul((c * c * h) / 3, false) == arrondi((c * c * h) / 3, 1))
              texte_corr += `=${tex_nombrec(
                arrondi(calcul((c * c * h) / 3), 1)
              )}${liste_unites[j][1]}$`;

            else
              texte_corr += `\\approx${tex_nombrec(
                arrondi(calcul((c * c * h) / 3), 1)
              )}${liste_unites[j][1]}$`;
          } else {
            j = randint(1, 2); // pour le choix de l'unité
            c = calcul(randint(2, 10) + partieDecimale2);
            h = randint(30, 50);
            l = arrondi(randint(5, 15) / 10, 1);
            texte = `Une pyramide de hauteur $${tex_nombrec(h / 10)}${liste_unites[j - 1][0]}$ et dont la base  est un carré de $${tex_nombre(c)}${liste_unites[j][0]}$ et de hauteur correspondante $${h}${liste_unites[j + 1][0]}$.`;
            texte_corr = `$\\mathcal{V}=\\dfrac{1}{3} \\times \\mathcal{B} \\times h=\\dfrac{1}{3}\\times\\left(${tex_nombre(c)}${liste_unites[j][0]}\\right)^2\\times${tex_nombrec(h / 10)}${liste_unites[j - 1][0]}=\\dfrac{1}{3}\\times${c * c}${liste_unites[j][0]}^2\\times${tex_nombrec(h)}${liste_unites[j][0]}`;
            if (calcul((c * c * h) / 3, false) == arrondi((c * c * h) / 3, 1))
              texte_corr += `=${tex_nombrec(
                arrondi(calcul((c * h * c) / 3), 1)
              )}${liste_unites[j][1]}$`;

            else
              texte_corr += `\\approx${tex_nombrec(
                arrondi(calcul((c * h * c) / 3), 1)
              )}${liste_unites[j][1]}$`;
          }
          break;
        case 7: // boule
          j = randint(0, 3); // pour le choix de l'unité
          r = randint(2, 10);
          texte = `Une boule de $${r}${liste_unites[j][0]}$ de rayon.`;
          texte_corr = `$\\mathcal{V}=\\dfrac{4}{3} \\times \\pi \\times R^3=\\dfrac{4}{3}\\times\\pi\\times\\left(${r}${liste_unites[j][0]}\\right)^3=${tex_fraction(calcul(4 * r * r * r), 3)}\\pi${liste_unites[j][1]}\\approx${tex_nombrec(
            arrondi(calcul((4 * Math.PI * r * r * r) / 3), 1)
          )}${liste_unites[j][1]}$`;
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
    2,
    "1 : Sans conversions\n2 : Avec des conversions",
  ];
  this.besoin_formulaire2_case_a_cocher = ["Avec des décimaux", false];
}
