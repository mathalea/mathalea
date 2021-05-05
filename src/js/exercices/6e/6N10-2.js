import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,combinaisonListes,texNombrec} from '../../modules/outils.js'
export const titre = 'Décomposer un nombre décimal (nombre de..., chiffre de...)'

/**
 * Des questions sur le nombre ou le chiffre de centaines, de dizaines, de dixièmes, de centièmes...
 * @Auteur Rémi Angot
 * Référence 6N10-2
 */
export default function Decomposition_nombre_decimal() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "Compléter les phrases suivantes.";
  this.nbQuestions = 5;
  this.nbCols = 1;
  this.nbColsCorr = 1;

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = [
      1,
      2,
      choice([3, 4, 5]),
      choice([6, 7, 8]),
      choice([9, 10]),
      choice([11, 12]),
    ]; // sans chevauchement ou avec chevauchement
    let liste_type_de_questions = combinaisonListes(
      type_de_questions_disponibles,
      this.nbQuestions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let m = randint(1, 9); // le nombre sera le même pour tout l'exercice
    let c = randint(0, 9, [m]);
    let d = randint(0, 9, [m, c]);
    let u = randint(0, 9, [m, c, d]);
    let di = randint(0, 9, [m, c, d, u]);
    let ci = randint(0, 9, [m, c, d, u, di]);
    let mi = randint(1, 9, [m, c, d, u, di, ci]);
    let n =
      m.toString() +
      "" +
      c.toString() +
      d.toString() +
      u.toString() +
      "," +
      di.toString() +
      ci.toString() +
      mi;
    //calcul ne semble pas marcher avec 7 chiffres significatifs
    this.consigne = `On considère le nombre $${n}$. Compléter les phrases suivantes.`;
    for (
      let i = 0, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      switch (liste_type_de_questions[i]) {
        case 1:
          texte = "La partie entière de ce nombre est : ";
          texteCorr =
            texte + `$${texNombrec(m * 1000 + c * 100 + d * 10 + u)}$`;
          break;
        case 2:
          texte = "La partie décimale de ce nombre est : ";
          texteCorr =
            texte + `$${texNombrec(di / 10 + ci / 100 + mi / 1000)}$`;
          break;
        case 3:
          texte = "Le chiffre des dizaines de ce nombre est : ";
          texteCorr = texte + `$${d}$`;
          break;
        case 4:
          texte = "Le chiffre des centaines de ce nombre est : ";
          texteCorr = texte + `$${c}$`;
          break;
        case 5:
          texte = "Le chiffre des miliers de ce nombre est : ";
          texteCorr = texte + `$${m}$`;
          break;
        case 6:
          texte = "Le chiffre des dixièmes de ce nombre est : ";
          texteCorr = texte + `$${di}$`;
          break;
        case 7:
          texte = "Le chiffre des centièmes de ce nombre est : ";
          texteCorr = texte + `$${ci}$`;
          break;
        case 8:
          texte = "Le chiffre des millièmes de ce nombre est : ";
          texteCorr = texte + `$${mi}$`;
          break;
        case 9:
          texte = "Le nombre de dizaines de ce nombre est : ";
          texteCorr = texte + `$${texNombrec(d + c * 10 + m * 100)}$`;
          break;
        case 10:
          texte = "Le nombre de centaines de ce nombre est : ";
          texteCorr = texte + `$${texNombrec(c + m * 10)}$`;
          break;
        case 11:
          texte = "Le nombre de dixièmes de ce nombre est : ";
          texteCorr =
            texte +
            `$${texNombrec(di + u * 10 + d * 100 + c * 1000 + m * 10000)}$`;
          break;
        case 12:
          texte = "Le nombre de centièmes de ce nombre est : ";
          texteCorr =
            texte +
            `$${texNombrec(
              ci + di * 10 + u * 100 + d * 1000 + c * 10000 + m * 100000
            )}$`;
          break;
      }

      texteCorr += ".";
      texte += "\\ldots";
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

