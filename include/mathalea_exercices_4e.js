/**
 * * Comparer des puissances de 10.
 *
 * Paramétrages possibles :
 * 1 : Puissances de 10 seules
 * 2 : mantisses différentes et même exposant
 * 3 : mêmes mantisses et exposants différents
 * 4 : mantisses et exposants différents
 * 5 : mantisses (négatives) et exposants différents
 * 6 : Tous types
 * Programmes : p130 : "Comparer, ranger, encadrer des nombres rationnels en écriture décimale, fractionnaire ou scientifique
 * @auteur Erwan Duplessy
 * date : 15/11/2020
 * 4C30-4
 */

function Comparer_puissance10() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = 1; // Avec ou sans relatifs
  this.titre = "Puissances de 10";
  this.consigne = "Dans chaque cas, comparer les deux nombres.";
  this.spacing = 2;
  this.spacing_corr = 2;
  this.nb_questions = 5;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;
  this.sup = 1;

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    texte = ` `; // texte énoncé
    texte_corr = ` `; // texte correction
    let a1 = 0; // mantisse 1
    let a2 = 0; // mantisse 2
    let n1 = 0; // puissance 1
    let n2 = 0; // puissance 2
    let nbA1 = 0; // valeur numérique du nombre 1
    let nbA2 = 0; // valeur numérique du nombre 2
    let c = parseInt(this.sup);
    for (let i = 0; i < this.nb_questions; i++) {
      if (this.sup == 6) {
        c = randint(1, 5); // si le choix est "tous type", on choisit un choix précédent
      }
      switch (c) {
        case 1:
          a1 = 1;
          n1 = randint(-9, 9);
          a2 = 1;
          n2 = choice(rangeMinMax(-9, 9), [n1]);
          break;
        case 2:
          a1 = randint(1, 9) + 0.1 * randint(1, 9) * randint(0, 1);
          n1 = randint(-9, 9);
          a2 = choice([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [a1]) + 0.1 * randint(1, 9) * randint(0, 1);
          n2 = n1;
          break;
        case 3:
          a1 = randint(1, 9) + 0.1 * randint(0, 9) + 0.01 * randint(0, 9);
          n1 = randint(-9, 9);
          a2 = a1;
          n2 = randint(-9, 9);
          break;
        case 4:
          a1 = randint(1, 9) + 0.1 * randint(0, 9);
          n1 = randint(-9, 9);
          a2 = choice(rangeMinMax(1, 99)) / 10;
          n2 = randint(-9, 9);
          break;
        case 5:
          a1 = choice(rangeMinMax(-99, 99, [0])) / 10;
          n1 = randint(-9, 9);
          a2 = choice(rangeMinMax(-99, 99, [0])) / 10;
          n2 = randint(-9, 9);
          break;
        default:
          break;
      }
      nbA1 = a1 * 10 ** n1;
      nbA2 = a2 * 10 ** n2;

      texte += num_alpha(i) + "  " + ecriturePuissance(a1, 10, n1) + " et " + ecriturePuissance(a2, 10, n2) + "<br>";
      if (nbA1 > nbA2) {
        texte_corr += num_alpha(i) + ` ${ecriturePuissance(a1, 10, n1)} $>$ ${ecriturePuissance(a2, 10, n2)} <br>`;
      } else {
        if (nbA1 == nbA2) {
          texte_corr += num_alpha(i) + ` ${ecriturePuissance(a1, 10, n1)} $=$ ${ecriturePuissance(a2, 10, n2)} <br>`;
        } else {
          texte_corr += num_alpha(i) + ` ${ecriturePuissance(a1, 10, n1)} $<$ ${ecriturePuissance(a2, 10, n2)} <br>`;
        }
      }
    }
    this.liste_questions.push(texte);
    this.liste_corrections.push(texte_corr);
    liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
  };
  this.besoin_formulaire_numerique = ["Niveau de difficulté", 6,
    "1 : puissances de 10 seules\n 2 : mantisses différentes et même exposant\n 3 : mêmes mantisses et exposants différents\n 4 : mantisses et exposants différents\n 5 : mantisses (négatives) et exposants différents\n 6 : tous types"];
}

/**
 * * Calcul de l'inverse d'un nombre.
 *
 * Paramétrages possibles :
 * * 1 : inverse d'un nombre entier
 * * 2 : inverse d'une fraction
 * * 3 : inverse d'un nombre décimal
 * * 4 : mélange des trois autres niveaux
 * @auteur Jean-Claude Lhote
 * 4C22-1
 */
function Exercice_trouver_l_inverse() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = 1; // Avec ou sans relatifs
  this.titre = "Trouver l'inverse d'un nombre";
  this.consigne =
    "Calculer l'inverse et donner la réponse sous forme décimale ou de fraction simplifiée quand c'est impossible";
  this.spacing = 2;
  this.spacing_corr = 2;
  this.nb_questions = 5;
  this.nb_cols_corr = 1;

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles;
    let liste_entiers = [
      [1, 1],
      [2, 0.5],
      [3, 0],
      [4, 0.25],
      [5, 0.2],
      [6, 0],
      [7, 0],
      [8, 0.125],
      [9, 0],
      [10, 0.1],
      [11, 0],
      [12, 0],
      [13, 0],
      [14, 0],
      [15, 0],
      [20, 0.05],
      [50, 0.02],
      [100, 0.01],
    ];
    // [n,0] si l'inverse de n n'est pas décimal [n,1/n] si il est décimal.
    let liste_decimaux = [
      [0.1, 10, 1],
      [0.2, 5, 1],
      [0.3, 10, 3],
      [0.4, 10, 4],
      [0.5, 2, 1],
      [0.6, 10, 6],
      [0.75, 100, 75],
      [0.8, 10, 8],
      [1.2, 10, 12],
      [1.5, 10, 15],
      [2.5, 10, 25],
      [3.5, 10, 35],
      [4.8, 10, 48],
      [7.5, 10, 75],
    ];
    // [x,n,d] n/d = inverse de x fraction à réduire si besoin ... d=1 si l'inverse de x est entier.
    let liste_fractions = [
      [3, 4, false],
      [5, 2, true],
      [4, 5, true],
      [5, 7, true],
      [7, 3, false],
      [16, 6, true],
      [12, 18, true],
      [9, 4, false],
      [4, 6, true],
      [8, 7, true],
      [5, 9, true],
      [9, 7, false],
      [13, 6, false],
      [7, 2, false],
    ];
    // [n,d,bol] inverse d/n à simplifier si besoin. si bol = true, alors d/n est décimal.
    let liste_couples_d_inverses;
    let couples_d_inverses;
    if (this.sup == 4) {
      type_de_questions_disponibles = [1, 1, 2, 2, 3];
    } // nombre entier,fraction,décimal]
    else {
      type_de_questions_disponibles = [parseInt(this.sup)];
    }
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    );
    for (
      let i = 0,
      nombre_choisi,
      nombre_inverse,
      nombre_inverse_num,
      nombre_inverse_den,
      texte,
      texte_corr,
      type_de_questions,
      cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      type_de_questions = liste_type_de_questions[i];
      switch (type_de_questions) {
        case 1: //inverse d'entier
          couples_d_inverses = choice(liste_entiers);
          nombre_choisi = couples_d_inverses[0];
          nombre_inverse = couples_d_inverses[1];
          if (choice([true, false])) {
            // nombre entier positif
            if (nombre_inverse != 0) {
              //inverse décimal
              texte_corr = `L\'inverse de $${nombre_choisi}$ est $${tex_nombrec(
                nombre_inverse
              )} \\:$ car $\\: ${nombre_choisi}   \\times   ${tex_nombrec(
                nombre_inverse
              )} =  1$.`;
            } else {
              //inverse non décimal
              texte_corr = `L\'inverse de $${nombre_choisi}$ est $${tex_fraction(
                1,
                nombre_choisi
              )} \\:$ car $\\: ${nombre_choisi}   \\times   ${tex_fraction(
                1,
                nombre_choisi
              )} =  1$.`;
            }
          } else {
            //nombre entier négatif
            nombre_choisi = -nombre_choisi;
            if (nombre_inverse != 0) {
              //inverse décimal
              texte_corr = `L'inverse de $${nombre_choisi}$ est $${tex_nombrec(
                -nombre_inverse
              )} \\:$`;
              texte_corr += ` car $\\: ${nombre_choisi}  \\times  \\left(-${tex_nombrec(
                nombre_inverse
              )}\\right)  =  1$.`;
            } else {
              //inverse non décimal
              texte_corr = `L\'inverse de $${nombre_choisi}$ est $-${tex_fraction(
                1,
                -nombre_choisi
              )} \\:$ car $\\: ${nombre_choisi}   \\times   \\left(-${tex_fraction(
                1,
                -nombre_choisi
              )}\\right) =  1$.`;
            }
          }
          texte = `Quel est l'inverse de $${tex_nombrec(nombre_choisi)}$ ?`;
          break;
        case 2:
          couples_d_inverses = choice(liste_decimaux);
          nombre_choisi = couples_d_inverses[0];
          nombre_inverse_num = couples_d_inverses[1];
          nombre_inverse_den = couples_d_inverses[2];
          if (choice([true, false])) {
            // nombre positif
            if (pgcd(nombre_inverse_num, nombre_inverse_den) == 1) {
              //non simplifiable après inversion
              texte_corr = `Comme $${tex_nombrec(nombre_choisi)}=${tex_fraction(
                nombre_inverse_den,
                nombre_inverse_num
              )}$, l'inverse de $${tex_nombrec(
                nombre_choisi
              )}$ est $${tex_fraction(
                nombre_inverse_num,
                nombre_inverse_den
              )} \\:$ car $\\: ${tex_fraction(
                nombre_inverse_den,
                nombre_inverse_num
              )}   \\times   ${tex_fraction(
                nombre_inverse_num,
                nombre_inverse_den
              )} =  1$.`;
            } else {
              // à simplifier après inversion
              texte_corr = `Comme $${tex_nombrec(nombre_choisi)}=${tex_fraction(
                nombre_inverse_den,
                nombre_inverse_num
              )}=${tex_fraction_reduite(
                nombre_inverse_den,
                nombre_inverse_num
              )}$, l'inverse de $${tex_nombrec(
                nombre_choisi
              )}$ est $${tex_fraction_reduite(
                nombre_inverse_num,
                nombre_inverse_den
              )} \\:$ car $\\: ${tex_fraction_reduite(
                nombre_inverse_den,
                nombre_inverse_num
              )}  \\times   ${tex_fraction_reduite(
                nombre_inverse_num,
                nombre_inverse_den
              )} =  1$.`;
            }
          } else {
            // nombre négatif
            nombre_choisi = -nombre_choisi;
            if (pgcd(nombre_inverse_num, nombre_inverse_den) == 1) {
              //non simplifiable après inversion
              texte_corr = `L'inverse de $${tex_nombrec(
                nombre_choisi
              )}$ est $-${tex_fraction(
                nombre_inverse_num,
                nombre_inverse_den
              )} \\:$ car $\\: ${tex_nombrec(
                nombre_choisi
              )}   \\times   \\left(-${tex_fraction(
                nombre_inverse_num,
                nombre_inverse_den
              )}\\right) =  1$.`;
              texte_corr = `Comme $${tex_nombrec(
                nombre_choisi
              )}=-${tex_fraction(
                nombre_inverse_den,
                nombre_inverse_num
              )}$, l'inverse de $${tex_nombrec(
                nombre_choisi
              )}$ est $-${tex_fraction(
                nombre_inverse_num,
                nombre_inverse_den
              )} \\:$ car $\\: -${tex_fraction(
                nombre_inverse_den,
                nombre_inverse_num
              )}   \\times  \\left(- ${tex_fraction(
                nombre_inverse_num,
                nombre_inverse_den
              )}\\right) =  1$.`;
            } else {
              // à simplifier après inversion
              texte_corr = `Comme $${tex_nombrec(
                nombre_choisi
              )}=-${tex_fraction(
                nombre_inverse_den,
                nombre_inverse_num
              )}=-${tex_fraction_reduite(
                nombre_inverse_den,
                nombre_inverse_num
              )}$, l'inverse de $${tex_nombrec(
                nombre_choisi
              )}$ est $-${tex_fraction_reduite(
                nombre_inverse_num,
                nombre_inverse_den
              )} \\:$ car $\\: -${tex_fraction_reduite(
                nombre_inverse_den,
                nombre_inverse_num
              )}  \\times  \\left(- ${tex_fraction_reduite(
                nombre_inverse_num,
                nombre_inverse_den
              )} \\right)=  1$.`;
            }
          }
          texte = `Quel est l'inverse de $${tex_nombrec(nombre_choisi)}$ ?`;
          break;
        case 3:
          couples_d_inverses = choice(liste_fractions);
          nombre_inverse_num = couples_d_inverses[0];
          nombre_inverse_den = couples_d_inverses[1];
          if (choice([true, false])) {
            // fraction positive
            if (couples_d_inverses[2] == true) {
              // inverse décimal
              texte_corr = `L'inverse de $${tex_fraction(
                nombre_inverse_num,
                nombre_inverse_den
              )}$ est $${tex_fraction(
                nombre_inverse_den,
                nombre_inverse_num
              )}=${tex_nombrec(
                nombre_inverse_den / nombre_inverse_num
              )} \\:$ car $\\: ${tex_fraction(
                nombre_inverse_num,
                nombre_inverse_den
              )}   \\times   ${tex_fraction(
                nombre_inverse_den,
                nombre_inverse_num
              )} =  1$.`;
            } else {
              // inverse non décimal
              texte_corr = `L'inverse de $${tex_fraction(
                nombre_inverse_num,
                nombre_inverse_den
              )}$ est $${tex_fraction(
                nombre_inverse_den,
                nombre_inverse_num
              )} \\:$ car $\\: ${tex_fraction(
                nombre_inverse_num,
                nombre_inverse_den
              )}   \\times   ${tex_fraction(
                nombre_inverse_den,
                nombre_inverse_num
              )} =  1$.`;
            }
            texte = `Quel est l'inverse de $${tex_fraction(
              nombre_inverse_num,
              nombre_inverse_den
            )}$ ?`;
          } else {
            // fraction négative
            if (couples_d_inverses[2] == true) {
              // inverse décimal
              texte_corr = `L'inverse de $-${tex_fraction(
                nombre_inverse_num,
                nombre_inverse_den
              )}$ est $-${tex_fraction(
                nombre_inverse_den,
                nombre_inverse_num
              )}=-${tex_nombrec(
                nombre_inverse_den / nombre_inverse_num
              )} \\:$ car $\\: -${tex_fraction(
                nombre_inverse_num,
                nombre_inverse_den
              )}   \\times  \\left(- ${tex_fraction(
                nombre_inverse_den,
                nombre_inverse_num
              )}\\right) =  1$.`;
            } else {
              // inverse non décimal
              texte_corr = `L'inverse de $-${tex_fraction(
                nombre_inverse_num,
                nombre_inverse_den
              )}$ est $-${tex_fraction(
                nombre_inverse_den,
                nombre_inverse_num
              )} \\:$ car $\\: -${tex_fraction(
                nombre_inverse_num,
                nombre_inverse_den
              )}   \\times  \\left(- ${tex_fraction(
                nombre_inverse_den,
                nombre_inverse_num
              )} \\right)=  1$.`;
            }
            texte = `Quel est l'inverse de $-${tex_fraction(
              nombre_inverse_num,
              nombre_inverse_den
            )}$ ?`;
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
    4,
    "1 : Nombres entiers\n 2 : Fractions\n 3 : Nombres décimaux\n 4 : Mélange des 3 niveaux",
  ];
}

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
function Exercice_multiplier_fractions() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = 1; // Avec ou sans relatifs
  this.titre = "Mutliplier des fractions";
  this.consigne = "Calculer et donner le résultat sous forme irréductible";
  this.spacing = 2;
  this.spacing_corr = 2;
  this.nb_questions = 5;
  this.nb_cols_corr = 1;
  this.sup2 = false; //méthode
  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles;
    liste_fractions = obtenir_liste_fractions_irreductibles();

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

/**
 * Calcul du quotient de deux fractions. Paramétrages possibles :
 * * 1 : Nombres positifs exclusivement
 * * 2 : nombres relatifs
 * @auteur Jean-Claude Lhote
 * 4C22-2
 */
function Exercice_diviser_fractions() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = 1; // Avec ou sans relatifs
  this.titre = "Diviser des fractions";
  this.consigne = "Calculer et donner le résultat sous forme irréductible";
  this.spacing = 2;
  this.spacing_corr = 2;
  this.nb_questions = 5;
  this.nb_cols_corr = 1;

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    liste_fractions = obtenir_liste_fractions_irreductibles();

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

/**
 * * Calcul fractionnaire : somme d'une fraction et du produit de deux autres fractions. Paramétrages possibles :
 * 1 : Calcul avec nombres positifs sans piège de priorité
 * * 2 : Calcul avec nombres positifs avec piège
 * * 3 : Calcul avec nombres relatifs
 * @auteur Jean-Claude Lhote
 * 4C23
 */
function Exercice_additionner_fraction_produit() {
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

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles;
    liste_fractions = obtenir_liste_fractions_irreductibles();
    liste_fractions_faciles = obtenir_liste_fractions_irreductibles_faciles();
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

/**
 * Donner l'opposé d'une expression.
 *
 *
 * @Auteur Rémi Angot
 * 3L10
 */
function Oppose_expression() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Donner l'opposé d'une expression";
  this.consigne = "Développer et réduire les expressions suivantes.";
  this.spacing = 1;
  this.nb_questions = 6;
  sortie_html ? (this.spacing_corr = 2) : (this.spacing_corr = 1);

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles = ["-(ax+b)", "-(ax2+bx+c)"];
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texte_corr, a, b, c, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      c = randint(-11, 11, 0);
      a = randint(-9, 9, 0);
      b = randint(-9, 9, 0);
      switch (liste_type_de_questions[i]) {
        case "-(ax+b)":
          texte = `$${lettre_depuis_chiffre(i + 1)}=-(${printlatex(
            `${a}x+(${b})`
          )})$`;
          texte_corr = texte;
          texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(
            i + 1
          )}}=${printlatex(`${-a}*x+(${-b})`)}$`;
          break;
        case "-(ax2+bx+c)":
          texte = `$${lettre_depuis_chiffre(i + 1)}=-(${printlatex(
            `${a}x^2+(${b})x+(${c})`
          )})$`;
          texte_corr = texte;
          texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(
            i + 1
          )}}=${printlatex(`${-a}x^2+(${-b})x+(${-c})`)}$`;
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
  // this.besoin_formulaire_numerique = ['Niveau de difficulté',2,'1 : Multiplication par un facteur positif\n2: Multiplication par un facteur relatif']
}

/**
 * Développer et réduire des expressions avec des parenthèses précédées d'un signe + ou -
 *
 *
 * @Auteur Rémi Angot
 * 3L10-1
 */
function Parentheses_precedes_de_moins_ou_plus() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Additionner ou soustraire une expression entre parenthèses";
  this.consigne = "Développer et réduire les expressions suivantes.";
  this.spacing = 1;
  this.nb_questions = 5;
  this.nb_cols_corr = 1;

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles = ["a-()", "a+()"];
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texte_corr, a, b, k, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      k = randint(-11, 11, 0);
      a = randint(-9, 9, 0);
      b = randint(-9, 9, 0);
      switch (liste_type_de_questions[i]) {
        case "a-()":
          // k-(ax+b)
          texte = `$${lettre_depuis_chiffre(i + 1)}=${k}-(${printlatex(
            `${a}x+(${b})`
          )})$`;
          texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${k}-(${printlatex(
            `${a}x+(${b})`
          )})$`;
          texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(
            i + 1
          )}}=${printlatex(`${k}+(${-a}*x)+(${-b})`)}=${printlatex(
            `${-a}*x+(${k - b})`
          )}$`;
          break;
        case "a+()":
          // k-(ax+b)
          texte = `$${lettre_depuis_chiffre(i + 1)}=${k}+(${printlatex(
            `${a}x+(${b})`
          )})$`;
          texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${k}+(${printlatex(
            `${a}x+(${b})`
          )})$`;
          texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(
            i + 1
          )}}=${printlatex(`${k}+(${a}*x)+(${b})`)}=${printlatex(
            `${a}*x+(${k + b})`
          )}$`;
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
  // this.besoin_formulaire_numerique = ['Niveau de difficulté',2,'1 : Multiplication par un facteur positif\n2: Multiplication par un facteur relatif']
}

/**
 * Développer en utilisant la distributivité simple
 *
 * * La lettre peut être x, y, z, t, a, b ou c
 * * 3 fois sur 6 c'est une distributivité simple :  k(ax+b)
 * * 1 fois sur 6 c'est une distributivité simple : (ax+b)×k
 * * 1 fois sur 6, la variable est en facteur : kx(ax+b)
 * * 1 fois sur 6 il faut ensuite réduire : k(ax+b)+c
 *
 * Niveau de difficulté :
 * * 1 : Multiplication par un facteur positif
 * * 2: Multiplication par un facteur relatif
 * @Auteur Rémi Angot
 * 4L10 et 3L11
 */
function Exercice_developper(difficulte = 1) {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = difficulte;
  this.titre = "Utiliser la simple distributivité";
  this.consigne = "Développer.";
  this.spacing = 1;
  this.nb_questions = 5;
  this.nb_cols_corr = 1;

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let lettre = ["x", "y", "z", "t", "a", "b", "c"];
    let type_de_questions_disponibles = [
      "simple",
      "simple",
      "simple2",
      "x_en_facteur",
      "developper_et_reduire",
    ];
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texte_corr, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      type_de_questions = liste_type_de_questions[i];
      let k = randint(2, 11);
      if (this.sup > 1) {
        // si difficulté 2, k peut être négatif
        k = k * choice([-1, 1]);
      }
      let a = randint(1, 9);
      let b = randint(1, 9) * choice([-1, 1]);
      let inconnue = choice(lettre);
      switch (type_de_questions) {
        case "simple":
          if (a == 1) {
            // ne pas écrire 1x
            texte = `$${lettre_depuis_chiffre(
              i + 1
            )}=${k}(${inconnue}${ecriture_algebrique(b)})$`;
          } else {
            texte = `$${lettre_depuis_chiffre(
              i + 1
            )}=${k}(${a}${inconnue}${ecriture_algebrique(b)})$`;
          }

          if (a == 1) {
            // ne pas écrire 1x
            texte_corr = `$${lettre_depuis_chiffre(
              i + 1
            )}=${k}(${inconnue}${ecriture_algebrique(b)})=${k}
						\\times ${inconnue}+${ecriture_parenthese_si_negatif(
              k
            )}\\times${ecriture_parenthese_si_negatif(b)}=${k * a
              }${inconnue}${ecriture_algebrique(k * b)}$`;
          } else {
            texte_corr = `$${lettre_depuis_chiffre(
              i + 1
            )}=${k}(${a}${inconnue}${ecriture_algebrique(b)})=${k}
						\\times ${a}${inconnue}+${ecriture_parenthese_si_negatif(
              k
            )}\\times${ecriture_parenthese_si_negatif(b)}=${k * a
              }${inconnue}${ecriture_algebrique(k * b)}$`;
          }
          break;
        case "simple2":
          if (a == 1) {
            // ne pas écrire 1x
            texte = `$${lettre_depuis_chiffre(
              i + 1
            )}=(${inconnue}${ecriture_algebrique(
              b
            )})\\times${ecriture_parenthese_si_negatif(k)}$`;
          } else {
            texte = `$${lettre_depuis_chiffre(
              i + 1
            )}=(${a}${inconnue}${ecriture_algebrique(
              b
            )})\\times${ecriture_parenthese_si_negatif(k)}$`;
          }

          if (a == 1) {
            // ne pas écrire 1x
            texte_corr = `$${lettre_depuis_chiffre(
              i + 1
            )}=(${inconnue}${ecriture_algebrique(
              b
            )})\\times${ecriture_parenthese_si_negatif(k)}=${k}
						\\times ${inconnue}+${ecriture_parenthese_si_negatif(
              k
            )}\\times${ecriture_parenthese_si_negatif(b)}=${k * a
              }${inconnue}${ecriture_algebrique(k * b)}$`;
          } else {
            texte_corr = `$${lettre_depuis_chiffre(
              i + 1
            )}=(${a}${inconnue}${ecriture_algebrique(
              b
            )})\\times${ecriture_parenthese_si_negatif(k)}=${k}
						\\times ${a}${inconnue}+${ecriture_parenthese_si_negatif(
              k
            )}\\times${ecriture_parenthese_si_negatif(b)}=${k * a
              }${inconnue}${ecriture_algebrique(k * b)}$`;
          }
          break;
        case "x_en_facteur":
          if (a == 1) {
            // ne pas écrire 1x
            texte = `$${lettre_depuis_chiffre(
              i + 1
            )}=${k}${inconnue}(${inconnue}${ecriture_algebrique(b)})$`;
          } else {
            texte = `$${lettre_depuis_chiffre(
              i + 1
            )}=${k}${inconnue}(${a}${inconnue}${ecriture_algebrique(b)})$`;
          }

          if (a == 1) {
            // ne pas écrire 1x
            texte_corr = `$${lettre_depuis_chiffre(
              i + 1
            )}=${k}${inconnue}(${inconnue}${ecriture_algebrique(
              b
            )})=${k}${inconnue}\\times ${inconnue} ${signe(
              k * b
            )}${k}${inconnue}\\times ${abs(b)}=${k * a
              }${inconnue}^2${ecriture_algebrique(k * b)}${inconnue}$`;
          } else {
            if (k > 0) {
              texte_corr = `$${lettre_depuis_chiffre(
                i + 1
              )}=${k}${inconnue}(${a}${inconnue}${ecriture_algebrique(
                b
              )})=${k}${inconnue}\\times ${a}${inconnue} + ${k}${inconnue}\\times ${ecriture_parenthese_si_negatif(
                b
              )}=${k * a}${inconnue}^2${ecriture_algebrique(
                k * b
              )}${inconnue}$`;
            } else {
              texte_corr = `$${lettre_depuis_chiffre(
                i + 1
              )}=${k}${inconnue}(${a}${inconnue}${ecriture_algebrique(
                b
              )})=${k}${inconnue}\\times ${a}${inconnue} + (${k}${inconnue})\\times ${ecriture_parenthese_si_negatif(
                b
              )}=${k * a}${inconnue}^2${ecriture_algebrique(
                k * b
              )}${inconnue}$`;
            }
          }
          break;
        case "developper_et_reduire":
          let c = randint(2, 9);
          if (a == 1) {
            // ne pas écrire 1x
            texte = `$${lettre_depuis_chiffre(
              i + 1
            )}=${k}(${inconnue}${ecriture_algebrique(b)})+${c}$`;
          } else {
            texte = `$${lettre_depuis_chiffre(
              i + 1
            )}=${k}(${a}${inconnue}${ecriture_algebrique(b)})+${c}$`;
          }

          if (a == 1) {
            // ne pas écrire 1x
            texte_corr = `$${lettre_depuis_chiffre(
              i + 1
            )}=${k}(${inconnue}${ecriture_algebrique(
              b
            )})+${c}=${k}\\times ${inconnue}+${ecriture_parenthese_si_negatif(
              k
            )}\\times${ecriture_parenthese_si_negatif(b)}+${c}
						=${k * a}${inconnue}${ecriture_algebrique(k * b)}+${c}=${k * a
              }${inconnue}${ecriture_algebrique(k * b + c)}$`;
          } else {
            texte_corr = `$${lettre_depuis_chiffre(
              i + 1
            )}=${k}(${a}${inconnue}${ecriture_algebrique(
              b
            )})+${c}=${k}\\times${ecriture_parenthese_si_moins(
              a + inconnue
            )}+${ecriture_parenthese_si_negatif(
              k
            )}\\times${ecriture_parenthese_si_negatif(b)}+${c}
						=${k * a}${inconnue}${ecriture_algebrique(k * b)}+${c}=${k * a
              }${inconnue}${ecriture_algebrique(k * b + c)}$`;
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
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = [
    "Niveau de difficulté",
    2,
    "1 : Multiplication par un facteur positif\n2: Multiplication par un facteur relatif",
  ];
}



/**
 * Réduire, si possible, une expression littérale simple
 * 
 * * ax+b
 * * a+bx
 * * ax-a
 * * ax+bx
 * * ax+x
 * * ax×b
 * * a×bx
 * * ax×bx
 * * ax+0
 * * ax×0
 * * ax^2×x
 * * ax^2-a
 * * ax^2-ax
 * 
 * 
 * @Auteur Rémi Angot
 * 4L10-1
 */
function Reductions_pieges_classiques() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Réduire, si possible, une expression littérale simple";
  this.consigne = "Réduire, si possible, les expressions suivantes";
  this.spacing = 1;
  this.nb_questions = 10;
  this.sup = true;

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = [
      'ax+b',
      'a+bx',
      'ax-a',
      'ax+bx',
      'ax+x',
      'ax×b',
      'a×bx',
      'ax×bx',
      'ax+0',
      'ax×0',
      'ax^2×x',
      'ax^2-a',
      'ax^2-ax^2'
    ];
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texte_corr, a, b, cpt = 0; i < this.nb_questions && cpt < 50;) {
      type_de_questions = liste_type_de_questions[i];
      a = randint(2, 11)
      b = randint(2, 11)
      if (this.sup) {
        a *= choice([-1, 1])
        b *= choice([-1, 1])
      }
      switch (type_de_questions) {
        case "ax+b":
          texte = `$${lettre_depuis_chiffre(i + 1)}=${a}x${ecriture_algebrique(b)}$`
          texte_corr = texte
          break;
        case "a+bx":
          texte = `$${lettre_depuis_chiffre(i + 1)}=${a}${ecriture_algebrique(b)}x$`
          texte_corr = texte
          break;
        case "ax-a":
          texte = `$${lettre_depuis_chiffre(i + 1)}=${Math.abs(a)}x-${Math.abs(a)}$`
          texte_corr = texte
          break;
        case "ax+bx":
          texte = `$${lettre_depuis_chiffre(i + 1)}=${a}x${ecriture_algebrique(b)}x$`
          texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${a}x${ecriture_algebrique(b)}x=${a + b}x$`
          break;
        case "ax+x":
          texte = `$${lettre_depuis_chiffre(i + 1)}=${a}x+x$`
          texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${a}x+x=${a + 1}x$`
          break;
        case "ax×b":
          texte = `$${lettre_depuis_chiffre(i + 1)}=${a}x\\times${ecriture_parenthese_si_negatif(b)}$`
          texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${a}x\\times${ecriture_parenthese_si_negatif(b)}=${a * b}x$`
          break;
        case "a×bx":
          texte = `$${lettre_depuis_chiffre(i + 1)}=${a}\\times${ecriture_parenthese_si_moins(b + 'x')}$`
          texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${a}\\times${ecriture_parenthese_si_moins(b + 'x')}=${a * b}x$`
          break;
        case "ax×bx":
          texte = `$${lettre_depuis_chiffre(i + 1)}=${ecriture_parenthese_si_moins(a + 'x')}\\times${ecriture_parenthese_si_moins(b + 'x')}$`
          texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${ecriture_parenthese_si_moins(a + 'x')}\\times${ecriture_parenthese_si_moins(b + 'x')}=${a * b}x^2$`
          break;
        case "ax+0":
          texte = `$${lettre_depuis_chiffre(i + 1)}=${a}x+0$`
          texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${a}x+0=${a}x$`
          break;
        case "ax×0":
          texte = `$${lettre_depuis_chiffre(i + 1)}=${a}x\\times 0$`
          texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${a}x\\times 0=0$`
          break;
        case "ax^2×x":
          texte = `$${lettre_depuis_chiffre(i + 1)}=${ecriture_parenthese_si_moins(a + 'x^2')}\\times x$`
          texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${ecriture_parenthese_si_moins(a + 'x^2')}\\times x=${ecriture_parenthese_si_moins(a + 'x^3')}$`
          break;
        case "ax^2-a":
          a = Math.abs(a)
          texte = `$${lettre_depuis_chiffre(i + 1)}=${ecriture_parenthese_si_moins(a + 'x^2')}-${a}$`
          texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${ecriture_parenthese_si_moins(a + 'x^2')}-${a}$`
          break;
        case "ax^2-ax^2":
          a = Math.abs(a)
          texte = `$${lettre_depuis_chiffre(i + 1)}=${a}x^2-${a}x^2$`
          texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${a}x^2-${a}x^2=0$`
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
  this.besoin_formulaire_case_a_cocher = ['Avec des nombres relatifs']
}

/**
 * Équation du premier degré
 * * Type 1 : x+a=b ou ax=b
 * * Type 2 : ax+b=c
 * * Type 3 : ax+b=cx+d
 * * Tous les types
 * @Auteur Rémi Angot
 * 4L20 et 3L13
 */
function Exercice_equation1() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Équation du premier degré";
  this.consigne = "Résoudre les équations suivantes";
  this.spacing = 2;
  sortie_html ? (this.spacing_corr = 3) : (this.spacing_corr = 2);
  this.correction_detaillee_disponible = true;
  if (!sortie_html) {
    this.correction_detaillee = false;
  }
  this.sup = true; // Avec des nombres relatifs
  this.sup2 = 4; // Choix du type d'équation
  this.nb_questions = 6;

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    switch (this.sup2.toString()) {
      case "1":
        liste_type_de_questions = ["ax=b", "x+b=c"];
        break;
      case "2":
        liste_type_de_questions = ["ax+b=c"];
        break;
      case "3":
        liste_type_de_questions = ["ax+b=cx+d"];
        break;
      default:
        liste_type_de_questions = [
          "ax+b=0",
          "ax+b=c",
          "ax=b",
          "x+b=c",
          "ax+b=cx+d",
        ];
        break;
    }
    liste_type_de_questions = combinaison_listes(
      liste_type_de_questions,
      this.nb_questions
    );
    for (
      let i = 0, a, b, c, d, texte, texte_corr, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      // On limite le nombre d'essais pour chercher des valeurs nouvelles
      a = randint(2, 13);
      b = randint(1, 13);
      c = randint(1, 13);
      d = randint(1, 13);
      if (this.sup) {
        a *= choice([-1, 1]);
        b *= choice([-1, 1]);
        c *= choice([-1, 1]);
        d *= choice([-1, 1]);
      }
      if (
        liste_type_de_questions[i] == "ax+b=0" ||
        liste_type_de_questions[i] == "ax+b=c"
      ) {
        if (liste_type_de_questions[i] == "ax+b=0") {
          c = 0;
        }
        if (!this.sup && c < b) {
          b = randint(1, 9);
          c = randint(b, 15); // c sera plus grand que b pour que c-b>0
        }
        texte = `$${a}x${ecriture_algebrique(b)}=${c}$`;
        texte_corr = texte + "<br>";
        if (this.correction_detaillee) {
          if (b > 0) {
            texte_corr += `On soustrait $${b}$ aux deux membres.<br>`;
          } else {
            texte_corr += `On ajoute $${-1 * b}$ aux deux membres.<br>`;
          }
        }
        texte_corr += `$${a}x${ecriture_algebrique(b)}${mise_en_evidence(
          ecriture_algebrique(-1 * b)
        )}=${c}${mise_en_evidence(ecriture_algebrique(-1 * b))}$<br>`;
        texte_corr += `$${a}x=${c - b}$<br>`;
        if (this.correction_detaillee) {
          texte_corr += `On divise les deux membres par $${a}$.<br>`;
        }
        texte_corr += `$${a}x${mise_en_evidence(
          "\\div" + ecriture_parenthese_si_negatif(a)
        )}=${c - b + mise_en_evidence("\\div" + ecriture_parenthese_si_negatif(a))
          }$<br>`;
        texte_corr += `$x=${tex_fraction(c - b, a)}$`;
        if (pgcd(abs(a), abs(c - b)) > 1 || a < 0) {
          texte_corr += `<br>$x=${tex_fraction_reduite(c - b, a)}$`;
        }
        texte_corr += `<br> La solution est $${tex_fraction_reduite(
          c - b,
          a
        )}$.`;
      }
      if (liste_type_de_questions[i] == "x+b=c") {
        if (!this.sup && c < b) {
          b = randint(-9, 9, [0]); // b peut être négatif, ça sera une équation du type x-b=c
          c = abs(randint(b, 15)); // c sera plus grand que b pour que c-b>0
        }
        texte = `$x${ecriture_algebrique(b)}=${c}$`;
        texte_corr = texte + "<br>";
        if (this.correction_detaillee) {
          if (b > 0) {
            texte_corr += `On soustrait $${b}$ aux deux membres.<br>`;
          } else {
            texte_corr += `On ajoute $${-1 * b}$ aux deux membres.<br>`;
          }
        }
        texte_corr += `$x${ecriture_algebrique(b)}${mise_en_evidence(
          ecriture_algebrique(-1 * b)
        )}=${c}${mise_en_evidence(ecriture_algebrique(-1 * b))}$<br>`;
        texte_corr += `$x=${c - b}$`;
        texte_corr += `<br> La solution est $${c - b}$.`;
      }
      if (liste_type_de_questions[i] == "ax=b") {
        texte = `$${a}x=${b}$`;
        texte_corr = texte + "<br>";
        if (this.correction_detaillee) {
          texte_corr += `On divise les deux membres par $${a}$.<br>`;
        }
        texte_corr += `$${a}x${mise_en_evidence(
          "\\div" + ecriture_parenthese_si_negatif(a)
        )}=${b + mise_en_evidence("\\div" + ecriture_parenthese_si_negatif(a))
          }$<br>`;
        texte_corr += `$x=${tex_fraction(b, a)}$`;
        if (pgcd(abs(a), abs(b)) > 1 || a < 0) {
          texte_corr += `<br>$x=${tex_fraction_reduite(b, a)}$`;
        }
        texte_corr += `<br> La solution est $${tex_fraction_reduite(b, a)}$.`;
      }
      if (liste_type_de_questions[i] == "ax+b=cx+d") {
        if (c == a) {
          c = randint(1, 13, [a]);
        } // sinon on arrive à une division par 0
        if (!this.sup && a < c) {
          c = randint(1, 9);
          a = randint(c + 1, 15); // a sera plus grand que c pour que a-c>0
        }
        if (!this.sup && d < b) {
          b = randint(1, 9);
          d = randint(b + 1, 15); // d sera plus grand que b pour que d-b>0
        }
        texte = `$${rien_si_1(a)}x${ecriture_algebrique(b)}=${rien_si_1(
          c
        )}x${ecriture_algebrique(d)}$`;
        texte_corr = texte + "<br>";
        if (this.correction_detaillee) {
          if (c > 0) {
            texte_corr += `On soustrait $${rien_si_1(
              c
            )}x$ aux deux membres.<br>`;
          } else {
            texte_corr += `On ajoute $${rien_si_1(
              -1 * c
            )}x$ aux deux membres.<br>`;
          }
        }
        texte_corr += `$${rien_si_1(a)}x${ecriture_algebrique(
          b
        )}${mise_en_evidence(
          signe(-1 * c) + rien_si_1(abs(c)) + "x"
        )}=${c}x${ecriture_algebrique(d)}${mise_en_evidence(
          signe(-1 * c) + rien_si_1(abs(c)) + "x"
        )}$<br>`;
        texte_corr += `$${rien_si_1(a - c)}x${ecriture_algebrique(
          b
        )}=${d}$<br>`;
        if (this.correction_detaillee) {
          if (b > 0) {
            texte_corr += `On soustrait $${b}$ aux deux membres.<br>`;
          } else {
            texte_corr += `On ajoute $${-1 * b}$ aux deux membres.<br>`;
          }
        }
        texte_corr += `$${rien_si_1(a - c)}x${ecriture_algebrique(
          b
        )}${mise_en_evidence(
          ecriture_algebrique(-1 * b)
        )}=${d}${mise_en_evidence(ecriture_algebrique(-1 * b))}$<br>`;
        texte_corr += `$${rien_si_1(a - c)}x=${d - b}$<br>`;

        if (this.correction_detaillee) {
          texte_corr += `On divise les deux membres par $${a - c}$.<br>`;
        }
        texte_corr += `$${rien_si_1(a - c)}x${mise_en_evidence(
          "\\div" + ecriture_parenthese_si_negatif(a - c)
        )}=${d -
          b +
          mise_en_evidence("\\div" + ecriture_parenthese_si_negatif(a - c))
          }$<br>`;
        texte_corr += `$x=${tex_fraction(d - b, a - c)}$`;
        if (pgcd(abs(d - b), abs(a - c)) > 1 || a - c < 0) {
          texte_corr += `<br>$x=${tex_fraction_reduite(d - b, a - c)}$`;
        }
        texte_corr += `<br> La solution est $${tex_fraction_reduite(
          d - b,
          a - c
        )}$.`;
      }

      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.liste_questions.push(texte); //replace(/1x/g,'x')); //remplace 1x par x
        this.liste_corrections.push(texte_corr); //.replace(/1x/g,'x')); //remplace 1x par x
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_case_a_cocher = ["Avec des nombres relatifs"];
  this.besoin_formulaire2_numerique = [
    "Type d'équations",
    4,
    "1 : ax=b ou x+a=b ou x-a=b\n2: ax+b=c\n3: ax+b=cx+d\n4: Les 2 types précédents",
  ];
}

/**
 * @auteur Jean-Claude Lhote
 * 3G20MG32
 */
function Exercice_Thales() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Déterminer une longueur avec la propriété de Thales (MG32)";
  this.consigne = "";
  this.nb_questions = 1;
  this.nb_questions_modifiable = false;
  sortie_html ? (this.spacing_corr = 3.5) : (this.spacing_corr = 1);
  sortie_html ? (this.spacing = 2) : (this.spacing = 1.5);
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.quatrieme = false;
  this.sup = 1; // 1 calcul direct | 2 calcul en deux étapes | 3 version 1&2 sans figure
  this.liste_packages = "tkz-euclide";
  // paramètres communs Html ou Latex

  // let s1='A',s2='B',s3='C',s4='M',s5='N'
  // coefficient de l'homothétie compris entre -0,8 et -0,2 ou entre 0,2 et 0,8 pour éviter les constructions trop serrées
  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = [];
    this.liste_corrections = [];
    let lettre1 = randint(1, 26); // aleatoirisation du nom des points
    let s1 = lettre_depuis_chiffre(lettre1);
    let lettre2 = randint(1, 26, [lettre1]);
    let s2 = lettre_depuis_chiffre(lettre2);
    let lettre3 = randint(1, 26, [lettre1, lettre2]);
    let s3 = lettre_depuis_chiffre(lettre3);
    let lettre4 = randint(1, 26, [lettre1, lettre2, lettre3]);
    let s4 = lettre_depuis_chiffre(lettre4);
    let lettre5 = randint(1, 26, [lettre1, lettre2, lettre3, lettre4]);
    let s5 = lettre_depuis_chiffre(lettre5);
    let x2 = randint(2, 4);
    let y2 = randint(3, 5);
    let x3 = randint(5, 6);
    let y3 = randint(-2, 1);
    let k = (randint(2, 8) * randint(-1, 1, [0])) / 10;
    if (this.quatrieme) {
      k = abs(k);
    }
    let dist23 = arrondi(Math.sqrt((x3 - x2) ** 2 + (y3 - y2) ** 2), 1); //calcul des longueurs du triangle principal
    let dist12 = arrondi(Math.sqrt(x2 ** 2 + y2 ** 2), 1);
    let dist13 = arrondi(Math.sqrt(x3 ** 2 + y3 ** 2), 1);
    let dist15 = arrondi(dist13 * abs(k), 2);
    let dist45 = arrondi(dist23 * abs(k), 2);
    let dist35, texte, texte_corr;
    let dist14 = arrondi(dist12 * abs(k), 2); // calcul des longueurs demandées à partir

    // On ne garde qu'une approximation au dixième pour l'exercice

    let s45 = tex_nombrec(dist45); // mise en texte avec 1 chiffres après la virgule pour énoncé
    let s13 = tex_nombrec(dist13);
    let s12 = tex_nombrec(dist12);
    let s15 = tex_nombrec(dist15);
    let s14 = tex_nombrec(dist14);
    let s23 = tex_nombrec(dist23);
    if (k < 0) {
      dist35 = dist13 + dist15;
    } else {
      dist35 = dist13 - dist15;
    } // calcul de la longueur intermédiaire dans un cas classique ou en papillon
    let s35 = tex_nombrec(dist35); // à priori, c'est déjà arrondi au dixième, mais je me méfie des calculs flottants en js
    let niv_diff = randint(1, 2);
    if (sortie_html) {
      this.type_exercice = "MG32";
      this.taille_div_MG32 = [700, 500];
      let codeBase64;

      if (k < 0) {
        codeBase64 =
          "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACX#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAJBJwBANgAAAAAAAEAzAAAAAAAABwABQHYBR64UeuFAcdwo9cKPXP####8AAAABABRDRHJvaXRlRGlyZWN0aW9uRml4ZQD#####AQAAAAAQAAABAAEAAAABAT#wAAAAAAAA#####wAAAAEAD0NQb2ludExpZURyb2l0ZQD#####AQAAAAAQAAJJJwDAGAAAAAAAAAAAAAAAAAAABQABQEerQ5WBBiUAAAAC#####wAAAAEACUNEcm9pdGVBQgD#####AQAAAAASAAABAAEAAAABAAAAA#####8AAAABABZDRHJvaXRlUGVycGVuZGljdWxhaXJlAP####8BAAAAABAAAAEAAQAAAAEAAAAE#####wAAAAEACUNDZXJjbGVPQQD#####AQAAAAABAAAAAQAAAAP#####AAAAAQAQQ0ludERyb2l0ZUNlcmNsZQD#####AAAABQAAAAb#####AAAAAQAQQ1BvaW50TGllQmlwb2ludAD#####AQAAAAAQAAABBQABAAAABwAAAAkA#####wEAAAAAEAACSicAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAASAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MgABMgAAAAFAAAAAAAAAAAAAABEA#####wACeTIAATUAAAABQBQAAAAAAAAAAAARAP####8AAngzAAE2AAAAAUAYAAAAAAAAAAAAEQD#####AAJ5MwACLTH#####AAAAAQAMQ01vaW5zVW5haXJlAAAAAT#wAAAAAAAAAAAAEQD#####AAFrAAQtMC41AAAAEgAAAAE#4AAAAAAAAP####8AAAABABBDUG9pbnREYW5zUmVwZXJlAP####8BAAAAABgAAlonAAAAAAAAAAAAQAgAAAAAAAAHAAAAAAoAAAABAAAAAAAAAAAAAAABAAAAAAAAAAAAAAATAP####8AAAAAABgAAkInAMAwAAAAAAAAwEOAAAAAAAAHAAAAAAoAAAAOAAAADwAAAA4AAAAQAAAAEwD#####AAAAAAAYAAJDJwAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAADgAAABEAAAAOAAAAEgAAAAwA#####wAAABQAAAAOAAAAEwAAAA8A#####wAAAAAAGAACTScAwCQAAAAAAADAAAAAAAAAAAcAAAAAFQAAABcAAAAPAP####8AAAAAABgAAk4nAMAzAAAAAAAAwEMAAAAAAAAHAAAAABYAAAAX#####wAAAAEACUNQb2x5Z29uZQD#####AAAAAAACAAAABAAAABYAAAAVAAAAFAAAABYAAAAUAP####8AAAAAAAIAAAAEAAAAGQAAABQAAAAYAAAAGf####8AAAABABBDU3VyZmFjZVBvbHlnb25lAP####8BAAD#AAAABQAAABsAAAAVAP####8B#wAAAAAABQAAABr#####AAAAAQAQQ01hY3JvQXBwYXJpdGlvbgD#####AP8AAAH#####EECIoKPXCj1xQELhR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAZBcHBBTU4AAAAAAAEAAAAcAAAAABYA#####wD#AAAB#####xBAiLCj1wo9cUBUMKPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAGQXBwQUJDAAAAAAABAAAAHQD#####AAAAAQARQ01hY3JvRGlzcGFyaXRpb24A#####wD#AAAB#####xBAi+Cj1wo9cUBE4UeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAHTWFzcUFNTgAAAAAAAQAAABwAAAAXAP####8A#wAAAf####8QQIvoo9cKPXFAVPCj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAB01hc3FBQkMAAAAAAAEAAAAd#####wAAAAEAC0NNYWNyb1BhdXNlAP####8A#wAAAf####8QQIj4o9cKPXFAX3Cj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAABVBhdXNlAAAAAAAB#####wAAAAEAEUNNYWNyb1N1aXRlTWFjcm9zAP####8A#wAAAf####8QQFHFHrhR64VAePwo9cKPXAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAClRyaWFuZ2xlIDEAAAAAAAMAAAAfAAAAIgAAACEAAAAZAP####8A#wAAAf####8QQFFFHrhR64VAe3wo9cKPXAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAClRyaWFuZ2xlIDIAAAAAAAMAAAAeAAAAIgAAACAAAAAO##########8=";
      } else {
        codeBase64 =
          "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACX#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAJBJwDAKAAAAAAAAEAiAAAAAAAABwABQHMxR64UeuFAcbwo9cKPXP####8AAAABABRDRHJvaXRlRGlyZWN0aW9uRml4ZQD#####AQAAAAAOAAABAAEAAAABAT#wAAAAAAAA#####wAAAAEAD0NQb2ludExpZURyb2l0ZQD#####AQAAAAAQAAJJJwDAGAAAAAAAAAAAAAAAAAAABQABQEerQ5WBBiUAAAAC#####wAAAAEACUNEcm9pdGVBQgD#####AQAAAAASAAABAAEAAAABAAAAA#####8AAAABABZDRHJvaXRlUGVycGVuZGljdWxhaXJlAP####8BAAAAAA4AAAEAAQAAAAEAAAAE#####wAAAAEACUNDZXJjbGVPQQD#####AQAAAAABAAAAAQAAAAP#####AAAAAQAQQ0ludERyb2l0ZUNlcmNsZQD#####AAAABQAAAAb#####AAAAAQAQQ1BvaW50TGllQmlwb2ludAD#####AQAAAAAOAAABBQABAAAABwAAAAkA#####wEAAAAAEAACSicAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAASAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MgABMgAAAAFAAAAAAAAAAAAAABEA#####wACeTIAATUAAAABQBQAAAAAAAAAAAARAP####8AAngzAAE2AAAAAUAYAAAAAAAAAAAAEQD#####AAJ5MwACLTH#####AAAAAQAMQ01vaW5zVW5haXJlAAAAAT#wAAAAAAAAAAAAEQD#####AAFrAAMwLjUAAAABP+AAAAAAAAD#####AAAAAQAQQ1BvaW50RGFuc1JlcGVyZQD#####AQAAAAAYAAJaJwAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAEwD#####AAAAAAAYAAJCJwDAMAAAAAAAAMBDgAAAAAAABwAAAAAKAAAADgAAAA8AAAAOAAAAEAAAABMA#####wAAAAAAGAACQycAAAAAAAAAAABACAAAAAAAAAcAAAAACgAAAA4AAAARAAAADgAAABIAAAAMAP####8AAAAUAAAADgAAABMAAAAPAP####8AAAAAABgAAk0nAMA7AAAAAAAAwDcAAAAAAAAHAAAAABUAAAAXAAAADwD#####AAAAAAAYAAJOJwDAKAAAAAAAAEAAAAAAAAAABwAAAAAWAAAAF#####8AAAABAAlDUG9seWdvbmUA#####wAAAAAAAgAAAAQAAAAWAAAAFQAAABQAAAAWAAAAFAD#####AAAAAAACAAAABAAAABkAAAAUAAAAGAAAABn#####AAAAAQAQQ1N1cmZhY2VQb2x5Z29uZQD#####AQAA#wAAAAUAAAAbAAAAFQD#####Af8AAAAAAAUAAAAa#####wAAAAEAEENNYWNyb0FwcGFyaXRpb24A#####wD#AAAB#####xBAiKCj1wo9cUBC4UeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAGQXBwQU1OAAAAAAABAAAAHAAAAAAWAP####8A#wAAAf####8QQIiwo9cKPXFAVDCj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAABkFwcEFCQwAAAAAAAQAAAB0A#####wAAAAEAEUNNYWNyb0Rpc3Bhcml0aW9uAP####8A#wAAAf####8QQIvgo9cKPXFAROFHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAAB01hc3FBTU4AAAAAAAEAAAAcAAAAFwD#####AP8AAAH#####EECL6KPXCj1xQFTwo9cKPXACAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAdNYXNxQUJDAAAAAAABAAAAHf####8AAAABAAtDTWFjcm9QYXVzZQD#####AP8AAAH#####EECI+KPXCj1xQF9wo9cKPXACAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAVQYXVzZQAAAAAAAf####8AAAABABFDTWFjcm9TdWl0ZU1hY3JvcwD#####AP8AAAH#####EEBRxR64UeuFQHj8KPXCj1wCAAAAAAAAAAAAAAAAAQAAAAAAAAAAAApUcmlhbmdsZSAxAAAAAAADAAAAHwAAACIAAAAhAAAAGQD#####AP8AAAH#####EEBRRR64UeuFQHt8KPXCj1wCAAAAAAAAAAAAAAAAAQAAAAAAAAAAAApUcmlhbmdsZSAyAAAAAAADAAAAHgAAACIAAAAgAAAADv##########";
      }
      if (this.sup == 1) {
        // calcul direct de AM et BC : pas de calcul intermédiaire de AN
        texte = `Dans la figure ci-dessous, les droites $(${s4 + s5})$ et $(${s2 + s3
          })$ sont parallèles.<br> $${s1 + s2}=${s12}$ cm, $${s1 + s3
          }=${s13}$ cm, $${s4 + s5}=${s45}$ cm et $${s1 + s5}=${s15}$ cm.<br>`;
        texte += `Calculer $${s1 + s4}$ et $${s2 + s3}$.`;
        if (k > 0) {
          texte_corr =
            "Dans le triangle " +
            `$${s1 + s2 + s3}$` +
            ", les droites " +
            `$(${s4 + s5})$` +
            " et " +
            `$(${s2 + s3})$` +
            " sont parallèles.<br>" +
            " D&rsquo;après la propriété de Thales, on a " +
            `$${tex_fraction(s1 + s4, s1 + s2)}=${tex_fraction(
              s1 + s5,
              s1 + s3
            )}=${tex_fraction(s4 + s5, s2 + s3)}.$` +
            "<br>";
        } else {
          texte_corr =
            "Les droites " +
            `$(${s4 + s5})$` +
            " et " +
            `$(${s2 + s3})$` +
            " sont parallèles.";
          texte_corr += `<br>Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés dans cet ordre.`;
          texte_corr +=
            "<br>D&rsquo;après la propriété de Thales, on a " +
            `$${tex_fraction(s1 + s4, s1 + s2)}=${tex_fraction(
              s1 + s5,
              s1 + s3
            )}=${tex_fraction(s4 + s5, s2 + s3)}$` +
            "<br>";
        }
      } else if (this.sup == 2) {
        // Calcul de AN nécessaire avant de calculer AM et BC
        texte = `Dans la figure ci-dessous, les droites $(${s4 + s5})$ et $(${s2 + s3
          })$ sont parallèles.<br> $${s1 + s2}=${s12}$ cm, $${s1 + s3
          }=${s13}$ cm, $${s4 + s5}=${s45}$ cm et $${s5 + s3}=${s35}$ cm.`;
        texte += `<br>Le point $${s1}$ peut être déplacé.<br>`;
        texte += `Calculer $${s1 + s4}$ et $${s2 + s3}$.`;
        if (k > 0) {
          texte_corr =
            "Dans le triangle " +
            `$${s1 + s2 + s3}$` +
            ", les droites " +
            `$(${s4 + s5})$` +
            " et " +
            `$(${s2 + s3})$` +
            " sont parallèles.<br>" +
            " D&rsquo;après la propriété de Thales, on a " +
            `$${tex_fraction(s1 + s4, s1 + s2)}=${tex_fraction(
              s1 + s5,
              s1 + s3
            )}=${tex_fraction(s4 + s5, s2 + s3)}.$` +
            "<br>";
        } else {
          texte_corr =
            `Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés dans cet ordre et les droites $(${s4 + s5
            })$ et $(${s2 + s3})$ sont parallèles.<br>` +
            " D&rsquo;après la propriété de Thales, on a " +
            `$${tex_fraction(s1 + s4, s1 + s2)}=${tex_fraction(
              s1 + s5,
              s1 + s3
            )}=${tex_fraction(s4 + s5, s2 + s3)}.$` +
            "<br>";
        }
        if (k > 0) {
          texte_corr +=
            "On sait que " +
            `$${s1 + s5}=${s1 + s3}-${s5 + s3}=${s13}-${s35}=${s15}$` +
            " cm.<br>";
        } else {
          texte_corr +=
            "On sait que " +
            `$${s1 + s5}=${s3 + s5}-${s1 + s3}=${s35}-${s13}=${s15}$` +
            " cm.<br>";
        }
      } else if (randint(1, 2) == 1) {
        texte = `$${s1}$, $${s2}$ et $${s3}$ sont trois point distincts. $${s4} \\in [${s1 + s2
          }]$ et $${s5} \\in [${s1 + s3}]$ tel que les droites $(${s4 + s5
          })$ et $(${s2 + s3})$ sont parallèles.<br> $${s1 + s2}=${s12}$ cm, $${s1 + s3
          }=${s13}$ cm, $${s4 + s5}=${s45}$ cm et $${s1 + s5}=${s15}$ cm.`;
        texte += `<br>Calculer $${s1 + s4}$ et $${s2 + s3}$.`;
        texte_corr =
          "Dans le triangle " +
          `$${s1 + s2 + s3}$` +
          ", les droites " +
          `$(${s4 + s5})$` +
          " et " +
          `$(${s2 + s3})$` +
          " sont parallèles.<br>" +
          " D&rsquo;après la propriété de Thales, on a " +
          `$${tex_fraction(s1 + s4, s1 + s2)}=${tex_fraction(
            s1 + s5,
            s1 + s3
          )}=${tex_fraction(s4 + s5, s2 + s3)}.$` +
          "<br>";
      } else {
        texte = `Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés dans cet ordre.`;
        texte += `<br>Les droites $(${s4 + s5})$ et $(${s2 + s3
          })$ sont parallèles.<br> $${s1 + s2}=${s12}$ cm, $${s1 + s3
          }=${s13}$ cm, $${s4 + s5}=${s45}$ cm et $${s5 + s3}=${s35}$ cm.`;
        texte += `<br>Calculer $${s1 + s4}$ et $${s2 + s3}$.`;
        if (k > 0) {
          texte_corr =
            "Dans le triangle " +
            `$${s1 + s2 + s3}$` +
            ", les droites " +
            `$(${s4 + s5})$` +
            " et " +
            `$(${s2 + s3})$` +
            " sont parallèles.<br>" +
            " D&rsquo;après la propriété de Thales, on a " +
            `$${tex_fraction(s1 + s4, s1 + s2)}=${tex_fraction(
              s1 + s5,
              s1 + s3
            )}=${tex_fraction(s4 + s5, s2 + s3)}.$` +
            "<br>";
        } else {
          texte_corr =
            `Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés et les droites $(${s4 + s5
            })$ et $(${s2 + s3})$ sont parallèles.<br>` +
            " D&rsquo;après la propriété de Thales, on a " +
            `$${tex_fraction(s1 + s4, s1 + s2)}=${tex_fraction(
              s1 + s5,
              s1 + s3
            )}=${tex_fraction(s4 + s5, s2 + s3)}.$` +
            "<br>";
        }
        if (k > 0) {
          texte_corr +=
            "On sait que " +
            `$${s1 + s5}=${s1 + s3}-${s5 + s3}=${s13}-${s35}=${s15}$` +
            " cm.<br>";
        } else {
          texte_corr +=
            "On sait que " +
            `$${s1 + s5}=${s3 + s5}-${s1 + s3}=${s35}-${s13}=${s15}$` +
            " cm.<br>";
        }
      }
      texte_corr += "Avec les données numériques :<br>";
      texte_corr +=
        `$${tex_fraction(s1 + s4, s12)}=${tex_fraction(
          s15,
          s13
        )}=${tex_fraction(s45, s2 + s3)}$` + "<br>";
      texte_corr +=
        `Soit $${s1 + s4}=` +
        quatrieme_proportionnelle(dist13, dist15, dist12, 1) +
        "$ cm";
      texte_corr +=
        ` et $${s2 + s3}=` +
        quatrieme_proportionnelle(dist15, dist13, dist45, 1) +
        "$ cm.";

      if (this.sup < 3) {
        this.MG32codeBase64 = codeBase64;
        this.MG32code_pour_modifier_la_figure = `
				mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "x3", "${x3}");
		        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "y2", "${y2}");
				mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "y3", "${y3}");
				mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "k", "${k}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","A'","${s1}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","B'","${s2}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","C'","${s3}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","M'","${s4}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","N'","${s5}");
				mtg32App.calculate("MG32svg${numero_de_l_exercice}");
	        	mtg32App.display("MG32svg${numero_de_l_exercice}");
				`;
        texte += `<br>$\\footnotesize{\\textit{Le point \\thickspace ${s1} peut être déplacé (si la figure est tronquée).}}$<br>`;
      }
      this.liste_questions.push(texte);
      this.liste_corrections.push(texte_corr);
      if (this.sup < 3) {
        liste_de_question_to_contenu(this);
      } else {
        this.type_exercice = "";
        liste_de_question_to_contenu_sans_numero(this);
      }
    } else {
      // sortie Latex
      texte =
        "\\begin{minipage}{.7 \\linewidth} 	\\vspace{0cm} Sur la figure ci-contre, on a  : \\begin{itemize}";
      texte += `\n\t\\item Les droites $(${s4 + s5})$ et $(${s2 + s3
        })$ sont parallèles.`;
      if (this.sup == 1) {
        //niveau 1 : Calcul direct quatrième proportionnelle

        // enoncé  niveau 1

        texte += "\n\t\\item " + `$${s1 + s2 + " = " + s12 + "~\\text{cm}~;"}$`;
        texte += "\n\t\\item " + `$${s1 + s3 + " = " + s13 + "~\\text{cm}~;"}$`;
        texte += "\n\t\\item " + `$${s4 + s5 + " = " + s45 + "~\\text{cm}~;"}$`;
        texte += "\n\t\\item " + `$${s1 + s5 + " = " + s15 + "~\\text{cm}."}$`;
        texte +=
          "\\end{itemize} \\bigskip  Calculer " +
          `$${s1 + s4}$` +
          " et " +
          `$${s2 + s3}$` +
          " à 0,1 près. \\end{minipage}";
      } else if (this.sup == 2) {
        // niveau 2 : Calcul intermédiaire nécessaire

        // enoncé  niveau 2

        texte += "\n\t\\item " + `$${s1 + s2 + " = " + s12 + "~\\text{cm}~;"}$`;
        texte += "\n\t\\item " + `$${s1 + s3 + " = " + s13 + "~\\text{cm}~;"}$`;
        texte += "\n\t\\item " + `$${s4 + s5 + " = " + s45 + "~\\text{cm}~;"}$`;
        texte += "\n\t\\item " + `$${s3 + s5 + " = " + s35 + "~\\text{cm}."}$`;
        texte +=
          "\\end{itemize} \\bigskip  Calculer " +
          `$${s1 + s4}$` +
          " et " +
          `$${s2 + s3}$` +
          " à 0,1 près. \\end{minipage}";
      } // énoncé sans figure
      else if (k > 0) {
        texte =
          `$${s1}$, $${s2}$ et $${s3}$` +
          " sont trois point distincts.<br>\n" +
          `$${s4} \\in [${s1 + s2}]$` +
          " et " +
          `$${s5} \\in [${s1 + s3}]$` +
          " tel que les droites " +
          `$(${s4 + s5})$` +
          " et " +
          `$(${s2 + s3})$` +
          " sont parallèles.<br>\n";
        texte += `$${s1 + s2}=${s12}$ cm, $${s1 + s3}=${s13}$ cm, $${s4 + s5
          }=${s45}$ cm et `;
        if (niv_diff == 1) {
          texte += `$${s1 + s5}=${s15}$ cm.`;
        } else {
          texte += `$${s3 + s5}=${s35}$ cm.`;
        }
        texte += `<br>\nCalculer $${s1 + s4}$ et $${s2 + s3}$.`;
        texte_corr =
          "Dans le triangle " +
          `$${s1 + s2 + s3}$` +
          ", les droites " +
          `$(${s4 + s5})$` +
          " et " +
          `$(${s2 + s3})$` +
          " sont parallèles.<br>\n" +
          " D'après la propriété de Thales, on a " +
          `$${tex_fraction(s1 + s4, s1 + s2)}=${tex_fraction(
            s1 + s5,
            s1 + s3
          )}=${tex_fraction(s4 + s5, s2 + s3)}.$`;
        if (niv_diff == 2) {
          texte_corr +=
            "On sait que " +
            `$${s1 + s5}=${s1 + s3}-${s5 + s3}=${s13}-${s35}=${s15}$` +
            "~;cm.";
        }
      } else {
        texte = `Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés dans cet ordre.`;
        texte += `<br>\nLes droites $(${s4 + s5})$ et $(${s2 + s3
          })$ sont parallèles.<br>\n $${s1 + s2}=${s12}$ cm, $${s1 + s3
          }=${s13}$ cm, $${s4 + s5}=${s45}$ cm et `;
        if (niv_diff == 1) {
          texte += `$${s1 + s5}=${s15}$ cm.`;
        } else {
          texte += `$${s3 + s5}=${s35}$ cm.`;
        }
        texte += `<br>\nCalculer $${s1 + s4}$ et $${s2 + s3}$.`;
        texte_corr =
          `Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés dans cet ordre et les droites $(${s4 + s5
          })$ et $(${s2 + s3})$ sont parallèles.<br>\n` +
          " D'après la propriété de Thales, on a " +
          `$${tex_fraction(s1 + s4, s1 + s2)}=${tex_fraction(
            s1 + s5,
            s1 + s3
          )}=${tex_fraction(s4 + s5, s2 + s3)}.$` +
          "<br>\n";
        if (niv_diff == 2) {
          texte_corr +=
            "On sait que " +
            `$${s1 + s5}=${s1 + s3}-${s5 + s3}=${s13}-${s35}=${s15}$` +
            " cm.";
        }
      }
      if (this.sup < 3) {
        // on ne fait la figure que si niveau < 3
        texte += "\\begin{minipage}{0.3 \\linewidth}";
        // dessin de la figure
        texte += "\n \\begin{tikzpicture}[scale=0.7]"; // Balise début de figure
        texte +=
          "\n\t \\tkzDefPoints{0/0/" +
          s1 +
          "," +
          x3 +
          "/" +
          y3 +
          "/" +
          s3 +
          "," +
          x2 +
          "/" +
          y2 +
          "/" +
          s2 +
          "}"; // Placer les points du triangle principal
        texte += "\n\t \\tkzDrawPolygon(" + s1 + "," + s2 + "," + s3 + ")"; // Trace le triangle principal
        // Définit les points M et N par homothétie de centre C et de rapport 0,3<k<0,8
        texte +=
          "\n\t \\tkzDefPointBy[homothety=center " +
          s1 +
          " ratio " +
          k +
          "](" +
          s2 +
          ")" +
          "\t\\tkzGetPoint{" +
          s4 +
          "}"; // Place le premier point du triangle image
        texte +=
          "\n\t \\tkzDefPointBy[homothety=center " +
          s1 +
          " ratio " +
          k +
          "](" +
          s3 +
          ")" +
          "\t\\tkzGetPoint{" +
          s5 +
          "}"; // Place le deuxième point du triangle image
        texte += "\n\t \\tkzDrawSegment(" + s4 + "," + s5 + ")"; // Trace le segment
        if (k > 0) {
          texte += "\n\t \\tkzLabelPoints[left](" + s1 + ")"; //nomme les points
          texte += "\n\t \\tkzLabelPoints[above left](" + s2 + "," + s4 + ")"; //nomme les points
          texte += "\n\t \\tkzLabelPoints[below](" + s3 + "," + s5 + ")"; //nomme les points
          // Nomme les points au dessus avec above, dessous avec below...
        } else {
          // position papillon -> position du nom inversée et nécessité de tracer le triangle secondaire
          texte += "\n\t \\tkzLabelPoints[below](" + s1 + ")"; //nomme les points
          texte += "\n\t \\tkzLabelPoints[below](" + s3 + "," + s4 + ")"; //nomme les points
          texte += "\n\t \\tkzLabelPoints[above](" + s2 + "," + s5 + ")"; //nomme les points
          texte += "\n\t \\tkzDrawPolygon(" + s1 + "," + s4 + "," + s5 + ")"; // Trace le triangle secondaire
        }
        texte += "\n \\end{tikzpicture}"; // Balise de fin de figure
        texte += "\\end{minipage}";
      }
      this.liste_questions.push(texte); // on envoie la question
      // correction
      if (this.sup == 2) {
        //niveau 2 : Calcul intermédiaire nécessaire
        texte_corr = `Les droites $(${s4 + s5})$ et $(${s2 + s3
          })$ sont parallèles.<br>\n\t D\'après la propriété de Thales, on a $${tex_fraction(
            s1 + s4,
            s1 + s2
          )}=${tex_fraction(s1 + s5, s1 + s3)}=${tex_fraction(
            s4 + s5,
            s2 + s3
          )}.$<br>\n\t`;
        if (k > 0) {
          texte_corr +=
            "On sait que " +
            `$${s1 + s5}=${s1 + s3}-${s5 + s3
            }=${s13}-${s35}=${s15}~\\text{cm}.$`;
        } else {
          texte_corr +=
            "On sait que " +
            `$${s1 + s5}=${s3 + s5}-${s1 + s3
            }=${s35}-${s13}=${s15}~\\text{cm}.$`;
        }
      } else if (this.sup == 1) {
        if (k > 0) {
          texte_corr = `Dans le triangle $${s1 + s2 + s3}$, les droites $(${s4 + s5
            })$ et $(${s2 + s3
            })$ sont parallèles.<br>\n D\'après la propriété de Thales, on a $${tex_fraction(
              s1 + s4,
              s1 + s2
            )}=${tex_fraction(s1 + s5, s1 + s3)}=${tex_fraction(
              s4 + s5,
              s2 + s3
            )}.$`;
        } else {
          texte_corr =
            `Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés et les droites $(${s4 + s5
            })$ et $(${s2 + s3})$ sont parallèles.<br>\n` +
            " D'après la propriété de Thales, on a " +
            `$${tex_fraction(s1 + s4, s1 + s2)}=${tex_fraction(
              s1 + s5,
              s1 + s3
            )}=${tex_fraction(s4 + s5, s2 + s3)}.$` +
            "<br>\n";
        }
      }
      texte_corr += `<br>\n On a donc $${tex_fraction(
        s1 + s4,
        s12
      )}=${tex_fraction(s15, s13)}=${tex_fraction(s45, s2 + s3)}$`;
      texte_corr += `<br>\n Soit $${s1 + s4}=${tex_fraction(
        s15 + "\\times" + s12,
        s13
      )}\\approx${s14}~\\text{cm}$.`;
      texte_corr += `<br>\n Et $${s2 + s3}=${tex_fraction(
        s13 + "\\times" + s45,
        s15
      )}\\approx${s23}~\\text{cm}$.`;

      this.liste_corrections.push(texte_corr);

      liste_de_question_to_contenu_sans_numero(this);
    }
  };

  this.besoin_formulaire_numerique = [
    "Niveau de difficulté",
    3,
    "1 : Calcul direct de deux longueurs \n 2 : Avec calcul intermédiaire\n 3 : Sans figure",
  ];
}


/**
 * Calcul de longueurs avec le théorème de Thalès
 * @Auteur Rémi Angot
 * Référence 4G30
*/
function Thales2D() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Calculer des longueurs avec le théorème de Thalès";
  this.consigne = "";
  this.nb_questions = 1;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.sup = 1; // Triangles imbriqués / configuration papillon / les 2
  this.vspace = -0.5; // Monter un peu l'énoncé pour gagner de la place dans la sortie PDF
  
  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let liste_de_noms_de_polygones = []
    let premiereQuestionPapillon = randint(0, 1) // Pour alterner les configurations et savoir par laquelle on commence


    for (let i = 0, texte = '', texte_corr = '', cpt = 0; i < this.nb_questions && cpt < 50;) {
      if ((i + 1) % 3 == 0) { // Toutes les 3 questions, on repart à zéro sur les noms des polygones
        liste_de_noms_de_polygones = []
      }
      let nomDesPoints = creerNomDePolygone(5, liste_de_noms_de_polygones);
      liste_de_noms_de_polygones.push(nomDesPoints);
      let nomA = nomDesPoints[0];
      let nomB = nomDesPoints[1];
      let nomC = nomDesPoints[2];
      let nomM = nomDesPoints[3];
      let nomN = nomDesPoints[4];
      let ab = randint(5, 10);
      let ac = randint(5, 10, ab);
      let bc = randint(Math.max(ab - ac, ac - ab) + 1, ab + ac - 1, [ab, ac]); // Pas de triangle isocèle ou équilatéral
      let A = point(0, 0, nomA);
      let B = pointAdistance(A, ab, nomB);
      let ABC = triangle2points2longueurs(A, B, ac, bc);
      ABC.id = `M2D_${numero_de_l_exercice}_${i}_1`;
      let C = ABC.listePoints[2];
      C.nom = nomC;
      let k = calcul(randint(3, 8, 5) / 10);
      if (this.sup == 2) {
        k *= -1
        this.vspace = -.5; // Monter un peu l'énoncé pour gagner de la place dans la sortie PDF
      }
      if (this.sup == 3 && ((i + premiereQuestionPapillon) % 2 == 0)) {
        k *= -1
        this.vspace = -.5; // Monter un peu l'énoncé pour gagner de la place dans la sortie PDF
      }
      let M = homothetie(A, C, k);
      let N = homothetie(B, C, k);
      let MNC = polygone(M, N, C);
      MNC.id = `M2D_${numero_de_l_exercice}_${i}_2`;
      let m = pointSurSegment(M, N, -.5);
      let n = pointSurSegment(N, M, -.5);
      let marqueNomM = texteParPoint(nomM, m);
      let marqueNomN = texteParPoint(nomN, n);
      let a = pointSurSegment(A, B, -.5);
      let b = pointSurSegment(B, A, -.5);
      let marqueNomA = texteParPoint(nomA, a);
      let marqueNomB = texteParPoint(nomB, b);
      let c;
      if (k < 0) {
        if (angle(A, C, N) < angle(N, C, A)) {
          c = similitude(A, C, -angleOriente(A, C, N) / 2, 1 / longueur(A, C))
        } else {
          c = similitude(A, C, -angleOriente(N, C, A) / 2, 1 / longueur(A, C) * 0.5)
        }
      } else {
        c = similitude(A, C, -180 + angleOriente(A, C, B) / 2, 1 / longueur(A, C) * .5)
      }
      let marqueNomC = texteParPoint(nomC, c)




      if (!sortie_html) {
        texte = '\\begin{minipage}{.5\\linewidth}\n'
      } else {
        texte = ''
      }
      texte += `Sur la figure suivante, $${nomA + nomC}=${ac}~\\text{cm}$, $${nomA + nomB}=${ab}~\\text{cm}$, $${nomC + nomM}=${tex_nombrec(Math.abs(k) * ac)}~\\text{cm}$, $${nomC + nomN}=${tex_nombrec(Math.abs(k) * bc)}~\\text{cm}$ et $(${nomA + nomB})//(${nomM + nomN})$.<br>`
      texte += `Calculer $${nomM + nomN}$ et $${nomC + nomB}$.<br><br>`
      if (!sortie_html) {
        texte += '\\end{minipage}\n'
        texte += '\\begin{minipage}{.5\\linewidth}\n'
        texte += '\\centering'
      }
      texte += mathalea2d({
        xmin: Math.min(A.x, B.x, C.x, M.x, N.x) - 1.5,
        ymin: Math.min(A.y, B.y, C.y, M.y, N.y) - .8,
        xmax: Math.max(A.x, B.x, C.x, M.x, N.x) + 1.5,
        ymax: Math.max(A.y, B.y, C.y, M.y, N.y) + .8,
        scale: .5
      },

        ABC, MNC, marqueNomA, marqueNomB, marqueNomC, marqueNomM, marqueNomN
      );
      if (!sortie_html) {
        texte += '\\end{minipage}\n'
      }

      let epaisseurTriangle = (k < 0) ? 2 : 6; // En cas de configuration papillon il est inutile de changer l'épaisseur
      let bouton_aide_mathalea2d = creerBoutonMathalea2d(numero_de_l_exercice+'_'+i,
        `if (!document.getElementById('M2D_${numero_de_l_exercice}_${i}_1').dataset.colorie == true || (document.getElementById('M2D_${numero_de_l_exercice}_${i}_1').dataset.colorie == 'false')){
          document.getElementById('M2D_${numero_de_l_exercice}_${i}_1').style.stroke = 'blue';
          document.getElementById('M2D_${numero_de_l_exercice}_${i}_2').style.stroke = 'red';
          document.getElementById('M2D_${numero_de_l_exercice}_${i}_1').style.opacity = .5;
          document.getElementById('M2D_${numero_de_l_exercice}_${i}_1').style.strokeWidth = ${epaisseurTriangle};
          document.getElementById('M2D_${numero_de_l_exercice}_${i}_2').style.opacity = 1;
          document.getElementById('M2D_${numero_de_l_exercice}_${i}_2').style.strokeWidth = 2;
          document.getElementById('M2D_${numero_de_l_exercice}_${i}_1').dataset.colorie = true;
          document.getElementById('btnMathALEA2d_${numero_de_l_exercice}_${i}').classList.add('active');
        } else {
          document.getElementById('M2D_${numero_de_l_exercice}_${i}_1').style.stroke = 'black';
          document.getElementById('M2D_${numero_de_l_exercice}_${i}_2').style.stroke = 'black';
          document.getElementById('M2D_${numero_de_l_exercice}_${i}_1').style.opacity = 1;
          document.getElementById('M2D_${numero_de_l_exercice}_${i}_1').style.strokeWidth = 1;
          document.getElementById('M2D_${numero_de_l_exercice}_${i}_2').style.opacity = 1;
          document.getElementById('M2D_${numero_de_l_exercice}_${i}_2').style.strokeWidth = 1;
          document.getElementById('M2D_${numero_de_l_exercice}_${i}_1').dataset.colorie = false;
          document.getElementById('btnMathALEA2d_${numero_de_l_exercice}_${i}').classList.remove('active');
  
        }
        `,
        'Mettre en couleur les 2 triangles');

      if (k > 0) {
        texte_corr = `Dans le triangle $${nomA + nomB + nomC}$ :
       <br> - $${nomM}\\in${"[" + nomC + nomA + "]"}$,
       <br> - $${nomN}\\in${"[" + nomC + nomB + "]"}$,
       <br> -  $(${nomA + nomB})//(${nomM + nomN})$,
       <br> donc d'après le théorème de Thalès, les triangles $${nomA + nomB + nomC}$ et $${nomM + nomN + nomC}$ ont des longueurs proportionnelles.`;
      } else {
        texte_corr = `Les droites $(${nomA + nomM})$ et $(${nomB + nomN})$ sont sécantes en $${nomC}$ et $(${nomA + nomB})//(${nomM + nomN})$ <br> donc d'après le théorème de Thalès, les triangles $${nomA + nomB + nomC}$ et $${nomM + nomN + nomC}$ ont des longueurs proportionnelles.`;
      }
      //texte_corr = `$(${nomA+nomB})//(${nomM+nomN})$, les points $${nomC}$, $${nomM}$, $${nomA}$ et $${nomC}$, $${nomN}$, $${nomB}$ sont alignés dans le même ordre  donc d'après le théorème de Thalès, les triangles $${nomA+nomB+nomC}$ et $${nomM+nomN+nomC}$ ont des longueurs proportionnelles.`;
      texte_corr += `<br><br>`
      if (sortie_html){
        texte_corr += `$\\dfrac{\\color{red}${nomC + nomM}}{\\color{blue}${nomC + nomA}}=\\dfrac{\\color{red}${nomC + nomN}}{\\color{blue}${nomC + nomB}}=\\dfrac{\\color{red}${nomM + nomN}}{\\color{blue}${nomA + nomB}}$`
      } else {
        texte_corr += `$\\dfrac{${nomC + nomM}}{${nomC + nomA}}=\\dfrac{${nomC + nomN}}{${nomC + nomB}}=\\dfrac{${nomM + nomN}}{${nomA + nomB}}$`
      }
      texte_corr += `<br><br>`
      texte_corr += `$\\dfrac{${tex_nombrec(Math.abs(k) * ac)}}{${tex_nombre(ac)}}=\\dfrac{${tex_nombrec(Math.abs(k) * bc)}}{${nomC + nomB}}=\\dfrac{${nomM + nomN}}{${tex_nombre(ab)}}$`
      texte_corr += `<br><br>`
      texte_corr += `$${nomM + nomN}=\\dfrac{${tex_nombrec(Math.abs(k) * ac)}\\times${tex_nombre(ab)}}{${tex_nombre(ac)}}=${tex_nombrec(Math.abs(k) * ab)}$ cm`
      texte_corr += `<br><br>`
      texte_corr += `$${nomC + nomB}=\\dfrac{${tex_nombrec(Math.abs(k) * bc)}\\times${tex_nombre(ac)}}{${tex_nombrec(Math.abs(k) * ac)}}=${tex_nombrec(bc)}$ cm`
      
      if (sortie_html){
        texte += `<br><div style="display: inline-block;margin-top:20px;">${bouton_aide_mathalea2d}</div>`;
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
    }
  this.besoin_formulaire_numerique = ['Configuration', 3, '1 : Triangles imbriqués\n2 : Papillon\n3 : Les deux'];
}


/**
 * Reciproque_Thales
 * @Auteur Jean-Claude Lhote
 * 3G21
 */
function Reciproque_Thales() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Contrôler si deux droites sont parallèles";
  this.consigne = "";
  this.nb_questions = 1;
  this.nb_questions_modifiable = false;
  sortie_html ? (this.spacing_corr = 3.5) : (this.spacing_corr = 1);
  sortie_html ? (this.spacing = 2) : (this.spacing = 1.5);
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.quatrieme = false;
  this.sup = 1;
  this.sup2 = 1;
  this.liste_packages = "tkz-euclide";

  // let s1='A',s2='B',s3='C',s4='M',s5='N'
  // coefficient de l'homothétie compris entre -0,8 et -0,2 ou entre 0,2 et 0,8 pour éviter les constructions trop serrées
  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = [];
    this.liste_corrections = [];
    let lettre1 = randint(1, 26); // aleatoirisation du nom des points
    let s1 = lettre_depuis_chiffre(lettre1);
    let lettre2 = randint(1, 26, [lettre1]);
    let s2 = lettre_depuis_chiffre(lettre2);
    let lettre3 = randint(1, 26, [lettre1, lettre2]);
    let s3 = lettre_depuis_chiffre(lettre3);
    let lettre4 = randint(1, 26, [lettre1, lettre2, lettre3]);
    let s4 = lettre_depuis_chiffre(lettre4);
    let lettre5 = randint(1, 26, [lettre1, lettre2, lettre3, lettre4]);
    let s5 = lettre_depuis_chiffre(lettre5);
    let x2 = randint(2, 4);
    let y2 = randint(3, 5);
    let x3 = randint(5, 6);
    let y3 = randint(-2, 1);
    let k = (randint(2, 8) * randint(-1, 1, [0])) / 10;
    let k2
    if (this.sup2 == 1) k2 = k
    else if (this.sup2 == 3) k2 = k * (1 + randint(0, 1) * 0.1);
    else k2 = k * (1 + randint(-1, 1, 0) * 0.1);

    if (this.quatrieme) {
      k = abs(k);
      k2 = abs(k2);
    }
    let dist24;
    let dist12 = Math.round(Math.sqrt(x2 * x2 + y2 * y2));
    let dist13 = Math.round(Math.sqrt(x3 * x3 + y3 * y3));
    while (dist12 == dist13) {
      //éviter les triangles isocèles imbriqués qui ne nécéssitent aucun calculs.
      x2 = randint(2, 4);
      y2 = randint(3, 5);
      x3 = randint(5, 6);
      y3 = randint(-2, 1);
      dist12 = Math.round(Math.sqrt(x2 * x2 + y2 * y2));
      dist13 = Math.round(Math.sqrt(x3 * x3 + y3 * y3));
    }
    let dist15 = arrondi(dist13 * abs(k), 1);
    let dist14 = arrondi(dist12 * abs(k2), 1);
    let dist35;

    let num1, num2, den1, den2;
    if (k < 0) {
      dist35 = dist13 + dist15;
      dist24 = dist12 + dist14;
    } else {
      dist35 = dist13 - dist15;
      dist24 = dist12 - dist14;
    }

    let texte, texte_corr;
    // On ne garde qu'une approximation au dixième pour l'exercice

    // mise en texte avec 1 chiffres après la virgule pour énoncé
    let s13 = tex_nombre(dist13);
    let s12 = tex_nombre(dist12);
    let s15 = tex_nombre(dist15);
    let s14 = tex_nombre(dist14);
    let s24 = tex_nombre(dist24);
    let s35 = tex_nombre(dist35);
    // num1 = arrondi(dist12 * 100);
    // den1 = arrondi(dist14 * 100);
    // num2 = arrondi(dist13 * 100);
    // den2 = arrondi(dist15 * 100);
    // let fraction1 = [],
    //   fraction2 = [];
    //  fraction1 = fraction_simplifiee(num1, den1);
    // fraction2 = fraction_simplifiee(num2, den2);

    if (sortie_html) {
      this.type_exercice = "MG32";
      this.taille_div_MG32 = [700, 500];
      let codeBase64;

      if (k < 0) {
        codeBase64 =
          "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACX#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAJBJwBANgAAAAAAAEAzAAAAAAAABwABQHYBR64UeuFAcdwo9cKPXP####8AAAABABRDRHJvaXRlRGlyZWN0aW9uRml4ZQD#####AQAAAAAQAAABAAEAAAABAT#wAAAAAAAA#####wAAAAEAD0NQb2ludExpZURyb2l0ZQD#####AQAAAAAQAAJJJwDAGAAAAAAAAAAAAAAAAAAABQABQEerQ5WBBiUAAAAC#####wAAAAEACUNEcm9pdGVBQgD#####AQAAAAASAAABAAEAAAABAAAAA#####8AAAABABZDRHJvaXRlUGVycGVuZGljdWxhaXJlAP####8BAAAAABAAAAEAAQAAAAEAAAAE#####wAAAAEACUNDZXJjbGVPQQD#####AQAAAAABAAAAAQAAAAP#####AAAAAQAQQ0ludERyb2l0ZUNlcmNsZQD#####AAAABQAAAAb#####AAAAAQAQQ1BvaW50TGllQmlwb2ludAD#####AQAAAAAQAAABBQABAAAABwAAAAkA#####wEAAAAAEAACSicAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAASAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MgABMgAAAAFAAAAAAAAAAAAAABEA#####wACeTIAATUAAAABQBQAAAAAAAAAAAARAP####8AAngzAAE2AAAAAUAYAAAAAAAAAAAAEQD#####AAJ5MwACLTH#####AAAAAQAMQ01vaW5zVW5haXJlAAAAAT#wAAAAAAAAAAAAEQD#####AAFrAAQtMC41AAAAEgAAAAE#4AAAAAAAAP####8AAAABABBDUG9pbnREYW5zUmVwZXJlAP####8BAAAAABgAAlonAAAAAAAAAAAAQAgAAAAAAAAHAAAAAAoAAAABAAAAAAAAAAAAAAABAAAAAAAAAAAAAAATAP####8AAAAAABgAAkInAMAwAAAAAAAAwEOAAAAAAAAHAAAAAAoAAAAOAAAADwAAAA4AAAAQAAAAEwD#####AAAAAAAYAAJDJwAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAADgAAABEAAAAOAAAAEgAAAAwA#####wAAABQAAAAOAAAAEwAAAA8A#####wAAAAAAGAACTScAwCQAAAAAAADAAAAAAAAAAAcAAAAAFQAAABcAAAAPAP####8AAAAAABgAAk4nAMAzAAAAAAAAwEMAAAAAAAAHAAAAABYAAAAX#####wAAAAEACUNQb2x5Z29uZQD#####AAAAAAACAAAABAAAABYAAAAVAAAAFAAAABYAAAAUAP####8AAAAAAAIAAAAEAAAAGQAAABQAAAAYAAAAGf####8AAAABABBDU3VyZmFjZVBvbHlnb25lAP####8BAAD#AAAABQAAABsAAAAVAP####8B#wAAAAAABQAAABr#####AAAAAQAQQ01hY3JvQXBwYXJpdGlvbgD#####AP8AAAH#####EECIoKPXCj1xQELhR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAZBcHBBTU4AAAAAAAEAAAAcAAAAABYA#####wD#AAAB#####xBAiLCj1wo9cUBUMKPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAGQXBwQUJDAAAAAAABAAAAHQD#####AAAAAQARQ01hY3JvRGlzcGFyaXRpb24A#####wD#AAAB#####xBAi+Cj1wo9cUBE4UeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAHTWFzcUFNTgAAAAAAAQAAABwAAAAXAP####8A#wAAAf####8QQIvoo9cKPXFAVPCj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAB01hc3FBQkMAAAAAAAEAAAAd#####wAAAAEAC0NNYWNyb1BhdXNlAP####8A#wAAAf####8QQIj4o9cKPXFAX3Cj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAABVBhdXNlAAAAAAAB#####wAAAAEAEUNNYWNyb1N1aXRlTWFjcm9zAP####8A#wAAAf####8QQFHFHrhR64VAePwo9cKPXAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAClRyaWFuZ2xlIDEAAAAAAAMAAAAfAAAAIgAAACEAAAAZAP####8A#wAAAf####8QQFFFHrhR64VAe3wo9cKPXAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAClRyaWFuZ2xlIDIAAAAAAAMAAAAeAAAAIgAAACAAAAAO##########8=";
      } else {
        codeBase64 =
          "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACX#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAJBJwDAKAAAAAAAAEAiAAAAAAAABwABQHMxR64UeuFAcbwo9cKPXP####8AAAABABRDRHJvaXRlRGlyZWN0aW9uRml4ZQD#####AQAAAAAOAAABAAEAAAABAT#wAAAAAAAA#####wAAAAEAD0NQb2ludExpZURyb2l0ZQD#####AQAAAAAQAAJJJwDAGAAAAAAAAAAAAAAAAAAABQABQEerQ5WBBiUAAAAC#####wAAAAEACUNEcm9pdGVBQgD#####AQAAAAASAAABAAEAAAABAAAAA#####8AAAABABZDRHJvaXRlUGVycGVuZGljdWxhaXJlAP####8BAAAAAA4AAAEAAQAAAAEAAAAE#####wAAAAEACUNDZXJjbGVPQQD#####AQAAAAABAAAAAQAAAAP#####AAAAAQAQQ0ludERyb2l0ZUNlcmNsZQD#####AAAABQAAAAb#####AAAAAQAQQ1BvaW50TGllQmlwb2ludAD#####AQAAAAAOAAABBQABAAAABwAAAAkA#####wEAAAAAEAACSicAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAASAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MgABMgAAAAFAAAAAAAAAAAAAABEA#####wACeTIAATUAAAABQBQAAAAAAAAAAAARAP####8AAngzAAE2AAAAAUAYAAAAAAAAAAAAEQD#####AAJ5MwACLTH#####AAAAAQAMQ01vaW5zVW5haXJlAAAAAT#wAAAAAAAAAAAAEQD#####AAFrAAMwLjUAAAABP+AAAAAAAAD#####AAAAAQAQQ1BvaW50RGFuc1JlcGVyZQD#####AQAAAAAYAAJaJwAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAEwD#####AAAAAAAYAAJCJwDAMAAAAAAAAMBDgAAAAAAABwAAAAAKAAAADgAAAA8AAAAOAAAAEAAAABMA#####wAAAAAAGAACQycAAAAAAAAAAABACAAAAAAAAAcAAAAACgAAAA4AAAARAAAADgAAABIAAAAMAP####8AAAAUAAAADgAAABMAAAAPAP####8AAAAAABgAAk0nAMA7AAAAAAAAwDcAAAAAAAAHAAAAABUAAAAXAAAADwD#####AAAAAAAYAAJOJwDAKAAAAAAAAEAAAAAAAAAABwAAAAAWAAAAF#####8AAAABAAlDUG9seWdvbmUA#####wAAAAAAAgAAAAQAAAAWAAAAFQAAABQAAAAWAAAAFAD#####AAAAAAACAAAABAAAABkAAAAUAAAAGAAAABn#####AAAAAQAQQ1N1cmZhY2VQb2x5Z29uZQD#####AQAA#wAAAAUAAAAbAAAAFQD#####Af8AAAAAAAUAAAAa#####wAAAAEAEENNYWNyb0FwcGFyaXRpb24A#####wD#AAAB#####xBAiKCj1wo9cUBC4UeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAGQXBwQU1OAAAAAAABAAAAHAAAAAAWAP####8A#wAAAf####8QQIiwo9cKPXFAVDCj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAABkFwcEFCQwAAAAAAAQAAAB0A#####wAAAAEAEUNNYWNyb0Rpc3Bhcml0aW9uAP####8A#wAAAf####8QQIvgo9cKPXFAROFHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAAB01hc3FBTU4AAAAAAAEAAAAcAAAAFwD#####AP8AAAH#####EECL6KPXCj1xQFTwo9cKPXACAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAdNYXNxQUJDAAAAAAABAAAAHf####8AAAABAAtDTWFjcm9QYXVzZQD#####AP8AAAH#####EECI+KPXCj1xQF9wo9cKPXACAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAVQYXVzZQAAAAAAAf####8AAAABABFDTWFjcm9TdWl0ZU1hY3JvcwD#####AP8AAAH#####EEBRxR64UeuFQHj8KPXCj1wCAAAAAAAAAAAAAAAAAQAAAAAAAAAAAApUcmlhbmdsZSAxAAAAAAADAAAAHwAAACIAAAAhAAAAGQD#####AP8AAAH#####EEBRRR64UeuFQHt8KPXCj1wCAAAAAAAAAAAAAAAAAQAAAAAAAAAAAApUcmlhbmdsZSAyAAAAAAADAAAAHgAAACIAAAAgAAAADv##########";
      }

      if (this.sup == 1) {
        // AM,AB,AN,AC sont donnés pas de calculs intermédiaires
        texte = `Dans la figure ci-dessous, $${s1 + s2}=${s12}$ cm, $${s1 + s3
          }=${s13}$ cm, $${s1 + s5}=${s15}$ cm et $${s1 + s4}=${s14}$ cm.<br>`;
        texte_corr = ``;
      } else if (this.sup == 2) {
        // AN n'est pas donné, il faut le calculer avant.
        texte = `Dans la figure ci-dessous, $${s1 + s2}=${s12}$ cm, $${s1 + s3
          }=${s13}$ cm, $${s3 + s5}=${s35}$ cm et $${s2 + s4}=${s24}$ cm.<br>`;
        texte_corr = ``;
        if (k > 0) {
          //triangles imbriqués
          texte_corr +=
            "On sait que " +
            `$${s1 + s5}=${s1 + s3}-${s3 + s5}=${s13}-${s35}=${s15}$` +
            " cm.<br>";
          texte_corr +=
            "et que " +
            `$${s1 + s4}=${s1 + s2}-${s2 + s4}=${s12}-${s24}=${s14}$` +
            " cm.<br>";
        } else {
          // papillon
          texte_corr +=
            "On sait que " +
            `$${s1 + s5}=${s3 + s5}-${s1 + s3}=${s35}-${s13}=${s15}$` +
            " cm.<br>";
          texte_corr +=
            "et que " +
            `$${s1 + s4}=${s2 + s4}-${s1 + s2}=${s24}-${s12}=${s14}$` +
            " cm.<br>";
        }
      } else if (randint(1, 2) == 1) {
        //triangles imbriqués sans figure
        texte = `$${s1}$, $${s2}$ et $${s3}$ sont trois point distincts. $${s4} \\in [${s1 + s2
          }]$ et $${s5} \\in [${s1 + s3}]$ <br> $${s1 + s2}=${s12}$ cm, $${s1 + s3
          }=${s13}$ cm, $${s1 + s4}=${s14}$ cm et $${s1 + s5}=${s15}$ cm.`;
        texte_corr = ``;
      } else {
        // papillon sans figure
        texte = `Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés dans cet ordre.<br>`;
        texte += `$${s1 + s2}=${s12}$ cm, $${s1 + s3}=${s13}$ cm, $${s1 + s4
          }=${s14}$ cm et $${s1 + s5}=${s15}$ cm.<br>`;
        texte_corr = ``;
      }
      texte += `Les droites $(${s2 + s3})$ et $(${s4 + s5
        })$ sont-elles parallèles ?<br>`;

      texte_corr += `D'une part on a $\\dfrac{${s1 + s2}}{${s1 + s4
        }}=\\dfrac{${s12}}{${s14}}=\\dfrac{${s12}\\times${mise_en_evidence(
          s15
        )}}{${s14}\\times${mise_en_evidence(s15)}}=\\dfrac{
        ${tex_nombrec(arrondi(dist12 * dist15, 3))}}
        {${s14}\\times${s15}}
      $`;
      texte_corr += `<br>D'autre part on a $\\dfrac{${s1 + s3}}{${s1 + s5
        }}=\\dfrac{${s13}}{${s15}}=\\dfrac{${s13}\\times${mise_en_evidence(
          s14
        )}}{${s15}\\times${mise_en_evidence(s14)}}=\\dfrac{${tex_nombrec(arrondi(dist13 * dist14, 3))}}
        {${s14}\\times${s15}}
      $`;

      if (k != k2) {
        // droites non parallèles

        texte_corr += `<br>$\\dfrac{${s1 + s2}}{${s1 + s4}}\\not=\\dfrac{${s1 + s3
          }}{${s1 + s5}}$.<br>`;
        texte_corr += `Donc d'après le théorème de Thales, les droites $(${s2 + s3
          })$ et $(${s4 + s5})$ ne sont pas parallèles.<br>`;
      } else {
        // droites parallèles
        texte_corr += `<br>$\\dfrac{${s1 + s2}}{${s1 + s4}}=\\dfrac{${s1 + s3
          }}{${s1 + s5}}$.<br>`; //car les produits en croix sont égaux : $${s12}\\times${s15}=${s13}\\times${s14}=${tex_nombre(arrondi(dist12*dist15,3))}$.<br>`;
        if (k > 0)
          texte_corr += `$${s1}$,$${s4}$,$${s2}$ et $${s1}$,$${s5}$,$${s3}$ sont alignés dans le même ordre.<br>`;
        else
          texte_corr += `$${s4}$,$${s1}$,$${s2}$ et $${s5}$,$${s1}$,$${s3}$ sont alignés dans le même ordre.<br>`;
        texte_corr += `Donc d'après la réciproque du théorème de Thales, les droites $(${s2 + s3
          })$ et $(${s4 + s5})$ sont parallèles.<br>`;
      }

      if (this.sup < 3) {
        this.MG32codeBase64 = codeBase64;
        this.MG32code_pour_modifier_la_figure = `
					mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "x3", "${x3}");
					mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "y2", "${y2}");
					mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "y3", "${y3}");
					mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "k", "${k}");
					mtg32App.rename("MG32svg${numero_de_l_exercice}","A'","${s1}");
					mtg32App.rename("MG32svg${numero_de_l_exercice}","B'","${s2}");
					mtg32App.rename("MG32svg${numero_de_l_exercice}","C'","${s3}");
					mtg32App.rename("MG32svg${numero_de_l_exercice}","M'","${s4}");
					mtg32App.rename("MG32svg${numero_de_l_exercice}","N'","${s5}");
					mtg32App.calculate("MG32svg${numero_de_l_exercice}");
					mtg32App.display("MG32svg${numero_de_l_exercice}");
					`;
        texte += `$\\footnotesize{\\textit{Le point \\thickspace ${s1} peut être déplacé (si la figure est tronquée).}}$<br>`;
      }
      this.liste_questions.push(texte);
      this.liste_corrections.push(texte_corr);
      if (this.sup < 3) {
        liste_de_question_to_contenu(this);
      } else {
        this.type_exercice = "";
        liste_de_question_to_contenu_sans_numero(this);
      }
    } else {
      // sortie Latex
      texte_corr = ``;
      if (this.sup == 1) {
        //niveau 1 : Calcul direct
        texte =
          "\\begin{minipage}{.7 \\linewidth} 	\\vspace{0cm} Sur la figure ci-contre, on a  : \\begin{itemize}";
        texte += `\n\t \\item ${s1 + s2}=${s12} cm \n\t \\item ${s1 + s3
          }=${s13} cm\n\t \\item ${s1 + s5}=${s15} cm\n\t \\item ${s1 + s4
          }=${s14} cm.<br>`;
        texte +=
          `\\end{itemize}  ` +
          `Les droites (${s2 + s3}) et (${s4 + s5
          }) sont-elles parallèles ?<br>` +
          ". \\end{minipage}";
      } else if (this.sup == 2) {
        // niveau 2 : Calcul intermédiaire nécessaire
        texte =
          "\\begin{minipage}{.7 \\linewidth} 	\\vspace{0cm} Sur la figure ci-contre, on a  : \\begin{itemize}";
        texte += `\n\t \\item ${s1 + s2} = ${s12} cm\n\t \\item ${s1 + s3
          } = ${s13} cm\n\t \\item ${s3 + s5} = ${s35} cm\n\t \\item ${s2 + s4
          } = ${s24} cm.<br>`;
        texte +=
          "\\end{itemize}  " +
          `Les droites (${s2 + s3}) et (${s4 + s5
          }) sont-elles parallèles ?<br>` +
          ". \\end{minipage}";
        if (k > 0) {
          // triangles imbriqués
          texte_corr +=
            "On sait que " +
            `$${s1 + s5}=${s1 + s3}-${s3 + s5}=${s13}-${s35}=${s15}$` +
            " cm.<br>";
          texte_corr +=
            "et que " +
            `$${s1 + s4}=${s1 + s2}-${s2 + s4}=${s12}-${s24}=${s14}$` +
            " cm.<br>";
        } else {
          // papillon
          texte_corr +=
            "On sait que " +
            `$${s1 + s5}=${s3 + s5}-${s1 + s3}=${s35}-${s13}=${s15}$` +
            " cm.<br>";
          texte_corr +=
            "et que " +
            `$${s1 + s4}=${s2 + s4}-${s1 + s2}=${s24}-${s12}=${s14}$` +
            " cm.<br>";
        }
      }
      // énoncé sans figure
      else if (randint(1, 2) == 1) {
        // triangles imbriqués
        texte = `$${s1}$, $${s2}$ et $${s3}$ sont trois point distincts. $${s4} \\in [${s1 + s2
          }]$ et $${s5} \\in [${s1 + s3}]$ <br> $${s1 + s2}=${s12}$ cm, $${s1 + s3
          }=${s13}$ cm, $${s1 + s4}=${s14}$ cm et $${s1 + s5}=${s15}$ cm.<br>`;
        texte += `Les droites (${s2 + s3}) et (${s4 + s5
          }) sont-elles parallèles ?<br>`;
      } else {
        // papillon
        texte = `Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés dans cet ordre.<br>`;
        texte += `$${s1 + s2}=${s12}$ cm, $${s1 + s3}=${s13}$ cm, $${s1 + s4
          }=${s14}$ cm et $${s1 + s5}=${s15}$ cm.<br>`;
        texte += `Les droites (${s2 + s3}) et (${s4 + s5
          }) sont-elles parallèles ?<br>`;
      }

      if (this.sup < 3) {
        // on ne fait la figure que si niveau < 3
        texte += "\\begin{minipage}{0.3 \\linewidth}";
        // dessin de la figure
        texte += "\n \\begin{tikzpicture}[scale=0.7]"; // Balise début de figure
        texte +=
          "\n\t \\tkzDefPoints{0/0/" +
          s1 +
          "," +
          x3 +
          "/" +
          y3 +
          "/" +
          s3 +
          "," +
          x2 +
          "/" +
          y2 +
          "/" +
          s2 +
          "}"; // Placer les points du triangle principal
        texte += "\n\t \\tkzDrawPolygon(" + s1 + "," + s2 + "," + s3 + ")"; // Trace le triangle principal
        // Définit les points M et N par homothétie de centre C et de rapport 0,3<k<0,8
        texte +=
          "\n\t \\tkzDefPointBy[homothety=center " +
          s1 +
          " ratio " +
          k +
          "](" +
          s2 +
          ")" +
          "\t\\tkzGetPoint{" +
          s4 +
          "}"; // Place le premier point du triangle image
        texte +=
          "\n\t \\tkzDefPointBy[homothety=center " +
          s1 +
          " ratio " +
          k +
          "](" +
          s3 +
          ")" +
          "\t\\tkzGetPoint{" +
          s5 +
          "}"; // Place le deuxième point du triangle image
        texte += "\n\t \\tkzDrawSegment(" + s4 + "," + s5 + ")"; // Trace le segment
        if (k > 0) {
          texte += "\n\t \\tkzLabelPoints[left](" + s1 + ")"; //nomme les points
          texte += "\n\t \\tkzLabelPoints[above left](" + s2 + "," + s4 + ")"; //nomme les points
          texte += "\n\t \\tkzLabelPoints[below](" + s3 + "," + s5 + ")"; //nomme les points
          // Nomme les points au dessus avec above, dessous avec below...
        } else {
          // position papillon -> position du nom inversée et nécessité de tracer le triangle secondaire
          texte += "\n\t \\tkzLabelPoints[below](" + s1 + ")"; //nomme les points
          texte += "\n\t \\tkzLabelPoints[below](" + s3 + "," + s4 + ")"; //nomme les points
          texte += "\n\t \\tkzLabelPoints[above](" + s2 + "," + s5 + ")"; //nomme les points
          texte += "\n\t \\tkzDrawPolygon(" + s1 + "," + s4 + "," + s5 + ")"; // Trace le triangle secondaire
        }
        texte += "\n \\end{tikzpicture}"; // Balise de fin de figure
        texte += "\\end{minipage}";
      }
      this.liste_questions.push(texte); // on envoie la question
      // correction
      texte_corr += `D'une part on a $\\dfrac{${s1 + s2}}{${s1 + s4
        }}=\\dfrac{${s12}}{${s14}}=\\dfrac{${s12}\\times${mise_en_evidence(
          s15
        )}}{${s14}\\times${mise_en_evidence(s15)}}=${tex_fraction(
          tex_nombrec(arrondi(dist12 * dist15, 3)),
          tex_nombrec(arrondi(dist14 * dist15, 4))
        )}$`;
      texte_corr += `<br>D'autre part on a $\\dfrac{${s1 + s3}}{${s1 + s5
        }}=\\dfrac{${s13}}{${s15}}=\\dfrac{${s13}\\times${mise_en_evidence(
          s14
        )}}{${s15}\\times${mise_en_evidence(s14)}}=${tex_fraction(
          tex_nombrec(arrondi(dist13 * dist14, 3)),
          tex_nombrec(arrondi(dist14 * dist15, 4))
        )}$`;

      if (k != k2) {
        // droites pas parallèles

        texte_corr += `<br>$\\dfrac{${s1 + s2}}{${s1 + s4}}\\not=\\dfrac{${s1 + s3
          }}{${s1 + s5}}$.<br>`;
        texte_corr += `Donc d'après le théorème de Thales, les droites $(${s2 + s3
          })$ et $(${s4 + s5})$ ne sont pas parallèles.<br>`;
      } else {
        // droites parallèles
        texte_corr += `<br>$\\dfrac{${s1 + s2}}{${s1 + s4}}=\\dfrac{${s1 + s3
          }}{${s1 + s5}}$.<br>`; //car les produits en croix sont égaux : $${s12}\\times${s15}=${s13}\\times${s14}=${tex_nombre(arrondi(dist12*dist15,3))}$.<br>`;
        if (k > 0)
          texte_corr += `$${s1}$,$${s4}$,$${s2}$ et $${s1}$,$${s5}$,$${s3}$ sont alignés dans le même ordre.<br>`;
        else
          texte_corr += `$${s4}$,$${s1}$,$${s2}$ et $${s5}$,$${s1}$,$${s3}$ sont alignés dans le même ordre.<br>`;
        texte_corr += `Donc d'après la réciproque du théorème de Thales, les droites $(${s2 + s3
          })$ et $(${s4 + s5})$ sont parallèles.<br>`;
      }

      this.liste_corrections.push(texte_corr);

      liste_de_question_to_contenu_sans_numero(this);
    }
  };

  this.besoin_formulaire_numerique = [
    "Niveau de difficulté",
    3,
    "1 : Cas simple \n 2 : Complication \n 3 : Sans figure",
  ];
  this.besoin_formulaire2_numerique = [
    "Réciproque ou contraposée ? ",
    3,
    "1 : Réciproque \n 2 : Contraposée \n 3 : Aléatoire",
  ];
}


/**
 * @Auteur Jean-Claude Lhote
 * publié le 16/12/2020
 * Réf : 4G11
 * Trouver une figure image dans un pavage par une translation. 6 pavages différents.
 */
function Pavage_et_translation2d() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre =
    "Trouver l\'image d'une figure par une translation dans un pavage";
  this.consigne = "";
  this.nb_questions = 3;
  this.nb_questions_modifiable = true;
  this.correction_detaillee=true;
  this.correction_detaillee_disponible=true;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.sup = 1; // 1 pour des pavages modestes, 2 pour des plus grand.
  this.sup2=false // On cache les centres par défaut.
  this.sup3=7;
  sortie_html ? (this.spacing_corr = 2.5) : (this.spacing_corr = 1.5);
  this.nouvelle_version = function (numero_de_l_exercice) {
    let videcouples=function(tableau){
      for (let k=0;k<tableau.length;k++){
        for (let j=k+1;j<tableau.length;j++){
          if (tableau[k][1]==tableau[j][0]) {
            tableau.splice(j,1)
          }
        }
      }
      return tableau
    }
    let compare2polys=function(poly1,poly2){
      if (comparenbsommets(poly1,poly2)) {
        if (comparesommets(poly1,poly2)) 
          return true
        else
          return false
      }
      else 
        return false 
      }
      let comparenbsommets = function(poly1,poly2){
        if (poly1.listePoints.length==poly2.listePoints.length){
          return true
        }
        else return false
      }
      
      let compare2sommets=function(sommet1,sommet2){
        if (egal(sommet1.x,sommet2.x,0.1)&&egal(sommet1.y,sommet2.y,0.1)) {
          return true
        }
        else return false
      }
      let comparesommets = function(poly1,poly2){
        let trouve=false,trouves=0
        if (comparenbsommets(poly1,poly2))
        for (let P of poly1.listePoints) {
          for (let M of poly2.listePoints) {
            if (compare2sommets(M,P)) {
              trouve=true
            }
            if (trouve) break
          }
          if (trouve) {
            trouves++
            trouve=false
          }
          else {
            trouves-=100
          }
          if (trouves<0)
          break
        }
        if (trouves==poly1.listePoints.length)
          return true
        else return false
      }

    let translacion = function (pavage, v, numero) { // retourne le numero du polygone image ou -1 si il n'existe pas
      let poly=pavage.polygones[numero-1],pol
      let result=-1
      let sympoly=translation(poly,v)
      for (let k= 0;k<pavage.polygones.length;k++) {
        pol=pavage.polygones[k]
        if (compare2polys(sympoly,pol)) {
          return k+1
        }
      }
      return result
    } 

    let objets=[],objets_correction=[],symetriques=[],P1,P2,P3,t
    let codes=['/','//','///','o','w','X','U','*']
    let taillePavage=parseInt(this.sup)
    if (taillePavage<1||taillePavage>2) {
      taillePavage=1
    }
    if (this.nb_questions>5) {
      taillePavage=2
    }
    this.liste_corrections = []
    this.liste_questions = []
    let Nx,Ny,index1,index2,A,B,d,image,couples=[],tailles=[],monpavage,fenetre
    let texte = "", texte_corr = "", type_de_pavage = parseInt(this.sup)
    let nombreTentatives,nombrePavageTestes=1,v
    if (this.sup3==8) {
      type_de_pavage =  randint(1,7)
    }
    else {
      type_de_pavage=parseInt(this.sup3)
    }
    while (couples.length<this.nb_questions&&nombrePavageTestes<6){
      nombreTentatives=0
    monpavage = pavage() // On crée l'objet Pavage qui va s'appeler monpavage
    tailles = [[[3, 2], [3, 2], [2, 2], [2, 2], [2, 2], [2, 2],[3,2]], [[4, 3], [4, 3], [3, 3], [3, 3], [3, 3], [3, 2],[5,3]]]
    Nx = tailles[taillePavage-1][type_de_pavage-1][0]
    Ny = tailles[taillePavage-1][type_de_pavage-1][1]
    monpavage.construit(type_de_pavage, Nx, Ny, 3) // On initialise toutes les propriétés de l'objet.
    fenetre=monpavage.fenetre
    fenetreMathalea2d=[fenetre.xmin,fenetre.ymin,fenetre.xmax,fenetre.ymax]
    while (couples.length<this.nb_questions+2&&nombreTentatives<3) { // On cherche d pour avoir suffisamment de couples
    couples=[] // On vide la liste des couples pour une nouvelle recherche
    index1=randint(Math.floor(monpavage.nb_polygones/3),Math.ceil(monpavage.nb_polygones*2/3)) // On choisit 2 points dans 2 polygones distincts.
    index2=randint(Math.floor(monpavage.nb_polygones/3),Math.ceil(monpavage.nb_polygones*2/3),index1) 
    while (!comparenbsommets(monpavage.polygones[index1],monpavage.polygones[index2])) { // On vérifie que les deux polygones sont compatibles
      index2=(index2+1)%(monpavage.polygones.length-1)
    }
    A=monpavage.barycentres[index1] // On prends  les barycentres
    B=monpavage.barycentres[index2] 
    v=vecteur(A,B)
    while (compare2sommets(A,B)){ // On vérifie qu'ils sont bien distincts sinon, on change.
    index2=randint(Math.floor(monpavage.nb_polygones/3),Math.ceil(monpavage.nb_polygones*2/3),index1) 
    while (!comparenbsommets(monpavage.polygones[index1],monpavage.polygones[index2])) { // On vérifie que les deux polygones sont compatibles
      index2=(index2+1)%(monpavage.polygones.length-1)
    }
    A=monpavage.barycentres[index1] // On prends  les barycentres
    B=monpavage.barycentres[index2] 
    v=vecteur(A,B)
  }
    d=segment(A,B)
    d.styleExtremites='->'
    d.color='red'
    d.epaisseur=3
    for (let i=1;i<= monpavage.nb_polygones; i++){ //on crée une liste des couples (antécédents, images)
      image=translacion(monpavage,v,i)
      if (image!=-1){ // si l'image du polygone i existe, on ajoute le couple à la liste
        couples.push([i,image])
      }
    }
    couples=videcouples(couples) //supprime tous les couples en double (x,y)=(y,x)
    nombreTentatives++ 
    }
    if (couples.length<this.nb_questions){
    if (this.sup3==7) {
      type_de_pavage=(type_de_pavage+1)%5+1
    }
    nombrePavageTestes++
    }
  }
  if (couples.length<this.nb_questions){
    console.log('trop de questions, augmentez la taille du pavage')
    return
  }

    objets.push(d) // la droite d est trouvée
    couples=shuffle(couples) // on mélange les couples
    for (let i = 0; i < monpavage.nb_polygones; i++) {
      objets.push(texteParPosition(nombre_avec_espace(i + 1), monpavage.barycentres[i].x + 0.5, monpavage.barycentres[i].y, 'milieu', 'gray', 1, 0, true))
    }
    if (this.sup2) { // Doit-on montrer les centres des figures ?
      for (let i = 0; i < monpavage.nb_polygones; i++) {
        objets.push(monpavage.tracesCentres[i])
      }
    }
    for (let i = 0; i < monpavage.nb_polygones; i++) { // il faut afficher tous les polygones du pavage
      objets.push(monpavage.polygones[i])
    }
    texte = mathalea2d(fenetre, objets) // monpavage.fenetre est calibrée pour faire entrer le pavage dans une feuille A4
    texte+=`<br>`
    for (let i=0;i<this.nb_questions;i++){  
      texte+=`Quel est l'image de la figure $${couples[i][0]}$ dans la translation transformant la figure $${index1+1}$ en la figure $${index2+1}$ ?<br>`
      texte_corr+=`L'image de la figure $${couples[i][0]}$ dans la translation transformant la figure $${index1+1}$ en la figure $${index2+1}$ est la figure ${couples[i][1]}<br>`
//      symetriques=associesommets(monpavage.polygones[couples[i][0]-1],monpavage.polygones[couples[i][1]-1],d)
      if (this.correction_detaillee){
        A=monpavage.barycentres[couples[i][0]-1]
        B=monpavage.barycentres[couples[i][1]-1]
        d=v.representant(A,B)
        d.color=texcolors(i)
        t=this.nb_questions*3;
        P1=monpavage.polygones[couples[i][0]-1]
        P1.color=texcolors(i)
        P1.couleurDeRemplissage=texcolors(i)
        P1.opaciteDeRemplissage=0.5
        P1.epaisseur=2
        P2=monpavage.polygones[couples[i][1]-1]
        P2.color=texcolors(i)
        P2.couleurDeRemplissage=texcolors(i)
        P2.opaciteDeRemplissage=0.5
        P2.epaisseur=2
        P3=translationAnimee(P1,v,`begin="${i*3}s;${i*3+t}s;${i*3+t*2}s" end="${i*3+2}s;${i*3+t+2}s;${i*3+t*2+2}s" dur="2s" repeatCount="indefinite" repeatDur="${9*this.nb_questions}s" id="poly-${i}-anim"`)
        P3.color=texcolors(i)
        P3.epaisseur=2
        objets_correction.push(tracePoint(A,B),d,codeSegment(A,B,'//',texcolors(i)),P1,P2,P3)
      }
    }
    if (this.correction_detaillee){
      texte_corr+=mathalea2d(fenetre, objets,objets_correction)
    }
    this.liste_questions.push(texte);
    this.liste_corrections.push(texte_corr);
    liste_de_question_to_contenu(this)
  }
	this.besoin_formulaire_numerique = ['Taille du pavage (la grande est automatique au-delà de 5 questions)', 2, '1 : Taille modeste\n 2 : Grande taille'];
  this.besoin_formulaire2_case_a_cocher=["Montrer les centres"]
	this.besoin_formulaire3_numerique=['Choix du pavage',8,'1 : Pavage de triangles équilatéraux\n2 : Pavage de carrés\n3 : Pavage d\'hexagones réguliers\n4 : Pavage 3².4.3.4\n5 : Pavage 8².4\n 6 : Pavage de losanges (hexagonal d\'écolier)\n7 : Pavage 6.3.6.3\n8 : Un des sept pavages au hasard']
}

/**
 * Construction de translaté avec dispositif d'auto-correction aléatoire
 * Ref 4G10 
 * @Auteur Jean-Claude Lhote
 * Publié le 30/11/2020
 */
function Construire_translate_point_4e() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Construire l'image d'un point par une translation avec cible auto-corrective";
  this.consigne = "";
  this.nb_questions = 1;
  this.nb_questions_modifiable = false
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.sup = 3;
  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let result = [0, 0], texte_corr = "", nbpoints = parseInt(this.sup)
    let celluleAlea = function (rang) {
      let lettre = lettre_depuis_chiffre(randint(1, rang))
      let chiffre = Number(randint(1, rang)).toString()
      return lettre + chiffre
    }
    // On prépare la figure...
    let A = point(0, 0, 'A')
    let B = rotation(point(randint(4, 6), 0), A, randint(-50, 50) + 180 * choice([0, 1]), 'B')
    let v = vecteur(B, A)
    let w = vecteur(A, B), w0
    let marks = ['/', '//', '///', 'x', 'o', 'S', 'V']
    let noms = choisit_lettres_differentes(nbpoints, 'QAB', majuscule = true)
    this.consigne = `Construire l\'image des points $${noms[0]}$`
    for (let i = 1; i < nbpoints - 1; i++) {
      this.consigne += `, $${noms[i]}$`
    }
    this.consigne += ` et $${noms[nbpoints - 1]}$ par la translation qui transforme $A$ en $B$.`;
    let cibles = [], M = [], N = [], objets_enonce = [], objets_correction = []  //cibles, M point marqués, N symétrique de M
    let cellules = []
    let xMin, yMin, xMax, yMax
    [xMin, yMin, xMax, yMax] = [0, 0, 0, 0]
    for (let i = 0; i < nbpoints; i++) { //On place les cibles.
      N.push(point(calcul(randint(-80, 80, 0) / 10), calcul(randint(-80, 80, 0) / 10), noms[i] + "\'"))
      nontrouve = true
      while (longueur(N[i], A) < 3 || nontrouve) {
        nontrouve = true
        if (longueur(N[i], A) < 3) {
          N[i].x = calcul(randint(-80, 80, 0) / 10)
          N[i].y = calcul(randint(-80, 80, 0) / 10)
        }
        else {
          assezloin = true
          for (let j = 0; j < i; j++) {
            if (longueur(N[i], N[j]) < 4.5) assezloin = false
          }
          if (assezloin == false) {
            N[i].x = calcul(randint(-80, 80, 0) / 10)
            N[i].y = calcul(randint(-80, 80, 0) / 10)
          }
          else nontrouve = false
        }
      }
    }

    objets_enonce.push(labelPoint(A, B), w.representant(A))
    objets_correction.push(labelPoint(A, B), w.representant(A))

    for (let i = 0; i < nbpoints; i++) {
      cellules.push(celluleAlea(4))
      result = dansLaCibleCarree(N[i].x, N[i].y, 4, 0.6, cellules[i])
      cible = cibleCarree({ x: result[0], y: result[1], rang: 4, num: i + 1, taille: 0.6 })
      cible.taille = 0.6
      cible.color = 'orange'
      cible.opacite = 0.7
      cibles.push(cible)
    }
    for (let i = 0; i < nbpoints; i++) {
      M.push(translation(N[i], v, noms[i]))
      objets_enonce.push(tracePoint(M[i]), labelPoint(M[i]), cibles[i])
      objets_correction.push(tracePoint(M[i], N[i]), labelPoint(M[i], N[i]), cibles[i])
      w0 = w.representant(M[i])
      w0.color = arcenciel(i)
      objets_correction.push(w0)
      texte_corr += `$${noms[i]}\'$, l\'image du point $${noms[i]}$ est dans la case ${cellules[i]} de la grille ${i + 1}.<br>`
    }

    for (let i = 0; i < nbpoints; i++) {
      xMin = Math.min(xMin, N[i].x - 3, M[i].x - 3, B.x - 1, A.x - 1)
      yMin = Math.min(yMin, N[i].y - 3, M[i].y - 3, B.y - 1, A.y - 1)
      xMax = Math.max(xMax, N[i].x + 3, M[i].x + 3, B.x + 1, A.x + 1)
      yMax = Math.max(yMax, N[i].y + 3, M[i].y + 3, B.y + 1, A.y + 1)
    }

    fenetreMathalea2d = [xMin, yMin, xMax, yMax]

    this.liste_questions.push(mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 0.7 }, objets_enonce))
    this.liste_corrections.push(texte_corr + mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 0.7 }, objets_correction))
    liste_de_question_to_contenu(this)

    //  let nonchoisi,coords=[],x,y,objets_enonce=[],objets_correction=[],nomd,label_pos

  }
  this.besoin_formulaire_numerique = ['Nombre de points (1 à 5)', 5, "1\n2\n3\n4\n5"];
  // this.besoin_formulaire2_case_a_cocher = ["Avec des points de part et d'autre"];	
}

/**
 * @auteur Jean-Claude Lhote
 * 4G20MG32
 */
function Exercice_Pythagore() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Calculer une longueur avec l'égalité de Pythagore (MG32)";
  this.consigne = "";
  this.nb_questions = 1;
  this.nb_questions_modifiable = false;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.sup = 1; // 1 calcul de l'hypoténuse 2 calcul d'un côté de l'angle droit
  sortie_html ? (this.spacing_corr = 2.5) : (this.spacing_corr = 1.5);
  this.liste_packages = "tkz-euclide";

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.type_exercice = "MG32";
    this.taille_div_MG32 = [700, 500];
    this.liste_questions = [];
    this.liste_corrections = []; // Liste de questions corrigées
    let lettre0 = randint(11, 25); // aleatoirisation du nom des points
    let s0 = lettre_depuis_chiffre(lettre0);
    lettre1 = randint(11, 25, [lettre0]);
    let s1 = lettre_depuis_chiffre(lettre1);
    lettre2 = randint(11, 25, [lettre0, lettre1]);
    let s2 = lettre_depuis_chiffre(lettre2);
    let type_de_questions;
    if (this.sup == 1) {
      type_de_questions = 1; //calcul de l'hypoténuse
    }
    if (this.sup == 2) {
      type_de_questions = 2; //calcul d'un côté de l'angle droit
    }
    if (this.sup == 3) {
      type_de_questions = randint(1, 2); //un des deux calculs
    }
    if (this.sup == 4) {
      type_de_questions = randint(3, 4);
    }
    let nom_du_triangle = choice([
      s0 + s1 + s2,
      s0 + s2 + s1,
      s1 + s0 + s2,
      s1 + s2 + s0,
      s2 + s0 + s1,
      s2 + s1 + s0,
    ]);
    let k1 = Math.round((Math.random() * 3 + 3) * 10) / 10;
    let k2 = Math.round((Math.random() * 3 + 2) * 10) / 10;
    let alpha1 = Math.random() * Math.PI - Math.PI / 2;
    let alpha1deg = Math.round((alpha1 * 180) / Math.PI);
    let x1 = k1; // coordonnées des deux sommets du triangle
    let y2 = k2;
    let s01 = arrondi_virgule(k1, 1); // mise en texte avec 1 chiffres après la virgule pour énoncé
    let s02 = arrondi_virgule(k2, 1);

    let carre01 = Math.round(k1 * k1 * 100) / 100;
    let carre02 = Math.round(k2 * k2 * 100) / 100;
    let dist12 = Math.sqrt(carre01 + carre02); //calcul de l'hypoténuse
    dist12 = Math.round(dist12 * 10) / 10; // On ne garde qu'une approximation au dixième pour l'exercice
    let s12 = arrondi_virgule(dist12, 1);
    let carre12 = Math.round(dist12 * dist12 * 100) / 100;

    let scarre01 = arrondi_virgule(carre01, 2); // carremn = distance entre (xm;ym) et (xn;yn) au carré avec 2 décimales
    let scarre02 = arrondi_virgule(carre02, 2); // scarremn = chaine de caractère avec 2 décimales après une virgule.
    let scarre12 = arrondi_virgule(carre12, 2);
    if (sortie_html) {
      let codeBase64;
      if (alpha1deg < 0) {
        codeBase64 =
          "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAQzAAACtAAAAQEAAAAAAAAAAQAAACH#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAFBAMA7AAAAAAAAwCAAAAAAAAAFAAFAcLFHrhR64UBneFHrhR64#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABYAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBHq0OVgQYlAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAWAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAFgAAAQUAAQAAAAcAAAAJAP####8BAAAAAA4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MQABNgAAAAFAGAAAAAAAAAAAABEA#####wACeDIAATQAAAABQBAAAAAAAAAAAAARAP####8ACGFscGhhZGVnAAMtOTD#####AAAAAQAMQ01vaW5zVW5haXJlAAAAAUBWgAAAAAAA#####wAAAAEAEENQb2ludERhbnNSZXBlcmUA#####wEAAAAAFgABWgDAFAAAAAAAAEAAAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAEwD#####AQAAAAAWAAFGAAAAAAAAAAAAQAgAAAAAAAAHAAAAAAoAAAAOAAAADwAAAAEAAAAAAAAAAAAAABMA#####wEAAAAAFgABRAAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAADgAAABD#####AAAAAQAJQ1JvdGF0aW9uAP####8AAAASAAAADgAAABEAAAAPAP####8AAAAAABYAAUIAQCoAAAAAAADALgAAAAAAAAcAAAAAEwAAABUAAAAPAP####8AAAAAABYAAUMAQBAAAAAAAADAOwAAAAAAAAcAAAAAFAAAABX#####AAAAAQAJQ1BvbHlnb25lAP####8AAAAAAAIAAAAEAAAAEgAAABYAAAAXAAAAEv####8AAAACABdDTWFycXVlQW5nbGVHZW9tZXRyaXF1ZQD#####AAAA#wAEAAAAAUAwAAAAAAAAAAAAFgAAABIAAAAX#####wAAAAEACENTZWdtZW50AP####8BAAD#ABAAAAEABAAAABcAAAAW#####wAAAAEAEENNYWNyb0FwcGFyaXRpb24A#####wD#AAAB#####xBAh8ij1wo9cUBHYUeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAFQXBwQkMAAAAAAAEAAAAaAP####8AAAABABFDTWFjcm9EaXNwYXJpdGlvbgD#####AP8AAAH#####EECKaKPXCj1xQEphR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAZNYXNxQkMAAAAAAAEAAAAa#####wAAAAEAC0NNYWNyb1BhdXNlAP####8A#wAAAf####8QQI1oo9cKPXFASuFHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAABVBhdXNlAAAAAAABAAAAGQD#####AAAA#wH#####EECIIKPXCj1xQFqwo9cKPXACAAAAAAAAAAAAAAAAAQAAAAAAAAAAAApNYXNxQW5nZHJ0AAAAAAABAAAAGQAAABgA#####wAAAP8B#####xBAjAij1wo9cUBa8KPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAJQXBwQW5nRHJ0AAAAAAABAAAAGQD#####AAAAAQARQ01hY3JvU3VpdGVNYWNyb3MA#####wAAAP8B#####xBAWMUeuFHrhUB4fCj1wo9cAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAALaHlwb3TDqW51c2UAAAAAAAsAAAAeAAAAGwAAAB0AAAAfAAAAHAAAAB0AAAAeAAAAGwAAAB0AAAAcAAAAHwAAAA7##########w==";
      } else {
        codeBase64 =
          "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAQzAAACtAAAAQEAAAAAAAAAAQAAACH#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAFBAMAUAAAAAAAAQBQAAAAAAAAFAAFAbFo9cKPXBkB0BhR64Ueu#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABYAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBHq0OVgQYlAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAWAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAFgAAAQUAAQAAAAcAAAAJAP####8BAAAAAA4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MQABNgAAAAFAGAAAAAAAAAAAABEA#####wACeDIAATQAAAABQBAAAAAAAAAAAAARAP####8ACGFscGhhZGVnAAI5MAAAAAFAVoAAAAAAAP####8AAAABABBDUG9pbnREYW5zUmVwZXJlAP####8BAAAAABYAAVoAwBQAAAAAAABAAAAAAAAAAAcAAAAACgAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAABIA#####wEAAAAAFgABRgAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAADgAAAA8AAAABAAAAAAAAAAAAAAASAP####8BAAAAABYAAUQAAAAAAAAAAABACAAAAAAAAAcAAAAACgAAAAEAAAAAAAAAAAAAAA4AAAAQ#####wAAAAEACUNSb3RhdGlvbgD#####AAAAEgAAAA4AAAARAAAADwD#####AAAAAAAWAAFCAEAqAAAAAAAAwDgAAAAAAAAHAAAAABMAAAAVAAAADwD#####AAAAAAAWAAFDAMA3AAAAAAAAwEAAAAAAAAAHAAAAABQAAAAV#####wAAAAEACUNQb2x5Z29uZQD#####AAAAAAACAAAABAAAABIAAAAWAAAAFwAAABL#####AAAAAgAXQ01hcnF1ZUFuZ2xlR2VvbWV0cmlxdWUA#####wAAAP8ABAAAAAFAMAAAAAAAAAAAABYAAAASAAAAF#####8AAAABAAhDU2VnbWVudAD#####AQAA#wAQAAABAAQAAAAXAAAAFv####8AAAABABBDTWFjcm9BcHBhcml0aW9uAP####8A#wAAAf####8QQIfIo9cKPXFAR2FHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAABUFwcEJDAAAAAAABAAAAGgD#####AAAAAQARQ01hY3JvRGlzcGFyaXRpb24A#####wAAAP8B#####xBAimij1wo9cUBKYUeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAGTWFzcUJDAAAAAAABAAAAGv####8AAAABAAtDTWFjcm9QYXVzZQD#####AP8AAAH#####EECNaKPXCj1xQErhR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAVQYXVzZQAAAAAAAQAAABgA#####wAAAP8B#####xBAh#Cj1wo9cUBbcKPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAKTWFzcUFuZ0RydAAAAAAAAQAAABkAAAAXAP####8AAAD#Af####8QQIw4o9cKPXFAXPCj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAACUFwcEFuZ0RydAAAAAAAAQAAABkA#####wAAAAEAEUNNYWNyb1N1aXRlTWFjcm9zAP####8AAAD#Af####8QQFjFHrhR64VAeHwo9cKPXAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAC2h5cG90w6ludXNlAAAAAAALAAAAHgAAABsAAAAdAAAAHwAAABwAAAAdAAAAHgAAABsAAAAdAAAAHwAAABwAAAAO##########8=";
      }

      if (type_de_questions == 1) {

        // calcul direct de l'hypoténuse
        texte = `Dans la figure ci-dessous, le triangle $${nom_du_triangle}$ est rectangle en $${s0}$, $${s0 + s1
          }=${s01}$ cm, $${s0 + s2}=${s02}$ cm.`;
        texte += `<br>Le point $${s0}$ peut être déplacé.<br>`;
        texte += `Calculer $${s1 + s2}$.`;
        texte_corr = `Dans le triangle $${nom_du_triangle}$ rectangle en $${s0}$, d&rsquo;après le théorème de Pythagore, on a : $${s1 + s2
          }^2 = ${s0 + s1}^2~+~${s0 + s2}^2.$<br>`;
        texte_corr +=
          "D&rsquo;où " +
          `$${s1 + s2
          }^2~=~${s01}^2~+~${s02}^2~=~${scarre01}~+~${scarre02}~=~${arrondi_virgule(
            carre02 + carre01,
            2
          )}.$` +
          "<br>";
        texte_corr +=
          "Soit " +
          `$${s1 + s2}~=~\\sqrt{${arrondi_virgule(
            carre02 + carre01,
            2
          )}}~\\approx${s12}$` +
          " cm.";
      }
      if (type_de_questions == 2) {
        // Calcul d'un côté de l'angle droit
        texte = `Dans la figure ci-dessous, le triangle $${nom_du_triangle}$ est rectangle en $${s0}$, $${s0 + s1
          }=${s01}$ cm, $${s1 + s2}=${s12}$ cm.<br>`;
        texte += `Calculer $${s0 + s2}$.`;
        texte_corr = `Dans le triangle $${nom_du_triangle}$ rectangle en $${s0}$, d&rsquo;après le théorème de Pythagore, on a : $${s1 + s2
          }^2 = ${s0 + s1}^2~+~${s0 + s2}^2.$<br>`;
        texte_corr +=
          "D&rsquo;où " +
          `$${s0 + s2}^2~=~${s1 + s2}^2~-~${s0 + s1
          }^2 = ${s12}^2~-~${s01}^2~=~${scarre12}~-~${scarre01}~=~${arrondi_virgule(
            carre12 - carre01,
            2
          )}.$` +
          "<br>";
        texte_corr +=
          "Soit " +
          `$${s0 + s2}~=~\\sqrt{${arrondi_virgule(
            carre12 - carre01,
            2
          )}}~\\approx${s02}$` +
          " cm.";
      }
      if (type_de_questions < 3) {
        this.type_exercice = "MG32";
        this.MG32codeBase64 = codeBase64;
        this.MG32code_pour_modifier_la_figure = `
				mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "x2", "${y2}");
		        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "x1", "${x1}");
				mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "alphadeg", "${alpha1deg}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","A","${s0}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","B","${s1}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","C","${s2}");
				mtg32App.calculate("MG32svg${numero_de_l_exercice}");
	        	mtg32App.display("MG32svg${numero_de_l_exercice}");
				`;
        texte += `<br>$\\footnotesize{\\textit{Le point \\thickspace ${s0} peut être déplacé (si la figure est tronquée).}}$<br>`;
      } else {
        this.type_exercice = "";
      }
      this.liste_questions.push(texte);
      this.liste_corrections.push(texte_corr);
      if (type_de_questions < 3) {
        liste_de_question_to_contenu(this);
      } else {
        liste_de_question_to_contenu_sans_numero(this);
      }
    } else {
      if (type_de_questions < 3) {
        texte =
          "\\begin{minipage}{.7 \\linewidth} 	\\vspace{0cm} Sur la figure ci-contre (qui n'est pas en vraie grandeur), on a  : \\begin{itemize}";
        texte +=
          "\n\t\\item Le côté " +
          `$[${s0 + s1}]$` +
          " est perpendiculaire au côté " +
          `$[${s0 + s2}]~;$`;
        if (type_de_questions == 1) {
          //niveau 1 : Calcul de l'hypoténuse

          // enoncé  niveau 1

          texte +=
            "\n\t\\item " + `$${s0 + s1 + " = " + s01 + "~\\text{cm}~;"}$`;
          texte +=
            "\n\t\\item " + `$${s0 + s2 + " = " + s02 + "~\\text{cm}~;"}$`;
          texte +=
            "\\end{itemize} \\bigskip\n\t  Calculer " +
            `$${s1 + s2}$` +
            " à 0,1 près. \\end{minipage}";
        } else {
          // niveau 2 : Calcul d'un côté de l'angle droit
          // enoncé  niveau 2

          texte +=
            "\n\t\\item " + `$${s1 + s2 + " = " + s12 + "~\\text{cm}~;"}$`;
          texte +=
            "\n\t\\item " + `$${s0 + s1 + " = " + s01 + "~\\text{cm}~;"}$`;
          texte +=
            "\\end{itemize} \\bigskip  Calculer " +
            `$${s0 + s2}$` +
            " à 0,1 près. \\end{minipage}";
        }
        texte += "\\begin{minipage}{0.3 \\linewidth}";
        // dessin de la figure
        let scale = 0.7 * 6 / Math.max(x1, y2)
        texte += `\n \\begin{tikzpicture}[scale=${scale}]`; // Balise début de figure
        texte +=
          "\n\t \\tkzDefPoints{0/0/" + s0 + "," + x1 + "/0/B,0/" + y2 + "/C}"; // créer les points du triangle initial
        // Définit les points M et N par homothétie de centre C et de rapport 0,3<k<0,8
        texte +=
          "\n\t \\tkzDefPointBy[rotation= center " +
          s0 +
          " angle " +
          alpha1deg +
          "](B) \\tkzGetPoint{" +
          s1 +
          "}"; // transformer le premier point par rotation
        texte +=
          "\n\t \\tkzDefPointBy[rotation= center " +
          s0 +
          " angle " +
          alpha1deg +
          "](C) \\tkzGetPoint{" +
          s2 +
          "}"; // transformer le deuxième point par rotation
        texte += "\n\t \\tkzDrawPolygon(" + s0 + "," + s1 + "," + s2 + ")"; // Trace le triangle
        // marquer l'angle droit
        texte +=
          "\n\t \\tkzDefPointBy[homothety=center " +
          s0 +
          " ratio 0.1](" +
          s1 +
          ")" +
          "\\tkzGetPoint{B}";
        texte +=
          "\n\t \\tkzDefPointBy[rotation= center " +
          s0 +
          " angle 90](B) \\tkzGetPoint{C}";
        texte +=
          "\n\t \\tkzDefPointBy[homothety=center " +
          s0 +
          " ratio 0.1414](" +
          s1 +
          ")" +
          "\\tkzGetPoint{A}";
        texte +=
          "\n\t \\tkzDefPointBy[rotation= center " +
          s0 +
          " angle 45](A) \\tkzGetPoint{A}";
        texte += "\n\t \\tkzDrawPolygon(" + s0 + ",B,A,C)"; // Trace la marque d'angle droit

        if (alpha1deg > 0) {
          // rotation "angle droit dessous"
          texte += "\n\t \\tkzLabelPoints[below](" + s0 + ")"; //nomme les points
          texte += "\n\t \\tkzLabelPoints[right](" + s1 + ")";
          texte += "\n\t \\tkzLabelPoints[left](" + s2 + ")";
        } else {
          // rotation "angle droit dessus" position du nom inversée
          texte += "\n\t \\tkzLabelPoints[above](" + s0 + ")"; //nomme les points
          texte += "\n\t \\tkzLabelPoints[left](" + s1 + ")";
          texte += "\n\t \\tkzLabelPoints[right](" + s2 + ")";
        }
        texte += "\n \\end{tikzpicture}"; // Balise de fin de figure
        texte += "\\end{minipage}";
      } else {
        texte =
          "\\begin{minipage}{.5 \\linewidth} 	\\vspace{0cm} Dans le triangle " +
          `${nom_du_triangle}` +
          " rectangle en " +
          `${s0}` +
          " : \\begin{itemize}";
        // texte += '\n\t\\item Le côté ' + `$[${s0 + s1}]$` + ' est perpendiculaire au côté ' + `$[${s0 + s2}]~;$`
        if (type_de_questions == 1) {
          //niveau 1 : Calcul de l'hypoténuse

          // enoncé  niveau 1

          texte +=
            "\n\t\\item " + `$${s0 + s1 + " = " + s01 + "~\\text{cm}~;"}$`;
          texte +=
            "\n\t\\item " + `$${s0 + s2 + " = " + s02 + "~\\text{cm}~;"}$`;
          texte +=
            "\\end{itemize} \\bigskip\n\t  Calculer " +
            `$${s1 + s2}$` +
            " à 0,1 près. \\end{minipage}";
        } else {
          // niveau 2 : Calcul d'un côté de l'angle droit
          // enoncé  niveau 2

          texte +=
            "\n\t\\item " + `$${s1 + s2 + " = " + s12 + "~\\text{cm}~;"}$`;
          texte +=
            "\n\t\\item " + `$${s0 + s1 + " = " + s01 + "~\\text{cm}~;"}$`;
          texte +=
            "\\end{itemize} \\bigskip  Calculer " +
            `$${s0 + s2}$` +
            " à 0,1 près. \\end{minipage}";
        }
      }
      this.liste_questions.push(texte); // on envoie la question
      // correction
      if (type_de_questions == 2 || type_de_questions == 4) {
        //niveau 2 : Calcul d'un côté de l'angle droit
        texte_corr =
          "Le triangle " +
          `$${nom_du_triangle}$` +
          " est rectangle en " +
          `$${s0}.$` +
          "<br>\n D'après le théorème de Pythagore, on a :~" +
          `$${s1 + s2}^2 = ${s0 + s1}^2~+~${s0 + s2}^2.$`;
        texte_corr +=
          "<br>\n D'où " +
          `$${s0 + s2}^2~=~${s1 + s2}^2~-~${s0 + s1
          }^2 = ${s12}^2~-~${s01}^2~=~${scarre12}~-~${scarre01}~=~${arrondi_virgule(
            carre12 - carre01,
            2
          )}.$`;
        texte_corr +=
          "<br>\n Soit " +
          `$${s0 + s2}~=~\\sqrt{${arrondi_virgule(
            carre12 - carre01,
            2
          )}}~`;
        if (s02 == calcul(Math.sqrt(s12 ** 2 - s01 ** 2))) texte_corr += `=${s02}~\\text{cm}.$`
        else texte += `\\approx${s02}~\\text{cm}.$`;
      } else {
        texte_corr =
          "Le triangle " +
          `$${nom_du_triangle}$` +
          " est rectangle en " +
          `$${s0}.$` +
          "<br>\n D'après le théorème de Pythagore, on a " +
          `$${s1 + s2}^2 = ${s0 + s1}^2~+~${s0 + s2}^2.$`;
        texte_corr +=
          "<br>\n D'où " +
          `$${s1 + s2
          }^2~=~${s01}^2~+~${s02}^2~=~${scarre01}~+~${scarre02}~=~${arrondi_virgule(
            carre02 + carre01,
            2
          )}.$`;
        texte_corr +=
          "<br>\n Soit " +
          `$${s1 + s2}~=~\\sqrt{${arrondi_virgule(
            carre02 + carre01,
            2
          )}}~`;
        if (s12 == calcul(Math.sqrt(s01 ** 2 + s02 ** 2))) texte_corr += `=${s12}~\\text{cm}.$`
        else texte += `\\approx${s12}~\\text{cm}.$`;
      }

      this.liste_corrections.push(texte_corr);

      liste_de_question_to_contenu_sans_numero(this);

      // }end for
    }
  };
  this.besoin_formulaire_numerique = [
    "Niveau de difficulté",
    4,
    "1 : Calcul de l'hypoténuse \n 2 : Calcul d'un côté de l'angle droit\n 3 : Calcul d'un côté quelconque\n 4 : Sans la figure",
  ];
}

/**
 * @auteur Jean-Claude Lhote
 * 3G30
 */
function Exercice_Trigo_longueurs() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Déterminer une longueur grâce à la trigonométrie";
  this.consigne = "";
  this.nb_questions = 1;
  this.nb_questions_modifiable = false;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.spacing = 1;
  this.quatrieme = false;
  this.sup = 1; // 1 utilisation du cosinus exclusivement 2 utilisation des 3 fonctions trigo
  sortie_html ? (this.spacing_corr = 3) : (this.spacing_corr = 1.5);
  this.liste_packages = "tkz-euclide";

  this.nouvelle_version = function (numero_de_l_exercice) {
    let lettre1, lettre2, texte, texte_corr;
    this.bouton_aide = modal_youtube(
      numero_de_l_exercice,
      "DYW-BTMFzd4",
      "Trigonométrie (vidéo de digiSchool)"
    );
    this.type_exercice = "MG32";
    this.taille_div_MG32 = [700, 500];
    this.liste_questions = [];
    this.liste_corrections = []; // Liste de questions corrigées
    let lettre0 = randint(11, 25); // aleatoirisation du nom des points
    let s0 = lettre_depuis_chiffre(lettre0);
    lettre1 = randint(11, 25, [lettre0]);
    let s1 = lettre_depuis_chiffre(lettre1);
    lettre2 = randint(11, 25, [lettre0, lettre1]);
    let s2 = lettre_depuis_chiffre(lettre2);
    let angle1;
    let type_de_questions;
    if (this.sup == 1) type_de_questions = choice([1, 3, 5]); // on multiplie par cos, sin ou tan
    if (this.sup == 2) type_de_questions = choice([2, 4, 6]); // on divise par cos, sin ou tan
    if (this.sup == 3) type_de_questions = randint(1, 6);
    if (this.quatrieme) type_de_questions = ((type_de_questions - 1) % 2) + 1; // on n'utilise que le cosinus.
    let nom_du_triangle = choice([
      s0 + s1 + s2,
      s0 + s2 + s1,
      s1 + s0 + s2,
      s1 + s2 + s0,
      s2 + s0 + s1,
      s2 + s1 + s0,
    ]);
    let k1 = Math.round((Math.random() * 5 + 1) * 10) / 10;
    let k2 = Math.round((Math.random() * 5 + 1) * 10) / 10;
    angle1 = Math.round(Math.degres(Math.atan(k2 / k1)));
    let alpha1 = Math.random() * Math.PI - Math.PI / 2;
    let alpha1deg = Math.round((alpha1 * 180) / Math.PI);
    let x1 = k1; // coordonnées des deux sommets du triangle
    let y2 = k2;
    let s01 = arrondi_virgule(k1, 1); // mise en texte avec 1 chiffres après la virgule pour énoncé
    let s02 = arrondi_virgule(k2, 1);

    let dist12 = k1 / Math.cos(Math.atan(k2 / k1)); //calcul de l'hypoténuse
    dist12 = Math.round(dist12 * 10) / 10; // On ne garde qu'une approximation au dixième pour l'exercice
    let s12 = arrondi_virgule(dist12, 1);
    texte_corr = `Dans le triangle $${nom_du_triangle}$ rectangle en $${s0}$ :<br>`;
    if (sortie_html) {
      // sortie html MG32
      let codeBase64;
      if (alpha1deg < 0) {
        codeBase64 =
          "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACL#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAFBAMA7AAAAAAAAwCAAAAAAAAAFAAFAcLFHrhR64UBneFHrhR64#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABYAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBHq0OVgQYlAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAWAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAFgAAAQUAAQAAAAcAAAAJAP####8BAAAAAA4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MQABNgAAAAFAGAAAAAAAAAAAABEA#####wACeDIAATQAAAABQBAAAAAAAAAAAAARAP####8ACGFscGhhZGVnAAMtOTD#####AAAAAQAMQ01vaW5zVW5haXJlAAAAAUBWgAAAAAAA#####wAAAAEAEENQb2ludERhbnNSZXBlcmUA#####wEAAAAAFgABWgDAFAAAAAAAAEAAAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAEwD#####AQAAAAAWAAFGAAAAAAAAAAAAQAgAAAAAAAAHAAAAAAoAAAAOAAAADwAAAAEAAAAAAAAAAAAAABMA#####wEAAAAAFgABRAAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAADgAAABD#####AAAAAQAJQ1JvdGF0aW9uAP####8AAAASAAAADgAAABEAAAAPAP####8AAAAAABYAAUIAQCoAAAAAAADALgAAAAAAAAcAAAAAEwAAABUAAAAPAP####8AAAAAABYAAUMAQBAAAAAAAADAOwAAAAAAAAcAAAAAFAAAABX#####AAAAAQAJQ1BvbHlnb25lAP####8AAAAAAAIAAAAEAAAAEgAAABYAAAAXAAAAEv####8AAAACABdDTWFycXVlQW5nbGVHZW9tZXRyaXF1ZQD#####AAAA#wAEAAAAAUAwAAAAAAAAAAAAFgAAABIAAAAX#####wAAAAEACENTZWdtZW50AP####8BAAD#ABAAAAEABAAAABcAAAAW#####wAAAAEAEENNYWNyb0FwcGFyaXRpb24A#####wD#AAAB#####xBAh8ij1wo9cUBHYUeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAFQXBwQkMAAAAAAAEAAAAaAP####8AAAABABFDTWFjcm9EaXNwYXJpdGlvbgD#####AP8AAAH#####EECKaKPXCj1xQEphR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAZNYXNxQkMAAAAAAAEAAAAa#####wAAAAEAC0NNYWNyb1BhdXNlAP####8A#wAAAf####8QQI1oo9cKPXFASuFHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAABVBhdXNlAAAAAAABAAAAGQD#####AAAA#wH#####EECIIKPXCj1xQFqwo9cKPXACAAAAAAAAAAAAAAAAAQAAAAAAAAAAAApNYXNxQW5nZHJ0AAAAAAABAAAAGQAAABgA#####wAAAP8B#####xBAjAij1wo9cUBa8KPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAJQXBwQW5nRHJ0AAAAAAABAAAAGQD#####AAAAAQARQ01hY3JvU3VpdGVNYWNyb3MA#####wAAAP8B#####xBAWMUeuFHrhUB4fCj1wo9cAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAALaHlwb3TDqW51c2UAAAAAAAsAAAAeAAAAGwAAAB0AAAAfAAAAHAAAAB0AAAAeAAAAGwAAAB0AAAAcAAAAHwAAABYA#####wAAAP8ABQAAACBAQIGJiJxJngAAAAEAAAAWAAAAFwAAAA7##########w==";
      } else {
        codeBase64 =
          "TWF0aEdyYXBoSmF2YTEuMAAAABI#AAAAAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACL#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAFBAMAUAAAAAAAAQBQAAAAAAAAFAAFAbFo9cKPXBkB0BhR64Ueu#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABYAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBHq0OVgQYlAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAWAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAFgAAAQUAAQAAAAcAAAAJAP####8BAAAAAA4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MQABNgAAAAFAGAAAAAAAAAAAABEA#####wACeDIAATQAAAABQBAAAAAAAAAAAAARAP####8ACGFscGhhZGVnAAI5MAAAAAFAVoAAAAAAAP####8AAAABABBDUG9pbnREYW5zUmVwZXJlAP####8BAAAAABYAAVoAwBQAAAAAAABAAAAAAAAAAAcAAAAACgAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAABIA#####wEAAAAAFgABRgAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAADgAAAA8AAAABAAAAAAAAAAAAAAASAP####8BAAAAABYAAUQAAAAAAAAAAABACAAAAAAAAAcAAAAACgAAAAEAAAAAAAAAAAAAAA4AAAAQ#####wAAAAEACUNSb3RhdGlvbgD#####AAAAEgAAAA4AAAARAAAADwD#####AAAAAAAWAAFCAEAqAAAAAAAAwDgAAAAAAAAHAAAAABMAAAAVAAAADwD#####AAAAAAAWAAFDAMA3AAAAAAAAwEAAAAAAAAAHAAAAABQAAAAV#####wAAAAEACUNQb2x5Z29uZQD#####AAAAAAACAAAABAAAABIAAAAWAAAAFwAAABL#####AAAAAgAXQ01hcnF1ZUFuZ2xlR2VvbWV0cmlxdWUA#####wAAAP8ABAAAAAFAMAAAAAAAAAAAABYAAAASAAAAF#####8AAAABAAhDU2VnbWVudAD#####AQAA#wAQAAABAAQAAAAXAAAAFv####8AAAABABBDTWFjcm9BcHBhcml0aW9uAP####8A#wAAAf####8QQIfIo9cKPXFAR2FHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAABUFwcEJDAAAAAAABAAAAGgD#####AAAAAQARQ01hY3JvRGlzcGFyaXRpb24A#####wAAAP8B#####xBAimij1wo9cUBKYUeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAGTWFzcUJDAAAAAAABAAAAGv####8AAAABAAtDTWFjcm9QYXVzZQD#####AP8AAAH#####EECNaKPXCj1xQErhR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAVQYXVzZQAAAAAAAQAAABgA#####wAAAP8B#####xBAh#Cj1wo9cUBbcKPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAKTWFzcUFuZ0RydAAAAAAAAQAAABkAAAAXAP####8AAAD#Af####8QQIw4o9cKPXFAXPCj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAACUFwcEFuZ0RydAAAAAAAAQAAABkA#####wAAAAEAEUNNYWNyb1N1aXRlTWFjcm9zAP####8AAAD#Af####8QQFjFHrhR64VAeHwo9cKPXAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAC2h5cG90w6ludXNlAAAAAAALAAAAHgAAABsAAAAdAAAAHwAAABwAAAAdAAAAHgAAABsAAAAdAAAAHwAAABwAAAAVAP####8AAAD#AAUAAAAgQEHcp2T0QTQAAAABAAAAFgAAABcAAAAO##########8=";
      }
      texte = `Dans la figure ci-dessous, le triangle $${nom_du_triangle}$ est rectangle en $${s0}$.<br>`;

      if (type_de_questions == 1) {
        // calcul du côté adjacent (cosinus)
        texte += `L'angle $\\widehat{${s0 + s1 + s2
          }}$ mesure $${angle1}\\degree$, $${s1 + s2}=${s12}$ cm.<br>`;
        texte += `Calculer $${s0 + s1}$.`;
      }
      if (type_de_questions == 2) {
        // Calcul de l'hypoténuse (1/cosinus)
        texte += `L'angle $\\widehat{${s0 + s1 + s2
          }}$ mesure $${angle1}\\degree$, $${s0 + s1}=${s01}$ cm.<br>`;
        texte += `Calculer $${s1 + s2}$.`;
      }
      if (type_de_questions == 3) {
        // calcul du côté opposé (sinus)
        texte += `L'angle $\\widehat{${s0 + s1 + s2
          }}$ mesure $${angle1}\\degree$, $${s1 + s2}=${s12}$ cm.<br>`;
        texte += `Calculer $${s0 + s2}$.`;
      }
      if (type_de_questions == 4) {
        // Calcul de l'hypoténuse (1/sinus)
        texte += `L'angle $\\widehat{${s0 + s1 + s2
          }}$ mesure $${angle1}\\degree$, $${s0 + s2}=${s02}$ cm.<br>`;
        texte += `Calculer $${s1 + s2}$.`;
      }
      if (type_de_questions == 5) {
        // calcul du côté opposé (tangente)
        texte += `L'angle $\\widehat{${s0 + s1 + s2
          }}$ mesure $${angle1}\\degree$, $${s0 + s1}=${s01}$ cm.<br>`;
        texte += `Calculer $${s0 + s2}$.`;
      }
      if (type_de_questions == 6) {
        // Calcul du côté adjacent (1/tangente)
        texte += `L'angle $\\widehat{${s0 + s1 + s2
          }}$ mesure $${angle1}\\degree$, $${s0 + s2}=${s02}$ cm.<br>`;
        texte += `Calculer $${s0 + s1}$.`;
      }

      this.type_exercice = "MG32";
      this.MG32codeBase64 = codeBase64;
      this.MG32code_pour_modifier_la_figure = `
				mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "x2", "${y2}");
		        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "x1", "${x1}");
				mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "alphadeg", "${alpha1deg}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","A","${s0}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","B","${s1}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","C","${s2}");
				mtg32App.calculate("MG32svg${numero_de_l_exercice}");
	        	mtg32App.display("MG32svg${numero_de_l_exercice}");
				`;
      texte += `<br>$\\footnotesize{\\textit{Le point \\thickspace ${s0} peut être déplacé (si la figure est tronquée).}}$<br>`;
    } else {
      //sortie Latex
      texte = `\\begin{minipage}{.7 \\linewidth} 	\\vspace{0cm} Sur la figure ci-contre, on a  : \\begin{itemize}`;
      texte += `\n\t\\item Le triangle $${nom_du_triangle}$ est rectangle en $${s0}$~;`;

      if (type_de_questions == 1) {
        // Calcul du coté adjacent (cosinus)
        texte += `\n\t\\item $${s1 + s2}=${s12}~\\text{cm}$`;
        texte += `\n\t\\item L'angle $\\widehat{${s0 + s1 + s2
          }}$~mesure~$${angle1}\\degree$.<br>`;
        texte += `\\end{itemize} \\bigskip\n\t  Calculer $${s0 + s1
          }$ à 0,1 près. \\end{minipage}`;
      }
      if (type_de_questions == 2) {
        // Calcul de l'hypoténuse (1/cosinus)
        texte += `\n\t\\item $${s0 + s1}=${s01}~\\text{cm}$`;
        texte += `\n\t\\item L'angle $\\widehat{${s0 + s1 + s2
          }}$~mesure~$${angle1}\\degree$.<br>`;
        texte += `\\end{itemize} \\bigskip\n\t  Calculer $${s1 + s2
          }$ à 0,1 près. \\end{minipage}`;
      }
      if (type_de_questions == 3) {
        // Calcul du coté opposé (sinus)
        texte += `\n\t\\item $${s1 + s2}=${s12}~\\text{cm}$`;
        texte += `\n\t\\item L'angle $\\widehat{${s0 + s1 + s2
          }}$~mesure~$${angle1}\\degree$.<br>`;
        texte += `\\end{itemize} \\bigskip\n\t  Calculer $${s0 + s2
          }$ à 0,1 près. \\end{minipage}`;
      }
      if (type_de_questions == 4) {
        // Calcul de l'hypoténuse (1/sinus)
        texte += `\n\t\\item $${s0 + s2}=${s02}~\\text{cm}$`;
        texte += `\n\t\\item L'angle $\\widehat{${s0 + s1 + s2
          }}$~mesure~$${angle1}\\degree$.<br>`;
        texte += `\\end{itemize} \\bigskip\n\t  Calculer $${s1 + s2
          }$ à 0,1 près. \\end{minipage}`;
      }
      if (type_de_questions == 5) {
        // Calcul du côté opposé (tangente)
        texte += `\n\t\\item $${s0 + s1}=${s01}~\\text{cm}$`;
        texte += `\n\t\\item L'angle $\\widehat{${s0 + s1 + s2
          }}$~mesure~$${angle1}\\degree$.<br>`;
        texte += `\\end{itemize} \\bigskip\n\t  Calculer $${s0 + s2
          }$ à 0,1 près. \\end{minipage}`;
      }
      if (type_de_questions == 6) {
        // Calcul du côté adjacent (1/tangente)
        texte += `\n\t\\item $${s0 + s2}=${s02}~\\text{cm}$`;
        texte += `\n\t\\item L'angle $\\widehat{${s0 + s1 + s2
          }}$~mesure~$${angle1}\\degree$.<br>`;
        texte += `\\end{itemize} \\bigskip\n\t  Calculer $${s0 + s1
          }$ à 0,1 près. \\end{minipage}`;
      }
      texte += "\\begin{minipage}{0.3 \\linewidth}";
      // dessin de la figure
      texte += "\n \\begin{tikzpicture}[scale=0.7]"; // Balise début de figure
      texte +=
        "\n\t \\tkzDefPoints{0/0/" + s0 + "," + x1 + "/0/B,0/" + y2 + "/C}"; // créer les points du triangle initial
      // Définit les points M et N par homothétie de centre C et de rapport 0,3<k<0,8
      texte +=
        "\n\t \\tkzDefPointBy[rotation= center " +
        s0 +
        " angle " +
        alpha1deg +
        "](B) \\tkzGetPoint{" +
        s1 +
        "}"; // transformer le premier point par rotation
      texte +=
        "\n\t \\tkzDefPointBy[rotation= center " +
        s0 +
        " angle " +
        alpha1deg +
        "](C) \\tkzGetPoint{" +
        s2 +
        "}"; // transformer le deuxième point par rotation
      texte += "\n\t \\tkzDrawPolygon(" + s0 + "," + s1 + "," + s2 + ")"; // Trace le triangle
      // marquer l'angle droit
      texte +=
        "\n\t \\tkzDefPointBy[homothety=center " +
        s0 +
        " ratio 0.1](" +
        s1 +
        ")" +
        "\\tkzGetPoint{B}";
      texte +=
        "\n\t \\tkzDefPointBy[rotation= center " +
        s0 +
        " angle 90](B) \\tkzGetPoint{C}";
      texte +=
        "\n\t \\tkzDefPointBy[homothety=center " +
        s0 +
        " ratio 0.1414](" +
        s1 +
        ")" +
        "\\tkzGetPoint{A}";
      texte +=
        "\n\t \\tkzDefPointBy[rotation= center " +
        s0 +
        " angle 45](A) \\tkzGetPoint{A}";
      texte += "\n\t \\tkzDrawPolygon(" + s0 + ",B,A,C)"; // Trace la marque d'angle droit
      if (alpha1deg > 0) {
        // rotation "angle droit dessous"
        texte += "\n\t \\tkzLabelPoints[below](" + s0 + ")"; //nomme les points
        texte += "\n\t \\tkzLabelPoints[above right](" + s1 + ")";
        texte += "\n\t \\tkzLabelPoints[left](" + s2 + ")";
      } else {
        // rotation "angle droit dessus" position du nom inversée
        texte += "\n\t \\tkzLabelPoints[left](" + s0 + ")"; //nomme les points
        texte += "\n\t \\tkzLabelPoints[below left](" + s1 + ")";
        texte += "\n\t \\tkzLabelPoints[above right](" + s2 + ")";
      }
      texte += "\n \\end{tikzpicture}"; // Balise de fin de figure
      texte += "\\end{minipage}";
    }
    if (type_de_questions == 1) {
      texte_corr += `Le cosinus de l'angle $\\widehat{${s0 + s1 + s2
        }}$ est défini par :<br>`;
      texte_corr += `$\\cos \\left(\\widehat{${s0 + s1 + s2
        }}\\right)=${tex_fraction(s0 + s1, s1 + s2)}$<br>`;
      texte_corr += `Avec les données numériques :<br>`;
      texte_corr += `$\\dfrac{\\cos\\left(${angle1}\\degree\\right)}{\\color{red}{1}}=${tex_fraction(
        s0 + s1,
        s12
      )}$<br>`;
      texte_corr += `$\\bf\\textcolor{red}{Les~ produits~ en~ croix~ sont~ \\acute{e}gaux~donc~ :}$<br>`;
      texte_corr += `$${s0 + s1}=${quatrieme_proportionnelle(
        "\\color{red}{1}",
        s12,
        `\\cos\\left(${angle1}\\degree\\right)`
      )}$<br>`; // ${s12}\\times\\cos\\left(${angle1}\\degree\\right)$<br>`;
      texte_corr += `Soit $${s0 + s1}\\approx${s01}$ cm.`;
    }
    if (type_de_questions == 2) {
      texte_corr += `Le cosinus de l'angle $\\widehat{${s0 + s1 + s2
        }}$ est défini par :<br>`;
      texte_corr += `$\\cos \\left(\\widehat{${s0 + s1 + s2
        }}\\right)=${tex_fraction(s0 + s1, s1 + s2)}$<br>`;
      texte_corr += `Avec les données numériques :<br>`;
      texte_corr += `$\\dfrac{\\cos\\left(${angle1}\\degree\\right)}{\\color{red}{1}}=${tex_fraction(
        s01,
        s1 + s2
      )}$<br>`;
      texte_corr += `$\\bf\\textcolor{red}{Les~ produits~ en~ croix~ sont~ \\acute{e}gaux~donc~ :}$<br>`;
      texte_corr += `$${s1 + s2}=${quatrieme_proportionnelle(
        `\\cos\\left(${angle1}\\degree\\right)`,
        s01,
        "\\color{red}{1}"
      )}$<br>`; // ${s01}\\div\\cos\\left(${angle1}\\degree\\right)$<br>`;
      texte_corr += `Soit $${s1 + s2}\\approx${s12}$ cm.`;
    }
    if (type_de_questions == 3) {
      texte_corr += `Le sinus de l'angle $\\widehat{${s0 + s1 + s2
        }}$ est défini par :<br>`;
      texte_corr += `$\\sin \\left(\\widehat{${s0 + s1 + s2
        }}\\right)=${tex_fraction(s0 + s2, s1 + s2)}$<br>`;
      texte_corr += `Avec les données numériques :<br>`;
      texte_corr += `$\\dfrac{\\sin\\left(${angle1}\\degree\\right)}{\\color{red}{1}}=${tex_fraction(
        s0 + s2,
        s12
      )}$<br>`;
      texte_corr += `$\\bf\\textcolor{red}{Les~ produits~ en~ croix~ sont~ \\acute{e}gaux~donc~ :}$<br>`;
      texte_corr += `$${s0 + s2}=${quatrieme_proportionnelle(
        "\\color{red}{1}",
        s12,
        `\\sin\\left(${angle1}\\degree\\right)`
      )}$<br>`;
      texte_corr += `Soit $${s0 + s2}\\approx${s02}$ cm.`;
    }
    if (type_de_questions == 4) {
      texte_corr = `Le sinus de l'angle $\\widehat{${s0 + s1 + s2
        }}$ est défini par :<br>`;
      texte_corr += `$\\sin \\left(\\widehat{${s0 + s1 + s2
        }}\\right)=${tex_fraction(s0 + s2, s1 + s2)}$<br>`;
      texte_corr += `Avec les données numériques :<br>`;
      texte_corr += `$\\dfrac{\\sin\\left(${angle1}\\degree\\right)}{\\color{red}{1}}=${tex_fraction(
        s02,
        s1 + s2
      )}$<br>`;
      texte_corr += `$\\bf\\textcolor{red}{Les~ produits~ en~ croix~ sont~ \\acute{e}gaux~donc~ :}$<br>`;
      texte_corr += `$${s1 + s2}=${quatrieme_proportionnelle(
        `\\sin\\left(${angle1}\\degree\\right)`,
        s02,
        "\\color{red}{1}"
      )}$<br>`;
      texte_corr += `Soit $${s1 + s2}\\approx${s12}$ cm.`;
    }
    if (type_de_questions == 5) {
      texte_corr = `La tangente de l'angle $\\widehat{${s0 + s1 + s2
        }}$ est définie par :<br>`;
      texte_corr += `$\\tan \\left(\\widehat{${s0 + s1 + s2
        }}\\right)=${tex_fraction(s0 + s2, s0 + s1)}<br>$`;
      texte_corr += `Avec les données numériques :<br>`;
      texte_corr += `$\\dfrac{\\tan\\left(${angle1}\\degree\\right)}{\\color{red}{1}}=${tex_fraction(
        s0 + s2,
        s01
      )}$<br>`;
      texte_corr += `$\\bf\\textcolor{red}{Les~ produits~ en~ croix~ sont~ \\acute{e}gaux~donc~ :}$<br>`;
      texte_corr += `$${s0 + s2}=${quatrieme_proportionnelle(
        "\\color{red}{1}",
        s01,
        `\\tan\\left(${angle1}\\degree\\right)`
      )}$<br>`;
      texte_corr += `Soit $${s0 + s2}\\approx${s02}$ cm.`;
    }
    if (type_de_questions == 6) {
      texte_corr = `La tangente de l'angle $\\widehat{${s0 + s1 + s2
        }}$ est définie par :<br>`;
      texte_corr += `$\\tan \\left(\\widehat{${s0 + s1 + s2
        }}\\right)=${tex_fraction(s0 + s2, s0 + s1)}$<br>`;
      texte_corr += `Avec les données numériques :<br>`;
      texte_corr += `$\\dfrac{\\tan\\left(${angle1}\\degree\\right)}{\\color{red}{1}}=${tex_fraction(
        s02,
        s0 + s1
      )}$<br>`;
      texte_corr += `$\\bf\\textcolor{red}{Les~ produits~ en~ croix~ sont~ \\acute{e}gaux~donc~ :}$<br>`;
      texte_corr += `$${s0 + s1}=${quatrieme_proportionnelle(
        `\\tan\\left(${angle1}\\degree\\right)`,
        s02,
        "\\color{red}{1}"
      )}$<br>`;
      texte_corr += `Soit $${s0 + s1}\\approx${s01}$ cm.`;
    }
    // texte+=href('Comment calculer une longueur avec la trigonométrie','https://www.youtube.com/watch?v=DYW-BTMFzd4')
    this.liste_questions.push(texte);
    this.liste_corrections.push(texte_corr);
    liste_de_question_to_contenu_sans_numero(this);
  };
  this.besoin_formulaire_numerique = [
    "Niveau de difficulté",
    3,
    "1 : Calculs faciles \n 2 : Calculs moins faciles \n 3 : Mélange",
  ];
}
/**
 * @auteur Jean-Claude Lhote
 * 3G31
 * Calcul d'angle dans le triangle rectangle
 * Le niveau 1 se limite à l'utilisation de Arccos
 * Le niveau 2 utilise la fonction trigo la plus pertinente pour un calcul direct
 */
function Exercice_Trigo_angles() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Déterminer un angle grâce à la trigonométrie";
  this.consigne = "";
  this.nb_questions = 1;
  this.nb_questions_modifiable = false;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.sup = 1; // 1 calcul avec Arccos
  sortie_html ? (this.spacing_corr = 3) : (this.spacing_corr = 1.5);
  this.liste_packages = "tkz-euclide";

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.type_exercice = "MG32";
    this.taille_div_MG32 = [700, 500];
    this.liste_questions = [];
    this.liste_corrections = []; // Liste de questions corrigées
    let lettre0 = randint(11, 25); // aleatoirisation du nom des points
    let s0 = lettre_depuis_chiffre(lettre0);
    let lettre1 = randint(11, 25, [lettre0]);
    let s1 = lettre_depuis_chiffre(lettre1);
    let lettre2 = randint(11, 25, [lettre0, lettre1]);
    let s2 = lettre_depuis_chiffre(lettre2);
    let angle1, angle2;
    let type_de_questions;
    if (this.sup == 1) {
      type_de_questions = randint(1, 2); // utilisation de Arccos
    }
    if (this.sup == 2) {
      type_de_questions = randint(1, 6, [2]); // utilisation des 3 fonctions Arccos, Arcsin et Arctan
    }

    let nom_du_triangle = choice([
      s0 + s1 + s2,
      s0 + s2 + s1,
      s1 + s0 + s2,
      s1 + s2 + s0,
      s2 + s0 + s1,
      s2 + s1 + s0,
    ]);
    let k1 = Math.round((Math.random() * 5 + 1) * 10) / 10;
    let k2 = Math.round((Math.random() * 5 + 1) * 10) / 10;
    angle1 = Math.round(Math.degres(Math.atan(k2 / k1)));
    angle2 = 90 - angle1;
    let alpha1 = Math.random() * Math.PI - Math.PI / 2;
    let alpha1deg = Math.round((alpha1 * 180) / Math.PI);
    let x1 = k1; // coordonnées des deux sommets du triangle
    let y2 = k2;
    let s01 = arrondi_virgule(k1, 1); // mise en texte avec 1 chiffres après la virgule pour énoncé
    let s02 = arrondi_virgule(k2, 1);

    let dist12 = k1 / Math.cos(Math.atan(k2 / k1)); //calcul de l'hypoténuse
    dist12 = Math.round(dist12 * 10) / 10; // On ne garde qu'une approximation au dixième pour l'exercice
    let s12 = arrondi_virgule(dist12, 1);
    let texte;
    let texte_corr = `Dans le triangle $${nom_du_triangle}$ rectangle en $${s0}$ :<br>`;
    if (sortie_html) {
      // sortie html MG32
      let codeBase64;
      if (type_de_questions % 2 != 0) {
        if (alpha1deg < 0) {
          codeBase64 =
            "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACL#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAFBAMA7AAAAAAAAwCAAAAAAAAAFAAFAcLFHrhR64UBneFHrhR64#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABYAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBHq0OVgQYlAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAWAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAFgAAAQUAAQAAAAcAAAAJAP####8BAAAAAA4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MQABNgAAAAFAGAAAAAAAAAAAABEA#####wACeDIAATQAAAABQBAAAAAAAAAAAAARAP####8ACGFscGhhZGVnAAMtOTD#####AAAAAQAMQ01vaW5zVW5haXJlAAAAAUBWgAAAAAAA#####wAAAAEAEENQb2ludERhbnNSZXBlcmUA#####wEAAAAAFgABWgDAFAAAAAAAAEAAAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAEwD#####AQAAAAAWAAFGAAAAAAAAAAAAQAgAAAAAAAAHAAAAAAoAAAAOAAAADwAAAAEAAAAAAAAAAAAAABMA#####wEAAAAAFgABRAAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAADgAAABD#####AAAAAQAJQ1JvdGF0aW9uAP####8AAAASAAAADgAAABEAAAAPAP####8AAAAAABYAAUIAQCoAAAAAAADALgAAAAAAAAcAAAAAEwAAABUAAAAPAP####8AAAAAABYAAUMAQBAAAAAAAADAOwAAAAAAAAcAAAAAFAAAABX#####AAAAAQAJQ1BvbHlnb25lAP####8AAAAAAAIAAAAEAAAAEgAAABYAAAAXAAAAEv####8AAAACABdDTWFycXVlQW5nbGVHZW9tZXRyaXF1ZQD#####AAAA#wAEAAAAAUAwAAAAAAAAAAAAFgAAABIAAAAX#####wAAAAEACENTZWdtZW50AP####8BAAD#ABAAAAEABAAAABcAAAAW#####wAAAAEAEENNYWNyb0FwcGFyaXRpb24A#####wD#AAAB#####xBAh8ij1wo9cUBHYUeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAFQXBwQkMAAAAAAAEAAAAaAP####8AAAABABFDTWFjcm9EaXNwYXJpdGlvbgD#####AP8AAAH#####EECKaKPXCj1xQEphR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAZNYXNxQkMAAAAAAAEAAAAa#####wAAAAEAC0NNYWNyb1BhdXNlAP####8A#wAAAf####8QQI1oo9cKPXFASuFHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAABVBhdXNlAAAAAAABAAAAGQD#####AAAA#wH#####EECIIKPXCj1xQFqwo9cKPXACAAAAAAAAAAAAAAAAAQAAAAAAAAAAAApNYXNxQW5nZHJ0AAAAAAABAAAAGQAAABgA#####wAAAP8B#####xBAjAij1wo9cUBa8KPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAJQXBwQW5nRHJ0AAAAAAABAAAAGQD#####AAAAAQARQ01hY3JvU3VpdGVNYWNyb3MA#####wAAAP8B#####xBAWMUeuFHrhUB4fCj1wo9cAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAALaHlwb3TDqW51c2UAAAAAAAsAAAAeAAAAGwAAAB0AAAAfAAAAHAAAAB0AAAAeAAAAGwAAAB0AAAAcAAAAHwAAABYA#####wAAAP8ABQAAACBAQIGJiJxJngAAAAEAAAAWAAAAFwAAAA7##########w==";
        } else {
          codeBase64 =
            "TWF0aEdyYXBoSmF2YTEuMAAAABI#AAAAAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACL#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAFBAMAUAAAAAAAAQBQAAAAAAAAFAAFAbFo9cKPXBkB0BhR64Ueu#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABYAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBHq0OVgQYlAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAWAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAFgAAAQUAAQAAAAcAAAAJAP####8BAAAAAA4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MQABNgAAAAFAGAAAAAAAAAAAABEA#####wACeDIAATQAAAABQBAAAAAAAAAAAAARAP####8ACGFscGhhZGVnAAI5MAAAAAFAVoAAAAAAAP####8AAAABABBDUG9pbnREYW5zUmVwZXJlAP####8BAAAAABYAAVoAwBQAAAAAAABAAAAAAAAAAAcAAAAACgAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAABIA#####wEAAAAAFgABRgAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAADgAAAA8AAAABAAAAAAAAAAAAAAASAP####8BAAAAABYAAUQAAAAAAAAAAABACAAAAAAAAAcAAAAACgAAAAEAAAAAAAAAAAAAAA4AAAAQ#####wAAAAEACUNSb3RhdGlvbgD#####AAAAEgAAAA4AAAARAAAADwD#####AAAAAAAWAAFCAEAqAAAAAAAAwDgAAAAAAAAHAAAAABMAAAAVAAAADwD#####AAAAAAAWAAFDAMA3AAAAAAAAwEAAAAAAAAAHAAAAABQAAAAV#####wAAAAEACUNQb2x5Z29uZQD#####AAAAAAACAAAABAAAABIAAAAWAAAAFwAAABL#####AAAAAgAXQ01hcnF1ZUFuZ2xlR2VvbWV0cmlxdWUA#####wAAAP8ABAAAAAFAMAAAAAAAAAAAABYAAAASAAAAF#####8AAAABAAhDU2VnbWVudAD#####AQAA#wAQAAABAAQAAAAXAAAAFv####8AAAABABBDTWFjcm9BcHBhcml0aW9uAP####8A#wAAAf####8QQIfIo9cKPXFAR2FHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAABUFwcEJDAAAAAAABAAAAGgD#####AAAAAQARQ01hY3JvRGlzcGFyaXRpb24A#####wAAAP8B#####xBAimij1wo9cUBKYUeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAGTWFzcUJDAAAAAAABAAAAGv####8AAAABAAtDTWFjcm9QYXVzZQD#####AP8AAAH#####EECNaKPXCj1xQErhR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAVQYXVzZQAAAAAAAQAAABgA#####wAAAP8B#####xBAh#Cj1wo9cUBbcKPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAKTWFzcUFuZ0RydAAAAAAAAQAAABkAAAAXAP####8AAAD#Af####8QQIw4o9cKPXFAXPCj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAACUFwcEFuZ0RydAAAAAAAAQAAABkA#####wAAAAEAEUNNYWNyb1N1aXRlTWFjcm9zAP####8AAAD#Af####8QQFjFHrhR64VAeHwo9cKPXAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAC2h5cG90w6ludXNlAAAAAAALAAAAHgAAABsAAAAdAAAAHwAAABwAAAAdAAAAHgAAABsAAAAdAAAAHwAAABwAAAAVAP####8AAAD#AAUAAAAgQEHcp2T0QTQAAAABAAAAFgAAABcAAAAO##########8=";
        }
      } else {
        if (alpha1deg < 0) {
          codeBase64 =
            "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACL#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAFBAMA7AAAAAAAAwCAAAAAAAAAFAAFAcLFHrhR64UBneFHrhR64#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABYAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBHq0OVgQYlAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAWAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAFgAAAQUAAQAAAAcAAAAJAP####8BAAAAAA4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MQABNgAAAAFAGAAAAAAAAAAAABEA#####wACeDIAATQAAAABQBAAAAAAAAAAAAARAP####8ACGFscGhhZGVnAAMtOTD#####AAAAAQAMQ01vaW5zVW5haXJlAAAAAUBWgAAAAAAA#####wAAAAEAEENQb2ludERhbnNSZXBlcmUA#####wEAAAAAFgABWgDAFAAAAAAAAEAAAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAEwD#####AQAAAAAWAAFGAAAAAAAAAAAAQAgAAAAAAAAHAAAAAAoAAAAOAAAADwAAAAEAAAAAAAAAAAAAABMA#####wEAAAAAFgABRAAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAADgAAABD#####AAAAAQAJQ1JvdGF0aW9uAP####8AAAASAAAADgAAABEAAAAPAP####8AAAAAABYAAUIAQCoAAAAAAADALgAAAAAAAAcAAAAAEwAAABUAAAAPAP####8AAAAAABYAAUMAQBAAAAAAAADAOwAAAAAAAAcAAAAAFAAAABX#####AAAAAQAJQ1BvbHlnb25lAP####8AAAAAAAIAAAAEAAAAEgAAABYAAAAXAAAAEv####8AAAACABdDTWFycXVlQW5nbGVHZW9tZXRyaXF1ZQD#####AAAA#wAEAAAAAUAwAAAAAAAAAAAAFgAAABIAAAAX#####wAAAAEACENTZWdtZW50AP####8BAAD#ABAAAAEABAAAABcAAAAW#####wAAAAEAEENNYWNyb0FwcGFyaXRpb24A#####wD#AAAB#####xBAh8ij1wo9cUBHYUeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAFQXBwQkMAAAAAAAEAAAAaAP####8AAAABABFDTWFjcm9EaXNwYXJpdGlvbgD#####AP8AAAH#####EECKaKPXCj1xQEphR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAZNYXNxQkMAAAAAAAEAAAAa#####wAAAAEAC0NNYWNyb1BhdXNlAP####8A#wAAAf####8QQI1oo9cKPXFASuFHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAABVBhdXNlAAAAAAABAAAAGQD#####AAAA#wH#####EECIIKPXCj1xQFqwo9cKPXACAAAAAAAAAAAAAAAAAQAAAAAAAAAAAApNYXNxQW5nZHJ0AAAAAAABAAAAGQAAABgA#####wAAAP8B#####xBAjAij1wo9cUBa8KPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAJQXBwQW5nRHJ0AAAAAAABAAAAGQD#####AAAAAQARQ01hY3JvU3VpdGVNYWNyb3MA#####wAAAP8B#####xBAWMUeuFHrhUB4fCj1wo9cAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAALaHlwb3TDqW51c2UAAAAAAAsAAAAeAAAAGwAAAB0AAAAfAAAAHAAAAB0AAAAeAAAAGwAAAB0AAAAcAAAAHwAAABYA#####wAAAP8AAwAAACBAQHXBUVjTVQAAAAEAAAAXAAAAFgAAAA7##########w==";
        } else {
          codeBase64 =
            "TWF0aEdyYXBoSmF2YTEuMAAAABI#AAAAAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACL#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAFBAMAUAAAAAAAAQBQAAAAAAAAFAAFAbFo9cKPXBkB0BhR64Ueu#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABYAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBHq0OVgQYlAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAWAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAFgAAAQUAAQAAAAcAAAAJAP####8BAAAAAA4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MQABNgAAAAFAGAAAAAAAAAAAABEA#####wACeDIAATQAAAABQBAAAAAAAAAAAAARAP####8ACGFscGhhZGVnAAI5MAAAAAFAVoAAAAAAAP####8AAAABABBDUG9pbnREYW5zUmVwZXJlAP####8BAAAAABYAAVoAwBQAAAAAAABAAAAAAAAAAAcAAAAACgAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAABIA#####wEAAAAAFgABRgAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAADgAAAA8AAAABAAAAAAAAAAAAAAASAP####8BAAAAABYAAUQAAAAAAAAAAABACAAAAAAAAAcAAAAACgAAAAEAAAAAAAAAAAAAAA4AAAAQ#####wAAAAEACUNSb3RhdGlvbgD#####AAAAEgAAAA4AAAARAAAADwD#####AAAAAAAWAAFCAEAqAAAAAAAAwDgAAAAAAAAHAAAAABMAAAAVAAAADwD#####AAAAAAAWAAFDAMA3AAAAAAAAwEAAAAAAAAAHAAAAABQAAAAV#####wAAAAEACUNQb2x5Z29uZQD#####AAAAAAACAAAABAAAABIAAAAWAAAAFwAAABL#####AAAAAgAXQ01hcnF1ZUFuZ2xlR2VvbWV0cmlxdWUA#####wAAAP8ABAAAAAFAMAAAAAAAAAAAABYAAAASAAAAF#####8AAAABAAhDU2VnbWVudAD#####AQAA#wAQAAABAAQAAAAXAAAAFv####8AAAABABBDTWFjcm9BcHBhcml0aW9uAP####8A#wAAAf####8QQIfIo9cKPXFAR2FHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAABUFwcEJDAAAAAAABAAAAGgD#####AAAAAQARQ01hY3JvRGlzcGFyaXRpb24A#####wAAAP8B#####xBAimij1wo9cUBKYUeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAGTWFzcUJDAAAAAAABAAAAGv####8AAAABAAtDTWFjcm9QYXVzZQD#####AP8AAAH#####EECNaKPXCj1xQErhR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAVQYXVzZQAAAAAAAQAAABgA#####wAAAP8B#####xBAh#Cj1wo9cUBbcKPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAKTWFzcUFuZ0RydAAAAAAAAQAAABkAAAAXAP####8AAAD#Af####8QQIw4o9cKPXFAXPCj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAACUFwcEFuZ0RydAAAAAAAAQAAABkA#####wAAAAEAEUNNYWNyb1N1aXRlTWFjcm9zAP####8AAAD#Af####8QQFjFHrhR64VAeHwo9cKPXAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAC2h5cG90w6ludXNlAAAAAAALAAAAHgAAABsAAAAdAAAAHwAAABwAAAAdAAAAHgAAABsAAAAdAAAAHwAAABwAAAAVAP####8AAAD#AAMAAAAgQELJWhOPSZcAAAABAAAAFwAAABYAAAAO##########8=";
        }
      }
      texte = `Dans la figure ci-dessous, le triangle $${nom_du_triangle}$ est rectangle en $${s0}$.<br>`;

      if (type_de_questions == 1) {
        // calcul de l'angle 1 (arccos)
        texte += `$${s1 + s2}=${s12}$ cm<br>`;
        texte += `$${s0 + s1}=${s01}$ cm<br>`;
        texte += `Calculer l'angle $\\widehat{${s0 + s1 + s2}}$ à 1° près.`;
      }
      if (type_de_questions == 2) {
        // Calcul de l'angle 2 (90-arccos)
        texte += `$${s1 + s2}=${s12}$ cm<br>`;
        texte += `$${s0 + s1}=${s01}$ cm<br>`;
        texte += `Calculer l'angle $\\widehat{${s0 + s2 + s1}}$ à 1° près.`;
      }
      if (type_de_questions == 3) {
        // calcul de l'angle 1 (arcsin)
        texte += `$${s0 + s2}=${s02}$ cm<br>`;
        texte += `$${s1 + s2}=${s12}$ cm<br>`;
        texte += `Calculer l'angle $\\widehat{${s0 + s1 + s2}}$ à 1° près.`;
      }
      if (type_de_questions == 4) {
        // Calcul de l'angle 2 (arcsin)
        texte += `$${s1 + s2}=${s12}$ cm<br>`;
        texte += `$${s0 + s1}=${s01}$ cm<br>`;
        texte += `Calculer l'angle $\\widehat{${s0 + s2 + s1}}$ à 1° près.`;
      }
      if (type_de_questions == 5) {
        // calcul de l'angle 1 (arctan)
        texte += `$${s0 + s2}=${s02}$ cm<br>`;
        texte += `$${s0 + s1}=${s01}$ cm<br>`;
        texte += `Calculer l'angle $\\widehat{${s0 + s1 + s2}}$ à 1° près.`;
      }
      if (type_de_questions == 6) {
        // Calcul de l'angle 2 (arctan)
        texte += `$${s0 + s2}=${s02}$ cm<br>`;
        texte += `$${s0 + s1}=${s01}$ cm<br>`;
        texte += `Calculer l'angle $\\widehat{${s0 + s2 + s1}}$ à 1° près.`;
      }

      this.type_exercice = "MG32";
      this.MG32codeBase64 = codeBase64;
      this.MG32code_pour_modifier_la_figure = `
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "x2", "${y2}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "x1", "${x1}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "alphadeg", "${alpha1deg}");
			mtg32App.rename("MG32svg${numero_de_l_exercice}","A","${s0}");
			mtg32App.rename("MG32svg${numero_de_l_exercice}","B","${s1}");
			mtg32App.rename("MG32svg${numero_de_l_exercice}","C","${s2}");
			mtg32App.calculate("MG32svg${numero_de_l_exercice}");
			mtg32App.display("MG32svg${numero_de_l_exercice}");
			`;
      texte += `<br>$\\footnotesize{\\textit{Le point \\thickspace ${s0} peut être déplacé (si la figure est tronquée).}}$<br>`;
    } else {
      //sortie Latex
      texte = `\\begin{minipage}{.7 \\linewidth} 	\\vspace{0cm} Sur la figure ci-contre, on a  : \\begin{itemize}`;
      texte += `\n\t\\item Le triangle $${nom_du_triangle}$ est rectangle en $${s0}$;`;

      if (type_de_questions == 1) {
        // Calcul de l'angle coté adjacent (Arccos)
        texte += `\n\t\\item $${s1 + s2}=${s12}~\\text{cm}$`;
        texte += `\n\t\\item $${s0 + s1}=${s01}~\\text{cm}$`;
        texte += `\\end{itemize} \\bigskip\n\t  Calculer l'angle $\\widehat{${s0 + s1 + s2
          }}$ à 1° près. \\end{minipage}`;
      }
      if (type_de_questions == 2) {
        // Calcul de l'angle opposé (90-Arccos)
        texte += `\n\t\\item $${s1 + s2}=${s12}~\\text{cm}$`;
        texte += `\n\t\\item $${s0 + s1}=${s01}~\\text{cm}$`;
        texte += `\\end{itemize} \\bigskip\n\t  Calculer l'angle $\\widehat{${s0 + s2 + s1
          }}$ à 1° près. \\end{minipage}`;
      }
      if (type_de_questions == 3) {
        // Calcul de l'angle 1 (Arcsin)
        texte += `\n\t\\item $${s1 + s2}=${s12}~\\text{cm}$`;
        texte += `\n\t\\item $${s0 + s2}=${s02}~\\text{cm}$`;
        texte += `\\end{itemize} \\bigskip\n\t  Calculer l'angle $\\widehat{${s0 + s1 + s2
          }}$ à 1° près. \\end{minipage}`;
      }
      if (type_de_questions == 4) {
        // Calcul de l'angle 2 (Arcsin)
        texte += `\n\t\\item $${s1 + s2}=${s12}~\\text{cm}$`;
        texte += `\n\t\\item $${s0 + s1}=${s01}~\\text{cm}$`;
        texte += `\\end{itemize} \\bigskip\n\t  Calculer l'angle $\\widehat{${s0 + s2 + s1
          }}$ à 1° près. \\end{minipage}`;
      }
      if (type_de_questions == 5) {
        // Calcul de l'angle 1 (Arctan)
        texte += `\n\t\\item $${s0 + s2}=${s02}~\\text{cm}$`;
        texte += `\n\t\\item $${s0 + s1}=${s01}~\\text{cm}$`;
        texte += `\\end{itemize} \\bigskip\n\t  Calculer l'angle $\\widehat{${s0 + s1 + s2
          }}$ à 1° près. \\end{minipage}`;
      }
      if (type_de_questions == 6) {
        // Calcul de l'angle 2 (Arctan)
        texte += `\n\t\\item $${s0 + s2}=${s02}~\\text{cm}$`;
        texte += `\n\t\\item $${s0 + s1}=${s01}~\\text{cm}$`;
        texte += `\\end{itemize} \\bigskip\n\t  Calculer l'angle $\\widehat{${s0 + s2 + s1
          }}$ à 1° près. \\end{minipage}`;
      }
      texte += "\\begin{minipage}{0.3 \\linewidth}";
      // dessin de la figure
      texte += "\n \\begin{tikzpicture}[scale=0.7]"; // Balise début de figure
      texte +=
        "\n\t \\tkzDefPoints{0/0/" + s0 + "," + x1 + "/0/B,0/" + y2 + "/C}"; // créer les points du triangle initial
      // Définit les points M et N par homothétie de centre C et de rapport 0,3<k<0,8
      texte +=
        "\n\t \\tkzDefPointBy[rotation= center " +
        s0 +
        " angle " +
        alpha1deg +
        "](B) \\tkzGetPoint{" +
        s1 +
        "}"; // transformer le premier point par rotation
      texte +=
        "\n\t \\tkzDefPointBy[rotation= center " +
        s0 +
        " angle " +
        alpha1deg +
        "](C) \\tkzGetPoint{" +
        s2 +
        "}"; // transformer le deuxième point par rotation
      texte += "\n\t \\tkzDrawPolygon(" + s0 + "," + s1 + "," + s2 + ")"; // Trace le triangle
      // marquer l'angle droit
      texte +=
        "\n\t \\tkzDefPointBy[homothety=center " +
        s0 +
        " ratio 0.1](" +
        s1 +
        ")" +
        "\\tkzGetPoint{B}";
      texte +=
        "\n\t \\tkzDefPointBy[rotation= center " +
        s0 +
        " angle 90](B) \\tkzGetPoint{C}";
      texte +=
        "\n\t \\tkzDefPointBy[homothety=center " +
        s0 +
        " ratio 0.1414](" +
        s1 +
        ")" +
        "\\tkzGetPoint{A}";
      texte +=
        "\n\t \\tkzDefPointBy[rotation= center " +
        s0 +
        " angle 45](A) \\tkzGetPoint{A}";
      texte += "\n\t \\tkzDrawPolygon(" + s0 + ",B,A,C)"; // Trace la marque d'angle droit
      if (alpha1deg > 0) {
        // rotation "angle droit dessous"
        texte += "\n\t \\tkzLabelPoints[below](" + s0 + ")"; //nomme les points
        texte += "\n\t \\tkzLabelPoints[above right](" + s1 + ")";
        texte += "\n\t \\tkzLabelPoints[left](" + s2 + ")";
      } else {
        // rotation "angle droit dessus" position du nom inversée
        texte += "\n\t \\tkzLabelPoints[left](" + s0 + ")"; //nomme les points
        texte += "\n\t \\tkzLabelPoints[below left](" + s1 + ")";
        texte += "\n\t \\tkzLabelPoints[above right](" + s2 + ")";
      }
      texte += "\n \\end{tikzpicture}"; // Balise de fin de figure
      texte += "\\end{minipage}";
    }
    if (type_de_questions == 1) {
      texte_corr += `Le cosinus de l'angle $\\widehat{${s0 + s1 + s2
        }}$ est défini par :<br>`;
      texte_corr += `$\\cos \\left(\\widehat{${s0 + s1 + s2
        }}\\right)=${tex_fraction(s0 + s1, s1 + s2)}$<br>`;
      texte_corr += `Avec les données numériques :<br>`;
      texte_corr += `$\\cos\\left(\\widehat{${s0 + s1 + s2
        }}\\right)=${tex_fraction(s01, s12)}$<br>`;
      texte_corr += `On en déduit que $\\widehat{${s0 + s1 + s2
        }}=\\arccos\\left(${tex_fraction(s01, s12)}\\right)$<br>`;
      texte_corr += `Soit $\\widehat{${s0 + s1 + s2
        }}\\approx${angle1}\\degree$`;
    }
    if (type_de_questions == 2) {
      texte_corr += `Le cosinus de l'angle $\\widehat{${s0 + s1 + s2
        }}$ est défini par :<br>`;
      texte_corr += `$\\cos \\left(\\widehat{${s0 + s1 + s2
        }}\\right)=${tex_fraction(s0 + s1, s1 + s2)}$<br>`;
      texte_corr += `Avec les données numériques :<br>`;
      texte_corr += `$\\cos\\left(\\widehat{${s0 + s1 + s2
        }}\\right)=${tex_fraction(s01, s12)}$<br>`;
      texte_corr += `On en déduit que $\\widehat{${s0 + s1 + s2
        }}=\\arccos\\left(${tex_fraction(s01, s12)}\\right)$<br>`;
      texte_corr += `Soit $\\widehat{${s0 + s1 + s2
        }}\\approx${angle1}\\degree$<br>`;
      texte_corr += `Or, dans un triangle rectangle les angles aigus sont complémentaires, donc :<br>`;
      texte_corr += `$\\widehat{${s0 + s2 + s1
        }}\\approx90-${angle1}\\approx${angle2}\\degree$`;
    }
    if (type_de_questions == 3) {
      texte_corr += `Le sinus de l'angle $\\widehat{${s0 + s1 + s2
        }}$ est défini par :<br>`;
      texte_corr += `$\\sin \\left(\\widehat{${s0 + s1 + s2
        }}\\right)=${tex_fraction(s0 + s2, s1 + s2)}$<br>`;
      texte_corr += `Avec les données numériques :<br>`;
      texte_corr += `$\\sin\\left(\\widehat{${s0 + s1 + s2
        }}\\right)=${tex_fraction(s02, s12)}$<br>`;
      texte_corr += `On en déduit que $\\widehat{${s0 + s1 + s2
        }}=\\arcsin\\left(${tex_fraction(s02, s12)}\\right)$<br>`;
      texte_corr += `Soit $\\widehat{${s0 + s1 + s2
        }}\\approx${angle1}\\degree$`;
    }
    if (type_de_questions == 4) {
      texte_corr += `Le sinus de l'angle $\\widehat{${s0 + s2 + s1
        }}$ est défini par :<br>`;
      texte_corr += `$\\sin \\left(\\widehat{${s0 + s2 + s1
        }}\\right)=${tex_fraction(s0 + s1, s1 + s2)}$<br>`;
      texte_corr += `Avec les données numériques :<br>`;
      texte_corr += `$\\sin\\left(\\widehat{${s0 + s2 + s1
        }}\\right)=${tex_fraction(s01, s12)}$<br>`;
      texte_corr += `On en déduit que $\\widehat{${s0 + s2 + s1
        }}=\\arcsin\\left(${tex_fraction(s01, s12)}\\right)$<br>`;
      texte_corr += `Soit $\\widehat{${s0 + s2 + s1
        }}\\approx${angle2}\\degree$`;
    }
    if (type_de_questions == 5) {
      texte_corr += `La tangente de l'angle $\\widehat{${s0 + s1 + s2
        }}$ est définie par :<br>`;
      texte_corr += `$\\tan \\left(\\widehat{${s0 + s1 + s2
        }}\\right)=${tex_fraction(s0 + s2, s0 + s1)}$<br>`;
      texte_corr += `Avec les données numériques :<br>`;
      texte_corr += `$\\tan\\left(\\widehat{${s0 + s1 + s2
        }}\\right)=${tex_fraction(s02, s01)}$<br>`;
      texte_corr += `On en déduit que $\\widehat{${s0 + s1 + s2
        }}=\\arctan\\left(${tex_fraction(s02, s01)}\\right)$<br>`;
      texte_corr += `Soit $\\widehat{${s0 + s1 + s2
        }}\\approx${angle1}\\degree$`;
    }
    if (type_de_questions == 6) {
      texte_corr += `La tangente de l'angle $\\widehat{${s0 + s2 + s1
        }}$ est définie par :<br>`;
      texte_corr += `$\\tan \\left(\\widehat{${s0 + s2 + s1
        }}\\right)=${tex_fraction(s0 + s1, s0 + s2)}$<br>`;
      texte_corr += `Avec les données numériques :<br>`;
      texte_corr += `$\\tan\\left(\\widehat{${s0 + s2 + s1
        }}\\right)=${tex_fraction(s01, s02)}$<br>`;
      texte_corr += `On en déduit que $\\widehat{${s0 + s2 + s1
        }}=\\arctan\\left(${tex_fraction(s01, s02)}\\right)$<br>`;
      texte_corr += `Soit $\\widehat{${s0 + s2 + s1
        }}\\approx${angle2}\\degree$`;
    }
    this.liste_questions.push(texte);
    this.liste_corrections.push(texte_corr);
    liste_de_question_to_contenu_sans_numero(this);
  };
  this.besoin_formulaire_numerique = [
    "Niveau de difficulté",
    2,
    "1 : Calcul de l'angle avec Acos \n 2 : Calcul de l'angle avec Acos, Asin ou Atan",
  ];
}

/**
 * Déterminer la racine carrée d'un carré parfait compris entre 4 et 256
 * @auteur Stéphane Guyon
 * 4G20-2
 */
function Racine_caree_de_carres_parfaits() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Racine carré d'un carré parfait (calcul mental)";
  this.consigne = "Calculer de tête les racines suivantes.";
  this.nb_questions = 4;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    for (
      let i = 0, texte, texte_corr, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      a = randint(2, 16);
      c = a * a;
      texte = `$\\sqrt{${c}}=$`;
      texte_corr = `$\\sqrt{${c}}=${a}$`;

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
  //this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}

/**
 * À partir de la donnée des 3 longueurs d'un triangle, déterminer si il est rectangle ou pas.
 * @Auteur Rémi Angot
 * 4G21
 */
function Reciproque_Pythagore() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Déterminer si un triangle est rectangle ou pas.";
  this.consigne = "";
  this.nb_questions = 3;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.sup = 3;
  sortie_html ? (this.spacing_corr = 2) : (this.spacing_corr = 1);

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let liste_type_de_questions = []
    if (this.sup == 1) {
      liste_type_de_questions = combinaison_listes(["rectangle"], this.nb_questions);
    }
    if (this.sup == 2) {
      liste_type_de_questions = combinaison_listes(["pas_rectangle"], this.nb_questions);
    }
    if (this.sup == 3) {
      liste_type_de_questions = combinaison_listes(["rectangle", "pas_rectangle"], this.nb_questions);
    }
    let liste_triplets_pythagoriciens = [
      [3, 4, 5],
      [5, 12, 13],
      [6, 8, 10],
      [7, 24, 25],
      [8, 15, 17],
      [9, 12, 15],
      [9, 40, 41],
      [10, 24, 26],
      [11, 60, 61],
      [12, 16, 20],
      [12, 35, 37],
      [13, 84, 85],
      [14, 48, 50],
      [15, 20, 25],
      [15, 36, 39],
      [16, 30, 34],
      [16, 63, 65],
      [18, 24, 30],
      [18, 80, 82],
      [20, 21, 29],
      [20, 48, 52],
      [21, 28, 35],
      [21, 72, 75],
      [24, 32, 40],
      [24, 45, 51],
      [24, 70, 74],
      [25, 60, 65],
      [27, 36, 45],
      [28, 45, 53],
      [28, 96, 100],
      [30, 40, 50],
      [30, 72, 78],
      [32, 60, 68],
      [33, 44, 55],
      [33, 56, 65],
      [35, 84, 91],
      [36, 48, 60],
      [36, 77, 85],
      [39, 52, 65],
      [39, 80, 89],
      [40, 42, 58],
      [40, 75, 85],
      [42, 56, 70],
      [45, 60, 75],
      [48, 55, 73],
      [48, 64, 80],
      [51, 68, 85],
      [54, 72, 90],
      [57, 76, 95],
      [60, 63, 87],
      [60, 80, 100],
      [65, 72, 97],
    ];
    let liste_noms_triangles = []; // on mémorise les noms des triangles pour ne pas les redonner
    for (
      let i = 0,
      texte,
      texte_corr,
      AB,
      BC,
      AC,
      a,
      b,
      c,
      nom_triangle,
      triplet,
      ordre_des_cotes,
      cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      nom_triangle = creerNomDePolygone(3, liste_noms_triangles);
      liste_noms_triangles.push(nom_triangle);
      A = nom_triangle[0];
      B = nom_triangle[1];
      C = nom_triangle[2];
      triplet = choice(liste_triplets_pythagoriciens);
      enleve_element(liste_triplets_pythagoriciens, triplet); // Supprime le triplet pour les prochaines questions
      a = triplet[0];
      b = triplet[1];
      c = triplet[2];
      if (liste_type_de_questions[i] == "pas_rectangle") {
        c = randint(Math.max(c - 3, b + 1), c + 3) // on modifie c en faisant attention à ce qu'il reste plus grand que b
        while (a ** 2 + b ** 2 == c ** 2) {
          // si par hasard (est-ce possible ?) on retombe sur un triplet pythagoricien on change les valeurs
          c = randint(Math.max(c - 3, b + 1), c + 3) // on modifie c en faisant attention à ce qu'il reste plus grand que b
        }
      }
      if (a > 9 && choice([true, true, true, false])) {
        //le plus souvent on utilise des décimaux
        a = calcul(a / 10);
        b = calcul(b / 10);
        c = calcul(c / 10);
      }
      ordre_des_cotes = randint(1, 3);
      switch (ordre_des_cotes) {
        case 1:
          texte = `Le triangle $${nom_triangle}$ est tel que $${A + B
            }=${tex_nombre(c)}$ cm, $${A + C}=${tex_nombre(b)}$ cm et $${B + C
            }=${tex_nombre(a)}$ cm.`;
          break;
        case 2:
          texte = `Le triangle $${nom_triangle}$ est tel que  $${B + C
            }=${tex_nombre(a)}$ cm, $${A + C}=${tex_nombre(b)}$ cm et $${A + B
            }=${tex_nombre(c)}$ cm.`;
          break;
        case 3:
          texte = `Le triangle $${nom_triangle}$ est tel que $${A + C
            }=${tex_nombre(b)}$ cm, $${A + B}=${tex_nombre(c)}$ cm,  et $${B + C
            }=${tex_nombre(a)}$ cm.`;
          break;
      }
      texte += `<br>Ce triangle est-il rectangle ?`;
      texte_corr = `Dans le triangle $${nom_triangle}$, le plus grand côté est $[${A + B
        }]$.`;
      texte_corr += `<br>$${A + B}^2=${tex_nombre(c)}^2=${tex_nombrec(
        c ** 2
      )}$`;
      texte_corr += `<br>$${A + C}^2+${B + C}^2=${tex_nombre(b)}^2+${tex_nombre(
        a
      )}^2=${tex_nombrec(b ** 2 + a ** 2)}$`;
      if (liste_type_de_questions[i] == "rectangle") {
        texte_corr += `<br>On constate que $${A + B}^2=${A + C}^2+${B + C
          }^2$, l'égalité de Pythagore est vérifiée donc $${nom_triangle}$ est rectangle en $${C}$.`;
      } else {
        texte_corr += `<br>On constate que $${A + B}^2\\not=${A + C}^2+${B + C
          }^2$, l'égalité de Pythagore n'est pas vérifiée donc $${nom_triangle}$ n'est pas rectangle.`;
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
  this.besoin_formulaire_numerique = ['Type de questions', 3, "1 : Démontrer qu'un triangle est rectangle\n2 : Démontrer qu'un triangle n'est pas rectangle\n3 : Déterminer si un triangle est rectangle ou pas "];
}

/**
 * Problèmes utilisant le théorème de Pythagore ou sa réciproque et des propriétés des quadrilatères particuliers.
 *
 * * Dans un losange, on connait la longueur du côté et une diagonale, il faut calculer l'autre.
 * * Dans un rectangle on connait la longueur et une diagonale, il faut calculer la largeur.
 * * Dans un rectangle on connait la longueur et la largeur, il faut calculer la diagonale.
 * * Est-ce qu'un parallélogramme est un losange ? On peut démontrer que les diagonales sont perpendiculaires ou pas.
 * * Est-ce qu'un parallélogramme est un rectangle ? On peut démontrer qu'il possède un angle droit ou pas .
 * @Auteur Rémi Angot
 * 4G22
 */
function Problemes_Pythagore() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Problèmes utilisant le théorème de Pythagore";
  this.consigne = "";
  this.nb_questions = 2;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.spacing = 1;
  sortie_html ? (this.spacing_corr = 2) : (this.spacing_corr = 1.5);

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles;
    if (this.nb_questions >= 5) {
      type_de_questions_disponibles = [
        "losange",
        "rectangle_diagonale_connue",
        "rectangle_diagonale_a_trouver",
        "parallelogramme_est_losange",
        "parallelogramme_n_est_pas_losange",
        "parallelogramme_est_rectangle",
        "parallelogramme_n_est_pas_rectangle",
      ];
    } else {
      type_de_questions_disponibles = [
        "losange",
        "rectangle_diagonale_connue",
        "rectangle_diagonale_a_trouver",
        choice(["parallelogramme_est_losange", "parallelogramme_n_est_pas_losange",]),
        choice(["parallelogramme_est_rectangle",
          "parallelogramme_n_est_pas_rectangle",])
      ];
    }
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    );
    let liste_triplets_pythagoriciens = [
      [3, 4, 5],
      [5, 12, 13],
      [6, 8, 10],
      [7, 24, 25],
      [8, 15, 17],
      [9, 12, 15],
      [9, 40, 41],
      [10, 24, 26],
      [11, 60, 61],
      [12, 16, 20],
      [12, 35, 37],
      [13, 84, 85],
      [14, 48, 50],
      [15, 20, 25],
      [15, 36, 39],
      [16, 30, 34],
      [16, 63, 65],
      [18, 24, 30],
      [18, 80, 82],
      [20, 21, 29],
      [20, 48, 52],
      [21, 28, 35],
      [21, 72, 75],
      [24, 32, 40],
      [24, 45, 51],
      [24, 70, 74],
      [25, 60, 65],
      [27, 36, 45],
      [28, 45, 53],
      [28, 96, 100],
      [30, 40, 50],
      [30, 72, 78],
      [32, 60, 68],
      [33, 44, 55],
      [33, 56, 65],
      [35, 84, 91],
      [36, 48, 60],
      [36, 77, 85],
      [39, 52, 65],
      [39, 80, 89],
      [40, 42, 58],
      [40, 75, 85],
      [42, 56, 70],
      [45, 60, 75],
      [48, 55, 73],
      [48, 64, 80],
      [51, 68, 85],
      [54, 72, 90],
      [57, 76, 95],
      [60, 63, 87],
      [60, 80, 100],
      [65, 72, 97],
    ];
    let liste_noms_quadrilateres = ["L", "M", "N", "O"]; // pour que le O ne soit pas une des 4 lettres
    for (
      let i = 0, texte, texte_corr, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      let nom_quadrilatere = creerNomDePolygone(4, liste_noms_quadrilateres);
      liste_noms_quadrilateres.push(nom_quadrilatere);
      let A = nom_quadrilatere[0];
      let B = nom_quadrilatere[1];
      let C = nom_quadrilatere[2];
      let D = nom_quadrilatere[3];
      let O = `O`;
      let triplet = choice(liste_triplets_pythagoriciens);
      enleve_element(liste_triplets_pythagoriciens, triplet); // Supprime le triplet pour les prochaines questions
      let a = triplet[0];
      let b = triplet[1];
      let c = triplet[2];
      if (
        liste_type_de_questions[i] == "parallelogramme_n_est_pas_losange" ||
        liste_type_de_questions[i] == "parallelogramme_n_est_pas_rectangle"
      ) {
        c += randint(-3, 3, [0]); // on change la valeur de c
        while (a ** 2 + b ** 2 == c ** 2) {
          // si par hasard (est-ce possible ?) on retombe sur un triplet pythagoricien on change les valeurs
          c += randint(-3, 3, [0]); // on change la valeur de c
          b += randint(-3, 3, [0]); // on change la valeur de b
        }
      }
      if (a > 9 && choice([true, true, true, false])) {
        //le plus souvent on utilise des décimaux
        a = calcul(a / 10);
        b = calcul(b / 10);
        c = calcul(c / 10);
      }

      switch (liste_type_de_questions[i]) {
        case "losange":
          texte = `$${nom_quadrilatere}$ est un losange de centre $O$ tel que $${A + B
            }=${tex_nombre(c)}$ cm et $${A + C}=${tex_nombre(2 * a)}$ cm.<br>`;
          texte += `Calculer $${D + B}$.`;

          if (sortie_html) {
            texte_corr = `<p style="margin-left:10%"><svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"><defs id="mtg32_patterns"/><rect width="100%" height="100%" fill="rgb(255,255,255)"/><g id="mtg32svgTraces" transform="scale(1)"/><g id=""/><g/><g id=""/><g id=""/><g/><g id=""/><g id=""/><g id="mtg32svg#6"/><text x="185.5" y="32.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${A}</tspan></text><text x="220.5" y="134.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${B}</tspan></text><line x1="190.5" y1="43.44" x2="216.5" y2="129.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><g id=""/><text x="144.54431444308477" y="133.14525664249953" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${D}</tspan></text><line x1="190.5" y1="43.44" x2="163.54431444308477" y2="129.14525664249953" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><g id=""/><text x="183.54431444308474" y="234.14525664249953" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${C}</tspan></text><line x1="216.5" y1="129.44" x2="189.54431444308474" y2="215.14525664249953" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="189.54431444308474" y1="215.14525664249953" x2="163.54431444308477" y2="129.14525664249953" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><g id=""/><g  id=""><line x1="208.86483613904568" y1="86.9074753482156" x2="199.2927218660596" y2="89.80137036097884" style="stroke-width:1;stroke:rgb(0,0,255);" /><line x1="207.7072781339404" y1="83.07862963902116" x2="198.13516386095432" y2="85.9725246517844" style="stroke-width:1;stroke:rgb(0,0,255);" /></g><g  id=""><line x1="207.19175809011574" y1="175.70062312711323" x2="197.652449829911" y2="172.70035681946817" style="stroke-width:1;stroke:rgb(0,0,255);" /><line x1="208.39186461317377" y1="171.88489982303136" x2="198.85255635296903" y2="168.8846335153863" style="stroke-width:1;stroke:rgb(0,0,255);" /></g><g  id=""><line x1="171.1794783040391" y1="171.67778129428393" x2="180.75159257702518" y2="168.78388628152072" style="stroke-width:1;stroke:rgb(0,0,255);" /><line x1="172.33703630914437" y1="175.50662700347834" x2="181.90915058213045" y2="172.61273199071513" style="stroke-width:1;stroke:rgb(0,0,255);" /></g><g  id=""><line x1="181.19175809011574" y1="89.70062312711323" x2="171.652449829911" y2="86.7003568194682" style="stroke-width:1;stroke:rgb(0,0,255);" /><line x1="182.39186461317377" y1="85.88489982303133" x2="172.85255635296903" y2="82.8846335153863" style="stroke-width:1;stroke:rgb(0,0,255);" /></g><text x="176.02215722154236" y="144.29262832124977" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>O</tspan></text><g  id=""><line x1="198.79500694133887" y1="129.34145667941502" x2="198.84383529950412" y2="120.56860695961849" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(255,0,0);"/><line x1="190.0709855797076" y1="120.51977860145324" x2="198.84383529950412" y2="120.56860695961849" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(255,0,0);"/></g><line x1="190.5" y1="43.44" x2="190.02215722154236" y2="129.29262832124977" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="190.02215722154236" y1="129.29262832124977" x2="189.54431444308474" y2="215.14525664249953" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="190.02215722154236" y1="129.29262832124977" x2="163.54431444308477" y2="129.14525664249953" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="190.02215722154236" y1="129.29262832124977" x2="216.5" y2="129.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><g  id=""><line x1="193.7768798113023" y1="89.9214712483418" x2="186.74527741024002" y2="82.81115707290796" style="stroke-width:1;stroke:rgb(255,0,0);" /><line x1="186.70592152305426" y1="89.88211536115601" x2="193.81623569848807" y2="82.85051296009375" style="stroke-width:1;stroke:rgb(255,0,0);" /></g><g  id=""><line x1="193.2990370328447" y1="175.77409956959156" x2="186.2674346317824" y2="168.66378539415774" style="stroke-width:1;stroke:rgb(255,0,0);" /><line x1="186.22807874459664" y1="175.7347436824058" x2="193.33839292003046" y2="168.7031412813435" style="stroke-width:1;stroke:rgb(255,0,0);" /></g><g  id=""><line x1="176.75540701760488" y1="134.21886503698207" x2="176.81106464702222" y2="124.21901992676723" style="stroke-width:1;stroke:rgb(255,0,0);" /></g><g  id=""><line x1="203.28890742547983" y1="124.36639160551746" x2="203.2332497960625" y2="134.3662367157323" style="stroke-width:1;stroke:rgb(255,0,0);" /></g></svg></p>`;
          } else {
            texte_corr = ``;
          }
          texte_corr += `$${nom_quadrilatere}$ est un losange donc ses diagonales se coupent en leur milieu : $${A + O
            }=${A + C}\\div2=${tex_nombre(2 * a)}\\div2=${tex_nombre(
              a
            )}$ cm.<br>`;
          texte_corr += `On sait que les diagonales d'un losange se coupent perpendiculairement donc $${A + O + C
            }$ est un triangle rectangle en $O$.<br>`;
          texte_corr += `D'après le théorème de Pythagore, on a : $${A + O}^2+${O + B
            }^2=${A + B}^2$.<br>`;
          texte_corr += `Donc $${O + B}^2=${A + B}^2-${A + O}^2=${tex_nombre(
            c
          )}^2-${tex_nombre(a)}^2=${tex_nombrec(b ** 2)}$.<br>`;
          texte_corr += `On a alors $${O + B}=\\sqrt{${tex_nombrec(
            b ** 2
          )}}=${tex_nombre(b)}$ cm.<br>`;
          texte_corr += `Finalement comme $O$ est aussi le milieu de $[${D + B
            }]$ : $${D + B}=2\\times ${O + B}=2\\times${tex_nombre(
              b
            )}=${tex_nombrec(2 * b)}$ cm.`;
          break;

        case "rectangle_diagonale_connue":
          texte = `$${nom_quadrilatere}$ est un rectangle tel que $${A + B
            }=${tex_nombre(a)}$ cm et $${A + C}=${tex_nombre(c)}$ cm.<br>`;
          texte += `Calculer $${B + C}$.`;
          if (sortie_html) {
            texte_corr = `<p style="margin-left:10%"><svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><defs id="mtg32_patterns"/><rect width="100%" height="100%" fill="rgb(255,255,255)"/><g id="mtg32svgTraces" transform="scale(1)"/><g id=""/><g/><g id=""/><g id=""/><g/><g id=""/><g id=""/><g id=""/><text x="113.5" y="49.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${A}</tspan></text><g id=""/><text x="276.5" y="49.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${B}</tspan></text><g id=""/><g id=""/><text x="276.5" y="138.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${C}</tspan></text><g id=""/><text x="111.5" y="141.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${D}</tspan></text><polygon points="126.500,53.440 272.500,53.440 272.500,124.440 126.500,124.440 " style="stroke-width:1;stroke:rgb(0,0,0);fill:none"  id=""/><g  id=""><line x1="142.5" y1="53.44" x2="142.5" y2="69.44" style="stroke-width:1;stroke:rgb(0,0,255);"/><line x1="126.5" y1="69.44" x2="142.5" y2="69.44" style="stroke-width:1;stroke:rgb(0,0,255);"/></g><g  id=""><line x1="272.5" y1="69.44" x2="256.5" y2="69.44" style="stroke-width:1;stroke:rgb(0,0,255);"/><line x1="256.5" y1="53.44" x2="256.5" y2="69.44" style="stroke-width:1;stroke:rgb(0,0,255);"/></g><g  id=""><line x1="256.5" y1="124.44" x2="256.5" y2="108.44" style="stroke-width:1;stroke:rgb(0,0,255);"/><line x1="272.5" y1="108.44" x2="256.5" y2="108.44" style="stroke-width:1;stroke:rgb(0,0,255);"/></g><g  id=""><line x1="126.5" y1="108.44" x2="142.5" y2="108.44" style="stroke-width:1;stroke:rgb(0,0,255);"/><line x1="142.5" y1="124.44" x2="142.5" y2="108.44" style="stroke-width:1;stroke:rgb(0,0,255);"/></g><line x1="126.5" y1="53.44" x2="272.5" y2="124.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/></svg></svg></p>`;
          } else {
            texte_corr = ``;
          }
          texte_corr += `$${nom_quadrilatere}$ est un rectangle donc il possède 4 angles droits et $${A + B + C
            }$ est un triangle rectangle en $${B}$.<br>`;
          texte_corr += `D'après le théorème de Pythagore, on a : $${A + B}^2+${B + C
            }^2=${A + C}^2$.<br>`;
          texte_corr += `Donc $${B + C}^2=${A + C}^2-${A + B}^2=${tex_nombre(
            c
          )}^2-${tex_nombre(a)}^2=${tex_nombre(b ** 2)}$.<br>`;
          texte_corr += `Finalement, $${B + C}=\\sqrt{${tex_nombrec(
            b ** 2
          )}}=${tex_nombre(b)}$ cm.`;
          break;

        case "rectangle_diagonale_a_trouver":
          texte = `$${nom_quadrilatere}$ est un rectangle tel que $${A + B
            }=${tex_nombre(a)}$ cm et $${B + C}=${tex_nombre(b)}$ cm.<br>`;
          texte += `Calculer $${A + C}$.`;
          if (sortie_html) {
            texte_corr = `<p style="margin-left:10%"><svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><defs id="mtg32_patterns"/><rect width="100%" height="100%" fill="rgb(255,255,255)"/><g id="mtg32svgTraces" transform="scale(1)"/><g id=""/><g/><g id=""/><g id=""/><g/><g id=""/><g id=""/><g id=""/><text x="113.5" y="49.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${A}</tspan></text><g id=""/><text x="276.5" y="49.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${B}</tspan></text><g id=""/><g id=""/><text x="276.5" y="138.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${C}</tspan></text><g id=""/><text x="111.5" y="141.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${D}</tspan></text><polygon points="126.500,53.440 272.500,53.440 272.500,124.440 126.500,124.440 " style="stroke-width:1;stroke:rgb(0,0,0);fill:none"  id=""/><g  id=""><line x1="142.5" y1="53.44" x2="142.5" y2="69.44" style="stroke-width:1;stroke:rgb(0,0,255);"/><line x1="126.5" y1="69.44" x2="142.5" y2="69.44" style="stroke-width:1;stroke:rgb(0,0,255);"/></g><g  id=""><line x1="272.5" y1="69.44" x2="256.5" y2="69.44" style="stroke-width:1;stroke:rgb(0,0,255);"/><line x1="256.5" y1="53.44" x2="256.5" y2="69.44" style="stroke-width:1;stroke:rgb(0,0,255);"/></g><g  id=""><line x1="256.5" y1="124.44" x2="256.5" y2="108.44" style="stroke-width:1;stroke:rgb(0,0,255);"/><line x1="272.5" y1="108.44" x2="256.5" y2="108.44" style="stroke-width:1;stroke:rgb(0,0,255);"/></g><g  id=""><line x1="126.5" y1="108.44" x2="142.5" y2="108.44" style="stroke-width:1;stroke:rgb(0,0,255);"/><line x1="142.5" y1="124.44" x2="142.5" y2="108.44" style="stroke-width:1;stroke:rgb(0,0,255);"/></g><line x1="126.5" y1="53.44" x2="272.5" y2="124.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/></svg></svg></p>`;
          } else {
            texte_corr = ``;
          }
          texte_corr += `$${nom_quadrilatere}$ est un rectangle donc il possède 4 angles droits et $${A + B + C
            }$ est un triangle rectangle en $${B}$.<br>`;
          texte_corr += `D'après le théorème de Pythagore, on a : $${A + C}^2=${A + B
            }^2+${B + C}^2=${tex_nombrec(a)}^2+${tex_nombrec(b)}^2=${tex_nombrec(
              c ** 2
            )}$.<br>`;
          texte_corr += `Finalement, $${A + C}=\\sqrt{${tex_nombrec(
            c ** 2
          )}}=${tex_nombre(c)}$ cm.`;
          break;

        case "parallelogramme_est_losange":
          texte = `$${nom_quadrilatere}$ est un parallélogramme de centre $O$ tel que $${A + O
            }=${tex_nombre(a)}$ cm, $${A + B}=${tex_nombre(c)}$ cm et $${B + O
            }=${tex_nombre(b)}$ cm.<br>`;
          texte += `$${nom_quadrilatere}$ est-il un losange ?`;
          if (sortie_html) {
            texte_corr = `<p style="margin-left:10%"><svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><defs id="mtg32_patterns"/><rect width="100%" height="100%" fill="rgb(255,255,255)"/><g id="mtg32svgTraces" transform="scale(1)"/><text x="85.5" y="46.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${A}</tspan></text><g id=""/><text x="252.5" y="45.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${B}</tspan></text><text x="302.5" y="156.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${C}</tspan></text><g id=""/><line x1="256.5" y1="52.44" x2="307.5" y2="138.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="92.5" y1="52.44" x2="256.5" y2="52.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><g id=""/><text x="137.5" y="155.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${D}</tspan></text><line x1="307.5" y1="138.44" x2="143.5" y2="138.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="143.5" y1="138.44" x2="92.5" y2="52.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="92.5" y1="52.44" x2="307.5" y2="138.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="256.5" y1="52.44" x2="143.5" y2="138.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><text x="200" y="114.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>O</tspan></text></svg></p>`;
          } else {
            texte_corr = ``;
          }
          texte_corr += `Dans le triangle $${A + O + B
            }$, le plus grand côté est $[${A + B}]$.<br>`;
          texte_corr += `$${A + B}^2=${tex_nombre(c)}^2=${tex_nombrec(
            c ** 2
          )}$<br>`;
          texte_corr += `$${A + O}^2+${O + B}^2=${tex_nombre(a)}^2+${tex_nombre(
            b
          )}^2=${tex_nombrec(a ** 2 + b ** 2)}$<br>`;
          texte_corr += `On constate que $${A + B}^2=${A + O}^2+${O + B
            }^2$, l'égalité de Pythagore est vérifiée donc $${A + O + B
            }$ est rectangle en $O$.<br>`;
          texte_corr += `Finalement, comme $${nom_quadrilatere}$ est un parallélogramme qui a ses diagonales perpendiculaires alors c'est aussi un losange.`;
          break;

        case "parallelogramme_n_est_pas_losange":
          texte = `$${nom_quadrilatere}$ est un parallélogramme de centre $O$ tel que $${A + O
            }=${tex_nombre(a)}$ cm, $${A + B}=${tex_nombre(c)}$ cm et $${B + O
            }=${tex_nombre(b)}$ cm.<br>`;
          texte += `$${nom_quadrilatere}$ est-il un losange ?`;
          if (sortie_html) {
            texte_corr = `<p style="margin-left:10%"><svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><defs id="mtg32_patterns"/><rect width="100%" height="100%" fill="rgb(255,255,255)"/><g id="mtg32svgTraces" transform="scale(1)"/><text x="85.5" y="46.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${A}</tspan></text><g id=""/><text x="252.5" y="45.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${B}</tspan></text><text x="302.5" y="156.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${C}</tspan></text><g id=""/><line x1="256.5" y1="52.44" x2="307.5" y2="138.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="92.5" y1="52.44" x2="256.5" y2="52.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><g id=""/><text x="137.5" y="155.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${D}</tspan></text><line x1="307.5" y1="138.44" x2="143.5" y2="138.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="143.5" y1="138.44" x2="92.5" y2="52.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="92.5" y1="52.44" x2="307.5" y2="138.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="256.5" y1="52.44" x2="143.5" y2="138.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><text x="200" y="114.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>O</tspan></text></svg></p>`;
          } else {
            texte_corr = ``;
          }
          texte_corr += `Dans le triangle $${A + O + B
            }$, le plus grand côté est $[${A + B}]$.<br>`;
          texte_corr += `$${A + B}^2=${tex_nombre(c)}^2=${tex_nombrec(
            c ** 2
          )}$<br>`;
          texte_corr += `$${A + O}^2+${O + B}^2=${tex_nombre(a)}^2+${tex_nombre(
            b
          )}^2=${tex_nombrec(a ** 2 + b ** 2)}$<br>`;
          texte_corr += `On constate que $${A + B}^2\\not=${A + O}^2+${O + B
            }^2$, l'égalité de Pythagore n'est pas vérifiée donc $${A + O + B
            }$ n'est pas un triangle rectangle.<br>`;
          texte_corr += `Si $${nom_quadrilatere}$ était un losange alors ses diagonales devraient être perpendiculaires et $${A + O + B
            }$ devrait être un triangle rectangle.<br>`;
          texte_corr += `Finalement comme $${A + O + B
            }$ n'est pas un triangle rectangle, $${nom_quadrilatere}$ n'est pas un losange.`;
          break;

        case "parallelogramme_est_rectangle":
          texte = `$${nom_quadrilatere}$ est un parallélogramme de centre $O$ tel que $${A + B
            }=${tex_nombre(a)}$ cm, $${A + C}=${tex_nombre(c)}$ cm et $${B + C
            }=${tex_nombre(b)}$ cm.<br>`;
          texte += `$${nom_quadrilatere}$ est-il un rectangle ?`;
          if (sortie_html) {
            texte_corr = `<p style="margin-left:10%"><svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><defs id="mtg32_patterns"/><rect width="100%" height="100%" fill="rgb(255,255,255)"/><g id="mtg32svgTraces" transform="scale(1)"/><text x="85.5" y="46.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${A}</tspan></text><g id=""/><text x="252.5" y="45.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${B}</tspan></text><text x="302.5" y="156.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${C}</tspan></text><g id=""/><line x1="256.5" y1="52.44" x2="307.5" y2="138.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="92.5" y1="52.44" x2="256.5" y2="52.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><g id=""/><text x="137.5" y="155.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${D}</tspan></text><line x1="307.5" y1="138.44" x2="143.5" y2="138.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="143.5" y1="138.44" x2="92.5" y2="52.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="92.5" y1="52.44" x2="307.5" y2="138.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="256.5" y1="52.44" x2="143.5" y2="138.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><text x="200" y="114.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>O</tspan></text></svg></p>`;
          } else {
            texte_corr = ``;
          }
          texte_corr += `Dans le triangle $${A + B + C
            }$, le plus grand côté est $[${A + C}]$.<br>`;
          texte_corr += `$${A + C}^2=${tex_nombre(c)}^2=${tex_nombrec(
            c ** 2
          )}$<br>`;
          texte_corr += `$${A + B}^2+${B + C}^2=${tex_nombre(a)}^2+${tex_nombre(
            b
          )}^2=${tex_nombrec(a ** 2 + b ** 2)}$<br>`;
          texte_corr += `On constate que $${A + C}^2=${A + B}^2+${B + C
            }^2$, l'égalité de Pythagore est vérifiée donc $${A + B + C
            }$ est rectangle en $${B}$.<br>`;
          texte_corr += `Finalement, comme $${nom_quadrilatere}$ est un parallélogramme qui a un angle droit en $${B}$ alors c'est aussi un rectangle.`;
          break;

        case "parallelogramme_n_est_pas_rectangle":
          texte = `$${nom_quadrilatere}$ est un parallélogramme de centre $O$ tel que $${A + B
            }=${tex_nombre(a)}$ cm, $${A + C}=${tex_nombre(c)}$ cm et $${B + C
            }=${tex_nombre(b)}$ cm.<br>`;
          texte += `$${nom_quadrilatere}$ est-il un rectangle ?`;
          if (sortie_html) {
            texte_corr = `<p style="margin-left:10%"><svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><defs id="mtg32_patterns"/><rect width="100%" height="100%" fill="rgb(255,255,255)"/><g id="mtg32svgTraces" transform="scale(1)"/><text x="85.5" y="46.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${A}</tspan></text><g id=""/><text x="252.5" y="45.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${B}</tspan></text><text x="302.5" y="156.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${C}</tspan></text><g id=""/><line x1="256.5" y1="52.44" x2="307.5" y2="138.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="92.5" y1="52.44" x2="256.5" y2="52.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><g id=""/><text x="137.5" y="155.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${D}</tspan></text><line x1="307.5" y1="138.44" x2="143.5" y2="138.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="143.5" y1="138.44" x2="92.5" y2="52.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="92.5" y1="52.44" x2="307.5" y2="138.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="256.5" y1="52.44" x2="143.5" y2="138.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><text x="200" y="114.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>O</tspan></text></svg></p>`;
          } else {
            texte_corr = ``;
          }
          texte_corr += `Dans le triangle $${A + B + C
            }$, le plus grand côté est $[${A + C}]$.<br>`;
          texte_corr += `$${A + C}^2=${tex_nombre(c)}^2=${tex_nombrec(
            c ** 2
          )}$<br>`;
          texte_corr += `$${A + B}^2+${B + C}^2=${tex_nombre(a)}^2+${tex_nombre(
            b
          )}^2=${tex_nombrec(a ** 2 + b ** 2)}$<br>`;
          texte_corr += `On constate que $${A + C}^2\\not=${A + B}^2+${B + C
            }^2$, l'égalité de Pythagore n'est pas vérifiée donc $${A + B + C
            }$ n'est pas rectangle en $${B}$.<br>`;
          texte_corr += `Finalement, comme $${nom_quadrilatere}$ n'a pas d'angle droit en $${B}$ ce n'est pas un rectangle.`;
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
  //this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}

/**
 * Puissances d'un relatif (1)
 * * L’objectif est de travailler le sens des règles de calcul sur les puissances plutôt que les formules magiques
 *
 * Paramétrages possibles :
 * * 1 : produit de puissances de même base
 * * 2 : quotient de puissances de même base
 * * 3 : puissance de puissance
 * * 4 : produit de puissances de même exposant
 * * 5 : mélange des trois autres niveaux
 * @Auteur Sébastien Lozano
 * 4C33-1
 */
function Puissances_d_un_relatif_1() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = 1;
  this.titre = "Puissances : Le sens des règles de calculs";
  sortie_html
    ? (this.consigne = "Écrire sous la forme $\\mathbf{a^n}$.")
    : (this.consigne = "Écrire sous la forme $a^n$.");
  sortie_html ? (this.spacing = 3) : (this.spacing = 2);
  sortie_html ? (this.spacing_corr = 2) : (this.spacing_corr = 1);
  this.nb_questions = 5;
  this.correction_detaillee_disponible = true;
  this.nb_cols_corr = 1;
  this.sup = 5;

  this.liste_packages = 'bclogo';

  this.nouvelle_version = function (numero_de_l_exercice) {
    let type_de_questions;
    this.bouton_aide = modal_pdf(
      numero_de_l_exercice,
      "pdf/FichePuissances-4N21.pdf",
      "Aide mémoire sur les puissances (Sébastien Lozano)",
      "Aide mémoire"
    );

    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = [];
    if (this.sup == 1) {
      type_de_questions_disponibles = [1]; // produit de puissances de même base
    } else if (this.sup == 2) {
      type_de_questions_disponibles = [2]; // quotient de puissances de même base
    } else if (this.sup == 3) {
      type_de_questions_disponibles = [3]; // puissance de puissance
    } else if (this.sup == 4) {
      type_de_questions_disponibles = [4]; // produit de puissances de même exposant
    } else if (this.sup == 5) {
      type_de_questions_disponibles = [1, 2, 3, 4]; // mélange
    }

    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    );

    // pour pouvoir adapter les couleurs en cas de besoin
    let coul0 = "red";
    let coul1 = "blue";

    for (
      let i = 0,
      base0,
      base1,
      base,
      base_utile,
      exp0,
      exp1,
      exp,
      coul_exp0,
      coul_exp1,
      lettre,
      texte,
      texte_corr,
      cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      // une fonction pour des infos supp sur les exposants
      function remarquesPuissances(base, base_utile, exposant) {
        let sortie = '';
        if (base < 0 && exposant % 2 == 0) {
          sortie += `$<br>`;
          sortie += `${texte_gras('Remarque : ')} Dans ce cas comme les puissances d'exposant pair de deux nombres opposés sont égaux, on peut écrire $${simpNotPuissance(base, exposant)}$ à la place de $${base_utile}^{${exposant}}$`;
          sortie += `$`;
        };
        if (base < 0 && exposant % 2 == 1) {
          sortie += `$<br>`;
          sortie += `${texte_gras('Remarque : ')} Dans ce cas comme les puissances d'exposant impair de deux nombres négatifs sont opposées, on pourrait écrire $${simpNotPuissance(base, exposant)}$  à la place de $${base_utile}^{${exposant}}$`;
          sortie += `$`;
        };

        return sortie;
      };

      type_de_questions = liste_type_de_questions[i];

      base = randint(2, 9) * choice([-1, 1]); // on choisit une base sauf 1 ... penser à gérer le cas des bases qui sont des puissances
      exp0 = randint(1, 9);
      exp1 = randint(1, 9, [exp0]);
      exp = [exp0, exp1]; // on choisit deux exposants différents c'est mieux
      lettre = lettre_depuis_chiffre(i + 1); // on utilise des lettres pour les calculs

      if (base < 0) {
        base_utile = "(" + base + ")"; // on définit une base avec des parenthèses pour l'affichage du cas negatif
      } else {
        base_utile = base;
      }


      texte_corr = ``;

      switch (type_de_questions) {
        case 1: // produit de puissances de même base
          texte = `$${lettre}=${base_utile}^${exp[0]}\\times ${base_utile}^${exp[1]}$`;

          texte_corr += `$${lettre}=${base_utile}^${exp[0]}\\times ${base_utile}^${exp[1]}$`;
          if (this.correction_detaillee) {
            texte_corr += `<br>`;
            texte_corr += `$${lettre}=${eclatePuissance(
              base_utile,
              exp[0],
              coul0
            )} \\times ${eclatePuissance(base_utile, exp[1], coul1)}$`;
          }
          texte_corr += `<br>`;
          texte_corr += `Il y a donc $\\mathbf{\\color{${coul0}}{${exp[0]}}~\\color{black}{+}~\\color{${coul1}}{${exp[1]}}}$ facteurs tous égaux à $${base_utile}$`;
          texte_corr += `<br>`;
          texte_corr += `$${lettre}=${base_utile}^{${exp[0]}+${exp[1]}} = ${base_utile}^{${exp[0] + exp[1]}}`;
          // attention la base_utile est de type str alors que la fonction switch sur un type number
          //if (simpNotPuissance(base, exp[0] + exp[1]) != ` `) {
          if ((base < 0) && ((exp[1] + exp[0]) % 2 == 0)) {
            texte_corr += `=${simpNotPuissance(base, exp[1] + exp[0])}`;
          };
          texte_corr += remarquesPuissances(base, base_utile, exp[1] + exp[0]);
          texte_corr += `$`;
          texte_corr += `<br>`;

          break;
        case 2: // quotient de puissances de même base
          // Pour que la couleur de la base associée à l'exposant max soit toujours rouge.
          if (Math.max(exp[0], exp[1]) == exp[0]) {
            coul_exp0 = coul0;
            coul_exp1 = coul1;
          } else {
            coul_exp0 = coul1;
            coul_exp1 = coul0;
          };

          texte = `$${lettre}=\\dfrac{${base_utile}^${exp[0]}}{${base_utile}^${exp[1]}}$`;

          texte_corr += `$${lettre}=\\dfrac{${base_utile}^${exp[0]}}{${base_utile}^${exp[1]}}$`;
          if (this.correction_detaillee) {
            texte_corr += `<br><br>`;
            texte_corr += `$${lettre}=\\dfrac{${eclatePuissance(base_utile, exp[0], coul_exp0)}}{${eclatePuissance(base_utile, exp[1], coul_exp1)}}$`;
          }
          texte_corr += `<br><br>`;
          texte_corr += `Il y a donc $\\mathbf{\\color{${coul1}}{${Math.min(exp[0], exp[1])}}}$ simplifications par $${base_utile}$ possibles.`;
          if (this.correction_detaillee) {
            texte_corr += `<br><br>`;
          }
          if (exp[0] - exp[1] == 0) {
            if (this.correction_detaillee) {
              texte_corr += `$${lettre}=\\dfrac{${eclatePuissance(
                `\\cancel{${base_utile}}`,
                exp[0],
                coul_exp0
              )}}{${eclatePuissance(
                `\\cancel{${base_utile}}`,
                exp[0],
                coul_exp1
              )}}$`;
            }
            texte_corr += `<br><br>`;
            texte_corr += `$${lettre}=1`;
          } else if (exp[0] - exp[1] < 0) {
            if (this.correction_detaillee) {
              texte_corr += `$${lettre}=\\dfrac{${eclatePuissance(
                `\\cancel{${base_utile}}`,
                exp[0],
                coul_exp0
              )}}{${eclatePuissance(
                `\\cancel{${base_utile}}`,
                exp[0],
                coul_exp1
              )}\\times${eclatePuissance(
                base_utile,
                exp[1] - exp[0],
                coul_exp1
              )}}$`;
            }
            texte_corr += `<br><br>`;
            texte_corr += `$${lettre}=\\dfrac{1}{${base_utile}^{${exp[1]}-${exp[0]}}}=\\dfrac{1}{${base_utile}^{${exp[1] - exp[0]}}}`;
            //if (simpNotPuissance(base, exp[1] - exp[0]) != ` `) {
            if ((base < 0) && ((exp[1] - exp[0]) % 2 == 0)) {
              texte_corr += `=\\dfrac{1}{${simpNotPuissance(
                base,
                exp[1] - exp[0]
                //)}}=${simpNotPuissance(base, exp[0] - exp[1])}`;
              )}}=${simpNotPuissance(base, exp[0] - exp[1])}`;
            } else {
              texte_corr += `=${base_utile}^{${exp[0] - exp[1]}}`;
            }
          } else {
            if (this.correction_detaillee) {
              texte_corr += `$${lettre}=\\dfrac{${eclatePuissance(
                `\\cancel{${base_utile}}`,
                exp[1],
                coul_exp0
              )}\\times${eclatePuissance(
                base_utile,
                exp[0] - exp[1],
                coul_exp0
              )}}{${eclatePuissance(
                `\\cancel{${base_utile}}`,
                exp[1],
                coul_exp1
              )}}$`;
            }
            texte_corr += `<br><br>`;
            texte_corr += `$${lettre}=${base_utile}^{${exp[0]}-${exp[1]}}=${base_utile}^{${exp[0] - exp[1]}}`;
            //if (simpNotPuissance(base, exp[0] - exp[1]) != ` `) {
            if ((base < 0) && ((exp[0] - exp[1]) % 2 == 0)) {
              texte_corr += `=${simpNotPuissance(base, exp[0] - exp[1])}`;
            }
          }
          texte_corr += remarquesPuissances(base, base_utile, exp[0] - exp[1]);
          texte_corr += `$`;
          texte_corr += `<br>`;
          break;
        case 3: // exponentiation
          exp = [randint(2, 4), randint(2, 4)]; // on redéfinit les deux exposants pour ne pas avoir d'écritures trop longues et pour éviter 1
          texte = `$${lettre}=(${base_utile}^${exp[0]})^{${exp[1]}}$`;

          texte_corr += `$${lettre}=(${base_utile}^${exp[0]})^{${exp[1]}}$`;
          if (this.correction_detaillee) {
            texte_corr += `<br>`;
            texte_corr += `$${lettre}=\\color{${coul0}}{\\underbrace{${eclatePuissance(
              `(${base_utile}^${exp[0]})`,
              exp[1],
              coul0
            )}}_{${exp[1]}\\thickspace\\text{facteurs}}}$`;
            texte_corr += `<br>`;
            texte_corr += `$${lettre}=\\color{${coul0}}{\\underbrace{${eclatePuissance(
              `(\\color{${coul1}}{\\underbrace{${eclatePuissance(
                base_utile,
                exp[0],
                coul1
              )}}_{${exp[0]}\\thickspace\\text{facteurs}}}\\color{${coul0}})`,
              exp[1],
              coul0
            )}}_{${exp[1]}\\times\\color{${coul1}}{${exp[0]
              }}\\thickspace\\color{black}{\\text{facteurs}}}}$`;
          }
          texte_corr += `<br>`;
          texte_corr += `Il y a donc $\\mathbf{\\color{${coul0}}{${exp[1]}}~\\color{black}{\\times}~\\color{${coul1}}{${exp[0]}}}$ facteurs tous égaux à $${base_utile}$`;
          texte_corr += `<br>`;
          texte_corr += `$${lettre}=${base_utile}^{${exp[0]}\\times${exp[1]
            }} = ${base_utile}^{${exp[0] * exp[1]}}`;
          //if (simpNotPuissance(base, exp[0] * exp[1]) != ` `) {
          if ((base < 0) && ((exp[1] * exp[0]) % 2 == 0)) {
            texte_corr += `= ${simpNotPuissance(base, exp[0] * exp[1])}`;
          }
          texte_corr += remarquesPuissances(base, base_utile, exp[0] * exp[1]);
          texte_corr += `$`;
          texte_corr += `<br>`;
          break;
        case 4: // produit de puissances de même exposant
          base0 = randint(2, 8, [4, 6]);
          base1 = randint(2, 8, [4, 6, base0]);
          base = [base0, base1]; // on choisit 2 bases différentes c'est mieux
          exp = randint(2, 5, 6); // on choisit un exposant
          texte = `$${lettre}=${base[0]}^${exp}\\times ${base[1]}^${exp}$`;
          texte_corr += `<br>`;
          texte_corr += `$${lettre}=${base[0]}^${exp}\\times ${base[1]}^${exp}$`;
          if (this.correction_detaillee) {
            texte_corr += `<br>`;
            texte_corr += `$${lettre}=${eclatePuissance(
              base[0],
              exp,
              coul0
            )} \\times ${eclatePuissance(base[1], exp, coul1)}$`;
            texte_corr += `<br>`;
            texte_corr += `$${lettre}=${reorganiseProduitPuissance(
              base[0],
              base[1],
              exp,
              coul0,
              coul1
            )}$`;
          }
          texte_corr += `<br>`;
          texte_corr += `$${lettre}= (\\color{${coul0}}{\\mathbf{${base[0]
            }}} \\color{black}{\\times} \\color{${coul1}}{\\mathbf{${base[1]
            }}}\\color{black}{)^{${exp}}}=${base[0] * base[1]}^${exp}$`;
          texte_corr += `<br>`;
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
    liste_de_question_to_contenu_sans_numero(this);
  };
  this.besoin_formulaire_numerique = [
    "Règle à travailler",
    5,
    "1 : Produit de deux puissances de même base\n2 : Quotient de deux puissances de même base\n3 : Puissance de puissance\n4 : Produit de puissances de même exposant\n5 : Mélange",
  ];
}

/**
 * Puissances d'un relatif (2)
 * * Travailler des résultats automatisés
 * * mais aussi d'utiliser les propriétés du produit de puissance, du quotient de puissances et des puissances de puissances
 * @Auteur Sébastien Lozano
 * 4C33-3
 */
function Puissances_d_un_relatif_2() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = 1;
  this.titre = "Puissances : Calculs automatisés et règles de calculs";
  sortie_html
    ? (this.consigne = "Écrire sous la forme $\\mathbf{a^n}$.")
    : (this.consigne = "Écrire sous la forme $a^n$.");
  this.spacing = 2;
  this.spacing_corr = 2.5;
  this.nb_questions = 8;
  this.nb_cols_corr = 1;

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = [1, 2, 3, 4, 5, 6, 7, 8];
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    );

    this.bouton_aide = modal_pdf(
      numero_de_l_exercice,
      "pdf/FichePuissances-4N21.pdf",
      "Aide mémoire sur les puissances (Sébastien Lozano)",
      "Aide mémoire"
    );

    for (
      let i = 0, base, exp, texte, texte_corr, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      let type_de_questions = liste_type_de_questions[i];

      switch (type_de_questions) {
        case 1:
          base = 3; // on travaille sur cette base mais on pourrait rendre la base aléatoire
          exp = [randint(1, 7, [1]), randint(1, 7, [1]), randint(1, 7, [1])]; // on a besoin de 3 exposants distincts
          texte = `$\\dfrac{${base}^${exp[0]}\\times ${base * base}}{${base}^${exp[1]
            } \\times ${base}^${exp[2]}}$`;
          texte_corr = `$\\dfrac{${base}^${exp[0]}\\times ${base * base
            }}{${base}^${exp[1]} \\times ${base}^${exp[2]}}`;
          texte_corr += ` = \\dfrac{${base}^${exp[0]}\\times ${base}^{2}}{${base}^${exp[1]} \\times ${base}^${exp[2]}}`;
          texte_corr += ` = \\dfrac{${base}^{${exp[0]}+2}}{${base}^{${exp[1]}+${exp[2]}}}`;
          texte_corr += ` = \\dfrac{${base}^{${exp[0] + 2}}}{${base}^{${exp[1] + exp[2]
            }}}`;
          texte_corr += ` = ${base}^{${exp[0] + 2}-${exp[1] + exp[2]}}`;
          texte_corr += ` = ${base}^{${exp[0] + 2 - exp[1] - exp[2]}}`;
          if (
            exp[0] + 2 - exp[1] - exp[2] == 0 ||
            exp[0] + 2 - exp[1] - exp[2] == 1
          ) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
            texte_corr += `=` + simpExp(base, exp[0] + 2 - exp[1] - exp[2]);
          }
          texte_corr += `$`;
          break;
        case 2:
          base = 2; // on travaille sur cette base mais on pourrait rendre la base aléatoire
          exp = [randint(1, 7, [1]), randint(1, 7, [1])]; // on a besoin de 2 exposants distincts
          texte = `$\\dfrac{${base}^${exp[0]}\\times ${base ** 3}}{${base}^${exp[1]
            }}$`;
          texte_corr = `$\\dfrac{${base}^${exp[0]}\\times ${base ** 3
            }}{${base}^${exp[1]}}`;
          texte_corr += ` = \\dfrac{${base}^${exp[0]}\\times ${base}^3}{${base}^${exp[1]}}`;
          texte_corr += ` = \\dfrac{${base}^{${exp[0]}+3}}{${base}^${exp[1]}}`;
          texte_corr += ` = \\dfrac{${base}^{${exp[0] + 3}}}{${base}^${exp[1]
            }}`;
          texte_corr += ` = ${base}^{${exp[0] + 3}-${exp[1]}}`;
          texte_corr += ` = ${base}^{${exp[0] + 3 - exp[1]}}`;
          if (exp[0] + 3 - exp[1] == 0 || exp[0] + 3 - exp[1] == 1) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
            texte_corr += `=` + simpExp(base, exp[0] + 3 - exp[1]);
          }
          texte_corr += `$`;
          break;
        case 3:
          base = 5; // on travaille sur cette base mais on pourrait rendre la base aléatoire
          exp = [randint(1, 7, [1]), randint(1, 2)]; // on a besoin de 2 exposants distincts
          // le second exposant ne peut valoir que 1 ou 2 la fonction testExp ne convient pas à l'affichage ici
          if (exp[1] == 2) {
            texte = `$\\dfrac{${base}\\times ${base}^${exp[0]}}{${base ** 2}^${exp[1]
              }}$`;
            texte_corr = `$\\dfrac{${base}\\times ${base}^${exp[0]}}{${base ** 2
              }^${exp[1]}}`;
            texte_corr += `=\\dfrac{${base}^{1+${exp[0]}}}{(${base}^2)^${exp[1]}}`;
            texte_corr += `=\\dfrac{${base}^{1+${exp[0]}}}{${base}^{2 \\times ${exp[1]}}}`;
            texte_corr += `=\\dfrac{${base}^{${1 + exp[0]}}}{${base}^{${2 * exp[1]
              }}}`;
          } else {
            texte = `$\\dfrac{${base}\\times ${base}^${exp[0]}}{${base ** 2}}$`;
            texte_corr = `$\\dfrac{${base}\\times ${base}^${exp[0]}}{${base ** 2
              }}`;
            texte_corr += `=\\dfrac{${base}^{1+${exp[0]}}}{${base}^2}`;
          }
          texte_corr += `=${base}^{${1 + exp[0]}-${2 * exp[1]}}`;
          texte_corr += `=${base}^{${1 + exp[0] - 2 * exp[1]}}`;
          if (1 + exp[0] - 2 * exp[1] == 0 || 1 + exp[0] - 2 * exp[1] == 1) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
            texte_corr += `=` + simpExp(base, 1 + exp[0] - 2 * exp[1]);
          }
          texte_corr += `$`;
          break;
        case 4:
          base = 2; // on travaille sur cette base mais on pourrait rendre la base aléatoire
          exp = [randint(1, 7, [1])]; // on a besoin de 1 exposant
          texte = `$\\dfrac{${base}\\times ${base}^${exp[0]}}{${base ** 2
            }\\times ${base ** 2}}$`;
          texte_corr = `$\\dfrac{${base}\\times ${base}^${exp[0]}}{${base ** 2
            }\\times ${base ** 2}}`;
          texte_corr += `=\\dfrac{${base}^{1+${exp[0]}}}{${base}^2\\times ${base}^2}`;
          texte_corr += `=\\dfrac{${base}^{${1 + exp[0]}}}{${base}^{2+2}}`;
          texte_corr += `=\\dfrac{${base}^{${1 + exp[0]}}}{${base}^{${2 + 2}}}`;
          texte_corr += `=${base}^{${1 + exp[0]}-${2 + 2}}`;
          texte_corr += `=${base}^{${1 + exp[0] - 2 - 2}}`;
          if (1 + exp[0] - 2 - 2 == 0 || 1 + exp[0] - 2 - 2 == 1) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
            texte_corr += `=` + simpExp(base, 1 + exp[0] - 2 - 2);
          }
          texte_corr += `$`;
          break;
        case 5:
          base = 2; // on travaille sur cette base mais on pourrait rendre la base aléatoire
          exp = [randint(1, 7, [1])]; // on a besoin de 1 exposant
          texte = `$\\dfrac{${base ** 2}^${exp[0]}}{${base}}$`;
          texte_corr = `$\\dfrac{${base ** 2}^${exp[0]}}{${base}}`;
          texte_corr += `=\\dfrac{(${base}^2)^${exp[0]}}{${base}}`;
          texte_corr += `=\\dfrac{${base}^{2\\times ${exp[0]}}}{${base}}`;
          texte_corr += `=\\dfrac{${base}^{${2 * exp[0]}}}{${base}}`;
          texte_corr += `=${base}^{${2 * exp[0]}-1}`;
          texte_corr += `=${base}^{${2 * exp[0] - 1}}$`;
          // Inutile de tester l'exposant final car il vaut au minimum 3
          break;
        case 6:
          base = 3; // on travaille sur cette base mais on pourrait rendre la base aléatoire
          exp = [randint(1, 3, [1])]; // on a besoin de 1 exposant
          texte = `$\\dfrac{${base ** 3}^${exp[0]}}{${base}}$`;
          texte_corr = `$\\dfrac{${base ** 3}^${exp[0]}}{${base}}`;
          texte_corr += `=\\dfrac{(${base}^3)^${exp[0]}}{${base}}`;
          texte_corr += `=\\dfrac{${base}^{3\\times ${exp[0]}}}{${base}}`;
          texte_corr += `=\\dfrac{${base}^{${3 * exp[0]}}}{${base}}`;
          texte_corr += `=${base}^{${3 * exp[0]}-1}`;
          texte_corr += `=${base}^{${3 * exp[0] - 1}}$`;
          // inutile de tester l'exposant final car il vaut au minimum 5
          break;
        case 7:
          base = 3; // on travaille sur cette base mais on pourrait rendre la base aléatoire
          exp = [randint(1, 7, [1]), randint(1, 7, [1]), randint(1, 4, [1])]; // on a besoin de 3 exposants distincts
          texte = `$\\dfrac{${base}^${exp[0]}\\times ${base}^${exp[1]}}{${base ** 2
            }^${exp[2]}}\\times ${base}$`;
          texte_corr = `$\\dfrac{${base}^${exp[0]}\\times ${base}^${exp[1]}}{${base ** 2
            }^${exp[2]}}\\times ${base}`;
          texte_corr += `=\\dfrac{${base}^{${exp[0]}+${exp[1]}}}{(${base}^2)^${exp[2]}}\\times ${base}`;
          texte_corr += `=\\dfrac{${base}^{${exp[0] + exp[1]
            }}}{${base}^{2\\times ${exp[2]}}}\\times ${base}`;
          texte_corr += `=\\dfrac{${base}^{${exp[0] + exp[1]}}}{${base}^{${2 * exp[2]
            }}}\\times ${base}`;
          texte_corr += `=\\dfrac{${base}^{${exp[0] + exp[1]
            }}\\times ${base}}{${base}^{${2 * exp[2]}}}`;
          texte_corr += `=\\dfrac{${base}^{${exp[0] + exp[1]}+1}}{${base}^{${2 * exp[2]
            }}}`;
          texte_corr += `=\\dfrac{${base}^{${exp[0] + exp[1] + 1}}}{${base}^{${2 * exp[2]
            }}}`;
          texte_corr += `=${base}^{${exp[0] + exp[1] + 1}-${2 * exp[2]}}`;
          texte_corr += `=${base}^{${exp[0] + exp[1] + 1 - 2 * exp[2]}}`;
          if (
            exp[0] + exp[1] + 1 - 2 * exp[2] == 0 ||
            exp[0] + exp[1] + 1 - 2 * exp[2] == 1
          ) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant est évincé
            texte_corr += `=` + simpExp(base, exp[0] + exp[1] + 1 - 2 * exp[2]);
          }
          texte_corr += `$`;
          break;
        case 8:
          base = 2; // on travaille sur cette base mais on pourrait rendre la base aléatoire
          exp = [randint(1, 7, [1])]; // on a besoin de 1 exposant
          texte = `$\\dfrac{${base ** 3}\\times ${base}}{${base ** 2}^${exp[0]
            }}$`;
          texte_corr = `$\\dfrac{${base ** 3}\\times ${base}}{${base ** 2}^${exp[0]
            }}`;
          texte_corr += `=\\dfrac{${base}^3\\times ${base}}{(${base}^2)^${exp[0]}}`;
          texte_corr += `=\\dfrac{${base}^{3+1}}{${base}^{2\\times${exp[0]}}}`;
          texte_corr += `=\\dfrac{${base}^{4}}{${base}^{${2 * exp[0]}}}`;
          texte_corr += `=${base}^{4-${2 * exp[0]}}`;
          texte_corr += `=${base}^{${3 + 1 - 2 * exp[0]}}`;
          if (3 + 1 - 2 * exp[0] == 0 || 3 + 1 - 2 * exp[0] == 1) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant est évincé
            texte_corr += `=` + simpExp(base, 3 + 1 - 2 * exp[0]);
          }
          texte_corr += `$`;
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
}

/**
 * 4C30 -- Puissances de 10
 * * Travailler des résultats automatisés
 * @author Sébastien Lozano
 */
function Puissances_de_dix() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = 1;
  this.titre = "Puissances de 10 : Le sens des règles de calculs";
  sortie_html
    ? (this.consigne = "Écrire sous la forme $\\mathbf{10^n}$.")
    : (this.consigne = "Écrire sous la forme $10^n$.");
  sortie_html ? (this.spacing = 3) : (this.spacing = 2);
  sortie_html ? (this.spacing_corr = 3) : (this.spacing_corr = 2);
  this.nb_questions = 5;
  this.correction_detaillee_disponible = true;
  this.nb_cols_corr = 1;
  this.sup = 1;
  this.nouvelle_version = function (numero_de_l_exercice) {
    let type_de_questions;
    this.bouton_aide = modal_pdf(
      numero_de_l_exercice,
      "pdf/FichePuissances-4N21.pdf",
      "Aide mémoire sur les puissances (Sébastien Lozano)",
      "Aide mémoire"
    );

    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = [];
    if (this.sup == 1) {
      type_de_questions_disponibles = [1, 2, 3]; // produit, quotient et exponentiation de puissances de 10
    } else if (this.sup == 2) {
      type_de_questions_disponibles = [4, 5, 6, 7, 8, 9, 10, 11]; // calculs première série
    } else if (this.sup == 3) {
      type_de_questions_disponibles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; // calculs deuxième série
    }
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
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
      texte_corr,
      cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      type_de_questions = liste_type_de_questions[i];

      exp0 = randint(1, 9);
      exp1 = randint(1, 9, [exp0]);
      exp = [exp0, exp1]; // on choisit deux exposants différents c'est mieux
      lettre = lettre_depuis_chiffre(i + 1); // on utilise des lettres pour les calculs

      switch (type_de_questions) {
        case 1: // produit de puissances de même base
          texte = `$${lettre}=10^${exp[0]}\\times 10^${exp[1]}$`;

          texte_corr = `$${lettre}=10^${exp[0]}\\times 10^${exp[1]}$`;
          if (this.correction_detaillee) {
            texte_corr += `<br>`;
            texte_corr += `$${lettre}=${eclatePuissance(
              10,
              exp[0],
              coul0
            )} \\times ${eclatePuissance(10, exp[1], coul1)}$`;
          }
          texte_corr += `<br>`;
          texte_corr += `Il y a donc $\\mathbf{\\color{${coul0}}{${exp[0]}}~\\color{black}{+}~\\color{${coul1}}{${exp[1]}}}$ facteurs tous égaux à $10$`;
          texte_corr += `<br>`;
          texte_corr += `$${lettre}=10^{${exp[0]}+${exp[1]}} = 10^{${exp[0] + exp[1]
            }}`;
          // attention la base est de type str alors que la fonction switch sur un type number
          //if (simpNotPuissance(10, exp[0] + exp[1]) != ` `) {
          if ((exp[1] + exp[0]) % 2 == 0) {
            texte_corr += `=${simpNotPuissance(10, exp[0] + exp[1])}`;
          }
          texte_corr += `$`;
          texte_corr += `<br>`;
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

          texte_corr = `$${lettre}=\\dfrac{10^${exp[0]}}{10^${exp[1]}}$`;
          if (this.correction_detaillee) {
            texte_corr += `<br><br>`;
            texte_corr += `$${lettre}=\\dfrac{${eclatePuissance(
              10,
              exp[0],
              coul_exp0
            )}}{${eclatePuissance(10, exp[1], coul_exp1)}}$`;
          }
          texte_corr += `<br><br>`;
          texte_corr += `Il y a donc $\\mathbf{\\color{${coul1}}{${Math.min(
            exp[0],
            exp[1]
          )}}}$ simplifications par $10$ possibles.`;
          if (this.correction_detaillee) {
            texte_corr += `<br><br>`;
          }
          if (exp[0] - exp[1] == 0) {
            if (this.correction_detaillee) {
              texte_corr += `$${lettre}=\\dfrac{${eclatePuissance(
                `\\cancel{10}`,
                exp[0],
                coul_exp0
              )}}{${eclatePuissance(`\\cancel{10}`, exp[0], coul_exp1)}}$`;
            }
            texte_corr += `<br><br>`;
            texte_corr += `$${lettre}=1`;
          } else if (exp[0] - exp[1] < 0) {
            if (this.correction_detaillee) {
              texte_corr += `$${lettre}=\\dfrac{${eclatePuissance(
                `\\cancel{10}`,
                exp[0],
                coul_exp0
              )}}{${eclatePuissance(
                `\\cancel{10}`,
                exp[0],
                coul_exp1
              )}\\times${eclatePuissance(10, exp[1] - exp[0], coul_exp1)}}$`;
            }
            texte_corr += `<br><br>`;
            texte_corr += `$${lettre}=\\dfrac{1}{10^{${exp[1]}-${exp[0]
              }}}=\\dfrac{1}{10^{${exp[1] - exp[0]}}}`;
            //if (simpNotPuissance(10, exp[1] - exp[0]) != ` `) {
            if ((exp[1] - exp[0]) % 2 == 0) {
              texte_corr += `=\\dfrac{1}{${simpNotPuissance(
                10,
                exp[1] - exp[0]
              )}}=${simpNotPuissance(10, exp[0] - exp[1])}`;
            } else {
              texte_corr += `=10^{${exp[0] - exp[1]}}`;
            }
          } else {
            if (this.correction_detaillee) {
              texte_corr += `$${lettre}=\\dfrac{${eclatePuissance(
                `\\cancel{10}`,
                exp[1],
                coul_exp0
              )}\\times${eclatePuissance(
                10,
                exp[0] - exp[1],
                coul_exp0
              )}}{${eclatePuissance(`\\cancel{10}`, exp[1], coul_exp1)}}$`;
            }
            texte_corr += `<br><br>`;
            texte_corr += `$${lettre}=10^{${exp[0]}-${exp[1]}}=10^{${exp[0] - exp[1]
              }}`;
            //if (simpNotPuissance(10, exp[0] - exp[1]) != ` `) {
            // if ((exp[0] - exp[1])%2==0) { 
            //   texte_corr += `=${simpNotPuissance(10, exp[0] - exp[1])}`;
            // }
          }
          texte_corr += `$`;
          texte_corr += `<br>`;
          break;
        case 3: // exponentiation
          exp = [randint(2, 4), randint(2, 4)]; // on redéfinit les deux exposants pour ne pas avoir d'écritures trop longues et pour éviter 1
          texte = `$${lettre}=(10^${exp[0]})^{${exp[1]}}$`;

          texte_corr = `$${lettre}=(10^${exp[0]})^{${exp[1]}}$`;
          if (this.correction_detaillee) {
            texte_corr += `<br>`;
            texte_corr += `$${lettre}=\\color{${coul0}}{\\underbrace{${eclatePuissance(
              `(10^${exp[0]})`,
              exp[1],
              coul0
            )}}_{${exp[1]}\\thickspace\\text{facteurs}}}$`;
            texte_corr += `<br>`;
            texte_corr += `$${lettre}=\\color{${coul0}}{\\underbrace{${eclatePuissance(
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
          texte_corr += `<br>`;
          texte_corr += `Il y a donc $\\mathbf{\\color{${coul0}}{${exp[1]}}~\\color{black}{\\times}~\\color{${coul1}}{${exp[0]}}}$ facteurs tous égaux à $10$`;
          texte_corr += `<br>`;
          texte_corr += `$${lettre}=10^{${exp[0]}\\times${exp[1]}} = 10^{${exp[0] * exp[1]
            }}`;
          //if (simpNotPuissance(10, exp[0] * exp[1]) != ` `) {
          // if ((exp[1] * exp[0])%2==0) {             
          //   texte_corr += `= ${simpNotPuissance(10, exp[0] * exp[1])}`;
          // }
          texte_corr += `$`;
          texte_corr += `<br>`;
          break;
        case 4:
          exp = [randint(1, 7, [1]), randint(1, 7, [1]), randint(1, 7, [1])]; // on a besoin de 3 exposants distincts
          texte = `$\\dfrac{10^${exp[0]}\\times 100}{10^${exp[1]} \\times 10^${exp[2]}}$`;
          texte_corr = `$\\dfrac{10^${exp[0]}\\times 100}{10^${exp[1]} \\times 10^${exp[2]}}`;
          texte_corr += ` = \\dfrac{10^${exp[0]}\\times 10^{2}}{10^${exp[1]} \\times 10^${exp[2]}}`;
          texte_corr += ` = \\dfrac{10^{${exp[0]}+2}}{10^{${exp[1]}+${exp[2]}}}`;
          texte_corr += ` = \\dfrac{10^{${exp[0] + 2}}}{10^{${exp[1] + exp[2]
            }}}`;
          texte_corr += ` = 10^{${exp[0] + 2}-${exp[1] + exp[2]}}`;
          texte_corr += ` = 10^{${exp[0] + 2 - exp[1] - exp[2]}}`;
          if (
            exp[0] + 2 - exp[1] - exp[2] == 0 ||
            exp[0] + 2 - exp[1] - exp[2] == 1
          ) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
            texte_corr += `=` + simpExp(10, exp[0] + 2 - exp[1] - exp[2]);
          }
          texte_corr += `$`;
          break;
        case 5:
          exp = [randint(1, 7, [1]), randint(1, 7, [1])]; // on a besoin de 2 exposants distincts
          texte = `$\\dfrac{10^${exp[0]}\\times 1000}{10^${exp[1]}}$`;
          texte_corr = `$\\dfrac{10^${exp[0]}\\times 1000}{10^${exp[1]}}`;
          texte_corr += ` = \\dfrac{10^${exp[0]}\\times 10^3}{10^${exp[1]}}`;
          texte_corr += ` = \\dfrac{10^{${exp[0]}+3}}{10^${exp[1]}}`;
          texte_corr += ` = \\dfrac{10^{${exp[0] + 3}}}{10^${exp[1]}}`;
          texte_corr += ` = 10^{${exp[0] + 3}-${exp[1]}}`;
          texte_corr += ` = 10^{${exp[0] + 3 - exp[1]}}`;
          if (exp[0] + 3 - exp[1] == 0 || exp[0] + 3 - exp[1] == 1) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
            texte_corr += `=` + simpExp(10, exp[0] + 3 - exp[1]);
          }
          texte_corr += `$`;
          break;
        case 6:
          exp = [randint(1, 7, [1]), randint(1, 2)]; // on a besoin de 2 exposants distincts
          // le second exposant ne peut valoir que 1 ou 2 la fonction testExp ne convient pas à l'affichage ici
          if (exp[1] == 2) {
            texte = `$\\dfrac{10\\times 10^${exp[0]}}{100^${exp[1]}}$`;
            texte_corr = `$\\dfrac{10\\times 10^${exp[0]}}{100^${exp[1]}}`;
            texte_corr += `=\\dfrac{10^{1+${exp[0]}}}{(10^2)^${exp[1]}}`;
            texte_corr += `=\\dfrac{10^{1+${exp[0]}}}{10^{2 \\times ${exp[1]}}}`;
            texte_corr += `=\\dfrac{10^{${1 + exp[0]}}}{10^{${2 * exp[1]}}}`;
          } else {
            texte = `$\\dfrac{10\\times 10^${exp[0]}}{100}$`;
            texte_corr = `$\\dfrac{10\\times 10^${exp[0]}}{100}`;
            texte_corr += `=\\dfrac{10^{1+${exp[0]}}}{10^2}`;
          }
          texte_corr += `=10^{${1 + exp[0]}-${2 * exp[1]}}`;
          texte_corr += `=10^{${1 + exp[0] - 2 * exp[1]}}`;
          if (1 + exp[0] - 2 * exp[1] == 0 || 1 + exp[0] - 2 * exp[1] == 1) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
            texte_corr += `=` + simpExp(10, 1 + exp[0] - 2 * exp[1]);
          }
          texte_corr += `$`;
          break;
        case 7:
          exp = [randint(1, 7, [1])]; // on a besoin de 1 exposant
          texte = `$\\dfrac{10\\times 10^${exp[0]}}{100\\times 100}$`;
          texte_corr = `$\\dfrac{10\\times 10^${exp[0]}}{100\\times 100}`;
          texte_corr += `=\\dfrac{10^{1+${exp[0]}}}{10^2\\times 10^2}`;
          texte_corr += `=\\dfrac{10^{${1 + exp[0]}}}{10^{2+2}}`;
          texte_corr += `=\\dfrac{10^{${1 + exp[0]}}}{10^{${2 + 2}}}`;
          texte_corr += `=10^{${1 + exp[0]}-${2 + 2}}`;
          texte_corr += `=10^{${1 + exp[0] - 2 - 2}}`;
          if (1 + exp[0] - 2 - 2 == 0 || 1 + exp[0] - 2 - 2 == 1) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
            texte_corr += `=` + simpExp(10, 1 + exp[0] - 2 - 2);
          }
          texte_corr += `$`;
          break;
        case 8:
          exp = [randint(1, 7, [1])]; // on a besoin de 1 exposant
          texte = `$\\dfrac{100^${exp[0]}}{10}$`;
          texte_corr = `$\\dfrac{100^${exp[0]}}{10}`;
          texte_corr += `=\\dfrac{(10^2)^${exp[0]}}{10}`;
          texte_corr += `=\\dfrac{10^{2\\times ${exp[0]}}}{10}`;
          texte_corr += `=\\dfrac{10^{${2 * exp[0]}}}{10}`;
          texte_corr += `=10^{${2 * exp[0]}-1}`;
          texte_corr += `=10^{${2 * exp[0] - 1}}$`;
          // Inutile de tester l'exposant final car il vaut au minimum 3
          break;
        case 9:
          exp = [randint(1, 3, [1])]; // on a besoin de 1 exposant
          texte = `$\\dfrac{1000^${exp[0]}}{10}$`;
          texte_corr = `$\\dfrac{1000^${exp[0]}}{10}`;
          texte_corr += `=\\dfrac{(10^3)^${exp[0]}}{10}`;
          texte_corr += `=\\dfrac{10^{3\\times ${exp[0]}}}{10}`;
          texte_corr += `=\\dfrac{10^{${3 * exp[0]}}}{10}`;
          texte_corr += `=10^{${3 * exp[0]}-1}`;
          texte_corr += `=10^{${3 * exp[0] - 1}}$`;
          // inutile de tester l'exposant final car il vaut au minimum 5
          break;
        case 10:
          exp = [randint(1, 7, [1]), randint(1, 7, [1]), randint(1, 4, [1])]; // on a besoin de 3 exposants distincts
          texte = `$\\dfrac{10^${exp[0]}\\times 10^${exp[1]}}{100^${exp[2]}}\\times 10$`;
          texte_corr = `$\\dfrac{10^${exp[0]}\\times 10^${exp[1]}}{100^${exp[2]}}\\times 10`;
          texte_corr += `=\\dfrac{10^{${exp[0]}+${exp[1]}}}{(10^2)^${exp[2]}}\\times 10`;
          texte_corr += `=\\dfrac{10^{${exp[0] + exp[1]}}}{10^{2\\times ${exp[2]
            }}}\\times 10`;
          texte_corr += `=\\dfrac{10^{${exp[0] + exp[1]}}}{10^{${2 * exp[2]
            }}}\\times 10`;
          texte_corr += `=\\dfrac{10^{${exp[0] + exp[1]}}\\times 10}{10^{${2 * exp[2]
            }}}`;
          texte_corr += `=\\dfrac{10^{${exp[0] + exp[1]}+1}}{10^{${2 * exp[2]
            }}}`;
          texte_corr += `=\\dfrac{10^{${exp[0] + exp[1] + 1}}}{10^{${2 * exp[2]
            }}}`;
          texte_corr += `=10^{${exp[0] + exp[1] + 1}-${2 * exp[2]}}`;
          texte_corr += `=10^{${exp[0] + exp[1] + 1 - 2 * exp[2]}}`;
          if (
            exp[0] + exp[1] + 1 - 2 * exp[2] == 0 ||
            exp[0] + exp[1] + 1 - 2 * exp[2] == 1
          ) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant est évincé
            texte_corr += `=` + simpExp(10, exp[0] + exp[1] + 1 - 2 * exp[2]);
          }
          texte_corr += `$`;
          break;
        case 11:
          exp = [randint(1, 7, [1])]; // on a besoin de 1 exposant
          texte = `$\\dfrac{1000\\times 10}{100^${exp[0]}}$`;
          texte_corr = `$\\dfrac{1000\\times 10}{100^${exp[0]}}`;
          texte_corr += `=\\dfrac{10^3\\times 10}{(10^2)^${exp[0]}}`;
          texte_corr += `=\\dfrac{10^{3+1}}{10^{2\\times${exp[0]}}}`;
          texte_corr += `=\\dfrac{10^{4}}{10^{${2 * exp[0]}}}`;
          texte_corr += `=10^{4-${2 * exp[0]}}`;
          texte_corr += `=10^{${3 + 1 - 2 * exp[0]}}`;
          if (3 + 1 - 2 * exp[0] == 0 || 3 + 1 - 2 * exp[0] == 1) {
            // on ne teste l'exposant que pour la sortie puisque l'exposant est évincé
            texte_corr += `=` + simpExp(10, 3 + 1 - 2 * exp[0]);
          }
          texte_corr += `$`;
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
    "Règle à travailler",
    3,
    "1 : Calculs de base\n2 : Calculs plus complexes\n3 : Mélange",
  ];
}


/**
 * Donner l'écriture décimale d'une puissance de 10
 * @Auteur Rémi Angot
* Référence 4C30-2
 */
function EcritureDecimalePuissanceDe10() {
  Exercice.call(this);
  this.titre = "Écriture décimale d'une puissance de 10";
  this.consigne = "Donner l'écriture décimale";
  this.nb_questions = 8;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.sup = 3; // exposants positifs et négatifs par défaut

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let liste_type_de_questions
    if (this.sup == 1) {
      liste_type_de_questions = combinaison_listes(['+'], this.nb_questions);
    }
    if (this.sup == 2) {
      liste_type_de_questions = combinaison_listes(['-'], this.nb_questions);
    }
    if (this.sup == 3) {
      liste_type_de_questions = combinaison_listes(['+', '-'], this.nb_questions);
    }
    for (let i = 0, texte, texte_corr, n, cpt = 0; i < this.nb_questions && cpt < 50;) {
      switch (liste_type_de_questions[i]) {
        case '+':
          n = randint(0, 10)
          texte = `$10^{${n}}$`;
          if (n < 2) {
            texte_corr = `$10^${n}=${10 ** n}$`
          } else {
            if (sortie_html){
              texte_corr = `$10^{${n}}=${puissanceEnProduit(10, n)}=${tex_nombre(10 ** n)}$`;
            } else {
              texte_corr = `$10^{${n}}=${tex_nombre(10 ** n)}$`;
            }
          }
          break;
        case '-':
          n = randint(1, 10)
          texte = `$10^{${-n}}$`;
          if (sortie_html){
            texte_corr = `$10^{${-n}}=\\dfrac{1}{10^{${n}}}=\\dfrac{1}{${puissanceEnProduit(10, n)}}=\\dfrac{1}{${tex_nombre(10 ** n)}}=${tex_nombre2(1 / 10 ** n)}$`;
          } else {
            texte_corr = `$10^{${-n}}=\\dfrac{1}{10^{${n}}}=\\dfrac{1}{${tex_nombre(10 ** n)}}=${tex_nombre2(1 / 10 ** n)}$`;
          }
          break;

      }

      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = ['Niveau de difficulté', 3, '1 : Exposants positifs\n2 : Exposants négatifs\n3 : Exposants relatifs'];
}


/**
 * Donner l'écriture décimale d'une puissance de 10
 * @Auteur Rémi Angot
* Référence 4C30-3
 */
function EcritureDecimalePuissance() {
  Exercice.call(this);
  this.titre = "Écriture décimale d'une puissance";
  this.consigne = "Donner l'écriture sous la forme d'un nombre entier ou d'une fraction.";
  this.nb_questions = 8;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;
  this.sup = 3; // exposants positifs et négatifs par défaut

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let liste_de_calculs = combinaison_listes([[2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [3, 2], [3, 3], [3, 4], [4, 2], [4, 3], [5, 2], [5, 3], [6, 2], [6, 3], [7, 2], [7, 3], [8, 2], [8, 3], [9, 2], [9, 3]], this.nb_questions);

    let liste_type_de_questions
    if (this.sup == 1) {
      liste_type_de_questions = combinaison_listes(['+'], this.nb_questions);
      this.consigne = "Donner l'écriture sous la forme d'un nombre entier.";
    }
    if (this.sup == 2) {
      liste_type_de_questions = combinaison_listes(['-'], this.nb_questions);
    }
    if (this.sup == 3) {
      liste_type_de_questions = combinaison_listes(['+', '-'], this.nb_questions);
    }
    for (let i = 0, texte, texte_corr, a, n, cpt = 0; i < this.nb_questions && cpt < 50;) {
      switch (liste_type_de_questions[i]) {
        case '+':
          a = liste_de_calculs[i][0];
          n = liste_de_calculs[i][1];
          texte = `$${a}^{${n}}$`;
          if (n < 2) {
            texte_corr = `${a}^${n}=$${a}**n}$`
          } else {
            texte_corr = `$${a}^{${n}}=${puissanceEnProduit(a, n)}=${tex_nombre(a ** n)}$`;
          }
          break;
        case '-':
          a = liste_de_calculs[i][0];
          n = liste_de_calculs[i][1];
          texte = `$${a}^{${-n}}$`;
          texte_corr = `$${a}^{${-n}}=\\dfrac{1}{${a}^{${n}}}=\\dfrac{1}{${puissanceEnProduit(a, n)}}=\\dfrac{1}{${tex_nombre(a ** n)}}$`;
          break;

      }

      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = ['Niveau de difficulté', 3, '1 : Exposants positifs\n2 : Exposants négatifs\n3 : Exposants relatifs'];
}


/**
 * problèmes de grandeurs composées
 * @Auteur Jean-Claude Lhote
 * Référence : 4P10
 */
function Problemes_grandeurs_composees() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre =
    "Résoudre des problèmes de grandeurs composées et de conversion d'unités complexes";
  this.consigne = "";
  this.nb_questions = 3;
  this.nb_questions_modifiable = false;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  sortie_html ? (this.spacing = 3) : (this.spacing = 1.5);
  sortie_html ? (this.spacing_corr = 3) : (this.spacing_corr = 2);
  this.sup = false;

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    // let liste_index_disponibles=[1,2,3,4,5,6,7,8,9,10,11,12,13,14];
    // let liste_index=combinaison_listes(liste_index_disponibles,this.nb_questions);
    let grandeurs = [];
    let liste7 = combinaison_listes([0, 1, 2], this.nb_questions)
    let flag7 = 0, flag2 = 0
    let liste2 = combinaison_listes([0, 1], this.nb_questions)



    if (!this.sup) {
      // Si aucune grandeur n'est saisie
      grandeurs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    } else {
      if (typeof this.sup == "number") {
        // Si c'est un nombre c'est qu'il y a qu'une seule grandeur
        grandeurs[0] = this.sup;
        this.nb_questions = 1;
      } else {
        grandeurs = this.sup.split("-"); // Sinon on créé un tableau à partir des valeurs séparées par des -
        this.nb_questions = grandeurs.length;
      }
    }

    let liste_index = combinaison_listes(grandeurs, this.nb_questions);
    let monchoix;
    let type_aide = 1;
    if (!sortie_html) type_aide = 0;
    let solutes = [
      [`sel`, `d'eau`, 300],
      [`sucre`, `d'eau`, 2000],
      [`dioxyde de carbone`, `d'eau`, 3],
      [`bicarbonate de sodium`, `d'eau`, 9],
      [`carbonate de sodium`, `d'eau`, 300],
    ]; //soluté, masse maximale en gramme pour saturer 1 L de solvant
    let materiaux = [
      [`Paladium`, 12000],
      [`acier`, 7800],
      [`fonte`, 7100],
      [`aluminium`, 2700],
      [`argent`, 10500],
      [`bronze`, 8800],
      [`cuivre`, 8960],
      [`fer`, 7860],
      [`lithium`, 530],
      [`mercure`, 13545],
      [`nickel`, 8900],
      [`or`, 19300],
      [`platine`, 21450],
      [`titane`, 4500],
      [`zinc`, 7150],
    ];
    let villes = [
      [`Nice`, 342637, 71.9],
      [`Montpellier`, 281613, 56.9],
      [`Rennes`, 216268, 50.4],
      [`Dijon`, 155090, 40.4],
      [`Orléans`, 114782, 27.5],
      [`Clermont-Ferrand`, 142686, 42.7],
      [`Nantes`, 306694, 65.2],
      [`Paris`, 2190327, 105.4],
      [`Lyon`, 515695, 47.9],
      [`Marseille`, 862211, 240.6],
      [`Bordeaux`, 252040, 49.4],
      [`Nancy`, 104592, 15],
      [`Toulouse`, 475438, 118.3],
      [`Lille`, 232440, 34.8],
      [`Strasbourg`, 279284, 78.3],
    ]; //[Ville, population, superfice en ha, année du recensement]
    let locations = [
      [`un vélo`, 1.5, 2, 8],
      [`un canoé`, 10, 2, 4],
      [`des rollers`, 7, 2, 5],
      [`un char à voile`, 12, 2, 4],
    ];
    let cours = [
      [`de piano`, 20],
      [`de maths`, 25],
      [`de yoga`, 5],
      [`de dessin`, 12],
      [`de voile`, 15],
    ];
    let fruits = [
      [`pêches`, 4, 10, 30],
      [`Noix`, 5.4, 4, 13],
      [`cerises`, 5.6, 11, 20],
      [`pommes`, 2.2, 20, 40],
      [`framboises`, 15, 1, 5],
      [`fraises`, 7.5, 5, 10],
      [`citrons`, 1.5, 15, 30],
      [`bananes`, 1.5, 15, 25],
    ];
    let appareils = [
      [`radiateur`, 2000, 20],
      [`téléviseur`, 350, 12],
      [`four électrique`, 2500, 4],
      [`ordinateur`, 450, 8],
    ]; // [appareil,puissance,durée maxi de fonctionnement]
    let liquides = [
      [`de lait entier`, 1.032],
      [`d'essence`, 0.755],
      [`de diesel`, 0.83],
      [`d'huile`, 0.91],
      [`de bière`, 0.9],
      [`de sable`, 1.6],
    ]; // [nom,densité]
    let rivieres = [
      [`Marne`, `Gournay-sur-Marne`, 110, 550, `avril 1983`, `la `, `de la `],
      [`Seine`, `Alfortville`, 218, 2100, `janvier 1982`, `la `, `de la `],
      [`Oise`, `Pont-Sainte-Maxence`, 109, 665, `février 1995`, `l'`, `de l'`],
      [`Loire`, `Saint-Nazaire`, 931, 5350, `décembre 1999`, `la `, `de la`],
      [`Rhin`, `Strasbourg`, 951, 3310, `juin 2016`, `le `, `du `],
      [`Rhône`, `Beaucaire`, 1690, 11500, `décembre 2003`, `le `, `du `],
      [`Meuse`, `Chooz`, 144, 1610, `janvier 1995`, `la `, `de la `],
    ];
    // [Nom de rivière,Lieu de passage,débit moyen annuel, débitmax, date de la crue, article défini, article partitif]
    let vitesses = [
      [`sur un vélo`, 4, 12, 8],
      [`dans un train`, 50, 100, 5],
      [`dans une voiture`, 15, 30, 5],
      [`en avion`, 150, 250, 12],
      [`à pied`, 2, 4, 5],
    ]; // [moyen de transport, vitesse min,vitesse max en m/s,durée max en h]
    for (
      let i = 0,
      j,
      index,
      index1,
      index2,
      duree,
      quidam,
      nbheures,
      nbminutes,
      nbsecondes,
      vitesse_moy,
      distance,
      masse,
      masse2,
      masse3,
      prix1,
      prix2,
      prix3,
      texte,
      texte_corr,
      cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      switch (parseInt(liste_index[i])) {
        case 1: // problème de consommation éléctrique
          index = randint(0, 3);
          let appareil = appareils[index][0];
          let puissance = appareils[index][1];
          let duree_max = appareils[index][2];
          let nbquartsdheures = randint(0, 3);
          nbheures = randint(duree_max / 4, duree_max, [1]);
          duree = nbheures + nbquartsdheures * 0.25;
          let prixkwh = calcul(randint(0, 5) / 100 + 0.14);
          texte = `L'étiquette apposée au dos d'un ${appareil} indique une puissance de ${puissance} Watts. On le fait fonctionner pendant ${Math.floor(
            duree
          )} heures `;
          if (nbquartsdheures != 0)
            texte += `et ${nbquartsdheures * 15} minutes`;
          texte += `.<br>Le prix d'un kWh est de ${tex_nombrec(
            prixkwh
          )} €.<br>`;
          if (sortie_html) {
            // les boutons d'aide uniquement pour la version html
          }
          texte +=
            num_alpha(0) +
            ` Exprimer en kWh l' ` +
            katex_Popup2(
              numero_de_l_exercice + i + 1,
              type_aide,
              "énergie",
              `Définition : énergie (grandeur physique)`,
              `C’est le produit de la puissance électrique (Watt) par le temps (s) et se mesure en Joule (J).<br>1 J=1 W × 1 s.<br>Cependant pour mesurer des énergies plus importantes on utilise plutôt le kiloWattheure (kWh).<br>1 kWh=1000 W × 1 h.`
            ) +
            ` consommée.<br>`;
          texte += num_alpha(1) + ` Calculer la dépense correspondante.`;
          texte_corr =
            num_alpha(0) +
            ` Un ${appareil} d'une puissance de ${puissance} Watts qui fonctionne pendant ${Math.floor(
              duree
            )} heures `;
          if (nbquartsdheures != 0)
            texte_corr += `et ${nbquartsdheures * 15} minutes`;
          texte_corr += ` consomme : <br>`;
          if (nbquartsdheures != 0)
            texte_corr += `$${nbheures}\\text{ h } ${nbquartsdheures * 15
              } = ${nbheures}\\text{ h} + ${tex_fraction_reduite(
                nbquartsdheures,
                4
              )}\\text{ h} =${tex_nombre(
                nbheures + nbquartsdheures * 0.25
              )}\\text{ h}$<br>`;
          texte_corr += `$${puissance}\\text{ W}\\times${tex_nombre(
            duree
          )}\\text{ h}=${tex_nombre(
            puissance / 1000
          )}\\text{ kW}\\times${tex_nombre(duree)}\\text{ h}=${tex_nombre(
            calcul(puissance * duree * 0.001)
          )}\\text{ kWh}.$<br>`;
          texte_corr +=
            num_alpha(1) +
            ` Le prix de cette énergie consommée est : $${tex_nombre(
              prixkwh
            )}$ €$\\text{ /kWh} \\times${tex_nombre(
              calcul(puissance * duree * 0.001)
            )}\\text{ kWh}`;
          if (
            !(
              (prixkwh * puissance * duree) / 10 ==
              Math.round((prixkwh * puissance * duree) / 10)
            )
          )
            texte_corr += `\\approx${arrondi_virgule(
              ((prixkwh * puissance) / 1000) * duree,
              2
            )}$ €`;
          else
            texte_corr += `=${arrondi_virgule(
              ((prixkwh * puissance) / 1000) * duree,
              2
            )}$ €`;
          break;
        case 2: // problèmes de volumes
          index1 = liste2[flag2];
          flag2++;
          switch (index1) {
            case 0: // Volume d'une piscine
              let h1 = 180 + randint(0, 10) * 10;
              let h2 = 80 + randint(0, 4) * 10;
              let l = 5 + randint(0, 5);
              let L = l * 2 + randint(0, 4) * 2;
              let deltat = randint(2, 5);
              texte = `Une piscine a la forme d'un prisme droit. La profondeur à son extrémité nord est de ${h1} cm et la profondeur à son extrémité sud est de ${h2} cm.<br>`;
              texte += `D\'une extrémité à l\'autre la pente au fond de la piscine est régulière.<br>La largeur de la piscine (Est-Ouest) est de ${l} m et sa longueur (Nord-Sud) est de ${L} m.<br>`;
              texte +=
                num_alpha(0) +
                ` Calculer le ` +
                katex_Popup2(
                  numero_de_l_exercice + i * 3,
                  type_aide,
                  "volume",
                  `Définition : volume (grandeur physique)`,
                  `C’est le produit de trois longueurs ou le produit d'une aire et d'une longueur.<br>L'unité de mesure du volume est le mètre cube (m${exposant(
                    3
                  )}) mais on peut aussi rencontrer le litre (L) avec comme correspondance 1dm${exposant(
                    3
                  )}=1L`
                ) +
                ` d'eau en m${exposant(
                  3
                )} contenu dans cette piscine quand elle est pleine.<br>`;
              texte +=
                num_alpha(1) +
                ` Sachant que pour élever la température d'un litre d'eau de 1 degré, il faut une énergie de 1,162 Wattheure.<br> Quelle est l'énergie consommée en kWh pour augmenter de ${deltat} degrés ?<br>`;
              texte_corr =
                num_alpha(0) +
                ` La base de ce prisme droit est un trapèze rectangle de petite base ${h2} cm, de grande base ${h1} cm et de hauteur ${L} m.<br>`;
              texte_corr += `$\\mathcal{A}=\\dfrac{\\left(${h1}\\text{ cm}+${h2}\\text{ cm}\\right)}{2}\\times${L}\\text{ m}$`;
              texte_corr += ` $=\\dfrac{\\left(${arrondi_virgule(
                h1 / 100
              )}\\text{ m}+${arrondi_virgule(
                h2 / 100
              )}\\text{ m}\\right)}{2}\\times${L}\\text{ m}$`;
              texte_corr += ` $=\\dfrac{${arrondi_virgule(
                (h1 + h2) / 100
              )}\\text{ m}}{2}\\times${L}\\text{ m}$`;
              texte_corr += ` $=${arrondi_virgule(
                (h1 + h2) / 200
              )}\\text{ m}\\times${L}\\text{ m}$`;
              texte_corr += ` $=${arrondi_virgule(
                ((h1 + h2) / 200) * L
              )}\\text{ m}$${exposant(2)}<br>`;
              texte_corr += `Le volume de ce prisme et donc par extension le volume d'eau conteu dans la piscine est :<br>`;
              texte_corr += `$\\mathcal{A}\\times\\mathcal{h}=${arrondi_virgule(
                ((h1 + h2) / 200) * L
              )}\\text{ m}^2\\times${l}\\text{ m}$`;
              texte_corr += ` $=${arrondi_virgule(
                ((h1 + h2) / 200) * L * l
              )}$m${exposant(3)}.<br>`;
              texte_corr +=
                num_alpha(1) +
                ` Convertissons le volume de la piscine en litres : $${arrondi_virgule(
                  ((h1 + h2) / 200) * L * l
                )}\\text{ m}^3=${tex_nombre(
                  (h1 + h2) * L * l * 5
                )}\\text{ dm}^3=${tex_nombre(
                  (h1 + h2) * L * l * 5
                )}\\text{ L}$<br>`;
              texte_corr += ` L'énergie consomée pour élever la température de l'eau de cette piscine de ${deltat} degrés est :<br>`;
              texte_corr += `$\\mathcal{E}=${tex_nombre(
                (h1 + h2) * L * l * 5
              )}\\text{ L}\\times${deltat}\\text{ °C}\\times 1,162 \\dfrac{\\text{Wh}}{\\text{°C}\\times\\text{L}}=${tex_nombre(
                arrondi((h1 + h2) * L * l * 5 * deltat * 1.162, 3)
              )}\\text{ Wh}=${tex_nombre(
                arrondi((((h1 + h2) * L * l) / 200) * deltat * 1.162, 7)
              )}\\text{ kWh}$<br>`;
              break;
            case 1: // Volume d'un tonneau cylindrique
              index2 = randint(0, 5);
              let r = randint(10, 15) * 2;
              let h = randint(0, 10) + r * 4;
              texte = `Un tonneau cylindrique a un rayon de ${r} cm et une hauteur de ${h} cm.<br>`;
              texte +=
                num_alpha(0) +
                ` Calculer le ` +
                katex_Popup2(
                  numero_de_l_exercice + i * 3,
                  type_aide,
                  "volume",
                  `Définition : volume (grandeur physique)`,
                  `C’est le produit de trois longueurs ou le produit d'une aire et d'une longueur.<br>L'unité de mesure du volume est le mètre cube ($\\text{m}^3$) mais on peut aussi rencontrer le litre (L) avec comme correspondance $\\text{1dm}^3=\\text{1L}$`
                ) +
                ` en dm${exposant(3)} à 0,1 près de ce tonneau.<br>`;
              texte +=
                num_alpha(1) +
                ` Si on le remplit ${liquides[index2][0]} (dont la ` +
                katex_Popup2(
                  numero_de_l_exercice + i * 3,
                  type_aide,
                  "densité",
                  `Définition : densité (grandeur physique)`,
                  `La densité d'une substance est égale à la masse volumique de la substance divisée par la masse volumique du corps de référence à la même température.<br>Pour les liquides et les solides, l'eau est utilisée comme référence (sa masse volumique est de 1kg/dm$^3$), pour les gaz, la mesure s'effectue par rapport à l'air.<br>Donc pour les liquides, la densité est égale à la masse volumique exprimée en kg/dm$^3$.`
                ) +
                ` est de ${tex_nombrec(liquides[index2][1])}), quelle masse ${liquides[index2][0]
                } en kg contiendra-t-il au gramme près ?<br>`;
              texte_corr =
                num_alpha(0) +
                ` Le volume d'un cylindre est donné par la formule $\\mathcal{A}\\text{ire de base}\\times\\mathcal{h}$.<br> Ici la base est un disque de rayon ${r} cm.<br>`;
              texte_corr += `$\\mathcal{A}\\text{ire de base}\\times\\mathcal{h}=\\pi\\times${r}^{2}\\text{ cm}^2\\times${h}\\text{ cm}=${r * r * h
                }\\pi\\text{ cm}^3\\approx${tex_nombre(
                  arrondi(r * r * h * Math.PI, 1)
                )}\\text{ cm}^3\\approx${tex_nombre(
                  arrondi((r * r * h * Math.PI) / 1000, 1)
                )}\\text{ dm}^3$<br>`;
              texte_corr +=
                num_alpha(1) +
                ` La masse de lait contenue dans ce tonneau est :<br>`;
              texte_corr += `$${tex_nombre(
                arrondi((r * r * h * Math.PI) / 1000, 1)
              )}\\text{ dm}^3\\times ${tex_nombrec(
                liquides[index2][1]
              )} \\times 1 \\dfrac{kg}{dm}^3\\approx${tex_nombre(
                arrondi(((r * r * h * Math.PI) / 1000) * liquides[index2][1], 3)
              )}\\text{ kg}$`;
              break;
          }
          break;
        case 3: // Problème de quantité de mouvement et d'énergie cinétique
          quidam = prenomF();
          index1 = randint(0, 4);
          masse = randint(40, 70);
          vitesse_moy = randint(vitesses[index1][1], vitesses[index1][2]); // vitesse choisie pour l'exo
          texte =
            `${quidam} se déplace ${vitesses[index1][0]} à la ` +
            katex_Popup2(
              numero_de_l_exercice + i * 3,
              type_aide,
              `vitesse`,
              `Définition : Vitesse (grandeur physique)`,
              `La vitesse est le quotient de la distance parcourue par le temps de parcours.<br>L'unité officielle est le mètre par seconde ($\\text{m/s}$  ou  $\\text{m.s}^{-1}$) mais on utilise souvent le kilomètre par heure ($\\text{km/h}$  ou  $\\text{km.h}^{-1}$)`
            ) +
            ` de ${tex_nombrec(vitesse_moy)} m/s.<br>`;
          texte += `Elle pèse ${masse} kg.<br>`;
          texte +=
            num_alpha(0) +
            ` Calculer sa ` +
            katex_Popup2(
              numero_de_l_exercice + i * 3 + 1,
              type_aide,
              "quantité de mouvement",
              `Définition : quantité de mouvement (grandeur physique)`,
              `C’est le produit de la masse d'un corps par sa vitesse.<br>L'unité de mesure de la quantité de mouvement est le ($\\text{kg.m.s}^{-1}$)`
            ) +
            ` en $\\text{kg.m.s}^{-1}$.<br>`;
          texte +=
            num_alpha(1) +
            ` En déduire son ` +
            katex_Popup2(
              numero_de_l_exercice + i * 3 + 2,
              type_aide,
              "énergie cinétique",
              `Définition : énergie cinétique (grandeur physique)`,
              `L'énergie cinétique d'un corps de masse $m$ (en kg) assimilé à un point matériel se déplaçant à la vitesse $v$ (en m/s) est donné par la formule $E=\\dfrac{1}{2}\\times m\\times v^2$.<br>L'unité de mesure de l'énergie cinétique est le Joule (J).<br>$1J=1\\text{ kg.m}^2\\text{s}^{-2}$.`
            ) +
            ` en Joules.`;
          texte_corr =
            num_alpha(0) +
            ` La quantité de mouvement de ${quidam} est : $${masse} \\text{ kg}\\times ${vitesse_moy}\\text{ m/s}=${tex_nombrec(
              masse * vitesse_moy
            )}\\text{ kg.m.s}^{-1}$<br>`;
          texte_corr +=
            num_alpha(1) +
            ` L'énergie cinétique de ${quidam} est : $\\dfrac{1}{2}\\times ${masse} \\text{ kg}\\times (${vitesse_moy}\\text{ m/s})^2=\\dfrac{${masse}\\times${vitesse_moy}^2}{2}\\text{ J}=${tex_nombrec(
              (masse * vitesse_moy ** 2) / 2
            )}\\text{ J}$`;
          break;
        case 4: // problème de moment et de couple de forces qui s'annulent.
          quidam = prenom();
          index = randint(60, 90); //masse du père (recyclage de variable)
          masse = randint(20, 30); //masse de l'enfant
          distance = arrondi(randint(25, 35) / 10);
          texte =
            `${quidam} qui pèse ${masse} kg se trouve sur le siège d'une balançoire "` +
            katex_Popup2(
              numero_de_l_exercice + i * 3,
              2,
              `trébuchet`,
              `Schéma explicatif`,
              `images/trebuchet.png`
            ) +
            `" dans un jardin d'enfant. Le siège est situé à ${tex_nombre(
              distance
            )} m du pivot central de la balançoire (bras de levier).<br>`;
          texte +=
            num_alpha(0) +
            ` Calculer le ` +
            katex_Popup2(
              numero_de_l_exercice + i * 3 + 1,
              type_aide,
              `moment`,
              `Définition : momnent (grandeur physique)`,
              `Le moment d'une force d'intensité F(en Newton ou kg.m.s$^{-2}$) en un point M par rapport à un pivot P est le produit de F par la distance PM (appelée bras de levier) exprimée en mètres (lorsque cette force s'exerce perpendiculairement au bras de levier). Le moment est l'energie permettant de faire tourner l'objet autour du pivot.<br>L'unité de mesure du moment est le Joule (J).<br>$1J=1\\text{ kg.m}^2\\text{s}^{-2}$.`
            ) +
            ` du ` +
            katex_Popup2(
              numero_de_l_exercice + i * 3 + 2,
              type_aide,
              `poids`,
              `Définition : Poids`,
              `Le poids est le produit de la masse d'un objet par l'accélération de la pesanteur terrestre ($9,81\\text{ m.s}^{-2}$).<br>L'unité du poids est le Newton (N) : 1N=1kg.m.s$^{-2}$`
            ) +
            ` de ${quidam} sur son siège par rapport au pivot central du trébuchet en Joules (on admettra que le bras de levier est horizontal).<br>`;
          texte +=
            num_alpha(1) +
            ` Le père de ${quidam} vient s'installer de l'autre côté du pivot central. Il pèse ${index} kg et s'installe de façon à ce que son poids permette d'équilibrer la balançoire à l'horizontale. Quelle doit être la longueur du bras de levier de son côté ( à quelle distance du pivot est-il assis ) ?<br>`;
          texte_corr =
            num_alpha(0) +
            ` Le moment du poids de ${quidam} appliqué sur son siège par rapport au pivot central du trébuchet est :<br>`;
          index1 = arrondi(masse * 9.81 * distance); //pour éviter d'avoir trop de variable, je recycle
          texte_corr += `$${masse}\\text{ kg} \\times 9,81 \\text{m.s}^{-2} \\times ${tex_nombre(
            distance
          )} \\text{ m} = ${tex_nombre(
            index1
          )}\\text{ kg.m}^2\\text{.s}^{-2}=${tex_nombre(
            index1
          )}\\text{ J}$<br>`;
          texte_corr +=
            num_alpha(1) +
            ` Afin d'équilibrer le trébuchet, le père de ${quidam} doit se placer de façon que le moment de son poids sur son point d'assise par rapport au pivot central du trébuchet soit égal à celui de ${quidam}, on obtient l'équation suivante où $${mise_en_evidence(
              `d`,
              `black`
            )}$ représente sa distance par rapport au pivot central :<br>`;
          texte_corr += `$ ${index}\\text{ kg}\\times 9,81 \\text{m.s}^{-2} \\times ${mise_en_evidence(
            `d`,
            `black`
          )} \\text{ m}=${tex_nombre(index1)}\\text{ J}$<br>`;
          texte_corr += `D'où $${mise_en_evidence(
            `d`,
            `black`
          )}\\text{ m} = \\dfrac{${tex_nombre(
            index1
          )}\\text{ J}}{${index}\\text{ kg}\\times 9,81 \\text{m.s}^{-2}}\\approx${tex_nombrec(
            arrondi(index1 / (9.81 * index))
          )}\\text{ m}.$`;
          break;
        case 5: //problème de trafic de coyageurs.
          let d1 = randint(3, 6);
          let d2 = randint(3, 6, [d1]);
          let k = randint(5, 8);
          let n1 = k * d2;
          let n2 = k * d1;
          texte =
            num_alpha(0) +
            ` Un bus de ville transporte en moyenne ${n1} personnes à la fois.<br> La longueur moyenne de déplacement est de ${d1} km.<br> Calculer le ` +
            katex_Popup2(
              numero_de_l_exercice + i * 3,
              type_aide,
              `trafic`,
              `Définition : Trafic de voyageurs`,
              `Le trafic de voyageurs est le produit du nombre de voyageurs par la distance parcourue. L'unité est le voyageur.km qui correspond au déplacement d'un voyageur sur 1km`
            ) +
            ` moyen de voyageurs en voyageurs.km.<br> `;
          texte +=
            num_alpha(1) +
            ` Un autre bus de ville transporte en moyenne ${n2} personnes à la fois.<br> La longueur moyenne de déplacement est de ${d2} km.<br> Montrer que le trafic de voyageur est le même qu'à la question ` +
            num_alpha(0);
          texte_corr =
            num_alpha(0) +
            ` Le trafic moyen de ce bus de ville est : $${n1}\\text{voyageurs}\\times${d1}\\text{km}=${n1 * d1
            }\\text{voyageurs.km}$.<br>`;
          texte_corr +=
            num_alpha(1) +
            ` Le trafic moyen de ce bus de ville est : $${n2}\\text{voyageurs}\\times${d2}\\text{km}=${n2 * d2
            }\\text{voyageurs.km}$, donc ces deux bus ont le même trafic.`;
          break;
        case 6: //problème de puissance électrique.
          index = randint(0, 3);
          index1 = randint(0, 3, [index]);
          let I1 = arrondi(appareils[index][1] / 230, 0) + 1;
          texte =
            num_alpha(0) +
            ` Un ${appareils[index][0]} est protégé par un fusible de ${I1} ampères, quelle est la ` +
            katex_Popup2(
              numero_de_l_exercice + i * 3 + 1,
              type_aide,
              `puissance`,
              `Définition : Puissance (grandeur physique)`,
              `C’est le produit de la force électromotrice (tension) exprimée en Volt (V) par l'intensité du courant électrique exprimée en ampères (A).<br>L'unité de mesure de la puissance est le Watt (W)`
            ) +
            ` maximale de cet appareil si il fonctionne sur le secteur ?<br>`;
          texte +=
            num_alpha(1) +
            ` Un ${appareils[index1][0]} fonctionne à une puissance maximum de ${appareils[index1][1]} W.<br>Quel est l'ampérage minimum nécessaire pour le fusible qui protégera ce ${appareils[index][0]} des court-ciruits ?<br>`;
          texte_corr =
            num_alpha(0) +
            ` La tension du secteur étant de 230V, la puissance maximale de ce ${appareils[index][0]} est de :<br>`;
          texte_corr += `$230\\text{ V}\\times${I1}\\text{ A}=${230 * I1
            }\\text{ W}$<br>`;
          let I2 = Math.floor(appareils[index1][1] / 230) + 1;
          texte_corr +=
            num_alpha(1) +
            ` Pour fonctionner à la puissance maximum, cet appareil a besoin d'un courant d'une intensité de :<br>`;
          texte_corr += `$\\dfrac{${appareils[index1][1]
            }\\text{ W}}{230 \\text{ V}} \\approx ${tex_nombrec(
              arrondi(appareils[index1][1] / 230)
            )}\\text{ A}$.<br>`;
          texte_corr += `Le fusible nécessaire pour protéger cet appareil des courts-circuits devra avoir une intensité de rupture minimum de ${I2} ampères.`;
          break;
        case 7: // problème de vitesses
          index2 = liste7[flag7];
          flag7++;
          quidam = prenom(); //prenom choisi
          switch (index2) {
            case 0: // problème de déplacements
              index1 = randint(0, 4);
              vitesse_moy = randint(vitesses[index1][1], vitesses[index1][2]); // vitesse choisie pour l'exo
              distance = Math.round(
                (vitesse_moy * 3.6 * vitesses[index1][3] * randint(5, 20)) / 10
              ); //distance choisie pour question b
              duree = randint(2, vitesses[index1][3]);
              texte =
                `${quidam} se déplace ${vitesses[index1][0]} à la ` +
                katex_Popup2(
                  numero_de_l_exercice + i * 3,
                  type_aide,
                  `vitesse`,
                  `Définition : Vitesse (grandeur physique)`,
                  `La vitesse est le quotient de la distance parcourue par le temps de parcours.<br>L'unité officielle est le mètre par seconde ($\\text{m/s}$  ou  $\\text{m.s}^{-1}$) mais on utilise souvent le kilomètre par heure ($\\text{km/h}$  ou  $\\text{km.h}^{-1}$)`
                ) +
                ` de ${tex_nombrec(vitesse_moy)} m/s.<br>`;
              texte +=
                num_alpha(0) +
                ` En se déplaçant à cette vitesse pendant ${duree} h, quelle est la distance parcourue par ${quidam} en km ?<br>`;
              texte +=
                num_alpha(1) +
                ` Si ${quidam} veut parcourir ${nombre_avec_espace(
                  distance
                )} km à cette vitesse, combien de temps durera le trajet ? Donner le résultat en heures, minutes et secondes.`;
              texte_corr =
                num_alpha(0) +
                ` La distance parcourue par ${quidam} ${vitesses[index1][0]
                } en ${duree} h à la vitesse de ${tex_nombrec(
                  vitesse_moy
                )} m/s est :<br>`;
              texte_corr += `$${tex_nombrec(
                vitesse_moy
              )}\\text{ m/s}\\times${duree}\\text{ h}=\\dfrac{${tex_nombrec(
                vitesse_moy
              )}\\text{ m}}{1 \\text{ s}}\\times ${duree}\\times ${tex_nombre(
                3600
              )}\\text{ s}`;
              texte_corr += `=${tex_nombrec(
                vitesse_moy * 3600 * duree
              )}\\text{ m}=${tex_nombrec(
                vitesse_moy * 3.6 * duree
              )}\\text{ km}$<br>`;
              texte_corr +=
                num_alpha(1) +
                ` Pour parcourir ${nombre_avec_espace(
                  distance
                )} km à cette vitesse, ${quidam} mettra :<br>`;
              texte_corr += ` Partons de la formule $\\mathcal{V}=\\dfrac{\\mathcal{d}}{\\mathcal{t}}$ et remplaçons : $\\dfrac{${vitesse_moy}\\text{ m}}{1 \\text{ s}}=\\dfrac{${tex_nombre(
                distance
              )}\\text{ km}}{\\mathcal{t}\\text{ h}}$<br>`;
              texte_corr += `Rendons les unités homogènes : $\\dfrac{${vitesse_moy}\\text{ m}}{1 \\text{ s}}=\\dfrac{${tex_nombrec(
                distance * 1000
              )}\\text{ m}}{\\mathcal{t}\\text{ h}\\times ${tex_nombre(
                3600
              )}\\text{ s/h}}$<br>`;
              texte_corr += `Appliquons l'égalité des produits en croix : ${produits_en_croix(
                [
                  [`${vitesse_moy}\\text{ m}`, `1 \\text{ s}`],
                  [
                    `${tex_nombrec(distance * 1000)}\\text{ m}`,
                    `\\mathcal{t}\\times ${tex_nombre(3600)}\\text{ s/h}`,
                  ],
                ]
              )}<br>`;
              texte_corr += `D'où : $\\mathcal{t}=\\dfrac{1 \\text{ s}\\times${tex_nombrec(
                distance * 1000
              )}\\text{ m}}{${vitesse_moy}\\text{ m}\\times${tex_nombre(
                3600
              )}\\text{ s}}$ (t est le nombre décimal d'heures : les mètres et les secondes disparaissent car elles sont présentes au numérateur et au dénominateur.)<br>`;
              texte_corr += `Soit : $\\mathcal{t}\\approx${tex_nombrec(
                (distance * 1000) / vitesse_moy / 3600
              )}\\text{ h}\\approx${tex_nombrec(
                arrondi((distance * 1000) / vitesse_moy, 0)
              )}\\text{ s}\\approx`;
              nbheures = Math.floor((distance * 1000) / vitesse_moy / 3600); //conversion en h min s
              nbminutes = Math.floor(
                (Math.floor((distance * 1000) / vitesse_moy) % 3600) / 60
              );
              nbsecondes = arrondi(
                (distance * 1000) / vitesse_moy -
                3600 * nbheures -
                60 * nbminutes,
                0
              );
              texte_corr += `(${tex_nombre(nbheures)}\\times ${tex_nombre(
                3600
              )}+${tex_nombre(nbminutes)}\\times 60+${tex_nombre(
                nbsecondes
              )})\\text{ s}\\approx`;
              if (nbheures != 0)
                texte_corr += `${tex_nombre(nbheures)}\\text{ h }`; //affichage de la réponse
              if (nbminutes != 0)
                texte_corr += `${tex_nombre(nbminutes)}\\text{ min }`;
              texte_corr += `${tex_nombre(nbsecondes)}\\text{ s}$`;
              break;
            case 1: // l'orage et la vitesse du son
              duree = randint(2, 15); //durée pour question a)
              distance = randint(5, 15, [duree]) * 340; //distance de l'orage en m pour question b
              texte =
                `Le son se déplace dans l'air à la ` +
                katex_Popup2(
                  numero_de_l_exercice + i * 3,
                  type_aide,
                  `vitesse`,
                  `Définition : Vitesse (grandeur physique)`,
                  `La vitesse est le quotient de la distance parcourue par le temps de parcours.<br>L'unité officielle est le mètre par seconde ($\\text{m/s}$  ou  $\\text{m.s}^{-1}$) mais on utilise souvent le kilomètre par heure ($\\text{km/h}$  ou  $\\text{km.h}^{-1}$)`
                ) +
                ` de 340 m/s.<br>`;
              texte +=
                num_alpha(0) +
                ` ${quidam} voit un éclair dans le ciel et compte dans sa tête ${duree} secondes avant d'entendre le tonnerre.<br>`;
              texte += `Quelle est la distance à laquelle l'éclair est tombé ?<br>`;
              texte +=
                num_alpha(1) +
                ` L'éclair suivant tombe sur le paratonnerre situé sur le clocher de l'église du village voisin.<br>`;
              texte += `${quidam} sait que le clocher est situé à ${distance} m de sa position. Combien de temps se passe-t-il avant que ${quidam} n'entende le tonnerre ?`;
              texte_corr =
                num_alpha(0) +
                ` Calculons la distance à laquelle le premier éclair est tombé en utilisant la vitesse du son (on considère que la vitesse de la lumière est telle que l'éclair est visible instantanément) :<br>`;
              texte_corr += `$340\\text{ m/s}=\\dfrac{340\\text{ m}}{1\\text{ s}}=\\dfrac{${mise_en_evidence(
                duree
              )}\\times 340\\text{ m}}{${mise_en_evidence(
                duree
              )}\\times 1\\text{ s}}=\\dfrac{${tex_nombrec(
                duree * 340
              )}}{${duree}\\text{ s}}$<br>`;
              texte_corr += `La distance à laquelle l'éclair est tombé est donc de ${nombre_avec_espace(
                duree * 340
              )} m.<br>`;
              texte_corr +=
                num_alpha(1) +
                ` Avec les données de l'énoncé nous pouvons écrire :<br>`;
              texte_corr += `$\\dfrac{340\\text{ m}}{1\\text{ s}}=\\dfrac{${tex_nombre(
                distance
              )}\\text{ m}}{\\mathcal{T}\\text{ s}}$<br>`;
              texte_corr += `Soit grâce à l'égalité des produits en croix : $\\mathcal{T}\\text{ s}=${quatrieme_proportionnelle(
                `340 \\text{ m}`,
                `1 \\text{ s}`,
                distance + `\\text{ m}`,
                0
              )}=${tex_nombrec(arrondi(distance / 340))}\\text{ s}$<br>`;
              texte_corr += `${quidam} entendra le tonnerre ${tex_nombrec(
                arrondi(distance / 340)
              )} secondes après avoir vu l'éclair tomber sur le clocher.`;
              break;
            case 2: // Le coureur
              vitesse_moy = randint(vitesses[4][1] * 5, vitesses[4][2] * 5) / 5;
              distance = randint(5, 12);
              texte =
                `${quidam} vient de courir ${distance} kilomètres. Sa montre connectée a enregistré l'` +
                katex_Popup2(
                  numero_de_l_exercice + i,
                  type_aide,
                  `allure`,
                  `Définition : allure (grandeur physique)`,
                  `L'allure est le temps exprimé en h,min,s pour parcourir un kilomètre.<br>L'unité est alors h/km ou min/km`
                ) +
                `pour chaque kilomètre parcouru :`;
              let allures = [];
              for (let j = 0; j < distance; j++) {
                duree = Math.round(
                  1000 / (vitesse_moy * (1 + randint(-10, 10) * 0.01))
                );
                nbsecondes = duree % 60;
                nbminutes = (duree - nbsecondes) / 60;
                allures.push([nbminutes, nbsecondes]);
              }
              texte += "$\\def\\arraystretch{1.5}\\begin{array}{|c"; // On construit le tableau des allures
              texte += "|c";
              for (let j = 0; j < allures.length; j++) texte += "|c";
              texte += "}\\hline  \\text{kilomètre}";
              for (let j = 0; j < allures.length; j++)
                texte += "&" + tex_nombre(j + 1);
              texte +=
                "\\\\\\hline \\text{allure en minutes et secondes (par km)}";
              for (j = 0; j < allures.length; j++)
                texte +=
                  "&" +
                  allures[j][0] +
                  `\\text{ min }` +
                  allures[j][1] +
                  `\\text{ s}`;
              texte += "\\\\\\hline\\end{array}$<br>";
              texte +=
                num_alpha(0) +
                ` Calculer la durée totale de la course de ${quidam}.<br>`;
              texte +=
                num_alpha(1) +
                ` En déduire sa	` +
                katex_Popup2(
                  numero_de_l_exercice + i,
                  type_aide,
                  `vitesse`,
                  `Définition : Vitesse (grandeur physique)`,
                  `La vitesse est le quotient de la distance parcourue par le temps de parcours.<br>L'unité officielle est le mètre par seconde ($\\text{m/s}$  ou  $\\text{m.s}^{-1}$) mais on utilise souvent le kilomètre par heure ($\\text{km/h}$  ou  $\\text{km.h}^{-1}$)`
                ) +
                ` moyenne en km/h sur le trajet total.<br>`;
              texte +=
                num_alpha(2) +
                ` ${quidam} s'entraîne pour un semi-marathon (21,0975 km). En courant à la même vitesse, combien de temps durerait son semi-marathon ?`;
              texte_corr =
                num_alpha(0) +
                ` La durée totale de la course de ${quidam} est :<br>`;
              allures.push([0, 0]);
              duree = 0;

              for (let j = 0; j < distance; j++) {
                allures[distance][1] += allures[j][1];
                if (allures[distance][1] > 59) {
                  allures[distance][0] += 1;
                  allures[distance][1] = allures[distance][1] % 60;
                }
                allures[distance][0] += allures[j][0];
                if (allures[distance][0] > 59) {
                  duree++;
                  allures[distance][0] = allures[distance][0] % 60;
                }
              }
              for (let j = 0; j < distance - 1; j++) {
                texte_corr += `${allures[j][0]} min ${allures[j][1]} s + `;
              }
              texte_corr += `${allures[distance - 1][0]} min ${allures[distance - 1][1]
                } s = `;
              if (duree != 0) texte_corr += `${duree} h `;
              if (allures[distance][0] != 0)
                texte_corr += `${allures[distance][0]} min `;
              if (allures[distance][1] != 0)
                texte_corr += `${allures[distance][1]} s.`;
              texte_corr +=
                `<br>` +
                num_alpha(1) +
                ` ${quidam} a effectué ${distance} km en `;
              if (duree != 0) texte_corr += `${duree} h `;
              if (allures[distance][0] != 0)
                texte_corr += `${allures[distance][0]} min `;
              if (allures[distance][1] != 0)
                texte_corr += `${allures[distance][1]} s<br>Soit `;
              if (duree != 0) texte_corr += `${duree} h `;
              if (allures[distance][0] != 0)
                texte_corr += ` $\\dfrac{${allures[distance][0]}}{60}$ h `;
              if (allures[distance][1] != 0)
                texte_corr += ` $\\dfrac{${allures[distance][1]}}{${tex_nombre(
                  3600
                )}}$ h = `;
              texte_corr += `$\\dfrac{`;
              if (duree != 0)
                texte_corr += `${duree}\\times ${tex_nombre(3600)} + `;
              texte_corr += `${allures[distance][0]}\\times 60+${allures[distance][1]
                }}{${tex_nombre(3600)}}$ h = `;
              texte_corr += `$\\dfrac{`;
              if (duree != 0) {
                duree =
                  duree * 3600 +
                  allures[distance][0] * 60 +
                  allures[distance][1];
                texte_corr += `${duree}}`;
              } else {
                duree = allures[distance][0] * 60 + allures[distance][1];
                texte_corr += `${duree}}`;
              }
              texte_corr += `{${tex_nombre(3600)}}$ h.<br>`;
              texte_corr += `Sa vitesse en km/h est par conséquent :<br>$${distance} \\text{ km}\\div\\dfrac{${duree}}{${tex_nombre(
                3600
              )}}\\text{ h}=`;
              texte_corr += `${distance} \\text{ km}\\times\\dfrac{${tex_nombre(
                3600
              )}}{${duree}}\\text{ h}^{-1}=\\dfrac{${distance}\\times${tex_nombre(
                3600
              )}}{${duree}}\\text{km.h}^{-1}`;
              vitesse_moy = arrondi((distance * 3600) / duree);
              texte_corr += `\\approx${tex_nombrec(vitesse_moy)}$ km/h<br>`;
              texte_corr +=
                num_alpha(2) +
                ` Si elle court 21,0975 km à cette vitesse de ${tex_nombre(
                  vitesse_moy
                )} km/h, ${quidam} mettra :<br>`;
              duree = arrondi(21.0975 / vitesse_moy, 4);
              texte_corr += `$\\dfrac{${tex_nombre(
                21.0975
              )} \\text{ km}}{${tex_nombre(
                vitesse_moy
              )} \\text{ km.h}^{-1}}\\approx${tex_nombre(duree)}$ h soit `;
              nbheures = Math.floor(duree);
              duree = (duree - nbheures) * 60;
              nbminutes = Math.floor(duree);
              duree = Math.round((duree - nbminutes) * 60);
              texte_corr += ` environ ${nbheures} h ${nbminutes} min ${duree} s.`;
              break;
          }
          break;
        case 8: //problème de prix massique
          index1 = randint(0, 7);
          index2 = randint(0, 5, [index1]);
          index = randint(0, 5, [index1, index2]);
          masse = arrondi(randint(fruits[index1][2], fruits[index1][3]) / 10);
          masse2 = arrondi(randint(fruits[index2][2], fruits[index2][3]) / 10);
          masse3 = arrondi(randint(fruits[index][2], fruits[index][3]) / 10);
          prix1 = arrondi(masse * fruits[index1][1]);
          prix2 = arrondi(masse2 * fruits[index2][1]);
          prix3 = arrondi(masse3 * fruits[index][1]);
          quidam = prenomF();
          texte = `${quidam} se rends à l'épicerie de son quartier. Elle y achète ${tex_nombre(
            masse
          )} kg de ${fruits[index1][0]} à ${tex_prix(
            fruits[index1][1]
          )} €/kg et pour ${tex_prix(prix2)} € de ${fruits[index2][0]
            } à ${tex_prix(fruits[index2][1])} €/kg.<br>`;
          texte += `Enfin, elle achète ${tex_nombre(masse3)} kg de ${fruits[index][0]
            } pour ${tex_prix(prix3)} €.<br>`;
          texte +=
            num_alpha(0) +
            ` Combien lui coûtent les ${fruits[index1][0]} ?<br>`;
          texte +=
            num_alpha(1) +
            ` Quelle masse de ${fruits[index2][0]} a-t-elle achetée ?<br>`;
          texte +=
            num_alpha(2) +
            ` Quel est le prix au kilogramme des ${fruits[index][0]} ?`;
          texte_corr =
            num_alpha(0) +
            ` ${quidam} dépense pour les ${fruits[index1][0]} : $${tex_nombre(
              masse
            )}\\text{ kg} \\times ${tex_prix(
              fruits[index1][1]
            )}$ €$\\text{/kg} = ${tex_prix(prix1)}$ €.<br>`;
          texte_corr +=
            num_alpha(1) +
            ` La masse de ${fruits[index2][0]
            } qu'elle a achetée est : $${tex_prix(prix2)} $ €$ \\div ${tex_prix(
              fruits[index2][1]
            )}$ €$\\text{/kg} = ${tex_nombre(masse2)}\\text{ kg}$.<br>`;
          texte_corr +=
            num_alpha(2) +
            ` Enfin, ${quidam} a acheté des ${fruits[index][0]
            } au prix unitaire de : $${tex_prix(prix3)}$ € $\\div ${tex_nombre(
              masse3
            )}\\text{ kg} = ${tex_prix(fruits[index][1])}$ €$\\text{/kg}$.`;
          break;
        case 9: //problème de prix horaire
          index1 = randint(0, 3);
          index2 = randint(0, 4);
          nbheures = randint(locations[index1][1], locations[index1][2]);
          prix1 = locations[index1][1];
          prix2 = cours[index2][1] * randint(2, 6);
          quidam = prenomF();
          texte = `${quidam} a prévu de louer ${locations[index1][0]
            } pendant ${tex_nombre(
              nbheures
            )} heures. L'heure de location coûte ${tex_prix(prix1)} €.<br>`;
          texte += num_alpha(0) + ` Combien cette location va lui coûter ?<br>`;
          texte +=
            num_alpha(1) +
            ` ${quidam} a pris des leçons particulières ${cours[index2][0]
            }. En tout ce mois-ci elle a eu ${tex_nombrec(
              prix2 / cours[index2][1]
            )} heures de cours pour ${tex_prix(
              prix2
            )} €. Combien demande son professeur pour une heure de cours ?<br>`;
          texte_corr =
            num_alpha(0) +
            ` ${quidam} va dépenser pour sa location : $${tex_nombre(
              nbheures
            )}\\text{ h} \\times ${tex_prix(prix1)}$ €$\\text{/h} = ${tex_prix(
              nbheures * prix1
            )}$ €.<br>`;
          texte_corr +=
            num_alpha(1) +
            ` L'heure de cours ${cours[index2][0]} coûte : $${tex_prix(
              prix2
            )}$ € $ \\div ${tex_nombre(
              prix2 / cours[index2][1]
            )}\\text{ h} = ${tex_prix(cours[index2][1])}$ €$\\text{/h}$.<br>`;
          break;
        case 10: //problème de densité de population
          index1 = randint(0, 14);
          index2 = randint(0, 14, [index1]);
          let ville1 = villes[index1][0];
          let ville2 = villes[index2][0];
          texte =
            num_alpha(0) +
            ` En 2016, à ${villes[index1][0]} il y avait $${tex_nombre(
              villes[index1][1]
            )}$ habitants pour une superficie de $${tex_nombrec(
              villes[index1][2] * 100
            )}$ ha.<br> Calculer la densité de population en hab/km$^2$.<br>`;
          texte +=
            num_alpha(1) +
            ` La même année, la ` +
            katex_Popup2(
              numero_de_l_exercice + i * 3 + 1,
              type_aide,
              `densité de population`,
              `Définition : Densité de population`,
              `C’est le quotient du nombre d'habitants par la superficie en km$^2$.<br>L'unité de la densité de population est l'habitant par km$^2$ (hab/km$^2$).`
            ) +
            ` de ${villes[index2][0]} était de $${tex_nombrec(
              villes[index2][1] / villes[index2][2]
            )}$ hab/km$^2$ pour une superficie de $${tex_nombrec(
              villes[index2][2] * 100
            )}$ ha.<br> Calculer le nombre d'habitants de ${villes[index2][0]
            } à cette date.<br>`;
          texte_corr =
            num_alpha(0) +
            ` En 2016, la densité de population à ${villes[index1][0]
            } était de :<br> $\\dfrac{${tex_nombre(
              villes[index1][1]
            )}\\text{ hab}}{${tex_nombrec(
              villes[index1][2] * 100
            )}\\text{ ha}}=\\dfrac{${tex_nombre(
              villes[index1][1]
            )}\\text{ hab}}{${tex_nombre(
              villes[index1][2]
            )}\\text{ km}^2}=${tex_nombrec(
              villes[index1][1] / villes[index1][2]
            )}\\text{ hab/km}^{2}$.<br>`;
          texte_corr +=
            num_alpha(1) +
            ` A cette date, le nombre d'habitants de ${villes[index2][0]
            } était de :<br> $${tex_nombrec(
              villes[index2][1] / villes[index2][2]
            )}\\text{ hab/km}^2\\times ${tex_nombrec(
              villes[index2][2] * 100
            )}\\text{ ha}=${tex_nombrec(
              villes[index2][1] / villes[index2][2]
            )}\\text{ hab/km}^2\\times ${tex_nombrec(
              villes[index2][2]
            )}\\text{ km}^{2}=${tex_nombre(villes[index2][1])}\\text{ hab}$.`;
          break;
        case 11: //problème de masse volumique
          index1 = randint(0, 14);
          index2 = randint(0, 14, [index1]);
          let V1 = randint(50, 100);
          masse2 = randint(5, 30);
          masse = arrondi((materiaux[index1][1] * V1) / 1000000);
          let V2 = arrondi(masse2 / materiaux[index2][1], 7);
          texte =
            num_alpha(0) +
            ` La ` +
            katex_Popup2(
              numero_de_l_exercice + i * 3 + 1,
              type_aide,
              `masse volumique`,
              `Définition : Masse volumique (grandeur physique)`,
              `La masse volumique d'un élément est le quotient de la masse de cet élément par le volume qu'il occupe.<br>L'unité de la masse volumique dépend de la nature de l'élément et peut s'exprimer kg/m$^3$ pour les solides g/L pour les gaz par exemple.`
            ) +
            ` du ${materiaux[index1][0]} est de $${tex_nombre(
              materiaux[index1][1]
            )}\\text{ kg/m}^3$.<br>`;
          texte += `Quelle est la masse d'une pièce de ce métal de $${tex_nombre(
            V1
          )}\\text{ cm}^3$ ?<br>`;
          texte +=
            num_alpha(1) +
            ` Quel est le volume d'une pièce de ${materiaux[index2][0]} ayant une masse de `;
          texte += `$${tex_nombre(masse2)}\\text{ kg}$ (la masse volumique du ${materiaux[index2][0]
            } est de $${tex_nombre(materiaux[index2][1])}\\text{ kg/m}^3$)<br>`;
          texte_corr =
            num_alpha(0) +
            ` La masse de cette pièce de ${materiaux[index1][0]
            } est de :<br>$${tex_nombre(
              materiaux[index1][1]
            )}\\text{ km/m}^3\\times ${tex_nombre(
              V1
            )}\\text{ cm}^3=${tex_nombre(
              materiaux[index1][1]
            )}\\text{ km/m}^3\\times ${tex_nombrec(
              V1 / 1000000
            )}\\text{ m}^3=${tex_nombre(masse)}\\text{ kg}$.<br>`;
          texte_corr +=
            num_alpha(1) +
            ` Le volume de cette pièce de ${materiaux[index2][0]
            } est de :<br>$${tex_nombre(masse2)}\\text{ kg}\\div ${tex_nombre(
              materiaux[index2][1]
            )}\\text{ kg/m}^3\\approx${tex_nombre(
              V2
            )}\\text{ m}^3\\approx${tex_nombrec(
              V2 * 1000000
            )}\\text{ cm}^3$<br>`;
          break;
        case 12: //problème de concentration massique
          index1 = randint(0, 4);
          index2 = randint(0, 4, [index1]);
          let Volume1 = arrondi(randint(2, 15, [10]) / 10);
          let Volume2 = arrondi(randint(2, 15, [10]) / 10);
          if (solutes[index1][2] < 10)
            masse = arrondi(
              (randint(11, solutes[index1][2] * 10) * Volume1) / 10
            );
          else masse = arrondi(randint(2, solutes[index1][2]) * Volume1);
          let concentration2;
          if (solutes[index2][2] < 10)
            concentration2 = arrondi(randint(11, solutes[index2][2] * 10) / 10);
          //concentration en g/L soluté 2.
          else concentration2 = randint(2, solutes[index2][2]);

          texte =
            num_alpha(0) +
            ` On a dissout $${tex_nombre(masse)}\\text{ g}$ de ${solutes[index1][0]
            } dans $${tex_nombre(Volume1)}\\text{ litres}$ ${solutes[index1][1]
            }.<br>Calculer la concentration massique de cette solution.<br>`;
          texte +=
            num_alpha(1) +
            ` On dispose de $${tex_nombre(
              Volume2
            )}$ litres de solution aqueuse de ${solutes[index2][0]
            } à $${tex_nombre(
              concentration2
            )}\\text{ g/L}$.<br>Quelle masse de ${solutes[index2][0]
            } a été dissoute dans l'eau ?`;
          texte_corr =
            num_alpha(0) +
            ` La concentration en ${solutes[index1][0]} de cette solution aqueuse est de :<br>`;
          texte_corr += ` $\\dfrac{${tex_nombre(masse)}\\text{ g}}{${tex_nombre(
            Volume1
          )}\\text{ litres}}=${tex_nombrec(
            arrondi(masse / Volume1)
          )}\\text{ g/L}$<br>`;
          texte_corr +=
            num_alpha(1) +
            ` La masse de ${solutes[index2][0]} dissoute est de :<br>`;
          texte_corr += `$${tex_nombre(Volume2)}\\text{ L}\\times ${tex_nombre(
            concentration2
          )}\\text{ g/L}=${tex_nombre(
            arrondi(Volume2 * concentration2)
          )}\\text{ g}$`;
          break;

        case 13: //problème de débit
          index2 = randint(0, 6);
          duree = randint(2, 24);
          let vmax = rivieres[index2][3] * 3600;
          texte =
            `Le ` +
            katex_Popup2(
              numero_de_l_exercice + i,
              type_aide,
              `débit`,
              `Définition : Débit (grandeur physique)`,
              `Le débit est le quotient d'un volume d'eau écoulée dans une section de conduit par le temps d'écoulement.<br>L'unité officielle est le mètre cube par seconde ($\\text{m}^3/\\text{s}$  et dans certains cas on peut utiliser le litre par minute (L/min)`
            ) +
            ` annuel moyen ${rivieres[index2][6]}${rivieres[index2][0]
            } mesuré à ${rivieres[index2][1]} est de ${rivieres[index2][2]
            } m${exposant(3)}/s.<br>`;
          texte +=
            num_alpha(0) +
            ` Calculer le volume d'eau en m${exposant(
              3
            )} écoulé en ${duree} heures à ce débit.<br>`;
          texte +=
            num_alpha(1) +
            ` En ${rivieres[index2][4]} à ${rivieres[index2][1]}, ${rivieres[index2][5]
            }${rivieres[index2][0]} a débité ${nombre_avec_espace(
              vmax
            )} m${exposant(
              3
            )} en une heure. Quel a été alors le débit en m³/s ?`;
          texte_corr =
            num_alpha(0) +
            ` En ${duree} heures il s'écoule en moyenne dans ${rivieres[index2][5]}${rivieres[index2][0]} à ${rivieres[index2][1]} :<br>`;
          texte_corr += `$\\mathcal{V}=${duree}\\text{ h}\\times${rivieres[index2][2]
            }\\text{ m}^3\\text{/s}=${duree}\\times 3600\\text{ s}\\times${rivieres[index2][2]
            }\\text{ m}^3\\text{/s}=${tex_nombre(
              duree * 3600 * rivieres[index2][2]
            )}\\text{ m}^3$<br>`;
          texte_corr +=
            num_alpha(1) +
            ` En ${rivieres[index2][4]} lors de la crue historique ${rivieres[index2][6]}${rivieres[index2][0]} à ${rivieres[index2][1]} le débit maximal a été de :<br>`;
          texte_corr += `Débit =$${tex_nombre(
            vmax
          )}\\text{ m}^3\\text{/h}=\\dfrac{${tex_nombre(
            vmax
          )}\\text{ m}^3}{1\\text{ h}}=\\dfrac{${tex_nombre(
            vmax
          )}\\text{ m}^3}{${tex_nombre(3600)}\\text{ s}}=${tex_nombrec(
            vmax / 3600
          )}\\text{ m}^3\\text{/s}$<br>`;

          break;
        case 14: // problème de vitesse de téléchargement
          let unites = [`ko`, `Mo`, `Go`];
          index = randint(0, 1);
          if (index == 0) vitesse_moy = randint(200, 999);
          else vitesse_moy = randint(1, 20);
          quidam = prenom();
          nbminutes = randint(3, 10);
          nbsecondes = randint(2, 59);
          masse = arrondi(randint(15, 35) / 10);
          texte =
            num_alpha(0) +
            ` ${quidam} télécharge un fichier depuis un espace de stockage en ligne. Sa ` +
            katex_Popup2(
              numero_de_l_exercice + i,
              type_aide,
              `vitesse de téléchargement`,
              `Définition : Vitesse de téléchargement`,
              `La vitesse de téléchargement est le quotient de la quantité de données téléchargées (en ko,Mo ou Go) par la durée de téléchargement (en seconde).<br>L'unité de cette grandeur quotient est le ko/s (ou Mo/s)`
            ) +
            ` est de ${vitesse_moy} ${unites[index]}/s.<br>`;
          texte += `Le téléchargement dure ${nbminutes} minutes et ${nbsecondes} secondes. Quelle est la taille du fichier téléchargé en ${unites[index]} ?<br>`;
          texte +=
            num_alpha(1) +
            ` ${quidam} veut télécharger un fichier de ${tex_nombre(
              masse
            )} Go. Quelle sera la durée du téléchargement si sa vitesse de téléchargement est de ${vitesse_moy} ${unites[index]
            }/s ?<br>`;
          texte_corr =
            num_alpha(0) + ` La taille du fichier téléchargé est :<br>`;
          let taille_fichier = (nbminutes * 60 + nbsecondes) * vitesse_moy;
          texte_corr += `$(${nbminutes}\\times 60 +${nbsecondes})\\text{ s}\\times ${vitesse_moy} \\text{ ${unites[index]
            }/s} = ${nbminutes * 60 + nbsecondes
            }\\text{ s}\\times ${vitesse_moy} \\text{ ${unites[index]
            }/s} = ${taille_fichier} \\text{ ${unites[index]} }$`;
          if (taille_fichier > 1000)
            texte_corr += `$ =${tex_nombrec(taille_fichier / 1000)} \\text{ ${unites[index + 1]
              }}.$<br>`;
          texte_corr +=
            num_alpha(1) + ` La durée du téléchargement sera de :<br>`;
          if (index == 0) {
            texte_corr += `$${masse}\\times ${tex_nombrec(
              10 ** 6
            )} \\text{ ko} \\div ${vitesse_moy} \\text{ ${unites[index]}/s}$`;
            taille_fichier = masse * 10 ** 6;
          } else {
            texte_corr += `$${masse}\\times ${tex_nombrec(
              10 ** 3
            )} \\text{ Mo} \\div ${vitesse_moy} \\text{ ${unites[index]}/s}$`;
            taille_fichier = masse * 10 ** 3;
          }
          texte_corr += `$=\\dfrac{${taille_fichier}}{${vitesse_moy}}\\text{ s}`;
          nbheures = Math.floor(taille_fichier / vitesse_moy / 3600);
          nbminutes = Math.floor(
            (taille_fichier / vitesse_moy - 3600 * nbheures) / 60
          );
          nbsecondes = arrondi(
            taille_fichier / vitesse_moy - 3600 * nbheures - 60 * nbminutes,
            0
          );
          if (
            taille_fichier / vitesse_moy ==
            nbsecondes + 60 * nbheures + 3600 * nbheures
          )
            texte_corr += `=`;
          else texte_corr += `\\approx`;
          if (nbheures != 0) texte_corr += `${nbheures} \\text{ h }`;
          if (nbminutes != 0) texte_corr += `${nbminutes} \\text{ min }`;
          if (nbsecondes != 0) texte_corr += `${nbsecondes} \\text { s}`;
          texte_corr += `$`;

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
  //this.besoin_formulaire_case_a_cocher =['Choix des exercices aléatoire'];
  //this.besoin_formulaire2_numerique = ['Type d\'exercice', 14, '1 : Energie consommée\n 2 :  Volumes\n 3 : Quantité de mouvement & Energie cinétique\n 4 : Moment de force\n 5 : Trafic de voyageurs\n 6 : Puissance électrique\n 7 : Vitesses\n 8 : Prix massique\n 9 : Prix horaire\n 10 : Densité de population\n 11 : Masse volumique\n 12 : Concentration massique\n 13 : Débits\n 14 : Transfert de fichiers'];
  this.besoin_formulaire_texte = [
    "Choix des grandeurs",
    "Nombres séparés par des tirets\n 1 : Energie consommée\n 2 :  Volumes\n 3 : Quantité de mouvement & Energie cinétique\n 4 : Moment de force\n 5 : Trafic de voyageurs\n 6 : Puissance électrique\n 7 : Vitesses\n 8 : Prix massique\n 9 : Prix horaire\n 10 : Densité de population\n 11 : Masse volumique\n 12 : Concentration massique\n 13 : Débits\n 14 : Transfert de fichiers",
  ]; // Texte, tooltip
}
/**
 * type 1 : Un nombre est donné par le produit d'un décimal par une puissance de dix, il faut l'écrire en notation scientifique
 * type 2 : On donne la notation scientifique d'un nombre et on doit trouver l'exposant manquant de 10 dans le membre de gauche.
 * @Auteur Jean-Claude Lhote 
 * 4C32-1
 */
function Calculs_avec_puissances_de_dix() {
  "use strict"
  Exercice.call(this)
  this.sup = 1;
  this.sup2 = 1;
  this.titre = `Calcul avec les puissances de dix`;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.nb_questions = 5

  this.nouvelle_version = function (numero_de_l_exercice) {
    if (this.sup == 1) this.consigne = `Donner l\'écriture scientifique des nombres suivants.`;
    else this.consigne = `Compléter l'égalité des nombres suivants.`;
    let type_de_questions_disponibles;
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    if (this.sup2 == 1) type_de_questions_disponibles = [0, 0, 0, 1, 1];
    else if (this.sup2 == 2) type_de_questions_disponibles = [0, 1, 1, 2, 2];
    else type_de_questions_disponibles = [2, 2, 3, 3, 3];

    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
    for (let i = 0, texte, texte_corr, nombre, mantisse1, exp1, decalage, mantisse, exp, decimalstring, scientifiquestring, cpt = 0;
      i < this.nb_questions && cpt < 50;) {
      //        nombre=calcul(randint(1001,9999)/10**randint(1,6))
      //      mantisse=calcul(nombre/10**(Math.floor(Math.log10(nombre))))
      //        exp=Math.floor(Math.log10(nombre))
      switch (liste_type_de_questions[i]) {
        case 0:
          decalage = randint(-1, 1, 0)
          mantisse = randint(1, 9)
          exp = randint(1, 5)
          break
        case 1:
          decalage = randint(-2, 2, 0)
          mantisse = calcul(randint(11, 99) / 10)
          exp = randint(1, 5)
          break;
        case 2:
          decalage = randint(-3, 3, 0)
          if (randint(0, 1) == 1) mantisse = calcul(randint(111, 999) / 100)
          else mantisse = calcul((randint(1, 9) * 100 + randint(1, 9)) / 100)
          exp = randint(1, 7) * choice([-1, 1])
          break;
        case 3:
          decalage = randint(-4, 4, 0)
          if (randint(0, 1) == 1) mantisse = calcul((randint(1, 9) * 1000 + randint(1, 19) * 5) / 1000)
          else mantisse = calcul(randint(1111, 9999) / 1000)
          exp = randint(3, 7) * choice([-1, 1])
          break;
      }
      nombre = calcul(mantisse * 10 ** exp)
      mantisse1 = calcul(mantisse * 10 ** decalage)
      exp1 = exp - decalage

      decimalstring = `${tex_nombrec(mantisse1)} \\times 10^{${exp1}}`
      scientifiquestring = `${tex_nombre(mantisse)} \\times 10^{${exp}}`
      if (this.sup == 1) {
        texte = `$${decimalstring}$`
        texte_corr = `$${mise_en_evidence(`${tex_nombrec(mantisse1)}`, 'blue')}\\times ${mise_en_evidence(`10^{${exp1}}`)} = ${mise_en_evidence(`${tex_nombre(mantisse)}\\times 10^{${decalage}}`, 'blue')}\\times  ${mise_en_evidence(`10^{${exp1}}`)} = ${scientifiquestring}$`
      }
      else {
        texte_corr = `$${mise_en_evidence(tex_nombre(mantisse1), 'blue')}\\times  ${mise_en_evidence(`10^{${exp1}}`)}=${mise_en_evidence(tex_nombre(mantisse) + `\\times 10^{${decalage}}`, 'blue')}\\times  ${mise_en_evidence(`10^{${exp1}}`)} =${scientifiquestring}$`
        texte = `$${tex_nombre(mantisse1)}\\times 10^{${mise_en_evidence(`....`)}}=${scientifiquestring}$`

      }
      if (this.liste_questions.indexOf(texte) == -1) {
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = ["Type d\'exercices", 2, "1 : Traduire en notation scientifique\n2 : Exercice à trou"];
  this.besoin_formulaire2_numerique = ["Niveaux de difficulté", 3, "1 : Facile\n2 : Moyen\n3 : Difficile"];
}

/**
 * Ecrire un nombre décimal en notation scientifique et inversement
 * @Auteur Jean-Claude Lhote
 * 4C32
 */

function Notation_scientifique() {
  "use strict"
  Exercice.call(this)
  this.sup = 1;
  this.sup2 = 1;
  this.titre = `Notation scientifique`;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.nb_questions = 5

  this.nouvelle_version = function (numero_de_l_exercice) {
    if (this.sup == 1) this.consigne = `Donner l\'écriture scientifique des nombres suivants.`;
    else this.consigne = `Donner l\'écriture décimale des nombres suivants.`;
    let type_de_questions_disponibles;
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    if (this.sup2 == 1) type_de_questions_disponibles = [0, 0, 0, 1, 1];
    else if (this.sup2 == 2) type_de_questions_disponibles = [0, 1, 1, 2, 2];
    else type_de_questions_disponibles = [2, 2, 3, 3, 3];

    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
    for (let i = 0, texte, texte_corr, mantisse, exp, decimalstring, scientifiquestring, cpt = 0;
      i < this.nb_questions && cpt < 50;) {
      switch (liste_type_de_questions[i]) {
        case 0:
          mantisse = randint(1, 9)
          exp = randint(1, 5)
          break
        case 1:
          mantisse = calcul(randint(11, 99) / 10)
          exp = randint(1, 5)
          break;
        case 2:
          if (randint(0, 1) == 1) mantisse = calcul(randint(111, 999) / 100)
          else mantisse = calcul((randint(1, 9) * 100 + randint(1, 9)) / 100)
          exp = randint(1, 7) * choice([-1, 1])
          break;
        case 3:
          if (randint(0, 1) == 1) mantisse = calcul((randint(1, 9) * 1000 + randint(1, 19) * 5) / 1000)
          else mantisse = calcul(randint(1111, 9999) / 1000)
          exp = randint(3, 7) * choice([-1, 1])
          break;
      }
      decimalstring = tex_nombrec(mantisse * 10 ** exp)
      scientifiquestring = `${tex_nombre(mantisse)}\\times 10^{${exp}}`
      if (this.sup == 1) {
        texte = `$${decimalstring}$`
        texte_corr = `$${decimalstring} = ${scientifiquestring}$`
      }
      else {
        texte_corr = `$${scientifiquestring} = ${decimalstring}$`
        texte = `$${scientifiquestring}$`

      }
      if (this.liste_questions.indexOf(texte) == -1) {
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = ["Type d\'exercices", 2, "1 : Traduire en notation scientifique\n2 : Traduire en notation décimale"];
  this.besoin_formulaire2_numerique = ["Niveaux de difficulté", 3, "1 : Facile\n2 : Moyen\n3 : Difficile"];
}
/**
 * À partir d'un triangle rectangle, il faut donner l'égalité de Pythagore ou compléter une égalité.
 * @Auteur Rémi Angot
 * SVG Benjamin Angot
 */
// function Egalite_Pythagore() { // Remplacée par Pythagore2D
//   Exercice.call(this); // Héritage de la classe Exercice()
//   this.titre = "Égalité de Pythagore";
//   this.nb_questions = 4;
//   this.nb_cols = 2;
//   this.nb_cols_corr = 2;
//   this.pas_de_version_LaTeX = true;
//   this.sup = 1;
//   this.sup2 = false;

//   this.nouvelle_version = function (numero_de_l_exercice) {
//     // this.bouton_aide = modal_texte_court(numero_de_l_exercice,"Ajouter 9 revient à ajouter 10 et à soustraire 1.")
//     this.liste_questions = []; // Liste de questions
//     this.liste_corrections = []; // Liste de questions corrigées
//     let liste_type_de_questions = combinaison_listes(
//       range1(6),
//       this.nb_questions
//     );
//     if (this.sup == 1) {
//       this.consigne = "Pour chaque triangle, donner l'égalité de Pythagore.";
//     } else {
//       this.consigne = "Compléter.";
//     }

//     for (
//       let i = 0, texte, texte_corr, a, b, cpt = 0;
//       i < this.nb_questions && cpt < 50;

//     ) {
//       const triangle = new Triangles();

//       let nom = triangle.getNom();
//       let A = nom[1];
//       let B = nom[2];
//       let C = nom[3];
//       let texte_corr1 = `${nom} est rectangle en ${A}, donc d'après le théorème de Pythagore, on a : $${B}${C}^2=${A}${C}^2+${A}${B}^2$.`;
//       let texte_corr1AB = `${nom} est rectangle en ${A}, donc d'après le théorème de Pythagore, on a : $${B}${C}^2=${A}${C}^2+${A}${B}^2$ d'où $${A}${B}^2=${B}${C}^2-${A}${C}^2$.`;
//       let texte_corr1AC = `${nom} est rectangle en ${A}, donc d'après le théorème de Pythagore, on a : $${B}${C}^2=${A}${C}^2+${A}${B}^2$ d'où $${A}${C}^2=${B}${C}^2-${A}${B}^2$.`;
//       let texte_corr2 = `${nom} est rectangle en ${B}, donc d'après le théorème de Pythagore, on a : $${A}${C}^2=${B}${C}^2+${B}${A}^2$.`;
//       let texte_corr2AB = `${nom} est rectangle en ${B}, donc d'après le théorème de Pythagore, on a : $${A}${C}^2=${B}${C}^2+${A}${B}^2$ d'où $${A}${B}^2=${A}${C}^2-${B}${C}^2$.`;
//       let texte_corr2BC = `${nom} est rectangle en ${B}, donc d'après le théorème de Pythagore, on a : $${A}${C}^2=${B}${C}^2+${A}${B}^2$ d'où $${B}${C}^2=${A}${C}^2-${A}${B}^2$.`;
//       let texte_corr3 = `${nom} est rectangle en ${C}, donc d'après le théorème de Pythagore, on a : $${A}${B}^2=${C}${A}^2+${C}${B}^2$.`;
//       let texte_corr3BC = `${nom} est rectangle en ${C}, donc d'après le théorème de Pythagore, on a : $${A}${B}^2=${A}${C}^2+${B}${C}^2$ d'où $${B}${C}^2=${A}${B}^2-${A}${C}^2$.`;
//       let texte_corr3AC = `${nom} est rectangle en ${C}, donc d'après le théorème de Pythagore, on a : $${A}${B}^2=${A}${C}^2+${B}${C}^2$ d'où $${A}${C}^2=${A}${B}^2-${B}${C}^2$.`;

//       switch (liste_type_de_questions[i]) {
//         case 1:
//           texte = `<div><svg width="400" height="200" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
// 			  <polygon points="40,40 240,40 40,140 " fill="none" stroke="black" />
// 			  <polygon points="40,40 50,40 50,50 40,50" fill="none" stroke="black" />
// 			  <text x="30" y="40" text-anchor="middle" alignment-baseline="central">${A}</text> 
// 			  <text x="250" y="40" text-anchor="middle" alignment-baseline="central">${B}</text>
// 			  <text x="30" y="140" text-anchor="middle" alignment-baseline="central">${C}</text>
// 			</svg></div>`;
//           if (this.sup2) {
//             texte = `${nom} est rectangle en $${A}$.<br>`;
//           }
//           if (this.sup == 1) {
//             texte_corr = texte_corr1;
//           } else {
//             let cas = randint(1, 3);
//             if (cas == 1) {
//               texte += `$${A}${B}^2=\\ldots$`;
//               texte_corr = texte_corr1AB;
//             }
//             if (cas == 2) {
//               texte += `$${A}${C}^2=\\ldots$`;
//               texte_corr = texte_corr1AC;
//             }
//             if (cas == 3) {
//               texte += `$${B}${C}^2=\\ldots$`;
//               texte_corr = texte_corr1;
//             }
//           }
//           break;
//         case 2:
//           texte = `<div><svg width="400" height="200" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
// 			  <polygon points="40,40 240,40 240,140 " fill="none" stroke="black" />
// 			  <polygon points="240,40 230,40 230,50 240,50" fill="none" stroke="black" />
// 			  <text x="30" y="40" text-anchor="middle" alignment-baseline="central">${A}</text> 
// 			  <text x="250" y="40" text-anchor="middle" alignment-baseline="central">${B}</text>
// 			  <text x="250" y="140" text-anchor="middle" alignment-baseline="central">${C}</text>
// 			</svg></div>`;
//           if (this.sup2) {
//             texte = `${nom} est rectangle en $${B}$.<br>`;
//           }
//           if (this.sup == 1) {
//             texte_corr = texte_corr2;
//           } else {
//             let cas = randint(1, 3);
//             if (cas == 1) {
//               texte += `$${A}${B}^2=\\ldots$`;
//               texte_corr = texte_corr2AB;
//             }
//             if (cas == 2) {
//               texte += `$${A}${C}^2=\\ldots$`;
//               texte_corr = texte_corr2;
//             }
//             if (cas == 3) {
//               texte += `$${B}${C}^2=\\ldots$`;
//               texte_corr = texte_corr2BC;
//             }
//           }
//           break;
//         case 3:
//           texte = `<div><svg width="200" height"300" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
// 			  <polygon points="40,40 140,40 40,240" fill="none" stroke="black" />
// 			  <polygon points="40,40 50,40 50,50 40,50" fill="none" stroke="black" />
// 			  <text x="30" y="240" text-anchor="middle" alignment-baseline="central">${A}</text> 
// 			  <text x="150" y="40" text-anchor="middle" alignment-baseline="central">${B}</text>
// 			  <text x="30" y="40" text-anchor="middle" alignment-baseline="central">${C}</text>
// 			</svg></div>`;
//           if (this.sup2) {
//             texte = `${nom} est rectangle en $${C}$.<br>`;
//           }
//           if (this.sup == 1) {
//             texte_corr = texte_corr3;
//           } else {
//             let cas = randint(1, 3);
//             if (cas == 1) {
//               texte += `$${A}${B}^2=\\ldots$`;
//               texte_corr = texte_corr3;
//             }
//             if (cas == 2) {
//               texte += `$${A}${C}^2=\\ldots$`;
//               texte_corr = texte_corr3AC;
//             }
//             if (cas == 3) {
//               texte += `$${B}${C}^2=\\ldots$`;
//               texte_corr = texte_corr3BC;
//             }
//           }
//           break;
//         case 4:
//           texte = `<div><svg width="200" height"300" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
// 			  <polygon points="40,40 140,40 140,240" fill="none" stroke="black" />
// 			  <polygon points="140,40 140,50 130,50 130,40" fill="none" stroke="black" />
// 			  <text x="30" y="40" text-anchor="middle" alignment-baseline="central">${A}</text> 
// 			  <text x="150" y="40" text-anchor="middle" alignment-baseline="central">${B}</text>
// 			  <text x="150" y="240" text-anchor="middle" alignment-baseline="central">${C}</text>
// 			</svg></div>`;
//           if (this.sup2) {
//             texte = `${nom} est rectangle en $${B}$.<br>`;
//           }
//           if (this.sup == 1) {
//             texte_corr = texte_corr2;
//           } else {
//             let cas = randint(1, 3);
//             if (cas == 1) {
//               texte += `$${A}${B}^2=\\ldots$`;
//               texte_corr = texte_corr2AB;
//             }
//             if (cas == 2) {
//               texte += `$${A}${C}^2=\\ldots$`;
//               texte_corr = texte_corr2;
//             }
//             if (cas == 3) {
//               texte += `$${B}${C}^2=\\ldots$`;
//               texte_corr = texte_corr2BC;
//             }
//           }
//           break;
//         case 5:
//           texte = `<div><svg width="400" height"200" viewBox="-40 -40 400 200" xmlns="http://www.w3.org/2000/svg">
// 			  <polygon points="0,0 200,0 40,80.6" fill="none" stroke="black" />
// 			  <polygon points="40,80.6 50,76.2 46,67.2 36,71.8" fill="none" stroke="black" />
// 			  <text x="40" y="90.6" text-anchor="middle" alignment-baseline="central">${A}</text> 
// 			  <text x="210" y="0" text-anchor="middle" alignment-baseline="central">${B}</text>
// 			  <text x="-10" y="0" text-anchor="middle" alignment-baseline="central">${C}</text>
// 			</svg></div>`;
//           if (this.sup2) {
//             texte = `${nom} est rectangle en $${A}$.<br>`;
//           }
//           if (this.sup == 1) {
//             texte_corr = texte_corr1;
//           } else {
//             let cas = randint(1, 3);
//             if (cas == 1) {
//               texte += `$${A}${B}^2=\\ldots$`;
//               texte_corr = texte_corr1AB;
//             }
//             if (cas == 2) {
//               texte += `$${A}${C}^2=\\ldots$`;
//               texte_corr = texte_corr1AC;
//             }
//             if (cas == 3) {
//               texte += `$${B}${C}^2=\\ldots$`;
//               texte_corr = texte_corr1;
//             }
//           }
//           break;
//         case 6:
//           texte = `<div><svg width="400" height"200" viewBox="-40 -140 400 200"  xmlns="http://www.w3.org/2000/svg">
// 			  <polygon points="0,0 200,0 40,-80.6" fill="none" stroke="black" />
// 			  <polygon points="40,-80.6 50,-76.2 46,-67.2 36,-71.8" fill="none" stroke="black" />
// 			  <text x="40" y="-90.6" text-anchor="middle" alignment-baseline="central">${C}</text> 
// 			  <text x="210" y="0" text-anchor="middle" alignment-baseline="central">${B}</text>
// 			  <text x="-10" y="0" text-anchor="middle" alignment-baseline="central">${A}</text>
// 			</svg></div>`;
//           if (this.sup2) {
//             texte = `${nom} est rectangle en $${C}$.<br>`;
//           }
//           if (this.sup == 1) {
//             texte_corr = texte_corr1;
//           } else {
//             let cas = randint(1, 3);
//             if (cas == 1) {
//               texte += `$${A}${B}^2=\\ldots$`;
//               texte_corr = texte_corr1AB;
//             }
//             if (cas == 2) {
//               texte += `$${A}${C}^2=\\ldots$`;
//               texte_corr = texte_corr1AC;
//             }
//             if (cas == 3) {
//               texte += `$${B}${C}^2=\\ldots$`;
//               texte_corr = texte_corr1;
//             }
//           }
//       }
//       if (this.liste_questions.indexOf(texte) == -1) {
//         // Si la question n'a jamais été posée, on en créé une autre
//         this.liste_questions.push(texte);
//         this.liste_corrections.push(texte_corr);
//         i++;
//       }
//       cpt++;
//     }
//     liste_de_question_to_contenu(this);
//   };
//   this.besoin_formulaire_numerique = [
//     "Type de questions",
//     2,
//     "1 : Donner l'égalité\n2 : Compléter une égalité avec une addition ou une soustraction",
//   ];
//   this.besoin_formulaire2_case_a_cocher = ["Sans figures"];
// }

/**
 * Signe d'un produit ou d'on quotient de relatifs
 * Plusieurs niveaux 2, 3 ou 4 factieurs, un quotient de 2 nombres, 1  nombre sur un produit de deux nombres, un prooduit de 2 nombres sur un nombre, un quotient de produit de 2 nombres
 * 4C10-0 exercice parent de 4C10-1 et 4C10-2
 * 4C10-0 contient tous les cas
 * Dans ces exercices je me servais de this.beta pour faire passer l'exo de beta.html à mathalea.html
 * this.beta pouvait prendre la valeur 'beta' ou '', tous les autres this.beta sont devenus des this.debug

 * @author Sébastien Lozano
 */

function Signe_produit_quotient_relatifs() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = 1;
  if (this.exo == this.beta + "4C10-1") {
    this.sup = 4;
    this.titre = `Signe d'un produit de nombres relatifs`;
  } else if (this.exo == this.beta + "4C10-2") {
    this.sup = 5;
    this.titre = `Signe d'un quotient de nombres relatifs`;
  } else {
    this.titre = `Signe d'un produit ou d'un quotient de nombres relatifs`;
  }

  this.consigne = `Donner le signe des expressions numériques.`;

  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.nb_questions_modifiable = false;

  let type_de_questions_disponibles;

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.sup = Number(this.sup); // attention le formulaire renvoie un string, on a besoin d'un number pour le switch !

    if (this.exo == this.beta + "4C10-1") {
      // signe d'un produit
      switch (this.sup) {
        case 1: // 2 facteurs
          type_de_questions_disponibles = [1, 1, 1];
          //this.nb_questions = type_de_questions_disponibles.length;
          this.nb_questions = 3;
          break;
        case 2: // 3 facteurs
          type_de_questions_disponibles = [2, 2, 2];
          //this.nb_questions = type_de_questions_disponibles.length;
          this.nb_questions = 3;
          break;
        case 3: // 4 facteurs
          type_de_questions_disponibles = [3, 3, 3];
          //this.nb_questions = type_de_questions_disponibles.length;
          this.nb_questions = 3;
          break;
        case 4: // Mélange
          type_de_questions_disponibles = [1, 2, 3];
          this.nb_questions = type_de_questions_disponibles.length;
          break;
      }
    } else if (this.exo == this.beta + "4C10-2") {
      // signe d'un quotient
      switch (this.sup) {
        case 1: // quotient de 2 nombres
          type_de_questions_disponibles = [4, 4, 4];
          //this.nb_questions = type_de_questions_disponibles.length;
          this.nb_questions = 3;
          break;
        case 2: // quotient d'1 nombre sur un produit de 2 nombres
          type_de_questions_disponibles = [5, 5, 5];
          //this.nb_questions = type_de_questions_disponibles.length;
          this.nb_questions = 3;
          break;
        case 3: // quotient d'1 produit de 2 nombres sur 1 nombre
          type_de_questions_disponibles = [6, 6, 6];
          //this.nb_questions = type_de_questions_disponibles.length;
          this.nb_questions = 3;
          break;
        case 4: // quotient de 2 produits de 2 nombres
          type_de_questions_disponibles = [7, 7, 7];
          //this.nb_questions = type_de_questions_disponibles.length;
          this.nb_questions = 3;
          break;
        case 5: // Mélange
          type_de_questions_disponibles = [4, 5, 6, 7];
          this.nb_questions = type_de_questions_disponibles.length;
          break;
      }
    } else {
      // signe d'un produit et/ou d'un quotient
      type_de_questions_disponibles = [1, 2, 3, 4, 5, 6, 7];
      this.nb_questions = type_de_questions_disponibles.length;
    }

    //let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let liste_type_de_questions = type_de_questions_disponibles; // Tous les types de questions sont posées --> à remettre comme ci dessus

    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    for (
      let i = 0, texte, texte_corr, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      // on ne choisit que des nombres compris entre 1 et 20
      let nb_max = 20;
      // Le tableau des relatifs necessaires, il m'en faut max 4 !
      let num = new Relatif(
        randint(-1, 1, [0]) * randint(1, nb_max),
        randint(-1, 1, [0]) * randint(1, nb_max),
        randint(-1, 1, [0]) * randint(1, nb_max),
        randint(-1, 1, [0]) * randint(1, nb_max)
      );

      switch (liste_type_de_questions[i]) {
        case 1: // 2 facteurs
          texte = `$ ${ecriture_nombre_relatif(
            num.relatifs[0]
          )} \\times ${ecriture_nombre_relatif(num.relatifs[1])} $`;
          texte_corr = `$ ${ecriture_nombre_relatif(num.relatifs[0])} $ est ${num.getSigneString()[0]
            } et $ ${ecriture_nombre_relatif(num.relatifs[1])} $ est ${num.getSigneString()[1]
            }.`;
          texte_corr += `<br> ${num.setRegleSigneProduit(
            num.relatifs[0],
            num.relatifs[1]
          )}`;
          texte_corr += `<br>Donc $ ${ecriture_nombre_relatif(
            num.relatifs[0]
          )} \\times ${ecriture_nombre_relatif(
            num.relatifs[1]
          )} $ est ${texte_en_couleur_et_gras(
            num.getSigneProduitString(num.relatifs[0], num.relatifs[1])
          )}.`;
          break;
        case 2: // 3 facteurs
          texte = `$ ${ecriture_nombre_relatif(
            num.relatifs[0]
          )} \\times ${ecriture_nombre_relatif(
            num.relatifs[1]
          )} \\times ${ecriture_nombre_relatif(num.relatifs[2])} $`;
          texte_corr = `$ ${ecriture_nombre_relatif(num.relatifs[0])} $ est ${num.getSigneString()[0]
            }, $ ${ecriture_nombre_relatif(num.relatifs[1])} $ est ${num.getSigneString()[1]
            }`;
          texte_corr += ` et $ ${ecriture_nombre_relatif(
            num.relatifs[2]
          )} $ est ${num.getSigneString()[2]}.`;
          texte_corr += `<br> ${num.setRegleSigneProduit(
            num.relatifs[0],
            num.relatifs[1],
            num.relatifs[2]
          )}`;
          texte_corr += `<br>Donc $ ${ecriture_nombre_relatif(
            num.relatifs[0]
          )} \\times ${ecriture_nombre_relatif(
            num.relatifs[1]
          )} \\times ${ecriture_nombre_relatif(
            num.relatifs[2]
          )} $ est ${texte_en_couleur_et_gras(
            num.getSigneProduitString(
              num.relatifs[0],
              num.relatifs[1],
              num.relatifs[2]
            )
          )}.`;
          break;
        case 3: // 4 facteurs
          texte = `$ ${ecriture_nombre_relatif(
            num.relatifs[0]
          )} \\times ${ecriture_nombre_relatif(
            num.relatifs[1]
          )} \\times ${ecriture_nombre_relatif(
            num.relatifs[2]
          )} \\times ${ecriture_nombre_relatif(num.relatifs[3])} $`;
          texte_corr = `$ ${ecriture_nombre_relatif(num.relatifs[0])} $ est ${num.getSigneString()[0]
            }, $ ${ecriture_nombre_relatif(num.relatifs[1])} $ est ${num.getSigneString()[1]
            }, `;
          texte_corr += `$ ${ecriture_nombre_relatif(num.relatifs[2])} $ est ${num.getSigneString()[2]
            } et $ ${ecriture_nombre_relatif(num.relatifs[3])} $ est ${num.getSigneString()[3]
            }.`;
          texte_corr += `<br> ${num.setRegleSigneProduit(
            num.relatifs[0],
            num.relatifs[1],
            num.relatifs[2],
            num.relatifs[3]
          )}`;
          texte_corr += `<br>Donc $ ${ecriture_nombre_relatif(
            num.relatifs[0]
          )} \\times ${ecriture_nombre_relatif(
            num.relatifs[1]
          )} \\times ${ecriture_nombre_relatif(
            num.relatifs[2]
          )} \\times ${ecriture_nombre_relatif(
            num.relatifs[3]
          )} $ est ${texte_en_couleur_et_gras(
            num.getSigneProduitString(
              num.relatifs[0],
              num.relatifs[1],
              num.relatifs[2],
              num.relatifs[3]
            )
          )}.`;
          break;
        case 4: // quotient de 2 nombres
          texte = `$ \\dfrac{${ecriture_nombre_relatif(
            num.relatifs[0]
          )}}{${ecriture_nombre_relatif(num.relatifs[1])}} $`;
          texte_corr = `$ ${ecriture_nombre_relatif(num.relatifs[0])} $ est ${num.getSigneString()[0]
            } et $ ${ecriture_nombre_relatif(num.relatifs[1])} $ est ${num.getSigneString()[1]
            }.`;
          texte_corr += `<br> ${num.setRegleSigneQuotient(
            num.relatifs[0],
            num.relatifs[1]
          )}`;
          texte_corr += `<br>Donc $ \\dfrac{${ecriture_nombre_relatif(
            num.relatifs[0]
          )}}{${ecriture_nombre_relatif(
            num.relatifs[1]
          )}} $ est ${texte_en_couleur_et_gras(
            num.getSigneProduitString(num.relatifs[0], num.relatifs[1])
          )}.`;
          break;
        case 5: // quotient d'1 nombre sur un produit de 2 nombres
          texte = `$ \\dfrac{${ecriture_nombre_relatif(
            num.relatifs[0]
          )}}{${ecriture_nombre_relatif(
            num.relatifs[1]
          )} \\times ${ecriture_nombre_relatif(num.relatifs[2])}} $`;
          texte_corr = `$ ${ecriture_nombre_relatif(num.relatifs[0])} $ est ${num.getSigneString()[0]
            }, $ ${ecriture_nombre_relatif(num.relatifs[1])} $ est ${num.getSigneString()[1]
            }`;
          texte_corr += ` et $ ${ecriture_nombre_relatif(
            num.relatifs[2]
          )} $ est ${num.getSigneString()[2]}.`;
          texte_corr += `<br> ${num.setRegleSigneQuotient(
            num.relatifs[0],
            num.relatifs[1],
            num.relatifs[2]
          )}`;
          texte_corr += `<br>Donc $ \\dfrac{${ecriture_nombre_relatif(
            num.relatifs[0]
          )}}{${ecriture_nombre_relatif(
            num.relatifs[1]
          )} \\times ${ecriture_nombre_relatif(
            num.relatifs[2]
          )}} $ est ${texte_en_couleur_et_gras(
            num.getSigneProduitString(
              num.relatifs[0],
              num.relatifs[1],
              num.relatifs[2]
            )
          )}.`;
          break;
        case 6: // quotient d'1 produit de 2 nombres sur 1 nombre
          texte = `$ \\dfrac{${ecriture_nombre_relatif(
            num.relatifs[0]
          )} \\times ${ecriture_nombre_relatif(
            num.relatifs[1]
          )}}{${ecriture_nombre_relatif(num.relatifs[2])}} $`;
          texte_corr = `$ ${ecriture_nombre_relatif(num.relatifs[0])} $ est ${num.getSigneString()[0]
            }, $ ${ecriture_nombre_relatif(num.relatifs[1])} $ est ${num.getSigneString()[1]
            }`;
          texte_corr += ` et $ ${ecriture_nombre_relatif(
            num.relatifs[2]
          )} $ est ${num.getSigneString()[2]}.`;
          texte_corr += `<br> ${num.setRegleSigneQuotient(
            num.relatifs[0],
            num.relatifs[1],
            num.relatifs[2]
          )}`;
          texte_corr += `<br>Donc $ \\dfrac{${ecriture_nombre_relatif(
            num.relatifs[0]
          )} \\times ${ecriture_nombre_relatif(
            num.relatifs[1]
          )}}{${ecriture_nombre_relatif(
            num.relatifs[2]
          )}} $ est ${texte_en_couleur_et_gras(
            num.getSigneProduitString(
              num.relatifs[0],
              num.relatifs[1],
              num.relatifs[2]
            )
          )}.`;
          break;
        case 7: // quotient de 2 produits de 2 nombres
          texte = `$ \\dfrac{${ecriture_nombre_relatif(
            num.relatifs[0]
          )} \\times ${ecriture_nombre_relatif(
            num.relatifs[1]
          )}}{${ecriture_nombre_relatif(
            num.relatifs[2]
          )} \\times ${ecriture_nombre_relatif(num.relatifs[3])}} $`;
          texte_corr = `$ ${ecriture_nombre_relatif(num.relatifs[0])} $ est ${num.getSigneString()[0]
            }, $ ${ecriture_nombre_relatif(num.relatifs[1])} $ est ${num.getSigneString()[1]
            }, `;
          texte_corr += `$ ${ecriture_nombre_relatif(num.relatifs[2])} $ est ${num.getSigneString()[2]
            } et $ ${ecriture_nombre_relatif(num.relatifs[3])} $ est ${num.getSigneString()[3]
            }.`;
          texte_corr += `<br> ${num.setRegleSigneQuotient(
            num.relatifs[0],
            num.relatifs[1],
            num.relatifs[2],
            num.relatifs[3]
          )}`;
          texte_corr += `<br>Donc $ \\dfrac{${ecriture_nombre_relatif(
            num.relatifs[0]
          )} \\times ${ecriture_nombre_relatif(
            num.relatifs[1]
          )}}{${ecriture_nombre_relatif(
            num.relatifs[2]
          )} \\times ${ecriture_nombre_relatif(
            num.relatifs[3]
          )}} $ est ${texte_en_couleur_et_gras(
            num.getSigneProduitString(
              num.relatifs[0],
              num.relatifs[1],
              num.relatifs[2],
              num.relatifs[3]
            )
          )}.`;
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
  if (this.exo == this.beta + "4C10-1") {
    this.besoin_formulaire_numerique = [
      "Niveau de difficulté",
      4,
      "1 : deux facteurs\n2 : trois facteurs\n3 : quatre facteurs\n4 : Mélange",
    ];
  } else if (this.exo == this.beta + "4C10-2") {
    this.besoin_formulaire_numerique = [
      "Niveau de difficulté",
      5,
      "1 : quotient de deux nombres\n2 : quotient d'un nombre sur un produit de deux facteurs\n3 : quotient d'un produit de deux factueurs sur un nombre\n4 : Quotient de deux produits de deux facteurs\n5 : Mélange",
    ];
  } else {
    //this.besoin_formulaire_numerique = ['Niveau de difficulté',2,"1 : sans conversions de longueurs\n2 : avec conversions de longueurs"];
  }
}

/**
 * Signe du produit de relatifs
 * 4C10-1 fils de 4C10-0
 * @author Sébastien Lozano
 */
function Signe_produit_relatifs() {
  this.beta = ``;// ici this.beta peut prendre la valeur 'beta' ou '', tous les autres this.beta sont devenus des this.debug
  this.exo = this.beta + `4C10-1`;
  Signe_produit_quotient_relatifs.call(this);
}

/**
 * Signe du produit de relatifs
 * 4C10-2 fils de 4C10-0
 * @author Sébastien Lozano
 */
function Signe_quotient_relatifs() {
  this.beta = ``;// ici this.beta peut prendre la valeur 'beta' ou '', tous les autres this.beta sont devenus des this.debug
  this.exo = this.beta + `4C10-2`;
  Signe_produit_quotient_relatifs.call(this);
}

/**
 * Encadrer par des puissances de 10
 * 4C30-1
 * @author Sébastien Lozano
 */
function Puissances_encadrement() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = 4;
  this.nb_questions = 6;
  this.titre = `Encadrer avec des puissances de 10`;

  this.consigne = `Encadrer les nombres suivants par deux puissances de 10 d'exposants consécutifs.`;

  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  //this.nb_questions_modifiable = false;

  let type_de_questions_disponibles;

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.sup = Number(this.sup); // attention le formulaire renvoie un string, on a besoin d'un number pour le switch !

    switch (this.sup) {
      case 1: // nombre enier positif
        type_de_questions_disponibles = [1, 2, 3, 4, 5, 6];
        //this.nb_questions = type_de_questions_disponibles.length;
        //this.nb_questions = 3;
        break;
      case 2: // nombre décimal positif
        type_de_questions_disponibles = [7, 8, 9, 10];
        //this.nb_questions = type_de_questions_disponibles.length;
        //this.nb_questions = 3;
        break;
      case 3: // nombre décimal positif inférieur à 1
        type_de_questions_disponibles = [11, 12, 13, 14];
        //this.nb_questions = type_de_questions_disponibles.length;
        //this.nb_questions = 3;
        break;
      case 4: // Mélange
        type_de_questions_disponibles = [
          choice([1, 2, 3]),
          choice([4, 5, 6]),
          choice([7, 8]),
          choice([9, 10]),
          choice([11, 12]),
          choice([13, 14]),
        ];
        //this.nb_questions = type_de_questions_disponibles.length;
        break;
    }

    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    // let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées --> à remettre comme ci dessus

    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    for (
      let i = 0, texte, texte_corr, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      // nombre entier positif, entre 1 et 10, puis 10 et 100 puis ....100 000 et 1 000 000
      let ent_pos = [];
      for (let i = 0; i < 6; i++) {
        ent_pos.push({
          val: `$${tex_nombre(calcul(randint(10 ** i + 1, 10 ** (i + 1))))}$`,
          puissance_inf: `$10^{${i}}$`,
          puissance_sup: `$10^{${i + 1}}$`,
          puissance_inf_num: `$${tex_nombre(calcul(10 ** i))}$`,
          puissance_sup_num: `$${tex_nombre(calcul(10 ** (i + 1)))}$`,
        });
      }

      // nombre décimal positif 1 et 10 000 avec 1,2,3 puis 4 décimales
      let dec_pos = [];
      for (let i = 0; i < 4; i++) {
        dec_pos.push({
          val: `$${tex_nombre(calcul(randint(10000, 100000) / 10 ** (4 - i)))}$`,
          puissance_inf: `$10^{${i}}$`,
          puissance_sup: `$10^{${i + 1}}$`,
          puissance_inf_num: `$${tex_nombre(calcul(10 ** i))}$`,
          puissance_sup_num: `$${tex_nombre(calcul(10 ** (i + 1)))}$`,
        });
      }
      // nombre décimal positif inférieur à 1, entre 0,1 et 1 puis entre 0,01 et 0,1 puis 0,001 et 0,0001
      let dec_pos_inf_un = [];
      for (let i = 0; i < 4; i++) {
        dec_pos_inf_un.push({
          val: `$${tex_nombre(calcul(randint(10 ** (4 - i - 1) + 1, 10 ** (4 - i)) / 10000))}$`,
          puissance_inf: `$10^{${-(i + 1)}}$`,
          puissance_sup: `$10^{${-i}}$`,
          puissance_inf_num: `$${tex_nombre(calcul(10 ** -(i + 1)))}$`,
          puissance_sup_num: `$${tex_nombre(calcul(10 ** -i))}$`,
        });
      }

      switch (liste_type_de_questions[i]) {
        case 1: // nombre enier positif
          texte = `${ent_pos[0].val}`;
          texte_corr = `${ent_pos[0].puissance_inf} $\\leqslant$ ${ent_pos[0].val} $\\leqslant$ ${ent_pos[0].puissance_sup}`;
          texte_corr += ` car ${ent_pos[0].puissance_inf} = ${ent_pos[0].puissance_inf_num} et ${ent_pos[0].puissance_sup} = ${ent_pos[0].puissance_sup_num}`;
          break;
        case 2: // nombre enier positif
          texte = `${ent_pos[1].val}`;
          texte_corr = `${ent_pos[1].puissance_inf} $\\leqslant$ ${ent_pos[1].val} $\\leqslant$ ${ent_pos[1].puissance_sup}`;
          texte_corr += ` car ${ent_pos[1].puissance_inf} = ${ent_pos[1].puissance_inf_num} et ${ent_pos[1].puissance_sup} = ${ent_pos[1].puissance_sup_num}`;
          break;
        case 3: // nombre enier positif
          texte = `${ent_pos[2].val}`;
          texte_corr = `${ent_pos[2].puissance_inf} $\\leqslant$ ${ent_pos[2].val} $\\leqslant$ ${ent_pos[2].puissance_sup}`;
          texte_corr += ` car ${ent_pos[2].puissance_inf} = ${ent_pos[2].puissance_inf_num} et ${ent_pos[2].puissance_sup} = ${ent_pos[2].puissance_sup_num}`;
          break;
        case 4: // nombre enier positif
          texte = `${ent_pos[3].val}`;
          texte_corr = `${ent_pos[3].puissance_inf} $\\leqslant$ ${ent_pos[3].val} $\\leqslant$ ${ent_pos[3].puissance_sup}`;
          texte_corr += ` car ${ent_pos[3].puissance_inf} = ${ent_pos[3].puissance_inf_num} et ${ent_pos[3].puissance_sup} = ${ent_pos[3].puissance_sup_num}`;
          break;
        case 5: // nombre enier positif
          texte = `${ent_pos[4].val}`;
          texte_corr = `${ent_pos[4].puissance_inf} $\\leqslant$ ${ent_pos[4].val} $\\leqslant$ ${ent_pos[4].puissance_sup}`;
          texte_corr += ` car ${ent_pos[4].puissance_inf} = ${ent_pos[4].puissance_inf_num} et ${ent_pos[4].puissance_sup} = ${ent_pos[4].puissance_sup_num}`;
          break;
        case 6: // nombre enier positif
          texte = `${ent_pos[5].val}`;
          texte_corr = `${ent_pos[5].puissance_inf} $\\leqslant$ ${ent_pos[5].val} $\\leqslant$ ${ent_pos[5].puissance_sup}`;
          texte_corr += ` car ${ent_pos[5].puissance_inf} = ${ent_pos[5].puissance_inf_num} et ${ent_pos[5].puissance_sup} = ${ent_pos[5].puissance_sup_num}`;
          break;
        case 7: // nombre décimal positif
          texte = `${dec_pos[0].val}`;
          texte_corr = `${dec_pos[0].puissance_inf} $\\leqslant$ ${dec_pos[0].val} $\\leqslant$ ${dec_pos[0].puissance_sup}`;
          texte_corr += ` car ${dec_pos[0].puissance_inf} = ${dec_pos[0].puissance_inf_num} et ${dec_pos[0].puissance_sup} = ${dec_pos[0].puissance_sup_num}`;
          break;
        case 8: // nombre décimal positif
          texte = `${dec_pos[1].val}`;
          texte_corr = `${dec_pos[1].puissance_inf} $\\leqslant$ ${dec_pos[1].val} $\\leqslant$ ${dec_pos[1].puissance_sup}`;
          texte_corr += ` car ${dec_pos[1].puissance_inf} = ${dec_pos[1].puissance_inf_num} et ${dec_pos[1].puissance_sup} = ${dec_pos[1].puissance_sup_num}`;
          break;
        case 9: // nombre décimal positif
          texte = `${dec_pos[2].val}`;
          texte_corr = `${dec_pos[2].puissance_inf} $\\leqslant$ ${dec_pos[2].val} $\\leqslant$ ${dec_pos[2].puissance_sup}`;
          texte_corr += ` car ${dec_pos[2].puissance_inf} = ${dec_pos[2].puissance_inf_num} et ${dec_pos[2].puissance_sup} = ${dec_pos[2].puissance_sup_num}`;
          break;
        case 10: // nombre décimal positif
          texte = `${dec_pos[3].val}`;
          texte_corr = `${dec_pos[3].puissance_inf} $\\leqslant$ ${dec_pos[3].val} $\\leqslant$ ${dec_pos[3].puissance_sup}`;
          texte_corr += ` car ${dec_pos[3].puissance_inf} = ${dec_pos[3].puissance_inf_num} et ${dec_pos[3].puissance_sup} = ${dec_pos[3].puissance_sup_num}`;
          break;
        case 11: // nombre décimal positif inferieur à 1
          texte = `${dec_pos_inf_un[0].val}`;
          texte_corr = `${dec_pos_inf_un[0].puissance_inf} $\\leqslant$ ${dec_pos_inf_un[0].val} $\\leqslant$ ${dec_pos_inf_un[0].puissance_sup}`;
          texte_corr += ` car ${dec_pos_inf_un[0].puissance_inf} = ${dec_pos_inf_un[0].puissance_inf_num} et ${dec_pos_inf_un[0].puissance_sup} = ${dec_pos_inf_un[0].puissance_sup_num}`;
          break;
        case 12: // nombre décimal positif inferieur à 1
          texte = `${dec_pos_inf_un[1].val}`;
          texte_corr = `${dec_pos_inf_un[1].puissance_inf} $\\leqslant$ ${dec_pos_inf_un[1].val} $\\leqslant$ ${dec_pos_inf_un[1].puissance_sup}`;
          texte_corr += ` car ${dec_pos_inf_un[1].puissance_inf} = ${dec_pos_inf_un[1].puissance_inf_num} et ${dec_pos_inf_un[1].puissance_sup} = ${dec_pos_inf_un[1].puissance_sup_num}`;
          break;
        case 13: // nombre décimal positif inferieur à 1
          texte = `${dec_pos_inf_un[2].val}`;
          texte_corr = `${dec_pos_inf_un[2].puissance_inf} $\\leqslant$ ${dec_pos_inf_un[2].val} $\\leqslant$ ${dec_pos_inf_un[2].puissance_sup}`;
          texte_corr += ` car ${dec_pos_inf_un[2].puissance_inf} = ${dec_pos_inf_un[2].puissance_inf_num} et ${dec_pos_inf_un[2].puissance_sup} = ${dec_pos_inf_un[2].puissance_sup_num}`;
          break;
        case 14: // nombre décimal positif inferieur à 1
          texte = `${dec_pos_inf_un[3].val}`;
          texte_corr = `${dec_pos_inf_un[3].puissance_inf} $\\leqslant$ ${dec_pos_inf_un[3].val} $\\leqslant$ ${dec_pos_inf_un[3].puissance_sup}`;
          texte_corr += ` car ${dec_pos_inf_un[3].puissance_inf} = ${dec_pos_inf_un[3].puissance_inf_num} et ${dec_pos_inf_un[3].puissance_sup} = ${dec_pos_inf_un[3].puissance_sup_num}`;
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
    "Niveau de difficulté",
    4,
    "1 : nombre entier positif\n2 : nombre décimal positif\n3 : nombre entier positif inférieur à un\n4 : Mélange",
  ];
}

/**
 * Problèmes additifs et de comparaion sur les rationnels
 * 4C25-0
 * @author Sébastien Lozano
 */
function Problemes_additifs_fractions() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.debug = false;
  this.sup = 1;
  if (this.debug) {
    this.nb_questions = 5;
  } else {
    this.nb_questions = 2;
  }
  this.titre = `Problèmes additifs et de comparaison sur les rationnels`;
  this.consigne = `Justifier vos réponses aux problèmes suivants.`;

  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  //this.nb_questions_modifiable = false;
  sortie_html ? (this.spacing = 2) : (this.spacing = 1.5);
  sortie_html ? (this.spacing_corr = 3) : (this.spacing_corr = 1.15);

  let type_de_questions_disponibles;

  this.nouvelle_version = function (numero_de_l_exercice) {
    if (this.debug) {
      type_de_questions_disponibles = [1, 2, 3, 4, 5];
    } else {
      type_de_questions_disponibles = [choice([1, 2]), choice([3, 4, 5])];
    }

    //let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let liste_type_de_questions = combinaison_listes_sans_changer_ordre(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées --> à remettre comme ci dessus

    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    for (
      let i = 0, texte, texte_corr, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      // on aura besoin des méthodes de la classe Fraction()
      let frac = new ListeFraction();
      // on récupère les dénominateurs qui vont bien
      //let denoms_amis = frac.denominateurs_amis;
      //C'est mieux avec ceux là, l'algo trouve plus rapidement une solution avec les contraintes à ajouter dans mathsalea_outils.js quand ça sera possible.
      let denoms_amis = [
        [40, 2, 20, 4, 10, 5, 8],
        [60, 2, 30, 3, 20, 4, 15, 5, 12, 6, 10],
        [80, 2, 40, 4, 20, 5, 16, 8, 10],
      ];
      // on aura besoin de ranger tout ça !
      let frac_rangees, frac_meme_denom_rangees;

      //======================================================
      //======== 		AVEC 3 FRACTIONS			  	========
      //======================================================

      // le tableau d'objets contenant tout le necesssaire, fractions, énoncé, question ... pour les problème avec 3 fractions
      let pb_3_f = [];
      // les numérateurs et dénominateurs des 3 fractions attention les deux premières doivent être inférieures à 1/2 si on veut qu'elles soient toutes positives !
      // et on veut des fractions distinctes !
      let nt1, nt2, nt3, dt1, dt2, dt3;
      let n1, n2, n3, d1, d2, d3;
      // on choisit un tableau de dénominateurs qui vont bien
      let denoms_cool_3 = denoms_amis[randint(0, denoms_amis.length - 1)];
      while (
        nt1 == nt2 ||
        nt1 == nt3 ||
        nt2 == nt3 ||
        nt1 / dt1 >= 1 / 2 ||
        nt2 / dt2 >= 1 / 2
      ) {
        n1 = randint(1, 6);
        d1 = choice(denoms_cool_3);
        n2 = randint(2, 10, [n1]); //on évite n1 pour pouvoir retrouver le texte de la plus grande fraction
        d2 = choice(denoms_cool_3, [d1]);
        n3 = d1 * d2 - n1 * d2 - n2 * d1; //la somme des trois vaut 1 !
        d3 = d1 * d2;

        nt1 = frac.fraction_simplifiee(n1, d1)[0];
        dt1 = frac.fraction_simplifiee(n1, d1)[1];
        nt2 = frac.fraction_simplifiee(n2, d2)[0];
        dt2 = frac.fraction_simplifiee(n2, d2)[1];
        nt3 = frac.fraction_simplifiee(n3, d3)[0];
        dt3 = frac.fraction_simplifiee(n3, d3)[1];
      }

      //======================================================
      //========= indice 0 le triathlon des neiges  ==========
      //======================================================
      pb_3_f.push({
        prenoms: [prenomM()],
        fractionsSimp: [
          nt1,
          dt1,
          "VTT",
          nt2,
          dt2,
          "ski de fond",
          nt3,
          dt3,
          "pied",
        ],
        fractionsB: {
          f1: [nt1, dt1],
          cat1: "VTT",
          f2: [nt2, dt2],
          cat2: "ski de fond",
          f3: [nt3, dt3],
          cat3: "pied",
        },
        enonce: ``,
        question: `Pour quelle discipline, la distance est-elle la plus grande ?`,
        correction: ``,
      });

      // les 3 prénomns doivent être distincts
      let p1, p2, p3; // les 3 prénoms
      while (p1 == p2 || p1 == p3 || p2 == p3) {
        p1 = prenomF();
        p2 = prenomF();
        p3 = prenomF();
      }

      //======================================================
      //=========== 		indice 1 Miss Math		 ===========
      //======================================================
      pb_3_f.push({
        prenoms: [],
        fractionsSimp: [nt1, dt1, p1, nt2, dt2, p2, nt3, dt3, p3],
        fractionsB: {
          f1: [nt1, dt1],
          cat1: p1,
          f2: [nt2, dt2],
          cat2: p2,
          f3: [nt3, dt3],
          cat3: p3,
        },
        enonce: ``,
        question: `Qui a été élue ?`,
        correction: ``,
      });
      let currentDate = new Date();
      let currentAnnee = currentDate.getFullYear();

      //======================================================
      //====== énoncé indice 0 le triathlon des neiges  ======
      //======================================================
      pb_3_f[0].enonce += `Le triathlon des neiges de la vallée des loups comprend trois épreuves qui s'enchaînent : VTT, ski de fond et course à pied.`;
      pb_3_f[0].enonce += `<br>${pb_3_f[0].prenoms[0]}, un passionné de cette épreuve, s'entraîne régulièrement sur le même circuit. `;
      pb_3_f[0].enonce += `<br>À chaque entraînement, il parcourt le circuit de la façon suivante : $\\dfrac{${pb_3_f[0].fractionsB.f1[0]}}{${pb_3_f[0].fractionsB.f1[1]}}$ à ${pb_3_f[0].fractionsB.cat1}, `;
      pb_3_f[0].enonce += `$\\dfrac{${pb_3_f[0].fractionsB.f2[0]}}{${pb_3_f[0].fractionsB.f2[1]}}$ à ${pb_3_f[0].fractionsB.cat2} et le reste à ${pb_3_f[0].fractionsB.cat3}.`;

      //======================================================
      //=========== énoncé indice 1 Miss Math		 ===========
      //======================================================
      pb_3_f[1].enonce = `À l'élection de Miss Math ${currentAnnee}, ${pb_3_f[1].fractionsB.cat1} a remporté $\\dfrac{${pb_3_f[1].fractionsB.f1[0]}}{${pb_3_f[1].fractionsB.f1[1]}}$ des suffrages, `;
      pb_3_f[1].enonce += `${pb_3_f[1].fractionsB.cat2} $\\dfrac{${pb_3_f[1].fractionsB.f2[0]}}{${pb_3_f[1].fractionsB.f2[1]}}$ et `;
      pb_3_f[1].enonce += `${pb_3_f[1].fractionsB.cat3} tous les autres.`;

      //======================================================
      //=========== 		Correction Commune  	 ===========
      //======================================================
      let frac_meme_denom;
      for (let i = 0; i < 2; i++) {
        pb_3_f[
          i
        ].correction = `Il s'agit d'un problème additif. Il va être necessaire de réduire les fractions au même dénominateur pour les additionner, les soustraire ou les comparer.<br>`;

        if (!(dt1 == dt2)) {
          pb_3_f[
            i
          ].correction += `Réduisons les fractions de l'énoncé au même dénominateur :  `;
          frac_meme_denom = frac.reduceSameDenominateur(
            pb_3_f[i].fractionsB.f1[0],
            pb_3_f[i].fractionsB.f1[1],
            pb_3_f[i].fractionsB.f2[0],
            pb_3_f[i].fractionsB.f2[1],
            pb_3_f[i].fractionsB.f3[0],
            pb_3_f[i].fractionsB.f3[1]
          );
          if (frac_meme_denom[1] == dt1) {
            pb_3_f[
              i
            ].correction += `$\\dfrac{${pb_3_f[i].fractionsB.f1[0]}}{${pb_3_f[i].fractionsB.f1[1]}}$ et `;
            pb_3_f[
              i
            ].correction += `$\\dfrac{${pb_3_f[i].fractionsB.f2[0]}}{${pb_3_f[i].fractionsB.f2[1]}} = \\dfrac{${frac_meme_denom[2]}}{${frac_meme_denom[3]}}$.<br>`;
          } else if (frac_meme_denom[1] == dt2) {
            pb_3_f[
              i
            ].correction += `$\\dfrac{${pb_3_f[i].fractionsB.f1[0]}}{${pb_3_f[i].fractionsB.f1[1]}} = \\dfrac{${frac_meme_denom[0]}}{${frac_meme_denom[1]}}$ et `;
            pb_3_f[
              i
            ].correction += `$\\dfrac{${pb_3_f[i].fractionsB.f2[0]}}{${pb_3_f[i].fractionsB.f2[1]}}$<br>`;
          } else {
            pb_3_f[
              i
            ].correction += `$\\dfrac{${pb_3_f[i].fractionsB.f1[0]}}{${pb_3_f[i].fractionsB.f1[1]}} = \\dfrac{${frac_meme_denom[0]}}{${frac_meme_denom[1]}}$ et `;
            pb_3_f[
              i
            ].correction += `$\\dfrac{${pb_3_f[i].fractionsB.f2[0]}}{${pb_3_f[i].fractionsB.f2[1]}} = \\dfrac{${frac_meme_denom[2]}}{${frac_meme_denom[3]}}$.<br>`;
          }
        } else {
          frac_meme_denom = frac.reduceSameDenominateur(
            pb_3_f[i].fractionsB.f1[0],
            pb_3_f[i].fractionsB.f1[1],
            pb_3_f[i].fractionsB.f2[0],
            pb_3_f[i].fractionsB.f2[1],
            pb_3_f[i].fractionsB.f3[0],
            pb_3_f[i].fractionsB.f3[1]
          );
          pb_3_f[
            i
          ].correction += `Les fractions de l'énoncé ont déjà le même dénominateur.`;
        }
      }

      //======================================================
      //==== Correction indice 0 le triathlon des neiges  ====
      //======================================================
      pb_3_f[0].correction += `Calculons alors la distance à `;

      //======================================================
      //======== 		Correction indice 1 Miss Math  	========
      //======================================================
      pb_3_f[1].correction += `Calculons d'abord la fraction des suffrages remportés par `;

      //======================================================
      //=========== 		Correction Commune  	 ===========
      //======================================================
      for (let i = 0; i < 2; i++) {
        pb_3_f[i].correction += `${pb_3_f[i].fractionsB.cat3} : <br>`;
        pb_3_f[
          i
        ].correction += `$1-\\dfrac{${pb_3_f[i].fractionsB.f1[0]}}{${pb_3_f[i].fractionsB.f1[1]}}-\\dfrac{${pb_3_f[i].fractionsB.f2[0]}}{${pb_3_f[i].fractionsB.f2[1]}} = `;
        pb_3_f[
          i
        ].correction += `\\dfrac{${frac_meme_denom[1]}}{${frac_meme_denom[1]}}-\\dfrac{${frac_meme_denom[0]}}{${frac_meme_denom[1]}}-\\dfrac{${frac_meme_denom[2]}}{${frac_meme_denom[3]}} = `;
        pb_3_f[
          i
        ].correction += `\\dfrac{${frac_meme_denom[1]}-${frac_meme_denom[0]}-${frac_meme_denom[2]}}{${frac_meme_denom[3]}} = `;
        pb_3_f[i].correction += `\\dfrac{${frac_meme_denom[1] - frac_meme_denom[0] - frac_meme_denom[2]
          }}{${frac_meme_denom[1]}}`;
        if (!(frac_meme_denom[1] == pb_3_f[0].fractionsB.f3[1])) {
          pb_3_f[
            i
          ].correction += ` = \\dfrac{${pb_3_f[i].fractionsB.f3[0]}}{${pb_3_f[i].fractionsB.f3[1]}}$`;
        } else {
          pb_3_f[i].correction += `$`;
        }
      }

      //======================================================
      //==== Conclusion indice 0 le triathlon des neiges  ====
      //======================================================
      pb_3_f[0].correction += `<br>${pb_3_f[0].prenoms[0]} fait donc $\\dfrac{${pb_3_f[0].fractionsB.f1[0]}}{${pb_3_f[0].fractionsB.f1[1]}}$ à ${pb_3_f[0].fractionsB.cat1}, `;
      pb_3_f[0].correction += `$\\dfrac{${pb_3_f[0].fractionsB.f2[0]}}{${pb_3_f[0].fractionsB.f2[1]}}$ à ${pb_3_f[0].fractionsB.cat2} et `;
      pb_3_f[0].correction += `$\\dfrac{${pb_3_f[0].fractionsB.f3[0]}}{${pb_3_f[0].fractionsB.f3[1]}}$ à ${pb_3_f[0].fractionsB.cat3}.`;

      pb_3_f[0].correction += `<br> Avec les mêmes dénominateurs pour pouvoir comparer, `;
      pb_3_f[0].correction += `${pb_3_f[0].prenoms[0]} fait donc $\\dfrac{${frac_meme_denom[0]}}{${frac_meme_denom[1]}}$ à ${pb_3_f[0].fractionsB.cat1}, `;
      pb_3_f[0].correction += `$\\dfrac{${frac_meme_denom[2]}}{${frac_meme_denom[3]}}$ à ${pb_3_f[0].fractionsB.cat2} et `;
      pb_3_f[0].correction += `$\\dfrac{${frac_meme_denom[4]}}{${frac_meme_denom[5]}}$ à ${pb_3_f[0].fractionsB.cat3}.`;

      //let frac_rangees,frac_meme_denom_rangees;
      if (
        calcul(nt1 / dt1) == calcul(nt2 / dt2) &&
        calcul(nt1 / dt1) == calcul(nt3 / dt3)
      ) {
        pb_3_f[0].correction += `<br> ${texte_en_couleur_et_gras(
          `Les trois fractions sont équivalentes, ${pb_3_f[0].prenoms[0]} parcours donc la même distance dans les trois disciplines.`
        )}`;
      } else {
        frac_meme_denom_rangees = frac.sortFractions(
          frac_meme_denom[0],
          frac_meme_denom[1],
          frac_meme_denom[2],
          frac_meme_denom[3],
          frac_meme_denom[4],
          frac_meme_denom[5]
        );
        pb_3_f[0].correction += `<br>Nous pouvons alors ranger ces fractions dans l'ordre croissant : $\\dfrac{${frac_meme_denom_rangees[0]}}{${frac_meme_denom_rangees[1]}}$, $\\dfrac{${frac_meme_denom_rangees[2]}}{${frac_meme_denom_rangees[3]}}$, $\\dfrac{${frac_meme_denom_rangees[4]}}{${frac_meme_denom_rangees[5]}}$.`;

        frac_rangees = frac.sortFractions(
          pb_3_f[0].fractionsB.f1[0],
          pb_3_f[0].fractionsB.f1[1],
          pb_3_f[0].fractionsB.f2[0],
          pb_3_f[0].fractionsB.f2[1],
          pb_3_f[0].fractionsB.f3[0],
          pb_3_f[0].fractionsB.f3[1]
        );

        pb_3_f[0].correction += `<br>Enfin, nous pouvons ranger les fractions de l'énoncé et la fraction calculée dans l'ordre croissant : $\\dfrac{${frac_rangees[0]}}{${frac_rangees[1]}}$, $\\dfrac{${frac_rangees[2]}}{${frac_rangees[3]}}$, $\\dfrac{${frac_rangees[4]}}{${frac_rangees[5]}}$.`;

        pb_3_f[0].correction += `<br> ${texte_en_couleur_et_gras(
          `C'est donc à ${pb_3_f[0].fractionsSimp[
          pb_3_f[0].fractionsSimp.indexOf(frac_rangees[4]) + 2
          ]
          } que ${pb_3_f[0].prenoms[0]} fait la plus grande distance.`
        )}`;
      }

      //======================================================
      //======== 		Conclusion indice 1 Miss Math  	========
      //======================================================
      pb_3_f[1].correction += `<br>${pb_3_f[1].fractionsB.cat1} a donc remporté $\\dfrac{${pb_3_f[1].fractionsB.f1[0]}}{${pb_3_f[1].fractionsB.f1[1]}}$, `;
      pb_3_f[1].correction += `${pb_3_f[1].fractionsB.cat2} a remporté $\\dfrac{${pb_3_f[1].fractionsB.f2[0]}}{${pb_3_f[1].fractionsB.f2[1]}}$ et `;
      pb_3_f[1].correction += `${pb_3_f[1].fractionsB.cat3} $\\dfrac{${pb_3_f[1].fractionsB.f3[0]}}{${pb_3_f[1].fractionsB.f3[1]}}$.`;

      pb_3_f[1].correction += `<br> Avec les mêmes dénominateurs pour pouvoir comparer, `;
      pb_3_f[1].correction += `${pb_3_f[1].fractionsB.cat1} remporte donc $\\dfrac{${frac_meme_denom[0]}}{${frac_meme_denom[1]}}$, `;
      pb_3_f[1].correction += `${pb_3_f[1].fractionsB.cat2} $\\dfrac{${frac_meme_denom[2]}}{${frac_meme_denom[3]}}$ et `;
      pb_3_f[1].correction += `${pb_3_f[1].fractionsB.cat3} $\\dfrac{${frac_meme_denom[4]}}{${frac_meme_denom[5]}}$.`;

      if (
        calcul(nt1 / dt1) == calcul(nt2 / dt2) &&
        calcul(nt1 / dt1) == calcul(nt3 / dt3)
      ) {
        pb_3_f[1].correction += `<br> ${texte_en_couleur_et_gras(
          `Les trois fractions sont équivalentes, les trois candidates ont donc remporté le même nombre de suffrages.`
        )}`;
      } else {
        frac_meme_denom_rangees = frac.sortFractions(
          frac_meme_denom[0],
          frac_meme_denom[1],
          frac_meme_denom[2],
          frac_meme_denom[3],
          frac_meme_denom[4],
          frac_meme_denom[5]
        );
        pb_3_f[1].correction += `<br>Nous pouvons alors ranger ces fractions dans l'ordre croissant : $\\dfrac{${frac_meme_denom_rangees[0]}}{${frac_meme_denom_rangees[1]}}$, $\\dfrac{${frac_meme_denom_rangees[2]}}{${frac_meme_denom_rangees[3]}}$, $\\dfrac{${frac_meme_denom_rangees[4]}}{${frac_meme_denom_rangees[5]}}$.`;

        frac_rangees = frac.sortFractions(
          pb_3_f[1].fractionsB.f1[0],
          pb_3_f[1].fractionsB.f1[1],
          pb_3_f[1].fractionsB.f2[0],
          pb_3_f[1].fractionsB.f2[1],
          pb_3_f[1].fractionsB.f3[0],
          pb_3_f[1].fractionsB.f3[1]
        );

        pb_3_f[1].correction += `<br>Enfin, nous pouvons ranger les fractions de l'énoncé et la fraction calculée dans l'ordre croissant : $\\dfrac{${frac_rangees[0]}}{${frac_rangees[1]}}$, $\\dfrac{${frac_rangees[2]}}{${frac_rangees[3]}}$, $\\dfrac{${frac_rangees[4]}}{${frac_rangees[5]}}$.`;

        pb_3_f[1].correction += `<br> ${texte_en_couleur_et_gras(
          `C'est donc ${pb_3_f[1].fractionsSimp[
          pb_3_f[1].fractionsSimp.indexOf(frac_rangees[4]) + 2
          ]
          } qui a été élue.`
        )}`;
      }

      //======================================================
      //======== 		AVEC 4 FRACTIONS			  	========
      //======================================================

      // le tableau d'objets contenant tout le necesssaire, fractions, énoncé, question ... pour les problème avec 4 fractions
      let pb_4_f = [];
      // les numérateurs et dénominateurs des 4 fractions attention les trois premières doivent être inférieures à 1/3 si on veut qu'elles soient toutes positives !
      // et on veut des fractions distinctes
      let nq1, nq2, nq3, nq4, dq1, dq2, dq3, dq4;
      let n4, d4; // en plus parce qu'il y a 4 fractions
      // on choisit un tableau de dénominateurs qui vont bien
      let denoms_cool_4 = denoms_amis[randint(2, denoms_amis.length - 1)];
      while (
        nq1 == nq2 ||
        nq1 == nq3 ||
        nq1 == nq4 ||
        nq2 == nq3 ||
        nq2 == nq4 ||
        nq3 == nq4 ||
        nq1 / dq1 >= 1 / 3 ||
        nq2 / dq2 >= 1 / 3 ||
        nq3 / dq3 >= 1 / 3
      ) {
        n1 = randint(1, 5);
        d1 = choice(denoms_cool_4);
        n2 = randint(1, 11, [n1]); //on évite n1 pour pouvoir retrouver le texte de la plus grande fraction
        d2 = choice(denoms_cool_4);
        n3 = randint(1, 17, [n1, n2]); //on évite n1 et n2 pour pouvoir retrouver le texte de la plus grande fraction
        d3 = choice(denoms_cool_4);
        n4 = d1 * d2 * d3 - n1 * d2 * d3 - n2 * d1 * d3 - n3 * d1 * d2; //la somme des quatre vaut 1 !
        d4 = d1 * d2 * d3;

        nq1 = frac.fraction_simplifiee(n1, d1)[0];
        dq1 = frac.fraction_simplifiee(n1, d1)[1];
        nq2 = frac.fraction_simplifiee(n2, d2)[0];
        dq2 = frac.fraction_simplifiee(n2, d2)[1];
        nq3 = frac.fraction_simplifiee(n3, d3)[0];
        dq3 = frac.fraction_simplifiee(n3, d3)[1];
        nq4 = frac.fraction_simplifiee(n4, d4)[0];
        dq4 = frac.fraction_simplifiee(n4, d4)[1];
      }

      //======================================================
      //=========== 		indice 0 le mandala		 ===========
      //======================================================
      pb_4_f.push({
        //
        prenoms: [prenom()],
        fractionsSimp: [
          nq1,
          dq1,
          "carmin",
          nq2,
          dq2,
          "ocre jaune",
          nq3,
          dq3,
          "turquoise",
          nq4,
          dq4,
          "pourpre",
        ],
        fractionsB: {
          f1: [nq1, dq1],
          cat1: "carmin",
          f2: [nq2, dq2],
          cat2: "ocre jaune",
          f3: [nq3, dq3],
          cat3: "turquoise",
          f4: [nq4, dq4],
          cat4: "pourpre",
        },
        enonce: ``,
        question: `Quelle est elle la couleur qui recouvre le plus de surface ?`,
        correction: ``,
      });

      //======================================================
      //===========		indice 1 le jardin	 	 ===========
      //======================================================
      pb_4_f.push({
        // indice 1 le jardin
        prenoms: [],
        fractionsSimp: [
          nq1,
          dq1,
          "la culture des légumes",
          nq2,
          dq2,
          "la culture des plantes aromatiques",
          nq3,
          dq3,
          "une serre servant aux semis",
          nq4,
          dq4,
          "la culture des fraisiers",
        ],
        fractionsB: {
          f1: [nq1, dq1],
          cat1: "la culture des légumes",
          f2: [nq2, dq2],
          cat2: "la culture des plantes aromatiques",
          f3: [nq3, dq3],
          cat3: "une serre servant aux semis",
          f4: [nq4, dq4],
          cat4: "la culture des fraisiers",
        },
        enonce: ``,
        question: `Quelle est la culture qui occupe le plus de surface ?`,
        correction: ``,
      });

      //======================================================
      //===========	indice 2 le stade		 	 ===========
      //======================================================
      pb_4_f.push({
        // indice 2 le stade
        prenoms: [],
        fractionsSimp: [
          nq1,
          dq1,
          "le pays organisateur",
          nq2,
          dq2,
          "l'ensemble des supporters des deux équipes en jeu",
          nq3,
          dq3,
          "les sponsors et officiels",
          nq4,
          dq4,
          "les places en vente libre",
        ],
        fractionsB: {
          f1: [nq1, dq1],
          cat1: "le pays organisateur",
          f2: [nq2, dq2],
          cat2: "l'ensemble des supporters des deux équipes en jeu",
          f3: [nq3, dq3],
          cat3: "les sponsors et officiels",
          f4: [nq4, dq4],
          cat4: "les places en vente libre",
        },
        enonce: ``,
        question: `Quelle est la catégorie la plus importante dans le stade ?`,
        correction: ``,
      });

      //======================================================
      //===========	énoncé indice 0 le mandala 	 ===========
      //======================================================
      pb_4_f[0].enonce = `${pb_4_f[0].prenoms[0]} colorie un mandala selon les proportions suivantes :  $\\dfrac{${pb_4_f[0].fractionsB.f1[0]}}{${pb_4_f[0].fractionsB.f1[1]}}$ en ${pb_4_f[0].fractionsB.cat1}, `;
      pb_4_f[0].enonce += `$\\dfrac{${pb_4_f[0].fractionsB.f2[0]}}{${pb_4_f[0].fractionsB.f2[1]}}$ en  ${pb_4_f[0].fractionsB.cat2}, `;
      pb_4_f[0].enonce += `$\\dfrac{${pb_4_f[0].fractionsB.f3[0]}}{${pb_4_f[0].fractionsB.f3[1]}}$ en  ${pb_4_f[0].fractionsB.cat3} et `;
      pb_4_f[0].enonce += `le reste en ${pb_4_f[0].fractionsB.cat4}.`;

      //======================================================
      //===========	énoncé indice 1 le jardin 	 ===========
      //======================================================
      pb_4_f[1].enonce = `Un jardin est aménagé selon les proportions suivantes :  $\\dfrac{${pb_4_f[1].fractionsB.f1[0]}}{${pb_4_f[1].fractionsB.f1[1]}}$ par ${pb_4_f[1].fractionsB.cat1}, `;
      pb_4_f[1].enonce += `$\\dfrac{${pb_4_f[1].fractionsB.f2[0]}}{${pb_4_f[1].fractionsB.f2[1]}}$ par  ${pb_4_f[1].fractionsB.cat2}, `;
      pb_4_f[1].enonce += `$\\dfrac{${pb_4_f[1].fractionsB.f3[0]}}{${pb_4_f[1].fractionsB.f3[1]}}$ par  ${pb_4_f[1].fractionsB.cat3} et `;
      pb_4_f[1].enonce += `le reste par ${pb_4_f[1].fractionsB.cat4}.`;

      //======================================================
      //===========	énoncé indice 2 le stade 	 ===========
      //======================================================
      pb_4_f[2].enonce = `Pour chaque match, les places du stade sont mises en vente dans les proportions suivantes :  $\\dfrac{${pb_4_f[2].fractionsB.f1[0]}}{${pb_4_f[2].fractionsB.f1[1]}}$ pour ${pb_4_f[2].fractionsB.cat1}, `;
      pb_4_f[2].enonce += `$\\dfrac{${pb_4_f[2].fractionsB.f2[0]}}{${pb_4_f[2].fractionsB.f2[1]}}$ pour  ${pb_4_f[2].fractionsB.cat2}, `;
      pb_4_f[2].enonce += `$\\dfrac{${pb_4_f[2].fractionsB.f3[0]}}{${pb_4_f[2].fractionsB.f3[1]}}$ pour  ${pb_4_f[2].fractionsB.cat3} et `;
      pb_4_f[2].enonce += `le reste pour ${pb_4_f[2].fractionsB.cat4}.`;

      //======================================================
      //=========== 		Correction Commune  	 ===========
      //======================================================

      //let frac_meme_denom;
      for (let i = 0; i < 3; i++) {
        pb_4_f[
          i
        ].correction = `Il s'agit d'un problème additif. Il va être necessaire de réduire les fractions au même dénominateur pour les additionner, les soustraire ou les comparer.<br>`;

        if (!(dq1 == dq2 && dq1 == dq3)) {
          pb_4_f[i].correction += `${!(
            dq1 == dq2 && dq1 == dq3
          )} - ${dq1} - ${dq2} - ${dq3} - Réduisons les fractions de l'énoncé au même dénominateur :  `;
          frac_meme_denom = frac.reduceSameDenominateur(
            pb_4_f[i].fractionsB.f1[0],
            pb_4_f[i].fractionsB.f1[1],
            pb_4_f[i].fractionsB.f2[0],
            pb_4_f[i].fractionsB.f2[1],
            pb_4_f[i].fractionsB.f3[0],
            pb_4_f[i].fractionsB.f3[1],
            pb_4_f[i].fractionsB.f4[0],
            pb_4_f[i].fractionsB.f4[1]
          );
          if (frac_meme_denom[1] == dq1) {
            pb_4_f[
              i
            ].correction += `$\\dfrac{${pb_4_f[i].fractionsB.f1[0]}}{${pb_4_f[i].fractionsB.f1[1]}}$, `;
          } else {
            pb_4_f[
              i
            ].correction += `$\\dfrac{${pb_4_f[i].fractionsB.f1[0]}}{${pb_4_f[i].fractionsB.f1[1]}} = \\dfrac{${frac_meme_denom[0]}}{${frac_meme_denom[1]}}$, `;
          }
          if (frac_meme_denom[1] == dq2) {
            pb_4_f[
              i
            ].correction += `$\\dfrac{${pb_4_f[i].fractionsB.f2[0]}}{${pb_4_f[i].fractionsB.f2[1]}}$ et `;
          } else {
            pb_4_f[
              i
            ].correction += `$\\dfrac{${pb_4_f[i].fractionsB.f2[0]}}{${pb_4_f[i].fractionsB.f2[1]}} = \\dfrac{${frac_meme_denom[2]}}{${frac_meme_denom[3]}}$ et `;
          }
          if (frac_meme_denom[1] == dq3) {
            pb_4_f[
              i
            ].correction += `$\\dfrac{${pb_4_f[i].fractionsB.f3[0]}}{${pb_4_f[i].fractionsB.f3[1]}}$.<br>`;
          } else {
            pb_4_f[
              i
            ].correction += `$\\dfrac{${pb_4_f[i].fractionsB.f3[0]}}{${pb_4_f[i].fractionsB.f3[1]}} = \\dfrac{${frac_meme_denom[4]}}{${frac_meme_denom[5]}}$.<br>`;
          }
        } else {
          frac_meme_denom = frac.reduceSameDenominateur(
            pb_4_f[i].fractionsB.f1[0],
            pb_4_f[i].fractionsB.f1[1],
            pb_4_f[i].fractionsB.f2[0],
            pb_4_f[i].fractionsB.f2[1],
            pb_4_f[i].fractionsB.f3[0],
            pb_4_f[i].fractionsB.f3[1],
            pb_4_f[i].fractionsB.f4[0],
            pb_4_f[i].fractionsB.f4[1]
          );
          pb_4_f[
            i
          ].correction += `Les fractions de l'énoncé ont déjà le même dénominateur : `;
          pb_4_f[
            i
          ].correction += `$\\dfrac{${pb_4_f[i].fractionsB.f1[0]}}{${pb_4_f[i].fractionsB.f1[1]}}$, $\\dfrac{${pb_4_f[i].fractionsB.f2[0]}}{${pb_4_f[i].fractionsB.f2[1]}}$ et $\\dfrac{${pb_4_f[i].fractionsB.f3[0]}}{${pb_4_f[i].fractionsB.f3[1]}}$.<br>`;
        }
      }

      //======================================================
      //===========	Correction indice 0 le mandala==========
      //======================================================
      pb_4_f[0].correction += `Calculons alors la fraction du mandala recouverte en `;

      //======================================================
      //===========	Correction indice 1 le jardin===========
      //======================================================
      pb_4_f[1].correction += `Calculons d'abord la fraction du jardin occupée par `;

      //======================================================
      //===========	énoncé indice 2 le stade 	 ===========
      //======================================================
      pb_4_f[2].correction += `Calculons d'abord la fraction du stade occupée par `;

      //======================================================
      //=========== 		Correction Commune  	 ===========
      //======================================================
      for (let i = 0; i < 3; i++) {
        pb_4_f[i].correction += `${pb_4_f[i].fractionsB.cat3} : <br>`;
        pb_4_f[
          i
        ].correction += `$1-\\dfrac{${pb_4_f[i].fractionsB.f1[0]}}{${pb_4_f[i].fractionsB.f1[1]}}-\\dfrac{${pb_4_f[i].fractionsB.f2[0]}}{${pb_4_f[i].fractionsB.f2[1]}}-\\dfrac{${pb_4_f[i].fractionsB.f3[0]}}{${pb_4_f[i].fractionsB.f3[1]}} = `;
        pb_4_f[
          i
        ].correction += `\\dfrac{${frac_meme_denom[1]}}{${frac_meme_denom[1]}}-\\dfrac{${frac_meme_denom[0]}}{${frac_meme_denom[1]}}-\\dfrac{${frac_meme_denom[2]}}{${frac_meme_denom[3]}}-\\dfrac{${frac_meme_denom[4]}}{${frac_meme_denom[5]}} = `;
        pb_4_f[
          i
        ].correction += `\\dfrac{${frac_meme_denom[1]}-${frac_meme_denom[0]}-${frac_meme_denom[2]}-${frac_meme_denom[4]}}{${frac_meme_denom[1]}} = `;
        pb_4_f[i].correction += `\\dfrac{${frac_meme_denom[1] -
          frac_meme_denom[0] -
          frac_meme_denom[2] -
          frac_meme_denom[4]
          }}{${frac_meme_denom[1]}}`;
        if (!(frac_meme_denom[1] == pb_4_f[0].fractionsB.f4[1])) {
          pb_4_f[
            i
          ].correction += ` = \\dfrac{${pb_4_f[i].fractionsB.f4[0]}}{${pb_4_f[i].fractionsB.f4[1]}}$`;
        } else {
          pb_4_f[i].correction += `$`;
        }
      }

      //======================================================
      //=========== Conclusion indice 0 le mandala ===========
      //======================================================

      pb_4_f[0].correction += `<br>Le mandala est donc colorié de la façon suivante : $\\dfrac{${pb_4_f[0].fractionsB.f1[0]}}{${pb_4_f[0].fractionsB.f1[1]}}$ en ${pb_4_f[0].fractionsB.cat1}, `;
      pb_4_f[0].correction += `$\\dfrac{${pb_4_f[0].fractionsB.f2[0]}}{${pb_4_f[0].fractionsB.f2[1]}}$ en ${pb_4_f[0].fractionsB.cat2}, `;
      pb_4_f[0].correction += `$\\dfrac{${pb_4_f[0].fractionsB.f3[0]}}{${pb_4_f[0].fractionsB.f3[1]}}$ en ${pb_4_f[0].fractionsB.cat3} et `;
      pb_4_f[0].correction += `$\\dfrac{${pb_4_f[0].fractionsB.f4[0]}}{${pb_4_f[0].fractionsB.f4[1]}}$ en ${pb_4_f[0].fractionsB.cat4}.`;

      pb_4_f[0].correction += `<br> Avec les mêmes dénominateurs pour pouvoir comparer, `;
      pb_4_f[0].correction += `le mandala est donc colorié de la façon suivante : $\\dfrac{${frac_meme_denom[0]}}{${frac_meme_denom[1]}}$ en ${pb_4_f[0].fractionsB.cat1}, `;
      pb_4_f[0].correction += `$\\dfrac{${frac_meme_denom[2]}}{${frac_meme_denom[3]}}$ en ${pb_4_f[0].fractionsB.cat2}, `;
      pb_4_f[0].correction += `$\\dfrac{${frac_meme_denom[4]}}{${frac_meme_denom[5]}}$ en ${pb_4_f[0].fractionsB.cat3} et `;
      pb_4_f[0].correction += `$\\dfrac{${frac_meme_denom[6]}}{${frac_meme_denom[7]}}$ en ${pb_4_f[0].fractionsB.cat4}.`;

      //let frac_rangees,frac_meme_denom_rangees;
      if (
        calcul(nq1 / dq1) == calcul(nq2 / dq2) &&
        calcul(nq1 / dq1) == calcul(nq3 / dq3) &&
        calcul(nq1 / dq1) == calcul(nq4 / dq4)
      ) {
        pb_4_f[0].correction += `<br> ${texte_en_couleur_et_gras(
          `Les quatre fractions sont équivalentes, ${pb_4_f[0].prenoms[0]} colorie donc la même surface avec les quatre couleurs.`
        )}`;
      } else {
        frac_meme_denom_rangees = frac.sortFractions(
          frac_meme_denom[0],
          frac_meme_denom[1],
          frac_meme_denom[2],
          frac_meme_denom[3],
          frac_meme_denom[4],
          frac_meme_denom[5],
          frac_meme_denom[6],
          frac_meme_denom[7]
        );
        pb_4_f[0].correction += `<br>Nous pouvons alors ranger ces fractions dans l'ordre croissant : $\\dfrac{${frac_meme_denom_rangees[0]}}{${frac_meme_denom_rangees[1]}}$, $\\dfrac{${frac_meme_denom_rangees[2]}}{${frac_meme_denom_rangees[3]}}$, $\\dfrac{${frac_meme_denom_rangees[4]}}{${frac_meme_denom_rangees[5]}}$, $\\dfrac{${frac_meme_denom_rangees[6]}}{${frac_meme_denom_rangees[7]}}$.`;

        frac_rangees = frac.sortFractions(
          pb_4_f[0].fractionsB.f1[0],
          pb_4_f[0].fractionsB.f1[1],
          pb_4_f[0].fractionsB.f2[0],
          pb_4_f[0].fractionsB.f2[1],
          pb_4_f[0].fractionsB.f3[0],
          pb_4_f[0].fractionsB.f3[1],
          pb_4_f[0].fractionsB.f4[0],
          pb_4_f[0].fractionsB.f4[1]
        );

        pb_4_f[0].correction += `<br>Enfin, nous pouvons ranger les fractions de l'énoncé et la fraction calculée dans l'ordre croissant : $\\dfrac{${frac_rangees[0]}}{${frac_rangees[1]}}$, $\\dfrac{${frac_rangees[2]}}{${frac_rangees[3]}}$, $\\dfrac{${frac_rangees[4]}}{${frac_rangees[5]}}$, $\\dfrac{${frac_rangees[6]}}{${frac_rangees[7]}}$.`;

        pb_4_f[0].correction += `<br> ${texte_en_couleur_et_gras(
          `C'est donc en ${pb_4_f[0].fractionsSimp[
          pb_4_f[0].fractionsSimp.indexOf(frac_rangees[6]) + 2
          ]
          } que le mandala est le plus recouvert.`
        )}`;
      }

      //======================================================
      //=========== Conclusion indice 1 le jardin	 ===========
      //======================================================
      pb_4_f[1].correction += `<br>Le jardin est donc occupé de la façon suivante : $\\dfrac{${pb_4_f[1].fractionsB.f1[0]}}{${pb_4_f[1].fractionsB.f1[1]}}$ par ${pb_4_f[1].fractionsB.cat1}, `;
      pb_4_f[1].correction += `$\\dfrac{${pb_4_f[1].fractionsB.f2[0]}}{${pb_4_f[1].fractionsB.f2[1]}}$ par ${pb_4_f[1].fractionsB.cat2}, `;
      pb_4_f[1].correction += `$\\dfrac{${pb_4_f[1].fractionsB.f3[0]}}{${pb_4_f[1].fractionsB.f3[1]}}$ par ${pb_4_f[1].fractionsB.cat3} et `;
      pb_4_f[1].correction += `$\\dfrac{${pb_4_f[1].fractionsB.f4[0]}}{${pb_4_f[1].fractionsB.f4[1]}}$ par ${pb_4_f[1].fractionsB.cat4}.`;

      pb_4_f[1].correction += `<br> Avec les mêmes dénominateurs pour pouvoir comparer, `;
      pb_4_f[1].correction += `le jardin est donc occupé de la façon suivante : $\\dfrac{${frac_meme_denom[0]}}{${frac_meme_denom[1]}}$ par ${pb_4_f[1].fractionsB.cat1}, `;
      pb_4_f[1].correction += `$\\dfrac{${frac_meme_denom[2]}}{${frac_meme_denom[3]}}$ par ${pb_4_f[1].fractionsB.cat2}, `;
      pb_4_f[1].correction += `$\\dfrac{${frac_meme_denom[4]}}{${frac_meme_denom[5]}}$ par ${pb_4_f[1].fractionsB.cat3} et `;
      pb_4_f[1].correction += `$\\dfrac{${frac_meme_denom[6]}}{${frac_meme_denom[7]}}$ par ${pb_4_f[1].fractionsB.cat4}.`;

      //let frac_rangees,frac_meme_denom_rangees;
      if (
        calcul(nq1 / dq1) == calcul(nq2 / dq2) &&
        calcul(nq1 / dq1) == calcul(nq3 / dq3) &&
        calcul(nq1 / dq1) == calcul(nq4 / dq4)
      ) {
        pb_4_f[1].correction += `<br> ${texte_en_couleur_et_gras(
          `Les quatre fractions sont équivalentes, la même surface du jardin est donc occupée par les quatre cultures.`
        )}`;
      } else {
        frac_meme_denom_rangees = frac.sortFractions(
          frac_meme_denom[0],
          frac_meme_denom[1],
          frac_meme_denom[2],
          frac_meme_denom[3],
          frac_meme_denom[4],
          frac_meme_denom[5],
          frac_meme_denom[6],
          frac_meme_denom[7]
        );
        pb_4_f[1].correction += `<br>Nous pouvons alors ranger ces fractions dans l'ordre croissant : $\\dfrac{${frac_meme_denom_rangees[0]}}{${frac_meme_denom_rangees[1]}}$, $\\dfrac{${frac_meme_denom_rangees[2]}}{${frac_meme_denom_rangees[3]}}$, $\\dfrac{${frac_meme_denom_rangees[4]}}{${frac_meme_denom_rangees[5]}}$, $\\dfrac{${frac_meme_denom_rangees[6]}}{${frac_meme_denom_rangees[7]}}$.`;

        frac_rangees = frac.sortFractions(
          pb_4_f[1].fractionsB.f1[0],
          pb_4_f[1].fractionsB.f1[1],
          pb_4_f[1].fractionsB.f2[0],
          pb_4_f[1].fractionsB.f2[1],
          pb_4_f[1].fractionsB.f3[0],
          pb_4_f[1].fractionsB.f3[1],
          pb_4_f[1].fractionsB.f4[0],
          pb_4_f[1].fractionsB.f4[1]
        );

        pb_4_f[1].correction += `<br>Enfin, nous pouvons ranger les fractions de l'énoncé et la fraction calculée dans l'ordre croissant : $\\dfrac{${frac_rangees[0]}}{${frac_rangees[1]}}$, $\\dfrac{${frac_rangees[2]}}{${frac_rangees[3]}}$, $\\dfrac{${frac_rangees[4]}}{${frac_rangees[5]}}$, $\\dfrac{${frac_rangees[6]}}{${frac_rangees[7]}}$.`;

        pb_4_f[1].correction += `<br> ${texte_en_couleur_et_gras(
          `C'est donc par ${pb_4_f[1].fractionsSimp[
          pb_4_f[1].fractionsSimp.indexOf(frac_rangees[6]) + 2
          ]
          } que le jardin est le plus occupé.`
        )}`;
      }

      //======================================================
      //=========== Conclusion indice 2 le stade	 ===========
      //======================================================
      pb_4_f[2].correction += `<br>Le stade est donc occupé de la façon suivante : $\\dfrac{${pb_4_f[2].fractionsB.f1[0]}}{${pb_4_f[2].fractionsB.f1[1]}}$ pour ${pb_4_f[2].fractionsB.cat1}, `;
      pb_4_f[2].correction += `$\\dfrac{${pb_4_f[2].fractionsB.f2[0]}}{${pb_4_f[2].fractionsB.f2[1]}}$ pour ${pb_4_f[2].fractionsB.cat2}, `;
      pb_4_f[2].correction += `$\\dfrac{${pb_4_f[2].fractionsB.f3[0]}}{${pb_4_f[2].fractionsB.f3[1]}}$ pour ${pb_4_f[2].fractionsB.cat3} et `;
      pb_4_f[2].correction += `$\\dfrac{${pb_4_f[2].fractionsB.f4[0]}}{${pb_4_f[2].fractionsB.f4[1]}}$ pour ${pb_4_f[2].fractionsB.cat4}.`;

      pb_4_f[2].correction += `<br> Avec les mêmes dénominateurs pour pouvoir comparer, `;
      pb_4_f[2].correction += `le stade est donc occupé de la façon suivante : $\\dfrac{${frac_meme_denom[0]}}{${frac_meme_denom[1]}}$ pour ${pb_4_f[2].fractionsB.cat1}, `;
      pb_4_f[2].correction += `$\\dfrac{${frac_meme_denom[2]}}{${frac_meme_denom[3]}}$ pour ${pb_4_f[2].fractionsB.cat2}, `;
      pb_4_f[2].correction += `$\\dfrac{${frac_meme_denom[4]}}{${frac_meme_denom[5]}}$ pour ${pb_4_f[2].fractionsB.cat3} et `;
      pb_4_f[2].correction += `$\\dfrac{${frac_meme_denom[6]}}{${frac_meme_denom[7]}}$ pour ${pb_4_f[2].fractionsB.cat4}.`;

      //let frac_rangees,frac_meme_denom_rangees;
      if (
        calcul(nq1 / dq1) == calcul(nq2 / dq2) &&
        calcul(nq1 / dq1) == calcul(nq3 / dq3) &&
        calcul(nq1 / dq1) == calcul(nq4 / dq4)
      ) {
        pb_4_f[2].correction += `<br> ${texte_en_couleur_et_gras(
          `Les quatre fractions sont équivalentes, chaque catégorie a donc la même importance dans le stade.`
        )}`;
      } else {
        frac_meme_denom_rangees = frac.sortFractions(
          frac_meme_denom[0],
          frac_meme_denom[1],
          frac_meme_denom[2],
          frac_meme_denom[3],
          frac_meme_denom[4],
          frac_meme_denom[5],
          frac_meme_denom[6],
          frac_meme_denom[7]
        );
        pb_4_f[2].correction += `<br>Nous pouvons alors ranger ces fractions dans l'ordre croissant : $\\dfrac{${frac_meme_denom_rangees[0]}}{${frac_meme_denom_rangees[1]}}$, $\\dfrac{${frac_meme_denom_rangees[2]}}{${frac_meme_denom_rangees[3]}}$, $\\dfrac{${frac_meme_denom_rangees[4]}}{${frac_meme_denom_rangees[5]}}$, $\\dfrac{${frac_meme_denom_rangees[6]}}{${frac_meme_denom_rangees[7]}}$.`;

        frac_rangees = frac.sortFractions(
          pb_4_f[2].fractionsB.f1[0],
          pb_4_f[2].fractionsB.f1[1],
          pb_4_f[2].fractionsB.f2[0],
          pb_4_f[2].fractionsB.f2[1],
          pb_4_f[2].fractionsB.f3[0],
          pb_4_f[2].fractionsB.f3[1],
          pb_4_f[2].fractionsB.f4[0],
          pb_4_f[2].fractionsB.f4[1]
        );

        pb_4_f[2].correction += `<br>Enfin, nous pouvons ranger les fractions de l'énoncé et la fraction calculée dans l'ordre croissant : $\\dfrac{${frac_rangees[0]}}{${frac_rangees[1]}}$, $\\dfrac{${frac_rangees[2]}}{${frac_rangees[3]}}$, $\\dfrac{${frac_rangees[4]}}{${frac_rangees[5]}}$, $\\dfrac{${frac_rangees[6]}}{${frac_rangees[7]}}$.`;

        pb_4_f[2].correction += `<br> ${texte_en_couleur_et_gras(
          `C'est donc pour ${pb_4_f[2].fractionsSimp[
          pb_4_f[2].fractionsSimp.indexOf(frac_rangees[6]) + 2
          ]
          } que le nombre de places est le plus important.`
        )}`;
      }

      switch (liste_type_de_questions[i]) {
        case 1: // Triathlon des neiges --> VTT, ski de fond, course
          texte = `${pb_3_f[0].enonce} <br> ${pb_3_f[0].question}`;
          if (this.debug) {
            texte += `<br>`;
            texte += `<br> ${pb_3_f[0].correction}`;
            texte_corr = ``;
          } else {
            texte_corr = `${pb_3_f[0].correction}`;
          }
          break;
        case 2: //Miss Math --> Noémie, Samia, Alexia
          texte = `${pb_3_f[1].enonce} <br> ${pb_3_f[1].question}`;
          if (this.debug) {
            texte += `<br>`;
            texte += `<br> ${pb_3_f[1].correction}`;
            texte_corr = ``;
          } else {
            texte_corr = `${pb_3_f[1].correction}`;
          }
          break;
        case 3: // Mandala --> carmin, ocre jaune, turquoise, pourpre
          texte = `${pb_4_f[0].enonce} <br> ${pb_4_f[0].question}`;
          if (this.debug) {
            texte += `<br>`;
            texte += `<br> ${pb_4_f[0].correction}`;
            texte_corr = ``;
          } else {
            texte_corr = `${pb_4_f[0].correction}`;
          }
          break;
        case 4: // Jardin --> légumes, plantes aromatiques, semis, fraisiers
          texte = `${pb_4_f[1].enonce} <br> ${pb_4_f[1].question}`;
          if (this.debug) {
            texte += `<br>`;
            texte += `<br> ${pb_4_f[1].correction}`;
            texte_corr = ``;
          } else {
            texte_corr = `${pb_4_f[1].correction}`;
          }
          break;
        case 5: // Stade --> pays organisatuers, supporters, sponsors, vente libre
          texte = `${pb_4_f[2].enonce} <br> ${pb_4_f[2].question}`;
          if (this.debug) {
            texte += `<br>`;
            texte += `<br> ${pb_4_f[2].correction}`;
            texte_corr = ``;
          } else {
            texte_corr = `${pb_4_f[2].correction}`;
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
    liste_de_question_to_contenu(this);
  };
  //this.besoin_formulaire_numerique = ['Niveau de difficulté',4,"1 : nombre enier positif\n2 : nombre décimal positif\n3 : nombre enier positif inférieur à un\n4 : Mélange"];
}

/**
 * Problème avec lecture de représentation graphique d'une fonction
 * @Auteur Rémi Angot
 * Référence 4F12
 */
function Exploiter_representation_graphique() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre =
    "Problème s'appuyant sur la lecture d'une représentation graphique";
  this.consigne = "";
  this.nb_questions = 1;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.nb_questions_modifiable = false;
  this.sup = 4;

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_probleme
    if (this.sup == 1) {
      type_de_probleme = "projectile"
    }
    if (this.sup == 2) {
      type_de_probleme = "velo"
    }
    if (this.sup == 3) {
      type_de_probleme = "temperature"
    }
    if (this.sup == 4) {
      type_de_probleme = choice(["temperature", "projectile", "velo"]);
    }
    let a, b, c, d, f, t1, t2, l1, l2, l3, g1, g2, r, graphique, texte1, texte2;
    switch (type_de_probleme) {
      case "projectile":
        // Parabole qui a pour zéro, 0 et 6,8 ou 10
        // Et qui a pour maximum un multiple de 5
        t1 = choice([6, 8, 10]);
        a = (1 / ((-t1 / 2) * (t1 / 2 - t1))) * choice([10, 15, 20, 25, 30]); // on divise par l'image du max et on multiplie par la valeur souhaitée
        f = (x) => calcul(-a * x * (x - t1));

        // Mettre des dixièmes de secondes à la place des secondes
        let xscale = choice([1, 0.1]);
        g1 = grille(-1, -1, t1 + 2, 8);
        g1.color = "black";
        g1.opacite = 1;
        g2 = grille(-1, -1, t1 + 2, 8, "gray", 0.2, 0.2);
        g3 = axes(0, 0, t1 + 1, 8);
        texte1 = texteParPosition("hauteur (en mètre)", 0.2, 7.3, "droite");
        l1 = labelX(0, calcul((t1 + 1) * xscale), 1, "black", -0.6, xscale);
        l2 = labelY(5, 35, 1, "black", -0.6, 5);
        graphique = courbe(f, 0, t1, "blue", 2, [1, 5]);
        texte2 = texteParPosition("temps (en s)", t1 + 0.5, 0.4, "droite");

        this.introduction =
          "On a représenté ci-dessous l’évolution de la hauteur d’un projectile lancé depuis le sol (en mètre) en fonction du temps (en seconde).";

        this.introduction +=
          "<br><br>" +
          mathalea2d(
            {
              xmin: -1,
              ymin: -1,
              xmax: t1 + 3,
              ymax: 8,
              pixelsParCm: 30,
              scale: .6,
            },
            g1,
            g2,
            g3,
            graphique,
            texte1,
            texte2,
            l1,
            l2
          );

        this.introduction +=
          "<br><br>" +
          "À l’aide de ce graphique, répondre aux questions suivantes :";

        this.liste_questions.push(
          "Au bout de combien de temps le projectile retombe-t-il au sol ?"
        );
        this.liste_corrections.push(
          `Au bout de ${tex_nombrec(
            t1 * xscale
          )} s, le projectile retombe au sol car la courbe passe par le point de coordonnées $(${tex_nombrec(
            t1 * xscale
          )}~;~0)$.`
        );

        this.liste_questions.push(
          "Quelle est la hauteur maximale atteinte par le projectile ?"
        );
        this.liste_corrections.push(
          `Le point le plus haut de la courbe a pour abscisse $${tex_nombrec(
            (t1 / 2) * xscale
          )}$ et pour ordonnée $${f(
            t1 / 2
          )}$ donc la hauteur maximale est de $${f(t1 / 2)}$ m.`
        );

        break;
      case 'velo':
        let v1 = randint(1, 4)
        let v2 = randint(1, 3, v1)
        let v3 = v1 + v2
        g1 = grille(-1, -1, 6, 8)
        g1.color = 'black'
        g1.opacite = 1
        g2 = grille(-1, -1, 6, 8, 'gray', .2, .2)
        g3 = axes(0, 0, 6, 7)
        texte1 = texteParPosition('distance (en km)', 0.2, 7.3, 'droite')
        l1 = labelX(0, 50, 1, 'black', -.6, 10)
        l2 = labelY(1, 6, 1, 'black', -.6, 1)
        texte2 = texteParPosition('temps (en min)', 6.5, 0.4, 'droite')
        let situation = randint(1, 3)
        let tempsPause
        let periodeRapide
        if (situation == 1) {
          l = polyline(point(0, 0), point(1, v1), point(2, v1 + v2), point(3, v1 + v2), point(4, 0))
          tempsPause = 20
          periodeRapide = 'de la 20e à la 30e minute'
        }
        if (situation == 2) {
          l = polyline(point(0, 0), point(1, v3), point(2, v3), point(3, v2), point(4, 0))
          tempsPause = 10
          periodeRapide = 'durant les 10 premières minutes'

        }
        if (situation == 3) {
          l = polyline(point(0, 0), point(1, v3), point(2, v2), point(3, v2), point(4, 0))
          tempsPause = 20
          periodeRapide = 'durant les 10 premières minutes'
        }
        l.epaisseur = 2
        l.color = 'blue'

        fille = prenomF()
        this.introduction = `${fille} fait du vélo avec son smartphone sur une voie-verte rectiligne qui part de chez elle. Une application lui permet de voir à quelle distance de chez elle, elle se trouve.`

        this.introduction += '<br><br>' + mathalea2d({
          xmin: -1,
          ymin: -1,
          xmax: 9,
          ymax: 8,
          pixelsParCm: 40,
        }, g1, g2, g3, l, texte1, texte2, l1, l2)

        this.introduction += '<br><br>' + 'À l’aide de ce graphique, répondre aux questions suivantes :'

        this.liste_questions.push('Pendant combien de temps a-t-elle fait du vélo ?')
        this.liste_corrections.push(`Elle a fait du vélo pendant 40 minutes.`)

        this.liste_questions.push('Quelle distance a-t-elle parcourue au total ?')
        this.liste_corrections.push(`Le point le plus loin de sa maison est à ${v3} km et ensuite elle revient chez elle, donc la distance totale est de ${2 * v3} km.`)

        this.liste_questions.push(`Que se passe-t-il après ${tempsPause} minutes de vélo ?`)
        this.liste_corrections.push(`La distance reste constante alors qu'elle est sur un chemin rectiligne. Elle a donc fait une pause.`)

        this.liste_questions.push('À quel moment a-t-elle été la plus rapide ?')
        this.liste_corrections.push(`Elle a été la plus rapide ${periodeRapide} où elle a effectué ${v3} km en 10 minutes.`)


        break;
      case "temperature":
        let hmin = randint(2, 4)
        let hmax = randint(12, 16)
        let tmin = randint(-5, 15)
        let tmax = tmin + randint(5, 12)

        r = repere({
          xmin: 0,
          ymin: tmin - 1,
          ymax: tmax + 2,
          xmax: 24,
          xscale: 2,
          legendeX: "Heure",
          legendeY: "Température (en °C)",
        });
        graphique = courbeInterpolee(
          [
            [-2, tmin + 2],
            [hmin, tmin],
            [hmax, tmax],
            [26, tmin + 2],
          ],
          "blue",
          2,
          r,
          0,
          24
        );
        this.introduction =
          "On a représenté ci-dessous l’évolution de la température sur une journée.";
        this.introduction +=
          "<br><br>" +
          mathalea2d(
            {
              xmin: -1,
              ymin: tmin - 2.5,
              xmax: 16,
              ymax: tmax + 3,
              pixelsParCm: 40,
            },
            r,
            graphique
          );

        this.introduction +=
          "<br><br>" +
          "À l’aide de ce graphique, répondre aux questions suivantes :";

        this.liste_questions.push(
          "Quelle est la température la plus froide de la journée ?"
        );
        this.liste_corrections.push(`La température la plus basse est ${tmin}°C.`)

        this.liste_questions.push(
          "Quelle est la température la plus chaude de la journée ?"
        );
        this.liste_corrections.push(`La température la plus élevée de la journée est ${tmax}°C.`)
        this.liste_questions.push(
          "À quelle heure fait-il le plus chaud ?"
        );
        this.liste_corrections.push(`C'est à ${hmax} h qu'il fait le plus chaud.`)
        this.liste_questions.push(
          "À quelle heure fait-il le plus froid ?"
        );
        this.liste_corrections.push(`C'est à ${hmin} h qu'il fait le plus froid.`)


        break;
    }

    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = ['Choix du problème', 3, "1 : Projectile\n2 : Trajet à vélo\n3 : Température\n4 : Au hasard"];
}

/**
 * Tester si un nombre est solution d'une équation
 * * 4L14-0
 * * adaptation de l'exo 5L14 de Rémi Angot
 * @author Sébastien Lozano
 */
function Tester_si_un_nombre_est_solution_d_une_equation() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Tester si un nombre est solution d'une équation";
  this.consigne = "";
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.sup = 1;
  //this.sup2=false;
  if (this.exo == "4L14-1") {
    this.nb_questions = 4;
  } else if (this.exo == "4L14-2") {
    this.nb_questions = 3;
  } else {
    this.nb_questions = 9;
  }

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles;
    if (this.exo == "4L14-1") {
      //type_de_questions_disponibles = [1, 2, 3, 4, 5, 8];
      type_de_questions_disponibles = [choice([1, 2]), 3, choice([4, 5]), 8];
    } else if (this.exo == "4L14-2") {
      type_de_questions_disponibles = [9, 6, 7];
    } else {
      type_de_questions_disponibles = [1, 2, 3, 4, 5, 8, 6, 7, 9];
    }
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    //let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées --> à remettre comme ci dessus
    this.consigne = `Justifier si les nombres proposés sont des solutions de l'équation donnée ou non.`;

    for (
      let i = 0, texte, texte_corr, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      let a, b, c, d, x1, x2, x3;
      switch (liste_type_de_questions[i]) {
        case 1: // 3x-a=2x+b   x=a+b
          if (this.sup == 1) {
            a = randint(1, 6);
            b = randint(1, 6, [a]);
            x2 = a + b;
            x1 = randint(2, 10, [x2]);
          } else {
            a = randint(-6, 6, [0]);
            b = randint(-6, 6, [a, 0]);
            x2 = a + b;
            x1 = randint(-10, 10, [0, x2]);
          }

          texte = `$3x-${ecriture_parenthese_si_negatif(
            a
          )}=2x+${ecriture_parenthese_si_negatif(
            b
          )}~$ pour $~x=${x1}~$ puis pour $~x=${x2}$`;
          texte_corr = `Pour $x=${x1}$ : <br>`;
          texte_corr += `$3x-${ecriture_parenthese_si_negatif(
            a
          )}=3\\times ${ecriture_parenthese_si_negatif(
            x1
          )}-${ecriture_parenthese_si_negatif(a)}=${3 * x1 - a
            }$ <br> $2x+${ecriture_parenthese_si_negatif(
              b
            )}=2\\times ${ecriture_parenthese_si_negatif(
              x1
            )}+${ecriture_parenthese_si_negatif(b)}=${2 * x1 + b}$<br>`;
          texte_corr += `$${3 * x1 - a}\\not=${2 * x1 + b
            }$ donc l'égalité n'est pas vraie.<br>`;
          texte_corr += `${texte_en_couleur(
            `$x=${x1}$ n'est donc pas solution de l'équation $3x-${ecriture_parenthese_si_negatif(
              a
            )}=2x+${ecriture_parenthese_si_negatif(b)}~$`
          )}<br><br>`;
          texte_corr += `Pour $x=${ecriture_parenthese_si_negatif(x2)}$ : <br>`;
          texte_corr += `$3x-${ecriture_parenthese_si_negatif(
            a
          )}=3\\times ${ecriture_parenthese_si_negatif(
            x2
          )}-${ecriture_parenthese_si_negatif(a)}=${3 * x2 - a
            }$ <br> $2x+${ecriture_parenthese_si_negatif(
              b
            )}=2\\times ${ecriture_parenthese_si_negatif(
              x2
            )}+${ecriture_parenthese_si_negatif(b)}=${2 * x2 + b}$<br>`;
          texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.<br>`;
          texte_corr += `${texte_en_couleur(
            `$x=${x2}$ est donc solution de l'équation $3x-${ecriture_parenthese_si_negatif(
              a
            )}=2x+${ecriture_parenthese_si_negatif(b)}~$`
          )}`;
          break;
        case 2: // 3x+a=5x-b   x=(a+b)/2 donc a et b impairs pour une solution entière
          if (this.sup == 1) {
            a = randint(1, 9);
            b = randint(0, 4) * 2 + (a % 2);
            x1 = parseInt(Algebrite.eval((a + b) / 2));
            x2 = randint(1, 9, x1);
          } else {
            a = randint(-9, 9, [0]);
            b = randint(-4, 4, [a, 0]) * 2 + (a % 2);
            x1 = parseInt(Algebrite.eval((a + b) / 2));
            x2 = randint(-9, 9, [0, x1]);
          }

          texte = `$3x+${ecriture_parenthese_si_negatif(
            a
          )}=5x-${ecriture_parenthese_si_negatif(
            b
          )}~$ pour $~x=${x1}~$ puis pour $~x=${x2}$`;
          texte_corr = `Pour $x=${x1}$ : <br>`;
          texte_corr += `$3x+${ecriture_parenthese_si_negatif(
            a
          )}=3\\times ${ecriture_parenthese_si_negatif(
            x1
          )}+${ecriture_parenthese_si_negatif(a)}=${3 * x1 + a
            }$ <br> $5x-${ecriture_parenthese_si_negatif(
              b
            )}=5\\times ${ecriture_parenthese_si_negatif(
              x1
            )}-${ecriture_parenthese_si_negatif(b)}=${5 * x1 - b}$<br>`;
          texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.<br>`;
          texte_corr += `${texte_en_couleur(
            `$x=${x1}$ est donc solution de l'équation $3x+${ecriture_parenthese_si_negatif(
              a
            )}=5x-${ecriture_parenthese_si_negatif(b)}~$`
          )}<br><br>`;
          texte_corr += `Pour $x=${x2}$ : <br>`;
          texte_corr += `$3x+${ecriture_parenthese_si_negatif(
            a
          )}=3\\times ${ecriture_parenthese_si_negatif(
            x2
          )}+${ecriture_parenthese_si_negatif(a)}=${3 * x2 + a
            }$ <br> $5x-${ecriture_parenthese_si_negatif(
              b
            )}=5\\times ${ecriture_parenthese_si_negatif(
              x2
            )}-${ecriture_parenthese_si_negatif(b)}=${5 * x2 - b}$<br>`;
          texte_corr += `$${3 * x2 + a}\\not=${5 * x2 - b
            }$ donc l'égalité n'est pas vraie.<br>`;
          texte_corr += `${texte_en_couleur(
            `$x=${x2}$ n'est donc pas solution de l'équation $3x+${ecriture_parenthese_si_negatif(
              a
            )}=5x-${ecriture_parenthese_si_negatif(b)}~$`
          )}`;
          break;
        case 3: // 10(x-a)=4(2x+b) x=(10a+4b)/2
          if (this.sup == 1) {
            a = randint(1, 3);
            b = randint(1, 3);
            x2 = parseInt(Algebrite.eval((10 * a + 4 * b) / 2));
            x1 = randint(1, 9, x2);
          } else {
            a = randint(-3, 3, [0]);
            b = randint(-3, 3, [0]);
            x2 = parseInt(Algebrite.eval((10 * a + 4 * b) / 2));
            x1 = randint(-9, 9, [0, x2]);
          }

          texte = `$10(x-${ecriture_parenthese_si_negatif(
            a
          )})=4(2x+${ecriture_parenthese_si_negatif(
            b
          )})~$ pour $~x=${x1}~$ puis pour $~x=${x2}$`;
          texte_corr = `Pour $x=${x1}$ : <br>`;
          texte_corr += `$10(x-${ecriture_parenthese_si_negatif(
            a
          )})=10\\times (${ecriture_parenthese_si_negatif(
            x1
          )}-${ecriture_parenthese_si_negatif(a)})=10\\times ${x1 - a}=${10 * (x1 - a)
            }$ <br> $4(2x+${ecriture_parenthese_si_negatif(
              b
            )})=4\\times (2\\times ${ecriture_parenthese_si_negatif(
              x1
            )}+${ecriture_parenthese_si_negatif(b)})=4\\times ${2 * x1 + b}=${4 * (2 * x1 + b)
            }$<br>`;
          texte_corr += `$${10 * (x1 - a)}\\not=${4 * (2 * x1 + b)
            }$ donc l'égalité n'est pas vraie.<br>`;
          texte_corr += `${texte_en_couleur(
            `$x=${x1}$ n'est donc pas solution de l'équation $10(x-${ecriture_parenthese_si_negatif(
              a
            )})=4(2x+${ecriture_parenthese_si_negatif(b)})~$`
          )}<br><br>`;
          texte_corr += `Pour $x=${x2}$ : <br>`;
          texte_corr += `$10(x-${ecriture_parenthese_si_negatif(
            a
          )})=10\\times (${ecriture_parenthese_si_negatif(
            x2
          )}-${ecriture_parenthese_si_negatif(a)})=10\\times ${x2 - a}=${10 * (x2 - a)
            }$ <br> $4(2x+${ecriture_parenthese_si_negatif(
              b
            )})=4\\times (2\\times ${ecriture_parenthese_si_negatif(
              x2
            )}+${ecriture_parenthese_si_negatif(b)})=4\\times ${2 * x2 + b}=${4 * (2 * x2 + b)
            }$<br>`;
          texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.<br>`;
          texte_corr += `${texte_en_couleur(
            `$x=${x2}$ est donc solution de l'équation $10(x-${ecriture_parenthese_si_negatif(
              a
            )})=4(2x+${ecriture_parenthese_si_negatif(b)})~$`
          )}`;
          break;
        case 4: // ax+b=(a+1)x-c x=b+c
          if (this.sup == 1) {
            a = randint(2, 9);
            b = randint(2, 9);
            c = randint(1, 3);
            x1 = b + c;
            x2 = randint(2, 10, x1);
          } else {
            a = randint(2, 9);
            b = randint(2, 9) * randint(-1, 1, 0);
            c = randint(1, 3) * randint(-1, 1, 0);
            x1 = b + c;
            x2 = randint(2, 10, x1) * randint(-1, 1, 0);
          }

          texte = `$${ecriture_parenthese_si_negatif(
            a
          )}x+${ecriture_parenthese_si_negatif(b)}=${a + 1
            }x-${ecriture_parenthese_si_negatif(
              c
            )}~$ pour $~x=${x1}~$ puis pour $~x=${x2}$`;
          texte_corr = `Pour $x=${x1}$ : <br>`;
          texte_corr += `$${a}x+${ecriture_parenthese_si_negatif(
            b
          )}=${ecriture_parenthese_si_negatif(
            a
          )}\\times ${ecriture_parenthese_si_negatif(
            x1
          )}+${ecriture_parenthese_si_negatif(b)}=${a * x1 + b}$ <br> $${a + 1
            }x-${ecriture_parenthese_si_negatif(c)}=${a + 1
            }\\times ${ecriture_parenthese_si_negatif(
              x1
            )}-${ecriture_parenthese_si_negatif(c)}=${(a + 1) * x1 - c}$<br>`;
          texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.<br>`;
          texte_corr += `${texte_en_couleur(
            `$x=${x1}$ est donc solution de l'équation $${ecriture_parenthese_si_negatif(
              a
            )}x+${ecriture_parenthese_si_negatif(b)}=${a + 1
            }x-${ecriture_parenthese_si_negatif(c)}~$`
          )}<br><br>`;
          texte_corr += `Pour $x=${x2}$ : <br>`;
          texte_corr += `$${a}x+${ecriture_parenthese_si_negatif(
            b
          )}=${ecriture_parenthese_si_negatif(
            a
          )}\\times ${ecriture_parenthese_si_negatif(
            x2
          )}+${ecriture_parenthese_si_negatif(b)}=${a * x2 + b}$ <br> $${a + 1
            }x-${ecriture_parenthese_si_negatif(c)}=${a + 1
            }\\times ${ecriture_parenthese_si_negatif(
              x2
            )}-${ecriture_parenthese_si_negatif(c)}=${(a + 1) * x2 - c}$<br>`;
          texte_corr += `$${a * x2 + b}\\not=${(a + 1) * x2 - c
            }$ donc l'égalité n'est pas vraie.<br>`;
          texte_corr += `${texte_en_couleur(
            `$x=${x1}$ n'est donc pas solution de l'équation $${ecriture_parenthese_si_negatif(
              a
            )}x+${ecriture_parenthese_si_negatif(b)}=${a + 1
            }x-${ecriture_parenthese_si_negatif(c)}~$`
          )}<br><br>`;
          break;
        case 5: // a-2x=b+2x x=(a-b)/4
          if (this.sup == 1) {
            x1 = randint(1, 9);
            b = randint(1, 9);
            a = b + 4 * x1;
            x2 = randint(1, 11, x1);
          } else {
            x1 = randint(-9, 9);
            b = randint(-9, 9, 0);
            a = b + 4 * x1;
            x2 = randint(1, 11, x1);
          }

          texte = `$${a}-2x=${b}+2x~$ pour $~x=${x1}~$ puis pour $~x=${x2}$`;
          texte_corr = `Pour $x=${x1}$ : <br>`;
          texte_corr += `$${a}-2x=${a}-2\\times ${ecriture_parenthese_si_negatif(
            x1
          )}=${a - 2 * x1
            }$ <br> $${b}+2x=${b}+2\\times ${ecriture_parenthese_si_negatif(
              x1
            )}=${b + 2 * x1}$<br>`;
          texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.<br>`;
          texte_corr += `${texte_en_couleur(
            `$x=${x1}$ est donc solution de l'équation $${a}-2x=${b}+2x~$`
          )}<br><br>`;
          texte_corr += `Pour $x=${x2}$ : <br>`;
          texte_corr += `$${a}-2x=${a}-2\\times ${ecriture_parenthese_si_negatif(
            x2
          )}=${a - 2 * x2
            }$ <br> $${b}+2x=${b}+2\\times ${ecriture_parenthese_si_negatif(
              x2
            )}=${b + 2 * x2}$<br>`;
          texte_corr += `$${a - 2 * x2}\\not=${b + 2 * x2
            }$ donc l'égalité n'est pas vraie.<br>`;
          texte_corr += `${texte_en_couleur(
            `$x=${x1}$ n'est donc pas solution de l'équation $${a}-2x=${b}+2x~$`
          )}<br><br>`;
          break;
        case 6: // ax-ab=x²-bx (a-x)(x-b)=0 solutions a et b.
          if (this.sup == 1) {
            b = randint(2, 9);
            a = randint(2, 9, [b]);
            x3 = b;
            x1 = a;
            x2 = randint(1, 9, [x1, x3]);
          } else {
            a = randint(-9, 9, [0, 1]);
            b = randint(-9, 9, [0, a]);
            x1 = a;
            x3 = b;
            x2 = randint(-9, 9, [x1, x3]);
          }
          texte = `$${a}x-${ecriture_parenthese_si_negatif(
            a * b
          )}=x^2-${ecriture_parenthese_si_negatif(
            b
          )}x~$ pour $~x=${x1}~$ , pour $~x=${x2}~$ puis pour $~x=${x3}$`;
          texte_corr = `Pour $x=${x1}$ : <br>`;
          texte_corr += `$${a}x-${ecriture_parenthese_si_negatif(
            a * b
          )}=${a}\\times ${ecriture_parenthese_si_negatif(
            x1
          )}-${ecriture_parenthese_si_negatif(a * b)}=${a * x1 - a * b
            }$ <br> $x^2-${ecriture_parenthese_si_negatif(
              b
            )}\\times  x=${ecriture_parenthese_si_negatif(
              x1
            )}^2-${ecriture_parenthese_si_negatif(
              b
            )}\\times ${ecriture_parenthese_si_negatif(x1)}=${x1 * x1
            }-${ecriture_parenthese_si_negatif(b * x1)}=${x1 * x1 - b * x1}$<br>`;
          texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.<br>`;
          texte_corr += `${texte_en_couleur(
            `$x=${x1}$ est donc solution de l'équation $${a}x-${ecriture_parenthese_si_negatif(
              a * b
            )}=x^2-${ecriture_parenthese_si_negatif(b)}x~$`
          )}<br><br>`;
          texte_corr += `Pour $x=${x2}$ : <br>`;
          texte_corr += `$${a}x-${ecriture_parenthese_si_negatif(
            a * b
          )}=${a}\\times ${ecriture_parenthese_si_negatif(
            x2
          )}-${ecriture_parenthese_si_negatif(a * b)}=${a * x2 - a * b
            }$ <br> $x^2-${b}\\times  x=${ecriture_parenthese_si_negatif(
              x2
            )}^2-${ecriture_parenthese_si_negatif(
              b
            )}\\times ${ecriture_parenthese_si_negatif(x2)}=${x2 * x2
            }-${ecriture_parenthese_si_negatif(b * x2)}=${x2 * x2 - b * x2}$<br>`;
          texte_corr += `$${a * x2 - a * b}\\not=${x2 * x2 - b * x2
            }$ donc l'égalité n'est pas vraie.<br>`;
          texte_corr += `${texte_en_couleur(
            `$x=${x2}$ n'est donc pas solution de l'équation $${a}x-${ecriture_parenthese_si_negatif(
              a * b
            )}=x^2-${ecriture_parenthese_si_negatif(b)}x~$`
          )}<br><br>`;
          texte_corr += `Pour $x=${x3}$ : <br>`;
          texte_corr += `$${a}x-${ecriture_parenthese_si_negatif(
            a * b
          )}=${a}\\times ${ecriture_parenthese_si_negatif(
            x3
          )}-${ecriture_parenthese_si_negatif(a * b)}=${a * x3 - a * b
            }$ <br> $x^2-${b}\\times  x=${ecriture_parenthese_si_negatif(
              x3
            )}^2-${ecriture_parenthese_si_negatif(
              b
            )}\\times ${ecriture_parenthese_si_negatif(x3)}=${x3 * x3
            }-${ecriture_parenthese_si_negatif(b * x3)}=${x3 * x3 - b * x3}$<br>`;
          texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.<br>`;
          texte_corr += `${texte_en_couleur(
            `$x=${x3}$ est donc solution de l'équation $${a}x-${ecriture_parenthese_si_negatif(
              a * b
            )}=x^2-${ecriture_parenthese_si_negatif(b)}x~$`
          )}`;
          break;
        case 7: // adx-bd=acx²-bcx  --- (ax-b)(d-cx)=0 solutions b/a et d/c.
          if (this.sup == 1) {
            c = randint(2, 5);
            a = randint(2, 5);
            x2 = randint(2, 6);
            x3 = randint(2, 6, x2);
            x1 = randint(1, 7, [x2, x3]);
            b = a * x2;
            d = c * x3;
          } else {
            c = randint(2, 5) * randint(-1, 1, 0);
            a = randint(2, 5) * randint(-1, 1, 0);
            x2 = randint(1, 6) * randint(-1, 1, 0);
            x3 = randint(1, 6, x2) * randint(-1, 1, 0);
            x1 = randint(1, 7, [x2, x3]) * randint(-1, 1, 0);
            b = a * x2;
            d = c * x3;
          }
          texte = `$${a * d}x-${ecriture_parenthese_si_negatif(b * d)}=${a * c
            }x^2-${ecriture_parenthese_si_negatif(
              b * c
            )}x~$ pour $~x=${x1}~$, pour $~x=${x2}~$ puis pour $~x=${x3}$`;
          texte_corr = `Pour $x=${x1}$ : <br>`;
          texte_corr += `$${a * d}x-${ecriture_parenthese_si_negatif(b * d)}=${a * d
            }\\times ${ecriture_parenthese_si_negatif(
              x1
            )}-${ecriture_parenthese_si_negatif(b * d)}=${a * d * x1 - d * b
            }$ <br> $${a * c}x^2-${ecriture_parenthese_si_negatif(b * c)}x=${a * c
            }\\times ${ecriture_parenthese_si_negatif(
              x1
            )}^2-${ecriture_parenthese_si_negatif(
              b * c
            )}\\times ${ecriture_parenthese_si_negatif(x1)}=${a * c * x1 * x1
            }-${ecriture_parenthese_si_negatif(b * c * x1)}=${a * c * x1 * x1 - b * c * x1
            }$<br>`;
          texte_corr += `$${a * d * x1 - d * b}\\not=${a * c * x1 * x1 - b * c * x1
            }$ donc l'égalité n'est pas vraie.<br>`;
          texte_corr += `${texte_en_couleur(
            `$x=${x1}$ n'est donc pas solution de l'équation $${a * d
            }x-${ecriture_parenthese_si_negatif(b * d)}=${a * c
            }x^2-${ecriture_parenthese_si_negatif(b * c)}x~$`
          )}<br><br>`;
          texte_corr += `Pour $x=${x2}$ : <br>`;
          texte_corr += `$${a * d}x-${ecriture_parenthese_si_negatif(b * d)}=${a * d
            }\\times ${ecriture_parenthese_si_negatif(
              x2
            )}-${ecriture_parenthese_si_negatif(b * d)}=${a * d * x2 - d * b
            }$ <br> $${a * c}x^2-${ecriture_parenthese_si_negatif(b * c)}x=${a * c
            }\\times ${ecriture_parenthese_si_negatif(
              x2
            )}^2-${ecriture_parenthese_si_negatif(
              b * c
            )}\\times ${ecriture_parenthese_si_negatif(x2)}=${a * c * x2 * x2
            }-${ecriture_parenthese_si_negatif(b * c * x2)}=${a * c * x2 * x2 - b * c * x2
            }$<br>`;
          texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.<br>`;
          texte_corr += `${texte_en_couleur(
            `$x=${x2}$ est donc solution de l'équation $${a * d
            }x-${ecriture_parenthese_si_negatif(b * d)}=${a * c
            }x^2-${ecriture_parenthese_si_negatif(b * c)}x~$`
          )}<br><br>`;
          texte_corr += `Pour $x=${x3}$ : <br>`;
          texte_corr += `$${a * d}x-${ecriture_parenthese_si_negatif(b * d)}=${a * d
            }\\times ${ecriture_parenthese_si_negatif(
              x3
            )}-${ecriture_parenthese_si_negatif(b * d)}=${a * d * x3 - d * b
            }$ <br> $${a * c}x^2-${ecriture_parenthese_si_negatif(b * c)}x=${a * c
            }\\times ${ecriture_parenthese_si_negatif(
              x3
            )}^2-${ecriture_parenthese_si_negatif(
              b * c
            )}\\times ${ecriture_parenthese_si_negatif(x3)}=${a * c * x3 * x3
            }-${ecriture_parenthese_si_negatif(b * c * x3)}=${a * c * x3 * x3 - b * c * x3
            }$<br>`;
          texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.<br>`;
          texte_corr += `${texte_en_couleur(
            `$x=${x3}$ est donc solution de l'équation $${a * d
            }x-${ecriture_parenthese_si_negatif(b * d)}=${a * c
            }x^2-${ecriture_parenthese_si_negatif(b * c)}x~$`
          )}`;
          break;
        case 8: // 12x-4a=4(2x+b) x=(4a+4b)/4
          if (this.sup == 1) {
            a = randint(1, 3);
            b = randint(1, 3);
            x2 = parseInt(Algebrite.eval((4 * a + 4 * b) / 4));
            x1 = randint(9, x2);
          } else {
            a = randint(-3, 3, [0]);
            b = randint(-3, 3, [0]);
            x2 = parseInt(Algebrite.eval((4 * a + 4 * b) / 4));
            x1 = randint(-9, 9, [0, x2]);
          }

          texte = `$12x-${ecriture_parenthese_si_negatif(
            4 * a
          )}=4(2x+${ecriture_parenthese_si_negatif(
            b
          )})~$ pour $~x=${x1}~$ puis pour $~x=${x2}$`;
          texte_corr = `Pour $x=${x1}$ : <br>`;
          texte_corr += `$12x-${ecriture_parenthese_si_negatif(
            4 * a
          )}=12\\times ${ecriture_parenthese_si_negatif(
            x1
          )}-${ecriture_parenthese_si_negatif(4 * a)}=${12 * x1 - 4 * a
            }$ <br> $4(2x+${ecriture_parenthese_si_negatif(
              b
            )})=4\\times (2\\times ${ecriture_parenthese_si_negatif(
              x1
            )}+${ecriture_parenthese_si_negatif(b)})=4\\times ${2 * x1 + b}=${4 * (2 * x1 + b)
            }$<br>`;
          texte_corr += `$${12 * x1 - 4 * a}\\not=${4 * (2 * x1 + b)
            }$ donc l'égalité n'est pas vraie.<br>`;
          texte_corr += `${texte_en_couleur(
            `$x=${x1}$ n'est donc pas solution de l'équation $12x-${ecriture_parenthese_si_negatif(
              4 * a
            )}=4(2x+${ecriture_parenthese_si_negatif(b)})~$`
          )}<br><br>`;
          texte_corr += `Pour $x=${x2}$ : <br>`;
          texte_corr += `$12x-${ecriture_parenthese_si_negatif(
            4 * a
          )}=12\\times ${ecriture_parenthese_si_negatif(
            x2
          )}-${ecriture_parenthese_si_negatif(4 * a)}=${12 * x2 - 4 * a
            }$ <br> $4(2x+${ecriture_parenthese_si_negatif(
              b
            )})=4\\times (2\\times ${ecriture_parenthese_si_negatif(
              x2
            )}+${ecriture_parenthese_si_negatif(b)})=4\\times ${2 * x2 + b}=${4 * (2 * x2 + b)
            }$<br>`;
          texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.<br>`;
          texte_corr += `${texte_en_couleur(
            `$x=${x1}$ est donc solution de l'équation $12x-${ecriture_parenthese_si_negatif(
              4 * a
            )}=4(2x+${ecriture_parenthese_si_negatif(b)})~$`
          )}<br><br>`;
          break;
        case 9: // x²-bx-ax+ab=0 (a-x)(x-b)=0 solutions a et b.
          if (this.sup == 1) {
            b = randint(2, 9);
            a = randint(2, 9);
            x3 = b;
            x1 = a;
            x2 = randint(1, 9, [x1, x3]);
          } else {
            do {
              a = randint(-9, 9, [0, 1]);
              b = randint(-9, 9, [0, a]);
              x1 = a;
              x3 = b;
              x2 = randint(-9, 9, [x1, x3]);
            } while (a + b == 0 || a + b == 1);
          }
          texte = `$x^2-${ecriture_parenthese_si_negatif(
            b + a
          )}x+${ecriture_parenthese_si_negatif(
            a * b
          )}=0~$ pour $~x=${x1}~$ , pour $~x=${x2}~$ puis pour $~x=${x3}$`;
          texte_corr = `Pour $x=${x1}$ : <br>`;
          texte_corr += `$x^2-${ecriture_parenthese_si_negatif(
            b + a
          )}\\times  x+${ecriture_parenthese_si_negatif(
            a * b
          )}=${ecriture_parenthese_si_negatif(
            x1
          )}^2-${ecriture_parenthese_si_negatif(
            a + b
          )}\\times ${ecriture_parenthese_si_negatif(
            x1
          )}+${ecriture_parenthese_si_negatif(a * b)}=${x1 * x1
            }-${ecriture_parenthese_si_negatif(
              (a + b) * x1
            )}+${ecriture_parenthese_si_negatif(a * b)}=${x1 * x1 - (a + b) * x1 + a * b
            }$<br>`;
          texte_corr += `On trouve bien $0$ pour le membre de gauche donc l'égalité est vraie.<br>`;
          texte_corr += `${texte_en_couleur(
            `$x=${x1}$ est donc solution de l'équation $x^2-${ecriture_parenthese_si_negatif(
              b + a
            )}x-${ecriture_parenthese_si_negatif(a * b)}=0~$`
          )}<br><br>`;
          texte_corr += `Pour $x=${x2}$ : <br>`;
          texte_corr += `$x^2-${ecriture_parenthese_si_negatif(
            b + a
          )}\\times  x+${ecriture_parenthese_si_negatif(
            a * b
          )}=${ecriture_parenthese_si_negatif(
            x2
          )}^2-${ecriture_parenthese_si_negatif(
            a + b
          )}\\times ${ecriture_parenthese_si_negatif(
            x2
          )}+${ecriture_parenthese_si_negatif(a * b)}=${x2 * x2
            }-${ecriture_parenthese_si_negatif(
              (a + b) * x2
            )}+${ecriture_parenthese_si_negatif(a * b)}=${x2 * x2 - (a + b) * x2 + a * b
            }$<br>`;
          texte_corr += `$${x2 * x2 - (a + b) * x2 + a * b
            }\\not=0$ donc l'égalité n'est pas vraie.<br>`;
          texte_corr += `${texte_en_couleur(
            `$x=${x2}$ n'est donc pas solution de l'équation $x^2-${ecriture_parenthese_si_negatif(
              b + a
            )}x-${ecriture_parenthese_si_negatif(a * b)}=0~$`
          )}<br><br>`;
          texte_corr += `Pour $x=${x3}$ : <br>`;
          texte_corr += `$x^2-${ecriture_parenthese_si_negatif(
            b + a
          )}\\times  x+${ecriture_parenthese_si_negatif(
            a * b
          )}=${ecriture_parenthese_si_negatif(
            x3
          )}^2-${ecriture_parenthese_si_negatif(
            a + b
          )}\\times ${ecriture_parenthese_si_negatif(
            x3
          )}+${ecriture_parenthese_si_negatif(a * b)}=${x3 * x3
            }-${ecriture_parenthese_si_negatif(
              (a + b) * x3
            )}+${ecriture_parenthese_si_negatif(a * b)}=${x3 * x3 - (a + b) * x3 + a * b
            }$<br>`;
          texte_corr += `On trouve bien $0$ pour le membre de gauche donc l'égalité est vraie.<br>`;
          texte_corr += `${texte_en_couleur(
            `$x=${x3}$ est donc solution de l'équation $x^2-${ecriture_parenthese_si_negatif(
              b + a
            )}x-${ecriture_parenthese_si_negatif(a * b)}=0~$`
          )}`;
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
    "Niveau de difficulté",
    2,
    "1 : Entiers naturels\n2 : Entiers relatifs",
  ];
  //this.besoin_formulaire2_case_a_cocher = ["Avec des équations du second degré"];
}

/**
 * Tester si un nombre est solution d'une équation degré 1
 * * 4L14-1
 * * adaptation de l'exo 5L14 de Rémi Angot
 * @author Sébastien Lozano
 */
function Tester_si_un_nombre_est_solution_d_une_equation_deg1() {
  this.exo = "4L14-1";
  Tester_si_un_nombre_est_solution_d_une_equation.call(this);
  this.titre = `Tester si un nombre est solution d'une équation du premier degré`;
}

/**
 * Tester si un nombre est solution d'une équation degré 2
 * * 4L14-2
 * * adaptation de l'exo 5L14 de Rémi Angot
 * @author Sébastien Lozano
 */
function Tester_si_un_nombre_est_solution_d_une_equation_deg2() {
  this.exo = "4L14-2";
  Tester_si_un_nombre_est_solution_d_une_equation.call(this);
  this.titre = `Tester si un nombre est solution d'une équation du second degré`;
  //this.besoin_formulaire2_case_a_cocher = ["Avec des équations du second degré"];
}

/**
 * Produire une forme littérale en introduisant une lettre pour désigner une valeur inconnue
 * * 4L13-1
 * @author Sébastien Lozano
 */
function Forme_litterale_introduire_une_lettre() {
  'use strict';
  Exercice.call(this); // Héritage de la classe Exercice()
  this.debug = false;
  this.sup = 1;
  if (this.debug) {
    this.nb_questions = 3;
  } else {
    this.nb_questions = 2;
  };

  this.titre = "Produire une forme littérale en introduisant une lettre pour désigner une valeur inconnue";
  this.consigne = "Exprimer le prix total de l'achat, en fonction des lettres introduites dans l'énoncé.";

  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  //this.nb_questions_modifiable = false;
  //sortie_html? this.spacing = 3 : this.spacing = 2; 
  //sortie_html? this.spacing_corr = 3 : this.spacing_corr = 2;

  let type_de_questions_disponibles;

  this.nouvelle_version = function (numero_de_l_exercice) {
    if (this.debug) {
      type_de_questions_disponibles = [1];
    } else {
      type_de_questions_disponibles = [1];
    };

    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    type_de_questions_disponibles = [1];
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    //let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées --> à remettre comme ci dessus

    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {

      // une fonction pour gérer le pluriel 
      function pluriel(n, obj) {
        if (n > 1) {
          return obj.plur
        } else {
          return obj.sing
        };
      };

      // une fonction pour gérer la chaine de sortie et supprimer le coeff 1 !
      function sliceUn(n) {
        if (n == 1) {
          return ``;
        } else {
          return `${n}`;
        };
      };

      // on definit un tableau de couples possibles			
      let situations = [
        { prenom: prenom(), elt1: { lettre: 'c', article: 'un', sing: 'crayon', plur: 'crayons' }, elt2: { lettre: 'g', article: 'une', sing: 'gomme', plur: 'gommes' } },
        { prenom: prenom(), elt1: { lettre: 'r', article: 'une', sing: 'règle', plur: 'règles' }, elt2: { lettre: 'e', article: 'une', sing: 'équerre', plur: 'équerres' } },
        { prenom: prenom(), elt1: { lettre: 'p', article: 'une', sing: 'poire', plur: 'poires' }, elt2: { lettre: 'b', article: 'une', sing: 'banane', plur: 'bananes' } },
        { prenom: prenom(), elt1: { lettre: 'c', article: 'un', sing: 'couteau', plur: 'couteaux' }, elt2: { lettre: 'f', article: 'une', sing: 'fourchette', plur: 'fourchettes' } },
        { prenom: prenom(), elt1: { lettre: 'm', article: 'un', sing: 'marteau', plur: 'marteaux' }, elt2: { lettre: 'e', article: 'une', sing: 'enclume', plur: 'enclumes' } },
      ]
      let enonces = [];
      let n = randint(1, 6);
      let p = randint(1, 6);
      let situation = situations[randint(0, situations.length - 1)];
      enonces.push({
        enonce: `${situation.prenom} veut acheter ${n} ${pluriel(n, situation.elt1)} et ${p} ${pluriel(p, situation.elt2)}.
				<br>On note $${situation.elt1.lettre}$	le prix d'${situation.elt1.article} ${situation.elt1.sing} et $${situation.elt2.lettre}$	le prix d'${situation.elt2.article} ${situation.elt2.sing}.`,
        question: ``,
        correction: `
        ${situation.prenom} va payer $${n}$ fois le prix d'${situation.elt1.article} ${situation.elt1.sing} et $${p}$ fois le prix d'${situation.elt2.article} ${situation.elt2.sing}.
        <br> C'est à dire $${n}\\times ${situation.elt1.lettre} + ${p}\\times ${situation.elt2.lettre} = ${sliceUn(n)}${situation.elt1.lettre} + ${sliceUn(p)}${situation.elt2.lettre}$.
        <br>${texte_en_couleur(`Donc le prix total de l'achat est  $${sliceUn(n)}${situation.elt1.lettre} + ${sliceUn(p)}${situation.elt2.lettre}$.`)}
        `
      })
      switch (liste_type_de_questions[i]) {
        case 1:
          texte = `${enonces[0].enonce}`;
          if (this.debug) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`;
            texte_corr = ``;
          } else {
            texte_corr = `${enonces[0].correction}`;
          };
          break;
      }

      if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);

  }
  //this.besoin_formulaire_numerique = ['Niveau de difficulté',2,"1 : Entiers naturels\n2 : Entiers relatifs"];
  //this.besoin_formulaire2_case_a_cocher = ["Avec des équations du second degré"];	
}

/**
 * Produire une forme littérale en introduisant une lettre pour désigner une valeur inconnue afin de mettre en équation un problème
 * à partir de figure géométriques élémentaires
 * * 4L13-0
 * @author Sébastien Lozano
 */
function Mettre_en_equation_sans_resoudre() {
  'use strict';
  Exercice.call(this); // Héritage de la classe Exercice()
  this.debug = false;
  this.sup = 1;
  if (this.debug) {
    this.nb_questions = 9;
  } else {
    this.nb_questions = 2;
  };

  this.titre = "Mettre en équation un problème sans objectif de résolution";
  this.consigne = "Donner une équation qui permet de résoudre le problème.<br>On ne demande pas de résoudre l'équation.";

  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  //this.nb_questions_modifiable = false;
  //sortie_html? this.spacing = 3 : this.spacing = 2; 
  //sortie_html? this.spacing_corr = 3 : this.spacing_corr = 2;

  let type_de_questions_disponibles;

  this.nouvelle_version = function (numero_de_l_exercice) {
    if (this.debug) {
      type_de_questions_disponibles = [1];
    } else {
      type_de_questions_disponibles = [1, 2];
    };

    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    type_de_questions_disponibles = [1];

    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    //let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées --> à remettre comme ci dessus		

    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {

      // une fonction pour dire le nom du polygone
      function myPolyName(n) {
        let sortie = {
          article: ``,
          name: ``,
          nameParSommets: ``,
        };
        switch (n) {
          case 3:
            sortie.article = `du `;
            sortie.name = `triangle équilatéral`;
            sortie.nameParSommets = `ABC`;
            break;
          case 4:
            sortie.article = `du `;
            sortie.name = `carré`;
            sortie.nameParSommets = `ABCD`;
            break;
          case 5:
            sortie.article = `du `;
            sortie.name = `pentagone régulier`;
            sortie.nameParSommets = `ABCDE`;
            break;
          case 6:
            sortie.article = `de l'`;
            sortie.name = `hexagone régulier`;
            sortie.nameParSommets = `ABCDEF`;
            break;
          case 7:
            sortie.article = `de l'`;
            sortie.name = `heptagone régulier`;
            sortie.nameParSommets = `ABCDEFG`;
            break;
          case 8:
            sortie.article = `de l'`;
            sortie.name = `octogone régulier`;
            sortie.nameParSommets = `ABCDEFGH`;
            break;
        }
        return sortie;
      }

      // on choisit le nombre de côtés su polygone
      let n = randint(3, 8);
      //on choisit un nom pour la variable
      let variables = ['t', 'u', 'v', 'w', 'y', 'z'];
      let inc = variables[randint(0, variables.length - 1)];
      //on choisit une unité
      let unites = ["mm", "cm", "dm", "m", "dam", "hm", "km"];
      let unite = unites[randint(0, unites.length - 1)];
      //on prépare le polygone
      let po = polygoneRegulierParCentreEtRayon(point(0, 0), 4, n);
      po.opacite = 0.5;
      po.epaisseur = 2;
      //on pépare la côte
      let s = segment(po.listePoints[0], po.listePoints[1]);
      s.styleExtremites = `<->`;
      // on fait un test pour coder les angles droits du carré
      let anglesDroitsIfIsCarre;
      if (n == 4) {
        anglesDroitsIfIsCarre = codageCarre(po)
      } else {
        anglesDroitsIfIsCarre = {}
      };
      // on finit les appels
      let mesAppels = [
        po,
        codeSegments('X', 'blue', po.listePoints),
        afficheCoteSegment(s, `${inc}`, 1, 'red', 2, 0.5, 'black'),
        nommePolygone(po, myPolyName(n).nameParSommets),
        anglesDroitsIfIsCarre
      ];
      // on prépare l'objet polygone
      let polygone = {
        nb_cotes: n,
        unite: unite,
        article: myPolyName(n).article,
        nom: myPolyName(n).name,
        let_cote: inc,
        perimetre: randint(200, 500),
        fig: mathalea2d(
          {
            xmin: -7,
            ymin: -5,
            xmax: 7,
            ymax: 5,
            pixelsParCm: 20,
            scale: 0.5//0.7
          },
          mesAppels
        )
      };

      let enonces = [];
      enonces.push({
        enonce: `On considère la figure suivante où l'unité est le $${polygone.unite}$.<br>${prenom()} se demande pour quelle valeur de ${polygone.let_cote}, exprimée en $${polygone.unite}$, le périmètre ${polygone.article}${polygone.nom} est égal à $${polygone.perimetre}$ $${polygone.unite}$ .<br> ${polygone.fig}`,
        question: ``,
        correction: `La figure est un ${polygone.nom}, il a donc ${polygone.nb_cotes} côtés de même longueur.<br>
        Cette longueur est notée ${polygone.let_cote}, le périmètre de la figure, exprimé en fonction de ${polygone.let_cote}, vaut donc $${polygone.nb_cotes}\\times$ ${polygone.let_cote}.<br>
        D'après l'énoncé, ce périmètre vaut $${polygone.perimetre}$ $${polygone.unite}$.<br>
        L'équation suivante permet donc de résoudre le problème : <br>
        ${texte_en_couleur(`$${polygone.nb_cotes}\\times$ ${polygone.let_cote} $= ${polygone.perimetre}$.`)}`
      });
      // pour être sûr d'avoir deux figures différentes
      let p = randint(3, 8, [n]);
      polygone.nb_cotes = p;
      enonces.push({
        enonce: `On considère la figure suivante où l'unité est le $${polygone.unite}$.<br>${prenom()} se demande pour quelle valeur de ${polygone.let_cote}, exprimée en $${polygone.unite}$, le périmètre ${polygone.article}${polygone.nom} est égal à $${polygone.perimetre}$ $${polygone.unite}$ .<br> ${polygone.fig}`,
        question: ``,
        correction: `La figure est un ${polygone.nom}, il a donc ${polygone.nb_cotes} côtés de même longueur.<br>
        Cette longueur est notée ${polygone.let_cote}, le périmètre de la figure, exprimé en fonction de ${polygone.let_cote}, vaut donc $${polygone.nb_cotes}\\times$ ${polygone.let_cote}.<br>
        D'après l'énoncé, ce périmètre vaut $${polygone.perimetre}$ $${polygone.unite}$.<br>
        L'équation suivante permet donc de résoudre le problème : <br>
        ${texte_en_couleur(`$${polygone.nb_cotes}\\times$ ${polygone.let_cote} $= ${polygone.perimetre}$.`)}`
      })

      switch (liste_type_de_questions[i]) {
        case 1:
          texte = `${enonces[0].enonce}`;
          if (this.debug) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`;
            texte_corr = ``;
          } else {
            texte_corr = `${enonces[0].correction}`;
          };
          break;
        case 2:
          texte = `${enonces[1].enonce}`;
          if (this.debug) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[1].correction}`;
            texte_corr = ``;
          } else {
            texte_corr = `${enonces[1].correction}`;
          };
          break;
      }


      if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);

  }
  //this.besoin_formulaire_numerique = ['Niveau de difficulté',2,"1 : Entiers naturels\n2 : Entiers relatifs"];
  //this.besoin_formulaire2_case_a_cocher = ["Avec des équations du second degré"];	
}

/**
 * Graphiques_et_proportionnalite
 * 4P10-1
 * @author Sébastien Lozano
 */
function Graphiques_et_proportionnalite() {
  'use strict';
  Exercice.call(this); // Héritage de la classe Exercice()
  this.debug = false;
  this.sup = 1;
  if (this.debug) {
    this.nb_questions = 2;
  } else {
    this.nb_questions = 1;
  };

  this.titre = "Résoudre un problème de proportionnalité à l'aide d'un graphique";
  this.consigne = "";

  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  //this.nb_questions_modifiable = false;
  sortie_html ? this.spacing = 1.5 : this.spacing = 1;
  //sortie_html? this.spacing_corr = 3 : this.spacing_corr = 2;

  let type_de_questions_disponibles;

  this.nouvelle_version = function (numero_de_l_exercice) {
    if (this.debug) {
      type_de_questions_disponibles = [1];
    } else {
      type_de_questions_disponibles = [1];
    };

    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    //type_de_questions_disponibles=[1];			

    //let liste_type_de_questions  = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions) // Tous les types de questions sont posées --> à remettre comme ci dessus		

    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
      // on prévoit un peu d'aléatoire pour les prix unitaires
      let pu_oranges = choice([1.2, 1.4, 1.6, 1.8]);
      let pu_baguettes = choice([0.6, 0.8, 1.2]);
      // on prévoit un tableau avec des situations
      let situations = [
        { lieu: `l'épicerie`, prenom: prenom(), articles: `oranges`, art_articles: `d'oranges`, prix_unitaire: pu_oranges, qte: `poids`, qte_max: 10, qte2: 3, unite: `kg d'`, legendeX: `poids en kg`, legendeY: `prix en €`, fig: {}, fig_corr: {} },
        { lieu: `la boulangerie`, prenom: prenom(), articles: `baguettes`, art_articles: `de baguettes`, prix_unitaire: pu_baguettes, qte: `nombre`, qte_max: 10, qte2: 3, unite: ``, legendeX: `quantité`, legendeY: `prix en €`, fig: {}, fig_corr: {} }
      ]
      // on en choisit une
      let situation = situations[randint(0, situations.length - 1)];
      let r;
      let xscale = 1;
      let yscale = 2;
      // pour aléatoiriser un peu le pas sur l'axe des prix
      let stepAxeSecondaire = choice([0.1,0.2]);
      // on finit les appels
      let mesAppels = [
        r = repere({
          xmin: 0,
          ymin: 0,
          ymax: situation.qte_max * situation.prix_unitaire + 4,
          xmax: situation.qte_max,
          xscale: xscale,
          yscale: yscale,
          legendeX: situation.legendeX,
          legendeY: situation.legendeY,
          grilleSecondaireVisible: true,
          grilleSecondaireDistance: stepAxeSecondaire,//0.2,
          positionLegendeY: [0.3, situation.qte_max * situation.prix_unitaire + 4 + 0.4]
        }),
      ];
      let f = x => calcul(situation.prix_unitaire * x);
      mesAppels.push(f, courbe(f, 0, situation.qte_max, 'black', 1.5, r));
      // on prépare l'objet figure
      let fig = mathalea2d(
        {
          xmin: -xscale,
          ymin: -yscale,
          xmax: situation.qte_max / xscale + 3,
          ymax: (situation.qte_max * situation.prix_unitaire + 4) / 2 + 1,
          pixelsParCm: 40
        },
        mesAppels
      );
      situation.fig = fig;

      // on prépare les appels supplémentaires pour la correction
      let mesAppels_corr = mesAppels;
      let A = point(situation.qte_max, 0);
      let B = point(situation.qte_max, calcul(situation.qte_max * situation.prix_unitaire / yscale));
      let s1 = segment(A, B, "red");
      s1.epaisseur = 2;
      s1.pointilles = true;
      s1.styleExtremites = `->`;
      let C = point(0, calcul(situation.qte_max * situation.prix_unitaire / yscale));
      let s2 = segment(B, C, "red");
      s2.epaisseur = 2;
      s2.pointilles = true;
      s2.styleExtremites = `->`;

      let D = point(situation.qte2, 0);
      let E = point(situation.qte2, calcul(situation.qte2 * situation.prix_unitaire / yscale));
      let s3 = segment(D, E, "blue");
      s3.epaisseur = 2;
      s3.pointilles = true;
      s3.styleExtremites = `->`;
      let F = point(0, calcul(situation.qte2 * situation.prix_unitaire / yscale));
      let s4 = segment(E, F, "blue");
      s4.epaisseur = 2;
      s4.pointilles = true;
      s4.styleExtremites = `->`;

      // on ajoute les appels pour la correction
      mesAppels_corr.push(
        s1,
        s2,
        s3,
        s4
      )

      // on prépare l'objet figure correction
      let fig_corr = mathalea2d(
        {
          xmin: -xscale,
          ymin: -yscale,
          xmax: situation.qte_max / xscale + 3,
          ymax: (situation.qte_max * situation.prix_unitaire + 4) / 2 + 1,
          pixelsParCm: 40
        },
        mesAppels_corr
      );
      situation.fig_corr = fig_corr;



      // un compteur pour les sous-questions
      let k = 0;
      let k_corr = 0;

      let enonces = [];
      enonces.push({
        enonce: `
          À ${situation.lieu}, ${situation.prenom} utilise le graphique ci-dessous pour indiquer le prix de ses ${situation.articles} en fonction du ${situation.qte} ${situation.art_articles}.
          <br>${situation.fig}
          <br> ${num_alpha(k++)} Justifier que c'est une situation de proportionnalité à l'aide du graphique.
          <br> ${num_alpha(k++)} Quel est le prix de $${situation.qte_max}$ ${situation.unite}  ${situation.articles}?
          <br> ${num_alpha(k++)} Quel est le prix de $${situation.qte2}$ ${situation.unite}  ${situation.articles}?
          `,
        //question:``,
        correction: `
        <br> ${num_alpha(k_corr++)} Ce graphique est une droite qui passe par l'origine.
        <br> ${texte_en_couleur(`C'est donc bien le graphique d'une situation de proportionnalité.`)}

        <br> ${num_alpha(k_corr++)} Par lecture graphique, en utilisant les pointillés rouges du graphe ci-dessous, ${texte_en_couleur(`$${situation.qte_max}$ ${situation.unite}  ${situation.articles} coûtent $${tex_prix(calcul(situation.qte_max * situation.prix_unitaire))}$ €.`)}
        <br> ${situation.fig_corr}
        <br> ${num_alpha(k_corr++)} Pour $${situation.qte2}$ ${situation.unite}  ${situation.articles}, la lecture graphique est moins facile, nous allons détailler deux méthodes.
        <br><br> ${texte_gras(`Première méthode par lecture graphique :`)} 
        <br> Il faut prendre en compte que chaque petit carreau représente $${tex_prix(stepAxeSecondaire*yscale)}$ € et utiliser les pointillés bleus.
        <br><br> ${texte_gras(`Seconde méthode en calculant une quatrième proportionnelle :`)}
        <br> $${situation.qte_max}$ ${situation.unite}  ${situation.articles} coûtent $${tex_prix(calcul(situation.qte_max * situation.prix_unitaire))}$ €
        donc $${situation.qte2}$ ${situation.unite}  ${situation.articles} coûtent : <br> $(${tex_prix(calcul(situation.qte_max * situation.prix_unitaire))}$ € $\\div ${situation.qte_max}$ ${situation.articles} $)\\times (${situation.qte2}$ ${situation.articles})  $= ${tex_prix(calcul(situation.qte2 * situation.prix_unitaire))}$ €
        <br><br>${texte_en_couleur(`Quelle que soit la méthode utilisée, ${situation.qte2} ${situation.unite}  ${situation.articles} coûtent $${tex_prix(calcul(situation.qte2 * situation.prix_unitaire))}$ €.`)}
        `
      })
      switch (liste_type_de_questions[i]) {
        case 1:
          texte = `${enonces[0].enonce}`;
          //texte = `${fig}`;
          if (this.debug) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`;
            texte_corr = ``;
          } else {
            texte_corr = `${enonces[0].correction}`;
          };
          break;
      }


      if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);

  }
  //this.besoin_formulaire_numerique = ['Niveau de difficulté',2,"1 : Entiers naturels\n2 : Entiers relatifs"];
  //this.besoin_formulaire2_case_a_cocher = ["Avec des équations du second degré"];	  
}
/**
 * fork de 4P10-1 par Jean-Claude Lhote
 */

function Graphiques_et_proportionnalite2() {
  'use strict';
  Exercice.call(this); // Héritage de la classe Exercice()
  this.debug = false;
  this.sup = 1;
  if (this.debug) {
    this.nb_questions = 2;
  } else {
    this.nb_questions = 1;
  };

  this.titre = "Résoudre un problème de proportionnalité à l'aide d'un graphique";
  this.consigne = "";

  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  //this.nb_questions_modifiable = false;
  sortie_html ? this.spacing = 1.5 : this.spacing = 1;
  //sortie_html? this.spacing_corr = 3 : this.spacing_corr = 2;

  let type_de_questions_disponibles;

  this.nouvelle_version = function (numero_de_l_exercice) {
    if (this.debug) {
      type_de_questions_disponibles = [1];
    } else {
      type_de_questions_disponibles = [1];
    };

    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    //type_de_questions_disponibles=[1];			

    //let liste_type_de_questions  = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions) // Tous les types de questions sont posées --> à remettre comme ci dessus		

    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
      // on prévoit un peu d'aléatoire pour les prix unitaires
      let pu_oranges = choice([1.2, 1.4, 1.6, 1.8]);
      let pu_baguettes = choice([0.6, 0.8, 1.2]);
      // on prévoit un tableau avec des situations
      let situations = [
        { lieu: `l'épicerie`, prenom: prenom(), articles: `oranges`, art_articles: `d'oranges`, prix_unitaire: pu_oranges, qte: `poids`, qte_max: 10, qte2: 3, unite: `kg d'`, legendeX: `poids en kg`, legendeY: `prix en €`, fig: {}, fig_corr: {} },
        { lieu: `la boulangerie`, prenom: prenom(), articles: `baguettes`, art_articles: `de baguettes`, prix_unitaire: pu_baguettes, qte: `nombre`, qte_max: 10, qte2: 3, unite: ``, legendeX: `quantité`, legendeY: `prix en €`, fig: {}, fig_corr: {} }
      ]
      // on en choisit une
      let situation = situations[randint(0, situations.length - 1)];
      let r;
      let xscale = 1;
      let yscale = choice([1,2,5]);
      // pour aléatoiriser un peu le pas sur l'axe des prix
      let stepAxeSecondaire 
      if (yscale==1) stepAxeSecondaire = choice([0.5,0.2,0.25]);
      // on finit les appels
      let mesAppels = [
        r = repere({
          xmin: 0,
          ymin: 0,
          ymax: situation.qte_max * situation.prix_unitaire + 4,
          xmax: situation.qte_max,
          xscale: xscale,
          yscale: yscale,
          legendeX: situation.legendeX,
          legendeY: situation.legendeY,
          grilleSecondaireVisible: true,
          grilleSecondaireDistance: stepAxeSecondaire,//0.2,
          positionLegendeY: [0.3, situation.qte_max * situation.prix_unitaire + 4 + 0.4]
        }),
      ];
      let f = x => calcul(situation.prix_unitaire * x);
      mesAppels.push(f, courbe(f, 0, situation.qte_max, 'black', 1.5, r));
      // on prépare l'objet figure
      let fig = mathalea2d(
        {
          xmin: -xscale,
          ymin: -yscale,
          xmax: situation.qte_max / xscale + 3,
          ymax: (situation.qte_max * situation.prix_unitaire + 4) / 2 + 1,
          pixelsParCm: 40
        },
        mesAppels
      );
      situation.fig = fig;

      // on prépare les appels supplémentaires pour la correction
      let mesAppels_corr = mesAppels;
      let A = point(situation.qte_max, 0);
      let B = point(situation.qte_max, calcul(situation.qte_max * situation.prix_unitaire / yscale));
      let s1 = segment(A, B, "red");
      s1.epaisseur = 2;
      s1.pointilles = true;
      s1.styleExtremites = `->`;
      let C = point(0, calcul(situation.qte_max * situation.prix_unitaire / yscale));
      let s2 = segment(B, C, "red");
      s2.epaisseur = 2;
      s2.pointilles = true;
      s2.styleExtremites = `->`;

      let D = point(situation.qte2, 0);
      let E = point(situation.qte2, calcul(situation.qte2 * situation.prix_unitaire / yscale));
      let s3 = segment(D, E, "blue");
      s3.epaisseur = 2;
      s3.pointilles = true;
      s3.styleExtremites = `->`;
      let F = point(0, calcul(situation.qte2 * situation.prix_unitaire / yscale));
      let s4 = segment(E, F, "blue");
      s4.epaisseur = 2;
      s4.pointilles = true;
      s4.styleExtremites = `->`;

      // on ajoute les appels pour la correction
      mesAppels_corr.push(
        s1,
        s2,
        s3,
        s4
      )

      // on prépare l'objet figure correction
      let fig_corr = mathalea2d(
        {
          xmin: -xscale,
          ymin: -yscale,
          xmax: situation.qte_max / xscale + 3,
          ymax: (situation.qte_max * situation.prix_unitaire + 4) / 2 + 1,
          pixelsParCm: 40
        },
        mesAppels_corr
      );
      situation.fig_corr = fig_corr;



      // un compteur pour les sous-questions
      let k = 0;
      let k_corr = 0;

      let enonces = [];
      enonces.push({
        enonce: `
          À ${situation.lieu}, ${situation.prenom} utilise le graphique ci-dessous pour indiquer le prix de ses ${situation.articles} en fonction du ${situation.qte} ${situation.art_articles}.
          <br>${situation.fig}
          <br> ${num_alpha(k++)} Justifier que c'est une situation de proportionnalité à l'aide du graphique.
          <br> ${num_alpha(k++)} Quel est le prix de $${situation.qte_max}$ ${situation.unite}  ${situation.articles}?
          <br> ${num_alpha(k++)} Quel est le prix de $${situation.qte2}$ ${situation.unite}  ${situation.articles}?
          `,
        //question:``,
        correction: `
        <br> ${num_alpha(k_corr++)} Ce graphique est une droite qui passe par l'origine.
        <br> ${texte_en_couleur(`C'est donc bien le graphique d'une situation de proportionnalité.`)}

        <br> ${num_alpha(k_corr++)} Par lecture graphique, en utilisant les pointillés rouges du graphe ci-dessous, ${texte_en_couleur(`$${situation.qte_max}$ ${situation.unite}  ${situation.articles} coûtent $${tex_prix(calcul(situation.qte_max * situation.prix_unitaire))}$ €.`)}
        <br> ${situation.fig_corr}
        <br> ${num_alpha(k_corr++)} Pour $${situation.qte2}$ ${situation.unite}  ${situation.articles}, la lecture graphique est moins facile, nous allons détailler deux méthodes.
        <br><br> ${texte_gras(`Première méthode par lecture graphique :`)} 
        <br> Il faut prendre en compte que chaque petit carreau représente $${tex_prix(stepAxeSecondaire*yscale)}$ € et utiliser les pointillés bleus.
        <br><br> ${texte_gras(`Seconde méthode en calculant une quatrième proportionnelle :`)}
        <br> $${situation.qte_max}$ ${situation.unite}  ${situation.articles} coûtent $${tex_prix(calcul(situation.qte_max * situation.prix_unitaire))}$ €
        donc $${situation.qte2}$ ${situation.unite}  ${situation.articles} coûtent : <br> $(${tex_prix(calcul(situation.qte_max * situation.prix_unitaire))}$ € $\\div ${situation.qte_max}$ ${situation.articles} $)\\times (${situation.qte2}$ ${situation.articles})  $= ${tex_prix(calcul(situation.qte2 * situation.prix_unitaire))}$ €
        <br><br>${texte_en_couleur(`Quelle que soit la méthode utilisée, ${situation.qte2} ${situation.unite}  ${situation.articles} coûtent $${tex_prix(calcul(situation.qte2 * situation.prix_unitaire))}$ €.`)}
        `
      })
      switch (liste_type_de_questions[i]) {
        case 1:
          texte = `${enonces[0].enonce}`;
          //texte = `${fig}`;
          if (this.debug) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`;
            texte_corr = ``;
          } else {
            texte_corr = `${enonces[0].correction}`;
          };
          break;
      }


      if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);

  }
  //this.besoin_formulaire_numerique = ['Niveau de difficulté',2,"1 : Entiers naturels\n2 : Entiers relatifs"];
  //this.besoin_formulaire2_case_a_cocher = ["Avec des équations du second degré"];	  
}

/** 
 * * Trouver l'erreur dans une equation
 * * 4L15-0
 * @author Sébastien Lozano
 */
function Trouver_erreur_resol_eq_deg1() {
  'use strict';
  Exercice.call(this); // Héritage de la classe Exercice()
  this.debug = false;
  this.sup = 1;
  if (this.debug) {
    this.nb_questions = 5;
  } else {
    this.nb_questions = 3;
  };

  this.titre = "Trouver l'erreur dans une résolution d'équation du premier degré";
  this.consigne = "Trouver l'erreur dans les résolutions suivantes.<br>On ne demande pas de résoudre l'équation.";

  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  //this.nb_questions_modifiable = false;
  sortie_html ? this.spacing = 2.5 : this.spacing = 1.5;
  sortie_html ? this.spacing_corr = 2.5 : this.spacing_corr = 1.5;

  let type_de_questions_disponibles;

  this.nouvelle_version = function (numero_de_l_exercice) {
    if (this.debug) {
      type_de_questions_disponibles = [1, 2, 3, 4, 5];
    } else {
      type_de_questions_disponibles = shuffle([choice([1, 3]), choice([2, 4]), 5]);

    };

    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    //type_de_questions_disponibles=[1];			

    //let liste_type_de_questions  = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions) // Tous les types de questions sont posées --> à remettre comme ci dessus		

    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
      //on choisit un nom pour l'inconnue
      let variables = ['x', 't', 'u', 'v', 'w', 'y', 'z'];
      let inc = variables[randint(0, variables.length - 1)];

      // on choisit les paramètres
      let a = randint(-9, 9, [-1, 0, 1]);
      let b = randint(-9, 9, [-1, 0, 1]);
      let c = randint(-9, 9, [-1, 0, 1, a, -a]);
      let d = randint(-9, 9, [-1, 0, 1]);

      // une fonction pour gérer le signe
      function signeDansEq(nb) {
        if (nb > 0) {
          return { signe: `+`, operation: `soustraire`, chgt_signe: nb };
        } else {
          return { signe: ``, operation: `ajouter`, chgt_signe: nb * (-1) };
        };
      };

      // une fonction pour gérer le genre du prénom et le pronom associé
      function genreEtPrenom() {
        let n = randint(0, 1);
        if (n == 0) {
          return { prenom: prenomM(), pronom: `il` };
        } else {
          return { prenom: prenomF(), pronom: `elle` };
        };
      };

      // deux fonctionx pour conditionner la simplification d'une fraction
      function isSimp(n, d) {
        if (fraction_simplifiee(n, d)[0] != n) {
          return true;
        } else {
          return false;
        };
      };

      function simpFrac(n, d) {
        if (isSimp(n, d)) {
          if (fraction_simplifiee(n, d)[1] == 1) {
            return `$= ${fraction_simplifiee(n, d)[0]}$`;
          } else if (fraction_simplifiee(n, d)[0] == 0) {
            return `$ = 0`;
          } else {
            return `$= \\dfrac{${fraction_simplifiee(n, d)[0]}}{${fraction_simplifiee(n, d)[1]}}$`;
          };
        } else {
          if (fraction_simplifiee(n, d)[1] == 1) {
            return `$= ${fraction_simplifiee(n, d)[0]}$`;
          } else if (fraction_simplifiee(n, d)[0] == 0) {
            return `$ = 0$`;
          } else {
            return ` `;
          };
        }
      };


      let currentGenreEtPrenom = genreEtPrenom();



      // pour les situations
      let situations = [
        {//case 1 --> ax+b=d+cx  erreur à l'étape 1 on passe cx de l'autre côté
          pronom: currentGenreEtPrenom.pronom,
          prenom: currentGenreEtPrenom.prenom,
          a: a,
          b: b,
          c: c,
          d: d,
          inc: inc,
          eq: `$${a}${inc} ${signeDansEq(b).signe} ${b} = ${d} ${signeDansEq(c).signe} ${c}${inc}$`,
          et1: `${texte_gras(`Étape 1 :`)} $${a}${inc} ${signeDansEq(c).signe} ${c}${inc} ${signeDansEq(b).signe} ${b} = ${d} $`,// l'erreur est là, on passe de l'autre côté d'où l'oubli du chgt de signe
          et2: `${texte_gras(`Étape 2 :`)} $${a}${inc} ${signeDansEq(c).signe} ${c}${inc} = ${d} ${signeDansEq(-b).signe} ${-b} $`,
          et3: `${texte_gras(`Étape 3 :`)} $${a + c}${inc} = ${d} ${signeDansEq(-b).signe} ${-b} $`,
          et4: `${texte_gras(`Étape 4 :`)} $${inc} = \\dfrac{${d} ${signeDansEq(-b).signe} ${-b}}{${a + c}} $`,
          et_fin: `${texte_gras(`Étape 5 :`)} $${inc} = \\dfrac{${d - b}}{${a + c}}$ ${simpFrac(d - b, a + c)}`,
          err: `
            L'erreur se situe à l'étape 1.
            <br>${currentGenreEtPrenom.prenom} "a fait passer" le terme $${signeDansEq(c).signe} ${c}${inc}$ "de l'autre côté"
            or pour obtenir une équation équivalente, il s'agit d'opérer de la même manière sur les deux membres de l'équation.
            <br>Ici il faut ${signeDansEq(c).operation} $${signeDansEq(c).chgt_signe}${inc}$ aux deux membres.            
            `,
          eq_corr: `${texte_gras(`Équation d'origine : `)} $${a}${inc} ${signeDansEq(b).signe} ${b} = ${d} ${signeDansEq(c).signe} ${c}${inc}$`,
          eq_corr_et1: `
          ${texte_gras(`Étape 1 : `)} $${mise_en_evidence(signeDansEq(c).operation)}$ $${mise_en_evidence(signeDansEq(c).chgt_signe)}$${texte_en_couleur(`$${inc}$`)} aux deux membres. 
          <br> $${a}${inc} ${mise_en_evidence(signeDansEq(-c).signe)} ${mise_en_evidence(-c)}$${texte_en_couleur(`$${inc}$`)} $${signeDansEq(b).signe} ${b} = ${d} ${signeDansEq(c).signe} ${c}${inc} ${mise_en_evidence(signeDansEq(-c).signe)} ${mise_en_evidence(-c)}$${texte_en_couleur(`$${inc}$`)} 
          <br>${texte_gras(`Étape 2 : `)} On réduit.
          <br> $${a - c}${inc} ${signeDansEq(b).signe} ${b} = ${d}$
          `,// l'erreur est là, on passe de l'autre côté d'où l'oubli du chgt de signe
          eq_corr_et2: `
          ${texte_gras(`Étape 3 :`)} $${mise_en_evidence(signeDansEq(b).operation)}$ $${mise_en_evidence(signeDansEq(b).chgt_signe)}$ aux deux membres. 
          <br> $${a - c}${inc} ${signeDansEq(b).signe} ${b} ${mise_en_evidence(signeDansEq(-b).signe)} ${mise_en_evidence(-b)} = ${d} ${mise_en_evidence(signeDansEq(-b).signe)} ${mise_en_evidence(-b)}$
          <br>${texte_gras(`Étape 4 : `)} Réduction à nouveau.
          <br> $${a - c}${inc} = ${d - b}$
          `,
          eq_corr_et3: `
          ${texte_gras(`Étape 5 :`)} $${mise_en_evidence(`\\textbf{diviser par}`)}$ $${mise_en_evidence(a - c)}$ les deux membres.
          <br> $\\dfrac{${a - c}${inc}}{${mise_en_evidence(a - c)}} = \\dfrac{${d - b}}{${mise_en_evidence(a - c)}}$
          <br>$${inc} = \\dfrac{${d - b}}{${a - c}}$ ${simpFrac(d - b, a - c)}
          `,
        },
        {//case 2 --> ax+b=d+cx  erreur à l'étape 2 on passe b de l'autre côté
          pronom: currentGenreEtPrenom.pronom,
          prenom: currentGenreEtPrenom.prenom,
          a: a,
          b: b,
          c: c,
          d: d,
          inc: inc,
          eq: `$${a}${inc} ${signeDansEq(b).signe} ${b} = ${d} ${signeDansEq(c).signe} ${c}${inc}$`,
          et1: `${texte_gras(`Étape 1 :`)} $${a}${inc} ${signeDansEq(-c).signe} ${-c}${inc} ${signeDansEq(b).signe} ${b} = ${d}$`,
          et2: `${texte_gras(`Étape 2 :`)} $${a}${inc} ${signeDansEq(-c).signe} ${-c}${inc} = ${d} ${signeDansEq(b).signe} ${b}$`,// l'erreur est là on passe de l'autre côté
          et3: `${texte_gras(`Étape 3 :`)} $${a - c}${inc} = ${d} ${signeDansEq(b).signe} ${b}$`,
          et4: `${texte_gras(`Étape 4 :`)} $${inc} = \\dfrac{${d} ${signeDansEq(b).signe} ${b}}{${a - c}} $`,
          et_fin: `${texte_gras(`Étape 5 :`)} $${inc} = \\dfrac{${d + b}}{${a - c}}$ ${simpFrac(d + b, a - c)}`,
          err: `
            L'erreur se situe à l'étape 2.
            <br>${currentGenreEtPrenom.prenom} "a fait passer" le terme $${signeDansEq(b).signe} ${b}$ "de l'autre côté"
            or pour obtenir une équation équivalente, il s'agit d'opérer de la même manière sur les deux membres de l'équation.
            <br>Ici il faut ${signeDansEq(b).operation} $${signeDansEq(b).chgt_signe}$ aux deux membres.            
            `,
          eq_corr: `${texte_gras(`Équation d'origine : `)} $${a}${inc} ${signeDansEq(b).signe} ${b} = ${d} ${signeDansEq(c).signe} ${c}${inc}$`,
          eq_corr_et1: `
          ${texte_gras(`Étape 1 :`)} $${mise_en_evidence(signeDansEq(c).operation)}$ $${mise_en_evidence(signeDansEq(c).chgt_signe)}$${texte_en_couleur(`$${inc}$`)} aux deux membres 
          <br> $${a}${inc} ${mise_en_evidence(signeDansEq(-c).signe)} ${mise_en_evidence(-c)}$${texte_en_couleur(`$${inc}$`)} $ ${signeDansEq(b).signe} ${b} = ${d} ${signeDansEq(c).signe} ${c}${inc} ${mise_en_evidence(signeDansEq(-c).signe)} ${mise_en_evidence(-c)}$${texte_en_couleur(`$${inc}$`)} 
          <br>${texte_gras(`Étape 2 : `)} On réduit.
          <br> $${a - c}${inc} ${signeDansEq(b).signe} ${b} = ${d}$
          `,// l'erreur est là, on passe de l'autre côté d'où l'oubli du chgt de signe
          eq_corr_et2: `
          ${texte_gras(`Étape 3 :`)} $${mise_en_evidence(signeDansEq(b).operation)}$ $${mise_en_evidence(signeDansEq(b).chgt_signe)}$ aux deux membres 
          <br> $${a - c}${inc} ${signeDansEq(b).signe} ${b} ${mise_en_evidence(signeDansEq(-b).signe)} ${mise_en_evidence(-b)} = ${d} ${mise_en_evidence(signeDansEq(-b).signe)} ${mise_en_evidence(-b)}$
          <br>${texte_gras(`Étape 4 : `)} Réduction à nouveau.
          <br> $${a - c}${inc} = ${d - b}$
          `,
          eq_corr_et3: `
          ${texte_gras(`Étape 5 :`)} $${mise_en_evidence(`\\textbf{diviser par}`)}$ $${mise_en_evidence(a - c)}$ les deux membres
          <br> $\\dfrac{${a - c}${inc}}{${mise_en_evidence(a - c)}} = \\dfrac{${d - b}}{${mise_en_evidence(a - c)}}$
          <br>$${inc} = \\dfrac{${d - b}}{${a - c}}$ ${simpFrac(d - b, a - c)}
          `,
        },
        {//case 3 --> ax+b=cx+d  erreur à l'étape 2 on passe cx de l'autre côté
          pronom: currentGenreEtPrenom.pronom,
          prenom: currentGenreEtPrenom.prenom,
          a: a,
          b: b,
          c: c,
          d: d,
          inc: inc,
          eq: `$${a}${inc} ${signeDansEq(b).signe} ${b} = ${c}${inc} ${signeDansEq(d).signe} ${d} $`,
          et1: `${texte_gras(`Étape 1 :`)} $${a}${inc} = ${c}${inc} ${signeDansEq(d).signe} ${d} ${signeDansEq(-b).signe} ${-b}$`,
          et2: `${texte_gras(`Étape 2 :`)} $${a}${inc} ${signeDansEq(c).signe} ${c}${inc} = ${d} ${signeDansEq(-b).signe} ${-b}$`,// l'erreur est là on passe de l'autre côté
          et3: `${texte_gras(`Étape 3 :`)} $${a + c}${inc} = ${d} ${signeDansEq(-b).signe} ${-b}$`,
          et4: `${texte_gras(`Étape 4 :`)} $${inc} = \\dfrac{${d} ${signeDansEq(-b).signe} ${-b}}{${a + c}} $`,
          et_fin: `${texte_gras(`Étape 5 :`)} $${inc} = \\dfrac{${d - b}}{${a + c}}$ ${simpFrac(d - b, a + c)}`,
          err: `
            L'erreur se situe à l'étape 2.
            <br>${currentGenreEtPrenom.prenom} "a fait passer" le terme $${signeDansEq(c).signe} ${c}${inc}$ "de l'autre côté"
            or pour obtenir une équation équivalente, il s'agit d'opérer de la même manière sur les deux membres de l'équation.
            <br>Ici il faut ${signeDansEq(c).operation} $${signeDansEq(c).chgt_signe}${inc}$ aux deux membres.            
            `,
          eq_corr: `${texte_gras(`Équation d'origine : `)} $${a}${inc} ${signeDansEq(b).signe} ${b} = ${c}${inc} ${signeDansEq(d).signe} ${d} $`,
          eq_corr_et1: `
          ${texte_gras(`Étape 1 :`)} $${mise_en_evidence(signeDansEq(c).operation)}$ $${mise_en_evidence(signeDansEq(c).chgt_signe)}$${texte_en_couleur(`$${inc}$`)} aux deux membres 
          <br> $${a}${inc} ${mise_en_evidence(signeDansEq(-c).signe)} ${mise_en_evidence(-c)}$${texte_en_couleur(`$${inc}$`)} $${signeDansEq(b).signe} ${b} = ${d} ${signeDansEq(c).signe} ${c}${inc} ${mise_en_evidence(signeDansEq(-c).signe)} ${mise_en_evidence(-c)}$${texte_en_couleur(`$${inc}$`)}
          <br>${texte_gras(`Étape 2 : `)} On réduit.
          <br> $${a - c}${inc} ${signeDansEq(b).signe} ${b} = ${d}$
          `,// l'erreur est là, on passe de l'autre côté d'où l'oubli du chgt de signe
          eq_corr_et2: `
          ${texte_gras(`Étape 3 :`)} $${mise_en_evidence(signeDansEq(b).operation)}$ $${mise_en_evidence(signeDansEq(b).chgt_signe)}$ aux deux membres 
          <br> $${a - c}${inc} ${signeDansEq(b).signe} ${b} ${mise_en_evidence(signeDansEq(-b).signe)} ${mise_en_evidence(-b)} = ${d} ${mise_en_evidence(signeDansEq(-b).signe)} ${mise_en_evidence(-b)}$
          <br>${texte_gras(`Étape 4 : `)} Réduction à nouveau.
          <br> $${a - c}${inc} = ${d - b}$
          `,
          eq_corr_et3: `
          ${texte_gras(`Étape 5 :`)} $${mise_en_evidence(`\\textbf{diviser par}`)}$ $${mise_en_evidence(a - c)}$ les deux membres
          <br> $\\dfrac{${a - c}${inc}}{${mise_en_evidence(a - c)}} = \\dfrac{${d - b}}{${mise_en_evidence(a - c)}}$
          <br>$${inc} = \\dfrac{${d - b}}{${a - c}}$ ${simpFrac(d - b, a - c)}
          `,
        },
        {//case 4 --> ax+b=cx+d  erreur à l'étape 1 on passe b de l'autre côté
          pronom: currentGenreEtPrenom.pronom,
          prenom: currentGenreEtPrenom.prenom,
          a: a,
          b: b,
          c: c,
          d: d,
          inc: inc,
          eq: `$${a}${inc} ${signeDansEq(b).signe} ${b} = ${c}${inc} ${signeDansEq(d).signe} ${d} $`,
          et1: `${texte_gras(`Étape 1 :`)} $${a}${inc} = ${c}${inc} ${signeDansEq(d).signe} ${d} ${signeDansEq(b).signe} ${b}$`,// l'erreur est là on passe de l'autre côté
          et2: `${texte_gras(`Étape 2 :`)} $${a}${inc} ${signeDansEq(-c).signe} ${-c}${inc} = ${d} ${signeDansEq(b).signe} ${b}$`,
          et3: `${texte_gras(`Étape 3 :`)} $${a - c}${inc} = ${d} ${signeDansEq(b).signe} ${b}$`,
          et4: `${texte_gras(`Étape 4 :`)} $${inc} = \\dfrac{${d} ${signeDansEq(b).signe} ${b}}{${a - c}} $`,
          et_fin: `${texte_gras(`Étape 5 :`)} $${inc} = \\dfrac{${d + b}}{${a - c}}$ ${simpFrac(d + b, a - c)}`,
          err: `
            L'erreur se situe à l'étape 1.
            <br>${currentGenreEtPrenom.prenom} "a fait passer" le terme $${signeDansEq(b).signe} ${b}$ "de l'autre côté"
            or pour obtenir une équation équivalente, il s'agit d'opérer de la même manière sur les deux membres de l'équation.
            <br>Ici il faut ${signeDansEq(b).operation} $${signeDansEq(b).chgt_signe}$ aux deux membres.            
            `,
          eq_corr: `${texte_gras(`Équation d'origine : `)} $${a}${inc} ${signeDansEq(b).signe} ${b} = ${c}${inc} ${signeDansEq(d).signe} ${d} $`,
          eq_corr_et1: `
          ${texte_gras(`Étape 1 :`)} $${mise_en_evidence(signeDansEq(c).operation)}$ $${mise_en_evidence(signeDansEq(c).chgt_signe)}$${texte_en_couleur(`$${inc}$`)} aux deux membres 
          <br> $${a}${inc} ${mise_en_evidence(signeDansEq(-c).signe)} ${mise_en_evidence(-c)}$${texte_en_couleur(`$${inc}$`)} $${signeDansEq(b).signe} ${b} = ${d} ${signeDansEq(c).signe} ${c}${inc} ${mise_en_evidence(signeDansEq(-c).signe)} ${mise_en_evidence(-c)}$${texte_en_couleur(`$${inc}$`)}
          <br>${texte_gras(`Étape 2 : `)} On réduit.
          <br> $${a - c}${inc} ${signeDansEq(b).signe} ${b} = ${d}$
          `,// l'erreur est là, on passe de l'autre côté d'où l'oubli du chgt de signe
          eq_corr_et2: `
          ${texte_gras(`Étape 3 :`)} $${mise_en_evidence(signeDansEq(b).operation)}$ $${mise_en_evidence(signeDansEq(b).chgt_signe)}$ aux deux membres 
          <br> $${a - c}${inc} ${signeDansEq(b).signe} ${b} ${mise_en_evidence(signeDansEq(-b).signe)} ${mise_en_evidence(-b)} = ${d} ${mise_en_evidence(signeDansEq(-b).signe)} ${mise_en_evidence(-b)}$
          <br>${texte_gras(`Étape 4 : `)} Réduction à nouveau.
          <br> $${a - c}${inc} = ${d - b}$
          `,
          eq_corr_et3: `
          ${texte_gras(`Étape 5 :`)} $${mise_en_evidence(`\\textbf{diviser par}`)}$ $${mise_en_evidence(a - c)}$ les deux membres
          <br> $\\dfrac{${a - c}${inc}}{${mise_en_evidence(a - c)}} = \\dfrac{${d - b}}{${mise_en_evidence(a - c)}}$
          <br>$${inc} = \\dfrac{${d - b}}{${a - c}}$ ${simpFrac(d - b, a - c)}
          `,
        },
        {//case 5 --> ax+b=cx+d  erreur à l'étape 4 on soustrait au lieu de diviser
          pronom: currentGenreEtPrenom.pronom,
          prenom: currentGenreEtPrenom.prenom,
          a: a,
          b: b,
          c: c,
          d: d,
          inc: inc,
          eq: `$${a}${inc} ${signeDansEq(b).signe} ${b} = ${c}${inc} ${signeDansEq(d).signe} ${d} $`,
          et1: `${texte_gras(`Étape 1 :`)} $${a}${inc} = ${c}${inc} ${signeDansEq(d).signe} ${d} ${signeDansEq(-b).signe} ${-b}$`,
          et2: `${texte_gras(`Étape 2 :`)} $${a}${inc} ${signeDansEq(-c).signe} ${-c}${inc} = ${d} ${signeDansEq(-b).signe} ${-b}$`,
          et3: `${texte_gras(`Étape 3 :`)} $${a - c}${inc} = ${d} ${signeDansEq(-b).signe} ${-b}$`,
          et4: `${texte_gras(`Étape 4 :`)} $${inc} = ${d} ${signeDansEq(-b).signe} ${-b} - ${ecriture_parenthese_si_negatif(a - c)} $`,
          et_fin: `${texte_gras(`Étape 5 :`)} $${inc} = ${d - b - a + c}$`,
          err: `
            L'erreur se situe à l'étape 4.
            <br>${currentGenreEtPrenom.prenom} soustrait le coefficient de ${inc} au lieu de diviser par ce coefficient.
            <br>Or $${a - c}${inc}$ représente la multiplication $${a - c}\\times ${inc}$, et l'opération inverse de la multiplication c'est la division et non la soustraction.
            <br>Ici il faut diviser les deux membres par $${a - c}$.            
            `,
          eq_corr: `${texte_gras(`Équation d'origine : `)} $${a}${inc} ${signeDansEq(b).signe} ${b} = ${c}${inc} ${signeDansEq(d).signe} ${d} $`,
          eq_corr_et1: `
          ${texte_gras(`Étape 1 :`)} $${mise_en_evidence(signeDansEq(c).operation)}$ $${mise_en_evidence(signeDansEq(c).chgt_signe)}$${texte_en_couleur(`$${inc}$`)} aux deux membres 
          <br> $${a}${inc} ${mise_en_evidence(signeDansEq(-c).signe)} ${mise_en_evidence(-c)}$${texte_en_couleur(`$${inc}$`)} $${signeDansEq(b).signe} ${b} = ${d} ${signeDansEq(c).signe} ${c}${inc} ${mise_en_evidence(signeDansEq(-c).signe)} ${mise_en_evidence(-c)}$${texte_en_couleur(`$${inc}$`)}
          <br>${texte_gras(`Étape 2 : `)} On réduit.
          <br> $${a - c}${inc} ${signeDansEq(b).signe} ${b} = ${d}$
          `,// l'erreur est là, on passe de l'autre côté d'où l'oubli du chgt de signe
          eq_corr_et2: `
          ${texte_gras(`Étape 3 :`)} $${mise_en_evidence(signeDansEq(b).operation)}$ $${mise_en_evidence(signeDansEq(b).chgt_signe)}$ aux deux membres 
          <br> $${a - c}${inc} ${signeDansEq(b).signe} ${b} ${mise_en_evidence(signeDansEq(-b).signe)} ${mise_en_evidence(-b)} = ${d} ${mise_en_evidence(signeDansEq(-b).signe)} ${mise_en_evidence(-b)}$
          <br>${texte_gras(`Étape 4 : `)} Réduction à nouveau.
          <br> $${a - c}${inc} = ${d - b}$
          `,
          eq_corr_et3: `
          ${texte_gras(`Étape 5 :`)} $${mise_en_evidence(`\\textbf{diviser par}`)}$ $${mise_en_evidence(a - c)}$ les deux membres
          <br> $\\dfrac{${a - c}${inc}}{${mise_en_evidence(a - c)}} = \\dfrac{${d - b}}{${mise_en_evidence(a - c)}}$
          <br>$${inc} = \\dfrac{${d - b}}{${a - c}}$ ${simpFrac(d - b, a - c)}
          `,
        },

      ];



      let enonces = [];
      for (let k = 0; k < 5; k++) {
        enonces.push({
          enonce: `
          ${situations[k].prenom} doit résoudre l'équation suivante : ${situations[k].eq}.
          <br> Voilà ce qu'${situations[k].pronom} écrit :
          <br>${situations[k].et1}
          <br>${situations[k].et2}
          <br>${situations[k].et3}
          <br>${situations[k].et4}
          <br>${situations[k].et_fin}
        `,
          question: ``,
          correction: `
        ${situations[k].err}
        <br>
        ${texte_gras(`=== Voici une proposition de résolution détaillée : ===`)}         
        <br>${situations[k].eq_corr}
        <br>${situations[k].eq_corr_et1}
        <br>${situations[k].eq_corr_et2}
        <br>${situations[k].eq_corr_et3}
        `
        });
      };

      switch (liste_type_de_questions[i]) {
        case 1:
          texte = `${enonces[0].enonce}`;
          if (this.debug) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`;
            texte += `
             `
            texte_corr = ``;
          } else {
            texte_corr = `${enonces[0].correction}`;
          };
          break;
        case 2:
          texte = `${enonces[1].enonce}`;
          if (this.debug) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[1].correction}`;
            texte_corr = ``;
          } else {
            texte_corr = `${enonces[1].correction}`;
          };
          break;
        case 3:
          texte = `${enonces[2].enonce}`;
          if (this.debug) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[2].correction}`;
            texte_corr = ``;
          } else {
            texte_corr = `${enonces[2].correction}`;
          };
          break;
        case 4:
          texte = `${enonces[3].enonce}`;
          if (this.debug) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[3].correction}`;
            texte_corr = ``;
          } else {
            texte_corr = `${enonces[3].correction}`;
          };
          break;
        case 5:
          texte = `${enonces[4].enonce}`;
          if (this.debug) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[4].correction}`;
            texte_corr = ``;
          } else {
            texte_corr = `${enonces[4].correction}`;
          };
          break;

      }


      if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);

  }
  //this.besoin_formulaire_numerique = ['Niveau de difficulté',2,"1 : Entiers naturels\n2 : Entiers relatifs"];
  //this.besoin_formulaire2_case_a_cocher = ["Avec des équations du second degré"];	
}

/** 
 * * Dessiner selon un programme scratch
 * * 4Algo1-0
 * @author Sébastien Lozano
 */
function Tracer_avec_scratch() {
  'use strict';
  Exercice.call(this); // Héritage de la classe Exercice()
  this.debug = false;
  this.sup = 1;
  if (this.debug) {
    this.nb_questions = 1;
  } else {
    this.nb_questions = 1;
  };

  this.titre = "Dessiner avec scratch";
  //this.consigne = "Dessiner la figure qui va être tracée avec le script fourni.";
  this.consigne = "Laquelle des 4 figures ci-dessous va être tracée avec le script fourni ?";

  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  //this.nb_questions_modifiable = false;
  //sortie_html? this.spacing = 3 : this.spacing = 2; 
  //sortie_html? this.spacing_corr = 3 : this.spacing_corr = 2;

  this.liste_packages = "scratch3";

  let type_de_questions_disponibles;

  this.nouvelle_version = function (numero_de_l_exercice) {
    if (this.debug) {
      type_de_questions_disponibles = [1];
    } else {
      type_de_questions_disponibles = [1];
    };

    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    //type_de_questions_disponibles=[1];			

    //let liste_type_de_questions  = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions) // Tous les types de questions sont posées --> à remettre comme ci dessus		

    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
      // une fonction pour gérer la sortie HTML/LaTeX
      // code est un string contenant le code svg ou tikz
      function scratchblocks_Tikz(code_svg, code_tikz) {
        if (sortie_html) {
          return code_svg;
        } else {
          return code_tikz;
        };
      };

      // une fonction pour dire le nom du polygone
      function myPolyName(n) {
        let sortie = {
          name: ``,
          nameParSommets: ``,
          nb_pas: ``
        };
        switch (n) {
          case 2:
            sortie.name = `segment`;
            sortie.nameParSommets = `AB`;
            sortie.nb_pas = 400;
          case 3:
            sortie.name = `triangle équilatéral`;
            sortie.nameParSommets = `ABC`;
            sortie.nb_pas = 400;
            break;
          case 4:
            sortie.name = `carré`;
            sortie.nameParSommets = `ABCD`;
            sortie.nb_pas = 400;
            break;
          case 5:
            sortie.name = `pentagone régulier`;
            sortie.nameParSommets = `ABCDE`;
            sortie.nb_pas = 300;
            break;
          case 6:
            sortie.name = `hexagone régulier`;
            sortie.nameParSommets = `ABCDEF`;
            sortie.nb_pas = 250;
            break;
          case 7:
            sortie.name = `heptagone régulier`;
            sortie.nameParSommets = `ABCDEFG`;
            sortie.nb_pas = 200;
            break;
          case 8:
            sortie.name = `octogone régulier`;
            sortie.nameParSommets = `ABCDEFGH`;
            sortie.nb_pas = 200;
            break;
          case 9:
            sortie.name = `ennéagone régulier`;
            sortie.nameParSommets = `ABCDEFGHI`;
            sortie.nb_pas = 200;
            break;

        }
        return sortie;
      }


      // on définit le nombre de côtés du polygone régulier
      let n = randint(3, 8, [7]);

      let situations = [
        {//polygones réguliers
          nb_cotes: n,
          nom: myPolyName(n).name,
          code_svg: `
          <pre class='blocks'>
          quand le drapeau vert pressé
          stylo en position d'écriture
          répéter (${n}) fois
            avancer de (${myPolyName(n).nb_pas}) pas
            tourner droite de ((360)/(${n})) degrés
          fin                  
          </pre>          
          `,
          code_tikz: `
          \\begin{scratch}
            \\blockinit{quand \\greenflag est cliqué}
            \\blockpen{stylo en position d’écriture}
            \\blockrepeat{répéter \\ovalnum{${n}} fois}
              {
                \\blockmove{avancer de \\ovalnum{${myPolyName(n).nb_pas}}}
                \\blockmove{tourner \\turnright{} de \\ovaloperator{\\ovalnum{360}/\\ovalnum{${n}}} degrés}
              }
          \\end{scratch}
          `,
          fig: ``,
          fig_corr: ``,
        },
      ];
      // on prépare la fenetre mathalea2d
      let fenetreMathalea2D = { xmin: -4, ymin: -10, xmax: 30, ymax: 2, pixelsParCm: 20, scale: 0.5 }
      //    if (sortie_html) {
      pixelsParCm = 100;
      unitesLutinParCm = 100;
      // } else {
      //   pixelsParCm = 200;
      //   unitesLutinParCm = 200;  
      // }
      // on prépare un tableau avec l'abscisse de démarrage du lutin pour tracer le figures
      // ce tableau permettra de placer aléatoirement la bonne figure et de la refaire en rouge ?
      let tab_abs_dem_lutin2;
      if (n == 6) {
        tab_abs_dem_lutin2 = [0, 3 * myPolyName(n).nb_pas, 6 * myPolyName(n).nb_pas, 9 * myPolyName(n).nb_pas]
      } else if (n == 8) {
        tab_abs_dem_lutin2 = [0, 4 * myPolyName(n).nb_pas, 8 * myPolyName(n).nb_pas, 12 * myPolyName(n).nb_pas]
      } else {
        tab_abs_dem_lutin2 = [0, 2 * myPolyName(n).nb_pas, 4 * myPolyName(n).nb_pas, 6 * myPolyName(n).nb_pas]
      };
      // on mélange tout ça !
      tab_abs_dem_lutin2 = shuffle(tab_abs_dem_lutin2);
      // Les figures de l'énoncé         
      // le lutin2  trace le cadre en pointillés
      let lutin2 = creerLutin();
      lutin2.color = "black";
      lutin2.pointilles = true;
      allerA(fenetreMathalea2D.xmin * pixelsParCm, fenetreMathalea2D.ymax * pixelsParCm, lutin2);
      baisseCrayon(lutin2);
      allerA(fenetreMathalea2D.xmax * pixelsParCm, fenetreMathalea2D.ymax * pixelsParCm, lutin2);
      allerA(fenetreMathalea2D.xmax * pixelsParCm, fenetreMathalea2D.ymin * pixelsParCm, lutin2);
      allerA(fenetreMathalea2D.xmin * pixelsParCm, fenetreMathalea2D.ymin * pixelsParCm, lutin2);
      allerA(fenetreMathalea2D.xmin * pixelsParCm, fenetreMathalea2D.ymax * pixelsParCm, lutin2);
      leveCrayon(lutin2);
      //le lutin2 fait la bonne figure
      lutin2.pointilles = false;
      lutin2.color = "blue";
      allerA(tab_abs_dem_lutin2[0], 0, lutin2);
      baisseCrayon(lutin2);
      for (let k = 1; k < n + 1; k++) {
        avance(myPolyName(n).nb_pas, lutin2);
        tournerD(calcul(360 / n), lutin2);
      };
      // le lutin2 fait un polygone régulier avec un côté de plus 
      leveCrayon(lutin2);
      allerA(tab_abs_dem_lutin2[1], 0, lutin2);
      baisseCrayon(lutin2);
      for (let k = 1; k < n + 1 + 1; k++) {
        avance(myPolyName(n + 1).nb_pas, lutin2);
        tournerD(calcul(360 / (n + 1)), lutin2);
      };

      // le lutin2 fait un polygone régulier avec un côté de moins 
      leveCrayon(lutin2);
      allerA(tab_abs_dem_lutin2[2], 0, lutin2);
      baisseCrayon(lutin2);
      for (let k = 1; k < n; k++) {
        avance(myPolyName(n - 1).nb_pas, lutin2);
        tournerD(calcul(360 / (n - 1)), lutin2);
      };

      // le lutin2 fait une figure ouverte à n côtés
      leveCrayon(lutin2);
      allerA(tab_abs_dem_lutin2[3], 0, lutin2);
      baisseCrayon(lutin2);
      for (let k = 1; k < n + 1; k++) {
        avance(myPolyName(n).nb_pas, lutin2);
        tournerD(calcul((360 / n) - 10), lutin2);
      };
      allerA(tab_abs_dem_lutin2[3], 0, lutin2);

      let mesAppels_enonce = [
        lutin2,
      ]
      situations[0].fig = mathalea2d(
        fenetreMathalea2D,
        mesAppels_enonce
      );

      // les figures de la correction
      // le lutin3  trace le cadre
      let lutin3 = creerLutin();
      lutin3.color = "black";
      lutin3.pointilles = true;
      allerA(fenetreMathalea2D.xmin * pixelsParCm, fenetreMathalea2D.ymax * pixelsParCm, lutin3);
      baisseCrayon(lutin3);
      allerA(fenetreMathalea2D.xmax * pixelsParCm, fenetreMathalea2D.ymax * pixelsParCm, lutin3);
      allerA(fenetreMathalea2D.xmax * pixelsParCm, fenetreMathalea2D.ymin * pixelsParCm, lutin3);
      allerA(fenetreMathalea2D.xmin * pixelsParCm, fenetreMathalea2D.ymin * pixelsParCm, lutin3);
      allerA(fenetreMathalea2D.xmin * pixelsParCm, fenetreMathalea2D.ymax * pixelsParCm, lutin3);
      leveCrayon(lutin3);
      // le lutin3 fait la bonne figure      
      lutin3.pointilles = false;
      lutin3.color = "green"
      allerA(tab_abs_dem_lutin2[0], 0, lutin3);
      baisseCrayon(lutin3);
      for (let k = 1; k < n + 1; k++) {
        avance(myPolyName(n).nb_pas, lutin3);
        tournerD(calcul(360 / n), lutin3);
      };
      // le lutin3 fait un polygone régulier avec un côté de plus 
      lutin3.color = "red";
      leveCrayon(lutin3);
      allerA(tab_abs_dem_lutin2[1], 0, lutin3);
      baisseCrayon(lutin3);
      for (let k = 1; k < n + 1 + 1; k++) {
        avance(myPolyName(n + 1).nb_pas, lutin3);
        tournerD(calcul(360 / (n + 1)), lutin3);
      };

      // le lutin3 fait un polygone régulier avec un côté de moins 
      leveCrayon(lutin3);
      allerA(tab_abs_dem_lutin2[2], 0, lutin3);
      baisseCrayon(lutin3);
      for (let k = 1; k < n; k++) {
        avance(myPolyName(n - 1).nb_pas, lutin3);
        tournerD(calcul(360 / (n - 1)), lutin3);
      };

      // le lutin3 fait une figure ouverte à n côtés
      leveCrayon(lutin3);
      allerA(tab_abs_dem_lutin2[3], 0, lutin3);
      baisseCrayon(lutin3);
      for (let k = 1; k < n + 1; k++) {
        avance(myPolyName(n).nb_pas, lutin3);
        tournerD(calcul((360 / n) - 10), lutin3);
      };
      allerA(tab_abs_dem_lutin2[3], 0, lutin3);

      let mesAppels_corr = [
        lutin3,
      ]
      situations[0].fig_corr = mathalea2d(
        fenetreMathalea2D,
        mesAppels_corr
      );


      let enonces = [];
      enonces.push({
        enonce: `
        ${scratchblocks_Tikz(situations[0].code_svg, situations[0].code_tikz)}
        <br> 
        ${situations[0].fig}
        `,
        question: ``,
        correction: `
        <br> Les figures rouges sont erronées.
        <br> La figure tracée par le programme a ${situations[0].nb_cotes} côtés de même longueur et ${situations[0].nb_cotes} angles de même mesure, c'est un ${situations[0].nom}.
        <br>${texte_en_couleur(`La bonne figure est donc la figure verte.`)}
        <br><br>
        ${situations[0].fig_corr}
        `
      });
      enonces.push({
        enonce: `énoncé type 2`,
        question: ``,
        correction: `${texte_en_couleur(`correction type2`)}`
      });

      switch (liste_type_de_questions[i]) {
        case 1:
          texte = `${enonces[0].enonce}`;
          if (this.debug) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`;
            texte_corr = ``;
          } else {
            texte_corr = `${enonces[0].correction}`;
          };
          break;
        case 2:
          texte = `${enonces[1].enonce}`;
          if (this.debug) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[1].correction}`;
            texte_corr = ``;
          } else {
            texte_corr = `${enonces[1].correction}`;
          };
          break;
      }


      if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);

  }
  //this.besoin_formulaire_numerique = ['Niveau de difficulté',2,"1 : Entiers naturels\n2 : Entiers relatifs"];
  //this.besoin_formulaire2_case_a_cocher = ["Avec des équations du second degré"];	
}

/**
* Effectuer une division entre 2 nombres relatifs écrite sous la forme d'une fraction.
*
* * On peut choisir de n'avoir que des tables de multiplications, par défaut il y a aussi des divisions simples par 2, 3 ou 4
* @Auteur Rémi Angot
* 4C10-4
*/
function Exercice_quotients_relatifs() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = false;
  this.titre = "Quotient de deux entiers relatifs"
  this.consigne = 'Calculer'
  this.spacing = 2;
  this.nb_questions = 6;

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let liste_type_de_questions = combinaison_listes(['-+', '+-', '--', '++'], this.nb_questions);
    let liste_type_de_nombres = combinaison_listes(['tables', 'horstables'], this.nb_questions);
    if (this.sup) {
      liste_type_de_nombres = combinaison_listes(['tables'], this.nb_questions);
    }
    for (let i = 0, a, b, q, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
      if (liste_type_de_nombres[i] == 'tables') {
        b = randint(2, 9);
        a = b * randint(2, 9);
      } else {
        b = choice([11, 12, 13, 14, 15, 16, 20, 60, 80]);
        a = b * randint(2, 4)
      }
      switch (liste_type_de_questions[i]) {
        case '-+':
          a *= -1;
          break;
        case '+-':
          b *= -1;
          break;
        case '--':
          a *= -1;
          b *= -1;
        default:
          break;
      }
      texte = `$\\dfrac{${a}}{${b}}$`
      texte_corr = `$\\dfrac{${a}}{${b}}=${calcul(a / b)}$`

      if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  }
  this.besoin_formulaire_case_a_cocher = ['Utiliser seulement les tables de multiplications de 2 à 9'];
}

/**
* Effectuer des multiplications de relatifs dans un tableau à double entrée
*
* @Auteur Rémi Angot
* 4C10-5
*/
function Exercice_tableau_multiplications_relatifs() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = false;
  this.titre = "Multiplications de deux entiers relatifs dans un tableau à double entrée"
  this.consigne = 'Calculer'
  this.spacing = 1;
  this.nb_questions = 1;
  this.nb_questions_modifiable = false;

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let liste_signes1 = combinaison_listes([-1, 1], 4);
    let liste_signes2 = combinaison_listes([-1, 1], 4);
    let a1 = randint(2, 9);
    let a2 = randint(2, 9, a1);
    let a3 = randint(2, 9, [a1, a2]);
    let a4 = randint(2, 9, [a1, a2, a3]);
    let b1 = randint(2, 9);
    let b2 = randint(2, 9, b1);
    let b3 = randint(2, 9, [b1, b2]);
    let b4 = randint(2, 9, [b1, b2, b3]);
    a1 *= liste_signes1[0]
    a2 *= liste_signes1[1]
    a3 *= liste_signes1[2]
    a4 *= liste_signes1[3]
    b1 *= liste_signes1[0]
    b2 *= liste_signes1[1]
    b3 *= liste_signes1[2]
    b4 *= liste_signes1[3]

    let texte = `$\\def\\arraystretch{1.5}\\begin{array}{|c|c|c|c|c|}
    \\hline
    \\times & ${ecriture_algebrique(a1)} & ${ecriture_algebrique(a2)} & ${ecriture_algebrique(a3)} & ${ecriture_algebrique(a4)} \\\\
    \\hline
    ${ecriture_algebrique(b1)} &  &  & &  \\\\
    \\hline
    ${ecriture_algebrique(b2)} & & & & \\\\
    \\hline
    ${ecriture_algebrique(b3)} & & & & \\\\
    \\hline
    ${ecriture_algebrique(b4)} & & & & \\\\
    \\hline
    \\end{array}$`

    let texte_corr = `$\\def\\arraystretch{1.5}\\begin{array}{|c|c|c|c|c|}
    \\hline
    \\times & ${ecriture_algebrique(a1)} & ${ecriture_algebrique(a2)} & ${ecriture_algebrique(a3)} & ${ecriture_algebrique(a4)} \\\\
    \\hline
    ${ecriture_algebrique(b1)} & ${ecriture_algebrique(a1 * b1)} & ${ecriture_algebrique(a2 * b1)} & ${ecriture_algebrique(a3 * b1)} & ${ecriture_algebrique(a4 * b1)} \\\\
    \\hline
    ${ecriture_algebrique(b2)} & ${ecriture_algebrique(a1 * b2)} & ${ecriture_algebrique(a2 * b2)} & ${ecriture_algebrique(a3 * b2)} & ${ecriture_algebrique(a4 * b2)} \\\\
    \\hline
    ${ecriture_algebrique(b3)} & ${ecriture_algebrique(a1 * b3)} & ${ecriture_algebrique(a2 * b3)} & ${ecriture_algebrique(a3 * b3)} & ${ecriture_algebrique(a4 * b3)} \\\\
    \\hline
    ${ecriture_algebrique(b4)} & ${ecriture_algebrique(a1 * b4)} & ${ecriture_algebrique(a2 * b4)} & ${ecriture_algebrique(a3 * b4)} & ${ecriture_algebrique(a4 * b4)} \\\\
    \\hline
    \\end{array}$`
    this.liste_questions.push(texte);
    this.liste_corrections.push(texte_corr);
    liste_de_question_to_contenu(this);

  }
}


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
function Priorites_et_relatifs() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Calculs utilisant les priorités opératoires";
  this.consigne = "Calculer";
  this.nb_questions = 5;
  this.nb_cols = 2;
  this.nb_cols_corr = 1;
  this.sup = 3;

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
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
      let i = 0, texte, texte_corr, a, b, c, d, signes, cpt = 0;
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

/**
 * Exercices sur le théorème de Pythagore avec MathALEA2D
 * @Auteur Rémi Angot
 * 4G20
 */
function Pythagore2D() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Calculer une longueur avec le théorème de Pythagore";
  this.nb_questions = 3;
  this.nb_cols = 3;
  this.nb_cols_corr = 1;
  this.type_exercice = 'Calculer'

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let liste_type_de_questions = [];
    let liste_de_noms_de_polygones = [];
    if (this.sup == 1) {
      this.consigne = "Dans chaque cas, donner l'égalité de Pythagore."
    } else if (this.sup == 2) {
      this.consigne = "Dans chaque cas, compléter l'égalité en utilisant le théorème de Pythagore."
    } else {
      this.consigne = "Dans chaque cas, calculer la longueur manquante."
    }
    if (this.sup == 2 || this.type_exercice == 'Calculer') {
      liste_type_de_questions = combinaison_listes(['AB', 'BC', 'AC'], this.nb_questions)
    }
    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
      texte = '';
      texte_corr = '';
      let A1 = point(0, 0)
      let B1 = point(calcul(randint(22, 50) / 10), 0)
      let C1 = similitude(B1, A1, 90, calcul(randint(22, 50) / 10) / longueur(A1, B1))
      let p1 = polygone(A1, B1, C1)
      p1.isVisible = false
      let p2 = rotation(p1, A1, randint(0, 360))
      let A = p2.listePoints[0]
      let B = p2.listePoints[1]
      let C = p2.listePoints[2]
      let codage = codageAngleDroit(B, A, C)
      let xmin = Math.min(A.x, B.x, C.x) - 1
      let ymin = Math.min(A.y, B.y, C.y) - 1
      let xmax = Math.max(A.x, B.x, C.x) + 1
      let ymax = Math.max(A.y, B.y, C.y) + 1
      let nomDuPolygone = creerNomDePolygone(3, liste_de_noms_de_polygones);
      liste_de_noms_de_polygones.push(nomDuPolygone)
      let nomme = nommePolygone(p2, nomDuPolygone)
      let affAB = afficheLongueurSegment(B, A)
      let affAC = afficheLongueurSegment(A, C)
      let affBC = afficheLongueurSegment(C, B)
      let longueurAB = longueur(A, B, 1)
      let longueurAC = longueur(A, C, 1)
      let longueurBC = longueur(B, C, 1)
      let mesObjetsATracer = [codage, p2, nomme]

      if (this.type_exercice == 'Calculer' && liste_type_de_questions[i] == 'AB') {
        mesObjetsATracer.push(affAC, affBC)
      }
      if (this.type_exercice == 'Calculer' && liste_type_de_questions[i] == 'BC') {
        mesObjetsATracer.push(affAC, affAB)
      }
      if (this.type_exercice == 'Calculer' && liste_type_de_questions[i] == 'AC') {
        mesObjetsATracer.push(affAB, affBC)
      }

      if (!sortie_html) { texte = '~\\\\' }
      texte += mathalea2d({ xmin: xmin, xmax: xmax, ymin: ymin, ymax: ymax, scale: .6 }, mesObjetsATracer);
      if (this.sup == 2) {
        if (liste_type_de_questions[i] == 'AB') {
          texte += `<br>$${A.nom + B.nom}^2=\\ldots$`
        }
        if (liste_type_de_questions[i] == 'BC') {
          texte += `<br>$${B.nom + C.nom}^2=\\ldots$`
        }
        if (liste_type_de_questions[i] == 'AC') {
          texte += `<br>$${A.nom + C.nom}^2=\\ldots$`
        }
      }
      if (!sortie_html && i != this.nb_questions - 1) { texte += '\\columnbreak' } //pour la sortie LaTeX sauf la dernière question

      texte_corr = `Le triangle $${nomDuPolygone}$ est rectangle en $${A.nom}$ donc d'après le théorème de Pythagore, on a : `;
      texte_corr += `$${B.nom + C.nom}^2=${A.nom + B.nom}^2+${A.nom + C.nom}^2$`
      if (this.sup == 2) {
        if (liste_type_de_questions[i] == 'AB') {
          texte_corr += ` d'où $${A.nom + B.nom}^2=${B.nom + C.nom}^2-${A.nom + C.nom}^2$.`
        }
        if (liste_type_de_questions[i] == 'BC') {
          texte_corr += `.`
        }
        if (liste_type_de_questions[i] == 'AC') {
          texte_corr += ` d'où $${A.nom + C.nom}^2=${B.nom + C.nom}^2-${A.nom + B.nom}^2$.`
        }
      }
      if (this.type_exercice == "Calculer") {
        if (liste_type_de_questions[i] == 'AB') {
          texte_corr += ` donc $${A.nom + B.nom}^2=${B.nom + C.nom}^2-${A.nom + C.nom}^2$`
          texte_corr += `<br> $${A.nom + B.nom}^2=${tex_nombre(longueurBC)}^2-${tex_nombre(longueurAC)}^2=${tex_nombrec(longueurBC ** 2 - longueurAC ** 2)}$`
          texte_corr += `<br> $${A.nom + B.nom}=\\sqrt{${tex_nombrec(longueurBC ** 2 - longueurAC ** 2)}}$`
          if (calcul(Math.sqrt(longueurBC ** 2 - longueurAC ** 2), 1) == calcul(Math.sqrt(longueurBC ** 2 - longueurAC ** 2), 5)) {
            texte_corr += `<br> $${A.nom + B.nom}=${tex_nombre(calcul(Math.sqrt(longueurBC ** 2 - longueurAC ** 2), 1))}$ cm.`
          } else {
            texte_corr += `<br> $${A.nom + B.nom}\\approx${tex_nombre(calcul(Math.sqrt(longueurBC ** 2 - longueurAC ** 2), 1))}$ cm.`
          }
        }
        if (liste_type_de_questions[i] == 'BC') {
          texte_corr += `<br> $${B.nom + C.nom}^2=${tex_nombre(longueurAB)}^2+${tex_nombre(longueurAC)}^2=${tex_nombrec(longueurAB ** 2 + longueurAC ** 2)}$`
          texte_corr += `<br> $${B.nom + C.nom}=\\sqrt{${tex_nombrec(longueurAB ** 2 + longueurAC ** 2)}}$`
          if (calcul(Math.sqrt(longueurAB ** 2 + longueurAC ** 2), 1) == calcul(Math.sqrt(longueurAB ** 2 + longueurAC ** 2), 5)) {
            texte_corr += `<br> $${B.nom + C.nom}=${tex_nombre(calcul(Math.sqrt(longueurAB ** 2 + longueurAC ** 2), 1))}$ cm.`
          } else {
            texte_corr += `<br> $${B.nom + C.nom}\\approx${tex_nombre(calcul(Math.sqrt(longueurAB ** 2 + longueurAC ** 2), 1))}$ cm.`
          }
        }
        if (liste_type_de_questions[i] == 'AC') {
          texte_corr += ` donc $${A.nom + C.nom}^2=${B.nom + C.nom}^2-${A.nom + B.nom}^2$`
          texte_corr += `<br> $${A.nom + C.nom}^2=${tex_nombre(longueurBC)}^2-${tex_nombre(longueurAB)}^2=${tex_nombrec(longueurBC ** 2 - longueurAB ** 2)}$`
          texte_corr += `<br> $${A.nom + C.nom}=\\sqrt{${tex_nombrec(longueurBC ** 2 - longueurAB ** 2)}}$`
          if (calcul(Math.sqrt(longueurBC ** 2 - longueurAB ** 2), 1) == calcul(Math.sqrt(longueurBC ** 2 - longueurAB ** 2), 5)) {
            texte_corr += `<br> $${A.nom + C.nom}=${tex_nombre(calcul(Math.sqrt(longueurBC ** 2 - longueurAB ** 2), 1))}$ cm.`
          } else {
            texte_corr += `<br> $${A.nom + C.nom}\\approx${tex_nombre(calcul(Math.sqrt(longueurBC ** 2 - longueurAB ** 2), 1))}$ cm.`
          }
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
    liste_de_question_to_contenu(this);
  };
  //this.besoin_formulaire_numerique = ['Niveau de difficulté',3,"1 : Donner l'égalité de Pythagore\n2 : Compléter l'égalité de Pythagore\n3 : Calculer une longueur manquante"];
}
// 4G20-1
function Egalite_Pythagore2D() {
  Pythagore2D.call(this);
  this.titre = "Donner ou compléter une égalité de Pythagore"
  this.sup = 1;
  this.type_exercice = ''
  this.besoin_formulaire_numerique = ['Niveau de difficulté', 2, "1 : Donner l'égalité de Pythagore\n2 : Compléter l'égalité de Pythagore"];

}

/** 
 * * Equation type x/a=b/c
 * * numéro de l'exo ex : 4L15-1 fils de 3L13-2
 * * publication initiale le 22/11/2020
 * * modification le jj/mm/aaaa pour ....
 * @author Sébastien Lozano
 */

function Equations_fractions() {
  this.exo = `4L15-1`;
  Eq_resolvantes_Thales.call(this);
};

/** 
 * * Quatrieme proportionnelle dans un tableau du type 
 * ---------
 * | x | b |
 * ---------
 * | a | c |
 * --------- 
 * * numéro de l'exo ex : 4P10-2 fils de 3L13-2
 * * publication initiale le 15/12/2020
 * * modification le jj/mm/aaaa pour ....
 * @author Sébastien Lozano
 */

function Tableaux_et_quatrieme_proportionnelle() {
  this.exo = `4P10-2`;
  Eq_resolvantes_Thales.call(this);
};


