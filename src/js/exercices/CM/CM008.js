import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,combinaisonListes} from '../../modules/outils.js'
export const titre = 'Soustraire 11'

/**
 * Un nombre à 2 chiffres -11
 * @Auteur Rémi Angot
 * Référence CM008
*/
export default function Soustraire11() {
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

    let type_de_questions_disponibles = [1, 1, 1, 1, 2];
    let liste_type_de_questions = combinaisonListes(
      type_de_questions_disponibles,
      this.nbQuestions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texteCorr, a, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      if (liste_type_de_questions[i] == 1) {
        a = randint(12, 99);
      } else {
        a = randint(2, 9) * 10;
      }

      texte = `$${a}-11$`;
      texteCorr = `$${a}-11=${a - 11}$`;

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

