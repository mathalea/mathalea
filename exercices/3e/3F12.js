import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes_sans_changer_ordre,tex_enumerate,mise_en_evidence,itemize,tikz_machine_diag,num_alpha,tex_cadre_par_orange,SVG_machine_diag_3F12} from "/modules/outils.js"

/**
 * 3F12 Notion de fonction - Vocabulaire
 * Déterminer à partir de plusieurs modes de représentation l'image d'un nombre
 * @author Sébastien LOZANO
 */
export default function fonctions_calculs_d_images() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1;
	this.titre = "Fonctions : Calculs d'images";
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne = ``;
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne += `Calcule les images avec la méthode demandée.`;

	sortie_html ? this.spacing = 2 : this.spacing = 1;
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1;
	this.nb_questions = 4;
	//this.correction_detaillee_disponible = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 5;

	var num_ex = '3F12'; // pour rendre unique les id des SVG, en cas d'utilisation dans plusieurs exercices y faisant appel

	if (sortie_html) {
		var pourcentage = '100%'; // pour l'affichage des svg. On a besoin d'une variable globale
	} else { // sortie LaTeX
	};
	this.nouvelle_version = function (numero_de_l_exercice) {
		let type_de_questions;
		if (sortie_html) { // les boutons d'aide uniquement pour la version html
			//			 this.bouton_aide = modal_pdf(numero_de_l_exercice,"pdf/FicheFonctions-3F1-act.pdf","Aide mémoire sur les fonctions (Sébastien Lozano)","Aide mémoire")		
			//			 this.bouton_aide += modal_video('videoTest','videos/Fonctions.mp4','Petit conte mathématique','Intro Vidéo');
		}
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = [];
		if (this.sup == 1) {
			type_de_questions_disponibles = [1]; // prog de calcul
		} else if (this.sup == 2) {
			type_de_questions_disponibles = [2]; // diagramme
		} else if (this.sup == 3) {
			type_de_questions_disponibles = [3]; // f(x) = ...
		} else if (this.sup == 4) {
			type_de_questions_disponibles = [4]; // f : x ---> ...
		} else if (this.sup == 5) {
			type_de_questions_disponibles = [1, 2, 3, 4]; // mélange
		};
		//let type_de_questions_disponibles = [1];
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions);

		for (let i = 0, a, b, c, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
			type_de_questions = liste_type_de_questions[i];

			if (sortie_html) {
				let id_unique = `${num_ex}_${i}_${Date.now()}`;
				var id_du_div = `div_svg${numero_de_l_exercice}${id_unique}`;
				var id_du_div_corr = `div_svg_corr${numero_de_l_exercice}${id_unique}`;
			}
			// on part sur de l'affine avec coeff positifs, on verra ensuite
			a = randint(2, 9);
			b = randint(2, 9);
			c = randint(2, 9);

			switch (type_de_questions) {
				case 1:
					var j = 0; // pour la sous-numérotation
					texte = `On donne le programme de calcul suivant qui correspond à une certaine fonction :`;
					texte_corr = `Avec ce programme de calcul :`;
					if (sortie_html) {
						texte += `
							<br>
							<div class="ui compact warning message">		
							<p>							
							- Choisir un nombre<br>
							- Multiplier ce nombre par ${a}<br>
							- Ajouter ${b} au résultat obtenu<br>
							</p>
							</div>
							<br>`;
						// sous-question a/
						texte += num_alpha(j) + ` Appliquer ce programme de calcul au nombre ${c}<br>`;
						texte_corr += `<br>` + num_alpha(j) + `
							<br>
							<div class="ui compact warning message">		
							<p>							
							- On choisit le nombre ${c}<br>
							- On multiplie ce nombre par ${a} : ${a}$\\times$ ${c} = ${a * c}<br>
							- On ajoute ${b} au résultat obtenu : ${a * c}+${b}=${a * c + b}<br>
							</p>
							</div>
							<br>							
							`;
						j++;
						// sous-question b/
						texte += num_alpha(j) + ` Traduire ce calcul par une phrase contenant le mot image`;
						texte_corr += num_alpha(j) + `L'image de ${c} par cette fonction vaut ${a * c + b}`;
						texte_corr += `<br> On peut aussi dire que ${a * c + b} est l'image de ${c} par cette fonction`;
					} else {
						texte += tex_cadre_par_orange(itemize([`Choisir un nombre`, `Multiplier ce nombre par ${a}`, `Ajouter ${b} au résultat obtenu`]));
						// sous-question a/
						texte += tex_enumerate([`Appliquer ce programme de calcul au nombre ${c}`, `Traduire ce calcul par une phrase contenant le mot image`], this.spacing);
						//texte_corr += 
						texte_corr += tex_enumerate([tex_cadre_par_orange(itemize([`On choisit le nombre ${c}`, `On multiplie ce nombre par ${a} : $${a} \\times ${c} = ${a * c}$ `, `On ajoute ${b} au résultat obtenu : $${a * c}+${b}=${a * c + b}$`])), `L'image de ${c} par cette fonction vaut ${a * c + b}<br>On peut aussi dire que ${a * c + b} est l'image de ${c} par cette fonction`], this.spacing);
					};
					break;
				case 2:
					var j = 0; // pour la sous-numérotation

					// les variables a,b,c changent sans refaire un appel à randint
					texte = `Soit $f$ la fonction définie par l'expression algébrique $f(x)=$ ${a}$x+$${b}`;
					if (sortie_html) {
						// sous-question a/
						texte += `<br>` + num_alpha(j) + ` Calculer l'image de ${c}`;
						texte += `<br>`;
						texte_corr = num_alpha(j) + ` Calculons l'image par $f$ de $x= ${c}$ :`;
						texte_corr += `<br>$f(${mise_en_evidence('\\textit{\\textbf{x}}')})= ${a} ${mise_en_evidence('\\textit{\\textbf{x}}')}+${b}$`;
						texte_corr += `<br>$f(${mise_en_evidence(c)})= ${a}\\times ${mise_en_evidence(c)}+${b}$`;
						texte_corr += `<br>$f(${mise_en_evidence(c)})= ${a * c}+${b}$`;
						texte_corr += `<br>$f(${mise_en_evidence(c)})= ${a * c + b}$`;
						j++;
						//sous question b/
						texte += num_alpha(j) + ` Traduire ce calcul par une phrase contenant le mot image`;
						texte_corr += `<br>` + num_alpha(j) + ` L'image de ${c} par la fonction $f$ vaut ${a * c + b}`;
						texte_corr += `<br> On peut aussi dire que ${a * c + b} est l'image de ${c} par la fonction $f$`;
					} else {
						// sous-question a/ et b/
						texte += tex_enumerate([`Calculer l'image de ${c}`, `Traduire ce calcul par une phrase contenant le mot image`], this.spacing);
						texte_corr = tex_enumerate([`Calculons l'image par $f$ de $x= ${c}$ :
							<br>$f(${mise_en_evidence('\\textit{\\textbf{x}}')})= ${a} ${mise_en_evidence('\\textit{\\textbf{x}}')}+${b}$
							<br>$f(${mise_en_evidence(c)})= ${a}\\times ${mise_en_evidence(c)}+${b}$
							<br>$f(${mise_en_evidence(c)})= ${a * c}+${b}$
							<br>$f(${mise_en_evidence(c)})= ${a * c + b}$`, `L'image de ${c} par la fonction $f$ vaut ${a * c + b}
							<br> On peut aussi dire que ${a * c + b} est l'image de ${c} par la fonction $f$`
						], this.spacing);
					};
					break;
				case 3:
					var j = 0; // pour la sous-numérotation

					// les variables a,b,c changent sans refaire un appel à randint
					texte = `Soit $g$ la fonction définie par $g:x\\longmapsto$ ${a}$x+$${b}`;
					if (sortie_html) {
						// sous-question a/
						texte += `<br>` + num_alpha(j) + ` Calculer l'image de ${c}`;
						texte += `<br>`;
						texte_corr = num_alpha(j) + ` Calculons l'image par $g$ de $x= ${c}$ :`;
						texte_corr += `<br>$g:${mise_en_evidence('\\textit{\\textbf{x}}')}\\longmapsto ${a} ${mise_en_evidence('\\textit{\\textbf{x}}')}+${b}$`;
						texte_corr += `<br>$g:${mise_en_evidence(c)}\\longmapsto ${a}\\times${mise_en_evidence(c)}+${b}$`;
						texte_corr += `<br>$g:${mise_en_evidence(c)}\\longmapsto ${a * c}+${b}$`;
						texte_corr += `<br>$g:${mise_en_evidence(c)}\\longmapsto ${a * c + b}$`;
						j++;
						//sous question b/
						texte += num_alpha(j) + ` Traduire ce calcul par une phrase contenant le mot image`;
						texte_corr += `<br>` + num_alpha(j) + ` L'image de ${c} par la fonction $g$ vaut ${a * c + b}`;
						texte_corr += `<br> On peut aussi dire que ${a * c + b} est l'image de ${c} par la fonction $g$`;
					} else {
						// sous-question a/ et b/
						texte += tex_enumerate([`Calculer l'image de ${c}`, `Traduire ce calcul par une phrase contenant le mot image`], this.spacing);
						texte_corr = tex_enumerate([`Calculons l'image par $g$ de $x= ${c}$ :
							<br>$g:${mise_en_evidence('\\textit{\\textbf{x}}')}\\longmapsto ${a} ${mise_en_evidence('\\textit{\\textbf{x}}')}+${b}$
							<br>$g:${mise_en_evidence(c)}\\longmapsto ${a}\\times ${mise_en_evidence(c)}+${b}$
							<br>$g:${mise_en_evidence(c)}\\longmapsto ${a * c}+${b}$
							<br>$g:${mise_en_evidence(c)}\\longmapsto ${a * c + b}$`, `L'image de ${c} par la fonction $g$ vaut ${a * c + b}
							<br> On peut aussi dire que ${a * c + b} est l'image de ${c} par la fonction $g$`
						], this.spacing);
					};
					break;
				case 4:
					texte = ``;
					texte_corr = ``;
					texte_corr += `Calculer avec un diagramme `;
					var j = 0; // pour la sous-numérotation

					// les variables a,b,c changent sans refaire un appel à randint
					texte += `Soit la fonction $h$ définie par le diagramme `;
					if (sortie_html) {
						// sous-question a/
						texte += `<div id="${id_du_div}" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
						SVG_machine_diag_3F12(id_du_div, 800, 100, 'h', 'x', [['' + a, a + 'x'], ['' + b, a + 'x+' + b]]);
						texte += num_alpha(j) + ` Calculer l'image de ${c}`;
						texte += `<br>`;
						texte_corr += `<br>`;
						texte_corr += num_alpha(j) + ` Calculons l'image par $h$ de $x=$ ${c} :`;
						texte_corr += `<div id="${id_du_div_corr}" style="width: ${pourcentage}"; display : table "></div>`;
						SVG_machine_diag_3F12(id_du_div_corr, 800, 100, 'h', '' + c, [['' + a, '' + (a * c)], ['' + b, '' + (a * c + b)]]);
						j++;
						//sous question b/
						texte += num_alpha(j) + ` Traduire ce calcul par une phrase contenant le mot image`;
						texte_corr += `<br>` + num_alpha(j) + ` L'image de ${c} par la fonction $h$ vaut ${a * c + b}`;
						texte_corr += `<br> On peut aussi dire que ${a * c + b} est l'image de ${c} par la fonction $h$`;
					} else {
						texte += `<br>` + tikz_machine_diag(`h`, `x`, [[`\\times ` + a, a + `x`], [`+` + b, a + `x+` + b]]);
						// sous-question a/ et b/
						texte += tex_enumerate([`Calculer l'image de ${c}`, `Traduire ce calcul par une phrase contenant le mot image`], this.spacing);
						texte_corr = tex_enumerate(
							[`Calculons l'image par $g$ de $x=$ ${c} :<br>` + tikz_machine_diag(`h`, c, [[`\\times ` + a, (a * c)], [`+` + b, (a * c + b)]]),
							`L'image de ${c} par la fonction $g$ vaut ${a * c + b}
						 	<br> On peut aussi dire que ${a * c + b} est l'image de ${c} par la fonction $g$`
							], this.spacing);
					};
					break;
			};

			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}

		liste_de_question_to_contenu(this);
	};
	this.besoin_formulaire_numerique = ['Règle à travailler', 5, "1 : &Agrave; partir d'un programme de calcul\n2 : &Agrave; partir de l'expression algébrique sous forme f(x) = ...\n3 : &Agrave; partir de l'expression algébrique sous forme f : x --> ...\n4 : &Agrave; partir d'un diagramme\n5 : Mélange"];
}
