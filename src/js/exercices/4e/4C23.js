import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,combinaisonListes,abs,pgcd,produitDeDeuxFractions,simplificationDeFractionAvecEtapes,miseEnEvidence,texFractionSigne,obtenir_liste_fractions_irreductibles,obtenirListeFractionsIrreductiblesFaciles,texFraction,ppcm} from '../../modules/outils.js'
export const titre = 'Fractions et priorités opératoires'

/**
 * * Calcul fractionnaire : somme d'une fraction et du produit de deux autres fractions. Paramétrages possibles :
 * 1 : Calcul avec nombres positifs sans piège de priorité
 * * 2 : Calcul avec nombres positifs avec piège
 * * 3 : Calcul avec nombres relatifs
 * @auteur Jean-Claude Lhote
 * 4C23
 */
export default function Exercice_additionner_fraction_produit() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = 1; // Avec ou sans relatifs
  this.titre = titre;
  this.consigne = "Calculer et donner le résultat sous forme irréductible";
  this.spacing = 2;
  this.spacingCorr = 2;
  this.nbQuestions = 5;
  this.nbColsCorr = 1;
  this.correctionDetailleeDisponible=true
  this.correctionDetaillee=true

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles;
    let liste_fractions = obtenir_liste_fractions_irreductibles();
    let liste_fractions_faciles = obtenirListeFractionsIrreductiblesFaciles();
    let nombre_de_signe_moins;
    if (this.sup == 1)  {
      type_de_questions_disponibles = [1, 2, 3, 4];
    } // fractions faciles, relatifs
    else if (this.sup == 2)  {
      type_de_questions_disponibles = [1, 2, 3, 2];
    } // 1*nombre entier,3*fraction (pas de négatifs)
    else if (this.sup == 3) {
      type_de_questions_disponibles = [3, 3, 4, 4];
    } // fractions, 2*positifs, 2*relatifs
    else {
      type_de_questions_disponibles = [4];
    }

    let listeTypeDeQuestions = combinaisonListes(
      type_de_questions_disponibles,
      this.nbQuestions
    );
    for (
      let i = 0,
      ab,
      cd,
      ef,
      a,
      b,
      c,
      d,
      e,
      f,
      p,
      k1,
      k2,
      signe1,
      signe2,
      texte,
      texteCorr,
      produit=[],
      type_de_questions,
      cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      type_de_questions = listeTypeDeQuestions[i];
      if (this.sup==1) {ab = choice(liste_fractions_faciles);cd = choice(liste_fractions_faciles);ef = choice(liste_fractions_faciles);}
      else {ab = choice(liste_fractions);cd = choice(liste_fractions);ef = choice(liste_fractions);}

      a = ab[0];
      b = ab[1];
      c = cd[0];
      d = cd[1];
      e = ef[0];
      f = ef[1];
      switch (type_de_questions) {
        case 1: // sans piège fraction1 + fraction2 x fraction3 (tout positif)
          texte = `$${texFraction(a, b)}+${texFraction(c,d)}\\times${texFraction(e, f)}$`;

          texteCorr = `$${texFraction(a, b)}+${texFraction(c,d)}\\times${texFraction(e, f)}$`;
          produit=produitDeDeuxFractions(c,d,e,f)
          if (this.correctionDetaillee) {
          texteCorr += `$=${texFraction(a, b)}+${texFraction(c + "\\times" + e,d + "\\times" + f)}$`;
          texteCorr += `$=${texFraction(a, b)}+${texFraction(c * e,d * f)}$`;
      }
      else {
        texteCorr += `$=${texFraction(a, b)}+${produit[1]}$`;
        texteCorr += `$=${texFraction(a, b)}+${produit[0]}$`;
      }
          // faut-il simplifier c*e/d*f
          if (!this.correctionDetaillee) {
            [c,d,e,f]=produit[2]
          }
          p = pgcd(c * e, d * f);
          if (p != 1 && ppcm(b, d * f) > ppcm(b, (d * f) / p)) {
            texteCorr += `$=${texFraction(a, b)}+${texFraction((e * c) / p + "\\times\\cancel{" + p + "}",(f * d) / p + "\\times\\cancel{" + p + "}"
            )}$`;
            c = (e * c) / p;
            d = (f * d) / p;
          } else {
            c = e * c;
            d = f * d;
          }
          p = ppcm(b, d); // p = dénominateur commun
          k1 = p / b;
          k2 = p / d;
          if (k1 != 1) {
            texteCorr += `$=${texFraction(
              a + miseEnEvidence("\\times" + k1),
              b + miseEnEvidence("\\times" + k1)
            )}$`;
          } else { if (k2!=1){
            texteCorr += `$=${texFraction(a, b)}$`;
          }}
          if (k2 != 1) {
            texteCorr += `$+${texFraction(
              c + miseEnEvidence("\\times" + k2),
              d + miseEnEvidence("\\times" + k2)
            )}$`;
          } else { if (k1!=1) {
            texteCorr += `$+${texFraction(c, d)}$`;
          }}

          texteCorr += `$=${texFraction(a * k1, p)}+${texFraction(c * k2,p)}$`;
          e = a * k1 + c * k2;
          f = p;

          texteCorr += `$=${texFraction(e, f)}${simplificationDeFractionAvecEtapes(e, f)}$`;
  /*
          p = pgcd(e, f);
          // faut-il simplifier e/f
          if (p != 1) {
            texteCorr += `$=${texFraction(
              e / p + "\\times\\cancel{" + p + "}",
              f / p + "\\times\\cancel{" + p + "}"
            )}$`;
            texteCorr += `$=${texFractionReduite(e / p, f / p)}$`;
          }
*/
          break;


        case 2: // sans piège fraction2 x fraction3 + fraction1  (tout positif)
        texte = `$${texFraction(c,d)}\\times${texFraction(e, f)}+${texFraction(a, b)}$`;
        produit=produitDeDeuxFractions(c,d,e,f)
        texteCorr = `$${texFraction(c,d)}\\times${texFraction(e, f)}+${texFraction(a, b)}$`;
        if (this.correctionDetaillee) {
        texteCorr += `$=${texFraction(c + "\\times" + e,d + "\\times" + f)}+${texFraction(a, b)}$`;
        texteCorr += `$=${texFraction(c * e,d * f)}+${texFraction(a, b)}$`;
        }
        else {
          texteCorr += `$=${produit[1]}+${texFraction(a, b)}$`;
          texteCorr += `$=${produit[0]}+${texFraction(a, b)}$`;
        }
        // faut-il simplifier c*e/d*f
        if (!this.correctionDetaillee) {
          [c,d,e,f]=produit[2]
        }
        p = pgcd(c * e, d * f);
        if (p != 1 && ppcm(b, d * f) > ppcm(b, (d * f) / p)) {
          texteCorr += `$=${texFraction((e * c) / p + "\\times\\cancel{" + p + "}",(f * d) / p + "\\times\\cancel{" + p + "}")}+${texFraction(a, b)}$`;
          c = (e * c) / p;
          d = (f * d) / p;
        } else {
          c = e * c;
          d = f * d;
        }
        p = ppcm(b, d); // p = dénominateur commun
        k1 = p / b;
        k2 = p / d;
        if (k2 != 1) {
          texteCorr += `$=${texFraction(
            c + miseEnEvidence("\\times" + k2),
            d + miseEnEvidence("\\times" + k2)
          )}$`;
        } else { if (k1!=1) {
          texteCorr += `$=${texFraction(c, d)}$`;
        }
      }

        if (k1 != 1) {
          texteCorr += `$+${texFraction(
            a + miseEnEvidence("\\times" + k1),
            b + miseEnEvidence("\\times" + k1)
          )}$`;
        } else {
          if (k2!=1) {
          texteCorr += `$+${texFraction(a, b)}$`;
          }
        }

        if (this.correctionDetaillee) {
          texteCorr += `$=${texFraction(c * k2,p)}+${texFraction(a * k1, p)}$`;
        }
        e = a * k1 + c * k2;
        f = p;

        texteCorr += `$=${texFraction(e, f)}${simplificationDeFractionAvecEtapes(e, f)}$`;
   /*     p = pgcd(e, f);
        // faut-il simplifier e/f
        if (p != 1) {
          texteCorr += `$=${texFraction(
            e / p + "\\times\\cancel{" + p + "}",
            f / p + "\\times\\cancel{" + p + "}"
          )}$`;
          texteCorr += `$=${texFractionReduite(e, f)}$`;
        }*/
        break;

       
        case 3: // avec piege addition non prioritaire fraction2 * fraction3 + fraction1  tout positif
          d = b;
          produit=produitDeDeuxFractions(c,d,e,f)
          texte = `$${texFraction(c,d)}\\times${texFraction(e, f)}+${texFraction(a, b)}$`;
          texteCorr = `$${texFraction(c,d)}\\times${texFraction(e, f)}+${texFraction(a, b)}$`;
          if (this.correctionDetaillee){
          texteCorr += `$=${texFraction(c + "\\times" + e,d + "\\times" + f)}+${texFraction(a, b)}$`;
          texteCorr += `$=${texFraction(c * e,d * f)}+${texFraction(a, b)}$`;
          }
          else {
            texteCorr += `$=${produit[1]}+${texFraction(a, b)}$`;
            texteCorr += `$=${produit[0]}+${texFraction(a, b)}$`;
          }
          // faut-il simplifier c*e/d*f
          if (!this.correctionDetaillee) {
            [c,d,e,f]=produit[2]
          }
          p = pgcd(c * e, d * f);
          if (p != 1 && ppcm(b, d * f) > ppcm(b, (d * f) / p)) {
            texteCorr += `$=${texFraction(
              (e * c) / p + "\\times\\cancel{" + p + "}",
              (f * d) / p + "\\times\\cancel{" + p + "}"
            )}+${texFraction(a, b)}$`;
            c = (e * c) / p;
            d = (f * d) / p;
          } else {
            c = e * c;
            d = f * d;
          }
          p = ppcm(b, d); //denominateur commun = p
          k1 = p / b;
          k2 = p / d;

          if (k2 != 1) {
            texteCorr += `$=${texFraction(
              c + "\\times" + k2,
              d + "\\times" + k2
            )}$`;
          } else { if (k1!=1) {
            texteCorr += `$=${texFraction(c, d)}$`;
          }}

          if (k1 != 1) {
            texteCorr += `$+${texFraction(
              a + miseEnEvidence("\\times" + k1),
              b + miseEnEvidence("\\times" + k1)
            )}$`;
          } else { if (k2!=1) {
            texteCorr += `$+${texFraction(a, b)}$`;
          }}
          if(this.correctionDetaillee){
          texteCorr += `$=${texFraction(c * k2,d * k2)}+${texFraction(a * k1, b * k1)}$`;
          }
          e = a * k1 + c * k2;
          f = p;
            texteCorr += `$=${texFraction(e, f)}${simplificationDeFractionAvecEtapes(e, f)}$`;
   /*      p = pgcd(e, f);
          // faut-il simplifier e/f
          if (p != 1) {
            texteCorr += `$=${texFraction(
              e / p + "\\times\\cancel{" + p + "}",
              f / p + "\\times\\cancel{" + p + "}"
            )}$`;
            texteCorr += `$=${texFractionReduite(e, f)}$`;
            
          }*/
          break;

        case 4:
          a = a * randint(-1, 1, [0]);
          b = b * randint(-1, 1, [0]);
          c = c * randint(-1, 1, [0]);
          d = d * randint(-1, 1, [0]);
          e = e * randint(-1, 1, [0]);
          f = f * randint(-1, 1, [0]);

          nombre_de_signe_moins = (c < 0) + (d < 0) + (e < 0) + (f < 0);
          if (Math.pow(-1, nombre_de_signe_moins) == 1) {
            signe2 = "+";
          } else {
            signe2 = "-";
          }
          texte = `$${texFraction(a, b)}+${texFraction(c,d)}\\times${texFraction(e, f)}=$`;
          texteCorr = `$${texFraction(a, b)}+${texFraction(c,d)}\\times${texFraction(e, f)}$`;

          c = abs(c); // gestion du signe du produit avec {signe}
          d = abs(d);
          e = abs(e);
          f = abs(f);

          if (a * b > 0) {
            //suppression des signes - superflus de la première fraction
            signe1 = "";
          } else {
            signe1 = "-";
          }

          a = abs(a);
          b = abs(b);
          produit=produitDeDeuxFractions(c,d,e,f)
          if (this.correctionDetaillee) {
          texteCorr += `$=${signe1}${texFraction(
            a,
            b
          )}${signe2}${texFraction(c + "\\times" + e, d + "\\times" + f)}$`;
          texteCorr += `$=${signe1}${texFraction(
            a,
            b
          )}${signe2}${texFraction(c * e, d * f)}$`;
          }
          else {
            texteCorr += `$=${signe1}${texFraction(
              a,
              b
            )}${signe2}${produit[1]}$`;
            texteCorr += `$=${signe1}${texFraction(
              a,
              b
            )}${signe2}${produit[0]}$`;
            }
          // faut-il simplifier c*e/d*f
          if (!this.correctionDetaillee) {
            [c,d,e,f]=produit[2]
          }
          p = pgcd(c * e, d * f);
          if (p != 1 && ppcm(b, d * f) > ppcm(b, (d * f) / p)) {
            texteCorr += `$=${signe1}${texFraction(
              a,
              b
            )}${signe2}${texFraction(
              (e * c) / p + "\\times\\cancel{" + p + "}",
              (f * d) / p + "\\times\\cancel{" + p + "}"
            )}$`;
            c = (e * c) / p;
            d = (f * d) / p;
          } else {
            c = e * c;
            d = f * d;
          }
          p = ppcm(d, b); // mise au même dénominateur
          if (d % b != 0 && b % d != 0) {
            // dénominateur commun = p
            k1 = p / b;
            k2 = p / d;
            texteCorr += `$=${signe1}${texFraction(
              a + miseEnEvidence("\\times" + k1),
              b + miseEnEvidence("\\times" + k1)
            )}${signe2}${texFraction(
              c + miseEnEvidence("\\times" + k2),
              d + miseEnEvidence("\\times" + k2)
            )}$`;
            texteCorr += `$=${signe1}${texFraction(
              a * k1,
              b * k1
            )}${signe2}${texFraction(c * k2, d * k2)}$`;
            texteCorr += `$=${texFraction(
              signe1 + a * k1 + signe2 + c * k2,
              b * k1
            )}$`;
            a = a * k1;
            c = c * k2;
            d = p;
          } else {
            if (p == d) {
              k1 = d / b; // d = dénominateur commun
              texteCorr += `$=${signe1}${texFraction(
                a + miseEnEvidence("\\times" + k1),
                b + miseEnEvidence("\\times" + k1)
              )}${signe2}${texFraction(c, d)}$`;
              texteCorr += `$=${signe1}${texFraction(
                a * k1,
                d
              )}${signe2}${texFraction(c, d)}$`;
              texteCorr += `$=${texFraction(
                signe1 + a * k1 + signe2 + c,
                d
              )}$`;
              a = a * k1;
            } else {
              // b=k2*d
              k2 = b / d; // b= dénominateur commun
              texteCorr += `$=${signe1}${texFraction(
                a,
                b
              )}${signe2}${texFraction(
                c + miseEnEvidence("\\times" + k2),
                d + miseEnEvidence("\\times" + k2)
              )}$`;
              texteCorr += `$=${signe1}${texFraction(
                a,
                b
              )}${signe2}${texFraction(c * k2, b)}$`;
              texteCorr += `$=${texFraction(
                signe1 + a + signe2 + c * k2,
                b
              )}$`;
              c = c * k2;
              d = d * k2;
            }
          }

          if (a != c) {
            e = 0;
            if (signe1 == "") {
              e = a;
            } else {
              e = -a;
            }
            if (signe2 == "+") {
              e += c;
            } else {
              e = e - c;
            }
          } else {
            if (
              (signe1 == "-" && signe2 == "+") ||
              (signe1 == "" && signe2 == "-")
            ) {
              e = 0;
            } else {
              e = 0;
              if (signe1 == "") {
                e = a + c;
              } else {
                e = -a - c;
              }
            }
          }

          texteCorr += `$=${texFractionSigne(e, d)}${simplificationDeFractionAvecEtapes(e, d)}$`;
/*          p = pgcd(abs(e), d);
          if (p != 1) {
            f = d / p;
            e = e / p;
            if (e > 0) {
              // fraction positive => pas de signe
              texteCorr += `$=${texFraction(
                e + "\\times\\cancel{" + p + "}",
                f + "\\times\\cancel{" + p + "}"
              )}$`;
              texteCorr += `$=${simplificationDeFractionAvecEtapes(e, f)}$`;
            } else {
              // numérateur négatif => signe - devant les fractions suivantes.
              texteCorr += `$=-${texFraction(
                -e + "\\times\\cancel{" + p + "}",
                f + "\\times\\cancel{" + p + "}"
              )}$`;
              texteCorr += `$=${simplificationDeFractionAvecEtapes(e, f)}$`;
            }
          }
*/
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
    "Niveau de difficulté ",4,
    "1 : Fractions faciles, positives ou non\n2 : Nombres positifs sans piège de priorité\n3 : Deux calculs avec positifs et piège de priorité et deux calculs avec relatifs\n4 : Calculs avec relatifs",
  ];
}

