import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,calcul,tex_nombre,tex_fraction} from "/modules/outils.js"
/**
 * Compléter des égalités sur les nombres décimaux
 * * n/100 = .../10 + .../100
 * * n/100 = .../100 + .../10
 * * .../100 = u+ d/10 + c/100
 * * u = .../10
 * * u = .../100
 * * n/10 = ... + .../10 + .../100
 * @Auteur Rémi Angot
 * 6N23-1
 */
export default function Exercice_differentes_ecritures_nombres_decimaux() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Différentes écritures des nombres décimaux";
  this.consigne = "Compléter l'égalité puis donner l'écriture décimale.";
  this.spacing = 2;
  this.spacing_corr = 2;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions
    let type_de_questions_disponibles = [1, 2, 3, 4, 5, 6];
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
    if (this.nb_questions == 3) liste_type_de_questions = combinaison_listes([choice([1, 2, 6]), 3, choice([4, 5])], this.nb_questions);
    for (
      let i = 0, texte, texte_corr, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      type_de_questions = liste_type_de_questions[i];
      let u = randint(2, 9); //chiffre des unités
      let d = randint(1, 9); //chiffre des dixièmes
      let c = randint(1, 9); //chiffre des centièmes
      let n = 100 * u + 10 * d + c;
      let ecriture_decimale;
      switch (type_de_questions) {
        case 1: // n/100 = .../10 + .../100
          ecriture_decimale = tex_nombre(calcul(u + d / 10 + c / 100));
          texte = `$${tex_fraction(n, "100")}=\\ldots\\ldots+${tex_fraction(
            "",
            10
          )}+${tex_fraction("", 100)}=\\ldots$`;
          texte_corr = `$${tex_fraction(n, "100")}=${u}+${tex_fraction(
            d,
            "10"
          )}+${tex_fraction(c, "100")}=${ecriture_decimale}$`;

          break;
        case 2: // n/100 = .../100 + .../10
          ecriture_decimale = tex_nombre(calcul(u + d / 10 + c / 100));
          texte = `$${tex_fraction(n, "100")}=\\ldots\\ldots+${tex_fraction(
            "",
            100
          )}+${tex_fraction("", 10)}=\\ldots$`;
          texte_corr = `$${tex_fraction(n, "100")}=${u}+${tex_fraction(
            c,
            100
          )}+${tex_fraction(d, 10)}=${ecriture_decimale}$`;
          break;
        case 3: // .../100 = u+ d/10 + c/100
          ecriture_decimale = tex_nombre(calcul(u + d / 10 + c / 100));
          texte = `$${tex_fraction("", "100")}=${u}+${tex_fraction(
            d,
            "10"
          )}+${tex_fraction(c, "100")}=\\ldots$`;
          texte_corr = `$${tex_fraction(n, "100")}=${u}+${tex_fraction(
            d,
            "10"
          )}+${tex_fraction(c, "100")}=${ecriture_decimale}$`;
          break;
        case 4: // u = .../10
          texte = `$${u}=${tex_fraction("", "10")}$`;
          texte_corr = `$${u}=${tex_fraction(10 * u, "10")}$`;
          break;
        case 5: // u = .../100
          texte = `$${u}=${tex_fraction("", "100")}$`;
          texte_corr = `$${u}=${tex_fraction(100 * u, "10")}$`;
          break;
        case 6: // n/10 = ... + .../10 + .../100
          ecriture_decimale = tex_nombre(calcul(n / 10));
          texte = `$${tex_fraction(n, 10)}=\\ldots\\ldots+${tex_fraction(
            "",
            10
          )}+${tex_fraction("", 100)}=\\ldots$`;
          texte_corr = `$${tex_fraction(n, 10)}=${u * 10 + d}+${tex_fraction(
            c,
            10
          )}+${tex_fraction(0, 100)}=${ecriture_decimale}$`;
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
}





