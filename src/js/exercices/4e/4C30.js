import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,combinaisonListes,lettreDepuisChiffre,simpExp,simpNotPuissance,eclatePuissance,modalPdf} from '../../modules/outils.js'
export const titre = 'Puissances de 10 : Le sens des règles de calculs'

/**
 * 4C30 -- Puissances de 10
 * * Travailler des résultats automatisés
 * @author Sébastien Lozano
 */
export default function Puissances_de_dix() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = 1;
  this.titre = titre;
  sortieHtml
    ? (this.consigne = "Écrire sous la forme $\\mathbf{10^n}$.")
    : (this.consigne = "Écrire sous la forme $10^n$.");
  sortieHtml ? (this.spacing = 3) : (this.spacing = 2);
  sortieHtml ? (this.spacingCorr = 3) : (this.spacingCorr = 2);
  this.nbQuestions = 5;
  this.correctionDetailleeDisponible = true;
  this.nbColsCorr = 1;
  this.sup = 1;
  this.nouvelleVersion = function (numeroExercice) {
    let type_de_questions;
    this.boutonAide = modalPdf(
      numeroExercice,
      "assets/pdf/FichePuissances-4N21.pdf",
      "Aide mémoire sur les puissances (Sébastien Lozano)",
      "Aide mémoire"
    );

    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = [];
    if (this.sup == 1) {
      type_de_questions_disponibles = [1, 2, 3]; // produit, quotient et exponentiation de puissances de 10
    } else if (this.sup == 2) {
      type_de_questions_disponibles = [4, 5, 6, 7, 8, 9, 10, 11]; // calculs première série
    } else if (this.sup == 3) {
      type_de_questions_disponibles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; // calculs deuxième série
    }
    let listeTypeDeQuestions = combinaisonListes(
      type_de_questions_disponibles,
      this.nbQuestions
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
      texteCorr,
      cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      type_de_questions = listeTypeDeQuestions[i];

      exp0 = randint(1, 9);
      exp1 = randint(1, 9, [exp0]);
      exp = [exp0, exp1]; // on choisit deux exposants différents c'est mieux
      lettre = lettreDepuisChiffre(i + 1); // on utilise des lettres pour les calculs

      switch (type_de_questions) {
        case 1: // produit de puissances de même base
          texte = `$${lettre}=10^${exp[0]}\\times 10^${exp[1]}$`;

          texteCorr = `$${lettre}=10^${exp[0]}\\times 10^${exp[1]}$`;
          if (this.correctionDetaillee) {
            texteCorr += `<br>`;
            texteCorr += `$${lettre}=${eclatePuissance(
              10,
              exp[0],
              coul0
            )} \\times ${eclatePuissance(10, exp[1], coul1)}$`;
          }
          texteCorr += `<br>`;
          texteCorr += `Il y a donc $\\mathbf{\\color{${coul0}}{${exp[0]}}~\\color{black}{+}~\\color{${coul1}}{${exp[1]}}}$ facteurs tous égaux à $10$`;
          texteCorr += `<br>`;
          texteCorr += `$${lettre}=10^{${exp[0]}+${exp[1]}} = 10^{${exp[0] + exp[1]
            }}`;
          // attention la base est de type str alors que la fonction switch sur un type number
          //if (simpNotPuissance(10, exp[0] + exp[1]) != ` `) {
          if ((exp[1] + exp[0]) % 2 == 0) {
            texteCorr += `=${simpNotPuissance(10, exp[0] + exp[1])}`;
          }
          texteCorr += `$`;
          texteCorr += `<br>`;
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

          texteCorr = `$${lettre}=\\dfrac{10^${exp[0]}}{10^${exp[1]}}$`;
          if (this.correctionDetaillee) {
            texteCorr += `<br><br>`;
            texteCorr += `$${lettre}=\\dfrac{${eclatePuissance(
              10,
              exp[0],
              coul_exp0
            )}}{${eclatePuissance(10, exp[1], coul_exp1)}}$`;
          }
          texteCorr += `<br><br>`;
          texteCorr += `Il y a donc $\\mathbf{\\color{${coul1}}{${Math.min(
            exp[0],
            exp[1]
          )}}}$ simplifications par $10$ possibles.`;
          if (this.correctionDetaillee) {
            texteCorr += `<br><br>`;
          }
          if (exp[0] - exp[1] == 0) {
            if (this.correctionDetaillee) {
              texteCorr += `$${lettre}=\\dfrac{${eclatePuissance(
                `\\cancel{10}`,
                exp[0],
                coul_exp0
              )}}{${eclatePuissance(`\\cancel{10}`, exp[0], coul_exp1)}}$`;
            }
            texteCorr += `<br><br>`;
            texteCorr += `$${lettre}=1`;
          } else if (exp[0] - exp[1] < 0) {
            if (this.correctionDetaillee) {
              texteCorr += `$${lettre}=\\dfrac{${eclatePuissance(
                `\\cancel{10}`,
                exp[0],
                coul_exp0
              )}}{${eclatePuissance(
                `\\cancel{10}`,
                exp[0],
                coul_exp1
              )}\\times${eclatePuissance(10, exp[1] - exp[0], coul_exp1)}}$`;
            }
            texteCorr += `<br><br>`;
            texteCorr += `$${lettre}=\\dfrac{1}{10^{${exp[1]}-${exp[0]
              }}}=\\dfrac{1}{10^{${exp[1] - exp[0]}}}`;
            //if (simpNotPuissance(10, exp[1] - exp[0]) != ` `) {
            if ((exp[1] - exp[0]) % 2 == 0) {
              texteCorr += `=\\dfrac{1}{${simpNotPuissance(
                10,
                exp[1] - exp[0]
              )}}=${simpNotPuissance(10, exp[0] - exp[1])}`;
            } else {
              texteCorr += `=10^{${exp[0] - exp[1]}}`;
            }
          } else {
            if (this.correctionDetaillee) {
              texteCorr += `$${lettre}=\\dfrac{${eclatePuissance(
                `\\cancel{10}`,
                exp[1],
                coul_exp0
              )}\\times${eclatePuissance(
                10,
                exp[0] - exp[1],
                coul_exp0
              )}}{${eclatePuissance(`\\cancel{10}`, exp[1], coul_exp1)}}$`;
            }
            texteCorr += `<br><br>`;
            texteCorr += `$${lettre}=10^{${exp[0]}-${exp[1]}}=10^{${exp[0] - exp[1]
              }}`;
            //if (simpNotPuissance(10, exp[0] - exp[1]) != ` `) {
            // if ((exp[0] - exp[1])%2==0) { 
            //   texteCorr += `=${simpNotPuissance(10, exp[0] - exp[1])}`;
            // }
          }
          texteCorr += `$`;
          texteCorr += `<br>`;
          break;
        case 3: // exponentiation
          exp = [randint(2, 4), randint(2, 4)]; // on redéfinit les deux exposants pour ne pas avoir d'écritures trop longues et pour éviter 1
          texte = `$${lettre}=(10^${exp[0]})^{${exp[1]}}$`;

          texteCorr = `$${lettre}=(10^${exp[0]})^{${exp[1]}}$`;
          if (this.correctionDetaillee) {
            texteCorr += `<br>`;
            texteCorr += `$${lettre}=\\color{${coul0}}{\\underbrace{${eclatePuissance(
              `(10^${exp[0]})`,
              exp[1],
              coul0
            )}}_{${exp[1]}\\thickspace\\text{facteurs}}}$`;
            texteCorr += `<br>`;
            texteCorr += `$${lettre}=\\color{${coul0}}{\\underbrace{${eclatePuissance(
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
          texteCorr += `<br>`;
          texteCorr += `Il y a donc $\\mathbf{\\color{${coul0}}{${exp[1]}}~\\color{black}{\\times}~\\color{${coul1}}{${exp[0]}}}$ facteurs tous égaux à $10$`;
          texteCorr += `<br>`;
          texteCorr += `$${lettre}=10^{${exp[0]}\\times${exp[1]}} = 10^{${exp[0] * exp[1]
            }}`;
          //if (simpNotPuissance(10, exp[0] * exp[1]) != ` `) {
          // if ((exp[1] * exp[0])%2==0) {             
          //   texteCorr += `= ${simpNotPuissance(10, exp[0] * exp[1])}`;
          // }
          texteCorr += `$`;
          texteCorr += `<br>`;
          break;
        case 4:
          exp = [randint(1, 7, [1]), randint(1, 7, [1]), randint(1, 7, [1])]; // on a besoin de 3 exposants distincts
          texte = `$\\dfrac{10^${exp[0]}\\times 100}{10^${exp[1]} \\times 10^${exp[2]}}$`;
          texteCorr = `$\\dfrac{10^${exp[0]}\\times 100}{10^${exp[1]} \\times 10^${exp[2]}}`;
          texteCorr += ` = \\dfrac{10^${exp[0]}\\times 10^{2}}{10^${exp[1]} \\times 10^${exp[2]}}`;
          texteCorr += ` = \\dfrac{10^{${exp[0]}+2}}{10^{${exp[1]}+${exp[2]}}}`;
          texteCorr += ` = \\dfrac{10^{${exp[0] + 2}}}{10^{${exp[1] + exp[2]
            }}}`;
          texteCorr += ` = 10^{${exp[0] + 2}-${exp[1] + exp[2]}}`;
          texteCorr += ` = 10^{${exp[0] + 2 - exp[1] - exp[2]}}`;
          if (
            exp[0] + 2 - exp[1] - exp[2] == 0 ||
            exp[0] + 2 - exp[1] - exp[2] == 1
          ) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
            texteCorr += `=` + simpExp(10, exp[0] + 2 - exp[1] - exp[2]);
          }
          texteCorr += `$`;
          break;
        case 5:
          exp = [randint(1, 7, [1]), randint(1, 7, [1])]; // on a besoin de 2 exposants distincts
          texte = `$\\dfrac{10^${exp[0]}\\times 1000}{10^${exp[1]}}$`;
          texteCorr = `$\\dfrac{10^${exp[0]}\\times 1000}{10^${exp[1]}}`;
          texteCorr += ` = \\dfrac{10^${exp[0]}\\times 10^3}{10^${exp[1]}}`;
          texteCorr += ` = \\dfrac{10^{${exp[0]}+3}}{10^${exp[1]}}`;
          texteCorr += ` = \\dfrac{10^{${exp[0] + 3}}}{10^${exp[1]}}`;
          texteCorr += ` = 10^{${exp[0] + 3}-${exp[1]}}`;
          texteCorr += ` = 10^{${exp[0] + 3 - exp[1]}}`;
          if (exp[0] + 3 - exp[1] == 0 || exp[0] + 3 - exp[1] == 1) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
            texteCorr += `=` + simpExp(10, exp[0] + 3 - exp[1]);
          }
          texteCorr += `$`;
          break;
        case 6:
          exp = [randint(1, 7, [1]), randint(1, 2)]; // on a besoin de 2 exposants distincts
          // le second exposant ne peut valoir que 1 ou 2 la fonction testExp ne convient pas à l'affichage ici
          if (exp[1] == 2) {
            texte = `$\\dfrac{10\\times 10^${exp[0]}}{100^${exp[1]}}$`;
            texteCorr = `$\\dfrac{10\\times 10^${exp[0]}}{100^${exp[1]}}`;
            texteCorr += `=\\dfrac{10^{1+${exp[0]}}}{(10^2)^${exp[1]}}`;
            texteCorr += `=\\dfrac{10^{1+${exp[0]}}}{10^{2 \\times ${exp[1]}}}`;
            texteCorr += `=\\dfrac{10^{${1 + exp[0]}}}{10^{${2 * exp[1]}}}`;
          } else {
            texte = `$\\dfrac{10\\times 10^${exp[0]}}{100}$`;
            texteCorr = `$\\dfrac{10\\times 10^${exp[0]}}{100}`;
            texteCorr += `=\\dfrac{10^{1+${exp[0]}}}{10^2}`;
          }
          texteCorr += `=10^{${1 + exp[0]}-${2 * exp[1]}}`;
          texteCorr += `=10^{${1 + exp[0] - 2 * exp[1]}}`;
          if (1 + exp[0] - 2 * exp[1] == 0 || 1 + exp[0] - 2 * exp[1] == 1) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
            texteCorr += `=` + simpExp(10, 1 + exp[0] - 2 * exp[1]);
          }
          texteCorr += `$`;
          break;
        case 7:
          exp = [randint(1, 7, [1])]; // on a besoin de 1 exposant
          texte = `$\\dfrac{10\\times 10^${exp[0]}}{100\\times 100}$`;
          texteCorr = `$\\dfrac{10\\times 10^${exp[0]}}{100\\times 100}`;
          texteCorr += `=\\dfrac{10^{1+${exp[0]}}}{10^2\\times 10^2}`;
          texteCorr += `=\\dfrac{10^{${1 + exp[0]}}}{10^{2+2}}`;
          texteCorr += `=\\dfrac{10^{${1 + exp[0]}}}{10^{${2 + 2}}}`;
          texteCorr += `=10^{${1 + exp[0]}-${2 + 2}}`;
          texteCorr += `=10^{${1 + exp[0] - 2 - 2}}`;
          if (1 + exp[0] - 2 - 2 == 0 || 1 + exp[0] - 2 - 2 == 1) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
            texteCorr += `=` + simpExp(10, 1 + exp[0] - 2 - 2);
          }
          texteCorr += `$`;
          break;
        case 8:
          exp = [randint(1, 7, [1])]; // on a besoin de 1 exposant
          texte = `$\\dfrac{100^${exp[0]}}{10}$`;
          texteCorr = `$\\dfrac{100^${exp[0]}}{10}`;
          texteCorr += `=\\dfrac{(10^2)^${exp[0]}}{10}`;
          texteCorr += `=\\dfrac{10^{2\\times ${exp[0]}}}{10}`;
          texteCorr += `=\\dfrac{10^{${2 * exp[0]}}}{10}`;
          texteCorr += `=10^{${2 * exp[0]}-1}`;
          texteCorr += `=10^{${2 * exp[0] - 1}}$`;
          // Inutile de tester l'exposant final car il vaut au minimum 3
          break;
        case 9:
          exp = [randint(1, 3, [1])]; // on a besoin de 1 exposant
          texte = `$\\dfrac{1000^${exp[0]}}{10}$`;
          texteCorr = `$\\dfrac{1000^${exp[0]}}{10}`;
          texteCorr += `=\\dfrac{(10^3)^${exp[0]}}{10}`;
          texteCorr += `=\\dfrac{10^{3\\times ${exp[0]}}}{10}`;
          texteCorr += `=\\dfrac{10^{${3 * exp[0]}}}{10}`;
          texteCorr += `=10^{${3 * exp[0]}-1}`;
          texteCorr += `=10^{${3 * exp[0] - 1}}$`;
          // inutile de tester l'exposant final car il vaut au minimum 5
          break;
        case 10:
          exp = [randint(1, 7, [1]), randint(1, 7, [1]), randint(1, 4, [1])]; // on a besoin de 3 exposants distincts
          texte = `$\\dfrac{10^${exp[0]}\\times 10^${exp[1]}}{100^${exp[2]}}\\times 10$`;
          texteCorr = `$\\dfrac{10^${exp[0]}\\times 10^${exp[1]}}{100^${exp[2]}}\\times 10`;
          texteCorr += `=\\dfrac{10^{${exp[0]}+${exp[1]}}}{(10^2)^${exp[2]}}\\times 10`;
          texteCorr += `=\\dfrac{10^{${exp[0] + exp[1]}}}{10^{2\\times ${exp[2]
            }}}\\times 10`;
          texteCorr += `=\\dfrac{10^{${exp[0] + exp[1]}}}{10^{${2 * exp[2]
            }}}\\times 10`;
          texteCorr += `=\\dfrac{10^{${exp[0] + exp[1]}}\\times 10}{10^{${2 * exp[2]
            }}}`;
          texteCorr += `=\\dfrac{10^{${exp[0] + exp[1]}+1}}{10^{${2 * exp[2]
            }}}`;
          texteCorr += `=\\dfrac{10^{${exp[0] + exp[1] + 1}}}{10^{${2 * exp[2]
            }}}`;
          texteCorr += `=10^{${exp[0] + exp[1] + 1}-${2 * exp[2]}}`;
          texteCorr += `=10^{${exp[0] + exp[1] + 1 - 2 * exp[2]}}`;
          if (
            exp[0] + exp[1] + 1 - 2 * exp[2] == 0 ||
            exp[0] + exp[1] + 1 - 2 * exp[2] == 1
          ) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant est évincé
            texteCorr += `=` + simpExp(10, exp[0] + exp[1] + 1 - 2 * exp[2]);
          }
          texteCorr += `$`;
          break;
        case 11:
          exp = [randint(1, 7, [1])]; // on a besoin de 1 exposant
          texte = `$\\dfrac{1000\\times 10}{100^${exp[0]}}$`;
          texteCorr = `$\\dfrac{1000\\times 10}{100^${exp[0]}}`;
          texteCorr += `=\\dfrac{10^3\\times 10}{(10^2)^${exp[0]}}`;
          texteCorr += `=\\dfrac{10^{3+1}}{10^{2\\times${exp[0]}}}`;
          texteCorr += `=\\dfrac{10^{4}}{10^{${2 * exp[0]}}}`;
          texteCorr += `=10^{4-${2 * exp[0]}}`;
          texteCorr += `=10^{${3 + 1 - 2 * exp[0]}}`;
          if (3 + 1 - 2 * exp[0] == 0 || 3 + 1 - 2 * exp[0] == 1) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant est évincé
            texteCorr += `=` + simpExp(10, 3 + 1 - 2 * exp[0]);
          }
          texteCorr += `$`;
          break;
      }
      if (this.listeQuestions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte);
        this.listeCorrections.push(texteCorr);
        i++;
      }
      cpt++;
    }
    listeQuestionsToContenu(this);
  };
  this.besoinFormulaireNumerique = [
    "Règle à travailler",
    3,
    "1 : Calculs de base\n2 : Calculs plus complexes\n3 : Mélange",
  ];
}


