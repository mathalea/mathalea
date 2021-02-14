import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,combinaison_listes, randint,nombreDecimal, calcul, tex_nombre,shuffle2tableaux} from "/modules/outils.js"

/**
 * Reconnaître une fonction affine
* @auteur Erwan Duplessy
* 6C30-1
* Trouver la réposne exacte. 4 cas :
* - somme de deux entiers
* - produit de deux entiers
* - somme de deux décimaux
* - produit de deux décimaux
*/

export default function Multiplication_mental_decimaux() {
    "use strict"     
    Exercice.call(this)
    this.titre = "Opérations avec les nombres décimaux";
    this.consigne = "Trouver la réponse exacte du calcul parmi les réponses proposées.";
    this.nb_questions = 4; // Ici le nombre de questions
    this.video = "";
    this.nb_questions_modifiable=true // Active le formulaire nombre de questions
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
    let type_de_questions_disponibles=["add", "mul", "add_deci", "mul_deci"] // tableau à compléter par valeurs possibles des types de questions
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions)
    
    // on définit l'espace horizontal entre les réponses en fonction de la sortie html/LaTeX :
    let espace =``;
    if (sortie_html) {
      espace = `&emsp;`;
    } else {
      espace = `\\qquad`;
    }
  
      for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
        texte = `` // Nous utilisons souvent cette variable pour construire le texte de la question.
        texte_corr = `` // Idem pour le texte de la correction.
        let a=0, b=0, tabrep=[], tabicone=[]; // les deux opérandes

        switch (liste_type_de_questions[i]) { // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
          case "add":
               a = 10*randint(1,9)+randint(1,9);
               b = 10*randint(1,9)+randint(1,9);
               texte += `Calcul : $${a} + ${b}$. <br>`;
               texte_corr += `Calcul : $${a} + ${b}$. <br>`;
               texte += `Réponses possibles : <br>`;
               tabrep = [calcul(a+b), calcul(a*b), calcul((a+b)/10), calcul(10*(a+b)), calcul(a+b+1)]; // réponses possibles
               tabicone = [1,0,0,0,0,0]; // 1 pour la bonne réponse
               shuffle2tableaux(tabrep, tabicone); // on mélange les deux tableaux avec la même permutation
               for (let i=0; i<5; i++) {
                 texte += `$\\square\\; ${tex_nombre(tabrep[i])}$` + espace ;
                if (tabicone[i]==1) {
                  texte_corr += `$\\blacksquare\\; ${tex_nombre(tabrep[i])}$` + espace ;
                } else {
                  texte_corr += `$\\square\\; ${tex_nombre(tabrep[i])}$` + espace ;
                }
              }
          break;
  
          case "mul":
            a = 10*randint(1,9)+randint(1,9);
            b = 10*randint(1,9)+randint(1,9);
            texte += `Calcul : $${a} \\times ${b}$. <br>`
            texte_corr += `Calcul : $${a} \\times ${b}$. <br>`
            texte += `Réponses possibles : <br>`;
            tabrep = [a*b, 10*a*b, a*b/10, a+b, a*b+1];
            tabicone = [1,0,0,0,0,0];
            shuffle2tableaux(tabrep, tabicone);
            for (let i=0; i<5; i++) {
              texte += `$\\square\\; ${tex_nombre(tabrep[i])}$` + espace ;
             if (tabicone[i]==1) {
               texte_corr += `$\\blacksquare\\; ${tex_nombre(tabrep[i])}$` + espace ;
             } else {
               texte_corr += `$\\square\\; ${tex_nombre(tabrep[i])}$` + espace ;
             }
           }
       break
          
          case "add_deci":
            a = 1000*randint(1,9)+100*randint(0,9,[3,4,5,6,7])+10*randint(0,9)+randint(0,9);
            b = 1000*randint(1,9)+100*randint(0,9,[3,4,5,6,7])+10*randint(0,9)+randint(0,9);
            texte += `Calcul : $${nombreDecimal(a/100)} + ${nombreDecimal(b/100)}$. <br>`
            texte_corr += `Calcul : $${nombreDecimal(a/100)} + ${nombreDecimal(b/100)}$. <br>`
            texte += `Réponses possibles : <br>`;
            tabrep = [(a+b)/100, (a*b)/100, (a+b)/1000, 10*(a+b)/100,(a+b+1)/100]; 
            tabicone = [1,0,0,0,0,0]; 
            shuffle2tableaux(tabrep, tabicone); 
            for (let i=0; i<5; i++) {
              texte += `$\\square\\; ${tex_nombre(tabrep[i])}$` + espace ;
             if (tabicone[i]==1) {
               texte_corr += `$\\blacksquare\\; ${tex_nombre(tabrep[i])}$` + espace ;
             } else {
               texte_corr += `$\\square\\; ${tex_nombre(tabrep[i])}$` + espace ;
             }
           }
          break 

          case "mul_deci":
            // a et b sont des nombres à 4 chiffres, dont 2 avant la virgule
            // on multiplie par 100 pour travailler avec des nombres entiers. Par ex : 6547 plutôt que 65.47
            a = 1000*randint(1,9)+100*randint(1,9,[3,4,5,6,7])+10*randint(1,9)+randint(0,9,[2,5]); // on évite le 2*5 avec les derniers chiffres
            b = 1000*randint(1,9)+100*randint(1,9,[3,4,5,6,7])+10*randint(1,9)+randint(0,9);
            texte += `Calcul : $${nombreDecimal(a/100)} \\times ${nombreDecimal(b/100)}$. <br>`
            texte_corr += `Calcul : $${nombreDecimal(a/100)} \\times ${nombreDecimal(b/100)}$. <br>`
            texte += `Réponses possibles : <br>`;
            tabrep = [(a*b)/10000, (10*a*b)/10000, (a*b)/100000, (a+b)/100, (a*b+1)/10000];
            tabicone = [1,0,0,0,0,0];
            shuffle2tableaux(tabrep, tabicone);
            for (let i=0; i<5; i++) {
              texte += `$\\square\\; ${tex_nombre(tabrep[i])}$` + espace ;
             if (tabicone[i]==1) {
               texte_corr += `$\\blacksquare\\; ${tex_nombre(tabrep[i])}$` + espace ;
             } else {
               texte_corr += `$\\square\\; ${tex_nombre(tabrep[i])}$` + espace ;
             }
           }
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
  
  //	this.besoin_formulaire_numerique = ['Type de questions', 3, `1 : Perpendiculaires\n 2 : Parallèles\n 3 : Mélange`]
  //  this.besoin_formulaire2_numerique = ["Type de cahier",3,`1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`];
  // this.besoin_formulaire3_case_a_cocher =['figure à main levée',true]  
  } // Fin de l'exercice.
  