import Exercice from '../ClasseExercice.js';
import { combinaison_listes, liste_de_question_to_contenu, randint } from "/modules/outils.js";
import {mathalea2d} from "/modules/2d.js"
import fraction from "/modules.js"

/**
 * 6N14
 * Représenter des fractions simples avec des disques partagés de façon adéquate.
 * @Auteur Jean-Claude Lhote
 */
export default function Representer_une_fraction() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Représenter des fractions";
  this.consigne = "";
  this.nb_questions = 4;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;
  this.sup = 3;

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let Xmin, Xmax, Ymin, Ymax, ppc, sc, g, k, carreaux, objets;
    ppc = 20;
    if (sortie_html) {
      sc = 0.5;
    } else {
      sc = 0.4;
    }

    let params = {
      xmin: -2.2,
      ymin: -2.2,
      xmax: 18,
      ymax: 3,
      pixelsParCm: ppc,
      scale: sc,
    }, den, num, f;

    let liste = combinaison_listes([2, 3, 4, 5, 6], this.nb_questions);

    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
      objets = [];
      den = liste[i];
      num = randint(1, den * 3);
      f = fraction(num, den);
      texte = `Sachant qu'un disque représente une unité, représenter la fraction $${f.texFraction}$ en coloriant la part correspondante.<br>`;
      texte += mathalea2d(params, fraction(den * 3, den).representation(0, 0, 2, 0, 'gateau', 'white'));
      texte_corr = `Voici sur ces dessins, colorié en bleu, la part correspondante à la fraction $${f.texFraction}$ :<br>`;
      texte_corr += mathalea2d(params, f.representation(0, 0, 2, randint(0, den - 1), 'gateau', 'blue'));
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
    "Type de cahier",
    3,
    `1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`,
  ];


}
