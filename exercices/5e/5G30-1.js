import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,arrondi,choisit_lettres_differentes,mise_en_evidence,num_alpha} from "/modules/outils.js"
import {point,pointSurSegment,pointIntersectionDD,labelPoint,droite,droiteParPointEtParallele,rotation,similitude,codeAngle,longueur,angle,mathalea2d} from "/modules/2d.js"

/**
 * Déterminer des angles en utilisant les cas d'égalités : opposés par le sommet, alternes-internes, correspondants...
 * ref 5G30-1
 * publié le 14/11/2020
 * @Auteur Jean-Claude Lhote Inspiré d'exercices du manuel sésamath.
 */
export default function Egalite_d_angles() {
	"use strict";
	Exercice.call(this);
	this.sup = 1;
	this.nb_questions = 1;
	if (sortie_html) {
		this.spacing = 2;
		this.spacing_corr = 3;
	}
	else {
		this.spacing = 2;
		this.spacing_corr = 2;
	}
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.titre = "Déterminer des angles en utilisant les cas d'égalité";
	this.nouvelle_version = function () {
		this.liste_questions = [];
		this.liste_corrections = [];
		this.consigne = "Cet exercice est inspiré d'un exercice du manuel sésamath 5e";
		let figure = [], choix;
		let fig1 = function () {
			let A, B, C, D, E, a, ac, ce, c, AE, BD, CA, CE, c1, c2, c3, c4, c5, m1, m2, l1, objets = [], enonce, correction, params;
			let noms = choisit_lettres_differentes(5, 'Q', true), gras;
			sortie_html ? gras = "#f15929" : gras = `black`;
			A = point(0, 0, noms[0], 'above left');
			a = randint(45, 85);
			ac = randint(8, 10);
			ce = randint(7, 10, ac);
			C = similitude(rotation(point(1, 0), A, randint(-45, 45)), A, a, ac, noms[2], 'left');
			c = randint(45, 70);
			E = similitude(A, C, c, ce / ac, noms[4], 'above right');
			CA = droite(C, A);
			CE = droite(C, E);
			AE = droite(A, E, '', 'grey');
			AE.epaisseur = 2;
			B = pointSurSegment(A, C, randint(3, ac - 4), noms[1], 'above left');
			BD = droiteParPointEtParallele(B, AE, '', 'grey');
			BD.epaisseur = 2;
			D = pointIntersectionDD(BD, CE, noms[3], 'above right');
			m1 = codeAngle(E, A, C, 1, '', 'black', 2, 1, 'black', 0.1, true);
			m2 = codeAngle(A, C, E, 1, '', 'black', 2, 1, 'black', 0.1, true);
			l1 = labelPoint(A, B, C, D, E);
			c1 = codeAngle(D, B, A, 1, '', 'blue', 2, 1, 'blue');
			c2 = codeAngle(B, D, E, 1, '', 'orange', 2, 1, 'orange');
			c3 = codeAngle(D, E, A, 1, '', 'green', 2, 1, 'green');
			c4 = codeAngle(D, B, C, 1, '', 'pink', 2, 1, 'pink');
			c5 = codeAngle(C, D, B, 1, '', 'red', 2, 1, 'red');
			objets.push(CA, CE, AE, BD, m1, m2, c1, c2, c3, c4, c5, l1);
			a = Math.round(angle(E, A, C));
			enonce = `Dans la figure ci-dessous,  les droites $(${noms[0]}${noms[4]})$ et $(${noms[1]}${noms[3]})$ sont parallèles.<br>`;
			enonce += `On veut déterminer la mesure des angles du quadrilatère $${noms[0]}${noms[1]}${noms[3]}${noms[4]}$ (toutes les réponses doivent être justifiées).<br>`;
			enonce += `${num_alpha(0)} Déterminer la mesure de l'angle $\\widehat{${noms[3]}${noms[1]}${noms[2]}}$.<br>`;
			enonce += `${num_alpha(1)} En déduire la mesure de l'angle $\\widehat{${noms[0]}${noms[1]}${noms[3]}}$.<br>`;
			enonce += `${num_alpha(2)} En utilisant la question ${num_alpha(0)}, déterminer la mesure de l'angle $\\widehat{${noms[1]}${noms[3]}${noms[2]}}$.<br>`;
			enonce += `${num_alpha(3)} En déduire la mesure de l'angle $\\widehat{${noms[1]}${noms[3]}${noms[4]}}$.<br>`;
			enonce += `${num_alpha(4)} En utilisant la question ${num_alpha(2)} déterminer la mesure de l'angle $\\widehat{${noms[3]}${noms[4]}${noms[0]}}$.<br>`;
			enonce += `${num_alpha(5)} Vérifier la conjecture suivante : « La somme des angles d'un quadrilatère vaut 360°.»<br>`;
			correction = `${num_alpha(0)} Comme les droites $(${noms[0]}${noms[4]})$ et $(${noms[1]}${noms[3]})$ sont parallèles, les angles correspondants $\\widehat{${noms[4]}${noms[0]}${noms[1]}}$ et $\\widehat{${noms[3]}${noms[1]}${noms[2]}}$ sont égaux, donc $\\widehat{${noms[3]}${noms[1]}${noms[2]}}$ mesure $${a}\\degree$.<br>`;
			correction += `${num_alpha(1)} Les angles $\\widehat{${noms[0]}${noms[1]}${noms[3]}}$ et $\\widehat{${noms[3]}${noms[1]}${noms[2]}}$ sont adjacents supplémentaires, donc $\\widehat{${noms[0]}${noms[1]}${noms[3]}}$ mesure $180\\degree-${a}\\degree=${mise_en_evidence(180 - a, gras)}\\degree$.<br>`;
			correction += `${num_alpha(2)} Dans un triangle, la somme des angles vaut $180\\degree$ donc $\\widehat{${noms[1]}${noms[3]}${noms[2]}}=180\\degree-\\widehat{${noms[3]}${noms[1]}${noms[2]}}-\\widehat{${noms[1]}${noms[2]}${noms[3]}}=180\\degree-${a}\\degree-${c}\\degree=${180 - a - c}\\degree$.<br>`;
			correction += `${num_alpha(3)} Les angles $\\widehat{${noms[1]}${noms[3]}${noms[2]}}$ et $\\widehat{${noms[1]}${noms[3]}${noms[4]}}$ sont adjacents supplémentaires, donc $\\widehat{${noms[1]}${noms[3]}${noms[4]}}$ mesure $180\\degree-${180 - a - c}\\degree=${mise_en_evidence(a + c, gras)}\\degree$.<br>`;
			correction += `${num_alpha(4)} Comme les droites $(${noms[0]}${noms[4]})$ et $(${noms[1]}${noms[3]})$ sont parallèles, les angles correspondants $\\widehat{${noms[1]}${noms[3]}${noms[2]}}$ et $\\widehat{${noms[3]}${noms[4]}${noms[0]}}$ sont égaux, donc $\\widehat{${noms[3]}${noms[4]}${noms[0]}}$ mesure $${mise_en_evidence(180 - a - c, gras)}\\degree$.<br>`;
			correction += `${num_alpha(5)} La somme des angles du quadrilatère vaut donc : $${a}\\degree+${mise_en_evidence(180 - a, gras)}\\degree+${mise_en_evidence(a + c, gras)}\\degree+${mise_en_evidence(180 - a - c, gras)}\\degree=180\\degree+180\\degree=360\\degree$.<br>`;
			correction += `$\\phantom{f}$ La conjecture est finalement vraie.`;
			params = { xmin: Math.min(A.x - 8, C.x - 8, E.x - 8), ymin: Math.min(A.y - 1, E.y - 1, C.y - 1), xmax: Math.max(E.x + 2, A.x + 2, C.x + 2), ymax: Math.max(C.y + 2, A.y + 2, E.y + 2), scale: 0.7 };

			return [objets, params, enonce, correction];
		};
		let fig2 = function () {
			let A, B, C, D, E, a, ac, ab, cd, ad, d, AB, BE, CA, CE, cA, cD, cE, c3, c4, c5, c6, l1, objets = [], enonce, correction, params;
			let noms = choisit_lettres_differentes(5, 'Q', true);
			A = point(0, 0, noms[0], 'above left');
			B = rotation(point(randint(8, 10), randint(1, 3)), A, randint(-40, 40), noms[1], 'right');
			ab = longueur(A, B);
			ac = randint(6, 8);
			a = randint(40, 60);
			C = similitude(B, A, a, ac / ab, noms[2], 'above left');
			CA = droite(C, A);
			AB = droite(A, B);
			D = pointSurSegment(A, B, ab / 2 + randint(-1, 1, 0) / 10, noms[3], 'below');
			CE = droite(C, D);
			cd = longueur(C, D);
			ad = longueur(A, D);
			E = pointSurSegment(C, D, cd * ab / ad, noms[4], 'below right');
			BE = droite(B, E);
			d = arrondi(angle(C, D, B), 0);
			cA = codeAngle(D, A, C, 1, '', 'black', 2, 1, 'black', 0.2, true);
			cD = codeAngle(C, D, B, 1, '', 'red', 2, 1, 'red', 0.2, true);
			cE = codeAngle(D, E, B, 1, '', 'blue', 2, 1, 'blue', 0.2, true);
			c4 = codeAngle(A, C, D, 1, '', 'green', 2, 1, 'green', 0.2);
			c5 = codeAngle(B, D, E, 1, '', 'orange', 2, 1, 'orange', 0.2);
			c6 = codeAngle(E, B, D, 1, '', 'pink', 2, 1, 'pink', 0.2);
			c3 = codeAngle(A, D, C, 1, '', 'grey', 2, 1, 'grey', 0.2);
			l1 = labelPoint(A, B, C, D, E);
			objets.push(CA, AB, CE, BE, cA, cD, cE, c3, c4, c5, c6, l1);
			enonce = `La figure n'est pas en vraie grandeur. Toutes les réponses devront être justifiées.<br>`;
			enonce += `${num_alpha(0)} Déterminer la mesure de l'angle $\\widehat{${noms[0]}${noms[3]}${noms[2]}}$.<br>`;
			enonce += `${num_alpha(1)} En déduire la mesure de l'angle $\\widehat{${noms[3]}${noms[2]}${noms[0]}}$.<br>`;
			enonce += `${num_alpha(2)} Déterminer si les droites $(${noms[0]}${noms[2]})$ et $(${noms[4]}${noms[1]})$ sont parallèles.<br>`;
			enonce += `${num_alpha(3)} Si on considère que les segments $[${noms[0]}${noms[2]}]$ et $[${noms[4]}${noms[1]}]$ sont de même longueur, Déterminer la nature du quadrilatère $${noms[0]}${noms[2]}${noms[1]}${noms[4]}$.<br>`;
			correction = `${num_alpha(0)} Les angles $\\widehat{${noms[0]}${noms[3]}${noms[2]}}$ et $\\widehat{${noms[2]}${noms[3]}${noms[1]}}$ sont adjacents supplémentaires, donc $\\widehat{${noms[0]}${noms[3]}${noms[2]}}$ mesure $180\\degree-${d}\\degree=${180 - d}\\degree$.<br>`;
			correction += `${num_alpha(1)} Dans un triangle, la somme des angles vaut $180\\degree$ donc $\\widehat{${noms[0]}${noms[2]}${noms[3]}}=180-\\widehat{${noms[3]}${noms[0]}${noms[2]}}-\\widehat{${noms[0]}${noms[3]}${noms[2]}}=180\\degree-${a}\\degree-${180 - d}\\degree=${-a + d}\\degree$.<br>`;
			correction += `${num_alpha(2)} Pour les droites $(${noms[0]}${noms[2]})$ et $(${noms[4]}${noms[1]})$ coupées par la sécante $(${noms[2]}${noms[4]})$ les angles $\\widehat{${noms[0]}${noms[2]}${noms[3]}}$ et $\\widehat{${noms[1]}${noms[4]}${noms[3]}}$ sont des angles alternes-internes.<br>`;
			correction += `$\\phantom{c/}$ Or si des angles alternes-internes sont égaux, cela signifie que les droites coupées par la sécante sont parallèles.<br>`;
			correction += `$\\phantom{c/}$ Les droites $(${noms[0]}${noms[2]})$ et $(${noms[4]}${noms[1]})$ sont donc parallèles.<br>`;
			correction += `${num_alpha(3)} Les droites $(${noms[0]}${noms[2]})$ et $(${noms[4]}${noms[1]})$ sont parallèles et les segments $[${noms[0]}${noms[2]}]$ et $[${noms[4]}${noms[1]}]$ sont de même longueur.<br>`;
			correction += `$\\phantom{c/}$ Or, un quadrilatère qui possède des côtés opposés parallèles et de même longueur est un parallèlogramme.<br>`;
			correction += `$\\phantom{c/}$ Donc $${noms[0]}${noms[2]}${noms[1]}${noms[4]}$ est un parallèlogramme et $${noms[3]}$ est son centre.`;
			params = { xmin: Math.min(A.x, B.x, C.x, D.x, E.x) - 1, ymin: Math.min(A.y, B.y, C.y, D.y, E.y) - 1, xmax: Math.max(A.x, B.x, C.x, D.x, E.x) + 2, ymax: Math.max(A.y, B.y, C.y, D.y, E.y) + 2 };

			return [objets, params, enonce, correction];
		};
		if (this.sup == 3)
			choix = randint(1, 2);
		else
			choix = parseInt(this.sup);
		switch (choix) {
			case 1:
				figure = fig1();
				figure[2] += mathalea2d(figure[1], figure[0]);
				break;
			case 2:
				figure = fig2();
				console.log(figure[0]);
				figure[2] += mathalea2d(figure[1], figure[0]);
				break;
		}
		this.liste_questions.push(figure[2]);
		this.liste_corrections.push(figure[3]);
		liste_de_question_to_contenu(this);
	};
	this.besoin_formulaire_numerique = ['Numéro de figure', 3, '1 : Le trapèze\n2: Le papillon\n3: Au hasard'];
}
