import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,tex_nombre,modal_url} from "/modules/outils.js"
/**
 * Un nombre à 2 chiffres (non multiple de 10) + 9
 * @Auteur Rémi Angot
 * Référence 6N12
 */
export default function Multiplier_entier_par_10_100_1000() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Multiplier un entier par 10, 100, 1 000...";
  this.consigne = "Calculer";
  this.nb_questions = 8;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;
  this.sup = 2;

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.bouton_aide = modal_url(numero_de_l_exercice, 'https://mathix.org/glisse-nombre/index.html',
      "Glisse-nombre"
    );
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles = [1, 2, 3, 4, choice([5, 6]), 7, 8, 9];
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let liste_de_b = []
    if (this.sup == 2) {
      liste_de_b = combinaison_listes([10, 100, 1000, 10000, 100000], this.nb_questions)
    } else {
      liste_de_b = combinaison_listes([10, 100, 1000], this.nb_questions)
    }
    for (
      let i = 0, texte, texte_corr, a, b, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      switch (liste_type_de_questions[i]) {
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
        texte = `$${tex_nombre(a)}\\times${tex_nombre(b)}$`
        texte_corr = `$${tex_nombre(a)}\\times${tex_nombre(b)}=${tex_nombre(a * b)}$`
      } else {
        texte = `$${tex_nombre(b)}\\times${tex_nombre(a)}$`
        texte_corr = `$${tex_nombre(b)}\\times${tex_nombre(a)}=${tex_nombre(a * b)}$`
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
  this.besoin_formulaire_numerique = ['Niveau de difficulté', 2, '1 : Multiplication par 10, 100 ou 1 000\n2 : Multiplication par 10, 100, 1 000, 10 000 ou 100 000'];
}

