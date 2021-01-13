import {egal,randint,choice,rangeMinMax,unSiPositifMoinsUnSinon,arrondi,arrondi_virgule,calcul,lettre_depuis_chiffre,tex_nombre,nombre_avec_espace,string_nombre,premierMultipleSuperieur,premierMultipleInferieur} from "/modules/outils.js"

/*
  MathALEA2D
 @name      mathalea2d.js
 @author    Rémi Angot & Jean-Claude Lhote
 @license   MIT License - CC-BY-SA
 @homepage  https://copmaths.fr/mathalea2d.html
 */


/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% OBJET PARENT %%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/



let numId = 0 // Créer un identifiant numérique unique par objet SVG

/*
 * Classe parente de tous les objets de MathALEA2D
 *
 * @Auteur Rémi Angot
 */
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
%%%%%%%%%%%%%%% LES POINTS %%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * A = point('A') //son nom
 * A = point(x,y) //ses coordonnées
 * A = point(x,y,'A') //ses coordonnées et son nom
 * A = point(x,y,'A',below') //ses coordonnées,son nom et la position de son label
 *
 * @Auteur Rémi Angot
 */
function Point(arg1, arg2, arg3, positionLabel = "above") {
 // ObjetMathalea2D.call(this);
  if (arguments.length == 1) {
    this.nom = arg1;
  } else if (arguments.length == 2) {

    this.x = arg1;
    this.y = arg2;
  } else {
    this.x = arg1;
    this.y = arg2;
    this.nom = arg3;
  }
  this.positionLabel = positionLabel;
  this.xSVG = function (coeff) {
    return this.x * coeff;
  };
  this.ySVG = function (coeff) {
    return -this.y * coeff;
  };
  if (!this.nom) {
    this.nom = " "; // Le nom d'un point est par défaut un espace
    // On pourra chercher tous les objets qui ont ce nom pour les nommer automatiquement
  }
}
export function point(...args) {
  return new Point(...args);
}


/**
 * tracePoint(A) // Place une croix à l'emplacement du point A
 * tracePoint(A,B,C,D) // Place une croix pour les différents points
 * tracePoint(A,B,C,D,'blue') // Place une croix pour les différents points
 *  
 * @Auteur Rémi Angot & Jean-Claude Lhote
 */
function TracePoint(...points) {
  ObjetMathalea2D.call(this);
  this.taille = 3;
  this.epaisseur=1;
  this.opacite=0.8;
  this.style='x';

  if (typeof points[points.length - 1] === "string") {
    this.color = points[points.length - 1];
  }
  else this.color='black';
  this.svg = function (coeff) {
    let objetssvg=[],s1,s2,p1,p2,c
    for (let A of points) {
      if (A.constructor == Point) {
        if (this.style=='x'){
        s1=segment(point(A.x-this.taille/coeff,A.y+this.taille/coeff),
        point(A.x+this.taille/coeff,A.y-this.taille/coeff),this.color);
        s2=segment(point(A.x-this.taille/coeff,A.y-this.taille/coeff),
        point(A.x+this.taille/coeff,A.y+this.taille/coeff),this.color);
        s1.epaisseur=this.epaisseur;
        s2.epaisseur=this.epaisseur;
        s1.opacite=this.opacite;
        s2.opacite=this.opacite;
        objetssvg.push(s1,s2);
        s1.isVisible = false;
        s2.isVisible = false;
        }
        else if (this.style=='o'){
          p1=point(A.x,A.y)
          c=cercle(p1,this.taille/coeff,this.color)
          c.epaisseur=this.epaisseur
          c.opacite=this.opacite
          c.couleurDeRemplissage=this.color
          c.opaciteDeRemplissage=this.opacite/2
          objetssvg.push(c)
        }
  /*      else if (this.style=='.'){
          p1=point(A.x,A.y)
          c=cercle(p1,0.05,this.color)
          c.epaisseur=this.epaisseur
          c.opacite=this.opacite
          c.couleurDeRemplissage=this.color
          c.opaciteDeRemplissage=this.opacite/2
          objetssvg.push(c)
        }
    */    else if (this.style=='#'){
          p1=point(A.x-this.taille/coeff,A.y-this.taille/coeff)
          p2=point(A.x+this.taille/coeff,A.y-this.taille/coeff)
          c=carreIndirect(p1,p2,this.color)
          c.epaisseur=this.epaisseur
          c.opacite=this.opacite
          c.couleurDeRemplissage=this.color
          c.opaciteDeRemplissage=this.opacite/2
          objetssvg.push(c)
        }
        else if (this.style=='+'){
          s1=segment(point(A.x,A.y+this.taille/coeff),
          point(A.x,A.y-this.taille/coeff),this.color);
          s2=segment(point(A.x-this.taille/coeff,A.y),
          point(A.x+this.taille/coeff,A.y),this.color);
          s1.epaisseur=this.epaisseur;
          s2.epaisseur=this.epaisseur;
          s1.opacite=this.opacite;
          s2.opacite=this.opacite;
          objetssvg.push(s1,s2);
        }
        else if (this.style=='|'){
          s1=segment(point(A.x,A.y+this.taille/coeff),
          point(A.x,A.y-this.taille/coeff),this.color);
          s1.epaisseur=this.epaisseur;
          s1.opacite=this.opacite;
          objetssvg.push(s1);
        }
      }
    }
    let code = "";
    for (let objet of objetssvg) {
      code += "\n\t" + objet.svg(coeff);
    }
    code = `<g id="${this.id}">`+code+`</g>`
    return code;
  };
  this.tikz = function () {
    let objetstikz=[],s1,s2,p1,p2,c
    let tailletikz=this.taille/20/mathalea.scale;
    for (let A of points) {
      if (A.constructor == Point) {
        if (this.style=='x'){
        s1=segment(point(A.x-tailletikz,A.y+tailletikz),
        point(A.x+tailletikz,A.y-tailletikz),this.color);
        s2=segment(point(A.x-tailletikz,A.y-tailletikz),
        point(A.x+tailletikz,A.y+tailletikz),this.color);
        s1.epaisseur=this.epaisseur;
        s2.epaisseur=this.epaisseur;
        s1.opacite=this.opacite;
        s2.opacite=this.opacite;
        objetstikz.push(s1,s2);
        }
        else if (this.style=='o'){
          p1=point(A.x,A.y)
          c=cercle(p1,tailletikz,this.color)
          c.epaisseur=this.epaisseur
          c.opacite=this.opacite
          c.couleurDeRemplissage=this.color
          c.opaciteDeRemplissage=this.opacite/2
          objetstikz.push(c)
        }
 /*       else if (this.style=='.'){
          p1=point(A.x,A.y)
          c=cercle(p1,0.05,this.color)
          c.epaisseur=this.epaisseur
          c.opacite=this.opacite
          c.couleurDeRemplissage=this.color
          c.opaciteDeRemplissage=this.opacite/2
          objetstikz.push(c)
        }
   */     else if (this.style=='#'){
          p1=point(A.x-tailletikz,A.y-tailletikz)
          p2=point(A.x+tailletikz,A.y-tailletikz)
          c=carreIndirect(p1,p2,this.color)
          c.epaisseur=this.epaisseur
          c.opacite=this.opacite
          c.couleurDeRemplissage=this.color
          c.opaciteDeRemplissage=this.opacite/2
          objetstikz.push(c)
        }
        else if (this.style=='+'){
          s1=segment(point(A.x,A.y+tailletikz),
          point(A.x,A.y-tailletikz),this.color);
          s2=segment(point(A.x-tailletikz,A.y),
          point(A.x+tailletikz,A.y),this.color);
          s1.epaisseur=this.epaisseur;
          s2.epaisseur=this.epaisseur;
          s1.opacite=this.opacite;
          s2.opacite=this.opacite;
          objetstikz.push(s1,s2);
        }
        else if (this.style=='|'){
          s1=segment(point(A.x,A.y+tailletikz),
          point(A.x,A.y-tailletikz),this.color);
          s1.epaisseur=this.epaisseur;
          s1.opacite=this.opacite;
          objetstikz.push(s1);
        }
      }
    }
    let code = "";
    for (let objet of objetstikz) {
      code += "\n\t" + objet.tikz();
    }
    return code;
  }

}

export function tracePoint(...args) {
  return new TracePoint(...args);
}

/**
 * P=tracePointSurDroite(A,d) //Ajoute un trait perpendiculaire à d supposée tracée marquant la posiion du point A
 * P=tracePointSurDroite(A,B) //Ajoute un trait perpendiculaire à la droite (AB) supposée tracée marquant la posiion du point A
 * 
 * @Auteur Rémi Angot & Jean-Claude Lhote
 */
function TracePointSurDroite(A, O) {
  ObjetMathalea2D.call(this)
  this.lieu=A
  this.taille=0.2
  this.x=A.x
  this.y=A.y
  let M,d
  // if (sortie_html) taille =  4/pixelsParCm; //initiallement 0.2, maintenant 0.2/pixelsParCm*20 pour que la taille soit indépendante du zoom mais ça pose problème en tikz !!!
  // else taille = 0.2/scale
  
  if (O.constructor == Point) {
    M = pointSurSegment(A, O, 1);
    this.direction=rotation(M, A, 90);
  }
  if (O.constructor == Droite) {
    d = droiteParPointEtPerpendiculaire(A, O);
    d.isVisible = false;
    this.direction=pointSurSegment(point(d.x1, d.y1), point(d.x2, d.y2), 1);
  }
  this.svg=function(coeff){
    let A1 = pointSurSegment(this.lieu,this.direction,this.taille*20/coeff);
    let A2 = pointSurSegment(this.lieu,this.direction,-this.taille*20/coeff);
    let s = segment(A1,A2);
    this.id = s.id;
    s.isVisible = false;
    return s.svg(coeff)
  }
  this.tikz=function(){
    let A1=pointSurSegment(this.lieu,this.direction,this.taille/mathalea.scale)
    let A2=pointSurSegment(this.lieu,this.direction,-this.taille/mathalea.scale)
    let s=segment(A1,A2)
    return s.tikz()
  }
 /* this.svgml=function(coeff,amp){

  }
  this.tikzml=function(amp){

  }
  */
}
export function tracePointSurDroite(A,O) {
  return new TracePointSurDroite(A,O)
}

/**
 * M = milieu(A,B) //M est le milieu de [AB]
 * M = milieu(A,B,'M') //M est le milieu [AB] et se nomme M
 * M = milieu(A,B,'M','below') //M est le milieu [AB], se nomme M et le nom est en dessous du point
 *
 * @Auteur Rémi Angot
 */
export function milieu(A, B, nom, positionLabel = "above") {
  let x = calcul((A.x + B.x) / 2);
  let y = calcul((A.y + B.y) / 2);
  return new Point(x, y, nom, positionLabel);
}

/**
 * M = pointSurSegment(A,B,l) //M est le point de [AB] à l cm de A
 * M = pointSurSegment(A,B,l,'M') //M est le point de [AB] à l cm de A et se nomme M
 * M = pointSurSegment(A,B,l,'M','below') //M est le point de [AB] à l cm de A, se nomme M et le nom est en dessous du point
 *
 * M = pointSurSegment(A,B,'h','M') // M est un point au hasard sur [AB] (on peut écrire n'importe quel texte à la place de 'h')
 * M = pointSurSegment(A,B) // M est un point au hasard sur [AB]
 * @Auteur Rémi Angot
 */
export function pointSurSegment(A, B, l, nom="", positionLabel = "above") {
  if (l === undefined || typeof l == "string") {
    l = calcul((longueur(A, B) * randint(15, 85)) / 100);
  }
  return homothetie(B, A, calcul(l / longueur(A, B)), nom, positionLabel);
}
/**
 *
 * @param {Cercle} c
 * @param {number} angle
 * @param {string} nom
 * @param {string} positionLabel
 * M = pointSurCercle(c,'','M') // M est un point choisi au hasard sur le cercle c et se nomme M.
 * N = pointSurCercle(c,90) // N est le point du cercle c situé à 90° par rapport à l'horizontale, donc au dessus du centre de c
 * P = pointSurCercle(c,-90) // P est le point du cercle c situé à l'opposé du point N précédent.
 * @Auteur Jean-Claude Lhote
 */
export function pointSurCercle(c, angle, nom, positionLabel = "above") {
  if (typeof angle != "number") angle = randint(-180, 180);
  let x = c.centre.x + c.rayon * Math.cos(Math.radians(angle));
  let y = c.centre.y + c.rayon * Math.sin(Math.radians(angle));
  return point(x, y, nom, positionLabel);
}
/**
 * P=pointSurDroite(d,x) retourne un point sur la droite d dont l'abscisse est x. Si c'est impossible (droite verticale) alors ce sera le point dont l'ordonnée vaut x.
 * @Auteur Jean-Claude Lhote
 */
export function pointSurDroite(d, x, nom, positionLabel = "above") {
  // si d est parallèle à l'axe des ordonnées, le paramètre x servira pour y.
  if (d.b == 0) return point(calcul(-d.c / d.a), x, nom, positionLabel);
  else if (d.a == 0) return point(x, calcul(-d.c / d.b), nom, positionLabel);
  else return point(x, calcul((-d.c - d.a * x) / d.b), nom, positionLabel);
}

/**
 * M = pointIntersectionDD(d1,d2,'M','below') //M est le point d'intersection des droites (d1) et (d2)
 *
 * @Auteur Jean-Claude Lhote
 */
export function pointIntersectionDD(d, f, nom = "", positionLabel = "above") {
  let x,y
  if (f.a*d.b-f.b*d.a==0) {
    console.log('Les droites sont parallèles, pas de point d\'intersection')
    return false
  }
  else
  y = calcul((f.c*d.a-d.c*f.a) / (f.a*d.b-f.b*d.a));
  if (d.a==0) // si d est horizontale alors f ne l'est pas donc f.a<>0
    x=calcul((-f.c-f.b*y)/f.a)
  else // d n'est pas horizontale donc ...
    x=calcul((-d.c-d.b*y)/d.a)
  return point(x, y, nom, positionLabel);
}
/**
 * pointAdistance(A,d,angle,nom="",positionLabel="above") 
 * Seuls le point A et la distance d sont obligatoires, angle peut être choisi : il s'agit de l'angle signé avec l'axe [OI) sinon, il est choisi aléatoirement.
 * p=pointAdistance(A,5,'M') Place un point aléatoirement à 5 unités de A et lui donne le nom de 'M'.
 * @Auteur Jean-Claude Lhote
 */
export function pointAdistance(...args) {
  let l = args.length
  let angle = randint(1, 360)
  let A = args[0]
  let B = point(A.x + 1, A.y)
  let d = args[1]
  if (l < 2) 
    return false
  if (l == 2) 
    return similitude(B, A, angle, d)
  else
    if (l == 3) {
      if (typeof (args[2]) == 'number')
        return similitude(B, A, args[2], d)
      else
        return similitude(B, A, angle, d, args[2])
    }
    else
      if (l == 4) {
        if (typeof (args[2]) == 'number')
          return similitude(B, A, args[2], d, args[3])
        else
          return similitude(B, A, angle, d, args[2], args[3])
      }
      else
        return similitude(B, A, args[2], d, args[3], args[4])
}



/**
 * labelPoint(A,B) pour nommer les points A et B
 * Le nombre d'arguments n'est pas limité
 *
 * @Auteur Rémi Angot
 */
function LabelPoint(...points) {
  ObjetMathalea2D.call(this);
  this.svg = function (coeff) {
    let code = "",x,y;
    if (Array.isArray(points[0])) {
      //Si le premier argument est un tableau
      this.listePoints = points[0];
    } else {
      this.listePoints = points;
    }
    for (let point of this.listePoints) {
      x=point.x,y=point.y
      switch (point.positionLabel) {
        case "left":
          code += texteParPosition(point.nom,x-15/coeff,y,'milieu',this.color,1,"",true).svg(coeff)+`\n`
          break;
        case "right":
          code += texteParPosition(point.nom,x+15/coeff,y,'milieu',this.color,1,"",true).svg(coeff)+`\n`
          break;
        case "below":
          code += texteParPosition(point.nom,x,y-15/coeff,'milieu',this.color,1,"",true).svg(coeff)+`\n`
          break;
        case "above":
          code += texteParPosition(point.nom,x,y+15/coeff,'milieu',this.color,1,"",true).svg(coeff)+`\n`
          break;
        case "above right":
          code += texteParPosition(point.nom,x+15/coeff,y+15/coeff,'milieu',this.color,1,"",true).svg(coeff)+`\n`
          break;
        case "below left":
          code += texteParPosition(point.nom,x-15/coeff,y-15/coeff,'milieu',this.color,1,"",true).svg(coeff)+`\n`
          break;
        case "below right":
          code += texteParPosition(point.nom,x+15/coeff,y-15/coeff,'milieu',this.color,1,"",true).svg(coeff)+`\n`
          break;
        default:
          code += texteParPosition(point.nom,x-15/coeff,y+15/coeff,'milieu',this.color,1,"",true).svg(coeff)+`\n`
          break;
      }
    }
    code = `<g id="${this.id}">${code}</g>`
    return code;
  };
  this.tikz = function () {
    let code = "";
    let style = "";
    if (this.color != "black") {
      style = `,${this.color}`;
    }
    for (let point of points) {
      code += `\t\\draw (${point.x},${point.y}) node[${point.positionLabel}${style}] {$${point.nom}$};\n`;
    }
    return code;
  };
}
export function labelPoint(...args) {
  return new LabelPoint(...args);
}
/**
 * P = barycentre(p,'P','below') Crée le point P barycentre du polygone p, son nom 'P' sera placé sous le point si il est tracé et labelisé.
 * @param {Polygone} p
 * @Auteur Jean-Claude Lhote
 */
export function barycentre(p, nom, positionLabel = "above") {
  let sommex = 0,
    sommey = 0,
    nbsommets = 0;
  for (let point of p.listePoints) {
    sommex += point.x;
    sommey += point.y;
    nbsommets++;
  }
  let x = calcul(sommex / nbsommets);
  let y = calcul(sommey / nbsommets);
  return new Point(x, y, nom, positionLabel);
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% LES DROITES %%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * d = droite(A,B) // La droite passant par A et B
 * d = droite(A,B,'(d)') // La droite passant par A et B se nommant (d)
 * d = droite(a,b,c,'(d)') // La droite définie par les coefficients de ax +by + c=0 (équation de la droite (a,b)!=(0,0))
 * d = droite(A,B,'(d)','blue') //La droite passant par A et B se nommant (d) et de couleur bleue
 *
 * @Auteur Jean-Claude Lhote
 */
function Droite(arg1, arg2, arg3, arg4) {
  let a,b,c
  ObjetMathalea2D.call(this);
  if (arguments.length == 2) {
    this.nom=""
    this.x1 = arg1.x;
    this.y1 = arg1.y;
    this.x2 = arg2.x;
    this.y2 = arg2.y;
    this.a = calcul(this.y1 - this.y2);
    this.b = calcul(this.x2 - this.x1);
    this.c = calcul(
      (this.x1 - this.x2) * this.y1 + (this.y2 - this.y1) * this.x1
    );
  } else if (arguments.length == 3) {
    if (typeof arg1 == "number") {
      // droite d'équation ax +by +c =0
      this.nom=""
      this.a = arg1;
      this.b = arg2;
      this.c = arg3;
      a=arg1
      b=arg2
      c=arg3
      if (egal(a, 0)) {
        this.x1 = 0;
        this.x2 = 1;
        this.y1 = calcul(-c / b);
        this.y2 = calcul(-c / b);
      } else if (egal(b, 0)) {
        this.y1 = 0;
        this.y2 = 1;
        this.x1 = calcul(-c / a);
        this.x2 = calcul(-c / a);
      } else {
        this.x1 = 0;
        this.y1 = calcul(-c / b);
        this.x2 = 1;
        this.y2 = calcul((-c - a) / b);
      }
    } else {
      this.x1 = arg1.x;
      this.y1 = arg1.y;
      this.x2 = arg2.x;
      this.y2 = arg2.y;
      this.a = calcul(this.y1 - this.y2);
      this.b = calcul(this.x2 - this.x1);
      this.c = calcul(
        (this.x1 - this.x2) * this.y1 + (this.y2 - this.y1) * this.x1
      );
      this.nom = arg3;
    }
  } else if (arguments.length == 4) {
    if (typeof arg1 == "number") {
      this.a = arg1;
      this.b = arg2;
      this.c = arg3;
      a=arg1
      b=arg2
      c=arg3
      this.nom=arg4
      if (egal(a, 0)) {
        this.x1 = 0;
        this.x2 = 1;
        this.y1 = calcul(-c / b);
        this.y2 = calcul(-c / b);
      } else if (egal(b, 0)) {
        this.y1 = 0;
        this.y2 = 1;
        this.x1 = calcul(-c / a);
        this.x2 = calcul(-c / a);
      } else {
        this.x1 = 0;
        this.y1 = calcul(-c / b);
        this.x2 = 1;
        this.y2 = calcul((-c - a) / b);
      }
    } else {
      this.x1 = arg1.x;
      this.y1 = arg1.y;
      this.x2 = arg2.x;
      this.y2 = arg2.y;
      this.a = calcul(this.y1 - this.y2);
      this.b = calcul(this.x2 - this.x1);
      this.c = calcul(
        (this.x1 - this.x2) * this.y1 + (this.y2 - this.y1) * this.x1
      );
      this.nom = arg3;
      this.color = arg4;
    }
  }
  if (this.b != 0) this.pente = calcul(-this.a / this.b);
  /*	if (this.b==0) {
		this.angleAvecHorizontale = 90
	} else {
		this.angleAvecHorizontale = calcul(Math.atan(this.pente)*180/Math.PI,1)

	}
	*/
  this.normal = vecteur(this.a, this.b);
  this.directeur = vecteur(this.b,- this.a);
  this.angleAvecHorizontale = angleOriente(
    point(1, 0),
    point(0, 0),
    point(this.directeur.x, this.directeur.y)
  );
  let absNom,ordNom,leNom
 // let pointXmin=pointSurDroite(this,fenetreMathalea2d[0])
  if (this.nom!='') {
    if (egal(this.b,0,0.1)) { // ax+c=0 x=-c/a est l'équation de la droite
      absNom=-this.c/this.a+0.8 // l'abscisse du label est décalé de 0.8
      ordNom=mathalea.fenetreMathalea2d[1]+1 // l'ordonnée du label est ymin +1
    }
    else if (egal(this.a,0,0.1)){ //by+c=0 y=-c/b est l'équation de la droite
      absNom=mathalea.fenetreMathalea2d[0]+0.8 // l'abscisse du label est xmin +1
      ordNom=-this.c/this.b+0.8 // l'ordonnée du label est décalée de 0.8 
    }
    else { // a et b sont différents de 0 ax+by+c=0 est l'équation
    // y=(-a.x-c)/b est l'aquation cartésienne et x=(-by-c)/a
    let y0=(-this.a*(mathalea.fenetreMathalea2d[0]+1)-this.c)/this.b
    let y1=(-this.a*(mathalea.fenetreMathalea2d[2]-1)-this.c)/this.b
    let x0=(-this.b*(mathalea.fenetreMathalea2d[1]+1)-this.c)/this.a
    let x1=(-this.b*(mathalea.fenetreMathalea2d[3]-1)-this.c)/this.a
    if (y0>mathalea.fenetreMathalea2d[1]&&y0<mathalea.fenetreMathalea2d[3]) {
      absNom=mathalea.fenetreMathalea2d[0]+1
      ordNom=y0+this.pente
    }
    else {
      if (y1>mathalea.fenetreMathalea2d[1]&&y1<mathalea.fenetreMathalea2d[3]) {
        absNom=mathalea.fenetreMathalea2d[2]-1
        ordNom=y1-this.pente
      }
      else {
        if (x0>mathalea.fenetreMathalea2d[0]&&x0<mathalea.fenetreMathalea2d[2]) {
          absNom=x0
          ordNom=mathalea.fenetreMathalea2d[1]+math.abs(this.pente)
        }
        else {
          if (x1>mathalea.fenetreMathalea2d[0]&&x1<mathalea.fenetreMathalea2d[2]) {
            absNom=x1
            ordNom=mathalea.fenetreMathalea2d[3]+this.pente
          }
          else {
            absNom=(mathalea.fenetreMathalea2d[0]+mathalea.fenetreMathalea2d[2])/2
            ordNom=pointSurDroite(this,absNom).y
          }
        }
      }
    }
  }
  absNom=arrondi(absNom,2)
  ordNom=arrondi(ordNom,2)
    leNom=texteParPosition(this.nom,absNom,ordNom,"milieu",this.color,1.2,"milieu",true)

  }
  this.svg = function (coeff) {
   
    if (this.epaisseur != 1) {
      this.style += ` stroke-width="${this.epaisseur}" `;
    }
    if (Boolean(this.pointilles)) {
      switch (this.pointilles) {
        case 1 :
          this.style += ` stroke-dasharray="6 10" `;
          break;
        case 2 : 
        this.style += ` stroke-dasharray="6 3" `;
        break;       
        case 3 :
          this.style += ` stroke-dasharray="3 2 6 2 " `;
          break;      
        default : 
        this.style += ` stroke-dasharray="5 5" `;
        break; 
      }

    }
    if (this.opacite != 1) {
      this.style += ` stroke-opacity="${this.opacite}" `;
    }
    let A = point(this.x1, this.y1);
    let B = point(this.x2, this.y2);
    let A1 = pointSurSegment(A, B, -50);
    let B1 = pointSurSegment(B, A, -50);
    if (this.nom =="")
       return `<line x1="${A1.xSVG(coeff)}" y1="${A1.ySVG(coeff)}" x2="${B1.xSVG(
      coeff
    )}" y2="${B1.ySVG(coeff)}" stroke="${this.color}" ${this.style} id ="${this.id}" />`;
    else return `<line x1="${A1.xSVG(coeff)}" y1="${A1.ySVG(coeff)}" x2="${B1.xSVG(
      coeff
    )}" y2="${B1.ySVG(coeff)}" stroke="${this.color}" ${this.style} id ="${this.id}" />`+leNom.svg(coeff);
  };

  this.tikz = function () {
    let tableauOptions = [];
    if (this.color.length > 1 && this.color !== "black") {
      tableauOptions.push(this.color);
    }
    if (this.epaisseur != 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`);
    }
    if (Boolean(this.pointilles)) {
     switch (this.pointilles) {
        case 1 :
          tableauOptions.push(` dash dot `);
          break;
        case 2 : 
        tableauOptions.push(` dash dash dot `);
        break;       
        case 3 :
          tableauOptions.push(` dash dot dot `);
          break;      
        default : 
          tableauOptions.push(` dashed `);
        break; 
      }
    }

    if (this.opacite != 1) {
      tableauOptions.push(`opacity = ${this.opacite}`);
    }

    let optionsDraw = [];
    if (tableauOptions.length > 0) {
      optionsDraw = "[" + tableauOptions.join(",") + "]";
    }
    let A = point(this.x1, this.y1);
    let B = point(this.x2, this.y2);
    let A1 = pointSurSegment(A, B, -50);
    let B1 = pointSurSegment(B, A, -50);

    if (this.nom!="")
        return `\\draw${optionsDraw} (${A1.x},${A1.y})--(${B1.x},${B1.y});`+leNom.tikz();
    else 
         return `\\draw${optionsDraw} (${A1.x},${A1.y})--(${B1.x},${B1.y});`;
      
  };
  this.svgml = function(coeff,amp){
    let A = point(this.x1, this.y1);
    let B = point(this.x2, this.y2);
    let A1 = pointSurSegment(A, B, -50);
    let B1 = pointSurSegment(B, A, -50);
    let s=segment(A1,B1,this.color)
    s.isVisible=false
  return s.svgml(coeff,amp)+leNom.svg(coeff)
  }
  this.tikzml = function(amp){
    let A = point(this.x1, this.y1);
    let B = point(this.x2, this.y2);
    let A1 = pointSurSegment(A, B, -50);
    let B1 = pointSurSegment(B, A, -50);
    let s=segment(A1,B1,this.color)
    s.isVisible=false
  return s.tikzml(amp)+leNom.tikz()
  }
}
export function droite(...args) {
  return new Droite(...args);
}

/**
 * d = droiteParPointEtVecteur(A,v,'d1',red') //Droite passant par A, de vecteur directeur v et de couleur rouge
 * @Auteur Jean-Claude Lhote
 */
export function droiteParPointEtVecteur(A, v, nom = "", color = "black") {
  let B = point(calcul(A.x + v.x), calcul(A.y + v.y));
  return droite(A, B, nom, color);
}
/**
 * d = droiteParPointEtParallele(A,d,'d1',red') // Trace en rouge la parallèle à la droite (d) passant par A
 * @Auteur Jean-Claude Lhote
 */
export function droiteParPointEtParallele(A, d, nom = "", color = "black") {
  return droiteParPointEtVecteur(A, d.directeur, nom, color);
}
/**
 * d = droiteParPointEtPerpendiculaire(A,d,'d1',red') // Trace en rouge la perpendiculaire à la droite (d) passant par A
 * @Auteur Jean-Claude Lhote
 */
export function droiteParPointEtPerpendiculaire(A, d, nom = "", color = "black") {
  return droiteParPointEtVecteur(A, d.normal, nom, color);
}
/**
 * d = droiteHorizontaleParPoint(A,'d1',red') // Trace en rouge la droite horizontale passant par A
 * @Auteur Jean-Claude Lhote
 */
export function droiteHorizontaleParPoint(A, nom = "", color = "black") {
  return droiteParPointEtPente(A, 0, nom, color);
}
/**
 * d = droiteVerticaleParPoint(A,'d1',red') // Trace en rouge la droite verticale passant par A
 * @Auteur Jean-Claude Lhote
 */
export function droiteVerticaleParPoint(A, nom = "", color) {
  return droiteParPointEtVecteur(A, vecteur(0, 1), nom, color);
}

/**
 * d = droiteParPointEtPente(A,p,'d1',red') //Droite passant par A, de pente p et de couleur rouge
 *@Auteur Jean-Claude Lhote
 */
export function droiteParPointEtPente(A, k, nom = "", color = "black") {
  let B = point(calcul(A.x + 1), calcul(A.y + k));
  return droite(A, B, nom, color);
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%% LES DROITES REMARQUABLES %%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * d = mediatrice(A,B) // Médiatrice de [AB]
 * d = mediatrice(A,B,'d', 'blue') // Médiatrice de [AB] nommée (d) en bleu
 *
 * @Auteur Rémi Angot
 */
export function mediatrice(A, B, nom = "", color = "black") {
  let O = milieu(A, B);
  let M = rotation(A, O, 90);
  let N = rotation(A, O, -90);
  return droite(M, N, nom, color);
}

/**
 * m = codageMediatrice(A,B,'blue','×') // Ajoute le codage du milieu et de l'angle droit pour la médiatrice de [AB] en bleu
 *
 * @Auteur Rémi Angot
 */
function CodageMediatrice(A, B, color = "black", mark = "×") {
  ObjetMathalea2D.call(this);
  this.color = color;
  let O = milieu(A, B);
  let M = rotation(A, O, 90);
  let c = codageAngleDroit(M, O, B, this.color);
  let v = codeSegments(mark, this.color, A, O, O, B);
  c.isVisible = false;
  v.isVisible = false;
  this.svg = function (coeff) {
    let code = `<g id="${this.id}">${c.svg(coeff) + "\n" + v.svg(coeff)}</g>`
    return code;
  };
  this.tikz = function () {
    return c.tikz() + "\n" + v.tikz();
  };
  this.svgml = function (coeff,amp) {
    return c.svgml(coeff,amp) + "\n" + v.svg(coeff);
  };
  this.tikzml = function (amp) {
    return c.tikzml(amp) + "\n" + v.tikz();
  };
}

export function codageMediatrice(...args) {
  return new CodageMediatrice(...args);
}
/**
 * c=codageMilieu(A,B,'red','||',false) marque les deux moitiés du segment [AB] avec || en rouge, le milieu n'est pas tracé car dernier argument à false.
 * m=codageMilieu(C,D) marque l'emplacement du milieu de [CD] et marque avec X les deux moitiés.
 * @Auteur Jean-Claude Lhote
 */
function CodageMilieu(A,B, color = "black", mark = "×",mil=true) {
  ObjetMathalea2D.call(this);
  this.color=color
  let O = milieu(A, B);
  let d = droite(A,B);
  let M = tracePointSurDroite(O,d);
  let v = codeSegments(mark,color,A,O,O,B);
  let code = "";
  this.svg =function(coeff) {
    if (mil) code = M.svg(coeff) + "\n" +v.svg(coeff);
    else code =  v.svg(coeff);
    code = `<g id="${this.id}">${code}</g>`
    M.isVisible = false;
    d.isVisible = false;
    v.isVisible = false
    return code
  }
  this.tikz = function() {
    if (mil) return M.tikz()+ "\n" + v.tikz();
    else return  v.tikz();
  }
}
 export function codageMilieu(...args) {
   return new CodageMilieu(...args)
 }
/**
 * m = constructionMediatrice(A,B,false,'blue','×') // Trace et code la médiatrice en laissant apparent les traits de construction au compas
 *
 * @Auteur Rémi Angot
 */
function ConstructionMediatrice(
  A,
  B,
  detail = false,
  color = "blue",
  markmilieu = "×",
  markrayons = "||",
  couleurMediatrice = "red",
  epaisseurMediatrice = 2
) {
  ObjetMathalea2D.call(this);
  let O = milieu(A, B);
  let m = rotation(A, O, 90);
  let n = rotation(A, O, -90);
  let M = pointSurSegment(O, m, longueur(A, B) * 0.75);
  let N = pointSurSegment(O, n, longueur(A, B) * 0.75);
  let arcm1 = traceCompas(A, M);
  let arcm2 = traceCompas(B, M);
  let arcn1 = traceCompas(A, N);
  let arcn2 = traceCompas(B, N);
  let d = mediatrice(A, B);
  arcm1.isVisible = false;
  arcm2.isVisible = false;
  arcn1.isVisible = false;
  arcn2.isVisible = false;
  d.isVisible = false;
  d.color = couleurMediatrice;
  d.epaisseur = epaisseurMediatrice;
  let codage = codageMediatrice(A, B, color, markmilieu);
  codage.isVisible = false;
  let objets = [arcm1, arcm2, arcn1, arcn2, d, codage];
  if (detail) {
    let sAM = segment(A, M);
    sAM.pointilles = true;
    let sBM = segment(B, M);
    sBM.pointilles = true;
    let sAN = segment(A, N);
    sAN.pointilles = true;
    let sBN = segment(B, N);
    sBN.pointilles = true;
    let codes = codeSegments(markrayons, color, A, M, B, M, A, N, B, N);
    objets.push(sAM, sBM, sAN, sBN, codes,codage);
  }
  this.svg = function (coeff) {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.svg(coeff);
    }
    code = `<g id="${this.id}">${code}</g>`
    return code;
  };
  this.tikz = function () {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.tikz();
    }
    return code;
  };
  this.svgml =function(coeff,amp) {
    let code = "";
    for (let objet of objets) {
     if (typeof(objet.svgml)=='undefined') code += "\n\t" + objet.svg(coeff);
     else code += "\n\t" + objet.svgml(coeff,amp);
    }
    return code;
  }
  this.tikzml = function (amp) {
    let code = "";
    for (let objet of objets) {
      if (typeof(objet.tikzml)=='undefined') code += "\n\t" + objet.tikz();
      else code += "\n\t" + objet.tikzml(amp);
    }
    return code;
  };

}

export function constructionMediatrice(...args) {
  return new ConstructionMediatrice(...args);
}
/**
 * d = bissectrice(A,O,B) // Bissectrice de l'angle AOB
 * d = bissectrice(A,O,B,'blue') // Bissectrice de l'angle AOB en bleu
 *
 * @Auteur Rémi Angot
 */
export function bissectrice(A, O, B, color = "black") {
  let demiangle = calcul(angleOriente(A, O, B) / 2);
  let m = pointSurSegment(O, A, 3);
  let M = rotation(m, O, demiangle);
  return demiDroite(O, M, color);
}
/**
 * m = codagebissectrice(A,O,B) ajoute des arcs marqués de part et d'autres de la bissectrice mais ne trace pas celle-ci.
 * @Auteur Jean-Claude Lhote
 */
function CodageBissectrice(A, O, B, color = "black", mark = "×") {
  ObjetMathalea2D.call(this);
  this.color = color;
  this.mark=mark
  this.centre=O
  this.depart= pointSurSegment(O, A, 1.5);
  this.demiangle = calcul(angleOriente(A, O, B) / 2);
  this.lieu = rotation(this.depart, O, this.demiangle);
  this.arrivee = pointSurSegment(O, B, 1.5);

  this.svg = function (coeff) {
    let a1=codeAngle(pointSurSegment(this.centre,this.depart,30/coeff), O, this.demiangle,30/coeff,this.mark, this.color,2,1);
    let a2=codeAngle(pointSurSegment(this.centre,this.lieu,30/coeff), O, this.demiangle,30/coeff,this.mark, this.color,2,1);    
    return (
      a1.svg(coeff) +
      "\n" +
      a2.svg(coeff) +
      "\n"
     );
  };
  this.tikz = function () {
    let a1=codeAngle(pointSurSegment(this.centre,this.depart,1.5/mathalea.scale), O, this.demiangle,1.5/mathalea.scale,this.mark, this.color,2,1);
    let a2=codeAngle(pointSurSegment(this.centre,this.lieu,1.5/mathalea.scale), O, this.demiangle,1.5/mathalea.scale,this.mark, this.color,2,1);    
    return a1.tikz() + "\n" + a2.tikz() + "\n";
  };
}

export function codageBissectrice(...args) {
  return new CodageBissectrice(...args);
}

/**
 * m = constructionMediatrice(A,B,false,'blue','×') // Trace et code la médiatrice en laissant apparent les traits de construction au compas
 *
 * @Auteur Rémi Angot
 */
function ConstructionBissectrice(
  A,
  O,
  B,
  detail = false,
  color = "blue",
  mark = "×",
  tailleLosange = 5,
  couleurBissectrice = "red",
  epaiseurBissectrice = 2
) {
  let M = pointSurSegment(O, A, tailleLosange);
  let N = pointSurSegment(O, B, tailleLosange);
  let sOM = segment(O, M);
  let sON = segment(O, N);
  sOM.styleExtremites = "-|";
  sON.styleExtremites = "-|";
  let dMN = droite(M, N);
  dMN.isVisible = false;
  let P = symetrieAxiale(O, dMN);
  let tNP = traceCompas(N, P);
  let tMP = traceCompas(M, P);
  let d = bissectrice(A, O, B);
  d.color = couleurBissectrice;
  d.epaisseur = epaiseurBissectrice;
  let objets = [sOM, sON, tNP, tMP, d];
  if (detail) {
    let sMP = segment(M, P);
    let sNP = segment(N, P);
    sMP.pointilles = true;
    sNP.pointilles = true;
    let codes = codeSegments(mark, color, O, M, M, P, O, N, N, P);
    objets.push(sMP, sNP, codes);
  }
  this.svg = function (coeff) {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.svg(coeff);
    }
    return code;
  };
  this.tikz = function () {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.tikz();
    }
    return code;
  };
}

export function constructionBissectrice(...args) {
  return new ConstructionBissectrice(...args);
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%% LES LIGNES BRISÉES %%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * polyline(A,B,C,D,E) //Trace la ligne brisée ABCDE
 *
 * @Auteur Rémi Angot
 */
function Polyline(...points) {
  ObjetMathalea2D.call(this);
  if (Array.isArray(points[0])) {
    //Si le premier argument est un tableau
    this.listePoints = points[0];
    this.color = points[1];
  } else {
    this.listePoints = points;
  }
  this.nom = "";
  if (points.length < 15) {
    // Ne nomme pas les ligne brisée trop grande (pratique pour les courbes de fonctions)
    for (let point of points) {
      this.nom += point.nom;
    }
  }
  this.svg = function (coeff) {
    
    if (this.epaisseur != 1) {
      this.style += ` stroke-width="${this.epaisseur}" `;
    }
    if (Boolean(this.pointilles)) {
      switch (this.pointilles) {
        case 1 :
          this.style += ` stroke-dasharray="6 10" `;
          break;
        case 2 : 
        this.style += ` stroke-dasharray="6 3" `;
        break;       
        case 3 :
          this.style += ` stroke-dasharray="3 2 6 2 " `;
          break;      
        default : 
        this.style += ` stroke-dasharray="5 5" `;
        break; 
      }

    }
    if (this.opacite != 1) {
      this.style += ` stroke-opacity="${this.opacite}" `;
    }
    let binomeXY = "";
    for (let point of this.listePoints) {
      binomeXY += `${calcul(point.x * coeff)},${calcul(-point.y * coeff)} `;
    }
    return `<polyline points="${binomeXY}" fill="none" stroke="${this.color}" ${this.style} id="${this.id}" />`;
  };
  this.tikz = function () {
    let tableauOptions = [];
    if (this.color.length > 1 && this.color !== "black") {
      tableauOptions.push(this.color);
    }
    if (this.epaisseur != 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`);
    }
    if (Boolean(this.pointilles)) {
      switch (this.pointilles) {
         case 1 :
           tableauOptions.push(` dash dot `);
           break;
         case 2 : 
         tableauOptions.push(` dash dash dot `);
         break;       
         case 3 :
           tableauOptions.push(` dash dot dot `);
           break;      
         default : 
           tableauOptions.push(` dashed `);
         break; 
       }
     }
     if (this.opacite != 1) {
      tableauOptions.push(`opacity = ${this.opacite}`);
    }

    let optionsDraw = [];
    if (tableauOptions.length > 0) {
      optionsDraw = "[" + tableauOptions.join(",") + "]";
    }
    let binomeXY = "";
    for (let point of this.listePoints) {
      binomeXY += `(${point.x},${point.y})--`;
    }
    binomeXY = binomeXY.substr(0, binomeXY.length - 2);
    return `\\draw${optionsDraw} ${binomeXY};`;
  };
  this.svgml=function(coeff,amp) {
    let code="",s
    for (let k=1;k<this.listePoints.length;k++) {
      s=segment(this.listePoints[k-1],this.listePoints[k])
      s.epaisseur=this.epaisseur
      s.color=this.color
      s.opacite=this.opacite
      code+=s.svgml(coeff,amp)
    }
    return code;
  
  }
  this.tikzml=function(amp) {
    let tableauOptions = [];
    if (this.color.length > 1 && this.color !== "black") {
      tableauOptions.push(this.color);
    }
    if (this.epaisseur != 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`);
    }
    if (this.opacite != 1) {
      tableauOptions.push(`opacity = ${this.opacite}`);
    }
    tableauOptions.push(`decorate,decoration={random steps , amplitude = ${amp}pt}`);

    let optionsDraw = [];
    if (tableauOptions.length > 0) {
      optionsDraw = "[" + tableauOptions.join(",") + "]";
    }
    let binomeXY = "";
    for (let point of this.listePoints) {
      binomeXY += `(${point.x},${point.y})--`;
    }
    binomeXY = binomeXY.substr(0, binomeXY.length - 2);
    return `\\draw${optionsDraw} ${binomeXY};`;
  }
}
export function polyline(...args) {
  return new Polyline(...args);
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%% 3D EN PERSPECTIVE CAVALIERES %%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * 
 * @param {int} Longueur 
 * @param {int} largeur 
 * @param {int} profondeur
 *  
 */
function Pave(L=10, l=5, h=5, origine=point(0,0), cote=true, angleDeFuite=30, coefficientDeFuite=.5){
  let objets = [];
  let A = origine, B = point(A.x+L,A.y), C = point(B.x,B.y+l) , D = point(A.x,A.y+l);
  let p = polygone(A,B,C,D);
  let E = pointAdistance(A,calcul(h*coefficientDeFuite),angleDeFuite);
  let F = translation(B,vecteur(A,E));
  let G = translation(C,vecteur(A,E));
  let H = translation(D,vecteur(A,E));
  let sAE = segment(A,E);
  let sBF = segment(B,F);
  let sCG = segment(C,G);
  let sDH = segment(D,H);
  let sEF = segment(E,F);
  let sFG = segment(F,G);
  let sGH = segment(G,H);
  let sHE = segment(H,E);
  sAE.pointilles = true;
  sEF.pointilles = true;
  sHE.pointilles = true;

  objets.push(p, sAE, sBF, sCG, sDH, sEF, sFG, sGH, sHE);
  if (cote) {
    objets.push(afficheCoteSegment(segment(B,A),'',1));
    objets.push(afficheCoteSegment(segment(A,D),'',1));
    objets.push(afficheCoteSegment(segment(F,B),h+' cm',1));
  }
  this.svg = function (coeff) {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.svg(coeff);
    }
    return code;
  };
  this.tikz = function () {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.tikz();
    }
    return code;
  };
}

export function pave(...args){
  return new Pave(...args)
}


/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%% LES VECTEURS %%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * v = vecteur('V') // son nom
 * v = vecteur(x,y) // ses composantes
 * v = vecteur(A,B) // son origine et son extrémité (deux Points)
 * v = vecteur(x,y,'v') // son nom et ses composantes.
 *
 * @Auteur Jean-Claude Lhote et Rémi Angot
 */
function Vecteur(arg1, arg2, nom = "") {
  ObjetMathalea2D.call(this);
  if (arguments.length == 1) {
    this.nom = arg1;
  } else {
    if (typeof arg1 == "number") {
      this.x = arg1;
      this.y = arg2;
    } else {
      this.x = calcul(arg2.x - arg1.x);
      this.y = calcul(arg2.y - arg1.y);
    }
    this.nom = nom;
  }
  this.norme = function () {
    return calcul(Math.sqrt(this.x ** 2 + this.y ** 2));
  };
  this.oppose = function () {
    this.x = -this.x;
    this.y = -this.y;
  };
  this.xSVG = function (coeff) {
    return this.x * coeff;
  };
  this.ySVG = function (coeff) {
    return -this.y * coeff;
  };
  this.representant = function (A) {
    let B = point(A.x + this.x, A.y + this.y);
    let s = segment(A, B);
    s.styleExtremites = "|->";
    return s
  };
}
export function vecteur(...args) {
  return new Vecteur(...args);
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%% LES SEGMENTS %%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * s = segment(A,B) //Segment d'extrémités A et B
 * s = segment(A,B,'blue') //Segment d'extrémités A et B et de couleur bleue
 * s = segment(x1,y1,x2,y2) //Segment défini par les coordonnées des deux extrémités
 * s = segment(x1,y1,x2,y2,'blue') //Segment défini par les coordonnées des deux extrémités et de couleur bleue
 *
 * @Auteur Rémi Angot
 */
function Segment(arg1, arg2, arg3, arg4, color) {
  ObjetMathalea2D.call(this);
  this.styleExtremites = "";
  this.tailleExtremites=4;
  if (arguments.length == 2) {
    this.x1 = arg1.x;
    this.y1 = arg1.y;
    this.x2 = arg2.x;
    this.y2 = arg2.y;
  } else if (arguments.length == 3) {
    this.x1 = arg1.x;
    this.y1 = arg1.y;
    this.x2 = arg2.x;
    this.y2 = arg2.y;
    this.color = arg3;
  } else if (arguments.length == 4) {
    this.x1 = arrondi(arg1,2);
    this.y1 = arrondi(arg2,2);
    this.x2 = arrondi(arg3,2);
    this.y2 = arrondi(arg4,2);
  } else {
    // 5 arguments
    this.x1 = arrondi(arg1,2);
    this.y1 = arrondi(arg2,2);
    this.x2 = arrondi(arg3,2);
    this.y2 = arrondi(arg4,2);
    this.color = color;
  }
  this.extremite1 = point(this.x1, this.y1);
  this.extremite2 = point(this.x2, this.y2);
  this.longueur = calcul(
    Math.sqrt((this.x2 - this.x1) ** 2 + (this.y2 - this.y1) ** 2)
  );
  //	this.angleAvecHorizontale = calcul(Math.atan2(this.y2-this.y1, this.x2-this.x1)*180/Math.PI);
  this.angleAvecHorizontale = angleOriente(
    point(this.x1 + 1, this.y1),
    this.extremite1,
    this.extremite2
  );
  this.svg = function (coeff) {
    let h=this.tailleExtremites;
    if (this.epaisseur != 1) {
      this.style += ` stroke-width="${this.epaisseur}" `;
    }
    if (Boolean(this.pointilles)) {
      switch (this.pointilles) {
        case 1 :
          this.style += ` stroke-dasharray="6 10" `;
          break;
        case 2 : 
        this.style += ` stroke-dasharray="6 3" `;
        break;       
        case 3 :
          this.style += ` stroke-dasharray="3 2 6 2 " `;
          break;      
        default : 
        this.style += ` stroke-dasharray="5 5" `;
        break; 
      }

    }
    if (this.opacite != 1) {
      this.style += ` stroke-opacity="${this.opacite}" `;
    }
    let code = "";
    let A = point(this.x1, this.y1);
    let B = point(this.x2, this.y2);
    if (this.styleExtremites.length > 1) {
      if (this.styleExtremites.substr(-1) == "|") {
        //si ça termine par | on le rajoute en B
        let M = pointSurSegment(B, A, h/mathalea.pixelsParCm);
        let B1 = rotation(M, B, 90);
        let B2 = rotation(M, B, -90);
        code += `<line x1="${B1.xSVG(coeff)}" y1="${B1.ySVG(
          coeff
        )}" x2="${B2.xSVG(coeff)}" y2="${B2.ySVG(coeff)}" stroke="${
          this.color
        }" />`;
      }
      if (this.styleExtremites.substr(-1) == ">") {
        //si ça termine par > on rajoute une flèche en B
        let M = pointSurSegment(B, A, h/mathalea.pixelsParCm);
        let B1 = rotation(B, M, 90);
        let B2 = rotation(B, M, -90);
        code += `<line x1="${B.xSVG(coeff)}" y1="${B.ySVG(
          coeff
        )}" x2="${B1.xSVG(coeff)}" y2="${B1.ySVG(coeff)}" stroke="${
          this.color
        }" />`;
        code += `\n\t<line x1="${B.xSVG(coeff)}" y1="${B.ySVG(
          coeff
        )}" x2="${B2.xSVG(coeff)}" y2="${B2.ySVG(coeff)}" stroke="${this.color}" />`;
      }
      if (this.styleExtremites.substr(-1) == "<") {
        //si ça termine par < on rajoute une flèche inversée en B
        let M = pointSurSegment(B, A, -h/mathalea.pixelsParCm);
        let B1 = rotation(B, M, 90);
        let B2 = rotation(B, M, -90);
        code += `<line x1="${B.xSVG(coeff)}" y1="${B.ySVG(
          coeff
        )}" x2="${B1.xSVG(coeff)}" y2="${B1.ySVG(coeff)}" stroke="${
          this.color
        }" />`;
        code += `\n\t<line x1="${B.xSVG(coeff)}" y1="${B.ySVG(
          coeff
        )}" x2="${B2.xSVG(coeff)}" y2="${B2.ySVG(coeff)}" stroke="${
          this.color
        }" />`;
      }
      if (this.styleExtremites[0] == "<") {
        //si ça commence par < on rajoute une flèche en A
        let M = pointSurSegment(A, B, h/mathalea.pixelsParCm);
        let A1 = rotation(A, M, 90);
        let A2 = rotation(A, M, -90);
        code += `<line x1="${A.xSVG(coeff)}" y1="${A.ySVG(
          coeff
        )}" x2="${A1.xSVG(coeff)}" y2="${A1.ySVG(coeff)}" stroke="${
          this.color
        }" />`;
        code += `\n\t<line x1="${A.xSVG(coeff)}" y1="${A.ySVG(
          coeff
        )}" x2="${A2.xSVG(coeff)}" y2="${A2.ySVG(coeff)}" stroke="${
          this.color
        }" />`;
      }
      if (this.styleExtremites[0] == ">") {
        //si ça commence par > on rajoute une flèche inversée en A
        let M = pointSurSegment(A, B, -h/mathalea.pixelsParCm);
        let A1 = rotation(A, M, 90);
        let A2 = rotation(A, M, -90);
        code += `<line x1="${A.xSVG(coeff)}" y1="${A.ySVG(
          coeff
        )}" x2="${A1.xSVG(coeff)}" y2="${A1.ySVG(coeff)}" stroke="${
          this.color
        }" />`;
        code += `\n\t<line x1="${A.xSVG(coeff)}" y1="${A.ySVG(
          coeff
        )}" x2="${A2.xSVG(coeff)}" y2="${A2.ySVG(coeff)}" stroke="${
          this.color
        }" />`;
      }
      if (this.styleExtremites[0] == "|") {
        //si ça commence par | on le rajoute en A
        let N = pointSurSegment(A, B, h/mathalea.pixelsParCm);
        let A1 = rotation(N, A, 90);
        let A2 = rotation(N, A, -90);
        code += `<line x1="${A1.xSVG(coeff)}" y1="${A1.ySVG(
          coeff
        )}" x2="${A2.xSVG(coeff)}" y2="${A2.ySVG(coeff)}" stroke="${
          this.color
        }" />`;
      }
    }
    code += `\n\t<line x1="${A.xSVG(coeff)}" y1="${A.ySVG(coeff)}" x2="${B.xSVG(
      coeff
    )}" y2="${B.ySVG(coeff)}" stroke="${this.color}" ${this.style} />`;
    if (this.styleExtremites.length>0){
      code = `<g id="${this.id}">${code}</g>`
    } else {
      code = code.replace('/>', `id="${this.id}" />`)
    }
    return code;
  };
  this.tikz = function () {
    let optionsDraw = [];
    let tableauOptions = [];
    if (this.color.length > 1 && this.color !== "black") {
      tableauOptions.push(this.color);
    }
    if (this.epaisseur != 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`);
    }
    if (this.opacite != 1) {
      tableauOptions.push(`opacity = ${this.opacite}`);
    }
    if (Boolean(this.pointilles)) {
      switch (this.pointilles) {
         case 1 :
           tableauOptions.push(` dash dot `);
           break;
         case 2 : 
         tableauOptions.push(` dash dash dot `);
         break;       
         case 3 :
           tableauOptions.push(` dash dot dot `);
           break;      
         default : 
           tableauOptions.push(` dashed `);
         break; 
       }
     }
     if (this.styleExtremites.length > 1) {
      tableauOptions.push(this.styleExtremites);
    }
    if (tableauOptions.length > 0) {
      optionsDraw = "[" + tableauOptions.join(",") + "]";
    }
    return `\\draw${optionsDraw} (${this.x1},${this.y1})--(${this.x2},${this.y2});`;
  };
  this.svgml = function(coeff,amp){
    this.style=`fill="none"`;
    if (this.epaisseur != 1) {
      this.style += ` stroke-width="${this.epaisseur}" `;
    }
    if (this.opacite != 1) {
      this.style += ` stroke-opacity="${this.opacite}" `;
    }
 
    let A = point(this.x1, this.y1);
    let B = point(this.x2, this.y2);
    let l=longueur(A,B)
    let dx=(B.xSVG(coeff)-A.xSVG(coeff))/l/2,dy=(B.ySVG(coeff)-A.ySVG(coeff))/l/2
    let code =`<path d="M ${A.xSVG(coeff)},${A.ySVG(coeff)} C ${Math.round(A.xSVG(coeff),0)},${arrondi(A.ySVG(coeff))} `
    for (let k=0;k<2*l+0.25;k+=0.25) {
      code +=`${Math.round(A.xSVG(coeff)+k*dx+randint(-1,1)*amp)},${Math.round(A.ySVG(coeff)+k*dy+randint(-1,1)*amp)} `
    }
    code +=` ${Math.round(B.xSVG(coeff),0)},${arrondi(B.ySVG(coeff))} ${B.xSVG(coeff)},${B.ySVG(coeff)} " stroke="${this.color}" ${this.style}/>`
    return code;
 }
  this.tikzml = function(amp){
    let A = point(this.x1, this.y1);
    let B = point(this.x2, this.y2);
    let optionsDraw = [];
    let tableauOptions = [];
    if (this.color.length > 1 && this.color !== "black") {
      tableauOptions.push(this.color);
    }
    if (this.epaisseur != 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`);
    }
 
    if (this.opacite != 1) {
      tableauOptions.push(`opacity = ${this.opacite}`);
    }
    if (this.styleExtremites.length > 1) {
      tableauOptions.push(this.styleExtremites);
    }
    tableauOptions.push(`decorate,decoration={random steps , amplitude = ${amp}pt}`);
    optionsDraw = "[" + tableauOptions.join(",") + "]";


    let code=`\\draw${optionsDraw} (${A.x},${A.y})--(${B.x},${B.y});`
    return code
 
  }
}
export function segment(...args) {
  return new Segment(...args);
}

/**
 * s = segmentAvecExtremites(A,B) //Segment d'extrémités A et B
 * s = segmentAvecExtremites(A,B,'blue') //Segment d'extrémités A et B et de couleur bleue
 * s = segmentAvecExtremites(x1,y1,x2,y2) //Segment définit par les coordonnées des deux extrémités
 * s = segmentAvecExtremites(x1,y1,x2,y2,'blue') //Segment définit par les coordonnées des deux extrémités et de couleur bleue
 *
 * @Auteur Rémi Angot
 */
export function segmentAvecExtremites(...args) {
  let s = segment(...args);
  s.styleExtremites = "|-|";
  return s;
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%% LES DEMI-DROITES %%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * s = demiDroite(A,B) //Demi-droite d'origine A passant par B
 * s = demiDroite(A,B,'blue') //Demi-droite d'origine A passant par B et de couleur bleue
 *
 * @Auteur Rémi Angot
 */
export function demiDroite(A, B, color = "black") {
  let B1 = pointSurSegment(B, A, -10);
  return segment(A, B1, color);
}

/**
 * s = DemiDroiteAvecExtremite(A,B) //Demi-droite d'origine A passant par B avec l'origine marquée
 * s = DemiDroiteAvecExtremite(A,B,'blue') //Demi-droite d'origine A passant par B et de couleur bleue avec l'origine marquée
 *
 * @Auteur Rémi Angot
 */
export function demiDroiteAvecExtremite(A, B, color = "black") {
  let B1 = pointSurSegment(B, A, -10);
  let s = segment(A, B1, color);
  s.styleExtremites = "|-";
  return s;
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%% LES POLYGONES %%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * polygone(A,B,C,D,E) //Trace ABCDE
 * polygone([A,B,C,D],"blue") // Trace ABCD en bleu
 * @Auteur Rémi Angot
 */
function Polygone(...points) {
  ObjetMathalea2D.call(this);
  this.couleurDeRemplissage = "";
  this.opaciteDeRemplissage = 0.7;
  if (Array.isArray(points[0])) {
    //Si le premier argument est un tableau
    this.listePoints = points[0];
    if (points[1]) {
      this.color = points[1];
    }
    this.nom = this.listePoints.join();
  } else {
    this.listePoints = points;
    this.nom = this.listePoints.join();
  }
// for (let point of this.listePoints) { // fausse bonne idée que d'appeler nommePolygone ici.
//   if (point.nom!="") {
//     this.sommets=nommePolygone(this)
//     break
//   }
//}
 
  this.binomesXY = function (coeff) {
    let liste = "";
    for (let point of this.listePoints) {
      liste += `${calcul(point.x * coeff)},${calcul(-point.y * coeff)} `;
    }
    return liste;
  };
  this.svg = function (coeff) {
    if (this.epaisseur != 1) {
      this.style += ` stroke-width="${this.epaisseur}" `;
    }
    if (Boolean(this.pointilles)) {
      switch (this.pointilles) {
        case 1 :
          this.style += ` stroke-dasharray="6 10" `;
          break;
        case 2 : 
        this.style += ` stroke-dasharray="6 3" `;
        break;       
        case 3 :
          this.style += ` stroke-dasharray="3 2 6 2 " `;
          break;      
        default : 
        this.style += ` stroke-dasharray="5 5" `;
        break; 
      }

    }
    if (this.couleurDeRemplissage == "") {
      this.style += ` fill="none" `;
    } else {
      this.style += ` fill="${this.couleurDeRemplissage}" `;
      this.style += ` fill-opacity="${this.opaciteDeRemplissage}" `;
    }
    if (this.opacite != 1) {
      this.style += ` stroke-opacity="${this.opacite}" `;
    }

    return `<polygon points="${this.binomesXY(coeff)}" stroke="${this.color}" ${this.style} id="${this.id}" />`;
  };
  this.tikz = function () {
    let tableauOptions = [];
    if (this.color.length > 1 && this.color !== 'black') {
      tableauOptions.push(this.color);
    }
    if (this.epaisseur != 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`);
    }
    if (Boolean(this.pointilles)) {
      switch (this.pointilles) {
         case 1 :
           tableauOptions.push(` dash dot `);
           break;
         case 2 : 
         tableauOptions.push(` dash dash dot `);
         break;       
         case 3 :
           tableauOptions.push(` dash dot dot `);
           break;      
         default : 
           tableauOptions.push(` dashed `);
         break; 
       }
     }
     if (this.opacite != 1) {
      tableauOptions.push(`opacity=${this.opacite}`);
    }
    if (this.opaciteDeRemplissage !=1) {
      tableauOptions.push(`fill opacity = ${this.opaciteDeRemplissage}`)
    }
    if (this.couleurDeRemplissage !='') {
      tableauOptions.push(`fill = ${this.couleurDeRemplissage}`)
    }
    let optionsDraw = [];
    if (tableauOptions.length > 0) {
      optionsDraw = "[" + tableauOptions.join(",") + "]";
    }

    let binomeXY = "";
    for (let point of this.listePoints) {
      binomeXY += `(${point.x},${point.y})--`;
    }
    if (this.couleurDeRemplissage == "") {
      return `\\draw ${optionsDraw} ${binomeXY}cycle;`;
    } else {
      return `\\filldraw ${optionsDraw} ${binomeXY}cycle;`;
    }
    
  };
  this.svgml = function (coeff,amp) {
    let code ="",segment_courant
    let A=this.listePoints[0],B
    for (let k=1;k<=this.listePoints.length;k++ ) {
      B=this.listePoints[k%this.listePoints.length]
      A=this.listePoints[k-1]
      segment_courant=segment(A,B)
      segment_courant.isVisible=true
      segment_courant.epaisseur=this.epaisseur
      segment_courant.color=this.color
      segment_courant.opacite=this.opacite
      code+=segment_courant.svgml(coeff,amp)
    }
    return code
  }
  this.tikzml = function(amp) {
    let code ="",segment_courant
    let A,B
    for (let k=1;k<=this.listePoints.length;k++ ) {
      B=this.listePoints[k%this.listePoints.length]
      A=this.listePoints[k-1]
      segment_courant=segment(A,B)
      segment_courant.isVisible=false
      segment_courant.epaisseur=this.epaisseur
      segment_courant.color=this.color
      segment_courant.opacite=this.opacite
      code+='\t'+segment_courant.tikzml(amp)+'\n'
    }
    return code
  }
}
export function polygone(...args) {
  return new Polygone(...args);
}

export function polygoneAvecNom(...args) {
  let groupe
  let p=polygone(...args)
  p.sommets=nommePolygone(p)
  groupe=[p,p.sommets]
  return groupe
}

/**
 * polygoneRegulier(A,B,n) //Trace le polygone régulier direct à n côtés qui a pour côté [AB]
 *
 * @Auteur Rémi Angot
 */
export function polygoneRegulier(A, B, n, color = "black") {
  let listePoints = [A, B];
  for (let i = 1; i < n - 1; i++) {
    listePoints[i + 1] = rotation(
      listePoints[i - 1],
      listePoints[i],
      calcul(-180 + 360 / n)
    );
  }
  return polygone(listePoints, color);
}

/**
 * polygoneRegulierIndirect(A,B,n) //Trace le polygone régulier indirect à n côtés qui a pour côté [AB]
 *
 * @Auteur Rémi Angot
 */
export function polygoneRegulierIndirect(A, B, n, color = "black") {
  let listePoints = [A, B];
  for (let i = 1; i < n - 1; i++) {
    listePoints[i + 1] = rotation(
      listePoints[i - 1],
      listePoints[i],
      calcul(180 - 360 / n)
    );
  }
  return polygone(listePoints, color);
}

/**
 * carre(A,B) //Trace le carré direct qui a pour côté [AB] et code les 4 angles droits et 4 côtés de même longueur
 * carre(A,B,'blue') //Trace en bleu le carré direct qui a pour côté [AB] et code les 4 angles droits et 4 côtés de même longueur
 * @Auteur Rémi Angot
 */
export function carre(A, B, color) {
  return polygoneRegulier(A, B, 4, color);
}

/**
 * carreIndirect(A,B) //Trace le carré indirect qui a pour côté [AB]
 */
export function carreIndirect(A, B, color) {
  return polygoneRegulierIndirect(A, B, 4, color);
}

function CodageCarre(c, color = "black", mark = "×") {
  let objets = [];
  objets.push(codeSegments(mark, color, c.listePoints));
  objets.push(
    codageAngleDroit(
      c.listePoints[0],
      c.listePoints[1],
      c.listePoints[2],
      color
    )
  );
  objets.push(
    codageAngleDroit(
      c.listePoints[1],
      c.listePoints[2],
      c.listePoints[3],
      color
    )
  );
  objets.push(
    codageAngleDroit(
      c.listePoints[2],
      c.listePoints[3],
      c.listePoints[0],
      color
    )
  );
  objets.push(
    codageAngleDroit(
      c.listePoints[3],
      c.listePoints[0],
      c.listePoints[1],
      color
    )
  );

  this.svg = function (coeff) {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.svg(coeff);
    }
    return code;
  };
  this.tikz = function () {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.tikz();
    }
    return code;
  };
}

export function codageCarre(...args) {
  return new CodageCarre(...args);
}

/**
 * polygoneRegulierParCentreEtRayon(O,r,n) //Trace le polygone régulier à n côtés et de rayon r
 *
 * @Auteur Rémi Angot
 */
export function polygoneRegulierParCentreEtRayon(O, r, n, color = "black") {
  let p = [];
  p[0] = point(calcul(O.x + r), O.y);
  for (let i = 1; i < n; i++) {
    p[i] = rotation(p[i - 1], O, calcul(-360 / n));
  }
  return polygone(p, color);
}

/**
 * t = triangle2points2longueurs(A,B,4,7) // Trace le triangle ABC tel que AC = 4 cm et BC = 7 cm (par défaut C a l'ordonnée la plus grande possible)
 * C = t.listePoints[2] // Récupère le 3e sommet dans la variable C
 * t = triangle2points2longueurs(A,B,4,7,2) // Trace le triangle ABC tel que AC = 4 cm et BC = 7 cm (C aura l'ordonnée la plus petite possible)
 * @Auteur Rémi Angot
 */
export function triangle2points2longueurs(A, B, l1, l2, n = 1) {
  let c1 = cercle(A, l1);
  let c2 = cercle(B, l2);
  let C;
  if (n == 1) {
    C = pointIntersectionCC(c1, c2);
  } else {
    C = pointIntersectionCC(c1, c2, "", 2);
  }
  c1.isVisible = false;
  c2.isVisible = false;
  return polygone(A, B, C);
}

/**
 * t = triangle2points2angles(A,B,40,60) // Trace le triangle ABC tel que CAB = +40° et CBA = -60°
 * C = t.listePoints[2] // Récupère le 3e sommet dans la variable C
 * t = triangle2points2angles(A,B,40,60,2) // Trace le triangle ABC tel que CAB = -40° et CBA = 60°
 * @Auteur Rémi Angot
 */
export function triangle2points2angles(A, B, a1, a2, n = 1) {
  if (n == 1) {
    a2 *= -1;
  } else {
    a1 *= -1;
  }
  let a = pointSurSegment(A, B, 1);
  let c1 = rotation(a, A, a1);
  let b = pointSurSegment(B, A, 1);
  let c2 = rotation(b, B, a2);
  let dAc1 = droite(A, c1);
  let dBc2 = droite(B, c2);
  dAc1.isVisible = false;
  dBc2.isVisible = false;
  let C = pointIntersectionDD(dAc1, dBc2, "C");
  return polygone(A, B, C);
}
/**
 *
 * @param {Point} A Le sommet pour l'angle donné = première extrémité du segment de base du triangle
 * @param {Point} B L'autre extrémité du segment de base
 * @param {number} a l'angle au sommet A (angle compris entre 0 et 180 sinon il y est contraint)
 * @param {number} l la longueur du deuxième côté de l'angle
 * @param {number} n n=1 l'angle a est pris dans le sens direct, n différent de 1, l'angle a est pris dans le sens indirect.
 * t = triangle2points1angle1longueur(A,B,40,6) // Trace le triangle ABC tel que CAB = 40° et AC=6
 * @Auteur Jean-Claude Lhote
 */
export function triangle2points1angle1longueur(A, B, a, l, n = 1) {
  if (n == 1) {
    a = Math.abs(a) % 180;
  } else {
    a = -(Math.abs(a) % 180);
  }
  let P = pointSurSegment(A, B, l);
  let Q = rotation(P, A, a);
  return polygone(A, B, Q);
}
/**
 * @param {Point} A Le sommet pour l'angle donné = première extrémité du segment de base du triangle
 * @param {Point} B L'autre extrémité du segment de base
 * @param {number} a l'angle au sommet A (angle compris entre 0 et 180 sinon il y est contraint)
 * @param {number} l la longueur du côté opposé à l'angle
 * @param {number} n n=1 l'angle a est pris dans le sens direct et le point est le plus près de A
 * n=2 l'angle est pris dans le sens indirect et le point est le plus près de A
 * n=3 l'angle a est pris dans le sens direct et le point est le plus loin de A
 * n=4 l'angle est pris dans le sens indirect et le point est le plus loin de A
 * t = triangle2points1angle1longueurOppose(A,B,40,6) // Trace le triangle ABC tel que CAB = 40° et BC=6 Le point C est celui des deux points possible le plus près de A
 * @Auteur Jean-Claude Lhote
 */
export function triangle2points1angle1longueurOppose(A, B, a, l, n = 1) {
  let M;
  if (n % 2 == 1) {
    a = Math.abs(a) % 180;
  } else {
    a = -(Math.abs(a) % 180);
  }
  let d = droite(A, B);
  let e = rotation(d, A, a);
  let c = cercle(B, l);
  d.isVisible = false;
  e.isVisible = false;
  c.isVisible = false;
  if ((n + 1) >> 1 == 1) M = pointIntersectionLC(e, c, "", 1);
  else M = pointIntersectionLC(e, c, "", 2);
  return polygone(A, B, M);
}

/**
 * nommePolygone (p,'ABCDE',0.5) nomme les sommets du polygone p. Les labels sont placés à une distance paramètrable en cm des sommets (0.5 par défaut)
 * @Auteur Jean-Claude Lhote
 */
function NommePolygone(p, nom = "", k = 0.5) {
  ObjetMathalea2D.call(this);
  this.poly=p
  this.dist=k
  for (let i = 0; i < p.listePoints.length; i++) {
    if (nom != "") p.listePoints[i].nom = nom[i];
  }
  this.svg = function (coeff) {
    let code = "";
    let P,p=this.poly,d=this.dist
    let G = barycentre(p);
    for (let i = 0; i < p.listePoints.length; i++) {
      P=pointSurSegment(G,p.listePoints[i],longueur(G,p.listePoints[i])+d*20/coeff)
      code += "\n\t" + texteParPoint(p.listePoints[i].nom, P, "milieu").svg(coeff)
    }
    return code;
  };
  this.tikz = function () {
    let code = "";
    let P,p=this.poly,d=this.dist
    let G = barycentre(p);
    for (let i = 0; i < p.listePoints.length; i++) {
      P=pointSurSegment(G,p.listePoints[i],longueur(G,p.listePoints[i])+d/mathalea.scale)
      code += "\n\t" + texteParPoint(p.listePoints[i].nom, P, "milieu").tikz()
    }
    return code;
  }
}

export function nommePolygone(...args) {
  return new NommePolygone(...args);
}

/**
 * deplaceLabel(p1,'AB','below') // Si il y a un point nommé 'A' ou 'B' dans le polygone son nom sera mis en dessous du point
 * @Auteur Rémi Angot
 */
export function deplaceLabel(p, nom, positionLabel) {
  for (let i = 0; i < p.listePoints.length; i++) {
    for (let lettre in nom) {
      if (p.listePoints[i].nom == nom[lettre]) {
        p.listePoints[i].positionLabel = positionLabel;
        labelPoint(p.listePoints[i]);
      }
    }
  }
}
/**
 * aireTriangle(p) retourne l'aire du triangle si p est un triangle, false sinon.
 * @Auteur Jean-Claude Lhote
 */
export function aireTriangle(p) {
  if (p.listePoints.length != 3) return false;
  let A = p.listePoints[0],
    B = p.listePoints[1],
    C = p.listePoints[2];
  return (
    (1 / 2) * Math.abs((B.x - A.x) * (C.y - A.y) - (C.x - A.x) * (B.y - A.y))
  );
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%% LES CERCLES ET ARCS %%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * c = cercle(O,r) //Cercle de centre O et de rayon r
 * @Auteur Rémi Angot
 */
function Cercle(O, r, color) {
  ObjetMathalea2D.call(this);
  if (color) {
    this.color = color;
    this.styleTikz = `[${color}]`;
  }
  this.centre = O;
  this.rayon = r;
  this.couleurDeRemplissage = "";
  this.opaciteDeRemplissage = 0.7;
  this.svg = function (coeff) {
    if (this.epaisseur != 1) {
      this.style += ` stroke-width="${this.epaisseur}" `;
    }
    if (Boolean(this.pointilles)) {
      switch (this.pointilles) {
        case 1 :
          this.style += ` stroke-dasharray="6 10" `;
          break;
        case 2 : 
        this.style += ` stroke-dasharray="6 3" `;
        break;       
        case 3 :
          this.style += ` stroke-dasharray="3 2 6 2 " `;
          break;      
        default : 
        this.style += ` stroke-dasharray="5 5" `;
        break; 
      }

    }
    if (this.opacite != 1) {
      this.style += ` stroke-opacity="${this.opacite}" `;
    }
    if (this.couleurDeRemplissage == "") {
      this.style += ` fill="none" `;
    } else {
      this.style += ` fill="${this.couleurDeRemplissage}" `;
      this.style += ` fill-opacity="${this.opaciteDeRemplissage}" `;
    }

    return `<circle cx="${O.xSVG(coeff)}" cy="${O.ySVG(coeff)}" r="${
      r * coeff
    }" stroke="${this.color}" ${this.style} id="${this.id}" />`;
  };
  this.tikz = function () {
    let optionsDraw = [];
    let tableauOptions = [];
    if (this.color.length > 1 && this.color !== "black") {
      tableauOptions.push(this.color);
    }
    if (this.epaisseur != 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`);
    }
    if (Boolean(this.pointilles)) {
      switch (this.pointilles) {
         case 1 :
           tableauOptions.push(` dash dot `);
           break;
         case 2 : 
         tableauOptions.push(` dash dash dot `);
         break;       
         case 3 :
           tableauOptions.push(` dash dot dot `);
           break;      
         default : 
           tableauOptions.push(` dashed `);
         break; 
       }
     }
     if (this.opacite != 1) {
      tableauOptions.push(`opacity = ${this.opacite}`);
    }
    if (tableauOptions.length > 0) {
      optionsDraw = "[" + tableauOptions.join(",") + "]";
    }
    return `\\draw${optionsDraw} (${O.x},${O.y}) circle (${r});`;
  };
  this.svgml = function (coeff,amp) {
    if (this.epaisseur != 1) {
      this.style += ` stroke-width="${this.epaisseur}" `;
    }

    if (this.opacite != 1) {
      this.style += ` stroke-opacity="${this.opacite}" `;
    }
    if (this.couleurDeRemplissage == "") {
      this.style += ` fill="none" `;
    } else {
      this.style += ` fill="${this.couleurDeRemplissage}" `;
      this.style += ` fill-opacity="${this.opaciteDeRemplissage}" `;
    }

    let code =`<path d="M ${O.xSVG(coeff)+r*coeff} ${O.ySVG(coeff)} C ${O.xSVG(coeff)+r*coeff} ${O.ySVG(coeff)}, `
    for (let k=1;k<101;k++) {
      code +=`${arrondi(O.xSVG(coeff)+r*Math.cos(2*k*Math.PI/101)*coeff+randint(-1,1)*amp,2)} ${arrondi(O.ySVG(coeff)+r*Math.sin(2*k*Math.PI/100)*coeff+randint(-1,1)*amp,2)}, `
    }
    code +=` ${O.xSVG(coeff)+r*coeff} ${O.ySVG(coeff)} Z" stroke="${this.color}" ${this.style}"/>`
    return code;
  }
  this.tikzml = function(amp) {
    let optionsDraw = [];
    let tableauOptions = [];
    if (this.color.length > 1 && this.color !== "black") {
      tableauOptions.push(this.color);
    }
    if (this.epaisseur != 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`);
    }

    if (this.opacite != 1) {
      tableauOptions.push(`opacity = ${this.opacite}`);
    }
    tableauOptions.push(`decorate,decoration={random steps , amplitude = ${amp}pt}`);
    optionsDraw = "[" + tableauOptions.join(",") + "]";


    let code=`\\draw${optionsDraw} (${O.x},${O.y}) circle (${r});`
    return code
  
  }
}
export function cercle(...args) {
  return new Cercle(...args);
}


/**
 * c = ellipse(O,rx,ry) //Ellipse de centre O et de rayon rx et ry
 * @Auteur Rémi Angot
 */
function Ellipse(O, rx, ry, color) {
  ObjetMathalea2D.call(this);
  if (color) {
    this.color = color;
    this.styleTikz = `[${color}]`;
  }
  this.centre = O;
  this.rx = rx;
  this.ry = ry;
  this.couleurDeRemplissage = "";
  this.opaciteDeRemplissage = 0.7;
  this.svg = function (coeff) {
    if (this.epaisseur != 1) {
      this.style += ` stroke-width="${this.epaisseur}" `;
    }
    if (Boolean(this.pointilles)) {
      switch (this.pointilles) {
        case 1 :
          this.style += ` stroke-dasharray="6 10" `;
          break;
        case 2 : 
        this.style += ` stroke-dasharray="6 3" `;
        break;       
        case 3 :
          this.style += ` stroke-dasharray="3 2 6 2 " `;
          break;      
        default : 
        this.style += ` stroke-dasharray="5 5" `;
        break; 
      }

    }
    if (this.opacite != 1) {
      this.style += ` stroke-opacity="${this.opacite}" `;
    }
    if (this.couleurDeRemplissage == "") {
      this.style += ` fill="none" `;
    } else {
      this.style += ` fill="${this.couleurDeRemplissage}" `;
      this.style += ` fill-opacity="${this.opaciteDeRemplissage}" `;
    }

    return `<ellipse cx="${O.xSVG(coeff)}" cy="${O.ySVG(coeff)}" rx="${calcul(rx*coeff)}" ry="${calcul(ry*coeff)}" stroke="${this.color}" ${this.style} id="${this.id}" />`
  };
  this.tikz = function () {
    let optionsDraw = [];
    let tableauOptions = [];
    if (this.color.length > 1 && this.color !== "black") {
      tableauOptions.push(this.color);
    }
    if (this.epaisseur != 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`);
    }
    if (Boolean(this.pointilles)) {
      switch (this.pointilles) {
         case 1 :
           tableauOptions.push(` dash dot `);
           break;
         case 2 : 
         tableauOptions.push(` dash dash dot `);
         break;       
         case 3 :
           tableauOptions.push(` dash dot dot `);
           break;      
         default : 
           tableauOptions.push(` dashed `);
         break; 
       }
     }
     if (this.opacite != 1) {
      tableauOptions.push(`opacity = ${this.opacite}`);
    }
    if (tableauOptions.length > 0) {
      optionsDraw = "[" + tableauOptions.join(",") + "]";
    }
    return `\\draw${optionsDraw} (${O.x},${O.y}) ellipse (${rx}cm and ${ry}cm);;`;
  };
  // this.svgml = function (coeff,amp) {
  //   if (this.epaisseur != 1) {
  //     this.style += ` stroke-width="${this.epaisseur}" `;
  //   }

  //   if (this.opacite != 1) {
  //     this.style += ` stroke-opacity="${this.opacite}" `;
  //   }
  //   if (this.couleurDeRemplissage == "") {
  //     this.style += ` fill="none" `;
  //   } else {
  //     this.style += ` fill="${this.couleurDeRemplissage}" `;
  //     this.style += ` fill-opacity="${this.opaciteDeRemplissage}" `;
  //   }

  //   let code =`<ellipse cx="${O.xSVG(coeff)}" cy="${O.ySVG(coeff)}" rx="${calcul(rx*coeff)}" ry="${calcul(ry*coeff)}" />`
  //   return code;
  // }
  this.tikzml = function(amp) {
    let optionsDraw = [];
    let tableauOptions = [];
    if (this.color.length > 1 && this.color !== "black") {
      tableauOptions.push(this.color);
    }
    if (this.epaisseur != 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`);
    }

    if (this.opacite != 1) {
      tableauOptions.push(`opacity = ${this.opacite}`);
    }
    tableauOptions.push(`decorate,decoration={random steps , amplitude = ${amp}pt}`);
    optionsDraw = "[" + tableauOptions.join(",") + "]";


    let code=`\\draw${optionsDraw} (${O.x},${O.y}) circle (${r});`
    return code
  
  }
}
export function ellipse(...args) {
  return new Ellipse(...args);
}

/**
 * I = pointItersectionLC(d,c,'I',1) // I est le premier point d'intersection si il existe de la droite (d) et du cercle (c)
 * @param {Droite} d la droite qui intecepte (ou pas le cercle)
 * @param {Cercle} C le cercle
 * @param {string} nom le nom du point d'intersection
 * @param {entier} n 1 pour le premier point, 2 sinon. Si il n'y a qu'un seul point d'intesection, l'un ou l'autre renvoie ce point.
 * @Auteur Jean-Claude Lhote
 */
export function pointIntersectionLC(d, C, nom = "", n = 1) {
  let O = C.centre;
  let r = C.rayon;
  let a = d.a;
  let b = d.b;
  let c = d.c;
  let xO = O.x;
  let yO = O.y;
  let Delta, delta, xi, yi, xi_prime, yi_prime;
  if (b == 0) {
    // la droite est verticale
    xi = calcul(-c / a);
    xi_prime = xi;
    Delta = calcul(
      4 * (-xO * xO - (c * c) / (a * a) - (2 * xO * c) / a + r * r)
    );
    if (Delta < 0) return false;
    else if (egal(Delta, 0)) {
      //un seul point d'intersection
      yi = calcul(yO + Math.sqrt(Delta) / 2);
      yi_prime = yi;
    } else {
      //deux points d'intersection
      yi = calcul(yO - Math.sqrt(Delta) / 2);
      yi_prime = calcul(yO + Math.sqrt(Delta) / 2);
    }
  } else if (a == 0) {
    // la droite est horizontale
    yi = calcul(-c / b);
    yi_prime = yi;
    Delta = calcul(
      4 * (-yO * yO - (c * c) / (b * b) - (2 * yO * c) / b + r * r)
    );
    if (Delta < 0) return false;
    else if (egal(Delta, 0)) {
      //un seul point d'intersection
      xi = calcul(xO + Math.sqrt(Delta) / 2);
      xi_prime = xi;
    } else {
      //deux points d'intersection
      xi = calcul(xO - Math.sqrt(Delta) / 2);
      xi_prime = calcul(xO + Math.sqrt(Delta) / 2);
    }
  } else {
    //cas général
    Delta = calcul(
      (2 * ((a * c) / (b * b) + (yO * a) / b - xO)) ** 2 -
        4 *
          (1 + (a / b) ** 2) *
          (xO * xO + yO * yO + (c / b) ** 2 + (2 * yO * c) / b - r * r)
    );
    if (Delta < 0) return false;
    else if (egal(Delta, 0)) {
      //un seul point d'intersection
      delta = calcul(Math.sqrt(Delta));
      xi = calcul(
        (-2 * ((a * c) / (b * b) + (yO * a) / b - xO) - delta) /
          (2 * (1 + (a / b) ** 2))
      );
      xi_prime = xi;
      yi = calcul((-a * xi - c) / b);
      yi_prime = yi;
    } else {
      //deux points d'intersection
      delta = calcul(Math.sqrt(Delta));
      xi = calcul(
        (-2 * ((a * c) / (b * b) + (yO * a) / b - xO) - delta) /
          (2 * (1 + (a / b) ** 2))
      );
      xi_prime = calcul(
        (-2 * ((a * c) / (b * b) + (yO * a) / b - xO) + delta) /
          (2 * (1 + (a / b) ** 2))
      );
      yi = calcul((-a * xi - c) / b);
      yi_prime = calcul((-a * xi_prime - c) / b);
    }
  }
  if (n == 1) {
    if (yi_prime > yi) {
      return point(xi_prime, yi_prime, nom);
    } else {
      return point(xi, yi, nom);
    }
  } else {
    if (yi_prime > yi) {
      return point(xi, yi, nom);
    } else {
      return point(xi_prime, yi_prime, nom);
    }
  }
}

/**
 * M = pointIntersectionCC(c1,c2,'M') // M est le point d'intersection le plus haut des cercles c1 et c2
 * M = pointIntersectionCC(c1,c2,'M',2) // M est le point d'intersection le plus bas des cercles c1 et c2
 * La fonction ne renvoie rien si les cercles n'ont pas de points d'intersection
 * @Auteur Rémi Angot
 * @Source https://stackoverflow.com/questions/12219802/a-javascript-function-that-returns-the-x-y-points-of-intersection-between-two-ci
 */
export function pointIntersectionCC(c1, c2, nom = "", n = 1) {
  let O1 = c1.centre;
  let O2 = c2.centre;
  let r0 = c1.rayon;
  let r1 = c2.rayon;
  let x0 = O1.x;
  let x1 = O2.x;
  let y0 = O1.y;
  let y1 = O2.y;
  let a, dx, dy, d, h, rx, ry;
  let x2, y2;
  dx = x1 - x0;
  dy = y1 - y0;
  d = Math.sqrt(dy * dy + dx * dx);
  if (d > r0 + r1) {
    return false;
  }
  if (d < Math.abs(r0 - r1)) {
    return false;
  }
  a = (r0 * r0 - r1 * r1 + d * d) / (2.0 * d);
  x2 = x0 + (dx * a) / d;
  y2 = y0 + (dy * a) / d;
  h = Math.sqrt(r0 * r0 - a * a);
  rx = -dy * (h / d);
  ry = dx * (h / d);
  let xi = x2 + rx;
  let xi_prime = x2 - rx;
  let yi = y2 + ry;
  let yi_prime = y2 - ry;
  if (n == 1) {
    if (yi_prime > yi) {
      return point(xi_prime, yi_prime, nom);
    } else {
      return point(xi, yi, nom);
    }
  } else {
    if (yi_prime > yi) {
      return point(xi, yi, nom);
    } else {
      return point(xi_prime, yi_prime, nom);
    }
  }
}

/**
 *  c = cercleCentrePoint(O,A) //Cercle de centre O passant par A
 *  c = cercleCentrePoint(O,A,'blue') //Cercle de centre O passant par A en bleu
 *
 * @Auteur Rémi Angot
 */
function CercleCentrePoint(O, M, color = "black") {
  Cercle.call(this, O, longueur(O, M), color);
}
export function cercleCentrePoint(...args) {
  return new CercleCentrePoint(...args);
}

/**
 * @Auteur Jean-Claude Lhote
 * @param {object} M point de départ de l'arc
 * @param {object} Omega centre de l'arc
 * @param {number} angle compris entre -360 et 360 valeur négative = sens indirect
 * @param {boolean} rayon booléen si true, les rayons délimitant l'arc sont ajoutés
 * @param {boolean} fill
 * @param {string} color
 * @param {number} fillOpacite // transparence de remplissage de 0 à 1.
 */

function Arc(M, Omega, angle, rayon = false, fill = 'none', color = 'black', fillOpacite = 0.2) {
  ObjetMathalea2D.call(this);
  this.color = color;
  this.couleurDeRemplissage = fill;
  this.opaciteDeRemplissage = fillOpacite
  if (typeof(angle)!='number'){
    angle=arrondi(angleOriente(M,Omega,angle),1)
  }
  let l = longueur(Omega, M), large = 0, sweep = 0
 // let d = droite(Omega, M)
  //d.isVisible = false
  let A = point(Omega.x + 1, Omega.y)
  let azimut = arrondi(angleOriente(A, Omega, M),1)
  let anglefin = arrondi(azimut + angle,1)
  if (angle > 180) {
    angle = angle - 360
    large = 1
    sweep = 0
  }
  else if (angle < -180) {
    angle = 360 + angle
    large = 1
    sweep = 1
  }
  else {
    large = 0
    sweep = 1 - (angle > 0)
  }
  let N = rotation(M, Omega, angle)
  if (rayon) this.svg = function (coeff) {
    this.style=``
    if (this.epaisseur != 1) {
      this.style += ` stroke-width="${this.epaisseur}" `
    }
    if (Boolean(this.pointilles)) {
      switch (this.pointilles) {
        case 1 :
          this.style += ` stroke-dasharray="6 10" `;
          break;
        case 2 : 
        this.style += ` stroke-dasharray="6 3" `;
        break;       
        case 3 :
          this.style += ` stroke-dasharray="3 2 6 2 " `;
          break;      
        default : 
        this.style += ` stroke-dasharray="5 5" `;
        break; 
      }

    }
   if (this.opacite != 1) {
      this.style += ` stroke-opacity="${this.opacite}" `
    }
    if (this.couleurDeRemplissage != 'none') {
      this.style += ` fill-opacity="${this.opaciteDeRemplissage}" `;
    }
    return `<path d="M${M.xSVG(coeff)} ${M.ySVG(coeff)} A ${arrondi(l * coeff,1)} ${arrondi(l * coeff,1)} 0 ${large} ${sweep} ${N.xSVG(coeff)} ${N.ySVG(coeff)} L ${Omega.xSVG(coeff)} ${Omega.ySVG(coeff)} Z" stroke="${this.color}" fill="${this.couleurDeRemplissage}" ${this.style}/>`
  }
  else this.svg = function (coeff) {
    this.style=``
    if (this.epaisseur != 1) {
      this.style += ` stroke-width="${this.epaisseur}" `
    }
    if (Boolean(this.pointilles)) {
      switch (this.pointilles) {
        case 1 :
          this.style += ` stroke-dasharray="6 10" `;
          break;
        case 2 : 
        this.style += ` stroke-dasharray="6 3" `;
        break;       
        case 3 :
          this.style += ` stroke-dasharray="3 2 6 2 " `;
          break;      
        default : 
        this.style += ` stroke-dasharray="5 5" `;
        break; 
      }

    }
    if (this.opacite != 1) {
      this.style += ` stroke-opacity="${this.opacite}" `
    }
    return `<path d="M${M.xSVG(coeff)} ${M.ySVG(coeff)} A ${arrondi(l * coeff,1)} ${arrondi(l * coeff,1)} 0 ${large} ${sweep} ${N.xSVG(coeff)} ${N.ySVG(coeff)}" stroke="${this.color}" fill="${fill}" ${this.style} id="${this.id}" />`
  }
  this.tikz = function () {
    let optionsDraw = []
    let tableauOptions = [];
    if (this.color.length > 1 && this.color !== 'black') {
      tableauOptions.push(this.color)
    }
    if (this.epaisseur != 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`)
    }
    if (Boolean(this.pointilles)) {
      switch (this.pointilles) {
         case 1 :
           tableauOptions.push(` dash dot `);
           break;
         case 2 : 
         tableauOptions.push(` dash dash dot `);
         break;       
         case 3 :
           tableauOptions.push(` dash dot dot `);
           break;      
         default : 
           tableauOptions.push(` dashed `);
         break; 
       }
     }
     if (this.opacite != 1) {
      tableauOptions.push(`opacity = ${this.opacite}`)
    }
    if (rayon && fill != 'none') {
      tableauOptions.push(`fill opacity = ${this.opaciteDeRemplissage}`)
    }
    if (rayon && fill != 'none') {
      tableauOptions.push(`fill = ${this.couleurDeRemplissage}`)
    }
    if (tableauOptions.length > 0) {
      optionsDraw = "[" + tableauOptions.join(',') + "]"
    }
    if (rayon) return `\\filldraw  ${optionsDraw} (${N.x},${N.y}) -- (${Omega.x},${Omega.y}) -- (${M.x},${M.y}) arc (${azimut}:${anglefin}:${arrondi(longueur(Omega, M),2)}) -- cycle ;`
    else return `\\draw${optionsDraw} (${M.x},${M.y}) arc (${azimut}:${anglefin}:${arrondi(longueur(Omega, M),2)}) ;`
  }
  let la,da,code,P,dMx,dMy,dPx,dPy

  this.svgml = function (coeff, amp) {
    this.style=``
    if(!rayon){
    if (this.epaisseur != 1) {
      this.style += ` stroke-width="${this.epaisseur}" `;
    }
    if (this.opacite != 1) {
      this.style += ` stroke-opacity="${this.opacite}" `;
    }
    this.style += ` fill="none" `;
    la = longueur(M, Omega) // pour obtenir le nombre de points intermédiaires proportionnel au rayon

    da = angle/la/10
    code = `<path d="M${M.xSVG(coeff)} ${M.ySVG(coeff)} C `
    for (let k = 0; Math.abs(k) <= Math.abs(angle); k+=da) {
      P = rotation(M, Omega, k)
      code += `${Math.round(P.xSVG(coeff) + randint(-1, 1) * amp)} ${Math.round(P.ySVG(coeff) + randint(-1, 1) * amp)}, `
    }
    P = rotation(M, Omega, angle)
    code += `${Math.round(P.xSVG(coeff) + randint(-1, 1) * amp)} ${Math.round(P.ySVG(coeff) + randint(-1, 1) * amp)} `
    code += `" stroke="${color}" ${this.style}/>`
    return code
  }
  else {
      if (this.epaisseur != 1) {
        this.style += ` stroke-width="${this.epaisseur}" `;
      }
      if (this.opacite != 1) {
        this.style += ` stroke-opacity="${this.opacite}" `;
      }
      if (this.couleurDeRemplissage == "" || this.couleurDeRemplissage == 'none') {
        this.style += ` fill="none" `;
      } else {
        this.style += ` fill="${this.couleurDeRemplissage}" `;
        this.style += ` fill-opacity="${this.opaciteDeRemplissage}" `;
      }
      la = longueur(M, Omega) // pour obtenir le nombre de points intermédiaires proportionnel au rayon
      da = angle/la/10
      code = `<path d="M${M.xSVG(coeff)} ${M.ySVG(coeff)} C `
      for (let k = 0; k <= angle; k+=da) {
        P = rotation(M, Omega, k)
        code += `${Math.round(P.xSVG(coeff) + randint(-1, 1) * amp)} ${Math.round(P.ySVG(coeff) + randint(-1, 1) * amp)}, `
      }
      P = rotation(M, Omega, la * da)
      code += `${Math.round(P.xSVG(coeff) + randint(-1, 1) * amp)} ${Math.round(P.ySVG(coeff) + randint(-1, 1) * amp)} `
    
    l = longueur(Omega, M)
    dMx = (M.xSVG(coeff) - Omega.xSVG(coeff)) / (4 * l)
    dMy = (M.ySVG(coeff) - Omega.ySVG(coeff)) / (4 * l)
    dPx = (Omega.xSVG(coeff) - P.xSVG(coeff)) / (4 * l)
    dPy = (Omega.ySVG(coeff) - P.ySVG(coeff)) / (4 * l)
      for (let k = 0; k <= 4 * l; k++) {
        code += `${Math.round(P.xSVG(coeff) + k * dPx + randint(-1, 1) * amp)} ${Math.round(P.ySVG(coeff) + k * dPy + randint(-1, 1) * amp)}, `
      }
      for (let j = 0; j <= 4 * l; j++) {
        code += `${Math.round(Omega.xSVG(coeff) + j * dMx + randint(-1, 1) * amp)} ${Math.round(Omega.ySVG(coeff) + j * dMy + randint(-1, 1) * amp)}, `
      }
      code += `${Math.round(Omega.xSVG(coeff) + 4 * l * dMx + randint(-1, 1) * amp)} ${Math.round(Omega.ySVG(coeff) + 4 * l * dMy + randint(-1, 1) * amp)} Z `
    code += `" stroke="${color}" ${this.style} />`
    return code
    }
  }

  this.tikzml = function (amp) {
    let optionsDraw = []
    let tableauOptions = [];
    let A = point(Omega.x + 1, Omega.y)
    let azimut = arrondi(angleOriente(A, Omega, M),1)
    let anglefin = arrondi(azimut + angle,1)
    let N = rotation(M, Omega, angle)
    if (this.color.length > 1 && this.color !== 'black') {
      tableauOptions.push(this.color)
    }
    if (this.epaisseur != 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`)
    }
    if (this.opacite != 1) {
      tableauOptions.push(`opacity = ${this.opacite}`)
    }
    if (rayon && fill != 'none') {
      tableauOptions.push(`fill opacity = ${this.opaciteDeRemplissage}`)
    }
    if (rayon && fill != 'none') {
      tableauOptions.push(`fill = ${this.couleurDeRemplissage}`)
    }
    tableauOptions.push(`decorate,decoration={random steps , amplitude = ${amp}pt}`);

    optionsDraw = "[" + tableauOptions.join(',') + "]"

    if (rayon) return `\\filldraw  ${optionsDraw} (${N.x},${N.y}) -- (${Omega.x},${Omega.y}) -- (${M.x},${M.y}) arc (${azimut}:${anglefin}:${arrondi(longueur(Omega, M),2)}) -- cycle ;`
    else return `\\draw${optionsDraw} (${M.x},${M.y}) arc (${azimut}:${anglefin}:${arrondi(longueur(Omega, M),2)}) ;`
  }
}
export function arc(...args) {
  return new Arc(...args);
}
/**
 *
 * @param {Point} M //première extrémité de l'arc
 * @param {Point} N //deuxième extrémité de l'arc
 * @param {number} angle //angle au centre de l'arc compris entre -360 et +360 !
 * @param {boolean} rayon //si true, l'arc est fermé par deux rayons aux extrémités
 * @param {string} fill //couleur de remplissage (par défaut 'none'= sans remplissage)
 * @param {string} color //couleur de l'arc
 * @param {number} fillOpacite // transparence de remplissage de 0 à 1.
 * @Auteur Jean-Claude Lhote
 */
function ArcPointPointAngle(M,N,angle,rayon=false,fill='none',color='black',fillOpacite=0.2) {
  let anglerot, Omegax, Omegay;
  if (angle < 0) anglerot = calcul((angle + 180) / 2);
  else anglerot = calcul((angle - 180) / 2);
  let d, e, f;
  d = mediatrice(M, N, "black");
  d.isVisible = false;
  e = droite(N, M);
  e.isVisible = false;
  f = rotation(e, N, anglerot);
  f.isVisible = false;
  Omegay = calcul((-f.c + (d.c * f.a) / d.a) / (f.b - (f.a * d.b) / d.a));
  Omegax = calcul(-d.c / d.a - (d.b * Omegay) / d.a);
  let Omega = point(Omegax, Omegay);
 Arc.call(this,M,Omega,angle,rayon,fill,color,fillOpacite);
}
export function arcPointPointAngle(...args) {
  return new ArcPointPointAngle(...args);
}
/**
 * m = traceCompas(O, A, 20) trace un arc de cercle de centre O qui commence 10° avant A et finit 10° après.
 *@Auteur Jean-Claude Lhote
 */
export function traceCompas(
  O,
  A,
  angle = 20,
  color = "gray",
  opacite = 0.7,
  epaisseur = 1,
  pointilles = false
) {
  let B = rotation(A, O, -angle / 2);
  let a = arc(B, O, angle, false);
  a.epaisseur = epaisseur;
  a.opacite = opacite;
  a.color = color;
  a.pointilles = pointilles;
  return a;
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%% LES COURBES DE BÉZIER %%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

function CourbeDeBezier(A, B, C) {
  ObjetMathalea2D.call(this);
  this.svg = function (coeff) {
    let code = `<path d="M${A.xSVG(coeff)} ${A.ySVG(coeff)} Q ${B.xSVG(
      coeff
    )} ${B.ySVG(coeff)}, ${C.xSVG(coeff)} ${C.ySVG(
      coeff
    )}" stroke="black" fill="transparent"/>`;
    return code;
  };
}

export function courbeDeBezier(...args) {
  return new CourbeDeBezier(...args);
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%% LE DESSIN A MAIN LEVEE %%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * Trace un segment entre A et B qui donne l'impression d'être fait à main levée. amp est l'amplitude de la déformation
 * @Auteur Jean-Claude Lhote
 */
function SegmentMainLevee(A,B,amp,color='black') {
  ObjetMathalea2D.call(this);
  this.svg = function (coeff) {
    if (this.epaisseur != 1) {
      this.style += ` stroke-width="${this.epaisseur}" `;
    }

    if (this.opacite != 1) {
      this.style += ` stroke-opacity="${this.opacite}" `;
    }
    if (this.couleurDeRemplissage == "") {
      this.style += ` fill="none" `;
    } else {
      this.style += ` fill="${this.couleurDeRemplissage}" `;
      this.style += ` fill-opacity="${this.opaciteDeRemplissage}" `;
    }
    let l=Math.round(longueur(A,B))
    let dx=(B.xSVG(coeff)-A.xSVG(coeff))/(4*l),dy=(B.ySVG(coeff)-A.ySVG(coeff))/(4*l)
    let code =`<path d="M${A.xSVG(coeff)} ${A.ySVG(coeff)} C `
    for (let k=0;k<=4*l;k++) {
      code +=`${arrondi(A.xSVG(coeff)+k*dx+randint(-1,1)*amp,0)} ${arrondi(A.ySVG(coeff)+k*dy+randint(-1,1)*amp,0)}, `
    }
    code +=`${B.xSVG(coeff)} ${B.ySVG(coeff)}" stroke="${color}" ${this.style}"/>`
    return code;
  };
  this.tikz = function() {
    let optionsDraw = [];
    let tableauOptions = [];
    if (this.color.length > 1 && this.color !== "black") {
      tableauOptions.push(this.color);
    }
    if (this.epaisseur != 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`);
    }

    if (this.opacite != 1) {
      tableauOptions.push(`opacity = ${this.opacite}`);
    }
    tableauOptions.push(`decorate,decoration={random steps , amplitude = ${amp}pt}`);
    optionsDraw = "[" + tableauOptions.join(",") + "]";


    let code=`\\draw ${optionsDraw} (${A.x},${A.y})--(${B.x},${B.y});`
    return code
  }
}
export function segmentMainLevee(A,B,amp,color='black',epaisseur=1) {
  return new SegmentMainLevee(A,B,amp,color,epaisseur)
}
/**
 * Trace un cercle de centre A et de rayon r qui donne l'impression d'être fait à main levée. amp est l'amplitude de la déformation
 * @Auteur Jean-Claude Lhote
 */
function CercleMainLevee(A,r,amp,color='black') {
  ObjetMathalea2D.call(this);
  this.color=color;
  this.svg = function (coeff) {
    if (this.epaisseur != 1) {
      this.style += ` stroke-width="${this.epaisseur}" `;
    }

    if (this.opacite != 1) {
      this.style += ` stroke-opacity="${this.opacite}" `;
    }
    if (this.couleurDeRemplissage == "") {
      this.style += ` fill="none" `;
    } else {
      this.style += ` fill="${this.couleurDeRemplissage}" `;
      this.style += ` fill-opacity="${this.opaciteDeRemplissage}" `;
    }

    let code =`<path d="M ${A.xSVG(coeff)+r*coeff} ${A.ySVG(coeff)} C ${A.xSVG(coeff)+r*coeff} ${A.ySVG(coeff)}, `
    for (let k=1;k<101;k++) {
      code +=`${arrondi(A.xSVG(coeff)+r*Math.cos(2*k*Math.PI/101)*coeff+randint(-1,1)*amp,2)} ${arrondi(A.ySVG(coeff)+r*Math.sin(2*k*Math.PI/100)*coeff+randint(-1,1)*amp,2)}, `
    }
    code +=` ${A.xSVG(coeff)+r*coeff} ${A.ySVG(coeff)} Z" stroke="${color}" ${this.style}"/>`
    return code;
  };
  this.tikz = function() {
    let optionsDraw = [];
    let tableauOptions = [];
    if (this.color.length > 1 && this.color !== "black") {
      tableauOptions.push(this.color);
    }
    if (this.epaisseur != 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`);
    }

    if (this.opacite != 1) {
      tableauOptions.push(`opacity = ${this.opacite}`);
    }
    tableauOptions.push(`decorate,decoration={random steps , amplitude = ${amp}pt}`);
    optionsDraw = "[" + tableauOptions.join(",") + "]";


    let code=`\\draw${optionsDraw} (${A.x},${A.y}) circle (${r});`
    return code
  }
}
export function cercleMainLevee(A,r,amp,color='black',epaisseur=1) {
  return new CercleMainLevee(A,r,amp,color,epaisseur)
}
/**
 * Trace une droite passant par A et B qui donne l'impression d'être fait à main levée. amp est l'amplitude de la déformation
 * @Auteur Jean-Claude Lhote
 */
function DroiteMainLevee(A,B,amp,color='black'){
  ObjetMathalea2D.call(this)
  this.svg = function(coeff) {
    let d=droite(A,B,color)
    d.isVisible=false
    return d.svgml(coeff,amp)
  }
  this.tikz = function() {
    let d=droite(A,B,color)
    d.isVisible=false
    return d.tikzml(amp)
  }
}
export function droiteMainLevee(A,B,amp,color='black',epaisseur=1) {
  return new DroiteMainLevee(A,B,amp,color,epaisseur)
}
/**
 * Trace un polygone qui donne l'impression d'être fait à main levée. amp est l'amplitude de la déformation
 * @Auteur Jean-Claude Lhote
 */
function PolygoneMainLevee(points,amp) {
    ObjetMathalea2D.call(this);
    this.couleurDeRemplissage = "";
    this.opaciteDeRemplissage = 0.7;
// Le premier argument (points) doit être un tableau de points !!!
      this.listePoints = points;
 //     this.nom = this.listePoints.join();
    this.svg = function(coeff) {
      let code ="",segment_courant
      let A,B
      for (let k=1;k<=this.listePoints.length;k++ ) {
        B=this.listePoints[k%this.listePoints.length]
        A=this.listePoints[k-1]
        segment_courant=segment(A,B)
        segment_courant.isVisible=false
        segment_courant.epaisseur=this.epaisseur
        segment_courant.color=this.color
        segment_courant.opacite=this.opacite
        code+=segment_courant.svgml(coeff,amp)
      }
      return code
    }
    this.tikz = function() {
      let code ="",segment_courant
      let A,B
      for (let k=1;k<=this.listePoints.length;k++ ) {
        B=this.listePoints[k%this.listePoints.length]
        A=this.listePoints[k-1]
        segment_courant=segment(A,B)
        segment_courant.isVisible=false
        segment_courant.epaisseur=this.epaisseur
        segment_courant.color=this.color
        segment_courant.opacite=this.opacite
        code+=segment_courant.tikzml(amp)
      }
      return code
      
    }
}
export function polygoneMainLevee(points,amp,color='black') {
  return new PolygoneMainLevee(points,amp,color)
}
/**
 * Une fonction pour dessiner des arcs à main levée comme son nom l'indique.
* @Auteur Jean-Claude Lhote
 */


function ArcMainLevee(M,Omega,angle,amp,rayon=false,fill='none',color='black',fillOpacite=0.2){
  ObjetMathalea2D.call(this)
  this.couleurDeRemplissage=fill
  this.opaciteDeRemplissage=fillOpacite
  this.color=color
  this.svg = function (coeff) {
    if (this.epaisseur != 1) {
      this.style += ` stroke-width="${this.epaisseur}" `;
    }
    if (this.opacite != 1) {
      this.style += ` stroke-opacity="${this.opacite}" `;
    }
    if (this.couleurDeRemplissage == "" || this.couleurDeRemplissage == 'none') {
      this.style += ` fill="none" `;
    } else {
      this.style += ` fill="${this.couleurDeRemplissage}" `;
      this.style += ` fill-opacity="${this.opaciteDeRemplissage}" `;
    }
    let la = Math.round(longueur(M, Omega) * 2 * Math.PI * angle / 360) //longueur de l'arc pour obtenir le nombre de points intermédiaires proportionnel au rayon
    let da = angle / la, P
    let code = `<path d="M${M.xSVG(coeff)} ${M.ySVG(coeff)} C `
    for (let k = 0; k <= la; k++) {
      P = rotation(M, Omega, k * da)
      code += `${arrondi(P.xSVG(coeff) + randint(-1, 1) * amp, 0)} ${arrondi(P.ySVG(coeff) + randint(-1, 1) * amp, 0)}, `
    }
    code += `${arrondi(P.xSVG(coeff) + randint(-1, 1) * amp, 0)} ${arrondi(P.ySVG(coeff) + randint(-1, 1) * amp, 0)} `
    let l = Math.abs(Math.round(longueur(Omega, M)))
    let dMx = (M.xSVG(coeff) - Omega.xSVG(coeff)) / (4 * l), dMy = (M.ySVG(coeff) - Omega.ySVG(coeff)) / (4 * l)
    let dPx = (Omega.xSVG(coeff) - P.xSVG(coeff)) / (4 * l), dPy = (Omega.ySVG(coeff) - P.ySVG(coeff)) / (4 * l)
    if (rayon) {
      for (let k = 0; k <= 4 * l; k++) {
        code += `${arrondi(P.xSVG(coeff) + k * dPx + randint(-1, 1) * amp, 0)} ${arrondi(P.ySVG(coeff) + k * dPy + randint(-1, 1) * amp, 0)}, `
      }
      for (let j = 0; j <= 4 * l; j++) {
        code += `${arrondi(Omega.xSVG(coeff) + j * dMx + randint(-1, 1) * amp, 0)} ${arrondi(Omega.ySVG(coeff) + j * dMy + randint(-1, 1) * amp, 0)}, `
      }
      code += `${arrondi(Omega.xSVG(coeff) + 4*l * dMx + randint(-1, 1) * amp, 0)} ${arrondi(Omega.ySVG(coeff) + 4*l * dMy + randint(-1, 1) * amp, 0)} Z `
    }
      code += `" stroke="${color}" ${this.style}"/>`
      return code
  };

  this.tikz = function(){
		let optionsDraw = []
     let tableauOptions = [];
     let A=point(Omega.x+1,Omega.y)
     let azimut=angleOriente(A,Omega,M)
     let anglefin=azimut+angle
     let N=rotation(M,Omega,angle)
	   if (this.color.length>1 && this.color!=='black'){
		   tableauOptions.push(this.color)
	   }
	   if (this.epaisseur!=1) {
		   tableauOptions.push(`line width = ${this.epaisseur}`) 
	   }
	   if (this.opacite !=1) {
		   tableauOptions.push(`opacity = ${this.opacite}`)
     }
     if (rayon && fill!='none') {
      tableauOptions.push(`fill opacity = ${this.opaciteDeRemplissage}`)
    }
    if (rayon && fill != 'none') {
      tableauOptions.push(`fill = ${this.couleurDeRemplissage}`)
    }
    tableauOptions.push(`decorate,decoration={random steps , amplitude = ${amp}pt}`);

		   optionsDraw = "["+tableauOptions.join(',')+"]"

	   if (rayon) return `\\filldraw  ${optionsDraw} (${N.x},${N.y}) -- (${Omega.x},${Omega.y}) -- (${M.x},${M.y}) arc (${azimut}:${anglefin}:${longueur(Omega,M)}) -- cycle ;`
	   else return `\\draw${optionsDraw} (${M.x},${M.y}) arc (${azimut}:${anglefin}:${longueur(Omega,M)}) ;`
	}
}
export function arcMainLevee(M,Omega,angle,amp,rayon=false,fill='none',color='black',fillOpacite=0.2){
  return new ArcMainLevee(M,Omega,angle,amp,rayon,fill,color,fillOpacite)
}


/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%% LES TRANSFORMATIONS %%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/
/**
 * retourne un couple de coordonnées correspondant au centre d'une cible 
 * afin xue le point (x,y) se trouve dans la case correspondante à cellule
 * cellule est une chaine comme 'A1' ou 'B3'
 * @Auteur Jean-Claude Lhote
 */
export function dansLaCibleCarree(x,y,rang,taille,cellule) {
  let lettre=cellule[0],chiffrelettre=lettre.charCodeAt(0)-64
  let Taille=Math.floor(4*taille)
  let chiffre=parseInt(cellule[1]),dx=calcul(randint(-Taille,Taille)/10),dy=calcul(randint(-Taille,Taille)/10)
  let delta=taille/2
  if (chiffre>rang||chiffrelettre>rang) return 'Cette cellule n\'existe pas dans la cible'
  else {
    return [arrondi(x+dx-chiffrelettre*taille+delta+rang*delta,2),arrondi(y+dy-chiffre*2*delta+(rang+1)*delta,2)]
  }
}
/**
 * Comme dansLaCibleCarree mais pour un cible ronde. (voir ci-dessus)
 * Cellule va de A1 à Hn où n est le rang de la cible.
 * taille c'est la différence entre deux rayons successifs.
 * x et y sont les coordonnées du point à cibler.
 * @Auteur Jean-Claude Lhote
 */
export function dansLaCibleRonde(x,y,rang,taille,cellule) {
  let lettre=cellule[0],chiffrelettre=lettre.charCodeAt(0)-64
  let Taille=Math.floor(4*taille)
  let chiffre=parseInt(cellule[1])
  let drayon=calcul(randint(-Taille,Taille)/10)
  let dangle=randint(-20,20)
  let angle=calcul((chiffrelettre-1)*45-157.5+dangle)
  let rayon=calcul(taille/2+(chiffre-1)*taille+drayon)
  let P=similitude(point(1,0),point(0,0),angle,rayon)
  P.x+=x;
  P.y+=y
  if (chiffre>rang||chiffrelettre>8) return 'Cette cellule n\'existe pas dans la cible'
  else {
    return [arrondi(P.x,2),arrondi(P.y,2)]
  }
}

/**
 * création d'une cible carrée pour l'auto-correction
 * @Auteur Jean-Claude Lhote
 * @param {} param0 
 */
function CibleCarree({x=0,y=0,rang=4,num,taille=0.6}){
  ObjetMathalea2D.call(this);
  this.x=x;
  this.y=y;
  this.rang=rang;
  if (typeof(num)!='undefined') this.num=num;
  this.taille=taille;
  this.color='gray';
  this.opacite=0.5;
  let objets=[]
  let numero
  if (typeof(num)!='undefined') {
    numero=texteParPosition(nombre_avec_espace(num),x-rang*this.taille/4,y-rang*this.taille/4,'milieu',this.color)
    numero.opacite=0.5
    numero.taille=30*this.taille
    numero.contour=true
    objets.push(numero)
  }
    let lettre,chiffre
  objets.push(grille(calcul(x-rang*this.taille/2),calcul(y-rang*this.taille/2),calcul(x+rang*this.taille/2),calcul(y+rang*this.taille/2),this.color,this.opacite,this.taille,false))
  for (let i=0;i<rang;i++) {
    lettre=texteParPosition(lettre_depuis_chiffre(1+i),x-rang*this.taille/2+(2*i+1)*this.taille/2,y-(rang+1)*this.taille/2,'milieu')
    chiffre=texteParPosition(nombre_avec_espace(i+1),x-(rang+1)*this.taille/2,y-rang*this.taille/2+(2*i+1)*this.taille/2,'milieu')
    lettre.taille=10*this.taille
    chiffre.taille=10*this.taille
    objets.push(lettre)
    objets.push(chiffre)
  }

  this.svg = function (coeff) {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.svg(coeff);
    }
    return code;
  };
  this.tikz = function () {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.tikz();
    }
    return code;
  };
}
export function cibleCarree({x=0,y=0,rang=4,num,taille=0.6}){
  return new CibleCarree({x:x,y:y,rang:rang,num:num,taille:taille})
}
/**
 * création d'une cible ronde pour l'auto-correction
 * @Auteur Jean-Claude Lhote
 * (x,y) sont les coordonnées du centre de la cible 
 * Les secteurs de la cible fot 45°. Ils sont au nombre de rang*8
 * Repérage de A1 à Hn où n est le rang.
 */
function CibleRonde({x=0,y=0,rang=3,num,taille=0.3}) {
  ObjetMathalea2D.call(this);
  this.x=x;
  this.y=y;
  this.num=num;
  this.taille=taille;
  this.rang=rang
  this.opacite=0.5
  this.color='gray'
  let objets=[],numero,c,centre,azimut,rayon

  centre =point(this.x,this.y,this.y)
  azimut=point(this.x+this.rang*this.taille,this.y)
  let azimut2=pointSurSegment(centre,azimut,longueur(centre,azimut)+0.3)
  for (let i=0;i<8;i++) {
    rayon=segment(centre,rotation(azimut,centre,45*i))
    rayon.color=this.color
    rayon.opacite=this.opacite
    objets.push(rayon)
    objets.push(texteParPoint(lettre_depuis_chiffre(1+i),rotation(azimut2,centre,45*i+22.5),'milieu','gray'))
  }
  for (let i=0;i<this.rang;i++){
    c=cercle(point(this.x,this.y),this.taille*(1+i))
    c.opacite=this.opacite
    c.color=this.color
  objets.push(c);
  }
  numero=texteParPosition(nombre_avec_espace(num),this.x,this.y,0,'gray')
  numero.opacite=0.5
  numero.taille=30
  numero.contour=true
  objets.push(numero)
  this.svg = function (coeff) {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.svg(coeff);
    }
    return code;
  };
  this.tikz = function () {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.tikz();
    }
    return code;
  };
}
export function cibleRonde({x=0,y=0,rang=3,num=1,taille=0.3}) {
  return new CibleRonde({x:x,y:y,rang:rang,num:num,taille:taille})
}
/**
 * création d'une cible ronde pour l'auto-correction
 * @Auteur Jean-Claude Lhote
 * (x,y) sont les coordonnées du centre de la cible 
 * Les secteurs de la cible fot 45°. Ils sont au nombre de rang*8
 * Repérage de A1 à Hn où n est le rang.
 */
function CibleCouronne({x=0,y=0,taille=5}) {
  ObjetMathalea2D.call(this);
  this.x=x;
  this.y=y;
  this.taille=taille;
  this.opacite=0.5
  this.color='gray'
  let objets=[],numero,centre,azimut,rayon,rayon1,rayon2,arc1,arc2

  centre =point(this.x,this.y,this.y)
  azimut=point(this.x+this.taille,this.y)
  let azimut2=pointSurSegment(centre,azimut,longueur(centre,azimut)+1)
  for (let i=0;i<18;i++) {
    rayon=segment(azimut,azimut2)
    rayon1=rotation(rayon,centre,20/3)
    rayon2=rotation(rayon,centre,40/3)
    rayon2.pointilles=1
    rayon1.pointilles=1
    rayon1.color=this.color
    rayon2.color=this.color
    rayon1.opacite=this.opacite
    rayon2.opacite=this.opacite
    arc1=arc(azimut,centre,20)
    arc2=arc(azimut2,centre,20)
    numero=texteParPoint(lettre_depuis_chiffre(1+i),rotation(milieu(azimut,azimut2),centre,10),'milieu','gray')
    numero.contour=true
    rayon.color=this.color
    rayon.opacite=this.opacite
    arc1.color=this.color
    arc2.color=this.color
    arc1.opacite=this.opacite
    arc2.opacite=this.opacite

    objets.push(rayon,rayon1,rayon2,arc1,arc2,numero)
    azimut=rotation(azimut,centre,20)
    azimut2=rotation(azimut2,centre,20)
  }
  this.svg = function (coeff) {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.svg(coeff);
    }
    return code;
  };
  this.tikz = function () {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.tikz();
    }
    return code;
  };
}

export function cibleCouronne({x=0,y=0,taille=5}) {
  return new CibleCouronne({x:x,y:y,taille:taille})
}

/**
 * M = tion(O,v) //M est l'image de O dans la translation de vecteur v
 * M = translation(O,v,'M') //M est l'image de O dans la translation de vecteur v et se nomme M
 * M = translation(O,v,'M','below') //M est l'image de O dans la translation de vecteur v, se nomme M et le nom est en dessous du point
 *
 * @Auteur Rémi Angot
 */
export function translation(O, v, nom = "", positionLabel = "above") {
  if (O.constructor == Point) {
    let x = calcul(O.x + v.x);
    let y = calcul(O.y + v.y);
    return point(x, y, nom, positionLabel);
  }
  if (O.constructor == Polygone) {
    let p2 = [];
    for (let i = 0; i < O.listePoints.length; i++) {
      p2[i] = translation(O.listePoints[i], v);
      p2[i].nom = O.listePoints[i].nom+`\'`
    }
    return polygone(p2);
  }
  if (O.constructor == Droite) {
    let M = translation(point(O.x1, O.y1), v);
    let N = translation(point(O.x2, O.y2), v);
    return droite(M, N);
  }
  if (O.constructor == Segment) {
    let M = translation(O.extremite1, v);
    let N = translation(O.extremite2, v);
    let s = segment(M, N);
    s.styleExtremites = O.styleExtremites;
    return s;
  }
  /*if (O.constructor==DemiDroite) {
		let M = translation(O.extremite1,v)
		let N = translation(O.extremite2,v)
		let s = demiDroite(M,N)
		s.styleExtremites = O.styleExtremites
		return s
	}
*/
  if (O.constructor == Vecteur) {
    return O;
  }
}

/**
 * M = translation2Points(O,A,B) //M est l'image de O dans la translation qui transforme A en B
 * M = translation2Points(O,A,B,'M') //M est l'image de O dans la translation qui transforme A en B et se nomme M
 * M = translation2Points(O,A,B,'M','below') //M est l'image de O dans la translation qui transforme A en B, se nomme M et le nom est en dessous du point
 *
 * @Auteur Rémi Angot
 */

export function translation2Points(O, A, B, nom = "", positionLabel = "above") {
  if (O.constructor == Point) {
    let x = calcul(O.x + B.x - A.x);
    let y = calcul(O.y + B.y - A.y);
    return point(x, y, nom, positionLabel);
  }
  if (O.constructor == Polygone) {
    let p2 = [];
    for (let i = 0; i < O.listePoints.length; i++) {
      p2[i] = translation2Points(O.listePoints[i], O, A, B);
      p2[i].nom = A.listePoints[i].nom+`\'`
    }
    return polygone(p2);
  }
  if (O.constructor == Droite) {
    let M = translation2Points(point(O.x1, O.y1), A, B);
    let N = translation2Points(point(O.x2, O.y2), A, B);
    return droite(M, N);
  }
  if (O.constructor == Segment) {
    let M = translation2Points(O.extremite1, A, B);
    let N = translation2Points(O.extremite2, A, B);
    let s = segment(M, N);
    s.styleExtremites = O.styleExtremites;
    return s;
  }
  /*	if (O.constructor==DemiDroite) {
		let M = translation2Points(O.extremite1,A,B)
		let N = translation2Points(O.extremite2,A,B)
		let s = demiDroite(M,N)
		s.styleExtremites = O.styleExtremites
		return s
	}
*/
  if (A.constructor == Vecteur) {
    return A;
  }
}

/**
 * M = rotation(A,O,angle) //M est l'image de A dans la rotation de centre O et d'angle angle
 * M = rotation(A,O,angle,'M') //M est l'image de A dans la rotation de centre O et d'angle angle et se nomme M
 * M = rotation(A,O,angle,'M','below') //M est l'image de A dans la rotation de centre O et d'angle angle, se nomme M et le nom est en dessous
 *
 * @Auteur Rémi Angot et Jean-Claude Lhote
 */
export function rotation(A, O, angle, nom, positionLabel) {
  if (A.constructor == Point) {
    let x = calcul(
      O.x +
        (A.x - O.x) * Math.cos((angle * Math.PI) / 180) -
        (A.y - O.y) * Math.sin((angle * Math.PI) / 180)
    );
    let y = calcul(
      O.y +
        (A.x - O.x) * Math.sin((angle * Math.PI) / 180) +
        (A.y - O.y) * Math.cos((angle * Math.PI) / 180)
    );
    return point(x, y, nom, positionLabel);
  }
  if (A.constructor == Polygone) {
    let p2 = [];
    for (let i = 0; i < A.listePoints.length; i++) {
      p2[i] = rotation(A.listePoints[i], O, angle);
      p2[i].nom = A.listePoints[i].nom+`\'`
    }
    return polygone(p2);
  }
  if (A.constructor == Droite) {
    let M = rotation(point(A.x1, A.y1), O, angle);
    let N = rotation(point(A.x2, A.y2), O, angle);
    return droite(M, N);
  }
  if (A.constructor == Segment) {
    let M = rotation(A.extremite1, O, angle);
    let N = rotation(A.extremite2, O, angle);
    let s = segment(M, N);
    s.styleExtremites = A.styleExtremites;
    return s;
  }
  /*if (A.constructor==DemiDroite) {
		let M = rotation(A.extremite1,O,angle)
		let N = rotation(A.extremite2,O,angle)
		let s = demiDroite(M,N)
		s.styleExtremites = A.styleExtremites
		return s
	}
*/
  if (A.constructor == Vecteur) {
    let x = calcul(
      A.x * Math.cos((angle * Math.PI) / 180) -
        A.y * Math.sin((angle * Math.PI) / 180)
    );
    let y = calcul(
      A.x * Math.sin((angle * Math.PI) / 180) +
        A.y * Math.cos((angle * Math.PI) / 180)
    );
    let v = vecteur(x, y);
    return v;
  }
}

/**
 * @Auteur Jean-Claude Lhote
 * A1 Le point de départ de la flèche 
 * centre Le centre de la rotation
 * sens Le sens (+1 ou -1) de la rotation. +1=sens trigo
 */
function Sens_de_rotation(A1,centre,sens) {
  ObjetMathalea2D.call(this);
  let arc1,s1,s2,A2,F1,F2,objets=[]
  arc1=arc(A1,centre,20*sens)
  A2=rotation(A1,centre,20*sens)
  F1=similitude(A2,centre,-5*sens,0.95)
  F2=similitude(A2,centre,-5*sens,1.05)
  s1=segment(A2,F1)
  s2=segment(A2,F2)
  objets.push(arc1,s1,s2)

  this.svg = function (coeff) {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.svg(coeff);
    }
    return code;
  };
  this.tikz = function () {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.tikz();
    }
    return code;
  };
}
export function sens_de_rotation(A,O,sens) {
  return new Sens_de_rotation(A,O,sens)
}
/**
 * M = homothetie(A,O,k) //M est l'image de A dans l'homothétie de centre O et de rapport k
 * M = homothetie(A,O,k,'M') //M est l'image de A dans l'homothétie de centre O et de rapport k et se nomme M
 * M = homothetie(A,O,k,'M') //M est l'image de A dans l'homothétie de centre O et de rapport k, se nomme M et le nom est en dessous du point
 *
 * @Auteur Rémi Angot
 */
export function homothetie(A, O, k, nom, positionLabel) {
  if (A.constructor == Point) {
    let x = calcul(O.x + k * (A.x - O.x));
    let y = calcul(O.y + k * (A.y - O.y));
    return new Point(x, y, nom, positionLabel);
  }
  if (A.constructor == Polygone) {
    let p2 = [];
    for (let i = 0; i < A.listePoints.length; i++) {
      p2[i] = homothetie(A.listePoints[i], O, k);
      p2[i].nom = A.listePoints[i].nom+`\'`
    }
    return polygone(p2);
  }
  if (A.constructor == Droite) {
    let M = homothetie(point(A.x1, A.y1), O, k);
    let N = homothetie(point(A.x2, A.y2), O, k);
    return droite(M, N);
  }
  if (A.constructor == Segment) {
    let M = homothetie(A.extremite1, O, k);
    let N = homothetie(A.extremite2, O, k);
    let s = segment(M, N);
    s.styleExtremites = A.styleExtremites;
    return s;
  }
  /*	if (A.constructor==DemiDroite) {
		let M = homothetie(A.extremite1,O,k)
		let N = homothetie(A.extremite2,O,k)
		let s = demiDroite(M,N)
		s.styleExtremites = A.styleExtremites
		return s
	}
	*/
  if (A.constructor == Vecteur) {
    let x = A.x;
    let y = A.y;
    let v = vecteur(x * k, y * k);
    return v;
  }
}

/**
 * M = pointParSymetrieAxiale(A,d)// M est l'image de A dans la symétrie axiale d'axe d.
 * d est un objet de type Droite (son équation ax+by+c=0 renseignée)
 * A est un objet de type Point (ses coordonnées x et y renseignées)
 * @Auteur Jean-Claude Lhote
 */
export function symetrieAxiale(A, d, nom = "", positionLabel = "above") {
  let x, y;
  let a = d.a,
    b = d.b,
    c = d.c,
    k = 1 / (a * a + b * b);
  if (A.constructor == Point) {
    if (a == 0) {
      x = A.x;
      y = calcul(-(A.y + (2 * c) / b));
    } else if (b == 0) {
      y = A.y;
      x = calcul(-(A.x + (2 * c) / a));
    } else {
      x = calcul(k * ((b * b - a * a) * A.x - 2 * a * b * A.y - 2 * a * c));
      y = calcul(
        k *
          ((a * a - b * b) * A.y - 2 * a * b * A.x + (a * a * c) / b - b * c) -
          c / b
      );
    }
    return point(x, y, nom, positionLabel);
  }
  if (A.constructor == Polygone) {
    let p2 = [];
    for (let i = 0; i < A.listePoints.length; i++) {
      p2[i] = symetrieAxiale(A.listePoints[i], d);
      p2[i].nom = A.listePoints[i].nom+`\'`
    }
    return polygone(p2);
  }
  if (A.constructor == Droite) {
    let M = symetrieAxiale(point(A.x1, A.y1), d);
    let N = symetrieAxiale(point(A.x2, A.y2), d);
    return droite(M, N);
  }
  if (A.constructor == Segment) {
    let M = symetrieAxiale(A.extremite1, d);
    let N = symetrieAxiale(A.extremite2, d);
    let s = segment(M, N);
    s.styleExtremites = A.styleExtremites;
    return s;
  }
  /*	if (A.constructor==DemiDroite) {
 		let M = symetrieAxiale(A.extremite1,d)
 		let N = symetrieAxiale(A.extremite2,d)
 		let s = demiDroite(M,N)
 		s.styleExtremites = A.styleExtremites
 		return s
	 }*/
  if (A.constructor == Vecteur) {
    let O;
    if (egal(b, 0)) {
      O = point(calcul(-c / a), 0);
    } else O = point(0, calcul(-c / b));
    let M = translation(O, A);
    let N = symetrieAxiale(M, d);
    let v = vecteur(O, N);
    return v;
  }
}

/**
 * Calcule la distance entre un point et une droite.
 * 1ere version utilisant la projection orthogonale
 * 2eme version utilisant la symétrie axiale (abandonnée)
 * @Auteur Jean-Claude Lhote
 * @param {*} A 
 * @param {*} d 
 */
export function distancePointDroite(A,d) {
  let M=projectionOrtho(A,d)
  return longueur(A,M,9)
}
/**
 * N = projectionOrtho(M,d,'N','below left')
 *@Auteur Jean-Claude Lhote
 */
export function projectionOrtho(M, d, nom = " ", positionLabel = "above") {
  let a = d.a,
    b = d.b,
    c = d.c,
    k = calcul(1 / (a * a + b * b));
  let x, y;
  if (M.constructor == Point) {
    if (a == 0) {
      x = M.x;
      y = calcul(-c / b);
    } else if (b == 0) {
      y = M.y;
      x = calcul(-c / a);
    } else {
      x = calcul(k * (b * b * M.x - a * b * M.y - a * c));
      y = calcul(k * (-a * b * M.x + a * a * M.y + (a * a * c) / b) - c / b);
    }
    return point(x, y, nom, positionLabel);
  }
  if (M.constructor == Vecteur) {
    let O;
    if (egal(b, 0)) O = point(calcul(-c / a), 0);
    else O = point(0, calcul(-c / b));
    let A = translation(O, M);
    let N = projectionOrtho(A, d);
    let v = vecteur(O, N);
    return v;
  }
}
/**
 * N = affiniteOrtho(M,d,rapport,'N','rgiht')
 * @Auteur = Jean-Claude Lhote
 */
export function affiniteOrtho(A, d, k, nom = " ", positionLabel = "above") {
  let a = d.a,
    b = d.b,
    c = d.c,
    q = calcul(1 / (a * a + b * b));
  let x, y;
  if (A.constructor == Point) {
    if (a == 0) {
      x = A.x;
      y = calcul(k * A.y + (c * (k - 1)) / b);
    } else if (b == 0) {
      y = A.y;
      x = calcul(k * A.x + (c * (k - 1)) / a);
    } else {
      x = calcul(q * (b * b * A.x - a * b * A.y - a * c) * (1 - k) + k * A.x);
      y = calcul(
        q * (a * a * A.y - a * b * A.x + (a * a * c) / b) * (1 - k) +
          (k * c) / b +
          k * A.y -
          c / b
      );
    }
    return point(x, y, nom, positionLabel);
  }
  if (A.constructor == Polygone) {
    let p2 = [];
    for (let i = 0; i < A.listePoints.length; i++) {
      p2[i] = affiniteOrtho(A.listePoints[i], d, k);
      p2[i].nom = A.listePoints[i].nom+`\'`
    }
    return polygone(p2);
  }
  if (A.constructor == Droite) {
    let M = affiniteOrtho(point(A.x1, A.y1), d, k);
    let N = affiniteOrtho(point(A.x2, A.y2), d, k);
    return droite(M, N);
  }
  if (A.constructor == Segment) {
    let M = affiniteOrtho(A.extremite1, d, k);
    let N = affiniteOrtho(A.extremite2, d, k);
    let s = segment(M, N);
    s.styleExtremites = A.styleExtremites;
    return s;
  }
  /*	if (A.constructor == DemiDroite) {
 		let M = affiniteOrtho(A.extremite1, d,k)
 		let N = affiniteOrtho(A.extremite2, d,k)
 		let s = demiDroite(M, N)
 		s.styleExtremites = A.styleExtremites
 		return s
	 }*/
  if (A.constructor == Vecteur) {
    let O;
    if (egal(b, 0)) {
      O = point(calcul(-c / a), 0);
    } else O = point(0, calcul(-c / b));
    let M = translation(O, A);
    let N = affiniteOrtho(M, d, k);
    let v = vecteur(O, N);
    return v;
  }
}
/**
 *
 * @param {Point} A // Le point dont on veut l'image
 * @param {Point} O // Le centre de la similitude
 * @param {number} a // L'angle de la rotation
 * @param {number} k // le rapport de l'homothétie
 * @param {string} nom
 * @param {string} positionLabel
 * M = similitude(B,O,30,0.7,'M') // Le point M est l'image de B dans la similitude de centre O d'angle 30° et de rapport 0.7
 * @Auteur Jean-Claude Lhote
 */
export function similitude(A, O, a, k, nom = " ", positionLabel = "above") {
  if (A.constructor == Point) {
    let ra = Math.radians(a);
    let x = calcul(
      O.x + k * (Math.cos(ra) * (A.x - O.x) - Math.sin(ra) * (A.y - O.y))
    );
    let y = calcul(
      O.y + k * (Math.cos(ra) * (A.y - O.y) + Math.sin(ra) * (A.x - O.x))
    );
    return point(x, y, nom, positionLabel);
  }
  if (A.constructor == Polygone) {
    let p2 = [];
    for (let i = 0; i < A.listePoints.length; i++) {
      p2[i] = similitude(A.listePoints[i], O, a, k);
      p2[i].nom = A.listePoints[i].nom+`\'`
    }
    return polygone(p2);
  }
  if (A.constructor == Droite) {
    let M = similitude(point(A.x1, A.y1), O, a, k);
    let N = similitude(point(A.x2, A.y2), O, a, k);
    return droite(M, N);
  }
  if (A.constructor == Segment) {
    let M = similitude(A.extremite1, O, a, k);
    let N = similitude(A.extremite2, O, a, k);
    let s = segment(M, N);
    s.styleExtremites = A.styleExtremites;
    return s;
  }
  /*if (A.constructor==DemiDroite) {
 		let M = similitude(A.extremite1,O,a,k)
 		let N = similitude(A.extremite2,O,a,k)
 		let s = demiDroite(M,N)
 		s.styleExtremites = A.styleExtremites
 		return s
 	}*/
  if (A.constructor == Vecteur) {
    let V = rotation(A, O, a);
    let v = homothetie(V, O, k);
    return v;
  }
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%% LES TRANSFORMATIONS ANIMÉES %%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * translationAnimee(s,v) //Animation de la translation de vecteur v pour s
 * translationAnimee([a,b,c],v) //Animation de la translation de vecteur v pour les objets a, b et v
 *
 * @Auteur Rémi Angot
 */
function TranslationAnimee(
  liste,
  v,
  animation = 'begin="0s" dur="2s" repeatCount="indefinite"'
) {
  ObjetMathalea2D.call(this);
  this.svg = function (coeff) {
    let code = `<g> `;
    if (Array.isArray(liste)) {
      for (const objet of liste) {
        code += "\n" + objet.svg(coeff);
      }
    } else {
      //si ce n'est pas une liste
      code += "\n" + liste.svg(coeff);
    }
    code += `<animateMotion path="M 0 0 l ${v.xSVG(coeff)} ${v.ySVG(
      coeff
    )} " ${animation} />`;
    code += `</g>`;
    return code;
  };
}
export function translationAnimee(...args) {
  return new TranslationAnimee(...args);
}

/**
 * rotationAnimee(s,O,a) //Animation de la rotation de centre O et d'angle a pour s
 * rotationAnimee([a,b,c],O,a) //Animation de la rotation de centre O et d'angle a pour les objets a, b et c
 *
 * @Auteur Rémi Angot
 */
function RotationAnimee(
  liste,
  O,
  angle,
  animation = 'begin="0s" dur="2s" repeatCount="indefinite"'
) {
  ObjetMathalea2D.call(this);
  this.svg = function (coeff) {
    let code = `<g> `;
    if (Array.isArray(liste)) {
      for (const objet of liste) {
        code += "\n" + objet.svg(coeff);
      }
    } else {
      //si ce n'est pas une liste
      code += "\n" + liste.svg(coeff);
    }

    code += `<animateTransform
	attributeName="transform"
	type="rotate"
	from="0 ${O.xSVG(coeff)} ${O.ySVG(coeff)}"
	to="${-angle} ${O.xSVG(coeff)} ${O.ySVG(coeff)}"
	${animation}
	/>`;
    code += `</g>`;
    return code;
  };
}
export function rotationAnimee(...args) {
  return new RotationAnimee(...args);
}
/**
 * homothetieAnimee(s,O,k) //Animation de la homothetie de centre O et de rapport k pour s
 * homothetieAnimee([a,b,c],O,k) //Animation de la homothetie de centre O et de rapport k pour les objets a, b et v
 *
 * @Auteur Rémi Angot
 */
function HomothetieAnimee(
  p,
  O,
  k,
  animation = 'begin="0s" dur="2s" repeatCount="indefinite"'
) {
  ObjetMathalea2D.call(this);
  this.svg = function (coeff) {
    let binomesXY1 = p.binomesXY(coeff);
    let p2 = homothetie(p, O, k);
    p2.isVisible = false;
    let binomesXY2 = p2.binomesXY(coeff);
    let code = `<polygon stroke="${p.color}" stroke-width="${p.epaisseur}" fill="none" >
		<animate attributeName="points" ${animation}
		from="${binomesXY1}"
		to="${binomesXY2}"
		/>
		</polygon>`;
    return code;
  };
}
export function homothetieAnimee(...args) {
  return new HomothetieAnimee(...args);
}

/**
 * symetrieAnimee(s,d) //Animation de la symetrie d'axe (d) pour s
 * symetrieAnimee([a,b,c],d) //Animation de la symetrie d'axe (d) pour les objets a, b et v
 *
 * @Auteur Rémi Angot
 */
function SymetrieAnimee(
  p,
  d,
  animation = 'begin="0s" dur="2s" repeatCount="indefinite"'
) {
  ObjetMathalea2D.call(this);
  this.svg = function (coeff) {
    let binomesXY1 = p.binomesXY(coeff);
    let p2 = symetrieAxiale(p, d);
    p2.isVisible = false;
    let binomesXY2 = p2.binomesXY(coeff);
    let code = `<polygon stroke="${p.color}" stroke-width="${p.epaisseur}" fill="none" >
		<animate attributeName="points" ${animation}
		from="${binomesXY1}"
		to="${binomesXY2}"
		/>
		</polygon>`;
    return code;
  };
}
export function symetrieAnimee(...args) {
  return new SymetrieAnimee(...args);
}

function AffiniteOrthoAnimee(
  p,
  d,
  k,
  animation = 'begin="0s" dur="2s" repeatCount="indefinite"'
) {
  ObjetMathalea2D.call(this);
  this.svg = function (coeff) {
    let binomesXY1 = p.binomesXY(coeff);
    let p2 = affiniteOrtho(p, d, k);
    p2.isVisible = false;
    let binomesXY2 = p2.binomesXY(coeff);
    let code = `<polygon stroke="${p.color}" stroke-width="${p.epaisseur}" fill="none" >
		<animate attributeName="points" ${animation}
		from="${binomesXY1}"
		to="${binomesXY2}"
		/>
		</polygon>`;
    return code;
  };
}
export function affiniteOrthoAnimee(...args) {
  return new AffiniteOrthoAnimee(...args);
}

/**
 * Rend visible un element d'après son id
 * 
 * @Auteur Rémi Angot
 * @param {string} id 
 * 
 */
export function montrerParDiv(id) {
  document.getElementById(id).style.visibility = "visible";
}

/**
 * Rend invisible un element d'après son id
 * 
 * @Auteur Rémi Angot
 * @param {string} id 
 * 
 */
export function cacherParDiv(id) {
  document.getElementById(id).style.visibility = "hidden";
}

/**
 * Masque un objet puis l'affiche au bout de t0 s avant de recommencer r fois toutes les t secondes
 * 
 * 
 * @param {any} objet dont l'identifiant est accessible par objet.id
 * @param {number} [t0=1] temps en secondes avant l'apparition
 * @param {number} [t=5] temps à partir duquel l'animation recommence
 * @param {string} [r='Infinity'] nombre de répétition (infini si ce n'est pas un nombre)

 * 
 * 
 */
export function afficherTempo(objet, t0 = 1, t = 5, r = 'Infinity') {
  let compteur = 1 // Nombre d'animations
  let checkExist = setInterval(function () {
    if (document.getElementById(objet.id)) {
      clearInterval(checkExist);
      cacherParDiv(objet.id)
      if (r==1){ // On le montre au bout de t0 et on ne le cache plus
        setTimeout(function(){montrerParDiv(objet.id)},t0*1000) 
      } else {
        let cacheRepete = setInterval(function(){cacherParDiv(objet.id)},t*1000) // On cache tous les t s
        setTimeout(function(){
          montrerParDiv(objet.id) // On attend t0 pour montrer
          let montreRepete = setInterval(function(){
            montrerParDiv(objet.id)
            compteur++
            if (typeof r === 'number'){
              if (compteur >=r){
                clearInterval(cacheRepete)
                clearInterval(montreRepete)
              }
            }
            },t*1000) // On montre tous les t s (vu qu'on a décalé de t0)
          
        },t0*1000) // Fin de l'animation en boucle
      }
    }
  }, 100); // vérifie toutes les  100ms que le div existe
}


/**
 * Masque un objet puis l'affiche au bout de t0 s avant de recommencer r fois toutes les t secondes
 * 
 * 
 * @param {any} objet dont l'identifiant est accessible par objet.id
 * @param {number} [t0=1] temps en secondes avant l'apparition
 * @param {number} [t=5] temps à partir duquel l'animation recommence
 * @param {string} [r='Infinity'] nombre de répétition (infini si ce n'est pas un nombre)

 * 
 * 
 */
export function afficherTempoId(id, t0 = 1, t = 5, r = 'Infinity') {
  let compteur = 1 // Nombre d'animations
  let checkExist = setInterval(function () {
    if (document.getElementById(id)) {
      clearInterval(checkExist);
      cacherParDiv(id)
      if (r==1){ // On le montre au bout de t0 et on ne le cache plus
        setTimeout(function(){montrerParDiv(id)},t0*1000) 
      } else {
        let cacheRepete = setInterval(function(){cacherParDiv(id)},t*1000) // On cache tous les t s
        setTimeout(function(){
          montrerParDiv(id) // On attend t0 pour montrer
          let montreRepete = setInterval(function(){
            montrerParDiv(id)
            compteur++
            if (typeof r === 'number'){
              if (compteur >=r){
                clearInterval(cacheRepete)
                clearInterval(montreRepete)
              }
            }
            },t*1000) // On montre tous les t s (vu qu'on a décalé de t0)
          
        },t0*1000) // Fin de l'animation en boucle
      }
    }
  }, 100); // vérifie toutes les  100ms que le div existe
}


/**
 * Rend visible un element d'après son id
 * 
 * @Auteur Rémi Angot
 * @param {any} id 
 * 
 */
export function afficherUnParUn(objets, t = 1, r = 'Infinity', tApresDernier = 5){
  let t0 = t
  let tf = objets.length*t+tApresDernier
  for (let objet of objets){
    afficherTempo(objet, t0, tf, r);
    t0 +=t;
  }
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% LE TRIANGLE %%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * Médiane issue de A relative à [BC]
 * @Auteur Jean-Claude Lhote
 * @param {Point} A
 * @param {Point} B
 * @param {Point} C
 * @param {string} color
 */
export function medianeTriangle(A, B, C, color = "black") {
  let I = milieu(B, C);
  return droite(A, I, "", color);
}

/**
 * Centre de gravité du triangle ABC
 * @Auteur Jean-Claude Lhote
 * @param {Point} A
 * @param {Point} B
 * @param {Point} C
 * @param {string} color
 */
export function centreGraviteTriangle(A, B, C, nom = "") {
  let d = medianeTriangle(B, A, C);
  let e = medianeTriangle(A, B, C);
  d.isVisible = false;
  e.isVisible = false;
  let p = pointIntersectionDD(d, e);
  let x = p.x;
  let y = p.y;
  return point(x, y, "", nom);
}

/**
 * Hauteur issue de A relative à [BC]
 * @Auteur Jean-Claude Lhote
 * @param {Point} A
 * @param {Point} B
 * @param {Point} C
 * @param {string} color
 */
export function hauteurTriangle(A, B, C, color = "black") {
  let d = droite(B, C);
  d.isVisible = false;
  let p = projectionOrtho(A, d);
  return droite(p, A, "", color);
}
export function CodageHauteurTriangle(A, B, C, color = "black") {
  ObjetMathalea2D.call(this);
  this.color = color;
  let d = droite(B, C);
  let p = projectionOrtho(A, d);
  let q = rotation(A, p, -90);
  if (B.x < C.x) {
    if (p.x > C.x || p.x < B.x) {
      d.isVisible = true;
      d.pointilles = true;
    } else d.isVisible = false;
  } else if (C.x < B.x) {
    if (p.x < C.x || p.x > B.x) {
      d.isVisible = true;
      d.pointilles = true;
    } else d.isVisible = false;
  } else if (B.y < C.y) {
    if (p.y > C.y || p.y < B.y) {
      d.isVisible = true;
      d.pointilles = true;
    } else d.isVisible = false;
  } else if (C.y < B.y) {
    if (p.y < C.y || p.y > B.y) {
      d.isVisible = true;
      d.pointilles = true;
    } else d.isVisible = false;
  }
  let c = codageAngleDroit(A, p, q, this.color);
  this.svg = function (coeff) {
    if (d.isVisible) {
      return c.svg(coeff) + "\n\t" + d.svg(coeff);
    } else {
      return c.svg(coeff);
    }
  };
  this.tikz = function () {
    if (d.isVisible) {
      return c.tikz() + "\n\t" + d.tikz();
    } else {
      return c.tikz();
    }
  };
}
export function codageHauteurTriangle(...args) {
  return new CodageHauteurTriangle(...args);
}
function CodageMedianeTriangle(B, C, color = "black", mark = "//") {
  ObjetMathalea2D.call(this);
  this.color = color;
  let O = milieu(B, C);
  let c = codeSegments(mark, this.color, B, O, O, C);
  this.svg = function (coeff) {
    return c.svg(coeff);
  };
  this.tikz = function () {
    return c.tikz(coeff);
  };
}
export function codageMedianeTriangle(...args) {
  return new CodageMedianeTriangle(...args);
}

/**
 * Orthocentre du triangle ABC
 * @Auteur Jean-Claude Lhote
 * @param {Point} A
 * @param {Point} B
 * @param {Point} C
 * @param {string} color
 */
export function orthoCentre(A, B, C, nom = "", positionLabel = "above") {
  let d = hauteurTriangle(B, A, C);
  let e = hauteurTriangle(A, B, C);
  d.isVisible = false;
  e.isVisible = false;
  let p = pointIntersectionDD(d, e);
  let x = p.x;
  let y = p.y;
  return point(x, y, nom, positionLabel);
}

/**
 * Centre du cercle circonscrit au triangle ABC
 * @Auteur Jean-Claude Lhote
 * @param {Point} A
 * @param {Point} B
 * @param {Point} C
 * @param {string} color
 */
export function centreCercleCirconscrit(A, B, C, nom = "", positionLabel = "above") {
  let d = mediatrice(A, B);
  let e = mediatrice(B, C);
  d.isVisible = false;
  e.isVisible = false;
  let p = pointIntersectionDD(d, e);
  let x = p.x;
  let y = p.y;
  return point(x, y, nom, positionLabel);
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% LES CODAGES %%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * codageAngleDroit(A,O,B) //Fait un codage d'angle droit de 4 mm pour l'angle direct AOB
 * codageAngleDroit(A,O,B,.5) //Fait un codage d'angle droit de 5 mm pour l'angle direct AOB
 *
 * @Auteur Rémi Angot
 */
function CodageAngleDroit(A, O, B, color = "black", d = 0.4) {
  ObjetMathalea2D.call(this);
  this.sommet=O
  this.depart=A
  this.arrivee=B
  this.taille=d
  this.color = color;

  this.svg=function(coeff){
    let a=pointSurSegment(this.sommet,this.depart, this.taille*20/coeff);
    let b=pointSurSegment(this.sommet,this.arrivee, this.taille*20/coeff);
    let o = {};
    if (angleOriente(A, this.sommet, B) > 0) {
      o = rotation(this.sommet, a, -90);
    } else {
      o = rotation(this.sommet, a, 90);
    }
    let result = polyline([a, o, b], color);
    result.isVisible = false;
    this.id = result.id;
    return result.svg(coeff);
  }
  this.tikz=function(){
  let a=pointSurSegment(this.sommet,this.depart, this.taille/mathalea.scale);
  let b=pointSurSegment(this.sommet,this.arrivee, this.taille/mathalea.scale);
  let o = {};
  if (angleOriente(A, this.sommet, B) > 0) {
    o = rotation(this.sommet, a, -90);
  } else {
    o = rotation(this.sommet, a, 90);
  }
  return polyline([a, o, b], color).tikz();
}
this.svgml=function(coeff,amp){
  let a=pointSurSegment(this.sommet,this.depart, this.taille*20/coeff);
  let b=pointSurSegment(this.sommet,this.arrivee, this.taille*20/coeff);
  let o = {};
  if (angleOriente(A, this.sommet, B) > 0) {
    o = rotation(this.sommet, a, -90);
  } else {
    o = rotation(this.sommet, a, 90);
  }
  return polyline([a, o, b], color).svgml(coeff,amp);
}
this.tikzml=function(amp){
let a=pointSurSegment(this.sommet,this.depart, this.taille/mathalea.scale);
let b=pointSurSegment(this.sommet,this.arrivee, this.taille/mathalea.scale);
let o = {};
if (angleOriente(A, this.sommet, B) > 0) {
  o = rotation(this.sommet, a, -90);
} else {
  o = rotation(this.sommet, a, 90);
}
return polyline([a, o, b], color).tikzml(amp);
}


}
export function codageAngleDroit(A, O, B, color = "black", d = 0.4){
  return new CodageAngleDroit(A, O, B, color , d )
}
/**
 * afficheLongueurSegment(A,B) // Note la longueur de [AB] au dessus si A est le point le plus à gauche sinon au dessous
 *
 * @Auteur Rémi Angot
 */
function AfficheLongueurSegment(A, B, color = "black", d = 0.5) {
  ObjetMathalea2D.call(this);
  this.color = color;
  this.extremite1=A
  this.extremite2=B
  this.distance=d

  this.svg = function (coeff) {
    let O = milieu(this.extremite1, this.extremite2);
    let M = rotation(this.extremite1, O, -90);
    let N = pointSurSegment(O, M, (this.distance * 20) / coeff);
    let angle;
    let s = segment(this.extremite1, this.extremite2);
    s.isVisible = false;
    let l = string_nombre(arrondi(s.longueur, 1));
    if (this.extremite2.x > this.extremite1.x) {
      angle = -s.angleAvecHorizontale;
    } else {
      angle = 180 - s.angleAvecHorizontale;
    }
    return texteParPoint(l + " cm", N, angle, this.color).svg(coeff);
  };

  this.tikz=function(){
    let O=milieu(this.extremite1,this.extremite2)
    let M = rotation(this.extremite1, O, -90);
  let N = pointSurSegment(O, M, this.distance/mathalea.scale);
  let angle;
  let s = segment(this.extremite1, this.extremite2);
  s.isVisible = false;
  let l = string_nombre(arrondi(s.longueur, 1));
  if (this.extremite2.x > this.extremite1.x) {
    angle = -s.angleAvecHorizontale;
  } else {
    angle = 180 - s.angleAvecHorizontale ;
  }
  return texteParPoint(l + " cm", N, angle, this.color).tikz();

  }


}
export function afficheLongueurSegment(...args) {
  return new AfficheLongueurSegment(...args);
}

/**
 * texteSurSegment(A,B) // Écrit un texte au milieu de [AB] au dessus si A est le point le plus à gauche sinon au dessous
 *
 * @Auteur Rémi Angot
 */
function TexteSurSegment(texte, A, B, color = "black", d = 0.5) {
  ObjetMathalea2D.call(this);
  this.color = color;
  this.extremite1=A
  this.extremite2=B
  this.distance=d
  this.texte=texte
 /* let O = milieu(A, B);
  let M = rotation(A, O, -90);
  let N = pointSurSegment(O, M, d);
  let s = segment(A, B);
  s.isVisible = false;
  let angle;
  if (B.x > A.x) {
    angle = -parseInt(s.angleAvecHorizontale);
  } else {
    angle = -parseInt(s.angleAvecHorizontale) + 180;
  }
  return texteParPoint(texte, N, angle, this.color);
  */
  this.svg=function(coeff){
    let O = milieu(this.extremite1, this.extremite2);
    let M = rotation(this.extremite1, O, -90);
    let N = pointSurSegment(O, M, this.distance*20/coeff);
    let s = segment(this.extremite1, this.extremite2);
    s.isVisible = false;
    let angle;
    if (this.extremite2.x > this.extremite1.x) {
      angle = -s.angleAvecHorizontale;
    } else {
      angle = 180-s.angleAvecHorizontale ;
    }
    return texteParPoint(this.texte, N, angle, this.color).svg(coeff);
  }
  this.tikz=function(){
    let O = milieu(this.extremite1, this.extremite2);
    let M = rotation(this.extremite1, O, -90);
    let N = pointSurSegment(O, M, this.distance/mathalea.scale);
    let s = segment(this.extremite1, this.extremite2);
    s.isVisible = false;
    let angle;
    if (this.extremite2.x > this.extremite1.x) {
      angle = -s.angleAvecHorizontale;
    } else {
      angle = 180-s.angleAvecHorizontale ;
    }
    return texteParPoint(this.texte, N, angle, this.color).tikz();
  }
}
export function texteSurSegment(...args) {
  return new TexteSurSegment(...args);
}

/**
 * afficheMesureAngle(A,B,C) // Affiche la mesure de l'angle ABC arrondie au degré près
 *
 * @Auteur Rémi Angot
 */
export function AfficheMesureAngle(A, B, C, color = "black", distance = 1.5) {
  ObjetMathalea2D.call(this)
  this.depart=A
  this.arrivee=C
  this.sommet=B
  this.distance=distance

  this.svg=function(coeff){
    // let d = bissectrice(A, B, C);
    // d.isVisible = false;
    let M = pointSurSegment(this.sommet, this.depart, this.distance)
    let N = rotation(pointSurSegment(this.sommet,M , this.distance+10/coeff),this.sommet,angleOriente(this.depart,this.sommet,this.arrivee)/2);
    let mesureAngle = arrondi_virgule(angle(this.depart,this.sommet,this.arrivee), 0) + "°";
    return "\n"+texteParPoint(mesureAngle,N , "milieu", color).svg(coeff)+"\n"+arc(M, B, angleOriente(this.depart,this.sommet,this.arrivee)).svg(coeff);
  }
  this.tikz=function(){
   // let d = bissectrice(A, B, C);
    // d.isVisible = false;
    let M = pointSurSegment(this.sommet, this.depart, this.distance);
    let N = rotation(pointSurSegment(this.sommet,M , this.distance+0.5),this.sommet,angleOriente(this.depart,this.sommet,this.arrivee)/2);
    let mesureAngle = arrondi_virgule(angle(this.depart,this.sommet,this.arrivee), 0) + "°";
    return "\n"+texteParPoint(mesureAngle, N, "milieu", color).tikz()+"\n"+arc(M, B, angleOriente(this.depart,this.sommet,this.arrivee)).tikz();
  }
}
export function afficheMesureAngle(...args){
  return new AfficheMesureAngle(...args)
}
/**
 * macote=afficheCoteSegment(s,'x',-1,'red',2) affiche une côte sur une flèche rouge d'epaisseur 2 placée 1cm sous le segment s avec le texte 'x' écrit en noir (par defaut) 0,5cm au-dessus (par defaut)
 * @Auteur Jean-Claude Lhote
 */
function AfficheCoteSegment(
  s,
  Cote = "",
  positionCote = 0.5,
  couleurCote = "black",
  epaisseurCote = 1,
  positionValeur = 0.5,
  couleurValeur = "black"
) {

  // let longueur=s.longueur
  ObjetMathalea2D.call(this);
    this.positionCoteSVG=positionCote*20/mathalea.pixelsParCm
    this.positionCoteTIKZ=positionCote/mathalea.scale
    this.positionValeur=positionValeur
    this.seg=s
    this.cote=Cote

  this.svg = function (coeff) {
  let valeur;
  let A = this.seg.extremite1;
  let B = this.seg.extremite2;
  let v = similitude(vecteur(A, B), A, 90, this.positionCoteSVG / this.seg.longueur);
  let cote = segment(translation(A, v), translation(B, v), couleurCote);
  if (longueur(A, B) > 1) cote.styleExtremites = "<->";
  else cote.styleExtremites = ">-<";
  cote.epaisseur = epaisseurCote;
  if (this.cote == "")
    valeur = afficheLongueurSegment(
      cote.extremite1,
      cote.extremite2,
      couleurValeur,
      this.positionValeur
    );
  else
    valeur = texteSurSegment(
      this.cote,
      cote.extremite1,
      cote.extremite2,
      couleurValeur,
      this.positionValeur
    );
    return "\n\t" + cote.svg(coeff) +"\n\t"+valeur.svg(coeff);
    }

  this.tikz = function () {
    let valeur;
    let A = this.seg.extremite1;
    let B = this.seg.extremite2;
    let v = similitude(vecteur(A, B), A, 90, this.positionCoteTIKZ / this.seg.longueur);
    let cote = segment(translation(A, v), translation(B, v), couleurCote);
    if (longueur(A, B) > 1) cote.styleExtremites = "<->";
    else cote.styleExtremites = ">-<";
    cote.epaisseur = epaisseurCote;
    if (this.cote == "")
      valeur = afficheLongueurSegment(
        cote.extremite1,
        cote.extremite2,
        couleurValeur,
        this.positionValeur
      );
    else
      valeur = texteSurSegment(
        this.cote,
        cote.extremite1,
        cote.extremite2,
        couleurValeur,
        this.positionValeur
      );
      return "\n\t" + cote.tikz() +"\n\t"+valeur.tikz();
  };
}
export function afficheCoteSegment(...args) {
  return new AfficheCoteSegment(...args);
}
/**
 * codeSegment(A,B,'×','blue') // Code le segment [AB] avec une croix bleue
 * Attention le premier argument ne peut pas être un segment
 *
 * @Auteur Rémi Angot
 */
function CodeSegment(A, B, mark = "||", color = "black") {
  ObjetMathalea2D.call(this);
  this.color = color;
  let O = milieu(A, B);
  let s = segment(A, B);
  s.isVisible = false;
  let angle;
  if (B.x > A.x) {
    angle = -parseInt(s.angleAvecHorizontale);
  } else {
    angle = -parseInt(s.angleAvecHorizontale) + 180;
  }
  return texteParPoint(mark, O, angle, this.color);
}
export function codeSegment(...args) {
  return new CodeSegment(...args);
}
/**
 * codeSegments('×','blue',A,B, B,C, C,D) // Code les segments [AB], [BC] et [CD] avec une croix bleue
 * codeSegments('×','blue',[A,B,C,D]) // Code les segments [AB], [BC], [CD] et [DA] (attention, chemin fermé,pratique pour des polygones pas pour des lignes brisées)
 * codeSegments('×','blue',s1,s2,s3) // Code les segments s1, s2 et s3 avec une croix bleue
 * codeSegments('×','blue',p.listePoints) // Code tous les segments du polygone avec une croix bleue
 *
 * @Auteur Rémi Angot
 */
function CodeSegments(mark = "||", color = "black", ...args) {
  ObjetMathalea2D.call(this);
  this.svg = function (coeff) {
    let code = "";
    if (Array.isArray(args[0])) {
      // Si on donne une liste de points
      for (let i = 0; i < args[0].length - 1; i++) {
        let codage = codeSegment(args[0][i], args[0][i + 1], mark, color);
        codage.isVisible = false;
        code += codage.svg(coeff);
        code += "\n";
      }
      let codage = codeSegment(args[0][args[0].length - 1],args[0][0],mark,color)
      codage.isVisible = false;
      code += codage.svg(coeff);
      code += "\n";
    } else if (args[0].constructor == Segment) {
      for (let i = 0; i < args.length; i++) {
        let codage = codeSegment(args[i].extremite1,args[i].extremite2,mark,color);
        codage.isVisible = false;
        code += codage.svg(coeff);
        code += "\n";
      }
    } else {
      for (let i = 0; i < args.length; i += 2) {
        let codage = codeSegment(args[i], args[i + 1], mark, color);
        codage.isVisible = false;
        code += codage.svg(coeff);
        code += "\n";
      }
    }
    code = `<g id="${this.id}">${code}</g>`
    return code;
  };
  this.tikz = function () {
    let code = "";
    if (Array.isArray(args[0])) {
      // Si on donne une liste de points
      for (let i = 0; i < args[0].length - 1; i++) {
        code += codeSegment(args[0][i], args[0][i + 1], mark, color).tikz();
        code += "\n";
      }
      code += codeSegment(
        args[0][args[0].length - 1],
        args[0][0],
        mark,
        color
      ).tikz();
      code += "\n";
    } else if (args[0].constructor == Segment) {
      for (let i = 0; i < args.length; i++) {
        code += codeSegment(
          args[i].extremite1,
          args[i].extremite2,
          mark,
          color
        ).tikz();
        code += "\n";
      }
    } else {
      for (let i = 0; i < args.length; i += 2) {
        code += codeSegment(args[i], args[i + 1], mark, color).tikz();
        code += "\n";
      }
    }
    return code;
  };
}
export function codeSegments(mark = "||", color = "black", ...args) {
  return new CodeSegments(mark, color , ...args);
}
/**
 * m=codeAngle(A,O,45,'X','black',2,1,'red',0.4) 
 * code un angle du point A dont le sommet est O et la mesure 45° (sens direct) avec une marque en X.
 *  la ligne est noire a une épaisseur de 2 une opacité de 100% et le remplissage à 40% d'opacité est rouge.
 * @Auteur Jean-Claude Lhote
 */
function CodeAngle(debut,centre,angle,taille=0.8,mark='',color='black',epaisseur=1,opacite=1,fill='none',fillOpacite=0.2,mesure_on=false) {
  ObjetMathalea2D.call(this)
  this.color=color
  this.debut=debut
  this.centre=centre
  this.taille=taille
  this.mark=mark
  this.epaisseur=epaisseur
  this.opacite=opacite

  if (fill!='none') {
    this.couleurDeRemplissage=fill
    this.opaciteDeRemplissage=fillOpacite
  }
  else 
    this.couleurDeRemplissage='none'
  let remplir
  if (fill=='none') 
    remplir = false
  else 
    remplir = true
  this.angle=angle
  
  this.svg=function(coeff){
    let P,depart,d,arcangle,mesure,code="",M,objets=[];
    depart=pointSurSegment(this.centre,this.debut,this.taille*20/mathalea.pixelsParCm)
    P=rotation(depart,this.centre,this.angle/2)
    M=pointSurSegment(this.centre,P,taille+0.6*20/coeff)
    d=droite(this.centre,P)
    d.isVisible=false
    mesure= arrondi_virgule(Math.abs(angle),0) + "°";
    arcangle=arc(depart,this.centre,this.angle,remplir,this.couleurDeRemplissage,this.color)
    arcangle.isVisible = false;
    objets.push(arcangle);
    arcangle.opacite=this.opacite
    arcangle.epaisseur=this.epaisseur
    arcangle.couleurDeRemplissage=this.couleurDeRemplissage
    arcangle.opaciteDeRemplissage=this.opaciteDeRemplissage
    if (this.mark!=''){
      let t = texteParPoint(mark,P,90-d.angleAvecHorizontale,color);
      t.isVisible = false;
      objets.push(t);
    }
    if (mesure_on) {
      let t = texteParPoint(mesure,M, "milieu", color);
      t.isVisible = false;
      objets.push(t);
    }
    for (let objet of objets) {
      code += "\n\t" + objet.svg(coeff);
    }
    if (objets.length>1){
      code = `<g id="${this.id}">${code}</g>`
    } else {
      this.id = arcangle.id; // Dans le cas où il n'y a pas de groupe, on récupère l'id
    }
    return code;
  }

  this.tikz=function(){
    let P,depart,d,arcangle,mesure,code="",M
    depart=pointSurSegment(this.centre,this.debut,this.taille/mathalea.scale)
    P=rotation(depart,this.centre,this.angle/2)
    M=pointSurSegment(this.centre,P,taille+0.6/mathalea.scale)
    mesure= arrondi_virgule(Math.abs(angle),0) + "°";
    d=droite(this.centre,P)
    d.isVisible=false
    arcangle=arc(depart,this.centre,this.angle,remplir,this.couleurDeRemplissage,this.color)
    arcangle.opacite=this.opacite
    arcangle.epaisseur=this.epaisseur
    arcangle.couleurDeRemplissage=this.couleurDeRemplissage
    arcangle.opaciteDeRemplissage=this.opaciteDeRemplissage
    if (this.mark!='')  code+=texteParPoint(mark,P,90-d.angleAvecHorizontale,color).tikz()+'\n'
    if (mesure_on) code+=texteParPoint(mesure,M, "milieu", color).tikz()+'\n'
    code+=arcangle.tikz();
    return code;
  }

  this.svgml = function(coeff,amp){
    let P,depart,d,arcangle,mesure,code="",M
    depart=pointSurSegment(this.centre,this.debut,this.taille*20/mathalea.pixelsParCm)
    P=rotation(depart,this.centre,this.angle/2)
    M=pointSurSegment(this.centre,P,taille+0.6*20/coeff)
    mesure= arrondi_virgule(Math.abs(angle),0) + "°";
    d=droite(this.centre,P)
    d.isVisible=false
    arcangle=arc(depart,this.centre,this.angle,false,this.couleurDeRemplissage,this.color)
    arcangle.opacite=this.opacite
    arcangle.epaisseur=this.epaisseur
    arcangle.couleurDeRemplissage=this.couleurDeRemplissage
    arcangle.opaciteDeRemplissage=this.opaciteDeRemplissage
    if (this.mark!='')  code+=texteParPoint(mark,P,90-d.angleAvecHorizontale,color).svg(coeff)+'\n'
    if (mesure_on) code+=texteParPoint(mesure,M, "milieu", color).svg(coeff)+'\n'
    code+=arcangle.svgml(coeff,amp);
    return code;
  }
  this.tikzml=function(amp){
    let P,depart,d,arcangle,mesure,code="",M
    depart=pointSurSegment(this.centre,this.debut,this.taille/mathalea.scale)
    P=rotation(depart,this.centre,this.angle/2)
    M=pointSurSegment(this.centre,P,taille+0.6/mathalea.scale)
    mesure= arrondi_virgule(Math.abs(angle),0) + "°";
    d=droite(this.centre,P)
    d.isVisible=false
    arcangle=arc(depart,this.centre,this.angle,remplir,this.couleurDeRemplissage,this.color)
    arcangle.opacite=this.opacite
    arcangle.epaisseur=this.epaisseur
    arcangle.couleurDeRemplissage=this.couleurDeRemplissage
    arcangle.opaciteDeRemplissage=this.opaciteDeRemplissage
    if (this.mark!='')  code+=texteParPoint(mark,P,90-d.angleAvecHorizontale,color).tikz()+'\n'
    if (mesure_on) code+=texteParPoint(mesure,M, "milieu", color).tikz()+'\n'
    code+=arcangle.tikzml(amp);
    return code;
  }
}

export function codeAngle(debut,centre,angle,taille=0.8,mark='',color='black',epaisseur=1,opacite=1,fill='none',fillOpacite=0.2,mesure_on=false){
  if (typeof(angle)!='number'){
    angle=angleOriente(debut,centre,angle)
  }
  if (angle==90||angle==-90) {
    return new CodageAngleDroit(debut,centre,rotation(debut,centre,angle),color,taille)
  }
  else  return new CodeAngle(debut,centre,angle,taille,mark,color,epaisseur,opacite,fill,fillOpacite,mesure_on)
}

function NomAngleParPosition(nom,x,y,color,s){
  ObjetMathalea2D.call(this)
  let objets=[],s1,s2
  objets.push(texteParPosition(nom,x,y,'milieu',color,1,'middle',true))
    s1=segment(x-0.6,y+0.4-s/10,x+0.1,y+0.4+s/10)
    s2=segment(x+0.1,y+0.4+s/10,x+0.8,y+0.4-s/10)
  s1.color=color
  s2.color=color
  objets.push(s1,s2)
  this.svg = function (coeff) {
    let code = "";
     for (let objet of objets) {
       code += "\n\t" + objet.svg(coeff);
     }
     return code;
   };
   this.tikz = function () {
     let code = "";
     for (let objet of objets) {
       code += "\n\t" + objet.tikz();
     }
     return code;
   };
}
export function nomAngleSaillantParPosition(nom,x,y,color) {
  return new NomAngleParPosition(nom,x,y,color,1)
}
export function nomAngleRentrantParPosition(nom,x,y,color) {
  return new NomAngleParPosition(nom,x,y,color,-1)
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%% LES REPERES ET GRILLE %%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

// (Xorig,Yorig,'H' ou 'V', 'dd' ou 'd', longueur Unité, nombre de part, longueur totale, valeur origine, valeur première grosse graduation, label origine, label première grosse graduation, graduer ?, [Points à placer]...
/**
 * 
 * @param {*} x Place le début en (x,y)=(0,0) par défaut.
 * @param {*} y 
 * @param {*} position 'H' pour horizontale 'V' pour verticale
 * @param {*} type 'dd' pour demi-droite 'd' ou n'importe quoi pour droite
 * @param {*} longueurUnite longueur en cm de la distance entre deux grosses graduations
 * @param {*} division nombre de parts à faire entre deux grosses graduations
 * @param {*} longueurTotale longueur totale en cm utilisable
 * @param {*} origin valeur de la première graduation (par défaut 0)
 * @param {*} unite valeur de la deuxième graduation (par défaut 1)
 * @param {*} labelGauche Ce qu'on écrit sous la première graduation (par défaut 'O')
 * @param {*} labelUnite Ce qu'on écrit sous la deuxième graduation (par défaut 'I')
 * @param {*} gradue Si true, alors les grosses graduation à partir de la troisième auront l'abscisse renseignée
 * @param  {...any} args des points à placer au format ['M',xM]
 */
function DroiteGraduee(x=0,y=0,position='H',type='dd',longueurUnite=10,division=10,longueurTotale=15,origin=0,unite=1,labelGauche='O',labelUnite='I',gradue=true,...args){
  ObjetMathalea2D.call(this);
  let absord=[1,0],S,O,I,M,k,g,fleche
  let pasprincipal=unite-origin;
  if (position!='H') absord=[0,1]
  let objets=[]
  for (let j=0;j<args.length;j++) {

    objets.push(texteParPosition(args[j][0],x+(-origin+args[j][1])*absord[0]*longueurUnite/pasprincipal+0.8*absord[1],y+(-origin+args[j][1])*absord[1]*longueurUnite/pasprincipal+0.8*absord[0]))
    objets.push(texteParPosition('X',x+(-origin+args[j][1])*absord[0]*longueurUnite/pasprincipal,y+(-origin+args[j][1])*absord[1]*longueurUnite/pasprincipal,'milieu','blue'))
  }
  fleche=segment(point(x+longueurTotale*absord[0],y+longueurTotale*absord[1]),point(x+(longueurTotale-0.3)*absord[0]+0.3*absord[1],y+(longueurTotale-0.3)*absord[1]+0.3*absord[0]))
  fleche.epaisseur=2
  objets.push(fleche)
  fleche=segment(point(x+longueurTotale*absord[0],y+longueurTotale*absord[1]),point(x+(longueurTotale-0.3)*absord[0]-0.3*absord[1],y+(longueurTotale-0.3)*absord[1]-0.3*absord[0]))
  fleche.epaisseur=2
  objets.push(fleche)
  let pas=arrondi(longueurUnite/division,2)
  if (type=='dd') {
    S=segment(point(x,y),point(x+longueurTotale*absord[0],y+longueurTotale*absord[1]))
  }
  else {
    S=segment(point(x-0.5*absord[0],y-0.5*absord[1]),point(x+longueurTotale*absord[0],y+longueurTotale*absord[1]))
  }
  O=texteParPosition(labelGauche,x-0.8*absord[1],y-0.8*absord[0])
  I=texteParPosition(labelUnite,x-0.8*absord[1]+longueurUnite*absord[0],y-0.8*absord[0]+longueurUnite*absord[1])
//  M=texteParPosition(labelPoint,x-0.8*absord[1]+abscissePoint*absord[0]*longueurUnite,y-0.8*absord[0]+abscissePoint*absord[1]*longueurUnite)
  k=0
  for (let i=0;i<longueurTotale;i+=pas){
    if (k%division==0) {
      g=segment(point(x+i*absord[0]-0.3*absord[1],y-0.3*absord[0]+i*absord[1]),point(x+i*absord[0]+0.3*absord[1],y+0.3*absord[0]+i*absord[1]))
      g.epaisseur=2
      objets.push(g)
      if (gradue&&k!=0&&k!=division) {
        objets.push(texteParPosition(nombre_avec_espace(arrondi(calcul(origin+i/longueurUnite*pasprincipal),3)),x+i*absord[0]-0.8*absord[1],y+i*absord[1]-0.8*absord[0]))
      }
    }
    else {
      g=segment(point(x+i*absord[0]-0.2*absord[1],y-0.2*absord[0]+i*absord[1]),point(x+i*absord[0]+0.2*absord[1],y+0.2*absord[0]+i*absord[1]))
      objets.push(g)
    }
    k++
  }
  objets.push(S,O,I,M)

  this.svg = function (coeff) {
   let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.svg(coeff);
    }
    return code;
  };
  this.tikz = function () {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.tikz();
    }
    return code;
  };
  this.svgml = function (coeff,amp) {
    let code = "";
     for (let objet of objets) {
      if (!mathalea.mainlevee||typeof(objet.svgml)=='undefined') code += "\t" + objet.svg(coeff) + "\n";
      else code += "\t" + objet.svgml(coeff,amp) + "\n";
     }
     return code;
   };
   this.tikzml = function (amp) {
     let code = "";
     for (let objet of objets) {
      if (!mathalea.mainlevee||typeof(objet.tikzml)=='undefined') code += "\t" + objet.tikz() + "\n";
      else code += "\t" + objet.tikzml(amp) + "\n";
     }
     return code;
   };
}

export function droiteGraduee(...args) {
  return new DroiteGraduee(...args)
}
/**
 * @Auteur Jean-Claude Lhote
 * Paramètres :
 * Unite : Nombre de cm par Unité
 * Min,Max : Valeur minimum et maximum labelisées sur l'axe (les graduations commencent un peu avant et finissent un peu après)
 * x,y : coordonnées du point de départ du tracé
 * axeEpaisseur,axeCouleur, axeStyle : épaisseur, couleur et syle de l'axe
 * axeHauteur : définit la "largeur" de l'axe, celle des graduations et de la flèche
 * axePosition : 'H' pour horizontal, 'V' pour vertical
 * thickEpaisseur,thickCouleur : grosseur et couleur des graduations
 * thickDistance : distance entre deux graduations principales
 * thickSecDist : distance entre deux graduations secondaires
 * thickTerDist : distance entre deux graduations tertiaires
 * thickSec : true si besoin de graduations secondaires, false sinon
 * thickTer : true si besoin de graduations tertiaires, false sinon
 * pointListe : Liste de points à mettre sur l'axe. Exemple [[3.4,'A'],[3.8,'B],....]. Les noms se placent au dessus de l'axe.
 * pointTaille, pointOpacite, pointCouleur : taille en pixels, opacité et couleurs des points de la pointListe
 * labelListe : pour ajouter des labels. Exemple [[2.8,'x'],[3.1,'y']] les labels se placent sous l'axe. 
 * Legende : texte à écrire en bout de droite graduée
 * LegendePosition : position de la légende
 */

 function DroiteGraduee2({
  Unite = 10, // nombre de cm pour une unité
  Min = 0, // Là où commence la droite
  Max = 2, // Là où finit la droite prévoir 0,5cm pour la flèche
  x=0,y=0, // les coordonnées du début du tracé dans le SVG
  axeEpaisseur = 2,axeCouleur = 'black',axeStyle = "->",axeHauteur=4,axePosition='H', // Les caractéristiques de l'axe
  thickEpaisseur = 2,thickCouleur = axeCouleur, thickDistance = 1,thickOffset=0.1, // Les caractéristiques des graduations principales
  thickSecDist =0.1,thickSec = false, // Les caractéristiques des graduations secondaires. Pas de couleur, on joue sur l'opacité
  thickTerDist=0.01,thickTer=false, // Les caractéristiques des graduations tertiaires. Pas de couleur, on joue sur l'opacité
  pointListe = false,pointCouleur='blue',pointTaille=4,pointStyle='+',pointOpacite=0.8,pointEpaisseur=2, // Liste de points et caractéristiques des points de ces points
  labelsPrincipaux=true,labelsSecondaires=false,step1=1,step2=1,
  labelDistance = (axeHauteur+10)/mathalea.pixelsParCm,
  labelListe = false,
  Legende = "",
  LegendePosition = calcul((Max-Min)*Unite+1.5)
} = {}) {
  ObjetMathalea2D.call(this)

  // Les propriétés exportables
  this.Unite = Unite;
  this.Min = Min;
  this.Max = Max;

  let objets = [],S,T,P,i;
  let longueurTotale=(Max-Min)*Unite+0.7;
  let absord=[1,0];
  if (axePosition!='H') absord=[0,1]
  if (axeStyle=='->'){
    longueurTotale+=0.2;
    S=segment(point(x-0.2*absord[0],y-0.2*absord[1]),point(x+longueurTotale*absord[0],y+longueurTotale*absord[1]),axeCouleur);
    S.styleExtremites='->';
    S.tailleExtremites=axeHauteur;
    S.epaiseur=axeEpaisseur;
  }
  else {
    S=segment(point(x,y),point(x+longueurTotale*absord[0],y+longueurTotale*absord[1]),axeCouleur)
    S.styleExtremites='|->';
    S.epaiseur=axeEpaisseur;
    S.tailleExtremites=axeHauteur;
  }
  objets.push(S);
  let factor
  let r=10/mathalea.pixelsParCm
  if (thickTer) factor=calcul(1/thickTerDist)
  else if (thickSec) factor=calcul(1/thickSecDist)
  else factor=calcul(1/thickDistance)

  let Min2=Math.round((Min+thickOffset)*factor),Max2=Math.round((Max-thickOffset)*factor)
  let pas1=Math.round(thickDistance*factor),pas2=Math.round(thickSecDist*factor)
  for (let j=Min2;j<=Max2;j++) {
    i=calcul((j-Min*factor)/factor)
    if (j%pas1==0) {  // Graduation principale
      S=segment(point(x+i*Unite*absord[0]-axeHauteur/8*r*absord[1],y-axeHauteur/8*r*absord[0]+i*Unite*absord[1]),point(x+i*Unite*absord[0]+axeHauteur/8*r*absord[1],y+axeHauteur/8*r*absord[0]+i*Unite*absord[1]),thickCouleur);
      S.epaisseur=thickEpaisseur;
      objets.push(S);
    }
    else if (j%pas2==0&&thickSec) {  // Graduation secondaire
      S=segment(point(x+i*Unite*absord[0]-axeHauteur/12*r*absord[1],y-axeHauteur/12*r*absord[0]+i*Unite*absord[1]),point(x+i*Unite*absord[0]+axeHauteur/12*r*absord[1],y+axeHauteur/12*r*absord[0]+i*Unite*absord[1]),thickCouleur);
      S.epaisseur=thickEpaisseur/2;
      S.opacite=0.8;
      objets.push(S);
    }
    else if (thickTer) {  // Graduation tertiaire
      S=segment(point(x+i*Unite*absord[0]-axeHauteur/16*r*absord[1],y-axeHauteur/16*r*absord[0]+i*Unite*absord[1]),point(x+i*Unite*absord[0]+axeHauteur/16*r*absord[1],y+axeHauteur/16*r*absord[0]+i*Unite*absord[1]),thickCouleur);
      S.epaisseur=thickEpaisseur/4;
      S.opacite=0.6;
      objets.push(S);
    }
  } 
  // Les labels principaux
  if (labelsPrincipaux){
    for (let j=Min2;j<=Max2;j++) {
      if (j%(step1*pas1)==0) {
        i=calcul((j-Min*factor)/factor)
        T=texteParPosition(`${nombre_avec_espace(arrondi(calcul(Min+i),3))}`,x+i*Unite*absord[0]-labelDistance*absord[1],y+i*Unite*absord[1]-labelDistance*absord[0]);
        objets.push(T);
      }
    }
  }
  if (labelsSecondaires){
    for (let j=Min2;j<=Max2;j++) {
      if (j%(step2*pas2)==0&&j%pas1!=0) {
        i=calcul((j-Min*factor)/factor)
        T=texteParPosition(`${nombre_avec_espace(arrondi(calcul(Min+i),3))}`,x+i*Unite*absord[0]-labelDistance*absord[1],y+i*Unite*absord[1]-labelDistance*absord[0]);
        objets.push(T);
      }
    }
  }
  // Les labels facultatifs
  let t
  if (labelListe){
    for (let p of labelListe){
      t=texteParPosition(p[1],x-labelDistance*absord[1]+(p[0]-Min)*absord[0]*Unite,y-labelDistance*absord[0]+(p[0]-Min)*absord[1]*Unite)
      objets.push(t)
    }
  }
  if (Legende!=""){
    objets.push(texteParPosition(Legende,x+LegendePosition*absord[0],y+LegendePosition*absord[1]))
  }
  if (pointListe){
    for (let p of pointListe){
      P=point(x+(p[0]-Min)*absord[0]*Unite,y+(p[0]-Min)*absord[1]*Unite,p[1],'above')
      T=tracePoint(P,pointCouleur);
      T.taille=pointTaille;
      T.opacite=pointOpacite;
      T.style=pointStyle;
      T.epaisseur=pointEpaisseur;
      objets.push(T,labelPoint(P));
    }
  }

  this.svg = function (coeff) {
    let code = "";
     for (let objet of objets) {
       code += "\n\t" + objet.svg(coeff);
     }
     return code;
   };
   this.tikz = function () {
     let code = "";
     for (let objet of objets) {
       code += "\n\t" + objet.tikz();
     }
     return code;
   };
   this.svgml = function (coeff,amp) {
     let code = "";
      for (let objet of objets) {
       if (typeof(objet.svgml)=='undefined') code += "\t" + objet.svg(coeff) + "\n";
       else code += "\t" + objet.svgml(coeff,amp) + "\n";
      }
      return code;
    };
    this.tikzml = function (amp) {
      let code = "";
      for (let objet of objets) {
       if (typeof(objet.tikzml)=='undefined') code += "\t" + objet.tikz() + "\n";
       else code += "\t" + objet.tikzml(amp) + "\n";
      }
      return code;
    };
 }
 export function droiteGraduee2 (...args){
   return new DroiteGraduee2(...args)
 }


 
 /**
 * axes(xmin,ymin,xmax,ymax,thick,xstep,ystep,epaisseur) // Trace les axes des abscisses et des ordonnées
 *
 * @Auteur Rémi Angot
 */

function Axes(
  xmin = -30,
  ymin = -30,
  xmax = 30,
  ymax = 30,
  thick = 0.2,
  xstep = 1,
  ystep = 1,
  epaisseur = 2,
  color = "black"
) {
  ObjetMathalea2D.call(this);
  let objets = [];
  let yabscisse;
  ymin > 0 ? (yabscisse = ymin) : (yabscisse = 0);
  let xordonnee;
  xmin > 0 ? (xordonnee = xmin) : (xordonnee = 0);
  let abscisse = segment(xmin, yabscisse, xmax, yabscisse);
  abscisse.styleExtremites = "->";
  abscisse.epaisseur = epaisseur;
  abscisse.color = color;
  let ordonnee = segment(xordonnee, ymin, xordonnee, ymax);
  ordonnee.styleExtremites = "->";
  ordonnee.epaisseur = epaisseur;
  objets.push(abscisse, ordonnee);
  ordonnee.color = color;
  for (let x = xmin; x < xmax; x = calcul(x + xstep)) {
    let s = segment(x, yabscisse - thick, x, yabscisse + thick);
    s.epaisseur = epaisseur;
    s.color = color;
    objets.push(s);
  }
  for (let y = ymin; y < ymax; y = calcul(y + ystep)) {
    let s = segment(xordonnee - thick, y, xordonnee + thick, y);
    s.epaisseur = epaisseur;
    s.color = color;
    objets.push(s);
  }
  this.svg = function (coeff) {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.svg(coeff);
    }
    return code;
  };
  this.tikz = function () {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.tikz();
    }
    return code;
  };
  this.commentaire = `Axes(xmin = ${xmin}, ymin = ${ymin}, xmax = ${xmax}, ymax = ${ymax}, thick = ${thick})`;
}
export function axes(...args) {
  return new Axes(...args);
}


function LabelX(
  xmin = 1,
  xmax = 20,
  step = 1,
  color = "black",
  pos = -0.6,
  coeff = 1
) {
  ObjetMathalea2D.call(this);
  let objets = [];
  for ( let x = Math.ceil(xmin / coeff);
    calcul(x * coeff) <= xmax;
    x = calcul(x + step)
  ) {
    objets.push(
      texteParPoint(
        Intl.NumberFormat("fr-FR", { maximumFractionDigits: 20 })
          .format(calcul(x * coeff))
          .toString(),
        point(x, pos),
        "milieu",
        color
      )
    );
  }
  this.svg = function (coeff) {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.svg(coeff);
    }
    return code;
  };
  this.tikz = function () {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.tikz();
    }
    return code;
  };
  this.commentaire = `labelX(xmin=${xmin},xmax=${xmax},step=${step},color=${color},pos=${pos},coeff=${coeff})`;
}
/**
 * labelX(xmin,xmax,step,color,pos,coeff) // Place des graduations
 *
 * @Auteur Rémi Angot
 */
export function labelX(...args) {
  return new LabelX(...args);
}

/**
 * labelY(ymin,ymax,step,color,pos,coeff) // Place des graduations
 *
 * @Auteur Rémi Angot
 */
function LabelY(
  ymin = 1,
  ymax = 20,
  step = 1,
  color = "black",
  pos = -0.6,
  coeff = 1
) {
  ObjetMathalea2D.call(this);
  let objets = [];
  for (let y = Math.ceil(ymin / coeff);
    calcul(y * coeff) <= ymax;
    y = calcul(y + step)
  ) {
    objets.push(
      texteParPoint(
        Intl.NumberFormat("fr-FR", { maximumFractionDigits: 20 })
          .format(calcul(y * coeff))
          .toString(),
        point(pos, y),
        "milieu",
        color
      )
    );
  }
  this.svg = function (coeff) {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.svg(coeff);
    }
    return code;
  };
  this.tikz = function () {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.tikz();
    }
    return code;
  };
  this.commentaire = `labelX(ymin=${ymin},ymax=${ymax},step=${step},color=${color},pos=${pos})`;
}

/**
 * labelY(ymin,ymax,step,color,pos,coeff) // Place des graduations
 *
 * @Auteur Rémi Angot
 */
export function labelY(...args) {
  return new LabelY(...args);
}

/**
 * grille(xmin,ymin,xmax,ymax,color,opacite,pas) // Trace les axes des abscisses et des ordinnées
 *
 * @Auteur Rémi Angot
 */
function Grille(
  xmin = -30,
  ymin = -30,
  xmax = 30,
  ymax = 30,
  color = "gray",
  opacite = 0.4,
  step = 1,
  pointilles = false
) {
  ObjetMathalea2D.call(this);
  this.color = color;
  this.opacite = opacite;
  let objets = [];
  for (let i = arrondi(xmin,2); i <= arrondi(xmax,2); i = arrondi(calcul(i+step),2)) {
    let s = segment(i, ymin, i, ymax);
    s.color = this.color;
    s.opacite = this.opacite;
    if (pointilles) {
      s.pointilles = true;
    }
    objets.push(s);
  }
  for (let i = arrondi(ymin,2); i <= arrondi(ymax+0.005,2); i = arrondi(calcul(i+step),2)) {
    let s = segment(xmin, i, xmax, i);
    s.color = this.color;
    s.opacite = this.opacite;
    if (pointilles) {
      s.pointilles = true;
    }
    objets.push(s);
  }
  this.commentaire = `Grille(xmin = ${xmin}, ymin = ${ymin}, xmax = ${xmax}, ymax = ${ymax}, color = ${color}, opacite = ${opacite}, pas = ${step})`;
  this.svg = function (coeff) {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.svg(coeff);
    }
    return code;
  };
  this.tikz = function () {
   let  code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.tikz();
    }
    return code;
  };
}

/**
 * grille(xmin,ymin,xmax,ymax,color,opacite,pas) // Trace les axes des abscisses et des ordinnées
 *
 * @Auteur Rémi Angot
 */
export function grille(...args) {
  return new Grille(...args);
}


/**
 * grilleHorizontale(xmin,ymin,xmax,ymax,color,opacite,pas) // Trace les parallèle à l'axe des ordonnées
 *
 * @Auteur Rémi Angot
 */
function GrilleHorizontale(
  xmin = -30,
  ymin = -30,
  xmax = 30,
  ymax = 30,
  color = "gray",
  opacite = 0.4,
  step = 1,
  pointilles = false
) {
  ObjetMathalea2D.call(this);
  this.color = color;
  this.opacite = opacite;
  let objets = [];
  for (let i = ymin; i <= ymax; i += step) {
    let s = segment(xmin, i, xmax, i);
    s.color = this.color;
    s.opacite = this.opacite;
    if (pointilles) {
      s.pointilles = true;
    }
    objets.push(s);
  }
  this.svg = function (coeff) {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.svg(coeff);
    }
    return code;
  };
  this.tikz = function () {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.tikz();
    }
    return code;
  };
}

/**
 * grilleHorizontale(xmin,ymin,xmax,ymax,color,opacite,pas) // Trace les axes des abscisses et des ordinnées
 *
 * @Auteur Rémi Angot
 */
export function grilleHorizontale(...args) {
  return new GrilleHorizontale(...args);
}
function GrilleVerticale(
  xmin = -30,
  ymin = -30,
  xmax = 30,
  ymax = 30,
  color = "gray",
  opacite = 0.4,
  step = 1,
  pointilles = false
) {
  ObjetMathalea2D.call(this);
  this.color = color;
  this.opacite = opacite;
  let objets = [];
  for (let i = arrondi(xmin,2); i <= arrondi(xmax,2); i = arrondi(calcul(i+step),2)) {
    let s = segment(i,ymin,i,ymax);
    s.color = this.color;
    s.opacite = this.opacite;
    if (pointilles) {
      s.pointilles = true;
    }
    objets.push(s);
  }
  this.svg = function (coeff) {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.svg(coeff);
    }
    return code;
  };
  this.tikz = function () {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.tikz();
    }
    return code;
  };
}

/**
 * grilleVerticale(xmin,ymin,xmax,ymax,color,opacite,pas) 
 *
 * @Auteur Rémi Angot
 */
export function grilleVerticale(...args) {
  return new GrilleVerticale(...args);
}

function Seyes(xmin = 0, ymin = 0, xmax = 15, ymax = 15,opacite1 = .5, opacite2 = .2) {
  ObjetMathalea2D.call(this)
  let objets = [];
  for (let y = ymin; y <= ymax; y = calcul(y + 0.25)) {
    if (y % 1 != 0) {
      let d = segment(xmin, y, xmax, y);
      d.color = "red";
      d.opacite = opacite2;
      objets.push(d);
    }
  }
  objets.push(grille(xmin, ymin, xmax, ymax, "blue", opacite1, 1));
  this.svg = function (coeff) {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.svg(coeff);
    }
    return code;
  };
  this.tikz = function () {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.tikz();
    }
    return code;
  };
}

/**
 * Fais un quadrillage avec des grands carreaux.
 *
 * Pour une sortie LaTeX, il faut penser à ajouter scale = .8
 *
 * @param {integer} xmin
 * @param {integer} ymin
 * @param {integer} xmax
 * @param {integer} ymax
 * @auteur Rémi Angot
 */
export function seyes(...args){
  return new Seyes(...args)
}

function Repere({
  xmin = -10,
  xmax = 10,
  ymin = -10,
  ymax = 10,
  xscale = 1,
  yscale = 1,
  xstep = 1,
  ystep = 1,
  graduationColor = "black",
  afficheZero = false,
  afficheNumeros = true,
  afficheLabelX = true,
  afficheLabelY = true,
  axesEpaisseur = 2,
  axesColor = "black",
  grilleHorizontaleVisible = false,
  grillePrincipaleDistance = 1,
  grillePrincipaleColor = "gray",
  grillePrincipaleOpacite = 0.7,
  grillePrincipalePointilles = false,
  grillePrincipaleVisible = true,
  grilleSecondaireDistance = 0.1,
  grilleSecondaireColor = "gray",
  grilleSecondaireOpacite = 0.3,
  grilleSecondairePointilles = false,
  grilleSecondaireVisible = false,
  graduationsxMin = xmin,
  graduationsxMax = xmax,
  graduationsyMin = ymin,
  graduationsyMax = ymax,
  positionLabelX = -0.6,
  positionLabelY = -0.6,
  legendeX = "x",
  legendeY = "y",
  positionLegendeX,
  positionLegendeY,
} = {}) {
  ObjetMathalea2D.call(this);
  let yabscisse;
  ymin > 0 ? (yabscisse = ymin) : (yabscisse = 0);
  let xordonnee;
  xmin > 0 ? (xordonnee = xmin) : (xordonnee = 0);
  if (yscale!=1) {
    ymin=premierMultipleInferieur(yscale,ymin)
    ymax=premierMultipleSuperieur(yscale,ymax)
  }
  if (xscale!=1) {
    xmin=premierMultipleInferieur(xscale,xmin)
    xmax=premierMultipleSuperieur(xscale,xmax)
  }
  this.svg = function (coeff) {
    let code = "";
    if (grillePrincipaleVisible) {
      if (grilleHorizontaleVisible){
        code+=grilleHorizontale(
          calcul(xmin / xscale),
          calcul(ymin / yscale),
          calcul(xmax / xscale),
          calcul(ymax / yscale),
          grillePrincipaleColor,
          grillePrincipaleOpacite,
          grillePrincipaleDistance,
          grillePrincipalePointilles
        ).svg(coeff)
      } else {
        code+=grille(
            calcul(xmin / xscale),
            calcul(ymin / yscale),
            calcul(xmax / xscale),
            calcul(ymax / yscale),
            grillePrincipaleColor,
            grillePrincipaleOpacite,
            grillePrincipaleDistance,
            grillePrincipalePointilles
          ).svg(coeff)
      }
    }
    if (grilleSecondaireVisible) {
      code+=
        grille(
          calcul(xmin / xscale),
          calcul(ymin / yscale),
          calcul(xmax / xscale),
          calcul(ymax / yscale),
          grilleSecondaireColor,
          grilleSecondaireOpacite,
          grilleSecondaireDistance,
          grilleSecondairePointilles
        ).svg(coeff)
  
    }
    code+=
      axes(
        calcul(xmin / xscale),
        calcul(ymin / yscale),
        calcul(xmax / xscale),
        calcul(ymax / yscale),
        4/coeff,
        xstep,
        ystep,
        axesEpaisseur,
        axesColor
      ).svg(coeff)
    if (afficheNumeros){
      if (afficheZero) {
        if (afficheLabelX){
          code+= labelX(
              premierMultipleSuperieur(xstep, graduationsxMin),
              graduationsxMax,
              xstep,
              graduationColor,
              calcul(yabscisse / yscale) + positionLabelX*20/coeff,
              xscale
            ).svg(coeff)
        }
        if (afficheLabelY){
          code+= labelY(
              premierMultipleSuperieur(ystep, graduationsyMin),
              graduationsyMax,
              ystep,
              graduationColor,
              calcul(xordonnee / xscale) + positionLabelY*20/coeff,
              yscale
            ).svg(coeff)
        }
      } else {
        if (afficheLabelX){
          code+=labelX(
              premierMultipleSuperieur(xstep, graduationsxMin),
              -1,
              xstep,
              graduationColor,
              calcul(yabscisse / yscale) + positionLabelX*20/coeff,
              xscale
            ).svg(coeff)
        }
        if (afficheLabelY){
          code+=labelY(
              premierMultipleSuperieur(ystep, graduationsyMin),
              -1,
              ystep,
              graduationColor,
              calcul(xordonnee / xscale) + positionLabelY*20/coeff,
              yscale
            ).svg(coeff)
        }
        if (afficheLabelX){
          code+=labelX(
              Math.max(xstep, premierMultipleSuperieur(xstep, graduationsxMin)),
              graduationsxMax,
              xstep,
              graduationColor,
              calcul(yabscisse / yscale) + positionLabelX*20/coeff,
              xscale
            ).svg(coeff)
        }
        if (afficheLabelY){
          code+=labelY(
              Math.max(ystep, premierMultipleSuperieur(ystep, graduationsyMin)),
              graduationsyMax,
              ystep,
              graduationColor,
              calcul(xordonnee / xscale) + positionLabelY*20/coeff,
              yscale
            ).svg(coeff)
        }
      }
    }
    if (positionLegendeX === undefined) {
      positionLegendeX = [xmax + 4/coeff, yabscisse + 6/coeff];
    }
    if (positionLegendeY === undefined) {
      positionLegendeY = [xordonnee + 6/coeff, ymax + 8/coeff];
    }
    code+=texteParPosition(
        legendeX,
        calcul(positionLegendeX[0] / xscale),
        calcul(positionLegendeX[1] / yscale),
        "droite"
      ).svg(coeff)
    code+=texteParPosition(
        legendeY,
        calcul(positionLegendeY[0] / xscale),
        calcul(positionLegendeY[1] / yscale),
        "droite"
      ).svg(coeff)
    return code;
  };
  this.tikz = function () {
    let code = "";
    if (grillePrincipaleVisible) {
      if (grilleHorizontaleVisible){
        code+=grilleHorizontale(
          calcul(xmin / xscale),
          calcul(ymin / yscale),
          calcul(xmax / xscale),
          calcul(ymax / yscale),
          grillePrincipaleColor,
          grillePrincipaleOpacite,
          grillePrincipaleDistance,
          grillePrincipalePointilles
        ).tikz()
      } else {
        code+=grille(
            calcul(xmin / xscale),
            calcul(ymin / yscale),
            calcul(xmax / xscale),
            calcul(ymax / yscale),
            grillePrincipaleColor,
            grillePrincipaleOpacite,
            grillePrincipaleDistance,
            grillePrincipalePointilles
          ).tikz()
      }
    }
    if (grilleSecondaireVisible) {
      code+=
        grille(
          calcul(xmin / xscale),
          calcul(ymin / yscale),
          calcul(xmax / xscale),
          calcul(ymax / yscale),
          grilleSecondaireColor,
          grilleSecondaireOpacite,
          grilleSecondaireDistance,
          grilleSecondairePointilles
        ).tikz()
  
    }
    code+=
      axes(
        calcul(xmin / xscale),
        calcul(ymin / yscale),
        calcul(xmax / xscale),
        calcul(ymax / yscale),
        0.2/mathalea.scale,
        xstep,
        ystep,
        axesEpaisseur,
        axesColor
      ).tikz()
    
    if (afficheZero) {
      if (afficheLabelX){
        code+= labelX(
            premierMultipleSuperieur(xstep, graduationsxMin),
            graduationsxMax,
            xstep,
            graduationColor,
            calcul(yabscisse / yscale) + positionLabelX/mathalea.scale,
            xscale
          ).tikz()
      }
      if (afficheLabelY){
        code+= labelY(
            premierMultipleSuperieur(ystep, graduationsyMin),
            graduationsyMax,
            ystep,
            graduationColor,
            calcul(xordonnee / xscale) + positionLabelY/mathalea.scale,
            yscale
          ).tikz()
      }
    } else {
      if (afficheLabelX){
        code+=labelX(
            premierMultipleSuperieur(xstep, graduationsxMin),
            -1,
            xstep,
            graduationColor,
            calcul(yabscisse / yscale) + positionLabelX/mathalea.scale,
            xscale
          ).tikz()
      }
      if (afficheLabelY){
        code+=labelY(
            premierMultipleSuperieur(ystep, graduationsyMin),
            -1,
            ystep,
            graduationColor,
            calcul(xordonnee / xscale) + positionLabelY/mathalea.scale,
            yscale
          ).tikz()
      }
      if (afficheLabelX){
        code+=labelX(
            Math.max(xstep, premierMultipleSuperieur(xstep, graduationsxMin)),
            graduationsxMax,
            xstep,
            graduationColor,
            calcul(yabscisse / yscale) + positionLabelX/mathalea.scale,
            xscale
          ).tikz()
      }
      if (afficheLabelY){
        code+=labelY(
            Math.max(ystep, premierMultipleSuperieur(ystep, graduationsyMin)),
            graduationsyMax,
            ystep,
            graduationColor,
            calcul(xordonnee / xscale) + positionLabelY/mathalea.scale,
            yscale
          ).tikz()
      }
    }
    if (positionLegendeX === undefined) {
      positionLegendeX = [xmax + 0.2/mathalea.scale, yabscisse + 0.3/mathalea.scale];
    }
    if (positionLegendeY === undefined) {
      positionLegendeY = [xordonnee + 0.3/mathalea.scale, ymax + 0.2/mathalea.scale];
    }
    code+=texteParPosition(
        legendeX,
        calcul(positionLegendeX[0] / xscale),
        calcul(positionLegendeX[1] / yscale),
        "droite"
      ).tikz()
    code+=texteParPosition(
        legendeY,
        calcul(positionLegendeY[0] / xscale),
        calcul(positionLegendeY[1] / yscale),
        "droite"
      ).tikz()
    return code;
  };

  this.xscale = xscale;
  this.yscale = yscale;
}

export function repere(...args) {
  return new Repere(...args);
}


function Repere2({
  xUnite = 1,
  yUnite = 1,
  xMin = -10,
  xMax = 10,
  yMin = -10,
  yMax = 10,
  axesEpaisseur = 2,
  axesCouleur = 'black',
  axeXStyle = "->",
  axeYStyle = "->",
  thickEpaisseur = 2,
  thickHauteur = .2,
  thickCouleur = axesCouleur,
  xThickDistance = 1,
  xThickListe = false,
  xThickMin = xMin+xThickDistance,
  xThickMax = xMax-xThickDistance,
  yThickDistance = 1,
  yThickListe = false,
  yThickMin = yMin+yThickDistance,
  yThickMax = yMax-yThickDistance,
  xLabelDistance = xThickDistance,
  xLabelListe = false,
  xLabelMin = xThickMin,
  xLabelMax = xThickMax,
  yLabelDistance = yThickDistance,
  yLabelListe = false,
  yLabelMin = yThickMin,
  yLabelMax = yThickMax,
  xLegende = "",
  xLegendePosition = [calcul(xMax*xUnite) + .5, .5],
  yLegende = "",
  yLegendePosition = [.5, calcul(yMax*yUnite) + .5],
  grille = true,
  grilleDistance = false,
  grilleCouleur = "black",
  grilleOpacite = 0.5,
  grilleEpaisseur = 1,
  grilleSecondaire = false,
  grilleSecondaireDistance = false,
  grilleSecondaireCouleur = "gray",
  grilleSecondaireOpacite = 0.3,
  grilleSecondaireEpaisseur = 1,
  grilleX = grille,
  grilleXListe = false,
  grilleXDistance = grilleDistance,
  grilleXMin = false,
  grilleXMax = false,
  grilleXCouleur = grilleCouleur,
  grilleXOpacite = grilleOpacite,
  grilleY = grille,
  grilleYListe = false,
  grilleYDistance = grilleDistance,
  grilleYMin = false,
  grilleYMax = false,
  grilleYCouleur = grilleCouleur,
  grilleYOpacite = grilleOpacite,
  grilleSecondaireX = grilleSecondaire,
  grilleSecondaireXListe = false,
  grilleSecondaireXDistance = grilleSecondaireDistance,
  grilleSecondaireXMin = false,
  grilleSecondaireXMax = false,
  grilleSecondaireXCouleur = grilleSecondaireCouleur,
  grilleSecondaireXOpacite = grilleSecondaireOpacite,
  grilleSecondaireY = grilleSecondaire,
  grilleSecondaireYListe = false,
  grilleSecondaireYDistance = grilleSecondaireDistance,
  grilleSecondaireYMin = false,
  grilleSecondaireYMax = false,
  grilleSecondaireYCouleur = grilleSecondaireCouleur,
  grilleSecondaireYOpacite = grilleSecondaireOpacite,
} = {}) {
  ObjetMathalea2D.call(this)

  // Les propriétés exportables
  this.xUnite = xUnite;
  this.yUnite = yUnite;
  this.xMin = xMin;
  this.xMax = xMax;
  this.yMin = yMin;
  this.yMax = yMax;

  let objets = []
  // LES AXES
  let OrdonneeAxe = Math.max(0,yMin)
  let axeX = segment(calcul(xMin*xUnite),calcul(OrdonneeAxe*yUnite),calcul(xMax*xUnite),calcul(OrdonneeAxe*yUnite));
  axeX.epaisseur = axesEpaisseur;
  axeX.styleExtremites = axeXStyle;
  axeX.color = axesCouleur;
  let abscisseAxe =Math.max(0,xMin)
  let axeY = segment(calcul(abscisseAxe*xUnite),calcul(yMin*yUnite),calcul(abscisseAxe*xUnite),calcul(yMax*yUnite));
  axeY.epaisseur = axesEpaisseur;
  axeY.styleExtremites = axeYStyle;
  axeY.color = axesCouleur;
  objets.push(axeX,axeY);
  // Cache les objets intermédiaires pour ne pas les afficher en double dans mathalea2d.html
  axeX.isVisible = false;
  axeY.isVisible = false;

  // LES THICKS
  if (!xThickListe) {
    xThickListe = rangeMinMax(xThickMin,xThickMax,[0],xThickDistance)
  }
  for (let x of xThickListe){
    let thick = segment(calcul(x*xUnite),calcul(OrdonneeAxe*yUnite-thickHauteur),calcul(x*xUnite),calcul(OrdonneeAxe*yUnite+thickHauteur));
    thick.isVisible = false;
    thick.epaisseur = thickEpaisseur;
    thick.color = thickCouleur;
    objets.push(thick);
  }
  if (!yThickListe) {
    yThickListe = rangeMinMax(yThickMin,yThickMax,[0],yThickDistance)
  }
  for (let y of yThickListe){
    let thick = segment(calcul(abscisseAxe*xUnite-thickHauteur),calcul(y*yUnite),calcul(abscisseAxe*xUnite+thickHauteur),calcul(y*yUnite));
    thick.isVisible = false;
    thick.epaisseur = thickEpaisseur;
    thick.color = thickCouleur;
    objets.push(thick);
  }


  // LES LABELS
  if (!xLabelListe) {
    xLabelListe = rangeMinMax(xLabelMin,xLabelMax,[0],xLabelDistance)
  }
  for (let x of xLabelListe){
    let l = texteParPosition(tex_nombre(x),calcul(x*xUnite),calcul(OrdonneeAxe*yUnite)-.5)
    l.isVisible = false;
    objets.push(l);
  }
  
  if (!yLabelListe) {
    yLabelListe = rangeMinMax(yLabelMin,yLabelMax,[0],yLabelDistance)
  }
  for (let y of yLabelListe){
    let l = texteParPosition(tex_nombre(y),calcul(abscisseAxe*xUnite)-.5,calcul(y*yUnite),'gauche')
    l.isVisible = false;
    objets.push(l);
  }

  // LES LÉGENDES
  if (xLegende.length>0){
    objets.push(texteParPosition(xLegende,xLegendePosition[0],xLegendePosition[1],'droite'))
  }
  if (yLegende.length>0){
    objets.push(texteParPosition(yLegende,yLegendePosition[0],yLegendePosition[1],'droite'))
  }

  // GRILLE PRINCIPALE
 
  //Les traits horizontaux
  if (grilleY){
    if (!grilleYListe) {
      // Ceux qui ne sont pas définis reprennent les valeurs de thick
      if (typeof(grilleYMin) !== 'number'){
        grilleYMin = yThickMin
      }
      if (typeof(grilleYMax) !== 'number'){
        grilleYMax = yThickMax
       }
      if (!grilleYDistance){
        grilleYDistance = yThickDistance
      }
      // On créé la liste avec ces valeurs 
      grilleYListe = rangeMinMax(grilleYMin,grilleYMax,[0],grilleYDistance)
    }
    for (let y of grilleYListe){
      let traitH = segment(calcul(xMin*xUnite),calcul(y*yUnite),calcul(xMax*xUnite),calcul(y*yUnite));
      traitH.isVisible = false;
      traitH.color = grilleYCouleur;
      traitH.opacite = grilleYOpacite;
      traitH.epaisseur = grilleEpaisseur;
      if (grilleY == 'pointilles'){
        traitH.pointilles = true;
      }
      objets.push(traitH);
    }
  }
  //Les traits verticaux
  if (grilleX){
    if (!grilleXListe) {
      // Ceux qui ne sont pas définis reprennent les valeurs de thick
      if (typeof(grilleXMin) !== 'number'){
        grilleXMin = xThickMin
      }
      if (typeof(grilleXMax) !== 'number'){
        grilleXMax = xThickMax
       }
      if (typeof(grilleXDistance) !== 'number'){
        grilleXDistance = xThickDistance
      }
      // On créé la liste avec ces valeurs 
      grilleXListe = rangeMinMax(grilleXMin,grilleXMax,[0],grilleXDistance)
    }
    for (let x of grilleXListe){
      let traitV = segment(calcul(x*xUnite),calcul(yMin*yUnite),calcul(x*xUnite),calcul(yMax*yUnite));
      traitV.isVisible = false;
      traitV.color = grilleXCouleur;
      traitV.opacite = grilleXOpacite;
      traitV.epaisseur = grilleEpaisseur;
      if (grilleX == 'pointilles'){
        traitV.pointilles = true;
      }
      objets.push(traitV);
    }
  }



  // GRILLE SECONDAIRE
 
  //Les traits horizontaux
  if (grilleSecondaireY){
    if (!grilleSecondaireYListe) {
      // Ceux qui ne sont pas définis reprennent les valeurs de thick
      if ( typeof(grilleSecondaireYMin) !== 'number'){
        grilleSecondaireYMin = yThickMin
      }
      if (typeof(grilleSecondaireYMax) !== 'number'){
        grilleSecondaireYMax = yThickMax
       }
      if (typeof(grilleSecondaireYDistance) !== 'number'){
        grilleSecondaireYDistance = calcul(yThickDistance/2)
      }
      // On créé la liste avec ces valeurs 
      grilleSecondaireYListe = rangeMinMax(grilleSecondaireYMin,grilleSecondaireYMax,[0],grilleSecondaireYDistance)
    }
    for (let y of grilleSecondaireYListe){
      let traitH = segment(calcul(xMin*xUnite),calcul(y*yUnite),calcul(xMax*xUnite),calcul(y*yUnite));
      traitH.isVisible = false;
      traitH.color = grilleSecondaireYCouleur;
      traitH.opacite = grilleSecondaireYOpacite;
      traitH.epaisseur = grilleSecondaireEpaisseur;
      if (grilleSecondaireY == 'pointilles'){
        traitH.pointilles = true;
      }
      objets.push(traitH);
    }
  }
  //Les traits verticaux
  if (grilleSecondaireX){
    if (!grilleSecondaireXListe) {
      // Ceux qui ne sont pas définis reprennent les valeurs de thick
      if (typeof(grilleSecondaireXMin) !== 'number'){
        grilleSecondaireXMin = xThickMin/2
      }
      if (typeof(grilleSecondaireXMax) !== 'number'){
        grilleSecondaireXMax = xThickMax
       }
      if (typeof(grilleSecondaireXDistance) !== 'number'){
        grilleSecondaireXDistance = calcul(xThickDistance/2)
      }
      // On créé la liste avec ces valeurs 
      grilleSecondaireXListe = rangeMinMax(grilleSecondaireXMin,grilleSecondaireXMax,[0],grilleSecondaireXDistance)
    }
    for (let x of grilleSecondaireXListe){
      let traitV = segment(calcul(x*xUnite),calcul(yMin*yUnite),calcul(x*xUnite),calcul(yMax*yUnite));
      traitV.isVisible = false;
      traitV.color = grilleSecondaireXCouleur;
      traitV.opacite = grilleSecondaireXOpacite;
      traitV.epaisseur = grilleSecondaireEpaisseur;
      if (grilleSecondaireX == 'pointilles'){
        traitV.pointilles = true;
      }
      objets.push(traitV);
    }
  }
  

  // LES SORTIES TiKZ et SVG
  this.svg = function (coeff) {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.svg(coeff);
    }
    return code;
  };
  this.tikz = function () {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.tikz();
    }
    return code;
  };
  this.svgml =function(coeff,amp) {
    let code = "";
    for (let objet of objets) {
     if (typeof(objet.svgml)=='undefined') code += "\n\t" + objet.svg(coeff);
     else code += "\n\t" + objet.svgml(coeff,amp);
    }
    return code;
  }
  this.tikzml = function (amp) {
    let code = "";
    for (let objet of objets) {
      if (typeof(objet.tikzml)=='undefined') code += "\n\t" + objet.tikz();
      else code += "\n\t" + objet.tikzml(amp);
    }
    return code;
  };
}

export function repere2(...args) {
  return new Repere2(...args)
}

/**
 * Place un point dans un repère (en récupérant xUnite et yUnite d'un objet repère)
 *
 *
 * @param {integer} x
 * @param {integer} y
 * @param {object} repere
 * @auteur Rémi Angot
 */
export function pointDansRepere(x, y, repere = {xUnite : 1, yUnite : 1}){
  return point(calcul(x*repere.xUnite), calcul(y*repere.yUnite))
}

/**
 * Trace un graphique cartésien dans un repère 
 *
 *
 * @param {array} data 
 * @param {object} repere
 * @auteur Rémi Angot
 */
function TraceGraphiqueCartesien(data, repere, {
  couleurDesPoints='red', 
  couleurDuTrait = 'blue',
  styleDuTrait = '', //plein par défaut
  epaisseurDuTrait = 2,
  styleDesPoints = 'x', //croix par défaut
  tailleDesPoints = 3,
  
  
  }={}){
  ObjetMathalea2D.call(this);
  let objets = [];
  let listePoints = [];
  for (let [x,y] of data){
    let M = pointDansRepere(x,y,repere);
    listePoints.push(M)
    let t = tracePoint(M);
    t.color = couleurDesPoints;
    t.style = styleDesPoints;
    t.taille = tailleDesPoints;
    t.isVisible = false;
    M.isVisible = false;
    objets.push(t);
  }
  let l = polyline(...listePoints);
  l.isVisible = false;
  l.epaisseur = epaisseurDuTrait;
  l.color = couleurDuTrait;
  if (styleDuTrait=='pointilles'){
    l.pointilles = true
  }
  objets.push(l)

  // LES SORTIES TiKZ et SVG
  this.svg = function (coeff) {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.svg(coeff);
    }
    return code;
  };
  this.tikz = function () {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.tikz();
    }
    return code;
  };
  this.svgml =function(coeff,amp) {
    let code = "";
    for (let objet of objets) {
     if (typeof(objet.svgml)=='undefined') code += "\n\t" + objet.svg(coeff);
     else code += "\n\t" + objet.svgml(coeff,amp);
    }
    return code;
  }
  this.tikzml = function (amp) {
    let code = "";
    for (let objet of objets) {
      if (typeof(objet.tikzml)=='undefined') code += "\n\t" + objet.tikz();
      else code += "\n\t" + objet.tikzml(amp);
    }
    return code;
  };

}

export function traceGraphiqueCartesien(...args){
  return new TraceGraphiqueCartesien(...args)
}


/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%% LES STATISTIQUES %%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/


/**
 * Trace une barre pour un histogramme
 *
 * @param {integer} x
 * @param {integer} y
 * @param {string} legende
 * @param {integer} epaisseur
 * @param {string} couleur
 * @param {integer} opaciteDeRemplissage
 * @param {integer} angle
 * @auteur Rémi Angot
 */
function TraceBarre(x,y,legende='',{epaisseur=.6,couleurDeRemplissage='blue',color='black',opaciteDeRemplissage=.3,angle=66,unite=1}={}){
  ObjetMathalea2D.call(this)
  let p = polygone(point(calcul(x-epaisseur/2),0),point(calcul(x-epaisseur/2),calcul(y*unite)),point(calcul(x+epaisseur/2),calcul(y*unite)),point(calcul(x+epaisseur/2),0))
  p.couleurDeRemplissage = couleurDeRemplissage;
  p.opaciteDeRemplissage = opaciteDeRemplissage;
  p.color = color;
  let texte = texteParPosition(legende,x,-.2,angle,'black',1,'gauche');
  
  this.tikz = function (){
    return p.tikz() + '\n' + texte.tikz()
  }
  this.svg = function (coeff){
    return p.svg(coeff) + '\n' + texte.svg(coeff)
  }
}

export function traceBarre(...args){
  return new TraceBarre(...args)
}

/**
 * Trace une barre horizontale pour un histogramme
 *
 * @param {integer} x
 * @param {integer} y
 * @param {string} legende
 * @param {integer} epaisseur
 * @param {string} couleur
 * @param {integer} opaciteDeRemplissage
 * @param {integer} angle
 * @auteur Rémi Angot
 */
function TraceBarreHorizontale(x,y,legende='',{epaisseur=.6,couleurDeRemplissage='blue',color='black',opaciteDeRemplissage=.3,unite=1}={}){
  ObjetMathalea2D.call(this)
  let p = polygone(point(0, calcul(y-epaisseur/2)), point(0, calcul(y+epaisseur/2)), point(calcul(unite*x), calcul(y+epaisseur/2)), point(calcul(unite*x), calcul(y-epaisseur/2))) 
  p.couleurDeRemplissage = couleurDeRemplissage;
  p.opaciteDeRemplissage = opaciteDeRemplissage;
  p.color = color;
  let texte = texteParPosition(legende,-.2,y,'gauche','black');
  
  this.tikz = function (){
    return p.tikz() + '\n' + texte.tikz()
  }
  this.svg = function (coeff){
    return p.svg(coeff) + '\n' + texte.svg(coeff)
  }
}

export function traceBarreHorizontale(...args){
  return new TraceBarreHorizontale(...args)
}





/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%% LES COURBES DE FONCTIONS %%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/



function LectureImage(x,y,xscale=1,yscale=1,color='red',text_abs="",text_ord=""){
  ObjetMathalea2D.call(this)
  this.x=x
  this.y=y
  this.xscale=xscale
  this.yscale=yscale
  if (text_abs=="") text_abs=x.toString()
  if (text_ord=="") text_ord=y.toString()
  this.text_abs=text_abs
  this.text_ord=text_ord
  this.color=color

  this.svg=function(coeff){
    let x0=calcul(this.x/this.xscale)
    let y0=calcul(this.y/this.yscale)
    let M=point(x0,y0)
    let X=point(x0,0)
    let Y=point(0,y0)
    let Sx=segment(X,M,this.color)
    let Sy=segment(M,Y,this.color)
    Sx.styleExtremites='->'
    Sy.styleExtremites='->'
    Sx.pointilles=true
    Sy.pointilles=true
    return "\t\n"+Sx.svg(coeff)+"\t\n"+Sy.svg(coeff)+"\t\n"+texteParPosition(this.text_abs,x0,-1*20/coeff,'milieu',this.color).svg(coeff)+"\t\n"+texteParPosition(this.text_ord,-1*20/coeff,y0,'milieu',this.color).svg(coeff)
  }
  this.tikz=function(){
    let x0=calcul(this.x/this.xscale)
    let y0=calcul(this.y/this.yscale)
    let M=point(x0,y0)
    let X=point(x0,0)
    let Y=point(0,y0)
    let Sx=segment(X,M,this.color)
    let Sy=segment(M,Y,this.color)
    Sx.styleExtremites='->'
    Sy.styleExtremites='->'
    Sx.pointilles=true
    Sy.pointilles=true
    return "\t\n"+Sx.tikz()+"\t\n"+Sy.tikz()+"\t\n"+texteParPosition(this.text_abs,x0,-1/mathalea.scale,'milieu',this.color).tikz()+"\t\n"+texteParPosition(this.text_ord,-1/mathalea.scale,y0,'milieu',this.color).tikz()
  }
  this.svgml=function(coeff,amp){
    let x0=calcul(this.x/this.xscale)
    let y0=calcul(this.y/this.yscale)
    let M=point(x,y)
    let X=point(x0,0)
    let Y=point(0,y0)
    let Sx=segment(X,M,this.color)
    let Sy=segment(M,Y,this.color)
    Sx.styleExtremites='->'
    Sy.styleExtremites='->'
    Sx.pointilles=true
    Sy.pointilles=true
    return "\t\n"+Sx.svgml(coeff,amp)+"\t\n"+Sy.svgml(coeff,amp)+"\t\n"+texteParPosition(this.text_abs,x0,-1*20/coeff,'milieu',this.color).svg(coeff)+"\t\n"+texteParPosition(this.text_ord,-1*20/coeff,y0,'milieu',this.color).svg(coeff)
 
  }
  this.tikzml=function(amp){
    let x0=calcul(this.x/this.xscale)
    let y0=calcul(this.y/this.yscale)
    let M=point(x,y)
    let X=point(x0,0)
    let Y=point(0,y0)
    let Sx=segment(X,M,color)
    let Sy=segment(M,Y,color)
    Sx.styleExtremites='->'
    Sy.styleExtremites='->'
    Sx.pointilles=true
    Sy.pointilles=true
    return "\t\n"+Sx.tikzml(amp)+"\t\n"+Sy.tikzml(amp)+"\t\n"+texteParPosition(this.text_abs,x0,-1/mathalea.scale,'milieu',this.color).tikz()+"\t\n"+texteParPosition(this.text_ord,-1/mathalea.scale,y0,'milieu',this.color).tikz()
 
  }
}
export function lectureImage(...args){
  return new LectureImage(...args)
}

function LectureAntecedent(x,y,xscale,yscale,color,text_ord,text_abs){
  "use strict"
  ObjetMathalea2D.call(this)
  this.x=x
  this.y=y
  this.xscale=xscale
  this.yscale=yscale
  if (text_abs=="") text_abs=this.x.toString()
  if (text_ord=="") text_ord=this.y.toString()
  this.text_abs=text_abs
  this.text_ord=text_ord
  this.color=color

  this.svg=function(coeff){
    let x0=calcul(this.x/this.xscale)
    let y0=calcul(this.y/this.yscale)
    let M=point(x0,y0)
    let X=point(x0,0)
    let Y=point(0,y0)
    let Sx=segment(M,X,color)
    let Sy=segment(Y,M,color)
    Sx.styleExtremites='->'
    Sy.styleExtremites='->'
    Sx.pointilles=true
    Sy.pointilles=true
    return "\t\n"+Sx.svg(coeff)+"\t\n"+Sy.svg(coeff)+"\t\n"+texteParPosition(this.text_abs,x0,-1*20/coeff,'milieu',this.color).svg(coeff)+"\t\n"+texteParPosition(this.text_ord,-1*20/coeff,y0,'milieu',this.color).svg(coeff)

  }
  this.tikz=function(){
    let x0=calcul(this.x/this.xscale)
    let y0=calcul(this.y/this.yscale)
    let M=point(x0,y0)
    let X=point(x0,0)
    let Y=point(0,y0)
    let Sx=segment(M,X,color)
    let Sy=segment(Y,M,color)
    Sx.styleExtremites='->'
    Sy.styleExtremites='->'
    Sx.pointilles=true
    Sy.pointilles=true
    return "\t\n"+Sx.tikz()+"\t\n"+Sy.tikz()+"\t\n"+texteParPosition(this.text_abs,x0,-1/mathalea.scale,'milieu',this.color).tikz()+"\t\n"+texteParPosition(this.text_ord,-1/mathalea.scale,y0,'milieu',this.color).tikz()

  }
  this.svgml=function(coeff,amp){
    let x0=calcul(this.x/this.xscale)
    let y0=calcul(this.y/this.yscale)
    let M=point(x0,y0)
    let X=point(x0,0)
    let Y=point(0,y0)
    let Sx=segment(M,X,color)
    let Sy=segment(Y,M,color)
    Sx.styleExtremites='->'
    Sy.styleExtremites='->'
    Sx.pointilles=true
    Sy.pointilles=true
    return "\t\n"+Sx.svgml(coeff,amp)+"\t\n"+Sy.svgml(coeff,amp)+"\t\n"+texteParPosition(this.text_abs,x0,-1*20/coeff,'milieu',this.color).svg(coeff)+"\t\n"+texteParPosition(this.text_ord,-1*20/coeff,y0,'milieu',this.color).svg(coeff)
 }
  this.tikzml=function(amp){
    let x0=calcul(this.x/this.xscale)
    let y0=calcul(this.y/this.yscale)
    let M=point(x0,y0)
    let X=point(x0,0)
    let Y=point(0,y0)
    let Sx=segment(M,X,color)
    let Sy=segment(Y,M,color)
    Sx.styleExtremites='->'
    Sy.styleExtremites='->'
    Sx.pointilles=true
    Sy.pointilles=true
    return "\t\n"+Sx.tikzml(amp)+"\t\n"+Sy.tikzml(amp)+"\t\n"+texteParPosition(this.text_abs,x0,-1/mathalea.scale,'milieu',this.color).tikz()+"\t\n"+texteParPosition(this.text_ord,-1/mathalea.scale,y0,'milieu',this.color).tikz()
 }
}
export function lectureAntecedent(...args){
  return new LectureAntecedent(...args)
} 
/**
 * courbe(f,xmin,xmax,color,epaisseur,repere,step) // Trace la courbe de f
 *
 * @Auteur Rémi Angot
 */

function Courbe(
  f,
  xmin = -20,
  xmax = 30,
  color = "black",
  epaisseur = 2,
  r = [1, 1],
  step = 0.1
) {
  ObjetMathalea2D.call(this);
  this.color = color;
  let xscale, yscale;
  if (r.constructor === Repere) {
    xscale = r.xscale;
    yscale = r.yscale;
  } else {
    xscale = r[0];
    yscale = r[1];
  }
  let points = [];
  for (
    let x = calcul(xmin / xscale);
    x <= calcul(xmax / xscale);
    x = calcul(x + step)
  ) {
    if (isFinite(f(x * xscale))) {
      points.push(point(x, f(x * xscale) / yscale));
    } else {
    }
  }
  let p = polyline([...points], this.color);
  p.epaisseur = epaisseur;
  return p;
}

export function courbe(
  f,
  xmin = -20,
  xmax = 30,
  color = "black",
  epaisseur = 2,
  r = [1, 1],
  step = 0.1
) {
  return new Courbe( f,
  xmin,
  xmax,
  color,
  epaisseur,
  r,
  step)
}

/**
 * courbe2(f,{color,epaisseur,step,xMin,xMax,yMin,yMax,xUnite,yUnite}) // Trace la courbe de f
 *
 * @Auteur Rémi Angot
 */

function Courbe2(f,{
  repere = {},
  color = 'black',
  epaisseur = 2,
  step = false,
  xMin = -10,
  xMax = 10,
  yMin = -10,
  yMax = 10,
  xUnite = 1,
  yUnite = 1
  }={}) {
  ObjetMathalea2D.call(this);
  this.color = color;
  let xmin,ymin,xmax,ymax,xunite,yunite // Tout en minuscule pour les différencier des paramètres de la fonction
  xmin = repere.xMin;
  ymin = repere.yMin;
  xmax = repere.xMax;
  ymax = repere.yMax;
  xunite = repere.xUnite;
  yunite = repere.yUnite;

  //Si le repère n'est pas donné ou ne permet pas de récupérer des valeurs
  if (isNaN(xmin)){xmin = xMin};
  if (isNaN(xmax)){xmax = xMax};
  if (isNaN(ymin)){ymin = yMin};
  if (isNaN(ymax)){ymax = yMax};
  if (isNaN(xunite)){xunite = xUnite};
  if (isNaN(yunite)){yunite = yUnite};
  let objets = [];
  let points = [];
  let pas;
  if(!step){
    pas = calcul(0.2/xUnite);
  } else {
    pas = step;
  }
  for (let x = xmin ; x <= xmax ; x = calcul(x + pas )
  ) {
    if (f(x)<ymax+.2 && f(x)>ymin-.2) {
      points.push(point(calcul(x*xunite), calcul(f(x)*yunite)));
    } else {
      let p = polyline([...points], this.color);
      p.epaisseur = epaisseur;
      objets.push(p)
      points = []
    }
    let p = polyline([...points], this.color);
    p.epaisseur = epaisseur;
    objets.push(p)
  }

  // LES SORTIES TiKZ et SVG
  this.svg = function (coeff) {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.svg(coeff);
    }
    return code;
  };
  this.tikz = function () {
    let code = "";
    for (let objet of objets) {
      code += "\n\t" + objet.tikz();
    }
    return code;
  };
  this.svgml =function(coeff,amp) {
    let code = "";
    for (let objet of objets) {
     if (typeof(objet.svgml)=='undefined') code += "\n\t" + objet.svg(coeff);
     else code += "\n\t" + objet.svgml(coeff,amp);
    }
    return code;
  }
  this.tikzml = function (amp) {
    let code = "";
    for (let objet of objets) {
      if (typeof(objet.tikzml)=='undefined') code += "\n\t" + objet.tikz();
      else code += "\n\t" + objet.tikzml(amp);
    }
    return code;
  };
  
}

export function courbe2(...args){
  return new Courbe2(...args)
}




/**
 * @SOURCE : https://gist.github.com/ericelliott/80905b159e1f3b28634ce0a690682957
 */
// y1: start value
// y2: end value
// mu: the current frame of the interpolation,
//     in a linear range from 0-1.
const cosineInterpolate = (y1, y2, mu) => {
  const mu2 = (1 - Math.cos(mu * Math.PI)) / 2;
  return y1 * (1 - mu2) + y2 * mu2;
};

function CourbeInterpolee(
  tableau,
  color = "black",
  epaisseur = 2,
  r = [1, 1],
  xmin,
  xmax
) {
  ObjetMathalea2D.call(this);
  let mesCourbes = [];
  for (let i = 0; i < tableau.length - 1; i++) {
    let x0 = tableau[i][0];
    let y0 = tableau[i][1];
    let x1 = tableau[i + 1][0];
    let y1 = tableau[i + 1][1];
    let f = (x) => cosineInterpolate(y0, y1, calcul((x - x0) / (x1 - x0)));
    let depart, fin;
    xmin > x0 ? (depart = xmin) : (depart = x0);
    xmax < x1 ? (fin = xmax) : (fin = x1);
    let c = courbe(f, depart, fin, color, epaisseur, r);
    mesCourbes.push(c);
    this.svg = function (coeff) {
      let code = "";
      for (let objet of mesCourbes) {
        code += "\n\t" + objet.svg(coeff);
      }
      return code;
    };
    this.tikz = function () {
      let code = "";
      for (let objet of mesCourbes) {
        code += "\n\t" + objet.tikz();
      }
      return code;
    };
  }
}
/**
 *
 * @param {array} tableau de coordonnées [x,y]
 * @param {string} couleur
 * @param {number} epaisseur
 * @param {objet} repere (ou tableau [xscale,yscale])
 * @param {number} xmin
 * @param {number} xmax
 *
 * @auteur Rémi Angot
 */
export function courbeInterpolee(...args) {
  return new CourbeInterpolee(...args);
}

function GraphiqueInterpole(
  tableau,{color = "black",
    epaisseur = 1,
    repere = {},
    step = 0.2,
    }={}
  
) {
  ObjetMathalea2D.call(this);
  let mesCourbes = [];
  for (let i = 0; i < tableau.length - 1; i++) {
    let x0 = tableau[i][0];
    let y0 = tableau[i][1];
    let x1 = tableau[i + 1][0];
    let y1 = tableau[i + 1][1];
    let f = (x) => cosineInterpolate(y0, y1, calcul((x - x0) / (x1 - x0)));
    let depart, fin;
    repere.xMin > x0 ? (depart = repere.xMin) : (depart = x0);
    repere.xMax < x1 ? (fin = repere.xMax) : (fin = x1);
    let c = courbe2(f,{step:step,xMin : depart, xMax : fin, color : color, epaisseur : epaisseur, xUnite : repere.xUnite, yUnite : repere.yUnite, yMin : repere.yMin, yMax : repere.yMax})
    mesCourbes.push(c);
    this.svg = function (coeff) {
      let code = "";
      for (let objet of mesCourbes) {
        code += "\n\t" + objet.svg(coeff);
      }
      return code;
    };
    this.tikz = function () {
      let code = "";
      for (let objet of mesCourbes) {
        code += "\n\t" + objet.tikz();
      }
      return code;
    };
  }
}
/**
 *
 *
 * @auteur Rémi Angot
 */
export function graphiqueInterpole(...args) {
  return new GraphiqueInterpole(...args);
}
export function imageInterpolee(tableau,antecedent){
  let x0 = tableau[0][0];
  let y0 = tableau[0][1];
  let x1 = tableau[1][0];
  let y1 = tableau[1][1];
  let f = (x) => cosineInterpolate(y0, y1, calcul((x - x0) / (x1 - x0)));
  return f(antecedent)
}

export function antecedentInterpole(tableau,image){
  let x0 = tableau[0][0];
  let y0 = tableau[0][1];
  let x1 = tableau[1][0];
  let y1 = tableau[1][1];
  let f = (x) => cosineInterpolate(y0, y1, calcul((x - x0) / (x1 - x0)));
  return AntecedentParDichotomie(x0,x1,f,image,0.01) 
}

function AntecedentParDichotomie(xmin,xmax,f,y,precision=0.01) {
  let xmoy,ymoy
  if (xmin>xmax) {
    xmoy=xmin
    xmin=xmax
    xmax=xmoy
  }
  xmoy=(xmax+xmin)/2
  ymoy=f(xmoy)
  while (Math.abs(ymoy-y)>precision) {
    if (f(xmin)<f(xmax))
      if (ymoy>y) 
        xmax=xmoy
      else
        xmin=xmoy
    else 
      if (ymoy>y)
        xmin=xmoy
      else
        xmax=xmoy
    xmoy=(xmin+xmax)/2
    ymoy=f(xmoy)
  }
  return xmoy
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%% LES INTERVALLES %%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

function CrochetD(A, color = "blue") {
  ObjetMathalea2D.call(this);
  this.epaisseur = 2;
  this.color = color;
  this.taille=0.2
  this.svg = function (coeff) {
    if (this.epaisseur != 1) {
      this.style += ` stroke-width="${this.epaisseur}" `;
    }
    if (Boolean(this.pointilles)) {
      switch (this.pointilles) {
        case 1 :
          this.style += ` stroke-dasharray="6 10" `;
          break;
        case 2 : 
        this.style += ` stroke-dasharray="6 3" `;
        break;       
        case 3 :
          this.style += ` stroke-dasharray="3 2 6 2 " `;
          break;      
        default : 
        this.style += ` stroke-dasharray="5 5" `;
        break; 
      }

    }
    code = `<polyline points="${calcul(A.xSVG(coeff) + this.taille*20)},${calcul(A.ySVG(coeff)+
      2*this.taille*20/coeff * coeff
    )} ${A.xSVG(coeff)},${calcul(A.ySVG(coeff)+2*this.taille*20)} ${A.xSVG(coeff)},${calcul(A.ySVG(coeff)+
      -2*this.taille*20
    )} ${calcul(A.xSVG(coeff) + this.taille*20)},${calcul(A.ySVG(coeff)+
      -2*this.taille*20
    )}" fill="none" stroke="${this.color}" ${this.style} />`;
    code += `\n\t<text x="${A.xSVG(coeff)}" y="${calcul(A.ySVG(coeff)+
      this.taille*20*5 )
    }" text-anchor="middle" dominant-baseline="central" fill="${this.color}">${
      A.nom
    }</text>\n `;
    return code;
  };
  this.tikz = function () {
    code = `\\draw[very thick,${this.color}] (${calcul(A.x + this.taille/mathalea.scale)},${A.y+this.taille/mathalea.scale})--(${
      A.x
    },${A.y+this.taille/mathalea.scale})--(${A.x},${A.y-this.taille/mathalea.scale})--(${calcul(A.x + this.taille/mathalea.scale)},${A.y-this.taille/mathalea.scale});`;
    code += `\n\t\\draw[${this.color}] (${A.x},${A.y-this.taille/mathalea.scale}) node[below] {$${A.nom}$};`;
    return code;
  };
}
export function crochetD(...args) {
  return new CrochetD(...args);
}

function CrochetG(A, color = "blue") {
  ObjetMathalea2D.call(this);
  this.epaisseur = 2;
  this.color = color;
  this.taille=0.2

  this.svg = function (coeff) {
    if (this.epaisseur != 1) {
      this.style += ` stroke-width="${this.epaisseur}" `;
    }
    if (Boolean(this.pointilles)) {
      switch (this.pointilles) {
        case 1 :
          this.style += ` stroke-dasharray="6 10" `;
          break;
        case 2 : 
        this.style += ` stroke-dasharray="6 3" `;
        break;       
        case 3 :
          this.style += ` stroke-dasharray="3 2 6 2 " `;
          break;      
        default : 
        this.style += ` stroke-dasharray="5 5" `;
        break; 
      }

    }
    code = `<polyline points="${calcul(A.xSVG(coeff) - this.taille*20 )},${calcul(A.ySVG(coeff)+
      2*this.taille *20
    )} ${A.xSVG(coeff)},${calcul(A.ySVG(coeff)+2*this.taille *20)} ${A.xSVG(coeff)},${calcul(A.ySVG(coeff)
      -2*this.taille *20
    )} ${calcul(A.xSVG(coeff) - this.taille*20 )},${calcul(A.ySVG(coeff)
      -2*this.taille *20
    )}" fill="none" stroke="${this.color}" ${this.style} />`;
    code += `\n\t<text x="${A.xSVG(coeff)}" y="${A.ySVG(coeff)+
      5*this.taille *20
    }" text-anchor="middle" dominant-baseline="central" fill="${this.color}">${
      A.nom
    }</text>\n `;
    return code;
  };
  this.tikz = function () {
    code = `\\draw[very thick,${this.color}] (${calcul(A.x - this.taille/mathalea.scale)},${A.y+this.taille/mathalea.scale})--(${
      A.x
    },${A.y+this.taille/mathalea.scale})--(${A.x},${A.y-this.taille/mathalea.scale})--(${calcul(A.x - this.taille/mathalea.scale)},${A.y-this.taille/mathalea.scale});`;
    code += `\n\t\\draw[${this.color}] (${A.x},${A.y-this.taille/mathalea.scale}) node[below] {$${A.nom}$};`;
    return code;
  };
}
export function crochetG(...args) {
  return new CrochetG(...args);
}

export function intervalle(A, B, color = "blue", h = 0) {
  let A1 = point(A.x, A.y + h);
  let B1 = point(B.x, B.y + h);
  let s = segment(A1, B1);
  s.epaisseur = 3;
  s.color = color;
  return s;
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% LES TEXTES %%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/


/**
 * texteParPoint('mon texte',A) // Écrit 'mon texte' avec A au centre du texte
 * texteParPoint('mon texte',A,'gauche') // Écrit 'mon texte' à gauche de A (qui sera la fin du texte)
 * texteParPoint('mon texte',A,'droite') // Écrit 'mon texte' à droite de A (qui sera le début du texte)
 * texteParPoint('mon texte',A,45) // Écrit 'mon texte' à centré sur A avec une rotation de 45°
 *
 * @Auteur Rémi Angot
 */
function TexteParPoint(texte, A, orientation = "milieu", color='black',scale=1,ancrageDeRotation = "middle",math_on=false) {
  ObjetMathalea2D.call(this);
  this.color = color;
  this.contour = false;
  this.taille =10*scale;
  this.opacite=1;
  this.svg = function (coeff) {
    let code = "",style="";
    if (math_on) style =' font-family= "KaTeX_Math" '
    if (this.contour) style +=` style="font-size:${this.taille}px;fill:none;fill-opacity:${this.opacite};stroke:${this.color};stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:${this.opacite}" `
    else style += ` style="font-size:${this.taille}px;fill:${this.color};fill-opacity:${this.opacite}" `
    if (typeof(orientation)=='number') {
      code = `<text ${style} x="${A.xSVG(coeff)}" y="${A.ySVG(
        coeff
      )}" text-anchor = ${ancrageDeRotation} dominant-baseline = "central" fill="${
        this.color
      }" transform="rotate(${orientation} ${A.xSVG(coeff)} ${A.ySVG(
        coeff
      )})" id="${this.id}" >${texte}</text>\n `;
    } else {
      switch (orientation) {
        case "milieu":
          code = `<text ${style} x="${A.xSVG(coeff)}" y="${A.ySVG(
            coeff
          )}" text-anchor="middle" dominant-baseline="central" fill="${
            this.color
          }" id="${this.id}" >${texte}</text>\n `;
          break;
        case "gauche":
          code = `<text x="${A.xSVG(coeff)}" y="${A.ySVG(
            coeff
          )}" text-anchor="end" dominant-baseline="central" fill="${
            this.color
          }" id="${this.id}" >${texte}</text>\n `;
          break;
        case "droite":
          code = `<text x="${A.xSVG(coeff)}" y="${A.ySVG(
            coeff
          )}" text-anchor="start" dominant-baseline="central" fill="${
            this.color
          }" id="${this.id}" >${texte}</text>\n `;
          break;
      }
    }

    return code;
  };
  this.tikz = function () {
    let code = "";
    if(math_on) texte=`$`+texte+`$`;
    if (typeof orientation == "number") {
      let anchor = 'center';
      if (ancrageDeRotation == 'gauche'){
        anchor = 'west'
      }
      if (ancrageDeRotation == 'droite'){
        anchor = 'east'
      }
      code = `\\draw [${color}] (${A.x},${
        A.y
      }) node[anchor = ${anchor}, rotate = ${-orientation}] {${texte}};`;
    } else {
      let anchor = "";
      if (orientation == "gauche") {
        anchor = `node[anchor = east,scale=${scale}]`;
      }
      if (orientation == "droite") {
        anchor = `node[anchor = west,scale=${scale}]`;
      }
      if (orientation == "milieu") {
        anchor = `node[anchor = center,scale=${scale}]`;
      }
      code = `\\draw [${color}] (${A.x},${A.y}) ${anchor} {${texte}};`;
    }
    return code;
  };
}
export function texteParPoint(...args) {
  return new TexteParPoint(...args);
}

/**
 * texteParPoint('mon texte',x,y) // Écrit 'mon texte' avec le point de coordonnées (x,y) au centre du texte
 * texteParPoint('mon texte',x,y,'gauche') // Écrit 'mon texte' à gauche de le point de coordonnées (x,y) (qui sera la fin du texte)
 * texteParPoint('mon texte',x,y,'droite') // Écrit 'mon texte' à droite de le point de coordonnées (x,y) (qui sera le début du texte)
 * texteParPoint('mon texte',x,y,45) // Écrit 'mon texte'  centré sur le point de coordonnées (x,y) avec une rotation de 45°
 *
 * @Auteur Rémi Angot
 */
export function texteParPosition(texte, x, y, orientation = "milieu", color,scale=1, ancrageDeRotation = "middle",math_on=false) {
  return new TexteParPoint(texte, point(x, y), orientation, color,scale,ancrageDeRotation,math_on);
}

/**
 * texteParPoint('mon texte',A) // Écrit 'mon texte' avec A au centre du texte
 * texteParPoint('mon texte',A,'gauche') // Écrit 'mon texte' à gauche de A (qui sera la fin du texte)
 * texteParPoint('mon texte',A,'droite') // Écrit 'mon texte' à droite de A (qui sera le début du texte)
 * texteParPoint('mon texte',A,45) // Écrit 'mon texte' à centré sur A avec une rotation de 45°
 *
 * @Auteur Rémi Angot
 */
function LatexParPoint(texte, A, color) {
  ObjetMathalea2D.call(this);
  this.color = color;
  this.svg = function (coeff) {
    return `<foreignObject style="overflow: visible;" y="${A.ySVG(
      coeff
    )}" x="${A.xSVG(
      coeff
    )}" width="200" height="50"><div>${texte}</div></foreignObject`;
  };
  this.tikz = function () {
    let code = `\\draw (${A.x},${A.y}) node[anchor = center] {${texte}};`;
    return code;
  };
}
export function latexParPoint(...args) {
  return new LatexParPoint(...args);
}

export function latexParCoordonnees(texte, x, y) {
  let A = point(x, y);
  return latexParPoint(texte, A);
}

/**
 * x,y sont les coordonnées du début du trait de fraction, 0;0 par défaut
 * num et den sont les numérateurs et dénominateurs (1 et 2) par défaut
 * On peut changer la couleur (noir par défaut)
 * permet d'afficher une fraction à une position donnée en SVG et Latex
 * Les nombres ne sont pas en mode Maths
 * 
 * @Auteur Jean-Claude Lhote
 */

function FractionParPosition({x=0,y=0,fraction=fraction(1,2),couleur='black'}){
  ObjetMathalea2D.call(this);
  let num=Math.abs(fraction.num),den=Math.abs(fraction.den);
  let signe=unSiPositifMoinsUnSinon(fraction.num)*unSiPositifMoinsUnSinon(fraction.den)
  let longueur=Math.max(Math.floor(Math.log10(num))+1,Math.floor(Math.log10(den))+1)*10
  let offset=10

  this.svg=function(coeff){
    let s = segment(x-longueur/coeff/2,y,x+longueur/coeff/2,y,couleur);
    s.isVisible = false;
    let code= s.svg(coeff)
    if (signe==-1) {
      code+= segment(calcul(x-((longueur+15)/coeff/2),0),y,calcul(x-((longueur+5)/coeff/2),0),y,couleur).svg(coeff)
    }
    let t1 = texteParPosition(nombre_avec_espace(num),x,calcul(y+offset/coeff),"milieu",couleur); 
    code+= t1.svg(coeff)
    let t2 = texteParPosition(nombre_avec_espace(den),x,calcul(y-offset/coeff),"milieu",couleur)
    code+= t2.svg(coeff)
    t1.isVisible = false;
    t2.isVisible = false
    code = `<g id="${this.id}">${code}</g>`;
    return code
  }

  this.tikz = function(){

    let code=segment(x,y,calcul(x+longueur/30/mathalea.scale,2),y,couleur).tikz()
    if (signe==-1) {
      code+= segment(calcul(x-((longueur/30+0.75)/mathalea.scale/2),2),y,calcul(x-((longueur/30+0.25)/mathalea.scale/2),2),y,couleur).tikz()
    }
    code+=texteParPosition(nombre_avec_espace(num),calcul(x+longueur/60/mathalea.scale,2),calcul(y+offset/30/mathalea.scale,2),"milieu",couleur).tikz()
    code+=texteParPosition(nombre_avec_espace(den),calcul(x+longueur/60/mathalea.scale,2),calcul(y-offset/30/mathalea.scale,2),"milieu",couleur).tikz()
     return code
  }
}

export function fractionParPosition(arg) {
  return new FractionParPosition(arg)
}

function Print2d(helloworld){
  if (typeof(helloworld)=='number') return texteParPosition(helloworld.toString(),0,0,'droite')
  else texteParPosition(helloworld,0,0,'droite')
}
export function print2d(...args){
  let objects=[]
  for (let j=0;j<args.length;j++) {
    objects.push(Print2d(args[j]))
  }
  return objects
}
/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%% LES FONCTIONS - CALCULS %%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * longueur(A,B) renvoie la distance de A à B
 *
 * @Auteur Rémi Angot
 */
export function longueur(A, B, arrondi) {
  if (arrondi === undefined) {
    return calcul(Math.sqrt((B.x - A.x) ** 2 + (B.y - A.y) ** 2));
  } else {
    return calcul(Math.sqrt((B.x - A.x) ** 2 + (B.y - A.y) ** 2), arrondi);
  }
}

/**
 * norme(V) renvoie la norme du vecteur
 *
 * @Auteur Rémi Angot
 */
export function norme(v) {
  return calcul(Math.sqrt(v.x ** 2 + v.y ** 2));
}

/**
 * angle(A,O,B) renvoie l'angle AOB en degré
 *
 * @Auteur Rémi Angot
 */
export function angle(A, O, B) {
  let OA = longueur(O, A);
  let OB = longueur(O, B);
  let AB = longueur(A, B);
  let v=vecteur(O,A)
  let w=vecteur(O,B)
  if (v.x*w.y-v.y*w.x==0) {
    if(v.x*w.x>0) return 0;
    else if (v.x*w.x<0) return 180;
    else if (v.y*w.y>0) return 0;
    else return 180;
  }
  else 
   return calcul(
    (Math.acos((AB ** 2 - OA ** 2 - OB ** 2) / (-2 * OA * OB)) * 180) / Math.PI,
    2
  );
}

/**
 * Retourne la valeur signée de l'angle AOB en degré.
 * @Auteur Jean-Claude Lhote
 */
export function angleOriente(A, O, B) {
  let A2 = rotation(A, O, 90);
  let v = vecteur(O, B),u = vecteur(O, A2);
  return unSiPositifMoinsUnSinon(v.x * u.x + v.y * u.y) * angle(A, O, B);
}
/**
 * angleradian(A,O,B) renvoie l'angle AOB en radian
 *
 * @Auteur Rémi Angot
 */
export function angleradian(A, O, B) {
  let OA = longueur(O, A);
  let OB = longueur(O, B);
  let AB = longueur(A, B);
  return calcul(Math.acos((AB ** 2 - OA ** 2 - OB ** 2) / (-2 * OA * OB)), 2);
}




/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%% LES LUTINS %%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

function ObjetLutin() {
  //let mesObjets
  //mesObjets.push(this);
  ObjetMathalea2D.call(this);
  this.x = 0;
  this.y = 0;
  this.xSVG = function (coeff) {
    return this.x * coeff;
  };
  this.ySVG = function (coeff) {
    return -this.y * coeff;
  };
  this.orientation = 0;
  this.historiquePositions = [];
  this.crayonBaisse = false;
  this.isVisible = true;
  this.costume = "";
  this.listeTraces = []; // [[x0,y0,x1,y1,style]...]
  this.color = "black";
  this.epaisseur = 2;
  this.pointilles = false;
  this.opacite = 1;
  this.style ='';
  this.svg = function (coeff) {
    let code = '';
    for (let trace of this.listeTraces) {
      let A = point(trace[0], trace[1]);
      let B = point(trace[2], trace[3]);
      let color = trace[4];
      let epaisseur = trace[5];
      let pointilles = trace[6];
      let opacite = trace[7];
      let style = '';
      if (epaisseur != 1) {
        style += ` stroke-width="${epaisseur}" `;
      }
      if (pointilles) {
        style += ` stroke-dasharray="4 3" `;
      }
      if (opacite != 1) {
        style += ` stroke-opacity="${opacite}" `;
      }
      code += `\n\t<line x1="${A.xSVG(coeff)}" y1="${A.ySVG(
        coeff
      )}" x2="${B.xSVG(coeff)}" y2="${B.ySVG(coeff)}" stroke="${color}" ${style}  />`;
    }
    return code;
  };
  this.tikz = function () {
    let code = '';
    for (let trace of this.listeTraces) {
      let A = point(trace[0], trace[1]);
      let B = point(trace[2], trace[3]);
      let color = trace[4];
      let epaisseur = trace[5];
      let pointilles = trace[6];
      let opacite = trace[7];
      let optionsDraw = [];
      let tableauOptions = [];
      if (color.length > 1 && color !== "black") {
        tableauOptions.push(color);
      }
      if (epaisseur != 1) {
        tableauOptions.push(`line width = ${epaisseur}`);
      }
      if (opacite != 1) {
        tableauOptions.push(`opacity = ${opacite}`);
      }
      if (pointilles) {
        tableauOptions.push(`dashed`);
      }
      if (tableauOptions.length > 0) {
        optionsDraw = "[" + tableauOptions.join(",") + "]";
      }
      code +=`\n\t\\draw${optionsDraw} (${A.x},${A.y})--(${B.x},${B.y});`;
    };
    return code
  }
}

export function creerLutin(...args) {
  return new ObjetLutin(...args);
}

export function avance(d, lutin = mathalea.lutin) { // A faire avec pointSurCercle pour tenir compte de l'orientation
  let xdepart = lutin.x;
  let ydepart = lutin.y;
  lutin.x = calcul(lutin.x + d/mathalea.unitesLutinParCm * Math.cos(Math.radians(lutin.orientation)));
  lutin.y = calcul(lutin.y + d/mathalea.unitesLutinParCm * Math.sin(Math.radians(lutin.orientation)));
  lutin.historiquePositions.push([lutin.x, lutin.y]);
  if (lutin.crayonBaisse) {
    lutin.listeTraces.push([xdepart, ydepart, lutin.x, lutin.y,lutin.color,lutin.epaisseur,lutin.pointilles,lutin.opacite]);
  }
}

export function baisseCrayon(lutin = mathalea.lutin) {
  lutin.crayonBaisse = true;
}

export function leveCrayon(lutin = mathalea.lutin) {
  lutin.crayonBaisse = false;
}

export function orienter(a,lutin = mathalea.lutin){
  lutin.orientation = a
}

export function tournerG(a,lutin = mathalea.lutin){
  lutin.orientation +=a
}

export function tournerD(a,lutin = mathalea.lutin){
  lutin.orientation -=a
}

export function allerA(x,y,lutin = mathalea.lutin){
  let xdepart = lutin.x;
  let ydepart = lutin.y;
  lutin.x = calcul(x/mathalea.unitesLutinParCm);
  lutin.y = calcul(y/mathalea.unitesLutinParCm);
  lutin.historiquePositions.push([lutin.x, lutin.y]);
  if (lutin.crayonBaisse) {
    lutin.listeTraces.push([xdepart, ydepart, lutin.x, lutin.y,lutin.color,lutin.epaisseur,lutin.pointilles,lutin.opacite]);
  } 
}

export function mettrexA(x,lutin = mathalea.lutin){
  let xdepart = lutin.x;
  lutin.x = calcul(x/mathalea.unitesLutinParCm);
  lutin.historiquePositions.push([lutin.x, lutin.y]);
  if (lutin.crayonBaisse) {
    lutin.listeTraces.push([xdepart, lutin.y, lutin.x, lutin.y,lutin.color,lutin.epaisseur,lutin.pointilles]);
  } 
}

export function mettreyA(y,lutin = mathalea.lutin){
  let ydepart = lutin.y;
  lutin.y = calcul(y/mathalea.unitesLutinParCm);
  lutin.historiquePositions.push([lutin.x, lutin.y]);
  if (lutin.crayonBaisse) {
    lutin.listeTraces.push([lutin.x, ydepart, lutin.x, lutin.y,lutin.color,lutin.epaisseur,lutin.pointilles]);
  } 
}

export function ajouterAx(x,lutin = mathalea.lutin){
  let xdepart = lutin.x;
  lutin.x += calcul(x/mathalea.unitesLutinParCm);
  lutin.historiquePositions.push([lutin.x, lutin.y]);
  if (lutin.crayonBaisse) {
    lutin.listeTraces.push([xdepart, lutin.y, lutin.x, lutin.y,lutin.color,lutin.epaisseur,lutin.pointilles]);
  } 
}

export function ajouterAy(y,lutin = mathalea.lutin){
  let ydepart = lutin.y;
  lutin.y += calcul(y/mathalea.unitesLutinParCm);
  lutin.historiquePositions.push([lutin.x, lutin.y]);
  if (lutin.crayonBaisse) {
    lutin.listeTraces.push([lutin.x, ydepart, lutin.x, lutin.y,lutin.color,lutin.epaisseur,lutin.pointilles]);
  } 
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%% LES INSTRUMENTS %%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/


/**
 * Afficher le SVG d'un crayon avec la mine sur le point A
 * 
 * @param {point} A 
 *
 * 
 * 
 */
function AfficherCrayon(A){
  ObjetMathalea2D.call(this);
  this.x = A.x;
  this.y = A.y;
  this.svg=function(){
    let code = `<g id="${this.id}" stroke="#000000" fill="none" transform="translate(${(this.x-.2)*mathalea.pixelsParCm},${-60-(this.y-.2)*mathalea.pixelsParCm}) scale(.1) ">
   <path id="rect2990" d="m70.064 422.35 374.27-374.26 107.58 107.58-374.26 374.27-129.56 21.97z" stroke-width="30"/>
   <path id="path3771" d="m70.569 417.81 110.61 110.61" stroke-width="25"/>
   <path id="path3777" d="m491.47 108.37-366.69 366.68" stroke-width="25"/>
   <path id="path3763" d="m54.222 507.26 40.975 39.546" stroke-width="25"/>
  </g>`
  return code
  }
}

export function afficherCrayon(...args){
  return new AfficherCrayon(...args)
}

/**
 * Déplace un instrument suivant le vecteur AB
 * 
 * @param {any} instrument 
 * @param {any} A point de départ
 * @param {any} B point d'arrivée
 * @param {number} [begin=0] peut être un nombre de seconde ou la fin d'un évènement précédent avec id.end
 * @param {any} id pour lier les animations

 * 
 */
function TranslationInstrument(instrument,A,B,begin=0,id){
  ObjetMathalea2D.call(this)
  let v = vecteur(A,B) // vecteur du départ à la cible
  let texteId = '' // Ajout d'un id facultatif à l'animation
  if (id === undefined){
    texteId = ''
  } else {
    texteId = `id="${id}"`
  }
  this.svg=function(coeff){
    let code = `
    <line x1="${A.xSVG(coeff)}" y1="${A.ySVG(coeff)}" x2="${A.xSVG(coeff)}" y2="${A.ySVG(coeff)}" stroke="black" > 
    <animate attributeName="x2" from="${A.xSVG(coeff)}" to="${B.xSVG(coeff)}" begin="${begin}" dur="1s" fill="freeze" /> 
    <animate attributeName="y2" from="${A.ySVG(coeff)}" to="${B.ySVG(coeff)}" begin="${begin}" dur="1s" fill="freeze" /> 
    </line> 
    <animateMotion
    xlink:href="#${instrument.id}"
    ${texteId}
    path="M 0 0 l ${v.xSVG(coeff)} ${v.ySVG(coeff)}"
    dur="1s"
    additive="sum"
    begin="${begin}"
    fill="freeze" 
    id="${this.id}"/>`
    return code
  }
}


// export function deplaceInstrument(instrument, B, begin=0, id){
//   let A = point(instrument.x,instrument.y);
//   translationInstrument(instrument, A, B, begin=0, id);
//   instrument.x = B.x;
//   instrument.y = B.y;
// }




/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%% LES FONCTIONS - FORMATAGE %%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/


export function codeSvg(fenetreMathalea2d, pixelsParCm, mainlevee, ...objets) { 
  let code = "";              
  let fenetrexmin = fenetreMathalea2d[0]
  let fenetreymin = fenetreMathalea2d[3]*-(1) 
  let fenetrexmax = fenetreMathalea2d[2]
  let fenetreymax = fenetreMathalea2d[1]*(-1)

  code = `<svg width="${(fenetrexmax-fenetrexmin)*pixelsParCm}" height="${(fenetreymax-fenetreymin)*pixelsParCm}" viewBox="${fenetrexmin*pixelsParCm} ${fenetreymin*pixelsParCm} ${(fenetrexmax-fenetrexmin)*pixelsParCm} ${(fenetreymax-fenetreymin)*pixelsParCm}" xmlns="http://www.w3.org/2000/svg">\n`;
  for (let objet of objets) {
    if (Array.isArray(objet)) {
      for (let i = 0; i < objet.length; i++) {
        try {
          if (objet[i].isVisible) {
            if (!mainlevee||typeof(objet[i].svgml)=='undefined') code += "\t" + objet[i].svg(pixelsParCm) + "\n";
            else {
              code += "\t" + objet[i].svgml(pixelsParCm,mathalea.amplitude) + "\n";
            }
          }
        } catch (error) {}
      }
    }
    try {
      if (objet.isVisible) {
        if (!mainlevee||typeof(objet.svgml)=='undefined') code += "\t" + objet.svg(pixelsParCm) + "\n";
        else code += "\t" + objet.svgml(pixelsParCm,amplitude) + "\n";
      }
    } catch (error) {}
  }
  code += `</svg>`;
  return code;
}

/**
 * codeTikz(segment(A,B),polygone(D,E,F),labelPoints(A,B))
 *
 * @Auteur Rémi Angot
 */


export function codeTikz(fenetreMathalea2d, scale, mainlevee,  ...objets) {
  let code = "";
  let fenetrexmin = fenetreMathalea2d[0]
  let fenetreymin = fenetreMathalea2d[3]*-(1) 
  let fenetrexmax = fenetreMathalea2d[2]
  let fenetreymax = fenetreMathalea2d[1]*(-1)
  if (scale == 1) {
    code += `\\begin{tikzpicture}[baseline]\n`;
  } else {
    code += `\\begin{tikzpicture}[baseline,scale = ${scale}]\n`;
  }
  code += `\\tikzset{
		point/.style={
			thick,
			draw,
			cross out,
			inner sep=0pt,
			minimum width=5pt,
			minimum height=5pt,
		},
	}
	\\clip (${fenetrexmin},${fenetreymin}) rectangle (${fenetrexmax},${fenetreymax});

	\n\n`;
  for (let objet of objets) {
    if (Array.isArray(objet)) {
      for (let i = 0; i < objet.length; i++) {
        try {
          if (objet[i].isVisible) {
           if (!mainlevee||typeof(objet[i].tikzml)=='undefined') code += "\t" + objet[i].tikz() + "\n";
           else code += "\t" + objet[i].tikzml(mathalea.amplitude) + "\n";
          }
        } catch (error) {}
      }
    }
    try {
      if (objet.isVisible) {
        if (!mainlevee||typeof(objet.tikzml)=='undefined') code += "\t" + objet.tikz() + "\n";
        else code += "\t" + objet.tikzml(mathalea.amplitude) + "\n";
      }
    } catch (error) {}
  }
  code += `\\end{tikzpicture}\n`;
  return code;
}




/**
 * mathalea2d(xmin,xmax,ymin,ymax,objets)
 *
 * @Auteur Rémi Angot
 */

export function mathalea2d(
  { xmin = 0, ymin = 0, xmax = 15, ymax = 6, pixelsParCm = 20, scale = 1,mainlevee = false ,amplitude=1} = {},
  ...objets
) {
  let code = "";
  if (sortie_html) {
    code = `<svg class="mathalea2d" width="${(xmax - xmin) * pixelsParCm}" height="${
      (ymax - ymin) * pixelsParCm
    }" viewBox="${xmin * pixelsParCm} ${-ymax * pixelsParCm} ${
      (xmax - xmin) * pixelsParCm
    } ${(ymax - ymin) * pixelsParCm}" xmlns="http://www.w3.org/2000/svg">\n`;
    //code += codeSvg(...objets);
    for (let objet of objets) {
      if (Array.isArray(objet)) {
        for (let i = 0; i < objet.length; i++) {
          try {
            if (objet[i].isVisible) {
             if ((!mainlevee)||typeof(objet[i].svgml)=='undefined') code += "\t" + objet[i].svg(pixelsParCm) + "\n";
             else
                  code += "\t" + objet[i].svgml(pixelsParCm,amplitude) + "\n";
            }
          } catch (error) {console.log('premiere boucle',error.message,objet[i],i)}

        }
      }
      try {
        if (objet.isVisible) {
          if ((!mainlevee)||typeof(objet.svgml)=='undefined') code += "\t" + objet.svg(pixelsParCm) + "\n";
          else
               code += "\t" + objet.svgml(pixelsParCm,amplitude) + "\n";
         }
    } catch (error) {console.log('le try tout seul',error.message,objet)}
    }
    code += `\n</svg>`;
    code = code.replace(/\\thickspace/gm,' ')
    //		pixelsParCm = 20;
  } else {
    if (scale == 1) {
      code = `\\begin{tikzpicture}[baseline]\n`;
    } else {
      code = `\\begin{tikzpicture}[baseline,scale = ${scale}]\n`;
    }

    code += `
		\\tikzset{
			point/.style={
				thick,
				draw,
				cross out,
				inner sep=0pt,
				minimum width=5pt,
				minimum height=5pt,
			},
		}
		\\clip (${xmin},${ymin}) rectangle (${xmax},${ymax});


		`;
    //code += codeTikz(...objets)
    for (let objet of objets) {
      if (Array.isArray(objet)) {
        for (let i = 0; i < objet.length; i++) {
          try {
            if (objet[i].isVisible) {
              if (!mainlevee||typeof(objet[i].tikzml)=='undefined') code += "\t" + objet[i].tikz() + "\n";
              else code += "\t" + objet[i].tikzml(amplitude) + "\n";
            }
          } catch (error) {}
        }
      }
      try {
        if (objet.isVisible) {
          if (!mainlevee||typeof(objet.tikzml)=='undefined') code += "\t" + objet.tikz() + "\n";
          else code += "\t" + objet.tikzml(amplitude) + "\n";
        }
     } catch (error) {}
    }
    code += `\n\\end{tikzpicture}`;
  }
  return code;
}

/**
 * Fonction créant un labyrinthe de nombres
 * Le tableau de nombres doit être de format [6][3]
 * Le niveau doit être un entier entre 1 et 6 inclus
 * @Auteur Jean-Claude
 * Publié le 6/12/2020
 */
function Labyrinthe() {
	this.murs2d = []
	this.chemin2d = []
	this.nombres2d = []
	this.chemin = []
	this.niveau = 3
	this.nombres = [[]]
  let  couleur = 'brown'
  let chemins = [
		[[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [5, 1], [6, 1]],
		[[1, 0], [2, 0], [3, 0], [4, 0], [4, 1], [5, 1], [6, 1]],
		[[1, 0], [2, 0], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1]],
		[[1, 0], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1]],
		[[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [5, 1], [5, 2], [6, 2]],
		[[1, 0], [2, 0], [3, 0], [4, 0], [4, 1], [5, 1], [5, 2], [6, 2]],
		[[1, 0], [2, 0], [3, 0], [4, 0], [4, 1], [4, 2], [5, 2], [6, 2]],
		[[1, 0], [2, 0], [3, 0], [3, 1], [4, 1], [5, 1], [5, 2], [6, 2]],
		[[1, 0], [2, 0], [3, 0], [3, 1], [3, 2], [4, 2], [5, 2], [6, 2]],
		[[1, 0], [2, 0], [2, 1], [3, 1], [4, 1], [4, 2], [5, 2], [6, 2]],
		[[1, 0], [1, 1], [2, 1], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2]],
		[[1, 0], [1, 1], [2, 1], [3, 1], [4, 1], [4, 0], [5, 0], [6, 0]],
		[[1, 0], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [5, 2], [6, 2]],
		[[1, 0], [1, 1], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2]],
		[[1, 0], [1, 1], [2, 1], [2, 2], [3, 2], [4, 2], [5, 2], [5, 1], [6, 1]],
		[[1, 0], [2, 0], [3, 0], [3, 1], [3, 2], [4, 2], [5, 2], [5, 1], [6, 1]],
		[[1, 0], [1, 1], [1, 2], [2, 2], [3, 2], [3, 1], [4, 1], [5, 1], [6, 1]],
		[[1, 0], [1, 1], [1, 2], [2, 2], [3, 2], [4, 2], [4, 1], [5, 1], [6, 1]],
		[[1, 0], [2, 0], [3, 0], [3, 1], [3, 2], [4, 2], [5, 2], [5, 1], [5, 0], [6, 0]],
		[[1, 0], [1, 1], [2, 1], [2, 2], [3, 2], [4, 2], [4, 1], [4, 0], [5, 0], [6, 0]],
		[[1, 0], [1, 1], [2, 1], [2, 2], [3, 2], [4, 2], [5, 2], [5, 1], [5, 0], [6, 0]],
		[[1, 0], [1, 1], [1, 2], [2, 2], [3, 2], [4, 2], [4, 1], [4, 0], [5, 0], [6, 0]],
		[[1, 0], [1, 1], [1, 2], [2, 2], [3, 2], [3, 1], [3, 0], [4, 0], [5, 0], [5, 1], [5, 2], [6, 2]],
		[[1, 0], [1, 1], [1, 2], [2, 2], [3, 2], [3, 1], [3, 0], [4, 0], [5, 0], [5, 1], [5, 2], [6, 2]]]
	let elementchemin
	for (let i = 0; i < 24; i++) { // on double le nombre de chemins par Symétrie.
		elementchemin = []
		for (let j = 0; j < chemins[i].length; j++) {
			elementchemin.push([chemins[i][j][0], 2 - chemins[i][j][1]])
		}
		chemins.push(elementchemin)
	}
	this.choisitChemin = function (niveau) { // retourne un chemin en fonction du niveau
		let choix = choice([0, 24]), choixchemin
		switch (niveau) {  // on choisit le chemin parmi les 23*2
			case 1: choixchemin = randint(0, 3) + choix
				break
			case 2: choixchemin = randint(4, 13) + choix
				break
			case 3: choixchemin = randint(14, 17) + choix
				break
			case 4: choixchemin = randint(18, 21) + choix
				break
			case 5: choixchemin = randint(22, 23) + choix
				break
			case 6: choixchemin = randint(0, 23) + choix
				break
		}
		return chemins[choixchemin]
	}

	// Retourne le tableau d'objets des murs en fonction du point d'entrée de chemin
	this.construitMurs = function (chemin) {
		let choix, objets = [],s1,s2,s3,s4,s5
		if (chemin[0][1] == 0) choix = 0
		else choix = 2
		for (let i = 0; i < 6; i++) {
			// éléments symétriques pour A et B
			if (choix == 0) {
				// T inférieurs
				s1 = segment(point(i * 3, 1), point(i * 3, 2))
				s1.epaisseur = 2
				//s1.styleExtremites = '-'
				objets.push(s1)

				// T supérieurs
				if (i > 0) {
					s2 = segment(point(i * 3, 10), point(i * 3, 9))
					s2.epaisseur = 2
					//s2.styleExtremites = '-|'
					objets.push(s2)
				}
			}
			else {
				// T supérieurs
				s1 = segment(point(i * 3, 10), point(i * 3, 9))
				s1.epaisseur = 2
				// s1.styleExtremites = '-|'
				objets.push(s1)

				// T inférieurs
				if (i > 0) {
					s2 = segment(point(i * 3, 1), point(i * 3, 2))
					s2.epaisseur = 2
					// s2.styleExtremites = '-|'
					objets.push(s2)
				}
			}
		}
		if (choix == 0) // éléments uniques symétriques
		{
			//bord gauche
			s1 = segment(point(0, 10), point(0, 3))
			s1.epaisseur = 3
			//s1.styleExtremites = '-|'
			objets.push(s1)
			// case départ
			s1 = segment(point(-3, 1), point(0, 1), 'green')
			s1.epaisseur = 3
			objets.push(s1)
			s1 = segment(point(-3, 1), point(-3, 4), 'green')
			s1.epaisseur = 3
			objets.push(s1)
			s1 = segment(point(-3, 4), point(0, 4), 'green')
			s1.epaisseur = 3
			objets.push(s1)
			objets.push(texteParPoint(`Départ`, point(-1.5, 2.5), 'milieu', 'blue', 1.5, 0, false))
		}
		else {
			// bord gauche
			s1 = segment(point(0, 1), point(0, 8))
			s1.epaisseur = 3
			//s1.styleExtremites = '-|'
			objets.push(s1)
			// case départ
			s1 = segment(point(-3, 10), point(0, 10), 'green')
			s1.epaisseur = 3
			objets.push(s1)
			s1 = segment(point(-3, 7), point(-3, 10), 'green')
			s1.epaisseur = 3
			objets.push(s1)
			s1 = segment(point(-3, 7), point(0, 7), 'green')
			s1.epaisseur = 3
			objets.push(s1)
			objets.push(texteParPoint(`Départ`, point(-1.5, 8.5), 'milieu', 'blue', 1.5, 0, false))
		}

		// les croix centrales communes à A et B
		for (let i = 1; i < 6; i++) {
			s1 = segment(point(i * 3, 8), point(i * 3, 6), 'black')
			s1.epaisseur = 2
			// s1.styleExtremites = '|-|'
			s2 = segment(point(i * 3 - 0.5, 7), point(i * 3 + 0.5, 7), 'black')
			s2.epaisseur = 2
			// s2.styleExtremites = '|-|'
			s3 = segment(point(i * 3, 5), point(i * 3, 3), 'black')
			s3.epaisseur = 2
			// s3.styleExtremites = '|-|'
			s4 = segment(point(i * 3 - 0.5, 4), point(i * 3 + 0.5, 4), 'black')
			s4.epaisseur = 2
			// s4.styleExtremites = '|-|'
			objets.push(s2, s3, s4, s1)
		}
		// le pourtour commun à A et B
		s1 = segment(point(18, 9), point(18, 10))
		s1.epaisseur = 3
		objets.push(s1)
		s1 = segment(point(0, 10), point(18, 10))
		s1.epaisseur = 3
		objets.push(s1)
		s1 = segment(point(18, 9), point(18, 10))
		s1.epaisseur = 3
		objets.push(s1)
		s1 = segment(point(18, 1), point(18, 2))
		s1.epaisseur = 3
		objets.push(s1)
		s1 = segment(point(0, 1), point(18, 1))
		s1.epaisseur = 3
		objets.push(s1)
		// les sorties communes à A et B
		for (let i = 0; i < 2; i++) {
			s1 = segment(point(18, 6 - i * 3), point(20, 6 - i * 3))
			s1.epaisseur = 3
			// s1.styleExtremites = '-|'
			s2 = segment(point(18, 7 - i * 3), point(17, 7 - i * 3))
			s2.epaisseur = 3
			// s2.styleExtremites = '-|'
			s3 = segment(point(18, 8 - i * 3), point(20, 8 - i * 3))
			s3.epaisseur = 3
			// s3.styleExtremites = '-|'
			s4 = segment(point(18, 8 - i * 3), point(18, 6 - i * 3))
			s4.epaisseur = 3
			s5 = segment(point(0, 7 - i * 3), point(1, 7 - i * 3))
			s5.epaisseur = 3
			//s5.styleExtremites = '-|'
			objets.push(s1, s2, s3, s4, s5)
		}
		for (let i = 1; i <= 3; i++) {
			objets.push(texteParPoint(`Sortie ${i}`, point(19.5, 11.5 - 3 * i), 'milieu', 'blue', 1.5, 0, false))
		}
		s1 = segment(point(18, 9), point(20, 9))
		s1.epaisseur = 3
		//s1.styleExtremites = '-|'
		s2 = segment(point(18, 2), point(20, 2))
		s2.epaisseur = 3
		//s2.styleExtremites = '-|'
		objets.push(s1, s2)
		return objets
	}

	// Retourne le tableau d'objets du chemin
	this.traceChemin = function (monchemin) {
		let y = monchemin[0][1]
    let x = 0, chemin2d = [],s1	
    for (let j = 0; j < monchemin.length; j++) {
			s1 = segment(point(x * 3 - 1.5, y * 3 + 2.5), point(monchemin[j][0] * 3 - 1.5, monchemin[j][1] * 3 + 2.5), couleur)
			s1.pointilles = true
			s1.stylePointilles = 2
			s1.epaisseur = 5
			s1.opacite = 0.3
			chemin2d.push(s1)
			x = monchemin[j][0]
			y = monchemin[j][1]
		}
		s1 = segment(point(x * 3 - 1.5, y * 3 + 2.5), point(x * 3 + 1.5, y * 3 + 2.5), couleur)
		s1.pointilles = true
		s1.stylePointilles = 2
		s1.epaisseur = 5
		s1.opacite = 0.3
		chemin2d.push(s1)
		return chemin2d
	}
	// Retourne le tableau d'objets des nombres 
	this.placeNombres = function (nombres,taille) {
		let objets=[]
		for (let a = 1; a < 7; a++) {
			for (let b = 0; b < 3; b++) {
				if (typeof(nombres[a-1][b])=='number') {
				objets.push(texteParPoint(nombre_avec_espace(nombres[a - 1][b]), point(-1.5 + a * 3, 2.5 + b * 3), 'milieu', 'black', taille, 0, true))
				}
				else if (typeof(nombres[a-1][b])=='string') { // écriture mode Maths
					objets.push(texteParPosition(nombres[a - 1][b],-1.5 + a * 3,2.5 + b * 3,'milieu','black',taille,0,true))
				}
				else {
					objets.push(fractionParPosition({x:-1.5 + a * 3,y: 2.5 + b * 3,fraction:nombres[a - 1][b]}))
				}
			}

		}
		return objets
	}
}  // fin de la classe labyrinthe
export function labyrinthe() {
	return new Labyrinthe()
}

/**
 * Classe Pavage : permet de créer des pavages de polygones en un tour de main et de manipuler les polygones qu'il contient
 * @Auteur Jean-Claude Lhote
 * publié le 10/12/2020
 */
	function Pavage() {
	this.type = 1
	this.polygones = []
	this.barycentres = []
	this.tracesCentres = []
	this.numeros = []
	this.coordonnees = []
	this.Nx = 1
	this.Ny = 1
	this.echelle=20
	this.fenetre={}
	this.nb_polygones

	this.construit = function (type = 1, Nx = 1, Ny = 1, taille = 3) {
		let nettoie_objets = function (objets) {
			let barywhite, baryblack // c'est drôle non ?
			for (let i = 0; i < objets.length; i++) {
			  barywhite = barycentre(objets[i])
			  for (let j = i + 1; j < objets.length;) {
				baryblack = barycentre(objets[j])
				if (egal(barywhite.x, baryblack.x, 0.1) && egal(barywhite.y, baryblack.y, 0.1)) {
				  objets.splice(j, 1)
				}
				else j++
			  }
			}
		  }
    let A, B, v, w, C, D, XMIN = 0, YMIN = 0, XMAX = 0, YMAX = 0, P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12
    A = point(0, 0)
		B = point(taille, 0)
		switch (type) {
			case 1: // triangles équilatéraux
				v = vecteur(A, B)
				w = rotation(v, A, -90)
				w = homothetie(w, A, 1.73205)
				for (let k = 0; k < Ny; k++) {
					for (let j = 0; j < Nx; j++) {
						P1 = polygoneRegulier(A, B, 3)
						P2 = rotation(P1, A, 60)
						P3 = rotation(P1, A, -60)
						P4 = rotation(P1, A, -120)
						this.polygones.push(P1, P2, P3, P4)
						for (let p of P1.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P2.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P3.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P4.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						A = translation(A, v)
						B = translation(B, v)
					}
					A = translation(A, vecteur(-Nx * v.x, -2 * v.y))
					B = translation(B, vecteur(-Nx * v.x, -2 * v.y))
					A = translation(A, w)
					B = translation(B, w)
				}
				break

			case 2: //carrés
				v = vecteur(A, B)
				v = homothetie(v, A, 2)
				w = rotation(v, A, -90)
				for (let k = 0; k < Ny; k++) {
					for (let j = 0; j < Nx; j++) {
						P1 = polygoneRegulier(A, B, 4)
						P2 = rotation(P1, A, 90)
						P3 = rotation(P1, A, -90)
						P4 = rotation(P1, A, -180)
						this.polygones.push(P1, P2, P3, P4)

						for (let p of P1.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P2.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P3.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P4.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						A = translation(A, v)
						B = translation(B, v)
					}
					A = translation(A, vecteur(-Nx * v.x, -2 * v.y))
					B = translation(B, vecteur(-Nx * v.x, -2 * v.y))
					A = translation(A, w)
					B = translation(B, w)
				}
				break

			case 3: //hexagones
				B=homothetie(B,A,0.8)
				v = vecteur(A, B)
				v = homothetie(v, A, 2)
				w = rotation(v, A, -90)
				w = homothetie(w, A, 1.73205)
				for (let k = 0; k < Ny; k++) {
					for (let j = 0; j < Nx; j++) {
						C = similitude(B, A, 30, 1.1547)
						P1 = polygoneRegulier(A, C, 6)
						P2 = rotation(P1, A, -120)
						P3 = translation(P1, v)
						P4 = translation(P2, v)
						this.polygones.push(P1, P2, P3, P4)

						for (let p of P1.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P2.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P3.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P4.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						A = translation(A, vecteur(2 * v.x, 0))
						B = translation(B, vecteur(2 * v.x, 0))
					}
					A = translation(A, vecteur(-Nx * 2 * v.x, w.y))
					B = translation(B, vecteur(-Nx * 2 * v.x, w.y))
				}
				break

			case 4: // Pavage 3².4.3.4
				v = vecteur(A, B)
				v = homothetie(v, A, 2.73205)
				w = rotation(v, A, -90)
				for (let k = 0; k < Ny; k++) {
					for (let j = 0; j < Nx; j++) {

						C = rotation(B, A, 60)
						P1 = polygoneRegulier(A, B, 3)
						P2 = rotation(P1, A, 150)
						P6 = rotation(P1, B, -150)
						P7 = rotation(P1, B, 60)
						P9 = rotation(P2, C, 150)
						P10 = rotation(P9, A, -60)
						P11 = rotation(P2, B, 60)
						P12 = rotation(P6, A, -60)
						P3 = polygoneRegulier(A, C, 4)
						P4 = polygoneRegulierIndirect(B, C, 4)
						P5 = rotation(P4, B, -150)
						P8 = rotation(P3, A, 150)

						this.polygones.push(P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12)

						for (let p of P1.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P2.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P11.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}

						for (let p of P12.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P3.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P4.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P5.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P6.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P7.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P8.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P9.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P10.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						A = translation(A, vecteur(v.x, 0))
						B = translation(B, vecteur(v.x, 0))
					}
					A = translation(A, vecteur(-Nx * v.x, w.y))
					B = translation(B, vecteur(-Nx * v.x, w.y))
				}
				break
			case 5: // 4.8²
				v = vecteur(A, B)
				v = homothetie(v, A, 2.4142)
				w = rotation(v, A, -90)

				for (let k = 0; k < Ny; k++) {
					for (let j = 0; j < Nx; j++) {
						C = rotation(A, B, -135)
						P1 = polygoneRegulier(A, B, 8)
						P2 = polygoneRegulierIndirect(A, B, 8)
						P3 = translation(P1, v)
						P4 = translation(P2, v)
						P5 = polygoneRegulierIndirect(B, C, 4)
						P6 = translation(P5, v)
						P7 = translation(P5, w)
						P8 = translation(P6, w)
						this.polygones.push(P1, P2, P3, P4, P5, P6, P7, P8)

						for (let p of P1.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P2.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P3.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P4.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P5.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P6.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P7.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P8.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}

						A = translation(A, vecteur(2 * v.x, 0))
						B = translation(B, vecteur(2 * v.x, 0))
					}
					A = translation(A, vecteur(-Nx * 2 * v.x, 2 * w.y))
					B = translation(B, vecteur(-Nx * 2 * v.x, 2 * w.y))
				}
				break

			case 6: // Pavage hexagonal d'écolier
				v = vecteur(A, B)
				w = rotation(v, A, 60)
				v = vecteur(v.x + w.x, v.y + w.y) // v=AB+CB
				w = rotation(v, A, -60)

				for (let k = 0; k < Ny; k++) {
					for (let j = 0; j < Nx; j++) {
						C = rotation(A, B, 120)
						D = rotation(B, C, 60)
						P1 = polygone(A, B, C, D)
						P2 = rotation(P1, C, -60)
						P3 = rotation(P1, A, 60)
						P4 = translation(P2, v)
						P5 = translation(P1, v)
						P6 = translation(P3, v)
						P7 = translation(P1, w)
						P8 = translation(P2, w)
						P9 = translation(P3, w)
						this.polygones.push(P1, P2, P3, P4, P5, P6, P7, P8, P9)

						for (let p of P1.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P2.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P3.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P4.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P5.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P6.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P7.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P8.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P9.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						A = translation(A, vecteur(w.x + v.x, w.y + v.y))
						B = translation(B, vecteur(w.x + v.x, w.y + v.y))
					}
					A = translation(A, vecteur(-Nx * (w.x + v.x) + 2 * w.x - v.x, 2 * w.y - v.y))
					B = translation(B, vecteur(-Nx * (w.x + v.x) + 2 * w.x - v.x, 2 * w.y - v.y))
				}
				break
			case 7 :
				v = vecteur(A, B)
				v=homothetie(v,A,2)
				w = rotation(v, A, -60)

				for (let k = 0; k < Ny; k++) {
					for (let j = 0; j < Nx; j++) {
						C = rotation(A, B,-120)
						D = rotation(B, C, -120)
						P1 = polygoneRegulier(A, B,6)
						P2 = polygoneRegulier(C,B,3)
						P3 = rotation(P2, C, 180)
						P4 = translation(P3,w)
						P5 = translation(P2, w)
						P6 = rotation(P1,B,180)
						this.polygones.push(P1, P2, P3, P6, P5,P4)

						for (let p of P1.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P2.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P3.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P4.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P5.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						for (let p of P6.listePoints) {
							XMIN = Math.min(XMIN, p.x)
							XMAX = Math.max(XMAX, p.x)
							YMIN = Math.min(YMIN, p.y)
							YMAX = Math.max(YMAX, p.y)
						}
						A = translation(A, v)
						B = translation(B, v)
					}
					A = translation(A, vecteur(-Nx * v.x+2*w.x - v.x,2*w.y - v.y))
					B = translation(B, vecteur(-Nx * v.x+2*w.x - v.x,2*w.y - v.y))
				}
			break
		}
		this.echelle = arrondi(80 / Math.sqrt( XMAX - XMIN),0)
		this.fenetre = { xmin: XMIN-0.5, ymin: YMIN-0.5, xmax: XMAX+0.5, ymax: YMAX+0.5, pixelsParCm: this.echelle, scale: arrondi(this.echelle / 30,2) }
		nettoie_objets(this.polygones) // On supprime les doublons éventuels (grâce à leur barycentre)
		// On ajoute les N°
		this.nb_polygones = this.polygones.length // Le nombre de polygones du pavage qui sert dans les boucles

		for (let i = 0; i < this.nb_polygones; i++) {
			this.barycentres.push(barycentre(this.polygones[i]))
			this.tracesCentres.push(tracePoint(this.barycentres[i]))
			this.tracesCentres[i].opacite = 0.5
			this.tracesCentres[i].color = 'blue'
			this.tracesCentres[i].taille = 2
			this.coordonnees.push([arrondi(this.barycentres[i].x, 2), arrondi(this.barycentres[i].y, 2)])
			this.numeros.push(texteParPosition(nombre_avec_espace(i + 1), this.barycentres[i].x + 0.5, this.barycentres[i].y, 'milieu', 'black', 50/this.echelle, 0, true))
		}
	}
}
export function pavage() {
	return new Pavage()
}