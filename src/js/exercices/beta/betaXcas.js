import { xcas } from '../../modules/outils.js';
import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint, combinaisonListes} from '../../modules/outils.js'
export const titre = 'Test de XCas'

/**
 * Description didactique de l'exercice
 * @Auteur 
 * Référence 
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "Dériver les fonctions suivantes";
  this.nbQuestions = 10;
  this.nbCols = 2; // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2; // Uniquement pour la sortie LaTeX
  this.sup = 1; // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
  this.tailleDiaporama = 100; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = "" // Id YouTube ou url
  this.typeExercice = "XCas"

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = ['type1']; // On créé 3 types de questions
    let liste_type_de_questions = combinaisonListes(type_de_questions_disponibles,this.nbQuestions); // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, a, b, cpt = 0; i < this.nbQuestions && cpt < 50;) {
        // Boucle principale où i+1 correspond au numéro de la question
      switch (liste_type_de_questions[i]) { // Suivant le type de question, le contenu sera différent
        case 'type1': 
            a = randint(1,5)
            b = randint(1,5)
           texte = `$${xcas(`simplifier(${a}sqrt(${a+b}x)/(${b}x))`)}$`
           texteCorr = `$${xcas(`simplifier(deriver(${a}sqrt(${a+b}x)/(${b}x)))`)}$`
           break;
        case 'type2': 
            texte = `Question ${i+1} de type 2`;
            texteCorr = `Correction ${i+1} de type 2`;
          break;
        case 'type3': // Table de 200
            texte = `Question ${i+1} de type 2`;
            texteCorr = `Correction ${i+1} de type 2`;
          break;
        
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
  this.besoinFormulaireNumerique = ['Niveau de difficulté',3];
}

// python3 list-to-js.py pour faire apparaitre l'exercice dans le menu

