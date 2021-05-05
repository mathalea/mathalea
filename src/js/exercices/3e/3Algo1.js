import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint} from '../../modules/outils.js'
export const titre = 'Instruction conditionelle'

/**
 * * Instructions conditionnelles
 * * numéro de l'exo ex : 3Algo1
 * * publié le  24/11/2020
 * @author Erwan Duplessy
 */
export default function Instruction_conditionelle() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.debug = false;
	this.sup = 1;
	this.nbQuestions = 2;

	this.titre = titre;
	this.consigne = `Donner les coordonnées de la position finale du lutin.`;
	this.typeExercice = "Scratch"
	this.nbCols = 2;
	this.nbColsCorr = 1;
	this.nbQuestionsModifiable = false;
	sortieHtml ? this.spacing = 1 : this.spacing = 1;
	sortieHtml ? this.spacingCorr = 1 : this.spacingCorr = 1;
	this.listePackages = `scratch3`;
	//let type_de_questions_disponibles;	
	this.nouvelleVersion = function () {
		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées
		function scratchblocks_Tikz(code_svg, code_tikz) {
			if (sortieHtml) {
				return code_svg;
			} else {
				return code_tikz;
			};
		};

		let texte = "La position initiale d'un lutin dans un repère est (0,0). Dans le programme, x désigne l'abscisse, et y désigne l'ordonnée d'un lutin. <br>"; // texte de l'énoncé
		texte += `Une variable a été créée, elle s'appelle <code class="b">(var) :: ring</code>. <br>`;
		let texteCorr = " "; // texte du corrigé
		let code_tikz = ``; // code pour dessiner les blocs en tikz
		let code_svg = ``; // code pour dessiner les blocs en svg
		let nbRepetition = 1; // Nombre de fois où la boucle est répétée. 
		if (this.sup2) {
			nbRepetition = 3;
		}
		let xLutin = 0;
		let yLutin = 0;

		code_tikz += `\\medskip \\\\ \\begin{scratch} <br>`;
		code_svg += `<pre class='blocks'>`;

		let n1 = randint(1, 10);
		let n2 = randint(1, 10);
		let n3 = randint(1, 10);
		let n4 = randint(1, 10);

		code_tikz += `\\blockmove{aller à x: \ovalnum{0} y: \ovalnum{0}}`;
		code_svg += `quand le drapeau vert pressé <br>`;
		code_svg += `Aller à x:(0) y:(0) <br>`;
		code_svg += `mettre (var) à (${n1}) <br>`;
		code_svg += ` si <(var) < [${n2}]> alors <br>`;
		code_svg += ` ajouter (100) à x <br>`;
		if (this.sup > 1) {
			code_svg += ` si <(var) > [${n3}]> alors <br>`;
			code_svg += ` ajouter (50) à x <br>`;
			code_svg += ` fin <br>`;
		}
		code_svg += ` sinon <br>`;
		code_svg += ` ajouter (70) à y <br>`;
		if (this.sup > 2) {
			code_svg += ` si <(var) > [${n4}]> alors <br>`;
			code_svg += ` ajouter (40) à y <br>`;
			code_svg += ` fin <br>`;
		}
		code_svg += ` fin <br>`;

		code_svg += `</pre>`;
		code_tikz += `\\end{scratch}`;

		texte += scratchblocks_Tikz(code_svg, code_tikz);


		if (n1 < n2) {
			texteCorr += `Comme l'inégalité "${n1} < ${n2}" est vraie, alors on ajoute 100 à l'abscisse du lutin. <br>`;
			xLutin += 100;
			if (this.sup > 1) {
				if (n1 > n3) {
					texteCorr += `Comme l'inégalité "${n1} > ${n3}" est vraie, alors on ajoute 50 à l'abscisse du lutin. <br>`;
					xLutin += 50;
				} else {
					texteCorr += `Comme l'inégalité "${n1} > ${n3}" est fausse, alors on ne change pas l'abscisse du lutin. <br>`;
				}
			}
		} else {
			texteCorr += `Comme l'inégalité "${n1} < ${n2}" est fausse, alors on ajoute 70 à l'ordonnée du lutin. <br>`;
			yLutin += 70;
			if (this.sup > 2) {
				if (n1 > n4) {
					texteCorr += `Comme l'inégalité "${n1} > ${n4}" est vraie, on ajoute 40 à l'ordonnée du lutin. <br>`;
					yLutin += 40;
				} else {
					texteCorr += `Comme l'inégalité "${n1} > ${n4}" est fausse, alors on ne change pas l'ordonnée du lutin. <br>`;
				}
			}
		}
		texteCorr += ` La position finale est donc : (${xLutin} ; ${yLutin}).`;


		this.listeQuestions.push(texte);
		this.listeCorrections.push(texteCorr);
		listeQuestionsToContenu(this);
	};
	this.besoinFormulaireNumerique = [`Variante `, 3, '1 : sans condition imbriquée\n2 : avec une condition imbriquée\n3 : avec deux conditions imbriquées'];
}
