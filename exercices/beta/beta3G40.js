import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes} from "/modules/outils.js"
import {mathalea2d,tracePoint,labelPoint} from "/modules/2d.js"
import {point3d,droite3d,vecteur3d,arete3d,sphere3d,rotation3d,rotationV3d,demicercle3d,cercle3d} from "/modules/3d.js"

export default function ReperageSurLaSphere() {
    "use strict"
    Exercice.call(this)
    this.titre = "Repérage sur la sphère";
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
    let type_de_questions_disponibles=['donnercoords','placerpoint','donnerantipode']
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions)
   liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions)
      let objets_enonce,objets_correction,params_enonce,params_correction
      let O=point3d(0,0,0,false,'O')
      let M=point3d(10,0,0,true,'M')
      let PoleNord=point3d(0,0,10,false,'N')
      let PoleSud=point3d(0,0,-10,false,'S')

      let Axe=arete3d(PoleSud,PoleNord)
      Axe.p2d.epaisseur=2
      Axe.p2d.color='blue'
      let normalV=vecteur3d(0,0,1)
      M=rotationV3d(M,normalV,mathalea.anglePerspective)
      let R=vecteur3d(O,M)
      let origine=rotation3d(point3d(0,-10,0),droite3d(O,normalV),mathalea.anglePerspective)
      let normalH=rotationV3d(vecteur3d(O,origine),normalV,90)
      let Sph=sphere3d(O,10,8,9)
          
      let latitudes=[],longitudes=[],P,Q
      for (let i=0;i<this.nb_questions;i++){
        latitudes.push(0)
        longitudes.push(0)
      }
      for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
        objets_enonce = [] // on initialise le tableau des objets Mathalea2d de l'enoncé
        objets_correction = [] // Idem pour la correction
       
        latitudes[i]=randint(-3,6,0)*10
        longitudes[i]=randint(-6,4)*10
        P=rotation3d(origine,droite3d(O,normalH),-latitude)
        Q=rotation3d(P,droite3d(O,normalV),longitude)
        Q.visible=true
        Q.p2d.nom='P'
        let H=point3d(0,0,Q.z3d,false,'H')
        let HQ=arete3d(H,Q)
        let equateur1=demicercle3d(O,normalV,R,'visible','red',0)
        let equateur2=demicercle3d(O,normalV,R,'caché','red',0)
        let greenwitch=demicercle3d(O,normalH,vecteur3d(0,0,-10),'visible','green',0)
        greenwitch.epaisseur=3
        greenwitch.opacite=0.3
        equateur1.epaisseur=3
        equateur2.epaisseur=3
        objets_enonce.push(Sph,Axe.p2d,HQ.p2d,equateur1,equateur2,greenwitch,tracePoint(Q.p2d),labelPoint(Q.p2d),normalH.representant(O),vecteur3d(O,origine).representant(O))
        objets_correction.push(Sph,Axe.p2d,HQ.p2d,equateur1,equateur2,greenwitch,tracePoint(Q.p2d))
        texte = `les coordonnées GPS de P sont ${longitude} ; ${latitude}` // Nous utilisons souvent cette variable pour construire le texte de la question.
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
        params_enonce = { xmin:-12, ymin: -12, xmax: 12, ymax: 12, pixelsParCm: 20, scale: 1, mainlevee: false}
  //paramètres de la fenêtre Mathalea2d pour la correction
        params_correction = { xmin: -12, ymin: -12, xmax: 12, ymax: 12, pixelsParCm: 20, scale: 1 }
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
  