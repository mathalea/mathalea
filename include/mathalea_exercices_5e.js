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
	this.nb_questions = 6;


	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		
		for (let i = 0, n, facteurs=[], nb_facteurs, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
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

			if (randint(1,4)==1) { //Une fois sur 4 on multilie le nombre par 100
				facteurs.push(2,2,5,5)
			} 
			n = 1
			for (var k = 0; k < facteurs.length; k++) {
				facteurs[k]
				n = n * facteurs[k]
			}
			texte = '$ '+ tex_nombre(n) + ' = \\dotfill $';
			texte_corr = '$ '+ tex_nombre(n) + ' = ' 
			facteurs.sort(compare_nombres); //classe les facteurs dans l'ordre croissant
			for (var k = 0; k < facteurs.length-1; k++) {
				facteurs[k]
				texte_corr += facteurs[k] + ' \\times '
			}
			texte_corr += facteurs[facteurs.length-1] + ' $';	
			
			
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

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		for (let i = 0, a, b, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
			a = randint(1,this.sup);
			b = randint(1,this.sup);
			k = choice([[-1,-1],[-1,1],[1,-1]]); // Les deux nombres relatifs ne peuvent pas être tous les deux positifs
			a = a*k[0];
			b = b*k[1];
			if (this.sup2){
				texte = `$ ${tex_nombre(a)}${ecriture_algebrique(b)} = \\dotfill $`;
				texte_corr = `$ ${a}${ecriture_algebrique(b)} = ${a+b} $`;
			} else {
				texte = '$ '+ ecriture_nombre_relatif(a) + ' + ' + ecriture_nombre_relatif(b) + ' = \\dotfill $';
				texte_corr = '$ '+ ecriture_nombre_relatifc(a) + ' + ' + ecriture_nombre_relatifc(b) + ' = ' + ecriture_nombre_relatifc(a + b) +' $';	
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

	this.nouvelle_version = function(numero_de_l_exercice){
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
				texte_corr = '$ '+ ecriture_nombre_relatifc(a) + ' + ' + ecriture_nombre_relatifc(b) + ' = ' + ecriture_nombre_relatifc(a + b) +' $';	
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

	this.nouvelle_version = function(numero_de_l_exercice){
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
				texte_corr = '$ '+ ecriture_nombre_relatif(a) + ' - ' + ecriture_nombre_relatif(b) + ' = ' + ecriture_nombre_relatifc(a) + ' + ' + ecriture_nombre_relatifc(-1*b) + ' = ' + ecriture_nombre_relatifc(a - b) +' $';
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

	this.nouvelle_version = function(numero_de_l_exercice){
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
				texte_corr = '$ '+ ecriture_nombre_relatifc(a) + ' \\times ' + ecriture_nombre_relatifc(b) + ' = ' + ecriture_nombre_relatifc(a * b) +' $';
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

	this.nouvelle_version = function(numero_de_l_exercice){
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
	sortie_html ? this.spacing_corr = 4 : this.spacing_corr = 2.5 ;
	this.nb_questions = 2;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function(numero_de_l_exercice){
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

	this.nouvelle_version = function(numero_de_l_exercice){
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

	this.nouvelle_version = function(numero_de_l_exercice){
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

	this.nouvelle_version = function(numero_de_l_exercice){
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

	this.nouvelle_version = function(numero_de_l_exercice){
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

	this.nouvelle_version = function(numero_de_l_exercice){
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
/*function Exercice_additions_et_soustraction_de_relatifs(max=20){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = max ;
	this.sup2 = false; // écriture simplifiée
	this.titre = "Additions et soustractions de nombres relatifs"
	this.consigne = 'Calculer'
	this.spacing = 2;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function(numero_de_l_exercice){
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
*/

/**
* Effectuer la somme ou la différence de deux nombres relatifs
*
* * On peut paramétrer les distances à zéro qui sont par défaut inférieures à 20
* * On peut utiliser des écritures simplifiées (ce qui n'est pas le cas par défaut)
* @Auteur Rémi Angot modifications par Jean-Claude Lhote
*/
function Exercice_additions_et_soustraction_de_relatifsV2(max=20){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = max ;
	this.sup2 = false; // écriture simplifiée
	this.titre = "Additions et soustractions de nombres relatifs"
	this.consigne = 'Calculer'
	this.spacing = 2;
	this.spacing_corr = 1;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.nb_questions = 5;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let relatifs
		let sommes_signees
		for (let i = 0, a, b, c , d , e ,texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
			relatifs=[]
			sommes_signees=[]
			a = -1;
			b = choice([-1,1]);
			if (a==-1 & b==-1)  c = 1;// On s'assure que les 3 premières termes n'ont pas le même signe
			else c=choice([-1,1]);
			a=randint(1,this.sup)*a
			b=randint(1,this.sup)*b
			c=randint(1,this.sup)*c
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
					texte += `<br>$ ${lettre_depuis_chiffre(i+1)} = \\dotfill $`
				}
				relatifs=trie_positifs_negatifs([a,b,c,d,e])
				texte_corr = `$ ${lettre_depuis_chiffre(i+1)}\\textbf{=}~${tex_nombrecoul(a)}${ecriture_algebriquec(b)}${ecriture_algebriquec(c)}${ecriture_algebriquec(d)}${ecriture_algebriquec(e)}\\\\\\phantom{A }\\textbf{=}~`;
				if (somme_des_termes_par_signe([a,b,c,d,e])[0]!=0&&somme_des_termes_par_signe([a,b,c,d,e])[1]!=0) {
					texte_corr +=`${tex_nombrecoul(relatifs[0])}${ecriture_algebriquec(relatifs[1])}${ecriture_algebriquec(relatifs[2])}${ecriture_algebriquec(relatifs[3])}${ecriture_algebriquec(relatifs[4])}\\\\\\phantom{A }\\textbf{=}~`
					texte_corr +=`${tex_nombrecoul(somme_des_termes_par_signe([a,b,c,d,e])[0])}${ecriture_algebriquec(somme_des_termes_par_signe([a,b,c,d,e])[1])}\\\\\\phantom{A }\\textbf{=}~`
					texte_corr +=`${tex_nombrecoul(a+b+c+d+e)} $`;
				}
				else
					if (somme_des_termes_par_signe([a,b,c,d,e])[0]!=0) texte_corr +=`${tex_nombrecoul(somme_des_termes_par_signe([a,b,c,d,e])[0])}$`
					else  texte_corr +=`${ecriture_algebriquec(somme_des_termes_par_signe([a,b,c,d,e])[1])}$`
			} 
			else {
				texte = `$ ${lettre_depuis_chiffre(i+1)} =  ${ecriture_nombre_relatif(a)}${signe(s1)}${ecriture_nombre_relatif(b)}${signe(s2)}${ecriture_nombre_relatif(c)}${signe(s3)}${ecriture_nombre_relatif(d)}${signe(s4)}${ecriture_nombre_relatif(e)} = \\dotfill $`;
				if (!sortie_html){
					texte += `<br>$ ${lettre_depuis_chiffre(i+1)} = \\dotfill $`	
				}
				texte_corr = `$ ${lettre_depuis_chiffre(i+1)} =  ${a}${signe(s1)}${ecriture_nombre_relatif(b)}${signe(s2)}${ecriture_nombre_relatif(c)}${signe(s3)}${ecriture_nombre_relatif(d)}${signe(s4)}${ecriture_nombre_relatif(e)}$`;
				texte_corr += `<br>$ \\phantom{A}= ${ecriture_nombre_relatifc(a)}+${ecriture_nombre_relatifc(s1*b)}+${ecriture_nombre_relatifc(s2*c)}+${ecriture_nombre_relatifc(s3*d)}+${ecriture_nombre_relatifc(s4*e)} $`;

				relatifs=trie_positifs_negatifs([a,s1*b,s2*c,s3*d,s4*e])		

				if (relatifs[0]>0&relatifs[4]<0) {
				texte_corr += `<br>$ \\phantom{A}= ${ecriture_nombre_relatifc(relatifs[0])}+${ecriture_nombre_relatifc(relatifs[1])}+${ecriture_nombre_relatifc(relatifs[2])}+${ecriture_nombre_relatifc(relatifs[3])}+${ecriture_nombre_relatifc(relatifs[4])} $`;
				}
				sommes_signees=somme_des_termes_par_signe([relatifs[0],relatifs[1],relatifs[2],relatifs[3],relatifs[4]])
				if (sommes_signees[0]!=0&&sommes_signees[1]!=0) {					
				texte_corr += `<br>$ \\phantom{A}= ${ecriture_nombre_relatifc(sommes_signees[0])}+${ecriture_nombre_relatifc(sommes_signees[1])} $`;
				texte_corr += `<br>$ \\phantom{A}= ${ecriture_algebriquec(a+s1*b+s2*c+s3*d+s4*e)} $<br>`;
				}
				else
					if (sommes_signees[0]!=0) texte_corr +=`<br>$ \\phantom{A}=${ecriture_algebriquec(sommes_signees[0])}$`
					else  texte_corr +=`<br>$ \\phantom{A}=${ecriture_algebriquec(sommes_signees[1])}$<br>`
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

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		for (let i = 0, a, b,relatifs, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
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
					texte += `<br>$ ${lettre_depuis_chiffre(i+1)} = \\dotfill $`
				}
				texte_corr = `$ ${lettre_depuis_chiffre(i+1)} =  ${a}${ecriture_algebrique(b)}${ecriture_algebrique(c)}${ecriture_algebrique(d)}${ecriture_algebrique(e)} = ${somme_des_termes_par_signe([a,b,c,d,e])[0]}${ecriture_algebrique(somme_des_termes_par_signe([a,b,c,d,e])[1])} = ${a+b+c+d+e} $`;		
			} else {
				texte = `$ ${lettre_depuis_chiffre(i+1)} =  ${ecriture_nombre_relatif(a)}${signe(s1)}${ecriture_nombre_relatif(b)}${signe(s2)}${ecriture_nombre_relatif(c)}${signe(s3)}${ecriture_nombre_relatif(d)}${signe(s4)}${ecriture_nombre_relatif(e)} = \\dotfill $`;
				if (!sortie_html){
					texte += `<br>$ ${lettre_depuis_chiffre(i+1)} = \\dotfill $`	
				}
				texte_corr = `$ ${lettre_depuis_chiffre(i+1)} =  ${ecriture_nombre_relatif(a)}${signe(s1)}${ecriture_nombre_relatif(b)}${signe(s2)}${ecriture_nombre_relatif(c)}${signe(s3)}${ecriture_nombre_relatif(d)}${signe(s4)}${ecriture_nombre_relatif(e)} $`;
				relatifs=trie_positifs_negatifs([a,s1*b,s2*c,s3*d,s4*e])		

				if (relatifs[0]>0&relatifs[4]<0) {
				texte_corr += `<br>$ \\phantom{A}= ${ecriture_nombre_relatifc(relatifs[0])}+${ecriture_nombre_relatifc(relatifs[1])}+${ecriture_nombre_relatifc(relatifs[2])}+${ecriture_nombre_relatifc(relatifs[3])}+${ecriture_nombre_relatifc(relatifs[4])} $`;
				}
				sommes_signees=somme_des_termes_par_signe([relatifs[0],relatifs[1],relatifs[2],relatifs[3],relatifs[4]])
				if (sommes_signees[0]!=0&&sommes_signees[1]!=0) {					
				texte_corr += `<br>$ \\phantom{A}= ${ecriture_nombre_relatifc(sommes_signees[0])}+${ecriture_nombre_relatifc(sommes_signees[1])} $`;
				texte_corr += `<br>$ \\phantom{A}= ${ecriture_algebriquec(a+s1*b+s2*c+s3*d+s4*e)}$<br>`;
				}
				else
					if (sommes_signees[0]!=0) texte_corr +=`<br>$ \\phantom{A}=${ecriture_algebriquec(sommes_signees[0])}$`
					else  texte_corr +=`<br>$ \\phantom{A}=${ecriture_algebriquec(sommes_signees[1])}$<br>`
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


	this.nouvelle_version = function(numero_de_l_exercice){
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
	this.sup = 1 ;
	this.titre = "Somme des angles dans un triangle";
	this.consigne = '';
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1.5;
	sortie_html ? this.spacing = 2 : this.spacing = 1.5;
	this.nb_questions=5;
	this.consigne_modifiable = false;
	this.correction_detaillee_disponible = true;
	this.nb_cols=1;
	this.nb_cols_corr=1;

	let type_de_questions_disponibles
	let troisieme_angle = function(a1,a2) {
		if (a1+a2<=180)  return 180-(a1+a2)
		else return -1;
	}

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		if (this.sup==1) type_de_questions_disponibles = [1,2,4,5,9]
		else
			if (this.sup==2) type_de_questions_disponibles = [3,6,7,8,10,11,12]
			else type_de_questions_disponibles = [1,2,3,4,5,6,7,8,9,10,11,12]
		
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
				case 1 :  // triangle quelconque 2 angles connus
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
				case 2 : // Triangle rectangle Un angle aigu connu 
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
				case 3 : // triangle isocèle, angle au sommet principal connu
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
				case 4 : // triangle isocèle, angle à la base connu
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
					texte_corr += `L'angle $\\widehat{${s1+s3+s2}}$ mesure $67,5\\degree$ et l'angle $\\widehat{${s1+s2+s3}}$ mesure $22,5\\degree$.`;
					break ;
				case 11 : //cas non aléatoire triangle 67.5 , 67.5 , 45.
					texte = `$${s1+s2+s3}$ est un triangle isocèle en $${s1}$. L'angle $\\widehat{${s2+s1+s3}}$ mesure les deux tiers de l'angle $\\widehat{${s1+s2+s3}}$.<br>Quelles sont les mesures des angles $\\widehat{${s1+s2+s3}}$, $\\widehat{${s1+s3+s2}}$ et $\\widehat{${s2+s1+s3}}$ ?`;
					if (this.correction_detaillee) {
						texte_corr += `Comme $\\widehat{${s2+s1+s3}}=\\dfrac{2\\times \\widehat{${s1+s3+s2}}}{3}$, on a $\\widehat{${s1+s3+s2}}=\\dfrac{3\\times\\widehat{${s2+s1+s3}}}{2}$.<br>`;
						texte_corr += `De plus $\\widehat{${s1+s3+s2}}$ et $\\widehat{${s1+s2+s3}}$ sont égaux, alors $\\widehat{${s1+s2+s3}}=\\dfrac{3\\times\\widehat{${s2+s1+s3}}}{2}$.<br>`;
						texte_corr += `D'où : $\\dfrac{3 \\times \\widehat{${s2+s1+s3}}}{2}\\times 2 + \\widehat{${s2+s1+s3}}=180\\degree$.<br>`;
						texte_corr += `D'où : $3 \\times \\widehat{${s2+s1+s3}} + \\widehat{${s2+s1+s3}}=180\\degree$.<br>D'où `;
						texte_corr += ` $4 \\times \\widehat{${s2+s1+s3}}=180\\degree$.<br>D'où `;
					}
					texte_corr += `$\\widehat{${s2+s1+s3}}=180\\degree \\div 4=45\\degree$.<br>`;
					texte_corr += `$\\widehat{${s1+s3+s2}}=\\dfrac{3\\times\\widehat{${s2+s1+s3}}}{2}=\\dfrac{3\\times 45\\degree}{2}=\\dfrac{135\\degree}{2}=67,5\\degree$<br>`;
					texte_corr += `L'angle $\\widehat{${s1+s3+s2}}$ mesure $67,5\\degree$, l'angle $\\widehat{${s1+s2+s3}}$ mesure $67,5\\degree$ et l'angle $\\widehat{${s2+s1+s3}}$ mesure $45\\degree$`;
					break;
					case 12 : //cas non aléatoire triangle 72 , 72 , 36.
					texte = `$${s1+s2+s3}$ est un triangle isocèle en $${s1}$. L'angle $\\widehat{${s1+s2+s3}}$ mesure le double de l'angle $\\widehat{${s2+s1+s3}}$.<br>Quelles sont les mesures des angles $\\widehat{${s1+s2+s3}}$, $\\widehat{${s1+s3+s2}}$ et $\\widehat{${s2+s1+s3}}$ ?`;
					if (this.correction_detaillee) {
						texte_corr += `On a $\\widehat{${s1+s2+s3}}=2\\times \\widehat{${s2+s1+s3}}$.<br>`;
						texte_corr += `De plus $\\widehat{${s1+s3+s2}}$ et $\\widehat{${s1+s2+s3}}$ sont égaux, alors $\\widehat{${s1+s3+s2}}=2\\times\\widehat{${s2+s1+s3}}$.<br>`;
						texte_corr += `D'où : $2 \\times \\widehat{${s2+s1+s3}}\\times 2 + \\widehat{${s2+s1+s3}}=180\\degree$.<br>`;
						texte_corr += `D'où : $4 \\times \\widehat{${s2+s1+s3}} + \\widehat{${s2+s1+s3}}=180\\degree$.<br>D'où `;
						texte_corr += ` $5 \\times \\widehat{${s2+s1+s3}}=180\\degree$.<br>D'où `;
					}
					texte_corr += `$\\widehat{${s2+s1+s3}}=180\\degree \\div 5=36\\degree$.<br>`;
					texte_corr += `$\\widehat{${s1+s3+s2}}=2\\times\\widehat{${s2+s1+s3}}=2\\times 36\\degree=72\\degree$<br>`;
					texte_corr += `L'angle $\\widehat{${s1+s3+s2}}$ mesure $72\\degree$, l'angle $\\widehat{${s1+s2+s3}}$ mesure $72\\degree$ et l'angle $\\widehat{${s2+s1+s3}}$ mesure $36\\degree$`;
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
	this.besoin_formulaire_numerique = ['Niveau de difficuté',3,"1 : Facile \n 2 : Difficile \n 3 : Mélange des deux niveaux"]
}

/**
 * Calculs de fréquences dans des séries statistiques
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

	this.nouvelle_version = function(numero_de_l_exercice){
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
  * Calcul de moyennes de série statistiques
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

	this.nouvelle_version = function(numero_de_l_exercice){
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
  * Calculer des étendues de séries statistiques
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

	this.nouvelle_version = function(numero_de_l_exercice){
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
	this.spacing = 1;
	this.spacing_corr = 1.5;
	this.nb_cols_corr = 1;
	this.nb_cols = 1;

	this.nouvelle_version = function(numero_de_l_exercice){
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

	this.nouvelle_version = function(numero_de_l_exercice){
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
	this.nb_questions = 2;
	this.nb_cols = 2;
	this.nb_cols_corr = 1;
	this.spacing_corr = 1;
	this.spacing = 1;

	this.nouvelle_version = function(numero_de_l_exercice){
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
				if (!sortie_html && i==0) {texte = `\\setlength\\itemsep{1em}` + texte}; // espacement entre les questions
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

	this.nouvelle_version = function(numero_de_l_exercice){
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
	this.sup=1;
	this.sup2=false;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles // = range1(5)
	//	let liste_type_de_questions  = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		if (this.sup2==false) type_de_questions_disponibles=[1,2,3,4,5]
		else type_de_questions_disponibles=[6,7,3]
		let liste_type_de_questions  = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		
		for (let i = 0, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) {
			let a, b, x1, x2
			switch (liste_type_de_questions[i]){
				case 1 : // 3x-a=2x+b   x=a+b  
					if (this.sup==1) {
					a = randint(1,6)
					b = randint(1,6,[a])
					x2 = a + b
					x1 = randint(2,10,[x2])
	
					}
					else {
						a = randint(-6,6,[0])
						b = randint(-6,6,[a,0])	
						x2 = a + b
						x1 = randint(-10,10,[0,x2])
						
					}

					texte = `Tester l'égalité $3x-${ecriture_parenthese_si_negatif(a)}=2x+${ecriture_parenthese_si_negatif(b)}~$ pour $~x=${x1}~$ puis pour $~x=${x2}$`
					texte_corr = `Pour $x=${x1}$ : <br>`
					texte_corr += `$3x-${ecriture_parenthese_si_negatif(a)}=3\\times${ecriture_parenthese_si_negatif(x1)}-${ecriture_parenthese_si_negatif(a)}=${3*x1-a}$ <br> $2x+${ecriture_parenthese_si_negatif(b)}=2\\times${ecriture_parenthese_si_negatif(x1)}+${ecriture_parenthese_si_negatif(b)}=${2*x1+b}$<br>`
					texte_corr += `$${3*x1-a}\\not=${2*x1+b}$ donc l'égalité n'est pas vraie.<br><br>`
					texte_corr += `Pour $x=${ecriture_parenthese_si_negatif(x2)}$ : <br>`
					texte_corr += `$3x-${ecriture_parenthese_si_negatif(a)}=3\\times${ecriture_parenthese_si_negatif(x2)}-${ecriture_parenthese_si_negatif(a)}=${3*x2-a}$ <br> $2x+${ecriture_parenthese_si_negatif(b)}=2\\times${ecriture_parenthese_si_negatif(x2)}+${ecriture_parenthese_si_negatif(b)}=${2*x2+b}$<br>`
					texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.`
					break ;
				case 2 : // 3x+a=5x-b   x=(a+b)/2 donc a et b impairs pour une solution entière  
					if (this.sup==1) {
					a = randint(1,9)
					b = randint(0,4)*2+a%2;
					x1 = parseInt(Algebrite.eval((a+b)/2))
					x2 = randint(1,9,x1)
					}
					else {
						a = randint(-9,9,[0])
						b = randint(-4,4,[a,0])*2+a%2
						x1 = parseInt(Algebrite.eval((a+b)/2))
						x2 = randint(-9,9,[0,x1])	
					}

					texte = `Tester l'égalité $3x+${ecriture_parenthese_si_negatif(a)}=5x-${ecriture_parenthese_si_negatif(b)}~$ pour $~x=${x1}~$ puis pour $~x=${x2}$`
					texte_corr = `Pour $x=${x1}$ : <br>`
					texte_corr += `$3x+${ecriture_parenthese_si_negatif(a)}=3\\times${ecriture_parenthese_si_negatif(x1)}+${ecriture_parenthese_si_negatif(a)}=${3*x1+a}$ <br> $5x-${ecriture_parenthese_si_negatif(b)}=5\\times${ecriture_parenthese_si_negatif(x1)}-${ecriture_parenthese_si_negatif(b)}=${5*x1-b}$<br>`
					texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.<br><br>`
					texte_corr += `Pour $x=${x2}$ : <br>`
					texte_corr += `$3x+${ecriture_parenthese_si_negatif(a)}=3\\times${ecriture_parenthese_si_negatif(x2)}+${ecriture_parenthese_si_negatif(a)}=${3*x2+a}$ <br> $5x-${ecriture_parenthese_si_negatif(b)}=5\\times${ecriture_parenthese_si_negatif(x2)}-${ecriture_parenthese_si_negatif(b)}=${5*x2-b}$<br>`
					texte_corr += `$${3*x2+a}\\not=${5*x2-b}$ donc l'égalité n'est pas vraie.`
					break ;
				case 3 : // 10(x-a)=4(2x+b) x=(10a+4b)/2
					if (this.sup==1) {
					a = randint(1,3)
					b = randint(1,3)
					x2 = parseInt(Algebrite.eval((10*a+4*b)/2))
					x1 = randint(9,x2)
					}
					else {
						a = randint(-3,3,[0])
						b = randint(-3,3,[0])	
						x2 = parseInt(Algebrite.eval((10*a+4*b)/2))
						x1 = randint(-9,9,[0,x2])
					}

					texte = `Tester l'égalité $10(x-${ecriture_parenthese_si_negatif(a)})=4(2x+${ecriture_parenthese_si_negatif(b)})~$ pour $~x=${x1}~$ puis pour $~x=${x2}$`
					texte_corr = `Pour $x=${x1}$ : <br>`
					texte_corr += `$10(x-${ecriture_parenthese_si_negatif(a)})=10\\times(${ecriture_parenthese_si_negatif(x1)}-${ecriture_parenthese_si_negatif(a)})=10\\times${x1-a}=${10*(x1-a)}$ <br> $4(2x+${ecriture_parenthese_si_negatif(b)})=4\\times(2\\times${ecriture_parenthese_si_negatif(x1)}+${ecriture_parenthese_si_negatif(b)})=4\\times${2*x1+b}=${4*(2*x1+b)}$<br>`
					texte_corr += `$${10*(x1-a)}\\not=${4*(2*x1+b)}$ donc l'égalité n'est pas vraie.<br><br>`
					texte_corr += `Pour $x=${x2}$ : <br>`
					texte_corr += `$10(x-${ecriture_parenthese_si_negatif(a)})=10\\times(${ecriture_parenthese_si_negatif(x2)}-${ecriture_parenthese_si_negatif(a)})=10\\times${x2-a}=${10*(x2-a)}$ <br> $4(2x+${ecriture_parenthese_si_negatif(b)})=4\\times(2\\times${ecriture_parenthese_si_negatif(x2)}+${ecriture_parenthese_si_negatif(b)})=4\\times${2*x2+b}=${4*(2*x2+b)}$<br>`
					texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.`
					break ;
				case 4 : // ax+b=(a+1)x-c x=b+c
					if (this.sup==1) {
					a = randint(2,9)
					b = randint(2,9)
					c = randint(1,3)
					x1 = b + c
					x2 = randint(2,10,x1)
					}
					else {
						a = randint(2,9)
						b = randint(2,9)*randint(-1,1,0)
						c = randint(1,3)*randint(-1,1,0)
						x1 = b + c
						x2 = randint(2,10,x1)*randint(-1,1,0)
					}

					texte = `Tester l'égalité $${ecriture_parenthese_si_negatif(a)}x+${ecriture_parenthese_si_negatif(b)}=${a+1}x-${ecriture_parenthese_si_negatif(c)}~$ pour $~x=${x1}~$ puis pour $~x=${x2}$`
					texte_corr = `Pour $x=${x1}$ : <br>`
					texte_corr += `$${a}x+${ecriture_parenthese_si_negatif(b)}=${ecriture_parenthese_si_negatif(a)}\\times${ecriture_parenthese_si_negatif(x1)}+${ecriture_parenthese_si_negatif(b)}=${a*x1+b}$ <br> $${a+1}x-${ecriture_parenthese_si_negatif(c)}=${a+1}\\times${ecriture_parenthese_si_negatif(x1)}-${ecriture_parenthese_si_negatif(c)}=${(a+1)*x1-c}$<br>`
					texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.<br><br>`
					texte_corr += `Pour $x=${x2}$ : <br>`
					texte_corr += `$${a}x+${ecriture_parenthese_si_negatif(b)}=${ecriture_parenthese_si_negatif(a)}\\times${ecriture_parenthese_si_negatif(x2)}+${ecriture_parenthese_si_negatif(b)}=${a*x2+b}$ <br> $${a+1}x-${ecriture_parenthese_si_negatif(c)}=${a+1}\\times${ecriture_parenthese_si_negatif(x2)}-${ecriture_parenthese_si_negatif(c)}=${(a+1)*x2-c}$<br>`
					texte_corr += `$${a*x2+b}\\not=${(a+1)*x2-c}$ donc l'égalité n'est pas vraie.`
					break ;
				case 5 : // a-2x=b+2x x=(a-b)/4
					if (this.sup==1) {
					x1 = randint(1,9)
					b = randint(1,9)
					a = b+4*x1
					x2 = randint(1,11,x1)
					}
					else {
						x1 = randint(-9,9)
						b = randint(-9,9,0)
						a = b+4*x1
						x2 = randint(1,11,x1)
					}

					texte = `Tester l'égalité $${a}-2x=${b}+2x~$ pour $~x=${x1}~$ puis pour $~x=${x2}$`
					texte_corr = `Pour $x=${x1}$ : <br>`
					texte_corr += `$${a}-2x=${a}-2\\times${ecriture_parenthese_si_negatif(x1)}=${a-2*x1}$ <br> $${b}+2x=${b}+2\\times${ecriture_parenthese_si_negatif(x1)}=${b+2*x1}$<br>`
					texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.<br><br>`
					texte_corr += `Pour $x=${x2}$ : <br>`
					texte_corr += `$${a}-2x=${a}-2\\times${ecriture_parenthese_si_negatif(x2)}=${a-2*x2}$ <br> $${b}+2x=${b}+2\\times${ecriture_parenthese_si_negatif(x2)}=${b+2*x2}$<br>`
					texte_corr += `$${a-2*x2}\\not=${b+2*x2}$ donc l'égalité n'est pas vraie.`
					break ;
				case 6 : // ax-ab=x²-bx (a-x)(x-b)=0 solutions a et b.
					if (this.sup==1) {
					b = randint(2,9)
					a = randint(2,9)
					x3 = b
					x1 = a
					x2 = randint(1,9,[x1,x3])
					}
					else {
						a = randint(-9,9,[0,1])
						b = randint(-9,9,[0,a])
						x1 = a
						x3 = b
						x2 = randint(-9,9,[x1,x3])
					}
					texte = `Tester l'égalité $${a}x-${ecriture_parenthese_si_negatif(a*b)}=x^2-${ecriture_parenthese_si_negatif(b)}x~$ pour $~x=${x1}~$ , pour $~x=${x2}~$ puis pour $~x=${x3}$`
					texte_corr = `Pour $x=${x1}$ : <br>`
					texte_corr += `$${a}x-${ecriture_parenthese_si_negatif(a*b)}=${a}\\times${ecriture_parenthese_si_negatif(x1)}-${ecriture_parenthese_si_negatif(a*b)}=${a*x1-a*b}$ <br> $x^2-${b}\\times x=${ecriture_parenthese_si_negatif(x1)}^2-${ecriture_parenthese_si_negatif(b)}\\times${ecriture_parenthese_si_negatif(x1)}=${x1*x1}-${ecriture_parenthese_si_negatif(b*x1)}=${x1*x1-b*x1}$<br>`
					texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.<br><br>`
					texte_corr += `Pour $x=${x2}$ : <br>`
					texte_corr += `$${a}x-${ecriture_parenthese_si_negatif(a*b)}=${a}\\times${ecriture_parenthese_si_negatif(x2)}-${ecriture_parenthese_si_negatif(a*b)}=${a*x2-a*b}$ <br> $x^2-${b}\\times x=${ecriture_parenthese_si_negatif(x2)}^2-${ecriture_parenthese_si_negatif(b)}\\times${ecriture_parenthese_si_negatif(x2)}=${x2*x2}-${ecriture_parenthese_si_negatif(b*x2)}=${x2*x2-b*x2}$<br>`
					texte_corr += `$${a*x2-a*b}\\not=${x2*x2-b*x2}$ donc l'égalité n'est pas vraie.<br><br>`
					texte_corr += `Pour $x=${x3}$ : <br>`
					texte_corr += `$${a}x-${ecriture_parenthese_si_negatif(a*b)}=${a}\\times${ecriture_parenthese_si_negatif(x3)}-${ecriture_parenthese_si_negatif(a*b)}=${a*x3-a*b}$ <br> $x^2-${b}\\times x=${ecriture_parenthese_si_negatif(x3)}^2-${ecriture_parenthese_si_negatif(b)}\\times${ecriture_parenthese_si_negatif(x3)}=${x3*x3}-${ecriture_parenthese_si_negatif(b*x3)}=${x3*x3-b*x3}$<br>`
					texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.<br><br>`
					break ;
				case 7 : // adx-bd=acx²-bcx  --- (ax-b)(d-cx)=0 solutions b/a et d/c.
					if (this.sup==1) {
						c = randint(2,5)
						a = randint(2,5)
						x2 = randint(2,6)
						x3 = randint(2,6,x2)
						x1 = randint(1,7,[x2,x3])
						b = a*x2
						d = c*x3
					}
					else {
						c = randint(2,5)*randint(-1,1,0)
						a = randint(2,5)*randint(-1,1,0)
						x2 = randint(1,6)*randint(-1,1,0)
						x3 = randint(1,6,x2)*randint(-1,1,0)
						x1 = randint(1,7,[x2,x3])*randint(-1,1,0)
						b = a*x2
						d = c*x3
					}
					texte = `Tester l'égalité $${a*d}x-${ecriture_parenthese_si_negatif(b*d)}=${a*c}x^2-${ecriture_parenthese_si_negatif(b*c)}x~$ pour $~x=${x1}~$, pour $~x=${x2}~$ puis pour $~x=${x3}$`
					texte_corr = `Pour $x=${x1}$ : <br>`
					texte_corr += `$${a*d}x-${ecriture_parenthese_si_negatif(b*d)}=${a*d}\\times${ecriture_parenthese_si_negatif(x1)}-${ecriture_parenthese_si_negatif(b*d)}=${a*d*x1-d*b}$ <br> $${a*c}x^2-${ecriture_parenthese_si_negatif(b*c)}x=${a*c}\\times${ecriture_parenthese_si_negatif(x1)}^2-${ecriture_parenthese_si_negatif(b*c)}\\times${ecriture_parenthese_si_negatif(x1)}=${a*c*x1*x1}-${ecriture_parenthese_si_negatif(b*c*x1)}=${a*c*x1*x1-b*c*x1}$<br>`
					texte_corr += `$${a*d*x1-d*b}\\not=${a*c*x1*x1-b*c*x1}$ donc l'égalité n'est pas vraie.<br><br>`
					texte_corr += `Pour $x=${x2}$ : <br>`
					texte_corr += `$${a*d}x-${ecriture_parenthese_si_negatif(b*d)}=${a*d}\\times${ecriture_parenthese_si_negatif(x2)}-${ecriture_parenthese_si_negatif(b*d)}=${a*d*x2-d*b}$ <br> $${a*c}x^2-${ecriture_parenthese_si_negatif(b*c)}x=${a*c}\\times${ecriture_parenthese_si_negatif(x2)}^2-${ecriture_parenthese_si_negatif(b*c)}\\times${ecriture_parenthese_si_negatif(x2)}=${a*c*x2*x2}-${ecriture_parenthese_si_negatif(b*c*x2)}=${a*c*x2*x2-b*c*x2}$<br>`
					texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.<br><br>`
					texte_corr += `Pour $x=${x3}$ : <br>`
					texte_corr += `$${a*d}x-${ecriture_parenthese_si_negatif(b*d)}=${a*d}\\times${ecriture_parenthese_si_negatif(x3)}-${ecriture_parenthese_si_negatif(b*d)}=${a*d*x3-d*b}$ <br> $${a*c}x^2-${ecriture_parenthese_si_negatif(b*c)}x=${a*c}\\times${ecriture_parenthese_si_negatif(x3)}^2-${ecriture_parenthese_si_negatif(b*c)}\\times${ecriture_parenthese_si_negatif(x3)}=${a*c*x3*x3}-${ecriture_parenthese_si_negatif(b*c*x3)}=${a*c*x3*x3-b*c*x3}$<br>`
					texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.<br><br>`
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
	this.besoin_formulaire_numerique = ['Niveau de difficulté',2,"1 : Entiers naturels\n2 : Entiers relatifs"];
	this.besoin_formulaire2_case_a_cocher = ["Avec des équations du second degré"];	
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

	this.nouvelle_version = function(numero_de_l_exercice){
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
					texte_corr = `$${lettre_depuis_chiffre(i+1)}=${tex_nombre(a)}x-${tex_nombre(c)}x=${rien_si_1(tex_nombrec(a-c))}x$`
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

/**
* Lire l'abscisse décimale d'un point
* @Auteur Jean-Claude Lhote et Rémi Angot
*/
function Lire_abscisse_relative(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Lire l'abscisse relative d'un point";
	this.consigne = "Lire l'abscisse de chacun des points suivants.";
	this.nb_questions = 3;
	this.nb_questions_modifiable = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing = 1;
    this.spacing_corr = 1;
	this.sup=4;
	this.liste_packages = 'tkz-euclide'

	this.nouvelle_version = function(numero_de_l_exercice){ // numero_de_l_exercice est 0 pour l'exercice 1
		let type_de_questions;
		this.liste_questions=[];
		this.liste_corrections=[];
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées
		if (this.sup==4) 	type_de_questions=combinaison_listes([1,2,3],this.nb_questions);
		else 				type_de_questions=combinaison_listes([parseInt(this.sup)],this.nb_questions);
		

		this.contenu = html_consigne(this.consigne)
		for (let i = 0,abs0,l1,l2,l3,x1,x2,x3,x11,x22,x33, pas1,pas2, id_unique, texte, texte_corr; i < this.nb_questions;i++) {
			l1=lettre_depuis_chiffre(i*3+1)
			l2=lettre_depuis_chiffre(i*3+2)
			l3=lettre_depuis_chiffre(i*3+3)
			switch (type_de_questions[i]) {
				case 1: // Placer des décimaux relatifs sur un axe (1 décimale)
					abs0 = randint(-7, -3);
					pas1 = 1;
					pas2 = 10;
					break;

				case 2: // Placer des décimaux relatifs sur un axe (2 décimales)
					abs0 = randint(-4, -2) / 10;
					pas1 = 10;
					pas2 = 10;
					break;

				case 3: // Placer des décimaux relatifs sur un axe (3 décimales)
					abs0 = randint(-10, -2) / 100;
					pas1 = 100;
					pas2 = 10;
					break;
			}
			x1 = randint(0, 2); x2 = randint(3, 4); x3 = randint(5, 6);
			x11 = randint(1, 9); x22 = randint(1, 9); x33 = randint(1, 3)
			if (sortie_html) {
				id_unique = `${i}_${Date.now()}`
				this.contenu += `<div id="div_svg${numero_de_l_exercice}${id_unique}" style="width: 90%; height: 200px;  "></div>`
				SVG_reperage_sur_un_axe(`div_svg${numero_de_l_exercice}${id_unique}`, abs0, 6, pas1, pas2, [[l1, x1, x11], [l2, x2, x22], [l3, x3, x33]], [[calcul(abs0 + 1 / pas1,0), 1, 0], [calcul(abs0 + 2 / pas1,0), 2, 0], [calcul(abs0 + 3 / pas1,0), 3, 0], [calcul(abs0 + 4 / pas1,0), 4, 0], [calcul(abs0 + 5 / pas1,0), 5, 0], [calcul(abs0 + 6 / pas1,0), 6, 0]],false)
				this.contenu_correction += `<div id="div_svg_corr${numero_de_l_exercice}${id_unique}" style="width: 90%; height: 200px;  "></div>`
				SVG_reperage_sur_un_axe(`div_svg_corr${numero_de_l_exercice}${id_unique}`, abs0, 6, pas1, pas2, [[l1, x1, x11, true], [l2, x2, x22, true], [l3, x3, x33, true]], [[calcul(abs0 + 1 / pas1,0), 1, 0], [calcul(abs0 + 2 / pas1,0), 2, 0], [calcul(abs0 + 3 / pas1,0), 3, 0], [calcul(abs0 + 4 / pas1,0), 4, 0], [calcul(abs0 + 5 / pas1,0), 5, 0], [calcul(abs0 + 6 / pas1,0), 6, 0]],false)
			}
			else { //sortie Latex 
				texte=Latex_reperage_sur_un_axe(2, abs0, pas1, pas2, [[l1, x1, x11], [l2, x2, x22], [l3, x3, x33]], [[calcul(abs0 + 1 / pas1,0), 1, 0], [calcul(abs0 + 2 / pas1,0), 2, 0], [calcul(abs0 + 3 / pas1,0), 3, 0], [calcul(abs0 + 4 / pas1,0), 4, 0], [calcul(abs0 + 5 / pas1,0), 5, 0], [calcul(abs0 + 6 / pas1,0), 6, 0]],false);
				texte_corr=Latex_reperage_sur_un_axe(2, abs0, pas1, pas2, [[l1, x1, x11,true], [l2, x2, x22,true], [l3, x3, x33,true]], [[calcul(abs0 + 1 / pas1,0), 1, 0], [calcul(abs0 + 2 / pas1,0), 2, 0], [calcul(abs0 + 3 / pas1,0), 3, 0], [calcul(abs0 + 4 / pas1,0), 4, 0], [calcul(abs0 + 5 / pas1,0), 5, 0], [calcul(abs0 + 6 / pas1,0), 6, 0]],false);
				this.liste_questions.push(texte)
				this.liste_corrections.push(texte_corr);
			}
		
		}
		if (!sortie_html) liste_de_question_to_contenu(this); 
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',4,"1 : Nombre relatif à une décimale\n2 : Nombre relatif à deux décimales\n3 : Nombre relatif à trois décimales\n4 : Mélange"];
}

/**
* Placer un point d'abscisse un nombre relatif
* @Auteur Jean-Claude Lhote et Rémi Angot
*/
function Placer_points_sur_axe_relatifs(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Placer un point d'abscisse un nombre relatif";
	this.consigne = " Placer trois points sur un axe gradué.";
	this.nb_questions = 5;
	this.nb_questions_modifiable = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing = 1;
    this.spacing_corr = 1;
	this.sup=1;
	this.type_exercice = 'SVGJS';
	
	this.liste_packages = 'tkz-euclide'


	this.nouvelle_version = function(numero_de_l_exercice){ // numero_de_l_exercice est 0 pour l'exercice 1
		let type_de_questions;
		this.liste_questions=[];
		this.liste_corrections=[];
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées
		if (this.sup==4) 	type_de_questions=combinaison_listes([1,2,3],this.nb_questions);
		else 				type_de_questions=combinaison_listes([parseInt(this.sup)],this.nb_questions);
		

		this.contenu = html_consigne(this.consigne)
		for (let i = 0,abs0,abs1,abs2,abs3,l1,l2,l3,x1,x2,x3,x11,x22,x33, pas1,pas2, id_unique, texte, texte_corr; i < this.nb_questions;i++) {
			l1=lettre_depuis_chiffre(i*3+1)
			l2=lettre_depuis_chiffre(i*3+2)
			l3=lettre_depuis_chiffre(i*3+3)

			switch (type_de_questions[i]) {
				case 1: // Placer des décimaux relatifs sur un axe (1 décimale)
					abs0 = randint(-7, -3);
					pas1 = 1;
					pas2 = 10;
					break;

				case 2: // Placer des décimaux relatifs sur un axe (2 décimales)
					abs0 = randint(-4, -2) / 10;
					pas1 = 10;
					pas2 = 10;
					break;

				case 3: // Placer des décimaux relatifs sur un axe (3 décimales)
					abs0 = randint(-10, -2) / 100;
					pas1 = 100;
					pas2 = 10;
					break;
			}
			x1 = randint(0, 2); x2 = randint(3, 4); x3 = randint(5, 6);
			x11 = randint(1, 9); x22 = randint(1, 9); x33 = randint(1, 3);
			abs1 = arrondi(abs0 + x1/pas1 + x11 / pas1/pas2, type_de_questions[i]);  // le type de questions est égal au nombre de décimales.
			abs2 = arrondi(abs0 + x2/pas1 + x22 / pas1/pas2, type_de_questions[i]);
			abs3 = arrondi(abs0 + x3/pas1 + x33 / pas1/pas2, type_de_questions[i]);

			texte=`Placer les points : {\\small $${l1}$(${tex_nombrec(abs1)}), $${l2}$(${tex_nombrec(abs2)}), $${l3}$(${tex_nombrec(abs3)})}<br>`
			if (sortie_html) {
				texte_corr=''
				id_unique = `${i}_${Date.now()}`
				this.contenu += `<div id="div_svg${numero_de_l_exercice}${id_unique}" style="width: 90%; height: 110px;  "></div>`
				this.contenu +=`Placer les points : ${l1}(${tex_nombrec(abs1)}), ${l2}(${tex_nombrec(abs2)}), ${l3}(${tex_nombrec(abs3)})`
				SVG_reperage_sur_un_axe(`div_svg${numero_de_l_exercice}${id_unique}`, abs0, 6, pas1, pas2, [], [[calcul(abs0 + 1 / pas1,0), 1, 0], [calcul(abs0 + 2 / pas1,0), 2, 0], [calcul(abs0 + 3 / pas1,0), 3, 0], [calcul(abs0 + 4 / pas1,0), 4, 0], [calcul(abs0 + 5 / pas1,0), 5, 0], [calcul(abs0 + 6 / pas1,0), 6, 0]],false)
				this.contenu_correction += `<div id="div_svg_corr${numero_de_l_exercice}${id_unique}" style="width: 90%; height: 200px;  "></div>`
				SVG_reperage_sur_un_axe(`div_svg_corr${numero_de_l_exercice}${id_unique}`, abs0, 6, pas1, pas2, [[l1, x1, x11, true], [l2, x2, x22, true], [l3, x3, x33, true]], [[calcul(abs0 + 1 / pas1,0), 1, 0], [calcul(abs0 + 2 / pas1,0), 2, 0], [calcul(abs0 + 3 / pas1,0), 3, 0], [calcul(abs0 + 4 / pas1,0), 4, 0], [calcul(abs0 + 5 / pas1,0), 5, 0], [calcul(abs0 + 6 / pas1,0), 6, 0]],false)
			}
			else { //sortie Latex 
				texte+=Latex_reperage_sur_un_axe(2, abs0, pas1, pas2, [], [[calcul(abs0 + 1 / pas1,0), 1, 0], [calcul(abs0 + 2 / pas1,0), 2, 0], [calcul(abs0 + 3 / pas1,0), 3, 0], [calcul(abs0 + 4 / pas1,0), 4, 0], [calcul(abs0 + 5 / pas1,0), 5, 0], [calcul(abs0 + 6 / pas1,0), 6, 0]],false);
				texte_corr=`Les points {\\small $${l1}$(${tex_nombrec(abs1)}), $${l2}$(${tex_nombrec(abs2)}), $${l3}$(${tex_nombrec(abs3)})} sont placés ci dessous<br>`;
				texte_corr+=Latex_reperage_sur_un_axe(2, abs0, pas1, pas2, [[l1, x1, x11,true], [l2, x2, x22,true], [l3, x3, x33,true]], [[calcul(abs0 + 1 / pas1,0), 1, 0], [calcul(abs0 + 2 / pas1,0), 2, 0], [calcul(abs0 + 3 / pas1,0), 3, 0], [calcul(abs0 + 4 / pas1,0), 4, 0], [calcul(abs0 + 5 / pas1,0), 5, 0], [calcul(abs0 + 6 / pas1,0), 6, 0]],false);
				this.liste_questions.push(texte)
				this.liste_corrections.push(texte_corr);
			}

		}
		if (!sortie_html) liste_de_question_to_contenu(this); 

	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',4,"1 : Nombre relatif à une décimale\n2 : Nombre relatif à deux décimales\n3 : Nombre relatif à trois décimales\n4 : Mélange"];
}

/**
 * Lire les coordonnées d'un point du plan avec une précision allant de l'unité à 0,25.
 * @Auteur Jean-Claude Lhote
 */
function reperage_point_du_plan(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Déterminer les coordonnées (relatives) d'un point";
	this.consigne = "Donner les coordonnées des points représentés";
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing = 1;
    this.spacing_corr = 1;
	this.sup=1;
	this.sup2=true;
	this.quart_de_plan=false;
	this.liste_packages = 'tkz-euclide';

	
	this.nouvelle_version = function(numero_de_l_exercice){ // numero_de_l_exercice est 0 pour l'exercice 1
	this.liste_questions=[];
	this.liste_corrections=[];
	let texte,texte_corr;
	this.contenu = ''; // Liste de questions
	this.contenu_correction = ''; // Liste de questions corrigées
	let liste_points=[],points=[];
	let grille,w,h,k,xmin,xmax,ymin,ymax,shiftxnom,shiftynom;
	h=Math.round(window.innerHeight*0.7)
	w=h;
	k=Math.pow(2,parseInt(this.sup)-1);
	let nom=[];
	grille=this.sup2;
	if (this.quart_de_plan) {
		xmin=0;ymin=0;xmax=10;ymax=10;
	}
	else	{
		xmin=-5;ymin=-5;xmax=5;ymax=5;	
	}
	let liste_abs=[],liste_ord=[];
	for (let i=calcul(xmin+1/k);i<calcul(xmax-(parseInt(this.sup)-1)/k);i=calcul(i+1/k)) {
		liste_abs.push(i)
	}
	for (let i=calcul(ymin+1/k);i<calcul(ymax-(parseInt(this.sup)-1)/k);i=calcul(i+1/k)) {
		liste_ord.push(i)
	}
	let X0=false,Y0=false;
	liste_points=creer_couples(liste_abs,liste_ord,10*k);
	for (let j=0;j<5;j++) {
		points.push(liste_points[j]);
		if (points[j][0]==0) X0=true;
		if (points[j][1]==0) Y0=true;
	}
	if (!X0) points[0][0]=0;
	if (!Y0) points[1][1]=0;
	points=shuffle(points);

	for (let l=0,lettre=randint(1,20);l<5;l++) nom.push(lettre_depuis_chiffre(l+lettre));
	if (sortie_html) {
		let id_unique = `${Date.now()}`
		let id_du_div = `div_svg${numero_de_l_exercice}${id_unique}`;
		this.consigne = `<div id="${id_du_div}" style="height: ${h}px"></div>`;
		if (!window.SVGExist) {window.SVGExist = {}} // Si SVGExist n'existe pas on le créé
		// SVGExist est un dictionnaire dans lequel on stocke les listenner sur la création des div
		window.SVGExist[id_du_div] = setInterval(function() {
			if ($(`#${id_du_div}`).length ) {
				$(`#${id_du_div}`).html("");//Vide le div pour éviter les SVG en doublon
				const mon_svg = SVG().addTo(`#${id_du_div}`).viewbox(0, 0, 520, 520).size('100%','100%')
			let AxesXY=SVG_repere(mon_svg,xmin,xmax,ymin,ymax,k,k,500,500,grille);
			for (let i=0;i<5;i++)	{
				if (points[i][0]==0||points[i][0]==0.25) shiftxnom=20;
				else shiftxnom=0;
				shiftynom=0;
				if (points[i][1]==-0.5) shiftynom=10;	
				if (points[i][1]==-0.25) shiftynom=20;
				SVG_tracer_point(mon_svg,calcul(20+(points[i][0]-xmin)*480/(xmax-xmin)),calcul(480-(points[i][1]-ymin)*480/(ymax-ymin)),nom[i],'blue',-10+shiftxnom,10+shiftynom,[true,AxesXY[0],AxesXY[1]])
			}
			clearInterval(SVGExist[id_du_div]);//Arrête le timer
			}

		}, 100); // Vérifie toutes les 100ms



	}
	else { //sortie Latex 
		texte =`\\begin{tikzpicture}`;
		texte += Latex_repere(xmin,xmax,ymin,ymax,k,k,grille);
		for (let i=0;i<5;i++)	{
		texte += `\n\t \\tkzDefPoint(${points[i][0]},${points[i][1]}){A}`
		texte +=`\n\t \\tkzDrawPoint[shape=cross out,color=blue,size=6](A)`
		texte +=`\n\t \\tkzLabelPoint[above right=3pt,fill=white,fill opacity=0.7,text opacity=1,inner sep=0](A){$${nom[i]}$}`
		}
		texte +=`\n\t \\end{tikzpicture}`;
		this.liste_questions.push(texte);
		
		texte_corr =`\\begin{tikzpicture}`;
		texte_corr += Latex_repere(xmin,xmax,ymin,ymax,k,k,grille);
		for (let i=0;i<5;i++)	{
		texte_corr += `\n\t \\tkzDefPoint(${points[i][0]},${points[i][1]}){A}`
		texte_corr +=`\n\t \\tkzDrawPoint[shape=cross out,color=blue,size=6](A)`
		texte_corr +=`\n\t \\tkzLabelPoint[above right=3pt,fill=white,fill opacity=0.7,text opacity=1,inner sep=0](A){$${nom[i]}$}`
		texte_corr +=`\n\t \\tkzPointShowCoord(A)`
		}
		texte_corr +=`\n\t \\end{tikzpicture}`;
		this.liste_corrections.push(texte_corr);
	}

	texte=`Déterminer les coordonnées des points`;
	texte_corr=`Les coordonnées des points sont :<br>`
	for (i=0;i<4;i++) {
	texte+=` $${nom[i]}$,`;
	texte_corr+=` $${nom[i]}(${tex_nombre(points[i][0])};${tex_nombre(points[i][1])})$, `;
	}
	texte+=` $${nom[i]}$.`
	texte_corr+=` $${nom[i]}(${tex_nombre(points[i][0])};${tex_nombre(points[i][1])})$.`;	
	this.liste_questions.push(texte)
	this.liste_corrections.push(texte_corr);
	liste_de_question_to_contenu_sans_numero(this); 
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',3,"1 : Coordonnées entières\n2 : Coordonnées 'en demis'\n3 : Coordonnées 'en quarts'"];
	this.besoin_formulaire2_case_a_cocher = ['Grille de lecture'];
}
/**
 * Calculs de probabilités sur une expérience aléatoire à une épreuve.
 * @Auteur Jean-Claude Lhote
 */
function fonctions_probabilite1(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Calculer des probabilités dans une expérience aléatoire à une épreuve";
	this.consigne = "";
	this.nb_questions = 4;
	this.nb_questions_modifiable = false;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	sortie_html? this.spacing = 2 : this.spacing = 1; 
	sortie_html? this.spacing_corr = 3 : this.spacing_corr = 1;
	this.sup=1;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let liste_index_disponibles=[0,1,2,3,4,5,6];
		let liste_index=combinaison_listes(liste_index_disponibles,this.nb_questions)
		let liste_de_lieux_choses=[['le frigo','yaourts'],['le frigo','desserts lactés'],['une urne','boules'],['une urne','jetons'],['un paquet de bonbons','nounours'],['un tiroir de la commode','t-shirts'],['un tas de jetons de poker','jetons']]
		let qualites=[[]]
		qualites[0]=['à la fraise','à la vanille','à l\'abricot','à l\'ananas','à la cerise'];
		qualites[1]=['au chocolat','à la vanille','au café','à la pistache','au caramel'];
		qualites[2]=['rouges','vertes','bleues','noires','blanches'];
		qualites[3]=['gris','cyans','roses','jaunes','violets'];
		qualites[4]=['rouges','verts','bleus','noirs','jaunes'];
		qualites[5]=['rouges','verts','bleus','noirs','blancs'];
		qualites[6]=['rouges','verts','bleus','noirs','jaunes'];
		for (let i = 0,p,m,q,somme,quidam,index1,lieu,objet,article,pronom,n=[], texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50;) {
			index1=liste_index[i];
			if (index1==2) {article=`une`;pronom=`elles`}
			else {article=`un`;pronom=`eux`;}
			quidam=prenom();
			lieu=liste_de_lieux_choses[index1][0];
			objet=liste_de_lieux_choses[index1][1];
			n[0]=randint(2,5);
			n[1]=randint(1,6)+1;
			n[2]=randint(1,3)*2;
			n[3]=randint(1,4)+2;
			n[4]=randint(2,5);

			somme=n[0]+n[1]+n[2]+n[3]+n[4];
			m=randint(0,4);
			p=randint(0,4,[m]);
			q=randint(0,4,[p,m]);
	
			texte = `Dans ${lieu} il y a ${somme} ${objet}. ${n[0]} sont ${qualites[index1][0]}, ${n[1]} sont ${qualites[index1][1]}, ${n[2]} sont ${qualites[index1][2]}, ${n[3]} sont ${qualites[index1][3]} et ${n[4]} sont ${qualites[index1][4]}.<br> `;
			texte+= `${quidam} choisit au hasard l'${article} d'entre ${pronom}.<br> `;
			texte +=num_alpha(0)+` Quelle est la probabilité que son choix tombe sur l'${article} des ${objet} ${qualites[index1][m]} ?<br>`;
			texte +=num_alpha(1)+` Quelle est la probabilité que son choix tombe sur l'${article} des ${objet} ${qualites[index1][p]} ?<br>`;			
			texte +=num_alpha(2)+` Quelle est la probabilité que son choix ne tombe pas sur l'${article} des ${objet} ${qualites[index1][q]} ?<br>`;
			texte +=num_alpha(3)+` Quelle est la probabilité que son choix tombe sur l'${article} des ${objet} ${qualites[index1][m]} ou ${qualites[index1][p]}?<br>`;
			texte_corr =`On est dans une situation d’équiprobabilité donc la probabilité est donnée par le quotient du nombre de cas favorables par le nombre de cas au total.<br>`
			texte_corr += num_alpha(0)+` Il y a ${n[m]} ${objet} ${qualites[index1][m]} et il y a ${somme} ${objet} possibles. La probabilité que son choix tombe sur l'${article} des ${objet} ${qualites[index1][m]} est :<br> $${tex_fraction(n[m],somme)}${simplification_de_fraction_avec_etapes(n[m],somme)}$.<br>`;
			texte_corr +=num_alpha(1)+` Il y a ${n[p]} ${objet} ${qualites[index1][p]} et il y a ${somme} ${objet} possibles. La probabilité que son choix tombe sur l'${article} des ${objet} ${qualites[index1][p]} est :<br> $${tex_fraction(n[p],somme)}${simplification_de_fraction_avec_etapes(n[p],somme)}$.<br>`;
			texte_corr +=num_alpha(2)+` Il y a ${n[q]} ${objet} ${qualites[index1][q]}, donc il y a ${somme} $-$ ${n[q]} $=$ ${somme-n[q]} autres ${objet} et il y a ${somme} ${objet} possibles. La probabilité que son choix ne tombe pas sur l'${article} des ${objet} ${qualites[index1][q]} est :<br> $${tex_fraction(somme-n[q],somme)}${simplification_de_fraction_avec_etapes(somme-n[q],somme)}$.<br>`;
			texte_corr +=num_alpha(3)+` La probabilité d'un événement est la somme des probabilités des issues qui le composent. Donc la probabilité que son choix tombe sur l'${article} des ${objet} ${qualites[index1][m]} ou ${qualites[index1][p]} est :<br> $${tex_fraction(n[m],somme)}+${tex_fraction(n[p],somme)}=${tex_fraction(n[p]+n[m],somme)}${simplification_de_fraction_avec_etapes(n[p]+n[m],somme)}$.<br>`;
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
	}	
};

/**
* Deux parallélogrammes sont tracés, on connait les 2 côté et une hauteur.
*
* Il faut calculer leurs aires.
*
* Pas de version LaTeX
* @Auteur Rémi Angot
*/
function Aire_du_parallelogramme(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.pas_de_version_LaTeX = true ;
	this.titre = "Aire du parallélogramme"
	this.consigne = "Calculer l'aire des 3 parallélogrammes suivants (les longueurs sont données en cm)."
	this.spacing = 2;
	this.spacing_corr = 2 ;
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;
	this.type_exercice = 'MG32';
	this.taille_div_MG32 = [800,600];


	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_corrections = []; // Liste de questions corrigées
		let c1 = randint(3,7)
		let h1 = randint(2,4)
		let c2 = randint(3,7)
		let h2 = randint(2,7)
		let c3 = randint(3,10)
		let h3 = randint(2,4)
		let fig1 ="TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAQzAAAC4QAAAQEAAAAAAAAAAQAAAMH#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AQAAAAAOAAFVAMAkAAAAAAAAQBAAAAAAAAAFAABAMU+dsi0OVkAxT52yLQ5W#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABAAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAVYAwAAAAAAAAABAEAAAAAAAAAUAAUBBT52yLQ5WAAAAAv####8AAAABAAhDU2VnbWVudAD#####AQAAAAAQAAABAAEAAAABAAAAA#####8AAAABAAdDTWlsaWV1AP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAABAAAAA#####8AAAACAAxDQ29tbWVudGFpcmUA#####wEAAAAAAAAAAAAAAABAGAAAAAAAAAAAAAUMAAAAAAABAAAAAAAAAAEAAAAAAAAAAAABMf####8AAAABAAlDTG9uZ3VldXIA#####wAAAAEAAAAD#####wAAAAEAB0NDYWxjdWwA#####wACYzEAATcAAAABQBwAAAAAAAAAAAACAP####8AAAAAABAAAUEAwBQAAAAAAADAOAAAAAAAAAUAAUA5gAAAAAAAQEO4UeuFHrgAAAADAP####8BAAAAARAAAAEAAQAAAAkBP#AAAAAAAAD#####AAAAAgAJQ0NlcmNsZU9SAP####8BAAAAAAEAAAAJ#####wAAAAEAD0NSZXN1bHRhdFZhbGV1cgAAAAgA#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAoAAAAL#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAIAAAAMAAAADQD#####AAAAAAAQAAFCAMAYAAAAAAAAwDgAAAAAAAAFAAEAAAAMAAAACQD#####AAJoMQABNAAAAAFAEAAAAAAAAP####8AAAABABZDRHJvaXRlUGVycGVuZGljdWxhaXJlAP####8BAAAAABAAAAEAAQAAAAkAAAAKAAAACgD#####AQAAAAABAAAACf####8AAAABAApDT3BlcmF0aW9uAwAAAAsAAAAIAAAAAUAIAAAAAAAAAAAAAAwA#####wAAAAoAAAARAAAADQD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAgAAABIAAAANAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQABAAAAEgAAAA4A#####wEAAAAAEAAAAQABAAAAFAAAAAoAAAAKAP####8BAAAAAAEAAAAUAAAACwAAAA8AAAAADAD#####AAAAFQAAABYAAAANAP####8AAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQACAAAAFwAAAA0A#####wAAAAAAEAABRADAFAAAAAAAAEAAAAAAAAAABQABAAAAF#####8AAAABABBDRHJvaXRlUGFyYWxsZWxlAP####8BAAAAABAAAAEAAQAAABkAAAAKAAAACgD#####AQAAAAABAAAAGQAAAAsAAAAIAAAAAAwA#####wAAABoAAAAbAAAADQD#####AAAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAgAAABwAAAANAP####8AAAAAABAAAUMAwBAAAAAAAABAAAAAAAAAAAUAAQAAABwAAAAGAP####8BAAAAARAAAVoAAAAAAAAAAABACAAAAAAAAAUAAAAACQAAAA4AAAAFAP####8AAAAAABAAAAEAAQAAAAkAAAAOAAAABQD#####AAAAAAAQAAABAAEAAAAOAAAAHgAAAAUA#####wAAAAAAEAAAAQABAAAAHgAAABkAAAAFAP####8AAAAAABAAAAEAAQAAABkAAAAJAAAADgD#####AQAAAAAQAAABAAEAAAAfAAAAIP####8AAAABABBDSW50RHJvaXRlRHJvaXRlAP####8BAAAAARAAAloyAAAAAAAAAAAAQAgAAAAAAAAFAAAAACQAAAAiAAAABQD#####AAAAAAAQAAABAQEAAAAfAAAAJf####8AAAABABRDSW1wbGVtZW50YXRpb25Qcm90bwD#####AB5BZmZpY2hhZ2UgZGUgbG9uZ3VldXIgb3JpZW50w6kAAAAHAAAAAgAAAAIAAAAfAAAAJQAAAAMAAAAAJwAAAAAAEAAAAQABAAAAHwE#8AAAAAAAAAAAAAQAAAAAJwAAAAAAEAACVycAAAAAAAAAAABACAAAAAAAAAUAAUBgwAAAAAAAAAAAKP####8AAAACABNDTWVzdXJlQW5nbGVPcmllbnRlAAAAACcAAmFuAAAAKQAAAB8AAAAlAAAACAEAAAAnAAAAHwAAACUAAAAGAAAAACcAAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAfAAAAJf####8AAAABAA1DUG9pbnRQcm9qZXRlAAAAACcAAAAAABAAAlciAAAAAAAAAAAAQAgAAAAAAAAFAAAAACUAAAAoAAAAEwAAAAAnAAJtYQAAACkAAAAfAAAALf####8AAAABAA5DVGVzdEV4aXN0ZW5jZQAAAAAnAAN0bWEAAAAu#####wAAAAEAD0NWYWxldXJBZmZpY2hlZQEAAAAnAAAAAABAAAAAAAAAAMAAAAAAAAAAAAAALBAAAAAAAAEAAAAC#####wAAAAEADUNGb25jdGlvbjNWYXIAAAAACwAAAC8AAAAPAAAAAAsAAAAqAAAACwAAAC4AAAALAAAAKgAAAAABAAAAKwAAABIA#####wAeQWZmaWNoYWdlIGRlIGxvbmd1ZXVyIG9yaWVudMOpAAAABwAAAAIAAAACAAAACQAAAA4AAAADAAAAADEAAAAAABAAAAEAAQAAAAkBP#AAAAAAAAAAAAAEAAAAADEAAAAAABAAAlcnAAAAAAAAAAAAQAgAAAAAAAAFAAFAYMAAAAAAAAAAADIAAAATAAAAADEAAmFuAAAAMwAAAAkAAAAOAAAACAEAAAAxAAAACQAAAA4AAAAGAAAAADEAAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAJAAAADgAAABQAAAAAMQAAAAAAEAACVyIAAAAAAAAAAABACAAAAAAAAAUAAAAADgAAADIAAAATAAAAADEAAm1hAAAAMwAAAAkAAAA3AAAAFQAAAAAxAAN0bWEAAAA4AAAAFgEAAAAxAAAAAABAAAAAAAAAAMAAAAAAAAAAAAAANhAAAAAAAAEAAAACAAAAFwAAAAALAAAAOQAAAA8AAAAACwAAADQAAAALAAAAOAAAAAsAAAA0AAAAAAEAAAA1AAAAEgD#####AB5BZmZpY2hhZ2UgZGUgbG9uZ3VldXIgb3JpZW50w6kAAAAHAAAAAgAAAAIAAAAOAAAAHgAAAAMAAAAAOwAAAAAAEAAAAQABAAAADgE#8AAAAAAAAAAAAAQAAAAAOwAAAAAAEAACVycAAAAAAAAAAABACAAAAAAAAAUAAUBgwAAAAAAAAAAAPAAAABMAAAAAOwACYW4AAAA9AAAADgAAAB4AAAAIAQAAADsAAAAOAAAAHgAAAAYAAAAAOwAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAA4AAAAeAAAAFAAAAAA7AAAAAAAQAAJXIgAAAAAAAAAAAEAIAAAAAAAABQAAAAAeAAAAPAAAABMAAAAAOwACbWEAAAA9AAAADgAAAEEAAAAVAAAAADsAA3RtYQAAAEIAAAAWAQAAADsAAAAAAEAAAAAAAAAAwAAAAAAAAAAAAABAEAAAAAAAAQAAAAIAAAAXAAAAAAsAAABDAAAADwAAAAALAAAAPgAAAAsAAABCAAAACwAAAD4AAAAAAQAAAD8AAAACAP####8AAAAAABAAAUUAwBQAAAAAAADANgAAAAAAAAUAAUA#gAAAAAAAQHH3Cj1wo9cAAAAJAP####8AAmMyAAE3AAAAAUAcAAAAAAAAAAAACQD#####AAJoMgABNwAAAAFAHAAAAAAAAAAAAAoA#####wEAAAAAAQAAAEUAAAALAAAARgD#####AAAAAQAPQ1BvaW50TGllQ2VyY2xlAP####8AAAAAABAAAUYAwBAAAAAAAADAOgAAAAAAAAUAAT#PhK2tCtK0AAAASAAAAAUA#####wAAAAAAEAAAAQABAAAARQAAAEkAAAAGAP####8BAAAAARAAAUoAAAAAAAAAAABACAAAAAAAAAUAAAAARQAAAEkAAAAOAP####8BAAAAABAAAAEAAQAAAEsAAABKAAAACgD#####AQAAAAABAAAASwAAAAsAAABHAAAAAAwA#####wAAAEwAAABNAAAADQD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAgAAAE4AAAANAP####8BAAAAARAAAUkAAAAAAAAAAABACAAAAAAAAAUAAQAAAE4AAAAKAP####8BAAAAAAEAAABFAAAADwIAAAABP9mZmZmZmZoAAAALAAAARgAAAAAMAP####8AAABKAAAAUQAAAA0A#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAEAAABSAAAADQD#####AAAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAgAAAFIAAAAOAP####8BAAAAABAAAAEAAQAAAFMAAABKAAAACgD#####AQAAAAABAAAAUwAAAAsAAABHAAAAAAwA#####wAAAFUAAABWAAAADQD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAgAAAFcAAAANAP####8AAAAAABAAAUgAwCQAAAAAAABAAAAAAAAAAAUAAQAAAFcAAAAQAP####8BAAAAABAAAAEAAQAAAFkAAABKAAAABQD#####AAAAAAAQAAABAAEAAABFAAAAWQAAABAA#####wEAAAAAEAAAAQABAAAASQAAAFsAAAARAP####8AAAAAABAAAUcAwCAAAAAAAABAAAAAAAAAAAUAAAAAWgAAAFwAAAAFAP####8AAAAAABAAAAEAAQAAAFkAAABdAAAABQD#####AAAAAAAQAAABAAEAAABdAAAASQAAAAUA#####wAAAAAAEAAAAQEBAAAASwAAAFAAAAASAP####8AHkFmZmljaGFnZSBkZSBsb25ndWV1ciBvcmllbnTDqQAAAAcAAAACAAAAAgAAAFkAAABFAAAAAwAAAABhAAAAAAAQAAABAAEAAABZAT#wAAAAAAAAAAAABAAAAABhAAAAAAAQAAJXJwAAAAAAAAAAAEAIAAAAAAAABQABQGDAAAAAAAAAAABiAAAAEwAAAABhAAJhbgAAAGMAAABZAAAARQAAAAgBAAAAYQAAAFkAAABFAAAABgAAAABhAAAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAWQAAAEUAAAAUAAAAAGEAAAAAABAAAlciAAAAAAAAAAAAQAgAAAAAAAAFAAAAAEUAAABiAAAAEwAAAABhAAJtYQAAAGMAAABZAAAAZwAAABUAAAAAYQADdG1hAAAAaAAAABYBAAAAYQAAAAAAQAAAAAAAAADAAAAAAAAAAAAAAGYQAAAAAAABAAAAAgAAABcAAAAACwAAAGkAAAAPAAAAAAsAAABkAAAACwAAAGgAAAALAAAAZAAAAAABAAAAZQAAABIA#####wAeQWZmaWNoYWdlIGRlIGxvbmd1ZXVyIG9yaWVudMOpAAAABwAAAAIAAAACAAAAUAAAAEsAAAADAAAAAGsAAAAAABAAAAEAAQAAAFABP#AAAAAAAAAAAAAEAAAAAGsAAAAAABAAAlcnAAAAAAAAAAAAQAgAAAAAAAAFAAFAYMAAAAAAAAAAAGwAAAATAAAAAGsAAmFuAAAAbQAAAFAAAABLAAAACAEAAABrAAAAUAAAAEsAAAAGAAAAAGsAAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABQAAAASwAAABQAAAAAawAAAAAAEAACVyIAAAAAAAAAAABACAAAAAAAAAUAAAAASwAAAGwAAAATAAAAAGsAAm1hAAAAbQAAAFAAAABxAAAAFQAAAABrAAN0bWEAAAByAAAAFgEAAABrAAAAAABAAAAAAAAAAMAAAAAAAAAAAAAAcBAAAAAAAAEAAAACAAAAFwAAAAALAAAAcwAAAA8AAAAACwAAAG4AAAALAAAAcgAAAAsAAABuAAAAAAEAAABvAAAAEgD#####AB5BZmZpY2hhZ2UgZGUgbG9uZ3VldXIgb3JpZW50w6kAAAAHAAAAAgAAAAIAAABZAAAAXQAAAAMAAAAAdQAAAAAAEAAAAQABAAAAWQE#8AAAAAAAAAAAAAQAAAAAdQAAAAAAEAACVycAAAAAAAAAAABACAAAAAAAAAUAAUBgwAAAAAAAAAAAdgAAABMAAAAAdQACYW4AAAB3AAAAWQAAAF0AAAAIAQAAAHUAAABZAAAAXQAAAAYAAAAAdQAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAFkAAABdAAAAFAAAAAB1AAAAAAAQAAJXIgAAAAAAAAAAAEAIAAAAAAAABQAAAABdAAAAdgAAABMAAAAAdQACbWEAAAB3AAAAWQAAAHsAAAAVAAAAAHUAA3RtYQAAAHwAAAAWAQAAAHUAAAAAAEAAAAAAAAAAwAAAAAAAAAAAAAB6EAAAAAAAAQAAAAIAAAAXAAAAAAsAAAB9AAAADwAAAAALAAAAeAAAAAsAAAB8AAAACwAAAHgAAAAAAQAAAHn#####AAAAAgAXQ01hcnF1ZUFuZ2xlR2VvbWV0cmlxdWUA#####wAAAAAAAQAAAAFAI7YIdN7bnAAAACUAAAAfAAAADgAAABkA#####wAAAAAAAQAAAAFAJLeGyzdqwwAAAB8AAAAlAAAAHgAAABkA#####wAAAAAAAQAAAAFAJ52vyk47vQAAAFAAAABLAAAASQAAABkA#####wAAAAAAAQAAAAFAJtJ6XCnohwAAAEsAAABQAAAAXQAAAAkA#####wACYzMAATcAAAABQBwAAAAAAAAAAAAJAP####8AAmgzAAE0AAAAAUAQAAAAAAAAAAAAAgD#####AAAAAAAQAAFNAMA1AAAAAAAAwCoAAAAAAAAFAAFAf3gAAAAAAEBnLhR64UeuAAAAAwD#####AQAAAAEQAAABAAEAAACFAD#wAAAAAAAAAAAACgD#####AQAAAAABAAAAhQAAAAsAAACDAAAAAAwA#####wAAAIYAAACHAAAADQD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAgAAAIgAAAANAP####8AAAAAABAAAU4AwDEAAAAAAADAJAAAAAAAAAUAAQAAAIgAAAAKAP####8BAAAAAAEAAACKAAAADwMAAAALAAAAgwAAAAFACAAAAAAAAAAAAAAMAP####8AAACGAAAAiwAAAA0A#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAEAAACMAAAADQD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAgAAAIwAAAAOAP####8BAAAAABAAAAEAAQAAAI4AAACGAAAACgD#####AQAAAAABAAAAjgAAAAsAAACEAAAAAAwA#####wAAAI8AAACQAAAADQD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAQAAAJEAAAANAP####8AAAAAABAAAU8AQBgAAAAAAADAKAAAAAAAAAUAAgAAAJEAAAAFAP####8AAAAAABAAAAEAAQAAAIoAAACTAAAABQD#####AAAAAAAQAAABAAEAAACFAAAAigAAAAoA#####wEAAAAAAQAAAJMAAAALAAAAgwAAAAADAP####8BAAAAARAAAAEAAQAAAJMAP#AAAAAAAAAAAAAMAP####8AAACXAAAAlgAAAA0A#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAEAAACYAAAADQD#####AAAAAAAQAAFQAEAUAAAAAAAAwCgAAAAAAAAFAAIAAACYAAAABQD#####AAAAAAAQAAABAAEAAACTAAAAmgAAAAUA#####wAAAAAAEAAAAQABAAAAmgAAAIUAAAAGAP####8BAAAAARAAAUsAAAAAAAAAAABACAAAAAAAAAUAAAAAigAAAIUAAAADAP####8BAAAAARAAAAEAAQAAAJ0BP#AAAAAAAAAAAAARAP####8BAAAAARAAAUwAAAAAAAAAAABACAAAAAAAAAUAAAAAngAAAJsAAAAFAP####8AAAAAABAAAAEBAQAAAJ0AAACfAAAAGQD#####AAAAAAABAAAAAUAlhyjGBrH8AAAAhQAAAJ0AAACfAAAAGQD#####AAAAAAABAAAAAUAiIExpX47ZAAAAnQAAAJ8AAACaAAAAEgD#####AB5BZmZpY2hhZ2UgZGUgbG9uZ3VldXIgb3JpZW50w6kAAAAHAAAAAgAAAAIAAACKAAAAkwAAAAMAAAAAowAAAAAAEAAAAQABAAAAigE#8AAAAAAAAAAAAAQAAAAAowAAAAAAEAACVycAAAAAAAAAAABACAAAAAAAAAUAAUBgwAAAAAAAAAAApAAAABMAAAAAowACYW4AAAClAAAAigAAAJMAAAAIAQAAAKMAAACKAAAAkwAAAAYAAAAAowAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAIoAAACTAAAAFAAAAACjAAAAAAAQAAJXIgAAAAAAAAAAAEAIAAAAAAAABQAAAACTAAAApAAAABMAAAAAowACbWEAAAClAAAAigAAAKkAAAAVAAAAAKMAA3RtYQAAAKoAAAAWAQAAAKMAAAAAAEAAAAAAAAAAwAAAAAAAAAAAAACoEAAAAAAAAQAAAAIAAAAXAAAAAAsAAACrAAAADwAAAAALAAAApgAAAAsAAACqAAAACwAAAKYAAAAAAQAAAKcAAAASAP####8AHkFmZmljaGFnZSBkZSBsb25ndWV1ciBvcmllbnTDqQAAAAcAAAACAAAAAgAAAJ0AAACfAAAAAwAAAACtAAAAAAAQAAABAAEAAACdAT#wAAAAAAAAAAAABAAAAACtAAAAAAAQAAJXJwAAAAAAAAAAAEAIAAAAAAAABQABQGDAAAAAAAAAAACuAAAAEwAAAACtAAJhbgAAAK8AAACdAAAAnwAAAAgBAAAArQAAAJ0AAACfAAAABgAAAACtAAAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAnQAAAJ8AAAAUAAAAAK0AAAAAABAAAlciAAAAAAAAAAAAQAgAAAAAAAAFAAAAAJ8AAACuAAAAEwAAAACtAAJtYQAAAK8AAACdAAAAswAAABUAAAAArQADdG1hAAAAtAAAABYBAAAArQAAAAAAQAAAAAAAAADAAAAAAAAAAAAAALIQAAAAAAABAAAAAgAAABcAAAAACwAAALUAAAAPAAAAAAsAAACwAAAACwAAALQAAAALAAAAsAAAAAABAAAAsQAAABIA#####wAeQWZmaWNoYWdlIGRlIGxvbmd1ZXVyIG9yaWVudMOpAAAABwAAAAIAAAACAAAAigAAAIUAAAADAAAAALcAAAAAABAAAAEAAQAAAIoBP#AAAAAAAAAAAAAEAAAAALcAAAAAABAAAlcnAAAAAAAAAAAAQAgAAAAAAAAFAAFAYMAAAAAAAAAAALgAAAATAAAAALcAAmFuAAAAuQAAAIoAAACFAAAACAEAAAC3AAAAigAAAIUAAAAGAAAAALcAAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAACKAAAAhQAAABQAAAAAtwAAAAAAEAACVyIAAAAAAAAAAABACAAAAAAAAAUAAAAAhQAAALgAAAATAAAAALcAAm1hAAAAuQAAAIoAAAC9AAAAFQAAAAC3AAN0bWEAAAC+AAAAFgEAAAC3AAAAAABAAAAAAAAAAMAAAAAAAAAAAAAAvBAAAAAAAAEAAAACAAAAFwAAAAALAAAAvwAAAA8AAAAACwAAALoAAAALAAAAvgAAAAsAAAC6AAAAAAEAAAC7AAAAB###########"
		let fig2 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAQzAAAC4QAAAQEAAAAAAAAAAQAAAL7#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AQAAAAAOAAFVAMAkAAAAAAAAQBAAAAAAAAAFAABAMU+dsi0OVkAxT52yLQ5W#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABAAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAVYAwAAAAAAAAABAEAAAAAAAAAUAAUBBT52yLQ5WAAAAAv####8AAAABAAhDU2VnbWVudAD#####AQAAAAAQAAABAAEAAAABAAAAA#####8AAAABAAdDTWlsaWV1AP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAABAAAAA#####8AAAACAAxDQ29tbWVudGFpcmUA#####wEAAAAAAAAAAAAAAABAGAAAAAAAAAAAAAUMAAAAAAABAAAAAAAAAAEAAAAAAAAAAAABMf####8AAAABAAlDTG9uZ3VldXIA#####wAAAAEAAAAD#####wAAAAEAB0NDYWxjdWwA#####wACYzEAATcAAAABQBwAAAAAAAAAAAACAP####8AAAAAABAAAUEAwBQAAAAAAADAOAAAAAAAAAUAAUA5gAAAAAAAQEO4UeuFHrgAAAADAP####8BAAAAARAAAAEAAQAAAAkBP#AAAAAAAAD#####AAAAAgAJQ0NlcmNsZU9SAP####8BAAAAAAEAAAAJ#####wAAAAEAD0NSZXN1bHRhdFZhbGV1cgAAAAgA#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAoAAAAL#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAIAAAAMAAAADQD#####AAAAAAAQAAFCAMAYAAAAAAAAwDgAAAAAAAAFAAEAAAAMAAAACQD#####AAJoMQABNAAAAAFAEAAAAAAAAP####8AAAABABZDRHJvaXRlUGVycGVuZGljdWxhaXJlAP####8BAAAAABAAAAEAAQAAAAkAAAAKAAAACgD#####AQAAAAABAAAACf####8AAAABAApDT3BlcmF0aW9uAwAAAAsAAAAIAAAAAUAIAAAAAAAAAAAAAAwA#####wAAAAoAAAARAAAADQD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAgAAABIAAAANAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQABAAAAEgAAAA4A#####wEAAAAAEAAAAQABAAAAFAAAAAoAAAAKAP####8BAAAAAAEAAAAUAAAACwAAAA8AAAAADAD#####AAAAFQAAABYAAAANAP####8AAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQACAAAAFwAAAA0A#####wAAAAAAEAABRADAFAAAAAAAAEAAAAAAAAAABQABAAAAF#####8AAAABABBDRHJvaXRlUGFyYWxsZWxlAP####8BAAAAABAAAAEAAQAAABkAAAAKAAAACgD#####AQAAAAABAAAAGQAAAAsAAAAIAAAAAAwA#####wAAABoAAAAbAAAADQD#####AAAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAgAAABwAAAANAP####8AAAAAABAAAUMAwBAAAAAAAABAAAAAAAAAAAUAAQAAABwAAAAGAP####8BAAAAARAAAVoAAAAAAAAAAABACAAAAAAAAAUAAAAACQAAAA4AAAAFAP####8AAAAAABAAAAEAAQAAAAkAAAAOAAAABQD#####AAAAAAAQAAABAAEAAAAOAAAAHgAAAAUA#####wAAAAAAEAAAAQABAAAAHgAAABkAAAAFAP####8AAAAAABAAAAEAAQAAABkAAAAJAAAADgD#####AQAAAAAQAAABAAEAAAAfAAAAIP####8AAAABABBDSW50RHJvaXRlRHJvaXRlAP####8BAAAAARAAAloyAAAAAAAAAAAAQAgAAAAAAAAFAAAAACQAAAAiAAAABQD#####AAAAAAAQAAABAQEAAAAfAAAAJf####8AAAABABRDSW1wbGVtZW50YXRpb25Qcm90bwD#####AB5BZmZpY2hhZ2UgZGUgbG9uZ3VldXIgb3JpZW50w6kAAAAHAAAAAgAAAAIAAAAfAAAAJQAAAAMAAAAAJwAAAAAAEAAAAQABAAAAHwE#8AAAAAAAAAAAAAQAAAAAJwAAAAAAEAACVycAAAAAAAAAAABACAAAAAAAAAUAAUBgwAAAAAAAAAAAKP####8AAAACABNDTWVzdXJlQW5nbGVPcmllbnRlAAAAACcAAmFuAAAAKQAAAB8AAAAlAAAACAEAAAAnAAAAHwAAACUAAAAGAAAAACcAAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAfAAAAJf####8AAAABAA1DUG9pbnRQcm9qZXRlAAAAACcAAAAAABAAAlciAAAAAAAAAAAAQAgAAAAAAAAFAAAAACUAAAAoAAAAEwAAAAAnAAJtYQAAACkAAAAfAAAALf####8AAAABAA5DVGVzdEV4aXN0ZW5jZQAAAAAnAAN0bWEAAAAu#####wAAAAEAD0NWYWxldXJBZmZpY2hlZQEAAAAnAAAAAABAAAAAAAAAAMAAAAAAAAAAAAAALBAAAAAAAAEAAAAC#####wAAAAEADUNGb25jdGlvbjNWYXIAAAAACwAAAC8AAAAPAAAAAAsAAAAqAAAACwAAAC4AAAALAAAAKgAAAAABAAAAKwAAABIA#####wAeQWZmaWNoYWdlIGRlIGxvbmd1ZXVyIG9yaWVudMOpAAAABwAAAAIAAAACAAAACQAAAA4AAAADAAAAADEAAAAAABAAAAEAAQAAAAkBP#AAAAAAAAAAAAAEAAAAADEAAAAAABAAAlcnAAAAAAAAAAAAQAgAAAAAAAAFAAFAYMAAAAAAAAAAADIAAAATAAAAADEAAmFuAAAAMwAAAAkAAAAOAAAACAEAAAAxAAAACQAAAA4AAAAGAAAAADEAAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAJAAAADgAAABQAAAAAMQAAAAAAEAACVyIAAAAAAAAAAABACAAAAAAAAAUAAAAADgAAADIAAAATAAAAADEAAm1hAAAAMwAAAAkAAAA3AAAAFQAAAAAxAAN0bWEAAAA4AAAAFgEAAAAxAAAAAABAAAAAAAAAAMAAAAAAAAAAAAAANhAAAAAAAAEAAAACAAAAFwAAAAALAAAAOQAAAA8AAAAACwAAADQAAAALAAAAOAAAAAsAAAA0AAAAAAEAAAA1AAAAEgD#####AB5BZmZpY2hhZ2UgZGUgbG9uZ3VldXIgb3JpZW50w6kAAAAHAAAAAgAAAAIAAAAOAAAAHgAAAAMAAAAAOwAAAAAAEAAAAQABAAAADgE#8AAAAAAAAAAAAAQAAAAAOwAAAAAAEAACVycAAAAAAAAAAABACAAAAAAAAAUAAUBgwAAAAAAAAAAAPAAAABMAAAAAOwACYW4AAAA9AAAADgAAAB4AAAAIAQAAADsAAAAOAAAAHgAAAAYAAAAAOwAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAA4AAAAeAAAAFAAAAAA7AAAAAAAQAAJXIgAAAAAAAAAAAEAIAAAAAAAABQAAAAAeAAAAPAAAABMAAAAAOwACbWEAAAA9AAAADgAAAEEAAAAVAAAAADsAA3RtYQAAAEIAAAAWAQAAADsAAAAAAEAAAAAAAAAAwAAAAAAAAAAAAABAEAAAAAAAAQAAAAIAAAAXAAAAAAsAAABDAAAADwAAAAALAAAAPgAAAAsAAABCAAAACwAAAD4AAAAAAQAAAD8AAAACAP####8AAAAAABAAAUUAwBQAAAAAAADANgAAAAAAAAUAAUCHhAAAAAAAQGGuFHrhR64AAAAJAP####8AAmMyAAE3AAAAAUAcAAAAAAAAAAAACQD#####AAJoMgABNwAAAAFAHAAAAAAAAAAAAAoA#####wEAAAAAAQAAAEUAAAALAAAARgD#####AAAAAQAPQ1BvaW50TGllQ2VyY2xlAP####8AAAAAABAAAUYAwBAAAAAAAABAEAAAAAAAAAUAAUAQpTrvfJtJAAAASAAAAAUA#####wAAAAAAEAAAAQABAAAARQAAAEkAAAAGAP####8BAAAAARAAAUoAAAAAAAAAAABACAAAAAAAAAUAAAAARQAAAEkAAAAOAP####8BAAAAABAAAAEAAQAAAEsAAABKAAAACgD#####AQAAAAABAAAASwAAAAsAAABHAAAAAAwA#####wAAAEwAAABNAAAADQD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAgAAAE4AAAANAP####8BAAAAARAAAUkAAAAAAAAAAABACAAAAAAAAAUAAQAAAE4AAAAKAP####8BAAAAAAEAAABFAAAADwIAAAABP9mZmZmZmZoAAAALAAAARgAAAAAMAP####8AAABKAAAAUQAAAA0A#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAEAAABSAAAADQD#####AAAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAgAAAFIAAAAOAP####8BAAAAABAAAAEAAQAAAFMAAABKAAAACgD#####AQAAAAABAAAAUwAAAAsAAABHAAAAAAwA#####wAAAFUAAABWAAAADQD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAgAAAFcAAAANAP####8AAAAAABAAAUgAwBQAAAAAAADAOQAAAAAAAAUAAQAAAFcAAAAQAP####8BAAAAABAAAAEAAQAAAFkAAABKAAAABQD#####AAAAAAAQAAABAAEAAABFAAAAWQAAABAA#####wEAAAAAEAAAAQABAAAASQAAAFsAAAARAP####8AAAAAABAAAUcAwCAAAAAAAABAAAAAAAAAAAUAAAAAWgAAAFwAAAAFAP####8AAAAAABAAAAEAAQAAAFkAAABdAAAABQD#####AAAAAAAQAAABAAEAAABdAAAASQAAAAUA#####wAAAAAAEAAAAQEBAAAASwAAAFAAAAASAP####8AHkFmZmljaGFnZSBkZSBsb25ndWV1ciBvcmllbnTDqQAAAAcAAAACAAAAAgAAAFkAAABFAAAAAwAAAABhAAAAAAAQAAABAAEAAABZAT#wAAAAAAAAAAAABAAAAABhAAAAAAAQAAJXJwAAAAAAAAAAAEAIAAAAAAAABQABQGDAAAAAAAAAAABiAAAAEwAAAABhAAJhbgAAAGMAAABZAAAARQAAAAgBAAAAYQAAAFkAAABFAAAABgAAAABhAAAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAWQAAAEUAAAAUAAAAAGEAAAAAABAAAlciAAAAAAAAAAAAQAgAAAAAAAAFAAAAAEUAAABiAAAAEwAAAABhAAJtYQAAAGMAAABZAAAAZwAAABUAAAAAYQADdG1hAAAAaAAAABYBAAAAYQAAAAAAQAAAAAAAAADAAAAAAAAAAAAAAGYQAAAAAAABAAAAAgAAABcAAAAACwAAAGkAAAAPAAAAAAsAAABkAAAACwAAAGgAAAALAAAAZAAAAAABAAAAZQAAABIA#####wAeQWZmaWNoYWdlIGRlIGxvbmd1ZXVyIG9yaWVudMOpAAAABwAAAAIAAAACAAAAUAAAAEsAAAADAAAAAGsAAAAAABAAAAEAAQAAAFABP#AAAAAAAAAAAAAEAAAAAGsAAAAAABAAAlcnAAAAAAAAAAAAQAgAAAAAAAAFAAFAYMAAAAAAAAAAAGwAAAATAAAAAGsAAmFuAAAAbQAAAFAAAABLAAAACAEAAABrAAAAUAAAAEsAAAAGAAAAAGsAAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABQAAAASwAAABQAAAAAawAAAAAAEAACVyIAAAAAAAAAAABACAAAAAAAAAUAAAAASwAAAGwAAAATAAAAAGsAAm1hAAAAbQAAAFAAAABxAAAAFQAAAABrAAN0bWEAAAByAAAAFgEAAABrAAAAAABAAAAAAAAAAMAAAAAAAAAAAAAAcBAAAAAAAAEAAAACAAAAFwAAAAALAAAAcwAAAA8AAAAACwAAAG4AAAALAAAAcgAAAAsAAABuAAAAAAEAAABvAAAAEgD#####AB5BZmZpY2hhZ2UgZGUgbG9uZ3VldXIgb3JpZW50w6kAAAAHAAAAAgAAAAIAAABZAAAAXQAAAAMAAAAAdQAAAAAAEAAAAQABAAAAWQE#8AAAAAAAAAAAAAQAAAAAdQAAAAAAEAACVycAAAAAAAAAAABACAAAAAAAAAUAAUBgwAAAAAAAAAAAdgAAABMAAAAAdQACYW4AAAB3AAAAWQAAAF0AAAAIAQAAAHUAAABZAAAAXQAAAAYAAAAAdQAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAFkAAABdAAAAFAAAAAB1AAAAAAAQAAJXIgAAAAAAAAAAAEAIAAAAAAAABQAAAABdAAAAdgAAABMAAAAAdQACbWEAAAB3AAAAWQAAAHsAAAAVAAAAAHUAA3RtYQAAAHwAAAAWAQAAAHUAAAAAAEAAAAAAAAAAwAAAAAAAAAAAAAB6EAAAAAAAAQAAAAIAAAAXAAAAAAsAAAB9AAAADwAAAAALAAAAeAAAAAsAAAB8AAAACwAAAHgAAAAAAQAAAHn#####AAAAAgAXQ01hcnF1ZUFuZ2xlR2VvbWV0cmlxdWUA#####wAAAAAAAQAAAAFAH79o6Vd44QAAAFAAAABLAAAARQAAABkA#####wAAAAAAAQAAAAFAHogkhw7PmgAAAEsAAABQAAAAWQAAABkA#####wAAAAAAAQAAAAFAIGGDLk4E3QAAACUAAAAfAAAADgAAABkA#####wAAAAAAAQAAAAFAIG#NSbOaeQAAAB8AAAAlAAAAHgAAAAkA#####wACYzMAAjEwAAAAAUAkAAAAAAAAAAAACQD#####AAJoMwABNQAAAAFAFAAAAAAAAAAAAAIA#####wAAAAAAEAABTQDAMgAAAAAAAMAuAAAAAAAABQABQFAgAAAAAABAdRcKPXCj1wAAAAoA#####wEAAAAAAQAAAIUAAAALAAAAgwAAAAAYAP####8AAAAAABAAAU4AQBAAAAAAAADAKAAAAAAAAAUAAUAYdXZyBbfYAAAAhgAAAAUA#####wAAAAAAEAAAAQABAAAAhQAAAIcAAAAKAP####8BAAAAAAEAAACFAAAADwMAAAALAAAAgwAAAAFAFAAAAAAAAAAAAAAMAP####8AAACIAAAAiQAAAA0A#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAEAAACKAAAADQD#####AAAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAgAAAIoAAAAOAP####8BAAAAABAAAAEAAQAAAIsAAACIAAAACgD#####AQAAAAABAAAAiwAAAAsAAACEAAAAAAwA#####wAAAI0AAACOAAAADQD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAgAAAI8AAAANAP####8AAAAAABAAAVAAwDAAAAAAAADAGAAAAAAAAAUAAQAAAI8AAAAFAP####8AAAAAABAAAAEAAQAAAIUAAACRAAAACgD#####AQAAAAABAAAAkQAAAAsAAACDAAAAABAA#####wEAAAAAEAAAAQABAAAAkQAAAIgAAAAMAP####8AAACUAAAAkwAAAA0A#####wAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAIAAACVAAAADQD#####AAAAAAAQAAFPAEAUAAAAAAAAwCIAAAAAAAAFAAEAAACVAAAABQD#####AAAAAAAQAAABAAEAAACRAAAAlwAAAAUA#####wAAAAAAEAAAAQABAAAAlwAAAIcAAAAGAP####8BAAAAABAAAUsAAAAAAAAAAABACAAAAAAAAAUAAAAAhQAAAIcAAAAOAP####8BAAAAABAAAAEAAQAAAJoAAACIAAAAEQD#####AQAAAAAQAAFMAAAAAAAAAAAAQAgAAAAAAAAFAAAAAJsAAACUAAAAGQD#####AAAAAAABAAAAAUAkP+hrfTwUAAAAnAAAAJoAAACHAAAAGQD#####AAAAAAABAAAAAUAk8wqocINWAAAAmgAAAJwAAACXAAAABQD#####AAAAAAAQAAABAQEAAACcAAAAmgAAABIA#####wAeQWZmaWNoYWdlIGRlIGxvbmd1ZXVyIG9yaWVudMOpAAAABwAAAAIAAAACAAAAhQAAAIcAAAADAAAAAKAAAAAAABAAAAEAAQAAAIUBP#AAAAAAAAAAAAAEAAAAAKAAAAAAABAAAlcnAAAAAAAAAAAAQAgAAAAAAAAFAAFAYMAAAAAAAAAAAKEAAAATAAAAAKAAAmFuAAAAogAAAIUAAACHAAAACAEAAACgAAAAhQAAAIcAAAAGAAAAAKAAAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAACFAAAAhwAAABQAAAAAoAAAAAAAEAACVyIAAAAAAAAAAABACAAAAAAAAAUAAAAAhwAAAKEAAAATAAAAAKAAAm1hAAAAogAAAIUAAACmAAAAFQAAAACgAAN0bWEAAACnAAAAFgEAAACgAAAAAABAAAAAAAAAAMAAAAAAAAAAAAAApRAAAAAAAAEAAAACAAAAFwAAAAALAAAAqAAAAA8AAAAACwAAAKMAAAALAAAApwAAAAsAAACjAAAAAAEAAACkAAAAEgD#####AB5BZmZpY2hhZ2UgZGUgbG9uZ3VldXIgb3JpZW50w6kAAAAHAAAAAgAAAAIAAACFAAAAkQAAAAMAAAAAqgAAAAAAEAAAAQABAAAAhQE#8AAAAAAAAAAAAAQAAAAAqgAAAAAAEAACVycAAAAAAAAAAABACAAAAAAAAAUAAUBgwAAAAAAAAAAAqwAAABMAAAAAqgACYW4AAACsAAAAhQAAAJEAAAAIAQAAAKoAAACFAAAAkQAAAAYAAAAAqgAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAIUAAACRAAAAFAAAAACqAAAAAAAQAAJXIgAAAAAAAAAAAEAIAAAAAAAABQAAAACRAAAAqwAAABMAAAAAqgACbWEAAACsAAAAhQAAALAAAAAVAAAAAKoAA3RtYQAAALEAAAAWAQAAAKoAAAAAAEAAAAAAAAAAwAAAAAAAAAAAAACvEAAAAAAAAQAAAAIAAAAXAAAAAAsAAACyAAAADwAAAAALAAAArQAAAAsAAACxAAAACwAAAK0AAAAAAQAAAK4AAAASAP####8AHkFmZmljaGFnZSBkZSBsb25ndWV1ciBvcmllbnTDqQAAAAcAAAACAAAAAgAAAJoAAACcAAAAAwAAAAC0AAAAAAAQAAABAAEAAACaAT#wAAAAAAAAAAAABAAAAAC0AAAAAAAQAAJXJwAAAAAAAAAAAEAIAAAAAAAABQABQGDAAAAAAAAAAAC1AAAAEwAAAAC0AAJhbgAAALYAAACaAAAAnAAAAAgBAAAAtAAAAJoAAACcAAAABgAAAAC0AAAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAmgAAAJwAAAAUAAAAALQAAAAAABAAAlciAAAAAAAAAAAAQAgAAAAAAAAFAAAAAJwAAAC1AAAAEwAAAAC0AAJtYQAAALYAAACaAAAAugAAABUAAAAAtAADdG1hAAAAuwAAABYBAAAAtAAAAAAAQAAAAAAAAADAAAAAAAAAAAAAALkQAAAAAAABAAAAAgAAABcAAAAACwAAALwAAAAPAAAAAAsAAAC3AAAACwAAALsAAAALAAAAtwAAAAABAAAAuAAAAAf##########w=="
		let codeBase64 = choice([fig1,fig2])

		texte_corr = `Dans chaque parallélogramme, le segment en pointillés est ${texte_en_couleur_et_gras("perpendiculaire")} à deux côtés opposés, c'est donc une ${texte_en_couleur_et_gras("hauteur")}.<br>`
		texte_corr += `Pour obtenir l'aire, il faut multiplier cette ${texte_en_couleur_et_gras("hauteur")} par la longueur de la ${texte_en_couleur_et_gras("base")} correspondante.`
		texte_corr += "<br><br>"
		texte_corr += `$\\mathcal{A}_{ABCD}=${c1}~\\text{cm}\\times ${h1}~\\text{cm}=${c1*h1}~\\text{cm}^2$`
		texte_corr += `<br>$\\mathcal{A}_{EFGH}=${c2}~\\text{cm}\\times ${h2}~\\text{cm}=${c2*h2}~\\text{cm}^2$`
		texte_corr += `<br>$\\mathcal{A}_{MNOP}=${c3}~\\text{cm}\\times ${h3}~\\text{cm}=${c3*h3}~\\text{cm}^2$`
		

		this.MG32codeBase64 = codeBase64
		this.MG32code_pour_modifier_la_figure = `
	        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "c1", "${c1}");
	        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "h1", "${h1}");
	        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "c2", "${c2}");
	        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "h2", "${h2}");
	        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "c3", "${c3}");
	        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "h3", "${h3}");
	        mtg32App.calculate("MG32svg${numero_de_l_exercice}");
	        mtg32App.display("MG32svg${numero_de_l_exercice}");
	      ` 	
		
			
		this.liste_corrections.push(texte_corr);
		liste_de_question_to_contenu_sans_numero(this);		
	}

// 	this.besoin_formulaire_numerique = ['Niveau de difficulté',3,"1 : Périmètres\n\
// 2 : Aires\n3 : Périmètres et aires"];

};

/**
 * 5A10 - Division Euclidienne; diviseurs, multiples, critères de divisibilité
 * Exercice bilan
 * @author Sébastien Lozano
 */
 
function Liste_des_diviseurs_5e(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1 ; 
	this.titre = "Écrire la liste de tous les diviseurs d'un entier."; 
	// pas de différence entre la version html et la version latex pour la consigne
	//this.consigne =`Écrire la liste de tous les diviseurs d'un entier.`;
	this.consigne =``;
	//this.consigne += `<br>`;
	sortie_html ? this.spacing = 2 : this.spacing = 1;
	sortie_html ? this.spacing_corr = 2: this.spacing_corr = 1;
	this.nb_questions = 3;
	//this.correction_detaillee_disponible = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function(numero_de_l_exercice){
		let type_de_questions;
		if (sortie_html) { // les boutons d'aide uniquement pour la version html
			//this.bouton_aide = '';
			//this.bouton_aide = modal_pdf(numero_de_l_exercice,"pdf/FicheArithmetique-3A10.pdf","Aide mémoire sur la division euclidienne (Sébastien Lozano)","Aide mémoire")		
			//this.bouton_aide += modal_video('conteMathsNombresPremiers','videos/LesNombresPremiers.mp4','Petit conte mathématique','Intro Vidéo');
		} else { // sortie LaTeX
		};

		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées

		let type_de_questions_disponibles = [1,1,2];
		//let type_de_questions_disponibles = [1];
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles,this.nb_questions);

			for (let i = 0, texte, texte_corr, cpt=0; i < this.nb_questions&&cpt<50;) {
				type_de_questions = liste_type_de_questions[i];

				switch (type_de_questions) {
					case 1 : // Compléter un tableau pour trouver la liste de tous les diviseurs d'un entier
						// on choisit un entier non premier inférieur à 99
						let M = randint(2,99,crible_eratosthene_n(99));
						// on calcule le nombre de diviseur de M pour prévoir le nombre de lignes du tableau
						let nbre_diviseurs_M = liste_diviseurs(M).length;
						
						texte = `Compléter le tableau suivant et faire la liste de tous les diviseurs de ${M}`;										
						if (!sortie_html) {
							texte += `$\\medskip$`;
						};
						texte += `<br>`;						
						if (sortie_html) {
							texte += `$\\def\\arraystretch{2.5}\\begin{array}{|c|c|c|}\n`
						} else {
							
							texte += `$\\begin{array}{|c|c|c|}\n`
						};						
						texte += `\\hline\n`
						texte += `\\text{Facteur n°1} & \\text{Facteur n°2} & \\text{Produit donnant } ${M} \\\\\n`
						texte += `\\hline\n`

						if (nbre_diviseurs_M%2==0) {//si il y a un nombre pair de diviseurs
							for (let m = 0; m<(liste_diviseurs(M).length/2); m++){
								texte += texte_ou_pas(liste_diviseurs(M)[m])+` & `+texte_ou_pas(liste_diviseurs(M)[(liste_diviseurs(M).length-m-1)])+`& ${texte_ou_pas(M)} \\\\\n`;
								texte += `\\hline\n`;
							};
						} else { // sinon il est impair, cela n'arrive qu'avvec les carrés parfaits
							for (let m = 0; m<((liste_diviseurs(M).length-1)/2); m++){
								texte += texte_ou_pas(liste_diviseurs(M)[m])+` & `+texte_ou_pas(liste_diviseurs(M)[(liste_diviseurs(M).length-m-1)])+`& ${texte_ou_pas(M)} \\\\\n`;
							};
							texte += texte_ou_pas(liste_diviseurs(M)[(nbre_diviseurs_M-1)/2])+` & `+texte_ou_pas(liste_diviseurs(M)[(nbre_diviseurs_M-1)/2])+`& ${texte_ou_pas(M)} \\\\\n`;							
							texte += `\\hline\n`;
						};			
						texte += `\\end{array}\n$`

						// correction

						texte_corr = `Le tableau suivant contient tous les couples de facteurs dont le produit vaut ${M}`;
						if (!sortie_html) {
							texte_corr += `$\\medskip$`;
						};
						texte_corr += `<br>`;						
						if (sortie_html) {
							texte_corr += `$\\def\\arraystretch{2.5}\\begin{array}{|c|c|c|}\n`
						} else {
							texte_corr += `$\\begin{array}{|c|c|c|}\n`
						};						
						texte_corr += `\\hline\n`
						texte_corr += `\\text{Facteur n°1} & \\text{Facteur n°2} & \\text{Produit donnant } ${M} \\\\\n`
						texte_corr += `\\hline\n`

						if (nbre_diviseurs_M%2==0) {//si il y a un nombre pair de diviseurs
							for (let m = 0; m<(liste_diviseurs(M).length/2); m++){
								texte_corr += liste_diviseurs(M)[m]+` & `+liste_diviseurs(M)[(liste_diviseurs(M).length-m-1)]+`& ${M} \\\\\n`;
								texte_corr += `\\hline\n`;
							};
						} else { // sinon il est impair, cela n'arrive qu'avvec les carrés parfaits
							for (let m = 0; m<((liste_diviseurs(M).length-1)/2); m++){
								texte_corr += liste_diviseurs(M)[m]+` & `+liste_diviseurs(M)[(liste_diviseurs(M).length-m-1)]+`& ${M} \\\\\n`;
							};
							texte_corr += liste_diviseurs(M)[(nbre_diviseurs_M-1)/2]+` & `+liste_diviseurs(M)[(nbre_diviseurs_M-1)/2]+`& ${M} \\\\\n`;							
							texte_corr += `\\hline\n`;
						};		
						texte_corr += `\\end{array}\n$`
						if (!sortie_html) {
							texte_corr += `$\\medskip$`;
						};
						texte_corr += `<br>`;
						texte_corr += `${M} a donc ${nbre_diviseurs_M} diviseurs qui sont : `;
						texte_corr += `1`;
						for (let w = 1; w<liste_diviseurs(M).length; w++) {
							texte_corr += ` ; `+liste_diviseurs(M)[w];
						};
						texte_corr += `.`;					
						break;
					case 2 : // liste des diviseurs
						// on définit un tableau pour les choix du nombre dont on veut les diviseurs
						// 3 parmis 2,99 y compris les premiers et 1 parmis les entiers à 3 chiffres ayant au moins 8 diviseurs, il y en a 223 !
						let tableau_de_choix = [];
						tableau_de_choix =[randint(2,99),randint(2,99,[tableau_de_choix[0]]),randint(2,99,[tableau_de_choix[0],tableau_de_choix[1]]),randint(2,99,[tableau_de_choix[0],tableau_de_choix[1],tableau_de_choix[2]])];
						let tableau_de_choix_3chiffres =[];
						for (let m=101; m<999; m++) {
							if (liste_diviseurs(m).length>8) {
								tableau_de_choix_3chiffres.push(m);
							};
						};
						// on ajoute un nombre à trois chiffre avec au moins 8 diviseurs dans les choix possibles
						let rg_Nb_3chiffres = randint(0,(tableau_de_choix_3chiffres.length-1));
						tableau_de_choix.push(tableau_de_choix_3chiffres[rg_Nb_3chiffres]);
										
						let N; // on déclare le nombre dont on va chercher les diviseurs
						let rg_N; // pour tirer le rang du nombre dans le tableau des choix
						rg_N = randint(0,(tableau_de_choix.length-1));
						N = tableau_de_choix[rg_N];
						texte = `Écrire la liste de tous les diviseurs de ${N}.`;
						texte_corr = `Pour trouver la liste des diviseurs de ${N} on cherche tous les produits de deux facteurs qui donnent ${N}. En écrivant toujours le plus petit facteur en premier.<br>`;
						texte_corr += `Il est suffisant de chercher des diviseurs inférieurs au plus grand nombre dont le carré vaut ${N}, par exemple ici, ${Math.trunc(Math.sqrt(N))}$\\times$${Math.trunc(Math.sqrt(N))} = ${Math.trunc(Math.sqrt(N))*Math.trunc(Math.sqrt(N))}<${N}`;
						texte_corr += ` et ${Math.trunc(Math.sqrt(N))+1}$\\times$${Math.trunc(Math.sqrt(N))+1} = ${(Math.trunc(Math.sqrt(N))+1)*(Math.trunc(Math.sqrt(N))+1)}>${N} donc il suffit d'arrêter la recherche de facteur à ${Math.trunc(Math.sqrt(N))}.`;
						texte_corr += ` En effet, si ${N} est le produit de deux entiers p$\\times$q avec p < q alors si p$\\times$p > ${N} c'est que q$\\times$q < ${N} mais dans ce cas p serait supérieur à q sinon p$\\times$q serait inférieur à ${N} ce qui ne doit pas être le cas.<br>`
						if (liste_diviseurs(N).length%2==0) {//si il y a un nombre pair de diviseurs
							for (let m = 0; m<(liste_diviseurs(N).length/2); m++){
								texte_corr += ``+liste_diviseurs(N)[m]+`$\\times$`+liste_diviseurs(N)[(liste_diviseurs(N).length-m-1)]+` = ${N}<br>`;
							};
						} else {
							for (let m = 0; m<((liste_diviseurs(N).length-1)/2); m++){
								texte_corr += ``+liste_diviseurs(N)[m]+`$\\times$`+liste_diviseurs(N)[(liste_diviseurs(N).length-m-1)]+`<br>`;
							};
							texte_corr += ``+liste_diviseurs(N)[(liste_diviseurs(N).length-1)/2]+`$\\times$`+liste_diviseurs(N)[(liste_diviseurs(N).length-1)/2]+` = ${N}<br>`;
						};
						texte_corr += `Chacun des facteurs de la liste ci-dessus est un diviseur de ${N}.<br>`;
						texte_corr += `La liste des diviseurs de ${N} est donc `;
						texte_corr += `1`;
						for (let w = 1; w<liste_diviseurs(N).length; w++) {
							texte_corr += ` ; `+liste_diviseurs(N)[w];
						};
						texte_corr += `.`;
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
 * 5A11 justifier la non primalité réinvestissement des critères de divisibilité
 * Nombres à 3 ou 4 chiffres, un multiple de 2, de 3, de 5, de 7, de 10, sous forme d'un produit de deux nombres premiers inférieurs à 30
 * et un nombre premier inferieur à 529 
 * @author Sébastien Lozano
 */
function Premier_ou_pas_5e(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Primalité ou pas"; 
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne =`Justifier que les nombres suivants sont premiers ou pas.`;
	//this.consigne += `<br>`;	
	sortie_html ? this.spacing = 3 : this.spacing = 2;
	sortie_html ? this.spacing_corr = 2: this.spacing_corr = 1;
	this.nb_questions = 7;
	//this.correction_detaillee_disponible = true;
	this.nb_cols = 2;
	this.nb_cols_corr = 1;
	this.sup = 1;
	this.liste_packages = `bclogo`;

	this.nouvelle_version = function(numero_de_l_exercice){
		let type_de_questions;
		if (sortie_html) { // les boutons d'aide uniquement pour la version html
			//this.bouton_aide = '';
			this.bouton_aide = modal_pdf(numero_de_l_exercice,"pdf/FicheArithmetique-5A11.pdf","Aide mémoire sur les nombres premiers (Sébastien Lozano)","Aide mémoire")		
			this.bouton_aide += modal_video('conteMathsNombresPremiers','videos/LesNombresPremiers.mp4','Petit conte mathématique - Les Nombres Premiers','Intro Vidéo');
		} else { // sortie LaTeX
		};

		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées

		let type_de_questions_disponibles = [1,2,3,4,5,6,7];
		type_de_questions_disponibles=shuffle(type_de_questions_disponibles); // on mélange l'ordre des questions
		//let type_de_questions_disponibles = [1];
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles,this.nb_questions);
		
		let string_rappel = `Cette liste des nombres premiers inférieurs à 30 pourra être utile : <br>`+crible_eratosthene_n(100)[0];
		for (let k=1;k<crible_eratosthene_n(30).length;k++) {
			string_rappel +=`, `+crible_eratosthene_n(30)[k];
		};
		string_rappel +=`.`;
		this.introduction = warn_message(string_rappel,`nombres`,`Coup de pouce`);

			for (let i = 0, texte, texte_corr, cpt=0; i < this.nb_questions&&cpt<50;) {

				type_de_questions = liste_type_de_questions[i];
				
				var N; // le nombre de la question
	
				switch (type_de_questions) {
					case 1 : // nombre pair
						N=2*randint(51,4999);
						texte = nombre_avec_espace(N);						
						texte_corr = `Comme ${nombre_avec_espace(N)} est pair, il admet donc au moins trois diviseurs qui sont 1, 2 et lui-même, `;
						texte_corr += texte_en_couleur_et_gras(nombre_avec_espace(N)+` n'est donc pas premier.`);
						break;		
					case 2 : // Multiple de 3
						let sum3=0; // pour la valeur de la somme;
						N=3*randint(34,3333);
						texte = nombre_avec_espace(N);
						texte_corr = `Comme `+ N.toString().charAt(0);
						sum3 = Number(N.toString().charAt(0));
						for (let k=1; k<N.toString().length; k++) {
							texte_corr += ` + `+N.toString().charAt(k);
							sum3 +=Number(N.toString().charAt(k));
						};					
						texte_corr += ` = ${sum3} est un multiple de 3 donc ${nombre_avec_espace(N)} aussi, il admet donc au moins trois diviseurs qui sont 1, 3 et lui-même, `;
						texte_corr += texte_en_couleur_et_gras(nombre_avec_espace(N)+` n'est donc pas premier.`);
						break;	
					case 3 : // Multiple de 5
						N=5*randint(20,1999);
						texte = nombre_avec_espace(N);
						texte_corr = `Comme le dernier chiffre de ${nombre_avec_espace(N)} est un ${N.toString().charAt(N.toString().length-1)} alors ${nombre_avec_espace(N)} est divisible par 5, `;
						texte_corr += `il admet donc au moins trois diviseurs qui sont 1, 5 et lui-même, `;
						texte_corr += texte_en_couleur_et_gras(nombre_avec_espace(N)+` n'est donc pas premier.`);
						break;	
					case 4 : // Multiple de 9
						let sum9=0; // pour la valeur de la somme;
						N=9*randint(12,1111);
						texte = nombre_avec_espace(N);
						texte_corr = `Comme `+ N.toString().charAt(0);
						sum9 = Number(N.toString().charAt(0));
						for (let k=1; k<N.toString().length; k++) {
							texte_corr += ` + `+N.toString().charAt(k);
							sum9 +=Number(N.toString().charAt(k));
						};					
						texte_corr += ` = ${sum9} est un multiple de 9 donc ${nombre_avec_espace(N)} aussi, il admet donc au moins trois diviseurs qui sont 1, 9 et lui-même, `;
						texte_corr += texte_en_couleur_et_gras(nombre_avec_espace(N)+` n'est donc pas premier.`);
						break;	
					case 5 : // multiple de 10
						N=10*randint(10,999);
						texte = nombre_avec_espace(N);
						texte_corr = `Comme le nombre ${nombre_avec_espace(N)} se termine par un ${N.toString().charAt(N.toString().length-1)} alors ${nombre_avec_espace(N)} est un multiple de 10, `;
						texte_corr += `il admet donc au moins trois diviseurs qui sont 1, 10 et lui-même, `;
						texte_corr += texte_en_couleur_et_gras(nombre_avec_espace(N)+` n'est donc pas premier.`);
						break;	
					case 6 : // produit de deux nombres premiers inférieurs à 30
						// rang du premier facteur premier
						let r1 = randint(0,crible_eratosthene_n(30).length-1);
						// rang du second facteur premier
						let r2 = randint(0,crible_eratosthene_n(30).length-1);
						let prime1 = crible_eratosthene_n(100)[r1]; // on tire un nombre premier inférieur à 100, il n'y en a que 25!
						let prime2 = crible_eratosthene_n(100)[r2]; // on tire un autre nombre premier inférieur à 100, ça peut être le même qu'avant!
						N=prime1+`$\\times$`+prime2;
						texte = N;
						texte_corr = `${N} est le produit de ${prime1} et de ${prime2}, il admet donc au moins `;
						if (prime1==prime2) {
							texte_corr += `trois divisieurs qui sont 1, ${prime1} et lui-même ${N}=${nombre_avec_espace(prime1*prime2)} `;
						} else {
							texte_corr += `quatre diviseurs qui sont 1, ${prime1}, ${prime2} et lui-même ${N}=${nombre_avec_espace(prime1*prime2)}, `;
						};						
						texte_corr += texte_en_couleur_et_gras(`${N} = `+nombre_avec_espace(prime1*prime2)+` n'est donc pas premier.`);
						break;
					case 7 : // nombre premier inférieur à 29
						// rang du nombre premier choisi
						let r = randint(0,crible_eratosthene_n(29).length-1);
						N=crible_eratosthene_n(29)[r]; //on choisit un nombre premier inférieur à 529
						texte = N+``;
						let tab_premiers_a_tester = crible_eratosthene_n(N);
						texte_corr = `Testons la divisibilité de ${N} par tous les nombres premiers inférieurs à ${N}, c'est à dire par les nombres `;
						texte_corr += tab_premiers_a_tester[0];
						for (let k=1;k<tab_premiers_a_tester.length;k++) {
							texte_corr += `, `+tab_premiers_a_tester[k];
						};
						texte_corr += `.`;
						texte_corr += `<br> Aucun de ces nombres premiers ne divise ${N}, `;
						texte_corr += texte_en_couleur_et_gras(nombre_avec_espace(N)+` est donc premier.`);
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
	
};

/**
 * Trouver l'image d'une figure par une symétrie centrale dans un pavage (7 motifs différents)
 * @Auteur Jean-Claude Lhote
 */
function Pavages_et_transformations() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
//	this.titre = "Trouver l'image d'une figure par une symétrie centrale";
	this.pas_de_version_LaTeX=true;
	this.consigne = "";
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
//	this.sup = 1; // 1 pour symétrie axiale, 2 pour symétrie centrale, 3 pour translations, et 4 pour rotations ; paramètre fixé par les variantes respectives.
	sortie_html ? this.spacing_corr = 2.5 : this.spacing_corr = 1.5;
	this.liste_packages = 'tkz-euclide';
	this.nouvelle_version = function (numero_de_l_exercice) {
	this.type_exercice = 'MG32';
	this.MG32editable=false;
	this.taille_div_MG32 = [700, 700];
	this.liste_questions = [];
	this.liste_corrections = []; // Liste de questions corrigées
	//listes de pavages [nx,ny,xB,yB,xC,yC,xD,yD,zoom,anngle]  : 0=carrés, 1=cerf-volant 2=quadri concave 3=quadri quelconque 4=parallélogrammes 5=triangles rectangles isocèles 6=triangles équilatéraux 7=losanges
	let paves=[[5,5,4,0,4,4,0,4,22,0],[5,5,6,0,8,8,0,6,40,-9],[5,5,8,0,4,4,2,8,30,-10],[5,5,4,0,6,4,0,6,28,-15],[4,6,8,0,7,4,-1,4,32,0],[5,5,8,0,4,4,0,8,40,0],[5,5,4,0,3,2*Math.sin(Math.PI/3),2,4*Math.sin(Math.PI/3),15,0],[4,4,3,1,4,4,1,3,20,0]]

	let texte,texte_corr
	let tabfigA=[], tabfigB=[],tabfigC=[],tabfigD=[]
	let pave=[]
	switch (parseInt(this.sup)) {
		case 1:
			pave=paves[0] // pavages adaptés à symétrie axiale (carrés)
			break
		case 2:
			pave=paves[randint(0,7)] // pavages adaptés à symétrie centrale (tous)
			break
		case 3:
			pave=paves[randint(0,7)] //pavages adaptés à translation (tous)
			break
		case 4:
			pave=paves[0] // pavages adaptés à rotation (carrés  )
	}
	let nx=pave[0],ny=pave[1],xB=pave[2],yB=pave[3],xC=pave[4],yC=pave[5],xD=pave[6],yD=pave[7],Zoom=pave[8],Angle=pave[9]
	let xAI=xB+xC-xD
	let yAI=yB+yC-yD
	let xAJ=xC+xD-xB
	let yAJ=yC+yD-yB
	let xAxy,yAxy,numAxy
	let point=[0,0,0]
	let trouver=false,indexA,numA,indexcentre1,numcentre1,xmil1=0,ymil1=0,indexD,numD,indexcentre2,numcentre2,xmil2=0,ymil2=0,indexC,numC,indexcentre3,numcentre3,xmil3=0,ymil3=0,num1,num2,num3
	let xc=0,yc=0,xb=0,yb=0,xa=0,ya=0,xV1=0,yV1=0,xV2=0,yV2=0,xV3=0,yV3=0
	let s0 = choice([`S`,`T`,`L`,`W`,`R`,`G`,`E`,`F`,`G`,`K`])
	let s1 = choice([`S`,`T`,`L`,`W`,`R`,`G`,`E`,`F`,`G`,`K`],[s0])
	let s2 = choice([`S`,`T`,`L`,`W`,`R`,`G`,`E`,`F`,`G`,`K`],[s0,s1])


	for (let y=0;y<ny;y++) {  // On initialise les tableaux avec les coordonnées des points de référence (A,B,C et D) de chaque translaté et son numéro dans le pavage.
		for (let x=0;x<nx;x++) {
			xAxy=x*xAI+y*xAJ
			yAxy=x*yAI+y*yAJ
			numAxy=2*x+4*y*nx
			tabfigA.push([xAxy,yAxy,numAxy]) 
			tabfigB.push([xAxy+xB,yAxy+yB,numAxy+1])
			tabfigD.push([xAxy+xD,yAxy+yD,numAxy+2*nx])
			tabfigC.push([xAxy+xC,yAxy+yC,numAxy+2*nx+1])
		}
	}
	
	texte = `Le point O peut être déplacé pour recadrer éventuellement le pavage.<br>` // La figure énoncé a la même base pour toutes les transformations.
	
	switch (parseInt(this.sup)) {
		case 1 : //symétrie axiale
			this.MG32codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+0euFAAJmcv###wEA#wEAAAAAAAAAAAUcAAAC0gAAAQEAAAAAAAAAAQAAAQL#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAHQ0NhbGN1bAD#####AAVBbmdsZQABMAAAAAEAAAAAAAAAAAAAAAIA#####wAEWm9vbQACMzAAAAABQD4AAAAAAAAAAAACAP####8AAm54AAE1AAAAAUAUAAAAAAAA#####wAAAAEABUNGb25jAP####8AB21vZHVsb3gACG1vZCh4LDIp#####wAAAAEADUNGb25jdGlvbjJWYXIG#####wAAAAIAEUNWYXJpYWJsZUZvcm1lbGxlAAAAAAAAAAFAAAAAAAAAAAABeAAAAAMA#####wAHbW9kdWxveQASbW9kKGludCh5L254LzIpLDIpAAAABAb#####AAAAAgAJQ0ZvbmN0aW9uAv####8AAAABAApDT3BlcmF0aW9uAwAAAAcDAAAABQAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAAwAAAAFAAAAAAAAAAAAAAAFAAAAAAAAAAAABeQAAAAMA#####wACcjAAJXNpKChtb2R1bG94KHgpPTApKihtb2R1bG95KHgpPTApLDEsMCn#####AAAAAQANQ0ZvbmN0aW9uM1ZhcgAAAAAHAgAAAAcI#####wAAAAEADkNBcHBlbEZvbmN0aW9uAAAABAAAAAUAAAAAAAAAAQAAAAAAAAAAAAAABwgAAAAKAAAABQAAAAUAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAQAAAAAAAAAAAAF4AAAAAgD#####AAJ5RAABNAAAAAFAEAAAAAAAAAAAAAIA#####wACeEQAATAAAAABAAAAAAAAAAAAAAACAP####8AAnlDAAE0AAAAAUAQAAAAAAAAAAAAAgD#####AAJ4QwABNAAAAAFAEAAAAAAAAAAAAAIA#####wACeUIAATAAAAABAAAAAAAAAAAAAAACAP####8AAnhCAAE0AAAAAUAQAAAAAAAA#####wAAAAEACkNQb2ludEJhc2UA#####wAAAAAAEAABTwDAMgAAAAAAAMAzAAAAAAAABQABQEXAAAAAAABASkKPXCj1w#####8AAAABABRDRHJvaXRlRGlyZWN0aW9uRml4ZQD#####Af8AAAEQAAABAAIAAAANAD#3Cj1wo9cK#####wAAAAEACUNSb3RhdGlvbgD#####AAAADQAAAAFAVoAAAAAAAP####8AAAABAAtDSG9tb3RoZXRpZQD#####AAAADQAAAAcDAAAAAT#wAAAAAAAAAAAACAAAAAL#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQABQGeAAAAAAAAAAAAOAAAADQD#####AAAADQAAAAgAAAAB#####wAAAAEAC0NQb2ludEltYWdlAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAARAAAAEv####8AAAABAA5DUG9pbnRMaWVQb2ludAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAE#####8AAAABAAlDQ2VyY2xlT0EA#####wH#AAAAAgAAAA0AAAAU#####wAAAAEADUNEZW1pRHJvaXRlT0EA#####wH#AAAADQAAAQACAAAADQAAABT#####AAAAAQAQQ0RlbWlEcm9pdGVJbWFnZQD#####Af8AAAANAAABAAIAAAAWAAAAD#####8AAAABABBDSW50RHJvaXRlQ2VyY2xlAP####8AAAAXAAAAFf####8AAAABABBDUG9pbnRMaWVCaXBvaW50AP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQABAAAAGAAAABAA#####wH#AAAAEAACSicAAAAAAAAAAABACAAAAAAAAAUAAAAAFAAAABAAAAAQAP####8B#wAAABAAAkknAAAAAAAAAAAAQAgAAAAAAAAFAAAAABkAAAAQ#####wAAAAIAB0NSZXBlcmUA#####wDm5uYBAQAAAA0AAAAbAAAAGgAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAE#8AAAAAAAAAAAAAE#8AAAAAAAAP####8AAAABABBDUG9pbnREYW5zUmVwZXJlAP####8B#wAAARAAAkInAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAADAAAAAgAAAALAAAAEQD#####AQAAAAAQAAFCAEAAAAAAAAAAwDcAAAAAAAAFAAAAAB0AAAAYAP####8B#wAAARAAAkQnAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAACAAAAAgAAAAHAAAAEQD#####AQAAAAAQAAFEAMAxAAAAAAAAwCoAAAAAAAAFAAAAAB8AAAAYAP####8B#wAAARAAAkMnAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAACgAAAAgAAAAJAAAAEQD#####AQAAAAAQAAFDAEAIAAAAAAAAv#AAAAAAAAAFAAAAACEAAAACAP####8AAnhhAAE0AAAAAUAQAAAAAAAAAAAAAgD#####AAJ5YQABOAAAAAFAIAAAAAAAAAAAAAIA#####wAEbnVtYQABMAAAAAEAAAAAAAAAAAAAAAIA#####wACeGMAAjE4AAAAAUAyAAAAAAAAAAAAAgD#####AAJ5YwACMTIAAAABQCgAAAAAAAAAAAAYAP####8BAAAAABAAAWEAQBAAAAAAAADAMwAAAAAAAAUAAAAAHAAAAAgAAAAjAAAACAAAACQAAAAYAP####8BAAAAABAAAWMAQAgAAAAAAADAMQAAAAAAAAUAAAAAHAAAAAgAAAAmAAAACAAAACcAAAAOAP####8AAAANAAAABwMAAAABP#AAAAAAAAAAAAAKAAAABgAAAAgAAAAlAAAAEAD#####AAAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAADQAAACoAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAgAAAAKgAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAACIAAAAqAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAHgAAACr#####AAAAAQAMQ1RyYW5zbGF0aW9uAP####8AAAANAAAAKAAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAACsAAAAvAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAALAAAAC8AAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAtAAAALwAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAC4AAAAvAAAAAgD#####AAJueQABNQAAAAFAFAAAAAAAAAAAAAMA#####wACcjMAJXNpKChtb2R1bG94KHgpPTEpKihtb2R1bG95KHgpPTEpLDEsMCkAAAAJAAAAAAcCAAAABwgAAAAKAAAABAAAAAUAAAAAAAAAAT#wAAAAAAAAAAAABwgAAAAKAAAABQAAAAUAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAAAAAAAQAAAAAAAAAAAAF4AAAAAwD#####AAJyMgAlc2koKG1vZHVsb3goeCk9MCkqKG1vZHVsb3koeCk9MSksMSwwKQAAAAkAAAAABwIAAAAHCAAAAAoAAAAEAAAABQAAAAAAAAABAAAAAAAAAAAAAAAHCAAAAAoAAAAFAAAABQAAAAAAAAABP#AAAAAAAAAAAAABP#AAAAAAAAAAAAABAAAAAAAAAAAAAXgAAAADAP####8AAnIxACVzaSgobW9kdWxveCh4KT0xKSoobW9kdWxveSh4KT0wKSwxLDApAAAACQAAAAAHAgAAAAcIAAAACgAAAAQAAAAFAAAAAAAAAAE#8AAAAAAAAAAAAAcIAAAACgAAAAUAAAAFAAAAAAAAAAEAAAAAAAAAAAAAAAE#8AAAAAAAAAAAAAEAAAAAAAAAAAABeAAAAAIA#####wAFbWluaTEAAjEwAAAAAUAkAAAAAAAAAAAAAgD#####AAVtYXhpMQACNDAAAAABQEQAAAAAAAAAAAACAP####8ABHBhczEAATEAAAABP#AAAAAAAAD#####AAAAAgAMQ0NvbW1lbnRhaXJlAP####8BAAAAAMAxAAAAAAAAwC4AAAAAAAAAAAANEAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAUEAAAACAP####8ABW1pbmkyAAMtMzD#####AAAAAQAMQ01vaW5zVW5haXJlAAAAAUA+AAAAAAAAAAAAAgD#####AAVtYXhpMgACMzAAAAABQD4AAAAAAAAAAAACAP####8ABHBhczIAATEAAAABP#AAAAAAAAD#####AAAAAQAHQ01pbGlldQD#####AQAAAAEQAAJKMQAAAAAAAAAAAEAIAAAAAAAABQAAAAAgAAAAIv####8AAAABABFDU3ltZXRyaWVDZW50cmFsZQD#####AAAAPwAAABAA#####wEAAAABEAABSgAAAAAAAAAAAEAIAAAAAAAABQAAAAAeAAAAQAAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAA0AAABAAAAAHAD#####AQAAAAEQAAJJMQAAAAAAAAAAAEAIAAAAAAAABQAAAAAiAAAAHgAAAB0A#####wAAAEMAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAANAAAARAAAABAA#####wEAAAABEAABSQAAAAAAAAAAAEAIAAAAAAAABQAAAAAgAAAARAAAABkA#####wAAAA0AAAAiAAAAEAD#####AQAAAAEQAAFBAAAAAAAAAAAAQAgAAAAAAAAFAAAAAA0AAABHAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAIgAAAEcAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAeAAAARwAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAACAAAABH#####wAAAAEACUNQb2x5Z29uZQD#####AAAAAAABAAAABQAAACAAAABBAAAAQgAAACIAAAAgAAAAHgD#####AAAAAAABAAAABQAAAB4AAAAiAAAARQAAAEYAAAAeAAAAHgD#####AAAAAAABAAAABQAAAEgAAABLAAAASQAAAEoAAABIAAAAHgD#####AAAAAAABAAAABQAAAA0AAAAgAAAAIgAAAB4AAAANAAAAFgD#####AP8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAgAAABgAAAAXAP####8A5ubmAAEAAAANAAAARgAAAEEAAAAAAAABAAAAAAAAAAAAAAABAAAAAAAAAAAAAAABP#AAAAAAAAAAAAABP#AAAAAAAAD#####AAAAAQARQ1BvaW50UGFyQWJzY2lzc2UA#####wEAAAAAEAABVQAAAAAAAAAAAEAIAAAAAAAABQAAAAANAAAARgAAAAcBAAAACAAAAAMAAAABP#AAAAAAAAAAAAAfAP####8BAAAAABAAAVYAAAAAAAAAAABACAAAAAAAAAUAAAAADQAAAEEAAAAHAQAAAAgAAAA0AAAAAT#wAAAAAAAA#####wAAAAEACENTZWdtZW50AP####8BAAAAABAAAAEAAQAAAA0AAABSAAAAIAD#####AQAAAAAQAAABAAEAAAANAAAAUwAAAA8A#####wEAAAAAEAACVTEAAAAAAAAAAABACAAAAAAAAAUAAT#TA9Z22dUpAAAAVAAAABkA#####wAAAA0AAABTAAAAEAD#####AQAAAAAQAAJWMQAAAAAAAAAAAEAIAAAAAAAABQAAAABWAAAAVwAAACAA#####wEAAAAAEAAAAQABAAAAVgAAAFgAAAAPAP####8BAAAAABAAAlUyAAAAAAAAAAAAQAgAAAAAAAAFAAE#1tGzvqNnfgAAAFkAAAAZAP####8AAAANAAAAWgAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAA0AAABbAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAIAAAAFsAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAiAAAAWwAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAB4AAABbAAAAHgD#####AQAAAAABAAAABQAAAFwAAABdAAAAXgAAAF8AAABcAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAARQAAAFsAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABGAAAAWwAAAB4A#####wEAAAAAAQAAAAUAAABfAAAAXgAAAGEAAABiAAAAXwAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAEEAAABbAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAQgAAAFsAAAAeAP####8BAAAAAAEAAAAFAAAAXQAAAGQAAABlAAAAXgAAAF0AAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABIAAAAWwAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAEsAAABbAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAASQAAAFsAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABKAAAAWwAAAB4A#####wEAAAAAAQAAAAUAAABnAAAAaAAAAGkAAABqAAAAZ#####8AAAACAAhDTWVzdXJlWAD#####AAF4AAAAUQAAAFr#####AAAAAgAIQ01lc3VyZVkA#####wABeQAAAFEAAABaAAAAAgD#####AAJ4MQAMaW50KHgrMC4wMDEpAAAABgIAAAAHAAAAAAgAAABsAAAAAT9QYk3S8an8AAAAAgD#####AAJ5MQAMaW50KHkrMC4wMDEpAAAABgIAAAAHAAAAAAgAAABtAAAAAT9QYk3S8an8AAAAAgD#####AANudW0ADHgxKjIrbngqNCp5MQAAAAcAAAAABwIAAAAIAAAAbgAAAAFAAAAAAAAAAAAAAAcCAAAABwIAAAAIAAAAAwAAAAFAEAAAAAAAAAAAAAgAAABvAAAAHAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAWgAAAF7#####AAAAAQAPQ1ZhbGV1ckFmZmljaGVlAP####8BAAAAAMAmAAAAAAAAwCP#######AAAABxEgAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAgAAAHAAAAACAP####8ABG51bTEABW51bSsxAAAABwAAAAAIAAAAcAAAAAE#8AAAAAAAAAAAAAIA#####wAEbnVtJwAIbnVtK254KjIAAAAHAAAAAAgAAABwAAAABwIAAAAIAAAAAwAAAAFAAAAAAAAAAAAAAAIA#####wAFbnVtJzEABm51bScrMQAAAAcAAAAACAAAAHQAAAABP#AAAAAAAAAAAAAcAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABdAAAAZQAAABwA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAF4AAABpAAAAHAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAXwAAAGEAAAAjAP####8BAAAAAMAmAAAAAAAAwCQAAAAAAAAAAAB4EgAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAgAAAHMAAAAjAP####8BAAAAAMAkAAAAAAAAwCQAAAAAAAAAAAB2EgAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAgAAAHQAAAAjAP####8BAAAAAMAiAAAAAAAAwCAAAAAAAAAAAAB3EgAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAgAAAHX#####AAAAAgASQ0xpZXVPYmpldFBhclB0TGllAP####8BAAAAAAAAYAAAAAgAAAA0AAAAWgAAAAcAAABaAAAAWwAAAFwAAABdAAAAXgAAAF8AAABgAAAAJAD#####AQAAAAAAAGYAAAAIAAAANAAAAFoAAAAHAAAAWgAAAFsAAABdAAAAXgAAAGQAAABlAAAAZgAAACQA#####wEAAAAAAABrAAAACAAAADQAAABaAAAABwAAAFoAAABbAAAAZwAAAGgAAABpAAAAagAAAGsAAAAkAP####8BAAAAAAAAYwAAAAgAAAA0AAAAWgAAAAcAAABaAAAAWwAAAF4AAABfAAAAYQAAAGIAAABjAAAAJAD#####AAAAAAAAAHwAAAAIAAAAAwAAAFYAAAALAAAAVgAAAFgAAABZAAAAWgAAAFsAAABcAAAAXQAAAF4AAABfAAAAYAAAAHwAAAAkAP####8AAAAAAAAAfwAAAAgAAAADAAAAVgAAAAsAAABWAAAAWAAAAFkAAABaAAAAWwAAAF4AAABfAAAAYQAAAGIAAABjAAAAfwAAACQA#####wAAAAAAAAB+AAAACAAAAAMAAABWAAAACwAAAFYAAABYAAAAWQAAAFoAAABbAAAAZwAAAGgAAABpAAAAagAAAGsAAAB+AAAAJAD#####AAAAAAAAAH0AAAAIAAAAAwAAAFYAAAALAAAAVgAAAFgAAABZAAAAWgAAAFsAAABdAAAAXgAAAGQAAABlAAAAZgAAAH0AAAAkAP####8BAAAAAAAAcgAAAAgAAAA0AAAAWgAAAAoAAABaAAAAWwAAAF4AAABsAAAAbQAAAG4AAABvAAAAcAAAAHEAAAByAAAAJAD#####AAAAAAAAAIQAAAAIAAAAAwAAAFYAAAAOAAAAVgAAAFgAAABZAAAAWgAAAFsAAABeAAAAbAAAAG0AAABuAAAAbwAAAHAAAABxAAAAcgAAAIQAAAAkAP####8BAAAAAAAAeQAAAAgAAAA0AAAAWgAAAAwAAABaAAAAWwAAAF8AAABhAAAAbAAAAG0AAABuAAAAbwAAAHAAAABzAAAAeAAAAHkAAAAkAP####8AAAAAAAAAhgAAAAgAAAADAAAAVgAAABAAAABWAAAAWAAAAFkAAABaAAAAWwAAAF8AAABhAAAAbAAAAG0AAABuAAAAbwAAAHAAAABzAAAAeAAAAHkAAACGAAAAJAD#####AQAAAAAAAHsAAAAIAAAANAAAAFoAAAANAAAAWgAAAFsAAABeAAAAaQAAAGwAAABtAAAAbgAAAG8AAABwAAAAdAAAAHUAAAB3AAAAewAAACQA#####wAAAAAAAACIAAAACAAAAAMAAABWAAAAEQAAAFYAAABYAAAAWQAAAFoAAABbAAAAXgAAAGkAAABsAAAAbQAAAG4AAABvAAAAcAAAAHQAAAB1AAAAdwAAAHsAAACIAAAAJAD#####AQAAAAAAAHoAAAAIAAAANAAAAFoAAAAMAAAAWgAAAFsAAABdAAAAZQAAAGwAAABtAAAAbgAAAG8AAABwAAAAdAAAAHYAAAB6AAAAJAD#####AAAAAAAAAIoAAAAIAAAAAwAAAFYAAAAQAAAAVgAAAFgAAABZAAAAWgAAAFsAAABdAAAAZQAAAGwAAABtAAAAbgAAAG8AAABwAAAAdAAAAHYAAAB6AAAAiv####8AAAABABRDSW1wbGVtZW50YXRpb25Qcm90bwD#####AClBZmZpY2hhZ2UgZCfDqXF1YXRpb24gZGUgZHJvaXRlIG91IGNlcmNsZQAAAAIAAAABAAAAAgAAABwAAABGAAAAIQAAAACMAAJ4MgAAABwAAABGAAAAIgAAAACMAAJ5MgAAABwAAABGAAAAGgEAAACMAf8AAABAHAAAAAAAAAAAAAAAAAAAAAAARhAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAABcoI1ZhbCh4MiwxKSwjVmFsKHkyLDIpKQAAACUA#####wApQWZmaWNoYWdlIGQnw6lxdWF0aW9uIGRlIGRyb2l0ZSBvdSBjZXJjbGUAAAACAAAAAQAAAAIAAAAcAAAAQQAAACEAAAAAkAACeDIAAAAcAAAAQQAAACIAAAAAkAACeTIAAAAcAAAAQQAAABoBAAAAkAH#AAAAQBwAAAAAAADANQAAAAAAAAAAAEEQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAXKCNWYWwoeDIsMSksI1ZhbCh5MiwyKSkAAAAlAP####8AKUFmZmljaGFnZSBkJ8OpcXVhdGlvbiBkZSBkcm9pdGUgb3UgY2VyY2xlAAAAAgAAAAEAAAACAAAAHAAAACAAAAAhAAAAAJQAAngyAAAAHAAAACAAAAAiAAAAAJQAAnkyAAAAHAAAACAAAAAaAQAAAJQB#wAAAL#wAAAAAAAAQAAAAAAAAAAAAAAgEAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAFygjVmFsKHgyLDEpLCNWYWwoeTIsMikpAAAAJQD#####AClBZmZpY2hhZ2UgZCfDqXF1YXRpb24gZGUgZHJvaXRlIG91IGNlcmNsZQAAAAIAAAABAAAAAgAAABwAAAAeAAAAIQAAAACYAAJ4MgAAABwAAAAeAAAAIgAAAACYAAJ5MgAAABwAAAAeAAAAGgEAAACYAf8AAAC#8AAAAAAAAD#########gAAAAHhAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAABcoI1ZhbCh4MiwxKSwjVmFsKHkyLDIpKQAAACUA#####wApQWZmaWNoYWdlIGQnw6lxdWF0aW9uIGRlIGRyb2l0ZSBvdSBjZXJjbGUAAAACAAAAAQAAAAIAAAAcAAAAIgAAACEAAAAAnAACeDIAAAAcAAAAIgAAACIAAAAAnAACeTIAAAAcAAAAIgAAABoBAAAAnAH#AAAAQBgAAAAAAADANQAAAAAAAAAAACIQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAXKCNWYWwoeDIsMSksI1ZhbCh5MiwyKSkAAAAQAP####8B#wAAARAAAkExAMA3AAAAAAAAv#AAAAAAAAAFAAAAACIAAABHAAAAJQD#####AClBZmZpY2hhZ2UgZCfDqXF1YXRpb24gZGUgZHJvaXRlIG91IGNlcmNsZQAAAAIAAAABAAAAAgAAABwAAACgAAAAIQAAAAChAAJ4MgAAABwAAACgAAAAIgAAAAChAAJ5MgAAABwAAACgAAAAGgEAAAChAf8AAABAEAAAAAAAAMAzAAAAAAAAAAAAoBAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAABcoI1ZhbCh4MiwxKSwjVmFsKHkyLDIpKQAAAAIA#####wACeGIAATAAAAABAAAAAAAAAAAAAAACAP####8AAnliAAIxNgAAAAFAMAAAAAAAAAAAAAIA#####wAEbnVtYgACMTAAAAABQCQAAAAAAAAAAAACAP####8ABG51bWMAAjMzAAAAAUBAgAAAAAAAAAAAGAD#####AQAAAAAQAAFiAEAIAAAAAAAAwDL#######gFAAAAABwAAAAIAAAApQAAAAgAAACmAAAAHgD#####AAAAAAABAAAABQAAACsAAAAsAAAALQAAAC4AAAArAAAAHgD#####ACy4LAABAAAABQAAADAAAAAxAAAAMgAAADMAAAAw#####wAAAAEAEENTdXJmYWNlUG9seWdvbmUA#####wAAfwAAAAAFAAAAqwAAAA4A#####wAAAA0AAAAHAwAAAAE#8AAAAAAAAAAAAAoAAAA2AAAACAAAAKcAAAAQAP####8BAP8AABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAAAgAAAArQAAABAA#####wEA#wAAEAAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAAEEAAACtAAAAEAD#####AQD#AAAQAAAAAAAAAAAAAABACAAAAAAAAAkAAAAAQgAAAK0AAAAQAP####8BAP8AABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAAAiAAAArQAAAB4A#####wAAAAAAAQAAAAUAAACuAAAArwAAALAAAACxAAAArgAAABkA#####wAAAA0AAACpAAAAEAD#####AQD#AAAQAAAAAAAAAAAAAABACAAAAAAAAAkAAAAArgAAALMAAAAQAP####8BAP8AABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAACvAAAAswAAABAA#####wEA#wAAEAAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAALAAAACzAAAAEAD#####AQD#AAAQAAAAAAAAAAAAAABACAAAAAAAAAkAAAAAsQAAALMAAAAeAP####8A#wAAAAEAAAAFAAAAtAAAALUAAAC2AAAAtwAAALQAAAAmAP####8A#wAAAAAABQAAALgAAAAZAP####8AAAANAAAAKf####8AAAABAAtDTWFjcm9QYXVzZQD#####AAAAAAH#####EECO9AAAAAAAQEHCj1wo9cMCAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAVQYXVzZQAAAAAAAgAAAA4A#####wAAAA0AAAAHAwAAAAE#8AAAAAAAAAAAAAoAAAA1AAAACAAAAKgAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABIAAAAvAAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAEsAAAC8AAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAASQAAALwAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABKAAAAvAAAAB4A#####wH#AAAAAQAAAAUAAAC9AAAAvgAAAL8AAADAAAAAvQAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAL0AAAC6AAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAvgAAALoAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAC#AAAAugAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAMAAAAC6AAAAHgD#####AAAAfwABAAAABQAAAMIAAADDAAAAxAAAAMUAAADCAAAAJgD#####AAAA#wAAAAUAAADGAAAAAgD#####AAN4YzEAAjMyAAAAAUBAAAAAAAAAAAAAAgD#####AAN5YzEAAjIwAAAAAUA0AAAAAAAAAAAAGAD#####AQB#AAAQAAJjMQBAAAAAAAAAAMA5AAAAAAAABQAAAAAcAAAACAAAAMgAAAAIAAAAyf####8AAAABAAlDRHJvaXRlT20A#####wAAfwAAEAAAAQACAAAAHAAAAMoAAAAbAAAAAT#wAAAAAAAA#####wAAAAEAD0NTeW1ldHJpZUF4aWFsZQD#####AAAAywAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAADAAAADMAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAMQAAAMwAAAAQAP####8BAH8AABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAyAAAAzAAAABAA#####wEAfwAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAADMAAADMAAAAHgD#####AQB#AAABAAAABQAAAM0AAADOAAAAzwAAANAAAADNAAAAJgD#####AQB#AAAAAAUAAADRAAAADwD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAcAnnHHHHHHHAAAADgAAABkA#####wAAAA0AAABGAAAAGQD#####AAAADQAAAFIAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAADTAAAA1QAAACAA#####wH#AAAAEAAAAQACAAAA0wAAANYAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAADTAAAA1AAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAANYAAADUAAAAIAD#####AQB#AAAQAAABAAIAAADYAAAA2f####8AAAABABBDSW50RHJvaXRlRHJvaXRlAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAADLAAAA2gAAABoA#####wAAfwAAwDoAAAAAAADAPgAAAAAAAAAAANsQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAIKGQjTCgxKSkAAAACAP####8AA3hjMgABNAAAAAFAEAAAAAAAAAAAAAIA#####wADeWMyAAEwAAAAAQAAAAAAAAAAAAAAAgD#####AAN4YzMAATgAAAABQCAAAAAAAAAAAAACAP####8AA3ljMwABNAAAAAFAEAAAAAAAAAAAABgA#####wH#AAAAEAACYzIAAAAAAAAAAABACAAAAAAAAAUAAAAAHAAAAAgAAADdAAAACAAAAN4AAAAYAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAcAAAACAAAAN0AAAAIAAAA3gAAABgA#####wH#AAAAEAACYzMAAAAAAAAAAABACAAAAAAAAAUAAAAAHAAAAAgAAADfAAAACAAAAOAAAAACAP####8AAnhWAAEwAAAAAQAAAAAAAAAAAAAAAgD#####AAJ5VgABMAAAAAEAAAAAAAAAAAAAAAIA#####wADeFYyAAEwAAAAAQAAAAAAAAAAAAAAAgD#####AAN5VjIAATAAAAABAAAAAAAAAAAAAAACAP####8AA3hWMwABMAAAAAEAAAAAAAAAAAAAAAIA#####wADeVYzAAEwAAAAAQAAAAAAAAAAAAAAKAD#####AP8AAAAQAAABAAIAAAAcAAAA4QAAAAE#8AAAAAAAAAAAACkA#####wAAAOoAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAC0AAAA6wAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAALUAAADrAAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAtgAAAOsAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAC3AAAA6wAAAB4A#####wH#AAAAAQAAAAUAAADsAAAA7QAAAO4AAADvAAAA7AAAACYA#####wH#AAAAAAAFAAAA8P####8AAAABABZDRHJvaXRlUGVycGVuZGljdWxhaXJlAP####8AAAD#ABAAAAEAAgAAAOMAAAAOAAAAGQD#####AAAA0wAAANkAAAAqAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAADqAAAA1wAAABoA#####wD#AAAAwEYAAAAAAADAPAAAAAAAAAAAAPQQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAIKGQjTCgyKSkAAAAqAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAOAAAA8gAAABoA#####wAAAP8AwD0AAAAAAADACAAAAAAAAAAAAPYQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAIKGQjTCgzKSkAAAAfAP####8BAAD#ABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAANAAAAHwAAAAcAAAAABwIAAAAIAAAANAAAAAFAAAAAAAAAAAAAAAE#8AAAAAAAAAAAABEA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAPgAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAD5AAAA1AAAABAA#####wEAAP8AEAABWQAAAAAAAAAAAEAIAAAAAAAABQAAAAD6AAAA8wAAACAA#####wH#AAAAEAAAAQABAAAA+gAAAPsAAAAqAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAADqAAAA#AAAABoA#####wD#AAAAwDUAAAAAAADAAAAAAAAAAAAAAP0QAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAIKGQjTCgyKSkAAAAgAP####8BAH8AABAAAAEAAQAAAPgAAAD7AAAAKgD#####AQB#AAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAywAAAP8AAAAaAP####8AAH8AAL#wAAAAAAAAP#AAAAAAAAAAAAEAEAAAAAAAAAAAAAAAAAABAAAAAAAAAAAACChkI0woMSkp################"
			this.MG32codeBase64corr = "TWF0aEdyYXBoSmF2YTEuMAAAABI+0euFAAJmcv###wEA#wEAAAAAAAAAAAUcAAAC0gAAAQEAAAAAAAAAAQAAAT7#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAHQ0NhbGN1bAD#####AAVBbmdsZQABMAAAAAEAAAAAAAAAAAAAAAIA#####wAEWm9vbQACMzAAAAABQD4AAAAAAAAAAAACAP####8AAm54AAE1AAAAAUAUAAAAAAAAAAAAAgD#####AAJ5RAABNAAAAAFAEAAAAAAAAAAAAAIA#####wACeEQAATAAAAABAAAAAAAAAAAAAAACAP####8AAnlDAAE0AAAAAUAQAAAAAAAAAAAAAgD#####AAJ4QwABNAAAAAFAEAAAAAAAAAAAAAIA#####wACeUIAATAAAAABAAAAAAAAAAAAAAACAP####8AAnhCAAE0AAAAAUAQAAAAAAAA#####wAAAAEACkNQb2ludEJhc2UA#####wAAAAAAEAABTwDAMgAAAAAAAMAzAAAAAAAABQABQEbAAAAAAABAU2FHrhR64v####8AAAABABRDRHJvaXRlRGlyZWN0aW9uRml4ZQD#####Af8AAAEQAAABAAIAAAAKAD#3Cj1wo9cK#####wAAAAEACUNSb3RhdGlvbgD#####AAAACgAAAAFAVoAAAAAAAP####8AAAABAAtDSG9tb3RoZXRpZQD#####AAAACv####8AAAABAApDT3BlcmF0aW9uAwAAAAE#8AAAAAAAAP####8AAAABAA9DUmVzdWx0YXRWYWxldXIAAAAC#####wAAAAEAD0NQb2ludExpZURyb2l0ZQD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAUBngAAAAAAAAAAACwAAAAUA#####wAAAAoAAAAIAAAAAf####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAADgAAAA######AAAAAQAOQ1BvaW50TGllUG9pbnQA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAABD#####AAAAAQAJQ0NlcmNsZU9BAP####8B#wAAAAIAAAAKAAAAEf####8AAAABAA1DRGVtaURyb2l0ZU9BAP####8B#wAAAA0AAAEAAgAAAAoAAAAR#####wAAAAEAEENEZW1pRHJvaXRlSW1hZ2UA#####wH#AAAADQAAAQACAAAAEwAAAAz#####AAAAAQAQQ0ludERyb2l0ZUNlcmNsZQD#####AAAAFAAAABL#####AAAAAQAQQ1BvaW50TGllQmlwb2ludAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAQAAABUAAAAKAP####8B#wAAABAAAkonAAAAAAAAAAAAQAgAAAAAAAAFAAAAABEAAAANAAAACgD#####Af8AAAAQAAJJJwAAAAAAAAAAAEAIAAAAAAAABQAAAAAWAAAADf####8AAAACAAdDUmVwZXJlAP####8A5ubmAQEAAAAKAAAAGAAAABcAAAAAAAABAAAAAAAAAAAAAAABAAAAAAAAAAAAAAABP#AAAAAAAAAAAAABP#AAAAAAAAD#####AAAAAQAQQ1BvaW50RGFuc1JlcGVyZQD#####Af8AAAEQAAJCJwAAAAAAAAAAAEAIAAAAAAAABQAAAAAZAAAACAAAAAkAAAAIAAAACAAAAAsA#####wEAAAAAEAABQgBAAAAAAAAAAMA3AAAAAAAABQAAAAAaAAAAEgD#####Af8AAAEQAAJEJwAAAAAAAAAAAEAIAAAAAAAABQAAAAAZAAAACAAAAAUAAAAIAAAABAAAAAsA#####wEAAAAAEAABRADAMQAAAAAAAMAqAAAAAAAABQAAAAAcAAAAEgD#####Af8AAAEQAAJDJwAAAAAAAAAAAEAIAAAAAAAABQAAAAAZAAAACAAAAAcAAAAIAAAABgAAAAsA#####wEAAAAAEAABQwBACAAAAAAAAL#wAAAAAAAABQAAAAAeAAAAAgD#####AAJueQABNQAAAAFAFAAAAAAAAP####8AAAABAAdDTWlsaWV1AP####8BAAAAARAAAkkxAAAAAAAAAAAAQAgAAAAAAAAFAAAAAB8AAAAb#####wAAAAEAEUNTeW1ldHJpZUNlbnRyYWxlAP####8AAAAhAAAACgD#####AQAAAAEQAAFJAAAAAAAAAAAAQAgAAAAAAAAFAAAAAB0AAAAi#####wAAAAEAEUNQb2ludFBhckFic2Npc3NlAP####8BAAAAABAAAVUAAAAAAAAAAABACAAAAAAAAAUAAAAACgAAACMAAAAHAQAAAAgAAAADAAAAAT#wAAAAAAAAAAAACQD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAcAnnHHHHHHHAAAAC#####8AAAABAAxDVHJhbnNsYXRpb24A#####wAAAAoAAAAjAAAAFgD#####AAAACgAAACQAAAAKAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAlAAAAJwAAAAoA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAACgAAAAmAAAAFgD#####AAAAJQAAACkAAAAVAP####8BAAD#ABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAKAAAAHAAAAAcAAAAABwIAAAAIAAAAIAAAAAFAAAAAAAAAAAAAAAE#8AAAAAAAAAAAAAsA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAACsAAAAKAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAsAAAAJgAAAAoA#####wEAAP8AEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAC0AAAAqAAAAAgD#####AAN4YzIAATAAAAABAAAAAAAAAAAAAAACAP####8AA3ljMgABMAAAAAEAAAAAAAAAAAAAABIA#####wH#AAAAEAACYzIAAAAAAAAAAABACAAAAAAAAAUAAAAAGQAAAAgAAAAvAAAACAAAADD#####AAAAAQAJQ0Ryb2l0ZU9tAP####8B#wAAABAAAAEAAgAAABkAAAAxAAAAAT#wAAAAAAAA#####wAAAAEACENTZWdtZW50AP####8B#wAAABAAAAEAAQAAAC0AAAAu#####wAAAAEAEENJbnREcm9pdGVEcm9pdGUA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAADIAAAAz#####wAAAAIADENDb21tZW50YWlyZQD#####Af8AAADANQAAAAAAAMAAAAAAAAAAAAAANBAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAgoZCNMKDIpKQAAAAIA#####wADeGMxAAIyNgAAAAFAOgAAAAAAAAAAAAIA#####wADeWMxAAIyNgAAAAFAOgAAAAAAAAAAABIA#####wEAfwAAEAACYzEAQAAAAAAAAADAOQAAAAAAAAUAAAAAGQAAAAgAAAA2AAAACAAAADcAAAAXAP####8BAH8AABAAAAEAAgAAABkAAAA4#####wAAAAEADENNb2luc1VuYWlyZQAAAAE#8AAAAAAAAAAAABgA#####wEAAP8AEAAAAQABAAAALAAAAC4AAAAZAP####8BAAD#ABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAA5AAAAOgAAABoA#####wEAfwABAAAAOxAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAgoZCNMKDEpKf####8AAAABAAVDRm9uYwD#####AAdtb2R1bG94AAhtb2QoeCwyKf####8AAAABAA1DRm9uY3Rpb24yVmFyBv####8AAAACABFDVmFyaWFibGVGb3JtZWxsZQAAAAAAAAABQAAAAAAAAAAAAXgAAAAcAP####8AB21vZHVsb3kAEm1vZChpbnQoeS9ueC8yKSwyKQAAAB0G#####wAAAAIACUNGb25jdGlvbgIAAAAHAwAAAAcDAAAAHgAAAAAAAAAIAAAAAwAAAAFAAAAAAAAAAAAAAAFAAAAAAAAAAAABeQAAABwA#####wACcjAAJXNpKChtb2R1bG94KHgpPTApKihtb2R1bG95KHgpPTApLDEsMCn#####AAAAAQANQ0ZvbmN0aW9uM1ZhcgAAAAAHAgAAAAcI#####wAAAAEADkNBcHBlbEZvbmN0aW9uAAAAPQAAAB4AAAAAAAAAAQAAAAAAAAAAAAAABwgAAAAhAAAAPgAAAB4AAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAQAAAAAAAAAAAAF4AAAAAgD#####AAJ4YQACMjAAAAABQDQAAAAAAAAAAAACAP####8AAnlhAAIyNAAAAAFAOAAAAAAAAAAAAAIA#####wAEbnVtYQABMAAAAAEAAAAAAAAAAAAAAAIA#####wACeGMAAjE4AAAAAUAyAAAAAAAAAAAAAgD#####AAJ5YwACMTIAAAABQCgAAAAAAAAAAAASAP####8BAAAAABAAAWEAQBAAAAAAAADAMwAAAAAAAAUAAAAAGQAAAAgAAABAAAAACAAAAEEAAAASAP####8BAAAAABAAAWMAQAgAAAAAAADAMQAAAAAAAAUAAAAAGQAAAAgAAABDAAAACAAAAEQAAAAGAP####8AAAAKAAAABwMAAAABP#AAAAAAAAAAAAAhAAAAPwAAAAgAAABCAAAACgD#####AAAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAACgAAAEcAAAAKAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAdAAAARwAAAAoA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAB8AAABHAAAACgD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAGwAAAEcAAAAWAP####8AAAAKAAAARQAAAAoA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAEgAAABMAAAACgD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAASQAAAEwAAAAKAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABKAAAATAAAAAoA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAEsAAABMAAAAHAD#####AAJyMwAlc2koKG1vZHVsb3goeCk9MSkqKG1vZHVsb3koeCk9MSksMSwwKQAAACAAAAAABwIAAAAHCAAAACEAAAA9AAAAHgAAAAAAAAABP#AAAAAAAAAAAAAHCAAAACEAAAA+AAAAHgAAAAAAAAABP#AAAAAAAAAAAAABP#AAAAAAAAAAAAABAAAAAAAAAAAAAXgAAAAcAP####8AAnIyACVzaSgobW9kdWxveCh4KT0wKSoobW9kdWxveSh4KT0xKSwxLDApAAAAIAAAAAAHAgAAAAcIAAAAIQAAAD0AAAAeAAAAAAAAAAEAAAAAAAAAAAAAAAcIAAAAIQAAAD4AAAAeAAAAAAAAAAE#8AAAAAAAAAAAAAE#8AAAAAAAAAAAAAEAAAAAAAAAAAABeAAAABwA#####wACcjEAJXNpKChtb2R1bG94KHgpPTEpKihtb2R1bG95KHgpPTApLDEsMCkAAAAgAAAAAAcCAAAABwgAAAAhAAAAPQAAAB4AAAAAAAAAAT#wAAAAAAAAAAAABwgAAAAhAAAAPgAAAB4AAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAQAAAAAAAAAAAAF4AAAAAgD#####AAVtaW5pMQACMTAAAAABQCQAAAAAAAAAAAACAP####8ABW1heGkxAAI0MAAAAAFARAAAAAAAAAAAAAIA#####wAEcGFzMQABMQAAAAE#8AAAAAAAAAAAABoA#####wEAAAAAwDEAAAAAAADALgAAAAAAAAAAAAoQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAABQQAAAAIA#####wAFbWluaTIAAy0zMAAAABsAAAABQD4AAAAAAAAAAAACAP####8ABW1heGkyAAIzMAAAAAFAPgAAAAAAAAAAAAIA#####wAEcGFzMgABMQAAAAE#8AAAAAAAAAAAABMA#####wEAAAABEAACSjEAAAAAAAAAAABACAAAAAAAAAUAAAAAHQAAAB8AAAAUAP####8AAABbAAAACgD#####AQAAAAEQAAFKAAAAAAAAAAAAQAgAAAAAAAAFAAAAABsAAABcAAAACgD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAACgAAAFwAAAAKAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAKAAAAIgAAABYA#####wAAAAoAAAAfAAAACgD#####AQAAAAEQAAFBAAAAAAAAAAAAQAgAAAAAAAAFAAAAAAoAAABgAAAACgD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAHwAAAGAAAAAKAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAbAAAAYAAAAAoA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAB0AAABg#####wAAAAEACUNQb2x5Z29uZQD#####AAAAAAABAAAABQAAAB0AAABdAAAAXgAAAB8AAAAdAAAAIgD#####AAAAAAABAAAABQAAABsAAAAfAAAAXwAAACMAAAAbAAAAIgD#####AAAAAAABAAAABQAAAGEAAABkAAAAYgAAAGMAAABhAAAAIgD#####AAAAAAABAAAABQAAAAoAAAAdAAAAHwAAABsAAAAKAAAAEAD#####AP8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAgAAABUAAAARAP####8A5ubmAAEAAAAKAAAAIwAAAF0AAAAAAAABAAAAAAAAAAAAAAABAAAAAAAAAAAAAAABP#AAAAAAAAAAAAABP#AAAAAAAAAAAAAVAP####8BAAAAABAAAVYAAAAAAAAAAABACAAAAAAAAAUAAAAACgAAAF0AAAAHAQAAAAgAAAAgAAAAAT#wAAAAAAAAAAAAGAD#####AQAAAAAQAAABAAEAAAAKAAAAJAAAABgA#####wEAAAAAEAAAAQABAAAACgAAAGsAAAAJAP####8BAAAAABAAAlUxAAAAAAAAAAAAQAgAAAAAAAAFAAE#0wPWdtnVKQAAAGwAAAAWAP####8AAAAKAAAAawAAAAoA#####wEAAAAAEAACVjEAAAAAAAAAAABACAAAAAAAAAUAAAAAbgAAAG8AAAAYAP####8BAAAAABAAAAEAAQAAAG4AAABwAAAACQD#####AQAAAAAQAAJVMgAAAAAAAAAAAEAIAAAAAAAABQABP9bRs76jZ34AAABxAAAAFgD#####AAAACgAAAHIAAAAKAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAKAAAAcwAAAAoA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAB0AAABzAAAACgD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAHwAAAHMAAAAKAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAbAAAAcwAAACIA#####wEAAAAAAQAAAAUAAAB0AAAAdQAAAHYAAAB3AAAAdAAAAAoA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAF8AAABzAAAACgD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAIwAAAHMAAAAiAP####8BAAAAAAEAAAAFAAAAdwAAAHYAAAB5AAAAegAAAHcAAAAKAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABdAAAAcwAAAAoA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAF4AAABzAAAAIgD#####AQAAAAABAAAABQAAAHUAAAB8AAAAfQAAAHYAAAB1AAAACgD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAYQAAAHMAAAAKAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABkAAAAcwAAAAoA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAGIAAABzAAAACgD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAYwAAAHMAAAAiAP####8BAAAAAAEAAAAFAAAAfwAAAIAAAACBAAAAggAAAH######AAAAAgAIQ01lc3VyZVgA#####wABeAAAAGoAAABy#####wAAAAIACENNZXN1cmVZAP####8AAXkAAABqAAAAcgAAAAIA#####wACeDEADGludCh4KzAuMDAxKQAAAB8CAAAABwAAAAAIAAAAhAAAAAE#UGJN0vGp#AAAAAIA#####wACeTEADGludCh5KzAuMDAxKQAAAB8CAAAABwAAAAAIAAAAhQAAAAE#UGJN0vGp#AAAAAIA#####wADbnVtAAx4MSoyK254KjQqeTEAAAAHAAAAAAcCAAAACAAAAIYAAAABQAAAAAAAAAAAAAAHAgAAAAcCAAAACAAAAAMAAAABQBAAAAAAAAAAAAAIAAAAhwAAABMA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAHIAAAB2#####wAAAAEAD0NWYWxldXJBZmZpY2hlZQD#####AQAAAADAJgAAAAAAAMAj#######wAAAAiRIAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAIAAACIAAAAAgD#####AARudW0xAAVudW0rMQAAAAcAAAAACAAAAIgAAAABP#AAAAAAAAAAAAACAP####8ABG51bScACG51bStueCoyAAAABwAAAAAIAAAAiAAAAAcCAAAACAAAAAMAAAABQAAAAAAAAAAAAAACAP####8ABW51bScxAAZudW0nKzEAAAAHAAAAAAgAAACMAAAAAT#wAAAAAAAAAAAAEwD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAdQAAAH0AAAATAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAB2AAAAgQAAABMA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAHcAAAB5AAAAJQD#####AQAAAADAJgAAAAAAAMAkAAAAAAAAAAAAkBIAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAIAAACLAAAAJQD#####AQAAAADAJAAAAAAAAMAkAAAAAAAAAAAAjhIAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAIAAACMAAAAJQD#####AQAAAADAIgAAAAAAAMAgAAAAAAAAAAAAjxIAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAIAAACN#####wAAAAIAEkNMaWV1T2JqZXRQYXJQdExpZQD#####AQAAAAAAAHgAAAAIAAAAIAAAAHIAAAAHAAAAcgAAAHMAAAB0AAAAdQAAAHYAAAB3AAAAeAAAACYA#####wEAAAAAAAB+AAAACAAAACAAAAByAAAABwAAAHIAAABzAAAAdQAAAHYAAAB8AAAAfQAAAH4AAAAmAP####8BAAAAAAAAgwAAAAgAAAAgAAAAcgAAAAcAAAByAAAAcwAAAH8AAACAAAAAgQAAAIIAAACDAAAAJgD#####AQAAAAAAAHsAAAAIAAAAIAAAAHIAAAAHAAAAcgAAAHMAAAB2AAAAdwAAAHkAAAB6AAAAewAAACYA#####wAAAAAAAACUAAAACAAAAAMAAABuAAAACwAAAG4AAABwAAAAcQAAAHIAAABzAAAAdAAAAHUAAAB2AAAAdwAAAHgAAACUAAAAJgD#####AAAAAAAAAJcAAAAIAAAAAwAAAG4AAAALAAAAbgAAAHAAAABxAAAAcgAAAHMAAAB2AAAAdwAAAHkAAAB6AAAAewAAAJcAAAAmAP####8AAAAAAAAAlgAAAAgAAAADAAAAbgAAAAsAAABuAAAAcAAAAHEAAAByAAAAcwAAAH8AAACAAAAAgQAAAIIAAACDAAAAlgAAACYA#####wAAAAAAAACVAAAACAAAAAMAAABuAAAACwAAAG4AAABwAAAAcQAAAHIAAABzAAAAdQAAAHYAAAB8AAAAfQAAAH4AAACVAAAAJgD#####AQAAAAAAAIoAAAAIAAAAIAAAAHIAAAAKAAAAcgAAAHMAAAB2AAAAhAAAAIUAAACGAAAAhwAAAIgAAACJAAAAigAAACYA#####wAAAAAAAACcAAAACAAAAAMAAABuAAAADgAAAG4AAABwAAAAcQAAAHIAAABzAAAAdgAAAIQAAACFAAAAhgAAAIcAAACIAAAAiQAAAIoAAACcAAAAJgD#####AQAAAAAAAJEAAAAIAAAAIAAAAHIAAAAMAAAAcgAAAHMAAAB3AAAAeQAAAIQAAACFAAAAhgAAAIcAAACIAAAAiwAAAJAAAACRAAAAJgD#####AAAAAAAAAJ4AAAAIAAAAAwAAAG4AAAAQAAAAbgAAAHAAAABxAAAAcgAAAHMAAAB3AAAAeQAAAIQAAACFAAAAhgAAAIcAAACIAAAAiwAAAJAAAACRAAAAngAAACYA#####wEAAAAAAACTAAAACAAAACAAAAByAAAADQAAAHIAAABzAAAAdgAAAIEAAACEAAAAhQAAAIYAAACHAAAAiAAAAIwAAACNAAAAjwAAAJMAAAAmAP####8AAAAAAAAAoAAAAAgAAAADAAAAbgAAABEAAABuAAAAcAAAAHEAAAByAAAAcwAAAHYAAACBAAAAhAAAAIUAAACGAAAAhwAAAIgAAACMAAAAjQAAAI8AAACTAAAAoAAAACYA#####wEAAAAAAACSAAAACAAAACAAAAByAAAADAAAAHIAAABzAAAAdQAAAH0AAACEAAAAhQAAAIYAAACHAAAAiAAAAIwAAACOAAAAkgAAACYA#####wAAAAAAAACiAAAACAAAAAMAAABuAAAAEAAAAG4AAABwAAAAcQAAAHIAAABzAAAAdQAAAH0AAACEAAAAhQAAAIYAAACHAAAAiAAAAIwAAACOAAAAkgAAAKL#####AAAAAQAUQ0ltcGxlbWVudGF0aW9uUHJvdG8A#####wApQWZmaWNoYWdlIGQnw6lxdWF0aW9uIGRlIGRyb2l0ZSBvdSBjZXJjbGUAAAACAAAAAQAAAAIAAAAZAAAAIwAAACMAAAAApAACeDIAAAAZAAAAIwAAACQAAAAApAACeTIAAAAZAAAAIwAAABoBAAAApAH#AAAAQBwAAAAAAAAAAAAAAAAAAAAAACMQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAXKCNWYWwoeDIsMSksI1ZhbCh5MiwyKSkAAAAnAP####8AKUFmZmljaGFnZSBkJ8OpcXVhdGlvbiBkZSBkcm9pdGUgb3UgY2VyY2xlAAAAAgAAAAEAAAACAAAAGQAAAF0AAAAjAAAAAKgAAngyAAAAGQAAAF0AAAAkAAAAAKgAAnkyAAAAGQAAAF0AAAAaAQAAAKgB#wAAAEAcAAAAAAAAwDUAAAAAAAAAAABdEAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAFygjVmFsKHgyLDEpLCNWYWwoeTIsMikpAAAAJwD#####AClBZmZpY2hhZ2UgZCfDqXF1YXRpb24gZGUgZHJvaXRlIG91IGNlcmNsZQAAAAIAAAABAAAAAgAAABkAAAAdAAAAIwAAAACsAAJ4MgAAABkAAAAdAAAAJAAAAACsAAJ5MgAAABkAAAAdAAAAGgEAAACsAf8AAAC#8AAAAAAAAEAAAAAAAAAAAAAAHRAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAABcoI1ZhbCh4MiwxKSwjVmFsKHkyLDIpKQAAACcA#####wApQWZmaWNoYWdlIGQnw6lxdWF0aW9uIGRlIGRyb2l0ZSBvdSBjZXJjbGUAAAACAAAAAQAAAAIAAAAZAAAAGwAAACMAAAAAsAACeDIAAAAZAAAAGwAAACQAAAAAsAACeTIAAAAZAAAAGwAAABoBAAAAsAH#AAAAv#AAAAAAAAA#########4AAAABsQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAXKCNWYWwoeDIsMSksI1ZhbCh5MiwyKSkAAAAnAP####8AKUFmZmljaGFnZSBkJ8OpcXVhdGlvbiBkZSBkcm9pdGUgb3UgY2VyY2xlAAAAAgAAAAEAAAACAAAAGQAAAB8AAAAjAAAAALQAAngyAAAAGQAAAB8AAAAkAAAAALQAAnkyAAAAGQAAAB8AAAAaAQAAALQB#wAAAEAYAAAAAAAAwDUAAAAAAAAAAAAfEAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAFygjVmFsKHgyLDEpLCNWYWwoeTIsMikpAAAACgD#####Af8AAAEQAAJBMQDANwAAAAAAAL#wAAAAAAAABQAAAAAfAAAAYAAAACcA#####wApQWZmaWNoYWdlIGQnw6lxdWF0aW9uIGRlIGRyb2l0ZSBvdSBjZXJjbGUAAAACAAAAAQAAAAIAAAAZAAAAuAAAACMAAAAAuQACeDIAAAAZAAAAuAAAACQAAAAAuQACeTIAAAAZAAAAuAAAABoBAAAAuQH#AAAAQBAAAAAAAADAMwAAAAAAAAAAALgQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAXKCNWYWwoeDIsMSksI1ZhbCh5MiwyKSkAAAACAP####8AAnhiAAEwAAAAAQAAAAAAAAAAAAAAAgD#####AAJ5YgACMTYAAAABQDAAAAAAAAAAAAACAP####8ABG51bWIAAjEwAAAAAUAkAAAAAAAAAAAAAgD#####AARudW1jAAIzMwAAAAFAQIAAAAAAAAAAABIA#####wEAAAAAEAABYgBACAAAAAAAAMAy#######4BQAAAAAZAAAACAAAAL0AAAAIAAAAvgAAACIA#####wAAAAAAAQAAAAUAAABIAAAASQAAAEoAAABLAAAASAAAACIA#####wEsuCwAAQAAAAUAAABNAAAATgAAAE8AAABQAAAATf####8AAAABABBDU3VyZmFjZVBvbHlnb25lAP####8BAH8AAAAABQAAAMMAAAAGAP####8AAAAKAAAABwMAAAABP#AAAAAAAAAAAAAhAAAAUgAAAAgAAAC#AAAACgD#####AQD#AAAQAAAAAAAAAAAAAABACAAAAAAAAAkAAAAAHQAAAMUAAAAKAP####8BAP8AABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAABdAAAAxQAAAAoA#####wEA#wAAEAAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAAF4AAADFAAAACgD#####AQD#AAAQAAAAAAAAAAAAAABACAAAAAAAAAkAAAAAHwAAAMUAAAAiAP####8AAAAAAAEAAAAFAAAAxgAAAMcAAADIAAAAyQAAAMYAAAAWAP####8AAAAKAAAAwQAAAAoA#####wEA#wAAEAABSAAAAAAAAAAAAEAIAAAAAAAACQAAAADGAAAAywAAAAoA#####wEA#wAAEAAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAAMcAAADLAAAACgD#####AQD#AAAQAAAAAAAAAAAAAABACAAAAAAAAAkAAAAAyAAAAMsAAAAKAP####8BAP8AABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAADJAAAAywAAACIA#####wH#AAAAAQAAAAUAAADMAAAAzQAAAM4AAADPAAAAzAAAACgA#####wH#AAAAAAAFAAAA0AAAABYA#####wAAAAoAAABG#####wAAAAEAC0NNYWNyb1BhdXNlAP####8AAAAAAf####8QQI7sAAAAAABAIwo9cKPXDAIAAAAAAAAAAAAAAAABAAAAAAAAAAAABVBhdXNlAAAAAAACAAAABgD#####AAAACgAAAAcDAAAAAT#wAAAAAAAAAAAAIQAAAFEAAAAIAAAAwAAAAAoA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAGEAAADUAAAACgD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAZAAAANQAAAAKAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABiAAAA1AAAAAoA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAGMAAADUAAAAIgD#####Af8AAAABAAAABQAAANUAAADWAAAA1wAAANgAAADVAAAACgD#####Af8AAAAQAAFNAAAAAAAAAAAAQAgAAAAAAAAFAAAAANUAAADSAAAACgD#####Af8AAAAQAAFOAAAAAAAAAAAAQAgAAAAAAAAFAAAAANYAAADSAAAACgD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAA1wAAANIAAAAKAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAADYAAAA0gAAACIA#####wEAAH8AAQAAAAUAAADaAAAA2wAAANwAAADdAAAA2gAAACgA#####wEAAP8AAAAFAAAA3v####8AAAABAA9DU3ltZXRyaWVBeGlhbGUA#####wAAADkAAAAKAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABNAAAA4AAAAAoA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAE4AAADgAAAACgD#####AQB#AAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAATwAAAOAAAAAKAP####8BAH8AABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABQAAAA4AAAACIA#####wEAfwAAAQAAAAUAAADhAAAA4gAAAOMAAADkAAAA4QAAACgA#####wEAfwAAAAAFAAAA5QAAABgA#####wH#AAAAEAAAAQACAAAAJQAAACgAAAAKAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAlAAAAJgAAABgA#####wEAfwAAEAAAAQACAAAA6AAAACkAAAAZAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAA5AAAA6QAAABoA#####wEAfwAAwDoAAAAAAADAPgAAAAAAAAAAAOoQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAIKGQjTCgxKSkAAAACAP####8AA3hjMwABOAAAAAFAIAAAAAAAAAAAAAIA#####wADeWMzAAE0AAAAAUAQAAAAAAAAAAAAEgD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAGQAAAAgAAAAvAAAACAAAADAAAAASAP####8B#wAAABAAAmMzAAAAAAAAAAAAQAgAAAAAAAAFAAAAABkAAAAIAAAA7AAAAAgAAADtAAAAAgD#####AAJ4VgABMAAAAAEAAAAAAAAAAAAAAAIA#####wACeVYAATAAAAABAAAAAAAAAAAAAAACAP####8AA3hWMgABMAAAAAEAAAAAAAAAAAAAAAIA#####wADeVYyAAEwAAAAAQAAAAAAAAAAAAAAAgD#####AAN4VjMAATAAAAABAAAAAAAAAAAAAAACAP####8AA3lWMwABMAAAAAEAAAAAAAAAAAAAACoA#####wAAADIAAAAKAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAADMAAAA9gAAAAoA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAM0AAAD2AAAACgD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAzgAAAPYAAAAKAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAADPAAAA9gAAACIA#####wH#AAAAAQAAAAUAAAD3AAAA+AAAAPkAAAD6AAAA9wAAACgA#####wH#AAAAAAAFAAAA+#####8AAAABABZDRHJvaXRlUGVycGVuZGljdWxhaXJlAP####8BAAD#ABAAAAEAAgAAAO8AAAALAAAAGQD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAMgAAAOcAAAAaAP####8B#wAAAMBGAAAAAAAAwDwAAAAAAAAAAAD+EAAAAAAAAAAAAAAAAAABAAAAAAAAAAAACChkI0woMikpAAAAGQD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAACwAAAP0AAAAaAP####8BAAD#AMA9AAAAAAAAwAgAAAAAAAAAAAEAEAAAAAAAAAAAAAAAAAABAAAAAAAAAAAACChkI0woMykp#####wAAAAEADUNQb2ludFByb2pldGUA#####wEAfwAAEAABRQAAAAAAAAAAAEAIAAAAAAAABQAAAABFAAAAOQAAABgA#####wEAfwAAEAAAAQABAAAA4QAAAEUAAAAJAP####8BAH8AABAAAUYAAAAAAAAAAABACAAAAAAAAAUAAT#wAAAAAAAAAAABA#####8AAAACAA9DTWVzdXJlQWJzY2lzc2UA#####wACazEAAAECAAAARQAAAQQAAAAsAP####8BAH8AABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABQAAAAOQAAACwA#####wEAfwAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAE4AAAA5AAAABgD#####AAABBgAAAAgAAAEFAAAACgD#####AQB#AAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAUAAAAQgAAAAGAP####8AAAEHAAAACAAAAQUAAAAKAP####8BAH8AABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABOAAABCgAAAAYA#####wAAAQIAAAAIAAABBQAAAAoA#####wEAfwAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAE8AAAEMAAAAIgD#####AQB#AAABAAAABQAAAQsAAAEEAAABCQAAAQ0AAAELAAAAKAD#####AQB#AAAAAAUAAAEO#####wAAAAEAEUNNYWNyb0Rpc3Bhcml0aW9uAP####8AAH8AAf####8KQI0UAAAAAABAScKPXCj1xAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAB21hc3F1ZTEAAAAAAAkAAADDAAAAxAAAAQ4AAAEPAAAA5QAAAOYAAAA8AAAAOQAAAOv#####AAAAAQAQQ01hY3JvQXBwYXJpdGlvbgD#####AAB#AAH#####CkCNDAAAAAAAQFLhR64UeuICAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAlhcHBhcmFpdDEAAAAAAAkAAADDAAAAxAAAAQ4AAAEPAAAA5QAAAOYAAAA8AAAAOQAAAOsA#####wAAAAIAF0NNYWNyb0FuaW1hdGlvblBvaW50TGllAP####8AAH8AAf####8KQI0MAAAAAABAWeFHrhR64gIAAAAAAAAAAAAAAAABAAAAAAAAAAAABWFuaW0xAAAAAAAAFAAAAGQAAAA8AAABBAABAP####8AAAABABFDTWFjcm9TdWl0ZU1hY3JvcwD#####AAB#AAH#####CkA0gAAAAAAAQBYUeuFHrhgCAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAxDb3JyZWN0aW9uIGEAAAAAAAQAAAERAAABEgAAARAAAADTAAAALAD#####AQB#AAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAOAAAADIAAAAsAP####8BAH8AABAAAUcAAAAAAAAAAABACAAAAAAAAAUAAAAAzAAAADIAAAAYAP####8BAH8AABAAAAEAAQAAAMwAAAD3AAAACQD#####AQB#AAAQAAFLAAAAAAAAAAAAQAgAAAAAAAAFAAEAAAAAAAAAAAAAARYAAAAtAP####8AAmsyAAABFQAAAMwAAAEXAAAALAD#####AQB#AAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAzwAAADIAAAAsAP####8BAH8AABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAADOAAAAMgAAAAYA#####wAAARoAAAAIAAABGAAAAAoA#####wEAfwAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAM4AAAEbAAAABgD#####AAABGQAAAAgAAAEYAAAACgD#####AQB#AAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAzwAAAR0AAAAKAP####8BAH8AABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAADNAAABHQAAACIA#####wH#AAAAAQAAAAUAAAEXAAABHgAAARwAAAEfAAABFwAAACgA#####wH#AAAAAAAFAAABIAAAAC4A#####wD#AAAB#####wpAjUwAAAAAAEBhcKPXCj1xAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAHbWFzcXVlMgAAAAAACQAAANAAAADRAAAA+wAAASAAAAEhAAAA#AAAAP8AAAAyAAAANQAAAC8A#####wD#AAAB#####wpAjUwAAAAAAEBlcKPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAJYXBwYXJhaXQyAAAAAAAJAAAA0AAAANEAAAD7AAABIAAAASEAAAD8AAAA#wAAADIAAAA1AAAAADAA#####wD#AAAB#####wpAjWQAAAAAAEBpcKPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAFYW5pbTIAAAAAAAAUAAAAZAAAADwAAAEXAAEAAAAAMQD#####AP8AAAH#####CkBYIAAAAAAAQBYUeuFHrhgCAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAxDb3JyZWN0aW9uIGIAAAAAAAQAAAEjAAABJAAAASIAAADTAAAAKgD#####AAAA#QAAAAoA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAANoAAAEmAAAACgD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAA2wAAASYAAAAKAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAADcAAABJgAAAAoA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAN0AAAEmAAAAIgD#####AQAA#wABAAAABQAAAScAAAEoAAABKQAAASoAAAEnAAAAKAD#####AQAA#wAAAAUAAAErAAAALAD#####AQAA#wAQAAFMAAAAAAAAAAAAQAgAAAAAAAAFAAAAANoAAAD9AAAALAD#####AQAA#wAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAA3QAAAP0AAAAYAP####8B#wAAABAAAAEAAQAAANsAAAEoAAAACQD#####Af8AAAAQAAFQAAAAAAAAAAAAQAgAAAAAAAAFAAEAAAAAAAAAAAAAAS8AAAAtAP####8AAmszAAABLQAAANsAAAEwAAAABgD#####AAABLQAAAAgAAAExAAAACgD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAA2gAAATIAAAAGAP####8AAAEuAAAACAAAATEAAAAKAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAADdAAABNAAAAAoA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAANwAAAE0AAAAIgD#####AQAA#wABAAAABQAAATMAAAEwAAABNgAAATUAAAEzAAAAKAD#####AQAA#wAAAAUAAAE3AAAALgD#####AAAA#wH#####CkCNZAAAAAAAQG2Qo9cKPXACAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAdtYXNxdWUzAAAAAAAIAAAA3gAAAN8AAAE3AAABOAAAAQEAAAD9AAABKwAAASwAAAAvAP####8AAAD#Af####8QQI2MAAAAAABAcJhR64UeuAIAAAAAAAAAAAAAAAABAAAAAAAAAAAACWFwcGFyYWl0MwAAAAAACAAAAN4AAADfAAABNwAAATgAAAEBAAAA#QAAASsAAAEsAAAAADAA#####wAAAP8B#####wpAjcwAAAAAAEBy2FHrhR64AgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAFYW5pbTMAAAAAAAAUAAAAZAAAADwAAAEwAAEAAAAAMQD#####AAAA#wH#####CkBlUAAAAAAAQBYUeuFHrhgCAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAxDb3JyZWN0aW9uIGMAAAAAAAMAAAE6AAABOwAAATkAAAAxAP####8AAAD#Af####8QQI28AAAAAABAdNhR64UeuAIAAAAAAAAAAAAAAAABAAAAAAAAAAAACkNvcnJlY3Rpb24AAAAAAAQAAADTAAABEwAAASUAAAE8################"
		// Première question : une figure type A par symétrie d'axe // à [BD] est une figure type A. le symétrique du sommet A est le sommet C
			indexA = randint(0, nx * ny - 1)
			numA = tabfigA[indexA][2]
			let indexsym1 = randint(0, nx * ny - 1, [indexA]) // sert à choisir un axe [BD]. 
			xmil1=tabfigD[indexsym1][0] // sert pour faire passer l'axe de symétrie.
			ymil1=tabfigD[indexsym1][1]
			point = image_point_par_transformation(2, [tabfigA[indexA][0], tabfigA[indexA][1]], [xmil1, ymil1])
			trouver = false
			while (trouver == false) {
				for (let j = 0; j < nx * ny; j++) {
					if (point[0] == tabfigC[j][0] && point[1] == tabfigC[j][1]) {
						trouver = true
						num1=tabfigA[j][2]
						xa=tabfigA[indexA][0]
						ya=tabfigA[indexA][1]
						break
					}
				}
				if (trouver == false) {
					indexA = randint(0, nx * ny - 1)
					numA = tabfigA[indexA][2]
					indexsym1 = randint(0, nx * ny - 1, [indexA]) 
					xmil1=tabfigD[indexsym1][0] 
					ymil1=tabfigD[indexsym1][1]
					point = image_point_par_transformation(2, [tabfigA[indexA][0], tabfigA[indexA][1]], [xmil1, ymil1])
				}
			}
			texte += num_alpha(0) + texte_en_couleur_et_gras(` Quel est le numéro de la figure symétrique de la figure ${numA} dans la symétrie par rapport à $(d_1)$ ?<br>`, `green`)
			texte_corr = num_alpha(0) + texte_en_couleur_et_gras(` La figure symétrique de la figure ${numA} dans la symétrie par rapport à $(d_1)$ porte le numéro ${num1}.<br>`, `green`)
			// Deuxième question : une figure type D par symétrie d'axe // à [AC] est une figure type B. le symétrique du sommet B est le sommet D
			indexD = randint(0, nx * ny - 1)
			numD = tabfigD[indexD][2]
			let indexsym2 = randint(0, nx * ny - 1, [indexD]) // sert à choisir un axe [AC]. 
			xmil2=tabfigA[indexsym2][0] // sert pour faire passer l'axe de symétrie.
			ymil2=tabfigA[indexsym2][1]
			point = image_point_par_transformation(1, [tabfigD[indexD][0], tabfigD[indexD][1]], [xmil2, ymil2])
			trouver = false
			while (trouver == false) {
				for (let j = 0; j < nx * ny; j++) {
					if (point[0] == tabfigB[j][0] && point[1] == tabfigB[j][1]) {
						trouver = true
						num2=tabfigB[j][2]
						xb=tabfigD[indexD][0]
						yb=tabfigD[indexD][1]-4
						break
					}
				}
				if (trouver == false) {
					indexD = randint(0, nx * ny - 1)
					numD = tabfigD[indexD][2]
					indexsym2 = randint(0, nx * ny - 1, [indexD]) // sert à choisir un axe [AC]. 
					xmil2=tabfigA[indexsym2][0] // sert pour faire passer l'axe de symétrie.
					ymil2=tabfigA[indexsym2][1]
					point = image_point_par_transformation(1, [tabfigD[indexD][0], tabfigD[indexD][1]], [xmil2, ymil2])
				}
			}
			texte += num_alpha(1) + texte_en_couleur_et_gras(` Quel est le numéro de la figure symétrique de la figure ${numD} dans la symétrie par rapport à $(d_2)$ ?<br>`, `red`)
			texte_corr += num_alpha(1) + texte_en_couleur_et_gras(` La figure symétrique de la figure ${numD} dans la symétrie par rapport à $(d_2)$ porte le numéro ${num2}.<br>`, `red`)
			// troisième question : une figure type C par symétrie d'axe // à [DC] est une figure type B. le symétrique du sommet C est le sommet C'
			indexC = randint(0, nx * ny - 1)
			numC = tabfigC[indexC][2]
			let indexsym3 = randint(0, nx * ny - 1, [indexC]) // sert à choisir un axe [AC]. 
			xmil3=tabfigC[indexsym3][0] // sert pour faire passer l'axe de symétrie.
			ymil3=tabfigC[indexsym3][1]
			point = image_point_par_transformation(3, [tabfigC[indexC][0], tabfigC[indexC][1]], [xmil3, ymil3])
			trouver = false
			while (trouver == false) {
				for (let j = 0; j < nx * ny; j++) {
					if (point[0] == tabfigC[j][0] && point[1] == tabfigC[j][1]) {
						trouver = true
						num3=tabfigC[j][2]
						xc=tabfigC[indexC][0]-4
						yc=tabfigC[indexC][1]-4
						break
					}
				}
				if (trouver == false) {
					indexC = randint(0, nx * ny - 1)
					numC = tabfigC[indexC][2]
					let indexsym3 = randint(0, nx * ny - 1, [indexC]) // sert à choisir un axe [AC]. 
					xmil3=tabfigC[indexsym3][0] // sert pour faire passer l'axe de symétrie.
					ymil3=tabfigC[indexsym3][1]
					point = image_point_par_transformation(3, [tabfigC[indexC][0], tabfigC[indexC][1]], [xmil3, ymil3])
				}
			}
			texte += num_alpha(2) + texte_en_couleur_et_gras(` Quel est le numéro de la figure symétrique de la figure ${numC} dans la symétrie par rapport à $(d_3)$ ?<br>`, `blue`)
			texte_corr += num_alpha(2) + texte_en_couleur_et_gras(` La figure symétrique de la figure ${numC} dans la symétrie par rapport à $(d_3)$ porte le numéro ${num3}.<br>`, `blue`)

			break
		case 2 : // symétrie centrale
			this.MG32codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+0euFAAJmcv###wEA#wEAAAAAAAAAAAUcAAAC0gAAAQEAAAAAAAAAAQAAAST#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAHQ0NhbGN1bAD#####AAVBbmdsZQABMAAAAAEAAAAAAAAAAAAAAAIA#####wAEWm9vbQACMzAAAAABQD4AAAAAAAAAAAACAP####8AAm54AAE1AAAAAUAUAAAAAAAA#####wAAAAEABUNGb25jAP####8AB21vZHVsb3gACG1vZCh4LDIp#####wAAAAEADUNGb25jdGlvbjJWYXIG#####wAAAAIAEUNWYXJpYWJsZUZvcm1lbGxlAAAAAAAAAAFAAAAAAAAAAAABeAAAAAMA#####wAHbW9kdWxveQASbW9kKGludCh5L254LzIpLDIpAAAABAb#####AAAAAgAJQ0ZvbmN0aW9uAv####8AAAABAApDT3BlcmF0aW9uAwAAAAcDAAAABQAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAAwAAAAFAAAAAAAAAAAAAAAFAAAAAAAAAAAABeQAAAAMA#####wACcjAAJXNpKChtb2R1bG94KHgpPTApKihtb2R1bG95KHgpPTApLDEsMCn#####AAAAAQANQ0ZvbmN0aW9uM1ZhcgAAAAAHAgAAAAcI#####wAAAAEADkNBcHBlbEZvbmN0aW9uAAAABAAAAAUAAAAAAAAAAQAAAAAAAAAAAAAABwgAAAAKAAAABQAAAAUAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAQAAAAAAAAAAAAF4AAAAAgD#####AAJ5RAABNgAAAAFAGAAAAAAAAAAAAAIA#####wACeEQAATAAAAABAAAAAAAAAAAAAAACAP####8AAnlDAAE0AAAAAUAQAAAAAAAAAAAAAgD#####AAJ4QwABNgAAAAFAGAAAAAAAAAAAAAIA#####wACeUIAATAAAAABAAAAAAAAAAAAAAACAP####8AAnhCAAE0AAAAAUAQAAAAAAAA#####wAAAAEACkNQb2ludEJhc2UA#####wAAAAAAEAABTwDAMgAAAAAAAMAzAAAAAAAABQABQFKgAAAAAABAYLCj1wo9cf####8AAAABABRDRHJvaXRlRGlyZWN0aW9uRml4ZQD#####Af8AAAEQAAABAAIAAAANAD#3Cj1wo9cK#####wAAAAEACUNSb3RhdGlvbgD#####AAAADQAAAAFAVoAAAAAAAP####8AAAABAAtDSG9tb3RoZXRpZQD#####AAAADQAAAAcDAAAAAT#wAAAAAAAAAAAACAAAAAL#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQABQGeAAAAAAAAAAAAOAAAADQD#####AAAADQAAAAgAAAAB#####wAAAAEAC0NQb2ludEltYWdlAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAARAAAAEv####8AAAABAA5DUG9pbnRMaWVQb2ludAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAE#####8AAAABAAlDQ2VyY2xlT0EA#####wH#AAAAAgAAAA0AAAAU#####wAAAAEADUNEZW1pRHJvaXRlT0EA#####wH#AAAADQAAAQACAAAADQAAABT#####AAAAAQAQQ0RlbWlEcm9pdGVJbWFnZQD#####Af8AAAANAAABAAIAAAAWAAAAD#####8AAAABABBDSW50RHJvaXRlQ2VyY2xlAP####8AAAAXAAAAFf####8AAAABABBDUG9pbnRMaWVCaXBvaW50AP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQABAAAAGAAAABAA#####wH#AAAAEAACSicAAAAAAAAAAABACAAAAAAAAAUAAAAAFAAAABAAAAAQAP####8B#wAAABAAAkknAAAAAAAAAAAAQAgAAAAAAAAFAAAAABkAAAAQ#####wAAAAIAB0NSZXBlcmUA#####wDm5uYBAQAAAA0AAAAbAAAAGgAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAE#8AAAAAAAAAAAAAE#8AAAAAAAAP####8AAAABABBDUG9pbnREYW5zUmVwZXJlAP####8B#wAAARAAAkInAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAADAAAAAgAAAALAAAAEQD#####AQAAAAAQAAFCAEAAAAAAAAAAwDcAAAAAAAAFAAAAAB0AAAAYAP####8B#wAAARAAAkQnAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAACAAAAAgAAAAHAAAAEQD#####AQAAAAAQAAFEAMAxAAAAAAAAwCoAAAAAAAAFAAAAAB8AAAAYAP####8B#wAAARAAAkMnAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAACgAAAAgAAAAJAAAAEQD#####AQAAAAAQAAFDAEAIAAAAAAAAv#AAAAAAAAAFAAAAACEAAAACAP####8AAnhhAAIxMgAAAAFAKAAAAAAAAAAAAAIA#####wACeWEAATgAAAABQCAAAAAAAAAAAAACAP####8ABG51bWEAATAAAAABAAAAAAAAAAAAAAACAP####8AAnhjAAIxOAAAAAFAMgAAAAAAAAAAAAIA#####wACeWMAAjEyAAAAAUAoAAAAAAAAAAAAAgD#####AAN4YzEAATUAAAABQBQAAAAAAAAAAAACAP####8AA3ljMQABMgAAAAFAAAAAAAAAAAAAABgA#####wEAAAAAEAABYQAAAAAAAAAAAEAIAAAAAAAABQAAAAAcAAAACAAAACMAAAAIAAAAJAAAABgA#####wEAAAAAEAABYwAAAAAAAAAAAEAIAAAAAAAABQAAAAAcAAAACAAAACYAAAAIAAAAJwAAABgA#####wAJzAkAEAACYzEAAAAAAAAAAABACAAAAAAAAAkAAAAAHAAAAAgAAAAoAAAACAAAACkAAAAOAP####8AAAANAAAABwMAAAABP#AAAAAAAAAAAAAKAAAABgAAAAgAAAAlAAAAEAD#####AAAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAADQAAAC0AAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAgAAAALQAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAACIAAAAtAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAHgAAAC3#####AAAAAQAMQ1RyYW5zbGF0aW9uAP####8AAAANAAAAKgAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAC4AAAAyAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAALwAAADIAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAwAAAAMgAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAADEAAAAyAAAAAgD#####AAJueQABNQAAAAFAFAAAAAAAAAAAAAMA#####wACcjMAJXNpKChtb2R1bG94KHgpPTEpKihtb2R1bG95KHgpPTEpLDEsMCkAAAAJAAAAAAcCAAAABwgAAAAKAAAABAAAAAUAAAAAAAAAAT#wAAAAAAAAAAAABwgAAAAKAAAABQAAAAUAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAAAAAAAQAAAAAAAAAAAAF4AAAAAwD#####AAJyMgAlc2koKG1vZHVsb3goeCk9MCkqKG1vZHVsb3koeCk9MSksMSwwKQAAAAkAAAAABwIAAAAHCAAAAAoAAAAEAAAABQAAAAAAAAABAAAAAAAAAAAAAAAHCAAAAAoAAAAFAAAABQAAAAAAAAABP#AAAAAAAAAAAAABP#AAAAAAAAAAAAABAAAAAAAAAAAAAXgAAAADAP####8AAnIxACVzaSgobW9kdWxveCh4KT0xKSoobW9kdWxveSh4KT0wKSwxLDApAAAACQAAAAAHAgAAAAcIAAAACgAAAAQAAAAFAAAAAAAAAAE#8AAAAAAAAAAAAAcIAAAACgAAAAUAAAAFAAAAAAAAAAEAAAAAAAAAAAAAAAE#8AAAAAAAAAAAAAEAAAAAAAAAAAABeAAAAAIA#####wAFbWluaTEAAjEwAAAAAUAkAAAAAAAAAAAAAgD#####AAVtYXhpMQACNDAAAAABQEQAAAAAAAAAAAACAP####8ABHBhczEAATEAAAABP#AAAAAAAAD#####AAAAAgAMQ0NvbW1lbnRhaXJlAP####8BAAAAAMAxAAAAAAAAwC4AAAAAAAAAAAANEAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAUEAAAACAP####8ABW1pbmkyAAMtMzD#####AAAAAQAMQ01vaW5zVW5haXJlAAAAAUA+AAAAAAAAAAAAAgD#####AAVtYXhpMgACMzAAAAABQD4AAAAAAAAAAAACAP####8ABHBhczIAATEAAAABP#AAAAAAAAD#####AAAAAQAHQ01pbGlldQD#####AQAAAAEQAAJKMQAAAAAAAAAAAEAIAAAAAAAABQAAAAAgAAAAIv####8AAAABABFDU3ltZXRyaWVDZW50cmFsZQD#####AAAAQgAAABAA#####wEAAAABEAABSgAAAAAAAAAAAEAIAAAAAAAABQAAAAAeAAAAQwAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAA0AAABDAAAAHAD#####AQAAAAEQAAJJMQAAAAAAAAAAAEAIAAAAAAAABQAAAAAiAAAAHgAAAB0A#####wAAAEYAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAANAAAARwAAABAA#####wEAAAABEAABSQAAAAAAAAAAAEAIAAAAAAAABQAAAAAgAAAARwAAABkA#####wAAAA0AAAAiAAAAEAD#####AQAAAAEQAAFBAAAAAAAAAAAAQAgAAAAAAAAFAAAAAA0AAABKAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAIgAAAEoAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAeAAAASgAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAACAAAABK#####wAAAAEACUNQb2x5Z29uZQD#####AAAAAAABAAAABQAAACAAAABEAAAARQAAACIAAAAgAAAAHgD#####AAAAAAABAAAABQAAAB4AAAAiAAAASAAAAEkAAAAeAAAAHgD#####AAAAAAABAAAABQAAAEsAAABOAAAATAAAAE0AAABLAAAAHgD#####AAAAAAABAAAABQAAAA0AAAAgAAAAIgAAAB4AAAANAAAAFgD#####AP8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAgAAABgAAAAXAP####8A5ubmAAEAAAANAAAASQAAAEQAAAAAAAABAAAAAAAAAAAAAAABAAAAAAAAAAAAAAABP#AAAAAAAAAAAAABP#AAAAAAAAD#####AAAAAQARQ1BvaW50UGFyQWJzY2lzc2UA#####wEAAAAAEAABVQAAAAAAAAAAAEAIAAAAAAAABQAAAAANAAAASQAAAAcBAAAACAAAAAMAAAABP#AAAAAAAAAAAAAfAP####8BAAAAABAAAVYAAAAAAAAAAABACAAAAAAAAAUAAAAADQAAAEQAAAAHAQAAAAgAAAA3AAAAAT#wAAAAAAAA#####wAAAAEACENTZWdtZW50AP####8BAAAAABAAAAEAAQAAAA0AAABVAAAAIAD#####AQAAAAAQAAABAAEAAAANAAAAVgAAAA8A#####wEAAAAAEAACVTEAAAAAAAAAAABACAAAAAAAAAUAAT#TA9Z22dUpAAAAVwAAABkA#####wAAAA0AAABWAAAAEAD#####AQAAAAAQAAJWMQAAAAAAAAAAAEAIAAAAAAAABQAAAABZAAAAWgAAACAA#####wEAAAAAEAAAAQABAAAAWQAAAFsAAAAPAP####8BAAAAABAAAlUyAAAAAAAAAAAAQAgAAAAAAAAFAAE#1tGzvqNnfgAAAFwAAAAZAP####8AAAANAAAAXQAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAA0AAABeAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAIAAAAF4AAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAiAAAAXgAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAB4AAABeAAAAHgD#####AQAAAAABAAAABQAAAF8AAABgAAAAYQAAAGIAAABfAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAASAAAAF4AAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABJAAAAXgAAAB4A#####wEAAAAAAQAAAAUAAABiAAAAYQAAAGQAAABlAAAAYgAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAEQAAABeAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAARQAAAF4AAAAeAP####8BAAAAAAEAAAAFAAAAYAAAAGcAAABoAAAAYQAAAGAAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABLAAAAXgAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAE4AAABeAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAATAAAAF4AAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABNAAAAXgAAAB4A#####wEAAAAAAQAAAAUAAABqAAAAawAAAGwAAABtAAAAav####8AAAACAAhDTWVzdXJlWAD#####AAF4AAAAVAAAAF3#####AAAAAgAIQ01lc3VyZVkA#####wABeQAAAFQAAABdAAAAAgD#####AAJ4MQAMaW50KHgrMC4wMDEpAAAABgIAAAAHAAAAAAgAAABvAAAAAT9QYk3S8an8AAAAAgD#####AAJ5MQAMaW50KHkrMC4wMDEpAAAABgIAAAAHAAAAAAgAAABwAAAAAT9QYk3S8an8AAAAAgD#####AANudW0ADHgxKjIrbngqNCp5MQAAAAcAAAAABwIAAAAIAAAAcQAAAAFAAAAAAAAAAAAAAAcCAAAABwIAAAAIAAAAAwAAAAFAEAAAAAAAAAAAAAgAAAByAAAAHAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAXQAAAGH#####AAAAAQAPQ1ZhbGV1ckFmZmljaGVlAP####8BAAAAAMAmAAAAAAAAwCP#######AAAAB0EgAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAgAAAHMAAAACAP####8ABG51bTEABW51bSsxAAAABwAAAAAIAAAAcwAAAAE#8AAAAAAAAAAAAAIA#####wAEbnVtJwAIbnVtK254KjIAAAAHAAAAAAgAAABzAAAABwIAAAAIAAAAAwAAAAFAAAAAAAAAAAAAAAIA#####wAFbnVtJzEABm51bScrMQAAAAcAAAAACAAAAHcAAAABP#AAAAAAAAAAAAAcAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABgAAAAaAAAABwA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAGEAAABsAAAAHAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAYgAAAGQAAAAjAP####8BAAAAAMAmAAAAAAAAwCQAAAAAAAAAAAB7EgAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAgAAAHYAAAAjAP####8BAAAAAMAkAAAAAAAAwCQAAAAAAAAAAAB5EgAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAgAAAHcAAAAjAP####8BAAAAAMAiAAAAAAAAwCAAAAAAAAAAAAB6EgAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAgAAAHj#####AAAAAgASQ0xpZXVPYmpldFBhclB0TGllAP####8BAAAAAAAAYwAAAAgAAAA3AAAAXQAAAAcAAABdAAAAXgAAAF8AAABgAAAAYQAAAGIAAABjAAAAJAD#####AQAAAAAAAGkAAAAIAAAANwAAAF0AAAAHAAAAXQAAAF4AAABgAAAAYQAAAGcAAABoAAAAaQAAACQA#####wEAAAAAAABuAAAACAAAADcAAABdAAAABwAAAF0AAABeAAAAagAAAGsAAABsAAAAbQAAAG4AAAAkAP####8BAAAAAAAAZgAAAAgAAAA3AAAAXQAAAAcAAABdAAAAXgAAAGEAAABiAAAAZAAAAGUAAABmAAAAJAD#####AAAAAAAAAH8AAAAIAAAAAwAAAFkAAAALAAAAWQAAAFsAAABcAAAAXQAAAF4AAABfAAAAYAAAAGEAAABiAAAAYwAAAH8AAAAkAP####8AAAAAAAAAggAAAAgAAAADAAAAWQAAAAsAAABZAAAAWwAAAFwAAABdAAAAXgAAAGEAAABiAAAAZAAAAGUAAABmAAAAggAAACQA#####wAAAAAAAACBAAAACAAAAAMAAABZAAAACwAAAFkAAABbAAAAXAAAAF0AAABeAAAAagAAAGsAAABsAAAAbQAAAG4AAACBAAAAJAD#####AAAAAAAAAIAAAAAIAAAAAwAAAFkAAAALAAAAWQAAAFsAAABcAAAAXQAAAF4AAABgAAAAYQAAAGcAAABoAAAAaQAAAIAAAAAkAP####8BAAAAAAAAdQAAAAgAAAA3AAAAXQAAAAoAAABdAAAAXgAAAGEAAABvAAAAcAAAAHEAAAByAAAAcwAAAHQAAAB1AAAAJAD#####AAAAAAAAAIcAAAAIAAAAAwAAAFkAAAAOAAAAWQAAAFsAAABcAAAAXQAAAF4AAABhAAAAbwAAAHAAAABxAAAAcgAAAHMAAAB0AAAAdQAAAIcAAAAkAP####8BAAAAAAAAfAAAAAgAAAA3AAAAXQAAAAwAAABdAAAAXgAAAGIAAABkAAAAbwAAAHAAAABxAAAAcgAAAHMAAAB2AAAAewAAAHwAAAAkAP####8AAAAAAAAAiQAAAAgAAAADAAAAWQAAABAAAABZAAAAWwAAAFwAAABdAAAAXgAAAGIAAABkAAAAbwAAAHAAAABxAAAAcgAAAHMAAAB2AAAAewAAAHwAAACJAAAAJAD#####AQAAAAAAAH4AAAAIAAAANwAAAF0AAAANAAAAXQAAAF4AAABhAAAAbAAAAG8AAABwAAAAcQAAAHIAAABzAAAAdwAAAHgAAAB6AAAAfgAAACQA#####wAAAAAAAACLAAAACAAAAAMAAABZAAAAEQAAAFkAAABbAAAAXAAAAF0AAABeAAAAYQAAAGwAAABvAAAAcAAAAHEAAAByAAAAcwAAAHcAAAB4AAAAegAAAH4AAACLAAAAJAD#####AQAAAAAAAH0AAAAIAAAANwAAAF0AAAAMAAAAXQAAAF4AAABgAAAAaAAAAG8AAABwAAAAcQAAAHIAAABzAAAAdwAAAHkAAAB9AAAAJAD#####AAAAAAAAAI0AAAAIAAAAAwAAAFkAAAAQAAAAWQAAAFsAAABcAAAAXQAAAF4AAABgAAAAaAAAAG8AAABwAAAAcQAAAHIAAABzAAAAdwAAAHkAAAB9AAAAjf####8AAAABABRDSW1wbGVtZW50YXRpb25Qcm90bwD#####AClBZmZpY2hhZ2UgZCfDqXF1YXRpb24gZGUgZHJvaXRlIG91IGNlcmNsZQAAAAIAAAABAAAAAgAAABwAAABJAAAAIQAAAACPAAJ4MgAAABwAAABJAAAAIgAAAACPAAJ5MgAAABwAAABJAAAAGgEAAACPAf8AAABAHAAAAAAAAAAAAAAAAAAAAAAASRAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAABcoI1ZhbCh4MiwxKSwjVmFsKHkyLDIpKQAAACUA#####wApQWZmaWNoYWdlIGQnw6lxdWF0aW9uIGRlIGRyb2l0ZSBvdSBjZXJjbGUAAAACAAAAAQAAAAIAAAAcAAAARAAAACEAAAAAkwACeDIAAAAcAAAARAAAACIAAAAAkwACeTIAAAAcAAAARAAAABoBAAAAkwH#AAAAQBwAAAAAAADANQAAAAAAAAAAAEQQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAXKCNWYWwoeDIsMSksI1ZhbCh5MiwyKSkAAAAlAP####8AKUFmZmljaGFnZSBkJ8OpcXVhdGlvbiBkZSBkcm9pdGUgb3UgY2VyY2xlAAAAAgAAAAEAAAACAAAAHAAAACAAAAAhAAAAAJcAAngyAAAAHAAAACAAAAAiAAAAAJcAAnkyAAAAHAAAACAAAAAaAQAAAJcB#wAAAL#wAAAAAAAAQAAAAAAAAAAAAAAgEAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAFygjVmFsKHgyLDEpLCNWYWwoeTIsMikpAAAAJQD#####AClBZmZpY2hhZ2UgZCfDqXF1YXRpb24gZGUgZHJvaXRlIG91IGNlcmNsZQAAAAIAAAABAAAAAgAAABwAAAAeAAAAIQAAAACbAAJ4MgAAABwAAAAeAAAAIgAAAACbAAJ5MgAAABwAAAAeAAAAGgEAAACbAf8AAAC#8AAAAAAAAD#########gAAAAHhAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAABcoI1ZhbCh4MiwxKSwjVmFsKHkyLDIpKQAAACUA#####wApQWZmaWNoYWdlIGQnw6lxdWF0aW9uIGRlIGRyb2l0ZSBvdSBjZXJjbGUAAAACAAAAAQAAAAIAAAAcAAAAIgAAACEAAAAAnwACeDIAAAAcAAAAIgAAACIAAAAAnwACeTIAAAAcAAAAIgAAABoBAAAAnwH#AAAAQBgAAAAAAADANQAAAAAAAAAAACIQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAXKCNWYWwoeDIsMSksI1ZhbCh5MiwyKSkAAAAQAP####8B#wAAARAAAkExAMA3AAAAAAAAv#AAAAAAAAAFAAAAACIAAABKAAAAJQD#####AClBZmZpY2hhZ2UgZCfDqXF1YXRpb24gZGUgZHJvaXRlIG91IGNlcmNsZQAAAAIAAAABAAAAAgAAABwAAACjAAAAIQAAAACkAAJ4MgAAABwAAACjAAAAIgAAAACkAAJ5MgAAABwAAACjAAAAGgEAAACkAf8AAABAEAAAAAAAAMAzAAAAAAAAAAAAoxAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAABcoI1ZhbCh4MiwxKSwjVmFsKHkyLDIpKQAAAAIA#####wACeGIAAjI0AAAAAUA4AAAAAAAAAAAAAgD#####AAJ5YgACMTYAAAABQDAAAAAAAAAAAAACAP####8ABG51bWIAAjEwAAAAAUAkAAAAAAAAAAAAAgD#####AARudW1jAAIzMwAAAAFAQIAAAAAAAAAAAAIA#####wADeGMyAAEzAAAAAUAIAAAAAAAAAAAAAgD#####AAN5YzIAATUAAAABQBQAAAAAAAAAAAACAP####8AA3hjMwABNgAAAAFAGAAAAAAAAAAAAAIA#####wADeWMzAAE3AAAAAUAcAAAAAAAAAAAAGAD#####AQAAAAAQAAFiAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAAqAAAAAgAAACpAAAAGAD#####AH8AAAAQAAJjMgAAAAAAAAAAAEAIAAAAAAAACQAAAAAcAAAACAAAAKwAAAAIAAAArQAAABgA#####wAAAH8AEAACYzMAAAAAAAAAAABACAAAAAAAAAkAAAAAHAAAAAgAAACuAAAACAAAAK8AAAAeAP####8AAAAAAAEAAAAFAAAALgAAAC8AAAAwAAAAMQAAAC4AAAAeAP####8ALLgsAAEAAAAFAAAAMwAAADQAAAA1AAAANgAAADP#####AAAAAQAQQ1N1cmZhY2VQb2x5Z29uZQD#####AAB#AAAAAAUAAAC0AAAAHQD#####AAAALAAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAADMAAAC2AAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAANAAAALYAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAA1AAAAtgAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAADYAAAC2AAAAHgD#####ASy4LAABAAAABQAAALcAAAC4AAAAuQAAALoAAAC3AAAAJgD#####AQB#AAAAAAUAAAC7AAAADgD#####AAAADQAAAAcDAAAAAT#wAAAAAAAAAAAACgAAADkAAAAIAAAAqgAAABAA#####wEA#wAAEAAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAACAAAAC9AAAAEAD#####AQD#AAAQAAAAAAAAAAAAAABACAAAAAAAAAkAAAAARAAAAL0AAAAQAP####8BAP8AABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAABFAAAAvQAAABAA#####wEA#wAAEAAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAACIAAAC9AAAAHgD#####AAAAAAABAAAABQAAAL4AAAC#AAAAwAAAAMEAAAC+AAAAGQD#####AAAADQAAALAAAAAQAP####8BAP8AABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAAC+AAAAwwAAABAA#####wEA#wAAEAAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAAL8AAADDAAAAEAD#####AQD#AAAQAAAAAAAAAAAAAABACAAAAAAAAAkAAAAAwAAAAMMAAAAQAP####8BAP8AABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAADBAAAAwwAAAB4A#####wD#AAAAAQAAAAUAAADEAAAAxQAAAMYAAADHAAAAxAAAACYA#####wD#AAAAAAAFAAAAyAAAAB0A#####wAAALEAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAADEAAAAygAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAAMUAAADKAAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAkAAAAAxgAAAMoAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAADHAAAAygAAAB4A#####wH#AAAAAQAAAAUAAADLAAAAzAAAAM0AAADOAAAAywAAACYA#####wH#AAAAAAAFAAAAzwAAABkA#####wAAAA0AAAArAAAAHQD#####AAAAsv####8AAAABABJDTWFjcm9DbGlnbm90ZW1lbnQA#####wAA#wAB#####wpAi8QAAAAAAEBSoUeuFHriAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAJQ2xpZ25vdGUxAAAAAAACAAAAuwAAALwAAAAU#####wAAAAEAC0NNYWNyb1BhdXNlAP####8AAAAAAf####8QQI70AAAAAABAQcKPXCj1wwIAAAAAAAAAAAAAAAABAAAAAAAAAAAABVBhdXNlAAAAAAAC#####wAAAAEAEkNBcmNEZUNlcmNsZURpcmVjdAD#####AQD#AAABAAAALAAAACv#####AAAAAUBmgAAAAAAAAAAAKQD#####AQAAAAABAAAAsQAAAMX#####AAAAAUBmgAAAAAAA#####wAAAAEAD0NQb2ludExpZUNlcmNsZQD#####Af8AAAEQAAAAAAAAAAAAAABACAAAAAAAAAUAAT9Q#XA667psAAAA1gAAACUA#####wAXTWVzdXJlIGQnYW5nbGUgb3JpZW50w6kAAAACAAAAAwAAAAMAAADFAAAAsQAAANf#####AAAAAQAMQ0Jpc3NlY3RyaWNlAAAAANgBAAAAABAAAAEAAQAAANcAAACxAAAAxQAAAA8AAAAA2AEAAAAAEAAAAAAAAAAAAAAAP+MzMzMzMzMFAAFAaT5Clg7dyQAAANn#####AAAAAgATQ01lc3VyZUFuZ2xlT3JpZW50ZQEAAADYAAZhbmdsZTIAAADFAAAAsQAAANcAAAAjAQAAANgBAAAAAEAIAAAAAAAAP#AAAAAAAAAAAADaDwAAAAAAAQAAAAEAAAABAAAAAAAAAAAAAAACwrAAAAAA2#####8AAAACABNDTWFycXVlQW5nbGVPcmllbnRlAQAAANgBAAAAAAEAAAABQEJbiQkrj78AAADFAAAAsQAAANcAAAAADQD#####AAAAsQAAAAgAAADbAAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAxAAAAN4AAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAADFAAAA3gAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAMYAAADeAAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAxwAAAN4AAAAeAP####8B#wAAAAEAAAAFAAAA3wAAAOAAAADhAAAA4gAAAN8AAAAmAP####8B#wAAAAAABQAAAOP#####AAAAAQAQQ01hY3JvQXBwYXJpdGlvbgD#####AP8AAAH#####CkCMxAAAAAAAQHsoUeuFHrgCAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAtBcHBhcml0aW9uMgAAAAAABgAAAM8AAADQAAAA4wAAAOQAAADXAAAA4AD#####AAAAAQARQ01hY3JvRGlzcGFyaXRpb24A#####wD#AAAB#####wpAjPQAAAAAAEB9aFHrhR64AgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAHbWFzcXVlMgAAAAAABgAAAM8AAADQAAAA4wAAAOQAAADXAAAA4AAAACcA#####wD#AAAB#####wpAjQwAAAAAAEB#eFHrhR64AgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAJQ2xpZ25vdGUyAAAAAAACAAAAzwAAANAAAAAU#####wAAAAIAGENNYWNyb0FuaW1hdGlvbkF2ZWNUcmFjZQD#####AP8AAAH#####CkCNXAAAAAAAQIC8KPXCj1wCAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAd0b3VybmUyAAAAAAABAAAA1wABAAAAAAoAAAAyAAAAAAAAANcBAP####8AAAABABFDTWFjcm9TdWl0ZU1hY3JvcwD#####AP8AAAH#####CkCQTgAAAAAAQHs4UeuFHrgCAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAVDb3JyMgAAAAAABQAAAOcAAADUAAAA5QAAAOgAAADmAAAADgD#####AAAADQAAAAcDAAAAAT#wAAAAAAAAAAAACgAAADgAAAAIAAAAqwAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAEsAAADqAAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAATgAAAOoAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABMAAAA6gAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAE0AAADqAAAAHgD#####Af8AAAABAAAABQAAAOsAAADsAAAA7QAAAO4AAADrAAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAA6wAAANEAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAADsAAAA0QAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAO0AAADRAAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAA7gAAANEAAAAeAP####8AAAB#AAEAAAAFAAAA8AAAAPEAAADyAAAA8wAAAPAAAAAmAP####8AAAB#AAAABQAAAPQAAAApAP####8B##8AAAEAAACyAAAA8P####8AAAABQGaAAAAAAAAAAAAqAP####8BAAB#ARAAAAAAAAAAAAAAAEAIAAAAAAAABQABPyl3lSGrWUIAAAD2AAAAJQD#####ABdNZXN1cmUgZCdhbmdsZSBvcmllbnTDqQAAAAIAAAADAAAAAwAAAPAAAACyAAAA9wAAACsAAAAA+AEAAAAAEAAAAQABAAAA9wAAALIAAADwAAAADwAAAAD4AQAAAAAQAAAAAAAAAAAAAAA#4zMzMzMzMwUAAUBpPkKWDt3JAAAA+QAAACwBAAAA+AAGYW5nbGUzAAAA8AAAALIAAAD3AAAAIwEAAAD4Af##AABACAAAAAAAAD#wAAAAAAAAAAAA+g8AAAAAAAEAAAABAAAAAQAAAAAAAAAAAAAAAsKwAAAAAPsAAAAtAQAAAPgB##8AAAEAAAABQEJbiQkrj78AAADwAAAAsgAAAPcAAAAAEAD#####Af##AAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAA8AAAANIAAAAQAP####8B##8AABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAADxAAAA0gAAABAA#####wH##wAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAPIAAADSAAAAEAD#####Af##AAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAA8wAAANIAAAAeAP####8BAAB#AAEAAAAFAAAA#gAAAP8AAAEAAAABAQAAAP4AAAAmAP####8BAAB#AAAABQAAAQIAAAANAP####8AAACyAAAACAAAAPsAAAAQAP####8B##8AABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAADwAAABBAAAABAA#####wH##wAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAPEAAAEEAAAAEAD#####Af##AAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAA8gAAAQQAAAAQAP####8B##8AABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAADzAAABBAAAAB4A#####wEAAH8AAQAAAAUAAAEFAAABBgAAAQcAAAEIAAABBQAAACYA#####wEAAH8AAAAFAAABCQAAAC4A#####wAAAH8B#####wpAjLQAAAAAAEBkMKPXCj1xAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAALQXBwYXJpdGlvbjMAAAAAAAUAAAECAAABAwAAAQkAAAEKAAAA9wAAAAAvAP####8AAAB#Af####8KQIzUAAAAAABAaFCj1wo9cQIAAAAAAAAAAAAAAAABAAAAAAAAAAAAB21hc3F1ZTMAAAAAAAUAAAECAAABAwAAAQkAAAEKAAAA9wAAACcA#####wAAAH8B#####wpAjOwAAAAAAEBr0KPXCj1xAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAJQ2xpZ25vdGUzAAAAAAACAAABAgAAAQMAAAAUAAAAMAD#####AAAAfwH#####CkCNLAAAAAAAQG+wo9cKPXECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAd0b3VybmUzAAAAAAABAAAA9wABAAAAAAoAAAAyAAAAAAAAAPcBAAAAADEA#####wAAAH8B#####xBAkB4AAAAAAEBkkKPXCj1xAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAFQ29ycjMAAAAAAAUAAAENAAAA1AAAAQsAAAEOAAABDAAAACkA#####wEAAH8AAQAAACwAAAAq#####wAAAAFAZoAAAAAAAAAAACoA#####wEAfwABEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAE#bzDaInuZNgAAARAAAAAlAP####8AF01lc3VyZSBkJ2FuZ2xlIG9yaWVudMOpAAAAAgAAAAMAAAADAAAAKgAAACwAAAERAAAAKwAAAAESAQAAAAAQAAABAAEAAAERAAAALAAAACoAAAAPAAAAARIBAAAAABAAAAAAAAAAAAAAAD#jMzMzMzMzBQABQGk+QpYO3ckAAAETAAAALAEAAAESAAZhbmdsZTEAAAAqAAAALAAAAREAAAAjAQAAARIBAAB#AEAIAAAAAAAAP#AAAAAAAAAAAAEUDwAAAAAAAQAAAAEAAAABAAAAAAAAAAAAAAACwrAAAAABFQAAAC0BAAABEgEAAH8AAQAAAAFAQluJCSuPvwAAACoAAAAsAAABEQAAAAANAP####8AAAAsAAAACAAAARUAAAAQAP####8BAAB#ABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAzAAABGAAAABAA#####wEAAH8AEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAADQAAAEYAAAAEAD#####AQAAfwAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAANQAAARgAAAAQAP####8BAAB#ABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAA2AAABGAAAAB4A#####wEAfwAAAQAAAAUAAAEZAAABGgAAARsAAAEcAAABGQAAACYA#####wEAfwAAAAAFAAABHQAAAC4A#####wAAfwAB#####xBAihQAAAAAAEBBQo9cKPXDAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAALQXBwYXJpdGlvbjEAAAAAAAUAAAC7AAAAvAAAAR0AAAEeAAABEQAAAAAvAP####8AAH8AAf####8KQIpMAAAAAABAWeFHrhR64gIAAAAAAAAAAAAAAAABAAAAAAAAAAAAB21hc3F1ZTEAAAAAAAUAAAC7AAAAvAAAAR0AAAEeAAABEQAAADAA#####wAAfwAB#####wpAinQAAAAAAEBf4UeuFHriAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAHdG91cm5lMQAAAAAAAQAAAREAAQAAAAAKAAAAMgAAAAAAAAERAQAAAAAxAP####8AAH8AAf####8KQI6cAAAAAABAV+FHrhR64gIAAAAAAAAAAAAAAAABAAAAAAAAAAAABUNvcnIxAAAAAAAFAAAA0wAAANQAAAEfAAABIQAAASAAAAAxAP####8AAH8AAf####8KQIyEAAAAAABAcfhR64UeuAIAAAAAAAAAAAAAAAABAAAAAAAAAAAACkNvcnJlY3Rpb24AAAAAAAMAAAEiAAAA6QAAAQ################8="
			this.MG32codeBase64corr =  "TWF0aEdyYXBoSmF2YTEuMAAAABI+0euFAAJmcv###wEA#wEAAAAAAAAAAAUcAAAC0gAAAQEAAAAAAAAAAQAAAST#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAHQ0NhbGN1bAD#####AAVBbmdsZQABMAAAAAEAAAAAAAAAAAAAAAIA#####wAEWm9vbQACMzAAAAABQD4AAAAAAAAAAAACAP####8AAm54AAE1AAAAAUAUAAAAAAAA#####wAAAAEABUNGb25jAP####8AB21vZHVsb3gACG1vZCh4LDIp#####wAAAAEADUNGb25jdGlvbjJWYXIG#####wAAAAIAEUNWYXJpYWJsZUZvcm1lbGxlAAAAAAAAAAFAAAAAAAAAAAABeAAAAAMA#####wAHbW9kdWxveQASbW9kKGludCh5L254LzIpLDIpAAAABAb#####AAAAAgAJQ0ZvbmN0aW9uAv####8AAAABAApDT3BlcmF0aW9uAwAAAAcDAAAABQAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAAwAAAAFAAAAAAAAAAAAAAAFAAAAAAAAAAAABeQAAAAMA#####wACcjAAJXNpKChtb2R1bG94KHgpPTApKihtb2R1bG95KHgpPTApLDEsMCn#####AAAAAQANQ0ZvbmN0aW9uM1ZhcgAAAAAHAgAAAAcI#####wAAAAEADkNBcHBlbEZvbmN0aW9uAAAABAAAAAUAAAAAAAAAAQAAAAAAAAAAAAAABwgAAAAKAAAABQAAAAUAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAQAAAAAAAAAAAAF4AAAAAgD#####AAJ5RAABNgAAAAFAGAAAAAAAAAAAAAIA#####wACeEQAATAAAAABAAAAAAAAAAAAAAACAP####8AAnlDAAE0AAAAAUAQAAAAAAAAAAAAAgD#####AAJ4QwABNgAAAAFAGAAAAAAAAAAAAAIA#####wACeUIAATAAAAABAAAAAAAAAAAAAAACAP####8AAnhCAAE0AAAAAUAQAAAAAAAA#####wAAAAEACkNQb2ludEJhc2UA#####wAAAAAAEAABTwDAMgAAAAAAAMAzAAAAAAAABQABQFKgAAAAAABAYLCj1wo9cf####8AAAABABRDRHJvaXRlRGlyZWN0aW9uRml4ZQD#####Af8AAAEQAAABAAIAAAANAD#3Cj1wo9cK#####wAAAAEACUNSb3RhdGlvbgD#####AAAADQAAAAFAVoAAAAAAAP####8AAAABAAtDSG9tb3RoZXRpZQD#####AAAADQAAAAcDAAAAAT#wAAAAAAAAAAAACAAAAAL#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQABQGeAAAAAAAAAAAAOAAAADQD#####AAAADQAAAAgAAAAB#####wAAAAEAC0NQb2ludEltYWdlAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAARAAAAEv####8AAAABAA5DUG9pbnRMaWVQb2ludAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAE#####8AAAABAAlDQ2VyY2xlT0EA#####wH#AAAAAgAAAA0AAAAU#####wAAAAEADUNEZW1pRHJvaXRlT0EA#####wH#AAAADQAAAQACAAAADQAAABT#####AAAAAQAQQ0RlbWlEcm9pdGVJbWFnZQD#####Af8AAAANAAABAAIAAAAWAAAAD#####8AAAABABBDSW50RHJvaXRlQ2VyY2xlAP####8AAAAXAAAAFf####8AAAABABBDUG9pbnRMaWVCaXBvaW50AP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQABAAAAGAAAABAA#####wH#AAAAEAACSicAAAAAAAAAAABACAAAAAAAAAUAAAAAFAAAABAAAAAQAP####8B#wAAABAAAkknAAAAAAAAAAAAQAgAAAAAAAAFAAAAABkAAAAQ#####wAAAAIAB0NSZXBlcmUA#####wDm5uYBAQAAAA0AAAAbAAAAGgAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAE#8AAAAAAAAAAAAAE#8AAAAAAAAP####8AAAABABBDUG9pbnREYW5zUmVwZXJlAP####8B#wAAARAAAkInAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAADAAAAAgAAAALAAAAEQD#####AQAAAAAQAAFCAEAAAAAAAAAAwDcAAAAAAAAFAAAAAB0AAAAYAP####8B#wAAARAAAkQnAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAACAAAAAgAAAAHAAAAEQD#####AQAAAAAQAAFEAMAxAAAAAAAAwCoAAAAAAAAFAAAAAB8AAAAYAP####8B#wAAARAAAkMnAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAACgAAAAgAAAAJAAAAEQD#####AQAAAAAQAAFDAEAIAAAAAAAAv#AAAAAAAAAFAAAAACEAAAACAP####8AAnhhAAIxMgAAAAFAKAAAAAAAAAAAAAIA#####wACeWEAATgAAAABQCAAAAAAAAAAAAACAP####8ABG51bWEAATAAAAABAAAAAAAAAAAAAAACAP####8AAnhjAAIxOAAAAAFAMgAAAAAAAAAAAAIA#####wACeWMAAjEyAAAAAUAoAAAAAAAAAAAAAgD#####AAN4YzEAATUAAAABQBQAAAAAAAAAAAACAP####8AA3ljMQABMgAAAAFAAAAAAAAAAAAAABgA#####wEAAAAAEAABYQAAAAAAAAAAAEAIAAAAAAAABQAAAAAcAAAACAAAACMAAAAIAAAAJAAAABgA#####wEAAAAAEAABYwAAAAAAAAAAAEAIAAAAAAAABQAAAAAcAAAACAAAACYAAAAIAAAAJwAAABgA#####wAJzAkAEAACYzEAAAAAAAAAAABACAAAAAAAAAkAAAAAHAAAAAgAAAAoAAAACAAAACkAAAAOAP####8AAAANAAAABwMAAAABP#AAAAAAAAAAAAAKAAAABgAAAAgAAAAlAAAAEAD#####AAAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAADQAAAC0AAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAgAAAALQAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAACIAAAAtAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAHgAAAC3#####AAAAAQAMQ1RyYW5zbGF0aW9uAP####8AAAANAAAAKgAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAC4AAAAyAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAALwAAADIAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAwAAAAMgAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAADEAAAAyAAAAAgD#####AAJueQABNQAAAAFAFAAAAAAAAAAAAAMA#####wACcjMAJXNpKChtb2R1bG94KHgpPTEpKihtb2R1bG95KHgpPTEpLDEsMCkAAAAJAAAAAAcCAAAABwgAAAAKAAAABAAAAAUAAAAAAAAAAT#wAAAAAAAAAAAABwgAAAAKAAAABQAAAAUAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAAAAAAAQAAAAAAAAAAAAF4AAAAAwD#####AAJyMgAlc2koKG1vZHVsb3goeCk9MCkqKG1vZHVsb3koeCk9MSksMSwwKQAAAAkAAAAABwIAAAAHCAAAAAoAAAAEAAAABQAAAAAAAAABAAAAAAAAAAAAAAAHCAAAAAoAAAAFAAAABQAAAAAAAAABP#AAAAAAAAAAAAABP#AAAAAAAAAAAAABAAAAAAAAAAAAAXgAAAADAP####8AAnIxACVzaSgobW9kdWxveCh4KT0xKSoobW9kdWxveSh4KT0wKSwxLDApAAAACQAAAAAHAgAAAAcIAAAACgAAAAQAAAAFAAAAAAAAAAE#8AAAAAAAAAAAAAcIAAAACgAAAAUAAAAFAAAAAAAAAAEAAAAAAAAAAAAAAAE#8AAAAAAAAAAAAAEAAAAAAAAAAAABeAAAAAIA#####wAFbWluaTEAAjEwAAAAAUAkAAAAAAAAAAAAAgD#####AAVtYXhpMQACNDAAAAABQEQAAAAAAAAAAAACAP####8ABHBhczEAATEAAAABP#AAAAAAAAD#####AAAAAgAMQ0NvbW1lbnRhaXJlAP####8BAAAAAMAxAAAAAAAAwC4AAAAAAAAAAAANEAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAUEAAAACAP####8ABW1pbmkyAAMtMzD#####AAAAAQAMQ01vaW5zVW5haXJlAAAAAUA+AAAAAAAAAAAAAgD#####AAVtYXhpMgACMzAAAAABQD4AAAAAAAAAAAACAP####8ABHBhczIAATEAAAABP#AAAAAAAAD#####AAAAAQAHQ01pbGlldQD#####AQAAAAEQAAJKMQAAAAAAAAAAAEAIAAAAAAAABQAAAAAgAAAAIv####8AAAABABFDU3ltZXRyaWVDZW50cmFsZQD#####AAAAQgAAABAA#####wEAAAABEAABSgAAAAAAAAAAAEAIAAAAAAAABQAAAAAeAAAAQwAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAA0AAABDAAAAHAD#####AQAAAAEQAAJJMQAAAAAAAAAAAEAIAAAAAAAABQAAAAAiAAAAHgAAAB0A#####wAAAEYAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAANAAAARwAAABAA#####wEAAAABEAABSQAAAAAAAAAAAEAIAAAAAAAABQAAAAAgAAAARwAAABkA#####wAAAA0AAAAiAAAAEAD#####AQAAAAEQAAFBAAAAAAAAAAAAQAgAAAAAAAAFAAAAAA0AAABKAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAIgAAAEoAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAeAAAASgAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAACAAAABK#####wAAAAEACUNQb2x5Z29uZQD#####AAAAAAABAAAABQAAACAAAABEAAAARQAAACIAAAAgAAAAHgD#####AAAAAAABAAAABQAAAB4AAAAiAAAASAAAAEkAAAAeAAAAHgD#####AAAAAAABAAAABQAAAEsAAABOAAAATAAAAE0AAABLAAAAHgD#####AAAAAAABAAAABQAAAA0AAAAgAAAAIgAAAB4AAAANAAAAFgD#####AP8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAgAAABgAAAAXAP####8A5ubmAAEAAAANAAAASQAAAEQAAAAAAAABAAAAAAAAAAAAAAABAAAAAAAAAAAAAAABP#AAAAAAAAAAAAABP#AAAAAAAAD#####AAAAAQARQ1BvaW50UGFyQWJzY2lzc2UA#####wEAAAAAEAABVQAAAAAAAAAAAEAIAAAAAAAABQAAAAANAAAASQAAAAcBAAAACAAAAAMAAAABP#AAAAAAAAAAAAAfAP####8BAAAAABAAAVYAAAAAAAAAAABACAAAAAAAAAUAAAAADQAAAEQAAAAHAQAAAAgAAAA3AAAAAT#wAAAAAAAA#####wAAAAEACENTZWdtZW50AP####8BAAAAABAAAAEAAQAAAA0AAABVAAAAIAD#####AQAAAAAQAAABAAEAAAANAAAAVgAAAA8A#####wEAAAAAEAACVTEAAAAAAAAAAABACAAAAAAAAAUAAT#TA9Z22dUpAAAAVwAAABkA#####wAAAA0AAABWAAAAEAD#####AQAAAAAQAAJWMQAAAAAAAAAAAEAIAAAAAAAABQAAAABZAAAAWgAAACAA#####wEAAAAAEAAAAQABAAAAWQAAAFsAAAAPAP####8BAAAAABAAAlUyAAAAAAAAAAAAQAgAAAAAAAAFAAE#1tGzvqNnfgAAAFwAAAAZAP####8AAAANAAAAXQAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAA0AAABeAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAIAAAAF4AAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAiAAAAXgAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAB4AAABeAAAAHgD#####AQAAAAABAAAABQAAAF8AAABgAAAAYQAAAGIAAABfAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAASAAAAF4AAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABJAAAAXgAAAB4A#####wEAAAAAAQAAAAUAAABiAAAAYQAAAGQAAABlAAAAYgAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAEQAAABeAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAARQAAAF4AAAAeAP####8BAAAAAAEAAAAFAAAAYAAAAGcAAABoAAAAYQAAAGAAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABLAAAAXgAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAE4AAABeAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAATAAAAF4AAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABNAAAAXgAAAB4A#####wEAAAAAAQAAAAUAAABqAAAAawAAAGwAAABtAAAAav####8AAAACAAhDTWVzdXJlWAD#####AAF4AAAAVAAAAF3#####AAAAAgAIQ01lc3VyZVkA#####wABeQAAAFQAAABdAAAAAgD#####AAJ4MQAMaW50KHgrMC4wMDEpAAAABgIAAAAHAAAAAAgAAABvAAAAAT9QYk3S8an8AAAAAgD#####AAJ5MQAMaW50KHkrMC4wMDEpAAAABgIAAAAHAAAAAAgAAABwAAAAAT9QYk3S8an8AAAAAgD#####AANudW0ADHgxKjIrbngqNCp5MQAAAAcAAAAABwIAAAAIAAAAcQAAAAFAAAAAAAAAAAAAAAcCAAAABwIAAAAIAAAAAwAAAAFAEAAAAAAAAAAAAAgAAAByAAAAHAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAXQAAAGH#####AAAAAQAPQ1ZhbGV1ckFmZmljaGVlAP####8BAAAAAMAmAAAAAAAAwCP#######AAAAB0EgAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAgAAAHMAAAACAP####8ABG51bTEABW51bSsxAAAABwAAAAAIAAAAcwAAAAE#8AAAAAAAAAAAAAIA#####wAEbnVtJwAIbnVtK254KjIAAAAHAAAAAAgAAABzAAAABwIAAAAIAAAAAwAAAAFAAAAAAAAAAAAAAAIA#####wAFbnVtJzEABm51bScrMQAAAAcAAAAACAAAAHcAAAABP#AAAAAAAAAAAAAcAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABgAAAAaAAAABwA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAGEAAABsAAAAHAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAYgAAAGQAAAAjAP####8BAAAAAMAmAAAAAAAAwCQAAAAAAAAAAAB7EgAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAgAAAHYAAAAjAP####8BAAAAAMAkAAAAAAAAwCQAAAAAAAAAAAB5EgAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAgAAAHcAAAAjAP####8BAAAAAMAiAAAAAAAAwCAAAAAAAAAAAAB6EgAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAgAAAHj#####AAAAAgASQ0xpZXVPYmpldFBhclB0TGllAP####8BAAAAAAAAYwAAAAgAAAA3AAAAXQAAAAcAAABdAAAAXgAAAF8AAABgAAAAYQAAAGIAAABjAAAAJAD#####AQAAAAAAAGkAAAAIAAAANwAAAF0AAAAHAAAAXQAAAF4AAABgAAAAYQAAAGcAAABoAAAAaQAAACQA#####wEAAAAAAABuAAAACAAAADcAAABdAAAABwAAAF0AAABeAAAAagAAAGsAAABsAAAAbQAAAG4AAAAkAP####8BAAAAAAAAZgAAAAgAAAA3AAAAXQAAAAcAAABdAAAAXgAAAGEAAABiAAAAZAAAAGUAAABmAAAAJAD#####AAAAAAAAAH8AAAAIAAAAAwAAAFkAAAALAAAAWQAAAFsAAABcAAAAXQAAAF4AAABfAAAAYAAAAGEAAABiAAAAYwAAAH8AAAAkAP####8AAAAAAAAAggAAAAgAAAADAAAAWQAAAAsAAABZAAAAWwAAAFwAAABdAAAAXgAAAGEAAABiAAAAZAAAAGUAAABmAAAAggAAACQA#####wAAAAAAAACBAAAACAAAAAMAAABZAAAACwAAAFkAAABbAAAAXAAAAF0AAABeAAAAagAAAGsAAABsAAAAbQAAAG4AAACBAAAAJAD#####AAAAAAAAAIAAAAAIAAAAAwAAAFkAAAALAAAAWQAAAFsAAABcAAAAXQAAAF4AAABgAAAAYQAAAGcAAABoAAAAaQAAAIAAAAAkAP####8BAAAAAAAAdQAAAAgAAAA3AAAAXQAAAAoAAABdAAAAXgAAAGEAAABvAAAAcAAAAHEAAAByAAAAcwAAAHQAAAB1AAAAJAD#####AAAAAAAAAIcAAAAIAAAAAwAAAFkAAAAOAAAAWQAAAFsAAABcAAAAXQAAAF4AAABhAAAAbwAAAHAAAABxAAAAcgAAAHMAAAB0AAAAdQAAAIcAAAAkAP####8BAAAAAAAAfAAAAAgAAAA3AAAAXQAAAAwAAABdAAAAXgAAAGIAAABkAAAAbwAAAHAAAABxAAAAcgAAAHMAAAB2AAAAewAAAHwAAAAkAP####8AAAAAAAAAiQAAAAgAAAADAAAAWQAAABAAAABZAAAAWwAAAFwAAABdAAAAXgAAAGIAAABkAAAAbwAAAHAAAABxAAAAcgAAAHMAAAB2AAAAewAAAHwAAACJAAAAJAD#####AQAAAAAAAH4AAAAIAAAANwAAAF0AAAANAAAAXQAAAF4AAABhAAAAbAAAAG8AAABwAAAAcQAAAHIAAABzAAAAdwAAAHgAAAB6AAAAfgAAACQA#####wAAAAAAAACLAAAACAAAAAMAAABZAAAAEQAAAFkAAABbAAAAXAAAAF0AAABeAAAAYQAAAGwAAABvAAAAcAAAAHEAAAByAAAAcwAAAHcAAAB4AAAAegAAAH4AAACLAAAAJAD#####AQAAAAAAAH0AAAAIAAAANwAAAF0AAAAMAAAAXQAAAF4AAABgAAAAaAAAAG8AAABwAAAAcQAAAHIAAABzAAAAdwAAAHkAAAB9AAAAJAD#####AAAAAAAAAI0AAAAIAAAAAwAAAFkAAAAQAAAAWQAAAFsAAABcAAAAXQAAAF4AAABgAAAAaAAAAG8AAABwAAAAcQAAAHIAAABzAAAAdwAAAHkAAAB9AAAAjf####8AAAABABRDSW1wbGVtZW50YXRpb25Qcm90bwD#####AClBZmZpY2hhZ2UgZCfDqXF1YXRpb24gZGUgZHJvaXRlIG91IGNlcmNsZQAAAAIAAAABAAAAAgAAABwAAABJAAAAIQAAAACPAAJ4MgAAABwAAABJAAAAIgAAAACPAAJ5MgAAABwAAABJAAAAGgEAAACPAf8AAABAHAAAAAAAAAAAAAAAAAAAAAAASRAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAABcoI1ZhbCh4MiwxKSwjVmFsKHkyLDIpKQAAACUA#####wApQWZmaWNoYWdlIGQnw6lxdWF0aW9uIGRlIGRyb2l0ZSBvdSBjZXJjbGUAAAACAAAAAQAAAAIAAAAcAAAARAAAACEAAAAAkwACeDIAAAAcAAAARAAAACIAAAAAkwACeTIAAAAcAAAARAAAABoBAAAAkwH#AAAAQBwAAAAAAADANQAAAAAAAAAAAEQQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAXKCNWYWwoeDIsMSksI1ZhbCh5MiwyKSkAAAAlAP####8AKUFmZmljaGFnZSBkJ8OpcXVhdGlvbiBkZSBkcm9pdGUgb3UgY2VyY2xlAAAAAgAAAAEAAAACAAAAHAAAACAAAAAhAAAAAJcAAngyAAAAHAAAACAAAAAiAAAAAJcAAnkyAAAAHAAAACAAAAAaAQAAAJcB#wAAAL#wAAAAAAAAQAAAAAAAAAAAAAAgEAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAFygjVmFsKHgyLDEpLCNWYWwoeTIsMikpAAAAJQD#####AClBZmZpY2hhZ2UgZCfDqXF1YXRpb24gZGUgZHJvaXRlIG91IGNlcmNsZQAAAAIAAAABAAAAAgAAABwAAAAeAAAAIQAAAACbAAJ4MgAAABwAAAAeAAAAIgAAAACbAAJ5MgAAABwAAAAeAAAAGgEAAACbAf8AAAC#8AAAAAAAAD#########gAAAAHhAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAABcoI1ZhbCh4MiwxKSwjVmFsKHkyLDIpKQAAACUA#####wApQWZmaWNoYWdlIGQnw6lxdWF0aW9uIGRlIGRyb2l0ZSBvdSBjZXJjbGUAAAACAAAAAQAAAAIAAAAcAAAAIgAAACEAAAAAnwACeDIAAAAcAAAAIgAAACIAAAAAnwACeTIAAAAcAAAAIgAAABoBAAAAnwH#AAAAQBgAAAAAAADANQAAAAAAAAAAACIQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAXKCNWYWwoeDIsMSksI1ZhbCh5MiwyKSkAAAAQAP####8B#wAAARAAAkExAMA3AAAAAAAAv#AAAAAAAAAFAAAAACIAAABKAAAAJQD#####AClBZmZpY2hhZ2UgZCfDqXF1YXRpb24gZGUgZHJvaXRlIG91IGNlcmNsZQAAAAIAAAABAAAAAgAAABwAAACjAAAAIQAAAACkAAJ4MgAAABwAAACjAAAAIgAAAACkAAJ5MgAAABwAAACjAAAAGgEAAACkAf8AAABAEAAAAAAAAMAzAAAAAAAAAAAAoxAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAABcoI1ZhbCh4MiwxKSwjVmFsKHkyLDIpKQAAAAIA#####wACeGIAAjI0AAAAAUA4AAAAAAAAAAAAAgD#####AAJ5YgACMTYAAAABQDAAAAAAAAAAAAACAP####8ABG51bWIAAjEwAAAAAUAkAAAAAAAAAAAAAgD#####AARudW1jAAIzMwAAAAFAQIAAAAAAAAAAAAIA#####wADeGMyAAEzAAAAAUAIAAAAAAAAAAAAAgD#####AAN5YzIAATUAAAABQBQAAAAAAAAAAAACAP####8AA3hjMwABNgAAAAFAGAAAAAAAAAAAAAIA#####wADeWMzAAE3AAAAAUAcAAAAAAAAAAAAGAD#####AQAAAAAQAAFiAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAAqAAAAAgAAACpAAAAGAD#####AH8AAAAQAAJjMgAAAAAAAAAAAEAIAAAAAAAACQAAAAAcAAAACAAAAKwAAAAIAAAArQAAABgA#####wAAAH8AEAACYzMAAAAAAAAAAABACAAAAAAAAAkAAAAAHAAAAAgAAACuAAAACAAAAK8AAAAeAP####8AAAAAAAEAAAAFAAAALgAAAC8AAAAwAAAAMQAAAC4AAAAeAP####8ALLgsAAEAAAAFAAAAMwAAADQAAAA1AAAANgAAADP#####AAAAAQAQQ1N1cmZhY2VQb2x5Z29uZQD#####AAB#AAAAAAUAAAC0AAAAHQD#####AAAALAAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAADMAAAC2AAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAANAAAALYAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAA1AAAAtgAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAADYAAAC2AAAAHgD#####ASy4LAABAAAABQAAALcAAAC4AAAAuQAAALoAAAC3AAAAJgD#####AQB#AAAAAAUAAAC7AAAADgD#####AAAADQAAAAcDAAAAAT#wAAAAAAAAAAAACgAAADkAAAAIAAAAqgAAABAA#####wEA#wAAEAAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAACAAAAC9AAAAEAD#####AQD#AAAQAAAAAAAAAAAAAABACAAAAAAAAAkAAAAARAAAAL0AAAAQAP####8BAP8AABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAABFAAAAvQAAABAA#####wEA#wAAEAAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAACIAAAC9AAAAHgD#####AAAAAAABAAAABQAAAL4AAAC#AAAAwAAAAMEAAAC+AAAAGQD#####AAAADQAAALAAAAAQAP####8BAP8AABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAAC+AAAAwwAAABAA#####wEA#wAAEAAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAAL8AAADDAAAAEAD#####AQD#AAAQAAAAAAAAAAAAAABACAAAAAAAAAkAAAAAwAAAAMMAAAAQAP####8BAP8AABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAADBAAAAwwAAAB4A#####wD#AAAAAQAAAAUAAADEAAAAxQAAAMYAAADHAAAAxAAAACYA#####wD#AAAAAAAFAAAAyAAAAB0A#####wAAALEAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAADEAAAAygAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAAMUAAADKAAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAkAAAAAxgAAAMoAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAADHAAAAygAAAB4A#####wH#AAAAAQAAAAUAAADLAAAAzAAAAM0AAADOAAAAywAAACYA#####wH#AAAAAAAFAAAAzwAAABkA#####wAAAA0AAAArAAAAHQD#####AAAAsv####8AAAABABJDTWFjcm9DbGlnbm90ZW1lbnQA#####wAA#wAB#####wpAi8QAAAAAAEBSoUeuFHriAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAJQ2xpZ25vdGUxAAAAAAACAAAAuwAAALwAAAAU#####wAAAAEAC0NNYWNyb1BhdXNlAP####8AAAAAAf####8QQI70AAAAAABAQcKPXCj1wwIAAAAAAAAAAAAAAAABAAAAAAAAAAAABVBhdXNlAAAAAAAC#####wAAAAEAEkNBcmNEZUNlcmNsZURpcmVjdAD#####AQD#AAABAAAALAAAACv#####AAAAAUBmgAAAAAAAAAAAKQD#####AQAAAAABAAAAsQAAAMX#####AAAAAUBmgAAAAAAA#####wAAAAEAD0NQb2ludExpZUNlcmNsZQD#####Af8AAAEQAAAAAAAAAAAAAABACAAAAAAAAAUAAT9Q#XA667psAAAA1gAAACUA#####wAXTWVzdXJlIGQnYW5nbGUgb3JpZW50w6kAAAACAAAAAwAAAAMAAADFAAAAsQAAANf#####AAAAAQAMQ0Jpc3NlY3RyaWNlAAAAANgBAAAAABAAAAEAAQAAANcAAACxAAAAxQAAAA8AAAAA2AEAAAAAEAAAAAAAAAAAAAAAP+MzMzMzMzMFAAFAaT5Clg7dyQAAANn#####AAAAAgATQ01lc3VyZUFuZ2xlT3JpZW50ZQEAAADYAAZhbmdsZTIAAADFAAAAsQAAANcAAAAjAQAAANgBAAAAAEAIAAAAAAAAP#AAAAAAAAAAAADaDwAAAAAAAQAAAAEAAAABAAAAAAAAAAAAAAACwrAAAAAA2#####8AAAACABNDTWFycXVlQW5nbGVPcmllbnRlAQAAANgBAAAAAAEAAAABQEJbiQkrj78AAADFAAAAsQAAANcAAAAADQD#####AAAAsQAAAAgAAADbAAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAxAAAAN4AAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAADFAAAA3gAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAMYAAADeAAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAxwAAAN4AAAAeAP####8B#wAAAAEAAAAFAAAA3wAAAOAAAADhAAAA4gAAAN8AAAAmAP####8B#wAAAAAABQAAAOP#####AAAAAQAQQ01hY3JvQXBwYXJpdGlvbgD#####AP8AAAH#####CkCMxAAAAAAAQHsoUeuFHrgCAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAtBcHBhcml0aW9uMgAAAAAABgAAAM8AAADQAAAA4wAAAOQAAADXAAAA4AD#####AAAAAQARQ01hY3JvRGlzcGFyaXRpb24A#####wD#AAAB#####wpAjPQAAAAAAEB9aFHrhR64AgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAHbWFzcXVlMgAAAAAABgAAAM8AAADQAAAA4wAAAOQAAADXAAAA4AAAACcA#####wD#AAAB#####wpAjQwAAAAAAEB#eFHrhR64AgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAJQ2xpZ25vdGUyAAAAAAACAAAAzwAAANAAAAAU#####wAAAAIAGENNYWNyb0FuaW1hdGlvbkF2ZWNUcmFjZQD#####AP8AAAH#####CkCNXAAAAAAAQIC8KPXCj1wCAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAd0b3VybmUyAAAAAAABAAAA1wABAAAAABQAAABkAAAAUAAAANcBAP####8AAAABABFDTWFjcm9TdWl0ZU1hY3JvcwD#####AP8AAAH#####CkBbIAAAAAAAQDOFHrhR64ACAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAxDb3JyZWN0aW9uIGIAAAAAAAUAAADnAAAA1AAAAOUAAADoAAAA5gAAAA4A#####wAAAA0AAAAHAwAAAAE#8AAAAAAAAAAAAAoAAAA4AAAACAAAAKsAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABLAAAA6gAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAE4AAADqAAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAATAAAAOoAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABNAAAA6gAAAB4A#####wH#AAAAAQAAAAUAAADrAAAA7AAAAO0AAADuAAAA6wAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAOsAAADRAAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAA7AAAANEAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAADtAAAA0QAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAO4AAADRAAAAHgD#####AAAAfwABAAAABQAAAPAAAADxAAAA8gAAAPMAAADwAAAAJgD#####AAAAfwAAAAUAAAD0AAAAKQD#####Af##AAABAAAAsgAAAPD#####AAAAAUBmgAAAAAAAAAAAKgD#####AQAAfwEQAAAAAAAAAAAAAABACAAAAAAAAAUAAT8pd5Uhq1lCAAAA9gAAACUA#####wAXTWVzdXJlIGQnYW5nbGUgb3JpZW50w6kAAAACAAAAAwAAAAMAAADwAAAAsgAAAPcAAAArAAAAAPgBAAAAABAAAAEAAQAAAPcAAACyAAAA8AAAAA8AAAAA+AEAAAAAEAAAAAAAAAAAAAAAP+MzMzMzMzMFAAFAaT5Clg7dyQAAAPkAAAAsAQAAAPgABmFuZ2xlMwAAAPAAAACyAAAA9wAAACMBAAAA+AH##wAAQAgAAAAAAAA#8AAAAAAAAAAAAPoPAAAAAAABAAAAAQAAAAEAAAAAAAAAAAAAAALCsAAAAAD7AAAALQEAAAD4Af##AAABAAAAAUBCW4kJK4+#AAAA8AAAALIAAAD3AAAAABAA#####wH##wAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAPAAAADSAAAAEAD#####Af##AAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAA8QAAANIAAAAQAP####8B##8AABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAADyAAAA0gAAABAA#####wH##wAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAPMAAADSAAAAHgD#####AQAAfwABAAAABQAAAP4AAAD#AAABAAAAAQEAAAD+AAAAJgD#####AQAAfwAAAAUAAAECAAAADQD#####AAAAsgAAAAgAAAD7AAAAEAD#####Af##AAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAA8AAAAQQAAAAQAP####8B##8AABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAADxAAABBAAAABAA#####wH##wAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAPIAAAEEAAAAEAD#####Af##AAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAA8wAAAQQAAAAeAP####8BAAB#AAEAAAAFAAABBQAAAQYAAAEHAAABCAAAAQUAAAAmAP####8BAAB#AAAABQAAAQkAAAAuAP####8AAAB#Af####8KQIy0AAAAAABAZDCj1wo9cQIAAAAAAAAAAAAAAAABAAAAAAAAAAAAC0FwcGFyaXRpb24zAAAAAAAFAAABAgAAAQMAAAEJAAABCgAAAPcAAAAALwD#####AAAAfwH#####CkCM1AAAAAAAQGhQo9cKPXECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAdtYXNxdWUzAAAAAAAFAAABAgAAAQMAAAEJAAABCgAAAPcAAAAnAP####8AAAB#Af####8KQIzsAAAAAABAa9Cj1wo9cQIAAAAAAAAAAAAAAAABAAAAAAAAAAAACUNsaWdub3RlMwAAAAAAAgAAAQIAAAEDAAAAFAAAADAA#####wAAAH8B#####wpAjSwAAAAAAEBvsKPXCj1xAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAHdG91cm5lMwAAAAAAAQAAAPcAAQAAAAAUAAAAZAAAAFAAAAD3AQAAAAAxAP####8AAAB#Af####8KQGbwAAAAAABAM4UeuFHriAIAAAAAAAAAAAAAAAABAAAAAAAAAAAADENvcnJlY3Rpb24gYwAAAAAABQAAAQ0AAADUAAABCwAAAQ4AAAEMAAAAKQD#####AQAAfwABAAAALAAAACr#####AAAAAUBmgAAAAAAAAAAAKgD#####AQB#AAEQAAAAAAAAAAAAAABACAAAAAAAAAUAAT9vMNoie5k2AAABEAAAACUA#####wAXTWVzdXJlIGQnYW5nbGUgb3JpZW50w6kAAAACAAAAAwAAAAMAAAAqAAAALAAAAREAAAArAAAAARIBAAAAABAAAAEAAQAAAREAAAAsAAAAKgAAAA8AAAABEgEAAAAAEAAAAAAAAAAAAAAAP+MzMzMzMzMFAAFAaT5Clg7dyQAAARMAAAAsAQAAARIABmFuZ2xlMQAAACoAAAAsAAABEQAAACMBAAABEgEAAH8AQAgAAAAAAAA#8AAAAAAAAAAAARQPAAAAAAABAAAAAQAAAAEAAAAAAAAAAAAAAALCsAAAAAEVAAAALQEAAAESAQAAfwABAAAAAUBCW4kJK4+#AAAAKgAAACwAAAERAAAAAA0A#####wAAACwAAAAIAAABFQAAABAA#####wEAAH8AEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAADMAAAEYAAAAEAD#####AQAAfwAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAANAAAARgAAAAQAP####8BAAB#ABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAA1AAABGAAAABAA#####wEAAH8AEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAADYAAAEYAAAAHgD#####AQB#AAABAAAABQAAARkAAAEaAAABGwAAARwAAAEZAAAAJgD#####AQB#AAAAAAUAAAEdAAAALgD#####AAB#AAH#####EECKFAAAAAAAQEFCj1wo9cMCAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAtBcHBhcml0aW9uMQAAAAAABQAAALsAAAC8AAABHQAAAR4AAAERAAAAAC8A#####wAAfwAB#####wpAikwAAAAAAEBZ4UeuFHriAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAHbWFzcXVlMQAAAAAABQAAALsAAAC8AAABHQAAAR4AAAERAAAAMAD#####AAB#AAH#####CkCKdAAAAAAAQF#hR64UeuICAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAd0b3VybmUxAAAAAAABAAABEQABAAAAABQAAABkAAAAUAAAAREBAAAAADEA#####wAAfwAB#####wpAQEAAAAAAAEAzhR64UeuIAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAMQ29ycmVjdGlvbiBhAAAAAAAFAAAA0wAAANQAAAEfAAABIQAAASAAAAAxAP####8AAH8AAf####8KQI9MAAAAAABAcFhR64UeuAIAAAAAAAAAAAAAAAABAAAAAAAAAAAACkNvcnJlY3Rpb24AAAAAAAMAAAEiAAAA6QAAAQ################8="
			// Première question : une figure dans tabfigA, une symétrie par rapport au milieu d'un [B'C'], logiquement : l'image est dans tabfigB et B' est l'image de C !
			indexA = randint(0, nx * ny - 1)
			numA = tabfigA[indexA][2]
			indexcentre1 = randint(0, nx * ny - 1, [indexA]) // indexcentre1 est l'index du bloc de 4 figures A,B,C et D, il sert dans les 4 tableaux.
			numcentre1 = tabfigA[indexcentre1][2] // [B'C'] est le segment commun à une figA et à une FigB. ici on prend le N° de la figure A, la figure B est la suivante.
			//on calcule les coordonnées du milieu de [BC] on ajoute aux coordonnées du milieu de [BC] celles du vecteur BB'. (j'aurais pu réduire mais cela aurait rendu le calcul plus opaque)
			xmil1 = (xB + xC) / 2 + tabfigB[indexcentre1][0] - xB
			ymil1 = (yB + yC) / 2 + tabfigB[indexcentre1][1] - yB
			point = image_point_par_transformation(7, [tabfigC[indexA][0], tabfigC[indexA][1]], [xmil1, ymil1])
			trouver = false
			while (trouver == false) {
				for (let j = 0; j < nx * ny; j++) {
					if (point[0] == tabfigB[j][0] && point[1] == tabfigB[j][1]) {
						trouver = true
						num1=tabfigB[j][2]
						xa=tabfigA[indexA][0]
						ya=tabfigA[indexA][1]
						break
					}
				}
				if (trouver == false) {
					indexA = randint(0, nx * ny - 1)
					numA = tabfigA[indexA][2]
					indexcentre1 = randint(0, nx * ny - 1)
					numcentre1 = tabfigA[indexcentre1][2]
					xmil1 = (xB + xC) / 2 + tabfigB[indexcentre1][0] - xB
					ymil1 = (yB + yC) / 2 + tabfigB[indexcentre1][1] - yB
					point = image_point_par_transformation(7, [tabfigC[indexA][0], tabfigC[indexA][1]], [xmil1, ymil1])
				}
			}
			texte += num_alpha(0) + texte_en_couleur_et_gras(` Quel est le numéro de la figure symétrique de la figure ${numA} dans la symétrie par rapport à ${s0} ?<br>`, `green`)
			texte_corr = num_alpha(0) + texte_en_couleur_et_gras(` La figure symétrique de la figure ${numA} dans la symétrie par rapport à ${s0} porte le numéro ${num1}.<br>`, `green`)
			// Deuxième question : une figure dans tabfigD, une symétrie par rapport au milieu d'un [C'D'], le résultat est une figure dans tabfigA et C' est l'image de D !
			indexD = randint(0, nx * ny - 1)
			numD = tabfigD[indexD][2]
			indexcentre2 = randint(0, nx * ny - 1, [indexD]) // indexcentre2 est l'index du bloc de 4 figures A,B,C et D, il sert dans les 4 tableaux.
			numcentre2 = tabfigA[indexcentre2][2] // [D'C'] est le segment commun à une figA et à une FigD. ici on prend le N° de la figure A, la figure D est 2*nx+N°figA.
			//on calcule les coordonnées du milieu de [DC] on ajoute aux coordonnées du milieu de [DC] celles du vecteur DD'.
			xmil2 = (xD + xC) / 2 + tabfigD[indexcentre2][0] - xD
			ymil2 = (yD + yC) / 2 + tabfigD[indexcentre2][1] - yD
			point = image_point_par_transformation(7, [tabfigD[indexD][0], tabfigD[indexD][1]], [xmil2, ymil2])
			trouver = false
			while (trouver == false) {
				for (let j = 0; j < nx * ny; j++) {
					if (point[0] == tabfigC[j][0] && point[1] == tabfigC[j][1]) {
						trouver = true
						num2=tabfigC[j][2]
						xb=tabfigA[indexD][0]
						yb=tabfigA[indexD][1]
						break
					}
				}
				if (trouver == false) {
					indexD = randint(0, nx * ny - 1)
					numD = tabfigD[indexD][2]
					indexcentre2 = randint(0, nx * ny - 1, [indexD])
					numcentre2 = tabfigA[indexcentre2][2]
					xmil2 = (xD + xC) / 2 + tabfigD[indexcentre2][0] - xD
					ymil2 = (yD + yC) / 2 + tabfigD[indexcentre2][1] - yD
					point = image_point_par_transformation(7, [tabfigD[indexD][0], tabfigD[indexD][1]], [xmil2, ymil2])
				}
			}

			texte += num_alpha(1) + texte_en_couleur_et_gras(` Quel est le numéro de la figure symétrique de la figure ${numD} dans la symétrie par rapport à ${s1} ?<br>`, `red`)
			texte_corr += num_alpha(1) + texte_en_couleur_et_gras(` La figure symétrique de la figure ${numD} dans la symétrie par rapport à ${s1} porte le numéro ${num2}.<br>`, `red`)
			// troisième question : une figure dans tabfigC, une symétrie par rapport au symétrique du milieu de [A'D'] par rapport au milieu de [C'D']... pas très clair
			// le résultat est une figure dans tabfigD et le point (C'+ vecteur AC) a pour image D' !
			indexC = randint(0, nx * ny - 1)
			numC = tabfigC[indexC][2]
			indexcentre3 = randint(0, nx * ny - 1, [indexC]) // indexcentre2 est l'index du bloc de 4 figures A,B,C et D, il sert dans les 4 tableaux.
			numcentre3 = tabfigD[indexcentre3][2] // le centre de symétrie est le milieu du segment commun à une figC et à une FigD. ici on prend le N° de la figure D, la figure C est la suivante.
			//on calcule les coordonnées du milieu du centre de symétrie : (C' + D + AC)/2=AC+AD/2 que l'on translate de CC' donc ça fait AC' + AD/2
			xmil3 = xD / 2 + tabfigC[indexcentre3][0]
			ymil3 = yD / 2 + tabfigC[indexcentre3][1]
			point = image_point_par_transformation(7, [tabfigC[indexC][0] + xC, tabfigC[indexC][1] + yC], [xmil3, ymil3]) // c'est le sommet C + AC qui a pour image D.
			trouver = false
			while (trouver == false) {
				for (let j = 0; j < nx * ny; j++) {
					if (point[0] == tabfigD[j][0] && point[1] == tabfigD[j][1]) {
						trouver = true
						num3=tabfigD[j][2]
						xc=tabfigA[indexC][0]
						yc=tabfigA[indexC][1]
						break
					}
				}
				if (trouver == false) {
					indexC = randint(0, nx * ny - 1)
					numC = tabfigC[indexC][2]
					indexcentre3 = randint(0, nx * ny - 1, [indexC])
					numcentre3 = tabfigD[indexcentre3][2]
					xmil3 = xD / 2 + tabfigC[indexcentre3][0]
					ymil3 = yD / 2 + tabfigC[indexcentre3][1]
					point = image_point_par_transformation(7, [tabfigC[indexC][0] + xC, tabfigC[indexC][1] + yC], [xmil3, ymil3])
				}
			}
			texte += num_alpha(2) + texte_en_couleur_et_gras(` Quel est le numéro de la figure symétrique de la figure ${numC} dans la symétrie par rapport à ${s2} ?<br>`, `blue`)
			texte_corr += num_alpha(2) + texte_en_couleur_et_gras(` La figure symétrique de la figure ${numC} dans la symétrie par rapport à ${s2} porte le numéro ${num3}.<br>`, `blue`)
/*			xa = tabfigC[indexA][0] - xC // On calcule les coordonnées des points de référence des figures à transformer.
			ya = tabfigC[indexA][1] - yC
			xb = tabfigD[indexD][0] - xD
			yb = tabfigD[indexD][1] - yD
			xc = tabfigC[indexC][0] - xC
			yc = tabfigC[indexC][1] - yC
*/			break

		case 3 : //translations
			let iB1,iB2,iB3,iC1,iA1,iD1
			this.MG32codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+0euFAAJmcv###wEA#wEAAAAAAAAAAAUcAAAC0gAAAQEAAAAAAAAAAQAAAMj#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAHQ0NhbGN1bAD#####AAVBbmdsZQABMAAAAAEAAAAAAAAAAAAAAAIA#####wAEWm9vbQACMzAAAAABQD4AAAAAAAAAAAACAP####8AAm54AAE1AAAAAUAUAAAAAAAA#####wAAAAEABUNGb25jAP####8AB21vZHVsb3gACG1vZCh4LDIp#####wAAAAEADUNGb25jdGlvbjJWYXIG#####wAAAAIAEUNWYXJpYWJsZUZvcm1lbGxlAAAAAAAAAAFAAAAAAAAAAAABeAAAAAMA#####wAHbW9kdWxveQASbW9kKGludCh5L254LzIpLDIpAAAABAb#####AAAAAgAJQ0ZvbmN0aW9uAv####8AAAABAApDT3BlcmF0aW9uAwAAAAcDAAAABQAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAAwAAAAFAAAAAAAAAAAAAAAFAAAAAAAAAAAABeQAAAAMA#####wACcjAAJXNpKChtb2R1bG94KHgpPTApKihtb2R1bG95KHgpPTApLDEsMCn#####AAAAAQANQ0ZvbmN0aW9uM1ZhcgAAAAAHAgAAAAcI#####wAAAAEADkNBcHBlbEZvbmN0aW9uAAAABAAAAAUAAAAAAAAAAQAAAAAAAAAAAAAABwgAAAAKAAAABQAAAAUAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAQAAAAAAAAAAAAF4AAAAAgD#####AAJ5RAABNgAAAAFAGAAAAAAAAAAAAAIA#####wACeEQAATAAAAABAAAAAAAAAAAAAAACAP####8AAnlDAAE0AAAAAUAQAAAAAAAAAAAAAgD#####AAJ4QwABNgAAAAFAGAAAAAAAAAAAAAIA#####wACeUIAATAAAAABAAAAAAAAAAAAAAACAP####8AAnhCAAE0AAAAAUAQAAAAAAAA#####wAAAAEACkNQb2ludEJhc2UA#####wAAAAAAEAABTwDAMgAAAAAAAMAzAAAAAAAABQABQFKgAAAAAABAYLCj1wo9cf####8AAAABABRDRHJvaXRlRGlyZWN0aW9uRml4ZQD#####Af8AAAEQAAABAAIAAAANAD#3Cj1wo9cK#####wAAAAEACUNSb3RhdGlvbgD#####AAAADQAAAAFAVoAAAAAAAP####8AAAABAAtDSG9tb3RoZXRpZQD#####AAAADQAAAAcDAAAAAT#wAAAAAAAAAAAACAAAAAL#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQABQGeAAAAAAAAAAAAOAAAADQD#####AAAADQAAAAgAAAAB#####wAAAAEAC0NQb2ludEltYWdlAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAARAAAAEv####8AAAABAA5DUG9pbnRMaWVQb2ludAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAE#####8AAAABAAlDQ2VyY2xlT0EA#####wH#AAAAAgAAAA0AAAAU#####wAAAAEADUNEZW1pRHJvaXRlT0EA#####wH#AAAADQAAAQACAAAADQAAABT#####AAAAAQAQQ0RlbWlEcm9pdGVJbWFnZQD#####Af8AAAANAAABAAIAAAAWAAAAD#####8AAAABABBDSW50RHJvaXRlQ2VyY2xlAP####8AAAAXAAAAFf####8AAAABABBDUG9pbnRMaWVCaXBvaW50AP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQABAAAAGAAAABAA#####wH#AAAAEAACSicAAAAAAAAAAABACAAAAAAAAAUAAAAAFAAAABAAAAAQAP####8B#wAAABAAAkknAAAAAAAAAAAAQAgAAAAAAAAFAAAAABkAAAAQ#####wAAAAIAB0NSZXBlcmUA#####wDm5uYBAQAAAA0AAAAbAAAAGgAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAE#8AAAAAAAAAAAAAE#8AAAAAAAAP####8AAAABABBDUG9pbnREYW5zUmVwZXJlAP####8B#wAAARAAAkInAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAADAAAAAgAAAALAAAAEQD#####AQAAAAAQAAFCAEAAAAAAAAAAwDcAAAAAAAAFAAAAAB0AAAAYAP####8B#wAAARAAAkQnAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAACAAAAAgAAAAHAAAAEQD#####AQAAAAAQAAFEAMAxAAAAAAAAwCoAAAAAAAAFAAAAAB8AAAAYAP####8B#wAAARAAAkMnAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAACgAAAAgAAAAJAAAAEQD#####AQAAAAAQAAFDAEAIAAAAAAAAv#AAAAAAAAAFAAAAACEAAAACAP####8AAnhhAAIxMgAAAAFAKAAAAAAAAAAAAAIA#####wACeWEAATgAAAABQCAAAAAAAAAAAAACAP####8ABG51bWEAATAAAAABAAAAAAAAAAAAAAACAP####8AAnhjAAIxOAAAAAFAMgAAAAAAAAAAAAIA#####wACeWMAAjEyAAAAAUAoAAAAAAAAAAAAGAD#####AQAAAAAQAAFhAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAAIwAAAAgAAAAkAAAAGAD#####AQAAAAAQAAFjAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAAJgAAAAgAAAAnAAAADgD#####AAAADQAAAAcDAAAAAT#wAAAAAAAAAAAACgAAAAYAAAAIAAAAJQAAABAA#####wAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAA0AAAAqAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAIAAAACoAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAiAAAAKgAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAB4AAAAq#####wAAAAEADENUcmFuc2xhdGlvbgD#####AAAADQAAACgAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAArAAAALwAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAACwAAAAvAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAALQAAAC8AAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAuAAAALwAAAAIA#####wACbnkAATUAAAABQBQAAAAAAAAAAAADAP####8AAnIzACVzaSgobW9kdWxveCh4KT0xKSoobW9kdWxveSh4KT0xKSwxLDApAAAACQAAAAAHAgAAAAcIAAAACgAAAAQAAAAFAAAAAAAAAAE#8AAAAAAAAAAAAAcIAAAACgAAAAUAAAAFAAAAAAAAAAE#8AAAAAAAAAAAAAE#8AAAAAAAAAAAAAEAAAAAAAAAAAABeAAAAAMA#####wACcjIAJXNpKChtb2R1bG94KHgpPTApKihtb2R1bG95KHgpPTEpLDEsMCkAAAAJAAAAAAcCAAAABwgAAAAKAAAABAAAAAUAAAAAAAAAAQAAAAAAAAAAAAAABwgAAAAKAAAABQAAAAUAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAAAAAAAQAAAAAAAAAAAAF4AAAAAwD#####AAJyMQAlc2koKG1vZHVsb3goeCk9MSkqKG1vZHVsb3koeCk9MCksMSwwKQAAAAkAAAAABwIAAAAHCAAAAAoAAAAEAAAABQAAAAAAAAABP#AAAAAAAAAAAAAHCAAAAAoAAAAFAAAABQAAAAAAAAABAAAAAAAAAAAAAAABP#AAAAAAAAAAAAABAAAAAAAAAAAAAXgAAAACAP####8ABW1pbmkxAAIxMAAAAAFAJAAAAAAAAAAAAAIA#####wAFbWF4aTEAAjQwAAAAAUBEAAAAAAAAAAAAAgD#####AARwYXMxAAExAAAAAT#wAAAAAAAA#####wAAAAIADENDb21tZW50YWlyZQD#####AQAAAADAMQAAAAAAAMAuAAAAAAAAAAAADRAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAFBAAAAAgD#####AAVtaW5pMgADLTMw#####wAAAAEADENNb2luc1VuYWlyZQAAAAFAPgAAAAAAAAAAAAIA#####wAFbWF4aTIAAjMwAAAAAUA+AAAAAAAAAAAAAgD#####AARwYXMyAAExAAAAAT#wAAAAAAAA#####wAAAAEAB0NNaWxpZXUA#####wEAAAABEAACSjEAAAAAAAAAAABACAAAAAAAAAUAAAAAIAAAACL#####AAAAAQARQ1N5bWV0cmllQ2VudHJhbGUA#####wAAAD8AAAAQAP####8BAAAAARAAAUoAAAAAAAAAAABACAAAAAAAAAUAAAAAHgAAAEAAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAANAAAAQAAAABwA#####wEAAAABEAACSTEAAAAAAAAAAABACAAAAAAAAAUAAAAAIgAAAB4AAAAdAP####8AAABDAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAADQAAAEQAAAAQAP####8BAAAAARAAAUkAAAAAAAAAAABACAAAAAAAAAUAAAAAIAAAAEQAAAAZAP####8AAAANAAAAIgAAABAA#####wEAAAABEAABQQAAAAAAAAAAAEAIAAAAAAAABQAAAAANAAAARwAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAACIAAABHAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAHgAAAEcAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAgAAAAR#####8AAAABAAlDUG9seWdvbmUA#####wAAAAAAAQAAAAUAAAAgAAAAQQAAAEIAAAAiAAAAIAAAAB4A#####wAAAAAAAQAAAAUAAAAeAAAAIgAAAEUAAABGAAAAHgAAAB4A#####wAAAAAAAQAAAAUAAABIAAAASwAAAEkAAABKAAAASAAAAB4A#####wAAAAAAAQAAAAUAAAANAAAAIAAAACIAAAAeAAAADQAAABYA#####wD#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAIAAAAYAAAAFwD#####AObm5gABAAAADQAAAEYAAABBAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEAEUNQb2ludFBhckFic2Npc3NlAP####8BAAAAABAAAVUAAAAAAAAAAABACAAAAAAAAAUAAAAADQAAAEYAAAAHAQAAAAgAAAADAAAAAT#wAAAAAAAAAAAAHwD#####AQAAAAAQAAFWAAAAAAAAAAAAQAgAAAAAAAAFAAAAAA0AAABBAAAABwEAAAAIAAAANAAAAAE#8AAAAAAAAP####8AAAABAAhDU2VnbWVudAD#####AQAAAAAQAAABAAEAAAANAAAAUgAAACAA#####wEAAAAAEAAAAQABAAAADQAAAFMAAAAPAP####8BAAAAABAAAlUxAAAAAAAAAAAAQAgAAAAAAAAFAAE#0wPWdtnVKQAAAFQAAAAZAP####8AAAANAAAAUwAAABAA#####wEAAAAAEAACVjEAAAAAAAAAAABACAAAAAAAAAUAAAAAVgAAAFcAAAAgAP####8BAAAAABAAAAEAAQAAAFYAAABYAAAADwD#####AQAAAAAQAAJVMgAAAAAAAAAAAEAIAAAAAAAABQABP9bRs76jZ34AAABZAAAAGQD#####AAAADQAAAFoAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAANAAAAWwAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAACAAAABbAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAIgAAAFsAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAeAAAAWwAAAB4A#####wEAAAAAAQAAAAUAAABcAAAAXQAAAF4AAABfAAAAXAAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAEUAAABbAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAARgAAAFsAAAAeAP####8BAAAAAAEAAAAFAAAAXwAAAF4AAABhAAAAYgAAAF8AAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABBAAAAWwAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAEIAAABbAAAAHgD#####AQAAAAABAAAABQAAAF0AAABkAAAAZQAAAF4AAABdAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAASAAAAFsAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABLAAAAWwAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAEkAAABbAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAASgAAAFsAAAAeAP####8BAAAAAAEAAAAFAAAAZwAAAGgAAABpAAAAagAAAGf#####AAAAAgAIQ01lc3VyZVgA#####wABeAAAAFEAAABa#####wAAAAIACENNZXN1cmVZAP####8AAXkAAABRAAAAWgAAAAIA#####wACeDEADGludCh4KzAuMDAxKQAAAAYCAAAABwAAAAAIAAAAbAAAAAE#UGJN0vGp#AAAAAIA#####wACeTEADGludCh5KzAuMDAxKQAAAAYCAAAABwAAAAAIAAAAbQAAAAE#UGJN0vGp#AAAAAIA#####wADbnVtAAx4MSoyK254KjQqeTEAAAAHAAAAAAcCAAAACAAAAG4AAAABQAAAAAAAAAAAAAAHAgAAAAcCAAAACAAAAAMAAAABQBAAAAAAAAAAAAAIAAAAbwAAABwA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAFoAAABe#####wAAAAEAD0NWYWxldXJBZmZpY2hlZQD#####AQAAAADAJgAAAAAAAMAj#######wAAAAcRIAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAIAAABwAAAAAgD#####AARudW0xAAVudW0rMQAAAAcAAAAACAAAAHAAAAABP#AAAAAAAAAAAAACAP####8ABG51bScACG51bStueCoyAAAABwAAAAAIAAAAcAAAAAcCAAAACAAAAAMAAAABQAAAAAAAAAAAAAACAP####8ABW51bScxAAZudW0nKzEAAAAHAAAAAAgAAAB0AAAAAT#wAAAAAAAAAAAAHAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAXQAAAGUAAAAcAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABeAAAAaQAAABwA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAF8AAABhAAAAIwD#####AQAAAADAJgAAAAAAAMAkAAAAAAAAAAAAeBIAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAIAAABzAAAAIwD#####AQAAAADAJAAAAAAAAMAkAAAAAAAAAAAAdhIAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAIAAAB0AAAAIwD#####AQAAAADAIgAAAAAAAMAgAAAAAAAAAAAAdxIAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAIAAAB1#####wAAAAIAEkNMaWV1T2JqZXRQYXJQdExpZQD#####AQAAAAAAAGAAAAAIAAAANAAAAFoAAAAHAAAAWgAAAFsAAABcAAAAXQAAAF4AAABfAAAAYAAAACQA#####wEAAAAAAABmAAAACAAAADQAAABaAAAABwAAAFoAAABbAAAAXQAAAF4AAABkAAAAZQAAAGYAAAAkAP####8BAAAAAAAAawAAAAgAAAA0AAAAWgAAAAcAAABaAAAAWwAAAGcAAABoAAAAaQAAAGoAAABrAAAAJAD#####AQAAAAAAAGMAAAAIAAAANAAAAFoAAAAHAAAAWgAAAFsAAABeAAAAXwAAAGEAAABiAAAAYwAAACQA#####wAAAAAAAAB8AAAACAAAAAMAAABWAAAACwAAAFYAAABYAAAAWQAAAFoAAABbAAAAXAAAAF0AAABeAAAAXwAAAGAAAAB8AAAAJAD#####AAAAAAAAAH8AAAAIAAAAAwAAAFYAAAALAAAAVgAAAFgAAABZAAAAWgAAAFsAAABeAAAAXwAAAGEAAABiAAAAYwAAAH8AAAAkAP####8AAAAAAAAAfgAAAAgAAAADAAAAVgAAAAsAAABWAAAAWAAAAFkAAABaAAAAWwAAAGcAAABoAAAAaQAAAGoAAABrAAAAfgAAACQA#####wAAAAAAAAB9AAAACAAAAAMAAABWAAAACwAAAFYAAABYAAAAWQAAAFoAAABbAAAAXQAAAF4AAABkAAAAZQAAAGYAAAB9AAAAJAD#####AQAAAAAAAHIAAAAIAAAANAAAAFoAAAAKAAAAWgAAAFsAAABeAAAAbAAAAG0AAABuAAAAbwAAAHAAAABxAAAAcgAAACQA#####wAAAAAAAACEAAAACAAAAAMAAABWAAAADgAAAFYAAABYAAAAWQAAAFoAAABbAAAAXgAAAGwAAABtAAAAbgAAAG8AAABwAAAAcQAAAHIAAACEAAAAJAD#####AQAAAAAAAHkAAAAIAAAANAAAAFoAAAAMAAAAWgAAAFsAAABfAAAAYQAAAGwAAABtAAAAbgAAAG8AAABwAAAAcwAAAHgAAAB5AAAAJAD#####AAAAAAAAAIYAAAAIAAAAAwAAAFYAAAAQAAAAVgAAAFgAAABZAAAAWgAAAFsAAABfAAAAYQAAAGwAAABtAAAAbgAAAG8AAABwAAAAcwAAAHgAAAB5AAAAhgAAACQA#####wEAAAAAAAB7AAAACAAAADQAAABaAAAADQAAAFoAAABbAAAAXgAAAGkAAABsAAAAbQAAAG4AAABvAAAAcAAAAHQAAAB1AAAAdwAAAHsAAAAkAP####8AAAAAAAAAiAAAAAgAAAADAAAAVgAAABEAAABWAAAAWAAAAFkAAABaAAAAWwAAAF4AAABpAAAAbAAAAG0AAABuAAAAbwAAAHAAAAB0AAAAdQAAAHcAAAB7AAAAiAAAACQA#####wEAAAAAAAB6AAAACAAAADQAAABaAAAADAAAAFoAAABbAAAAXQAAAGUAAABsAAAAbQAAAG4AAABvAAAAcAAAAHQAAAB2AAAAegAAACQA#####wAAAAAAAACKAAAACAAAAAMAAABWAAAAEAAAAFYAAABYAAAAWQAAAFoAAABbAAAAXQAAAGUAAABsAAAAbQAAAG4AAABvAAAAcAAAAHQAAAB2AAAAegAAAIr#####AAAAAQAUQ0ltcGxlbWVudGF0aW9uUHJvdG8A#####wApQWZmaWNoYWdlIGQnw6lxdWF0aW9uIGRlIGRyb2l0ZSBvdSBjZXJjbGUAAAACAAAAAQAAAAIAAAAcAAAARgAAACEAAAAAjAACeDIAAAAcAAAARgAAACIAAAAAjAACeTIAAAAcAAAARgAAABoBAAAAjAH#AAAAQBwAAAAAAAAAAAAAAAAAAAAAAEYQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAXKCNWYWwoeDIsMSksI1ZhbCh5MiwyKSkAAAAlAP####8AKUFmZmljaGFnZSBkJ8OpcXVhdGlvbiBkZSBkcm9pdGUgb3UgY2VyY2xlAAAAAgAAAAEAAAACAAAAHAAAAEEAAAAhAAAAAJAAAngyAAAAHAAAAEEAAAAiAAAAAJAAAnkyAAAAHAAAAEEAAAAaAQAAAJAB#wAAAEAcAAAAAAAAwDUAAAAAAAAAAABBEAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAFygjVmFsKHgyLDEpLCNWYWwoeTIsMikpAAAAJQD#####AClBZmZpY2hhZ2UgZCfDqXF1YXRpb24gZGUgZHJvaXRlIG91IGNlcmNsZQAAAAIAAAABAAAAAgAAABwAAAAgAAAAIQAAAACUAAJ4MgAAABwAAAAgAAAAIgAAAACUAAJ5MgAAABwAAAAgAAAAGgEAAACUAf8AAAC#8AAAAAAAAEAAAAAAAAAAAAAAIBAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAABcoI1ZhbCh4MiwxKSwjVmFsKHkyLDIpKQAAACUA#####wApQWZmaWNoYWdlIGQnw6lxdWF0aW9uIGRlIGRyb2l0ZSBvdSBjZXJjbGUAAAACAAAAAQAAAAIAAAAcAAAAHgAAACEAAAAAmAACeDIAAAAcAAAAHgAAACIAAAAAmAACeTIAAAAcAAAAHgAAABoBAAAAmAH#AAAAv#AAAAAAAAA#########4AAAAB4QAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAXKCNWYWwoeDIsMSksI1ZhbCh5MiwyKSkAAAAlAP####8AKUFmZmljaGFnZSBkJ8OpcXVhdGlvbiBkZSBkcm9pdGUgb3UgY2VyY2xlAAAAAgAAAAEAAAACAAAAHAAAACIAAAAhAAAAAJwAAngyAAAAHAAAACIAAAAiAAAAAJwAAnkyAAAAHAAAACIAAAAaAQAAAJwB#wAAAEAYAAAAAAAAwDUAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAFygjVmFsKHgyLDEpLCNWYWwoeTIsMikpAAAAEAD#####Af8AAAEQAAJBMQDANwAAAAAAAL#wAAAAAAAABQAAAAAiAAAARwAAACUA#####wApQWZmaWNoYWdlIGQnw6lxdWF0aW9uIGRlIGRyb2l0ZSBvdSBjZXJjbGUAAAACAAAAAQAAAAIAAAAcAAAAoAAAACEAAAAAoQACeDIAAAAcAAAAoAAAACIAAAAAoQACeTIAAAAcAAAAoAAAABoBAAAAoQH#AAAAQBAAAAAAAADAMwAAAAAAAAAAAKAQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAXKCNWYWwoeDIsMSksI1ZhbCh5MiwyKSkAAAACAP####8AAnhiAAIyNAAAAAFAOAAAAAAAAAAAAAIA#####wACeWIAAjE2AAAAAUAwAAAAAAAAAAAAAgD#####AARudW1iAAIxMAAAAAFAJAAAAAAAAAAAAAIA#####wAEbnVtYwACMzMAAAABQECAAAAAAAAAAAAYAP####8BAAAAABAAAWIAAAAAAAAAAABACAAAAAAAAAUAAAAAHAAAAAgAAAClAAAACAAAAKYAAAAeAP####8AAAAAAAEAAAAFAAAAKwAAACwAAAAtAAAALgAAACsAAAAeAP####8ALLgsAAEAAAAFAAAAMAAAADEAAAAyAAAAMwAAADD#####AAAAAQAQQ1N1cmZhY2VQb2x5Z29uZQD#####AAB#AAAAAAUAAACrAAAADgD#####AAAADQAAAAcDAAAAAT#wAAAAAAAAAAAACgAAADYAAAAIAAAApwAAABAA#####wEA#wAAEAAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAACAAAACtAAAAEAD#####AQD#AAAQAAAAAAAAAAAAAABACAAAAAAAAAkAAAAAQQAAAK0AAAAQAP####8BAP8AABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAABCAAAArQAAABAA#####wEA#wAAEAAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAACIAAACtAAAAHgD#####AAAAAAABAAAABQAAAK4AAACvAAAAsAAAALEAAACuAAAAGQD#####AAAADQAAAKkAAAAQAP####8BAP8AABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAACuAAAAswAAABAA#####wEA#wAAEAAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAAK8AAACzAAAAEAD#####AQD#AAAQAAAAAAAAAAAAAABACAAAAAAAAAkAAAAAsAAAALMAAAAQAP####8BAP8AABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAACxAAAAswAAAB4A#####wD#AAAAAQAAAAUAAAC0AAAAtQAAALYAAAC3AAAAtAAAACYA#####wD#AAAAAAAFAAAAuAAAABkA#####wAAAA0AAAAp#####wAAAAEAC0NNYWNyb1BhdXNlAP####8AAAAAAf####8QQI70AAAAAABAQcKPXCj1wwIAAAAAAAAAAAAAAAABAAAAAAAAAAAABVBhdXNlAAAAAAACAAAADgD#####AAAADQAAAAcDAAAAAT#wAAAAAAAAAAAACgAAADUAAAAIAAAAqAAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAEgAAAC8AAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAASwAAALwAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABJAAAAvAAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAEoAAAC8AAAAHgD#####Af8AAAABAAAABQAAAL0AAAC+AAAAvwAAAMAAAAC9AAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAvQAAALoAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAC+AAAAugAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAL8AAAC6AAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAwAAAALoAAAAeAP####8AAAB#AAEAAAAFAAAAwgAAAMMAAADEAAAAxQAAAMIAAAAmAP####8AAAB#AAAABQAAAMb###############8="
			this.MG32codeBase64corr = "TWF0aEdyYXBoSmF2YTEuMAAAABI+0euFAAJmcv###wEA#wEAAAAAAAAAAAUcAAAC0gAAAQEAAAAAAAAAAQAAART#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAHQ0NhbGN1bAD#####AAVBbmdsZQABMAAAAAEAAAAAAAAAAAAAAAIA#####wAEWm9vbQACMzAAAAABQD4AAAAAAAAAAAACAP####8AAm54AAE1AAAAAUAUAAAAAAAA#####wAAAAEABUNGb25jAP####8AB21vZHVsb3gACG1vZCh4LDIp#####wAAAAEADUNGb25jdGlvbjJWYXIG#####wAAAAIAEUNWYXJpYWJsZUZvcm1lbGxlAAAAAAAAAAFAAAAAAAAAAAABeAAAAAMA#####wAHbW9kdWxveQASbW9kKGludCh5L254LzIpLDIpAAAABAb#####AAAAAgAJQ0ZvbmN0aW9uAv####8AAAABAApDT3BlcmF0aW9uAwAAAAcDAAAABQAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAAwAAAAFAAAAAAAAAAAAAAAFAAAAAAAAAAAABeQAAAAMA#####wACcjAAJXNpKChtb2R1bG94KHgpPTApKihtb2R1bG95KHgpPTApLDEsMCn#####AAAAAQANQ0ZvbmN0aW9uM1ZhcgAAAAAHAgAAAAcI#####wAAAAEADkNBcHBlbEZvbmN0aW9uAAAABAAAAAUAAAAAAAAAAQAAAAAAAAAAAAAABwgAAAAKAAAABQAAAAUAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAQAAAAAAAAAAAAF4AAAAAgD#####AAJ5RAABNgAAAAFAGAAAAAAAAAAAAAIA#####wACeEQAATAAAAABAAAAAAAAAAAAAAACAP####8AAnlDAAE0AAAAAUAQAAAAAAAAAAAAAgD#####AAJ4QwABNgAAAAFAGAAAAAAAAAAAAAIA#####wACeUIAATAAAAABAAAAAAAAAAAAAAACAP####8AAnhCAAE0AAAAAUAQAAAAAAAA#####wAAAAEACkNQb2ludEJhc2UA#####wAAAAAAEAABTwDAMgAAAAAAAMAzAAAAAAAABQABQFKgAAAAAABAYLCj1wo9cf####8AAAABABRDRHJvaXRlRGlyZWN0aW9uRml4ZQD#####Af8AAAEQAAABAAIAAAANAD#3Cj1wo9cK#####wAAAAEACUNSb3RhdGlvbgD#####AAAADQAAAAFAVoAAAAAAAP####8AAAABAAtDSG9tb3RoZXRpZQD#####AAAADQAAAAcDAAAAAT#wAAAAAAAAAAAACAAAAAL#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQABQGeAAAAAAAAAAAAOAAAADQD#####AAAADQAAAAgAAAAB#####wAAAAEAC0NQb2ludEltYWdlAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAARAAAAEv####8AAAABAA5DUG9pbnRMaWVQb2ludAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAE#####8AAAABAAlDQ2VyY2xlT0EA#####wH#AAAAAgAAAA0AAAAU#####wAAAAEADUNEZW1pRHJvaXRlT0EA#####wH#AAAADQAAAQACAAAADQAAABT#####AAAAAQAQQ0RlbWlEcm9pdGVJbWFnZQD#####Af8AAAANAAABAAIAAAAWAAAAD#####8AAAABABBDSW50RHJvaXRlQ2VyY2xlAP####8AAAAXAAAAFf####8AAAABABBDUG9pbnRMaWVCaXBvaW50AP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQABAAAAGAAAABAA#####wH#AAAAEAACSicAAAAAAAAAAABACAAAAAAAAAUAAAAAFAAAABAAAAAQAP####8B#wAAABAAAkknAAAAAAAAAAAAQAgAAAAAAAAFAAAAABkAAAAQ#####wAAAAIAB0NSZXBlcmUA#####wDm5uYBAQAAAA0AAAAbAAAAGgAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAE#8AAAAAAAAAAAAAE#8AAAAAAAAP####8AAAABABBDUG9pbnREYW5zUmVwZXJlAP####8B#wAAARAAAkInAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAADAAAAAgAAAALAAAAEQD#####AQAAAAAQAAFCAEAAAAAAAAAAwDcAAAAAAAAFAAAAAB0AAAAYAP####8B#wAAARAAAkQnAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAACAAAAAgAAAAHAAAAEQD#####AQAAAAAQAAFEAMAxAAAAAAAAwCoAAAAAAAAFAAAAAB8AAAAYAP####8B#wAAARAAAkMnAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAACgAAAAgAAAAJAAAAEQD#####AQAAAAAQAAFDAEAIAAAAAAAAv#AAAAAAAAAFAAAAACEAAAACAP####8AAnhhAAIxMgAAAAFAKAAAAAAAAAAAAAIA#####wACeWEAATgAAAABQCAAAAAAAAAAAAACAP####8ABG51bWEAATAAAAABAAAAAAAAAAAAAAACAP####8AAnhjAAIxOAAAAAFAMgAAAAAAAAAAAAIA#####wACeWMAAjEyAAAAAUAoAAAAAAAAAAAAGAD#####AQAAAAAQAAFhAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAAIwAAAAgAAAAkAAAAGAD#####AQAAAAAQAAFjAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAAJgAAAAgAAAAnAAAADgD#####AAAADQAAAAcDAAAAAT#wAAAAAAAAAAAACgAAAAYAAAAIAAAAJQAAABAA#####wAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAA0AAAAqAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAIAAAACoAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAiAAAAKgAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAB4AAAAq#####wAAAAEADENUcmFuc2xhdGlvbgD#####AAAADQAAACgAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAArAAAALwAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAACwAAAAvAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAALQAAAC8AAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAuAAAALwAAAAIA#####wACbnkAATUAAAABQBQAAAAAAAAAAAADAP####8AAnIzACVzaSgobW9kdWxveCh4KT0xKSoobW9kdWxveSh4KT0xKSwxLDApAAAACQAAAAAHAgAAAAcIAAAACgAAAAQAAAAFAAAAAAAAAAE#8AAAAAAAAAAAAAcIAAAACgAAAAUAAAAFAAAAAAAAAAE#8AAAAAAAAAAAAAE#8AAAAAAAAAAAAAEAAAAAAAAAAAABeAAAAAMA#####wACcjIAJXNpKChtb2R1bG94KHgpPTApKihtb2R1bG95KHgpPTEpLDEsMCkAAAAJAAAAAAcCAAAABwgAAAAKAAAABAAAAAUAAAAAAAAAAQAAAAAAAAAAAAAABwgAAAAKAAAABQAAAAUAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAAAAAAAQAAAAAAAAAAAAF4AAAAAwD#####AAJyMQAlc2koKG1vZHVsb3goeCk9MSkqKG1vZHVsb3koeCk9MCksMSwwKQAAAAkAAAAABwIAAAAHCAAAAAoAAAAEAAAABQAAAAAAAAABP#AAAAAAAAAAAAAHCAAAAAoAAAAFAAAABQAAAAAAAAABAAAAAAAAAAAAAAABP#AAAAAAAAAAAAABAAAAAAAAAAAAAXgAAAACAP####8ABW1pbmkxAAIxMAAAAAFAJAAAAAAAAAAAAAIA#####wAFbWF4aTEAAjQwAAAAAUBEAAAAAAAAAAAAAgD#####AARwYXMxAAExAAAAAT#wAAAAAAAA#####wAAAAIADENDb21tZW50YWlyZQD#####AQAAAADAMQAAAAAAAMAuAAAAAAAAAAAADRAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAFBAAAAAgD#####AAVtaW5pMgADLTMw#####wAAAAEADENNb2luc1VuYWlyZQAAAAFAPgAAAAAAAAAAAAIA#####wAFbWF4aTIAAjMwAAAAAUA+AAAAAAAAAAAAAgD#####AARwYXMyAAExAAAAAT#wAAAAAAAA#####wAAAAEAB0NNaWxpZXUA#####wEAAAABEAACSjEAAAAAAAAAAABACAAAAAAAAAUAAAAAIAAAACL#####AAAAAQARQ1N5bWV0cmllQ2VudHJhbGUA#####wAAAD8AAAAQAP####8BAAAAARAAAUoAAAAAAAAAAABACAAAAAAAAAUAAAAAHgAAAEAAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAANAAAAQAAAABwA#####wEAAAABEAACSTEAAAAAAAAAAABACAAAAAAAAAUAAAAAIgAAAB4AAAAdAP####8AAABDAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAADQAAAEQAAAAQAP####8BAAAAARAAAUkAAAAAAAAAAABACAAAAAAAAAUAAAAAIAAAAEQAAAAZAP####8AAAANAAAAIgAAABAA#####wEAAAABEAABQQAAAAAAAAAAAEAIAAAAAAAABQAAAAANAAAARwAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAACIAAABHAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAHgAAAEcAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAgAAAAR#####8AAAABAAlDUG9seWdvbmUA#####wAAAAAAAQAAAAUAAAAgAAAAQQAAAEIAAAAiAAAAIAAAAB4A#####wAAAAAAAQAAAAUAAAAeAAAAIgAAAEUAAABGAAAAHgAAAB4A#####wAAAAAAAQAAAAUAAABIAAAASwAAAEkAAABKAAAASAAAAB4A#####wAAAAAAAQAAAAUAAAANAAAAIAAAACIAAAAeAAAADQAAABYA#####wD#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAIAAAAYAAAAFwD#####AObm5gABAAAADQAAAEYAAABBAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEAEUNQb2ludFBhckFic2Npc3NlAP####8BAAAAABAAAVUAAAAAAAAAAABACAAAAAAAAAUAAAAADQAAAEYAAAAHAQAAAAgAAAADAAAAAT#wAAAAAAAAAAAAHwD#####AQAAAAAQAAFWAAAAAAAAAAAAQAgAAAAAAAAFAAAAAA0AAABBAAAABwEAAAAIAAAANAAAAAE#8AAAAAAAAP####8AAAABAAhDU2VnbWVudAD#####AQAAAAAQAAABAAEAAAANAAAAUgAAACAA#####wEAAAAAEAAAAQABAAAADQAAAFMAAAAPAP####8BAAAAABAAAlUxAAAAAAAAAAAAQAgAAAAAAAAFAAE#0wPWdtnVKQAAAFQAAAAZAP####8AAAANAAAAUwAAABAA#####wEAAAAAEAACVjEAAAAAAAAAAABACAAAAAAAAAUAAAAAVgAAAFcAAAAgAP####8BAAAAABAAAAEAAQAAAFYAAABYAAAADwD#####AQAAAAAQAAJVMgAAAAAAAAAAAEAIAAAAAAAABQABP9bRs76jZ34AAABZAAAAGQD#####AAAADQAAAFoAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAANAAAAWwAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAACAAAABbAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAIgAAAFsAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAeAAAAWwAAAB4A#####wEAAAAAAQAAAAUAAABcAAAAXQAAAF4AAABfAAAAXAAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAEUAAABbAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAARgAAAFsAAAAeAP####8BAAAAAAEAAAAFAAAAXwAAAF4AAABhAAAAYgAAAF8AAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABBAAAAWwAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAEIAAABbAAAAHgD#####AQAAAAABAAAABQAAAF0AAABkAAAAZQAAAF4AAABdAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAASAAAAFsAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABLAAAAWwAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAEkAAABbAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAASgAAAFsAAAAeAP####8BAAAAAAEAAAAFAAAAZwAAAGgAAABpAAAAagAAAGf#####AAAAAgAIQ01lc3VyZVgA#####wABeAAAAFEAAABa#####wAAAAIACENNZXN1cmVZAP####8AAXkAAABRAAAAWgAAAAIA#####wACeDEADGludCh4KzAuMDAxKQAAAAYCAAAABwAAAAAIAAAAbAAAAAE#UGJN0vGp#AAAAAIA#####wACeTEADGludCh5KzAuMDAxKQAAAAYCAAAABwAAAAAIAAAAbQAAAAE#UGJN0vGp#AAAAAIA#####wADbnVtAAx4MSoyK254KjQqeTEAAAAHAAAAAAcCAAAACAAAAG4AAAABQAAAAAAAAAAAAAAHAgAAAAcCAAAACAAAAAMAAAABQBAAAAAAAAAAAAAIAAAAbwAAABwA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAFoAAABe#####wAAAAEAD0NWYWxldXJBZmZpY2hlZQD#####AQAAAADAJgAAAAAAAMAj#######wAAAAcRIAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAIAAABwAAAAAgD#####AARudW0xAAVudW0rMQAAAAcAAAAACAAAAHAAAAABP#AAAAAAAAAAAAACAP####8ABG51bScACG51bStueCoyAAAABwAAAAAIAAAAcAAAAAcCAAAACAAAAAMAAAABQAAAAAAAAAAAAAACAP####8ABW51bScxAAZudW0nKzEAAAAHAAAAAAgAAAB0AAAAAT#wAAAAAAAAAAAAHAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAXQAAAGUAAAAcAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABeAAAAaQAAABwA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAF8AAABhAAAAIwD#####AQAAAADAJgAAAAAAAMAkAAAAAAAAAAAAeBIAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAIAAABzAAAAIwD#####AQAAAADAJAAAAAAAAMAkAAAAAAAAAAAAdhIAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAIAAAB0AAAAIwD#####AQAAAADAIgAAAAAAAMAgAAAAAAAAAAAAdxIAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAIAAAB1#####wAAAAIAEkNMaWV1T2JqZXRQYXJQdExpZQD#####AQAAAAAAAGAAAAAIAAAANAAAAFoAAAAHAAAAWgAAAFsAAABcAAAAXQAAAF4AAABfAAAAYAAAACQA#####wEAAAAAAABmAAAACAAAADQAAABaAAAABwAAAFoAAABbAAAAXQAAAF4AAABkAAAAZQAAAGYAAAAkAP####8BAAAAAAAAawAAAAgAAAA0AAAAWgAAAAcAAABaAAAAWwAAAGcAAABoAAAAaQAAAGoAAABrAAAAJAD#####AQAAAAAAAGMAAAAIAAAANAAAAFoAAAAHAAAAWgAAAFsAAABeAAAAXwAAAGEAAABiAAAAYwAAACQA#####wAAAAAAAAB8AAAACAAAAAMAAABWAAAACwAAAFYAAABYAAAAWQAAAFoAAABbAAAAXAAAAF0AAABeAAAAXwAAAGAAAAB8AAAAJAD#####AAAAAAAAAH8AAAAIAAAAAwAAAFYAAAALAAAAVgAAAFgAAABZAAAAWgAAAFsAAABeAAAAXwAAAGEAAABiAAAAYwAAAH8AAAAkAP####8AAAAAAAAAfgAAAAgAAAADAAAAVgAAAAsAAABWAAAAWAAAAFkAAABaAAAAWwAAAGcAAABoAAAAaQAAAGoAAABrAAAAfgAAACQA#####wAAAAAAAAB9AAAACAAAAAMAAABWAAAACwAAAFYAAABYAAAAWQAAAFoAAABbAAAAXQAAAF4AAABkAAAAZQAAAGYAAAB9AAAAJAD#####AQAAAAAAAHIAAAAIAAAANAAAAFoAAAAKAAAAWgAAAFsAAABeAAAAbAAAAG0AAABuAAAAbwAAAHAAAABxAAAAcgAAACQA#####wAAAAAAAACEAAAACAAAAAMAAABWAAAADgAAAFYAAABYAAAAWQAAAFoAAABbAAAAXgAAAGwAAABtAAAAbgAAAG8AAABwAAAAcQAAAHIAAACEAAAAJAD#####AQAAAAAAAHkAAAAIAAAANAAAAFoAAAAMAAAAWgAAAFsAAABfAAAAYQAAAGwAAABtAAAAbgAAAG8AAABwAAAAcwAAAHgAAAB5AAAAJAD#####AAAAAAAAAIYAAAAIAAAAAwAAAFYAAAAQAAAAVgAAAFgAAABZAAAAWgAAAFsAAABfAAAAYQAAAGwAAABtAAAAbgAAAG8AAABwAAAAcwAAAHgAAAB5AAAAhgAAACQA#####wEAAAAAAAB7AAAACAAAADQAAABaAAAADQAAAFoAAABbAAAAXgAAAGkAAABsAAAAbQAAAG4AAABvAAAAcAAAAHQAAAB1AAAAdwAAAHsAAAAkAP####8AAAAAAAAAiAAAAAgAAAADAAAAVgAAABEAAABWAAAAWAAAAFkAAABaAAAAWwAAAF4AAABpAAAAbAAAAG0AAABuAAAAbwAAAHAAAAB0AAAAdQAAAHcAAAB7AAAAiAAAACQA#####wEAAAAAAAB6AAAACAAAADQAAABaAAAADAAAAFoAAABbAAAAXQAAAGUAAABsAAAAbQAAAG4AAABvAAAAcAAAAHQAAAB2AAAAegAAACQA#####wAAAAAAAACKAAAACAAAAAMAAABWAAAAEAAAAFYAAABYAAAAWQAAAFoAAABbAAAAXQAAAGUAAABsAAAAbQAAAG4AAABvAAAAcAAAAHQAAAB2AAAAegAAAIr#####AAAAAQAUQ0ltcGxlbWVudGF0aW9uUHJvdG8A#####wApQWZmaWNoYWdlIGQnw6lxdWF0aW9uIGRlIGRyb2l0ZSBvdSBjZXJjbGUAAAACAAAAAQAAAAIAAAAcAAAARgAAACEAAAAAjAACeDIAAAAcAAAARgAAACIAAAAAjAACeTIAAAAcAAAARgAAABoBAAAAjAH#AAAAQBwAAAAAAAAAAAAAAAAAAAAAAEYQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAXKCNWYWwoeDIsMSksI1ZhbCh5MiwyKSkAAAAlAP####8AKUFmZmljaGFnZSBkJ8OpcXVhdGlvbiBkZSBkcm9pdGUgb3UgY2VyY2xlAAAAAgAAAAEAAAACAAAAHAAAAEEAAAAhAAAAAJAAAngyAAAAHAAAAEEAAAAiAAAAAJAAAnkyAAAAHAAAAEEAAAAaAQAAAJAB#wAAAEAcAAAAAAAAwDUAAAAAAAAAAABBEAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAFygjVmFsKHgyLDEpLCNWYWwoeTIsMikpAAAAJQD#####AClBZmZpY2hhZ2UgZCfDqXF1YXRpb24gZGUgZHJvaXRlIG91IGNlcmNsZQAAAAIAAAABAAAAAgAAABwAAAAgAAAAIQAAAACUAAJ4MgAAABwAAAAgAAAAIgAAAACUAAJ5MgAAABwAAAAgAAAAGgEAAACUAf8AAAC#8AAAAAAAAEAAAAAAAAAAAAAAIBAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAABcoI1ZhbCh4MiwxKSwjVmFsKHkyLDIpKQAAACUA#####wApQWZmaWNoYWdlIGQnw6lxdWF0aW9uIGRlIGRyb2l0ZSBvdSBjZXJjbGUAAAACAAAAAQAAAAIAAAAcAAAAHgAAACEAAAAAmAACeDIAAAAcAAAAHgAAACIAAAAAmAACeTIAAAAcAAAAHgAAABoBAAAAmAH#AAAAv#AAAAAAAAA#########4AAAAB4QAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAXKCNWYWwoeDIsMSksI1ZhbCh5MiwyKSkAAAAlAP####8AKUFmZmljaGFnZSBkJ8OpcXVhdGlvbiBkZSBkcm9pdGUgb3UgY2VyY2xlAAAAAgAAAAEAAAACAAAAHAAAACIAAAAhAAAAAJwAAngyAAAAHAAAACIAAAAiAAAAAJwAAnkyAAAAHAAAACIAAAAaAQAAAJwB#wAAAEAYAAAAAAAAwDUAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAFygjVmFsKHgyLDEpLCNWYWwoeTIsMikpAAAAEAD#####Af8AAAEQAAJBMQDANwAAAAAAAL#wAAAAAAAABQAAAAAiAAAARwAAACUA#####wApQWZmaWNoYWdlIGQnw6lxdWF0aW9uIGRlIGRyb2l0ZSBvdSBjZXJjbGUAAAACAAAAAQAAAAIAAAAcAAAAoAAAACEAAAAAoQACeDIAAAAcAAAAoAAAACIAAAAAoQACeTIAAAAcAAAAoAAAABoBAAAAoQH#AAAAQBAAAAAAAADAMwAAAAAAAAAAAKAQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAXKCNWYWwoeDIsMSksI1ZhbCh5MiwyKSkAAAACAP####8AAnhiAAIyNAAAAAFAOAAAAAAAAAAAAAIA#####wACeWIAAjE2AAAAAUAwAAAAAAAAAAAAAgD#####AARudW1iAAIxMAAAAAFAJAAAAAAAAAAAAAIA#####wAEbnVtYwACMzMAAAABQECAAAAAAAAAAAAYAP####8BAAAAABAAAWIAAAAAAAAAAABACAAAAAAAAAUAAAAAHAAAAAgAAAClAAAACAAAAKYAAAAeAP####8AAAAAAAEAAAAFAAAAKwAAACwAAAAtAAAALgAAACsAAAAeAP####8BLLgsAAEAAAAFAAAAMAAAADEAAAAyAAAAMwAAADD#####AAAAAQAQQ1N1cmZhY2VQb2x5Z29uZQD#####AQB#AAAAAAUAAACrAAAADgD#####AAAADQAAAAcDAAAAAT#wAAAAAAAAAAAACgAAADYAAAAIAAAApwAAABAA#####wEA#wAAEAAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAACAAAACtAAAAEAD#####AQD#AAAQAAAAAAAAAAAAAABACAAAAAAAAAkAAAAAQQAAAK0AAAAQAP####8BAP8AABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAABCAAAArQAAABAA#####wEA#wAAEAAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAACIAAACtAAAAHgD#####AAAAAAABAAAABQAAAK4AAACvAAAAsAAAALEAAACuAAAAGQD#####AAAADQAAAKkAAAAQAP####8BAP8AABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAACuAAAAswAAABAA#####wEA#wAAEAAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAAK8AAACzAAAAEAD#####AQD#AAAQAAAAAAAAAAAAAABACAAAAAAAAAkAAAAAsAAAALMAAAAQAP####8BAP8AABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAACxAAAAswAAAB4A#####wH#AAAAAQAAAAUAAAC0AAAAtQAAALYAAAC3AAAAtAAAACYA#####wH#AAAAAAAFAAAAuAAAABkA#####wAAAA0AAAAp#####wAAAAEAC0NNYWNyb1BhdXNlAP####8AAAAAAf####8QQI70AAAAAABAQcKPXCj1wwIAAAAAAAAAAAAAAAABAAAAAAAAAAAABVBhdXNlAAAAAAACAAAADgD#####AAAADQAAAAcDAAAAAT#wAAAAAAAAAAAACgAAADUAAAAIAAAAqAAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAEgAAAC8AAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAASwAAALwAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABJAAAAvAAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAEoAAAC8AAAAHgD#####Af8AAAABAAAABQAAAL0AAAC+AAAAvwAAAMAAAAC9AAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAvQAAALoAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAC+AAAAugAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAL8AAAC6AAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAwAAAALoAAAAeAP####8BAAB#AAEAAAAFAAAAwgAAAMMAAADEAAAAxQAAAMIAAAAmAP####8BAAB#AAAABQAAAMYAAAACAP####8AAnhWAAE0AAAAAUAQAAAAAAAAAAAAAgD#####AAJ5VgABNAAAAAFAEAAAAAAAAAAAABgA#####wEAAAAAEAABdgAAAAAAAAAAAEAIAAAAAAAABQAAAAAcAAAACAAAAMgAAAAIAAAAyQAAABkA#####wAAAA0AAADKAAAAEAD#####AQAAAAAQAAJhJwAAAAAAAAAAAEAIAAAAAAAABQAAAAAoAAAAywAAACAA#####wEAAAAAEAAAAQABAAAAKAAAAMwAAAAPAP####8BAAAAABAAAm0xAAAAAAAAAAAAQAgAAAAAAAAFAAEAAAAAAAAAAAAAAM0AAAAZAP####8AAAAoAAAAzAAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAADAAAADPAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAMQAAAM8AAAAQAP####8BAH8AABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAyAAAAzwAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAADMAAADPAAAAHgD#####AQB#AAABAAAABQAAANAAAADRAAAA0gAAANMAAADQAAAAJgD#####AQB#AAAAAAUAAADUAAAAGQD#####AAAAKAAAAM4AAAAQAP####8BAH8AABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAwAAAA1gAAABAA#####wEAfwAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAADEAAADWAAAAEAD#####AQB#AAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAMgAAANYAAAAQAP####8BAH8AABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAzAAAA1gAAAB4A#####wEAfwAAAQAAAAUAAADXAAAA2AAAANkAAADaAAAA1wAAACYA#####wEAfwAAAAAFAAAA2#####8AAAABABFDTWFjcm9EaXNwYXJpdGlvbgD#####AAB#AAH#####CkCHFAAAAAAAQEjCj1wo9cMCAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAdtYXNxdWUxAAAAAAAGAAAA1AAAANUAAADcAAAA2wAAAKsAAACs#####wAAAAEAEENNYWNyb0FwcGFyaXRpb24A#####wAAfwAB#####wpAhyQAAAAAAEBU4UeuFHriAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAJYXBwYXJhaXQxAAAAAAAGAAAA1AAAANUAAADcAAAA2wAAAKsAAACsAP####8AAAACABdDTWFjcm9BbmltYXRpb25Qb2ludExpZQD#####AAB#AAH#####CkCHVAAAAAAAQF3hR64UeuICAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAVhbmltMQAAAQAAABQAAABkAAAAPAAAAM4AAQD#####AAAAAQARQ01hY3JvU3VpdGVNYWNyb3MA#####wAAfwAB#####wpATMAAAAAAAEA#hR64UeuGAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAMY29ycmVjdGlvbiBhAAAAAAAEAAAA3gAAAN8AAADdAAAAuwAAAAIA#####wADeFYyAAIxMAAAAAFAJAAAAAAAAAAAAAIA#####wADeVYyAAE0AAAAAUAQAAAAAAAAAAAAAgD#####AAN4VjMAATQAAAABQBAAAAAAAAAAAAACAP####8AA3lWMwACMTAAAAABQCQAAAAAAAAAAAAYAP####8BAH8AABAAAnYyAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAA4QAAAAgAAADiAAAAGAD#####AQB#AAAQAAJ2MwAAAAAAAAAAAEAIAAAAAAAABQAAAAAcAAAACAAAAOMAAAAIAAAA5AAAABkA#####wAAAA0AAADlAAAAEAD#####AQB#AAAQAAJiJwAAAAAAAAAAAEAIAAAAAAAABQAAAACpAAAA5wAAABkA#####wAAAA0AAADmAAAAEAD#####AQB#AAAQAAJjJwAAAAAAAAAAAEAIAAAAAAAABQAAAAApAAAA6QAAACAA#####wEAfwAAEAAAAQABAAAAKQAAAOoAAAAgAP####8BAH8AABAAAAEAAQAAAKkAAADoAAAADwD#####AQB#AAAQAAJtMwAAAAAAAAAAAEAIAAAAAAAABQABP5EDcYGouj8AAADrAAAADwD#####AQB#AAAQAAJtMgAAAAAAAAAAAEAIAAAAAAAABQABAAAAAAAAAAAAAADsAAAAGQD#####AAAAKQAAAOoAAAAQAP####8BAH8AABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAADCAAAA7wAAABAA#####wEAfwAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAMMAAADvAAAAEAD#####AQB#AAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAxAAAAO8AAAAQAP####8BAH8AABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAADFAAAA7wAAAB4A#####wEAAP8AAQAAAAUAAADwAAAA8QAAAPIAAADzAAAA8AAAACYA#####wEAAP8AAAAFAAAA9AAAABkA#####wAAACkAAADtAAAAEAD#####AQAA#wAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAwgAAAPYAAAAQAP####8BAAD#ABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAADDAAAA9gAAABAA#####wEAAP8AEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAMQAAAD2AAAAEAD#####AQAA#wAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAxQAAAPYAAAAeAP####8BAAD#AAEAAAAFAAAA9wAAAPgAAAD5AAAA+gAAAPcAAAAmAP####8BAAD#AAAABQAAAPsAAAAoAP####8AAAD#Af####8KQIekAAAAAABAYzCj1wo9cQIAAAAAAAAAAAAAAAABAAAAAAAAAAAAB21hc3F1ZTMAAAAAAAYAAAD0AAAA9QAAAPwAAAD7AAAAxwAAAMYAAAApAP####8AAAD#Af####8KQIe8AAAAAABAZ1Cj1wo9cQIAAAAAAAAAAAAAAAABAAAAAAAAAAAACWFwcGFyYWl0MwAAAAAABgAAAPQAAAD1AAAA#AAAAPsAAADHAAAAxgAAAAAqAP####8AAAD#Af####8KQIfUAAAAAABAa1Cj1wo9cQIAAAAAAAAAAAAAAAABAAAAAAAAAAAABWFuaW0zAAABAAAAFAAAAGQAAAA8AAAA7QABAAAAACsA#####wAAAP8B#####wpAbLAAAAAAAEBAQo9cKPXDAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAMY29ycmVjdGlvbiBjAAAAAAADAAAA#gAAAP8AAAD9AAAAGQD#####AAAAqQAAAOgAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAC0AAABAQAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAALUAAAEBAAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAtgAAAQEAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAC3AAABAQAAAB4A#####wH#AAAAAQAAAAUAAAECAAABAwAAAQQAAAEFAAABAgAAACYA#####wH#AAAAAAAFAAABBgAAABkA#####wAAAKkAAADuAAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAtAAAAQgAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAC1AAABCAAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAALYAAAEIAAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAtwAAAQgAAAAeAP####8B#wAAAAEAAAAFAAABCQAAAQoAAAELAAABDAAAAQkAAAAmAP####8B#wAAAAAABQAAAQ0AAAAoAP####8A#wAAAf####8KQIgkAAAAAABAb3Cj1wo9cQIAAAAAAAAAAAAAAAABAAAAAAAAAAAAB21hc3F1ZTIAAAAAAAYAAAEGAAABBwAAAQ0AAAEOAAAAuAAAALkAAAApAP####8A#wAAAf####8KQIgsAAAAAABAcfhR64UeuAIAAAAAAAAAAAAAAAABAAAAAAAAAAAACWFwcGFyYWl0MgAAAAAABgAAAQYAAAEHAAABDQAAAQ4AAAC4AAAAuQAAAAAqAP####8A#wAAAf####8KQIg8AAAAAABAc9hR64UeuAIAAAAAAAAAAAAAAAABAAAAAAAAAAAABWFuaW0yAAABAAAAFAAAAGQAAAA8AAAA7gABAAAAACsA#####wD#AAAB#####wpAYdAAAAAAAEBAQo9cKPXAAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAMY29ycmVjdGlvbiBiAAAAAAAEAAABEAAAAREAAAEPAAAAuwAAACsA#####wD#AAAB#####xBAiFQAAAAAAEB2eFHrhR64AgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAKQ29ycmVjdGlvbgAAAAAABAAAALsAAADgAAABEgAAAQD###############8="
		
			// Première question : une figure dans tabfigA, l'image dans tabfigA... 
			// On choisit deux figures de type B pour définir le vecteur de translation.
			
			indexA = randint(0, nx * ny - 1)
			numA = tabfigA[indexA][2]
			iB1=randint(0,nx*ny-1)
			iB2=randint(0,nx*ny-1,[iB1])
			xV1=tabfigB[iB2][0]-tabfigB[iB1][0]
			yV1=tabfigB[iB2][1]-tabfigB[iB1][1]
			point = image_point_par_transformation(8, [tabfigA[indexA][0], tabfigA[indexA][1]], [0,0],[xV1,yV1])
			trouver = false
			while (trouver == false) {
				for (let j = 0; j < nx * ny; j++) {
					if (point[0] == tabfigA[j][0] && point[1] == tabfigA[j][1]) {
						trouver = true
						num1=tabfigA[j][2]
						xa=tabfigA[indexA][0]
						ya=tabfigA[indexA][1]
						break
					}
				}
				if (trouver == false) {
					indexA = randint(0, nx * ny - 1)
					numA = tabfigA[indexA][2]
					iB1=randint(0,nx*ny-1)
					iB2=randint(0,nx*ny-1,[iB1])
					xV1=tabfigB[iB2][0]-tabfigB[iB1][0]
					yV1=tabfigB[iB2][1]-tabfigB[iB1][1]
					point = image_point_par_transformation(8, [tabfigA[indexA][0], tabfigA[indexA][1]], [0,0],[xV1,yV1])
				}
			}
			texte += num_alpha(0) + texte_en_couleur_et_gras(` Dans la translation qui transforme la figure ${tabfigB[iB1][2]} en la figure ${tabfigB[iB2][2]} quelle est le numéro de l'image de la figure ${numA} ?<br>`, `green`)
			texte_corr = num_alpha(0) + texte_en_couleur_et_gras(` La figure image de la figure ${numA}  dans la translation qui transforme la figure ${tabfigB[iB1][2]} en la figure ${tabfigB[iB2][2]} porte le numéro ${num1}.<br>`, `green`)
			// Deuxième question : une figure dans tabfigD, l'image dans tabfigB... 
			// On choisit une figure C et une figure A pour définir le vecteur de translation.
			indexD = randint(0, nx * ny - 1)
			numD = tabfigD[indexD][2]
			iC1=randint(0,nx*ny-1)
			iA1=randint(0,nx*ny-1,[iC1])
			xV2=tabfigA[iA1][0]-tabfigC[iC1][0]
			yV2=tabfigA[iA1][1]-tabfigC[iC1][1]
			point = image_point_par_transformation(8, [tabfigD[indexD][0], tabfigD[indexD][1]], [0,0],[xV2,yV2])
			trouver = false
			while (trouver == false) {
				for (let j = 0; j < nx * ny; j++) {
					if (point[0] == tabfigB[j][0] && point[1] == tabfigB[j][1]) {
						trouver = true
						num2=tabfigB[j][2]
						xb=tabfigA[indexD][0]
						yb=tabfigA[indexD][1]
						break
					}
				}
				if (trouver == false) {
					indexD = randint(0, nx * ny - 1)
					numD = tabfigD[indexD][2]
					iC1=randint(0,nx*ny-1)
					iA1=randint(0,nx*ny-1,[iC1])
					xV2=tabfigA[iA1][0]-tabfigC[iC1][0]
					yV2=tabfigA[iA1][1]-tabfigC[iC1][1]
					point = image_point_par_transformation(8, [tabfigD[indexD][0], tabfigD[indexD][1]], [0,0],[xV2,yV2])
				}
			}
			texte += num_alpha(1) + texte_en_couleur_et_gras(` Dans la translation qui transforme la figure ${tabfigC[iC1][2]} en la figure ${tabfigA[iA1][2]} quelle est le numéro de l'image de la figure ${numD} ?<br>`, `red`)
			texte_corr += num_alpha(1) + texte_en_couleur_et_gras(` La figure image de la figure ${numD}  dans la translation qui transforme la figure ${tabfigC[iC1][2]} en la figure ${tabfigA[iA1][2]} porte le numéro ${num2}.<br>`, `red`)

		
			// troisième question : une figure dans tabfigC, l'image dans tabfigA... 
			// On choisit une figure D et une figure B pour définir le vecteur de translation.
			indexC = randint(0, nx * ny - 1)
			numC = tabfigC[indexC][2]
			iD1=randint(0,nx*ny-1)
			iB3=randint(0,nx*ny-1,[iD1])
			xV3=tabfigA[iB3][0]-tabfigC[iD1][0]
			yV3=tabfigA[iB3][1]-tabfigC[iD1][1]
			point = image_point_par_transformation(8, [tabfigC[indexC][0], tabfigC[indexC][1]], [0,0],[xV3,yV3])
			trouver = false
			while (trouver == false) {
				for (let j = 0; j < nx * ny; j++) {
					if (point[0] == tabfigA[j][0] && point[1] == tabfigA[j][1]) {
						trouver = true
						num3=tabfigA[j][2]
						xc=tabfigA[indexC][0]
						yc=tabfigA[indexC][1]
						break
					}
				}
				if (trouver == false) {
					indexC = randint(0, nx * ny - 1)
					numC = tabfigC[indexC][2]
					iD1=randint(0,nx*ny-1)
					iB3=randint(0,nx*ny-1,[iD1])
					xV3=tabfigA[iB3][0]-tabfigC[iD1][0]
					yV3=tabfigA[iB3][1]-tabfigC[iD1][1]
					point = image_point_par_transformation(8, [tabfigC[indexC][0], tabfigC[indexC][1]], [0,0],[xV3,yV3])
				}
			}
			texte += num_alpha(2) + texte_en_couleur_et_gras(` Dans la translation qui transforme la figure ${tabfigC[iD1][2]} en la figure ${tabfigA[iB3][2]} quelle est le numéro de l'image de la figure ${numC} ?<br>`, `blue`)
			texte_corr += num_alpha(2) + texte_en_couleur_et_gras(` La figure image de la figure ${numC}  dans la translation qui transforme la figure ${tabfigC[iD1][2]} en la figure ${tabfigA[iB3][2]} porte le numéro ${num3}.<br>`, `blue`)
	

			break

		case 4 : //rotations
			
			this.MG32codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+0euFAAJmcv###wEA#wEAAAAAAAAAAAUcAAAC0gAAAQEAAAAAAAAAAQAAAPj#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAHQ0NhbGN1bAD#####AAVBbmdsZQABMAAAAAEAAAAAAAAAAAAAAAIA#####wAEWm9vbQACMzAAAAABQD4AAAAAAAAAAAACAP####8AAm54AAE1AAAAAUAUAAAAAAAA#####wAAAAEABUNGb25jAP####8AB21vZHVsb3gACG1vZCh4LDIp#####wAAAAEADUNGb25jdGlvbjJWYXIG#####wAAAAIAEUNWYXJpYWJsZUZvcm1lbGxlAAAAAAAAAAFAAAAAAAAAAAABeAAAAAMA#####wAHbW9kdWxveQASbW9kKGludCh5L254LzIpLDIpAAAABAb#####AAAAAgAJQ0ZvbmN0aW9uAv####8AAAABAApDT3BlcmF0aW9uAwAAAAcDAAAABQAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAAwAAAAFAAAAAAAAAAAAAAAFAAAAAAAAAAAABeQAAAAMA#####wACcjAAJXNpKChtb2R1bG94KHgpPTApKihtb2R1bG95KHgpPTApLDEsMCn#####AAAAAQANQ0ZvbmN0aW9uM1ZhcgAAAAAHAgAAAAcI#####wAAAAEADkNBcHBlbEZvbmN0aW9uAAAABAAAAAUAAAAAAAAAAQAAAAAAAAAAAAAABwgAAAAKAAAABQAAAAUAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAQAAAAAAAAAAAAF4AAAAAgD#####AAJ5RAABNAAAAAFAEAAAAAAAAAAAAAIA#####wACeEQAATAAAAABAAAAAAAAAAAAAAACAP####8AAnlDAAE0AAAAAUAQAAAAAAAAAAAAAgD#####AAJ4QwABNAAAAAFAEAAAAAAAAAAAAAIA#####wACeUIAATAAAAABAAAAAAAAAAAAAAACAP####8AAnhCAAE0AAAAAUAQAAAAAAAA#####wAAAAEACkNQb2ludEJhc2UA#####wAAAAAAEAABTwDAMgAAAAAAAMAzAAAAAAAABQABQEdAAAAAAABAO4UeuFHrhv####8AAAABABRDRHJvaXRlRGlyZWN0aW9uRml4ZQD#####Af8AAAEQAAABAAIAAAANAD#3Cj1wo9cK#####wAAAAEACUNSb3RhdGlvbgD#####AAAADQAAAAFAVoAAAAAAAP####8AAAABAAtDSG9tb3RoZXRpZQD#####AAAADQAAAAcDAAAAAT#wAAAAAAAAAAAACAAAAAL#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQABQGeAAAAAAAAAAAAOAAAADQD#####AAAADQAAAAgAAAAB#####wAAAAEAC0NQb2ludEltYWdlAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAARAAAAEv####8AAAABAA5DUG9pbnRMaWVQb2ludAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAE#####8AAAABAAlDQ2VyY2xlT0EA#####wH#AAAAAgAAAA0AAAAU#####wAAAAEADUNEZW1pRHJvaXRlT0EA#####wH#AAAADQAAAQACAAAADQAAABT#####AAAAAQAQQ0RlbWlEcm9pdGVJbWFnZQD#####Af8AAAANAAABAAIAAAAWAAAAD#####8AAAABABBDSW50RHJvaXRlQ2VyY2xlAP####8AAAAXAAAAFf####8AAAABABBDUG9pbnRMaWVCaXBvaW50AP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQABAAAAGAAAABAA#####wH#AAAAEAACSicAAAAAAAAAAABACAAAAAAAAAUAAAAAFAAAABAAAAAQAP####8B#wAAABAAAkknAAAAAAAAAAAAQAgAAAAAAAAFAAAAABkAAAAQ#####wAAAAIAB0NSZXBlcmUA#####wDm5uYBAQAAAA0AAAAbAAAAGgAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAE#8AAAAAAAAAAAAAE#8AAAAAAAAP####8AAAABABBDUG9pbnREYW5zUmVwZXJlAP####8B#wAAARAAAkInAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAADAAAAAgAAAALAAAAEQD#####AQAAAAAQAAFCAEAAAAAAAAAAwDcAAAAAAAAFAAAAAB0AAAAYAP####8B#wAAARAAAkQnAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAACAAAAAgAAAAHAAAAEQD#####AQAAAAAQAAFEAMAxAAAAAAAAwCoAAAAAAAAFAAAAAB8AAAAYAP####8B#wAAARAAAkMnAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAACgAAAAgAAAAJAAAAEQD#####AQAAAAAQAAFDAEAIAAAAAAAAv#AAAAAAAAAFAAAAACEAAAACAP####8AAnhhAAIxMgAAAAFAKAAAAAAAAAAAAAIA#####wACeWEAATgAAAABQCAAAAAAAAAAAAACAP####8ABG51bWEAATAAAAABAAAAAAAAAAAAAAACAP####8AAnhjAAE4AAAAAUAgAAAAAAAAAAAAAgD#####AAJ5YwABOAAAAAFAIAAAAAAAAAAAAAIA#####wADeGMxAAE4AAAAAUAgAAAAAAAAAAAAAgD#####AAN5YzEAAjE2AAAAAUAwAAAAAAAAAAAAGAD#####AQAAAAAQAAFhAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAAIwAAAAgAAAAkAAAAGAD#####AQAAAAAQAAFjAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAAJgAAAAgAAAAnAAAAGAD#####AAnMCQAQAAJjMQAAAAAAAAAAAEAIAAAAAAAACQAAAAAcAAAACAAAACgAAAAIAAAAKQAAAA4A#####wAAAA0AAAAHAwAAAAE#8AAAAAAAAAAAAAoAAAAGAAAACAAAACUAAAAQAP####8AAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAANAAAALQAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAACAAAAAtAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAIgAAAC0AAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAeAAAALf####8AAAABAAxDVHJhbnNsYXRpb24A#####wAAAA0AAAAqAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAALgAAADIAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAvAAAAMgAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAADAAAAAyAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAMQAAADIAAAACAP####8AAm55AAE1AAAAAUAUAAAAAAAAAAAAAwD#####AAJyMwAlc2koKG1vZHVsb3goeCk9MSkqKG1vZHVsb3koeCk9MSksMSwwKQAAAAkAAAAABwIAAAAHCAAAAAoAAAAEAAAABQAAAAAAAAABP#AAAAAAAAAAAAAHCAAAAAoAAAAFAAAABQAAAAAAAAABP#AAAAAAAAAAAAABP#AAAAAAAAAAAAABAAAAAAAAAAAAAXgAAAADAP####8AAnIyACVzaSgobW9kdWxveCh4KT0wKSoobW9kdWxveSh4KT0xKSwxLDApAAAACQAAAAAHAgAAAAcIAAAACgAAAAQAAAAFAAAAAAAAAAEAAAAAAAAAAAAAAAcIAAAACgAAAAUAAAAFAAAAAAAAAAE#8AAAAAAAAAAAAAE#8AAAAAAAAAAAAAEAAAAAAAAAAAABeAAAAAMA#####wACcjEAJXNpKChtb2R1bG94KHgpPTEpKihtb2R1bG95KHgpPTApLDEsMCkAAAAJAAAAAAcCAAAABwgAAAAKAAAABAAAAAUAAAAAAAAAAT#wAAAAAAAAAAAABwgAAAAKAAAABQAAAAUAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAQAAAAAAAAAAAAF4#####wAAAAIADENDb21tZW50YWlyZQD#####AQAAAADAMQAAAAAAAMAuAAAAAAAAAAAADRAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAFB#####wAAAAEAB0NNaWxpZXUA#####wEAAAABEAACSjEAAAAAAAAAAABACAAAAAAAAAUAAAAAIAAAACL#####AAAAAQARQ1N5bWV0cmllQ2VudHJhbGUA#####wAAADwAAAAQAP####8BAAAAARAAAUoAAAAAAAAAAABACAAAAAAAAAUAAAAAHgAAAD0AAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAANAAAAPQAAABsA#####wEAAAABEAACSTEAAAAAAAAAAABACAAAAAAAAAUAAAAAIgAAAB4AAAAcAP####8AAABAAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAADQAAAEEAAAAQAP####8BAAAAARAAAUkAAAAAAAAAAABACAAAAAAAAAUAAAAAIAAAAEEAAAAZAP####8AAAANAAAAIgAAABAA#####wEAAAABEAABQQAAAAAAAAAAAEAIAAAAAAAABQAAAAANAAAARAAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAACIAAABEAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAHgAAAEQAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAgAAAARP####8AAAABAAlDUG9seWdvbmUA#####wAAAAAAAQAAAAUAAAAgAAAAPgAAAD8AAAAiAAAAIAAAAB0A#####wAAAAAAAQAAAAUAAAAeAAAAIgAAAEIAAABDAAAAHgAAAB0A#####wAAAAAAAQAAAAUAAABFAAAASAAAAEYAAABHAAAARQAAAB0A#####wAAAAAAAQAAAAUAAAANAAAAIAAAACIAAAAeAAAADQAAABYA#####wD#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAIAAAAYAAAAFwD#####AObm5gABAAAADQAAAEMAAAA+AAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEAEUNQb2ludFBhckFic2Npc3NlAP####8BAAAAABAAAVUAAAAAAAAAAABACAAAAAAAAAUAAAAADQAAAEMAAAAHAQAAAAgAAAADAAAAAT#wAAAAAAAAAAAAHgD#####AQAAAAAQAAFWAAAAAAAAAAAAQAgAAAAAAAAFAAAAAA0AAAA+AAAABwEAAAAIAAAANwAAAAE#8AAAAAAAAP####8AAAABAAhDU2VnbWVudAD#####AQAAAAAQAAABAAEAAAANAAAATwAAAB8A#####wEAAAAAEAAAAQABAAAADQAAAFAAAAAPAP####8BAAAAABAAAlUxAAAAAAAAAAAAQAgAAAAAAAAFAAE#0wPWdtnVKQAAAFEAAAAZAP####8AAAANAAAAUAAAABAA#####wEAAAAAEAACVjEAAAAAAAAAAABACAAAAAAAAAUAAAAAUwAAAFQAAAAfAP####8BAAAAABAAAAEAAQAAAFMAAABVAAAADwD#####AQAAAAAQAAJVMgAAAAAAAAAAAEAIAAAAAAAABQABP9bRs76jZ34AAABWAAAAGQD#####AAAADQAAAFcAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAANAAAAWAAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAACAAAABYAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAIgAAAFgAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAeAAAAWAAAAB0A#####wEAAAAAAQAAAAUAAABZAAAAWgAAAFsAAABcAAAAWQAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAEIAAABYAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAQwAAAFgAAAAdAP####8BAAAAAAEAAAAFAAAAXAAAAFsAAABeAAAAXwAAAFwAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAA+AAAAWAAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAD8AAABYAAAAHQD#####AQAAAAABAAAABQAAAFoAAABhAAAAYgAAAFsAAABaAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAARQAAAFgAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABIAAAAWAAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAEYAAABYAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAARwAAAFgAAAAdAP####8BAAAAAAEAAAAFAAAAZAAAAGUAAABmAAAAZwAAAGT#####AAAAAgAIQ01lc3VyZVgA#####wABeAAAAE4AAABX#####wAAAAIACENNZXN1cmVZAP####8AAXkAAABOAAAAVwAAAAIA#####wACeDEADGludCh4KzAuMDAxKQAAAAYCAAAABwAAAAAIAAAAaQAAAAE#UGJN0vGp#AAAAAIA#####wACeTEADGludCh5KzAuMDAxKQAAAAYCAAAABwAAAAAIAAAAagAAAAE#UGJN0vGp#AAAAAIA#####wADbnVtAAx4MSoyK254KjQqeTEAAAAHAAAAAAcCAAAACAAAAGsAAAABQAAAAAAAAAAAAAAHAgAAAAcCAAAACAAAAAMAAAABQBAAAAAAAAAAAAAIAAAAbAAAABsA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAFcAAABb#####wAAAAEAD0NWYWxldXJBZmZpY2hlZQD#####AQAAAADAJgAAAAAAAMAj#######wAAAAbhIAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAIAAABtAAAAAgD#####AARudW0xAAVudW0rMQAAAAcAAAAACAAAAG0AAAABP#AAAAAAAAAAAAACAP####8ABG51bScACG51bStueCoyAAAABwAAAAAIAAAAbQAAAAcCAAAACAAAAAMAAAABQAAAAAAAAAAAAAACAP####8ABW51bScxAAZudW0nKzEAAAAHAAAAAAgAAABxAAAAAT#wAAAAAAAAAAAAGwD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAWgAAAGIAAAAbAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABbAAAAZgAAABsA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAFwAAABeAAAAIgD#####AQAAAADAJgAAAAAAAMAkAAAAAAAAAAAAdRIAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAIAAABwAAAAIgD#####AQAAAADAJAAAAAAAAMAkAAAAAAAAAAAAcxIAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAIAAABxAAAAIgD#####AQAAAADAIgAAAAAAAMAgAAAAAAAAAAAAdBIAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAIAAABy#####wAAAAIAEkNMaWV1T2JqZXRQYXJQdExpZQD#####AQAAAAAAAF0AAAAIAAAANwAAAFcAAAAHAAAAVwAAAFgAAABZAAAAWgAAAFsAAABcAAAAXQAAACMA#####wEAAAAAAABjAAAACAAAADcAAABXAAAABwAAAFcAAABYAAAAWgAAAFsAAABhAAAAYgAAAGMAAAAjAP####8BAAAAAAAAaAAAAAgAAAA3AAAAVwAAAAcAAABXAAAAWAAAAGQAAABlAAAAZgAAAGcAAABoAAAAIwD#####AQAAAAAAAGAAAAAIAAAANwAAAFcAAAAHAAAAVwAAAFgAAABbAAAAXAAAAF4AAABfAAAAYAAAACMA#####wAAAAAAAAB5AAAACAAAAAMAAABTAAAACwAAAFMAAABVAAAAVgAAAFcAAABYAAAAWQAAAFoAAABbAAAAXAAAAF0AAAB5AAAAIwD#####AAAAAAAAAHwAAAAIAAAAAwAAAFMAAAALAAAAUwAAAFUAAABWAAAAVwAAAFgAAABbAAAAXAAAAF4AAABfAAAAYAAAAHwAAAAjAP####8AAAAAAAAAewAAAAgAAAADAAAAUwAAAAsAAABTAAAAVQAAAFYAAABXAAAAWAAAAGQAAABlAAAAZgAAAGcAAABoAAAAewAAACMA#####wAAAAAAAAB6AAAACAAAAAMAAABTAAAACwAAAFMAAABVAAAAVgAAAFcAAABYAAAAWgAAAFsAAABhAAAAYgAAAGMAAAB6AAAAIwD#####AQAAAAAAAG8AAAAIAAAANwAAAFcAAAAKAAAAVwAAAFgAAABbAAAAaQAAAGoAAABrAAAAbAAAAG0AAABuAAAAbwAAACMA#####wAAAAAAAACBAAAACAAAAAMAAABTAAAADgAAAFMAAABVAAAAVgAAAFcAAABYAAAAWwAAAGkAAABqAAAAawAAAGwAAABtAAAAbgAAAG8AAACBAAAAIwD#####AQAAAAAAAHYAAAAIAAAANwAAAFcAAAAMAAAAVwAAAFgAAABcAAAAXgAAAGkAAABqAAAAawAAAGwAAABtAAAAcAAAAHUAAAB2AAAAIwD#####AAAAAAAAAIMAAAAIAAAAAwAAAFMAAAAQAAAAUwAAAFUAAABWAAAAVwAAAFgAAABcAAAAXgAAAGkAAABqAAAAawAAAGwAAABtAAAAcAAAAHUAAAB2AAAAgwAAACMA#####wEAAAAAAAB4AAAACAAAADcAAABXAAAADQAAAFcAAABYAAAAWwAAAGYAAABpAAAAagAAAGsAAABsAAAAbQAAAHEAAAByAAAAdAAAAHgAAAAjAP####8AAAAAAAAAhQAAAAgAAAADAAAAUwAAABEAAABTAAAAVQAAAFYAAABXAAAAWAAAAFsAAABmAAAAaQAAAGoAAABrAAAAbAAAAG0AAABxAAAAcgAAAHQAAAB4AAAAhQAAACMA#####wEAAAAAAAB3AAAACAAAADcAAABXAAAADAAAAFcAAABYAAAAWgAAAGIAAABpAAAAagAAAGsAAABsAAAAbQAAAHEAAABzAAAAdwAAACMA#####wAAAAAAAACHAAAACAAAAAMAAABTAAAAEAAAAFMAAABVAAAAVgAAAFcAAABYAAAAWgAAAGIAAABpAAAAagAAAGsAAABsAAAAbQAAAHEAAABzAAAAdwAAAIcAAAAQAP####8B#wAAARAAAkExAMA3AAAAAAAAv#AAAAAAAAAFAAAAACIAAABEAAAAAgD#####AAJ4YgACMjQAAAABQDgAAAAAAAAAAAACAP####8AAnliAAIxNgAAAAFAMAAAAAAAAAAAAAIA#####wAEbnVtYgACNTYAAAABQEwAAAAAAAAAAAACAP####8ABG51bWMAAjMzAAAAAUBAgAAAAAAAAAAAAgD#####AAN4YzIAAjE2AAAAAUAwAAAAAAAAAAAAAgD#####AAN5YzIAAjIwAAAAAUA0AAAAAAAAAAAAAgD#####AAN4YzMAAjEyAAAAAUAoAAAAAAAAAAAAAgD#####AAN5YzMAAjI0AAAAAUA4AAAAAAAAAAAAGAD#####AQAAAAAQAAFiAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAAigAAAAgAAACLAAAAGAD#####AH8AAAAQAAJjMgAAAAAAAAAAAEAIAAAAAAAACQAAAAAcAAAACAAAAI4AAAAIAAAAjwAAABgA#####wAAAH8AEAACYzMAAAAAAAAAAABACAAAAAAAAAkAAAAAHAAAAAgAAACQAAAACAAAAJEAAAAdAP####8AAAAAAAEAAAAFAAAALgAAAC8AAAAwAAAAMQAAAC4AAAAdAP####8ALLgsAAEAAAAFAAAAMwAAADQAAAA1AAAANgAAADP#####AAAAAQAQQ1N1cmZhY2VQb2x5Z29uZQD#####AAB#AAAAAAUAAACWAAAADgD#####AAAADQAAAAcDAAAAAT#wAAAAAAAAAAAACgAAADkAAAAIAAAAjAAAABAA#####wEA#wAAEAAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAACAAAACYAAAAEAD#####AQD#AAAQAAAAAAAAAAAAAABACAAAAAAAAAkAAAAAPgAAAJgAAAAQAP####8BAP8AABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAAA#AAAAmAAAABAA#####wEA#wAAEAAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAACIAAACYAAAAHQD#####AAAAAAABAAAABQAAAJkAAACaAAAAmwAAAJwAAACZAAAAGQD#####AAAADQAAAJIAAAAQAP####8BAP8AABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAACZAAAAngAAABAA#####wEA#wAAEAAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAAJoAAACeAAAAEAD#####AQD#AAAQAAAAAAAAAAAAAABACAAAAAAAAAkAAAAAmwAAAJ4AAAAQAP####8BAP8AABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAACcAAAAngAAAB0A#####wD#AAAAAQAAAAUAAACfAAAAoAAAAKEAAACiAAAAnwAAACQA#####wD#AAAAAAAFAAAAowAAABkA#####wAAAA0AAAAr#####wAAAAEAC0NNYWNyb1BhdXNlAP####8AAAAAAf####8QQI70AAAAAABAQcKPXCj1wwIAAAAAAAAAAAAAAAABAAAAAAAAAAAABVBhdXNlAAAAAAACAAAADgD#####AAAADQAAAAcDAAAAAT#wAAAAAAAAAAAACgAAADgAAAAIAAAAjQAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAEUAAACnAAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAASAAAAKcAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABGAAAApwAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAEcAAACnAAAAHQD#####Af8AAAABAAAABQAAAKgAAACpAAAAqgAAAKsAAACoAAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAqAAAAKUAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAACpAAAApQAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAKoAAAClAAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAqwAAAKUAAAAdAP####8AAAB#AAEAAAAFAAAArQAAAK4AAACvAAAAsAAAAK0AAAAkAP####8AAAB#AAAABQAAALH#####AAAAAQASQ0FyY0RlQ2VyY2xlRGlyZWN0AP####8B##8AAAEAAACUAAAArf####8AAAABQFaAAAAAAAD#####AAAAAQAPQ1BvaW50TGllQ2VyY2xlAP####8BAAB#ARAAAAAAAAAAAAAAAEAIAAAAAAAABQABP10AlhldV+MAAACzAAAADQD#####AAAALAAAAAFAVoAAAAAAAAAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAADMAAAC1AAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAANAAAALUAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAA1AAAAtQAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAADYAAAC1AAAAHQD#####AQB#AAABAAAABQAAALYAAAC3AAAAuAAAALkAAAC2AAAAJAD#####AQB#AAAAAAUAAAC6AAAADQD#####AAAAlAAAAAFAVoAAAAAAAAAAABAA#####wEAfwAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAK0AAAC8AAAAEAD#####AQB#AAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAArgAAALwAAAAQAP####8BAH8AABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAACvAAAAvAAAABAA#####wEAfwAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAALAAAAC8AAAAHQD#####AQAAfwABAAAABQAAAL0AAAC+AAAAvwAAAMAAAAC9AAAAJAD#####AQAAfwAAAAUAAADBAAAADQD#####AAAAk#####8AAAABAAxDTW9pbnNVbmFpcmUAAAABQFaAAAAAAAAAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAACfAAAAwwAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAKAAAADDAAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAoQAAAMMAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAACiAAAAwwAAAB0A#####wH#AAAAAQAAAAUAAADEAAAAxQAAAMYAAADHAAAAxAAAACQA#####wH#AAAAAAAFAAAAyAAAACYA#####wH#AAAAAQAAACwAAAAq#####wAAAAFAVoAAAAAAAAAAACcA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAE#Zs#fPkSCoAAAAMr#####AAAAAQAUQ0ltcGxlbWVudGF0aW9uUHJvdG8A#####wAXTWVzdXJlIGQnYW5nbGUgb3JpZW50w6kAAAACAAAAAwAAAAMAAAAqAAAALAAAAMv#####AAAAAQAMQ0Jpc3NlY3RyaWNlAAAAAMwBAAAAABAAAAEAAQAAAMsAAAAsAAAAKgAAAA8AAAAAzAEAAAAAEAAAAAAAAAAAAAAAP+MzMzMzMzMFAAFAaT5Clg7dyQAAAM3#####AAAAAgATQ01lc3VyZUFuZ2xlT3JpZW50ZQEAAADMAAZhbmdsZTEAAAAqAAAALAAAAMsAAAAiAQAAAMwB#wAAAEAIAAAAAAAAP#AAAAAAAAAAAADODwAAAAAAAQAAAAEAAAABAAAAAAAAAAAAAAACwrAAAAAAz#####8AAAACABNDTWFycXVlQW5nbGVPcmllbnRlAQAAAMwB#wAAAAEAAAABQEJbiQkrj78AAAAqAAAALAAAAMsAAAAADQD#####AAAALAAAAAgAAADPAAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAMwAAANIAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAA0AAAA0gAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAADUAAADSAAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAANgAAANIAAAAdAP####8BAH8AAAEAAAAFAAAA0wAAANQAAADVAAAA1gAAANMAAAAkAP####8BAH8AAAAABQAAANf#####AAAAAgAXQ01hY3JvQW5pbWF0aW9uUG9pbnRMaWUA#####wAAfwAB#####xBAjwQAAAAAAEBi8KPXCj1xAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAHdG91cm5lMQAAAAAAABQAAABkAAAAAAAAAMsAAQAAAAApAP####8AF01lc3VyZSBkJ2FuZ2xlIG9yaWVudMOpAAAAAgAAAAMAAAADAAAArQAAAJQAAAC0AAAAKgAAAADaAQAAAAAQAAABAAEAAAC0AAAAlAAAAK0AAAAPAAAAANoBAAAAABAAAAAAAAAAAAAAAD#jMzMzMzMzBQABQGk+QpYO3ckAAADbAAAAKwEAAADaAAZhbmdsZTMAAACtAAAAlAAAALQAAAAiAQAAANoBAH8AAEAIAAAAAAAAP#AAAAAAAAAAAADcDwAAAAAAAQAAAAEAAAABAAAAAAAAAAAAAAACwrAAAAAA3QAAACwBAAAA2gEAfwAAAQAAAAFAQluJCSuPvwAAAK0AAACUAAAAtAAAAAANAP####8AAACUAAAACAAAAN0AAAAQAP####8BAH8AABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAACtAAAA4AAAABAA#####wEAfwAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAK4AAADgAAAAEAD#####AQB#AAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAArwAAAOAAAAAQAP####8BAH8AABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAACwAAAA4AAAAB0A#####wEAAH8AAQAAAAUAAADhAAAA4gAAAOMAAADkAAAA4QAAACQA#####wEAAH8AAAAFAAAA5QAAAC0A#####wAAAH8B#####wpAj1wAAAAAAEBo8KPXCj1xAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAHdG91cm5lMwAAAAAAABQAAABkAAAAPAAAALQAAQD#####AAAAAQAUQ0FyY0RlQ2VyY2xlSW5kaXJlY3QA#####wEAAH8AAQAAAJMAAACf#####wAAACgAAAABQFaAAAAAAAAAAAAnAP####8BAAB#ABAAAAAAAAAAAAAAAEAIAAAAAAAABQABP+#fkVF76cAAAADoAAAAKQD#####ABdNZXN1cmUgZCdhbmdsZSBvcmllbnTDqQAAAAIAAAADAAAAAwAAAJ8AAACTAAAA6QAAACoAAAAA6gEAAAAAEAAAAQABAAAA6QAAAJMAAACfAAAADwAAAADqAQAAAAAQAAAAAAAAAAAAAAA#4zMzMzMzMwUAAUBpPkKWDt3JAAAA6wAAACsBAAAA6gAGYW5nbGUyAAAAnwAAAJMAAADpAAAAIgEAAADqAQAAfwBACAAAAAAAAD#wAAAAAAAAAAAA7A8AAAAAAAEAAAABAAAAAQAAAAAAAAAAAAAAAsKwAAAAAO0AAAAsAQAAAOoBAAB#AAEAAAABQEJbiQkrj78AAACfAAAAkwAAAOkAAAAADQD#####AAAAkwAAAAgAAADtAAAAEAD#####AQAAfwAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAnwAAAPAAAAAQAP####8BAAB#ABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAACgAAAA8AAAABAA#####wEAAH8AEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAKEAAADwAAAAEAD#####AQAAfwAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAogAAAPAAAAAdAP####8B#wAAAAEAAAAFAAAA8QAAAPIAAADzAAAA9AAAAPEAAAAkAP####8B#wAAAAAABQAAAPUAAAAtAP####8A#wAAAf####8KQI7sAAAAAABAXGFHrhR64gIAAAAAAAAAAAAAAAABAAAAAAAAAAAAB3RvdXJuZTIAAAAAAAAUAAAAZAAAADwAAADpAAEA################"
			this.MG32codeBase64corr = "TWF0aEdyYXBoSmF2YTEuMAAAABI+0euFAAJmcv###wEA#wEAAAAAAAAAAAUcAAAC0gAAAQEAAAAAAAAAAQAAAQL#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAHQ0NhbGN1bAD#####AAVBbmdsZQABMAAAAAEAAAAAAAAAAAAAAAIA#####wAEWm9vbQACMzAAAAABQD4AAAAAAAAAAAACAP####8AAm54AAE1AAAAAUAUAAAAAAAA#####wAAAAEABUNGb25jAP####8AB21vZHVsb3gACG1vZCh4LDIp#####wAAAAEADUNGb25jdGlvbjJWYXIG#####wAAAAIAEUNWYXJpYWJsZUZvcm1lbGxlAAAAAAAAAAFAAAAAAAAAAAABeAAAAAMA#####wAHbW9kdWxveQASbW9kKGludCh5L254LzIpLDIpAAAABAb#####AAAAAgAJQ0ZvbmN0aW9uAv####8AAAABAApDT3BlcmF0aW9uAwAAAAcDAAAABQAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAAwAAAAFAAAAAAAAAAAAAAAFAAAAAAAAAAAABeQAAAAMA#####wACcjAAJXNpKChtb2R1bG94KHgpPTApKihtb2R1bG95KHgpPTApLDEsMCn#####AAAAAQANQ0ZvbmN0aW9uM1ZhcgAAAAAHAgAAAAcI#####wAAAAEADkNBcHBlbEZvbmN0aW9uAAAABAAAAAUAAAAAAAAAAQAAAAAAAAAAAAAABwgAAAAKAAAABQAAAAUAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAQAAAAAAAAAAAAF4AAAAAgD#####AAJ5RAABNAAAAAFAEAAAAAAAAAAAAAIA#####wACeEQAATAAAAABAAAAAAAAAAAAAAACAP####8AAnlDAAE0AAAAAUAQAAAAAAAAAAAAAgD#####AAJ4QwABNAAAAAFAEAAAAAAAAAAAAAIA#####wACeUIAATAAAAABAAAAAAAAAAAAAAACAP####8AAnhCAAE0AAAAAUAQAAAAAAAA#####wAAAAEACkNQb2ludEJhc2UA#####wAAAAAAEAABTwDAMgAAAAAAAMAzAAAAAAAABQABQEtAAAAAAABAUSFHrhR64v####8AAAABABRDRHJvaXRlRGlyZWN0aW9uRml4ZQD#####Af8AAAEQAAABAAIAAAANAD#3Cj1wo9cK#####wAAAAEACUNSb3RhdGlvbgD#####AAAADQAAAAFAVoAAAAAAAP####8AAAABAAtDSG9tb3RoZXRpZQD#####AAAADQAAAAcDAAAAAT#wAAAAAAAAAAAACAAAAAL#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQABQGeAAAAAAAAAAAAOAAAADQD#####AAAADQAAAAgAAAAB#####wAAAAEAC0NQb2ludEltYWdlAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAARAAAAEv####8AAAABAA5DUG9pbnRMaWVQb2ludAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAE#####8AAAABAAlDQ2VyY2xlT0EA#####wH#AAAAAgAAAA0AAAAU#####wAAAAEADUNEZW1pRHJvaXRlT0EA#####wH#AAAADQAAAQACAAAADQAAABT#####AAAAAQAQQ0RlbWlEcm9pdGVJbWFnZQD#####Af8AAAANAAABAAIAAAAWAAAAD#####8AAAABABBDSW50RHJvaXRlQ2VyY2xlAP####8AAAAXAAAAFf####8AAAABABBDUG9pbnRMaWVCaXBvaW50AP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQABAAAAGAAAABAA#####wH#AAAAEAACSicAAAAAAAAAAABACAAAAAAAAAUAAAAAFAAAABAAAAAQAP####8B#wAAABAAAkknAAAAAAAAAAAAQAgAAAAAAAAFAAAAABkAAAAQ#####wAAAAIAB0NSZXBlcmUA#####wDm5uYBAQAAAA0AAAAbAAAAGgAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAE#8AAAAAAAAAAAAAE#8AAAAAAAAP####8AAAABABBDUG9pbnREYW5zUmVwZXJlAP####8B#wAAARAAAkInAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAADAAAAAgAAAALAAAAEQD#####AQAAAAAQAAFCAEAAAAAAAAAAwDcAAAAAAAAFAAAAAB0AAAAYAP####8B#wAAARAAAkQnAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAACAAAAAgAAAAHAAAAEQD#####AQAAAAAQAAFEAMAxAAAAAAAAwCoAAAAAAAAFAAAAAB8AAAAYAP####8B#wAAARAAAkMnAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAACgAAAAgAAAAJAAAAEQD#####AQAAAAAQAAFDAEAIAAAAAAAAv#AAAAAAAAAFAAAAACEAAAACAP####8AAnhhAAIxMgAAAAFAKAAAAAAAAAAAAAIA#####wACeWEAATgAAAABQCAAAAAAAAAAAAACAP####8ABG51bWEAATAAAAABAAAAAAAAAAAAAAACAP####8AAnhjAAE4AAAAAUAgAAAAAAAAAAAAAgD#####AAJ5YwABOAAAAAFAIAAAAAAAAAAAAAIA#####wADeGMxAAE4AAAAAUAgAAAAAAAAAAAAAgD#####AAN5YzEAAjE2AAAAAUAwAAAAAAAAAAAAGAD#####AQAAAAAQAAFhAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAAIwAAAAgAAAAkAAAAGAD#####AQAAAAAQAAFjAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAAJgAAAAgAAAAnAAAAGAD#####AQnMCQAQAAJjMQAAAAAAAAAAAEAIAAAAAAAACQAAAAAcAAAACAAAACgAAAAIAAAAKQAAAA4A#####wAAAA0AAAAHAwAAAAE#8AAAAAAAAAAAAAoAAAAGAAAACAAAACUAAAAQAP####8AAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAANAAAALQAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAACAAAAAtAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAIgAAAC0AAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAeAAAALf####8AAAABAAxDVHJhbnNsYXRpb24A#####wAAAA0AAAAqAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAALgAAADIAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAvAAAAMgAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAADAAAAAyAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAMQAAADIAAAACAP####8AAm55AAE1AAAAAUAUAAAAAAAAAAAAAwD#####AAJyMwAlc2koKG1vZHVsb3goeCk9MSkqKG1vZHVsb3koeCk9MSksMSwwKQAAAAkAAAAABwIAAAAHCAAAAAoAAAAEAAAABQAAAAAAAAABP#AAAAAAAAAAAAAHCAAAAAoAAAAFAAAABQAAAAAAAAABP#AAAAAAAAAAAAABP#AAAAAAAAAAAAABAAAAAAAAAAAAAXgAAAADAP####8AAnIyACVzaSgobW9kdWxveCh4KT0wKSoobW9kdWxveSh4KT0xKSwxLDApAAAACQAAAAAHAgAAAAcIAAAACgAAAAQAAAAFAAAAAAAAAAEAAAAAAAAAAAAAAAcIAAAACgAAAAUAAAAFAAAAAAAAAAE#8AAAAAAAAAAAAAE#8AAAAAAAAAAAAAEAAAAAAAAAAAABeAAAAAMA#####wACcjEAJXNpKChtb2R1bG94KHgpPTEpKihtb2R1bG95KHgpPTApLDEsMCkAAAAJAAAAAAcCAAAABwgAAAAKAAAABAAAAAUAAAAAAAAAAT#wAAAAAAAAAAAABwgAAAAKAAAABQAAAAUAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAQAAAAAAAAAAAAF4#####wAAAAIADENDb21tZW50YWlyZQD#####AQAAAADAMQAAAAAAAMAuAAAAAAAAAAAADRAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAFB#####wAAAAEAB0NNaWxpZXUA#####wEAAAABEAACSjEAAAAAAAAAAABACAAAAAAAAAUAAAAAIAAAACL#####AAAAAQARQ1N5bWV0cmllQ2VudHJhbGUA#####wAAADwAAAAQAP####8BAAAAARAAAUoAAAAAAAAAAABACAAAAAAAAAUAAAAAHgAAAD0AAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAANAAAAPQAAABsA#####wEAAAABEAACSTEAAAAAAAAAAABACAAAAAAAAAUAAAAAIgAAAB4AAAAcAP####8AAABAAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAADQAAAEEAAAAQAP####8BAAAAARAAAUkAAAAAAAAAAABACAAAAAAAAAUAAAAAIAAAAEEAAAAZAP####8AAAANAAAAIgAAABAA#####wEAAAABEAABQQAAAAAAAAAAAEAIAAAAAAAABQAAAAANAAAARAAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAACIAAABEAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAHgAAAEQAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAgAAAARP####8AAAABAAlDUG9seWdvbmUA#####wEAAAAAAQAAAAUAAAAgAAAAPgAAAD8AAAAiAAAAIAAAAB0A#####wAAAAAAAQAAAAUAAAAeAAAAIgAAAEIAAABDAAAAHgAAAB0A#####wAAAAAAAQAAAAUAAABFAAAASAAAAEYAAABHAAAARQAAAB0A#####wAAAAAAAQAAAAUAAAANAAAAIAAAACIAAAAeAAAADQAAABYA#####wD#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAIAAAAYAAAAFwD#####AObm5gABAAAADQAAAEMAAAA+AAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEAEUNQb2ludFBhckFic2Npc3NlAP####8BAAAAABAAAVUAAAAAAAAAAABACAAAAAAAAAUAAAAADQAAAEMAAAAHAQAAAAgAAAADAAAAAT#wAAAAAAAAAAAAHgD#####AQAAAAAQAAFWAAAAAAAAAAAAQAgAAAAAAAAFAAAAAA0AAAA+AAAABwEAAAAIAAAANwAAAAE#8AAAAAAAAP####8AAAABAAhDU2VnbWVudAD#####AQAAAAAQAAABAAEAAAANAAAATwAAAB8A#####wEAAAAAEAAAAQABAAAADQAAAFAAAAAPAP####8BAAAAABAAAlUxAAAAAAAAAAAAQAgAAAAAAAAFAAE#0wPWdtnVKQAAAFEAAAAZAP####8AAAANAAAAUAAAABAA#####wEAAAAAEAACVjEAAAAAAAAAAABACAAAAAAAAAUAAAAAUwAAAFQAAAAfAP####8BAAAAABAAAAEAAQAAAFMAAABVAAAADwD#####AQAAAAAQAAJVMgAAAAAAAAAAAEAIAAAAAAAABQABP9bRs76jZ34AAABWAAAAGQD#####AAAADQAAAFcAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAANAAAAWAAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAACAAAABYAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAIgAAAFgAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAeAAAAWAAAAB0A#####wEAAAAAAQAAAAUAAABZAAAAWgAAAFsAAABcAAAAWQAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAEIAAABYAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAQwAAAFgAAAAdAP####8BAAAAAAEAAAAFAAAAXAAAAFsAAABeAAAAXwAAAFwAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAA+AAAAWAAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAD8AAABYAAAAHQD#####AQAAAAABAAAABQAAAFoAAABhAAAAYgAAAFsAAABaAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAARQAAAFgAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABIAAAAWAAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAEYAAABYAAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAARwAAAFgAAAAdAP####8BAAAAAAEAAAAFAAAAZAAAAGUAAABmAAAAZwAAAGT#####AAAAAgAIQ01lc3VyZVgA#####wABeAAAAE4AAABX#####wAAAAIACENNZXN1cmVZAP####8AAXkAAABOAAAAVwAAAAIA#####wACeDEADGludCh4KzAuMDAxKQAAAAYCAAAABwAAAAAIAAAAaQAAAAE#UGJN0vGp#AAAAAIA#####wACeTEADGludCh5KzAuMDAxKQAAAAYCAAAABwAAAAAIAAAAagAAAAE#UGJN0vGp#AAAAAIA#####wADbnVtAAx4MSoyK254KjQqeTEAAAAHAAAAAAcCAAAACAAAAGsAAAABQAAAAAAAAAAAAAAHAgAAAAcCAAAACAAAAAMAAAABQBAAAAAAAAAAAAAIAAAAbAAAABsA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAFcAAABb#####wAAAAEAD0NWYWxldXJBZmZpY2hlZQD#####AQAAAADAJgAAAAAAAMAj#######wAAAAbhIAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAIAAABtAAAAAgD#####AARudW0xAAVudW0rMQAAAAcAAAAACAAAAG0AAAABP#AAAAAAAAAAAAACAP####8ABG51bScACG51bStueCoyAAAABwAAAAAIAAAAbQAAAAcCAAAACAAAAAMAAAABQAAAAAAAAAAAAAACAP####8ABW51bScxAAZudW0nKzEAAAAHAAAAAAgAAABxAAAAAT#wAAAAAAAAAAAAGwD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAWgAAAGIAAAAbAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABbAAAAZgAAABsA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAFwAAABeAAAAIgD#####AQAAAADAJgAAAAAAAMAkAAAAAAAAAAAAdRIAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAIAAABwAAAAIgD#####AQAAAADAJAAAAAAAAMAkAAAAAAAAAAAAcxIAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAIAAABxAAAAIgD#####AQAAAADAIgAAAAAAAMAgAAAAAAAAAAAAdBIAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAIAAABy#####wAAAAIAEkNMaWV1T2JqZXRQYXJQdExpZQD#####AQAAAAAAAF0AAAAIAAAANwAAAFcAAAAHAAAAVwAAAFgAAABZAAAAWgAAAFsAAABcAAAAXQAAACMA#####wEAAAAAAABjAAAACAAAADcAAABXAAAABwAAAFcAAABYAAAAWgAAAFsAAABhAAAAYgAAAGMAAAAjAP####8BAAAAAAAAaAAAAAgAAAA3AAAAVwAAAAcAAABXAAAAWAAAAGQAAABlAAAAZgAAAGcAAABoAAAAIwD#####AQAAAAAAAGAAAAAIAAAANwAAAFcAAAAHAAAAVwAAAFgAAABbAAAAXAAAAF4AAABfAAAAYAAAACMA#####wAAAAAAAAB5AAAACAAAAAMAAABTAAAACwAAAFMAAABVAAAAVgAAAFcAAABYAAAAWQAAAFoAAABbAAAAXAAAAF0AAAB5AAAAIwD#####AAAAAAAAAHwAAAAIAAAAAwAAAFMAAAALAAAAUwAAAFUAAABWAAAAVwAAAFgAAABbAAAAXAAAAF4AAABfAAAAYAAAAHwAAAAjAP####8AAAAAAAAAewAAAAgAAAADAAAAUwAAAAsAAABTAAAAVQAAAFYAAABXAAAAWAAAAGQAAABlAAAAZgAAAGcAAABoAAAAewAAACMA#####wAAAAAAAAB6AAAACAAAAAMAAABTAAAACwAAAFMAAABVAAAAVgAAAFcAAABYAAAAWgAAAFsAAABhAAAAYgAAAGMAAAB6AAAAIwD#####AQAAAAAAAG8AAAAIAAAANwAAAFcAAAAKAAAAVwAAAFgAAABbAAAAaQAAAGoAAABrAAAAbAAAAG0AAABuAAAAbwAAACMA#####wAAAAAAAACBAAAACAAAAAMAAABTAAAADgAAAFMAAABVAAAAVgAAAFcAAABYAAAAWwAAAGkAAABqAAAAawAAAGwAAABtAAAAbgAAAG8AAACBAAAAIwD#####AQAAAAAAAHYAAAAIAAAANwAAAFcAAAAMAAAAVwAAAFgAAABcAAAAXgAAAGkAAABqAAAAawAAAGwAAABtAAAAcAAAAHUAAAB2AAAAIwD#####AAAAAAAAAIMAAAAIAAAAAwAAAFMAAAAQAAAAUwAAAFUAAABWAAAAVwAAAFgAAABcAAAAXgAAAGkAAABqAAAAawAAAGwAAABtAAAAcAAAAHUAAAB2AAAAgwAAACMA#####wEAAAAAAAB4AAAACAAAADcAAABXAAAADQAAAFcAAABYAAAAWwAAAGYAAABpAAAAagAAAGsAAABsAAAAbQAAAHEAAAByAAAAdAAAAHgAAAAjAP####8AAAAAAAAAhQAAAAgAAAADAAAAUwAAABEAAABTAAAAVQAAAFYAAABXAAAAWAAAAFsAAABmAAAAaQAAAGoAAABrAAAAbAAAAG0AAABxAAAAcgAAAHQAAAB4AAAAhQAAACMA#####wEAAAAAAAB3AAAACAAAADcAAABXAAAADAAAAFcAAABYAAAAWgAAAGIAAABpAAAAagAAAGsAAABsAAAAbQAAAHEAAABzAAAAdwAAACMA#####wAAAAAAAACHAAAACAAAAAMAAABTAAAAEAAAAFMAAABVAAAAVgAAAFcAAABYAAAAWgAAAGIAAABpAAAAagAAAGsAAABsAAAAbQAAAHEAAABzAAAAdwAAAIcAAAAQAP####8B#wAAARAAAkExAMA3AAAAAAAAv#AAAAAAAAAFAAAAACIAAABEAAAAAgD#####AAJ4YgACMjQAAAABQDgAAAAAAAAAAAACAP####8AAnliAAIxNgAAAAFAMAAAAAAAAAAAAAIA#####wAEbnVtYgACNTYAAAABQEwAAAAAAAAAAAACAP####8ABG51bWMAAjMzAAAAAUBAgAAAAAAAAAAAAgD#####AAN4YzIAAjE2AAAAAUAwAAAAAAAAAAAAAgD#####AAN5YzIAAjIwAAAAAUA0AAAAAAAAAAAAAgD#####AAN4YzMAAjEyAAAAAUAoAAAAAAAAAAAAAgD#####AAN5YzMAAjI0AAAAAUA4AAAAAAAAAAAAGAD#####AQAAAAAQAAFiAAAAAAAAAAAAQAgAAAAAAAAFAAAAABwAAAAIAAAAigAAAAgAAACLAAAAGAD#####AX8AAAAQAAJjMgAAAAAAAAAAAEAIAAAAAAAACQAAAAAcAAAACAAAAI4AAAAIAAAAjwAAABgA#####wEAAH8AEAACYzMAAAAAAAAAAABACAAAAAAAAAkAAAAAHAAAAAgAAACQAAAACAAAAJEAAAAdAP####8AAAAAAAEAAAAFAAAALgAAAC8AAAAwAAAAMQAAAC4AAAAdAP####8BLLgsAAEAAAAFAAAAMwAAADQAAAA1AAAANgAAADP#####AAAAAQAQQ1N1cmZhY2VQb2x5Z29uZQD#####AQB#AAAAAAUAAACWAAAADgD#####AAAADQAAAAcDAAAAAT#wAAAAAAAAAAAACgAAADkAAAAIAAAAjAAAABAA#####wEA#wAAEAAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAACAAAACYAAAAEAD#####AQD#AAAQAAAAAAAAAAAAAABACAAAAAAAAAkAAAAAPgAAAJgAAAAQAP####8BAP8AABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAAA#AAAAmAAAABAA#####wEA#wAAEAAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAACIAAACYAAAAHQD#####AAAAAAABAAAABQAAAJkAAACaAAAAmwAAAJwAAACZAAAAGQD#####AAAADQAAAJIAAAAQAP####8BAP8AABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAACZAAAAngAAABAA#####wEA#wAAEAAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAAJoAAACeAAAAEAD#####AQD#AAAQAAAAAAAAAAAAAABACAAAAAAAAAkAAAAAmwAAAJ4AAAAQAP####8BAP8AABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAACcAAAAngAAAB0A#####wH#AAAAAQAAAAUAAACfAAAAoAAAAKEAAACiAAAAnwAAACQA#####wH#AAAAAAAFAAAAowAAABkA#####wAAAA0AAAAr#####wAAAAEAC0NNYWNyb1BhdXNlAP####8AAAAAAf####8QQI70AAAAAABAQcKPXCj1wwIAAAAAAAAAAAAAAAABAAAAAAAAAAAABVBhdXNlAAAAAAACAAAADgD#####AAAADQAAAAcDAAAAAT#wAAAAAAAAAAAACgAAADgAAAAIAAAAjQAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAEUAAACnAAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAASAAAAKcAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABGAAAApwAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAEcAAACnAAAAHQD#####Af8AAAABAAAABQAAAKgAAACpAAAAqgAAAKsAAACoAAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAqAAAAKUAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAACpAAAApQAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAKoAAAClAAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAqwAAAKUAAAAdAP####8BAAB#AAEAAAAFAAAArQAAAK4AAACvAAAAsAAAAK0AAAAkAP####8BAAB#AAAABQAAALH#####AAAAAQASQ0FyY0RlQ2VyY2xlRGlyZWN0AP####8B##8AAAEAAACUAAAArf####8AAAABQFaAAAAAAAD#####AAAAAQAPQ1BvaW50TGllQ2VyY2xlAP####8BAAB#ARAAAAAAAAAAAAAAAEAIAAAAAAAABQABP10AlhldV+MAAACzAAAADQD#####AAAALAAAAAFAVoAAAAAAAAAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAADMAAAC1AAAAEAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAANAAAALUAAAAQAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAA1AAAAtQAAABAA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAADYAAAC1AAAAHQD#####AAB#AAABAAAABQAAALYAAAC3AAAAuAAAALkAAAC2AAAAJAD#####AQB#AAAAAAUAAAC6AAAADQD#####AAAAlAAAAAFAVoAAAAAAAAAAABAA#####wEAfwAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAK0AAAC8AAAAEAD#####AQB#AAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAArgAAALwAAAAQAP####8BAH8AABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAACvAAAAvAAAABAA#####wEAfwAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAALAAAAC8AAAAHQD#####AQAAfwABAAAABQAAAL0AAAC+AAAAvwAAAMAAAAC9AAAAJAD#####AQAAfwAAAAUAAADBAAAADQD#####AAAAk#####8AAAABAAxDTW9pbnNVbmFpcmUAAAABQFaAAAAAAAAAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAACfAAAAwwAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAKAAAADDAAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAoQAAAMMAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAACiAAAAwwAAAB0A#####wH#AAAAAQAAAAUAAADEAAAAxQAAAMYAAADHAAAAxAAAACQA#####wH#AAAAAAAFAAAAyAAAACYA#####wH#AAAAAQAAACwAAAAq#####wAAAAFAVoAAAAAAAAAAACcA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAE#Zs#fPkSCoAAAAMr#####AAAAAQAUQ0ltcGxlbWVudGF0aW9uUHJvdG8A#####wAXTWVzdXJlIGQnYW5nbGUgb3JpZW50w6kAAAACAAAAAwAAAAMAAAAqAAAALAAAAMv#####AAAAAQAMQ0Jpc3NlY3RyaWNlAAAAAMwBAAAAABAAAAEAAQAAAMsAAAAsAAAAKgAAAA8AAAAAzAEAAAAAEAAAAAAAAAAAAAAAP+MzMzMzMzMFAAFAaT5Clg7dyQAAAM3#####AAAAAgATQ01lc3VyZUFuZ2xlT3JpZW50ZQEAAADMAAZhbmdsZTEAAAAqAAAALAAAAMsAAAAiAQAAAMwB#wAAAEAIAAAAAAAAP#AAAAAAAAAAAADODwAAAAAAAQAAAAEAAAABAAAAAAAAAAAAAAACwrAAAAAAz#####8AAAACABNDTWFycXVlQW5nbGVPcmllbnRlAQAAAMwB#wAAAAEAAAABQEJbiQkrj78AAAAqAAAALAAAAMsAAAAADQD#####AAAALAAAAAgAAADPAAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAMwAAANIAAAAQAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAA0AAAA0gAAABAA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAADUAAADSAAAAEAD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAANgAAANIAAAAdAP####8BAH8AAAEAAAAFAAAA0wAAANQAAADVAAAA1gAAANMAAAAkAP####8BAH8AAAAABQAAANf#####AAAAAgAXQ01hY3JvQW5pbWF0aW9uUG9pbnRMaWUA#####wAAfwAB#####xBAjwQAAAAAAEBi8KPXCj1xAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAHdG91cm5lMQAAAQAAAB4AAABkAAAAPAAAAMsAAQAAAAApAP####8AF01lc3VyZSBkJ2FuZ2xlIG9yaWVudMOpAAAAAgAAAAMAAAADAAAArQAAAJQAAAC0AAAAKgAAAADaAQAAAAAQAAABAAEAAAC0AAAAlAAAAK0AAAAPAAAAANoBAAAAABAAAAAAAAAAAAAAAD#jMzMzMzMzBQABQGk+QpYO3ckAAADbAAAAKwEAAADaAAZhbmdsZTMAAACtAAAAlAAAALQAAAAiAQAAANoBAH8AAEAIAAAAAAAAP#AAAAAAAAAAAADcDwAAAAAAAQAAAAEAAAABAAAAAAAAAAAAAAACwrAAAAAA3QAAACwBAAAA2gEAfwAAAQAAAAFAQluJCSuPvwAAAK0AAACUAAAAtAAAAAANAP####8AAACUAAAACAAAAN0AAAAQAP####8BAH8AABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAACtAAAA4AAAABAA#####wEAfwAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAK4AAADgAAAAEAD#####AQB#AAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAArwAAAOAAAAAQAP####8BAH8AABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAACwAAAA4AAAAB0A#####wEAAH8AAQAAAAUAAADhAAAA4gAAAOMAAADkAAAA4QAAACQA#####wEAAH8AAAAFAAAA5QAAAC0A#####wAAAH8B#####wpAj1wAAAAAAEBo8KPXCj1xAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAHdG91cm5lMwAAAQAAAB4AAABkAAAAPAAAALQAAQD#####AAAAAQAUQ0FyY0RlQ2VyY2xlSW5kaXJlY3QA#####wEAAH8AAQAAAJMAAACf#####wAAACgAAAABQFaAAAAAAAAAAAAnAP####8BAAB#ABAAAAAAAAAAAAAAAEAIAAAAAAAABQABP+#fkVF76cAAAADoAAAAKQD#####ABdNZXN1cmUgZCdhbmdsZSBvcmllbnTDqQAAAAIAAAADAAAAAwAAAJ8AAACTAAAA6QAAACoAAAAA6gEAAAAAEAAAAQABAAAA6QAAAJMAAACfAAAADwAAAADqAQAAAAAQAAAAAAAAAAAAAAA#4zMzMzMzMwUAAUBpPkKWDt3JAAAA6wAAACsBAAAA6gAGYW5nbGUyAAAAnwAAAJMAAADpAAAAIgEAAADqAQAAfwBACAAAAAAAAD#wAAAAAAAAAAAA7A8AAAAAAAEAAAABAAAAAQAAAAAAAAAAAAAAAsKwAAAAAO0AAAAsAQAAAOoBAAB#AAEAAAABQEJbiQkrj78AAACfAAAAkwAAAOkAAAAADQD#####AAAAkwAAAAgAAADtAAAAEAD#####AQAAfwAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAnwAAAPAAAAAQAP####8BAAB#ABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAACgAAAA8AAAABAA#####wEAAH8AEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAKEAAADwAAAAEAD#####AQAAfwAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAogAAAPAAAAAdAP####8B#wAAAAEAAAAFAAAA8QAAAPIAAADzAAAA9AAAAPEAAAAkAP####8B#wAAAAAABQAAAPUAAAAtAP####8A#wAAAf####8KQI7sAAAAAABAXGFHrhR64gIAAAAAAAAAAAAAAAABAAAAAAAAAAAAB3RvdXJuZTIAAAEAAAAeAAAAZAAAADwAAADpAAEA#####wAAAAEAEUNNYWNyb0Rpc3Bhcml0aW9uAP####8AAH8AAf####8KQIe0AAAAAABAcLhR64UeuAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAB21hc3F1ZTEAAAAAAAcAAACWAAAAlwAAAEkAAAC7AAAALAAAANcAAADY#####wAAAAEAEENNYWNyb0FwcGFyaXRpb24A#####wAAfwAB#####wpAiCQAAAAAAEByuFHrhR64AgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAJYXBwYXJhaXQxAAAAAAAHAAAAlgAAAJcAAABJAAAAuwAAACwAAADXAAAA2AD#####AAAAAQARQ01hY3JvU3VpdGVNYWNyb3MA#####wAAfwAB#####wpAQ8AAAAAAAEApCj1wo9cMAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAMQ29ycmVjdGlvbiBhAAAAAAAEAAAA+QAAANkAAAD4AAAApgAAAC8A#####wAAAH8B#####xBAj5QAAAAAAEBs8KPXCj1xAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAHbWFzcXVlMwAAAAAABwAAAMEAAADCAAAAsQAAAOUAAACyAAAA5gAAAJQAAAAwAP####8AAAB#Af####8KQI+0AAAAAABAcLhR64UeuAIAAAAAAAAAAAAAAAABAAAAAAAAAAAACWFwcGFyYWl0MwAAAAAABwAAAMEAAADCAAAAsQAAAOUAAACyAAAA5gAAAJQAAAAAMQD#####AAAAfwH#####CkBo8AAAAAAAQCkKPXCj1wwCAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAxDb3JyZWN0aW9uIGMAAAAAAAMAAAD8AAAA5wAAAPsAAAAvAP####8A#wAAAf####8QQI+8AAAAAABAczhR64UeuAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAB21hc3F1ZTIAAAAAAAcAAADIAAAAyQAAAKMAAAD1AAAApAAAAPYAAACTAAAAMAD#####AAAAAAH#####CkCPxAAAAAAAQHZ4UeuFHrgCAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAlhcHBhcmFpdDIAAAAAAAcAAADIAAAAyQAAAKMAAAD1AAAApAAAAPYAAACTAAAAADEA#####wD#AAAB#####wpAXaAAAAAAAEApCj1wo9cMAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAMQ29ycmVjdGlvbiBiAAAAAAAEAAAA#wAAAPcAAAD+AAAApgAAADEA#####wAAAAAB#####xBAcigAAAAAAEAeFHrhR634AgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAKQ29ycmVjdGlvbgAAAAAABAAAAKYAAAD6AAABAAAAAP3###############8="
			//première question : centre A, rotation de 90° sens anti-horaire, une figure de tabfigA donne une figure de tabfigD, le point B donne le point D.
			indexA = randint(0, nx * ny - 1)
			numA = tabfigA[indexA][2]
			indexcentre1 = randint(0, nx * ny - 1, [indexA])
			xmil1 = tabfigA[indexcentre1][0]
			ymil1 = tabfigA[indexcentre1][1]
			point = image_point_par_transformation(6, [tabfigB[indexA][0], tabfigB[indexA][1]], [xmil1, ymil1]) // le repère est direct, donc le sens de rotation est inversé...
			trouver = false
			while (trouver == false) {
				for (let j = 0; j < nx * ny; j++) {
					if (point[0] == tabfigD[j][0] && point[1] == tabfigD[j][1]) {
						trouver = true
						num1=tabfigD[j][2]
						xa=tabfigA[indexA][0]
						ya=tabfigA[indexA][1]
						break
					}
				}
				if (trouver == false) {
					indexA = randint(0, nx * ny - 1)
					numA = tabfigA[indexA][2]
					indexcentre1 = randint(0, nx * ny - 1, [indexA])
					xmil1 = tabfigA[indexcentre1][0]
					ymil1 = tabfigA[indexcentre1][1]
					point = image_point_par_transformation(6, [tabfigB[indexA][0], tabfigB[indexA][1]], [xmil1, ymil1]) // le repère est direct, donc le sens de rotation est inversé...
				}
			}
			texte += num_alpha(0) + texte_en_couleur_et_gras(` Quel est le numéro de la figure image de la figure ${numA} dans la rotation de centre ${s0} et d'angle 90° dans le sens inverse des aiguilles d'une montre ?<br>`, `green`)
			texte_corr = num_alpha(0) + texte_en_couleur_et_gras(` La figure image de la figure ${numA} dans la rotation de centre ${s0} et d'angle 90° dans le sens inverse des aiguilles d'une montre porte le numéro ${num1}.<br>`, `green`)

			//deuxième question : centre B, rotation 90° sens horaire, une figure de tabfigD donne une figure de tabfigC
			indexD = randint(0, nx * ny - 1)
			numD = tabfigD[indexD][2]
			indexcentre2 = randint(0, nx * ny - 1, [indexD])
			xmil2 = tabfigB[indexcentre2][0]
			ymil2 = tabfigB[indexcentre2][1]
			point = image_point_par_transformation(5, [tabfigD[indexD][0], tabfigD[indexD][1]], [xmil2, ymil2]) // le repère est direct, donc le sens de rotation est inversé...
			trouver = false
			while (trouver == false) {
				for (let j = 0; j < nx * ny; j++) {
					if (point[0] == 4+tabfigC[j][0] && point[1] == tabfigC[j][1]) {
						trouver = true
						num2=tabfigC[j][2]
						xb=tabfigA[indexD][0]
						yb=tabfigA[indexD][1]
						break
					}
				}
				if (trouver == false) {
					indexD = randint(0, nx * ny - 1)
					numD = tabfigD[indexD][2]
					indexcentre2 = randint(0, nx * ny - 1, [indexD])
					xmil2 = tabfigB[indexcentre2][0]
					ymil2 = tabfigB[indexcentre2][1]
					point = image_point_par_transformation(5, [tabfigD[indexD][0], tabfigD[indexD][1]], [xmil2, ymil2]) // le repère est direct, donc le sens de rotation est inversé...
				}
			}
			texte += num_alpha(1) + texte_en_couleur_et_gras(` Quel est le numéro de la figure image de la figure ${numD} dans la rotation de centre ${s1} et d'angle 90° dans le sens des aiguilles d'une montre ?<br>`, `red`)
			texte_corr += num_alpha(1) + texte_en_couleur_et_gras(` La figure image de la figure ${numD} dans la rotation de centre ${s1} et d'angle 90° dans le sens des aiguilles d'une montre porte le numéro ${num2}.<br>`, `red`)

			//troisième question : centre B, rotation 90° sens anti-horaire, une figure de tabfigC donne une figure de tabfigD
			indexC = randint(0, nx * ny - 1)
			numC = tabfigC[indexC][2]
			indexcentre3 = randint(0, nx * ny - 1, [indexC])
			xmil3 = tabfigB[indexcentre3][0]
			ymil3 = tabfigB[indexcentre3][1]
			point = image_point_par_transformation(6, [tabfigC[indexC][0], tabfigC[indexC][1]], [xmil3, ymil3]) // le repère est direct, donc le sens de rotation est inversé...
			trouver = false
			while (trouver == false) {
				for (let j = 0; j < nx * ny; j++) {
					if (point[0] == tabfigD[j][0] && point[1] == 4+tabfigD[j][1]) {
						trouver = true
						num3=tabfigD[j][2]
						xc=tabfigA[indexC][0]
						yc=tabfigA[indexC][1]
						break
					}
				}
				if (trouver == false) {
					indexC = randint(0, nx * ny - 1)
					numC = tabfigC[indexC][2]
					indexcentre3 = randint(0, nx * ny - 1, [indexC])
					xmil3 = tabfigB[indexcentre3][0]
					ymil3 = tabfigB[indexcentre3][1]
					point = image_point_par_transformation(6, [tabfigC[indexC][0], tabfigC[indexC][1]], [xmil3, ymil3]) // le repère est direct, donc le sens de rotation est inversé...
				}
			}
			texte += num_alpha(2) + texte_en_couleur_et_gras(` Quel est le numéro de la figure image de la figure ${numC} dans la rotation de centre ${s2} et d'angle 90° dans le sens inverse des aiguilles d'une montre ?<br>`, `blue`)
			texte_corr += num_alpha(2) + texte_en_couleur_et_gras(` La figure image de la figure ${numC} dans la rotation de centre ${s2} et d'angle 90° dans le sens inverse des aiguilles d'une montre porte le numéro ${num3}.<br>`, `blue`)


			break

	}
	if (sortie_html) {

			this.MG32code_pour_modifier_la_figure = `
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "xB", "${xB}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "yB", "${yB}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "xC", "${xC}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "yC", "${yC}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "xD", "${xD}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "yD", "${yD}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "nx", "${nx}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "ny", "${ny}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "numa", "${numA}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "numb", "${numD}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "numc", "${numC}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "xc3", "${xmil3}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "yc3", "${ymil3}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "xc", "${xc}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "yc", "${yc}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "xc2", "${xmil2}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "yc2", "${ymil2}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "xb", "${xb}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "yb", "${yb}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "xc1", "${xmil1}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "yc1", "${ymil1}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "xa", "${xa}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "ya", "${ya}");	
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "Zoom", "${Zoom}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "Angle", "${Angle}");	
			mtg32App.rename("MG32svg${numero_de_l_exercice}", "c1", "${s0}");
			mtg32App.rename("MG32svg${numero_de_l_exercice}", "c2", "${s1}");
			mtg32App.rename("MG32svg${numero_de_l_exercice}", "c3", "${s2}");

			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xV", "${xV1}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yV", "${yV1}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xV2", "${xV2}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yV2", "${yV2}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xV3", "${xV3}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yV3", "${yV3}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xB", "${xB}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yB", "${yB}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xC", "${xC}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yC", "${yC}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xD", "${xD}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yD", "${yD}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "nx", "${nx}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "ny", "${ny}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "numa", "${numA}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "numb", "${numD}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "numc", "${numC}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xc3", "${xmil3}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yc3", "${ymil3}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xc", "${xc}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yc", "${yc}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xc2", "${xmil2}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yc2", "${ymil2}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xb", "${xb}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yb", "${yb}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xc1", "${xmil1}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yc1", "${ymil1}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xa", "${xa}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "ya", "${ya}");	
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "Zoom", "${Zoom}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "Angle", "${Angle}");	
			mtg32App.rename("MG32svgcorr${numero_de_l_exercice}", "c1", "${s0}");
			mtg32App.rename("MG32svgcorr${numero_de_l_exercice}", "c2", "${s1}");
			mtg32App.rename("MG32svgcorr${numero_de_l_exercice}", "c3", "${s2}");

			mtg32App.calculate("MG32svg${numero_de_l_exercice}");
			mtg32App.display("MG32svg${numero_de_l_exercice}");
			mtg32App.calculate("MG32svgcorr${numero_de_l_exercice}");
			mtg32App.display("MG32svgcorr${numero_de_l_exercice}");
			mtg32App.executeMacro("MG32svgcorr${numero_de_l_exercice}","Correction")
			mtg32App.display("MG32svgcorr${numero_de_l_exercice}");
			`
		
			this.liste_questions.push(texte);
			this.liste_corrections.push(texte_corr);
			liste_de_question_to_contenu_sans_numero(this)

		}
		else {
			texte = ``
			texte_cor=``
			this.liste_questions.push(texte) // on envoie la question
			this.liste_corrections.push(texte_corr)
			liste_de_question_to_contenu_sans_numero(this);
		}
		


	}
	this.besoin_formulaire_numerique = ['Transformations',4, '1 : Symétries axiales\n 2 : Symétries centrales\n 3 : Translations\n 4 : Translations\n 5 : Homothéties\n'];
}
function Ecrire_une_expression_mathador(){
	'use strict'
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Traduire une succession d\'opérations par une expression"
	this.consigne = "";
	this.nb_questions = 4;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let expression,calculs_successifs,tirage,cible,solution_mathador,quidam
		for (let i = 0, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) {
 			// traduire un calcul mathador
			solution_mathador=Trouver_solution_mathador(30,90)
			tirage=solution_mathador[0]
			cible=solution_mathador[1]
			calculs_successifs=solution_mathador[2]
			expression=solution_mathador[3]
			quidam=prenom()
			texte = `${quidam} a trouvé une solution mathador pour le tirage suivant $${tirage[0]}~;~${tirage[1]}~;~${tirage[2]}~;~${tirage[3]}~;~${tirage[4]}$ et pour la cible $${cible}$, voici ses calculs :<br>`
			for (let j=0;j<4;j++) {
				texte+=`$${calculs_successifs[j]}$<br>`
			}
			texte+=`Écrit cette succession d'opérations en une seule expression.`
			texte_corr = `L'expression correspondante au calcul de ${quidam} est<br>$${expression}$ ou $${solution_mathador[4]}$.`
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		console.log(this.liste_questions,this.liste_corrections)
		liste_de_question_to_contenu(this);
	}
}

function Traduire_une_phrase_par_une_expression() {
	Ecrire_une_expression_numerique.call(this)
	this.version=1
	this.titre="Traduire une phrase par une expression"
	this.sup=false
	this.sup2=false
}
function Traduire_une_expression_par_une_phrase() {
	Ecrire_une_expression_numerique.call(this)
	this.version=2
	this.titre="Traduire une expression par une phrase"
}
function Traduire_une_phrase_par_une_expression_et_calculer() {
	Ecrire_une_expression_numerique.call(this)
	this.version=3
	this.titre="Traduire une phrase par une expression et la calculer"
}
function Calculer_une_expression_numerique() {
	Ecrire_une_expression_numerique.call(this)
	this.version=4
	this.titre="Calculer une expression numérique en détaillant les calculs"
}
function Ecrire_une_expression_numerique(){
	'use strict'
	Exercice.call(this); // Héritage de la classe Exercice()
	this.consigne = "";
	this.nb_questions = 4;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup2=false; // si false alors utilisation de nombres entiers, si true alors utilisation de nombres à un chiffre après la virgule.
	this.sup=false
	this.version=1 // 1 pour ecrire une expression, 2 pour écrire la phrase, 3 pour écrire l'expression et la calculer, 4 pour calculer une expression numérique
	this.nouvelle_version = function(numero_de_l_exercice){
		let type_de_questions_disponibles
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		if (!this.sup) { // Si aucune liste n'est saisie
		type_de_questions_disponibles = [1,2,3,4,5]
		}
		else {
			if (typeof(this.sup)=='number'){ // Si c'est un nombre c'est qu'il y a qu'une expression
			type_de_questions_disponibles[0] = this.sup
				this.nb_questions=1
			} else {
				type_de_questions_disponibles = this.sup.split("-");// Sinon on créé un tableau à partir des valeurs séparées par des -
				this.nb_questions=type_de_questions_disponibles.length
			}	
		}
		let expf,expn,expc,decimal=1
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) 
		if (this.sup2) decimal=10;
		for (let i = 0, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) {
			[expf,expn,expc]=Choisir_expression_numerique(parseInt(liste_type_de_questions[i]),decimal)
			switch (this.version) {
				case 1:
					texte=`Traduire la phrase suivante par une expression numérique :<br>${expf}`
					texte_corr=`${expf} s'écrit<br>${expn}.`
					break
				case 2:
					if (expn.indexOf('ou')>0) expn=expn.substring(0,expn.indexOf('ou')) // on supprime la deuxième expression fractionnaire
					texte=`Traduire le calcul suivant par une phrase en français :<br>${expn}`
					texte_corr=`L'expression numérique ${expn} permet de calculer :<br>${expf}`
					break
				case 3:
					texte=`Traduire la phrase suivante par une expression numérique et effectuer le calcul en respectant les priorités opératoires :<br>${expf}`
					texte_corr=`${expf} s'écrit ${expn}.<br>`
					if (expn.indexOf('ou')>0) expn=expn.substring(0,expn.indexOf('ou')) // on supprime la deuxième expression fractionnaire
					texte_corr+=`${expn} = ${expc}.`
					break
				case 4:
					if (expn.indexOf('ou')>0) expn=expn.substring(0,expn.indexOf('ou')) // on supprime la deuxième expression fractionnaire
					texte=`Calculer l'expression suivante en respectant les priorités opératoires :<br>${expn}`
					texte_corr=`${expn} = ${expc}.`
					break
 		
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
	this.besoin_formulaire_texte = ['Choix des expressions','Nombres séparés par des tirets\n 1 : Expressions de base à une opération\n2 : Expressions à deux opérations\n3 : Expressions à 3 opérations\n4 : Expressions à 4 opérations\n5 : Expressions complexes'] // Texte, tooltip
	this.besoin_formulaire2_case_a_cocher = ["Avec décimaux.",false]

}

/**
 * Chosis aléatoirement une expressions numérique parmi de nombreuses variantes.
 * @param {number} nb_operations fixe la complexité de l'expression à retourner
 * @param {number} decimal 1 si on veut des entiers, 10, 100, 1000 selon le nombre de chiffres après la virgule qu'on veut
 * retourne
 * * l'expression en français commençant par une majuscule sans point final
 * * l'expression en mode maths LaTex
 * * Le détaillé du calcul en mode maths LaTex 
 */
function Choisir_expression_numerique(nb_operations,decimal) {
	let expf,expn,expc,arrondir=Math.log10(decimal)
	let a=arrondi(randint(2*decimal,10*decimal)/decimal,arrondir)
	let b=arrondi(randint(2*decimal,10*decimal,[a*decimal])/decimal,arrondir)
	let c=arrondi(randint(2*decimal,10*decimal)/decimal,arrondir)
	let d=arrondi(randint(2*decimal,10*decimal,[c*decimal])/decimal,arrondir)
	let e=arrondi(randint(2*decimal,10*decimal)/decimal,arrondir)  
	let f=arrondi(randint(2*decimal,10*decimal,[e*decimal])/decimal,arrondir)
	switch (nb_operations){
		case 1 : // expressions de base (1 opération)
			switch (randint(0,3)) {
				case 0 : //somme de deux nombres
					expf=`La somme de ${tex_nombre(a)} et ${tex_nombre(b)}`
					expn=`$${tex_nombre(a)}+${tex_nombre(b)}$`
					expc=`$${tex_nombre(a+b)}$`
					break
				case 1 : // différence de deux nombres
					expf=`La différence de ${tex_nombre(a+b)} et ${tex_nombre(b)}`
					expn=`$${tex_nombre(a+b)}-${tex_nombre(b)}$`
					expc=`$${tex_nombre(a+b-b)}$`
					break
				case 2 : // produit de deux nombres
					expf=`Le produit de ${tex_nombre(a)} par ${tex_nombre(b)}`
					expn=`$${tex_nombre(a)}\\times${tex_nombre(b)}$`
					expc=`$${tex_nombrec(a*b)}$`
					break
				case 3 : // quotient de deux nombres
					a=Math.round(a)
					expf=`Le quotient de ${tex_nombre(a*b)} par ${tex_nombre(b)}`
					expn=`$${tex_nombre(a*b)}\\div${tex_nombre(b)}$`
					expc=`$${tex_nombrec(a)}$`
					break
			}
			break
		case 2 : // expressions de niveau 1 (2 opérations)
			switch (randint(0,5)) {
				case 0 : //a(b+c)
					expf=`Le produit de ${tex_nombre(a)} par la somme de ${tex_nombre(b)} et ${tex_nombre(c)}`
					expn=`$${tex_nombre(a)}(${tex_nombre(b)}+${tex_nombre(c)})$`
					expc=`$${tex_nombre(a)}\\times${tex_nombrec(b+c)}=${tex_nombre(a*(b+c))}$`
					break
				case 1 : // a(b-c)
					if (b<c) b=b+c // b-c positif
					expf=`Le produit de ${tex_nombre(a)} par la différence de ${tex_nombre(b)} et ${tex_nombre(c)}`
					expn=`$${tex_nombre(a)}(${tex_nombre(b)}-${tex_nombre(c)})$`
					expc=`$${tex_nombre(a)}\\times${tex_nombrec(b-c)}=${tex_nombre(a*(b-c))}$`
					break
				case 2 : // a/(b+c)
					a=a*(b+c) // on s'assure que le quotient tombe juste...
					expf=`Le quotient de ${tex_nombre(a)} par la somme de ${tex_nombre(b)} et ${tex_nombre(c)}`
					expn=`$${tex_nombre(a)}\\div(${tex_nombre(b)}+${tex_nombre(c)})$ ou $\\dfrac{${tex_nombre(a)}}{${tex_nombre(b)}+${tex_nombre(c)}}$`
					expc=`$${tex_nombre(a)}\\div${tex_nombrec(b+c)}=${tex_nombre(a)}$`
					break
				case 3 : // a/(b-c)
					if (b<c) b=b+c // b-c positif
					a=a*(b-c) // on s'assure que le quotient tombe juste
					expf=`Le quotient de ${tex_nombre(a)} par la différence de ${tex_nombre(b)} et ${tex_nombre(c)}`
					expn=`$${tex_nombre(a)}\\div(${b}-${tex_nombre(c)})$ ou $\\dfrac{${tex_nombre(a)}}{${tex_nombre(b)}-${tex_nombre(c)}}$`
					expc=`$${tex_nombre(a)}\\div${tex_nombrec(b-c)}=${tex_nombrec(a/(b-c))}$`
					break			
				case 4 : // (a+b)/c
					a=a*c
					b=b*c // on s'assure que le quotient tombe juste
					expf=`Le quotient de la somme de ${tex_nombre(a)} et ${tex_nombre(b)} par ${tex_nombre(c)}`
					expn=`$(${tex_nombre(a)}+${tex_nombre(b)})\\div${tex_nombre(c)}$ ou $\\dfrac{${tex_nombre(a)}+${tex_nombre(b)}}{${tex_nombre(c)}}$`
					expc=`$${tex_nombrec(a+b)}\\div${tex_nombre(c)}=${tex_nombrec((a+b)/c)}$`
					break
				case 5 : // (a-b)/c
					if (a<b) a=a+b // a-b positif
					a=a*c
					b=b*c // on s'assure que le quotient tombe juste
					expf=`Le quotient de la différence de ${tex_nombre(a)} et ${tex_nombre(b)} par ${tex_nombre(c)}`
					expn=`$(${tex_nombre(a)}-${tex_nombre(b)})\\div${tex_nombre(c)}$ ou $\\dfrac{${tex_nombre(a)}-${tex_nombre(b)}}{${tex_nombre(c)}}$`
					expc=`$${tex_nombrec(a-b)}\\div${tex_nombre(c)}=${tex_nombrec((a-b)/c)}$`
					break			
							
			}
			break
		case 3 : // expressions de niveau 2 (3 opérations)
			switch (randint(0,13)) {
				case 0 : // (a+b)(c+d)
					expf=`Le produit de la somme de ${tex_nombre(a)} et ${tex_nombre(b)} par la somme de ${tex_nombre(c)} et ${tex_nombre(d)}`
					expn=`$(${tex_nombre(a)}+${tex_nombre(b)})(${tex_nombre(c)}+${tex_nombre(d)})$`
					break
				case 1 : // (a+b)(c-d)
					expf=`Le produit de la somme de ${tex_nombre(a)} et ${tex_nombre(b)} par la différence de ${tex_nombre(c+d)} et ${tex_nombre(d)}`
					expn=`$(${tex_nombre(a)}+${tex_nombre(b)})(${tex_nombre(c+d)}-${tex_nombre(d)})$`
					break
				case 2 : // (a-b)(c+d)
					expf=`Le produit de la différence de ${tex_nombre(a+b)} et ${tex_nombre(b)} par la somme de ${tex_nombre(c)} et ${tex_nombre(d)}`
					expn=`$(${tex_nombre(a+b)}-${tex_nombre(b)})(${tex_nombre(c)}+${tex_nombre(d)})$`
					break
				case 3 : // (a-b)(c-d)
					expf=`Le produit de la différence de ${tex_nombre(a+b)} et ${tex_nombre(b)} par la différence de ${tex_nombre(c+d)} et ${tex_nombre(d)}`
					expn=`$(${tex_nombre(a+b)}-${tex_nombre(b)})(${tex_nombre(c+d)}-${tex_nombre(d)})$`
					break			
				case 4 : // (a+b)/(c+d)
					expf=`Le quotient de la somme de ${tex_nombre(a)} et ${tex_nombre(b)} par la somme de ${tex_nombre(c)} et ${tex_nombre(d)}`
					expn=`$(${tex_nombre(a)}+${tex_nombre(b)})\\div(${tex_nombre(c)}+${tex_nombre(d)})$ ou $\\dfrac{${tex_nombre(a)}+${tex_nombre(b)}}{${tex_nombre(c)}+${tex_nombre(d)}}$`
					break
				case 5 : // (a-b)/(c+d)
					expf=`Le quotient de la différence de ${tex_nombre(a+b)} et ${tex_nombre(b)} par la somme de ${tex_nombre(c)} et ${tex_nombre(d)}`
					expn=`$(${tex_nombre(a+b)}-${tex_nombre(b)})\\div(${tex_nombre(c)}+${tex_nombre(d)})$ ou $\\dfrac{${tex_nombre(a+b)}-${tex_nombre(b)}}{${tex_nombre(c)}+${tex_nombre(d)}}$`
					break			
				case 6 : // (a+b)/(c-d)
					expf=`Le quotient de la somme de ${tex_nombre(a)} et ${tex_nombre(b)} par la différence de ${tex_nombre(c+d)} et ${tex_nombre(d)}`
					expn=`$(${tex_nombre(a)}+${tex_nombre(b)})\\div(${tex_nombre(c+d)}-${tex_nombre(d)})$ ou $\\dfrac{${tex_nombre(a)}+${tex_nombre(b)}}{${tex_nombre(c+d)}-${tex_nombre(d)}}$`
					break
				case 7 : // (a-b)/(c-d)
					expf=`Le quotient de la différence de ${tex_nombre(a+b)} et ${tex_nombre(b)} par la différence de ${tex_nombre(c+d)} et ${tex_nombre(d)}`
					expn=`$(${tex_nombre(a+b)}-${tex_nombre(b)})\\div(${tex_nombre(c+d)}-${tex_nombre(d)})$ ou $\\dfrac{${tex_nombre(a+b)}-${tex_nombre(b)}}{${tex_nombre(c+d)}-${tex_nombre(d)}}$`
					break			
				case 8 : // ab+cd
					expf=`La somme du produit de ${tex_nombre(a)} par ${tex_nombre(b)} et du produit de ${tex_nombre(c)} par ${tex_nombre(d)}`
					expn=`$${tex_nombre(a)}\\times${tex_nombre(b)}+${tex_nombre(c)}\\times${tex_nombre(d)}$`
					break
				case 9 : // ab-cd
					if (a<c) a=a+c
					if (b<d) b=b+d
					expf=`La différence du produit de ${tex_nombre(a)} par ${tex_nombre(b)} et du produit de ${tex_nombre(c)} par ${tex_nombre(d)}`
					expn=`$${tex_nombre(a)}\\times${tex_nombre(b)}-${tex_nombre(c)}\\times${tex_nombre(d)}$`
					break			
				case 10 : // ab+c/d
					expf=`La somme du produit de ${tex_nombre(a)} par ${tex_nombre(b)} et du quotient de ${tex_nombre(c)} par ${tex_nombre(d)}`
					expn=`$${tex_nombre(a)}\\times${tex_nombre(b)}+${tex_nombre(c)}\\div${tex_nombre(d)}$ ou $${tex_nombre(a)}\\times${tex_nombre(b)}+\\dfrac{${tex_nombre(c)}}{${tex_nombre(d)}}$`
					break
				case 11 : // ab-c/d
					expf=`La différence du produit de ${tex_nombre(a)} par ${tex_nombre(b)} et du quotient de ${tex_nombre(c)} par ${tex_nombre(d)}`
					expn=`$${tex_nombre(a)}\\times${tex_nombre(b)}-${tex_nombre(c)}\\div${tex_nombre(d)}$ ou $${tex_nombre(a)}\\times${tex_nombre(b)}-\\dfrac{${tex_nombre(c)}}{${tex_nombre(d)}}$`
					break	
				case 12 : // a/b+c/d
					expf=`La somme du quotient de ${tex_nombre(a)} par ${tex_nombre(b)} et du quotient de ${tex_nombre(c)} par ${tex_nombre(d)}`
					expn=`$${tex_nombre(a)}\\div${tex_nombre(b)}+${tex_nombre(c)}\\div${tex_nombre(d)}$ ou $\\dfrac{${tex_nombre(a)}}{${tex_nombre(b)}}+\\dfrac{${tex_nombre(c)}}{${tex_nombre(d)}}$`
					break	
				case 13 : // a/b-c/d		
					expf=`La différence du quotient de ${tex_nombre(a)} par ${tex_nombre(b)} et du quotient de ${tex_nombre(c)} par ${tex_nombre(d)}`
					expn=`$${tex_nombre(a)}\\div${tex_nombre(b)}-${tex_nombre(c)}\\div${tex_nombre(d)}$ ou $\\dfrac{${tex_nombre(a)}}{${tex_nombre(b)}}-\\dfrac{${tex_nombre(c)}}{${tex_nombre(d)}}$`
					break	
			}
			break ;
		case 5 : // expressions complexes
			switch (randint(0,5)) {
				case 0 : // 2(a+bc)
					expf=`Le double de la somme de ${tex_nombre(a)} et du produit de ${tex_nombre(b)} par ${tex_nombre(c)}`
					expn=`$2(${tex_nombre(a)}+${tex_nombre(b)}\\times${tex_nombre(c)})$`
					break
				case 1 : // 3(a+b)/c
					expf=`Le triple du quotient de la somme de ${tex_nombre(a)} et ${tex_nombre(b)} par ${tex_nombre(c)}`
					expn=`$3(${tex_nombre(a)}+${tex_nombre(b)})\\div${tex_nombre(c)}$ ou $3\\times\\dfrac{${tex_nombre(a)}+${tex_nombre(b)}}{${tex_nombre(c)}}$`
					break
				case 2 : // (a-b)/3
					expf=`Le tiers de la différence de ${tex_nombre(a+b)} et ${tex_nombre(b)}`
					expn=`$(${tex_nombre(a+b)}-${tex_nombre(b)})\\div 3$ ou $\\dfrac{${tex_nombre(a+b)}-${tex_nombre(b)}}{3}$`
					break
				case 3 : // (a-b)/3*2(c+d)
					expf=`Le produit du tiers de la différence de ${tex_nombre(a+b)} et ${tex_nombre(b)} par le double de la somme de ${tex_nombre(c)} et ${tex_nombre(d)}`
					expn=`$\\left((${tex_nombre(a+b)}-${tex_nombre(b)})\\div 3\\right)\\times 2(${tex_nombre(c)}+${tex_nombre(d)})$`
					break			
				case 4 : // 3(a+b)-2(c+d)
					expf=`La différence du triple de la somme de ${tex_nombre(a)} et ${tex_nombre(b)} et du double de la somme de ${tex_nombre(c)} et ${tex_nombre(d)}`
					expn=`$3(${tex_nombre(a)}+${tex_nombre(b)})-2(${tex_nombre(c)}+${tex_nombre(d)})$`
					break
				case 5 : // 2(a-b)+3(c+d)
					expf=`La somme du double de la différence de ${tex_nombre(a+b)} et ${tex_nombre(b)} et du triple de la somme de ${tex_nombre(c)} et ${tex_nombre(d)}`
					expn=`$2(${tex_nombre(a+b)}-${tex_nombre(b)})+3(${tex_nombre(c)}+${tex_nombre(d)})$`
					break	
			}		
			break ;
		case 4 : // 4 opérations
			switch (randint(1,3)) {
				case 1 : // (a+b)/(c(d+e))
					expf=`Le quotient de la somme de ${tex_nombre(a)} et ${tex_nombre(b)} par le produit de ${tex_nombre(c)} par la somme de ${tex_nombre(d)} et ${tex_nombre(e)}`
					expn=`$(${tex_nombre(a)}+${tex_nombre(b)})\\div(${tex_nombre(c)}(${tex_nombre(d)}+${tex_nombre(e)})$ ou $\\dfrac{${tex_nombre(a)}+${tex_nombre(b)}}{${tex_nombre(c)}(${tex_nombre(d)}+${tex_nombre(e)})}$`
					texte=`Traduire la phrase suivante par une expression numérique :<br>${expf}`
					texte_corr=`${expf} s'écrit<br>${expn}`
					break
				case 2 : //(a-b)*(c+de)
					expf=`Le produit de la différence de ${tex_nombre(a+b)} et ${tex_nombre(b)} par la somme de ${tex_nombre(c)} et du produit de ${tex_nombre(d)} par ${tex_nombre(e)}`
					expn=`$(${tex_nombre(a+b)}-${tex_nombre(b)})(${tex_nombre(c)}+${tex_nombre(d)}\\times${tex_nombre(e)})$`
					texte=`Traduire la phrase suivante par une expression numérique :<br>${expf}`
					texte_corr=`${expf} s'écrit<br>${expn}`
					break
				case 3 : // ab+cd/e
					expf=`La somme du produit de ${tex_nombre(a)} par ${tex_nombre(b)} et du quotient du produit de ${tex_nombre(c)} et ${tex_nombre(d)} par ${tex_nombre(e)}`
					expn=`$${tex_nombre(a)}\\times${tex_nombre(b)}+${tex_nombre(c)}\\times${tex_nombre(d)}\\div${tex_nombre(e)}$ ou $${tex_nombre(a)}\\times${tex_nombre(b)}+\\dfrac{${tex_nombre(c)}\\times${tex_nombre(d)}}{${tex_nombre(e)}}$`
					texte=`Traduire la phrase suivante par une expression numérique :<br>${expf}`
					texte_corr=`${expf} s'écrit<br>${expn}`
					break
			}
			break
		}
		return [expf,expn,expc]
}