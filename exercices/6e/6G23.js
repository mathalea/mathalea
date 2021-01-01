import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,calcul,lettre_depuis_chiffre,creerNomDePolygone,tex_nombre} from "/modules/outils.js"
import {point,labelPoint,segmentAvecExtremites,rotation,mathalea2d} from "/modules/2d.js"
import { cibleCarree, dansLaCibleCarree ,cercleCentrePoint, afficheMesureAngle} from '../../modules/2d.js';
/**
 * Construire un angle
 * @Auteur Jean-Claude Lhote
 * Référence 6G23
 */
export default function Construire_un_angle() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Construire un angle de mesure donnée";
  this.consigne = "";
  this.nb_questions = 3;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.sup=1;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

      let c = calcul(randint(30, 70) / 10);
      let angle
      if (this.sup==1) {
          angle = randint (2,13,9)*10
      } 
      else if (this.sup==2){
          angle = randint(3,26,18)*5
      }
      else {
          angle = randint(20,130,90)
      }

      let p = creerNomDePolygone(3,'Q');
    let texte = `Construire l'angle $\\widehat{${p[1] + p[0] + p[2]}}$ de mesure $${tex_nombre(angle)}°$.<br>C est sur le cercle de centre ${p[0]} passant par ${p[1]}.<br>`
      let A = point(0, 0, p[0], "left");
      let B = point(c, 0, p[1], "right");
      let s = segmentAvecExtremites(A, B);
      s.epaisseur=2
      let C = rotation(B,A,angle,p[2],'left');
      let s2 = segmentAvecExtremites(A, C);
      let labels=labelPoint(A,B)
      let labels2=labelPoint(A,B,C)
      let secteur=afficheMesureAngle(B,A,C)
      let celluleAlea = function () {
        let lettre = lettre_depuis_chiffre(randint(2,7))
        let chiffre = Number(randint(2, 7)).toString()
        return lettre + chiffre
      }
      let rond=cercleCentrePoint(A,B)
      rond.pointilles=3
      let cellule=celluleAlea()
      let texte_corr=`Le point ${p[2]} doit être situé dans la cellule ${cellule} comme sur la figure ci-dessous.<br>`
        let result=dansLaCibleCarree(C.x,C.y,8,0.7,cellule)
      let cible=cibleCarree({x:result[0],y:result[1],rang:8,taille:0.7})
      let xMin=Math.min(A.x,C.x)-6
      let xMax=B.x+6
      let yMin=-3
      let yMax=C.y+6
        mathalea.fenetreMathalea2d = [xMin, yMin, xMax, yMax]
      let objets_enonce=[s,rond,labels,cible]
      let objets_correction=[s,rond,labels2,secteur,cible,s2]
        this.liste_questions.push(texte + mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 1 }, objets_enonce))
        this.liste_corrections.push(texte_corr+mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 1 }, objets_correction))
        liste_de_question_to_contenu(this)
  };
  this.besoin_formulaire_numerique = ['Précision de l\'angle',3,'1 : Angle à 10°\n2 : Angle à 5°\n3 : Angle à 1°'];
 // this.besoin_formulaire2_numerique = ['Niveau de difficulté',2,'1 : Construire un angle\n2 : Construire 2 anles'];
}

