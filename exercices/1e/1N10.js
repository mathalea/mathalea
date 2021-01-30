import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,ecriture_algebrique,pgcd} from "/modules/outils.js"
import {fraction} from "/modules/Fractions.js"
/**
 * 1N10
 * @Auteur Gaelle Morvan
 */
export default function Terme_d_une_suite_definie_explicitement() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Déterminer les termes d'une suite définie de façon explicite";
  this.consigne = "Une suite étant donnée, calculer le terme demandé.";
  this.nb_questions = 4;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Vide la liste de questions
    this.liste_corrections = []; // Vide la liste de questions corrigées

    let type_de_questions_disponibles = [1, 2, 3];
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

    for (let i = 0, texte, texte_corr, cpt = 0, a, b, c, d, frac,k; i < this.nb_questions && cpt < 50;) {
      switch (liste_type_de_questions[i]) {
        case 1: //fonction affine
          a = randint(1, 7) * choice([-1, 1]);
          b = randint(1, 10) * choice([-1, 1]);
          k = randint(0, 20);

          texte = `Soit $(u_n)$ une suite définie pour tout entier $n\\in\\mathbb{N}$ par $u_n = `;
          if (a == 1) { texte += `n`; }

          else if (a == -1) { texte += `-n`; }
          else { texte += `${a}n`; };

          if (b > 0) { texte += `+${b}$.`; }
          else { texte += `${b}$.`; };
          texte += `<br>Calculer $u_{${k}}$.`;

          texte_corr = `Dans l'expression de $u_n$ on remplace $n$ par ${k}, on obtient : $u_{${k}} =`;
          if (a == 1) {
            texte_corr += `${k} ${ecriture_algebrique(b)}`;
          } else {
            if (a == -1) {
              texte_corr += `-${k} ${ecriture_algebrique(b)}`;
            } else {
              texte_corr += `${a} \\times ${k} ${ecriture_algebrique(b)}`;
            }
          }
          texte_corr += `=${a * k + b}$.`;
          break;

        case 2: //fonction polynome de degré 2
          a = randint(1, 5) * choice([-1, 1]);
          b = randint(0, 5) * choice([-1, 1]);
          c = randint(0, 9) * choice([-1, 1]);
          k = randint(0, 9);

          texte = `Soit $(u_n)$ une suite définie pour tout entier $n\\in\\mathbb{N}$ par $u_n = `;
          if (a == 1) {
            texte += `n^2$`;
          } else {
            if (a == -1) {
              texte += `-n^2$`;
            } else {
              texte += `${a}n^2$`;
            }
          };
          if (b == 1) { texte += `$+n$`; };
          if (b > 1) { texte += `$+${b}n$`; };
          if (b == -1) { texte += `$-n$`; };
          if (b < -1) { texte += `$${b}n$`; };
          if (c > 0) { texte += `$+${c}$.`; };
          if (c < 0) { texte += `$${c}$.`; }
          texte += `<br>Calculer $u_{${k}}$.`;

          texte_corr = `Dans l'expression de $u_n$ on remplace $n$ par $${k}$, on obtient : $u_{${k}} = `;
          if (a == 1) { texte_corr += `${k}^2`; }
          else {
            if (a == -1) { texte_corr += `-${k}^2`; }
            else {
              texte_corr += `${a}\\times ${k}^2`;
            }
          };
          if (b == 1) {
            texte_corr += `+${k}`;
          } else {
            if (b == -1) {
              texte_corr += `-${k}`;
            } else {
              texte_corr += `${ecriture_algebrique(b)}\\times ${k}`;
            }
          }
          texte_corr += `${ecriture_algebrique(c)}=${a * k * k + b * k + c}$.`;
          break;

        case 3: //fonction homographique
          a = randint(1, 5) * choice([-1, 1]);
          b = randint(1, 5) * choice([-1, 1]);
          c = randint(2, 4);
          d = randint(1, 7);
          k = randint(1, 9);

          texte = `Soit $(u_n)$ une suite définie pour tout entier $n\\in\\mathbb{N}$ par $u_n = \\dfrac{`;
          if (a == 1) { texte += `n`; }

          else if (a == -1) { texte += `-n`; }
          else { texte += `${a}n`; };
          if (b > 0) { texte += `+${b}}{`; }
          else { texte += `${b}}{`; };
          if (c == 1) { texte += `n`; }

          else if (c == -1) { texte += `-n`; }
          else { texte += `${c}n`; };
          if (d > 0) { texte += `+${d}}$.`; }
          else { texte += `${d}}$.`; };

          texte += `<br>Calculer $u_{${k}}$.`;
          frac = fraction(a * k + b, c * k + d);
          texte_corr = `Dans l'expression de $u_n$ on remplace $n$ par $${k}$, on obtient : $u_{${k}} = \\dfrac{${a}\\times ${k} ${ecriture_algebrique(b)}}{${c}\\times ${k}
          ${ecriture_algebrique(d)}} = ` + frac.texFraction;
          if (pgcd(a * k + b, c * k + d) != 1)
            texte_corr += `=` + frac.texFractionSimplifiee;
          texte_corr += `$.`;
          break;
      }


      if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.liste_questions.push(texte); // Sinon on enregistre la question dans liste_questions
        this.liste_corrections.push(texte_corr); // On fait pareil pour la correction
        i++; // On passe à la question suivante
      }
      cpt++; // Sinon on incrémente le compteur d'essai pour avoir une question nouvelle
    }
    liste_de_question_to_contenu(this); // La liste de question et la liste de la correction

    // sont transformés en chaine de caractère (avec une liste HTML ou LaTeX suivant le contexte)
  };
  //this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
  // On aurait pu ajouter un formulaire pour régler le niveau de difficulté à l'aide de l'attribut this.sup
}
