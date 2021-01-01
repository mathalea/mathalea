import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes,tex_nombre,tex_nombre2,puissanceEnProduit} from "/modules/outils.js"
/**
 * Donner l'écriture décimale d'une puissance de 10
 * @Auteur Rémi Angot
* Référence 4C30-2
 */
export default function EcritureDecimalePuissanceDe10() {
  Exercice.call(this);
  this.titre = "Écriture décimale d'une puissance de 10";
  this.consigne = "Donner l'écriture décimale";
  this.nb_questions = 8;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.sup = 3; // exposants positifs et négatifs par défaut

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let liste_type_de_questions
    if (this.sup == 1) {
      liste_type_de_questions = combinaison_listes(['+'], this.nb_questions);
    }
    if (this.sup == 2) {
      liste_type_de_questions = combinaison_listes(['-'], this.nb_questions);
    }
    if (this.sup == 3) {
      liste_type_de_questions = combinaison_listes(['+', '-'], this.nb_questions);
    }
    for (let i = 0, texte, texte_corr, n, cpt = 0; i < this.nb_questions && cpt < 50;) {
      switch (liste_type_de_questions[i]) {
        case '+':
          n = randint(0, 10)
          texte = `$10^{${n}}$`;
          if (n < 2) {
            texte_corr = `$10^${n}=${10 ** n}$`
          } else {
            if (sortie_html){
              texte_corr = `$10^{${n}}=${puissanceEnProduit(10, n)}=${tex_nombre(10 ** n)}$`;
            } else {
              texte_corr = `$10^{${n}}=${tex_nombre(10 ** n)}$`;
            }
          }
          break;
        case '-':
          n = randint(1, 10)
          texte = `$10^{${-n}}$`;
          if (sortie_html){
            texte_corr = `$10^{${-n}}=\\dfrac{1}{10^{${n}}}=\\dfrac{1}{${puissanceEnProduit(10, n)}}=\\dfrac{1}{${tex_nombre(10 ** n)}}=${tex_nombre2(1 / 10 ** n)}$`;
          } else {
            texte_corr = `$10^{${-n}}=\\dfrac{1}{10^{${n}}}=\\dfrac{1}{${tex_nombre(10 ** n)}}=${tex_nombre2(1 / 10 ** n)}$`;
          }
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
  this.besoin_formulaire_numerique = ['Niveau de difficulté', 3, '1 : Exposants positifs\n2 : Exposants négatifs\n3 : Exposants relatifs'];
}


