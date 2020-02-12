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
		argument.contenu = html_consigne(argument.consigne) + html_enumerate(argument.liste_questions,argument.spacing)
		argument.contenu_correction = html_consigne(argument.consigne_correction) + html_enumerate(argument.liste_corrections,argument.spacing_corr)	
	} else {
		argument.contenu = tex_consigne(argument.consigne) + tex_multicols(tex_enumerate(argument.liste_questions,argument.spacing),argument.nb_cols)
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
		argument.contenu = html_consigne(argument.consigne) + html_ligne(argument.liste_questions,argument.spacing)
		argument.contenu_correction = html_consigne(argument.consigne_correction) + html_ligne(argument.liste_corrections,argument.spacing_corr)	
	} else {
		argument.contenu = tex_consigne(argument.consigne) + tex_multicols(tex_paragraphe(argument.liste_questions,argument.spacing),argument.nb_cols)
		// argument.contenu_correction = tex_consigne(argument.consigne_correction) + tex_multicols(tex_enumerate_sans_numero(argument.liste_corrections,argument.spacing_corr),argument.nb_cols_corr)	
		argument.contenu_correction = tex_consigne(argument.consigne_correction) + tex_multicols(tex_paragraphe(argument.liste_corrections,argument.spacing_corr),argument.nb_cols_corr)	
	}
	
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
	// Supprime les éléments de liste à éviter
	for (let i=0;i<liste_a_eviter.length;i++){
		enleve_element(liste,liste_a_eviter[i])
	}
	var index = Math.floor(Math.random() * liste.length);
	return liste[index];
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
* Ajoute le + devant les nombres positifs
* @Example
* //+3 ou -3
* @Auteur Rémi Angot
*/
function ecriture_algebrique(a) { 
	let result = '';
	if (a>0) {
		result = '+'+a;
	}else {
		result = a;
	}
	return result;
};

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
 * Retourne la quatrième proportionnelle de 3 nombres en fonction d'une précision demandée
 * Le résultat est un string qui doit être entouré de $ pour le mode mathématiques
 * @auteur Jean-Claude Lhote
 */

function quatrieme_proportionnelle(a,b,c,precision) { //calcul de b*c/a
let result=``
if ((typeof a)=="number"&&(typeof b)=="number"&&(typeof c)=="number") {
	if (a==0) { 
		result='=erreur : division par zéro'
		return result
	}
	let p4=b*c/a
	result+=`\\dfrac{${tex_nombrec(b)}\\times${tex_nombrec(c)}}{${tex_nombrec(a)}}`;
	if (Number.isInteger(p4*Math.pow(10,precision))) result +=`=`
	else result +=`\\approx`
	result += `${arrondi_virgule(p4,precision)}`
	return result
	}
else {
	return `\\dfrac{${b} \\times${c}}{${a}}`
}
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
*  Renvoit une liste HTML à partir d'une liste
* 
* @param liste une liste de questions
* @param spacing interligne (line-height en css)
* @Auteur Rémi Angot
*/
function html_enumerate(liste,spacing){
	let result='';
	(spacing>1) ? result =`<ol style="line-height: ${spacing};">` : result = '<ol>'
	for(let i in liste){
		result += '<li>' + liste[i].replace(/\\dotfill/g,'..............................').replace(/\\not=/g,'≠').replace(/\\ldots/g,'....') + '</li>'   // .replace(/~/g,' ') pour enlever les ~ mais je voulais les garder dans les formules LaTeX donc abandonné
	}
	result += '</ol>'
	return result
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
* Met en couleur verte si sortie HTML et en rouge si sortie PDF
* @Auteur Rémi Angot
*/
function mise_en_evidence(texte){
	if (sortie_html) {
		return '\\mathbf{\\color{#1DA962}{'+texte+'}}'	
	}
	else {
		return '\\mathbf{\\color{red}{'+texte+'}}'
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
		return '\\dfrac{'+a+'}{'+b+'}'
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

/** Trace une graduation sur le SVG
* @param pas
* @param mon_svg Objet SVG
* @param derniere_graduation
* @param taille taille verticale
* @param y ordonnée de la droite
* @param color
* @param width 
* @Auteur Rémi Angot
*/
function SVG_graduation(mon_svg,origine,pas,derniere_graduation,taille=10,y=50,couleur='black',width=5) {
	for (let i = origine; i < derniere_graduation; i+=pas) {
		let line = mon_svg.line(i, y-taille/2, i, y+taille/2)
		line.stroke({ color: couleur, width: width, linecap: 'round' })
	}
}

function Latex_graduation(pas,taille=1,y=0,couleur,width) {
	switch (pas) {
	case 0.1 :
		 return `\n\t \\foreach \\x in {1,1.1,...,7.4} { \\draw [line width=${width}pt,color=${couleur}] (\\x,${calcul(y-0.1*taille)})--(\\x,${calcul(y+0.1*taille)});}`
		 break;
	 case 0.01 :
		return `\n\t \\foreach \\x in {1,1.1,...,7.4} { \\draw [line width=${width}pt,color=${couleur}] (\\x,${calcul(y-0.1*taille)})--(\\x,${calcul(y+0.1*taille)});}`
		break;
	case 0.001 :
		return `\n\t \\foreach \\x in {1,1.1,...,7.4} { \\draw [line width=${width}pt,color=${couleur}] (\\x,${calcul(y-0.1*taille)})--(\\x,${calcul(y+0.1*taille)});}`
		break;
	case 1 :
		 return `\n\t \\foreach \\x in {1,2,...,7} { \\draw [line width=${width}pt,color=${couleur}] (\\x,${calcul(y-0.1*taille)})--(\\x,${calcul(y+0.1*taille)});}`
		 break;
	default :  
		return `\n\t \\foreach \\x in {1,${calcul(1+1/pas,3)},...,7.4} { \\draw [line width=${width}pt,color=${couleur}] (\\x,${calcul(y-0.1*taille)})--(\\x,${calcul(y+0.1*taille)});}`
		break;
	}
}

function SVG_label(mon_svg,liste_d_abscisses,y,couleur) {
	'use strict';
	for (let i = 0; i < liste_d_abscisses.length; i++) {
		let text = mon_svg.text((liste_d_abscisses[i][0]).toString())
		y=parseInt(y);	
		text.move(liste_d_abscisses[i][1],50).font({ fill: couleur,
			family:   'Helvetica'
			, size:     20
			, anchor:   'middle'
			, leading : y
		})
	}
}

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
function Latex_label(liste_d_abscisses,couleur) {
	'use strict';
	let code=''
	for (let i = 0,text; i < liste_d_abscisses.length; i++) {
		text = liste_d_abscisses[i][0].toString()
		code +=`\n\t \\draw [color=${couleur}] (${liste_d_abscisses[i][1]},${liste_d_abscisses[i][2]}) node{$${text}$};`;
	}
	return code;
}

function SVG_tracer_point(mon_svg,x,nom,couleur) {
	//creer un groupe pour la croix
	let point = mon_svg.group()
	let c1 = point.line(-5,5,5,-5)
	c1.stroke({ color: couleur, width: 3, linecap: 'round' })
	let c2 = point.line(-5,-5,5,5)
	c2.stroke({ color: couleur, width: 3, linecap: 'round' })
	//déplace la croix
	point.move(x-5,50-5)
	// point.dmove(-5,-5)
	let text = mon_svg.text(nom).attr({x: x, y: 50})
	//ecrit le nom
	text.font({
		family:   'Helvetica'
		, size:     20
		, anchor:   'middle'
		, leading : -1
		})
}

function Latex_tracer_point(x,nom,couleur,width) {
	let code =`\n\t \\draw [line width=${width}pt,color=${couleur}] (${calcul(x-0.05)},${calcul(y-0.05)}) -- (${calcul(x+0.05)},${calcul(y+0.05)});`;
	code +=`\n\t \\draw[line width=${width}pt,color=${couleur}] (${calcul(x-0.05)},${calcul(y+0.05)}) -- (${calcul(x+0.05)},${calcul(y-0.05)}); `;
	code +=`\n\t \\draw [color=${couleur}] (${x},${y+0.2}) node{$${nom}$};`;
	return code;
}

function SVG_tracer_fleche(mon_svg,x,y) {
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
// function Latex_tracer_fleche(x,y) {
// 	let code =`\n\t \\draw (${x-0.1},${y-0.1})--(${x},${y}); `
//	code +=`\n\t \\draw (${x-0.1},${y+0.1})--(${x},${y}); `
//	return code;
// } 

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
	let arrondir=1+Math.round(Math.log10(pas1))
	let longueur_pas1=600/longueur;
 	let longueur_pas2=600/longueur/pas2;
 	let distance,valeur,nom
	if (!window.SVGExist) {window.SVGExist = {}} // Si SVGExist n'existe pas on le créé
	// SVGExist est un dictionnaire dans lequel on stocke les listenner sur la création des div
	window.SVGExist[id_du_div] = setInterval(function() {
		if ($(`#${id_du_div}`).length ) {
			$(`#${id_du_div}`).html("");//Vide le div pour éviter les SVG en doublon
			const mon_svg = SVG().addTo(`#${id_du_div}`).viewbox(0, 0, 800, 150)
			// Droite 
			let droite = mon_svg.line(100, 50, 750, 50)
			droite.stroke({ color: 'black', width: 2, linecap: 'round' })
			// Graduation secondaire
			SVG_graduation(mon_svg,100,longueur_pas2,750,taille=5,y=50,color='black',width=2)
			// Graduation principale
			SVG_graduation(mon_svg,100,longueur_pas1,750,taille=10,y=50,color='black',width=5)
			SVG_tracer_fleche(mon_svg,750,50)
			// Nombres visibles
			SVG_label(mon_svg,[[arrondi_virgule(origine),100]],2,'black')
			for (i=0;i<points_connus.length;i++) {
				valeur=arrondi_virgule(points_connus[i][0],arrondir-1);
				distance=longueur_pas1*points_connus[i][1]+longueur_pas2*points_connus[i][2];
				SVG_label(mon_svg,[[valeur,100+distance,50]],2,'black')
			}
			//Points inconnus
			let position=1;
			for (i=0;i<points_inconnus.length;i++){
				distance=longueur_pas1*points_inconnus[i][1]+longueur_pas2*points_inconnus[i][2]
				nom=points_inconnus[i][0]
				SVG_tracer_point(mon_svg,100+distance,nom,'#f15929')
				if (points_inconnus[i][3]==true) {
					if (!fraction) { // affichage décimal 
					valeur=arrondi_virgule(origine+points_inconnus[i][1]/pas1+points_inconnus[i][2]/pas1/pas2,arrondir)
					SVG_label(mon_svg,[[valeur,100+distance,50]],3+position,'#f15929')
					}
					else { //affichage fractionnaire
					SVG_fraction(mon_svg,(origine+points_inconnus[i][1])*pas2+points_inconnus[i][2],pas2,100+distance,85+(3+position)*10,'#f15929')
					}
					position=1-position
				}
			}
			clearInterval(SVGExist[id_du_div]);//Arrête le timer
    		}
	}, 100); // Vérifie toutes les 100ms
}

/**
* Trace une graduation en Latex
* @param origine la première abscisse de la droite ou demi-droite
* @param longueur le nombre d'intervalles entre l'origine et la dernière graduation
* @param pas1 le fractionnement de l'unité utilisé : 10 pour 0,1 ; 2 pour 0,5 ...
* @param pas2 Idem pas1 pour la petite graduation
* @param points_inconnus tableau tableau [Nom,nb_pas1,nb_pas2,affiche_ou_pas]
* @param points_connus tableau [valeur,nb_pas1,nb_pas2]
* @Auteur Jean-Claude Lhote
*/
function Latex_reperage_sur_un_axe(zoom,origine,pas1,pas2,points_inconnus,points_connus,fraction){
	let result=`\\begin{tikzpicture}[scale=${zoom}]`
	let arrondir=1+Math.round(Math.log10(pas1))
 	let distance,valeur,nom

			// Droite 
			// Graduation secondaire
			result+=Latex_graduation(pas2,taille=0.5,y=0.2,'black',width=0.8);
			// Graduation principale
			result+=Latex_graduation(1,taille=0.8,y=0.2,'black',width=1.5);
			// Droite et flèche
			result+=`\n\t \\draw [->,>=stealth,line width=1.2pt] (1,0.2)--(7.5,0.2);`;
			// Nombres visibles
			result+=Latex_label([[arrondi_virgule(origine),1,0.03]],'black');
			for (i=0;i<points_connus.length;i++) {
				valeur=arrondi_virgule(points_connus[i][0],arrondir-1);
				distance=calcul(1+points_connus[i][1]+points_connus[i][2]/pas2);
				result+=Latex_label([[valeur,distance,0.03]],'black');
			}
			//Points inconnus
			let position=0.1;
			for (i=0;i<points_inconnus.length;i++){
				distance=calcul(points_inconnus[i][1]+points_inconnus[i][2]/pas2,3);
				nom=points_inconnus[i][0];
				valeur=arrondi_virgule(calcul(origine+points_inconnus[i][1]/pas1+points_inconnus[i][2]/pas1/pas2),arrondir);
				result+=Latex_tracer_point(1+distance,nom,'red',2);
				if (points_inconnus[i][3]==true) {
					if (!fraction) {
					result+=Latex_label([[valeur,1+distance,-0.1-position]],'red');
					}
					else {
						result+=Latex_label([[`${tex_fraction((origine+points_inconnus[i][1])*pas2+points_inconnus[i][2],pas2)}`,1+distance,-0.1-position]],'red');
					}
					position=0.1-position;
				}
			}
			result +=`\n\t \\end{tikzpicture}`;
			return result;
 
 }


/**
* fonction pour simplifier l'ecriture lorsque l'exposant vaut 0 ou 1
* retourne 1, la base ou rien
* @param b base
* @param e exposant 
* @Auteur Sébastien Lozano
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
* fonction pour simplifier les notations puissance dans certains cas
* si la base vaut 1 ou -1 quelque soit l'exposant, retourne 1 ou -1,
* si la base est négative on teste la parité de l'exposant pour alléger la notation sans le signe
* si l'exposant vaut 0 ou 1 retourne 1, la base ou rien
* @param b base
* @param e exposant 
* @Auteur Sébastien Lozano
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
* fonction pour écrire en couleur la forme éclatée d'une puissance
* @param b base
* @param e exposant 
* @param couleur
* @Auteur Sébastien Lozano
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
			str = `\\mathbf{\\color{${couleur}}{${b}}} `;
			for (let i=1; i<e;i++) {
				str = str + `\\times \\mathbf{\\color{${couleur}}{${b}}}`;
			 }
			return str;
	}
};

/**
* fonction pour écrire avec deux couleurs la forme éclatée d'un produit de puissances de même exposant
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
			str = `\\mathbf{(\\color{${couleur1}}{${b1}}} \\times \\mathbf{\\color{${couleur2}}{${b2}}}) `;
			for (let i=1; i<e;i++) {
				str = str + `\\times (\\mathbf{\\color{${couleur1}}{${b1}}} \\times \\mathbf{\\color{${couleur2}}{${b2}}})`;
			 }
			return str;
	}

}