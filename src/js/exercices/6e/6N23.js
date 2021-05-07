import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,texNombre,texFraction} from '../../modules/outils.js'
const Algebrite = require('algebrite')

export const titre = 'Donner l’écriture décimale d’une fraction décimale'

/**
 * On donne une fraction qui a pour dénominateur 10, 100 ou 1 000, il faut donner l'écriture décimale.
 *
 * Le numérateur est de la forme X, XX, X0X, X00X ou XXX
 * @Auteur Rémi Angot
 * 6N23
 */
export default function Exercice_ecriture_decimale_a_partir_de_fraction_decimale() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "Donner l'écriture décimale";
  this.spacing = 2;
  this.spacingCorr = 2;
  this.nbQuestions = 8;

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    for (
      let i = 0, a, b, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      a = choice(
        [
          randint(2, 9),
          randint(11, 99),
          randint(1, 9) * 100 + randint(1, 9),
          randint(1, 9) * 1000 + randint(1, 9),
        ],
        randint(101, 999)
      );
      // X, XX, X0X, X00X,XXX
      b = choice([10, 100, 1000]);
      texte =
        "$ " + texFraction(texNombre(a), texNombre(b)) + " = \\dotfill $";
      texteCorr =
        "$ " +
        texFraction(texNombre(a), texNombre(b)) +
        " = " +
        texNombre(Algebrite.eval(a / b)) +
        " $";
      if (this.listeQuestions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        if (est_diaporama) {
          texte = texte.replace("=\\dotfill", "");
        }
        this.listeQuestions.push(texte);
        this.listeCorrections.push(texteCorr);
        i++;
      }
      cpt++;
    }
    listeQuestionsToContenu(this);
  };
}

