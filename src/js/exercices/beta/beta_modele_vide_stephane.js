import Exercice from '../ClasseExercice.js';
// import { } from '../../modules/outils.js'//Fonctions à importer dans fichiers outils
// import { } from '../../modules/2d.js'//Fonctions à importer dans fichiers mathalea2D

export const titre = 'titre à donner'

/**

*/
export default function totoche() {// nom de fonction à donner
  Exercice.call(this);
  this.titre = titre;
  this.consigne = "";
  this.nbQuestions = 3;
  this.nbCols = 2;
  this.nbColsCorr = 2;
  this.tailleDiaporama = 100;
  this.video = "";
  this.spacing = 1;
  this.spacingCorr = 1;
  this.spacingCorr = 3
// paramètrage graphique, nb questions; ..

  this.nouvelleVersion = function () {
    this.listeQuestions = [];
    this.listeCorrections = [];
    let type_de_questions_disponibles = [];
    type_de_questions_disponibles = [1, 2];// On complète selon le nb de cas dans l'exo (switch)

    let listeTypeDeQuestions = combinaisonListes(type_de_questions_disponibles, this.nbQuestions);

    for (let i = 0, texte, texteCorr, cpt = 0, a, b, type_de_questions;
      i < this.nbQuestions && cpt < 50;) {
      type_de_questions = listeTypeDeQuestions[i];


      switch (type_de_questions) {
        case 1:
        // on utilise les variables définies dans la boucle et les fonctions définies dans import
        texte=`totoche` // pour l'énoncé
        texteCorr=`totoche` // pour la correction
        break; // qui cloture le cas présent
        case 2:
            // 2ème cas de figure

          break;
        // on rajoute autant de case qu'on le souhaite
      } // fin de switch


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
}
