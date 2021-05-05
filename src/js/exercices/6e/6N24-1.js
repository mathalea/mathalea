import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,texNombre,texFraction} from '../../modules/outils.js'
const Algebrite = require('algebrite')

export const titre = 'Multiplier ou diviser un nombre entier par 10, 100 ou 1 000'

/**
 * Multiplier ou diviser un nombre entier par 10, 100 ou 1 000
 *
 * Le nombre entier est de la forme X, XX, X0X, X00X ou XXX
 * @Auteur Rémi Angot
 * 6N24-1
 */
export default function Exercice_multiplier_ou_diviser_un_nombre_entier_par_10_100_1000() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "Donner l'écriture décimale";
  this.spacing = 2;
  this.spacingCorr = 2;

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
      if (choice([true, false])) {
        texte =
          "$ " + texFraction(texNombre(a), texNombre(b)) + " = \\dotfill $";
        texteCorr =
          "$ " +
          texFraction(texNombre(a), texNombre(b)) +
          " = " +
          texNombre(Algebrite.eval(a / b)) +
          " $";
      } else {
        texte =
          "$ " + texNombre(a) + "\\times" + texNombre(b) + " = \\dotfill $";
        texteCorr =
          "$ " +
          texNombre(a) +
          "\\times" +
          texNombre(b) +
          " = " +
          texNombre(Algebrite.eval(a * b)) +
          " $";
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
  this.besoinFormulaireNumerique = ["Valeur maximale", 99999];
}

