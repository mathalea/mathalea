import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,combinaisonListesSansChangerOrdre,texNombre,nombre_avec_espace,modalPdf,modal_video,liste_diviseurs,tikz_machine_maths,tikz_machine_diag,katex_Popup,num_alpha,machine_maths_video,info_message,lampe_message} from '../../modules/outils.js'
import {SVG_machine_diag_3F1_act_mono, SVG_machine_diag_3F12} from '../../modules/macroSvgJs.js'
export const titre = 'Fonctions : Notion et vocabulaire'

/**
 * 3F1-act - Notion de fonction - vocabulaire
 * L’objectif de revenir sur l'introduction de la notion de fonction et son vocabulaire
 * On base l'exercice sur des calculs simples de type périmètres, aires, double, triple, nombre de diviseurs
 * ATTENTION BUG SVG DONC LES ANIMATIONS SONT FILMEES A PARTIR DE CELLES GENEREES PAR LA FONCTION SVG_machine_maths() SOUS FIREFOX
 * DE FACON A AVOIR UN RENDU UNIFORME QUEL QUE SOIT LE NAVIGATEUR ON REND LES ANIMATIONS PAR DES VIDEOS
 * ON LAISSE LA PIROUETTE DE DETECTION DU USERAGENT EN COMMENTAIRE EN ATTENDANT DE TROUVER UNE SOLUTION DE RENDU LATEX DANS SVG UNIVERSELLE
 * @Auteur Sébastien Lozano
 */
export default function fonction_notion_vocabulaire() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1;
	this.titre = titre;
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne = `Étudier différents procédés de calcul.`;
	sortieHtml ? this.spacing = 3 : this.spacing = 1;
	sortieHtml ? this.spacingCorr = 2 : this.spacingCorr = 1;
	//this.nbQuestions;// = 4;
	this.nbQuestionsModifiable = false;
	//this.correctionDetailleeDisponible = true;
	this.nbCols = 1;
	this.nbColsCorr = 1;
	this.sup = 5;
	this.listePackages = `bclogo`;

	var num_ex = '3F1-act'; // pour rendre unique les id des SVG, en cas d'utilisation dans plusieurs exercices y faisant appel

	if (sortieHtml) {
		var pourcentage = '100%'; // pour l'affichage des svg. On a besoin d'une variable globale
	} else { // sortie LaTeX
	};
	this.nouvelleVersion = function (numeroExercice) {
		let type_de_questions;

		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenuCorrection = ''; // Liste de questions corrigées
		let type_de_questions_disponibles;
		this.sup = Number(this.sup); // attention le formulaire renvoie un string, on a besoin d'un number pour le switch !
		switch (this.sup) {
			case 1:
				type_de_questions_disponibles = [1];
				this.nbQuestions = 1;
				break;
			case 2:
				type_de_questions_disponibles = [2];
				this.nbQuestions = 1;
				break;
			case 3:
				type_de_questions_disponibles = [3];
				this.nbQuestions = 1;
				break;
			case 4:
				type_de_questions_disponibles = [4];
				this.nbQuestions = 1;
				break;
			case 5:
				type_de_questions_disponibles = [1, 2, 3, 4];
				this.nbQuestions = 4;
				break;
		}


		//let type_de_questions_disponibles = [1];
		let liste_type_de_questions = combinaisonListesSansChangerOrdre(type_de_questions_disponibles, this.nbQuestions);

		this.introduction = lampe_message({
			titre: `Introduction`,
			texte: `Lorsqu'un nombre $\\textit{x}$ entre dans une machine mathématique , celle-ci renvoie à la sortie un nombre appelé $\\textit{image de x}$.<br>
				On dit que le nombre de départ est un $\\textit{antécédent}$ du nombre qu'on trouve à la sortie.<br>
				Ces machines sont appelées $\\textit{fonctions}$, on a l'habitude de leur donner des noms $\\textit{f}$ ou $\\textit{g}$ ou $\\textit{h} \\ldots$
				<br>`,
			couleur: `nombres`
		});

		if (sortieHtml) { // les boutons d'aide uniquement pour la version html
			this.boutonAide = modalPdf(numeroExercice, "assets/pdf/FicheFonctions-3F1-act.pdf", "Aide mémoire sur les fonctions (Sébastien Lozano)", "Aide mémoire");
			this.boutonAide += modal_video('conteMathsFonctions', '/videos/Fonctions.mp4', 'Petit conte mathématique', 'Intro Vidéo');
			this.introduction += machine_maths_video(`assets/videos/machineMathsIntro.mp4`);
		} else { // sortie LaTeX
			this.introduction += tikz_machine_maths('maths', '---', `Proc\\acute{e}d\\acute{e}`, 'de\\,calcul', `ant\\acute{e}c\\acute{e}dent`, `\\textit{x}`, `image`, `\\textit{y}`);
		};
		for (let i = 0, x, y, z, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
			type_de_questions = liste_type_de_questions[i];

			if (sortieHtml) {
				var id_unique = `${num_ex}_${i}_${Date.now()}`;
				var id_du_div_diag = `div_svg_diag${numeroExercice}${id_unique}`;
				var id_du_div_corr = `div_svg_corr${numeroExercice}${id_unique}`;
			}
			let txt_info;

			switch (type_de_questions) {
				case 1: // périmètre d'un carré de côté x			
					var j = 0; // pour la sous-numérotation

					// question
					if (sortieHtml) {
						texte = `La $\\mathbf{machine\\,f}$ renvoie le ` + katex_Popup(`périmètre`, `Rappel`, `Le périmètre d'un polygone est égal à la somme des longueurs de ses côtés`) + ` d'un carré de côté $x$`;
					} else {
						texte = `<br>La $\\mathbf{machine\\,f}$ renvoie le \\textbf{périmètre} \\footnote{\\textbf{Rappel :} Le périmètre d'un polygone est égal à la somme des longueurs de ses côtés} d'un carré de côté $x$`;
					}
					texte += `<br>`;
					// machine						
					x = randint(2, 99); //augmenter les possibles pour éviter les questions déjà posées?	
					if (sortieHtml) {
						texte += machine_maths_video(`assets/videos/machineMaths-f.mp4`);
					} else { // sortie Latex avec Tikz
						texte += tikz_machine_maths('f', '---', `P\\acute{e}rim\\grave{e}tre`, `d'un\\,carr\\acute{e}`, `carr\\acute{e}\\,de`, `c\\hat{o}t\\acute{e}\\,${x}\\,cm`, `P\\acute{e}rim\\grave{e}tre`, `???\\,cm`);
					};
					// sous question a/						
					if (sortieHtml) {
						texte += num_alpha(j) + ` Que renvoie la machine si le côté vaut  ${x}  cm ? Formuler la réponse `;
						texte += katex_Popup('avec le mot image', 'Image', 'La valeur du périmètre est l\'image de la valeur du côté') + `<br>`;
						texteCorr = num_alpha(j) + ` Si le côté vaut ${x} cm alors la machine renvoie le périmètre d'un carré de côté ${x} cm, c'est à dire $${x}+${x}+${x}+${x} = 4\\times ${x} = ${4 * x}$ cm.<br>`;
						texteCorr += `On dit que ${4 * x} est l'image de ${x} par la fonction f.<br>`;
						j++; //incrémente la sous question	
					} else { //sortie LaTeX
						texte += `\\begin{enumerate}[itemsep=1em]`;
						texte += `\\item Que renvoie la machine si le côté vaut  ${x}  cm ? Formuler la réponse avec le mot \\textbf{image} \\footnote{\\textbf{Image :} La valeur du périmètre est l\'image de la valeur du côté}`;
						texteCorr = `\\begin{enumerate}[itemsep=1em]`;
						texteCorr += `\\item Si le côté vaut ${x} cm alors la machine renvoie le périmètre d'un carré de côté ${x} cm, c'est à dire $${x}+${x}+${x}+${x} = 4\\times ${x} = ${4 * x}$ cm.<br>`;
						texteCorr += `On dit que ${4 * x} est l'image de ${x} par la fonction f.`;
					};

					// sous question b/	
					y = randint(2, 99, [x]); //augmenter les possibles pour éviter les questions déjà posées?	
					if (sortieHtml) {
						texte += num_alpha(j) + ` Combien vaut le côté si la machine renvoie  ${4 * y} cm ? Formuler la réponse `;
						texte += katex_Popup('avec le mot antécédent', 'Antécédent', 'un antécédent de la valeur d\'un périmètre est une valeur du côté qui a pour image ce périmètre') + `<br>`;
						texteCorr += num_alpha(j) + ` Si la machine renvoie un périmètre de ${4 * y} cm alors le côté du carré vaut $${4 * y}\\div 4 = ${y}$ cm.<br>`;
						texteCorr += `On dit que ${y} est <b>un</b> antécédent de ${4 * y} par la fonction f.<br>`;
						j++; //incrémente la sous question
					} else { //sortie LaTeX
						texte += `\\item Combien vaut le côté si la machine renvoie  ${4 * y} cm ? Formuler la réponse avec le mot \\textbf{antécédent} \\footnote{\\textbf{Antécédent :} Un antécédent de la valeur d\'un périmètre est une valeur du côté qui a pour image ce périmètre}`;
						texteCorr += `\\item Si la machine renvoie un périmètre de ${4 * y} cm alors le côté du carré vaut $${4 * y}\\div 4 = ${y}$ cm.<br>`;
						texteCorr += `On dit que ${y} est \\textbf{un} antécédent de ${4 * y} par la fonction f.`;
					};

					// sous question c/
					z = randint(2, 99, [x, y]); //augmenter les possibles pour éviter les questions déjà posées?						
					if (sortieHtml) {
						texte += num_alpha(j) + ` Quelle est l'image de ${z} par la `;
						texte += katex_Popup('fonction', 'Vocabulaire', '<b>fonction</b> est le nom que l\'on donne à ces machines mathématiques');
						texte += ` $\\mathbf{f}$ ? &Eacute;crire la réponse sous la forme `;
						texte += katex_Popup('$\\mathbf{f(' + z + ')=\\ldots}$', 'Notation', '4 a pour image 16 par la fonction f peut s\'écrire <b>f(4)=16</b>') + `<br>`;
						texteCorr += num_alpha(j) + ` L'image de ${z} par la fonction f vaut $f(${z})=4\\times ${z}=${4 * z}$.<br>`;
						j++; //incrémente la sous question	
					} else { // sortie LaTeX
						texte += `\\item Quelle est l'image de ${z} par la \\textbf{fonction f} \\footnote{\\textbf{Vocabulaire :} \\textit{fonction} est le nom que l\'on donne à ces machines mathématiques}`;
						texte += ` ? \\'{E}crire la réponse sous la forme $\\mathbf{f(${z})=\\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction f peut s\'écrire $\\mathbf{f(4)=16}$}`;
						texteCorr += `\\item L'image de ${z} par la fonction f vaut $f(${z})=4\\times ${z}=${4 * z}$.`;
					};

					// sous question d/
					if (sortieHtml) {
						texte += num_alpha(j) + ` Que renvoie la machine si le côté vaut $x$ cm ?`;
						texte += ` &Eacute;crire la réponse sous la forme `;
						texte += katex_Popup('$\\mathbf{f(\\textbf{\\textit{x}})=\\ldots}$', 'Notation', '4 a pour image 16 par la fonction f peut s\'écrire <b>f(4)=16</b>') + `<br>`;
						texteCorr += num_alpha(j) + ` Si le côté vaut $x$ la machine renvoie $x+x+x+x$ ce qui est équivalent à $4\\times x$ .<br>`;
						texteCorr += ` L'image de $x$ par la fonction f vaut $4\\times x$ donc $f(x)=4\\times x$.<br>`;
						j++; //incrémente la sous question	
					} else { // sortie LaTeX
						texte += `\\item   Que renvoie la machine si le côté vaut $x$ cm ?`;
						texteCorr += `\\item  Si le côté vaut $x$ la machine renvoie $x+x+x+x$ ce qui est équivalent à $4\\times x$ .`;
						texte += ` \\'{E}crire la réponse sous la forme $\\mathbf{f(\\textbf{\\textit{x}})=\\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction f peut s\'écrire $\\mathbf{f(4)=16}$}`;
						texteCorr += ` L'image de $x$ par la fonction f vaut $4\\times x$ donc $f(x)=4\\times x$.`;
					};

					// sous question e/
					txt_info = `Voici le diagramme d'une machine qui triple `;
					if (sortieHtml) {
						texte += num_alpha(j) + ` Comme dans l’exemple ci-dessous, écrire le diagramme de la fonction $\\mathbf{f}$.<br>`;
						txt_info += `<div id="${id_du_div_diag}" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
						SVG_machine_diag_3F1_act_mono(id_du_div_diag, 800, 100, 't', 'x', [['3', '3x']]);
						texteCorr += num_alpha(j) + ` C'est une machine qui quadruple, donc sous forme de diagramme.<br>`;
						texteCorr += `<div id="${id_du_div_corr}" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
						SVG_machine_diag_3F1_act_mono(id_du_div_corr, 800, 100, 'f', 'x', [['4', '4x']]);
						j++; //incrémente la sous question
					} else { // sortie LaTeX
						texte += `\\item   Comme dans l’exemple ci-dessous, écrire le diagramme de la fonction $\\mathbf{f}$.<br>`;
						txt_info += '<br>' + tikz_machine_diag(`t`, `x`, [[`\\times 3`, `3x`]]);
						texteCorr += `\\item  C'est une machine qui quadruple, donc sous forme de diagramme.<br>`;
						texteCorr += tikz_machine_diag(`f`, `x`, [[`\\times 4`, `4x`]]);
					};
					texte += info_message({
						titre: 'Exemple',
						texte: txt_info,
						couleur: 'nombres'
					});

					// sous question f/
					if (sortieHtml) {
						texte += num_alpha(j) + ` Ecrire maintenant la fonction f en utilisant la forme  `;
						texte += katex_Popup('$\\mathbf{f:\\textbf{\\textit{x}}\\longmapsto \\ldots}$', 'Notation', '4 a pour image 16 par la fonction f peut s\'écrire $\\mathbf{f:4\\longmapsto 16}$');
						texteCorr += num_alpha(j) + ` L'image de $x$ par la fonction f vaut $4\\times x$ donc $f:x\\longmapsto 4\\times x$.<br>`;
						j++; //incrémente la sous question
					} else { // sortie LaTeX
						texte += `\\item   Ecrire maintenant la fonction f en utilisant la forme $\\mathbf{f:\\textbf{\\textit{x}}\\longmapsto \\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction f peut s\'écrire $\\mathbf{f:4\\longmapsto 16}$},`;
						//texte += ` écrire la réponse à la question d/`;
						texteCorr += `\\item  L'image de $x$ par la fonction f vaut $4\\times x$ donc $f:x\\longmapsto 4\\times x$.`;
						texte += `\\end{enumerate}`;
						texteCorr += `\\end{enumerate}`;
					};
					break;
				case 2: // aire d'un carré de côté x
					var j = 0; // pour la sous-numérotation
					if (sortieHtml) {
						texte = `La $\\textbf{machine\\,g}$ renvoie ` + katex_Popup('l\'aire', 'Rappel', 'L\'aire d\'un carré est égale au produit de la longueur de son côté par lui-même.') + ` d'un carré de côté $x$`;
					} else {
						texte = `<br>La $\\textbf{machine\\,g}$ renvoie \\textbf{l\'aire} \\footnote{\\textbf{Rappel :} L\'aire d\'un carré est égale au produit de la longueur de son côté par lui-même.} d'un carré de côté $x$`;
					}
					texte += `<br>`;
					// machine
					x = randint(2, 99); //augmenter les possibles pour éviter les questions déjà posées?	
					if (sortieHtml) {
						texte += machine_maths_video(`assets/videos/machineMaths-g.mp4`);
					} else { // sortie Latex avec Tikz
						texte += tikz_machine_maths('g', '---', `Aire`, `d'un\\,carr\\acute{e}`, `carr\\acute{e}\\,de`, `c\\hat{o}t\\acute{e}\\,${x}\\,cm`, `Aire`, `???\\,cm^2`);
					};
					// sous question a/	
					if (sortieHtml) {
						texte += num_alpha(j) + ` Que renvoie la machine si le côté vaut  ${x}  cm ? Formuler la réponse `;
						texte += katex_Popup('avec le mot image', 'Image', 'la valeur de l\'aire est l\'image de la valeur du côté') + `<br>`;
						texteCorr = num_alpha(j) + ` Si le côté vaut ${x} cm alors la machine renvoie l'aire d'un carré de côté ${x} cm, c'est à dire $${x}\\times ${x}=${texNombre(x * x)}\\,cm^2$.<br>`;
						texteCorr += `On dit que ${nombre_avec_espace(x * x)} est l'image de ${x} par la fonction g.<br>`;
						j++; //incrémente la sous question
					} else { //sortie LaTeX
						texte += `\\begin{enumerate}[itemsep=1em]`;
						texte += `\\item  Que renvoie la machine si le côté vaut  ${x}  cm ? Formuler la réponse `;
						texte += `avec le mot \\textbf{image} \\footnote{\\textbf{Image :} La valeur de l\'aire est l\'image de la valeur du côté.}`;
						texteCorr = `\\begin{enumerate}[itemsep=1em]`;
						texteCorr += `\\item Si le côté vaut ${x} cm alors la machine renvoie l'aire d'un carré de côté ${x} cm, c'est à dire $${x}\\times ${x}=${texNombre(x * x)}\\,cm^2$.<br>`;
						texteCorr += `On dit que ${nombre_avec_espace(x * x)} est l'image de ${x} par la fonction g.`;
					};

					// sous question b/	
					y = randint(2, 99, [x]); //augmenter les possibles pour éviter les questions déjà posées?	
					if (sortieHtml) {
						texte += num_alpha(j) + ` Combien vaut le côté si la machine renvoie  ${nombre_avec_espace(y * y)} cm<sup>2</sup> ? Formuler la réponse `;
						texte += katex_Popup('avec le mot antécédent', 'Antécédent', 'un antécédent de la valeur d\'une aire est une valeur du côté qui a pour image cette aire') + `<br>`;
						texteCorr += num_alpha(j) + ` Si la machine renvoie une aire de $${texNombre(y * y)}\\,cm^2$ alors le côté du carré vaut $\\sqrt{${texNombre(y * y)}}=${y}\\,cm$.<br>`;
						texteCorr += `On dit que ${y} est <b>un</b> antécédent de ${y * y} par la fonction g.<br>`;
						j++; //incrémente la sous question	
					} else { //sortie LaTeX
						texte += `\\item  Combien vaut la longueur du côté si la machine renvoie  ${nombre_avec_espace(y * y)} $cm^2$ ? Formuler la réponse `;
						texte += `avec le mot \\textbf{antécédent} \\footnote{\\textbf{Antécédent :} Un antécédent de la valeur d\'une aire est une valeur du côté qui a pour image cette aire}`;
						texteCorr += `\\item Si la machine renvoie une aire de $${texNombre(y * y)}\\,cm^2$ alors le côté du carré vaut $\\sqrt{${texNombre(y * y)}}=${y}\\,cm$.<br>`;
						texteCorr += `On dit que ${y} est \\textbf{un} antécédent de ${nombre_avec_espace(y * y)} par la fonction g.`;
					};

					// sous question c/
					z = randint(2, 99, [x, y]); //augmenter les possibles pour éviter les questions déjà posées?							
					if (sortieHtml) {
						texte += num_alpha(j) + ` Quelle est l'image de ${z} par la `;
						texte += katex_Popup('fonction', 'Vocabulaire', '<b>fonction</b> est le nom que l\'on donne à ces machines mathématiques');
						texte += ` $g$ ? &Eacute;crire la réponse sous la forme `;
						texte += katex_Popup('$\\mathbf{g(' + z + ')=\\ldots}$', 'Notation', '4 a pour image 16 par la fonction g peut s\'écrire <b>g(4)=16</b>') + `<br>`;
						texteCorr += num_alpha(j) + ` L'image de ${z} par la fonction g vaut $g(${z})=${z}\\times ${z}=${texNombre(z * z)}$.<br>`;
						j++; //incrémente la sous question
					} else { // sortie LaTeX
						texte += `\\item  Quelle est l'image de ${z} par la `;
						texte += `\\textbf{fonction g} \\footnote{\\textbf{Vocabulaire :} \\textit{fonction} est le nom que l\'on donne à ces machines mathématiques.}`;
						texte += ` ? \\'{E}crire la réponse sous la forme `;
						texte += `$\\mathbf{g(${z})=\\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction g peut s\'écrire \\textbf{g(4)=16}}`;
						texteCorr += `\\item L'image de ${z} par la fonction g vaut $g(${z})=${z}\\times ${z}=${texNombre(z * z)}$.`;
					};

					// sous question d/
					if (sortieHtml) {
						texte += num_alpha(j) + ` Que renvoie la machine si le côté vaut $x$ cm ?`;
						texte += ` &Eacute;crire la réponse sous la forme `;
						texte += katex_Popup('$\\mathbf{g(\\textbf{\\textit{x}})=\\ldots}$', 'Notation', '4 a pour image 16 par la fonction g peut s\'écrire <b>g(4)=16</b>') + `<br>`;
						texteCorr += num_alpha(j) + ` Si le côté vaut $x$ la machine renvoie $x\\times x$ ce qui est équivalent à $x^2$ .<br>`;
						texteCorr += ` L'image de $x$ par la fonction g vaut $x^2$ donc $g(x)=x^2$.<br>`;
						j++; //incrémente la sous question	
					} else {
						texte += `\\item  Que renvoie la machine si le côté vaut $x$ cm ?`;
						texteCorr += `\\item Si le côté vaut $x$ la machine renvoie $x\\times x$ ce qui est équivalent à $x^2$ .`;
						texte += ` \\'{E}crire la réponse sous la forme $\\mathbf{g(\\textbf{\\textit{x}})=\\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction g peut s\'écrire $\\mathbf{g(4)=16}$}`;
						texteCorr += ` L'image de $x$ par la fonction g vaut $x^2$ donc $g(x)=x^2$.`;

					};

					// sous question e/
					txt_info = `Voici le diagramme d'une machine qui double `;
					if (sortieHtml) {
						texte += num_alpha(j) + ` Comme dans l’exemple ci-dessous, écrire le diagramme de la fonction $\\mathbf{g}$.<br>`;
						txt_info += `<div id="${id_du_div_diag}" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
						SVG_machine_diag_3F1_act_mono(id_du_div_diag, 800, 100, 'g', 'x', [['2', '2x']]);
						texteCorr += num_alpha(j) + ` C'est une machine qui multiplie un nombre par lui-même, donc sous forme de diagramme.<br>`;
						texteCorr += `<div id="${id_du_div_corr}" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
						SVG_machine_diag_3F1_act_mono(id_du_div_corr, 800, 100, 'g', 'x', [['x', 'x²']]);
						j++; //incrémente la sous question
					} else {
						texte += `\\item  Comme dans l’exemple ci-dessous, écrire le diagramme de la fonction $\\mathbf{g}$.<br>`;
						txt_info += '<br>' + tikz_machine_diag(`g`, `x`, [[`\\times 2`, `2x`]]);
						texteCorr += `\\item C'est une machine qui multiplie un nombre par lui-même, donc sous forme de diagramme.<br>`;
						texteCorr += tikz_machine_diag(`g`, `x`, [[`\\times x`, `x^2`]]);
					};
					texte += info_message({
						titre: 'Exemple',
						texte: txt_info,
						couleur: 'nombres'
					});

					// sous question f/
					if (sortieHtml) {
						texte += num_alpha(j) + ` Ecrire maintenant la fonction g en utilisant la forme `;
						texte += katex_Popup('$\\mathbf{g:\\textbf{\\textit{x}} \\longmapsto \\ldots}$', 'Notation', '4 a pour image 16 par la fonction g peut s\'écrire $\\mathbf{g:4\\longmapsto 16}$');
						texteCorr += num_alpha(j) + ` L'image de $x$ par la fonction g vaut $x\\times x=x^2$ donc $g:x\\longmapsto x\\times x=x^2$.<br>`;
						j++; //incrémente la sous question
					} else { // sortie LaTeX
						texte += `\\item  Ecrire maintenant la fonction g en utilisant la forme `;
						texte += `$\\mathbf{g:\\textbf{\\textit{x}} \\longmapsto \\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction g peut s\'écrire $\\mathbf{g:4\\longmapsto 16}$'}`;
						texteCorr += `\\item L'image de $x$ par la fonction g vaut $x\\times x=x^2$ donc $g:x\\longmapsto x\\times x=x^2$.`;
						texte += `\\end{enumerate}`;
						texteCorr += `\\end{enumerate}`;
					};
					break;
				case 3: // somme de 1 et du triple de x
					var j = 0; // pour la sous-numérotation

					// consigne
					if (!sortieHtml) {
						texte = `<br>`;
					} else {
						texte = ``;
					};

					texte += `La $\\mathbf{machine\\,h}$ renvoie la somme du triple du nombre de départ et de 1.`;
					texte += `<br>`;
					// machine
					x = randint(2, 99); //augmenter les possibles pour éviter les questions déjà posées?	
					if (sortieHtml) {
						texte += machine_maths_video(`assets/videos/machineMaths-h.mp4`);
					} else { // sortie Latex avec Tikz
						texte += tikz_machine_maths('h', '---', `Multiplier\\,par\\,3`, `Ajouter\\,1`, `nombre\\,de`, `d\\acute{e}part\\,${x}`, `nombre\\,de`, `sortie\\,?`);
					};
					// sous question a/
					if (sortieHtml) {
						texte += num_alpha(j) + ` Que renvoie la machine si le nombre de départ vaut  ${x} ? Formuler la réponse `;
						texte += katex_Popup('avec le mot image', 'Image', 'l\'image de la valeur à la sortie de la machine') + `<br>`;
						texteCorr = num_alpha(j) + ` Si le nombre de départ vaut ${x} alors la machine renvoie $3\\times${x} + 1 = ${3 * x + 1}$<br>`;
						texteCorr += `On dit que ${3 * x + 1} est l'image de ${x} par la fonction g.<br>`;
						j++; //incrémente la sous question
					} else { //sortie LaTeX
						texte += `\\begin{enumerate}[itemsep=1em]`;
						texte += `\\item  Que renvoie la machine si le nombre de départ vaut  ${x} ? Formuler la réponse `;
						texte += `avec le mot \\textbf{image} \\footnote{\\textbf{Image :} L\'image de la valeur à la sortie de la machine.}`;
						texteCorr = `\\begin{enumerate}[itemsep=1em]`;
						texteCorr += `\\item Si le nombre de départ vaut ${x} alors la machine renvoie $3\\times${x} + 1 = ${3 * x + 1}$<br>`;
						texteCorr += `On dit que ${3 * x + 1} est l'image de ${x} par la fonction g.`;
					};

					// sous question b/
					y = randint(2, 99, [x]); //augmenter les possibles pour éviter les questions déjà posées?	
					if (sortieHtml) {
						texte += num_alpha(j) + ` Combien vaut le nombre de départ si la machine renvoie  ${3 * y + 1} ? Formuler la réponse `;
						texte += katex_Popup('avec le mot antécédent', 'Antécédent', 'un antécédent d\'une valeur de sortie est une valeur du nombre de départ dont l\'image est ce nombre de sortie') + `<br>`;
						texteCorr += num_alpha(j) + ` Si la machine renvoie $${3 * y + 1}$ alors le nombre de départ vaut $(${3 * y + 1}-1)\\div 3=${y}$<br>`;
						texteCorr += `On dit que ${y} est <b>un</b> antécédent de ${3 * y + 1} par la fonction g.<br>`;
						j++; //incrémente la sous question
					} else { //sortie LaTeX
						texte += `\\item  Combien vaut le nombre de départ si la machine renvoie  ${3 * y + 1} ? Formuler la réponse `;
						texte += `avec le mot \\textbf{antécédent} \\footnote{\\textbf{Antécédent :} Un antécédent d\'une valeur de sortie est une valeur du nombre de départ dont l\'image est ce nombre de sortie.}`;
						texteCorr += `\\item Si la machine renvoie $${3 * y + 1}$ alors le nombre de départ vaut $(${3 * y + 1}-1)\\div 3=${y}$<br>`;
						texteCorr += `On dit que ${y} est \\textbf{un} antécédent de ${3 * y + 1} par la fonction g.`;
					};

					// sous question c/
					z = randint(2, 99, [x, y]); //augmenter les possibles pour éviter les questions déjà posées?	
					if (sortieHtml) {
						texte += num_alpha(j) + ` Quelle est l'image de ${-z} par la `;
						texte += katex_Popup('fonction', 'Vocabulaire', '<b>fonction</b> est le nom que l\'on donne à ces machines mathématiques');
						texte += ` $h$ ? &Eacute;crire la réponse sous la forme `;
						texte += katex_Popup('$\\mathbf{h(' + (-z) + ')=\\ldots}$', 'Notation', '4 a pour image 16 par la fonction h peut s\'écrire <b>h(4)=16</b>') + `<br>`;
						texteCorr += num_alpha(j) + ` L'image de ${-z} par la fonction h vaut $h(${-z})=3\\times (${-z})+1=${-3 * z + 1}$.<br>`;
						j++; //incrémente la sous question
					} else { // sortie LaTeX
						texte += `\\item  Quelle est l'image de ${-z} par la `;
						texte += `\\textbf{fonction h} \\footnote{\\textbf{Vocabulaire :} \\textit{fonction} est le nom que l\'on donne à ces machines mathématiques}`;
						texte += ` ? \\'{E}crire la réponse sous la forme `;
						texte += `$\\mathbf{h(${-z})=\\ldots}$ \\footnote{\\textbf{Notation : } 4 a pour image 16 par la fonction h peut s\'écrire \\textbf{h(4)=16}}`;
						texteCorr += `\\item L'image de ${-z} par la fonction h vaut $h(${-z})=3\\times (${-z})+1=${-3 * z + 1}$.`;
					};

					// sous question d/
					if (sortieHtml) {
						texte += num_alpha(j) + ` Que renvoie la machine si le côté vaut $x$ ?`;
						texte += ` &Eacute;crire la réponse sous la forme `;
						texte += katex_Popup('$\\mathbf{h(\\textbf{\\textit{x}})=\\ldots}$', 'Notation', '4 a pour image 16 par la fonction h peut s\'écrire <b>h(4)=16</b>') + `<br>`;
						texteCorr += num_alpha(j) + ` Si le côté vaut $x$ la machine renvoie $3\\times x + 1$ ce qui est équivalent à $3x + 1$ .<br>`;
						texteCorr += ` L'image de $x$ par la fonction h vaut $3\\times x + 1$ donc $f(x)=3\\times x + 1$.<br>`;
						j++; //incrémente la sous question
					} else { // sortie LaTeX
						texte += `\\item  Que renvoie la machine si le côté vaut $x$ ?`;
						texteCorr += `\\item Si le côté vaut $x$ la machine renvoie $3\\times x + 1$ ce qui est équivalent à $3x + 1$ .`;
						texte += ` \\'{E}crire la réponse sous la forme $\\mathbf{h(\\textbf{\\textit{x}})=\\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction h peut s\'écrire $\\mathbf{h(4)=16}$}`;
						texteCorr += ` L'image de $x$ par la fonction h vaut $3x + 1$ donc $h(x)=3x+1$.`;

						j++; //incrémente la sous question
					};

					// sous question e/
					txt_info = `Voici le diagramme d'une machine qui double puis qui ajoute 5 `;
					if (sortieHtml) {
						texte += num_alpha(j) + ` Comme dans l’exemple ci-dessous, écrire le diagramme de la fonction $\\mathbf{h}$.<br>`;
						txt_info += `<div id="${id_du_div_diag}" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
						SVG_machine_diag_3F12(id_du_div_diag, 800, 100, 'h', 'x', [['2', '2x'], ['5', '2x+5']]);
						texteCorr += num_alpha(j) + ` C'est une machine qui triple un nombre et ajoute 1, donc sous forme de diagramme.<br>`;
						texteCorr += `<div id="${id_du_div_corr}" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
						SVG_machine_diag_3F12(id_du_div_corr, 800, 100, 'h', 'x', [['3', '3x'], ['1', '3x+1']]);
						j++; //incrémente la sous question
					} else {
						texte += `\\item  Comme dans l’exemple ci-dessous, écrire le diagramme de la fonction $\\mathbf{h}$.<br>`;
						txt_info += '<br>' + tikz_machine_diag(`h`, `x`, [[`\\times 2`, `2x`], [`+5`, `2x+5`]]);
						texteCorr += `\\item C'est une machine qui triple un nombre et ajoute 1, donc sous forme de diagramme.<br>`;
						texteCorr += tikz_machine_diag(`h`, `x`, [[`\\times 3`, `3x`], [`+1`, `3x+1`]]);
					};
					texte += info_message({
						titre: 'Exemple',
						texte: txt_info,
						couleur: 'nombres'
					});

					// sous question f/
					if (sortieHtml) {
						texte += num_alpha(j) + ` Ecrire maintenant la fonction h en utilisant la forme `;
						texte += katex_Popup('$\\mathbf{h:\\textbf{\\textit{x}} \\longmapsto \\ldots}$', 'Notation', '4 a pour image 16 par la fonction h peut s\'écrire $\\mathbf{h:4\\longmapsto16}$');
						texteCorr += num_alpha(j) + ` L'image de $x$ par la fonction h vaut $3\\times x +1= 3x + 1$ donc $h : x \\longmapsto 3\\times x + 1$ soit $h : x \\longmapsto 3x + 1$.<br>`;
						j++; //incrémente la sous question
					} else { // sortie LaTeX
						texte += `\\item  Ecrire maintenant la fonction h en utilisant la forme `;
						texte += `$\\mathbf{h:\\textbf{\\textit{x}} \\longmapsto \\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction h peut s\'écrire $\\mathbf{h:4\\longmapsto16}$}`;
						texteCorr += `\\item L'image de $x$ par la fonction h vaut $3\\times x +1= 3x + 1$ donc $h : x \\longmapsto 3\\times x + 1$ soit $h : x \\longmapsto 3x + 1$.`;
						texte += `\\end{enumerate}`;
						texteCorr += `\\end{enumerate}`;
					};
					break;
				case 4: // nombre de diviseurs de x entier
					var j = 0; // pour la sous-numérotation

					// consigne
					if (!sortieHtml) {
						texte = `<br>`;
					} else {
						texte = ``;
					};
					texte += `La $\\mathbf{machine\\,d}$, qui n'accepte que des nombres entiers positifs, renvoie le nombre de diviseurs du nombre de départ.`;
					texte += `<br>`;
					// machine
					x = randint(2, 51); //augmenter les possibles pour éviter les questions déjà posées?						
					if (sortieHtml) {
						texte += machine_maths_video(`assets/videos/machineMaths-d.mp4`);
					} else { // sortie Latex avec Tikz
						texte += tikz_machine_maths('d', '---', `nombre \\, total`, `de \\, diviseurs`, `nombre\\,de`, `d\\acute{e}part\\,${x}`, `nombre \\, de`, `diviseurs`);
					};
					// sous question a/
					if (sortieHtml) {
						texte += num_alpha(j) + ` Que renvoie la machine si le nombre de départ vaut  ${x} ? Formuler la réponse `;
						texte += katex_Popup('avec le mot image', 'Image', 'l\'image de la valeur à la sortie de la machine') + `<br>`;
						texteCorr = num_alpha(j) + ` Pour trouver la liste des diviseurs de ${x} on cherche tous les produits de deux facteurs qui donnent ${x}<br>`;
						j++; //incrémente la sous question
					} else { //sortie LaTeX
						texte += `\\begin{enumerate}[itemsep=1em]`;
						texte += `\\item Que renvoie la machine si le nombre de départ vaut  ${x} ? Formuler la réponse `;
						texte += `avec le mot \\textbf{image} \\footnote{\\textbf{Image : } L\'image de la valeur à la sortie de la machine}`;
						texteCorr = `\\begin{enumerate}[itemsep=1em]`;
						texteCorr += `\\item Pour trouver la liste des diviseurs de ${x} on cherche tous les produits de deux facteurs qui donnent ${x}<br>`;
					};
					if (liste_diviseurs(x).length % 2 == 0) { //si il y a un nombre pair de diviseurs
						for (let m = 0; m < (liste_diviseurs(x).length / 2); m++) {
							texteCorr += `$` + liste_diviseurs(x)[m] + `\\times` + liste_diviseurs(x)[(liste_diviseurs(x).length - m - 1)] + `$<br>`;
						};
					} else {
						for (let m = 0; m < ((liste_diviseurs(x).length - 1) / 2); m++) {
							texteCorr += `$` + liste_diviseurs(x)[m] + `\\times` + liste_diviseurs(x)[(liste_diviseurs(x).length - m - 1)] + `$<br>`;
						};
						texteCorr += `$` + liste_diviseurs(x)[(liste_diviseurs(x).length - 1) / 2] + `\\times` + liste_diviseurs(x)[(liste_diviseurs(x).length - 1) / 2] + `$<br>`;
					};
					texteCorr += `Chacun des facteurs de la liste ci-dessus est un diviseur de ${x}<br>`;
					texteCorr += `La liste des diviseurs de ${x} est donc ` + liste_diviseurs(x) + `; Cette liste compte ` + liste_diviseurs(x).length + ` nombres. <br>`;
					texteCorr += `Donc ` + liste_diviseurs(x).length + ` est l'image de ${x} par la fonction d.`;
					if (sortieHtml) {
						texteCorr += `<br>`;
					};

					// sous question b/
					x = randint(1, 9); //augmenter les possibles pour éviter les questions déjà posées?
					if (sortieHtml) {
						//texte += num_alpha(j) + ` Quelle est une valeur possible du nombre de départ si la machine renvoie  2 ?<br>`;
						texte += num_alpha(j) + ` Quelle est une valeur possible du nombre de départ si la machine renvoie  2 ? En existe-t-il plusieurs ?<br>`;
						texteCorr += num_alpha(j) + ` Si la machine renvoie 2 alors le nombre de départ  a exactement 2 diviseurs, tous les`;
						texteCorr += katex_Popup('nombres premiers', 'Nombre premier', 'Un nombre entier est un <b>nombre premier</b> si il a exactement deux diviseurs, 1 et lui-même.');
						texteCorr += `conviennent.<br>`;
						texteCorr += `2 est premier donc 2 est <b>un</b> antécédent de 2 par la fonction d.<br>`;
						texteCorr += `7 est premier donc 7 est <b>un autre</b> antécédent de 2 par la fonction d.<br>`;
						j++; //incrémente la sous question
					} else {
						//texte += `\\item Quelle est une valeur possible du nombre de départ si la machine renvoie  2 ?`;
						texte += `\\item Quelle est une valeur possible du nombre de départ si la machine renvoie  2 ? En existe-til plusieurs ?`;
						texteCorr += ` \\item Si la machine renvoie 2 alors le nombre de départ  a exactement 2 diviseurs, tous les`;
						texteCorr += `\\textbf{nombres premiers} \\footnote{\\textbf{Nombre premier :} Un nombre entier est un \\textbf{nombre premier} si il a exactement deux diviseurs, 1 et lui-même.}`;
						texteCorr += `conviennent.<br>`;
						texteCorr += `2 est premier donc 2 est \\textbf{un} antécédent de 2 par la fonction d.<br>`;
						texteCorr += `7 est premier donc 7 est \\textbf{un autre} antécédent de 2 par la fonction d.`;
					};

					// sous question c/
					x = randint(51, 99); //augmenter les possibles pour éviter les questions déjà posées?	
					if (sortieHtml) {
						texte += num_alpha(j) + ` Quelle est l'image de ${x} par la `;
						texte += katex_Popup('fonction', 'Vocabulaire', '<b>fonction</b> est le nom que l\'on donne à ces machines mathématiques');
						texte += ` $d$ ? &Eacute;crire la réponse sous la forme `;
						texte += katex_Popup('$\\mathbf{d(' + (x) + ')=\\ldots}$', 'Notation', '4 a pour image 16 par la fonction d peut s\'écrire <b>d(4)=16</b>') + `<br>`;
						texteCorr += num_alpha(j) + ` Pour trouver l'image de ${x} on peut par exemple chercher tous ses diviseurs et les compter<br>`;
						j++; //incrémente la sous question
					} else { // sortie LaTeX
						texte += `\\item Quelle est l'image de ${x} par la `;
						texte += `\\textbf{fonction d} \\footnote{\\textbf{Vocabulaire :} \\textit{fonction} est le nom que l\'on donne à ces machines mathématiques.}`;
						texte += ` ? \\'{E}crire la réponse sous la forme `;
						texte += `$\\mathbf{d(` + (x) + `)=\\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction d peut s\'écrire \\textbf{d(4)=16}}`;
						texteCorr += `\\item Pour trouver l'image de ${x} on peut par exemple chercher tous ses diviseurs et les compter<br>`;
					};
					if (liste_diviseurs(x).length % 2 == 0) { //si il y a un nombre pair de diviseurs
						for (let m = 0; m < (liste_diviseurs(x).length / 2); m++) {
							texteCorr += `$` + liste_diviseurs(x)[m] + `\\times` + liste_diviseurs(x)[(liste_diviseurs(x).length - m - 1)] + `$<br>`;
						};
					} else {
						for (let m = 0; m < ((liste_diviseurs(x).length - 1) / 2); m++) {
							texteCorr += `$` + liste_diviseurs(x)[m] + `\\times` + liste_diviseurs(x)[(liste_diviseurs(x).length - m - 1)] + `$<br>`;
						};
						texteCorr += `$` + liste_diviseurs(x)[(liste_diviseurs(x).length - 1) / 2] + `\\times` + liste_diviseurs(x)[(liste_diviseurs(x).length - 1) / 2] + `$<br>`;
					};
					texteCorr += `La liste des diviseurs de ${x} est donc `;
					texteCorr += liste_diviseurs(x)[0];
					for (let k = 1; k < liste_diviseurs(x).length; k++) {
						texteCorr += ` ; ` + liste_diviseurs(x)[k];
					};
					texteCorr += ` ; Cette liste compte ` + liste_diviseurs(x).length + ` nombres.<br> `;
					texteCorr += `Donc ` + liste_diviseurs(x).length + ` est l'image de ${x} par la fonction d.`;
					if (sortieHtml) {
						texteCorr += `<br>`;
					};

					// sous question d/
					if (sortieHtml) {
						// texte += num_alpha(j) + ` Peut-on trouver deux antécédents de 3 par la fonction d ?<br>`;
						texte += num_alpha(j) + ` Peut-on trouver plusieurs antécédents de 3 par la fonction d ? Qu'ont-ils de commun ?<br>`;
						texteCorr += num_alpha(j) + ` Il faut trouver des nombres qui ont exactement 3 diviseurs.<br>`;
						j++; //incrémente la sous question
					} else {
						//texte += `\\item  Peut-on trouver deux antécédents de 3 par la fonction d ?`;
						texte += `\\item  Peut-on trouver plusieurs antécédents de 3 par la fonction d ? Qu'ont-ils de commun ?`;
						texteCorr += `\\item Il faut trouver des nombres qui ont exactement 3 diviseurs.<br>`;
					}
					texteCorr += `La liste des diviseurs de 9 est `;
					texteCorr += liste_diviseurs(9)[0];
					for (let k = 1; k < liste_diviseurs(9).length; k++) {
						texteCorr += ` ; ` + liste_diviseurs(9)[k];
					};
					texteCorr += ` ; Cette liste compte ` + liste_diviseurs(9).length + ` nombres, `;
					texteCorr += `donc 9 est un antécédent de 3 par la fonction d.<br>`;
					texteCorr += `La liste des diviseurs de 25 est `;
					texteCorr += liste_diviseurs(25)[0];
					for (let k = 1; k < liste_diviseurs(25).length; k++) {
						texteCorr += ` ; ` + liste_diviseurs(25)[k];
					};
					texteCorr += ` ; Cette liste compte ` + liste_diviseurs(25).length + ` nombres, `;
					texteCorr += `donc 25 est un antécédent de 3 par la fonction d.<br>`;
					texteCorr += `Tu peux en trouver d'autres, qu'ont ils de commun ?`;
					if (!sortieHtml) {
						texte += `\\end{enumerate}`;
						texteCorr += `\\end{enumerate}`;
					};
					break;
			};

			if (this.listeQuestions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.listeQuestions.push(texte);
				this.listeCorrections.push(texteCorr);
				i++;
			}
			cpt++;
		}

		listeQuestionsToContenu(this);
	};
	this.besoinFormulaireNumerique = ['Type de fonction', 5, "1 : Périmètre d'un carré\n2 : Aire d'un carré\n3 : Somme de 1 et du triple du nombre de départ\n4 : Nombre de diviseurs d'un entier positif\n5 : Les quatre"];
}
