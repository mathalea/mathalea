import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,lettre_depuis_chiffre,shuffle2tableaux,tex_nombre2} from "/modules/outils.js"
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
  this.QCM_disponible=true
  this.ModeQCM=false

  this.nouvelle_version = function () {
    this.QCM=['6G23-1',[],"Estimer la mesure d'un angle.",1]
    let tabrep,tabicone
    let espace =``;
    if (sortie_html) {
      espace = `&emsp;`;
    } else {
      espace = `\\qquad`;
    }
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

      let angle,anglerot,Apos,Bpos,Cpos,p,texte,texte_corr,A,B,C,s2,s1,bis,signes=[]
      let labels,secteur,xMin,xMax,yMin,yMax,objets_enonce,objets_correction,secteur0

      for (let i=0;i<this.nb_questions;i++){
        signes.push(choice([-1,1]))
      if (this.sup==1) {
          angle = randint (2,16,9)*10
      } 
      else if (this.sup==2){
          angle = randint(4,32,18)*5
      }
      else {
          angle = randint(20,160,90)
      }
      tabrep=[`$${angle}\\degree$`,`$${180-angle}\\degree$`,`$${angle/2}\\degree$`,`$${Math.round((180+angle)/2)}\\degree$`,`$180\\degree$`,`$90\\degree$`]
      tabicone=[1,0,0,0,0,0]
      anglerot=randint(-180,180)
      angle=signes[i]*angle
      p = [choice(['x','y','z','t']),lettre_depuis_chiffre(randint(1,16)),choice(['s','u','v','w'])];
   if (this.ModeQCM) {
    texte = `Estime la mesure de l'angle $\\widehat{${p[0] + p[1] + p[2]}}$ sans instrument.<br>`
   } 
   else {
     texte = `Mesure l'angle $\\widehat{${p[0] + p[1] + p[2]}}$.<br>`
   }
      A = point(0, 0);
      B = point(6, 0);
      B=rotation(B,A,anglerot)

      // texte, A, orientation = "milieu", color = 'black', scale = 1, ancrageDeRotation = "middle", math_on = false
      Bpos=texteParPoint(p[0],similitude(A,homothetie(B,A,0.95),signes[i]*90,0.1),'milieu','black',1,"middle", true)  
      s1 = demiDroite (A, B);
      C = rotation(B,A,angle);
      bis=rotation(B,A,angle/2)
      Apos=texteParPoint(p[1],pointSurSegment(A,bis,-0.5),'milieu','black',1,"middle", true)
      Cpos=texteParPoint(p[2],similitude(A,homothetie(C,A,0.95),-signes[i]*90,0.1),'milieu','black',1,"middle", true)
      s2 = demiDroite(A, C);
      labels=labelPoint(A,B,C)
      secteur=afficheMesureAngle(B,A,C)
      secteur0=afficheMesureAngle(B,A,C,'black',1.5," ")
      texte_corr=``
      xMin=Math.min(A.x,C.x,B.x)-1
      xMax=Math.max(A.x,C.x,B.x)+1
      yMin=Math.min(A.y,C.y,B.y)-1
      yMax=Math.max(A.y,C.y,B.y)+1
        mathalea.fenetreMathalea2d = [xMin, yMin, xMax, yMax]
      objets_enonce=[s1,s2,labels,Apos,Bpos,Cpos,secteur0]
      objets_correction=[s1,s2,labels,Apos,Bpos,Cpos,secteur]
      texte+=mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 0.8 }, objets_enonce)
      texte_corr+=mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 0.7 }, objets_correction)
   /**********************************************/
   //Ajout pour AMC
      this.QCM[1].push([`${texte}\\\\ \n Réponses possibles : `,
      tabrep,
      tabicone]) 
   /********************************************/
      if (this.ModeQCM&&!mathalea.sortieAMC) {
        texte+=`<br>  Réponses possibles : ${espace}  `
        texte_corr=''
        shuffle2tableaux(tabrep, tabicone);
        for (let i=0; i<tabrep.length; i++) {
          texte += `$\\square\\;$ ${tabrep[i]} ` + espace ;
         if (tabicone[i]==1) {
           texte_corr += `$\\blacksquare\\;$ ${tabrep[i]} ` + espace ;
         } else {
           texte_corr += `$\\square\\;$ ${tabrep[i]}` + espace ;
         }
       }
      }
      this.liste_questions.push(texte)
      this.liste_corrections.push(texte_corr)
  }
        liste_de_question_to_contenu(this)
  };
  this.besoin_formulaire_numerique = ['Précision de l\'angle',3,'1 : Angle à 10°\n2 : Angle à 5°\n3 : Angle à 1°'];
}

