import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,arrondi,simplification_de_fraction_avec_etapes,calcul,texNombrec,miseEnEvidence,texFraction} from '../../modules/outils.js'
const Algebrite = require('algebrite')

export const titre = 'Calculer la fraction d’un nombre'

/**
 * Calculer la fracton d'un nombre divisible par le dénominateur ... ou pas.
 *
 * Par défaut la division du nombre par le dénominateur est inférieure à 11
 * @Auteur Rémi Angot + Jean-Claude Lhote
 * référence 6N33
 */
export default function Fraction_d_un_nombre() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.nbQuestions = 5;
  this.consigne = "Calculer";
  sortieHtml ? (this.spacingCorr = 3.5) : (this.spacingCorr = 2);
  sortieHtml ? (this.spacing = 2) : (this.spacing = 2);
  this.sup = true;
  this.sup2 = false;
  this.nbCols = 2;
  this.nbColsCorr = 1;

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    let liste_fractions = [
      [1, 2],
      [1, 3],
      [2, 3],
      [1, 4],
      [3, 4],
      [1, 5],
      [2, 5],
      [3, 5],
      [4, 5],
      [1, 6],
      [5, 6],
      [1, 7],
      [2, 7],
      [3, 7],
      [4, 7],
      [5, 7],
      [6, 7],
      [1, 8],
      [3, 8],
      [5, 8],
      [7, 8],
      [1, 9],
      [2, 9],
      [4, 9],
      [5, 9],
      [7, 9],
      [8, 9],
      [1, 10],
      [3, 10],
      [7, 10],
      [9, 10],
    ]; // Couples de nombres premiers entre eux

    for (
      let i = 0, a, b, k, n, j, fraction, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      fraction = choice(liste_fractions);
      a = fraction[0];
      b = fraction[1];
      k = randint(1, 11);
      j = false;
      if (this.sup) n = b * k;
      else if (randint(0, 1) == 0) n = b * k;
      else n = randint(10, b * 11);
      texte = `$${texFraction(a, b)}\\times${n}=$`;
      texteCorr = ``;
      if (a == 1) {
        // Si n * 1/b
        if (calcul(n / b - arrondi(n / b, 4)) == 0)
          texteCorr += `$${texFraction(
            a,
            miseEnEvidence(b)
          )}\\times${n}=${n}\\div${miseEnEvidence(b)}=${texNombrec(
            Algebrite.eval(n / b)
          )}$`;
        // si résultat décimal
        else
          texteCorr += `$${texFraction(a, b)}\\times${n}=${texFraction(
            n,
            b
          )}${simplification_de_fraction_avec_etapes(n, b)}$`; //si résultat non décimal
      } else {
        if (calcul(n / b - arrondi(n / b, 4)) == 0) {
          //si n/b décimal calcul (n/b)*a
          texteCorr += `$${texFraction(
            a,
            miseEnEvidence(b)
          )}\\times${n}=(${n}\\div${miseEnEvidence(
            b
          )})\\times${a}=${texNombrec(
            Algebrite.eval(n / b)
          )}\\times${a}=${texNombrec(Algebrite.eval((n / b) * a))}$<br>`;
        } else {
          if (calcul((n * a) / b - arrondi((n * a) / b, 4)) == 0) {
            // si n/b non décimal, alors on se rabat sur (n*a)/b
            texteCorr += ` $${texFraction(
              a,
              miseEnEvidence(b)
            )}\\times${n}=(${n}\\times${a})\\div${miseEnEvidence(
              b
            )}=${Algebrite.eval(n * a)}\\div${miseEnEvidence(
              b
            )}=${texNombrec(Algebrite.eval((n / b) * a))}$<br>`;
          } else {
            // si autre méthode et résultat fractionnaire calcul (n*a)/b
            texteCorr += ` $${texFraction(
              a,
              miseEnEvidence(b)
            )}\\times${n}=(${n}\\times${a})\\div${miseEnEvidence(
              b
            )}=${Algebrite.eval(n * a)}\\div${miseEnEvidence(
              b
            )}=${texFraction(n * a, miseEnEvidence(b))}$<br>`;
          }
          j = true;
        }
        if (
          calcul((n * a) / b - arrondi((n * a) / b, 4)) == 0 &&
          this.sup2 &&
          !j
        ) {
          // Si autres méthodes et si (a*n)/b décimal calcul (n*a)/b
          texteCorr += ` $${texFraction(
            a,
            miseEnEvidence(b)
          )}\\times${n}=(${n}\\times${a})\\div${miseEnEvidence(
            b
          )}=${Algebrite.eval(n * a)}\\div${miseEnEvidence(b)}=${texNombrec(
            Algebrite.eval((n / b) * a)
          )}$<br>`;
        } else {
          // si autre méthode et résultat fractionnaire calcul (n*a)/b
          if (this.sup2 && !j)
            texteCorr += ` $${texFraction(
              a,
              miseEnEvidence(b)
            )}\\times${n}=(${n}\\times${a})\\div${miseEnEvidence(
              b
            )}=${Algebrite.eval(n * a)}\\div${miseEnEvidence(
              b
            )}=${texFraction(n * a, miseEnEvidence(b))}$<br>`;
        }
        // si autre méthode et a/b décimal calcul (a/b)*n
        if ((b == 2 || b == 4 || b == 5 || b == 8 || b == 10) && this.sup2)
          texteCorr += ` $${texFraction(
            a,
            miseEnEvidence(b)
          )}\\times${n}=(${a}\\div${miseEnEvidence(
            b
          )})\\times${n}=${texNombrec(
            Algebrite.eval(a / b)
          )}\\times${n}=${texNombrec(Algebrite.eval((n / b) * a))}$`;
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
  this.besoinFormulaireCaseACocher = ["Forcer résultat entier", true];
  this.besoin_formulaire2_case_a_cocher = ["Plusieurs méthodes", false];
}

