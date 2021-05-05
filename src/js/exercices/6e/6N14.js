import Exercice from '../ClasseExercice.js';
import { combinaisonListes, listeQuestionsToContenu, randint } from '../../modules/outils.js';
import {mathalea2d} from '../../modules/2d.js'
import {fraction} from '../../modules/Fractions.js'
export const titre = 'Représenter des fractions'

/**
 * 6N14
 * Représenter des fractions simples avec des disques partagés de façon adéquate.
 * @Auteur Jean-Claude Lhote
 */
export default function Representer_une_fraction() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "";
  this.nbQuestions = 4;
  this.nbCols = 2;
  this.nbColsCorr = 2;
  this.sup = 3;

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    let Xmin, Xmax, Ymin, Ymax, ppc, sc, g, k, carreaux, objets;
    ppc = 20;
    if (sortieHtml) {
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

    let liste = combinaisonListes([2, 3, 4, 5, 6], this.nbQuestions);

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      objets = [];
      den = liste[i];
      num = randint(1, den * 3);
      f = fraction(num, den);
      texte = `Sachant qu'un disque représente une unité, représenter la fraction $${f.texFraction}$ en coloriant la part correspondante.<br>`;
      texte += mathalea2d(params, fraction(den * 3, den).representation(0, 0, 2, 0, 'gateau', 'white'));
      texteCorr = `Voici sur ces dessins, colorié en bleu, la part correspondante à la fraction $${f.texFraction}$ :<br>`;
      texteCorr += mathalea2d(params, f.representation(0, 0, 2, randint(0, den - 1), 'gateau', 'blue'));
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
    "Type de cahier",
    3,
    `1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`,
  ];


}
