"use strict";

let mesObjets = [];
/*
/**
* Classe parente de tous les objets de MathALEA2D
*
* @Auteur Rémi Angot
*/
function ObjetMathalea2D() {
	this.positionLabel = 'above';
	this.isVisible = true;
	this.color = 'black';
	mesObjets.push(this);
}

/**
* A = point('A') //son nom
* A = point(x,y) //ses coordonnées
* A = point(x,y,'A') //ses coordonnées et son nom
* A = point(x,y,,'A';below') //ses coordonnées,son nom et la position de son label
*
* @Auteur Rémi Angot
*/
function Point(arg1,arg2,arg3,positionLabel = 'above') {
	ObjetMathalea2D.call(this);
	if (arguments.length==1) {
		this.nom = arg1 
	} else if (arguments.length==2) {
		this.x = arg1;
		this.y = arg2;
	} else {
		this.x = arg1;
		this.y = arg2;
		this.nom = arg3;
	}
	this.positionLabel = positionLabel;
	
	this.translationVecteur = function (v) { //Image du point dans la translation de vecteur v
		this.x = calcul(this.x+v.x);
		this.y = calcul(this.y+v.y);
	} ;
	this.translation = function(O,A,B) { //Image du point dans la translation qui transforme A en B
		this.x = calcul(this.x+B.x-A.x);
		this.y = calcul(this.y+B.y-A.y);
	}
	this.homothetie = function(O,k) { //Image du point dans l'homothétie de centre O et de rapport k
		this.x = calcul(O.x+k*(this.x-O.x))
		this.y = calcul(O.y+k*(this.y-O.y))
	}
	this.rotation = function(O,angle) { //Image de A dans la rotation de centre O et d'angle 
		this.x = calcul(O.x+(this.x-O.x)*Math.cos(angle*Math.PI/180)-(this.y-O.y)*Math.sin(angle*Math.PI/180));
    	this.y = calcul(O.y+(this.x-O.x)*Math.sin(angle*Math.PI/180)+(this.y-O.y)*Math.cos(angle*Math.PI/180));

	}
	this.xSVG = function(coeff=20) {
		return this.x*coeff;
	}
	this.ySVG = function(coeff=20) {
		return -this.y*coeff;
	}
	if (!this.nom) {
		this.nom = ' ';
	}

}
function point(...args){
	return new Point(...args)
}

/**
* M = pointParTranslation2Points(O,A,B) //M est l'image de O dans la translation qui transforme A en B
* M = pointParTranslation2Points(O,A,B,'M') //M est l'image de O dans la translation qui transforme A en B et se nomme M
* M = pointParTranslation2Points(O,A,B,'M','below') //M est l'image de O dans la translation qui transforme A en B, se nomme M et le nom est en dessous du point
*
* @Auteur Rémi Angot
*/
function PointParTranslation2Points(O,A,B,nom='',positionLabel = 'above') {
	Point.call(this,nom);
	this.positionLabel=positionLabel;
	this.x = calcul(O.x+B.x-A.x);
	this.y = calcul(O.y+B.y-A.y);
}
function pointParTranslation2Points(...args){
	return new PointParTranslation2Points(...args)
}

/**
* M = pointParTranslation(O,v) //M est l'image de O dans la translation de vecteur v
* M = pointParTranslation(O,v,'M') //M est l'image de O dans la translation de vecteur v et se nomme M
* M = pointParTranslation(O,v,'M','below') //M est l'image de O dans la translation de vecteur v, se nomme M et le nom est en dessous du point
*
* @Auteur Rémi Angot
*/
function PointParTranslation(O,v,nom='',positionLabel = 'above') {
	Point.call(this,nom);
	this.positionLabel=positionLabel;
	this.x = calcul(O.x+v.x);
	this.y = calcul(O.y+v.y);
}
function pointParTranslation(...args){
	return new PointParTranslation(...args)
}

/**
* M = pointParHomothetie(A,O,k) //M est l'image de A dans l'homothétie de centre O et de rapport k
* M = pointParHomothetie(A,O,k,'M') //M est l'image de A dans l'homothétie de centre O et de rapport k et se nomme M
* M = pointParHomothetie(A,O,k,'M','below') //M est l'image de A dans l'homothétie de centre O et de rapport k, se nomme M et le nom est en dessous du point
*
* @Auteur Rémi Angot
*/
function PointParHomothetie(A,O,k,nom='',positionLabel = 'above') {
	Point.call(this,nom);
	this.positionLabel=positionLabel;
	this.x = calcul(O.x+k*(A.x-O.x))
	this.y = calcul(O.y+k*(A.y-O.y))
}
function pointParHomothetie(...args){
	return new PointParHomothetie(...args)
}

/**
* M = pointSurSegment(A,B,l) //M est le point de [AB] à l cm de A
* M = pointSurSegment(A,B,l,'M') //M est le point de [AB] à l cm de A et se nomme M
* M = pointSurSegment(A,B,l,'M','below') //M est le point de [AB] à l cm de A, se nomme M et le nom est en dessous du point
*
* @Auteur Rémi Angot
*/
function PointSurSegment(A,B,l,nom='',positionLabel = 'above') {
	PointParHomothetie.call(this,B,A,calcul(l/longueur(A,B)),nom,positionLabel);
}
function pointSurSegment(...args){
	return new PointSurSegment(...args)
}

/**
* M = pointMilieu(A,B) //M est le milieu de [AB]
* M = pointMilieu(A,B,'M') //M est le milieu de [AB] et se nomme M
* M = pointMilieu(A,B,'M','below') //M est le milieu de [AB], se nomme M et le nom est en dessous du point
*
* @Auteur Rémi Angot
*/
function PointMilieu(A,B,nom='',positionLabel = 'above') {
	Point.call(this,nom);
	this.x = calcul((A.x+B.x)/2);
	this.y = calcul((A.y+B.y)/2);
}
function pointMilieu(...args){
	return new PointMilieu(...args)
}


/**
* M = pointParRotation(A,O,angle) //M est l'image de A dans la rotation de centre O et d'angle angle
* M = pointParRotation(A,O,angle,'M') //M est l'image de A dans la rotation de centre O et d'angle angle et se nomme M
* M = pointParRotation(A,O,angle,'M','below') //M est l'image de A dans la rotation de centre O et d'angle angle, se nomme M et le nom est en dessous
* 
* @Auteur Rémi Angot et Jean-Claude Lhote
*/
function PointParRotation(A,O,angle,nom='',positionLabel = 'above') {
	Point.call(this,nom);
	this.x = calcul(O.x+(A.x-O.x)*Math.cos(angle*Math.PI/180)-(A.y-O.y)*Math.sin(angle*Math.PI/180));
    this.y = calcul(O.y+(A.x-O.x)*Math.sin(angle*Math.PI/180)+(A.y-O.y)*Math.cos(angle*Math.PI/180));
    this.positionLabel = positionLabel;
}
function pointParRotation(...args){
	return new PointParRotation(...args)
}

function PointParSimilitude(A,O,a,k,nom='',positionLabel = 'above') {
	Point.call(this,nom);
	let ra=Math.radians(a)
	this.x=calcul(O.x+k*(Math.cos(ra)*(A.x-O.x)-Math.sin(ra)*(A.y-O.y)))
	this.y=calcul(O.y+k*(Math.cos(ra)*(A.y-O.y)+Math.sin(ra)*(A.x-O.x)))
}
function pointParSimilitude(...args) {
	return new PointParSimilitude(...args)
}


/**
 * M = pointParSymetrieAxiale(A,d)// M est l'image de A dans la symétrie axiale d'axe d.
 * d est un objet de type Droite (son équation ax+by+c=0 renseignée)
 * A est un objet de type Point (ses coordonnées x et y renseignées)
 * @Auteur Jean-Claude Lhote
 */
function PointParSymetrieAxiale(A,d,nom='',positionLabel = 'above') {
	Point.call(this,nom);
	let a=d.a,b=d.b,c=d.c,k=1/(a*a+b*b)
	if (a==0) {
		this.x=A.x
		this.y=calcul(-(A.y+2*c/b))
	}
	else if (b==0) {
		this.y=A.y
		this.x=calcul(-(A.x+2*c/a))
	}
	else {
		this.x=calcul(k*((b*b-a*a)*A.x-2*a*b*A.y-2*a*c))
		this.y=calcul(k*((a*a-b*b)*A.y-2*a*b*A.x+a*a*c/b-b*c)-c/b)
	}
	this.positionLabel = positionLabel;
}
function pointParSymetrieAxiale(...args){
	return new PointParSymetrieAxiale(...args)
}

/**
 * N = pointParProjectionOrtho(M,d,'N','below left')
 *@Auteur Jean-Claude Lhote
 */
function PointParProjectionOrtho(M,d,nom = '',positionLabel = 'above') {
	Point.call(this,nom);
	let a=d.a,b=d.b,c=d.c,k=calcul(1/(a*a+b*b))
	if (a==0) {
		this.x=M.x
		this.y=calcul(-c/b)
	}
	else if (b==0) {
		this.y=M.y
		this.x=calcul(-c/a)
	}
	else {
		this.x=calcul(k*(b*b*M.x-a*b*M.y-a*c))
		this.y=calcul(k*(-a*b*M.x+a*a*M.y+a*a*c/b)-c/b)
	}
	this.positionLabel = positionLabel;
}
function pointParProjectionOrtho(...args) {
	return new PointParProjectionOrtho(...args)
}
/**
* labelPoints(A,B) pour nommer les points A et B
* Le nombre d'arguments n'est pas limité
*
* @Auteur Rémi Angot
*/
function LabelPoints(...points) {
	ObjetMathalea2D.call(this);
	this.svg = function(coeff){
		let code = "";
		if (Array.isArray(points[0])) { //Si le premier argument est un tableau
			this.listePoints = points[0]
		} else {
			this.listePoints = points
		}
		for (let point of this.listePoints){
			switch (point.positionLabel){
				case 'left':
				code += `<text x="${calcul(point.xSVG(coeff)-10)}" y="${point.ySVG(coeff)}" text-anchor="middle" alignment-baseline="central" fill="${this.color}">${point.nom}</text>\n `; 
				break;
				case 'right':
				code += `<text x="${calcul(point.xSVG(coeff)+10)}" y="${point.ySVG(coeff)}" text-anchor="middle" alignment-baseline="central" fill="${this.color}">${point.nom}</text>\n `; 
				break;
				case 'below':
				code += `<text x="${point.xSVG(coeff)}" y="${calcul(point.ySVG(coeff)+10)}" text-anchor="middle" alignment-baseline="central" fill="${this.color}">${point.nom}</text>\n `; 
				break;
				case 'above':
				code += `<text x="${point.xSVG(coeff)}" y="${calcul(point.ySVG(coeff)-10)}" text-anchor="middle" alignment-baseline="central" fill="${this.color}">${point.nom}</text>\n `; 
				break;
				case 'above right':
				code += `<text x="${calcul(point.xSVG(coeff)+10)}" y="${calcul(point.ySVG(coeff)-10)}" text-anchor="middle" alignment-baseline="central" fill="${this.color}">${point.nom}</text>\n `; 
				break;
				case 'below left':
				code += `<text x="${calcul(point.xSVG(coeff)-10)}" y="${calcul(point.ySVG(coeff)+10)}" text-anchor="middle" alignment-baseline="central" fill="${this.color}">${point.nom}</text>\n `; 
				break;
				case 'below right':
				code += `<text x="${calcul(point.xSVG(coeff)+10)}" y="${calcul(point.ySVG(coeff)+10)}" text-anchor="middle" alignment-baseline="central" fill="${this.color}">${point.nom}</text>\n `; 
				break;
				default :
				code += `<text x="${calcul(point.xSVG(coeff)-10)}" y="${calcul(point.ySVG(coeff)-10)}" text-anchor="middle" alignment-baseline="central" fill="${this.color}">${point.nom}</text>\n `; 
				break;
			}
		}
		return code
	}
	this.tikz = function(){
		let code = "";
		for (let point of points){
			code += `\\draw (${point.x},${point.y}) node[${point.positionLabel}] {${point.nom}};\n`;
		}
		return code
	}

}
function labelPoints(...args){
	return new LabelPoints(...args)
}

/**
* texteParPoint('mon texte',A) // Écrit 'mon texte' avec A au centre du texte
* texteParPoint('mon texte',A,'gauche') // Écrit 'mon texte' à gauche de A (qui sera la fin du texte)
* texteParPoint('mon texte',A,'droite') // Écrit 'mon texte' à droite de A (qui sera le début du texte)
* texteParPoint('mon texte',A,45) // Écrit 'mon texte' à centré sur A avec une rotation de 45°
*
* @Auteur Rémi Angot
*/
function TexteParPoint(texte,A,orientation = "milieu",color = 'black') {
	ObjetMathalea2D.call(this);
	this.color=color
	this.svg = function(coeff){
		let code =''
		if (Number.isInteger(orientation)) {
			code = `<text x="${A.xSVG(coeff)}" y="${A.ySVG(coeff)}" text-anchor="middle" alignment-baseline="central" fill="${this.color}" transform="rotate(${orientation} ${A.xSVG(coeff)} ${A.ySVG(coeff)})">${texte}</text>\n `; 
		} else {
			switch (orientation){
				case 'milieu':
				code = `<text x="${A.xSVG(coeff)}" y="${A.ySVG(coeff)}" text-anchor="middle" alignment-baseline="central" fill="${this.color}" transform="rotate(${angle} ${A.xSVG(coeff)} ${A.ySVG(coeff)})">${texte}</text>\n `; 
				break;
				case 'gauche':
				code = `<text x="${A.xSVG(coeff)}" y="${A.ySVG(coeff)}" text-anchor="end" alignment-baseline="central" fill="${this.color}">${texte}</text>\n `; 
				break;
				case 'droite':
				code = `<text x="${A.xSVG(coeff)}" y="${A.ySVG(coeff)}" text-anchor="start" alignment-baseline="central" fill="${this.color}">${texte}</text>\n `; 
				break;
			}
		}
			
		return code
	}
	this.tikz = function(){
		let anchor = '';
		if (orientation=='gauche') {
			anchor = 'east'
		}
		if (orientation=='droite') {
			anchor = 'west'
		}
		if (orientation=='milieu') {
			anchor = 'center'
		}
		let code = `\\draw (${A.x},${A.y}) node[anchor = ${anchor}] {${texte}};`;
		return code
	}

}
function texteParPoint(...args){
	return new TexteParPoint(...args)
}



/**
 * d = droite(A,B) // La droite passant par A et B
 * d = droite(A,B,'(d)') // La droite passant par A et B se nommant (d)
 * d = droite(a,b,c,'(d)') // La droite définie par les coefficients de ax +by + c=0 (équation de la droite (a,b)!=(0,0))
 * d = droite(A,B,'(d)','blue') //La droite passant par A et B se nommant (d) et de couleur bleue
 * 
 * @Auteur Jean-Claude Lhote
 */
function Droite(arg1,arg2,arg3,arg4,color='black') {
	ObjetMathalea2D.call(this);
	if (arguments.length==2) {
		this.x1 = arg1.x;
		this.y1 = arg1.y;
		this.x2 = arg2.x;
		this.y2 = arg2.y;
		this.a=calcul(this.y1-this.y2)
		this.b=calcul(this.x2-this.x1)
		this.c=calcul((this.x1-this.x2)*this.y1+(this.y2-this.y1)*this.x1)
		this.color = color;
	} else if (arguments.length==3) {
		if (typeof(arg1)=='number') { // droite d'équation ax +by +c =0
			this.a=arg1;
			this.b=arg2;
			this.c=arg3;
			this.color=color;
		}
		else {
		this.x1 = arg1.x;
		this.y1 = arg1.y;
		this.x2 = arg2.x;
		this.y2 = arg2.y;
		this.a=calcul(this.y1-this.y2)
		this.b=calcul(this.x2-this.x1)
		this.c=calcul((this.x1-this.x2)*this.y1+(this.y2-this.y1)*this.x1)
		this.name = arg3;
		this.color=color;
		}
	}
	else if (arguments.length==4) {
		if (typeof(arg1)=='number') {
			this.a=arg1;
			this.b=arg2;
			this.c=arg3;
			this.nom=nom;
			this.color=color
		}
		else {
		this.x1 = arg1.x;
		this.y1 = arg1.y;
		this.x2 = arg2.x;
		this.y2 = arg2.y;
		this.a=calcul(this.y1-this.y2)
		this.b=calcul(this.x2-this.x1)
		this.c=calcul((this.x1-this.x2)*this.y1+(this.y2-this.y1)*this.x1)
		this.nom=arg3;
		this.color=arg4;
		}
	}
	if (this.b!=0) this.pente=calcul(-this.a/this.b)
	if (this.b==0) {
		this.angleAvecHorizontale = 90
	} else {
		this.angleAvecHorizontale = calcul(Math.atan(this.pente)*180/Math.PI,1)

	}
	this.normal= vecteur(this.a,this.b)
	this.directeur= vecteur(-this.b,this.a)
	this.svg = function(coeff=20){
		let A = point(this.x1,this.y1);
		let B = point(this.x2,this.y2);
		let A1 = pointSurSegment(A,B,-10);
		let B1 = pointSurSegment(B,A,-10);
		return `<line x1="${calcul(A1.x*coeff)}" y1="${calcul(-A1.y*coeff)}" x2="${calcul(B1.x*coeff)}" y2="${calcul(-B1.y*coeff)}" stroke="${this.color}" />`
	}
	this.tikz = function() {
		let A = point(this.x1,this.y1);
		let B = point(this.x2,this.y2);
		let A1 = pointSurSegment(A,B,-10);
		let B1 = pointSurSegment(B,A,-10);
		return `\\draw[${color}] (${A1.x},${A1.y})--(${B1.x},${B1.y});`
	}
}
function droite(...args){
	return new Droite(...args)
}

/**
 * d = mediatrice(A,B) // Médiatrice de [AB]
 * d = mediatrice(A,B,'blue') // Médiatrice de [AB] en bleu
 * d = mediatrice(A,B,'blue',false) // Médiatrice de [AB] en bleu sans codage
 * 
 * @Auteur Rémi Angot
 */
function Mediatrice(A,B,color = 'black',codage = true){
	this.color = color
	this.codage = codage
	let O = pointMilieu(A,B)
	let M = pointParRotation(A,O,90)
	let N = pointParRotation(A,O,-90)
	let d = droite(M,N)
	let c = {}
	let mark = {}
	if (codage) {
		c = codageAngleDroit(M,O,B,this.color).svg()
		mark = codeSegments('X',this.color,A,O, O,B).svg()	
	}
	d.color = this.color
	this.svg = function(coeff=20){
		let code = ""
		if (codage) {
			code += codageAngleDroit(M,O,B,this.color).svg()
			code += '\n' + codeSegments('X',this.color,A,O, O,B).svg()	
		}
		code += '\n'+ d.svg(coeff)
		return code
	}
}
function mediatrice(...args){
	return new Mediatrice(...args)
}

/**
 * d = bissectrice(A,B) // Médiatrice de [AB]
 * d = bissectrice(A,B,'blue') // Médiatrice de [AB] en bleu
 * d = bissectrice(A,B,'blue',false) // Médiatrice de [AB] en bleu sans codage
 * 
 * @Auteur Rémi Angot
 */
function Bissectrice(A,O,B,color = 'black',codage = true){
	this.color = color
	let demiangle = calcul(angleOriente(A,O,B)/2)
	let m = pointSurSegment(O,A,3)
	let M = pointParRotation(m,O,demiangle)
	let d = demiDroite(O,M)	
	if (codage) {
	}
	d.color = this.color 
}
function bissectrice(...args){
	return new Bissectrice(...args)
}

/**
 * d = droiteParPointEtVecteur(A,v,'red') //Droite passant par A, de vecteur directeur v et de couleur rouge
 * @Auteur Jean-Claude Lhote
 */
function DroiteParPointEtVecteur(A,v,color='black') {
	let B = point(calcul(A.x+v.x),calcul(A.y+v.y))
	Droite.call(this,A,B)
	this.color = color
}
function droiteParPointEtVecteur(...args) {
	return new DroiteParPointEtVecteur(...args)
}
/**
 * @Auteur Jean-Claude Lhote
 */
function DroiteParPointEtParallele(A,d,color='black') {
	DroiteParPointEtVecteur.call(this,A,d.directeur,color);
}
function droiteParPointEtParallele(...args){
	return new DroiteParPointEtParallele(...args);
}
/**
 * @Auteur Jean-Claude Lhote
 */
function DroiteParPointEtPerpendiculaire(A,d,color='black'){
	DroiteParPointEtVecteur.call(this,A,d.normal,color);
}
function droiteParPointEtPerpendiculaire(...args){
	return new DroiteParPointEtPerpendiculaire(...args);
}

function DroiteHorizontaleParPoint(A,color='black'){
	DroiteParPointEtPente.call(this,A,0,color)
}
function droiteHorizontaleParPoint(...args){
	return new DroiteHorizontaleParPoint(...args);
}

function DroiteVerticaleParPoint(A,color='black'){
	DroiteParPointEtVecteur.call(this,A,vecteur(0,1),color)
}
function droiteVerticaleParPoint(...args){
	return new DroiteVerticaleParPoint(...args);
}
/**
 * 
 *@Auteur Jean-Claude Lhote
 */
function DroiteParPointEtPente(A,k,color='black') {
	let B = point(calcul(A.x+1),calcul(A.y+k));
	Droite.call(this,A,B);
	this.color = color;
}
function droiteParPointEtPente(...args) {
	return new DroiteParPointEtPente(...args)
}
/**
* * s = segment(A,B) //Segment d'extrémités A et B
* s = segment(A,B,'blue') //Segment d'extrémités A et B et de couleur bleue
* s = segment(x1,y1,x2,y2) //Segment définit par les coordonnées des deux extrémités
* s = segment(x1,y1,x2,y2,'blue') //Segment définit par les coordonnées des deux extrémités et de couleur bleue
*
* @Auteur Rémi Angot
*/
function Segment(arg1,arg2,arg3,arg4,color='black'){
	ObjetMathalea2D.call(this);
	this.color = color;
	this.extremites='';
	if (arguments.length==2) {
		this.x1 = arg1.x;
		this.y1 = arg1.y;
		this.x2 = arg2.x;
		this.y2 = arg2.y;
		this.color = color;
	} else if (arguments.length==3) {
		this.x1 = arg1.x;
		this.y1 = arg1.y;
		this.x2 = arg2.x;
		this.y2 = arg2.y
		this.color = arg3
	} else {
		this.x1 = arg1;
		this.y1 = arg2;
		this.x2 = arg3;
		this.y2 = arg4;
		this.color = color
	}
	this.extremite1 = point(this.x1,this.y1)
	this.extremite2 = point(this.x2,this.y2)
	this.longueur = calcul(Math.sqrt((this.x2-this.x1)**2+(this.y2-this.y1)**2));

	this.angleAvecHorizontale = calcul(Math.atan2(this.y2-this.y1, this.x2-this.x1)*180/Math.PI); 

	this.svg = function(coeff=20){
		let code = ''
		if (this.extremites.length>1) {
			let A = point(this.x1,this.y1)
			let B = point(this.x2,this.y2)
			if (this.extremites.substr(-1)=='|') { //si ça termine par | on le rajoute en B
				let M = pointSurSegment(B,A,.2)
				let B1 = pointParRotation(M,B,90)
				let B2 = pointParRotation(M,B,-90)
				code += `<line x1="${B1.xSVG(coeff)}" y1="${B1.ySVG(coeff)}" x2="${B2.xSVG(coeff)}" y2="${B2.ySVG(coeff)}" stroke="${this.color}" />`
			}
			if (this.extremites.substr(-1)=='>') { //si ça termine par > on rajoute une flèche en B
				let M = pointSurSegment(B,A,.2)
				let B1 = pointParRotation(B,M,90)
				let B2 = pointParRotation(B,M,-90)
				code += `<line x1="${B.xSVG(coeff)}" y1="${B.ySVG(coeff)}" x2="${B1.xSVG(coeff)}" y2="${B1.ySVG(coeff)}" stroke="${this.color}" />`
				code += `\n<line x1="${B.xSVG(coeff)}" y1="${B.ySVG(coeff)}" x2="${B2.xSVG(coeff)}" y2="${B2.ySVG(coeff)}" stroke="${this.color}" />`
			}
			if (this.extremites[0]=='<') { //si ça comment par < on rajoute une flèche en A
				let M = pointSurSegment(A,B,.2)
				let A1 = pointParRotation(A,M,90)
				let A2 = pointParRotation(A,M,-90)
				code += `<line x1="${A.xSVG(coeff)}" y1="${A.ySVG(coeff)}" x2="${A1.xSVG(coeff)}" y2="${A1.ySVG(coeff)}" stroke="${this.color}" />`
				code += `\n<line x1="${A.xSVG(coeff)}" y1="${A.ySVG(coeff)}" x2="${A2.xSVG(coeff)}" y2="${A2.ySVG(coeff)}" stroke="${this.color}" />`

			}
			if (this.extremites[0]=='|') { //si ça commence par | on le rajoute en A
				let N = pointSurSegment(A,B,.2)
				let A1 = pointParRotation(N,A,90)
				let A2 = pointParRotation(N,A,-90)
				code += `<line x1="${A1.xSVG(coeff)}" y1="${A1.ySVG(coeff)}" x2="${A2.xSVG(coeff)}" y2="${A2.ySVG(coeff)}" stroke="${this.color}" />`

			}		
		}
		return code +=`\n<line x1="${calcul(this.x1*coeff)}" y1="${calcul(-this.y1*coeff)}" x2="${calcul(this.x2*coeff)}" y2="${calcul(-this.y2*coeff)}" stroke="${this.color}" />`
	}
	this.tikz = function(){
		let tableauOptions = [];
		if (this.color.length>1 && this.color!=='black'){
			tableauOptions.push(this.color)
		}
		if (this.extremites.length>1) {
			tableauOptions.push(this.extremites)
		}
		let optionsDraw = []
		if (tableauOptions.length>0) {
			optionsDraw = "["+tableauOptions.join(',')+"]"
		}
		return `\\draw${optionsDraw} (${this.x1},${this.y1})--(${this.x2},${this.y2});`
	}
}
function segment(...args){
	return new Segment(...args)
}

/**
* s = segmentAvecExtremites(A,B) //Segment d'extrémités A et B
* s = segmentAvecExtremites(A,B,'blue') //Segment d'extrémités A et B et de couleur bleue
* s = segmentAvecExtremites(x1,y1,x2,y2) //Segment définit par les coordonnées des deux extrémités
* s = segmentAvecExtremites(x1,y1,x2,y2,'blue') //Segment définit par les coordonnées des deux extrémités et de couleur bleue
*
* @Auteur Rémi Angot
*/
function SegmentAvecExtremites(...args){
	Segment.call(this,...args);
	this.extremites='|-|'
}
function segmentAvecExtremites(...args){
	return new SegmentAvecExtremites(...args)
}

/**
* * s = DemiDroite(A,B) //Segment d'extrémités A et B
* s = DemiDroite(A,B,'blue') //Segment d'extrémités A et B et de couleur bleue
*
* @Auteur Rémi Angot
*/
function DemiDroite(A,B,color='black'){
	let B1 = pointSurSegment(B,A,-10)
	return segment(A,B1,color);
}
function demiDroite(...args){
	return new DemiDroite(...args)
}

/**
* * s = DemiDroiteAvecExtremite(A,B) //Segment d'extrémités A et B
* s = DemiDroiteAvecExtremite(A,B,'blue') //Segment d'extrémités A et B et de couleur bleue
*
* @Auteur Rémi Angot
*/
function DemiDroiteAvecExtremite(A,B,color='black'){
	let B1 = pointSurSegment(B,A,-10)
	Segment.call(this,A,B1,color);
	this.extremites='|-'
}
function demiDroiteAvecExtremite(...args){
	return new DemiDroiteAvecExtremite(...args)
}

/**
* tracePoint(A) // Place une croix à l'emplacement du point A
* tracePoint(A,.5) //Place une croix de taille 5 mm à l'emplacement du point A
* tracePoint(A,.5,'blue') //Place une croix bleue de taille 5 mm à l'emplacement du point A
* tracePoints(A,B,C,D) // Place une croix pour les différents points
* La taille n'a un effet que sur la sortie SVG
* @Auteur Rémi Angot
*/
function TracePoint(A,taille=0.3,color='black'){
	ObjetMathalea2D.call(this);
	this.color = color;
	this.svg = function(coeff=20){
		let code = `<line x1="${calcul((A.x-taille)*coeff)}" y1="${calcul((-A.y-taille)*coeff)}" x2="${calcul((A.x+taille)*coeff)}" y2="${calcul((-A.y+taille)*coeff)}" stroke="${this.color}" />`
		code += `\n<line x1="${calcul((A.x-taille)*coeff)}" y1="${calcul((-A.y+taille)*coeff)}" x2="${calcul((A.x+taille)*coeff)}" y2="${calcul((-A.y-taille)*coeff)}" stroke="${this.color}" />`
		return code 
	}
	this.tikz = function(){
		return `\\node[point] at (${A.x},${A.y}) {};`
	}
}
function tracePoint(...args){
	return new TracePoint(...args)
}
function TracePoints(...points){
	ObjetMathalea2D.call(this);
	this.svg = function(coeff){
		let code = ''
		for (let point of points){
			code += tracePoint(point).svg()
			code += '\n'
		}
		return code
	}
}
function tracePoints(...args){
	return new TracePoints(...args)
}


/**
* polygone(A,B,C,D,E) //Trace ABCDE
* polygone([A,B,C,D],"blue") // Trace ABCD en bleu
* @Auteur Rémi Angot
*/
function Polygone(...points){
	ObjetMathalea2D.call(this);
	if (Array.isArray(points[0])) { //Si le premier argument est un tableau
		this.listePoints = points[0]
		if (points[1]) {
			this.color = points[1]
		}
		this.nom = this.listePoints.join()
	} else {
		this.listePoints = points
		this.nom = this.listePoints.join()
	}
	this.svg = function(coeff=20){
		let binomeXY = "";
		for (let point of this.listePoints){
			binomeXY += `${calcul(point.x*coeff)},${calcul(-point.y*coeff)} `; 
		}
		return `<polygon points="${binomeXY}" fill="none" stroke="${this.color}" />`
	}
	this.tikz = function(){
		let binomeXY = "";
		for (let point of this.listePoints){
			binomeXY += `(${point.x},${point.y})--`
		}
		return `\\draw ${binomeXY}cycle;`
	}

}
function polygone(...args){
	return new Polygone(...args)
}

/**
* polyline(A,B,C,D,E) //Trace la ligne brisée ABCDE
*
* @Auteur Rémi Angot
*/
function Polyline(...points){
	ObjetMathalea2D.call(this);
	if (Array.isArray(points[0])) { //Si le premier argument est un tableau
		this.listePoints = points[0]
		this.color = points[1]
	} else {
		this.listePoints = points
	}
	this.nom = '';
	for (let point of points){
		this.nom += point.nom
	}
	this.svg = function(coeff=20){
		if (this.isVisible) {
			let binomeXY = "";
			for (let point of this.listePoints){
				binomeXY += `${calcul(point.x*coeff)},${calcul(-point.y*coeff)} `; 
			}
			return `<polyline points="${binomeXY}" fill="none" stroke="${this.color}" />`
		}
			
	}
	this.tikz = function(){
		let binomeXY = "";
		for (let point of this.listePoints){
			binomeXY += `(${point.x},${point.y})--`
		}
		binomeXY = binomeXY.substr(0,binomeXY.length-2)
		return `\\draw ${binomeXY};`
	}

}
function polyline(...args){
	return new Polyline(...args)
}
/**
* polygoneParTranslation(p,A,B) //Trace l'image de p dans la translation qui transfome A en B
*
* @Auteur Rémi Angot
*/
function PolygoneParTranslation2Points(p,A,B){
	Polygone.call(this);
	let p2=[]
	for (let i = 0 ; i < p.listePoints.length ; i++ ){
  		p2[i] = pointParTranslation2Points(p.listePoints[i],A,B)
	}
	return polygone(p2)
}
function polygoneParTranslation2Points(...args){
	return new PolygoneParTranslation2Points(...args)
}

/**
* polygoneParTranslation(p,v) //Trace l'image de p dans la translation de vecteur v
*
* @Auteur Rémi Angot
*/
function PolygoneParTranslation(p,v){
	Polygone.call(this);
	let p2=[]
	for (let i = 0 ; i < p.listePoints.length ; i++ ){
  		p2[i] = pointParTranslation(p.listePoints[i],v)
	}
	return polygone(p2)
}
function polygoneParTranslation(...args){
	return new PolygoneParTranslation(...args)
}

/**
* polygoneParTranslation(p,v) //Trace l'image de p dans la translation de vecteur v
* polygoneParTranslationAnimee(p,v,'blue','dur="2s" repeatCount=3') // Polygone en bleu, animation de 2s répétée 3 fois
*
*
* @Auteur Rémi Angot
*/

function PolygoneParTranslationAnimee(p,v,color,animation='dur="2s" repeatCount="indefinite"'){
	Polygone.call(this);
	this.color = color
	let p2=[]
	for (let i = 0 ; i < p.listePoints.length ; i++ ){
  		p2[i] = pointParTranslation(p.listePoints[i],v)
	}
	this.svg = function(coeff=20){
		let copieDuPolygone = p
		copieDuPolygone.color = color
		let code =  `<g> ${p.svg(coeff)}`
		code += `<animateMotion path="M 0 0 l ${v.xSVG(coeff)} ${v.ySVG(coeff)} " ${animation} />`
   		code += `</polygon></g>`
		return code
	}

}

function polygoneParTranslationAnimee(...args){
	return new PolygoneParTranslationAnimee(...args)
}

/**
* polygoneParHomothetie(p,O,k) //Trace l'image de p dans l'homothétie de centre O et de rapport k
*
* @Auteur Rémi Angot
*/
function PolygoneParHomothetie(p,O,k){
	Polygone.call(this);
	let p2=[]
	for (let i = 0 ; i < p.listePoints.length ; i++ ){
  		p2[i] = pointParHomothetie(p.listePoints[i],O,k)
	}
	return polygone(p2)
}
function polygoneParHomothetie(...args){
	return new PolygoneParHomothetie(...args)
}

/**
* polygoneParRotation(p,O,a) //Trace l'image de p dans la rotation de centre O et d'angle a
*
* @Auteur Rémi Angot
*/
function PolygoneParRotation(p,O,angle,color){
	Polygone.call(this);
	this.color = color
	let p2=[]
	for (let i = 0 ; i < p.listePoints.length ; i++ ){
  		p2[i] = pointParRotation(p.listePoints[i],O,angle)
	}
	return polygone(p2)
}
function polygoneParRotation(...args){
	return new PolygoneParRotation(...args)
}

/**
* segmentParRotation(s,O,a) //Trace l'image de s dans la rotation de centre O et d'angle a
*
* @Auteur Rémi Angot
*/
function SegmentParRotation(s,O,angle,color='black'){
	Segment.call(this);
	this.color = color
	let A = pointParRotation(s.extremite1,O,angle)
	let B = pointParRotation(s.extremite2,O,angle)
	this.x1 = A.x
	this.y1 = A.y
	this.x2 = B.x
	this.y2 = B.y
}
function segmentParRotation(...args){
	return new SegmentParRotation(...args)
}

/**
* new DroiteParRotation(d,O,a) //Trace l'image de d dans la rotation de centre O et d'angle a
*
* @Auteur Rémi Angot
*/
function DroiteParRotation(d,O,angle,color='black'){
	this.color = color
	let A = point(d.x1,d.y1)
	let B = point(d.x2,d.y2)
	let A2 = pointParRotation(A,O,angle)
	let B2 = pointParRotation(B,O,angle)
	return droite(A2,B2)
}

/**
* new DemiDroiteParRotation(d,O,a) //Trace l'image de d dans la rotation de centre O et d'angle a
*
* @Auteur Rémi Angot
*/
function DemiDroiteParRotation(d,O,angle,color='black'){
	this.color = color
	let A = point(d.x1,d.y1)
	let B = point(d.x2,d.y2)
	let A2 = pointParRotation(A,O,angle)
	let B2 = pointParRotation(B,O,angle)
	return demiDroite(A2,B2)
}

/**
* rotation(objet,O,a) //Trace l'image d'un objet (point, droite, demi-droite, segment, polygone) dans la rotation de centre O et d'angle a
*
* @Auteur Rémi Angot
*/
function rotation(...args){
	if (args[0].constructor==Segment) {
		return new SegmentParRotation(...args)
	}
	if (args[0].constructor==Polygone) {
		return new PolygoneParRotation(...args)
	}
	if ([Point,PointMilieu,PointSurSegment,PointParHomothetie,PointParTranslation,PointParTranslation2Points,PointParRotation,PointParProjectionOrtho,PointParSymetrieAxiale].includes(args[0].constructor)) {
		return new PointParRotation(...args)
	}
	if (args[0].constructor==Droite) {
		return new DroiteParRotation(...args)
	}
	if (args[0].constructor==DemiDroite) {
		return new DemiDroiteParRotation(...args)
	}
}

/**
* translation(objet,O,a) //Trace l'image d'un objet (point, droite, demi-droite, segment, polygone) dans la translation de centre O et d'angle a
*
* @Auteur Rémi Angot
*/
function translation(...args){
	if (args[0].constructor==Segment) {
		return new SegmentParTranslation(...args)
	}
	if (args[0].constructor==Polygone) {
		return new PolygoneParTranslation(...args)
	}
	if ([Point,PointMilieu,PointSurSegment,PointParHomothetie,PointParTranslation,PointParTranslation2Points,PointParRotation,PointParProjectionOrtho,PointParSymetrieAxiale].includes(args[0].constructor)) {
		return new PointParTranslation(...args)
	}
	if (args[0].constructor==Droite) {
		return new DroiteParTranslation(...args)
	}
	if (args[0].constructor==DemiDroite) {
		return new DemiDroiteParTranslation(...args)
	}
}

/**
* segmentParRotationAnimee(s,O,a) //Trace l'image de s dans la rotation de centre O et d'angle a
*
* @Auteur Rémi Angot
*/
function SegmentParRotationAnimee(s,O,angle,color='black',animation='begin="0s" dur="2s" repeatCount="indefinite"'){
	ObjetMathalea2D.call(this)
	this.color = color
	this.svg = function(coeff){
		let code =  `<g> ${s.svg(coeff)}`
		code += `<animateTransform
   attributeName="transform"
   type="rotate"
   from="0 ${O.xSVG(coeff)} ${O.ySVG(coeff)}"
   to="${angle} ${O.xSVG(coeff)} ${O.ySVG(coeff)}"
	${animation}
		/>`
   		code += `</g>`
		return code
		
	}
	
}
function segmentParRotationAnimee(...args){
	return new SegmentParRotationAnimee(...args)
}


function RotationAnimee(liste,O,angle,animation='begin="0s" dur="2s" repeatCount="indefinite"'){
	ObjetMathalea2D.call(this)
	this.svg = function(coeff){
		let code =  `<g> `
		if (Array.isArray(liste)) {
			for(const objet of liste){
				code += '\n' + objet.svg(coeff)
			}
		} else { //si ce n'est pas une liste
				code += '\n' + liste.svg(coeff)
		}
			
		code += `<animateTransform
   attributeName="transform"
   type="rotate"
   from="0 ${O.xSVG(coeff)} ${O.ySVG(coeff)}"
   to="${angle} ${O.xSVG(coeff)} ${O.ySVG(coeff)}"
	${animation}
		/>`
   		code += `</g>`
		return code
		
	}
	
}
function rotationAnimee(...args){
	return new RotationAnimee(...args)
}

function TranslationAnimee(liste, v, animation = 'begin="0s" dur="2s" repeatCount="indefinite"'){
	ObjetMathalea2D.call(this)
	this.svg = function(coeff){
		let code =  `<g> `
		if (Array.isArray(liste)) {
			for(const objet of liste){
				code += '\n' + objet.svg(coeff)
			}
		} else { //si ce n'est pas une liste
				code += '\n' + liste.svg(coeff)
		}
			
		code += `<animateMotion path="M 0 0 l ${v.xSVG(coeff)} ${v.ySVG(coeff)} " ${animation} />`
   		code += `</g>`
		return code
		
	}
	
}
function translationAnimee(...args){
	return new TranslationAnimee(...args)
}

/**
* polygoneParSymetrieAxiale(p,d) //Trace l'image de p dans la symétrie d'axe (d)
*
* @Auteur Rémi Angot
*/
function PolygoneParSymetrieAxiale(p,d){
	Polygone.call(this);
	let p2=[]
	for (let i = 0 ; i < p.listePoints.length ; i++ ){
  		p2[i] = pointParSymetrieAxiale(p.listePoints[i],d)
	}
	return polygone(p2)
}
function polygoneParSymetrieAxiale(...args){
	return new PolygoneParSymetrieAxiale(...args)
}

/**
* carre(A,B) //Trace le carré direct qui a pour côté [AB] et code les 4 angles droits et 4 côtés de même longueur
* carre(A,B,'blue') //Trace en bleu le carré direct qui a pour côté [AB] et code les 4 angles droits et 4 côtés de même longueur
* carre(A,B,'blue',false) //Trace en bleu le carré direct qui a pour côté [AB] sans codages
* carre(A,B,'blue','S','red') //Trace en bleu le carré direct qui a pour côté [AB] et code les 4 angles droits et 4 côtés de même longueur avec la marque choisie en rouge
*
* @Auteur Rémi Angot
*/
function Carre(A,B,color,codage=true,mark='X',colorcodage){
	ObjetMathalea2D.call(this)
	this.color = color
	colorcodage ? this.colorcodage = colorcodage : this.colorcodage = color;
	let c = pointParRotation(A,B,-90)
	let d = pointParRotation(B,A,90)
	this.listePoints = [A,B,c,d]
	if (codage) {
		let codage1 = codageAngleDroit(d,c,B,this.colorcodage)
		let codage2 = codageAngleDroit(c,B,A,this.colorcodage)
		let codage3 = codageAngleDroit(A,d,c,this.colorcodage)
		let codage4 = codageAngleDroit(B,A,d,this.colorcodage)
		let codage = codeSegments(mark,this.colorcodage,this.listePoints)
	}
	return polygone(this.listePoints,color)
}
function carre(...args){
	return new Carre(...args)
}

/**
* carreIndirect(A,B) //Trace le carré indirect qui a pour côté [AB] et code les 4 angles droits
*
* @Auteur Rémi Angot
*/
function CarreIndirect(A,B,color,codage=true,mark='X',colorcodage){
	ObjetMathalea2D.call(this)
	this.color = color
	colorcodage ? this.colorcodage = colorcodage : this.colorcodage = color;
	let c = pointParRotation(A,B,90)
	let d = pointParRotation(B,A,-90)
	this.listePoints = [A,B,c,d]
	if (codage) {
		let codage1 = codageAngleDroit(d,c,B,this.colorcodage)
		let codage2 = codageAngleDroit(c,B,A,this.colorcodage)
		let codage3 = codageAngleDroit(A,d,c,this.colorcodage)
		let codage4 = codageAngleDroit(B,A,d,this.colorcodage)
		let codage = codeSegments(mark,this.colorcodage,this.listePoints)
	}
	return polygone(this.listePoints,color)
}
function carreIndirect(...args){
	return new CarreIndirect(...args)
}

/**
* polygoneRegulier(A,B,n) //Trace le polygone régulier direct à n côtés qui a pour côté [AB]
*
* @Auteur Rémi Angot
*/
function PolygoneRegulier(A,B,n,color='black'){
	Polygone.call(this)
	this.color = color
	let p = [A,B]
	for (let i=1 ; i<n-1 ; i++){
		p[i+1] = pointParRotation(p[i-1],p[i],calcul(180-360/n))
	}
	this.listePoints = p
}
function polygoneRegulier(...args){
	return new PolygoneRegulier(...args)
}

/**
* polygoneRegulierIndirect(A,B,n) //Trace le polygone régulier indirect à n côtés qui a pour côté [AB]
* p = polygoneRegulierIndirect (A,B,8) 
* C = p.listePoints[2]
* C.nom = 'C'
//Renvoie les sommets de l'hexagone
*
* @Auteur Rémi Angot
*/
function PolygoneRegulierIndirect(A,B,n,color='black'){
	Polygone.call(this)
	this.color = color
	let p = [A,B]
	for (let i=1 ; i<n-1 ; i++){
		p[i+1] = pointParRotation(p[i-1],p[i],calcul(-180+360/n))
	}
	this.listePoints = p
}
function polygoneRegulierIndirect(...args){
	return new PolygoneRegulierIndirect(...args)
}

/**
* polygoneRegulierParCentreEtRayon(O,r,n) //Trace le polygone régulier à n côtés et de rayon r
* let [A,B,C,D] = polygoneRegulierParCentreEtRayon(O,r,4) //Renvoie les 4 sommets du carré
*
* @Auteur Rémi Angot
*/
function PolygoneRegulierParCentreEtRayon(O,r,n,color='black'){
	Polygone.call(this)	
	this.color = color
	let p = [];
	p[0] = point(calcul(O.x+r),O.y);
	for (let i=1; i<n ; i++){
		p[i] = pointParRotation(p[i-1],O,calcul(-360/n))
	}
 	this.listePoints = p
 }
function polygoneRegulierParCentreEtRayon(...args){
	return new PolygoneRegulierParCentreEtRayon(...args)
}

/**
 * v = vecteur('V') // son nom
 * v = vecteur(x,y) // ses composantes
 * v = vecteur(A,B) // son origine et son extrémité (deux Points)
 * v = vecteur(x,y,'v') // son nom et ses composantes.
 * 
 * @Auteur Jean-Claude Lhote et Rémi Angot
 */
function Vecteur(arg1,arg2,nom='')  {
	ObjetMathalea2D.call(this);
	if (arguments.length==1) {
		this.nom = arg1
	} else {
		if (typeof(arg1)=='number') {
			this.x = arg1;
			this.y = arg2;
		} else {
			this.x = calcul(arg2.x-arg1.x);
			this.y = calcul(arg2.y-arg1.y);
		
		}
		this.nom = nom
	}
	this.norme = function () {
		return calcul(Math.sqrt(this.x**2+this.y**2))
	}
	this.oppose = function() {
		this.x=-this.x
		this.y=-this.y
	}
	this.xSVG = function(coeff=20) {
		return this.x*coeff;
	}
	this.ySVG = function(coeff=20) {
		return -this.y*coeff;
	}
	this.representant = function(A){
		let B = point(A.x+this.x,A.y+this.y)
		let s = segment(A,B)
		s.extremites = '|->'
	}

	
}
function vecteur(...args){
	return new Vecteur(...args)
}

/**
* * c = cercle(O,r) //Cercle de centre O et de rayon r
*
* @Auteur Rémi Angot
*/
function Cercle(O,r,color = 'black'){
	ObjetMathalea2D.call(this);
	this.color = color;
	
	this.svg = function(coeff=20){
		return `<circle cx="${O.xSVG(coeff)}" cy="${O.ySVG(coeff)}" r="${r*coeff}" stroke="${this.color}" fill="none"/> />`
	}
	this.tikz = function(){
		return `\\draw (${O.x},${O.y}) circle (${r});`
	}
}
function cercle(...args){
	return new Cercle(...args)
}

/**
*  c = cercle(O,r) //Cercle de centre O et de rayon r
*
* @Auteur Rémi Angot
*/
function CercleCentrePoint(O,M,color = 'black'){
	Cercle.call(this,O,longueur(O,M),color);
}
function cercleCentrePoint(...args){
	return new CercleCentrePoint(...args)
}

/**
*  repere(xmin,ymin,xmax,ymax,thick)
*
* @Auteur Rémi Angot
*/

function Repere(xmin=-1,ymin=-10,xmax=30,ymax=10,thick=.2){
	let objets = []
	objets.push(segment(xmin,0,xmax,0), segment(0,ymin,0,ymax) )
	for (let x=xmin ; x<=xmax ; x++){
	  objets.push(segment(x,-thick,x,thick))
	}
	for (let y=ymin ; y<=ymax ; y++){
	  objets.push(segment(-thick,y,thick,y))
	}
	this.svg = function(coeff=20){
		return codeSvg(...objets)
	}
	this.tikz = function(coeff=20){
		return codeTikz(...objets)
	}
	this.commentaire = `Repère(xmin = ${xmin}, ymin = ${ymin}, xmax = ${xmax}, ymax = ${ymax}, thick = ${thick})`

}
function repere(...args){
	return new Repere(...args)
}

	



/**
 * codageAngleDroit(A,O,B) //Fait un codage d'angle droit de 3 mm pour l'angle direct AOB
 * codageAngleDroit(A,O,B,.5) //Fait un codage d'angle droit de 5 mm pour l'angle direct AOB
 * 
 * @Auteur Rémi Angot
 */
function CodageAngleDroit(A,O,B,color='black',d = .3)  {
	ObjetMathalea2D.call(this);
	this.color = color;
	let a = pointSurSegment(O,A,d);
	let b = pointSurSegment(O,B,d);
	let o = {};
	if (angleOriente(A,O,B)>0) {
		o = pointParRotation(O,a,-90)
	} else {
		o = pointParRotation(O,a,90)
	}
	this.svg = function(coeff){
		polyline([a,o,b],color).svg(coeff)
	}
	return polyline([a,o,b],color)
	
}
function codageAngleDroit(...args){
	return new CodageAngleDroit(...args)
}

/**
 * CoteSegment(A,B) // Note la longueur de [AB] au dessus si A est le point le plus à gauche sinon au dessous
 * 
 * @Auteur Rémi Angot
 */
function CoteSegment(A,B,color='black',d = .5)  {
	ObjetMathalea2D.call(this);
	this.color = color;
	let O = pointMilieu(A,B)
	let M = pointParRotation(A,O,-90)
	let N = pointSurSegment(O,M,d)
	let s = segment(A,B)
	s.isVisible = false
	let longueur = string_nombre(arrondi(s.longueur,1))
	let angle
	if (B.x>A.x) {
		angle = -parseInt(s.angleAvecHorizontale)
	} else {
		angle = 180-parseInt(s.angleAvecHorizontale)
	}
	return texteParPoint(longueur,N,angle,this.color)
	
}
function coteSegment(...args){
	return new CoteSegment(...args)
}

/**
 * CodeSegment(A,B,'X','blue') // Code le segment [AB] avec une croix bleue
 * Attention le premier argument ne peut pas être un segment 
 *
 * @Auteur Rémi Angot
 */
function CodeSegment(A,B,mark='||',color='black')  {
	ObjetMathalea2D.call(this);
	this.color = color;
	let O = pointMilieu(A,B)
	let s = segment(A,B)
	s.isVisible = false
	let angle
	if (B.x>A.x) {
		angle = -parseInt(s.angleAvecHorizontale)
	} else {
		angle = 180-parseInt(s.angleAvecHorizontale)
	}
	return texteParPoint(mark,O,angle,this.color)
	
}
function codeSegment(...args){
	return new CodeSegment(...args)
}

/**
 * codeSegments('X','blue',A,B, B,C, C,D) // Code les segments [AB], [BC] et [CD] avec une croix bleue
 * codeSegments('X','blue',[A,B,C,D]) // Code les segments [AB], [BC], [CD] et [DA] (attention, chemin fermé,pratique pour des polygones pas pour des lignes brisées)
 * codeSegments('X','blue',s1,s2,s3) // Code les segments s1, s2 et s3 avec une croix bleue
 * codeSegments('X','blue',p.listePoints) // Code tous les segments du polygone avec une croix bleue
 *
 * @Auteur Rémi Angot
 */
function CodeSegments(mark = '||',color = 'black',...args)  {
	ObjetMathalea2D.call(this);
	this.svg = function(coeff=20){
		let code = ''
		if (Array.isArray(args[0])) { // Si on donne une liste de points
			for (let i = 0; i < args[0].length-1; i++) {
				code += codeSegment(args[0][i],args[0][i+1],mark,color).svg(coeff)
				code += '\n'
			}
				code += codeSegment(args[0][args[0].length-1],args[0][0],mark,color).svg(coeff)
				code += '\n'
		} else if (args[0].constructor==Segment) {
			for (let i = 0; i < args.length; i++) {
				code += codeSegment(args[i].extremite1,args[i].extremite2,mark,color).svg(coeff)
				code += '\n'
			}
		}else {
			for (let i = 0; i < args.length; i+=2) {
				code += codeSegment(args[i],args[i+1],mark,color).svg(coeff)
				code += '\n'
			}
		}
		return code
	}	
	
}
function codeSegments(...args){
	return new CodeSegments(...args)
}

/**
* longueur(A,B) renvoie la distance de A à B
*
* @Auteur Rémi Angot
*/
function longueur(A,B){
	return calcul(Math.sqrt((B.x-A.x)**2+(B.y-A.y)**2));
}

/**
* norme(V) renvoie la norme du vecteur
*
* @Auteur Rémi Angot
*/
function norme(v){
	return calcul(Math.sqrt(v.x**2+v.y**2))
}

/**
* angle(A,O,B) renvoie l'angle AOB en degré
*
* @Auteur Rémi Angot
*/
function angle(A,O,B){
	let OA = longueur(O,A);
	let OB = longueur(O,B);
	let AB = longueur(A,B);
	return calcul(Math.acos((AB**2-OA**2-OB**2)/(-2*OA*OB))*180/Math.PI,2)
}

/**
 * Retourne la valeur signée de l'angle AOB en degré.
 * @Auteur Jean-Claude Lhote
 */
function angleOriente(A,O,B){
	let A2 = pointParRotation(A,O,90);
	let v=Vecteur(O,B),u=Vecteur(O,A2)
	return unSiPositifMoinsUnSinon(v.x*u.x+v.y*u.y)*angle(A,O,B)
}
/**
* angleradian(A,O,B) renvoie l'angle AOB en radian
*
* @Auteur Rémi Angot
*/
function angleradian(A,O,B){
	let OA = longueur(O,A);
	let OB = longueur(O,B);
	let AB = longueur(A,B);
	let cos = calcul((AB**2-OA**2-OB**2)/(-2*OA*OB),.1)
	return calcul(Math.acos((AB**2-OA**2-OB**2)/(-2*OA*OB)),2)
}

/**
* nommePolygone(p1,'ABCDEF') // Nomme tous les sommets de p1 (dans l'ordre de création des points)
* @Auteur Rémi Angot
*/
function nommePolygone(p,nom){
	for (let i=0 ; i < p.listePoints.length ; i++){
  		p.listePoints[i].nom = nom[i] 
	}
	labelPoints(p.listePoints)
}


/**
* deplaceLabel(p1,'AB','below') // Si il y a un point nommé 'A' ou 'B' dans le polygone son nom sera mis en dessous du point
* @Auteur Rémi Angot
*/
function deplaceLabel(p,nom,positionLabel){
	for (let i=0 ; i < p.listePoints.length ; i++){
		for (let lettre in nom){
			if (p.listePoints[i].nom == nom[lettre]){
	  			p.listePoints[i].positionLabel = positionLabel
	  			labelPoints(p.listePoints[i])
	  		}
		}
	  		
	} 
}


/**
* codeSvg(segment(A,B),polygone(D,E,F),labelPoints(A,B))
*
* @Auteur Rémi Angot
*/
function codeSvg(...objets){
	let code = ''
	code = `<svg width="600" height="400" viewBox="-20 -200 600 400" xmlns="http://www.w3.org/2000/svg">\n`
	for (let objet of objets){
		if (Array.isArray(objet)) {
			for (let i = 0; i < objet.length; i++) {
				try {
					if (objet[i].isVisible) {
						code += '\t' + objet[i].svg() + '\n'
					}
				} catch (error){
					
				}
			}
		}
		try {
			if (objet.isVisible) {
				code +=objet.svg() + '\n';
			}
		} catch (error) {
  			
  		}
	}
	code += `</svg>`;
	return code;
}

/**
* codeTikz(segment(A,B),polygone(D,E,F),labelPoints(A,B))
*
* @Auteur Rémi Angot
*/
function codeTikz(...objets){
	let code = ''
	code = `\\begin{tikzpicture}\n
\\tikzset{
    point/.style={
        thick,
        draw,
        cross out,
        inner sep=0pt,
        minimum width=5pt,
        minimum height=5pt,
    },
}\n\n`
	for (let objet of objets){
		if (Array.isArray(objet)) {
			for (let i = 0; i < objet.length; i++) {
				try {
					code += '\t' + objet[i].tikz() + '\n'
				} catch (error){

				}
			}
		}
		try {
			code += '\t' + objet.tikz() + '\n'
		} catch (error) {
  			
  		}
	}
	code += `\\end{tikzpicture}\n`
	return code;
}



