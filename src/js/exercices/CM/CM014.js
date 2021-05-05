import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,range1,combinaisonListes} from '../../modules/outils.js'
export const titre = 'Double, moitié, tiers, triple'

/**
 * Calculer le double ou le triple d'un nombre, calculer la moitié d'un nombre pair ou le tiers d'un multiple de 3
 * @Auteur Rémi Angot
* Référence CM014
 */
export default function Double_moitie_tiers_triple() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "Calculer";
  this.nbQuestions = 10;
  this.nbCols = 2;
  this.nbColsCorr = 2;
  this.sup = 1; // niveau de difficulté
  this.tailleDiaporama = 100;

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = range1(4);
    let liste_type_de_questions = combinaisonListes(
      type_de_questions_disponibles,
      this.nbQuestions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texteCorr, a, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      switch (liste_type_de_questions[i]) {
        case 1: // Double
          a = randint(2, 9);
          texte = `$\\text{Le double de }${a}$`;
          texteCorr = `$\\text{Le double de }${a} \\text{ est } ${a * 2}$`;
          break;
        case 2: // Moitié
          a = randint(2, 9) * 2;
          texte = `$\\text{La moitié de }${a * 2}$`;
          texteCorr = `$\\text{La moitié de }${a * 2} \\text{ est } ${a}$`;
          break;
        case 3: // Triple
          a = randint(2, 9);
          texte = `$\\text{Le triple de }${a}$`;
          texteCorr = `$\\text{Le triple de }${a} \\text{ est } ${a * 3}$`;
          break;
        case 4: // Tiers
          a = randint(2, 9);
          texte = `$\\text{Le tiers de }${a * 3}$`;
          texteCorr = `$\\text{Le tiers de }${a * 3} \\text{ est } ${a}$`;
          break;
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
  //this.besoinFormulaireNumerique = ['Niveau de difficulté',3];
}


