import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,ecriture_parenthese_si_negatif,abs,pgcd,tex_fraction_signe,obtenir_liste_fractions_irreductibles,tex_fraction} from "/modules/outils.js"
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
  this.titre = "Diviser des fractions";
  this.consigne = "Calculer et donner le résultat sous forme irréductible";
  this.spacing = 2;
  this.spacing_corr = 2;
  this.nb_questions = 5;
  this.nb_cols_corr = 1;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let liste_fractions = obtenir_liste_fractions_irreductibles();

    let type_de_questions_disponibles;
    type_de_questions_disponibles = [parseInt(this.sup)];
    let nombre_de_signe_moins;
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
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
      texte_corr,
      type_de_questions,
      cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      type_de_questions = liste_type_de_questions[i];
      ab = choice(liste_fractions);
      cd = choice(liste_fractions);
      a = ab[0];
      b = ab[1];
      c = cd[0];
      d = cd[1];

      p = pgcd(a * d, b * c);

      switch (type_de_questions) {
        //	case 0 : // entier * fraction (tout positif)
        //		texte=`$${tex_fraction(a,1)}\\div${tex_fraction(c,d)}=$`;
        //		if (pgcd(a*d,c)==1) {
        //			texte_corr= `$${tex_fraction(a,1)}\\div${tex_fraction(c,d)}=${tex_fraction(a,1)}\\times${tex_fraction(d,c)}=\\dfrac{${a}}{1}\\times${tex_fraction(d,c)}=${tex_fraction(a +'\\times'+d,'1\\times'+c)}=${tex_fraction(a*d,c)}$`
        //		}
        //		else {
        //			texte_corr= `$${tex_fraction(a,1)}\\div${tex_fraction(c,d)}=${tex_fraction(a,1)}\\times${tex_fraction(d,c)}=${tex_fraction(a*d,c)}=${tex_fraction_reduite(a*d,c)}$`
        //		}
        //		break
        //
        case 1: // fraction * fraction tout positif
          texte = `$${tex_fraction(a, b)}\\div${tex_fraction(c, d)}=$`;
          if (p == 1) {
            texte_corr = `$${tex_fraction(a, b)}\\div${tex_fraction(
              c,
              d
            )}=${tex_fraction(a, b)}\\times${tex_fraction(d, c)}=${tex_fraction(
              a + "\\times" + d,
              b + "\\times" + c
            )}=${tex_fraction(a * d, b * c)}$`;
          } else {
            texte_corr = `$${tex_fraction(a, b)}\\div${tex_fraction(
              c,
              d
            )}=${tex_fraction(a, b)}\\times${tex_fraction(d, c)}=${tex_fraction(
              a + "\\times" + d,
              b + "\\times" + c
            )}=${tex_fraction(a * d, b * c)}=${tex_fraction(
              (a * d) / p + "\\times\\cancel{" + p + "}",
              (b * c) / p + "\\times\\cancel{" + p + "}"
            )}=${tex_fraction((a * d) / p, (b * c) / p)}$`;
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
          texte = `$${tex_fraction(a, b)}\\div${tex_fraction(c, d)}=$`;
          texte_corr = `$${tex_fraction(a, b)}\\div${tex_fraction(c, d)}$`;
          a = abs(a);
          b = abs(b);
          c = abs(c);
          d = abs(d);
          p = pgcd(a * d, b * c);
          texte_corr += `$=${signe}${tex_fraction(a, b)}\\times${tex_fraction(
            d,
            c
          )}$`;
          texte_corr += `$=${signe}${tex_fraction(
            a + "\\times" + ecriture_parenthese_si_negatif(d),
            b + "\\times" + ecriture_parenthese_si_negatif(c)
          )}$`;
          if (p == 1) {
            texte_corr += `$=${signe}${tex_fraction_signe(a * d, b * c)}$`;
          } else {
            texte_corr += `$=${signe}${tex_fraction(a * d, b * c)}$`;
            if (a * d != b * c) {
              texte_corr += `$=${signe}${tex_fraction(
                (a * d) / p + "\\times\\cancel{" + p + "}",
                (b * c) / p + "\\times\\cancel{" + p + "}"
              )}$`;
              texte_corr += `$=${signe}${tex_fraction(
                (a * d) / p,
                (b * c) / p
              )}$`;
            } else {
              texte_corr += `$=${signe}1$`;
            }
          }
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
  this.besoin_formulaire_numerique = [
    "Niveau de difficulté",
    2,
    "1 : Fractions à numérateur et dénominateur positifs \n 2 : Fractions à numérateur et dénominateur relatifs",
  ];
}

