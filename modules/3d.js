import {point,vecteur,droite,segment,polyline,polygone} from "/modules/2d.js"
/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% OBJET PARENT %%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/*
 * Classe parente de tous les objets de MathALEA2D
 *
 * @Auteur Rémi Angot
 */
let numId = 0
function ObjetMathalea2D() {
    this.positionLabel = "above";
    this.isVisible = true;
    this.color = "black";
    this.style = ""; //stroke-dasharray="4 3" pour des hachures //stroke-width="2" pour un trait plus épais
    this.styleTikz = "";
    this.epaisseur = 1;
    this.opacite = 1;
    this.pointilles = false;
    this.id = numId;
    numId++;
  //   mesObjets.push(this);
    mathalea.objets2D.push(this)
  }


/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% OBJETS DE BASE %%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * LE POINT
 * 
* @Auteur Jean-Claude Lhote
* Point de l'espace défini par ses trois coordonnées (Si deux sont données seulement, le point est dans le plan XY)
* le paramètre visible définit si ce point est placé devant (par défaut) ou derrière une surface. Il sera utilisé pour définir la visibilité des arêtes qui en partent
*/
  class Point3d {
    constructor (x3d,y3d,z3d,visible,label) {
      let alpha=mathalea.anglePerspective*Math.PI/180
      let rapport=mathalea.coeffPerspective
      let MT = math.matrix([[1,rapport*Math.cos(alpha),0], [0,rapport*Math.sin(alpha), 1]])
      this.x3d=x3d
      this.y3d=y3d
      this.z3d=z3d
      this.visible=visible
      this.label=label
      let V=math.matrix([this.x3d,this.y3d,this.z3d])
      let W=math.multiply(MT,V)
      this.p2d=point(W._data[0],W._data[1])
    }
  }
  export function point3d(x3d,y3d,z3d=0,visible=true,label=""){
    return new Point3d(x3d,y3d,z3d,visible,label)
  }
  

  /**
   * LE VECTEUR
   * 
   * @Auteur Jean-Claude Lhote
   * le vecteur3d est sans doute l'objet le plus important de cette base d'objets
   * On les utilise dans tous les objets complexeimport Additionner_soustraires_decimaux from '../exercices/6e/6C20';
s et dans toutes les transformations.
   * Ils servent notament à définir la direction des plans.
   * 
   * 3 usages : vecteur3d(A,B) ou vecteur3d(x,y,z) ou vecteur3d(math.matrix([x,y,z]))
   * A et B sont deux objets de type Point3d
   * x,y et z sont trois nombres
   * la commande math.matrix([x,y,z]) crée une matrice colonne.
   * 
   * L'objet créé est de type Vecteur3d
   * sa propriété p2d est un objet Vecteur (2 dimensions : c'est la projection du vecteur)
   * sa propriété this.representant(A) est le dessin du représentant d'origine A.
   */
  class Vecteur3d{
    constructor(...args){
     let alpha=mathalea.anglePerspective*Math.PI/180
     let rapport=mathalea.coeffPerspective
     let MT = math.matrix([[1,rapport*Math.cos(alpha),0], [0,rapport*Math.sin(alpha), 1]])
    if (args.length==2) {
      this.x3d=args[1].x3d-args[0].x3d
      this.y3d=args[1].y3d-args[0].y3d
      this.z3d=args[1].z3d-args[0].z3d
    }
    else {
      if (typeof(args[0])=='number') {
      this.x3d=args[0]
      this.y3d=args[1]
      this.z3d=args[2]
      }
      else if (args.length==1){
        this.x3d=args[0]._data[0]
        this.y3d=args[0]._data[1]
        this.z3d=args[0]._data[2]
      }
    }
    this.matrice=math.matrix([this.x3d,this.y3d,this.z3d])
    let W=math.multiply(MT,this.matrice)
    this.p2d=vecteur(W._data[0],W._data[1])
    this.representant=function(A){
      let B=translation3d(A,this)
      return vecteur(A.p2d,B.p2d).representant(A.p2d)
    }
  }
  }
  
  export function vecteur3d (...args){ // A,B deux Point3d ou x,y,z les composantes du vecteur
    return new Vecteur3d(...args)
  }

  /**
   * L'ARETE
   * @Auteur Jean-Claude lhote
   * 
   * 
   * 
   */
class Arete3d{
    constructor (point1,point2,color){
        this.extremite1=point1
        this.extremite2=point2
        this.color=color
        if (!point1.visible||!point2.visible) {
            this.visible=false
        }
        else {
            this.visible=true
        }
        this.p2d=segment(point1.p2d,point2.p2d,color)
        if (!this.visible) {
            this.p2d.pointilles=2
        }
        else {
            this.p2d.pointilles=false
        }
    }
  }
export function arete3d(p1,p2,color){
    return new Arete3d(p1,p2,color)
}

  /**
   * LA DROITE
   * 
   * @Auteur Jean-claude Lhote
   * Droite de l'espace définie par point et vecteur directeur
   * Les droites servent principalement à définir des axes de rotation dans l'espace
   */
  class Droite3d{
    constructor (point3D,vecteur3D){
      this.origine=point3D
      this.directeur=vecteur3D
      let M=translation3d(this.origine,this.directeur)
      this.p2d=droite(this.origine.p2d,M.p2d) // la droite correspndant à la projection de cette droite dans le plan Mathalea2d
      this.p2d.isVisible=false
    }
  }
  
  export function droite3d(point3D,vecteur3D){
    return new Droite3d(point3D,vecteur3D)
  }
  

/**
 * LE DEMI-CERCLE
 * 
 *@Auteur Jean-Claude Lhote
 * Le nom est trompeur, il s'agit le plus souvent d'une demi-ellipse représentant un cercle projeté
 * Utilisé pour représenter un cercle dont une moitié est visible mais pas l'autre.
 * 
 * normal et rayon sont deux vecteurs 3d
 * normal est un vecteur normal au plan du cercle
 * rayon est le vecteur qui part du centre et qui joint la 1ere extremité visible.
 * cote est soit 'caché' soit 'visible' et déterminera dans quel sens on crée le demi-cercle.
 * Si cote='caché' alors on tourne dans le sens direct et le tracé est en pointillés
 * Si cote='visible' alors on tourne dans le sens indirect et le tracé est plein.
 *
 */
export function demicercle3d(centre,normal,rayon,cote,color){

    let demiCercle,signe,M=[],listepoints=[]
    if (cote=='caché') {
      signe=1
    }
    else {
      signe=-1
    }
    let d=droite3d(centre,normal)
    M.push(rotation3d(translation3d(centre,rayon),d,mathalea.anglePerspective))
    listepoints.push(M[0].p2d)
  
    for (let i=1;i<19;i++) {
          M.push(rotation3d(M[i-1],d,10*signe))
          listepoints.push(M[i].p2d)
    }
    demiCercle=polyline(listepoints,color)
    if (cote=='caché') {
      demiCercle.pointilles=2
    }
    return demiCercle
   }


   /**
    * LE CERCLE
    * 
    * @Auteur Jean-Claude Lhote
    * 
    * C'est la version entière du cercle : soit totalement visible, soit totalement caché.
    * visible est un booléen
    * 
    */
   export function cercle3d(centre,normal,rayon,visible=true,color='black'){
  
    let C,M=[],listepoints=[]
    let d=droite3d(centre,normal)
    M.push(rotation3d(translation3d(centre,rayon),d,mathalea.anglePerspective))
    listepoints.push(M[0].p2d)
    for (let i=1;i<37;i++) {
          M.push(rotation3d(M[i-1],d,10))
          listepoints.push(M[i].p2d)
    }
    C=polygone(listepoints,color)
    if (!visible) {
      C.pointilles=2
    }
    return C
   }

  /**
   * LE POLYGONE
   * 
   * @Auteur Jean-Claude Lhote
   * usages : polygone3d([A,B,C,...],color) ou polygone3d(A,B,C...) où A,B,C ... sont des point3d. color='black' par défaut.
   */
  class Polygone3d{
    constructor (...args){
      if (Array.isArray(args[0])) {
        //Si le premier argument est un tableau
        this.listePoints = args[0];
        if (args[1]) {
          this.color = args[1];
        }
      } else {
        this.listePoints = args;
        this.color='black'
      }
      let segments3d=[],A,segments=[]
      A=this.listePoints[0]
      for (let i=1;i<this.listePoints.length;i++){
        segments3d.push(arete3d(A,this.listePoints[i],this.color))
        segments.push(segments3d[i-1].p2d)
        A=this.listePoints[i]
      }
      segments3d.push(arete3d(A,this.listePoints[0],this.color))
      segments.push(segments3d[this.listePoints.length-2].p2d)
      this.aretes=segments3d
      this.p2d=segments
    }
  }
  
  export function polygone3d(...args){
    return new Polygone3d(...args)
  }
  

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% OBJETS DE COMPLEXES %%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

  /**
   * LA SPHERE
   * 
   * @Auteur Jean-Claude Lhote
   * Produit une sphère : choisir un nombre de parallèles impair pour avoir l'équateur. normal défini l'axe Nord-Sud.
   * rayon sera (par défaut) tourné de anglePerspective et définit la limite de la surface visible et sa norme est le rayon de la sphère.
   * @param {Point3d} centre 
   * @param {Vecteur3d} normal 
   * @param {Vecteur3d} rayon 
   * @param {Number} nb_paralleles 
   * @param {Number} nb_meridiens 
   * @param {string} color 
   */
   function Sphere3d(centre,normal,rayon,nb_paralleles,nb_meridiens,color){
     ObjetMathalea2D.call(this)
     this.centre=centre
     this.rayon=rayon
     this.normal=normal
     this.color=color
     this.nb_meridiens=nb_meridiens
     this.nb_paralleles=nb_paralleles
     let objets=[],c1,c2,C
     let prodvec=vecteur3d(math.cross(normal.matrice,rayon.matrice))
     let prodscal=math.dot(prodvec.matrice,vecteur3d(0,1,0).matrice)
     let cote1,cote2,rayon2,r,R,V
     rayon2=vecteur3d(math.cross(rayon.matrice,math.multiply(prodvec.matrice,1/math.norm(prodvec.matrice))))
     R=math.norm(this.rayon.matrice)
     if (prodscal>0) {
       cote1='caché'
       cote2='visible'
     }
     else {
       cote2='caché'
       cote1='visible'
     }
     objets.push(cercle3d(this.centre,rotationV3d(prodvec,this.normal,mathalea.anglePerspective),rotationV3d(this.rayon,this.normal,mathalea.anglePerspective),true,this.color))
     for (let k=0;k<2;k+=2/(this.nb_paralleles+1)){
       r=math.sqrt(R**2-((k-1)*R)**2)
       C=translation3d(this.centre,vecteur3d(math.multiply(rayon2.matrice,k-1)))
       c1=demicercle3d(C,this.normal,vecteur3d(math.multiply(this.rayon.matrice,r/R)),cote1,this.color)
       c2=demicercle3d(C,this.normal,vecteur3d(math.multiply(this.rayon.matrice,r/R)),cote2,this.color)
       objets.push(c1,c2)
     }
     C=translation3d(this.centre,rayon2)
  
     for (let k=0;k<2;k+=2/(this.nb_meridiens+1)){
       V=rotationV3d(prodvec,this.normal,mathalea.anglePerspective+k*90)
      c1=demicercle3d(this.centre,V,rayon2,cote1,this.color)
      c2=demicercle3d(this.centre,V,rayon2,cote2,this.color)
      objets.push(c1,c2)
    }
    
     this.svg =function (coeff) {
      let code = "";
      for (let objet of objets) {
        code += "\n\t" + objet.svg(coeff);
      }
      return code;
    }
    this.tikz = function() {
      let code = "";
      for (let objet of objets) {
        code += "\n\t" + objet.tikz();
      }
      return code;
    }
   }
  export function sphere3d(centre,normal,rayon,nb_paralleles,nb_meridiens,color='black'){
    return new Sphere3d(centre,normal,rayon,nb_paralleles,nb_meridiens,color)
  }


   /**
    * LE CONE
    * 
    * @Auteur Jean-Claude Lhote
    * 
    * centrebase est le centre du disque de base
    * sommet est le sommet du cône
    * normal est un vecteur 3d normal au plan du disque (il détermine avec rayon de quel côté se trouve la partie visible)
    * 
    */
  function Cone3d(centrebase,sommet,normal,rayon){
    ObjetMathalea2D.call(this)
    this.sommet=sommet
    this.centrebase=centrebase
    this.normal=normal
    this.rayon=rayon
    let objets=[],c1,c2,s,color1,color2
    let prodvec=vecteur3d(math.cross(normal.matrice,rayon.matrice))
    let prodscal=math.dot(prodvec.matrice,vecteur3d(0,1,0).matrice)
    let cote1,cote2
    if (prodscal>0) {
      cote1='caché'
      color1='gray'
      cote2='visible'
      color2='black'
    }
    else {
      cote2='caché'
      cote1='visible'
      color1='black'
      color2='gray'
    }
    c1=demicercle3d(this.centrebase,this.normal,this.rayon,cote1,color1)
    c2=demicercle3d(this.centrebase,this.normal,this.rayon,cote2,color2)
  
    for (let i=0;i<c1.listePoints.length;i++){
      s=segment(this.sommet.p2d,c1.listePoints[i])
      if (cote1=='caché'){
        s.pointilles=2
        s.color='gray'
      }
      else {
        s.color='black'
      }
      objets.push(s)
    }
    for (let i=0;i<c2.listePoints.length;i++){
      s=segment(this.sommet.p2d,c2.listePoints[i])
      if (cote2=='caché'){
        s.pointilles=2
        s.color='gray'
      }
      else {
        s.color='black'
      }
      objets.push(s)
    }
    objets.push(c1,c2)
    this.svg =function (coeff) {
      let code = "";
      for (let objet of objets) {
        code += "\n\t" + objet.svg(coeff);
      }
      return code;
    }
    this.tikz = function() {
      let code = "";
      for (let objet of objets) {
        code += "\n\t" + objet.tikz();
      }
      return code;
    }
  }
  export function cone3d(centre,sommet,normal,rayon){
    return new Cone3d(centre,sommet,normal,rayon)
  }


  /**
   * LE CYLINDRE
   * 
   * @Auteur Jean-Claude Lhote
   * Crée un cylindre de révolution définit par les centres de ses 2 bases
   * Permet en faisant varier les rayons des deux bases de créer des troncs de cônes
   * @param {Point3d} centrebase1 
   * @param {Point3d} centrebase2 
   * @param {Vecteur3d} normal 
   * @param {Vecteur3d} rayon1 
   * @param {Vecteur3d} rayon2
   */
  function Cylindre3d(centrebase1,centrebase2,normal,rayon1,rayon2){
    ObjetMathalea2D.call(this)
    this.centrebase1=centrebase1
    this.centrebase2=centrebase2
    this.normal=normal
    this.rayon1=rayon1
    this.rayon2=rayon2
    let objets=[],c1,c2,c3,c4,s,color1,color2
    let prodvec=vecteur3d(math.cross(this.normal.matrice,this.rayon1.matrice))
    let prodscal=math.dot(prodvec.matrice,vecteur3d(0,1,0).matrice)
    let cote1,cote2
    if (prodscal>0) {
      cote1='caché'
      color1='gray'
      cote2='visible'
      color2='black'
    }
    else {
      cote2='caché'
      cote1='visible'
      color1='black'
      color2='gray'
    }
    c1=demicercle3d(this.centrebase1,this.normal,this.rayon1,cote1,color1)
    c3=demicercle3d(this.centrebase2,this.normal,this.rayon2,cote1,color1)
    c2=demicercle3d(this.centrebase1,this.normal,this.rayon1,cote2,color2)
    c4=demicercle3d(this.centrebase2,this.normal,this.rayon2,cote2,color2)
    c3.pointilles=false
    c3.color='black'
    for (let i=0;i<c1.listePoints.length;i++){
      s=segment(c3.listePoints[i],c1.listePoints[i])
      if (cote1=='caché'){
        s.pointilles=2
        s.color='gray'
      }
      else {
        s.color='black'
      }
      objets.push(s)
    }
    for (let i=0;i<c2.listePoints.length;i++){
      s=segment(c4.listePoints[i],c2.listePoints[i])
      if (cote2=='caché'){
        s.pointilles=2
        s.color='gray'
      }
      else {
        s.color='black'
      }
      objets.push(s)
    }
    objets.push(c1,c2,c3,c4)
    this.svg =function (coeff) {
      let code = "";
      for (let objet of objets) {
        code += "\n\t" + objet.svg(coeff);
      }
      return code;
    }
    this.tikz = function() {
      let code = "";
      for (let objet of objets) {
        code += "\n\t" + objet.tikz();
      }
      return code;
    }
  }
  export function cylindre3d(centrebase1,centrebase2,normal,rayon,rayon2){
    return new Cylindre3d(centrebase1,centrebase2,normal,rayon,rayon2)
  }
  
  /**
   * LE PRISME
   * 
   * @Auteur Jean-Claude Lhote
   * Crée un prisme à partir du base Polygone3d et d'un vecteur3d d'extrusion (on peut faire des prismes droits ou non droits)
   */
  class Prisme3d{
    constructor(base,vecteur,color){
      ObjetMathalea2D.call(this)

      this.color=color
      base.color=color
      this.base1=base
      this.base2=translation3d(base,vecteur)
      this.base2.color=this.base1.color
      this.aretes=[]
      let objets=[],s
      for (let i=0;i<this.base1.listePoints.length;i++){
      objets.push(this.base1.p2d[i])
      }
      for (let i=0;i<this.base2.listePoints.length;i++){
        objets.push(this.base2.p2d[i])
      }
      for (let i=0;i<this.base1.listePoints.length;i++){
        s=arete3d(this.base1.listePoints[i],this.base2.listePoints[i],this.color)
        objets.push(s.p2d)
      }

      this.svg =function (coeff) {
        let code = "";
        for (let objet of objets) {
          code += "\n\t" + objet.svg(coeff);
        }
        return code;
      }
      this.tikz = function() {
        let code = "";
        for (let objet of objets) {
          code += "\n\t" + objet.tikz();
        }
        return code;
      }
    }
  }

  export function prisme3d(base,vecteur,color='black'){
    return new Prisme3d(base,vecteur,color)
  }
  
/**
   * LE PAVE
   * @Auteur Jean-Claude Lhote
   * usage : pave(A,B,D,E) construit le pavé ABCDEFGH dont les arêtes [AB],[AD] et [AE] sont délimitent 3 faces adjacentes.
   * 
*/
class Pave3d{
    constructor (A,B,D,E,color){
        ObjetMathalea2D.call(this)
        let v1=vecteur3d(A,B)
        let v2=vecteur3d(A,E)
        let v3=vecteur3d(A,D)
        let C=translation3d(D,v1)
        let H=translation3d(D,v2)
        let G=translation3d(C,v2)
        let F=translation3d(B,v2)
        E.visible=false
        this.color=color
        this.base=polygone3d([A,B,F,E])
        this.hauteur=v3
        this.aretes=[arete3d(A,B,color),arete3d(A,D,color),arete3d(A,E,color),arete3d(C,B,color),arete3d(F,B,color),arete3d(C,D,color),arete3d(C,G,color),arete3d(F,G,color),arete3d(F,E,color),arete3d(H,G,color),arete3d(H,E,color),arete3d(H,D,color)]
        this.svg =function (coeff) {
            let code = "";
            for (let arete of aretes) {
              code += "\n\t" + arete.p2d.svg(coeff);
            }
            return code;
          }
          this.tikz = function() {
            let code = "";
            for (let arete of aretes) {
              code += "\n\t" + arete.p2d.tikz();
            }
            return code;
          }
    }
}
export function pave3d(A,B,C,E,color=black){
    return new Pave3d(A,B,C,E,color)
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% TRANSFORMATIONS%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/



  /**
   * LA ROTATION VECTORIELLE
   * 
   * @Auteur Jean-Claude Lhote
   * Cette rotation se distingue de la rotation d'axe (d) par le fait qu'on tourne autour d'une droite vectorielle
   * Elle sert à faire tourner des vecteurs essentiellement.
   * Si on l'utilise sur un point, alors il tournera autour d'une droite passant par l'origine.
   * 
   * @param {*} point3D pour l'instant, cette fonction ne fait tourner qu'un point3d ou un vecteur3d
   * @param {*} vecteur3D vecteur directeur de l'axe de rotation (l'axe passe par l'origine, pour tourner autour d'une droite particulière on utilise rotation3d())
   * @param {*} angle Angle de rotation
   */
  export function rotationV3d(point3D,vecteur3D,angle){ // point = ce qu'on fait tourner (Point3d) ; vecteur = directeur de l'axe de rotation [x,y,z] et angle de rotation en degrés
  let matrice,V,p2
  let norme=math.norm(vecteur3D.matrice)
  let unitaire=math.multiply(vecteur3D.matrice,1/norme)
  let u=unitaire._data[0],v=unitaire._data[1],w=unitaire._data[2]
  let c=Math.cos(angle*Math.PI/180),s=Math.sin(angle*Math.PI/180)
  let k=1-c
  matrice=math.matrix([[u*u*k+c,u*v*k-w*s,u*w*k+v*s],[u*v*k+w*s,v*v*k+c,v*w*k-u*s],[u*w*k-v*s,v*w*k+u*s,w*w*k+c]])
  if (point3D.constructor==Point3d){
    V=math.matrix([point3D.x3d,point3D.y3d,point3D.z3d])
    p2=math.multiply(matrice,V)
    return point3d(p2._data[0],p2._data[1],p2._data[2])
  }
  else if(point3D.constructor==Vecteur3d){
    V=point3D
    p2=math.multiply(matrice,V.matrice)
    return vecteur3d(p2._data[0],p2._data[1],p2._data[2])
  }
  }


  /**
   * LA ROTATION D'AXE UNE DROITE
   * 
   * @Auteur Jean-Claude Lhote
   * 
   * @param {Point3d} point3D Pour l'instant on ne fait tourner qu'un point3d
   * Remarque : ça n'a aucun sens de faire tourner un vecteur autour d'une droite particulière, on utilise la rotation vectorielle pour ça.
   * @param {Droite3d} droite3D Axe de rotation
   * @param {Number} angle Angle de rotation
   */
  export function rotation3d(point3D,droite3D,angle){
    let directeur=droite3D.directeur
    let origine=droite3D.origine
    if (point3D.constructor==Point3d){
        let V=vecteur3d(origine,point3d(0,0,0))
        let W=vecteur3d(point3d(0,0,0),origine)
        let M=translation3d(point3D,V)
        let N=rotationV3d(M,directeur,angle)
        return translation3d(N,W)
      }
      else if(point3D.constructor==Vecteur3d){
        return rotationV3d(point3D,directeur,angle)
      }
  }
  

  /**
   * LA TRANSLATION
   * 
   * @Auteur Jean-Claude Lhote
   * @param {Point3d} point3D Pour l'instant on ne translate qu'un point3d ou un polygone3d
   * @param {Vecteur3d} vecteur3D 
   */
  export function translation3d(point3D,vecteur3D){
    if (point3D.constructor == Point3d){
    let x=point3D.x3d+vecteur3D.x3d
    let y=point3D.y3d+vecteur3D.y3d
    let z=point3D.z3d+vecteur3D.z3d
    return point3d(x,y,z)
    }
    else if (point3D.constructor == Polygone3d){
      let p=[]
      for (let i=0;i<point3D.listePoints.length;i++){
        p.push(translation3d(point3D.listePoints[i],vecteur3D))
      }
      return polygone3d(p,point3D.color)
    }
  }
  
  