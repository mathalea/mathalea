import { texteParPosition, } from "/modules/2d.js";
import { fraction } from "/modules/Fractions.js";

// Fonctions diverses pour la création des exercices

export function liste_de_question_to_contenu(argument) {
	if (sortie_html) {
		argument.contenu = html_consigne(argument.consigne) + html_paragraphe(argument.introduction) + html_enumerate(argument.liste_questions, argument.spacing);
		argument.contenu_correction = html_paragraphe(argument.consigne_correction) + html_enumerate(argument.liste_corrections, argument.spacing_corr);
	} else {
		let vspace = '';
		if (argument.vspace) {
			vspace = `\\vspace{${argument.vspace} cm}\n`;
		}
		if (!mathalea.sortieAMC) {
			if (document.getElementById('supprimer_reference').checked == true) {
				argument.contenu = tex_consigne(argument.consigne) + vspace + tex_introduction(argument.introduction) + tex_multicols(tex_enumerate(argument.liste_questions, argument.spacing), argument.nb_cols);
			} else {
				argument.contenu = tex_consigne(argument.consigne) + `\n\\marginpar{\\footnotesize ${argument.id}}` + vspace + tex_introduction(argument.introduction) + tex_multicols(tex_enumerate(argument.liste_questions, argument.spacing), argument.nb_cols);
			}
		}
		argument.contenu_correction = tex_consigne('') + tex_introduction(argument.consigne_correction) + tex_multicols(tex_enumerate(argument.liste_corrections, argument.spacing_corr), argument.nb_cols_corr);
	}

}
export function liste_de_choses_a_imprimer(argument) {
	if (sortie_html) {
		argument.contenu = html_ligne(argument.liste_questions, argument.spacing);
		argument.contenu_correction = "";
	} else {
		let vspace = '';
		if (argument.vspace) {
			vspace = `\\vspace{${argument.vspace} cm}\n`;
		}
		if (document.getElementById('supprimer_reference').checked == true) {
			argument.contenu = tex_multicols(tex_paragraphe(argument.liste_questions, argument.spacing), argument.nb_cols);
		} else {
			argument.contenu = `\n\\marginpar{\\footnotesize ${argument.id}}` + tex_multicols(tex_paragraphe(argument.liste_questions, argument.spacing), argument.nb_cols);
		}
		argument.contenu_correction = "";
	}

}

/**
* Utilise this.liste\_questions et this.liste\_corrections pour remplir this.contenu et this.contenu_correction
* 
* La liste des questions devient une liste HTML ou LaTeX avec html\_ligne() ou tex\_paragraphe()
* @param {exercice} 
* @author Rémi Angot
*/
export function liste_de_question_to_contenu_sans_numero(argument) {
	if (sortie_html) {
		argument.contenu = html_consigne(argument.consigne) + html_paragraphe(argument.introduction) + html_ligne(argument.liste_questions, argument.spacing);
		argument.contenu_correction = html_consigne(argument.consigne_correction) + html_ligne(argument.liste_corrections, argument.spacing_corr);
	} else {
		if (document.getElementById('supprimer_reference').checked == true) {
			argument.contenu = tex_consigne(argument.consigne) + tex_introduction(argument.introduction) + tex_multicols(tex_paragraphe(argument.liste_questions, argument.spacing), argument.nb_cols);
		} else {
			argument.contenu = tex_consigne(argument.consigne) + `\n\\marginpar{\\footnotesize ${argument.id}}` + tex_introduction(argument.introduction) + tex_multicols(tex_paragraphe(argument.liste_questions, argument.spacing), argument.nb_cols);
		}
		// argument.contenu_correction = tex_consigne(argument.consigne_correction) + tex_multicols(tex_enumerate_sans_numero(argument.liste_corrections,argument.spacing_corr),argument.nb_cols_corr)	
		argument.contenu_correction = tex_consigne(argument.consigne_correction) + tex_multicols(tex_paragraphe(argument.liste_corrections, argument.spacing_corr), argument.nb_cols_corr);
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
export function liste_de_question_to_contenu_sans_numero_et_sans_consigne(argument) {
	if (document.getElementById('supprimer_reference').checked == true) {
		argument.contenu = tex_multicols(tex_paragraphe(argument.liste_questions, argument.spacing), argument.nb_cols);
	} else {
		argument.contenu = `\n\\marginpar{\\footnotesize ${argument.id}` + tex_multicols(tex_paragraphe(argument.liste_questions, argument.spacing), argument.nb_cols);
	}
	// argument.contenu_correction = tex_consigne(argument.consigne_correction) + tex_multicols(tex_enumerate_sans_numero(argument.liste_corrections,argument.spacing_corr),argument.nb_cols_corr)	
	argument.contenu_correction = tex_multicols(tex_paragraphe(argument.liste_corrections, argument.spacing_corr), argument.nb_cols_corr);


}



/**
* Renvoie 2 chaines de caractères sur 2 colonnes différentes
* 
* @author Rémi Angot
*/
export function deuxColonnes(cont1, cont2) {
	if (sortie_html) {
		return `
		<div style="float:left;min-width: fit-content;max-width : 35%;margin-right: 30px">
		${cont1}
	 </div>
	 <div style="float:left;min-width: fit-content; max-width : 45%">
		${cont2}
	 </div>
	 <div style="clear:both"></div>`;
	} else {
		return `\\begin{minipage}{.5\\linewidth}
		${cont1}
		\\end{minipage}
		\\begin{minipage}{.5\\linewidth}
		${cont2}
		\\end{minipage}
		`;
	}
}


/**
 * fonctions de comparaison pour les nombres en virgule flottante afin d'éviter les effets de la conversion en virgule flottante.
 * @param {number} a premier nombre 
 * @param {number} b deuxième nombre 
 * @param {number} tolerance seuil positif en dessous duquel une valeur est considérée comme nulle
 * valeur de tolérance par défaut : 0.000001 = constante epsilon définie ci-dessous.
 * @Auteur Jean-Claude Lhote
 */
const epsilon = 0.000001;
export function egal(a, b, tolerance = epsilon) {
	if (Math.abs(a - b) < tolerance) return true;
	else return false;
}
export function superieur(a, b, tolerance = epsilon) {
	if (a - b > tolerance && (!egal(a, b, tolerance))) return true;
	else return false;
}
export function inferieur(a, b, tolerance = epsilon) {
	if (b - a > tolerance && (!egal(a, b, tolerance))) return true;
	else return false;
}
export function superieurouegal(a, b, tolerance = epsilon) {
	if (a - b > tolerance || egal(a, b, tolerance)) return true;
	else return false;
}
export function inferieurouegal(a, b, tolerance = epsilon) {
	if (b - a > tolerance || egal(a, b, tolerance)) return true;
	else return false;
}
export function estentier(a, tolerance = epsilon) {
	if (Math.abs(calcul(a - Math.round(a))) < tolerance) return true;
	else return false;
}
export function quotientier(a, b) {
	if (Number.isInteger(a) && Number.isInteger(b)) {
		let reste = a;
		let quotient = 0;
		while (reste >= b) {
			reste -= b;
			quotient++;
		}
		return quotient;
	}
	else return false;
}
export function carreParfait(x) {
	if (estentier(Math.sqrt(x))) return true;
	else return false;
}

// Petite fonction pour écrire des nombres avec Mathalea2d en vue de poser des opérations...
export function ecrireNombre2D(x, y, n) {
	let nString = nombre_avec_espace(n);
	let nombre2D = [];
	for (let k = 0; k < nString.length; k++) {
		nombre2D.push(texteParPosition(nString[k], x + k * 0.8, y))
	}
	return nombre2D;
}
/*
Pour l'instant, je commente... Faut que je réfléchisse et que je prenne mon temps (que je n'ai pas actuellement)
On verra ça plus tard. La nuit porte conseil.
function ecrireAdditionPosee(x,y,...args){
	let nString=[],n=[]
	for (k=0;k<args.length;k++) {
		nString.push(tex_nombre(args[k]))
		n.push(args[k])
	}
	let nb_chiffres_pe=Math.log10(Math.floor(Math.max(n)))

	for (let k=0;k<args.length;k++){

	}
}
*/
class NombreDecimal {
	constructor(nombre) {
		if (nombre < 0) {
			this.signe = `-`;
			nombre = calcul(-nombre);
		}
		else this.signe = `+`;
		this.exposant = Math.floor(Math.log10(nombre));
		nombre = nombre / 10 ** this.exposant;
		this.mantisse = [];
		for (let k = 0; k < 16; k++) {
			if (egal(Math.ceil(nombre) - nombre, 0, 0.00001)) {
				this.mantisse.push(Math.ceil(nombre));
				nombre = (this.mantisse[k] - nombre) * 10;
			}
			else {
				this.mantisse.push(Math.floor(nombre));
				nombre = (nombre - this.mantisse[k]) * 10;
			}
			if (egal(nombre, 0, 0.001)) 
				break;
		}

	}
	get valeur() {
		return this.recompose();
	}
	recompose() {
		let val = 0;
		for (let i = 0; i < 10; i++)
			val += this.mantisse[i] * 10 ** (-i);
		val = val * 10 ** this.exposant;
		if (this.signe == `+`) return val;
		else return calcul(-val);
	}

}
export function decimal(n) {
	return new NombreDecimal(n);
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

export function creer_couples(E1, E2, nombre_de_couples_min = 10) {

	let result = [], temp = [];
	for (let i in E1) {
		for (let j in E2) {
			result.push([E1[i], E2[j]]);
		}
	}

	temp = shuffle(result).slice(0); // créer un clone du tableau result mélangé
	result = temp.slice(0);
	while (result.length < nombre_de_couples_min) {
		result = result.concat(shuffle(temp));
	}
	return result;
}

// Fonctions mathématiques

/**
* Choisit un nombre au hasard entre min et max sans appartenir à liste\_a\_eviter.
* @param {int} min
* @param {int} max
* @param {liste} liste - Tous les éléments que l'on souhaite supprimer 
*
* @example
* // Renvoie 1, 2 ou 3
* randint (1,3)
* @example
* // Renvoie -1 ou 1
* randint(-1,1,[0])
*
* @author Rémi Angot
* @Source https://gist.github.com/pc035860/6546661
*/
export function randint(min, max, liste_a_eviter = []) {
	//Source : https://gist.github.com/pc035860/6546661
	let range = max - min;
	let rand = Math.floor(Math.random() * (range + 1));
	if (Number.isInteger(liste_a_eviter)) {
		liste_a_eviter = [liste_a_eviter];
	}
	if (liste_a_eviter.length > 0) {
		while (liste_a_eviter.indexOf(min + rand) != -1) {
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
export function strRandom(o) {
	var a = 10,
		b = 'abcdefghijklmnopqrstuvwxyz',
		c = '',
		d = 0,
		e = '' + b;
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
export function enleve_element(array, item) {
	// 
	for (var i = array.length - 1; i >= 0; i--) {
		if (array[i] == item) {
			array.splice(i, 1);
		}
	}
}

/**
 * 
 * Compte les occurenes d'un item dans un tableau
 * @Author Rémi Angot
 */
 export function compteOccurences(array, value) {
    let cpt = 0;
    array.forEach((v) => (v === value && cpt++));
    return cpt;
}

/**
 * Enlève toutes les occurences d'un élément d'un tableau donné mais sans modifier le tableau en paramètre et renvoie le tableau modifié
 * @Auteur Rémi Angot & Jean-Claude Lhote
 */

export function enleve_element_bis(array, item = undefined) {
	let tableaucopie = []
	for (i = 0; i < array.length; i++) {
		tableaucopie.push(array[i]);
	}
	for (var i = tableaucopie.length - 1; i >= 0; i--) {
		if (tableaucopie[i] == item) {
			tableaucopie.splice(i, 1);
		}
	}
	return tableaucopie;
}

/**
 * Enlève l'élément index d'un tableau
 * @Auteur Jean-Claude Lhote
 */
export function enleve_element_No(array, index) {
	array.splice(index, 1);
}
/**
 * Enlève l'élément index d'un tableau sans modifier le tableau et retourne le résultat
 * @Auteur Jean-Claude Lhote
 */
export function enleve_element_No_bis(array, index) {
	let tableaucopie = [];
	for (i = 0; i < array.length; i++) {
		tableaucopie.push(array[i]);
	}
	tableaucopie.splice(index, 1);
	return tableaucopie;
}


/**
* Retourne un élément au hasard de la liste sans appartenir à une liste donnée
* @param {liste} 
* @param {liste_a_eviter}
*
* @example
* // Renvoie 1, 2 ou 3
* choice([1,2,3])
* @example
* // Renvoie Rémi ou Léa
* choice(['Rémi','Léa'])
*
* @author Rémi Angot
*/
export function choice(liste, liste_a_eviter = []) {
	//copie la liste pour ne pas y toucher (ce n'est pas le but de choice)
	let listebis = liste.slice();
	// Supprime les éléments de liste à éviter
	for (let i = 0; i < liste_a_eviter.length; i++) {
		enleve_element(listebis, liste_a_eviter[i]);
	}
	var index = Math.floor(Math.random() * listebis.length);
	return listebis[index];
}

/**
* Retourne une liste des entiers de 0 à max sans appartenir à une liste donnée
* @param {max} 
* @param {liste_a_eviter}
*
* @example
* // Renvoie [1,4,5,6,7,8,9,10]
* range(10,[2,3])
*
* @author Rémi Angot
*/
export function range(max, liste_a_eviter = []) {
	// Créer un tableau avec toutes les valeurs de 0 à max sauf celle de la liste à éviter
	let nb_max = parseInt(max, 10);
	let liste = [...Array(nb_max + 1).keys()];
	for (let i = 0; i < liste_a_eviter.length; i++) {
		enleve_element(liste, liste_a_eviter[i]);
	}
	return liste;
}

/**
* Retourne une liste entre 2 bornes sans appartenir à une liste donnée (par défaut des entiers mais on peut changer le pas)
* @param {min} 
* @param {max} 
* @param {liste_a_eviter}
*
* @example
* // Renvoie [6,7,10]
* range(6,10,[8,9])
*
* @author Rémi Angot
*/
export function rangeMinMax(min, max, liste_a_eviter = [], step = 1) {
	// Créer un tableau avec toutes les valeurs de 0 à max sauf celle de la liste à éviter
	let liste = [];
	for (let i = min; i <= max; i = calcul(i + step)) {
		liste.push(i);
	}
	for (let i = 0; i < liste_a_eviter.length; i++) {
		enleve_element(liste, liste_a_eviter[i]);
	}
	return liste;
}

/**
* Créé un tableau avec toutes les valeurs de 1 à max sauf celle de la liste à éviter
* 
*
* @param {int} max
* @param {liste} liste valeurs à éviter 
* @author Rémi Angot
*/
export function range1(max, liste_a_eviter = []) {
	let nb_max = parseInt(max, 10);
	let liste = [];
	for (let i = 1; i <= nb_max; i++) {
		liste.push(i);
	}
	for (let i = 0; i < liste_a_eviter.length; i++) {
		enleve_element(liste, liste_a_eviter[i]);
	}
	return liste;
}


/**
* Fonction de comparaison à utiliser avec tableau.sort(compare_fractions)
*
* Le tableau doit être du type `[[num,den],[num2,den2]]`
*
* @author Rémi Angot
*/
export function compare_fractions(a, b) {
	if ((a[0] / a[1]) > (b[0] / b[1]))
		return 1;
	if ((a[0] / a[1]) < (b[0] / b[1]))
		return -1;
	// Sinon il y a égalité
	return 0;
}


/**
* Fonction de comparaison à utiliser avec tableau.sort(compare_nombres)
*
*
* @author Rémi Angot
*/
export function compare_nombres(a, b) {
	return a - b;
}
/**
 * 
 * Copié sur https://delicious-insights.com/fr/articles/le-piege-de-array-sort/
 */
export function numTrie(arr) {
	return arr.sort(function (a, b) {
		return a - b;
	});
}

/*
* Mélange les items d'un tableau, sans modifier le tableau passé en argument
*
* @Example
* tableau_melange = shuffle (tableau_origine)
* @Source https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
*/
export function shuffle(array) {
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
* Mélange les lettres d'un string
*
* @Example
* motMelange = shuffleLettres (mot)
* @Source https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
*/
export function shuffleLettres(txt) {
	const array = txt.split('')
	return shuffle(array).join('')
}



/*
* Mélange les items de deux tableaux de la même manière
*
* 
* @Source https://stackoverflow.com/questions/18194745/shuffle-multiple-javascript-arrays-in-the-same-way
*/
export function shuffle2tableaux(obj1, obj2) {
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
export function tridictionnaire(dict) {
	var sorted = [];
	for (var key in dict) {
		sorted[sorted.length] = key;
	}
	sorted.sort();

	var tempDict = {};
	for (var i = 0; i < sorted.length; i++) {
		tempDict[sorted[i]] = dict[sorted[i]];
	}

	return tempDict;
}

/*
* Filtre un dictionnaire suivant les premiers caractères de ses clés
*
* @Example
* filtreDictionnaire(dict,'6N') renvoie un dictionnaire où toutes les clés commencent par 6N
* @Auteur Rémi Angot
*/
export function filtreDictionnaire(dict, sub) {
	return Object.assign({}, ...
		Object.entries(dict).filter(([k]) => k.substring(0, sub.length) == sub).map(([k, v]) => ({ [k]: v }))
	);
}

/*
* Polyfill Object.fromEntries
*
* Source : https://gitlab.com/moongoal/js-polyfill-object.fromentries/
*/
if (!Object.fromEntries) {
	Object.defineProperty(Object, 'fromEntries', {
		value(entries) {
			if (!entries || !entries[Symbol.iterator]) { throw new Error('Object.fromEntries() requires a single iterable argument'); }

			const o = {};

			Object.keys(entries).forEach((key) => {
				const [k, v] = entries[key];

				o[k] = v;
			});

			return o;
		},
	});
}


/*
* Filtre un dictionnaire suivant la valeur d'une clé
*
* @Example
* filtreDictionnaireValeurCle(dict,'annee',2020) renvoie un dictionnaire où toutes les clés annee seront égales à 2020
* @Auteur Rémi Angot
*/
export function filtreDictionnaireValeurCle(dict, key, val) {
	return Object.fromEntries(Object.entries(dict).filter(([k, v]) => v[key] == val));
}

/*
* Filtre un dictionnaire si une valeur appartient à une clé de type tableau
*
* @Example
* filtreDictionnaireValeurCle(dict,'annee',2020) renvoie un dictionnaire où toutes les clés annee seront égales à 2020
* @Auteur Rémi Angot
*/
export function filtreDictionnaireValeurTableauCle(dict, key, val) {
	return Object.fromEntries(Object.entries(dict).filter(([k, v]) => cleExisteEtContient(v[key], val)));
}

function cleExisteEtContient(v, val) {
	if (v != undefined) {
		return v.includes(val)
	} else {
		return false
	}
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
export function combinaison_listes(liste, taille_minimale) {
	if (liste.length == 0) return []
	let l = shuffle(liste);
	while (l.length < taille_minimale) {
		l = l.concat(shuffle(liste))
	}
	return l
}

export function combinaison_listes_sans_changer_ordre(liste, taille_minimale) {
	// Concatène liste à elle même en changeant 
	while (liste.length < taille_minimale) {
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
export function rien_si_1(a) {
	if (a == 1) {
		return ''
	} else if (a == -1) {
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
export function exposant(texte) {
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
export function ecriture_nombre_relatif(a) {
	let result = '';
	if (a > 0) {
		result = '(+' + a + ')'
	} else if (a < 0) {
		result = '(' + a + ')'
	} else { // ne pas mettre de parenthèses pour 0
		result = '0'
	}
	return result;
}
/**
 * Idem ecriture_nombre_relatif avec le code couleur : vert si positif, rouge si négatif, noir si nul
 * @param {number} a 
 */
export function ecriture_nombre_relatifc(a) {
	let result = '';
	if (a > 0) {
		result = mise_en_evidence('(+' + tex_nombrec(a) + ')', 'blue');
	} else if (a < 0) {
		result = mise_en_evidence('(' + tex_nombrec(a) + ')');
	} else { // ne pas mettre de parenthèses pour 0
		result = mise_en_evidence('0', 'black');
	}
	return result;
}

/**
* Ajoute le + devant les nombres positifs
* @Example
* //+3 ou -3
* @Auteur Rémi Angot
*/
export function ecriture_algebrique(a) {
	let result = '';
	if (a >= 0) {
		result = '+' + tex_nombrec(a);
	} else {
		result = tex_nombrec(a);
	}
	return result;
}

/**
* Ajoute le + devant les nombres positifs, n'écrit rien si 1
* @Example
* //+3 ou -3
* @Auteur Rémi Angot
*/
export function ecriture_algebrique_sauf1(a) {
	let result = '';
	if (a >= 0) {
		result = '+' + tex_nombrec(a);
	}
	if (a < 0) {
		result = tex_nombrec(a);
	}
	if (a == 1) {
		result = '+';
	}
	if (a == -1) {
		result = '-';
	}
	return result;
}

/**
 * Idem ecriture_algebrique mais retourne le nombre en couleur (vert si positif, rouge si négatif et noir si nul)
 * @param {number} a 
 */
export function ecriture_algebriquec(a) {
	let result = '';
	if (a > 0) {
		result = mise_en_evidence('+' + tex_nombrec(a), 'blue');
	} else if (a < 0) {
		result = mise_en_evidence(tex_nombrec(a));
	} else result = mise_en_evidence(tex_nombrec(a), 'black');
	return result;
}

/**
* Ajoute des parenthèses aux nombres négatifs
* @Example
* // 3 ou (-3)
* @Auteur Rémi Angot
*/
export function ecriture_parenthese_si_negatif(a) {
	let result = '';
	if (a >= 0) {
		result = a;
	} else {
		result = `(${a})`;
	}
	return result;
}

/**
* Ajoute des parenthèses si une expression commence par un moins
* @Example
* // (-3x)
* @Auteur Rémi Angot
*/
export function ecriture_parenthese_si_moins(expr) {
	let result = '';
	if (expr[0] == '-') {
		result = `(${expr})`;
	} else {
		result = expr;
	}
	return result;
}

/**
 * 
 * @Auteur Jean-claude Lhote
 * @param {numero} 1=A, 2=B ..
 * @param {etapes} tableau de chaines comportant les expressions à afficher dans le membre de droite.
 */

export function calcul_aligne(numero, etapes) {
	let script = `$\\begin{aligned}${mise_en_evidence(lettre_depuis_chiffre(numero))}&=${etapes[0]}`;
	for (let i = 1; i < etapes.length - 1; i++) {
		script += `\\\\&=${etapes[i]}`;
	}
	script += `\\\\${mise_en_evidence(lettre_depuis_chiffre(numero) + '&=' + etapes[etapes.length - 1])}$`;
	return script;
}

/**
* Renvoie la valeur du chiffre (8->8, A->10, B->11...)
* 
* @Auteur Rémi Angot
*/
export function valeur_base(n) {
	switch (n) {
		case 'A': return 10;
		case 'B': return 11;
		case 'C': return 12;
		case 'D': return 13;
		case 'E': return 14;
		case 'F': return 15;
		default: return parseInt(n);
	}
}

/**
* Convertit un angle de radian vers degrés et fonction inverse
* @Example
* // PI->180
* @Auteur Jean-Claude Lhote
*/
Math.degres = function (radians) {
	return radians * 180 / Math.PI;
}
Math.radians = function (degres) {
	return degres * Math.PI / 180;
}

/**
 * 
 * @param {array} matrice M tableau 3x3 nombres
 * @param {array} vecteur A tableau 3 nombres
 * Fonction pouvant être utilisée en 2d avec des coordonnées homogènes
 * elle retourne le vecteur [x,y,z] résultat de M.A
 * @Auteur Jean-Claude Lhote
 */

export function produit_matrice_vecteur_3x3(matrice, vecteur) { // matrice est un tableau 3x3 sous la forme [[ligne 1],[ligne 2],[ligne 3]] et vecteur est un tableau de 3 nombres [x,y,z]
	let resultat = [0, 0, 0];
	for (let j = 0; j < 3; j++) { // Chaque ligne de la matrice 
		for (let i = 0; i < 3; i++) { // On traite la ligne i de la matrice -> résultat = coordonnée i du vecteur résultat
			resultat[j] += matrice[j][i] * vecteur[i];
		}
	}
	return resultat;
}
/**
 * 
 * @param {array} matrice1 Matrice A
 * @param {array} matrice2 Matrice B
 * retourne la matrice A.B
 * @Auteur Jean-Claude Lhote
 */

export function produit_matrice_matrice_3x3(matrice1, matrice2) { // les deux matrices sont des tableaux 3x3  [[ligne 1],[ligne 2],[ligne 3]] et le résultat est de la même nature.
	let resultat = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
	for (let j = 0; j < 3; j++)
		for (let i = 0; i < 3; i++)
			for (let k = 0; k < 3; k++)
				resultat[j][i] += matrice1[j][k] * matrice2[k][i];
	return resultat;
}
/**
 * 
 * @param {array} point
 * calcule les coordonnées d'un point donné par ses coordonnées en repère orthonormal en repère (O,I,J) tel que IOJ=60° 
 * @Auteur Jean-Claude Lhote
 */
export function changement_de_base_ortho_tri(point) {
	if (point.length == 2) point.push(1);
	return produit_matrice_vecteur_3x3([[1, -Math.cos(Math.PI / 3) / Math.sin(Math.PI / 3), 0], [0, 1 / Math.sin(Math.PI / 3), 0], [0, 0, 1]], point);
}
/**
 * 
 * @param {array} point 
 * Changement de base inverse de la fonction précédente
 * @Auteur Jean-CLaude Lhote
 */
export function changement_de_base_tri_ortho(point) {
	if (point.length == 2) point.push(1);
	return produit_matrice_vecteur_3x3([[1, Math.cos(Math.PI / 3), 0], [0, Math.sin(Math.PI / 3), 0], [0, 0, 1]], point);
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
export function image_point_par_transformation(transformation, pointA, pointO, vecteur = [], rapport = 1) { //pointA,centre et pointO sont des tableaux de deux coordonnées
	// on les rends homogènes en ajoutant un 1 comme 3ème coordonnée)
	// nécessite d'être en repère orthonormal...
	// Point O sert pour les rotations et homothéties en tant que centre (il y a un changement d'origine du repère en O pour simplifier l'expression des matrices de transformations.)

	let matrice_sym_obl1 = matriceCarree([[0, 1, 0], [1, 0, 0], [0, 0, 1]]); //x'=y et y'=x
	let matrice_sym_xxprime = matriceCarree([[1, 0, 0], [0, -1, 0], [0, 0, 1]]); // x'=x et y'=-y
	let matrice_sym_yyprime = matriceCarree([[-1, 0, 0], [0, 1, 0], [0, 0, 1]]); // x'=-x et y'=y
	let matrice_sym_obl2 = matriceCarree([[0, -1, 0], [-1, 0, 0], [0, 0, 1]]); // x'=-y et y'=-x
	let matrice_quart_de_tour_direct = matriceCarree([[0, -1, 0], [1, 0, 0], [0, 0, 1]]); // x'=-y et y'=x
	let matrice_quart_de_tour_indirect = matriceCarree([[0, 1, 0], [-1, 0, 0], [0, 0, 1]]); // x'=y et y'=-x
	let matrice_sym_centrale = matriceCarree([[-1, 0, 0], [0, -1, 0], [0, 0, 1]]); // x'=-x et y'=-y
	let matrice_rot_60_direct = matriceCarree([[0.5, -Math.sin(Math.PI / 3), 0], [Math.sin(Math.PI / 3), 0.5, 0], [0, 0, 1]]);
	let matrice_rot_60_indirect = matriceCarree([[0.5, Math.sin(Math.PI / 3), 0], [-Math.sin(Math.PI / 3), 0.5, 0], [0, 0, 1]]);
	let matrice_rot_120_direct = matriceCarree([[-0.5, -Math.sin(Math.PI / 3), 0], [Math.sin(Math.PI / 3), -0.5, 0], [0, 0, 1]]);
	let matrice_rot_120_indirect = matriceCarree([[-0.5, Math.sin(Math.PI / 3), 0], [-Math.sin(Math.PI / 3), -0.5, 0], [0, 0, 1]]);

	let x2, y2, u, v, k, pointA1 = [0, 0, 0], pointA2 = [0, 0, 0];

	if (pointA.length == 2) pointA.push(1);
	x2 = pointO[0];  // Point O' (origine du repère dans lequel les transformations sont simples (centre des rotations et point d'intersection des axes))
	y2 = pointO[1];
	u = vecteur[0]; // (u,v) vecteur de translation.
	v = vecteur[1];
	k = rapport; // rapport d'homothétie


	let matrice_chgt_repere = matriceCarree([[1, 0, x2], [0, 1, y2], [0, 0, 1]]);
	let matrice_chgt_repereinv = matriceCarree([[1, 0, -x2], [0, 1, -y2], [0, 0, 1]]);
	let matrice_translation = matriceCarree([[1, 0, u], [0, 1, v], [0, 0, 1]]);
	let matrice_homothetie = matriceCarree([[k, 0, 0], [0, k, 0], [0, 0, 1]]);
	let matrice_homothetie2 = matriceCarree([[1 / k, 0, 0], [0, 1 / k, 0], [0, 0, 1]]);

	let matrice;

	switch (transformation) {
		case 1:
			matrice = matrice_sym_obl1.multiplieMatriceCarree(matrice_chgt_repereinv);
			break;
		case 2:
			matrice = matrice_sym_obl2.multiplieMatriceCarree(matrice_chgt_repereinv);
			break;
		case 3:
			matrice = matrice_sym_xxprime.multiplieMatriceCarree(matrice_chgt_repereinv);
			break;
		case 4:
			matrice = matrice_sym_yyprime.multiplieMatriceCarree(matrice_chgt_repereinv);
			break;
		case 5:
			matrice = matrice_quart_de_tour_direct.multiplieMatriceCarree(matrice_chgt_repereinv);
			break;
		case 6:
			matrice = matrice_quart_de_tour_indirect.multiplieMatriceCarree(matrice_chgt_repereinv);
			break;
		case 7:
			matrice = matrice_sym_centrale.multiplieMatriceCarree(matrice_chgt_repereinv);
			break;
		case 11:
			matrice = matrice_rot_60_direct.multiplieMatriceCarree(matrice_chgt_repereinv);
			break;
		case 12:
			matrice = matrice_rot_60_indirect.multiplieMatriceCarree(matrice_chgt_repereinv);
			break;
		case 13:
			matrice = matrice_rot_120_direct.multiplieMatriceCarree(matrice_chgt_repereinv);
			break;
		case 14:
			matrice = matrice_rot_120_indirect.multiplieMatriceCarree(matrice_chgt_repereinv);
			break;
		case 8:
			matrice = matrice_translation.multiplieMatriceCarree(matrice_chgt_repereinv);
			break;
		case 9:
			matrice = matrice_homothetie.multiplieMatriceCarree(matrice_chgt_repereinv);
			break;
		case 10:
			matrice = matrice_homothetie2.multiplieMatriceCarree(matrice_chgt_repereinv);
			break;
	}
	pointA1 = matrice.multiplieVecteur(pointA);
	pointA2 = matrice_chgt_repere.multiplieVecteur(pointA1);
	return pointA2;
}

/**
* Retourne le signe d'un nombre
* @Example
* // + ou -
* @Auteur Rémi Angot
*/
export function signe(a) { // + ou -
	let result = '';
	if (a > 0) {
		result = '+';
	} else {
		result = '-';
	}
	return result;
}

/**
 * 
 * @param {number} a 
 * -1 si a est négatif, 1 sinon.
 * @Auteur Jean-Claude Lhote
 */
export function unSiPositifMoinsUnSinon(a) {
	if (a < 0) return -1;
	else return 1;
}
/**
* Retourne un string avec la somme des chiffres
* @Example
* somme_des_chiffres(123)
* // 6
* @Auteur Rémi Angot
*/export function somme_des_chiffre(n) {
	let somme_string = '';
	for (let i = 0; i < n.length - 1; i++) {
		somme_string += n[i] + '+';
	}
	somme_string += n[n.length - 1];
	return somme_string;
}

/**
* Retourne l'arrondi (par défaut au centième près)
* 
* @Auteur Rémi Angot
*/
export function arrondi(nombre, precision = 2) {
	let tmp = Math.pow(10, precision);
	return Math.round(nombre * tmp) / tmp;
}
/**
 * Retourne la troncature signée de nombre.
 * @Auteur Jean-Claude Lhote
 */
export function troncature(nombre, precision) {
	let absolu, tronc;
	let tmp = Math.pow(10, precision);

	absolu = Math.abs(nombre);
	tronc = calcul(Math.floor(absolu * tmp) / tmp);
	if (nombre < 0) return -tronc;
	else return tronc;
}

/**
* Renvoie la valeur absolue
* @Auteur Rémi Angot
*/
export function abs(a) {
	return Math.abs(a);
}

/**
* Retourne un arrondi sous la forme d'un string avec une virgule comme séparateur décimal
* @Auteur Rémi Angot
*/
export function arrondi_virgule(nombre, precision = 2) { //
	let tmp = Math.pow(10, precision);
	return String(Math.round(nombre * tmp) / tmp).replace('.', ',');
}

/**
* Renvoie le PGCD de deux nombres
* @Auteur Rémi Angot
*/
export function pgcd(a, b) {
	return parseInt(Algebrite.run(`gcd(${a},${b})`));
}

/**
* Renvoie le PPCM de deux nombres
* @Auteur Rémi Angot
*/
export const ppcm = (a, b) => { return parseInt(Algebrite.run(`lcm(${a},${b})`));
}


/**
* Retourne le numérateur et le dénominateur de la fraction passée en argument sous la forme (numérateur,dénominateur)réduite au maximum dans un tableau [numérateur,dénominateur]
* * **ATTENTION Fonction clonée dans la classe Fraction()**
* @Auteur Rémi Angot
*/
export function fraction_simplifiee(n, d) {
	let p = pgcd(n, d);
	let ns = n / p;
	let ds = d / p;
	if (ns < 0 && ds < 0) {
		[ns, ds] = [-ns, -ds];
	}
	if (ns > 0 && ds < 0) {
		[ns, ds] = [-ns, -ds];
	}
	return [ns, ds];
}

/**
* Retourne le code LaTeX d'une fraction simplifiée ou d'un nombre entier 
* @Auteur Rémi Angot
*/
export function tex_fraction_reduite(n, d) {
	if (Math.abs(n) % Math.abs(d) == 0) {
		return n / d;
	} else {
		return tex_fraction_signe(fraction_simplifiee(n, d)[0], fraction_simplifiee(n, d)[1]);
	}
}
/**
 * produit_de_deux_fractions(num1,den1,num2,den2) retourne deux chaines :
 * la première est la fraction résultat, la deuxième est le calcul mis en forme Latex avec simplification éventuelle
 * Applique une simplification si le numérateur de l'une est égal au dénominateur de l'autre.
 */
export function produit_de_deux_fractions(num1, den1, num2, den2) {
	let num, den, tex_produit;
	if (num1 == den2) {
		tex_produit = `\\dfrac{\\cancel{${num1}}\\times ${num2}}{${den1}\\times\\cancel{${den2}}}`;
		num = num2;
		num1 = 1;
		den2 = 1;
		den = den1;
	}
	else if (num2 == den1) {
		tex_produit = `\\dfrac{${num1}\\times \\cancel{${num2}}}{\\cancel{${den1}}\\times${den2}}`;
		num = num1;
		num2 = 1;
		den1 = 1;
		den = den2;
	}
	else {
		num = num1 * num2;
		den = den1 * den2;
		tex_produit = `\\dfrac{${num1}\\times ${num2}}{${den1}\\times${den2}}`;
	}
	return [tex_fraction(num, den), tex_produit, [num1, den1, num2, den2]];
}

/**
*
* Simplifie une fraction en montrant les étapes
* Le résultat est un string qui doit être entouré de $ pour le mode mathématiques
* @Auteur Rémi Angot
*/
export function simplification_de_fraction_avec_etapes(num, den) {
	// Est-ce que le résultat est simplifiable ?
	let result = '';
	let s = pgcd(num, den);
	if (s != 1) {
		if ((num) % (den) == 0) { //si le résultat est entier
			result = `=${(num) / (den)}`;
		} else {
			result = `=${tex_fraction(Algebrite.eval((num) / s) + mise_en_evidence('\\times' + s), Algebrite.eval(den / s) + mise_en_evidence('\\times' + s))}=${tex_fraction_signe(Algebrite.eval((num) / s), Algebrite.eval(den / s))}`;
		}
	}
	return result;
}

/**
 * Retourne l'égalité des produits en croix à partir d'un tableau contenant les deux fractions [[a,b],[c,d]] pour a/b=c/d retourne ad=bc
 * Le résultat est un string en mode maths inline
 * @auteur Jean-Claude Lhote
 */

export function produits_en_croix([[a, b], [c, d]]) { // écrit une chaine pour a*d=b*c
	let result = ``;
	result += `$${a}\\times${d}=${b}\\times${c}$`;
	return result;
}

/**
 * Retourne la quatrième proportionnelle de 3 nombres en fonction d'une précision demandée
 * Le résultat est un string qui doit être entouré de $ pour le mode mathématiques
 * @auteur Jean-Claude Lhote
 */

export function quatrieme_proportionnelle(a, b, c, precision) { //calcul de b*c/a
	let result = ``
	if ((typeof a) == "number" && (typeof b) == "number" && (typeof c) == "number") {
		if (a == 0) {
			result = '=erreur : division par zéro';
			return result;
		}
		let p4 = calcul(b * c / a);
		result += `\\dfrac{${tex_nombrec(b)}\\times${tex_nombrec(c)}}{${tex_nombrec(a)}}`;
		if (p4 == arrondi(p4, precision)) result += `=`;
		else result += `\\approx`;
		result += `${arrondi_virgule(p4, precision)}`;
		return result;
	}
	else {
		return `\\dfrac{${b} \\times${c}}{${a}}`;
	}
}

/**
 * renvoie une chaine correspondant à l'écriture réduite de ax+b selon les valeurs de a et b
 * @Auteur Jean-Claude Lhote
 * @param {number} a 
 * @param {number} b 
 */
export function reduire_ax_plus_b(a, b) {
	let result = ``;
	if (a != 0) if (a == 1) result = 'x';
	else if (a == -1) result = '-x';
	else result = `${tex_nombrec(a)}x`;
	if (b != 0) if (a != 0) result += `${ecriture_algebrique(b)}`;
	else result = tex_nombrec(b);
	else if (a == 0) result = '0';
	return result;
}
/**
 * renvoie une chaine correspondant à l'écriture réduite de ax^3+bx^2+cx+d selon les valeurs de a,b,c et d
 * @Auteur Jean-Claude Lhote
 */
export function reduire_polynome_degre3(a, b, c, d) {
	let result = "";
	if (a != 0) {
		switch (a) {
			case 1:
				result += 'x^3';
				break;
			case -1:
				result += '-x^3';
				break;
			default:
				result += `${a}x^3`
				break;
		}
		if (b != 0) {
			switch (b) {
				case 1:
					result += '+x^2';
					break;
				case -1:
					result += '-x^2';
					break;
				default:
					result += `${ecriture_algebrique(b)}x^2`;
					break;
			}
		}
		if (c != 0) {
			switch (c) {
				case 1:
					result += '+x';
					break;
				case -1:
					result += '-x';
					break;
				default:
					result += `${ecriture_algebrique(c)}x`
					break
			}
		}
		if (d != 0) {
			result += `${ecriture_algebrique(d)}`
		}
	}
	else { // degré 2 pas de degré 3
		if (b != 0) {
			switch (b) {
				case 1:
					result += 'x^2';
					break;
				case -1:
					result += '-x^2';
					break;
				default:
					result += `${b}x^2`;
					break;
			}
			if (c != 0) {
				switch (c) {
					case 1:
						result += '+x';
						break;
					case -1:
						result += '-x';
						break;
					default:
						result += `${ecriture_algebrique(c)}x`;
						break;
				}
			}
			if (d != 0) {
				result += `${ecriture_algebrique(d)}`;
			}
		}
		else  // degré 1 pas de degré 2 ni de degré 3
			if (c != 0) {
				switch (c) {
					case 1:
						result += 'x';
						break;
					case -1:
						result += '-x';
						break;
					default:
						result += `${c}x`;
						break;
				}
				if (d != 0) {
					result += `${ecriture_algebrique(d)}`;
				}
			}
			else { // degré 0 a=0, b=0 et c=0
				result += `${d}`;
			}

	}
	return result;
}


/**
*
* Donne la liste des facteurs premiers d'un nombre
* @Auteur Rémi Angot
*/
export function obtenir_liste_facteurs_premiers(n) {
	// Algorithme de base où l'on divise par chacun des nombres premiers 
	let liste = [];
	let liste_nombres_premiers = obtenir_liste_nombres_premiers();
	let i = 0;
	while (n > 1 && liste_nombres_premiers[i] <= n) {
		if (n % liste_nombres_premiers[i] == 0) {
			liste.push(liste_nombres_premiers[i]);
			n /= liste_nombres_premiers[i];
		} else {
			i++;
		}
	}
	if (liste.length == 0) { liste.push(n) }
	return liste;
}
/**
 * 
 * @param {Entier} n 
 * Retourne la factorisation d'un entier sous la forme [[a0,n0],[a1,n1],...] où a0,a1 sont les facteurs premiers et n0, n1 sont les exposants de ces facteurs.
 * @Auteur Jean-Claude Lhote
 */

export function factorisation(n) {
	let liste = obtenir_liste_facteurs_premiers(n)
	let facto = [], index = 0
	for (let i = 0; i < liste.length;) {
		if (liste[i] == 0) i++
		else {
			facto.push([liste[i], 1])
			index++
			for (let j = i + 1; j < liste.length; j++) {
				if (liste[j] == liste[i]) {
					facto[index - 1][1]++
					liste[j] = 0
				}
			}
			i++
		}
	}
	return facto
}
/**
 * 
 * @param {Entier} n 
 * Extrait le plus grand nombre possible de la racine carrée de n
 * retourne le résulat [a,b] pour a²b=n
 * @Auteur Jean-Claude Lhote
 */
export function extraire_racine_carree(n) {
	let facto = factorisation(n)
	let radical = 1, facteur = 1
	for (let i = 0; i < facto.length; i++) {
		if (facto[i][1] % 2 == 0) {
			facteur *= facto[i][0] ** (calcul(facto[i][1] / 2));
		}
		else if (facto[i][1] > 1) {
			facteur *= facto[i][0] ** (calcul((facto[i][1] - 1) / 2));
			radical *= facto[i][0]
		}
		else radical *= facto[i][0]
	}
	return [facteur, radical]
}
/**
 * 
 * @param {Entier} n 
 * retourne le code Latex de la racine carrée de n "réduite" 
 * @Auteur Jean-CLaude Lhote
 */
export function tex_racine_carree(n) {
	let result = extraire_racine_carree(n)
	if (result[1] == 1) return `${result[0]}`
	else if (result[0] == 1) return `\\sqrt{${result[1]}}`
	else return `${result[0]}\\sqrt{${result[1]}}`
}

/**
* Utilise giac/xcas 
* 
* @Auteur Rémi Angot
*/
export function xcas(expression) {
	return UI.eval(`latex(${expression})`).replaceAll('\\cdot ', '~').replaceAll("\\frac", "\\dfrac").replaceAll('\"', '');

}

/**
* Utilise Algebrite pour s'assurer qu'il n'y a pas d'erreur dans les calculs avec des décimaux
* Le 2e argument facultatif permet de préciser l'arrondi souhaité
* @Auteur Rémi Angot
*/
export function calcul(expression, arrondir = false) {
	if (!arrondir) {
		return parseFloat(Algebrite.eval('float(' + expression + ')'))
	} else {
		return arrondi(parseFloat(Algebrite.eval('float(' + expression + ')')), arrondir);
	}
}

/**
* Utilise Algebrite pour s'assurer qu'il n'y a pas d'erreur dans les calculs avec des décimaux
* Le 2e argument facultatif permet de préciser l'arrondi souhaité
* @Auteur Rémi Angot
*/
export function nombreDecimal(expression, arrondir = false) {
	if (!arrondir) {
		return string_nombre(calcul(expression))
	} else {
		return string_nombre(calcul(expression, 1));
	}
}



/**
* Utilise Algebrite pour s'assurer qu'il n'y a pas d'erreur dans les calculs avec des décimaux et retourne un string avec la virgule comme séparateur décimal
* @Auteur Rémi Angot
*/
export function tex_nombrec(expression) {
	return tex_nombre(parseFloat(Algebrite.eval(expression)));
}
/**
 * renvoie le résultat de l'expression en couleur (vert=positif, rouge=négatif, noir=nul)
 * @param {string} expression l'expression à calculer
 */
export function tex_nombrecoul(nombre) {
	if (nombre > 0) return mise_en_evidence(tex_nombrec(nombre), 'green')
	else if (nombre < 0) return mise_en_evidence(tex_nombrec(nombre), 'red');
	else return mise_en_evidence(tex_nombrec(0), 'black');
}

/**
 * prend une liste de nombres relatifs et la retourne avec les positifs au début et les négatifs à la fin.
 * @param {array} liste la liste de nombres à trier
 */
export function trie_positifs_negatifs(liste) {
	let positifs = []
	let negatifs = []
	for (let i = 0; i < liste.length; i++) {
		if (liste[i] > 0) positifs.push(liste[i])
		else negatifs.push(liste[i])
	}
	return positifs.concat(negatifs)
}

/**
* Renvoie un tableau (somme des termes positifs, somme des termes négatifs)
* @Auteur Rémi Angot
*/
export function somme_des_termes_par_signe(liste) {
	let somme_des_positifs = 0, somme_des_negatifs = 0;
	for (var i = 0; i < liste.length; i++) {
		if (liste[i] > 0) {
			somme_des_positifs += liste[i]
		} else {
			somme_des_negatifs += liste[i]
		}
	}
	return [somme_des_positifs, somme_des_negatifs]
}


/**
* Créé un string de nbsommets caractères dans l'ordre alphabétique et en majuscule qui ne soit pas dans la liste donnée en 2e argument
* @Auteur Rémi Angot
*/
export function creerNomDePolygone(nbsommets, liste_a_eviter = []) {
	let premiersommet = randint(65, 90 - nbsommets);
	let polygone = "";
	for (let i = 0; i < nbsommets; i++) {
		polygone += String.fromCharCode(premiersommet + i)
	}

	if (liste_a_eviter.length < 26 - nbsommets - 1) { // On évite la liste à éviter si elle n'est pas trop grosse sinon on n'en tient pas compte
		let cpt = 0;
		while (possedeUnCaractereInterdit(polygone, liste_a_eviter) && cpt < 20) {
			polygone = "";
			premiersommet = randint(65, 90 - nbsommets);
			for (let i = 0; i < nbsommets; i++) {
				polygone += String.fromCharCode(premiersommet + i)
			}
			cpt++; // Au bout de 20 essais on laisse tomber la liste à éviter
		}
	} else {
		console.log("Trop de questions donc plusieurs polygones peuvent avoir le même nom")
	}
	return polygone
}

/**
* Vérifie dans un texte si un de ses caractères appartient à une liste à éviter
* @Auteur Rémi Angot
*/
export function possedeUnCaractereInterdit(texte, liste_a_eviter) {
	let result = false
	for (let mot_a_eviter of liste_a_eviter) {
		for (let i = 0; i < mot_a_eviter.length; i++) {
			if (texte.indexOf(mot_a_eviter[i]) > -1) {
				result = true
			}
		}
	}
	return result;
}
/**
 * retourne une liste de combien de nombres compris entre m et n (inclus) en évitant les valeurs de liste_a_eviter
 * toutes la liste des nombres est retournée si combien est supérieur à l'effectif disponible
 * les valeurs sont dans un ordre aléatoire.
 * @Auteur Jean-Claude Lhote
 * 
 */
export function choisit_nombres_entre_m_et_n(m, n, combien, liste_a_eviter = []) {
	let t
	if (m > n) {
		t = m;
		m = n;
		n = t;
	}
	else if (m == n)
		return [n];
	if (combien > n - m) combien = n - m;
	let index = rangeMinMax(m, n, liste_a_eviter)
	index = shuffle(index);
	index = index.slice(0, combien)
	return index;
}
/**
 * retourne une liste de lettres majuscules (ou minuscule si majuscule=false)
 * il y aura nombre lettres dans un ordre aléatoire
 * les lettres à éviter sont données dans une chaine par exemple : 'QXY'
 * @Auteur Jean-Claude Lhote
 */
export function choisit_lettres_differentes(nombre, lettres_a_eviter = '', majuscule = true) {
	let liste_a_eviter = [], lettres = []
	for (let l of lettres_a_eviter) {
		liste_a_eviter.push(l.charCodeAt(0) - 64)
	}
	let index = choisit_nombres_entre_m_et_n(1, 26, nombre, liste_a_eviter)
	for (let n of index) {
		if (majuscule) lettres.push(lettre_depuis_chiffre(n))
		else lettres.push(lettre_minuscule_depuis_chiffre(n))
	}
	return lettres
}
export function cesar(word, decal) {
	let mot = '', code = 65;
	for (let x = 0; x < word.length; x++) {
		code = word.charCodeAt(x) % 65
		code = (code + decal) % 26 + 65
		mot += String.fromCharCode(code)
	}
	return mot
}

export function codeCesar(mots, decal) {
	let motsCodes = []
	for (let x = 0; x < mots.length; x++) {
		motsCodes.push(cesar(mots[x], decal))
	}
	return motsCodes
}

/**
* Renvoie une lettre majuscule depuis un nombre compris entre 1 et 702
* @Auteur Rémi Angot
*@Example
* // 0 -> @ 1->A ; 2->B...
* // 27->AA ; 28 ->AB ...
*/
export function lettre_depuis_chiffre(i) {

	let result = ''
	if (i <= 26) {
		result = String.fromCharCode(64 + i)
	} else {
		if (i % 26 == 0) {
			result = String.fromCharCode(64 + Math.floor(i / 26) - 1)
			result += String.fromCharCode(64 + 26)
		} else {
			result = String.fromCharCode(64 + Math.floor(i / 26))
			result += String.fromCharCode(64 + i % 26)
		}
	}
	return result
}

/**
* Renvoie une lettre minuscule depuis un nombre compris entre 1 et 702
* @Auteur Rémi Angot
*@Example
* // 0 -> @ 1->a ; 2->b...
* // 27->aa ; 28 ->ab ...
*/
export function lettre_minuscule_depuis_chiffre(i) {
	return lettre_depuis_chiffre(i).toLowerCase()
}

/**
* @Auteur Rémi Angot
* @Example
* //0h24 est accepté
*/
export function minToHoraire(minutes) {
	var nbHour = parseInt(minutes / 60);
	if (nbHour > 23) {
		nbHour = nbHour - 24
	}
	var nbminuteRestante = (minutes % 60);
	if (nbminuteRestante > 9) {
		return (nbHour + " h " + nbminuteRestante);
	} else {
		return (nbHour + " h 0" + nbminuteRestante);
	}
}

/**
* @Auteur Rémi Angot
* @Example
* //on écrira 24 minutes plutôt que 0h24
*/
export function minToHour(minutes) {
	var nbHour = parseInt(minutes / 60);
	if (nbHour > 23) {
		nbHour = nbHour - 24
	}
	var nbminuteRestante = (minutes % 60);
	if (nbHour == 0) {
		return (nbminuteRestante + ' min')
	} else {
		if (nbminuteRestante > 9) {
			return (nbHour + " h " + nbminuteRestante);
		} else {
			return (nbHour + " h 0" + nbminuteRestante);
		}
	}
}

/**
* Renvoie un prénom féminin au hasard 
* @Auteur Rémi Angot
*/
export function prenomF(n = 1) {
	if (n == 1) {
		return choice(['Aude', 'Béatrice', 'Carine', 'Corinne', 'Dalila', 'Elsa', 'Farida', 'Julie', 'Karole', 'Léa', 'Lisa', 'Manon', 'Marina', 'Magalie', 'Nadia', 'Nawel', 'Teresa', 'Vanessa', 'Yasmine'])
	}
	else {
		return shuffle(['Aude', 'Béatrice', 'Carine', 'Corinne', 'Dalila', 'Elsa', 'Farida', 'Julie', 'Karole', 'Léa', 'Lisa', 'Manon', 'Marina', 'Magalie', 'Nadia', 'Nawel', 'Teresa', 'Vanessa', 'Yasmine']).slice(0, n)
	}
}

/**
* Renvoie un prénom masculin au hasard
* @Auteur Rémi Angot
*/
export function prenomM(n = 1) {
	if (n == 1) {
		return choice(['Arthur', 'Benjamin', 'Bernard', 'Christophe', 'Cyril', 'David', 'Fernando', 'Guillaume', 'Jean-Claude', 'Joachim', 'José', 'Kamel', 'Karim', 'Laurent', 'Mehdi', 'Nacim', 'Pablo', 'Rémi', 'Victor', 'Yazid'])
	}
	else {
		return shuffle(['Arthur', 'Benjamin', 'Bernard', 'Christophe', 'Cyril', 'David', 'Fernando', 'Guillaume', 'Jean-Claude', 'Joachim', 'José', 'Kamel', 'Karim', 'Laurent', 'Mehdi', 'Nacim', 'Pablo', 'Rémi', 'Victor', 'Yazid']).slice(0, n)
	}
}

/**
* Renvoie un prénom au hasard
* @Auteur Rémi Angot
*/
export function prenom(n = 1) {
	if (n == 1) {
		return choice([prenomF(), prenomM()])
	}
	else {
		return shuffle(['Aude', 'Béatrice', 'Carine', 'Corinne', 'Dalila', 'Elsa', 'Farida', 'Julie', 'Karole', 'Léa', 'Lisa', 'Manon', 'Marina', 'Magalie', 'Nadia', 'Nawel', 'Teresa', 'Vanessa', 'Yasmine','Arthur', 'Benjamin', 'Bernard', 'Christophe', 'Cyril', 'David', 'Fernando', 'Guillaume', 'Jean-Claude', 'Joachim', 'José', 'Kamel', 'Karim', 'Laurent', 'Mehdi', 'Nacim', 'Pablo', 'Rémi', 'Victor', 'Yazid']).slice(0, n)
	}
}


/**
* Renvoie un petit objet féminin au hasard 
* @Auteur Mireille Gain
*/
export function objetF() {
	return choice(['billes', 'bougies', 'cartes de voeux', 'bagues', 'images','peluches','clés USB','pochettes'])
	}

	/**
* Renvoie un petit objet masculin au hasard 
* @Auteur Mireille Gain
*/
export function objetM() {
	return choice(['jeux','gâteaux','cahiers','livres','stylos','bracelets','badges','porte-clés','crayons'])
	}

		/**
* Renvoie un petit objet au hasard 
* @Auteur Mireille Gain
*/
export function objet() {
	return choice(['billes', 'bougies', 'cartes de voeux', 'gommes', 'images','auto-collants','bonbons','cahiers','livres','stylos'])
	}

/**
 * Définit l'objet personne
 * @Auteur Jean-Claude Lhote
 * le 14/03/2021
 */
class Personne {
	constructor({ prenom = '', genre = '', pronom = '' } = {}) {
		let choix
		this.prenom = ''
		this.genre = ''
		this.pronom = ''
		if (prenom == '' || ((typeof prenom) == 'undefined')) { // On le/la baptise
			choix = prenomPronom()
			this.prenom = choix[0]
			this.pronom = choix[1]
		}
		else if (pronom == '') { // le pronom n'est pas précisé
			this.pronom = 'on'
		}
		if (genre == '') {
			if (this.pronom == 'il') {
				this.genre = 'masculin'
			}
			else if (this.pronom == 'elle') {
				this.genre = 'féminin'
			}
			else this.genre = 'neutre'
		}
	}
}

/**
 * crée une instance de la classe Personne
 * @Auteur Jean-Claude Lhote
 * le 14/03/2021
 */
export function personne({ prenom = '', genre = '', pronom = '' } = {}) {
	return new Personne({ prenom: prenom, genre: genre, pronom: pronom })
}

/**
 * Crée un tableau de n objet de la classe Personne
 * @Auteur Jean-Claude Lhote
 * le 14/03/2021
 */
export function personnes(n) {
	let liste = [], essai,trouve
	for (let i = 0; i < n;) {
		essai = personne()
		trouve=false
		for (let j=0;j<liste.length;j++){
			if (liste[j].prenom==essai.prenom) {
				trouve=true
				break
			}
		}
		if (trouve==false){
			liste.push(essai)
			i++
		}
	}
	return liste
}

/**
 * Renvoie un couple [prénom,pronom] où pronom='il' ou 'elle'
 *  @Auteur Jean-Claue Lhote
 */
export function prenomPronom() {
	if (choice([true, false])) {
		return [prenomM(1), 'il']
	}
	else {
		return [prenomF(1), 'elle']
	}
}

/**
* Renvoie un tableau avec les résultats des tirages successifs
* @param nombre_tirages Combien de tirages ?
* @param nombre_faces Pour spécifier le type de dés
* @param nombre_des Combien de dés à chaque tirage ?
* @auteur Jean-Claude Lhote
*/
export function tirer_les_des(nombre_tirages, nombre_faces, nombre_des) {
	let tirages = [];
	for (let i = 0; i <= (nombre_faces - 1) * nombre_des; i++) tirages.push([i + nombre_des, 0]);
	for (let i = 0, resultat; i < nombre_tirages; i++) {
		resultat = 0;
		for (let j = 0; j < nombre_des; j++) resultat += randint(1, nombre_faces);
		tirages[resultat - nombre_des][1]++;
	}
	return tirages
}
/**
* Renvoie un tableau de nombres
* @param nombre_notes
* @param note_min
* @param note_max
* @auteur Jean-Claude Lhote
*/
export function liste_de_notes(nombre_notes, note_min, note_max) {
	let notes = [];
	for (let i = 0; i < nombre_notes; i++) notes.push(randint(note_min, note_max));
	return notes
}

/**
* Renvoie le nombre de jour d'un mois donné
* @param n quantième du mois (janvier=1...)
* @auteur Jean-Claude Lhote
*/
export function jours_par_mois(n) {
	let jours_mois = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	return jours_mois[n - 1]
}
/**
* Renvoie un tableau de températures
* @param base température médiane
* @mois quantième du mois (janvier=1...)
* @annee pour déterminer si elle est bissextile ou non 
* @auteur Jean-Claude Lhote
*/
export function un_mois_de_temperature(base, mois, annee) {
	let temperatures = [];
	let nombre_jours = jours_par_mois(mois);
	if (mois == 2) {
		if (((annee % 4 == 0) && (annee % 100 != 0)) || (annee % 400 == 0)) nombre_jours = 29;	// années bissextiles.  
		else nombre_jours = 28;
	}
	temperatures.push(randint(-3, 3) + base);
	for (let i = 1; i < nombre_jours; i++) temperatures.push(temperatures[i - 1] + randint(-2, 2));
	return temperatures
}

/**
* Renvoie le nom du mois
* @param n quantième du mois
* @auteur Jean-Claude Lhote
*/
export function nom_du_mois(n) {
	let mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
	return mois[n - 1]
}

/**
* Renvoie le nom du jour
* @param n quantième du jour
* @auteur Mireille Gain
*/
export function nom_du_jour(n) {
	let jour = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
	return jour[n - 1]
}

/**
* Renvoie le nom d'un jour au hasard
* @param n quantième du jour
* @auteur Mireille Gain
*/
export function jour() {
	return choice(['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'])
}

// Fonctions LaTeX

/**
* * Retourne un environnement LaTeX enumerate à partir d'une liste.
* * `<br>`est remplacé par un saut de paragraphe
* * `<br><br>` est remplacé par un saut de paragraphe et un medskip
* * L'espacement est généré avec spacing
* @Auteur Rémi Angot
*/
export function tex_enumerate(liste, spacing) {
	let result = ''
	if (liste.length > 1) {
		result = "\\begin{enumerate}\n"
		if (spacing > 1) {
			result += `\\begin{spacing}{${spacing}}\n`
		}
		for (let i in liste) {
			result += '\t\\item ' + liste[i] + '\n'
		}
		if (spacing > 1) {
			result += '\\end{spacing}\n'
		}
		result += '\\end{enumerate}\n'
	} else {
		if (spacing > 1) {
			result += `\\begin{spacing}{${spacing}}\n`
		}
		result += liste[0] + '\n'
		if (spacing > 1) {
			result += '\\end{spacing}\n'
		}
	}
	return result.replace(/<br><br>/g, '\n\n\\medskip\n').replace(/<br>/g, '\\\\\n').replace(/€/g, '\\euro{}')

}

/**
* * Retourne un environnement LaTeX enumerate à partir d'une liste sans afficher les numéros.
* * `<br>` est remplacé par un saut de paragraphe
* * `<br><br>` est remplacé par un saut de paragraphe et un medskip
* * L'espacement est généré avec spacing
* @Auteur Rémi Angot
*/
export function tex_enumerate_sans_numero(liste, spacing) {
	//return tex_enumerate(liste,spacing).replace('\\begin{enumerate}[label={}]','\\begin{enumerate}[label={}]')
	return tex_enumerate(liste, spacing).replace('\\begin{enumerate}', '\\begin{enumerate}[label={}]')
}

/**
* * Concatène les éléments d'une liste avec un saut de ligne entre chaque élément
* * `<br>` est remplacé par un saut de paragraphe
* * `<br><br>` est remplacé par un saut de paragraphe et un medskip
* @Auteur Rémi Angot
*/
export function tex_paragraphe(liste, spacing = false) {
	let result = ''
	if (spacing > 1) {
		result = `\\begin{spacing}{${spacing}}\n`
	}

	for (let i in liste) {
		result += `\t${liste[i]}\\\\\n`
	}
	if (spacing > 1) {
		result += '\\end{spacing}'
	}
	return result.replace(/<br><br>/g, '\n\n\\medskip\n').replace(/<br>/g, '\\\\\n').replace(/€/g, '\\euro{}')
}

/**
* * Recopie le texte.
* * `<br>` est remplacé par un saut de paragraphe
* * `<br><br>` est remplacé par un saut de paragraphe et un medskip
* @Auteur Rémi Angot
*/
export function tex_introduction(texte) {
	return texte.replace(/<br><br>/g, '\n\n\\medskip\n').replace(/<br>/g, '\\\\\n')
}


/**
*  Renvoie une liste HTML à partir d'une liste
* 
* @param liste une liste de questions
* @param spacing interligne (line-height en css)
* @Auteur Rémi Angot
*/
export function html_enumerate(liste, spacing) {
	let result = '';

	if (liste.length > 1) {
		(spacing > 1) ? result = `<ol style="line-height: ${spacing};">` : result = '<ol>'
		for (let i in liste) {
			result += '<li>' + liste[i].replace(/\\dotfill/g, '..............................').replace(/\\not=/g, '≠').replace(/\\ldots/g, '....') + '</li>'   // .replace(/~/g,' ') pour enlever les ~ mais je voulais les garder dans les formules LaTeX donc abandonné
		}
		result += '</ol>'
	} else if (liste.length == 1) {
		(spacing > 1) ? result = `<div style="line-height: ${spacing};">` : result = '<div>'
		result += liste[0].replace(/\\dotfill/g, '..............................').replace(/\\not=/g, '≠').replace(/\\ldots/g, '....')   // .replace(/~/g,' ') pour enlever les ~ mais je voulais les garder dans les formules LaTeX donc abandonné
		result += '</div>'
	}
	return result

}


/**
* Renvoie une liste HTML ou LaTeX suivant le contexte
* 
* @param liste une liste de questions
* @param spacing interligne (line-height en css)
* @Auteur Rémi Angot
*/
export function enumerate(liste, spacing) {
	if (sortie_html) {
		return html_enumerate(liste, spacing)
	} else {
		return tex_enumerate(liste, spacing)
	}
}

/**
* Renvoie une liste sans puce ni numéro HTML ou LaTeX suivant le contexte
* 
* @param liste une liste de questions
* @param spacing interligne (line-height en css)
* @Auteur Sébastien Lozano
*/
export function enumerate_sans_puce_sans_numero(liste, spacing) {
	if (sortie_html) {
		//return html_enumerate(liste,spacing)
		// for (let i=0; i<liste.length;i++) {
		// 	liste[i]='> '+liste[i];
		// }		
		return html_ligne(liste, spacing)
	} else {
		//return tex_enumerate(liste,spacing)
		return tex_enumerate(liste, spacing).replace('\\begin{enumerate}', '\\begin{enumerate}[label={}]')
	}
}

/**
*  Renvoie un paragraphe HTML à partir d'un string
* 
* @param string
* @Auteur Rémi Angot
*/
export function html_paragraphe(texte) {
	if (texte.length > 1) {
		return `\n<p>${texte}</p>\n\n`
	} else {
		return ""
	}
}

/**
*  Renvoie un div HTML à partir d'une liste découpée par des sauts de ligne
* 
* @param liste une liste de questions
* @param spacing interligne (line-height en css)
* @Auteur Rémi Angot
*/
export function html_ligne(liste, spacing) {
	let result = '';
	if (spacing > 1) {
		result = `<div style="line-height: ${spacing};">\n`
	}
	for (let i in liste) {
		result += '\t' + liste[i].replace(/\\dotfill/g, '...') + '<br>'   // .replace(/~/g,' ') pour enlever les ~ mais je voulais les garder dans les formules LaTeX donc abandonné
		// .replace(/\\\\/g,'<br>') abandonné pour supporter les array
	}

	if (spacing > 1) {
		result += `</div>\n`
	}

	return result
}



/**
* Renvoie un environnent LaTeX multicolonnes
* @Auteur Rémi Angot
*/
export function tex_multicols(texte, nb_cols = 2) {
	let result;
	if (nb_cols > 1) {
		result = '\\begin{multicols}{' + nb_cols + '}\n' +
			texte + '\n\\end{multicols}';
	} else {
		result = texte;
	}
	return result
}

/**
* Renvoie la consigne en titre 4
* @Auteur Rémi Angot
*/
export function html_consigne(consigne) {
	return '<h4>' + consigne + '</h4>\n\n'
}

/**
* Renvoie \exo{consigne}
* @Auteur Rémi Angot
*/
export function tex_consigne(consigne) {
	return '\\exo{' + consigne.replace(/<br>/g, '\\\\') + '}\n\n'
}

/**
* Renvoie un nombre dans le format français (séparateur de classes)
* @Auteur Rémi Angot
*/
export function tex_nombre(nb) {
	//Ecrit \nombre{nb} pour tous les nombres supérieurs à 1 000 (pour la gestion des espaces)
	if (sortie_html) {
		//return Intl.NumberFormat("fr-FR",{maximumFractionDigits:20}).format(nb).toString().replace(/\s+/g,'\\thickspace ').replace(',','{,}'); // .replace(',','{,}') servait à enlever l'espace disgracieux des décimaux mais ne passait qu'en mode LaTeX
		return Intl.NumberFormat("fr-FR", { maximumFractionDigits: 20 }).format(nb).toString().replace(/\s+/g, '\\thickspace '); // \nombre n'est pas pris en charge par katex
	} else {
		let result;
		if (nb > 999 || nombre_de_chiffres_dans_la_partie_decimale(nb) > 3) {
			result = '\\numprint{' + nb.toString().replace('.', ',') + '}';
		} else {
			result = nb.toString().replace('.', ',');
		}
		return result;
	}
}

/**
* Renvoie un nombre dans le format français (séparateur de classes) pour la partie entière comme pour la partie décimale
* @Auteur Rémi Angot
*/
export function tex_nombre2(nb) {
	let nombre = math.format(nb, { notation: 'auto', lowerExp: -12, upperExp: 12, precision: 12 }).replace('.', ',')
	let rang_virgule = nombre.indexOf(',')
	let partie_entiere = ''
	if (rang_virgule != -1) {
		partie_entiere = nombre.substring(0, rang_virgule)
	}
	else {
		partie_entiere = nombre
	}
	let partie_decimale = ''
	if (rang_virgule != -1) {
		partie_decimale = nombre.substring(rang_virgule + 1)
	}

	for (let i = partie_entiere.length - 3; i > 0; i -= 3) {
		partie_entiere = partie_entiere.substring(0, i) + '\\thickspace ' + partie_entiere.substring(i)
	}
	for (let i = 3; i <= partie_decimale.length; i += 3) {
		partie_decimale = partie_decimale.substring(0, i) + '\\thickspace ' + partie_decimale.substring(i)
		i += 12
	}
	if (partie_decimale == '') {
		nombre = partie_entiere
	}
	else {
		nombre = partie_entiere + ',' + partie_decimale
	}
	return nombre
}
export function tex_nombrec2(expr, precision = 8) {
	return math.format(math.evaluate(expr), { notation: 'auto', lowerExp: -12, upperExp: 12, precision: precision }).replace('.', ',')
}
export function nombrec2(nb) {
	return math.evaluate(nb)
}

/**
 * Renvoie un espace insécable pour le mode texte suivant la sorite html ou Latex.
 * @Auteur Jean-Claude Lhote
 */
export function sp(nb = 1) {
	let s = ``
	for (let i = 0; i < nb; i++) {
		if (sortie_html) s += `&nbsp`
		else s += `~`
	}
	return s
}

/**
* Renvoie un nombre dans le format français (séparateur de classes)
* Fonctionne sans le mode maths contrairement à tex_nombre()
* @Auteur Rémi Angot
*/
export function nombre_avec_espace(nb) {
	//Ecrit \nombre{nb} pour tous les nombres supérieurs à 1 000 (pour la gestion des espaces)
	if (sortie_html) {
		return Intl.NumberFormat("fr-FR", { maximumFractionDigits: 20 }).format(nb).toString().replace(/\s+/g, ' ');
	} else {
		let result;
		if (nb > 999 || nombre_de_chiffres_dans_la_partie_decimale(nb) > 3) {
			result = '\\numprint{' + nb.toString().replace('.', ',') + '}';
		} else {
			result = nb.toString().replace('.', ',');
		}
		return result;
	}
}


/**
* Renvoie un nombre dans le format français (séparateur de classes) version sans Katex (pour les SVG)
* @Auteur Jean-Claude Lhote
*/
export function string_nombre(nb) {
	//Ecrit \nombre{nb} pour tous les nombres supérieurs à 1 000 (pour la gestion des espaces)
	let nombre = nb.toString();
	let partie_entiere = nombre.split('.')[0];
	let partie_decimale = nombre.split('.')[1];
	let result = '';
	let i;
	if (partie_entiere.length > 3) {
		for (i = 0; i < Math.floor(partie_entiere.length / 3); i++) {
			result = ' ' + partie_entiere.slice(partie_entiere.length - i * 3 - 3, partie_entiere.length - i * 3) + result;
		}
		result = partie_entiere.slice(0, partie_entiere.length - i * 3) + result;
	}
	else result = partie_entiere;
	if (result[0] == ' ') result = result.substring(1, result.length)
	if (partie_decimale != undefined) result += ',' + partie_decimale;
	return result;
}
/**
* Met en couleur et en gras
*
* @Auteur Rémi Angot
*/
export function mise_en_evidence(texte, couleur = "#f15929") {
	if (sortie_html) {
		return `\\mathbf{\\color{${couleur}}{${texte}}}`
	} else {
		if (couleur[0] == '#') {
			return `\\mathbf{\\color[HTML]{${couleur.replace('#', '')}}${texte}}`
		} else {
			return `\\mathbf{\\color{${couleur.replace('#', '')}}${texte}}`
		}
	}
}

/**
* Met en couleur un texte
* @param {string} texte à mettre en couleur
* @param {string} couleur en anglais ou code couleur hexadécimal par défaut c'est le orange de CoopMaths
* @Auteur Rémi Angot
*/
export function texte_en_couleur(texte, couleur = "#f15929") {
	if (sortie_html) {
		return `<span style="color:${couleur};">${texte}</span>`
	}
	else {
		if (couleur[0] == '#') {
			return `{\\color[HTML]{${couleur.replace('#', '')}}${texte}}`
		} else {
			return `{\\color{${couleur.replace('#', '')}}${texte}}`
		}
	}

}

/**
* Met en couleur et gras un texte
* @param {string} texte à mettre en couleur
* @param {string} couleur en anglais ou code couleur hexadécimal par défaut c'est le orange de CoopMaths
* @Auteur Rémi Angot
*/
export function texte_en_couleur_et_gras(texte, couleur = "#f15929") {
	if (sortie_html) {
		return `<span style="color:${couleur};font-weight: bold;">${texte}</span>`
	}
	else {
		if (couleur[0] == '#') {
			return `{\\color[HTML]{${couleur.replace('#', '')}}${texte}}`
		} else {
			return `{\\bfseries \\color{${couleur.replace('#', '')}}${texte}}`
		}
	}

}
/**
 * couleurAleatoire() renvoie le code d'une couleur au hasard
 *
 * @Auteur Rémi Angot
 */
export function couleurAleatoire() {
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

export function arcenciel(i, fondblanc = true) {
	let couleurs
	if (fondblanc) couleurs = ['violet', 'purple', 'blue', 'green', 'lime', 'orange', 'red']
	else couleurs = ['violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red']
	return couleurs[i % 7]
}
export function texcolors(i, fondblanc = true) {
	let couleurs = ['black', 'blue', 'brown', 'cyan', 'darkgray', 'gray', 'green', 'lightgray', 'lime', 'magenta', 'olive', 'orange', 'pink', 'purple', 'red', 'teal', 'violet', 'white', 'yellow']
	if (fondblanc && i % 19 >= 17) i += 2
	return couleurs[i % 19]
}
export function couleur_en_gris(color) {
	let gris
	switch (color) {
		case 'black':
			return color
		case 'white':
			return color
		case 'gray':
			return color
		case 'blue':


	}
}

/**
* Met gras un texte
* @param {string} texte à mettre en gras
* @Auteur Rémi Angot
*/
export function texte_gras(texte) {
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
export function href(texte, lien) {
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
export function tex_prix(nb) {
	//Remplace le . par la ,
	let nombre = Number(nb);
	let result;
	if (nombre == nombre.toFixed(0)) {
		result = nombre
	} else {
		result = nombre.toFixed(2).toString().replace('.', ','); //Ne gère pas l'espace des milliers
	}
	return result;

}


/**
* Convertit en majuscule la première lettre
* @Auteur Rémi Angot
*/
export function premiere_lettre_en_majuscule(text) { return (text + '').charAt(0).toUpperCase() + text.substr(1); }


/**
* Renvoie le nombre de chiffres de la partie décimale 
* @Auteur Rémi Angot
*/
export function nombre_de_chiffres_dans_la_partie_decimale(nb) {
	if (String(nb).indexOf('.') > 0) {
		return String(nb).split(".")[1].length
	} else {
		return 0
	}
}

export function nombre_de_chiffres_dans_la_partie_entiere(nb) {
	if (String(nb).indexOf('.') > 0) {
		return String(nb).split(".")[0].length
	} else {
		return String(nb).length
	}
}


/**
* Écrit une fraction avec - devant si le numérateur ou le dénominateur est négatif
* @Auteur Jean-Claude Lhote
*/
export function tex_fraction_signe(a, b) {
	if (b != 1) {
		if (a * b > 0) {
			return '\\dfrac{' + Math.abs(a) + '}{' + Math.abs(b) + '}'
		}
		else {
			return '-\\dfrac{' + Math.abs(a) + '}{' + Math.abs(b) + '}'
		}
	}
	else {
		return a
	}
}


/**
* Met de grandes parenthèses autour de la fraction a/b si besoin pour inclure une fraction dans une expresion en fonction du signe
* @Auteur Jean-Claude Lhote
*/
export function tex_fraction_parentheses(a, b) {
	if (a * b > 0) { return tex_fraction_signe(a, b) }
	else { return '\\left(' + tex_fraction_signe(a, b) + '\\right)' }
}

/**
* Retourne une liste de fractions irréductibles
* @Auteur Jean-Claude Lhote
*/
export function obtenir_liste_fractions_irreductibles() { //sous forme de tableaux [numérateur,dénominateur]
	return [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5],
	[1, 6], [5, 6], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [1, 8], [3, 8], [5, 8], [7, 8],
	[1, 9], [2, 9], [4, 9], [5, 9], [7, 9], [8, 9], [1, 10], [3, 10], [7, 10], [9, 10]]
}



/**
* Retourne une liste de fractions irréductibles de dénominateur égal à 2 3 5 7
* @Auteur Mireille Gain
*/
export function obtenir_liste_fractions_irreductibles_faciles() { //sous forme de tableaux [numérateur,dénominateur]
	return [[1, 2], [1, 3], [2, 3], [1, 5], [2, 5], [3, 5], [4, 5],
	[1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7]]
}

/**
* Retourne la liste des nombres premiers inférieurs à 300
* @Auteur Rémi Angot
*/
export function obtenir_liste_nombres_premiers() {
	return [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293];
}

/**
* Retourne le code LaTeX de la décomposition en produit de facteurs premiers d'un nombre
* @Auteur Rémi Angot
*/
export function decomposition_facteurs_premiers(n) {
	let decomposition = '';
	let liste = obtenir_liste_facteurs_premiers(n);
	for (let i in liste) {
		decomposition += liste[i] + '\\times';
	}
	decomposition = decomposition.substr(0, decomposition.length - 6)
	return decomposition;
}

/**
* Retourne la liste des diviseurs d'un entier
* @Auteur Rémi Angot
*/
export function liste_des_diviseurs(n) {
	let k = 2;
	let liste = [1];
	while (k <= n) {
		if (n % k == 0) {
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
export function tex_fraction(a, b) {
	if (b != 1) {
		if (Number.isInteger(a) && Number.isInteger(b)) {
			return `\\dfrac{${tex_nombre(a)}}{${tex_nombre(b)}}`
		} else {
			return `\\dfrac{${a}}{${b}}`
		}
	}
	else {
		return a
	}

}


/**
* Utilise printlatex et quote de Algebrite
* @Auteur Rémi Angot
*/

export function printlatex(e) {
	return Algebrite.run(`printlatex(quote(${e}))`)
}


/**
* Écrit du texte en mode mathématiques
* @Auteur Rémi Angot
*/
export function tex_texte(texte) {
	return '~\\text{' + texte + '}'
}

/**
* Retourne un environnement LaTeX itemize à partir d'une liste
* @Auteur Rémi Angot
*/
export function itemize(tableau_de_texte) {
	let texte = ''
	if (sortie_html) {
		texte = '<div>'
		for (let i = 0; i < tableau_de_texte.length; i++) {
			texte += '<div> − ' + tableau_de_texte[i] + '</div>'
		}
		texte += '</div>'
	} else {
		texte = '\t\\begin{itemize}\n'
		for (let i = 0; i < tableau_de_texte.length; i++) {
			texte += '\t\t\\item ' + tableau_de_texte[i] + '\n'
		}
		texte += '\t\\end{itemize}'
	}
	return texte
}


/**
* Récupère le code JS d'un exercice qui modifie les valeurs d'une figure MG32 et actualise la figure
* @Auteur Rémi Angot
*/
export function MG32_modifie_figure(numero_figure) {
	let code_pour_modifier_la_figure = exercice[numero_figure].MG32code_pour_modifier_la_figure
	if (window.mtg32App.docs.length == 1) {
		code_pour_modifier_la_figure = code_pour_modifier_la_figure.replace("display", "updateDisplay")
	}
	let modification = new Function('numero_figure', code_pour_modifier_la_figure)
	modification(numero_figure);
}

/**
* Actualise toutes les figures MG32 avec les nouvelles valeurs
* @Auteur Rémi Angot
*/
export function MG32_modifie_toutes_les_figures() {
	for (let i = 0; i < liste_des_exercices.length; i++) {
		if (exercice[i].type_exercice == 'MG32') {
			MG32_modifie_figure(i)
		}
	}
}

/**
* Ajoute une figure MG32 dans le code HTML de la page
* @Auteur Rémi Angot
*/
export function MG32_ajouter_figure(numero_de_l_exercice) {
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
export function MG32_tracer_toutes_les_figures() {

	(function verifie_div_MG32() {
		const el = document.getElementsByClassName('MG32');
		// Sélectionne les div de classe MG32
		if (el.length) { // S'ils existent, on peut appeler MG32
			Promise.all(MG32_tableau_de_figures.map(({ idContainer, svgOptions, mtgOptions }) => mtgLoad(idContainer, svgOptions, mtgOptions)))
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
export function SVG_Axe_vertical(mon_svg, start, end, absO, DeltaY, subY) {
	let droite = mon_svg.line(absO, start + 2, absO, end)
	droite.stroke({ color: 'black', width: 2, linecap: 'round' })
	for (let i = 0; i < DeltaY; i++) {
		let line = mon_svg.line(absO - 2, (DeltaY - i) * ((end - start) / DeltaY), absO + 2, (DeltaY - i) * ((end - start) / DeltaY))
		line.stroke({ color: 'black', width: 2, linecap: 'round' })
		if (subY != 1) {
			for (let k = 1; k < subY; k++) {
				let line = mon_svg.line(absO - 2, ((end - start) / DeltaY) * (DeltaY - i - k / subY), absO + 2, ((end - start) / DeltaY) * (DeltaY - i - k / subY))
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
export function SVG_Axe_horizontal(mon_svg, start, end, ordO, DeltaX, subX) {
	let droite = mon_svg.line(start, ordO, end - 2, ordO)
	droite.stroke({ color: 'black', width: 2, linecap: 'round' })
	for (let i = 1; i <= DeltaX; i++) {
		let line = mon_svg.line(start + (DeltaX - i) * ((end - start) / DeltaX), ordO - 2, start + (DeltaX - i) * ((end - start) / DeltaX), ordO + 2)
		line.stroke({ color: 'black', width: 2, linecap: 'round' })
		if (subX != 1) {
			for (let k = 1; k < subX; k++) {
				let line = mon_svg.line(start + (DeltaX - i + k / subX) * ((end - start) / DeltaX), ordO - 2, start + (DeltaX - i + k / subX) * ((end - start) / DeltaX), ordO + 2)
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
export function SVG_grille(mon_svg, absO, ordO, tailleX, tailleY, DeltaX, DeltaY, subX, subY) {
	let line_grille;
	for (let i = 0; i <= DeltaX; i++) {
		line_grille = mon_svg.line(absO + i * (tailleX / DeltaX), 0, absO + i * (tailleX / DeltaX), tailleY);
		line_grille.stroke({ color: 'lightgray', width: 1 });
	}
	for (let i = 0; i < DeltaX; i++) {
		if (subX != 1) {
			for (let k = 0; k < subX; k++) {
				line_grille = mon_svg.line(absO + i * (tailleX / DeltaX) + k * (tailleX / DeltaX / subX), 0, absO + i * (tailleX / DeltaX) + k * (tailleX / DeltaX / subX), tailleY);
				line_grille.stroke({ color: 'lightgray', width: 0.5, linecap: 'round' });
			}
		}
	}
	for (let j = 0; j <= DeltaY; j++) {
		line_grille = mon_svg.line(20, ordO + j * (tailleY / DeltaY), 20 + tailleX, ordO + j * (tailleY / DeltaY));
		line_grille.stroke({ color: 'lightgray', width: 1 });
	}
	for (let j = 0; j < DeltaY; j++) {
		if (subY != 1) {
			for (let l = 0; l < subY; l++) {
				line_grille = mon_svg.line(20, ordO + j * (tailleY / DeltaY) + l * (tailleY / DeltaY / subY), 20 + tailleX, ordO + j * (tailleY / DeltaY) + l * (tailleY / DeltaY / subY));
				line_grille.stroke({ color: 'lightgray', width: 0.5, linecap: 'round' });
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
export function SVG_graduation(mon_svg, origine, pas, derniere_graduation, taille = 10, y = 50, couleur = 'black', width = 5) {
	for (let i = origine; i < derniere_graduation; i += pas) {
		let line = mon_svg.line(i, y - taille / 2, i, y + taille / 2)
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
export function SVG_label(mon_svg, liste_d_abscisses, y, couleur, opacite) {
	'use strict';
	for (let i = 0; i < liste_d_abscisses.length; i++) {
		let text;
		if (typeof liste_d_abscisses[i][0] == 'number') text = mon_svg.text((liste_d_abscisses[i][0]).toString());
		else text = mon_svg.text(liste_d_abscisses[i][0]);
		y = parseInt(y);
		text.move(liste_d_abscisses[i][1], liste_d_abscisses[i][2]).font({
			fill: couleur,
			family: 'Helvetica',
			size: 14,
			anchor: 'middle',
			leading: y,
			opacity: opacite
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
export function SVG_fraction(mon_svg, num, den, x, y, couleur) {
	'use strict';
	let longueur = num.toString().length;
	let line = mon_svg.line(x - longueur * 5, y - 7, x + longueur * 5, y - 7);
	line.stroke({ color: couleur, width: 2, linecap: 'round' })
	let num_text = mon_svg.text(num.toString()).attr({ x: x, y: y - 10 });
	num_text.font({
		fill: couleur,
		family: 'Helvetica',
		size: 20,
		anchor: 'middle',
		leading: 0
	})
	let den_text = mon_svg.text(den.toString()).attr({ x: x, y: y + 10 });
	den_text.font({
		fill: couleur,
		family: 'Helvetica',
		size: 20,
		anchor: 'middle',
		leading: 0
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
export function SVG_tracer_point(mon_svg, x, y, nom, couleur, shiftxnom, shiftynom, montrer_coord) {
	//creer un groupe pour la croix
	let point = mon_svg.group()
	let c1 = point.line(-3, 3, 3, -3)
	c1.stroke({ color: couleur, width: 2, linecap: 'round', opacity: 1 })
	let c2 = point.line(-3, -3, 3, 3)
	c2.stroke({ color: couleur, width: 2, linecap: 'round', opacity: 1 })
	//déplace la croix
	point.move(x - 3, y - 3)
	// point.dmove(-3,-3)
	let text = mon_svg.text(nom).attr({ x: x + shiftxnom, y: y + shiftynom, fill: couleur, opacity: 0.7 })
	//ecrit le nom
	text.font({
		color: couleur,
		'font-weight': 'bolder',
		family: 'Helvetica',
		size: 14,
		anchor: 'middle',
		leading: -1
	})
	if (montrer_coord[0]) { // montrer_coord=[true,abs_axe,ord_axe] ou [false]
		if ((y != montrer_coord[2]) && (x != montrer_coord[1])) SVG_tracer_droite_flecheV(mon_svg, x, y, x, montrer_coord[2], couleur, 3)
		if ((x != montrer_coord[1]) && (y != montrer_coord[2])) SVG_tracer_droite_flecheH(mon_svg, x, y, montrer_coord[1], y, couleur, 3)
	}

}


/**
 * Trace une flèche dans le SVG pour une demi-droite graduée
 * @param {any} mon_svg l'identifiant du SVG
 * @param {number} x l'abscisse de la pointe
 * @param {number} y l'ordonnée de la pointe
 * @Auteur Rémi Angot
 */
function SVG_tracer_flecheH(mon_svg, x, y) {
	//creer un groupe pour la fleche
	let fleche = mon_svg.group()
	let c1 = fleche.line(x - 5, y - 5, x, y)
	c1.stroke({ color: 'black', width: 3, linecap: 'round' })
	let c2 = fleche.line(x - 5, y + 5, x, y)
	c2.stroke({ color: 'black', width: 3, linecap: 'round' })
}
/**
 * 
 * @param {string} mon_svg l'identifiant du SVG
 * @param {number} x l'abscisse de la pointe de la flèche
 * @param {number} y l'ordonnée de la pointe de la flèche
 * @Auteur Jean-Claude Lhote
 */
export function SVG_tracer_flecheV(mon_svg, x, y) {
	//creer un groupe pour la fleche
	let fleche = mon_svg.group()
	let c1 = fleche.line(-5, 5, 0, 0)
	c1.stroke({ color: 'black', width: 3, linecap: 'round' })
	let c2 = fleche.line(5, 5, 0, 0)
	c2.stroke({ color: 'black', width: 3, linecap: 'round' })
	//déplace la croix
	fleche.move(x, y)
	fleche.dmove(-5, 5)
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
export function SVG_tracer_droite_flecheV(mon_svg, x1, y1, x2, y2, couleur, pointilles) {
	let fleche = mon_svg.group()
	let c1 = fleche.line(x1, y1, x2, y2)
	c1.stroke({ color: couleur, width: 1, linecap: 'round', dasharray: pointilles, opacity: 0.5 })
	if (y2 < y1) {
		let c2 = fleche.line(x2 - 3, y2 + 5, x2, y2)
		c2.stroke({ color: couleur, width: 1, linecap: 'round', opacity: 0.5 })
		let c3 = fleche.line(x2 + 3, y2 + 5, x2, y2)
		c3.stroke({ color: couleur, width: 1, linecap: 'round', opacity: 0.5 })
	}
	else {
		let c2 = fleche.line(x2 - 3, y2 - 5, x2, y2)
		c2.stroke({ color: couleur, width: 1, linecap: 'round', opacity: 0.5 })
		let c3 = fleche.line(x2 + 3, y2 - 5, x2, y2)
		c3.stroke({ color: couleur, width: 1, linecap: 'round', opacity: 0.5 })
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
export function SVG_tracer_droite_flecheH(mon_svg, x1, y1, x2, y2, couleur, pointilles) {
	let fleche = mon_svg.group()
	let c1 = fleche.line(x1, y1, x2, y2)
	c1.stroke({ color: couleur, width: 1, linecap: 'round', dasharray: pointilles, opacity: 0.5 })
	if (x2 < x1) {
		let c2 = fleche.line(x2 + 5, y2 + 3, x2, y2)
		c2.stroke({ color: couleur, width: 1, linecap: 'round', opacity: 0.5 })
		let c3 = fleche.line(x2 + 5, y2 - 3, x2, y2)
		c3.stroke({ color: couleur, width: 1, linecap: 'round', opacity: 0.5 })
	}
	else {
		let c2 = fleche.line(x2 - 5, y2 + 3, x2, y2)
		c2.stroke({ color: couleur, width: 1, linecap: 'round', opacity: 0.5 })
		let c3 = fleche.line(x2 - 5, y2 - 3, x2, y2)
		c3.stroke({ color: couleur, width: 1, linecap: 'round', opacity: 0.5 })
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
export function SVG_Tracer_droite(mon_svg, tailleX, tailleY, Xmin, Xmax, Ymin, Ymax, OrdX0, Pente, couleur, nom) {
	'use strict';
	let k = 0;
	let Pente_r = Pente * (Xmax - Xmin) / (Ymax - Ymin); // Pente adaptée au ratio d'échelle des axes.
	while ((k > Xmin) & ((OrdX0 + Pente * k) < Ymax) & ((OrdX0 + Pente * k) > Ymin)) k--;
	let X1 = k;
	let Y1 = OrdX0 + Pente * k;
	let DeltaX = Xmax - Xmin;
	let DeltaY = Ymax - Ymin;
	let Dx = (tailleX - 20) / DeltaX;
	let Dy = (tailleY - 20) / DeltaY;
	let X0 = 20 + Dx * (X1 - Xmin);
	let Y0 = tailleY - 20 - Dy * (Y1 - Ymin);
	let droite = mon_svg.line(X0, Y0, X0 + tailleX, Y0 - tailleX * Pente_r)
	droite.stroke({ color: couleur, width: 2, linecap: 'round' })
	let Ynom;
	if (Y0 > tailleY / 2) Ynom = -Math.round(Pente)
	else Ynom = -Math.round(Pente)
	let text = mon_svg.text(nom).attr({ x: X0 + 20, y: Y0 - 20 * Pente_r })
	//ecrit le nom
	text.font({
		fill: couleur,
		family: 'Helvetica',
		size: 15,
		anchor: 'middle',
		leading: Ynom
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
export function Latex_Tracer_droite(Xmin, Xmax, Ymin, Ymax, OrdX0, Pente, couleur, nom) {
	'use strict';
	let k = 0;
	//	let Pente_r=Pente*(Xmax-Xmin)/(Ymax-Ymin); // Pente adaptée au ratio d'échelle des axes.
	while ((k > Xmin) & ((OrdX0 + Pente * k) < Ymax) & ((OrdX0 + Pente * k) > Ymin)) k--;
	let X1 = k;
	let Y1 = OrdX0 + Pente * k;
	let DeltaX = Xmax - Xmin;
	//	let DeltaY=Ymax-Ymin;
	let X2 = X1 + DeltaX
	let Y2 = Y1 + DeltaX * Pente;
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
export function SVG_repere(mon_svg, Xmin, Xmax, Ymin, Ymax, subX, subY, tailleX, tailleY, grille) {
	'use strict';
	if (Xmin > 0) Xmin = 0;
	if (Ymin > 0) Ymin = 0;
	let DeltaX = Xmax - Xmin;
	let DeltaY = Ymax - Ymin;
	let Dx = (tailleX - 20) / DeltaX;
	let Dy = (tailleY - 20) / DeltaY;
	if (grille) SVG_grille(mon_svg, 20, 0, tailleX - 20, tailleY - 20, DeltaX, DeltaY, subX, subY);
	SVG_Axe_horizontal(mon_svg, 20, tailleX, tailleY - 20 + Ymin * Dy, DeltaX, subX);
	SVG_tracer_flecheH(mon_svg, tailleX - 2, tailleY - 20 + Ymin * Dy);
	SVG_Axe_vertical(mon_svg, 0, tailleY - 20, 20 - Xmin * Dx, DeltaY, subY);
	SVG_tracer_flecheV(mon_svg, 20 - Xmin * Dx, -3);
	for (let i = 0; i < DeltaX; i++) {
		if (i + Xmin == 0) SVG_label(mon_svg, [[string_nombre(i + Xmin), i * Dx + 15, tailleY + 2 + Ymin * Dy]], 0, 'black', 0.5);
		else SVG_label(mon_svg, [[string_nombre(i + Xmin), i * Dx + 20, tailleY + 2 + Ymin * Dy]], 0, 'black', 0.5);
	}
	for (let i = 0; i < DeltaY; i++) {
		if (i + Ymin == 0) SVG_label(mon_svg, [[string_nombre(i + Ymin), 10 - Xmin * Dx, tailleY - 15 - i * Dy]], 0, 'black', 0.5);
		else SVG_label(mon_svg, [[string_nombre(i + Ymin), 10 - Xmin * Dx, tailleY - 25 - i * Dy]], 1, 'black', 0.5);
	}
	return [20 - Xmin * Dx, tailleY - 20 + Ymin * Dy];
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
export function Latex_repere(Xmin, Xmax, Ymin, Ymax, subX, subY, grille) {
	'use strict';
	let result = ``;
	result += `\n\t \\tkzInit [xmin=${Xmin},xmax=${Xmax},xstep=1,ymin=${Ymin},ymax=${Ymax},ystep=1]`;
	if (grille) result += `\n\t \\tkzGrid[sub,subxstep=${1 / subX},subystep=${1 / subY},color=lightgray,line width=0.3pt](${Xmin},${Ymin})(${Xmax},${Ymax})`;
	result += `\n\t \\tkzAxeXY`;
	result += `\n\t \\tkzClip[space=1]`;
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
export function SVG_reperage_sur_un_axe(id_du_div, origine, longueur, pas1, pas2, points_inconnus, points_connus, fraction) {
	'use strict';
	let arrondir = 1 + Math.round(Math.log10(pas1))
	if (arrondir < 1) arrondir = 1;
	let longueur_pas1 = 600 / longueur;
	let longueur_pas2 = 600 / longueur / pas2;
	let distance, valeur, nom
	if (!window.SVGExist) { window.SVGExist = {} } // Si SVGExist n'existe pas on le créé
	// SVGExist est un dictionnaire dans lequel on stocke les listenner sur la création des div
	window.SVGExist[id_du_div] = setInterval(function () {
		if ($(`#${id_du_div}`).length) {
			$(`#${id_du_div}`).html("");//Vide le div pour éviter les SVG en doublon
			const mon_svg = SVG().addTo(`#${id_du_div}`).viewbox(0, 0, 800, 150).size('100%', '100%')
			// Droite 
			let droite = mon_svg.line(100, 50, 750, 50)
			droite.stroke({ color: 'black', width: 2, linecap: 'round' })
			// Graduation secondaire
			SVG_graduation(mon_svg, 100, longueur_pas2, 750, 5, 50, 'black', 2)
			// Graduation principale
			SVG_graduation(mon_svg, 100, longueur_pas1, 750, 10, 50, 'black', 5)
			SVG_tracer_flecheH(mon_svg, 750, 50)
			// Nombres visibles
			SVG_label(mon_svg, [[string_nombre(origine), 100, 50]], 2, 'black', 1);
			for (let i = 0; i < points_connus.length; i++) {
				valeur = string_nombre(points_connus[i][0]);
				distance = calcul(longueur_pas1 * points_connus[i][1] + longueur_pas2 * points_connus[i][2]);
				SVG_label(mon_svg, [[valeur, 100 + distance, 50]], 2, 'black', 1)
			}
			//Points inconnus
			let position = 1;
			for (let i = 0; i < points_inconnus.length; i++) {
				distance = longueur_pas1 * points_inconnus[i][1] + longueur_pas2 * points_inconnus[i][2]
				nom = points_inconnus[i][0]
				SVG_tracer_point(mon_svg, 100 + distance, 50, nom, '#f15929', 0, 0, [false])
				if (points_inconnus[i][3] == true) {
					if (!fraction) { // affichage décimal 
						valeur = string_nombre(calcul(origine + points_inconnus[i][1] / pas1 + points_inconnus[i][2] / pas1 / pas2));
						SVG_label(mon_svg, [[valeur, 100 + distance, 50]], 3 + position, '#f15929', 1)
						SVG_tracer_droite_flecheV(mon_svg, 100 + distance, 75 + 15 * position, 100 + distance, 55, '#f15929', 3)
					}
					else { //affichage fractionnaire
						SVG_fraction(mon_svg, (origine + points_inconnus[i][1]) * pas2 + points_inconnus[i][2], pas2, 100 + distance, 115 + 15 * position, '#f15929')
						SVG_tracer_droite_flecheV(mon_svg, 100 + distance, 80 + 15 * position, 100 + distance, 55, '#f15929', 3)
					}
					position = 1 - position
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
export function Latex_reperage_sur_un_axe(zoom, origine, pas1, pas2, points_inconnus, points_connus, fraction) {
	'use strict';
	let result = `\\begin{tikzpicture}[scale=${zoom}]`;
	let valeur
	let decalage


	result += `\n\t \\tkzInit[xmin=${origine},xmax=${calcul(origine + 7 / pas1)},ymin=-0.5,ymax=0.5,xstep=${calcul(1 / pas1)}]`

	if (origine == 0) result += `\n\t \\tkzDrawX[tickwd=2pt,label={}];`
	else result += `\n\t \\tkzDrawX[left space=0.2,tickwd=2pt,label={}];`
	result += `\n\t \\tikzset{arr/.style={postaction=decorate,	decoration={markings,mark=at position 1 with {\\arrow[thick]{#1}}}}}`

	if (origine < 0) decalage = origine * pas1
	else decalage = 0
	result += `\n\t \\foreach \\x in {0,${calcul(1 / pas2)},...,7}`
	result += `\n\t {\\draw (${decalage}+\\x,-0.05)--(${decalage}+\\x,0.05);}`  	//result+=`\n\t {\\draw (${origine*pas1}+\\x,-0.05)--(${origine*pas1}+\\x,0.05);}`

	for (let i = 0; i < points_connus.length; i++) {
		valeur = calcul(origine + points_connus[i][1] / pas1 + calcul(points_connus[i][2] / pas1 / pas2))
		result += `\n\t \\tkzDefPoint(${valeur},0){A}`
		result += `\n\t \\tkzLabelPoint[color = black,below,inner sep = 5pt,font=\\scriptsize](A){$${tex_nombrec(valeur)}$}`
	}
	//Points inconnus
	let position = 6;
	for (let i = 0; i < points_inconnus.length; i++) {
		valeur = calcul(origine + points_inconnus[i][1] / pas1 + calcul(points_inconnus[i][2] / pas1 / pas2))
		result += `\n\t \\tkzDefPoint(${valeur},0){A}`
		result += `\n\t \\tkzDefPoint(${valeur},-0.3-${position * 0.02}){B}`
		result += `\n\t \\tkzDrawPoint[shape=cross out,color=blue,size=8](A)`
		result += `\n\t \\tkzLabelPoint[above](A){$${points_inconnus[i][0]}$}`
		if (points_inconnus[i][3]) {
			if (!fraction) { // affichage décimal 
				result += `\n\t \\tkzLabelPoint[color = blue,below=${15 + position}pt,inner sep = 5pt,font=\\scriptsize](A){$${tex_nombrec(valeur)}$}`
				result += `\n\t \\tkzDrawSegment[color=blue,arr=stealth](B,A)`
			}
			else { //affichage fractionnaire
				result += `\n\t \\tkzLabelPoint[color = blue,below=${15 + position}pt,inner sep = 5pt,font=\\scriptsize](A){$${tex_fraction_signe((origine + points_inconnus[i][1]) * pas2 + points_inconnus[i][2], pas2)}$}`
				result += `\n\t \\tkzDrawSegment[color=blue,arr=stealth](B,A)`
			}
		}
		position = 6 - position;
	}
	result += `\n\t \\end{tikzpicture}`;
	return result;

}

/**
* Utilise pgfplots pour tracer la courbe représentative de f dans le repère avec -10 < x < 10 et -8 < y < 8
*
* @param string expression de fonction
* @author Rémi Angot
*/

export function tex_graphique(f, xmin = -5, xmax = 5, ymin = -5, ymax = 5) {
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
 * Générateur de Matrice :
 * Si l'argument est un nombre, alors on s'en sert pour définir le rang de la matrice carrée qu'on rempli de zéros.
 * Sinon, c'est le tableau qui sert à remplir la Matrice
 *  @Auteur Jean-Claude Lhote
 */
export function MatriceCarree(table) {
	let ligne
	this.table = []
	if (typeof (table) == 'number') {
		this.dim = table // si c'est un nombre qui est passé en argument, c'est le rang, et on rempli la table de 0
		for (let i = 0; i < this.dim; i++) {
			ligne = []
			for (let j = 0; j < this.dim; j++)
				ligne.push(0)
			this.table.push(ligne)
		}
	}
	else { // si l'argument est une table, on la copie dans this.table et sa longueur donne la dimension de la matrice
		this.dim = table.length
		this.table = table.slice()
	}
	/**
	 * Méthode : Calcule le déterminant de la matrice carrée
	 * @Auteur Jean-Claude Lhote
	 */
	this.determinant = function () {
		let n = this.dim // taille de la matrice = nxn
		let determinant = 0, M
		for (let i = 0; i < n; i++) { // on travaille sur la ligne du haut de la matrice :ligne 0 i est la colonne de 0 à n-1
			//	if (n==1) determinant=this.table[0][0]
			if (n == 2)
				determinant = calcul(this.table[0][0] * this.table[1][1] - this.table[1][0] * this.table[0][1])
			else {
				M = this.matrice_reduite(0, i)
				determinant += calcul(((-1) ** i) * this.table[0][i] * M.determinant())
			}
		}
		return determinant
	}
	/**
	 * Méthode : m=M.matrice_reduite(l,c) retourne une nouvelle matrice obtenue à partir de la matrice M (carrée) en enlevant la ligne l et la colonne c
	 * (Utilisée dans le calcul du déterminant d'une matrice carrée.)
	 * @Auteur Jean-Claude Lhote
	 */
	this.matrice_reduite = function (l, c) {
		let resultat = [], ligne
		for (let i = 0; i < this.table.length; i++) {
			if (i != l) {
				ligne = []
				for (let j = 0; j < this.table.length; j++) {
					if (j != c) ligne.push(this.table[i][j])
				}
				if (ligne.length > 0) resultat.push(ligne)
			}
		}
		return matriceCarree(resultat)
	}
	/**
	 * Méthode : m=M.cofacteurs() retourne la matrice des cofacteurs de M utilisée dans l'inversion de M.
	 */
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
		else if (n == 2) {
			resultat = [[this.table[1][1], -this.table[1][0]], [-this.table[0][1], this.table[0][0]]]
		}
		else return false
		return matriceCarree(resultat)
	}
	/**
	 * Méthode : m=M.transposee() retourne la matrice transposée de M utilisée pour l'inversion de M
	 */
	this.transposee = function () { // retourne la matrice transposée
		let n = this.dim, resultat = [], ligne
		for (let i = 0; i < n; i++) {
			ligne = []
			for (let j = 0; j < n; j++) {
				ligne.push(this.table[j][i])
			}
			resultat.push(ligne)
		}
		return matriceCarree(resultat)
	}
	/**
	 * m=M.multiplieParReel(k) Multiplie tous les éléments de la matrice par k. Utilisée pour l'inversion de M
	 * @param {*} k 
	 */
	this.multiplieParReel = function (k) { // retourne k * la matrice
		let n = this.dim, resultat = [], ligne
		for (let i = 0; i < n; i++) {
			ligne = []
			for (let j = 0; j < n; j++) {
				ligne.push(calcul(k * this.table[i][j]))
			}
			resultat.push(ligne)
		}
		return matriceCarree(resultat)
	}

	/**
	 * Méthode : Calcule le produit d'une matrice nxn par un vecteur 1xn (matrice colonne): retourne un vecteur 1xn.
	 * 
	 */
	this.multiplieVecteur = function (V) { // Vecteur est un simple array pour l'instant
		let n = this.dim, resultat = [], somme
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
	/**
	 * Méthode : m=M.inverse() Retourne la matrice inverse de M. Utilisation : résolution de systèmes linéaires 
	 */
	this.inverse = function () { // retourne la matrice inverse (si elle existe)
		let d = this.determinant()
		if (!egal(d, 0)) {
			return this.cofacteurs().transposee().multiplieParReel(calcul(1 / d))
		}
		else return false
	}
	/**
	 * Méthode : m=M.multiplieMatriceCarree(P) : retourne m = M.P
	 *
	 */
	this.multiplieMatriceCarree = function (M) {
		let n = this.dim, resultat = [], ligne, somme
		for (let i = 0; i < n; i++) {
			ligne = []
			for (let j = 0; j < n; j++) {
				somme = 0
				for (let k = 0; k < n; k++) somme += calcul(this.table[i][k] * M.table[k][j])
				ligne.push(somme)
			}
			resultat.push(ligne)
		}
		return matriceCarree(resultat)
	}
}

/**
 * Crée une nouvelle instance de la classe MatriceCarree à partir d'un tableau.
 * 
 */
export function matriceCarree(table) {
	return new MatriceCarree(table)
}

// Fin de la classe MAtriceCarree

/**
 * Fonction qui retourne les coefficients a et b de f(x)=ax²+bx+c à partir des données de x1,x2,f(x1),f(x2) et c.
 * 
 * @Auteur Jean-Claude Lhote
 */
export function resol_sys_lineaire_2x2(x1, x2, fx1, fx2, c) {
	let matrice = matriceCarree([[x1 ** 2, x1], [x2 ** 2, x2]])
	let determinant = matrice.determinant();
	let [a, b] = matrice.cofacteurs().transposee().multiplieVecteur([fx1 - c, fx2 - c])
	if (Number.isInteger(a) && Number.isInteger(b) && Number.isInteger(determinant)) {
		let fa = fraction(a, determinant), fb = fraction(b, determinant)
		return [[fa.numIrred, fa.denIrred], [fb.numIrred, fb.denIrred]];
	}
	else return [[calcul(a / determinant), 1], [calcul(b / determinant), 1]]
}
/**
 * Fonction qui retourne les coefficients a, b et c de f(x)=ax^3 + bx² + cx + d à partir des données de x1,x2,x3,f(x1),f(x2),f(x3) et d (entiers !)
 * sous forme de fraction irréductible. Si pas de solution (déterminant nul) alors retourne [[0,0],[0,0],[0,0]]
 * @Auteur Jean-Claude Lhote
 */

export function resol_sys_lineaire_3x3(x1, x2, x3, fx1, fx2, fx3, d) {
	let matrice = matriceCarree([[x1 ** 3, x1 ** 2, x1], [x2 ** 3, x2 ** 2, x2], [x3 ** 3, x3 ** 2, x3]])
	let y1 = fx1 - d, y2 = fx2 - d, y3 = fx3 - d;
	let determinant = matrice.determinant()
	if (determinant == 0) return [[0, 0], [0, 0], [0, 0]];
	else {
		let [a, b, c] = matrice.cofacteurs().transposee().multiplieVecteur([y1, y2, y3])
		if (Number.isInteger(a) && Number.isInteger(b) && Number.isInteger(c) && Number.isInteger(determinant)) { // ici on retourne un tableau de couples [num,den] entiers !
			let fa = fraction(a, determinant), fb = fraction(b, determinant), fc = fraction(c, determinant)
			return [[fa.numIrred, fa.denIrred], [fb.numIrred, fb.denIrred], [fc.numIrred, fc.denIrred]];
		} // pour l'instant on ne manipule que des entiers, mais on peut imaginer que ce ne soit pas le cas... dans ce cas, la forme est numérateur = nombre & dénominateur=1
		else return [[calcul(a / determinant), 1], [calcul(b / determinant), 1], [calcul(b / determinant), 1]]
	}
}
/**
 * Fonction qui cherche une fonction polynomiale de degré 3 dont les coefficients a, b et c de f(x)=ax^3 + bx² + cx + d
 * sont des fractions dont le dénominateur est inférieur à 10 et pour laquelle l'image de 3 entiers compris entre -10 et 10 
 * sont des entiers compris eux aussi entre -10 et 10
 * @Auteur Jean-Claude Lhote
 */
export function crible_polynome_entier() {
	let trouve = false
	let coefs = [[]]
	for (let i = 0, x1, x2, x3, fx1, fx2, fx3, d; ; i++) {
		x1 = randint(-10, 10);
		x2 = randint(-10, 10, [x1]);
		x3 = randint(-10, 10, [x1, x2]);
		fx1 = randint(-10, 10);
		fx2 = randint(-10, 10);
		fx3 = randint(-10, 10);
		d = randint(0, 10);
		coefs = resol_sys_lineaire_3x3(x1, x2, x3, fx1, fx2, fx3, d);
		if (coefs[0][1] != 0 && coefs[0][1] < 10 && coefs[1][1] < 10 && coefs[2][1] < 10) trouve = true;
		if (trouve) {
			coefs.push([x1, fx1])
			coefs.push([x2, fx2])
			coefs.push([x3, fx3])
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
export function cherche_min_max_f([a, b, c, d]) {
	let delta = 4 * b * b - 12 * a * c
	if (delta <= 0) return [];
	let x1 = (-2 * b - Math.sqrt(delta)) / (6 * a)
	let x2 = (-2 * b + Math.sqrt(delta)) / (6 * a)
	return [[x1, a * x1 ** 3 + b * x1 ** 2 + c * x1 + d], [x2, a * x2 ** 3 + b * x2 ** 2 + c * x2 + d]]
}
/**
 * retourne les coefficients d'un polynome de degré 3 dont la dérivée s'annule en  x1 et x2 et tel que f(x1)=y1 et f(x2)=y2.
 * @Auteur Jean-Claude Lhote
 */
export function cherche_polynome_deg3_a_extrema_fixes(x1, x2, y1, y2) {
	let M = matriceCarree([[x1 ** 3, x1 ** 2, x1, 1], [x2 ** 3, x2 ** 2, x2, 1], [3 * x1 ** 2, 2 * x1, 1, 0], [3 * x2 ** 2, 2 * x2, 1, 0]])
	let R = [y1, y2, 0, 0]
	if (!egal(M.determinant(), 0)) return M.inverse().multiplieVecteur(R)
	else return false
}

/**
 * Fonction pour simplifier l'ecriture lorsque l'exposant vaut 0 ou 1
 * retourne 1, la base ou rien
 * @param b base
 * @param e exposant 
 * @author Sébastien Lozano
 */
export function simpExp(b, e) {
	switch (e) {
		case 1:
			return ` ${b}`;
		case 0:
			return ` 1`;
		default:
			return ` `;
	}
}

/**
 * Fonction pour écrire des notations scientifique de la forme a * b ^ n
 * @param a {number} mantisse
 * @param b {number} base
 * @param n {number} exposant 
 * @author Erwan Duplessy
 */
export function puissance(b, n) {
	switch (b) {
		case 0:
			return `0`;
		case 1:
			return `1`;
		case -1:
			if (b % 2 == 0) {
				return `1`;
			} else {
				return `-1`;
			}
		default:
			if (b < 0) {
				return `(${b})^{${n}}`;
			} else {
				return `${b}^{${n}}`;
			}
	}
}

export function ecriturePuissance(a, b, n) {
	switch (a) {
		case 0:
			return `$0$`;
		case 1:
			return `$${puissance(b, n)}$`;
		default:
			return `$${String(Math.round(a * 1000) / 1000).replace('.', '{,}')} \\times ${puissance(b, n)}$`.replace('.', '{,}');
	}
}

/**
 * Fonction pour simplifier les notations puissance dans certains cas
 * si la base vaut 1 ou -1 quelque soit l'exposant, retourne 1 ou -1,
 * si la base est négative on teste la parité de l'exposant pour alléger la notation sans le signe
 * si l'exposant vaut 0 ou 1 retourne 1, la base ou rien
 * @param b base
 * @param e exposant 
 * @author Sébastien Lozano
 */
export function simpNotPuissance(b, e) {
	// on switch sur la base
	switch (b) {
		case -1: // si la base vaut -1 on teste la parité de l'exposant
			if (e % 2 == 0) {
				return ` 1`;
				//break;
			} else {
				return ` -1`;
				//break;
			}
		case 1: // si la base vaut 1 on renvoit toujours 1
			return ` 1`;
		default: // sinon on switch sur l'exposant
			switch (e) {
				case 0: // si l'exposant vaut 0 on ranvoit toujours 1
					return `1`;
				case 1: // si l'exposant vaut 1 on renvoit toujours la base 
					return ` ${b}`;
				default: // sinon on teste le signe de la base et la parité de l'exposant
					if (b < 0 && e % 2 == 0) { // si la base est négative et que l'exposant est pair, le signe est inutile
						return ` ${b * -1}^{${e}}`;
						//break;
					} else {
						return ` ${b}^{${e}}`;
						//return ` `;
						//break;
					}
			}
	}
}


/**
 * Fonction pour écrire en couleur la forme éclatée d'une puissance
 * @param b base
 * @param e exposant 
 * @param couleur
 * @author Sébastien Lozano
 */
export function eclatePuissance(b, e, couleur) {
	switch (e) {
		case 0:
			return `\\mathbf{\\color{${couleur}}{1}}`;
		case 1:
			return `\\mathbf{\\color{${couleur}}{${b}}}`;
		default:
			let str = `\\mathbf{\\color{${couleur}}{${b}}} `;
			for (let i = 1; i < e; i++) {
				str = str + `\\times \\mathbf{\\color{${couleur}}{${b}}}`;
			}
			return str;
	}
}


/**
 * Fonction pour écrire la forme éclatée d'une puissance
 * @param b base
 * @param e exposant 
 * @author Rémi Angot
 */
export function puissanceEnProduit(b, e) {
	switch (e) {
		case 0:
			return `1`;
		case 1:
			return `${b}`;
		default:
			let str = `${b}`;
			for (let i = 1; i < e; i++) {
				str = str + `\\times ${b}`;
			}
			return str;
	}
}

/**
 * Fonction pour écrire avec deux couleurs la forme éclatée d'un produit de puissances de même exposant
 * @param b1 base1
 * @param b2 base2
 * @param e exposant 
 * @param couleur1
 * @param couleur2
 * @Auteur Sébastien Lozano
 */
export function reorganiseProduitPuissance(b1, b2, e, couleur1, couleur2) {
	switch (e) {
		case 0:
			return `1`;
		case 1:
			return `\\mathbf{\\color{${couleur1}}{${b1}}} \\times \\mathbf{\\color{${couleur2}}{${b2}}}`;
		default:
			let str = `\\mathbf{(\\color{${couleur1}}{${b1}}} \\times \\mathbf{\\color{${couleur2}}{${b2}}}) `;
			for (let i = 1; i < e; i++) {
				str = str + `\\times (\\mathbf{\\color{${couleur1}}{${b1}}} \\times \\mathbf{\\color{${couleur2}}{${b2}}})`;
			}
			return str;
	}

}

/**
 * 
 * x le nombre dont on cherche l'ordre de grandeur 
 * type = 0 pour la puissance de 10 inférieure, 1 pour la puissance de 10 supérieur et 2 pour la plus proche
 */
export function ordreDeGrandeur(x, type) {
	let signe, P
	if (x < 0) signe = -1
	else signe = 1
	x = Math.abs(x)
	P = 10 ** Math.floor(Math.log10(x))
	if (type == 0) return P * signe
	else if (type == 1) return P * 10 * signe
	else if (x - P < 10 * P - x) return P * signe
	else return P * 10 * signe
}

/**
* Fonction créant le bouton d'aide utilisée par les différentes fonctions modal_ type de contenu
* @param numero_de_l_exercice
* @param contenu code HTML 
* @param icone 
* @Auteur Rémi Angot
*/
export function creer_modal(numero_de_l_exercice, contenu, label_bouton, icone) {
	let HTML = `<button class="ui right floated mini compact button" onclick="$('#modal${numero_de_l_exercice}').modal('show');"><i class="large ${icone} icon"></i>${label_bouton}</button>
		<div class="ui modal" id="modal${numero_de_l_exercice}">
		${contenu}
		</div>`
	return HTML;
}
/**
* Fonction créant le bouton d'aide utilisée par les différentes fonctions modal_ type de contenu
* @param numero_de_l_exercice
* @param contenu code HTML 
* @param icone 
* @Auteur Rémi Angot
*/
export function creerBoutonMathalea2d(numero_de_l_exercice, fonction, label_bouton = "Aide", icone = "info circle") {
	let HTML = `<button class="ui toggle left floated mini compact button" id = "btnMathALEA2d_${numero_de_l_exercice}" onclick="${fonction}"><i class="large ${icone} icon"></i>${label_bouton}</button>`

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
export function modal_texte_court(numero_de_l_exercice, texte, label_bouton = "Aide", icone = "info circle") {
	let contenu = `<div class="header">${texte}</div>`
	return creer_modal(numero_de_l_exercice, contenu, label_bouton, icone)
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
export function modal_youtube(numero_de_l_exercice, id_youtube, texte, label_bouton = "Aide - Vidéo", icone = "youtube") {
	let contenu
	if (id_youtube.substr(0, 4) == 'http') {
		if (id_youtube.slice(-4) == '.pdf') {
			contenu = `<div class="header">${texte}</div><div class="content"><p align="center"><object type="application/pdf" data="${id_youtube}" width="560" height="315"> </object></p></div>`
		}
		if (id_youtube.substr(0, 17) == 'https://youtu.be/') {
			contenu = `<div class="header">${texte}</div><div class="content"><p align="center"><iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${id_youtube.substr(17, 28)}?rel=0&showinfo=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p></div>`
		}
		else {
			contenu = `<div class="header">${texte}</div><div class="content"><p align="center"><iframe width="560" height="315" sandbox="allow-same-origin allow-scripts allow-popups" src="${id_youtube}" frameborder="0" allowfullscreen></iframe></p></div>`
		}
	} else if (id_youtube.substr(0, 4) == '<ifr') {
		contenu = `<div class="header">${texte}</div><div class="content"><p align="center">${id_youtube}</p></div>`
	}
	else {
		contenu = `<div class="header">${texte}</div><div class="content"><p align="center"><iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${id_youtube}?rel=0&showinfo=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p></div>`
	}
	return creer_modal(numero_de_l_exercice, contenu, label_bouton, icone)
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
export function modal_texte_long(numero_de_l_exercice, titre, texte, label_bouton = "Aide", icone = "info circle") {
	let contenu = `<div class="header">${titre}</div>`
	contenu += `<div class="content">${texte}</div>`
	return creer_modal(numero_de_l_exercice, contenu, label_bouton, icone)
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
export function modal_url(numero_de_l_exercice, url, label_bouton = "Aide", icone = "info circle") {
	let contenu = `<iframe width="100%" height="600"  src="${url}" frameborder="0" ></iframe>`
	return creer_modal(numero_de_l_exercice, contenu, label_bouton, icone)
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
export function modal_pdf(numero_de_l_exercice, url_pdf, texte = "Aide", label_bouton = "Aide - PDF", icone = "file pdf") {
	let contenu = `<div class="header">${texte}</div><div class="content"><p align="center"><embed src=${url_pdf} width=90% height=500 type='application/pdf'/></p></div>`
	return creer_modal(numero_de_l_exercice, contenu, label_bouton, icone)
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
export function modal_video(id_du_modal, url_video, texte, label_bouton = "Vidéo", icone = "file video outline") {
	//let contenu = `<div class="header">${texte}</div><div class="content"><p align="center"><iframe width="560" height="315" src="${url_video}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p></div>`
	let contenu = `
	<div class="header">${texte}</div>
	<div class="content">
		<div class="embed-responsive embed-responsive-16by9" align="center">
			<video width="560" height="315" controls  preload="none" style="max-width: 100%">
				<source src="`+ url_video + `">
				Votre navigateur ne gère pas l\'élément <code>video</code>.
			</video>
  		</div>
	</div>`
	return creer_modal(id_du_modal, contenu, label_bouton, icone)
}
/**
 * 
 * @param {number} numero_de_l_exercice 
 * @param {string} url_image 
 * @param {string} texte = ce qui est écrit sur le bouton à côté de l'icône d'image.
 * @param {string} label_bouton = ce qui est écrit en titre de l'image 
 * @param {string} icone 
 */
export function modal_image(numero_de_l_exercice, url_image, texte, label_bouton = "Illustration", icone = "image") {
	let contenu = `<div class="header">${texte}</div><div class="image content"><img class="ui centered medium image" src="${url_image}"></div>`
	return creer_modal(numero_de_l_exercice, contenu, label_bouton, icone)
}

/**
 * Renvoie un tableau contenant les diviseurs d'un nombre entier, rangés dans l'ordre croissant  
 * @param {integer} n 
 * @Auteur Sébastien Lozano
 */
export function liste_diviseurs(n) {
	'use strict';
	let i = 2;
	let diviseurs = [1];
	while (i <= n) {
		if (n % i == 0) {
			diviseurs.push(i);
		}
		i++;
	}
	return diviseurs;
}

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

export function tikz_machine_maths(nom, etape1, etape2, etape3, x_ligne1, x_ligne2, y_ligne1, y_ligne2) {
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
}

/**
 * Crée un diagramme tikz pour une machine maths
 * @param {string} nom nom de la fonction 
 * @param {string} x_ant nom du nombre de départ
 * @param {array} etapes_expressions tableau contenant les etapes et le expressions algébriques
 * attention mode maths pour les chaines
 * @author Sébastien Lozano
 */
export function tikz_machine_diag(nom, x_ant, etapes_expressions) {
	'use strict';
	var x_init = -10;
	var saut = 0;
	var pas = 1;
	var sortie = ``;
	sortie += `
	\\definecolor{frvzsz}{rgb}{0.9450980392156862,0.34901960784313724,0.1607843137254902}
	\\begin{tikzpicture}[line cap=round,line join=round,>=triangle 45,x=1cm,y=1cm]
	\\draw [line width=3pt,color=frvzsz] (`+ x_init + `,0.5) -- (` + (x_init + pas) + `,0.5) -- (` + (x_init + pas) + `,-0.5) -- (` + x_init + `,-0.5) -- cycle;
	\\node[text width=3cm,text centered, scale=1] at(`+ (x_init + 0.5) + `,0){$${x_ant}$};
	`;
	saut = saut + pas;
	for (var i = 0; i < etapes_expressions.length; i++) {
		//si la longueur du tableau des etapes vaut i+1 c'est que c'est la derniere 
		//on affiche donc chaque fois avec le nom de la fonction
		if (etapes_expressions.length == i + 1) {
			// si il y a une operation et une expression algébrique
			if (typeof etapes_expressions[i][0] !== 'undefined' && typeof etapes_expressions[i][1] !== 'undefined') {
				let w_etape = `${nom}(x)=${etapes_expressions[i][1]}}`.length;
				sortie += `
				\\draw [line width=3pt,color=frvzsz] (`+ (x_init + saut) + `,0) -- (` + (x_init + saut + pas / 2) + `,0);
				\\draw [line width=3pt,color=frvzsz] (`+ (x_init + saut + pas) + `,0) circle(0.5);
				\\node [text width=3cm,text centered, scale=1] at(`+ (x_init + saut + pas) + `,0){$${etapes_expressions[i][0]}$};
				\\draw [->,line width=3pt,color=frvzsz] (`+ (x_init + saut + 3 * pas / 2) + `,0) -- (` + (x_init + saut + 5 * pas / 2) + `,0);
				\\draw [line width=3pt,color=frvzsz] (`+ (x_init + saut + 5 * pas / 2) + `,0.5) -- (` + (x_init + saut + w_etape / 4 + 6 * pas / 2) + `,0.5) -- (` + (x_init + saut + w_etape / 4 + 6 * pas / 2) + `,-0.5) -- (` + (x_init + saut + 5 * pas / 2) + `,-0.5) -- cycle;
				\\node [text width=3cm,text centered, scale=1] at(`+ (x_init + saut + w_etape / 8 + 5.5 * pas / 2) + `,0){$${nom}(` + x_ant + `)=${etapes_expressions[i][1]}$};
				`;
			}
			// si il y a une operation et pas d'expression algébrique 
			if (typeof etapes_expressions[i][0] !== 'undefined' && typeof etapes_expressions[i][1] == 'undefined') {
				let w_etape = `${nom}(x)=\\ldots`.length;
				sortie += `
				\\draw [line width=3pt,color=frvzsz] (`+ (x_init + saut) + `,0) -- (` + (x_init + saut + pas / 2) + `,0);
				\\draw [line width=3pt,color=frvzsz] (`+ (x_init + saut + pas) + `,0) circle(` + (pas / 2) + `);
				\\node [text width=3cm,text centered, scale=1] at(`+ (x_init + saut + pas) + `,0){$${etapes_expressions[i][0]}$};
				\\draw [->,line width=3pt,color=frvzsz] (`+ (x_init + saut + 3 * pas / 2) + `,0) -- (` + (x_init + saut + 5 * pas / 2) + `,0);
				\\draw [line width=3pt,color=frvzsz] (`+ (x_init + saut + 5 * pas / 2) + `,` + (pas / 2) + `) -- (` + (x_init + saut + w_etape / 4 + 6 * pas / 2) + `,` + (pas / 2) + `) -- (` + (x_init + saut + w_etape / 4 + 6 * pas / 2) + `,-` + (pas / 2) + `) -- (` + (x_init + saut + 5 * pas / 2) + `,-` + (pas / 2) + `) -- cycle;
				\\node [text width=3cm,text centered, scale=1] at(`+ (x_init + saut + w_etape / 8 + 5.5 * pas / 2) + `,0){$${nom}(` + x_ant + `)=\\ldots$};
				`;
			}
			// si il n'y a pas d'operation mais une expression algébrique
			if (typeof etapes_expressions[i][0] == 'undefined' && typeof etapes_expressions[i][1] !== 'undefined') {
				let w_etape = `${nom}(x)=${etapes_expressions[i][1]}`.length;
				sortie += `
				\\draw [line width=3pt,color=frvzsz] (`+ (x_init + saut) + `,0) -- (` + (x_init + saut + pas / 2) + `,0);
				\\draw [line width=3pt,color=frvzsz] (`+ (x_init + saut + pas) + `,0) circle(` + (pas / 2) + `);
				\\node [text width=3cm,text centered, scale=1] at(`+ (x_init + saut + pas) + `,0){$\\ldots$};
				\\draw [->,line width=3pt,color=frvzsz] (`+ (x_init + saut + 3 * pas / 2) + `,0) -- (` + (x_init + saut + 5 * pas / 2) + `,0);
				\\draw [line width=3pt,color=frvzsz] (`+ (x_init + saut + 5 * pas / 2) + `,` + (pas / 2) + `) -- (` + (x_init + saut + w_etape / 4 + 6 * pas / 2) + `,` + (pas / 2) + `) -- (` + (x_init + saut + w_etape / 4 + 6 * pas / 2) + `,-` + (pas / 2) + `) -- (` + (x_init + saut + 5 * pas / 2) + `,-` + (pas / 2) + `) -- cycle;
				\\node [text width=3cm,text centered, scale=1] at(`+ (x_init + saut + w_etape / 8 + 5.5 * pas / 2) + `,0){$${nom}(` + x_ant + `)=${etapes_expressions[i][1]}$};
				`;
			}
			// si il n'y ni une operation et ni expression algébrique
			if (typeof etapes_expressions[i][0] == 'undefined' && typeof etapes_expressions[i][1] == 'undefined') {
				let w_etape = `${nom}(x)=\\ldots`.length;
				sortie += `
				\\draw [line width=3pt,color=frvzsz] (`+ (x_init + saut) + `,0) -- (` + (x_init + saut + pas / 2) + `,0);
				\\draw [line width=3pt,color=frvzsz] (`+ (x_init + saut + pas) + `,0) circle(` + (pas / 2) + `);
				\\node [text width=3cm,text centered, scale=1] at(`+ (x_init + saut + pas) + `,0){$\\ldots$};
				\\draw [->,line width=3pt,color=frvzsz] (`+ (x_init + saut + 3 * pas / 2) + `,0) -- (` + (x_init + saut + 5 * pas / 2) + `,0);
				\\draw [line width=3pt,color=frvzsz] (`+ (x_init + saut + 5 * pas / 2) + `,` + (pas / 2) + `) -- (` + (x_init + saut + w_etape / 4 + 6 * pas / 2) + `,` + (pas / 2) + `) -- (` + (x_init + saut + w_etape / 4 + 6 * pas / 2) + `,-` + (pas / 2) + `) -- (` + (x_init + saut + 5 * pas / 2) + `,-` + (pas / 2) + `) -- cycle;
				\\node [text width=3cm,text centered, scale=1] at(`+ (x_init + saut + w_etape / 8 + 5.5 * pas / 2) + `,0){$${nom}(` + x_ant + `)=\\ldots$};
				`;
			}

		} else {//sinon c'est une étape intermédiaire
			// si il y a une operation et une expression algébrique
			if (typeof etapes_expressions[i][0] !== 'undefined' && typeof etapes_expressions[i][1] !== 'undefined') {
				let w_etape = `${etapes_expressions[i][1]}`.length;
				sortie += `
				\\draw [line width=3pt,color=frvzsz] (`+ (x_init + saut) + `,0) -- (` + (x_init + saut + pas / 2) + `,0);
				\\draw [line width=3pt,color=frvzsz] (`+ (x_init + saut + pas) + `,0) circle(` + (pas / 2) + `);
				\\node [text width=3cm,text centered, scale=1] at(`+ (x_init + saut + pas) + `,0){$${etapes_expressions[i][0]}$};
				\\draw [->,line width=3pt,color=frvzsz] (`+ (x_init + saut + 3 * pas / 2) + `,0) -- (` + (x_init + saut + 5 * pas / 2) + `,0);
				\\draw [line width=3pt,color=frvzsz] (`+ (x_init + saut + 5 * pas / 2) + `,` + (pas / 2) + `) -- (` + (x_init + saut + w_etape / 4 + 6 * pas / 2) + `,` + (pas / 2) + `) -- (` + (x_init + saut + w_etape / 4 + 6 * pas / 2) + `,-` + (pas / 2) + `) -- (` + (x_init + saut + 5 * pas / 2) + `,-` + (pas / 2) + `) -- cycle;
				\\node [text width=3cm,text centered, scale=1] at(`+ (x_init + saut + w_etape / 8 + 5.5 * pas / 2) + `,0){$${etapes_expressions[i][1]}$};
				`;
				saut = saut + 3 * pas + w_etape / 4;
			}
			// si il y a une operation et pas d'expression algébrique 
			if (typeof etapes_expressions[i][0] !== 'undefined' && typeof etapes_expressions[i][1] == 'undefined') {
				let w_etape = `\\ldots`.length;
				sortie += `
				\\draw [line width=3pt,color=frvzsz] (`+ (x_init + saut) + `,0) -- (` + (x_init + saut + pas / 2) + `,0);
				\\draw [line width=3pt,color=frvzsz] (`+ (x_init + saut + pas) + `,0) circle(` + (pas / 2) + `);
				\\node [text width=3cm,text centered, scale=1] at(`+ (x_init + saut + pas) + `,0){$${etapes_expressions[i][0]}$};
				\\draw [->,line width=3pt,color=frvzsz] (`+ (x_init + saut + 3 * pas / 2) + `,0) -- (` + (x_init + saut + 5 * pas / 2) + `,0);
				\\draw [line width=3pt,color=frvzsz] (`+ (x_init + saut + 5 * pas / 2) + `,` + (pas / 2) + `) -- (` + (x_init + saut + w_etape / 4 + 6 * pas / 2) + `,` + (pas / 2) + `) -- (` + (x_init + saut + w_etape / 4 + 6 * pas / 2) + `,-` + (pas / 2) + `) -- (` + (x_init + saut + 5 * pas / 2) + `,-` + (pas / 2) + `) -- cycle;
				\\node [text width=3cm,text centered, scale=1] at(`+ (x_init + saut + w_etape / 8 + 5.5 * pas / 2) + `,0){$\\ldots$};
				`;
				saut = saut + 3 * pas + w_etape / 4;
			}
			// si il n'y a pas d'operation mais une expression algébrique
			if (typeof etapes_expressions[i][0] == 'undefined' && typeof etapes_expressions[i][1] !== 'undefined') {
				let w_etape = `${etapes_expressions[i][1]}`.length;
				sortie += `
				\\draw [line width=3pt,color=frvzsz] (`+ (x_init + saut) + `,0) -- (` + (x_init + saut + pas / 2) + `,0);
				\\draw [line width=3pt,color=frvzsz] (`+ (x_init + saut + pas) + `,0) circle(` + (pas / 2) + `);
				\\node [text width=3cm,text centered, scale=1] at(`+ (x_init + saut + pas) + `,0){$\\ldots$};
				\\draw [->,line width=3pt,color=frvzsz] (`+ (x_init + saut + 3 * pas / 2) + `,0) -- (` + (x_init + saut + 5 * pas / 2) + `,0);
				\\draw [line width=3pt,color=frvzsz] (`+ (x_init + saut + 5 * pas / 2) + `,` + (pas / 2) + `) -- (` + (x_init + saut + w_etape / 4 + 6 * pas / 2) + `,` + (pas / 2) + `) -- (` + (x_init + saut + w_etape / 4 + 6 * pas / 2) + `,-` + (pas / 2) + `) -- (` + (x_init + saut + 5 * pas / 2) + `,-` + (pas / 2) + `) -- cycle;
				\\node [text width=3cm,text centered, scale=1] at(`+ (x_init + saut + w_etape / 8 + 5.5 * pas / 2) + `,0){$${etapes_expressions[i][1]}$};
				`;
				saut = saut + 3 * pas + w_etape / 4;
			}
			// si il n'y ni une operation et ni expression algébrique
			if (typeof etapes_expressions[i][0] == 'undefined' && typeof etapes_expressions[i][1] == 'undefined') {
				let w_etape = `\\ldots`.length;
				sortie += `
				\\draw [line width=3pt,color=frvzsz] (`+ (x_init + saut) + `,0) -- (` + (x_init + saut + pas / 2) + `,0);
				\\draw [line width=3pt,color=frvzsz] (`+ (x_init + saut + pas) + `,0) circle(` + (pas / 2) + `);
				\\node [text width=3cm,text centered, scale=1] at(`+ (x_init + saut + pas) + `,0){$\\ldots$};
				\\draw [->,line width=3pt,color=frvzsz] (`+ (x_init + saut + 3 * pas / 2) + `,0) -- (` + (x_init + saut + 5 * pas / 2) + `,0);
				\\draw [line width=3pt,color=frvzsz] (`+ (x_init + saut + 5 * pas / 2) + `,` + (pas / 2) + `) -- (` + (x_init + saut + w_etape / 4 + 6 * pas / 2) + `,` + (pas / 2) + `) -- (` + (x_init + saut + w_etape / 4 + 6 * pas / 2) + `,-` + (pas / 2) + `) -- (` + (x_init + saut + 5 * pas / 2) + `,-` + (pas / 2) + `) -- cycle;
				\\node [text width=3cm,text centered, scale=1] at(`+ (x_init + saut + w_etape / 8 + 5.5 * pas / 2) + `,0){$\\ldots$};
				`;
				saut = saut + 3 * pas + w_etape / 4;
			}
		}
	}
	sortie += `
	\\end{tikzpicture}
	`;
	return sortie;
}

/**
 * Crée un popup html avec un icon info, éventuellement avec du contenu LaTeX
 * @param {string} texte 
 * @param {string} titrePopup 
 * @param {string} textePopup 
 * @Auteur Sébastien Lozano
 */
export function katex_Popup(texte, titrePopup, textePopup) {
	'use strict';
	let contenu = ``
	if (sortie_html) {
		contenu = `<div class="mini ui right labeled icon button katexPopup"><i class="info circle icon"></i> ` + texte + `</div>`;
		contenu += `<div class="ui special popup" >`;
		if (titrePopup != '') {
			contenu += `<div class="header">` + titrePopup + `</div>`;
		}
		contenu += `<div>` + textePopup + `</div>`;
		contenu += `</div>`;
		return contenu;
	} else {
		return `\\textbf{${texte}} \\footnote{\\textbf{${titrePopup}} ${textePopup}}`
	}
}
export function katex_Popuptest(texte, titrePopup, textePopup) {
	'use strict';
	let contenu = ``
	if (sortie_html) {
		contenu = `<div class="ui right label katexPopup">` + texte + `</div>`;
		contenu += `<div class="ui special popup" >`;
		if (titrePopup != '') {
			contenu += `<div class="header">` + titrePopup + `</div>`;
		}
		contenu += `<div>` + textePopup + `</div>`;
		contenu += `</div>`;
		return contenu;
	} else {
		return `\\textbf{${texte}} \\footnote{\\textbf{${titrePopup}} ${textePopup}}`
	}
}
/**
 * Ecrit un string sans accents
 * @param {string} str
 * @author Sébastien Lozano 
 * source --> http://www.finalclap.com/faq/257-javascript-supprimer-remplacer-accent
 */
/* export function sansAccent(str) {
	var accent = [
		/[\300-\306]/g, /[\340-\346]/g,
		/[\310-\313]/g, /[\350-\353]/g,
		/[\314-\317]/g, /[\354-\357]/g,
		/[\322-\330]/g, /[\362-\370]/g,
		/[\331-\334]/g, /[\371-\374]/g,
		/[\321]/g, /[\361]/g,
		/[\307]/g, /[\347]/g,
	];
	var noaccent = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];

	//var str = this;
	for (var i = 0; i < accent.length; i++) {
		str = str.replace(accent[i], noaccent[i]);
	}

	return str;
}
*/

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

export function katex_Popup2(numero, type, texte, titrePopup, textePopup) {
	'use strict';
	switch (type) {
		case 0:
			return katex_Popuptest(texte, titrePopup, textePopup);
		case 1:
			if (sortie_html) {
				return `${texte}` + modal_texte_long(numero, `${titrePopup}`, `${textePopup}`, `${texte}`, "info circle")
			} else {
				return `\\textbf{${texte}} \\footnote{\\textbf{${titrePopup}} ${textePopup}}`
			}
		case 2:
			if (sortie_html) {
				return `${texte}` + modal_image(numero, textePopup, `${titrePopup}`, `${texte}`)
			} else {
				return `\\href{https://coopmaths.fr/images/${texte}.png}{\\textcolor{blue}{\\underline{${texte}}} } \\footnote{\\textbf{${texte}} ${textePopup}}`
			}
	}
}



/**
 * Crée une liste de questions alphabétique
 * @param {number} k valeur numérique
 * @Auteur Sébastien Lozano
 */
export function num_alpha(k) {
	'use strict';
	if (sortie_html) return '<span style="color:#f15929; font-weight:bold">' + String.fromCharCode(97 + k) + '/</span>';
	//else return '\\textcolor [HTML] {f15929} {'+String.fromCharCode(97+k)+'/}';
	else return '\\textbf {' + String.fromCharCode(97 + k) + '.}';
}

/**
* Crée une flèche orange pour la fonction machine
* @param {object} groupe groupe svg
* @param {string} chemin path pour la ligne 
* @param {string} couleur couleur
* @Auteur Sébastien Lozano
*/
export function SVG_fleche_machine_maths(groupe, chemin, couleur) {
	'use strict';
	return groupe.path(chemin).fill(couleur).stroke({ color: couleur, width: 1, linecap: 'round', linejoin: 'null' });
}

/**Trace un chemin pour un groupe donné avec une couleur donnée
* @param {object} groupe groupe
* @param {string} chemin path
* @param {string} couleur couleur
* @Auteur Sébastien Lozano
*/
export function SVG_chemin(groupe, chemin, couleur) {
	'use strict';
	return groupe.path(chemin).fill('none').stroke({ color: couleur, width: 1, linecap: 'round', linejoin: 'null' });
}

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
export function SVG_machine_diag_3F1_act_mono(id_du_div, w, h, nom, x_ant, etapes_expressions) {
	'use strict';
	let interligne = 10;//w/80; //h/10; // unité d'espacement
	if (!window.SVGExist) { window.SVGExist = {} } // Si SVGExist n'existe pas on le créé
	// SVGExist est un dictionnaire dans lequel on stocke les listenner sur la création des div
	window.SVGExist[id_du_div] = setInterval(function () {

		if ($(`#${id_du_div}`).length) {
			$(`#${id_du_div}`).html("");//Vide le div pour éviter les SVG en doublon
			// on crée un rectangle dont la taille est adaptée au texte
			//let path_cadre_rect_ant = 'M0,0L0,-'+interligne+',L'+(w_x_ant + 2*interligne)+',-'+interligne+',L'+(w_x_ant + 2*interligne)+','+interligne+'L0,'+interligne+'Z';
			document.getElementById(id_du_div).innerHTML = `
				<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 `+ w + ` ` + h + `" width="` + w + `">
					<g>
						<path d="M0 `+ 5 * interligne + `L0 ` + 3 * interligne + `L` + 5 * interligne + ` ` + 3 * interligne + `L` + 5 * interligne + ` ` + 7 * interligne + `L0 ` + 7 * interligne + `Z " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
						</path>
						<foreignObject width="`+ interligne + `" height="` + h / 2 + `" x="` + 2.5 * interligne + `" y="` + h / 4 + `">
							<div style="position: fixed">
								<span class="katex-display">
									<span class="katex">
										<span class="katex-html" aria-hidden="true">
											<span class="base">
												<span class="mord mathdefault">`+ x_ant + `</span>
											</span>
										</span>
									</span>
								</span>
							</div>
						</foreignObject>
					</g>
					<g>
						<line x1="`+ 5 * interligne + `" y1="` + 5 * interligne + `" x2="` + 7 * interligne + `" y2="` + 5 * interligne + `" stroke-width="3" stroke="#f15929">
						</line>
						<circle r="`+ 2 * interligne + `" cx="` + 9 * interligne + `" cy="` + 5 * interligne + `" fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
						</circle>
						<path d="M`+ 11 * interligne + ` ` + 5 * interligne + `L` + 13 * interligne + ` ` + 5 * interligne + `L` + (13 * interligne - interligne / 2) + ` ` + (5 * interligne - interligne / 2) + `M` + 13 * interligne + ` ` + 5 * interligne + `L` + (13 * interligne - interligne / 2) + ` ` + (5 * interligne + interligne / 2) + ` " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
						</path>
						<foreignObject width="`+ 4 * interligne + `" height="` + h / 2 + `" x="` + 7.5 * interligne + `" y="` + h / 4 + `">
							<div style="position: fixed">
								<span class="katex-display">
									<span class="katex">
										<span class="katex-html" aria-hidden="true">
											<span class="base">
												<span class="mord mathdefault">×`+ etapes_expressions[0][0] + `</span>
											</span>
										</span>
									</span>
								</span>
							</div>
						</foreignObject>
					</g>
					<g>
						<path d="M`+ 13 * interligne + ` ` + 5 * interligne + `L` + 13 * interligne + ` ` + 3 * interligne + `L` + 27 * interligne + ` ` + 3 * interligne + `L` + 27 * interligne + ` ` + 7 * interligne + `L` + 13 * interligne + ` ` + 7 * interligne + `Z " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
						</path>
						<foreignObject width="`+ 12 * interligne + `" height="` + h / 2 + `" x="` + 16 * interligne + `" y="` + h / 4 + `">
							<div style="position: fixed">
								<span class="katex-display">
									<span class="katex">
										<span class="katex-html" aria-hidden="true">
											<span class="base">
												
												<span class="mord mathdefault">`+ nom + `<span class="mopen">(</span>` + x_ant + `<span class="mclose">)</span><span class="mspace" style="margin-right: 0.408889em;"></span>=<span class="mspace" style="margin-right: 0.408889em;"></span>` + etapes_expressions[0][1] + `</span>
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
		}
	}, 100); // Vérifie toutes les 100ms
}

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
export function my_svg_font(font, interligne, ancre, f_style, f_weight) {
	'use strict';
	return {
		family: font,
		size: interligne,
		anchor: ancre,
		style: f_style,
		//, leading : 0.5
		weight: f_weight
	};
}

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
export function SVG_machine_maths(id_du_div, w, h, nom, etape1, etape2, etape3, x_ligne1, x_ligne2, y_ligne1, y_ligne2) {
	'use strict';
	let interligne = 15; // pour un interligne uniforme 
	let prop_font = my_svg_font('Helvetica', interligne, 'start', 'normal', 'normal');
	let prop_font_nom = my_svg_font('Helvetica', interligne, 'start', 'normal', 'bold');
	let prop_font_etape = my_svg_font('Helvetica', 4 * interligne / 5, 'start', 'normal', 'normal');

	if (!window.SVGExist) { window.SVGExist = {} } // Si SVGExist n'existe pas on le créé
	// SVGExist est un dictionnaire dans lequel on stocke les listenner sur la création des div
	window.SVGExist[id_du_div] = setInterval(function () {

		if ($(`#${id_du_div}`).length) {
			$(`#${id_du_div}`).html("");//Vide le div pour éviter les SVG en doublon
			//const mon_svg = SVG().addTo(`#${id_du_div}`).viewbox(0, 0, w, h).size('100%','100%');
			const mon_svg = SVG().addTo(`#${id_du_div}`).viewbox(0, 0, w, h);
			// on trace un cadre pour le debug
			//mon_svg.path('M0,0 L'+w+',0L'+w+','+h+'L0,'+h+'Z').fill('none').stroke({ color: '#f15929', width: 1, linecap: 'round', linejoin:'null'});

			// path pour créer des fleches
			const path_fleche = 'm0,0 l-' + interligne / 2 + ',-' + interligne + ' l' + interligne + ',' + interligne + ' l-' + interligne + ',' + interligne + ' l' + interligne / 2 + ',-' + interligne + 'z';

			// On crée une timeline
			let timeline = new SVG.Timeline();

			//------------CREATION DES GROUPES----------------------
			//------------Antécédent--------------------------------
			let ant = mon_svg.group();

			//------------Image-------------------------------------
			let im = mon_svg.group();

			//------------PREPARATION DES DIMENSIONS NECESSAIRES----
			//------------Dimension Antécédent----------------------
			let ant_ligne1 = ant.text(x_ligne1).font(prop_font);
			let ant_ligne2 = ant.text(x_ligne2).font(prop_font);
			let w_ant = Math.max(ant_ligne1.length(), ant_ligne2.length()) + interligne;
			ant_ligne1.clear();
			ant_ligne2.clear();

			//------------Dimension Image---------------------------
			let im_ligne1 = im.text(y_ligne1).font(prop_font);
			let im_ligne2 = im.text(y_ligne2).font(prop_font);
			let w_im = Math.max(im_ligne1.length(), im_ligne2.length()) + interligne;
			im_ligne1.clear();
			im_ligne2.clear();

			//------------Dimension Machine-------------------------
			// on crée des variables pour le texte à afficher sur la machine afin de récupérer leur taille
			// pour ajuster celle de la machine.
			let W_machine_nom,machine_nom,machine_etape1,w_machine_etape1,machine_etape2,w_machine_etape2,machine_etape3,w_machine_etape3
			if (nom != '') {
				machine_nom = mon_svg.text(nom).font(prop_font_nom);
				w_machine_nom = machine_nom.length();
				machine_nom.clear();
			} else {
				w_machine_nom = 0;
			}
			if (etape1 != '') {
				machine_etape1 = mon_svg.text(etape1).font(prop_font_etape);
				w_machine_etape1 = machine_etape1.length();
				machine_etape1.clear();
			} else {
				w_machine_etape1 = 0;
			}
			if (etape2 != '') {
				machine_etape2 = mon_svg.text(etape2).font(prop_font_etape);
				w_machine_etape2 = machine_etape2.length();
				machine_etape2.clear();
			} else {
				w_machine_etape2 = 0;
			}
			if (etape3 != '') {
				machine_etape3 = mon_svg.text(etape3).font(prop_font_etape);
				w_machine_etape3 = machine_etape3.length();
				machine_etape3.clear();
			} else {
				w_machine_etape3 = 0;
			}

			let w_etape_max = Math.max(w_machine_nom, w_machine_etape1, w_machine_etape2, w_machine_etape3, w_ant + interligne, w_im + interligne) + 1.5 * interligne;

			//------------GROUPE ANTECEDENT------------------------- 
			let ant_ligne = ant.foreignObject(w_ant, h).attr({ x: '0', y: '0' });
			let antDiv = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
			katex.render(x_ligne1 + '\\newline ' + x_ligne2, antDiv, {
				"displayMode": true, "throwOnError": true, "errorColor": "#CC0000", "strict": "ignore", "trust": false
			});
			ant_ligne.add(antDiv);
			ant_ligne.dmove(0, -antDiv.offsetHeight / 2);
			let fleche_ant = SVG_fleche_machine_maths(ant, path_fleche, '#f15929');
			fleche_ant.dmove(antDiv.offsetWidth + interligne / 2, interligne);
			// on positionne le groupe antécédent
			ant.dmove(0, h / 2 - interligne);

			//------------GROUPE IMAGE-------------------------
			let im_ligne = im.foreignObject(w_im, h).attr({ x: '0', y: '0' });
			let imDiv = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
			katex.render(y_ligne1 + '\\newline ' + y_ligne2, imDiv, {
				"displayMode": true, "throwOnError": true, "errorColor": "#CC0000", "strict": "ignore", "trust": false
			});
			im_ligne.add(imDiv);
			im_ligne.dmove(0, -imDiv.offsetHeight / 2);
			let fleche_im = SVG_fleche_machine_maths(im, path_fleche, '#f15929');
			fleche_im.dmove(-interligne / 2, interligne);
			// on positionne le groupe image
			im.dmove(w / 2 - imDiv.offsetWidth / 2, h / 2 - interligne);

			//------------GROUPE MACHINE-------------------------
			//const path_machine = 'M-5,0 L-5,-5 L-5,5 M-5,0 L10,0 L10,-40 L100,-40 L100,0 L120,0 L115,-5 L120,0 L115,5 L120,0 L100,0 L100,40 L10,40 L10,0';
			const path_machine = 'M-10,0 L-10,-5 L-10,5 M-10,0 L10,0 L10,-' + (h / 2 - 5) + ' L' + (w_etape_max + 20) + ',-' + (h / 2 - 5) + ' L' + (w_etape_max + 20) + ',0 L' + (w_etape_max + 40) + ',0 L' + (w_etape_max + 35) + ',-5 L' + (w_etape_max + 40) + ',0 L' + (w_etape_max + 35) + ',5 L' + (w_etape_max + 40) + ',0 L' + (w_etape_max + 20) + ',0 L' + (w_etape_max + 20) + ',' + (h / 2 - 5) + ' L10,' + (h / 2 - 5) + ' L10,0';
			let machine = mon_svg.path(path_machine).fill('#fff').stroke({ color: '#f15929', width: 3, linecap: 'round', linejoin: 'round' });
			machine.dmove(w / 2 - w_etape_max / 2 - 20 + interligne / 2, h / 2); //w/2;  60 est la moitié de la taille de la machine en largeur

			let fobj_machine = mon_svg.foreignObject(w_etape_max, h).attr({ x: w / 2 - w_etape_max / 2, y: '0' });
			let machineDiv = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
			katex.render('\\mathbf{' + nom + '}\\newline ' + etape1 + '\\newline ' + etape2 + '\\newline ' + etape3, machineDiv, {
				"displayMode": true, "throwOnError": true, "errorColor": "#CC0000", "strict": "ignore", "trust": false
			});
			fobj_machine.add(machineDiv);
			fobj_machine.dmove(0, h / 2 - interligne - machineDiv.offsetHeight / 2);

			//------------ANIMATION-------------------------
			ant.timeline(timeline);
			im.timeline(timeline);

			let runner1 = ant.animate(8000, 0, 'absolute').dmove(w / 2 - w_ant / 2, 0);
			let runner2 = im.animate(8000, 0, 'after').dmove(w - w_im / 2, 0);

			runner1.loop(true, false, 8000);
			runner2.loop(true, false, 8000);


			clearInterval(SVGExist[id_du_div]);//Arrête le timer
		}

	}, 100); // Vérifie toutes les 100ms
}

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

export function tex_cadre_par_orange(texte) {
	'use strict';
	//\\definecolor{orangeCoop}{rgb}{0.9450980392156862,0.34901960784313724,0.1607843137254902}
	let sortie = `
	 
	 \\setlength{\\fboxrule}{1.5mm}
	 \\par\\vspace{0.25cm}
	 \\noindent\\fcolorbox{nombres}{white}{\\parbox{\\linewidth-2\\fboxrule-2\\fboxsep}{`+ texte + `}}
	 \\par\\vspace{0.25cm}		 
	 `;

	return sortie;
}

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
export function SVG_machine_diag_3F12(id_du_div, w, h, nom, x_ant, etapes_expressions) {
	'use strict';
	let interligne = 10;//w/80; //h/10; // unité d'espacement
	if (!window.SVGExist) { window.SVGExist = {} } // Si SVGExist n'existe pas on le créé
	// SVGExist est un dictionnaire dans lequel on stocke les listenner sur la création des div
	window.SVGExist[id_du_div] = setInterval(function () {

		if ($(`#${id_du_div}`).length) {
			$(`#${id_du_div}`).html("");//Vide le div pour éviter les SVG en doublon
			// on crée un rectangle dont la taille est adaptée au texte
			//let path_cadre_rect_ant = 'M0,0L0,-'+interligne+',L'+(w_x_ant + 2*interligne)+',-'+interligne+',L'+(w_x_ant + 2*interligne)+','+interligne+'L0,'+interligne+'Z';
			document.getElementById(id_du_div).innerHTML = `
				<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 `+ w + ` ` + h + `" width="` + w + `">
					<g>
						<path d="M0 `+ 5 * interligne + `L0 ` + 3 * interligne + `L` + 5 * interligne + ` ` + 3 * interligne + `L` + 5 * interligne + ` ` + 7 * interligne + `L0 ` + 7 * interligne + `Z " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
						</path>
						<foreignObject width="`+ interligne + `" height="` + h / 2 + `" x="` + 2.5 * interligne + `" y="` + h / 4 + `">
							<div style="position: fixed">
								<span class="katex-display">
									<span class="katex">
										<span class="katex-html" aria-hidden="true">
											<span class="base">
												<span class="mord mathdefault">`+ x_ant + `</span>
											</span>
										</span>
									</span>
								</span>
							</div>
						</foreignObject>
					</g>
					<g>
						<line x1="`+ 5 * interligne + `" y1="` + 5 * interligne + `" x2="` + 7 * interligne + `" y2="` + 5 * interligne + `" stroke-width="3" stroke="#f15929">
						</line>
						<circle r="`+ 2 * interligne + `" cx="` + 9 * interligne + `" cy="` + 5 * interligne + `" fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
						</circle>
						<path d="M`+ 11 * interligne + ` ` + 5 * interligne + `L` + 13 * interligne + ` ` + 5 * interligne + `L` + (13 * interligne - interligne / 2) + ` ` + (5 * interligne - interligne / 2) + `M` + 13 * interligne + ` ` + 5 * interligne + `L` + (13 * interligne - interligne / 2) + ` ` + (5 * interligne + interligne / 2) + ` " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
						</path>
						<foreignObject width="`+ 4 * interligne + `" height="` + h / 2 + `" x="` + 7.5 * interligne + `" y="` + h / 4 + `">
							<div style="position: fixed">
								<span class="katex-display">
									<span class="katex">
										<span class="katex-html" aria-hidden="true">
											<span class="base">
												<span class="mord mathdefault">×`+ etapes_expressions[0][0] + `</span>
											</span>
										</span>
									</span>
								</span>
							</div>
						</foreignObject>
					</g>
					<g>
						<path d="M`+ 13 * interligne + ` ` + 5 * interligne + `L` + 13 * interligne + ` ` + 3 * interligne + `L` + 21 * interligne + ` ` + 3 * interligne + `L` + 21 * interligne + ` ` + 7 * interligne + `L` + 13 * interligne + ` ` + 7 * interligne + `Z " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
						</path>
						<foreignObject width="`+ 2.5 * interligne + `" height="` + h / 2 + `" x="` + 16 * interligne + `" y="` + h / 4 + `">
							<div style="position: fixed">
								<span class="katex-display">
									<span class="katex">
										<span class="katex-html" aria-hidden="true">
											<span class="base">
												<span class="mord mathdefault">`+ etapes_expressions[0][1] + `</span>
											</span>
										</span>
									</span>
								</span>
							</div>
						</foreignObject>
					</g>
					<g>
						<line x1="`+ 21 * interligne + `" y1="` + 5 * interligne + `" x2="` + 23 * interligne + `" y2="` + 5 * interligne + `" stroke-width="3" stroke="#f15929">
						</line>
						<circle r="`+ 2 * interligne + `" cx="` + 25 * interligne + `" cy="` + 5 * interligne + `" fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
						</circle>
						<path d="M`+ 27 * interligne + ` ` + 5 * interligne + `L` + 29 * interligne + ` ` + 5 * interligne + `L` + (29 * interligne - interligne / 2) + ` ` + (5 * interligne - interligne / 2) + `M` + 29 * interligne + ` ` + 5 * interligne + `L` + (29 * interligne - interligne / 2) + ` ` + (5 * interligne + interligne / 2) + ` " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
						</path>
						<foreignObject width="`+ 4 * interligne + `" height="` + h / 2 + `" x="` + 23.5 * interligne + `" y="` + h / 4 + `">
						<body xmlns="http://www.w3.org/1999/xhtml">
							<div style="position: fixed">
								<span class="katex-display">
									<span class="katex">
										<span class="katex-html" aria-hidden="true">
											<span class="base">
												<span class="mord mathdefault">+`+ etapes_expressions[1][0] + `</span>
											</span>
										</span>
									</span>
								</span>
							</div>
							</body>
						</foreignObject>
					</g>
					<g>
						<path d="M`+ 29 * interligne + ` ` + 5 * interligne + `L` + 29 * interligne + ` ` + 3 * interligne + `L` + 44 * interligne + ` ` + 3 * interligne + `L` + 44 * interligne + ` ` + 7 * interligne + `L` + 29 * interligne + ` ` + 7 * interligne + `Z " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
						</path>
						<foreignObject width="`+ 12 * interligne + `" height="` + h / 2 + `" x="` + 31 * interligne + `" y="` + h / 4 + `">
							<div style="position: fixed">
								<span class="katex-display">
									<span class="katex">
										<span class="katex-html" aria-hidden="true">
											<span class="base">
												<span class="mord mathdefault">`+ nom + `<span class="mopen">(</span>` + x_ant + `<span class="mclose">)</span><span class="mspace" style="margin-right: 0.408889em;"></span>=<span class="mspace" style="margin-right: 0.408889em;"></span>` + etapes_expressions[1][1] + `</span>
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
		}
	}, 100); // Vérifie toutes les 100ms
}

/**
 * affiche une video centrée dans une div
 * ATTENTION BUG SVG DONC LES ANIMATIONS SONT FILMEES A PARTIR DE CELLES GENEREES PAR LA FONCTION SVG_machine_maths() SOUS FIREFOX
 * DE FACON A AVOIR UN RENDU UNIFORME QUEL QUE SOIT LE NAVIGATEUR ON REND LES ANIMATIONS PAR DES VIDEOS
 * ON LAISSE LA PIROUETTE DE DETECTION DU USERAGENT EN COMMENTAIRE EN ATTENDANT DE TROUVER UNE SOLUTION DE RENDU LATEX DANS SVG UNIVERSELLE
 * @param {string} url_video 
 * @author Sébastien Lozano 
 */

export function machine_maths_video(url_video) {
	'use strict';
	let video = `
	<div style="text-align:center"> 
	<video width="560" height="100%" controls  loop autoplay muted style="max-width: 100%">
		<source src="`+ url_video + `">
		Votre navigateur ne gère pas l\'élément <code>video</code>.
	</video>
	</div>`;

	return video;
}

/**
 * détecte si le navigateur et safari ou chrome et renvoie un booléen
 * @author Sébastien Lozano 
 */
export function detect_safari_chrome_browser() {
	'use strict';
	var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
	// var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
	// var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
	var is_safari = navigator.userAgent.indexOf("Safari") > -1;
	var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
	if ((is_chrome) && (is_safari)) { is_safari = false; }
	if ((is_chrome) && (is_opera)) { is_chrome = false; }

	return (is_chrome || is_safari);
}

/**
* Retourne la liste des nombres premiers inférieurs à N N<300 N exclu
* @param {integer} k On cherchera un multiple de k
* @param {integer} n Ce multiple sera supérieur ou égal à n
* @author Rémi Angot
*/
export function premierMultipleSuperieur(k, n) {
	let result = n
	if (Number.isInteger(k) && Number.isInteger(n)) {
		while (result % k != 0) {
			result += 1
		}
		return result
	}
	else {
		if (egal(Math.floor((n / k), n / k))) return n
		else {
			reste = n / k - Math.floor(n / k)
			return n - reste * k + k
		}
	}
}
export function premierMultipleInferieur(k, n) {
	let result = premierMultipleSuperieur(k, n)
	if (result != n) return result - k
	else return n
}

/**
* Retourne la liste des nombres premiers inférieurs à N N<300 N exclu
* @param {number} borneSup
* @author Sébastien Lozano
*/
export function liste_nb_premiers_strict_jusqua(borneSup) {
	'use strict';
	// tableau contenant les 300 premiers nombres premiers
	let liste_300 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293];
	let liste = [];
	let i = 0;
	while (liste_300[i] < borneSup) {
		liste.push(liste_300[i]);
		i++;
	}
	return liste;
}

/**
 * Liste les nombres premiers jusque n avec la méthode du crible d'Eratosthene optimisée
 * @param {number} n 
 * @author Sébastien Lozano
 */
export function crible_eratosthene_n(n) {
	'use strict';
	var tab_entiers = []; // pour tous les entiers de 2 à n
	var test_max = Math.sqrt(n + 1); // inutile de tester au dela de racine de n
	var liste = []; // tableau de la liste des premiers jusqu'à n

	// On rempli un tableau avec des booléeens de 2 à n
	for (let i = 0; i < n + 1; i++) {
		tab_entiers.push(true);
	}

	// On supprime les multiples des nombres premiers à partir de 2, 3, 5,...
	for (let i = 2; i <= test_max; i++) {
		if (tab_entiers[i]) {
			for (var j = i * i; j < n + 1; j += i) {
				tab_entiers[j] = false;
			}
		}
	}

	// On récupère tous les indices du tableau des entiers dont le booléen est à true qui sont donc premiers
	for (let i = 2; i < n + 1; i++) {
		if (tab_entiers[i]) {
			liste.push(i);
		}
	}

	return liste;
}

/**
 * Liste les premiers compris entre min et max au sens large,
 * min est inclu
 * max est inclu.
 * @param {number} min
 * @param {number} max
 * @author Sébastien Lozano
 */

export function premiers_entre_bornes(min, max) {
	'use strict';
	// on crée les premiers jusque min
	let premiers_a_suppr = crible_eratosthene_n(min - 1);
	// on crée les premiers jusque max
	let premiers_jusque_max = crible_eratosthene_n(max);
	// on supprime le début de la liste jusque min
	premiers_jusque_max.splice(0, premiers_a_suppr.length);
	// on renvoie le tableau restant
	return premiers_jusque_max;
}

/**
 * tire à pile ou face pour écrire ou non un texte
 * @param {string} texte 
 * @author Sébastien Lozano
 */

export function texte_ou_pas(texte) {
	'use strict';
	let bool = randint(0, 1);
	if (bool == 0) {
		return `\\ldots`;
	} else {
		return texte;
	}
}

/**
 * Crée un tableau avec un nombre de lignes et de colonnes déterminées par la longueur des tableaux des entetes passés en paramètre
 * Les contenus sont en mode maths par défaut, il faut donc penser à remplir les tableaux en utilisant éventuellement la commande \\text{}
 * tab_C_L(['coin','A','B'],['1','2'],['A1','B1','A2','B2']) affiche le tableau ci-dessous
 * ------------------
 * | coin | A  | B  |
 * ------------------
 * |  1   | A1 | B1 |
 * ------------------
 * |  2   | A2 | B2 |
 * ------------------
* @param {array} tab_entetes_colonnes contient les entetes des colonnes
 * @param {array} tab_entetes_lignes contient les entetes des lignes
 * @param {array} tab_lignes contient les elements de chaque ligne
 * @author Sébastien Lozano
 * 
 */
export function tab_C_L(tab_entetes_colonnes, tab_entetes_lignes, tab_lignes, arraystretch) {
	'use strict';
	let myLatexArraystretch;
	if (typeof arraystretch === 'undefined') {
		myLatexArraystretch = 1
	} else {
		myLatexArraystretch = arraystretch
	}

	// on définit le nombre de colonnes
	let C = tab_entetes_colonnes.length;
	// on définit le nombre de lignes
	let L = tab_entetes_lignes.length;
	// On construit le string pour obtenir le tableau pour compatibilité HTML et LaTeX
	let tableau_C_L = ``;
	if (sortie_html) {
		tableau_C_L += `$\\def\\arraystretch{2.5}\\begin{array}{|`;
	} else {
		tableau_C_L += `$\\renewcommand{\\arraystretch}{${myLatexArraystretch}}\n`;
		tableau_C_L += `\\begin{array}{|`;
	}
	// on construit la 1ere ligne avec toutes les colonnes
	for (let k = 0; k < C; k++) {
		tableau_C_L += `c|`;
	}
	tableau_C_L += `}\n`;

	tableau_C_L += `\\hline\n`
	if (typeof tab_entetes_colonnes[0] == 'number') {
		tableau_C_L += tex_nombre(tab_entetes_colonnes[0]);
	}
	else {
		tableau_C_L += tab_entetes_colonnes[0];
	}
	for (let k = 1; k < C; k++) {
		if (typeof tab_entetes_colonnes[k] == 'number') {
			tableau_C_L += ` & ` + tex_nombre(tab_entetes_colonnes[k]) + ``;
		}
		else {
			tableau_C_L += ` & ` + tab_entetes_colonnes[k] + ``;
		}
	}
	tableau_C_L += `\\\\\n`;
	tableau_C_L += `\\hline\n`;
	// on construit toutes les lignes
	for (let k = 0; k < L; k++) {
		if (typeof tab_entetes_lignes[k] == 'number') {
			tableau_C_L += `` + tex_nombre(tab_entetes_lignes[k]) + ``;
		}
		else {
			tableau_C_L += `` + tab_entetes_lignes[k] + ``;
		}
		for (let m = 1; m < C; m++) {
			if (typeof tab_lignes[(C - 1) * k + m - 1] == 'number') {
				tableau_C_L += ` & ` + tex_nombre(tab_lignes[(C - 1) * k + m - 1]);
			}
			else {
				tableau_C_L += ` & ` + tab_lignes[(C - 1) * k + m - 1];
			}
		}
		tableau_C_L += `\\\\\n`;
		tableau_C_L += `\\hline\n`;
	}
	tableau_C_L += `\\end{array}\n`
	if (sortie_html) {
		tableau_C_L += `$`;
	} else {
		tableau_C_L += `\\renewcommand{\\arraystretch}{1}$\n`;
	}

	return tableau_C_L;
}

/**
 * Renvoie un encart sur fond d'alert semantic ui en HTML ou dans un cadre bclogo en LaTeX avec le texte 
 * @param {string} texte
 * @param {string} couleur
 * @param {string} titre
 * @author Sébastien Lozano 
 */
export function warn_message(texte, couleur, titre) {
	'use strict';
	if (typeof (titre) == 'undefined') {
		titre = ``;
	}
	if (sortie_html) {
		return `
		<br>
		<div class="ui compact warning message">
		<h4><i class="lightbulb outline icon"></i>${titre}</h4>		
		<p>`+ texte + `
		</p>
		</div>
		`;
	} else {
		//return tex_cadre_par_orange(texte);							
		return `
		\\begin{bclogo}[couleurBarre=`+ couleur + `,couleurBord=` + couleur + `,epBord=2,couleur=gray!10,logo=\\bclampe,arrondi=0.1]{\\bf ` + titre + `}
			`+ texte + `
		\\end{bclogo}
		`;
	}

}

/**
 * @returns un encart sur fond d'alert semantic ui en HTML ou dans un cadre bclogo en LaTeX avec le texte + icone info
 * @param {object} 
 * @author Sébastien Lozano
 */

export function info_message({ titre, texte, couleur }) {
	//'use strict';
	if (sortie_html) {
		return `
		<div class="ui compact icon message">
			<i class="info circle icon"></i>
			<div class="content">
		  		<div class="header">
					`+ titre + `
		  		</div>
		  		<p>`+ texte + `</p>
			</div>
	  	</div>
		`;
	} else {
		return `
		\\begin{bclogo}[couleurBarre=`+ couleur + `,couleurBord=` + couleur + `,epBord=2,couleur=gray!10,logo=\\bcinfo,arrondi=0.1]{\\bf ` + titre + `}
			`+ texte + `
		\\end{bclogo}
		`;
	}
}

/**
 * @returns un encart sur fond d'alert semantic ui en HTML ou dans un cadre bclogo en LaTeX avec le texte + icone lampe
 * @param {object} 
 * @author Sébastien Lozano
 */

export function lampe_message({ titre, texte, couleur }) {
	//'use strict';
	if (sortie_html) {
		return `
		<div class="ui compact icon message">
			<i class="lightbulb outline icon"></i>
			<div class="content">
		  		<div class="header">
					`+ titre + `
		  		</div>
		  		<p>`+ texte + `</p>
			</div>
	  	</div>
		`;
	} else {
		return `
		\\begin{bclogo}[couleurBarre=`+ couleur + `,couleurBord=` + couleur + `,epBord=2,couleur=gray!10,logo=\\bclampe,arrondi=0.1]{\\bf ` + titre + `}
			`+ texte + `
		\\end{bclogo}
		`;
	}
	// return info_message({
	// 	titre:titre,
	// 	texte:texte,
	// 	couleur:couleur
	// })
}



/**
 * Renvoie deux engrenages en HTML pour le moment
 * @param {string} id_du_div id unique pour éviter les doublons, généré dans l'exo; à revoir?
 * @param {number} w largeur du conteneur
 * @param {number} h hauteur du conteneur
 * @author Sébastien Lozano
 */
export function SVG_engrenages(id_du_div, w, h) {
	'use strict';
	if (sortie_html) {
		if (!window.SVGExist) { window.SVGExist = {} } // Si SVGExist n'existe pas on le créé
		// SVGExist est un dictionnaire dans lequel on stocke les listenner sur la création des div
		window.SVGExist[id_du_div] = setInterval(function () {

			if ($(`#${id_du_div}`).length) {
				$(`#${id_du_div}`).html("");//Vide le div pour éviter les SVG en doublon
				document.getElementById(id_du_div).innerHTML = `
					<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 `+ w + ` ` + h + `" width="` + w + `">
					<g id="surface1">
					<path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 106.5625 0.125 C 106.289062 0.175781 105.386719 0.289062 104.5625 0.363281 C 103.738281 0.449219 103.023438 0.550781 102.960938 0.613281 C 102.761719 0.8125 102 8.164062 102 9.988281 C 102 10.476562 101.9375 10.914062 101.851562 11.023438 C 101.761719 11.136719 101.238281 11.324219 100.6875 11.4375 C 100.136719 11.5625 99.300781 11.800781 98.8125 11.960938 C 97.664062 12.386719 94.125 14.039062 93.226562 14.585938 C 92.800781 14.835938 92.4375 14.976562 92.351562 14.925781 C 92.261719 14.875 90.375 13.351562 88.148438 11.523438 C 85.9375 9.710938 84.074219 8.25 84.011719 8.273438 C 83.949219 8.300781 83.226562 8.863281 82.414062 9.523438 C 80.75 10.886719 78.3125 13.414062 76.699219 15.425781 C 75.75 16.613281 75.636719 16.8125 75.789062 16.988281 C 75.886719 17.101562 76.425781 17.773438 77.011719 18.5 C 77.585938 19.226562 79.023438 20.976562 80.210938 22.414062 C 81.398438 23.835938 82.375 25.039062 82.375 25.085938 C 82.375 25.125 82.148438 25.523438 81.863281 25.976562 C 81.199219 27.011719 80.113281 29.238281 79.773438 30.1875 C 79.574219 30.789062 78.75 33.425781 78.5625 34.074219 C 78.539062 34.148438 77.351562 34.3125 75.601562 34.488281 C 71.3125 34.886719 68.273438 35.273438 68.0625 35.425781 C 67.613281 35.761719 67.351562 40.875 67.625 43.8125 C 67.800781 45.699219 68.023438 47.113281 68.175781 47.300781 C 68.261719 47.414062 69.050781 47.539062 70.5625 47.675781 C 76.101562 48.164062 78.324219 48.386719 78.449219 48.425781 C 78.523438 48.449219 78.625 48.710938 78.675781 49.011719 C 78.726562 49.300781 78.863281 49.800781 78.988281 50.113281 C 79.113281 50.425781 79.425781 51.335938 79.675781 52.136719 C 80.164062 53.648438 81.175781 55.800781 82.011719 57.050781 C 82.273438 57.449219 82.5 57.824219 82.5 57.886719 C 82.5 57.949219 81.363281 59.363281 79.976562 61.023438 C 77.148438 64.425781 76.6875 64.988281 76.210938 65.636719 L 75.875 66.085938 L 76.636719 67.074219 C 78.5625 69.574219 81.164062 72.175781 83.613281 74.050781 C 84.324219 74.601562 84.4375 74.648438 84.664062 74.5 C 85 74.289062 88.789062 71.164062 90.835938 69.414062 C 91.738281 68.636719 92.585938 68 92.726562 68 C 92.863281 68 93.550781 68.324219 94.261719 68.738281 C 95.851562 69.625 97.960938 70.488281 99.863281 71 C 101.125 71.335938 101.75 71.5625 101.75 71.664062 C 101.75 72.476562 102.824219 81.9375 102.9375 82.113281 C 102.960938 82.175781 103.8125 82.289062 104.8125 82.375 C 106.960938 82.5625 112.511719 82.476562 114.0625 82.226562 L 115.050781 82.0625 L 115.148438 81.625 C 115.199219 81.386719 115.414062 79.210938 115.625 76.8125 C 115.835938 74.398438 116.050781 72.210938 116.101562 71.9375 C 116.210938 71.335938 116.273438 71.300781 118.363281 70.6875 C 120.226562 70.148438 122.625 69.085938 124.113281 68.164062 C 125.023438 67.585938 125.226562 67.5 125.425781 67.625 C 125.550781 67.699219 126.363281 68.375 127.238281 69.125 C 129.101562 70.710938 133.5 74.25 133.625 74.25 C 133.664062 74.25 134.148438 73.925781 134.699219 73.523438 C 136.113281 72.488281 141.414062 66.851562 141.988281 65.761719 C 142.101562 65.5625 141.75 65.074219 139.476562 62.351562 C 138.023438 60.613281 136.511719 58.8125 136.113281 58.363281 C 135.699219 57.898438 135.375 57.4375 135.375 57.324219 C 135.375 57.199219 135.710938 56.449219 136.113281 55.648438 C 137.113281 53.6875 138.074219 51.238281 138.398438 49.851562 C 138.613281 48.960938 138.710938 48.699219 138.925781 48.625 C 139.074219 48.5625 139.886719 48.460938 140.75 48.386719 C 145.675781 47.976562 149.324219 47.574219 149.398438 47.460938 C 149.476562 47.324219 149.523438 47 149.773438 44.6875 C 149.976562 42.699219 150.039062 40.136719 149.886719 39.25 C 149.8125 38.800781 149.699219 37.761719 149.625 36.9375 C 149.550781 36.101562 149.425781 35.375 149.335938 35.300781 C 149.25 35.210938 147.074219 34.960938 144.0625 34.6875 C 140.039062 34.324219 138.898438 34.1875 138.789062 34.039062 C 138.699219 33.925781 138.550781 33.449219 138.4375 32.976562 C 138.011719 31.113281 136.5625 27.601562 135.5 25.851562 C 135.363281 25.625 135.25 25.3125 135.25 25.164062 C 135.25 24.988281 136.460938 23.414062 138.550781 20.863281 C 141.074219 17.789062 141.835938 16.789062 141.75 16.636719 C 141.488281 16.148438 139.851562 14.300781 138.335938 12.773438 C 136.960938 11.375 133.886719 8.664062 133.324219 8.351562 C 133.175781 8.261719 129.636719 11.023438 126.699219 13.539062 C 125.8125 14.289062 125.023438 14.914062 124.949219 14.925781 C 124.875 14.925781 123.601562 14.335938 122.125 13.601562 C 119.664062 12.363281 118.039062 11.75 116.476562 11.4375 C 116.085938 11.363281 116.164062 11.800781 115.6875 6.875 C 115.261719 2.523438 115.011719 0.710938 114.851562 0.613281 C 114.699219 0.511719 114.335938 0.476562 112.0625 0.238281 C 110.375 0.0625 107.175781 -0.0117188 106.5625 0.125 Z M 113.1875 26.425781 C 116.261719 27.335938 119.238281 29.460938 121.261719 32.175781 C 126.011719 38.523438 124.863281 47.886719 118.75 52.914062 C 115.613281 55.488281 112.164062 56.648438 108.210938 56.460938 C 103.449219 56.25 99.5 54.125 96.625 50.25 C 93.289062 45.75 92.710938 39.4375 95.199219 34.460938 C 95.925781 33.011719 96.710938 31.914062 97.976562 30.613281 C 100.335938 28.148438 102.5 26.875 105.375 26.238281 C 106.273438 26.039062 106.863281 26.011719 109.25 26.050781 C 111.875 26.085938 112.136719 26.113281 113.1875 26.425781 Z M 113.1875 26.425781 "/>
					<path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 106.386719 28.5625 C 103.1875 29.261719 100.199219 31.261719 98.460938 33.863281 C 96.726562 36.460938 96.050781 39.050781 96.261719 42.261719 C 96.613281 47.523438 100.648438 52.363281 105.875 53.773438 C 106.800781 54.011719 107.226562 54.050781 109.0625 54.050781 C 111.5 54.039062 112.449219 53.851562 114.210938 53.011719 C 115.613281 52.335938 116.613281 51.636719 117.835938 50.460938 C 119.175781 49.175781 119.988281 48.074219 120.675781 46.613281 C 122.335938 43.074219 122.238281 38.5625 120.4375 35.136719 C 118.738281 31.898438 115.148438 29.25 111.523438 28.550781 C 110.363281 28.324219 107.449219 28.335938 106.386719 28.5625 Z M 110.960938 31.574219 C 112.3125 31.851562 113.386719 32.3125 114.648438 33.148438 C 116.4375 34.351562 117.699219 36 118.335938 37.960938 C 118.585938 38.738281 118.675781 39.289062 118.726562 40.613281 C 118.851562 44.0625 118.074219 46.085938 115.789062 48.25 C 114.023438 49.925781 112.386719 50.726562 110.164062 51.011719 C 107.539062 51.351562 104.898438 50.550781 102.789062 48.761719 C 100.550781 46.886719 99.4375 44.625 99.289062 41.675781 C 99.175781 39.398438 99.6875 37.511719 100.925781 35.636719 C 101.675781 34.511719 102.386719 33.800781 103.511719 33.050781 C 105.738281 31.574219 108.414062 31.050781 110.960938 31.574219 Z M 110.960938 31.574219 "/>
					<path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 58.5 55.886719 C 58.011719 57.148438 57.023438 59.835938 56.300781 61.875 C 55.585938 63.898438 54.925781 65.761719 54.835938 66 L 54.675781 66.4375 L 52.4375 66.511719 C 48.898438 66.636719 45.476562 67.125 43.164062 67.824219 C 42.386719 68.0625 41.699219 68.25 41.648438 68.25 C 41.585938 68.25 41.011719 67.5 40.375 66.585938 C 38.375 63.75 33.585938 57.1875 33.449219 57.101562 C 33.300781 57 32.289062 57.375 30.789062 58.074219 C 30.148438 58.375 29.585938 58.625 29.539062 58.625 C 29.476562 58.625 28.789062 59 28 59.449219 C 27.210938 59.914062 25.976562 60.625 25.25 61.039062 C 22.886719 62.386719 19.875 64.636719 19.875 65.0625 C 19.875 65.226562 20.550781 66.699219 24.085938 74.289062 L 25.523438 77.375 L 24.449219 78.5 C 23.863281 79.125 23.0625 80.011719 22.6875 80.476562 C 22.3125 80.9375 21.6875 81.675781 21.300781 82.125 C 20.476562 83.085938 18.699219 85.738281 18.136719 86.835938 C 17.925781 87.273438 17.699219 87.625 17.648438 87.625 C 17.601562 87.625 15.8125 87.324219 13.6875 86.949219 C 7.726562 85.898438 4.101562 85.351562 4 85.460938 C 3.863281 85.613281 2.726562 88.476562 2.210938 89.949219 C 1.699219 91.425781 0.914062 95.199219 0.386719 98.75 C 0.25 99.613281 0.113281 100.398438 0.0742188 100.5 C 0.0117188 100.664062 0.9375 101.0625 4.835938 102.550781 C 7.511719 103.574219 10.398438 104.6875 11.289062 105.039062 L 12.875 105.648438 L 12.875 107.300781 C 12.886719 110.324219 13.226562 112.851562 14.136719 116.5625 C 14.414062 117.664062 14.625 118.613281 14.625 118.6875 C 14.625 118.75 14.414062 118.960938 14.148438 119.136719 C 11.625 120.875 3.949219 126.449219 3.75 126.6875 C 3.449219 127.039062 5.761719 131.738281 7.925781 135.1875 C 8.851562 136.675781 10.585938 139.175781 11.273438 140.039062 L 11.5625 140.386719 L 13.75 139.375 C 19.039062 136.914062 23.851562 134.75 24.050781 134.75 C 24.175781 134.75 25 135.4375 25.898438 136.289062 C 27.9375 138.210938 29.011719 139.011719 31.8125 140.726562 C 33.398438 141.6875 34.074219 142.175781 34.101562 142.351562 C 34.125 142.488281 33.886719 144.136719 33.574219 146.023438 C 33.261719 147.898438 32.800781 150.863281 32.550781 152.601562 C 32.164062 155.273438 32.113281 155.789062 32.261719 155.886719 C 33.136719 156.449219 37.523438 157.835938 41.0625 158.675781 C 43.199219 159.1875 47.238281 159.9375 47.3125 159.851562 C 47.488281 159.625 50.574219 151.5 51.6875 148.3125 C 51.960938 147.550781 52.238281 146.898438 52.300781 146.851562 C 52.375 146.800781 53.3125 146.75 54.375 146.75 C 57.539062 146.75 59.710938 146.4375 63.085938 145.488281 L 64.925781 144.976562 L 65.25 145.335938 C 65.425781 145.539062 67.261719 148.101562 69.335938 151.023438 L 73.125 156.351562 L 75.25 155.375 C 78.074219 154.074219 79.726562 153.1875 81.675781 151.914062 C 83.386719 150.800781 86 148.851562 86.460938 148.351562 L 86.726562 148.0625 L 85.75 145.875 C 85.226562 144.675781 84.011719 142.023438 83.0625 140 C 82.125 137.976562 81.289062 136.136719 81.210938 135.914062 C 81.085938 135.511719 81.113281 135.488281 82.199219 134.3125 C 84.363281 132 86.238281 129.488281 87.386719 127.351562 C 87.738281 126.710938 88.101562 126.101562 88.199219 126 C 88.398438 125.789062 88.101562 125.75 95.6875 127 C 98.648438 127.5 101.300781 127.925781 101.574219 127.960938 L 102.085938 128.023438 L 102.5 126.988281 C 103.039062 125.574219 104.386719 121.386719 104.851562 119.6875 C 105.164062 118.539062 105.761719 115.386719 106.050781 113.289062 C 106.125 112.773438 106.113281 112.75 105.664062 112.523438 C 105.0625 112.210938 102.585938 111.273438 97.625 109.4375 C 95.460938 108.636719 93.5625 107.898438 93.414062 107.800781 C 93.136719 107.625 93.125 107.550781 93.125 105.648438 C 93.125 102.824219 92.75 100.074219 91.925781 96.835938 C 91.75 96.175781 91.625 95.5 91.648438 95.351562 C 91.675781 95.164062 92.550781 94.460938 94.550781 93.039062 C 96.925781 91.335938 102.273438 87.351562 102.664062 87 C 102.875 86.8125 101.039062 82.886719 99.550781 80.300781 C 98.125 77.8125 95.011719 73.5 94.664062 73.5 C 94.414062 73.5 90.75 75.136719 86.625 77.085938 C 84.523438 78.085938 82.664062 78.9375 82.476562 78.960938 C 82.175781 79.023438 81.9375 78.835938 80.523438 77.476562 C 78.898438 75.886719 76.761719 74.199219 75.1875 73.273438 C 74.363281 72.789062 73.25 72.039062 72.738281 71.625 C 72.476562 71.414062 72.375 72.125 73.875 62.6875 C 74.210938 60.488281 74.539062 58.488281 74.574219 58.226562 L 74.636719 57.773438 L 72.726562 57.023438 C 70.449219 56.136719 67.761719 55.25 67.335938 55.25 C 67.164062 55.25 66.8125 55.164062 66.550781 55.050781 C 66.050781 54.835938 61.3125 53.835938 60.113281 53.6875 L 59.398438 53.601562 Z M 55.664062 86.9375 C 61.8125 87.738281 66.976562 90.976562 69.988281 95.914062 C 71.335938 98.113281 72.460938 100.914062 72.886719 103.0625 C 73 103.636719 73.0625 104.800781 73.0625 106.4375 C 73.050781 108.710938 73.023438 109.074219 72.699219 110.4375 C 71.710938 114.699219 70.175781 117.664062 67.625 120.238281 C 64.648438 123.25 60.539062 125.351562 56.261719 126.0625 C 52.601562 126.675781 47.773438 125.8125 43.988281 123.863281 C 38.3125 120.925781 34.289062 114.898438 33.625 108.3125 C 33.273438 104.863281 34.300781 100.125 36.125 96.8125 C 38.800781 91.949219 44.085938 88.1875 49.726562 87.136719 C 51.976562 86.710938 53.550781 86.664062 55.664062 86.9375 Z M 55.664062 86.9375 "/>
					<path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 51.875 89.835938 C 49.851562 90.050781 47.925781 90.648438 45.875 91.699219 C 41.324219 94.011719 38.789062 97.289062 37.4375 102.5625 C 36.523438 106.125 36.5625 108.800781 37.585938 111.851562 C 38.625 114.949219 41.324219 118.449219 44.136719 120.324219 C 49.289062 123.75 55.664062 124.1875 61.0625 121.460938 C 65.613281 119.1875 68.851562 115.023438 69.898438 110.113281 C 70.125 109.050781 70.175781 108.414062 70.175781 106.5625 C 70.175781 104.523438 70.148438 104.1875 69.835938 102.960938 C 68.6875 98.386719 65.761719 94.335938 62 92.125 C 59.238281 90.488281 54.898438 89.511719 51.875 89.835938 Z M 54.898438 93.9375 C 56.726562 94.136719 59.136719 95.039062 60.761719 96.125 C 63.050781 97.664062 65.113281 100.636719 65.898438 103.511719 C 66.148438 104.425781 66.1875 104.835938 66.175781 106.625 C 66.164062 108.324219 66.113281 108.863281 65.898438 109.675781 C 65.300781 111.863281 63.675781 114.539062 62.164062 115.851562 C 59.539062 118.113281 57.210938 119.101562 54.175781 119.210938 C 52.386719 119.289062 51.351562 119.136719 49.449219 118.539062 C 45.824219 117.398438 43.164062 114.789062 41.636719 110.914062 C 40.761719 108.664062 40.585938 105.726562 41.1875 103.335938 C 41.449219 102.351562 42.3125 100.511719 43.011719 99.488281 C 44.976562 96.574219 48.710938 94.300781 52.261719 93.886719 C 53.164062 93.789062 53.449219 93.789062 54.898438 93.9375 Z M 54.898438 93.9375 "/>
					</g>
					</svg>
					`;
				clearInterval(SVGExist[id_du_div]);//Arrête le timer
			}
		}, 100); // Vérifie toutes les 100ms

	}
}



/**
 * renvoie un tableau avec la decomposition en facteurs premiers sous forme développée
 * @param {number} n 
 * @author Sébastien Lozano
 */
export function decomp_fact_prem_array(n) {
	let decomposition = [];
	let liste = obtenir_liste_facteurs_premiers(n);
	for (let i in liste) {
		decomposition.push(liste[i]);
	}
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
export function Triangles(l1, l2, l3, a1, a2, a3) {
	'use strict';
	var self = this;

	/**
	 * @constant {array} nomsPossibles liste de noms possibles pour un triangle
	 */
	let nomsPossibles = ['AGE', 'AIL', 'AIR', 'ALU', 'AME', 'AMI', 'ANE', 'ARC', 'BAC', 'BAL', 'BAR', 'BEC', 'BEL', 'BIO', 'BIP', 'BIS', 'BLE', 'BOA', 'BOF', 'BOG', 'BOL', 'BUT', 'BYE', 'COQ', 'CRI', 'CRU', 'DUC', 'DUO', 'DUR', 'EAU', 'ECU', 'EGO', 'EPI', 'FER', 'FIL', 'FUN', 'GPS', 'ICE', 'JET', 'KIF', 'KIR', 'MAC', 'NEM', 'PAS', 'PIC', 'PIF', 'PIN', 'POT', 'RAI', 'RAP', 'RAT', 'RIF', 'SEL', 'TAF', 'TIC', 'TAC', 'TOC', 'TOP', 'UNI', 'WOK', 'YAK', 'YEN', 'ZEN', 'ZIG', 'ZAG'];

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
		return '$' + self.nom + '$';
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
		cotes[0] = '$[' + sommets[0] + '' + sommets[1] + ']$';
		cotes[1] = '$[' + sommets[1] + '' + sommets[2] + ']$';
		cotes[2] = '$[' + sommets[2] + '' + sommets[0] + ']$';

		return cotes;
	}

	/**
	 * @return {array} Renvoie un tableau contenant le nom des longueurs des côtés du triangle tiré au hasard
	 * * les strings sont EN MODE MATHS le premier caractère du string est un $
	 * @example si triangle est une instance de la classe Triangle() triangle.getCotes() renvoie le tableau de strings ['$AM$','$MI$','$IA$'] dans cet ordre si AMI est le nom tiré au hasard  
	 */
	function getLongueurs() {
		let longueurs = [];
		let triangle = self.nom;
		let sommets = triangle.split('');
		longueurs[0] = '$' + sommets[0] + '' + sommets[1] + '$';
		longueurs[1] = '$' + sommets[1] + '' + sommets[2] + '$';
		longueurs[2] = '$' + sommets[2] + '' + sommets[0] + '$';

		return longueurs;
	}

	/**
	 * @return {array} Renvoie un tableau avec les valeurs des longueurs des côtés du triangle passées en paramètre à l'instance de la classe
	 */
	function getLongueursValeurs() {
		if ((typeof self.l1 == "undefined") || (typeof self.l2 == "undefined") || (typeof self.l3 == "undefined")) {
			//return false;
			return ['L\'une des longueurs de l\'objet triangle n\'est pas définie'];
		}
		let longueurs = [];
		longueurs[0] = self.l1;
		longueurs[1] = self.l2;
		longueurs[2] = self.l3;

		return longueurs;
	}


	/**
	 * @return {array} Renvoie un tableau de strings avec les noms des angles du triangle.
	 * * les strings sont EN MODE MATHS le premier caractère du string est un $
	 */
	function getAngles() {
		let angles = [];
		let triangle = self.nom;
		let sommets = triangle.split('');
		angles[0] = `$\\;\\widehat{${sommets[0] + sommets[1] + sommets[2]}}$`;
		angles[1] = `$\\;\\widehat{${sommets[1] + sommets[2] + sommets[0]}}$`;
		angles[2] = `$\\;\\widehat{${sommets[2] + sommets[0] + sommets[1]}}$`;

		return angles;
	}

	/**
	 * @return {array} Renvoie un tableau avec les valeurs des angles du triangle passées en paramètre à l'instance de la classe
	 */
	function getAnglesValeurs() {
		if ((typeof self.a1 == "undefined") || (typeof self.a2 == "undefined") || (typeof self.a3 == "undefined")) {
			//return false;
			return ['L\'un des angles de l\'objet triangle n\'est pas définie'];
		}
		let angles = [];
		angles[0] = self.a1;
		angles[1] = self.a2;
		angles[2] = self.a3;

		return angles;
	}

	/**
	 * @return {array} Renvoie un tableau de strings avec les noms des sommets du triangle.
	 * * les strings sont EN MODE MATHS le premier caractère du string est un $
	 */
	function getSommets(math = true) {
		let triangle = self.nom;
		let sommets = triangle.split('');
		if (math == true) {
			sommets[0] = '$' + sommets[0] + '$';
			sommets[1] = '$' + sommets[1] + '$';
			sommets[2] = '$' + sommets[2] + '$';
		}
		return sommets;
	}

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
		}
	}

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
		let longueurs = [self.l1, self.l2, self.l3];
		longueurs.sort(function (a, b) {
			return calcul(a - b);
		});
		if (longueurs[2] < calcul(longueurs[0] + longueurs[1])) {
			return true;
		} else {
			return false;
		}
	}

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
		let longueurs = [self.l1, self.l2, self.l3];
		longueurs.sort(function (a, b) {
			return calcul(a - b);
		});
		if (longueurs[2] == calcul(longueurs[0] + longueurs[1])) {
			return true;
		} else {
			return false;
		}
	}

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
			if ((self.a1 == 0 && self.a2 == 0) || (self.a2 == 0 && self.a3 == 0) || (self.a3 == 0 && self.a1 == 0)) {
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	}

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
		}
		if ((self.a1 + self.a2 + self.a3) == 180) {
			if ((self.a1 == 0 && self.a2 == 0) || (self.a2 == 0 && self.a3 == 0) || (self.a3 == 0 && self.a1 == 0)) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
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
}

/**
 * @class
 * @classdesc Classe Relatif - Méthodes utiles sur les relatifs
 * @param {...any} relatifs est un paramètre du reste
 * @author Sébastien Lozano
 */
export function Relatif(...relatifs) {
	//'use strict'; pas de use strict avec un paramètre du reste
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
			relatifs.forEach(function (element) {
				if (typeof element == 'string') {
					throw new TypeError(`${element} est un string !`);
				}
				if (element == 0) {
					throw new RangeError(`${element} a été exclu des valeurs possibles.`)
				}
			});
			// Quoi faire sans nombres ?
			if (relatifs.length == 0) {
				throw new Error(`C'est mieux avec quelques nombres !`)
			}
			relatifs.forEach(function (element) {
				if (element < 0) {
					signes.push(-1);
				}
				if (element > 0) {
					signes.push(1);
				}
			})
		}
		catch (err) {
			console.log(err.message);
			console.log(err.stack);
		}
		finally {
			return signes;
		}
	}

	/** 
	 * * Récupère le signe de chaque relatif déclaré dans le paramètre du reste relatifs
	 * @return {array} Renvoie un tableau de strings valant 'négatif' ou 'positif'
	 * @example getSigneNumber(-1,-2,8,-9,4) renvoie le tableau de strings [négatif,négatif,positif,négatif,positif]
	*/
	function getSigneString() {
		let signesString = [];
		let signes = getSigneNumber();
		signes.forEach(function (element) {
			if (element == -1) {
				signesString.push('négatif');
			}
			if (element == 1) {
				signesString.push('positif');
			}
		});
		return signesString;
	}

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
			n.forEach(function (element) {
				if (typeof element == 'string') {
					throw new TypeError(`${element} est un string !`);
				}
				if (element == 0) {
					throw new RangeError(`${element} a été exclu des valeurs possibles.`);
				}
			});
			// Quoi faire sans nombres ?
			if (n.length == 0) {
				throw new Error(`C'est mieux avec quelques nombres !`)
			}
			n.forEach(function (element) {
				produit = produit * element;
			});
			if (produit < 0) {
				return -1;
			}
			if (produit > 0) {
				return 1
			}
		}
		catch (err) {
			console.log(err.message);
			console.log(err.stack);
		}
	}

	/**
	 * 	 
	 * @param  {...any} n une liste de deux ou plus de nombres relatifs
	 * @return {string} Renvoie un string désignant le signe du produit des nombres de cette liste. postif1 ou négatif
	 * @example getSigneProduitNumber(1,-4,-7) renvoie le string positif
	 */

	function getSigneProduitString(...n) {
		let produit = getSigneProduitNumber(...n);
		if (produit == -1) {
			return 'négatif';
		}
		if (produit == 1) {
			return 'positif'
		}
	}

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
			n.forEach(function (element) {
				if (typeof element == 'string') {
					throw new TypeError(`${element} est un string !`);
				}
				if (element == 0) {
					throw new RangeError(`${element} a été exclu des valeurs possibles.`);
				}
			});
			// Quoi faire sans nombres ?
			if (n.length == 0) {
				throw new Error(`C'est mieux avec quelques nombres !`)
			}
			n.forEach(function (element) {
				if (element < 0) {
					card = card + 1;
				}
			});
			return card;
		}
		catch (err) {
			console.log(err.message);
		}
	}

	/**
	 * Fonction locale
	 * @param {integer} n un entier désignant le cardinal de facteurs négatifs dans un produit
	 * @return un string au singulier ou au pluriel
	 * @example orth_facteurs_negatifs(0) ou orth_facteurs_negatifs(1) renvoie 'facteur negatif'
	 * @example orth_facteurs_negatifs(7) renvoie 'facteurs negatifs'
	 */
	function orth_facteurs_négatifs(n) {
		if (n >= 2) {
			return `facteurs négatifs`;
		} else {
			return `facteur négatif`;
		}
	}

	/** 	 
	 * @param  {...any} n une liste de deux ou plus de nombres relatifs qui constituent les facteurs du produit
	 * @return {string} Renvoie la règle qui permet de justifier le signe d'un produit de relatifs adaptée à la liste passée en paramètre.	 
	 * @example setRegleProduitFacteurs([1,-2,-8,5]) renvoie le string 'Il y a 2 facteurs négatifs, le nombre de facteurs négatifs est pair donc le produit est positif.'
	 */

	function setRegleSigneProduit(...n) {
		try {
			// port du string interdit !			
			n.forEach(function (element) {
				if (typeof element == 'string') {
					throw new TypeError(`${element} est un string !`);
				}
			});
			// Quoi faire sans nombres ?
			if (n.length == 0) {
				throw new Error(`C'est mieux avec quelques nombres !`)
			}
			if (n.length == 2) {
				if (getCardNegatifs(n) % 2 == 0) {
					return `Les deux facteurs ont le même signe donc le produit est positif.`;
				} else {
					return `Les deux facteurs ont un signe différent donc le produit est négatif.`;
				}
			} else if (n.length > 2) {
				if (getCardNegatifs(n) % 2 == 0) {
					if (getCardNegatifs(n) == 0) {
						return `Tous les facteurs sont positifs donc le produit est positif.`;
					} else {
						return `Il y a ${getCardNegatifs(n)} ${orth_facteurs_négatifs(getCardNegatifs(n))}, le nombre de facteurs négatifs est pair donc le produit est positif.`;
					}
				} else {
					return `Il y a ${getCardNegatifs(n)} ${orth_facteurs_négatifs(getCardNegatifs(n))}, le nombre de facteurs négatifs est impair donc le produit est négatif.`;
				}
			}
		}
		catch (err) {
			console.log(err.message);
		}
	}

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
			n.forEach(function (element) {
				if (typeof element == 'string') {
					throw new TypeError(`${element} est un string !`);
				}
			});
			// Quoi faire sans nombres ?
			if (n.length == 0) {
				throw new Error(`C'est mieux avec quelques nombres !`)
			}
			if (n.length == 2) {
				if (getCardNegatifs(n) % 2 == 0) {
					return `Le numérateur et le dénominateur ont le même signe donc le quotient est positif.`;
				} else {
					return `Les numérateur et le dénominateur ont un signe différent donc le quotient est négatif.`;
				}
			} else if (n.length > 2) {
				if (getCardNegatifs(n) % 2 == 0) {
					if (getCardNegatifs(n) == 0) {
						return `Tous les facteurs du numérateur et tous les facteurs du dénominateur sont positifs donc le quotient est positif.`;
					} else {
						//return `La somme du nombre de facteurs négatifs du numérateur et du nombre de facteurs négatifs du dénominateur vaut ${getCardNegatifs(n)}, ce nombre est pair donc le quotient est positif.`;
						return `Quand on compte les facteurs négatifs du numérateur et du dénominateur, on trouve ${getCardNegatifs(n)}, ce nombre est pair donc le quotient est positif.`;
					}
				} else {
					//return `La somme du nombre de facteurs négatifs du numérateur et du nombre de facteurs négatifs du dénominateur vaut ${getCardNegatifs(n)}, ce nombre est impair donc le quotient est négatif.`;
					return `Quand on compte les facteurs négatifs du numérateur et du dénominateur, on trouve ${getCardNegatifs(n)}, ce nombre est impair donc le quotient est négatif.`;
				}
			}
		}
		catch (err) {
			console.log(err.message);
		}
	}

	this.getSigneNumber = getSigneNumber;
	this.getSigneString = getSigneString;
	this.getSigneProduitNumber = getSigneProduitNumber;
	this.getSigneProduitString = getSigneProduitString;
	this.getCardNegatifs = getCardNegatifs;
	this.setRegleSigneProduit = setRegleSigneProduit;
	this.setRegleSigneQuotient = setRegleSigneQuotient;

}

export function nombreEnLettres(nb, type = 1) {
	let partie_entiere, partie_decimale, nbstring, nb_dec, decstring
	if (estentier(nb)) return partieEntiereEnLettres(nb)
	else {
		partie_entiere = Math.floor(nb)
		partie_decimale = calcul(nb - partie_entiere)
		nb_dec = partie_decimale.toString().replace(/\d*\./, '').length;
		partie_decimale = calcul(partie_decimale * 10 ** nb_dec)

		switch (nb_dec) {
			case 1:
				if (partie_decimale > 1) decstring = ` dixièmes`
				else decstring = ` dixième`
				break
			case 2:
				if (partie_decimale > 1) decstring = ` centièmes`
				else decstring = ` centième`
				break
			case 3:
				if (partie_decimale > 1) decstring = ` millièmes`
				else decstring = ` millième`
				break

		}

		if (type == 1) nbstring = partieEntiereEnLettres(partie_entiere) + ` unités et ` + partieEntiereEnLettres(partie_decimale) + decstring
		else nbstring = partieEntiereEnLettres(partie_entiere) + ` virgule ` + partieEntiereEnLettres(partie_decimale)
	}
	return nbstring
}
/**
 * 
 * 
 * @param {int} nb 

 * 
 */
export function partieEntiereEnLettres(nb) {
	let dictionnaire = {
		0: "zéro",
		"000": "",
		1: "un",
		2: "deux",
		3: "trois",
		4: "quatre",
		5: "cinq",
		6: "six",
		7: "sept",
		8: "huit",
		9: "neuf",
		10: "dix",
		11: "onze",
		12: "douze",
		13: "treize",
		14: "quatorze",
		15: "quinze",
		16: "seize",
		17: "dix-sept",
		18: "dix-huit",
		19: "dix-neuf",
		20: "vingt",
		21: "vingt et un",
		22: "vingt-deux",
		23: "vingt-trois",
		24: "vingt-quatre",
		25: "vingt-cinq",
		26: "vingt-six",
		27: "vingt-sept",
		28: "vingt-huit",
		29: "vingt-neuf",
		30: "trente",
		31: "trente et un",
		32: "trente-deux",
		33: "trente-trois",
		34: "trente-quatre",
		35: "trente-cinq",
		36: "trente-six",
		37: "trente-sept",
		38: "trente-huit",
		39: "trente-neuf",
		40: "quarante",
		41: "quarante et un",
		42: "quarante-deux",
		43: "quarante-trois",
		44: "quarante-quatre",
		45: "quarante-cinq",
		46: "quarante-six",
		47: "quarante-sept",
		48: "quarante-huit",
		49: "quarante-neuf",
		50: "cinquante",
		51: "cinquante et un",
		52: "cinquante-deux",
		53: "cinquante-trois",
		54: "cinquante-quatre",
		55: "cinquante-cinq",
		56: "cinquante-six",
		57: "cinquante-sept",
		58: "cinquante-huit",
		59: "cinquante-neuf",
		60: "soixante",
		61: "soixante et un",
		62: "soixante-deux",
		63: "soixante-trois",
		64: "soixante-quatre",
		65: "soixante-cinq",
		66: "soixante-six",
		67: "soixante-sept",
		68: "soixante-huit",
		69: "soixante-neuf",
		70: "soixante-dix",
		71: "soixante et onze",
		72: "soixante-douze",
		73: "soixante-treize",
		74: "soixante-quatorze",
		75: "soixante-quinze",
		76: "soixante-seize",
		77: "soixante-dix-sept",
		78: "soixante-dix-huit",
		79: "soixante-dix-neuf",
		80: "quatre-vingts",
		81: "quatre-vingt-un",
		82: "quatre-vingt-deux",
		83: "quatre-vingt-trois",
		84: "quatre-vingt-quatre",
		85: "quatre-vingt-cinq",
		86: "quatre-vingt-six",
		87: "quatre-vingt-sept",
		88: "quatre-vingt-huit",
		89: "quatre-vingt-neuf",
		90: "quatre-vingt-dix",
		91: "quatre-vingt-onze",
		92: "quatre-vingt-douze",
		93: "quatre-vingt-treize",
		94: "quatre-vingt-quatorze",
		95: "quatre-vingt-quinze",
		96: "quatre-vingt-seize",
		97: "quatre-vingt-dix-sept",
		98: "quatre-vingt-dix-huit",
		99: "quatre-vingt-dix-neuf",
		100: "cent",
		101: "cent un",
		102: "cent deux",
		103: "cent trois",
		104: "cent quatre",
		105: "cent cinq",
		106: "cent six",
		107: "cent sept",
		108: "cent huit",
		109: "cent neuf",
		110: "cent dix",
		111: "cent onze",
		112: "cent douze",
		113: "cent treize",
		114: "cent quatorze",
		115: "cent quinze",
		116: "cent seize",
		117: "cent dix-sept",
		118: "cent dix-huit",
		119: "cent dix-neuf",
		120: "cent vingt",
		121: "cent vingt et un",
		122: "cent vingt-deux",
		123: "cent vingt-trois",
		124: "cent vingt-quatre",
		125: "cent vingt-cinq",
		126: "cent vingt-six",
		127: "cent vingt-sept",
		128: "cent vingt-huit",
		129: "cent vingt-neuf",
		130: "cent trente",
		131: "cent trente et un",
		132: "cent trente-deux",
		133: "cent trente-trois",
		134: "cent trente-quatre",
		135: "cent trente-cinq",
		136: "cent trente-six",
		137: "cent trente-sept",
		138: "cent trente-huit",
		139: "cent trente-neuf",
		140: "cent quarante",
		141: "cent quarante et un",
		142: "cent quarante-deux",
		143: "cent quarante-trois",
		144: "cent quarante-quatre",
		145: "cent quarante-cinq",
		146: "cent quarante-six",
		147: "cent quarante-sept",
		148: "cent quarante-huit",
		149: "cent quarante-neuf",
		150: "cent cinquante",
		151: "cent cinquante et un",
		152: "cent cinquante-deux",
		153: "cent cinquante-trois",
		154: "cent cinquante-quatre",
		155: "cent cinquante-cinq",
		156: "cent cinquante-six",
		157: "cent cinquante-sept",
		158: "cent cinquante-huit",
		159: "cent cinquante-neuf",
		160: "cent soixante",
		161: "cent soixante et un",
		162: "cent soixante-deux",
		163: "cent soixante-trois",
		164: "cent soixante-quatre",
		165: "cent soixante-cinq",
		166: "cent soixante-six",
		167: "cent soixante-sept",
		168: "cent soixante-huit",
		169: "cent soixante-neuf",
		170: "cent soixante-dix",
		171: "cent soixante et onze",
		172: "cent soixante-douze",
		173: "cent soixante-treize",
		174: "cent soixante-quatorze",
		175: "cent soixante-quinze",
		176: "cent soixante-seize",
		177: "cent soixante-dix-sept",
		178: "cent soixante-dix-huit",
		179: "cent soixante-dix-neuf",
		180: "cent quatre-vingts",
		181: "cent quatre-vingt-un",
		182: "cent quatre-vingt-deux",
		183: "cent quatre-vingt-trois",
		184: "cent quatre-vingt-quatre",
		185: "cent quatre-vingt-cinq",
		186: "cent quatre-vingt-six",
		187: "cent quatre-vingt-sept",
		188: "cent quatre-vingt-huit",
		189: "cent quatre-vingt-neuf",
		190: "cent quatre-vingt-dix",
		191: "cent quatre-vingt-onze",
		192: "cent quatre-vingt-douze",
		193: "cent quatre-vingt-treize",
		194: "cent quatre-vingt-quatorze",
		195: "cent quatre-vingt-quinze",
		196: "cent quatre-vingt-seize",
		197: "cent quatre-vingt-dix-sept",
		198: "cent quatre-vingt-dix-huit",
		199: "cent quatre-vingt-dix-neuf",
		200: "deux cents",
		201: "deux cent un",
		202: "deux cent deux",
		203: "deux cent trois",
		204: "deux cent quatre",
		205: "deux cent cinq",
		206: "deux cent six",
		207: "deux cent sept",
		208: "deux cent huit",
		209: "deux cent neuf",
		210: "deux cent dix",
		211: "deux cent onze",
		212: "deux cent douze",
		213: "deux cent treize",
		214: "deux cent quatorze",
		215: "deux cent quinze",
		216: "deux cent seize",
		217: "deux cent dix-sept",
		218: "deux cent dix-huit",
		219: "deux cent dix-neuf",
		220: "deux cent vingt",
		221: "deux cent vingt et un",
		222: "deux cent vingt-deux",
		223: "deux cent vingt-trois",
		224: "deux cent vingt-quatre",
		225: "deux cent vingt-cinq",
		226: "deux cent vingt-six",
		227: "deux cent vingt-sept",
		228: "deux cent vingt-huit",
		229: "deux cent vingt-neuf",
		230: "deux cent trente",
		231: "deux cent trente et un",
		232: "deux cent trente-deux",
		233: "deux cent trente-trois",
		234: "deux cent trente-quatre",
		235: "deux cent trente-cinq",
		236: "deux cent trente-six",
		237: "deux cent trente-sept",
		238: "deux cent trente-huit",
		239: "deux cent trente-neuf",
		240: "deux cent quarante",
		241: "deux cent quarante et un",
		242: "deux cent quarante-deux",
		243: "deux cent quarante-trois",
		244: "deux cent quarante-quatre",
		245: "deux cent quarante-cinq",
		246: "deux cent quarante-six",
		247: "deux cent quarante-sept",
		248: "deux cent quarante-huit",
		249: "deux cent quarante-neuf",
		250: "deux cent cinquante",
		251: "deux cent cinquante et un",
		252: "deux cent cinquante-deux",
		253: "deux cent cinquante-trois",
		254: "deux cent cinquante-quatre",
		255: "deux cent cinquante-cinq",
		256: "deux cent cinquante-six",
		257: "deux cent cinquante-sept",
		258: "deux cent cinquante-huit",
		259: "deux cent cinquante-neuf",
		260: "deux cent soixante",
		261: "deux cent soixante et un",
		262: "deux cent soixante-deux",
		263: "deux cent soixante-trois",
		264: "deux cent soixante-quatre",
		265: "deux cent soixante-cinq",
		266: "deux cent soixante-six",
		267: "deux cent soixante-sept",
		268: "deux cent soixante-huit",
		269: "deux cent soixante-neuf",
		270: "deux cent soixante-dix",
		271: "deux cent soixante et onze",
		272: "deux cent soixante-douze",
		273: "deux cent soixante-treize",
		274: "deux cent soixante-quatorze",
		275: "deux cent soixante-quinze",
		276: "deux cent soixante-seize",
		277: "deux cent soixante-dix-sept",
		278: "deux cent soixante-dix-huit",
		279: "deux cent soixante-dix-neuf",
		280: "deux cent quatre-vingts",
		281: "deux cent quatre-vingt-un",
		282: "deux cent quatre-vingt-deux",
		283: "deux cent quatre-vingt-trois",
		284: "deux cent quatre-vingt-quatre",
		285: "deux cent quatre-vingt-cinq",
		286: "deux cent quatre-vingt-six",
		287: "deux cent quatre-vingt-sept",
		288: "deux cent quatre-vingt-huit",
		289: "deux cent quatre-vingt-neuf",
		290: "deux cent quatre-vingt-dix",
		291: "deux cent quatre-vingt-onze",
		292: "deux cent quatre-vingt-douze",
		293: "deux cent quatre-vingt-treize",
		294: "deux cent quatre-vingt-quatorze",
		295: "deux cent quatre-vingt-quinze",
		296: "deux cent quatre-vingt-seize",
		297: "deux cent quatre-vingt-dix-sept",
		298: "deux cent quatre-vingt-dix-huit",
		299: "deux cent quatre-vingt-dix-neuf",
		300: "trois cents",
		301: "trois cent un",
		302: "trois cent deux",
		303: "trois cent trois",
		304: "trois cent quatre",
		305: "trois cent cinq",
		306: "trois cent six",
		307: "trois cent sept",
		308: "trois cent huit",
		309: "trois cent neuf",
		310: "trois cent dix",
		311: "trois cent onze",
		312: "trois cent douze",
		313: "trois cent treize",
		314: "trois cent quatorze",
		315: "trois cent quinze",
		316: "trois cent seize",
		317: "trois cent dix-sept",
		318: "trois cent dix-huit",
		319: "trois cent dix-neuf",
		320: "trois cent vingt",
		321: "trois cent vingt et un",
		322: "trois cent vingt-deux",
		323: "trois cent vingt-trois",
		324: "trois cent vingt-quatre",
		325: "trois cent vingt-cinq",
		326: "trois cent vingt-six",
		327: "trois cent vingt-sept",
		328: "trois cent vingt-huit",
		329: "trois cent vingt-neuf",
		330: "trois cent trente",
		331: "trois cent trente et un",
		332: "trois cent trente-deux",
		333: "trois cent trente-trois",
		334: "trois cent trente-quatre",
		335: "trois cent trente-cinq",
		336: "trois cent trente-six",
		337: "trois cent trente-sept",
		338: "trois cent trente-huit",
		339: "trois cent trente-neuf",
		340: "trois cent quarante",
		341: "trois cent quarante et un",
		342: "trois cent quarante-deux",
		343: "trois cent quarante-trois",
		344: "trois cent quarante-quatre",
		345: "trois cent quarante-cinq",
		346: "trois cent quarante-six",
		347: "trois cent quarante-sept",
		348: "trois cent quarante-huit",
		349: "trois cent quarante-neuf",
		350: "trois cent cinquante",
		351: "trois cent cinquante et un",
		352: "trois cent cinquante-deux",
		353: "trois cent cinquante-trois",
		354: "trois cent cinquante-quatre",
		355: "trois cent cinquante-cinq",
		356: "trois cent cinquante-six",
		357: "trois cent cinquante-sept",
		358: "trois cent cinquante-huit",
		359: "trois cent cinquante-neuf",
		360: "trois cent soixante",
		361: "trois cent soixante et un",
		362: "trois cent soixante-deux",
		363: "trois cent soixante-trois",
		364: "trois cent soixante-quatre",
		365: "trois cent soixante-cinq",
		366: "trois cent soixante-six",
		367: "trois cent soixante-sept",
		368: "trois cent soixante-huit",
		369: "trois cent soixante-neuf",
		370: "trois cent soixante-dix",
		371: "trois cent soixante et onze",
		372: "trois cent soixante-douze",
		373: "trois cent soixante-treize",
		374: "trois cent soixante-quatorze",
		375: "trois cent soixante-quinze",
		376: "trois cent soixante-seize",
		377: "trois cent soixante-dix-sept",
		378: "trois cent soixante-dix-huit",
		379: "trois cent soixante-dix-neuf",
		380: "trois cent quatre-vingts",
		381: "trois cent quatre-vingt-un",
		382: "trois cent quatre-vingt-deux",
		383: "trois cent quatre-vingt-trois",
		384: "trois cent quatre-vingt-quatre",
		385: "trois cent quatre-vingt-cinq",
		386: "trois cent quatre-vingt-six",
		387: "trois cent quatre-vingt-sept",
		388: "trois cent quatre-vingt-huit",
		389: "trois cent quatre-vingt-neuf",
		390: "trois cent quatre-vingt-dix",
		391: "trois cent quatre-vingt-onze",
		392: "trois cent quatre-vingt-douze",
		393: "trois cent quatre-vingt-treize",
		394: "trois cent quatre-vingt-quatorze",
		395: "trois cent quatre-vingt-quinze",
		396: "trois cent quatre-vingt-seize",
		397: "trois cent quatre-vingt-dix-sept",
		398: "trois cent quatre-vingt-dix-huit",
		399: "trois cent quatre-vingt-dix-neuf",
		400: "quatre cents",
		401: "quatre cent un",
		402: "quatre cent deux",
		403: "quatre cent trois",
		404: "quatre cent quatre",
		405: "quatre cent cinq",
		406: "quatre cent six",
		407: "quatre cent sept",
		408: "quatre cent huit",
		409: "quatre cent neuf",
		410: "quatre cent dix",
		411: "quatre cent onze",
		412: "quatre cent douze",
		413: "quatre cent treize",
		414: "quatre cent quatorze",
		415: "quatre cent quinze",
		416: "quatre cent seize",
		417: "quatre cent dix-sept",
		418: "quatre cent dix-huit",
		419: "quatre cent dix-neuf",
		420: "quatre cent vingt",
		421: "quatre cent vingt et un",
		422: "quatre cent vingt-deux",
		423: "quatre cent vingt-trois",
		424: "quatre cent vingt-quatre",
		425: "quatre cent vingt-cinq",
		426: "quatre cent vingt-six",
		427: "quatre cent vingt-sept",
		428: "quatre cent vingt-huit",
		429: "quatre cent vingt-neuf",
		430: "quatre cent trente",
		431: "quatre cent trente et un",
		432: "quatre cent trente-deux",
		433: "quatre cent trente-trois",
		434: "quatre cent trente-quatre",
		435: "quatre cent trente-cinq",
		436: "quatre cent trente-six",
		437: "quatre cent trente-sept",
		438: "quatre cent trente-huit",
		439: "quatre cent trente-neuf",
		440: "quatre cent quarante",
		441: "quatre cent quarante et un",
		442: "quatre cent quarante-deux",
		443: "quatre cent quarante-trois",
		444: "quatre cent quarante-quatre",
		445: "quatre cent quarante-cinq",
		446: "quatre cent quarante-six",
		447: "quatre cent quarante-sept",
		448: "quatre cent quarante-huit",
		449: "quatre cent quarante-neuf",
		450: "quatre cent cinquante",
		451: "quatre cent cinquante et un",
		452: "quatre cent cinquante-deux",
		453: "quatre cent cinquante-trois",
		454: "quatre cent cinquante-quatre",
		455: "quatre cent cinquante-cinq",
		456: "quatre cent cinquante-six",
		457: "quatre cent cinquante-sept",
		458: "quatre cent cinquante-huit",
		459: "quatre cent cinquante-neuf",
		460: "quatre cent soixante",
		461: "quatre cent soixante et un",
		462: "quatre cent soixante-deux",
		463: "quatre cent soixante-trois",
		464: "quatre cent soixante-quatre",
		465: "quatre cent soixante-cinq",
		466: "quatre cent soixante-six",
		467: "quatre cent soixante-sept",
		468: "quatre cent soixante-huit",
		469: "quatre cent soixante-neuf",
		470: "quatre cent soixante-dix",
		471: "quatre cent soixante et onze",
		472: "quatre cent soixante-douze",
		473: "quatre cent soixante-treize",
		474: "quatre cent soixante-quatorze",
		475: "quatre cent soixante-quinze",
		476: "quatre cent soixante-seize",
		477: "quatre cent soixante-dix-sept",
		478: "quatre cent soixante-dix-huit",
		479: "quatre cent soixante-dix-neuf",
		480: "quatre cent quatre-vingts",
		481: "quatre cent quatre-vingt-un",
		482: "quatre cent quatre-vingt-deux",
		483: "quatre cent quatre-vingt-trois",
		484: "quatre cent quatre-vingt-quatre",
		485: "quatre cent quatre-vingt-cinq",
		486: "quatre cent quatre-vingt-six",
		487: "quatre cent quatre-vingt-sept",
		488: "quatre cent quatre-vingt-huit",
		489: "quatre cent quatre-vingt-neuf",
		490: "quatre cent quatre-vingt-dix",
		491: "quatre cent quatre-vingt-onze",
		492: "quatre cent quatre-vingt-douze",
		493: "quatre cent quatre-vingt-treize",
		494: "quatre cent quatre-vingt-quatorze",
		495: "quatre cent quatre-vingt-quinze",
		496: "quatre cent quatre-vingt-seize",
		497: "quatre cent quatre-vingt-dix-sept",
		498: "quatre cent quatre-vingt-dix-huit",
		499: "quatre cent quatre-vingt-dix-neuf",
		500: "cinq cents",
		501: "cinq cent un",
		502: "cinq cent deux",
		503: "cinq cent trois",
		504: "cinq cent quatre",
		505: "cinq cent cinq",
		506: "cinq cent six",
		507: "cinq cent sept",
		508: "cinq cent huit",
		509: "cinq cent neuf",
		510: "cinq cent dix",
		511: "cinq cent onze",
		512: "cinq cent douze",
		513: "cinq cent treize",
		514: "cinq cent quatorze",
		515: "cinq cent quinze",
		516: "cinq cent seize",
		517: "cinq cent dix-sept",
		518: "cinq cent dix-huit",
		519: "cinq cent dix-neuf",
		520: "cinq cent vingt",
		521: "cinq cent vingt et un",
		522: "cinq cent vingt-deux",
		523: "cinq cent vingt-trois",
		524: "cinq cent vingt-quatre",
		525: "cinq cent vingt-cinq",
		526: "cinq cent vingt-six",
		527: "cinq cent vingt-sept",
		528: "cinq cent vingt-huit",
		529: "cinq cent vingt-neuf",
		530: "cinq cent trente",
		531: "cinq cent trente et un",
		532: "cinq cent trente-deux",
		533: "cinq cent trente-trois",
		534: "cinq cent trente-quatre",
		535: "cinq cent trente-cinq",
		536: "cinq cent trente-six",
		537: "cinq cent trente-sept",
		538: "cinq cent trente-huit",
		539: "cinq cent trente-neuf",
		540: "cinq cent quarante",
		541: "cinq cent quarante et un",
		542: "cinq cent quarante-deux",
		543: "cinq cent quarante-trois",
		544: "cinq cent quarante-quatre",
		545: "cinq cent quarante-cinq",
		546: "cinq cent quarante-six",
		547: "cinq cent quarante-sept",
		548: "cinq cent quarante-huit",
		549: "cinq cent quarante-neuf",
		550: "cinq cent cinquante",
		551: "cinq cent cinquante et un",
		552: "cinq cent cinquante-deux",
		553: "cinq cent cinquante-trois",
		554: "cinq cent cinquante-quatre",
		555: "cinq cent cinquante-cinq",
		556: "cinq cent cinquante-six",
		557: "cinq cent cinquante-sept",
		558: "cinq cent cinquante-huit",
		559: "cinq cent cinquante-neuf",
		560: "cinq cent soixante",
		561: "cinq cent soixante et un",
		562: "cinq cent soixante-deux",
		563: "cinq cent soixante-trois",
		564: "cinq cent soixante-quatre",
		565: "cinq cent soixante-cinq",
		566: "cinq cent soixante-six",
		567: "cinq cent soixante-sept",
		568: "cinq cent soixante-huit",
		569: "cinq cent soixante-neuf",
		570: "cinq cent soixante-dix",
		571: "cinq cent soixante et onze",
		572: "cinq cent soixante-douze",
		573: "cinq cent soixante-treize",
		574: "cinq cent soixante-quatorze",
		575: "cinq cent soixante-quinze",
		576: "cinq cent soixante-seize",
		577: "cinq cent soixante-dix-sept",
		578: "cinq cent soixante-dix-huit",
		579: "cinq cent soixante-dix-neuf",
		580: "cinq cent quatre-vingts",
		581: "cinq cent quatre-vingt-un",
		582: "cinq cent quatre-vingt-deux",
		583: "cinq cent quatre-vingt-trois",
		584: "cinq cent quatre-vingt-quatre",
		585: "cinq cent quatre-vingt-cinq",
		586: "cinq cent quatre-vingt-six",
		587: "cinq cent quatre-vingt-sept",
		588: "cinq cent quatre-vingt-huit",
		589: "cinq cent quatre-vingt-neuf",
		590: "cinq cent quatre-vingt-dix",
		591: "cinq cent quatre-vingt-onze",
		592: "cinq cent quatre-vingt-douze",
		593: "cinq cent quatre-vingt-treize",
		594: "cinq cent quatre-vingt-quatorze",
		595: "cinq cent quatre-vingt-quinze",
		596: "cinq cent quatre-vingt-seize",
		597: "cinq cent quatre-vingt-dix-sept",
		598: "cinq cent quatre-vingt-dix-huit",
		599: "cinq cent quatre-vingt-dix-neuf",
		600: "six cents",
		601: "six cent un",
		602: "six cent deux",
		603: "six cent trois",
		604: "six cent quatre",
		605: "six cent cinq",
		606: "six cent six",
		607: "six cent sept",
		608: "six cent huit",
		609: "six cent neuf",
		610: "six cent dix",
		611: "six cent onze",
		612: "six cent douze",
		613: "six cent treize",
		614: "six cent quatorze",
		615: "six cent quinze",
		616: "six cent seize",
		617: "six cent dix-sept",
		618: "six cent dix-huit",
		619: "six cent dix-neuf",
		620: "six cent vingt",
		621: "six cent vingt et un",
		622: "six cent vingt-deux",
		623: "six cent vingt-trois",
		624: "six cent vingt-quatre",
		625: "six cent vingt-cinq",
		626: "six cent vingt-six",
		627: "six cent vingt-sept",
		628: "six cent vingt-huit",
		629: "six cent vingt-neuf",
		630: "six cent trente",
		631: "six cent trente et un",
		632: "six cent trente-deux",
		633: "six cent trente-trois",
		634: "six cent trente-quatre",
		635: "six cent trente-cinq",
		636: "six cent trente-six",
		637: "six cent trente-sept",
		638: "six cent trente-huit",
		639: "six cent trente-neuf",
		640: "six cent quarante",
		641: "six cent quarante et un",
		642: "six cent quarante-deux",
		643: "six cent quarante-trois",
		644: "six cent quarante-quatre",
		645: "six cent quarante-cinq",
		646: "six cent quarante-six",
		647: "six cent quarante-sept",
		648: "six cent quarante-huit",
		649: "six cent quarante-neuf",
		650: "six cent cinquante",
		651: "six cent cinquante et un",
		652: "six cent cinquante-deux",
		653: "six cent cinquante-trois",
		654: "six cent cinquante-quatre",
		655: "six cent cinquante-cinq",
		656: "six cent cinquante-six",
		657: "six cent cinquante-sept",
		658: "six cent cinquante-huit",
		659: "six cent cinquante-neuf",
		660: "six cent soixante",
		661: "six cent soixante et un",
		662: "six cent soixante-deux",
		663: "six cent soixante-trois",
		664: "six cent soixante-quatre",
		665: "six cent soixante-cinq",
		666: "six cent soixante-six",
		667: "six cent soixante-sept",
		668: "six cent soixante-huit",
		669: "six cent soixante-neuf",
		670: "six cent soixante-dix",
		671: "six cent soixante et onze",
		672: "six cent soixante-douze",
		673: "six cent soixante-treize",
		674: "six cent soixante-quatorze",
		675: "six cent soixante-quinze",
		676: "six cent soixante-seize",
		677: "six cent soixante-dix-sept",
		678: "six cent soixante-dix-huit",
		679: "six cent soixante-dix-neuf",
		680: "six cent quatre-vingts",
		681: "six cent quatre-vingt-un",
		682: "six cent quatre-vingt-deux",
		683: "six cent quatre-vingt-trois",
		684: "six cent quatre-vingt-quatre",
		685: "six cent quatre-vingt-cinq",
		686: "six cent quatre-vingt-six",
		687: "six cent quatre-vingt-sept",
		688: "six cent quatre-vingt-huit",
		689: "six cent quatre-vingt-neuf",
		690: "six cent quatre-vingt-dix",
		691: "six cent quatre-vingt-onze",
		692: "six cent quatre-vingt-douze",
		693: "six cent quatre-vingt-treize",
		694: "six cent quatre-vingt-quatorze",
		695: "six cent quatre-vingt-quinze",
		696: "six cent quatre-vingt-seize",
		697: "six cent quatre-vingt-dix-sept",
		698: "six cent quatre-vingt-dix-huit",
		699: "six cent quatre-vingt-dix-neuf",
		700: "sept cents",
		701: "sept cent un",
		702: "sept cent deux",
		703: "sept cent trois",
		704: "sept cent quatre",
		705: "sept cent cinq",
		706: "sept cent six",
		707: "sept cent sept",
		708: "sept cent huit",
		709: "sept cent neuf",
		710: "sept cent dix",
		711: "sept cent onze",
		712: "sept cent douze",
		713: "sept cent treize",
		714: "sept cent quatorze",
		715: "sept cent quinze",
		716: "sept cent seize",
		717: "sept cent dix-sept",
		718: "sept cent dix-huit",
		719: "sept cent dix-neuf",
		720: "sept cent vingt",
		721: "sept cent vingt et un",
		722: "sept cent vingt-deux",
		723: "sept cent vingt-trois",
		724: "sept cent vingt-quatre",
		725: "sept cent vingt-cinq",
		726: "sept cent vingt-six",
		727: "sept cent vingt-sept",
		728: "sept cent vingt-huit",
		729: "sept cent vingt-neuf",
		730: "sept cent trente",
		731: "sept cent trente et un",
		732: "sept cent trente-deux",
		733: "sept cent trente-trois",
		734: "sept cent trente-quatre",
		735: "sept cent trente-cinq",
		736: "sept cent trente-six",
		737: "sept cent trente-sept",
		738: "sept cent trente-huit",
		739: "sept cent trente-neuf",
		740: "sept cent quarante",
		741: "sept cent quarante et un",
		742: "sept cent quarante-deux",
		743: "sept cent quarante-trois",
		744: "sept cent quarante-quatre",
		745: "sept cent quarante-cinq",
		746: "sept cent quarante-six",
		747: "sept cent quarante-sept",
		748: "sept cent quarante-huit",
		749: "sept cent quarante-neuf",
		750: "sept cent cinquante",
		751: "sept cent cinquante et un",
		752: "sept cent cinquante-deux",
		753: "sept cent cinquante-trois",
		754: "sept cent cinquante-quatre",
		755: "sept cent cinquante-cinq",
		756: "sept cent cinquante-six",
		757: "sept cent cinquante-sept",
		758: "sept cent cinquante-huit",
		759: "sept cent cinquante-neuf",
		760: "sept cent soixante",
		761: "sept cent soixante et un",
		762: "sept cent soixante-deux",
		763: "sept cent soixante-trois",
		764: "sept cent soixante-quatre",
		765: "sept cent soixante-cinq",
		766: "sept cent soixante-six",
		767: "sept cent soixante-sept",
		768: "sept cent soixante-huit",
		769: "sept cent soixante-neuf",
		770: "sept cent soixante-dix",
		771: "sept cent soixante et onze",
		772: "sept cent soixante-douze",
		773: "sept cent soixante-treize",
		774: "sept cent soixante-quatorze",
		775: "sept cent soixante-quinze",
		776: "sept cent soixante-seize",
		777: "sept cent soixante-dix-sept",
		778: "sept cent soixante-dix-huit",
		779: "sept cent soixante-dix-neuf",
		780: "sept cent quatre-vingts",
		781: "sept cent quatre-vingt-un",
		782: "sept cent quatre-vingt-deux",
		783: "sept cent quatre-vingt-trois",
		784: "sept cent quatre-vingt-quatre",
		785: "sept cent quatre-vingt-cinq",
		786: "sept cent quatre-vingt-six",
		787: "sept cent quatre-vingt-sept",
		788: "sept cent quatre-vingt-huit",
		789: "sept cent quatre-vingt-neuf",
		790: "sept cent quatre-vingt-dix",
		791: "sept cent quatre-vingt-onze",
		792: "sept cent quatre-vingt-douze",
		793: "sept cent quatre-vingt-treize",
		794: "sept cent quatre-vingt-quatorze",
		795: "sept cent quatre-vingt-quinze",
		796: "sept cent quatre-vingt-seize",
		797: "sept cent quatre-vingt-dix-sept",
		798: "sept cent quatre-vingt-dix-huit",
		799: "sept cent quatre-vingt-dix-neuf",
		800: "huit cents",
		801: "huit cent un",
		802: "huit cent deux",
		803: "huit cent trois",
		804: "huit cent quatre",
		805: "huit cent cinq",
		806: "huit cent six",
		807: "huit cent sept",
		808: "huit cent huit",
		809: "huit cent neuf",
		810: "huit cent dix",
		811: "huit cent onze",
		812: "huit cent douze",
		813: "huit cent treize",
		814: "huit cent quatorze",
		815: "huit cent quinze",
		816: "huit cent seize",
		817: "huit cent dix-sept",
		818: "huit cent dix-huit",
		819: "huit cent dix-neuf",
		820: "huit cent vingt",
		821: "huit cent vingt et un",
		822: "huit cent vingt-deux",
		823: "huit cent vingt-trois",
		824: "huit cent vingt-quatre",
		825: "huit cent vingt-cinq",
		826: "huit cent vingt-six",
		827: "huit cent vingt-sept",
		828: "huit cent vingt-huit",
		829: "huit cent vingt-neuf",
		830: "huit cent trente",
		831: "huit cent trente et un",
		832: "huit cent trente-deux",
		833: "huit cent trente-trois",
		834: "huit cent trente-quatre",
		835: "huit cent trente-cinq",
		836: "huit cent trente-six",
		837: "huit cent trente-sept",
		838: "huit cent trente-huit",
		839: "huit cent trente-neuf",
		840: "huit cent quarante",
		841: "huit cent quarante et un",
		842: "huit cent quarante-deux",
		843: "huit cent quarante-trois",
		844: "huit cent quarante-quatre",
		845: "huit cent quarante-cinq",
		846: "huit cent quarante-six",
		847: "huit cent quarante-sept",
		848: "huit cent quarante-huit",
		849: "huit cent quarante-neuf",
		850: "huit cent cinquante",
		851: "huit cent cinquante et un",
		852: "huit cent cinquante-deux",
		853: "huit cent cinquante-trois",
		854: "huit cent cinquante-quatre",
		855: "huit cent cinquante-cinq",
		856: "huit cent cinquante-six",
		857: "huit cent cinquante-sept",
		858: "huit cent cinquante-huit",
		859: "huit cent cinquante-neuf",
		860: "huit cent soixante",
		861: "huit cent soixante et un",
		862: "huit cent soixante-deux",
		863: "huit cent soixante-trois",
		864: "huit cent soixante-quatre",
		865: "huit cent soixante-cinq",
		866: "huit cent soixante-six",
		867: "huit cent soixante-sept",
		868: "huit cent soixante-huit",
		869: "huit cent soixante-neuf",
		870: "huit cent soixante-dix",
		871: "huit cent soixante et onze",
		872: "huit cent soixante-douze",
		873: "huit cent soixante-treize",
		874: "huit cent soixante-quatorze",
		875: "huit cent soixante-quinze",
		876: "huit cent soixante-seize",
		877: "huit cent soixante-dix-sept",
		878: "huit cent soixante-dix-huit",
		879: "huit cent soixante-dix-neuf",
		880: "huit cent quatre-vingts",
		881: "huit cent quatre-vingt-un",
		882: "huit cent quatre-vingt-deux",
		883: "huit cent quatre-vingt-trois",
		884: "huit cent quatre-vingt-quatre",
		885: "huit cent quatre-vingt-cinq",
		886: "huit cent quatre-vingt-six",
		887: "huit cent quatre-vingt-sept",
		888: "huit cent quatre-vingt-huit",
		889: "huit cent quatre-vingt-neuf",
		890: "huit cent quatre-vingt-dix",
		891: "huit cent quatre-vingt-onze",
		892: "huit cent quatre-vingt-douze",
		893: "huit cent quatre-vingt-treize",
		894: "huit cent quatre-vingt-quatorze",
		895: "huit cent quatre-vingt-quinze",
		896: "huit cent quatre-vingt-seize",
		897: "huit cent quatre-vingt-dix-sept",
		898: "huit cent quatre-vingt-dix-huit",
		899: "huit cent quatre-vingt-dix-neuf",
		900: "neuf cents",
		901: "neuf cent un",
		902: "neuf cent deux",
		903: "neuf cent trois",
		904: "neuf cent quatre",
		905: "neuf cent cinq",
		906: "neuf cent six",
		907: "neuf cent sept",
		908: "neuf cent huit",
		909: "neuf cent neuf",
		910: "neuf cent dix",
		911: "neuf cent onze",
		912: "neuf cent douze",
		913: "neuf cent treize",
		914: "neuf cent quatorze",
		915: "neuf cent quinze",
		916: "neuf cent seize",
		917: "neuf cent dix-sept",
		918: "neuf cent dix-huit",
		919: "neuf cent dix-neuf",
		920: "neuf cent vingt",
		921: "neuf cent vingt et un",
		922: "neuf cent vingt-deux",
		923: "neuf cent vingt-trois",
		924: "neuf cent vingt-quatre",
		925: "neuf cent vingt-cinq",
		926: "neuf cent vingt-six",
		927: "neuf cent vingt-sept",
		928: "neuf cent vingt-huit",
		929: "neuf cent vingt-neuf",
		930: "neuf cent trente",
		931: "neuf cent trente et un",
		932: "neuf cent trente-deux",
		933: "neuf cent trente-trois",
		934: "neuf cent trente-quatre",
		935: "neuf cent trente-cinq",
		936: "neuf cent trente-six",
		937: "neuf cent trente-sept",
		938: "neuf cent trente-huit",
		939: "neuf cent trente-neuf",
		940: "neuf cent quarante",
		941: "neuf cent quarante et un",
		942: "neuf cent quarante-deux",
		943: "neuf cent quarante-trois",
		944: "neuf cent quarante-quatre",
		945: "neuf cent quarante-cinq",
		946: "neuf cent quarante-six",
		947: "neuf cent quarante-sept",
		948: "neuf cent quarante-huit",
		949: "neuf cent quarante-neuf",
		950: "neuf cent cinquante",
		951: "neuf cent cinquante et un",
		952: "neuf cent cinquante-deux",
		953: "neuf cent cinquante-trois",
		954: "neuf cent cinquante-quatre",
		955: "neuf cent cinquante-cinq",
		956: "neuf cent cinquante-six",
		957: "neuf cent cinquante-sept",
		958: "neuf cent cinquante-huit",
		959: "neuf cent cinquante-neuf",
		960: "neuf cent soixante",
		961: "neuf cent soixante et un",
		962: "neuf cent soixante-deux",
		963: "neuf cent soixante-trois",
		964: "neuf cent soixante-quatre",
		965: "neuf cent soixante-cinq",
		966: "neuf cent soixante-six",
		967: "neuf cent soixante-sept",
		968: "neuf cent soixante-huit",
		969: "neuf cent soixante-neuf",
		970: "neuf cent soixante-dix",
		971: "neuf cent soixante et onze",
		972: "neuf cent soixante-douze",
		973: "neuf cent soixante-treize",
		974: "neuf cent soixante-quatorze",
		975: "neuf cent soixante-quinze",
		976: "neuf cent soixante-seize",
		977: "neuf cent soixante-dix-sept",
		978: "neuf cent soixante-dix-huit",
		979: "neuf cent soixante-dix-neuf",
		980: "neuf cent quatre-vingts",
		981: "neuf cent quatre-vingt-un",
		982: "neuf cent quatre-vingt-deux",
		983: "neuf cent quatre-vingt-trois",
		984: "neuf cent quatre-vingt-quatre",
		985: "neuf cent quatre-vingt-cinq",
		986: "neuf cent quatre-vingt-six",
		987: "neuf cent quatre-vingt-sept",
		988: "neuf cent quatre-vingt-huit",
		989: "neuf cent quatre-vingt-neuf",
		990: "neuf cent quatre-vingt-dix",
		991: "neuf cent quatre-vingt-onze",
		992: "neuf cent quatre-vingt-douze",
		993: "neuf cent quatre-vingt-treize",
		994: "neuf cent quatre-vingt-quatorze",
		995: "neuf cent quatre-vingt-quinze",
		996: "neuf cent quatre-vingt-seize",
		997: "neuf cent quatre-vingt-dix-sept",
		998: "neuf cent quatre-vingt-dix-huit",
		999: "neuf cent quatre-vingt-dix-neuf"
	}

	let nbString = nb.toString();
	let classeDesMilliards = '';
	if (nbString.substring(nbString.length - 12, nbString.length - 9).length > 0) {
		classeDesMilliards = dictionnaire[nbString.substring(nbString.length - 12, nbString.length - 9).replace(/^0{1,2}/, '')].replaceAll(' ', '-')
	}
	let classeDesMillions = '';
	if (nbString.substring(nbString.length - 9, nbString.length - 6).length > 0) {
		classeDesMillions = dictionnaire[nbString.substring(nbString.length - 9, nbString.length - 6).replace(/^0{1,2}/, '')].replaceAll(' ', '-')
	}
	let classeDesMilliers = '';
	if (nbString.substring(nbString.length - 6, nbString.length - 3) == "080" || nbString.substring(nbString.length - 6, nbString.length - 3) == "80") {
		classeDesMilliers = "quatre-vingt"
	} else if (nbString.substring(nbString.length - 5, nbString.length - 3) == "00" && nbString.substring(nbString.length - 6, nbString.length - 5) != "1") {
		classeDesMilliers = dictionnaire[nbString.substring(nbString.length - 6, nbString.length - 3).replace(/^0{1,2}/, '')].replaceAll(' ', '-').replace('cents', 'cent')
	}
	else if (nbString.substring(nbString.length - 6, nbString.length - 3).length > 0) {
		classeDesMilliers = dictionnaire[nbString.substring(nbString.length - 6, nbString.length - 3).replace(/^0{1,2}/, '')].replaceAll(' ', '-')
	}
	let classeDesUnites = '';
	if (nbString.substring(nbString.length - 3, nbString.length).length > 0) {
		classeDesUnites = dictionnaire[nbString.substring(nbString.length - 3, nbString.length).replace(/^0{1,2}/, '')].replaceAll(' ', '-')
	}
	let result = ''
	if (classeDesMilliards.length > 1) {
		classeDesMilliards == 'un' ? result += classeDesMilliards + '-milliard' : result += classeDesMilliards + '-milliards'
		if (classeDesMillions != "zéro" || classeDesMilliers != "zéro" || classeDesUnites != "zéro") {
			result += '-'
		}
	}
	if (classeDesMillions.length > 1 && classeDesMillions != "zéro") {
		classeDesMillions == 'un' ? result += classeDesMillions + '-million' : result += classeDesMillions + '-millions'
		if (classeDesMilliers != "zéro" || classeDesUnites != "zéro") {
			result += '-'
		}
	}
	if (classeDesMilliers.length > 1 && classeDesMilliers != "zéro") {
		classeDesMilliers == 'un' ? result += 'mille' : result += classeDesMilliers + '-mille'
		if (classeDesUnites != "zéro") {
			result += '-'
		}
	}
	if (classeDesUnites.length > 1 && classeDesUnites != "zéro") {
		result += classeDesUnites
	}
	return result
}



/**
 * @Auteur Jean-Claude Lhote
 * @param {number} min Valeur minimum pour la solution
 * @param {number} max Valeur maximum pour la solution
 * Cette fonction produit aléatoirement un tirage de 5 nombres, une solution, un tableau contenant les calculs successifs, une chaine contenant l'expression mathador correspondante
 * @returns {array} [tirage=[a,b,c,d,e],solution (compris entre min et max),operations_successives=[string1,string2,string3,string4,string5],expression]
 * les string1 à 5 ainsi que l'expresion sont ) mettre en mode maths.
 * sert dans les exercices CM019,
 */
export function Trouver_solution_mathador(
	min,
	max,
	A = 1,
	B = 4,
	C = 8,
	D = 3,
	E = 5
) {
	let eureka,
		a,
		b,
		c,
		d,
		e,
		tirage,
		nombres_restants,
		operations_restantes,
		expression_en_cours_f,
		expression_en_cours_d,
		op,
		part1_f,
		part2_f,
		part1_d,
		part2_d,
		operations_successives = [],
		solution;
	let liste_choix = [
		1,
		2,
		2,
		3,
		3,
		4,
		4,
		4,
		4,
		5,
		6,
		6,
		6,
		6,
		7,
		7,
		8,
		8,
		8,
		8,
		9,
		9,
		9,
		9,
		10,
		11,
		12,
		13,
		14,
		15,
		16,
		17,
		18,
		19,
		20,
	];
	eureka = false;
	let nb_determines = arguments.length - 2;
	while (eureka == false) {
		tirage = [];

		if (nb_determines < 1) a = parseInt(choice(liste_choix));
		else a = A;
		if (nb_determines < 2)
			b = parseInt(choice(liste_choix, [13, 14, 15, 16, 17, 18, 19, 20, a]));
		else b = B;
		if (nb_determines < 3)
			c = parseInt(
				choice(liste_choix, [12, 13, 14, 15, 16, 17, 18, 19, 20, a, b])
			);
		else c = C;
		if (nb_determines < 4)
			d = parseInt(
				choice(liste_choix, [12, 13, 14, 15, 16, 17, 18, 19, 20, b, c])
			);
		else d = D;
		if (nb_determines < 5)
			e = parseInt(choice(liste_choix, [12, 13, 14, 15, 16, 17, 18, 19, 20]));
		else e = E;
		tirage.push(a, b, c, d, e);
		nombres_restants = shuffle(tirage);
		operations_restantes = ["\\times", "+", "-", "\\div"];
		operations_restantes = shuffle(operations_restantes);
		expression_en_cours_f = [
			`${nombres_restants[0]}`,
			`${nombres_restants[1]}`,
			`${nombres_restants[2]}`,
			`${nombres_restants[3]}`,
			`${nombres_restants[4]}`,
		];
		expression_en_cours_d = [
			`${nombres_restants[0]}`,
			`${nombres_restants[1]}`,
			`${nombres_restants[2]}`,
			`${nombres_restants[3]}`,
			`${nombres_restants[4]}`,
		];

		while (nombres_restants.length > 1) {
			b = nombres_restants.pop();
			a = nombres_restants.pop();
			part2_f = expression_en_cours_f.pop();
			part1_f = expression_en_cours_f.pop();
			part2_d = expression_en_cours_d.pop();
			part1_d = expression_en_cours_d.pop();

			op = operations_restantes.pop();
			if (op == "\\times") {
				c = a * b;
				expression_en_cours_f.push(`${part1_f}${op}${part2_f}`);
				expression_en_cours_d.push(`${part1_d}${op}${part2_d}`);
				nombres_restants.push(c);
			} else if (op == "\\div") {
				if (a % b == 0) {
					c = a / b;
					if (part1_f[0] == "\\") {
						part1_f = part1_f.substring(6, part1_f.length);
						part1_f = part1_f.substring(0, part1_f.length - 7);
					}
					if (part2_f[0] == "\\") {
						part2_f = part2_f.substring(6, part2_f.length);
						part2_f = part2_f.substring(0, part2_f.length - 7);
					}
					expression_en_cours_f.push(`\\dfrac{${part1_f}}{${part2_f}}`);
					expression_en_cours_d.push(`${part1_d}${op}${part2_d}`);
					nombres_restants.push(c);
				} else break;
			} else if (op == "-") {
				if (a > b) {
					c = a - b;
					expression_en_cours_f.push(
						`\\left(${part1_f}${op}${part2_f}\\right)`
					);
					expression_en_cours_d.push(
						`\\left(${part1_d}${op}${part2_d}\\right)`
					);
					nombres_restants.push(c);
				} else break;
			} else if (op == "+") {
				c = a + b;
				if (part2_f.substring(0, 2) == "\\l") {
					part2_f = part2_f.substring(6, part2_f.length);
					part2_f = part2_f.substring(0, part2_f.length - 7);
				}
				expression_en_cours_f.push(`\\left(${part1_f}${op}${part2_f}\\right)`);
				if (part2_d.substring(0, 2) == "\\l") {
					part2_d = part2_d.substring(6, part2_d.length);
					part2_d = part2_d.substring(0, part2_d.length - 7);
				}
				expression_en_cours_d.push(`\\left(${part1_d}${op}${part2_d}\\right)`);
				nombres_restants.push(c);
			}
			operations_successives.push(`${a}` + op + `${b}=${c}`);
		}

		if (nombres_restants.length == 1 && operations_restantes.length == 0) {
			solution = nombres_restants[0];
			if (solution >= min && solution <= max) {
				eureka = true;
				if (
					expression_en_cours_f[0][0] == "\\" &&
					expression_en_cours_f[0][1] == `l`
				) {
					expression_en_cours_f[0] = expression_en_cours_f[0].substring(
						6,
						expression_en_cours_f[0].length
					);
					expression_en_cours_f[0] = expression_en_cours_f[0].substring(
						0,
						expression_en_cours_f[0].length - 7
					);
				}
				if (
					expression_en_cours_d[0][0] == "\\" &&
					expression_en_cours_d[0][1] == `l`
				) {
					expression_en_cours_d[0] = expression_en_cours_d[0].substring(
						6,
						expression_en_cours_d[0].length
					);
					expression_en_cours_d[0] = expression_en_cours_d[0].substring(
						0,
						expression_en_cours_d[0].length - 7
					);
				}
				return [
					tirage,
					solution,
					operations_successives,
					expression_en_cours_f,
					expression_en_cours_d,
				];
			} else operations_successives = [];
		} else operations_successives = [];
	}
}

// Gestion du fichier à télécharger
export function telechargeFichier(text, filename) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();

	document.body.removeChild(element);
}

// Gestion des styles LaTeX

/**
* Renvoie un texte avec le préambule d'un fichier LaTeX
* @param {string} Le titre de l'entête 
* @author Rémi Angot
*/
export function intro_LaTeX(entete = "Exercices", liste_packages="") {
	if (entete == '') { entete = 'Exercices' }
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
%\\usepackage[autolanguage]{numprint}
\\usepackage[autolanguage,np]{numprint}
\\usepackage{hyperref}
\\usepackage{amsmath,amsfonts,amssymb,mathrsfs} 
\\usepackage{cancel}
\\usepackage{textcomp}
\\usepackage{gensymb}
\\usepackage{eurosym}
%\\DeclareUnicodeCharacter{20AC}{\\euro{}} %Incompatible avec XeLaTeX
\\usepackage{fancyhdr,lastpage}          	
\\pagestyle{fancy}                      	
\\usepackage{fancybox}					
\\usepackage{setspace}	
\\usepackage{colortbl}
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
export function intro_LaTeX_coop(liste_packages) {

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
%\\usepackage[autolanguage]{numprint}
\\usepackage[autolanguage,np]{numprint}			
\\usepackage{amsmath,amsfonts,amssymb,mathrsfs} 
\\usepackage{cancel}
\\usepackage{textcomp}
\\usepackage{gensymb}
\\usepackage{eurosym}
%\\DeclareUnicodeCharacter{20AC}{\\euro{}} %Incompatible avec XeLaTeX
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

${preambule_personnalise(liste_packages)}

%%%%%%%%%%%%%%%%%%%%%%%%
%%% Fin du préambule %%%
%%%%%%%%%%%%%%%%%%%%%%%%
		

`
	return intro_LaTeX_coop

}






export function preambule_personnalise(liste_packages) {
	let result = ''
	for (let packages of liste_packages) {
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
			case 'bclogo':
				result += '\\usepackage[tikz]{bclogo}'
				break
			case 'tkz-euclide':
				result += '\\usepackage{tkz-euclide}'
				break
			case 'dnb':
			// 	result += `
			// \\usepackage{fourier}
			// \\usepackage[scaled=0.875]{helvet}
			// \\renewcommand{\\ttdefault}{lmtt}
			// \\usepackage[normalem]{ulem}
			// \\usepackage{diagbox}
			// \\usepackage{fancybox}
			// \\usepackage{booktabs}
			// \\usepackage{pifont}
			// \\usepackage{multirow}
			// \\usepackage{dcolumn}
			// \\usepackage{lscape}
			// \\usepackage{graphics,graphicx}
			// \\usepackage{pstricks,pst-plot,pst-tree,pstricks-add}
			// \\usepackage{scratch}
			// \\renewcommand{\\theenumi}{\\textbf{\\arabic{enumi}}}
			// \\renewcommand{\\labelenumi}{\\textbf{\\theenumi.}}
			// \\renewcommand{\\theenumii}{\\textbf{\\alph{enumii}}}
			// \\renewcommand{\\labelenumii}{\\textbf{\\theenumii.}}
			// \\newcommand{\\vect}[1]{\\overrightarrow{\\,\\mathstrut#1\\,}}
			// \\def\\Oij{$\\left(\\text{O}~;~\\vect{\\imath},~\\vect{\\jmath}\\right)$}
			// \\def\\Oijk{$\\left(\\text{O}~;~\\vect{\\imath},~\\vect{\\jmath},~\\vect{k}\\right)$}
			// \\def\\Ouv{$\\left(\\text{O}~;~\\vect{u},~\\vect{v}\\right)$}
			// `
				result += `
				%%%%% FONTS %%%%%
				%\\usepackage{fourier}
				\\usepackage{fourier-otf} % car compilation avec xetex
				\\usepackage[scaled=0.875]{helvet}
				\\renewcommand{\\ttdefault}{lmtt}
				\\usepackage{pifont} % symboles
				
				%%%%% MISE EN PAGE %%%%%
				\\usepackage{makeidx}
				\\usepackage{lscape} % format paysage
				
				%%%%% MISE EN FORME %%%%%
				\\usepackage[normalem]{ulem} % souligner
				\\usepackage{booktabs} % tableaux de qualité
				%\\usepackage[dvips]{hyperref} % hyperlien pour le passage par la compilation dvips
				
				%%%%% MATHS %%%%%
				\\usepackage{diagbox} % des diagonales dans une cellule de tableau
				\\usepackage{multirow} % fusionner plusieurs lignes de tableau
				\\usepackage{dcolumn} % aligner des décimaux dans un tableau
				%\\usepackage{marvosym}   %c'est pour le symbole euro : code \\EUR{}
				%\\usepackage[np]{numprint} % affichage formaté des nombres
				
				%%%%%%% SCRATCH %%%%%%%
				% Par défaut pour les anciens sujets c'est le package scratch qui est chargé
				% Les packages scratch et scratch3 sont incompatibles
				% Il convient donc de commenter l'un d'eux selon les besoins
				%
				% à noter que le package scratch3 requiert simplekv et tikz qui sont automatiquement chargés en cas de besoin
				\\usepackage{scratch}
				%\\usepackage{scratch3} 
				
				%%%%% FIGURES %%%%%
				\\usepackage{graphics} % à distinguer du package graphicx
				\\usepackage{framed} % decoration background
				
				%%%%%%% PSTRICKS %%%%%%%
				\\usepackage{pstricks,pst-plot,pst-tree,pstricks-add}
				\\usepackage{pst-eucl}  % permet de faire des dessins de géométrie simplement
				\\usepackage{pst-text}
				\\usepackage{pst-node,pst-all}
				
				%%%%%%% TIKZ %%%%%%%
				\\usepackage{tkz-tab,tkz-fct}
				\\usepackage{tkz-euclide}
				\\usepackage[tikz]{bclogo}
				\\usetikzlibrary{shadows,decorations.markings}
				\\usetikzlibrary{decorations.pathreplacing}
				%\\usepackage{tikz} % arbre en proba
				%\\usetikzlibrary{trees} % arbre en proba
				\\usepackage{forest} % arbre en proba
				
				%%%%%%% TRACÉS FONNCTIONS %%%%%%%
				\\usepackage{pgfplots}
				\\pgfplotsset{compat=1.17}
				
				%%%%% PROGRAMMATION %%%%%
				\\usepackage{xkeyval,ifthen}
				
				
				%%%%% COMMANDES SPRECIFIQUES %%%%%
				\\newcommand{\\textding}[1]{\\text{\\ding{#1}}}
				%\\newcommand{\\euro}{\\eurologo{}}
				\\renewcommand{\\pstEllipse}[5][]{% arc d'ellipse pour le sujet de Polynésie septembre 2013
				\\psset{#1}
				\\parametricplot{#4}{#5}{#2\\space t cos mul #3\\space t sin mul}
				}
				
				%%%%%%% NOTATIONS DES ENSEMBLES %%%%%%%
				\\newcommand{\\R}{\\mathbb{R}}
				\\newcommand{\\N}{\\mathbb{N}}
				\\newcommand{\\D}{\\mathbb{D}}
				\\newcommand{\\Z}{\\mathbb{Z}}
				\\newcommand{\\Q}{\\mathbb{Q}}
				%\\newcommand{\\C}{\\mathbb{C}}
				
				%%%%% TRACÉS DANS UN REPÈRE %%%%%
				\\newcommand{\\vect}[1]{\\overrightarrow{\\,\\mathstrut#1\\,}}
				\\def\\Oij{$\\left(\\text{O}~;~\\vect{\\imath},~\\vect{\\jmath}\\right)$}
				\\def\\Oijk{$\\left(\\text{O}~;~\\vect{\\imath},~\\vect{\\jmath},~\\vect{k}\\right)$}
				\\def\\Ouv{$\\left(\\text{O}~;~\\vect{u},~\\vect{v}\\right)$}
				
				%%%%% PROBABILITÉS %%%%%
				% Structure servant à avoir l'événement et la probabilité.
				\\def\\getEvene#1/#2\\endget{$#1$}
				\\def\\getProba#1/#2\\endget{$#2$}
				
				%%%%% NOMBRES PREMIERS %%%%%
				\\input{xlop} % JM pour les opérations
				%%% Table des nombres premiers  %%%%
				\\newcount\\primeindex
				\\newcount\\tryindex
				\\newif\\ifprime
				\\newif\\ifagain
				\\newcommand\\getprime[1]{%
				\\opcopy{2}{P0}%
				\\opcopy{3}{P1}%
				\\opcopy{5}{try}
				\\primeindex=2
				\\loop
				\\ifnum\\primeindex<#1\\relax
				\\testprimality
				\\ifprime
				\\opcopy{try}{P\\the\\primeindex}%
				\\advance\\primeindex by1
				\\fi
				\\opadd*{try}{2}{try}%
				\\ifnum\\primeindex<#1\\relax
				\\testprimality
				\\ifprime
				\\opcopy{try}{P\\the\\primeindex}%
				\\advance\\primeindex by1
				\\fi
				\\opadd*{try}{4}{try}%
				\\fi
				\\repeat
				}
				\\newcommand\\testprimality{%
				\\begingroup
				\\againtrue
				\\global\\primetrue
				\\tryindex=0
				\\loop
				\\opidiv*{try}{P\\the\\tryindex}{q}{r}%
				\\opcmp{r}{0}%
				\\ifopeq \\global\\primefalse \\againfalse \\fi
				\\opcmp{q}{P\\the\\tryindex}%
				\\ifoplt \\againfalse \\fi
				\\advance\\tryindex by1
				\\ifagain
				\\repeat
				\\endgroup
				}
				
				%%% Décomposition en nombres premiers %%%
				\\newcommand\\primedecomp[2][nil]{%
				\\begingroup
				\\opset{#1}%
				\\opcopy{#2}{NbtoDecompose}%
				\\opabs{NbtoDecompose}{NbtoDecompose}%
				\\opinteger{NbtoDecompose}{NbtoDecompose}%
				\\opcmp{NbtoDecompose}{0}%
				\\ifopeq
				Je refuse de décomposer zéro.
				\\else
				\\setbox1=\\hbox{\\opdisplay{operandstyle.1}%
				{NbtoDecompose}}%
				{\\setbox2=\\box2{}}%
				\\count255=1
				\\primeindex=0
				\\loop
				\\opcmp{NbtoDecompose}{1}\\ifopneq
				\\opidiv*{NbtoDecompose}{P\\the\\primeindex}{q}{r}%
				\\opcmp{0}{r}\\ifopeq
				\\ifvoid2
				\\setbox2=\\hbox{%
				\\opdisplay{intermediarystyle.\\the\\count255}%
				{P\\the\\primeindex}}%
				\\else
				\\setbox2=\\vtop{%
				\\hbox{\\box2}
				\\hbox{%
				\\opdisplay{intermediarystyle.\\the\\count255}%
				{P\\the\\primeindex}}}
				\\fi
				\\opcopy{q}{NbtoDecompose}%
				\\advance\\count255 by1
				\\setbox1=\\vtop{%
				\\hbox{\\box1}
				\\hbox{%
				\\opdisplay{operandstyle.\\the\\count255}%
				{NbtoDecompose}}
				}%
				\\else
				\\advance\\primeindex by1
				\\fi
				\\repeat
				\\hbox{\\box1
				\\kern0.5\\opcolumnwidth
				\\opvline(0,0.75){\\the\\count255.25}
				\\kern0.5\\opcolumnwidth
				\\box2}%
				\\fi
				\\endgroup
				}
				
				%%%%% VÉRIFIER L'UTILITÉ %%%%%
				%\\renewcommand{\\theenumi}{\\textbf{\\arabic{enumi}}}
				%\\renewcommand{\\labelenumi}{\\textbf{\\theenumi.}}
				%\\renewcommand{\\theenumii}{\\textbf{\\alph{enumii}}}
				%\\renewcommand{\\labelenumii}{\\textbf{\\theenumii.}}
				
				
				%Tapuscrit : Denis Vergès				
				
				`
				break
			default:
				result += `\\usepackage{${packages}}\n`
		}
	}
	return result
}

export function scratchTraductionFr() {
	window.scratchblocks.loadLanguages({
		fr: {
			"commands": {
				"move %1 steps": "avancer de %1 pas",
				"turn @turnRight %1 degrees": "tourner @turnRight de %1 degrés",
				"turn @turnLeft %1 degrees": "tourner @turnLeft de %1 degrés",
				"point in direction %1": "s'orienter à %1",
				"point towards %1": "s'orienter vers %1",
				"go to x:%1 y:%2": "aller à x: %1 y: %2",
				"go to %1": "aller à %1",
				"glide %1 secs to x:%2 y:%3": "glisser en %1 secondes à x: %2 y: %3",
				"glide %1 secs to %2": "glisser en %1 secondes à %2",
				"change x by %1": "ajouter %1 à x",
				"set x to %1": "mettre x à %1",
				"change y by %1": "ajouter %1 à y",
				"set y to %1": "mettre y à %1",
				"set rotation style %1": "fixer le sens de rotation %1",
				"say %1 for %2 seconds": "dire %1 pendant %2 secondes",
				"say %1": "dire %1",
				"think %1 for %2 seconds": "penser à %1 pendant %2 secondes",
				"think %1": "penser à %1",
				"show": "montrer",
				"hide": "cacher",
				"switch costume to %1": "basculer sur le costume %1",
				"next costume": "costume suivant",
				"next backdrop": "arrière-plan suivant",
				"switch backdrop to %1": "basculer sur l'arrière-plan %1",
				"switch backdrop to %1 and wait": "basculer sur l'arrière-plan %1 et attendre",
				"change %1 effect by %2": "ajouter %2 à l'effet %1",
				"set %1 effect to %2": "mettre l'effet %1 à %2",
				"clear graphic effects": "annuler les effets graphiques",
				"change size by %1": "ajouter %1 à la taille",
				"set size to %1%": "mettre la taille à %1 % de la taille initiale",
				"go to %1 layer": "aller à l'%1 plan",
				"go %1 %2 layers": "déplacer de %2 plans vers l'%1",
				"start sound %1": "jouer le son %1",
				"clear sound effects": "annuler tous les effets sonores",
				"play sound %1 until done": "jouer le son %1 jusqu'au bout",
				"stop all sounds": "arrêter tous les sons",
				"play drum %1 for %2 beats": "jouer du tambour %1 pendant %2 temps",
				"rest for %1 beats": "faire une pause pendant %1 temps",
				"play note %1 for %2 beats": "jouer la note %1 pendant %2 temps",
				"set instrument to %1": "choisir l'instrument n° %1",
				"change volume by %1": "ajouter %1 au volume",
				"set volume to %1%": "mettre le volume à %1%",
				"change tempo by %1": "ajouter %1 au tempo",
				"set tempo to %1": "mettre le tempo à %1",
				"erase all": "effacer tout",
				"stamp": "estampiller",
				"pen down": "stylo en position d'écriture",
				"pen up": "relever le stylo",
				"set pen color to %1": "mettre la couleur du stylo à %1",
				"change pen color by %1": "ajouter %1 à la couleur du stylo",
				"set pen %1 to %2": "mettre la %1 du stylo à %2",
				"change pen %1 by %2": "ajouter %2 à la %1 du stylo",
				"change pen shade by %1": "ajouter %1 à l'intensité du stylo",
				"set pen shade to %1": "mettre l'intensité du stylo à %1",
				"change pen size by %1": "ajouter %1 à la taille du stylo",
				"set pen size to %1": "mettre la taille du stylo à %1",
				"when @greenFlag clicked": "quand @greenFlag est cliqué",
				"when %1 key pressed": "quand la touche %1 est pressée",
				"when this sprite clicked": "quand ce sprite est cliqué",
				"when stage clicked": "quand la scène est cliquée",
				"when backdrop switches to %1": "quand l'arrière-plan bascule sur %1",
				"when %1 > %2": "quand le %1 > %2",
				"when I receive %1": "quand je reçois %1",
				"broadcast %1": "envoyer à tous %1",
				"broadcast %1 and wait": "envoyer à tous %1 et attendre",
				"wait %1 seconds": "attendre %1 secondes",
				"repeat %1": "répéter %1 fois",
				"forever": "répéter indéfiniment",
				"if %1 then": "si %1 alors",
				"wait until %1": "attendre jusqu'à ce que %1",
				"repeat until %1": "répéter jusqu'à ce que %1",
				"stop %1": "stop %1",
				"when I start as a clone": "quand je commence comme un clone",
				"create clone of %1": "créer un clone de %1",
				"delete this clone": "supprimer ce clone",
				"ask %1 and wait": "demander %1 et attendre",
				"turn video %1": "vidéo %1",
				"set video transparency to %1%": "mettre la transparence vidéo sur %1",
				"when video motion > %1": "quand mouvement vidéo > %1",
				"reset timer": "réinitialiser le chronomètre",
				"set %1 to %2": "mettre %1 à %2",
				"change %1 by %2": "ajouter %2 à %1",
				"show variable %1": "montrer la variable %1",
				"hide variable %1": "cacher la variable %1",
				"add %1 to %2": "ajouter %1 à %2",
				"delete %1 of %2": "supprimer l'élément %1 de %2",
				"delete all of %1": "supprimer tous les éléments de la liste %1",
				"if on edge, bounce": "rebondir si le bord est atteint",
				"insert %1 at %2 of %3": "insérer %1 en position %2 de %3",
				"replace item %1 of %2 with %3": "remplacer l'élément %1 de la liste %2 par %3",
				"show list %1": "montrer la liste %1",
				"hide list %1": "cacher la liste %1",
				"x position": "abscisse x",
				"y position": "ordonnée y",
				"direction": "direction",
				"costume #": "numéro de costume",
				"costume %1": "%1 du costume",
				"size": "taille",
				"backdrop name": "nom de l'arrière-plan",
				"backdrop %1": "%1 de l'arrière-plan",
				"backdrop #": "numéro de l'arrière-plan",
				"volume": "volume",
				"tempo": "tempo",
				"touching %1?": "touche le %1 ?",
				"touching color %1?": "couleur %1 touchée ?",
				"color %1 is touching %2?": "couleur %1 touche %2 ?",
				"distance to %1": "distance de %1",
				"answer": "réponse",
				"key %1 pressed?": "touche %1 pressée ?",
				"mouse down?": "souris pressée ?",
				"mouse x": "souris x",
				"mouse y": "souris y",
				"set drag mode %1": "mettre mode de glissement à %1",
				"loudness": "volume sonore",
				"video %1 on %2": "vidéo %1 sur %2",
				"timer": "chronomètre",
				"%1 of %2": "%1 de %2",
				"current %1": "%1 actuelle",
				"days since 2000": "jours depuis 2000",
				"username": "nom d'utilisateur",
				"%1 + %2": "%1 + %2",
				"%1 - %2": "%1 - %2",
				"%1 * %2": "%1 * %2",
				"%1 / %2": "%1 / %2",
				"pick random %1 to %2": "nombre aléatoire entre %1 et %2",
				"%1 < %2": "%1 < %2",
				"%1 = %2": "%1 = %2",
				"%1 > %2": "%1 > %2",
				"%1 and %2": "%1 et %2",
				"%1 or %2": "%1 ou %2",
				"not %1": "non %1",
				"join %1 %2": "regrouper %1 et %2",
				"letter %1 of %2": "lettre %1 de %2",
				"length of %1": "longueur de %1",
				"%1 mod %2": "%1 modulo %2",
				"round %1": "arrondi de %1",
				"%1 contains %2?": "%1 contient %2 ?",
				"item %1 of %2": "élément %1 de %2",
				"item # of %1 in %2": "position de %1 dans %2",
				"turn %1 on": "allumer le moteur %1",
				"turn %1 off": "éteindre le moteur %1",
				"set %1 power to %2": "mettre la puissance du moteur %1 à %2",
				"set %1 direction to %2": "mettre la direction du moteur %1 à %2",
				"when distance %1 %2": "quand la distance %1 %2",
				"distance": "distance",
				"turn %1 on for %2 seconds": "allumer le moteur %1 pendant %2 secondes",
				"set light color to %1": "mettre la couleur de la lampe à %1",
				"play note %1 for %2 seconds": "jouer la note %1 pendant %2 secondes",
				"when tilted %1": "quand incliné %1",
				"tilt angle %1": "angle d'inclinaison %1",
				"else": "sinon",
				"user id": "id de l'utilisateur",
				"loud?": "fort ?"
			},
			"dropdowns": {},
			"ignorelt": [],
			"soundEffects": [
				"hauteur",
				"stéréo gauche/droite"
			],
			"osis": [
				"autres scripts dans sprite"
			],
			"definePrefix": [
				"définir"
			],
			"defineSuffix": [],
			"palette": {
				"Motion": "Mouvement",
				"Looks": "Apparence",
				"Sound": "Son",
				"Events": "Événements",
				"Control": "Contrôle",
				"Sensing": "Capteurs",
				"Operators": "Opérateurs",
				"Variables": "Variables",
				"My Blocks": "Mes Blocs"
			},
			"math": [
				"abs",
				"plancher",
				"plafond",
				"racine",
				"sin",
				"cos",
				"tan",
				"asin",
				"acos",
				"atan",
				"ln",
				"log",
				"e^",
				"10^"
			],
			"aliases": {
				"tourner gauche de %1 degrés": "turn @turnLeft %1 degrees",
				"tourner droite de %1 degrés": "turn @turnRight %1 degrees",
				"quand le drapeau vert pressé": "when @greenFlag clicked",
				"fin": "end"
			},
			"name": "Français",
			"percentTranslated": 100
		}
	})
}

/**
 * 
 * @param {*} tabQCMs tableau de la forme [ref du groupe,tabQCMs,titre du groupe]
 * chaque tableau de tabQCMs est constitué par 3 éléments :
 * la question énoncée, le tableau des réponses, le tableau des booléens bon=1 mauvaise=0
 * Si le troisième tableau ne comporte que des 0, il s'agit d'une question ouverte.
 * c'est la longueur du tableau des réponses qui définit le nombre de réponses et donc le nombre de booléens nécessaires
 * Si c'est pour une question ouverte, il n'y aura qu'une réponse et une seule valeur dans le tableau des booléens qui déterminera le nombre de ligne à réserver pour la réponse
 * exemple : Pour l'exo 3G30 : tabQCMs=['3G30',[texte,[texte_corr],[4]],'Calculer des longueurs avec la trigonométrie']
 * exemple de type QCM : ​["6C30-3",[["Calcul : $62+23$.\\\\ \n Réponses possibles",[85,1426,8.5,850,86],[1,0,0,0,0]],
 * 			["Calcul : $80,88+50,34$.\\\\ \n Réponses possibles",[131.22,407150,13.122,1312.2,131.23],[1,0,0,0,0]]],'Opérations avec les nombres décimaux']
 * c'est la partie centrale qui contient autant de tableaux de QCM [question,tableau des réponses,tableaux des booléens] que de questions dans l'exercice.
 * chaque tableau est élaboré dans le corps de l'exercice 
 * La fonction crée la partie préparation des groupes de questions du document AMC.
 * Elle retourne un tableau hybride contenant dans cet ordre :
 * Le code Latex du groupe de question, la référence du groupe (passée dans l'argument tabQCMs[0], le nombre de questions dans ce groupe (tabQCMs[1].length), et le titre du groupe passé dans l'argument tabQCM[2])
 */

export function export_QCM_AMC(tabQCMs, idExo) {
	let elimineDoublons = function (tabqcm) { //fonction qui va éliminer les doublons si il y en a
		let reponses = tabqcm[1].slice()
		let bools = tabqcm[2].slice()
		for (let i = 0; i < reponses.length - 1; i++) {
			for (let j = i + 1; j < reponses.length;) {
				if (reponses[i] == reponses[j]) {
					console.log('doublon trouvé', reponses[i], reponses[j]) // les réponses i et j sont les mêmes

					if (bools[i] == 1) { // si la réponse i est bonne, on vire la j
						reponses.splice(j, 1)
						bools.splice(j, 1)
					}
					else if (bools[j] == 1) { //si la réponse i est mauvaise et la réponse j bonne,
						// comme ce sont les mêmes réponses, on vire la j mais on met la i bonne
						reponses.splice(j, 1)
						bools.splice(j, 1)
						bools[i] = 1
					}
					else { // Les deux réponses sont mauvaises
						reponses.splice(j, 1)
						bools.splice(j, 1)
					}
				}
				else {
					j++
				}
			}
		}
		return [tabqcm[0], reponses, bools]
	}

	let tex_QR = ``, type = '', tabQCM
	let nbBonnes, id = 0, nb_chiffres_pe, nb_chiffres_pd, nb_chiffres, reponse
	let params,horizontalite
	if (tabQCMs.length>4) {
		params=tabQCMs[4]
		if (params.vertical==='undefined') {
			horizontalite='reponseshoriz'
		}
		else {
			horizontalite='reponses'
		}
	}
	else {
		params={ordered:false,lastChoices:0}
		horizontalite='reponseshoriz'
	}
	for (let j = 0; j < tabQCMs[1].length; j++) {
		tabQCM = tabQCMs[1][j].slice(0)
		nbBonnes = 0
		switch (tabQCMs[3]) {
			case 1: // question QCM 1 bonne réponse
			tabQCM = elimineDoublons(tabQCM); // On élimine les éventuels doublons (ça arrive quand on calcule des réponses)
			nbBonnes = 0
			for (let b of tabQCM[2]) { // on vérifie qu'il y a bien une seule bonne réponse, sinon on a une question de type 2
				if (b == 1) nbBonnes++
			}
			if (nbBonnes == 1) {
				type = 'question' // On est dans le cas 1 le type est question
			}
			else if (nbBonnes > 1) {
				type = 'questionmult' // On est dans le cas 2 le type est questionmult
			}
			tex_QR += `\\element{${tabQCMs[0]}}{\n `
			tex_QR += `	\\begin{${type}}{question-${tabQCMs[0]}-${lettre_depuis_chiffre(idExo + 1)}-${id}} \n `
			tex_QR += `		${tabQCM[0]} \n `
			tex_QR += `		\\begin{${horizontalite}}`
			if (params.ordered==true){
				tex_QR +=`[o]`
			}
			tex_QR +=`\n `
			for (let i = 0; i < tabQCM[1].length; i++) {
				if (params.lastChoices>0&&i==params.lastChoices){
					tex_QR +=`\\lastchoices\n`
				}
				switch (tabQCM[2][i]) {
					case 1:
						tex_QR += `			\\bonne{${tabQCM[1][i]}}\n `
						break
					case 0:
						tex_QR += `			\\mauvaise{${tabQCM[1][i]}}\n `
						break
				}
			}
			tex_QR += `		\\end{${horizontalite}}\n `
			tex_QR += `	\\end{${type}}\n }\n `
			id++
			break

			case 2: // question QCM plusieurs bonnes réponses (même si il n'y a qu'une seule bonne réponse, il y aura le symbole multiSymbole)
				tabQCM = elimineDoublons(tabQCM); // On élimine les éventuels doublons (ça arrive quand on calcule des réponses)
				type = 'questionmult' // On est dans le cas 2 le type est questionmult
				tex_QR += `\\element{${tabQCMs[0]}}{\n `
				tex_QR += `	\\begin{${type}}{question-${tabQCMs[0]}-${lettre_depuis_chiffre(idExo + 1)}-${id}} \n `
				tex_QR += `		${tabQCM[0]} \n `
				tex_QR += `		\\begin{${horizontalite}}`
				if (params.ordered==true){
					tex_QR +=`[o]`
				}
				tex_QR+=` \n `
				for (let i = 0; i < tabQCM[1].length; i++) {
					if (params.lastChoices>0&&i==params.lastChoices){
						tex_QR +=`\\lastchoices\n`
					}
					switch (tabQCM[2][i]) {
						case 1:
							tex_QR += `			\\bonne{${tabQCM[1][i]}}\n `
							break
						case 0:
							tex_QR += `			\\mauvaise{${tabQCM[1][i]}}\n `
							break
					}
				}
				tex_QR += `		\\end{${horizontalite}}\n `
				tex_QR += `	\\end{${type}}\n }\n `
				id++
				break
			case 3: // AMCOpen question ouverte corrigée par l'enseignant
				tex_QR += `\\element{${tabQCMs[0]}}{\n `
				tex_QR += `	\\begin{question}{question-${tabQCMs[0]}-${lettre_depuis_chiffre(idExo + 1)}-${id}} \n `
				tex_QR += `		${tabQCM[0]} \n `
				tex_QR += `\\explain{${tabQCM[1][0]}}\n`
				tex_QR+=`\\notation{${tabQCM[2][0]}}\n`
				//tex_QR += `\\AMCOpen{lines=${tabQCM[2][0]}}{\\mauvaise[NR]{NR}\\scoring{0}\\mauvaise[RR]{R}\\scoring{0.01}\\mauvaise[R]{R}\\scoring{0.33}\\mauvaise[V]{V}\\scoring{0.67}\\bonne[VV]{V}\\scoring{1}}\n`
				tex_QR += `\\end{question}\n }\n`
				id++
				break
			case 4: // AMCOpen question ouverte avec encodage numérique de la réponse
				/********************************************************************/
				// Dans ce cas, le tableau des booléens comprend les renseignements nécessaires pour paramétrer \AMCnumericChoices
				// On pourra rajouter des options : les paramètres sont nommés.
				// {digits=0,decimals=0,vertical=false,signe=false,exposant_nb_chiffres=0,exposant_signe=false,approx=0}
				// si digits=0 alors la fonction va analyser le nombre décimal (ou entier) pour déterminer digits et decimals
				// signe et exposant_signe sont des booléens
				// approx est un entier : on enlève la virgule pour comparer la réponse avec la valeur : approx est le seuil de cette différence.
				// La correction est dans tabQCM[1][0] et la réponse numérique est dans tabQCM[1][1]
				/********************************************************************/
				if (tabQCM[2].exposant_nb_chiffres == 0) {
					reponse = tabQCM[1][1]
					if (tabQCM[2].digits == 0) {
						nb_chiffres_pd = nombre_de_chiffres_dans_la_partie_decimale(reponse)
						tabQCM[2].decimals = nb_chiffres_pd
						nb_chiffres_pe = nombre_de_chiffres_dans_la_partie_entiere(reponse)
						tabQCM[2].digits = nb_chiffres_pd + nb_chiffres_pe
					}
				}
				tex_QR += `\\element{${tabQCMs[0]}}{\n `
				tex_QR += `	\\begin{questionmultx}{question-${tabQCMs[0]}-${lettre_depuis_chiffre(idExo + 1)}-${id}} \n `
				tex_QR += `		${tabQCM[0]} \n `
				tex_QR += `\\explain{${tabQCM[1][0]}}\n`
				tex_QR += `\\AMCnumericChoices{${tabQCM[1][1]}}{digits=${tabQCM[2].digits},decimals=${tabQCM[2].decimals},sign=${tabQCM[2].signe},`
				if (tabQCM[2][3] != 0) { // besoin d'un champ pour la puissance de 10. (notation scientifique)
					tex_QR += `exponent=${tabQCM[2].exposant_nb_chiffres},exposign=${tabQCM[2].exposant_signe},`
				}
				if (tabQCM[2].approx != 0) {
					tex_QR += `approx=${tabQCM[2].approx},`
				}
				if (typeof tabQCM[2].vertical!='undefined'){	
				tex_QR += `vertical=${tabQCM[2].vertical},`	
				}
				if (typeof tabQCM[2].strict!='undefined'){	
					tex_QR += `strict=${tabQCM[2].strict},`	
					}
				if (typeof tabQCM[2].vhead!='undefined'){	
					tex_QR += `vhead=${tabQCM[2].vhead},`	
				}
				tex_QR += `borderwidth=0pt,backgroundcol=lightgray,scoreapprox=0.5,scoreexact=1,Tpoint={,}}\n`
				tex_QR += `\\end{questionmultx}\n }\n`
				id++
				break

			case 5 : // AMCOpen + AMCnumeric Choices. (Nouveau ! en test)
				/********************************************************************/
				// Dans ce cas, le tableau des booléens comprend les renseignements nécessaires pour paramétrer \AMCnumericCoices
				// On pourra rajouter des options : les paramètres sont nommés.
				// {digits=0,decimals=0,signe=false,exposant_nb_chiffres=0,exposant_signe=false,approx=0}
				// si digits=0 alors la fonction va analyser le nombre décimal (ou entier) pour déterminer digits et decimals
				// signe et exposant_signe sont des booléens
				// approx est un entier : on enlève la virgule pour comparer la réponse avec la valeur : approx est le seuil de cette différence.
				// La correction est dans tabQCM[1][0], la réponse numlérique est dans tabQCM[1][1] et le nombre de ligne pour le cadre dans tabQCM[1][2] et 
				/********************************************************************/
				tex_QR += `\\element{${tabQCMs[0]}}{\n `
				tex_QR+=`\\begin{minipage}[b]{0.7 \\linewidth}\n`
				tex_QR += `	\\begin{question}{question-${tabQCMs[0]}-${lettre_depuis_chiffre(idExo + 1)}-${id}a} \n `
				tex_QR += `		${tabQCM[0]} \n `
				tex_QR += `\\explain{${tabQCM[1][0]}}\n`
				tex_QR+=`\\notation{${tabQCM[1][2]}}\n`
				//tex_QR += `\\AMCOpen{lines=${tabQCM[1][2]}}{\\mauvaise[NR]{NR}\\scoring{0}\\mauvaise[RR]{R}\\scoring{0.01}\\mauvaise[R]{R}\\scoring{0.33}\\mauvaise[V]{V}\\scoring{0.67}\\bonne[VV]{V}\\scoring{1}}\n`
				tex_QR += `\\end{question}\n\\end{minipage}\n`
				if (tabQCM[2].exposant_nb_chiffres == 0) {
					reponse = tabQCM[1][1]
					if (tabQCM[2].digits == 0) {
						nb_chiffres_pd = nombre_de_chiffres_dans_la_partie_decimale(reponse)
						tabQCM[2].decimals = nb_chiffres_pd
						nb_chiffres_pe = nombre_de_chiffres_dans_la_partie_entiere(reponse)
						tabQCM[2].digits = nb_chiffres_pd + nb_chiffres_pe
					}
				}
				tex_QR+=`\\begin{minipage}[b]{0.3 \\linewidth}\n`
				tex_QR +=`\\def\\AMCbeginQuestion#1#2{}\\AMCquestionNumberfalse`
				tex_QR += `	\\begin{questionmultx}{question-${tabQCMs[0]}-${lettre_depuis_chiffre(idExo + 1)}-${id}b} \n `
				tex_QR += `\\AMCnumericChoices{${tabQCM[1][1]}}{digits=${tabQCM[2].digits},decimals=${tabQCM[2].decimals},sign=${tabQCM[2].signe},`
				if (tabQCM[2][3] != 0) { // besoin d'un champ pour la puissance de 10. (notation scientifique)
					tex_QR += `exponent=${tabQCM[2].exposant_nb_chiffres},exposign=${tabQCM[2].exposant_signe},`
				}
				if (tabQCM[2].approx != 0) {
					tex_QR += `approx=${tabQCM[2].approx},`
				}
				tex_QR += `borderwidth=0pt,backgroundcol=lightgray,scoreapprox=0.5,scoreexact=1,Tpoint={,},vertical=true}\n`
				tex_QR += `\\end{questionmultx}\n\\end{minipage}}\n`
				id++
			break
		case 6 : // AMCOpen + deux AMCnumeric Choices. (Nouveau ! en test)
			/********************************************************************/
			// /!\/!\/!\/!\ ATTENTION /!\/!\/!\/!\
			// Pour ce type :
			// =======tabQCM[0] contient toujours le texte de l'énoncé
			// =======tabQCM[1] est un tableau de tableau avec :
			// ===================tabQCM[1][0] qui contient ce qu'il faut pour le 1er numericchoice ['question 1','réponse1',réponse1 num]
			// ===================tabQCM[1][1] qui contient ce qu'il faut pour le 2e numericchoice ['question 2','réponse2',réponse2 num]
			// =======tabQCM[2] est un tableau de tableau avec :
			// ===================tabQCM[2][0] qui contient les paramètres pour la réponse1 avec un texte en plus qui est inscrit au dessus du champ de code de la reponse 1
			// =============================== {texte:'numérateur',digits:3,decimals:0,signe:false,exposant_nb_chiffres:0,exposant_signe:false,approx:0}
			// ===================tabQCM[2][1] qui contient les paramètres pour la réponse2 avec un texte en plus qui est inscrit au dessus du champ de code de la reponse 2
			// =============================== {texte:'dénominateur',digits:3,decimals:0,signe:false,exposant_nb_chiffres:0,exposant_signe:false,approx:0}
			//===================================================================================
			// Dans ce cas, le tableau des booléens comprend les renseignements nécessaires pour paramétrer \AMCnumericChoices
			// On pourra rajouter des options : les paramètres sont nommés.
			// {digits=0,decimals=0,signe=false,exposant_nb_chiffres=0,exposant_signe=false,approx=0}
			// si digits=0 alors la fonction va analyser le nombre décimal (ou entier) pour déterminer digits et decimals
			// signe et exposant_signe sont des booléens
			// approx est un entier : on enlève la virgule pour comparer la réponse avec la valeur : approx est le seuil de cette différence.
			// La correction est dans tabQCM[1][0], la réponse numlérique est dans tabQCM[1][1] et le nombre de ligne pour le cadre dans tabQCM[1][2] et 
			/********************************************************************/
			
			tex_QR += `\\element{${tabQCMs[0]}}{\n `
			// premier champ de codage
			tex_QR+=`\\begin{minipage}[b]{0.7 \\linewidth}\n`
			tex_QR += `	\\begin{question}{question-${tabQCMs[0]}-${lettre_depuis_chiffre(idExo + 1)}-${id}a} \n `
			tex_QR += `		${tabQCM[0]} \n `
			tex_QR += `\\explain{${tabQCM[1][0][0]}}\n`
			tex_QR+=`\\notation{${tabQCM[1][0][2]}}\n`
			//tex_QR += `\\AMCOpen{lines=${tabQCM[1][2]}}{\\mauvaise[NR]{NR}\\scoring{0}\\mauvaise[RR]{R}\\scoring{0.01}\\mauvaise[R]{R}\\scoring{0.33}\\mauvaise[V]{V}\\scoring{0.67}\\bonne[VV]{V}\\scoring{1}}\n`
			tex_QR += `\\end{question}\n\\end{minipage}\n`
			// Pour les deux champs supplémentaires
			// if (tabQCM[2].exposant_nb_chiffres == 0) {
			// 	reponse = tabQCM[1][1]
			// 	if (tabQCM[2].digits == 0) {
			// 		nb_chiffres_pd = nombre_de_chiffres_dans_la_partie_decimale(reponse)
			// 		tabQCM[2].decimals = nb_chiffres_pd
			// 		nb_chiffres_pe = nombre_de_chiffres_dans_la_partie_entiere(reponse)
			// 		tabQCM[2].digits = nb_chiffres_pd + nb_chiffres_pe
			// 	}
			// }
			//deuxième champ de codage numérique
			tex_QR+=`\\begin{minipage}[b]{0.15 \\linewidth}\n`
			tex_QR +=`\\def\\AMCbeginQuestion#1#2{}\\AMCquestionNumberfalse`
			tex_QR += `	\\begin{questionmultx}{question-${tabQCMs[0]}-${lettre_depuis_chiffre(idExo + 1)}-${id}b} \n `
			tex_QR += `${tabQCM[2][0].texte}\n` //pour pouvoir mettre du texte adapté par ex Dénominateur éventuellement de façon conditionnelle avec une valeur par défaut			
			tex_QR += `\\AMCnumericChoices{${tabQCM[1][0][1]}}{digits=${tabQCM[2][0].digits},decimals=${tabQCM[2][0].decimals},sign=${tabQCM[2][0].signe},`
			if (tabQCM[2][0][3] != 0) { // besoin d'un champ pour la puissance de 10. (notation scientifique)
				tex_QR += `exponent=${tabQCM[2][0].exposant_nb_chiffres},exposign=${tabQCM[2][0].exposant_signe},`
			}
			if (tabQCM[2][0].approx != 0) {
				tex_QR += `approx=${tabQCM[2][0].approx},`
			}
			tex_QR += `borderwidth=0pt,backgroundcol=lightgray,scoreapprox=0.5,scoreexact=1,Tpoint={,},vertical=true}\n`
			tex_QR += `\\end{questionmultx}\n\\end{minipage}\n`

			//troisième champ de codage numérique
			tex_QR+=`\\begin{minipage}[b]{0.15 \\linewidth}\n`
			tex_QR +=`\\def\\AMCbeginQuestion#1#2{}\\AMCquestionNumberfalse`
			tex_QR += `	\\begin{questionmultx}{question-${tabQCMs[0]}-${lettre_depuis_chiffre(idExo + 1)}-${id}c} \n `
			tex_QR += `${tabQCM[2][1].texte}\n` //pour pouvoir mettre du texte adapté par ex Dénominateur éventuellement de façon conditionnelle avec une valeur par défaut
			tex_QR += `\\AMCnumericChoices{${tabQCM[1][1][1]}}{digits=${tabQCM[2][1].digits},decimals=${tabQCM[2][1].decimals},sign=${tabQCM[2][1].signe},`
			if (tabQCM[2][1][3] != 0) { // besoin d'un champ pour la puissance de 10. (notation scientifique)
				tex_QR += `exponent=${tabQCM[2][1].exposant_nb_chiffres},exposign=${tabQCM[2][1].exposant_signe},`
			}
			if (tabQCM[2][1].approx != 0) {
				tex_QR += `approx=${tabQCM[2][1].approx},`
			}
			tex_QR += `borderwidth=0pt,backgroundcol=lightgray,scoreapprox=0.5,scoreexact=1,Tpoint={,},vertical=true}\n`
			tex_QR += `\\end{questionmultx}\n\\end{minipage}}\n`

			id++
		break

		}


	}
	return [tex_QR, tabQCMs[0], tabQCMs[1].length, tabQCMs[2]]
}

/**
 * @Auteur Jean-Claude Lhote
 * Fonction qui crée un document pour AMC (pour le compiler, le package automultiplechoice.sty doit être présent)
 * 
 *  questions est un tableau d'éléments de type Exercice.QCM
 * Exercice.QCM est un tableau produit par l'exercice 
 * QCM[0] est la référence du groupe de question, c'est la référence de l'exercice dont il est issu
 * QCM[1] est un tableau d'éléments de type ['question posée',tableau des réponses,tableau des booléens bon ou mauvais]
 * QCM[2] est le titre donné sur la copie pour le groupe de question (pour ne pas mettre la référence)
 * QCM[3] est le type de question :
 * 1=question à choix multiple avec 1 bonne réponse
 * 2=questionmult à choix multiple avec plusieurs bonnes réponses
 * 3=AMCOpen question ouverte sans bonne ni mauvaise réponse 3 cases à cocher par l'enseignant
 * 4=questionmultx avec AMCnumeriqueChoices question ouverte à réponse numérique codée 
 * 
 * nb_questions est un tableau pour préciser le nombre de questions à prendre dans chaque groupe pour constituer une copie
 * si il est indéfini, toutes les questions du groupe seront posées.
 * nb_exemplaire est le nombre de copie à générer
 * matiere et titre se passe de commentaires : ils renseigne l'entête du sujet.
 */
export function creer_document_AMC({ questions, nb_questions = [], nb_exemplaires = 1, matiere = 'Mathématiques', titre = 'Evaluation',type_entete="AMCcodeGrid",format='A4'}) {
	// Attention questions est maintenant un tableau de tous les this.QCM des exos
	// Dans cette partie, la fonction récupère toutes les questions et les trie pour les rassembler par groupe
	// Toutes les questions d'un même exercice seront regroupées ce qui permet éventuellement de les récupérer dans des fichiers individuels pour se constituer une base

	let idExo = 0, code,index_of_code
console.log(type_entete)
	let nombre_de_questions_indefinie=[]
	let graine = randint(1, 100000)
	let groupeDeQuestions = [], tex_questions = [[]], titre_question = []
	for (let qcm of questions) {
		code = export_QCM_AMC(qcm, idExo)
		idExo++
		index_of_code=groupeDeQuestions.indexOf(code[1])
		if (index_of_code == -1) { //si le groupe n'existe pas
			groupeDeQuestions.push(code[1])
			index_of_code=groupeDeQuestions.indexOf(code[1])
			tex_questions[index_of_code] = code[0]
	// Si le nombre de questions du groupe n'est pas défini, alors on met toutes les questions sinon on laisse le nombre choisi par l'utilisateur
			if (typeof nb_questions[index_of_code] =='undefined' ) {
				nombre_de_questions_indefinie[index_of_code]=true
				nb_questions[index_of_code] = code[2]
			}
			else { // Si le nombre de question (à restituer pour ce groupe de question) a été défini par l'utilisateur, alors on le laisse !
				nombre_de_questions_indefinie[index_of_code]=false
			}
			// Si le nombre de questions du groupe n'est pas défini, alors on met toutes les questions sinon on laisse le nombre choisi par l'utilisateur
			titre_question[index_of_code] = code[3]
		}
		else { // Donc le groupe existe, on va vérifier si la question existe déjà et si non, on l'ajoute.
		console.log(tex_questions[index_of_code].indexOf(code[0]))
			if (tex_questions[index_of_code].indexOf(code[0])==-1){
			tex_questions[index_of_code] += code[0]
			// Si le nombre de questions du groupe n'est pas défini, alors on met toutes les questions sinon on laisse le nombre choisi par l'utilisateur
			if (nombre_de_questions_indefinie[index_of_code]) {
				nb_questions[index_of_code] += code[2]
			}
			}
		}

	}
	// Fin de la préparation des groupes

	//variable qui contiendra le code LaTeX pour AMC
	let code_latex =''

	// variable preambule à abonder le cas échéant si des packages sont nécessaires.
	// Merci à Sébastien Lozano pour la vérification des dépendances
	// Merci à Liouba Lerou pour ses documents qui ont servi de base
	// A faire : abonder le preambule pour qu'il colle à tous les exos Mathalea_AMC

	let preambule = `%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	%%%%% -I- PRÉAMBULE %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	\n`
	if (format=='A3'){
		preambule+=`	 \\documentclass[10pt,a3paper,landscape,french]{article}\n`
	}
	else {
		preambule+=`	 	 \\documentclass[10pt,a4paper,french]{article}\n`
	}

preambule+=`	 
	%%%%% PACKAGES LANGUE %%%%%
	 \\usepackage{babel} % sans option => langue définie dans la classe du document
	 \\usepackage[T1]{fontenc} 
	 \\usepackage[utf8x]{inputenc}
	 \\usepackage{lmodern}			        		% Choix de la fonte (Latin Modern de D. Knuth)
	 \\usepackage{fp}
	
	%%%%%%%%%%%%%%%%%%%%% SPÉCIFICITÉS A.M.C. %%%%%%%%%%%%%%%%%%%%%%
	%\\usepackage[francais,bloc,completemulti]{automultiplechoice} 
	%   remarque : avec completmulti => "aucune réponse ne convient" en +
	 \\usepackage[francais,bloc,insidebox,nowatermark]{automultiplechoice} %//,insidebox
	%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	
	%%%%% PACKAGES MISE EN PAGE %%%%%
	 \\usepackage{multicol} 
	 \\usepackage{wrapfig}  
	 \\usepackage{fancybox}  % pour \\doublebox \\shadowbox  \\ovalbox \\Ovalbox
	 \\usepackage{calc} 						% Calculs 
	 \\usepackage{enumerate}					% Pour modifier les numérotations
	 \\usepackage{enumitem}
	 \\usepackage{tabularx}					% Pour faire des tableaux

	%%%%% PACKAGES FIGURES %%%%%
	%\\usepackage{pstricks,pst-plot,pstricks-add}
	%   POUR PSTRICKS d'où compilation sans PDFLateX mais : dvi, dvi2ps, ps2PDF...
	%   MAIS ON PRÉFÉRERA UTILISER TIKZ...
	\\usepackage{etex}	  % pour avoir plus de "registres" mémoires / tikz...
	\\usepackage{xcolor}% [avant tikz] xcolor permet de nommer + de couleurs
	\\usepackage{pgf,tikz}
	\\usepackage{graphicx} % pour inclure une image
	\\usetikzlibrary{arrows,calc,fit,patterns,plotmarks,shapes.geometric,shapes.misc,shapes.symbols,shapes.arrows,
		shapes.callouts, shapes.multipart, shapes.gates.logic.US,shapes.gates.logic.IEC, er, automata,backgrounds,chains,topaths,trees,petri,mindmap,matrix, calendar, folding,fadings,through,positioning,scopes,decorations.fractals,decorations.shapes,decorations.text,decorations.pathmorphing,decorations.pathreplacing,decorations.footprints,decorations.markings,shadows,babel} % Charge toutes les librairies de Tikz
	\\usepackage{tkz-tab,tkz-euclide,tkz-fct}	% Géométrie euclidienne avec TikZ
	%\\usetkzobj{all} %problème de compilation
	
	%%%%% PACKAGES MATHS %%%%%
	 \\usepackage{ucs}
	 \\usepackage{amsmath}
	 \\usepackage{amsfonts}
	 \\usepackage{amssymb}
	 \\usepackage{gensymb}
	 \\usepackage{eurosym}
	 \\usepackage{frcursive}
	 \\newcommand{\\Vcurs}{\\begin{cursive}V\\end{cursive}}
	 \\usepackage[normalem]{ulem}
	 \\usepackage{sistyle} \\SIdecimalsign{,} %% => \\num{...} \\num*{...}
	 % cf. http://fr.wikibooks.org/wiki/LaTeX/%C3%89crire_de_la_physique
	 %  sous Ubuntu, paquet texlive-science à installer
	 %\\usepackage[autolanguage,np]{numprint} % déjà appelé par défaut dans intro_Latex
	 \\usepackage{mathrsfs}  % Spécial math
	 %\\usepackage[squaren]{SIunits}			% Pour les unités (gère le conflits avec  \square de l'extension amssymb)
	 \\usepackage{pifont}						% Pour les symboles "ding"
	 \\usepackage{bbding}						% Pour les symboles
	 \\usepackage[misc]{ifsym}					% Pour les symboles
	 \\usepackage{cancel}						% Pour pouvoir barrer les nombres


	%%%%% AUTRES %%%%%
	 \\usepackage{ifthen}
	 \\usepackage{url} 			        		% Pour afficher correctement les url
	 \\urlstyle{sf}                          	% qui s'afficheront en police sans serif
	 \\usepackage{fancyhdr,lastpage}          	% En-têtes et pieds
 	 \\pagestyle{fancy}                      	% de pages personnalisés
	 \\usepackage{fancybox}					% Pour les encadrés
	 \\usepackage{xlop}						% Pour les calculs posés
	%\\usepackage{standalone}					% Pour avoir un apercu d'un fichier qui sera utilisé avec un input
	 \\usepackage{multido}					% Pour faire des boucles
	%\\usepackage{hyperref}					% Pour gérer les liens hyper-texte
	 \\usepackage{fourier}
	 \\usepackage{colortbl} 					% Pour des tableaux en couleur
	 \\usepackage{setspace}					% Pour \begin{spacing}{2.0} \end{spacing}
	 \\usepackage{multirow}					% Pour des cellules multilignes dans un tableau
	%\\usepackage{import}						% Equivalent de input mais en spécifiant le répertoire de travail
	%\\usepackage[]{qrcode}
	%\\usepackage{pdflscape}
	 \\usepackage[framemethod=tikz]{mdframed} % Pour les cadres
	 \\usepackage{tikzsymbols}
	%\\usepackage{tasks}						% Pour les listes horizontales
\\usepackage{csvsimple}
	
	%%%%% Librairies utilisées par Mathgraphe32 %%%% 
	\\usepackage{fix-cm}
	\\usepackage{textcomp}
	
	%%%%% PERSONNALISATION %%%%%
	\\renewcommand{\\multiSymbole}{$\\begin{smallmatrix}\\circ\\bullet\\bullet \\\\ 
					 \\circ\\bullet\\circ \\end{smallmatrix}$\\noindent} % par défaut $\\clubsuit$
	%\\renewcommand{\\multiSymbole}{\\textbf{(! Évent. plusieurs réponses !)}\\noindent} % par défaut $\\clubsuit$
	\\renewcommand{\\AMCbeginQuestion}[2]{\\noindent{\\colorbox{gray!20}{\\bf#1}}#2}
	%\\renewcommand{\\AMCIntervalFormat}[2]{\\texttt{[}#1\\,;\\,#2\\texttt{[}} 
												   % Crochets plus nets, virgule...
	%\\AMCboxDimensions{size=1.7ex,down=.2ex} %% taille des cases à cocher diminuée
	\\newcommand{\\collerVertic}{\\vspace{-3mm}} % évite un trop grand espace vertical
	\\newcommand{\\TT}{\\sout{\\textbf{Tiers Temps}} \\noindent} % 
	\\newcommand{\\Prio}{\\fbox{\\textbf{PRIORITAIRE}} \\noindent} % 
	\\newcommand{\\notation}[1]{
		\\AMCOpen{lines=#1}{\\mauvaise[{\\tiny NR}]{NR}\\scoring{0}\\mauvaise[{\\tiny RR}]{R}\\scoring{0.01}\\mauvaise[{\\tiny R}]{R}\\scoring{0.33}\\mauvaise[{\\tiny V}]{V}\\scoring{0.67}\\bonne[{\\tiny VV}]{V}\\scoring{1}}
		}
	%%pour afficher ailleurs que dans une question
	\\makeatletter
	\\newcommand{\\AffichageSiCorrige}[1]{\\ifAMC@correc #1\\fi}
	\\makeatother
	
	
	%%%%% TAILLES %%%%%
	 \\usepackage{geometry} 
	 \\geometry{headsep=0.3cm, left=1.5cm,right=1.5cm,top=2.4cm,bottom=1.5cm}
	 \\DecimalMathComma 
	
	 \\AMCcodeHspace=.3em % réduction de la taille des cases pour le code élève
	 \\AMCcodeVspace=.3em 
	% \\AMCcodeBoxSep=.1em
	 
	 \\def\\AMCotextReserved{\\emph{Ne rien cocher, réservé au prof !}}
	 
	%%%%%% Définition des barèmes 
	\\baremeDefautS{
		e=0.0001,	% incohérence (plusieurs réponses données à 0,0001 pour définir des manquements au respect de consignes)
		b=1,		% bonne réponse 1
		m=-0.01,		% mauvaise réponse 0,01 pour différencier de la 
		v=0} 		% non réponse qui reste à 0
	
	\\baremeDefautM{formula=((NBC-NMC)/NB)*((NBC-NMC)/NB>0)} % nombre de bonnes réponses cochées minorées des mauvaises réponses cochées, ramenées à 1, et ramenée à 0 si résultat négatif.
	
	%%%%%%%%% Paramètres pour réponses à construire 
	\\AMCinterIrep=0pt \\AMCinterBrep=.5ex \\AMCinterIquest=0pt \\AMCinterBquest=3ex \\AMCpostOquest=7mm \\setlength{\\AMChorizAnswerSep}{3em plus 4em} \\setlength{\\AMChorizBoxSep}{1em}
	%%%%% Fin du préambule %%%%%%%
	%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	`

// Variable contenant la partie document
// Celle-ci contient une partie statique et une partie variable (la zone de définition des groupes qui est construite à la volée à partir de la variable groupeDeQuestions alimentée au début)

	let debut_document = `%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%% -II-DOCUMENT %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\\begin{document}
\\AMCrandomseed{${graine}}   % On choisit les "graines" pour initialiser le "hasard"
\\setdefaultgroupmode{withoutreplacement}\n
\\FPseed=${graine}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%% -II-a. CONCEPTION DU QCM %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

	%%% préparation des groupes 
	\\setdefaultgroupmode{withoutreplacement}\n`;

	for (let g of groupeDeQuestions) {
		let i = groupeDeQuestions.indexOf(g)
		debut_document += tex_questions[i]
	}

// Variable qui contient l'entête d'une copie
// A faire : Proposer différent type d'entête en fonction d'un paramètre ?
	let entete_type_CodeGrid=	`\\begin{minipage}{10cm}
	\\champnom{\\fbox{\\parbox{10cm}{    
	  Écrivez vos nom, prénom et classe : \\\\
	 \\\\
	}}}
	\\end{minipage}
	
	%\\\\
	\\vspace{2mm}
	
	Puis remplir les cases des trois premières lettres de votre \\textbf{nom de famille} PUIS des deux premières lettres de votre \\textbf{prénom}
	\\vspace{1mm}
	
	\\def\\AMCchoiceLabelFormat##1{\\textcolor{black!70}{{\\tiny ##1}}}  % pour alléger la couleur des lettres dans les cases et les réduire
	\\AMCcodeGrid[h]{ID}{ABCDEFGHIJKLMNOPQRSTUVWXYZ,
	ABCDEFGHIJKLMNOPQRSTUVWXYZ,
	ABCDEFGHIJKLMNOPQRSTUVWXYZ,
	ABCDEFGHIJKLMNOPQRSTUVWXYZ,
	ABCDEFGHIJKLMNOPQRSTUVWXYZ}
	`
	let entete_type_champnom_simple=	`\\begin{minipage}{10cm}
	\\champnom{\\fbox{\\parbox{10cm}{    
	  Écrivez vos nom, prénom et classe : \\\\
	 \\\\
	}}}
	\\end{minipage}
	
	%\\\\
	\\vspace{2mm}
	`
	let entete_type_preremplie=`\\begin{center}
	\\noindent{}\\fbox{\\vspace*{3mm}
			 \\Large\\bf\\nom{}~\\prenom{}\\normalsize{}% 
			  \\vspace*{3mm}
		  }
	\\end{center}\n`

	let entete_copie=''
	if (type_entete=="AMCassociation"){
	entete_copie+=`\\newcommand{\\sujet}{\n`
	}
	entete_copie +=` 
	%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	%%%% -II-b. MISE EN PAGE DU QCM %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	
	%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	\\exemplaire{${nb_exemplaires}}{   % <======  /!\\ PENSER À ADAPTER /!\\  ==  %
	%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	\n`
	if (format=='A3') {
		entete_copie+=`\\begin{multicols}{2}\n`
	}
	entete_copie+=`
	%%%%% EN-TÊTE, IDENTIFICATION AUTOMATIQUE DE L'ÉLÈVE %%%%%
	
	\\vspace*{-17mm}
	
	%%%%% INTRODUCTION ÉVENTUELLE %%%%%
	
	\\vspace{5mm}
	%\\noindent\\AMCcode{num.etud}{8}\\hspace*{\\fill} % Pour la version "verticale"
	%\\noindent\\AMCcodeH{num.etud}{8}	 % version "horizontale"
	\\begin{minipage}{7cm}
	\\begin{center} 
		\\textbf{${matiere}}
		
		\\textbf{${titre}} 
	\\end{center}
	\\end{minipage}
	\\hfill\n`
	if (type_entete=="AMCassociation"){
		entete_copie+=entete_type_preremplie
	}
	else if (type_entete=="AMCcodeGrid"){
		entete_copie+=entete_type_CodeGrid
	}
	else {
		entete_copie+=entete_type_champnom_simple
	}
	entete_copie+=
	`\n{\\footnotesize REMPLIR avec un stylo NOIR la ou les cases pour chaque question. Si vous devez modifier un choix, NE PAS chercher à redessiner la case cochée par erreur, mettez simplement un coup de "blanc" dessus.
	
	Les questions précédées de \\multiSymbole peuvent avoir plusieurs réponses.\\\\ Les questions qui commencent par \\TT ne doivent pas être faites par les élèves disposant d'un tiers temps.
	
	→ Il est fortement conseillé de faire les calculs dans sa tête ou sur la partie blanche de la feuille sans regarder les solutions proposées avant de remplir la bonne case plutôt que d'essayer de choisir entre les propositions (ce qui demande de toutes les examiner et prend donc plus de temps) ←}
	
	`

	// Ici On ajoute les commandes pour insérer les questions issues des groupes en quantité selon le nb_question[i]
	// nb_question est un tableau passé en paramètre à la fonction creer_document_AMC pour déterminer le nombre de questions à restituer par groupe.
	// si ce nombre est 0, on restitue toutes les questions du groupe
	let contenu_copie=''
	if (type_entete=="AMCcodeGrid"){
		contenu_copie +=`		\\def\\AMCchoiceLabel##1{}`
		}
	for (let g of groupeDeQuestions) {
		let i = groupeDeQuestions.indexOf(g)
		contenu_copie += `
	\\begin{center}
		\\hrule
		\\vspace{2mm}
		\\bf\\Large ${titre_question[i]}
		\\vspace{1mm}
		\\hrule
	\\end{center}\n`
		if (nb_questions[i] > 0) {
			contenu_copie += `\\restituegroupe[${nb_questions[i]}]{${g}}\n\n`
		}
		else {
			contenu_copie += `\\restituegroupe{${g}}\n\n`
		}

	}
	if (format=='A3'){
		contenu_copie+=`\\end{multicols}\n`
	}
	if (type_entete=="AMCassociation"){
		contenu_copie+=`\\AMCassociation{\\id}\n
	  }
	}\n`
	}
	else {
		contenu_copie+=`}\n`
	}

	// On assemble les différents morceaux et on retourne le résultat
	code_latex = preambule + '\n' + debut_document + '\n' + entete_copie + contenu_copie
	if (type_entete=="AMCassociation"){
		code_latex+=`\n \n \\csvreader[head to column names]{liste.csv}{}{\\sujet}\n`
	}
	code_latex+=`\\end{document}\n`
	return code_latex
}

