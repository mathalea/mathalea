// Fonctions diverses pour la création des exercices


/**
* Utilise this.liste\_questions et this.liste\_corrections pour remplir this.contenu et this.contenu_correction
* 
* La liste des questions devient une liste HTML ou LaTeX avec html\_enumerate() ou tex\_enumerate()
*
* @param {exercice} 
* @author Rémi Angot
*/
function liste_de_question_to_contenu(argument) {
	if (sortie_html) {
		argument.contenu = html_consigne(argument.consigne) + html_paragraphe(argument.introduction) + html_enumerate(argument.liste_questions,argument.spacing)
		argument.contenu_correction = html_consigne(argument.consigne_correction) + html_enumerate(argument.liste_corrections,argument.spacing_corr)	
	} else {
		argument.contenu = tex_consigne(argument.consigne) + tex_introduction(argument.introduction) + tex_multicols(tex_enumerate(argument.liste_questions,argument.spacing),argument.nb_cols)
		argument.contenu_correction = tex_consigne(argument.consigne_correction) + tex_multicols(tex_enumerate(argument.liste_corrections,argument.spacing_corr),argument.nb_cols_corr)	
	}
	
}

/**
* Utilise this.liste\_questions et this.liste\_corrections pour remplir this.contenu et this.contenu_correction
* 
* La liste des questions devient une liste HTML ou LaTeX avec html\_ligne() ou tex\_paragraphe()
* @param {exercice} 
* @author Rémi Angot
*/
function liste_de_question_to_contenu_sans_numero(argument) {
	if (sortie_html) {
		argument.contenu = html_consigne(argument.consigne) + html_paragraphe(argument.introduction) + html_ligne(argument.liste_questions,argument.spacing)
		argument.contenu_correction = html_consigne(argument.consigne_correction) + html_ligne(argument.liste_corrections,argument.spacing_corr)	
	} else {
		argument.contenu = tex_consigne(argument.consigne) + tex_introduction(argument.introduction) + tex_multicols(tex_paragraphe(argument.liste_questions,argument.spacing),argument.nb_cols)
		// argument.contenu_correction = tex_consigne(argument.consigne_correction) + tex_multicols(tex_enumerate_sans_numero(argument.liste_corrections,argument.spacing_corr),argument.nb_cols_corr)	
		argument.contenu_correction = tex_consigne(argument.consigne_correction) + tex_multicols(tex_paragraphe(argument.liste_corrections,argument.spacing_corr),argument.nb_cols_corr)	
	}
	
}

/**
* Utilise this.liste\_questions et this.liste\_corrections pour remplir this.contenu et this.contenu_correction
* 
* Uniquement en version LaTeX
* La liste des questions devient une liste HTML ou LaTeX avec html\_ligne() ou tex\_paragraphe()
* @param {exercice} 
* @author Rémi Angot
*/
function liste_de_question_to_contenu_sans_numero_et_sans_consigne(argument) {
	argument.contenu = tex_multicols(tex_paragraphe(argument.liste_questions,argument.spacing),argument.nb_cols)
	// argument.contenu_correction = tex_consigne(argument.consigne_correction) + tex_multicols(tex_enumerate_sans_numero(argument.liste_corrections,argument.spacing_corr),argument.nb_cols_corr)	
	argument.contenu_correction =  tex_multicols(tex_paragraphe(argument.liste_corrections,argument.spacing_corr),argument.nb_cols_corr)	

	
}
/**
 * fonctions de comparaison pour les nombres en virgule flottante afin d'éviter les effets de la conversion en virgule flottante.
 * @param {number} a premier nombre 
 * @param {number} b deuxième nombre 
 * @param {number} tolerance seuil positif en dessous duquel une valeur est considérée comme nulle
 * valeur de tolérance par défaut : 0.000001 = constante epsilon définie ci-dessous.
 * @Auteur Jean-Claude Lhote
 */
const epsilon=0.000001;
 function egal(a,b,tolerance=epsilon){
	if (Math.abs(a-b)<tolerance) return true
	else return false
}
function superieur(a,b,tolerance=epsilon){
	if (a-b>tolerance&&(!egal(a,b,tolerance))) return true
	else return false
}
function inferieur(a,b,tolerance=epsilon){
	if (b-a>tolerance&&(!egal(a,b,tolerance))) return true
	else return false
}
function superieurouegal(a,b,tolerance=epsilon) {
	if (a-b>tolerance||egal(a,b,tolerance)) return true
	else return false
}
function inferieurouegal(a,b,tolerance=epsilon) {
	if (b-a>tolerance||egal(a,b,tolerance)) return true
	else return false
}
function estentier(a,tolerance=epsilon) {
	if (Math.abs(calcul(a-Math.round(a)))<tolerance) return true
	else return false
}
function quotientier(a, b) {
	if (Number.isInteger(a) && Number.isInteger(b)) {
		let reste = a
		let quotient = 0
		while (reste >= b) {
			reste -= b
			quotient++
		}
		return quotient
	}
	else return false
}

/**
* Créé tous les couples possibles avec un élément de E1 et un élément de E2.
* L'ordre est pris en compte, donc on pourra avoir (3,4) et (4,3).
* Si le nombre de couples possibles est inférieur à nombre_de_couples_min alors
*	on concatène 2 fois la même liste mais avec des ordres différents.
* @param {liste} E1 - Liste
* @param {liste} E2 - Liste
* @param {int} nombre_de_couples_min=10 - Nombre de couples souhaités
*
* @author Rémi Angot
*/

function creer_couples(E1, E2, nombre_de_couples_min = 10){
	
	let result = [], temp = [];
	for (let i in E1){
		for (let j in E2){
			result.push([E1[i],E2[j]])
		}
	}
	
	temp = shuffle(result).slice(0); // créer un clone du tableau result mélangé
	result = temp.slice(0);
	while(result.length < nombre_de_couples_min){
		result = result.concat(shuffle(temp))
	}
	return result
}

// Fonctions mathématiques

/**
* Choisit un nombre au hasard entre min et max sans appartenir à liste\_a\_eviter.
* @param {int} min
* @param {int} max
* @param {liste} liste - Tous les éléments que l'on souhaite supprimer 
*
* @example
* // Renvoit 1, 2 ou 3
* randint(1,3)
* @example
* // Renvoit -1 ou 1
* randint(-1,1,[0])
*
* @author Rémi Angot
* @Source https://gist.github.com/pc035860/6546661
*/
function randint(min,max,liste_a_eviter=[]){
	//Source : https://gist.github.com/pc035860/6546661
	let range = max - min;
	let rand = Math.floor(Math.random() * (range + 1));
	if (Number.isInteger(liste_a_eviter)){
		liste_a_eviter=[liste_a_eviter]
	}
	if (liste_a_eviter.length>0) {
		while (liste_a_eviter.indexOf(min+rand)!=-1){
			rand = Math.floor(Math.random() * (range + 1));
		}
	}
	return min + rand;
}


/**
* Créé un string aléatoire 
*
* strRandom({
*  includeUpperCase: true,
*  includeNumbers: true,
*  length: 5,
*  startsWithLowerCase: true
* });
*
* // renvoie par exemple : "iL0v3"
*
* @Source https://www.equinode.com/blog/article/generer-une-chaine-de-caracteres-aleatoire-avec-javascript
*/
function strRandom(o) {
  var a = 10,
      b = 'abcdefghijklmnopqrstuvwxyz',
      c = '',
      d = 0,
      e = ''+b;
  if (o) {
    if (o.startsWithLowerCase) {
      c = b[Math.floor(Math.random() * b.length)];
      d = 1;
    }
    if (o.length) {
      a = o.length;
    }
    if (o.includeUpperCase) {
      e += b.toUpperCase();
    }
    if (o.includeNumbers) {
      e += '1234567890';
    }
  }
  for (; d < a; d++) {
    c += e[Math.floor(Math.random() * e.length)];
  }
  return c;
}

/**
* Enlève toutes les occurences d'un élément d'un tableau donné
* @param liste
* @param element
*
* @author Rémi Angot
*/
function enleve_element(array,item){
	// 
	for(var i = array.length - 1; i >= 0; i--){
		if(array[i] == item) {
			array.splice(i, 1);
		}
	}
}
/**
 * Enlève toutes les occurences d'un élément d'un tableau donné mais sans modifier le tableau en paramètre et renvoie le tableau modifié
 * @Auteur Rémi Angot & Jean-Claude Lhote
 */

function enleve_element_bis(array,item=undefined) {
	let tableaucopie=[]
	for(i = 0;i<array.length;i++) {
		tableaucopie.push(array[i])
		}
	for(var i = tableaucopie.length - 1; i >= 0; i--){
		if(tableaucopie[i] == item) {
			tableaucopie.splice(i, 1);
		}
	}
	return tableaucopie
}

/**
 * Enlève l'élément index d'un tableau
 * @Auteur Jean-Claude Lhote
 */
function enleve_element_No(array,index) {
	array.splice(index,1)
}
/**
 * Enlève l'élément index d'un tableau sans modifier le tableau et retourne le résultat
 * @Auteur Jean-Claude Lhote
 */
function enleve_element_No_bis(array,index){
	let tableaucopie=[]
	for(i = 0;i<array.length;i++) {
		tableaucopie.push(array[i])
	}
	tableaucopie.splice(index,1)
	return tableaucopie
}


/**
* Retourne un élément au hasard de la liste sans appartenir à une liste donnée
* @param {liste} 
* @param {liste_a_eviter}
*
* @example
* // Renvoit 1, 2 ou 3
* choice[(1,2,3)]
* @example
* // Renvoit Rémi ou Léa
* choice(['Rémi','Léa'])
*
* @author Rémi Angot
*/
function choice(liste,liste_a_eviter=[]) {
	//copie la liste pour ne pas y toucher (ce n'est pas le but de choice)
	let listebis = liste.slice();
	// Supprime les éléments de liste à éviter
	for (let i=0;i<liste_a_eviter.length;i++){
		enleve_element(listebis,liste_a_eviter[i])
	}
	var index = Math.floor(Math.random() * listebis.length);
	return listebis[index];
}

function range(max,liste_a_eviter=[]){
	// Créer un tableau avec toutes les valeurs de 0 à max sauf celle de la liste à éviter
	let nb_max = parseInt(max,10);
	let liste = [...Array(nb_max+1).keys()];
	for (let i=0;i<liste_a_eviter.length;i++){
		enleve_element(liste,liste_a_eviter[i])
	}
	return liste
}


/**
* Créé un tableau avec toutes les valeurs de 1 à max sauf celle de la liste à éviter
* 
*
* @param {int} max
* @param {liste} liste valeurs à éviter 
* @author Rémi Angot
*/
function range1(max,liste_a_eviter=[]){
	let nb_max = parseInt(max,10);
	let liste = [];
	for (let i = 1; i <= nb_max; i++) {
		liste.push(i)
	}
	for (let i=0;i<liste_a_eviter.length;i++){
		enleve_element(liste,liste_a_eviter[i])
	}
	return liste
}


/**
* Fonction de comparaison à utiliser avec tableau.sort(compare_fractions)
*
* Le tableau doit être du type `[[num,den],[num2,den2]]`
*
* @author Rémi Angot
*/
function compare_fractions(a,b){ 
	if ((a[0]/a[1])>(b[0]/b[1])) 
		return 1 ;
	if ((a[0]/a[1])<(b[0]/b[1])) 
		return -1 ;
	// Sinon il y a égalité
	return 0
}


/**
* Fonction de comparaison à utiliser avec tableau.sort(compare_nombres)
*
*
* @author Rémi Angot
*/
function compare_nombres(a,b){ 
	return a - b ;
}
/**
 * 
 * Copié sur https://delicious-insights.com/fr/articles/le-piege-de-array-sort/
 */
function numTrie(arr) {
	return arr.sort(function(a, b) {
	  return +a - +b
	})
  }
  
/*
* Mélange les items d'un tableau, sans modifier le tableau passé en argument
*
* @Example
* tableau_melange = shuffle (tableau_origine)
* @Source https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
*/
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  var array_bis = array.slice()
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array_bis[currentIndex];
    array_bis[currentIndex] = array_bis[randomIndex];
    array_bis[randomIndex] = temporaryValue;
}

return array_bis;
}



/*
* Mélange les items de deux tableaux de la même manière, sans modifier le tableau passé en argument
*
* 
* @Source https://stackoverflow.com/questions/18194745/shuffle-multiple-javascript-arrays-in-the-same-way
*/
function shuffle2tableaux(obj1, obj2) {
  var index = obj1.length;
  var rnd, tmp1, tmp2;

  while (index) {
    rnd = Math.floor(Math.random() * index);
    index -= 1;
    tmp1 = obj1[index];
    tmp2 = obj2[index];
    obj1[index] = obj1[rnd];
    obj2[index] = obj2[rnd];
    obj1[rnd] = tmp1;
    obj2[rnd] = tmp2;
  }
}


/*
* Trie un dictionnaire suivant ses clés
*
* @Example
* dictionnaire_tri = tridictionnaire(dictionnaire)
* @Source https://stackoverflow.com/questions/10946880/sort-a-dictionary-or-whatever-key-value-data-structure-in-js-on-word-number-ke
*/
function tridictionnaire(dict) {
	var sorted = [];
	for(var key in dict) {
		sorted[sorted.length] = key;
	}
	sorted.sort();

	var tempDict = {};
	for(var i = 0; i < sorted.length; i++) {
		tempDict[sorted[i]] = dict[sorted[i]];
	}

	return tempDict;
}

/*
* Filtre un dictionnaire suivant les premiers caractères de ses clés
*
* @Example
* filtreDictionnaire(dict,'6N') renvoit un dictionnaire où toutes les clés commencent par 6N
* @Auteur Rémi Angot
*/
function filtreDictionnaire(dict,sub) {
	return Object.assign({}, ...
		Object.entries(dict).filter(([k,v]) => k.substring(0,sub.length)==sub).map(([k,v]) => ({[k]:v}))
	);
}



/*
* Concatène liste à elle même en changeant l'ordre à chaque cycle
*
*
* @Example
* combinaison_listes([A,B,C],7)
* // [B,C,A,C,B,A,A,B,C]
*
* @Auteur Rémi Angot
*/
function combinaison_listes(liste,taille_minimale){
	l = shuffle(liste);
	while (l.length<taille_minimale){
		l = l.concat(shuffle(liste))
	}
	return l
}

function combinaison_listes_sans_changer_ordre(liste,taille_minimale){
	// Concatène liste à elle même en changeant 
	while (liste.length<taille_minimale){
		liste = liste.concat(liste)
	}
	return liste
}
/**
* N'écrit pas un nombre s'il est égal à 1
* @Example
* //rien_si_1(1)+'x' -> x
* //rien_si_1(-1)+'x' -> -x
* @Auteur Rémi Angot
*/
function rien_si_1(a) { 
	if (a==1) {
		return ''
	} else if (a==-1) {
		return '-'
	} else {
		return a
	}
}

/**
* Gère l'écriture de l'exposant en mode text
* @Example
* // 'dm'+exposant(3)
* @Auteur Rémi Angot
*/
function exposant(texte){
	if (sortie_html) {
		return `<sup>${texte}</sup>`
	} else {
		return `\\up{${texte}}`
	}
}

/**
* Ajoute les parenthèses et le signe
* @Example
* //(+3) ou (-3)
* @Auteur Rémi Angot
*/
function ecriture_nombre_relatif(a) { 
	let result = '';
	if (a>0) {
		result = '(+'+a+')'
	}else if (a<0) {
		result = '('+a+')'
	}else{ // ne pas mettre de parenthèses pour 0
		result = '0'
	}
	return result;
}
/**
 * Idem ecriture_nombre_relatif avec le code couleur : vert si positif, rouge si négatif, noir si nul
 * @param {number} a 
 */
function ecriture_nombre_relatifc(a) { 
	let result = '';
	if (a>0) {
		result =mise_en_evidence('(+'+tex_nombrec(a)+')','blue');
	}else if (a<0) {
		result = mise_en_evidence('('+tex_nombrec(a)+')');
	}else{ // ne pas mettre de parenthèses pour 0
		result = mise_en_evidence('0','black');
	}
	return result;
}

/**
* Ajoute le + devant les nombres positifs
* @Example
* //+3 ou -3
* @Auteur Rémi Angot
*/
function ecriture_algebrique(a) { 
	let result = '';
	if (a>=0) {
		result = '+'+tex_nombrec(a);
	}else {
		result = tex_nombrec(a);
	}
	return result;
};
/**
 * Idem ecriture_algebrique mais retourne le nombre en couleur (vert si positif, rouge si négatif et noir si nul)
 * @param {number} a 
 */
function ecriture_algebriquec(a) {
	let result = '';
	if (a>0) {
		result = mise_en_evidence('+'+tex_nombrec(a),'blue');
	}else if (a<0) {
		result = mise_en_evidence(tex_nombrec(a));
	} else result = mise_en_evidence(tex_nombrec(a),'black');
	return result;
}

/**
* Ajoute des parenthèses aux nombres négatifs
* @Example
* // 3 ou (-3)
* @Auteur Rémi Angot
*/
function ecriture_parenthese_si_negatif(a) { 
	let result = '';
	if (a>=0) {
		result = a;
	}else {
		result = `(${a})`;
	}
	return result;
};

/**
* Ajoute des parenthèses si une expression commence par un moins
* @Example
* // (-3x)
* @Auteur Rémi Angot
*/
function ecriture_parenthese_si_moins(expr) { 
	let result = '';
	if (expr[0]=='-') {
		result = `(${expr})`;
	}else {
		result = expr;
	}
	return result;
};

/**
* Renvoie la valeur du chiffre (8->8, A->10, B->11...)
* 
* @Auteur Rémi Angot
*/
function valeur_base(n) { 
	switch (n){
		case 'A' : return 10
		break
		case 'B' : return 11
		break
		case 'C' : return 12
		break
		case 'D' : return 13
		break
		case 'E' : return 14
		break
		case 'F' : return 15
		break
		default : return n
	}
};

/**
* Convertit un angle de radian vers degrés et fonction inverse
* @Example
* // PI->180
* @Auteur Jean-Claude Lhote
*/
Math.degres = function(radians) {
	return radians * 180 / Math.PI;
};
Math.radians = function(degres) {
	return degres*Math.PI/180
}

/**
 * 
 * @param {array} matrice M tableau 3x3 nombres
 * @param {array} vecteur A tableau 3 nombres
 * Fonction pouvant être utilisée en 2d avec des coordonnées homogènes
 * elle retourne le vecteur [x,y,z] résultat de M.A
 * @Auteur Jean-Claude Lhote
 */

function produit_matrice_vecteur_3x3(matrice,vecteur) { // matrice est un tableau 3x3 sous la forme [[ligne 1],[ligne 2],[ligne 3]] et vecteur est un tableau de 3 nombres [x,y,z]
	let resultat=[0,0,0]
	for (let j=0;j<3;j++){ // Chaque ligne de la matrice 
		for (let i=0;i<3;i++){ // On traite la ligne i de la matrice -> résultat = coordonnée i du vecteur résultat
			resultat[j]+=matrice[j][i]*vecteur[i];
		}
	}
	return resultat
}
/**
 * 
 * @param {array} matrice1 Matrice A
 * @param {array} matrice2 Matrice B
 * retourne la matrice A.B
 * @Auteur Jean-Claude Lhote
 */

function produit_matrice_matrice_3x3(matrice1,matrice2) { // les deux matrices sont des tableaux 3x3  [[ligne 1],[ligne 2],[ligne 3]] et le résultat est de la même nature.
	let resultat = [[0,0,0],[0,0,0],[0,0,0]]
	for (let j=0;j<3;j++)
		for (let i=0;i<3;i++)
			for (let k=0;k<3;k++)
				resultat[j][i]+=matrice1[j][k]*matrice2[k][i]
 return resultat
}
/**
 * 
 * @param {array} point
 * calcule les coordonnées d'un point donné par ses coordonnées en repère orthonormal en repère (O,I,J) tel que IOJ=60° 
 * @Auteur Jean-Claude Lhote
 */
function changement_de_base_ortho_tri(point) {
	if (point.length==2) point.push(1);
	return produit_matrice_vecteur_3x3([[1,-Math.cos(Math.PI/3)/Math.sin(Math.PI/3),0],[0,1/Math.sin(Math.PI/3),0],[0,0,1]],point)
}
/**
 * 
 * @param {array} point 
 * Changement de base inverse de la fonction précédente
 * @Auteur Jean-CLaude Lhote
 */
function changement_de_base_tri_ortho(point) {
	if (point.length==2) point.push(1);
	return produit_matrice_vecteur_3x3([[1,Math.cos(Math.PI/3),0],[0,Math.sin(Math.PI/3),0],[0,0,1]],point)
}

	/**
 * 
 * @param {number} transformation Entier déterminant la transformation voulue 
 ** 1=symétrie / passant par O
 **2=symétrie \ passant par O
 **3=symétrie _ passant par O
 **4=symétrie | passant par O
 **5= rotation 90° anti-horaire centre O
 **6= rotation 90° horaire centre O
 **7= symétrie centrale centre O
 **11= rotation 60° anti-horaire centre O
 **12= rotation 60° horaire centre O
 **13= rotation 120° anti-horaire centre O
 **14= rotation 120° horaire centre O
 **8= translation coordonnées de O = vecteur de translation
 **9= homothétie. centre O rapport k
 **10= homothétie. centre O rapport 1/k
 * @param {array} pointA Point dont on cherche l'image 
 * @param {array} pointO Centre du repère local pour les symétries, centre pour les rotations et les homothéties
 * @param {array} vecteur Vecteur de la translation 
 * @param {number} rapport rapport d'homothétie
 * @Auteur Jean-Claude Lhote
 */
function image_point_par_transformation (transformation,pointA,pointO,vecteur=[],rapport=1){ //pointA,centre et pointO sont des tableaux de deux coordonnées
	// on les rends homogènes en ajoutant un 1 comme 3ème coordonnée)
	// nécessite d'être en repère orthonormal...
	// Point O sert pour les rotations et homothéties en tant que centre (il y a un changement d'origine du repère en O pour simplifier l'expression des matrices de transformations.)
	
	let matrice_sym_obl1=matriceCarree([[0,1,0],[1,0,0],[0,0,1]]) // x'=y et y'=x
	let matrice_sym_xxprime=matriceCarree([[1,0,0],[0,-1,0],[0,0,1]]) // x'=x et y'=-y
	let matrice_sym_yyprime=matriceCarree([[-1,0,0],[0,1,0],[0,0,1]]) // x'=-x et y'=y
	let matrice_sym_obl2=matriceCarree([[0,-1,0],[-1,0,0],[0,0,1]]) // x'=-y et y'=-x
	let matrice_quart_de_tour_direct=matriceCarree([[0,-1,0],[1,0,0],[0,0,1]]) // x'=-y et y'=x
	let matrice_quart_de_tour_indirect=matriceCarree([[0,1,0],[-1,0,0],[0,0,1]]) // x'=y et y'=-x
	let matrice_sym_centrale=matriceCarree([[-1,0,0],[0,-1,0],[0,0,1]]) // x'=-x et y'=-y
	let matrice_rot_60_direct=matriceCarree([[0.5,-Math.sin(Math.PI/3),0],[Math.sin(Math.PI/3),0.5,0],[0,0,1]])
	let matrice_rot_60_indirect=matriceCarree([[0.5,Math.sin(Math.PI/3),0],[-Math.sin(Math.PI/3),0.5,0],[0,0,1]])
	let matrice_rot_120_direct=matriceCarree([[-0.5,-Math.sin(Math.PI/3),0],[Math.sin(Math.PI/3),-0.5,0],[0,0,1]])
	let matrice_rot_120_indirect=matriceCarree([[-0.5,Math.sin(Math.PI/3),0],[-Math.sin(Math.PI/3),-0.5,0],[0,0,1]])

	let x,y,x1,y1,u,v,k,pointA1=[0,0,0],pointA2=[0,0,0]

	if (pointA.length==2) pointA.push(1)
	x2=pointO[0]  // Point O' (origine du repère dans lequel les transformations sont simples (centre des rotations et point d'intersection des axes))
	y2=pointO[1]
	u=vecteur[0] // (u,v) vecteur de translation.
	v=vecteur[1]
	k=rapport // rapport d'homothétie


	let matrice_chgt_repere=matriceCarree([[1,0,x2],[0,1,y2],[0,0,1]])
	let matrice_chgt_repereinv=matriceCarree([[1,0,-x2],[0,1,-y2],[0,0,1]])
	let matrice_translation=matriceCarree([[1,0,u],[0,1,v],[0,0,1]])
	let matrice_homothetie=matriceCarree([[k,0,0],[0,k,0],[0,0,1]])
	let matrice_homothetie2=matriceCarree([[1/k,0,0],[0,1/k,0],[0,0,1]])

	let matrice

	switch (transformation) {
		case 1 : 
			matrice=matrice_sym_obl1.multiplieMatriceCarree(matrice_chgt_repereinv)
			break
		case 2 :
			matrice=matrice_sym_obl2.multiplieMatriceCarree(matrice_chgt_repereinv)
			break
		case 3 : 
			matrice=matrice_sym_xxprime.multiplieMatriceCarree(matrice_chgt_repereinv)
			break
		case 4 :
			matrice=matrice_sym_yyprime.multiplieMatriceCarree(matrice_chgt_repereinv)
			break
		case 5 :
			matrice=matrice_quart_de_tour_direct.multiplieMatriceCarree(matrice_chgt_repereinv)
			break
		case 6 : 
		matrice=matrice_quart_de_tour_indirect.multiplieMatriceCarree(matrice_chgt_repereinv)
			break
		case 7 :
			matrice=matrice_sym_centrale.multiplieMatriceCarree(matrice_chgt_repereinv)
			break
		case 11 :
			matrice=matrice_rot_60_direct.multiplieMatriceCarree(matrice_chgt_repereinv)
			break
		case 12 :
			matrice=matrice_rot_60_indirect.multiplieMatriceCarree(matrice_chgt_repereinv)
			break
		case 13 :
			matrice=matrice_rot_120_direct.multiplieMatriceCarree(matrice_chgt_repereinv)
			break
		case 14 :
			matrice=matrice_rot_120_indirect.multiplieMatriceCarree(matrice_chgt_repereinv)
			break
		case 8 :
			matrice=matrice_translation.multiplieMatriceCarree(matrice_chgt_repereinv)
			break
		case 9 :
			matrice=matrice_homothetie.multiplieMatriceCarree(matrice_chgt_repereinv)
			break
		case 10 :
			matrice=matrice_homothetie2.multiplieMatriceCarree(matrice_chgt_repereinv)
			break	
		}
	pointA1=matrice.multiplieVecteur(pointA)
	pointA2=matrice_chgt_repere.multiplieVecteur(pointA1)
	return pointA2
}

/**
* Retourne le signe d'un nombre
* @Example
* // + ou -
* @Auteur Rémi Angot
*/
function signe(a) { // + ou -
	let result = '';
	if (a>0) {
		result = '+';
	}else {
		result = '-';
	}
	return result;
};

/**
 * 
 * @param {number} a 
 * -1 si a est négatif, 1 sinon.
 * @Auteur Jean-Claude Lhote
 */
function unSiPositifMoinsUnSinon(a) {
	if (a<0) return -1;
	else return 1;
}

/**
* Retourne un string avec la somme des chiffres
* @Example
* somme_des_chiffres(123)
* // 6
* @Auteur Rémi Angot
*/function somme_des_chiffre(n) { 
	let somme_string =''
	for (let i = 0; i < n.length-1; i++) {
		somme_string += n[i]+'+'
	}
	somme_string += n[n.length-1]
	return somme_string
}

/**
* Retourne l'arrondi (par défaut au centième près)
* 
* @Auteur Rémi Angot
*/
function arrondi(nombre, precision=2){
	let tmp = Math.pow(10, precision);
	return Math.round( nombre*tmp )/tmp;
}

/**
* Renvoit la valeur absolue
* @Auteur Rémi Angot
*/
function abs(a){
	return Math.abs(a);
}

/**
* Retourne un arrondi sous la forme d'un string avec une virgule comme séparateur décimal
* @Auteur Rémi Angot
*/
function arrondi_virgule(nombre, precision=2){ //
	let tmp = Math.pow(10, precision);
	return String(Math.round( nombre*tmp )/tmp).replace('.',',');
}

/**
* Renvoit le PGCD de deux nombres
* @Auteur Rémi Angot
*/
function pgcd(a,b){
	return parseInt(Algebrite.run(`gcd(${a},${b})`));
}

/**
* Renvoit le PPCM de deux nombres
* @Auteur Rémi Angot
*/
const ppcm = (a,b) => { return parseInt(Algebrite.run(`lcm(${a},${b})`))}


/**
* Retourne le numérateur et le dénominateur de la fraction passée en argument sous la forme (numérateur,dénominateur)réduite au maximum dans un tableau [numérateur,dénominateur]
* * **ATTENTION Fonction clonée dans la classe Fraction()**
* @Auteur Rémi Angot
*/
function fraction_simplifiee(n,d){ 
	let p=pgcd(n,d);
	let ns = n/p;
	let ds = d/p;
	if (ns<0 && ds<0) {
		[ns,ds] = [-ns,-ds]
	}
	if (ns>0 && ds<0) {
		[ns,ds] = [-ns,-ds]
	}
	return [ns,ds];
}

/**
* Retourne le code LaTeX d'une fraction simplifiée ou d'un nombre entier 
* @Auteur Rémi Angot
*/
function tex_fraction_reduite(n,d){
	if (n%d==0) {
		return n/d
	} else {
		return tex_fraction_signe(fraction_simplifiee(n,d)[0],fraction_simplifiee(n,d)[1]);
	}
}

/**
*
* Simplifie une fraction en montrant les étapes
* Le résultat est un string qui doit être entouré de $ pour le mode mathématiques
* @Auteur Rémi Angot
*/
function simplification_de_fraction_avec_etapes(num,den){
	// Est-ce que le résultat est simplifiable ?
	let result = ''
	let s = pgcd(num,den); 
	if (s!=1) {
		if ((num)%(den)==0) { //si le résultat est entier
			result = `=${(num)/(den)}`
		} else {
			result =`=${tex_fraction(Algebrite.eval((num)/s)+mise_en_evidence('\\times'+s),Algebrite.eval(den/s)+mise_en_evidence('\\times'+s))}=${tex_fraction_signe(Algebrite.eval((num)/s),Algebrite.eval(den/s))}`
		}
	}
	return result
}

/**
 * Retourne l'égalité des produits en croix à partir d'un tableau contenant les deux fractions [[a,b],[c,d]] pour a/b=c/d retourne ad=bc
 * Le résultat est un string en mode maths inline
 * @auteur Jean-Claude Lhote
 */

function produits_en_croix([[a,b],[c,d]]) { // écrit une chaine pour a*d=b*c
	let result=``
	result+=`$${a}\\times${d}=${b}\\times${c}$`
	return result
	}

/**
 * Retourne la quatrième proportionnelle de 3 nombres en fonction d'une précision demandée
 * Le résultat est un string qui doit être entouré de $ pour le mode mathématiques
 * @auteur Jean-Claude Lhote
 */

function quatrieme_proportionnelle(a,b,c,precision) { //calcul de b*c/a
let result=``
if ((typeof a)=="number"&&(typeof b)=="number"&&(typeof c)=="number") {
	if (a==0) { 
		result='=erreur : division par zéro';
		return result;
	}
	let p4=calcul(b*c/a);
	result+=`\\dfrac{${tex_nombrec(b)}\\times${tex_nombrec(c)}}{${tex_nombrec(a)}}`;
	if (p4==arrondi(p4,precision)) result +=`=`;
	else result +=`\\approx`;
	result += `${arrondi_virgule(p4,precision)}`;
	return result;
	}
else {
	return `\\dfrac{${b} \\times${c}}{${a}}`
}
}

/**
 * renvoie une chaine correspondant à l'écriture réduite de ax+b selon les valeurs de a et b
 * @param {number} a 
 * @param {number} b 
 */
function reduire_ax_plus_b(a,b) {
	let result=``
	if (a!=0) if (a==1) result='x'
						else if (a==-1) result='-x'
										else result=`${tex_nombrec(a)}x`
	if (b!=0) if (a!=0) result+=`${ecriture_algebrique(b)}`
						else result=tex_nombrec(b)
	else if (a==0) result='0'
	return result
}
/**
*
* Donne la liste des facteurs premiers d'un nombre
* @Auteur Rémi Angot
*/
function obtenir_liste_facteurs_premiers(n){
	// Algorithme de base où l'on divise par chacun des nombres premiers 
	liste = []
	liste_nombres_premiers = obtenir_liste_nombres_premiers()
	let i = 0;
	while (n>1 && liste_nombres_premiers[i]<=n){
		if (n%liste_nombres_premiers[i]==0) {
			liste.push(liste_nombres_premiers[i])
			n/=liste_nombres_premiers[i]
		} else{
			i++
		}
	}
	if (liste.length==0) {liste.push(n)}
		return liste
}

/**
* Utilise Algebrite pour s'assurer qu'il n'y a pas d'erreur dans les calculs avec des décimaux
* Le 2e argument facultatif permet de préciser l'arrondi souhaité
* @Auteur Rémi Angot
*/
function calcul(expression,arrondir=false){
	if (!arrondir) {
		return parseFloat(Algebrite.eval('float('+expression+')'))
	} else {
		return arrondi(parseFloat(Algebrite.eval('float('+expression+')')),arrondir)
	}
}

/**
* Utilise Algebrite pour s'assurer qu'il n'y a pas d'erreur dans les calculs avec des décimaux
* Le 2e argument facultatif permet de préciser l'arrondi souhaité
* @Auteur Rémi Angot
*/
function nombreDecimal(expression,arrondir=false){
	if (!arrondir) {
		return string_nombre(calcul(expression))
	} else {
		return string_nombre(calcul(expression,1))
	}
}



/**
* Utilise Algebrite pour s'assurer qu'il n'y a pas d'erreur dans les calculs avec des décimaux et retourne un string avec la virgule comme séparateur décimal
* @Auteur Rémi Angot
*/
function tex_nombrec(expression){ 
	return tex_nombre(parseFloat(Algebrite.eval(expression)))
}
/**
 * renvoie le résultat de l'expression en couleur (vert=positif, rouge=négatif, noir=nul)
 * @param {string} expression l'expression à calculer
 */
function tex_nombrecoul(nombre){ 
	if (nombre>0) return mise_en_evidence(tex_nombrec(nombre),'green')
	else if (nombre<0) return mise_en_evidence(tex_nombrec(nombre),'red')
		else return mise_en_evidence(tex_nombrec(0),'black')
}


/**
* Renvoit un tableau (somme des termes positifs, somme des termes négatifs)
* @Auteur Rémi Angot
*/function somme_des_termes_par_signe(liste){
	let somme_des_positifs = 0, somme_des_negatifs = 0;
	for (var i = 0; i < liste.length; i++) {
		if (liste[i]>0){
			somme_des_positifs += liste[i]
		} else {
			somme_des_negatifs += liste[i]
		}
	}
	return [somme_des_positifs,somme_des_negatifs]
}
/**
 * prend une liste de nombres relatifs et la retourne avec les positifs au début et les négatifs à la fin.
 * @param {array} liste la liste de nombres à trier
 */
function trie_positifs_negatifs(liste){
	let positifs=[]
	let negatifs=[]
	for (let i=0; i<liste.length;i++) {
		if (liste[i]>0) positifs.push(liste[i])
		else negatifs.push(liste[i])
	}
	return positifs.concat(negatifs)
}

/**
* Créé un string de nbsommets caractères dans l'ordre alphabétique et en majuscule qui ne soit pas dans la liste donnée en 2e argument
* @Auteur Rémi Angot
*/
function creerNomDePolygone(nbsommets,liste_a_eviter=[]){ 
	let premiersommet = randint(65,90-nbsommets);
	let polygone="";
	for (let i=0;i<nbsommets;i++){
		polygone += String.fromCharCode(premiersommet+i)
	}

	while(possedeUnCaractereInterdit(polygone,liste_a_eviter)){
		polygone="";
		premiersommet = randint(65,90-nbsommets);
		for (let i=0;i<nbsommets;i++){
			polygone += String.fromCharCode(premiersommet+i)
		}
	}
	return polygone
}

/**
* Vérifie dans un texte si un de ses caractères appartient à une liste à éviter
* @Auteur Rémi Angot
*/
function possedeUnCaractereInterdit(texte,liste_a_eviter) {
	let result = false
	for (mot_a_eviter of liste_a_eviter) {
		for (let i = 0 ; i < mot_a_eviter.length; i++) {
			if (texte.indexOf(mot_a_eviter[i])>-1) {
				result = true
			}
		}
	}
	return result;
}

/**
* Renvoit une lettre majuscule depuis un nombre compris entre 1 et 702
* @Auteur Rémi Angot
*@Example
* // 0 -> @ 1->A ; 2->B...
* // 27->AA ; 28 ->AB ...
*/
function lettre_depuis_chiffre(i){ 
	
	let result=''
	if (i<=26) {
		result = String.fromCharCode(64+i)
	} else {
		if (i%26==0) {
			result = String.fromCharCode(64+Math.floor(i/26)-1)
			result+=String.fromCharCode(64+26)
		} else {
			result = String.fromCharCode(64+Math.floor(i/26))
			result+=String.fromCharCode(64+i%26)
		}
	}
	return result
}

/**
* Renvoit une lettre majuscule depuis un nombre compris entre 1 et 702
* @Auteur Rémi Angot
*@Example
* // 0 -> @ 1->a ; 2->b...
* // 27->aa ; 28 ->ab ...
*/
function lettre_minuscule_depuis_chiffre(i){ 
	return lettre_depuis_chiffre(i).toLowerCase()
}

/**
* @Auteur Rémi Angot
* @Example
* //0h24 est accepté
*/
function minToHoraire(minutes){	 
	var nbHour = parseInt(minutes / 60);
	if (nbHour>23){
		nbHour = nbHour-24
	}
	var nbminuteRestante = (minutes % 60);
	if (nbminuteRestante>9){
		return(nbHour + " h " + nbminuteRestante);
	} else {
		return(nbHour + " h 0" + nbminuteRestante);
	}
}

/**
* @Auteur Rémi Angot
* @Example
* //on écrira 24 minutes plutôt que 0h24
*/
function minToHour(minutes){
	var nbHour = parseInt(minutes / 60);
	if (nbHour>23){
		nbHour = nbHour-24
	}
	var nbminuteRestante = (minutes % 60);
	if (nbHour==0) {
		return(nbminuteRestante+' min')
	} else {
		if (nbminuteRestante>9){
			return(nbHour + " h " + nbminuteRestante);
		} else {
			return(nbHour + " h 0" + nbminuteRestante);
		}
	}
}

/**
* Renvoit un prénom féminin au hasard 
* @Auteur Rémi Angot
*/
function prenomF(){
	return choice(['Manon','Julie','Aude','Corinne','Léa','Carine','Elsa','Lisa','Marina','Magalie','Nawel','Dalila','Nadia','Yasmine'])
}

/**
* Renvoit un prénom masculin au hasard
* @Auteur Rémi Angot
*/
function prenomM(){
	return choice(['Rémi','Benjamin','Guillaume','Christophe','Cyril','Kamel','Yazid','Mehdi','Karim','Bernard','Joachim','Jean-Claude'])
}

/**
* Renvoit un prénom au hasard
* @Auteur Rémi Angot
*/
function prenom(){
	return choice([prenomF(),prenomM()])
}

 /**
* Renvoit un tableau avec les résultats des tirages successifs
* @param nombre_tirages Combien de tirages ?
* @param nombre_faces Pour spécifier le type de dés
* @param nombre_des Combien de dés à chaque tirage ?
* @auteur Jean-Claude Lhote
*/
function tirer_les_des(nombre_tirages,nombre_faces,nombre_des) { 
	let tirages =[];
	for (i=0;i<=(nombre_faces-1)*nombre_des;i++) tirages.push([i+nombre_des,0]);
		for (let i=0,resultat;i<nombre_tirages;i++) {
			resultat=0;
			for (j=0;j<nombre_des;j++) resultat+=randint(1,nombre_faces); 
				tirages [resultat-nombre_des][1]++;
		}
		return tirages
	}
 /**
* Renvoit un tableau de nombres
* @param nombre_notes
* @param note_min
* @param note_max
* @auteur Jean-Claude Lhote
*/
function liste_de_notes(nombre_notes,note_min,note_max) { 
	let notes =[];
	for (i=0;i<nombre_notes;i++) notes.push(randint(note_min,note_max));
		return notes
}

 /**
* Renvoit le nombre de jour d'un mois donné
* @param n quantième du mois (janvier=1...)
* @auteur Jean-Claude Lhote
*/
function jours_par_mois(n){
	let jours_mois=[31,28,31,30,31,30,31,31,30,31,30,31];
	return jours_mois[n-1]
}
 /**
* Renvoit un tableau de températures
* @param base température médiane
* @mois quantième du mois (janvier=1...)
* @annee pour déterminer si elle est bissextile ou non 
* @auteur Jean-Claude Lhote
*/
function un_mois_de_temperature(base,mois,annee) { 
	let temperatures =[];
	let nombre_jours=jours_par_mois(mois);
	if (mois==2) {
		if (((annee%4==0)&&(annee%100!=0))||(annee%400==0)) 	nombre_jours=29;	// années bissextiles.  
		else nombre_jours=28; 
	}
	temperatures.push(randint(-3,3)+base);
	for (let i=1;i<nombre_jours;i++) temperatures.push(temperatures[i-1]+randint(-2,2));
		return temperatures
}

 /**
* Renvoit le nom du mois
* @param n quantième du mois
* @auteur Jean-Claude Lhote
*/
function nom_du_mois(n) {
	let mois=['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
	return mois[n-1]
}

// Fonctions LaTeX

/**
* * Retourne un environnement LaTeX enumerate à partir d'une liste.
* * `<br>`est remplacé par un saut de paragraphe
* * `<br><br>` est remplacé par un saut de paragraphe et un medskip
* * L'espacement est généré avec spacing
* @Auteur Rémi Angot
*/
function tex_enumerate(liste,spacing){
	let result =''
	if (liste.length>1) {
		result = "\\begin{enumerate}\n"
		if (spacing>1) {
			result += `\\begin{spacing}{${spacing}}\n`
		}
		for(let i in liste){
			result += '\t\\item ' + liste[i] +'\n'
		}
		if (spacing>1){
			result += '\\end{spacing}\n'
		} 
		result += '\\end{enumerate}\n'
	} else {
		if (spacing>1) {
			result += `\\begin{spacing}{${spacing}}\n`
		}
			result += liste[0] +'\n'
		if (spacing>1){
			result += '\\end{spacing}\n'
		} 
	}	
	return result.replace(/<br><br>/g,'\n\n\\medskip\n').replace(/<br>/g,'\\\\\n')
	
}

/**
* * Retourne un environnement LaTeX enumerate à partir d'une liste sans afficher les numéros.
* * `<br>` est remplacé par un saut de paragraphe
* * `<br><br>` est remplacé par un saut de paragraphe et un medskip
* * L'espacement est généré avec spacing
* @Auteur Rémi Angot
*/
function tex_enumerate_sans_numero(liste,spacing){
	//return tex_enumerate(liste,spacing).replace('\\begin{enumerate}[label={}]','\\begin{enumerate}[label={}]')
	return tex_enumerate(liste,spacing).replace('\\begin{enumerate}','\\begin{enumerate}[label={}]')
}

/**
* * Concatène les éléments d'une liste avec un saut de ligne entre chaque élément
* * `<br>` est remplacé par un saut de paragraphe
* * `<br><br>` est remplacé par un saut de paragraphe et un medskip
* @Auteur Rémi Angot
*/
function tex_paragraphe(liste,spacing=false){
	let result =''
	if (spacing>1){
		result = `\\begin{spacing}{${spacing}}\n`
	}

	for(let i in liste){
		result += `\t${liste[i]}\\\\\n`
	}
	if (spacing>1){
		result += '\\end{spacing}'
	} 
	return result.replace(/<br><br>/g,'\n\n\\medskip\n').replace(/<br>/g,'\\\\\n')
}

/**
* * Recopie le texte.
* * `<br>` est remplacé par un saut de paragraphe
* * `<br><br>` est remplacé par un saut de paragraphe et un medskip
* @Auteur Rémi Angot
*/
function tex_introduction(texte){
	return texte.replace(/<br><br>/g,'\n\n\\medskip\n').replace(/<br>/g,'\\\\\n')
}


/**
*  Renvoit une liste HTML à partir d'une liste
* 
* @param liste une liste de questions
* @param spacing interligne (line-height en css)
* @Auteur Rémi Angot
*/
function html_enumerate(liste,spacing){
	let result='';

	if (liste.length>1) {
		(spacing>1) ? result =`<ol style="line-height: ${spacing};">` : result = '<ol>'
		for(let i in liste){
			result += '<li>' + liste[i].replace(/\\dotfill/g,'..............................').replace(/\\not=/g,'≠').replace(/\\ldots/g,'....') + '</li>'   // .replace(/~/g,' ') pour enlever les ~ mais je voulais les garder dans les formules LaTeX donc abandonné
		}
		result += '</ol>'
	} else if (liste.length==1) {
		(spacing>1) ? result =`<div style="line-height: ${spacing};">` : result = '<div>'
		result += liste[0].replace(/\\dotfill/g,'..............................').replace(/\\not=/g,'≠').replace(/\\ldots/g,'....')   // .replace(/~/g,' ') pour enlever les ~ mais je voulais les garder dans les formules LaTeX donc abandonné
		result += '</div>'	
	}
	return result

}


/**
* Renvoit une liste HTML ou LaTeX suivant le contexte
* 
* @param liste une liste de questions
* @param spacing interligne (line-height en css)
* @Auteur Rémi Angot
*/
function enumerate(liste,spacing){
	if (sortie_html) {
		return html_enumerate(liste,spacing)
	} else {
		return tex_enumerate(liste,spacing)
	}
}


/**
*  Renvoit un paragraphe HTML à partir d'un string
* 
* @param string
* @Auteur Rémi Angot
*/
function html_paragraphe(texte){
	if (texte.length>1) {
		return `\n<p>${texte}</p>\n\n`		
	} else {
		return ""
	}
}

/**
*  Renvoit un div HTML à partir d'une liste découpée par des sauts de ligne
* 
* @param liste une liste de questions
* @param spacing interligne (line-height en css)
* @Auteur Rémi Angot
*/
function html_ligne(liste,spacing){
	let result = '';
	if (spacing>1) {
		result = `<div style="line-height: ${spacing};">\n`
	}
	for(let i in liste){
		result += '\t' + liste[i].replace(/\\dotfill/g,'...') + '<br>'   // .replace(/~/g,' ') pour enlever les ~ mais je voulais les garder dans les formules LaTeX donc abandonné
		// .replace(/\\\\/g,'<br>') abandonné pour supporter les array
	}

	if (spacing>1) {
		result += `</div>\n`
	}

	return result
}



/**
* Renvoit un environnent LaTeX multicolonnes
* @Auteur Rémi Angot
*/
function tex_multicols(texte,nb_cols=2){
	let result;
	if (nb_cols > 1){
		result = '\\begin{multicols}{' + nb_cols +'}\n' +
		texte + '\n\\end{multicols}';
	}else{
		result = texte;
	}
	return result
}

/**
* Renvoit la consigne en titre 4
* @Auteur Rémi Angot
*/
function html_consigne(consigne){
	return '<h4>' + consigne + '</h4>\n\n'
}

/**
* Renvoit \exo{consigne}
* @Auteur Rémi Angot
*/
function tex_consigne(consigne){
	return '\\exo{' + consigne.replace(/<br>/g,'\\\\') + '}\n\n'
}

/**
* Renvoit un nombre dans le format français (séparateur de classes)
* @Auteur Rémi Angot
*/
function tex_nombre(nb){
	//Ecrit \nombre{nb} pour tous les nombres supérieurs à 1 000 (pour la gestion des espaces)
	if (sortie_html) {
		//return Intl.NumberFormat("fr-FR",{maximumFractionDigits:20}).format(nb).toString().replace(/\s+/g,'\\thickspace ').replace(',','{,}'); // .replace(',','{,}') servait à enlever l'espace disgracieux des décimaux mais ne passait qu'en mode LaTeX
		return Intl.NumberFormat("fr-FR",{maximumFractionDigits:20}).format(nb).toString().replace(/\s+/g,'\\thickspace '); // \nombre n'est pas pris en charge par katex
	} else {
		let result;
		if (nb>999 || nombre_de_chiffres_dans_la_partie_decimale(nb)>3) { 
			result = '\\numprint{'+nb.toString().replace('.',',')+'}';
		}else{
			result = nb.toString().replace('.',',');
		}
		return result;
	}
}

/**
 * Renvoie un espace insécable pour le mode texte suivant la sorite html ou Latex.
 * @Auteur Jean-Claude Lhote
 */
function sp() {
	if (sortie_html) return `&nbsp`
	else return `~`
}

/**
* Renvoit un nombre dans le format français (séparateur de classes)
* Fonctionne sans le mode maths contrairement à tex_nombre()
* @Auteur Rémi Angot
*/
function nombre_avec_espace(nb){
	//Ecrit \nombre{nb} pour tous les nombres supérieurs à 1 000 (pour la gestion des espaces)
	if (sortie_html) {
		return Intl.NumberFormat("fr-FR",{maximumFractionDigits:20}).format(nb).toString().replace(/\s+/g,' ');
	} else {
		let result;
		if (nb>999 || nombre_de_chiffres_dans_la_partie_decimale(nb)>3) { 
			result = '\\numprint{'+nb.toString().replace('.',',')+'}';
		}else{
			result = nb.toString().replace('.',',');
		}
		return result;
	}
}


/**
* Renvoit un nombre dans le format français (séparateur de classes) version sans Katex (pour les SVG)
* @Auteur Jean-Claude Lhote
*/
function string_nombre(nb){
	//Ecrit \nombre{nb} pour tous les nombres supérieurs à 1 000 (pour la gestion des espaces)
	let nombre=nb.toString();
	let partie_entiere=nombre.split('.')[0];
	let partie_decimale=nombre.split('.')[1];
	let result='';
	let i;
	if (partie_entiere.length>3) {
		for (i=0;i<Math.floor(partie_entiere.length/3);i++) {
			result=' '+partie_entiere.slice(partie_entiere.length-i*3-3,partie_entiere.length-i*3)+result;
		}
		result=partie_entiere.slice(0,partie_entiere.length-i*3)+result;
	}
	else result=partie_entiere;
	if (result[0]==' ') result=result.substring(1,result.length)
	if (partie_decimale!=undefined)  result+=','+partie_decimale;
	return result;
}
/**
* Met en couleur et en gras
*
* @Auteur Rémi Angot
*/
function mise_en_evidence(texte,couleur="#f15929"){
	if (sortie_html) {
		return `\\mathbf{\\color{${couleur}}{${texte}}}`
	} else {
		if (couleur[0]=='#') {
				return `\\mathbf{\\color[HTML]{${couleur.replace('#','')}}${texte}}`
			} else {
				return `\\mathbf{\\color{${couleur.replace('#','')}}${texte}}`
			}
	}	
}

/**
* Met en couleur un texte
* @param {string} texte à mettre en couleur
* @param {string} couleur en anglais ou code couleur hexadécimal par défaut c'est le orange de CoopMaths
* @Auteur Rémi Angot
*/
function texte_en_couleur(texte,couleur="#f15929"){
	if (sortie_html) {
		return `<span style="color:${couleur};">${texte}</span>`	
	}
	else {
		if (couleur[0]=='#') {
			return `{\\color[HTML]{${couleur.replace('#','')}}${texte}}`
		} else {
			return `{\\color{${couleur.replace('#','')}}${texte}}`
		}
	}
	
}

/**
* Met en couleur et gras un texte
* @param {string} texte à mettre en couleur
* @param {string} couleur en anglais ou code couleur hexadécimal par défaut c'est le orange de CoopMaths
* @Auteur Rémi Angot
*/
function texte_en_couleur_et_gras(texte,couleur="#f15929"){
	if (sortie_html) {
		return `<span style="color:${couleur};font-weight: bold;">${texte}</span>`	
	}
	else {
		if (couleur[0]=='#') {
			return `{\\color[HTML]{${couleur.replace('#','')}}${texte}}`
		} else {
			return `{\\bfseries \\color{${couleur.replace('#','')}}${texte}}`
		}
	}
	
}
/**
 * couleurAleatoire() renvoie le code d'une couleur au hasard
 *
 * @Auteur Rémi Angot
 */
function couleurAleatoire() {
	// let color = "#";
	// for (let i = 0; i < 6; i++) {
	//   color += choice([
	//     0,
	//     1,
	//     2,
	//     3,
	//     4,
	//     5,
	//     6,
	//     7,
	//     8,
	//     9,
	//     "A",
	//     "B",
	//     "C",
	//     "D",
	//     "E",
	//     "F",
	//   ]);
	// }
	// return color;
	return choice(['white', 'black', 'red', 'green', 'blue', 'cyan', 'magenta', 'yellow'])
  }

  function arcenciel(i) {
	  let couleurs=['violet','indigo',  'blue', 'green', 'yellow', 'orange', 'red']
	  return couleurs[i%7]
  }
  function texcolors(i,fondblanc="true") {
	  let couleurs=['black', 'blue', 'brown', 'cyan', 'darkgray', 'gray', 'green', 'lightgray', 'lime', 'magenta', 'olive', 'orange', 'pink', 'purple', 'red', 'teal', 'violet', 'white', 'yellow']
	  if (fondblanc&&i%19>=17) i+=2
	  return couleurs[i%19]
  }

/**
* Met gras un texte
* @param {string} texte à mettre en gras
* @Auteur Rémi Angot
*/
function texte_gras(texte){
	if (sortie_html) {
		return `<b>${texte}</b>`	
	}
	else {
		return `\\textbf{${texte}}`
	}	
}

/**
* Affiche un lien vers une URL
* @param {string} texte à afficher
* @param {string} URL
* @Auteur Rémi Angot
*/
function href(texte,lien){
	if (sortie_html) {
		return `<a target="_blank" href=${lien}> ${texte} </a>`	
	} else {
		return `\\href{${lien}}{${texte}}`
	}
	
}

/**
* Pour bien afficher les centimes avec 2 chiffres après la virgule
* @Auteur Rémi Angot
*/
function tex_prix(nb){
	//Remplace le . par la ,
	nombre = Number (nb);
	let result ;
	if (nombre==nombre.toFixed(0)){
		result = nombre
	} else {
		result = nombre.toFixed(2).toString().replace('.',','); //Ne gère pas l'espace des milliers
	}
	return result;
	
}


/**
* Convertit en majuscule la première lettre
* @Auteur Rémi Angot
*/
function premiere_lettre_en_majuscule(text){return (text+'').charAt(0).toUpperCase()+text.substr(1);}


/**
* Renvoit le nombre de chiffres de la partie décimale 
* @Auteur Rémi Angot
*/
function nombre_de_chiffres_dans_la_partie_decimale(nb){
	if (String(nb).indexOf('.')>0){
		return String(nb).split(".")[1].length
	} else{
		return 0
	}
}


/**
* Écrit une fraction avec - devant si le numérateur ou le dénominateur est négatif
* @Auteur Jean-Claude Lhote
*/
function tex_fraction_signe(a,b){ 
	if (b!=1) {
		if (a*b>0){
			return '\\dfrac{'+Math.abs(a)+'}{'+Math.abs(b)+'}'
		}
		else {
			return '-\\dfrac{'+Math.abs(a)+'}{'+Math.abs(b)+'}'
		}
	}
	else
	{
		return a
	}
}

/**
* Met de grandes parenthèses autour de la fraction a/b si besoin pour inclure une fraction dans une expresion en fonction du signe
* @Auteur Jean-Claude Lhote
*/
function tex_fraction_parentheses(a,b){ 
	if (a*b>0) {return tex_fraction_signe(a,b)}
		else {return '\\left('+tex_fraction_signe(a,b)+'\\right)'}
	}

/**
* Retourne une liste de fractions irréductibles
* @Auteur Jean-Claude Lhote
*/
function obtenir_liste_fractions_irreductibles() {
	return  [[1,2],[1,3],[2,3],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],
	[1,6],[5,6],[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[1,8],[3,8],[5,8],[7,8],
	[1,9],[2,9],[4,9],[5,9],[7,9],[8,9],[1,10],[3,10],[7,10],[9,10]]
}

/**
* Retourne la liste des nombres premiers inférieurs à 300
* @Auteur Rémi Angot
*/
function obtenir_liste_nombres_premiers() {
	return  [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293];
}

/**
* Retourne le code LaTeX de la décomposition en produit de facteurs premiers d'un nombre
* @Auteur Rémi Angot
*/
function decomposition_facteurs_premiers(n) {
	let decomposition='';
	let liste=obtenir_liste_facteurs_premiers(n);
	for (let i in liste) {
		decomposition+=liste[i]+'\\times';
	}
	decomposition=decomposition.substr(0,decomposition.length-6)
	return decomposition;
}

/**
* Retourne la liste des diviseurs d'un entier
* @Auteur Rémi Angot
*/
function liste_des_diviseurs(n) {
	let k =2;
	let liste = [1];
	while (k<=n){
		if (n%k==0) {
			liste.push(k);
		}
		k++
	}

	return liste;
}

/**
* Retourne le code LaTeX d'une fraction a/b
* @Auteur Rémi Angot
*/
function tex_fraction(a,b){ 
	if (b!=1) {
		if (Number.isInteger(a) && Number.isInteger(b)) {
			return `\\dfrac{${tex_nombre(a)}}{${tex_nombre(b)}}`
		} else 
		{
			return `\\dfrac{${a}}{${b}}`
		}
	}
	else
	{
		return a
	}

}


/**
* Utilise printlatex et quote de Algebrite
* @Auteur Rémi Angot
*/

function printlatex(e){
	return Algebrite.run(`printlatex(quote(${e}))`)
}


/**
* Écrit du texte en mode mathématiques
* @Auteur Rémi Angot
*/
function tex_texte(texte) {
	return '~\\text{'+texte+'}'
}

/**
* Retourne un environnement LaTeX itemize à partir d'une liste
* @Auteur Rémi Angot
*/
function itemize(tableau_de_texte){
	let texte = ''
	if (sortie_html) {
		texte = '<div>'
		for (var i = 0; i < tableau_de_texte.length; i++) {
			texte += '<div> − ' + tableau_de_texte[i] + '</div>'
		}
		texte += '</div>'
	} else {
		texte = '\t\\begin{itemize}\n'
		for (var i = 0; i < tableau_de_texte.length; i++) {
			texte += '\t\t\\item ' + tableau_de_texte[i]+'\n'
		}
		texte += '\t\\end{itemize}'
	}
	return texte
}


/**
* Récupère le code JS d'un exercice qui modifie les valeurs d'une figure MG32 et actualise la figure
* @Auteur Rémi Angot
*/
function MG32_modifie_figure(numero_figure) {
	let code_pour_modifier_la_figure = exercice[numero_figure].MG32code_pour_modifier_la_figure
	if (window.mtg32App.docs.length==1){
		code_pour_modifier_la_figure = code_pour_modifier_la_figure.replace("display","updateDisplay")
	}
	let modification = new Function('numero_figure',code_pour_modifier_la_figure)
	modification(numero_figure);
}

/**
* Actualise toutes les figures MG32 avec les nouvelles valeurs
* @Auteur Rémi Angot
*/
function MG32_modifie_toutes_les_figures() {
	for (let i = 0; i < liste_des_exercices.length; i++) {
		if (exercice[i].type_exercice=='MG32'){
			MG32_modifie_figure(i)
		}
	}
}

/**
* Ajoute une figure MG32 dans le code HTML de la page
* @Auteur Rémi Angot
*/
function MG32_ajouter_figure(numero_de_l_exercice) {
	if (window.mtg32App) {
		for (var i = 0; i < mtg32App.docs.length; i++) {
			mtg32App.removeDoc(mtg32App.docs[i].idDoc)
		}	
	}
	MG32_tableau_de_figures.push(
  // pour chaque figure on précise ici ses options
  {
  	idContainer: `MG32div${numero_de_l_exercice}`,
  	svgOptions: {
  		width: `${exercice[numero_de_l_exercice].taille_div_MG32[0]}`, 
  		height: `${exercice[numero_de_l_exercice].taille_div_MG32[1]}`, 
  		idSvg: `MG32svg${numero_de_l_exercice}`
  	},
  	mtgOptions: {
		  fig: exercice[numero_de_l_exercice].MG32codeBase64,
		  isEditable: exercice[numero_de_l_exercice].MG32editable
	  }
  }
  )	

	if (exercice[numero_de_l_exercice].MG32codeBase64corr) {
		MG32_tableau_de_figures.push(
  // pour chaque figure on précise ici ses options
  {
  	idContainer: `MG32divcorr${numero_de_l_exercice}`,
  	svgOptions: {
  		width: `${exercice[numero_de_l_exercice].taille_div_MG32[0]}`, 
  		height: `${exercice[numero_de_l_exercice].taille_div_MG32[1]}`, 
  		idSvg: `MG32svgcorr${numero_de_l_exercice}`
  	},
  	mtgOptions: {
  		fig: exercice[numero_de_l_exercice].MG32codeBase64corr,
  		isEditable: false
  	}
  }
  )		
	}
}

/**
* Pour chaque figure on récupère une promesse de chargement, 
* on lance tout en parallèle, 
* et quand toutes seront résolues on continue
* @Auteur Rémi Angot
*/
function MG32_tracer_toutes_les_figures() {

	(function verifie_div_MG32() {
		const el = document.getElementsByClassName('MG32');
		// Sélectionne les div de classe MG32
		if (el.length) { // S'ils existent, on peut appeler MG32
			Promise.all(MG32_tableau_de_figures.map(({idContainer, svgOptions, mtgOptions}) => mtgLoad(idContainer, svgOptions, mtgOptions)))
		.then(results => {
		    		// results est le tableau des valeurs des promesses résolues, avec la même instance du player pour chacune, la 1re valeur nous suffit donc
		    		window.mtg32App = results[0]
			    	// on peut l'utiliser…
			    	MG32_modifie_toutes_les_figures()
			    })
		.catch(error => console.error(error))
	} else {
    		setTimeout(verifie_div_MG32, 300); // retente dans 300 milliseconds
    	}
    })();

}
/**
 * Trace un axe vertical gradué
 * @param {string} mon_svg l'id du svg
 * @param {number} start ordonnée du début de l'axe en pixels (end-start=longueur del'axe)
 * @param {number} end ordonnée de fin del'axe en pixels
 * @param {number} absO position en abscisse de l'axe en pixels
 * @param {number} DeltaY Nombre entier de graduations à faire sur la longueur de l'axe. 
 * @Auteur Jean-Claude Lhote
 */
function SVG_Axe_vertical (mon_svg,start,end,absO,DeltaY,subY){
	let droite = mon_svg.line(absO,start+2, absO, end)
	droite.stroke({ color: 'black', width: 2, linecap: 'round' })
	for (let i=0;i<DeltaY;i++){
		let line = mon_svg.line(absO-2,(DeltaY-i)*((end-start)/DeltaY), absO+2, (DeltaY-i)*((end-start)/DeltaY))
		line.stroke({ color: 'black', width: 2, linecap: 'round' })
		if (subY!=1) {
			for (let k=1;k<subY;k++) {
				let line = mon_svg.line(absO-2,((end-start)/DeltaY)*(DeltaY-i-k/subY),absO+2,((end-start)/DeltaY)*(DeltaY-i-k/subY))
				line.stroke({ color: 'black', width: 1, linecap: 'round' })
			}
		}
	}
}
/**
 * Trace un axe horizontal gradué
 * @param {string} mon_svg l'id du svg
 * @param {number} start abscisse du début de l'axe en pixels (end-start=longueur del'axe)
 * @param {number} end abscisse de fin del'axe en pixels
 * @param {number} absO position en ordonnée de l'axe en pixels
 * @param {number} DeltaX Nombre entier de graduations à faire sur la longueur de l'axe. 
 * @Auteur Jean-Claude Lhote
 */
function SVG_Axe_horizontal (mon_svg,start,end,ordO,DeltaX,subX){
	let droite = mon_svg.line(start,ordO, end-2, ordO)
	droite.stroke({ color: 'black', width: 2, linecap: 'round' })
	for (let i=1;i<=DeltaX;i++){
			let line = mon_svg.line(start+(DeltaX-i)*((end-start)/DeltaX),ordO-2,start+(DeltaX-i)*((end-start)/DeltaX), ordO+2)
			line.stroke({ color: 'black', width: 2, linecap: 'round' })
			if (subX!=1) {
				for (let k=1;k<subX;k++) {
					let line = mon_svg.line(start+(DeltaX-i+k/subX)*((end-start)/DeltaX),ordO-2,start+(DeltaX-i+k/subX)*((end-start)/DeltaX), ordO+2)
					line.stroke({ color: 'black', width: 1, linecap: 'round' })
				}
			}
	}
}

/**
 * Place une grille de points dans un repère au sein d'un SVG
 * @param {string} mon_svg  l'id du svg
 * @param {number} absO abscisse du point de départ de la grille (normalement 0)
 * @param {number} ordO ordonnée du point de départ de la grille (normalement 0)
 * @param {number} tailleX largeur totale de la grille en pixels
 * @param {number} tailleY hauteur totale de la grille en pixels
 * @param {number} DeltaX nombre de graduations horizontales
 * @param {number} DeltaY nombre de graduations verticales
 * @param {number} subX coefficient de fractionnement de la grille en abscisse
 * @param {number} subY coefficient de fractionnement de la grille en ordonéée
 * @Auteur Jean-Claude Lhote
 */
function SVG_grille (mon_svg,absO,ordO,tailleX,tailleY,DeltaX,DeltaY,subX,subY){
	let line_grille;
	for (let i=0;i<=DeltaX;i++){
		line_grille = mon_svg.line(absO+i*(tailleX/DeltaX),0,absO+i*(tailleX/DeltaX),tailleY);
		line_grille.stroke({ color: 'lightgray', width: 1 });
	}
	for (let i=0;i<DeltaX;i++){
		if (subX!=1) {
			for (k=0;k<subX;k++) {
					line_grille = mon_svg.line(absO+i*(tailleX/DeltaX)+k*(tailleX/DeltaX/subX),0,absO+i*(tailleX/DeltaX)+k*(tailleX/DeltaX/subX),tailleY);
					line_grille.stroke({ color: 'lightgrey', width: 0.5, linecap: 'round' });
			}
		}
	}
	for (let j=0;j<=DeltaY;j++) {
		line_grille = mon_svg.line(20,ordO+j*(tailleY/DeltaY),20+tailleX,ordO+j*(tailleY/DeltaY));
		line_grille.stroke({ color: 'lightgray', width: 1 });
	}
	for (let j=0;j<DeltaY;j++) {
		if (subY!=1) {
			for (l=0;l<subY;l++) {
				line_grille = mon_svg.line(20,ordO+j*(tailleY/DeltaY)+l*(tailleY/DeltaY/subY),20+tailleX,ordO+j*(tailleY/DeltaY)+l*(tailleY/DeltaY/subY));
				line_grille.stroke({ color: 'lightgrey', width: 0.5, linecap: 'round' });
			}
		}
	}

}


/** Trace une graduation sur le SVG
* @param mon_svg Objet SVG
* @param origine abscisse en pixel de la première graduation
* @param pas distance en pixels entre deux graduations
* @param derniere_graduation abscisse limite en pixel
* @param taille taille verticale
* @param y ordonnée de la droite
* @param couleur couleur de la graduation
* @param width largeur de la graduation
* @Auteur Rémi Angot
*/
function SVG_graduation(mon_svg,origine,pas,derniere_graduation,taille=10,y=50,couleur='black',width=5) {
	for (let i = origine; i < derniere_graduation; i+=pas) {
		let line = mon_svg.line(i, y-taille/2, i, y+taille/2)
		line.stroke({ color: couleur, width: width, linecap: 'round' })
	}
}

/**
 * Ecris des nombres ou des textes à une position donnée dans un SVG
 * @param {array} liste_d_abscisses [[nombre à écrire,abscisse,ordonnée]]
 * @param {number} y leading pour position du texte sur la ligne
 * @param {string} couleur couleur du nombre
 * @param {number} opacite valeur d'opacité entre 0 et 1
 * @Auteur Rémi Angot
 */
function SVG_label(mon_svg,liste_d_abscisses,y,couleur,opacite) {
	'use strict';
	for (let i = 0; i < liste_d_abscisses.length; i++) {
		let text;
		if (typeof liste_d_abscisses[i][0]== 'number') text = mon_svg.text((liste_d_abscisses[i][0]).toString());
		else text = mon_svg.text(liste_d_abscisses[i][0]);
		y=parseInt(y);	
		text.move(liste_d_abscisses[i][1],liste_d_abscisses[i][2]).font({ fill: couleur,
			family:   'Helvetica'
			, size:     14
			, anchor:   'middle'
			, leading : y
			,opacity : opacite
		})
	}
}
/**
 * Ecris une fraction dans un SVG
 * @param {any} mon_svg l'Id du SVG
 * @param {number} num le numérateur de la fraction
 * @param {number} den le dénominateur de la fraction
 * @param {number} x l'abscisse de sa position
 * @param {number} y l'ordonnée de sa position
 * @param {string} couleur la couleur de la fraction
 * @Auteur Rémi Angot
 */
function SVG_fraction(mon_svg,num,den,x,y,couleur) {
	'use strict';
	let longueur=num.toString().length;
	let line = mon_svg.line(x-longueur*5, y-7, x+longueur*5, y-7);
	line.stroke({ color: couleur, width: 2, linecap: 'round' })
	let num_text=mon_svg.text(num.toString()).attr({x: x, y: y-10});
	num_text.font({ fill: couleur,
		family:   'Helvetica'
		, size:     20
		, anchor:   'middle'
		, leading : 0
	})
	let den_text=mon_svg.text(den.toString()).attr({x: x, y: y+10});
	den_text.font({ fill: couleur,
		family:   'Helvetica'
		, size:     20
		, anchor:   'middle'
		, leading : 0
	})
}

/**
 * 
 * @param {any} mon_svg L'id du SVG
 * @param {number} x l'abscisse du point
 * @param {number} y l'ordonnée du point
 * @param {string} nom le nom du point
 * @param {string} couleur la couleur du point
 * @param {number} shiftxnom décallage en abscisse pour le nom du point
 * @param {number} shiftynom décallage en ordonnée pour le nom du point
 * @param {array} montrer_coord cas 1 : [false] rien n'est ajouté, cas 2 : [true, absAxeX, ordAxeY] trace des flèches jusqu'aux axes
 * @Auteur Rémi Angot et Jean-Claude Lhote
 */
function SVG_tracer_point(mon_svg,x,y,nom,couleur,shiftxnom,shiftynom,montrer_coord) {
	//creer un groupe pour la croix
	let point = mon_svg.group()
	let c1 = point.line(-3,3,3,-3)
	c1.stroke({ color: couleur, width: 2, linecap: 'round', opacity:1 })
	let c2 = point.line(-3,-3,3,3)
	c2.stroke({ color: couleur, width: 2, linecap: 'round', opacity:1 })
	//déplace la croix
	point.move(x-3,y-3)
	// point.dmove(-3,-3)
	let text = mon_svg.text(nom).attr({x: x+shiftxnom, y: y+shiftynom, fill: couleur , opacity: 0.7})
	//ecrit le nom
	text.font({
		color : couleur
		, 'font-weight': 'bolder'
		, family:   'Helvetica'
		, size:     14
		, anchor:   'middle'
		, leading : -1
		})
	if (montrer_coord[0]) { // montrer_coord=[true,abs_axe,ord_axe] ou [false]
		if ((y!=montrer_coord[2])&&(x!=montrer_coord[1])) SVG_tracer_droite_flecheV(mon_svg,x,y,x,montrer_coord[2],couleur,3)
		if ((x!=montrer_coord[1])&&(y!=montrer_coord[2])) SVG_tracer_droite_flecheH(mon_svg,x,y,montrer_coord[1],y,couleur,3)
	}

}


/**
 * Trace une flèche dans le SVG pour une demi-droite graduée
 * @param {any} mon_svg l'identifiant du SVG
 * @param {number} x l'abscisse de la pointe
 * @param {number} y l'ordonnée de la pointe
 * @Auteur Rémi Angot
 */
function SVG_tracer_flecheH(mon_svg,x,y) {
	//creer un groupe pour la fleche
	let fleche = mon_svg.group()
	let c1 = fleche.line(-5,5,0,0)
	c1.stroke({ color: 'black', width: 3, linecap: 'round' })
	let c2 = fleche.line(-5,-5,0,0)
	c2.stroke({ color: 'black', width: 3, linecap: 'round' })
	//déplace la croix
	fleche.move(x,y)
	fleche.dmove(-5,-5)
}
/**
 * 
 * @param {string} mon_svg l'identifiant du SVG
 * @param {number} x l'abscisse de la pointe de la flèche
 * @param {number} y l'ordonnée de la pointe de la flèche
 * @Auteur Jean-Claude Lhote
 */
function SVG_tracer_flecheV(mon_svg,x,y) {
	//creer un groupe pour la fleche
	let fleche = mon_svg.group()
	let c1 = fleche.line(-5,5,0,0)
	c1.stroke({ color: 'black', width: 3, linecap: 'round' })
	let c2 = fleche.line(5,5,0,0)
	c2.stroke({ color: 'black', width: 3, linecap: 'round' })
	//déplace la croix
	fleche.move(x,y)
	fleche.dmove(-5,5)
}

/**
 * 
 * @param {string} mon_svg l'identifiant du SVG
 * @param {number} x1 (x1,y1)=point de départ de la flèche verticale (x1=x2 en général)
 * @param {number} y1 
 * @param {number} x2 (x2,y2)=point d'arrivée de la flèche
 * @param {number} y2 
 * @param {string} couleur couleur de la flèche
 * @param {number} pointilles longueur des pointillés et des espaces entre les pointillés
 * @Auteur Jean-Claude Lhote
 */
function SVG_tracer_droite_flecheV(mon_svg,x1,y1,x2,y2,couleur,pointilles){
	let fleche = mon_svg.group()
	let c1 = fleche.line(x1,y1,x2,y2)
	c1.stroke({ color: couleur, width: 1, linecap: 'round',dasharray :pointilles,opacity: 0.5 })
	if (y2<y1) {
	let c2 = fleche.line(x2-3,y2+5,x2,y2)
	c2.stroke({ color: couleur, width: 1, linecap: 'round',opacity: 0.5  })
	let c3 = fleche.line(x2+3,y2+5,x2,y2)
	c3.stroke({ color: couleur, width: 1, linecap: 'round',opacity: 0.5  })
	}
	else {
	let c2 = fleche.line(x2-3,y2-5,x2,y2)
	c2.stroke({ color: couleur, width: 1, linecap: 'round',opacity: 0.5  })
	let c3 = fleche.line(x2+3,y2-5,x2,y2)
	c3.stroke({ color: couleur, width: 1, linecap: 'round' ,opacity: 0.5 })	
	}
}

/**
 * 
 * @param {string} mon_svg l'identifiant du SVG
 * @param {number} x1 (x1,y1)=point de départ de la flèche horizontale (y1=y2 en général)
 * @param {number} y1 
 * @param {number} x2 (x2,y2)=point d'arrivée de la flèche
 * @param {number} y2 
 * @param {string} couleur couleur de la flèche
 * @param {number} pointilles longueur des pointillés et des espaces entre les pointillés
 * @Auteur Jean-Claude Lhote
 */
function SVG_tracer_droite_flecheH(mon_svg,x1,y1,x2,y2,couleur,pointilles){
	let fleche = mon_svg.group()
	let c1 = fleche.line(x1,y1,x2,y2)
	c1.stroke({ color: couleur, width: 1, linecap: 'round',dasharray :pointilles,opacity: 0.5  })
	if (x2<x1) {
	let c2 = fleche.line(x2+5,y2+3,x2,y2)
	c2.stroke({ color: couleur, width: 1, linecap: 'round' ,opacity: 0.5 })
	let c3 = fleche.line(x2+5,y2-3,x2,y2)
	c3.stroke({ color: couleur, width: 1, linecap: 'round',opacity: 0.5  })
	}
	else {
		let c2 = fleche.line(x2-5,y2+3,x2,y2)
		c2.stroke({ color: couleur, width: 1, linecap: 'round' ,opacity: 0.5 })
		let c3 = fleche.line(x2-5,y2-3,x2,y2)
		c3.stroke({ color: couleur, width: 1, linecap: 'round',opacity: 0.5  })	
	}
}
/**
 * 
 * @param {string} mon_svg l'identifiant du SVG
 * @param {number} tailleX largeur en pixels du SVG
 * @param {number} tailleY hauteur en pixels du SVG
 * @param {number} Xmin l'abscisse minimale du repère
 * @param {number} Xmax l'abscisse maximale du repère
 * @param {number} Ymin l'ordonnée minimale du repère
 * @param {number} Ymax l'ordonnée maximale du repère
 * @param {number} OrdX0 l'ordonnée à l'origine de la droite à tracer
 * @param {number} Pente la Pente de la droite à tracer.
 * @param {string} couleur la couleur de la droite à tracer
 * @param {string} nom le nom de la droite à tracer
 * @Auteur Jean-Claude Lhote
 */
function SVG_Tracer_droite(mon_svg,tailleX,tailleY,Xmin,Xmax,Ymin,Ymax,OrdX0,Pente,couleur,nom){
	'use strict';
	let k=0;
	let Pente_r=Pente*(Xmax-Xmin)/(Ymax-Ymin); // Pente adaptée au ratio d'échelle des axes.
	while((k>Xmin)&((OrdX0+Pente*k)<Ymax)&((OrdX0+Pente*k)>Ymin)) k--;
	let X1=k;
	let Y1=OrdX0+Pente*k;
	let DeltaX=Xmax-Xmin;
	let DeltaY=Ymax-Ymin;
	let Dx=(tailleX-20)/DeltaX;
	let Dy=(tailleY-20)/DeltaY;
	let X0=20+Dx*(X1-Xmin);
	let Y0=tailleY-20-Dy*(Y1-Ymin);
	let droite = mon_svg.line(X0,Y0,X0+tailleX,Y0-tailleX*Pente_r)
	droite.stroke({ color: couleur, width: 2, linecap: 'round' })
	let Ynom;
	if (Y0>tailleY/2) Ynom=-Math.round(Pente)
	else Ynom=-Math.round(Pente)
	let text = mon_svg.text(nom).attr({x: X0+20, y: Y0-20*Pente_r})
	//ecrit le nom
	text.font({fill: couleur,
		family:   'Helvetica'
		, size:     15
		, anchor:   'middle'
		, leading : Ynom
		})
}

/**
 * 
 * @param {number} Xmin l'abscisse minimum du repère
 * @param {number} Xmax  l'abscisse maximum du repère
 * @param {number} Ymin l'ordonnée minimum du repère
 * @param {number} Ymax l'ordonnée maximum du repère
 * @param {number} OrdX0 l'ordonnée à l'origine de la droite à tracer
 * @param {number} Pente le coefficient directeur de la droite à tracer
 * @param {string} couleur la couleur de la droite à tracer
 * @param {string} nom le nom de la droite
 * @returns {string} Le code Latex à intégrer dans un environnement {tikzpicture}
 * @Auteur Jean-Claude Lhote et Rémi Angot
 */
function Latex_Tracer_droite(Xmin,Xmax,Ymin,Ymax,OrdX0,Pente,couleur,nom) {
	'use strict';
	let k=0;
	let Pente_r=Pente*(Xmax-Xmin)/(Ymax-Ymin); // Pente adaptée au ratio d'échelle des axes.
	while((k>Xmin)&((OrdX0+Pente*k)<Ymax)&((OrdX0+Pente*k)>Ymin)) k--;
	let X1=k;
	let Y1=OrdX0+Pente*k;
	let DeltaX=Xmax-Xmin;
	let DeltaY=Ymax-Ymin;
	let X2=X1+DeltaX
	let Y2=Y1+DeltaX*Pente;
	return `\n\t \\draw[color=${couleur},thick](${X1},${Y1})--(${X2},${Y2}) node[pos=.1,above] {$${nom}$};`;
}

/**
 * 
 * @param {string} mon_svg l'Identifiant du SVG
 * @param {number} Xmin l'abscisse minimum (doit être entier. Si positif, on prendra 0 comme minimum)
 * @param {number} Xmax l'abscisse maximum (doit être entier > Xmin)
 * @param {number} Ymin l'ordonnée minimum (doit être entier. Si positif, on prendra 0 comme minimum)
 * @param {number} Ymax l'ordonnée maximum (doit être entier > Ymin)
 * @param {number} subX coefficient de fractionnement de l'unité en X
 * @param {number} subY coefficient de fractionnement de l'unité en Y
 * @param {number} tailleX Nombre de pixels de largeur pour le SVG (>100 !)
 * @param {number} tailleY Nombre de pixels de hauteur pour le SVG  (>100 !)
 * @param {boolean} grille Faut-il dessiner une grille ? true si Oui false si Non.
 * @returns Les coordonnées des axes dans le SVG
 * @Auteur Jean-Claude Lhote
 */
function SVG_repere(mon_svg,Xmin,Xmax,Ymin,Ymax,subX,subY,tailleX,tailleY,grille){
'use strict';
			if(Xmin>0) Xmin=0;
			if (Ymin>0) Ymin=0;
			let DeltaX=Xmax-Xmin;
			let DeltaY=Ymax-Ymin;
			let Dx=(tailleX-20)/DeltaX;
			let Dy=(tailleY-20)/DeltaY;
			if (grille) SVG_grille(mon_svg,20,0,tailleX-20,tailleY-20,DeltaX,DeltaY,subX,subY);
			SVG_Axe_horizontal(mon_svg,20,tailleX,tailleY-20+Ymin*Dy,DeltaX,subX);
			SVG_tracer_flecheH(mon_svg,tailleX-2,tailleY-20+Ymin*Dy);
			SVG_Axe_vertical(mon_svg,0,tailleY-20,20-Xmin*Dx,DeltaY,subY);
			SVG_tracer_flecheV(mon_svg,20-Xmin*Dx,-3);
			for (let i=0;i<DeltaX;i++){
				if (i+Xmin==0) 	SVG_label(mon_svg,[[string_nombre(i+Xmin),i*Dx+15,tailleY+2+Ymin*Dy]],0,'black',0.5)	;
				else SVG_label(mon_svg,[[string_nombre(i+Xmin),i*Dx+20,tailleY+2+Ymin*Dy]],0,'black',0.5)	;
			}
			for (let i=0;i<DeltaY;i++){
				if (i+Ymin==0)	SVG_label(mon_svg,[[string_nombre(i+Ymin),10-Xmin*Dx,tailleY-15-i*Dy]],0,'black',0.5)	;	
				else SVG_label(mon_svg,[[string_nombre(i+Ymin),10-Xmin*Dx,tailleY-25-i*Dy]],1,'black',0.5)	;		
			}
			return [20-Xmin*Dx,tailleY-20+Ymin*Dy];
}
/**
 * Trace un repère en Latex avec une grille
 * @param {number} Xmin l'abscisse minimum (doit être entier. Si positif, on prendra 0 comme minimum)
 * @param {number} Xmax l'abscisse maximum (doit être entier > Xmin)
 * @param {number} Ymin l'ordonnée minimum (doit être entier. Si positif, on prendra 0 comme minimum)
 * @param {number} Ymax l'ordonnée maximum (doit être entier > Ymin)
 * @param {number} subX coefficient de fractionnement de l'unité en X
 * @param {number} subY coefficient de fractionnement de l'unité en Y
 * @param {boolean} grille Faut-il dessiner une grille ? true si Oui false si Non.
 * @returns {string} Renvoie le code Latex correspondant
 * @Auteur Jean-Claude Lhote
 */
function Latex_repere(Xmin,Xmax,Ymin,Ymax,subX,subY,grille){
	'use strict';
	let result=``;				
	result +=`\n\t \\tkzInit [xmin=${Xmin},xmax=${Xmax},xstep=1,ymin=${Ymin},ymax=${Ymax},ystep=1]`;
	if (grille) result +=`\n\t \\tkzGrid[sub,subxstep=${1/subX},subystep=${1/subY},color=lightgray,line width=0.3pt](${Xmin},${Ymin})(${Xmax},${Ymax})`;
	result +=`\n\t \\tkzAxeXY`;
	result +=`\n\t \\tkzClip[space=1]`;
		return result;
}
	
/**
* Trace une graduation sur le SVG
* @param origine la première abscisse de la droite ou demi-droite
* @param longueur le nombre d'intervalles entre l'origine et la dernière graduation
* @param pas1 le fractionnement de l'unité utilisé : 10 pour 0,1 ; 2 pour 0,5 ...
* @param pas2 Idem pas1 pour la petite graduation
* @param points_inconnus tableau tableau [Nom,nb_pas1,nb_pas2,affiche_ou_pas]
* @param points_connus tableau [valeur,nb_pas1,nb_pas2]
* @param fraction booléen : true pour fractions, false pour décimaux
* @Auteur Jean-Claude Lhote
*/
function SVG_reperage_sur_un_axe(id_du_div,origine,longueur,pas1,pas2,points_inconnus,points_connus,fraction){
	'use strict';
	let arrondir=1+Math.round(Math.log10(pas1))
	if (arrondir<1) arrondir=1;
	let longueur_pas1=600/longueur;
 	let longueur_pas2=600/longueur/pas2;
	 let distance,valeur,nom
	if (!window.SVGExist) {window.SVGExist = {}} // Si SVGExist n'existe pas on le créé
	// SVGExist est un dictionnaire dans lequel on stocke les listenner sur la création des div
	window.SVGExist[id_du_div] = setInterval(function() {
		if ($(`#${id_du_div}`).length ) {
			$(`#${id_du_div}`).html("");//Vide le div pour éviter les SVG en doublon
			const mon_svg = SVG().addTo(`#${id_du_div}`).viewbox(0, 0, 800, 150).size('100%','100%')
			// Droite 
			let droite = mon_svg.line(100, 50, 750, 50),taille,y,color,width
			droite.stroke({ color: 'black', width: 2, linecap: 'round' })
			// Graduation secondaire
			SVG_graduation(mon_svg,100,longueur_pas2,750,taille=5,y=50,color='black',width=2)
			// Graduation principale
			SVG_graduation(mon_svg,100,longueur_pas1,750,taille=10,y=50,color='black',width=5)
			SVG_tracer_flecheH(mon_svg,750,50)
			// Nombres visibles
			SVG_label(mon_svg,[[string_nombre(origine),100,50]],2,'black',1);
			for (i=0;i<points_connus.length;i++) {
				valeur=string_nombre(points_connus[i][0]);					 
				distance=calcul(longueur_pas1*points_connus[i][1]+longueur_pas2*points_connus[i][2]);
				SVG_label(mon_svg,[[valeur,100+distance,50]],2,'black',1)
			}
			//Points inconnus
			let position=1;
			for (let i=0;i<points_inconnus.length;i++){
				distance=longueur_pas1*points_inconnus[i][1]+longueur_pas2*points_inconnus[i][2]
				nom=points_inconnus[i][0]
				SVG_tracer_point(mon_svg,100+distance,50,nom,'#f15929',0,0,[false])
				if (points_inconnus[i][3]==true) {
					if (!fraction) { // affichage décimal 
						valeur=string_nombre(calcul(origine+points_inconnus[i][1]/pas1+points_inconnus[i][2]/pas1/pas2));
						SVG_label(mon_svg,[[valeur,100+distance,50]],3+position,'#f15929',1)
						SVG_tracer_droite_flecheV(mon_svg,100+distance,75+15*position,100+distance,55,'#f15929',3)
					}
					else { //affichage fractionnaire
					 SVG_fraction(mon_svg,(origine+points_inconnus[i][1])*pas2+points_inconnus[i][2],pas2,100+distance,115+15*position,'#f15929')
					 SVG_tracer_droite_flecheV(mon_svg,100+distance,80+15*position,100+distance,55,'#f15929',3)
					}
					position=1-position
				}
			}
			clearInterval(SVGExist[id_du_div]);//Arrête le timer
    		}
	}, 100); // Vérifie toutes les 100ms
}

/**
* Trace un axe gradué horizontal avec des points placés dessus en Latex
* @param origine la première abscisse de la droite ou demi-droite
* @param pas1 le fractionnement de l'unité utilisé : 10 pour 0,1 ; 2 pour 0,5 ...
* @param pas2 Idem pas1 pour la petite graduation
* @param points_inconnus tableau tableau [Nom,nb_pas1,nb_pas2,affiche_ou_pas]
* @param points_connus tableau [valeur,nb_pas1,nb_pas2]
* @param fraction booléen : true pour fraction, false pour décimaux
* @Auteur Jean-Claude Lhote
*/
function Latex_reperage_sur_un_axe(zoom,origine,pas1,pas2,points_inconnus,points_connus,fraction){
	'use strict';
	let result=`\\begin{tikzpicture}[scale=${zoom}]` ;
	 let valeur
	 let decalage
	

	result+=`\n\t \\tkzInit[xmin=${origine},xmax=${calcul(origine+7/pas1)},ymin=-0.5,ymax=0.5,xstep=${calcul(1/pas1)}]`

	if (origine==0) result +=`\n\t \\tkzDrawX[tickwd=2pt,label={}];`
	else result+=`\n\t \\tkzDrawX[left space=0.2,tickwd=2pt,label={}];`
	result+=`\n\t \\tikzset{arr/.style={postaction=decorate,	decoration={markings,mark=at position 1 with {\\arrow[thick]{#1}}}}}`

	if (origine<0) decalage=origine*pas1
	else decalage=0
	result+=`\n\t \\foreach \\x in {0,${calcul(1/pas2)},...,7}`
	result+=`\n\t {\\draw (${decalage}+\\x,-0.05)--(${decalage}+\\x,0.05);}`  	//result+=`\n\t {\\draw (${origine*pas1}+\\x,-0.05)--(${origine*pas1}+\\x,0.05);}`

	for (i=0;i<points_connus.length;i++){
		valeur=calcul(origine+points_connus[i][1]/pas1+calcul(points_connus[i][2]/pas1/pas2))
		result+=`\n\t \\tkzDefPoint(${valeur},0){A}`
		result +=`\n\t \\tkzLabelPoint[color = black,below,inner sep = 5pt,font=\\scriptsize](A){$${tex_nombrec(valeur)}$}`
	}
	//Points inconnus
	let position=6;
	for (i=0;i<points_inconnus.length;i++){
		valeur=calcul(origine+points_inconnus[i][1]/pas1+calcul(points_inconnus[i][2]/pas1/pas2))
		result+=`\n\t \\tkzDefPoint(${valeur},0){A}`
		result+=`\n\t \\tkzDefPoint(${valeur},-0.3-${position*0.02}){B}`
		result +=`\n\t \\tkzDrawPoint[shape=cross out,color=orange,size=6](A)`
		result +=`\n\t \\tkzLabelPoint[above](A){$${points_inconnus[i][0]}$}`
		if (points_inconnus[i][3]) {	
			if (!fraction) { // affichage décimal 
				result +=`\n\t \\tkzLabelPoint[color = orange,below=${15+position}pt,inner sep = 5pt,font=\\scriptsize](A){$${tex_nombrec(valeur)}$}`	
				result+=`\n\t \\tkzDrawSegment[color=orange,arr=stealth](B,A)`
			}
			else { //affichage fractionnaire
				result +=`\n\t \\tkzLabelPoint[color = orange,below=${15+position}pt,inner sep = 5pt,font=\\scriptsize](A){$${tex_fraction_signe((origine+points_inconnus[i][1])*pas2+points_inconnus[i][2],pas2)}$}`	
				result+=`\n\t \\tkzDrawSegment[color=orange,arr=stealth](B,A)`
			}
	}
		position=6-position;
	}
	result +=`\n\t \\end{tikzpicture}`;
	return result;
 
 }

/**
* Utilise pgfplots pour tracer la courbe représentative de f dans le repère avec -10 < x < 10 et -8 < y < 8
*
* @param string expression de fonction
* @author Rémi Angot
*/

function tex_graphique(f,xmin=-5,xmax=5,ymin=-5,ymax=5,xstep=1,ystep=1) {
	return `
	\\pgfplotsset{width=10cm,
			compat=1.9,
			every axis/.append style={
                    axis x line=middle,    % put the x axis in the middle
                    axis y line=middle,    % put the y axis in the middle
                    xlabel={$x$},          % default put x on x-axis
                    ylabel={$y$},          % default put y on y-axis
                    label style={font=\\tiny},
                    tick label style={font=\\tiny},
                    xlabel style={above right},
				    ylabel style={above right},
				    grid = major,
				    xtick distance=1,
				    ytick distance=1,
                    }}

	\\begin{tikzpicture}
		\\begin{axis}[
		    xmin = ${xmin}, xmax = ${xmax}, ymin = ${ymin}, ymax = ${ymax},
		]
		\\addplot [
		    ultra thick,
		    blue,
		    samples=100,
		    domain=${xmin}:${xmax},
		    ]{${f}};
		\\end{axis}
	\\end{tikzpicture}`
}

/**
 *  Classe MatriceCarree
 *  @Auteur Jean-Claude Lhote
 */
function MatriceCarree(table){
	let ligne
	this.table=[]
	if (typeof(table)=='number') {
		this.dim=table // si c'est un nombre qui est passé en argument, c'est le rang, et on rempli la table de 0
		for (let i=0;i<this.dim;i++){
			ligne=[]
			for (let j=0;j<this.dim;j++)
				ligne.push(0)
			this.table.push(ligne)
		}
	}
	else { // si l'argument est une table, on la copie dans this.table et sa longueur donne la dimension de la matrice
		this.dim=table.length
		this.table=table.slice()
	}
/**
 * Méthode : Calcule le déterminant de la matrice carrée
 * @Auteur Jean-Claude Lhote
 */
	this.determinant=function() {
		let n=this.dim // taille de la matrice = nxn
		let determinant=0,M
		for (let i=0;i<n;i++) { // on travaille sur la ligne du haut de la matrice :ligne 0 i est la colonne de 0 à n-1
		//	if (n==1) determinant=this.table[0][0]
			if (n==2)
				determinant=calcul(this.table[0][0]*this.table[1][1]-this.table[1][0]*this.table[0][1])
			else {
				M=this.matrice_reduite(0,i)
				determinant+=calcul(((-1)**i)*this.table[0][i]*M.determinant())
			}
		}
		return determinant
	}
/**
 * Méthode : m=M.matrice_reduite(l,c) retourne une nouvelle matrice obtenue à partir de la matrice M (carrée) en enlevant la ligne l et la colonne c
 * (Utilisée dans le calcul du déterminant d'une matrice carrée.)
 * @Auteur Jean-Claude Lhote
 */
	this.matrice_reduite=function(l,c){
		let  resultat=[],ligne
		for (let i=0;i<this.table.length;i++) {
			if (i!=l) {
				ligne=[]
				for (let j=0;j<this.table.length;j++){
					if (j!=c) ligne.push(this.table[i][j])
				}
				if (ligne.length>0) resultat.push(ligne)
			}
		}
		return matriceCarree(resultat)
	}
	this.cofacteurs = function () { // renvoie la matrice des cofacteurs. 
		let n = this.dim, resultat = [], ligne, M
		if (n > 2) {
			for (let i = 0; i < n; i++) {
				ligne = []
				for (let j = 0; j < n; j++) {
					M = this.matrice_reduite(i, j)
					ligne.push(calcul((-1) ** (i + j) * M.determinant()))
				}
				resultat.push(ligne)
			}
		}
		else if (n==2) {
			resultat=[[this.table[1][1],-this.table[1][0]],[-this.table[0][1],this.table[0][0]]]
		}
		else return false
		return matriceCarree(resultat)
	}
	this.transposee=function() { // retourne la matrice transposée
		let n=this.dim,resultat=[],ligne
		for (let i=0;i<n;i++) {
			ligne=[]
			for (let j=0;j<n;j++) {
				ligne.push(this.table[j][i])
			}
			resultat.push(ligne)
		}
		return matriceCarree(resultat)
	}
	this.multiplieParReel=function(k){ // retourne k * la matrice
		let n=this.dim,resultat=[],ligne
		for (let i=0;i<n;i++) {
			ligne=[]
			for (let j=0;j<n;j++) {
				ligne.push(calcul(k*this.table[i][j]))
			}
			resultat.push(ligne)
		}
		return matriceCarree(resultat)
	}
	this.multiplieVecteur = function (V) { // Vecteur est un simple array pour l'instant
		let n = this.dim, resultat=[], somme
		if (n == V.length) {
			for (let i = 0; i < n; i++) {
				somme = 0
				for (let j = 0; j < n; j++) {
					somme += calcul(this.table[i][j] * V[j])
				}
				resultat.push(somme)
			}
			return resultat
		}
		else return false
	}
	this.inverse=function() { // retourne la matrice inverse (si elle existe)
		let n=this.dim,resultat=[],ligne
		let d=this.determinant()
		if (!egal(d,0)) {
			return this.cofacteurs().transposee().multiplieParReel(calcul(1/d))
		}
		else return false
	}
	this.multiplieMatriceCarree=function(M){
		let n=this.dim,resultat=[],ligne,somme
		for (let i=0;i<n;i++) {
			ligne=[]
			for (let j=0;j<n;j++) {
				somme=0
				for (let k=0;k<n;k++) somme+=calcul(this.table[i][k]*M.table[k][j])
				ligne.push(somme)
			}
			resultat.push(ligne)
		}
		return matriceCarree(resultat)
	}
}

function matriceCarree(table){
	return new MatriceCarree(table)
}

// Fin de la classe MAtriceCarree

/**
 * Fonction qui retourne les coefficients a et b de f(x)=ax²+bx+c à partir des données de x1,x2,f(x1),f(x2) et c.
 * 
 * @Auteur Jean-Claude Lhote
 */
function resol_sys_lineaire_2x2(x1,x2,fx1,fx2,c) {
	let matrice=matriceCarree([[x1**2,x1],[x2**2,x2]])
	let determinant=matrice.determinant();
	let [a,b]=matrice.cofacteurs().transposee().multiplieVecteur([fx1-c,fx2-c])
	if (Number.isInteger(a)&&Number.isInteger(b)&&Number.isInteger(determinant)){
	let fa=fraction(a,determinant), fb=fraction(b,determinant)
	return [[fa.numIrred,fa.denIrred],[fb.numIrred,fb.denIrred]];
	}
	else return [[calcul(a/determinant),1],[calcul(b/determinant),1]]
}
/**
 * Fonction qui retourne les coefficients a, b et c de f(x)=ax^3 + bx² + cx + d à partir des données de x1,x2,x3,f(x1),f(x2),f(x3) et d (entiers !)
 * sous forme de fraction irréductible. Si pas de solution (déterminant nul) alors retourne [[0,0],[0,0],[0,0]]
 * @Auteur Jean-Claude Lhote
 */

function resol_sys_lineaire_3x3(x1,x2,x3,fx1,fx2,fx3,d) {
	let matrice=matriceCarree([[x1**3,x1**2,x1],[x2**3,x2**2,x2],[x3**3,x3**2,x3]]) 
	let y1=fx1-d, y2=fx2-d, y3=fx3-d;
	let determinant=matrice.determinant()
	if (determinant==0) return [[0,0],[0,0],[0,0]];
	else {
		let [a,b,c]=matrice.cofacteurs().transposee().multiplieVecteur([y1,y2,y3])
		if (Number.isInteger(a)&&Number.isInteger(b)&&Number.isInteger(c)&&Number.isInteger(determinant)){ // ici on retourne un tableau de couples [num,den] entiers !
			let fa=fraction(a,determinant), fb=fraction(b,determinant), fc=fraction(c,determinant)
			return [[fa.numIrred,fa.denIrred],[fb.numIrred,fb.denIrred],[fc.numIrred,fc.denIrred]];
		} // pour l'instant on ne manipule que des entiers, mais on peut imaginer que ce ne soit pas le cas... dans ce cas, la forme est numérateur = nombre & dénominateur=1
		else return [[calcul(a/determinant),1],[calcul(b/determinant),1],[calcul(b/determinant),1]]
	}
}
/**
 * Fonction qui cherche une fonction polynomiale de degré 3 dont les coefficients a, b et c de f(x)=ax^3 + bx² + cx + d
 * sont des fractions dont le dénominateur est inférieur à 10 et pour laquelle l'image de 3 entiers compris entre -10 et 10 
 * sont des entiers compris eux aussi entre -10 et 10
 * @Auteur Jean-Claude Lhote
 */
function crible_polynome_entier() {
let trouve =false
let coefs=[[]]
for (let i=0,x1,x2,x3,fx1,fx2,fx3,d;;i++) {
	x1=randint(-10,10);
	x2=randint(-10,10,[x1]);
	x3=randint(-10,10,[x1,x2]);
	fx1=randint(-10,10);
	fx2=randint(-10,10);
	fx3=randint(-10,10);
	d=randint(0,10);
	coefs=resol_sys_lineaire_3x3(x1,x2,x3,fx1,fx2,fx3,d);
	if (coefs[0][1]!=0&&coefs[0][1]<10&&coefs[1][1]<10&&coefs[2][1]<10) trouve=true;
	if(trouve) {
		coefs.push([x1,fx1])
		coefs.push([x2,fx2])
		coefs.push([x3,fx3])
		break;
	}
}
if (trouve) return coefs;
}
/**
 * Fonction qui cherche les minimas et maximas d'une fonction polynomiale f(x)=ax^3 + bx² + cx + d
 * retourne [] si il n'y en a pas, sinon retourne [[x1,f(x1)],[x2,f(x2)] ne précise pas si il s'agit d'un minima ou d'un maxima.
 * @Auteur Jean-Claude Lhote
 */
function cherche_min_max_f ([a,b,c,d]) { 
	let delta=4*b*b-12*a*c
	if (delta<=0) return [];
	let x1=(-2*b-Math.sqrt(delta))/(6*a)
	let x2=(-2*b+Math.sqrt(delta))/(6*a)
	return  [[x1,a*x1**3+b*x1**2+c*x1+d],[x2,a*x2**3+b*x2**2+c*x2+d]]
}
/**
 * retourne les coefficients d'un polynome de degré 3 dont la dérivée s'annule en  x1 et x2 et tel que f(x1)=y1 et f(x2)=y2.
 * @Auteur Jean-Claude Lhote
 */
function cherche_polynome_deg3_a_extrema_fixes(x1,x2,y1,y2) {
	let M=matriceCarree([[x1**3,x1**2,x1,1],[x2**3,x2**2,x2,1],[3*x1**2,2*x1,1,0],[3*x2**2,2*x2,1,0]])
	let R=[y1,y2,0,0]
	if (!egal(M.determinant(),0)) return M.inverse().multiplieVecteur(R)
	else return false
}
// fonction devenue inutile : à remplacer par cherche_polynome_deg3_a_extrema_fixes(x1,x2,y1,y2) qui produit un résultat exact, sans mouliner !
/*
function cherche_polynome_deg3_a_extrema_entiers(x1,x2,y1,y2) { // je voulais ajouter "ou presque" dans le nom de fonction, mais ça faisait trop long !
	let resultat=[],trouve=false
	for (let a=-1;a<1;a+=0.00005) {
		resultat=cherche_polynome_deg3_a_extrema_fixes(x1,x2,y1,a)
		if (egal(resultat[4],y1)) 
			if (egal(resultat[5],y2,0.001)) {
				trouve=true
				resultat.push('trouvé')
				return resultat
			}
		else if (egal(resultat[4],y2,0.001)) {
			trouve=true
			resultat.push('trouvé')
			return resultat
		}
	}
	if (!trouve) return 'Pas trouvé'
}
*/

/**
 * Fonction pour simplifier l'ecriture lorsque l'exposant vaut 0 ou 1
 * retourne 1, la base ou rien
 * @param b base
 * @param e exposant 
 * @author Sébastien Lozano
 */	
function simpExp(b,e) {
	switch (e) {
		case 1 : 
			return ` ${b}`;
			break;
		case 0 : 
			return ` 1`;
			break;
		default : 
			return ` `;
	};
};

/**
 * Fonction pour simplifier les notations puissance dans certains cas
 * si la base vaut 1 ou -1 quelque soit l'exposant, retourne 1 ou -1,
 * si la base est négative on teste la parité de l'exposant pour alléger la notation sans le signe
 * si l'exposant vaut 0 ou 1 retourne 1, la base ou rien
 * @param b base
 * @param e exposant 
 * @author Sébastien Lozano
 */	
function simpNotPuissance(b,e) {
	switch (b) {
		case -1 : 
			if (e%2==0) {
				return ` 1`;
				break;
			} else {
				return ` -1`;
				break;
			};
		case 1 : 
			return ` 1`;
			break;
		default : 
			switch (e) {
				case 0 :
					return `1`;
					break;
				case 1 :
					return ` ${b}`;
					break;
				default :
					if (b<0 && e%2==0) {
						return ` ${b*-1}^{${e}}`;
						break;
					} else {
						//return ` ${b}^{${e}}`;
						return ` `;
						break;
					};
			};
	};
};


/**
 * Fonction pour écrire en couleur la forme éclatée d'une puissance
 * @param b base
 * @param e exposant 
 * @param couleur
 * @author Sébastien Lozano
 */		
function eclatePuissance(b,e,couleur) {
	switch (e) {
		case 0 :
			return `\\mathbf{\\color{${couleur}}{1}}`;
			break;
		case 1 : 
			return `\\mathbf{\\color{${couleur}}{${b}}}`;
			break;
		default :
			let str = `\\mathbf{\\color{${couleur}}{${b}}} `;
			for (let i=1; i<e;i++) {
				str = str + `\\times \\mathbf{\\color{${couleur}}{${b}}}`;
			 }
			return str;
	}
};

/**
 * Fonction pour écrire avec deux couleurs la forme éclatée d'un produit de puissances de même exposant
 * @param b1 base1
 * @param b2 base2
 * @param e exposant 
 * @param couleur1
 * @param couleur2
 * @Auteur Sébastien Lozano
 */	
function reorganiseProduitPuissance(b1,b2,e,couleur1,couleur2) {
	switch (e) {
		case 0 :
			return `1`;
			break;
		case 1 : 
			return `\\mathbf{\\color{${couleur1}}{${b1}}} \\times \\mathbf{\\color{${couleur2}}{${b2}}}`;
			break;
		default :
			let str = `\\mathbf{(\\color{${couleur1}}{${b1}}} \\times \\mathbf{\\color{${couleur2}}{${b2}}}) `;
			for (let i=1; i<e;i++) {
				str = str + `\\times (\\mathbf{\\color{${couleur1}}{${b1}}} \\times \\mathbf{\\color{${couleur2}}{${b2}}})`;
			 }
			return str;
	}

}

/**
* Fonction créant le bouton d'aide utilisée par les différentes fonctions modal_ type de contenu
* @param numero_de_l_exercice
* @param contenu code HTML 
* @param icone 
* @Auteur Rémi Angot
*/	
function creer_modal(numero_de_l_exercice,contenu,label_bouton,icone) {
	let HTML = `<button class="ui right floated mini compact button" onclick="$('#modal${numero_de_l_exercice}').modal('show');"><i class="large ${icone} icon"></i>${label_bouton}</button>
		<div class="ui modal" id="modal${numero_de_l_exercice}">
		${contenu}
		</div>`
	return HTML;
}

/**
* Créé un bouton pour une aide modale avec un texte court
* @param numero_de_l_exercice
* @param texte Texte court qui sera affiché comme un titre 
* @param label_bouton Titre du bouton (par défaut Aide)
* @param icone Nom de l'icone (par défaut c'est info circle icon), liste complète sur https://semantic-ui.com/elements/icon.html
* @Auteur Rémi Angot
*/	
function modal_texte_court(numero_de_l_exercice,texte,label_bouton="Aide",icone="info circle"){
	let contenu = `<div class="header">${texte}</div>`
	return creer_modal(numero_de_l_exercice,contenu,label_bouton,icone)
}



/**
* Créé un bouton pour une aide modale avec un texte et une vidéo YouTube
* @param numero_de_l_exercice
* @param id_youtube
* @param texte Texte court qui sera affiché comme un titre 
* @param label_bouton Titre du bouton (par défaut Aide)
* @param icone Nom de l'icone (par défaut c'est youtube icon), liste complète sur https://semantic-ui.com/elements/icon.html
* @Auteur Rémi Angot
*/	
function modal_youtube(numero_de_l_exercice,id_youtube,texte,label_bouton="Aide - Vidéo",icone="youtube"){
	let contenu = `<div class="header">${texte}</div><div class="content"><p align="center"><iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${id_youtube}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p></div>`
	return creer_modal(numero_de_l_exercice,contenu,label_bouton,icone)
}

/**
* Créé un bouton pour une aide modale avec un titre et un texte
* @param numero_de_l_exercice
* @param titre
* @param texte
* @param label_bouton Titre du bouton (par défaut Aide)
* @param icone Nom de l'icone (par défaut c'est info circle icon), liste complète sur https://semantic-ui.com/elements/icon.html
* @Auteur Rémi Angot
*/	
function modal_texte_long(numero_de_l_exercice,titre,texte,label_bouton="Aide",icone="info circle"){
	let contenu = `<div class="header">${titre}</div>`
	contenu += `<div class="content">${texte}</div>`
	return creer_modal(numero_de_l_exercice,contenu,label_bouton,icone)
}

/**
* Créé un bouton pour une aide modale avec un titre et un texte
* @param numero_de_l_exercice
* @param titre
* @param texte
* @param label_bouton Titre du bouton (par défaut Aide)
* @param icone Nom de l'icone (par défaut c'est info circle icon), liste complète sur https://semantic-ui.com/elements/icon.html
* @Auteur Rémi Angot
*/	
function modal_url(numero_de_l_exercice,url,label_bouton="Aide",icone="info circle"){
	let contenu = `<iframe width="100%" height="600"  src="${url}" frameborder="0" ></iframe>`
	return creer_modal(numero_de_l_exercice,contenu,label_bouton,icone)
}

/**
* Créé un bouton pour une aide modale avec un texte et une vidéo YouTube
* @param numero_de_l_exercice
* @param url_pdf
* @param texte Texte court qui sera affiché comme un titre 
* @param label_bouton Titre du bouton (par défaut Aide)
* @param icone Nom de l'icone (par défaut c'est file pdf icon), liste complète sur https://semantic-ui.com/elements/icon.html
* @Auteur Rémi Angot
*/	
function modal_pdf(numero_de_l_exercice,url_pdf,texte="Aide",label_bouton="Aide - PDF",icone="file pdf"){
	let contenu = `<div class="header">${texte}</div><div class="content"><p align="center"><embed src=${url_pdf} width=90% height=500 type='application/pdf'/></p></div>`
	return creer_modal(numero_de_l_exercice,contenu,label_bouton,icone)
}

/**
 * Créé un bouton pour une aide modale avec une vidéo
 * @param id_du_modal désigne l'id du modal qui doit être unique
 * @param url_video
 * @param texte Texte court qui sera affiché comme un titre 
 * @param label_bouton Titre du bouton (par défaut Vidéo)
 * @param icone Nom de l'icone (par défaut c'est file video outline icon), liste complète sur https://semantic-ui.com/elements/icon.html
 * @Auteur Sébastien Lozano
 */	
function modal_video(id_du_modal,url_video,texte,label_bouton="Vidéo",icone="file video outline"){
	//let contenu = `<div class="header">${texte}</div><div class="content"><p align="center"><iframe width="560" height="315" src="${url_video}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p></div>`
	let contenu = `
	<div class="header">${texte}</div>
	<div class="content">
		<div class="embed-responsive embed-responsive-16by9" align="center">
			<video width="560" height="315" controls  preload="none" style="max-width: 100%">
				<source src="`+url_video+`">
				Votre navigateur ne gère pas l\'élément <code>video</code>.
			</video>
  		</div>
	</div>`
	return creer_modal(id_du_modal,contenu,label_bouton,icone)
};
/**
 * 
 * @param {number} numero_de_l_exercice 
 * @param {string} url_image 
 * @param {string} texte = ce qui est écrit sur le bouton à côté de l'icône d'image.
 * @param {string} label_bouton = ce qui est écrit en titre de l'image 
 * @param {string} icone 
 */
function modal_image(numero_de_l_exercice,url_image,texte,label_bouton="Illustration",icone="image"){
	let contenu = `<div class="header">${texte}</div><div class="image content"><img class="ui centered medium image" src="${url_image}"></div>`
	return creer_modal(numero_de_l_exercice,contenu,label_bouton,icone)
}

/**
 * Renvoie un tableau contenant les diviseurs d'un nombre entier, rangés dans l'ordre croissant  
 * @param {integer} n 
 * @Auteur Sébastien Lozano
 */
function liste_diviseurs(n) {
	'use strict';
	let i = 2;
	let diviseurs = [1];
	while ( i<= n) {
		if (n % i == 0) {
			diviseurs.push(i);
		};
		i++;
	};
	return diviseurs;
};

//=================================================
// fonctions de 3F1-act
//=================================================

  /**
 * Crée une machine mathématique Tikz pour la version LaTeX
 * @param {string} nom nom de la machine en mode maths!
 * @param {string} etape1 chaine en mode maths attention aux espaces et accents
 * @param {string} etape2 chaine en mode maths attention aux espaces et accents
 * @param {string} etape3 chaine en mode maths attention aux espaces et accents
 * @param {string} x_ligne1 chaine en mode maths attention aux espaces et accents
 * @param {string} x_ligne2 chaine en mode maths attention aux espaces et accents
 * @param {string} y_ligne1 chaine en mode maths attention aux espaces et accents
 * @param {string} y_ligne2 chaine en mode maths attention aux espaces et accents
 * @author Sébastien Lozano
 */

function tikz_machine_maths(nom,etape1,etape2,etape3,x_ligne1,x_ligne2,y_ligne1,y_ligne2) {
	// tous les textes sont en mode maths !!!
	'use strict';
	return `
	\\definecolor{frvzsz}{rgb}{0.9450980392156862,0.34901960784313724,0.1607843137254902}
	\\begin{tikzpicture}[line cap=round,line join=round,>=triangle 45,x=1cm,y=1cm]
	\\draw [line width=3pt,color=frvzsz] (-4,4)-- (2,4);
	\\draw [line width=3pt,color=frvzsz] (2,4)-- (2,0);
	\\draw [line width=3pt,color=frvzsz] (2,0)-- (-4,0);
	\\draw [line width=3pt,color=frvzsz] (-4,0)-- (-4,4);
	\\draw [line width=3pt,color=frvzsz] (-4,2)-- (-5,2);
	\\draw [line width=3pt,color=frvzsz] (-5,2.4)-- (-5,1.6);
	\\draw [->,line width=3pt,color=frvzsz] (2,2) -- (3,2);
	\\node[text width=3cm,text centered, scale=1.8] at(-1,3.5){$\\mathbf{machine\\,${nom}}$};
	\\node[text width=3cm,text centered, scale=1.5] at(-1,2.8){$\\mathbf{${etape1}}$};
	\\node[text width=3cm,text centered, scale=1.5] at(-1,2.3){$${etape2}$};
	\\node[text width=3cm,text centered, scale=1.5] at(-1,1.6){$${etape3}$};
	\\node[text width=3cm,text centered, scale=1.5] at(-8,2.5) {$\\mathbf{${x_ligne1}}$};
	\\node[text width=3cm,text centered, scale=1.5] at(-8,1.5) {$\\mathbf{${x_ligne2}}$};
	\\fill [line width=3pt,color=frvzsz] (-6,2) -- (-6.5,1) -- (-5.5,2) -- (-6.5,3) -- cycle;
	%\\fill [line width=3pt,color=frvzsz] (1,2) -- (0.5,1) -- (1.5,2) -- (0.5,3) -- cycle;
	\\node[text width=3cm,text centered, scale=1.5] at(5.5,2.5) {$\\mathbf{${y_ligne1}}$};
	\\node[text width=3cm,text centered, scale=1.5] at(5.5,1.5) {$\\mathbf{${y_ligne2}}$};
	\\fill [line width=3pt,color=frvzsz] (3.5,2) -- (3,1) -- (4,2) -- (3,3) -- cycle;
	\\end{tikzpicture}	
	`;
};

/**
 * Crée un diagramme tikz pour une machine maths
 * @param {string} nom nom de la fonction 
 * @param {string} x_ant nom du nombre de départ
 * @param {array} etapes_expressions tableau contenant les etapes et le expressions algébriques
 * attention mode maths pour les chaines
 * @author Sébastien Lozano
 */
function tikz_machine_diag(nom,x_ant,etapes_expressions){
	'use strict';
	var x_init = -10;
	var saut = 0;
	var pas = 1;
	var sortie = ``;
	sortie +=`
	\\definecolor{frvzsz}{rgb}{0.9450980392156862,0.34901960784313724,0.1607843137254902}
	\\begin{tikzpicture}[line cap=round,line join=round,>=triangle 45,x=1cm,y=1cm]
	\\draw [line width=3pt,color=frvzsz] (`+x_init+`,0.5) -- (`+(x_init+pas)+`,0.5) -- (`+(x_init+pas)+`,-0.5) -- (`+x_init+`,-0.5) -- cycle;
	\\node[text width=3cm,text centered, scale=1] at(`+(x_init+0.5)+`,0){$${x_ant}$};
	`;	
	saut = saut + pas;
	for (var i = 0; i<etapes_expressions.length; i++) {
		//si la longueur du tableau des etapes vaut i+1 c'est que c'est la derniere 
		//on affiche donc chaque fois avec le nom de la fonction
		if (etapes_expressions.length==i+1) {
			// si il y a une operation et une expression algébrique
			if (typeof etapes_expressions[i][0]!=='undefined' && typeof etapes_expressions[i][1]!=='undefined') {				
				let w_etape = `${nom}(x)=${etapes_expressions[i][1]}}`.length;
				sortie += `
				\\draw [line width=3pt,color=frvzsz] (`+(x_init+saut)+`,0) -- (`+(x_init+saut+pas/2)+`,0);
				\\draw [line width=3pt,color=frvzsz] (`+(x_init+saut+pas)+`,0) circle(0.5);
				\\node [text width=3cm,text centered, scale=1] at(`+(x_init+saut+pas)+`,0){$${etapes_expressions[i][0]}$};
				\\draw [->,line width=3pt,color=frvzsz] (`+(x_init+saut+3*pas/2)+`,0) -- (`+(x_init+saut+5*pas/2)+`,0);
				\\draw [line width=3pt,color=frvzsz] (`+(x_init+saut+5*pas/2)+`,0.5) -- (`+(x_init+saut+w_etape/4+6*pas/2)+`,0.5) -- (`+(x_init+saut+w_etape/4+6*pas/2)+`,-0.5) -- (`+(x_init+saut+5*pas/2)+`,-0.5) -- cycle;
				\\node [text width=3cm,text centered, scale=1] at(`+(x_init+saut+w_etape/8+5.5*pas/2)+`,0){$${nom}(`+x_ant+`)=${etapes_expressions[i][1]}$};
				`;			
			};
			// si il y a une operation et pas d'expression algébrique 
			if (typeof etapes_expressions[i][0]!=='undefined' && typeof etapes_expressions[i][1]=='undefined') {
				let w_etape = `${nom}(x)=\\ldots`.length;
				sortie += `
				\\draw [line width=3pt,color=frvzsz] (`+(x_init+saut)+`,0) -- (`+(x_init+saut+pas/2)+`,0);
				\\draw [line width=3pt,color=frvzsz] (`+(x_init+saut+pas)+`,0) circle(`+(pas/2)+`);
				\\node [text width=3cm,text centered, scale=1] at(`+(x_init+saut+pas)+`,0){$${etapes_expressions[i][0]}$};
				\\draw [->,line width=3pt,color=frvzsz] (`+(x_init+saut+3*pas/2)+`,0) -- (`+(x_init+saut+5*pas/2)+`,0);
				\\draw [line width=3pt,color=frvzsz] (`+(x_init+saut+5*pas/2)+`,`+(pas/2)+`) -- (`+(x_init+saut+w_etape/4+6*pas/2)+`,`+(pas/2)+`) -- (`+(x_init+saut+w_etape/4+6*pas/2)+`,-`+(pas/2)+`) -- (`+(x_init+saut+5*pas/2)+`,-`+(pas/2)+`) -- cycle;
				\\node [text width=3cm,text centered, scale=1] at(`+(x_init+saut+w_etape/8+5.5*pas/2)+`,0){$${nom}(`+x_ant+`)=\\ldots$};
				`;			
			};
			// si il n'y a pas d'operation mais une expression algébrique
			if (typeof etapes_expressions[i][0]=='undefined' && typeof etapes_expressions[i][1]!=='undefined') {
				let w_etape = `${nom}(x)=${etapes_expressions[i][1]}`.length;
				sortie += `
				\\draw [line width=3pt,color=frvzsz] (`+(x_init+saut)+`,0) -- (`+(x_init+saut+pas/2)+`,0);
				\\draw [line width=3pt,color=frvzsz] (`+(x_init+saut+pas)+`,0) circle(`+(pas/2)+`);
				\\node [text width=3cm,text centered, scale=1] at(`+(x_init+saut+pas)+`,0){$\\ldots$};
				\\draw [->,line width=3pt,color=frvzsz] (`+(x_init+saut+3*pas/2)+`,0) -- (`+(x_init+saut+5*pas/2)+`,0);
				\\draw [line width=3pt,color=frvzsz] (`+(x_init+saut+5*pas/2)+`,`+(pas/2)+`) -- (`+(x_init+saut+w_etape/4+6*pas/2)+`,`+(pas/2)+`) -- (`+(x_init+saut+w_etape/4+6*pas/2)+`,-`+(pas/2)+`) -- (`+(x_init+saut+5*pas/2)+`,-`+(pas/2)+`) -- cycle;
				\\node [text width=3cm,text centered, scale=1] at(`+(x_init+saut+w_etape/8+5.5*pas/2)+`,0){$${nom}(`+x_ant+`)=${etapes_expressions[i][1]}$};
				`;			
			};
			// si il n'y ni une operation et ni expression algébrique
			if (typeof etapes_expressions[i][0]=='undefined' && typeof etapes_expressions[i][1]=='undefined') {
				let w_etape = `${nom}(x)=\\ldots`.length;
				sortie += `
				\\draw [line width=3pt,color=frvzsz] (`+(x_init+saut)+`,0) -- (`+(x_init+saut+pas/2)+`,0);
				\\draw [line width=3pt,color=frvzsz] (`+(x_init+saut+pas)+`,0) circle(`+(pas/2)+`);
				\\node [text width=3cm,text centered, scale=1] at(`+(x_init+saut+pas)+`,0){$\\ldots$};
				\\draw [->,line width=3pt,color=frvzsz] (`+(x_init+saut+3*pas/2)+`,0) -- (`+(x_init+saut+5*pas/2)+`,0);
				\\draw [line width=3pt,color=frvzsz] (`+(x_init+saut+5*pas/2)+`,`+(pas/2)+`) -- (`+(x_init+saut+w_etape/4+6*pas/2)+`,`+(pas/2)+`) -- (`+(x_init+saut+w_etape/4+6*pas/2)+`,-`+(pas/2)+`) -- (`+(x_init+saut+5*pas/2)+`,-`+(pas/2)+`) -- cycle;
				\\node [text width=3cm,text centered, scale=1] at(`+(x_init+saut+w_etape/8+5.5*pas/2)+`,0){$${nom}(`+x_ant+`)=\\ldots$};
				`;			
			};

		} else {//sinon c'est une étape intermédiaire
			// si il y a une operation et une expression algébrique
			if (typeof etapes_expressions[i][0]!=='undefined' && typeof etapes_expressions[i][1]!=='undefined') {
				let w_etape = `${etapes_expressions[i][1]}`.length;
				sortie += `
				\\draw [line width=3pt,color=frvzsz] (`+(x_init+saut)+`,0) -- (`+(x_init+saut+pas/2)+`,0);
				\\draw [line width=3pt,color=frvzsz] (`+(x_init+saut+pas)+`,0) circle(`+(pas/2)+`);
				\\node [text width=3cm,text centered, scale=1] at(`+(x_init+saut+pas)+`,0){$${etapes_expressions[i][0]}$};
				\\draw [->,line width=3pt,color=frvzsz] (`+(x_init+saut+3*pas/2)+`,0) -- (`+(x_init+saut+5*pas/2)+`,0);
				\\draw [line width=3pt,color=frvzsz] (`+(x_init+saut+5*pas/2)+`,`+(pas/2)+`) -- (`+(x_init+saut+w_etape/4+6*pas/2)+`,`+(pas/2)+`) -- (`+(x_init+saut+w_etape/4+6*pas/2)+`,-`+(pas/2)+`) -- (`+(x_init+saut+5*pas/2)+`,-`+(pas/2)+`) -- cycle;
				\\node [text width=3cm,text centered, scale=1] at(`+(x_init+saut+w_etape/8+5.5*pas/2)+`,0){$${etapes_expressions[i][1]}$};
				`;	
				saut = saut+3*pas+w_etape/4;						
			};
			// si il y a une operation et pas d'expression algébrique 
			if (typeof etapes_expressions[i][0]!=='undefined' && typeof etapes_expressions[i][1]=='undefined') {
				let w_etape = `\\ldots`.length;
				sortie += `
				\\draw [line width=3pt,color=frvzsz] (`+(x_init+saut)+`,0) -- (`+(x_init+saut+pas/2)+`,0);
				\\draw [line width=3pt,color=frvzsz] (`+(x_init+saut+pas)+`,0) circle(`+(pas/2)+`);
				\\node [text width=3cm,text centered, scale=1] at(`+(x_init+saut+pas)+`,0){$${etapes_expressions[i][0]}$};
				\\draw [->,line width=3pt,color=frvzsz] (`+(x_init+saut+3*pas/2)+`,0) -- (`+(x_init+saut+5*pas/2)+`,0);
				\\draw [line width=3pt,color=frvzsz] (`+(x_init+saut+5*pas/2)+`,`+(pas/2)+`) -- (`+(x_init+saut+w_etape/4+6*pas/2)+`,`+(pas/2)+`) -- (`+(x_init+saut+w_etape/4+6*pas/2)+`,-`+(pas/2)+`) -- (`+(x_init+saut+5*pas/2)+`,-`+(pas/2)+`) -- cycle;
				\\node [text width=3cm,text centered, scale=1] at(`+(x_init+saut+w_etape/8+5.5*pas/2)+`,0){$\\ldots$};
				`;	
				saut = saut+3*pas+w_etape/4;		
			};
			// si il n'y a pas d'operation mais une expression algébrique
			if (typeof etapes_expressions[i][0]=='undefined' && typeof etapes_expressions[i][1]!=='undefined') {
				let w_etape = `${etapes_expressions[i][1]}`.length;
				sortie += `
				\\draw [line width=3pt,color=frvzsz] (`+(x_init+saut)+`,0) -- (`+(x_init+saut+pas/2)+`,0);
				\\draw [line width=3pt,color=frvzsz] (`+(x_init+saut+pas)+`,0) circle(`+(pas/2)+`);
				\\node [text width=3cm,text centered, scale=1] at(`+(x_init+saut+pas)+`,0){$\\ldots$};
				\\draw [->,line width=3pt,color=frvzsz] (`+(x_init+saut+3*pas/2)+`,0) -- (`+(x_init+saut+5*pas/2)+`,0);
				\\draw [line width=3pt,color=frvzsz] (`+(x_init+saut+5*pas/2)+`,`+(pas/2)+`) -- (`+(x_init+saut+w_etape/4+6*pas/2)+`,`+(pas/2)+`) -- (`+(x_init+saut+w_etape/4+6*pas/2)+`,-`+(pas/2)+`) -- (`+(x_init+saut+5*pas/2)+`,-`+(pas/2)+`) -- cycle;
				\\node [text width=3cm,text centered, scale=1] at(`+(x_init+saut+w_etape/8+5.5*pas/2)+`,0){$${etapes_expressions[i][1]}$};
				`;	
				saut = saut+3*pas+w_etape/4;		
			};
			// si il n'y ni une operation et ni expression algébrique
			if (typeof etapes_expressions[i][0]=='undefined' && typeof etapes_expressions[i][1]=='undefined') {
				let w_etape = `\\ldots`.length;
				sortie += `
				\\draw [line width=3pt,color=frvzsz] (`+(x_init+saut)+`,0) -- (`+(x_init+saut+pas/2)+`,0);
				\\draw [line width=3pt,color=frvzsz] (`+(x_init+saut+pas)+`,0) circle(`+(pas/2)+`);
				\\node [text width=3cm,text centered, scale=1] at(`+(x_init+saut+pas)+`,0){$\\ldots$};
				\\draw [->,line width=3pt,color=frvzsz] (`+(x_init+saut+3*pas/2)+`,0) -- (`+(x_init+saut+5*pas/2)+`,0);
				\\draw [line width=3pt,color=frvzsz] (`+(x_init+saut+5*pas/2)+`,`+(pas/2)+`) -- (`+(x_init+saut+w_etape/4+6*pas/2)+`,`+(pas/2)+`) -- (`+(x_init+saut+w_etape/4+6*pas/2)+`,-`+(pas/2)+`) -- (`+(x_init+saut+5*pas/2)+`,-`+(pas/2)+`) -- cycle;
				\\node [text width=3cm,text centered, scale=1] at(`+(x_init+saut+w_etape/8+5.5*pas/2)+`,0){$\\ldots$};
				`;	
				saut = saut+3*pas+w_etape/4;		
			};
		 };				
	};		 
	sortie +=`
	\\end{tikzpicture}
	`;
	return sortie;
};

/**
 * Crée un popup html avec un icon info, éventuellement avec du contenu LaTeX
 * @param {string} texte 
 * @param {string} titrePopup 
 * @param {string} textePopup 
 * @Auteur Sébastien Lozano
 */
function katex_Popup(texte,titrePopup,textePopup) {
	'use strict';
	let contenu=``
	if (sortie_html){
		contenu =`<div class="mini ui right labeled icon button katexPopup"><i class="info circle icon"></i> `+texte+`</div>`;
	contenu += `<div class="ui special popup" >`;
	if (titrePopup!='') {
		contenu += `<div class="header">`+titrePopup+`</div>`;
	};
	contenu += `<div>`+textePopup+`</div>`;
	contenu += `</div>`;
	return contenu;
	} else {
		return `\\textbf{${texte}} \\footnote{\\textbf{${titrePopup}} ${textePopup}}`
	}
};
function katex_Popuptest(texte,titrePopup,textePopup) {
	'use strict';
	let contenu=``
	if (sortie_html){
		contenu =`<div class="ui right label katexPopup">`+texte+`</div>`;
	contenu += `<div class="ui special popup" >`;
	if (titrePopup!='') {
		contenu += `<div class="header">`+titrePopup+`</div>`;
	};
	contenu += `<div>`+textePopup+`</div>`;
	contenu += `</div>`;
	return contenu;
	} else {
		return `\\textbf{${texte}} \\footnote{\\textbf{${titrePopup}} ${textePopup}}`
	}
};
 /**
  * Ecrit un string sans accents
  * @param {string} str
  * @author Sébastien Lozano 
  * source --> http://www.finalclap.com/faq/257-javascript-supprimer-remplacer-accent
  */
function sansAccent(str){
	'use strict';
    var accent = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];
    var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
     
    //var str = this;
    for(var i = 0; i < accent.length; i++){
        str = str.replace(accent[i], noaccent[i]);
    }
     
    return str;
};

/**
* Crée un popup html avec une icône info ou un bouton modal suivant le type donné :0=Latex inline compatible, 1=bouton modal texte long, 2=bouton modal image.
* ATTENTION la variable texte doit exactement correspondre au nom de l'image sans l'extension  et etre au format png
* @param {number} numero
* @param {number} type 
* @param {string} titrePopup = Le titre du texte dévoilé par le bouton
* @param {string} texte = Ce qu'il y a sur le bouton qui doit exactement etre le nom de l'image sans l'extension
* @param {string} textePopup = Le texte dévoilé par le bouton ou l'url de l'image.
* @Auteur Jean-claude Lhote & Rémi Angot & Sebastien Lozano
**/
// function katex_Popup2(numero,type,texte,titrePopup,textePopup) {
// 	'use strict';
// 	switch (type) { 
// 		case 0 : return katex_Popuptest(texte,titrePopup,textePopup)
// 		case 1 : return `${texte}`+ modal_texte_long(numero,`${titrePopup}`,`${textePopup}`,`${texte}`,"info circle")
// 		case 2 : return `${texte}`+ modal_image(numero,textePopup,`${titrePopup}`,`${texte}`)
// 	}
// };

function katex_Popup2(numero,type,texte,titrePopup,textePopup) {
	'use strict';
	switch (type) { 
		case 0 : 
			return katex_Popuptest(texte,titrePopup,textePopup);
			break;
		case 1 : 
			if (sortie_html) {
				return `${texte}`+ modal_texte_long(numero,`${titrePopup}`,`${textePopup}`,`${texte}`,"info circle")
			} else {
				return `\\textbf{${texte}} \\footnote{\\textbf{${titrePopup}} ${textePopup}}`
			};
			break;
		case 2 : 
			if (sortie_html) {
				return `${texte}`+ modal_image(numero,textePopup,`${titrePopup}`,`${texte}`)
			} else {
				return `\\href{https://coopmaths.fr/images/${sansAccent(texte)}.png}{\\textcolor{blue}{\\underline{${texte}}} } \\footnote{\\textbf{${texte}} ${textePopup}}`
			};
			break;
	};
};

 

/**
 * Crée une liste de questions alphabétique
 * @param {number} k valeur numérique
 * @Auteur Sébastien Lozano
 */	
function num_alpha(k) {
	'use strict';
	if (sortie_html) return '<span style="color:#f15929; font-weight:bold">'+String.fromCharCode(97+k)+'/</span>';
	//else return '\\textcolor [HTML] {f15929} {'+String.fromCharCode(97+k)+'/}';
	else return '\\textbf {'+String.fromCharCode(97+k)+'.}';
};

 /**
 * Crée une flèche orange pour la fonction machine
 * @param {object} groupe groupe svg
 * @param {string} chemin path pour la ligne 
 * @param {string} couleur couleur
 * @Auteur Sébastien Lozano
 */
function SVG_fleche_machine_maths(groupe,chemin,couleur) {
	'use strict';
	return groupe.path(chemin).fill(couleur).stroke({ color: couleur, width: 1, linecap: 'round', linejoin:'null'});
};

 /**Trace un chemin pour un groupe donné avec une couleur donnée
 * @param {object} groupe groupe
 * @param {string} chemin path
 * @param {string} couleur couleur
 * @Auteur Sébastien Lozano
 */	
function SVG_chemin(groupe,chemin,couleur) {
	'use strict';
	return groupe.path(chemin).fill('none').stroke({ color: couleur, width: 1, linecap: 'round', linejoin:'null'});
};

/**
 * Crée un diagramme pour une fonction arithmétique à une étape produit
 * @param {string} id_du_div id du div contenant le SVG
 * @param {number} w largeur du div du svg
 * @param {numer} h hauteur du div du svg
 * @param {string} nom nom de la fonction
 * @param {string} x_ant antécédent de départ
 * @param {array} etapes_expressions tableau contenant les opérations et les expressions algébriques des étapes
 * @Auteur Sébastien Lozano
 */
function SVG_machine_diag_3F1_act_mono(id_du_div,w,h,nom,x_ant,etapes_expressions) {
	'use strict';
	let interligne = 10;//w/80; //h/10; // unité d'espacement
	var saut = 0; // pour la gestion des sauts entre les éléments on aura besoin d'une globale
	if (!window.SVGExist) {window.SVGExist = {}} // Si SVGExist n'existe pas on le créé
	// SVGExist est un dictionnaire dans lequel on stocke les listenner sur la création des div
	window.SVGExist[id_du_div] = setInterval(function() {
		
		if ($(`#${id_du_div}`).length ) {
			$(`#${id_du_div}`).html("");//Vide le div pour éviter les SVG en doublon
			// on crée un rectangle dont la taille est adaptée au texte
			let w_x_ant = 10*interligne;
			// on incrémente le saut pour gérer le positionnement de l'élément suivant
			saut = w_x_ant + 2*interligne;
			//let path_cadre_rect_ant = 'M0,0L0,-'+interligne+',L'+(w_x_ant + 2*interligne)+',-'+interligne+',L'+(w_x_ant + 2*interligne)+','+interligne+'L0,'+interligne+'Z';
			let path_cadre_rect_ant ='5,5 195,10 185,40 10,50';
			document.getElementById(id_du_div).innerHTML = `
				<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 `+w+` `+h+`" width="`+w+`">
					<g>
						<path d="M0 `+5*interligne+`L0 `+3*interligne+`L`+5*interligne+` `+3*interligne+`L`+5*interligne+` `+7*interligne+`L0 `+7*interligne+`Z " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
						</path>
						<foreignObject width="`+interligne+`" height="`+h/2+`" x="`+2.5*interligne+`" y="`+h/4+`">
							<div style="position: fixed">
								<span class="katex-display">
									<span class="katex">
										<span class="katex-html" aria-hidden="true">
											<span class="base">
												<span class="mord mathdefault">`+x_ant+`</span>
											</span>
										</span>
									</span>
								</span>
							</div>
						</foreignObject>
					</g>
					<g>
						<line x1="`+5*interligne+`" y1="`+5*interligne+`" x2="`+7*interligne+`" y2="`+5*interligne+`" stroke-width="3" stroke="#f15929">
						</line>
						<circle r="`+2*interligne+`" cx="`+9*interligne+`" cy="`+5*interligne+`" fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
						</circle>
						<path d="M`+11*interligne+` `+5*interligne+`L`+13*interligne+` `+5*interligne+`L`+(13*interligne-interligne/2)+` `+(5*interligne-interligne/2)+`M`+13*interligne+` `+5*interligne+`L`+(13*interligne-interligne/2)+` `+(5*interligne+interligne/2)+` " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
						</path>
						<foreignObject width="`+4*interligne+`" height="`+h/2+`" x="`+7.5*interligne+`" y="`+h/4+`">
							<div style="position: fixed">
								<span class="katex-display">
									<span class="katex">
										<span class="katex-html" aria-hidden="true">
											<span class="base">
												<span class="mord mathdefault">×`+etapes_expressions[0][0]+`</span>
											</span>
										</span>
									</span>
								</span>
							</div>
						</foreignObject>
					</g>
					<g>
						<path d="M`+13*interligne+` `+5*interligne+`L`+13*interligne+` `+3*interligne+`L`+27*interligne+` `+3*interligne+`L`+27*interligne+` `+7*interligne+`L`+13*interligne+` `+7*interligne+`Z " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
						</path>
						<foreignObject width="`+12*interligne+`" height="`+h/2+`" x="`+16*interligne+`" y="`+h/4+`">
							<div style="position: fixed">
								<span class="katex-display">
									<span class="katex">
										<span class="katex-html" aria-hidden="true">
											<span class="base">
												
												<span class="mord mathdefault">`+nom+`<span class="mopen">(</span>`+x_ant+`<span class="mclose">)</span><span class="mspace" style="margin-right: 0.408889em;"></span>=<span class="mspace" style="margin-right: 0.408889em;"></span>`+etapes_expressions[0][1]+`</span>
											</span>
										</span>
									</span>
								</span>
							</div>
						</foreignObject>
					</g>
				</svg>	
				`;
			
		clearInterval(SVGExist[id_du_div]);//Arrête le timer
		};
	}, 100); // Vérifie toutes les 100ms
};

 //================================================================================================
 // fonctions dont le déplacement dans mathalea_outils.js posait problème
 // Les appels aux fonctions de mathalea_outils.js doivent être faits après this.nouvelle_version()
 //================================================================================================

 /**
  * Fonction pour particulariser une police svg et ses paramètres  
  * @param {string} font 
  * @param {string} interligne 
  * @param {string} ancre 
  * @param {string} f_style 
  * @param {string} f_weight
  * @author Sébastien Lozano 
  */ 
 function my_svg_font(font,interligne,ancre,f_style,f_weight){
	'use strict';
	return {family:  font,
		size: interligne,
		anchor: ancre,
		style: f_style,
		//, leading : 0.5
		weight : f_weight
		};
};

/**
 * Fonction pour créer une machine mathématique SVG, une fonction!
 * gestion du rendu KaTeX temporaire avec insertion manuelle de balises foreignObject pour les textes
 * ATTENTION BUG SVG DONC LES ANIMATIONS SONT FILMEES A PARTIR DE CELLES GENEREES PAR LA FONCTION SVG_machine_maths() SOUS FIREFOX
 * DE FACON A AVOIR UN RENDU UNIFORME QUEL QUE SOIT LE NAVIGATEUR ON REND LES ANIMATIONS PAR DES VIDEOS
 * ON LAISSE LA PIROUETTE DE DETECTION DU USERAGENT EN COMMENTAIRE EN ATTENDANT DE TROUVER UNE SOLUTION DE RENDU LATEX DANS SVG UNIVERSELLE
 * @param {string} id_du_div id_du_div
 * @param {number} w width du svg
 * @param {number} h height du svg
 * @param {string} nom nom de la fonction
 * @param {string} etape1 etape 1 du procédé de calcul
 * @param {string} etape2 etape 2 du procédé de calcul
 * @param {string} etape3 etape 3 du procédé de calcul
 * @param {string} x_ligne1 antécédent ligne1
 * @param {string} x_ligne2 antécédent ligne2
 * @param {string} y_ligne1 image ligne1
 * @param {string} y_ligne2 image ligne2
 * @author Sébastien Lozano
 */	
function SVG_machine_maths(id_du_div,w,h,nom,etape1,etape2,etape3,x_ligne1,x_ligne2,y_ligne1,y_ligne2) {
	'use strict';
	let interligne = 15; // pour un interligne uniforme 
	let prop_font = my_svg_font('Helvetica',interligne,'start','normal','normal');
	let prop_font_nom = my_svg_font('Helvetica',interligne,'start','normal','bold');
	let prop_font_etape = my_svg_font('Helvetica',4*interligne/5,'start','normal','normal');
					
	if (!window.SVGExist) {window.SVGExist = {}} // Si SVGExist n'existe pas on le créé
	// SVGExist est un dictionnaire dans lequel on stocke les listenner sur la création des div
	window.SVGExist[id_du_div] = setInterval(function() {

		if ($(`#${id_du_div}`).length ) {
			$(`#${id_du_div}`).html("");//Vide le div pour éviter les SVG en doublon
			//const mon_svg = SVG().addTo(`#${id_du_div}`).viewbox(0, 0, w, h).size('100%','100%');
			const mon_svg = SVG().addTo(`#${id_du_div}`).viewbox(0, 0, w, h);
			// on trace un cadre pour le debug
			//mon_svg.path('M0,0 L'+w+',0L'+w+','+h+'L0,'+h+'Z').fill('none').stroke({ color: '#f15929', width: 1, linecap: 'round', linejoin:'null'});

			// path pour créer des fleches
			const path_fleche = 'm0,0 l-'+interligne/2+',-'+interligne+' l'+interligne+','+interligne+' l-'+interligne+','+interligne+' l'+interligne/2+',-'+interligne+'z';

			// On crée une timeline
			let timeline = new SVG.Timeline();

			//------------CREATION DES GROUPES----------------------
			//------------Antécédent--------------------------------
			let ant=mon_svg.group();

			//------------Image-------------------------------------
			let im = mon_svg.group(); 

			//------------PREPARATION DES DIMENSIONS NECESSAIRES----
			//------------Dimension Antécédent----------------------
			let ant_ligne1 = ant.text(x_ligne1).font(prop_font); 
			let ant_ligne2 = ant.text(x_ligne2).font(prop_font); 
			let w_ant = Math.max(ant_ligne1.length(),ant_ligne2.length())+interligne;
			ant_ligne1.clear();
			ant_ligne2.clear();

			//------------Dimension Image---------------------------
			let im_ligne1 = im.text(y_ligne1).font(prop_font); 
			let im_ligne2 = im.text(y_ligne2).font(prop_font); 
			let w_im = Math.max(im_ligne1.length(),im_ligne2.length())+interligne;
			im_ligne1.clear();
			im_ligne2.clear();

			//------------Dimension Machine-------------------------
			// on crée des variables pour le texte à afficher sur la machine afin de récupérer leur taille
			// pour ajuster celle de la machine.
			if (nom!='') {
				var machine_nom = mon_svg.text(nom).font(prop_font_nom);
				var w_machine_nom = machine_nom.length();
				machine_nom.clear();
			} else {
				var w_machine_nom = 0;
			};
			if (etape1!='') {
				var machine_etape1 = mon_svg.text(etape1).font(prop_font_etape);
				var w_machine_etape1 = machine_etape1.length();
				machine_etape1.clear();
			} else {
				var w_machine_etape1 = 0;
			};
			if (etape2!='') {
				var machine_etape2 = mon_svg.text(etape2).font(prop_font_etape);
				var w_machine_etape2 = machine_etape2.length();
				machine_etape2.clear();
			} else {
				var w_machine_etape2 = 0;
			};
			if (etape3!='') {
				var machine_etape3 = mon_svg.text(etape3).font(prop_font_etape);
				var w_machine_etape3 = machine_etape3.length();
				machine_etape3.clear();
			} else {
				var w_machine_etape3 = 0;
			};

			let w_etape_max = Math.max(w_machine_nom,w_machine_etape1,w_machine_etape2,w_machine_etape3,w_ant+interligne,w_im+interligne)+1.5*interligne;

			//------------GROUPE ANTECEDENT------------------------- 
			let ant_ligne = ant.foreignObject(w_ant,h).attr({x:'0',y:'0'});
			let antDiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
			katex.render(x_ligne1+'\\newline '+x_ligne2, antDiv, {				
				"displayMode":true,"throwOnError":true,"errorColor":"#CC0000","strict":"ignore","trust":false				
			});
			ant_ligne.add(antDiv);
			ant_ligne.dmove(0,-antDiv.offsetHeight/2);
			let fleche_ant = SVG_fleche_machine_maths(ant,path_fleche,'#f15929');
			fleche_ant.dmove(antDiv.offsetWidth+interligne/2,interligne); 
			// on positionne le groupe antécédent
			ant.dmove(0,h/2-interligne);
			 
			//------------GROUPE IMAGE-------------------------
			let im_ligne = im.foreignObject(w_im,h).attr({x:'0',y:'0'});
			let imDiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
			katex.render(y_ligne1+'\\newline '+y_ligne2, imDiv, {				
				"displayMode":true,"throwOnError":true,"errorColor":"#CC0000","strict":"ignore","trust":false				
			});
			im_ligne.add(imDiv);
			im_ligne.dmove(0,-imDiv.offsetHeight/2);
			let fleche_im = SVG_fleche_machine_maths(im,path_fleche,'#f15929');
			fleche_im.dmove(-interligne/2,interligne);			 
			// on positionne le groupe image
			im.dmove(w/2-imDiv.offsetWidth/2,h/2-interligne);

			//------------GROUPE MACHINE-------------------------
			//const path_machine = 'M-5,0 L-5,-5 L-5,5 M-5,0 L10,0 L10,-40 L100,-40 L100,0 L120,0 L115,-5 L120,0 L115,5 L120,0 L100,0 L100,40 L10,40 L10,0';
			const path_machine = 'M-10,0 L-10,-5 L-10,5 M-10,0 L10,0 L10,-'+(h/2-5)+' L'+(w_etape_max+20)+',-'+(h/2-5)+' L'+(w_etape_max+20)+',0 L'+(w_etape_max+40)+',0 L'+(w_etape_max+35)+',-5 L'+(w_etape_max+40)+',0 L'+(w_etape_max+35)+',5 L'+(w_etape_max+40)+',0 L'+(w_etape_max+20)+',0 L'+(w_etape_max+20)+','+(h/2-5)+' L10,'+(h/2-5)+' L10,0';
			let machine = mon_svg.path(path_machine).fill('#fff').stroke({ color: '#f15929', width: 3, linecap: 'round', linejoin:'round'});
			machine.dmove(w/2-w_etape_max/2 - 20 + interligne/2,h/2); //w/2;  60 est la moitié de la taille de la machine en largeur

			let fobj_machine = mon_svg.foreignObject(w_etape_max,h).attr({x:w/2-w_etape_max/2,y:'0'});
			let machineDiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
			katex.render('\\mathbf{'+nom+'}\\newline '+etape1+'\\newline '+etape2+'\\newline '+etape3, machineDiv, {				
				"displayMode":true,"throwOnError":true,"errorColor":"#CC0000","strict":"ignore","trust":false				
			});
			fobj_machine.add(machineDiv);
			fobj_machine.dmove(0,h/2-interligne-machineDiv.offsetHeight/2);

			//------------ANIMATION-------------------------
 			ant.timeline(timeline);
 			im.timeline(timeline);

 			let runner1 = ant.animate(8000,0,'absolute').dmove(w/2-w_ant/2,0);
 			let runner2 = im.animate(8000,0,'after').dmove(w-w_im/2,0);

 			runner1.loop(true,false,8000);
 			runner2.loop(true,false,8000);


		clearInterval(SVGExist[id_du_div]);//Arrête le timer
		}

	}, 100); // Vérifie toutes les 100ms
};

//============================================================================
// fin fonctions dont le déplacement dasn mathalea_outils.js posait problème
//===========================================================================

//=================================
//fin fonctions 3F1-act
//=================================

/**
 * crée un cadre orange autour d'un paragraphe
 * utilisé notamment dans 3F12 pour entourer les programmes de calcul
 * @param {string} texte paragraphe entouré par le cadre orange rectangulaire
 * @author Sébastien Lozano
 */

 function tex_cadre_par_orange(texte) {
	 'use strict';
	 //\\definecolor{orangeCoop}{rgb}{0.9450980392156862,0.34901960784313724,0.1607843137254902}
	 let sortie = `
	 
	 \\setlength{\\fboxrule}{1.5mm}
	 \\par\\vspace{0.25cm}
	 \\noindent\\fcolorbox{nombres}{white}{\\parbox{\\linewidth-2\\fboxrule-2\\fboxsep}{`+texte+`}}
	 \\par\\vspace{0.25cm}		 
	 `;

	 return sortie;
 };

/**
 * Crée un diagramme pour une fonction arithmétique à deux étapes produit puis somme
 * @param {string} id_du_div id du div contenant le SVG
 * @param {number} w largeur du div du svg
 * @param {numer} h hauteur du div du svg
 * @param {string} nom nom de la fonction
 * @param {string} x_ant antécédent de départ
 * @param {array} etapes_expressions tableau contenant les opérations et les expressions algébriques des étapes
 * @author Sébastien Lozano
 */
function SVG_machine_diag_3F12(id_du_div,w,h,nom,x_ant,etapes_expressions) {
	'use strict';
	let interligne = 10;//w/80; //h/10; // unité d'espacement
	var saut = 0; // pour la gestion des sauts entre les éléments on aura besoin d'une globale
	if (!window.SVGExist) {window.SVGExist = {}} // Si SVGExist n'existe pas on le créé
	// SVGExist est un dictionnaire dans lequel on stocke les listenner sur la création des div
	window.SVGExist[id_du_div] = setInterval(function() {
		
		if ($(`#${id_du_div}`).length ) {
			$(`#${id_du_div}`).html("");//Vide le div pour éviter les SVG en doublon
			// on crée un rectangle dont la taille est adaptée au texte
			let w_x_ant = 10*interligne;
			// on incrémente le saut pour gérer le positionnement de l'élément suivant
			saut = w_x_ant + 2*interligne;
			//let path_cadre_rect_ant = 'M0,0L0,-'+interligne+',L'+(w_x_ant + 2*interligne)+',-'+interligne+',L'+(w_x_ant + 2*interligne)+','+interligne+'L0,'+interligne+'Z';
			let path_cadre_rect_ant ='5,5 195,10 185,40 10,50';
			document.getElementById(id_du_div).innerHTML = `
				<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 `+w+` `+h+`" width="`+w+`">
					<g>
						<path d="M0 `+5*interligne+`L0 `+3*interligne+`L`+5*interligne+` `+3*interligne+`L`+5*interligne+` `+7*interligne+`L0 `+7*interligne+`Z " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
						</path>
						<foreignObject width="`+interligne+`" height="`+h/2+`" x="`+2.5*interligne+`" y="`+h/4+`">
							<div style="position: fixed">
								<span class="katex-display">
									<span class="katex">
										<span class="katex-html" aria-hidden="true">
											<span class="base">
												<span class="mord mathdefault">`+x_ant+`</span>
											</span>
										</span>
									</span>
								</span>
							</div>
						</foreignObject>
					</g>
					<g>
						<line x1="`+5*interligne+`" y1="`+5*interligne+`" x2="`+7*interligne+`" y2="`+5*interligne+`" stroke-width="3" stroke="#f15929">
						</line>
						<circle r="`+2*interligne+`" cx="`+9*interligne+`" cy="`+5*interligne+`" fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
						</circle>
						<path d="M`+11*interligne+` `+5*interligne+`L`+13*interligne+` `+5*interligne+`L`+(13*interligne-interligne/2)+` `+(5*interligne-interligne/2)+`M`+13*interligne+` `+5*interligne+`L`+(13*interligne-interligne/2)+` `+(5*interligne+interligne/2)+` " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
						</path>
						<foreignObject width="`+4*interligne+`" height="`+h/2+`" x="`+7.5*interligne+`" y="`+h/4+`">
							<div style="position: fixed">
								<span class="katex-display">
									<span class="katex">
										<span class="katex-html" aria-hidden="true">
											<span class="base">
												<span class="mord mathdefault">×`+etapes_expressions[0][0]+`</span>
											</span>
										</span>
									</span>
								</span>
							</div>
						</foreignObject>
					</g>
					<g>
						<path d="M`+13*interligne+` `+5*interligne+`L`+13*interligne+` `+3*interligne+`L`+21*interligne+` `+3*interligne+`L`+21*interligne+` `+7*interligne+`L`+13*interligne+` `+7*interligne+`Z " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
						</path>
						<foreignObject width="`+2.5*interligne+`" height="`+h/2+`" x="`+16*interligne+`" y="`+h/4+`">
							<div style="position: fixed">
								<span class="katex-display">
									<span class="katex">
										<span class="katex-html" aria-hidden="true">
											<span class="base">
												<span class="mord mathdefault">`+etapes_expressions[0][1]+`</span>
											</span>
										</span>
									</span>
								</span>
							</div>
						</foreignObject>
					</g>
					<g>
						<line x1="`+21*interligne+`" y1="`+5*interligne+`" x2="`+23*interligne+`" y2="`+5*interligne+`" stroke-width="3" stroke="#f15929">
						</line>
						<circle r="`+2*interligne+`" cx="`+25*interligne+`" cy="`+5*interligne+`" fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
						</circle>
						<path d="M`+27*interligne+` `+5*interligne+`L`+29*interligne+` `+5*interligne+`L`+(29*interligne-interligne/2)+` `+(5*interligne-interligne/2)+`M`+29*interligne+` `+5*interligne+`L`+(29*interligne-interligne/2)+` `+(5*interligne+interligne/2)+` " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
						</path>
						<foreignObject width="`+4*interligne+`" height="`+h/2+`" x="`+23.5*interligne+`" y="`+h/4+`">
						<body xmlns="http://www.w3.org/1999/xhtml">
							<div style="position: fixed">
								<span class="katex-display">
									<span class="katex">
										<span class="katex-html" aria-hidden="true">
											<span class="base">
												<span class="mord mathdefault">+`+etapes_expressions[1][0]+`</span>
											</span>
										</span>
									</span>
								</span>
							</div>
							</body>
						</foreignObject>
					</g>
					<g>
						<path d="M`+29*interligne+` `+5*interligne+`L`+29*interligne+` `+3*interligne+`L`+44*interligne+` `+3*interligne+`L`+44*interligne+` `+7*interligne+`L`+29*interligne+` `+7*interligne+`Z " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
						</path>
						<foreignObject width="`+12*interligne+`" height="`+h/2+`" x="`+31*interligne+`" y="`+h/4+`">
							<div style="position: fixed">
								<span class="katex-display">
									<span class="katex">
										<span class="katex-html" aria-hidden="true">
											<span class="base">
												<span class="mord mathdefault">`+nom+`<span class="mopen">(</span>`+x_ant+`<span class="mclose">)</span><span class="mspace" style="margin-right: 0.408889em;"></span>=<span class="mspace" style="margin-right: 0.408889em;"></span>`+etapes_expressions[1][1]+`</span>
											</span>
										</span>
									</span>
								</span>
							</div>
						</foreignObject>
					</g>
				</svg>	
				`;
			
		clearInterval(SVGExist[id_du_div]);//Arrête le timer
		};
	}, 100); // Vérifie toutes les 100ms
};

/**
 * affiche une video centrée dans une div
 * ATTENTION BUG SVG DONC LES ANIMATIONS SONT FILMEES A PARTIR DE CELLES GENEREES PAR LA FONCTION SVG_machine_maths() SOUS FIREFOX
 * DE FACON A AVOIR UN RENDU UNIFORME QUEL QUE SOIT LE NAVIGATEUR ON REND LES ANIMATIONS PAR DES VIDEOS
 * ON LAISSE LA PIROUETTE DE DETECTION DU USERAGENT EN COMMENTAIRE EN ATTENDANT DE TROUVER UNE SOLUTION DE RENDU LATEX DANS SVG UNIVERSELLE
 * @param {string} url_video 
 * @author Sébastien Lozano 
 */

function machine_maths_video(url_video) {
	'use strict';
	let video =`
	<div style="text-align:center"> 
	<video width="560" height="100%" controls  loop autoplay muted style="max-width: 100%">
		<source src="`+url_video+`">
		Votre navigateur ne gère pas l\'élément <code>video</code>.
	</video>
	</div>`;
	
	return video;
};

/**
 * détecte si le navigateur et safari ou chrome et renvoie un booléen
 * @author Sébastien Lozano 
 */
function detect_safari_chrome_browser(){
	'use strict';
	var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
	// var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
	// var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
	var is_safari = navigator.userAgent.indexOf("Safari") > -1;
	var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
	if ((is_chrome)&&(is_safari)) { is_safari = false; }
	if ((is_chrome)&&(is_opera)) { is_chrome = false; }

	return (is_chrome||is_safari);
};

/**
* Retourne la liste des nombres premiers inférieurs à N N<300 N exclu
* @param {integer} k On cherchera un multiple de k
* @param {integer} n Ce multiple sera supérieur ou égal à n
* @author Rémi Angot
*/
function premierMultipleSuperieur(k,n){
	let result = n
	while (result%k!=0){
		result+=1
	}
	return result
}

/**
* Retourne la liste des nombres premiers inférieurs à N N<300 N exclu
* @param {number} borneSup
* @author Sébastien Lozano
*/
function liste_nb_premiers_strict_jusqua(borneSup) {
	'use strict';
	// tableau contenant les 300 premiers nombres premiers
	let liste_300 = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293];
	let liste = [];
	let i = 0;
	while (liste_300[i]<borneSup) {
		liste.push(liste_300[i]);
		i++;
	}
	return liste;
};

/**
 * Liste les nombres premiers jusque n avec la méthode du crible d'Eratosthene optimisée
 * @param {number} n 
 * @author Sébastien Lozano
 */
function crible_eratosthene_n(n) {
	'use strict';
	var tab_entiers = []; // pour tous les entiers de 2 à n
	var test_max = Math.sqrt(n+1); // inutile de tester au dela de racine de n
	var liste = []; // tableau de la liste des premiers jusqu'à n

	// On rempli un tableau avec des booléeens de 2 à n
	for (let i = 0; i < n+1; i++) {
		tab_entiers.push(true);
	}

	// On supprime les multiples des nombres premiers à partir de 2, 3, 5,...
	for (let i = 2; i <= test_max; i++) {
		if (tab_entiers[i]) {
			for (var j = i * i; j < n+1; j += i) {
				tab_entiers[j] = false;
			}
		}
	}

	// On récupère tous les indices du tableau des entiers dont le booléen est à true qui sont donc premiers
	for (let i = 2; i < n+1; i++) {
		if(tab_entiers[i]) {
			liste.push(i);
		}
	}

	return liste;
};

/**
 * Liste les premiers compris entre min et max au sens large,
 * min est inclu
 * max est inclu.
 * @param {number} min
 * @param {number} max
 * @author Sébastien Lozano
 */

 function premiers_entre_bornes(min,max) {
	'use strict';
	// on crée les premiers jusque min
	let premiers_a_suppr = crible_eratosthene_n(min-1);
	// on crée les premiers jusque max
	let premiers_jusque_max = crible_eratosthene_n(max);
	// on supprime le début de la liste jusque min
	premiers_jusque_max.splice(0,premiers_a_suppr.length);
	// on renvoit le tableau restant
	return premiers_jusque_max;
 };

/**
 * tire à pile ou face pour écrire ou non un texte
 * @param {string} texte 
 * @author Sébastien Lozano
 */

function texte_ou_pas(texte) {
	'use strict';
	let bool = randint(0,1);
	if (bool==0) {
		return `\\ldots`;
	} else {
		return texte;
	};
};

/**
 * Crée un tableau avec un nombre de lignes et de colonnes déterminées par la longueur des tableaux des entetes passés en paramètre
 * Les contenus sont en mode maths par défaut, il faut donc penser à remplir les tableaux en utilisant éventuellement la commande \\text{}
 * @param {array} tab_entetes_colonnes contient les entetes des colonnes
 * @param {array} tab_entetes_lignes contient les entetes des lignes
 * @param {array} tab_lignes contient les elements de chaque ligne
 * @author Sébastien Lozano
 */
function tab_C_L(tab_entetes_colonnes,tab_entetes_lignes,tab_lignes) {
	'use strict';
	// on définit le nombre de colonnes
	let C = tab_entetes_colonnes.length;
	// on définit le nombre de lignes
	let L = tab_entetes_lignes.length;
	// On construit le string pour obtenir le tableau pour compatibilité HTML et LaTeX
	let tableau_C_L = ``;
	if (sortie_html) {
		tableau_C_L += `$\\def\\arraystretch{2.5}\\begin{array}{|`;
	} else {
		tableau_C_L += `$\\begin{array}{|`;
	};
	// on construit la 1ere ligne avec toutes les colonnes
	for (let k=0;k<C;k++) {
		tableau_C_L += `c|`;
	};
	tableau_C_L +=`}\n`;
					
	tableau_C_L += `\\hline\n`
	tableau_C_L += tab_entetes_colonnes[0];
	for (let k=1;k<C;k++) {
		tableau_C_L += ` & `+tab_entetes_colonnes[k]+``;
	};
	tableau_C_L += `\\\\\n`;
	tableau_C_L += `\\hline\n`;
	// on construit toutes les lignes
	for (let k=0;k<L;k++) {
		tableau_C_L += ``+tab_entetes_lignes[k]+``;
		for (let m=1;m<C;m++) {
			tableau_C_L += ` & `+tab_lignes[(C-1)*k+m-1];
		};
		tableau_C_L += `\\\\\n`;
		tableau_C_L += `\\hline\n`;	
	};	
	tableau_C_L += `\\end{array}\n$`

	return tableau_C_L;
};

/**
 * Renvoie un encart sur fond d'alert semantic ui en HTML ou dans un cadre bclogo en LaTeX avec le texte 
 * @param {string} texte
 * @param {string} couleur
 * @param {string} titre
 * @author Sébastien Lozano 
 */
function warn_message(texte,couleur,titre) {
	'use strict';
	if( typeof(titre) == 'undefined' ){
        titre = ``;
    };
	if (sortie_html) {
		return `
		<br>
		<div class="ui compact warning message">		
		<p>`+texte+`
		</p>
		</div>
		`;
	} else {
		//return tex_cadre_par_orange(texte);							
		return `
		\\begin{bclogo}[couleurBarre=`+couleur+`,couleurBord=`+couleur+`,epBord=2,couleur=gray!10,logo=\\bclampe,arrondi=0.1]{\\bf `+titre+`}
			`+texte+`
		\\end{bclogo}
		`;
	};

};

/**
 * @returns un encart sur fond d'alert semantic ui en HTML ou dans un cadre bclogo en LaTeX avec le texte + icone info
 * @param {object} 
 * @author Sébastien Lozano
 */

function info_message({titre,texte,couleur}) {
	//'use strict';
	if (sortie_html) {
		return `
		<div class="ui compact icon message">
			<i class="info circle icon"></i>
			<div class="content">
		  		<div class="header">
					`+titre+`
		  		</div>
		  		<p>`+texte+`</p>
			</div>
	  	</div>
		`;
	} else {
		return `
		\\begin{bclogo}[couleurBarre=`+couleur+`,couleurBord=`+couleur+`,epBord=2,couleur=gray!10,logo=\\bcinfo,arrondi=0.1]{\\bf `+titre+`}
			`+texte+`
		\\end{bclogo}
		`;
	};
};

/**
 * @returns un encart sur fond d'alert semantic ui en HTML ou dans un cadre bclogo en LaTeX avec le texte + icone lampe
 * @param {object} 
 * @author Sébastien Lozano
 */

function lampe_message({titre,texte,couleur}) {
	//'use strict';
	// if (sortie_html) {
	// 	return `
	// 	<div class="ui compact icon message">
	// 		<i class="lightbulb outline icon"></i>
	// 		<div class="content">
	// 	  		<div class="header">
	// 				`+titre+`
	// 	  		</div>
	// 	  		<p>`+texte+`</p>
	// 		</div>
	//   	</div>
	// 	`;
	// } else {
	// 	return `
	// 	\\begin{bclogo}[couleurBarre=`+couleur+`,couleurBord=`+couleur+`,epBord=2,couleur=gray!10,logo=\\bclampe,arrondi=0.1]{\\bf `+titre+`}
	// 		`+texte+`
	// 	\\end{bclogo}
	// 	`;
	// };
	return info_message({
		titre:titre,
		texte:texte,
		couleur:couleur
	})
};



/**
 * Renvoie deux engrenages en HTML pour le moment
 * @param {string} id_du_div id unique pour éviter les doublons, généré dans l'exo; à revoir?
 * @param {number} w largeur du conteneur
 * @param {number} h hauteur du conteneur
 * @author Sébastien Lozano
 */
function SVG_engrenages(id_du_div,w,h) {
	'use strict';
	if (sortie_html) {
		if (!window.SVGExist) {window.SVGExist = {}} // Si SVGExist n'existe pas on le créé
		// SVGExist est un dictionnaire dans lequel on stocke les listenner sur la création des div
		window.SVGExist[id_du_div] = setInterval(function() {
			
			if ($(`#${id_du_div}`).length ) {
				$(`#${id_du_div}`).html("");//Vide le div pour éviter les SVG en doublon
				document.getElementById(id_du_div).innerHTML = `
					<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 `+w+` `+h+`" width="`+w+`">
					<g id="surface1">
					<path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 106.5625 0.125 C 106.289062 0.175781 105.386719 0.289062 104.5625 0.363281 C 103.738281 0.449219 103.023438 0.550781 102.960938 0.613281 C 102.761719 0.8125 102 8.164062 102 9.988281 C 102 10.476562 101.9375 10.914062 101.851562 11.023438 C 101.761719 11.136719 101.238281 11.324219 100.6875 11.4375 C 100.136719 11.5625 99.300781 11.800781 98.8125 11.960938 C 97.664062 12.386719 94.125 14.039062 93.226562 14.585938 C 92.800781 14.835938 92.4375 14.976562 92.351562 14.925781 C 92.261719 14.875 90.375 13.351562 88.148438 11.523438 C 85.9375 9.710938 84.074219 8.25 84.011719 8.273438 C 83.949219 8.300781 83.226562 8.863281 82.414062 9.523438 C 80.75 10.886719 78.3125 13.414062 76.699219 15.425781 C 75.75 16.613281 75.636719 16.8125 75.789062 16.988281 C 75.886719 17.101562 76.425781 17.773438 77.011719 18.5 C 77.585938 19.226562 79.023438 20.976562 80.210938 22.414062 C 81.398438 23.835938 82.375 25.039062 82.375 25.085938 C 82.375 25.125 82.148438 25.523438 81.863281 25.976562 C 81.199219 27.011719 80.113281 29.238281 79.773438 30.1875 C 79.574219 30.789062 78.75 33.425781 78.5625 34.074219 C 78.539062 34.148438 77.351562 34.3125 75.601562 34.488281 C 71.3125 34.886719 68.273438 35.273438 68.0625 35.425781 C 67.613281 35.761719 67.351562 40.875 67.625 43.8125 C 67.800781 45.699219 68.023438 47.113281 68.175781 47.300781 C 68.261719 47.414062 69.050781 47.539062 70.5625 47.675781 C 76.101562 48.164062 78.324219 48.386719 78.449219 48.425781 C 78.523438 48.449219 78.625 48.710938 78.675781 49.011719 C 78.726562 49.300781 78.863281 49.800781 78.988281 50.113281 C 79.113281 50.425781 79.425781 51.335938 79.675781 52.136719 C 80.164062 53.648438 81.175781 55.800781 82.011719 57.050781 C 82.273438 57.449219 82.5 57.824219 82.5 57.886719 C 82.5 57.949219 81.363281 59.363281 79.976562 61.023438 C 77.148438 64.425781 76.6875 64.988281 76.210938 65.636719 L 75.875 66.085938 L 76.636719 67.074219 C 78.5625 69.574219 81.164062 72.175781 83.613281 74.050781 C 84.324219 74.601562 84.4375 74.648438 84.664062 74.5 C 85 74.289062 88.789062 71.164062 90.835938 69.414062 C 91.738281 68.636719 92.585938 68 92.726562 68 C 92.863281 68 93.550781 68.324219 94.261719 68.738281 C 95.851562 69.625 97.960938 70.488281 99.863281 71 C 101.125 71.335938 101.75 71.5625 101.75 71.664062 C 101.75 72.476562 102.824219 81.9375 102.9375 82.113281 C 102.960938 82.175781 103.8125 82.289062 104.8125 82.375 C 106.960938 82.5625 112.511719 82.476562 114.0625 82.226562 L 115.050781 82.0625 L 115.148438 81.625 C 115.199219 81.386719 115.414062 79.210938 115.625 76.8125 C 115.835938 74.398438 116.050781 72.210938 116.101562 71.9375 C 116.210938 71.335938 116.273438 71.300781 118.363281 70.6875 C 120.226562 70.148438 122.625 69.085938 124.113281 68.164062 C 125.023438 67.585938 125.226562 67.5 125.425781 67.625 C 125.550781 67.699219 126.363281 68.375 127.238281 69.125 C 129.101562 70.710938 133.5 74.25 133.625 74.25 C 133.664062 74.25 134.148438 73.925781 134.699219 73.523438 C 136.113281 72.488281 141.414062 66.851562 141.988281 65.761719 C 142.101562 65.5625 141.75 65.074219 139.476562 62.351562 C 138.023438 60.613281 136.511719 58.8125 136.113281 58.363281 C 135.699219 57.898438 135.375 57.4375 135.375 57.324219 C 135.375 57.199219 135.710938 56.449219 136.113281 55.648438 C 137.113281 53.6875 138.074219 51.238281 138.398438 49.851562 C 138.613281 48.960938 138.710938 48.699219 138.925781 48.625 C 139.074219 48.5625 139.886719 48.460938 140.75 48.386719 C 145.675781 47.976562 149.324219 47.574219 149.398438 47.460938 C 149.476562 47.324219 149.523438 47 149.773438 44.6875 C 149.976562 42.699219 150.039062 40.136719 149.886719 39.25 C 149.8125 38.800781 149.699219 37.761719 149.625 36.9375 C 149.550781 36.101562 149.425781 35.375 149.335938 35.300781 C 149.25 35.210938 147.074219 34.960938 144.0625 34.6875 C 140.039062 34.324219 138.898438 34.1875 138.789062 34.039062 C 138.699219 33.925781 138.550781 33.449219 138.4375 32.976562 C 138.011719 31.113281 136.5625 27.601562 135.5 25.851562 C 135.363281 25.625 135.25 25.3125 135.25 25.164062 C 135.25 24.988281 136.460938 23.414062 138.550781 20.863281 C 141.074219 17.789062 141.835938 16.789062 141.75 16.636719 C 141.488281 16.148438 139.851562 14.300781 138.335938 12.773438 C 136.960938 11.375 133.886719 8.664062 133.324219 8.351562 C 133.175781 8.261719 129.636719 11.023438 126.699219 13.539062 C 125.8125 14.289062 125.023438 14.914062 124.949219 14.925781 C 124.875 14.925781 123.601562 14.335938 122.125 13.601562 C 119.664062 12.363281 118.039062 11.75 116.476562 11.4375 C 116.085938 11.363281 116.164062 11.800781 115.6875 6.875 C 115.261719 2.523438 115.011719 0.710938 114.851562 0.613281 C 114.699219 0.511719 114.335938 0.476562 112.0625 0.238281 C 110.375 0.0625 107.175781 -0.0117188 106.5625 0.125 Z M 113.1875 26.425781 C 116.261719 27.335938 119.238281 29.460938 121.261719 32.175781 C 126.011719 38.523438 124.863281 47.886719 118.75 52.914062 C 115.613281 55.488281 112.164062 56.648438 108.210938 56.460938 C 103.449219 56.25 99.5 54.125 96.625 50.25 C 93.289062 45.75 92.710938 39.4375 95.199219 34.460938 C 95.925781 33.011719 96.710938 31.914062 97.976562 30.613281 C 100.335938 28.148438 102.5 26.875 105.375 26.238281 C 106.273438 26.039062 106.863281 26.011719 109.25 26.050781 C 111.875 26.085938 112.136719 26.113281 113.1875 26.425781 Z M 113.1875 26.425781 "/>
					<path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 106.386719 28.5625 C 103.1875 29.261719 100.199219 31.261719 98.460938 33.863281 C 96.726562 36.460938 96.050781 39.050781 96.261719 42.261719 C 96.613281 47.523438 100.648438 52.363281 105.875 53.773438 C 106.800781 54.011719 107.226562 54.050781 109.0625 54.050781 C 111.5 54.039062 112.449219 53.851562 114.210938 53.011719 C 115.613281 52.335938 116.613281 51.636719 117.835938 50.460938 C 119.175781 49.175781 119.988281 48.074219 120.675781 46.613281 C 122.335938 43.074219 122.238281 38.5625 120.4375 35.136719 C 118.738281 31.898438 115.148438 29.25 111.523438 28.550781 C 110.363281 28.324219 107.449219 28.335938 106.386719 28.5625 Z M 110.960938 31.574219 C 112.3125 31.851562 113.386719 32.3125 114.648438 33.148438 C 116.4375 34.351562 117.699219 36 118.335938 37.960938 C 118.585938 38.738281 118.675781 39.289062 118.726562 40.613281 C 118.851562 44.0625 118.074219 46.085938 115.789062 48.25 C 114.023438 49.925781 112.386719 50.726562 110.164062 51.011719 C 107.539062 51.351562 104.898438 50.550781 102.789062 48.761719 C 100.550781 46.886719 99.4375 44.625 99.289062 41.675781 C 99.175781 39.398438 99.6875 37.511719 100.925781 35.636719 C 101.675781 34.511719 102.386719 33.800781 103.511719 33.050781 C 105.738281 31.574219 108.414062 31.050781 110.960938 31.574219 Z M 110.960938 31.574219 "/>
					<path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 58.5 55.886719 C 58.011719 57.148438 57.023438 59.835938 56.300781 61.875 C 55.585938 63.898438 54.925781 65.761719 54.835938 66 L 54.675781 66.4375 L 52.4375 66.511719 C 48.898438 66.636719 45.476562 67.125 43.164062 67.824219 C 42.386719 68.0625 41.699219 68.25 41.648438 68.25 C 41.585938 68.25 41.011719 67.5 40.375 66.585938 C 38.375 63.75 33.585938 57.1875 33.449219 57.101562 C 33.300781 57 32.289062 57.375 30.789062 58.074219 C 30.148438 58.375 29.585938 58.625 29.539062 58.625 C 29.476562 58.625 28.789062 59 28 59.449219 C 27.210938 59.914062 25.976562 60.625 25.25 61.039062 C 22.886719 62.386719 19.875 64.636719 19.875 65.0625 C 19.875 65.226562 20.550781 66.699219 24.085938 74.289062 L 25.523438 77.375 L 24.449219 78.5 C 23.863281 79.125 23.0625 80.011719 22.6875 80.476562 C 22.3125 80.9375 21.6875 81.675781 21.300781 82.125 C 20.476562 83.085938 18.699219 85.738281 18.136719 86.835938 C 17.925781 87.273438 17.699219 87.625 17.648438 87.625 C 17.601562 87.625 15.8125 87.324219 13.6875 86.949219 C 7.726562 85.898438 4.101562 85.351562 4 85.460938 C 3.863281 85.613281 2.726562 88.476562 2.210938 89.949219 C 1.699219 91.425781 0.914062 95.199219 0.386719 98.75 C 0.25 99.613281 0.113281 100.398438 0.0742188 100.5 C 0.0117188 100.664062 0.9375 101.0625 4.835938 102.550781 C 7.511719 103.574219 10.398438 104.6875 11.289062 105.039062 L 12.875 105.648438 L 12.875 107.300781 C 12.886719 110.324219 13.226562 112.851562 14.136719 116.5625 C 14.414062 117.664062 14.625 118.613281 14.625 118.6875 C 14.625 118.75 14.414062 118.960938 14.148438 119.136719 C 11.625 120.875 3.949219 126.449219 3.75 126.6875 C 3.449219 127.039062 5.761719 131.738281 7.925781 135.1875 C 8.851562 136.675781 10.585938 139.175781 11.273438 140.039062 L 11.5625 140.386719 L 13.75 139.375 C 19.039062 136.914062 23.851562 134.75 24.050781 134.75 C 24.175781 134.75 25 135.4375 25.898438 136.289062 C 27.9375 138.210938 29.011719 139.011719 31.8125 140.726562 C 33.398438 141.6875 34.074219 142.175781 34.101562 142.351562 C 34.125 142.488281 33.886719 144.136719 33.574219 146.023438 C 33.261719 147.898438 32.800781 150.863281 32.550781 152.601562 C 32.164062 155.273438 32.113281 155.789062 32.261719 155.886719 C 33.136719 156.449219 37.523438 157.835938 41.0625 158.675781 C 43.199219 159.1875 47.238281 159.9375 47.3125 159.851562 C 47.488281 159.625 50.574219 151.5 51.6875 148.3125 C 51.960938 147.550781 52.238281 146.898438 52.300781 146.851562 C 52.375 146.800781 53.3125 146.75 54.375 146.75 C 57.539062 146.75 59.710938 146.4375 63.085938 145.488281 L 64.925781 144.976562 L 65.25 145.335938 C 65.425781 145.539062 67.261719 148.101562 69.335938 151.023438 L 73.125 156.351562 L 75.25 155.375 C 78.074219 154.074219 79.726562 153.1875 81.675781 151.914062 C 83.386719 150.800781 86 148.851562 86.460938 148.351562 L 86.726562 148.0625 L 85.75 145.875 C 85.226562 144.675781 84.011719 142.023438 83.0625 140 C 82.125 137.976562 81.289062 136.136719 81.210938 135.914062 C 81.085938 135.511719 81.113281 135.488281 82.199219 134.3125 C 84.363281 132 86.238281 129.488281 87.386719 127.351562 C 87.738281 126.710938 88.101562 126.101562 88.199219 126 C 88.398438 125.789062 88.101562 125.75 95.6875 127 C 98.648438 127.5 101.300781 127.925781 101.574219 127.960938 L 102.085938 128.023438 L 102.5 126.988281 C 103.039062 125.574219 104.386719 121.386719 104.851562 119.6875 C 105.164062 118.539062 105.761719 115.386719 106.050781 113.289062 C 106.125 112.773438 106.113281 112.75 105.664062 112.523438 C 105.0625 112.210938 102.585938 111.273438 97.625 109.4375 C 95.460938 108.636719 93.5625 107.898438 93.414062 107.800781 C 93.136719 107.625 93.125 107.550781 93.125 105.648438 C 93.125 102.824219 92.75 100.074219 91.925781 96.835938 C 91.75 96.175781 91.625 95.5 91.648438 95.351562 C 91.675781 95.164062 92.550781 94.460938 94.550781 93.039062 C 96.925781 91.335938 102.273438 87.351562 102.664062 87 C 102.875 86.8125 101.039062 82.886719 99.550781 80.300781 C 98.125 77.8125 95.011719 73.5 94.664062 73.5 C 94.414062 73.5 90.75 75.136719 86.625 77.085938 C 84.523438 78.085938 82.664062 78.9375 82.476562 78.960938 C 82.175781 79.023438 81.9375 78.835938 80.523438 77.476562 C 78.898438 75.886719 76.761719 74.199219 75.1875 73.273438 C 74.363281 72.789062 73.25 72.039062 72.738281 71.625 C 72.476562 71.414062 72.375 72.125 73.875 62.6875 C 74.210938 60.488281 74.539062 58.488281 74.574219 58.226562 L 74.636719 57.773438 L 72.726562 57.023438 C 70.449219 56.136719 67.761719 55.25 67.335938 55.25 C 67.164062 55.25 66.8125 55.164062 66.550781 55.050781 C 66.050781 54.835938 61.3125 53.835938 60.113281 53.6875 L 59.398438 53.601562 Z M 55.664062 86.9375 C 61.8125 87.738281 66.976562 90.976562 69.988281 95.914062 C 71.335938 98.113281 72.460938 100.914062 72.886719 103.0625 C 73 103.636719 73.0625 104.800781 73.0625 106.4375 C 73.050781 108.710938 73.023438 109.074219 72.699219 110.4375 C 71.710938 114.699219 70.175781 117.664062 67.625 120.238281 C 64.648438 123.25 60.539062 125.351562 56.261719 126.0625 C 52.601562 126.675781 47.773438 125.8125 43.988281 123.863281 C 38.3125 120.925781 34.289062 114.898438 33.625 108.3125 C 33.273438 104.863281 34.300781 100.125 36.125 96.8125 C 38.800781 91.949219 44.085938 88.1875 49.726562 87.136719 C 51.976562 86.710938 53.550781 86.664062 55.664062 86.9375 Z M 55.664062 86.9375 "/>
					<path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 51.875 89.835938 C 49.851562 90.050781 47.925781 90.648438 45.875 91.699219 C 41.324219 94.011719 38.789062 97.289062 37.4375 102.5625 C 36.523438 106.125 36.5625 108.800781 37.585938 111.851562 C 38.625 114.949219 41.324219 118.449219 44.136719 120.324219 C 49.289062 123.75 55.664062 124.1875 61.0625 121.460938 C 65.613281 119.1875 68.851562 115.023438 69.898438 110.113281 C 70.125 109.050781 70.175781 108.414062 70.175781 106.5625 C 70.175781 104.523438 70.148438 104.1875 69.835938 102.960938 C 68.6875 98.386719 65.761719 94.335938 62 92.125 C 59.238281 90.488281 54.898438 89.511719 51.875 89.835938 Z M 54.898438 93.9375 C 56.726562 94.136719 59.136719 95.039062 60.761719 96.125 C 63.050781 97.664062 65.113281 100.636719 65.898438 103.511719 C 66.148438 104.425781 66.1875 104.835938 66.175781 106.625 C 66.164062 108.324219 66.113281 108.863281 65.898438 109.675781 C 65.300781 111.863281 63.675781 114.539062 62.164062 115.851562 C 59.539062 118.113281 57.210938 119.101562 54.175781 119.210938 C 52.386719 119.289062 51.351562 119.136719 49.449219 118.539062 C 45.824219 117.398438 43.164062 114.789062 41.636719 110.914062 C 40.761719 108.664062 40.585938 105.726562 41.1875 103.335938 C 41.449219 102.351562 42.3125 100.511719 43.011719 99.488281 C 44.976562 96.574219 48.710938 94.300781 52.261719 93.886719 C 53.164062 93.789062 53.449219 93.789062 54.898438 93.9375 Z M 54.898438 93.9375 "/>
					</g>
					</svg>
					`;
					clearInterval(SVGExist[id_du_div]);//Arrête le timer
				};
			}, 100); // Vérifie toutes les 100ms

	};
};



/**
 * renvoie un tableau avec la decomposition en facteurs premiers sous forme développée
 * @param {number} n 
 * @author Sébastien Lozano
 */
function decomp_fact_prem_array(n) {
	let decomposition=[];
	let liste=obtenir_liste_facteurs_premiers(n);
	for (let i in liste) {
		decomposition.push(liste[i]);
	};
	return decomposition;
}


/**
 * @class
 * @classdesc Classe Triangles - Méthodes utiles pour les triangles *  
 * * @param {number} l1 une des longueurs du triangle 
 * * @param {number} l2 une des longueurs du triangle 
 * * @param {number} l3 une des longueurs du triangle 
 * * @param {number} a1 un des angles du triangle
 * * @param {number} a2 un des angles du triangle
 * * @param {number} a3  un des angles du triangle
 * @author Sébastien Lozano
 */
function Triangles(l1,l2,l3,a1,a2,a3) {
	'use strict';
	var self = this;

	/**
	 * @constant {array} nomsPossibles liste de noms possibles pour un triangle
	 */
	let nomsPossibles = ['AGE','AIL','AIR','ALU','AME','AMI','ANE','ARC','BAC','BAL','BAR','BEC','BEL','BIO','BIP','BIS','BLE','BOA','BOF','BOG','BOL','BUT','BYE','COQ','CRI','CRU','DUC','DUO','DUR','EAU','ECU','EGO','EPI','FER','FIL','FUN','GPS','ICE','JET','KIF','KIR','MAC','NEM','PAS','PIC','PIF','PIN','POT','RAI','RAP','RAT','RIF','SEL','TAF','TIC','TAC','TOC','TOP','UNI','WOK','YAK','YEN','ZEN','ZIG','ZAG'];

	/**
	 * @property {string} nom nom du triangle, tiré au hasard dans un tableau
	 */
	this.nom = choice(nomsPossibles);


	/**
	 * @return {string} Renvoie le nom du triangle tiré au hasard 
	 * * les strings sont EN MODE MATHS le premier caractère du string est un $
	 * @example si triangle est une instance de la classe Triangle() triangle.getNom() renvoie le string '$AMI$' si AMI est le nom tiré au hasard 
	 */
	function getNom() {
		return '$'+self.nom+'$';
	}

	/**
	 * @return {array} Renvoie un tableau contenant le nom des côtés, segments, du triangle tiré au hasard
	 * * les strings sont EN MODE MATHS le premier caractère du string est un $
	 * @example si triangle est une instance de la classe Triangle() triangle.getCotes() renvoie le tableau de strings ['$[AM]$','$[MI]$','$[IA]$'] dans cet ordre si AMI est le nom tiré au hasard  
	 */
	function getCotes() {
		let cotes = [];
		let triangle = self.nom;
		let sommets = triangle.split('');
		cotes[0]='$['+sommets[0]+''+sommets[1]+']$';
		cotes[1]='$['+sommets[1]+''+sommets[2]+']$';
		cotes[2]='$['+sommets[2]+''+sommets[0]+']$';

		return cotes;
	};

	/**
	 * @return {array} Renvoie un tableau contenant le nom des longueurs des côtés du triangle tiré au hasard
	 * * les strings sont EN MODE MATHS le premier caractère du string est un $
	 * @example si triangle est une instance de la classe Triangle() triangle.getCotes() renvoie le tableau de strings ['$AM$','$MI$','$IA$'] dans cet ordre si AMI est le nom tiré au hasard  
	 */
	function getLongueurs() {
		let longueurs = [];
		let triangle = self.nom;
		let sommets = triangle.split('');
		longueurs[0]='$'+sommets[0]+''+sommets[1]+'$';
		longueurs[1]='$'+sommets[1]+''+sommets[2]+'$';
		longueurs[2]='$'+sommets[2]+''+sommets[0]+'$';

		return longueurs;
	};
	
	/**
	 * @return {array} Renvoie un tableau avec les valeurs des longueurs des côtés du triangle passées en paramètre à l'instance de la classe
	 */
	function getLongueursValeurs() {		
		if ((typeof self.l1 == "undefined") || (typeof self.l2 == "undefined") || (typeof self.l3 == "undefined")) {
			//return false;
			return ['L\'une des longueurs de l\'objet triangle n\'est pas définie'];
		}
		let longueurs = [];
		longueurs[0]=self.l1;
		longueurs[1]=self.l2;
		longueurs[2]=self.l3;

		return longueurs;
	};


	/**
	 * @return {array} Renvoie un tableau de strings avec les noms des angles du triangle.
	 * * les strings sont EN MODE MATHS le premier caractère du string est un $
	 */
	function getAngles() {
		let angles = [];
		let triangle = self.nom;
		let sommets = triangle.split('');
		angles[0] = `$\\;\\widehat{${sommets[0]+sommets[1]+sommets[2]}}$`;
		angles[1] = `$\\;\\widehat{${sommets[1]+sommets[2]+sommets[0]}}$`;
		angles[2] = `$\\;\\widehat{${sommets[2]+sommets[0]+sommets[1]}}$`;

		return angles;
	};

	/**
	 * @return {array} Renvoie un tableau avec les valeurs des angles du triangle passées en paramètre à l'instance de la classe
	 */
	function getAnglesValeurs() {		
		if ((typeof self.a1 == "undefined") || (typeof self.a2 == "undefined") || (typeof self.a3 == "undefined")) {
			//return false;
			return ['L\'un des angles de l\'objet triangle n\'est pas définie'];
		}
		let angles = [];
		angles[0]=self.a1;
		angles[1]=self.a2;
		angles[2]=self.a3;

		return angles;
	};

	/**
	 * @return {array} Renvoie un tableau de strings avec les noms des sommets du triangle.
	 * * les strings sont EN MODE MATHS le premier caractère du string est un $
	 */
	function getSommets(math=true) {
		let triangle = self.nom;
		let sommets = triangle.split('');
		if (math==true) {
		sommets[0] = '$'+sommets[0]+'$';
		sommets[1] = '$'+sommets[1]+'$';
		sommets[2] = '$'+sommets[2]+'$';
		}
		return sommets;
	};

	/**
	 * @return {array} Renvoie le périmètre de l'instance de la classe Triangle() avec les valeurs des longueurs des côtés du triangle passées en paramètre à l'instance 
	 * @example let triangle = new Triangle();
	 * * triangle.l1 = 2;
	 * * triangle.l2 = 3;
	 * * triangle.l3 = 4
	 * * triangle.getPerimetre() renvoie 9
	 */
	function getPerimetre() {
		if ((typeof self.l1 == "undefined") || (typeof self.l2 == "undefined") || (typeof self.l3 == "undefined")) {
			//return false;
			return 'L\'une des longueurs de l\'objet triangle n\'est pas définie';
		} else {
			return calcul(self.l1 + self.l2 + self.l3);
		};			
	};

	/**
	 * @return {array} Renvoie un booleen selon que les trois longueurs passées à l'instance de la classe forment un vrai triangle ou non
	 * @example let triangle = new Triangle();
	 * * triangle.l1 = 2;
	 * * triangle.l2 = 3;
	 * * triangle.l3 = 7
	 * * triangle.isTrueTriangleLongueurs() renvoie false
	 * @example let triangle = new Triangle();
	 * * triangle.l1 = 2;
	 * * triangle.l2 = 3;
	 * * triangle.l3 = 4
	 * * triangle.isTrueTriangleLongueurs() renvoie true
	 */
	function isTrueTriangleLongueurs() {
		if ((typeof self.l1 == "undefined") || (typeof self.l2 == "undefined") || (typeof self.l3 == "undefined")) {
			return false;
			//return 'L\'une des longueurs de l\'objet triangle n\'est pas définie';
		}
		let longueurs = [self.l1,self.l2,self.l3];
		longueurs.sort(function(a,b){
			return calcul(a-b);
		});
		if (longueurs[2] < calcul(longueurs[0]+longueurs[1])) {
			return true;
		} else {
			return false;
		};
	};

	/**
	 * @return {array} Renvoie un booleen selon que les trois longueurs passées à l'instance de la classe forment un triangle plat ou non
	 * @example let triangle = new Triangle();
	 * * triangle.l1 = 2;
	 * * triangle.l2 = 3;
	 * * triangle.l3 = 5
	 * * triangle.isTrueTriangleLongueurs() renvoie true
	 * @example let triangle = new Triangle();
	 * * triangle.l1 = 2;
	 * * triangle.l2 = 3;
	 * * triangle.l3 = 4
	 * * triangle.isTrueTriangleLongueurs() renvoie false
	 */
	function isPlatTriangleLongueurs() {
		if ((typeof self.l1 == "undefined") || (typeof self.l2 == "undefined") || (typeof self.l3 == "undefined")) {
			//return 'L\'une des longueurs de l\'objet triangle n\'est pas définie';
			return false;
		}
		let longueurs = [self.l1,self.l2,self.l3];
		longueurs.sort(function(a,b){
			return calcul(a-b);
		});
		if (longueurs[2] == calcul(longueurs[0]+longueurs[1])) {
			return true;
		} else {
			return false;
		};
	};

	/**
	 * @return {array} Renvoie un booleen selon que les trois angles passés à l'instance de la classe forment un vrai triangle ou non
	 * @example let triangle = new Triangle();
	 * * triangle.a1 = 100;
	 * * triangle.a2 = 40;
	 * * triangle.a3 = 50
	 * * triangle.isTrueTriangleAngles() renvoie false
	 * @example let triangle = new Triangle();
	 * * triangle.a1 = 80;
	 * * triangle.a2 = 40;
	 * * triangle.a3 = 60
	 * * triangle.isTrueTriangleAngles() renvoie true
	 */

	function isTrueTriangleAngles() {
		// si l'un des angles n'est pas defini ça ne va pas
		if ((typeof self.a1 == "undefined") || (typeof self.a2 == "undefined") || (typeof self.a3 == "undefined")) {
			return false;
			//return 'L\'une des longueurs de l\'objet triangle n\'est pas définie';
		}
		// si l'un des angles est négatif ça ne va pas
		if ((self.a1 < 0) || (self.a2 < 0) || (self.a3 < 0)) {
			return false;
			//return 'L\'une des longueurs de l\'objet triangle n\'est pas définie';
		}
		if ((self.a1 + self.a2 + self.a3) == 180) {
			if ((self.a1==0 && self.a2==0) || (self.a2==0 && self.a3==0) || (self.a3==0 && self.a1==0)) {
				return false;
			} else {
				return true;
			};
		} else {
			return false;
		};
	};

	// renvoie un booleen selon que les trois angles forment un triangle plat ou non
	/**
	 * @return {array} Renvoie un booleen selon que les trois angles passés à l'instance de la classe forment un triangle plat ou non
	 * @example let triangle = new Triangle();
	 * * triangle.a1 = 0;
	 * * triangle.a2 = 0;
	 * * triangle.a3 = 180
	 * * triangle.isTrueTriangleAngles() renvoie true
	 * @example let triangle = new Triangle();
	 * * triangle.a1 = 80;
	 * * triangle.a2 = 40;
	 * * triangle.a3 = 60
	 * * triangle.isTrueTriangleAngles() renvoie false
	 */
	function isPlatTriangleAngles() {
		if ((typeof self.a1 == "undefined") || (typeof self.a2 == "undefined") || (typeof self.a3 == "undefined")) {
			return false;
			//return 'L\'une des longueurs de l\'objet triangle n\'est pas définie';
		};
		if ((self.a1 + self.a2 + self.a3) == 180) {
			if ((self.a1==0 && self.a2==0) || (self.a2==0 && self.a3==0) || (self.a3==0 && self.a1==0)) {
				return true;
			} else {
				return false;
			};
		} else {
			return false;
		};
	};

	/**
	 * Méthode non finalisée
	 */
	function isQuelconque() {
		// Vérifier que le triangle existe !!!
		if ( ( ((self.l1!=self.l2) && (self.l1!=self.l3) && (self.l2!=self.l3) ) || ( (self.a1!=self.a2) && (self.a1!=self.a3) && (self.a2!=self.a3) ) ) && ( (self.a1 != 90) || (self.a2 != 90) || (self.a3 != 90) ) ) {
			return true
		} else {
			return false;
		};
	};
	
	this.l1 = l1;
	this.l2 = l2;
	this.l3 = l3;
	this.a1 = a1;
	this.a2 = a2;
	this.a3 = a3;
	//this.nom = nom;
	this.getNom = getNom;
	this.getCotes = getCotes;
	this.getLongueurs = getLongueurs;
	this.getLongueursValeurs = getLongueursValeurs;
	this.getAngles = getAngles;
	this.getAnglesValeurs = getAnglesValeurs;
	this.getSommets = getSommets;
	this.getPerimetre = getPerimetre;
	this.isTrueTriangleLongueurs = isTrueTriangleLongueurs;
	this.isPlatTriangleLongueurs = isPlatTriangleLongueurs;
	this.isTrueTriangleAngles = isTrueTriangleAngles;
	this.isPlatTriangleAngles = isPlatTriangleAngles;
	//this.isQuelconque = isQuelconque;	
};

/**
 * @class
 * @classdesc Classe Relatif - Méthodes utiles sur les relatifs
 * @param {...any} relatifs est un paramètre du reste
 * @author Sébastien Lozano
 */
function Relatif(...relatifs) {
	//'use strict'; pas de use strict avec un paramètre du reste
	var self = this;
	this.relatifs = relatifs;

	/**
	 * * Récupère le signe de chaque relatif déclaré dans le paramètre du reste relatifs, 
	 * * Si 0 fait partie des relatifs on renvoie une erreur
	 * @return {array} Renvoie un tableau de -1 ou 1
	 * @example getSigneNumber(-1,-2,8,-9,4) renvoie [-1,-1,1,-1,1]
	 */
	function getSigneNumber() {		
		let signes = [];
		try {
			// port du string interdit !			
			relatifs.forEach(function(element) {
				if (typeof element == 'string') {
					throw new TypeError(`${element} est un string !`);
				};
				if (element == 0) {
					throw new RangeError(`${element} a été exclu des valeurs possibles.`)
				}
			});	
			// Quoi faire sans nombres ?
			if (relatifs.length == 0) {
				throw new Error(`C'est mieux avec quelques nombres !`)
			};
			relatifs.forEach(function(element){
				if (element < 0) {
					signes.push(-1);
				};
				if (element > 0 ) {
					signes.push(1);
				};
			})
		}
		catch(err) {
			console.log(err.message);	
			console.log(err.stack);		
		}
		finally {
			return signes;
		}
	};

	/** 
	 * * Récupère le signe de chaque relatif déclaré dans le paramètre du reste relatifs
	 * @return {array} Renvoie un tableau de strings valant 'négatif' ou 'positif'
	 * @example getSigneNumber(-1,-2,8,-9,4) renvoie le tableau de strings [négatif,négatif,positif,négatif,positif]
	*/
	function getSigneString() {
		let signesString = [];
		let signes = getSigneNumber();
		signes.forEach(function(element){
			if (element == -1) {
				signesString.push('négatif');
			};
			if ( element == 1) {
				signesString.push('positif');
			};
		});
		return signesString;
	};

	/**
	 * 	 
	 * @param  {...any} n une liste de deux ou plus de nombres relatifs
	 * @return {number} Renvoie le signe du produit des nombres de cette liste. 1 ou -1
	 * @example getSigneProduitNumber(1,-4,-7) renvoie 1
	 */

	function getSigneProduitNumber(...n) {
		let produit = 1;
		try {
			// port du string interdit !			
			n.forEach(function(element) {
				if (typeof element == 'string') {
					throw new TypeError(`${element} est un string !`);
				};
				if (element == 0) {
					throw new RangeError(`${element} a été exclu des valeurs possibles.`);
				};
			});	
			// Quoi faire sans nombres ?
			if (n.length == 0) {
				throw new Error(`C'est mieux avec quelques nombres !`)
			};
			n.forEach(function(element){
				produit = produit * element;	
			});		
			if ( produit < 0 ) {
				return -1;
			};
			if ( produit > 0 ) {
				return 1
			};			
		}
		catch(err) {
			console.log(err.message);	
			console.log(err.stack);		
		};
	};

	/**
	 * 	 
	 * @param  {...any} n une liste de deux ou plus de nombres relatifs
	 * @return {string} Renvoie un string désignant le signe du produit des nombres de cette liste. postif1 ou négatif
	 * @example getSigneProduitNumber(1,-4,-7) renvoie le string positif
	 */

	function getSigneProduitString(...n) {
		let produit = getSigneProduitNumber(...n);
			if ( produit == -1 ) {
				return 'négatif';
			};
			if ( produit == 1 ) {
				return 'positif'
			};			
	};

	/**
	 * 	 
	 * @param  {...any} n une liste de deux ou plus de nombres relatifs
	 * @return {string} Renvoie le nombre d'éléments négatifs des nombres de cette liste.
	 * * la liste d'entiers doit être passé dans un tableau
	 * @example getCardNegatifs([1,-4,-7]) renvoie 2
	 * @example getCardNegatifs([4,-5,7,7,-8,-9]) renvoie 3
	 */

	function getCardNegatifs([...n]) {
		let card = 0;
		try {
			// port du string interdit !			
			n.forEach(function(element) {
				if (typeof element == 'string') {
					throw new TypeError(`${element} est un string !`);
				};
				if (element == 0) {
					throw new RangeError(`${element} a été exclu des valeurs possibles.`);
				};
			});	
			// Quoi faire sans nombres ?
			if (n.length == 0) {
				throw new Error(`C'est mieux avec quelques nombres !`)
			};
			n.forEach(function(element){
				if (element < 0) {
					card = card +1;
				};
			});
			return card;						
		}
		catch(err) {
			console.log(err.message);	
		};
	};
	
	/**
	 * Fonction locale
	 * @param {integer} n un entier désignant le cardinal de facteurs négatifs dans un produit
	 * @return un string au singulier ou au pluriel
	 * @example orth_facteurs_negatifs(0) ou orth_facteurs_negatifs(1) renvoie 'facteur negatif'
	 * @example orth_facteurs_negatifs(7) renvoie 'facteurs negatifs'
	 */
	function orth_facteurs_négatifs(n) {
		if (n>=2) {
			return `facteurs négatifs`;
		} else {
			return `facteur négatif`;
		};
	};

	/** 	 
	 * @param  {...any} n une liste de deux ou plus de nombres relatifs qui constituent les facteurs du produit
	 * @return {string} Renvoie la règle qui permet de justifier le signe d'un produit de relatifs adaptée à la liste passée en paramètre.	 
	 * @example setRegleProduitFacteurs([1,-2,-8,5]) renvoie le string 'Il y a 2 facteurs négatifs, le nombre de facteurs négatifs est pair donc le produit est positif.'
	 */

	function setRegleSigneProduit(...n) {
		try {
			// port du string interdit !			
			n.forEach(function(element) {
				if (typeof element == 'string') {
					throw new TypeError(`${element} est un string !`);
				};
			});	
			// Quoi faire sans nombres ?
			if (n.length == 0) {
				throw new Error(`C'est mieux avec quelques nombres !`)
			};
			if (n.length == 2) {
				if ( getCardNegatifs(n)%2 == 0 ) {
					return `Les deux facteurs ont le même signe donc le produit est positif.`;
				} else {
					return `Les deux facteurs ont un signe différent donc le produit est négatif.`;
				};
			} else if (n.length > 2 ) {
				if ( getCardNegatifs(n)%2 == 0 ) {
					if ( getCardNegatifs(n) == 0 ) {
						return `Tous les facteurs sont positifs donc le produit est positif.`;
					} else {
						return `Il y a ${getCardNegatifs(n)} ${orth_facteurs_négatifs(getCardNegatifs(n))}, le nombre de facteurs négatifs est pair donc le produit est positif.`;
					};						
				} else {
					return `Il y a ${getCardNegatifs(n)} ${orth_facteurs_négatifs(getCardNegatifs(n))}, le nombre de facteurs négatifs est impair donc le produit est négatif.`;
				};
			};
		}
		catch(err) {
			console.log(err.message);	
		};
	};

		/**
	 * 	 
	 * @param  {...any} num une liste de deux ou plus de nombres relatifs qui constituent les facteurs du numérateur
	 * @param  {...any} den une liste de deux ou plus de nombres relatifs qui constituent les facteurs du dénominateur
	 * @return {string} Renvoie la règle qui permet de justifier le signe d'un produit de relatifs adaptée à la liste passée en paramètre.	 
	 * @example setRegleProduitQuotient([1,-2],[-8,5]) renvoie le string 'La somme des facteurs négatifs du numérateur et des facteurs négatifs du dénominateur vaut 2, ce nombre est pair donc le quotient est positif.'
	 */

	function setRegleSigneQuotient(...n) {
		try {
			// port du string interdit !			
			n.forEach(function(element) {
				if (typeof element == 'string') {
					throw new TypeError(`${element} est un string !`);
				};
			});	
			// Quoi faire sans nombres ?
			if (n.length == 0) {
				throw new Error(`C'est mieux avec quelques nombres !`)
			};
			if (n.length == 2)  {
				if ( getCardNegatifs(n)%2 == 0 ) {
					return `Le numérateur et le dénominateur ont le même signe donc le quotient est positif.`;
				} else {
					return `Les numérateur et le dénominateur ont un signe différent donc le quotient est négatif.`;
				};
			} else if (n.length > 2) {
				if ( getCardNegatifs(n)%2 == 0 ) {
					if ( getCardNegatifs(n) == 0 ) {
						return `Tous les facteurs du numérateur et tous les facteurs du dénominateur sont positifs donc le quotient est positif.`;
					} else {						
						//return `La somme du nombre de facteurs négatifs du numérateur et du nombre de facteurs négatifs du dénominateur vaut ${getCardNegatifs(n)}, ce nombre est pair donc le quotient est positif.`;
						return `Quand on compte les facteurs négatifs du numérateur et du dénominateur, on trouve ${getCardNegatifs(n)}, ce nombre est pair donc le quotient est positif.`;
					};						
				} else {
					//return `La somme du nombre de facteurs négatifs du numérateur et du nombre de facteurs négatifs du dénominateur vaut ${getCardNegatifs(n)}, ce nombre est impair donc le quotient est négatif.`;
					return `Quand on compte les facteurs négatifs du numérateur et du dénominateur, on trouve ${getCardNegatifs(n)}, ce nombre est impair donc le quotient est négatif.`;
				};
			};
		}
		catch(err) {
			console.log(err.message);	
		};
	};

	this.getSigneNumber = getSigneNumber;
	this.getSigneString = getSigneString;
	this.getSigneProduitNumber = getSigneProduitNumber;
	this.getSigneProduitString = getSigneProduitString;
	this.getCardNegatifs = getCardNegatifs;
	this.setRegleSigneProduit = setRegleSigneProduit;
	this.setRegleSigneQuotient = setRegleSigneQuotient;

};

/**
 * @class ListeFraction
 * @classdesc Classe Fraction - Méthodes utiles sur les collections de fractions
 * @author Sébastien Lozano
 */

 function ListeFraction() {
	 //'use strict'; pas de use strict avec un paramètre du reste
	 var self = this;
	 /**
	  * @constant {array} denominateurs_amis tableau de tableaux de dénominateurs qui vont bien ensemble pour les calculs
	  * le tableau [12,2,3,4,6] faisait planter 4C25-0
	  */
	 //let denominateurs_amis = [[12,2,3,4,6],[16,2,4,8],[18,2,3,6,9],[20,2,4,5,10],[24,2,3,4,8,12],[30,2,3,5,6],[32,2,16,4,8],[36,2,18,4,9],[40,2,20,4,10,5,8]]
	 let denominateurs_amis = [[16,2,4,8],[18,2,3,6,9],[20,2,4,5,10],[24,2,3,4,8,12],[30,2,3,5,6],[32,2,16,4,8],[36,2,18,4,9],[40,2,20,4,10,5,8]]

	/**
	 * 
	 * @param  {...any} fractions contient la liste des numérateurs et denominateurs dans l'ordre n1,d1,n2,d2, ... de deux ou plus de fractions
	 * @return {array} renvoie un tableau avec les numérateurs et les dénominateurs triés selon la croissance des quotients [n_frac_min,d_frac_min,...,n_frac_max,d_frac_max]
	 * @example sortFraction(1,2,1,5,1,4,1,3) renvoie [1,5,1,4,1,3,1,2] 
	 */
	function sortFractions(...fractions) {
		try {		
			fractions.forEach(function(element) {
				if (typeof element != 'number') {
					throw new TypeError(`${element} n'est pas un nombre !`);
				};
				if ( (fractions.indexOf(element)%2 == 1) && (element == 0)) {
					throw new RangeError(`${element} est exclu des valeurs possibles pour les dénominateurs !`)
				};
			});	
			if (Math.floor(fractions.length/2) <= 1 ) {
				throw new Error(`Il faut au moins deux fractions !`);
			};
			if (fractions.length%2 != 0) {
				throw new Error(`Il faut un nombre pair de valeurs puisque q'une fraction est représentée par son numérateur et son dénominateur`);
			};
			let changed;
			do{
			 	changed = false;
			 	for (let i=0; i<(fractions.length-1); i+=2) {
					if ((fractions[i]/fractions[i+1]) > (fractions[i+2]/fractions[i+3])) {
						let tmp = [fractions[i],fractions[i+1]];
						fractions[i]=fractions[i+2];
						fractions[i+1] = fractions[i+3];
						fractions[i+2] = tmp [0];
						fractions[i+3] = tmp[1];
						changed = true;
					};
				 };
			} while(changed);
			return fractions;
		}
		catch (e) {
			console.log(e.message);
		};
	};

	/**
	 * fonction locale pour trouver le ppcm d'un nombre indeterminé d'entiers
	 * @param  {integer} n parametre du reste contenant une liste d'entiers
	 * * la liste d'entiers doit être passé dans un tableau
	 * @return {number} renvoie le ppcm des nombres entiers passés dans le paramètre du reste n
	 * @example ppcm(2,6,4,15) renvoie 60
	 */
	function ppcm([...n]) {
		try {
			n.forEach(function(element) {
				if (typeof element != 'number') {
					throw new TypeError(`${element} n'est pas un nombre !`);
				};
			});
			// Quoi faire sans nombres ?
			if (n.length == 0) {
				throw new Error(`C'est mieux avec quelques nombres !`)
			};
			return parseInt(Algebrite.run(`lcm(${n})`));

		}
		catch (e) {
			console.log(e.message);
		};
	};

	/**
	 * 
	 * @param  {...any} fractions contient la liste des numérateurs et des dénominateurs dans l'ordre n1,d1,n2,d2, ... de deux ou plus de fractions
	 * @return {array} renvoie un tableau de numérateurs et de dénominateurs avec le même dénominateur dans l'ordre initial.
	 * * Le dénominateur choisi est toujours le ppcm
	 * * Les fractions ne sont pas réduites
	 * @example reduceSameDenominateur(1,2,1,5,2,3) renvoie [15,30,6,30,20,30]
	 */
	function reduceSameDenominateur(...fractions) {
		try {		
			fractions.forEach(function(element) {
				if (typeof element != 'number') {
					throw new TypeError(`${element} n'est pas un nombre !`);
				};
				if ( (fractions.indexOf(element)%2 == 1) && (element == 0)) {
					throw new RangeError(`${element} est exclu des valeurs possibles pour les dénominateurs !`)
				};
			});	
			if (Math.floor(fractions.length/2) <= 1 ) {
				throw new Error(`Il faut au moins deux fractions !`);
			};
			if (fractions.length%2 != 0) {
				throw new Error(`Il faut un nombre pair de valeurs puisque q'une fraction est représentée par son numérateur et son dénominateur`);
			};
			let denominateur_commun;
			let liste_denominateurs = [];
			for (let i=0; i<fractions.length-1; i+=2) {
				liste_denominateurs.push(fractions[i+1]);
			};
			denominateur_commun = ppcm(liste_denominateurs);
			let fractions_reduites = [];
			for (let i=0; i<fractions.length-1; i+=2) {
				//on calcule le nouveau numérateur
				fractions_reduites.push(fractions[i]*denominateur_commun/fractions[i+1]);
				fractions_reduites.push(denominateur_commun);
			};

			//return [fractions,'-',liste_denominateurs,'-',denominateur_commun,'-',fractions_reduites];
			return fractions_reduites;

		}
		catch (e) {
			console.log(e.message);
		};
	};

	/**
	 * **ATTENTION Fonction clonée dans la boîte à outils**
	* @return Retourne le numérateur et le dénominateur de la fraction passée en argument sous la forme (numérateur,dénominateur)réduite au maximum dans un tableau [numérateur,dénominateur]
	* @author Rémi Angot
	*/
	function fraction_simplifiee(n,d){ 
		let p=pgcd(n,d);
		let ns = n/p;
		let ds = d/p;
		if (ns<0 && ds<0) {
			[ns,ds] = [-ns,-ds]
		}
		if (ns>0 && ds<0) {
			[ns,ds] = [-ns,-ds]
		}
		return [ns,ds];
	}

	this.sortFractions = sortFractions;
	this.reduceSameDenominateur = reduceSameDenominateur;
	this.denominateurs_amis = denominateurs_amis;
	this.fraction_simplifiee = fraction_simplifiee;
	

 };

 /**
  * @constructor Construit un objet Fraction(a,b)
  * @param {integer} a 
  * @param {integer} b 
  */
 function fraction (a,b) {
    return new Fraction(a,b)
}

/**
 * @constant {object} Frac objet générique pour accéder à tout moment aux méthodes et proprétés de la classe Fraction()
 */

let Frac = new Fraction();

/**
 * @class
 * @classdesc Méthodes utiles sur les fractions
 * @param {number} num numérateur
 * @param {number} den dénominateur
 * @author Jean-Claude Lhote et Sébastien Lozano
 */

function Fraction(num,den) {
	/**
	 * @property {integer} numérateur optionnel, par défaut la valeur vaut 0
	 */
	this.num = num || 0;
	/**
	 * @property {integer} dénominateur optionnel, par défaut la valeur vaut 1
	 */
	this.den=den || 1;
	/**
	 * numIrred est le numérateur réduit
	 * denIrredest le dénominateur réduit
	 */
    this.numIrred=fraction_simplifiee(this.num,this.den)[0]
	this.denIrred=fraction_simplifiee(this.num,this.den)[1]
	this.pourcentage=calcul(this.numIrred*100/this.denIrred)
	/**
	 * @return {object} La fraction "complexifiée" d'un rapport k
	 * @param {number} k Le nombre par lequel, le numérateur et le dénominateur sont multipliés.
	 */
	this.fractionEgale = function(k){
		return fraction(calcul(this.numIrred*k),calcul(this.denIrred*k))
	}   
	this.simplifie=function() {
		return fraction(this.numIrred,this.denIrred)
	}
	/**
	 * @return {object} L'opposé de la fraction
	 */
    this.oppose = function(){
        return fraction(-this.num,this.den)
	}
	/**
	 * @return {object]} L'opposé de la fracion réduite
	 */
    this.opposeIrred = function(){
        return fraction(-this.numIrred,this.denIrred)
    }
	/**
	 * @return {object]} L'inverse de la fraction
	 */
    this.inverse = function(){
        return fraction(this.den,this.num)
	}
	/**
	 * @return {object} L'inverse de la fraction simplifiée
	 */
    this.inverseIrred = function(){
        return fraction(this.denIrred,this.numIrred)
	}
	/**
	 * @return {object} La somme des fractions
	 * @param {object} f2 La fraction qui s'ajoute
	 */
    this.sommeFraction =function(f2) {
        return fraction(this.num*f2.den+f2.num*this.den,this.den*f2.den)
	}
	/**
	 * @return {object} La somme de toutes les fractions
	 * @param  {...any} fractions Liste des fractions à ajouter à la fraction
	 */
    this.sommeFractions = function(...fractions){
        let s=fraction(this.num,this.den)
        for (let f of fractions) {
            s=s.sommeFraction(f)
        }
        return s
	}
	/**
	 * @return {object} Le produit des deux fractions
	 * @param {object} f2  LA fraction par laquelle est multipliée la fraction
	 */
    this.produitFraction = function(f2) {
        return fraction(this.num*f2.num,this.den*f2.den)
	}
	/**
	 * @return {object} La puissance n de la fraction
	 * @param {integer} n l'exposant de la fraction 
	 */
    this.puissanceFraction = function(n) {
        return fraction(this.num**n,this.den**n)
	}
	/**
	 * @param  {...any} fractions Les fractions qui multiplient la fraction
	 * @return Le produit des fractions
	 */
    this.produitFractions = function(...fractions){
        let p=fraction(this.num,this.den)
        for (let f of fractions) {
            p=p.produitFraction(f)
    }
        return p
	}
	/**
	 * @param {object} f2 est la fracion qui est soustraite de la fraction
	 * @return {objet} La différence des deux fractions
	 */
    this.differenceFraction = function(f2) {
        return this.sommeFraction(f2.oppose())
	}

/**
 * @return {object}  Renvoie une fraction avec comme dénominateur une puissance de 10 ou 'NaN' si la fraction n'a pas de valeur décimale
 */
	this.fractionDecimale = function(){
		let den=this.denIrred
		let num=this.numIrred
		let liste=obtenir_liste_facteurs_premiers(den)
		let n2=0,n5=0
		for (let n of liste) {
			if (n==2) n2++
			else if (n==5) n5++
			else return 'NaN'
		}
		if (n5==n2) return fraction(this.numIrred,this.fractionDecimale.denIrred)
		else if (n5>n2) return fraction(this.numIrred*2**(n5-n2),this.denIrred*2**(n5-n2))
		else return fraction(this.numIrred*5**(n2-n5),this.denIrred*5**(n2-n5))
	}
	/**
	 * @return {number} La valeur décimale de la fraction
	 */
	this.valeurDecimale = function(){
		if (this.fractionDecimale()!='NaN') return calcul(this.fractionDecimale().num/this.fractionDecimale().den)
		else return `Ce n\'est pas un nombre décimal`
	}
	/**
	 * @return {string} Code Latex de la fraction
	 */
	this.texFraction = function(){
		return tex_fraction_signe(this.num,this.den)
	}
	/**
	 * @return {string} code Latex de lafraction simplifiée
	 */
	this.texFractionSimplifiee = function(){
		return tex_fraction_signe(this.numIrred,this.denIrred)
	}
    /**
     * 
     * @param {integer} n entier par lequel multiplier la fraction 
     * @return {object} fraction multipliée par n
     */
    this.multiplieEntier = function(n) {
        return fraction(n*this.num,this.den);
    };

        /**
     * 
     * @param {integer} n entier par lequel multiplier la fraction 
     * @return {object} fraction multipliée par n simplifiée
     */
    this.multiplieEntierIrred = function(n) {
        return fraction(fraction_simplifiee(n*this.num,this.den)[0],fraction_simplifiee(n*this.num,this.den)[1]);
	};
	/**
	 * @return fraction divisée par n
	 * @param {integer} n entier qui divise la fraction 
	 */
	this.entierDivise=function(n){
		return fraction(this.num,n*this.den)
	}
	/**
	 * @return fraction divisée par n et réduite si possible
	 * @param {integer} n entier qui divise la fraction 
	 */
	this.entierDiviseIrred=function(n){
		return fraction(fraction(this.num,n*this.den).numIrred,fraction(this.num,n*this.den).denIrred)
	}
	/**
	 * @return {object} la fraction augmentée de n
	 * @param {integer} n entier à ajouter à la fraction 
	 */
	this.ajouteEntier=function(n){
		return fraction(this.num+this.den*n,this.den)
	}
/**
 * @return {object} n moins la fraction
 * @param {integer} n l'entier duqel on soustrait la fraction 
 */
	this.entierMoinsFraction=function(n){
		return (fraction(n*this.den-this.num,this.den))
	}
    /**
     * 
     * @param {number} depart N° de la première part coloriée (0 correspond à la droite du centre) 
     * @param {*} type 'gateau' ou 'segment' ou 'barre'
     */
	this.representationIrred = function (x, y, rayon, depart = 0, type = 'gateau', couleur = 'gray') {
		let objets = [], n, num, k, dep, s, a, O, C
		n = quotientier(this.numIrred, this.denIrred)
		num = this.numIrred
		unegraduation=function(x,y,couleur='black',epaisseur=1){
			let A=point(x,y+0.2)
			let B=point(x,y-0.2)
			let g=segment(A,B)
			g.color=couleur
			g.epaisseur=epaisseur
			return g
		}
		if (type == 'gateau') {
			for (k = 0; k < n; k++) {
				O = point(x + k * 2 * (rayon + 0.5), y)
				C = cercle(O, rayon)
				objets.push(C)
				for (let i = 0; i < this.denIrred; i++) {
					s = segment(O, rotation(point(x + rayon + k * 2 * (rayon + 0.5), y), O, i * 360 / this.denIrred))
					objets.push(s)
				}
				dep = rotation(point(x + rayon + k * 2 * (rayon + 0.5), y), O, depart * 360 / this.denIrred)
				for (let j = 0; j < Math.min(this.denIrred, num); j++) {
					a = arc(dep, O, 360 / this.denIrred, true, fill = couleur)
					a.opacite = 0.3
					dep = rotation(dep, O, 360 / this.denIrred)
					objets.push(a)
				}
				num -= this.denIrred
			}
			if (this.num%this.den!=0) { 
				O = point(x + k * 2 * (rayon + 0.5), y)
				C = cercle(O, rayon)
				objets.push(C)
				for (let i = 0; i < this.denIrred; i++) {
					s = segment(O, rotation(point(x + rayon + k * 2 * (rayon + 0.5), y), O, i * 360 / this.denIrred))
					objets.push(s)
				}
				dep = rotation(point(x + rayon + k * 2 * (rayon + 0.5), y), O, depart * 360 / this.denIrred)
				for (let j = 0; j < Math.min(this.denIrred, num); j++) {
					a = arc(dep, O, 360 / this.denIrred, true, fill = couleur)
					a.opacite = 0.3
					dep = rotation(dep, O, 360 / this.denIrred)
					objets.push(a)
				}
			}
		}
		else if (type == 'segment') {
			for (k = 0; k < n; k++) {
				O = point(x + k *rayon, y)
				C = translation(O, vecteur(rayon, 0))
				s = segment(O, C)
				s.styleExtremites = '-|'
				objets.push(s)
				for (let i = 0; i < this.denIrred; i++) {
					s = segment(translation(O, vecteur(i * rayon / this.denIrred, 0)), translation(O, vecteur((i + 1) * rayon / this.denIrred, 0)))
					s.styleExtremites = '|-'
					objets.push(s)
				}
				a = segment(O, point(O.x + Math.min(num, this.denIrred) * rayon / this.denIrred, O.y))
				a.color = couleur
				a.opacite = 0.4
				a.epaisseur = 4
				objets.push(a)
				num -= this.denIrred
			}
			O = point(x + k * rayon, y)
			C = translation(O, vecteur(rayon, 0))
			s = segment(O, C)
			s.styleExtremites = '-|'
			objets.push(s)
			for (let i = 0; i < this.denIrred; i++) {
				s = segment(translation(O, vecteur(i * rayon / this.denIrred, 0)), translation(O, vecteur((i + 1) * rayon / this.denIrred, 0)))
				s.styleExtremites = '|-'
				objets.push(s)
			}
			a = segment(O, point(O.x + Math.min(num, this.denIrred) * rayon / this.denIrred, O.y))
			a.color = couleur
			a.opacite = 0.4
			a.epaisseur = 4
			objets.push(a)
			objets.push(unegraduation(x,y),texteParPosition(unite0,x,y-0.6,'milieu','blue',scale),texteParPosition(unite1,x+rayon,y-0.6,'milieu','blue',scale))

		}
		else {
			let diviseur
			if (this.denIrred % 3 == 0) diviseur = 3
			else if (this.denIrred % 2 == 0) diviseur = 2
			else diviseur = 1

			for (k = 0; k < n; k++) {
				for (let j = 0; j < diviseur; j++) {
					for (let h = 0; h < calcul(this.denIrred / diviseur); h++) {
						O = point(x + k * (rayon + 1)+j*rayon/diviseur, y + h * rayon / diviseur)
						C = translation(O, vecteur(rayon / diviseur, 0))
						dep = carre(O, C)
						dep.color = 'black'
						dep.couleurDeRemplissage = couleur
						dep.opaciteDeRemplissage=0.4
						objets.push(dep)
					}
				}
				num -= this.denIrred
			}
			if (num>0) {
				for (let j = 0; j < diviseur; j++) {
					for (let h = 0; h < calcul(this.denIrred / diviseur); h++) {
						O = point(x + k * (rayon + 1)+j*rayon/diviseur, y + h * rayon / diviseur)
						C = translation(O, vecteur(rayon / diviseur, 0))
						dep = carre(O, C)
						dep.color = 'black'
						objets.push(dep)
					}
				}
				for (let i = 0; i < num; i++) {
				O = point(x + k * (rayon + 1) + (i % diviseur) * rayon / diviseur, y + quotientier(i, diviseur) * rayon / diviseur)
				C = translation(O, vecteur(rayon / diviseur, 0))
				dep = carre(O, C)
				dep.color = 'black'
				dep.couleurDeRemplissage = couleur
				dep.opaciteDeRemplissage=0.4
				objets.push(dep)
			}
		}
		}
		return objets
	}
	this.representation = function (x, y, rayon, depart = 0, type = 'gateau', couleur = 'gray',unite0=0,unite1=1,scale=1) {
		let objets = [], n, num, k, dep, s, a, O, C
		n = quotientier(this.num, this.den)
		num = this.num
		unegraduation=function(x,y,couleur='black',epaisseur=1){
			let A=point(x,y+0.2)
			let B=point(x,y-0.2)
			let g=segment(A,B)
			g.color=couleur
			g.epaisseur=epaisseur
			return g
		}
		if (type == 'gateau') {
			k, dep
			for (k = 0; k < n; k++) {
				let O = point(x + k * 2 * (rayon + 0.5), y)
				let C = cercle(O, rayon)
				objets.push(C)
				let s, a
				for (let i = 0; i < this.den; i++) {
					s = segment(O, rotation(point(x + rayon + k * 2 * (rayon + 0.5), y), O, i * 360 / this.den))
					objets.push(s)
				}
				dep = rotation(point(x + rayon + k * 2 * (rayon + 0.5), y), O, depart * 360 / this.den)
				for (let j = 0; j < Math.min(this.den, num); j++) {
					a = arc(dep, O, 360 / this.den, true, fill = couleur)
					a.opacite = 0.3
					dep = rotation(dep, O, 360 / this.den)
					objets.push(a)
				}
				num -= this.den
			}
			if (this.num%this.den!=0) { 
				let O = point(x + k * 2 * (rayon + 0.5), y)
				let C = cercle(O, rayon)
				objets.push(C)
				for (let i = 0; i < this.den; i++) {
					s = segment(O, rotation(point(x + rayon + k * 2 * (rayon + 0.5), y), O, i * 360 / this.den))
					objets.push(s)
				}
			
				dep = rotation(point(x + rayon + k * 2 * (rayon + 0.5), y), O, depart * 360 / this.den)
				if (this.num%this.den!=0) for (let j = 0; j < Math.min(this.den, num); j++) {
					a = arc(dep, O, 360 / this.den, true, fill = couleur)
					a.opacite = 0.3
					dep = rotation(dep, O, 360 / this.den)
					objets.push(a)
				}
			}
		}
		else if (type == 'segment') {
			for (k = 0; k < n; k++) {
				O = point(x + k * rayon, y)
				C = translation(O, vecteur(rayon, 0))
				s = segment(O, C)
				s.styleExtremites = '-|'
				objets.push(s)
				for (let i = 0; i < this.den; i++) {
					s = segment(translation(O, vecteur(i * rayon / this.den, 0)), translation(O, vecteur((i + 1) * rayon / this.den, 0)))
					s.styleExtremites = '|-'
					objets.push(s)
				}
				a = segment(O, point(O.x + Math.min(num, this.den) * rayon / this.den, O.y))
				a.color = couleur
				a.opacite = 0.4
				a.epaisseur = 4
				objets.push(a)
				num -= this.den
			}
			O = point(x + k * rayon , y)
			C = translation(O, vecteur(rayon, 0))
			s = segment(O, C)
			s.styleExtremites = '-|'
			objets.push(s)
			for (let i = 0; i < this.den; i++) {
				s = segment(translation(O, vecteur(i * rayon / this.den, 0)), translation(O, vecteur((i + 1) * rayon / this.den, 0)))
				s.styleExtremites = '|-'
				objets.push(s)
			}
			a = segment(O, point(O.x + Math.min(num, this.den) * rayon / this.den, O.y))
			a.color = couleur
			a.opacite = 0.4
			a.epaisseur = 4
			objets.push(a)
			objets.push(unegraduation(x,y),texteParPosition(unite0,x,y-0.6,'milieu','blue',scale),texteParPosition(unite1,x+rayon,y-0.6,'milieu','blue',scale))

		}
		else { //Type bâtons
			let diviseur
			if (this.den % 3 == 0) diviseur = 3
			else if (this.den % 2 == 0) diviseur = 2
			else diviseur = 1

			for (k = 0; k < n; k++) {
				for (let j = 0; j < diviseur; j++) {
					for (let h = 0; h < calcul(this.den / diviseur); h++) {
						O = point(x + k * (rayon + 1)+j*rayon/diviseur, y + h * rayon / diviseur)
						C = translation(O, vecteur(rayon / diviseur, 0))
						dep = carre(O, C)
						dep.color = 'black'
						dep.couleurDeRemplissage = couleur
						dep.opaciteDeRemplissage=0.4
						objets.push(dep)
					}
				}
				num -= this.den
			}
			if (num>0) {
				for (let j = 0; j < diviseur; j++) {
					for (let h = 0; h < calcul(this.den / diviseur); h++) {
						O = point(x + k * (rayon + 1)+j*rayon/diviseur, y + h * rayon / diviseur)
						C = translation(O, vecteur(rayon / diviseur, 0))
						dep = carre(O, C)
						dep.color = 'black'
						objets.push(dep)
					}
				}
				for (let i = 0; i < num; i++) {
				O = point(x + k * (rayon + 1) + (i % diviseur) * rayon / diviseur, y + quotientier(i, diviseur) * rayon / diviseur)
				C = translation(O, vecteur(rayon / diviseur, 0))
				dep = carre(O, C)
				dep.color = 'black'
				dep.couleurDeRemplissage = couleur
				dep.opaciteDeRemplissage=0.4
				objets.push(dep)
			}
		}
		}
		return objets
	}


}

// Gestion des styles LaTeX

/**
* Renvoie un texte avec le préambule d'un fichier LaTeX
* @param {string} Le titre de l'entête 
* @author Rémi Angot
*/
function intro_LaTeX(entete = "Exercices") {
	if (entete=='') {entete='Exercices'}
		return `\\documentclass[12pt]{article}
\\usepackage[left=1.5cm,right=1.5cm,top=2cm,bottom=2cm]{geometry}
\\usepackage[utf8]{inputenc}		        
\\usepackage[T1]{fontenc}		
\\usepackage[french]{babel}
\\usepackage{multicol} 					
\\usepackage{calc} 						
\\usepackage{enumerate}
\\usepackage{enumitem}
\\usepackage{graphicx}				
\\usepackage{tabularx}
\\usepackage[autolanguage]{numprint}
\\usepackage{hyperref}
\\usepackage{amsmath,amsfonts,amssymb,mathrsfs} 
\\usepackage{cancel}
\\usepackage{textcomp}
\\usepackage{gensymb}
\\usepackage{eurosym}
\\DeclareUnicodeCharacter{20AC}{\\euro{}}
\\usepackage{fancyhdr,lastpage}          	
\\pagestyle{fancy}                      	
\\usepackage{fancybox}					
\\usepackage{setspace}	
\\usepackage{xcolor}
	\\definecolor{nombres}{cmyk}{0,.8,.95,0}
	\\definecolor{gestion}{cmyk}{.75,1,.11,.12}
	\\definecolor{gestionbis}{cmyk}{.75,1,.11,.12}
	\\definecolor{grandeurs}{cmyk}{.02,.44,1,0}
	\\definecolor{geo}{cmyk}{.62,.1,0,0}
	\\definecolor{algo}{cmyk}{.69,.02,.36,0}
\\definecolor{correction}{cmyk}{.63,.23,.93,.06}
\\usepackage{pgf,tikz}					
\\usetikzlibrary{babel,arrows,calc,fit,patterns,plotmarks,shapes.geometric,shapes.misc,shapes.symbols,shapes.arrows,
shapes.callouts, shapes.multipart, shapes.gates.logic.US,shapes.gates.logic.IEC, er, automata,backgrounds,chains,topaths,trees,petri,mindmap,matrix, calendar, folding,fadings,through,positioning,scopes,decorations.fractals,decorations.shapes,decorations.text,decorations.pathmorphing,decorations.pathreplacing,decorations.footprints,decorations.markings,shadows}


\\setlength{\\parindent}{0mm}		
\\renewcommand{\\arraystretch}{1.5}	
\\newcounter{exo}          				
\\setcounter{exo}{0}   				
\\newcommand{\\exo}[1]{				
	\\stepcounter{exo}        		
	\\subsection*{Exercice \\no{\\theexo} \\textmd{\\normalsize #1}}
}
\\renewcommand{\\labelenumi}{\\textbf{\\theenumi{}.}}	
\\renewcommand{\\labelenumii}{\\textbf{\\theenumii{}.}}	
\\newcommand{\\version}[1]{\\fancyhead[R]{Version #1}}
\\setlength{\\fboxsep}{3mm}
\\newenvironment{correction}{\\newpage\\fancyhead[C]{\\textbf{Correction}}\\setcounter{exo}{0}}{}
\\fancyhead[C]{\\textbf{${entete}}}
\\fancyfoot{}
\\fancyfoot[R]{\\scriptsize Coopmaths.fr -- CC-BY-SA}
\\setlength{\\headheight}{14.5pt}

${preambule_personnalise(liste_packages)}


\\begin{document}

`
	}

/**
* Renvoie un texte avec le préambule d'un fichier LaTeX avec le style CoopMaths
* @author Rémi Angot
*/
	function intro_LaTeX_coop(){

		let intro_LaTeX_coop = `\\documentclass[12pt]{article}
\\usepackage[left=1.5cm,right=1.5cm,top=4cm,bottom=2cm]{geometry}
\\usepackage[utf8]{inputenc}		        
\\usepackage[T1]{fontenc}		
\\usepackage[french]{babel}
\\usepackage{hyperref}
\\usepackage{multicol} 					
\\usepackage{calc} 						
\\usepackage{enumerate}
\\usepackage{enumitem}
\\usepackage{graphicx}				
\\usepackage{tabularx}
\\usepackage[autolanguage]{numprint}			
\\usepackage{amsmath,amsfonts,amssymb,mathrsfs} 
\\usepackage{cancel}
\\usepackage{textcomp}
\\usepackage{gensymb}
\\usepackage{eurosym}
\\DeclareUnicodeCharacter{20AC}{\\euro{}}
\\usepackage{fancyhdr,lastpage}          	
\\pagestyle{fancy}                      	
\\usepackage{fancybox}					
\\usepackage{setspace}
\\usepackage{xcolor}
\\usepackage{pgf,tikz}					% Pour les images et figures gÃ©omÃ©triques
\\usetikzlibrary{babel,arrows,calc,fit,patterns,plotmarks,shapes.geometric,shapes.misc,shapes.symbols,shapes.arrows,
shapes.callouts, shapes.multipart, shapes.gates.logic.US,shapes.gates.logic.IEC, er, automata,backgrounds,chains,topaths,trees,petri,mindmap,matrix, calendar, folding,fadings,through,positioning,scopes,decorations.fractals,decorations.shapes,decorations.text,decorations.pathmorphing,decorations.pathreplacing,decorations.footprints,decorations.markings,shadows}

\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}
\\fancyhead[L]{}
\\fancyhead[R]{}

%%% COULEURS %%%

\\definecolor{nombres}{cmyk}{0,.8,.95,0}
\\definecolor{gestion}{cmyk}{.75,1,.11,.12}
\\definecolor{gestionbis}{cmyk}{.75,1,.11,.12}
\\definecolor{grandeurs}{cmyk}{.02,.44,1,0}
\\definecolor{geo}{cmyk}{.62,.1,0,0}
\\definecolor{algo}{cmyk}{.69,.02,.36,0}
\\definecolor{correction}{cmyk}{.63,.23,.93,.06}
\\usepackage{colortbl}
\\arrayrulecolor{couleur_theme}		% Couleur des filets des tableaux

%%% MISE EN PAGE %%%

\\setlength{\\parindent}{0mm}		
\\renewcommand{\\arraystretch}{1.5}	
\\renewcommand{\\labelenumi}{\\textbf{\\theenumi{}.}}	
\\renewcommand{\\labelenumii}{\\textbf{\\theenumii{}.}}	
\\setlength{\\fboxsep}{3mm}

\\setlength{\\headheight}{14.5pt}

\\spaceskip=2\\fontdimen2\\font plus 3\\fontdimen3\\font minus3\\fontdimen4\\font\\relax %Pour doubler l'espace entre les mots
\\newcommand{\\numb}[1]{ % Dessin autour du numéro d'exercice
\\begin{tikzpicture}[overlay,yshift=-.3cm,scale=.8]
\\draw[fill=couleur_numerotation,couleur_numerotation](-.3,0)rectangle(.5,.8);
\\draw[line width=.05cm,couleur_numerotation,fill=white] (0,0)--(.5,.5)--(1,0)--(.5,-.5)--cycle;
\\node[couleur_numerotation]  at (.5,0) { \\large \\bfseries #1};
\\draw (-.4,.8) node[white,anchor=north west]{\\bfseries EX}; 
\\end{tikzpicture}
}

%%% NUMEROS DES EXERCICES %%%

\\usepackage{titlesec} % Le titre de section est un numéro d'exercice avec sa consigne alignée à gauche.
\\titleformat{\\section}{}{\\numb{\\arabic{section}}}{1cm}{\\hspace{0em}}{}
\\newcommand{\\exo}[1]{ % Un exercice est une nouvelle section avec la consigne écrite en caractêres normaux
	\\section{\\textmd{#1}}
	\\medskip
}


%%% ENVIRONNEMENTS - CADRES %%%
\\usepackage[framemethod=tikz]{mdframed}

\\newmdenv[linecolor=couleur_theme, linewidth=3pt,topline=true,rightline=false,bottomline=false,frametitlerule=false,frametitlefont={\\color{couleur_theme}\\bfseries},frametitlerulewidth=1pt]{methode}


\\newmdenv[startcode={\\setlength{\\multicolsep}{0cm}\\setlength{\\columnsep}{.2cm}\\setlength{\\columnseprule}{0pt}\\vspace{0cm}},linecolor=white, linewidth=3pt,innerbottommargin=10pt,innertopmargin=5pt,innerrightmargin=20pt,splittopskip=20pt,splitbottomskip=10pt,everyline=true,tikzsetting={draw=couleur_theme,line width=4pt,dashed,dash pattern= on 10pt off 10pt},frametitleaboveskip=-.6cm,frametitle={\\tikz\\node[anchor= east,rectangle,fill=white]{\\textcolor{couleur_theme}{\\raisebox{-.3\\height}{}\\; \\bfseries \\Large Objectifs}};}]{objectif}

\\newmdenv[startcode={\\colorlet{couleur_numerotation}{correction}\\renewcommand{\\columnseprulecolor}{\\color{correction}}
\\setcounter{section}{0}\\arrayrulecolor{correction}},linecolor=white, linewidth=4pt,innerbottommargin=10pt,innertopmargin=5pt,splittopskip=20pt,splitbottomskip=10pt,everyline=true,frametitle=correction,tikzsetting={draw=correction,line width=3pt,dashed,dash pattern= on 15pt off 10pt},frametitleaboveskip=-.4cm,frametitle={\\tikz\\node[anchor= east,rectangle,fill=white]{\\; \\textcolor{correction}{\\raisebox{-.3\\height}{}\\; \\bfseries \\Large Corrections}};}]{correction}

\\newmdenv[roundcorner=0,linewidth=0pt,frametitlerule=false, backgroundcolor=gray!40,leftmargin=8cm]{remarque}

% echelle pour le dé
\\def \\globalscale {0.04}
% abscisse initiale pour les chevrons
\\def \\xini {3}

\\newcommand{\\theme}[4]
{
	%\\theme{nombres|gestion|grandeurs|geo|algo}{Texte (entrainement, évaluation, mise en route...}{numéro de version ou vide}{titre du thême et niveau}
	\\fancyhead[C]{
		%Tracé du dé
		\\begin{tikzpicture}[y=0.80pt, x=0.80pt, yscale=-\\globalscale, xscale=\\globalscale,remember picture, overlay, shift={(current page.north west)},xshift=17cm,yshift=9.5cm,fill=couleur_theme]
			%%%%Arc supérieur gauche%%%%
			\\path[fill](523,1424)..controls(474,1413)and(404,1372)..(362,1333)..controls(322,1295)and(313,1272)..(331,1254)..controls(348,1236)and(369,1245)..(410,1283)..controls(458,1328)and(517,1356)..(575,1362)..controls(635,1368)and(646,1375)..(643,1404)..controls(641,1428)and(641,1428)..(596,1430)..controls(571,1431)and(538,1428)..(523,1424)--cycle;
			%%%%Dé face supérieur%%%%
			\\path[fill](512,1272)..controls(490,1260)and(195,878)..(195,861)..controls(195,854)and(198,846)..(202,843)..controls(210,838)and(677,772)..(707,772)..controls(720,772)and(737,781)..(753,796)..controls(792,833)and(1057,1179)..(1057,1193)..controls(1057,1200)and(1053,1209)..(1048,1212)..controls(1038,1220)and(590,1283)..(551,1282)..controls(539,1282)and(521,1278)..(512,1272)--cycle;
			%%%%Dé faces gauche et droite%%%%
			\\path[fill](1061,1167)..controls(1050,1158)and(978,1068)..(900,967)..controls(792,829)and(756,777)..(753,756)--(748,729)--(724,745)..controls(704,759)and(660,767)..(456,794)..controls(322,813)and(207,825)..(200,822)..controls(193,820)and(187,812)..(187,804)..controls(188,797)and(229,688)..(279,563)..controls(349,390)and(376,331)..(391,320)..controls(406,309)and(462,299)..(649,273)..controls(780,254)and(897,240)..(907,241)..controls(918,243)and(927,249)..(928,256)..controls(930,264)and(912,315)..(889,372)..controls(866,429)and(848,476)..(849,477)..controls(851,479)and(872,432)..(897,373)..controls(936,276)and(942,266)..(960,266)..controls(975,266)and(999,292)..(1089,408)..controls(1281,654)and(1290,666)..(1290,691)..controls(1290,720)and(1104,1175)..(1090,1180)..controls(1085,1182)and (1071,1176)..(1061,1167)--cycle;
			%%%%Arc inférieur bas%%%%
			\\path[fill](1329,861)..controls(1316,848)and(1317,844)..(1339,788)..controls(1364,726)and(1367,654)..(1347,591)..controls(1330,539)and(1338,522)..(1375,526)..controls(1395,528)and(1400,533)..(1412,566)..controls(1432,624)and(1426,760)..(1401,821)..controls(1386,861)and(1380,866)..(1361,868)..controls(1348,870)and(1334,866)..(1329,861)--cycle;
			%%%%Arc inférieur gauche%%%%
			\\path[fill](196,373)..controls(181,358)and(186,335)..(213,294)..controls(252,237)and(304,190)..(363,161)..controls(435,124)and(472,127)..(472,170)..controls(472,183)and(462,192)..(414,213)..controls(350,243)and(303,283)..(264,343)..controls(239,383)and(216,393)..(196,373)--cycle;
		\\end{tikzpicture}
		\\begin{tikzpicture}[remember picture,overlay]
			\\node[anchor=north east,inner sep=0pt] at ($(current page.north east)+(0,-.8cm)$) {};
			\\node[anchor=east, fill=white] at ($(current page.north east)+(-18.8,-2.3cm)$) {\\footnotesize \\bfseries{MathALEA}};
	  	\\end{tikzpicture}
		\\begin{tikzpicture}[line cap=round,line join=round,remember picture, overlay, shift={(current page.north west)},yshift=-8.5cm]
			\\fill[fill=couleur_theme] (0,5) rectangle (21,6);
			\\fill[fill=couleur_theme] (\\xini,6)--(\\xini+1.5,6)--(\\xini+2.5,7)--(\\xini+1.5,8)--(\\xini,8)--(\\xini+1,7)-- cycle;
			\\fill[fill=couleur_theme] (\\xini+2,6)--(\\xini+2.5,6)--(\\xini+3.5,7)--(\\xini+2.5,8)--(\\xini+2,8)--(\\xini+3,7)-- cycle;  
			\\fill[fill=couleur_theme] (\\xini+3,6)--(\\xini+3.5,6)--(\\xini+4.5,7)--(\\xini+3.5,8)--(\\xini+3,8)--(\\xini+4,7)-- cycle;   
			\\node[color=white] at (10.5,5.5) {\\LARGE \\bfseries{ \\MakeUppercase{ #4}}};
		\\end{tikzpicture}
		\\begin{tikzpicture}[remember picture,overlay]
			\\node[anchor=north east,inner sep=0pt] at ($(current page.north east)+(0,-.8cm)$) {};
			\\node[anchor=east, fill=white] at ($(current page.north east)+(-2,-1.5cm)$) {\\Huge \\textcolor{couleur_theme}{\\bfseries{\\#}} \\bfseries{#2} \\textcolor{couleur_theme}{\\bfseries \\MakeUppercase{#3}}};
		\\end{tikzpicture}
	}
	\\fancyfoot[R]{
		%\\scriptsize Coopmaths.fr -- CC-BY-SA
		\\begin{tikzpicture}[remember picture,overlay]
	    	\\node[anchor=south east] at ($(current page.south east)+(-2,0.25cm)$) {\\scriptsize {\\bfseries \\href{https://coopmaths.fr/}{Coopmaths.fr} -- \\href{http://creativecommons.fr/licences/}{CC-BY-SA}}};
	    \\end{tikzpicture}
		\\begin{tikzpicture}[line cap=round,line join=round,remember picture, overlay,xscale=0.5,yscale=0.5, shift={(current page.south west)},xshift=35.7cm,yshift=-6cm]
			\\fill[fill=couleur_theme] (\\xini,6)--(\\xini+1.5,6)--(\\xini+2.5,7)--(\\xini+1.5,8)--(\\xini,8)--(\\xini+1,7)-- cycle;
			\\fill[fill=couleur_theme] (\\xini+2,6)--(\\xini+2.5,6)--(\\xini+3.5,7)--(\\xini+2.5,8)--(\\xini+2,8)--(\\xini+3,7)-- cycle;  
			\\fill[fill=couleur_theme] (\\xini+3,6)--(\\xini+3.5,6)--(\\xini+4.5,7)--(\\xini+3.5,8)--(\\xini+3,8)--(\\xini+4,7)-- cycle;  
		\\end{tikzpicture}
	}
	\\fancyfoot[C]{}
	\\colorlet{couleur_theme}{#1}
	\\colorlet{couleur_numerotation}{couleur_theme}
	\\def\\iconeobjectif{icone-objectif-#1}
	\\def\\urliconeomethode{icone-methode-#1}
}

\\newcommand{\\version}[1]{
	\\fancyhead[R]{
		\\begin{tikzpicture}[remember picture,overlay]
		\\node[anchor=north east,inner sep=0pt] at ($(current page.north east)+(-.5,-.5cm)$) {\\large \\textcolor{couleur_theme}{\\bfseries V#1}};
		\\end{tikzpicture}
	}
}

${preambule_personnalise()}

%%%%%%%%%%%%%%%%%%%%%%%%
%%% Fin du préambule %%%
%%%%%%%%%%%%%%%%%%%%%%%%
		

`
		return intro_LaTeX_coop

	}






function preambule_personnalise(){
	let result = ''
	for (let packages of liste_packages){
		switch (packages) {
		  case 'axe_gradues':
		    result += `
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%% Gestion des axes gradués (Olivier Lacroix) %%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


\\usepackage{xparse}
\\usepackage{ifthen}
\\usepackage{xargs}

\\newboolean{demiDroite}
\\newboolean{affichePointilles}
\\newboolean{affichePoint}
\\newboolean{afficheGraduations}

\\makeatletter
\\newtoks\\@tabtoks
\\providecommand\\addtabtoks[1]{\\@tabtoks\\expandafter{\\the\\@tabtoks#1}}
\\providecommand*\\resettabtoks{\\@tabtoks{}}
\\providecommand*\\printtabtoks{\\the\\@tabtoks}
\\makeatother

\\DeclareDocumentCommand \\placePoints%
{ > { \\SplitList { | } } m }%
{\\ProcessList {#1} {\\mycommand}}

\\newcommand{\\mycommand}[1]{
\\def\\temp{#1}
\\expandafter\\placePointsDeuxArg\\temp
}

\\def\\placePointsDeuxArg#1,#2{\\draw (#1,0) node{\\Large $\\times$} node[above=.2] {\\ensuremath{#2}};}




\\newcommandx{\\axeGradueFraction}[5][5=]{
\\begin{tikzpicture}[xscale=#4,>=latex]
	\\def\\Xmin{#1} 
	\\def\\Xmax{#2} 
	\\def\\Decoupage{#3}
	
	\\ifthenelse { \\equal {#5} {} }
	{%pas d'argument optionnel, on trace juste l'axe ci-dessous
	}
	{% un nombre est Ã  placer sur l'axe avec son label
		\\placePoints{#5}
		%\\draw (#5,-.08) -- (#5,.08) node[above] {#6};
	}


		
	% Xfleche de l'axe
	\\pgfmathparse{\\Xmax+0.2}\\let\\Xfleche\\pgfmathresult;
	% dÃ©but du segment reprÃ©sentant l'axe numÃ©ro 1
	\\ifthenelse{\\equal{\\Xmin}{0}}
	{
		\\def\\Xorigine{\\Xmin} 	
	}
	{
		\\pgfmathparse{\\Xmin-0.5}\\let\\Xorigine\\pgfmathresult;	
		% pour la dÃ©co :
		\\draw (\\Xmin-1/\\Decoupage,-.05) -- (\\Xmin-1/\\Decoupage,.05);
	}
	\\pgfmathparse{int(\\Xmax-1)}\\let\\XmaxMoinsUn\\pgfmathresult;
	% construction de la droite
	\\draw[->,>=latex] (\\Xorigine,0) -- (\\Xfleche,0);
	\\foreach \\x in {\\Xmin,...,\\XmaxMoinsUn}{
			\\draw (\\x,-.1) -- (\\x,.1) node[below=.3] {\\x};
			\\foreach \\y in {1,...,\\Decoupage}{
				\\pgfmathparse{\\x+\\y/\\Decoupage}\\let\\Xgrad\\pgfmathresult;
				\\draw (\\Xgrad,-.05) -- (\\Xgrad,.05);
			}
	};
	% derniÃ¨re graduation Ã  la mano 
	\\draw (\\Xmax,-.1) -- (\\Xmax,.1) node[below=.3] {\\Xmax};

\\end{tikzpicture}
}



\\newcommand{\\axesZoom}[5]{
{} \\hfill 
\\begin{tikzpicture}
	\\def\\XA{#1} % nombre (positif pour l'instant) Ã  placer (avec deux dÃ©cimales)
	\\def\\Nom{#2} % nom du point Ã  placer. Laisser vide si vous ne souhaitez pas voir le point
	\\def\\Xmin{#3} % premiÃ¨re valeur de x entiÃ¨re sur l'axe
	\\setboolean{affichePointilles}{true}  % affiche les pointillÃ©s indiquant le grossissement
	\\setboolean{affichePoint}{#4} % Est ce que le point doit apparaÃ®tre sur la construction. 
	\\setboolean{afficheGraduations}{#5} % Est ce que l'on gradue tous les axes ou seulement \\Xmin et \\Xmax sur le premier axe (si false)
	\\setboolean{demiDroite}{true} %Par dÃ©faut, on construit des demi-droites pour les 6Ã¨mes, si Xmin=0 ou si une des dÃ©cimales l'exige.
	
	\\ifthenelse{\\boolean{demiDroite}}
	{
		\\def\\DebordementAGauche{0} % mettre 0 pour une demi-droite graduÃ©e partant de l'origine
	}
	{
		\\def\\DebordementAGauche{0.5} % mettre 0.5 dans les autres cas.
	}	
	
	\\pgfmathparse{int(\\Xmin+10)}\\let\\Xmax\\pgfmathresult; % Xmax vaut toujours Xmin+10
		
	\\pgfmathparse{int(\\XA)}\\let\\Unites\\pgfmathresult;
	\\pgfmathparse{int((\\XA-\\Unites)*10)}\\let\\Dixiemes\\pgfmathresult;
	\\pgfmathparse{int(round((\\XA-\\Unites.\\Dixiemes)*100))}\\let\\Centiemes\\pgfmathresult;	

	\\pgfmathparse{int(\\Unites+1)}\\let\\UnitesMaj\\pgfmathresult;
	\\pgfmathparse{int(\\Dixiemes+1)}\\let\\DixiemesMaj\\pgfmathresult;
	\\pgfmathparse{int(\\Centiemes+1)}\\let\\CentiemesMaj\\pgfmathresult;				

	\\pgfmathparse{\\Xmax+1}\\let\\Xfleche\\pgfmathresult;
	\\ifthenelse{\\equal{\\Xmin}{0}}
	{
		\\def\\Xorigine{\\Xmin} 	
	}
	{
		\\pgfmathparse{\\Xmin-0.5}\\let\\Xorigine\\pgfmathresult;	
	}

	\\pgfmathparse{int(\\Xmax-1)}\\let\\XmaxMoinsUn\\pgfmathresult;
	\\pgfmathparse{int(\\Xmin+1)}\\let\\XminPlusUn\\pgfmathresult;
		
	\\draw[->,>=latex] (\\Xorigine,0) -- (\\Xfleche,0);
	\\foreach \\x in {\\XminPlusUn,...,\\XmaxMoinsUn}{
		\\ifthenelse{\\boolean{afficheGraduations}}
		{
			\\draw (\\x,-.1) -- (\\x,.1) node[above] {\\x};
		}
		{
			\\draw (\\x,-.1) -- (\\x,.1);
		}
	};
	\\foreach \\x in {1,...,9}{
		\\draw (\\Unites.\\x,-.05) -- (\\Unites.\\x,.05);
	}
	\\draw (\\Xmin,-.1) -- (\\Xmin,.1) node[above] {\\Xmin};
	\\draw (\\Xmax,-.1) -- (\\Xmax,.1) node[above] {\\Xmax};
	\\ifthenelse{\\not\\equal{\\Unites}{0}}
	{
		\\pgfmathparse{\\Xmin-0.5}\\let\\Xorigine\\pgfmathresult;		
	}{}
	\\draw[->,>=latex] (\\Xorigine,-2) -- (\\Xfleche,-2);
	\\foreach \\x in {1,...,9}{
		\\pgfmathparse{int(\\Xmin+\\x)}\\let\\X\\pgfmathresult;
		\\ifthenelse{\\boolean{afficheGraduations}}
		{
			\\draw (\\X,-2.1) -- (\\X,-1.9) node[above] {\\Unites,\\x};
		}
		{
			\\draw (\\X,-2.1) -- (\\X,-1.9);
		}		
		\\pgfmathparse{int(\\Dixiemes+\\Xmin)+\\x/10}\\let\\Xtirets\\pgfmathresult;
		\\draw (\\Xtirets,-2.05) -- (\\Xtirets,-1.95);
	};
	
	\\ifthenelse{\\boolean{afficheGraduations}}
	{	
		\\draw (\\Xmax,-2.1) -- (\\Xmax,-1.9) node[above] {\\UnitesMaj};
		\\draw (\\Xmin,-2.1) -- (\\Xmin,-1.9) node[above] {\\Unites};
	}
	{
		\\draw (\\Xmax,-2.1) -- (\\Xmax,-1.9) ;
		\\draw (\\Xmin,-2.1) -- (\\Xmin,-1.9) ;		
	}
	
	\\pgfmathparse{int(\\Dixiemes+\\Xmin)}\\let\\XGaucheAxeBis\\pgfmathresult;
	\\pgfmathparse{int(\\XGaucheAxeBis+1)}\\let\\XDroitAxeBis\\pgfmathresult;

	\\ifthenelse{\\boolean{affichePointilles}}
	{
	\\draw[dashed] (\\Unites,0) -- (\\Xmin,-2);
	\\draw[dashed] (\\UnitesMaj,0) -- (\\Xmax,-2);
	\\draw[dashed] (\\XGaucheAxeBis,-2) -- (\\Xmin,-4);
	\\draw[dashed] (\\XDroitAxeBis,-2) -- (\\Xmax,-4);
	}{}
	
	\\ifthenelse{\\not\\equal{\\Dixiemes}{0}}
	{
		\\pgfmathparse{\\Xmin-0.5}\\let\\Xorigine\\pgfmathresult;		
	}{}
	\\draw[->,>=latex] (\\Xorigine,-4) -- (\\Xfleche,-4);
	\\foreach \\x in {1,...,9}{
		\\pgfmathparse{int(\\Xmin+\\x)}\\let\\X\\pgfmathresult;
		\\ifthenelse{\\boolean{afficheGraduations}}
			{
			\\draw (\\X,-4.1) -- (\\X,-3.9) node[above] {\\Unites,\\Dixiemes\\x};
			}
			{
			\\draw (\\X,-4.1) -- (\\X,-3.9) ;
			}
		};

	
\\ifthenelse{\\boolean{afficheGraduations}}
	{
	\\ifthenelse{\\equal{\\Dixiemes}{9}}
		{
		\\draw (\\Xmax,-4.1) -- (\\Xmax,-3.9) node[above] {\\UnitesMaj};		
		}	
		{
		\\draw (\\Xmax,-4.1) -- (\\Xmax,-3.9) node[above] {\\Unites,\\DixiemesMaj};
		}	
	
	\\ifthenelse{\\equal{\\Dixiemes}{0}}
		{
		\\draw (\\Xmin,-4.1) -- (\\Xmin,-3.9) node[above] {\\Unites};
		}
		{
		\\draw (\\Xmin,-4.1) -- (\\Xmin,-3.9) node[above] {\\Unites,\\Dixiemes};	
		}
	}
	{
	\\ifthenelse{\\equal{\\Dixiemes}{9}}
		{
		\\draw (\\Xmax,-4.1) -- (\\Xmax,-3.9);		
		}	
		{
		\\draw (\\Xmax,-4.1) -- (\\Xmax,-3.9) ;
		}	
	
	\\ifthenelse{\\equal{\\Dixiemes}{0}}
		{
		\\draw (\\Xmin,-4.1) -- (\\Xmin,-3.9) ;
		}
		{
		\\draw (\\Xmin,-4.1) -- (\\Xmin,-3.9) ;	
		}
	\\pgfmathparse{int(\\Centiemes+\\Xmin)}\\let\\XGaucheAxeTer\\pgfmathresult;
	\\draw (\\XGaucheAxeTer,-4) node[below] {\\Nom};
	}
	
	\\ifthenelse{\\boolean{affichePoint}}
	{
		\\draw (\\XA,0) node{\\Large $\\times$} node[below] {\\Nom};
		\\draw (\\XGaucheAxeBis.\\Centiemes,-2) node{\\Large $\\times$} node[below] {\\Nom};
	}{}
\\end{tikzpicture}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%% Fin de la gestion des axes gradués %%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

}

`
		break;
		case 'bclogo' :
			result += '\\usepackage[tikz]{bclogo}'
		break
		case 'tkz-euclide' :
			result += '\\usepackage{tkz-euclide}\n\\usetkzobj{all}'
		break
		default:
		    result += `\\usepackage{${packages}}\n`
		} 
	}
	return result
}
