import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,range1,combinaisonListes,texNombrec,texNombre} from '../../modules/outils.js'
export const titre = 'Quart'

/**
 * Calculer le quart d'un multiple de 4, d'un impair, d'un multiple de 400, d'un multiple de 40, d'un nombre a,b avec a et b multiples de 4
 * @Auteur Rémi Angot
 * Référence CM011
*/
export default function Quart() {
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

    let type_de_questions_disponibles = range1(5);
    let listeTypeDeQuestions = combinaisonListes(
      type_de_questions_disponibles,
      this.nbQuestions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texteCorr, a, b, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      switch (listeTypeDeQuestions[i]) {
        case 1: // Table de 4
          a = randint(2, 9);
          texte = `$\\text{Le quart de }${a * 4}$`;
          texteCorr = `$\\text{Le quart de }${a * 4} \\text{ est } ${a}$`;
          break;
        case 2: // Impair
          a = randint(2, 9);
          b = choice([1, 2, 3]);
          texte = `$\\text{Le quart de }${a * 4 + b}$`;
          texteCorr = `$\\text{Le quart de }${a * 4 + b
            } \\text{ est } ${texNombrec(a + b / 4)}$`;
          break;
        case 3: // Table de 400
          a = randint(2, 9);
          texte = `$\\text{Le quart de }${texNombre(a * 4 * 100)}$`;
          texteCorr = `$\\text{Le quart de }${texNombre(
            a * 4 * 100
          )} \\text{ est } ${texNombre(a * 100)}$`;
          break;
        case 4: // Table de 40
          a = randint(2, 9);
          texte = `$\\text{Le quart de }${texNombre(a * 4 * 10)}$`;
          texteCorr = `$\\text{Le quart de }${texNombre(
            a * 4 * 10
          )} \\text{ est } ${texNombre(a * 10)}$`;
          break;
        case 5: // a,b avec a et b divisibles par 4
          a = randint(2, 9);
          b = randint(2, 9);
          texte = `$\\text{Le quart de }${texNombrec(a * 4 + (b * 4) / 100)}$`;
          texteCorr = `$\\text{Le quart de }${texNombrec(
            a * 4 + (b * 4) / 100
          )} \\text{ est } ${texNombrec(a + b / 100)}$`;
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

