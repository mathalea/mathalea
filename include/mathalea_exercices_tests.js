function tests_SVGJS_KATEX_old(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1 ; 
	this.titre = "Test Katex in SVG"; 
	if (sortie_html) {
		this.consigne = "Lorsqu'un nombre $\\textit{x}$ entre dans une machine mathématique , celle-ci renvoie à la sortie un nombre appelé $\\textit{image de x}$.<br>";
		this.consigne += "On dit que le nombre de départ est un $\\textit{antécédent}$ du nombre qu'on trouve à la sortie.<br>";
		this.consigne += "Ces machines sont appelées $\\textit{fonctions}$, on a l'habitude de leur donner des noms $\\textit{f}$ ou $\\textit{g}$ ou $\\textit{h} \\ldots$"
	} else { // sortie latex
		this.consigne = "Consigne LaTeX";
	} 
	sortie_html ? this.spacing = 3 : this.spacing = 2;
	sortie_html ? this.spacing_corr = 2: this.spacing_corr = 1;
	this.nb_questions = 1;
	//this.correction_detaillee_disponible = true;
	this.nb_cols_corr = 1;
	this.sup = 1;

	var num_ex = 'testSVG'; // pour rendre unique les id des SVG, en cas d'utilisation dans plusieurs exercices y faisant appel

	if (sortie_html) {		
		let id_unique = `_consigne_${num_ex}_${Date.now()}`; // on formatte avec le numéro de l'exercice pour éviter les doublons
		let id_du_div = `div_svg${id_unique}`;
		var pourcentage = '100%'; // pour l'affichage des svg. On a besoin d'une variable globale
		var hauteur_svg = 100;
		this.consigne =`texte`;

		//this.consigne += `<div id="consigne" style="width: 100%; height: 500px; display : table "></div>`;
		//this.consigne += `<div id="${id_du_div}" style="width: 100%; height: 150px; display : table "></div>`;
	// 	this.consigne += `<div id="${id_du_div}" style="width: ${pourcentage}; height: ${hauteur_svg}px; display : table ">
		
		
	// 	<svg viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
	// 	<style>
	// 		polygon { fill: black }
		
	// 		div {
	// 		color: white;
	// 		font:18px serif;
	// 		height: 100%;
	// 		overflow: auto;
	// 		}
	// 	</style>
		
	// 	<polygon points="5,5 195,10 185,185 10,195" />

	// 	<!-- Cas d'utilisation courant: inclure du texte HTML dans le SVG -->
	// 	<foreignObject x="20" y="20" width="160" height="160">
	// 		<!--
	// 		Dans le cas d'un SVG intégré dans du HTML, le namespace XHTML peut
	// 		être omis, mais il est obligatoire dans le contexte d'un document SVG
	// 		-->
	// 		<div xmlns="http://www.w3.org/1999/xhtml">
	// 		$\\pm\\sqrt{a^2 + b^2}$
	// 		</div>
	// 	</foreignObject>
	// </svg>

		
	// 	</div>`;
		//SVG_machine_maths(id_du_div,400,hauteur_svg,'machine maths','','Procédé','de calcul','antécédent','x','image','y');
	} else { // sortie LaTeX

	};
	this.nouvelle_version = function(numero_de_l_exercice){
		let type_de_questions;
		//this.bouton_aide = modal_pdf(numero_de_l_exercice,"http://lozano.maths.free.fr/coopmaths/FichePuissances-4N21.pdf","Aide mémoire sur les puissances (Sébastien Lozano)")
		
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées

		let type_de_questions_disponibles = [1];
		//let type_de_questions_disponibles = [4];
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles,this.nb_questions);

			for (let i = 0, x, texte, texte_corr, cpt=0; i < this.nb_questions&&cpt<50;) {
				type_de_questions = liste_type_de_questions[i];
	
				let id_unique = `${num_ex}_${i}_${Date.now()}`
				let id_du_div = `div_svg${numero_de_l_exercice}${id_unique}`;
				let id_du_div_corr = `div_svg_corr${numero_de_l_exercice}${id_unique}`;
				switch (type_de_questions) {
					case 1 : // périmètre d'un carré de côté x			
						texte += `La $\\textbf{machine f}$ renvoie le périmètre d'un carré de côté $x$`;
						
						break;
				}		

			
				if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
					this.liste_questions.push(texte);
					this.liste_corrections.push(texte_corr);
					i++;
				}
				cpt++
			}	
	
		liste_de_question_to_contenu(this);
	}
	//this.besoin_formulaire_numerique = ['Règle à travailler',5,"1 : Produit de deux puissances de même base\n2 : Quotient de deux puissances de même base\n3 : Puissance de puissance\n4 : Produit de puissances de même exposant\n5 : Mélange"]; 
}

function tests_SVGJS_KATEX(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1 ; 
	this.titre = "Tests rendu Katex in SVG"; 
	if (sortie_html) {
		this.consigne = "Balises SVG en dur dans le DOM, auto-render de Katex fait son job";
		
	} else { // sortie latex
		//this.consigne = "Consigne LaTeX";
	} 
	sortie_html ? this.spacing = 3 : this.spacing = 2;
	sortie_html ? this.spacing_corr = 2: this.spacing_corr = 1;
	this.nb_questions = 2;
	//this.correction_detaillee_disponible = true;
	this.nb_cols_corr = 1;
	this.sup = 1;

	var num_ex = 'testSVG'; // pour rendre unique les id des SVG, en cas d'utilisation dans plusieurs exercices y faisant appel

	if (sortie_html) {		
		let id_unique = `_consigne_${num_ex}_${Date.now()}`; // on formatte avec le numéro de l'exercice pour éviter les doublons
		let id_du_div = `div_svg${id_unique}`;
		var pourcentage = '100%'; // pour l'affichage des svg. On a besoin d'une variable globale
		var hauteur_svg = 60;

		//this.consigne += `<div id="consigne" style="width: 100%; height: 500px; display : table "></div>`;
		//this.consigne += `<div id="${id_du_div}" style="width: 100%; height: 150px; display : table "></div>`;
		this.consigne += `<div id="${id_du_div}" style="width: ${pourcentage}; height: ${hauteur_svg}px; display : table ">
		
		 	<svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
		 	<style>
		 		polygon { fill: white; stroke : red }
			
		 		div {
		 		color: black;
		 		/*font:10px serif;*/
		 		height: 100%;
		 		overflow: auto;
		 		}
		 	</style>
			
			<polygon points="5,5 195,10 185,40 10,50" />
	
		 	<!-- Cas d'utilisation courant: inclure du texte HTML dans le SVG -->
		 	<foreignObject x="20" y="20" width="160" height="160">
		 		<!--
		 		Dans le cas d'un SVG intégré dans du HTML, le namespace XHTML peut
		 		être omis, mais il est obligatoire dans le contexte d'un document SVG
		 		-->
				 <div xmlns="http://www.w3.org/1999/xhtml">
				 
				 
		 		$\\pm\\sqrt{a^2 + b^2}$
		 		</div>
		 	</foreignObject>
		 </svg>
		</div>`;
		//SVG_machine_maths(id_du_div,400,hauteur_svg,'machine maths','','Procédé','de calcul','antécédent','x','image','y');
	} else { // sortie LaTeX

	};
	this.nouvelle_version = function(numero_de_l_exercice){
		let type_de_questions;
		//this.bouton_aide = modal_pdf(numero_de_l_exercice,"http://lozano.maths.free.fr/coopmaths/FichePuissances-4N21.pdf","Aide mémoire sur les puissances (Sébastien Lozano)")
		
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées

		let type_de_questions_disponibles = [1,2];
		//let type_de_questions_disponibles = [4];
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles,this.nb_questions);

			for (let i = 0, texte, texte_corr, cpt=0; i < this.nb_questions&&cpt<50;) {
				type_de_questions = liste_type_de_questions[i];
	
				let id_unique = `${num_ex}_${i}_${Date.now()}`
				let id_du_div = `div_svg${numero_de_l_exercice}${id_unique}`;
				let id_du_div_corr = `div_svg_corr${numero_de_l_exercice}${id_unique}`;
	
				switch (type_de_questions) {
					case 1 :
						texte = `texte type 1`;
						//texte += `<br>`;
						if (sortie_html) {
							texte += `<br>`;
							texte += `<div id="${id_du_div}" style="width: ${pourcentage}"; height: ${hauteur_svg}px; display : table "></div>`;
							//SVG_machine_maths(id_du_div,400,hauteur_svg,'machine f','','périmètre','d\'un carré','carré de','côté '+x+' cm','périmètre','??? cm');
							
						} else { // sortie Latex avec Tikz

						};
						texte_corr = `texte corr type 1<br>`;												
						break;			
						case 2 :
							texte = `texte type 2`;
							//texte += `<br>`;
							if (sortie_html) {
								texte += `<br>`;
								texte += `<div id="${id_du_div}" style="width: ${pourcentage}"; height: ${hauteur_svg}px; display : table "></div>`;
								//SVG_machine_maths(id_du_div,400,hauteur_svg,'machine f','','périmètre','d\'un carré','carré de','côté '+x+' cm','périmètre','??? cm');
								
							} else { // sortie Latex avec Tikz
	
							};
							texte_corr = `texte corr type 2<br>`;												
							break;			
					};
			
				if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
					this.liste_questions.push(texte);
					this.liste_corrections.push(texte_corr);
					i++;
				}
				cpt++
			}	
	
	 	liste_de_question_to_contenu(this);
	 }
	//this.besoin_formulaire_numerique = ['Règle à travailler',5,"1 : Produit de deux puissances de même base\n2 : Quotient de deux puissances de même base\n3 : Puissance de puissance\n4 : Produit de puissances de même exposant\n5 : Mélange"]; 
}