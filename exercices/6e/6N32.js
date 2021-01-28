import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes} from "/modules/outils.js"
import {grille,seyes,mathalea2d} from "/modules/2d.js"
import{fraction} from "/modules/Fractions.js"
/**
 * Tracer un segment de longueur une fraction de l'unité.
 * @Auteur Jean-Claude Lhote
 * 6N32
 */

export default function Fractions_d_unite() {
  "use strict"
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Représenter une fraction de l'unité";
  this.nb_questions = 5;
  this.consigne = "Colorier en bleu un segment de longueur ...";
  sortie_html ? (this.spacing_corr = 3.5) : (this.spacing_corr = 2);
  sortie_html ? (this.spacing = 2) : (this.spacing = 2);
  this.sup = 1;
  this.sup2 = 1;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles, g, carreaux, sc, unit
    let liste_type_de_questions = []
    if (this.sup < 5)
      type_de_questions_disponibles = [parseInt(this.sup)]
    else
      type_de_questions_disponibles = [1, 2, 3, 4]
    liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions)
    for (
      let i = 0, den, num, frac, frac_unite, texte, texte_corr, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      switch (liste_type_de_questions[i]) {
        case 1:
          den = choice([4, 5, 6, 10])
          num = randint(1, den - 1)
          break
        case 2:
          den = choice([2, 3, 4])
          if (den == 3) num = randint(3, 2 * den - 1, den)
          else num = randint(3, 3 * den - 1, den)
          break
        case 3:
          den = choice([4, 5, 6, 10])
          if (den == 4) num = randint(5, 3 * den - 1, den)
          else num = randint(5, 2 * den - 1, den)
          break
        case 4:
          den = choice([2, 3, 4, 5, 6, 10])
          if (den == 2 || den == 4) num = randint(den + 1, 3 * den - 1, den)
          else num = randint(den + 1, 2 * den - 1, den)
          break
      }
      if (den % 3 == 0) unit = 12
      else if (den % 5 == 0) unit = 10
      else unit = 8
      frac = fraction(num, den)
      frac_unite = fraction(3 * den - 1, den)
      texte = `$${frac.texFraction}$ unité en prenant ${unit} carreaux pour une unité.`
      if (this.sup2 < 3) g = grille(0, 0, 26, 2, "gray", 0.7);
      else g = "";
      if (this.sup2 == 2) {
        sc = 0.6;
        carreaux = seyes(0, 0, 26, 2);
      } else {
        sc = 0.5;
        carreaux = "";
      }


      texte_corr = mathalea2d({ xmin: 0, ymin: 0, xmax: 26, ymax: 2, pixelsParCm: 20, scale: sc }, frac.representation(1, 1, unit, 0, 'segment', 'blue', 0, 1), g, carreaux)



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
  this.besoin_formulaire_numerique = ["Type d\'exercices", 4, "1 : fracion inférieure à 1\n2 : demis, tiers et quarts\n3 : quarts, cinquièmes, sixièmes et dixièmes\n4 : toutes les fractions entre 1 et 3"];
  this.besoin_formulaire2_numerique = ["Type de cahier", 2, "1 :  petits carreaux\n2 : Cahier gros carreaux type Seyes"];
}
