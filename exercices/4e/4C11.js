import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,enleve_element,choice,range1,combinaison_listes,ecriture_algebrique,ecriture_parenthese_si_negatif,mise_en_evidence,liste_des_diviseurs} from "/modules/outils.js"
/**
 * Plusieurs type de calcul avec des entiers.
 *
 * Sans parenthèses :
 * * a+b*c
 * * a+b÷c
 * * a/b*c
 * * a*b÷c
 * * a*b+c
 * * a-b+c
 * * a+b+c*d
 * * a*b+c*d
 * * a*b*c+d
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
 * * a-(b+c)
 * * (a+b+c)*d
 * @Auteur Rémi Angot
 * 4C11
 */
export default function Priorites_et_relatifs() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Calculs utilisant les priorités opératoires";
  this.consigne = "Calculer";
  this.nb_questions = 5;
  this.nb_cols = 2;
  this.nb_cols_corr = 1;
  this.sup = 3;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let liste_questions_disponibles
    if (this.sup == 1) {
      liste_questions_disponibles = range1(11);
    } else if (this.sup == 2) {
      liste_questions_disponibles = range1(20, range1(11));
    } else {
      liste_questions_disponibles = range1(20);
    }
    let liste_type_de_questions = combinaison_listes(
      liste_questions_disponibles,
      this.nb_questions
    );
    for (
      let i = 0, texte, texte_corr, a, b, c, d, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      switch (liste_type_de_questions[i]) {
        case 1: //a+b*c
          a = randint(2, 11) * choice([-1, 1]);
          b = randint(2, 11) * choice([-1, 1]);
          c = randint(2, 11) * choice([-1, 1]);
          while (a > 0 && b > 0 && c > 0) {
            a = randint(2, 11) * choice([-1, 1]);
            b = randint(2, 11) * choice([-1, 1]);
            c = randint(2, 11) * choice([-1, 1]);
          }
          texte = `$${a}${ecriture_algebrique(b)}\\times${ecriture_parenthese_si_negatif(c)}$`;
          texte_corr = `$${a}${mise_en_evidence('~' + ecriture_algebrique(b) + "\\times" + ecriture_parenthese_si_negatif(c))}=${a}${ecriture_algebrique(b * c)
            }=${a + b * c}$`;
          break;
        case 2: //a+b/c
          a = randint(2, 11) * choice([-1, 1]);
          c = randint(2, 11) * choice([-1, 1]);
          b = c * randint(2, 11) * choice([-1, 1]);
          while (a > 0 && b > 0 && c > 0) {
            a = randint(2, 11) * choice([-1, 1]);
            c = randint(2, 11) * choice([-1, 1]);
            b = c * randint(2, 11) * choice([-1, 1]);
          }
          texte = `$${a}${ecriture_algebrique(b)}\\div${ecriture_parenthese_si_negatif(c)}$`;
          texte_corr = `$${a}${mise_en_evidence('~' + ecriture_algebrique(b) + "\\div" + ecriture_parenthese_si_negatif(c))}=${a}${ecriture_algebrique(b / c)
            }=${a + b / c}$`;
          break;
        case 3: //a/b*c
          b = randint(2, 11) * choice([-1, 1]);
          c = randint(2, 11) * choice([-1, 1]);
          a = b * randint(2, 11) * choice([-1, 1]);
          while (a > 0 && b > 0 && c > 0) {
            b = randint(2, 11) * choice([-1, 1]);
            c = randint(2, 11) * choice([-1, 1]);
            a = b * randint(2, 11) * choice([-1, 1]);
          }
          texte = `$${a}\\div${ecriture_parenthese_si_negatif(b)}\\times${ecriture_parenthese_si_negatif(c)}$`;
          texte_corr = `$${mise_en_evidence(a + "\\div" + ecriture_parenthese_si_negatif(b))}\\times${ecriture_parenthese_si_negatif(c)}=${a / b
            }\\times${ecriture_parenthese_si_negatif(c)}=${(a / b) * c}$`;
          break;
        case 4: // a*b/c
          if (choice([true, false])) {
            //a est un multiple de c
            c = randint(2, 6) * choice([-1, 1]);
            a = c * randint(2, 5) * choice([-1, 1]);
            b = randint(2, 6) * choice([-1, 1]);
            while (a > 0 && b > 0 && c > 0) {
              c = randint(2, 6) * choice([-1, 1]);
              a = c * randint(2, 5) * choice([-1, 1]);
              b = randint(2, 6) * choice([-1, 1]);
            }
          } else {
            // b est un multiple de c
            c = randint(2, 6) * choice([-1, 1]);
            b = c * randint(2, 5) * choice([-1, 1]);
            a = randint(2, 6) * choice([-1, 1]);
            while (a > 0 && b > 0 && c > 0) {
              c = randint(2, 6) * choice([-1, 1]);
              b = c * randint(2, 5) * choice([-1, 1]);
              a = randint(2, 6) * choice([-1, 1]);
            }
          }
          texte = `$${a}\\times${ecriture_parenthese_si_negatif(b)}\\div${ecriture_parenthese_si_negatif(c)}$`;
          texte_corr = `$${mise_en_evidence(a + "\\times" + ecriture_parenthese_si_negatif(b))}\\div${ecriture_parenthese_si_negatif(c)}=${a * b
            }\\div${ecriture_parenthese_si_negatif(c)}=${(a * b) / c}$`;
          break;
        case 5: //a*b+c
          a = randint(2, 11) * choice([-1, 1]);
          b = randint(2, 11) * choice([-1, 1]);
          c = randint(2, 11) * choice([-1, 1]);
          while (a > 0 && b > 0 && c > 0) {
            a = randint(2, 11) * choice([-1, 1]);
            b = randint(2, 11) * choice([-1, 1]);
            c = randint(2, 11) * choice([-1, 1]);
          }
          texte = `$${a}\\times${ecriture_parenthese_si_negatif(b)}${ecriture_algebrique(c)}$`;
          texte_corr = `$${mise_en_evidence(a + "\\times" + ecriture_parenthese_si_negatif(b))}${ecriture_algebrique(c)}=${a * b
            }${ecriture_algebrique(c)}=${a * b + c}$`;
          break;
        case 6: //a-b+c
          a = randint(2, 11) * choice([-1, 1]);
          b = randint(2, 11) * choice([-1, 1]);
          c = randint(2, 11) * choice([-1, 1]);
          while (a > 0 && b > 0 && c > 0) {
            a = randint(2, 11) * choice([-1, 1]);
            b = randint(2, 11) * choice([-1, 1]);
            c = randint(2, 11) * choice([-1, 1]);
          }
          texte = `$${a}-(${ecriture_algebrique(b)})${ecriture_algebrique(c)}$`;
          texte_corr = `$${a}${mise_en_evidence(ecriture_algebrique(-b))}${ecriture_algebrique(c)}=${a - b}${ecriture_algebrique(c)}=${a - b + c
            }$`;
          break;
        case 7: //a+b+c*d
          a = randint(2, 20) * choice([-1, 1]);
          b = randint(2, 20) * choice([-1, 1]);
          c = randint(2, 11) * choice([-1, 1]);
          d = randint(2, 11) * choice([-1, 1]);
          while (a > 0 && b > 0 && c > 0 && d > 0) {
            a = randint(2, 20) * choice([-1, 1]);
            b = randint(2, 20) * choice([-1, 1]);
            c = randint(2, 11) * choice([-1, 1]);
            d = randint(2, 11) * choice([-1, 1]);
          }
          texte = `$${a}${ecriture_algebrique(b)}${ecriture_algebrique(c)}\\times${ecriture_parenthese_si_negatif(d)}$`;
          texte_corr = `$${a}${ecriture_algebrique(b)}${mise_en_evidence(
            ecriture_algebrique(c) + "\\times" + ecriture_parenthese_si_negatif(d)
          )}=${a}${ecriture_algebrique(b)}${ecriture_algebrique(c * d)}=${a + b + c * d}$`;
          break;
        case 8: //a*b+c*d
          a = randint(2, 11) * choice([-1, 1]);
          b = randint(2, 11) * choice([-1, 1]);
          c = randint(2, 11) * choice([-1, 1]);
          d = randint(2, 11) * choice([-1, 1]);
          while (a > 0 && b > 0 && c > 0 && d > 0) {
            a = randint(2, 20) * choice([-1, 1]);
            b = randint(2, 20) * choice([-1, 1]);
            c = randint(2, 11) * choice([-1, 1]);
            d = randint(2, 11) * choice([-1, 1]);
          }
          texte = `$${a}\\times${ecriture_parenthese_si_negatif(b)}${ecriture_algebrique(c)}\\times${ecriture_parenthese_si_negatif(d)}$`;
          texte_corr = `$${a + mise_en_evidence("\\times") + ecriture_parenthese_si_negatif(b)
            }${ecriture_algebrique(c) + mise_en_evidence("\\times") + ecriture_parenthese_si_negatif(d)}=${a * b}${ecriture_algebrique(c * d)}=${a * b + c * d
            }$`;
          break;
        case 9:  //a*b*c+d
          a = randint(2, 5) * choice([-1, 1]);
          b = randint(2, 5) * choice([-1, 1]);
          c = randint(2, 5) * choice([-1, 1]);
          d = randint(2, 11) * choice([-1, 1]);
          while (a > 0 && b > 0 && c > 0 && d > 0) {
            a = randint(2, 5) * choice([-1, 1]);
            b = randint(2, 5) * choice([-1, 1]);
            c = randint(2, 5) * choice([-1, 1]);
            d = randint(2, 11) * choice([-1, 1]);
          }
          texte = `$${a}\\times${ecriture_parenthese_si_negatif(b)}\\times${ecriture_parenthese_si_negatif(c)}${ecriture_algebrique(d)}$`;
          texte_corr = `$${mise_en_evidence(
            a + "\\times" + ecriture_parenthese_si_negatif(b)
          )}\\times${ecriture_parenthese_si_negatif(c)}${ecriture_algebrique(d)}=${mise_en_evidence(a * b + "\\times" + ecriture_parenthese_si_negatif(c))}${ecriture_algebrique(d)}
          =${a * b * c}${ecriture_algebrique(d)}
          =${a * b * c + d}$`;
          break;
        case 10:
          a = randint(2, 11) * choice([-1, 1]);
          b = randint(2, 11) * choice([-1, 1]);
          d = randint(2, 11) * choice([-1, 1]);
          c = d * randint(2, 8) * choice([-1, 1]);
          texte = `$${a}\\times${ecriture_parenthese_si_negatif(b)}${ecriture_algebrique(c)}\\div${ecriture_parenthese_si_negatif(d)}$`;
          texte_corr = `$${a + mise_en_evidence("\\times") + ecriture_parenthese_si_negatif(b)
            + ecriture_algebrique(c) + mise_en_evidence("\\div") + ecriture_parenthese_si_negatif(d)}=${a * b}${ecriture_algebrique(c / d)}=${a * b + c / d
            }$`;
          break;
        case 11: // a*(b+c)
          a = randint(2, 11) * choice([-1, 1]);
          b = randint(1, 11) * choice([-1, 1]);
          c = randint(1, 11) * choice([-1, 1]);
          while (a > 0 && b > 0 && c > 0) {
            a = randint(2, 11) * choice([-1, 1]);
            b = randint(1, 11) * choice([-1, 1]);
            c = randint(1, 11) * choice([-1, 1]);
          }
          texte = `$${a}\\times(${b}${ecriture_algebrique(c)})$`;
          texte_corr = `$${a}\\times(${mise_en_evidence(b + ecriture_algebrique(c))})=${a}\\times${ecriture_parenthese_si_negatif(b + c)}=${a * (b + c)}$`;
          break;
        case 12: // (a+b)*c
          a = randint(1, 11) * choice([-1, 1]);
          b = randint(1, 11) * choice([-1, 1]);
          c = randint(2, 11) * choice([-1, 1]);
          while (a > 0 && b > 0 && c > 0) {
            a = randint(1, 11) * choice([-1, 1]);
            b = randint(1, 11) * choice([-1, 1]);
            c = randint(2, 11) * choice([-1, 1]);
          }
          texte = `$(${a}${ecriture_algebrique(b)})\\times${ecriture_parenthese_si_negatif(c)}$`;
          texte_corr = `$(${mise_en_evidence(a + ecriture_algebrique(b))})\\times${ecriture_parenthese_si_negatif(c)}=${a + b}\\times${ecriture_parenthese_si_negatif(c)}=${(a + b) * c}$`;
          break;
        case 13: // (a+b)/c
          c = randint(2, 11) * choice([-1, 1]);
          b = randint(11, 39) * choice([-1, 1]);
          a = c * randint(2, 9) * [choice([-1, 1])] - b;
          while (a > 0 && b > 0 && c > 0) {
            c = randint(2, 11) * choice([-1, 1]);
            b = randint(11, 39) * choice([-1, 1]);
            a = c * randint(2, 9) * [choice([-1, 1])] - b;
          }
          texte = `$(${a}${ecriture_algebrique(b)})\\div${ecriture_parenthese_si_negatif(c)}$`;
          texte_corr = `$(${mise_en_evidence(a + ecriture_algebrique(b))})\\div${ecriture_parenthese_si_negatif(c)}=${a + b
            }\\div${ecriture_parenthese_si_negatif(c)}=${(a + b) / c}$`;
          break;
        case 14: // a/(b+c)
          b = randint(-5, 5, [-1, 0, 1])
          c = randint(-6, 6, [-1, 0, 1, -b])
          a = (b + c) * randint(2, 9) * choice([-1, 1]);
          while (a > 0 && b > 0 && c > 0) {
            b = randint(-5, 5, [-1, 0, 1])
            c = randint(-6, 6, [-1, 0, 1, -b])
            a = (b + c) * randint(2, 9) * choice([-1, 1]);
          }
          texte = `$${a}\\div(${b}${ecriture_algebrique(c)})$`;
          texte_corr = `$${a}\\div(${mise_en_evidence(b + ecriture_algebrique(c))})=${a}\\div${ecriture_parenthese_si_negatif(b + c)}=${a / (b + c)}$`;
          break;
        case 15: // a(b+c)*d
          c = randint(11, 39) * choice([-1, 1]);
          b = randint(2, 5) * choice([-1, 1]) - c;
          a = randint(2, 5) * choice([-1, 1]);
          d = randint(2, 5) * choice([-1, 1]);
          while (a > 0 && b > 0 && c > 0 && d > 0) {
            c = randint(11, 39) * choice([-1, 1]);
            b = (randint(2, 5) - c) * choice([-1, 1]);
            a = randint(2, 5) * choice([-1, 1]);
            d = randint(2, 5) * choice([-1, 1]);
          }
          texte = `$${a}\\times(${b}${ecriture_algebrique(c)})\\times${ecriture_parenthese_si_negatif(d)}$`;
          texte_corr = `$${a}\\times(${mise_en_evidence(b + ecriture_algebrique(c))})\\times${ecriture_parenthese_si_negatif(d)}=${a}\\times${ecriture_parenthese_si_negatif(b + c)}\\times${ecriture_parenthese_si_negatif(d)}=${a * (b + c) * d}$`;
          break;
        case 16: //a*b*(c+d)
          d = randint(11, 39) * choice([-1, 1]);
          c = randint(2, 5) * choice([-1, 1]) - d;
          a = randint(2, 5) * choice([-1, 1]);
          b = randint(2, 5) * choice([-1, 1]);
          while (a > 0 && b > 0 && c > 0 && d > 0) {
            d = randint(11, 39) * choice([-1, 1]);
            c = randint(2, 5) * choice([-1, 1]) - d;
            a = randint(2, 5) * choice([-1, 1]);
            b = randint(2, 5) * choice([-1, 1]);
          }
          texte = `$${a}\\times${ecriture_parenthese_si_negatif(b)}\\times(${c}${ecriture_algebrique(d)})$`;
          texte_corr = `$${a}\\times${ecriture_parenthese_si_negatif(b)}\\times(${mise_en_evidence(
            c + ecriture_algebrique(d))})=${a}\\times${ecriture_parenthese_si_negatif(b)}\\times${ecriture_parenthese_si_negatif(c + d)}=${a * b * (c + d)}$`;
          break;
        case 17: // a*(b/c+d)
          a = randint(2, 11) * choice([-1, 1]);
          c = randint(2, 11) * choice([-1, 1]);
          b = c * randint(2, 5) * choice([-1, 1]);
          d = randint(2, 6) * choice([-1, 1]);
          texte = `$${a}\\times(${b}\\div${ecriture_parenthese_si_negatif(c)}${ecriture_algebrique(d)})$`;
          texte_corr = `$${a}\\times(${mise_en_evidence(
            b + `\\div` + ecriture_parenthese_si_negatif(c)
          )}${ecriture_algebrique(d)})=${a}\\times(${mise_en_evidence(
            b / c + ecriture_algebrique(d)
          )})=${a}\\times${ecriture_parenthese_si_negatif(b / c + d)}=${a * (b / c + d)}$`;
          break;
        case 18: //a*b/(c+d)
          a = randint(2, 11);
          b = randint(2, 11);
          while (liste_des_diviseurs(a * b).length < 5) {
            a = randint(2, 11);
            b = randint(2, 11);
          }
          let liste = liste_des_diviseurs(a * b);
          if (liste.length > 2) {
            liste.pop(); //on supprime le plus grand diviseur qui est le produit
            enleve_element(liste, a); //on supprime a
            enleve_element(liste, b); //on supprime b

          }
          let somme = choice(liste, [1]) * choice([-1, 1]); // la somme doit être un diviseur différent de 1
          c = randint(-30, 30, [0]);
          d = somme - c;

          while (a > 0 && b > 0 && c > 0 && d > 0) {
            a *= choice([-1, 1]);
            b *= choice([-1, 1]);
          }
          texte = `$${a}\\times${ecriture_parenthese_si_negatif(b)}\\div(${c}${ecriture_algebrique(d)})$`;
          texte_corr = `$${a}\\times${ecriture_parenthese_si_negatif(b)}\\div(${mise_en_evidence(
            c + ecriture_algebrique(d))})=${mise_en_evidence(a + "\\times" + ecriture_parenthese_si_negatif(b))}\\div${ecriture_parenthese_si_negatif(c + d)}=${a * b
            }\\div${ecriture_parenthese_si_negatif(c + d)}=${(a * b) / (c + d)}$`;
          break;
        case 19: // a-(b+c)
          a = randint(1, 9) * choice([-1, 1]);
          b = randint(1, 9) * choice([-1, 1]);
          c = randint(1, 9) * choice([-1, 1]);
          while (a > 0 && b > 0 && c > 0) {
            a = randint(1, 9) * choice([-1, 1]);
            b = randint(1, 9) * choice([-1, 1]);
            c = randint(1, 9) * choice([-1, 1]);
          }
          texte = `$${a}-(${b}${ecriture_algebrique(c)})$`;
          texte_corr = `$${a}-(${mise_en_evidence(b + ecriture_algebrique(c))})=${a}-(${ecriture_algebrique(b + c)})=${a + ecriture_algebrique(-b - c)}=${a - b - c}$`;
          break;
        case 20: // (a+b+c)*d
          a = randint(1, 9) * choice([-1, 1]);
          b = randint(1, 9) * choice([-1, 1]);
          c = randint(1, 9) * choice([-1, 1]);
          d = randint(2, 5) * choice([-1, 1])
          while (a > 0 && b > 0 && c > 0) {
            a = randint(1, 9) * choice([-1, 1]);
            b = randint(1, 9) * choice([-1, 1]);
            c = randint(1, 9) * choice([-1, 1]);
          }
          texte = `$(${a + ecriture_algebrique(b) + ecriture_algebrique(c)})\\times${ecriture_parenthese_si_negatif(d)}$`;
          texte_corr = `$(${mise_en_evidence(a + ecriture_algebrique(b) + ecriture_algebrique(c))})\\times${ecriture_parenthese_si_negatif(d)}=${a + b + c}\\times${ecriture_parenthese_si_negatif(d)}=${(a + b + c) * d} $`;
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
    "Type de calculs",
    3,
    "1 : Sans opérations entre parenthèses\n2: Avec des opérations entre parenthèses\n3: Avec ou sans opérations entre parenthèses",
  ];
}

