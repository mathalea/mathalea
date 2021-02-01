import Exercice from '../ClasseExercice.js';
import { combinaison_listes, liste_de_question_to_contenu, randint } from "/modules/outils.js";
import {mathalea2d} from "/modules/2d.js"
import {fraction} from "/modules/Fractions.js"



/**
 * Une fraction avec pour dénominateur 2, 3, 4, 5, 10 à encadredr entre 2 entiers
 * @Auteur Rémi Angot
 * Référence 6N20-1
*/
export default function Encadrer_fraction_entre_2_entiers() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Encadrer une fraction entre deux nombres entiers";
  this.consigne = "Compléter avec deux entiers consécutifs";
  this.nb_questions = 6;
  this.nb_cols = 2;
  this.nb_cols_corr = 1;
  this.correction_detaillee_disponible = true;
  sortie_html ? this.correction_detaillee = true : this.correction_detaillee = false;

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    this.liste_de_denominateurs = combinaison_listes([2, 3, 4, 5, 10], this.nb_questions);
    this.liste_de_k = combinaison_listes([0, 1, 2, 3, 4, 5], this.nb_questions);

    for (let i = 0, texte, texte_corr, a, n, d, k, cpt = 0; i < this.nb_questions && cpt < 50;) {
      d = this.liste_de_denominateurs[i];
      k = this.liste_de_k[i];
      n = k * d + randint(1, d - 1);
      a = randint(0, 9) * 10 + randint(1, 9);
      texte = `$\\ldots < \\dfrac{${n}}{${d}} < \\ldots$`;
      texte_corr = `$${k} < \\dfrac{${n}}{${d}} < ${k + 1}$`;
      if (this.correction_detaillee) {
        texte_corr += ` $\\qquad$ car $\\quad ${k}=\\dfrac{${k * d}}{${d}}\\quad$ et $\\quad${k + 1}=\\dfrac{${(k + 1) * d}}{${d}}$ `;
        texte_corr += `<br><br>`;
        texte_corr += mathalea2d({ xmin: -.5, xmax: 24, ymax: 1.5, scale: .6 }, fraction(n, d).representation(0, 0, 3, 0, 'barre', 'blue')
        );
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
  //this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}
