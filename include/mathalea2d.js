/**
* A = new Point('A') //son nom
* A = new Point(x,y) //ses coordonnées
* A = new Point(x,y,'A') //ses coordonnées et son nom
* A = new Point(x,y,,'A';below') //ses coordonnées,son nom et la position de son label
*
* @Auteur Rémi Angot
*/
function Point(arg1,arg2,arg3,positionLabel = 'above left') {
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
	
	this.milieu = function (A,B) { 
		this.x = calcul((A.x+B.x)/2);
		this.y = calcul((A.y+B.y)/2);
	}
	this.translationVecteur = function (A,v) { //Image de A dans la translation de vecteur v
		this.x = calcul(A.x+v.x);
		this.y = calcul(A.y+v.y);
	} ;
	this.translation = function(O,A,B) { //Image de O dans la translation qui transforme A en B
		this.x = calcul(O.x+B.x-A.x);
		this.y = calcul(O.y+B.y-A.y);
	}
	this.homothetie = function(A,O,k) { //Image de A dans l'homothétie de centre O et de rapport k
		this.x = calcul(O.x+k*(A.x-O.x))
		this.y = calcul(O.y+k*(A.y-O.y))
		return this
	}
	this.rotation = function(A,O,angle) { //Image de A dans la rotation de centre O et d'angle 

	}
	this.xSVG = function(coeff=20) {
		return this.x*coeff;
	}
	this.ySVG = function(coeff=20) {
		return -this.y*coeff;
	}
}

/**
* M = new PointParTranslation(O,A,B) //M est l'image de O dans la translation qui transforme A en B
* M = new PointParTranslation(O,A,B,'M') //M est l'image de O dans la translation qui transforme A en B et se nomme M
* M = new PointParTranslation(O,A,B,'M','below') //M est l'image de O dans la translation qui transforme A en B, se nomme M et le nom est en dessous du point
*
* @Auteur Rémi Angot
*/
function PointParTranslation(O,A,B,nom='',positionLabel = 'above left') {
	Point.call(this,nom);
	this.positionLabel=positionLabel;
	this.x = calcul(O.x+B.x-A.x);
	this.y = calcul(O.y+B.y-A.y);
}

/**
* M = new PointParHomothetie(A,O,k) //M est l'image de A dans l'homothétie de centre O et de rapport k
* M = new PointParHomothetie(A,O,k,'M') //M est l'image de A dans l'homothétie de centre O et de rapport k et se nomme M
* M = new PointParHomothetie(A,O,k,'M','below') //M est l'image de A dans l'homothétie de centre O et de rapport k, se nomme M et le nom est en dessous du point
*
* @Auteur Rémi Angot
*/
function PointParHomothetie(A,O,k,nom='',positionLabel = 'above left') {
	Point.call(this,nom);
	this.positionLabel=positionLabel;
	this.x = calcul(O.x+k*(A.x-O.x))
	this.y = calcul(O.y+k*(A.y-O.y))
}

/**
* M = new PointSurSegment(A,B,l) //M est le point de [AB] à l cm de A
* M = new PointSurSegment(A,B,l,'M') //M est le point de [AB] à l cm de A et se nomme M
* M = new PointSurSegment(A,B,l,'M','below') //M est le point de [AB] à l cm de A, se nomme M et le nom est en dessous du point
*
* @Auteur Rémi Angot
*/
function PointSurSegment(A,B,l,nom='',positionLabel = 'above left') {
	PointParHomothetie.call(this,B,A,calcul(l/longueur(A,B)),nom,positionLabel);
}


/**
* M = new PointParRotation(A,O,angle) //M est l'image de A dans la rotation de centre O et d'angle angle
* M = new PointParRotation(A,O,angle,'M') //M est l'image de A dans la rotation de centre O et d'angle angle et se nomme M
* M = new PointParRotation(A,O,angle,'M','below') //M est l'image de A dans la rotation de centre O et d'angle angle, se nomme M et le nom est en dessous
* 
* @Auteur Rémi Angot et Jean-Claude Lhote
*/
function PointParRotation(A,O,angle,nom='',positionLabel = 'above left') {
	Point.call(this,nom);
	this.x = calcul(O.x+(A.x-O.x)*Math.cos(angle*Math.PI/180)-(A.y-O.y)*Math.sin(angle*Math.PI/180));
    this.y = calcul(O.y+(A.x-O.x)*Math.sin(angle*Math.PI/180)+(A.y-O.y)*Math.cos(angle*Math.PI/180));
    this.positionLabel = positionLabel;
}


/**
* (new LabelPoints(A,B)).svg() //renvoit le code SVG pour nommer les points A et B
* (new LabelPoints(A,B)).tikz() //renvoit le code TikZ pour nommer les points A et B
* Le nombre d'arguments n'est pas limité
*
* @Auteur Rémi Angot
*/
function LabelPoints(...points) {
	this.svg = function(coeff){
		let code = "";
		for (let point of points){
			switch (point.positionLabel){
				case 'left':
				code += `<text x="${calcul(point.xSVG(coeff)-10)}" y="${point.ySVG(coeff)}" text-anchor="middle" alignment-baseline="central">${point.nom}</text>\n `; 
				break;
				case 'right':
				code += `<text x="${calcul(point.xSVG(coeff)+10)}" y="${point.ySVG(coeff)}" text-anchor="middle" alignment-baseline="central">${point.nom}</text>\n `; 
				break;
				case 'below':
				code += `<text x="${point.xSVG(coeff)}" y="${calcul(point.ySVG(coeff)+10)}" text-anchor="middle" alignment-baseline="central">${point.nom}</text>\n `; 
				break;
				case 'above':
				code += `<text x="${point.xSVG(coeff)}" y="${calcul(point.ySVG(coeff)-10)}" text-anchor="middle" alignment-baseline="central">${point.nom}</text>\n `; 
				break;
				case 'above right':
				code += `<text x="${calcul(point.xSVG(coeff)+10)}" y="${calcul(point.ySVG(coeff)-10)}" text-anchor="middle" alignment-baseline="central">${point.nom}</text>\n `; 
				break;
				case 'below left':
				code += `<text x="${calcul(point.xSVG(coeff)-10)}" y="${calcul(point.ySVG(coeff)+10)}" text-anchor="middle" alignment-baseline="central">${point.nom}</text>\n `; 
				break;
				case 'below right':
				code += `<text x="${calcul(point.xSVG(coeff)+10)}" y="${calcul(point.ySVG(coeff)+10)}" text-anchor="middle" alignment-baseline="central">${point.nom}</text>\n `; 
				break;
				default :
				code += `<text x="${calcul(point.xSVG(coeff)-10)}" y="${calcul(point.ySVG(coeff)-10)}" text-anchor="middle" alignment-baseline="central">${point.nom}</text>\n `; 
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


/**
* A = new Segment(A,B) //2 extrémités
* A = new Segment(A,B,'black') //2 extrémités et la couleur
* A = new Segment(x1,y1,x2,y2) //les coordonnées des deux extrémités
* A = new Segment(x1,y1,x2,y2,'black') //les coordonnées des deux extrémités et la couleur
*
* @Auteur Rémi Angot
*/
function Segment(arg1,arg2,arg3,arg4,color='black'){
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

	this.longueur = function(){
		return calcul(Math.sqrt((this.x2-this.x1)**2+(this.y2-this.y1)**2));
	}

	this.svg = function(coeff=20){

		return `<line x1="${this.x1*coeff}" y1="${-this.y1*coeff}" x2="${this.x2*coeff}" y2="${-this.y2*coeff}" stroke="${this.color}" />`
	}
	this.tikz = function(){
		if (this.color=='black') {
			return `\\draw (${this.x1},${this.y1})--(${this.x2},${this.y2});`
		} else {
			return `\\draw[${color}] (${this.x1},${this.y1})--(${this.x2},${this.y2});`
		}
	}
}

/**
* new Polygone(A,B,C,D,E) //Trace ABCDE
*
* @Auteur Rémi Angot
*/
function Polygone(...points){
	this.nom = '';
	for (let point of points){
		this.nom += point.nom
	}
	this.svg = function(coeff=20){
		let liste_points = "";
		for (let point of points){
			liste_points += `${point.x*coeff},${-point.y*coeff} `; 
		}
		return `<polygon points="${liste_points}" fill="none" stroke="black" />`
	}
	this.tikz = function(){
		let liste_points = "";
		for (let point of points){
			liste_points += `(${point.x},${point.y})--`
		}
		return `\\draw ${liste_points}cycle;`
	}
}


/**
* longueur(A,B) renvoit la distance de A à B
*
* @Auteur Rémi Angot
*/
function longueur(A,B){
	return calcul(Math.sqrt((B.x-A.x)**2+(B.y-A.y)**2));
}



/**
* codeFigure(new Line(A,B),new Polygone(D,E,F),new LabelPoints(A,B))
*
* @Auteur Rémi Angot
*/
function codeFigure(...objets){
	let code = ''
	if (sortie_html) {
		code = `<div><svg width="600" height="600" viewBox="-20 -300 600 600" xmlns="http://www.w3.org/2000/svg">\n`
		for (let objet of objets){
			code +=objet.svg() + '\n'
		}
		code += `</svg></div>`
		
	} else {
		code = `\\begin{tikzpicture}\n`
		for (let objet of objets){
			code += '\t' + objet.tikz() + '\n'
		}
		code += `\\end{tikzpicture}\n`
	}
	return code
}



