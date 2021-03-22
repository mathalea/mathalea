import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,combinaison_listes,  randint} from "/modules/outils.js"
import {mathalea2d, point, segment, polygone} from "/modules/2d.js"

/**
* Compter des cubes
* @auteur Erwan DUPLESSY
* 6G43
* mars 2021
* Source : http://cache.media.education.gouv.fr/file/Geometrie_et_espace/47/1/RA16_C4_MATH_geo_espace_flash_567471.pdf
* Dessiner vue de face, côté, dessus d'un empilement de cubes
*/

export default function VuesEmpilementCubes() {
  "use strict"
  Exercice.call(this)
  this.titre = "Représentation de solides";
  this.nb_questions = 3; // Ici le nombre de questions
  this.nb_questions_modifiable=true // Active le formulaire nombre de questions
  this.nb_cols = 1; // Le nombre de colonnes dans l'énoncé LaTeX
  this.nb_cols_corr = 1;// Le nombre de colonne pour la correction LaTeX
  this.pas_de_version_LaTeX=false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
  this.pas_de_version_HMTL=false // mettre à true si on ne veut pas de l'exercice en ligne
  this.sup = 2; // A décommenter : valeur par défaut d'un premier paramètre
  this.sup2 = 1; // A décommenter : valeur par défaut d'un deuxième paramètre
  //  this.sup3 = false; // A décommenter : valeur par défaut d'un troisième paramètre  
  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
  this.nouvelle_version = function () {  
    this.liste_questions = [] // tableau contenant la liste des questions 
    this.liste_corrections = [];
    let type_de_questions_disponibles=[] // tableau à compléter par valeurs possibles des types de questions
    switch (parseInt(this.sup)) {
      case 1:
        type_de_questions_disponibles =[1]
      case 2:
        type_de_questions_disponibles=[2]
      case 3:
        type_de_questions_disponibles=[1,2]
    }
    
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions)
    let objets_enonce,objets_enonceml,objets_correction,params_enonce,params_correction ;
    let longueur = 2+parseInt(this.sup2); // longueur de l'empilement
    let largeur = 2+parseInt(this.sup2); // largeur de l'empilement

    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
      objets_enonce = [] // on initialise le tableau des objets Mathalea2d de l'enoncé
      objets_enonceml = [] // Idem pour l'enoncé à main levée si besoin
      objets_correction = [] // Idem pour la correction

      texte = `Un empilement de cubes est représenté ci-dessous. <br>`; // Nous utilisons souvent cette variable pour construire le texte de la question.
      texte_corr = ``; // Idem pour le texte de la correction.

      // fonction cube : permet d'obtenir une vue 3D d'un cube à l'aide de 3 quadrilatères
      // la fonction renvoie une liste de 3 quadrilatères Mathalea2D
      // cube(x,y,z,0,-90) : vue de haut
      // cube(x,y,z,90,0) : vue de gauche
      // cube(x,y,z,0,0) : vue de droite
      // cube(x,y,z,45,-35) : vue isométrique
              
      function cube(x, y, z, alpha, beta) { // renvoie une liste de 3 polygones
        let lstPoints = [];
        let lstSegments =[];
        let lstPolygone = [];

        function proj(x,y,z,alpha, beta) {
          const cosa = Math.cos(alpha*Math.PI/180);
          const sina = Math.sin(alpha*Math.PI/180);
          const cosb = Math.cos(beta*Math.PI/180);
          const sinb = Math.sin(beta*Math.PI/180);
          return point(cosa*x-sina*y, -sina*sinb*x-cosa*sinb*y+cosb*z);
        }

        lstPoints.push(proj(x,y,z,alpha, beta)) // point 0 en bas
        lstPoints.push(proj(x+1,y,z,alpha, beta)) // point 1
        lstPoints.push(proj(x+1,y,z+1,alpha, beta)) // point 2
        lstPoints.push(proj(x,y,z+1,alpha, beta)) //point 3
        lstPoints.push(proj(x+1,y+1,z+1,alpha, beta)) // point 4
        lstPoints.push(proj(x,y+1,z+1,alpha, beta)) // point 5
        lstPoints.push(proj(x,y+1,z,alpha, beta)) // point 6
        lstSegments.push(segment(lstPoints[0], lstPoints[1]))
        lstSegments.push(segment(lstPoints[1], lstPoints[2]))
        lstSegments.push(segment(lstPoints[2], lstPoints[3]))
        lstSegments.push(segment(lstPoints[3], lstPoints[0]))
        lstSegments.push(segment(lstPoints[2], lstPoints[4]))
        lstSegments.push(segment(lstPoints[4], lstPoints[5]))
        lstSegments.push(segment(lstPoints[5], lstPoints[6]))
        lstSegments.push(segment(lstPoints[6], lstPoints[0]))
        lstSegments.push(segment(lstPoints[3], lstPoints[5]))
        let p;
        p = polygone([lstPoints[0], lstPoints[1],lstPoints[2], lstPoints[3]], "black")
        p.couleurDeRemplissage = "#A5C400"; // vert
        p.opaciteDeRemplissage=1;
        lstPolygone.push(p)
        p = polygone([lstPoints[2], lstPoints[4],lstPoints[5], lstPoints[3]], "black")
        p.couleurDeRemplissage = "#FFFFFF"; // blanc
        lstPolygone.push(p)
        //lstPolygone.push(p)
        p = polygone([lstPoints[3], lstPoints[5],lstPoints[6], lstPoints[0]], "black")
        p.couleurDeRemplissage = "#A9A9A9"; // gris
        lstPolygone.push(p)
        //lstPolygone.push()
        return lstPolygone;
      }

      function empilementCubes(long, larg) {
        let tabHauteurs = new Array(larg);
        for (let i = 0; i < larg; i++) {
          tabHauteurs[i] = new Array(long);
        }        
        //premiere ligne
        for (let i = 0 ; i < larg; i++) {
          tabHauteurs[i][0] = randint(0,1);   
        }
        let hmax = 0 ; // hauteur maximale de l'empilement
        // deuxième ligne et suivantes
        for (let i = 0 ; i<larg ; i++) {
          for (let j = 1 ; j<long ; j++) {
            tabHauteurs[i][j] = tabHauteurs[i][j-1] + randint(0,2);
          } 
          hmax = Math.max(tabHauteurs[i][long-1], hmax)
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
      let L;

      // paramètres de la fenêtre Mathalea2d pour l'énoncé normal
      params_enonce = { xmin:-10, ymin: 0, xmax: 10, ymax: 2.5*longueur, pixelsParCm: 20, scale: 1, mainlevee: false} ;       

      switch (liste_type_de_questions[i]) {
        case 1:
          // GAUCHE
          texte += `Combien de petits cubes contient cet empilement de cubes ? <br>`
          L = empilementCubes(longueur, largeur);
          objets_enonce = [] ;
          for (i = 0; i < L.length; i++) {
            for (let elm of cube(L[i][0], L[i][1], L[i][2],30,-35)) {
             objets_enonce.push(elm);
           }      
          }
          texte += mathalea2d(params_enonce, objets_enonce) + " "; 
          objets_enonce = [] ;
          for (i = 0; i < L.length; i++) {
            for (let elm of cube(L[i][0], L[i][1], L[i][2],15,-30)) {
             objets_enonce.push(elm);
           }      
          }  
          texte += mathalea2d(params_enonce, objets_enonce) + " <br>";
          // correction :
          texte_corr += "On peut représenter l'empilement par tranches : <br>"
          params_correction = { xmin:-longueur, ymin: 0, xmax: 3*longueur, ymax: 2.5*longueur, pixelsParCm: 20, scale: 1, mainlevee: false};
          objets_correction = [];
          for (i = 0; i < L.length; i++) {
            for (let elm of cube(3*L[i][0],L[i][1],L[i][2],30,-35)) {
              objets_correction.push(elm);
            }
          }
          texte_corr += mathalea2d(params_correction, objets_correction)+ "<br>";   
          texte_corr += `Il y a au total ${L.length} cubes.`       
        break;

        case 2:
          texte += `Combien de petits cubes manque-t-il pour reconstruire un grand cube ? <br>`;
          L = empilementCubes(longueur, largeur);
          objets_enonce = [] ;
          for (i = 0; i < L.length; i++) {
            for (let elm of cube(L[i][0], L[i][1], L[i][2],30,-35)) {
             objets_enonce.push(elm);
           }      
          }  
          texte += mathalea2d(params_enonce, objets_enonce) + " ";
          objets_enonce = [] ;
          for (i = 0; i < L.length; i++) {
            for (let elm of cube(L[i][0], L[i][1], L[i][2],15,-30)) {
             objets_enonce.push(elm);
           }      
          }  
          texte += mathalea2d(params_enonce, objets_enonce) + "<br>";
          // correction :
          texte_corr += "Vue de haut (les faces blanches) : "
          params_correction = { xmin:longueur, ymin: -longueur-1, xmax: 2*longueur+1, ymax: longueur, pixelsParCm: 20, scale: 1, mainlevee: false};
          objets_correction = [];
          for (i = 0; i < L.length; i++) {
            for (let elm of cube(L[i][0]+largeur+1,L[i][1]-longueur-1,L[i][2],0,-90)) {
              objets_correction.push(elm);
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
  
  this.besoin_formulaire_numerique = ['Type de questions', 2, `1 : un solide et ses trois vues\n 2 : on demande une vue par solide`]
  this.besoin_formulaire2_numerique = ["Taille de l'empilement",5,`3 \n4 \n5 \n6 \n7`];
  // this.besoin_formulaire3_case_a_cocher =['figure à main levée',true]
  
  } // Fin de l'exercice.
  