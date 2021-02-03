import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,combinaison_listes,randint} from "/modules/outils.js"
import Operation from '../../modules/operations.js';
/**
 * Compléter des phrases avec les mots divisible, divieur et multiple
 * @Auteur Rémi Angot
 * Référence 6N43-4
*/
export default function DivisibleDiviseurMultiple() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Faire des phrases avec les mots : divisible, diviseur et multiple";
  this.consigne = "";
  this.nb_questions = 6; // 6 questions au maximum
  this.nb_cols = 2; // Uniquement pour la sortie LaTeX
  this.nb_cols_corr = 2; // Uniquement pour la sortie LaTeX
  this.tailleDiaporama = 100; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = "" // Id YouTube ou url

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let b = randint(5,12);
    let q = randint(11,99);
    let r = randint(1,b-1);
    let a = b*q;
    let a1 = b*q+r;
    this.introduction = `À l'aide des calculs suivants, compléter les phrases suivantes avec les nombre $${a1}$, $${a}$, $${b}$ ou $${q}$.<br><br>`
    this.introduction += Operation({ operande1 :a, operande2 :b, type :'divisionE'})
    this.introduction +=Operation({ operande1 :a1, operande2 :b, type :'divisionE'})

    let type_de_questions_disponibles = [1,2,3,4,5,6]; // On créé 3 types de questions
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions); // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
        // Boucle principale où i+1 correspond au numéro de la question
      switch (liste_type_de_questions[i]) { // Suivant le type de question, le contenu sera différent
        case 1: 
          texte = `... est divisible par ...`;
          texte_corr = `${a} est divisible par ${b} ou ${a} est divisible par ${q}.`;
          break;
        case 2: 
            texte = `... est un diviseur de ...`;
            texte_corr = `${b} est un diviseur de ${a} ou ${q} est un diviseur de ${a}.`;
          break;
        case 3: 
            texte = `... est un multiple de ...`;
            texte_corr = `${a} est un multiple de ${b} ou ${a} est un multiple de ${q}.`;
          break;
        case 4: 
            texte = `... n'est pas divisible par ...`;
            texte_corr = `${a1} n'est pas divisible par ${b} ou ${a1} n'est pas divisible par ${q}.`;
          break;
        case 5: 
            texte = `... n'est pas un diviseur de ...`;
            texte_corr = `${b} n'est pas un diviseur de ${a1} ou ${q} n'est pas un diviseur de ${a1}.`;
          break;
        case 6: 
            texte = `... n'est pas un multiple de ...`;
            texte_corr = `${a1} n'est pas un multiple de ${b} ou ${a1} est n'est pas un multiple de ${q}.`;    
          break;
        
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

// python3 list-to-js.py pour faire apparaitre l'exercice dans le menu

