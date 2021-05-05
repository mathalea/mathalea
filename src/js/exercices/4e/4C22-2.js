import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,combinaisonListes,ecritureParentheseSiNegatif,abs,pgcd,texFractionSigne,obtenir_liste_fractions_irreductibles,texFraction} from '../../modules/outils.js'
export const titre = 'Diviser des fractions'

/**
 * Calcul du quotient de deux fractions. Paramétrages possibles :
 * * 1 : Nombres positifs exclusivement
 * * 2 : nombres relatifs
 * @auteur Jean-Claude Lhote
 * 4C22-2
 */
export default function Exercice_diviser_fractions() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = 1; // Avec ou sans relatifs
  this.titre = titre;
  this.consigne = "Calculer et donner le résultat sous forme irréductible";
  this.spacing = 2;
  this.spacingCorr = 2;
  this.nbQuestions = 5;
  this.nbColsCorr = 1;

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    let liste_fractions = obtenir_liste_fractions_irreductibles();

    let type_de_questions_disponibles;
    type_de_questions_disponibles = [parseInt(this.sup)];
    let nombre_de_signe_moins;
    let listeTypeDeQuestions = combinaisonListes(
      type_de_questions_disponibles,
      this.nbQuestions
    );
    for (
      let i = 0,
      ab,
      cd,
      a,
      b,
      c,
      d,
      p,
      signe,
      texte,
      texteCorr,
      type_de_questions,
      cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      type_de_questions = listeTypeDeQuestions[i];
      ab = choice(liste_fractions);
      cd = choice(liste_fractions);
      a = ab[0];
      b = ab[1];
      c = cd[0];
      d = cd[1];

      p = pgcd(a * d, b * c);

      switch (type_de_questions) {
        //	case 0 : // entier * fraction (tout positif)
        //		texte=`$${texFraction(a,1)}\\div${texFraction(c,d)}=$`;
        //		if (pgcd(a*d,c)==1) {
        //			texteCorr= `$${texFraction(a,1)}\\div${texFraction(c,d)}=${texFraction(a,1)}\\times${texFraction(d,c)}=\\dfrac{${a}}{1}\\times${texFraction(d,c)}=${texFraction(a +'\\times'+d,'1\\times'+c)}=${texFraction(a*d,c)}$`
        //		}
        //		else {
        //			texteCorr= `$${texFraction(a,1)}\\div${texFraction(c,d)}=${texFraction(a,1)}\\times${texFraction(d,c)}=${texFraction(a*d,c)}=${texFractionReduite(a*d,c)}$`
        //		}
        //		break
        //
        case 1: // fraction * fraction tout positif
          texte = `$${texFraction(a, b)}\\div${texFraction(c, d)}=$`;
          if (p == 1) {
            texteCorr = `$${texFraction(a, b)}\\div${texFraction(
              c,
              d
            )}=${texFraction(a, b)}\\times${texFraction(d, c)}=${texFraction(
              a + "\\times" + d,
              b + "\\times" + c
            )}=${texFraction(a * d, b * c)}$`;
          } else {
            texteCorr = `$${texFraction(a, b)}\\div${texFraction(
              c,
              d
            )}=${texFraction(a, b)}\\times${texFraction(d, c)}=${texFraction(
              a + "\\times" + d,
              b + "\\times" + c
            )}=${texFraction(a * d, b * c)}=${texFraction(
              (a * d) / p + "\\times\\cancel{" + p + "}",
              (b * c) / p + "\\times\\cancel{" + p + "}"
            )}=${texFraction((a * d) / p, (b * c) / p)}$`;
          }
          break;

        case 2:
          a = a * randint(-1, 1, [0]);
          b = b * randint(-1, 1, [0]);
          c = c * randint(-1, 1, [0]);
          d = d * randint(-1, 1, [0]);
          nombre_de_signe_moins = (a < 0) + (b < 0) + (c < 0) + (d < 0);
          if (Math.pow(-1, nombre_de_signe_moins) == 1) {
            signe = "";
          } else {
            signe = "-";
          }
          texte = `$${texFraction(a, b)}\\div${texFraction(c, d)}=$`;
          texteCorr = `$${texFraction(a, b)}\\div${texFraction(c, d)}$`;
          a = abs(a);
          b = abs(b);
          c = abs(c);
          d = abs(d);
          p = pgcd(a * d, b * c);
          texteCorr += `$=${signe}${texFraction(a, b)}\\times${texFraction(
            d,
            c
          )}$`;
          texteCorr += `$=${signe}${texFraction(
            a + "\\times" + ecritureParentheseSiNegatif(d),
            b + "\\times" + ecritureParentheseSiNegatif(c)
          )}$`;
          if (p == 1) {
            texteCorr += `$=${signe}${texFractionSigne(a * d, b * c)}$`;
          } else {
            texteCorr += `$=${signe}${texFraction(a * d, b * c)}$`;
            if (a * d != b * c) {
              texteCorr += `$=${signe}${texFraction(
                (a * d) / p + "\\times\\cancel{" + p + "}",
                (b * c) / p + "\\times\\cancel{" + p + "}"
              )}$`;
              texteCorr += `$=${signe}${texFraction(
                (a * d) / p,
                (b * c) / p
              )}$`;
            } else {
              texteCorr += `$=${signe}1$`;
            }
          }
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
    listeQuestionsToContenu(this); //Espacement de 2 em entre chaque questions.
  };
  this.besoinFormulaireNumerique = [
    "Niveau de difficulté",
    2,
    "1 : Fractions à numérateur et dénominateur positifs \n 2 : Fractions à numérateur et dénominateur relatifs",
  ];
}

