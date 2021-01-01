import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,rien_si_1,ecriture_algebrique,ecriture_algebrique_sauf1,ecriture_parenthese_si_negatif,modal_texte_long} from "/modules/outils.js"
import {point,segment,repere2,courbe,mathalea2d,} from "/modules/2d.js"

/**
 * Calcul de discriminant pour identifier la forme graphique associée (0 solution dans IR, 1 ou 2)
 * @Auteur Rémi Angot
 * Référence 1E10
*/
export default function Calcul_discriminant() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Calcul du discriminant d'une équation du second degré";
  this.consigne = "Pour chaque équation, calculer le discriminant et déterminer le nombre de solutions de cette équation dans $\\mathbb{R}$.";
  this.nb_questions = 6;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;
  if (sortie_html) {
    this.spacing_corr = 2;
  }
  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let liste_types_equations = combinaison_listes(["0solution", "1solution", "2solutions"], this.nb_questions);
    for (let i = 0, texte, texte_corr, a, b, c, x1, y1,k, cpt = 0; i < this.nb_questions && cpt < 50;) {
      let a_nb_points_intersection;
      switch (liste_types_equations[i]) {
        case "0solution":
          a_nb_points_intersection = "n'a aucun point d'intersection";
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
          break;
        case "1solution": // k(x-x1)^2
          a_nb_points_intersection = "n'a qu'un seul point d'intersection";
          k = randint(-5, 5, [0]);
          x1 = randint(-5, 5, [0]);
          a = k;
          b = -2 * k * x1;
          c = k * x1 * x1;
          texte = `$${rien_si_1(a)}x^2${ecriture_algebrique_sauf1(b)}x${ecriture_algebrique(c)}=0$`;
          if (b == 0) {
            texte = `$${rien_si_1(a)}x^2${ecriture_algebrique(c)}=0$`;
          }
          if (c == 0) {
            texte = `$${rien_si_1(a)}x^2${ecriture_algebrique_sauf1(b)}x=0$`;
          }
          texte_corr = `$\\Delta = ${ecriture_parenthese_si_negatif(b)}^2-4\\times${ecriture_parenthese_si_negatif(a)}\\times${ecriture_parenthese_si_negatif(c)}=${b * b - 4 * a * c}$`;
          texte_corr += `<br>$\\Delta=0$ donc l'équation admet une unique solution.`;
          break;
        case "2solutions": // k(x-x1)^2
          a_nb_points_intersection = "a deux points d'intersection";
          k = randint(1, 5);
          x1 = randint(-3, 3);
          y1 = randint(1, 5);
          if (choice(['+', '-']) == '+') { // k(x-x1)^2 + y1 avec k>0 et y1<0
            y1 *= -1;
            a = k;
            b = -2 * k * x1;
            c = k * x1 * x1 + y1;
          } else { // -k(x-x1)^2 -y1 avec k>0 et y1>0
            a = -k;
            b = 2 * k * x1;
            c = -k * x1 * x1 + y1;
          }
          texte = `$${rien_si_1(a)}x^2${ecriture_algebrique_sauf1(b)}x${ecriture_algebrique(c)}=0$`;
          if (b == 0) {
            texte = `$${rien_si_1(a)}x^2${ecriture_algebrique(c)}=0$`;
          }
          if (c == 0) {
            texte = `$${rien_si_1(a)}x^2${ecriture_algebrique_sauf1(b)}x=0$`;
          }
          texte_corr = `$\\Delta = ${ecriture_parenthese_si_negatif(b)}^2-4\\times${ecriture_parenthese_si_negatif(a)}\\times${ecriture_parenthese_si_negatif(c)}=${b * b - 4 * a * c}$`;
          texte_corr += `<br>$\\Delta>0$ donc l'équation admet deux solutions.`;
          break;
        default:
          break;
      }
      if (sortie_html) {
        let f = x => a * x ** 2 + b * x + c;
        let graphique = courbe(f);
        graphique.color = 'blue';
        let s = segment(point(-10, 0), point(10, 0));
        s.epaisseur = 3;
        s.color = 'red';
        let r = repere2({ afficheLabels: false, xLabelListe: [], yLabelListe: [] });
        let label_bouton,icone
        let correction_complementaire = `Notons $f : x \\mapsto ${rien_si_1(a)}x^2${ecriture_algebrique_sauf1(b)}x${ecriture_algebrique(c)}$.`;
        correction_complementaire += `<br>On observe que la courbe représentative de $f$ ${a_nb_points_intersection} avec l'axe des abscisses.`;
        correction_complementaire += '<br>';
        correction_complementaire += mathalea2d({ xmin: -10.1, ymin: -10.1, xmax: 10.1, ymax: 10.1, pixelsParCm: 15 },
          graphique, r, s);

        texte_corr += modal_texte_long(numero_de_l_exercice, 'Complément graphique', correction_complementaire, label_bouton = "Complément graphique", icone = "info circle");
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
}
