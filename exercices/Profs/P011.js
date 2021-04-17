import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,combinaison_listes} from "/modules/outils.js"
import {mathalea2d,polygoneAvecNom,codeSegments,codageAngleDroit,afficheMesureAngle,codeAngle,afficheLongueurSegment} from "/modules/2d.js"
import Alea2iep from '/modules/Alea2iep.js';

export default function Exercice_zero_mathalea2d() {
    "use strict"
    Exercice.call(this)
    this.titre = "Construis mon triangle";
    this.nb_questions = 1; // Ici le nombre de questions
    this.nb_questions_modifiable=false // Active le formulaire nombre de questions
    this.nb_cols = 1; // Le nombre de colonnes dans l'énoncé LaTeX
    this.nb_cols_corr = 1;// Le nombre de colonne pour la correction LaTeX
    this.pas_de_version_LaTeX=true // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
    this.pas_de_version_HMTL=false // mettre à true si on ne veut pas de l'exercice en ligne
    this.sup=1;
    this.sup2='ABC'
    this.sup3='3 4 5'
    this.type_exercice = 'IEP'
  
    this.nouvelle_version = function () {
      let params=this.sup3.split(' ');
      let type=parseInt(this.sup);
      let nom=this.sup2;
      let anim=new Alea2iep();
      let triangle
      let objets_enonceml=[]
      for (let i=0;i<params.length;i++){
        params[i]=parseFloat(params[i])
      }
      switch (type) { // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
          case 1:
            
            triangle=anim.triangle3longueurs(nom, params[0], params[1], params[2], true, true) 
            objets_enonceml.push(afficheLongueurSegment(triangle[1],triangle[0]),afficheLongueurSegment(triangle[2],triangle[1]),afficheLongueurSegment(triangle[0],triangle[2]))
          break;
  
          case 2:
            triangle=anim.triangle1longueur2angles(nom, params[0], params[1], params[2], true, true)
            objets_enonceml.push(afficheLongueurSegment(triangle[1],triangle[0]),afficheMesureAngle(triangle[2],triangle[0],triangle[1]),afficheMesureAngle(triangle[0],triangle[1],triangle[2]))
 
          break
  
          case 3:
            triangle=anim.triangleRectangle2Cotes(nom, params[0], params[1], true)
            objets_enonceml.push(afficheLongueurSegment(triangle[1],triangle[0]),afficheLongueurSegment(triangle[2],triangle[1]),codageAngleDroit(triangle[0],triangle[1],triangle[2]))
          break
            
          case 4:
            triangle=anim.triangleRectangleCoteHypotenuse(nom, params[0], params[1], true)
            objets_enonceml.push(afficheLongueurSegment(triangle[1],triangle[0]),afficheLongueurSegment(triangle[0],triangle[2]),codageAngleDroit(triangle[0],triangle[1],triangle[2]))
            break  

          case 5:
            triangle=anim.triangleEquilateral(nom, params[0], true)
          objets_enonceml.push(afficheLongueurSegment(triangle[1],triangle[0]),codeSegments('||','red',triangle[0],triangle[1],triangle[2],triangle[0],triangle[1],triangle[2]))
            break

            case 6:
              triangle=anim.triangle2longueurs1angle(nom,params[0],params[1],params[2],true)
              objets_enonceml.push(afficheLongueurSegment(triangle[0],triangle[1]),afficheLongueurSegment(triangle[0],triangle[2]),afficheMesureAngle(triangle[1],triangle[0],triangle[2]))
          break
            
        }
        let poly=polygoneAvecNom(triangle)
        objets_enonceml.push(poly[0],poly[1])
        let params_enonce = { xmin:Math.min(triangle[0].x-1,triangle[1].x-1,triangle[2].x-1),
           ymin: Math.min(triangle[0].y-1,triangle[1].y-1,triangle[2].y-1),
            xmax: Math.max(triangle[0].x+1,triangle[1].x+1,triangle[2].x+1),
             ymax: Math.max(triangle[0].y+1,triangle[1].y+1,triangle[2].y+1),
              pixelsParCm: 20, scale: 1, mainlevee: true,amplitude:0.5}
        let texte = mathalea2d(params_enonce, objets_enonceml)+'<br>'+anim.htmlBouton()
        this.contenu=texte;
    }
  this.besoin_formulaire_numerique = ['Type de triangle', 6, `1 : Triangle par 3 longueurs\n 2 : Triangle par 1 longueur et 2 angles\n 3 : Triangle rectangle 2 côtés angle droit\n 4 : Triangle rectangle 1 coté et l'hypoténuse\n 5 : Triangle équilatéral\n 6 : Triangle 2 longueurs et l'angle entre ces côtés`]
  this.besoin_formulaire2_texte = ["Nom du triangle",`ABC par exemple`];
  this.besoin_formulaire3_texte =['paramètres séparés par des espaces','3 4 5']
  
  } // Fin de l'exercice.
  