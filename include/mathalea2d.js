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
	this.coeff = 20; // 1 cm est représenté par 20 pixels
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
	this.xSVG = function() {
		return this.x*this.coeff;
	}
	this.ySVG = function() {
		return -this.y*this.coeff;
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
* tracePoint(A,'blue',.5) //Place une croix bleue de taille 5 mm à l'emplacement du point A
* tracePoint(A,B,C,D) // Place une croix pour les différents points
* tracePoint([A,B,C,D],'blue') // Place une croix pour les différents points
* tracePoint(A,B,C,D,'blue') // Place une croix pour les différents points
* La taille n'a un effet que sur la sortie SVG
* @Auteur Rémi Angot
*/
function TracePoint(A,color='black',taille=0.3,){
	ObjetMathalea2D.call(this);
	this.color = color;
	this.svg = function(){
		let code = `<line x1="${calcul((A.x-taille)*this.coeff)}" y1="${calcul((-A.y-taille)*this.coeff)}" x2="${calcul((A.x+taille)*this.coeff)}" y2="${calcul((-A.y+taille)*this.coeff)}" stroke="${this.color}" />`
		code += `\n\t<line x1="${calcul((A.x-taille)*this.coeff)}" y1="${calcul((-A.y+taille)*this.coeff)}" x2="${calcul((A.x+taille)*this.coeff)}" y2="${calcul((-A.y-taille)*this.coeff)}" stroke="${this.color}" />`
		return code 
	}
	this.tikz = function(){
		if (color =='black') {
			return `\\node[point] at (${A.x},${A.y}) {};`
		} else {
			return `\\node[point,${color}] at (${A.x},${A.y}) {};`
		}
	}
}
function tracePoint(...args){
	let obj = []
	if (args[1] && args[1].constructor==Point) { // Si le 2e argument est un point
		if (typeof args[args.length-1] === 'string') { // Si le dernier est un string
			for (let i = 0; i < args.length-1; i++) {
				obj[i] = new TracePoint(args[i],args[args.length-1]) // Trace tous les points avec le dernier paramètre
			}
		} else {
			for (let i = 0; i < args.length; i++) {
				obj[i] = new TracePoint(args[i]) 
			}
		}
			
	} else if (Array.isArray(args[0])) { // Si le 1er argument est une liste
		let listeDePoints = args[0]
		let parametres = args.slice() // On reprend tous les arguments sauf le premier
		parametres.shift() // On reprend tous les arguments sauf le premier
		for (let i = 0; i < listeDePoints.length; i++) {
			obj[i] = new TracePoint(listeDePoints[i],parametres) 
		}
	} else {
		return new TracePoint(...args)
	}
}

/**
* M = milieu(A,B) //M est le milieu de [AB]
* M = milieu(A,B,'M') //M est le milieu [AB] et se nomme M
* M = milieu(A,B,'M','below') //M est le milieu [AB], se nomme M et le nom est en dessous du point
*
* @Auteur Rémi Angot
*/
function milieu(A,B,nom,positionLabel){
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
function pointSurSegment(A,B,l,nom,positionLabel){
	if (l===undefined || typeof l =='string') {
		l = calcul(longueur(A,B)*randint(15,85)/100)
	}
	return homothetie(B,A,calcul(l/longueur(A,B)),nom,positionLabel)
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
	this.svg = function(){
		let code = "";
		if (Array.isArray(points[0])) { //Si le premier argument est un tableau
			this.listePoints = points[0]
		} else {
			this.listePoints = points
		}
		for (let point of this.listePoints){
			switch (point.positionLabel){
				case 'left':
				code += `\t<text x="${calcul(point.xSVG()-15)}" y="${point.ySVG()}" text-anchor="middle" dominant-baseline="central" fill="${this.color}">${point.nom}</text>\n `; 
				break;
				case 'right':
				code += `\t<text x="${calcul(point.xSVG()+15)}" y="${point.ySVG()}" text-anchor="middle" dominant-baseline="central" fill="${this.color}">${point.nom}</text>\n `; 
				break;
				case 'below':
				code += `\t<text x="${point.xSVG()}" y="${calcul(point.ySVG()+15)}" text-anchor="middle" dominant-baseline="central" fill="${this.color}">${point.nom}</text>\n `; 
				break;
				case 'above':
				code += `\t<text x="${point.xSVG()}" y="${calcul(point.ySVG()-15)}" text-anchor="middle" dominant-baseline="central" fill="${this.color}">${point.nom}</text>\n `; 
				break;
				case 'above right':
				code += `\t<text x="${calcul(point.xSVG()+15)}" y="${calcul(point.ySVG()-15)}" text-anchor="middle" dominant-baseline="central" fill="${this.color}">${point.nom}</text>\n `; 
				break;
				case 'below left':
				code += `\t<text x="${calcul(point.xSVG()-15)}" y="${calcul(point.ySVG()+15)}" text-anchor="middle" dominant-baseline="central" fill="${this.color}">${point.nom}</text>\n `; 
				break;
				case 'below right':
				code += `\t<text x="${calcul(point.xSVG()+15)}" y="${calcul(point.ySVG()+15)}" text-anchor="middle" dominant-baseline="central" fill="${this.color}">${point.nom}</text>\n `; 
				break;
				default :
				code += `\t<text x="${calcul(point.xSVG()-15)}" y="${calcul(point.ySVG()-15)}" text-anchor="middle" dominant-baseline="central" fill="${this.color}">${point.nom}</text>\n `; 
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
	if (this.b==0) {
		this.angleAvecHorizontale = 90
	} else {
		this.angleAvecHorizontale = calcul(Math.atan(this.pente)*180/Math.PI,1)

	}
	this.normal= vecteur(this.a,this.b)
	this.directeur= vecteur(-this.b,this.a)
	this.svg = function(){
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
		return `<line x1="${A1.xSVG()}" y1="${A1.ySVG()}" x2="${B1.xSVG()}" y2="${B1.ySVG()}" stroke="${this.color}" ${this.style} />`
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
 * m = codageMediatrice(A,B,'blue','X') // Ajoute le codage du milieu et de l'angle droit pour la médiatrice de [AB] en bleu
 * 
 * @Auteur Rémi Angot
 */
function CodageMediatrice(A,B,color='black',mark='X'){
	ObjetMathalea2D.call(this)
	this.color = color
	let O = milieu(A,B)
    let M = rotation(A,O,90)
	let c = codageAngleDroit(M,O,B,this.color)
	let v = codeSegments(mark,this.color,A,O, O,B)
	this.svg = function(){
		return c.svg() + '\n' + v.svg()
	}
	this.tikz = function(){
		return c.tikz() + '\n' + v.tikz()
	}
}

function codageMediatrice(...args){
	return new CodageMediatrice(...args)
}

/**
 * d = bissectrice(A,B) // Bissectrice de [AB]
 * d = bissectrice(A,B,'blue') // Bissectrice de [AB] en bleu
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
	for (let point of points){
		this.nom += point.nom
	}
	this.svg = function(){
		if (this.epaisseur!=1) {
			this.style += ` stroke-width="${this.epaisseur}" `
		}
		if (this.pointilles) {
			this.style += ` stroke-dasharray="4 3" `
		}
		let binomeXY = "";
		for (let point of this.listePoints){
			binomeXY += `${calcul(point.x*this.coeff)},${calcul(-point.y*this.coeff)} `; 		
		}		
		return `<polyline points="${binomeXY}" fill="none" stroke="${this.color}" ${this.style} />`
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
	this.xSVG = function() {
		return this.x*this.coeff;
	}
	this.ySVG = function() {
		return -this.y*this.coeff;
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
	this.angleAvecHorizontale = calcul(Math.atan2(this.y2-this.y1, this.x2-this.x1)*180/Math.PI); 

	this.svg = function(){
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
				code += `<line x1="${B1.xSVG()}" y1="${B1.ySVG()}" x2="${B2.xSVG()}" y2="${B2.ySVG()}" stroke="${this.color}" />`
			}
			if (this.styleExtremites.substr(-1)=='>') { //si ça termine par > on rajoute une flèche en B
				let M = pointSurSegment(B,A,.2)
				let B1 = rotation(B,M,90)
				let B2 = rotation(B,M,-90)
				code += `<line x1="${B.xSVG()}" y1="${B.ySVG()}" x2="${B1.xSVG()}" y2="${B1.ySVG()}" stroke="${this.color}" />`
				code += `\n\t<line x1="${B.xSVG()}" y1="${B.ySVG()}" x2="${B2.xSVG()}" y2="${B2.ySVG()}" stroke="${this.color}" />`
			}
			if (this.styleExtremites[0]=='<') { //si ça comment par < on rajoute une flèche en A
				let M = pointSurSegment(A,B,.2)
				let A1 = rotation(A,M,90)
				let A2 = rotation(A,M,-90)
				code += `<line x1="${A.xSVG()}" y1="${A.ySVG()}" x2="${A1.xSVG()}" y2="${A1.ySVG()}" stroke="${this.color}" />`
				code += `\n\t<line x1="${A.xSVG()}" y1="${A.ySVG()}" x2="${A2.xSVG()}" y2="${A2.ySVG()}" stroke="${this.color}" />`

			}
			if (this.styleExtremites[0]=='|') { //si ça commence par | on le rajoute en A
				let N = pointSurSegment(A,B,.2)
				let A1 = rotation(N,A,90)
				let A2 = rotation(N,A,-90)
				code += `<line x1="${A1.xSVG()}" y1="${A1.ySVG()}" x2="${A2.xSVG()}" y2="${A2.ySVG()}" stroke="${this.color}" />`

			}		
		}
		code +=`\n\t<line x1="${A.xSVG()}" y1="${A.ySVG()}" x2="${B.xSVG()}" y2="${B.ySVG()}" stroke="${this.color}" ${this.style} />`
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
	let binomeXY = "";
		for (let point of this.listePoints){
			binomeXY += `${calcul(point.x*this.coeff)},${calcul(-point.y*this.coeff)} `; 
		}
	this.binomesXY = binomeXY
	this.svg = function(){
		if (this.epaisseur!=1) {
			this.style += ` stroke-width="${this.epaisseur}" `
		}
		if (this.pointilles) {
			this.style += ` stroke-dasharray="4 3" `
		}
		if (this.opacite !=1) {
			this.style += ` stroke-opacity="${this.opacite}" `
		}
		
		return `<polygon points="${binomeXY}" fill="none" stroke="${this.color}" ${this.style} />`
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

function CodageCarre(c,color = 'black',mark='X'){
	let objets = []
	objets.push(codeSegments(mark,color,c.listePoints))
	objets.push(codageAngleDroit(c.listePoints[0],c.listePoints[1],c.listePoints[2],color))
	objets.push(codageAngleDroit(c.listePoints[1],c.listePoints[2],c.listePoints[3],color))
	objets.push(codageAngleDroit(c.listePoints[2],c.listePoints[3],c.listePoints[0],color))
	objets.push(codageAngleDroit(c.listePoints[3],c.listePoints[0],c.listePoints[1],color))
	this.svg = function(){
		return objets[0].svg()+objets[1].svg()+objets[2].svg()+objets[3].svg()+objets[4].svg()
	}
	this.tikz = function(){
		return objets[0].tikz()+objets[1].tikz()+objets[2].tikz()+objets[3].tikz()+objets[4].tikz()
	}
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
* nommePolygone(p1,'ABCDEF') // Nomme tous les sommets de p1 (dans l'ordre de création des points)
* @Auteur Rémi Angot
*/
function nommePolygone(p,nom){
	for (let i=0 ; i < p.listePoints.length ; i++){
  		p.listePoints[i].nom = nom[i] 
	}
	labelPoint(p.listePoints)
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
	this.svg = function(){
		if (this.epaisseur!=1) {
			this.style += ` stroke-width="${this.epaisseur}" `
		}
		if (this.pointilles) {
			this.style += ` stroke-dasharray="4 3" `
		}
		if (this.opacite !=1) {
			this.style += ` stroke-opacity="${this.opacite}" `
		}

		return `<circle cx="${O.xSVG()}" cy="${O.ySVG()}" r="${r*this.coeff}" stroke="${this.color}" ${this.style} fill="none"/>`
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
	if (rayon) 	this.svg = function(){
		return `<path d="M${M.xSVG()} ${M.ySVG()} A ${l*this.coeff} ${l*this.coeff} 0 ${large} ${sweep} ${N.xSVG()} ${N.ySVG()} L ${Omega.xSVG()} ${Omega.ySVG()} Z" stroke="${this.color}" fill="${fill}"/>`
		}
	else 	this.svg = function(){
		return `<path d="M${M.xSVG()} ${M.ySVG()} A ${l*this.coeff} ${l*this.coeff} 0 ${large} ${sweep} ${N.xSVG()} ${N.ySVG()}" stroke="${this.color}" fill="${fill}"/>`
	}
	this.tikz = function(){
		return `\\draw (${M.x},${M.y}) arc (0:${angle}:${longueur(Omega,M)}) ;`
	}
}
function arc(...args) {
	return new Arc(...args)
}

function ArcPointPointAngle(M,N,angle,rayon=false,fill='none',color='black'){
	ObjetMathalea2D.call(this);
	this.color=color;
	this.fill=fill;
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
	// mais où est Omega ?
	let Omega//
	if (rayon) 	this.svg = function(){
		return `<path d="M${M.xSVG()} ${M.ySVG()} A ${l*this.coeff} ${l*this.coeff} 0 ${large} ${sweep} ${N.xSVG()} ${N.ySVG()} L ${Omega.xSVG()} ${Omega.ySVG()} Z" stroke="${this.color}" fill="${fill}"/>`
		}
	else 	this.svg = function(){
		return `<path d="M${M.xSVG()} ${M.ySVG()} A ${l*this.coeff} ${l*this.coeff} 0 ${large} ${sweep} ${N.xSVG()} ${N.ySVG()}" stroke="${this.color}" fill="${fill}"/>`
	}
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
	if (O.constructor==DemiDroite) {
		let M = translation(O.extremite1,v)
		let N = translation(O.extremite2,v)
		let s = demiDroite(M,N)
		s.styleExtremites = O.styleExtremites
		return s
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
	if (O.constructor==DemiDroite) {
		let M = translation2Points(O.extremite1,A,B)
		let N = translation2Points(O.extremite2,A,B)
		let s = demiDroite(M,N)
		s.styleExtremites = O.styleExtremites
		return s
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
	if (A.constructor==DemiDroite) {
		let M = rotation(A.extremite1,O,angle)
		let N = rotation(A.extremite2,O,angle)
		let s = demiDroite(M,N)
		s.styleExtremites = A.styleExtremites
		return s
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
	if (A.constructor==DemiDroite) {
		let M = homothetie(A.extremite1,O,k)
		let N = homothetie(A.extremite2,O,k)
		let s = demiDroite(M,N)
		s.styleExtremites = A.styleExtremites
		return s
	}
}

/**
 * M = pointParSymetrieAxiale(A,d)// M est l'image de A dans la symétrie axiale d'axe d.
 * d est un objet de type Droite (son équation ax+by+c=0 renseignée)
 * A est un objet de type Point (ses coordonnées x et y renseignées)
 * @Auteur Jean-Claude Lhote
 */
function symetrieAxiale(A,d,nom='',positionLabel = 'above') {
	if (A.constructor==Point) {
		let x,y
		let a=d.a,b=d.b,c=d.c,k=1/(a*a+b*b)
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
	if (A.constructor==DemiDroite) {
		let M = symetrieAxiale(A.extremite1,d)
		let N = symetrieAxiale(A.extremite2,d)
		let s = demiDroite(M,N)
		s.styleExtremites = A.styleExtremites
		return s
	}
}

/**
* N = projectionOrtho(M,d,'N','below left')
*@Auteur Jean-Claude Lhote
*/
function projectionOrtho(M,d,nom = ' ',positionLabel = 'above') {
	let a=d.a,b=d.b,c=d.c,k=calcul(1/(a*a+b*b));
	let x,y;
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
/**
 * N = affiniteOrtho(M,d,rapport,'N','rgiht')
 * @Auteur = Jean-Claude Lhote
 */
function affiniteOrtho(A, d, k, nom = ' ', positionLabel = 'above') {
	if (A.constructor == Point) {
		let a = d.a, b = d.b, c = d.c, q = calcul(1 / (a * a + b * b));
		let x, y;
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
	if (A.constructor == DemiDroite) {
		let M = affiniteOrtho(A.extremite1, d,k)
		let N = affiniteOrtho(A.extremite2, d,k)
		let s = demiDroite(M, N)
		s.styleExtremites = A.styleExtremites
		return s
	}
}

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
	if (A.constructor==DemiDroite) {
		let M = similitude(A.extremite1,O,a,k)
		let N = similitude(A.extremite2,O,a,k)
		let s = demiDroite(M,N)
		s.styleExtremites = A.styleExtremites
		return s
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
	this.svg = function(){
		let code =  `<g> `
		if (Array.isArray(liste)) {
			for(const objet of liste){
				code += '\n' + objet.svg()
			}
		} else { //si ce n'est pas une liste
				code += '\n' + liste.svg()
		}
			
		code += `<animateTransform
   attributeName="transform"
   type="rotate"
   from="0 ${O.xSVG()} ${O.ySVG()}"
   to="${-angle} ${O.xSVG()} ${O.ySVG()}"
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
	this.svg = function(){
	let binomesXY1 = p.binomesXY
	let p2 = homothetie(p,O,k)
	let binomesXY2 = p2.binomesXY
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
	this.svg = function(){
		let binomesXY1 = p.binomesXY
		let p2 = symetrieAxiale(p,d)
		let binomesXY2 = p2.binomesXY
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
	this.svg = function(){
		let binomesXY1 = p.binomesXY
		let p2 = affiniteOrtho(p,d,k)
		let binomesXY2 = p2.binomesXY
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
	this.svg = function(){
		if (d.isVisible) {
			return c.svg() + '\n\t' + d.svg()
		} else {
			return c.svg()
		}
	}
	this.tikz = function(){
		return c.tikz() + '\n\t' + d.tikz()
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
	this.svg = function(){
		return c.svg()
	}
	this.tikz = function(){
		return c.tikz()
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
		angle = 180-parseInt(s.angleAvecHorizontale)
	}
	return texteParPoint(longueur,N,angle,this.color)
	
}
function afficheLongueurSegment(...args){
	return new AfficheLongueurSegment(...args)
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
 * codeSegment(A,B,'X','blue') // Code le segment [AB] avec une croix bleue
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
	this.svg = function(){
		let code = ''
		if (Array.isArray(args[0])) { // Si on donne une liste de points
			for (let i = 0; i < args[0].length-1; i++) {
				code += codeSegment(args[0][i],args[0][i+1],mark,color).svg()
				code += '\n'
			}
				code += codeSegment(args[0][args[0].length-1],args[0][0],mark,color).svg()
				code += '\n'
		} else if (args[0].constructor==Segment) {
			for (let i = 0; i < args.length; i++) {
				code += codeSegment(args[i].extremite1,args[i].extremite2,mark,color).svg()
				code += '\n'
			}
		}else {
			for (let i = 0; i < args.length; i+=2) {
				code += codeSegment(args[i],args[i+1],mark,color).svg()
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
* axes(xmin,ymin,xmax,ymax,thick) // Trace les axes des abscisses et des ordinnées
* 
* @Auteur Rémi Angot
*/

function Axes(xmin=-1,ymin=-10,xmax=30,ymax=10,thick=.2,step=1){
	let objets = []
	objets.push(segment(xmin,0,xmax,0), segment(0,ymin,0,ymax) )
	for (let x=xmin ; x<=xmax ; x+=step){
	  objets.push(segment(x,-thick,x,thick))
	}
	for (let y=ymin ; y<=ymax ; y+=step){
	  objets.push(segment(-thick,y,thick,y))
	}
	this.svg = function(){
		code = ''
		for (objet of objets){
			code += '\n\t' + objet.svg()
		}
		return code
	}
	this.tikz = function(){
		code = ''
		for (objet of objets){
			code += '\n\t' + objet.tikz()
		}
		return code
	}
	this.commentaire = `Repère(xmin = ${xmin}, ymin = ${ymin}, xmax = ${xmax}, ymax = ${ymax}, thick = ${thick})`

}
function axes(...args){
	return new Axes(...args)
}

/**
* grille(xmin,ymin,xmax,ymax,color,opacite,pas) // Trace les axes des abscisses et des ordinnées
* 
* @Auteur Rémi Angot
*/
function Grille(xmin = -1, ymin = -10, xmax = 20, ymax = 10, color = 'gray', opacite = .4, step = 1){
	ObjetMathalea2D.call(this)
	this.color = color
	this.opacite = opacite
	let listeSegments = []
	for (i = xmin ; i <= xmax ; i+= step){
	  listeSegments[i] = segment(i,ymin,i,ymax)
	  listeSegments[i].color = this.color
	  listeSegments[i].opacite = this.opacite
	}
	for (i = ymin ; i <= ymax ; i+= step){
	  listeSegments[i] = segment(xmin,i,xmax,i)
	  listeSegments[i].color = this.color
	  listeSegments[i].opacite = this.opacite
	}
	this.commentaire = `Grille(xmin = ${xmin}, ymin = ${ymin}, xmax = ${xmax}, ymax = ${ymax}, color = ${color}, opacite = ${opacite}, pas = ${step})`
	this.svg = function(){
		code = ''
		for (s of listeSegments){
			code += '\n\t' + s.svg()
		}
		return code
	}
	this.tikz = function(){
		code = ''
		for (s of listeSegments){
			code += '\n\t' + s.tikz()
		}
		return code
	}
}

function grille(...args){
	return new Grille(...args)
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
	this.svg = function(){
		if (this.epaisseur!=1) {
			this.style += ` stroke-width="${this.epaisseur}" `
		}
		if (this.pointilles) {
			this.style += ` stroke-dasharray="4 3" `
		}
		code = `<polyline points="${calcul(A.xSVG()+.2*this.coeff)},${calcul(.4*this.coeff)} ${A.xSVG()},${calcul(.4*this.coeff)} ${A.xSVG()},${calcul(-.4*this.coeff)} ${calcul(A.xSVG()+.2*this.coeff)},${calcul(-.4*this.coeff)}" fill="none" stroke="${this.color}" ${this.style} />`
		code += `\n\t<text x="${A.xSVG()}" y="${1*this.coeff}" text-anchor="middle" dominant-baseline="central" fill="${this.color}">${A.nom}</text>\n `; 
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
	this.svg = function(){
		if (this.epaisseur!=1) {
			this.style += ` stroke-width="${this.epaisseur}" `
		}
		if (this.pointilles) {
			this.style += ` stroke-dasharray="4 3" `
		}
		code = `<polyline points="${calcul(A.xSVG()-.2*this.coeff)},${calcul(.4*this.coeff)} ${A.xSVG()},${calcul(.4*this.coeff)} ${A.xSVG()},${calcul(-.4*this.coeff)} ${calcul(A.xSVG()-.2*this.coeff)},${calcul(-.4*this.coeff)}" fill="none" stroke="${this.color}" ${this.style} />`
		code += `\n\t<text x="${A.xSVG()}" y="${1*this.coeff}" text-anchor="middle" dominant-baseline="central" fill="${this.color}">${A.nom}</text>\n `; 
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
	this.svg = function(){
		let code =''
		if (Number.isInteger(orientation)) {
			code = `<text x="${A.xSVG()}" y="${A.ySVG()}" text-anchor="middle" dominant-baseline="central" fill="${this.color}" transform="rotate(${orientation} ${A.xSVG()} ${A.ySVG()})">${texte}</text>\n `; 
		} else {
			switch (orientation){
				case 'milieu':
				code = `<text x="${A.xSVG()}" y="${A.ySVG()}" text-anchor="middle" dominant-baseline="central" fill="${this.color}">${texte}</text>\n `; 
				break;
				case 'gauche':
				code = `<text x="${A.xSVG()}" y="${A.ySVG()}" text-anchor="end" dominant-baseline="central" fill="${this.color}">${texte}</text>\n `; 
				break;
				case 'droite':
				code = `<text x="${A.xSVG()}" y="${A.ySVG()}" text-anchor="start" dominant-baseline="central" fill="${this.color}">${texte}</text>\n `; 
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
	this.svg = function(){
		return `<foreignObject style="overflow: visible;" y="${A.ySVG()}" x="${A.xSVG()}" width="200" height="50"><div>${texte}</div></foreignObject`
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
						code += '\t' + objet[i].svg() + '\n'
					}
				} catch (error){
					
				}
			}
		}
		try {
			if (objet.isVisible) {
				code += '\t' + objet.svg() + '\n';
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
function mathalea2d(xmin,ymin,xmax,ymax,...objets){
	ObjetMathalea2D.call(this)
	let code = ''
	if (sortie_html) {
		code = `<svg width="${(xmax-xmin)*this.coeff}" height="${(ymax-ymin)*this.coeff}" viewBox="${xmin*this.coeff} ${-ymax*this.coeff} ${(xmax-xmin)*this.coeff} ${(ymax-ymin)*this.coeff}" xmlns="http://www.w3.org/2000/svg">\n`;
		//code += codeSvg(...objets);
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
					code += '\t' + objet.svg() + '\n';
				}
			} catch (error) {

			}
		}
		code += `</svg>`;
	} else {
		code = `\\begin{tikzpicture}[baseline]\n
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
	code += `\\end{tikzpicture}`
	}
	return code
}



