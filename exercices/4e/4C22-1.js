import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,choice,combinaison_listes,pgcd,tex_fraction_reduite,tex_nombrec,tex_fraction} from "/modules/outils.js"
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
export default function Exercice_trouver_l_inverse() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = 1; // Avec ou sans relatifs
  this.titre = "Trouver l'inverse d'un nombre";
  this.consigne =
    "Calculer l'inverse et donner la réponse sous forme décimale ou de fraction simplifiée quand c'est impossible";
  this.spacing = 2;
  this.spacing_corr = 2;
  this.nb_questions = 5;
  this.nb_cols_corr = 1;

  this.nouvelle_version = function () {
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
    for (let i = 0,
      nombre_choisi,
      nombre_inverse,
      nombre_inverse_num,
      nombre_inverse_den,
      texte,
      texte_corr,
      type_de_questions,
      cpt = 0; i < this.nb_questions && cpt < 50;) {
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
