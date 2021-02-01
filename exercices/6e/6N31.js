import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,calcul,tex_nombre,tex_prix} from "/modules/outils.js"
/**
 * Comparer deux nombres décimaux
 *
 * Les types de comparaisons sont :
 * * ab ? ba
 * * aa,bb ? aa,cc
 * * a,b  a,cc avec b>c
 * * 0,ab 0,ba
 * * 0,a0b 0,b0a
 * * a,b a,b0
 * * 0,0ab 0,0a0b
 * * a,bb  a,ccc avec b>c
 * * a+1,bb  a,cccc avec cccc>bb
 *
 * aa, bb, cc correspondent à des nombres à 2 chiffres (ces 2 chiffres pouvant être distincts)
 * @Auteur Rémi Angot
 * 6N31
 */
export default function Comparer_decimaux() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Comparer des nombres décimaux";
  this.consigne = "Compléter avec le signe < , > ou =.";
  this.nb_questions = 8;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = [
      choice([1, 4, 5]),
      2,
      2,
      3,
      6,
      7,
      8,
      9,
    ]; // une seule question du type inversion de chiffres (1,4,5)
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

    for (
      let i = 0, texte, texte_corr, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      let x,
        y,
        a,
        b,
        c,
        zero_inutile = false;

      switch (liste_type_de_questions[i]) {
        case 1: // ab ba
          a = randint(1, 9);
          b = randint(1, 9, a);
          x = a * 10 + b;
          y = b * 10 + a;
          break;
        case 2: // aa,bb aa,cc
          a = randint(1, 99);
          b = randint(11, 99);
          c = randint(11, 99);
          x = calcul(a + b / 100);
          y = calcul(a + c / 100);
          break;
        case 3: // a,b  a,cc avec b>c
          a = randint(1, 99);
          b = randint(1, 8);
          c = randint(1, b * 10);
          x = calcul(a + b / 10);
          y = calcul(a + c / 100);
          break;
        case 4: // 0,ab 0,ba
          a = randint(1, 9);
          b = randint(1, 9, a);
          x = calcul((a * 10 + b) / 100);
          y = calcul((b * 10 + a) / 100);
          break;
        case 5: // 0,a0b 0,b0a
          a = randint(1, 9);
          b = randint(1, 9, a);
          x = calcul((a * 100 + b) / 1000);
          y = calcul((b * 100 + a) / 1000);
          break;
        case 6: // a,b a,b0
          a = randint(11, 999);
          while (a % 10 == 0) {
            // pas de nombre divisible par 10
            a = randint(11, 999);
          }
          x = calcul(a / 10);
          y = x;
          zero_inutile = true;
          break;
        case 7: // 0,0ab 0,0a0b
          a = randint(1, 9);
          b = randint(1, 9);
          x = calcul(a / 100 + b / 1000);
          y = calcul(a / 100 + b / 10000);
          break;
        case 8: // a,bb  a,ccc avec b>c
          a = randint(11, 99);
          b = randint(11, 99);
          c = randint(100, b * 10);
          x = calcul(a + b / 100);
          y = calcul(a + c / 1000);
          if (randint(1, 2) == 1) {
            [x, y] = [y, x];
          }
          break;
        case 9: // a+1,bb  a,cccc avec cccc>bb
          a = randint(11, 98);
          b = randint(11, 99);
          c = randint(b * 100, 10000);
          x = calcul(a + 1 + b / 100);
          y = calcul(a + c / 10000);
          if (randint(1, 2) == 1) {
            [x, y] = [y, x];
          }
          break;
      }

      texte = `${tex_nombre(x)}\\ldots\\ldots${tex_nombre(y)}`;
      if (parseFloat(x) > parseFloat(y)) {
        texte_corr = `${tex_nombre(x)} > ${tex_nombre(y)}`;
      } else if (parseFloat(x) < parseFloat(y)) {
        texte_corr = `${tex_nombre(x)} < ${tex_nombre(y)}`;
      } else {
        texte_corr = `${tex_nombre(x)} = ${tex_nombre(y)}`;
      }

      if (zero_inutile) {
        if (randint(1, 2) == 1) {
          texte = `${tex_prix(x)}\\ldots\\ldots${tex_nombre(y)}`;
          if (parseFloat(x) > parseFloat(y)) {
            texte_corr = `${tex_prix(x)} > ${tex_nombre(y)}`;
          } else if (parseFloat(x) < parseFloat(y)) {
            texte_corr = `${tex_prix(x)} < ${tex_nombre(y)}`;
          } else {
            texte_corr = `${tex_prix(x)} = ${tex_nombre(y)}`;
          }
        } else {
          texte = `${tex_nombre(x)}\\ldots\\ldots${tex_prix(y)}`;
          if (parseFloat(x) > parseFloat(y)) {
            texte_corr = `${tex_nombre(x)} > ${tex_prix(y)}`;
          } else if (parseFloat(x) < parseFloat(y)) {
            texte_corr = `${tex_nombre(x)} < ${tex_prix(y)}`;
          } else {
            texte_corr = `${tex_nombre(x)} = ${tex_prix(y)}`;
          }
        }
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
}

