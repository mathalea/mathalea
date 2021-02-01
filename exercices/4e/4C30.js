import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes,lettre_depuis_chiffre,simpExp,simpNotPuissance,eclatePuissance,modal_pdf} from "/modules/outils.js"
/**
 * 4C30 -- Puissances de 10
 * * Travailler des résultats automatisés
 * @author Sébastien Lozano
 */
export default function Puissances_de_dix() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = 1;
  this.titre = "Puissances de 10 : Le sens des règles de calculs";
  sortie_html
    ? (this.consigne = "Écrire sous la forme $\\mathbf{10^n}$.")
    : (this.consigne = "Écrire sous la forme $10^n$.");
  sortie_html ? (this.spacing = 3) : (this.spacing = 2);
  sortie_html ? (this.spacing_corr = 3) : (this.spacing_corr = 2);
  this.nb_questions = 5;
  this.correction_detaillee_disponible = true;
  this.nb_cols_corr = 1;
  this.sup = 1;
  this.nouvelle_version = function (numero_de_l_exercice) {
    let type_de_questions;
    this.bouton_aide = modal_pdf(
      numero_de_l_exercice,
      "pdf/FichePuissances-4N21.pdf",
      "Aide mémoire sur les puissances (Sébastien Lozano)",
      "Aide mémoire"
    );

    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = [];
    if (this.sup == 1) {
      type_de_questions_disponibles = [1, 2, 3]; // produit, quotient et exponentiation de puissances de 10
    } else if (this.sup == 2) {
      type_de_questions_disponibles = [4, 5, 6, 7, 8, 9, 10, 11]; // calculs première série
    } else if (this.sup == 3) {
      type_de_questions_disponibles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; // calculs deuxième série
    }
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    );

    // pour pouvoir adapter les couleurs en cas de besoin
    let coul0 = "red";
    let coul1 = "blue";

    for (
      let i = 0,
      exp0,
      exp1,
      exp,
      coul_exp0,
      coul_exp1,
      lettre,
      texte,
      texte_corr,
      cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      type_de_questions = liste_type_de_questions[i];

      exp0 = randint(1, 9);
      exp1 = randint(1, 9, [exp0]);
      exp = [exp0, exp1]; // on choisit deux exposants différents c'est mieux
      lettre = lettre_depuis_chiffre(i + 1); // on utilise des lettres pour les calculs

      switch (type_de_questions) {
        case 1: // produit de puissances de même base
          texte = `$${lettre}=10^${exp[0]}\\times 10^${exp[1]}$`;

          texte_corr = `$${lettre}=10^${exp[0]}\\times 10^${exp[1]}$`;
          if (this.correction_detaillee) {
            texte_corr += `<br>`;
            texte_corr += `$${lettre}=${eclatePuissance(
              10,
              exp[0],
              coul0
            )} \\times ${eclatePuissance(10, exp[1], coul1)}$`;
          }
          texte_corr += `<br>`;
          texte_corr += `Il y a donc $\\mathbf{\\color{${coul0}}{${exp[0]}}~\\color{black}{+}~\\color{${coul1}}{${exp[1]}}}$ facteurs tous égaux à $10$`;
          texte_corr += `<br>`;
          texte_corr += `$${lettre}=10^{${exp[0]}+${exp[1]}} = 10^{${exp[0] + exp[1]
            }}`;
          // attention la base est de type str alors que la fonction switch sur un type number
          //if (simpNotPuissance(10, exp[0] + exp[1]) != ` `) {
          if ((exp[1] + exp[0]) % 2 == 0) {
            texte_corr += `=${simpNotPuissance(10, exp[0] + exp[1])}`;
          }
          texte_corr += `$`;
          texte_corr += `<br>`;
          break;
        case 2: // quotient de puissances de même base
          // Pour que la couleur de la 10 associée à l'exposant max soit toujours rouge.
          if (Math.max(exp[0], exp[1]) == exp[0]) {
            coul_exp0 = coul0;
            coul_exp1 = coul1;
          } else {
            coul_exp0 = coul1;
            coul_exp1 = coul0;
          }

          texte = `$${lettre}=\\dfrac{10^${exp[0]}}{10^${exp[1]}}$`;

          texte_corr = `$${lettre}=\\dfrac{10^${exp[0]}}{10^${exp[1]}}$`;
          if (this.correction_detaillee) {
            texte_corr += `<br><br>`;
            texte_corr += `$${lettre}=\\dfrac{${eclatePuissance(
              10,
              exp[0],
              coul_exp0
            )}}{${eclatePuissance(10, exp[1], coul_exp1)}}$`;
          }
          texte_corr += `<br><br>`;
          texte_corr += `Il y a donc $\\mathbf{\\color{${coul1}}{${Math.min(
            exp[0],
            exp[1]
          )}}}$ simplifications par $10$ possibles.`;
          if (this.correction_detaillee) {
            texte_corr += `<br><br>`;
          }
          if (exp[0] - exp[1] == 0) {
            if (this.correction_detaillee) {
              texte_corr += `$${lettre}=\\dfrac{${eclatePuissance(
                `\\cancel{10}`,
                exp[0],
                coul_exp0
              )}}{${eclatePuissance(`\\cancel{10}`, exp[0], coul_exp1)}}$`;
            }
            texte_corr += `<br><br>`;
            texte_corr += `$${lettre}=1`;
          } else if (exp[0] - exp[1] < 0) {
            if (this.correction_detaillee) {
              texte_corr += `$${lettre}=\\dfrac{${eclatePuissance(
                `\\cancel{10}`,
                exp[0],
                coul_exp0
              )}}{${eclatePuissance(
                `\\cancel{10}`,
                exp[0],
                coul_exp1
              )}\\times${eclatePuissance(10, exp[1] - exp[0], coul_exp1)}}$`;
            }
            texte_corr += `<br><br>`;
            texte_corr += `$${lettre}=\\dfrac{1}{10^{${exp[1]}-${exp[0]
              }}}=\\dfrac{1}{10^{${exp[1] - exp[0]}}}`;
            //if (simpNotPuissance(10, exp[1] - exp[0]) != ` `) {
            if ((exp[1] - exp[0]) % 2 == 0) {
              texte_corr += `=\\dfrac{1}{${simpNotPuissance(
                10,
                exp[1] - exp[0]
              )}}=${simpNotPuissance(10, exp[0] - exp[1])}`;
            } else {
              texte_corr += `=10^{${exp[0] - exp[1]}}`;
            }
          } else {
            if (this.correction_detaillee) {
              texte_corr += `$${lettre}=\\dfrac{${eclatePuissance(
                `\\cancel{10}`,
                exp[1],
                coul_exp0
              )}\\times${eclatePuissance(
                10,
                exp[0] - exp[1],
                coul_exp0
              )}}{${eclatePuissance(`\\cancel{10}`, exp[1], coul_exp1)}}$`;
            }
            texte_corr += `<br><br>`;
            texte_corr += `$${lettre}=10^{${exp[0]}-${exp[1]}}=10^{${exp[0] - exp[1]
              }}`;
            //if (simpNotPuissance(10, exp[0] - exp[1]) != ` `) {
            // if ((exp[0] - exp[1])%2==0) { 
            //   texte_corr += `=${simpNotPuissance(10, exp[0] - exp[1])}`;
            // }
          }
          texte_corr += `$`;
          texte_corr += `<br>`;
          break;
        case 3: // exponentiation
          exp = [randint(2, 4), randint(2, 4)]; // on redéfinit les deux exposants pour ne pas avoir d'écritures trop longues et pour éviter 1
          texte = `$${lettre}=(10^${exp[0]})^{${exp[1]}}$`;

          texte_corr = `$${lettre}=(10^${exp[0]})^{${exp[1]}}$`;
          if (this.correction_detaillee) {
            texte_corr += `<br>`;
            texte_corr += `$${lettre}=\\color{${coul0}}{\\underbrace{${eclatePuissance(
              `(10^${exp[0]})`,
              exp[1],
              coul0
            )}}_{${exp[1]}\\thickspace\\text{facteurs}}}$`;
            texte_corr += `<br>`;
            texte_corr += `$${lettre}=\\color{${coul0}}{\\underbrace{${eclatePuissance(
              `(\\color{${coul1}}{\\underbrace{${eclatePuissance(
                10,
                exp[0],
                coul1
              )}}_{${exp[0]}\\thickspace\\text{facteurs}}}\\color{${coul0}})`,
              exp[1],
              coul0
            )}}_{${exp[1]}\\times\\color{${coul1}}{${exp[0]
              }}\\thickspace\\color{black}{\\text{facteurs}}}}$`;
          }
          texte_corr += `<br>`;
          texte_corr += `Il y a donc $\\mathbf{\\color{${coul0}}{${exp[1]}}~\\color{black}{\\times}~\\color{${coul1}}{${exp[0]}}}$ facteurs tous égaux à $10$`;
          texte_corr += `<br>`;
          texte_corr += `$${lettre}=10^{${exp[0]}\\times${exp[1]}} = 10^{${exp[0] * exp[1]
            }}`;
          //if (simpNotPuissance(10, exp[0] * exp[1]) != ` `) {
          // if ((exp[1] * exp[0])%2==0) {             
          //   texte_corr += `= ${simpNotPuissance(10, exp[0] * exp[1])}`;
          // }
          texte_corr += `$`;
          texte_corr += `<br>`;
          break;
        case 4:
          exp = [randint(1, 7, [1]), randint(1, 7, [1]), randint(1, 7, [1])]; // on a besoin de 3 exposants distincts
          texte = `$\\dfrac{10^${exp[0]}\\times 100}{10^${exp[1]} \\times 10^${exp[2]}}$`;
          texte_corr = `$\\dfrac{10^${exp[0]}\\times 100}{10^${exp[1]} \\times 10^${exp[2]}}`;
          texte_corr += ` = \\dfrac{10^${exp[0]}\\times 10^{2}}{10^${exp[1]} \\times 10^${exp[2]}}`;
          texte_corr += ` = \\dfrac{10^{${exp[0]}+2}}{10^{${exp[1]}+${exp[2]}}}`;
          texte_corr += ` = \\dfrac{10^{${exp[0] + 2}}}{10^{${exp[1] + exp[2]
            }}}`;
          texte_corr += ` = 10^{${exp[0] + 2}-${exp[1] + exp[2]}}`;
          texte_corr += ` = 10^{${exp[0] + 2 - exp[1] - exp[2]}}`;
          if (
            exp[0] + 2 - exp[1] - exp[2] == 0 ||
            exp[0] + 2 - exp[1] - exp[2] == 1
          ) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
            texte_corr += `=` + simpExp(10, exp[0] + 2 - exp[1] - exp[2]);
          }
          texte_corr += `$`;
          break;
        case 5:
          exp = [randint(1, 7, [1]), randint(1, 7, [1])]; // on a besoin de 2 exposants distincts
          texte = `$\\dfrac{10^${exp[0]}\\times 1000}{10^${exp[1]}}$`;
          texte_corr = `$\\dfrac{10^${exp[0]}\\times 1000}{10^${exp[1]}}`;
          texte_corr += ` = \\dfrac{10^${exp[0]}\\times 10^3}{10^${exp[1]}}`;
          texte_corr += ` = \\dfrac{10^{${exp[0]}+3}}{10^${exp[1]}}`;
          texte_corr += ` = \\dfrac{10^{${exp[0] + 3}}}{10^${exp[1]}}`;
          texte_corr += ` = 10^{${exp[0] + 3}-${exp[1]}}`;
          texte_corr += ` = 10^{${exp[0] + 3 - exp[1]}}`;
          if (exp[0] + 3 - exp[1] == 0 || exp[0] + 3 - exp[1] == 1) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
            texte_corr += `=` + simpExp(10, exp[0] + 3 - exp[1]);
          }
          texte_corr += `$`;
          break;
        case 6:
          exp = [randint(1, 7, [1]), randint(1, 2)]; // on a besoin de 2 exposants distincts
          // le second exposant ne peut valoir que 1 ou 2 la fonction testExp ne convient pas à l'affichage ici
          if (exp[1] == 2) {
            texte = `$\\dfrac{10\\times 10^${exp[0]}}{100^${exp[1]}}$`;
            texte_corr = `$\\dfrac{10\\times 10^${exp[0]}}{100^${exp[1]}}`;
            texte_corr += `=\\dfrac{10^{1+${exp[0]}}}{(10^2)^${exp[1]}}`;
            texte_corr += `=\\dfrac{10^{1+${exp[0]}}}{10^{2 \\times ${exp[1]}}}`;
            texte_corr += `=\\dfrac{10^{${1 + exp[0]}}}{10^{${2 * exp[1]}}}`;
          } else {
            texte = `$\\dfrac{10\\times 10^${exp[0]}}{100}$`;
            texte_corr = `$\\dfrac{10\\times 10^${exp[0]}}{100}`;
            texte_corr += `=\\dfrac{10^{1+${exp[0]}}}{10^2}`;
          }
          texte_corr += `=10^{${1 + exp[0]}-${2 * exp[1]}}`;
          texte_corr += `=10^{${1 + exp[0] - 2 * exp[1]}}`;
          if (1 + exp[0] - 2 * exp[1] == 0 || 1 + exp[0] - 2 * exp[1] == 1) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
            texte_corr += `=` + simpExp(10, 1 + exp[0] - 2 * exp[1]);
          }
          texte_corr += `$`;
          break;
        case 7:
          exp = [randint(1, 7, [1])]; // on a besoin de 1 exposant
          texte = `$\\dfrac{10\\times 10^${exp[0]}}{100\\times 100}$`;
          texte_corr = `$\\dfrac{10\\times 10^${exp[0]}}{100\\times 100}`;
          texte_corr += `=\\dfrac{10^{1+${exp[0]}}}{10^2\\times 10^2}`;
          texte_corr += `=\\dfrac{10^{${1 + exp[0]}}}{10^{2+2}}`;
          texte_corr += `=\\dfrac{10^{${1 + exp[0]}}}{10^{${2 + 2}}}`;
          texte_corr += `=10^{${1 + exp[0]}-${2 + 2}}`;
          texte_corr += `=10^{${1 + exp[0] - 2 - 2}}`;
          if (1 + exp[0] - 2 - 2 == 0 || 1 + exp[0] - 2 - 2 == 1) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
            texte_corr += `=` + simpExp(10, 1 + exp[0] - 2 - 2);
          }
          texte_corr += `$`;
          break;
        case 8:
          exp = [randint(1, 7, [1])]; // on a besoin de 1 exposant
          texte = `$\\dfrac{100^${exp[0]}}{10}$`;
          texte_corr = `$\\dfrac{100^${exp[0]}}{10}`;
          texte_corr += `=\\dfrac{(10^2)^${exp[0]}}{10}`;
          texte_corr += `=\\dfrac{10^{2\\times ${exp[0]}}}{10}`;
          texte_corr += `=\\dfrac{10^{${2 * exp[0]}}}{10}`;
          texte_corr += `=10^{${2 * exp[0]}-1}`;
          texte_corr += `=10^{${2 * exp[0] - 1}}$`;
          // Inutile de tester l'exposant final car il vaut au minimum 3
          break;
        case 9:
          exp = [randint(1, 3, [1])]; // on a besoin de 1 exposant
          texte = `$\\dfrac{1000^${exp[0]}}{10}$`;
          texte_corr = `$\\dfrac{1000^${exp[0]}}{10}`;
          texte_corr += `=\\dfrac{(10^3)^${exp[0]}}{10}`;
          texte_corr += `=\\dfrac{10^{3\\times ${exp[0]}}}{10}`;
          texte_corr += `=\\dfrac{10^{${3 * exp[0]}}}{10}`;
          texte_corr += `=10^{${3 * exp[0]}-1}`;
          texte_corr += `=10^{${3 * exp[0] - 1}}$`;
          // inutile de tester l'exposant final car il vaut au minimum 5
          break;
        case 10:
          exp = [randint(1, 7, [1]), randint(1, 7, [1]), randint(1, 4, [1])]; // on a besoin de 3 exposants distincts
          texte = `$\\dfrac{10^${exp[0]}\\times 10^${exp[1]}}{100^${exp[2]}}\\times 10$`;
          texte_corr = `$\\dfrac{10^${exp[0]}\\times 10^${exp[1]}}{100^${exp[2]}}\\times 10`;
          texte_corr += `=\\dfrac{10^{${exp[0]}+${exp[1]}}}{(10^2)^${exp[2]}}\\times 10`;
          texte_corr += `=\\dfrac{10^{${exp[0] + exp[1]}}}{10^{2\\times ${exp[2]
            }}}\\times 10`;
          texte_corr += `=\\dfrac{10^{${exp[0] + exp[1]}}}{10^{${2 * exp[2]
            }}}\\times 10`;
          texte_corr += `=\\dfrac{10^{${exp[0] + exp[1]}}\\times 10}{10^{${2 * exp[2]
            }}}`;
          texte_corr += `=\\dfrac{10^{${exp[0] + exp[1]}+1}}{10^{${2 * exp[2]
            }}}`;
          texte_corr += `=\\dfrac{10^{${exp[0] + exp[1] + 1}}}{10^{${2 * exp[2]
            }}}`;
          texte_corr += `=10^{${exp[0] + exp[1] + 1}-${2 * exp[2]}}`;
          texte_corr += `=10^{${exp[0] + exp[1] + 1 - 2 * exp[2]}}`;
          if (
            exp[0] + exp[1] + 1 - 2 * exp[2] == 0 ||
            exp[0] + exp[1] + 1 - 2 * exp[2] == 1
          ) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant est évincé
            texte_corr += `=` + simpExp(10, exp[0] + exp[1] + 1 - 2 * exp[2]);
          }
          texte_corr += `$`;
          break;
        case 11:
          exp = [randint(1, 7, [1])]; // on a besoin de 1 exposant
          texte = `$\\dfrac{1000\\times 10}{100^${exp[0]}}$`;
          texte_corr = `$\\dfrac{1000\\times 10}{100^${exp[0]}}`;
          texte_corr += `=\\dfrac{10^3\\times 10}{(10^2)^${exp[0]}}`;
          texte_corr += `=\\dfrac{10^{3+1}}{10^{2\\times${exp[0]}}}`;
          texte_corr += `=\\dfrac{10^{4}}{10^{${2 * exp[0]}}}`;
          texte_corr += `=10^{4-${2 * exp[0]}}`;
          texte_corr += `=10^{${3 + 1 - 2 * exp[0]}}`;
          if (3 + 1 - 2 * exp[0] == 0 || 3 + 1 - 2 * exp[0] == 1) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant est évincé
            texte_corr += `=` + simpExp(10, 3 + 1 - 2 * exp[0]);
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
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = [
    "Règle à travailler",
    3,
    "1 : Calculs de base\n2 : Calculs plus complexes\n3 : Mélange",
  ];
}


