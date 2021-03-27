import Exercice from '../ClasseExercice.js';
import { liste_de_question_to_contenu, randint, choice, calcul, tex_prix } from "/modules/outils.js"
/**
 * Recherche de la vitesse, du temps ou de la distance en utilisant un tableau de proportionnalité et le produit en croix
 * @Auteur Rémi Angot
 * Référence 6P13-1
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Facture";
  this.consigne = "Compléter le tableau suivant : ";
  this.nb_questions = 1;
  this.nb_questions_modifiable = false;
  this.nb_cols = 1; // Uniquement pour la sortie LaTeX
  this.nb_cols_corr = 1; // Uniquement pour la sortie LaTeX
  this.sup = 2; // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
  this.tailleDiaporama = 20; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = "" // Id YouTube ou url

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    for (let i = 0, article1, q1, p1, article2, q2, p2, article3, q3, p3, r, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
      let liste_articles = [["Feuilletés au fromage", calcul(randint(50, 80) / 10)],
      ["Feuilletés à la viande", calcul(randint(50, 80) / 10)],
      ["Pizzas", calcul(randint(80, 140) / 10)],
      ["Glaces à la vanille", calcul(randint(20, 60) / 10)],
      ["Glaces au chocolat", calcul(randint(20, 60) / 10)],
      ["Filets de saumon", calcul(randint(150, 200) / 10)],
      ["Aiguillettes de poulet", calcul(randint(400, 700) / 10)],
      ]
      article1 = choice(liste_articles)
      article2 = choice(liste_articles, [article1])
      article3 = choice(liste_articles, [article1, article2])
      p1 = article1[1]
      p2 = article2[1]
      p3 = article1[1]
      q1 = randint(2, 8)
      q2 = randint(2, 8, [q1])
      q3 = randint(2, 8, [q1, q2])
      r = randint(3,9)


      if (this.sup == 1) {
        if (sortie_html) {
          texte = `$\\def\\arraystretch{2.5}\\begin{array}{|c|c|c|c|}\n`;
        } else {
          texte = `$\\begin{array}{|c|c|c|c|}\n`;
        }
        texte += `\\hline\n`
        texte += `\\text{Designations} & \\text{Quantités} & \\text{Prix unitaires H.T.} & \\text{Montants H.T.} \\\\ \n`
        texte += `\\hline\n`
        texte += `\\text{${article1[0]}} & ${q1} & ${tex_prix(p1)} & \\ldots\\ldots \\\\ \n`
        texte += `\\hline\n`
        texte += `\\text{${article2[0]}} & ${q2} & ${tex_prix(p2)} & \\ldots\\ldots \\\\ \n`
        texte += `\\hline\n`
        texte += `\\text{${article3[0]}} & ${q3} & ${tex_prix(p3)} & \\ldots\\ldots \\\\ \n`
        texte += `\\hline\n`
        texte += `\\text{Prix total (H.T.)} & & & \\ldots\\ldots \\\\ \n`
        texte += `\\hline\n`
        texte += `\\text{TVA (20~\\%)} & & & \\ldots\\ldots \\\\ \n`
        texte += `\\hline\n`
        texte += `\\text{Prix total (T.T.C.)} & & & \\ldots\\ldots \\\\ \n `
        texte += `\\hline\n`
        texte += `\\end{array}$`

        if (sortie_html) {
          texte_corr = `$\\def\\arraystretch{2.5}\\begin{array}{|c|c|c|c|}\n`;
        } else {
          texte_corr = `$\\begin{array}{|c|c|c|c|}\n`;
        }
        texte_corr += `\\hline\n`
        texte_corr += `\\text{Designations} & \\text{Quantités} & \\text{Prix unitaires H.T.} & \\text{Montants H.T.} \\\\ \n`
        texte_corr += `\\hline\n`
        texte_corr += `\\text{${article1[0]}} & ${q1} & ${tex_prix(p1)} & ${tex_prix(calcul(p1 * q1))} \\\\ \n`
        texte_corr += `\\hline\n`
        texte_corr += `\\text{${article2[0]}} & ${q2} & ${tex_prix(p2)} & ${tex_prix(calcul(p2 * q2))} \\\\ \n`
        texte_corr += `\\hline\n`
        texte_corr += `\\text{${article3[0]}} & ${q3} & ${tex_prix(p3)} & ${tex_prix(calcul(p3 * q3))} \\\\ \n`
        texte_corr += `\\hline\n`
        texte_corr += `\\text{Prix total (H.T.)} & & & ${tex_prix(calcul(p1 * q1 + p2 * q2 + p3 * q3))} \\\\ \n`
        texte_corr += `\\hline\n`
        texte_corr += `\\text{TVA (20~\\%)} & & & ${tex_prix(calcul((p1 * q1 + p2 * q2 + p3 * q3) * 0.2))} \\\\ \n`
        texte_corr += `\\hline\n`
        texte_corr += `\\text{Prix total (T.T.C.)} & & & ${tex_prix(calcul((p1 * q1 + p2 * q2 + p3 * q3) * 1.2))} \\\\ \n `
        texte_corr += `\\hline\n`

        texte_corr += `\\end{array}$`
      }

      if (this.sup == 2) {
        if (sortie_html) {
          texte = `$\\def\\arraystretch{2.5}\\begin{array}{|c|c|c|c|}\n`;
        } else {
          texte = `$\\begin{array}{|c|c|c|c|}\n`;
        }
        texte += `\\hline\n`
        texte += `\\text{Designations} & \\text{Quantités} & \\text{Prix unitaires H.T.} & \\text{Montants H.T.} \\\\ \n`
        texte += `\\hline\n`
        texte += `\\text{${article1[0]}} & ${q1} & ${tex_prix(p1)} & \\ldots\\ldots \\\\ \n`
        texte += `\\hline\n`
        texte += `\\text{${article2[0]}} & ${q2} & ${tex_prix(p2)} & \\ldots\\ldots \\\\ \n`
        texte += `\\hline\n`
        texte += `\\text{${article3[0]}} & ${q3} & ${tex_prix(p3)} & \\ldots\\ldots \\\\ \n`
        texte += `\\hline\n`
        texte += `\\text{Prix total brut (H.T.)} & & & \\ldots\\ldots \\\\ \n`
        texte += `\\hline\n`
        texte += `\\text{Réduction (${r}~\\%)} & & & \\ldots\\ldots \\\\ \n`
        texte += `\\hline\n`
        texte += `\\text{Prix total net (H.T.)} & & & \\ldots\\ldots \\\\ \n`
        texte += `\\hline\n`
        texte += `\\text{TVA (20~\\%)} & & & \\ldots\\ldots \\\\ \n`
        texte += `\\hline\n`
        texte += `\\text{Prix total (T.T.C.)} & & & \\ldots\\ldots \\\\ \n `
        texte += `\\hline\n`
        texte += `\\end{array}$`

        if (sortie_html) {
          texte_corr = `$\\def\\arraystretch{2.5}\\begin{array}{|c|c|c|c|}\n`;
        } else {
          texte_corr = `$\\begin{array}{|c|c|c|c|}\n`;
        }
        texte_corr += `\\hline\n`
        texte_corr += `\\text{Designations} & \\text{Quantités} & \\text{Prix unitaires H.T.} & \\text{Montants H.T.} \\\\ \n`
        texte_corr += `\\hline\n`
        texte_corr += `\\text{${article1[0]}} & ${q1} & ${tex_prix(p1)} & ${tex_prix(calcul(p1 * q1))} \\\\ \n`
        texte_corr += `\\hline\n`
        texte_corr += `\\text{${article2[0]}} & ${q2} & ${tex_prix(p2)} & ${tex_prix(calcul(p2 * q2))} \\\\ \n`
        texte_corr += `\\hline\n`
        texte_corr += `\\text{${article3[0]}} & ${q3} & ${tex_prix(p3)} & ${tex_prix(calcul(p3 * q3))} \\\\ \n`
        texte_corr += `\\hline\n`
        texte_corr += `\\text{Prix total brut (H.T.)} & & & ${tex_prix(calcul(p1 * q1 + p2 * q2 + p3 * q3))} \\\\ \n`
        texte_corr += `\\hline\n`
        texte_corr += `\\text{Réduction (${r}~\\%)} & & & ${tex_prix(calcul((p1 * q1 + p2 * q2 + p3 * q3) * r / 100))} \\\\ \n`
        texte_corr += `\\hline\n`
        texte_corr += `\\text{Prix total net (H.T.)} & & & ${tex_prix(calcul((p1 * q1 + p2 * q2 + p3 * q3) * (1 - r / 100)))} \\\\ \n`
        texte_corr += `\\hline\n`
        texte_corr += `\\text{TVA (20~\\%)} & & & ${tex_prix(calcul((p1 * q1 + p2 * q2 + p3 * q3) * (1 - r / 100) * 0.2))} \\\\ \n`
        texte_corr += `\\hline\n`
        texte_corr += `\\text{Prix total (T.T.C.)} & & & ${tex_prix(calcul((p1 * q1 + p2 * q2 + p3 * q3) * (1 - r / 100) * 1.2))} \\\\ \n `
        texte_corr += `\\hline\n`

        texte_corr += `\\end{array}$`
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
  this.besoin_formulaire_numerique = ['Niveau de difficulté', 2,'1 : Sans réduction\n2 : Avec réduction'];
}

// python3 modules/exercices_to_json.py pour faire apparaitre l'exercice dans le menu

