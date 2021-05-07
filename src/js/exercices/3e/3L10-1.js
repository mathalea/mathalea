import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,combinaisonListes,lettreDepuisChiffre,printlatex} from '../../modules/outils.js'
export const titre = 'Additionner ou soustraire une expression entre parenthèses'

/**
 * Développer et réduire des expressions avec des parenthèses précédées d'un signe + ou -
 *
 *
 * @Auteur Rémi Angot
 * 3L10-1
 */
export default function Parentheses_precedes_de_moins_ou_plus() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "Développer et réduire les expressions suivantes.";
  this.spacing = 1;
  this.nbQuestions = 5;
  this.nbColsCorr = 1;

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles = ["a-()", "a+()"];
    let listeTypeDeQuestions = combinaisonListes(
      type_de_questions_disponibles,
      this.nbQuestions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, a, b, k, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      k = randint(-11, 11, 0);
      a = randint(-9, 9, 0);
      b = randint(-9, 9, 0);
      switch (listeTypeDeQuestions[i]) {
        case "a-()":
          // k-(ax+b)
          texte = `$${lettreDepuisChiffre(i + 1)}=${k}-(${printlatex(
            `${a}x+(${b})`
          )})$`;
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${k}-(${printlatex(
            `${a}x+(${b})`
          )})$`;
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(
            i + 1
          )}}=${printlatex(`${k}+(${-a}*x)+(${-b})`)}=${printlatex(
            `${-a}*x+(${k - b})`
          )}$`;
          break;
        case "a+()":
          // k-(ax+b)
          texte = `$${lettreDepuisChiffre(i + 1)}=${k}+(${printlatex(
            `${a}x+(${b})`
          )})$`;
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${k}+(${printlatex(
            `${a}x+(${b})`
          )})$`;
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(
            i + 1
          )}}=${printlatex(`${k}+(${a}*x)+(${b})`)}=${printlatex(
            `${a}*x+(${k + b})`
          )}$`;
          break;
      }

      if (this.listeQuestions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte);
        this.listeCorrections.push(texteCorr);
        i++;
      }
      cpt++;
    }
    listeQuestionsToContenu(this);
  };
  // this.besoinFormulaireNumerique = ['Niveau de difficulté',2,'1 : Multiplication par un facteur positif\n2: Multiplication par un facteur relatif']
}
