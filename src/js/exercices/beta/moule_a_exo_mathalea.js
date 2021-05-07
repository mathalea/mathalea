import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,combinaisonListes} from '../../modules/outils.js'

export const titre = 'Exo zéro Mathalea'

export default function Exercice_zero_mathalea() {
    "use strict"
    Exercice.call(this)
    this.titre = titre;
    this.nbQuestions = 4; // Ici le nombre de questions
    this.nbQuestionsModifiable=true // Active le formulaire nombre de questions
    this.nbCols = 1; // Le nombre de colonnes dans l'énoncé LaTeX
    this.nbColsCorr = 1;// Le nombre de colonne pour la correction LaTeX
    this.pasDeVersionLatex=false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
    this.pas_de_version_HMTL=false // mettre à true si on ne veut pas de l'exercice en ligne
  // Voir la Classe Exercice pour une liste exhaustive des propriétés disponibles.
  
  //  this.sup = false; // A décommenter : valeur par défaut d'un premier paramètre
  //  this.sup2 = false; // A décommenter : valeur par défaut d'un deuxième paramètre
  //  this.sup3 = false; // A décommenter : valeur par défaut d'un troisième paramètre
  
  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
    this.nouvelleVersion = function () {
    // la variable numeroExercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page
  
    this.listeQuestions = [] // tableau contenant la liste des questions 
    this.listeCorrections = []
    let type_de_questions_disponibles=[1] // tableau à compléter par valeurs possibles des types de questions
    let listeTypeDeQuestions = combinaisonListes(type_de_questions_disponibles, this.nbQuestions)
  
      for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {

        texte = `` // Nous utilisons souvent cette variable pour construire le texte de la question.
        texteCorr = `` // Idem pour le texte de la correction.

        switch (listeTypeDeQuestions[i]) { // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
          case 1:
               
          break;
  
          case 2:
            // Idem Cas1 mais avec d'autres texte, texteCorr...
          break
  
          case 3:
            
          break
            
          case 4:
          
          break  
            
        }

        if (this.listeQuestions.indexOf(texte) == -1) {
          // Si la question n'a jamais été posée, on la stocke dans la liste des questions
          this.listeQuestions.push(texte);
          this.listeCorrections.push(texteCorr);
          i++;
        }
        cpt++;
      }
      listeQuestionsToContenu(this); // On envoie l'exercice à la fonction de mise en page
    };
  // Si les variables suivantes sont définies, elles provoquent l'affichage des formulaires des paramètres correspondants
  // Il peuvent être de 3 types : _numerique, _case_a_cocher ou _texte.
  // Il sont associés respectivement aux paramètres sup, sup2 et sup3.
  
  //	this.besoinFormulaireNumerique = ['Type de questions', 3, `1 : Perpendiculaires\n 2 : Parallèles\n 3 : Mélange`]
  //  this.besoin_formulaire2_numerique = ["Type de cahier",3,`1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`];
  // this.besoin_formulaire3_case_a_cocher =['figure à main levée',true]
  
  } // Fin de l'exercice.
  