


/**
 * Trace 5 droites et demande l'expression de la fonction affine ou linéaire correspondante
 * @Auteur Jean-Claude Lhote
 */
function fonctions_affines(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Déterminer une fonction affine";
	this.consigne = "Donner l'expression des fonctions représentées";
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	sortie_html? this.spacing = 2 : this.spacing = 1; 
	sortie_html? this.spacing_corr = 2 : this.spacing_corr = 1;
	this.sup=1;
	this.lineaire=false;

	
	this.nouvelle_version = function(numero_de_l_exercice){ // numero_de_l_exercice est 0 pour l'exercice 1
	let k=Math.pow(2,parseInt(this.sup)-1);
	this.liste_questions=[];
	this.liste_corrections=[];
	this.contenu = ''; // Liste de questions
	this.contenu_correction = ''; // Liste de questions corrigées
	let h=Math.round(window.innerHeight*0.7) //pour déterminer la hauteur du div 
	let liste_droites=[];
	let OrdX0;
	let Pente=[];
	if (!this.lineaire) {
		Pente.push(randint(-2*k,2*k));
		Pente.push(randint(-2*k,2*k,[Pente[0]]));
		Pente.push(randint(-2*k,2*k,[Pente[0],Pente[1]]));
		Pente.push(randint(-2*k,2*k,[Pente[0],Pente[1],Pente[2]]));
		Pente.push(randint(-2*k,2*k,[Pente[0],Pente[1],Pente[2],Pente[3]]));
	}
	else {
		Pente.push(randint(-3*k,3*k,[0]));
		Pente.push(randint(-3*k,3*k,[Pente[0],0]));
		Pente.push(randint(-3*k,3*k,[Pente[0],Pente[1],0]));
		Pente.push(randint(-3*k,3*k,[Pente[0],Pente[1],Pente[2],0]));
		Pente.push(randint(-3*k,3*k,[Pente[0],Pente[1],Pente[2],Pente[3],0]));	
	}

	for (let i=0;i<5;i++) {
		if (this.lineaire) OrdX0=0;
		else OrdX0= randint(-1+Pente[i]/k,1+Pente[i]/k)
		liste_droites.push([OrdX0,Pente[i]/k])
	}

	if (sortie_html) {
		let id_unique = `${Date.now()}`
		let id_du_div = `div_svg${numero_de_l_exercice}${id_unique}`;
		this.consigne = `<div id="${id_du_div}" style="width: ${h}px; height: ${h}px; display : table "></div>`;
		if (!window.SVGExist) {window.SVGExist = {}} // Si SVGExist n'existe pas on le créé
		// SVGExist est un dictionnaire dans lequel on stocke les listenner sur la création des div
		window.SVGExist[id_du_div] = setInterval(function() {
			if ($(`#${id_du_div}`).length ) {
				$(`#${id_du_div}`).html("");//Vide le div pour éviter les SVG en doublon
				const mon_svg = SVG().addTo(`#${id_du_div}`).viewbox(0, 0, 500, 500)

			SVG_repere(mon_svg,-5,5,-5,5,k,k,500,500,true );
			SVG_Tracer_droite(mon_svg,500,500,-5,5,-5,5,liste_droites[0][0],liste_droites[0][1],'blue','d1');
			SVG_Tracer_droite(mon_svg,500,500,-5,5,-5,5,liste_droites[1][0],liste_droites[1][1],'red','d2');
			SVG_Tracer_droite(mon_svg,500,500,-5,5,-5,5,liste_droites[2][0],liste_droites[2][1],'green','d3');
			SVG_Tracer_droite(mon_svg,500,500,-5,5,-5,5,liste_droites[3][0],liste_droites[3][1],'brown','d4');
			SVG_Tracer_droite(mon_svg,500,500,-5,5,-5,5,liste_droites[4][0],liste_droites[4][1],'purple','d5');
			clearInterval(SVGExist[id_du_div]);//Arrête le timer
			}

		}, 100); // Vérifie toutes les 100ms



	}
	else { //sortie Latex 
		let texte =`\\begin{tikzpicture}`;
		texte += Latex_repere(-5,5,-5,5,k,k,true);
		texte += Latex_Tracer_droite(-5,5,-5,5,liste_droites[0][0],liste_droites[0][1],'blue','d_1');
		texte += Latex_Tracer_droite(-5,5,-5,5,liste_droites[1][0],liste_droites[1][1],'red','d_2');
		texte += Latex_Tracer_droite(-5,5,-5,5,liste_droites[2][0],liste_droites[2][1],'green','d_3');
		texte += Latex_Tracer_droite(-5,5,-5,5,liste_droites[3][0],liste_droites[3][1],'brown','d_4');
		texte += Latex_Tracer_droite(-5,5,-5,5,liste_droites[4][0],liste_droites[4][1],'purple','d_5');
		texte +=`\n\t \\end{tikzpicture}`;
		this.liste_questions.push(texte);
	}
	for (i=0;i<5;i++) {
	this.liste_questions.push(`Déterminer l'expression de la fonction $f_${i+1}$ représentée par la droite $d_${i+1}$.`)
	if (this.lineaire||liste_droites[i][0]==0) this.liste_corrections.push(`La droite $d_${i+1}$ passe par l'origine et son coefficient directeur est $${tex_nombre(liste_droites[i][1])}$. Elle représente la fonction linéaire $f_${i+1}(x)=${reduire_ax_plus_b(liste_droites[i][1],0)}$.`)
		else this.liste_corrections.push(`La droite $d_${i+1}$ passe par le point de coordonnées $(0;${liste_droites[i][0]})$ et son coefficient directeur est $${tex_nombre(liste_droites[i][1])}$. Elle représente la fonction affine $f_${i+1}(x)=${reduire_ax_plus_b(liste_droites[i][1],liste_droites[i][0])}$.`)
	
	}
		
		liste_de_question_to_contenu_sans_numero(this); 
		if (!this.lineaire) this.contenu_correction = `Il s’agit de fonctions affines, elles sont donc de la forme $f(x)=ax+b$, $b$ étant l’ordonnée à l’origine et $a$ la pente de la droite.\n` + this.contenu_correction;
			else this.contenu_correction = `Il s’agit de fonctions linéaires, elles sont donc de la forme $f(x)=ax$, $a$ étant la pente de la droite.\n`  + this.contenu_correction;	
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',3,"1 : Coefficient directeur entier\n2 : Coefficient directeur 'en demis'\n3 : Coefficient directeur 'en quarts'"];
}

/**
* @auteur Jean-Claude Lhote
*/
function Double_distributivite()
{
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Utiliser la double distributivité";
	this.consigne = "Développer et réduire les expressions suivantes.";
	this.nb_cols = 1 ;
	this.nb_cols_corr = 1 ;
	this.spacing = 1 ;
	this.spacing_corr = 1 ;
	this.nb_questions = 5 ;
	this.sup = 1 ;

	this.nouvelle_version = function(numero_de_l_exercice) {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let type_de_questions_disponibles = [1,2] ;
		if (this.sup==2) {
			type_de_questions_disponibles = [3,4]
		}
		if (this.sup==3) {
			type_de_questions_disponibles = [1,2,3,4]
		}


		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions)
		for (let i = 0, texte, texte_corr, cpt=0, a, b, c, d; i < this.nb_questions && cpt<50 ;) {
			type_de_questions = liste_type_de_questions[i];
			a= randint(2,9);
			b = randint(2,9);
			c = randint(2,9,[a]);
			d = randint(2,9,[b]);
			switch(type_de_questions){
			case 1 : //(x+b)(x+d)
				b = randint(2,10)
				d = randint(2,12)
				texte = `$(x+${b})(x+${d})$`
				texte_corr = `$(x+${b})(x+${d})=x^2+${b}x+${d}x+${b*d}=x^2+${b+d}x+${b*d}$`
				break;
			case 2 : //(ax+b)(cx+d)
				texte = `$(${a}x+${b})(${c}x+${d})$`
				texte_corr = `$(${a}x+${b})(${c}x+${d})=${a*c}x^2+${a*d}x+${b*c}x+${b*d}=${a*c}x^2+${a*d+b*c}x+${b*d}$`
				break;
			case 3 ://(ax-b)(cx+d)
				texte = `$(${a}x-${b})(${c}x+${d})$`
				texte_corr = `$(${a}x-${b})(${c}x+${d})=${a*c}x^2+${d*a}x-${b*c}x-${b*d}=${a*c}x^2+${d*a}x-${b*c}x-${b*d}$`;
				break;
			case 4 ://(ax-b)(cx-d)
				texte = `$(${a}x-${b})(${c}x-${d})$`
				texte_corr = `$(${a}x-${b})(${c}x-${d})=${a*c}x^2-${a*d}x-${b*c}x+${b*d}=${a*c}x^2-${a*d+b*c}x+${b*d}$`
				break;
			}
			if (this.liste_questions.indexOf(texte)==-1) {
				 // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',3,'1 : (x+a)(x+b) et (ax+b)(cx+d)\n 2 : (ax-b)(cx+d) et (ax-b)(cx-d)\n 3 : Tous les types'] ;
}

/**
* @auteur Jean-Claude Lhote
*/
function Developper_Identites_remarquables2()
{
Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Développer avec les identités remarquables";
	this.consigne = "Développer les expressions suivantes.";
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing = 1 ;
	this.spacing_corr = 1 ;
	this.nb_questions = 5 ;
	this.sup=1 ;

	this.nouvelle_version = function(numero_de_l_exercice) {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		liste_fractions = [[1,2],[1,3],[2,3],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],
 		[1,6],[5,6],[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[1,8],[3,8],[5,8],[7,8],
 		[1,9],[2,9],[4,9],[5,9],[7,9],[8,9],[1,10],[3,10],[7,10],[9,10]]
		if(this.sup==1){
		    type_de_questions_disponibles = [1,2,3] // coef de x = 1
        }
        else if (this.sup==2) {
		    type_de_questions_disponibles = [4,5,6]  // coef de x > 1
        }
        else {type_de_questions_disponibles = [7,8,9]}  // coef de x relatif
		
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions)
		for (let i = 0, texte, texte_corr, cpt=0, a, b, c ; i < this.nb_questions && cpt<50 ;) {
			type_de_questions = liste_type_de_questions[i];
			a= randint(1,9);
			b = randint(2,9);
			fraction = choice(liste_fractions);
			ns=fraction[0]
			ds=fraction[1]
			switch(type_de_questions){
			case 1 :
				texte = `$(x+${a})^2$`; // (x+a)²
				texte_corr = `$(x+${a})^2=x^2+2 \\times ${a} \\times x+${a}^2=x^2+${2*a}x+${a*a}$` ; 
				break;
			case 2 :
			texte = `$(x-${a})^2$`  // (x-a)²
				texte_corr = `$(x-${a})^2=x^2-2 \\times ${a} \\times x+${a}^2=x^2-${2*a}x+${a*a}$` ; 
				break;
			case 3 :
				texte = `$(x-${a})(x+${a})$`    // (x-a)(x+a)
				texte_corr = `$(x-${a})(x+${a})=x^2-${a}^2=x^2-${a*a}$` ; 
				break;
			case 4 :
				texte = `$(${b}x+${a})^2$`; //(bx+a)²  b>1
			    texte_corr = `$(${b}x+${a})^2=(${b}x)^2+2 \\times ${b}x \\times ${a} + ${a}^2=${b*b}x^2+${2*b*a}x+${a*a}$`;
				break;
			case 5 :
				texte = `$(${b}x-${a})^2$`; //(bx-a)² b>1
			    texte_corr = `$(${b}x-${a})^2=(${b}x)^2-2 \\times ${b}x \\times ${a} + ${a}^2=${b*b}x^2-${2*b*a}x+${a*a}$`;
				break;
			case 6 :
				texte = `$(${b}x-${a})(${b}x+${a})$`; //(bx-a)(bx+a) b>1
			    texte_corr = `$(${b}x-${a})(${b}x+${a})=(${b}x)^2-${a}^2=${b*b}x^2-${a*a}$`;
                break;
			case 7 :
				texte = `$\\left(${tex_fraction(ns,ds)}x+${a}\\right)^2$`; // (kx+a)² k rationnel 
				texte_corr = `$\\left(${tex_fraction(ns,ds)}x+${a}\\right)^2=\\left(${tex_fraction(ns,ds)}x\\right)^2+2 \\times ${tex_fraction(ns,ds)}x \\times ${a} + ${a}^2=\\left(${tex_fraction(ns,ds)}x+${a}\\right)^2=${tex_fraction(ns*ns,ds*ds)}x^2+${tex_fraction_reduite(ns*2*a,ds)}x+${a*a}$`;
				break;
			case 8 :
				texte = `$\\left(${tex_fraction(ns,ds)}x-${a}\\right)^2$`; // (kx-a)² k rationnel 
				texte_corr = `$\\left(${tex_fraction(ns,ds)}x-${a}\\right)^2=\\left(${tex_fraction(ns,ds)}x\\right)^2-2 \\times ${tex_fraction(ns,ds)}x \\times ${a} + ${a}^2=${tex_fraction(ns*ns,ds*ds)}x^2-${tex_fractionreduite(ns*2*a,ds)}x+${a*a}$`;
				break;
			case 9 :
				//  (bx-a)(bx+a) avec a entier et b rationnel simple
				texte = `$\\left(${tex_fraction(ns,ds)}x-${a}\\right)\\left(${tex_fraction(ns,ds)}x+${a}\\right)$`; // b>1
				texte_corr = `$\\left(${tex_fraction(ns,ds)}x-${a}\\right)\\left(${tex_fraction(ns,ds)}x+${a}\\right)=\\left(${tex_fraction(ns,ds)}x\\right)^2-${a}^2=${tex_fraction(ns*ns,ds*ds)}x^2-${a*a}$`;
				break;
			}
			if (this.liste_questions.indexOf(texte)==-1) {
				 // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',3,'1 : Coefficient de x égal à 1\n 2 : Coefficient de x supérieur à 1\n 3 : Coefficient de x relatif'] ;
}

/**
* @auteur Jean-Claude Lhote
*/
function Developper_Identites_remarquables3()
{
Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Développer (a-b)(a+b)";
	this.consigne = "Développer les expressions suivantes.";
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing = 1 ;
	this.spacing_corr = 1 ;
	this.nb_questions = 5 ;
	this.sup=1 ;


	this.nouvelle_version = function(numero_de_l_exercice) {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		liste_fractions = [[1,2],[1,3],[2,3],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],
		[1,6],[5,6],[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[1,8],[3,8],[5,8],[7,8],
		[1,9],[2,9],[4,9],[5,9],[7,9],[8,9],[1,10],[3,10],[7,10],[9,10]]
		for (let i = 0, texte, texte_corr, cpt=0, a, b, c ; i < this.nb_questions && cpt<50 ;) {
			if(this.sup==1){
				a= randint(1,9);	 // coef de x est égal à 1
				texte = `$(x-${a})(x+${a})$`    // (x-a)(x+a)
				texte_corr = `$(x-${a})(x+${a})=x^2-${a}^2=x^2-${a*a}$` ; 
			}
			else if (this.sup==2) {
				a= randint(1,9)  // (bx-a)(bx+a) avec a et b entier positifs entre 1 et 9,  b différent de 1
				b = randint(2,9);
				texte = `$(${b}x-${a})(${b}x+${a})$`; // b>1
			    texte_corr = `$(${b}x-${a})(${b}x+${a})=(${b}x)^2-${a}^2=${b*b}x^2-${a*a}$`;
			}
			else {   //  (bx-a)(bx+a) avec a entier et b rationnel simple
				a= randint(1,9);
				fraction = choice(liste_fractions);
				ns=fraction[0]
				ds=fraction[1]
				texte = `$\\left(${tex_fraction(ns,ds)}x-${a}\\right)\\left(${tex_fraction(ns,ds)}x+${a}\\right)$`; // b>1
				texte_corr = `$\\left(${tex_fraction(ns,ds)}x-${a}\\right)\\left(${tex_fraction(ns,ds)}x+${a}\\right)=\\left(${tex_fraction(ns,ds)}x\\right)^2-${a}^2=${tex_fraction(ns*ns,ds*ds)}x^2-${a*a}$`;
				}
			
			if (this.liste_questions.indexOf(texte)==-1) {
				 // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',3,'1 : Coefficient de x égal à 1\n 2 : Coefficient de x supérieur à 1\n 3 : Coefficient de x rationnel'] ;
}

/**
* @auteur Jean-Claude Lhote
*/
function Factoriser_Identites_remarquables3()
{
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Factoriser a²-b²";
	this.consigne = "Factoriser les expressions suivantes.";
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing = 1 ;
	this.spacing_corr = 1 ;
	this.nb_questions = 5 ;
	this.sup=1 ;

	this.nouvelle_version = function(numero_de_l_exercice) {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		liste_fractions = [[1,2],[1,3],[2,3],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],
 		[1,6],[5,6],[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[1,8],[3,8],[5,8],[7,8],
 		[1,9],[2,9],[4,9],[5,9],[7,9],[8,9],[1,10],[3,10],[7,10],[9,10]]
		for (let i = 0, texte, texte_corr, cpt=0, a, b, c ; i < this.nb_questions && cpt<50 ;) {
			if(this.sup==1){
				a= randint(1,9);	 // coef de x est égal à 1
				texte = `$x^2-${a*a}$`    // (x-a)(x+a)
				texte_corr = `$x^2-${a*a}=x^2-${a}^2=(x-${a})(x+${a})$` ; 
			}
			else if (this.sup==2) {
				a= randint(1,9)  // (bx-a)(bx+a) avec a et b entier positifs entre 1 et 9,  b différent de 1
				b = randint(2,9);
				texte = `$${b*b}x^2-${a*a}$`; // b>1
			    texte_corr = `$${b*b}x^2-${a*a}=(${b}x)^2-${a}^2=(${b}x-${a})(${b}x+${a})$`;
			}
			else {   //  (bx-a)(bx+a) avec a entier et b rationnel simple
				a= randint(1,9);
				fraction = choice(liste_fractions);
				ns=fraction[0]
				ds=fraction[1]
				texte = `$${tex_fraction(ns*ns,ds*ds)}x^2-${a*a}$`; // b>1
				   texte_corr = `$${tex_fraction(ns*ns,ds*ds)}x^2-${a*a}=\\left(${tex_fraction(ns,ds)}x\\right)^2-${a}^2=\\left(${tex_fraction(ns,ds)}x-${a}\\right)\\left(${tex_fraction(ns,ds)}x+${a}\\right)$`;
		
			}  
				
			if (this.liste_questions.indexOf(texte)==-1) {
				 // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',3,'1 : Coefficient de x égal à 1\n 2 : Coefficient de x supérieur à 1\n 3 : Coefficient de x rationnel'] ;
}

/**
* @auteur Jean-Claude Lhote
*/
function Factoriser_Identites_remarquables2()
{
Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Factoriser avec les identités remarquables";
	this.consigne = "Factoriser les expressions suivantes.";
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing = 1 ;
	this.spacing_corr = 1 ;
	this.nb_questions = 5 ;
	this.sup=1 ;

	this.nouvelle_version = function(numero_de_l_exercice) {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		liste_fractions = [[1,2],[1,3],[2,3],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],
		[1,6],[5,6],[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[1,8],[3,8],[5,8],[7,8],
		[1,9],[2,9],[4,9],[5,9],[7,9],[8,9],[1,10],[3,10],[7,10],[9,10]]
		if(this.sup==1){
		    type_de_questions_disponibles = [1,2,3] // coef de x = 1
        }
        else if (this.sup==2) {
		    type_de_questions_disponibles = [4,5,6]  // coef de x > 1
        }
        else {type_de_questions_disponibles = [7,8,9]}  // coef de x rationnel
		
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions)
		for (let i = 0, texte, texte_corr, cpt=0, a, b ; i < this.nb_questions && cpt<50 ;) {
			type_de_questions = liste_type_de_questions[i];
			a= randint(1,9);
			b = randint(2,9);
			fraction = choice(liste_fractions);
			ns=fraction[0]
			ds=fraction[1]
        	switch(type_de_questions){
			case 1 :
				texte = `$x^2+${2*a}x+${a*a}$`; // (x+a)²
				texte_corr = `$x^2+${2*a}x+${a*a}=x^2+2 \\times ${a} \\times x+${a}^2=(x+${a})^2$` ; 
				break;
			case 2 :
			texte = `$x^2-${2*a}x+${a*a}$`  // (x-a)²
				texte_corr = `$x^2-${2*a}x+${a*a}=(x-${a})^2=x^2-2 \\times ${a} \\times x+${a}^2=(x-${a})^2$` ; 
				break;
			case 3 :
				texte = `$x^2-${a*a}$`    // (x-a)(x+a)
				texte_corr = `$x^2-${a*a}=x^2-${a}^2=(x-${a})(x+${a})$` ; 
				break;
			case 4 :
				texte = `$${b*b}x^2+${2*b*a}x+${a*a}$`; //(bx+a)²  b>1
			    texte_corr = `$${b*b}x^2+${2*b*a}x+${a*a}=(${b}x)^2+2 \\times ${b}x \\times {a} + ${a}^2=(${b}x+${a})^2$`;
				break;
			case 5 :
				texte = `$${b*b}x^2-${2*b*a}x+${a*a}$`; //(bx-a)² b>1
			    texte_corr = `$${b*b}x^2-${2*b*a}x+${a*a}=(${b}x)^2-2 \\times ${b}x \\times {a} + ${a}^2=(${b}x-${a})^2$`;
				break;
			case 6 :
				texte = `$${b*b}x^2-${a*a}$`; //(bx-a)(bx+a) b>1
			    texte_corr = `$${b*b}x^2-${a*a}=(${b}x)^2-${a}^2=(${b}x-${a})(${b}x+${a})$`;
                break;
            case 7 :
		
				texte = `$${tex_fraction(ns*ns,ds*ds)}x^2+${tex_fraction(2*ns*a,ds)}x+${a*a}$`; // (kx+a)² k rationnel 
				texte_corr = `$${tex_fraction(ns*ns,ds*ds)}x^2+${tex_fraction(ns*2*a,ds)}x+${a*a}=\\left(${tex_fraction(ns,ds)}x\\right)^2+2 \\times ${tex_fraction(ns,ds)}x \\times ${a} + ${a}^2=\\left(${tex_fraction(ns,ds)}x+${a}\\right)^2$`;
				break;
			case 8 :
				texte = `$${tex_fraction(ns*ns,ds*ds)}x^2-${tex_fraction(2*ns*a,ds)}x+${a*a}$`; // (kx-a)² k rationnel 
				texte_corr = `$${tex_fraction(ns*ns,ds*ds)}x^2-${tex_fraction(ns*2*a,ds)}x+${a*a}=\\left(${tex_fraction(ns,ds)}x\\right)^2-2 \\times ${tex_fraction(ns,ds)}x \\times ${a} + ${a}^2=\\left(${tex_fraction(ns,ds)}x-${a}\\right)^2$`;
				break;
			case 9 :
				//  (bx-a)(bx+a) avec a entier et b rationnel simple
				texte = `$${tex_fraction(ns*ns,ds*ds)}x^2-${a*a}$`; // b>1
				texte_corr = `$${tex_fraction(ns*ns,ds*ds)}x^2-${a*a}=\\left(${tex_fraction(ns,ds)}x\\right)^2-${a}^2=\\left(${tex_fraction(ns,ds)}x-${a}\\right)\\left(${tex_fraction(ns,ds)}x+${a}\\right)$`;
				break;
			}
			if (this.liste_questions.indexOf(texte)==-1) {
				 // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',3,'1 : Coefficient de x égal à 1\n 2 : Coefficient de x supérieur à 1\n 3 : Coefficient de x relatif'] ;
}

/**
* @auteur Jean-Claude Lhote
*/
function Resoudre_une_equation_produit_nul(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Résoudre une équation produit nul";
	this.consigne = "Résoudre les équations suivantes";
	this.nb_questions = 5;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1; 
	sortie_html ? this.spacing_corr=2 : this.spacing_corr=1.5
	this.spacing = 1
	
	
	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		liste_fractions = [[1,2],[1,3],[2,3],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],
 		[1,6],[5,6],[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[1,8],[3,8],[5,8],[7,8],
 		[1,9],[2,9],[4,9],[5,9],[7,9],[8,9],[1,10],[3,10],[7,10],[9,10]]
		let liste_type_de_questions=[]
		switch (parseInt(this.sup)) {
			case 1: liste_type_de_questions=combinaison_listes([1,2],this.nb_questions);
				break;
			case 2: liste_type_de_questions=combinaison_listes([3,4],this.nb_questions);
				break;
			case 3: liste_type_de_questions=combinaison_listes([5,6],this.nb_questions);
				break;
			case 4: liste_type_de_questions=combinaison_listes([1,2,3,4,5,6],this.nb_questions);

		}
		for (let i = 0, a, b, c, d, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt<50;) {
			fraction1 = choice(liste_fractions);
			ns1=fraction1[0]
			ds1=fraction1[1]
			fraction2 = choice(liste_fractions);
			ns2=fraction2[0]
			ds2=fraction2[1]
			switch (liste_type_de_questions[i]) {
			case 1: b = randint(1,20); // (x+a)(x+b)=0 avec a et b entiers
					d = randint(1,20,[b])
					texte = `$(x+${b})(x+${d})=0$`
					texte_corr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
					texte_corr += '<br>'+`$(x+${b})(x+${d})=0$`
					texte_corr +='<br> Soit '+`$x+${b}=0$`+' ou '+`$x+${d}=0$`
					texte_corr += '<br> Donc '+`$x=${0-b}$`+' ou '+`$x=${0-d}$`
				break;
			case 2: b = randint(1,20); // (x-a)(x+b)=0 avec a et b entiers
					d = randint(1,20,[b])
					texte = `$(x-${b})(x+${d})=0$`
					texte_corr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
					texte_corr += '<br>'+`$(x-${b})(x+${d})=0$`
					texte_corr += '<br> Soit '+`$x-${b}=0$`+' ou  '+`$x+${d}=0$`
					texte_corr += '<br> Donc '+`$x=${b}$`+' ou '+`$x=${0-d}$`
				break;
				
			case 3: a = randint(2,6); 	//(ax+b)(cx+d)=0  avec b/a et d/c entiers.
					b = Math.round(randint(1,5)*a);
					c = randint(2,6,[a]);
					d = Math.round(randint(1,5)*c);
					texte = `$(${a}x+${b})(${c}x+${d})=0$`
					texte_corr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
					texte_corr += '<br>'+`$(${a}x+${b})(${c}x+${d})=0$`
					texte_corr += '<br> Soit '+`$${a}x+${b}=0$`+' ou '+`$${c}x+${d}=0$`
					texte_corr += '<br> Donc '+`$${a}x=${0-b}$`+' ou '+`$${c}x=${0-d}$`
					texte_corr += '<br> Donc '+`$x=-${tex_fraction(b,a)}$`+' ou '+`$x=-${tex_fraction(d,c)}$`
					texte_corr += '<br> Donc '+`$x=${0-b/a}$`+' ou '+`$x=${0-d/c}$`
				break;
			case 4: a = randint(2,6); 	//(ax+b)(cx-d)=0  avec b/a et d/c entiers.
					b = Math.round(randint(1,5)*a);
					c = randint(2,6,[a]);
					d = Math.round(randint(1,5)*c);
					texte = `$(${a}x+${b})(${c}x-${d})=0$`
					texte_corr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
					texte_corr += '<br>'+`$(${a}x+${b})(${c}x-${d})=0$`
					texte_corr += '<br> Soit '+`$${a}x+${b}=0$`+' ou '+`$${c}x-${d}=0$`
					texte_corr += '<br> Donc '+`$${a}x=${0-b}$`+' ou '+`$${c}x=${d}$`
					texte_corr += '<br> Donc '+`$x=-${tex_fraction(b,a)}$`+' ou '+`$x=${tex_fraction(d,c)}$`
					texte_corr += '<br> Donc '+`$x=${0-b/a}$`+' ou '+`$x=${d/c}$`
				break;
			case 5:
					a = randint(2,9);	//(ax+b)(cx+d)=0 	avec b/a et d/c quelconques.
					b = randint(1,20,[a]);
					c = randint(2,9,[a]);
					d = randint(1,20,[b,c]);
					texte = `$(${a}x+${b})(${c}x+${d})=0$`
					texte_corr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
					texte_corr += '<br>'+`$(${a}x+${b})(${c}x+${d})=0$`
					texte_corr += '<br> Soit '+`$${a}x+${b}=0$`+' ou '+`$${c}x+${d}=0$`
					texte_corr += '<br> Donc '+`$${a}x=${0-b}$`+' ou '+`$${c}x=${0-d}$`
					texte_corr += '<br> Donc '+`$x=-${tex_fraction(b,a)}$`
					if (tex_fraction(b,a)!=tex_fraction_reduite(b,a)) {texte_corr+=`$=-${tex_fraction_reduite(b,a)}$`}
					texte_corr+=' ou '+`$x=-${tex_fraction(d,c)}$`
					if (tex_fraction(d,c)!=tex_fraction_reduite(d,c)) {texte_corr+=`$=-${tex_fraction_reduite(d,c)}$`}
				break;
			case 6:
					a = randint(2,9);	//(ax+b)(cx-d)=0 	avec b/a et d/c quelconques.
					b = randint(1,20,[a]);
					c = randint(2,9,[a]);
					d = randint(1,20,[b,c]);
					texte = `$(${a}x+${b})(${c}x+${d})=0$`
					texte_corr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
					texte_corr += '<br>'+`$(${a}x+${b})(${c}x-${d})=0$`
					texte_corr += '<br> Soit '+`$${a}x+${b}=0$`+' ou '+`$${c}x-${d}=0$`
					texte_corr += '<br> Donc '+`$${a}x=${0-b}$`+' ou '+`$${c}x=${d}$`
					texte_corr += '<br> Donc '+`$x=-${tex_fraction(b,a)}$`
					if (tex_fraction(b,a)!=tex_fraction_reduite(b,a)) {texte_corr+=`$=-${tex_fraction_reduite(b,a)}$`}
					texte_corr+=' ou '+`$x=${tex_fraction(d,c)}$`
					if (tex_fraction(d,c)!=tex_fraction_reduite(d,c)) {texte_corr+=`$=${tex_fraction_reduite(d,c)}$`}
					
				break;
		}
		if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
		this.liste_questions.push(texte);
		this.liste_corrections.push(texte_corr);
		// alert(this.liste_questions)
		// alert(this.liste_corrections)
			i++;
		}
		cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',4,'1 : Coefficient de x = 1\n 2 : Coefficient de x>1 et solutions entières\n 3 : Solutions rationnelles\n 4 : Mélange des 3 autres niveaux'];
}

/**
* 3F1act - Notion de fonction - vocabulaire
* * L’objectif de revenir sur l'introduction de la notion de fonction et son vocabulaire
* * On base l'exercice sur des calculs simples de type périmètres, aires, double, triple, nombre de diviseurs
*
* @Auteur Sébastien Lozano
*/

/**
* Fonction pour créer une machine mathématiques SVG, une fonction!
* @param id_du_div id_du_div
* @param w width du svg
* @param h height du svg
* @param nom nom de la fonction
* @param etape1 etape 1 du procédé de calcul
* @param etape2 etape 2 du procédé de calcul
* @param etape3 etape 3 du procédé de calcul
* @param x_ligne1 antécédent ligne1
* @param x_ligne2 antécédent ligne2
* @param i_ligne1 image ligne1
* @param i_ligne2 image ligne2
* @Auteur Sébastien Lozano
*/	
function SVG_machine_maths(id_du_div,w,h,nom,etape1,etape2,etape3,x_ligne1,x_ligne2,i_ligne1,i_ligne2) {
	'use strict';

	/**
	* Crée une flèche orange pour la fonction machine
	* @param groupe group
	* @param chemin  path de la ligne
	* @param couleur 
	* @Auteur Sébastien Lozano
	*/	
	function SVG_fleche_machine_maths(groupe,chemin,couleur) {
		'use strict';
		return groupe.path(chemin).fill(couleur).stroke({ color: couleur, width: 1, linecap: 'round', linejoin:'null'});
	};

	let interligne = 15; // pour un interligne uniforme 
	let prop_font = {family:   'Helvetica',
					size:     interligne,
					anchor:   'start'
					//, leading : 0.5
					};
	let prop_font_nom = {family:   'Helvetica',
						size:     interligne,
						anchor:   'start',
						weight: 'bold'
						//, leading : 0.5
						};					
	let prop_font_etape = {family:   'Helvetica',
						size:     4*interligne/5,
						anchor:   'start'
						//, leading : 0.5
						};
					
	if (!window.SVGExist) {window.SVGExist = {}} // Si SVGExist n'existe pas on le créé
	// SVGExist est un dictionnaire dans lequel on stocke les listenner sur la création des div
	window.SVGExist[id_du_div] = setInterval(function() {

		if ($(`#${id_du_div}`).length ) {
			$(`#${id_du_div}`).html("");//Vide le div pour éviter les SVG en doublon
			//on récupère les dimension du div parent
			//let w=document.getElementById(id_du_div).offsetWidth , h=document.getElementById(id_du_div).offsetHeight;
			//w=400, h=100;
			const mon_svg = SVG().addTo(`#${id_du_div}`).viewbox(0, 0, w, h);
			//mon_svg.size(w,h);

			// path pour créer des fleches
			//const path_fleche = 'm0,0 l-6,-11 l11,11 l-11,11 l6,-11z';
			const path_fleche = 'm0,0 l-'+interligne/2+',-'+interligne+' l'+interligne+','+interligne+' l-'+interligne+','+interligne+' l'+interligne/2+',-'+interligne+'z';
			const path_fleche_long = interligne;

			// On crée une timeline
			let timeline = new SVG.Timeline()

			//------------GROUPE ANTECEDENT------------------------- 
 			// on crée le groupe pour l'antécédent
 			let ant=mon_svg.group();
			let ant_ligne1 = ant.text(x_ligne1).font(prop_font); 
 			ant_ligne1.dmove(0,-interligne/2)
 			let ant_ligne2 = ant.text(x_ligne2).font(prop_font); 
 			ant_ligne2.dmove(ant_ligne1.length()/2-ant_ligne2.length()/2,interligne/2);

			// on crée une flèche pour l'antécédent
			let w_ant = Math.max(ant_ligne1.length(),ant_ligne2.length());
			let fleche_ant = SVG_fleche_machine_maths(ant,path_fleche,'#f15929');
			fleche_ant.dmove(w_ant+interligne/2,interligne);
			 
			// on positionne le groupe antécédent
			ant.dmove(0,h/2-interligne);
			 
			//------------GROUPE IMAGE-------------------------
			// on crée le groupe pour l'image
			let im = mon_svg.group(); 
			let im_ligne1 = im.text(i_ligne1).font(prop_font);
			im_ligne1.dmove(path_fleche_long,-interligne/2);
			let im_ligne2 = im.text(i_ligne2).font(prop_font);
			im_ligne2.dmove(path_fleche_long + im_ligne1.length()/2-im_ligne2.length()/2,interligne/2);
			
			// on crée une flèche pour l'image
			let w_im = Math.max(im_ligne1.length(),im_ligne2.length());
			let fleche_im = SVG_fleche_machine_maths(im,path_fleche,'#f15929');
			fleche_im.dmove(0,interligne);

			// on positionne le groupe image
			im.dmove(w/2-w_im/2,h/2-interligne); 

			//------------GROUPE MACHINE-------------------------
 			// on crée des variables pour le texte à afficher sur la machine afin de récupérer leur taille
			// pour ajuster celle de la machine.
			if (nom!='') {
				var machine_nom = mon_svg.text(nom).font(prop_font_nom);
				var w_machine_nom = machine_nom.length();
				machine_nom.clear();
			} else {
				var w_machine_nom = 0;
			};
			if (etape1!='') {
				var machine_etape1 = mon_svg.text(etape1).font(prop_font_etape);
				var w_machine_etape1 = machine_etape1.length();
				machine_etape1.clear();
			} else {
				var w_machine_etape1 = 0;
			};
			if (etape2!='') {
				var machine_etape2 = mon_svg.text(etape2).font(prop_font_etape);
				var w_machine_etape2 = machine_etape2.length();
				machine_etape2.clear();
			} else {
				var w_machine_etape2 = 0;
			};
			if (etape3!='') {
				var machine_etape3 = mon_svg.text(etape3).font(prop_font_etape);
				var w_machine_etape3 = machine_etape3.length();
				machine_etape3.clear();
			} else {
				var w_machine_etape3 = 0;
			};

			let w_etape_max = Math.max(w_machine_nom,w_machine_etape1,w_machine_etape2,w_machine_etape3,w_ant+interligne,w_im+interligne);

			//const path_machine = 'M-5,0 L-5,-5 L-5,5 M-5,0 L10,0 L10,-40 L100,-40 L100,0 L120,0 L115,-5 L120,0 L115,5 L120,0 L100,0 L100,40 L10,40 L10,0';
			const path_machine = 'M-10,0 L-10,-5 L-10,5 M-10,0 L10,0 L10,-40 L'+(w_etape_max+20)+',-40 L'+(w_etape_max+20)+',0 L'+(w_etape_max+40)+',0 L'+(w_etape_max+35)+',-5 L'+(w_etape_max+40)+',0 L'+(w_etape_max+35)+',5 L'+(w_etape_max+40)+',0 L'+(w_etape_max+20)+',0 L'+(w_etape_max+20)+',40 L10,40 L10,0';
			let machine = mon_svg.path(path_machine).fill('#fff').stroke({ color: '#f15929', width: 3, linecap: 'round', linejoin:'round'});;
			machine.dmove(w/2-w_etape_max/2 - 20 + interligne/2,h/2); //w/2;  60 est la moitié de la taille de la machine en largeur

			machine_nom = mon_svg.text(nom).font(prop_font_nom).move(w/2-w_machine_nom/2,interligne);
			machine_etape1 = mon_svg.text(etape1).font(prop_font_etape).move(w/2-w_machine_etape1/2,2*interligne);
			machine_etape2 = mon_svg.text(etape2).font(prop_font_etape).move(w/2-w_machine_etape2/2,3*interligne);
			machine_etape3 = mon_svg.text(etape3).font(prop_font_etape).move(w/2-w_machine_etape3/2,4*interligne);

			//------------ANIMATION-------------------------
 			ant.timeline(timeline);
 			im.timeline(timeline);

 			let runner1 = ant.animate(8000,0,'absolute').dmove(w/2-w_ant/2,0);
 			let runner2 = im.animate(8000,0,'after').dmove(w-w_im/2,0);

 			runner1.loop(true,false,8000);
 			runner2.loop(true,false,8000);


		clearInterval(SVGExist[id_du_div]);//Arrête le timer
		}

	}, 100); // Vérifie toutes les 100ms
}
/**
* Crée une liste de questions alphabétique
* @param k valeur numérique
* @Auteur Sébastien Lozano
*/	
function num_alpha(k) {
	'use strict';
	return '<span style="color:#f15929; font-weight:bold">'+String.fromCharCode(97+k)+'/</span>';
};

/**
* Crée un popup html éventuellement avec du contenu LaTeX
* @param texte texte affiché
* @param titrePopup titre Popup
* @param textePopup texte du Popup
* @Auteur Sébastien Lozano
*/	
function katex_Popup(texte,titrePopup,textePopup) {
	'use strict';
	let contenu =`<div class="ui button katexPopup">`+texte+`</div>`;
	contenu += `<div class="ui special popup" >`;
	if (titrePopup!='') {
		contenu += `<div class="header">`+titrePopup+`</div>`;
	};
	contenu += `<div>`+textePopup+`</div>`;
	contenu += `</div>`;

	return contenu;
};

/**Trace un chemin pour un groupe donné avec une couleur donnée
* @param groupe groupe
* @param chemin path
* @param couleur couleur
* @Auteur Sébastien Lozano
*/	
function SVG_chemin(groupe,chemin,couleur) {
	'use strict';
	return groupe.path(chemin).fill('none').stroke({ color: couleur, width: 1, linecap: 'round', linejoin:'null'});
};

/**Trace un cercle pour un groupe donné avec une couleur donnée
* @param groupe groupe
* @param r_circ rayon
* @param couleur couleur
* @Auteur Sébastien Lozano
*/	
function SVG_cadre_rond(groupe,r_circ,couleur) {
	'use strict';
	return groupe.circle(r_circ).fill('none').stroke({ color: couleur, width: 1, linecap: 'round', linejoin:'null'});
};

/**Trace une etape de diagramme et la place 
* @param mon_svg le svg global
* @param interligne unité d'espacement
* @param h hauteur
* @param couleur couleur
* @param deplacement deplacement
* @Auteur Sébastien Lozano
*/	
function SVG_etapes(mon_svg,interligne,h,couleur,deplacement) {
	'use strict';
	let path_cadre_rect = 'M0,0L0,-'+interligne+',L'+4*interligne+',-'+interligne+',L'+4*interligne+','+interligne+'L0,'+interligne+'Z';
	let path_fleche = 'M0,0L'+interligne+',0L'+(interligne-2)+',-2M'+interligne+',0L'+(interligne-2)+',2';
	let etape = mon_svg.group();
	//path_fleche = 'M0,0L10,0L8,-2M10,0L8,2';
	let l1 = etape.line(0,0,interligne,0).stroke({ width: 1 ,color: couleur});
	l1.dmove(0,h/2);
	let cadre_etape = SVG_cadre_rond(etape,2*interligne,couleur);
	cadre_etape.dmove(interligne,h/2-interligne);
	let f1 = SVG_chemin(etape,path_fleche,couleur);
	f1.dmove(3*interligne,h/2);
	let cadre_fin = SVG_chemin(etape,path_cadre_rect,'#f15929');
	cadre_fin.dmove(4*interligne,h/2)
	etape.dmove(deplacement,0);
	return etape;
};

/**
* Crée un digramme pour une fonction arithmétique
* @param id_du_div id_du_div
* @param w width du svg
* @param h height du svg
* @param nom nom de la fonction
* @param x_ant antécédent
* @param etapes etapes de type tableau
* @param expressions expressions de type tableau
* @Auteur Sébastien Lozano
*/	
function SVG_machine_diag(id_du_div,w,h,nom,x_ant,etapes,expressions) {
	'use strict';
	let interligne = 10; // unité d'espacement
	let prop_font = {family:   'Helvetica',
					size:     interligne,
					anchor:   'start'
					//, leading : 0.5
					};							
	if (!window.SVGExist) {window.SVGExist = {}} // Si SVGExist n'existe pas on le créé
	// SVGExist est un dictionnaire dans lequel on stocke les listenner sur la création des div
	window.SVGExist[id_du_div] = setInterval(function() {
		if ($(`#${id_du_div}`).length ) {
			$(`#${id_du_div}`).html("");//Vide le div pour éviter les SVG en doublon
			const mon_svg = SVG().addTo(`#${id_du_div}`).viewbox(0, 0, w, h);
			let path_cadre_rect = 'M0,0L0,-'+interligne+',L'+4*interligne+',-'+interligne+',L'+4*interligne+','+interligne+'L0,'+interligne+'Z';
			let path_fleche = 'M0,0L10,0L8,-2M10,0L8,2';
 			// on crée le groupe pour le diagramme
			let diag=mon_svg.group();
			let cadre_ant = SVG_chemin(diag,path_cadre_rect,'#f15929');  
			cadre_ant.dmove(0,h/2);
			let x = diag.text(x_ant).font(prop_font); 
			x.dmove(2*interligne-x.length()/2,h/2-interligne);
			let svg_etapes = [];
			let svg_cadres_fin = [];
			let svg_operations_etapes = [];
			let w_svg_operations_etapes = [];
			for (var i = 0; i<etapes.length; i++) {
				svg_etapes[i] = SVG_etapes(mon_svg,interligne,h,'#f15929',4*interligne+8*i*interligne);
				if (etapes.length==i+1) {//si la longueur du tableau des etapes vaut i+1 c'est que c'est la derniere on affiche f(x)=...
					if (typeof expressions[i]!=='undefined') {
						svg_cadres_fin[i] = diag.text(nom+'(x)='+expressions[i]).font(prop_font);
					} else {
						svg_cadres_fin[i] = diag.text(nom+'(x)=...').font(prop_font);
					};
					let w_cadre_fin = svg_cadres_fin[i].length();
					svg_cadres_fin[i].dmove(10*interligne+8*i*interligne-w_cadre_fin/2,h/2-interligne);
				} else {//sinon on affiche ......
					svg_cadres_fin[i] = diag.text('......').dmove(9*interligne+8*i*interligne,interligne);
				};				
				svg_operations_etapes[i] = diag.text(etapes[i]).font(prop_font);
				w_svg_operations_etapes[i] = svg_operations_etapes[i].length();
				svg_operations_etapes[i].dmove(6*interligne+8*i*interligne-w_svg_operations_etapes[i]/2,h/2-interligne);
			};		 

		clearInterval(SVGExist[id_du_div]);//Arrête le timer
		}

	}, 100); // Vérifie toutes les 100ms

};

function fonction_notion_vocabulaire(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1 ; 
	this.titre = "Fonction : Notion et vocabulaire"; 
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

	var num_ex = '3F1act'; // pour rendre unique les id des SVG, en cas d'utilisation dans plusieurs exercices y faisant appel

	if (sortie_html) {		
		let id_unique = `_consigne_${num_ex}_${Date.now()}`; // on formatte avec le numéro de l'exercice pour éviter les doublons
		let id_du_div = `div_svg${id_unique}`;
		var pourcentage = '100%'; // pour l'affichage des svg. On a besoin d'une variable globale
		var hauteur_svg = 100;

		//this.consigne += `<div id="consigne" style="width: 100%; height: 500px; display : table "></div>`;
		//this.consigne += `<div id="${id_du_div}" style="width: 100%; height: 150px; display : table "></div>`;
		this.consigne += `<div id="${id_du_div}" style="width: ${pourcentage}; height: ${hauteur_svg}px; display : table "></div>`;
		SVG_machine_maths(id_du_div,400,hauteur_svg,'machine maths','','Procédé','de calcul','antécédent','x','image','y');
	} else { // sortie LaTeX

	};
	this.nouvelle_version = function(numero_de_l_exercice){
		let type_de_questions;
		//this.bouton_aide = modal_pdf(numero_de_l_exercice,"http://lozano.maths.free.fr/coopmaths/FichePuissances-4N21.pdf","Aide mémoire sur les puissances (Sébastien Lozano)")
		
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées

		//let type_de_questions_disponibles = [1,2,3,4];
		let type_de_questions_disponibles = [1];
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions);

			for (let i = 0, x, texte, texte_corr, cpt=0; i < this.nb_questions&&cpt<50;) {
				type_de_questions = liste_type_de_questions[i];
	
				let id_unique = `${num_ex}_${i}_${Date.now()}`
				let id_du_div = `div_svg${numero_de_l_exercice}${id_unique}`;
				let id_du_div_corr = `div_svg_corr${numero_de_l_exercice}${id_unique}`;
	
				switch (type_de_questions) {
					case 1 : // périmètre d'un carré de côté x			
						var j = 0; // pour la sous-numérotation
						texte = `La $\\textbf{machine f}$ renvoie le périmètre d'un carré de côté $x$`;
						//texte += `<br>`;
						x = randint(1,9);//augmenter les possibles pour éviter les questions déjà posées?	
						if (sortie_html) {
							texte += `<br>`;
							texte += `<div id="${id_du_div}" style="width: ${pourcentage}"; height: 150px; display : table "></div>`;
							SVG_machine_maths(id_du_div,400,hauteur_svg,'machine f','','périmètre','d\'un carré','carré de','côté '+x+' cm','périmètre','??? cm');
							
						} else { // sortie Latex avec Tikz

						};
						texte += num_alpha(j)+` Que renvoie la machine si le côté vaut  ${x}  cm ? Formuler la réponse `;
						if (sortie_html){
							texte += katex_Popup('avec le mot image','Image','la valeur du périmètre est l\'image de la valeur du côté')+`<br>`;
						} else { //sortie LaTeX
							texte+= `avec le mot image. <br>`;
						};
						texte_corr = num_alpha(j)+`Si le côté vaut ${x} cm alors la machine renvoie le périmètre d'un carré de côté ${x} cm, c'est à dire ${4*x} cm.<br>`;
						texte_corr += `On dit que ${4*x} est l'image de ${x} par la fonction f.<br>`;						
						j++;//incrémente la sous question

						x = randint(1,9);//augmenter les possibles pour éviter les questions déjà posées?	
						texte += num_alpha(j)+` Combien vaut le côté si la machine renvoie  ${4*x} cm ? Formuler la réponse `;
						if (sortie_html){
							texte += katex_Popup('avec le mot antécédent','Antécédent','un antécédent de la valeur d\'un périmètre est une valeur du côté qui a pour image ce périmètre')+`<br>`;
						} else { //sortie LaTeX
							texte+= `avec le mot antécédent. <br>`;
						};														
						texte_corr += num_alpha(j)+`Si la machine renvoie un périmètre de ${4*x} cm alors le côté du carré vaut ${x} cm.<br>`;
						texte_corr += `On dit que ${x} est <b>un</b> antécédent de ${4*x} par la fonction f.<br>`;						
						j++;//incrémente la sous question

						x = randint(1,9);//augmenter les possibles pour éviter les questions déjà posées?	
						texte += num_alpha(j)+` Quelle est l'image de ${x} par la `; 
						if (sortie_html){
							texte += katex_Popup('fonction','Vocabulaire','<b>fonction</b> est le nom que l\'on donne aux machines mathématiques');														
						} else { // sortie LaTeX
							texte +=`fonction`;
						};
						texte += ` $f$ ? Ecrire la réponse sous la forme `;
						if (sortie_html){
							texte += katex_Popup('$\\textbf{f('+x+') = \\ldots}$','Notation','4 a pour image 16 par la fonction f peut s\'écrire <b>f(4)=16</b>')+`<br>`;
						} else { // sortie LaTeX
							texte +=`$\\textbf{f(${x}) = \\ldots}$<br>`;
						};
						texte_corr += num_alpha(j)+`L'image de ${x} par la fonction f vaut $f(${x})=${4*x}$.<br>`;
						j++;//incrémente la sous question

						texte += num_alpha(j)+` Que renvoie la machine si le côté vaut $x$ cm ?<br>`;
						texte_corr += num_alpha(j)+`Si le côté vaut $x$ la machine renvoie $x+x+x+x$ ou ce qui est équivalent $4\\times x$ .<br>`;
						j++;//incrémente la sous question

						texte += num_alpha(j)+` Ecrire la réponse à la question `+num_alpha(j-1)+` sous forme de diagramme.<br>`;
						texte += `Voici le diagramme d'une machine qui triple `;
						texte += `<div id="diagramme" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
						SVG_machine_diag('diagramme',400,50,'f','x',['x3'],['3x']);

						texte_corr += num_alpha(j)+`C'est une machine qui quadruple, donc sous forme de diagramme.<br>`;
						texte_corr += `<div id="diagramme_corr" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
						SVG_machine_diag('diagramme_corr',400,50,'f','x',['x4'],['4x']);
						j++;//incrémente la sous question

						texte += num_alpha(j)+` Ecrire la réponse à la question `+num_alpha(j-2)+` sous la forme `;
						if (sortie_html){
							texte += katex_Popup('$\\textbf{f(\\textit{x}) = \\ldots}$','Notation','4 a pour image 16 par la fonction f peut s\'écrire <b>f(4)=16</b>')+`<br>`;							
						} else { // sortie LaTeX
							texte +=`$\\textbf{f(${x}) = \\ldots}$<br>`;
						};
						texte_corr += num_alpha(j)+`L'image de $x$ par la fonction f vaut $4\\times x$ donc $f(x)=4\\times x$.<br>`;
						j++;//incrémente la sous question

						texte += num_alpha(j)+` En utilisant la forme `;
						if (sortie_html){							
							texte += katex_Popup('$\\mathbf{f :} \\textbf{\\textit{ x }} \\mathbf{\\longmapsto \\ldots}$','Notation','4 a pour image 16 par la fonction f peut s\'écrire $\\textbf{f : 4 } \\mathbf{\\longmapsto} \\textbf{16}$');							
							texte+= `
						  <script>
						  $('.katexPopup').popup({
							   popup: '.special.popup',
							   on: 'hover',
							   variation: 'inverted',
							   inline: true
							});
						  </script>
							`;
						} else { // sortie LaTeX
							texte +=`$\\textbf{\\textit{x}} \\stackrel{\\mathbf{f :}}{\\mathbf{\\longmapsto}} \\textbf{\\ldots}$`;
						};						
						texte+= `écrire la réponse à la question `+num_alpha(j-3)+`<br>`;
						texte_corr += num_alpha(j)+`L'image de $x$ par la fonction f vaut $4\\times x$ donc $f : x \\longmapsto 4\\times x$.<br>`;												
						j++;//incrémente la sous question

						//texte_corr = `Périmètre d'un carré de côté ${x}`;
						break;			
					case 2 : // aire d'un carré de côté x
						texte = `La $\\textbf{machine g}$ renvoie l'aire d'un carré de côté x`;
						texte += `<br>`;
						texte += `Quelle est la sortie si le côté vaut  ${x}  cm ?`;
						if (sortie_html) {
							texte += `<br>`;
							texte += `<div id="${id_du_div}" style="width: ${pourcentage}; height: 150px; display : table "></div>`;
							SVG_machine_maths(id_du_div,400,hauteur_svg,'machine g','','aire','d\'un carré','carré de','côté '+x+' cm','aire','? cm');
						} else { // sortie LaTeX avec Tikz

						};
						//texte_corr = `Aire d'un carré de côté ${x}`;
						break;			
					case 3 : // somme de 1 et du triple de x
						texte = `La $\\textbf{machine h}$ renvoie la somme de 1 et du triple de x`;
						texte += `<br>`;
						texte += `Quelle est la sortie si le nombre de départ vaut  ${x}  ?`;
						if (sortie_html) {
							texte += `<br>`;
							texte += `<div id="${id_du_div}" style="width: ${pourcentage}; height: 150px; display : table "></div>`;
							SVG_machine_maths(id_du_div,400,hauteur_svg,'machine h','','-> tripler','-> ajouter 1','nombre de','départ '+x+'','nombre de','sortie ?');							
						} else { // sortie LaTeX avec Tikz

						};
						texte_corr = `Somme de 1 et du triple de ${x}`;
						break;
					case 4 : // nombre de diviseurs de x entier
					texte = `La $\\textbf{machine d}$, qui n'accepte que des nombres entiers positifs, renvoie le nombre de diviseurs du nombre de départ.`;
					texte += `<br>`;
					texte += `Quelle est la sortie si le nombre de départ vaut  ${x}  ?`;
						if (sortie_html) {
							texte += `<br>`;
							texte += `<div id="${id_du_div}" style="width: ${pourcentage}; height: 150px; display : table "></div>`;
							SVG_machine_maths(id_du_div,400,hauteur_svg,'machine d','','nombre de','diviseurs','nombre de','départ '+x,'nombre de',' diviseurs ?');														
						} else { // sortie LaTeX avec Tikz

						};
						texte_corr = `Nombre de diviseurs de ${x} (entier)`;
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