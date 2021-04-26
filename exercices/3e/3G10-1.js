import { codageAngleDroit, droiteParPointEtPente, droiteVerticaleParPoint, mathalea2d, point, segment, milieu, pointSurDroite, tracePoint, codeSegments, repere2, labelPoint, droiteHorizontaleParPoint, latexParCoordonnees, afficheMesureAngle, vecteur} from '../../modules/2d.js';
import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu_sans_numero,randint,choice,combinaison_listes,image_point_par_transformation,tex_fraction_reduite,calcul,tex_nombrec,tex_nombre} from "/modules/outils.js"
/**
 * Trouver les coordonnées d'un punto transformé d'un autre par une des transformations du plan
 * @Auteur Jean-Claude Lhote
 * 3G10-1
 */
export default function Transformations_du_plan_et_coordonnees() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Trouver les coordonnées de l'image d'un point par une transformation du plan";
	this.consigne = "";
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;

	this.sup = 1; // 1 calcul de l'hypoténuse 2 calcul d'un côté de l'angle droit 
	sortie_html ? this.spacing_corr = 2.5 : this.spacing_corr = 1.5;
    this.nouvelle_version = function (numero_de_l_exercice) {
        let A,B,C,droited,droited1,droited2,O,droitedprime,pointO
		let Aprime,Bprime,Cprime
        let objets_enonce = []
        let objets_correction = []
	
		this.liste_questions = [];
		this.liste_corrections = []; // Liste de questions corrigées
		let xA, yA, xB, yB, xC, yC, k = [], xO, yO, k1, k2;
		let xP = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]; // ces nombres sont juste là pour compter combien il y en a... ils seront remplacés plus tard par les coordonnées utiles ou pas.
		let yP = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]; // comme pour t, je n'utiliserai pas le premier élément pour coller aux index.
		let xO5, xO6, xO7, xO8, xO9, xO10, xO11, xO12, xO13, xO14;
		let yO5, yO6, yO7, yO8, yO9, yO10, yO11, yO12, yO13, yO14;
		let bis1 = 0, bis2 = 0, xx = 0, yy = 0, AfficheO = 0, AfficheOO = 0, t = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // il y a 14 transformations mais je n'utilise pas t[0] pour coller avec les index.
		let texte = ``, texte_corr = ``, lettre1 = [`A`, `B`, `C`], lettre2 = [`O\'`, `A`, `B`]; // si t[i]=0 alors la transformation concernée n'existe pas, si t[i]=1, on la dessine.
		let punto = [[]];
		let transformation = parseInt(this.sup) - 1;
		let liste_type_de_questions = [[1, 2, 3, 4], [1, 2, 3, 4, 7], [1, 2, 3, 4, 7, 8], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]];
		let choix_transformation = combinaison_listes(liste_type_de_questions[transformation], 3);
		for (let j = 0; j < 3; j++)
			if (choix_transformation[j] == 10)
				k[j] = choice([2, 2, 2, 2, 4, 4, 4, 4, 5, 10]) * randint(-1, 1, [0]); // rapport d'homothétie < 1 (plus ou moins  0.5, 0.25, 0.2 ou 0,1 ) avec une fréquence divisée par 4 pour 0.2 et 0.1.
			else
				k[j] = choice([1, 2, 2, 3, 3, 4, 4, 5, 5, 2.5]) * randint(-1, 1, [0]); // rapport d'homothétie >=1 (plus ou - 1,2,2.5, 3, 4 ou 5 avec des fréquences divisées par 2 pour 1 et 2.5) 

		xA = randint(-10, 10,0); // Point A
		yA = randint(-10, 10,-1);
		xB = randint(-10, 10, [xA,0]); // Point B
		yB = randint(-10, 10,-1);
		xC = randint(-10, 10,0); // Point C
		yC = randint(-10, 10, [yA, yB,-1]);
		xO = randint(-3, 3, [0,-1]); // Point O' (origine du repère dans lequel les transformations sont simples (centre des rotations et punto d'intersection des axes))
		yO = randint(-3, 3, [0,-1]);
       pointO=point(0,0,'O','above right')
        O=point(xO,yO,"O'",'above left') // on crée le point O' 
        droited1=droiteParPointEtPente(O,1) // et les trois axes passant par O'
        droited=droiteHorizontaleParPoint(O)
        droited2=droiteParPointEtPente(O,-1)
        droitedprime=droiteVerticaleParPoint(O)
		droited1.isVisible=true
		droited2.isVisible=true
		droited.isVisible=true
		droitedprime.isVisible=true
		droited1.epaisseur=2
		droited2.epaisseur=2
		droited.epaisseur=2
		droitedprime.epaisseur=2
		droited1.color='green'
		droited2.color='green'
		droited.color='green'
		droitedprime.color='green'
		droited1.opacite=0.5
		droited2.opacite=0.5
		droited.opacite=0.5
		droitedprime.opacite=0.5

		punto[0] = image_point_par_transformation(choix_transformation[0], [xA, yA], [xO, yO], [xO, yO], k[0]);
		while (punto[0][0] < -13 || punto[0][0] > 13 || punto[0][1] < -13 || punto[0][1] > 14) { // on teste si A est dans la fenêtre sinon on en choisit un autre
			xA = randint(-10, 10); // Point A
			yA = randint(-10, 10,-1);
			punto[0] = image_point_par_transformation(choix_transformation[0], [xA, yA], [xO, yO], [xO, yO], k[0]);
		}
        A=point(xA,yA,'A')
		Aprime=point(punto[0][0],punto[0][1],"A'")
		if (choix_transformation[1] > 4)
			punto[1] = image_point_par_transformation(choix_transformation[1], [xB, yB], [xA, yA], [xA, yA], k[1]);
		else
			punto[1] = image_point_par_transformation(choix_transformation[1], [xB, yB], [xO, yO]); // si c'est une symétrie, l'axe passe par O'
		while (punto[1][0] < -13 || punto[1][0] > 13 || punto[1][1] < -13 || punto[1][1] > 14) { // on teste si on est dans les clous, sinon on choisit un autre punto B
			xB = randint(-10, 10, [xA]); // Point B
			yB = randint(-10, 10,-1);
			if (choix_transformation[1] > 4)
				punto[1] = image_point_par_transformation(choix_transformation[1], [xB, yB], [xA, yA], [xA, yA], k[1]);
			else
				punto[1] = image_point_par_transformation(choix_transformation[1], [xB, yB], [xO, yO]); // si c'est une symétrie, l'axe passe par O'
		}
        B=point(xB,yB,'B')
		Bprime=point(punto[1][0],punto[1][1],"B'")

		if (choix_transformation[2] > 4)
			punto[2] = image_point_par_transformation(choix_transformation[2], [xC, yC], [xB, yB], [xB, yB], k[2]);
		else
			punto[2] = image_point_par_transformation(choix_transformation[2], [xC, yC], [xO, yO]); // si c'est une symétrie, l'axe passe par O'
		while (punto[2][0] < -13 || punto[2][0] > 13 || punto[2][1] < -13 || punto[2][1] > 14) { // on vérifie que C est dans le repère sinon on change le punto C.
			xC = randint(-10, 10); // Point C
			yC = randint(-10, 10, [yA, yB,-1]);
			if (choix_transformation[2] > 4)
				punto[2] = image_point_par_transformation(choix_transformation[2], [xC, yC], [xB, yB], [xB, yB], k[2]);
			else
				punto[2] = image_point_par_transformation(choix_transformation[2], [xC, yC], [xO, yO]); // si c'est une symétrie, l'axe passe par O'
		}
        C=point(xC,yC,'C')
		Cprime=point(punto[2][0],punto[2][1],"C'")

		// les puntos sont choisis, on écrit l'énoncé	
		for (let i = 0; i < 3; i++) {
			switch (choix_transformation[i]) {
				case 1:
					bis1 = 1;
					t[1] = 1;
					if (i == 0) {
                        objets_enonce.push(tracePoint(A),labelPoint(A))
                        objets_correction.push(tracePoint(A,Aprime),labelPoint(A,Aprime),segment(A,Aprime,'blue'),codageAngleDroit(A,milieu(A,Aprime),pointSurDroite(droited1,-15)),codeSegments('||','red',A,milieu(A,Aprime),milieu(A,Aprime),Aprime))
                        xP[1] = xA;
						yP[1] = yA;
					}
					else if (i == 1) {
						objets_enonce.push(tracePoint(B,Bprime),labelPoint(B,Bprime))
						objets_correction.push(tracePoint(B,Bprime),labelPoint(B,Bprime),segment(B,Bprime,'blue'),codageAngleDroit(B,milieu(B,Bprime),pointSurDroite(droited1,-15)),codeSegments('O','red',B,milieu(B,Bprime),milieu(B,Bprime),Bprime))
						xP[1] = xB;
						yP[1] = yB;
					}
					else {
						objets_enonce.push(tracePoint(C),labelPoint(C))
						objets_correction.push(tracePoint(C,Cprime),labelPoint(C,Cprime),segment(C,Cprime,'blue'),codageAngleDroit(C,milieu(C,Cprime),pointSurDroite(droited1,-15)),codeSegments('X','red',C,milieu(C,Cprime),milieu(C,Cprime),Cprime))
						xP[1] = xC;
						yP[1] = yC;
					}
                    objets_enonce.push(droited1,latexParCoordonnees('(d_1)',-10,-7-xO+yO,'green',2))
					objets_correction.push(droited1,latexParCoordonnees('(d_1)',-10,-7-xO+yO,'green',2))
					
					texte += `Donner les coordonnées du symétrique de $${lettre1[i]}$ par rapport à la droite $(d_1)$.<br>`;
					texte_corr += `Le symétrique de $${lettre1[i]}$ par rapport à $(d_1)$ a pour coordonnées ($${tex_nombre(punto[i][0])};${tex_nombre(punto[i][1])}$).<br>`;
					break;

				case 2:
					bis2 = 1;
					t[2] = 1;
					if (i == 0) {
                        objets_enonce.push(tracePoint(A),labelPoint(A))
                        objets_correction.push(tracePoint(A,Aprime),labelPoint(A,Aprime),segment(A,Aprime,'blue'),codageAngleDroit(A,milieu(A,Aprime),pointSurDroite(droited2,-15)),codeSegments('||','red',A,milieu(A,Aprime),milieu(A,Aprime),Aprime))
                        xP[2] = xA;
						yP[2] = yA;
					}
					else if (i == 1) {
						objets_enonce.push(tracePoint(B),labelPoint(B))
						objets_correction.push(tracePoint(B,Bprime),labelPoint(B,Bprime),segment(B,Bprime,'blue'),codageAngleDroit(B,milieu(B,Bprime),pointSurDroite(droited2,-15)),codeSegments('O','red',B,milieu(B,Bprime),milieu(B,Bprime),Bprime))
						xP[2] = xB;
						yP[2] = yB;
					}
					else {
                        objets_enonce.push(tracePoint(C),labelPoint(C))
						objets_correction.push(tracePoint(C,Cprime),labelPoint(C,Cprime),segment(C,Cprime,'blue'),codageAngleDroit(C,milieu(C,Cprime),pointSurDroite(droited2,-15)),codeSegments('X','red',C,milieu(C,Cprime),milieu(C,Cprime),Cprime))
					xP[2] = xC;
						yP[2] = yC;
					}
					objets_enonce.push(droited2,latexParCoordonnees('(d_2)',8,-7+xO+yO,'green',2))
					objets_correction.push(droited2,latexParCoordonnees('(d_2)',8,-7+xO+yO,'green',2))
					texte += `Donner les coordonnées du symétrique de $${lettre1[i]}$ par rapport à la droite $(d_2)$.<br>`;
					texte_corr += `Le symétrique de $${lettre1[i]}$ par rapport à $(d_2)$ a pour coordonnées ($${tex_nombre(punto[i][0])};${tex_nombre(punto[i][1])}$).<br>`;
					break;

				case 3:
					xx = 1;
					t[3] = 1;
					if (i == 0) {
                        objets_enonce.push(tracePoint(A),labelPoint(A))
						objets_correction.push(tracePoint(A,Aprime),labelPoint(A,Aprime),segment(A,Aprime,'blue'),codageAngleDroit(A,milieu(A,Aprime),pointSurDroite(droited,-15)),codeSegments('||','red',A,milieu(A,Aprime),milieu(A,Aprime),Aprime))
						xP[3] = xA;
						yP[3] = yA;
					}
					else if (i == 1) {
                        objets_enonce.push(tracePoint(B),labelPoint(B))
						objets_correction.push(tracePoint(B,Bprime),labelPoint(B,Bprime),segment(B,Bprime,'blue'),codageAngleDroit(B,milieu(B,Bprime),pointSurDroite(droited,-15)),codeSegments('O','red',B,milieu(B,Bprime),milieu(B,Bprime),Bprime))
					xP[3] = xB;
						yP[3] = yB;
					}
					else {
						objets_enonce.push(tracePoint(C),labelPoint(C))
						objets_correction.push(tracePoint(C,Cprime),labelPoint(C,Cprime),segment(C,Cprime,'blue'),codageAngleDroit(C,milieu(C,Cprime),pointSurDroite(droited,-15)),codeSegments('X','red',C,milieu(C,Cprime),milieu(C,Cprime),Cprime))
						xP[3] = xC;
						yP[3] = yC;
					}
					objets_enonce.push(droited,latexParCoordonnees('(d)',-14,yO+1,'green',2))
					objets_correction.push(droited,latexParCoordonnees('(d)',-14,yO+1,'green',2))
					texte += `Donner les coordonnées du symétrique de $${lettre1[i]}$ par rapport à la droite $(d)$.<br>`;
					texte_corr += `Le symétrique de $${lettre1[i]}$ par rapport à $(d)$ a pour coordonnées ($${tex_nombre(punto[i][0])};${tex_nombre(punto[i][1])}$).<br>`;
					break;

				case 4:
					yy = 1;
					t[4] = 1;
					if (i == 0) {
                        objets_enonce.push(tracePoint(A),labelPoint(A))
						objets_correction.push(tracePoint(A,Aprime),labelPoint(A,Aprime),segment(A,Aprime,'blue'),codageAngleDroit(A,milieu(A,Aprime),pointSurDroite(droitedprime,-15)),codeSegments('||','red',A,milieu(A,Aprime),milieu(A,Aprime),Aprime))
						xP[4] = xA;
						yP[4] = yA;
					}
					else if (i == 1) {
						objets_enonce.push(tracePoint(B),labelPoint(B))
						objets_correction.push(tracePoint(B,Bprime),labelPoint(B,Bprime),segment(B,Bprime,'blue'),codageAngleDroit(B,milieu(B,Bprime),pointSurDroite(droitedprime,-15)),codeSegments('O','red',B,milieu(B,Bprime),milieu(B,Bprime),Bprime))
						xP[4] = xB;
						yP[4] = yB;
					}
					else {
						objets_enonce.push(tracePoint(C),labelPoint(C))
						objets_correction.push(tracePoint(C,Cprime),labelPoint(C,Cprime),segment(C,Cprime,'blue'),codageAngleDroit(C,milieu(C,Cprime),pointSurDroite(droitedprime,-15)),codeSegments('X','red',C,milieu(C,Cprime),milieu(C,Cprime),Cprime))
						xP[4] = xC;
						yP[4] = yC;
					}
					objets_enonce.push(droitedprime,latexParCoordonnees("(d\')",xO+0.2,13,'green',2))
					objets_correction.push(droitedprime)
					texte += `Donner les coordonnées du symétrique de $${lettre1[i]}$ par rapport à la droite $(d\')$.<br>`;
					texte_corr += `Le symétrique de $${lettre1[i]}$ par rapport à $(d\')$ a pour coordonnées ($${tex_nombre(punto[i][0])};${tex_nombre(punto[i][1])}$).<br>`;
					break;

				case 5:
					AfficheO = 1;
					t[5] = 1;
					if (i == 0) {
                        objets_enonce.push(tracePoint(A,O),labelPoint(A,O))
                        objets_correction.push(tracePoint(A,Aprime,O),labelPoint(A,Aprime,O),
						segment(O,A,'blue'),segment(O,Aprime,'blue'),afficheMesureAngle(A,O,Aprime),codeSegments('//','red',O,A,O,Aprime)
						)
                        xP[5] = xA;
						yP[5] = yA;
						xO5 = xO;
						yO5 = yO;
					}
					else if (i == 1) {
						objets_enonce.push(tracePoint(B,A),labelPoint(B,A))
						objets_correction.push(tracePoint(B,Bprime,A),labelPoint(B,Bprime,A),
						segment(A,B,'blue'),segment(A,Bprime,'blue'),afficheMesureAngle(B,A,Bprime),codeSegments('O','red',A,B,A,Bprime))
						xP[5] = xB;
						yP[5] = yB;
						xO5 = xA;
						yO5 = yA;
					}
					else {
						objets_enonce.push(tracePoint(C,B),labelPoint(C,B))
						objets_correction.push(tracePoint(C,Cprime,B),labelPoint(C,Cprime,B),
						segment(B,C,'blue'),segment(B,Cprime,'blue'),afficheMesureAngle(C,B,Cprime),codeSegments('X','red',B,C,B,Cprime))
						xP[5] = xC;
						yP[5] = yC;
						xO5 = xB;
						yO5 = yB;
					}
					texte += `Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 90° dans le sens anti-horaire.<br>`;
					texte_corr += `L'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 90° dans le sens anti-horaire a pour coordonnées ($${tex_nombre(punto[i][0])};${tex_nombre(punto[i][1])}$).<br>`;
					break;

				case 6:
					AfficheO = 1;
					t[6] = 1;
					if (i == 0) {
                        objets_enonce.push(tracePoint(A,O),labelPoint(A,O))
                        objets_correction.push(tracePoint(A,Aprime,O),labelPoint(A,Aprime,O),
						segment(O,A,'blue'),segment(O,Aprime,'blue'),afficheMesureAngle(A,O,Aprime),codeSegments('//','red',O,A,O,Aprime))
                        xP[6] = xA;
						yP[6] = yA;
						xO6 = xO;
						yO6 = yO;
					}
					else if (i == 1) {
						objets_enonce.push(tracePoint(B,A),labelPoint(B,A))
						objets_correction.push(tracePoint(B,A),labelPoint(B,A),
						segment(A,B,'blue'),segment(A,Bprime,'blue'),afficheMesureAngle(B,A,Bprime),codeSegments('O','red',A,B,A,Bprime))
						xP[6] = xB;
						yP[6] = yB;
						xO6 = xA;
						yO6 = yA;
					}
					else {
						objets_enonce.push(tracePoint(C,B),labelPoint(C,B))
						objets_correction.push(tracePoint(C,Cprime,B),labelPoint(C,Cprime,B),
						segment(B,C,'blue'),segment(B,Cprime,'blue'),afficheMesureAngle(C,B,Cprime),codeSegments('X','red',B,C,B,Cprime))
						xP[6] = xC;
						yP[6] = yC;
						xO6 = xB;
						yO6 = yB;
					}
					texte += `Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 90° dans le sens horaire.<br>`;
					texte_corr += `L'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 90° dans le sens horaire a pour coordonnées ($${tex_nombre(punto[i][0])};${tex_nombre(punto[i][1])}$).<br>`;
					break;

				case 7:
					AfficheO = 1;
					t[7] = 1;
					if (i == 0) {
                        objets_enonce.push(tracePoint(A,O),labelPoint(A,O))
                        objets_correction.push(tracePoint(A,Aprime,O),labelPoint(A,Aprime,O),
						segment(O,A,'blue'),segment(O,Aprime,'blue'),codeSegments('//','red',O,A,O,Aprime))
                        xP[7] = xA;
						yP[7] = yA;
						xO7 = xO;
						yO7 = yO;
					}
					else if (i == 1) {
                        objets_enonce.push(tracePoint(B,A),labelPoint(B,A))
						objets_correction.push(tracePoint(B,Bprime,A),labelPoint(B,Bprime,A),
						segment(A,B,'blue'),segment(A,Bprime,'blue'),codeSegments('O','red',A,B,A,Bprime))
					xP[7] = xB;
						yP[7] = yB;
						xO7 = xA;
						yO7 = yA;
					}
					else {
                        objets_enonce.push(tracePoint(C,B),labelPoint(C,B))
						objets_correction.push(tracePoint(C,Cprime,B),labelPoint(C,Cprime,B),
						segment(B,C,'blue'),segment(B,Cprime,'blue'),codeSegments('X','red',B,C,B,Cprime))
					xP[7] = xC;
						yP[7] = yC;
						xO7 = xB;
						yO7 = yB;
					}
					texte += `Donner les coordonnées de l'image de $${lettre1[i]}$ par la symétrie de centre $${lettre2[i]}$.<br>`;
					texte_corr += `L'image de $${lettre1[i]}$ par la symétrie de centre $${lettre2[i]}$ a pour coordonnées ($${tex_nombrec(punto[i][0])};${tex_nombre(punto[i][1])}$).<br>`;
					break;

				case 11:
					AfficheO = 1;
					t[11] = 1;
					if (i == 0) {
                        objets_enonce.push(tracePoint(A,O),labelPoint(A,O))
                        objets_correction.push(tracePoint(A,Aprime,O),labelPoint(A,Aprime,O),
						segment(O,A,'blue'),segment(O,Aprime,'blue'),afficheMesureAngle(A,O,Aprime),codeSegments('//','red',O,A,O,Aprime))
                        xP[11] = xA;
						yP[11] = yA;
						xO11 = xO;
						yO11 = yO;
					}
					else if (i == 1) {
						objets_enonce.push(tracePoint(B,A),labelPoint(B,A))
						objets_correction.push(tracePoint(B,Bprime,A),labelPoint(B,Bprime,A),
						segment(A,B,'blue'),segment(A,Bprime,'blue'),afficheMesureAngle(B,A,Bprime),codeSegments('O','red',A,B,A,Bprime))
						xP[11] = xB;
						yP[11] = yB;
						xO11 = xA;
						yO11 = yA;
					}
					else {
                        objets_enonce.push(tracePoint(C,B),labelPoint(C,B))
						objets_correction.push(tracePoint(C,Cprime,B),labelPoint(C,Cprime,B),
						segment(B,C,'blue'),segment(B,Cprime,'blue'),afficheMesureAngle(C,B,Cprime),codeSegments('X','red',B,C,B,Cprime))
					xP[11] = xC;
						yP[11] = yC;
						xO11 = xB;
						yO11 = yB;
					}
					texte += `Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 60° dans le sens anti-horaire.<br>`;
					texte_corr += `L'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 60° dans le sens anti-horaire a pour coordonnées ($${tex_nombre(calcul(punto[i][0], 2))};${tex_nombre(calcul(punto[i][1], 2))}$).<br>`;
					break;

				case 12:
					AfficheO = 1;
					t[12] = 1;
					if (i == 0) {
                        objets_enonce.push(tracePoint(A,O),labelPoint(A,O))
                        objets_correction.push(tracePoint(A,Aprime,O),labelPoint(A,Aprime,O),
						segment(O,A,'blue'),segment(O,Aprime,'blue'),afficheMesureAngle(A,O,Aprime),codeSegments('//','red',O,A,O,Aprime))
                        xP[12] = xA;
						yP[12] = yA;
						xO12 = xO;
						yO12 = yO;
					}
					else if (i == 1) {
                        objets_enonce.push(tracePoint(B,A),labelPoint(B,A))
						objets_correction.push(tracePoint(B,Bprime,A),labelPoint(B,Bprime,A),
						segment(A,B,'blue'),segment(A,Bprime,'blue'),afficheMesureAngle(B,A,Bprime),codeSegments('O','red',A,B,A,Bprime))
					xP[12] = xB;
						yP[12] = yB;
						xO12 = xA;
						yO12 = yA;
					}
					else {
                        objets_enonce.push(tracePoint(C,B),labelPoint(C,B))
						objets_correction.push(tracePoint(C,Cprime,B),labelPoint(C,Cprime,B),
						segment(B,C,'blue'),segment(B,Cprime,'blue'),afficheMesureAngle(C,B,Cprime),codeSegments('X','red',B,C,B,Cprime))
					xP[12] = xC;
						yP[12] = yC;
						xO12 = xB;
						yO12 = yB;
					}
					texte += `Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 60° dans le sens horaire.<br>`;
					texte_corr += `L'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 60° dans le sens horaire a pour coordonnées ($${tex_nombre(calcul(punto[i][0], 2))};${tex_nombre(calcul(punto[i][1], 2))}$).<br>`;
					break;

				case 13:
					AfficheO = 1;

				case 12:
					AfficheO = 1;
					t[13] = 1;
					if (i == 0) {
                        objets_enonce.push(tracePoint(A,O),labelPoint(A,O))
                        objets_correction.push(tracePoint(A,Aprime,O),labelPoint(A,Aprime,O),
						segment(O,A,'blue'),segment(O,Aprime,'blue'),afficheMesureAngle(A,O,Aprime),codeSegments('//','red',O,A,O,Aprime))
                        xP[13] = xA;
						yP[13] = yA;
						xO13 = xO;
						yO13 = yO;
					}
					else if (i == 1) {
						objets_enonce.push(tracePoint(B,A),labelPoint(B,A))
						objets_correction.push(tracePoint(B,Bprime,A),labelPoint(B,Bprime,A),
						segment(A,B,'blue'),segment(A,Bprime,'blue'),afficheMesureAngle(B,A,Bprime),codeSegments('O','red',A,B,A,Bprime))
						xP[13] = xB;
						yP[13] = yB;
						xO13 = xA;
						yO13 = yA;
					}
					else {
                        objets_enonce.push(tracePoint(C,B),labelPoint(C,B))
						objets_correction.push(tracePoint(C,Cprime,B),labelPoint(C,Cprime,B),
						segment(B,C,'blue'),segment(B,Cprime,'blue'),afficheMesureAngle(C,B,Cprime),codeSegments('X','red',B,C,B,Cprime))
					xP[13] = xC;
						yP[13] = yC;
						xO13 = xB;
						yO13 = yB;
					}
					texte += `Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 120° dans le sens anti-horaire.<br>`;
					texte_corr += `L'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 120° dans le sens anti-horaire a pour coordonnées ($${tex_nombre(calcul(punto[i][0], 2))};${tex_nombre(calcul(punto[i][1], 2))}$).<br>`;
					break;

				case 14:
					AfficheO = 1;
					t[14] = 1;
					if (i == 0) {
                        objets_enonce.push(tracePoint(A,O),labelPoint(A,O))
                        objets_correction.push(tracePoint(A,Aprime,O),labelPoint(A,Aprime,O),
						segment(O,A,'blue'),segment(O,Aprime,'blue'),afficheMesureAngle(A,O,Aprime),codeSegments('//','red',O,A,O,Aprime))
                        xP[14] = xA;
						yP[14] = yA;
						xO14 = xO;
						yO14 = yO;
					}
					else if (i == 1) {
						objets_enonce.push(tracePoint(B,A),labelPoint(B,A))
						objets_correction.push(tracePoint(B,Bprime,A),labelPoint(B,Bprime,A),
						segment(A,B,'blue'),segment(A,Bprime,'blue'),afficheMesureAngle(B,A,Bprime),codeSegments('O','red',A,B,A,Bprime))
						xP[14] = xB;
						yP[14] = yB;
						xO14 = xA;
						yO14 = yA;
					}
					else {
						objets_enonce.push(tracePoint(C,B),labelPoint(C,B))
						objets_correction.push(tracePoint(C,Cprime,B),labelPoint(C,Cprime,B),
						segment(B,C,'blue'),segment(B,Cprime,'blue'),afficheMesureAngle(C,B,Cprime),codeSegments('X','red',B,C,B,Cprime))
						xP[14] = xC;
						yP[14] = yC;
						xO14 = xB;
						yO14 = yB;
					}
					texte += `Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 120° dans le sens horaire.<br>`;
					texte_corr += `L'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 120° dans le sens horaire a pour coordonnées ($${tex_nombre(calcul(punto[i][0], 2))};${tex_nombre(calcul(punto[i][1], 2))}$).<br>`;
					break;

				case 8:
					AfficheO = 1;
					t[8] = 1;
					if (i == 0) {
                        objets_enonce.push(tracePoint(A,O,pointO),labelPoint(A,O,pointO),vecteur(pointO,O).representant(pointO))
                        objets_correction.push(tracePoint(A,Aprime,O,pointO),labelPoint(A,Aprime,O,pointO),
						vecteur(pointO,O).representant(A),vecteur(pointO,O).representant(pointO))
                        xP[8] = xA;
						yP[8] = yA;
						xO8 = xO;
						yO8 = yO;
					}
					else if (i == 1) {
                        objets_enonce.push(tracePoint(B,A,pointO),labelPoint(B,A,pointO),vecteur(pointO,A).representant(pointO))
						objets_correction.push(tracePoint(B,Bprime,A,pointO),labelPoint(B,Bprime,A,pointO),
						vecteur(pointO,A).representant(B),vecteur(pointO,A).representant(pointO))
					xP[8] = xB;
						yP[8] = yB;
						xO8 = xA;
						yO8 = yA;
					}
					else {
						objets_enonce.push(tracePoint(C,B,pointO),labelPoint(C,B,pointO),vecteur(pointO,B).representant(pointO))
						objets_correction.push(tracePoint(C,Cprime,B,pointO),labelPoint(C,Cprime,B,pointO),
						vecteur(pointO,B).representant(C),vecteur(pointO,B).representant(pointO))
						xP[8] = xC;
						yP[8] = yC;
						xO8 = xB;
						yO8 = yB;
					}
					// AfficheOO=1
					texte += `Donner les coordonnées de l'image de $${lettre1[i]}$ par la translation qui transforme O en ${lettre2[i]}.<br>`;
					texte_corr += `L'image de $${lettre1[i]}$ par la translation qui transforme O en ${lettre2[i]} a pour coordonnées ($${tex_nombre(punto[i][0])};${tex_nombre(punto[i][1])}$).<br>`;
					break;

				case 9:
					AfficheO = 1;
					t[9] = 1;
					k1 = k[i];
					if (i == 0) {
                        objets_enonce.push(tracePoint(A,O),labelPoint(A,O))
                        objets_correction.push(tracePoint(A,Aprime,O),labelPoint(A,Aprime,O),
						segment(O,A,'blue'),segment(O,Aprime,'orange'))
                        xP[9] = xA;
						yP[9] = yA;
						xO9 = xO;
						yO9 = yO;
					}
					else if (i == 1) {
                        objets_enonce.push(tracePoint(B,A),labelPoint(B,A))
						objets_correction.push(tracePoint(B,Bprime,A),labelPoint(B,Bprime,A),
						segment(O,B,'blue'),segment(O,Bprime,'orange'))

					xP[9] = xB;
						yP[9] = yB;
						xO9 = xA;
						yO9 = yA;
					}
					else {
						objets_enonce.push(tracePoint(C,B),labelPoint(C,B))
						objets_correction.push(tracePoint(C,Cprime,B),labelPoint(C,Cprime,B),
						segment(O,C,'blue'),segment(O,Cprime,'orange'))

						xP[9] = xC;
						yP[9] = yC;
						xO9 = xB;
						yO9 = yB;
					}
					texte += `Donner les coordonnées de l'image de $${lettre1[i]}$ par l'homothétie de centre $${lettre2[i]}$ et de rapport $${tex_nombre(k[i])}$.<br>`;
					texte_corr += `L'image de $${lettre1[i]}$ par l'homothétie de centre $${lettre2[i]}$ et de rapport $${tex_nombre(k[i])}$ a pour coordonnées ($${tex_nombre(punto[i][0])};${tex_nombre(punto[i][1])}$).<br>`;
					break;

				case 10:
					AfficheO = 1;
					t[10] = 1;
					k2 = k[i];
					if (i == 0) {
                        objets_enonce.push(tracePoint(A,O),labelPoint(A,O))
                        objets_correction.push(tracePoint(A,Aprime,O),labelPoint(A,Aprime,O),
						segment(O,A,'blue'),segment(O,Aprime,'orange'))
                        xP[10] = xA;
						yP[10] = yA;
						xO10 = xO;
						yO10 = yO;
					}
					else if (i == 1) {
                        objets_enonce.push(tracePoint(B,A),labelPoint(B,A))
						objets_correction.push(tracePoint(B,Bprime,A),labelPoint(B,Bprime,A),
						segment(A,B,'blue'),segment(A,Bprime,'orange'))
					xP[10] = xB;
						yP[10] = yB;
						xO10 = xA;
						yO10 = yA;
					}
					else {
						objets_enonce.push(tracePoint(C,B),labelPoint(C,B))
						objets_correction.push(tracePoint(C,Cprime,B),labelPoint(C,Cprime,B),
						segment(B,C,'blue'),segment(B,Cprime,'orange'))
						xP[10] = xC;
						yP[10] = yC;
						xO10 = xB;
						yO10 = yB;
					}
					texte += `Donner les coordonnées de l'image de $${lettre1[i]}$ par l'homothétie de centre $${lettre2[i]}$ et de rapport $${tex_fraction_reduite(1, k[i])}$.<br>`;
					texte_corr += `L'image de $${lettre1[i]}$ par l'homothétie de centre $${lettre2[i]}$ et de rapport $${tex_fraction_reduite(1, k[i])}$ a pour coordonnées ($${tex_nombre(punto[i][0])};${tex_nombre(punto[i][1])}$).<br>`;
					break;
			}
		}
			/*
			booléens permettant l'affichage des éléments si =1 et le masquage si =0
		bis1 affiche la droite de coefficient directeur 1 passant par O'
			bis2 affiche la droite de coefficient directeur -1 passant par O'
			xx' affiche la droite horizontale passant par O'
			yy' affiche la droite verticale passant par O'
			AfficheO' affiche O' comme son nom l'indique.
			AfficheOO' affiche le vecteur OO' vecteur de translation
		    
			*/
			objets_enonce.push(repere2({xMin:-14,yMin:-14,xMax:14,yMax:14,grilleOpacite:0.2}))
			objets_correction.push(repere2({xMin:-14,yMin:-14,xMax:14,yMax:14,grilleOpacite:0.2}))
			
			this.liste_questions.push(texte+'<br>'+mathalea2d({xmin:-14,ymin:-14,xmax:14,ymax:14,pixelsParCm:20,scale:0.6,mainlevee:false},objets_enonce));
			this.liste_corrections.push(texte_corr+'<br>'+mathalea2d({xmin:-14,ymin:-14,xmax:14,ymax:14,pixelsParCm:20,scale:0.6,mainlevee:false},objets_correction));
			liste_de_question_to_contenu_sans_numero(this);





	};
	this.besoin_formulaire_numerique = ['Transformations', 5, '1 : Symétries axiales (6ème)\n 2 : Symétries axiales et centrales (5ème)\n 3 : Symétries et translations (4ème)\n 4 : Symétries, translations, rotations et homothéties\n 5 : Les mêmes plus des rotations compliquées\n'];

}
