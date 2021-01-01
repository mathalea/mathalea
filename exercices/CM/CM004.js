import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,range1,combinaison_listes} from "/modules/outils.js"
/**
 * Mélange équitable d'additions, de soustractions, de multiplications et de divisions
 *
 * * Niveau 1 Addition 2 chiffres + 1 chiffre, soustraction 2 chiffres - 1 chiffre, tables de 2 à 5
 * * Niveau 2 Addition 2 chiffres + 2 chiffres ne dépassant pas 100, soustraction dont le résultat est entre 11 et 19, tables de 6 à 9
 * * Niveau 3 Addition 2 chiffre + 2 chiffres dépassant 100, soustraction dont le résultat est entre 21 et 39, table de 7, 8, 11 ou 12,
 * @Auteur Rémi Angot
* Référence CM004
  */
export default function Quatre_operations() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Les quatre opérations";
  this.consigne = "Calculer";
  this.nb_questions = 10;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;
  this.sup = 1; // niveau de difficulté
  this.liste_packages = "xlop";

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = range1(4);
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texte_corr, a, b, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      switch (liste_type_de_questions[i]) {
        case 1: // addition
          if (this.sup == 1) {
            a = randint(11, 89);
            b = randint(2, 9);
          }
          if (this.sup == 2) {
            a = randint(11, 69);
            b = randint(11, 29);
          }
          if (this.sup == 3) {
            a = randint(11, 89);
            b = randint(110 - a, 110 - a + 50);
          }
          texte = `$${a}+${b}$`;
          texte_corr = `$${a}+${b}=${a + b}$`;
          break;
        case 2: // soustraction
          if (this.sup == 1) {
            a = randint(11, 89);
            b = randint(2, 9);
          }
          if (this.sup == 2) {
            a = randint(20, 89);
            b = randint(a - 19, a - 11);
          }
          if (this.sup == 3) {
            a = randint(40, 89);
            b = randint(a - 39, a - 21);
          }
          texte = `$${a}-${b}$`;
          texte_corr = `$${a}-${b}=${a - b}$`;
          break;
        case 3: // multiplication
          if (this.sup == 1) {
            a = randint(2, 5);
            b = randint(2, 9);
          }
          if (this.sup == 2) {
            a = randint(6, 9);
            b = randint(6, 9);
          }
          if (this.sup == 3) {
            a = choice([7, 8, 11, 12]);
            b = randint(2, 9);
          }
          texte = `$${a}\\times${b}$`;
          texte_corr = `$${a}\\times${b}=${a * b}$`;
          break;
        case 4: // division
          if (this.sup == 1) {
            a = randint(2, 5);
            b = randint(2, 9);
          }
          if (this.sup == 2) {
            a = randint(6, 9);
            b = randint(6, 9);
          }
          if (this.sup == 3) {
            a = choice([7, 8, 11, 12]);
            b = randint(2, 9);
          }
          texte = `$${a * b}\\div${a}$`;
          texte_corr = `$${a * b}\\div${a}=${b}$`;
          break;
      }

      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = ["Niveau de difficulté", 3];
}

