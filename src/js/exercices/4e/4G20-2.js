import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint} from '../../modules/outils.js'
export const titre = 'Racine carré d’un carré parfait (calcul mental)'

/**
 * Déterminer la racine carrée d'un carré parfait compris entre 4 et 256
 * @auteur Stéphane Guyon
 * 4G20-2
 */
export default function Racine_caree_de_carres_parfaits() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "Calculer de tête les racines suivantes.";
  this.nbQuestions = 4;
  this.nbCols = 2;
  this.nbColsCorr = 2;

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    
    for (
      let i = 0, texte, texteCorr,a,c, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      a = randint(2, 16);
      c = a * a;
      texte = `$\\sqrt{${c}}=$`;
      texteCorr = `$\\sqrt{${c}}=${a}$`;

      if (this.listeQuestions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en créé une autre
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

