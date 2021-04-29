import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,combinaison_listes,randint} from "../../modules/outils.js"
import {symetrieAnimee,rotationAnimee,translationAnimee,polygone,pointIntersectionDD,mathalea2d,point,milieu,pointSurSegment,droite,mediatrice,translation,similitude,rotation,pointAdistance,longueur,symetrieAxiale,vecteur,latexParPoint,tracePoint,labelPoint,polygoneAvecNom, renommePolygone} from "../../modules/2d.js"
import { nommePolygone } from '../../modules/2d.js';
import Alea2iep from "../../modules/Alea2iep.js";

export default function LeNomDeLaFonctionExercice() {
    "use strict"
    Exercice.call(this)
    this.titre = "Moule pour Liouba";
    this.nb_questions = 1; // Ici le nombre de questions (une seule pour cet exercice non modifiable)
    this.nb_questions_modifiable=false // désactive le formulaire nombre de questions
    this.nb_cols = 1; // Le nombre de colonnes dans l'énoncé LaTeX
    this.nb_cols_corr = 1;// Le nombre de colonne pour la correction LaTeX
    this.pas_de_version_LaTeX=false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
    this.pas_de_version_HMTL=false // mettre à true si on ne veut pas de l'exercice en ligne
    this.type_exercice = "IEP";
   // Voir la Classe Exercice pour une liste exhaustive des propriétés disponibles.
  
  //  this.sup = false; // A décommenter : valeur par défaut d'un premier paramètre
  //  this.sup2 = false; // A décommenter : valeur par défaut d'un deuxième paramètre
  //  this.sup3 = false; // A décommenter : valeur par défaut d'un troisième paramètre
  
  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
    this.nouvelle_version = function (numero_de_l_exercice) {
    // la variable numero_de_l_exercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page
  
    this.liste_questions = [] // tableau contenant la liste des questions 
    this.liste_corrections = []
  // Ci-dessus On crée une liste aléatoire comprenant nb_questions parmi les types disponibles.
  /* Un exemple ci-dessous : si la classe est 6, alors les types dispo sont 1 et 2 sinon , 1,2,3 et 4.
  if (this.classe == 6) type_de_questions_disponibles = [1, 2]
      else type_de_questions_disponibles = [1, 2, 3,4]
  liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions)
  */
  // boucle pour fabriquer les nb_questions questions en s'assurant que si il n'y a pas nb_questions différentes
  // La boucle s'arrête après 50 tentatives.
  
      let objets_enonce,objets_correction,params_enonce,params_correction
  
        objets_enonce = [] // on initialise le tableau des objets Mathalea2d de l'enoncé
        objets_correction = [] // Idem pour la correction
  

        let texte_corr = `` // Idem pour le texte de la correction.
        let largeur=20,hauteur=20
        let A,B,C,triangle,triangle0,O,M,X,Y,triangle1,A1,B1,C1,d1,AA1,triangle2,med,nomd,D,F,triangle3,triangle4,triangle5,traces,labels
        let xMin,xMax,yMin,yMax
        let bordure,alpha,beta
        let anim = new Alea2iep()
        /***************************************/
/********Ici on définit les objets 2d */
/*************************************/
while (largeur>16 && hauteur>16) {
    xMin=0;
    xMax=0;
    yMin=0;
    yMax=0;
A=point(0,0,'A')
B=pointAdistance(A,randint(40,60)/10,randint(70,100),'B')
C=similitude(B,A,randint(20,50),randint(8,12)/10,'C')
triangle0=polygone(A,B,C)
triangle=polygoneAvecNom(A,B,C)
//d0=droite(A,B)
O=pointSurSegment(B,A,2+longueur(A,B))
//d0.isVisible=false
beta=randint(-45,-20)
A1=rotation(A,O,beta,'A')
B1=rotation(B,O,beta,'B')
C1=rotation(C,O,beta,'C')
triangle1=polygone(A1,B1,C1)
renommePolygone(triangle1,['A_1','B_1','C_1'])
M=milieu(A,A1)
d1=droite(A1,B1)
AA1=droite(A,A1)
triangle2=symetrieAxiale(triangle1,d1)
renommePolygone(triangle2,['A_1','B_1','C_1'])
med=mediatrice(A,A1)
X=pointSurSegment(M,O,5)
Y=pointSurSegment(O,M,10)
D=similitude(B1,A1,randint(-40,-10),1.5,'D')
triangle3=rotation(triangle2,D,180)
renommePolygone(triangle3,['A_2','B_2','C_2'])
F=translation(D,vecteur(B,A),'F')
traces = tracePoint(D,F)
labels=labelPoint(D,F)
triangle4=translation(triangle3,vecteur(D,F))
renommePolygone(triangle4,['A_3','B_3','C_3'])
alpha=-randint(80,110)
triangle5=rotation(triangle4,F,alpha)
renommePolygone(triangle5,['A_4','B_4','C_4'])

for (let i =0; i<3; i++) {
xMin=Math.min(xMin,triangle0.listePoints[i].x,triangle1.listePoints[i].x,triangle2.listePoints[i].x,triangle3.listePoints[i].x,triangle4.listePoints[i].x,triangle5.listePoints[i].x)
xMax=Math.max(xMax,triangle0.listePoints[i].x,triangle1.listePoints[i].x,triangle2.listePoints[i].x,triangle3.listePoints[i].x,triangle4.listePoints[i].x,triangle5.listePoints[i].x)
yMin=Math.min(yMin,triangle0.listePoints[i].y,triangle1.listePoints[i].y,triangle2.listePoints[i].y,triangle3.listePoints[i].y,triangle4.listePoints[i].y,triangle5.listePoints[i].y)
yMax=Math.max(yMax,triangle0.listePoints[i].y,triangle1.listePoints[i].y,triangle2.listePoints[i].y,triangle3.listePoints[i].y,triangle4.listePoints[i].y,triangle5.listePoints[i].y)
}
xMax+=4
xMin--
yMin--
yMax++
largeur=xMax-xMin
hauteur=yMax-yMin

}

let texte = `Construire<br>$A_1B_1C_1$ le triangle symétrique de $ABC$ par rapport à la droite $(d)$;<br>` // Nous utilisons souvent cette variable pour construire le texte de la question.
texte += `$A_2B_2C_2$ le triangle symétrique de $A_1B_1C_1$ par rapport au point $D$;<br>`
texte += `$A_3B_3C_3$ le triangle translaté de $A_2B_2C_2$ tel que $D$ soit transformé en $F$;<br>`
texte += `$A_4B_4C_4$ le triangle obtenu par la rotation de $A_3B_3C_3$ de centre $F$ et d'angle $${Math.abs(alpha)}\\degree$ dans le sens des aiguilles d'une montre.<br>`

bordure=droite(point(xMin,yMin+2),point(xMax,yMin+2))
nomd=latexParPoint('(d)',translation(milieu(B,B1),vecteur(1,0)),'black',30,12,"")
let triangle2a=symetrieAnimee(triangle0,med,'begin="0s;8s;16s" dur ="2s" end="2s;10s;18s" repeatcount="indefinite" fill="freeze"')
let triangle3a=rotationAnimee(triangle2,D,180,'begin="2s;10s;18s" dur ="2s" end="4s;12s;20s" repeatcount="indefinte" fill="freeze"')
let triangle4a=translationAnimee(triangle3,vecteur(D,F),'begin="4s;12s;20s" dur ="2s" end="6s;14s;22s" repeatcount="indefinite" fill="freeze"')
let triangle5a=rotationAnimee(triangle4,F,alpha,'begin="6s;14s;22s" dur ="2s" end="8s;16s;24s" repeatcount="indefinte" fill="freeze"')
anim.vitesse=100
anim.tempo=0.2
anim.recadre(xMin,yMax)
anim.polygoneRapide(...triangle0.listePoints)
anim.pointsCreer(A,B,C,F,D)
anim.couleur='black'
anim.traitRapide(X,Y)
anim.textePoint('(d)',milieu(B,B1))
anim.symetrieAxialePolygone(triangle0,med,['A_1','B_1','C_1'],{couleur:'blue',couleurCodage:'lightblue'})
anim.demiTourPolygone(triangle2,D,['A_2','B_2','C_2'],{couleur:'red',couleurCodage:'pink'})
anim.translationPolygone(triangle3,D,F,['A_3','B_3','C_3'],{couleur:'brown',couleurCodage:'orange'})
anim.rotationPolygone(triangle4,F,alpha,['A_4','B_4','C_4'],{couleur:'green',couleurCodage:'lightgreen'})
anim.crayonMasquer()

mathalea.fenetreMathalea2d=[xMin,yMin,xMax,yMax]
   objets_enonce.push (triangle0,triangle[1],traces,labels,med,nomd) // On rempli les tableaux d'objets Mathalea2d
  objets_correction.push(triangle0,triangle[1],traces,labels,med,nomd,triangle2,nommePolygone(triangle2),triangle3,nommePolygone(triangle3),triangle4,nommePolygone(triangle4),triangle5,nommePolygone(triangle5),triangle2a,triangle3a,triangle4a,triangle5a)
  
  //paramètres de la fenêtre Mathalea2d pour l'énoncé main levée
    //    params_enonceml = { xmin: Math.min(objets_enonceml.x), ymin: Math.min(objets_enonceml.y), xmax: Math.max(objets_enonceml.x), ymax: Math.max(objets_enonceml.y), pixelsParCm: 20, scale: 1, mainlevee: true, amplitude: 1 }
  //paramètres de la fenêtre Mathalea2d pour l'énoncé normal
        params_enonce = { xmin:xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 1, mainlevee: false}
  //paramètres de la fenêtre Mathalea2d pour la correction
        params_correction = {xmin:xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 1 }
  // On ajoute au texte de l'énoncé, la figure à main levée et la figure de l'enoncé.
        texte += mathalea2d(params_enonce, objets_enonce)
  // On ajoute au texte de la correction, la figure de la correction
        texte_corr += mathalea2d(params_correction, objets_correction)
        texte_corr += anim.htmlBouton(numero_de_l_exercice)
        this.liste_questions.push(texte)
        this.liste_corrections.push(texte_corr)
        liste_de_question_to_contenu(this); // On envoie l'exercice à la fonction de mise en page
    };
  // Si les variables suivantes sont définies, elles provoquent l'affichage des formulaires des paramètres correspondants
  // Il peuvent être de 3 types : _numerique, _case_a_cocher ou _texte.
  // Il sont associés respectivement aux paramètres sup, sup2 et sup3.
  
  //	this.besoin_formulaire_numerique = ['Type de questions', 3, `1 : Perpendiculaires\n 2 : Parallèles\n 3 : Mélange`]
  //  this.besoin_formulaire2_numerique = ["Type de cahier",3,`1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`];
  // this.besoin_formulaire3_case_a_cocher =['figure à main levée',true]
  
  } // Fin de l'exercice.
  