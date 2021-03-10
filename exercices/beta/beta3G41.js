import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,combinaison_listes,  randint} from "/modules/outils.js"
import {mathalea2d, point, segment, polygone} from "/modules/2d.js"


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
    this.nb_questions = 2; // Ici le nombre de questions
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
  
    this.liste_questions = [] // tableau contenant la liste des questions 
    this.liste_corrections = []
    let type_de_questions_disponibles=[1,2,3,4] // tableau à compléter par valeurs possibles des types de questions
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions)
  // Ci-dessus On crée une liste aléatoire comprenant nb_questions parmi les types disponibles.
  /* Un exemple ci-dessous : si la classe est 6, alors les types dispo sont 1 et 2 sinon , 1,2,3 et 4.
  if (this.classe == 6) type_de_questions_disponibles = [1, 2]
      else type_de_questions_disponibles = [1, 2, 3,4]
  liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions)
  */
  // boucle pour fabriquer les nb_questions questions en s'assurant que si il n'y a pas nb_questions différentes
  // La boucle s'arrête après 50 tentatives.
  
      let objets_enonce,objets_enonceml,objets_correction,params_enonce,params_correction
  
      for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
        objets_enonce = [] // on initialise le tableau des objets Mathalea2d de l'enoncé
        objets_enonceml = [] // Idem pour l'enoncé à main levée si besoin
        objets_correction = [] // Idem pour la correction
  
        texte = `Un empilement de cubes est représenté ci-dessous. <br>`; // Nous utilisons souvent cette variable pour construire le texte de la question.
        texte_corr = ``; // Idem pour le texte de la correction.
                
        function cube(x,y,z,alpha, beta) { // renvoie une liste de 3 polygones
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
       
        // crée un empilement aléatoire
        let long = 4;
        let larg = 3; 
        let tabHauteurs = new Array(larg);
        for (let i = 0; i < larg; i++) {
          tabHauteurs[i] = new Array(long);
        }
        
        //premiere ligne
        for (let i = 0 ; i < larg; i++) {
          tabHauteurs[i][0] = randint(0,1);   
        }
        let hmax = 0 ; // hauteur maxiamle de l'empilement
        // deuxième ligne et suivantes
        for (let i = 0 ; i<larg ; i++) {
          for (let j = 1 ; j<long ; j++) {
            tabHauteurs[i][j] = tabHauteurs[i][j-1] + randint(0,2);
          } 
          hmax = Math.max(tabHauteurs[i][long-1], hmax)
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

        // cube(x,y,z,0,-90) : vue de haut
        // cube(x,y,z,90,0) : vue de gauche
        // cube(x,y,z,0,0) : vue de droite
        // cube(x,y,z,45,-35) : vue isométrique
        let lstCubes = [];

        // paramètres de la fenêtre Mathalea2d pour l'énoncé normal
        params_enonce = { xmin:-10, ymin: 0, xmax: 10, ymax: (long+larg)/2+hmax, pixelsParCm: 20, scale: 1, mainlevee: false} ;       
        // ajoute les cubes dans le dessin
        for (i = 0; i < lstCoordonneesCubes.length; i++) {
          for (let elm of cube(lstCoordonneesCubes[i][0],lstCoordonneesCubes[i][1],lstCoordonneesCubes[i][2],30,-35)) {
            objets_enonce.push(elm);
          }      
        }  
        texte += mathalea2d(params_enonce, objets_enonce) + "<br>";


        // blague
        objets_enonce = [];
        lstCoordonneesCubes=[];
        // C
        lstCoordonneesCubes.push([2,3,0])
        lstCoordonneesCubes.push([2,0,0])
        lstCoordonneesCubes.push([1,3,0])
        lstCoordonneesCubes.push([1,0,0])
        lstCoordonneesCubes.push([0,3,0])
        lstCoordonneesCubes.push([0,2,0])
        lstCoordonneesCubes.push([0,1,0])
        lstCoordonneesCubes.push([0,0,0])
        // O
        lstCoordonneesCubes.push([6,3,0])
        lstCoordonneesCubes.push([6,2,0])
        lstCoordonneesCubes.push([6,1,0])
        lstCoordonneesCubes.push([6,0,0])
        lstCoordonneesCubes.push([5,3,0])
        lstCoordonneesCubes.push([5,0,0])
        lstCoordonneesCubes.push([4,3,0])
        lstCoordonneesCubes.push([4,2,0])
        lstCoordonneesCubes.push([4,1,0])
        lstCoordonneesCubes.push([4,0,0])
        // O
        lstCoordonneesCubes.push([10,3,0])
        lstCoordonneesCubes.push([10,2,0])
        lstCoordonneesCubes.push([10,1,0])
        lstCoordonneesCubes.push([10,0,0])
        lstCoordonneesCubes.push([9,3,0])
        lstCoordonneesCubes.push([9,0,0])
        lstCoordonneesCubes.push([8,3,0])
        lstCoordonneesCubes.push([8,2,0])
        lstCoordonneesCubes.push([8,1,0])
        lstCoordonneesCubes.push([8,0,0])
        // P
        lstCoordonneesCubes.push([14,3,0])
        lstCoordonneesCubes.push([14,2,0])
        lstCoordonneesCubes.push([14,1,0])
        lstCoordonneesCubes.push([13,3,0])
        lstCoordonneesCubes.push([13,1,0])
        lstCoordonneesCubes.push([12,3,0])
        lstCoordonneesCubes.push([12,2,0])
        lstCoordonneesCubes.push([12,1,0])
        lstCoordonneesCubes.push([12,0,0])

        params_enonce = { xmin:-10, ymin: 0, xmax: 20, ymax: 20, pixelsParCm: 20, scale: 1, mainlevee: false} ;       

        for (i = 0; i < lstCoordonneesCubes.length; i++) {
          for (let elm of cube(lstCoordonneesCubes[i][0],lstCoordonneesCubes[i][1],lstCoordonneesCubes[i][2],30,-35)) {
            objets_enonce.push(elm);
          }      
        }

        texte += mathalea2d(params_enonce, objets_enonce) + "<br>";

        switch (liste_type_de_questions[i]) {
          case 1:
            texte += `Dessiner la vue de gauche de cet empilement de cubes. <br>`
            //ici sont créés les texte, tex_corr, objets mathalea2d divers entrant dans le contenu de l'exercice
            texte_corr += "Vue de gauche (les faces grises) : "
            params_correction = { xxmin:-10, ymin: 0, xmax: 10, ymax: (long+larg)/2+hmax, pixelsParCm: 20, scale: 1, mainlevee: false};
            for (i = 0; i < lstCoordonneesCubes.length; i++) {
              for (let elm of cube(lstCoordonneesCubes[i][0]+larg+1,lstCoordonneesCubes[i][1]-long-1,lstCoordonneesCubes[i][2],90,0)) {
                objets_correction.push(elm);
              }
            }
            texte_corr += mathalea2d(params_correction, objets_correction);
          break;
  
          case 2:
            texte += `Dessiner la vue de droite de cet empilement de cubes. <br>`
            texte_corr += "Vue de droite (les faces vertes) : "
            params_correction = { xxmin:-10, ymin: 0, xmax: 10, ymax: (long+larg)/2+hmax, pixelsParCm: 20, scale: 1, mainlevee: false};
            for (i = 0; i < lstCoordonneesCubes.length; i++) {
              for (let elm of cube(lstCoordonneesCubes[i][0]+larg+1,lstCoordonneesCubes[i][1]-long-1,lstCoordonneesCubes[i][2],0,0)) {
                objets_correction.push(elm);
              }
            }
          break
  
          case 3:
            texte += `Dessiner la vue de dessus de cet empilement de cubes. <br>`
            texte_corr += "Vue de haut (les faces blanches) : "
            params_correction = { xxmin:-10, ymin: 0, xmax: 10, ymax: (long+larg)/2+hmax, pixelsParCm: 20, scale: 1, mainlevee: false};
            for (i = 0; i < lstCoordonneesCubes.length; i++) {
              for (let elm of cube(lstCoordonneesCubes[i][0]+larg+1,lstCoordonneesCubes[i][1]-long-1,lstCoordonneesCubes[i][2],0,-90)) {
                objets_correction.push(elm);
              }            
            }
          break
            
          case 4:
            texte += `Dessiner les vues de gauche, de droite et du dessus de cet empilement de cubes. <br>`
            params_correction = { xxmin:-10, ymin: 0, xmax: 10, ymax: (long+larg)/2+hmax, pixelsParCm: 20, scale: 1, mainlevee: false};
            for (i = 0; i < lstCoordonneesCubes.length; i++) {
              for (let elm of cube(lstCoordonneesCubes[i][0]+larg+1,lstCoordonneesCubes[i][1]-long-1,lstCoordonneesCubes[i][2],90,0)) {
                objets_correction.push(elm);
              }
              for (let elm of cube(lstCoordonneesCubes[i][0]+larg+1,lstCoordonneesCubes[i][1]-long-1,lstCoordonneesCubes[i][2],0,0)) {
                objets_correction.push(elm);
              }
              for (let elm of cube(lstCoordonneesCubes[i][0]+larg+1,lstCoordonneesCubes[i][1]-long-1,lstCoordonneesCubes[i][2],0,-90)) {
                objets_correction.push(elm);
              }     
            }     
          break  
        }
 
  //paramètres de la fenêtre Mathalea2d pour l'énoncé main levée
    //    params_enonceml = { xmin: Math.min(objets_enonceml.x), ymin: Math.min(objets_enonceml.y), xmax: Math.max(objets_enonceml.x), ymax: Math.max(objets_enonceml.y), pixelsParCm: 20, scale: 1, mainlevee: true, amplitude: 1 }
  //paramètres de la fenêtre Mathalea2d pour la correction
        params_correction = { xxmin:-10, ymin: 0, xmax: 10, ymax: (long+larg)/2+hmax, pixelsParCm: 20, scale: 1, mainlevee: false}

  // On ajoute au texte de la correction, la figure de la correction
        texte_corr += mathalea2d(params_correction, objets_correction)
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
  