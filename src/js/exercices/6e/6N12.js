import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,combinaisonListes,texNombre,modal_url} from '../../modules/outils.js'
export const titre = 'Multiplier un entier par 10, 100, 1 000...'

/**
 * Un nombre à 2 chiffres (non multiple de 10) + 9
 * @Auteur Rémi Angot
 * Référence 6N12
 */
export default function Multiplier_entier_par_10_100_1000() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "Calculer";
  this.nbQuestions = 8;
  this.nbCols = 2;
  this.nbColsCorr = 2;
  this.sup = 2;

  this.nouvelleVersion = function (numeroExercice) {
    this.boutonAide = modal_url(numeroExercice, 'https://mathix.org/glisse-nombre/index.html',
      "Glisse-nombre"
    );
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles = [1, 2, 3, 4, choice([5, 6]), 7, 8, 9];
    let listeTypeDeQuestions = combinaisonListes(
      type_de_questions_disponibles,
      this.nbQuestions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let liste_de_b = []
    if (this.sup == 2) {
      liste_de_b = combinaisonListes([10, 100, 1000, 10000, 100000], this.nbQuestions)
    } else {
      liste_de_b = combinaisonListes([10, 100, 1000], this.nbQuestions)
    }
    for (
      let i = 0, texte, texteCorr, a, b, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      switch (listeTypeDeQuestions[i]) {
        case 1:
          a = randint(1, 9)
          break;
        case 2:
          a = randint(2, 9) * 10
          break;
        case 3:
          a = randint(2, 9) * 100
          break;
        case 4:
          a = randint(2, 9) * 1000
          break;
        case 5:
          a = randint(1, 9) * 100 + randint(1, 9)
          break;
        case 6:
          a = randint(1, 9) * 1000 + randint(1, 9)
          break;
        case 7:
          a = randint(1, 9) * 100 + randint(1, 9) * 10 + randint(1, 9)
          break;
        case 8:
          a = randint(1, 9) * 10000 + randint(1, 9) * 100
          break;
        case 9:
          a = randint(1, 9) * 10 + randint(1, 9)
          break;

      }

      b = liste_de_b[i]
      if (choice([true, false])) {
        texte = `$${texNombre(a)}\\times${texNombre(b)}$`
        texteCorr = `$${texNombre(a)}\\times${texNombre(b)}=${texNombre(a * b)}$`
      } else {
        texte = `$${texNombre(b)}\\times${texNombre(a)}$`
        texteCorr = `$${texNombre(b)}\\times${texNombre(a)}=${texNombre(a * b)}$`
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
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, '1 : Multiplication par 10, 100 ou 1 000\n2 : Multiplication par 10, 100, 1 000, 10 000 ou 100 000'];
}

