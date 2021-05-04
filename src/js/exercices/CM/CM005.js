import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,modalTexteCourt} from '../../modules/outils.js'
export const titre = 'Ajouter 9'

/**
 * Un nombre à 2 chiffres (non multiple de 10) + 9
 * @Auteur Rémi Angot
 * Référence CM005
*/
export default function Ajouter9() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "Calculer";
  this.nbQuestions = 10;
  this.nbCols = 2;
  this.nbColsCorr = 2;
  this.tailleDiaporama = 100;

  this.nouvelleVersion = function (numeroExercice) {
    this.boutonAide = modalTexteCourt(
      numeroExercice,
      "Ajouter 9 revient à ajouter 10 et à soustraire 1."
    );
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées

    for (
      let i = 0, texte, texteCorr, a, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      a = randint(0, 9) * 10 + randint(1, 9);
      texte = `$${a}+9$`;
      texteCorr = `$${a}+9=${a + 9}$`;

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

