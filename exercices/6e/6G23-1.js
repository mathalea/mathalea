import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,lettre_depuis_chiffre} from "/modules/outils.js"
import {point,labelPoint,rotation,mathalea2d,afficheMesureAngle,homothetie,demiDroite,texteParPoint,similitude,bissectrice,pointSurSegment} from "/modules/2d.js"

/**
 * Construire un angle
 * @Auteur Jean-Claude Lhote
 * Référence 6G23
 */
export default function Mesurer_un_angle() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Mesurer un angle";
  this.consigne = "";
  this.nb_questions = 2;
  this.nb_questions_modifiable=true
  this.nb_cols = 2;
  this.nb_cols_corr = 2;
  this.sup=1;
  this.video="TEzu9uky56M"

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

      let angle,anglerot,Apos,Bpos,Cpos,p,texte,texte_corr,A,B,C,s2,s1,bis,signes=[]
      let labels,secteur,xMin,xMax,yMin,yMax,objets_enonce,objets_correction

      for (let i=0;i<this.nb_questions;i++){
        signes.push(choice([-1,1]))
      if (this.sup==1) {
          angle = randint (1,17,9)*10
      } 
      else if (this.sup==2){
          angle = randint(3,34,18)*5
      }
      else {
          angle = randint(12,168,90)
      }
      anglerot=randint(-180,180)
      angle=signes[i]*angle
      p = [choice(['x','y','z','t']),lettre_depuis_chiffre(randint(1,16)),choice(['s','u','v','w'])];
    texte = `Mesure l'angle $\\widehat{${p[0] + p[1] + p[2]}}$.<br>`
      A = point(0, 0);
      B = point(6, 0);
      B=rotation(B,A,anglerot)

      Bpos=texteParPoint(p[0],similitude(A,homothetie(B,A,0.95),signes[i]*90,0.1),'milieu')
      s1 = demiDroite (A, B);
      C = rotation(B,A,angle);
      bis=rotation(B,A,angle/2)
      Apos=texteParPoint(p[1],pointSurSegment(A,bis,-0.5),'milieu')
      Cpos=texteParPoint(p[2],similitude(A,homothetie(C,A,0.95),-signes[i]*90,0.1),'milieu')
      s2 = demiDroite(A, C);
      labels=labelPoint(A,B,C)
      secteur=afficheMesureAngle(B,A,C)
      texte_corr=``
      xMin=Math.min(A.x,C.x,B.x)-1
      xMax=Math.max(A.x,C.x,B.x)+1
      yMin=Math.min(A.y,C.y,B.y)-1
      yMax=Math.max(A.y,C.y,B.y)+1
        mathalea.fenetreMathalea2d = [xMin, yMin, xMax, yMax]
      objets_enonce=[s1,s2,labels,Apos,Bpos,Cpos]
      objets_correction=[s1,s2,labels,Apos,Bpos,Cpos,secteur]
      texte+=mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 0.8 }, objets_enonce)
      texte_corr+=mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 0.7 }, objets_correction)
      this.liste_questions.push(texte)
      this.liste_corrections.push(texte_corr)
  }
        liste_de_question_to_contenu(this)
  };
  this.besoin_formulaire_numerique = ['Précision de l\'angle',3,'1 : Angle à 10°\n2 : Angle à 5°\n3 : Angle à 1°'];
}

