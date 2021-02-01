import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,katex_Popup2,fraction_simplifiee} from "/modules/outils.js"


/**
 * Convertir une heure décimale dans le format HMS
 *
 * La partie décimale est 25, 75 ou un seul chiffre
 * @Auteur Rémi Angot
 * Référence 6D101
 */
export default function Heures_decimales() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Utiliser les heures décimales";
  this.consigne = "Compléter les égalités suivantes";
  this.spacing = 2;
  this.nb_questions = 5;
  this.nb_cols_corr = 1;
  this.tailleDiaporama = 200;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    for (let i = 0, partie_entiere, partie_decimale, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
      partie_entiere = randint(1, 12);
      partie_decimale = choice([1, 2, 3, 4, 5, 6, 7, 8, 9, 25, 75]);
      texte = `$${partie_entiere},${partie_decimale}~\\text{h}=\\dotfill$`;
      if (partie_decimale == 25) {
        texte_corr = `$${partie_entiere},${partie_decimale}~\\text{h}=${partie_entiere}~\\text{h}+\\dfrac{1}{4}~\\text{h}`;
        texte_corr += `=${partie_entiere}~\\text{h}~15~\\text{min}$`;
      } else if (partie_decimale == 75) {
        texte_corr = `$${partie_entiere},${partie_decimale}~\\text{h}=${partie_entiere}~\\text{h}+\\dfrac{3}{4}~\\text{h}`;
        texte_corr += `=${partie_entiere}~\\text{h}~45~\\text{min}$`;
      } else if (partie_decimale == 5) {
        texte_corr = `$${partie_entiere},${partie_decimale}~\\text{h}=${partie_entiere}~\\text{h}+\\dfrac{1}{2}~\\text{h}`;
        texte_corr += `=${partie_entiere}~\\text{h}~30~\\text{min}$`;
      } else {
        texte_corr = `$${partie_entiere},${partie_decimale}~\\text{h}=${partie_entiere}~\\text{h}+\\dfrac{${partie_decimale}}{10}~\\text{h}`;
        texte_corr += `=${partie_entiere}~\\text{h}+${partie_decimale}\\times6~\\text{min}=${partie_entiere}~\\text{h}~${partie_decimale * 6}~\\text{min}$`;
      }

      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        if (est_diaporama) {
          texte = texte.replace("=\\dotfill", "");
        }
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
}
