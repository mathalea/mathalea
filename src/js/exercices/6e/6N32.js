import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,combinaisonListes} from '../../modules/outils.js'
import {grille,seyes,mathalea2d} from '../../modules/2d.js'
import{fraction} from '../../modules/Fractions.js'
export const titre = 'Représenter une fraction de l’unité'

/**
 * Tracer un segment de longueur une fraction de l'unité.
 * @Auteur Jean-Claude Lhote
 * 6N32
 */

export default function Fractions_d_unite() {
  "use strict"
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.nbQuestions = 5;
  this.consigne = "Colorier en bleu un segment de longueur ...";
  sortieHtml ? (this.spacingCorr = 3.5) : (this.spacingCorr = 2);
  sortieHtml ? (this.spacing = 2) : (this.spacing = 2);
  this.sup = 1;
  this.sup2 = 1;
  this.nbCols = 1;
  this.nbColsCorr = 1;

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles, g, carreaux, sc, unit
    let liste_type_de_questions = []
    if (this.sup < 5)
      type_de_questions_disponibles = [parseInt(this.sup)]
    else
      type_de_questions_disponibles = [1, 2, 3, 4]
    liste_type_de_questions = combinaisonListes(type_de_questions_disponibles, this.nbQuestions)
    for (
      let i = 0, den, num, frac, frac_unite, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

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


      texteCorr = mathalea2d({ xmin: 0, ymin: 0, xmax: 26, ymax: 2, pixelsParCm: 20, scale: sc }, frac.representation(1, 1, unit, 0, 'segment', 'blue', 0, 1), g, carreaux)



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
  this.besoinFormulaireNumerique = ["Type d\'exercices", 4, "1 : fracion inférieure à 1\n2 : demis, tiers et quarts\n3 : quarts, cinquièmes, sixièmes et dixièmes\n4 : toutes les fractions entre 1 et 3"];
  this.besoin_formulaire2_numerique = ["Type de cahier", 2, "1 :  petits carreaux\n2 : Cahier gros carreaux type Seyes"];
}
