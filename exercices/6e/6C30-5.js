import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,combinaison_listes,randint,tex_nombre2,tex_fraction,choice,mise_en_evidence} from "/modules/outils.js"
/**
 * @Auteur Jean-claude Lhote
 * Publié le 20/02/2021
 * Référence 6C30-5
 */
export default function Placer_la_virgule() {
    "use strict"
    Exercice.call(this)
    this.titre = "Multiplication par 0,1 ; 0,01 ; 0,001 (compléter avec le nombre qui convient)";
    this.nb_questions = 4; // Ici le nombre de questions
    this.nb_questions_modifiable=true // Active le formulaire nombre de questions
    this.nb_cols = 1; // Le nombre de colonnes dans l'énoncé LaTeX
    this.nb_cols_corr = 1;// Le nombre de colonne pour la correction LaTeX
    this.pas_de_version_LaTeX=false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
    this.pas_de_version_HMTL=false // mettre à true si on ne veut pas de l'exercice en ligne
    this.consigne=`Compléter les pointillés.`
  // Voir la Classe Exercice pour une liste exhaustive des propriétés disponibles.
  
  this.sup = false; 
  this.sup2=4
  //  this.sup2 = false; // A décommenter : valeur par défaut d'un deuxième paramètre
  //  this.sup3 = false; // A décommenter : valeur par défaut d'un troisième paramètre
  
  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
    this.nouvelle_version = function () {
    // la variable numero_de_l_exercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page
  
    this.liste_questions = [] // tableau contenant la liste des questions 
    this.liste_corrections = []
    let type_de_questions_disponibles
    if (this.sup2==4) {
      type_de_questions_disponibles=[1,2,3]
    }
    else {
      type_de_questions_disponibles=[parseInt(this.sup2)]
    }
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions)
    let rang=['millièmes','centièmes','dixièmes']
 
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
        switch (liste_type_de_questions[i]) { // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
          case 1:
               texte= `$${tex_nombre2(nombre)} \\times ${tex_nombre2(10**coef)}~~ = ~~\\ldots\\ldots\\ldots\\ldots$`
 
               texte_corr=`Quand on multiplie par $${tex_nombre2(10**coef)}=${tex_fraction(1,10**(-coef))}$ chaque chiffre prend une valeur $${tex_nombre2(10**(-coef))}$ fois plus petite.<br>`
               texte_corr+=`Le chiffre des unités se positionne donc dans les ${rang[3+coef]} :<br>`
               texte_corr=`$${tex_nombre2(nombre)} \\times ${tex_nombre2(10**coef)}~~ =~~ ${mise_en_evidence(tex_nombre2(resultat),'blue')}$`
 
    
               break;
  
          case 2:
            texte= `$${tex_nombre2(nombre)} \\times \\ldots\\ldots\\ldots~~ = ~~${tex_nombre2(resultat)}$`
            texte_corr=`Quand on multiplie par $${tex_nombre2(10**coef)}=${tex_fraction(1,10**(-coef))}$ chaque chiffre prend une valeur $${tex_nombre2(10**(-coef))}$ fois plus petite.<br>`
            texte_corr+=`Le chiffre des unités se positionne donc dans les ${rang[3+coef]} :<br>`
            texte_corr=`$${tex_nombre2(nombre)} \\times ${mise_en_evidence(tex_nombre2(10**coef),'blue')} ~~=~~ ${tex_nombre2(resultat)}$`
 
          break
  
          case 3:
            texte= `$\\ldots\\ldots\\ldots\\ldots \\times ${tex_nombre2(10**coef)}~~ = ~~${tex_nombre2(resultat)}$`
            texte_corr=`Quand on multiplie par $${tex_nombre2(10**coef)}=${tex_fraction(1,10**(-coef))}$ chaque chiffre prend une valeur $${tex_nombre2(10**(-coef))}$ fois plus petite.<br>`
            texte_corr+=`Le chiffre des unités se positionne donc dans les ${rang[3+coef]} :<br>`
            texte_corr=`$${mise_en_evidence(tex_nombre2(nombre),'blue')} \\times ${tex_nombre2(10**coef)} = ${tex_nombre2(resultat)}$`
  
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
  this.besoin_formulaire2_numerique = ["Type de question",4,`1 : Résultat à calculer\n 2 : Nombre à retrouver\n 3 : Fraction décimale à rtrouver\n 4 : Alternance des 3 types de question`];
  // this.besoin_formulaire3_case_a_cocher =['figure à main levée',true]
   
  } // Fin de l'exercice.
  