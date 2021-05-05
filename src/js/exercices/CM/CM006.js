import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint} from '../../modules/outils.js'
export const titre = 'Soustraire 9'

/**
 * Un nombre à 2 chiffres ne terminant pas par 9 - 9
 * @Auteur Rémi Angot
 * Référence CM006
*/
export default function Soustraire9() {
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
      a = randint(1, 9) * 10 + randint(0, 8);
      texte = `$${a}-9$`;
      texteCorr = `$${a}-9=${a - 9}$`;

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

