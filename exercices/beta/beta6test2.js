
import Exercice from '../ClasseExercice.js'
import {liste_de_question_to_contenu, modal_texte_court} from '/modules/outils.js'
import {randint, choice, combinaison_listes} from '/modules/outils.js'


/**
 * Exercice de test
 * @Auteur 
 * Référence 6test2
*/
export default function MaFonctionQuiCreeExercice() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Mon test";
    this.consigne = "Calculer";
    this.nb_questions = 10;
    this.nb_cols = 2; // Nombre de colonnes pour la sortie LaTeX
    this.nb_cols_corr = 2; // Nombre de colonnes dans la correction pour la sortie LaTeX
  
    this.nouvelle_version = function (numero_de_l_exercice) {
      this.bouton_aide = modal_texte_court(numero_de_l_exercice,"Ajouter 9 revient à ajouter 10 et à soustraire 1.");
      this.liste_questions = []; // Liste de questions
      this.liste_corrections = []; // Liste de questions corrigées

      let liste_type_de_questions_disponibles
      if (this.sup == 1) {
          liste_type_de_questions_disponibles = ['niveau1'];
      }
      if (this.sup == 2) {
          liste_type_de_questions_disponibles = ['niveau1','niveau2','niveau2'];
      }
      if (this.sup == 3) {
          liste_type_de_questions_disponibles = ['niveau1','niveau2','niveau3','niveau3','niveau3',];
      }
      let liste_type_de_questions = combinaison_listes(liste_type_de_questions_disponibles, this.nb_questions)

      for (let i = 0, texte, texte_corr, a, b, cpt = 0; i < this.nb_questions && cpt < 50;)
       {
        switch (liste_type_de_questions[i]) {
            case 'niveau1':
                a = randint(1, 9) * 10 + randint(1, 9);
                break;
        
            case 'niveau2':
                a = randint(1, 9) * 100 + randint(0, 9) * 10 + randint(1, 9);
                break;
            
            case 'niveau3':
                a = randint(1, 9) * 1000 + randint(0, 9) * 100 + randint(0, 9) * 10 + randint(1, 9);
                break;
        }
        

        texte = `$ ${a} + 9 $`
        texte_corr = `$ ${a} + 9 = ${a + 9} $`;
  
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
    this.besoin_formulaire_numerique = ['Niveau de difficulté',3,'1 : Nombre inférieur à 100 n2 : Nombre inférieur à 1 000\n3 : Nombre inférieur à 10 000'];
  }
