let mesObjets = [];

/**
 * v = vecteur('V') // son nom
 * v = vecteur(x,y) // ses composantes
 * v = vecteur(A,B) // son origine et son extrémité (deux Points)
 * v = vecteur('V',x,y) // son nom et ses composantes.
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

	this.norme = function () {
		return calcul(Math.sqrt(this.x**2+this.y**2))
	}

	this.oppose = function() {
		this.x=-this.x
		this.y=-this.y
	}
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
		this.nom = '';
	}
	mesObjets.push(this);
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
function PointParTranslation2Points(O,A,B,nom='',positionLabel = 'above left') {
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
function PointParTranslation(O,v,nom='',positionLabel = 'above left') {
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
function PointParHomothetie(A,O,k,nom='',positionLabel = 'above left') {
	Point.call(this,nom);
	this.positionLabel=positionLabel;
	this.x = calcul(O.x+k*(A.x-O.x))
	this.y = calcul(O.y+k*(A.y-O.y))
}
function pointParhomothetie(...args){
	return new PointParHomothetie(...args)
}

/**
* M = pointSurSegment(A,B,l) //M est le point de [AB] à l cm de A
* M = pointSurSegment(A,B,l,'M') //M est le point de [AB] à l cm de A et se nomme M
* M = pointSurSegment(A,B,l,'M','below') //M est le point de [AB] à l cm de A, se nomme M et le nom est en dessous du point
*
* @Auteur Rémi Angot
*/
function PointSurSegment(A,B,l,nom='',positionLabel = 'above left') {
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
function PointMilieu(A,B,nom='',positionLabel = 'above left') {
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
function PointParRotation(A,O,angle,nom='',positionLabel = 'above left') {
	Point.call(this,nom);
	this.x = calcul(O.x+(A.x-O.x)*Math.cos(angle*Math.PI/180)-(A.y-O.y)*Math.sin(angle*Math.PI/180));
    this.y = calcul(O.y+(A.x-O.x)*Math.sin(angle*Math.PI/180)+(A.y-O.y)*Math.cos(angle*Math.PI/180));
    this.positionLabel = positionLabel;
}
function pointParRotation(...args){
	return new PointParRotation(...args)
}

/**
 * M = pointParSymetrieAxiale(A,d)// M est l'image de A dans la symétrie axiale d'axe d.
 * d est un objet de type Droite (son équation ax+by+c=0 renseignée)
 * A est un objet de type Point (ses coordonnées x et y renseignées)
 * @Auteur Jean-Claude Lhote
 */
function PointParSymetrieAxiale(A,d,nom='',positionLabel = 'above left') {
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
function PointParProjectionOrtho(M,d,nom='',positionLabel='above left') {
	Point.call(this,nom);
	let a=d.a,b=d.b,c=d.c,k=1/(a*a+b*b)
	if (a==0) {
		this.x=M.x
		this.y=calcul(-c/b)
	}
	else if (b==0) {
		this.y=M.y
		this.x=calcul(-c/a)
	}
	else {
		this.x=calcul(k*(-b*b*M.x-a*b*M.y+a*c))
		this.y=calcul(k*(a*b*M.x+a*a*A.y-a*a*c/b)-c/b)
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
	mesObjets.push(this);
}
function labelPoints(...args){
	return new LabelPoints(...args)
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
	if (arguments.length==2) {
		this.x1 = arg1.x;
		this.y1 = arg1.y;
		this.x2 = arg2.x;
		this.y2 = arg2.y;
		this.a=this.y1-this.y2
		this.b=this.x2-this.x1
		this.c=(this.x1-this.x2)*this.y1+(this.y2-this.y1)*this.x1
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
		this.a=this.y1-this.y2
		this.b=this.x2-this.x1
		this.c=(this.x1-this.x2)*this.y1+(this.y2-this.y1)*this.x1
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
		this.a=this.y1-this.y2
		this.b=this.x2-this.x1
		this.c=(this.x1-this.x2)*this.y1+(this.y2-this.y1)*this.x1
		this.nom=arg3;
		this.color=arg4;
		}
	}
	this.normal= new Vecteur(this.a,this.b)
	this.directeur= new Vecteur(-this.b,this.a)
	this.svg = function(coeff=20){
		let A = point(this.x1,this.y1);
		let B = point(this.x2,this.y2);
		let A1 = pointSurSegment(A,B,-5);
		let B1 = pointSurSegment(B,A,-5);
		return `<line x1="${calcul(A1.x*coeff)}" y1="${calcul(-A1.y*coeff)}" x2="${calcul(B1.x*coeff)}" y2="${calcul(-B1.y*coeff)}" stroke="${this.color}" />`
	}
	this.tikz = function() {
		let A = point(this.x1,this.y1);
		let B = point(this.x2,this.y2);
		let A1 = pointSurSegment(A,B,-5);
		let B1 = pointSurSegment(B,A,-5);
		return `\\draw[${color}] (${A1.x},${A1.y})--(${B1.x},${B1.y});`
	}
	mesObjets.push(this)
}
function droite(...args){
	return new Droite(...args)
}

/**
 * d = droiteParPointEtVecteur(A,v,'red') //Droite passant par A, de vecteur directeur v et de couleur rouge
 * @Auteur Jean-Claude Lhote
 */
function DroiteParPointEtVecteur(A,v,color='black') {
	let B=new Point(calcul(A.x+v.x),calcul(A.y+v.y))
	Droite.call(this,A,B)
	this.color=color
}
function droiteParPointEtVecteur(...args) {
	return new DroiteParPointEtVecteur(...args)
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

		return `<line x1="${calcul(this.x1*coeff)}" y1="${calcul(-this.y1*coeff)}" x2="${calcul(this.x2*coeff)}" y2="${calcul(-this.y2*coeff)}" stroke="${this.color}" />`
	}
	this.tikz = function(){
		if (this.color=='black') {
			return `\\draw (${this.x1},${this.y1})--(${this.x2},${this.y2});`
		} else {
			return `\\draw[${color}] (${this.x1},${this.y1})--(${this.x2},${this.y2});`
		}
	}
	mesObjets.push(this);
}
function segment(...args){
	return new Segment(...args)
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
	this.svg = function(coeff=20){
		let code = `<line x1="${calcul((A.x-taille)*coeff)}" y1="${calcul((-A.y-taille)*coeff)}" x2="${calcul((A.x+taille)*coeff)}" y2="${calcul((-A.y+taille)*coeff)}" stroke="${color}" />`
		code += `\n<line x1="${calcul((A.x-taille)*coeff)}" y1="${calcul((-A.y+taille)*coeff)}" x2="${calcul((A.x+taille)*coeff)}" y2="${calcul((-A.y-taille)*coeff)}" stroke="${color}" />`
		return code 
	}
	this.tikz = function(){
		return `\\node[point] at (${A.x},${A.y}) {};`
	}
	mesObjets.push(this);
}
function tracePoint(...args){
	return new TracePoint(...args)
}
function tracePoints(...points){
	for (let point of points){
		mesObjets.push(new TracePoint(point))
	}
}

/**
* polygone(A,B,C,D,E) //Trace ABCDE
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
	mesObjets.push(this);
}
function polygone(...args){
	return new Polygone(...args)
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
	if (arguments.length==1) {
		this.nom = arg1
	} else {
		if (typeof(arg1)=='number') {
			this.x = arg1;
			this.y = arg2;
		} else {
			this.x = arg2.x-arg1.x;
			this.y = arg2.y-arg1.y;
		
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
	mesObjets.push(this);	
}
function vecteur(...args){
	return new Vecteur(...args)
}

/**
 * codageAngleDroit(A,O,B) //Fait un codage d'angle droit de 3 mm pour l'angle direct AOB
 * codageAngleDroit(A,O,B,.5) //Fait un codage d'angle droit de 5 mm pour l'angle direct AOB
 
 * 
 * @Auteur Rémi Angot
 */
function CodageAngleDroit(A,O,B,d = .3)  {
	let a = new PointSurSegment(O,B,d);
	let b = {};
	if (angle(A,O,B)>0) {
		b = new PointParRotation(O,a,90)
	} else {
		b = new PointParRotation(O,a,-90)
	}
	let c = new PointSurSegment(O,A,d);
	let s1 = new Segment(a,b)
	let s2 = new Segment(b,c)
	this.svg = function() {
		return s1.svg()+'\n'+s2.svg()
	}
	this.tikz = function() {
		return s1.tikz()+'\n'+s2.tikz()
	}
	mesObjets.push(this);
}
function codageAngleDroit(...args){
	return new CodageAngleDroit(...args)
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
* codeFigure(new Line(A,B),new Polygone(D,E,F),new LabelPoints(A,B))
*
* @Auteur Rémi Angot
*/
function codeFigure(...objets){
	let code = ''
	if (sortie_html) {
		code = `<div><svg width="600" height="400" viewBox="-20 -200 600 400" xmlns="http://www.w3.org/2000/svg">\n`
		for (let objet of objets){
			code +=objet.svg() + '\n'
		}
		code += `</svg></div>`
		
	} else {
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
			code += '\t' + objet.tikz() + '\n'
		}
		code += `\\end{tikzpicture}\n`
	}
	return code
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
					code += '\t' + objet[i].svg() + '\n'
				} catch (error){
					
				}
			}
		}
		try {
			code +=objet.svg() + '\n';
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



