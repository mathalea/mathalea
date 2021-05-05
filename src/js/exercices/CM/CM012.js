import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint} from '../../modules/outils.js'
export const titre = 'Complément à 100'

/**
 * 100-...=
 * @Auteur Rémi Angot
* Référence CM012
 */
export default function Complement_a_100() {
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
      let i = 0, texte, texteCorr, a, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      a = randint(11, 89);
      texte = `$100-${a}$`;
      texteCorr = `$100-${a}=${100 - a}$`;

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
  //this.besoinFormulaireNumerique = ['Niveau de difficulté',3];
}

