import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,calcul,choisit_lettres_differentes,lettre_depuis_chiffre,arcenciel,tex_nombre} from "/modules/outils.js"
import {point,tracePoint,labelPoint,segment,dansLaCibleCarree,cibleCarree,homothetie,longueur,mathalea2d} from "/modules/2d.js"
/**
* Construction d'images par homothétie avec dispositif d'auto-correction aléatoire
* Ref 3G11
* @Auteur Jean-Claude Lhote
* Publié le 30/11/2020
*/
export default function Construire_homothetie_point_3e() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Construire l'image d'un point par une homothetie avec cible auto-corrective";
	this.consigne = "";
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 3;
	this.nouvelle_version = function () {
		let nontrouve,assezloin,cible,s
		let k = randint(-4, 4, [0, -2, 2]) / 2;
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let result = [0, 0], texte_corr = "", nbpoints = parseInt(this.sup);
		let celluleAlea = function (rang) {
			let lettre = lettre_depuis_chiffre(randint(1, rang));
			let chiffre = Number(randint(1, rang)).toString();
			return lettre + chiffre;
		};
		// On prépare la figure...
		let O = point(0, 0, 'O');
		let noms = choisit_lettres_differentes(nbpoints, 'QO',  true);
		this.consigne = `Construire l\'image des points $${noms[0]}$`;
		for (let i = 1; i < nbpoints - 1; i++) {
			this.consigne += `, $${noms[i]}$`;
		}
		this.consigne += ` et $${noms[nbpoints - 1]}$ par l\'homothétie de centre $O$`;
		this.consigne += ` et de rapport $${tex_nombre(k)}$.`;
		let cibles = [], M = [], N = [], objets_enonce = [], objets_correction = []; //cibles, M point marqués, N symétrique de M
		let cellules = [];
		let xMin, yMin, xMax, yMax;
		[xMin, yMin, xMax, yMax] = [0, 0, 0, 0];
		for (let i = 0; i < nbpoints; i++) { //On place les cibles.
			N.push(point(calcul(randint(-80, 80, 0) / 10), calcul(randint(-80, 80, 0) / 10), noms[i] + "\'"));
			nontrouve = true;
			while (longueur(N[i], O) < 3 || nontrouve) {
				nontrouve = true;
				if (longueur(N[i], O) < 3) {
					N[i].x = calcul(randint(-80, 80, 0) / 10);
					N[i].y = calcul(randint(-80, 80, 0) / 10);
				}
				else {
					assezloin = true;
					for (let j = 0; j < i; j++) {
						if (longueur(N[i], N[j]) < 4.5)
							assezloin = false;
					}
					if (assezloin == false) { //éloigner les points donc les grilles
						N[i].x = calcul(randint(-80, 80, 0) / 10);
						N[i].y = calcul(randint(-80, 80, 0) / 10);
					}
					else
						nontrouve = false;
				}
			}
		}

		objets_enonce.push(tracePoint(O), labelPoint(O));
		objets_correction.push(tracePoint(O), labelPoint(O));

		for (let i = 0; i < nbpoints; i++) {
			cellules.push(celluleAlea(4));
			result = dansLaCibleCarree(N[i].x, N[i].y, 4, 0.6, cellules[i]);
			cible = cibleCarree({ x: result[0], y: result[1], rang: 4, num: i + 1, taille: 0.6 });
			cible.taille = 0.6;
			cible.color = 'orange';
			cible.opacite = 0.7;
			cibles.push(cible);
		}
		for (let i = 0; i < nbpoints; i++) {
			M.push(homothetie(N[i], O, 1 / k, noms[i]));
			objets_enonce.push(tracePoint(M[i]), labelPoint(M[i]), cibles[i]);
			objets_correction.push(tracePoint(M[i], N[i]), labelPoint(M[i], N[i]), cibles[i]);
			if (k<0) {
				s = segment(M[i], N[i]);
			}
			else {
				s = segment(O, N[i]);
			}
			s.color = arcenciel(i);
			objets_correction.push(s);
			texte_corr += `$${noms[i]}\'$, l\'image du point $${noms[i]}$ est dans la case ${cellules[i]} de la grille ${i + 1}.<br>`;
		}

		for (let i = 0; i < nbpoints; i++) {
			xMin = Math.min(xMin, N[i].x - 3, M[i].x - 3);
			yMin = Math.min(yMin, N[i].y - 3, M[i].y - 3);
			xMax = Math.max(xMax, N[i].x + 3, M[i].x + 3);
			yMax = Math.max(yMax, N[i].y + 3, M[i].y + 3);
		}

		let fenetreMathalea2d = [xMin, yMin, xMax, yMax];

		this.liste_questions.push(mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 0.7 }, objets_enonce));
		this.liste_corrections.push(texte_corr + mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 0.7 }, objets_correction));
		liste_de_question_to_contenu(this);

		//  let nonchoisi,coords=[],x,y,objets_enonce=[],objets_correction=[],nomd,label_pos
	};
	this.besoin_formulaire_numerique = ['Nombre de points (1 à 5)', 5, "1\n2\n3\n4\n5"];
	// this.besoin_formulaire2_case_a_cocher = ["Avec des points de part et d'autre"];	
}
