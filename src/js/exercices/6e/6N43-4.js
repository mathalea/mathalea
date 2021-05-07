import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,combinaisonListes,randint} from '../../modules/outils.js'
import Operation from '../../modules/operations.js';
export const titre = 'Faire des phrases avec les mots : divisible, diviseur et multiple'

/**
 * Compléter des phrases avec les mots divisible, divieur et multiple
 * @Auteur Rémi Angot
 * Référence 6N43-4
*/
export default function DivisibleDiviseurMultiple() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "";
  this.nbQuestions = 6; // 6 questions au maximum
  this.nbCols = 2; // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2; // Uniquement pour la sortie LaTeX
  this.tailleDiaporama = 100; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = "" // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    let b = randint(5,12);
    let q = randint(11,99);
    let r = randint(1,b-1);
    let a = b*q;
    let a1 = b*q+r;
    this.introduction = `À l'aide des calculs suivants, compléter les phrases suivantes avec les nombre $${a1}$, $${a}$, $${b}$ ou $${q}$.<br><br>`
    this.introduction += Operation({ operande1 :a, operande2 :b, type :'divisionE'})
    this.introduction +=Operation({ operande1 :a1, operande2 :b, type :'divisionE'})

    let type_de_questions_disponibles = [1,2,3,4,5,6]; // On créé 3 types de questions
    let listeTypeDeQuestions = combinaisonListes(type_de_questions_disponibles,this.nbQuestions); // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
        // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeDeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 1: 
          texte = `... est divisible par ...`;
          texteCorr = `${a} est divisible par ${b} ou ${a} est divisible par ${q}.`;
          break;
        case 2: 
            texte = `... est un diviseur de ...`;
            texteCorr = `${b} est un diviseur de ${a} ou ${q} est un diviseur de ${a}.`;
          break;
        case 3: 
            texte = `... est un multiple de ...`;
            texteCorr = `${a} est un multiple de ${b} ou ${a} est un multiple de ${q}.`;
          break;
        case 4: 
            texte = `... n'est pas divisible par ...`;
            texteCorr = `${a1} n'est pas divisible par ${b} ou ${a1} n'est pas divisible par ${q}.`;
          break;
        case 5: 
            texte = `... n'est pas un diviseur de ...`;
            texteCorr = `${b} n'est pas un diviseur de ${a1} ou ${q} n'est pas un diviseur de ${a1}.`;
          break;
        case 6: 
            texte = `... n'est pas un multiple de ...`;
            texteCorr = `${a1} n'est pas un multiple de ${b} ou ${a1} est n'est pas un multiple de ${q}.`;    
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
  //this.besoinFormulaireNumerique = ['Niveau de difficulté',3];
}

// python3 list-to-js.py pour faire apparaitre l'exercice dans le menu

