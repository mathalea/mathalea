import { longueur, segment, mathalea2d, afficheLongueurSegment, afficheCoteSegment, codageAngleDroit, pointSurSegment, polygoneAvecNom, triangle2points1hauteur, point, rotation } from '../../modules/2d.js';
import {  combinaison_listes_sans_changer_ordre, creerNomDePolygone } from '../../modules/outils.js';
import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,shuffle,tex_nombre,calcul} from "/modules/outils.js"


/**
 * Calculer l'aire de 3 triangles dont une hauteur est tracée.
 *
 * Une figure dynamique est disponible sur laquelle on peut déplacer le pied de la hauteur.
 *
 * @Auteur Rémi Angot conversion mathalea2d Jean-Claude Lhote
 * Référence 6M20
 */
export default function Aire_de_triangles() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Aires de triangles";
  this.consigne =
    "Calculer l'aire des 3 triangles suivants.";
  this.spacing = 2;
  sortie_html ? (this.spacing_corr = 3) : (this.spacing_corr = 2);
  this.nb_questions = 3;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;

  this.nb_questions_modifiable = false;
  this.correction_detaillee_disponible=true;
  this.correction_detaillee=false

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_corrections = []; // Liste de questions corrigées
    this.liste_questions = [];
    let tableau_des_cotes = shuffle([ 5, 6, 7, 8, 9]); //pour s'assurer que les 3 côtés sont différents
    let tableau_des_hauteurs = shuffle([3, 4, 5, 6]); //pour s'assurer que les 3 hauteurs sont différents
    let cotes = combinaison_listes_sans_changer_ordre(tableau_des_cotes,this.nb_questions);
    let hauteurs = combinaison_listes_sans_changer_ordre(tableau_des_hauteurs,this.nb_questions)
    let triH,A=point(0,0),B,C,H,triangle,nom,polynom,hauteurpoly,d
    let objets_enonce=[],objets_correction=[],xmin,xmax,ymin,ymax
    let texte="",texte_corr=""

    nom=creerNomDePolygone(4*this.nb_questions,'Q')
 
    for (let i=0;i<this.nb_questions;i++){
        objets_enonce.length=0
        objets_correction.length=0
            A.nom=nom[i*4]
        B=rotation(point(cotes[i],0),A,randint(-60,60),nom[i*4+1])
        if (i%3==2){
            d=longueur(A,B)+randint(6,9)/3
        }
        else {
            d=calcul(randint(6,longueur(A,B)*10-6)/10)
        }
        triH=triangle2points1hauteur(A,B,hauteurs[i],d,2)
        H=triH.pied
        H.nom=nom[i*4+3]
        triangle=triH.triangle
        C=triangle.listePoints[2]
        C.nom=nom[i*4+2]
        polynom=polygoneAvecNom(A,H,B,C)
        hauteurpoly=segment(C,H)
        hauteurpoly.pointilles=2
        xmin=Math.min(A.x,B.x,C.x,H.x)-1.5
        xmax=Math.max(A.x,B.x,C.x,H.x)+1.5
        ymin=Math.min(A.y,B.y,C.y,H.y)-2
        ymax=Math.max(A.y,B.y,C.y,H.y)+1.5
        objets_enonce.push(polynom[0],polynom[1],hauteurpoly,afficheCoteSegment(segment(B,A),"",1),afficheLongueurSegment(A,C,'black',0.5),afficheLongueurSegment(C,B,'black',0.5),afficheLongueurSegment(C,H,'black',0.3),codageAngleDroit(A,H,C))
        objets_correction.push(polynom[0],polynom[1],hauteurpoly,afficheCoteSegment(segment(B,A),"",1),afficheLongueurSegment(C,H,'black',0.3),codageAngleDroit(A,H,C))
        texte=mathalea2d({xmin:xmin,xmax:xmax,ymin:ymin,ymax:ymax,pixelsParCm:20,scale:0.5,mainlevee:false},objets_enonce)+'<br>'
   if (this.correction_detaillee) {texte_corr = mathalea2d({xmin:xmin,xmax:xmax,ymin:ymin,ymax:ymax,pixelsParCm:20,scale:0.5,mainlevee:false},objets_correction)+'<br>'}
   else texte_corr="";
   texte_corr+=`$\\mathcal{A}_{${A.nom}${B.nom}${C.nom}}=\\dfrac{1}{2}\\times ${A.nom}${B.nom}\\times ${H.nom}${C.nom}=\\dfrac{1}{2}\\times${cotes[i]}~\\text{cm}\\times ${hauteurs[i]}~\\text{cm}=${tex_nombre(
      Algebrite.eval((cotes[i] * hauteurs[i]) / 2)
    )}~\\text{cm}^2$`;
     
    this.liste_questions.push(texte)
    this.liste_corrections.push(texte_corr);
    }
    liste_de_question_to_contenu(this);
  };
}
