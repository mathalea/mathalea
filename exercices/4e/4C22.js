import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,abs,pgcd,tex_fraction_reduite,obtenir_liste_facteurs_premiers,obtenir_liste_fractions_irreductibles,obtenir_liste_nombres_premiers,decomposition_facteurs_premiers,tex_fraction} from "/modules/outils.js"
/**
 * Exercice de calcul de produit de deux fractions.
 *
 * Paramétrages possibles :
 * * 1 : Produits de nombres positifs seulement
 * * 2 : deux questions niveau 1 puis deux questions niveau 3
 * * 3 : Produits de nombres relatifs
 * * Si décomposition cochée : les nombres utilisés sont plus importants.
 * @auteur Jean-Claude Lhote
 * 4C22
 */
export default function Exercice_multiplier_fractions() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = 1; // Avec ou sans relatifs
  this.titre = "Mutliplier des fractions";
  this.consigne = "Calculer et donner le résultat sous forme irréductible";
  this.spacing = 2;
  this.spacing_corr = 2;
  this.nb_questions = 5;
  this.nb_cols_corr = 1;
  this.sup2 = false; //méthode
  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles;
    let liste_fractions = obtenir_liste_fractions_irreductibles();

    if (this.sup == 1) {
      type_de_questions_disponibles = [1, 2, 2, 2];
    } // 1*nombre entier,3*fraction (pas de négatifs)
    else if (this.sup == 2) {
      type_de_questions_disponibles = [2, 2, 3, 3];
    } // fractions, 2*positifs, 2*relatifs
    else {
      type_de_questions_disponibles = [3];
    }
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
      aa,
      bb,
      cc,
      dd,
      signe,
      numerateur,
      denominateur,
      index,
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
      if (this.sup2 == false) {
        // methode 1 : simplifications finale
        switch (type_de_questions) {
          case 1: // entier * fraction (tout positif)
            if (a == 1) {
              a = randint(2, 9);
            }
            if (a == c) {
              a = a + 1;
            }
            texte = `$${tex_fraction(a, 1)}\\times${tex_fraction(c, d)}=$`;
            texte_corr = `$${tex_fraction(a, 1)}\\times${tex_fraction(c, d)}$`;
            texte_corr += `$=\\dfrac{${a}}{1}\\times${tex_fraction(c, d)}$`;
            texte_corr += `$=${tex_fraction(
              a + "\\times" + c,
              "1\\times" + d
            )}$`;
            texte_corr += `$=${tex_fraction(a * c, d)}$`;
            if (pgcd(a * c, d) != 1) {
              texte_corr += `$=${tex_fraction_reduite(a * c, d)}$`;
            }
            break;

          case 2: // fraction * fraction tout positif
            p = pgcd(a * c, b * d);
            texte = `$${tex_fraction(a, b)}\\times${tex_fraction(c, d)}=$`;
            texte_corr = `$${tex_fraction(a, b)}\\times${tex_fraction(c, d)}$`;
            texte_corr += `$=${tex_fraction(
              a + "\\times" + c,
              b + "\\times" + d
            )}$`;
            texte_corr += `$=${tex_fraction(a * c, b * d)}$`;
            if (p != 1) {
              texte_corr += `$=${tex_fraction(
                (a * c) / p + "\\times\\cancel{" + p + "}",
                (b * d) / p + "\\times\\cancel{" + p + "}"
              )}$`;
              texte_corr += `$=${tex_fraction((a * c) / p, (b * d) / p)}$`;
            }
            break;

          case 3:
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

            texte = `$${tex_fraction(a, b)}\\times${tex_fraction(c, d)}$`;
            texte_corr = `$${tex_fraction(a, b)}\\times${tex_fraction(c, d)}$`;
            aa = abs(a);
            bb = abs(b);
            cc = abs(c);
            dd = abs(d);
            p = pgcd(aa * cc, bb * dd);
            texte_corr += `$=${signe}${tex_fraction(
              aa,
              bb
            )}\\times${tex_fraction(cc, dd)}$`;
            texte_corr += `$=${signe}${tex_fraction(
              aa + "\\times" + cc,
              bb + "\\times" + dd
            )}$`;
            if (p == 1) {
              texte_corr += `$=${signe}${tex_fraction(aa * cc, bb * dd)}$`;
            } else {
              texte_corr += `$=${signe}${tex_fraction(aa * cc, bb * dd)}$`;
              if (aa * cc != bb * dd) {
                texte_corr += `$=${signe}${tex_fraction(
                  (aa * cc) / p + "\\times\\cancel{" + p + "}",
                  (bb * dd) / p + "\\times\\cancel{" + p + "}"
                )}$`;
                texte_corr += `$=${signe}${tex_fraction(
                  (aa * cc) / p,
                  (bb * dd) / p
                )}$`;
              } else {
                texte_corr += `$=${signe}1$`;
              }
            }
            break;
        }
      } else {
        //méthode 2 : décomposition
        if (a == c) {
          a++;
        }
        aa = obtenir_liste_nombres_premiers()[randint(1, 5)];
        bb = obtenir_liste_nombres_premiers()[randint(1, 5, [aa])];
        a = a * aa;
        d = d * aa;
        b = b * bb;
        c = c * bb;

        var listea = obtenir_liste_facteurs_premiers(a);
        var listeb = obtenir_liste_facteurs_premiers(b);
        var listec = obtenir_liste_facteurs_premiers(c);
        var listed = obtenir_liste_facteurs_premiers(d);
        var listeavf, listebvf;

        switch (type_de_questions) {
          case 1: // entier * fraction (tout positif)
            texte = `$${a}\\times${tex_fraction(c, d)}=$`;
            texte_corr = `$${a}\\times${tex_fraction(c, d)}$`;
            texte_corr += `$=${tex_fraction(a + "\\times" + c, d)}$`;
            texte_corr += `$=${tex_fraction(
              decomposition_facteurs_premiers(a) +
              "\\times" +
              decomposition_facteurs_premiers(c),
              decomposition_facteurs_premiers(d)
            )}$`;
            // texte_corr += `$=${tex_fraction(decomposition_facteurs_premiers(a * c), decomposition_facteurs_premiers(d))}$`
            for (let k in listec) {
              listea.push(listec[k]);
            }
            listeb = listed;
            listeavf = [];
            listebvf = [];

            listea.forEach(function a_ajouter_dans_listeavf(element) {
              listeavf.push([element, true]);
            });
            listeb.forEach(function a_ajouter_dans_listebvf(element) {
              listebvf.push([element, true]);
            });

            for (index = 0; index < listeb.length;) {
              for (let j = 0; j <= listea.length;) {
                if (listeb[index] == listea[j]) {
                  listebvf[index] = [listeb[index], false];
                  listeavf[j] = [listea[j], false];
                  listea[j] = 1;
                  listeb[index] = 1;
                  break;
                }
                j++;
              }
              index++;
            }

            a = 1;
            b = 1;
            for (let k in listea) {
              a = a * listea[k];
            }
            for (let k in listeb) {
              b = b * listeb[k];
            }

            numerateur = "";
            denominateur = "";

            for (let j in listeavf) {
              if (listeavf[j][1] == true) {
                numerateur += listeavf[j][0] + "\\times";
              } else {
                numerateur += "\\cancel{" + listeavf[j][0] + "}\\times";
              }
            }
            numerateur = numerateur.substr(0, numerateur.length - 6);

            for (let j in listebvf) {
              if (listebvf[j][1] == true) {
                denominateur += listebvf[j][0] + "\\times";
              } else {
                denominateur += "\\cancel{" + listebvf[j][0] + "}\\times";
              }
            }
            denominateur = denominateur.substr(0, denominateur.length - 6);

            texte_corr += `$=\\dfrac{${numerateur}}{${denominateur}}$`;
            texte_corr += `$=${tex_fraction(a, b)}$`;
            break;

          case 2: // fraction * fraction tout positif
            texte = `$${tex_fraction(a, b)}\\times${tex_fraction(c, d)}=$`;
            texte_corr = `$${tex_fraction(a, b)}\\times${tex_fraction(c, d)}$`;
            texte_corr += `$=${tex_fraction(
              a + "\\times" + c,
              b + "\\times" + d
            )}$`;

            for (let k in listec) {
              listea.push(listec[k]);
            }
            for (let k in listed) {
              listeb.push(listed[k]);
            }

            listeavf = [];
            listebvf = [];

            listea.forEach(function a_ajouter_dans_listeavf(element) {
              listeavf.push([element, true]);
            });
            listeb.forEach(function a_ajouter_dans_listebvf(element) {
              listebvf.push([element, true]);
            });

            for (index = 0; index < listeb.length;) {
              for (let j = 0; j <= listea.length;) {
                if (listeb[index] == listea[j]) {
                  listebvf[index] = [listeb[index], false];
                  listeavf[j] = [listea[j], false];
                  listea[j] = 1;
                  listeb[index] = 1;
                  break;
                }
                j++;
              }
              index++;
            }

            a = 1;
            b = 1;
            for (let k in listea) {
              a = a * listea[k];
            }
            for (let k in listeb) {
              b = b * listeb[k];
            }

            numerateur = "";
            denominateur = "";

            for (let j in listeavf) {
              if (listeavf[j][1] == true) {
                numerateur += listeavf[j][0] + "\\times";
              } else {
                numerateur += "\\cancel{" + listeavf[j][0] + "}\\times";
              }
            }
            numerateur = numerateur.substr(0, numerateur.length - 6);

            for (let j in listebvf) {
              if (listebvf[j][1] == true) {
                denominateur += listebvf[j][0] + "\\times";
              } else {
                denominateur += "\\cancel{" + listebvf[j][0] + "}\\times";
              }
            }
            denominateur = denominateur.substr(0, denominateur.length - 6);

            texte_corr += `$=\\dfrac{${numerateur}}{${denominateur}}$`;
            texte_corr += `$=${tex_fraction(a, b)}$`;
            break;

          case 3:
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

            texte = `$${tex_fraction(a, b)}\\times${tex_fraction(c, d)}$`;
            texte_corr = `$${tex_fraction(a, b)}\\times${tex_fraction(c, d)}$`;
            aa = abs(a);
            bb = abs(b);
            cc = abs(c);
            dd = abs(d);

            texte_corr += `$=${signe}${tex_fraction(
              aa,
              bb
            )}\\times${tex_fraction(cc, dd)}$`;
            texte_corr += `$=${signe}${tex_fraction(
              aa + "\\times" + cc,
              bb + "\\times" + dd
            )}$`;

            for (let k in listec) {
              listea.push(listec[k]);
            }
            for (let k in listed) {
              listeb.push(listed[k]);
            }

            listeavf = [];
            listebvf = [];

            listea.forEach(function a_ajouter_dans_listeavf(element) {
              listeavf.push([element, true]);
            });
            listeb.forEach(function a_ajouter_dans_listebvf(element) {
              listebvf.push([element, true]);
            });

            for (index = 0; index < listeb.length;) {
              for (let j = 0; j <= listea.length;) {
                if (listeb[index] == listea[j]) {
                  listebvf[index] = [listeb[index], false];
                  listeavf[j] = [listea[j], false];
                  listea[j] = 1;
                  listeb[index] = 1;
                  break;
                }
                j++;
              }
              index++;
            }

            a = 1;
            b = 1;
            for (let k in listea) {
              a = a * listea[k];
            }
            for (let k in listeb) {
              b = b * listeb[k];
            }

            numerateur = "";
            denominateur = "";

            for (let j in listeavf) {
              if (listeavf[j][1] == true) {
                numerateur += listeavf[j][0] + "\\times";
              } else {
                numerateur += "\\cancel{" + listeavf[j][0] + "}\\times";
              }
            }
            numerateur = numerateur.substr(0, numerateur.length - 6);

            for (let j in listebvf) {
              if (listebvf[j][1] == true) {
                denominateur += listebvf[j][0] + "\\times";
              } else {
                denominateur += "\\cancel{" + listebvf[j][0] + "}\\times";
              }
            }
            denominateur = denominateur.substr(0, denominateur.length - 6);

            texte_corr += `$=${signe}\\dfrac{${numerateur}}{${denominateur}}$`;
            texte_corr += `$=${signe}${tex_fraction(a, b)}$`;
            break;
        }
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
    3,
    "1 : Fractions à numérateurs et dénominateurs positifs \n 2 : Type 1 et type 3 pour 50%/50%\n 3 : Ecritures fractionnaires à numérateur et dénominateur entiers relatifs",
  ];
  this.besoin_formulaire2_case_a_cocher = ["Avec décomposition"];
}

