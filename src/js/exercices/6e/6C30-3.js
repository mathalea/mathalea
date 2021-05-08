import Exercice from '../ClasseExercice.js';
import {exportQcmAmc,listeQuestionsToContenu,combinaisonListes, randint,texNombre2, calcul,shuffle2tableaux} from '../../modules/outils.js'

export const amcReady = true
export const amcType = 1 // type de question AMC

export const titre = 'Opérations avec les nombres décimaux'

/**
 * Reconnaître une fonction affine
* @auteur Erwan Duplessy
* 6C30-1
* Trouver la réposne exacte. 4 cas :
* - somme de deux entiers
* - produit de deux entiers
* - somme de deux décimaux
* - produit de deux décimaux
* date : 2021/02/15
*/

export default function Multiplication_mental_decimaux() {
    "use strict"     
    Exercice.call(this)
    this.titre = titre;
    this.consigne = "Trouver la réponse exacte du calcul parmi les réponses proposées.";
    this.nbQuestions = 4; // Ici le nombre de questions
    this.video = "";
    this.nbQuestionsModifiable=true // Active le formulaire nombre de questions
    this.nbCols = 1; // Le nombre de colonnes dans l'énoncé LaTeX
    this.nbColsCorr = 1;// Le nombre de colonne pour la correction LaTeX
    this.pasDeVersionLatex=false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
    this.pas_de_version_HMTL=false // mettre à true si on ne veut pas de l'exercice en ligne
       this.qcmDisponible=false
    this.modeQcm=true;
  // Voir la Classe Exercice pour une liste exhaustive des propriétés disponibles.

  
  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
    this.nouvelleVersion = function () {
    // la variable numeroExercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page
 
    this.qcm=['6C30-3',[],"Opérations avec les nombres décimaux",1] // Ajouté par Jean-Claude Lhote : ceci est un exercice à QCM this.qcm permet de l'exporter vers AMC
 
    this.listeQuestions = [] // tableau contenant la liste des questions 
    this.listeCorrections = []
    let type_de_questions_disponibles=["add", "mul", "add_deci", "mul_deci"] // tableau à compléter par valeurs possibles des types de questions
    let listeTypeDeQuestions = combinaisonListes(type_de_questions_disponibles, this.nbQuestions)
    
    // on définit l'espace horizontal entre les réponses en fonction de la sortie html/LaTeX :
    let espace =``;
    if (sortieHtml) {
      espace = `&emsp;`;
    } else {
      espace = `\\qquad`;
    }
      for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
        texte = `` // Nous utilisons souvent cette variable pour construire le texte de la question.
        texteCorr = `` // Idem pour le texte de la correction.
        let a=0, b=0, tabrep=[], tabicone=[]; // les deux opérandes

        switch (listeTypeDeQuestions[i]) { // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
          case "add":
               a = 10*randint(1,9)+randint(1,9);
               b = 10*randint(1,9)+randint(1,9);

               tabrep = [`$${texNombre2(calcul(a+b))}$`, `$${texNombre2(calcul(a*b))}$`, `$${texNombre2(calcul((a+b)/10))}$`, `$${texNombre2(calcul(10*(a+b)))}$`, `$${texNombre2(calcul(a+b+1))}$`]; // réponses possibles
               tabicone = [1,0,0,0,0]; // 1 pour la bonne réponse
               /**********************************************************************/
               // ajouté par Jean-Caude Lhote pour générer des QCM AMC
               this.qcm[1].push([`Calcul : $${a}+${b}$.\\\\ \n Réponses possibles`,tabrep.slice(0),tabicone.slice(0)]) 
               // tableau pour la fonction exportQcmAmc
               /**********************************************************************/

               texte += `Calcul : $${a} + ${b}$. <br>`;
         
               if (this.modeQcm&&!mathalea.sortieAMC){
                texteCorr += `Calcul : $${a} + ${b}$. <br>`;
               texte += `Réponses possibles : <br>`;
               shuffle2tableaux(tabrep, tabicone); // on mélange les deux tableaux avec la même permutation
               for (let i=0; i<tabrep.length; i++) {
                 texte += `$\\square\\;$ ${tabrep[i]}` + espace ;
                if (tabicone[i]==1) {
                  texteCorr += `$\\blacksquare\\;$ ${tabrep[i]}` + espace ;
                } else {
                  texteCorr += `$\\square\\;$ ${tabrep[i]}` + espace ;
                }
              }
            }
            else {
              texteCorr+=`$${a} + ${b}=${texNombre2(calcul(a+b))}$`
            }
          break;
  
          case "mul":
            a = 10*randint(1,9)+randint(1,9);
            b = 10*randint(1,9)+randint(1,9);
            tabrep = [`$${texNombre2(a*b)}$`, `$${texNombre2(10*a*b)}$`, `$${texNombre2(a*b/10)}$`, `$${texNombre2(a+b)}$`, `$${texNombre2(a*b+1)}$`];
            tabicone = [1,0,0,0,0];
            /**********************************************************************/
               // ajouté par Jean-Caude Lhote pour générer des QCM AMC
               this.qcm[1].push([`Calcul : $${a} \\times ${b}$.\\\\ \n Réponses possibles`,tabrep.slice(0),tabicone.slice(0)]) 
               // tableau pour la fonction exportQcmAmc
               /**********************************************************************/

            texte += `Calcul : $${a} \\times ${b}$. <br>`
            if (this.modeQcm){
              texte += `Réponses possibles : <br>`;
              texteCorr += `Calcul : $${a} \\times ${b}$. <br>`
              shuffle2tableaux(tabrep, tabicone);
              for (let i=0; i<tabrep.length; i++) {
                texte += `$\\square\\;$ ${tabrep[i]}` + espace ;
               if (tabicone[i]==1) {
                 texteCorr += `$\\blacksquare\\;$ ${tabrep[i]}` + espace ;
               } else {
                 texteCorr += `$\\square\\;$ ${tabrep[i]}` + espace ;
               }
             }
            }
            else {
              texteCorr+=`$${a} \\times ${b}=${texNombre2(calcul(a*b))}$`
            }
       break
          
          case "add_deci":
            a = 1000*randint(1,9)+100*randint(0,9,[3,4,5,6,7])+10*randint(0,9)+randint(0,9);
            b = 1000*randint(1,9)+100*randint(0,9,[3,4,5,6,7])+10*randint(0,9)+randint(0,9);
            tabrep = [`$${texNombre2(calcul((a+b)/100))}$`, `$${texNombre2(calcul((a*b)/100))}$`, `$${texNombre2(calcul((a+b)/1000))}$`, `$${texNombre2(calcul(10*(a+b)/100))}$`,`$${texNombre2(calcul((a+b+1)/100))}$`]; 
            tabicone = [1,0,0,0,0]; 
            /**********************************************************************/
               // ajouté par Jean-Caude Lhote pour générer des QCM AMC
               this.qcm[1].push([`Calcul : $${texNombre2(a/100)}+${texNombre2(b/100)}$.\\\\ \n Réponses possibles`,tabrep.slice(0),tabicone.slice(0)]) 
               // tableau pour la fonction exportQcmAmc
               /**********************************************************************/

            texte += `Calcul : $${texNombre2(a/100)} + ${texNombre2(b/100)}$. <br>`
            if (this.modeQcm){
            texteCorr += `Calcul : $${texNombre2(a/100)} + ${texNombre2(b/100)}$. <br>`
            texte += `Réponses possibles : <br>`;
            shuffle2tableaux(tabrep, tabicone); 
            for (let i=0; i<tabrep.length; i++) {
              texte += `$\\square\\;$ ${tabrep[i]}` + espace ;
             if (tabicone[i]==1) {
               texteCorr += `$\\blacksquare\\;$ ${tabrep[i]}` + espace ;
             } else {
               texteCorr += `$\\square\\;$ ${tabrep[i]}` + espace ;
             }
           }
          }
          else {
            texteCorr += ` $${texNombre2(a/100)} + ${texNombre2(b/100)}=${texNombre2(calcul(a/100+b/100))}$. <br>`
          }
          break 

          case "mul_deci":
            // a et b sont des nombres à 4 chiffres, dont 2 avant la virgule
            // on multiplie par 100 pour travailler avec des nombres entiers. Par ex : 6547 plutôt que 65.47
            a = 1000*randint(1,9)+100*randint(1,9,[3,4,5,6,7])+10*randint(1,9)+randint(0,9,[2,5]); // on évite le 2*5 avec les derniers chiffres
            b = 1000*randint(1,9)+100*randint(1,9,[3,4,5,6,7])+10*randint(1,9)+randint(0,9);
            tabrep = [`$${texNombre2(calcul((a*b)/10000))}$`,`$${texNombre2(calcul((10*a*b)/10000))}$`,`$${texNombre2(calcul((a*b)/100000))}$`,`$${texNombre2(calcul((a+b)/100))}$`,`$${texNombre2(calcul((a*b+1)/10000))}$`];
            tabicone = [1,0,0,0,0];
            /**********************************************************************/
               // ajouté par Jean-Caude Lhote pour générer des QCM AMC
               this.qcm[1].push([`Calcul : $${texNombre2(a/100)} \\times ${texNombre2(b/100)}$.\\\\ \n Réponses possibles`,tabrep.slice(0),tabicone.slice(0)]) 
               // tableau pour la fonction exportQcmAmc
               /**********************************************************************/

            texte += `Calcul : $${texNombre2(a/100)} \\times ${texNombre2(b/100)}$. <br>`
            if (this.modeQcm){
            texteCorr += `Calcul : $${texNombre2(a/100)} \\times ${texNombre2(b/100)}$. <br>`
            texte += `Réponses possibles : <br>`;
  
            shuffle2tableaux(tabrep, tabicone);
            for (let i=0; i<tabrep.length; i++) {
              texte += `$\\square\\;$ ${tabrep[i]}` + espace ;
             if (tabicone[i]==1) {
               texteCorr += `$\\blacksquare\\;$ ${tabrep[i]}` + espace ;
             } else {
               texteCorr += `$\\square\\;$ ${tabrep[i]}` + espace ;
             }
           }
          }
          else {
            texteCorr += `$${texNombre2(a/100)} \\times ${texNombre2(b/100)}=${texNombre2(calcul(a*b/10000))}$. <br>`
          }
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
  
  //	this.besoinFormulaireCaseACocher = ['Mode QCM',true]
  //  this.besoinFormulaire2Numerique = ["Type de cahier",3,`1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`];
  // this.besoinFormulaire3CaseACocher =['figure à main levée',true]  
  } // Fin de l'exercice.
  