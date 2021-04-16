import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,egal,randint,shuffle,nombre_avec_espace,texcolors} from "/modules/outils.js"
import {tracePoint,vecteur,segment,translation,translationAnimee,codeSegment,texteParPosition,mathalea2d,pavage} from "/modules/2d.js"
/**
 * @Auteur Jean-Claude Lhote
 * publié le 16/12/2020
 * Réf : 4G11
 * Trouver une figure image dans un pavage par une translation. 6 pavages différents.
 */
export default function Pavage_et_translation2d() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Trouver l'image d'une figure par une translation dans un pavage";
  this.consigne = "";
  this.nb_questions = 3;
  this.nb_questions_modifiable = true;
  this.correction_detaillee=true;
  this.correction_detaillee_disponible=true;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.sup = 1; // 1 pour des pavages modestes, 2 pour des plus grand.
  this.sup2=false // On cache les centres par défaut.
  this.sup3=7;
  sortie_html ? (this.spacing_corr = 2.5) : (this.spacing_corr = 1.5);
  this.nouvelle_version = function () {
    let videcouples=function(tableau){
      for (let k=0;k<tableau.length;k++){
        for (let j=k+1;j<tableau.length;j++){
          if (tableau[k][1]==tableau[j][0]) {
            tableau.splice(j,1)
          }
        }
      }
      return tableau
    }
    let compare2polys=function(poly1,poly2){
      if (comparenbsommets(poly1,poly2)) {
        if (comparesommets(poly1,poly2)) 
          return true
        else
          return false
      }
      else 
        return false 
      }
      let comparenbsommets = function(poly1,poly2){
        if (poly1.listePoints.length==poly2.listePoints.length){
          return true
        }
        else return false
      }
      
      let compare2sommets=function(sommet1,sommet2){
        if (egal(sommet1.x,sommet2.x,0.1)&&egal(sommet1.y,sommet2.y,0.1)) {
          return true
        }
        else return false
      }
      let comparesommets = function(poly1,poly2){
        let trouve=false,trouves=0
        if (comparenbsommets(poly1,poly2))
        for (let P of poly1.listePoints) {
          for (let M of poly2.listePoints) {
            if (compare2sommets(M,P)) {
              trouve=true
            }
            if (trouve) break
          }
          if (trouve) {
            trouves++
            trouve=false
          }
          else {
            trouves-=100
          }
          if (trouves<0)
          break
        }
        if (trouves==poly1.listePoints.length)
          return true
        else return false
      }

    let translacion = function (pavage, v, numero) { // retourne le numero du polygone image ou -1 si il n'existe pas
      let poly=pavage.polygones[numero-1],pol
      let result=-1
      let sympoly=translation(poly,v)
      for (let k= 0;k<pavage.polygones.length;k++) {
        pol=pavage.polygones[k]
        if (compare2polys(sympoly,pol)) {
          return k+1
        }
      }
      return result
    } 

    let objets=[],objets_correction=[],P1,P2,P3,t
    let taillePavage=parseInt(this.sup)
    if (taillePavage<1||taillePavage>2) {
      taillePavage=1
    }
    if (this.nb_questions>5) {
      taillePavage=2
    }
    this.liste_corrections = []
    this.liste_questions = []
    let Nx,Ny,index1,index2,A,B,d,image,couples=[],tailles=[],monpavage,fenetre
    let texte = "", texte_corr = "", type_de_pavage = parseInt(this.sup)
    let nombreTentatives,nombrePavageTestes=1,v
    monpavage = pavage()
    if (this.sup3==8) {
      type_de_pavage =  randint(1,7)
    }
    else {
      type_de_pavage=parseInt(this.sup3)
    }
    while (couples.length<this.nb_questions&&nombrePavageTestes<6){
      nombreTentatives=0
    monpavage = pavage() // On crée l'objet Pavage qui va s'appeler monpavage
    tailles = [[[3, 2], [3, 2], [2, 2], [2, 2], [2, 2], [2, 2],[3,2]], [[4, 3], [4, 3], [3, 3], [3, 3], [3, 3], [3, 2],[5,3]]]
    Nx = tailles[taillePavage-1][type_de_pavage-1][0]
    Ny = tailles[taillePavage-1][type_de_pavage-1][1]
    monpavage.construit(type_de_pavage, Nx, Ny, 3) // On initialise toutes les propriétés de l'objet.
    fenetre=monpavage.fenetre
    while (couples.length<this.nb_questions+2&&nombreTentatives<3) { // On cherche d pour avoir suffisamment de couples
    couples=[] // On vide la liste des couples pour une nouvelle recherche
    index1=randint(Math.floor(monpavage.nb_polygones/3),Math.ceil(monpavage.nb_polygones*2/3)) // On choisit 2 points dans 2 polygones distincts.
    index2=randint(Math.floor(monpavage.nb_polygones/3),Math.ceil(monpavage.nb_polygones*2/3),index1) 
    while (!comparenbsommets(monpavage.polygones[index1],monpavage.polygones[index2])) { // On vérifie que les deux polygones sont compatibles
      index2=(index2+1)%(monpavage.polygones.length-1)
    }
    A=monpavage.barycentres[index1] // On prends  les barycentres
    B=monpavage.barycentres[index2] 
    v=vecteur(A,B)
    while (compare2sommets(A,B)){ // On vérifie qu'ils sont bien distincts sinon, on change.
    index2=randint(Math.floor(monpavage.nb_polygones/3),Math.ceil(monpavage.nb_polygones*2/3),index1) 
    while (!comparenbsommets(monpavage.polygones[index1],monpavage.polygones[index2])) { // On vérifie que les deux polygones sont compatibles
      index2=(index2+1)%(monpavage.polygones.length-1)
    }
    A=monpavage.barycentres[index1] // On prends  les barycentres
    B=monpavage.barycentres[index2] 
    v=vecteur(A,B)
  }
    d=segment(A,B)
    d.styleExtremites='->'
    d.color='red'
    d.epaisseur=3
    for (let i=1;i<= monpavage.nb_polygones; i++){ //on crée une liste des couples (antécédents, images)
      image=translacion(monpavage,v,i)
      if (image!=-1){ // si l'image du polygone i existe, on ajoute le couple à la liste
        couples.push([i,image])
      }
    }
    couples=videcouples(couples) //supprime tous les couples en double (x,y)=(y,x)
    nombreTentatives++ 
    }
    if (couples.length<this.nb_questions){
    if (this.sup3==7) {
      type_de_pavage=(type_de_pavage+1)%5+1
    }
    nombrePavageTestes++
    }
  }
  if (couples.length<this.nb_questions){
    console.log('trop de questions, augmentez la taille du pavage')
    return
  }

    objets.push(d) // la droite d est trouvée
    couples=shuffle(couples) // on mélange les couples
    for (let i = 0; i < monpavage.nb_polygones; i++) {
      objets.push(texteParPosition(nombre_avec_espace(i + 1), monpavage.barycentres[i].x + 0.5, monpavage.barycentres[i].y, 'milieu', 'gray', 1, 0, true))
    }
    if (this.sup2) { // Doit-on montrer les centres des figures ?
      for (let i = 0; i < monpavage.nb_polygones; i++) {
        objets.push(monpavage.tracesCentres[i])
      }
    }
    for (let i = 0; i < monpavage.nb_polygones; i++) { // il faut afficher tous les polygones du pavage
      objets.push(monpavage.polygones[i])
    }
    texte = mathalea2d(fenetre, objets) // monpavage.fenetre est calibrée pour faire entrer le pavage dans une feuille A4
    texte+=`<br>`
    for (let i=0;i<this.nb_questions;i++){  
      texte+=`Quel est l'image de la figure $${couples[i][0]}$ dans la translation transformant la figure $${index1+1}$ en la figure $${index2+1}$ ?<br>`
      texte_corr+=`L'image de la figure $${couples[i][0]}$ dans la translation transformant la figure $${index1+1}$ en la figure $${index2+1}$ est la figure ${couples[i][1]}<br>`
//      symetriques=associesommets(monpavage.polygones[couples[i][0]-1],monpavage.polygones[couples[i][1]-1],d)
      if (this.correction_detaillee){
        A=monpavage.barycentres[couples[i][0]-1]
        B=monpavage.barycentres[couples[i][1]-1]
        d=v.representant(A,B)
        d.color=texcolors(i)
        t=this.nb_questions*3;
        P1=monpavage.polygones[couples[i][0]-1]
        P1.color=texcolors(i)
        P1.couleurDeRemplissage=texcolors(i)
        P1.opaciteDeRemplissage=0.5
        P1.epaisseur=2
        P2=monpavage.polygones[couples[i][1]-1]
        P2.color=texcolors(i)
        P2.couleurDeRemplissage=texcolors(i)
        P2.opaciteDeRemplissage=0.5
        P2.epaisseur=2
        P3=translationAnimee(P1,v,`begin="${i*3}s;${i*3+t}s;${i*3+t*2}s" end="${i*3+2}s;${i*3+t+2}s;${i*3+t*2+2}s" dur="2s" repeatCount="indefinite" repeatDur="${9*this.nb_questions}s" id="poly-${i}-anim"`)
        P3.color=texcolors(i)
        P3.epaisseur=2
        objets_correction.push(tracePoint(A,B),d,codeSegment(A,B,'//',texcolors(i)),P1,P2,P3)
      }
    }
    if (this.correction_detaillee){
      texte_corr+=mathalea2d(fenetre, objets,objets_correction)
    }
    this.liste_questions.push(texte);
    this.liste_corrections.push(texte_corr);
    liste_de_question_to_contenu(this)
  }
	this.besoin_formulaire_numerique = ['Taille du pavage (la grande est automatique au-delà de 5 questions)', 2, '1 : Taille modeste\n 2 : Grande taille'];
  this.besoin_formulaire2_case_a_cocher=["Montrer les centres"]
	this.besoin_formulaire3_numerique=['Choix du pavage',8,'1 : Pavage de triangles équilatéraux\n2 : Pavage de carrés\n3 : Pavage d\'hexagones réguliers\n4 : Pavage 3².4.3.4\n5 : Pavage 8².4\n 6 : Pavage de losanges (hexagonal d\'écolier)\n7 : Pavage 6.3.6.3\n8 : Un des sept pavages au hasard']
}

