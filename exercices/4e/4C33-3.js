import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes,simpExp,modal_pdf} from "/modules/outils.js"
/**
 * Puissances d'un relatif (2)
 * * Travailler des résultats automatisés
 * * mais aussi d'utiliser les propriétés du produit de puissance, du quotient de puissances et des puissances de puissances
 * * Date initiale non renseignée
 * * Mise à jour le 2021-01-24
 * @Auteur Sébastien Lozano
 * 4C33-3
 */
export default function Puissances_d_un_relatif_2() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  //this.sup = 1;
  this.titre = "Puissances : Calculs automatisés et règles de calculs";
  sortie_html
    ? (this.consigne = "Écrire sous la forme $\\mathbf{a^n}$.")
    : (this.consigne = "Écrire sous la forme $a^n$.");
  this.spacing = 2;
  this.spacing_corr = 2.5;
  this.nb_questions = 8;
  this.nb_cols_corr = 1;

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = [1, 2, 3, 4, 5, 6, 7, 8];
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    );

    this.bouton_aide = modal_pdf(
      numero_de_l_exercice,
      "pdf/FichePuissances-4N21.pdf",
      "Aide mémoire sur les puissances (Sébastien Lozano)",
      "Aide mémoire"
    );

    for (
      let i = 0, base, exp, texte, texte_corr, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      let type_de_questions = liste_type_de_questions[i];

      switch (type_de_questions) {
        case 1:
          base = 3; // on travaille sur cette base mais on pourrait rendre la base aléatoire
          exp = [randint(1, 7, [1]), randint(1, 7, [1]), randint(1, 7, [1])]; // on a besoin de 3 exposants distincts
          texte = `$\\dfrac{${base}^${exp[0]}\\times ${base * base}}{${base}^${exp[1]
            } \\times ${base}^${exp[2]}}$`;
          texte_corr = `$\\dfrac{${base}^${exp[0]}\\times ${base * base
            }}{${base}^${exp[1]} \\times ${base}^${exp[2]}}`;
          texte_corr += ` = \\dfrac{${base}^${exp[0]}\\times ${base}^{2}}{${base}^${exp[1]} \\times ${base}^${exp[2]}}`;
          texte_corr += ` = \\dfrac{${base}^{${exp[0]}+2}}{${base}^{${exp[1]}+${exp[2]}}}`;
          texte_corr += ` = \\dfrac{${base}^{${exp[0] + 2}}}{${base}^{${exp[1] + exp[2]
            }}}`;
          texte_corr += ` = ${base}^{${exp[0] + 2}-${exp[1] + exp[2]}}`;
          texte_corr += ` = ${base}^{${exp[0] + 2 - exp[1] - exp[2]}}`;
          if (
            exp[0] + 2 - exp[1] - exp[2] == 0 ||
            exp[0] + 2 - exp[1] - exp[2] == 1
          ) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
            texte_corr += `=` + simpExp(base, exp[0] + 2 - exp[1] - exp[2]);
          }
          texte_corr += `$`;
          break;
        case 2:
          base = 2; // on travaille sur cette base mais on pourrait rendre la base aléatoire
          exp = [randint(1, 7, [1]), randint(1, 7, [1])]; // on a besoin de 2 exposants distincts
          texte = `$\\dfrac{${base}^${exp[0]}\\times ${base ** 3}}{${base}^${exp[1]
            }}$`;
          texte_corr = `$\\dfrac{${base}^${exp[0]}\\times ${base ** 3
            }}{${base}^${exp[1]}}`;
          texte_corr += ` = \\dfrac{${base}^${exp[0]}\\times ${base}^3}{${base}^${exp[1]}}`;
          texte_corr += ` = \\dfrac{${base}^{${exp[0]}+3}}{${base}^${exp[1]}}`;
          texte_corr += ` = \\dfrac{${base}^{${exp[0] + 3}}}{${base}^${exp[1]
            }}`;
          texte_corr += ` = ${base}^{${exp[0] + 3}-${exp[1]}}`;
          texte_corr += ` = ${base}^{${exp[0] + 3 - exp[1]}}`;
          if (exp[0] + 3 - exp[1] == 0 || exp[0] + 3 - exp[1] == 1) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
            texte_corr += `=` + simpExp(base, exp[0] + 3 - exp[1]);
          }
          texte_corr += `$`;
          break;
        case 3:
          base = 5; // on travaille sur cette base mais on pourrait rendre la base aléatoire
          exp = [randint(1, 7, [1]), randint(1, 2)]; // on a besoin de 2 exposants distincts
          // le second exposant ne peut valoir que 1 ou 2 la fonction testExp ne convient pas à l'affichage ici
          if (exp[1] == 2) {
            texte = `$\\dfrac{${base}\\times ${base}^${exp[0]}}{${base ** 2}^${exp[1]
              }}$`;
            texte_corr = `$\\dfrac{${base}\\times ${base}^${exp[0]}}{${base ** 2
              }^${exp[1]}}`;
            texte_corr += `=\\dfrac{${base}^{1+${exp[0]}}}{(${base}^2)^${exp[1]}}`;
            texte_corr += `=\\dfrac{${base}^{1+${exp[0]}}}{${base}^{2 \\times ${exp[1]}}}`;
            texte_corr += `=\\dfrac{${base}^{${1 + exp[0]}}}{${base}^{${2 * exp[1]
              }}}`;
          } else {
            texte = `$\\dfrac{${base}\\times ${base}^${exp[0]}}{${base ** 2}}$`;
            texte_corr = `$\\dfrac{${base}\\times ${base}^${exp[0]}}{${base ** 2
              }}`;
            texte_corr += `=\\dfrac{${base}^{1+${exp[0]}}}{${base}^2}`;
          }
          texte_corr += `=${base}^{${1 + exp[0]}-${2 * exp[1]}}`;
          texte_corr += `=${base}^{${1 + exp[0] - 2 * exp[1]}}`;
          if (1 + exp[0] - 2 * exp[1] == 0 || 1 + exp[0] - 2 * exp[1] == 1) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
            texte_corr += `=` + simpExp(base, 1 + exp[0] - 2 * exp[1]);
          }
          texte_corr += `$`;
          break;
        case 4:
          base = 2; // on travaille sur cette base mais on pourrait rendre la base aléatoire
          exp = [randint(1, 7, [1])]; // on a besoin de 1 exposant
          texte = `$\\dfrac{${base}\\times ${base}^${exp[0]}}{${base ** 2
            }\\times ${base ** 2}}$`;
          texte_corr = `$\\dfrac{${base}\\times ${base}^${exp[0]}}{${base ** 2
            }\\times ${base ** 2}}`;
          texte_corr += `=\\dfrac{${base}^{1+${exp[0]}}}{${base}^2\\times ${base}^2}`;
          texte_corr += `=\\dfrac{${base}^{${1 + exp[0]}}}{${base}^{2+2}}`;
          texte_corr += `=\\dfrac{${base}^{${1 + exp[0]}}}{${base}^{${2 + 2}}}`;
          texte_corr += `=${base}^{${1 + exp[0]}-${2 + 2}}`;
          texte_corr += `=${base}^{${1 + exp[0] - 2 - 2}}`;
          if (1 + exp[0] - 2 - 2 == 0 || 1 + exp[0] - 2 - 2 == 1) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
            texte_corr += `=` + simpExp(base, 1 + exp[0] - 2 - 2);
          }
          texte_corr += `$`;
          break;
        case 5:
          base = 2; // on travaille sur cette base mais on pourrait rendre la base aléatoire
          exp = [randint(1, 7, [1])]; // on a besoin de 1 exposant
          texte = `$\\dfrac{${base ** 2}^${exp[0]}}{${base}}$`;
          texte_corr = `$\\dfrac{${base ** 2}^${exp[0]}}{${base}}`;
          texte_corr += `=\\dfrac{(${base}^2)^${exp[0]}}{${base}}`;
          texte_corr += `=\\dfrac{${base}^{2\\times ${exp[0]}}}{${base}}`;
          texte_corr += `=\\dfrac{${base}^{${2 * exp[0]}}}{${base}}`;
          texte_corr += `=${base}^{${2 * exp[0]}-1}`;
          texte_corr += `=${base}^{${2 * exp[0] - 1}}$`;
          // Inutile de tester l'exposant final car il vaut au minimum 3
          break;
        case 6:
          base = 3; // on travaille sur cette base mais on pourrait rendre la base aléatoire
          exp = [randint(1, 3, [1])]; // on a besoin de 1 exposant
          texte = `$\\dfrac{${base ** 3}^${exp[0]}}{${base}}$`;
          texte_corr = `$\\dfrac{${base ** 3}^${exp[0]}}{${base}}`;
          texte_corr += `=\\dfrac{(${base}^3)^${exp[0]}}{${base}}`;
          texte_corr += `=\\dfrac{${base}^{3\\times ${exp[0]}}}{${base}}`;
          texte_corr += `=\\dfrac{${base}^{${3 * exp[0]}}}{${base}}`;
          texte_corr += `=${base}^{${3 * exp[0]}-1}`;
          texte_corr += `=${base}^{${3 * exp[0] - 1}}$`;
          // inutile de tester l'exposant final car il vaut au minimum 5
          break;
        case 7:
          base = 3; // on travaille sur cette base mais on pourrait rendre la base aléatoire
          exp = [randint(1, 7, [1]), randint(1, 7, [1]), randint(1, 4, [1])]; // on a besoin de 3 exposants distincts
          texte = `$\\dfrac{${base}^${exp[0]}\\times ${base}^${exp[1]}}{${base ** 2
            }^${exp[2]}}\\times ${base}$`;
          texte_corr = `$\\dfrac{${base}^${exp[0]}\\times ${base}^${exp[1]}}{${base ** 2
            }^${exp[2]}}\\times ${base}`;
          texte_corr += `=\\dfrac{${base}^{${exp[0]}+${exp[1]}}}{(${base}^2)^${exp[2]}}\\times ${base}`;
          texte_corr += `=\\dfrac{${base}^{${exp[0] + exp[1]
            }}}{${base}^{2\\times ${exp[2]}}}\\times ${base}`;
          texte_corr += `=\\dfrac{${base}^{${exp[0] + exp[1]}}}{${base}^{${2 * exp[2]
            }}}\\times ${base}`;
          texte_corr += `=\\dfrac{${base}^{${exp[0] + exp[1]
            }}\\times ${base}}{${base}^{${2 * exp[2]}}}`;
          texte_corr += `=\\dfrac{${base}^{${exp[0] + exp[1]}+1}}{${base}^{${2 * exp[2]
            }}}`;
          texte_corr += `=\\dfrac{${base}^{${exp[0] + exp[1] + 1}}}{${base}^{${2 * exp[2]
            }}}`;
          texte_corr += `=${base}^{${exp[0] + exp[1] + 1}-${2 * exp[2]}}`;
          texte_corr += `=${base}^{${exp[0] + exp[1] + 1 - 2 * exp[2]}}`;
          if (
            exp[0] + exp[1] + 1 - 2 * exp[2] == 0 ||
            exp[0] + exp[1] + 1 - 2 * exp[2] == 1
          ) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant est évincé
            texte_corr += `=` + simpExp(base, exp[0] + exp[1] + 1 - 2 * exp[2]);
          }
          texte_corr += `$`;
          break;
        case 8:
          base = 2; // on travaille sur cette base mais on pourrait rendre la base aléatoire
          exp = [randint(1, 7, [1])]; // on a besoin de 1 exposant
          texte = `$\\dfrac{${base ** 3}\\times ${base}}{${base ** 2}^${exp[0]
            }}$`;
          texte_corr = `$\\dfrac{${base ** 3}\\times ${base}}{${base ** 2}^${exp[0]
            }}`;
          texte_corr += `=\\dfrac{${base}^3\\times ${base}}{(${base}^2)^${exp[0]}}`;
          texte_corr += `=\\dfrac{${base}^{3+1}}{${base}^{2\\times${exp[0]}}}`;
          texte_corr += `=\\dfrac{${base}^{4}}{${base}^{${2 * exp[0]}}}`;
          texte_corr += `=${base}^{4-${2 * exp[0]}}`;
          texte_corr += `=${base}^{${3 + 1 - 2 * exp[0]}}`;
          if (3 + 1 - 2 * exp[0] == 0 || 3 + 1 - 2 * exp[0] == 1) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant est évincé
            texte_corr += `=` + simpExp(base, 3 + 1 - 2 * exp[0]);
          }
          texte_corr += `$`;
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
    liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
  };
}

