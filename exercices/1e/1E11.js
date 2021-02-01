import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,rien_si_1,ecriture_algebrique,ecriture_algebrique_sauf1,ecriture_parenthese_si_negatif,arrondi_virgule,tex_fraction_reduite,tex_fraction_signe,tex_fraction} from "/modules/outils.js"

/**
 * Calcul de discriminant pour identifier la forme graphique associée (0 solution dans IR, 1 ou 2)
 * @Auteur Rémi Angot
 * Référence 1E11
*/
export default function Resoudre_equation_degre_2() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Résoudre une équation du second degré";
  this.consigne = "Résoudre dans $\\mathbb{R}$ les équations suivantes.";
  this.nb_questions = 4;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;
  this.spacing_corr = 3;
  this.sup = 1;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let liste_type_de_questions;
    if (this.sup == 1) {
      liste_type_de_questions = combinaison_listes(['solutionsEntieres', 'solutionsEntieres', 'solutionDouble', 'pasDeSolution'], this.nb_questions);
    }
    if (this.sup == 2) {
      liste_type_de_questions = combinaison_listes(['factorisationParx', 'pasDeSolution', 'ax2+c', 'solutionsReelles', 'solutionDouble'], this.nb_questions);
    }
    for (let i = 0, texte, texte_corr, a, b, c, x1, x2, y1, k, cpt = 0; i < this.nb_questions && cpt < 50;) {
      if (liste_type_de_questions[i] == "solutionsEntieres") {
        // k(x-x1)(x-x2)
        x1 = randint(-5, 2, [0]);
        x2 = randint(x1 + 1, 5, [0, -x1]);
        k = randint(-4, 4, [0]);
        a = k;
        b = -k * x1 - k * x2;
        c = k * x1 * x2;
        texte = `$${rien_si_1(a)}x^2${ecriture_algebrique_sauf1(b)}x${ecriture_algebrique(c)}=0$`;

        texte_corr = `$\\Delta = ${ecriture_parenthese_si_negatif(b)}^2-4\\times${ecriture_parenthese_si_negatif(a)}\\times${ecriture_parenthese_si_negatif(c)}=${b * b - 4 * a * c}$`;
        texte_corr += `<br>$\\Delta>0$ donc l'équation admet deux solutions : $x_1 = \\dfrac{-b-\\sqrt{\\Delta}}{2a}$ et $x_2 = \\dfrac{-b+\\sqrt{\\Delta}}{2a}$`;
        texte_corr += `<br>$x_1 =\\dfrac{${-b}-\\sqrt{${b * b - 4 * a * c}}}{${2 * a}}=${x1}$`;
        texte_corr += `<br>$x_2 =\\dfrac{${-b}+\\sqrt{${b * b - 4 * a * c}}}{${2 * a}}=${x2}$`;
        texte_corr += `<br>L'ensemble des solutions de cette équation est : $\\mathcal{S}=\\left\\{${x1} ; ${x2}\\right\\}$.`;
      }
      if (liste_type_de_questions[i] == "solutionDouble") {
        // (dx+e)^2=d^2x^2+2dex+e^2
        let d = randint(-11, 11, [-1, 1, 0]);
        let e = randint(-11, 11, [0, -1, 1]);
        a = d * d;
        b = 2 * d * e;
        c = e * e;
        texte = `$${rien_si_1(a)}x^2${ecriture_algebrique_sauf1(b)}x${ecriture_algebrique(c)}=0$`;

        texte_corr = `Il est possible de factoriser le membre de gauche : $(${d}x${ecriture_algebrique(e)})^2=0$. `;
        texte_corr += `On a alors une solution double : $${tex_fraction_signe(-e, d)}`;
        if (e % d == 0) {
          texte_corr += `=${-e / d}$.`;
        } else {
          texte_corr += '$.';
        }
        texte_corr += `<br> Si on ne voit pas cette factorisation, on peut utiliser le discriminant.`;
        texte_corr += `<br>$\\Delta = ${ecriture_parenthese_si_negatif(b)}^2-4\\times${ecriture_parenthese_si_negatif(a)}\\times${ecriture_parenthese_si_negatif(c)}=${b * b - 4 * a * c}$`;
        texte_corr += `<br>$\\Delta=0$ donc l'équation admet une unique solution : $${tex_fraction('-b', '2a')} = ${tex_fraction_reduite(-b, 2 * a)}$`;
        if (b % (2 * a) == 0) {
          texte_corr += `<br>L'ensemble des solutions de cette équation est : $\\mathcal{S}=\\left\\{${-b / (2 * a)}\\right\\}$.`;
        } else {
          texte_corr += `<br>L'ensemble des solutions de cette équation est : $\\mathcal{S}=\\left\\{${tex_fraction_reduite(-b, 2 * a)}\\right\\}$.`;
        }
      }
      if (liste_type_de_questions[i] == "solutionsReelles") {
        // ax^2+bx+c
        a = randint(-11, 11, 0);
        b = randint(-11, 11, 0);
        c = randint(-11, 11, 0);
        while (b ** 2 - 4 * a * c < 0 || [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400, 441, 484, 529, 576, 625, 676, 729, 784, 841, 900, 961, 1024, 1089].includes(b ** 2 - 4 * a * c)) {
          a = randint(-11, 11, 0);
          b = randint(-11, 11, 0);
          c = randint(-11, 11, 0);
        }
        texte = `$${rien_si_1(a)}x^2${ecriture_algebrique_sauf1(b)}x${ecriture_algebrique(c)}=0$`;

        texte_corr = `$\\Delta = ${ecriture_parenthese_si_negatif(b)}^2-4\\times${ecriture_parenthese_si_negatif(a)}\\times${ecriture_parenthese_si_negatif(c)}=${b * b - 4 * a * c}$`;
        texte_corr += `<br>$\\Delta>0$ donc l'équation admet deux solutions : $x_1 = \\dfrac{-b-\\sqrt{\\Delta}}{2a}$ et $x_2 = \\dfrac{-b+\\sqrt{\\Delta}}{2a}$`;
        texte_corr += `<br>$x_1 =\\dfrac{${-b}-\\sqrt{${b * b - 4 * a * c}}}{${2 * a}}\\approx ${arrondi_virgule((-b - Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a), 2)}$`;
        texte_corr += `<br>$x_2 =\\dfrac{${-b}+\\sqrt{${b * b - 4 * a * c}}}{${2 * a}}\\approx ${arrondi_virgule((-b + Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a), 2)}$`;
        texte_corr += `<br>L'ensemble des solutions de cette équation est : $\\mathcal{S}=\\left\\{\\dfrac{${-b}-\\sqrt{${b * b - 4 * a * c}}}{${2 * a}} ; \\dfrac{${-b}+\\sqrt{${b * b - 4 * a * c}}}{${2 * a}}\\right\\}$.`;
      }
      if (liste_type_de_questions[i] == "factorisationParx") {
        // x(ax+b)=ax^2+bx
        a = randint(-11, 11, [0, -1, 1]);
        b = randint(-11, 11, 0);
        texte = `$${rien_si_1(a)}x^2${ecriture_algebrique_sauf1(b)}x=0$`;

        texte_corr = `On peut factoriser le membre de gauche par $x$.`;
        texte_corr += `<br>$x(${rien_si_1(a)}x${ecriture_algebrique(b)})=0$`;
        texte_corr += `<br>Si un produit est nul alors l'un au moins de ses facteurs est nul.`;
        texte_corr += `<br>$x=0\\quad$ ou $\\quad${rien_si_1(a)}x${ecriture_algebrique(b)}=0$`;
        texte_corr += `<br>$x=0\\quad$ ou $\\quad x=${tex_fraction_signe(-b, a)}$`;
        texte_corr += `<br>L'ensemble des solutions de cette équation est : $\\mathcal{S}=\\left\\{0 ; ${tex_fraction_reduite(-b, a)}\\right\\}$.`;
      }
      if (liste_type_de_questions[i] == "ax2+c") {
        // x(ax+b)=ax^2+bx
        a = randint(-11, 11, 0);
        c = randint(-11, 11, 0);
        texte = `$${rien_si_1(a)}x^2${ecriture_algebrique(c)}=0$`;

        texte_corr = `Il est possible de résoudre cette équation sans effectuer le calcul du discriminant.`;
        texte_corr += `<br> $x^2=${tex_fraction_signe(-c, a)}$`;
        if (-c / a > 0) {
          if ([1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400, 441, 484, 529, 576, 625, 676, 729, 784, 841, 900, 961, 1024, 1089].includes(-c / a)) {
            texte_corr += `<br>$x=\\sqrt{${tex_fraction_reduite(-c, a)}}=${Math.sqrt(-c / a)}\\quad$ ou $\\quad x=-\\sqrt{${tex_fraction_reduite(-c, a)}}=${-Math.sqrt(-c / a)}$`;
            texte_corr += `<br><br>L'ensemble des solutions de cette équation est : $\\mathcal{S}=\\left\\{${Math.sqrt(-c / a)} ; ${-Math.sqrt(-c / a)}\\right\\}$.`;
          }
          else if (-c % a == 0) {
            texte_corr += `<br>$x=\\sqrt{${-c / a}}\\quad$ ou $\\quad x=-\\sqrt{${-c / a}}$`;
            texte_corr += `<br><br>L'ensemble des solutions de cette équation est : $\\mathcal{S}=\\left\\{\\sqrt{${-c / a}} ; -\\sqrt{${-c / a}}\\right\\}$.`;
          } else {
            texte_corr += `<br>$x=\\sqrt{${tex_fraction_reduite(-c, a)}}\\quad$ ou $\\quad x=-\\sqrt{${tex_fraction_reduite(-c, a)}}$`;
            texte_corr += `<br><br>L'ensemble des solutions de cette équation est : $\\mathcal{S}=\\left\\{\\sqrt{${tex_fraction_reduite(-c, a)}} ; -\\sqrt{${tex_fraction_reduite(-c, a)}}\\right\\}$.`;
          }
        } else {
          texte_corr += `<br>Dans $\\mathbb{R}$, un carré est toujours positif donc cette équation n'a pas de solution.`;
          texte_corr += `<br>$\\mathcal{S}=\\emptyset$`;
        }
      }
      if (liste_type_de_questions[i] == "pasDeSolution") {
        k = randint(1, 5);
        x1 = randint(-3, 3, [0]);
        y1 = randint(1, 5);
        if (choice(['+', '-']) == '+') { // k(x-x1)^2 + y1 avec k>0 et y1>0
          a = k;
          b = -2 * k * x1;
          c = k * x1 * x1 + y1;
        } else { // -k(x-x1)^2 -y1 avec k>0 et y1>0
          a = -k;
          b = 2 * k * x1;
          c = -k * x1 * x1 - y1;
        }
        texte = `$${rien_si_1(a)}x^2${ecriture_algebrique_sauf1(b)}x${ecriture_algebrique(c)}=0$`;
        if (b == 0) {
          texte = `$${rien_si_1(a)}x^2${ecriture_algebrique(c)}=0$`;
        }
        texte_corr = `$\\Delta = ${ecriture_parenthese_si_negatif(b)}^2-4\\times${ecriture_parenthese_si_negatif(a)}\\times${ecriture_parenthese_si_negatif(c)}=${b * b - 4 * a * c}$`;
        texte_corr += `<br>$\\Delta<0$ donc l'équation n'admet pas de solution.`;
        texte_corr += `<br>$\\mathcal{S}=\\emptyset$`;
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
  this.besoin_formulaire_numerique = ['Niveau de difficulté', 2, "1 : Solutions entières\n2 : Solutions réelles et calcul du discriminant non obligatoire"];
}
