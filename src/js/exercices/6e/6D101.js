import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,katex_Popup2,fractionSimplifiee} from '../../modules/outils.js'


export const titre = 'Utiliser les heures décimales'

/**
 * Convertir une heure décimale dans le format HMS
 *
 * La partie décimale est 25, 75 ou un seul chiffre
 * @Auteur Rémi Angot
 * Référence 6D101
 */
export default function Heures_decimales() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "Compléter les égalités suivantes";
  this.spacing = 2;
  this.nbQuestions = 5;
  this.nbColsCorr = 1;
  this.tailleDiaporama = 200;

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées

    for (let i = 0, partie_entiere, partie_decimale, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      partie_entiere = randint(1, 12);
      partie_decimale = choice([1, 2, 3, 4, 5, 6, 7, 8, 9, 25, 75]);
      texte = `$${partie_entiere},${partie_decimale}~\\text{h}=\\dotfill$`;
      if (partie_decimale == 25) {
        texteCorr = `$${partie_entiere},${partie_decimale}~\\text{h}=${partie_entiere}~\\text{h}+\\dfrac{1}{4}~\\text{h}`;
        texteCorr += `=${partie_entiere}~\\text{h}~15~\\text{min}$`;
      } else if (partie_decimale == 75) {
        texteCorr = `$${partie_entiere},${partie_decimale}~\\text{h}=${partie_entiere}~\\text{h}+\\dfrac{3}{4}~\\text{h}`;
        texteCorr += `=${partie_entiere}~\\text{h}~45~\\text{min}$`;
      } else if (partie_decimale == 5) {
        texteCorr = `$${partie_entiere},${partie_decimale}~\\text{h}=${partie_entiere}~\\text{h}+\\dfrac{1}{2}~\\text{h}`;
        texteCorr += `=${partie_entiere}~\\text{h}~30~\\text{min}$`;
      } else {
        texteCorr = `$${partie_entiere},${partie_decimale}~\\text{h}=${partie_entiere}~\\text{h}+\\dfrac{${partie_decimale}}{10}~\\text{h}`;
        texteCorr += `=${partie_entiere}~\\text{h}+${partie_decimale}\\times6~\\text{min}=${partie_entiere}~\\text{h}~${partie_decimale * 6}~\\text{min}$`;
      }

      if (this.listeQuestions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        if (est_diaporama) {
          texte = texte.replace("=\\dotfill", "");
        }
        this.listeQuestions.push(texte);
        this.listeCorrections.push(texteCorr);
        i++;
      }
      cpt++;
    }
    listeQuestionsToContenu(this);
  };
}
