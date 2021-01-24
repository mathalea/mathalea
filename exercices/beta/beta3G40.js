import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choisit_lettres_differentes} from "/modules/outils.js"
import {mathalea2d,tracePoint,labelPoint} from "/modules/2d.js"
import {point3d,droite3d,vecteur3d,arete3d,sphere3d,rotation3d,rotationV3d,demicercle3d} from "/modules/3d.js"

export default function ReperageSurLaSphere() {
    "use strict"
    Exercice.call(this)
    this.titre = "Repérage sur la sphère";
    this.nb_questions = 4;
    this.nb_questions_modifiable=true
    this.nb_cols = 1;
    this.nb_cols_corr = 1;
    this.pas_de_version_LaTeX=false
    this.pas_de_version_HMTL=false
    this.video=''
  
  //  this.sup = false; // A décommenter : valeur par défaut d'un premier paramètre
  //  this.sup2 = false; // A décommenter : valeur par défaut d'un deuxième paramètre


    this.nouvelle_version = function (){
    this.liste_questions = [] // tableau contenant la liste des questions 
    this.liste_corrections = []
      this.contenu=''
      this.contenu_correction=''
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
      let equateur1=demicercle3d(O,normalV,R,'visible','red',0)
      let equateur2=demicercle3d(O,normalV,R,'caché','red',0)
      let greenwitch=demicercle3d(O,normalH,vecteur3d(0,0,-10),'visible','green',0)
      greenwitch.epaisseur=3
      greenwitch.opacite=0.3
      equateur1.epaisseur=3
      equateur2.epaisseur=3
      let objets_enonce = [],params_enonce // on initialise le tableau des objets Mathalea2d de l'enoncé
    //  let objets_correction = [] // Idem pour la correction
      let latitudes=[],longitudes=[],P=[],EstouOuest=[],NordouSud=[],nom=[]
      objets_enonce.push(Sph,Axe.p2d,equateur1,equateur2,greenwitch)
 //     objets_correction.push(Sph,Axe.p2d,equateur1,equateur2,greenwitch)
      for (let i=0;i<this.nb_questions;i++){
        latitudes.push(0)
        longitudes.push(0)
        P.push(point3d(0,0,0))
        EstouOuest.push('O')
        NordouSud.push('N')
      }
      nom=choisit_lettres_differentes(this.nb_questions,'Q')
      this.contenu=`Quelles sont les coordonnées des points `
      for (let i = 0, latitude,longitude,M,OP,lab,croix; i < this.nb_questions;) {

       
        latitude=randint(-3,6,0)*10
        longitude=randint(-6,4)*10
        while (latitudes.indexOf(latitude)!=-1&&longitudes.indexOf(longitude)!=-1) {
          latitude=randint(-3,6,0)*10
          longitude=randint(-6,4)*10
        }
        latitudes[i]=latitude
        longitudes[i]=longitude
        if (longitudes[i]<0) EstouOuest[i]='O'
        else EstouOuest[i]='E'
        if (latitudes[i]<0) NordouSud[i]='S'
        else NordouSud[i]='N'
        M=rotation3d(origine,droite3d(O,normalH),-latitudes[i])
        P[i]=rotation3d(M,droite3d(O,normalV),longitudes[i])
        P[i].visible=true
        P[i].p2d.nom=`${nom[i]}`
        P[i].p2d.positionLabel='above left'
        OP=arete3d(O,P[i])
        lab=labelPoint(P[i].p2d)
        lab.color='blue'
        lab.taille=2
        croix=tracePoint(P[i].p2d)
        croix.taille=2.5
        croix.epaisseur=2
        croix.color='blue'
        croix.style='o'

        if (i<this.nb_questions-1) this.contenu += `$${nom[i]}$, `
        else this.contenu+= `$${nom[i]}$.`
       this.contenu_correction+=`Les coordonnées de $${nom[i]}$ sont $${Math.abs(longitudes[i])}\\degree ${EstouOuest[i]}$ ; $${Math.abs(latitudes[i])}\\degree ${NordouSud[i]}$.<br>` 
         objets_enonce.push(croix,lab)
         i++
       //   objets_correction.push(OP.p2d,tracePoint(P[i].p2d),labelPoint(P[i].p2d))
      }
        // paramètres pour la perspective
  mathalea.anglePerspective=30
  mathalea.coeffPerspective=0.5
      params_enonce = { xmin:-12, ymin: -12, xmax: 12, ymax: 12, pixelsParCm: 20, scale: 1, mainlevee: false}

     // texte_corr += mathalea2d(params_correction, objets_correction)
      this.contenu +='<br>'+ mathalea2d(params_enonce, objets_enonce)
    };
  
  //	this.besoin_formulaire_numerique = ['Type de questions', 3, `1 : Perpendiculaires\n 2 : Parallèles\n 3 : Mélange`]
  //  this.besoin_formulaire2_numerique = ["Type de cahier",3,`1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`];
  // this.besoin_formulaire3_case_a_cocher =['figure à main levée',true]
  
  } // Fin de l'exercice.
  