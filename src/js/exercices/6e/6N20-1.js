import Exercice from '../ClasseExercice.js';
import {modalTexteCourt, combinaisonListes, listeQuestionsToContenu, randint } from '../../modules/outils.js';
import {mathalea2d} from '../../modules/2d.js';
import {fraction} from '../../modules/Fractions.js';



export const titre = 'Encadrer une fraction entre deux nombres entiers'

/**
 * Une fraction avec pour dénominateur 2, 3, 4, 5, 10 à encadredr entre 2 entiers
 * @Auteur Rémi Angot
 * Référence 6N20-1
*/
export default function Encadrer_fraction_entre_2_entiers() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "Compléter avec deux nombres entiers consécutifs"+modalTexteCourt(1,"Nombres entiers consécutifs : Ce sont deux nombres entiers qui se suivent comme 4 et 5.",'Consécutifs');
  this.introduction=`Exemple : $2 < \\dfrac{9}{4} < 3$ car  $2=\\dfrac{8}{4}$ et $3=\\dfrac{12}{4}$`;
  this.nbQuestions = 6;
  this.nbCols = 2;
  this.nbColsCorr = 1;
  this.correctionDetailleeDisponible = true;
  sortieHtml ? this.correctionDetaillee = true : this.correctionDetaillee = false;

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    this.liste_de_denominateurs = combinaisonListes([2, 3, 4, 5, 10], this.nbQuestions);
    this.liste_de_k = combinaisonListes([0, 1, 2, 3, 4, 5], this.nbQuestions);

    for (let i = 0, texte, texteCorr, a, n, d, k, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      d = this.liste_de_denominateurs[i];
      k = this.liste_de_k[i];
      n = k * d + randint(1, d - 1);
      a = randint(0, 9) * 10 + randint(1, 9);
      texte = `$\\ldots < \\dfrac{${n}}{${d}} < \\ldots$`;
      texteCorr = `$${k} < \\dfrac{${n}}{${d}} < ${k + 1}$`;
      if (this.correctionDetaillee) {
        texteCorr += ` $\\qquad$ car $\\quad ${k}=\\dfrac{${k * d}}{${d}}\\quad$ et $\\quad${k + 1}=\\dfrac{${(k + 1) * d}}{${d}}$ `;
        texteCorr += `<br><br>`;
        texteCorr += mathalea2d({ xmin: -0.5, xmax: 24, ymax: 1.5, scale: 0.6 }, fraction(n, d).representation(0, 0, 3, 0, 'barre', 'blue')
        );
      }

      if (this.listeQuestions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte);
        this.listeCorrections.push(texteCorr);
        i++;
      }
      cpt++;
    }
    listeQuestionsToContenu(this);
  };
  //this.besoinFormulaireNumerique = ['Niveau de difficulté',3];
}
