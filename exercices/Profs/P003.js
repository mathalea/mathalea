import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,SVG_reperage_sur_un_axe,Latex_reperage_sur_un_axe} from "/modules/outils.js"

/**
 * Pour imprimer des repères vierges pour les élèves.
 * @Auteur Jean-Claude Lhote
 * référence : P003
 * publié le ?/2/2020
 */
export default function feuille_d_axes_gradues() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Tracer des droites graduées";
  this.consigne = "";
  this.nb_questions = 1;
  this.nb_questions_modifiable = true;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.spacing = 3;
  this.sup = 10;
  this.consigne_modifiable = false;
  this.nb_questions_modifiable = false;
  this.nb_cols_modifiable = false;
  this.nb_cols_corr_modifiable = false;
  this.spacing_modifiable = false;
  this.spacing_corr_modifiable = false;
  this.liste_packages = ["tkz-euclide"];

  this.nouvelle_version = function (numero_de_l_exercice) {
    let pas;
    this.liste_questions = [];
    this.liste_corrections = [];
    this.contenu = ""; // Liste de questions
    this.contenu_correction = ""; // Liste de questions corrigées
    pas = parseInt(this.sup);
    for (let i = 0, id_unique, texte; i < 14; i++) {
      if (sortie_html) {
        id_unique = `${i}_${Date.now()}`;
        this.contenu += `<div id="div_svg${numero_de_l_exercice}${id_unique}" style="width: 90%; height: 200px;  "></div>`;
        SVG_reperage_sur_un_axe(
          `div_svg${numero_de_l_exercice}${id_unique}`,
          "",
          6,
          1,
          pas,
          [],
          [],
          false
        );
      } else {
        //sortie Latex
        texte = Latex_reperage_sur_un_axe(2, 0, 1, pas, [], [], false);
      }
      this.liste_questions.push(texte);
    }
    if (!sortie_html)
      liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = [`Nombres de parts`, 10, ""];
}
