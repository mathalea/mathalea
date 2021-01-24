import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes} from "/modules/outils.js"
import {mathalea2d} from "/modules/2d.js"
import {point3d,vecteur3d,arete3d,sphere3d,rotation3d,rotationV3d} from "/modules/3d.js"

export default function CalculsDansLaSphere() {
    "use strict"
    Exercice.call(this)
    this.titre = "Calculs dans la sphère";
    this.nb_questions = 1;
    this.nb_questions_modifiable=true
    this.nb_cols = 1;
    this.nb_cols_corr = 1;
    this.pas_de_version_LaTeX=false
    this.pas_de_version_HMTL=false
  
  //  this.sup = false; // A décommenter : valeur par défaut d'un premier paramètre
  //  this.sup2 = false; // A décommenter : valeur par défaut d'un deuxième paramètre


    this.nouvelle_version = function (){
    this.liste_questions = [] // tableau contenant la liste des questions 
    this.liste_corrections = []
    let type_de_questions_disponibles=['calculRayon','calculPerimètre','calculLatitude']
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions)
   liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions)
      let objets_enonce,objets_correction,params_enonce,params_correction
  
      for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
        objets_enonce = [] // on initialise le tableau des objets Mathalea2d de l'enoncé
        objets_correction = [] // Idem pour la correction
        let O=point3d(0,0,0,false,'O')
        let M=point3d(3,-4,0,true,'M')
        let PoleNord=point3d(0,0,5,false,'N')
        let PoleSud=point3d(0,0,-5,false,'S')
        let R=vecteur3d(O,M)
        let Axe=arete3d(PoleSud,PoleNord)
        let normalV=vecteur3d(0,0,1)
        M=rotationV3d(M,normalV,mathalea.anglePerspective)
        let normalH=rotationV3d(R,normalV,90)
        let angle=randint(30,60)
        let P=rotationV3d(M,normalH,-angle)
        let H=point3d(0,0,P.z3d,false)
        let Sph=sphere3d(O,5,1,8)
        let HP=arete3d(H,P)
        let OP=arete3d(O,P)
        objets_enonce.push(Sph,Axe.p2d,HP.p2d,OP.p2d)
        objets_correction.push(Sph,Axe.p2d,HP.p2d,OP.p2d)
        texte = `` // Nous utilisons souvent cette variable pour construire le texte de la question.
        texte_corr = `` // Idem pour le texte de la correction.

        switch (liste_type_de_questions[i]) { // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
          case 'calculRayon':
               
            //ici sont créés les texte, tex_corr, objets mathalea2d divers entrant dans le contenu de l'exercice
          break;
  
          case 'calculPerimètre':
            // Idem Cas1 mais avec d'autres texte, texte_corr...
          break
  
          case 'calculLatitude':
            
          break
            
          case 4:
          
          break  
            
        }
  //  objets_enonce.push () // On rempli les tableaux d'objets Mathalea2d
  //  objets_enonceml.push()
  //  objets_correction.push()
  // paramètres pour la perspective
  mathalea.anglePerspective=30
  mathalea.coeffPerspective=0.5

  //paramètres de la fenêtre Mathalea2d pour l'énoncé main levée
      //    params_enonceml = { xmin: Math.min(objets_enonceml.x), ymin: Math.min(objets_enonceml.y), xmax: Math.max(objets_enonceml.x), ymax: Math.max(objets_enonceml.y), pixelsParCm: 20, scale: 1, mainlevee: true, amplitude: 1 }
  //paramètres de la fenêtre Mathalea2d pour l'énoncé normal
        params_enonce = { xmin:-10, ymin: -10, xmax: 10, ymax: 10, pixelsParCm: 20, scale: 1, mainlevee: false}
  //paramètres de la fenêtre Mathalea2d pour la correction
        params_correction = { xmin: -10, ymin: -10, xmax: 10, ymax: 10, pixelsParCm: 20, scale: 1 }
  // On ajoute au texte de l'énoncé, la figure à main levée et la figure de l'enoncé.
        texte += mathalea2d(params_enonce, objets_enonce)
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
  