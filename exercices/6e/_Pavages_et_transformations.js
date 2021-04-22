import { translation, mathalea2d, polygone, point, rotation, vecteur, milieu, barycentre, texteParPoint, mediatrice, tracePoint, symetrieAnimee } from '../../modules/2d.js';
import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu_sans_numero,randint,choice,image_point_par_transformation,texte_en_couleur_et_gras,num_alpha} from "/modules/outils.js"

/**
 * Trouver l'image d'une figure par une symétrie centrale dans un pavage (7 motifs différents)
 * @Auteur Jean-Claude Lhote
 * fonction servant à tous les niveaux
 * Pas de version Latex !
 * Références 5G12-1, 6G25-2, 4G11-1, 3G12-1
 */
export default function Pavages_et_transformations() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()

	//	this.titre = "Trouver l'image d'une figure par une symétrie centrale";
	this.pas_de_version_LaTeX = true;
	this.consigne = "";
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	//	this.sup = 1; // 1 pour symétrie axiale, 2 pour symétrie centrale, 3 pour translations, et 4 pour rotations ; paramètre fixé par les variantes respectives.
	sortie_html ? this.spacing_corr = 2.5 : this.spacing_corr = 1.5;
	this.liste_packages = 'tkz-euclide';
	this.nouvelle_version = function (numero_de_l_exercice) {
		this.liste_questions = [];
		this.liste_corrections = []; // Liste de questions corrigées
        let objets_enonce=[];
        let objets_correction=[];

		//listes de pavages [nx,ny,xB,yB,xC,yC,xD,yD,zoom,anngle]  : 0=carrés, 1=cerf-volant 2=quadri concave 3=quadri quelconque 4=parallélogrammes 5=triangles rectangles isocèles 6=triangles équilatéraux 7=losanges
		let paves = [[5, 5, 4, 0, 4, 4, 0, 4, 22, 0], [5, 5, 6, 0, 8, 8, 0, 6, 40, -9], [5, 5, 8, 0, 4, 4, 2, 8, 30, -10], [5, 5, 4, 0, 6, 4, 0, 6, 28, -15], [4, 6, 8, 0, 7, 4, -1, 4, 32, 0], [5, 5, 8, 0, 4, 4, 0, 8, 40, 0], [5, 5, 4, 0, 3, 2 * Math.sin(Math.PI / 3), 2, 4 * Math.sin(Math.PI / 3), 15, 0], [4, 4, 3, 1, 4, 4, 1, 3, 20, 0]];
        let quad=[],numeros=[],quadInitial
		let mediatrice1,mediatrice2,mediatrice3
		let texte, texte_corr;
		let tabfigA = [], tabfigB = [], tabfigC = [], tabfigD = [];
		let pave = [];
		switch (parseInt(this.sup)) {
			case 1:
				pave = paves[0]; // pavages adaptés à symétrie axiale (carrés)
				break;
			case 2:
				pave = paves[randint(0, 7)]; // pavages adaptés à symétrie centrale (tous)
				break;
			case 3:
				pave = paves[randint(0, 7)]; //pavages adaptés à translation (tous)
				break;
			case 4:
				pave = paves[0]; // pavages adaptés à rotation (carrés  )
		}

		let nx = pave[0], ny = pave[1], xB = pave[2], yB = pave[3], xC = pave[4], yC = pave[5], xD = pave[6], yD = pave[7], Zoom = pave[8], Angle = pave[9];
		let A=point(0,0)
        let B=point(xB,yB)
        let C=point(xC,yC)
        let D=point(xD,yD)
        quadInitial=polygone(A,B,C,D)
        let xAI = xB + xC - xD;
		let yAI = yB + yC - yD;
        let I=milieu(B,C)
        let J=milieu(D,C)
		let xAJ = xC + xD - xB;
		let yAJ = yC + yD - yB;
		let xAxy, yAxy, numAxy;
		let punto = [0, 0, 0];
		let trouver = false, indexA, numA, indexcentre1, xmil1 = 0, ymil1 = 0, indexD, numD, indexcentre2, xmil2 = 0, ymil2 = 0, indexC, numC, indexcentre3, xmil3 = 0, ymil3 = 0, num1, num2, num3;
		let xc = 0, yc = 0, xb = 0, yb = 0, xa = 0, ya = 0, xV1 = 0, yV1 = 0, xV2 = 0, yV2 = 0, xV3 = 0, yV3 = 0;
		let s0 = choice([`S`, `T`, `L`, `W`, `R`, `G`, `E`, `F`, `G`, `K`]);
		let s1 = choice([`S`, `T`, `L`, `W`, `R`, `G`, `E`, `F`, `G`, `K`], [s0]);
		let s2 = choice([`S`, `T`, `L`, `W`, `R`, `G`, `E`, `F`, `G`, `K`], [s0, s1]);


		for (let y = 0; y < ny; y++) { // On initialise les tableaux avec les coordonnées des puntos de référence (A,B,C et D) de chaque translaté et son numéro dans le pavage.
			for (let x = 0; x < nx; x++) {
				xAxy = x * xAI + y * xAJ;
				yAxy = x * yAI + y * yAJ;
				numAxy = 2 * x + 4 * y * nx;
				tabfigA.push([xAxy, yAxy, numAxy]);
                quad[numAxy]=translation(polygone(A,B,C,D),vecteur(xAxy,yAxy))
				tabfigB.push([xAxy + xB, yAxy + yB, numAxy + 1]);
                quad[numAxy+1]=translation(rotation(polygone(A,B,C,D),I,180),vecteur(xAxy,yAxy))
				tabfigD.push([xAxy + xD, yAxy + yD, numAxy + 2 * nx]);
                quad[numAxy+2*nx]=translation(rotation(polygone(A,B,C,D),J,180),vecteur(xAxy,yAxy))
				tabfigC.push([xAxy + xC, yAxy + yC, numAxy + 2 * nx + 1]);
                quad[numAxy+2*nx+1]=translation(translation(polygone(A,B,C,D),vecteur(A,C)),vecteur(xAxy,yAxy))
			}
		}
        for (let i=0;i<quad.length;i++){
            objets_enonce.push(quad[i],texteParPoint(i,barycentre(quad[i],"",'center'),'milieu','black',1,'middle',true))
			objets_correction.push(quad[i],texteParPoint(i,barycentre(quad[i],"",'center'),'milieu','black',1,'middle',true))
        }


		switch (parseInt(this.sup)) {
			case 1: //symétrie axiale
				// Première question : une figure type A par symétrie d'axe // à [BD] est une figure type A. le symétrique du sommet A est le sommet C
				indexA = randint(0, nx * ny - 1);
				numA = tabfigA[indexA][2];
				let indexsym1 = randint(0, nx * ny - 1, [indexA]); // sert à choisir un axe [BD]. 
				xmil1 = tabfigD[indexsym1][0]; // sert pour faire passer l'axe de symétrie.
				ymil1 = tabfigD[indexsym1][1];
				punto = image_point_par_transformation(2, [tabfigA[indexA][0], tabfigA[indexA][1]], [xmil1, ymil1]);
				trouver = false;
				while (trouver == false) {
					for (let j = 0; j < nx * ny; j++) {
						if (punto[0] == tabfigC[j][0] && punto[1] == tabfigC[j][1]) {
							trouver = true;
							num1 = tabfigA[j][2];
							xa = tabfigA[indexA][0];
							ya = tabfigA[indexA][1];
							mediatrice1=mediatrice(point(xa,ya),point(punto[0],punto[1]))
							mediatrice1.color='green'
							mediatrice1.isVisible=true
							quad[numA].couleurDeRemplissage='green'
							break;
						}
					}
					if (trouver == false) {
						indexA = randint(0, nx * ny - 1);
						numA = tabfigA[indexA][2];
						indexsym1 = randint(0, nx * ny - 1, [indexA]);
						xmil1 = tabfigD[indexsym1][0];
						ymil1 = tabfigD[indexsym1][1];
						punto = image_point_par_transformation(2, [tabfigA[indexA][0], tabfigA[indexA][1]], [xmil1, ymil1]);
					}
				}
				texte = num_alpha(0) + texte_en_couleur_et_gras(` Quel est le numéro de la figure symétrique de la figure ${numA} dans la symétrie par rapport à $(d_1)$ ?<br>`, `green`);
				texte_corr = num_alpha(0) + texte_en_couleur_et_gras(` La figure symétrique de la figure ${numA} dans la symétrie par rapport à $(d_1)$ porte le numéro ${num1}.<br>`, `green`);
				// Deuxième question : une figure type D par symétrie d'axe // à [AC] est une figure type B. le symétrique du sommet B est le sommet D
				indexD = randint(0, nx * ny - 1);
				numD = tabfigD[indexD][2];
				let indexsym2 = randint(0, nx * ny - 1, [indexD]); // sert à choisir un axe [AC]. 
				xmil2 = tabfigA[indexsym2][0]; // sert pour faire passer l'axe de symétrie.
				ymil2 = tabfigA[indexsym2][1];
				punto = image_point_par_transformation(1, [tabfigD[indexD][0], tabfigD[indexD][1]], [xmil2, ymil2]);
				trouver = false;
				while (trouver == false) {
					for (let j = 0; j < nx * ny; j++) {
						if (punto[0] == tabfigB[j][0] && punto[1] == tabfigB[j][1]) {
							trouver = true;
							num2 = tabfigB[j][2];
							xb = tabfigD[indexD][0];
							yb = tabfigD[indexD][1] - 4;
							objets_enonce.push(tracePoint(point(xb,yb),point(punto[0],punto[1])))
							mediatrice2=mediatrice(point(xb,yb+4),point(punto[0],punto[1]))
							mediatrice2.color='red'
							mediatrice2.isVisible=true
							quad[numD].couleurDeRemplissage='red'
							break;
						}
					}
					if (trouver == false) {
						indexD = randint(0, nx * ny - 1);
						numD = tabfigD[indexD][2];
						indexsym2 = randint(0, nx * ny - 1, [indexD]); // sert à choisir un axe [AC]. 
						xmil2 = tabfigA[indexsym2][0]; // sert pour faire passer l'axe de symétrie.
						ymil2 = tabfigA[indexsym2][1];
						punto = image_point_par_transformation(1, [tabfigD[indexD][0], tabfigD[indexD][1]], [xmil2, ymil2]);
					}
				}
				texte += num_alpha(1) + texte_en_couleur_et_gras(` Quel est le numéro de la figure symétrique de la figure ${numD} dans la symétrie par rapport à $(d_2)$ ?<br>`, `red`);
				texte_corr += num_alpha(1) + texte_en_couleur_et_gras(` La figure symétrique de la figure ${numD} dans la symétrie par rapport à $(d_2)$ porte le numéro ${num2}.<br>`, `red`);
				// troisième question : une figure type C par symétrie d'axe // à [DC] est une figure type B. le symétrique du sommet C est le sommet C'
				indexC = randint(0, nx * ny - 1);
				numC = tabfigC[indexC][2];
				let indexsym3 = randint(0, nx * ny - 1,indexC); // sert à choisir un axe [AC]. 
				xmil3 = tabfigC[indexsym3][0]; // sert pour faire passer l'axe de symétrie.
				ymil3 = tabfigC[indexsym3][1];
				punto = image_point_par_transformation(3, [tabfigC[indexC][0], tabfigC[indexC][1]], [xmil3, ymil3]);
				trouver = false;
				while (trouver == false) {
					for (let j = 0; j < nx * ny; j++) {
						if (punto[0] == tabfigB[j][0] && punto[1]-4 == tabfigB[j][1]) {
							trouver = true;
							num3 = tabfigB[j][2];
							xc = tabfigC[indexC][0];
							yc = tabfigC[indexC][1];
							mediatrice3=mediatrice(point(xc,yc),point(punto[0],punto[1]))
							mediatrice3.color='blue'
							mediatrice3.isVisible=true
							quad[numC].couleurDeRemplissage='blue'
							break;
						}
					}
					if (trouver == false) {
						indexC = randint(0, nx * ny - 1);
						numC = tabfigB[indexC][2];
						let indexsym3 = randint(0, nx * ny - 1,indexC); // sert à choisir un axe [AC]. 
						xmil3 = tabfigC[indexsym3][0]; // sert pour faire passer l'axe de symétrie.
						ymil3 = tabfigC[indexsym3][1];
						punto = image_point_par_transformation(3, [tabfigC[indexC][0], tabfigC[indexC][1]], [xmil3, ymil3]);
					}
				}
				texte += num_alpha(2) + texte_en_couleur_et_gras(` Quel est le numéro de la figure symétrique de la figure ${numC} dans la symétrie par rapport à $(d_3)$ ?<br>`, `blue`);
				texte_corr += num_alpha(2) + texte_en_couleur_et_gras(` La figure symétrique de la figure ${numC} dans la symétrie par rapport à $(d_3)$ porte le numéro ${num3}.<br>`, `blue`);
				objets_enonce.push(mediatrice1,mediatrice2,mediatrice3)
				objets_correction.push(mediatrice1,mediatrice2,mediatrice3,symetrieAnimee(quad[numA],mediatrice1,'begin="0" dur="3s" repeatCount="indefinite" id="vert"'),symetrieAnimee(quad[numD],mediatrice2,'begin="vert.begin+3s" dur="3s" repeatCount="indefinite" id="rouge"'),symetrieAnimee(quad[numC],mediatrice3,'begin="rouge.begin+3s" dur="3s" repeatCount="indefinite" id="bleu"'))
				texte += mathalea2d({
					xmin:-1,
					xmax:nx*xAI+ny*xAJ,
					ymin:-1,
					ymax:nx*yAI+ny*yAJ,
					pixelsParCm:15,
					scale:0.5,
					mainlevee:false
				},objets_enonce
				); 
				quad[num1].couleurDeRemplissage='green'
				quad[num2].couleurDeRemplissage='red'
				quad[num3].couleurDeRemplissage='blue'
				objets_correction.push(quad[num1],quad[num2],quad[num3])
				texte_corr += mathalea2d({
					xmin:-1,
					xmax:nx*xAI+ny*xAJ,
					ymin:-1,
					ymax:nx*yAI+ny*yAJ,
					pixelsParCm:15,
					scale:0.5,
					mainlevee:false
				},objets_correction
				); 

				break;
			case 2: // symétrie centrale
				// Première question : une figure dans tabfigA, une symétrie par rapport au milieu d'un [B'C'], logiquement : l'image est dans tabfigB et B' est l'image de C !
				indexA = randint(0, nx * ny - 1);
				numA = tabfigA[indexA][2];
				indexcentre1 = randint(0, nx * ny - 1, [indexA]); // indexcentre1 est l'index du bloc de 4 figures A,B,C et D, il sert dans les 4 tableaux.

				//on calcule les coordonnées du milieu de [BC] on ajoute aux coordonnées du milieu de [BC] celles du vecteur BB'. (j'aurais pu réduire mais cela aurait rendu le calcul plus opaque)
				xmil1 = (xB + xC) / 2 + tabfigB[indexcentre1][0] - xB;
				ymil1 = (yB + yC) / 2 + tabfigB[indexcentre1][1] - yB;
				punto = image_point_par_transformation(7, [tabfigC[indexA][0], tabfigC[indexA][1]], [xmil1, ymil1]);
				trouver = false;
				while (trouver == false) {
					for (let j = 0; j < nx * ny; j++) {
						if (punto[0] == tabfigB[j][0] && punto[1] == tabfigB[j][1]) {
							trouver = true;
							num1 = tabfigB[j][2];
							xa = tabfigA[indexA][0];
							ya = tabfigA[indexA][1];
							break;
						}
					}
					if (trouver == false) {
						indexA = randint(0, nx * ny - 1);
						numA = tabfigA[indexA][2];
						indexcentre1 = randint(0, nx * ny - 1);
						xmil1 = (xB + xC) / 2 + tabfigB[indexcentre1][0] - xB;
						ymil1 = (yB + yC) / 2 + tabfigB[indexcentre1][1] - yB;
						punto = image_point_par_transformation(7, [tabfigC[indexA][0], tabfigC[indexA][1]], [xmil1, ymil1]);
					}
				}
				texte += num_alpha(0) + texte_en_couleur_et_gras(` Quel est le numéro de la figure symétrique de la figure ${numA} dans la symétrie par rapport à ${s0} ?<br>`, `green`);
				texte_corr = num_alpha(0) + texte_en_couleur_et_gras(` La figure symétrique de la figure ${numA} dans la symétrie par rapport à ${s0} porte le numéro ${num1}.<br>`, `green`);
				// Deuxième question : une figure dans tabfigD, une symétrie par rapport au milieu d'un [C'D'], le résultat est une figure dans tabfigA et C' est l'image de D !
				indexD = randint(0, nx * ny - 1);
				numD = tabfigD[indexD][2];
				indexcentre2 = randint(0, nx * ny - 1, [indexD]); // indexcentre2 est l'index du bloc de 4 figures A,B,C et D, il sert dans les 4 tableaux.

				//on calcule les coordonnées du milieu de [DC] on ajoute aux coordonnées du milieu de [DC] celles du vecteur DD'.
				xmil2 = (xD + xC) / 2 + tabfigD[indexcentre2][0] - xD;
				ymil2 = (yD + yC) / 2 + tabfigD[indexcentre2][1] - yD;
				punto = image_point_par_transformation(7, [tabfigD[indexD][0], tabfigD[indexD][1]], [xmil2, ymil2]);
				trouver = false;
				while (trouver == false) {
					for (let j = 0; j < nx * ny; j++) {
						if (punto[0] == tabfigC[j][0] && punto[1] == tabfigC[j][1]) {
							trouver = true;
							num2 = tabfigA[j][2];
							xb = tabfigA[indexD][0];
							yb = tabfigA[indexD][1];
							break;
						}
					}
					if (trouver == false) {
						indexD = randint(0, nx * ny - 1);
						numD = tabfigD[indexD][2];
						indexcentre2 = randint(0, nx * ny - 1, [indexD]);
						xmil2 = (xD + xC) / 2 + tabfigD[indexcentre2][0] - xD;
						ymil2 = (yD + yC) / 2 + tabfigD[indexcentre2][1] - yD;
						punto = image_point_par_transformation(7, [tabfigD[indexD][0], tabfigD[indexD][1]], [xmil2, ymil2]);
					}
				}

				texte += num_alpha(1) + texte_en_couleur_et_gras(` Quel est le numéro de la figure symétrique de la figure ${numD} dans la symétrie par rapport à ${s1} ?<br>`, `red`);
				texte_corr += num_alpha(1) + texte_en_couleur_et_gras(` La figure symétrique de la figure ${numD} dans la symétrie par rapport à ${s1} porte le numéro ${num2}.<br>`, `red`);
				// troisième question : une figure dans tabfigC, une symétrie par rapport au symétrique du milieu de [A'D'] par rapport au milieu de [C'D']... pas très clair
				// le résultat est une figure dans tabfigD et le point (C'+ vecteur AC) a pour image D' !
				indexC = randint(0, nx * ny - 1);
				numC = tabfigC[indexC][2];
				indexcentre3 = randint(0, nx * ny - 1, [indexC]); // indexcentre2 est l'index du bloc de 4 figures A,B,C et D, il sert dans les 4 tableaux.

				//on calcule les coordonnées du milieu du centre de symétrie : (C' + D + AC)/2=AC+AD/2 que l'on translate de CC' donc ça fait AC' + AD/2
				xmil3 = xD / 2 + tabfigC[indexcentre3][0];
				ymil3 = yD / 2 + tabfigC[indexcentre3][1];
				punto = image_point_par_transformation(7, [tabfigC[indexC][0] + xC, tabfigC[indexC][1] + yC], [xmil3, ymil3]); // c'est le sommet C + AC qui a pour image D.
				trouver = false;
				while (trouver == false) {
					for (let j = 0; j < nx * ny; j++) {
						if (punto[0] == tabfigD[j][0] && punto[1] == tabfigD[j][1]) {
							trouver = true;
							num3 = tabfigD[j][2];
							xc = tabfigA[indexC][0];
							yc = tabfigA[indexC][1];
							break;
						}
					}
					if (trouver == false) {
						indexC = randint(0, nx * ny - 1);
						numC = tabfigC[indexC][2];
						indexcentre3 = randint(0, nx * ny - 1, [indexC]);
						xmil3 = xD / 2 + tabfigC[indexcentre3][0];
						ymil3 = yD / 2 + tabfigC[indexcentre3][1];
						punto = image_point_par_transformation(7, [tabfigC[indexC][0] + xC, tabfigC[indexC][1] + yC], [xmil3, ymil3]);
					}
				}
				texte += num_alpha(2) + texte_en_couleur_et_gras(` Quel est le numéro de la figure symétrique de la figure ${numC} dans la symétrie par rapport à ${s2} ?<br>`, `blue`);
				texte_corr += num_alpha(2) + texte_en_couleur_et_gras(` La figure symétrique de la figure ${numC} dans la symétrie par rapport à ${s2} porte le numéro ${num3}.<br>`, `blue`);
				break;

			case 3: //translations
				let iB1, iB2, iB3, iC1, iA1, iD1;
				
				// Première question : une figure dans tabfigA, l'image dans tabfigA... 
				// On choisit deux figures de type B pour définir le vecteur de translation.
				indexA = randint(0, nx * ny - 1);
				numA = tabfigA[indexA][2];
				iB1 = randint(0, nx * ny - 1);
				iB2 = randint(0, nx * ny - 1, [iB1]);
				xV1 = tabfigB[iB2][0] - tabfigB[iB1][0];
				yV1 = tabfigB[iB2][1] - tabfigB[iB1][1];
				punto = image_point_par_transformation(8, [tabfigA[indexA][0], tabfigA[indexA][1]], [0, 0], [xV1, yV1]);
				trouver = false;
				while (trouver == false) {
					for (let j = 0; j < nx * ny; j++) {
						if (punto[0] == tabfigA[j][0] && punto[1] == tabfigA[j][1]) {
							trouver = true;
							num1 = tabfigA[j][2];
							xa = tabfigA[indexA][0];
							ya = tabfigA[indexA][1];
							break;
						}
					}
					if (trouver == false) {
						indexA = randint(0, nx * ny - 1);
						numA = tabfigA[indexA][2];
						iB1 = randint(0, nx * ny - 1);
						iB2 = randint(0, nx * ny - 1, [iB1]);
						xV1 = tabfigB[iB2][0] - tabfigB[iB1][0];
						yV1 = tabfigB[iB2][1] - tabfigB[iB1][1];
						punto = image_point_par_transformation(8, [tabfigA[indexA][0], tabfigA[indexA][1]], [0, 0], [xV1, yV1]);
					}
				}
				texte += num_alpha(0) + texte_en_couleur_et_gras(` Dans la translation qui transforme la figure ${tabfigB[iB1][2]} en la figure ${tabfigB[iB2][2]} quelle est le numéro de l'image de la figure ${numA} ?<br>`, `green`);
				texte_corr = num_alpha(0) + texte_en_couleur_et_gras(` La figure image de la figure ${numA}  dans la translation qui transforme la figure ${tabfigB[iB1][2]} en la figure ${tabfigB[iB2][2]} porte le numéro ${num1}.<br>`, `green`);
				// Deuxième question : une figure dans tabfigD, l'image dans tabfigB... 
				// On choisit une figure C et une figure A pour définir le vecteur de translation.
				indexD = randint(0, nx * ny - 1);
				numD = tabfigD[indexD][2];
				iC1 = randint(0, nx * ny - 1);
				iA1 = randint(0, nx * ny - 1, [iC1]);
				xV2 = tabfigA[iA1][0] - tabfigC[iC1][0];
				yV2 = tabfigA[iA1][1] - tabfigC[iC1][1];
				punto = image_point_par_transformation(8, [tabfigD[indexD][0], tabfigD[indexD][1]], [0, 0], [xV2, yV2]);
				trouver = false;
				while (trouver == false) {
					for (let j = 0; j < nx * ny; j++) {
						if (punto[0] == tabfigB[j][0] && punto[1] == tabfigB[j][1]) {
							trouver = true;
							num2 = tabfigB[j][2];
							xb = tabfigA[indexD][0];
							yb = tabfigA[indexD][1];
							break;
						}
					}
					if (trouver == false) {
						indexD = randint(0, nx * ny - 1);
						numD = tabfigD[indexD][2];
						iC1 = randint(0, nx * ny - 1);
						iA1 = randint(0, nx * ny - 1, [iC1]);
						xV2 = tabfigA[iA1][0] - tabfigC[iC1][0];
						yV2 = tabfigA[iA1][1] - tabfigC[iC1][1];
						punto = image_point_par_transformation(8, [tabfigD[indexD][0], tabfigD[indexD][1]], [0, 0], [xV2, yV2]);
					}
				}
				texte += num_alpha(1) + texte_en_couleur_et_gras(` Dans la translation qui transforme la figure ${tabfigC[iC1][2]} en la figure ${tabfigA[iA1][2]} quelle est le numéro de l'image de la figure ${numD} ?<br>`, `red`);
				texte_corr += num_alpha(1) + texte_en_couleur_et_gras(` La figure image de la figure ${numD}  dans la translation qui transforme la figure ${tabfigC[iC1][2]} en la figure ${tabfigA[iA1][2]} porte le numéro ${num2}.<br>`, `red`);


				// troisième question : une figure dans tabfigC, l'image dans tabfigA... 
				// On choisit une figure D et une figure B pour définir le vecteur de translation.
				indexC = randint(0, nx * ny - 1);
				numC = tabfigC[indexC][2];
				iD1 = randint(0, nx * ny - 1);
				iB3 = randint(0, nx * ny - 1, [iD1]);
				xV3 = tabfigA[iB3][0] - tabfigC[iD1][0];
				yV3 = tabfigA[iB3][1] - tabfigC[iD1][1];
				punto = image_point_par_transformation(8, [tabfigC[indexC][0], tabfigC[indexC][1]], [0, 0], [xV3, yV3]);
				trouver = false;
				while (trouver == false) {
					for (let j = 0; j < nx * ny; j++) {
						if (punto[0] == tabfigA[j][0] && punto[1] == tabfigA[j][1]) {
							trouver = true;
							num3 = tabfigA[j][2];
							xc = tabfigA[indexC][0];
							yc = tabfigA[indexC][1];
							break;
						}
					}
					if (trouver == false) {
						indexC = randint(0, nx * ny - 1);
						numC = tabfigC[indexC][2];
						iD1 = randint(0, nx * ny - 1);
						iB3 = randint(0, nx * ny - 1, [iD1]);
						xV3 = tabfigA[iB3][0] - tabfigC[iD1][0];
						yV3 = tabfigA[iB3][1] - tabfigC[iD1][1];
						punto = image_point_par_transformation(8, [tabfigC[indexC][0], tabfigC[indexC][1]], [0, 0], [xV3, yV3]);
					}
				}
				texte += num_alpha(2) + texte_en_couleur_et_gras(` Dans la translation qui transforme la figure ${tabfigC[iD1][2]} en la figure ${tabfigA[iB3][2]} quelle est le numéro de l'image de la figure ${numC} ?<br>`, `blue`);
				texte_corr += num_alpha(2) + texte_en_couleur_et_gras(` La figure image de la figure ${numC}  dans la translation qui transforme la figure ${tabfigC[iD1][2]} en la figure ${tabfigA[iB3][2]} porte le numéro ${num3}.<br>`, `blue`);


				break;

			case 4: //rotations

				//première question : centre A, rotation de 90° sens anti-horaire, une figure de tabfigA donne une figure de tabfigD, le point B donne le point D.
				indexA = randint(0, nx * ny - 1);
				numA = tabfigA[indexA][2];
				indexcentre1 = randint(0, nx * ny - 1, [indexA]);
				xmil1 = tabfigA[indexcentre1][0];
				ymil1 = tabfigA[indexcentre1][1];
				punto = image_point_par_transformation(6, [tabfigB[indexA][0], tabfigB[indexA][1]], [xmil1, ymil1]); // le repère est direct, donc le sens de rotation est inversé...
				trouver = false;
				while (trouver == false) {
					for (let j = 0; j < nx * ny; j++) {
						if (punto[0] == tabfigD[j][0] && punto[1] == tabfigD[j][1]) {
							trouver = true;
							num1 = tabfigD[j][2];
							xa = tabfigA[indexA][0];
							ya = tabfigA[indexA][1];
							break;
						}
					}
					if (trouver == false) {
						indexA = randint(0, nx * ny - 1);
						numA = tabfigA[indexA][2];
						indexcentre1 = randint(0, nx * ny - 1, [indexA]);
						xmil1 = tabfigA[indexcentre1][0];
						ymil1 = tabfigA[indexcentre1][1];
						punto = image_point_par_transformation(6, [tabfigB[indexA][0], tabfigB[indexA][1]], [xmil1, ymil1]); // le repère est direct, donc le sens de rotation est inversé...
					}
				}
				texte += num_alpha(0) + texte_en_couleur_et_gras(` Quel est le numéro de la figure image de la figure ${numA} dans la rotation de centre ${s0} et d'angle 90° dans le sens inverse des aiguilles d'une montre ?<br>`, `green`);
				texte_corr = num_alpha(0) + texte_en_couleur_et_gras(` La figure image de la figure ${numA} dans la rotation de centre ${s0} et d'angle 90° dans le sens inverse des aiguilles d'une montre porte le numéro ${num1}.<br>`, `green`);

				//deuxième question : centre B, rotation 90° sens horaire, une figure de tabfigD donne une figure de tabfigC
				indexD = randint(0, nx * ny - 1);
				numD = tabfigD[indexD][2];
				indexcentre2 = randint(0, nx * ny - 1, [indexD]);
				xmil2 = tabfigB[indexcentre2][0];
				ymil2 = tabfigB[indexcentre2][1];
				punto = image_point_par_transformation(5, [tabfigD[indexD][0], tabfigD[indexD][1]], [xmil2, ymil2]); // le repère est direct, donc le sens de rotation est inversé...
				trouver = false;
				while (trouver == false) {
					for (let j = 0; j < nx * ny; j++) {
						if (punto[0] == 4 + tabfigC[j][0] && punto[1] == tabfigC[j][1]) {
							trouver = true;
							num2 = tabfigC[j][2];
							xb = tabfigA[indexD][0];
							yb = tabfigA[indexD][1];
							break;
						}
					}
					if (trouver == false) {
						indexD = randint(0, nx * ny - 1);
						numD = tabfigD[indexD][2];
						indexcentre2 = randint(0, nx * ny - 1, [indexD]);
						xmil2 = tabfigB[indexcentre2][0];
						ymil2 = tabfigB[indexcentre2][1];
						punto = image_point_par_transformation(5, [tabfigD[indexD][0], tabfigD[indexD][1]], [xmil2, ymil2]); // le repère est direct, donc le sens de rotation est inversé...
					}
				}
				texte += num_alpha(1) + texte_en_couleur_et_gras(` Quel est le numéro de la figure image de la figure ${numD} dans la rotation de centre ${s1} et d'angle 90° dans le sens des aiguilles d'une montre ?<br>`, `red`);
				texte_corr += num_alpha(1) + texte_en_couleur_et_gras(` La figure image de la figure ${numD} dans la rotation de centre ${s1} et d'angle 90° dans le sens des aiguilles d'une montre porte le numéro ${num2}.<br>`, `red`);

				//troisième question : centre B, rotation 90° sens anti-horaire, une figure de tabfigC donne une figure de tabfigD
				indexC = randint(0, nx * ny - 1);
				numC = tabfigC[indexC][2];
				indexcentre3 = randint(0, nx * ny - 1, [indexC]);
				xmil3 = tabfigB[indexcentre3][0];
				ymil3 = tabfigB[indexcentre3][1];
				punto = image_point_par_transformation(6, [tabfigC[indexC][0], tabfigC[indexC][1]], [xmil3, ymil3]); // le repère est direct, donc le sens de rotation est inversé...
				trouver = false;
				while (trouver == false) {
					for (let j = 0; j < nx * ny; j++) {
						if (punto[0] == tabfigD[j][0] && punto[1] == 4 + tabfigD[j][1]) {
							trouver = true;
							num3 = tabfigD[j][2];
							xc = tabfigA[indexC][0];
							yc = tabfigA[indexC][1];
							break;
						}
					}
					if (trouver == false) {
						indexC = randint(0, nx * ny - 1);
						numC = tabfigC[indexC][2];
						indexcentre3 = randint(0, nx * ny - 1, [indexC]);
						xmil3 = tabfigB[indexcentre3][0];
						ymil3 = tabfigB[indexcentre3][1];
						punto = image_point_par_transformation(6, [tabfigC[indexC][0], tabfigC[indexC][1]], [xmil3, ymil3]); // le repère est direct, donc le sens de rotation est inversé...
					}
				}
				texte += num_alpha(2) + texte_en_couleur_et_gras(` Quel est le numéro de la figure image de la figure ${numC} dans la rotation de centre ${s2} et d'angle 90° dans le sens inverse des aiguilles d'une montre ?<br>`, `blue`);
				texte_corr += num_alpha(2) + texte_en_couleur_et_gras(` La figure image de la figure ${numC} dans la rotation de centre ${s2} et d'angle 90° dans le sens inverse des aiguilles d'une montre porte le numéro ${num3}.<br>`, `blue`);


				break;

		}
		
			this.liste_questions.push(texte);
			this.liste_corrections.push(texte_corr);
			liste_de_question_to_contenu_sans_numero(this);

	};
	this.besoin_formulaire_numerique = ['Transformations', 4, '1 : Symétries axiales\n 2 : Symétries centrales\n 3 : Translations\n 4 : Rotations\n 5 : Homothéties\n'];
}
