import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes,lettre_depuis_chiffre,printlatex} from "/modules/outils.js"
/**
 * Donner l'opposé d'une expression.
 *
 *
 * @Auteur Rémi Angot
 * 3L10
 */
export default function Oppose_expression() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Donner l'opposé d'une expression";
  this.consigne = "Développer et réduire les expressions suivantes.";
  this.spacing = 1;
  this.nb_questions = 6;
  sortie_html ? (this.spacing_corr = 2) : (this.spacing_corr = 1);

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles = ["-(ax+b)", "-(ax2+bx+c)"];
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texte_corr, a, b, c, cpt = 0; i < this.nb_questions && cpt < 50;) {
      c = randint(-11, 11, 0);
      a = randint(-9, 9, 0);
      b = randint(-9, 9, 0);
      switch (liste_type_de_questions[i]) {
        case "-(ax+b)":
          texte = `$${lettre_depuis_chiffre(i + 1)}=-(${printlatex(
            `${a}x+(${b})`
          )})$`;
          texte_corr = texte;
          texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(
            i + 1
          )}}=${printlatex(`${-a}*x+(${-b})`)}$`;
          break;
        case "-(ax2+bx+c)":
          texte = `$${lettre_depuis_chiffre(i + 1)}=-(${printlatex(
            `${a}x^2+(${b})x+(${c})`
          )})$`;
          texte_corr = texte;
          texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(
            i + 1
          )}}=${printlatex(`${-a}x^2+(${-b})x+(${-c})`)}$`;
          break;
      }

      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  // this.besoin_formulaire_numerique = ['Niveau de difficulté',2,'1 : Multiplication par un facteur positif\n2: Multiplication par un facteur relatif']
}
