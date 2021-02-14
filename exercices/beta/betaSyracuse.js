import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,combinaison_listes,combinaison_listes_sans_changer_ordre} from "/modules/outils.js"
import { randint } from '/modules/outils.js';
import {warn_message} from '/modules/outils.js';
import {tex_enumerate, html_enumerate, enumerate} from '/modules/outils.js';

/**
 * @class Syracuse
 * @classdesc Outils pour les suites de Syracuse 
 * @author Sébastien Lozano
 */

function Syracuse({N}) {

  // Pour déterminer les éléments de la suite de Syracuse jusqu'au premier 1
  this.suiteDeSyracuse = function() {
    let sortie = [N];
    let u = N;
    if (N==1) {
      sortie = [1,4,2,1];
    } else {
      while (u !=1) {
        if (u%2 == 0) {
          u = u/2;        
        } else {
          u = 3*u+1;        
        };
        sortie.push(u);
      };
    }
    return sortie;
  };

  // Pour déterminer la valeur maximale de la suite jusqu'au premier 1
  this.altitudeMaximale = function() {
    let entier = N;    
    return Math.max(...this.suiteDeSyracuse(entier));
  };
  
  // Pour déterminer le nombre d'éléments de la suite de Syracuse jusqu'au premier 1 
  // sans compter la valeur initiale
  this.tempsDeVol = function() {
    let entier = N;    
    return this.suiteDeSyracuse(entier).length-1;
  };

  // Pour déterminer le nombre d'éléments de la suite de Syracuse jusqu'au premier 1
  // qui sont strictement supérieurs à la valeur initiale sans la compter !
  this.tempsDeVolEnAltitude = function() {
    let entier = N;    
    let compteur = 1;
    while (this.suiteDeSyracuse(entier)[compteur]>this.suiteDeSyracuse(entier)[0]) {
      compteur+=1;
    };
    return compteur-1;    
  };
 };

function syracuse({ N='1'}) {
  return new Syracuse({ N: N })
};

export default function Exercice_zero_mathalea() {
    "use strict"
    Exercice.call(this)
    this.titre = "Conjecture de Syracuse";
    this.consigne = "";        
    this.nb_questions = 5; // Ici le nombre de questions
    this.nb_questions_modifiable=false // Active le formulaire nombre de questions
    this.nb_cols = 1; // Le nombre de colonnes dans l'énoncé LaTeX
    this.nb_cols_corr = 1;// Le nombre de colonne pour la correction LaTeX
    this.pas_de_version_LaTeX=false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
    this.pas_de_version_HMTL=false // mettre à true si on ne veut pas de l'exercice en ligne
  // Voir la Classe Exercice pour une liste exhaustive des propriétés disponibles.
  
  //  this.sup = false; // A décommenter : valeur par défaut d'un premier paramètre
  //  this.sup2 = false; // A décommenter : valeur par défaut d'un deuxième paramètre
  //  this.sup3 = false; // A décommenter : valeur par défaut d'un troisième paramètre
  
  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
    this.nouvelle_version = function () {
    // la variable numero_de_l_exercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page
  
    this.liste_questions = [] // tableau contenant la liste des questions 
    this.liste_corrections = []
    let type_de_questions_disponibles=[1,2,3,4,5] // tableau à compléter par valeurs possibles des types de questions
    let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions)
  
      for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
        let string_algo = `
        ${enumerate([
          `On choisit un nombre entier strictement positif.`,
          `Si l'entier choisi est pair on le divise par 2.`,
          `Si l'entier choisi est impair on le multiplie par 3 et on ajoute 1.`,
          `On recommence avec le nouvel entier trouvé tant qu'il ne vaut pas 1.`
        ])}                    
        `;
        this.introduction = warn_message(string_algo, `nombres`, `Algorithme de Syracuse`);

        //texte = `` // Nous utilisons souvent cette variable pour construire le texte de la question.
        //texte_corr = `` // Idem pour le texte de la correction.
        let entier =randint(1,200);
        while (syracuse({N:entier}).tempsDeVol()>25) {
          entier = randint(1,200);
        };

        let string_connaissance=`Petit point connaissance ...`

        switch (liste_type_de_questions[i]) { // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
          case 1: //Etude du cas N = 1
            texte = `On choisit le nombre entier 1. Quels sont tous les entiers déterminés par cet algorithme ?`
            texte_corr = `${syracuse({N:1}).suiteDeSyracuse()}`;
            string_connaissance +=`cas 1`;
            texte_corr+= warn_message(string_connaissance, `nombres`, `Conjecture de Syracuse`);
            // texte += `Mon super texte de ouf juste pour tester ma classe.<br>`;
            // texte += `${syracuse({
            //   N:15//randint(1,10)
            // }).suiteDeSyracuse()}<br>`
            // texte += `${syracuse({
            //   N:15//randint(1,10)
            // }).suiteDeSyracuse().length}<br>`
            // texte += `${syracuse({
            //   N:15//randint(1,10)
            // }).tempsDeVol()}<br>`
            // texte += `${syracuse({
            //   N:15//randint(1,10)
            // }).altitudeMaximale()}<br>`
            // texte += `${syracuse({
            //   N:127//randint(1,10)
            // }).tempsDeVolEnAltitude()}<br>`
            // texte_corr += `Mon super texte de ouf de corr pour tester ma classe.`;
               
          break;
          case 2: // suite de Syracuse pour un entier aléatoire          
            texte = `Déterminer tous les entiers issus de cet algorithme lorsqu'on choisit ${entier}.`;
            texte_corr = `${syracuse({N:entier}).suiteDeSyracuse()}`;
            string_connaissance +=`cas 2`;
            texte_corr+= warn_message(string_connaissance, `nombres`, `Conjecture de Syracuse`);
          break;
          case 3://Altitude max
            texte = `Quelle est la valeur maximale de cette liste d'entiers ?`;
            texte_corr = `${syracuse({N:entier}).altitudeMaximale()}`;
            string_connaissance +=`cas 3`;
            texte_corr+= warn_message(string_connaissance, `nombres`, `Conjecture de Syracuse`);
          break;
          case 4://temps de vol
            texte = `Quelle est le nombre d'élements de cette liste d'entiers, sans compter la valeur initiale ?`;
            texte_corr = `${syracuse({N:entier}).tempsDeVol()}`;
            string_connaissance +=`cas 4`;
            texte_corr+= warn_message(string_connaissance, `nombres`, `Conjecture de Syracuse`);
          break;            
          case 5://vol en altitude
            texte = `Quelle est le nombre d'éléments de cette liste d'entiers qui sont strictement supérieurs à la valeur initiale, sans compter cette valeur initiale ?`;
            texte_corr = `${syracuse({N:entier}).tempsDeVolEnAltitude()}`;
            string_connaissance +=`cas 5`;
            texte_corr+= warn_message(string_connaissance, `nombres`, `Conjecture de Syracuse`);
          break;            

        };      
        

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
  
  //	this.besoin_formulaire_numerique = ['Type de questions', 3, `1 : Perpendiculaires\n 2 : Parallèles\n 3 : Mélange`]
  //  this.besoin_formulaire2_numerique = ["Type de cahier",3,`1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`];
  // this.besoin_formulaire3_case_a_cocher =['figure à main levée',true]
  
  } // Fin de l'exercice.
  