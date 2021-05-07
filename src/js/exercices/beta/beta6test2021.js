import Exercice from '../ClasseExercice.js';
import { listeQuestionsToContenu, combinaisonListes } from '../../modules/outils.js'
export const titre = 'Exercice exemple'

/**
 * Description didactique de l'exercice
 * @Auteur 
 * Référence 
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "";
  this.nbQuestionsModifiable=false
  //this.nbQuestions = 10;
  this.nbCols = 2; // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2; // Uniquement pour la sortie LaTeX
 // this.sup = 1; // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
  this.tailleDiaporama = 100; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = "" // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    let question1,question2,correction1,correction2

    question1=`texte de la question 1.`
    question1+=`<br>`
    question2=`texte de la question 2.`
    question2+=`<br>`

    correction1=`texte de la correction 1`
    correction2=`texte de la correction2`
        this.listeQuestions.push(question1,question2);
        this.listeCorrections.push(correction1,correction2);

    listeQuestionsToContenu(this);
  };
 // this.besoinFormulaireNumerique = ['Niveau de difficulté', 3];
}



