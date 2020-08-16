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

coeff = 20

/*
* Classe parente de tous les objets de MathALEA2D
*
* @Auteur Rémi Angot
*/
function ObjetMathalea2D() {
	this.positionLabel = 'above';
	this.isVisible = true;
	this.color = 'black';
	this.style = '' //stroke-dasharray="4 3" pour des hachures //stroke-width="2" pour un trait plus épais
	this.styleTikz = '';
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
	this.xSVG = function(coeff) {
		return this.x*coeff;
	}
	this.ySVG = function(coeff) {
		return -this.y*coeff;
	}
	if (!this.nom) {
		this.nom = ' '; // Le nom d'un point est par défaut un espace
		// On pourra chercher tous les objets qui ont ce nom pour les nommer automatiquement
	}

}
function point(...args){
	return new Point(...args)
}

/**
* tracePoint(A) // Place une croix à l'emplacement du point A
* tracePoint(A,B,C,D) // Place une croix pour les différents points
* tracePoint(A,B,C,D,'blue') // Place une croix pour les différents points
* @Auteur Rémi Angot
*/
function TracePoint(...points){
	ObjetMathalea2D.call(this);
	this.taille=0.3
	if (typeof points[points.length-1] === 'string') {
		this.color = points[points.length-1]
	}
	this.svg = function(coeff){
		let code = ''
		for (let A of points){
			if (A.constructor == Point){
				code += `<line x1="${calcul((A.x-this.taille)*coeff)}" y1="${calcul((-A.y-this.taille)*coeff)}" x2="${calcul((A.x+this.taille)*coeff)}" y2="${calcul((-A.y+this.taille)*coeff)}" stroke="${this.color}" />`
				code += `\n\t<line x1="${calcul((A.x-this.taille)*coeff)}" y1="${calcul((-A.y+this.taille)*coeff)}" x2="${calcul((A.x+this.taille)*coeff)}" y2="${calcul((-A.y-this.taille)*coeff)}" stroke="${this.color}" />`
			}
				
		}
		return code 
	}
	this.tikz = function(){
		let code = ''
		for (let A of points){
			if (A.constructor == Point){
				if (color =='black') {
					code += `\n\\node[point] at (${A.x},${A.y}) {};`
				} else {
					return `\n\\node[point,${color}] at (${A.x},${A.y}) {};`
				}	 
			}
		}
	return code		
	}
}
function tracePoint(...args){ 
	return new TracePoint(...args)
}

function tracePointSurDroite(A,O){
	if (O.constructor == Point) {
		let M = pointSurSegment(A,O,.2)
		let A1 = rotation(M,A,90)
		let A2 = rotation(M,A,-90)
		return segment(A1,A2)
	}
	if (O.constructor == Droite) {
		let d = droiteParPointEtPerpendiculaire(A,O)
		d.isVisible = false
		let A1 = pointSurSegment(point(d.x1,d.y1),point(d.x2,d.y2),.2)
		let A2 = pointSurSegment(point(d.x1,d.y1),point(d.x2,d.y2),-.2)
		return segment(A1,A2)
	}
		
}

/**
* M = milieu(A,B) //M est le milieu de [AB]
* M = milieu(A,B,'M') //M est le milieu [AB] et se nomme M
* M = milieu(A,B,'M','below') //M est le milieu [AB], se nomme M et le nom est en dessous du point
*
* @Auteur Rémi Angot
*/
function milieu(A,B,nom,positionLabel= 'above'){
	ObjetMathalea2D.call(this)
	let x = calcul((A.x+B.x)/2);
	let y = calcul((A.y+B.y)/2);
	return new Point(x,y,nom,positionLabel)
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
function pointSurSegment(A,B,l,nom,positionLabel= 'above'){
	if (l===undefined || typeof l =='string') {
		l = calcul(longueur(A,B)*randint(15,85)/100)
	}
	return homothetie(B,A,calcul(l/longueur(A,B)),nom,positionLabel)
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
 function pointSurCercle(c,angle,nom,positionLabel= 'above'){
 	if (typeof(angle)!='number') angle=randint(-180,180)
 		let x=c.centre.x+c.rayon*Math.cos(Math.radians(angle))
 	let y=c.centre.y+c.rayon*Math.sin(Math.radians(angle))
 	return point(x,y,nom,positionLabel)
 }

/**
* M = pointIntersectionDD(d1,d2,'M','below') //M est le point d'intersection des droites (d1) et (d2)
*
* @Auteur Jean-Claude Lhote
*/
function pointIntersectionDD(d,f,nom='',positionLabel = 'above'){
	let y = calcul((-f.c+d.c*f.a/d.a)/(f.b-f.a*d.b/d.a))
	let x = calcul(-d.c/d.a-d.b*y/d.a)
	return point(x,y,nom,positionLabel)
}

/**
* labelPoint(A,B) pour nommer les points A et B
* Le nombre d'arguments n'est pas limité
*
* @Auteur Rémi Angot
*/
function LabelPoint(...points) {
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
				code += `\t<text x="${calcul(point.xSVG(coeff)-15)}" y="${point.ySVG(coeff)}" text-anchor="middle" dominant-baseline="central" fill="${this.color}">${point.nom}</text>\n `; 
				break;
				case 'right':
				code += `\t<text x="${calcul(point.xSVG(coeff)+15)}" y="${point.ySVG(coeff)}" text-anchor="middle" dominant-baseline="central" fill="${this.color}">${point.nom}</text>\n `; 
				break;
				case 'below':
				code += `\t<text x="${point.xSVG(coeff)}" y="${calcul(point.ySVG(coeff)+15)}" text-anchor="middle" dominant-baseline="central" fill="${this.color}">${point.nom}</text>\n `; 
				break;
				case 'above':
				code += `\t<text x="${point.xSVG(coeff)}" y="${calcul(point.ySVG(coeff)-15)}" text-anchor="middle" dominant-baseline="central" fill="${this.color}">${point.nom}</text>\n `; 
				break;
				case 'above right':
				code += `\t<text x="${calcul(point.xSVG(coeff)+15)}" y="${calcul(point.ySVG(coeff)-15)}" text-anchor="middle" dominant-baseline="central" fill="${this.color}">${point.nom}</text>\n `; 
				break;
				case 'below left':
				code += `\t<text x="${calcul(point.xSVG(coeff)-15)}" y="${calcul(point.ySVG(coeff)+15)}" text-anchor="middle" dominant-baseline="central" fill="${this.color}">${point.nom}</text>\n `; 
				break;
				case 'below right':
				code += `\t<text x="${calcul(point.xSVG(coeff)+15)}" y="${calcul(point.ySVG(coeff)+15)}" text-anchor="middle" dominant-baseline="central" fill="${this.color}">${point.nom}</text>\n `; 
				break;
				default :
				code += `\t<text x="${calcul(point.xSVG(coeff)-15)}" y="${calcul(point.ySVG(coeff)-15)}" text-anchor="middle" dominant-baseline="central" fill="${this.color}">${point.nom}</text>\n `; 
				break;
			}
		}
		return code
	}
	this.tikz = function(){
		let code = "";
		let style = ""
		if (this.color != 'black') {
			style = `,${this.color}`
		}
		for (let point of points){
			code += `\t\\draw (${point.x},${point.y}) node[${point.positionLabel}${style}] {$${point.nom}$};\n`;
		}
		return code
	}

}
function labelPoint(...args){
	return new LabelPoint(...args)
}	
/**
 * P = barycentre(p,'P','below') Crée le point P barycentre du polygone p, son nom 'P' sera placé sous le point si il est tracé et labelisé.
 * @param {Polygone} p 
 * @Auteur Jean-Claude Lhote
 */
function barycentre(p,nom,positionLabel= 'above') {
	ObjetMathalea2D.call(this)
	let sommex=0,sommey=0,nbsommets=0
	for (let point of p.listePoints){
		sommex+= point.x
		sommey+= point.y
		nbsommets++
	}
	let x = calcul(sommex/nbsommets);
	let y = calcul(sommey/nbsommets);
	return new Point(x,y,nom,positionLabel)
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
function Droite(arg1,arg2,arg3,arg4,color) {
	ObjetMathalea2D.call(this);
	if (arguments.length==2) {
		this.x1 = arg1.x;
		this.y1 = arg1.y;
		this.x2 = arg2.x;
		this.y2 = arg2.y;
		this.a=calcul(this.y1-this.y2)
		this.b=calcul(this.x2-this.x1)
		this.c=calcul((this.x1-this.x2)*this.y1+(this.y2-this.y1)*this.x1)
	} else if (arguments.length==3) {
		if (typeof(arg1)=='number') { // droite d'équation ax +by +c =0
			this.a=arg1;
		this.b=arg2;
		this.c=arg3;
		this.color=color;
		if (egal(a,0)) {
			this.x1=0
			this.x2=1
			this.y1=calcul(-c/b)
			this.y2=calcul(-c/b)
		}
		else if (egal(b,0)) {
			this.y1=0
			this.y2=1
			this.x1=calcul(-c/a)
			this.x2=calcul(-c/a)	
		}
		else {
			this.x1=0
			this.y1=calcul(-c/b)
			this.x2=1
			this.y2=calcul((-c-a)/b)
		}
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
		if (egal(a,0)) {
			this.x1=0
			this.x2=1
			this.y1=calcul(-c/b)
			this.y2=calcul(-c/b)
		}
		else if (egal(b,0)) {
			this.y1=0
			this.y2=1
			this.x1=calcul(-c/a)
			this.x2=calcul(-c/a)	
		}
		else {
			this.x1=0
			this.y1=calcul(-c/b)
			this.x2=1
			this.y2=calcul((-c-a)/b)
		}
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
/*	if (this.b==0) {
		this.angleAvecHorizontale = 90
	} else {
		this.angleAvecHorizontale = calcul(Math.atan(this.pente)*180/Math.PI,1)

	}
	*/
	this.normal= vecteur(this.a,this.b)
	this.directeur= vecteur(-this.b,this.a)
	this.angleAvecHorizontale=angleOriente(point(0,1),point(0,0),point(this.directeur.x,this.directeur.y))
	this.svg = function(coeff){
		if (this.epaisseur!=1) {
			this.style += ` stroke-width="${this.epaisseur}" `
		}
		if (this.pointilles) {
			this.style += ` stroke-dasharray="4 3" `
		}
		if (this.opacite !=1) {
			this.style += ` stroke-opacity="${this.opacite}" `
		}
		let A = point(this.x1,this.y1);
		let B = point(this.x2,this.y2);
		let A1 = pointSurSegment(A,B,-50);
		let B1 = pointSurSegment(B,A,-50);
		return `<line x1="${A1.xSVG(coeff)}" y1="${A1.ySVG(coeff)}" x2="${B1.xSVG(coeff)}" y2="${B1.ySVG(coeff)}" stroke="${this.color}" ${this.style} />`
	}
	this.tikz = function() {
		let tableauOptions = [];
		if (this.color.length>1 && this.color!=='black'){
			tableauOptions.push(this.color)
		}
		if (this.epaisseur!=1) {
			tableauOptions.push(`line width = ${this.epaisseur}`) 
		}
		if (this.pointilles) {
			tableauOptions.push(`dashed`) 
		}
		if (this.opacite !=1) {
			tableauOptions.push(`opacity = ${this.opacite}`)
		}
		
		let optionsDraw = []
		if (tableauOptions.length>0) {
			optionsDraw = "["+tableauOptions.join(',')+"]"
		}
		let A = point(this.x1,this.y1);
		let B = point(this.x2,this.y2);
		let A1 = pointSurSegment(A,B,-10);
		let B1 = pointSurSegment(B,A,-10);
		return `\\draw${optionsDraw} (${A1.x},${A1.y})--(${B1.x},${B1.y});`
	}
}
function droite(...args){
	return new Droite(...args)
}


/**
* d = droiteParPointEtVecteur(A,v,'d1',red') //Droite passant par A, de vecteur directeur v et de couleur rouge
* @Auteur Jean-Claude Lhote
*/
function droiteParPointEtVecteur(A,v,nom='',color='black') {
	let B = point(calcul(A.x+v.x),calcul(A.y+v.y))
	return droite(A,B,nom,color)
}
/**
* d = droiteParPointEtParallele(A,d,'d1',red') // Trace en rouge la parallèle à la droite (d) passant par A
* @Auteur Jean-Claude Lhote
*/
function droiteParPointEtParallele(A,d,nom='',color='black'){
	return droiteParPointEtVecteur(A,d.directeur,nom,color);
}
/**
* d = droiteParPointEtPerpendiculaire(A,d,'d1',red') // Trace en rouge la perpendiculaire à la droite (d) passant par A
* @Auteur Jean-Claude Lhote
*/
function droiteParPointEtPerpendiculaire(A,d,nom='',color='black'){
	return droiteParPointEtVecteur(A,d.normal,nom,color);
}
/**
* d = droiteHorizontaleParPoint(A,'d1',red') // Trace en rouge la droite horizontale passant par A
* @Auteur Jean-Claude Lhote
*/
function droiteHorizontaleParPoint(A,nom='',color='black'){
	return droiteParPointEtPente(A,0,nom,color)
}
/**
* d = droiteVerticaleParPoint(A,'d1',red') // Trace en rouge la droite verticale passant par A
* @Auteur Jean-Claude Lhote
*/
function droiteVerticaleParPoint(A,nom='',color){
	return droiteParPointEtVecteur(A,vecteur(0,1),nom,color)
}

/**
* d = droiteParPointEtPente(A,p,'d1',red') //Droite passant par A, de pente p et de couleur rouge
*@Auteur Jean-Claude Lhote
*/
function droiteParPointEtPente(A,k,nom='',color='black') {
	let B = point(calcul(A.x+1),calcul(A.y+k));
	return droite(A,B,nom,color);
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
 function mediatrice(A,B,nom='',color='black'){
 	let O = milieu(A,B)
 	let M = rotation(A,O,90)
 	let N = rotation(A,O,-90)
 	return droite(M,N,nom,color)
 }

/**
 * m = codageMediatrice(A,B,'blue','×') // Ajoute le codage du milieu et de l'angle droit pour la médiatrice de [AB] en bleu
 * 
 * @Auteur Rémi Angot
 */
 function CodageMediatrice(A,B,color='black',mark='×'){
 	ObjetMathalea2D.call(this)
 	this.color = color
 	let O = milieu(A,B)
 	let M = rotation(A,O,90)
 	let c = codageAngleDroit(M,O,B,this.color)
 	let v = codeSegments(mark,this.color,A,O, O,B)
 	this.svg = function(coeff){
 		return c.svg(coeff) + '\n' + v.svg(coeff)
 	}
 	this.tikz = function(){
 		return c.tikz() + '\n' + v.tikz()
 	}
 }

 function codageMediatrice(...args){
 	return new CodageMediatrice(...args)
 }


/**
 * m = constructionMediatrice(A,B,false,'blue','×') // Trace et code la médiatrice en laissant apparent les traits de construction au compas
 * 
 * @Auteur Rémi Angot
 */
 function ConstructionMediatrice(A,B,detail = false, color='blue', markmilieu='×', markrayons='||',couleurMediatrice = 'red', epaisseurMediatrice = 2){
 	ObjetMathalea2D.call(this)
 	let O = milieu(A,B)
 	let m = rotation(A,O,90)
 	let n = rotation(A,O,-90)
 	let M = pointSurSegment(O,m,longueur(A,B)*0.75)
 	let N = pointSurSegment(O,n,longueur(A,B)*0.75)
 	let arcm1 = traceCompas(A,M)
 	let arcm2 = traceCompas(B,M)
 	let arcn1 = traceCompas(A,N)
 	let arcn2 = traceCompas(B,N)
 	let d = mediatrice(A,B)
 	d.color = couleurMediatrice
 	d.epaisseur = epaisseurMediatrice
 	let codage = codageMediatrice(A,B,color,markmilieu)
 	let objets = [arcm1,arcm2,arcn1,arcn2,d]
 	if (detail) {
 		let sAM = segment(A,M)
 		sAM.pointilles = true
 		let sBM = segment(B,M)
 		sBM.pointilles = true
 		let sAN = segment(A,N)
 		sAN.pointilles = true
 		let sBN = segment(B,N)
 		sBN.pointilles = true
 		let codes = codeSegments(markrayons,color,A,M, B,M, A,N, B,N)
 		objets.push(sAM,sBM,sAN,sBN,codes)
 	}
	this.svg = function (coeff) {
		code = '';
		for (objet of objets) {
			code += '\n\t' + objet.svg(coeff);
		}
		return code;
	};
	this.tikz = function () {
		code = '';
		for (objet of objets) {
			code += '\n\t' + objet.tikz();
		}
		return code;
	}; }

 
 function constructionMediatrice(...args){
	 return new ConstructionMediatrice(...args)
	}
	/**
	 * d = bissectrice(A,O,B) // Bissectrice de l'angle AOB
 * d = bissectrice(A,O,B,'blue') // Bissectrice de l'angle AOB en bleu
 * 
 * @Auteur Rémi Angot
 */
function bissectrice(A,O,B,color = 'black'){
	ObjetMathalea2D.call(this)
	this.color = color
	let demiangle = calcul(angleOriente(A,O,B)/2)
	let m = pointSurSegment(O,A,3)
	let M = rotation(m,O,demiangle)
	return demiDroite(O,M,this.color)	
}
/**
 * m = codagebissectrice(A,O,B) ajoute des arcs marqués de part et d'autres de la bissectrice mais ne trace pas celle-ci.
 * @Auteur Jean-Claude Lhote
 */
function CodageBissectrice(A,O,B,color='black',mark='×'){
	ObjetMathalea2D.call(this)
	this.color = color
	let a = pointSurSegment(O,A,1.5)
	let demiangle = calcul(angleOriente(A,O,B)/2)
	let M = rotation(a,O,demiangle)
	let mark1=rotation(a,O,demiangle/2)
	let mark2=rotation(M,O,demiangle/2)
	let t1=texteParPoint(mark,mark1,Math.round(droite(O,A).angleAvecHorizontale+demiangle/2),color)
	let t2=texteParPoint(mark,mark2,Math.round(droite(O,A).angleAvecHorizontale+3*demiangle/2),color)
	let b = pointSurSegment(O,B,1.5)
	let a1 = arcPointPointAngle(a,M,demiangle,this.color)
	let a2 = arcPointPointAngle(M,b,demiangle,this.color)
	this.svg = function(coeff){
		return a1.svg(coeff) + '\n' + a2.svg(coeff) + '\n' + t1.svg(coeff) + '\n' +t2.svg(coeff)
	}
	this.tikz = function(){
		return a1.tikz() + '\n' + a2.tikz()+ '\n' + t1.tikz() + '\n' +t2.tikz()
	}
}

function codageBissectrice(...args){
	return new CodageBissectrice(...args)
}

/**
 * m = constructionMediatrice(A,B,false,'blue','×') // Trace et code la médiatrice en laissant apparent les traits de construction au compas
 * 
 * @Auteur Rémi Angot
 */
function ConstructionBissectrice(A,O,B,detail = false, color='blue', mark='×',tailleLosange = 5,couleurBissectrice = 'red', epaiseurBissectrice = 2){
	ObjetMathalea2D.call(this)
	let M = pointSurSegment(O,A,tailleLosange)
	let N = pointSurSegment(O,B,tailleLosange)
	let sOM = segment(O,M)
	let sON = segment(O,N)
	sOM.styleExtremites = '-|'
	sON.styleExtremites = '-|'
 	let dMN = droite(M,N)
 	dMN.isVisible = false
 	let P = symetrieAxiale(O,dMN)
 	let tNP = traceCompas(N,P)
 	let tMP = traceCompas(M,P)
 	let d = bissectrice(A,O,B)
 	d.color = couleurBissectrice
 	d.epaisseur = epaiseurBissectrice
 	let objets = [sOM,sON,tNP,tMP,d]
 	if (detail) {
		 let sMP = segment(M,P)
 		let sNP = segment(N,P)
 		sMP.pointilles = true
 		sNP.pointilles = true
 		let codes = codeSegments(mark,color,O,M, M,P, O,N, N,P)
 		objets.push(sMP,sNP,codes)
	}
	this.svg = function (coeff) {
		code = '';
		for (objet of objets) {
			code += '\n\t' + objet.svg(coeff);
		}
		return code;
	};
	this.tikz = function () {
		code = '';
		for (objet of objets) {
			code += '\n\t' + objet.tikz();
		}
		return code;
	};
}

function constructionBissectrice(...args){
	return new ConstructionBissectrice(...args)
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
function Polyline(...points){
	ObjetMathalea2D.call(this);
	if (Array.isArray(points[0])) { //Si le premier argument est un tableau
		this.listePoints = points[0]
		this.color = points[1]
	} else {
		this.listePoints = points
	}
	this.nom = '';
	if (points.length<15) { // Ne nomme pas les ligne brisée trop grande (pratique pour les courbes de fonctions)
		for (let point of points){
			this.nom += point.nom
		}
	}
	this.svg = function(coeff){
		if (this.epaisseur!=1) {
			this.style += ` stroke-width="${this.epaisseur}" `
		}
		if (this.pointilles) {
			this.style += ` stroke-dasharray="4 3" `
		}
		if (this.opacite !=1) {
			this.style += ` stroke-opacity="${this.opacite}" `
		}
		let binomeXY = "";
		for (let point of this.listePoints){
			binomeXY += `${calcul(point.x*coeff)},${calcul(-point.y*coeff)} `; 		
		}		
		return `<polyline points="${binomeXY}" fill="none" stroke="${this.color}" ${this.style} />`
	}
	this.tikz = function(){
		let tableauOptions = [];
		if (this.color.length>1 && this.color!=='black'){
			tableauOptions.push(this.color)
		}
		if (this.epaisseur!=1) {
			tableauOptions.push(`line width = ${this.epaisseur}`) 
		}
		if (this.pointilles) {
			tableauOptions.push(`dashed`) 
		}
		if (this.opacite !=1) {
			tableauOptions.push(`opacity = ${this.opacite}`)
		}
		
		let optionsDraw = []
		if (tableauOptions.length>0) {
			optionsDraw = "["+tableauOptions.join(',')+"]"
		}
		let binomeXY = "";
		for (let point of this.listePoints){
			binomeXY += `(${point.x},${point.y})--`
		}
		binomeXY = binomeXY.substr(0,binomeXY.length-2)
		return `\\draw${optionsDraw} ${binomeXY};`
	}

}
function polyline(...args){
	return new Polyline(...args)
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
 	this.xSVG = function(coeff) {
 		return this.x*coeff;
 	}
 	this.ySVG = function(coeff) {
 		return -this.y*coeff;
 	}
 	this.representant = function(A){
 		let B = point(A.x+this.x,A.y+this.y)
 		let s = segment(A,B)
 		s.styleExtremites = '|->'
 	}

 }
 function vecteur(...args){
 	return new Vecteur(...args)
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
function Segment(arg1,arg2,arg3,arg4,color){
	ObjetMathalea2D.call(this);
	this.styleExtremites='';
	if (arguments.length==2) {
		this.x1 = arg1.x;
		this.y1 = arg1.y;
		this.x2 = arg2.x;
		this.y2 = arg2.y;
	} else if (arguments.length==3) {
		this.x1 = arg1.x;
		this.y1 = arg1.y;
		this.x2 = arg2.x;
		this.y2 = arg2.y
		this.color = arg3
	} else if (arguments.length==4)  {
		this.x1 = arg1;
		this.y1 = arg2;
		this.x2 = arg3;
		this.y2 = arg4;
	}else { // 5 arguments
		this.x1 = arg1;
		this.y1 = arg2;
		this.x2 = arg3;
		this.y2 = arg4;
		this.color = color
	}
	this.extremite1 = point(this.x1,this.y1)
	this.extremite2 = point(this.x2,this.y2)
	this.longueur = calcul(Math.sqrt((this.x2-this.x1)**2+(this.y2-this.y1)**2));
//	this.angleAvecHorizontale = calcul(Math.atan2(this.y2-this.y1, this.x2-this.x1)*180/Math.PI); 
	this.angleAvecHorizontale = angleOriente(point(this.x1+1,this.y1),this.extremite1,this.extremite2)
	this.svg = function(coeff){
		if (this.epaisseur!=1) {
			this.style += ` stroke-width="${this.epaisseur}" `
		}
		if (this.pointilles) {
			this.style += ` stroke-dasharray="4 3" `
		}
		if (this.opacite !=1) {
			this.style += ` stroke-opacity="${this.opacite}" `
		}
		let code = ''
		let A = point(this.x1,this.y1)
		let B = point(this.x2,this.y2)
		if (this.styleExtremites.length>1) {
			if (this.styleExtremites.substr(-1)=='|') { //si ça termine par | on le rajoute en B
				let M = pointSurSegment(B,A,.2)
				let B1 = rotation(M,B,90)
				let B2 = rotation(M,B,-90)
				code += `<line x1="${B1.xSVG(coeff)}" y1="${B1.ySVG(coeff)}" x2="${B2.xSVG(coeff)}" y2="${B2.ySVG(coeff)}" stroke="${this.color}" />`
			}
			if (this.styleExtremites.substr(-1)=='>') { //si ça termine par > on rajoute une flèche en B
				let M = pointSurSegment(B,A,.2)
				let B1 = rotation(B,M,90)
				let B2 = rotation(B,M,-90)
				code += `<line x1="${B.xSVG(coeff)}" y1="${B.ySVG(coeff)}" x2="${B1.xSVG(coeff)}" y2="${B1.ySVG(coeff)}" stroke="${this.color}" />`
				code += `\n\t<line x1="${B.xSVG(coeff)}" y1="${B.ySVG(coeff)}" x2="${B2.xSVG(coeff)}" y2="${B2.ySVG(coeff)}" stroke="${this.color}" />`
			}
			if (this.styleExtremites[0]=='<') { //si ça comment par < on rajoute une flèche en A
				let M = pointSurSegment(A,B,.2)
				let A1 = rotation(A,M,90)
				let A2 = rotation(A,M,-90)
				code += `<line x1="${A.xSVG(coeff)}" y1="${A.ySVG(coeff)}" x2="${A1.xSVG(coeff)}" y2="${A1.ySVG(coeff)}" stroke="${this.color}" />`
				code += `\n\t<line x1="${A.xSVG(coeff)}" y1="${A.ySVG(coeff)}" x2="${A2.xSVG(coeff)}" y2="${A2.ySVG(coeff)}" stroke="${this.color}" />`

			}
			if (this.styleExtremites[0]=='|') { //si ça commence par | on le rajoute en A
				let N = pointSurSegment(A,B,.2)
				let A1 = rotation(N,A,90)
				let A2 = rotation(N,A,-90)
				code += `<line x1="${A1.xSVG(coeff)}" y1="${A1.ySVG(coeff)}" x2="${A2.xSVG(coeff)}" y2="${A2.ySVG(coeff)}" stroke="${this.color}" />`

			}		
		}
		code +=`\n\t<line x1="${A.xSVG(coeff)}" y1="${A.ySVG(coeff)}" x2="${B.xSVG(coeff)}" y2="${B.ySVG(coeff)}" stroke="${this.color}" ${this.style} />`
		return code
	}
	this.tikz = function(){
		let optionsDraw = []
		let tableauOptions = [];
		if (this.color.length>1 && this.color!=='black'){
			tableauOptions.push(this.color)
		}
		if (this.epaisseur!=1) {
			tableauOptions.push(`line width = ${this.epaisseur}`) 
		}
		if (this.opacite!=1) {
			tableauOptions.push(`opacity = ${this.opacite}`) 
		}
		if (this.pointilles) {
			tableauOptions.push(`dashed`) 
		}
		if (this.styleExtremites.length>1) {
			tableauOptions.push(this.styleExtremites)
		}
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
function segmentAvecExtremites(...args){
	let s = segment(...args)
	s.styleExtremites='|-|'
	return s
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
function demiDroite(A,B,color='black'){
	let B1 = pointSurSegment(B,A,-10)
	return segment(A,B1,color);
}

/**
* s = DemiDroiteAvecExtremite(A,B) //Demi-droite d'origine A passant par B avec l'origine marquée
* s = DemiDroiteAvecExtremite(A,B,'blue') //Demi-droite d'origine A passant par B et de couleur bleue avec l'origine marquée
*
* @Auteur Rémi Angot
*/
function demiDroiteAvecExtremite(A,B,color='black'){
	let B1 = pointSurSegment(B,A,-10)
	let s = segment(A,B1,color)
	s.styleExtremites='|-'
	return s
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
function Polygone(...points){
	ObjetMathalea2D.call(this);
	this.couleurDeRemplissage = ''
	this.opaciteDeRemplissage = .7
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
	this.binomesXY = function(coeff){
		let liste = "";
		for (let point of this.listePoints){
			liste += `${calcul(point.x*coeff)},${calcul(-point.y*coeff)} `; 
		}
		return liste
	}
	this.svg = function(coeff){
		
		if (this.epaisseur!=1) {
			this.style += ` stroke-width="${this.epaisseur}" `
		}
		if (this.pointilles) {
			this.style += ` stroke-dasharray="4 3" `
		}
		if (this.couleurDeRemplissage =='') {
			this.style += ` fill="none" ` 
		} else {
			this.style += ` fill="${this.couleurDeRemplissage}" `
			this.style += ` fill-opacity="${this.opaciteDeRemplissage}" `
		}	
		if (this.opacite !=1) {
			this.style += ` stroke-opacity="${this.opacite}" `
		}
		
		return `<polygon points="${this.binomesXY(coeff)}" stroke="${this.color}" ${this.style} />`
	}
	this.tikz = function(){
		let tableauOptions = [];
		if (this.color.length>1 && this.color!=='black'){
			tableauOptions.push(this.color)
		}
		if (this.epaisseur!=1) {
			tableauOptions.push(`line width = ${this.epaisseur}`) 
		}
		if (this.pointilles) {
			tableauOptions.push(`dashed`) 
		}
		if (this.opacite !=1) {
			tableauOptions.push(`opacity=${this.opacity}`)
		}
		
		let optionsDraw = []
		if (tableauOptions.length>0) {
			optionsDraw = "["+tableauOptions.join(',')+"]"
		}
		
		let binomeXY = "";
		for (let point of this.listePoints){
			binomeXY += `(${point.x},${point.y})--`
		}
		return `\\draw${optionsDraw} ${binomeXY}cycle;`
	}

}
function polygone(...args){
	return new Polygone(...args)
}

/**
* polygoneRegulier(A,B,n) //Trace le polygone régulier direct à n côtés qui a pour côté [AB]
*
* @Auteur Rémi Angot
*/
function polygoneRegulier(A,B,n,color='black'){
	let listePoints = [A,B]
	for (let i=1 ; i<n-1 ; i++){
		listePoints[i+1] = rotation(listePoints[i-1],listePoints[i],calcul(180-360/n))
	}
	return polygone(listePoints,color)
}

/**
* polygoneRegulierIndirect(A,B,n) //Trace le polygone régulier indirect à n côtés qui a pour côté [AB]
*
* @Auteur Rémi Angot
*/
function polygoneRegulierIndirect(A,B,n,color='black'){
	let listePoints = [A,B]
	for (let i=1 ; i<n-1 ; i++){
		listePoints[i+1] = rotation(listePoints[i-1],listePoints[i],calcul(-180+360/n))
	}
	return polygone(listePoints,color)
}

/**
* carre(A,B) //Trace le carré direct qui a pour côté [AB] et code les 4 angles droits et 4 côtés de même longueur
* carre(A,B,'blue') //Trace en bleu le carré direct qui a pour côté [AB] et code les 4 angles droits et 4 côtés de même longueur
* @Auteur Rémi Angot
*/
function carre(A,B,color){
	return polygoneRegulier(A,B,4,color)
}

/**
* carreIndirect(A,B) //Trace le carré indirect qui a pour côté [AB] 
*/
function carreIndirect(A,B,color){
	
	return polygoneRegulierIndirect(A,B,4,color)
}

function CodageCarre(c,color = 'black',mark='×'){
	let objets = []
	objets.push(codeSegments(mark,color,c.listePoints))
	objets.push(codageAngleDroit(c.listePoints[0],c.listePoints[1],c.listePoints[2],color))
	objets.push(codageAngleDroit(c.listePoints[1],c.listePoints[2],c.listePoints[3],color))
	objets.push(codageAngleDroit(c.listePoints[2],c.listePoints[3],c.listePoints[0],color))
	objets.push(codageAngleDroit(c.listePoints[3],c.listePoints[0],c.listePoints[1],color))
	
	this.svg = function (coeff) {
		code = '';
		for (objet of objets) {
			code += '\n\t' + objet.svg(coeff);
		}
		return code;
	};
	this.tikz = function () {
		code = '';
		for (objet of objets) {
			code += '\n\t' + objet.tikz();
		}
		return code;
	};
}

function codageCarre(...args){
	return new CodageCarre(...args)
}

/**
* polygoneRegulierParCentreEtRayon(O,r,n) //Trace le polygone régulier à n côtés et de rayon r
*
* @Auteur Rémi Angot
*/
function polygoneRegulierParCentreEtRayon(O,r,n,color='black'){
	let p = [];
	p[0] = point(calcul(O.x+r),O.y);
	for (let i=1; i<n ; i++){
		p[i] = rotation(p[i-1],O,calcul(-360/n))
	}
	return polygone(p,color)
}

/**
* t = triangle2points2longueurs(A,B,4,7) // Trace le triangle ABC tel que AC = 4 cm et BC = 7 cm (par défaut C a l'ordonnée la plus grande possible)
* C = t.listePoints[2] // Récupère le 3e sommet dans la variable C
* t = triangle2points2longueurs(A,B,4,7,2) // Trace le triangle ABC tel que AC = 4 cm et BC = 7 cm (C aura l'ordonnée la plus petite possible)
* @Auteur Rémi Angot
*/
function triangle2points2longueurs(A,B,l1,l2,n=1){
	let c1 = cercle(A,l1)
	let c2 = cercle(B,l2)
	let C
	if (n==1) {
		C = pointIntersectionCC(c1,c2)
	} else {
		C = pointIntersectionCC(c1,c2,'',2)
	}
	c1.isVisible = false
	c2.isVisible = false
	return polygone(A,B,C)
}

/**
* t = triangle2points2angles(A,B,40,60) // Trace le triangle ABC tel que CAB = +40° et CBA = -60°
* C = t.listePoints[2] // Récupère le 3e sommet dans la variable C
* t = triangle2points2angles(A,B,40,60,2) // Trace le triangle ABC tel que CAB = -40° et CBA = 60°
* @Auteur Rémi Angot
*/
function triangle2points2angles(A,B,a1,a2,n=1){
	if (n==1) {
		a2 *=-1
	} else {
		a1 *=-1
	}
	let a = pointSurSegment(A,B,1)
	let c1 = rotation(a,A,a1)
	let b = pointSurSegment(B,A,1)
	let c2 = rotation(b,B,a2)
	let dAc1 = droite(A,c1)
	let dBc2 = droite(B,c2)
	dAc1.isVisible = false
	dBc2.isVisible = false
	let C = pointIntersectionDD(dAc1,dBc2,'C')
	return polygone(A,B,C)
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
 function triangle2points1angle1longueur(A,B,a,l,n=1){
 	if (n==1) {
 		a =Math.abs(a)%180
 	} else {
 		a =-(Math.abs(a)%180)
 	}
 	let P = pointSurSegment(A,B,l)
 	let Q = rotation(P,A,a)
 	return polygone(A,B,Q)
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
 function triangle2points1angle1longueurOppose(A,B,a,l,n=1){
 	let M
 	if (n%2==1) {
 		a =Math.abs(a)%180
 	} else {
 		a =-(Math.abs(a)%180)
 	}
 	let d = droite(A,B)
 	let e = rotation(d,A,a)
 	let c=cercle(B,l)
 	d.isVisible=false
 	e.isVisible=false
 	c.isVisible=false
 	if ((n+1)>>1==1)	M=pointIntersectionLC(e,c,'',1)
 		else  M=pointIntersectionLC(e,c,'',2)
 			return polygone(A,B,M)
 	}

/**
 * nommePolygone (p,'ABCDE',0.5) nomme les sommets du polygone p. Les labels sont placés à une distance paramètrable en cm des sommets (0.5 par défaut)
 * @Auteur Jean-Claude Lhote
 */
function nommePolygone(p,nom,k=0.5){
	let G=barycentre(p)
	let V,v,labels=[]
	for (let i=0,point; i < p.listePoints.length ; i++){
		p.listePoints[i].nom = nom[i] 
		V=vecteur(G,p.listePoints[i])
		v=homothetie(V,G,k/V.norme())
		point=translation(p.listePoints[i],v)
		labels.push(texteParPoint(p.listePoints[i].nom,point,'milieu'))
	}
	return labels
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
				labelPoint(p.listePoints[i])
			}
		}

	} 
}
/**
 * aireTriangle(p) retourne l'aire du triangle si p est un triangle, false sinon.
 * @Auteur Jean-Claude Lhote
 */
function aireTriangle(p){
	if (p.listePoints.length!=3) return false
	let A=p.listePoints[0],B=p.listePoints[1],C=p.listePoints[2]
	return	1/2*Math.abs((B.x-A.x)*(C.y-A.y)-(C.x-A.x)*(B.y-A.y))
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
function Cercle(O,r,color){
	ObjetMathalea2D.call(this);
	if (color) {
		this.color = color;
		this.styleTikz = `[${color}]`
	}
	this.centre = O
	this.rayon = r
	this.couleurDeRemplissage = ''
	this.opaciteDeRemplissage = .7
	this.svg = function(coeff){
		if (this.epaisseur!=1) {
			this.style += ` stroke-width="${this.epaisseur}" `
		}
		if (this.pointilles) {
			this.style += ` stroke-dasharray="4 3" `
		}
		if (this.opacite !=1) {
			this.style += ` stroke-opacity="${this.opacite}" `
		}
		if (this.couleurDeRemplissage =='') {
			this.style += ` fill="none" ` 
		} else {
			this.style += ` fill="${this.couleurDeRemplissage}" `
			this.style += ` fill-opacity="${this.opaciteDeRemplissage}" `
		}

		return `<circle cx="${O.xSVG(coeff)}" cy="${O.ySVG(coeff)}" r="${r*coeff}" stroke="${this.color}" ${this.style} fill="none"/>`
	}
	this.tikz = function(){
		let optionsDraw = []
		let tableauOptions = [];
		if (this.color.length>1 && this.color!=='black'){
			tableauOptions.push(this.color)
		}
		if (this.epaisseur!=1) {
			tableauOptions.push(`line width = ${this.epaisseur}`) 
		}
		if (this.pointilles) {
			tableauOptions.push(`dashed`) 
		}
		if (this.opacite !=1) {
			tableauOptions.push(`opacity = ${this.opacite}`)
		}
		if (tableauOptions.length>0) {
			optionsDraw = "["+tableauOptions.join(',')+"]"
		}
		return `\\draw${optionsDraw} (${O.x},${O.y}) circle (${r});`
	}
}
function cercle(...args){ 
	return new Cercle(...args)
}

/**
 * I = pointItersectionLC(d,c,'I',1) // I est le premier point d'intersection si il existe de la droite (d) et du cercle (c)
 * @param {Droite} d la droite qui intecepte (ou pas le cercle)
 * @param {Cercle} C le cercle
 * @param {string} nom le nom du point d'intersection
 * @param {entier} n 1 pour le premier point, 2 sinon. Si il n'y a qu'un seul point d'intesection, l'un ou l'autre renvoie ce point.
 * @Auteur Jean-Claude Lhote
 */
 function pointIntersectionLC(d,C,nom='',n=1){
 	let O = C.centre
 	let r = C.rayon
 	let a = d.a
 	let b=d.b
 	let c=d.c 
 	let xO = O.x
 	let yO = O.y
 	let Delta,delta,xi,yi,xi_prime,yi_prime
	if (b==0) { // la droite est verticale
		xi=calcul(-c/a)	
		xi_prime=xi
		Delta=calcul(4*(-xO*xO-c*c/(a*a)-2*xO*c/a+r*r))
		if (Delta<0) return false
		else if (egal(Delta,0)) { //un seul point d'intersection
			yi=calcul(yO+Math.sqrt(Delta)/2)
		yi_prime=yi
	}
		else {//deux points d'intersection
			yi=calcul(yO-Math.sqrt(Delta)/2)
		yi_prime=calcul(yO+Math.sqrt(Delta)/2)
	}
}
	else if (a==0) { // la droite est horizontale
		yi=calcul(-c/b)
		yi_prime=yi
		Delta=calcul(4*(-yO*yO-c*c/(b*b)-2*yO*c/b+r*r))
		if (Delta<0) return false
		else if (egal(Delta,0)) { //un seul point d'intersection
			xi=calcul(xO+Math.sqrt(Delta)/2)
		xi_prime=xi
	}
		else {//deux points d'intersection
			xi=calcul(xO-Math.sqrt(Delta)/2)
		xi_prime=calcul(xO+Math.sqrt(Delta)/2)
	}
}
	else { //cas général
		Delta=calcul((2*(a*c/(b*b)+yO*a/b-xO))**2-4*(1+(a/b)**2)*(xO*xO+yO*yO+(c/b)**2+2*yO*c/b-r*r))
		if (Delta<0) return false
		else if (egal(Delta,0)) { //un seul point d'intersection
			delta=calcul(Math.sqrt(Delta))
		xi=calcul((-2*(a*c/(b*b)+yO*a/b-xO)-delta)/(2*(1+(a/b)**2)))
		xi_prime=xi
		yi=calcul((-a*xi-c)/b)
		yi_prime=yi
	}
		else  {//deux points d'intersection
			delta=calcul(Math.sqrt(Delta))
		xi=calcul((-2*(a*c/(b*b)+yO*a/b-xO)-delta)/(2*(1+(a/b)**2)))
		xi_prime=calcul((-2*(a*c/(b*b)+yO*a/b-xO)+delta)/(2*(1+(a/b)**2)))
		yi=calcul((-a*xi-c)/b)
		yi_prime=calcul((-a*xi_prime-c)/b)
	}
}
if (n==1) {
	if (yi_prime>yi) {
		return point(xi_prime,yi_prime,nom)
	} else {
		return point(xi,yi,nom)
	}
} else {
	if (yi_prime>yi) {
		return point(xi,yi,nom)
	} else {
		return point(xi_prime,yi_prime,nom)
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
function pointIntersectionCC(c1,c2,nom='',n=1){
	let O1 = c1.centre
	let O2 = c2.centre
	let r0 = c1.rayon
	let r1 = c2.rayon
	let x0 = O1.x
	let x1 = O2.x
	let y0 = O1.y
	let y1 = O2.y
	let a, dx, dy, d, h, rx, ry;
	let x2, y2;
	dx = x1 - x0;
	dy = y1 - y0;
	d = Math.sqrt((dy*dy) + (dx*dx));
	if (d > (r0 + r1)) {
		return false;
	}
	if (d < Math.abs(r0 - r1)) {
		return false;
	}
	a = ((r0*r0) - (r1*r1) + (d*d)) / (2.0 * d) ;
	x2 = x0 + (dx * a/d);
	y2 = y0 + (dy * a/d);
	h = Math.sqrt((r0*r0) - (a*a));
	rx = -dy * (h/d);
	ry = dx * (h/d);
	let xi = x2 + rx;
	let xi_prime = x2 - rx;
	let yi = y2 + ry;
	let yi_prime = y2 - ry;
	if (n==1) {
		if (yi_prime>yi) {
			return point(xi_prime,yi_prime,nom)
		} else {
			return point(xi,yi,nom)
		}
	} else {
		if (yi_prime>yi) {
			return point(xi,yi,nom)
		} else {
			return point(xi_prime,yi_prime,nom)
		}
	}
}

/**
*  c = cercleCentrePoint(O,A) //Cercle de centre O passant par A
*  c = cercleCentrePoint(O,A,'blue') //Cercle de centre O passant par A en bleu
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
 * @Auteur Jean-Claude Lhote
 * @param {object} M point de départ de l'arc
 * @param {object} Omega centre de l'arc
 * @param {number} angle compris entre -360 et 360 valeur négative = sens indirect
 * @param {boolean} rayon booléen si true, les rayons délimitant l'arc sont ajoutés
 * @param {boolean} fill
 * @param {string} color 
 */
function Arc(M,Omega,angle,rayon=false,fill='none',color='black') {
	ObjetMathalea2D.call(this);
	this.color=color;
	this.fill=fill;
	let l=longueur(Omega,M),large=0,sweep=0
	let d=droite(Omega,M)
   d.isVisible=false
   let A=point(Omega.x+1,Omega.y)
   let azimut=angleOriente(A,Omega,M)
   let anglefin=azimut+angle
	if (angle>180) {
		angle=angle-360
		large=1
		sweep=0
	}
	else if (angle<-180) {
		angle=360+angle
		large=1
		sweep=1
	}
	else {
		large=0
		sweep=1-(angle>0)
	}
	let N=rotation(M,Omega,angle)
	if (rayon) 	this.svg = function(coeff){
		if (this.epaisseur!=1) {
			this.style += ` stroke-width="${this.epaisseur}" `
		}
		if (this.pointilles) {
			this.style += ` stroke-dasharray="4 3" `
		}
		if (this.opacite !=1) {
			this.style += ` stroke-opacity="${this.opacite}" `
		}
		return `<path d="M${M.xSVG(coeff)} ${M.ySVG(coeff)} A ${l*coeff} ${l*coeff} 0 ${large} ${sweep} ${N.xSVG(coeff)} ${N.ySVG(coeff)} L ${Omega.xSVG(coeff)} ${Omega.ySVG(coeff)} Z" stroke="${this.color}" fill="${fill}" ${this.style}/>`
	}
	else 	this.svg = function(coeff){
		if (this.epaisseur!=1) {
			this.style += ` stroke-width="${this.epaisseur}" `
		}
		if (rayon) `\\fill  ${optionsDraw} (${N.x},${N.y}) -- (${Omega.x},${Omega.y}) -- (${M.x},${M.y}) arc (${azimut}:${anglefin}:${longueur(Omega,M)}) -- cycle ;`
		else return `\\draw${optionsDraw} (${M.x},${M.y}) arc (${azimut}:${anglefin}:${longueur(Omega,M)}) ;`
 	}
 }
 function arc(...args) {
 	return new Arc(...args)
 }
 /**
 * 
 * @param {Point} M //première extrémité de l'arc
 * @param {Point} N //deuxième extrémité de l'arc
 * @param {number} angle //angle au centre de l'arc compris entre -360 et +360 !
 * @param {boolean} rayon //si true, l'arc est fermé par deux rayons aux extrémités
 * @param {string} fill //couleur de remplissage (par défaut 'none'= sans remplissage) 
 * @param {string} color //couleur de l'arc
 * @Auteur Jean-Claude Lhote
 */
 function ArcPointPointAngle(M,N,angle,rayon=false,fill='none',color='black'){
	let anglerot,Omegax,Omegay
	if (angle<0) anglerot=calcul((angle+180)/2)
	else anglerot=calcul((angle-180)/2)
	let d,e,f;
	d=mediatrice(M,N,'black');
	d.isVisible=false
	e=droite(N,M);
	e.isVisible=false
	f=rotation(e,N,anglerot);
	f.isVisible=false
	Omegay=calcul((-f.c+d.c*f.a/d.a)/(f.b-f.a*d.b/d.a))
	Omegax=calcul(-d.c/d.a-d.b*Omegay/d.a)
	let Omega=point(Omegax,Omegay)
	let l=longueur(Omega,M)
	let a=arc(M,Omega,angle,rayon,fill,color)
	a.isVisible=false
	ObjetMathalea2D.call(this);
	this.svg=a.svg
	this.tikz=a.tikz
 }
 	function arcPointPointAngle(...args){
 		return new ArcPointPointAngle(...args)
 	}
/**
 * m = traceCompas(O, A, 20) trace un arc de cercle de centre O qui commence 10° avant A et finit 10° après.
 *@Auteur Jean-Claude Lhote
 */
 	function traceCompas(O,A,angle=20,color='gray',opacite=.7, epaisseur = 1, pointilles  = false) {
 		let B = rotation(A,O,-angle/2)
 		let a = arc(B,O,angle,false)
 		a.epaisseur = epaisseur
 		a.opacite = opacite
 		a.color = color
 		a.pointilles = pointilles
 		return a
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
function translation(O,v,nom='',positionLabel = 'above') {
	if (O.constructor==Point) {
		let x = calcul(O.x+v.x);
		let y = calcul(O.y+v.y);
		return point(x,y,nom,positionLabel)
	}
	if (O.constructor==Polygone) {
		let p2=[]
		for (let i = 0 ; i < O.listePoints.length ; i++ ){
			p2[i] = translation(O.listePoints[i],v)
		}
		return polygone(p2)
	}
	if (O.constructor==Droite) {
		let M = translation(point(O.x1,O.y1),v)
		let N = translation(point(O.x2,O.y2),v)
		return droite(M,N)
	}
	if (O.constructor==Segment) {
		let M = translation(O.extremite1,v)
		let N = translation(O.extremite2,v)
		let s = segment(M,N)
		s.styleExtremites = O.styleExtremites
		return s
	}
	/*if (O.constructor==DemiDroite) {
		let M = translation(O.extremite1,v)
		let N = translation(O.extremite2,v)
		let s = demiDroite(M,N)
		s.styleExtremites = O.styleExtremites
		return s
	}
*/
	if (A.constructor==Vecteur) {
			return A
	}
}

/**
* M = translation2Points(O,A,B) //M est l'image de O dans la translation qui transforme A en B
* M = translation2Points(O,A,B,'M') //M est l'image de O dans la translation qui transforme A en B et se nomme M
* M = translation2Points(O,A,B,'M','below') //M est l'image de O dans la translation qui transforme A en B, se nomme M et le nom est en dessous du point
*
* @Auteur Rémi Angot
*/

function translation2Points(O,A,B,nom='',positionLabel = 'above') {
	if (O.constructor==Point) {
		let x = calcul(O.x+B.x-A.x);
		let y = calcul(O.y+B.y-A.y);
		return point(x,y,nom,positionLabel)
	}
	if (O.constructor==Polygone) {
		let p2=[]
		for (let i = 0 ; i < O.listePoints.length ; i++ ){
			p2[i] = translation2Points(O.listePoints[i],O,A,B)
		}
		return polygone(p2)
	}
	if (O.constructor==Droite) {
		let M = translation2Points(point(O.x1,O.y1),A,B)
		let N = translation2Points(point(O.x2,O.y2),A,B)
		return droite(M,N)
	}
	if (O.constructor==Segment) {
		let M = translation2Points(O.extremite1,A,B)
		let N = translation2Points(O.extremite2,A,B)
		let s = segment(M,N)
		s.styleExtremites = O.styleExtremites
		return s
	}
/*	if (O.constructor==DemiDroite) {
		let M = translation2Points(O.extremite1,A,B)
		let N = translation2Points(O.extremite2,A,B)
		let s = demiDroite(M,N)
		s.styleExtremites = O.styleExtremites
		return s
	}
*/
	if (A.constructor==Vecteur) {
		return A
			}
}

/**
* M = rotation(A,O,angle) //M est l'image de A dans la rotation de centre O et d'angle angle
* M = rotation(A,O,angle,'M') //M est l'image de A dans la rotation de centre O et d'angle angle et se nomme M
* M = rotation(A,O,angle,'M','below') //M est l'image de A dans la rotation de centre O et d'angle angle, se nomme M et le nom est en dessous
* 
* @Auteur Rémi Angot et Jean-Claude Lhote
*/
function rotation(A,O,angle,nom,positionLabel){
	if (A.constructor==Point) {
		let x = calcul(O.x+(A.x-O.x)*Math.cos(angle*Math.PI/180)-(A.y-O.y)*Math.sin(angle*Math.PI/180));
		let y = calcul(O.y+(A.x-O.x)*Math.sin(angle*Math.PI/180)+(A.y-O.y)*Math.cos(angle*Math.PI/180));
		return point(x,y,nom,positionLabel)
	}
	if (A.constructor==Polygone) {
		let p2=[]
		for (let i = 0 ; i < A.listePoints.length ; i++ ){
			p2[i] = rotation(A.listePoints[i],O,angle)
		}
		return polygone(p2)
	}
	if (A.constructor==Droite) {
		let M = rotation(point(A.x1,A.y1),O,angle)
		let N = rotation(point(A.x2,A.y2),O,angle)
		return droite(M,N)
	}
	if (A.constructor==Segment) {
		let M = rotation(A.extremite1,O,angle)
		let N = rotation(A.extremite2,O,angle)
		let s = segment(M,N)
		s.styleExtremites = A.styleExtremites
		return s
	}
	/*if (A.constructor==DemiDroite) {
		let M = rotation(A.extremite1,O,angle)
		let N = rotation(A.extremite2,O,angle)
		let s = demiDroite(M,N)
		s.styleExtremites = A.styleExtremites
		return s
	}
*/
	if (A.constructor==Vecteur) {
		let x = calcul(A.x*Math.cos(angle*Math.PI/180)-A.y*Math.sin(angle*Math.PI/180))
		let y = calcul(A.x*Math.sin(angle*Math.PI/180)+A.y*Math.cos(angle*Math.PI/180));
		let v = vecteur(x,y)
	return v
	}
}

/**
* M = homothetie(A,O,k) //M est l'image de A dans l'homothétie de centre O et de rapport k
* M = homothetie(A,O,k,'M') //M est l'image de A dans l'homothétie de centre O et de rapport k et se nomme M
* M = homothetie(A,O,k,'M') //M est l'image de A dans l'homothétie de centre O et de rapport k, se nomme M et le nom est en dessous du point
*
* @Auteur Rémi Angot
*/
function homothetie(A,O,k,nom,positionLabel){
	if (A.constructor==Point) {
		let x = calcul(O.x+k*(A.x-O.x))
		let y = calcul(O.y+k*(A.y-O.y))
		return new Point(x,y,nom,positionLabel)
	}
	if (A.constructor==Polygone) {
		let p2=[]
		for (let i = 0 ; i < A.listePoints.length ; i++ ){
			p2[i] = homothetie(A.listePoints[i],O,k)
		}
		return polygone(p2)
	}
	if (A.constructor==Droite) {
		let M = homothetie(point(A.x1,A.y1),O,k)
		let N = homothetie(point(A.x2,A.y2),O,k)
		return droite(M,N)
	}
	if (A.constructor==Segment) {
		let M = homothetie(A.extremite1,O,k)
		let N = homothetie(A.extremite2,O,k)
		let s = segment(M,N)
		s.styleExtremites = A.styleExtremites
		return s
	}
/*	if (A.constructor==DemiDroite) {
		let M = homothetie(A.extremite1,O,k)
		let N = homothetie(A.extremite2,O,k)
		let s = demiDroite(M,N)
		s.styleExtremites = A.styleExtremites
		return s
	}
	*/
	if (A.constructor==Vecteur) {
		let x = A.x
		let y = A.y
		let v = vecteur(x*k,y*k)
		return v
	}
}

/**
 * M = pointParSymetrieAxiale(A,d)// M est l'image de A dans la symétrie axiale d'axe d.
 * d est un objet de type Droite (son équation ax+by+c=0 renseignée)
 * A est un objet de type Point (ses coordonnées x et y renseignées)
 * @Auteur Jean-Claude Lhote
 */
 function symetrieAxiale(A,d,nom='',positionLabel = 'above') {
	let x,y
	let a=d.a,b=d.b,c=d.c,k=1/(a*a+b*b)
		if (A.constructor==Point) {
 		if (a==0) {
 			x=A.x
 			y=calcul(-(A.y+2*c/b))
 		}
 		else if (b==0) {
 			y=A.y
 			x=calcul(-(A.x+2*c/a))
 		}
 		else {
 			x=calcul(k*((b*b-a*a)*A.x-2*a*b*A.y-2*a*c))
 			y=calcul(k*((a*a-b*b)*A.y-2*a*b*A.x+a*a*c/b-b*c)-c/b)
 		}
 		return point(x,y,nom,positionLabel)
 	}
 	if (A.constructor==Polygone) {
 		let p2=[]
 		for (let i = 0 ; i < A.listePoints.length ; i++ ){
 			p2[i] = symetrieAxiale(A.listePoints[i],d)
 		}
 		return polygone(p2)
 	}
 	if (A.constructor==Droite) {
 		let M = symetrieAxiale(point(A.x1,A.y1),d)
 		let N = symetrieAxiale(point(A.x2,A.y2),d)
 		return droite(M,N)
 	}
 	if (A.constructor==Segment) {
 		let M = symetrieAxiale(A.extremite1,d)
 		let N = symetrieAxiale(A.extremite2,d)
 		let s = segment(M,N)
 		s.styleExtremites = A.styleExtremites
 		return s
 	}
 /*	if (A.constructor==DemiDroite) {
 		let M = symetrieAxiale(A.extremite1,d)
 		let N = symetrieAxiale(A.extremite2,d)
 		let s = demiDroite(M,N)
 		s.styleExtremites = A.styleExtremites
 		return s
	 }*/
	 if (A.constructor==Vecteur) {
		let O
		if (egal(b,0)) {
			O=point(calcul(-c/a),0)
		}
		else O=point(0,calcul(-c/b))
		let M=translation(O,A)
		let N=symetrieAxiale(M,d)
		let v = vecteur(O,N)
		return v
	}
 }

/**
* N = projectionOrtho(M,d,'N','below left')
*@Auteur Jean-Claude Lhote
*/
function projectionOrtho(M,d,nom = ' ',positionLabel = 'above') {
	let a=d.a,b=d.b,c=d.c,k=calcul(1/(a*a+b*b));
	let x,y;
	if (M.constructor == Point) {
	if (a==0) {
		x=M.x
		y=calcul(-c/b)
	}
	else if (b==0) {
		y=M.y
		x=calcul(-c/a)
	}
	else {
		x=calcul(k*(b*b*M.x-a*b*M.y-a*c))
		y=calcul(k*(-a*b*M.x+a*a*M.y+a*a*c/b)-c/b)
	}
	return point(x,y,nom,positionLabel)
	}
	if (M.constructor==Vecteur) {
		let O
		if (egal(b,0)) 
			O=point(calcul(-c/a),0)
		else O=point(0,calcul(-c/b))
		let A=translation(O,M)
		let N=projectionOrtho(A,d)
		let v = vecteur(O,N)
		return v
	}
}
/**
 * N = affiniteOrtho(M,d,rapport,'N','rgiht')
 * @Auteur = Jean-Claude Lhote
 */
 function affiniteOrtho(A, d, k, nom = ' ', positionLabel = 'above') {
	let a = d.a, b = d.b, c = d.c, q = calcul(1 / (a * a + b * b));
	let x, y;
 	if (A.constructor == Point) {
 		if (a == 0) {
 			x = A.x
 			y = calcul(k * A.y + c * (k - 1) / b)
 		}
 		else if (b == 0) {
 			y = A.y
 			x = calcul(k * A.x + c * (k - 1) / a)
 		}
 		else {
 			x = calcul(q * (b * b * A.x - a * b * A.y - a * c) * (1 - k) + k * A.x)
 			y = calcul(q * ( a * a * A.y -a * b * A.x + a * a * c / b) * (1 - k) + k * c / b +k*A.y-c/b)
 		}
 		return point(x, y, nom, positionLabel)
 	}
 	if (A.constructor == Polygone) {
 		let p2 = []
 		for (let i = 0; i < A.listePoints.length; i++) {
 			p2[i] = affiniteOrtho(A.listePoints[i], d,k)
 		}
 		return polygone(p2)
 	}
 	if (A.constructor == Droite) {
 		let M = affiniteOrtho(point(A.x1, A.y1), d,k)
 		let N = affiniteOrtho(point(A.x2, A.y2), d,k)
 		return droite(M, N)
 	}
 	if (A.constructor == Segment) {
 		let M = affiniteOrtho(A.extremite1, d,k)
 		let N = affiniteOrtho(A.extremite2, d,k)
 		let s = segment(M, N)
 		s.styleExtremites = A.styleExtremites
 		return s
 	}
 /*	if (A.constructor == DemiDroite) {
 		let M = affiniteOrtho(A.extremite1, d,k)
 		let N = affiniteOrtho(A.extremite2, d,k)
 		let s = demiDroite(M, N)
 		s.styleExtremites = A.styleExtremites
 		return s
	 }*/
	 if (A.constructor==Vecteur) {
		let O
		if (egal(b,0)) {
			O=point(calcul(-c/a),0)
		}
		else O=point(0,calcul(-c/b))
		let M=translation(O,A)
		let N=affiniteOrtho(M,d,k)
		let v = vecteur(O,N)
		return v
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
 function similitude(A,O,a,k,nom=' ',positionLabel = 'above') {
 	if (A.constructor==Point) {
 		let ra = Math.radians(a)
 		let x = calcul(O.x+k*(Math.cos(ra)*(A.x-O.x)-Math.sin(ra)*(A.y-O.y)))
 		let y = calcul(O.y+k*(Math.cos(ra)*(A.y-O.y)+Math.sin(ra)*(A.x-O.x)))
 		return point(x,y,nom,positionLabel)
 	}
 	if (A.constructor==Polygone) {
 		let p2=[]
 		for (let i = 0 ; i < A.listePoints.length ; i++ ){
 			p2[i] = similitude(A.listePoints[i],O,a,k)
 		}
 		return polygone(p2)
 	}
 	if (A.constructor==Droite) {
 		let M = similitude(point(A.x1,A.y1),O,a,k)
 		let N = similitude(point(A.x2,A.y2),O,a,k)
 		return droite(M,N)
 	}
 	if (A.constructor==Segment) {
 		let M = similitude(A.extremite1,O,a,k)
 		let N = similitude(A.extremite2,O,a,k)
 		let s = segment(M,N)
 		s.styleExtremites = A.styleExtremites
 		return s
 	}
 	/*if (A.constructor==DemiDroite) {
 		let M = similitude(A.extremite1,O,a,k)
 		let N = similitude(A.extremite2,O,a,k)
 		let s = demiDroite(M,N)
 		s.styleExtremites = A.styleExtremites
 		return s
 	}*/
	 if (A.constructor==Vecteur){
		 let V=rotation(A,O,a)
		 let v=homothetie(V,O,k)
		 return v
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
* rotationAnimee(s,O,a) //Animation de la rotation de centre O et d'angle a pour s
* rotationAnimee([a,b,c],O,a) //Animation de la rotation de centre O et d'angle a pour les objets a, b et c
* 
* @Auteur Rémi Angot
*/
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
	to="${-angle} ${O.xSVG(coeff)} ${O.ySVG(coeff)}"
	${animation}
	/>`
	code += `</g>`
	return code

}
}
function rotationAnimee(...args){
	return new RotationAnimee(...args)
}
/**
* homothetieAnimee(s,O,k) //Animation de la homothetie de centre O et de rapport k pour s
* homothetieAnimee([a,b,c],O,k) //Animation de la homothetie de centre O et de rapport k pour les objets a, b et v
* 
* @Auteur Rémi Angot
*/
function HomothetieAnimee(p,O,k,animation='begin="0s" dur="2s" repeatCount="indefinite"'){
	ObjetMathalea2D.call(this)
	this.svg = function(coeff){
		let binomesXY1 = p.binomesXY(coeff)
		let p2 = homothetie(p,O,k)
		p2.isVisible=false
		let binomesXY2 = p2.binomesXY(coeff)
		code = `<polygon stroke="${p.color}" stroke-width="${p.epaisseur}" fill="none" >
		<animate attributeName="points" dur="2s" repeatCount="indefinite"
		from="${binomesXY1}"
		to="${binomesXY2}"
		/>
		</polygon>`
		return code

	}

}
function homothetieAnimee(...args){
	return new HomothetieAnimee(...args)
}

/**
* symetrieAnimee(s,d) //Animation de la symetrie d'axe (d) pour s
* symetrieAnimee([a,b,c],d) //Animation de la symetrie d'axe (d) pour les objets a, b et v
* 
* @Auteur Rémi Angot
*/
function SymetrieAnimee(p,d,animation='begin="0s" dur="2s" repeatCount="indefinite"'){
	ObjetMathalea2D.call(this)
	this.svg = function(coeff){
		let binomesXY1 = p.binomesXY(coeff)
		let p2 = symetrieAxiale(p,d)
		p2.isVisible=false
		let binomesXY2 = p2.binomesXY(coeff)
		code = `<polygon stroke="${p.color}" stroke-width="${p.epaisseur}" fill="none" >
		<animate attributeName="points" dur="2s" repeatCount="indefinite"
		from="${binomesXY1}"
		to="${binomesXY2}"
		/>
		</polygon>`
		return code

	}

}
function symetrieAnimee(...args){
	return new SymetrieAnimee(...args)
}

function AffiniteOrthoAnimee(p,d,k,animation='begin="0s" dur="2s" repeatCount="indefinite"'){
	ObjetMathalea2D.call(this)
	this.svg = function(coeff){
		let binomesXY1 = p.binomesXY(coeff)
		let p2 = affiniteOrtho(p,d,k)
		p2.isVisible=false
		let binomesXY2 = p2.binomesXY(coeff)
		code = `<polygon stroke="${p.color}" stroke-width="${p.epaisseur}" fill="none" >
		<animate attributeName="points" dur="2s" repeatCount="indefinite"
		from="${binomesXY1}"
		to="${binomesXY2}"
		/>
		</polygon>`
		return code

	}

}
function affiniteOrthoAnimee(...args){
	return new AffiniteOrthoAnimee(...args)
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
 function medianeTriangle(A,B,C,color='black'){
 	let I = milieu(B,C)
 	return droite(A,I,'',color)
 }	

/**
 * Centre de gravité du triangle ABC
 * @Auteur Jean-Claude Lhote
 * @param {Point} A 
 * @param {Point} B 
 * @param {Point} C 
 * @param {string} color 
 */
 function centreGraviteTriangle(A,B,C,nom=''){
 	let d=medianeTriangle(B,A,C)
 	let e=medianeTriangle(A,B,C)
 	d.isVisible=false
 	e.isVisible=false
 	let p=pointIntersectionDD(d,e)
 	let x=p.x
 	let y=p.y
 	return point(x,y,'',nom)
 }

/**
 * Hauteur issue de A relative à [BC]
 * @Auteur Jean-Claude Lhote
 * @param {Point} A 
 * @param {Point} B 
 * @param {Point} C 
 * @param {string} color 
 */
 function hauteurTriangle(A,B,C,color='black'){
 	let d = droite(B,C)
 	d.isVisible=false
 	let p = projectionOrtho(A,d)
 	return droite(p,A,'',color)
 }
 function CodageHauteurTriangle(A,B,C,color='black'){
 	ObjetMathalea2D.call(this)
 	this.color = color
 	let d = droite(B,C)
 	let p = projectionOrtho(A,d)
 	let q = rotation(A,p,-90)
 	if (B.x<C.x) {
 		if (p.x>C.x || p.x<B.x) {
 			d.isVisible=true
 			d.pointilles=true
 		}
 		else d.isVisible = false
 	}	
 else if (C.x<B.x) {
 	if (p.x<C.x || p.x>B.x) {
 		d.isVisible=true
 		d.pointilles=true
 	}
 	else d.isVisible=false
 }
else if (B.y<C.y) {
	if (p.y>C.y || p.y<B.y) {
		d.isVisible=true
		d.pointilles=true
	}
	else d.isVisible=false
}
else if (C.y<B.y) {
	if (p.y<C.y || p.y>B.y) {
		d.isVisible=true
		d.pointilles=true
	}
	else d.isVisible=false
}
let c = codageAngleDroit(A,p,q,this.color)
this.svg = function(coeff){
	if (d.isVisible) {
		return c.svg(coeff) + '\n\t' + d.svg(coeff)
	} else {
		return c.svg(coeff)
	}
}
this.tikz = function(){
	if (d.isVisible) {
		return c.tikz() + '\n\t' + d.tikz()
	} else {
		return c.tikz()
	}
}
}
function codageHauteurTriangle(...args) {
	return new CodageHauteurTriangle(...args)
}
function CodageMedianeTriangle(A,B,C,color='black',mark='//'){
	ObjetMathalea2D.call(this)
	this.color = color
	let O = milieu(B,C)
	let c = codeSegments(mark,this.color,B,O,O,C)
	this.svg = function(coeff){
		return c.svg(coeff)
	}
	this.tikz = function(){
		return c.tikz(coeff)
	}
}
function codageMedianeTriangle(...args) {
	return new CodageMedianeTriangle(...args)
}

/**
 * Orthocentre du triangle ABC
 * @Auteur Jean-Claude Lhote
 * @param {Point} A 
 * @param {Point} B 
 * @param {Point} C 
 * @param {string} color 
 */
 function orthoCentre(A,B,C,nom='',positionLabel='above'){
 	let d = hauteurTriangle(B,A,C)
 	let e = hauteurTriangle(A,B,C)
 	d.isVisible=false
 	e.isVisible=false
 	let p = pointIntersectionDD(d,e)
 	let x = p.x
 	let y = p.y
 	return point(x,y,nom,positionLabel)
 }

/**
 * Centre du cercle circonscrit au triangle ABC
 * @Auteur Jean-Claude Lhote
 * @param {Point} A 
 * @param {Point} B 
 * @param {Point} C 
 * @param {string} color 
 */
 function centreCercleCirconscrit(A,B,C,nom='',positionLabel='above'){
 	let d = mediatrice(A,B)
 	let e = mediatrice(B,C)
 	d.isVisible = false
 	e.isVisible = false
 	let p = pointIntersectionDD(d,e)
 	let x = p.x
 	let y = p.y
 	return point(x,y,nom,positionLabel)	
 }


/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% LES CODAGES %%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
* codageAngleDroit(A,O,B) //Fait un codage d'angle droit de 3 mm pour l'angle direct AOB
* codageAngleDroit(A,O,B,.5) //Fait un codage d'angle droit de 5 mm pour l'angle direct AOB
* 
* @Auteur Rémi Angot
*/
function codageAngleDroit(A,O,B,color='black',d = .3)  {
	ObjetMathalea2D.call(this);
	this.color = color;
	let a = pointSurSegment(O,A,d);
	let b = pointSurSegment(O,B,d);
	let o = {};
	if (angleOriente(A,O,B)>0) {
		o = rotation(O,a,-90)
	} else {
		o = rotation(O,a,90)
	}
	return polyline([a,o,b],color)	
}


/**
* afficheLongueurSegment(A,B) // Note la longueur de [AB] au dessus si A est le point le plus à gauche sinon au dessous
* 
* @Auteur Rémi Angot
*/
function AfficheLongueurSegment(A,B,color='black',d = .5)  {
	ObjetMathalea2D.call(this);
	this.color = color;
	let O = milieu(A,B)
	let M = rotation(A,O,-90)
	let N = pointSurSegment(O,M,d)
	let s = segment(A,B)
	s.isVisible = false
	let longueur = string_nombre(arrondi(s.longueur,1))
	let angle
	if (B.x>A.x) {
		angle = -parseInt(s.angleAvecHorizontale)
	} else {
		angle = -parseInt(s.angleAvecHorizontale)+180
	}
	return texteParPoint(longueur+' cm',N,angle,this.color)
	
}
function afficheLongueurSegment(...args){
	return new AfficheLongueurSegment(...args)
}

/**
* texteSurSegment(A,B) // Écrit un texte au milieu de [AB] au dessus si A est le point le plus à gauche sinon au dessous
* 
* @Auteur Rémi Angot
*/
function TexteSurSegment(texte,A,B,color='black',d = .5)  {
	ObjetMathalea2D.call(this);
	this.color = color;
	let O = milieu(A,B)
	let M = rotation(A,O,-90)
	let N = pointSurSegment(O,M,d)
	let s = segment(A,B)
	s.isVisible = false
	let angle
	if (B.x>A.x) {
		angle = -parseInt(s.angleAvecHorizontale)
	} else {
		angle = -parseInt(s.angleAvecHorizontale)+180
	}
	return texteParPoint(texte,N,angle,this.color)
	
}
function texteSurSegment(...args){
	return new TexteSurSegment(...args)
}

/**
* afficheMesureAngle(A,B,C) // Affiche la mesure de l'angle ABC arrondie au degré près
* 
* @Auteur Rémi Angot
*/
function afficheMesureAngle(A,B,C,color='black',distance = 1.5)  {
	let d = bissectrice(A,B,C)
	d.isVisible = false
	let M = pointSurSegment(d.extremite1,d.extremite2,distance)
	let dessinArc = arc(pointSurSegment(A,B,.8),A,angleOriente(B,A,C))
	let mesureAngle = arrondi_virgule(angle(A,C,B),0) + '°'
	return texteParPoint(mesureAngle,M,'milieu',color)
}


/**
 * codeSegment(A,B,'×','blue') // Code le segment [AB] avec une croix bleue
 * Attention le premier argument ne peut pas être un segment 
 *
 * @Auteur Rémi Angot
 */
 function CodeSegment(A,B,mark='||',color='black')  {
 	ObjetMathalea2D.call(this);
 	this.color = color;
 	let O = milieu(A,B)
 	let s = segment(A,B)
 	s.isVisible = false
 	let angle
 	if (B.x>A.x) {
 		angle = -parseInt(s.angleAvecHorizontale)
 	} else {
 		angle =-parseInt(s.angleAvecHorizontale)+180
 	}
 	return texteParPoint(mark,O,angle,this.color)

 }
 function codeSegment(...args){
 	return new CodeSegment(...args)
 }

/**
 * codeSegments('×','blue',A,B, B,C, C,D) // Code les segments [AB], [BC] et [CD] avec une croix bleue
 * codeSegments('×','blue',[A,B,C,D]) // Code les segments [AB], [BC], [CD] et [DA] (attention, chemin fermé,pratique pour des polygones pas pour des lignes brisées)
 * codeSegments('×','blue',s1,s2,s3) // Code les segments s1, s2 et s3 avec une croix bleue
 * codeSegments('×','blue',p.listePoints) // Code tous les segments du polygone avec une croix bleue
 *
 * @Auteur Rémi Angot
 */
 function CodeSegments(mark = '||',color = 'black',...args)  {
 	ObjetMathalea2D.call(this);
 	this.svg = function(coeff){
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
	this.tikz = function(){
 		let code = ''
		if (Array.isArray(args[0])) { // Si on donne une liste de points
			for (let i = 0; i < args[0].length-1; i++) {
				code += codeSegment(args[0][i],args[0][i+1],mark,color).tikz()
				code += '\n'
			}
			code += codeSegment(args[0][args[0].length-1],args[0][0],mark,color).tikz()
			code += '\n'
		} else if (args[0].constructor==Segment) {
			for (let i = 0; i < args.length; i++) {
				code += codeSegment(args[i].extremite1,args[i].extremite2,mark,color).tikz()
				code += '\n'
			}
		}else {
			for (let i = 0; i < args.length; i+=2) {
				code += codeSegment(args[i],args[i+1],mark,color).tikz()
				code += '\n'
			}
		}
		return code
	}	
	
}
function codeSegments(...args){
	return new CodeSegments(...args)
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

function Axes(xmin=-30,ymin=-30,xmax=30,ymax=30,thick=0.2,xstep=1,ystep=1,epaisseur=2,color='black'){
	ObjetMathalea2D.call(this)
	let objets = []
	let yabscisse
	ymin > 0 ? yabscisse = ymin : yabscisse = 0
	let xordonnee
	xmin > 0 ? xordonnee = xmin : xordonnee = 0
	let abscisse = segment(xmin,yabscisse,xmax,yabscisse)
	abscisse.styleExtremites = '->'
	abscisse.epaisseur = epaisseur
	abscisse.color = color
	let ordonnee = segment(xordonnee,ymin,xordonnee,ymax)
	ordonnee.styleExtremites = '->'
	ordonnee.epaisseur = epaisseur
	objets.push(abscisse,ordonnee)
	ordonnee.color = color
	for (let x=xmin ; x<xmax ; x = calcul(x+xstep)){
		let s = segment(x,yabscisse-thick,x,yabscisse+thick)
		s.epaisseur = epaisseur
		s.color = color
		objets.push(s)
	}
	for (let y=ymin ; y<ymax ; y=calcul(y+ystep)){
		let s = segment(xordonnee-thick,y,xordonnee+thick,y)
		s.epaisseur = epaisseur
		s.color = color
		objets.push(s)
	}
	this.svg = function (coeff) {
		code = '';
		for (objet of objets) {
			code += '\n\t' + objet.svg(coeff);
		}
		return code;
	};
	this.tikz = function () {
		code = '';
		for (objet of objets) {
			code += '\n\t' + objet.tikz();
		}
		return code;
	};
	this.commentaire = `Axes(xmin = ${xmin}, ymin = ${ymin}, xmax = ${xmax}, ymax = ${ymax}, thick = ${thick})`

}
function axes(...args){
	return new Axes(...args)
}

/**
* labelX(xmin,xmax,step,color,pos,coeff) // Place des graduations
* 
* @Auteur Rémi Angot
*/
function LabelX(xmin=1,xmax=20,step=1,color='black',pos=-.6,coeff=1){
	ObjetMathalea2D.call(this)
	let objets = []
	for (x=Math.ceil(xmin/coeff) ; calcul(x*coeff)<=xmax ; x = calcul(x+step)){
		objets.push(texteParPoint(Intl.NumberFormat("fr-FR",{maximumFractionDigits:20}).format(calcul(x*coeff)).toString(),point(x,pos),'milieu',color))
	}
	this.svg = function (coeff) {
		code = '';
		for (objet of objets) {
			code += '\n\t' + objet.svg(coeff);
		}
		return code;
	};
	this.tikz = function () {
		code = '';
		for (objet of objets) {
			code += '\n\t' + objet.tikz();
		}
		return code;
	};
	this.commentaire = `labelX(xmin=${xmin},xmax=${xmax},step=${step},color=${color},pos=${pos},coeff=${coeff})`

}
function labelX(...args){
	return new LabelX(...args)
}

/**
* labelY(ymin,ymax,step,color,pos,coeff) // Place des graduations
* 
* @Auteur Rémi Angot
*/
function LabelY(ymin=1,ymax=20,step=1,color='black',pos=-.6,coeff=1){
	ObjetMathalea2D.call(this)
	let objets = []	
	for (y=Math.ceil(ymin/coeff) ; calcul(y*coeff)<=ymax ; y = calcul(y+step)){
		objets.push(texteParPoint(Intl.NumberFormat("fr-FR",{maximumFractionDigits:20}).format(calcul(y*coeff)).toString(),point(pos,y),'milieu',color))
	}
	this.svg = function (coeff) {
		code = '';
		for (objet of objets) {
			code += '\n\t' + objet.svg(coeff);
		}
		return code;
	};
	this.tikz = function () {
		code = '';
		for (objet of objets) {
			code += '\n\t' + objet.tikz();
		}
		return code;
	};
	this.commentaire = `labelX(ymin=${ymin},ymax=${ymax},step=${step},color=${color},pos=${pos})`

}


/**
* labelY(ymin,ymax,step,color,pos,coeff) // Place des graduations
* 
* @Auteur Rémi Angot
*/
function labelY(...args){
	return new LabelY(...args)
}

/**
* grille(xmin,ymin,xmax,ymax,color,opacite,pas) // Trace les axes des abscisses et des ordinnées
* 
* @Auteur Rémi Angot
*/
function Grille(xmin = -30, ymin = -30, xmax = 30, ymax = 30, color = 'gray', opacite = .4, step = 1,pointilles=false){
	ObjetMathalea2D.call(this)
	this.color = color
	this.opacite = opacite
	let objets = []
	for (let i = xmin ; i <= xmax ; i+= step){
		let s = segment(i,ymin,i,ymax)
		s.color = this.color
		s.opacite = this.opacite
		if (pointilles) {
			s.pointilles = true
		}
		objets.push(s)
	}
	for (let i = ymin ; i <= ymax ; i+= step){
		let s = segment(xmin,i,xmax,i)
		s.color = this.color
		s.opacite = this.opacite
		if (pointilles) {
			s.pointilles = true
		}
		objets.push(s)
	}
	this.commentaire = `Grille(xmin = ${xmin}, ymin = ${ymin}, xmax = ${xmax}, ymax = ${ymax}, color = ${color}, opacite = ${opacite}, pas = ${step})`
	this.svg = function (coeff) {
		code = '';
		for (objet of objets) {
			code += '\n\t' + objet.svg(coeff);
		}
		return code;
	};
	this.tikz = function () {
		code = '';
		for (objet of objets) {
			code += '\n\t' + objet.tikz();
		}
		return code;
	};
}

function grille(...args){
	return new Grille(...args)
}

function Repere({xmin =-10, xmax = 10, ymin =-10, ymax = 10, xscale = 1, yscale = 1, xstep = 1, ystep = 1,
	graduationColor = 'black', afficheZero = false, axesEpaisseur = 2, axesColor = 'black',
	grillePrincipaleDistance = 1, grillePrincipaleColor = 'gray', grillePrincipaleOpacite = .7,
	grillePrincipalePointilles = false, grillePrincipaleVisible = true,
	grilleSecondaireDistance = .1, grilleSecondaireColor = 'gray', grilleSecondaireOpacite = .3,
	grilleSecondairePointilles = false, grilleSecondaireVisible = false,
	graduationsxMin = xmin, graduationsxMax = xmax, graduationsyMin = ymin, graduationsyMax = ymax,
	positionLabelX = -.6, positionLabelY = -.6, legendeX = 'x', legendeY = 'y', positionLegendeX, 
	positionLegendeY}={}) {
		ObjetMathalea2D.call(this)
		let objets = [];
		if (grillePrincipaleVisible){
			objets.push(grille(calcul(xmin/xscale),calcul(ymin/yscale),calcul(xmax/xscale),calcul(ymax/yscale),grillePrincipaleColor,grillePrincipaleOpacite,grillePrincipaleDistance,grillePrincipalePointilles))
		}
		if (grilleSecondaireVisible){
			objets.push(grille(calcul(xmin/xscale),calcul(ymin/yscale),calcul(xmax/xscale),calcul(ymax/yscale),grilleSecondaireColor,grilleSecondaireOpacite,grilleSecondaireDistance,grilleSecondairePointilles))
		}
		objets.push(axes(calcul(xmin/xscale),calcul(ymin/yscale),calcul(xmax/xscale),calcul(ymax/yscale),.2,xstep,ystep,axesEpaisseur,axesColor))
		let yabscisse
		ymin > 0 ? yabscisse = ymin : yabscisse = 0
		let xordonnee
		xmin > 0 ? xordonnee = xmin : xordonnee = 0
		if (afficheZero){
			objets.push(labelX(premierMultipleSuperieur(xstep,graduationsxMin),graduationsxMax,xstep,graduationColor,calcul(yabscisse/yscale)+positionLabelX,xscale))
			objets.push(labelY(premierMultipleSuperieur(ystep,graduationsyMin),graduationsyMax,ystep,graduationColor,calcul(xordonnee/xscale)+positionLabelY,yscale))
		} else {
			objets.push(labelX(premierMultipleSuperieur(xstep,graduationsxMin),-1,xstep,graduationColor,calcul(yabscisse/yscale)+positionLabelX,xscale))
			objets.push(labelY(premierMultipleSuperieur(ystep,graduationsyMin),-1,ystep,graduationColor,calcul(xordonnee/xscale)+positionLabelY,yscale))
			objets.push(labelX(Math.max(xstep,premierMultipleSuperieur(xstep,graduationsxMin)),graduationsxMax,xstep,graduationColor,calcul(yabscisse/yscale)+positionLabelX,xscale))
			objets.push(labelY(Math.max(ystep,premierMultipleSuperieur(ystep,graduationsyMin)),graduationsyMax,ystep,graduationColor,calcul(xordonnee/xscale)+positionLabelY,yscale))
		}

		if (positionLegendeX === undefined){
			positionLegendeX = [xmax+.2,yabscisse+.3]
		}
		if (positionLegendeY === undefined){
			positionLegendeY = [xordonnee+.3,ymax+.2]
		}
		objets.push(texteParPosition(legendeX,calcul(positionLegendeX[0]/xscale),calcul(positionLegendeX[1]/yscale),'droite'))
		objets.push(texteParPosition(legendeY,calcul(positionLegendeY[0]/xscale),calcul(positionLegendeY[1]/yscale),'droite'))


		this.svg = function (coeff) {
			code = '';
			for (objet of objets) {
				code += '\n\t' + objet.svg(coeff);
			}
			return code;
		};
		this.tikz = function () {
			code = '';
			for (objet of objets) {
				code += '\n\t' + objet.tikz();
			}
			return code;
		};

		return [xscale,yscale]

	}

	function repere(...args){
		return new Repere(...args)
	}


/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%% LES COURBES DE FONCTIONS %%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
* courbe(f,xmin,xmax,color,repere,step) // Trace la courbe de f
* 
* @Auteur Rémi Angot
*/

function courbe(f,xmin=-1,xmax=30,color = 'black',epaisseur = 2,r=[1,1],step=.1,){
	ObjetMathalea2D.call(this)
	this.color = color
	let xscale = r[0]
	let yscale = r[1]
	let points = []
	for (let x = calcul(xmin/xscale) ; x<=calcul(xmax/xscale) ; x = calcul(x+step)){
		if (isFinite(f(x*xscale))) {
			points.push(point(x,f(x*xscale)/yscale))
		} else {

		}
	}
	let p = polyline([...points],this.color)
	p.epaisseur = epaisseur
	return p
}



/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%% LES INTERVALLES %%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/


function CrochetD(A,color = 'blue'){
	ObjetMathalea2D.call(this)
	this.epaisseur = 2
	this.color = color
	this.svg = function(coeff){
		if (this.epaisseur!=1) {
			this.style += ` stroke-width="${this.epaisseur}" `
		}
		if (this.pointilles) {
			this.style += ` stroke-dasharray="4 3" `
		}
		code = `<polyline points="${calcul(A.xSVG(coeff)+.2*coeff)},${calcul(.4*coeff)} ${A.xSVG(coeff)},${calcul(.4*coeff)} ${A.xSVG(coeff)},${calcul(-.4*coeff)} ${calcul(A.xSVG(coeff)+.2*coeff)},${calcul(-.4*coeff)}" fill="none" stroke="${this.color}" ${this.style} />`
		code += `\n\t<text x="${A.xSVG(coeff)}" y="${1*coeff}" text-anchor="middle" dominant-baseline="central" fill="${this.color}">${A.nom}</text>\n `; 
		return code
	}
	this.tikz = function() {
		code = `\\draw[very thick,${this.color}] (${calcul(A.x+.15)},.2)--(${A.x},.2)--(${A.x},-.2)--(${calcul(A.x+.15)},-.2);`
		code += `\n\t\\draw[${this.color}] (${A.x},-.2) node[below] {$${A.nom}$};`;
		return code
	}
}
function crochetD(...args){
	return new CrochetD(...args)
}

function CrochetG(A,color = 'blue'){
	ObjetMathalea2D.call(this)
	this.epaisseur = 2
	this.color = color
	this.svg = function(coeff){
		if (this.epaisseur!=1) {
			this.style += ` stroke-width="${this.epaisseur}" `
		}
		if (this.pointilles) {
			this.style += ` stroke-dasharray="4 3" `
		}
		code = `<polyline points="${calcul(A.xSVG(coeff)-.2*coeff)},${calcul(.4*coeff)} ${A.xSVG(coeff)},${calcul(.4*coeff)} ${A.xSVG(coeff)},${calcul(-.4*coeff)} ${calcul(A.xSVG(coeff)-.2*coeff)},${calcul(-.4*coeff)}" fill="none" stroke="${this.color}" ${this.style} />`
		code += `\n\t<text x="${A.xSVG(coeff)}" y="${1*coeff}" text-anchor="middle" dominant-baseline="central" fill="${this.color}">${A.nom}</text>\n `; 
		return code
	}
	this.tikz = function() {
		code = `\\draw[very thick,${this.color}] (${calcul(A.x-.15)},.2)--(${A.x},.2)--(${A.x},-.2)--(${calcul(A.x-.15)},-.2);`
		code += `\n\t\\draw[${this.color}] (${A.x},-.2) node[below] {$${A.nom}$};`;
		return code
	}
}
function crochetG(...args){
	return new CrochetG(...args)
}

function intervalle(A,B,color = 'blue', h=0){
	let A1 = point(A.x,A.y+h)
	let B1 = point(B.x,B.y+h)
	let s = segment(A1,B1)
	s.epaisseur = 3
	s.color = color
	return s
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
function TexteParPoint(texte,A,orientation = "milieu",color) {
	ObjetMathalea2D.call(this);
	this.color=color
	this.svg = function(coeff){
		let code =''
		if (Number.isInteger(orientation)) {
			code = `<text x="${A.xSVG(coeff)}" y="${A.ySVG(coeff)}" text-anchor="middle" dominant-baseline="central" fill="${this.color}" transform="rotate(${orientation} ${A.xSVG(coeff)} ${A.ySVG(coeff)})">${texte}</text>\n `; 
		} else {
			switch (orientation){
				case 'milieu':
				code = `<text x="${A.xSVG(coeff)}" y="${A.ySVG(coeff)}" text-anchor="middle" dominant-baseline="central" fill="${this.color}">${texte}</text>\n `; 
				break;
				case 'gauche':
				code = `<text x="${A.xSVG(coeff)}" y="${A.ySVG(coeff)}" text-anchor="end" dominant-baseline="central" fill="${this.color}">${texte}</text>\n `; 
				break;
				case 'droite':
				code = `<text x="${A.xSVG(coeff)}" y="${A.ySVG(coeff)}" text-anchor="start" dominant-baseline="central" fill="${this.color}">${texte}</text>\n `; 
				break;
			}
		}

		return code
	}
	this.tikz = function(){
		let code = ''
		if (typeof(orientation)=='number') {
			code = `\\draw (${A.x},${A.y}) node[anchor = center, rotate = ${-orientation}] {${texte}};`;
		} else {
			let anchor = '';
			if (orientation=='gauche') {
				anchor = 'node[anchor = east]'
			}
			if (orientation=='droite') {
				anchor = 'node[anchor = west]'
			}
			if (orientation=='milieu') {
				anchor = 'node[anchor = center]'
			}
			code = `\\draw (${A.x},${A.y}) ${anchor} {${texte}};`;
		}
		return code
	}

}
function texteParPoint(...args){
	return new TexteParPoint(...args)
}

/**
* texteParPoint('mon texte',x,y) // Écrit 'mon texte' avec le point de coordonnées (x,y) au centre du texte
* texteParPoint('mon texte',x,y,'gauche') // Écrit 'mon texte' à gauche de le point de coordonnées (x,y) (qui sera la fin du texte)
* texteParPoint('mon texte',x,y,'droite') // Écrit 'mon texte' à droite de le point de coordonnées (x,y) (qui sera le début du texte)
* texteParPoint('mon texte',x,y,45) // Écrit 'mon texte'  centré sur le point de coordonnées (x,y) avec une rotation de 45°
*
* @Auteur Rémi Angot
*/
function texteParPosition(texte,x,y,orientation = "milieu",color){
	return new TexteParPoint(texte,point(x,y),orientation,color)
}


/**
* texteParPoint('mon texte',A) // Écrit 'mon texte' avec A au centre du texte
* texteParPoint('mon texte',A,'gauche') // Écrit 'mon texte' à gauche de A (qui sera la fin du texte)
* texteParPoint('mon texte',A,'droite') // Écrit 'mon texte' à droite de A (qui sera le début du texte)
* texteParPoint('mon texte',A,45) // Écrit 'mon texte' à centré sur A avec une rotation de 45°
*
* @Auteur Rémi Angot
*/
function LatexParPoint(texte,A,color) {
	ObjetMathalea2D.call(this);
	this.color=color
	this.svg = function(coeff){
		return `<foreignObject style="overflow: visible;" y="${A.ySVG(coeff)}" x="${A.xSVG(coeff)}" width="200" height="50"><div>${texte}</div></foreignObject`
	}
	this.tikz = function(){
		let code = `\\draw (${A.x},${A.y}) node[anchor = center] {${texte}};`;
		return code
	}

}
function latexParPoint(...args){
	return new LatexParPoint(...args)
}

function latexParCoordonnees(texte,x,y){
	let A = point(x,y)
	return latexParPoint(texte,A)
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
 	let A2 = rotation(A,O,90);
 	let v = vecteur(O,B), u = vecteur(O,A2)
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
* couleurAleatoire() renvoie le code d'une couleur au hasard
*
* @Auteur Rémi Angot
*/
function couleurAleatoire() {
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += choice([0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F']);
	}
	return color;
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
function codeSvg(...objets){
	let code = ''
	code = `<svg width="600" height="400" viewBox="-20 -200 600 400" xmlns="http://www.w3.org/2000/svg">\n`
	for (let objet of objets){
		if (Array.isArray(objet)) {
			for (let i = 0; i < objet.length; i++) {
				try {
					if (objet[i].isVisible) {
						code += '\t' + objet[i].svg(coeff) + '\n'
					}
				} catch (error){
					
				}
			}
		}
		try {
			if (objet.isVisible) {
				code += '\t' + objet.svg(coeff) + '\n';
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
	}
	\\clip (-1,-5) rectangle (15,10);

	\n\n`
	for (let objet of objets){
		if (Array.isArray(objet)) {
			for (let i = 0; i < objet.length; i++) {
				try {
					if (objet[i].isVisible) {
						code += '\t' + objet[i].tikz() + '\n'
					}
				} catch (error){

				}
			}
		}
		try {
			if (objet[i].isVisible) {
				code += '\t' + objet.tikz() + '\n'
			}
		} catch (error) {

		}
	}
	code += `\\end{tikzpicture}\n`
	return code;
}




/**
* mathalea2d(xmin,xmax,ymin,ymax,objets)
*
* @Auteur Rémi Angot
*/

function mathalea2d({xmin = 0, ymin = 0, xmax = 15, ymax = 6, pixelsParCm = 20, scale = 1 } = {},...objets){
	ObjetMathalea2D.call(this)
	let code = ''
	if (sortie_html) {
		code = `<svg width="${(xmax-xmin)*pixelsParCm}" height="${(ymax-ymin)*pixelsParCm}" viewBox="${xmin*pixelsParCm} ${-ymax*pixelsParCm} ${(xmax-xmin)*pixelsParCm} ${(ymax-ymin)*pixelsParCm}" xmlns="http://www.w3.org/2000/svg">\n`;
		//code += codeSvg(...objets);
		for (let objet of objets){
			if (Array.isArray(objet)) {
				for (let i = 0; i < objet.length; i++) {
					try {
						if (objet[i].isVisible) {
							code += '\t' + objet[i].svg(pixelsParCm) + '\n'
						}
					} catch (error){

					}
				}
			}
			try {
				if (objet.isVisible) {
					code += '\t' + objet.svg(pixelsParCm) + '\n';
				}
			} catch (error) {

			}
		}
		code += `\n</svg>`;
//		pixelsParCm = 20;
	} else {
		if (scale == 1) {
			code = `\\begin{tikzpicture}[baseline]\n`
		} else {
			code = `\\begin{tikzpicture}[baseline,scale = ${scale}]\n`
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


		`
	//code += codeTikz(...objets)
	for (let objet of objets){
		if (Array.isArray(objet)) {
			for (let i = 0; i < objet.length; i++) {
				try {
					if (objet[i].isVisible) {
						code += '\t' + objet[i].tikz() + '\n'
					}
				} catch (error){

				}
			}
		}
		try {
			if (objet.isVisible) {
				code += '\t' + objet.tikz() + '\n';
			}
		} catch (error) {

		}
	}
	code += `\n\\end{tikzpicture}`
}
return code
}



