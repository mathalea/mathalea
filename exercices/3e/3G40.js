import Exercice from '../ClasseExercice.js';
import {num_alpha,combinaison_listes,randint,choisit_lettres_differentes} from "/modules/outils.js"
import {mathalea2d,tracePoint,labelPoint} from "/modules/2d.js"
import {point3d,droite3d,vecteur3d,arete3d,sphere3d,rotation3d,rotationV3d,demicercle3d} from "/modules/3d.js"
import { sens_de_rotation3d } from '/modules/3d.js';

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
    this.sup=3;
  
  //  this.sup = false; // A décommenter : valeur par défaut d'un premier paramètre
  //  this.sup2 = false; // A décommenter : valeur par défaut d'un deuxième paramètre


    this.nouvelle_version = function (){
    this.liste_questions = [] // tableau contenant la liste des questions 
    this.liste_corrections = []
    let liste_type_de_questions=[]
    if (this.sup==1) liste_type_de_questions=combinaison_listes([1],this.nb_questions)
    else if (this.sup==2) liste_type_de_questions=combinaison_listes([2],this.nb_questions)
    else liste_type_de_questions=combinaison_listes([1,2],this.nb_questions)
      this.contenu=''
      this.contenu_correction=''
      let O=point3d(0,0,0,false,'O')
      let M=point3d(10,0,0,true,'M')
      let PoleNord=point3d(0,0,11,false,'N')
      let PoleSud=point3d(0,0,-11,false,'S')
      PoleNord.p2d.positionLabel='above'
      let Pn=labelPoint(PoleNord.p2d)
      PoleSud.p2d.positionLabel='below'
      let Ps=labelPoint(PoleSud.p2d)
      Pn.taille=3
      Ps.taille=3
      Pn.color='brown'
      Ps.color='brown'

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
      let rotationTerre=sens_de_rotation3d(droite3d(O,normalV),vecteur3d(8,-8,0),60,3,'purple')
      greenwitch.epaisseur=4
      greenwitch.opacite=1
      equateur1.epaisseur=3
      equateur2.epaisseur=3
      let objets_enonce = [],params_enonce,objets_correction=[]// on initialise les tableaux des objets Mathalea2d
      let latitudes=[],longitudes=[],P=[],EstouOuest=[],NordouSud=[],nom=[],E,W
      E=labelPoint(point3d(13.2,0,0,true,'E').p2d)
      E.taille=3
      E.color='brown'
      W=labelPoint(point3d(-12,0,0,true,'O').p2d)
      W.taille=3
      W.color='brown'      
      objets_enonce.push(Sph,Axe.p2d,equateur1,equateur2,greenwitch,Pn,Ps,rotationTerre,E,W)
      objets_correction.push(Sph,Axe.p2d,equateur1,equateur2,greenwitch,Pn,Ps,rotationTerre,E,W)
      for (let i=0;i<this.nb_questions;i++){
        latitudes.push(0)
        longitudes.push(0)
        P.push(point3d(0,0,0))
        EstouOuest.push('O')
        NordouSud.push('N')
      }
      nom=choisit_lettres_differentes(this.nb_questions,'Q')
      this.contenu=``
      for (let i = 0, latitude,longitude,M,lab,croix; i < this.nb_questions;) {
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
        lab=labelPoint(P[i].p2d)
        lab.color='blue'
        lab.taille=2
        croix=tracePoint(P[i].p2d)
        croix.taille=2.5
        croix.epaisseur=2
        croix.color='blue'
        croix.style='o'
        switch (liste_type_de_questions[i]) {
          case 1:
            this.contenu +=`${num_alpha(i)} Donner les coordonnées GPS du point $${nom[i]}$.<br>`
            this.contenu_correction+=`${num_alpha(i)} Les coordonnées de $${nom[i]}$ sont $(${Math.abs(longitudes[i])}\\degree$${EstouOuest[i]} ; $${Math.abs(latitudes[i])}\\degree$${NordouSud[i]}) ou $(${longitudes[i]}\\degree$ ; $${latitudes[i]}\\degree )$.<br>` 
            objets_enonce.push(croix,lab)
            objets_correction.push(croix,lab)
            break
          case 2:
            this.contenu +=`${num_alpha(i)} Placer le point $${nom[i]}$ de  coordonnées GPS $(${Math.abs(longitudes[i])}\\degree$${EstouOuest[i]} ; $${Math.abs(latitudes[i])}\\degree$${NordouSud[i]}) ou $(${longitudes[i]}\\degree$ ; $${latitudes[i]}\\degree )$.<br>`
            this.contenu_correction+=`${num_alpha(i)} Le point $${nom[i]}$ de coordonnées GPS $(${Math.abs(longitudes[i])}\\degree$${EstouOuest[i]} ; $${Math.abs(latitudes[i])}\\degree$${NordouSud[i]}) ou $(${longitudes[i]}\\degree$ ; $${latitudes[i]}\\degree )$ est placé sur cette sphère.<br>` 
            objets_correction.push(croix,lab)
          break
        }
        i++
      }
        // paramètres pour la perspective
  mathalea.anglePerspective=30
  mathalea.coeffPerspective=0.5
      params_enonce = { xmin:-13, ymin: -13, xmax: 14, ymax: 13, pixelsParCm: 20, scale: 1, mainlevee: false}

     // texte_corr += mathalea2d(params_correction, objets_correction)
      this.contenu +='<br>'+ mathalea2d(params_enonce, objets_enonce)
      this.contenu_correction +='<br>'+ mathalea2d(params_enonce, objets_correction)
    };
  
  this.besoin_formulaire_numerique = ['Type de questions', 3, `1 : Lire des coordonnées\n 2 : Placer des points\n 3 : Mélange`]
  //  this.besoin_formulaire2_numerique = ["Type de cahier",3,`1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`];
  // this.besoin_formulaire3_case_a_cocher =['figure à main levée',true]
  
  } // Fin de l'exercice.
  