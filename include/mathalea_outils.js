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
		result =mise_en_evidence('(+'+tex_nombrec(a)+')','green');
	}else if (a<0) {
		result = mise_en_evidence('('+tex_nombrec(a)+')','red');
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
		result = mise_en_evidence('+'+tex_nombrec(a),'green');
	}else if (a<0) {
		result = mise_en_evidence(tex_nombrec(a),'red');
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
* Convertit un angle de radian vers degrés
* @Example
* // PI->180
* @Auteur Jean-Claude Lhote
*/
Math.degres = function(radians) {
	return radians * 180 / Math.PI;
};

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
		return tex_fraction(fraction_simplifiee(n,d)[0],fraction_simplifiee(n,d)[1]);
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
			result =`=${tex_fraction(Algebrite.eval((num)/s)+mise_en_evidence('\\times'+s),Algebrite.eval(den/s)+mise_en_evidence('\\times'+s))}=${tex_fraction(Algebrite.eval((num)/s),Algebrite.eval(den/s))}`
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
function polygone(nbsommets,liste_a_eviter=[]){ 
	let premiersommet = randint(65,90-nbsommets);
	let polygone="";
	while(est_deja_donne(String.fromCharCode(premiersommet),liste_a_eviter)){
		premiersommet = randint(65,90-nbsommets);
	}

	for (let i=0;i<nbsommets;i++){
		polygone += String.fromCharCode(premiersommet+i)
	}
	return polygone
}

/**
* Vérifie dans une liste si un élément commence par premiersommet et renvoit true si c'est le cas
* @Auteur Rémi Angot
*/
function est_deja_donne(premiersommet,liste_a_eviter) {
	let result = false
	for (let i = 0; i < liste_a_eviter.length; i++) {
		if (premiersommet==liste_a_eviter[i][0]) {
			result = true;
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
	return tex_enumerate(liste,spacing).replace('\\begin{enumerate}[label={}]','\\begin{enumerate}[label={}]')
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
	} else {
		(spacing>1) ? result =`<div style="line-height: ${spacing};">` : result = '<div>'
		result += liste[0].replace(/\\dotfill/g,'..............................').replace(/\\not=/g,'≠').replace(/\\ldots/g,'....')   // .replace(/~/g,' ') pour enlever les ~ mais je voulais les garder dans les formules LaTeX donc abandonné
		result += '</div>'	
	}
	return result

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
		result = nombre.toFixed(2).toString().replace('.',',');
	}
	return result;
	
}


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
  		isEditable: false
  	}
  }
  )	
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
	result +=`\n\t \\tkzClip`;
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

	result+=`\n\t \\tkzInit[xmin=${origine},xmax=${calcul(origine+7/pas1)},ymin=-0.5,ymax=0.5,xstep=${calcul(1/pas1)}]`

	if (origine==0) result +=`\n\t \\tkzDrawX[tickwd=2pt];`
	else result+=`\n\t \\tkzDrawX[left space=0.2,tickwd=2pt];`
	result+=`\n\t \\tikzset{arr/.style={postaction=decorate,	decoration={markings,mark=at position 1 with {\\arrow[thick]{#1}}}}}`

	result+=`\n\t \\foreach \\x in {0,${calcul(1/pas2)},...,7}`
	result+=`\n\t {\\draw (${origine*pas1}+\\x,-0.05)--(${origine*pas1}+\\x,0.05);}`
	
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
				result +=`\n\t \\tkzLabelPoint[color = orange,below=${15+position}pt,inner sep = 5pt,font=\\scriptsize](A){$${tex_fraction((origine+points_inconnus[i][1])*pas2+points_inconnus[i][2],pas2)}$}`	
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
 * Fonction qui retourne les coefficients a et b de f(x)=ax²+bx+c à partir des données de x1,x2,f(x1),f(x2) et c.
 * 
 * @Auteur Jean-Claude Lhote
 */
function resol_sys_lineaire_2x2(x1,x2,fx1,fx2,c) {
	let determinant=x1*x1*x2-x2*x2*x1;
	return [fraction_simplifiee(x2*(fx1-c)-x1*(fx2-c),determinant),fraction_simplifiee(x1*x1*(fx2-c)-x2*x2*(fx1-c),determinant)];
}
/**
 * Fonction qui retourne les coefficients a, b et c de f(x)=ax^3 + bx² + cx + d à partir des données de x1,x2,x3,f(x1),f(x2),f(x3) et d.
 * sous forme de fraction irréductible. Si pas de solution (déterminant nul) alors retourne [[0,0],[0,0],[0,0]]
 * @Auteur Jean-Claude Lhote
 */

function resol_sys_lineaire_3x3(x1,x2,x3,fx1,fx2,fx3,d) { 
	let y1=fx1-d, y2=fx2-d, y3=fx3-d;
	let determinant=(x1**3)*x2*x2*x3+x2*x1*x1*(x3**3)+x1*x3*x3*(x2**3)-x1*x2*x2*(x3**3)-x2*x3*x3*(x1**3)-x3*x1*x1*(x2**3);
	if (determinant==0) return [[0,0],[0,0],[0,0]];
	else {
		let a=((x2*x2*x3-x2*x3*x3)*y1+(x3*x3*x1-x1*x1*x3)*y2+(x1*x1*x2-x2*x2*x1)*y3);
		let b=(((x3**3)*x2-(x2**3)*x3)*y1+((x1**3)*x3-(x3**3)*x1)*y2+((x2**3)*x1-(x1**3)*x2)*y3);
		let c=(((x2**3)*x3*x3-x2*x2*(x3**3))*y1+(x1*x1*(x3**3)-(x1**3)*x3*x3)*y2+((x1**3)*x2*x2-(x2**3)*x1*x1)*y3);
		return [fraction_simplifiee(a,determinant),fraction_simplifiee(b,determinant),fraction_simplifiee(c,determinant)];
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
		console.log(i);
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
	 let sortie = `
	 \\definecolor{orangeCoop}{rgb}{0.9450980392156862,0.34901960784313724,0.1607843137254902}
	 \\setlength{\\fboxrule}{1.5mm}
	 \\par\\vspace{0.25cm}
	 \\noindent\\fcolorbox{orangeCoop}{white}{\\parbox{\\linewidth-2\\fboxrule-2\\fboxsep}{`+texte+`}}
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
 * Pour les tests de la bibliothèque d3.js
 * @param {string} id_du_div 
 * @author Sébastien Lozano 
 */

function d3jsTests(id_du_div) {
	'use strict';
	if (!window.SVGExist) {window.SVGExist = {}} // Si SVGExist n'existe pas on le créé
	// SVGExist est un dictionnaire dans lequel on stocke les listenner sur la création des div
	window.SVGExist[id_du_div] = setInterval(function() {
		
		if ($(`#${id_du_div}`).length ) {
			$(`#${id_du_div}`).html("");//Vide le div pour éviter les SVG en doublon

			document.getElementById(id_du_div).innerHTML = `8`;
			var width = 1300;
			var height = 300;
			var svg = d3.select('#'+id_du_div)
				.append("svg")
				.attr("width", width)
				.attr("height", height);
				var circleMove = svg.append("circle")
				.attr("cx",150)
				.attr("cy",50)
				.attr("r",30);
				
				 circleMove
				.transition()
				 .duration(500)
				.attr("cx", 850)
				.transition()
				.duration(500)
				.attr("cx",150)
				.transition()
				.duration(500)
				.attr("cx",650)
				.transition()
				.duration(500)
				.attr("cx",350)
				.transition()
				.duration(500)
				.attr("cx",500);

				var positions = [850, 200, 800, 250, 750, 300, 700, 350, 650, 400, 600, 450, 550, 500];
				function animateMulti(node, positions, i) {
					node.transition()
						.duration(300)
						.attr("cx", positions[i])
						.on('end',  function() {
							if (i < (positions.length - 1)) {
								animateMulti(d3.select(this), positions, ++i);
							}
						});
				}
				animateMulti(circleMultiTransition, positions, 0);
		clearInterval(SVGExist[id_du_div]);//Arrête le timer
		};
	}, 100); // Vérifie toutes les 100ms
};

/**
 * Renvoie un encart sur fond d'alert semantic ui en HTML ou dans un cadre orange coopmaths en LaTeX avec le texte 
 * @param {string} texte
 * @author Sébastien Lozano 
 */
function warn_message(texte) {
	'use strict';
	if (sortie_html) {
		return `
		<br>
		<div class="ui compact warning message">		
		<p>`+texte+`
		</p>
		</div>
		`;
	} else {
		return tex_cadre_par_orange(texte);							
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