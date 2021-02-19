import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,combinaison_listes,randint,tex_nombrec,nombrec2,choice,mise_en_evidence} from "/modules/outils.js"

export default function Placer_la_virgule() {
    "use strict"
    Exercice.call(this)
    this.titre = "Compléter une multiplication par $0,1$ ; $0,01$ ; $0,001$";
    this.nb_questions = 4; // Ici le nombre de questions
    this.nb_questions_modifiable=true // Active le formulaire nombre de questions
    this.nb_cols = 1; // Le nombre de colonnes dans l'énoncé LaTeX
    this.nb_cols_corr = 1;// Le nombre de colonne pour la correction LaTeX
    this.pas_de_version_LaTeX=false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
    this.pas_de_version_HMTL=false // mettre à true si on ne veut pas de l'exercice en ligne
    this.consigne=`Complète avec 0,1 ; 0,01 ou 0,001`
  // Voir la Classe Exercice pour une liste exhaustive des propriétés disponibles.
  
  this.sup = false; 
  //  this.sup2 = false; // A décommenter : valeur par défaut d'un deuxième paramètre
  //  this.sup3 = false; // A décommenter : valeur par défaut d'un troisième paramètre
  
  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
    this.nouvelle_version = function () {
    // la variable numero_de_l_exercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page
  
    this.liste_questions = [] // tableau contenant la liste des questions 
    this.liste_corrections = []
    let type_de_questions_disponibles=[1] // tableau à compléter par valeurs possibles des types de questions
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions)
  
      for (let i = 0, texte, texte_corr,coef,nombre,nombreentier,resultat,exposant, cpt = 0; i < this.nb_questions && cpt < 50;) {

        texte = `` // Nous utilisons souvent cette variable pour construire le texte de la question.
        texte_corr = `` // Idem pour le texte de la correction.
        coef=-randint(1,3)
        if (!this.sup) {
            exposant=-randint(1,3)
        }
        else {
            exposant=0
        }
        nombreentier=randint(10,1000)+randint(10,999)*choice([0,1000])
        nombre=nombreentier*10**exposant
        resultat=nombre*10**coef
        console.log(nombrec2(resultat),tex_nombrec(resultat))
        switch (liste_type_de_questions[i]) { // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
          case 1:
               texte= `$${tex_nombrec(nombre)} \\times \\ldots = ${tex_nombrec(resultat)}$`
               texte_corr=`Quand on multiplie un nombre par $${tex_nombrec(10**coef)}$ chaque chiffres devient $${tex_nombrec(10**(-coef))}$ fois plus petit :<br>$${tex_nombrec(nombre)} \\times ${mise_en_evidence(tex_nombrec(10**coef),'blue')} = ${tex_nombrec(resultat)}$`
          break;
  
          case 2:
            // Idem Cas1 mais avec d'autres texte, texte_corr...
          break
  
          case 3:
            
          break
            
          case 4:
          
          break  
            
        }

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
  
  this.besoin_formulaire_case_a_cocher = ['Nombres entiers',true]
  //  this.besoin_formulaire2_numerique = ["Type de cahier",3,`1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`];
  // this.besoin_formulaire3_case_a_cocher =['figure à main levée',true]
   
  } // Fin de l'exercice.
  