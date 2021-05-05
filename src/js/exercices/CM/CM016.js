import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,texNombrec,texNombre} from '../../modules/outils.js'
export const titre = 'Diviser un entier par 10, 100 ou 1000'

/**
 * Division d'un entier par 10, 100, 1000
 * @Auteur Rémi Angot
 * Référence CM016
*/
export default function Diviser_par_10_100_1000() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "Calculer";
  this.nbQuestions = 10;
  this.nbCols = 2;
  this.nbColsCorr = 2;
  this.tailleDiaporama = 100;

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées

    for (
      let i = 0, texte, texteCorr, a, b, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      a = choice([randint(1, 9), randint(11, 99), randint(101, 999)]);
      b = choice([10, 100, 1000]);
      texte = `$${texNombre(a)}\\div${texNombre(b)}$`;
      texteCorr = `$${texNombre(a)}\\div${texNombre(b)}=${texNombrec(
        a / b
      )}$`;

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
}

