import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,combinaisonListes,abs,pgcd,texFractionReduite,obtenir_liste_facteurs_premiers,obtenir_liste_fractions_irreductibles,obtenir_liste_nombres_premiers,decomposition_facteurs_premiers,tex_fraction} from '../../modules/outils.js'
export const titre = 'Mutliplier des fractions'

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
  this.titre = titre;
  this.consigne = "Calculer et donner le résultat sous forme irréductible";
  this.spacing = 2;
  this.spacingCorr = 2;
  this.nbQuestions = 5;
  this.nbColsCorr = 1;
  this.sup2 = false; //méthode
  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
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
      aa,
      bb,
      cc,
      dd,
      signe,
      numerateur,
      denominateur,
      index,
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
            texteCorr = `$${tex_fraction(a, 1)}\\times${tex_fraction(c, d)}$`;
            texteCorr += `$=\\dfrac{${a}}{1}\\times${tex_fraction(c, d)}$`;
            texteCorr += `$=${tex_fraction(
              a + "\\times" + c,
              "1\\times" + d
            )}$`;
            texteCorr += `$=${tex_fraction(a * c, d)}$`;
            if (pgcd(a * c, d) != 1) {
              texteCorr += `$=${texFractionReduite(a * c, d)}$`;
            }
            break;

          case 2: // fraction * fraction tout positif
            p = pgcd(a * c, b * d);
            texte = `$${tex_fraction(a, b)}\\times${tex_fraction(c, d)}=$`;
            texteCorr = `$${tex_fraction(a, b)}\\times${tex_fraction(c, d)}$`;
            texteCorr += `$=${tex_fraction(
              a + "\\times" + c,
              b + "\\times" + d
            )}$`;
            texteCorr += `$=${tex_fraction(a * c, b * d)}$`;
            if (p != 1) {
              texteCorr += `$=${tex_fraction(
                (a * c) / p + "\\times\\cancel{" + p + "}",
                (b * d) / p + "\\times\\cancel{" + p + "}"
              )}$`;
              texteCorr += `$=${tex_fraction((a * c) / p, (b * d) / p)}$`;
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
            texteCorr = `$${tex_fraction(a, b)}\\times${tex_fraction(c, d)}$`;
            aa = abs(a);
            bb = abs(b);
            cc = abs(c);
            dd = abs(d);
            p = pgcd(aa * cc, bb * dd);
            texteCorr += `$=${signe}${tex_fraction(
              aa,
              bb
            )}\\times${tex_fraction(cc, dd)}$`;
            texteCorr += `$=${signe}${tex_fraction(
              aa + "\\times" + cc,
              bb + "\\times" + dd
            )}$`;
            if (p == 1) {
              texteCorr += `$=${signe}${tex_fraction(aa * cc, bb * dd)}$`;
            } else {
              texteCorr += `$=${signe}${tex_fraction(aa * cc, bb * dd)}$`;
              if (aa * cc != bb * dd) {
                texteCorr += `$=${signe}${tex_fraction(
                  (aa * cc) / p + "\\times\\cancel{" + p + "}",
                  (bb * dd) / p + "\\times\\cancel{" + p + "}"
                )}$`;
                texteCorr += `$=${signe}${tex_fraction(
                  (aa * cc) / p,
                  (bb * dd) / p
                )}$`;
              } else {
                texteCorr += `$=${signe}1$`;
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
            texteCorr = `$${a}\\times${tex_fraction(c, d)}$`;
            texteCorr += `$=${tex_fraction(a + "\\times" + c, d)}$`;
            texteCorr += `$=${tex_fraction(
              decomposition_facteurs_premiers(a) +
              "\\times" +
              decomposition_facteurs_premiers(c),
              decomposition_facteurs_premiers(d)
            )}$`;
            // texteCorr += `$=${tex_fraction(decomposition_facteurs_premiers(a * c), decomposition_facteurs_premiers(d))}$`
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

            texteCorr += `$=\\dfrac{${numerateur}}{${denominateur}}$`;
            texteCorr += `$=${tex_fraction(a, b)}$`;
            break;

          case 2: // fraction * fraction tout positif
            texte = `$${tex_fraction(a, b)}\\times${tex_fraction(c, d)}=$`;
            texteCorr = `$${tex_fraction(a, b)}\\times${tex_fraction(c, d)}$`;
            texteCorr += `$=${tex_fraction(
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

            texteCorr += `$=\\dfrac{${numerateur}}{${denominateur}}$`;
            texteCorr += `$=${tex_fraction(a, b)}$`;
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
            texteCorr = `$${tex_fraction(a, b)}\\times${tex_fraction(c, d)}$`;
            aa = abs(a);
            bb = abs(b);
            cc = abs(c);
            dd = abs(d);

            texteCorr += `$=${signe}${tex_fraction(
              aa,
              bb
            )}\\times${tex_fraction(cc, dd)}$`;
            texteCorr += `$=${signe}${tex_fraction(
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

            texteCorr += `$=${signe}\\dfrac{${numerateur}}{${denominateur}}$`;
            texteCorr += `$=${signe}${tex_fraction(a, b)}$`;
            break;
        }
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
    3,
    "1 : Fractions à numérateurs et dénominateurs positifs \n 2 : Type 1 et type 3 pour 50%/50%\n 3 : Ecritures fractionnaires à numérateur et dénominateur entiers relatifs",
  ];
  this.besoin_formulaire2_case_a_cocher = ["Avec décomposition"];
}

