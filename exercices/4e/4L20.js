import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,rien_si_1,ecriture_algebrique,ecriture_parenthese_si_negatif,signe,abs,pgcd,tex_fraction_reduite,mise_en_evidence,tex_fraction} from "/modules/outils.js"

/**
 * Équation du premier degré
 * * Type 1 : x+a=b ou ax=b
 * * Type 2 : ax+b=c
 * * Type 3 : ax+b=cx+d
 * * Tous les types
 * @Auteur Rémi Angot
 * 4L20 et 3L13
 */
export default function Exercice_equation1() {
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

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let liste_type_de_questions
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
    for (let i = 0, a, b, c, d, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
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
      if (liste_type_de_questions[i] == "ax+b=0" ||
        liste_type_de_questions[i] == "ax+b=c") {
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
        )}=${c - b + mise_en_evidence("\\div" + ecriture_parenthese_si_negatif(a))}$<br>`;
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
        )}=${b + mise_en_evidence("\\div" + ecriture_parenthese_si_negatif(a))}$<br>`;
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
        mise_en_evidence("\\div" + ecriture_parenthese_si_negatif(a - c))}$<br>`;
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
