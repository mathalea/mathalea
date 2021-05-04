import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,enleveElement,choice,tex_fraction} from '../../modules/outils.js'
export const titre = 'Décomposer une fraction (partie entière + fraction inférieure à 1).'

/**
 * @Auteur Rémi Angot
 * 6N20
 */
export default function Exercice_fractions_decomposer() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne =
    "Écrire sous la forme de la somme d'un nombre entier et d'une fraction inférieure à 1.";
  this.spacing = 2;
  this.spacingCorr = 2;
  this.sup = false; // Donner l'écriture décimale

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    let liste_fractions = [
      [1, 2, ",5"],
      [1, 4, ",25"],
      [3, 4, ",75"],
      [1, 5, ",2"],
      [2, 5, ",4"],
      [3, 5, ",6"],
      [4, 5, ",8"],
      [1, 8, ",125"],
      [3, 8, ",375"],
      [1, 10, ",1"],
      [3, 10, ",3"],
      [7, 10, ",7"],
      [9, 10, ",9"],
    ]; // Fractions irréductibles avec une écriture décimale exacte
    let liste_fractions1 = [
      [1, 2, ",5"],
      [1, 4, ",25"],
      [3, 4, ",75"],
      [1, 8, ",125"],
    ];
    liste_fractions1.push(
      choice([
        [1, 10, ",1"],
        [2, 10, ",2"],
        [3, 10, ",3"],
        [7, 10, ",7"],
        [9, 10, ",9"],
      ])
    );
    liste_fractions1.push(
      choice([
        [1, 5, ",2"],
        [2, 5, ",4"],
        [3, 5, ",6"],
        [4, 5, ",8"],
      ])
    ); // liste_fractions pour les 6 premières questions
    for (
      let i = 0, fraction, a,ed, b, c, n, texte, texteCorr;
      i < this.nbQuestions;
      i++
    ) {
      if (i < 6) {
        fraction = choice(liste_fractions1);
        enleveElement(liste_fractions1, fraction);
      } else {
        fraction = choice(liste_fractions);
      }
      //
      c = fraction[0];
      b = fraction[1];
      n = randint(1, 4);
      a = n * b + c;
      ed = n + fraction[2];
      enleveElement(liste_fractions, fraction); // Il n'y aura pas 2 fois la même partie décimale
      texte =
        "$ " +
        tex_fraction(a, b) +
        " = \\phantom{0000} + " +
        tex_fraction("\\phantom{00000000}", "") +
        " $";
      texteCorr =
        "$ " + tex_fraction(a, b) + " = " + n + "+" + tex_fraction(c, b) + " $";
      this.listeQuestions.push(texte);
      this.listeCorrections.push(texteCorr);
    }
    listeQuestionsToContenu(this); //Espacement de 2 em entre chaque questions.
  };
}


