


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
				const mon_svg = SVG().addTo(`#${id_du_div}`).viewbox(0, 0, 500, 500).size('100%','100%')

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
 * 3F1-act - Notion de fonction - vocabulaire
 * L’objectif de revenir sur l'introduction de la notion de fonction et son vocabulaire
 * On base l'exercice sur des calculs simples de type périmètres, aires, double, triple, nombre de diviseurs
 *
 * @Auteur Sébastien Lozano
 */

 //=======================================================================
 // fonctions dont le déplacement dasn mathalea_outils.js pose problème
 //=======================================================================

 /**
  * Fonction pour particulariser une police svg et ses paramètres  
  * @param {string} font 
  * @param {string} interligne 
  * @param {string} ancre 
  * @param {string} f_style 
  * @param {string} f_weight
  * @author Sébastien Lozano 
  */ 
 function my_svg_font(font,interligne,ancre,f_style,f_weight){
	'use strict';
	return {family:  font,
		size: interligne,
		anchor: ancre,
		style: f_style,
		//, leading : 0.5
		weight : f_weight
		};
};

/**
 * Fonction pour créer une machine mathématique SVG, une fonction!
 * gestion du rendu KaTeX temporaire avec insertion manuelle de balises foreignObject pour les textes
 * @param {string} id_du_div id_du_div
 * @param {number} w width du svg
 * @param {number} h height du svg
 * @param {string} nom nom de la fonction
 * @param {string} etape1 etape 1 du procédé de calcul
 * @param {string} etape2 etape 2 du procédé de calcul
 * @param {string} etape3 etape 3 du procédé de calcul
 * @param {string} x_ligne1 antécédent ligne1
 * @param {string} x_ligne2 antécédent ligne2
 * @param {string} y_ligne1 image ligne1
 * @param {string} y_ligne2 image ligne2
 * @author Sébastien Lozano
 */	
function SVG_machine_maths(id_du_div,w,h,nom,etape1,etape2,etape3,x_ligne1,x_ligne2,y_ligne1,y_ligne2) {
	'use strict';
	let interligne = 15; // pour un interligne uniforme 
	let prop_font = my_svg_font('Helvetica',interligne,'start','normal','normal');
	let prop_font_nom = my_svg_font('Helvetica',interligne,'start','normal','bold');
	let prop_font_etape = my_svg_font('Helvetica',4*interligne/5,'start','normal','normal');
					
	if (!window.SVGExist) {window.SVGExist = {}} // Si SVGExist n'existe pas on le créé
	// SVGExist est un dictionnaire dans lequel on stocke les listenner sur la création des div
	window.SVGExist[id_du_div] = setInterval(function() {

		if ($(`#${id_du_div}`).length ) {
			$(`#${id_du_div}`).html("");//Vide le div pour éviter les SVG en doublon
			//const mon_svg = SVG().addTo(`#${id_du_div}`).viewbox(0, 0, w, h).size('100%','100%');
			const mon_svg = SVG().addTo(`#${id_du_div}`).viewbox(0, 0, w, h);
			// on trace un cadre pour le debug
			//mon_svg.path('M0,0 L'+w+',0L'+w+','+h+'L0,'+h+'Z').fill('none').stroke({ color: '#f15929', width: 1, linecap: 'round', linejoin:'null'});

			// path pour créer des fleches
			const path_fleche = 'm0,0 l-'+interligne/2+',-'+interligne+' l'+interligne+','+interligne+' l-'+interligne+','+interligne+' l'+interligne/2+',-'+interligne+'z';

			// On crée une timeline
			let timeline = new SVG.Timeline();

			//------------CREATION DES GROUPES----------------------
			//------------Antécédent--------------------------------
			let ant=mon_svg.group();

			//------------Image-------------------------------------
			let im = mon_svg.group(); 

			//------------PREPARATION DES DIMENSIONS NECESSAIRES----
			//------------Dimension Antécédent----------------------
			let ant_ligne1 = ant.text(x_ligne1).font(prop_font); 
			let ant_ligne2 = ant.text(x_ligne2).font(prop_font); 
			let w_ant = Math.max(ant_ligne1.length(),ant_ligne2.length())+interligne;
			ant_ligne1.clear();
			ant_ligne2.clear();

			//------------Dimension Image---------------------------
			let im_ligne1 = im.text(y_ligne1).font(prop_font); 
			let im_ligne2 = im.text(y_ligne2).font(prop_font); 
			let w_im = Math.max(im_ligne1.length(),im_ligne2.length())+interligne;
			im_ligne1.clear();
			im_ligne2.clear();

			//------------Dimension Machine-------------------------
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

			let w_etape_max = Math.max(w_machine_nom,w_machine_etape1,w_machine_etape2,w_machine_etape3,w_ant+interligne,w_im+interligne)+1.5*interligne;

			//------------GROUPE ANTECEDENT------------------------- 
			let ant_ligne = ant.foreignObject(w_ant,h).attr({x:'0',y:'0'});
			let antDiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
			katex.render(x_ligne1+'\\newline '+x_ligne2, antDiv, {				
				"displayMode":true,"throwOnError":true,"errorColor":"#CC0000","strict":"ignore","trust":false				
			});
			ant_ligne.add(antDiv);
			ant_ligne.dmove(0,-antDiv.offsetHeight/2);
			let fleche_ant = SVG_fleche_machine_maths(ant,path_fleche,'#f15929');
			fleche_ant.dmove(antDiv.offsetWidth+interligne/2,interligne); 
			// on positionne le groupe antécédent
			ant.dmove(0,h/2-interligne);
			 
			//------------GROUPE IMAGE-------------------------
			let im_ligne = im.foreignObject(w_im,h).attr({x:'0',y:'0'});
			let imDiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
			katex.render(y_ligne1+'\\newline '+y_ligne2, imDiv, {				
				"displayMode":true,"throwOnError":true,"errorColor":"#CC0000","strict":"ignore","trust":false				
			});
			im_ligne.add(imDiv);
			im_ligne.dmove(0,-imDiv.offsetHeight/2);
			let fleche_im = SVG_fleche_machine_maths(im,path_fleche,'#f15929');
			fleche_im.dmove(-interligne/2,interligne);			 
			// on positionne le groupe image
			im.dmove(w/2-imDiv.offsetWidth/2,h/2-interligne);

			//------------GROUPE MACHINE-------------------------
			//const path_machine = 'M-5,0 L-5,-5 L-5,5 M-5,0 L10,0 L10,-40 L100,-40 L100,0 L120,0 L115,-5 L120,0 L115,5 L120,0 L100,0 L100,40 L10,40 L10,0';
			const path_machine = 'M-10,0 L-10,-5 L-10,5 M-10,0 L10,0 L10,-'+(h/2-5)+' L'+(w_etape_max+20)+',-'+(h/2-5)+' L'+(w_etape_max+20)+',0 L'+(w_etape_max+40)+',0 L'+(w_etape_max+35)+',-5 L'+(w_etape_max+40)+',0 L'+(w_etape_max+35)+',5 L'+(w_etape_max+40)+',0 L'+(w_etape_max+20)+',0 L'+(w_etape_max+20)+','+(h/2-5)+' L10,'+(h/2-5)+' L10,0';
			let machine = mon_svg.path(path_machine).fill('#fff').stroke({ color: '#f15929', width: 3, linecap: 'round', linejoin:'round'});
			machine.dmove(w/2-w_etape_max/2 - 20 + interligne/2,h/2); //w/2;  60 est la moitié de la taille de la machine en largeur

			let fobj_machine = mon_svg.foreignObject(w_etape_max,h).attr({x:w/2-w_etape_max/2,y:'0'});
			let machineDiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
			katex.render('\\mathbf{'+nom+'}\\newline '+etape1+'\\newline '+etape2+'\\newline '+etape3, machineDiv, {				
				"displayMode":true,"throwOnError":true,"errorColor":"#CC0000","strict":"ignore","trust":false				
			});
			fobj_machine.add(machineDiv);
			fobj_machine.dmove(0,h/2-interligne-machineDiv.offsetHeight/2);

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
};

//==========================================================================
 // fin fonctions dont le déplacement dasn mathalea_outils.js pose problème
 //=========================================================================
 
function fonction_notion_vocabulaire(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1 ; 
	this.titre = "Fonction : Notion et vocabulaire"; 
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne =``;
	// Message Bug SVG qui ne s'affiche pas dans la correction sans rafraichir
	if (sortie_html) {
		this.consigne = `
		<div class="ui compact warning message">		
		  <p>
		  <i class="exclamation triangle icon"></i>
		  ATTENTION BUG CONNU<br>
		  Appuyer sur "F5" ou cliquer sur "Nouvelles données" avant de commencer l'exercice<br>
		  Sinon il y a problème d'affichage dans la correction. 
		  </p>
	  	</div>
	  	<br>
		`;
	}
	this.consigne += "Lorsqu'un nombre $\\textit{x}$ entre dans une machine mathématique , celle-ci renvoie à la sortie un nombre appelé $\\textit{image de x}$.<br>";
	this.consigne += "On dit que le nombre de départ est un $\\textit{antécédent}$ du nombre qu'on trouve à la sortie.<br>";
	this.consigne += "Ces machines sont appelées $\\textit{fonctions}$, on a l'habitude de leur donner des noms $\\textit{f}$ ou $\\textit{g}$ ou $\\textit{h} \\ldots$";
	this.consigne += `<br>`;
	sortie_html ? this.spacing = 3 : this.spacing = 2;
	sortie_html ? this.spacing_corr = 2: this.spacing_corr = 1;
	this.nb_questions = 4;
	//this.correction_detaillee_disponible = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1;

	var num_ex = '3F1-act'; // pour rendre unique les id des SVG, en cas d'utilisation dans plusieurs exercices y faisant appel

	if (sortie_html) {		
		let id_unique = `_consigne_${num_ex}_${Date.now()}`; // on formatte avec le numéro de l'exercice pour éviter les doublons		
		let id_du_div = `div_svg${id_unique}`;
		var pourcentage = '100%'; // pour l'affichage des svg. On a besoin d'une variable globale
		var hauteur_svg = 100;

		this.consigne += `<div id="${id_du_div}" style="width: ${pourcentage}; height: ${hauteur_svg}px; display : table "></div>`;
		SVG_machine_maths(id_du_div,400,hauteur_svg,'machine\\,maths','---','Procédé','de\\,calcul','antécédent','x','image','y');
	} else { // sortie LaTeX
		// this.consigne += `machine Tikz HEX #F15929 équivaut à rgb(241,89,41)<br>`;
		this.consigne += tikz_machine_maths('maths','---',`Proc\\acute{e}d\\acute{e}`,'de\\,calcul',`ant\\acute{e}c\\acute{e}dent`,`\\textit{x}`,`image`,`\\textit{y}`);


	};
	this.nouvelle_version = function(numero_de_l_exercice){
		let type_de_questions;
		if (sortie_html) { // les boutons d'aide uniquement pour la version html
			this.bouton_aide = modal_pdf(numero_de_l_exercice,"pdf/FicheFonctions-3F1-act.pdf","Aide mémoire sur les fonctions (Sébastien Lozano)","Aide mémoire")		
			this.bouton_aide += modal_video('videoTest','videos/Fonctions.mp4','Petit conte mathématique','Intro Vidéo');
		}
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées

		let type_de_questions_disponibles = [1,2,3,4];
		//let type_de_questions_disponibles = [1];
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles,this.nb_questions);

			for (let i = 0, x,y,z, texte, texte_corr, cpt=0; i < this.nb_questions&&cpt<50;) {
				type_de_questions = liste_type_de_questions[i];
	
				let id_unique = `${num_ex}_${i}_${Date.now()}`
				let id_du_div = `div_svg${numero_de_l_exercice}${id_unique}`;
				//let id_du_div_corr = `div_svg_corr${numero_de_l_exercice}${id_unique}`;
	
				switch (type_de_questions) {
					case 1 : // périmètre d'un carré de côté x			
						var j = 0; // pour la sous-numérotation
						// question
						if (sortie_html){
							texte = `La $\\mathbf{machine\\,f}$ renvoie le `+katex_Popup(`périmètre`,`Rappel`,`Le périmètre d'un polygone est égal à la somme des longueurs de ses côtés`)+` d'un carré de côté $x$`;
						} else {
							texte = `La $\\mathbf{machine\\,f}$ renvoie le \\textbf{périmètre} \\footnote{\\textbf{Rappel :} Le périmètre d'un polygone est égal à la somme des longueurs de ses côtés} d'un carré de côté $x$`;
						}
						texte += `<br>`;
						// machine						
						x = randint(2,99);//augmenter les possibles pour éviter les questions déjà posées?	
						if (sortie_html) {
							//texte += `<br>`;
							texte += `<div id="${id_du_div}" style="width: ${pourcentage}"; height: ${hauteur_svg}px; display : table "></div>`;
							SVG_machine_maths(id_du_div,400,hauteur_svg,'machine \\, f','---','périmètre','d\'un \\, carré','carré \\, de','côté \\,'+x+' \\, cm','périmètre','??? \\, cm');							
						} else { // sortie Latex avec Tikz
							texte += tikz_machine_maths('f','---',`P\\acute{e}rim\\grave{e}tre`,`d'un\\,carr\\acute{e}`,`carr\\acute{e}\\,de`,`c\\hat{o}t\\acute{e}\\,${x}\\,cm`,`P\\acute{e}rim\\grave{e}tre`,`???\\,cm`);
						};
						// sous question a/						
						if (sortie_html){
							texte += num_alpha(j)+` Que renvoie la machine si le côté vaut  ${x}  cm ? Formuler la réponse `;
							texte += katex_Popup('avec le mot image','Image','La valeur du périmètre est l\'image de la valeur du côté')+`<br>`;
							texte_corr = num_alpha(j)+`Si le côté vaut ${x} cm alors la machine renvoie le périmètre d'un carré de côté ${x} cm, c'est à dire $${x}+${x}+${x}+${x} = 4\\times ${x} = ${4*x}$ cm.<br>`;
							texte_corr += `On dit que ${4*x} est l'image de ${x} par la fonction f.<br>`;						
							j++;//incrémente la sous question	
						} else { //sortie LaTeX
							texte += `\\begin{enumerate}[itemsep=1em]`;
							texte += `\\item Que renvoie la machine si le côté vaut  ${x}  cm ? Formuler la réponse avec le mot \\textbf{image} \\footnote{\\textbf{Image :} La valeur du périmètre est l\'image de la valeur du côté}`;														
							texte_corr =`\\begin{enumerate}[itemsep=1em]`;
							texte_corr += `\\item Si le côté vaut ${x} cm alors la machine renvoie le périmètre d'un carré de côté ${x} cm, c'est à dire $${x}+${x}+${x}+${x} = 4\\times ${x} = ${4*x}$ cm.<br>`;
							texte_corr += `On dit que ${4*x} est l'image de ${x} par la fonction f.`;						
						};
						// sous question b/	
						y = randint(2,99,[x]);//augmenter les possibles pour éviter les questions déjà posées?	
						if (sortie_html){
							texte += num_alpha(j)+` Combien vaut le côté si la machine renvoie  ${4*y} cm ? Formuler la réponse `;
							texte += katex_Popup('avec le mot antécédent','Antécédent','un antécédent de la valeur d\'un périmètre est une valeur du côté qui a pour image ce périmètre')+`<br>`;
							texte_corr += num_alpha(j)+`Si la machine renvoie un périmètre de ${4*y} cm alors le côté du carré vaut $${4*y}\\div 4 = ${y}$ cm.<br>`;
							texte_corr += `On dit que ${y} est <b>un</b> antécédent de ${4*y} par la fonction f.<br>`;						
							j++;//incrémente la sous question
						} else { //sortie LaTeX
							texte += `\\item Combien vaut la longueur du côté si la machine renvoie  ${4*y} cm ? Formuler la réponse avec le mot \\textbf{antécédent} \\footnote{\\textbf{Antécédent :} Un antécédent de la valeur d\'un périmètre est une valeur du côté qui a pour image ce périmètre}`;
							texte_corr += `\\item Si la machine renvoie un périmètre de ${4*y} cm alors le côté du carré vaut $${4*y}\\div 4 = ${y}$ cm.<br>`;
							texte_corr += `On dit que ${y} est <b>un</b> antécédent de ${4*y} par la fonction f.`;						
						};														
						// sous question c/
						z = randint(2,99,[x,y]);//augmenter les possibles pour éviter les questions déjà posées?						
						if (sortie_html){
							texte += num_alpha(j)+` Quelle est l'image de ${z} par la `; 
							texte += katex_Popup('fonction','Vocabulaire','<b>fonction</b> est le nom que l\'on donne à ces machines mathématiques');														
							texte += ` $f$ ? &Eacute;crire la réponse sous la forme `;
							texte += katex_Popup('$\\mathbf{f('+z+')=\\ldots}$','Notation','4 a pour image 16 par la fonction f peut s\'écrire <b>f(4)=16</b>')+`<br>`;
							texte_corr += num_alpha(j)+`L'image de ${z} par la fonction f vaut $f(${z})=4\\times ${z}=${4*z}$.<br>`;
							j++;//incrémente la sous question	
						} else { // sortie LaTeX
							texte += `\\item Quelle est l'image de ${z} par la \\textbf{fonction f} \\footnote{\\textbf{Vocabulaire :} \\textit{fonction} est le nom que l\'on donne à ces machines mathématiques}`;														
							texte += ` ? \\'{E}crire la réponse sous la forme $\\mathbf{f(${z})=\\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction f peut s\'écrire $\\mathbf{f(4)=16}$}`;
							texte_corr += `\\ item L'image de ${z} par la fonction f vaut $f(${z})=4\\times ${z}=${4*z}$.<br>`;		
						};
						// sous question d/
						if (sortie_html) {
							texte += num_alpha(j)+` Que renvoie la machine si le côté vaut $x$ cm ?<br>`;
							texte_corr += num_alpha(j)+`Si le côté vaut $x$ la machine renvoie $x+x+x+x$ ce qui est équivalent à $4\\times x$ .<br>`;
							j++;//incrémente la sous question	
 						} else { // sortie LaTeX
							texte += `\\item   Que renvoie la machine si le côté vaut $x$ cm ?<br>`;
							texte_corr += `\\item  Si le côté vaut $x$ la machine renvoie $x+x+x+x$ ce qui est équivalent à $4\\times x$ .<br>`;			
						};
						// sous question e/
						if (sortie_html) {
							texte += num_alpha(j)+` &Eacute;crire la réponse à la question `+num_alpha(j-1)+` sous forme de diagramme.<br>`;
							texte += `Voici le diagramme d'une machine qui triple `;
							texte += `<div id="diagramme_type1" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
							SVG_machine_diag('diagramme_type1',400,50,'f','x',[['\\times 3','3x']]);

							texte_corr += num_alpha(j)+`C'est une machine qui quadruple, donc sous forme de diagramme.<br>`;
							texte_corr += `<div id="diagramme_type1_corr" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
							SVG_machine_diag('diagramme_type1_corr',400,50,'f','x',[['\\times 4','4x']]);
							j++;//incrémente la sous question
						} else { // sortie LaTeX
							texte += `\\item   \\'{E}crire la réponse à la question d/ sous forme de diagramme.<br>`;
							texte += `Voici le diagramme d'une machine qui triple <br> `;
							texte += tikz_machine_diag(`f`,`x`,[[`\\times 3`,`3x`]]);
							texte_corr += `\\item  C'est une machine qui quadruple, donc sous forme de diagramme.<br>`;
							texte_corr += tikz_machine_diag(`f`,`x`,[[`\\times 4`,`4x`]]);
						};
						// sous question f/
						if (sortie_html) {
							texte += num_alpha(j)+` &Eacute;crire la réponse à la question `+num_alpha(j-2)+` sous la forme `;
							texte += katex_Popup('$\\mathbf{f(\\textbf{\\textit{x}})=\\ldots}$','Notation','4 a pour image 16 par la fonction f peut s\'écrire <b>f(4)=16</b>')+`<br>`;							
							texte_corr += num_alpha(j)+`L'image de $x$ par la fonction f vaut $4\\times x$ donc $f(x)=4\\times x$.<br>`;
							j++;//incrémente la sous question
						} else { // sortie LaTeX
							texte += `\\item   \\'{E}crire la réponse à la question d/ sous la forme $\\mathbf{f(\\textbf{\\textit{x}})=\\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction f peut s\'écrire $\\mathbf{f(4)=16}$}`;							
							texte_corr += `\\item  L'image de $x$ par la fonction f vaut $4\\times x$ donc $f(x)=4\\times x$.<br>`;		
						};
						// sous question g/
						if (sortie_html){
							texte += num_alpha(j)+` En utilisant la forme `;
							texte += katex_Popup('$\\mathbf{f:\\textbf{\\textit{x}}\\longmapsto \\ldots}$','Notation','4 a pour image 16 par la fonction f peut s\'écrire $\\mathbf{f:4\\longmapsto 16}$');							
							texte+=  `écrire la réponse à la question `+num_alpha(j-3)+`<br>`;
							texte_corr += num_alpha(j)+`L'image de $x$ par la fonction f vaut $4\\times x$ donc $f:x\\longmapsto 4\\times x$.<br>`;												
							j++;//incrémente la sous question
						} else { // sortie LaTeX
							texte += `\\item   En utilisant la forme $\\mathbf{f:\\textbf{\\textit{x}}\\longmapsto \\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction f peut s\'écrire $\\mathbf{f:4\\longmapsto 16}$},`;							
							texte+= ` écrire la réponse à la question d/`;
							texte_corr += `\\item  L'image de $x$ par la fonction f vaut $4\\times x$ donc $f:x\\longmapsto 4\\times x$.`;	
							texte += `\\end{enumerate}`;
							texte_corr += `\\end{enumerate}`;							
						};
						break;			
					case 2 : // aire d'un carré de côté x
						var j = 0; // pour la sous-numérotation
						if (sortie_html) {
							texte = `La $\\textbf{machine\\,g}$ renvoie `+katex_Popup('l\'aire','Rappel','L\'aire d\'un carré est égale au produit de la longueur de son côté par lui-même.')+` d'un carré de côté $x$`;			
						} else {
							texte = `La $\\textbf{machine\\,g}$ renvoie \\textbf{l\'aire} \\footnote{\\textbf{Rappel :} L\'aire d\'un carré est égale au produit de la longueur de son côté par lui-même.} d'un carré de côté $x$`;			
						}
						texte += `<br>`;
						// machine
						x = randint(2,99);//augmenter les possibles pour éviter les questions déjà posées?	
						if (sortie_html) {
							//texte += `<br>`;
							texte += `<div id="${id_du_div}" style="width: ${pourcentage}"; height: ${hauteur_svg}px; display : table "></div>`;
							SVG_machine_maths(id_du_div,400,hauteur_svg,'machine\\,g','---','aire','d\'un \\, carré','carré \\, de','côté \\, '+x+'\\, cm','aire','??? \\, cm^2');							
						} else { // sortie Latex avec Tikz
							//texte += `figure Tikz<br>`;
							texte += tikz_machine_maths('g','---',`Aire`,`d'un\\,carr\\acute{e}`,`carr\\acute{e}\\,de`,`c\\hat{o}t\\acute{e}\\,${x}\\,cm`,`Aire`,`???\\,cm^2`);
						};
						// sous question a/	
						if (sortie_html){
							texte += num_alpha(j)+` Que renvoie la machine si le côté vaut  ${x}  cm ? Formuler la réponse `;
							texte += katex_Popup('avec le mot image','Image','la valeur de l\'aire est l\'image de la valeur du côté')+`<br>`;
							texte_corr = num_alpha(j)+`Si le côté vaut ${x} cm alors la machine renvoie l'aire d'un carré de côté ${x} cm, c'est à dire $${x}\\times ${x}=${x*x}\\,cm^2$.<br>`;
							texte_corr += `On dit que ${x*x} est l'image de ${x} par la fonction g.<br>`;						
							j++;//incrémente la sous question
						} else { //sortie LaTeX
							texte += `\\begin{enumerate}[itemsep=1em]`;
							texte += `\\item  Que renvoie la machine si le côté vaut  ${x}  cm ? Formuler la réponse `;
							texte += `avec le mot \\textbf{image} \\footnote{\\textbf{Image :} La valeur de l\'aire est l\'image de la valeur du côté.}<br>`;
							texte_corr = `\\begin{enumerate}[itemsep=1em]`;
							texte_corr += `\\item Si le côté vaut ${x} cm alors la machine renvoie l'aire d'un carré de côté ${x} cm, c'est à dire $${x}\\times ${x}=${x*x}\\,cm^2$.<br>`;
							texte_corr += `On dit que ${x*x} est l'image de ${x} par la fonction g.<br>`;									
						};
						
						// sous question b/	
						y = randint(2,99,[x]);//augmenter les possibles pour éviter les questions déjà posées?	
						if (sortie_html){
							texte += num_alpha(j)+` Combien vaut le côté si la machine renvoie  ${y*y} cm<sup>2</sup> ? Formuler la réponse `;
							texte += katex_Popup('avec le mot antécédent','Antécédent','un antécédent de la valeur d\'une aire est une valeur du côté qui a pour image cette aire')+`<br>`;
							texte_corr += num_alpha(j)+`Si la machine renvoie une aire de $${y*y}\\,cm^2$ alors le côté du carré vaut $\\sqrt{${y*y}}=${y}\\,cm$.<br>`;
							texte_corr += `On dit que ${y} est <b>un</b> antécédent de ${y*y} par la fonction g.<br>`;						
							j++;//incrémente la sous question	
						} else { //sortie LaTeX
							texte += `\\item  Combien vaut la longueur du côté si la machine renvoie  ${y*y} $cm^2$ ? Formuler la réponse `;
							texte += `avec le mot \\textbf{antécédent} \\footnote{\\textbf{Antécédent :} Un antécédent de la valeur d\'une aire est une valeur du côté qui a pour image cette aire}<br>`;
							texte_corr += `\\item Si la machine renvoie une aire de $${y*y}\\,cm^2$ alors le côté du carré vaut $\\sqrt{${y*y}}=${y}\\,cm$.<br>`;
							texte_corr += `On dit que ${y} est <b>un</b> antécédent de ${y*y} par la fonction g.<br>`;						
						};														
						
						// sous question c/
						z = randint(2,99,[x,y]);//augmenter les possibles pour éviter les questions déjà posées?							
						if (sortie_html){
							texte += num_alpha(j)+` Quelle est l'image de ${z} par la `; 
							texte += katex_Popup('fonction','Vocabulaire','<b>fonction</b> est le nom que l\'on donne à ces machines mathématiques');														
							texte += ` $g$ ? &Eacute;crire la réponse sous la forme `;
							texte += katex_Popup('$\\mathbf{g('+z+')=\\ldots}$','Notation','4 a pour image 16 par la fonction g peut s\'écrire <b>g(4)=16</b>')+`<br>`;
							texte_corr += num_alpha(j)+`L'image de ${z} par la fonction g vaut $g(${z})=${z}\\times ${z}=${z*z}$.<br>`;
							j++;//incrémente la sous question
						} else { // sortie LaTeX
							texte += `\\item  Quelle est l'image de ${z} par la `; 
							texte += `\\textbf{fonction g} \\footnote{\\textbf{Vocabulaire :} \\textit{fonction} est le nom que l\'on donne à ces machines mathématiques.}`;														
							texte += ` ? \\'{E}crire la réponse sous la forme `;
							texte += `$\\mathbf{g(${z})=\\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction g peut s\'écrire \\textbf{g(4)=16}}<br>`;
							texte_corr += `\\item L'image de ${z} par la fonction g vaut $g(${z})=${z}\\times ${z}=${z*z}$.<br>`;
						};
						
						// sous question d/
						if (sortie_html) {
							texte += num_alpha(j)+` Que renvoie la machine si le côté vaut $x$ cm ?<br>`;
							texte_corr += num_alpha(j)+`Si le côté vaut $x$ la machine renvoie $x\\times x$ ce qui est équivalent à $x^2$ .<br>`;
							j++;//incrémente la sous question	
						} else {
							texte += `\\item  Que renvoie la machine si le côté vaut $x$ cm ?<br>`;
							texte_corr += `\\item Si le côté vaut $x$ la machine renvoie $x\\times x$ ce qui est équivalent à $x^2$ .<br>`;
						};

						// sous question e/
						if (sortie_html) {
							texte += num_alpha(j)+` &Eacute;crire la réponse à la question `+num_alpha(j-1)+` sous forme de diagramme.<br>`;
							texte += `Voici le diagramme d'une machine qui double `;
							texte += `<div id="diagramme_type2" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
							SVG_machine_diag('diagramme_type2',400,50,'g','x',[['\\times 2','2x']]);
							texte_corr += num_alpha(j)+`C'est une machine qui multiplie un nombre par lui-même, donc sous forme de diagramme.<br>`;
							texte_corr += `<div id="diagramme_type2_corr" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
							SVG_machine_diag('diagramme_type2_corr',400,50,'g','x',[['\\times x','x\\times x=x^{\\tiny 2}']]);
							j++;//incrémente la sous question
						} else {
							texte += `\\item  \\'{E}crire la réponse à la question d/ sous forme de diagramme.<br>`;
							texte += `Voici le diagramme d'une machine qui double <br>`;
							texte += tikz_machine_diag(`g`,`x`,[[`\\times 2`,`2x`]]);
							// texte += `<div id="diagramme_type2" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
							// SVG_machine_diag('diagramme_type2',400,50,'g','x',[['\\times 2','2x']]);

							texte_corr += `\\item C'est une machine qui multiplie un nombre par lui-même, donc sous forme de diagramme.<br>`;
							texte_corr += tikz_machine_diag(`g`,`x`,[[`\\times x`,`x^2`]]);
						};

						// sous question f/
						if (sortie_html){
							texte += num_alpha(j)+` &Eacute;crire la réponse à la question `+num_alpha(j-2)+` sous la forme `;
							texte += katex_Popup('$\\mathbf{g(\\textbf{\\textit{x}})=\\ldots}$','Notation','4 a pour image 16 par la fonction g peut s\'écrire <b>g(4)=16</b>')+`<br>`;							
							texte_corr += num_alpha(j)+`L'image de $x$ par la fonction g vaut $x\\times x = x^2$ donc $g(x)=x\\times x=x^2$.<br>`;
							j++;//incrémente la sous question
						} else { // sortie LaTeX
							texte += `\\item  \\'{E}crire la réponse à la question d/ sous la forme `;
							texte += `$\\mathbf{g(\\textbf{\\textit{x}})=\\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction g peut s\'écrire \\textbf{g(4)=16}}<br>`;							
							texte_corr += `\\item L'image de $x$ par la fonction g vaut $x\\times x = x^2$ donc $g(x)=x\\times x=x^2$.<br>`;
						};

						// sous question g/
						if (sortie_html){							
							texte += num_alpha(j)+` En utilisant la forme `;
							texte += katex_Popup('$\\mathbf{g:\\textbf{\\textit{x}} \\longmapsto \\ldots}$','Notation','4 a pour image 16 par la fonction g peut s\'écrire $\\mathbf{g:4\\longmapsto 16}$');							
							texte+= ` écrire la réponse à la question `+num_alpha(j-3)+`<br>`;
							texte_corr += num_alpha(j)+`L'image de $x$ par la fonction g vaut $x\\times x=x^2$ donc $g:x\\longmapsto x\\times x=x^2$.<br>`;												
							j++;//incrémente la sous question
						} else { // sortie LaTeX
							texte += `\\item  En utilisant la forme `;
							texte += `$\\mathbf{g:\\textbf{\\textit{x}} \\longmapsto \\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction g peut s\'écrire $\\mathbf{g:4\\longmapsto 16}$'}`;							
							texte+= ` écrire la réponse à la question d/ <br>`;
							texte_corr += `\\item L'image de $x$ par la fonction g vaut $x\\times x=x^2$ donc $g:x\\longmapsto x\\times x=x^2$.<br>`;												
							texte += `\\end{enumerate}`;
							texte_corr += `\\end{enumerate}`;
						};						
						break;			
					case 3 : // somme de 1 et du triple de x
						var j = 0; // pour la sous-numérotation
						// consigne
						texte = `La $\\mathbf{machine\\,h}$ renvoie la somme du triple de du nombre de départ et de 1.`;						
						texte += `<br>`;
						// machine
						x = randint(2,99);//augmenter les possibles pour éviter les questions déjà posées?	
						if (sortie_html) {
							//texte += `<br>`;
							texte += `<div id="${id_du_div}" style="width: ${pourcentage}"; height: ${hauteur_svg}px; display : table "></div>`;
							SVG_machine_maths(id_du_div,400,hauteur_svg,'machine \\, h','---','multiplier \\, par \\, 3','ajouter \\, 1','nombre \\, de','départ \\, '+x,'nombre \\, de','sortie \\, ?');
						} else { // sortie Latex avec Tikz
							texte += tikz_machine_maths('h','---',`Multiplier\\,par\\,3`,`Ajouter\\,1`,`nombre\\,de`,`d\\acute{e}part\\,${x}`,`nombre\\,de`,`sortie\\,?`);
						};

						// sous question a/
						if (sortie_html){
							texte += num_alpha(j)+` Que renvoie la machine si le nombre de départ vaut  ${x} ? Formuler la réponse `;
							texte += katex_Popup('avec le mot image','Image','l\'image de la valeur à la sortie de la machine')+`<br>`;
							texte_corr = num_alpha(j)+`Si le nombre de départ vaut ${x} alors la machine renvoie $3\\times${x} + 1 = ${3*x+1}$<br>`;
							texte_corr += `On dit que ${3*x+1} est l'image de ${x} par la fonction g.<br>`;						
							j++;//incrémente la sous question
						} else { //sortie LaTeX
							texte += `\\begin{enumerate}[itemsep=1em]`;
							texte += `\\item  Que renvoie la machine si le nombre de départ vaut  ${x} ? Formuler la réponse `;
							texte += `avec le mot \\textbf{image} \\footnote{\\textbf{Image :} L\'image de la valeur à la sortie de la machine.}<br>`;
							texte_corr = `\\begin{enumerate}[itemsep=1em]`;
							texte_corr += `\\item Si le nombre de départ vaut ${x} alors la machine renvoie $3\\times${x} + 1 = ${3*x+1}$<br>`;
							texte_corr += `On dit que ${3*x+1} est l'image de ${x} par la fonction g.<br>`;						
						};

						// sous question b/
						y = randint(2,99,[x]);//augmenter les possibles pour éviter les questions déjà posées?	
						if (sortie_html){
							texte += num_alpha(j)+` Combien vaut le nombre de départ si la machine renvoie  ${3*y+1} ? Formuler la réponse `;
							texte += katex_Popup('avec le mot antécédent','Antécédent','un antécédent d\'une valeur de sortie est une valeur du nombre de départ dont l\'image est ce nombre de sortie')+`<br>`;
							texte_corr += num_alpha(j)+`Si la machine renvoie $${3*y+1}$ alors le nombre de départ vaut $(${3*y+1}-1)\\div 3=${y}$<br>`;
							texte_corr += `On dit que ${y} est <b>un</b> antécédent de ${3*y+1} par la fonction g.<br>`;						
							j++;//incrémente la sous question
						} else { //sortie LaTeX
							texte += `\\item  Combien vaut le nombre de départ si la machine renvoie  ${3*y+1} ? Formuler la réponse `;
							texte += `avec le mot \\textbf{antécédent} \\footnote{\\textbf{Antécédent :} Un antécédent d\'une valeur de sortie est une valeur du nombre de départ dont l\'image est ce nombre de sortie.}<br>`;
							texte_corr += `\\item Si la machine renvoie $${3*y+1}$ alors le nombre de départ vaut $(${3*y+1}-1)\\div 3=${y}$<br>`;
							texte_corr += `On dit que ${y} est \\textbf{un} antécédent de ${3*y+1} par la fonction g.<br>`;						
						};														

						// sous question c/
						z = randint(2,99,[x,y]);//augmenter les possibles pour éviter les questions déjà posées?	
						if (sortie_html){
							texte += num_alpha(j)+` Quelle est l'image de ${-z} par la `; 
							texte += katex_Popup('fonction','Vocabulaire','<b>fonction</b> est le nom que l\'on donne à ces machines mathématiques');														
							texte += ` $h$ ? &Eacute;crire la réponse sous la forme `;
							texte += katex_Popup('$\\mathbf{h('+(-z)+')=\\ldots}$','Notation','4 a pour image 16 par la fonction h peut s\'écrire <b>h(4)=16</b>')+`<br>`;
							texte_corr += num_alpha(j)+`L'image de ${-z} par la fonction h vaut $h(${-z})=3\\times (${-z})+1=${-3*z+1}$.<br>`;
							j++;//incrémente la sous question
						} else { // sortie LaTeX
							texte += `\\item  Quelle est l'image de ${-z} par la `; 
							texte += `\\textbf{fonction h} \\footnote{\\textbf{Vocabulaire :} \\textit{fonction} est le nom que l\'on donne à ces machines mathématiques}`;														
							texte += ` ? \\'{E}crire la réponse sous la forme `;
							texte += `$\\mathbf{h(${-z})=\\ldots}$ \\footnote{\\textbf{Notation : } 4 a pour image 16 par la fonction h peut s\'écrire \\textbf{h(4)=16}}<br>`;
							texte_corr += `\\item L'image de ${-z} par la fonction h vaut $h(${-z})=3\\times (${-z})+1=${-3*z+1}$.<br>`;
						};

						// sous question d/
						if (sortie_html) {
							texte += num_alpha(j)+` Que renvoie la machine si le côté vaut $x$ ?<br>`;
							texte_corr += num_alpha(j)+`Si le côté vaut $x$ la machine renvoie $3\\times x + 1$ ce qui est équivalent à $3x + 1$ .<br>`;
							j++;//incrémente la sous question
						} else { // sortie LaTeX
							texte += `\\item  Que renvoie la machine si le côté vaut $x$ ?<br>`;
							texte_corr += `\\item Si le côté vaut $x$ la machine renvoie $3\\times x + 1$ ce qui est équivalent à $3x + 1$ .<br>`;
							j++;//incrémente la sous question
						};

						// sous question e/
						if (sortie_html) {
							texte += num_alpha(j)+` &Eacute;crire la réponse à la question `+num_alpha(j-1)+` sous forme de diagramme.<br>`;
							texte += `Voici le diagramme d'une machine qui double puis qui ajoute 5 `;
							texte += `<div id="diagramme_type3" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
							SVG_machine_diag('diagramme_type3',400,50,'h','x',[['\\times 2','2x'],['+5','2x+5']]);

							texte_corr += num_alpha(j)+`C'est une machine qui triple un nombre et ajoute 1, donc sous forme de diagramme.<br>`;
							texte_corr += `<div id="diagramme_type3_corr" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
							SVG_machine_diag('diagramme_type3_corr',400,50,'h','x',[['\\times 3','3x'],['+1','3x+1']]);
							j++;//incrémente la sous question
						} else {
							texte += `\\item  \\'{E}crire la réponse à la question d/ sous forme de diagramme.<br>`;
							texte += `Voici le diagramme d'une machine qui double puis qui ajoute 5 <br>`;
							texte += tikz_machine_diag(`h`,`x`,[[`\\times 2`,`2x`],[`+5`,`2x+5`]]);
							texte_corr += `\\item C'est une machine qui triple un nombre et ajoute 1, donc sous forme de diagramme.<br>`;
							texte_corr += tikz_machine_diag(`h`,`x`,[[`\\times 3`,`3x`],[`+1`,`3x+1`]]);
						};

						// sous question f/
						if (sortie_html){
							texte += num_alpha(j)+` &Eacute;crire la réponse à la question `+num_alpha(j-2)+` sous la forme `;
							texte += katex_Popup('$\\mathbf{h(\\textbf{\\textit{x}})=\\ldots}$','Notation','4 a pour image 16 par la fonction h peut s\'écrire <b>h(4)=16</b>')+`<br>`;							
							texte_corr += num_alpha(j)+`L'image de $x$ par la fonction h vaut $3\\times x + 1 = 3x + 1$ donc $h(x)=3\\times x + 1$ soit $h(x) = 3x + 1$.<br>`;
							j++;//incrémente la sous question
						} else { // sortie LaTeX
							texte += `\\item  \\'{E}crire la réponse à la question d/ sous la forme `;
							texte += `$\\mathbf{h(\\textbf{\\textit{x}})=\\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction h peut s\'écrire \\textbf{h(4)=16}}<br>`;							
							texte_corr += `\\item L'image de $x$ par la fonction h vaut $3\\times x + 1 = 3x + 1$ donc $h(x)=3\\times x + 1$ soit $h(x) = 3x + 1$.<br>`;
						};
						
						// sous question g/
						if (sortie_html){							
							texte += num_alpha(j)+` En utilisant la forme `;
							texte += katex_Popup('$\\mathbf{h:\\textbf{\\textit{x}} \\longmapsto \\ldots}$','Notation','4 a pour image 16 par la fonction h peut s\'écrire $\\mathbf{h:4\\longmapsto16}$');
							texte+= ` écrire la réponse à la question `+num_alpha(j-3)+`<br>`;
							texte_corr += num_alpha(j)+`L'image de $x$ par la fonction h vaut $3\\times x +1= 3x + 1$ donc $h : x \\longmapsto 3\\times x + 1$ soit $h : x \\longmapsto 3x + 1$.<br>`;												
							j++;//incrémente la sous question
						} else { // sortie LaTeX
							texte += `\\item  En utilisant la forme `;
							texte += `$\\mathbf{h:\\textbf{\\textit{x}} \\longmapsto \\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction h peut s\'écrire $\\mathbf{h:4\\longmapsto16}$}`;
							texte+= ` écrire la réponse à la question d/<br>`;
							texte_corr += `\\item L'image de $x$ par la fonction h vaut $3\\times x +1= 3x + 1$ donc $h : x \\longmapsto 3\\times x + 1$ soit $h : x \\longmapsto 3x + 1$.<br>`;												
							texte += `\\end{enumerate}`;
							texte_corr += `\\end{enumerate}`;
						};						
						break;
					case 4 : // nombre de diviseurs de x entier
						var j = 0; // pour la sous-numérotation
						// consigne
						texte = `La $\\mathbf{machine\\,d}$, qui n'accepte que des nombres entiers positifs, renvoie le nombre de diviseurs du nombre de départ.`;
						texte += `<br>`;
						// machine
						x = randint(2,51);//augmenter les possibles pour éviter les questions déjà posées?						
						if (sortie_html) {
							//texte += `<br>`;
							texte += `<div id="${id_du_div}" style="width: ${pourcentage}"; height: ${hauteur_svg}px; display : table "></div>`;
							SVG_machine_maths(id_du_div,400,hauteur_svg,'machine \\, d','---','nombre \\enspace total','de  \\, diviseurs','nombre \\, de','départ \\,'+x,'nombre \\, de',' diviseurs');														
						} else { // sortie Latex avec Tikz
							//texte += `figure Tikz<br>`;
							texte += tikz_machine_maths('d','---',`nombre \\, total`,`de \\, diviseurs`,`nombre\\,de`,`d\\acute{e}part\\,${x}`,`nombre \\, de`,`diviseurs`);
						};
						// sous question a/
						if (sortie_html) {
							texte += num_alpha(j)+` Que renvoie la machine si le nombre de départ vaut  ${x} ? Formuler la réponse `;
							texte += katex_Popup('avec le mot image','Image','l\'image de la valeur à la sortie de la machine')+`<br>`;
							texte_corr = num_alpha(j)+`Pour trouver la liste des diviseurs de ${x} on cherche tous les produits de deux facteurs qui donnent ${x}<br>`;
							j++;//incrémente la sous question
						} else { //sortie LaTeX
							texte += `\\begin{enumerate}[itemsep=1em]`;
							texte += `\\item Que renvoie la machine si le nombre de départ vaut  ${x} ? Formuler la réponse `;
							texte += `avec le mot \\textbf{image} \\footnote{\\textbf{Image : } L\'image de la valeur à la sortie de la machine}<br>`;
							texte_corr = `\\begin{enumerate}[itemsep=1em]`;
							texte_corr += `\\item Pour trouver la liste des diviseurs de ${x} on cherche tous les produits de deux facteurs qui donnent ${x}<br>`;
						};
						if (liste_diviseurs(x).length%2==0) {//si il y a un nombre pair de diviseurs
							for (let m = 0; m<(liste_diviseurs(x).length/2); m++){
								texte_corr += `$`+liste_diviseurs(x)[m]+`\\times`+liste_diviseurs(x)[(liste_diviseurs(x).length-m-1)]+`$<br>`;
							};
						} else {
							for (let m = 0; m<((liste_diviseurs(x).length-1)/2); m++){
								texte_corr += `$`+liste_diviseurs(x)[m]+`\\times`+liste_diviseurs(x)[(liste_diviseurs(x).length-m-1)]+`$<br>`;
							};
							texte_corr += `$`+liste_diviseurs(x)[(liste_diviseurs(x).length-1)/2]+`\\times`+liste_diviseurs(x)[(liste_diviseurs(x).length-1)/2]+`$<br>`;
						};
						texte_corr += `Chacun des facteurs de la liste ci-dessus est un diviseur de ${x}<br>`;
						texte_corr += `La liste des diviseurs de ${x} est donc `+liste_diviseurs(x)+`; Cette liste compte `+liste_diviseurs(x).length+` nombres. <br>`;
						texte_corr += `Donc `+liste_diviseurs(x).length+` est l'image de ${x} par la fonction d.<br>`;	
					
						// sous question b/
						x = randint(1,9);//augmenter les possibles pour éviter les questions déjà posées?
						if (sortie_html) {
							texte += num_alpha(j)+` Quelle est une valeur possible du nombre de départ si la machine renvoie  2 ?<br>`;
							texte_corr += num_alpha(j)+`Si la machine renvoie 2 alors le nombre de départ  a exactement 2 diviseurs, tous les`;
							texte_corr += katex_Popup('nombres premiers','Nombre premier','Un nombre entier est un <b>nombre premier</b> si il a exactement deux diviseurs, 1 et lui-même.');					
						 	texte_corr += `conviennent.<br>`;
						 	texte_corr += `2 est premier donc 2 est <b>un</b> antécédent de 2 par la fonction d.<br>`;						
						 	texte_corr += `7 est premier donc 7 est <b>un autre</b> antécédent de 2 par la fonction d.<br>`;	
						 	j++;//incrémente la sous question
						} else {
						 	texte += `\\item Quelle est une valeur possible du nombre de départ si la machine renvoie  2 ?<br>`;
						 	texte_corr += ` \\item Si la machine renvoie 2 alors le nombre de départ  a exactement 2 diviseurs, tous les`;
						 	texte_corr += `\\textbf{nombres premiers} \\footnote{\\textbf{Nombre premier :} Un nombre entier est un \\textbf{nombre premier} si il a exactement deux diviseurs, 1 et lui-même.}`;
							texte_corr += `conviennent.<br>`;
							texte_corr += `2 est premier donc 2 est \\textbf{un} antécédent de 2 par la fonction d.<br>`;						
						 	texte_corr += `7 est premier donc 7 est \\textbf{un autre} antécédent de 2 par la fonction d.<br>`;	
						};				
				
						// sous question c/
						x = randint(51,99);//augmenter les possibles pour éviter les questions déjà posées?	
						if (sortie_html){
						 	texte += num_alpha(j)+` Quelle est l'image de ${x} par la `; 
						 	texte += katex_Popup('fonction','Vocabulaire','<b>fonction</b> est le nom que l\'on donne à ces machines mathématiques');														
						 	texte += ` $d$ ? &Eacute;crire la réponse sous la forme `;
						 	texte += katex_Popup('$\\mathbf{d('+(x)+')=\\ldots}$','Notation','4 a pour image 16 par la fonction d peut s\'écrire <b>d(4)=16</b>')+`<br>`;
						 	texte_corr += num_alpha(j)+`Pour trouver l'image de ${x} on peut par exemple chercher tous ses diviseurs et les compter<br>`;
							j++;//incrémente la sous question
						} else { // sortie LaTeX
							texte += `\\item Quelle est l'image de ${x} par la `; 
							texte += `\\textbf{fonction d} \\footnote{\\textbf{Vocabulaire :} \\textit{fonction} est le nom que l\'on donne à ces machines mathématiques.}`;														
							texte += ` ? \\'{E}crire la réponse sous la forme `;
							texte += `$\\mathbf{d('+(x)+')=\\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction d peut s\'écrire \\textbf{d(4)=16}}<br>`;
							texte_corr += `\\item Pour trouver l'image de ${x} on peut par exemple chercher tous ses diviseurs et les compter<br>`;
						};
						if (liste_diviseurs(x).length%2==0) {//si il y a un nombre pair de diviseurs
							for (let m = 0; m<(liste_diviseurs(x).length/2); m++){
								texte_corr += `$`+liste_diviseurs(x)[m]+`\\times`+liste_diviseurs(x)[(liste_diviseurs(x).length-m-1)]+`$<br>`;
							};
						} else {
							for (let m = 0; m<((liste_diviseurs(x).length-1)/2); m++){
							   texte_corr += `$`+liste_diviseurs(x)[m]+`\\times`+liste_diviseurs(x)[(liste_diviseurs(x).length-m-1)]+`$<br>`;
						   };
						   texte_corr += `$`+liste_diviseurs(x)[(liste_diviseurs(x).length-1)/2]+`\\times`+liste_diviseurs(x)[(liste_diviseurs(x).length-1)/2]+`$<br>`;
					   };
					   texte_corr += `La liste des diviseurs de ${x} est donc `+liste_diviseurs(x)+`; Cette liste compte `+liste_diviseurs(x).length+` nombres.<br>`;
					   texte_corr += `Donc `+liste_diviseurs(x).length+` est l'image de ${x} par la fonction d.<br>`;	

						// sous question d/
						if (sortie_html) {
							texte += num_alpha(j)+` Peut-on trouver deux antécédents de 3 par la fonction d ?<br>`;
							texte_corr += num_alpha(j)+`Il faut trouver des nombres qui ont exactement 3 diviseurs.<br>`;
							j++;//incrémente la sous question
						} else {
							texte += `\\item  Peut-on trouver deux antécédents de 3 par la fonction d ?<br>`;
							texte_corr += `\\item Il faut trouver des nombres qui ont exactement 3 diviseurs.<br>`;
						}	
						texte_corr += `La liste des diviseurs de 9 est `+liste_diviseurs(9)+`; Cette liste compte `+liste_diviseurs(9).length+` nombres, `;
						texte_corr += `donc 9 est un antécédent de 3 par la fonction d.<br>`;
						texte_corr += `La liste des diviseurs de 25 est `+liste_diviseurs(25)+`; Cette liste compte `+liste_diviseurs(25).length+` nombres, `;
						texte_corr += `donc 25 est un antécédent de 3 par la fonction d.<br>`;
						texte_corr += `Tu peux en trouver d'autres, qu'ont ils de commun ?`
						if (!sortie_html) {
							texte += `\\end{enumerate}`;
							texte_corr += `\\end{enumerate}`;						
						};
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
};

/**
 * 3F12 Notion de fonction - Vocabulaire
 * Déterminer à partir de plusieurs modes de représentation l'image d'un nombre
 * @author Sébastien LOZANO
 */

 function fonctions_calculs_d_images() {
	 'use strict';
	 Exercice.call(this); // Héritage de la classe Exercice()
	 this.sup = 1 ; 
	 this.titre = "Fonctions : Calculs d'images"; 
	 // pas de différence entre la version html et la version latex pour la consigne
	 this.consigne =`Calcule les images avec la méthode demandée.`;

	 sortie_html ? this.spacing = 3 : this.spacing = 2;
	 sortie_html ? this.spacing_corr = 2: this.spacing_corr = 1;
	 this.nb_questions = 4;
	 //this.correction_detaillee_disponible = true;
	 this.nb_cols = 1;
	 this.nb_cols_corr = 1;
	 this.sup = 5;
 
	 var num_ex = '3F12'; // pour rendre unique les id des SVG, en cas d'utilisation dans plusieurs exercices y faisant appel

	 if (sortie_html) {		
		 let id_unique = `_consigne_${num_ex}_${Date.now()}`; // on formatte avec le numéro de l'exercice pour éviter les doublons		
		 let id_du_div = `div_svg${id_unique}`;
		 var pourcentage = '100%'; // pour l'affichage des svg. On a besoin d'une variable globale
		 var hauteur_svg = 100;
	 } else { // sortie LaTeX
 
	 };
	 this.nouvelle_version = function(numero_de_l_exercice){
		 let type_de_questions;
		 if (sortie_html) { // les boutons d'aide uniquement pour la version html
//			 this.bouton_aide = modal_pdf(numero_de_l_exercice,"pdf/FicheFonctions-3F1-act.pdf","Aide mémoire sur les fonctions (Sébastien Lozano)","Aide mémoire")		
//			 this.bouton_aide += modal_video('videoTest','videos/Fonctions.mp4','Petit conte mathématique','Intro Vidéo');
		 }
		 this.liste_questions = []; // Liste de questions
		 this.liste_corrections = []; // Liste de questions corrigées
 
		 let type_de_questions_disponibles = [];
		 if (this.sup==1){
			type_de_questions_disponibles = [1]; // prog de calcul
		} else if (this.sup==2){
			type_de_questions_disponibles = [2]; // diagramme
		} else if (this.sup==3){
			type_de_questions_disponibles = [3]; // f(x) = ...
		} else if (this.sup==4){
			type_de_questions_disponibles = [4]; // f : x ---> ...
		} else if (this.sup==5){
			type_de_questions_disponibles = [1,2,3,4]; // mélange
		};
		 //let type_de_questions_disponibles = [1];
		 let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles,this.nb_questions);
 
			 for (let i = 0, a,b,c,texte, texte_corr, cpt=0; i < this.nb_questions&&cpt<50;) {
				 type_de_questions = liste_type_de_questions[i];
	 
				 let id_unique = `${num_ex}_${i}_${Date.now()}`
				 let id_du_div = `div_svg${numero_de_l_exercice}${id_unique}`;
				 let id_du_div_corr = `div_svg_corr${numero_de_l_exercice}${id_unique}`;
				 // on part sur de l'affine avec coeff positifs, on verra ensuite
				 a = randint(2,9); 
				 b = randint(2,9);
				 c = randint(2,9);
	 
				 switch (type_de_questions) {
					case 1 :
						var j = 0; // pour la sous-numérotation
						texte = `On donne le programme de calcul suivant qui correspond à une certaine fonction :`;
						texte_corr =`Avec ce programme de calcul :`
						if (sortie_html) {
							texte +=`
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
							texte += num_alpha(j)+` Appliquer ce programme de calcul au nombre ${c}<br>`;
							texte_corr +=`<br>`+num_alpha(j)+`
							<br>
							<div class="ui compact warning message">		
							<p>							
							- On choisit le nombre ${c}<br>
							- On multiplie ce nombre par ${a} : ${a}$\\times$ ${c} = ${a*c}<br>
							- On ajoute ${b} au résultat obtenu : ${a*c}+${b}=${a*c+b}<br>
							</p>
							</div>
							<br>							
							`;
							j++;
							// sous-question b/
							texte += num_alpha(j)+` Traduire ce calcul par une phrase contenant le mot image`;
							texte_corr += num_alpha(j)+`L'image de ${c} par cette fonction vaut ${a*c+b}`;
							texte_corr += `<br> On peut aussi dire que ${a*c+b} est l'image de ${c} par cette fonction`;
						} else {
							 texte += tex_cadre_par_orange(itemize([`Choisir un nombre`,`Multiplier ce nombre par ${a}`,`Ajouter ${b} au résultat obtenu`]));							
							// sous-question a/
							texte += tex_enumerate([`Appliquer ce programme de calcul au nombre ${c}`,`Traduire ce calcul par une phrase contenant le mot image`],this.spacing);
							//texte_corr += 
							texte_corr += tex_enumerate([tex_cadre_par_orange(itemize([`On choisit le nombre ${c}`,`On multiplie ce nombre par ${a} : $${a} \\times ${c} = ${a*c}$ `,`On ajoute ${b} au résultat obtenu : $${a*c}+${b}=${a*c+b}$`])),`L'image de ${c} par cette fonction vaut ${a*c+b}<br>On peut aussi dire que ${a*c+b} est l'image de ${c} par cette fonction`],this.spacing);							
						};			
						break;
					case 2 :
						var j = 0; // pour la sous-numérotation
						// les variables a,b,c changent sans refaire un appel à randint
						texte = `Soit $f$ la fonction définie par l'expression algébrique $f(x)=$ ${a}$x+$${b}<br>`;
						if (sortie_html) {
							// sous-question a/
							texte += num_alpha(j)+` Calculer l'image de ${c}`;
							texte +=`<br>`;
							texte_corr = num_alpha(j)+` Calculons l'image par $f$ de $x=$ ${c} :`;
							texte_corr += `<br>$f(x)=$ ${a}$x+$${b}`;
							texte_corr += `<br>$f($${c}$)=$ ${a}$\\times$${c}$+$${b}`;
							texte_corr += `<br>$f($${c}$)=$ ${a*c}$+$${b}`;
							texte_corr += `<br>$f($${c}$)=$ ${a*c+b}`;
							j++;
							//sous question b/
							texte += num_alpha(j)+` Traduire ce calcul par une phrase contenant le mot image`;
							texte_corr += `<br>`+num_alpha(j)+` L'image de ${c} par la fonction $f$ vaut ${a*c+b}`;
							texte_corr += `<br> On peut aussi dire que ${a*c+b} est l'image de ${c} par la fonction $f$`;
						} else {
							// sous-question a/ et b/
							texte += tex_enumerate([`Calculer l'image de ${c}`,`Traduire ce calcul par une phrase contenant le mot image`],this.spacing);
							texte_corr = tex_enumerate([`Calculons l'image par $f$ de $x=$ ${c} :
							<br>$f(x)=$ ${a}$x+$${b}
							<br>$f($${c}$)=$ ${a}$\\times$${c}$+$${b}
							<br>$f($${c}$)=$ ${a*c}$+$${b}
							<br>$f($${c}$)=$ ${a*c+b}`,`L'image de ${c} par la fonction $f$ vaut ${a*c+b}
							<br> On peut aussi dire que ${a*c+b} est l'image de ${c} par la fonction $f$`
							],this.spacing);
						};
						break;
					case 3 :
						var j = 0; // pour la sous-numérotation
						// les variables a,b,c changent sans refaire un appel à randint
						texte = `Soit $g$ la fonction définie par $g:x\\longmapsto$ ${a}$x+$${b}<br>`;
						if (sortie_html) {
							// sous-question a/
							texte += num_alpha(j)+` Calculer l'image de ${c}`;
							texte +=`<br>`;
							texte_corr = num_alpha(j)+` Calculons l'image par $g$ de $x=$ ${c} :`;
							texte_corr += `<br>$g:x\\longmapsto$ ${a}$x+$${b}`;
							texte_corr += `<br>$g:${c}\\longmapsto$ ${a}$\\times$${c}$+$${b}`;
							texte_corr += `<br>$g:${c}\\longmapsto$ ${a*c}$+$${b}`;
							texte_corr += `<br>$g:${c}\\longmapsto$ ${a*c+b}`;
							j++;
							//sous question b/
							texte += num_alpha(j)+` Traduire ce calcul par une phrase contenant le mot image`;
							texte_corr += `<br>`+num_alpha(j)+` L'image de ${c} par la fonction $g$ vaut ${a*c+b}`;
							texte_corr += `<br> On peut aussi dire que ${a*c+b} est l'image de ${c} par la fonction $g$`;
						} else {
							// sous-question a/ et b/
							texte += tex_enumerate([`Calculer l'image de ${c}`,`Traduire ce calcul par une phrase contenant le mot image`],this.spacing);
							texte_corr = tex_enumerate([`Calculons l'image par $g$ de $x=$ ${c} :
							<br>$g:x\\longmapsto$ ${a}$x+$${b}
							<br>$g:${c}\\longmapsto$ ${a}$\\times$${c}$+$${b}
							<br>$g:${c}\\longmapsto$ ${a*c}$+$${b}
							<br>$g:${c}\\longmapsto$ ${a*c+b}`,`L'image de ${c} par la fonction $g$ vaut ${a*c+b}
							<br> On peut aussi dire que ${a*c+b} est l'image de ${c} par la fonction $g$`
							],this.spacing);
						};
						break;
					case 4 :
						if (sortie_html) {
						} else {
						};
						texte_corr = `Calculer avec un diagramme`;

						var j = 0; // pour la sous-numérotation
						// les variables a,b,c changent sans refaire un appel à randint
						texte= `Soit la fonction $h$ définie par le diagramme `;
						if (sortie_html) {
							// sous-question a/
							texte += `<div id="${id_du_div}" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
							SVG_machine_diag(id_du_div,400,50,'h','x',[['\\times '+a,a+'x'],['+'+b,a+'x+'+b]]);
							texte += num_alpha(j)+` Calculer l'image de ${c}`;
							texte +=`<br>`;
							texte_corr = num_alpha(j)+` Calculons l'image par $h$ de $x=$ ${c} :`;
							texte_corr += `<div id="${id_du_div_corr}" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
							//SVG_machine_diag(id_du_div+'corr',400,50,'h',''+c,[['\\times '+a,''+a*c],['+'+b,''+a*c+b]]);
							SVG_machine_diag(id_du_div_corr,400,50,'h','x',[['\\times 5','5x'],['+3','5x+3']]);
							texte_corr += `<div id="diagramme_type3_corr" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
							SVG_machine_diag('diagramme_type3_corr',400,50,'h','x',[['\\times 3','3x'],['+1','3x+1']]);
							j++;
							//sous question b/
							texte += num_alpha(j)+` Traduire ce calcul par une phrase contenant le mot image`;
							texte_corr += `<br>`+num_alpha(j)+` L'image de ${c} par la fonction $h$ vaut ${a*c+b}`;
							texte_corr += `<br> On peut aussi dire que ${a*c+b} est l'image de ${c} par la fonction $h$`;
						} else {
							texte += `<br>`+tikz_machine_diag(`h`,`x`,[[`\\times `+a,a+`x`],[`+`+b,a+`x+`+b]]);
							// sous-question a/ et b/
							texte += tex_enumerate([`Calculer l'image de ${c}`,`Traduire ce calcul par une phrase contenant le mot image`],this.spacing);
							texte_corr = tex_enumerate(
								[`Calculons l'image par $g$ de $x=$ ${c} :<br>`+tikz_machine_diag(`h`,c,[[`\\times `+a,(a*c)],[`+`+b,(a*c+b)]]),
								`L'image de ${c} par la fonction $g$ vaut ${a*c+b}
							<br> On peut aussi dire que ${a*c+b} est l'image de ${c} par la fonction $g$`
								],this.spacing);
						};


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
	this.besoin_formulaire_numerique = ['Règle à travailler',5,"1 : &Agrave; partir d'un programme de calcul\n2 : &Agrave; partir d'un diagramme\n3 : &Agrave; partir de l'expression algébrique sous forme $f(x)=\\ldots$\n4 : &Agrave; partir de l'expression algébrique sous forme $f:x\\longmapsto \\ldots$\n5 : Mélange"]; 
 };  