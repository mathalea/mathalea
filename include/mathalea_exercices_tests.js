function tests_SVGJS_KATEX(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1 ; 
	this.titre = "Tests rendu Katex in SVG"; 
	if (sortie_html) {
		this.consigne = "Balises SVG en dur dans le DOM au niveau de la consigne, auto-render de Katex fait son job";
		
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
		 	<foreignObject x="20" y="20" width="160" height="60">
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
						texte = `Ajout d'un second SVG balises en dur dans les questions d'un exo, auo-render de katex fait son job`;
						//texte += `<br>`;
						if (sortie_html) {
							let id_unique = `_extype1_${num_ex}_${Date.now()}`; // on formatte avec le numéro de l'exercice pour éviter les doublons
							let id_du_div = `div_svg${id_unique}`;
							var hauteur_svg = 60;

							texte += `<br>`;
							texte += `<div id="${id_du_div}" style="width: ${pourcentage}; height: ${hauteur_svg}px; display : table ">
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
							<foreignObject x="20" y="10" width="160" height="60">
								<!--
								Dans le cas d'un SVG intégré dans du HTML, le namespace XHTML peut
								être omis, mais il est obligatoire dans le contexte d'un document SVG
								-->
								<div xmlns="http://www.w3.org/1999/xhtml">
								$x\\times y$							
								</div>
							</foreignObject>
						</svg>
					   </div>`;
							//SVG_machine_maths(id_du_div,400,hauteur_svg,'machine f','','périmètre','d\'un carré','carré de','côté '+x+' cm','périmètre','??? cm');
							
						} else { // sortie Latex avec Tikz

						};
						texte_corr = `texte corr type 1<br>`;												
						break;			
						case 2 :
							texte = `Ajout d'un SVG avec SVGJS -->`;
							texte += `besoin d'un listener. Pourquoi? à cause de la necessité de mettre à jour le code dynamique pour l'affichage des exos?`

							//texte += `<br>`;
							if (sortie_html) {
								let id_unique = `_extype2_${num_ex}_${Date.now()}`; // on formatte avec le numéro de l'exercice pour éviter les doublons
								let id_du_div = `div_svg${id_unique}`;
								var hauteur_svg = 60;
								texte += `<br>`;
								texte += `<div id="${id_du_div}" style="width: ${pourcentage}; height: ${hauteur_svg}px; display : table ">`
								texte += `</div>`;
								if (!window.SVGExist) {window.SVGExist = {}} // Si SVGExist n'existe pas on le créé
								// SVGExist est un dictionnaire dans lequel on stocke les listenner sur la création des div
								window.SVGExist[id_du_div] = setInterval(function() {
							
									if ($(`#${id_du_div}`).length ) {
										$(`#${id_du_div}`).html("");//Vide le div pour éviter les SVG en doublon
										const my_svg_test = SVG().addTo(`#${id_du_div}`).viewbox(0, 0, 200, hauteur_svg).size('100%','100%');
										my_svg_test.polygon('5,5 195,10 185,40 10,50').fill('none');
										// my_svg_test.circle(25).fill('none').stroke({ color: 'red', width: 1, linecap: 'round', linejoin:'null'}).dmove(5,5);
										// let my_text = my_svg_test.text(function(add) {
										// 	add.tspan('auto-render ne fait pas le job $x$').newLine()											
										// 	add.tspan('Crasx sodales.').newLine().dx(20)
										// });
										// my_text.font({size : '10px'});
										var fobj = my_svg_test.foreignObject(200,50).attr({id: 'fobj'});
										var txt = "some text that is quite long.$x \\times y$  and it goes on and on.  and it's pointless really.  and the grammar is terrible.  blah. blah. blah"
										fobj.add("<div style='color:black' id='bla' xmlns='http://www.w3.org/1999/xhtml' >$x\\times y$ "+txt+"</div>")
										//my_text.addClass('katex');									

									}
								}, 10000); // Vérifie toutes les 100ms

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