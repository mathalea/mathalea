import { choice, combinaison_listes, liste_de_question_to_contenu, randint, tex_nombre } from "/modules/outils.js";
import Exercice from '../ClasseExercice.js';

/**
 * Additions de durées de différents :
 * * MS+MS=1hMS sans retenue sur les s
 * * MS+MS=1hMS avec retenue
 * * HM+HM avec retenue
 * * HMS+HMS avec retenue sur les min
 * * HMS+HMS avec retenues min et s
 * @Auteur Rémi Angot
 * Référence 6D11
 */
export default function Somme_de_durees() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Additionner des durées";
  this.consigne = "Compléter les égalités suivantes";
  this.sup = 1; // 2 niveaux de difficultés
  this.spacing = 2;
  this.nb_questions = 5;
  this.nb_cols_corr = 1;

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_questions;

    if (this.sup == 1) {
      type_de_questions = combinaison_listes([1, 3], this.nb_questions);
    } else {
      type_de_questions = combinaison_listes(
        [1, 2, 3, 4, 5],
        this.nb_questions
      );
    }
    for (let i = 0, h1, h2, m1, m2, s1, s2, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
      if (type_de_questions[i] == 1) {
        s1 = randint(11, 39);
        s2 = randint(1, 20);
        m1 = randint(20, 59);
        m2 = randint(40, 59);
        texte = `$${m1}~\\text{min}~${s1}~\\text{s}+${m2}~\\text{min}~${s2}~\\text{s}=\\dotfill$`;
        texte_corr = `$${m1}~\\text{min}~${s1}~\\text{s}+${m2}~\\text{min}~${s2}~\\text{s}= ${m1 + m2}~\\text{min}~${s1 + s2}~\\text{s}= 1~\\text{h}~${m1 + m2 - 60}~\\text{min}~${s1 + s2}~\\text{s}$`;
      }
      if (type_de_questions[i] == 2) {
        s1 = randint(21, 39);
        s2 = randint(40, 59);
        m1 = randint(20, 59);
        m2 = randint(40, 59);
        texte = `$${m1}~\\text{min}~${s1}~\\text{s}+${m2}~\\text{min}~${s2}~\\text{s}=\\dotfill$`;
        texte_corr = `$${m1}~\\text{min}~${s1}~\\text{s}+${m2}~\\text{min}~${s2}~\\text{s}= ${m1 + m2}~\\text{min}~${s1 + s2}~\\text{s} = ${m1 + m2 + 1}~\\text{min}~${s1 + s2 - 60}~\\text{s} = 1~\\text{h}~${m1 + m2 - 60}~\\text{min}~${s1 + s2 - 60}~\\text{s}$`;
      }
      if (type_de_questions[i] == 3) {
        h1 = randint(2, 12);
        h2 = randint(2, 11);
        m1 = randint(30, 50);
        m2 = randint(30, 50);
        texte = `$${h1}~\\text{h}~${m1}~\\text{min}+${h2}~\\text{h}~${m2}~\\text{min}=\\dotfill$`;
        texte_corr = `$${h1}~\\text{h}~${m1}~\\text{min}+${h2}~\\text{h}~${m2}~\\text{min}= ${h1 + h2}~\\text{h}~${m1 + m2}~\\text{min} = ${h1 + h2 + 1}~\\text{h}~${m1 + m2 - 60}~\\text{min}$`;
      }
      if (type_de_questions[i] == 4) {
        h1 = randint(2, 12);
        h2 = randint(2, 11);
        m1 = randint(30, 50);
        m2 = randint(30, 50);
        s1 = randint(2, 55);
        s2 = randint(1, 60 - s1 - 1);
        texte = `$${h1}~\\text{h}~${m1}~\\text{min}~${s1}~\\text{s}+${h2}~\\text{h}~${m2}~\\text{min}~${s2}~\\text{s}=\\dotfill$`;
        texte_corr = `$${h1}~\\text{h}~${m1}~\\text{min}~${s1}~\\text{s}+${h2}~\\text{h}~${m2}~\\text{min}~${s2}~\\text{s}= ${h1 + h2}~\\text{h}~${m1 + m2}~\\text{min}~${s1 + s2}~\\text{s} = ${h1 + h2 + 1}~\\text{h}~${m1 + m2 - 60}~\\text{min}~${s1 + s2}~\\text{s}$`;
      }
      if (type_de_questions[i] == 5) {
        h1 = randint(2, 12);
        h2 = randint(2, 11);
        m1 = randint(30, 50);
        m2 = randint(30, 50);
        s1 = randint(2, 55);
        s2 = randint(60 - s1, 59);
        texte = `$${h1}~\\text{h}~${m1}~\\text{min}~${s1}~\\text{s}+${h2}~\\text{h}~${m2}~\\text{min}~${s2}~\\text{s}=\\dotfill$`;
        texte_corr = `$${h1}~\\text{h}~${m1}~\\text{min}~${s1}~\\text{s}+${h2}~\\text{h}~${m2}~\\text{min}~${s2}~\\text{s}=`;
        texte_corr += ` ${h1 + h2}~\\text{h}~${m1 + m2}~\\text{min}~${s1 + s2}~\\text{s} = ${h1 + h2}~\\text{h}~${m1 + m2 + 1}~\\text{min}~${s1 + s2 - 60}~\\text{s} =${h1 + h2 + 1}~\\text{h}~${m1 + m2 + 1 - 60}~\\text{min}~${s1 + s2 - 60}~\\text{s}$`;
      }

      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        if (est_diaporama) {
          texte = texte.replace("=\\dotfill", "");
        }
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = ["Niveau de difficulté", 2]; //"1 : Additions simples\n2 : Additions avec d'��ventuelles conversions"]
}
