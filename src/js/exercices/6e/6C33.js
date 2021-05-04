import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,enleveElement,choice,range1,combinaisonListes,miseEnEvidence,liste_des_diviseurs} from '../../modules/outils.js'
export const titre = 'Calculer en utilisant les priorités opératoires'

/**
 * Plusieurs type de calcul avec des entiers.
 *
 * Sans parenthèses :
 * * a+b*c
 * * a+b÷c
 * * a÷b*c
 * * a-b*c
 * * a*b÷c
 * * a*b+c
 * * a-b+c
 * * a+b+c*d
 * * a*b+c*d
 * * a*b*c-d
 * * a*b-c÷d
 * * a*b+c÷d
 *
 * Avec parenthèses :
 * * a*(b-c)
 * * (a-b)*c
 * * (a-b)÷c
 * * a÷(b+c)
 * * (a-b)÷c
 * * a*(b-c)*d
 * * a*b*(c-d)
 * * a*(b-c*d)
 * * (a+b*c)÷d
 * * a*(b-c*d)
 * * a*b÷(c+d)
 * * a*(b÷c+d)
 * @Auteur Rémi Angot
 * Référence 6C33
 */
export default function Priorites() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "Calculer";
  this.nbQuestions = 5;
  this.nbCols = 2;
  this.nbColsCorr = 1;
  this.sup = 3;

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    let listeQuestions_disponibles = []; //
    if (this.sup == 1) {
      listeQuestions_disponibles = range1(12);
    } else if (this.sup == 2) {
      listeQuestions_disponibles = range1(22, range1(12));
    } else {
      listeQuestions_disponibles = range1(22);
    }
    let liste_type_de_questions = combinaisonListes(
      listeQuestions_disponibles,
      this.nbQuestions
    );
    for (
      let i = 0, texte, texteCorr, a, b, c, d, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      switch (liste_type_de_questions[i]) {
        case 1:
          a = randint(2, 11);
          b = randint(2, 11);
          c = randint(2, 11);
          texte = `$${a}+${b}\\times${c}$`;
          texteCorr = `$${a}+${miseEnEvidence(b + "\\times" + c)}=${a}+${b * c
            }=${a + b * c}$`;
          break;
        case 2:
          a = randint(2, 11);
          c = randint(2, 11);
          b = c * randint(2, 11);
          texte = `$${a}+${b}\\div${c}$`;
          texteCorr = `$${a}+${miseEnEvidence(b + "\\div" + c)}=${a}+${b / c
            }=${a + b / c}$`;
          break;
        case 3:
          b = randint(2, 11);
          c = randint(2, 11);
          a = b * randint(2, 11);
          texte = `$${a}\\div${b}\\times${c}$`;
          texteCorr = `$${miseEnEvidence(a + "\\div" + b)}\\times${c}=${a / b
            }\\times${c}=${(a / b) * c}$`;
          break;
        case 4:
          b = randint(2, 11);
          c = randint(2, 11);
          a = b * c + randint(2, 11);
          texte = `$${a}-${b}\\times${c}$`;
          texteCorr = `$${a}-${miseEnEvidence(b + "\\times" + c)}=${a}-${b * c
            }=${a - b * c}$`;
          break;
        case 5:
          if (choice([true, false])) {
            //a est un multiple de c
            c = randint(2, 6);
            a = c * randint(2, 5);
            b = randint(2, 6);
          } else {
            // b est un multiple de c
            c = randint(2, 6);
            b = c * randint(2, 5);
            a = randint(2, 6);
          }
          texte = `$${a}\\times${b}\\div${c}$`;
          texteCorr = `$${miseEnEvidence(a + "\\times" + b)}\\div${c}=${a * b
            }\\div${c}=${(a * b) / c}$`;
          break;
        case 6:
          a = randint(2, 11);
          b = randint(2, 11);
          c = randint(2, 11);
          texte = `$${a}\\times${b}+${c}$`;
          texteCorr = `$${miseEnEvidence(a + "\\times" + b)}+${c}=${a * b
            }+${c}=${a * b + c}$`;
          break;
        case 7:
          b = randint(20, 59);
          a = b + randint(11, 29);
          c = randint(11, 29);
          texte = `$${a}-${b}+${c}$`;
          texteCorr = `$${miseEnEvidence(a + "-" + b)}+${c}=${a - b}+${c}=${a - b + c
            }$`;
          break;
        case 8:
          a = randint(2, 20);
          b = randint(2, 20);
          c = randint(2, 11);
          d = randint(2, 11);
          texte = `$${a}+${b}+${c}\\times${d}$`;
          texteCorr = `$${a}+${b}+${miseEnEvidence(
            c + "\\times" + d
          )}=${a}+${b}+${c * d}=${a + b + c * d}$`;
          break;
        case 9:
          a = randint(2, 11);
          b = randint(2, 11);
          c = randint(2, 11);
          d = randint(2, 11);
          texte = `$${a}\\times${b}+${c}\\times${d}$`;
          texteCorr = `$${miseEnEvidence(
            a + "\\times" + b
          )}+${miseEnEvidence(c + "\\times" + d)}=${a * b}+${c * d}=${a * b + c * d
            }$`;
          break;
        case 10:
          a = randint(2, 5);
          b = randint(2, 5);
          c = randint(2, 5);
          d = randint(2, a * b * c - 1);
          texte = `$${a}\\times${b}\\times${c}-${d}$`;
          texteCorr = `$${miseEnEvidence(
            a + "\\times" + b
          )}\\times${c}-${d}=${miseEnEvidence(a * b + "\\times" + c)}-${d}=${a * b * c - d
            }$`;
          break;
        case 11:
          a = randint(3, 11);
          b = randint(3, 11);
          d = randint(2, 11);
          c = d * randint(2, 8);
          texte = `$${a}\\times${b}-${c}\\div${d}$`;
          texteCorr = `$${miseEnEvidence(
            a + "\\times" + b
          )}-${miseEnEvidence(c + "\\div" + d)}=${a * b}-${c / d}=${a * b - c / d
            }$`;
          break;
        case 12:
          a = randint(2, 11);
          b = randint(2, 11);
          d = randint(2, 11);
          c = d * randint(2, 8);
          texte = `$${a}\\times${b}+${c}\\div${d}$`;
          texteCorr = `$${miseEnEvidence(
            a + "\\times" + b
          )}+${miseEnEvidence(c + "\\div" + d)}=${a * b}+${c / d}=${a * b + c / d
            }$`;
          break;
        case 13:
          a = randint(2, 11);
          c = randint(2, 11);
          b = c + randint(2, 11);
          texte = `$${a}\\times(${b}-${c})$`;
          texteCorr = `$${a}\\times(${miseEnEvidence(
            b + `-` + c
          )})=${a}\\times${b - c}=${a * (b - c)}$`;
          break;
        case 14:
          b = randint(11, 39);
          a = b + randint(2, 11);
          c = randint(2, 11);
          texte = `$(${a}-${b})\\times${c}$`;
          texteCorr = `$(${miseEnEvidence(a + `-` + b)})\\times${c}=${a - b
            }\\times${c}=${(a - b) * c}$`;
          break;
        case 15:
          c = randint(2, 11);
          b = randint(11, 39);
          a = b + c * randint(2, 9);
          texte = `$(${a}-${b})\\div${c}$`;
          texteCorr = `$(${miseEnEvidence(a + `-` + b)})\\div${c}=${a - b
            }\\div${c}=${(a - b) / c}$`;
          break;
        case 16:
          b = randint(2, 5);
          c = randint(2, 6);
          a = (b + c) * randint(2, 9);
          texte = `$${a}\\div(${b}+${c})$`;
          texteCorr = `$${a}\\div(${miseEnEvidence(b + `+` + c)})=${a}\\div${b + c
            }=${a / (b + c)}$`;
          break;
        case 17:
          c = randint(2, 11);
          b = randint(11, 39);
          a = b + c * randint(2, 9);
          texte = `$(${a}-${b})\\div${c}$`;
          texteCorr = `$(${miseEnEvidence(a + `-` + b)})\\div${c}=${a - b
            }\\div${c}=${(a - b) / c}$`;
          break;
        case 18:
          c = randint(11, 39);
          b = c + randint(2, 5);
          a = randint(2, 5);
          d = randint(2, 5);
          texte = `$${a}\\times(${b}-${c})\\times${d}$`;
          texteCorr = `$${a}\\times(${miseEnEvidence(
            b + `-` + c
          )})\\times${d}=${a}\\times${b - c}\\times${d}=${a * (b - c) * d}$`;
          break;
        case 19:
          d = randint(11, 39);
          c = d + randint(2, 5);
          a = randint(2, 5);
          b = randint(2, 5);
          texte = `$${a}\\times${b}\\times(${c}-${d})$`;
          texteCorr = `$${a}\\times${b}\\times(${miseEnEvidence(
            c + `-` + d
          )})=${a}\\times${b}\\times${c - d}=${a * b * (c - d)}$`;
          break;
        case 20:
          a = randint(2, 11);
          c = randint(2, 11);
          d = randint(2, 11);
          b = c * d + randint(2, 11);
          texte = `$${a}\\times(${b}-${c}\\times${d})$`;
          texteCorr = `$${a}\\times(${b}-${miseEnEvidence(
            c + `\\times` + d
          )})=${a}\\times(${miseEnEvidence(b + `-` + c * d)})=${a}\\times${b - c * d
            }=${a * (b - c * d)}$`;
          break;
        case 21:
          a = randint(2, 11);
          b = randint(2, 11);
          if (liste_des_diviseurs(a * b).length <= 2) {
          }
          let liste = liste_des_diviseurs(a * b);
          if (liste.length > 2) {
            liste.pop(); //on supprime le plus grand diviseur qui est le produit
          }
          if (liste.length > 2) {
            enleveElement(liste, liste[1]); //on supprime le plus petit diviseur (autre que 1)
          }

          let somme = choice(liste, [1]); // la somme doit être un diviseur différent de 1
          c = randint(1, somme - 1);
          d = somme - c;
          texte = `$${a}\\times${b}\\div(${c}+${d})$`;
          texteCorr = `$${a}\\times${b}\\div(${miseEnEvidence(
            c + `+` + d
          )})=${miseEnEvidence(a + "\\times" + b)}\\div${c + d}=${a * b
            }\\div${c + d}=${(a * b) / (c + d)}$`;
          break;
        case 22:
          a = randint(2, 11);
          c = randint(2, 11);
          b = c * randint(2, 5);
          d = randint(2, 6);
          texte = `$${a}\\times(${b}\\div${c}+${d})$`;
          texteCorr = `$${a}\\times(${miseEnEvidence(
            b + `\\div` + c
          )}+${d})=${a}\\times(${miseEnEvidence(
            b / c + `+` + d
          )})=${a}\\times${b / c + d}=${a * (b / c + d)}$`;
          break;
      }

      if (this.listeQuestions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte);
        this.listeCorrections.push(texteCorr);
        i++;
      }
      cpt++;
    }
    listeQuestionsToContenu(this);
  };
  this.besoinFormulaireNumerique = [
    "Type de calculs",
    3,
    "1 : Sans parenthèses\n2: Avec parenthèses\n3: Avec ou sans parenthèses",
  ];
}

