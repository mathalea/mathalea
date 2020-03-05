function tests_SVGJS_KATEX(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Tracer des droites graduées";
	this.consigne = "";
	this.nb_questions = 1;
	this.nb_questions_modifiable = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing = 3;
	this.sup=10;
	this.consigne_modifiable = false;
   	this.nb_questions_modifiable = false;
   	this.nb_cols_modifiable = false;
   	this.nb_cols_corr_modifiable = false;
   	this.spacing_modifiable = false;
	this.spacing_corr_modifiable = false;
	
	
	this.nouvelle_version = function(numero_de_l_exercice){
		let pas;
		this.liste_questions=[];
		this.liste_corrections=[];
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées
		pas=parseInt(this.sup);
		for (let i=0, id_unique, texte;i<16;i++) {
			if (sortie_html) {
				id_unique = `${i}_${Date.now()}`;
				//this.contenu += `<div id="div_svg${numero_de_l_exercice}${id_unique}" style="width: 90%; height: 200px;  "></div>`
				//SVG_reperage_sur_un_axe(`div_svg${numero_de_l_exercice}${id_unique}`,'', 6, 1, pas, [], [],false)
				this.contenu = `
						<svg viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
							<style>
								polygon { fill: black }
							
								div {
								color: white;
								font:18px serif;
								height: 100%;
								overflow: auto;
								}
							</style>
							
							<polygon points="5,5 195,10 185,185 10,195" />

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
				`;
				}
			else { //sortie Latex 
				texte=Latex_reperage_sur_un_axe(2, ' ', 1, pas, [], [],false);
				this.liste_questions.push(texte)
			}
		}
		if (!sortie_html) liste_de_question_to_contenu_sans_numero_et_sans_consigne(this);	
		}
	this.besoin_formulaire_numerique = [`Nombres de parts`,10,""];
}