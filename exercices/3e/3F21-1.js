import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu_sans_numero,ecriture_algebrique,randint,reduire_ax_plus_b,tex_nombre,SVG_Tracer_droite,Latex_Tracer_droite,SVG_repere,Latex_repere,katex_Popup2} from "/modules/outils.js"

/**
 * Trace 5 droites et demande l'expression de la fonction affine ou linéaire correspondante
 * @Auteur Jean-Claude Lhote
 * Référence : 3F21-1
 */
export default function Lecture_expression_fonctions_affines() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Déterminer une fonction affine";
	this.consigne = "Donner l'expression des fonctions représentées";
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	sortie_html ? this.spacing = 2 : this.spacing = 1;
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1;
	this.sup = 1;
	this.sup2 = 3;
	this.lineaire = false;
	this.liste_packages = 'tkz-euclide';


	this.nouvelle_version = function (numero_de_l_exercice) {
		let k = Math.pow(2, parseInt(this.sup) - 1);
		let nb_droites = parseInt(this.sup2);
		this.liste_questions = [];
		this.liste_corrections = [];
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées
		let liste_droites = [];
		let OrdX0;
		let Pente = [];
		if (!this.lineaire) {
			Pente.push(randint(-2 * k, 2 * k));
			Pente.push(randint(-2 * k, 2 * k, [Pente[0]]));
			Pente.push(randint(-2 * k, 2 * k, [Pente[0], Pente[1]]));
			Pente.push(randint(-2 * k, 2 * k, [Pente[0], Pente[1], Pente[2]]));
			Pente.push(randint(-2 * k, 2 * k, [Pente[0], Pente[1], Pente[2], Pente[3]]));
		}
		else {
			Pente.push(randint(-3 * k, 3 * k, [0]));
			Pente.push(randint(-3 * k, 3 * k, [Pente[0], 0]));
			Pente.push(randint(-3 * k, 3 * k, [Pente[0], Pente[1], 0]));
			Pente.push(randint(-3 * k, 3 * k, [Pente[0], Pente[1], Pente[2], 0]));
			Pente.push(randint(-3 * k, 3 * k, [Pente[0], Pente[1], Pente[2], Pente[3], 0]));
		}

		for (let i = 0; i < 5; i++) {
			if (this.lineaire)
				OrdX0 = 0;
			else
				OrdX0 = randint(-1 + Pente[i] / k, 1 + Pente[i] / k);
			liste_droites.push([OrdX0, Pente[i] / k]);
		}

		if (sortie_html) {
			const mon_svg = SVG().viewbox(0, 0, 500, 500).size('100%', '100%');
			SVG_repere(mon_svg, -5, 5, -5, 5, k, k, 500, 500, true);
			SVG_Tracer_droite(mon_svg, 500, 500, -5, 5, -5, 5, liste_droites[0][0], liste_droites[0][1], 'blue', '(d1)');
			if (nb_droites > 1)
				SVG_Tracer_droite(mon_svg, 500, 500, -5, 5, -5, 5, liste_droites[1][0], liste_droites[1][1], 'red', '(d2)');
			if (nb_droites > 2)
				SVG_Tracer_droite(mon_svg, 500, 500, -5, 5, -5, 5, liste_droites[2][0], liste_droites[2][1], 'green', '(d3)');
			if (nb_droites > 3)
				SVG_Tracer_droite(mon_svg, 500, 500, -5, 5, -5, 5, liste_droites[3][0], liste_droites[3][1], 'brown', '(d4)');
			if (nb_droites > 4)
				SVG_Tracer_droite(mon_svg, 500, 500, -5, 5, -5, 5, liste_droites[4][0], liste_droites[4][1], 'purple', '(d5)');
			this.consigne = `<div style="width: 50%; display : table ">${mon_svg.svg()}</div>`;



		}
		else { //sortie Latex 
			let texte = `\\begin{tikzpicture}`;
			texte += Latex_repere(-5, 5, -5, 5, k, k, true);
			texte += Latex_Tracer_droite(-5, 5, -5, 5, liste_droites[0][0], liste_droites[0][1], 'blue', 'd_1');
			if (nb_droites > 1)
				texte += Latex_Tracer_droite(-5, 5, -5, 5, liste_droites[1][0], liste_droites[1][1], 'red', 'd_2');
			if (nb_droites > 2)
				texte += Latex_Tracer_droite(-5, 5, -5, 5, liste_droites[2][0], liste_droites[2][1], 'green', 'd_3');
			if (nb_droites > 3)
				texte += Latex_Tracer_droite(-5, 5, -5, 5, liste_droites[3][0], liste_droites[3][1], 'brown', 'd_4');
			if (nb_droites > 4)
				texte += Latex_Tracer_droite(-5, 5, -5, 5, liste_droites[4][0], liste_droites[4][1], 'purple', 'd_5');
			texte += `\n\t \\end{tikzpicture}`;
			this.liste_questions.push(texte);
		}
		for (let i = 0; i < nb_droites; i++) {
			this.liste_questions.push(`Déterminer l'expression de la fonction $f_${i + 1}$ représentée par la droite $(d_${i + 1})$.`);
			if (this.lineaire || liste_droites[i][0] == 0){
				this.liste_corrections.push(`La droite $(d_${i + 1})$ passe par l'origine. Elle représente donc la fonction linéaire $f_${i + 1}(x)=ax$ dont il faut déterminer le coefficient a.<br>$(d_${i + 1})$ passe par le point de coordonnées $(1;${tex_nombre(liste_droites[i][1])})$ donc $f_${i+1}(1)=${tex_nombre(liste_droites[i][1])}$ c'est à dire $a\\times 1=${tex_nombre(liste_droites[i][1])}$ donc $a=${tex_nombre(liste_droites[i][1])}\\div 1$ d'où $a=${tex_nombre(liste_droites[i][1])}$. Ainsi $f_${i+1}(x)=${reduire_ax_plus_b(liste_droites[i][1],0)}$.`);

			}
			else {
				this.liste_corrections.push(`La droite $d_${i + 1}$ passe par le point de coordonnées $(0;${tex_nombre(liste_droites[i][0])})$. Elle représente donc la fonction affine $f_${i + 1}(x)=ax+b$ dont la constante $b$ est égale à $f_${i + 1}(0)=a\\times 0+b$, c'est à dire  $${tex_nombre(liste_droites[i][0])}=0+b$ donc $b=${tex_nombre(liste_droites[i][0])}$.<br> De plus $(d_${i + 1})$ passe par le point de coordonnées $(1;${tex_nombre(liste_droites[i][1]+liste_droites[i][0])})$ donc $f_${i + 1}(1)=${tex_nombre(liste_droites[i][1]+liste_droites[i][0])}=a\\times 1${ecriture_algebrique(liste_droites[i][0])}=a${ecriture_algebrique(liste_droites[i][0])}$ donc $a=${tex_nombre(liste_droites[i][1]+liste_droites[i][0])}${ecriture_algebrique(-liste_droites[i][0])}=${tex_nombre(liste_droites[i][1])}$. Ainsi $f_${i+1}(x)=${reduire_ax_plus_b(liste_droites[i][1],liste_droites[i][0])}$.`);
			}
		}

		liste_de_question_to_contenu_sans_numero(this);
		if (!this.lineaire)
			this.contenu_correction = `Il s’agit de fonctions affines, elles sont donc de la forme $f(x)=ax+b$, $b$ étant l’ordonnée à l’origine et $a$ la pente de la droite.\n` + this.contenu_correction;
		else 
			this.contenu_correction = `Il s’agit de fonctions linéaires, elles sont donc de la forme $f(x)=ax$, $a$ étant la ` + katex_Popup2(numero_de_l_exercice, 1, `pente`, `pente d'une droite`, `La pente (le a de y=ax ou y=ax+b) d'une droite donne le taux d'accroissement de y par rapport à x : lorsque x augmente de 1, alors y augmente de a.`) + ` de la droite.\n` + this.contenu_correction;
		};
	this.besoin_formulaire_numerique = ['Niveau de difficulté', 3, "1 : Coefficient directeur entier\n2 : Coefficient directeur 'en demis'\n3 : Coefficient directeur 'en quarts'"];
	this.besoin_formulaire2_numerique = ['Nombre de droites (1 à 5)', 5];
}
