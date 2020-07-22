/**
 * v= new Vecteur('V') // son nom
 * v= new Vecteur(x,y) // ses composantes
 * v=new Vecteur(A,B) // son origine et son extrémité (deux Points)
 * v=new Vecteur('V',x,y) // son nom et ses composantes.
 * 
 * @Auteur Jean-Claude Lhote
 */
function Vecteur(arg1,arg2)  {
	if (arguments.length==1) {
		this.nom = arg1
	} else if (arguments.length==2) {
		if (typeof(arg1)=='number') {
			this.x = arg1;
			this.y = arg2;
		}
		else {
			this.origin=arg1;
			this.extremite=arg2;
			this.x=arg2.x-arg1.x;
			this.y=arg2.y-arg1.y;
		}
	} else {
		this.nom = arg1;
		this.x = arg2;
		this.y = arg3;
	}

	this.norme = function (V) {
		return calcul(Math.sqrt(this.x**2+this.y**2))
	}

	this.oppose = function(V) {
		this.x=-V.x
		this.y=-V.y
		return this
	}
	
}

/**
* A = new Point('A') //son nom
* A = new Point(x,y) //ses coordonnées
* A = new Point('A',x,y) //son nom et ses coordonnées
* A = new Point('A',x,y,'below') //son nom, ses coordonnées et la position de son label
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
		this.nom = arg1;
		this.x = arg2;
		this.y = arg3;
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
* A = new Point('A') //son nom
* A = new Point(x,y) //ses coordonnées
* A = new Point('A',x,y) //son nom et ses coordonnées
* A = new Point('A',x,y,'below') //son nom, ses coordonnées et la position de son label
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
* A = new Line(A,B) //2 extrémités
* A = new Line(A,B,'black') //2 extrémités et la couleur
* A = new Line(x1,y1,x2,y2) //les coordonnées des deux extrémités
* A = new Line(x1,y1,x2,y2,'black') //les coordonnées des deux extrémités et la couleur
*
* @Auteur Rémi Angot
*/
function Line(arg1,arg2,arg3,arg4,color='black'){
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
* A = new Line(A,B) //2 extrémités
* A = new Line(A,B,'black') //2 extrémités et la couleur
* A = new Line(x1,y1,x2,y2) //les coordonnées des deux extrémités
* A = new Line(x1,y1,x2,y2,'black') //les coordonnées des deux extrémités et la couleur
*
* @Auteur Rémi Angot
*/
function Polygone(...points){
	this.nom = '';
	for (let point of points){
		this.nom += point.nom
	}
	let liste_points = "";
	this.svg = function(coeff=20){
		for (let point of points){
			liste_points += `${point.x*coeff},${-point.y*coeff} `; 
		}
		return `<polygon points="${liste_points}" fill="none" stroke="black" />`
	}
	this.tikz = function(){
		for (let point of points){
			liste_points += `(${point.x},${point.y})--`
		}
		return `\\draw ${liste_points}cycle;`
	}
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



