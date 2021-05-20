import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import {listeQuestionsToContenu,randint,choice,katexPopup2,fractionSimplifiee} from '../../modules/outils.js'


export const titre = 'Utiliser les heures décimales'

/**
 * Convertir une heure décimale dans le format HMS
 *
 * La partie décimale est 25, 75 ou un seul chiffre
 * @author Rémi Angot
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

    for (let i = 0, partieEntiere, partieDecimale, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      partieEntiere = randint(1, 12);
      partieDecimale = choice([1, 2, 3, 4, 5, 6, 7, 8, 9, 25, 75]);
      texte = `$${partieEntiere},${partieDecimale}~\\text{h}=\\dotfill$`;
      if (partieDecimale == 25) {
        texteCorr = `$${partieEntiere},${partieDecimale}~\\text{h}=${partieEntiere}~\\text{h}+\\dfrac{1}{4}~\\text{h}`;
        texteCorr += `=${partieEntiere}~\\text{h}~15~\\text{min}$`;
      } else if (partieDecimale == 75) {
        texteCorr = `$${partieEntiere},${partieDecimale}~\\text{h}=${partieEntiere}~\\text{h}+\\dfrac{3}{4}~\\text{h}`;
        texteCorr += `=${partieEntiere}~\\text{h}~45~\\text{min}$`;
      } else if (partieDecimale == 5) {
        texteCorr = `$${partieEntiere},${partieDecimale}~\\text{h}=${partieEntiere}~\\text{h}+\\dfrac{1}{2}~\\text{h}`;
        texteCorr += `=${partieEntiere}~\\text{h}~30~\\text{min}$`;
      } else {
        texteCorr = `$${partieEntiere},${partieDecimale}~\\text{h}=${partieEntiere}~\\text{h}+\\dfrac{${partieDecimale}}{10}~\\text{h}`;
        texteCorr += `=${partieEntiere}~\\text{h}+${partieDecimale}\\times6~\\text{min}=${partieEntiere}~\\text{h}~${partieDecimale * 6}~\\text{min}$`;
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        if (context.isDiaporama) {
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
