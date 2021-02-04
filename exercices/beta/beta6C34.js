import Exercice from '../ClasseExercice.js';
import {randint,liste_de_question_to_contenu,combinaison_listes} from "/modules/outils.js"

/**
* Trouver le dernier chiffre d'un calcul (somme, produit, différence)
* @auteur Erwan DUPLESSY
* 6C34
*/

export default function dernierChiffre() {
    "use strict"
    Exercice.call(this)
    this.titre = "Dernier chiffre d'un calcul";
    this.consigne = `Pour chaque calcul, déterminer le dernier chiffre du résultat.`;
    this.nb_questions = 4; // Ici le nombre de questions
    this.nb_questions_modifiable=true // Active le formulaire nombre de questions
    this.nb_cols = 2; // Le nombre de colonnes dans l'énoncé LaTeX
    this.nb_cols_corr = 2;// Le nombre de colonne pour la correction LaTeX
    this.tailleDiaporama = 100;
    this.pas_de_version_LaTeX=false; // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
    this.pas_de_version_HMTL=false; // mettre à true si on ne veut pas de l'exercice en ligne
    this.video = ""; // Id YouTube ou url
  // Voir la Classe Exercice pour une liste exhaustive des propriétés disponibles.
  
   this.sup = 1; // A décommenter : valeur par défaut d'un premier paramètre
  //  this.sup2 = false; // A décommenter : valeur par défaut d'un deuxième paramètre
  //  this.sup3 = false; // A décommenter : valeur par défaut d'un troisième paramètre
  
  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
    this.nouvelle_version = function () {
    // la variable numero_de_l_exercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page
  
    this.liste_questions = [] // tableau contenant la liste des questions 
    this.liste_corrections = []
    let liste_type_de_questions_disponibles= [];
    if (this.sup == 1) {
        liste_type_de_questions_disponibles = ['somme'];
    }
    if (this.sup == 2) {
        liste_type_de_questions_disponibles = ['somme','produit'];
    }
    if (this.sup == 3) {
        liste_type_de_questions_disponibles = ['somme','produit','difference',];
    }
    let liste_type_de_questions = combinaison_listes(liste_type_de_questions_disponibles, this.nb_questions)
  
    for (let i = 0, a=0, b=0,texte=``, texte_corr=``, cpt = 0; i < this.nb_questions && cpt < 50;)
      {
        switch (liste_type_de_questions[i]) {    
          case 'somme':
                a = randint(11, 999);
                b = randint(11, 999);
                texte = `$ ${a}  + ${b}$`;
                texte_corr = `Le dernier chiffre de est `;
                break;          
              case 'produit':
                a = randint(11, 999);
                b = randint(11, 999);
                texte = `$ ${a} \\times ${b}$`;
                texte_corr = `Le dernier chiffre de  est `;
                break;
              
              case 'difference':
                a = randint(11, 999);
                b = randint(a+1,a+999);
                texte = `$ ${b} - ${a}$`;
                texte_corr = `Le dernier chiffre de est `;
                break;
          }
        texte_corr = ` `;

        if (this.liste_questions.indexOf(texte) == -1) {
          // Si la question n'a jamais été posée, on la stocke dans la liste des questions
          this.liste_questions.push(texte);
          this.liste_corrections.push(texte_corr);
          i++;
        }
        cpt++;
      }
      liste_de_question_to_contenu(this); // On envoie l'exercice à la fonction de mise en page
    };
  // Si les variables suivantes sont définies, elles provoquent l'affichage des formulaires des paramètres correspondants
  // Il peuvent être de 3 types : _numerique, _case_a_cocher ou _texte.
  // Il sont associés respectivement aux paramètres sup, sup2 et sup3.
  
 	this.besoin_formulaire_numerique = ['Niveau de difficulté',3,"1 : sommes\n2: et produits\n3: et différences"]
  //  this.besoin_formulaire2_numerique = ["Type de cahier",3,`1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`];
  // this.besoin_formulaire3_case_a_cocher =['figure à main levée',true]
  
  } // Fin de l'exercice.
  