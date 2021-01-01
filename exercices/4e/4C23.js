import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,abs,pgcd,produit_de_deux_fractions,simplification_de_fraction_avec_etapes,mise_en_evidence,tex_fraction_signe,obtenir_liste_fractions_irreductibles,obtenir_liste_fractions_irreductibles_faciles,tex_fraction,ppcm} from "/modules/outils.js"
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
  this.titre = "Fractions et priorités opératoires";
  this.consigne = "Calculer et donner le résultat sous forme irréductible";
  this.spacing = 2;
  this.spacing_corr = 2;
  this.nb_questions = 5;
  this.nb_cols_corr = 1;
  this.correction_detaillee_disponible=true
  this.correction_detaillee=true

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles;
    let liste_fractions = obtenir_liste_fractions_irreductibles();
    let liste_fractions_faciles = obtenir_liste_fractions_irreductibles_faciles();
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

    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
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
      texte_corr,
      produit=[],
      type_de_questions,
      cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      type_de_questions = liste_type_de_questions[i];
      if (this.sup==1) {ab = choice(liste_fractions_faciles);cd = choice(liste_fractions_faciles);ef = choice(liste_fractions_faciles);}
      else {ab = choice(liste_fractions);cd = choice(liste_fractions);ef = choice(liste_fractions);}

      a = ab[0];
      b = ab[1];
      c = cd[0];
      d = cd[1];
      e = ef[0];
      f = ef[1];
      console.log(i,type_de_questions)
      switch (type_de_questions) {
        case 1: // sans piège fraction1 + fraction2 x fraction3 (tout positif)
          texte = `$${tex_fraction(a, b)}+${tex_fraction(c,d)}\\times${tex_fraction(e, f)}$`;

          texte_corr = `$${tex_fraction(a, b)}+${tex_fraction(c,d)}\\times${tex_fraction(e, f)}$`;
          produit=produit_de_deux_fractions(c,d,e,f)
          if (this.correction_detaillee) {
          texte_corr += `$=${tex_fraction(a, b)}+${tex_fraction(c + "\\times" + e,d + "\\times" + f)}$`;
          texte_corr += `$=${tex_fraction(a, b)}+${tex_fraction(c * e,d * f)}$`;
      }
      else {
        texte_corr += `$=${tex_fraction(a, b)}+${produit[1]}$`;
        texte_corr += `$=${tex_fraction(a, b)}+${produit[0]}$`;
      }
          // faut-il simplifier c*e/d*f
          if (!this.correction_detaillee) {
            [c,d,e,f]=produit[2]
          }
          p = pgcd(c * e, d * f);
          if (p != 1 && ppcm(b, d * f) > ppcm(b, (d * f) / p)) {
            texte_corr += `$=${tex_fraction(a, b)}+${tex_fraction((e * c) / p + "\\times\\cancel{" + p + "}",(f * d) / p + "\\times\\cancel{" + p + "}"
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
            texte_corr += `$=${tex_fraction(
              a + mise_en_evidence("\\times" + k1),
              b + mise_en_evidence("\\times" + k1)
            )}$`;
          } else { if (k2!=1){
            texte_corr += `$=${tex_fraction(a, b)}$`;
          }}
          if (k2 != 1) {
            texte_corr += `$+${tex_fraction(
              c + mise_en_evidence("\\times" + k2),
              d + mise_en_evidence("\\times" + k2)
            )}$`;
          } else { if (k1!=1) {
            texte_corr += `$+${tex_fraction(c, d)}$`;
          }}

          texte_corr += `$=${tex_fraction(a * k1, p)}+${tex_fraction(c * k2,p)}$`;
          e = a * k1 + c * k2;
          f = p;

          texte_corr += `$=${tex_fraction(e, f)}${simplification_de_fraction_avec_etapes(e, f)}$`;
  /*
          p = pgcd(e, f);
          // faut-il simplifier e/f
          if (p != 1) {
            texte_corr += `$=${tex_fraction(
              e / p + "\\times\\cancel{" + p + "}",
              f / p + "\\times\\cancel{" + p + "}"
            )}$`;
            texte_corr += `$=${tex_fraction_reduite(e / p, f / p)}$`;
          }
*/
          break;


        case 2: // sans piège fraction2 x fraction3 + fraction1  (tout positif)
        texte = `$${tex_fraction(c,d)}\\times${tex_fraction(e, f)}+${tex_fraction(a, b)}$`;
        produit=produit_de_deux_fractions(c,d,e,f)
        texte_corr = `$${tex_fraction(c,d)}\\times${tex_fraction(e, f)}+${tex_fraction(a, b)}$`;
        if (this.correction_detaillee) {
        texte_corr += `$=${tex_fraction(c + "\\times" + e,d + "\\times" + f)}+${tex_fraction(a, b)}$`;
        texte_corr += `$=${tex_fraction(c * e,d * f)}+${tex_fraction(a, b)}$`;
        }
        else {
          texte_corr += `$=${produit[1]}+${tex_fraction(a, b)}$`;
          texte_corr += `$=${produit[0]}+${tex_fraction(a, b)}$`;
        }
        // faut-il simplifier c*e/d*f
        if (!this.correction_detaillee) {
          [c,d,e,f]=produit[2]
        }
        p = pgcd(c * e, d * f);
        if (p != 1 && ppcm(b, d * f) > ppcm(b, (d * f) / p)) {
          texte_corr += `$=${tex_fraction((e * c) / p + "\\times\\cancel{" + p + "}",(f * d) / p + "\\times\\cancel{" + p + "}")}+${tex_fraction(a, b)}$`;
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
          texte_corr += `$=${tex_fraction(
            c + mise_en_evidence("\\times" + k2),
            d + mise_en_evidence("\\times" + k2)
          )}$`;
        } else { if (k1!=1) {
          texte_corr += `$=${tex_fraction(c, d)}$`;
        }
      }

        if (k1 != 1) {
          texte_corr += `$+${tex_fraction(
            a + mise_en_evidence("\\times" + k1),
            b + mise_en_evidence("\\times" + k1)
          )}$`;
        } else {
          if (k2!=1) {
          texte_corr += `$+${tex_fraction(a, b)}$`;
          }
        }

        if (this.correction_detaillee) {
          texte_corr += `$=${tex_fraction(c * k2,p)}+${tex_fraction(a * k1, p)}$`;
        }
        e = a * k1 + c * k2;
        f = p;

        texte_corr += `$=${tex_fraction(e, f)}${simplification_de_fraction_avec_etapes(e, f)}$`;
   /*     p = pgcd(e, f);
        // faut-il simplifier e/f
        if (p != 1) {
          texte_corr += `$=${tex_fraction(
            e / p + "\\times\\cancel{" + p + "}",
            f / p + "\\times\\cancel{" + p + "}"
          )}$`;
          texte_corr += `$=${tex_fraction_reduite(e, f)}$`;
        }*/
        break;

       
        case 3: // avec piege addition non prioritaire fraction2 * fraction3 + fraction1  tout positif
          d = b;
          produit=produit_de_deux_fractions(c,d,e,f)
          texte = `$${tex_fraction(c,d)}\\times${tex_fraction(e, f)}+${tex_fraction(a, b)}$`;
          texte_corr = `$${tex_fraction(c,d)}\\times${tex_fraction(e, f)}+${tex_fraction(a, b)}$`;
          if (this.correction_detaillee){
          texte_corr += `$=${tex_fraction(c + "\\times" + e,d + "\\times" + f)}+${tex_fraction(a, b)}$`;
          texte_corr += `$=${tex_fraction(c * e,d * f)}+${tex_fraction(a, b)}$`;
          }
          else {
            texte_corr += `$=${produit[1]}+${tex_fraction(a, b)}$`;
            texte_corr += `$=${produit[0]}+${tex_fraction(a, b)}$`;
          }
          // faut-il simplifier c*e/d*f
          if (!this.correction_detaillee) {
            [c,d,e,f]=produit[2]
          }
          p = pgcd(c * e, d * f);
          if (p != 1 && ppcm(b, d * f) > ppcm(b, (d * f) / p)) {
            texte_corr += `$=${tex_fraction(
              (e * c) / p + "\\times\\cancel{" + p + "}",
              (f * d) / p + "\\times\\cancel{" + p + "}"
            )}+${tex_fraction(a, b)}$`;
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
            texte_corr += `$=${tex_fraction(
              c + "\\times" + k2,
              d + "\\times" + k2
            )}$`;
          } else { if (k1!=1) {
            texte_corr += `$=${tex_fraction(c, d)}$`;
          }}

          if (k1 != 1) {
            texte_corr += `$+${tex_fraction(
              a + mise_en_evidence("\\times" + k1),
              b + mise_en_evidence("\\times" + k1)
            )}$`;
          } else { if (k2!=1) {
            texte_corr += `$+${tex_fraction(a, b)}$`;
          }}
          if(this.correction_detaillee){
          texte_corr += `$=${tex_fraction(c * k2,d * k2)}+${tex_fraction(a * k1, b * k1)}$`;
          }
          e = a * k1 + c * k2;
          f = p;
            texte_corr += `$=${tex_fraction(e, f)}${simplification_de_fraction_avec_etapes(e, f)}$`;
   /*      p = pgcd(e, f);
          // faut-il simplifier e/f
          if (p != 1) {
            texte_corr += `$=${tex_fraction(
              e / p + "\\times\\cancel{" + p + "}",
              f / p + "\\times\\cancel{" + p + "}"
            )}$`;
            texte_corr += `$=${tex_fraction_reduite(e, f)}$`;
            
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
          texte = `$${tex_fraction(a, b)}+${tex_fraction(c,d)}\\times${tex_fraction(e, f)}=$`;
          texte_corr = `$${tex_fraction(a, b)}+${tex_fraction(c,d)}\\times${tex_fraction(e, f)}$`;

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
          produit=produit_de_deux_fractions(c,d,e,f)
          if (this.correction_detaillee) {
          texte_corr += `$=${signe1}${tex_fraction(
            a,
            b
          )}${signe2}${tex_fraction(c + "\\times" + e, d + "\\times" + f)}$`;
          texte_corr += `$=${signe1}${tex_fraction(
            a,
            b
          )}${signe2}${tex_fraction(c * e, d * f)}$`;
          }
          else {
            texte_corr += `$=${signe1}${tex_fraction(
              a,
              b
            )}${signe2}${produit[1]}$`;
            texte_corr += `$=${signe1}${tex_fraction(
              a,
              b
            )}${signe2}${produit[0]}$`;
            }
          // faut-il simplifier c*e/d*f
          if (!this.correction_detaillee) {
            [c,d,e,f]=produit[2]
          }
          p = pgcd(c * e, d * f);
          if (p != 1 && ppcm(b, d * f) > ppcm(b, (d * f) / p)) {
            texte_corr += `$=${signe1}${tex_fraction(
              a,
              b
            )}${signe2}${tex_fraction(
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
            texte_corr += `$=${signe1}${tex_fraction(
              a + mise_en_evidence("\\times" + k1),
              b + mise_en_evidence("\\times" + k1)
            )}${signe2}${tex_fraction(
              c + mise_en_evidence("\\times" + k2),
              d + mise_en_evidence("\\times" + k2)
            )}$`;
            texte_corr += `$=${signe1}${tex_fraction(
              a * k1,
              b * k1
            )}${signe2}${tex_fraction(c * k2, d * k2)}$`;
            texte_corr += `$=${tex_fraction(
              signe1 + a * k1 + signe2 + c * k2,
              b * k1
            )}$`;
            a = a * k1;
            c = c * k2;
            d = p;
          } else {
            if (p == d) {
              k1 = d / b; // d = dénominateur commun
              texte_corr += `$=${signe1}${tex_fraction(
                a + mise_en_evidence("\\times" + k1),
                b + mise_en_evidence("\\times" + k1)
              )}${signe2}${tex_fraction(c, d)}$`;
              texte_corr += `$=${signe1}${tex_fraction(
                a * k1,
                d
              )}${signe2}${tex_fraction(c, d)}$`;
              texte_corr += `$=${tex_fraction(
                signe1 + a * k1 + signe2 + c,
                d
              )}$`;
              a = a * k1;
            } else {
              // b=k2*d
              k2 = b / d; // b= dénominateur commun
              texte_corr += `$=${signe1}${tex_fraction(
                a,
                b
              )}${signe2}${tex_fraction(
                c + mise_en_evidence("\\times" + k2),
                d + mise_en_evidence("\\times" + k2)
              )}$`;
              texte_corr += `$=${signe1}${tex_fraction(
                a,
                b
              )}${signe2}${tex_fraction(c * k2, b)}$`;
              texte_corr += `$=${tex_fraction(
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

          texte_corr += `$=${tex_fraction_signe(e, d)}${simplification_de_fraction_avec_etapes(e, d)}$`;
/*          p = pgcd(abs(e), d);
          if (p != 1) {
            f = d / p;
            e = e / p;
            if (e > 0) {
              // fraction positive => pas de signe
              texte_corr += `$=${tex_fraction(
                e + "\\times\\cancel{" + p + "}",
                f + "\\times\\cancel{" + p + "}"
              )}$`;
              texte_corr += `$=${simplification_de_fraction_avec_etapes(e, f)}$`;
            } else {
              // numérateur négatif => signe - devant les fractions suivantes.
              texte_corr += `$=-${tex_fraction(
                -e + "\\times\\cancel{" + p + "}",
                f + "\\times\\cancel{" + p + "}"
              )}$`;
              texte_corr += `$=${simplification_de_fraction_avec_etapes(e, f)}$`;
            }
          }
*/
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
    "Niveau de difficulté ",4,
    "1 : Fractions faciles, positives ou non\n2 : Nombres positifs sans piège de priorité\n3 : Deux calculs avec positifs et piège de priorité et deux calculs avec relatifs\n4 : Calculs avec relatifs",
  ];
}

