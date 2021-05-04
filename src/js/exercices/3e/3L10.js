import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,combinaisonListes,lettreDepuisChiffre,printlatex} from '../../modules/outils.js'
export const titre = 'Donner l’opposé d’une expression'

/**
 * Donner l'opposé d'une expression.
 *
 *
 * @Auteur Rémi Angot
 * 3L10
 */
export default function Oppose_expression() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "Développer et réduire les expressions suivantes.";
  this.spacing = 1;
  this.nbQuestions = 6;
  sortieHtml ? (this.spacingCorr = 2) : (this.spacingCorr = 1);

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles = ["-(ax+b)", "-(ax2+bx+c)"];
    let liste_type_de_questions = combinaisonListes(
      type_de_questions_disponibles,
      this.nbQuestions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, a, b, c, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      c = randint(-11, 11, 0);
      a = randint(-9, 9, 0);
      b = randint(-9, 9, 0);
      switch (liste_type_de_questions[i]) {
        case "-(ax+b)":
          texte = `$${lettreDepuisChiffre(i + 1)}=-(${printlatex(
            `${a}x+(${b})`
          )})$`;
          texteCorr = texte;
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(
            i + 1
          )}}=${printlatex(`${-a}*x+(${-b})`)}$`;
          break;
        case "-(ax2+bx+c)":
          texte = `$${lettreDepuisChiffre(i + 1)}=-(${printlatex(
            `${a}x^2+(${b})x+(${c})`
          )})$`;
          texteCorr = texte;
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(
            i + 1
          )}}=${printlatex(`${-a}x^2+(${-b})x+(${-c})`)}$`;
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
