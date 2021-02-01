import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,pgcd,tex_fraction_reduite,calcul,lettre_depuis_chiffre,html_consigne,tex_fraction,SVG_reperage_sur_un_axe,Latex_reperage_sur_un_axe} from "/modules/outils.js"


/**
 * Lire l'abscisse fractionnaire d'un point
 * @Auteur Jean-Claude Lhote et Rémi Angot
 * référence 6N21
 */
export default function Lire_abscisse_fractionnaire() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Lire l'abscisse fractionnaire d'un point";
  this.consigne = "Lire l'abscisse de chacun des points suivants et donner le résultat sous la forme d'une fraction.";
  this.nb_questions = 3;
  this.nb_questions_modifiable = true;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.spacing = 1;
  this.spacing_corr = 1;
  this.sup = 1;
  this.liste_packages = "tkz-euclide";

  this.nouvelle_version = function (numero_de_l_exercice) {
    // numero_de_l_exercice est 0 pour l'exercice 1
    let type_de_questions;
    this.liste_questions = [];
    this.liste_corrections = [];
    this.contenu = ""; // Liste de questions
    this.contenu_correction = ""; // Liste de questions corrigées
    if (this.sup == 4)
      type_de_questions = combinaison_listes([1, 2, 3], this.nb_questions);

    else
      type_de_questions = combinaison_listes(
        [parseInt(this.sup)],
        this.nb_questions
      );

    this.contenu = html_consigne(this.consigne);
    for (let i = 0,
      abs0,
      l1,
      l2,
      l3,
      x1,
      x2,
      x3,
      x11,
      x22,
      x33,
      pas1,
      pas2,
      id_unique,
      texte,
      texte_corr; i < this.nb_questions; i++) {
      l1 = lettre_depuis_chiffre(i * 3 + 1);
      l2 = lettre_depuis_chiffre(i * 3 + 2);
      l3 = lettre_depuis_chiffre(i * 3 + 3);
      switch (type_de_questions[i]) {
        case 1: // Placer des demis aux quarts sur un axe
          abs0 = 0;
          pas1 = 1;
          pas2 = choice([2, 3, 4]);
          break;

        case 2: // Placer des cinquièmes aux neuvièmes sur un axe
          abs0 = 0;
          pas1 = 1;
          pas2 = randint(5, 9);
          break;

        case 3: // Placer des demis aux neuvièmes à partir d'un entier >=1 sur un axe
          abs0 = randint(1, 5);
          pas1 = 1;
          pas2 = randint(2, 9);
          break;
      }
      x1 = randint(0, 1);
      x2 = randint(2, 3);
      x3 = randint(4, 5);
      x11 = randint(1, pas2 - 1);
      x22 = randint(1, pas2 - 1);
      x33 = randint(1, pas2 - 1);
      if (sortie_html) {
        id_unique = `${i}_${Date.now()}`;
        this.contenu += `<div id="div_svg${numero_de_l_exercice}${id_unique}" style="width: 90%; height: 200px;  "></div>`;
        SVG_reperage_sur_un_axe(
          `div_svg${numero_de_l_exercice}${id_unique}`,
          abs0,
          6,
          pas1,
          pas2,
          [
            [l1, x1, x11],
            [l2, x2, x22],
            [l3, x3, x33],
          ],
          [
            [abs0 + 1 / pas1, 1, 0],
            [abs0 + 2 / pas1, 2, 0],
            [abs0 + 3 / pas1, 3, 0],
            [abs0 + 4 / pas1, 4, 0],
            [abs0 + 5 / pas1, 5, 0],
            [abs0 + 6 / pas1, 6, 0],
          ],
          false
        );
        this.contenu_correction += `<div id="div_svg_corr${numero_de_l_exercice}${id_unique}" style="width: 90%; height: 200px;  "></div>`;
        SVG_reperage_sur_un_axe(
          `div_svg_corr${numero_de_l_exercice}${id_unique}`,
          abs0,
          6,
          pas1,
          pas2,
          [
            [l1, x1, x11, true],
            [l2, x2, x22, true],
            [l3, x3, x33, true],
          ],
          [
            [abs0 + 1 / pas1, 1, 0],
            [abs0 + 2 / pas1, 2, 0],
            [abs0 + 3 / pas1, 3, 0],
            [abs0 + 4 / pas1, 4, 0],
            [abs0 + 5 / pas1, 5, 0],
            [abs0 + 6 / pas1, 6, 0],
          ],
          true
        );
        this.contenu_correction += `<br>`;
        if (pgcd(x11, pas2) != 1 || pgcd(x22, pas2) != 1 || pgcd(x33, pas2) != 1)
          this.contenu_correction += `Remarque : `;
        if (pgcd(x11, pas2) != 1)
          this.contenu_correction += `$${tex_fraction(x1 * pas2 + x11, pas2)}$ peut se simplifier en $${tex_fraction_reduite(x1 * pas2 + x11, pas2)}\\phantom{espace}$`;
        if (pgcd(x22, pas2) != 1)
          this.contenu_correction += `$${tex_fraction(x2 * pas2 + x22, pas2)}$ peut se simplifier en $${tex_fraction_reduite(x2 * pas2 + x22, pas2)}\\phantom{espace}$`;
        if (pgcd(x33, pas2) != 1)
          this.contenu_correction += `$${tex_fraction(x3 * pas2 + x33, pas2)}$ peut se simplifier en $${tex_fraction_reduite(x3 * pas2 + x33, pas2)}\\phantom{espace}$`;

      } else {
        //sortie Latex
        texte = Latex_reperage_sur_un_axe(
          2,
          abs0,
          pas1,
          pas2,
          [
            [l1, x1, x11],
            [l2, x2, x22],
            [l3, x3, x33],
          ],
          [
            [calcul(abs0, 0), 0, 0],
            [calcul(abs0 + 1 / pas1, 0), 1, 0],
          ],
          false
        );
        texte_corr = Latex_reperage_sur_un_axe(
          2,
          abs0,
          pas1,
          pas2,
          [
            [l1, x1, x11, true],
            [l2, x2, x22, true],
            [l3, x3, x33, true],
          ],
          [
            [calcul(abs0, 0), 0, 0],
            [calcul(abs0 + 1 / pas1, 0), 1, 0],
          ],
          true
        );
        if (pgcd(x11, pas2) != 1)
          texte_corr += `<br>$\\left(${tex_fraction(x1 * pas2 + x11, pas2)}$ peut se simplifier en $${tex_fraction_reduite(x1 * pas2 + x11, pas2)}\\right)$.`;
        if (pgcd(x22, pas2) != 1)
          texte_corr += `<br>$\\left(${tex_fraction(x2 * pas2 + x22, pas2)}$ peut se simplifier en $${tex_fraction_reduite(x2 * pas2 + x22, pas2)}\\right)$.`;
        if (pgcd(x33, pas2) != 1)
          texte_corr += `<br>$\\left(${tex_fraction(x3 * pas2 + x33, pas2)}$ peut se simplifier en $${tex_fraction_reduite(x3 * pas2 + x33, pas2)}\\right)$.`;

        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
      }
    }
    if (!sortie_html)
      liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = [
    "Niveau de difficulté",
    4,
    "1 : Demis, tiers ou quarts avec zéro placé\n2 : Des cinquièmes aux neuvièmes avec zéro placé \n3 : Toutes les fractions précédentes mais zéro non visible\n4 : Mélange",
  ];
}
