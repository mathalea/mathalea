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

let mesObjets = []; // Liste de tous les objets construits
//Liste utilisée quand il n'y a qu'une seule construction sur la page web

let pixelsParCm = 20;
let unitesLutinParCm = 50;
let mainlevee=false
let amplitude=1
let fenetreMathalea2d = [-1,-10,29,10]
let scale=1

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
  mesObjets.push(this);
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
  ObjetMathalea2D.call(this);
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
function point(...args) {
  return new Point(...args);
}

/**
 * tracePoint(A) // Place une croix à l'emplacement du point A
 * tracePoint(A,B,C,D) // Place une croix pour les différents points
 * tracePoint(A,B,C,D,'blue') // Place une croix pour les différents points
 * @Auteur Rémi Angot
 */
function TracePoint(...points) {
  ObjetMathalea2D.call(this);
  this.taille = 4/pixelsParCm; // maintenant 0.2/pixelsParCm*20 en SVG donc taille de point constante. Pour Latex, la taille du point ne change pas avec scale.
  if (typeof points[points.length - 1] === "string") {
    this.color = points[points.length - 1];
  }
  this.svg = function (coeff) {
    let code = "";
    for (let A of points) {
      if (A.constructor == Point) {
        code += `<line x1="${calcul((A.x - this.taille) * coeff)}" y1="${calcul(
          (-A.y - this.taille) * coeff
        )}" x2="${calcul((A.x + this.taille) * coeff)}" y2="${calcul(
          (-A.y + this.taille) * coeff
        )}" stroke="${this.color}" />`;
        code += `\n\t<line x1="${calcul(
          (A.x - this.taille) * coeff
        )}" y1="${calcul((-A.y + this.taille) * coeff)}" x2="${calcul(
          (A.x + this.taille) * coeff
        )}" y2="${calcul((-A.y - this.taille) * coeff)}" stroke="${
          this.color
        }" />`;
      }
    }
    return code;
  };
  this.tikz = function () {
    let code = "";
    for (let A of points) {
      if (A.constructor == Point) {
        if (this.color == "black") {
          code += `\n\\node[point] at (${A.x},${A.y}) {};`;
        } else {
          code += `\n\\node[point,${color}] at (${A.x},${A.y}) {};`;
        }
      }
    }
    return code;
  };
}
function tracePoint(...args) {
  return new TracePoint(...args);
}

/**
 * P=tracePointSurDroite(A,d) //Ajoute un trait perpendiculaire à d supposée tracée marquant la posiion du point A
 * P=tracePointSurDroite(A,B) //Ajoute un trait perpendiculaire à la droite (AB) supposée tracée marquant la posiion du point A
 * 
 * @Auteur Rémi Angot & Jean-Claude Lhote
 */
function tracePointSurDroite(A, O) {
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
    let A1=pointSurSegment(this.lieu,this.direction,this.taille*20/coeff)
    let A2=pointSurSegment(this.lieu,this.direction,-this.taille*20/coeff)
    let s=segment(A1,A2)
    return s.svg(coeff)
  }
  this.tikz=function(){
    let A1=pointSurSegment(this.lieu,this.direction,this.taille/scale)
    let A2=pointSurSegment(this.lieu,this.direction,-this.taille/scale)
    let s=segment(A1,A2)
    return s.tikz(coeff)
  }
 /* this.svgml=function(coeff,amp){

  }
  this.tikzml=function(amp){

  }
  */
}

/**
 * M = milieu(A,B) //M est le milieu de [AB]
 * M = milieu(A,B,'M') //M est le milieu [AB] et se nomme M
 * M = milieu(A,B,'M','below') //M est le milieu [AB], se nomme M et le nom est en dessous du point
 *
 * @Auteur Rémi Angot
 */
function milieu(A, B, nom, positionLabel = "above") {
  ObjetMathalea2D.call(this);
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
function pointSurSegment(A, B, l, nom, positionLabel = "above") {
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
function pointSurCercle(c, angle, nom, positionLabel = "above") {
  if (typeof angle != "number") angle = randint(-180, 180);
  let x = c.centre.x + c.rayon * Math.cos(Math.radians(angle));
  let y = c.centre.y + c.rayon * Math.sin(Math.radians(angle));
  return point(x, y, nom, positionLabel);
}
/**
 * P=pointSurDroite(d,x) retourne un point sur la droite d dont l'abscisse est x. Si c'est impossible (droite verticale) alors ce sera le point dont l'ordonnée vaut x.
 * @Auteur Jean-Claude Lhote
 */
function pointSurDroite(d, x, nom, positionLabel = "above") {
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
function pointIntersectionDD(d, f, nom = "", positionLabel = "above") {
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
function pointAdistance(...args) {
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
    let code = "";
    if (Array.isArray(points[0])) {
      //Si le premier argument est un tableau
      this.listePoints = points[0];
    } else {
      this.listePoints = points;
    }
    for (let point of this.listePoints) {
      switch (point.positionLabel) {
        case "left":
          code += `\t<text x="${calcul(
            point.xSVG(coeff) - 15
          )}" y="${point.ySVG(
            coeff
          )}" text-anchor="middle" dominant-baseline="central" fill="${
            this.color
          }">${point.nom}</text>\n `;
          break;
        case "right":
          code += `\t<text x="${calcul(
            point.xSVG(coeff) + 15
          )}" y="${point.ySVG(
            coeff
          )}" text-anchor="middle" dominant-baseline="central" fill="${
            this.color
          }">${point.nom}</text>\n `;
          break;
        case "below":
          code += `\t<text x="${point.xSVG(coeff)}" y="${calcul(
            point.ySVG(coeff) + 15
          )}" text-anchor="middle" dominant-baseline="central" fill="${
            this.color
          }">${point.nom}</text>\n `;
          break;
        case "above":
          code += `\t<text x="${point.xSVG(coeff)}" y="${calcul(
            point.ySVG(coeff) - 15
          )}" text-anchor="middle" dominant-baseline="central" fill="${
            this.color
          }">${point.nom}</text>\n `;
          break;
        case "above right":
          code += `\t<text x="${calcul(point.xSVG(coeff) + 15)}" y="${calcul(
            point.ySVG(coeff) - 15
          )}" text-anchor="middle" dominant-baseline="central" fill="${
            this.color
          }">${point.nom}</text>\n `;
          break;
        case "below left":
          code += `\t<text x="${calcul(point.xSVG(coeff) - 15)}" y="${calcul(
            point.ySVG(coeff) + 15
          )}" text-anchor="middle" dominant-baseline="central" fill="${
            this.color
          }">${point.nom}</text>\n `;
          break;
        case "below right":
          code += `\t<text x="${calcul(point.xSVG(coeff) + 15)}" y="${calcul(
            point.ySVG(coeff) + 15
          )}" text-anchor="middle" dominant-baseline="central" fill="${
            this.color
          }">${point.nom}</text>\n `;
          break;
        default:
          code += `\t<text x="${calcul(point.xSVG(coeff) - 15)}" y="${calcul(
            point.ySVG(coeff) - 15
          )}" text-anchor="middle" dominant-baseline="central" fill="${
            this.color
          }">${point.nom}</text>\n `;
          break;
      }
    }
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
function labelPoint(...args) {
  return new LabelPoint(...args);
}
/**
 * P = barycentre(p,'P','below') Crée le point P barycentre du polygone p, son nom 'P' sera placé sous le point si il est tracé et labelisé.
 * @param {Polygone} p
 * @Auteur Jean-Claude Lhote
 */
function barycentre(p, nom, positionLabel = "above") {
  ObjetMathalea2D.call(this);
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
function Droite(arg1, arg2, arg3, arg4, color) {
  ObjetMathalea2D.call(this);
  if (arguments.length == 2) {
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
      this.a = arg1;
      this.b = arg2;
      this.c = arg3;
      this.color = color;
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
      this.name = arg3;
      this.color = color;
    }
  } else if (arguments.length == 4) {
    if (typeof arg1 == "number") {
      this.a = arg1;
      this.b = arg2;
      this.c = arg3;
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
      this.nom = nom;
      this.color = color;
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
  this.svg = function (coeff) {
    if (this.epaisseur != 1) {
      this.style += ` stroke-width="${this.epaisseur}" `;
    }
    if (this.pointilles) {
      this.style += ` stroke-dasharray="4 3" `;
    }
    if (this.opacite != 1) {
      this.style += ` stroke-opacity="${this.opacite}" `;
    }
    let A = point(this.x1, this.y1);
    let B = point(this.x2, this.y2);
    let A1 = pointSurSegment(A, B, -50);
    let B1 = pointSurSegment(B, A, -50);
    return `<line x1="${A1.xSVG(coeff)}" y1="${A1.ySVG(coeff)}" x2="${B1.xSVG(
      coeff
    )}" y2="${B1.ySVG(coeff)}" stroke="${this.color}" ${this.style} />`;
  };
  this.tikz = function () {
    let tableauOptions = [];
    if (this.color.length > 1 && this.color !== "black") {
      tableauOptions.push(this.color);
    }
    if (this.epaisseur != 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`);
    }
    if (this.pointilles) {
      tableauOptions.push(`dashed`);
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
    let A1 = pointSurSegment(A, B, -10);
    let B1 = pointSurSegment(B, A, -10);
    return `\\draw${optionsDraw} (${A1.x},${A1.y})--(${B1.x},${B1.y});`;
  };
  this.svgml = function(coeff,amp){
    let A = point(this.x1, this.y1);
    let B = point(this.x2, this.y2);
    let A1 = pointSurSegment(A, B, -50);
    let B1 = pointSurSegment(B, A, -50);
    let s=segment(A1,B1,this.color)
    s.isVisible=false
  return s.svgml(coeff,amp)
  }
  this.tikzml = function(amp){
    let A = point(this.x1, this.y1);
    let B = point(this.x2, this.y2);
    let A1 = pointSurSegment(A, B, -50);
    let B1 = pointSurSegment(B, A, -50);
    let s=segment(A1,B1,this.color)
    s.isVisible=false
  return s.tikzml(amp)
  }
}
function droite(...args) {
  return new Droite(...args);
}

/**
 * d = droiteParPointEtVecteur(A,v,'d1',red') //Droite passant par A, de vecteur directeur v et de couleur rouge
 * @Auteur Jean-Claude Lhote
 */
function droiteParPointEtVecteur(A, v, nom = "", color = "black") {
  let B = point(calcul(A.x + v.x), calcul(A.y + v.y));
  return droite(A, B, nom, color);
}
/**
 * d = droiteParPointEtParallele(A,d,'d1',red') // Trace en rouge la parallèle à la droite (d) passant par A
 * @Auteur Jean-Claude Lhote
 */
function droiteParPointEtParallele(A, d, nom = "", color = "black") {
  return droiteParPointEtVecteur(A, d.directeur, nom, color);
}
/**
 * d = droiteParPointEtPerpendiculaire(A,d,'d1',red') // Trace en rouge la perpendiculaire à la droite (d) passant par A
 * @Auteur Jean-Claude Lhote
 */
function droiteParPointEtPerpendiculaire(A, d, nom = "", color = "black") {
  return droiteParPointEtVecteur(A, d.normal, nom, color);
}
/**
 * d = droiteHorizontaleParPoint(A,'d1',red') // Trace en rouge la droite horizontale passant par A
 * @Auteur Jean-Claude Lhote
 */
function droiteHorizontaleParPoint(A, nom = "", color = "black") {
  return droiteParPointEtPente(A, 0, nom, color);
}
/**
 * d = droiteVerticaleParPoint(A,'d1',red') // Trace en rouge la droite verticale passant par A
 * @Auteur Jean-Claude Lhote
 */
function droiteVerticaleParPoint(A, nom = "", color) {
  return droiteParPointEtVecteur(A, vecteur(0, 1), nom, color);
}

/**
 * d = droiteParPointEtPente(A,p,'d1',red') //Droite passant par A, de pente p et de couleur rouge
 *@Auteur Jean-Claude Lhote
 */
function droiteParPointEtPente(A, k, nom = "", color = "black") {
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
function mediatrice(A, B, nom = "", color = "black") {
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
  this.svg = function (coeff) {
    return c.svg(coeff) + "\n" + v.svg(coeff);
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

function codageMediatrice(...args) {
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
  let M = tracePointSurDroite(O,droite(A,B))
  let v = codeSegments(mark,color,A,O,O,B);
  this.svg =function(coeff) {
    if (mil) return M.svg(coeff) + "\n" +v.svg(coeff);
    else return v.svg(coeff);
  }
  this.tikz = function() {
    if (mil) return M.tikz()+ "\n" + v.tikz();
    else return  v.tikz();
  }
}
 function codageMilieu(...args) {
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
  d.color = couleurMediatrice;
  d.epaisseur = epaisseurMediatrice;
  let codage = codageMediatrice(A, B, color, markmilieu);
  let objets = [arcm1, arcm2, arcn1, arcn2, d];
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
    code = "";
    for (objet of objets) {
      code += "\n\t" + objet.svg(coeff);
    }
    return code;
  };
  this.tikz = function () {
    code = "";
    for (objet of objets) {
      code += "\n\t" + objet.tikz();
    }
    return code;
  };
  this.svgml =function(coeff,amp) {
    code = "";
    for (objet of objets) {
     if (typeof(objet.svgml)=='undefined') code += "\n\t" + objet.svg(coeff);
     else code += "\n\t" + objet.svgml(coeff,amp);
    }
    return code;
  }
  this.tikzml = function (amp) {
    code = "";
    for (objet of objets) {
      if (typeof(objet.tikzml)=='undefined') code += "\n\t" + objet.tikz();
      else code += "\n\t" + objet.tikzml(amp);
    }
    return code;
  };

}

function constructionMediatrice(...args) {
  return new ConstructionMediatrice(...args);
}
/**
 * d = bissectrice(A,O,B) // Bissectrice de l'angle AOB
 * d = bissectrice(A,O,B,'blue') // Bissectrice de l'angle AOB en bleu
 *
 * @Auteur Rémi Angot
 */
function bissectrice(A, O, B, color = "black") {
  ObjetMathalea2D.call(this);
  this.color = color;
  let demiangle = calcul(angleOriente(A, O, B) / 2);
  let m = pointSurSegment(O, A, 3);
  let M = rotation(m, O, demiangle);
  return demiDroite(O, M, this.color);
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
    let a1=codeAngle(pointSurSegment(this.centre,this.depart,1.5/scale), O, this.demiangle,1.5/scale,this.mark, this.color,2,1);
    let a2=codeAngle(pointSurSegment(this.centre,this.lieu,1.5/scale), O, this.demiangle,1.5/scale,this.mark, this.color,2,1);    
    return a1.tikz() + "\n" + a2.tikz() + "\n";
  };
}

function codageBissectrice(...args) {
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
  ObjetMathalea2D.call(this);
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
    code = "";
    for (objet of objets) {
      code += "\n\t" + objet.svg(coeff);
    }
    return code;
  };
  this.tikz = function () {
    code = "";
    for (objet of objets) {
      code += "\n\t" + objet.tikz();
    }
    return code;
  };
}

function constructionBissectrice(...args) {
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
    if (this.pointilles) {
      this.style += ` stroke-dasharray="4 3" `;
    }
    if (this.opacite != 1) {
      this.style += ` stroke-opacity="${this.opacite}" `;
    }
    let binomeXY = "";
    for (let point of this.listePoints) {
      binomeXY += `${calcul(point.x * coeff)},${calcul(-point.y * coeff)} `;
    }
    return `<polyline points="${binomeXY}" fill="none" stroke="${this.color}" ${this.style} />`;
  };
  this.tikz = function () {
    let tableauOptions = [];
    if (this.color.length > 1 && this.color !== "black") {
      tableauOptions.push(this.color);
    }
    if (this.epaisseur != 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`);
    }
    if (this.pointilles) {
      tableauOptions.push(`dashed`);
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
function polyline(...args) {
  return new Polyline(...args);
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
  };
}
function vecteur(...args) {
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
    this.x1 = arg1;
    this.y1 = arg2;
    this.x2 = arg3;
    this.y2 = arg4;
  } else {
    // 5 arguments
    this.x1 = arg1;
    this.y1 = arg2;
    this.x2 = arg3;
    this.y2 = arg4;
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
    if (this.epaisseur != 1) {
      this.style += ` stroke-width="${this.epaisseur}" `;
    }
    if (this.pointilles) {
      this.style += ` stroke-dasharray="4 3" `;
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
        let M = pointSurSegment(B, A, 4/pixelsParCm);
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
        let M = pointSurSegment(B, A, 4/pixelsParCm);
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
      if (this.styleExtremites.substr(-1) == "<") {
        //si ça termine par < on rajoute une flèche inversée en B
        let M = pointSurSegment(B, A, -4/pixelsParCm);
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
        let M = pointSurSegment(A, B, 4/pixelsParCm);
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
        let M = pointSurSegment(A, B, -4/pixelsParCm);
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
        let N = pointSurSegment(A, B, 4/pixelsParCm);
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
    if (this.pointilles) {
      tableauOptions.push(`dashed`);
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
    if (this.epaisseur != 1) {
      this.style += ` stroke-width="${this.epaisseur}" `;
    }
    if (this.opacite != 1) {
      this.style += ` stroke-opacity="${this.opacite}" `;
    }
 
    let A = point(this.x1, this.y1);
    let B = point(this.x2, this.y2);
    let l=longueur(A,B)
    let dx=(B.xSVG(coeff)-A.xSVG(coeff))/(10),dy=(B.ySVG(coeff)-A.ySVG(coeff))/(10)
    let code =`<path d="M ${arrondi(A.xSVG(coeff),0)},${arrondi(A.ySVG(coeff),0)} C `
    for (let k=0;k<=10;k++) {
      code +=`${arrondi(A.xSVG(coeff)+k*dx+randint(-1,1)*amp,0)},${arrondi(A.ySVG(coeff)+k*dy+randint(-1,1)*amp,0)} `
    }
    code +=` ${arrondi(B.xSVG(coeff),0)},${arrondi(B.ySVG(coeff),0)} " stroke="${this.color}" ${this.style}"/>`
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
function segment(...args) {
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
function segmentAvecExtremites(...args) {
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
function demiDroite(A, B, color = "black") {
  let B1 = pointSurSegment(B, A, -10);
  return segment(A, B1, color);
}

/**
 * s = DemiDroiteAvecExtremite(A,B) //Demi-droite d'origine A passant par B avec l'origine marquée
 * s = DemiDroiteAvecExtremite(A,B,'blue') //Demi-droite d'origine A passant par B et de couleur bleue avec l'origine marquée
 *
 * @Auteur Rémi Angot
 */
function demiDroiteAvecExtremite(A, B, color = "black") {
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
    if (this.pointilles) {
      this.style += ` stroke-dasharray="4 3" `;
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

    return `<polygon points="${this.binomesXY(coeff)}" stroke="${this.color}" ${
      this.style
    } />`;
  };
  this.tikz = function () {
    let tableauOptions = [];
    if (this.color.length > 1 && this.color !== 'black') {
      tableauOptions.push(this.color);
    }
    if (this.epaisseur != 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`);
    }
    if (this.pointilles) {
      tableauOptions.push(`dashed`);
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
    let A=this.listePoints[0]
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
function polygone(...args) {
  return new Polygone(...args);
}

function polygoneAvecNom(...args) {
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
function polygoneRegulier(A, B, n, color = "black") {
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
 * polygoneRegulierIndirect(A,B,n) //Trace le polygone régulier indirect à n côtés qui a pour côté [AB]
 *
 * @Auteur Rémi Angot
 */
function polygoneRegulierIndirect(A, B, n, color = "black") {
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
 * carre(A,B) //Trace le carré direct qui a pour côté [AB] et code les 4 angles droits et 4 côtés de même longueur
 * carre(A,B,'blue') //Trace en bleu le carré direct qui a pour côté [AB] et code les 4 angles droits et 4 côtés de même longueur
 * @Auteur Rémi Angot
 */
function carre(A, B, color) {
  return polygoneRegulier(B, A, 4, color);
}

/**
 * carreIndirect(A,B) //Trace le carré indirect qui a pour côté [AB]
 */
function carreIndirect(A, B, color) {
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
    code = "";
    for (objet of objets) {
      code += "\n\t" + objet.svg(coeff);
    }
    return code;
  };
  this.tikz = function () {
    code = "";
    for (objet of objets) {
      code += "\n\t" + objet.tikz();
    }
    return code;
  };
}

function codageCarre(...args) {
  return new CodageCarre(...args);
}

/**
 * polygoneRegulierParCentreEtRayon(O,r,n) //Trace le polygone régulier à n côtés et de rayon r
 *
 * @Auteur Rémi Angot
 */
function polygoneRegulierParCentreEtRayon(O, r, n, color = "black") {
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
function triangle2points2longueurs(A, B, l1, l2, n = 1) {
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
function triangle2points2angles(A, B, a1, a2, n = 1) {
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
function triangle2points1angle1longueur(A, B, a, l, n = 1) {
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
function triangle2points1angle1longueurOppose(A, B, a, l, n = 1) {
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
  for (let i = 0, point; i < p.listePoints.length; i++) {
    if (nom != "") p.listePoints[i].nom = nom[i];
  }
  this.svg = function (coeff) {
    let code = "";
    let P,p=this.poly,d=this.dist
    let G = barycentre(p);
    for (let i = 0, point; i < p.listePoints.length; i++) {
      P=pointSurSegment(G,p.listePoints[i],longueur(G,p.listePoints[i])+d*20/coeff)
      code += "\n\t" + texteParPoint(p.listePoints[i].nom, P, "milieu").svg(coeff)
    }
    return code;
  };
  this.tikz = function () {
    let code = "";
    let P,p=this.poly,d=this.dist
    let G = barycentre(p);
    for (let i = 0, point; i < p.listePoints.length; i++) {
      P=pointSurSegment(G,p.listePoints[i],longueur(G,p.listePoints[i])+d/scale)
      code += "\n\t" + texteParPoint(p.listePoints[i].nom, P, "milieu").tikz()
    }
    return code;
  }
}

function nommePolygone(...args) {
  return new NommePolygone(...args);
}

/**
 * deplaceLabel(p1,'AB','below') // Si il y a un point nommé 'A' ou 'B' dans le polygone son nom sera mis en dessous du point
 * @Auteur Rémi Angot
 */
function deplaceLabel(p, nom, positionLabel) {
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
function aireTriangle(p) {
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
    if (this.pointilles) {
      this.style += ` stroke-dasharray="4 3" `;
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
    }" stroke="${this.color}" ${this.style}/>`;
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
    if (this.pointilles) {
      tableauOptions.push(`dashed`);
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
function cercle(...args) {
  return new Cercle(...args);
}

/**
 * I = pointItersectionLC(d,c,'I',1) // I est le premier point d'intersection si il existe de la droite (d) et du cercle (c)
 * @param {Droite} d la droite qui intecepte (ou pas le cercle)
 * @param {Cercle} C le cercle
 * @param {string} nom le nom du point d'intersection
 * @param {entier} n 1 pour le premier point, 2 sinon. Si il n'y a qu'un seul point d'intesection, l'un ou l'autre renvoie ce point.
 * @Auteur Jean-Claude Lhote
 */
function pointIntersectionLC(d, C, nom = "", n = 1) {
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
function pointIntersectionCC(c1, c2, nom = "", n = 1) {
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
function cercleCentrePoint(...args) {
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
    angle=angleOriente(M,Omega,angle)
  }
  let l = longueur(Omega, M), large = 0, sweep = 0
 // let d = droite(Omega, M)
  //d.isVisible = false
  let A = point(Omega.x + 1, Omega.y)
  let azimut = angleOriente(A, Omega, M)
  let anglefin = azimut + angle
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
    if (this.epaisseur != 1) {
      this.style += ` stroke-width="${this.epaisseur}" `
    }
    if (this.pointilles) {
      this.style += ` stroke-dasharray="4 3" `
    }
    if (this.opacite != 1) {
      this.style += ` stroke-opacity="${this.opacite}" `
    }
    if (this.couleurDeRemplissage != 'none') {
      this.style += ` fill-opacity="${this.opaciteDeRemplissage}" `;
    }
    return `<path d="M${M.xSVG(coeff)} ${M.ySVG(coeff)} A ${l * coeff} ${l * coeff} 0 ${large} ${sweep} ${N.xSVG(coeff)} ${N.ySVG(coeff)} L ${Omega.xSVG(coeff)} ${Omega.ySVG(coeff)} Z" stroke="${this.color}" fill="${this.couleurDeRemplissage}" ${this.style}/>`
  }
  else this.svg = function (coeff) {
    if (this.epaisseur != 1) {
      this.style += ` stroke-width="${this.epaisseur}" `
    }
    if (this.pointilles) {
      this.style += ` stroke-dasharray="4 3" `
    }
    if (this.opacite != 1) {
      this.style += ` stroke-opacity="${this.opacite}" `
    }
    return `<path d="M${M.xSVG(coeff)} ${M.ySVG(coeff)} A ${l * coeff} ${l * coeff} 0 ${large} ${sweep} ${N.xSVG(coeff)} ${N.ySVG(coeff)}" stroke="${this.color}" fill="${fill}" ${this.style}/>`
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
    if (this.pointilles) {
      tableauOptions.push(`dashed`)
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
    if (rayon) return `\\filldraw  ${optionsDraw} (${N.x},${N.y}) -- (${Omega.x},${Omega.y}) -- (${M.x},${M.y}) arc (${azimut}:${anglefin}:${longueur(Omega, M)}) -- cycle ;`
    else return `\\draw${optionsDraw} (${M.x},${M.y}) arc (${azimut}:${anglefin}:${longueur(Omega, M)}) ;`
  }
  let la,da,code,P,dMx,dMy,dPx,dPy
  if (!rayon)  this.svgml = function (coeff, amp) {
    if (this.epaisseur != 1) {
      this.style += ` stroke-width="${this.epaisseur}" `;
    }
    if (this.opacite != 1) {
      this.style += ` stroke-opacity="${this.opacite}" `;
    }
    this.style += ` fill="none" `;
    la = Math.abs(Math.round(longueur(M, Omega) * 2 * Math.PI * angle / 360)) //longueur de l'arc pour obtenir le nombre de points intermédiaires proportionnel au rayon
    da = angle / la
    code = `<path d="M${M.xSVG(coeff)} ${M.ySVG(coeff)} C `
    for (let k = 0; k <= la; k++) {
      P = rotation(M, Omega, k * da)
      code += `${arrondi(P.xSVG(coeff) + randint(-1, 1) * amp, 2)} ${arrondi(P.ySVG(coeff) + randint(-1, 1) * amp, 2)}, `
    }
    code += `${arrondi(P.xSVG(coeff) + randint(-1, 1) * amp, 2)} ${arrondi(P.ySVG(coeff) + randint(-1, 1) * amp, 2)} `
    code += `" stroke="${color}" ${this.style}"/>`
    return code
  }
  else 
    this.svgml=function (coeff,amp) {
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
      la = Math.abs(longueur(M, Omega) * 2 * Math.PI * angle / 360) //longueur de l'arc pour obtenir le nombre de points intermédiaires proportionnel au rayon
      da = angle / la
      code = `<path d="M${M.xSVG(coeff)} ${M.ySVG(coeff)} C `
      for (let k = 0; k <= la; k++) {
        P = rotation(M, Omega, k * da)
        code += `${arrondi(P.xSVG(coeff) + randint(-1, 1) * amp, 0)} ${arrondi(P.ySVG(coeff) + randint(-1, 1) * amp, 0)}, `
      }
      code += `${arrondi(P.xSVG(coeff) + randint(-1, 1) * amp, 0)} ${arrondi(P.ySVG(coeff) + randint(-1, 1) * amp, 0)} `
    
    l = longueur(Omega, M)
    dMx = (M.xSVG(coeff) - Omega.xSVG(coeff)) / (4 * l)
    dMy = (M.ySVG(coeff) - Omega.ySVG(coeff)) / (4 * l)
    dPx = (Omega.xSVG(coeff) - P.xSVG(coeff)) / (4 * l)
    dPy = (Omega.ySVG(coeff) - P.ySVG(coeff)) / (4 * l)
    if (rayon) {
      for (let k = 0; k <= 4 * l; k++) {
        code += `${arrondi(P.xSVG(coeff) + k * dPx + randint(-1, 1) * amp, 0)} ${arrondi(P.ySVG(coeff) + k * dPy + randint(-1, 1) * amp, 0)}, `
      }
      for (let j = 0; j <= 4 * l; j++) {
        code += `${arrondi(Omega.xSVG(coeff) + j * dMx + randint(-1, 1) * amp, 0)} ${arrondi(Omega.ySVG(coeff) + j * dMy + randint(-1, 1) * amp, 0)}, `
      }
      code += `${arrondi(Omega.xSVG(coeff) + 4 * l * dMx + randint(-1, 1) * amp, 0)} ${arrondi(Omega.ySVG(coeff) + 4 * l * dMy + randint(-1, 1) * amp, 0)} Z `
    }
    code += `" stroke="${color}" ${this.style}"/>`
    return code
  }
  this.tikzml = function (amp) {
    let optionsDraw = []
    let tableauOptions = [];
    let A = point(Omega.x + 1, Omega.y)
    let azimut = angleOriente(A, Omega, M)
    let anglefin = azimut + angle
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

    if (rayon) return `\\filldraw  ${optionsDraw} (${N.x},${N.y}) -- (${Omega.x},${Omega.y}) -- (${M.x},${M.y}) arc (${azimut}:${anglefin}:${longueur(Omega, M)}) -- cycle ;`
    else return `\\draw${optionsDraw} (${M.x},${M.y}) arc (${azimut}:${anglefin}:${longueur(Omega, M)}) ;`
  }
}
function arc(...args) {
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
function arcPointPointAngle(...args) {
  return new ArcPointPointAngle(...args);
}
/**
 * m = traceCompas(O, A, 20) trace un arc de cercle de centre O qui commence 10° avant A et finit 10° après.
 *@Auteur Jean-Claude Lhote
 */
function traceCompas(
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

function courbeDeBezier(...args) {
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
function SegmentMainLevee(A,B,amp,color='black',epaisseur=1) {
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
function segmentMainLevee(A,B,amp,color='black',epaisseur=1) {
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
function cercleMainLevee(A,r,amp,color='black',epaisseur=1) {
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
function droiteMainLevee(A,B,amp,color='black',epaisseur=1) {
  return new DroiteMainLevee(A,B,amp,color,epaisseur)
}
/**
 * Trace un polygone qui donne l'impression d'être fait à main levée. amp est l'amplitude de la déformation
 * @Auteur Jean-Claude Lhote
 */
function PolygoneMainLevee(points,amp,color='black') {
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
function polygoneMainLevee(points,amp,color='black') {
  return new PolygoneMainLevee(points,amp,color)
}

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
function arcMainLevee(M,Omega,angle,amp,rayon=false,fill='none',color='black',fillOpacite=0.2){
  return new ArcMainLevee(M,Omega,angle,amp,rayon,fill,color,fillOpacite)
}


/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%% LES TRANSFORMATIONS %%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * M = tion(O,v) //M est l'image de O dans la translation de vecteur v
 * M = translation(O,v,'M') //M est l'image de O dans la translation de vecteur v et se nomme M
 * M = translation(O,v,'M','below') //M est l'image de O dans la translation de vecteur v, se nomme M et le nom est en dessous du point
 *
 * @Auteur Rémi Angot
 */
function translation(O, v, nom = "", positionLabel = "above") {
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

function translation2Points(O, A, B, nom = "", positionLabel = "above") {
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
function rotation(A, O, angle, nom, positionLabel) {
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
 * M = homothetie(A,O,k) //M est l'image de A dans l'homothétie de centre O et de rapport k
 * M = homothetie(A,O,k,'M') //M est l'image de A dans l'homothétie de centre O et de rapport k et se nomme M
 * M = homothetie(A,O,k,'M') //M est l'image de A dans l'homothétie de centre O et de rapport k, se nomme M et le nom est en dessous du point
 *
 * @Auteur Rémi Angot
 */
function homothetie(A, O, k, nom, positionLabel) {
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
function symetrieAxiale(A, d, nom = "", positionLabel = "above") {
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
 * N = projectionOrtho(M,d,'N','below left')
 *@Auteur Jean-Claude Lhote
 */
function projectionOrtho(M, d, nom = " ", positionLabel = "above") {
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
function affiniteOrtho(A, d, k, nom = " ", positionLabel = "above") {
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
function similitude(A, O, a, k, nom = " ", positionLabel = "above") {
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
function translationAnimee(...args) {
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
function rotationAnimee(...args) {
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
    code = `<polygon stroke="${p.color}" stroke-width="${p.epaisseur}" fill="none" >
		<animate attributeName="points" dur="2s" repeatCount="indefinite"
		from="${binomesXY1}"
		to="${binomesXY2}"
		/>
		</polygon>`;
    return code;
  };
}
function homothetieAnimee(...args) {
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
    code = `<polygon stroke="${p.color}" stroke-width="${p.epaisseur}" fill="none" >
		<animate attributeName="points" dur="2s" repeatCount="indefinite"
		from="${binomesXY1}"
		to="${binomesXY2}"
		/>
		</polygon>`;
    return code;
  };
}
function symetrieAnimee(...args) {
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
    code = `<polygon stroke="${p.color}" stroke-width="${p.epaisseur}" fill="none" >
		<animate attributeName="points" dur="2s" repeatCount="indefinite"
		from="${binomesXY1}"
		to="${binomesXY2}"
		/>
		</polygon>`;
    return code;
  };
}
function affiniteOrthoAnimee(...args) {
  return new AffiniteOrthoAnimee(...args);
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
function medianeTriangle(A, B, C, color = "black") {
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
function centreGraviteTriangle(A, B, C, nom = "") {
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
function hauteurTriangle(A, B, C, color = "black") {
  let d = droite(B, C);
  d.isVisible = false;
  let p = projectionOrtho(A, d);
  return droite(p, A, "", color);
}
function CodageHauteurTriangle(A, B, C, color = "black") {
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
function codageHauteurTriangle(...args) {
  return new CodageHauteurTriangle(...args);
}
function CodageMedianeTriangle(A, B, C, color = "black", mark = "//") {
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
function codageMedianeTriangle(...args) {
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
function orthoCentre(A, B, C, nom = "", positionLabel = "above") {
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
function centreCercleCirconscrit(A, B, C, nom = "", positionLabel = "above") {
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
    return polyline([a, o, b], color).svg(coeff);
  }
  this.tikz=function(){
  let a=pointSurSegment(this.sommet,this.depart, this.taille/scale);
  let b=pointSurSegment(this.sommet,this.arrivee, this.taille/scale);
  let o = {};
  if (angleOriente(A, this.sommet, B) > 0) {
    o = rotation(this.sommet, a, -90);
  } else {
    o = rotation(this.sommet, a, 90);
  }
  return polyline([a, o, b], color).tikz();
}



}
function codageAngleDroit(A, O, B, color = "black", d = 0.4){
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

  this.svg=function(coeff){
    let O=milieu(this.extremite1,this.extremite2)
    let M = rotation(this.extremite1, O, -90);
  let N = pointSurSegment(O, M, this.distance*20/coeff);
  let angle;
  let s = segment(this.extremite1, this.extremite2);
  s.isVisible = false;
  let l = string_nombre(arrondi(s.longueur, 1));
  if (this.extremite2.x > this.extremite1.x) {
    angle = -s.angleAvecHorizontale;
  } else {
    angle = 180 - s.angleAvecHorizontale ;
  }
  return texteParPoint(l + " cm", N, angle, this.color).svg(coeff);
  }

  this.tikz=function(){
    let O=milieu(this.extremite1,this.extremite2)
    let M = rotation(this.extremite1, O, -90);
  let N = pointSurSegment(O, M, this.distance/scale);
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
function afficheLongueurSegment(...args) {
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
    let N = pointSurSegment(O, M, this.distance/scale);
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
function texteSurSegment(...args) {
  return new TexteSurSegment(...args);
}

/**
 * afficheMesureAngle(A,B,C) // Affiche la mesure de l'angle ABC arrondie au degré près
 *
 * @Auteur Rémi Angot
 */
function AfficheMesureAngle(A, B, C, color = "black", distance = 1.5) {
  ObjetMathalea2D.call(this)
  this.depart=A
  this.arrivee=C
  this.sommet=B
  this.distance=distance

  this.svg=function(coeff){
    let d = bissectrice(A, B, C);
    d.isVisible = false;
    let M = pointSurSegment(d.extremite1, d.extremite2, this.distance*20/coeff);
    let mesureAngle = arrondi_virgule(angle(this.depart,this.sommet,this.arrivee), 0) + "°";
    return "\n"+texteParPoint(mesureAngle, M, "milieu", color).svg(coeff)+"\n"+arc(pointSurSegment(this.sommet, this.depart, 0.8*20/coeff), B, angleOriente(this.depart,this.sommet,this.arrivee)).svg(coeff);
  }
  this.tikz=function(){
    let d = bissectrice(A, B, C);
    d.isVisible = false;
    let M = pointSurSegment(d.extremite1, d.extremite2, this.distance/scale);
    let mesureAngle = arrondi_virgule(angle(this.depart,this.sommet,this.arrivee), 0) + "°";
    return "\n"+texteParPoint(mesureAngle, M, "milieu", color).tikz()+"\n"+arc(pointSurSegment(this.sommet, this.depart, 0.8/scale), B, angleOriente(this.depart,this.sommet,this.arrivee)).tikz();
  }
}
function afficheMesureAngle(...args){
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
    this.positionCoteSVG=positionCote*20/pixelsParCm
    this.positionCoteTIKZ=positionCote/scale
    this.positionValeurpositionValeur
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
function afficheCoteSegment(...args) {
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
function codeSegment(...args) {
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
        code += codeSegment(args[0][i], args[0][i + 1], mark, color).svg(coeff);
        code += "\n";
      }
      code += codeSegment(
        args[0][args[0].length - 1],
        args[0][0],
        mark,
        color
      ).svg(coeff);
      code += "\n";
    } else if (args[0].constructor == Segment) {
      for (let i = 0; i < args.length; i++) {
        code += codeSegment(
          args[i].extremite1,
          args[i].extremite2,
          mark,
          color
        ).svg(coeff);
        code += "\n";
      }
    } else {
      for (let i = 0; i < args.length; i += 2) {
        code += codeSegment(args[i], args[i + 1], mark, color).svg(coeff);
        code += "\n";
      }
    }
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
function codeSegments(mark = "||", color = "black", ...args) {
  return new CodeSegments(mark, color , ...args);
}
/**
 * m=codeAngle(A,O,45,'X','black',2,1,'red',0.4) 
 * code un angle du point A dont le sommet est O et la mesure 45° (sens direct) avec une marque en X.
 *  la ligne est noire a une épaisseur de 2 une opacité de 100% et le remplissage à 40% d'opacité est rouge.
 * @Auteur Jean-Claude Lhote
 */
function CodeAngle(debut,centre,angle,taille=0.8,mark='',color='black',epaisseur=1,opacite=1,fill='none',fillOpacite=0.2) {
  ObjetMathalea2D.call(this)
  this.color=color
  this.debut=debut
  this.centre=centre
  this.taille=taille
  this.mark=mark
  this.epaisseur=epaisseur
  this.opacite=opacite

  if (this.fill!='none') {
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
  this.plein=remplir
  if (typeof(angle)!='number'){
    angle=angleOriente(debut,centre,angle)
  }
  this.angle=angle

  this.svg=function(coeff){
    let P,depart,d,arcangle,codage
    depart=pointSurSegment(this.centre,this.debut,this.taille*20/pixelsParCm)
    P=rotation(depart,this.centre,this.angle/2)
    d=droite(this.centre,P)
    d.isVisible=false
    arcangle=arc(depart,this.centre,this.angle,this.plein,this.couleurDeRemplissage,this.color)
    arcangle.opacite=this.opacite
    arcangle.epaisseur=this.epaisseur
    arcangle.couleurDeRemplissage=this.couleurDeRemplissage
    arcangle.opaciteDeRemplissage=this.opaciteDeRemplissage
    if (this.mark!='')  codage=texteParPoint(mark,P,90-d.angleAvecHorizontale,color)
    else codage=''
    if (codage!='') return codage.svg(coeff)+'\n'+arcangle.svg(coeff);
    else return arcangle.svg(coeff);
  }

  this.tikz=function(){
    let P,depart,d,arcangle,codage
    depart=pointSurSegment(this.centre,this.debut,this.taille/scale)
    P=rotation(depart,this.centre,this.angle/2)
    d=droite(this.centre,P)
    d.isVisible=false
    arcangle=arc(depart,this.centre,this.angle,this.plein,this.couleurDeRemplissage,this.color)
    arcangle.opacite=this.opacite
    arcangle.epaisseur=this.epaisseur
    arcangle.couleurDeRemplissage=this.couleurDeRemplissage
    arcangle.opaciteDeRemplissage=this.opaciteDeRemplissage
    if (this.mark!='')  codage=texteParPoint(mark,P,90-d.angleAvecHorizontale,color)
    else codage=''
    if (codage!='') return codage.tikz()+'\n'+arcangle.tikz();
    else return arcangle.tikz();
  }

  this.svgml = function(coeff,amp){
    let P,depart,d,arcangle,codage
    depart=pointSurSegment(this.centre,this.debut,this.taille*20/pixelsParCm)
    P=rotation(this.depart,this.centre,this.angle/2)
    d=droite(this.centre,P)
    d.isVisible=false
    arcangle=arc(this.depart,this.centre,this.angle,this.plein,this.couleurDeRemplissage,this.color)
    arcangle.opacite=this.opacite
    arcangle.epaisseur=this.epaisseur
    arcangle.couleurDeRemplissage=this.couleurDeRemplissage
    arcangle.opaciteDeRemplissage=this.opaciteDeRemplissage
    if (this.mark!='')  codage=texteParPoint(mark,P,90-d.angleAvecHorizontale,color)
    else codage=''
    if (codage!='') return codage.svg(coeff)+'\n'+arcangle.svgml(coeff,amp);
    else return arcangle.svg(coeff);
  }
  this.tikzml=function(amp){
    let P,depart,d,arcangle,codage
    depart=pointSurSegment(this.centre,this.debut,this.taille/scale)
    P=rotation(this.depart,this.centre,this.angle/2)
    d=droite(this.centre,P)
    d.isVisible=false
    arcangle=arc(this.depart,this.centre,this.angle,this.plein,this.couleurDeRemplissage,this.color)
    arcangle.opacite=this.opacite
    arcangle.epaisseur=this.epaisseur
    arcangle.couleurDeRemplissage=this.couleurDeRemplissage
    arcangle.opaciteDeRemplissage=this.opaciteDeRemplissage
    if (this.mark!='')  codage=texteParPoint(mark,P,90-d.angleAvecHorizontale,color)
    else codage=''
    if (codage!='') return codage.tikz()+'\n'+arcangle.tikzml(amp);
    else return arcangle.tikz();
  }
}

function codeAngle(debut,centre,angle,taille=0.8,mark='',color='black',epaisseur=1,opacite=1,fill='none',fillOpacite=0.2){
  return new CodeAngle(debut,centre,angle,taille,mark,color,epaisseur,opacite,fill,fillOpacite)
}
/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%% LES REPERES ET GRILLE %%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

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
    code = "";
    for (objet of objets) {
      code += "\n\t" + objet.svg(coeff);
    }
    return code;
  };
  this.tikz = function () {
    code = "";
    for (objet of objets) {
      code += "\n\t" + objet.tikz();
    }
    return code;
  };
  this.commentaire = `Axes(xmin = ${xmin}, ymin = ${ymin}, xmax = ${xmax}, ymax = ${ymax}, thick = ${thick})`;
}
function axes(...args) {
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
  for (
    x = Math.ceil(xmin / coeff);
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
    code = "";
    for (objet of objets) {
      code += "\n\t" + objet.svg(coeff);
    }
    return code;
  };
  this.tikz = function () {
    code = "";
    for (objet of objets) {
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
function labelX(...args) {
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
  for (
    y = Math.ceil(ymin / coeff);
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
    code = "";
    for (objet of objets) {
      code += "\n\t" + objet.svg(coeff);
    }
    return code;
  };
  this.tikz = function () {
    code = "";
    for (objet of objets) {
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
function labelY(...args) {
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
  for (let i = xmin; i <= xmax; i += step) {
    let s = segment(i, ymin, i, ymax);
    s.color = this.color;
    s.opacite = this.opacite;
    if (pointilles) {
      s.pointilles = true;
    }
    objets.push(s);
  }
  for (let i = ymin; i <= ymax; i += step) {
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
    code = "";
    for (objet of objets) {
      code += "\n\t" + objet.svg(coeff);
    }
    return code;
  };
  this.tikz = function () {
    code = "";
    for (objet of objets) {
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
function grille(...args) {
  return new Grille(...args);
}


function Seyes(xmin = 0, ymin = 0, xmax = 15, ymax = 15,opacite1 = .5, opacite2 = .2) {
  ObjetMathalea2D.call(this)
  objets = [];
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
    code = "";
    for (objet of objets) {
      code += "\n\t" + objet.svg(coeff);
    }
    return code;
  };
  this.tikz = function () {
    code = "";
    for (objet of objets) {
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
function seyes(...args){
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
  axesEpaisseur = 2,
  axesColor = "black",
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
  let objets = [];
  let yabscisse;
  ymin > 0 ? (yabscisse = ymin) : (yabscisse = 0);
  let xordonnee;
  xmin > 0 ? (xordonnee = xmin) : (xordonnee = 0);
 
  this.svg = function (coeff) {
    code = "";
    if (grillePrincipaleVisible) {
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
        code+= labelX(
            premierMultipleSuperieur(xstep, graduationsxMin),
            graduationsxMax,
            xstep,
            graduationColor,
            calcul(yabscisse / yscale) + positionLabelX*20/coeff,
            xscale
          ).svg(coeff)
        code+= labelY(
            premierMultipleSuperieur(ystep, graduationsyMin),
            graduationsyMax,
            ystep,
            graduationColor,
            calcul(xordonnee / xscale) + positionLabelY*20/coeff,
            yscale
          ).svg(coeff)
      } else {
        code+=labelX(
            premierMultipleSuperieur(xstep, graduationsxMin),
            -1,
            xstep,
            graduationColor,
            calcul(yabscisse / yscale) + positionLabelX*20/coeff,
            xscale
          ).svg(coeff)
        code+=labelY(
            premierMultipleSuperieur(ystep, graduationsyMin),
            -1,
            ystep,
            graduationColor,
            calcul(xordonnee / xscale) + positionLabelY*20/coeff,
            yscale
          ).svg(coeff)
        code+=labelX(
            Math.max(xstep, premierMultipleSuperieur(xstep, graduationsxMin)),
            graduationsxMax,
            xstep,
            graduationColor,
            calcul(yabscisse / yscale) + positionLabelX*20/coeff,
            xscale
          ).svg(coeff)
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
    if (positionLegendeX === undefined) {
      positionLegendeX = [xmax + 4/coeff, yabscisse + 6/coeff];
    }
    if (positionLegendeY === undefined) {
      positionLegendeY = [xordonnee + 6/coeff, ymax + 4/coeff];
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
    code = "";
    if (grillePrincipaleVisible) {
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
        0.2/scale,
        xstep,
        ystep,
        axesEpaisseur,
        axesColor
      ).tikz()
    
    if (afficheZero) {
      code+= labelX(
          premierMultipleSuperieur(xstep, graduationsxMin),
          graduationsxMax,
          xstep,
          graduationColor,
          calcul(yabscisse / yscale) + positionLabelX/scale,
          xscale
        ).tikz()
      code+= labelY(
          premierMultipleSuperieur(ystep, graduationsyMin),
          graduationsyMax,
          ystep,
          graduationColor,
          calcul(xordonnee / xscale) + positionLabelY/scale,
          yscale
        ).tikz()
    } else {
      code+=labelX(
          premierMultipleSuperieur(xstep, graduationsxMin),
          -1,
          xstep,
          graduationColor,
          calcul(yabscisse / yscale) + positionLabelX/scale,
          xscale
        ).tikz()
      code+=labelY(
          premierMultipleSuperieur(ystep, graduationsyMin),
          -1,
          ystep,
          graduationColor,
          calcul(xordonnee / xscale) + positionLabelY/scale,
          yscale
        ).tikz()
      code+=labelX(
          Math.max(xstep, premierMultipleSuperieur(xstep, graduationsxMin)),
          graduationsxMax,
          xstep,
          graduationColor,
          calcul(yabscisse / yscale) + positionLabelX/scale,
          xscale
        ).tikz()
      code+=labelY(
          Math.max(ystep, premierMultipleSuperieur(ystep, graduationsyMin)),
          graduationsyMax,
          ystep,
          graduationColor,
          calcul(xordonnee / xscale) + positionLabelY/scale,
          yscale
        ).tikz()
    }
    if (positionLegendeX === undefined) {
      positionLegendeX = [xmax + 0.2/scale, yabscisse + 0.3/scale];
    }
    if (positionLegendeY === undefined) {
      positionLegendeY = [xordonnee + 0.3/scale, ymax + 0.2/scale];
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

function repere(...args) {
  return new Repere(...args);
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
    return "\t\n"+Sx.tikz()+"\t\n"+Sy.tikz()+"\t\n"+texteParPosition(this.text_abs,x0,-1/scale,'milieu',this.color).tikz()+"\t\n"+texteParPosition(this.text_ord,-1/scale,y0,'milieu',this.color).tikz()
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
    return "\t\n"+Sx.tikzml(amp)+"\t\n"+Sy.tikzml(amp)+"\t\n"+texteParPosition(this.text_abs,x0,-1/scale,'milieu',this.color).tikz()+"\t\n"+texteParPosition(this.text_ord,-1/scale,y0,'milieu',this.color).tikz()
 
  }
}
function lectureImage(...args){
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
    return "\t\n"+Sx.tikz()+"\t\n"+Sy.tikz()+"\t\n"+texteParPosition(this.text_abs,x0,-1/scale,'milieu',this.color).tikz()+"\t\n"+texteParPosition(this.text_ord,-1/scale,y0,'milieu',this.color).tikz()

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
    return "\t\n"+Sx.tikzml(amp)+"\t\n"+Sy.tikzml(amp)+"\t\n"+texteParPosition(this.text_abs,x0,-1/scale,'milieu',this.color).tikz()+"\t\n"+texteParPosition(this.text_ord,-1/scale,y0,'milieu',this.color).tikz()
 }
}
function lectureAntecedent(...args){
  return new LectureAntecedent(...args)
} 
/**
 * courbe(f,xmin,xmax,color,epaisseur,repere,step) // Trace la courbe de f
 *
 * @Auteur Rémi Angot
 */

function courbe(
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
  mesCourbes = [];
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
      code = "";
      for (objet of mesCourbes) {
        code += "\n\t" + objet.svg(coeff);
      }
      return code;
    };
    this.tikz = function () {
      code = "";
      for (objet of mesCourbes) {
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
function courbeInterpolee(...args) {
  return new CourbeInterpolee(...args);
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
    if (this.pointilles) {
      this.style += ` stroke-dasharray="4 3" `;
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
    code = `\\draw[very thick,${this.color}] (${calcul(A.x + this.taille/scale)},${A.y+this.taille/scale})--(${
      A.x
    },${A.y+this.taille/scale})--(${A.x},${A.y-this.taille/scale})--(${calcul(A.x + this.taille/scale)},${A.y-this.taille/scale});`;
    code += `\n\t\\draw[${this.color}] (${A.x},${A.y-this.taille/scale}) node[below] {$${A.nom}$};`;
    return code;
  };
}
function crochetD(...args) {
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
    if (this.pointilles) {
      this.style += ` stroke-dasharray="4 3" `;
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
    code = `\\draw[very thick,${this.color}] (${calcul(A.x - this.taille/scale)},${A.y+this.taille/scale})--(${
      A.x
    },${A.y+this.taille/scale})--(${A.x},${A.y-this.taille/scale})--(${calcul(A.x - this.taille/scale)},${A.y-this.taille/scale});`;
    code += `\n\t\\draw[${this.color}] (${A.x},${A.y-this.taille/scale}) node[below] {$${A.nom}$};`;
    return code;
  };
}
function crochetG(...args) {
  return new CrochetG(...args);
}

function intervalle(A, B, color = "blue", h = 0) {
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
function TexteParPoint(texte, A, orientation = "milieu", color='black',scale=1) {
  ObjetMathalea2D.call(this);
  this.color = color;
  this.svg = function (coeff) {
    let code = "";
    if (typeof(orientation)=='number') {
      code = `<text x="${A.xSVG(coeff)}" y="${A.ySVG(
        coeff
      )}" text-anchor="middle" dominant-baseline="central" fill="${
        this.color
      }" transform="rotate(${orientation} ${A.xSVG(coeff)} ${A.ySVG(
        coeff
      )})">${texte}</text>\n `;
    } else {
      switch (orientation) {
        case "milieu":
          code = `<text x="${A.xSVG(coeff)}" y="${A.ySVG(
            coeff
          )}" text-anchor="middle" dominant-baseline="central" fill="${
            this.color
          }">${texte}</text>\n `;
          break;
        case "gauche":
          code = `<text x="${A.xSVG(coeff)}" y="${A.ySVG(
            coeff
          )}" text-anchor="end" dominant-baseline="central" fill="${
            this.color
          }">${texte}</text>\n `;
          break;
        case "droite":
          code = `<text x="${A.xSVG(coeff)}" y="${A.ySVG(
            coeff
          )}" text-anchor="start" dominant-baseline="central" fill="${
            this.color
          }">${texte}</text>\n `;
          break;
      }
    }

    return code;
  };
  this.tikz = function () {
    let code = "";
    if (typeof orientation == "number") {
      code = `\\draw [${color}] (${A.x},${
        A.y
      }) node[anchor = center, rotate = ${-orientation}] {${texte}};`;
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
function texteParPoint(...args) {
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
function texteParPosition(texte, x, y, orientation = "milieu", color,scale=1) {
  return new TexteParPoint(texte, point(x, y), orientation, color,scale);
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
function latexParPoint(...args) {
  return new LatexParPoint(...args);
}

function latexParCoordonnees(texte, x, y) {
  let A = point(x, y);
  return latexParPoint(texte, A);
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
function longueur(A, B, arrondi) {
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
function norme(v) {
  return calcul(Math.sqrt(v.x ** 2 + v.y ** 2));
}

/**
 * angle(A,O,B) renvoie l'angle AOB en degré
 *
 * @Auteur Rémi Angot
 */
function angle(A, O, B) {
  let OA = longueur(O, A);
  let OB = longueur(O, B);
  let AB = longueur(A, B);
  let v=vecteur(O,A)
  let w=vecteur(O,B)
  if (v.x*w.y-v.y*w.x==0) {
    if(v.x*w.x>0) return 0;
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
function angleOriente(A, O, B) {
  let A2 = rotation(A, O, 90);
  let v = vecteur(O, B),
    u = vecteur(O, A2);
  return unSiPositifMoinsUnSinon(v.x * u.x + v.y * u.y) * angle(A, O, B);
}
/**
 * angleradian(A,O,B) renvoie l'angle AOB en radian
 *
 * @Auteur Rémi Angot
 */
function angleradian(A, O, B) {
  let OA = longueur(O, A);
  let OB = longueur(O, B);
  let AB = longueur(A, B);
  let cos = calcul((AB ** 2 - OA ** 2 - OB ** 2) / (-2 * OA * OB), 0.1);
  return calcul(Math.acos((AB ** 2 - OA ** 2 - OB ** 2) / (-2 * OA * OB)), 2);
}




/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%% LES LUTINS %%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

function ObjetLutin() {
  mesObjets.push(this);
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
    code = '';
    for (trace of this.listeTraces) {
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
    code = '';
    for (trace of this.listeTraces) {
      let A = point(trace[0], trace[1]);
      let B = point(trace[2], trace[3]);
      let color = trace[4];
      let epaisseur = trace[5];
      let pointilles = trace[6];
      let opacite = trace[7];
      let style = '';
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

function creerLutin(...args) {
  return new ObjetLutin(...args);
}

function avance(d, lutin=monLutin) { // A faire avec pointSurCercle pour tenir compte de l'orientation
  let xdepart = lutin.x;
  let ydepart = lutin.y;
  lutin.x = calcul(lutin.x + d/unitesLutinParCm * Math.cos(Math.radians(lutin.orientation)));
  lutin.y = calcul(lutin.y + d/unitesLutinParCm * Math.sin(Math.radians(lutin.orientation)));
  lutin.historiquePositions.push([lutin.x, lutin.y]);
  if (lutin.crayonBaisse) {
    lutin.listeTraces.push([xdepart, ydepart, lutin.x, lutin.y,lutin.color,lutin.epaisseur,lutin.pointilles,lutin.opacite]);
  }
}

function baisseCrayon(lutin=monLutin) {
  lutin.crayonBaisse = true;
}

function leveCrayon(lutin=monLutin) {
  lutin.crayonBaisse = false;
}

function orienter(a,lutin=monLutin){
  lutin.orientation = a
}

function tournerG(a,lutin=monLutin){
  lutin.orientation +=a
}

function tournerD(a,lutin=monLutin){
  lutin.orientation -=a
}

function allerA(x,y,lutin=monLutin){
  let xdepart = lutin.x;
  let ydepart = lutin.y;
  lutin.x = calcul(x/unitesLutinParCm);
  lutin.y = calcul(y/unitesLutinParCm);
  lutin.historiquePositions.push([lutin.x, lutin.y]);
  if (lutin.crayonBaisse) {
    lutin.listeTraces.push([xdepart, ydepart, lutin.x, lutin.y,lutin.color,lutin.epaisseur,lutin.pointilles,lutin.opacite]);
  } 
}

function mettrexA(x,lutin=monLutin){
  let xdepart = lutin.x;
  lutin.x = calcul(x/unitesLutinParCm);
  lutin.historiquePositions.push([lutin.x, lutin.y]);
  if (lutin.crayonBaisse) {
    lutin.listeTraces.push([xdepart, lutin.y, lutin.x, lutin.y,lutin.color,lutin.epaisseur,lutin.pointilles]);
  } 
}

function mettreyA(y,lutin=monLutin){
  let ydepart = lutin.y;
  lutin.y = calcul(y/unitesLutinParCm);
  lutin.historiquePositions.push([lutin.x, lutin.y]);
  if (lutin.crayonBaisse) {
    lutin.listeTraces.push([lutin.x, ydepart, lutin.x, lutin.y,lutin.color,lutin.epaisseur,lutin.pointilles]);
  } 
}

function ajouterAx(x,lutin=monLutin){
  let xdepart = lutin.x;
  lutin.x += calcul(x/unitesLutinParCm);
  lutin.historiquePositions.push([lutin.x, lutin.y]);
  if (lutin.crayonBaisse) {
    lutin.listeTraces.push([xdepart, lutin.y, lutin.x, lutin.y,lutin.color,lutin.epaisseur,lutin.pointilles]);
  } 
}

function ajouterAy(y,lutin=monLutin){
  let ydepart = lutin.y;
  lutin.y += calcul(y/unitesLutinParCm);
  lutin.historiquePositions.push([lutin.x, lutin.y]);
  if (lutin.crayonBaisse) {
    lutin.listeTraces.push([lutin.x, ydepart, lutin.x, lutin.y,lutin.color,lutin.epaisseur,lutin.pointilles]);
  } 
}



/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%% LES FONCTIONS - FORMATAGE %%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * codeSvg(segment(A,B),polygone(D,E,F),labelPoints(A,B))
 *
 * @Auteur Rémi Angot
 */
function codeSvg(...objets) {
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
            else code += "\t" + objet[i].svgml(pixelsParCm,amplitude) + "\n";
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
function codeTikz(...objets) {
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
  code += `\\end{tikzpicture}\n`;
  return code;
}

/**
 * mathalea2d(xmin,xmax,ymin,ymax,objets)
 *
 * @Auteur Rémi Angot
 */

function mathalea2d(
  { xmin = 0, ymin = 0, xmax = 15, ymax = 6, pixelsParCm = 20, scale = 1,mainlevee = false ,amplitude=1} = {},
  ...objets
) {
  ObjetMathalea2D.call(this);
  let code = "";
  if (sortie_html) {
    code = `<svg width="${(xmax - xmin) * pixelsParCm}" height="${
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
          } catch (error) {console.log('premiere boucle',error.message,i)}

        }
      }
      try {
        if (objet.isVisible) {
          if ((!mainlevee)||typeof(objet.svgml)=='undefined') code += "\t" + objet.svg(pixelsParCm) + "\n";
          else
               code += "\t" + objet.svgml(pixelsParCm,amplitude) + "\n";
         }
    } catch (error) {console.log('le try tout seul',error.message,i)}
    }
    code += `\n</svg>`;
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
