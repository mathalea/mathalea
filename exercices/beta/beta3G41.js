import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,combinaison_listes, randint} from "/modules/outils.js"
import {mathalea2d} from "/modules/2d.js"
import {cube} from "/modules/3d.js"

/**
* Vue de dessus, face et côté
* @auteur Erwan DUPLESSY
* 3G41
* mars 2021
* Source : http://cache.media.education.gouv.fr/file/Geometrie_et_espace/47/1/RA16_C4_MATH_geo_espace_flash_567471.pdf
* Dessiner vue de face, côté, dessus d'un empilement de cubes
*/

export default function VuesEmpilementCubes() {
  "use strict"
  Exercice.call(this)
  this.titre = "Représentation de solides";
  this.nb_questions = 1; // Ici le nombre de questions
  this.nb_questions_modifiable=true // Active le formulaire nombre de questions
  this.nb_cols = 1; // Le nombre de colonnes dans l'énoncé LaTeX
  this.nb_cols_corr = 1;// Le nombre de colonne pour la correction LaTeX
  this.pas_de_version_LaTeX=false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
  this.pas_de_version_HMTL=false // mettre à true si on ne veut pas de l'exercice en ligne
  this.sup = 1; // A décommenter : valeur par défaut d'un premier paramètre
  this.sup2 = 1; // A décommenter : valeur par défaut d'un deuxième paramètre
  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
  this.nouvelle_version = function () {  
    this.liste_questions = [] // tableau contenant la liste des questions 
    this.liste_corrections = [];
    let type_de_questions_disponibles=[parseInt(this.sup)] // tableau à compléter par valeurs possibles des types de questions
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions)
    let objets_enonce,objets_correction,params_enonce,params_correction ;
    
    function empilementCubes(long, larg, hmax) {
      let tabHauteurs = new Array(larg);
      for (let i = 0; i < larg; i++) {
        tabHauteurs[i] = new Array(long);
      }        
      //premiere ligne
      for (let i = 0 ; i < larg; i++) {
        tabHauteurs[i][0] = randint(0,1);   
      }
      // deuxième ligne et suivantes
      for (let i = 0 ; i<larg ; i++) {
        for (let j = 1 ; j<long ; j++) {
          tabHauteurs[i][j] = Math.min(tabHauteurs[i][j-1] + randint(0,2), hmax);
        } 
      }
      //Vérification Dernière Ligne : ne pas être vide.
      for (let i = 0 ; i<larg ; i++) {
        tabHauteurs[i][long-1] = Math.max(1, tabHauteurs[i][long-1]);
      }
      // Ajoute les cubes dans un tableau une dimension
      // il faut trier les cubes : x décroissant puis y décroissant, puis z croissant
      let lstCoordonneesCubes = [];
      for (let i = larg-1 ; i>-1; i=i-1) {
        for (let j = long-1 ; j>-1; j=j-1) {
          for (let k=0 ; k < tabHauteurs[i][j]; k++)
          lstCoordonneesCubes.push([i,j,k])
        }          
      }
    return lstCoordonneesCubes;
    } 
    
    let longueur = 2 + parseInt(this.sup2); // longueur de l'empilement
    let largeur = longueur; // largeur de l'empilement
    let hauteur = longueur; // hauteur de l'empilement

    for (let q = 0, texte, texte_corr, cpt = 0; q < this.nb_questions && cpt < 50;) {
      objets_enonce = [] // on initialise le tableau des objets Mathalea2d de l'enoncé
      objets_correction = [] // Idem pour la correction

      texte = ``; // Nous utilisons souvent cette variable pour construire le texte de la question.
      texte_corr = ``; // Idem pour le texte de la correction.

      let L, alpha, beta, cosa, cosb, sina, sinb;

      // cube(x,y,z,0,-90) : vue de haut
      // cube(x,y,z,90,0) : vue de gauche
      // cube(x,y,z,0,0) : vue de droite
      // cube(x,y,z,45,-35) : vue isométrique              

      switch (liste_type_de_questions[q]) {
        case 1:
          // GAUCHE
          alpha = 15;
          beta = -30;
          texte += `Solide 1 : dessiner la vue de gauche (les faces grises) de cet empilement de cubes. <br>`
          L = empilementCubes(longueur, largeur, hauteur);
          objets_enonce = [] ;
          for (let i = 0; i < L.length; i++) {
            objets_enonce.push(cube(L[i][0], L[i][1], L[i][2], alpha, beta,{}));
          }
          cosa = Math.cos(alpha*Math.PI/180);
          sina = Math.sin(alpha*Math.PI/180);
          cosb = Math.cos(beta*Math.PI/180);
          sinb = Math.sin(beta*Math.PI/180);
          params_enonce = {
            xmin:-sina*largeur - 0.5, 
            ymin: -0.5, 
            xmax: cosa*longueur + 0.5, 
            ymax: -sina*sinb*longueur - cosa*sinb*largeur + cosb*hauteur + 0.5, 
            pixelsParCm: 20, 
            scale: 1, 
            mainlevee: false} ;       
          texte += mathalea2d(params_enonce, objets_enonce) + " "; 
          // correction :
          texte_corr += "Solide 1 : vue de gauche (les faces grises) : ";
          alpha = 90;
          beta = 0;
          cosa = Math.cos(alpha*Math.PI/180);
          sina = Math.sin(alpha*Math.PI/180);
          cosb = Math.cos(beta*Math.PI/180);
          sinb = Math.sin(beta*Math.PI/180);
          params_correction = { 
            xmin:-sina*largeur - 0.5, 
            ymin: -0.5, 
            xmax: cosa*longueur + 0.5, 
            ymax: -sina*sinb*longueur - cosa*sinb*largeur + cosb*hauteur + 0.5, 
            pixelsParCm: 20, 
            scale: 1, 
            mainlevee: false};
          objets_correction = [];
          for (let i = 0; i < L.length; i++) {
              objets_correction.push(cube(L[i][0], L[i][1], L[i][2], alpha, beta, {}));
          }
          texte_corr += mathalea2d(params_correction, objets_correction) + "<br>";   

          // FACE
          texte += `Solide 2 : dessiner la vue de face (les faces vertes) de cet empilement de cubes. <br>`;
          L = empilementCubes(longueur, largeur, hauteur);
          objets_enonce = [] ;
          for (let i = 0; i < L.length; i++) {
            objets_enonce.push(cube(L[i][0], L[i][1], L[i][2], alpha, beta,{}));
          }
          alpha = 15;
          beta = -30;
          cosa = Math.cos(alpha*Math.PI/180);
          sina = Math.sin(alpha*Math.PI/180);
          cosb = Math.cos(beta*Math.PI/180);
          sinb = Math.sin(beta*Math.PI/180);
          params_enonce = {
            xmin:-sina*largeur - 0.5, 
            ymin: -0.5, 
            xmax: cosa*longueur + 0.5, 
            ymax: -sina*sinb*longueur - cosa*sinb*largeur + cosb*hauteur + 0.5, 
            pixelsParCm: 20, 
            scale: 1, 
            mainlevee: false} ;       
          texte += mathalea2d(params_enonce, objets_enonce) + " "; 
          // correction :
          texte_corr += "Solide 2 : vue de face (les faces vertes) : "
          alpha = 0;
          beta = 0;
          cosa = Math.cos(alpha*Math.PI/180);
          sina = Math.sin(alpha*Math.PI/180);
          cosb = Math.cos(beta*Math.PI/180);
          sinb = Math.sin(beta*Math.PI/180);
          params_correction = { 
            xmin:-sina*largeur - 0.5, 
            ymin: -0.5, 
            xmax: cosa*longueur + 0.5, 
            ymax: -sina*sinb*longueur - cosa*sinb*largeur + cosb*hauteur + 0.5, 
            pixelsParCm: 20, 
            scale: 1, 
            mainlevee: false};
          objets_correction = [];
          for (let i = 0; i < L.length; i++) {
              objets_correction.push(cube(L[i][0], L[i][1], L[i][2], alpha, beta, {}));
          }
          texte_corr += mathalea2d(params_correction, objets_correction) + "<br>";   

          //HAUT
          texte += `Solide 3 : dessiner la vue de haut (les faces blanches) de cet empilement de cubes. <br>`
          L = empilementCubes(longueur, largeur);
          alpha = 15;
          beta = -30;
          objets_enonce = [] ;
          for (let i = 0; i < L.length; i++) {
            objets_enonce.push(cube(L[i][0], L[i][1], L[i][2], alpha, beta,{}));
          }
          alpha = 15;
          beta = -30;
          cosa = Math.cos(alpha*Math.PI/180);
          sina = Math.sin(alpha*Math.PI/180);
          cosb = Math.cos(beta*Math.PI/180);
          sinb = Math.sin(beta*Math.PI/180);
          params_enonce = {
            xmin:-sina*largeur - 0.5, 
            ymin: -0.5, 
            xmax: cosa*longueur + 0.5, 
            ymax: -sina*sinb*longueur - cosa*sinb*largeur + cosb*hauteur + 0.5, 
            pixelsParCm: 20, 
            scale: 1, 
            mainlevee: false} ;       
          texte += mathalea2d(params_enonce, objets_enonce) + " "; 
          // correction :
          texte_corr += "Solide 3 : vue de haut (les faces blanches) : "
          alpha = 0;
          beta = -90;
          cosa = Math.cos(alpha*Math.PI/180);
          sina = Math.sin(alpha*Math.PI/180);
          cosb = Math.cos(beta*Math.PI/180);
          sinb = Math.sin(beta*Math.PI/180);
          params_correction = { 
            xmin:-sina*largeur - 0.5, 
            ymin: -0.5, 
            xmax: cosa*longueur + 0.5, 
            ymax: -sina*sinb*longueur - cosa*sinb*largeur + cosb*hauteur + 0.5, 
            pixelsParCm: 20, 
            scale: 1, 
            mainlevee: false};
          objets_correction = [];
          for (let i = 0; i < L.length; i++) {
              objets_correction.push(cube(L[i][0], L[i][1], L[i][2], alpha, beta, {}));
          }
          texte_corr += mathalea2d(params_correction, objets_correction) + "<br>";   
        break;

        case 2:
          texte += `Dessiner les vues de haut (les faces blanches), de face (les faces vertes), et de gauche (les faces grises) de cet empilement de cubes. <br>`;
          L = empilementCubes(longueur, largeur);
          alpha = 15;
          beta = -30;
          objets_enonce = [] ;
          for (let i = 0; i < L.length; i++) {
            objets_enonce.push(cube(L[i][0], L[i][1], L[i][2], alpha, beta,{}));
          }
          cosa = Math.cos(alpha*Math.PI/180);
          sina = Math.sin(alpha*Math.PI/180);
          cosb = Math.cos(beta*Math.PI/180);
          sinb = Math.sin(beta*Math.PI/180);
          params_enonce = {
            xmin:-sina*largeur - 0.5, 
            ymin: -0.5, 
            xmax: cosa*longueur + 0.5, 
            ymax: -sina*sinb*longueur - cosa*sinb*largeur + cosb*hauteur + 0.5, 
            pixelsParCm: 20, 
            scale: 1, 
            mainlevee: false} ;       
          texte += mathalea2d(params_enonce, objets_enonce) + " "; 
          alpha = 30;
          beta = -25;
          objets_enonce = [] ;
          for (let i = 0; i < L.length; i++) {
            objets_enonce.push(cube(L[i][0], L[i][1], L[i][2], alpha, beta,{}));
          }
          cosa = Math.cos(alpha*Math.PI/180);
          sina = Math.sin(alpha*Math.PI/180);
          cosb = Math.cos(beta*Math.PI/180);
          sinb = Math.sin(beta*Math.PI/180);
          params_enonce = {
            xmin:-sina*largeur - 0.5, 
            ymin: -0.5, 
            xmax: cosa*longueur + 0.5, 
            ymax: -sina*sinb*longueur - cosa*sinb*largeur + cosb*hauteur + 0.5, 
            pixelsParCm: 20, 
            scale: 1, 
            mainlevee: false} ;       
          texte += mathalea2d(params_enonce, objets_enonce) + " ";

          // correction :
          texte_corr += "Vue de haut (les faces blanches) : "
          alpha = 0;
          beta = -90;
          cosa = Math.cos(alpha*Math.PI/180);
          sina = Math.sin(alpha*Math.PI/180);
          cosb = Math.cos(beta*Math.PI/180);
          sinb = Math.sin(beta*Math.PI/180);
          params_correction = { 
            xmin:-sina*largeur - 0.5, 
            ymin: -0.5, 
            xmax: cosa*longueur + 0.5, 
            ymax: -sina*sinb*longueur - cosa*sinb*largeur + cosb*hauteur + 0.5, 
            pixelsParCm: 20, 
            scale: 1, 
            mainlevee: false};
          objets_correction = [];
          for (let i = 0; i < L.length; i++) {
              objets_correction.push(cube(L[i][0], L[i][1], L[i][2], alpha, beta, {}));
          }
          texte_corr += mathalea2d(params_correction, objets_correction) + "<br>";   

          texte_corr += "Vue de droite (les faces vertes) : "
          alpha = 0;
          beta = 0;
          cosa = Math.cos(alpha*Math.PI/180);
          sina = Math.sin(alpha*Math.PI/180);
          cosb = Math.cos(beta*Math.PI/180);
          sinb = Math.sin(beta*Math.PI/180);
          params_correction = { 
            xmin:-sina*largeur - 0.5, 
            ymin: -0.5, 
            xmax: cosa*longueur + 0.5, 
            ymax: -sina*sinb*longueur - cosa*sinb*largeur + cosb*hauteur + 0.5, 
            pixelsParCm: 20, 
            scale: 1, 
            mainlevee: false};
          objets_correction = [];
          for (let i = 0; i < L.length; i++) {
              objets_correction.push(cube(L[i][0], L[i][1], L[i][2], alpha, beta, {}));
          }
          texte_corr += mathalea2d(params_correction, objets_correction) + "<br>"; 

          texte_corr += "Vue de gauche (les faces grises) : "
          alpha = 90;
          beta = 0;
          cosa = Math.cos(alpha*Math.PI/180);
          sina = Math.sin(alpha*Math.PI/180);
          cosb = Math.cos(beta*Math.PI/180);
          sinb = Math.sin(beta*Math.PI/180);
          params_correction = { 
            xmin:-sina*largeur - 0.5, 
            ymin: -0.5, 
            xmax: cosa*longueur + 0.5, 
            ymax: -sina*sinb*longueur - cosa*sinb*largeur + cosb*hauteur + 0.5, 
            pixelsParCm: 20, 
            scale: 1, 
            mainlevee: false};
          objets_correction = [];
          for (let i = 0; i < L.length; i++) {
              objets_correction.push(cube(L[i][0], L[i][1], L[i][2], alpha, beta, {}));
          }
          texte_corr += mathalea2d(params_correction, objets_correction) + "<br>";   
        break
      }
      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on la stocke dans la liste des questions
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        q++;
        }
        cpt++;
      }
      liste_de_question_to_contenu(this); // On envoie l'exercice à la fonction de mise en page
    };
  // Si les variables suivantes sont définies, elles provoquent l'affichage des formulaires des paramètres correspondants
  // Il peuvent être de 3 types : _numerique, _case_a_cocher ou _texte.
  // Il sont associés respectivement aux paramètres sup, sup2 et sup3.
  
  this.besoin_formulaire_numerique = ['Type de questions', 2, `1 : un solide et ses trois vues\n 2 : on demande une vue par solide`]
  this.besoin_formulaire2_numerique = ["Taille de l'empilement",5,`3 \n4 \n5 \n6 \n7`];
  // this.besoin_formulaire3_case_a_cocher =['figure à main levée',true]
  
  } // Fin de l'exercice.
  