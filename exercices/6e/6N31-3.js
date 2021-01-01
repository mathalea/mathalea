import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,troncature,calcul,tex_nombre,mise_en_evidence,tex_fraction} from "/modules/outils.js"
/** 
 * * Encadrer_puis_arrondir_une_valeur
 * * 6N31-3
 * @author Mireille Gain, s'inspirant de 6N31-1 de Sébastien Lozano
 */

export default function Arrondir_une_valeur() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Arrondir une valeur";
  this.consigne = "Encadrer chaque nombre à l'unité, puis au dixième, puis au centième.<br>Dans chaque cas, mettre ensuite en évidence son arrondi.";
  this.nb_questions = 3;
  this.nb_cols = 3;
  this.nb_cols_corr = 1;
  this.sup = 1;
  this.sup2 = false;

  sortie_html ? (this.spacing_corr = 2.5) : (this.spacing_corr = 3.5);

  this.nouvelle_version = function () {
    this.liste_questions = [];
    this.liste_corrections = [];
    let m, c, d, u, di, ci, mi, me, ce, de, n, den, num, nb, rac;

    for (let i = 0, texte = "", texte_corr = "", cpt = 0; i < this.nb_questions && cpt < 50;) {
      if (this.sup == 1) {
        m = randint(0, 9);
        c = randint(0, 9);
        d = randint(0, 9);
        u = randint(0, 9);
        di = randint(1, 9);
        ci = randint(1, 9);
        mi = randint(1, 9, 5);
        me = randint(0, 1);
        ce = randint(0, 1);
        de = randint(0, 1);
        n = me * m * 1000 + ce * c * 100 + de * d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01 + mi * 0.001);
        nb = tex_nombre(n);
      } else if (this.sup == 2) {
        den = choice([7, 9, 11, 13]);
        num = randint(1, 50, [7, 9, 11, 13, 14, 18, 21, 22, 26, 27, 28, 33, 35, 36, 39, 42, 44, 45, 49]);
        n = num / den;
        nb = tex_fraction(num, den);
        di = troncature(n - troncature(n, 0), 1);
        ci = troncature(n - troncature(n, 1), 2);
        mi = troncature(n - troncature(n, 2), 3);
      } else if (this.sup == 3) {
        rac = randint(3, 99, [4, 9, 16, 25, 36, 49, 64, 81]);
        n = Math.sqrt(rac);
        nb = `\\sqrt{${rac}}`;
        di = troncature(n - troncature(n, 0), 1);
        ci = troncature(n - troncature(n, 1), 2);
        mi = troncature(n - troncature(n, 2), 3);
      }

      texte = `$${nb}$`;
      if (this.sup2) {
        if (this.sup == 1) texte += ``;
        else if (this.sup == 2) texte += `$\\phantom{1234567}$[Quand on écrit sur la calculatrice $${num}\\div ${den}$, elle affiche : $${tex_nombre(n)}$.]`;
        else if (this.sup == 3) texte += `$\\phantom{1234567}$[Quand on écrit sur la calculatrice $${nb}$, elle affiche : $${tex_nombre(n)}$.]`;
      }
      texte_corr = "Encadrement et arrondi à l'unité : ";
      if (di < 5) {
        texte_corr += `$\\phantom{1234567}${mise_en_evidence(tex_nombre(troncature(n, 0)))} < ${nb} < ${tex_nombre(troncature(n + 1, 0))}$`;
      } else {
        texte_corr += `$\\phantom{1234567}${tex_nombre(troncature(n, 0))} < ${nb} < ${mise_en_evidence(tex_nombre(troncature(n + 1, 0)))}$`;
      }

      texte_corr += "<br>Encadrement et arrondi au dixième : ";
      if (ci < 5) {
        texte_corr += `$\\phantom{123}${mise_en_evidence(tex_nombre(troncature(n, 1)))} < ${nb} < ${tex_nombre(troncature(n + 0.1, 1))}$`;
      } else {
        texte_corr += `$\\phantom{123}${tex_nombre(troncature(n, 1))} < ${nb} < ${mise_en_evidence(tex_nombre(troncature(n + 0.1, 1)))}$`;
      }

      texte_corr += "<br>Encadrement et arrondi au centième : $~$";
      if (mi < 5) {
        texte_corr += `$${mise_en_evidence(tex_nombre(troncature(n, 2)))} < ${nb} < ${tex_nombre(troncature(n + 0.01, 2))}$`;
      } else {
        texte_corr += `$${tex_nombre(troncature(n, 2))} < ${nb} < ${mise_en_evidence(tex_nombre(troncature(n + 0.01, 2)))}$`;
      }

      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.liste_questions.push(texte); // Sinon on enregistre la question dans liste_questions
        this.liste_corrections.push(texte_corr); // On fait pareil pour la correction
        i++; // On passe à la question suivante
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = ['Type de nombre', 2, `1 : Nombre décimal\n 2 : Fraction`];
  this.besoin_formulaire2_case_a_cocher = ["Affichage de la valeur donnée à la calculatrice", false];
}




