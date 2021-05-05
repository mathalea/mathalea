import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,combinaisonListes,texNombre} from '../../modules/outils.js'
export const titre = 'Écrire un nombre à partir de son nombre de dizaines, de centaines, de milliers...'

/**
 * Le nombre de dizaines, centaines et milliers étant donné, il faut écrire le nombre.
 *
 * 2 fois sur 5 il y a chevauchement entre les classes
 * @Auteur Rémi Angot
 * 6N10-1
 */
export default function Exercice_numeration_entier() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "Écrire en chiffres chacun des nombres.";
  this.nbQuestions = 5;
  this.nbCols = 1;
  this.nbColsCorr = 1;

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées

    let listeTypeDeQuestions = combinaisonListes(
      [1, 1, 1, 2, 2],
      this.nbQuestions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texteCorr, a, b, rang_a, rang_b, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      a = randint(2, 8) * 10 + randint(1, 5);
      b = randint(2, 8) * 10 + randint(1, 5);
      let rangs = [
        "unités",
        "dizaines",
        "centaines",
        "milliers",
        "dizaines de mille",
        "centaines de mille",
        "millions",
      ];
      rang_a = randint(0, 2);
      if (listeTypeDeQuestions[i] == 1) {
        rang_b = randint(rang_a + 2, 6);
      } else {
        rang_b = rang_a + 1;
      }

      texte = `$\\text{${b}  ${rangs[rang_b]} et ${a} ${rangs[rang_a]}}$`;
      texteCorr = `$${b} \\text{ ${rangs[rang_b]} et }${a} \\text{ ${rangs[rang_a]
        } : } ${texNombre(b * Math.pow(10, rang_b))} + ${a * texNombre(Math.pow(10, rang_a))} =${texNombre(
          b * Math.pow(10, rang_b) + a * Math.pow(10, rang_a)
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
  //this.besoinFormulaireNumerique = ['Niveau de difficulté',3];
}

