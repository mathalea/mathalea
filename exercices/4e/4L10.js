import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,ecriture_algebrique,ecriture_parenthese_si_negatif,ecriture_parenthese_si_moins,signe,abs,lettre_depuis_chiffre} from "/modules/outils.js"

/**
 * Développer en utilisant la distributivité simple
 *
 * * La lettre peut être x, y, z, t, a, b ou c
 * # À partir du niveau 2 
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
export default function Exercice_developper(difficulte = 1) {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = difficulte;
  this.titre = "Utiliser la simple distributivité";
  this.consigne = "Développer.";
  this.spacing = 1;
  this.nb_questions = 5;
  this.nb_cols_corr = 1;
  this.sup2 = true;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let lettre = ["x", "y", "z", "t", "a", "b", "c"];
    if (this.sup2){
      lettre = ["x"]
    }
    let type_de_questions_disponibles = [
      "simple",
      "simple",
      "simple2",
      "x_en_facteur",
      "developper_et_reduire",
    ];
    if (this.sup < 4) {
      type_de_questions_disponibles = ["simple"]
    }
    let type_de_questions
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
      type_de_questions = liste_type_de_questions[i];
      let k = randint(2, 11);
      if (this.sup > 2) {
        // si difficulté 2, k peut être négatif
        k = k * choice([-1, 1]);
      }
      let a = randint(1, 9);
      let b = randint(1, 9) * choice([-1, 1]);
      if (this.sup == 1){
        b = randint(1, 9)
      }
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
            )}\\times${ecriture_parenthese_si_negatif(b)}=${k * a}${inconnue}${ecriture_algebrique(k * b)}$`;
          } else {
            texte_corr = `$${lettre_depuis_chiffre(
              i + 1
            )}=${k}(${a}${inconnue}${ecriture_algebrique(b)})=${k}
						\\times ${a}${inconnue}+${ecriture_parenthese_si_negatif(
              k
            )}\\times${ecriture_parenthese_si_negatif(b)}=${k * a}${inconnue}${ecriture_algebrique(k * b)}$`;
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
            )}\\times${ecriture_parenthese_si_negatif(b)}=${k * a}${inconnue}${ecriture_algebrique(k * b)}$`;
          } else {
            texte_corr = `$${lettre_depuis_chiffre(
              i + 1
            )}=(${a}${inconnue}${ecriture_algebrique(
              b
            )})\\times${ecriture_parenthese_si_negatif(k)}=${k}
						\\times ${a}${inconnue}+${ecriture_parenthese_si_negatif(
              k
            )}\\times${ecriture_parenthese_si_negatif(b)}=${k * a}${inconnue}${ecriture_algebrique(k * b)}$`;
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
            )}${k}${inconnue}\\times ${abs(b)}=${k * a}${inconnue}^2${ecriture_algebrique(k * b)}${inconnue}$`;
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
						=${k * a}${inconnue}${ecriture_algebrique(k * b)}+${c}=${k * a}${inconnue}${ecriture_algebrique(k * b + c)}$`;
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
						=${k * a}${inconnue}${ecriture_algebrique(k * b)}+${c}=${k * a}${inconnue}${ecriture_algebrique(k * b + c)}$`;
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
  this.besoin_formulaire_numerique = ["Niveau de difficulté",4,"1 : Multiplication par un entier positif, tous les termes sont positifs\n2 : Multiplication par un entier positif\n3 : Multiplication par un entier relatif\n4: Multiplication par un facteur relatif et expressions sous des formes différentes ",
  ];
  this.besoin_formulaire2_case_a_cocher = ["$x$ est la seule lettre utilisée"]
}
