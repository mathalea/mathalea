import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,shuffle,calcul,tex_nombrec,tex_nombre,texte_en_couleur,Triangles} from "/modules/outils.js"


/**
 * Constructibilité des triangles
 * Préciser ici les numéros des exos
 * 5G2 exercice parent il faudra supprimmer la version beta5G2 de la liste des choix du fichier mathalea_exercices.js
 * 5G21-1
 * 5G31-1
 * Dans ces exercices je me servais de this.beta pour faire passer l'exo de beta.html à mathalea.html
 * this.beta pouvait prendre la valeur 'beta' ou '', tous les autres this.beta sont devenus des this.debug
 * Mise à jour le 2021-01-25
 * @author Sébastien Lozano
 */
export default function Constructibilite_des_triangles() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()	
	this.sup = 1;
	if (this.exo == this.beta + '5G21-1') { // via longueurs
		this.titre = `Constructibilité des triangles via les longueurs`;
		this.consigne = `Justifier si les longueurs données permettent de construire le triangle.`;
		this.consigne += `<br>Dire si tous les élèves qui doivent construire ce triangle auront la même figure.`;

	} else if (this.exo == this.beta + '5G31-1') { //via angles
		this.titre = `Constructibilité des triangles via les angles`;
		this.consigne = `Justifier si les angles donnés permettent de construire le triangle.`;
		this.consigne += `<br>Dire si tous les élèves qui doivent construire ce triangle auront la même figure.`;
	} else {
		this.titre = "Constructibilité des triangles";
		this.consigne = `Justifier si les longueurs ou les angles donnés permettent de construire le triangle.`;
		this.consigne += `<br>Dire si tous les élèves qui doivent construire ce triangle auront la même figure.`;

	};

	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.nb_questions_modifiable = false;

	this.liste_packages = `bclogo`;

	let type_de_questions_disponibles;

	this.nouvelle_version = function () {

		if (this.exo == this.beta + '5G21-1') { // via longueurs
			if (this.sup == 1) {
				type_de_questions_disponibles = shuffle([1, 2, 3]);				
				this.nb_questions = type_de_questions_disponibles.length;
			} else if (this.sup == 2) {
				type_de_questions_disponibles = [choice([1, 2, 3]), 4];
				this.nb_questions = type_de_questions_disponibles.length;
			};
		} else if (this.exo == this.beta + '5G31-1') { //via angles
			if (this.sup == 1) {
				type_de_questions_disponibles = shuffle([5, 6, 7]);
				this.nb_questions = type_de_questions_disponibles.length;
			} else if (this.sup == 2) {
				type_de_questions_disponibles = [choice([5, 6, 7]), 8];
				this.nb_questions = type_de_questions_disponibles.length;
			};
		} else {
			type_de_questions_disponibles = [1, 2, 3, 4, 5, 6, 7, 8];
			this.nb_questions = type_de_questions_disponibles.length;
		};

		//let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		let liste_type_de_questions = type_de_questions_disponibles; // Tous les types de questions sont posées --> à remettre comme ci dessus

		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		for (let i = 0, texte, texte_corr, l1, l2, l3, a1, a2, a3, cpt = 0; i < this.nb_questions && cpt < 50;) {

			// on fixe longueur min et max en cm
			let l_min = 2;
			let l_max = 20;
			// on fixe angle min et max en degré
			let a_min = 0;
			let a_max = 180;

			// on crée un objet triangle 
			let triangle = new Triangles();
			// on crée un tableau pour le triangle courant
			let current_triangle = [];

			switch (liste_type_de_questions[i]) {
				case 1: // 3 longueurs constructible
					while (!triangle.isTrueTriangleLongueurs()) {
						l1 = randint(l_min, l_max);
						l2 = randint(l_min, l_max);
						l3 = randint(l_min, l_max);
						triangle.l1 = l1;
						triangle.l2 = l2;
						triangle.l3 = l3;
					};
					texte = `${triangle.getNom()} tel que ${triangle.getLongueurs()[0]} $= ${triangle.l1}$ cm ; `;
					texte += `${triangle.getLongueurs()[1]} $= ${triangle.l2}$ cm et ${triangle.getLongueurs()[2]} $= ${triangle.l3}$ cm.`;
					// on crée l'objet longueurs + valeurs des côtés du triangle
					for (let i = 0; i < 3; i++) {
						current_triangle.push({ longueur: triangle.getLongueurs()[i], cote: triangle.getCotes()[i], valeur: triangle.getLongueursValeurs()[i] });
					};
					// on trie les couples longueurs/valeurs du triangle selon les valeurs croissantes.
					current_triangle.sort(function (a, b) {
						return a.valeur - b.valeur;
					});
					texte_corr = `Supposons que l'on puisse construire un triangle ${triangle.getNom()} avec ces mesures.`;
					texte_corr += `<br>Dans le triangle ${triangle.getNom()}, ${current_triangle[2].cote} qui mesure $${current_triangle[2].valeur}$ cm est le plus grand côté.`;
					texte_corr += `<br> De plus ${current_triangle[0].longueur} + ${current_triangle[1].longueur} = $${current_triangle[0].valeur}$ cm + $${current_triangle[1].valeur}$ cm = $${calcul(current_triangle[0].valeur + current_triangle[1].valeur)}$ cm.`;
					texte_corr += `<br> On constate que ${current_triangle[0].longueur} + ${current_triangle[1].longueur} > ${current_triangle[2].longueur}.`;
					texte_corr += `<br> ${texte_en_couleur('On peut donc construire le triangle ' + triangle.getNom())}.`;
					texte_corr += `<br><br>  Si on considère que le triangle nommé dans le sens des aiguilles d'une montre et celui nommé dans le sens inverse sont différents, ${texte_en_couleur('plusieurs tels triangles existent')}.`;
					texte_corr += `<br> Ils sont obtenus les uns à partir des autres par symétire axiale par rapport à un des côtés.`;
					break;
				case 2: // 3 longueurs plat
					while (!triangle.isPlatTriangleLongueurs()) {
						l1 = randint(l_min, l_max);
						l2 = randint(l_min, l_max);
						l3 = calcul(l1 + l2);
						triangle.l1 = l1;
						triangle.l2 = l2;
						triangle.l3 = l3;
					};
					texte = `${triangle.getNom()} tel que ${triangle.getLongueurs()[0]} $ = ${triangle.l1}$ cm ; `;
					texte += `${triangle.getLongueurs()[1]} $= ${triangle.l2}$ cm et ${triangle.getLongueurs()[2]} $= ${triangle.l3}$ cm.`;
					// on crée l'objet longueurs + valeurs des côtés du triangle
					for (let i = 0; i < 3; i++) {
						current_triangle.push({ longueur: triangle.getLongueurs()[i], cote: triangle.getCotes()[i], valeur: triangle.getLongueursValeurs()[i] });
					};
					// on trie les couples longueurs/valeurs du triangle selon les valeurs croissantes.
					current_triangle.sort(function (a, b) {
						return a.valeur - b.valeur;
					});
					texte_corr = `Supposons que l'on puisse construire un triangle ${triangle.getNom()} avec ces mesures.`;
					texte_corr += `<br>Dans le triangle ${triangle.getNom()}, ${current_triangle[2].cote} qui mesure $${current_triangle[2].valeur}$ cm est le plus grand côté.`;
					texte_corr += `<br> De plus ${current_triangle[0].longueur} + ${current_triangle[1].longueur} = $${current_triangle[0].valeur}$ cm + $${current_triangle[1].valeur}$ cm = $${current_triangle[2].valeur}$ cm aussi.`;
					texte_corr += `<br> ${texte_en_couleur('On peut donc construire le triangle ' + triangle.getNom() + ' c\'est un triangle plat')}.`;
					texte_corr += `<br><br>${texte_en_couleur('Un seul triangle de ce type existe')}, il s'agit du segment ${current_triangle[2].cote} sur lequel on place le point `;
					if ((current_triangle[0].longueur.split('')[2] == current_triangle[2].cote.split('')[1]) || (current_triangle[0].longueur.split('')[2] == current_triangle[2].cote.split('')[2])) {
						texte_corr += `${current_triangle[0].longueur.split('')[1]}`;
					} else {
						texte_corr += `${current_triangle[0].longueur.split('')[2]}`;
					};
					texte_corr += `.`;
					//`${current_triangle[0].longueur.split('')[2]}.`;				
					break;
				case 3: // 3 longueurs non constructible
					// on initialise les longueurs sinon la méthode isTrueTriangleLongueurs() renvoie false!
					l1 = randint(l_min, l_max);
					l2 = randint(l_min, l_max);
					l3 = randint(l_min, l_max);
					triangle.l1 = l1;
					triangle.l2 = l2;
					triangle.l3 = l3;

					while (triangle.isTrueTriangleLongueurs() || triangle.isPlatTriangleLongueurs()) {
						l1 = randint(l_min, l_max);
						l2 = randint(l_min, l_max);
						l3 = randint(l_min, l_max);
						triangle.l1 = l1;
						triangle.l2 = l2;
						triangle.l3 = l3;
					};
					texte = `${triangle.getNom()} tel que ${triangle.getLongueurs()[0]} $= ${triangle.l1}$ cm ; `;
					texte += `${triangle.getLongueurs()[1]} $= ${triangle.l2}$ cm et ${triangle.getLongueurs()[2]} $= ${triangle.l3}$ cm.`;
					// on crée l'objet longueurs + valeurs des côtés du triangle
					for (let i = 0; i < 3; i++) {
						current_triangle.push({ longueur: triangle.getLongueurs()[i], cote: triangle.getCotes()[i], valeur: triangle.getLongueursValeurs()[i] });
					};
					// on trie les couples longueurs/valeurs du triangle selon les valeurs croissantes.
					current_triangle.sort(function (a, b) {
						return a.valeur - b.valeur;
					});
					texte_corr = `Supposons que l'on puisse construire un triangle ${triangle.getNom()} avec ces mesures.`;
					texte_corr += `<br>Dans le triangle ${triangle.getNom()}, ${current_triangle[2].cote} qui mesure $${current_triangle[2].valeur}$ cm est le plus grand côté.`;
					texte_corr += `<br> De plus ${current_triangle[0].longueur} + ${current_triangle[1].longueur} = $${current_triangle[0].valeur}$ cm + $${current_triangle[1].valeur}$ cm = $${calcul(current_triangle[0].valeur + current_triangle[1].valeur)}$ cm.`;
					texte_corr += `<br> On constate que ${current_triangle[0].longueur} + ${current_triangle[1].longueur} < ${current_triangle[2].longueur}, les longueurs données ne permettent donc pas de satisfaire à l'inégalité triangulaire.`;
					texte_corr += `<br> ${texte_en_couleur('On ne peut donc pas construire le triangle ' + triangle.getNom())}.`;
					texte_corr += `<br><br>  ${texte_en_couleur('Aucun triangle de ce type n\'existe')}.`;
					break;
				case 4: // 2 longueurs et le périmètre
					// on utilise la méthode isTrueTriangleLongueurs(), le triangle ne sera pas plat.
					while (!triangle.isTrueTriangleLongueurs()) {
						l1 = randint(l_min, l_max);
						l2 = randint(l_min, l_max);
						l3 = randint(l_min, l_max);
						triangle.l1 = l1;
						triangle.l2 = l2;
						triangle.l3 = l3;
					};
					texte = `${triangle.getNom()} tel que ${triangle.getLongueurs()[0]} $= ${triangle.l1}$ cm ; `;
					texte += `${triangle.getLongueurs()[1]} $= ${triangle.l2}$ cm et dont le périmètre vaut $${triangle.getPerimetre()}$ cm.`;
					// on crée l'objet longueurs + valeurs des côtés du triangle
					for (let i = 0; i < 3; i++) {
						current_triangle.push({ longueur: triangle.getLongueurs()[i], cote: triangle.getCotes()[i], valeur: triangle.getLongueursValeurs()[i] });
					};
					// on trie les couples longueurs/valeurs du triangle selon les valeurs croissantes.
					current_triangle.sort(function (a, b) {
						return a.valeur - b.valeur;
					});
					texte_corr = `Supposons que l'on puisse construire un triangle ${triangle.getNom()} avec ces mesures.`;
					texte_corr += `<br>Puisque le périmètre vaut $${triangle.getPerimetre()}$ cm alors la troisième longueur vaut ${triangle.getLongueurs()[2]} = $${triangle.getPerimetre()}$ cm - $${triangle.l1}$ cm - $${triangle.l2}$ cm = $${triangle.l3}$ cm.`;
					texte_corr += `<br> Donc dans le triangle ${triangle.getNom()}, ${current_triangle[2].cote} qui mesure $${current_triangle[2].valeur}$ cm est le plus grand côté.`;
					texte_corr += `<br> De plus ${current_triangle[0].longueur} + ${current_triangle[1].longueur} = $${current_triangle[0].valeur}$ cm + $${current_triangle[1].valeur}$ cm = $${calcul(current_triangle[0].valeur + current_triangle[1].valeur)}$ cm.`;
					texte_corr += `<br> On constate que ${current_triangle[0].longueur} + ${current_triangle[1].longueur} > ${current_triangle[2].longueur}`;
					texte_corr += `<br> ${texte_en_couleur('On peut donc construire le triangle ' + triangle.getNom())}.`;
					// texte_corr += `<br><br>  Si on considère que le triangle nommé dans le sens des aiguilles d'une montre et celui nommé dans le sens inverse sont différents, ${texte_en_couleur('deux tels triangles existent')}.`;
					// texte_corr += `<br> Les deux étant obtenus l'un à partir de l'autre par symétire axiale.`;
					texte_corr += `<br><br>  Si on considère que le triangle nommé dans le sens des aiguilles d'une montre et celui nommé dans le sens inverse sont différents, ${texte_en_couleur('plusieurs tels triangles existent')}.`;
					texte_corr += `<br> Ils sont obtenus les uns à partir des autres par symétire axiale par rapport à un des côtés.`;
					break;
				case 5: //3 angles constructible
					while (!triangle.isTrueTriangleAngles()) {
						a1 = randint(a_min, a_max, [0, 180]);
						a2 = randint(a_min, a_max, [0, 180]);
						a3 = calcul(180 - a1 - a2);
						triangle.a1 = a1;
						triangle.a2 = a2;
						triangle.a3 = a3;
					};
					texte = ``;
					texte_corr = ``;
					texte = `${triangle.getNom()} tel que ${triangle.getAngles()[0]} $= ${triangle.a1}\\degree$ ; `;
					texte += `${triangle.getAngles()[1]} $= ${triangle.a2}\\degree$ et ${triangle.getAngles()[2]} $= ${triangle.a3}\\degree$.`;
					// on crée l'objet longueurs + valeurs des côtés du triangle
					for (let i = 0; i < 3; i++) {
						current_triangle.push({ angle: triangle.getAngles()[i], valeur: triangle.getAnglesValeurs()[i] });
					};
					// on trie les couples longueurs/valeurs du triangle selon les valeurs croissantes.
					current_triangle.sort(function (a, b) {
						return a.valeur - b.valeur;
					});
					texte_corr = `Supposons que l'on puisse construire un triangle ${triangle.getNom()} avec ces mesures.`;
					texte_corr += `<br>Dans le triangle ${triangle.getNom()}, ${current_triangle[0].angle} + ${current_triangle[1].angle} + ${current_triangle[2].angle} = $${current_triangle[0].valeur}\\degree + ${current_triangle[1].valeur}\\degree + ${current_triangle[2].valeur}\\degree = ${calcul(current_triangle[0].valeur + current_triangle[1].valeur + current_triangle[2].valeur)}\\degree$.`;
					texte_corr += `<br> On constate que la somme des trois angles du triangle vaut bien $180\\degree$.`;
					texte_corr += `<br> ${texte_en_couleur('On peut donc construire le triangle ' + triangle.getNom())}.`;
					texte_corr += `<br><br>  ${texte_en_couleur('Il existe une infinité de triangles avec ces mesures.')}`;
					texte_corr += `<br> On les obtient les uns à partir des autres par un agrandissement ou une réduction.`;
					break;
				case 6: // 3 angles plat
					while (!triangle.isPlatTriangleAngles()) {
						a1 = randint(a_min, a_max);
						a2 = randint(a_min, a_max);
						a3 = calcul(180 - a1 - a2);
						triangle.a1 = a1;
						triangle.a2 = a2;
						triangle.a3 = a3;
					};
					texte = ``;
					texte_corr = ``;
					texte = `${triangle.getNom()} tel que ${triangle.getAngles()[0]} $= ${triangle.a1}\\degree$ ; `;
					texte += `${triangle.getAngles()[1]} $= ${triangle.a2}\\degree$ et ${triangle.getAngles()[2]} $= ${triangle.a3}\\degree$.`;
					// on crée l'objet longueurs + valeurs des côtés du triangle
					for (let i = 0; i < 3; i++) {
						current_triangle.push({ angle: triangle.getAngles()[i], valeur: triangle.getAnglesValeurs()[i] });
					};
					// on trie les couples longueurs/valeurs du triangle selon les valeurs croissantes.
					current_triangle.sort(function (a, b) {
						return a.valeur - b.valeur;
					});
					texte_corr = `Supposons que l'on puisse construire un triangle ${triangle.getNom()} avec ces mesures.`;
					texte_corr += `<br>Dans le triangle ${triangle.getNom()}, ${current_triangle[0].angle} + ${current_triangle[1].angle} + ${current_triangle[2].angle} = $${current_triangle[0].valeur}\\degree + ${current_triangle[1].valeur}\\degree + ${current_triangle[2].valeur}\\degree = ${calcul(current_triangle[0].valeur + current_triangle[1].valeur + current_triangle[2].valeur)}\\degree$.`;
					texte_corr += `<br> On constate que la somme des trois angles du triangle vaut bien $180\\degree$.`;
					texte_corr += `<br> ${texte_en_couleur('On peut donc construire le triangle ' + triangle.getNom())}.`;
					texte_corr += `<br> Deux des trois angles du triangle valent $0\\degree$, ${texte_en_couleur(triangle.getNom() + ' est donc un triangle plat')}.`;
					texte_corr += `<br><br>  ${texte_en_couleur('Il existe une infinité de triangles avec ces mesures.')}`;
					texte_corr += `<br> On les obtient en traçant des segments et en plaçant le troisième sommet sur ce segment, les longueurs n'ayant aucune importance.`;
					texte_corr += `<br> Dans le cas présent, il s'agit d'un segment $[${current_triangle[2].angle.split('')[12]}${current_triangle[2].angle.split('')[14]}]$ sur lequel on place un point ${current_triangle[2].angle.split('')[13]}.`;
					//texte_corr += `<br> ${JSON.stringify(current_triangle)}`;
					break;
				case 7: // 3 angles non constructible
					// on initialise les angles sinon la méthode isTrueTriangleAngles() renvoie false!
					a1 = randint(a_min, a_max);
					a2 = randint(a_min, a_max);
					a3 = randint(a_min, a_max);
					triangle.a1 = a1;
					triangle.a2 = a2;
					triangle.a3 = a3;
					while (triangle.isTrueTriangleAngles()) {
						a1 = randint(a_min, a_max);
						a2 = randint(a_min, a_max);
						a3 = randint(a_min, a_max);
						triangle.a1 = a1;
						triangle.a2 = a2;
						triangle.a3 = a3;
					};
					texte = `${triangle.getNom()} tel que ${triangle.getAngles()[0]} $= ${triangle.a1}\\degree$ ; `;
					texte += `${triangle.getAngles()[1]} $= ${triangle.a2}\\degree$ et ${triangle.getAngles()[2]} $= ${triangle.a3}\\degree$.`;
					// on crée l'objet longueurs + valeurs des côtés du triangle
					for (let i = 0; i < 3; i++) {
						current_triangle.push({ angle: triangle.getAngles()[i], valeur: triangle.getAnglesValeurs()[i] });
					};
					// on trie les couples longueurs/valeurs du triangle selon les valeurs croissantes.
					current_triangle.sort(function (a, b) {
						return a.valeur - b.valeur;
					});
					texte_corr = `Supposons que l'on puisse construire un triangle ${triangle.getNom()} avec ces mesures.`;
					texte_corr += `<br>Dans le triangle ${triangle.getNom()}, ${current_triangle[0].angle} + ${current_triangle[1].angle} + ${current_triangle[2].angle} = $${current_triangle[0].valeur}\\degree + ${current_triangle[1].valeur}\\degree + ${current_triangle[2].valeur}\\degree = ${calcul(current_triangle[0].valeur + current_triangle[1].valeur + current_triangle[2].valeur)}\\degree$.`;
					texte_corr += `<br> Si le triangle était constructible, la somme des trois angles vaudrait $180\\degree$,`;
					texte_corr += ` or ce n'est pas le cas.`;
					texte_corr += `<br> ${texte_en_couleur('On ne peut donc pas construire le triangle ' + triangle.getNom())}.`;
					texte_corr += `<br><br>  ${texte_en_couleur('Aucun triangle de ce type n\'existe')}.`;
					break;
				case 8: // 2 angles et le 3e fonction du 1er ou du 2eme
					let angle_rg = randint(0, 1);
					let operations_possibles = ['triple', 'quadruple', 'quart'];
					let operation = '';
					texte = ``;
					texte_corr = ``;
					texte_corr = `Supposons que l'on puisse construire un triangle ${triangle.getNom()} avec ces mesures.`;
					switch (angle_rg) {
						case 0:
							a1 = randint(a_min, a_max);
							triangle.a1 = a1;
							operation = operations_possibles[randint(0, 2)];
							texte += `${triangle.getNom()} tel que ${triangle.getAngles()[0]} $= ${tex_nombre(triangle.a1)}\\degree$ ; `;
							switch (operation) {
								case 'triple':
									a2 = calcul((180 - a1) / 4);
									a3 = calcul(3 * a2);
									break;
								case 'quadruple':
									a2 = calcul((180 - a1) / 5);
									a3 = calcul(4 * a2);
									break;
								case 'quart':
									a2 = calcul(4 * (180 - a1) / 5);
									a3 = calcul(a2 / 4);
									break;
							};
							triangle.a2 = a2;
							triangle.a3 = a3;
							texte += `${triangle.getAngles()[1]} $= ${tex_nombre(triangle.a2)}\\degree$ et ${triangle.getAngles()[2]} est le ${operation} de ${triangle.getAngles()[1]}.`;
							// on crée l'objet longueurs + valeurs des côtés du triangle
							for (let i = 0; i < 3; i++) {
								current_triangle.push({ angle: triangle.getAngles()[i], valeur: triangle.getAnglesValeurs()[i] });
							};
							texte_corr += `<br>Dans le triangle ${triangle.getNom()}, ${current_triangle[2].angle} est le ${operation} de ${current_triangle[1].angle} = $${tex_nombre(current_triangle[1].valeur)}\\degree$  d'où ${current_triangle[2].angle} = $${tex_nombre(current_triangle[2].valeur)}\\degree$.`;
							break;
						case 1:
							a2 = randint(a_min, a_max);
							triangle.a2 = a2;
							operation = operations_possibles[randint(0, 2)];
							texte += `${triangle.getNom()} tel que ${triangle.getAngles()[1]} $= ${tex_nombre(triangle.a2)}\\degree$ ; `;
							switch (operation) {
								case 'triple':
									a1 = calcul((180 - a2) / 4);
									a3 = calcul(3 * a1);
									break;
								case 'quadruple':
									a1 = calcul((180 - a2) / 5);
									a3 = calcul(4 * a1);
									break;
								case 'quart':
									a1 = calcul(4 * (180 - a2) / 5);
									a3 = calcul(a1 / 4);
									break;
							};
							triangle.a1 = a1;
							triangle.a3 = a3;
							texte += `${triangle.getAngles()[0]} $= ${tex_nombre(triangle.a1)}\\degree$ et ${triangle.getAngles()[2]} est le ${operation} de ${triangle.getAngles()[0]}.`;
							// on crée l'objet longueurs + valeurs des côtés du triangle
							for (let i = 0; i < 3; i++) {
								current_triangle.push({ angle: triangle.getAngles()[i], valeur: triangle.getAnglesValeurs()[i] });
							};
							texte_corr += `<br>Dans le triangle ${triangle.getNom()}, ${current_triangle[2].angle} est le ${operation} de ${current_triangle[0].angle} = $${tex_nombre(current_triangle[0].valeur)}\\degree$  d'où ${current_triangle[2].angle} = $${tex_nombre(current_triangle[2].valeur)}\\degree$.`;
							break;
					};
					texte_corr += `<br>Donc ${current_triangle[0].angle} + ${current_triangle[1].angle} + ${current_triangle[2].angle} = $${tex_nombre(current_triangle[0].valeur)}\\degree + ${tex_nombre(current_triangle[1].valeur)}\\degree + ${tex_nombre(current_triangle[2].valeur)}\\degree = ${tex_nombrec(current_triangle[0].valeur + current_triangle[1].valeur + current_triangle[2].valeur)}\\degree$.`;
					texte_corr += `<br> On constate que la somme des trois angles du triangle vaut bien $180\\degree$.`;
					texte_corr += `<br> ${texte_en_couleur('On peut donc construire le triangle ' + triangle.getNom())}.`;
					texte_corr += `<br><br>  ${texte_en_couleur('Il existe une infinité de triangles avec ces mesures.')}`;
					texte_corr += `<br> On les obtient les uns à partir des autres par un agrandissement ou une réduction.`;
					break;
			}
			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	};
	if (this.exo == this.beta + '5G21-1') {
		this.besoin_formulaire_numerique = ['Niveau de difficulté', 2, "1 : 3 longueurs\n2 : 2 longueurs et le périmètre"];
	} else if (this.exo == this.beta + '5G31-1') {
		this.besoin_formulaire_numerique = ['Niveau de difficulté', 2, "1 : 3 angles\n2 : 2 angles et le 3e en fonction du 1er ou du 2eme"];
	} else {
		//this.besoin_formulaire_numerique = ['Niveau de difficulté',2,"1 : sans conversions de longueurs\n2 : avec conversions de longueurs"];
	};
}
