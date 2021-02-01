import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,range1,combinaison_listes_sans_changer_ordre,tex_nombrec,tex_fraction} from "/modules/outils.js"
/**
 * Écriture décimale à partir de différentes manière de l'énoncer
 *
 * * 3 unités, 5 dixièmes et 8 centièmes
 * * 3 unités et 5 centièmes
 * * 5 dixièmes
 * * 128/10
 * * 8+5/100+7/100
 * @Auteur Rémi Angot
 * Référence 6N23-4
 */
export default function Nombre_decimal_oralise_de_differentes_manieres() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Donner l'écriture décimale d'un nombre à partir de différents textes";
  this.consigne = "Donner l'écriture décimale de chaque nombre.";
  this.nb_questions = 5;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = range1(5);
    let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions);
    for (
      let i = 0, texte, texte_corr, cpt = 0, a, b, c, choix; i < this.nb_questions && cpt < 50;) {
      a = randint(2, 9);
      b = randint(2, 9, a)
      c = randint(2, 9, [a, b])
      switch (liste_type_de_questions[i]) {
        case 1: //3 unités, 5 dixièmes et 8 centièmes   
          texte = `${a} unités, ${b} dixièmes et ${c} centièmes`;
          texte_corr = `$${a}+${tex_fraction(b, 10)}+${tex_fraction(c, 100)}=${tex_nombrec(a + b / 10 + c / 100)}$`
          break;
        case 2: //3 unités et 5 centièmes   
          texte = `${a} unités et ${c} centièmes`;
          texte_corr = `$${a}+${tex_fraction(c, 100)}=${tex_nombrec(a + c / 100)}$`
          break;
        case 3: //5 dixièmes / centièmes ou millièmes
          choix = randint(1, 3)
          if (choix == 1) {
            texte = `${a} dixièmes`;
            texte_corr = `$${tex_fraction(a, 10)}=${tex_nombrec(a / 10)}$`
          }
          if (choix == 2) {
            texte = `${a} centièmes`;
            texte_corr = `$${tex_fraction(a, 100)}=${tex_nombrec(a / 100)}$`
          }
          if (choix == 3) {
            texte = `${a} millièmes`;
            texte_corr = `$${tex_fraction(a, 1000)}=${tex_nombrec(a / 1000)}$`
          }
          break;
        case 4: //128/10
          let n = a * 100 + b * 10 + c
          choix = randint(1, 3)
          if (choix == 1) {
            texte = `$${tex_fraction(n, 10)}$`;
            texte_corr = `$${tex_fraction(n, 10)}=${tex_nombrec(n / 10)}$`
          }
          if (choix == 2) {
            texte = `$${tex_fraction(n, 100)}$`;
            texte_corr = `$${tex_fraction(n, 100)}=${tex_nombrec(n / 100)}$`
          }
          if (choix == 1) {
            texte = `$${tex_fraction(n, 1000)}$`;
            texte_corr = `$${tex_fraction(n, 1000)}=${tex_nombrec(n / 1000)}$`
          }
          break;
        case 5: //8+5/100+7/100  
          choix = randint(1, 2)
          if (choix == 1) {
            texte = `$${a}+${tex_fraction(b, 100)}+${tex_fraction(c, 100)}$`;
            texte_corr = `$${a}+${tex_fraction(b, 100)}+${tex_fraction(c, 100)}=${a}+${tex_fraction(b + c, 100)}=${tex_nombrec(a + (b + c) / 100)}$`
          }
          if (choix == 2) {
            texte = `$${a}+${tex_fraction(b, 10)}+${tex_fraction(c, 10)}$`;
            texte_corr = `$${a}+${tex_fraction(b, 10)}+${tex_fraction(c, 10)}=${a}+${tex_fraction(b + c, 10)}=${a}+${tex_nombrec((b + c) / 10)}=${tex_nombrec(a + (b + c) / 10)}$`
          }
          break;

      }

      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(texte);
        if (!sortie_html && i == 0) {
          texte_corr = `\\setlength\\itemsep{2em}` + texte_corr;
        } // espacement entre les questions
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
}









