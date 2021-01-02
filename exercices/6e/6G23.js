import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,creerNomDePolygone,tex_nombre} from "/modules/outils.js"
import {point,labelPoint,rotation,mathalea2d,afficheMesureAngle, demiDroiteAvecExtremite,cibleCouronne, texteParPoint,similitude} from "/modules/2d.js"
import { lettre_depuis_chiffre } from '../../modules/outils.js';
/**
 * Construire un angle
 * @Auteur Jean-Claude Lhote
 * Référence 6G23
 */
export default function Construire_un_angle() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Construire un angle de mesure donnée";
  this.consigne = "";
  this.nb_questions = 1;
  this.nb_questions_modifiable=false
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.sup=1;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

      let angle,anglerot,Apos,Bpos,Cpos
      if (this.sup==1) {
          angle = randint (1,17,9)*10
      } 
      else if (this.sup==2){
          angle = randint(3,34,18)*5
      }
      else {
          angle = randint(12,168,90)
      }
      let signe =choice([-1,1])
      angle=angle*signe
      anglerot=randint(0,360)
      let p = ['x',lettre_depuis_chiffre(randint(1,16)),'y'];
    let texte = `Construire l'angle $\\widehat{${p[0] + p[1] + p[2]}}$ de mesure $${tex_nombre(Math.abs(angle))}°$ en tournant dans le sens `
    if (angle<0) {
      texte+=`des aiguilles d'une montre.<br>`
    }
    else {
      texte+=`inverse des aiguilles d'une montre.<br>`
    }
      let A = point(0, 0);
      let B = point(5.5, 0);
      B=rotation(B,A,anglerot)
      Apos=texteParPoint(p[1],similitude(B,A,-90,0.1),'milieu')
      Bpos=texteParPoint(p[0],similitude(A,B,signe*90,0.1),'milieu')
      
      let s = demiDroiteAvecExtremite (A, B);
      s.epaisseur=2
      let C = rotation(B,A,angle);
      Cpos=texteParPoint(p[2],similitude(A,C,-signe*90,0.1),'milieu')

      let s2 = demiDroiteAvecExtremite(A, C);
      let labels=labelPoint(A,B)
      let labels2=labelPoint(A,B,C)
      let secteur=afficheMesureAngle(B,A,C)
      let texte_corr=``
      let cible=cibleCouronne({x:0,y:0,taille:4})
      let xMin=-6
      let xMax=6
      let yMin=-6
      let yMax=6
        mathalea.fenetreMathalea2d = [xMin, yMin, xMax, yMax]
      let objets_enonce=[s,labels,cible,Apos,Bpos]
      let objets_correction=[s,labels2,secteur,cible,s2,Apos,Bpos,Cpos]
        this.liste_questions.push(texte + mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 1 }, objets_enonce))
        this.liste_corrections.push(texte_corr+mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 1 }, objets_correction))
        liste_de_question_to_contenu(this)
  };
  this.besoin_formulaire_numerique = ['Précision de l\'angle',3,'1 : Angle à 10°\n2 : Angle à 5°\n3 : Angle à 1°'];
 // this.besoin_formulaire2_numerique = ['Niveau de difficulté',2,'1 : Construire un angle\n2 : Construire 2 anles'];
}

