/**
* Décomposer en produit de facteurs premiers un nombre (la décomposition aura 3, 4 ou 5 facteurs premiers)
* @Auteur Rémi Angot
*/
function Exercice_decomposer_en_facteurs_premiers(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = '' ;
	this.sup2 = '' ; 
	this.titre = "Décomposition en facteurs premiers";
	this.consigne = "Écrire les nombres suivants sous la forme d'un produit de facteurs premiers.";
	this.spacing = 2;


	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		
		for (let i = 0, n, facteurs=[], nb_facteurs, texte, texte_corr; i < this.nb_questions; i++) {
			facteurs = [];
			nb_facteurs = randint(3,5);
			for (var k = 0; k < nb_facteurs; k++) {
				if (k<nb_facteurs-1) {
					if (nb_facteurs>3 && k==0){facteurs.push(2)}
					else if (nb_facteurs>4 && k==1){facteurs.push(2)}
					else{
						facteurs.push(choice([2,3,5]));
					}
					
				}
				else {facteurs.push(choice([2,5,7,11]))}
			}
			n = 1
			for (var k = 0; k < facteurs.length; k++) {
				facteurs[k]
				n = n * facteurs[k]
			}
			texte = '$ '+ tex_nombre(n) + ' = \\dotfill $';
			texte_corr = '$ '+ tex_nombre(n) + ' = ' 
			for (var k = 0; k < facteurs.length-1; k++) {
				facteurs[k]
				texte_corr += facteurs[k] + ' \\times '
			}
			texte_corr += facteurs[facteurs.length-1] + ' $';	
			
			
			this.liste_questions.push(texte);
			this.liste_corrections.push(texte_corr);

		}
		liste_de_question_to_contenu(this);
	}
	
}

/**
* Additionner deux relatifs inférieurs à la valeur maximale en paramètre qui est par défaut à 20.
*
* Paramètre supplémentaire ; utilisation des écritures simplifiées
* @Auteur Rémi Angot
*/
function Exercice_additions_relatifs(max=20){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = max ;
	this.sup2 = false; // écriture simplifiée
	this.titre = "Addition de deux entiers relatifs"
	this.consigne = 'Calculer'
	this.spacing = 2;

	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		for (let i = 0, a, b, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
			a = randint(1,this.sup);
			b = randint(1,this.sup);
			k = choice([[-1,-1],[-1,1],[1,-1]]); // Les deux nombres relatifs ne peuvent pas être tous les deux positifs
			a = a*k[0];
			b = b*k[1];
			if (this.sup2){
				texte = `$ ${a}${ecriture_algebrique(b)} = \\dotfill $`;
				texte_corr = `$ ${a}${ecriture_algebrique(b)} = ${a+b} $`;
			} else {
				texte = '$ '+ ecriture_nombre_relatif(a) + ' + ' + ecriture_nombre_relatif(b) + ' = \\dotfill $';
				texte_corr = '$ '+ ecriture_nombre_relatif(a) + ' + ' + ecriture_nombre_relatif(b) + ' = ' + ecriture_nombre_relatif(a + b) +' $';	
			}
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Valeur maximale',99999];
	this.besoin_formulaire2_case_a_cocher = ['Avec des écritures simplifiées'];	
}

/**
* Compléter une addition à trou entre 2 nombres relatifs.
*
* * On peut paramétrer la distance à zéro maximale des deux termes (par défaut égale à 20)
* * On peut choisir d'avoir une écriture simplifiée  (par défaut ce n'est pas le cas)
* @Auteur Rémi Angot
*/
function Exercice_additions_relatifs_a_trou(max=20){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = max ;
	this.sup2 = false; // écriture simplifiée
	this.titre = "Addition à trou de deux entiers relatifs"
	this.consigne = 'Compléter'
	this.spacing = 2;

	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		for (let i = 0, a, b, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
			a = randint(1,this.sup);
			b = randint(1,this.sup);
			k = choice([[-1,-1],[-1,1],[1,-1]]); // Les deux nombres relatifs ne peuvent pas être tous les deux positifs
			a = a*k[0];
			b = b*k[1];
			if (this.sup2){
				texte = '$ '+ a + ' + ' + '\\ldots\\ldots\\ldots' + ' = ' + (a + b) + ' $';
				texte_corr = '$ '+ a + ecriture_algebrique(b) + ' = ' + (a + b) +' $';
			} else{
				texte = '$ '+ ecriture_nombre_relatif(a) + ' + ' + '\\ldots\\ldots\\ldots' + ' = ' + ecriture_nombre_relatif(a + b) + ' $';
				texte_corr = '$ '+ ecriture_nombre_relatif(a) + ' + ' + ecriture_nombre_relatif(b) + ' = ' + ecriture_nombre_relatif(a + b) +' $';	
			}
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Valeur maximale',99999];	
	this.besoin_formulaire2_case_a_cocher = ['Avec des écritures simplifiées'];	
}

/**
* Effectuer la soustraction de  2 nombres relatifs.
*
* * On peut paramétrer la distance à zéro maximale des deux termes (par défaut égale à 20)
* * On peut choisir d'avoir une écriture simplifiée  (par défaut ce n'est pas le cas)
* @Auteur Rémi Angot
*/
function Exercice_soustractions_relatifs(max=20){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = max ;
	this.sup2 = false; // écriture simplifiée
	this.titre = "Soustraction de deux entiers relatifs"
	this.consigne = 'Calculer'
	this.spacing = 2;

	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		for (let i = 0, a, b, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
			a = randint(1,this.sup);
			b = randint(1,this.sup);
			k = choice([[-1,-1],[-1,1],[1,-1]]); // Les deux nombres relatifs ne peuvent pas être tous les deux positifs
			a = a*k[0];
			b = b*k[1];
			if (this.sup2){
				texte = '$ '+ a + ' - ' + ecriture_parenthese_si_negatif(b) + ' = \\dotfill $';
				if (b>0){
					texte_corr = '$ '+ a + ' - ' + ecriture_parenthese_si_negatif(b) + ' = ' + (a - b) +' $';
				} else {
					texte_corr = '$ '+ a + ' - ' + ecriture_parenthese_si_negatif(b) + ' = ' + a + ecriture_algebrique(-1*b) + ' = ' + (a - b) +' $';
				}
			} else {
				texte = '$ '+ ecriture_nombre_relatif(a) + ' - ' + ecriture_nombre_relatif(b) + ' = \\dotfill $';
				texte_corr = '$ '+ ecriture_nombre_relatif(a) + ' - ' + ecriture_nombre_relatif(b) + ' = ' + ecriture_nombre_relatif(a) + ' + ' + ecriture_nombre_relatif(-1*b) + ' = ' + ecriture_nombre_relatif(a - b) +' $';
			}
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Valeur maximale',99999];
	this.besoin_formulaire2_case_a_cocher = ['Avec des écritures simplifiées'];			
}

/**
* Effectuer une multiplication entre 2 nombres relatifs.
*
* * On peut paramétrer la distance à zéro maximale des deux termes (par défaut égale à 20)
* * On peut choisir d'avoir une écriture simplifiée  (par défaut ce n'est pas le cas)
* @Auteur Rémi Angot
*/
function Exercice_multiplications_relatifs(max=10){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = max ;
	this.sup2 = false; // écriture simplifiée
	this.titre = "Multiplication de deux entiers relatifs"
	this.consigne = 'Calculer'
	this.spacing = 2;

	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		for (let i = 0, a, b, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
			a = randint(1,this.sup);
			b = randint(1,this.sup);
			k = choice([[-1,-1],[-1,1],[1,-1]]); // Les deux nombres relatifs ne peuvent pas être tous les deux positifs
			a = a*k[0];
			b = b*k[1];
			if (a==1){
				a=-1
			}
			if (b==1){
				b=-1
			}
			if (this.sup2){
				texte = '$ '+ a + ' \\times ' + ecriture_parenthese_si_negatif(b) + ' = \\dotfill $';
				texte_corr = '$ '+ a + ' \\times ' + ecriture_parenthese_si_negatif(b) + ' = ' + (a * b) +' $';
			} else {
				texte = '$ '+ ecriture_nombre_relatif(a) + ' \\times ' + ecriture_nombre_relatif(b) + ' = \\dotfill $';
				texte_corr = '$ '+ ecriture_nombre_relatif(a) + ' \\times ' + ecriture_nombre_relatif(b) + ' = ' + ecriture_nombre_relatif(a * b) +' $';
			}
				
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Valeur maximale',99999];
	this.besoin_formulaire2_case_a_cocher = ['Avec des écritures simplifiées'];		
}
/**
* Comparer deux fractions dont les dénominateurs sont multiples (avec un coefficient paramétrable qui est par défaut inférieur à 11)
* @Auteur Rémi Angot
*/
function Exercice_comparer_deux_fractions (max=11){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = max ; // Correspond au facteur commun
	this.titre = "Comparer des fractions (dénominateurs multiples)"
	this.consigne = 'Comparer les fractions suivantes.'
	this.spacing = 2;
	this.spacing_corr = 2;
	this.nb_questions = 5;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		liste_fractions = obtenir_liste_fractions_irreductibles();
		for (let i = 0, fraction, a, b, texte, texte_corr, signe, signe2, cpt=0; i < this.nb_questions;i++) {
			fraction = choice(liste_fractions); //
			a = fraction[0];
			b = fraction[1];
			k = randint(2,this.sup);
			ecart = choice([-4,-3,-2,-1,1,2,3,4]);
			if (k*a+ecart<=0){
				ecart=ecart*(-1)
			}
			if (ecart>0) {
				signe = `<`
				signe2 = `>`
			} else {
				signe = `>`
				signe2=`<`
			}
			enleve_element(liste_fractions,fraction); // Il n'y aura pas 2 fois la même réponse

			ordre_des_fractions = randint(1,2)
			if (ordre_des_fractions==1) {
				texte = `$${tex_fraction(a,b)} \\quad$ et $\\quad ${tex_fraction(k*a+ecart,k*b)}$`;
			} else {
				texte = `$${tex_fraction(k*a+ecart,k*b)} \\quad$ et $\\quad ${tex_fraction(a,b)}$`;
			}
			if (!sortie_html) {
				texte=texte.replace('\\quad$ et $\\quad','\\ldots\\ldots\\ldots')
			}
			texte_corr = `$${tex_fraction(a,b)}=${tex_fraction(a+mise_en_evidence('\\times '+k),b+mise_en_evidence('\\times '+k))}=${tex_fraction(a*k,b*k)}\\quad$`
			if (ordre_des_fractions==1) {
				texte_corr += `  et   $\\quad${tex_fraction(a*k,b*k)} ${signe} ${tex_fraction(a*k+ecart,b*k)}\\quad$ donc $\\quad${tex_fraction(a,b)} ${signe} ${tex_fraction(a*k+ecart,b*k)}$ `;
			} else {
				texte_corr += `  et   $\\quad${tex_fraction(a*k+ecart,b*k)} ${signe2} ${tex_fraction(a*k,b*k)} \\quad$ donc $\\quad ${tex_fraction(a*k+ecart,b*k)} ${signe2} ${tex_fraction(a,b)} $ `;
			}			
			this.liste_questions.push(texte);
			this.liste_corrections.push(texte_corr);
			}
		liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
	}
	this.besoin_formulaire_numerique = ['Valeur maximale du coefficient multiplicateur',99999];		
}


/**
* 4 fractions aux dénominateurs multiples et un nombre entier sont donnés, il faut les classer dans l'ordre croissant ou décroissant
* 
* Pour la correction, les fractions sont toute écrites avec un dénominateur commun avant d'être classées
* @Auteur Rémi Angot
*/
function Exercice_comparer_quatre_fractions (){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Comparer quatre fractions (dénominateurs multiples) et un nombre entier"
	this.consigne = "Ranger les nombres suivants dans l'ordre croissant."
	this.spacing = 2;
	sortie_html ? this.spacing_corr = 4 : this.spacing_corr = 3 ;
	this.nb_questions = 2;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		for (let i = 0, denominateurs, n1, d1, n2, d2, n3, d3, n4, d4, k, texte="", texte_corr="", cpt=0; i < this.nb_questions;i++) {
			liste_denominateurs = [[12,2,3,4,6],[16,2,4,8],[18,2,3,6,9],[20,2,4,5,10],[24,2,3,4,8,12],[30,2,3,5,6]]
			denominateurs = choice(liste_denominateurs);
			d1 = denominateurs[0];
			enleve_element(denominateurs,d1);
			d2 = choice(denominateurs);
			enleve_element(denominateurs,d2);
			d3 = choice(denominateurs);
			d4 = choice(denominateurs);
			k = randint(1,3);
			n1 = randint(1,10);
			n2 = randint(1,10);
			n3 = randint(1,10);
			n4 = choice([d4+randint(1,3),d4*2+randint(1,2)],randint(1,10));
			// [num,den,calcul de mise au même dénominateur, num qui correspond au denominateur commun]
			
			while (((n1/d1-n2/d2)*(n1/d1-n3/d3)*(n1/d1-n4/d4)*(n2/d2-n3/d3)*(n2/d3-n4/d4)*(n3/d3-n4/d4)<0.1) || (n1%d1==0) || (n2%d2==0) || (n3%d3==0) || (n4%d4==0) ){
				n1 = randint(1,11);
				n2 = randint(1,11);
				n3 = randint(1,11);
				n4 = randint(1,11);
			}
			let tableau_fractions=[[n1,d1,`$${tex_fraction(n1,d1)}$`,`$${tex_fraction(n1,d1)}$`]]
			tableau_fractions.push([n2,d2,`$${tex_fraction(n2,d2)}=${tex_fraction(n2+mise_en_evidence("\\times"+Algebrite.eval(d1/d2)),d2+mise_en_evidence("\\times"+Algebrite.eval(d1/d2)))}=${tex_fraction(Algebrite.eval(n2*d1/d2),d1)}$`,`$${tex_fraction(Algebrite.eval(n2*d1/d2),d1)}$`])
			tableau_fractions.push([n3,d3,`$${tex_fraction(n3,d3)}=${tex_fraction(n3+mise_en_evidence("\\times"+Algebrite.eval(d1/d3)),d3+mise_en_evidence("\\times"+Algebrite.eval(d1/d3)))}=${tex_fraction(Algebrite.eval(n3*d1/d3),d1)}$`,`$${tex_fraction(Algebrite.eval(n3*d1/d3),d1)}$`])
			tableau_fractions.push([n4,d4,`$${tex_fraction(n4,d4)}=${tex_fraction(n4+mise_en_evidence("\\times"+Algebrite.eval(d1/d4)),d4+mise_en_evidence("\\times"+Algebrite.eval(d1/d4)))}=${tex_fraction(Algebrite.eval(n4*d1/d4),d1)}$`,`$${tex_fraction(Algebrite.eval(n4*d1/d4),d1)}$`])
			tableau_fractions.push([k,1,`$${k}=${tex_fraction(d1*k,d1)}$`,`$${tex_fraction(k*d1,d1)}$`])
			tableau_fractions.sort(compare_fractions)
			let tableau_fractions_enonce=shuffle(tableau_fractions)
			texte = "";
			for (var j = 0; j < tableau_fractions_enonce.length; j++) {
				if (tableau_fractions_enonce[j][1]==1)
					texte+=`$${tableau_fractions_enonce[j][0]}\\quad\\text{;}\\quad$`
				else
					texte+=`$${tex_fraction(tableau_fractions_enonce[j][0],tableau_fractions_enonce[j][1])}\\quad\\text{;}\\quad$`
			}
			texte = texte.substring(0,texte.length-19)+"$" // Enlève les 21 derniers caractères (pour le ; de la fin)
			tableau_fractions.sort(compare_fractions)
			texte_corr ="";
			for (var j = 0; j < tableau_fractions_enonce.length; j++) {
				texte_corr+=tableau_fractions_enonce[j][2]
				texte_corr+="<br>"
			}
			for (var j = 0; j < tableau_fractions.length; j++) {
				texte_corr+=tableau_fractions[j][3]
				if (j<tableau_fractions.length-1)
					texte_corr+=`$\\quad<\\quad$`
			}
			texte_corr+="<br>"
			let texte_conclusion = ""
			for (var j = 0; j < tableau_fractions.length; j++) {
				if (tableau_fractions[j][1]==1)
					texte_conclusion+=`$${tableau_fractions[j][0]}\\quad<\\quad$`
				else
					texte_conclusion+=`$${tex_fraction(tableau_fractions[j][0],tableau_fractions[j][1])}\\quad<\\quad$`
			}
			texte_corr += "Finalement : $\\quad$ "+texte_conclusion.substring(0,texte_conclusion.length-12)+"$"

			this.liste_questions.push(texte);
			this.liste_corrections.push(texte_corr);
			}
		liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
	}
}

/**
* Effectuer l'addition de deux fractions dont un dénominateur est un multiple de l'autre.
*
* Le coefficient est paramétrable, par défaut il est inférieur à 11.
* @Auteur Rémi Angot
*/
function Exercice_additionner_des_fractions_5e(max=11){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = max ; // Correspond au facteur commun
	this.titre = "Additionner deux fractions (dénominateurs multiples)"
	this.consigne = "Calculer et donner le résultat sous la forme d'une fraction simplifiée"
	this.spacing = 2;
	this.spacing_corr = 2;
	this.nb_questions = 5;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		for (let i = 0, a, b, c, d,texte, texte_corr, cpt=0; i < this.nb_questions;i++) {
			// les numérateurs
			a = randint (1,9);
			c = randint (1,9);
			// les dénominateurs
			b = randint(2,9);
			while (b==a){
				b = randint(2,9); // pas de fraction avec numérateur et dénominateur égaux
			}
			k = randint(2,this.sup);
			d = b*k
			ordre_des_fractions = randint(1,2)
			if (ordre_des_fractions==1) {
				texte = `$${tex_fraction(a,b)}+${tex_fraction(c,d)}=$`;
			} else {
				texte = texte = `$${tex_fraction(c,d)}+${tex_fraction(a,b)}=$`;
			}
			if (ordre_des_fractions==1) {
				texte_corr = `$${tex_fraction(a,b)}+${tex_fraction(c,d)}=${tex_fraction(a+mise_en_evidence('\\times'+k),b+mise_en_evidence('\\times'+k))}+${tex_fraction(c,d)}`
				texte_corr += `=${tex_fraction(a*k,b*k)}+${tex_fraction(c,d)}=${tex_fraction(a*k+`+`+c,d)}=${tex_fraction(a*k+c,d)}$`;
			} else {
				texte_corr = `$${tex_fraction(c,d)}+${tex_fraction(a,b)}=${tex_fraction(c,d)}+${tex_fraction(a+mise_en_evidence('\\times'+k),b+mise_en_evidence('\\times'+k))}`
				texte_corr += `=${tex_fraction(c,d)}+${tex_fraction(a*k,b*k)}=${tex_fraction(c+'+'+a*k,d)}=${tex_fraction(a*k+c,d)}$`;
			}
			// Est-ce que le résultat est simplifiable ?
			let s = pgcd(a*k+c,d);
			if ((a*k+c)%d==0) { // si le résultat est un entier
				texte_corr +=`$=${Algebrite.eval((a*k+c)/d)}$`
			} else if (s!=1) {
				texte_corr +=`$=${tex_fraction(Algebrite.eval((a*k+c)/s)+mise_en_evidence('\\times'+s),Algebrite.eval(d/s)+mise_en_evidence('\\times'+s))}=${tex_fraction(Algebrite.eval((a*k+c)/s),Algebrite.eval(d/s))}$`
			}
			this.liste_questions.push(texte);
			this.liste_corrections.push(texte_corr);
			}
		liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
	}
	this.besoin_formulaire_numerique = ['Valeur maximale du coefficient multiplicateur',99999];		
}

/**
* Effectuer l'addition ou la soustraction de deux fractions dont un dénominateur est un multiple de l'autre.
*
* Le résultat de la soustraction sera toujours positif.
*
* Le coefficient est paramétrable, par défaut il est inférieur à 11.
*
* On peut paramétrer de n'avoir que des soustractions.
* @Auteur Rémi Angot
*/
function Exercice_additionner_ou_soustraire_des_fractions_5e(max=11){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = max ; // Correspond au facteur commun
	this.sup2 = false // Si true alors il n'y aura que des soustractions
	this.titre = "Additionner ou soustraire deux fractions (dénominateurs multiples)"
	this.consigne = "Calculer et donner le résultat sous la forme d'une fraction simplifiée"
	this.spacing = 2;
	this.spacing_corr = 2;
	this.nb_questions = 5;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		for (let i = 0, a, b, c, d,texte, texte_corr, cpt=0; i < this.nb_questions;i++) {
			// les numérateurs
			a = randint (1,9);
			c = randint (1,9);
			// les dénominateurs
			b = randint(2,9);
			while (b==a){
				b = randint(2,9); // pas de fraction avec numérateur et dénominateur égaux
			}
			k = randint(2,this.sup);
			d = b*k
			if (randint(1,2)==1 && !this.sup2) { //une addition
				ordre_des_fractions = randint(1,2)
				if (ordre_des_fractions==1) {
					texte = `$${tex_fraction(a,b)}+${tex_fraction(c,d)}=$`;
				} else {
					texte = texte = `$${tex_fraction(c,d)}+${tex_fraction(a,b)}=$`;
				}
				if (ordre_des_fractions==1) {
					texte_corr = `$${tex_fraction(a,b)}+${tex_fraction(c,d)}=${tex_fraction(a+mise_en_evidence('\\times'+k),b+mise_en_evidence('\\times'+k))}+${tex_fraction(c,d)}`
					texte_corr += `=${tex_fraction(a*k,b*k)}+${tex_fraction(c,d)}=${tex_fraction(a*k+`+`+c,d)}=${tex_fraction(a*k+c,d)}$`;
				} else {
					texte_corr = `$${tex_fraction(c,d)}+${tex_fraction(a,b)}=${tex_fraction(c,d)}+${tex_fraction(a+mise_en_evidence('\\times'+k),b+mise_en_evidence('\\times'+k))}`
					texte_corr += `=${tex_fraction(c,d)}+${tex_fraction(a*k,b*k)}=${tex_fraction(c+'+'+a*k,d)}=${tex_fraction(a*k+c,d)}$`;
				}
				// Est-ce que le résultat est simplifiable ?
				let s = pgcd(a*k+c,d);
				if (s!=1) {
					texte_corr +=`$=${tex_fraction(Algebrite.eval((a*k+c)/s)+mise_en_evidence('\\times'+s),Algebrite.eval(d/s)+mise_en_evidence('\\times'+s))}=${tex_fraction(Algebrite.eval((a*k+c)/s),Algebrite.eval(d/s))}$`
				}
			} else{ //une soustraction
				if ((a/b)>(c/d)) {
					texte = `$${tex_fraction(a,b)}-${tex_fraction(c,d)}=$`;
				} else {
					texte = texte = `$${tex_fraction(c,d)}-${tex_fraction(a,b)}=$`;
				}
				if ((a/b)>(c/d)) {
					texte_corr = `$${tex_fraction(a,b)}-${tex_fraction(c,d)}=${tex_fraction(a+mise_en_evidence('\\times'+k),b+mise_en_evidence('\\times'+k))}-${tex_fraction(c,d)}`
					texte_corr += `=${tex_fraction(a*k,b*k)}-${tex_fraction(c,d)}=${tex_fraction(a*k+`-`+c,d)}=${tex_fraction(a*k-c,d)}$`;
				} else {
					texte_corr = `$${tex_fraction(c,d)}-${tex_fraction(a,b)}=${tex_fraction(c,d)}-${tex_fraction(a+mise_en_evidence('\\times'+k),b+mise_en_evidence('\\times'+k))}`
					texte_corr += `=${tex_fraction(c,d)}-${tex_fraction(a*k,b*k)}=${tex_fraction(c+'-'+a*k,d)}=${tex_fraction(c-a*k,d)}$`;
				}
				// Est-ce que le résultat est simplifiable ?
				let s = pgcd(a*k-c,d);
				if (abs(a*k-c)%d==0){ //si la fraction peut-être un nombre entier
					texte_corr += `$=${Algebrite.eval((abs(a*k-c))/d)}$`
				} else if (s!=1) {
					texte_corr +=`$=${tex_fraction(Algebrite.eval((abs(a*k-c))/s)+mise_en_evidence('\\times'+s),Algebrite.eval(d/s)+mise_en_evidence('\\times'+s))}=${tex_fraction(Algebrite.eval((abs(a*k-c))/s),Algebrite.eval(d/s))}$`
				}
			}
				
			this.liste_questions.push(texte);
			this.liste_corrections.push(texte_corr);
			}
		liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
	}
	this.besoin_formulaire_numerique = ['Valeur maximale du coefficient multiplicateur',99999];	
	this.besoin_formulaire2_case_a_cocher = ['Uniquement des soustractions'];	
}


/**
* Effectuer la somme de deux fractions
*
* * Niveau 1 : 4 fois sur 5 un dénominateur est un multiple de l'autre et une fois sur 5 il faut additionner une fraction et un entier
* * Niveau 2 : 2 fois sur 5, il faut trouver le ppcm, 1 fois sur 5 le ppcm correspond à leur produit, 1 fois sur 5 un dénominateur est multiple de l'autre, 1 fois sur 5 il faut additionner une fraction et un entier
* * Paramètre supplémentaire : utiliser des nommbres relatifs (par défaut tous les nombres sont positifs)
* @Auteur Rémi Angot
*/
function Exercice_additionner_des_fractions(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 2; // Niveau de difficulté
	this.sup2 = false; // Avec ou sans relatifs
	this.titre = "Additionner deux fractions"
	this.consigne = "Calculer et donner le résultat sous la forme d'une fraction simplifiée"
	this.spacing = 2;
	this.spacing_corr = 2;
	this.nb_questions = 5;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let type_de_questions_disponibles
		if (this.sup==1) {
			type_de_questions_disponibles = ['b_multiple_de_d','d_multiple_de_b','b_multiple_de_d','d_multiple_de_b','entier']
		}
		if (this.sup==2) {
			type_de_questions_disponibles = ['ppcm','ppcm','premiers_entre_eux',choice(['b_multiple_de_d','d_multiple_de_b']),'entier']
		}
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		for (let i = 0, a, b, c, d, k, k1, k2, num, den, texte, texte_corr, type_de_questions, cpt=0; i < this.nb_questions;i++) {
			type_de_questions = liste_type_de_questions[i];
			switch (type_de_questions){
				case 'ppcm' :
					let liste_couples_de_denominateurs = [[6,9],[4,6],[8,12],[9,12],[10,15],[10,25],[6,21],[12,30],[6,8],[50,75],]
					let couples_de_denominateurs = choice(liste_couples_de_denominateurs)
					if (choice([true,false])) {
						b = couples_de_denominateurs[0];
						d = couples_de_denominateurs[1];
					} else {
						b = couples_de_denominateurs[1];
						d = couples_de_denominateurs[0];
					}
					k1 = ppcm(b,d)/b;
					k2 = ppcm(b,d)/d;
				break

				case 'premiers_entre_eux' :
					b = randint(2,9)
					d = randint(2,9)
					while (pgcd(b,d)!=1) {
						b = randint(2,9)
						d = randint(2,9)
					}
					k1 = ppcm(b,d)/b;
					k2 = ppcm(b,d)/d;
				break

				case 'd_multiple_de_b':
					b = randint(2,9);
					k = randint(2,11);
					d = b*k;
				break

				case 'b_multiple_de_d':
					d = randint(2,9);
					k = randint(2,11);
					b = d*k;
				break
			}

			
			a = randint (1,9,[b]);
			c = randint (1,9,[d]);
			if (this.sup2) { //si les numérateurs sont relatifs
				a = a * choice([-1,1]);
				c = c * choice([-1,1]);
			}
			texte = `$${tex_fraction(a,b)}+${tex_fraction(c,d)}=$`;
			texte_corr = `$${tex_fraction(a,b)}+${tex_fraction(c,d)}`

			// a/b+c/d = num/den (résultat non simplifié)

			if (type_de_questions=='ppcm' || type_de_questions=='premiers_entre_eux') {
				texte_corr += `=${tex_fraction(a+mise_en_evidence('\\times'+k1),b+mise_en_evidence('\\times'+k1))}+${tex_fraction(c+mise_en_evidence('\\times'+k2),d+mise_en_evidence('\\times'+k2))}`
				//texte_corr += `=${tex_fraction(a*k1,b*k1)}+${tex_fraction(c*k2,d*k2)}`;
				num = a*k1+c*k2;
				den = b*k1
				texte_corr += `=${tex_fraction(a*k1+`+`+ecriture_parenthese_si_negatif(c*k2),den)}`

			} 

			if (type_de_questions=='d_multiple_de_b') {
				texte_corr += `=${tex_fraction(a+mise_en_evidence('\\times'+k),b+mise_en_evidence('\\times'+k))}+${tex_fraction(c,d)}`
				//texte_corr += `=${tex_fraction(a*k1,b*k1)}+${tex_fraction(c*k2,d*k2)}`;
				num = a*k+c;
				den = b*k
				texte_corr += `=${tex_fraction(a*k+`+`+ecriture_parenthese_si_negatif(c),den)}`
			}

			if (type_de_questions=='b_multiple_de_d') {
				texte_corr += `=${tex_fraction(a,b)}+${tex_fraction(c+mise_en_evidence('\\times'+k),d+mise_en_evidence('\\times'+k))}`
				//texte_corr += `=${tex_fraction(a*k1,b*k1)}+${tex_fraction(c*k2,d*k2)}`;
				num = a+c*k;
				den = b
				texte_corr += `=${tex_fraction(a+`+`+ecriture_parenthese_si_negatif(c*k),den)}`
			}

			if (type_de_questions=="entier") {
				a = randint(1,9);
				b = randint(2,9,[a]);
				let n = randint(1,9);
				if (this.sup2) {
					a = a * choice([-1,1]);
					n = n * choice([-1,1]);
				}
				if (choice([true,false])) {
					texte = `$${n}+${tex_fraction(a,b)}=$`;
					texte_corr = texte ;
					texte_corr += `$${tex_fraction(n+'\\times'+b,b)}+${tex_fraction(a,b)}`;
					texte_corr += `=${tex_fraction(n*b+'+'+ecriture_parenthese_si_negatif(a),b)}`;
				} else {
					texte = `$${tex_fraction(a,b)}+${ecriture_parenthese_si_negatif(n)}=$`;
					texte_corr = texte ;
					texte_corr += `$${tex_fraction(a,b)}+${tex_fraction(n+'\\times'+b,b)}`;
					texte_corr += `=${tex_fraction(a+'+'+ecriture_parenthese_si_negatif(n*b),b)}`
				}
				num = n*b+a
				den = b 
			}
			texte_corr += `=${tex_fraction(num,den)}`;
			texte_corr += simplification_de_fraction_avec_etapes(num,den)+'$';
			this.liste_questions.push(texte);
			this.liste_corrections.push(texte_corr);
			}
		liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',2,"1 : Un dénominateur multiple de l'autre\n\
2 : Cas général"]
	this.besoin_formulaire2_case_a_cocher = ['Avec des nombres relatifs'];

}


/**
* Effectuer la somme ou la différence de deux fractions
*
* * Niveau 1 : 4 fois sur 5 un dénominateur est un multiple de l'autre et une fois sur 5 il faut additionner une fraction et un entier
* * Niveau 2 : 2 fois sur 5, il faut trouver le ppcm, 1 fois sur 5 le ppcm correspond à leur produit, 1 fois sur 5 un dénominateur est multiple de l'autre, 1 fois sur 5 il faut additionner une fraction et un entier
* * Paramètre supplémentaire : utiliser des nommbres relatifs (par défaut tous les nombres sont positifs)
* * 2 fois sur 4 il faut faire une soustraction
* @Auteur Rémi Angot
*/
function Exercice_additionner_ou_soustraire_des_fractions(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 2; // Niveau de difficulté
	this.sup2 = false; // Avec ou sans relatifs
	this.titre = "Additionner ou soustraire deux fractions"
	this.consigne = "Calculer et donner le résultat sous la forme d'une fraction simplifiée."
	this.spacing = 2;
	this.spacing_corr = 2;
	this.nb_questions = 5;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let type_de_questions_disponibles
		if (this.sup==1) {
			type_de_questions_disponibles = ['b_multiple_de_d','d_multiple_de_b','b_multiple_de_d','d_multiple_de_b','entier']
		}
		if (this.sup==2) {
			type_de_questions_disponibles = ['ppcm','ppcm','premiers_entre_eux',choice(['b_multiple_de_d','d_multiple_de_b']),'entier']
		}
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		let liste_de_plus_ou_moins = combinaison_listes(['-','-','+','+'],this.nb_questions)
		for (let i = 0, a, b, c, d, k, k1, k2, num, den, texte, texte_corr, type_de_questions, cpt=0; i < this.nb_questions;i++) {
			let plus_ou_moins = liste_de_plus_ou_moins[i]
			type_de_questions = liste_type_de_questions[i];
			switch (type_de_questions){
				case 'ppcm' :
					let liste_couples_de_denominateurs = [[6,9],[4,6],[8,12],[9,12],[10,15],[10,25],[6,21],[12,30],[6,8],[50,75],]
					let couples_de_denominateurs = choice(liste_couples_de_denominateurs)
					if (choice([true,false])) {
						b = couples_de_denominateurs[0];
						d = couples_de_denominateurs[1];
					} else {
						b = couples_de_denominateurs[1];
						d = couples_de_denominateurs[0];
					}
					k1 = ppcm(b,d)/b;
					k2 = ppcm(b,d)/d;
				break

				case 'premiers_entre_eux' :
					b = randint(2,9)
					d = randint(2,9)
					while (pgcd(b,d)!=1) {
						b = randint(2,9)
						d = randint(2,9)
					}
					k1 = ppcm(b,d)/b;
					k2 = ppcm(b,d)/d;
				break

				case 'd_multiple_de_b':
					b = randint(2,9);
					k = randint(2,11);
					d = b*k;
				break

				case 'b_multiple_de_d':
					d = randint(2,9);
					k = randint(2,11);
					b = d*k;
				break
			}

			a = randint (1,9,[b]);
			c = randint (1,9,[d]);
			if (this.sup2) { //si les numérateurs sont relatifs
				a = a * choice([-1,1]);
				c = c * choice([-1,1]);

			}
			if (!this.sup2 && plus_ou_moins=='-' && a/b<c/d) { //s'il n'y a pas de relatifs, il faut s'assurer que la soustraction soit positive
				[a,b,c,d]=[c,d,a,b] // on échange les 2 fractions
				k1 = ppcm(b,d)/b;
				k2 = ppcm(b,d)/d;
				if (type_de_questions=='d_multiple_de_b') {
					type_de_questions='b_multiple_de_d'; //comme on a échangé les 2 fractions, le type de la question change
					k = b/d;
				} else if (type_de_questions=='b_multiple_de_d') {
					type_de_questions='d_multiple_de_b'; //comme on a échangé les 2 fractions, le type de la question change
					k = d/b;
				}
				echange = true;
			}
			texte = `$${tex_fraction(a,b)}${plus_ou_moins}${tex_fraction(c,d)}=$`;
			texte_corr = `$${tex_fraction(a,b)}${plus_ou_moins}${tex_fraction(c,d)}`

			// a/b(+ou-)c/d = num/den (résultat non simplifié)

			if (type_de_questions=='ppcm' || type_de_questions=='premiers_entre_eux') {
				texte_corr += `=${tex_fraction(a+mise_en_evidence('\\times'+k1),b+mise_en_evidence('\\times'+k1))}${plus_ou_moins}${tex_fraction(c+mise_en_evidence('\\times'+k2),d+mise_en_evidence('\\times'+k2))}`
				num = calcul(a*k1+plus_ou_moins+ecriture_nombre_relatif(c*k2));
				den = b*k1
				texte_corr += `=${tex_fraction(a*k1+plus_ou_moins+ecriture_parenthese_si_negatif(c*k2),den)}`

			} 

			if (type_de_questions=='d_multiple_de_b') {
				texte_corr += `=${tex_fraction(a+mise_en_evidence('\\times'+k),b+mise_en_evidence('\\times'+k))}${plus_ou_moins}${tex_fraction(c,d)}`
				num = calcul(a*k+plus_ou_moins+ecriture_nombre_relatif(c));
				den = b*k
				texte_corr += `=${tex_fraction(a*k+plus_ou_moins+ecriture_parenthese_si_negatif(c),den)}`
			}

			if (type_de_questions=='b_multiple_de_d') {
				texte_corr += `=${tex_fraction(a,b)}${plus_ou_moins}${tex_fraction(c+mise_en_evidence('\\times'+k),d+mise_en_evidence('\\times'+k))}`
				num = calcul(a+plus_ou_moins+ecriture_nombre_relatif(c*k));
				den = b
				texte_corr += `=${tex_fraction(a+plus_ou_moins+ecriture_parenthese_si_negatif(c*k),den)}`
			}

			if (type_de_questions=="entier") {
				a = randint(1,9);
				b = randint(2,9,[a]);
				let n = randint(1,9);
				if (this.sup2) {
					a = a * choice([-1,1]);
					n = n * choice([-1,1]);
				}
				if (choice([true,false])) {
					// n+-a/b
					if (!this.sup2 && plus_ou_moins=="-" && n<a/b) {
						n = randint(5,9) // max(a/b)=9/2
					}
					texte = `$${n}${plus_ou_moins}${tex_fraction(a,b)}=$`;
					texte_corr = texte ;
					texte_corr += `$${tex_fraction(n+mise_en_evidence('\\times'+b),mise_en_evidence(b))}${plus_ou_moins}${tex_fraction(a,b)}`;
					texte_corr += `=${tex_fraction(n*b+plus_ou_moins+ecriture_parenthese_si_negatif(a),b)}`;
				} else {
					// a/b +-n
					if (!this.sup2 && plus_ou_moins=="-" && n>a/b) {
						n = randint(1,4) // 
						a = n*b+randint(1,9) //(n*b+?)/b-n>0
					}
					texte = `$${tex_fraction(a,b)}${plus_ou_moins}${ecriture_parenthese_si_negatif(n)}=$`;
					texte_corr = texte ;
					texte_corr += `$${tex_fraction(a,b)}${plus_ou_moins}${tex_fraction(n+mise_en_evidence('\\times'+b),mise_en_evidence(b))}`;
					texte_corr += `=${tex_fraction(a+'+'+ecriture_parenthese_si_negatif(n*b),b)}`
				}
				num = calcul(n*b+plus_ou_moins+ecriture_parenthese_si_negatif(a))
				den = b 
			}
			texte_corr += `=${tex_fraction(num,den)}`
			texte_corr += simplification_de_fraction_avec_etapes(num,den)+'$';
			this.liste_questions.push(texte);
			this.liste_corrections.push(texte_corr);
			}
		liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',2,"1 : Un dénominateur multiple de l'autre\n\
2 : Cas général"]
	this.besoin_formulaire2_case_a_cocher = ['Avec des nombres relatifs'];

}

/**
* Simplifier l'écriture d'une somme de 2 relatifs et calculer
*
* On peut paramétrer les distances à zéro qui sont par défaut inférieures à 20
* @Auteur Rémi Angot
*/
function Exercice_simplification_somme_algebrique(max=20){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = max;
	this.titre = "Simplifier l'écriture d'une somme de 2 relatifs et calculer"
	this.consigne = 'Simplifier puis calculer'
	this.spacing = 2;

	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		for (let i = 0, a, b, s, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
			a = randint(1,this.sup)*choice([-1,1]);
			b = randint(1,this.sup)*choice([-1,1]);
			s = choice([-1,1]) // + ou -
			
			if (s==1){
				texte = '$ '+ ecriture_nombre_relatif(a) + ' + ' + ecriture_nombre_relatif(b) + ' = \\dotfill $';
				texte_corr = '$ '+ ecriture_nombre_relatif(a) + ' + ' + ecriture_nombre_relatif(b) + ' = ' + a + ecriture_algebrique(s*b) +' = ' + (a+b) + ' $';	
			} else {
				texte = '$ '+ ecriture_nombre_relatif(a) + ' - ' + ecriture_nombre_relatif(b) + ' = \\dotfill $';
				texte_corr = '$ '+ ecriture_nombre_relatif(a) + ' - ' + ecriture_nombre_relatif(b) + ' = ' + a + ecriture_algebrique(s*b) +' = ' + (a-b) + ' $';	
			}
						
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Valeur maximale',99999];
}

/**
* Effectuer la somme ou la différence de deux nombres relatifs
*
* * On peut paramétrer les distances à zéro qui sont par défaut inférieures à 20
* * On peut utiliser des écritures simplifiées (ce qui n'est pas le cas par défaut)
* @Auteur Rémi Angot
*/
function Exercice_additions_et_soustraction_de_relatifs(max=20){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = max ;
	this.sup2 = false; // écriture simplifiée
	this.titre = "Additions et soustractions de nombres relatifs"
	this.consigne = 'Calculer'
	this.spacing = 2;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		for (let i = 0, a, b, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
			a = randint(1,this.sup)*choice([-1,1]);
			b = randint(1,this.sup)*choice([-1,1]);
			if (a==1 & b==1) { // On s'assure que les 3 premières termes n'ont pas le même signe
				c = -1
			} else if (a==-1 & b==-1) {
				c = 1
			}
			else {
				c = randint(1,this.sup)*choice([-1,1]);	
			}
			d = randint(1,this.sup)*choice([-1,1]);
			e = randint(1,this.sup)*choice([-1,1]);
			s1 = choice([-1,1])
			s2 = choice([-1,1])
			if (s1==1 & s2==1){ // On s'assure que les 3 premières opérations ne sont pas identiques
				s3=-1
			} else if (s1==-1 & s2==-1){
				s3=1
			} else {
				s3 = choice([-1,1])	
			}
			s4 = choice([-1,1])
			if (this.sup2){
				texte = `$ ${lettre_depuis_chiffre(i+1)} = ${a}${ecriture_algebrique(b)}${ecriture_algebrique(c)}${ecriture_algebrique(d)}${ecriture_algebrique(e)} = \\dotfill $`;
				if (!sortie_html){
					texte += `<br>\n$ ${lettre_depuis_chiffre(i+1)} = \\dotfill $`
				}
				texte_corr = `$ ${lettre_depuis_chiffre(i+1)} =  ${a}${ecriture_algebrique(b)}${ecriture_algebrique(c)}${ecriture_algebrique(d)}${ecriture_algebrique(e)} = ${somme_des_termes_par_signe([a,b,c,d,e])[0]}${ecriture_algebrique(somme_des_termes_par_signe([a,b,c,d,e])[1])} = ${a+b+c+d+e} $`;		
			} else {
				texte = `$ ${lettre_depuis_chiffre(i+1)} =  ${ecriture_nombre_relatif(a)}${signe(s1)}${ecriture_nombre_relatif(b)}${signe(s2)}${ecriture_nombre_relatif(c)}${signe(s3)}${ecriture_nombre_relatif(d)}${signe(s4)}${ecriture_nombre_relatif(e)} = \\dotfill $`;
				if (!sortie_html){
					texte += `\\\\\n$ ${lettre_depuis_chiffre(i+1)} = \\dotfill $`	
				}
				texte_corr = `$ ${lettre_depuis_chiffre(i+1)} =  ${ecriture_nombre_relatif(a)}${signe(s1)}${ecriture_nombre_relatif(b)}${signe(s2)}${ecriture_nombre_relatif(c)}${signe(s3)}${ecriture_nombre_relatif(d)}${signe(s4)}${ecriture_nombre_relatif(e)} $`;
				texte_corr += `<br>\n$ ${lettre_depuis_chiffre(i+1)} = ${ecriture_nombre_relatif(a)}+${ecriture_nombre_relatif(s1*b)}+${ecriture_nombre_relatif(s2*c)}+${ecriture_nombre_relatif(s3*d)}+${ecriture_nombre_relatif(s4*e)} $`;
				texte_corr += `<br>\n$ ${lettre_depuis_chiffre(i+1)} = ${a+s1*b+s2*c+s3*d+s4*e} $`;
			}
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu_sans_numero(this);
	}
	this.besoin_formulaire_numerique = ['Valeur maximale',99999];
	this.besoin_formulaire2_case_a_cocher = ['Avec des écritures simplifiées'];	
}



/**
* Effectuer la somme de 5 nombres relatifs.
*
* Pour la correction, on commence par effectuer la somme des termes de même signe
*
* * On peut paramétrer les distances à zéro qui sont par défaut inférieures à 20
* * On peut utiliser des écritures simplifiées (ce qui n'est pas le cas par défaut)
* @Auteur Rémi Angot
*/
function Exercice_additions_de_5_relatifs(max=20){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = max ;
	this.sup2 = false; // écriture simplifiée
	this.titre = "Additions de 5 nombres relatifs"
	this.consigne = 'Calculer'
	this.spacing = 2;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		for (let i = 0, a, b, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
			a = randint(1,this.sup)*choice([-1,1]);
			b = randint(1,this.sup)*choice([-1,1]);
			if (a==1 & b==1) { // On s'assure que les 3 premières termes n'ont pas le même signe
				c = -1
			} else if (a==-1 & b==-1) {
				c = 1
			}
			else {
				c = randint(1,this.sup)*choice([-1,1]);	
			}
			d = randint(1,this.sup)*choice([-1,1]);
			e = randint(1,this.sup)*choice([-1,1]);
			s1 = 1; // Que des additions
			s2 = 1;
			s3 = 1;
			s4 = 1;
			if (this.sup2){
				texte = `$ ${lettre_depuis_chiffre(i+1)} = ${a}${ecriture_algebrique(b)}${ecriture_algebrique(c)}${ecriture_algebrique(d)}${ecriture_algebrique(e)} = \\dotfill $`;
				if (!sortie_html){
					texte += `\\\\\n$ ${lettre_depuis_chiffre(i+1)} = \\dotfill $`
				}
				texte_corr = `$ ${lettre_depuis_chiffre(i+1)} =  ${a}${ecriture_algebrique(b)}${ecriture_algebrique(c)}${ecriture_algebrique(d)}${ecriture_algebrique(e)} = ${somme_des_termes_par_signe([a,b,c,d,e])[0]}${ecriture_algebrique(somme_des_termes_par_signe([a,b,c,d,e])[1])} = ${a+b+c+d+e} $`;		
			} else {
				texte = `$ ${lettre_depuis_chiffre(i+1)} =  ${ecriture_nombre_relatif(a)}${signe(s1)}${ecriture_nombre_relatif(b)}${signe(s2)}${ecriture_nombre_relatif(c)}${signe(s3)}${ecriture_nombre_relatif(d)}${signe(s4)}${ecriture_nombre_relatif(e)} = \\dotfill $`;
				if (!sortie_html){
					texte += `<br>\n$ ${lettre_depuis_chiffre(i+1)} = \\dotfill $`	
				}
				texte_corr = `$ ${lettre_depuis_chiffre(i+1)} =  ${ecriture_nombre_relatif(a)}${signe(s1)}${ecriture_nombre_relatif(b)}${signe(s2)}${ecriture_nombre_relatif(c)}${signe(s3)}${ecriture_nombre_relatif(d)}${signe(s4)}${ecriture_nombre_relatif(e)} $`;
				//A faire regroupement des termes de même signe texte_corr += `\\\\\n$ ${lettre_depuis_chiffre(i+1)} = ${ecriture_nombre_relatif(a)}+${ecriture_nombre_relatif(s1*b)}+${ecriture_nombre_relatif(s2*c)}+${ecriture_nombre_relatif(s3*d)}+${ecriture_nombre_relatif(s4*e)} $`;
				texte_corr += `<br>\n$ ${lettre_depuis_chiffre(i+1)} = ${a+s1*b+s2*c+s3*d+s4*e} $`;
			}
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu_sans_numero(this);
	}
	this.besoin_formulaire_numerique = ['Valeur maximale',99999];
	this.besoin_formulaire2_case_a_cocher = ['Avec des écritures simplifiées'];	
}
/**
* x, y, z étant 3 entiers compris entre 2 et 9, calculer : 
* * kx
* * kx-y
* * xy
* * x+y
* * x+y+z
* * x(y+z)
* * x^2
* * x^2+ky
* * x^2+y^2
* * ax^2+y^2
* * ax^2+bx+c
* @Auteur Rémi Angot
*/
function Exercice_substituer(difficulte=1){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = difficulte ;
	this.titre = "Substitution";
	this.consigne = 'Calculer';
	this.spacing = 1;
	this.consigne_modifiable = false;


	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		
		let type_de_questions_disponibles = [1,2,3,4,5,6,7,8,9,10]
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		let k = randint(2,9);
		let k2 = randint(2,9);
		let k3 = randint(2,9);
		if (this.sup>1){ // si difficulté 2, k, k2 et k3 peuvent être négatifs !!! La correction est à faire. Exercice non fini
			k = k*choice([-1,1]);
			k2 = k2*choice([-1,1]);
			k3 = k3*choice([-1,1]);
		}
		let valeurs_possibles = range(9,[0,1]) // Toutes les valeurs de 2 à 9
		let x = choice(valeurs_possibles);
		enleve_element(valeurs_possibles,x);
		let y = choice(valeurs_possibles);
		enleve_element(valeurs_possibles,y);
		let z = choice(valeurs_possibles);
		// x, y et z sont différents
		this.consigne = `Calculer pour $x=${x}$, $y=${y}$ et $z=${z}$.`
		for (let i = 0, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) {
			type_de_questions = liste_type_de_questions[i];
			switch (type_de_questions){
				case 1 :
					texte = `$${lettre_depuis_chiffre(i+1)}=${k}x$`;
					texte_corr = `$${lettre_depuis_chiffre(i+1)}=${k}x=${k}\\times ${x}=${k*x}$`;
					break ;
				case 2 :
					texte = `$${lettre_depuis_chiffre(i+1)}=${k}x-y$`;
					texte_corr = `$${lettre_depuis_chiffre(i+1)}=${k}x-y=${k}\\times ${x}-${y}=${k*x-y}$`;
					break ;
				case 3 :
					texte = `$${lettre_depuis_chiffre(i+1)}=xy$`;
					texte_corr = `$${lettre_depuis_chiffre(i+1)}=xy=${x}\\times ${y}=${x*y}$`;
					break ;
				case 4 :
					texte = `$${lettre_depuis_chiffre(i+1)}=x+y$`;
					texte_corr = `$${lettre_depuis_chiffre(i+1)}=x+y=${x}+${y}=${x+y}$`;
					break ;
				case 5 :
					texte = `$${lettre_depuis_chiffre(i+1)}=xy+z$`;
					texte_corr = `$${lettre_depuis_chiffre(i+1)}=xy+z=${x}\\times ${y}+${z}=${x*y+z}$`;
					break ;
				case 6 :
					texte = `$${lettre_depuis_chiffre(i+1)}=x(y+z)$`;
					texte_corr = `$${lettre_depuis_chiffre(i+1)}=x(y+z)=${x}\\times(${y}+${z})=${x*(y+z)}$`;
					break ;
				case 7 :
					texte = `$${lettre_depuis_chiffre(i+1)}=x^2+${ecriture_parenthese_si_negatif(k)}y$`;
					texte_corr = `$${lettre_depuis_chiffre(i+1)}=x^2+${ecriture_parenthese_si_negatif(k)}y=${x}^2+${ecriture_parenthese_si_negatif(k)}\\times ${y}=${x*x}+${ecriture_parenthese_si_negatif(k)}\\times ${y}=${x*x+k*y}$`;
					break ;
				case 8 :
					texte = `$${lettre_depuis_chiffre(i+1)}=x^2+y^2$`;
					texte_corr = `$${lettre_depuis_chiffre(i+1)}=x^2+y^2=${x}^2+${y}^2=${x*x}+${y*y}=${x*x+y*y}$`;
					break ;
				case 9 :
					texte = `$${lettre_depuis_chiffre(i+1)}=${k}x^2+y^2$`;
					texte_corr = `$${lettre_depuis_chiffre(i+1)}=${k}x^2+y^2=${k}\\times ${x}^2+${y}^2=${k}\\times ${x*x}+${y*y}=${k*x*x+y*y}$`;
					break ;
				case 10 :
					texte = `$${lettre_depuis_chiffre(i+1)}=${k}x^2+${ecriture_parenthese_si_negatif(k2)}x+${ecriture_parenthese_si_negatif(k3)}$`;
					texte_corr = `$${lettre_depuis_chiffre(i+1)}=${k}x^2+${ecriture_parenthese_si_negatif(k2)}x+${ecriture_parenthese_si_negatif(k3)}=${k}\\times ${x}^2+${ecriture_parenthese_si_negatif(k2)}\\times ${ecriture_parenthese_si_negatif(x)}+${ecriture_parenthese_si_negatif(k3)}=${k}\\times ${x*x}+${ecriture_parenthese_si_negatif(k2)}\\times ${x}+${ecriture_parenthese_si_negatif(k3)}=${k*x*x+k2*x+k3}$`;
					break ;
				
			}
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',2,'1 : Multiplication par un facteur positif\n2: Multiplication par un facteur relatif'] 
}

/**
* Déterminer la valeur d'un angle dans un triangle.
*
* Correction avec détails ou pas. 9 cas différents
* * On connait 2 angles sur 3.
* * Dans un triangle rectangle, on connait un angle aigu.
* * Dans un triangle isocèle, on connait un angle à la base.
* * Dans un triangle isocèle, on connait l'angle au sommet principal.
* * Quelle est la mesure d'un angle aigu dans un triangle rectangle qui a 2 angles égaux ?
* * Dans un triangle rectangle, un angle aigu mesure le double de l'autre.
* * Dans un triangle rectangle, un angle aigu mesure le quart de l'autre.
* * Dans un triangle rectangle, un angle aigu mesure 5 fois l'autre.
* * Un triangle a 3 angles égaux.
* * Dans un triangle rectangle, un angle mesure le tiers de l'autre.
* @Auteur Jean-Claude Lhote
*/
function Exercice_angles_triangles(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = false ;
	this.titre = "Somme des angles dans un triangle";
	this.consigne = '';
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1.5;
	sortie_html ? this.spacing = 2 : this.spacing = 1.5;
	this.nb_questions=5;
	this.consigne_modifiable = false;
	this.correction_detaillee_disponible = true;
	this.nb_cols=1;
	this.nb_cols_corr=1;


	let troisieme_angle = function(a1,a2) {
		if (a1+a2<=180)  return 180-(a1+a2)
		else return -1;
	}

	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		
		let type_de_questions_disponibles = [1,2,3,4,5,6,7,8,9,10]
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		this.consigne=`Calculer l'angle demandé dans les triangles suivants :`
		let lettre1,lettre2,lettre3,s1,s2,s3
		for (let i = 0, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) {
			type_de_questions = liste_type_de_questions[i];
			lettre1 = randint(1,26)	// aleatoirisation du nom des points
			lettre2 = randint(1, 26, [lettre1])
			s1 = lettre_depuis_chiffre(lettre1)
			s2 = lettre_depuis_chiffre(lettre2)
			lettre3 = randint(1, 24, [lettre1, lettre2])
			s3 = lettre_depuis_chiffre(lettre3)
			if (this.correction_detaillee) texte_corr = `Dans un triangle, la somme des angles est égale à $180\\degree$.<br>`;
			else texte_corr=``;
			switch (type_de_questions){
				case 1 :
					angle1=randint(10,40);
					angle2=randint(20,100);
					texte = `$${s1+s2+s3}$ est un triangle quelconque. L'angle $\\widehat{${s1+s2+s3}}$ mesure $${angle1}\\degree$ et l'angle $\\widehat{${s2+s1+s3}}$ mesure $${angle2}\\degree$.<br>Quelle est la mesure de l'angle $\\widehat{${s2+s3+s1}}$ ?`;
					if (this.correction_detaillee) {
						texte_corr+=`$\\widehat{${s1+s2+s3}} + \\widehat{${s2+s3+s1}} + \\widehat{${s2+s1+s3}}=180\\degree$<br>`;
						texte_corr+=`Donc $\\widehat{${s2+s3+s1}}=180- \\left(\\widehat{${s1+s2+s3}} + \\widehat{${s2+s1+s3}}\\right)$.<br>D'où `
					}
					texte_corr += `$\\widehat{${s2+s3+s1}}$= $180\\degree-\\left(${angle1}\\degree+${angle2}\\degree\\right)=180\\degree-${angle1+angle2}\\degree=${troisieme_angle(angle1,angle2)}\\degree$.<br>`;
					texte_corr += `L'angle $\\widehat{${s2+s3+s1}}$ mesure $${troisieme_angle(angle1,angle2)}\\degree$.`
					break ;
				case 2 :
					angle1=90;
					angle2=randint(5,85);
					texte = `$${s1+s2+s3}$ est un triangle rectangle en $${s2}$ et l'angle $\\widehat{${s2+s1+s3}}$ mesure $${angle2}\\degree$.<br>Quelle est la mesure de l'angle $\\widehat{${s2+s3+s1}}$ ?`;
					if (this.correction_detaillee) {
						texte_corr += `Comme l'angle $\\widehat{${s1+s2+s3}}$ est droit, les angles $\\widehat{${s2+s3+s1}}$ et $\\widehat{${s2+s1+s3}}$ sont complémentaires.<br>`
						texte_corr +=`On a donc : $\\widehat{${s2+s3+s1}}+ \\widehat{${s2+s1+s3}}=90\\degree$<br>D'où `;
					}
					texte_corr += `$\\widehat{${s2+s3+s1}}=90\\degree-${angle2}\\degree=${90-angle2}\\degree$<br>`;
					texte_corr += `L'angle $\\widehat{${s2+s3+s1}}$ mesure $${90-angle2}\\degree$.`;
					break ;
				case 3 :
					angle1=randint(10,170);
					angle2=(180-angle1)/2;
					texte = `$${s1+s2+s3}$ est un triangle isocèle en $${s1}$. L'angle $\\widehat{${s2+s1+s3}}$ mesure $${angle1}\\degree$.<br>Quelle est la mesure de l'angle $\\widehat{${s2+s3+s1}}$ ?`;
					
					if (this.correction_detaillee) {
						texte_corr += `Les angles à la base d'un triangle isocèle sont de même mesure.<br>`
						texte_corr +=`D'où $\\widehat{${s1+s2+s3}}=\\widehat{${s2+s3+s1}}$.<br>`
						texte_corr +=`On a donc : $\\widehat{${s2+s1+s3}}+2\\times \\widehat{${s2+s3+s1}}=180\\degree$.<br>`;
						texte_corr +=`Soit  $${angle1}\\degree+2\\times \\widehat{${s2+s3+s1}}=180\\degree$.<br>`;
						texte_corr +=`D'où $2\\times \\widehat{${s2+s3+s1}}=180\\degree-${angle1}\\degree$.<br>D'où `;
					}
					texte_corr += `$\\widehat{${s2+s3+s1}}=\\left(180\\degree-${angle1}\\degree\\right)\\div 2=${180-angle1}\\degree\\div 2=${tex_nombrec((180-angle1)/2)}\\degree$<br>`;
					texte_corr += `L'angle $\\widehat{${s2+s3+s1}}$ mesure $${tex_nombrec((180-angle1)/2)}\\degree$.`;
					break ;
				case 4 :
					angle2=randint(10,80);
					angle1=180-angle2*2;
					texte = `$${s1+s2+s3}$ est un triangle isocèle en $${s1}$. L'angle $\\widehat{${s1+s2+s3}}$ mesure $${angle2}\\degree$.<br>Quelle est la mesure de l'angle $\\widehat{${s2+s1+s3}}$ ?`;

					if (this.correction_detaillee) {
					texte_corr+=`Les deux angles à la base d'un triangle isocèle sont égaux.<br>`;
					texte_corr += `Donc $\\widehat{${s1+s2+s3}}=\\widehat{${s2+s3+s1}}=${angle2}\\degree$.<br>D'où `
					}
					texte_corr += `$\\widehat{${s2+s1+s3}}=180\\degree-2\\times${angle2}\\degree=180\\degree-${2*angle2}\\degree=${180-2*angle2}\\degree$.<br>`;
					texte_corr += `L'angle $\\widehat{${s2+s1+s3}}$ mesure $${180-2*angle2}\\degree$.`;
					break ;
				case 5 :  // cas non aléatoires triangle rectangle isocèle
					angle1=90;
					angle2=45;
					texte = `$${s1+s2+s3}$ est un triangle rectangle en $${s2}$ et $\\widehat{${s2+s1+s3}}=\\widehat{${s2+s3+s1}}$.<br>Quelle est la mesure de l'angle $\\widehat{${s2+s3+s1}}$ ?`;

					if (this.correction_detaillee) {
						texte_corr += `Comme $\\widehat{${s2+s1+s3}}=\\widehat{${s2+s3+s1}}$,<br>`;
						texte_corr += `on a : $2 \\times \\widehat{${s2+s1+s3}} + 90\\degree=180\\degree$.<br>D'où `;
						texte_corr += ` $2 \\times \\widehat{${s2+s1+s3}}=180\\degree-90\\degree=90\\degree$.<br>D'où `;
					}
					texte_corr += `$\\widehat{${s2+s1+s3}}=90\\degree \\div 2=45\\degree$.<br>`;
					texte_corr += `L'angle $\\widehat{${s2+s1+s3}}$ mesure $45\\degree$.`;
				
					break ;
				case 6 : // cas non aléatoires triangle rectangle 30,60,90
					texte = `$${s1+s2+s3}$ est un triangle rectangle en $${s1}$. L'angle $\\widehat{${s1+s2+s3}}$ mesure le double de l'angle $\\widehat{${s1+s3+s2}}$.<br>Quelles sont les mesures des angles $\\widehat{${s1+s2+s3}}$ et $\\widehat{${s1+s3+s2}}$ ?`;
					if (this.correction_detaillee) {
						texte_corr += `Comme $\\widehat{${s1+s2+s3}}=2\\times\\widehat{${s1+s3+s2}}$ et comme $\\widehat{${s1+s2+s3}}$ et $\\widehat{${s1+s3+s2}}$ sont complémentaires,<br>`;
						texte_corr += `on a : $2 \\times \\widehat{${s1+s3+s2}} + \\widehat{${s1+s3+s2}}=90\\degree$.<br>D'où `;
						texte_corr += ` $3 \\times \\widehat{${s1+s3+s2}}=90\\degree$.<br>D'où `;
					}
					texte_corr += `$\\widehat{${s1+s3+s2}}=90\\degree \\div 3=30\\degree$.<br>`;
					texte_corr += `$\\widehat{${s1+s2+s3}}=2\\times\\widehat{${s1+s3+s2}}=2\\times 30\\degree=60\\degree$<br>`;
					texte_corr += `L'angle $\\widehat{${s1+s3+s2}}$ mesure $30\\degree$ et l'angle $\\widehat{${s1+s2+s3}}$ mesure $60\\degree$.`;
				
					break ;
				case 7 :// cas non aléatoires triangle rectangle 18,72,90
				texte = `$${s1+s2+s3}$ est un triangle rectangle en $${s1}$. L'angle $\\widehat{${s1+s3+s2}}$ mesure le quart de l'angle $\\widehat{${s1+s2+s3}}$.<br>Quelles sont les mesures des angles $\\widehat{${s1+s2+s3}}$ et $\\widehat{${s1+s3+s2}}$ ?`;
				if (this.correction_detaillee) {
					texte_corr += `Comme $\\widehat{${s1+s2+s3}}=\\dfrac{\\widehat{${s1+s3+s2}}}{4}$, on a $\\widehat{${s1+s3+s2}}=4\\times\\widehat{${s1+s2+s3}}$.<br>`;
					texte_corr += `De plus $\\widehat{${s1+s2+s3}}$ et $\\widehat{${s1+s3+s2}}$ sont complémentaires.<br>`;
					texte_corr += `D'où : $4 \\times \\widehat{${s1+s2+s3}} + \\widehat{${s1+s2+s3}}=90\\degree$.<br>D'où `;
					texte_corr += ` $5 \\times \\widehat{${s1+s2+s3}}=90\\degree$.<br>D'où `;
				}
				texte_corr += `$\\widehat{${s1+s2+s3}}=90\\degree \\div 5=18\\degree$.<br>`;
				texte_corr += `$\\widehat{${s1+s3+s2}}=4\\times\\widehat{${s1+s2+s3}}=4\\times 18\\degree=72\\degree$.<br>`;
				texte_corr += `L'angle $\\widehat{${s1+s3+s2}}$ mesure $72\\degree$ et l'angle $\\widehat{${s1+s2+s3}}$ mesure $18\\degree$.`;
					break ;
				case 8 :// cas non aléatoires triangle rectangle 15,75,90
				texte = `$${s1+s2+s3}$ est un triangle rectangle en $${s1}$. L'angle $\\widehat{${s1+s2+s3}}$ est cinq fois plus grand que l'angle $\\widehat{${s1+s3+s2}}$.<br>Quelles sont les mesures des angles $\\widehat{${s1+s2+s3}}$ et $\\widehat{${s1+s3+s2}}$ ?`;
				if (this.correction_detaillee) {
					texte_corr += `$\\widehat{${s1+s2+s3}}=5\\times\\widehat{${s1+s3+s2}}$ et comme $\\widehat{${s1+s2+s3}}$ et $\\widehat{${s1+s3+s2}}$ sont complémentaires,<br>`;
					texte_corr += ` on a : $5 \\times \\widehat{${s1+s3+s2}} + \\widehat{${s1+s3+s2}}=90\\degree$.<br>D'où `;
					texte_corr += ` $6 \\times \\widehat{${s1+s3+s2}}=90\\degree$.<br>D'où `;
				}
				texte_corr += `$\\widehat{${s1+s3+s2}}=90\\degree \\div 6=15\\degree$<br>`;
				texte_corr += `$\\widehat{${s1+s2+s3}}=5\\times\\widehat{${s1+s3+s2}}=5\\times 15\\degree=75\\degree$<br>`;
				texte_corr += `L'angle $\\widehat{${s1+s3+s2}}$ mesure $15\\degree$ et l'angle $\\widehat{${s1+s2+s3}}$ mesure $75\\degree$.`;
				break ;
				case 9 : //cas non aléatoire triangle équilatéral
					texte = `$${s1+s2+s3}$ est un triangle dont les trois angles sont égaux. Quelles sont les mesures de ses angles ?`;
					if (this.correction_detaillee) {
						texte_corr += `De plus, $\\widehat{${s1+s2+s3}}=\\widehat{${s1+s3+s2}}=\\widehat{${s2+s1+s3}}$<br>`
						texte_corr += `D'où $3\\times\\widehat{${s1+s2+s3}}=180\\degree$.<br>`;
						texte_corr += `D'où : $\\widehat{${s1+s2+s3}}=180\\degree\\div 3=60\\degree$.<br>`;
					}	
					texte_corr += `On a donc $\\widehat{${s1+s2+s3}}=\\widehat{${s1+s3+s2}}=\\widehat{${s2+s1+s3}}=60\\degree$.<br>`;
					texte_corr += `Le triangle $${s1+s2+s3}$ est un triangle équilatéral.`
					break ;
				case 10 : //cas non aléatoire triangle rectangle 22.5, 67.5,90
				texte = `$${s1+s2+s3}$ est un triangle rectangle en $${s1}$. L'angle $\\widehat{${s1+s3+s2}}$ mesure le tiers de l'angle $\\widehat{${s1+s2+s3}}$.<br>Quelles sont les mesures des angles $\\widehat{${s1+s2+s3}}$ et $\\widehat{${s1+s3+s2}}$ ?`;
				if (this.correction_detaillee) {
					texte_corr += `Comme $\\widehat{${s1+s2+s3}}=\\dfrac{\\widehat{${s1+s3+s2}}}{3}$, on a $\\widehat{${s1+s3+s2}}=3\\times\\widehat{${s1+s2+s3}}$.<br>`;
					texte_corr += `De plus $\\widehat{${s1+s2+s3}}$ et $\\widehat{${s1+s3+s2}}$ sont complémentaires.<br>`;
					texte_corr += `D'où : $3 \\times \\widehat{${s1+s2+s3}} + \\widehat{${s1+s2+s3}}=90\\degree$.<br>D'où `;
					texte_corr += ` $4 \\times \\widehat{${s1+s2+s3}}=90\\degree$.<br>D'où `;
				}
				texte_corr += `$\\widehat{${s1+s2+s3}}=90\\degree \\div 4=22,5\\degree$.<br>`;
				texte_corr += `$\\widehat{${s1+s3+s2}}=3\\times\\widehat{${s1+s2+s3}}=3\\times 22,5\\degree=67,5\\degree$<br>`;
				texte_corr += `L'angle $\\widehat{${s1+s3+s2}}$ mesure $37,5\\degree$ et l'angle $\\widehat{${s1+s2+s3}}$ mesure $22,5\\degree$.`;
					break ;
				
			}
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	// this.besoin_formulaire_case_a_cocher = ['Correction détaillée'];
}

/**
* @auteur Jean-Claude Lhote
*/
 function Calculer_des_frequences(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Calculer des fréquences";
	this.consigne = "";
	this.nb_questions = 1;
	this.spacing = 1;
	this.spacing_corr = 1.5;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;	 
	this.sup=1;

	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
	
		for (let i = 0, nombre_des, nombre_faces, nombre_tirages,index_valeur,frequence,tirages, texte,texte_corr, cpt = 0; i < this.nb_questions && cpt<50;){
		if (this.sup==1) { // ici on lance des dés
			nombre_des=randint(1,2);
			nombre_faces=choice([4,6,8,10]);
			nombre_tirages=choice([50,100,200,500,1000]);
			tirages=tirer_les_des(nombre_tirages,nombre_faces,nombre_des); // on récupère une série rangée dans l'ordre croissant avec les effectifs correspondants
			do index_valeur=randint(0,tirages.length-1);
			while (tirages[index_valeur][1]==0) // on choisi au hasard l'index d'une valeur dont l'effectif est différent de 0.
			if (nombre_des>1) {
				texte=`On a réalisé $${nombre_tirages}$ lancers de $${nombre_des}$ dés à $${nombre_faces}$ faces.<br>`;
			}
			else {
				texte=`On a réalisé $${nombre_tirages}$ lancers d'un dé à $${nombre_faces}$ faces.<br>`;
			}
			texte+='Les résultats sont inscrits dans le tableau ci-dessous :<br><br>'
			if (tirages.length>12) {
				texte+='$\\def\\arraystretch{1.5}\\begin{array}{|c';  // construction du tableau des effectifs 1/2
				for (let j=0;j<=Math.round(tirages.length/2);j++)		texte+='|c';
				texte+='}\\hline  \\text{Scores}';
				for (let j=0;j<Math.round(tirages.length/2);j++) 		texte+='&'+tirages[j][0];
				texte+='\\\\\\hline \\text{Nombre d\'apparitions}'
				for (let j=0;j<Math.round(tirages.length/2);j++) 		texte+='&'+tirages[j][1];
				texte+='\\\\\\hline\\end{array}$<br><br>'

				texte+='$\\def\\arraystretch{1.5}\\begin{array}{|c';  // construction du tableau des effectifs 2/2
				for (let j=Math.round(tirages.length/2);j<=tirages.length;j++)		texte+='|c';
				texte+='}\\hline  \\text{Scores}';
				for (let j=Math.round(tirages.length/2);j<tirages.length;j++) 		texte+='&'+tirages[j][0];
				texte+='\\\\\\hline \\text{Nombre d\'apparitions}'
				for (let j=Math.round(tirages.length/2);j<tirages.length;j++) 		texte+='&'+tirages[j][1];
				texte+='\\\\\\hline\\end{array}$'
			}
			else {
				texte+='$\\def\\arraystretch{1.5}\\begin{array}{|c';  // construction du tableau des effectifs en un seul morceau
				for (let j=0;j<=tirages.length;j++)		texte+='|c';
				texte+='}\\hline  \\text{Scores}';
				for (let j=0;j<tirages.length;j++) 		texte+='&'+tirages[j][0];
				texte+='\\\\\\hline \\text{Nombre d\'apparitions}'
				for (let j=0;j<tirages.length;j++) 		texte+='&'+tirages[j][1];
				texte+='\\\\\\hline\\end{array}$'
			}

			texte+='<br><br> Calculer la fréquence de la valeur '+`$${calcul(nombre_des+index_valeur)}$.`
			texte_corr='La valeur '+`$${calcul(nombre_des+index_valeur)}$ apparaît `+`$${tirages[index_valeur][1]}$ fois.<br>Le nombre total de lancers est $${tex_nombre(nombre_tirages)}$.<br>`;
			texte_corr+='La fréquence de la valeur '+`$${calcul(nombre_des+index_valeur)}$`+' est '+`$${tex_fraction(tirages[index_valeur][1],tex_nombre(nombre_tirages))}=${tex_nombre(calcul(tirages[index_valeur][1]/nombre_tirages))}$<br>`;
			texte_corr+='Soit '+`$${tex_nombre(calcul(tirages[index_valeur][1]*100/nombre_tirages))}\\thickspace\\%$.`
		}
		else if (this.sup==2) { // ici on trie des notes
			nombre_notes=choice([8,10,12]);
			notes=liste_de_notes(nombre_notes,randint(0,7),randint(13,20));  // on récupère une liste de notes (série brute)
			index_valeur=randint(0,notes.length-1);  // on choisi une des notes au hasard
			frequence=0;
			for(j=0;j<notes.length;j++) {   // frequence va contenir l'effectif de la note choisie
				if (notes[j]==notes[index_valeur]) frequence++;
			}
			texte=`${prenom()} a obtenu ces notes ce trimestre-ci en mathématiques :<br>`;
			texte+=`$${notes[0]}$`
			for (let j=1;j<nombre_notes-1;j++) 	texte+=`; $${notes[j]}$ `;	// On liste les notes (série brute)
			texte+=`et $${notes[nombre_notes-1]}$.`;

			texte+=`<br><br>Calculer la fréquence de la note $${notes[index_valeur]}$.`
			texte_corr=`La note $${notes[index_valeur]}$ a été obtenue $${frequence}$ fois.<br> Il y a $${nombre_notes}$ notes<br>`;
			texte_corr+=`Donc la fréquence de la note $${notes[index_valeur]}$ est : `+`$${tex_fraction(tex_nombre(frequence),tex_nombre(nombre_notes))}$`;
			if (arrondi(frequence/nombre_notes,3)==frequence/nombre_notes) {  // valeurs exactes
				texte_corr+=`$=${arrondi_virgule(frequence/nombre_notes,3)}$<br>`;	// fréquence à 3 chiffres significatifs
				texte_corr+='Soit '+`$${tex_nombre(calcul(frequence*100/nombre_notes))}\\thickspace\\%$.` // fréquence en pourcentage avec 1 décimale
			}
			else {
				texte_corr+=`$\\approx${arrondi_virgule(frequence/nombre_notes,3)}$`  // valeurs arrondies
				texte_corr+='Soit environ '+`$${arrondi_virgule(calcul(frequence*100/nombre_notes),1)}\\thickspace\\%$.`		
			}
			
		}
		else {  // ici on relève des températures
			let mois=randint(1,12);
			let annee=randint(1980,2019);
			let temperatures_de_base=[3,5,9,13,19,24,26,25,23,18,10,5];
			nombre_temperatures=jours_par_mois(mois);
			temperatures=un_mois_de_temperature(temperatures_de_base[mois-1],mois,annee); // on récupère une série de température correspondant à 1 mois d'une année (série brute)
			index_valeur=randint(0,temperatures.length-1);  // on choisi l'index d'une valeur au hasard
			frequence=0;
			for(j=0;j<temperatures.length;j++) {
				if (temperatures[j]==temperatures[index_valeur]) frequence++;  // frequence contient l'effectif de cette valeur
			}
			texte=`En ${nom_du_mois(mois)} ${annee}, à ${choice(['Moscou','Berlin','Paris','Bruxelles','Rome','Belgrade'])}, on a relevé les températures suivantes<br>`;

			texte+='$\\def\\arraystretch{1.5}\\begin{array}{|c'; // On construit le tableau des températures
			texte+='|c';
			for (let j=0;j<Math.round(temperatures.length/2);j++) texte+='|c';
			texte+='}\\hline  \\text{Jour}';
			for (let j=0;j<Math.round(temperatures.length/2);j++)  texte+='&'+tex_nombre(j+1);
			texte+='\\\\\\hline \\text{Température\\thickspace en} \\thickspace ^\\circ\\text{C}';
			for (j=0;j<Math.round(temperatures.length/2);j++) 	texte+='&'+temperatures[j];
			texte+='\\\\\\hline\\end{array}$<br><br>';
			texte+='$\\def\\arraystretch{1.5}\\begin{array}{|c'; // On construit le tableau des températures
			texte+='|c';
			for (let j=Math.round(temperatures.length/2);j<temperatures.length;j++) texte+='|c';
			texte+='}\\hline  \\text{Jour}';
			for (let j=Math.round(temperatures.length/2);j<temperatures.length;j++)  texte+='&'+tex_nombre(j+1);
			texte+='\\\\\\hline \\text{Température\\thickspace en} \\thickspace ^\\circ\\text{C}';
			for (j=Math.round(temperatures.length/2);j<temperatures.length;j++) 	texte+='&'+temperatures[j];
			texte+='\\\\\\hline\\end{array}$';
			

			texte+='<br><br>Calculer la fréquence de la température '+`$${temperatures[index_valeur]}^\\circ\\text{C}$.`;
			texte_corr=`En ${nom_du_mois(mois)} ${annee}, à ${choice(['Moscou','Berlin','Paris','Bruxelles','Rome','Belgrade'])}, la température $${temperatures[index_valeur]}^\\circ\\text{C}$ a été relevée $${frequence}$ fois.<br>`;
			texte_corr+=`Il y a $${jours_par_mois(mois)}$ jours ce mois-ci.<br> La fréquence de la température $${temperatures[index_valeur]}^\\circ\\text{C}$ est :<br>`;
			texte_corr+=`$${tex_fraction(tex_nombre(frequence),tex_nombre(jours_par_mois(mois)))}$`;
			if (arrondi(frequence/nombre_temperatures,3)==frequence/nombre_temperatures) {	// valeurs exactes
				texte_corr+=`$=${arrondi_virgule(frequence/nombre_temperatures,3)}$<br>`;
				texte_corr+='Soit '+`$${tex_nombre(calcul(frequence*100/nombre_temperatures))}\\thickspace\\%$.`

			}
			else {
				texte_corr+=`$\\approx${arrondi_virgule(frequence/nombre_temperatures,3)}$<br>`; // valeurs arrondies
				texte_corr+='Soit environ '+`$${arrondi_virgule(calcul(frequence*100/nombre_temperatures),1)}\\thickspace\\%$.`
			}
		}			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Type de séries',3,"1 : Lancers de dés \n 2 : Liste de notes\n 3 : Un mois de températures"];
}
 /**
* @auteur Jean-Claude Lhote
*/
function Calculer_des_moyennes(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Calculer des moyennes";
	this.consigne = "";
	this.nb_questions = 1;
	this.spacing = 1;
	this.spacing_corr = 1.5;
	this.nb_cols_corr = 1;	
	this.nb_cols=1;  
	this.sup = 1;

	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
	
		for (let i = 0, nombre_notes,notes,somme,nombre_temperatures,temperatures, texte,texte_corr, cpt = 0; i < this.nb_questions && cpt<50;){
		if (this.sup==1) { // ici on trie des notes
			nombre_notes=choice([8,10,12]);
			notes=liste_de_notes(nombre_notes,randint(0,7),randint(13,20)); // on récupère une série de notes (série brute)
			for (somme=0,j=0;j<nombre_notes;j++) somme+=notes[j];
		
			texte=`${prenom()} a obtenu ces notes ce trimestre-ci en mathématiques :<br>`;
			texte+=`$${notes[0]}$`
			for (let j=1;j<nombre_notes-1;j++) 	texte+=`; $${notes[j]}$ `;	// On liste les notes
			texte+=`et $${notes[nombre_notes-1]}$.<br>`;
			texte+=`Calculer la moyenne de cet élève en mathématiques.`
			texte_corr=`La somme des notes est : $${somme}$.<br> Il y a $${nombre_notes}$ notes<br>`;
			texte_corr+='Donc la moyenne de cet élève est : '+`$${tex_fraction(tex_nombre(somme),tex_nombre(nombre_notes))}$`;
			if (arrondi(somme/nombre_notes,2)==somme/nombre_notes) texte_corr+=`$=${arrondi_virgule(somme/nombre_notes,2)}$<br>`; // moyenne exacte
			else texte_corr+=`$\\approx${arrondi_virgule(somme/nombre_notes,2)}$`	// moyenne arrondie
		}
		else {  // ici on relève des températures
			let mois=randint(1,12);
			let annee=randint(1980,2019);
			let temperatures_de_base=[3,5,9,13,19,24,26,25,23,18,10,5];
			nombre_temperatures=jours_par_mois(mois);
			temperatures=un_mois_de_temperature(temperatures_de_base[mois-1],mois,annee); // série brute de un mois de température
			somme=0;
			texte=`En ${nom_du_mois(mois)} ${annee}, à ${choice(['Moscou','Berlin','Paris','Bruxelles','Rome','Belgrade'])}, on a relevé les températures suivantes<br>`;
			texte+='$\\def\\arraystretch{1.5}\\begin{array}{|c'; // tableau des températures 1/2
			texte+='|c';
			for (let j=0;j<Math.round(temperatures.length/2);j++) texte+='|c';
			texte+='}\\hline  \\text{Jour}';
			for (let j=0;j<Math.round(temperatures.length/2);j++)  texte+='&'+tex_nombre(j+1)
			texte+='\\\\\\hline \\text{Température\\thickspace en} \\thickspace ^\\circ\\text{C}'
			for (j=0;j<Math.round(temperatures.length/2);j++) 	{
				texte+='&'+temperatures[j];
				somme+=temperatures[j];
			}
			texte+='\\\\\\hline\\end{array}$<br><br>';
			texte+='$\\def\\arraystretch{1.5}\\begin{array}{|c'; // tableau des températures 2/2
			texte+='|c';
			for (let j=Math.round(temperatures.length/2);j<temperatures.length;j++) texte+='|c';
			texte+='}\\hline  \\text{Jour}';
			for (let j=Math.round(temperatures.length/2);j<temperatures.length;j++)  texte+='&'+tex_nombre(j+1)
			texte+='\\\\\\hline \\text{Température\\thickspace en} \\thickspace ^\\circ\\text{C}'
			for (j=Math.round(temperatures.length/2);j<temperatures.length;j++) 	{
				texte+='&'+temperatures[j];
				somme+=temperatures[j];
			}
			texte+='\\\\\\hline\\end{array}$<br><br>';
			

			texte+='Calculer la température moyenne de ce mois.';
			texte_corr=`En ${nom_du_mois(mois)} ${annee}, la somme des températures est `+`$${somme}^\\circ\\text{C}$.<br> Il y a $${temperatures.length}$ jours ce mois-ci.<br> La température moyenne est :<br>`;
			texte_corr+=`$${tex_fraction(tex_nombre(somme)+`^\\circ\\text{C}`,tex_nombre(nombre_temperatures))}$`
		
			if (arrondi(somme/nombre_temperatures,2)==somme/nombre_temperatures)  
				texte_corr+=`$=${arrondi_virgule(somme/nombre_temperatures,2)}^\\circ\\text{C}$`; // moyenne exacte
			else 				texte_corr+=`$\\approx${arrondi_virgule(somme/nombre_temperatures,2)}^\\circ\\text{C}$`;  // moyenne arrondie
		}
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Type de séries',2,"1 : Série de notes\n 2 : Série de températures"];
}

 /**
* @auteur Jean-Claude Lhote
*/
function Calculer_des_etendues(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Calculer des étendues";
	this.consigne = "";
	this.nb_questions = 1;
	this.spacing = 1;
	this.spacing_corr = 1;
	this.nb_cols_corr = 1;	
	this.nb_cols=1; 
	this.sup = 1;

	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
	
		for (let i = 0, nombre_notes,notes,min,max,temperatures,nombre_temperatures, texte,texte_corr, cpt = 0; i < this.nb_questions && cpt<50;){
		if (this.sup==1) { // ici on trie des notes
			nombre_notes=randint(8,12);
			notes=liste_de_notes(nombre_notes,randint(0,7),randint(13,20)); // on récupère une série de notes (série brute)
			for (min=20,max=0,j=0;j<nombre_notes;j++) {  // On cherche la note minimum et la note maximum
				min=Math.min(notes[j],min);
				max=Math.max(notes[j],max);
			}
			texte=`${prenom()} a obtenu ces notes ce trimestre-ci en mathématiques :<br>`;
			texte+=`$${notes[0]}$`
			for (let j=1;j<nombre_notes-1;j++) 	texte+=`; $${notes[j]}$ `;	// On liste les notes
			texte+=`et $${notes[nombre_notes-1]}$.<br>`;
			texte+=`Calculer l\'étendue de cette série de notes.`
			texte_corr=`La note la plus basse est : $${min}$.<br>La note la plus haute est $${max}$<br>`;
			texte_corr+='Donc l\'étendue de cette série est : '+`$${tex_nombre(max)}-${tex_nombre(min)}=${tex_nombre(max-min)}$`;
		}
		else {  // ici on relève des températures
			let mois=randint(1,12);
			let annee=randint(1980,2019);
			let temperatures_de_base=[3,5,9,13,19,24,26,25,23,18,10,5];
			nombre_temperatures=jours_par_mois(mois);
			temperatures=un_mois_de_temperature(temperatures_de_base[mois-1],mois,annee); // série brute de un mois de température
			max=0;
			min=20;
			texte=`En ${nom_du_mois(mois)} ${annee}, à ${choice(['Moscou','Berlin','Paris','Bruxelles','Rome','Belgrade'])}, on a relevé les températures suivantes<br>`;
			
			texte+='$\\def\\arraystretch{1.5}\\begin{array}{|c'; // tableau des températures 1/2
			texte+='|c';
			for (let j=0;j<Math.round(temperatures.length/2);j++) texte+='|c';
			texte+='}\\hline  \\text{Jour}';
			for (let j=0;j<Math.round(temperatures.length/2);j++)  	texte+='&'+tex_nombre(j+1)
			texte+='\\\\\\hline \\text{Température\\thickspace en} \\thickspace ^\\circ\\text{C}'
			for (j=0;j<Math.round(temperatures.length/2);j++) 	{  // on cherche le minimum et le maximum
				texte+='&'+temperatures[j];
				min=Math.min(temperatures[j],min);
				max=Math.max(temperatures[j],max);
			}
			texte+='\\\\\\hline\\end{array}$<br><br>';

			texte+='$\\def\\arraystretch{1.5}\\begin{array}{|c'; // tableau des températures 2/2
			texte+='|c';
			for (let j=Math.round(temperatures.length/2);j<temperatures.length;j++) texte+='|c';
			texte+='}\\hline  \\text{Jour}';
			for (let j=Math.round(temperatures.length/2);j<temperatures.length;j++)  	texte+='&'+tex_nombre(j+1)
			texte+='\\\\\\hline \\text{Température\\thickspace en} \\thickspace ^\\circ\\text{C}'
			for (j=Math.round(temperatures.length/2);j<temperatures.length;j++) 	{  // on cherche le minimum et le maximum
				texte+='&'+temperatures[j];
				min=Math.min(temperatures[j],min);
				max=Math.max(temperatures[j],max);
			}
			texte+='\\\\\\hline\\end{array}$<br><br>';

			texte+='Calculer l\'amplitude thermique de ce mois (l\'étendue de la série).';
			texte_corr=`En ${nom_du_mois(mois)} ${annee}, la température minimale est `+`$${min}^\\circ\\text{C}$.<br>La température maximale est $${max}^\\circ\\text{C}$.<br> L\'amplitude thermique est :<br>`;
			texte_corr+=`$${tex_nombre(max)}-${ecriture_parenthese_si_negatif(min)}$`
			if (min<0) 	texte_corr+=`$\\thickspace~=${tex_nombre(max)}+${tex_nombre(-min)}$`;
			texte_corr+=`$\\thickspace=${tex_nombre(max-min)}^\\circ\\text{C}$`;

		}
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Type de séries',2,"1 : Série de notes\n 2 : Série de températures"];
}

/**
* Calculer +/- 20, 30, 40 ou 60 %
* @Auteur Rémi Angot
*/
function Variation_en_pourcentages(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Variation en pourcentages";
	this.consigne = "Calculer le nouveau prix";
	this.nb_questions = 5;
	this.spacing = 2;
	this.spacing_corr = 2;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		for (let i = 0, prix, taux, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt<50;){
			prix = choice([randint(2,9),randint(1,9)*10,randint(1,9)*100,Algebrite.eval(randint(11,99)/10)]);
			// X | X0 | X00 | X,X0
			taux = choice([20,30,40,60]);
			if (choice([true,false])) {
				if (sortie_html) {
					texte = `Un article coûtait ${tex_prix(prix)} € et son prix diminue de ${taux} \%.`	
				} else {
					texte = `Un article coûtait ${tex_prix(prix)} € et son prix diminue de ${taux}~\\%.`	
				}
				
				texte_corr = `$\\text{Diminution : }${tex_fraction(taux,100)}\\times ${tex_prix(prix)} = ${tex_prix(Algebrite.eval(prix*taux))}\\div100=${tex_prix(Algebrite.eval(prix*taux/100))}$ €`
				texte_corr += `<br>`
				texte_corr += `$\\text{Nouveau prix : }${tex_prix(prix)}-${tex_prix(Algebrite.eval(prix*taux/100))}=${tex_prix(Algebrite.eval(prix-prix*taux/100))}$ €`
			} else {
				if (sortie_html) {
					texte = `Un article coûtait ${tex_prix(prix)} € et son prix augmente de ${taux} \%.`
				} else {
					texte = `Un article coûtait ${tex_prix(prix)} € et son prix augmente de ${taux}~\\%.`

				}
				texte_corr = `$\\text{Augmentation : }${tex_fraction(taux,100)}\\times ${tex_prix(prix)}= ${tex_prix(Algebrite.eval(prix*taux))}\\div100=${tex_prix(Algebrite.eval(prix*taux/100))}$ €`
				texte_corr += `<br>`
				texte_corr += `$\\text{Nouveau prix : }${tex_prix(prix)}+${tex_prix(Algebrite.eval(prix*taux/100))}=${tex_prix(Algebrite.eval(prix*(1+taux/100)))}$ €`
			}
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
}
/**
* Écrire une expression littérale à partir d'une phrase : 
* * Double, triple, moitié, tiers, quart
* * Successeur, prédécesseur
* * Carré, cube, opposé, inverse
* * Somme, produit, quotient
* * Nombre pair, nombre impair, multiple d'un nombre donné
* @Auteur Rémi Angot
*/
function Ecrire_une_expression_litterale(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Écrire une expression littérale";
	this.consigne = "";
	this.nb_questions = 4;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = range1(17)
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

		for (let i = 0, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) {
			let lettres_disponibles = ['x','y','z','t','a','b','c','n','m']
			let x = choice(lettres_disponibles)
			enleve_element(lettres_disponibles,x)
			let y = choice(lettres_disponibles)
			let k = randint(2,10)
			switch (liste_type_de_questions[i]){
				case 1 : // 2x
					texte = `Exprimer le double de $${x}$ en fonction de $${x}$.`
					texte_corr = `Le double de $${x}$ se note : $2${x}$.`
					break ;
				case 2 : // 3x
					texte = `Exprimer le triple de $${x}$  en fonction de $${x}$.`
					texte_corr = `Le triple de $${x}$  se note : $3${x}$.`
					break ;
				case 3 : // x/2
					texte = `Exprimer la moitié de $${x}$ en fonction de $${x}$.`
					texte_corr = `La moitié de $${x}$  se note :  $${tex_fraction(x,2)}=${x}\\div2=0,5${x}$.`
					break ;
				case 4 : // x/4
					texte = `Exprimer le quart de $${x}$  en fonction de $${x}$.`
					texte_corr = `Le quart de $${x}$  se note :  $${tex_fraction(x,4)}=${x}\\div4=0,25${x}$.`
					break ;
				case 5 : // x+1
					texte = `$${x}$ étant un nombre entier, exprimer l'entier suivant en fonction de $${x}$.`
					texte_corr = `Le successeur de $${x}$ se note :  $${x}+1$.`
					break ;
				case 6 : // x-1
					texte = `$${x}$ étant un nombre entier, exprimer l'entier précédent en fonction de $${x}$.`
					texte_corr = `Le prédecesseur de $${x}$  se note :  $${x}-1$.`
					break ;
				case 6 : // x^2
					texte = `Exprimer le carré de $${x}$  en fonction de $${x}$.`
					texte_corr = `Le carré de $${x}$  se note : $${x}^2$.`
					break ;
				case 7 : // x^3
					texte = `Exprimer le cube de $${x}$  en fonction de $${x}$.`
					texte_corr = `Le cube de $${x}$  se note : $${x}^3$.`
					break ;
				case 8 : // -x
					texte = `Exprimer l'opposé de $${x}$  en fonction de $${x}$.`
					texte_corr = `L'opposé de $${x}$  se note : $-${x}$.`
					break ;
				case 9 : // 1/x
					texte = `Exprimer l'inverse de $${x}$  en fonction de $${x}$.`
					texte_corr = `L'inverse de $${x}$ se note : $${tex_fraction(1,x)}$.`
					break ;
				case 10 : // x+k
					texte = `Exprimer la somme de $${x}$ et ${k} en fonction de $${x}$.`
					texte_corr = `La somme de $${x}$ et ${k} se note : $${x}+${k}$.`
					break ;
				case 11 : // kx
					texte = `Exprimer le produit de $${x}$  par ${k} en fonction de $${x}$.`
					texte_corr = `Le produit de $${x}$ par ${k} se note : $${k}${x}$.`
					break ;
				case 12 : // x/k
					texte = `Exprimer le quotient de $${x}$ par ${k} en fonction de $${x}$.`
					texte_corr = `Le quotient de $${x}$ par ${k} se note : $${tex_fraction(x,k)}$.`
					break ;
				case 13 : // k/x
					texte = `Exprimer le quotient de ${k} par $${x}$ en fonction de $${x}$.`
					texte_corr = `Le quotient de ${k} par $${x}$ se note : $${tex_fraction(k,x)}$.`
					break ;
				case 14 : //xy
					texte = `Comment se note le produit de $${x}$ par $${y}$ ?`
					texte_corr = `Le produit de $${x}$ par $${y}$ se note $${x}${y}$.`
					break ;
				case 15 : //pair
					texte = `Écrire une expression littérale qui permet de représenter un nombre pair.`
					texte_corr = `Un nombre pair peut s'écrire sous la forme $2n$ avec $n$ un entier naturel.`
					break ; 
				case 16 : //impair
					texte = `Écrire une expression littérale qui permet de représenter un nombre impair.`
					texte_corr = `Un nombre impair peut s'écrire sous la forme $2n+1$ avec $n$ un entier naturel.`
					break ;
				case 17 : //multiple de k
					texte = `Écrire une expression littérale qui permet de représenter un multiple de ${k}.`
					texte_corr = `Un multiple de ${k} peut s'écrire sous la forme $${k}n$ avec $n$ un entier naturel.`
					break ; 

			}
			
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	//this.besoin_formulaire_case_a_cocher = ["Uniquement la lettre $n$."]

}

/**
* Traduire un programme de calcul par une expression littérale de la forme ax+b après simplification
* @Auteur Rémi Angot
*/
function Traduire_un_programme_de_calcul(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Traduire un programme de calcul par une expression littérale";
	this.consigne = "";
	this.nb_questions = 3;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing_corr = 2;

	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = [1,2,3,4,5,6]
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

		for (let i = 0, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) {
			let a = randint(4,11)
			let b = randint(2,11)
			let c = randint(2,11)
			let d = randint(2,5)
			switch (liste_type_de_questions[i]){
				case 1 : // (x+a)*b+c
					texte = `Voici un programme de calcul : \n`
					texte += itemize([`Ajoute ${a}`,`Multiplie par ${b}`,`Ajoute ${c}`])
					texte += `Si on note $x$ le nombre de départ, quel est le résultat du programme de calcul ?`
					texte_corr = `$x\\xrightarrow{+${a}} x+${a}\\xrightarrow{\\times ${b}}(x+${a})\\times ${b}=${b}x+${a*b}\\xrightarrow{+${c}}${b}x+${a*b+c}$`
					texte_corr += '<br>'
					texte_corr += `Le résultat du programme est donc $${b}x+${a*b+c}$.`
					break ;
				case 2 : // (ax+b)*c
					texte = `Voici un programme de calcul : \n`
					texte += itemize([`Multiplie par ${a}`,`Ajoute ${b}`,`Multiplie par ${c}`])
					texte += `Si on note $y$ le nombre de départ, quel est le résultat du programme de calcul ?`
					texte_corr = `$y\\xrightarrow{\\times ${a}} ${a}y\\xrightarrow{+${b}}${a}y+${b} \\xrightarrow{\\times ${c}}(${a}y+${b})\\times${c}=${a*c}y+${b*c}$`
					texte_corr += '<br>'
					texte_corr += `Le résultat du programme est donc $${a*c}y+${b*c}$.`
					break ;
				case 3 : // ax+b-2x
					texte = `Voici un programme de calcul : \n`
					texte += itemize([`Multiplie par ${a}`,`Ajoute ${b}`,`Enlève le double du nombre de départ`])
					texte += `Si on note $a$ le nombre de départ, quel est le résultat du programme de calcul ?`
					texte_corr = `$a\\xrightarrow{\\times ${a}} ${a}a\\xrightarrow{+${b}}${a}a+${b} \\xrightarrow{-2a}${a}a+${b}-2a=${a-2}a+${b}$`
					texte_corr += '<br>'
					texte_corr += `Le résultat du programme est donc $${a-2}a+${b}$.`
					break ;
				case 4 : // ax+b+3x
					texte = `Voici un programme de calcul : \n`
					texte += itemize([`Multiplie par ${a}`,`Ajoute ${b}`,`Ajoute le triple du nombre de départ`])
					texte += `Si on note $t$ le nombre de départ, quel est le résultat du programme de calcul ?`
					texte_corr = `$t\\xrightarrow{\\times ${a}} ${a}t\\xrightarrow{+${b}}${a}t+${b} \\xrightarrow{+3t}${a}t+${b}+3t=${a+3}t+${b}$`
					texte_corr += '<br>'
					texte_corr += `Le résultat du programme est donc $${a+3}t+${b}$.`
					break ;
				case 5 : // (ax+b)*c-d
					texte = `Voici un programme de calcul : \n`
					texte += itemize([`Multiplie par ${a}`,`Ajoute ${b}`,`Multiplie par ${c}`,`Enlève ${d}`])
					texte += `Si on note $x$ le nombre de départ, quel est le résultat du programme de calcul ?`
					texte_corr = `$x\\xrightarrow{\\times ${a}} ${a}x\\xrightarrow{+${b}}${a}x+${b} \\xrightarrow{\\times ${c}}(${a}x+${b})\\times ${c}=${a*c}x+${b*c}\\xrightarrow{-${d}}${a*c}x+${b*c-d}$`
					texte_corr += '<br>'
					texte_corr += `Le résultat du programme est donc $${a*c}x+${b*c-d}$.`
					break ;
				case 6 : // (ax+b)*c+x
					texte = `Voici un programme de calcul : \n`
					texte += itemize([`Multiplie par ${a}`,`Ajoute ${b}`, `Multiplie par ${c}`,`Ajoute le nombre de départ`])
					texte += `Si on note $y$ le nombre de départ, quel est le résultat du programme de calcul ?`
					texte_corr = `$y\\xrightarrow{\\times ${a}} ${a}y\\xrightarrow{+${b}}${a}y+${b} \\xrightarrow{\\times ${c}}(${a}y+${b})\\times ${c}=${a*c}y+${b*c}\\rightarrow ${a*c}y+${b*c}+y=${a*c+1}y+${b*c}$`
					texte_corr += '<br>'
					texte_corr += `Le résultat du programme est donc $${a*c+1}y+${b*c}$.`
					break ;
			}
			
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				if (est_diaporama) {
					texte = texte.replace(', quel est le résultat du programme de calcul ?',',<br> quel est le résultat de ce programme ?')
				}
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	//this.besoin_formulaire_case_a_cocher = true;
}


/**
* Calculer la valeur d'une expression littérale
* 
* * ax+b
* * a(x+b)
* * x^2+y^2
* * x^2-y^2
* * ax^2+b(x-1)+cy^3
* * ax^2+bx+c
* * ax^2+bx-c
* * ax^2-bx+c
* * axy+x+y
* * (ax+b)(cy-d)
* @Auteur Rémi Angot
*/
function Calculer_la_valeur_d_une_expression_litterale(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Calculer la valeur d'une expression littérale";
	this.consigne = "";
	this.nb_questions = 5;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = range1(10)
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

		for (let i = 0, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) {
			let a, b, c, d, x, y
			switch (liste_type_de_questions[i]){
				case 1 : // ax+b
					a = randint(2,10)
					x = randint(2,10,a)
					b = randint(1,10,[a,x])
					texte = `Calculer $${a}x+${b}$ pour $x=${x}$.`
					texte_corr = `Pour $x=${x}$ : <br>`
					texte_corr += `$${a}x+${b}=${a}\\times${x}+${b}=${a*x}+${b}=${a*x+b}$`
					break ;
				case 2 : // a(x+b)
					a = randint(2,10)
					x = randint(2,10,a)
					b = randint(1,10,[a,x])
					texte = `Calculer $${a}(x+${b})$ pour $x=${x}$.`
					texte_corr = `Pour $x=${x}$ : <br>`
					texte_corr += `$${a}(x+${b})=${a}\\times(${x}+${b})=${a}\\times${x+b}=${a*(x+b)}$`
					break ;
				case 3 : // x^2+y^2
					x = randint(2,10)
					y = randint(2,10)
					texte = `Calculer $x^2+y^2$ pour $x=${x}$ et $y=${y}$.`
					texte_corr = `Pour $x=${x}$ et $y=${y}$ : <br>`
					texte_corr += `$x^2+y^2=${x}^2+${y}^2=${x**2}+${y**2}=${x**2+y**2}$`
					break ;
				case 4 : // x^2-y^2
					x = randint(2,10)
					y = randint(1,x-1)
					texte = `Calculer $x^2-y^2$ pour $x=${x}$ et $y=${y}$.`
					texte_corr = `Pour $x=${x}$ et $y=${y}$ : <br>`
					texte_corr += `$x^2-y^2=${x}^2-${y}^2=${x**2}-${y**2}=${x**2-y**2}$`
					break ;
				case 5 : // ax^2+b(x-1)+cy^3
					a = randint(2,5)
					b = randint(2,6)
					c = randint(2,6)
					x = randint(3,6)
					y = choice([1,2,3,5,10])
					texte = `Calculer $${a}x^2+${b}(x-1)+${c}y^3$ pour $x=${x}$ et $y=${y}$.`
					texte_corr = `Pour $x=${x}$ et $y=${y}$ : <br>`
					texte_corr += `$${a}x^2+${b}(x-1)+${c}y^3=${a}\\times${x}^2+${b}(${x}-1)+${c}\\times${y}^3=${a}\\times${x**2}+${b}\\times${x-1}+${c}\\times${y**3}=${a*x**2+b*(x-1)+c*y**3}$.`
					break ;
				case 6 : // ax^2+bx+c
					a = randint(2,5)
					b = randint(2,6)
					c = randint(2,6)
					x = randint(3,6)
					texte = `Calculer $${a}x^2+${b}x+${c}$ pour $x=${x}$.`
					texte_corr = `Pour $x=${x}$ : <br>`
					texte_corr += `$${a}x^2+${b}x+${c}=${a}\\times${x}^2+${b}\\times${x}+${c}=${a}\\times${x**2}+${b*x}+${c}=${a*x**2+b*x+c}$`
					break ;
				case 7 : // ax^2+bx-c
					a = randint(2,5)
					b = randint(2,6)
					c = randint(2,6)
					x = randint(3,6)
					texte = `Calculer $${a}x^2+${b}x-${c}$ pour $x=${x}$.`
					texte_corr = `Pour $x=${x}$ : <br>`
					texte_corr += `$${a}x^2+${b}x-${c}=${a}\\times${x}^2+${b}\\times${x}-${c}=${a}\\times${x**2}+${b*x}-${c}=${a*x**2+b*x-c}$`
					break ;
				case 8 : // ax^2-bx+c
					a = randint(2,5)
					b = randint(2,a)
					c = randint(2,6)
					x = randint(3,6)
					texte = `Calculer $${a}x^2-${b}x+${c}$ pour $x=${x}$.`
					texte_corr = `Pour $x=${x}$ : <br>`
					texte_corr += `$${a}x^2-${b}x+${c}=${a}\\times${x}^2-${b}\\times${x}+${c}=${a}\\times${x**2}-${b*x}+${c}=${a*x**2-b*x+c}$`
					break ;
				
				case 9 : // axy+x+y
					a = randint(2,10)
					x = randint(2,10)
					y = randint(2,10,x)
					texte = `Calculer $${a}xy+x+y$ pour $x=${x}$ et $y=${y}$.`
					texte_corr = `Pour $x=${x}$ et $y=${y}$ : <br>`
					texte_corr += `$${a}xy+x+y=${a}\\times${x}\\times${y}+${x}+${y}=${a*x*y}+${x}+${y}=${a*x*y+x+y}$`
					break ;
				case 10 : // (ax+b)(cy-d)
					a = randint(2,10)
					x = randint(2,10)
					b = randint(1,10)
					y = randint(2,10,x)
					c = randint(2,10)
					d = randint(1,Math.min(10,c*y))
					texte = `Calculer $(${a}x+${b})(${c}y-${d})$ pour $x=${x}$ et $y=${y}$.`
					texte_corr = `Pour $x=${x}$ et $y=${y}$ : <br>`
					texte_corr += `$(${a}x+${b})(${c}y-${d})=(${a}\\times${x}+${b})(${c}\\times${y}-${d})=${a*x+b}\\times${c*y-d}=${(a*x+b)*(c*y-d)}$`
					break ;
				
			}
			
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	//this.besoin_formulaire_case_a_cocher = true;
}


/**
* Tester une égalité pour 2 valeurs données (une vraie et une fausse)
*
* * 3x-a=2x+b
* * 3x+a=5x-b
* * ax+b=(a+1)x-c
* * a-2x=b+2x
* @Auteur Rémi Angot
*/
function Tester_une_egalite(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Tester une égalité";
	this.consigne = "";
	this.nb_questions = 3;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = range1(5)
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

		for (let i = 0, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) {
			let a, b, x1, x2
			switch (liste_type_de_questions[i]){
				case 1 : // 3x-a=2x+b   x=a+b  
					a = randint(1,6)
					b = randint(1,6,a)
					x1 = randint(2,10,a+b)
					x2 = a + b
					texte = `Tester l'égalité $3x-${a}=2x+${b}$ pour $x=${x1}$ puis pour $x=${x2}$`
					texte_corr = `Pour $x=${x1}$ : <br>`
					texte_corr += `$3x-${a}=3\\times${x1}-${a}=${3*x1-a}$ <br> $2x+${b}=2\\times${x1}+${b}=${2*x1+b}$<br>`
					texte_corr += `$${3*x1-a}\\not=${2*x1+b}$ donc l'égalité n'est pas vraie.<br><br>`
					texte_corr += `Pour $x=${x2}$ : <br>`
					texte_corr += `$3x-${a}=3\\times${x2}-${a}=${3*x2-a}$ <br> $2x+${b}=2\\times${x2}+${b}=${2*x2+b}$<br>`
					texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.`
					break ;
				case 2 : // 3x+a=5x-b   x=(a+b)/2 donc a et b impairs pour une solution entière  
					a = choice([1,3,5,7,9])
					b = choice([1,3,5,7,9])
					x1 = parseInt(Algebrite.eval((a+b)/2))
					x2 = randint(1,9,x1)
					texte = `Tester l'égalité $3x+${a}=5x-${b}$ pour $x=${x1}$ puis pour $x=${x2}$`
					texte_corr = `Pour $x=${x1}$ : <br>`
					texte_corr += `$3x+${a}=3\\times${x1}+${a}=${3*x1+a}$ <br> $5x-${b}=5\\times${x1}-${b}=${5*x1-b}$<br>`
					texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.<br><br>`
					texte_corr += `Pour $x=${x2}$ : <br>`
					texte_corr += `$3x+${a}=3\\times${x2}+${a}=${3*x2+a}$ <br> $5x-${b}=5\\times${x2}-${b}=${5*x2-b}$<br>`
					texte_corr += `$${3*x2+a}\\not=${5*x2-b}$ donc l'égalité n'est pas vraie.`
					break ;
				case 3 : // 10(x-a)=4(2x+b) x=(10a+4b)/2
					a = randint(1,3)
					b = randint(1,3)
					x2 = parseInt(Algebrite.eval((10*a+4*b)/2))
					x1 = randint(1,9,x2)
					texte = `Tester l'égalité $10(x-${a})=4(2x+${b})$ pour $x=${x1}$ puis pour $x=${x2}$`
					texte_corr = `Pour $x=${x1}$ : <br>`
					texte_corr += `$10(x-${a})=10\\times(${x1}-${a})=10\\times${x1-a}=${10*(x1-a)}$ <br> $4(2x+${b})=4\\times(2\\times${x1}+${b})=4\\times${2*x1+b}=${4*(2*x1+b)}$<br>`
					texte_corr += `$${10*(x1-a)}\\not=${4*(2*x1+b)}$ donc l'égalité n'est pas vraie.<br><br>`
					texte_corr += `Pour $x=${x2}$ : <br>`
					texte_corr += `$10(x-${a})=10\\times(${x2}-${a})=10\\times${x2-a}=${10*(x2-a)}$ <br> $4(2x+${b})=4\\times(2\\times${x2}+${b})=4\\times${2*x2+b}=${4*(2*x2+b)}$<br>`
					texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.`
					break ;
				case 4 : // ax+b=(a+1)x-c x=b+c
					a = randint(2,9)
					b = randint(2,9)
					c = randint(1,3)
					x1 = b + c
					x2 = randint(2,10,x2)
					texte = `Tester l'égalité $${a}x+${b}=${a+1}x-${c}$ pour $x=${x1}$ puis pour $x=${x2}$`
					texte_corr = `Pour $x=${x1}$ : <br>`
					texte_corr += `$${a}x+${b}=${a}\\times${x1}+${b}=${a*x1+b}$ <br> $${a+1}x-${c}=${a+1}\\times${x1}-${c}=${(a+1)*x1-c}$<br>`
					texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.<br><br>`
					texte_corr += `Pour $x=${x2}$ : <br>`
					texte_corr += `$${a}x+${b}=${a}\\times${x2}+${b}=${a*x2+b}$ <br> $${a+1}x-${c}=${a+1}\\times${x2}-${c}=${(a+1)*x2-c}$<br>`
					texte_corr += `$${a*x2+b}\\not=${(a+1)*x2-c}$ donc l'égalité n'est pas vraie.`
					break ;
				case 5 : // a-2x=b+2x x=(a-b)/4
					x1 = randint(1,9)
					b = randint(1,9)
					a = b+4*x1
					x2 = randint(1,11,x1)
					texte = `Tester l'égalité $${a}-2x=${b}+2x$ pour $x=${x1}$ puis pour $x=${x2}$`
					texte_corr = `Pour $x=${x1}$ : <br>`
					texte_corr += `$${a}-2x=${a}-2\\times${x1}=${a-2*x1}$ <br> $${b}+2x=${b}+2\\times${x1}=${b+2*x1}$<br>`
					texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.<br><br>`
					texte_corr += `Pour $x=${x2}$ : <br>`
					texte_corr += `$${a}-2x=${a}-2\\times${x2}=${a-2*x2}$ <br> $${b}+2x=${b}+2\\times${x2}=${b+2*x2}$<br>`
					texte_corr += `$${a-2*x2}\\not=${b+2*x2}$ donc l'égalité n'est pas vraie.`
					break ;
				
				
			}
			
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	//this.besoin_formulaire_case_a_cocher = true;
}

/**
* Réduire une expression
*
* * ax+bx+c	
* * ax+b+x+c
* * ax^2+bx+c+dx^2+x
* * a+x+b+c+dx
* * ax+y+bx+c+dy
* * ax+b-cx
* @Auteur Rémi Angot
*/
function Reduire_une_expression_litterale(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Réduire une expression littérale";
	this.consigne = "Réduire les expressions suivantes";
	this.nb_questions = 5;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 9; // valeur maximale des coefficients
	this.sup2 = false; // avec des nombres décimaux

	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = range1(7)
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

		for (let i = 0, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) {
			let a, b, c, d
			if (this.sup2) {
						a = calcul(randint(2,this.sup)+randint(1,9)/10)
						b = choice([calcul(randint(2,9)+randint(1,9)/10),calcul(randint(2,9)+randint(1,9)/10+randint(1,9)/100)])
						c = calcul(randint(2,this.sup)+randint(1,9)/10)
						d = choice([calcul(randint(2,9)+randint(1,9)/10),calcul(randint(2,9)+randint(1,9)/10+randint(1,9)/100)])
					} else {
						a = randint(2,this.sup)
						b = randint(2,this.sup)
						c = randint(2,this.sup)
						d = randint(2,this.sup)
					}
			switch (liste_type_de_questions[i]){
				case 1: // ax+bx+c	
					texte = `$${lettre_depuis_chiffre(i+1)}=${tex_nombre(a)}x+${tex_nombre(b)}x+${tex_nombre(c)}$`
					texte_corr = `$${lettre_depuis_chiffre(i+1)}=${tex_nombre(a)}x+${tex_nombre(b)}x+${tex_nombre(c)}=${tex_nombre(calcul(a+b))}x+${tex_nombre(c)}$`
					break;
				case 2: // ax+b+x+c
					texte = `$${lettre_depuis_chiffre(i+1)}=${tex_nombre(a)}x+${tex_nombre(b)}+x+${tex_nombre(c)}$`
					texte_corr = `$${lettre_depuis_chiffre(i+1)}=${tex_nombre(a)}x+${tex_nombre(b)}+x+${tex_nombre(c)}=${tex_nombre(calcul(a+1))}x+${tex_nombre(calcul(b+c))}$`
					break;
				case 3: // ax^2+bx+c+dx^2+x
					texte = `$${lettre_depuis_chiffre(i+1)}=${tex_nombre(a)}x^2+${tex_nombre(b)}x+${tex_nombre(c)}+${tex_nombre(d)}x^2+x$`
					texte_corr = `$${lettre_depuis_chiffre(i+1)}=${tex_nombre(a)}x^2+${tex_nombre(b)}x+${tex_nombre(c)}+${tex_nombre(d)}x^2+x=${tex_nombre(calcul(a+d))}x^2+${tex_nombre(calcul(b+1))}x+${tex_nombre(c)}$`
					break;
				case 4: // a+x+b+c+dx
					texte = `$${lettre_depuis_chiffre(i+1)}=${tex_nombre(a)}+x+${tex_nombre(b)}+${tex_nombre(c)}+${tex_nombre(d)}x$`
					texte_corr = `$${lettre_depuis_chiffre(i+1)}=${tex_nombre(a)}+x+${tex_nombre(b)}+${tex_nombre(c)}+${tex_nombre(d)}x=${tex_nombrec(1+d)}x+${tex_nombrec(a+b+c)}$`
					break;
				case 5: // ax+y+bx+c+dy
					texte = `$${lettre_depuis_chiffre(i+1)}=${tex_nombre(a)}x+y+${tex_nombre(b)}x+${tex_nombre(c)}+${tex_nombre(d)}y$`
					texte_corr = `$${lettre_depuis_chiffre(i+1)}=${tex_nombre(a)}x+y+${tex_nombre(b)}x+${tex_nombre(c)}+${tex_nombre(d)}y=${tex_nombrec(a+b)}x+${tex_nombrec(1+d)}y+${tex_nombre(c)}$`
					break;
				case 6: // ax+b-cx
					if (c > a) {
						[a, c] = [c, a] //pour s'assurer que a-c est positif
					}
					if (c==a){
						a++
					}
					texte = `$${lettre_depuis_chiffre(i+1)}=${tex_nombre(a)}x+${tex_nombre(b)}-${tex_nombre(c)}x$`
					texte_corr = `$${lettre_depuis_chiffre(i+1)}=${tex_nombre(a)}x+${tex_nombre(b)}-${tex_nombre(c)}x=${tex_nombrec(a-c)}x+${tex_nombre(b)}$`
					break;
				case 7: // ax-cx
					if (c > a) {
						[a, c] = [c, a] //pour s'assurer que a-c est positif
					}
					if (c==a){
						a++
					}
					texte = `$${lettre_depuis_chiffre(i+1)}=${tex_nombre(a)}x-${tex_nombre(c)}x$`
					texte_corr = `$${lettre_depuis_chiffre(i+1)}=${tex_nombre(a)}x-${tex_nombre(c)}x=${tex_nombrec(a-c)}x$`
					break;

				
			}
			
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Valeur maximale des coefficients',999];
	this.besoin_formulaire2_case_a_cocher = ['Avec des nombres décimaux']
}