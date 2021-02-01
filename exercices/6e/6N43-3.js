import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,combinaison_listes} from "/modules/outils.js"
import { randint,string_nombre } from '../../modules/outils.js';
/**
 * Vrai ou faux sur les notions de diviseur ou multiple
 * @Auteur Rémi Angot
 * Référence 6N43-3
*/
export default function ExerciceVraiFauxDivisibleMultipleDiviseur() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Diviseur, multiple, divisible - Vrai ou faux";
  this.consigne = "Pour chaque affirmation, indiquer si elle est vraie ou fausse.";
  this.nb_questions = 10;
  this.nb_cols = 2; // Uniquement pour la sortie LaTeX
  this.nb_cols_corr = 2; // Uniquement pour la sortie LaTeX
  this.sup = 1; // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
  this.tailleDiaporama = 100; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = "" // Id YouTube ou url

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = ['Ndiviseur','divisibleParN','multipleDeN','NdiviseurF','divisibleParNF','multipleDeNF','NdiviseurEnvers','divisibleParNEnvers','multipleDeNEnvers']; 
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions); // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    let liste_de_N_disponibles
    if (this.sup == 1) {
        liste_de_N_disponibles = [2,5]
    }
    if (this.sup == 2) {
        liste_de_N_disponibles = [2,3,5,9]
    }
    if (this.sup == 3) {
        liste_de_N_disponibles = [7,11,13,20,30,25]
    }
    let liste_de_N = combinaison_listes(liste_de_N_disponibles,this.nb_questions); // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texte_corr, N, cpt = 0; i < this.nb_questions && cpt < 50;) {
        // Boucle principale où i+1 correspond au numéro de la question
        N = liste_de_N[i]
        switch (liste_type_de_questions[i]) { // Suivant le type de question, le contenu sera différent
        case 'Ndiviseur': 
          texte = `${N} est un diviseur de ${string_nombre(randint(199,999)*N)}.`;
          texte_corr = texte.replace('.',' ') + ' : Vrai';
          break;
        case 'divisibleParN': 
          texte = `${string_nombre(randint(199,999)*N)} est divisible par ${N}.`;
          texte_corr = texte.replace('.',' ') + ' : Vrai';
          break;
        case 'multipleDeN': 
          texte = `${string_nombre(randint(199,999)*N)} est un multiple de ${N}.`;
          texte_corr = texte.replace('.',' ') + ' : Vrai';
          break;
        case 'NdiviseurF': 
          texte = `${N} est un diviseur de ${string_nombre(randint(199,999)*N+randint(1,N-1))}.`;
          texte_corr = texte.replace('.',' ') + ' : Faux';
          break;
        case 'divisibleParNF': 
          texte = `${string_nombre(randint(199,999)*N+randint(1,N-1))} est divisible par ${N}.`;
          texte_corr = texte.replace('.',' ') + ' : Faux';
          break;
        case 'multipleDeNF': 
          texte = `${string_nombre(randint(199,999)*N+randint(1,N-1))} est un multiple de ${N}.`;
          texte_corr = texte.replace('.',' ') + ' : Faux';
          break;
          case 'NdiviseurEnvers': 
          texte = `${string_nombre(randint(199,999)*N)} est un diviseur de ${N}.`;
          texte_corr = texte.replace('.',' ') + ' : Faux';
          break;
        case 'divisibleParNEnvers': 
          texte = `${N} est divisible par ${string_nombre(randint(199,999)*N)}.`;
          texte_corr = texte.replace('.',' ') + ' : Faux';
          break;
        case 'multipleDeNEnvers': 
          texte = `${N} est un multiple de ${string_nombre(randint(199,999)*N)}.`;
          texte_corr = texte.replace('.',' ') + ' : Faux';
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
  this.besoin_formulaire_numerique = ['Niveau de difficulté',3,'1 : Critères de divisibilité par 2 et 5\n2 : Critères de divisibilité par 2, 3, 5 et 9\n3 : Sans critères de divisibilité'];
}

// python3 list-to-js.py pour faire apparaitre l'exercice dans le menu

