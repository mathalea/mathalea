import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,range1,combinaisonListes,texNombrec,texNombre} from '../../modules/outils.js'
export const titre = 'Moitié'

/**
 * Calculer la moitié d'un nombre pair, d'un impair inférieur à 20, d'un multiple de 200, d'un nombre de la forme a00 avec a impair, d'un nombre de la forme
 *  a,b avec a et b pairs ou 1xx avec xx un nombre pair
 * @Auteur Rémi Angot
 * Référence CM009
*/
export default function Moitie() {
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

    let type_de_questions_disponibles = range1(6);
    let liste_type_de_questions = combinaisonListes(
      type_de_questions_disponibles,
      this.nbQuestions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texteCorr, a, b, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      switch (liste_type_de_questions[i]) {
        case 1: // Table de 2
          a = randint(2, 9);
          texte = `$\\text{La moitié de }${a * 2}$`;
          texteCorr = `$\\text{La moitié de }${a * 2} \\text{ est } ${a}$`;
          break;
        case 2: // Impair inférieur à 20
          a = randint(2, 9);
          texte = `$\\text{La moitié de }${a * 2 + 1}$`;
          texteCorr = `$\\text{La moitié de }${a * 2 + 1
            } \\text{ est } ${texNombrec(a + 5 / 10)}$`;
          break;
        case 3: // Table de 200
          a = randint(2, 9);
          texte = `$\\text{La moitié de }${texNombre(a * 2 * 100)}$`;
          texteCorr = `$\\text{La moitié de }${texNombre(
            a * 2 * 100
          )} \\text{ est } ${texNombre(a * 100)}$`;
          break;
        case 4: // a00 avec a impair
          a = randint(2, 9);
          texte = `$\\text{La moitié de }${texNombre((a * 2 + 1) * 100)}$`;
          texteCorr = `$\\text{La moitié de }${texNombre(
            (a * 2 + 1) * 100
          )} \\text{ est } ${texNombre(a * 100 + 50)}$`;
          break;
        case 5: // a,b avec a et b pairs
          a = randint(2, 9);
          b = randint(2, 9);
          texte = `$\\text{La moitié de }${texNombrec(
            a * 2 + (b * 2) / 100
          )}$`;
          texteCorr = `$\\text{La moitié de }${texNombrec(
            a * 2 + (b * 2) / 100
          )} \\text{ est } ${texNombrec(a + b / 100)}$`;
          break;
        case 6: // 1xx avec xx un nombre pair
          a = randint(2, 9);
          texte = `$\\text{La moitié de }${100 + a * 2}$`;
          texteCorr = `$\\text{La moitié de }${100 + a * 2} \\text{ est } ${50 + a
            }$`;
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

