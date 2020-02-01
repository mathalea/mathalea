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
* Utilise this.liste\_questions et this.liste\_corrections pour remplir this.contenu et this.contenu_correction
* 
* La liste des questions devient une liste HTML ou LaTeX avec html\_ligne() 
*
* **Doit être remplacée par liste_de_question_to_contenu()**
* @deprecated Doit être remplacée par liste_de_question_to_contenu()
* @param {exercice} 
* @author Rémi Angot
*/
function mg32_to_contenu(argument) {
	if (sortie_html) {
		argument.contenu = html_consigne(argument.consigne) + html_ligne(argument.liste_questions,argument.spacing);
		argument.contenu_correction = html_consigne(argument.consigne_correction) + html_ligne(argument.liste_corrections,argument.spacing_corr);
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
* Retourne un élément au hasard de la liste
* @param {liste} liste
* 
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
function choice(liste) {
	// Renvoit un élément au hasard de la liste
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
* Le tableau doit être du type [[num,den],[num2,den2]]
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
* @Auteur Rémi Angot
*/
function pgcd(a,b){
	return parseInt(Algebrite.run(`gcd(${a},${b})`));
}

/**
* @Auteur Rémi Angot
*/
const ppcm = (a,b) => { return parseInt(Algebrite.run(`lcm(${a},${b})`))}


/**
* Retourne le numérateur et le dénominateur de la fraction passée en argument sous la forme (numérateur,dénominateur)réduite au maximum dans un tableau [numérateur,dénominateur]
* @Auteur Rémi Angot
*/
function fraction_simplifiee(n,d){ 
	let p=pgcd(n,d);
	return [n/p,d/p];
}

/**
* @Auteur Rémi Angot
*/
function tex_fraction_reduite(n,d){
	return tex_fraction(fraction_simplifiee(n,d)[0],fraction_simplifiee(n,d)[1]);
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
* @Auteur Rémi Angot
*/
function calcul(expression){ 
	return parseFloat(Algebrite.eval(expression))
}

/**
* Utilise Algebrite pour s'assurer qu'il n'y a pas d'erreur dans les calculs avec des décimaux et retourne un string avec la virgule comme séparateur décimal
* @Auteur Rémi Angot
*/
function tex_nombrec(expression){ 
	return tex_nombre(parseFloat(Algebrite.eval(expression)))
}


/**
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
* @Auteur Rémi Angot
*@Example
* // 1->A ; 2->B...
*/
function lettre_depuis_chiffre(i){ 
	let lettre = 64+i;
  return String.fromCharCode(lettre)
}

/**
* @Auteur Rémi Angot
* @Example
* // 1->a ; 2->b...
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
* @Auteur Rémi Angot
*/
function prenomF(){
	return choice(['Manon','Julie','Aude','Corinne','Léa','Carine','Elsa','Lisa','Marina','Magalie','Nawel'])
}

/**
* @Auteur Rémi Angot
*/
function prenomM(){
	return choice(['Rémi','Benjamin','Guillaume','Christophe','Cyril','Kamel','Yazid','Mehdi','Karim','Bernard','Joachim'])
}

/**
* @Auteur Rémi Angot
*/
function prenom(){
	return choice([prenomF(),prenomM()])
}

 /**
* @auteur Jean-Claude Lhote
*/
function tirer_les_des(nombre_tirages,nombre_faces,nombre_des) { // paramètres : combien de tirages ? avec quel type de dés ? et combien de dés lancés à chaque tirage
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
* @auteur Jean-Claude Lhote
*/
function liste_de_notes(nombre_notes,note_min,note_max) { // paramètres : combien de tirages ? avec quel type de dés ? et combien de dés lancés à chaque tirage
	let notes =[];
	for (i=0;i<nombre_notes;i++) notes.push(randint(note_min,note_max));
return notes
}

 /**
* @auteur Jean-Claude Lhote
*/
function jours_par_mois(n){
	let jours_mois=[31,28,31,30,31,30,31,31,30,31,30,31];
	return jours_mois[n-1]
}
 /**
* @auteur Jean-Claude Lhote
*/
function un_mois_de_temperature(base,mois,annee) { // paramètres : température médiane, quantième du mois (janvier=1), annee pour déterminer si bissextile
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
* @auteur Jean-Claude Lhote
*/
function nom_du_mois(n) {
	let mois=['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
	return mois[n-1]
}

// Fonctions LaTeX

/**
* @Auteur Rémi Angot
*/
function tex_enumerate(liste,spacing){
	let result =''
	result = "\\begin{enumerate}"
	if (spacing>1) {
		result += `\\begin{spacing}{${spacing}}`
	}
	for(let i in liste){
		result += '\t\\item ' + liste[i] +'\n'
	}
	if (spacing>1){
		result += '\\end{spacing}'
	} 
	result += '\\end{enumerate}'
	return result.replace(/<br><br>/g,'\n\n\\medskip\n').replace(/<br>/g,'\\\\\n')
}

/**
* @Auteur Rémi Angot
*/
function tex_enumerate_sans_numero(liste,itemsep=1,spacing=false){
	let result =''
	if (itemsep==1){
		result = '\\begin{enumerate}[label={}]\n';
	}else{
		if (spacing){
			result = '\\begin{enumerate}[label={}]\n\\begin{spacing}{'+itemsep+'}\n'
		} else {
			result = '\\begin{enumerate}[itemsep='+itemsep+'em]\n'	
		}
		
	}
	 
	for(let i in liste){
		result += '\t\\item ' + liste[i] +'\n'
	}
	if (spacing){
		result += '\\end{spacing}'
	} 
	result += '\\end{enumerate}'
	return result.replace(/<br>/g,'\\\\')
}

/**
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
	return result.replace(/<br>/g,'\\\\')
}



/**
* @Auteur Rémi Angot
*/
function html_enumerate(liste,spacing){
	let result='';
	(spacing>1) ? result =`<ol style="line-height: ${spacing};">` : result = '<ol>'
	for(let i in liste){
		result += '<li>' + liste[i].replace(/\\dotfill/g,'..............................').replace(/\\not=/g,'≠').replace(/\\ldots/g,'....').replace(/~/g,' ') + '</li>'   // .replace(/~/g,' ') pour enlever les ~ mais je voulais les garder dans les formules LaTeX donc abandonné
	}
	result += '</ol>'
	return result
}

/**
* @Auteur Rémi Angot
*/
function html_ligne(liste,spacing){
	let result = '';
	if (spacing>1) {
		result = `<div style="line-height: ${spacing};">\n`
	}
	for(let i in liste){
		result += '\t' + liste[i].replace(/\\dotfill/g,'...').replace(/~/g,' ') + '</br>'   // .replace(/~/g,' ') pour enlever les ~ mais je voulais les garder dans les formules LaTeX donc abandonné
		// .replace(/\\\\/g,'<br>') abandonné pour supporter les array
	}

	if (spacing>1) {
		result += `</div>\n`
	}

	return result
}



/**
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
* @Auteur Rémi Angot
*/
function html_consigne(consigne){
	return '<h4>' + consigne + '</h4>\n\n'
}

/**
* @Auteur Rémi Angot
*/
function tex_consigne(consigne){
	return '\\exo{' + consigne.replace(/<br>/g,'\\\\') + '}\n\n'
}

/**
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
* Pour écrire €/kg et bien mettre la virgule comme séparateur décimal
* @Auteur Rémi Angot
*/
function tex_prix_euros(nb){
	//Remplace le . par la ,
	nombre = Number (nb);
	let result = nombre.toFixed(2).toString().replace('.',',')
	result+=`~\\text{\\euro{}/kg}`;
	return result;
	
}

/**
* Écrit une fraction avec - devant si a ou b est négatif
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
* Met des parenthèses si besoin pour inclure une fraction dans une expresion en fonction du signe
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
* Retourne la liste des premiers nombres premiers
* @Auteur Rémi Angot
*/
function obtenir_liste_nombres_premiers() {
 return  [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97];
}

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
* Écrit une fraction
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
* Écrit une fraction dans une boite pour faciliter l'alignement
* @Auteur Rémi Angot
*/
function tex_fraction_box(a,b,taille='2em'){
	return '\\makebox['+taille+'][l]{$\\dfrac{'+a+'}{'+b+'}$}'
}




/**
* Écrit du texte en mode mathématiques
* @Auteur Rémi Angot
*/
function tex_texte(texte) {
	return '~\\text{'+texte+'}'
}

/**
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