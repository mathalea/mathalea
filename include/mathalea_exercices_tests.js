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
				texte += 'tests'
				}
			else { //sortie Latex 
			}
		}
		if (!sortie_html) liste_de_question_to_contenu_sans_numero_et_sans_consigne(this);	
		}
	this.besoin_formulaire_numerique = [`Nombres de parts`,10,""];
};