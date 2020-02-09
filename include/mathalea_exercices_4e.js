
/**
* * Calcul de l'inverse d'un nombre. 
*
* Paramétrages possibles :
* * 1 : inverse d'un nombre entier
* * 2 : inverse d'une fraction
* * 3 : inverse d'un nombre décimal
* * 4 : mélange des trois autres niveaux
* @auteur Jean-Claude Lhote
*/
function Exercice_trouver_l_inverse(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1 ; // Avec ou sans relatifs
	this.titre = "Trouver l'inverse d'un nombre"
	this.consigne = "Calculer l'inverse et donner la réponse sous forme décimale ou de fraction simplifiée quand c'est impossible"
	this.spacing = 2;
	this.spacing_corr = 2;
	this.nb_questions = 5;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let type_de_questions_disponibles
		let liste_entiers=[[1,1],[2,0.5],[3,0],[4,0.25],[5,0.2],[6,0],[7,0],[8,0.125],[9,0],[10,0.1],[11,0],[12,0],[13,0],[14,0],[15,0],[20,0.05],[50,0.02],[100,0.01]]
		// [n,0] si l'inverse de n n'est pas décimal [n,1/n] si il est décimal.
		let liste_decimaux=[[0.1,10,1],[0.2,5,1],[0.3,10,3],[0.4,10,4],[0.5,2,1],[0.6,10,6],[0.75,100,75],[0.8,10,8],[1.2,10,12],[1.5,10,15],[2.5,10,25],[3.5,10,35],[4.8,10,48],[7.5,10,75]]
		// [x,n,d] n/d = inverse de x fraction à réduire si besoin ... d=1 si l'inverse de x est entier. 
		let liste_fractions=[[3,4,false],[5,2,true],[4,5,true],[5,7,true],[7,3,false],[16,6,true],[12,18,true],[9,4,false],[4,6,true],[8,7,true],[5,9,true],[9,7,false],[13,6,false],[7,2,false]]
		// [n,d,bol] inverse d/n à simplifier si besoin. si bol = true, alors d/n est décimal.
		let liste_couples_d_inverses
		let couples_d_inverses
		if (this.sup==4) {type_de_questions_disponibles = [1,1,2,2,3]} // nombre entier,fraction,décimal]
		else {type_de_questions_disponibles = [parseInt(this.sup)]}
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions)
		for (let i = 0, nombre_choisi, nombre_inverse, nombre_inverse_num, nombre_inverse_den, texte, texte_corr, type_de_questions, cpt=0; i < this.nb_questions&&cpt<50;) {
			type_de_questions = liste_type_de_questions[i];
			switch (type_de_questions){
				case 1 : //inverse d'entier
					couples_d_inverses = choice(liste_entiers)
					nombre_choisi = couples_d_inverses[0];
					nombre_inverse = couples_d_inverses[1];
					if (choice([true,false])) { // nombre entier positif
						if (nombre_inverse!=0) {  //inverse décimal
							texte_corr = `L\'inverse de $${nombre_choisi}$ est $${tex_nombrec(nombre_inverse)} \\:$ car $\\: ${nombre_choisi}   \\times   ${tex_nombrec(nombre_inverse)} =  1$.`
						}
						else {  //inverse non décimal
							texte_corr = `L\'inverse de $${nombre_choisi}$ est $${tex_fraction(1,nombre_choisi)} \\:$ car $\\: ${nombre_choisi}   \\times   ${tex_fraction(1,nombre_choisi)} =  1$.`
						}
						} else { //nombre entier négatif
							nombre_choisi=-nombre_choisi
							if (nombre_inverse!=0) { //inverse décimal
								texte_corr = `L'inverse de $${nombre_choisi}$ est $${tex_nombrec(-nombre_inverse)} \\:$`
								texte_corr+=` car $\\: ${nombre_choisi}  \\times  \\left(-${tex_nombrec(nombre_inverse)}\\right)  =  1$.`
							}
							else {  //inverse non décimal
								texte_corr = `L\'inverse de $${nombre_choisi}$ est $-${tex_fraction(1,-nombre_choisi)} \\:$ car $\\: ${nombre_choisi}   \\times   \\left(-${tex_fraction(1,-nombre_choisi)}\\right) =  1$.`
							}
					}
					texte = `Quel est l'inverse de $${tex_nombrec(nombre_choisi)}$ ?`;
				break
				case 2 :
					couples_d_inverses = choice(liste_decimaux)
					nombre_choisi = couples_d_inverses[0];
					nombre_inverse_num = couples_d_inverses[1];
					nombre_inverse_den = couples_d_inverses[2];
					if (choice([true,false])) { // nombre positif
						if (pgcd(nombre_inverse_num,nombre_inverse_den)==1) {  //non simplifiable après inversion
							texte_corr = `Comme $${tex_nombrec(nombre_choisi)}=${tex_fraction(nombre_inverse_den,nombre_inverse_num)}$, l'inverse de $${tex_nombrec(nombre_choisi)}$ est $${tex_fraction(nombre_inverse_num,nombre_inverse_den)} \\:$ car $\\: ${tex_fraction(nombre_inverse_den,nombre_inverse_num)}   \\times   ${tex_fraction(nombre_inverse_num,nombre_inverse_den)} =  1$.`
						}
						else {  // à simplifier après inversion
							texte_corr = `Comme $${tex_nombrec(nombre_choisi)}=${tex_fraction(nombre_inverse_den,nombre_inverse_num)}=${tex_fraction_reduite(nombre_inverse_den,nombre_inverse_num)}$, l'inverse de $${tex_nombrec(nombre_choisi)}$ est $${tex_fraction_reduite(nombre_inverse_num,nombre_inverse_den)} \\:$ car $\\: ${tex_fraction_reduite(nombre_inverse_den,nombre_inverse_num)}  \\times   ${tex_fraction_reduite(nombre_inverse_num,nombre_inverse_den)} =  1$.`	
						}
							
					} else { // nombre négatif
						nombre_choisi=-nombre_choisi
						if (pgcd(nombre_inverse_num,nombre_inverse_den)==1) {  //non simplifiable après inversion
							texte_corr = `L'inverse de $${tex_nombrec(nombre_choisi)}$ est $-${tex_fraction(nombre_inverse_num,nombre_inverse_den)} \\:$ car $\\: ${tex_nombrec(nombre_choisi)}   \\times   \\left(-${tex_fraction(nombre_inverse_num,nombre_inverse_den)}\\right) =  1$.`
							texte_corr = `Comme $${tex_nombrec(nombre_choisi)}=-${tex_fraction(nombre_inverse_den,nombre_inverse_num)}$, l'inverse de $${tex_nombrec(nombre_choisi)}$ est $-${tex_fraction(nombre_inverse_num,nombre_inverse_den)} \\:$ car $\\: -${tex_fraction(nombre_inverse_den,nombre_inverse_num)}   \\times  \\left(- ${tex_fraction(nombre_inverse_num,nombre_inverse_den)}\\right) =  1$.`
						
						}
						else {  // à simplifier après inversion
							texte_corr = `Comme $${tex_nombrec(nombre_choisi)}=-${tex_fraction(nombre_inverse_den,nombre_inverse_num)}=-${tex_fraction_reduite(nombre_inverse_den,nombre_inverse_num)}$, l'inverse de $${tex_nombrec(nombre_choisi)}$ est $-${tex_fraction_reduite(nombre_inverse_num,nombre_inverse_den)} \\:$ car $\\: -${tex_fraction_reduite(nombre_inverse_den,nombre_inverse_num)}  \\times  \\left(- ${tex_fraction_reduite(nombre_inverse_num,nombre_inverse_den)} \\right)=  1$.`	
					}
					}
					texte = `Quel est l'inverse de $${tex_nombrec(nombre_choisi)}$ ?`;
				break	
				case 3 :
					couples_d_inverses = choice(liste_fractions)
					nombre_inverse_num = couples_d_inverses[0];
					nombre_inverse_den = couples_d_inverses[1];
					if (choice([true,false])) {  // fraction positive
						if (couples_d_inverses[2]==true) {  // inverse décimal
							texte_corr = `L'inverse de $${tex_fraction(nombre_inverse_num,nombre_inverse_den)}$ est $${tex_fraction(nombre_inverse_den,nombre_inverse_num)}=${tex_nombrec(nombre_inverse_den/nombre_inverse_num)} \\:$ car $\\: ${tex_fraction(nombre_inverse_num,nombre_inverse_den)}   \\times   ${tex_fraction(nombre_inverse_den,nombre_inverse_num)} =  1$.`
						}
						else {   // inverse non décimal
							texte_corr = `L'inverse de $${tex_fraction(nombre_inverse_num,nombre_inverse_den)}$ est $${tex_fraction(nombre_inverse_den,nombre_inverse_num)} \\:$ car $\\: ${tex_fraction(nombre_inverse_num,nombre_inverse_den)}   \\times   ${tex_fraction(nombre_inverse_den,nombre_inverse_num)} =  1$.`
						}
						texte = `Quel est l'inverse de $${tex_fraction(nombre_inverse_num,nombre_inverse_den)}$ ?`;
					} 
					else {  // fraction négative
						if (couples_d_inverses[2]==true) {  // inverse décimal
							texte_corr = `L'inverse de $-${tex_fraction(nombre_inverse_num,nombre_inverse_den)}$ est $-${tex_fraction(nombre_inverse_den,nombre_inverse_num)}=-${tex_nombrec(nombre_inverse_den/nombre_inverse_num)} \\:$ car $\\: -${tex_fraction(nombre_inverse_num,nombre_inverse_den)}   \\times  \\left(- ${tex_fraction(nombre_inverse_den,nombre_inverse_num)}\\right) =  1$.`
						}
						else {   // inverse non décimal
							texte_corr = `L'inverse de $-${tex_fraction(nombre_inverse_num,nombre_inverse_den)}$ est $-${tex_fraction(nombre_inverse_den,nombre_inverse_num)} \\:$ car $\\: -${tex_fraction(nombre_inverse_num,nombre_inverse_den)}   \\times  \\left(- ${tex_fraction(nombre_inverse_den,nombre_inverse_num)} \\right)=  1$.`
						}
						texte = `Quel est l'inverse de $-${tex_fraction(nombre_inverse_num,nombre_inverse_den)}$ ?`;
					}
					
				break	
			}
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++
		}
		liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',4,"1 : Nombres entiers\n 2 : Fractions\n 3 : Nombres décimaux\n 4 : Mélange des 3 niveaux"]
}

/**
* Exercice de calcul de produit de deux fractions. 
* 
* Paramétrages possibles :
* * 1 : Produits de nombres positifs seulement
* * 2 : deux questions niveau 1 puis deux questions niveau 3
* * 3 : Produits de nombres relatifs
* * Si décomposition cochée : les nombres utilisés sont plus importants.
* @auteur Jean-Claude Lhote
*/
function Exercice_multiplier_fractions(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1 ; // Avec ou sans relatifs
	this.titre = "Mutliplier des fractions"
	this.consigne = "Calculer et donner le résultat sous forme irréductible"
	this.spacing = 2;
	this.spacing_corr = 2;
	this.nb_questions = 5;
	this.nb_cols_corr = 1;
	this.sup2 = false; //méthode
	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let type_de_questions_disponibles
		liste_fractions = obtenir_liste_fractions_irreductibles();

		if (this.sup==1) {type_de_questions_disponibles = [1,2,2,2]} // 1*nombre entier,3*fraction (pas de négatifs)
		else if (this.sup==2) {type_de_questions_disponibles = [2,2,3,3]} // fractions, 2*positifs, 2*relatifs
		else {type_de_questions_disponibles = [3]}
		let nombre_de_signe_moins;
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions);
		for (let i = 0, ab, cd, a, b, c, d, p, aa,bb,cc,dd, signe,numerateur,denominateur,index, texte, texte_corr, type_de_questions, cpt = 0; i < this.nb_questions && cpt < 50;) {
				type_de_questions = liste_type_de_questions[i];
				ab = choice(liste_fractions);
				cd = choice(liste_fractions);
				a = ab[0];
				b = ab[1]
				c = cd[0];
				d = cd[1];
				if (this.sup2==false){  // methode 1 : simplifications finale
					switch (type_de_questions) {
						case 1: // entier * fraction (tout positif)
							if (a == 1) { a = randint(2,9) };
							if (a==c) {a=a+1}
							texte = `$${tex_fraction(a, 1)}\\times${tex_fraction(c, d)}=$`;
							texte_corr = `$${tex_fraction(a, 1)}\\times${tex_fraction(c, d)}$`
							texte_corr +=`$=\\dfrac{${a}}{1}\\times${tex_fraction(c, d)}$`
							texte_corr +=`$=${tex_fraction(a + '\\times' + c, '1\\times' + d)}$`
							texte_corr +=`$=${tex_fraction(a * c, d)}$`
							if (pgcd(a * c, d) != 1) {
								texte_corr += `$=${tex_fraction_reduite(a * c, d)}$`
							}
							break

						case 2: // fraction * fraction tout positif
							p = pgcd(a * c, b * d);
							texte = `$${tex_fraction(a, b)}\\times${tex_fraction(c, d)}=$`;
							texte_corr = `$${tex_fraction(a, b)}\\times${tex_fraction(c, d)}$`
							texte_corr += `$=${tex_fraction(a + '\\times' + c, b + '\\times' + d)}$`
							texte_corr += `$=${tex_fraction(a * c, b * d)}$`
							if (p != 1) {
								texte_corr += `$=${tex_fraction(a * c / p + '\\times\\cancel{' + p + '}', b * d / p + '\\times\\cancel{' + p + '}')}$`
								texte_corr += `$=${tex_fraction(a * c / p, b * d / p)}$`
							}
							break


						case 3:
							a = a * randint(-1, 1, [0]);
							b = b * randint(-1, 1, [0]);
							c = c * randint(-1, 1, [0]);
							d = d * randint(-1, 1, [0]);
							nombre_de_signe_moins = (a < 0) + (b < 0) + (c < 0) + (d < 0);
							if (Math.pow(-1, nombre_de_signe_moins) == 1) { signe = '' } else { signe = '-' }

							texte = `$${tex_fraction(a, b)}\\times${tex_fraction(c, d)}$`;
							texte_corr = `$${tex_fraction(a, b)}\\times${tex_fraction(c, d)}$`
							aa = abs(a);
							bb = abs(b);
							cc = abs(c);
							dd = abs(d);
							p = pgcd(aa * cc, bb * dd);
							texte_corr += `$=${signe}${tex_fraction(aa, bb)}\\times${tex_fraction(cc, dd)}$`
							texte_corr += `$=${signe}${tex_fraction(aa + '\\times' + cc, bb + '\\times' + dd)}$`
							if (p == 1) {
								texte_corr += `$=${signe}${tex_fraction(aa * cc, bb * dd)}$`
							}
							else {

								texte_corr += `$=${signe}${tex_fraction(aa * cc, bb * dd)}$`
								if (aa * cc != bb * dd) {
									texte_corr += `$=${signe}${tex_fraction(aa * cc / p + '\\times\\cancel{' + p + '}', bb * dd / p + '\\times\\cancel{' + p + '}')}$`
									texte_corr += `$=${signe}${tex_fraction(aa * cc / p, bb * dd / p)}$`
								}
								else {
									texte_corr += `$=${signe}1$`
								}
							}
							break
					}
				}
				else { //méthode 2 : décomposition
					if (a==c) {a++}
					aa=obtenir_liste_nombres_premiers()[randint(1,5)];
					bb=obtenir_liste_nombres_premiers()[randint(1,5,[aa])];
					a=a*aa;
					d=d*aa;
					b=b*bb;
					c=c*bb;
					
					var listea=obtenir_liste_facteurs_premiers(a);
					var listeb=obtenir_liste_facteurs_premiers(b);
					var listec=obtenir_liste_facteurs_premiers(c);
					var listed=obtenir_liste_facteurs_premiers(d);
					var listeavf,listebvf;

					switch (type_de_questions) {
						case 1: // entier * fraction (tout positif)

							texte = `$${a}\\times${tex_fraction(c, d)}=$`;
							texte_corr = `$${a}\\times${tex_fraction(c, d)}$`;
							texte_corr+= `$=${tex_fraction(a+'\\times'+c,d)}$`;
							texte_corr += `$=${tex_fraction(decomposition_facteurs_premiers(a)+'\\times'+decomposition_facteurs_premiers(c), decomposition_facteurs_premiers(d))}$`;
							// texte_corr += `$=${tex_fraction(decomposition_facteurs_premiers(a * c), decomposition_facteurs_premiers(d))}$`
							for (let k in listec) {listea.push(listec[k])}
							listeb = listed;
							listeavf=[];
							listebvf=[];
							
							listea.forEach (function a_ajouter_dans_listeavf(element) {
								listeavf.push([element,true]);
							});
							listeb.forEach (function a_ajouter_dans_listebvf(element) {
								listebvf.push([element,true]);
							});
							
							for (index=0; index<listeb.length;) {
								for (let j = 0; j <= listea.length;) {
									if (listeb[index] == listea[j]) {
										listebvf[index]=[listeb[index],false];
										listeavf[j]=[listea[j],false];
										listea[j]=1;
										listeb[index]=1;
										break
									}
									j++;
								}
								index++;
							}
						
							a=1;b=1;
							for (let k in listea) {a=a*listea[k]};
							for (let k in listeb) {b=b*listeb[k]};
							
							numerateur ='';
							denominateur ='';
					
							for (let j in listeavf) {
								if (listeavf[j][1]==true) {
									numerateur+=listeavf[j][0] + '\\times';
								}
								else {
									numerateur+='\\cancel{'+listeavf[j][0]+'}\\times';
								}
							}
							numerateur=numerateur.substr(0,numerateur.length-6);

							for (let j in listebvf) {
								if (listebvf[j][1]==true) {
									denominateur+=listebvf[j][0] + '\\times';
								}
								else {
									denominateur+='\\cancel{'+listebvf[j][0]+'}\\times';
								}
							}
							denominateur=denominateur.substr(0,denominateur.length-6);
							
							texte_corr += `$=\\dfrac{${numerateur}}{${denominateur}}$`
							texte_corr += `$=${tex_fraction(a,b)}$`
							break

						case 2: // fraction * fraction tout positif
							
							texte = `$${tex_fraction(a, b)}\\times${tex_fraction(c, d)}=$`;
							texte_corr = `$${tex_fraction(a, b)}\\times${tex_fraction(c, d)}$`
							texte_corr += `$=${tex_fraction(a + '\\times' + c, b + '\\times' + d)}$`

							for (let k in listec) {listea.push(listec[k])}
							for (let k in listed) {listeb.push(listed[k])}

							listeavf=[];
							listebvf=[];

							listea.forEach (function a_ajouter_dans_listeavf(element) {
								listeavf.push([element,true]);
							});
							listeb.forEach (function a_ajouter_dans_listebvf(element) {
								listebvf.push([element,true]);
							});
							
							for (index=0; index<listeb.length;) {
								for (let j = 0; j <= listea.length;) {
									if (listeb[index] == listea[j]) {
										listebvf[index]=[listeb[index],false];
										listeavf[j]=[listea[j],false];
										listea[j]=1;
										listeb[index]=1;
										break
									}
									j++;
								}
								index++;
							}
						
							a=1;b=1;
							for (let k in listea) {a=a*listea[k]};
							for (let k in listeb) {b=b*listeb[k]};
							
							numerateur ='';
							denominateur ='';
							
							for (let j in listeavf) {
								if (listeavf[j][1]==true) {
									numerateur+=listeavf[j][0] + '\\times';
								}
								else {
									numerateur+='\\cancel{'+listeavf[j][0]+'}\\times';
								}
							}
							numerateur=numerateur.substr(0,numerateur.length-6);

							for (let j in listebvf) {
								if (listebvf[j][1]==true) {
									denominateur+=listebvf[j][0] + '\\times';
								}
								else {
									denominateur+='\\cancel{'+listebvf[j][0]+'}\\times';
								}
							}
							denominateur=denominateur.substr(0,denominateur.length-6);
							
							texte_corr += `$=\\dfrac{${numerateur}}{${denominateur}}$`
							texte_corr += `$=${tex_fraction(a,b)}$`
							break

						case 3:
							a = a * randint(-1, 1, [0]);
							b = b * randint(-1, 1, [0]);
							c = c * randint(-1, 1, [0]);
							d = d * randint(-1, 1, [0]);
							nombre_de_signe_moins = (a < 0) + (b < 0) + (c < 0) + (d < 0);
							if (Math.pow(-1, nombre_de_signe_moins) == 1) { signe = '' } else { signe = '-' }

							texte = `$${tex_fraction(a, b)}\\times${tex_fraction(c, d)}$`;
							texte_corr = `$${tex_fraction(a, b)}\\times${tex_fraction(c, d)}$`
							aa = abs(a);
							bb = abs(b);
							cc = abs(c);
							dd = abs(d);
						
							texte_corr += `$=${signe}${tex_fraction(aa, bb)}\\times${tex_fraction(cc, dd)}$`
							texte_corr += `$=${signe}${tex_fraction(aa + '\\times' + cc, bb + '\\times' + dd)}$`

							for (let k in listec) {listea.push(listec[k])}
							for (let k in listed) {listeb.push(listed[k])}

							listeavf=[];
							listebvf=[];

							listea.forEach (function a_ajouter_dans_listeavf(element) {
								listeavf.push([element,true]);
							});
							listeb.forEach (function a_ajouter_dans_listebvf(element) {
								listebvf.push([element,true]);
							});
							
							for (index=0; index<listeb.length;) {
								for (let j = 0; j <= listea.length;) {
									if (listeb[index] == listea[j]) {
										listebvf[index]=[listeb[index],false];
										listeavf[j]=[listea[j],false];
										listea[j]=1;
										listeb[index]=1;
										break
									}
									j++;
								}
								index++;
							}
						
							a=1;b=1;
							for (let k in listea) {a=a*listea[k]};
							for (let k in listeb) {b=b*listeb[k]};
							
							numerateur ='';
							denominateur ='';
						
							for (let j in listeavf) {
								if (listeavf[j][1]==true) {
									numerateur+=listeavf[j][0] + '\\times';
								}
								else {
									numerateur+='\\cancel{'+listeavf[j][0]+'}\\times';
								}
							}
							numerateur=numerateur.substr(0,numerateur.length-6);

							for (let j in listebvf) {
								if (listebvf[j][1]==true) {
									denominateur+=listebvf[j][0] + '\\times';
								}
								else {
									denominateur+='\\cancel{'+listebvf[j][0]+'}\\times';
								}
							}
							denominateur=denominateur.substr(0,denominateur.length-6);
							
							texte_corr += `$=${signe}\\dfrac{${numerateur}}{${denominateur}}$`
							texte_corr += `$=${signe}${tex_fraction(a,b)}$`
							break
					}
				}
				if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
					this.liste_questions.push(texte);
					this.liste_corrections.push(texte_corr);
					i++;
				}
				cpt++
		}
		
		liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',3,"1 : Fractions à numérateurs et dénominateurs positifs \n 2 : Type 1 et type 3 pour 50%/50%\n 3 : Ecritures fractionnaires à numérateur et dénominateur entiers relatifs"]
	this.besoin_formulaire2_case_a_cocher = ['Avec décomposition']
}

/**
* Calcul du quotient de deux fractions. Paramétrages possibles :
* * 1 : Nombres positifs exclusivement
* * 2 : nombres relatifs
* @auteur Jean-Claude Lhote
*/
function Exercice_diviser_fractions(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1 ; // Avec ou sans relatifs
	this.titre = "Diviser des fractions"
	this.consigne = "Calculer et donner le résultat sous forme irréductible"
	this.spacing = 2;
	this.spacing_corr = 2;
	this.nb_questions = 5;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		liste_fractions = obtenir_liste_fractions_irreductibles();

		let type_de_questions_disponibles
		type_de_questions_disponibles = [parseInt(this.sup)];
		let nombre_de_signe_moins				
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions)
		for (let i = 0, ab,cd,a, b, c, d, p,signe, texte, texte_corr, type_de_questions, cpt=0; i < this.nb_questions&&cpt<50;) {
			type_de_questions = liste_type_de_questions[i];
			ab=choice(liste_fractions);
			cd=choice(liste_fractions);
			a=ab[0];
			b=ab[1]
			c=cd[0];
			d=cd[1];
			
			p=pgcd(a*d,b*c);
			
			switch (type_de_questions){
			//	case 0 : // entier * fraction (tout positif)
			//		texte=`$${tex_fraction(a,1)}\\div${tex_fraction(c,d)}=$`;
			//		if (pgcd(a*d,c)==1) {
			//			texte_corr= `$${tex_fraction(a,1)}\\div${tex_fraction(c,d)}=${tex_fraction(a,1)}\\times${tex_fraction(d,c)}=\\dfrac{${a}}{1}\\times${tex_fraction(d,c)}=${tex_fraction(a +'\\times'+d,'1\\times'+c)}=${tex_fraction(a*d,c)}$`
			//		}
			//		else {
			//			texte_corr= `$${tex_fraction(a,1)}\\div${tex_fraction(c,d)}=${tex_fraction(a,1)}\\times${tex_fraction(d,c)}=${tex_fraction(a*d,c)}=${tex_fraction_reduite(a*d,c)}$`
			//		}
			//		break
			//	
				case 1 : // fraction * fraction tout positif
				texte=`$${tex_fraction(a,b)}\\div${tex_fraction(c,d)}=$`;
				if (p==1) {
					texte_corr= `$${tex_fraction(a,b)}\\div${tex_fraction(c,d)}=${tex_fraction(a,b)}\\times${tex_fraction(d,c)}=${tex_fraction(a +'\\times'+d,b+'\\times'+c)}=${tex_fraction(a*d,b*c)}$`
				}
				else {
					texte_corr= `$${tex_fraction(a,b)}\\div${tex_fraction(c,d)}=${tex_fraction(a,b)}\\times${tex_fraction(d,c)}=${tex_fraction(a +'\\times'+d,b+'\\times'+c)}=${tex_fraction(a*d,b*c)}=${tex_fraction(a*d/p +'\\times\\cancel{'+p+'}',b*c/p+'\\times\\cancel{'+p+'}')}=${tex_fraction(a*d/p,b*c/p)}$`

				}
				break
			
				case 2 :
					a=a*randint(-1,1,[0]);
					b=b*randint(-1,1,[0]);
					c=c*randint(-1,1,[0]);
					d=d*randint(-1,1,[0]);
					nombre_de_signe_moins=(a<0)+(b<0)+(c<0)+(d<0);
					if (Math.pow(-1,nombre_de_signe_moins)==1) {signe=''} else {signe='-'}
					texte=`$${tex_fraction(a,b)}\\div${tex_fraction(c,d)}=$`;
					texte_corr= `$${tex_fraction(a,b)}\\div${tex_fraction(c,d)}$`
					a=abs(a);
					b=abs(b);
					c=abs(c);
					d=abs(d);
					p=pgcd(a*d,b*c);
					texte_corr+=`$=${signe}${tex_fraction(a,b)}\\times${tex_fraction(d,c)}$`
					texte_corr+=`$=${signe}${tex_fraction(a +'\\times'+ecriture_parenthese_si_negatif(d),b+'\\times'+ecriture_parenthese_si_negatif(c))}$`
					if (p==1) {
						texte_corr+=`$=${signe}${tex_fraction_signe(a*d,b*c)}$`
					}
					else {
	
						texte_corr+=`$=${signe}${tex_fraction(a*d,b*c)}$`
						if (a*d!=b*c){
							texte_corr+=`$=${signe}${tex_fraction(a*d/p +'\\times\\cancel{'+p+'}',b*c/p+'\\times\\cancel{'+p+'}')}$`
							texte_corr+=`$=${signe}${tex_fraction(a*d/p,b*c/p)}$`
						}
						else {
							texte_corr+=`$=${signe}1$`							
						}
					}	
				break	
			}
		
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			
			cpt++
		}
		liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',2,"1 : Fractions à numérateur et dénominateur positifs \n 2 : Fractions à numérateur et dénominateur relatifs"]
}

/**
* * Calcul fractionnaire : somme d'une fraction et du produit de deux autres fractions. Paramétrages possibles :
* 1 : Calcul avec nombres positifs sans piège de priorité
* * 2 : Calcul avec nombres positifs avec piège
* * 3 : Calcul avec nombres relatifs
* @auteur Jean-Claude Lhote
*/
function Exercice_additionner_fraction_produit(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1 ; // Avec ou sans relatifs
	this.titre = "Fractions et priorités opératoires"
	this.consigne = "Calculer et donner le résultat sous forme irréductible"
	this.spacing = 2;
	this.spacing_corr = 2;
	this.nb_questions = 5;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let type_de_questions_disponibles
		liste_fractions = obtenir_liste_fractions_irreductibles();
		let nombre_de_signe_moins;
		if (this.sup==1) {type_de_questions_disponibles = [1,1,2,2]} // 1*nombre entier,3*fraction (pas de négatifs)
		else if (this.sup==2) {type_de_questions_disponibles = [2,2,3,3]} // fractions, 2*positifs, 2*relatifs
		else {type_de_questions_disponibles = [3]}
		
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions)
		for (let i = 0,ab,cd,ef, a, b, c, d, e, f, p, k1, k2, signe1,signe2, texte, texte_corr, type_de_questions, cpt=0; i < this.nb_questions&&cpt<50;) {
			type_de_questions = liste_type_de_questions[i];
			ab=choice(liste_fractions);
			cd=choice(liste_fractions);
			ef=choice(liste_fractions)
			a=ab[0];
			b=ab[1];
			c=cd[0];
			d=cd[1];
			e=ef[0];
			f=ef[1];
	
			switch (type_de_questions){
				case 1 : // sans piège fraction1 + fraction2 x fraction3 (tout positif)
					texte=`$${tex_fraction(a,b)}+${tex_fraction(c,d)}\\times${tex_fraction(e,f)}$`;
					
					p=pgcd(c*e,d*f);
					texte_corr= `$${tex_fraction(a,b)}+${tex_fraction(c,d)}\\times${tex_fraction(e,f)}$`;
					texte_corr+=`$=${tex_fraction(a,b)}+${tex_fraction(c +'\\times'+e,d+'\\times'+f)}$`;
					texte_corr+=`$=${tex_fraction(a,b)}+${tex_fraction(c*e,d*f)}$`;
					// faut-il simplifier c*e/d*f
					if ((p!=1)&&(ppcm(b,d*f)>ppcm(b,d*f/p))) {
						texte_corr+=`$=${tex_fraction(a,b)}+${tex_fraction(e*c/p +'\\times\\cancel{'+p+'}',f*d/p+'\\times\\cancel{'+p+'}')}$`
						c=e*c/p;
						d=f*d/p;
					}
					else {
						c=e*c;
						d=f*d;
					}
					p=ppcm(b,d); // p = dénominateur commun
					k1=p/b;
					k2=p/d;
					if (k1!=1) {
						texte_corr+=`$=${tex_fraction(a+mise_en_evidence('\\times'+k1),b+mise_en_evidence('\\times'+k1))}$`;
					} 
					else {
						texte_corr+=`$=${tex_fraction(a,b)}$`	
					}
					if (k2!=1) {
						texte_corr+=`$+${tex_fraction(c+mise_en_evidence('\\times'+k2),d+mise_en_evidence('\\times'+k2))}$`;
					} 
					else {
						texte_corr+=`$+${tex_fraction(c,d)}$`	
					}
								
					texte_corr+=`$=${tex_fraction(a*k1,p)}+${tex_fraction(c*k2,p)}$`;
					e=a*k1+c*k2;
					f=p;
					texte_corr+=`$=${tex_fraction(e,f)}$`;
					p=pgcd(e,f);
					// faut-il simplifier e/f
					if (p!=1) {
						texte_corr+=`$=${tex_fraction(e/p +'\\times\\cancel{'+p+'}',f/p+'\\times\\cancel{'+p+'}')}$`
						texte_corr+=`$=${tex_fraction_reduite(e/p,f/p)}$`;
					}
				
					break
				
				case 2 : // avec piege addition non prioritaire fraction1 + fraction2 * fraction3 tout positif
					d = b;
					
					texte = `$${tex_fraction(a, b)}+${tex_fraction(c, d)}\\times${tex_fraction(e, f)}$`;
				
					p = pgcd(c * e, d * f);
					texte_corr = `$${tex_fraction(a, b)}+${tex_fraction(c, d)}\\times${tex_fraction(e, f)}$`;
					texte_corr += `$=${tex_fraction(a, b)}+${tex_fraction(c + '\\times' + e, d + '\\times' + f)}$`;
					texte_corr += `$=${tex_fraction(a, b)}+${tex_fraction(c * e, d * f)}$`
					
					// faut-il simplifier c*e/d*f
					if ((p!=1)&&(ppcm(b,d*f)>ppcm(b,d*f/p))) {
						texte_corr+=`$=${tex_fraction(a,b)}+${tex_fraction(e*c/p +'\\times\\cancel{'+p+'}',f*d/p+'\\times\\cancel{'+p+'}')}$`
						c=e*c/p;
						d=f*d/p;
					}
					else {
						c=e*c;
						d=f*d;
					}
					p = ppcm(b, d); //denominateur commun = p
					k1 = p / b;
					k2 = p / d;
					if (k1 != 1) {
						texte_corr += `$=${tex_fraction(a + mise_en_evidence('\\times' + k1), b + mise_en_evidence('\\times' + k1))}$`
					}
					else {
						texte_corr += `$=${tex_fraction(a, b)}$`
					}
					if (k2 != 1) {
						texte_corr += `$+${tex_fraction(c + '\\times' + k2, d + '\\times' + k2)}$`
					}
					else {
						texte_corr += `$+${tex_fraction(c, d)}$`
					}
					texte_corr += `$=${tex_fraction(a * k1, b * k1)}+${tex_fraction(c * k2, d * k2)}=${tex_fraction(a * k1 + c * k2, p)}$`
					e=a * k1 + c * k2;
					f=p;
					texte_corr+=`$=${tex_fraction(e,f)}$`;
					p=pgcd(e,f);
					// faut-il simplifier e/f
					if (p!=1) {
						texte_corr+=`$=${tex_fraction(e/p +'\\times\\cancel{'+p+'}',f/p+'\\times\\cancel{'+p+'}')}$`
						texte_corr+=`$=${tex_fraction_reduite(e/p,f/p)}$`;
					}
			
				break

				case 3 :
					a=a*randint(-1,1,[0]);
					b=b*randint(-1,1,[0]);
					c=c*randint(-1,1,[0]);
					d=d*randint(-1,1,[0]);
					e=e*randint(-1,1,[0]);
					f=f*randint(-1,1,[0]);

					nombre_de_signe_moins=(c<0)+(d<0)+(e<0)+(f<0);
					if (Math.pow(-1,nombre_de_signe_moins)==1) {signe2='+'} else {signe2='-'}
					texte=`$${tex_fraction(a,b)}+${tex_fraction(c,d)}\\times${tex_fraction(e,f)}=$`;
					texte_corr=`$${tex_fraction(a,b)}+${tex_fraction(c,d)}\\times${tex_fraction(e,f)}$`
					
					c=abs(c); // gestion du signe du produit avec {signe}
					d=abs(d);
					e=abs(e);
					f=abs(f);
					
					
					if (a*b>0) {  //suppression des signes - superflus de la première fraction
					
						signe1=''
					} else {signe1='-'}

					a=abs(a);
					b=abs(b);

					texte_corr+=`$=${signe1}${tex_fraction(a,b)}${signe2}${tex_fraction(c +'\\times'+e,d+'\\times'+f)}$`
					texte_corr+=`$=${signe1}${tex_fraction(a,b)}${signe2}${tex_fraction(c*e,d*f)}$`
					
					p=pgcd(c*e,d*f);
					// faut-il simplifier c*e/d*f
					if ((p!=1)&&(ppcm(b,d*f)>ppcm(b,d*f/p))) {
						texte_corr+=`$=${signe1}${tex_fraction(a,b)}${signe2}${tex_fraction(e*c/p +'\\times\\cancel{'+p+'}',f*d/p+'\\times\\cancel{'+p+'}')}$`
						c=e*c/p;
						d=f*d/p;
					}
					else {
						c=e*c;
						d=f*d;
					}
					p=ppcm(d,b);  // mise au même dénominateur
					if (((d)%b!=0)&&(b%(d)!=0)) {
						// dénominateur commun = p
						k1=p/b;
						k2=p/d;
						texte_corr+=`$=${signe1}${tex_fraction(a+mise_en_evidence('\\times'+k1),b+mise_en_evidence('\\times'+k1))}${signe2}${tex_fraction(c+mise_en_evidence('\\times'+k2),d+mise_en_evidence('\\times'+k2))}$`
						texte_corr+=`$=${signe1}${tex_fraction(a*k1,b*k1)}${signe2}${tex_fraction(c*k2,d*k2)}$`
						texte_corr+=`$=${tex_fraction(signe1+a*k1+signe2+c*k2,b*k1)}$`
						a=a*k1;
						c=c*k2;
						d=p;
					}
					else {
						if (p==d) {
							k1=d/b;  // d = dénominateur commun
							texte_corr+=`$=${signe1}${tex_fraction(a+mise_en_evidence('\\times'+k1),b+mise_en_evidence('\\times'+k1))}${signe2}${tex_fraction(c,d)}$`
						texte_corr+=`$=${signe1}${tex_fraction(a*k1,d)}${signe2}${tex_fraction(c,d)}$`
						texte_corr+=`$=${tex_fraction(signe1+a*k1+signe2+c,d)}$`	
						a=a*k1;
						} 
						else{  // b=k2*d
							k2=b/d;  // b= dénominateur commun
							texte_corr+=`$=${signe1}${tex_fraction(a,b)}${signe2}${tex_fraction(c+mise_en_evidence('\\times'+k2),d+mise_en_evidence('\\times'+k2))}$`
						texte_corr+=`$=${signe1}${tex_fraction(a,b)}${signe2}${tex_fraction(c*k2,b)}$`
						texte_corr+=`$=${tex_fraction(signe1+a+signe2+c*k2,b)}$`
						c=c*k2;
						d=d*k2;
						}
					}
					
					if (a!=c) {
						e=0;
						if (signe1=='') {
							e=a;
						}
						else {
							e=-a
						}
						if (signe2=='+') {e+=c} else {e=e-c}

					}
					else {
						if (((signe1=='-')&&(signe2=='+'))||((signe1=='')&&(signe2=='-'))) {
							e=0;	
						}
						else {
							e=0;
							if (signe1=='') {e=a+c} else {e=-a-c}
						}
					}
					
					texte_corr+=`$=${tex_fraction_signe(e,d)}$`
					p=pgcd(abs(e),d);
					if (p!=1) {
						f=d/p;
						e=e/p;
						if (e>0) { // fraction positive => pas de signe
						texte_corr+=`$=${tex_fraction(e+'\\times\\cancel{'+p+'}',f+'\\times\\cancel{'+p+'}')}$`
						texte_corr+=`$=${tex_fraction(e,f)}$`
						}
						else {  // numérateur négatif => signe - devant les fractions suivantes.
							texte_corr+=`$=-${tex_fraction(-e+'\\times\\cancel{'+p+'}',f+'\\times\\cancel{'+p+'}')}$`
							texte_corr+=`$=-${tex_fraction(-e,f)}$`	
						}
					}

				break	
			}
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++
		}
		liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',3,"1 : nombres positifs sans piège de priorité\n 2 : 2 calculs avec positifs et piège de priorité et 2 calculs avec relatifs\n 3 : calculs avec relatifs"]
}

/**
* Développer en utilisant la distributivité simple
*
* * La lettre peut être x, y, z, t, a, b ou c
* * 3 fois sur 6 c'est une distributivité simple :  k(ax+b)
* * 1 fois sur 6 c'est une distributivité simple : (ax+b)×k
* * 1 fois sur 6, la variable est en facteur : kx(ax+b)
* * 1 fois sur 6 il faut ensuite réduire : k(ax+b)+c
* 
* Niveau de difficulté : 
* * 1 : Multiplication par un facteur positif
* * 2: Multiplication par un facteur relatif
* @Auteur Rémi Angot
*/
function Exercice_developper(difficulte=1){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = difficulte ;
	this.titre = "Utiliser la simple distributivité";
	this.consigne = 'Développer.';
	this.spacing = 1;
	this.nb_questions = 5 ;


	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		
		let lettre = ['x','y','z','t','a','b','c'];
		let type_de_questions_disponibles = ['simple','simple','simple','simple2','x_en_facteur','developper_et_reduire']
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		for (let i = 0, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) {
			type_de_questions = liste_type_de_questions[i];
			let k = randint(2,11);
			if (this.sup>1){ // si difficulté 2, k peut être négatif
				k = k*choice([-1,1])
			}
			let a = randint(1,9);
			let b = randint(1,9)*choice([-1,1]);
			let inconnue = choice(lettre);
			switch (type_de_questions){
				case 'simple' :
					if (a==1){ // ne pas écrire 1x
						texte = `$${lettre_depuis_chiffre(i+1)}=${k}(${inconnue}${ecriture_algebrique(b)})$`;
					} else {
						texte = `$${lettre_depuis_chiffre(i+1)}=${k}(${a}${inconnue}${ecriture_algebrique(b)})$`;
					}
					
					if (a==1){ // ne pas écrire 1x
						texte_corr = `$${lettre_depuis_chiffre(i+1)}=${k}(${inconnue}${ecriture_algebrique(b)})=${k}
						\\times ${inconnue}${signe(k*b)}${abs(k)}\\times${abs(b)}=${k*a}${inconnue}${ecriture_algebrique(k*b)}$`;
					} else {
						texte_corr = `$${lettre_depuis_chiffre(i+1)}=${k}(${a}${inconnue}${ecriture_algebrique(b)})=${k}
						\\times ${a}${inconnue}${signe(k*b)}${abs(k)}\\times${abs(b)}=${k*a}${inconnue}${ecriture_algebrique(k*b)}$`;

					}
					break ;
				case 'simple2' :
					if (a==1){ // ne pas écrire 1x
						texte = `$${lettre_depuis_chiffre(i+1)}=(${inconnue}${ecriture_algebrique(b)})\\times${ecriture_parenthese_si_negatif(k)}$`;
					} else {
						texte = `$${lettre_depuis_chiffre(i+1)}=(${a}${inconnue}${ecriture_algebrique(b)})\\times${ecriture_parenthese_si_negatif(k)}$`;
					}
					
					if (a==1){ // ne pas écrire 1x
						texte_corr = `$${lettre_depuis_chiffre(i+1)}=(${inconnue}${ecriture_algebrique(b)})\\times${k}=${k}
						\\times ${inconnue}${signe(k*b)}${abs(k)}\\times${abs(b)}=${k*a}${inconnue}${ecriture_algebrique(k*b)}$`;
					} else {
						texte_corr = `$${lettre_depuis_chiffre(i+1)}=(${a}${inconnue}${ecriture_algebrique(b)})\\times${k}=${k}
						\\times ${a}${inconnue}${signe(k*b)}${abs(k)}\\times${abs(b)}=${k*a}${inconnue}${ecriture_algebrique(k*b)}$`;

					}
					break ;
				case 'x_en_facteur' :
					if (a==1){ // ne pas écrire 1x
						texte = `$${lettre_depuis_chiffre(i+1)}=${k}${inconnue}(${inconnue}${ecriture_algebrique(b)})$`;
					} else {
						texte = `$${lettre_depuis_chiffre(i+1)}=${k}${inconnue}(${a}${inconnue}${ecriture_algebrique(b)})$`;
					}
					
					if (a==1){ // ne pas écrire 1x
						texte_corr = `$${lettre_depuis_chiffre(i+1)}=${k}${inconnue}(${inconnue}${ecriture_algebrique(b)})=${k}${inconnue}\\times ${inconnue} ${signe(k*b)}${k}${inconnue}\\times ${abs(b)}=${k*a}${inconnue}^2${ecriture_algebrique(k*b)}${inconnue}$`;
					} else {
						texte_corr = `$${lettre_depuis_chiffre(i+1)}=${k}${inconnue}(${a}${inconnue}${ecriture_algebrique(b)})=${k}${inconnue}\\times ${a}${inconnue} ${signe(k*b)}${k}${inconnue}\\times ${abs(b)}=${k*a}${inconnue}^2${ecriture_algebrique(k*b)}${inconnue}$`;

					}
					break ;
				case 'developper_et_reduire' :
					let c = randint(2,9);
					if (a==1){ // ne pas écrire 1x
						texte = `$${lettre_depuis_chiffre(i+1)}=${k}(${inconnue}${ecriture_algebrique(b)})+${c}$`;
					} else {
						texte = `$${lettre_depuis_chiffre(i+1)}=${k}(${a}${inconnue}${ecriture_algebrique(b)})+${c}$`;
					}
					
					if (a==1){ // ne pas écrire 1x
						texte_corr = `$${lettre_depuis_chiffre(i+1)}=${k}(${inconnue}${ecriture_algebrique(b)})+${c}=${k*a}${inconnue}${ecriture_algebrique(k*b)}+${c}=${k*a}${inconnue}${ecriture_algebrique(k*b+c)}$`;
					} else {
						texte_corr = `$${lettre_depuis_chiffre(i+1)}=${k}(${a}${inconnue}${ecriture_algebrique(b)})+${c}=${k*a}${inconnue}${ecriture_algebrique(k*b)}+${c}=${k*a}${inconnue}${ecriture_algebrique(k*b+c)}$`;

					}
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
* Équation du premier degré
* * Type 1 : x+a=b ou ax=b
* * Type 2 : ax+b=c
* * Type 3 : ax+b=cx+d
* * Tous les types
* @Auteur Rémi Angot
*/
function Exercice_equation1(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Équation du premier degré"
	this.consigne = 'Résoudre les équations suivantes'
	this.spacing = 2;
	sortie_html ? this.spacing_corr = 3 : this.spacing_corr = 2;
	this.correction_detaillee_disponible = true;
	this.sup = true; // Avec des nombres relatifs
	this.sup2 = 4; // Choix du type d'équation 

	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		switch (this.sup2.toString()){
			case '1':
			liste_type_de_questions = ['ax=b','x+b=c'];
			break
			case '2':
			liste_type_de_questions = ['ax+b=c'];
			break
			case '3':
			liste_type_de_questions = ['ax+b=cx+d'];
			break
			default:
			liste_type_de_questions = ['ax+b=0','ax+b=c','ax=b','x+b=c','ax+b=cx+d'];
			break

		}
		liste_type_de_questions = combinaison_listes(liste_type_de_questions,this.nb_questions)
		for (let i = 0, a, b, c, d, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
			a = randint(2,13);
			b = randint(1,13);
			c = randint(1,13);
			d = randint(1,13);
			if (this.sup) {
				a *= choice([-1,1]);
				b *= choice([-1,1]);
				c *= choice([-1,1]);
				d *= choice([-1,1]);

			}
			if (liste_type_de_questions[i]=='ax+b=0' || liste_type_de_questions[i]=='ax+b=c') {
				if (liste_type_de_questions[i]=='ax+b=0') {c = 0}
				if (!this.sup && c<b) {
					b = randint(1,9)
					c = randint(b,15) // c sera plus grand que b pour que c-b>0
				}
				texte = `$${a}x${ecriture_algebrique(b)}=${c}$`;
				texte_corr = texte+'<br>';
				if (this.correction_detaillee) {
					if (b>0) {
						texte_corr += `On soustrait $${b}$ aux deux membres.<br>`	
					} else {
						texte_corr += `On ajoute $${-1*b}$ aux deux membres.<br>`
					}
				}
				texte_corr += `$${a}x${ecriture_algebrique(b)}${mise_en_evidence(ecriture_algebrique(-1*b))}=${c}${mise_en_evidence(ecriture_algebrique(-1*b))}$<br>`;
				texte_corr += `$${a}x=${c-b}$<br>`
				if (this.correction_detaillee) {texte_corr += `On divise les deux membres par $${a}$.<br>`}
				texte_corr += `$${a}x${mise_en_evidence('\\div'+ecriture_parenthese_si_negatif(a))}=${c-b+mise_en_evidence('\\div'+ecriture_parenthese_si_negatif(a))}$<br>`
				texte_corr += `$x=${tex_fraction(c-b,a)}$`
				if (pgcd(abs(a),abs(c-b))>1 || a<0){
					texte_corr += `<br>$x=${tex_fraction_reduite(c-b,a)}$`
				}
			}
			if (liste_type_de_questions[i]=='x+b=c') {
				if (!this.sup && c<b) {
					b = randint(1,9)
					c = randint(b,15) // c sera plus grand que b pour que c-b>0
				}
				texte = `$x${ecriture_algebrique(b)}=${c}$`;
				texte_corr = texte+'<br>';
				if (this.correction_detaillee) {
					if (b>0) {
						texte_corr += `On soustrait $${b}$ aux deux membres.<br>`	
					} else {
						texte_corr += `On ajoute $${-1*b}$ aux deux membres.<br>`
					}
				}
				texte_corr += `$x${ecriture_algebrique(b)}${mise_en_evidence(ecriture_algebrique(-1*b))}=${c}${mise_en_evidence(ecriture_algebrique(-1*b))}$<br>`;
				texte_corr += `$x=${c-b}$<br>`
			}
			if (liste_type_de_questions[i]=='ax=b') {
				texte = `$${a}x=${b}$`;
				texte_corr = texte+'<br>';
				if (this.correction_detaillee) {texte_corr += `On divise les deux membres par $${a}$.<br>`}
				texte_corr += `$${a}x${mise_en_evidence('\\div'+ecriture_parenthese_si_negatif(a))}=${b+mise_en_evidence('\\div'+ecriture_parenthese_si_negatif(a))}$<br>`
				texte_corr += `$x=${tex_fraction(b,a)}$`
				if (pgcd(abs(a),abs(b))>1 || a<0){
					texte_corr += `<br>$x=${tex_fraction_reduite(b,a)}$`
				}
			}
			if (liste_type_de_questions[i]=='ax+b=cx+d') {
				if (c==a) {c = randint(1,13,[a])} // sinon on arrive à une division par 0
				if (!this.sup && a<c) {
					c = randint(1,9)
					a = randint(c+1,15) // a sera plus grand que c pour que a-c>0
				}
				if (!this.sup && d<b) {
					b = randint(1,9)
					d = randint(b+1,15) // d sera plus grand que b pour que d-b>0
				}
				texte = `$${rien_si_1(a)}x${ecriture_algebrique(b)}=${rien_si_1(c)}x${ecriture_algebrique(d)}$`;
				texte_corr = texte+'<br>';
				if (this.correction_detaillee) {
					if (c>0) {
						texte_corr += `On soustrait $${rien_si_1(c)}x$ aux deux membres.<br>`	
					} else {
						texte_corr += `On ajoute $${rien_si_1(-1*c)}x$ aux deux membres.<br>`
					}
				}
				texte_corr += `$${rien_si_1(a)}x${ecriture_algebrique(b)}${mise_en_evidence(signe(-1*c)+rien_si_1(abs(c))+'x')}=${c}x+${d}${mise_en_evidence(signe(-1*c)+rien_si_1(abs(c))+'x')}$<br>`;
				texte_corr += `$${rien_si_1(a-c)}x${ecriture_algebrique(b)}=${d}$<br>`
				if (this.correction_detaillee) {
					if (b>0) {
						texte_corr += `On soustrait $${b}$ aux deux membres.<br>`	
					} else {
						texte_corr += `On ajoute $${-1*b}$ aux deux membres.<br>`
					}
				}
				texte_corr += `$${rien_si_1(a-c)}x${mise_en_evidence(ecriture_algebrique(-1*b))}=${d}${mise_en_evidence(ecriture_algebrique(-1*b))}$<br>`
				texte_corr += `$${rien_si_1(a-c)}x=${d-b}$<br>`

				if (this.correction_detaillee) {texte_corr += `On divise les deux membres par $${a-c}$.<br>`}
				texte_corr += `$${rien_si_1(a-c)}x${mise_en_evidence('\\div'+ecriture_parenthese_si_negatif(a-c))}=${d-b+mise_en_evidence('\\div'+ecriture_parenthese_si_negatif(a-c))}$<br>`
				texte_corr += `$x=${tex_fraction(d-b,a-c)}$`
				if (pgcd(abs(d-b),abs(a-c))>1 || (a-c)<0){
					texte_corr += `<br>$x=${tex_fraction_reduite(d-b,a-c)}$`
				}
			}
				
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte)//replace(/1x/g,'x')); //remplace 1x par x
				this.liste_corrections.push(texte_corr) //.replace(/1x/g,'x')); //remplace 1x par x
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
	 this.besoin_formulaire_case_a_cocher  = ['Avec des nombres relatifs'];	
	 this.besoin_formulaire2_numerique = ["Type d'équations",4,"1 : ax=b ou x+a=b\n2: ax+b=c\n3: ax+b=cx+d\n4: Les 2 types précédents"] 	
}

/**
* @auteur Jean-Claude Lhote
*/
function Exercice_Thales(){

	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Déterminer une longueur avec la propriété de Thales";
	this.consigne = "";
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;
	sortie_html ? this.spacing_corr = 3.5 : this.spacing_corr = 2.5
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1; // 1 calcul direct | 2 calcul en deux étapes | 3 version 1&2 sans figure
	// paramètres communs Html ou Latex
	

	// let s1='A',s2='B',s3='C',s4='M',s5='N'
		// coefficient de l'homothétie compris entre -0,8 et -0,2 ou entre 0,2 et 0,8 pour éviter les constructions trop serrées
		this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = [];
		this.liste_corrections = [];
		let lettre1 = randint(1,26)	// aleatoirisation du nom des points
		let s1 = lettre_depuis_chiffre(lettre1)
		lettre2 = randint(1, 26, [lettre1])
		let s2 = lettre_depuis_chiffre(lettre2)
		lettre3 = randint(1, 26, [lettre1, lettre2])
		let s3 = lettre_depuis_chiffre(lettre3)
		lettre4 = randint(1, 26, [lettre1, lettre2, lettre3])
		let s4 = lettre_depuis_chiffre(lettre4)
		lettre5 = randint(1, 26, [lettre1, lettre2, lettre3, lettre4])
		let s5 = lettre_depuis_chiffre(lettre5)
		let x2 = randint(2,4)
		let y2 = randint(3, 5)
		let x3 = randint(5, 6)
		let y3 = randint(-2, 1)
		let k = randint(2, 8) * randint(-1, 1, [0]) / 10
		if (this.quatrieme) {k=abs(k)}	
		let dist23 =Math.sqrt((x3-x2)*(x3-x2)+(y3-y2)*(y3-y2)) 		//calcul des longueurs du triangle principal
		let dist12 = Math.sqrt(x2 * x2 + y2 * y2)
		let dist13 = Math.sqrt(x3 * x3 + y3 * y3)
		let dist45 = dist23 * abs(k)		//calcul des longueurs du triangle secondaires
		let dist14 = dist12 * abs(k)
		let dist15 = dist13 * abs(k)
		dist23 = Math.round(dist23 * 10) / 10 // On ne garde qu'une approximation au dixième pour l'exercice
		dist12 = Math.round(dist12 * 10) / 10
		dist13 = Math.round(dist13 * 10) / 10
		dist45 = Math.round(dist45 * 10) / 10
		dist14 = Math.round(dist14 * 10) / 10
		dist15 = Math.round(dist15 * 10) / 10

		let s45 = arrondi_virgule(dist45, 1)			// mise en texte avec 1 chiffres après la virgule pour énoncé
		let s13 = arrondi_virgule(dist13, 1)
		let s12 = arrondi_virgule(dist12, 1)
		let s15 = arrondi_virgule(dist15, 1)
		let s14 = arrondi_virgule(dist14, 1)
		let s23 = arrondi_virgule(dist23, 1)
		if (k < 0) { dist35 = dist13 + dist15 } else { dist35 = dist13 - dist15 } // calcul de la longueur intermédiaire dans un cas classique ou en papillon
		let s35 = arrondi_virgule(dist35,1)  // à priori, c'est déjà arrondi au dixième, mais je me méfie des calculs flottants en js
		let niv_diff=randint(1,2);
		if (sortie_html) {
			this.type_exercice = 'MG32';
			this.taille_div_MG32 = [700,500];
			let codeBase64

			if (k<0) {codeBase64 ="TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACX#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAJBJwBANgAAAAAAAEAzAAAAAAAABwABQHYBR64UeuFAcdwo9cKPXP####8AAAABABRDRHJvaXRlRGlyZWN0aW9uRml4ZQD#####AQAAAAAQAAABAAEAAAABAT#wAAAAAAAA#####wAAAAEAD0NQb2ludExpZURyb2l0ZQD#####AQAAAAAQAAJJJwDAGAAAAAAAAAAAAAAAAAAABQABQEerQ5WBBiUAAAAC#####wAAAAEACUNEcm9pdGVBQgD#####AQAAAAASAAABAAEAAAABAAAAA#####8AAAABABZDRHJvaXRlUGVycGVuZGljdWxhaXJlAP####8BAAAAABAAAAEAAQAAAAEAAAAE#####wAAAAEACUNDZXJjbGVPQQD#####AQAAAAABAAAAAQAAAAP#####AAAAAQAQQ0ludERyb2l0ZUNlcmNsZQD#####AAAABQAAAAb#####AAAAAQAQQ1BvaW50TGllQmlwb2ludAD#####AQAAAAAQAAABBQABAAAABwAAAAkA#####wEAAAAAEAACSicAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAASAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MgABMgAAAAFAAAAAAAAAAAAAABEA#####wACeTIAATUAAAABQBQAAAAAAAAAAAARAP####8AAngzAAE2AAAAAUAYAAAAAAAAAAAAEQD#####AAJ5MwACLTH#####AAAAAQAMQ01vaW5zVW5haXJlAAAAAT#wAAAAAAAAAAAAEQD#####AAFrAAQtMC41AAAAEgAAAAE#4AAAAAAAAP####8AAAABABBDUG9pbnREYW5zUmVwZXJlAP####8BAAAAABgAAlonAAAAAAAAAAAAQAgAAAAAAAAHAAAAAAoAAAABAAAAAAAAAAAAAAABAAAAAAAAAAAAAAATAP####8AAAAAABgAAkInAMAwAAAAAAAAwEOAAAAAAAAHAAAAAAoAAAAOAAAADwAAAA4AAAAQAAAAEwD#####AAAAAAAYAAJDJwAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAADgAAABEAAAAOAAAAEgAAAAwA#####wAAABQAAAAOAAAAEwAAAA8A#####wAAAAAAGAACTScAwCQAAAAAAADAAAAAAAAAAAcAAAAAFQAAABcAAAAPAP####8AAAAAABgAAk4nAMAzAAAAAAAAwEMAAAAAAAAHAAAAABYAAAAX#####wAAAAEACUNQb2x5Z29uZQD#####AAAAAAACAAAABAAAABYAAAAVAAAAFAAAABYAAAAUAP####8AAAAAAAIAAAAEAAAAGQAAABQAAAAYAAAAGf####8AAAABABBDU3VyZmFjZVBvbHlnb25lAP####8BAAD#AAAABQAAABsAAAAVAP####8B#wAAAAAABQAAABr#####AAAAAQAQQ01hY3JvQXBwYXJpdGlvbgD#####AP8AAAH#####EECIoKPXCj1xQELhR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAZBcHBBTU4AAAAAAAEAAAAcAAAAABYA#####wD#AAAB#####xBAiLCj1wo9cUBUMKPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAGQXBwQUJDAAAAAAABAAAAHQD#####AAAAAQARQ01hY3JvRGlzcGFyaXRpb24A#####wD#AAAB#####xBAi+Cj1wo9cUBE4UeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAHTWFzcUFNTgAAAAAAAQAAABwAAAAXAP####8A#wAAAf####8QQIvoo9cKPXFAVPCj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAB01hc3FBQkMAAAAAAAEAAAAd#####wAAAAEAC0NNYWNyb1BhdXNlAP####8A#wAAAf####8QQIj4o9cKPXFAX3Cj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAABVBhdXNlAAAAAAAB#####wAAAAEAEUNNYWNyb1N1aXRlTWFjcm9zAP####8A#wAAAf####8QQFHFHrhR64VAePwo9cKPXAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAClRyaWFuZ2xlIDEAAAAAAAMAAAAfAAAAIgAAACEAAAAZAP####8A#wAAAf####8QQFFFHrhR64VAe3wo9cKPXAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAClRyaWFuZ2xlIDIAAAAAAAMAAAAeAAAAIgAAACAAAAAO##########8="
			}
			else {codeBase64 ="TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACX#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAJBJwDAKAAAAAAAAEAiAAAAAAAABwABQHMxR64UeuFAcbwo9cKPXP####8AAAABABRDRHJvaXRlRGlyZWN0aW9uRml4ZQD#####AQAAAAAOAAABAAEAAAABAT#wAAAAAAAA#####wAAAAEAD0NQb2ludExpZURyb2l0ZQD#####AQAAAAAQAAJJJwDAGAAAAAAAAAAAAAAAAAAABQABQEerQ5WBBiUAAAAC#####wAAAAEACUNEcm9pdGVBQgD#####AQAAAAASAAABAAEAAAABAAAAA#####8AAAABABZDRHJvaXRlUGVycGVuZGljdWxhaXJlAP####8BAAAAAA4AAAEAAQAAAAEAAAAE#####wAAAAEACUNDZXJjbGVPQQD#####AQAAAAABAAAAAQAAAAP#####AAAAAQAQQ0ludERyb2l0ZUNlcmNsZQD#####AAAABQAAAAb#####AAAAAQAQQ1BvaW50TGllQmlwb2ludAD#####AQAAAAAOAAABBQABAAAABwAAAAkA#####wEAAAAAEAACSicAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAASAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MgABMgAAAAFAAAAAAAAAAAAAABEA#####wACeTIAATUAAAABQBQAAAAAAAAAAAARAP####8AAngzAAE2AAAAAUAYAAAAAAAAAAAAEQD#####AAJ5MwACLTH#####AAAAAQAMQ01vaW5zVW5haXJlAAAAAT#wAAAAAAAAAAAAEQD#####AAFrAAMwLjUAAAABP+AAAAAAAAD#####AAAAAQAQQ1BvaW50RGFuc1JlcGVyZQD#####AQAAAAAYAAJaJwAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAEwD#####AAAAAAAYAAJCJwDAMAAAAAAAAMBDgAAAAAAABwAAAAAKAAAADgAAAA8AAAAOAAAAEAAAABMA#####wAAAAAAGAACQycAAAAAAAAAAABACAAAAAAAAAcAAAAACgAAAA4AAAARAAAADgAAABIAAAAMAP####8AAAAUAAAADgAAABMAAAAPAP####8AAAAAABgAAk0nAMA7AAAAAAAAwDcAAAAAAAAHAAAAABUAAAAXAAAADwD#####AAAAAAAYAAJOJwDAKAAAAAAAAEAAAAAAAAAABwAAAAAWAAAAF#####8AAAABAAlDUG9seWdvbmUA#####wAAAAAAAgAAAAQAAAAWAAAAFQAAABQAAAAWAAAAFAD#####AAAAAAACAAAABAAAABkAAAAUAAAAGAAAABn#####AAAAAQAQQ1N1cmZhY2VQb2x5Z29uZQD#####AQAA#wAAAAUAAAAbAAAAFQD#####Af8AAAAAAAUAAAAa#####wAAAAEAEENNYWNyb0FwcGFyaXRpb24A#####wD#AAAB#####xBAiKCj1wo9cUBC4UeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAGQXBwQU1OAAAAAAABAAAAHAAAAAAWAP####8A#wAAAf####8QQIiwo9cKPXFAVDCj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAABkFwcEFCQwAAAAAAAQAAAB0A#####wAAAAEAEUNNYWNyb0Rpc3Bhcml0aW9uAP####8A#wAAAf####8QQIvgo9cKPXFAROFHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAAB01hc3FBTU4AAAAAAAEAAAAcAAAAFwD#####AP8AAAH#####EECL6KPXCj1xQFTwo9cKPXACAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAdNYXNxQUJDAAAAAAABAAAAHf####8AAAABAAtDTWFjcm9QYXVzZQD#####AP8AAAH#####EECI+KPXCj1xQF9wo9cKPXACAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAVQYXVzZQAAAAAAAf####8AAAABABFDTWFjcm9TdWl0ZU1hY3JvcwD#####AP8AAAH#####EEBRxR64UeuFQHj8KPXCj1wCAAAAAAAAAAAAAAAAAQAAAAAAAAAAAApUcmlhbmdsZSAxAAAAAAADAAAAHwAAACIAAAAhAAAAGQD#####AP8AAAH#####EEBRRR64UeuFQHt8KPXCj1wCAAAAAAAAAAAAAAAAAQAAAAAAAAAAAApUcmlhbmdsZSAyAAAAAAADAAAAHgAAACIAAAAgAAAADv##########"
			}
			if (this.sup==1){  // calcul direct de AM et BC : pas de calcul intermédiaire de AN
				texte = `Dans la figure ci-dessous, les droites $(${s4+s5})$ et $(${s2+s3})$ sont parallèles.<br> $${s1+s2}=${s12}$ cm, $${s1+s3}=${s13}$ cm, $${s4+s5}=${s45}$ cm et $${s1+s5}=${s15}$ cm.<br>`
				texte += `Calculer $${s1+s4}$ et $${s2+s3}$.`
				if (k>0) {
					texte_corr = 'Dans le triangle '+`$${s1+s2+s3}$`+', les droites '+`$(${s4+s5})$`+' et '+`$(${s2+s3})$`+' sont parallèles.<br>'+' D&rsquo;après la propriété de Thales, on a '+`$${tex_fraction(s1+s4,s1+s2)}=${tex_fraction(s1+s5,s1+s3)}=${tex_fraction(s4+s5,s2+s3)}.$`+'<br>'
				}
				else {
					texte_corr = 'Les droites ' + `$(${s4+s5})$` + ' et ' + `$(${s2+s3})$` + ' sont parallèles.'
					texte_corr += `<br>Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés dans cet ordre.`
					texte_corr +='<br>D&rsquo;après la propriété de Thales, on a ' + `$${tex_fraction(s1+s4,s1+s2)}=${tex_fraction(s1+s5,s1+s3)}=${tex_fraction(s4+s5,s2+s3)}.$` + '<br>'
				}
				}
			else if (this.sup==2)
			 {  // Calcul de AN nécessaire avant de calculer AM et BC
				texte = `Dans la figure ci-dessous, les droites $(${s4+s5})$ et $(${s2+s3})$ sont parallèles.<br> $${s1+s2}=${s12}$ cm, $${s1+s3}=${s13}$ cm, $${s4+s5}=${s45}$ cm et $${s5+s3}=${s35}$ cm.`
				texte += `<br>Le point $${s1}$ peut être déplacé.<br>`
				texte += `Calculer $${s1+s4}$ et $${s2+s3}$.`
				if (k>0) {
					texte_corr = 'Dans le triangle ' + `$${s1+s2+s3}$` + ', les droites ' + `$(${s4+s5})$` + ' et ' + `$(${s2+s3})$` + ' sont parallèles.<br>' + ' D&rsquo;après la propriété de Thales, on a ' + `$${tex_fraction(s1+s4,s1+s2)}=${tex_fraction(s1+s5,s1+s3)}=${tex_fraction(s4+s5,s2+s3)}.$` + '<br>'
				} else {
					texte_corr = `Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés dans cet ordre et les droites $(${s4+s5})$ et $(${s2+s3})$ sont parallèles.<br>` + ' D&rsquo;après la propriété de Thales, on a ' + `$${tex_fraction(s1+s4,s1+s2)}=${tex_fraction(s1+s5,s1+s3)}=${tex_fraction(s4+s5,s2+s3)}.$` + '<br>'
				}
				if (k>0){
					texte_corr +='On sait que '+`$${s1+s5}=${s1+s3}-${s5+s3}=${s13}-${s35}=${s15}$`+'~cm.<br>'
				}
				else {
					texte_corr +='On sait que '+`$${s1+s5}=${s3+s5}-${s1+s3}=${s35}-${s13}=${s15}$`+'~cm.<br>'
				}
			}
			else if (randint(1,2)==1) {
				texte = `$${s1}$, $${s2}$ et $${s3}$ sont trois point distincts. $${s4} \\in [${s1+s2}]$ et $${s5} \\in [${s1+s3}]$ tel que les droites $(${s4+s5})$ et $(${s2+s3})$ sont parallèles.<br> $${s1+s2}=${s12}$ cm, $${s1+s3}=${s13}$ cm, $${s4+s5}=${s45}$ cm et $${s1+s5}=${s15}$ cm.`
				texte += `<br>Calculer $${s1+s4}$ et $${s2+s3}$.`
				texte_corr = 'Dans le triangle '+`$${s1+s2+s3}$`+', les droites '+`$(${s4+s5})$`+' et '+`$(${s2+s3})$`+' sont parallèles.<br>'+' D&rsquo;après la propriété de Thales, on a '+`$${tex_fraction(s1+s4,s1+s2)}=${tex_fraction(s1+s5,s1+s3)}=${tex_fraction(s4+s5,s2+s3)}.$`+'<br>'
				// texte_corr = 'Les droites ' + `$(${s4+s5})$` + ' et ' + `$(${s2+s3})$` + ' sont parallèles.<br> Les droites '+`$(${s2+s4})$` + ' et ' + `$(${s3+s5})$` + ' sont sécantes en '+`$${s1}`+'<br>D&rsquo;après la propriété de Thales, on a ' + `$${tex_fraction(s1+s4,s1+s2)}=${tex_fraction(s1+s5,s1+s3)}=${tex_fraction(s4+s5,s2+s3)}.$` + '<br>'
				}
			else {
				texte = `Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés dans cet ordre.`
				texte += `<br>Les droites $(${s4+s5})$ et $(${s2+s3})$ sont parallèles.<br> $${s1+s2}=${s12}$ cm, $${s1+s3}=${s13}$ cm, $${s4+s5}=${s45}$ cm et $${s5+s3}=${s35}$ cm.`
				texte += `<br>Calculer $${s1+s4}$ et $${s2+s3}$.`
				if (k>0) {
					texte_corr = 'Dans le triangle ' + `$${s1+s2+s3}$` + ', les droites ' + `$(${s4+s5})$` + ' et ' + `$(${s2+s3})$` + ' sont parallèles.<br>' + ' D&rsquo;après la propriété de Thales, on a ' + `$${tex_fraction(s1+s4,s1+s2)}=${tex_fraction(s1+s5,s1+s3)}=${tex_fraction(s4+s5,s2+s3)}.$` + '<br>'
				} else {
					texte_corr = `Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés et les droites $(${s4+s5})$ et $(${s2+s3})$ sont parallèles.<br>` + ' D&rsquo;après la propriété de Thales, on a ' + `$${tex_fraction(s1+s4,s1+s2)}=${tex_fraction(s1+s5,s1+s3)}=${tex_fraction(s4+s5,s2+s3)}.$` + '<br>'
				}
				if (k>0){
					texte_corr +='On sait que '+`$${s1+s5}=${s1+s3}-${s5+s3}=${s13}-${s35}=${s15}$`+'~cm.<br>'
				}
				else {
					texte_corr +='On sait que '+`$${s1+s5}=${s3+s5}-${s1+s3}=${s35}-${s13}=${s15}$`+'~cm.<br>'
				}
			}
			texte_corr += 'On a donc ' + `$${tex_fraction(s1 + s4, s12)}=${tex_fraction(s15, s13)}=${tex_fraction(s45, s2 + s3)}.$` + '<br>'
			texte_corr += 'Soit ' + `$${s1 + s4}=${tex_fraction(s15 + '\\times' + s12, s13)}\\approx${s14}~$` + '~cm'
			texte_corr += ' et ' + `$${s2 + s3}=${tex_fraction(s13 + '\\times' + s45, s15)}\\approx${s23}~$` + '~cm.'
		
			if (this.sup<3)	{
			this.MG32codeBase64 = codeBase64
			this.MG32code_pour_modifier_la_figure = `
				mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "x3", "${x3}");
		        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "y2", "${y2}");
				mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "y3", "${y3}");
				mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "k", "${k}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","A'","${s1}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","B'","${s2}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","C'","${s3}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","M'","${s4}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","N'","${s5}");
				mtg32App.calculate("MG32svg${numero_de_l_exercice}");
	        	mtg32App.display("MG32svg${numero_de_l_exercice}");
				` 	
				texte += `<br>$\\footnotesize{\\textit{Le point \\thickspace ${s1} peut être déplacé (si la figure est tronquée).}}$<br>`;
			}
			this.liste_questions.push(texte);	
			this.liste_corrections.push(texte_corr);
			if (this.sup<3) {
				liste_de_question_to_contenu(this)
			}
			else 	{
				this.type_exercice = '';
				liste_de_question_to_contenu_sans_numero(this)
			}	
			
		
	} else {	// sortie Latex
		texte = '\\begin{minipage}{.5 \\linewidth} 	\\vspace{0cm} Sur la figure ci-contre, on a  : \\begin{itemize}'
		texte += `\n\t\\item Les droites $(${s4+s5})$ et $(${s2+s3})$ sont parallèles.`
		if (this.sup==1){ //niveau 1 : Calcul direct quatrième proportionnelle
		
			// enoncé  niveau 1
		
			texte += '\n\t\\item '+`$${s1+s2+' = '+s12+'~\\text{cm}~;'}$`
			texte += '\n\t\\item '+`$${s1+s3+' = '+s13+'~\\text{cm}~;'}$`
			texte += '\n\t\\item '+`$${s4+s5+' = '+s45+'~\\text{cm}~;'}$`
			texte += '\n\t\\item '+`$${s1+s5+' = '+s15+'~\\text{cm}.'}$`
			texte += '\\end{itemize} \\bigskip  Calculer '+`$${s1+s4}$`+' et '+`$${s2+s3}$`+' à 0,1 près. \\end{minipage}'
		} 
		else if (this.sup==2) { // niveau 2 : Calcul intermédiaire nécessaire
		
			// enoncé  niveau 2
		
			texte += '\n\t\\item '+`$${s1+s2+' = '+s12+'~\\text{cm}~;'}$`
			texte += '\n\t\\item '+`$${s1+s3+' = '+s13+'~\\text{cm}~;'}$`
			texte += '\n\t\\item '+`$${s4+s5+' = '+s45+'~\\text{cm}~;'}$`
			texte += '\n\t\\item '+`$${s3+s5+' = '+s35+'~\\text{cm}.'}$`
			texte += '\\end{itemize} \\bigskip  Calculer '+`$${s1+s4}$`+' et '+`$${s2+s3}$`+' à 0,1 près. \\end{minipage}'
		}
		else  // énoncé sans figure
			
			if (k>0) {
				texte = `$${s1}$, $${s2}$ et $${s3}$`+' sont trois point distincts.<br>\n' + `$${s4} \\in [${s1+s2}]$`+' et '+`$${s5} \\in [${s1+s3}]$`+' tel que les droites '+`$(${s4+s5})$`+' et '+`$(${s2+s3})$`+' sont parallèles.<br>\n'
				texte += `$${s1+s2}=${s12}$ cm, $${s1+s3}=${s13}$ cm, $${s4+s5}=${s45}$ cm et `
				if (niv_diff==1) {
					texte +=`$${s1+s5}=${s15}$ cm.`
				}
				else {
					texte +=`$${s3+s5}=${s35}$ cm.`
				}
				texte += `<br>\nCalculer $${s1+s4}$ et $${s2+s3}$.`
				texte_corr = 'Dans le triangle '+`$${s1+s2+s3}$`+', les droites '+`$(${s4+s5})$`+' et '+`$(${s2+s3})$`+' sont parallèles.<br>\n'+' D\'après la propriété de Thales, on a '+`$${tex_fraction(s1+s4,s1+s2)}=${tex_fraction(s1+s5,s1+s3)}=${tex_fraction(s4+s5,s2+s3)}.$`
				if (niv_diff==2) {
					texte_corr +='On sait que '+`$${s1+s5}=${s1+s3}-${s5+s3}=${s13}-${s35}=${s15}$`+'~;cm.'
				}
			}
			else {
				texte = `Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés dans cet ordre.`
				texte += `<br>\nLes droites $(${s4+s5})$ et $(${s2+s3})$ sont parallèles.<br>\n $${s1+s2}=${s12}$ cm, $${s1+s3}=${s13}$ cm, $${s4+s5}=${s45}$ cm et `
				if (niv_diff==1) {
					texte +=`$${s1+s5}=${s15}$ cm.`
				}
				else {
					texte +=`$${s3+s5}=${s35}$ cm.`
				}
				texte += `<br>\nCalculer $${s1+s4}$ et $${s2+s3}$.`
				texte_corr = `Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés dans cet ordre et les droites $(${s4+s5})$ et $(${s2+s3})$ sont parallèles.<br>\n` + ' D\'après la propriété de Thales, on a ' + `$${tex_fraction(s1+s4,s1+s2)}=${tex_fraction(s1+s5,s1+s3)}=${tex_fraction(s4+s5,s2+s3)}.$` + '<br>\n'
				if (niv_diff==2) {
					texte_corr +='On sait que '+`$${s1+s5}=${s1+s3}-${s5+s3}=${s13}-${s35}=${s15}$`+'~cm.'
				}
			}
		if (this.sup<3) { // on ne fait la figure que si niveau < 3
			texte += '\\begin{minipage}{0.5 \\linewidth}'
			// dessin de la figure
			texte += '\n \\begin{tikzpicture}' // Balise début de figure
			texte += '\n\t \\tkzDefPoints{0/0/'+s1+','+x3+'/'+y3+'/'+s3+','+x2+'/'+y2+'/'+s2+'}' // Placer les points du triangle principal
			texte += '\n\t \\tkzDrawPolygon(' + s1 + ',' + s2 + ',' + s3 + ')' // Trace le triangle principal
			// Définit les points M et N par homothétie de centre C et de rapport 0,3<k<0,8
			texte += '\n\t \\tkzDefPointBy[homothety=center ' + s1 + ' ratio ' + k + '](' + s2 + ')' + '\t\\tkzGetPoint{' + s4 + '}' // Place le premier point du triangle image
			texte += '\n\t \\tkzDefPointBy[homothety=center ' + s1 + ' ratio ' + k + '](' + s3 + ')' + '\t\\tkzGetPoint{' + s5 + '}' // Place le deuxième point du triangle image
			texte += '\n\t \\tkzDrawSegment(' + s4 + ',' + s5 + ')'	// Trace le segment
			if (k > 0) {
				texte += '\n\t \\tkzLabelPoints[left](' + s1 + ')' //nomme les points
				texte += '\n\t \\tkzLabelPoints[above left](' + s2 + ',' + s4 + ')' //nomme les points
				texte += '\n\t \\tkzLabelPoints[below](' + s3 + ',' + s5 + ')' //nomme les points
				// Nomme les points au dessus avec above, dessous avec below...
			}
			else {		// position papillon -> position du nom inversée et nécessité de tracer le triangle secondaire
				texte += '\n\t \\tkzLabelPoints[below](' + s1 + ')' //nomme les points
				texte += '\n\t \\tkzLabelPoints[below](' + s3 + ',' + s4 + ')' //nomme les points
				texte +='\n\t \\tkzLabelPoints[above](' + s2 + ',' + s5 + ')' //nomme les points
				texte += '\n\t \\tkzDrawPolygon(' + s1 + ',' + s4 + ',' + s5 + ')' // Trace le triangle secondaire
			}
			texte += '\n \\end{tikzpicture}' // Balise de fin de figure
			texte +=  '\\end{minipage}'
		}
			this.liste_questions.push(texte) // on envoie la question
				// correction 
			if (this.sup==2){		 //niveau 2 : Calcul intermédiaire nécessaire
				texte_corr = `Les droites $(${s4+s5})$ et $(${s2+s3})$ sont parallèles.<br>\n\t D\'après la propriété de Thales, on a $${tex_fraction(s1+s4,s1+s2)}=${tex_fraction(s1+s5,s1+s3)}=${tex_fraction(s4+s5,s2+s3)}.$<br>\n\t`
				if (k>0){
					texte_corr +='On sait que '+`$${s1+s5}=${s1+s3}-${s5+s3}=${s13}-${s35}=${s15}~\\text{cm}.$`
				}
				else {
					texte_corr +='On sait que '+`$${s1+s5}=${s3+s5}-${s1+s3}=${s35}-${s13}=${s15}~\\text{cm}.$`
				}
			}
			else 
			if (this.sup==1){
				if (k>0) {texte_corr = `Dans le triangle $${s1+s2+s3}$, les droites $(${s4+s5})$ et $(${s2+s3})$ sont parallèles.<br>\n D\'après la propriété de Thales, on a $${tex_fraction(s1+s4,s1+s2)}=${tex_fraction(s1+s5,s1+s3)}=${tex_fraction(s4+s5,s2+s3)}.$`
				}
				else {texte_corr = `Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés et les droites $(${s4+s5})$ et $(${s2+s3})$ sont parallèles.<br>\n` + ' D\'après la propriété de Thales, on a ' + `$${tex_fraction(s1+s4,s1+s2)}=${tex_fraction(s1+s5,s1+s3)}=${tex_fraction(s4+s5,s2+s3)}.$` + '<br>\n'
				}
			}
			texte_corr += `<br>\n On a donc $${tex_fraction(s1 + s4, s12)}=${tex_fraction(s15, s13)}=${tex_fraction(s45, s2 + s3)}$`
			texte_corr += `<br>\n Soit $${s1 + s4}=${tex_fraction(s15 + '\\times' + s12, s13)}\\approx${s14}~\\text{cm}$.`
			texte_corr += `<br>\n Et $${s2 + s3}=${tex_fraction(s13 + '\\times' + s45, s15)}\\approx${s23}~\\text{cm}$.`
			
			this.liste_corrections.push(texte_corr)

			liste_de_question_to_contenu_sans_numero(this);

		}

	}
	
	this.besoin_formulaire_numerique = ['Niveau de difficulté',3,'1 : Calcul direct de deux longueurs \n 2 : Avec calcul intermédiaire\n 3 : Sans figure'];
}
/**
* @auteur Jean-Claude Lhote
*/
function Exercice_Pythagore() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Déterminer une longueur avec l'égalité de Pythagore";
	this.consigne = "";
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1; // 1 calcul de l'hypoténuse 2 calcul d'un côté de l'angle droit 
	sortie_html ? this.spacing_corr = 2.5 : this.spacing_corr = 1.5

	this.nouvelle_version = function (numero_de_l_exercice) {


			this.type_exercice = 'MG32';
			this.taille_div_MG32 = [700, 500];
			this.liste_questions = [];
			this.liste_corrections = []; // Liste de questions corrigées
			let lettre0 = randint(11, 25)  // aleatoirisation du nom des points
			let s0 = lettre_depuis_chiffre(lettre0)
			lettre1 = randint(11, 25, [lettre0])
			let s1 = lettre_depuis_chiffre(lettre1)
			lettre2 = randint(11, 25, [lettre0, lettre1])
			let s2 = lettre_depuis_chiffre(lettre2)
			let type_de_questions
			if (this.sup == 1) {
				type_de_questions = 1 //calcul de l'hypoténuse
			}
			if (this.sup == 2) {
				type_de_questions = 2 //calcul d'un côté de l'angle droit
			}
			if (this.sup == 3) {
				type_de_questions = randint(1, 2) //un des deux calculs
			}
			if (this.sup == 4) {
				type_de_questions = randint(3, 4)
			}
			let nom_du_triangle = choice([s0 + s1 + s2, s0 + s2 + s1, s1 + s0 + s2, s1 + s2 + s0, s2 + s0 + s1, s2 + s1 + s0])
			let k1 = Math.round((Math.random() * 3 + 3) * 10) / 10
			let k2 = Math.round((Math.random() * 3 + 1) * 10) / 10
			let alpha1 = Math.random() * Math.PI - Math.PI / 2
			let alpha1deg = Math.round(alpha1 * 180 / Math.PI)
			let x1 = k1	// coordonnées des deux sommets du triangle
			let y2 = k2
			let s01 = arrondi_virgule(k1, 1)			// mise en texte avec 1 chiffres après la virgule pour énoncé
			let s02 = arrondi_virgule(k2, 1)

			let carre01 = Math.round(k1 * k1 * 100) / 100
			let carre02 = Math.round(k2 * k2 * 100) / 100
			let dist12 = Math.sqrt(carre01 + carre02)	   //calcul de l'hypoténuse
			dist12 = Math.round(dist12 * 10) / 10		// On ne garde qu'une approximation au dixième pour l'exercice
			let s12 = arrondi_virgule(dist12, 1)
			let carre12 = Math.round(dist12 * dist12 * 100) / 100


			let scarre01 = arrondi_virgule(carre01, 2)		// carremn = distance entre (xm;ym) et (xn;yn) au carré avec 2 décimales
			let scarre02 = arrondi_virgule(carre02, 2)		// scarremn = chaine de caractère avec 2 décimales après une virgule.
			let scarre12 = arrondi_virgule(carre12, 2)
			if (sortie_html) {
			let codeBase64
			if (alpha1deg < 0) {
				codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAQzAAACtAAAAQEAAAAAAAAAAQAAACH#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAFBAMA7AAAAAAAAwCAAAAAAAAAFAAFAcLFHrhR64UBneFHrhR64#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABYAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBHq0OVgQYlAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAWAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAFgAAAQUAAQAAAAcAAAAJAP####8BAAAAAA4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MQABNgAAAAFAGAAAAAAAAAAAABEA#####wACeDIAATQAAAABQBAAAAAAAAAAAAARAP####8ACGFscGhhZGVnAAMtOTD#####AAAAAQAMQ01vaW5zVW5haXJlAAAAAUBWgAAAAAAA#####wAAAAEAEENQb2ludERhbnNSZXBlcmUA#####wEAAAAAFgABWgDAFAAAAAAAAEAAAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAEwD#####AQAAAAAWAAFGAAAAAAAAAAAAQAgAAAAAAAAHAAAAAAoAAAAOAAAADwAAAAEAAAAAAAAAAAAAABMA#####wEAAAAAFgABRAAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAADgAAABD#####AAAAAQAJQ1JvdGF0aW9uAP####8AAAASAAAADgAAABEAAAAPAP####8AAAAAABYAAUIAQCoAAAAAAADALgAAAAAAAAcAAAAAEwAAABUAAAAPAP####8AAAAAABYAAUMAQBAAAAAAAADAOwAAAAAAAAcAAAAAFAAAABX#####AAAAAQAJQ1BvbHlnb25lAP####8AAAAAAAIAAAAEAAAAEgAAABYAAAAXAAAAEv####8AAAACABdDTWFycXVlQW5nbGVHZW9tZXRyaXF1ZQD#####AAAA#wAEAAAAAUAwAAAAAAAAAAAAFgAAABIAAAAX#####wAAAAEACENTZWdtZW50AP####8BAAD#ABAAAAEABAAAABcAAAAW#####wAAAAEAEENNYWNyb0FwcGFyaXRpb24A#####wD#AAAB#####xBAh8ij1wo9cUBHYUeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAFQXBwQkMAAAAAAAEAAAAaAP####8AAAABABFDTWFjcm9EaXNwYXJpdGlvbgD#####AP8AAAH#####EECKaKPXCj1xQEphR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAZNYXNxQkMAAAAAAAEAAAAa#####wAAAAEAC0NNYWNyb1BhdXNlAP####8A#wAAAf####8QQI1oo9cKPXFASuFHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAABVBhdXNlAAAAAAABAAAAGQD#####AAAA#wH#####EECIIKPXCj1xQFqwo9cKPXACAAAAAAAAAAAAAAAAAQAAAAAAAAAAAApNYXNxQW5nZHJ0AAAAAAABAAAAGQAAABgA#####wAAAP8B#####xBAjAij1wo9cUBa8KPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAJQXBwQW5nRHJ0AAAAAAABAAAAGQD#####AAAAAQARQ01hY3JvU3VpdGVNYWNyb3MA#####wAAAP8B#####xBAWMUeuFHrhUB4fCj1wo9cAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAALaHlwb3TDqW51c2UAAAAAAAsAAAAeAAAAGwAAAB0AAAAfAAAAHAAAAB0AAAAeAAAAGwAAAB0AAAAcAAAAHwAAAA7##########w=="
			}
			else {
				codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAQzAAACtAAAAQEAAAAAAAAAAQAAACH#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAFBAMAUAAAAAAAAQBQAAAAAAAAFAAFAbFo9cKPXBkB0BhR64Ueu#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABYAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBHq0OVgQYlAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAWAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAFgAAAQUAAQAAAAcAAAAJAP####8BAAAAAA4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MQABNgAAAAFAGAAAAAAAAAAAABEA#####wACeDIAATQAAAABQBAAAAAAAAAAAAARAP####8ACGFscGhhZGVnAAI5MAAAAAFAVoAAAAAAAP####8AAAABABBDUG9pbnREYW5zUmVwZXJlAP####8BAAAAABYAAVoAwBQAAAAAAABAAAAAAAAAAAcAAAAACgAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAABIA#####wEAAAAAFgABRgAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAADgAAAA8AAAABAAAAAAAAAAAAAAASAP####8BAAAAABYAAUQAAAAAAAAAAABACAAAAAAAAAcAAAAACgAAAAEAAAAAAAAAAAAAAA4AAAAQ#####wAAAAEACUNSb3RhdGlvbgD#####AAAAEgAAAA4AAAARAAAADwD#####AAAAAAAWAAFCAEAqAAAAAAAAwDgAAAAAAAAHAAAAABMAAAAVAAAADwD#####AAAAAAAWAAFDAMA3AAAAAAAAwEAAAAAAAAAHAAAAABQAAAAV#####wAAAAEACUNQb2x5Z29uZQD#####AAAAAAACAAAABAAAABIAAAAWAAAAFwAAABL#####AAAAAgAXQ01hcnF1ZUFuZ2xlR2VvbWV0cmlxdWUA#####wAAAP8ABAAAAAFAMAAAAAAAAAAAABYAAAASAAAAF#####8AAAABAAhDU2VnbWVudAD#####AQAA#wAQAAABAAQAAAAXAAAAFv####8AAAABABBDTWFjcm9BcHBhcml0aW9uAP####8A#wAAAf####8QQIfIo9cKPXFAR2FHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAABUFwcEJDAAAAAAABAAAAGgD#####AAAAAQARQ01hY3JvRGlzcGFyaXRpb24A#####wAAAP8B#####xBAimij1wo9cUBKYUeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAGTWFzcUJDAAAAAAABAAAAGv####8AAAABAAtDTWFjcm9QYXVzZQD#####AP8AAAH#####EECNaKPXCj1xQErhR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAVQYXVzZQAAAAAAAQAAABgA#####wAAAP8B#####xBAh#Cj1wo9cUBbcKPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAKTWFzcUFuZ0RydAAAAAAAAQAAABkAAAAXAP####8AAAD#Af####8QQIw4o9cKPXFAXPCj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAACUFwcEFuZ0RydAAAAAAAAQAAABkA#####wAAAAEAEUNNYWNyb1N1aXRlTWFjcm9zAP####8AAAD#Af####8QQFjFHrhR64VAeHwo9cKPXAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAC2h5cG90w6ludXNlAAAAAAALAAAAHgAAABsAAAAdAAAAHwAAABwAAAAdAAAAHgAAABsAAAAdAAAAHwAAABwAAAAO##########8="
			}
			
			if (type_de_questions == 1) { // calcul direct de l'hypoténuse
				texte = `Dans la figure ci-dessous, le triangle $${nom_du_triangle}$ est rectangle en $${s0}$, $${s0 + s1}=${s01}$ cm, $${s0 + s2}=${s02}$ cm.`
				texte += `<br>Le point $${s0}$ peut être déplacé.<br>`
				texte += `Calculer $${s1 + s2}$.`
				texte_corr = `Dans le triangle $${nom_du_triangle}$ rectangle en $${s0}$, d&rsquo;après le théorème de Pythagore, on a : $${s1 + s2}^2 = ${s0 + s1}^2~+~${s0 + s2}^2.$<br>`
				texte_corr += 'D&rsquo;où ' + `$${s1 + s2}^2~=~${s01}^2~+~${s02}^2~=~${scarre01}~+~${scarre02}~=~${arrondi_virgule(carre02 + carre01, 2)}.$` + '<br>'
				texte_corr += 'Soit ' + `$${s1 + s2}~=~\\sqrt{${arrondi_virgule(carre02 + carre01, 2)}}~\\approx${s12}$` + '~cm.'
			}
			if (type_de_questions == 2) { // Calcul d'un côté de l'angle droit
				texte = `Dans la figure ci-dessous, le triangle $${nom_du_triangle}$ est rectangle en $${s0}$, $${s0 + s1}=${s01}$ cm, $${s1 + s2}=${s12}$ cm.`
				texte += `Calculer $${s0 + s2}$.`
				texte_corr = `Dans le triangle $${nom_du_triangle}$ rectangle en $${s0}$, d&rsquo;après le théorème de Pythagore, on a : $${s1 + s2}^2 = ${s0 + s1}^2~+~${s0 + s2}^2.$<br>`
				texte_corr += 'D&rsquo;où ' + `$${s0 + s2}^2~=~${s1 + s2}^2~-~${s0 + s1}^2 = ${s12}^2~-~${s01}^2~=~${scarre12}~-~${scarre01}~=~${arrondi_virgule(carre12 - carre01, 2)}.$` + '<br>'
				texte_corr += 'Soit ' + `$${s0 + s2}~=~\\sqrt{${arrondi_virgule(carre12 - carre01, 2)}}~\\approx${s02}$` + '~cm.'
			}
			if (type_de_questions < 3) {
				this.type_exercice = 'MG32';
				this.MG32codeBase64 = codeBase64
				this.MG32code_pour_modifier_la_figure = `
				mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "x2", "${y2}");
		        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "x1", "${x1}");
				mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "alphadeg", "${alpha1deg}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","A","${s0}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","B","${s1}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","C","${s2}");
				mtg32App.calculate("MG32svg${numero_de_l_exercice}");
	        	mtg32App.display("MG32svg${numero_de_l_exercice}");
				`
				texte += `<br>$\\footnotesize{\\textit{Le point \\thickspace ${s0} peut être déplacé (si la figure est tronquée).}}$<br>`;
			} else {
				this.type_exercice = '';
			}
			this.liste_questions.push(texte);
			this.liste_corrections.push(texte_corr);
			if (type_de_questions < 3) {
				liste_de_question_to_contenu(this)
			}
			else {
				liste_de_question_to_contenu_sans_numero(this)
			}

		}
		else {
		
			if (type_de_questions < 3) {
				texte = '\\begin{minipage}{.5 \\linewidth} 	\\vspace{0cm} Sur la figure ci-contre, on a  : \\begin{itemize}'
				texte += '\n\t\\item Le côté ' + `$[${s0 + s1}]$` + ' est perpendiculaire au côté ' + `$[${s0 + s2}]~;$`
				if (type_de_questions == 1) { //niveau 1 : Calcul de l'hypoténuse

					// enoncé  niveau 1

					texte += '\n\t\\item ' + `$${s0 + s1 + ' = ' + s01 + '~\\text{cm}~;'}$`
					texte += '\n\t\\item ' + `$${s0 + s2 + ' = ' + s02 + '~\\text{cm}~;'}$`
					texte += '\\end{itemize} \\bigskip\n\t  Calculer ' + `$${s1 + s2}$` + ' à 0,1 près. \\end{minipage}'
				}
				else { // niveau 2 : Calcul d'un côté de l'angle droit
					// enoncé  niveau 2

					texte += '\n\t\\item ' + `$${s1 + s2 + ' = ' + s12 + '~\\text{cm}~;'}$`
					texte += '\n\t\\item ' + `$${s0 + s1 + ' = ' + s01 + '~\\text{cm}~;'}$`
					texte += '\\end{itemize} \\bigskip  Calculer ' + `$${s0 + s2}$` + ' à 0,1 près. \\end{minipage}'
				}
				texte += '\\begin{minipage}{0.5 \\linewidth}'
				// dessin de la figure
				texte += '\n \\begin{tikzpicture}' // Balise début de figure
				texte += '\n\t \\tkzDefPoints{0/0/' + s0 + ',' + x1 + '/0/B,0/' + y2 + '/C}' // créer les points du triangle initial 
				// Définit les points M et N par homothétie de centre C et de rapport 0,3<k<0,8
				texte += '\n\t \\tkzDefPointBy[rotation= center ' + s0 + ' angle ' + alpha1deg + '](B) \\tkzGetPoint{' + s1 + '}' // transformer le premier point par rotation
				texte += '\n\t \\tkzDefPointBy[rotation= center ' + s0 + ' angle ' + alpha1deg + '](C) \\tkzGetPoint{' + s2 + '}' // transformer le deuxième point par rotation
				texte += '\n\t \\tkzDrawPolygon(' + s0 + ',' + s1 + ',' + s2 + ')' // Trace le triangle
				// marquer l'angle droit
				texte += '\n\t \\tkzDefPointBy[homothety=center ' + s0 + ' ratio 0.1](' + s1 + ')' + '\\tkzGetPoint{B}'
				texte += '\n\t \\tkzDefPointBy[rotation= center ' + s0 + ' angle 90](B) \\tkzGetPoint{C}'
				texte += '\n\t \\tkzDefPointBy[homothety=center ' + s0 + ' ratio 0.1414](' + s1 + ')' + '\\tkzGetPoint{A}'
				texte += '\n\t \\tkzDefPointBy[rotation= center ' + s0 + ' angle 45](A) \\tkzGetPoint{A}'
				texte += '\n\t \\tkzDrawPolygon(' + s0 + ',B,A,C)' // Trace la marque d'angle droit

				if (alpha1deg > 0) { // rotation "angle droit dessous"
				texte += '\n\t \\tkzLabelPoints[below](' + s0 + ')' //nomme les points
				texte += '\n\t \\tkzLabelPoints[right](' + s1 + ')'
				texte += '\n\t \\tkzLabelPoints[left](' + s2 + ')'
			}
			else {		// rotation "angle droit dessus" position du nom inversée 
				texte += '\n\t \\tkzLabelPoints[above](' + s0 + ')' //nomme les points
				texte += '\n\t \\tkzLabelPoints[left](' + s1 + ')'
				texte += '\n\t \\tkzLabelPoints[right](' + s2 + ')'
			}
				texte += '\n \\end{tikzpicture}' // Balise de fin de figure
				texte += '\\end{minipage}'
			}
			else {
				texte = '\\begin{minipage}{.5 \\linewidth} 	\\vspace{0cm} Dans le triangle ' + `${nom_du_triangle}` + ' rectangle en ' + `${s0}` + ' : \\begin{itemize}'
				// texte += '\n\t\\item Le côté ' + `$[${s0 + s1}]$` + ' est perpendiculaire au côté ' + `$[${s0 + s2}]~;$`
				if (type_de_questions == 1) { //niveau 1 : Calcul de l'hypoténuse

					// enoncé  niveau 1

					texte += '\n\t\\item ' + `$${s0 + s1 + ' = ' + s01 + '~\\text{cm}~;'}$`
					texte += '\n\t\\item ' + `$${s0 + s2 + ' = ' + s02 + '~\\text{cm}~;'}$`
					texte += '\\end{itemize} \\bigskip\n\t  Calculer ' + `$${s1 + s2}$` + ' à 0,1 près. \\end{minipage}'
				}
				else { // niveau 2 : Calcul d'un côté de l'angle droit
					// enoncé  niveau 2

					texte += '\n\t\\item ' + `$${s1 + s2 + ' = ' + s12 + '~\\text{cm}~;'}$`
					texte += '\n\t\\item ' + `$${s0 + s1 + ' = ' + s01 + '~\\text{cm}~;'}$`
					texte += '\\end{itemize} \\bigskip  Calculer ' + `$${s0 + s2}$` + ' à 0,1 près. \\end{minipage}'
				}
			}
			this.liste_questions.push(texte) // on envoie la question
			// correction 
			if (type_de_questions == 2 || type_de_questions == 4) {		 //niveau 2 : Calcul d'un côté de l'angle droit
				texte_corr = 'Le triangle ' + `$${nom_du_triangle}$` + ' est rectangle en ' + `$${s0}.$` + '<br>\n D\'après le théorème de Pythagore, on a :~' + `$${s1 + s2}^2 = ${s0 + s1}^2~+~${s0 + s2}^2.$`
				texte_corr += '<br>\n D\'où ' + `$${s0 + s2}^2~=~${s1 + s2}^2~-~${s0 + s1}^2 = ${s12}^2~-~${s01}^2~=~${scarre12}~-~${scarre01}~=~${arrondi_virgule(carre12 - carre01, 2)}.$`
				texte_corr += '<br>\n Soit ' + `$${s0 + s2}~=~\\sqrt{${arrondi_virgule(carre12 - carre01, 2)}}~\\approx${s02}~\\text{cm}.$`
			}
			else {
				texte_corr = 'Le triangle ' + `$${nom_du_triangle}$` + ' est rectangle en ' + `$${s0}.$` + '<br>\n D\'après le théorème de Pythagore, on a ' + `$${s1 + s2}^2 = ${s0 + s1}^2~+~${s0 + s2}^2.$`
				texte_corr += '<br>\n D\'où ' + `$${s1 + s2}^2~=~${s01}^2~+~${s02}^2~=~${scarre01}~+~${scarre02}~=~${arrondi_virgule(carre02 + carre01, 2)}.$`
				texte_corr += '<br>\n Soit ' + `$${s1 + s2}~=~\\sqrt{${arrondi_virgule(carre02 + carre01, 2)}}~\\approx${s12}~\\text{cm}.$`

			}

			this.liste_corrections.push(texte_corr)

			liste_de_question_to_contenu_sans_numero(this);

			// }end for

		}
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté', 4, '1 : Calcul de l\'hypoténuse \n 2 : Calcul d\'un côté de l\'angle droit\n 3 : Calcul d\'un côté quelconque\n 4 : Sans la figure'];
}

/**
* @auteur Jean-Claude Lhote
*/
function Exercice_Trigo_longueurs() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Déterminer une longueur grâce à la trigonométrie";
	this.consigne = "";
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1; // 1 utilisation du cosinus exclusivement 2 utilisation des 3 fonctions trigo 
	sortie_html ? this.spacing_corr = 3 : this.spacing_corr = 1.5

	this.nouvelle_version = function (numero_de_l_exercice) {


			this.type_exercice = 'MG32';
			this.taille_div_MG32 = [700, 500];
			this.liste_questions = [];
			this.liste_corrections = []; // Liste de questions corrigées
			let lettre0 = randint(11, 25)  // aleatoirisation du nom des points
			let s0 = lettre_depuis_chiffre(lettre0)
			lettre1 = randint(11, 25, [lettre0])
			let s1 = lettre_depuis_chiffre(lettre1)
			lettre2 = randint(11, 25, [lettre0, lettre1])
			let s2 = lettre_depuis_chiffre(lettre2)
			let angle1,angle2
			let type_de_questions
			if (this.sup == 1) {
				type_de_questions = randint(1,2) // utilisation du cosinus
			}
			if (this.sup == 2) {
				type_de_questions = randint(1,6) // utilisation des 3 fonctions
			}
			
			let nom_du_triangle = choice([s0 + s1 + s2, s0 + s2 + s1, s1 + s0 + s2, s1 + s2 + s0, s2 + s0 + s1, s2 + s1 + s0])
			let k1 = Math.round((Math.random() * 5 + 1) * 10) / 10
			let k2 = Math.round((Math.random() * 5 + 1) * 10) / 10
			angle1=Math.round(Math.degres(Math.atan(k2/k1)));
			angle2=90-angle1;
			let alpha1 = Math.random() * Math.PI - Math.PI / 2
			let alpha1deg = Math.round(alpha1 * 180 / Math.PI)
			let x1 = k1	// coordonnées des deux sommets du triangle
			let y2 = k2
			let s01 = arrondi_virgule(k1, 1)			// mise en texte avec 1 chiffres après la virgule pour énoncé
			let s02 = arrondi_virgule(k2, 1)
			
			let dist12 = k1/Math.cos(Math.atan(k2/k1))	   //calcul de l'hypoténuse
			dist12 = Math.round(dist12 * 10) / 10		// On ne garde qu'une approximation au dixième pour l'exercice
			let s12 = arrondi_virgule(dist12, 1)
			texte_corr = `Dans le triangle $${nom_du_triangle}$ rectangle en $${s0}$ :<br>`;
			if (sortie_html) { // sortie html MG32
				let codeBase64
				if (alpha1deg < 0) {
					codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACL#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAFBAMA7AAAAAAAAwCAAAAAAAAAFAAFAcLFHrhR64UBneFHrhR64#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABYAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBHq0OVgQYlAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAWAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAFgAAAQUAAQAAAAcAAAAJAP####8BAAAAAA4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MQABNgAAAAFAGAAAAAAAAAAAABEA#####wACeDIAATQAAAABQBAAAAAAAAAAAAARAP####8ACGFscGhhZGVnAAMtOTD#####AAAAAQAMQ01vaW5zVW5haXJlAAAAAUBWgAAAAAAA#####wAAAAEAEENQb2ludERhbnNSZXBlcmUA#####wEAAAAAFgABWgDAFAAAAAAAAEAAAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAEwD#####AQAAAAAWAAFGAAAAAAAAAAAAQAgAAAAAAAAHAAAAAAoAAAAOAAAADwAAAAEAAAAAAAAAAAAAABMA#####wEAAAAAFgABRAAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAADgAAABD#####AAAAAQAJQ1JvdGF0aW9uAP####8AAAASAAAADgAAABEAAAAPAP####8AAAAAABYAAUIAQCoAAAAAAADALgAAAAAAAAcAAAAAEwAAABUAAAAPAP####8AAAAAABYAAUMAQBAAAAAAAADAOwAAAAAAAAcAAAAAFAAAABX#####AAAAAQAJQ1BvbHlnb25lAP####8AAAAAAAIAAAAEAAAAEgAAABYAAAAXAAAAEv####8AAAACABdDTWFycXVlQW5nbGVHZW9tZXRyaXF1ZQD#####AAAA#wAEAAAAAUAwAAAAAAAAAAAAFgAAABIAAAAX#####wAAAAEACENTZWdtZW50AP####8BAAD#ABAAAAEABAAAABcAAAAW#####wAAAAEAEENNYWNyb0FwcGFyaXRpb24A#####wD#AAAB#####xBAh8ij1wo9cUBHYUeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAFQXBwQkMAAAAAAAEAAAAaAP####8AAAABABFDTWFjcm9EaXNwYXJpdGlvbgD#####AP8AAAH#####EECKaKPXCj1xQEphR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAZNYXNxQkMAAAAAAAEAAAAa#####wAAAAEAC0NNYWNyb1BhdXNlAP####8A#wAAAf####8QQI1oo9cKPXFASuFHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAABVBhdXNlAAAAAAABAAAAGQD#####AAAA#wH#####EECIIKPXCj1xQFqwo9cKPXACAAAAAAAAAAAAAAAAAQAAAAAAAAAAAApNYXNxQW5nZHJ0AAAAAAABAAAAGQAAABgA#####wAAAP8B#####xBAjAij1wo9cUBa8KPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAJQXBwQW5nRHJ0AAAAAAABAAAAGQD#####AAAAAQARQ01hY3JvU3VpdGVNYWNyb3MA#####wAAAP8B#####xBAWMUeuFHrhUB4fCj1wo9cAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAALaHlwb3TDqW51c2UAAAAAAAsAAAAeAAAAGwAAAB0AAAAfAAAAHAAAAB0AAAAeAAAAGwAAAB0AAAAcAAAAHwAAABYA#####wAAAP8ABQAAACBAQIGJiJxJngAAAAEAAAAWAAAAFwAAAA7##########w=="
				}
				else {
					codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI#AAAAAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACL#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAFBAMAUAAAAAAAAQBQAAAAAAAAFAAFAbFo9cKPXBkB0BhR64Ueu#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABYAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBHq0OVgQYlAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAWAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAFgAAAQUAAQAAAAcAAAAJAP####8BAAAAAA4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MQABNgAAAAFAGAAAAAAAAAAAABEA#####wACeDIAATQAAAABQBAAAAAAAAAAAAARAP####8ACGFscGhhZGVnAAI5MAAAAAFAVoAAAAAAAP####8AAAABABBDUG9pbnREYW5zUmVwZXJlAP####8BAAAAABYAAVoAwBQAAAAAAABAAAAAAAAAAAcAAAAACgAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAABIA#####wEAAAAAFgABRgAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAADgAAAA8AAAABAAAAAAAAAAAAAAASAP####8BAAAAABYAAUQAAAAAAAAAAABACAAAAAAAAAcAAAAACgAAAAEAAAAAAAAAAAAAAA4AAAAQ#####wAAAAEACUNSb3RhdGlvbgD#####AAAAEgAAAA4AAAARAAAADwD#####AAAAAAAWAAFCAEAqAAAAAAAAwDgAAAAAAAAHAAAAABMAAAAVAAAADwD#####AAAAAAAWAAFDAMA3AAAAAAAAwEAAAAAAAAAHAAAAABQAAAAV#####wAAAAEACUNQb2x5Z29uZQD#####AAAAAAACAAAABAAAABIAAAAWAAAAFwAAABL#####AAAAAgAXQ01hcnF1ZUFuZ2xlR2VvbWV0cmlxdWUA#####wAAAP8ABAAAAAFAMAAAAAAAAAAAABYAAAASAAAAF#####8AAAABAAhDU2VnbWVudAD#####AQAA#wAQAAABAAQAAAAXAAAAFv####8AAAABABBDTWFjcm9BcHBhcml0aW9uAP####8A#wAAAf####8QQIfIo9cKPXFAR2FHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAABUFwcEJDAAAAAAABAAAAGgD#####AAAAAQARQ01hY3JvRGlzcGFyaXRpb24A#####wAAAP8B#####xBAimij1wo9cUBKYUeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAGTWFzcUJDAAAAAAABAAAAGv####8AAAABAAtDTWFjcm9QYXVzZQD#####AP8AAAH#####EECNaKPXCj1xQErhR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAVQYXVzZQAAAAAAAQAAABgA#####wAAAP8B#####xBAh#Cj1wo9cUBbcKPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAKTWFzcUFuZ0RydAAAAAAAAQAAABkAAAAXAP####8AAAD#Af####8QQIw4o9cKPXFAXPCj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAACUFwcEFuZ0RydAAAAAAAAQAAABkA#####wAAAAEAEUNNYWNyb1N1aXRlTWFjcm9zAP####8AAAD#Af####8QQFjFHrhR64VAeHwo9cKPXAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAC2h5cG90w6ludXNlAAAAAAALAAAAHgAAABsAAAAdAAAAHwAAABwAAAAdAAAAHgAAABsAAAAdAAAAHwAAABwAAAAVAP####8AAAD#AAUAAAAgQEHcp2T0QTQAAAABAAAAFgAAABcAAAAO##########8="
				}
				texte = `Dans la figure ci-dessous, le triangle $${nom_du_triangle}$ est rectangle en $${s0}$.<br>`
				

				if (type_de_questions == 1) { // calcul du côté adjacent (cosinus)
					texte += `L'angle $\\widehat{${s0 + s1 + s2}}$~mesure~$${angle1}°$, $${s1 + s2}=${s12}$ cm.<br>`;
					texte += `Calculer $${s0 + s1}$.`;


				}
				if (type_de_questions == 2) { // Calcul de l'hypoténuse (1/cosinus)
					texte += `L'angle $\\widehat{${s0 + s1 + s2}}$~mesure~$${angle1}°$, $${s0 + s1}=${s01}$ cm.<br>`;
					texte += `Calculer $${s1 + s2}$.`;

				}
				if (type_de_questions == 3) { // calcul du côté opposé (sinus)
					texte += `L'angle $\\widehat{${s0 + s1 + s2}}$~mesure~$${angle1}°$, $${s1 + s2}=${s12}$ cm.<br>`;
					texte += `Calculer $${s0 + s2}$.`;

				}
				if (type_de_questions == 4) { // Calcul de l'hypoténuse (1/sinus) 
					texte += `L'angle $\\widehat{${s0 + s1 + s2}}$~mesure~$${angle1}°$, $${s0 + s2}=${s02}$ cm.<br>`;
					texte += `Calculer $${s1 + s2}$.`;

				}
				if (type_de_questions == 5) { // calcul du côté opposé (tangente)
					texte += `L'angle $\\widehat{${s0 + s1 + s2}}$~mesure~$${angle1}°$, $${s0 + s1}=${s01}$ cm.<br>`;
					texte += `Calculer $${s0 + s2}$.`;

				}
				if (type_de_questions == 6) { // Calcul du côté adjacent (1/tangente) 
					texte += `L'angle $\\widehat{${s0 + s1 + s2}}$~mesure~$${angle1}°$, $${s0 + s2}=${s02}$ cm.<br>`;
					texte += `Calculer $${s0 + s1}$.`;

				}

				this.type_exercice = 'MG32';
				this.MG32codeBase64 = codeBase64
				this.MG32code_pour_modifier_la_figure = `
				mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "x2", "${y2}");
		        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "x1", "${x1}");
				mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "alphadeg", "${alpha1deg}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","A","${s0}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","B","${s1}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","C","${s2}");
				mtg32App.calculate("MG32svg${numero_de_l_exercice}");
	        	mtg32App.display("MG32svg${numero_de_l_exercice}");
				`
				texte += `<br>$\\footnotesize{\\textit{Le point \\thickspace ${s0} peut être déplacé (si la figure est tronquée).}}$<br>`;
			}
			else { //sortie Latex
				texte = `\\begin{minipage}{.5 \\linewidth} 	\\vspace{0cm} Sur la figure ci-contre, on a  : \\begin{itemize}`
				texte += `\n\t\\item Le triangle $${nom_du_triangle}]$ est rectangle en $${s0}$~;`

				if (type_de_questions == 1) { // Calcul du coté adjacent (cosinus)
					texte += `\n\t\\item $${s1 + s2}=${s12}~\\text{cm}$`;
					texte += `\n\t\\item L'angle $\\widehat{${s0 + s1 + s2}}$~mesure~$${angle1}°$.<br>`;
					texte += `\\end{itemize} \\bigskip\n\t  Calculer $${s0 + s1}$ à 0,1 près. \\end{minipage}`
				}
				if (type_de_questions == 2) { // Calcul de l'hypoténuse (1/cosinus)
					texte += `\n\t\\item $${s0 + s1}=${s01}~\\text{cm}$`;
					texte += `\n\t\\item L'angle $\\widehat{${s0 + s1 + s2}}$~mesure~$${angle1}°$.<br>`;
					texte += `\\end{itemize} \\bigskip\n\t  Calculer $${s1 + s2}$ à 0,1 près. \\end{minipage}`
				}
				if (type_de_questions == 3) { // Calcul du coté opposé (sinus)
					texte += `\n\t\\item $${s1 + s2}=${s12}~\\text{cm}$`;
					texte += `\n\t\\item L'angle $\\widehat{${s0 + s1 + s2}}$~mesure~$${angle1}°$.<br>`;
					texte += `\\end{itemize} \\bigskip\n\t  Calculer $${s0 + s2}$ à 0,1 près. \\end{minipage}`
				}
				if (type_de_questions == 4) { // Calcul de l'hypoténuse (1/sinus)
					texte += `\n\t\\item $${s0 + s2}=${s02}~\\text{cm}$`;
					texte += `\n\t\\item L'angle $\\widehat{${s0 + s1 + s2}}$~mesure~$${angle1}°$.<br>`;
					texte += `\\end{itemize} \\bigskip\n\t  Calculer $${s1 + s2}$ à 0,1 près. \\end{minipage}`
				}
				if (type_de_questions == 5) { // Calcul du côté opposé (tangente)
					texte += `\n\t\\item $${s0 + s1}=${s01}~\\text{cm}$`;
					texte += `\n\t\\item L'angle $\\widehat{${s0 + s1 + s2}}$~mesure~$${angle1}°$.<br>`;
					texte += `\\end{itemize} \\bigskip\n\t  Calculer $${s0 + s2}$ à 0,1 près. \\end{minipage}`
				}
				if (type_de_questions == 6) { // Calcul du côté adjacent (1/tangente)
					texte += `\n\t\\item $${s0 + s2}=${s02}~\\text{cm}$`;
					texte += `\n\t\\item L'angle $\\widehat{${s0 + s1 + s2}}$~mesure~$${angle1}°$.<br>`;
					texte += `\\end{itemize} \\bigskip\n\t  Calculer $${s0 + s1}$ à 0,1 près. \\end{minipage}`
				}
				texte += '\\begin{minipage}{0.5 \\linewidth}'
				// dessin de la figure
				texte += '\n \\begin{tikzpicture}' // Balise début de figure
				texte += '\n\t \\tkzDefPoints{0/0/' + s0 + ',' + x1 + '/0/B,0/' + y2 + '/C}' // créer les points du triangle initial 
				// Définit les points M et N par homothétie de centre C et de rapport 0,3<k<0,8
				texte += '\n\t \\tkzDefPointBy[rotation= center ' + s0 + ' angle ' + alpha1deg + '](B) \\tkzGetPoint{' + s1 + '}' // transformer le premier point par rotation
				texte += '\n\t \\tkzDefPointBy[rotation= center ' + s0 + ' angle ' + alpha1deg + '](C) \\tkzGetPoint{' + s2 + '}' // transformer le deuxième point par rotation
				texte += '\n\t \\tkzDrawPolygon(' + s0 + ',' + s1 + ',' + s2 + ')' // Trace le triangle
				// marquer l'angle droit
				texte += '\n\t \\tkzDefPointBy[homothety=center ' + s0 + ' ratio 0.1](' + s1 + ')' + '\\tkzGetPoint{B}'
				texte += '\n\t \\tkzDefPointBy[rotation= center ' + s0 + ' angle 90](B) \\tkzGetPoint{C}'
				texte += '\n\t \\tkzDefPointBy[homothety=center ' + s0 + ' ratio 0.1414](' + s1 + ')' + '\\tkzGetPoint{A}'
				texte += '\n\t \\tkzDefPointBy[rotation= center ' + s0 + ' angle 45](A) \\tkzGetPoint{A}'
				texte += '\n\t \\tkzDrawPolygon(' + s0 + ',B,A,C)' // Trace la marque d'angle droit
				if (alpha1deg > 0) { // rotation "angle droit dessous"
					texte += '\n\t \\tkzLabelPoints[below](' + s0 + ')' //nomme les points
					texte += '\n\t \\tkzLabelPoints[above right](' + s1 + ')'
					texte += '\n\t \\tkzLabelPoints[left](' + s2 + ')'
				}
				else {		// rotation "angle droit dessus" position du nom inversée 
					texte += '\n\t \\tkzLabelPoints[left](' + s0 + ')' //nomme les points
					texte += '\n\t \\tkzLabelPoints[below left](' + s1 + ')'
					texte += '\n\t \\tkzLabelPoints[above right](' + s2 + ')'
				}
				texte += '\n \\end{tikzpicture}' // Balise de fin de figure
				texte += '\\end{minipage}'
			}
			if (type_de_questions == 1) {	
				texte_corr+=`Le cosinus de l'angle $\\widehat{${s0+s1+s2}}$ est défini par :<br>`;
				texte_corr +=`$\\cos \\left(\\widehat{${s0+s1+s2}}\\right)=${tex_fraction(s0 + s1,s1+s2)}$<br>`;
				texte_corr += `D'où $${s0 + s1}=${s1+s2}\\times\\cos\\left(\\widehat{${s0+s1+s2}}\\right)$<br>`;
				texte_corr +=`$\\phantom{D'ou AB}=${s12}\\times\\cos\\left(${angle1}°\\right)$<br>`;
				texte_corr +=`$\\phantom{D'ou AB}\\approx${s01}$.<br>`;
				texte_corr += `Soit $${s0 + s1}\\approx${s01}$~cm.`;
			}
			if (type_de_questions == 2) {
				texte_corr += `Le cosinus de l'angle $\\widehat{${s0+s1+s2}}$ est défini par :<br>`;
				texte_corr +=`$\\cos \\left(\\widehat{${s0+s1+s2}}\\right)=${tex_fraction(s0 + s1,s1+s2)}$<br>`;
				texte_corr += `D'où $${s1 + s2}=${s0+s1}\\div\\cos\\left(\\widehat{${s0+s1+s2}}\\right)$<br>`;
				texte_corr += `$\\phantom{D'ou AB}=${s01}\\div\\cos\\left(${angle1}°\\right)$<br>`;
				texte_corr += `$\\phantom{D'ou AB}\\approx${s12}$.<br>`;
				texte_corr += `Soit $${s1 + s2}\\approx${s12}$~cm.`;
			}	
			if (type_de_questions == 3) {
				texte_corr += `Le sinus de l'angle $\\widehat{${s0+s1+s2}}$ est défini par :<br>`;
				texte_corr += `$\\sin \\left(\\widehat{${s0+s1+s2}}\\right)=${tex_fraction(s0 + s2,s1+s2)}$<br>`;
				texte_corr += `D'où $${s0 + s2}=${s1+s2}\\times\\sin\\left(\\widehat{${s0+s1+s2}}\\right)$<br>`;
				texte_corr += `$\\phantom{D'ou AB}=${s12}\\times\\sin\\left(${angle1}°\\right)$<br>`;
				texte_corr += `$\\phantom{D'ou AB}\\approx${s02}$.<br>`;
				texte_corr += `Soit $${s0 + s2}\\approx${s02}$~cm.`;
			}
			if (type_de_questions == 4) {
				texte_corr = `Le sinus de l'angle $\\widehat{${s0+s1+s2}}$ est défini par :<br>`;
				texte_corr +=`$\\sin \\left(\\widehat{${s0+s1+s2}}\\right)=${tex_fraction(s0 + s2,s1+s2)}$<br>`;
				texte_corr += `D'où $${s1 + s2}=${s0+s2}\\div\\sin\\left(\\widehat{${s0+s1+s2}}\\right)$<br>`;
				texte_corr += `$\\phantom{D'ou AB}=${s02}\\div\\sin\\left(${angle1}°\\right)$<br>`;
				texte_corr += `$\\phantom{D'ou AB}\\approx${s12}$.<br>`;
				texte_corr += `Soit $${s1 + s2}\\approx${s12}$~cm.`;
			}
			if (type_de_questions == 5) {
				texte_corr = `La tangente de l'angle $\\widehat{${s0+s1+s2}}$ est définie par :<br>`;
				texte_corr += `$\\tan \\left(\\widehat{${s0+s1+s2}}\\right)=${tex_fraction(s0 + s2,s0+s1)}<br>$`;
				texte_corr += `D'où $${s0 + s2}=${s0+s1}\\times\\tan\\left(\\widehat{${s0+s1+s2}}\\right)$<br>`;
				texte_corr += `$\\phantom{D'ou AB}=${s01}\\times\\tan\\left(${angle1}°\\right)$<br>`;
				texte_corr += `$\\phantom{D'ou AB}\\approx${s02}$.<br>`;
				texte_corr += `Soit $${s0 + s2}\\approx${s02}$~cm.`;
			}
			if (type_de_questions == 6) {
				texte_corr = `La tangente de l'angle $\\widehat{${s0+s1+s2}}$ est définie par :<br>`;
				texte_corr +=`$\\tan \\left(\\widehat{${s0+s1+s2}}\\right)=${tex_fraction(s0 + s2,s0+s1)}$<br>`;
				texte_corr += `D'où $${s0 + s1}=${s0+s2}\\div\\tan\\left(\\widehat{${s0+s1+s2}}\\right)$<br>`;
				texte_corr += `$\\phantom{D'ou AB}=${s02}\\div\\tan\\left(${angle1}°\\right)$<br>`;
				texte_corr += `$\\phantom{D'ou AB}\\approx${s01}$.<br>`;
				texte_corr += `Soit $${s0 + s1}\\approx${s01}$~cm.`;
			}
			this.liste_questions.push(texte);
			this.liste_corrections.push(texte_corr);
			liste_de_question_to_contenu_sans_numero(this);;
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté', 2, '1 : Cosinus \n 2 : Cosinus, sinus ou tangente'];
}
/**
* @auteur Jean-Claude Lhote
* Calcul d'angle dans le triangle rectangle
* Le niveau 1 se limite à l'utilisation de Arccos
* Le niveau 2 utilise la fonction trigo la plus pertinente pour un calcul direct
*/
function Exercice_Trigo_angles() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Déterminer un angle grâce à la trigonométrie";
	this.consigne = "";
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1; // 1 calcul avec Arccos
	sortie_html ? this.spacing_corr = 3 : this.spacing_corr = 1.5

	this.nouvelle_version = function (numero_de_l_exercice) {
		this.type_exercice = 'MG32';
		this.taille_div_MG32 = [700, 500];
		this.liste_questions = [];
		this.liste_corrections = []; // Liste de questions corrigées
		let lettre0 = randint(11, 25)  // aleatoirisation du nom des points
		let s0 = lettre_depuis_chiffre(lettre0)
		lettre1 = randint(11, 25, [lettre0])
		let s1 = lettre_depuis_chiffre(lettre1)
		lettre2 = randint(11, 25, [lettre0, lettre1])
		let s2 = lettre_depuis_chiffre(lettre2)
		let angle1,angle2
		let type_de_questions
		if (this.sup == 1) {
			type_de_questions = randint(1,2) // utilisation de Arccos
		}
		if (this.sup == 2) {
			type_de_questions = randint(1,6,[2]) // utilisation des 3 fonctions Arccos, Arcsin et Arctan
		}
		
		let nom_du_triangle = choice([s0 + s1 + s2, s0 + s2 + s1, s1 + s0 + s2, s1 + s2 + s0, s2 + s0 + s1, s2 + s1 + s0])
		let k1 = Math.round((Math.random() * 5 + 1) * 10) / 10
		let k2 = Math.round((Math.random() * 5 + 1) * 10) / 10
		angle1=Math.round(Math.degres(Math.atan(k2/k1)));
		angle2=90-angle1;
		let alpha1 = Math.random() * Math.PI - Math.PI / 2
		let alpha1deg = Math.round(alpha1 * 180 / Math.PI)
		let x1 = k1	// coordonnées des deux sommets du triangle
		let y2 = k2
		let s01 = arrondi_virgule(k1, 1)			// mise en texte avec 1 chiffres après la virgule pour énoncé
		let s02 = arrondi_virgule(k2, 1)
		
		let dist12 = k1/Math.cos(Math.atan(k2/k1))	   //calcul de l'hypoténuse
		dist12 = Math.round(dist12 * 10) / 10		// On ne garde qu'une approximation au dixième pour l'exercice
		let s12 = arrondi_virgule(dist12, 1)
		texte_corr = `Dans le triangle $${nom_du_triangle}$ rectangle en $${s0}$ :<br>`;
		if (sortie_html) { // sortie html MG32
			let codeBase64
			if (type_de_questions%2!=0) {
				if (alpha1deg < 0) {
					codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACL#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAFBAMA7AAAAAAAAwCAAAAAAAAAFAAFAcLFHrhR64UBneFHrhR64#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABYAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBHq0OVgQYlAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAWAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAFgAAAQUAAQAAAAcAAAAJAP####8BAAAAAA4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MQABNgAAAAFAGAAAAAAAAAAAABEA#####wACeDIAATQAAAABQBAAAAAAAAAAAAARAP####8ACGFscGhhZGVnAAMtOTD#####AAAAAQAMQ01vaW5zVW5haXJlAAAAAUBWgAAAAAAA#####wAAAAEAEENQb2ludERhbnNSZXBlcmUA#####wEAAAAAFgABWgDAFAAAAAAAAEAAAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAEwD#####AQAAAAAWAAFGAAAAAAAAAAAAQAgAAAAAAAAHAAAAAAoAAAAOAAAADwAAAAEAAAAAAAAAAAAAABMA#####wEAAAAAFgABRAAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAADgAAABD#####AAAAAQAJQ1JvdGF0aW9uAP####8AAAASAAAADgAAABEAAAAPAP####8AAAAAABYAAUIAQCoAAAAAAADALgAAAAAAAAcAAAAAEwAAABUAAAAPAP####8AAAAAABYAAUMAQBAAAAAAAADAOwAAAAAAAAcAAAAAFAAAABX#####AAAAAQAJQ1BvbHlnb25lAP####8AAAAAAAIAAAAEAAAAEgAAABYAAAAXAAAAEv####8AAAACABdDTWFycXVlQW5nbGVHZW9tZXRyaXF1ZQD#####AAAA#wAEAAAAAUAwAAAAAAAAAAAAFgAAABIAAAAX#####wAAAAEACENTZWdtZW50AP####8BAAD#ABAAAAEABAAAABcAAAAW#####wAAAAEAEENNYWNyb0FwcGFyaXRpb24A#####wD#AAAB#####xBAh8ij1wo9cUBHYUeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAFQXBwQkMAAAAAAAEAAAAaAP####8AAAABABFDTWFjcm9EaXNwYXJpdGlvbgD#####AP8AAAH#####EECKaKPXCj1xQEphR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAZNYXNxQkMAAAAAAAEAAAAa#####wAAAAEAC0NNYWNyb1BhdXNlAP####8A#wAAAf####8QQI1oo9cKPXFASuFHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAABVBhdXNlAAAAAAABAAAAGQD#####AAAA#wH#####EECIIKPXCj1xQFqwo9cKPXACAAAAAAAAAAAAAAAAAQAAAAAAAAAAAApNYXNxQW5nZHJ0AAAAAAABAAAAGQAAABgA#####wAAAP8B#####xBAjAij1wo9cUBa8KPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAJQXBwQW5nRHJ0AAAAAAABAAAAGQD#####AAAAAQARQ01hY3JvU3VpdGVNYWNyb3MA#####wAAAP8B#####xBAWMUeuFHrhUB4fCj1wo9cAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAALaHlwb3TDqW51c2UAAAAAAAsAAAAeAAAAGwAAAB0AAAAfAAAAHAAAAB0AAAAeAAAAGwAAAB0AAAAcAAAAHwAAABYA#####wAAAP8ABQAAACBAQIGJiJxJngAAAAEAAAAWAAAAFwAAAA7##########w=="
				}
				else {
					codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI#AAAAAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACL#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAFBAMAUAAAAAAAAQBQAAAAAAAAFAAFAbFo9cKPXBkB0BhR64Ueu#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABYAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBHq0OVgQYlAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAWAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAFgAAAQUAAQAAAAcAAAAJAP####8BAAAAAA4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MQABNgAAAAFAGAAAAAAAAAAAABEA#####wACeDIAATQAAAABQBAAAAAAAAAAAAARAP####8ACGFscGhhZGVnAAI5MAAAAAFAVoAAAAAAAP####8AAAABABBDUG9pbnREYW5zUmVwZXJlAP####8BAAAAABYAAVoAwBQAAAAAAABAAAAAAAAAAAcAAAAACgAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAABIA#####wEAAAAAFgABRgAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAADgAAAA8AAAABAAAAAAAAAAAAAAASAP####8BAAAAABYAAUQAAAAAAAAAAABACAAAAAAAAAcAAAAACgAAAAEAAAAAAAAAAAAAAA4AAAAQ#####wAAAAEACUNSb3RhdGlvbgD#####AAAAEgAAAA4AAAARAAAADwD#####AAAAAAAWAAFCAEAqAAAAAAAAwDgAAAAAAAAHAAAAABMAAAAVAAAADwD#####AAAAAAAWAAFDAMA3AAAAAAAAwEAAAAAAAAAHAAAAABQAAAAV#####wAAAAEACUNQb2x5Z29uZQD#####AAAAAAACAAAABAAAABIAAAAWAAAAFwAAABL#####AAAAAgAXQ01hcnF1ZUFuZ2xlR2VvbWV0cmlxdWUA#####wAAAP8ABAAAAAFAMAAAAAAAAAAAABYAAAASAAAAF#####8AAAABAAhDU2VnbWVudAD#####AQAA#wAQAAABAAQAAAAXAAAAFv####8AAAABABBDTWFjcm9BcHBhcml0aW9uAP####8A#wAAAf####8QQIfIo9cKPXFAR2FHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAABUFwcEJDAAAAAAABAAAAGgD#####AAAAAQARQ01hY3JvRGlzcGFyaXRpb24A#####wAAAP8B#####xBAimij1wo9cUBKYUeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAGTWFzcUJDAAAAAAABAAAAGv####8AAAABAAtDTWFjcm9QYXVzZQD#####AP8AAAH#####EECNaKPXCj1xQErhR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAVQYXVzZQAAAAAAAQAAABgA#####wAAAP8B#####xBAh#Cj1wo9cUBbcKPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAKTWFzcUFuZ0RydAAAAAAAAQAAABkAAAAXAP####8AAAD#Af####8QQIw4o9cKPXFAXPCj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAACUFwcEFuZ0RydAAAAAAAAQAAABkA#####wAAAAEAEUNNYWNyb1N1aXRlTWFjcm9zAP####8AAAD#Af####8QQFjFHrhR64VAeHwo9cKPXAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAC2h5cG90w6ludXNlAAAAAAALAAAAHgAAABsAAAAdAAAAHwAAABwAAAAdAAAAHgAAABsAAAAdAAAAHwAAABwAAAAVAP####8AAAD#AAUAAAAgQEHcp2T0QTQAAAABAAAAFgAAABcAAAAO##########8="
				}
			}
			else {
				if (alpha1deg < 0) {
					codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACL#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAFBAMA7AAAAAAAAwCAAAAAAAAAFAAFAcLFHrhR64UBneFHrhR64#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABYAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBHq0OVgQYlAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAWAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAFgAAAQUAAQAAAAcAAAAJAP####8BAAAAAA4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MQABNgAAAAFAGAAAAAAAAAAAABEA#####wACeDIAATQAAAABQBAAAAAAAAAAAAARAP####8ACGFscGhhZGVnAAMtOTD#####AAAAAQAMQ01vaW5zVW5haXJlAAAAAUBWgAAAAAAA#####wAAAAEAEENQb2ludERhbnNSZXBlcmUA#####wEAAAAAFgABWgDAFAAAAAAAAEAAAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAEwD#####AQAAAAAWAAFGAAAAAAAAAAAAQAgAAAAAAAAHAAAAAAoAAAAOAAAADwAAAAEAAAAAAAAAAAAAABMA#####wEAAAAAFgABRAAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAADgAAABD#####AAAAAQAJQ1JvdGF0aW9uAP####8AAAASAAAADgAAABEAAAAPAP####8AAAAAABYAAUIAQCoAAAAAAADALgAAAAAAAAcAAAAAEwAAABUAAAAPAP####8AAAAAABYAAUMAQBAAAAAAAADAOwAAAAAAAAcAAAAAFAAAABX#####AAAAAQAJQ1BvbHlnb25lAP####8AAAAAAAIAAAAEAAAAEgAAABYAAAAXAAAAEv####8AAAACABdDTWFycXVlQW5nbGVHZW9tZXRyaXF1ZQD#####AAAA#wAEAAAAAUAwAAAAAAAAAAAAFgAAABIAAAAX#####wAAAAEACENTZWdtZW50AP####8BAAD#ABAAAAEABAAAABcAAAAW#####wAAAAEAEENNYWNyb0FwcGFyaXRpb24A#####wD#AAAB#####xBAh8ij1wo9cUBHYUeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAFQXBwQkMAAAAAAAEAAAAaAP####8AAAABABFDTWFjcm9EaXNwYXJpdGlvbgD#####AP8AAAH#####EECKaKPXCj1xQEphR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAZNYXNxQkMAAAAAAAEAAAAa#####wAAAAEAC0NNYWNyb1BhdXNlAP####8A#wAAAf####8QQI1oo9cKPXFASuFHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAABVBhdXNlAAAAAAABAAAAGQD#####AAAA#wH#####EECIIKPXCj1xQFqwo9cKPXACAAAAAAAAAAAAAAAAAQAAAAAAAAAAAApNYXNxQW5nZHJ0AAAAAAABAAAAGQAAABgA#####wAAAP8B#####xBAjAij1wo9cUBa8KPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAJQXBwQW5nRHJ0AAAAAAABAAAAGQD#####AAAAAQARQ01hY3JvU3VpdGVNYWNyb3MA#####wAAAP8B#####xBAWMUeuFHrhUB4fCj1wo9cAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAALaHlwb3TDqW51c2UAAAAAAAsAAAAeAAAAGwAAAB0AAAAfAAAAHAAAAB0AAAAeAAAAGwAAAB0AAAAcAAAAHwAAABYA#####wAAAP8AAwAAACBAQHXBUVjTVQAAAAEAAAAXAAAAFgAAAA7##########w=="
				}
				else {
					codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI#AAAAAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACL#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAFBAMAUAAAAAAAAQBQAAAAAAAAFAAFAbFo9cKPXBkB0BhR64Ueu#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABYAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBHq0OVgQYlAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAWAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAFgAAAQUAAQAAAAcAAAAJAP####8BAAAAAA4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MQABNgAAAAFAGAAAAAAAAAAAABEA#####wACeDIAATQAAAABQBAAAAAAAAAAAAARAP####8ACGFscGhhZGVnAAI5MAAAAAFAVoAAAAAAAP####8AAAABABBDUG9pbnREYW5zUmVwZXJlAP####8BAAAAABYAAVoAwBQAAAAAAABAAAAAAAAAAAcAAAAACgAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAABIA#####wEAAAAAFgABRgAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAADgAAAA8AAAABAAAAAAAAAAAAAAASAP####8BAAAAABYAAUQAAAAAAAAAAABACAAAAAAAAAcAAAAACgAAAAEAAAAAAAAAAAAAAA4AAAAQ#####wAAAAEACUNSb3RhdGlvbgD#####AAAAEgAAAA4AAAARAAAADwD#####AAAAAAAWAAFCAEAqAAAAAAAAwDgAAAAAAAAHAAAAABMAAAAVAAAADwD#####AAAAAAAWAAFDAMA3AAAAAAAAwEAAAAAAAAAHAAAAABQAAAAV#####wAAAAEACUNQb2x5Z29uZQD#####AAAAAAACAAAABAAAABIAAAAWAAAAFwAAABL#####AAAAAgAXQ01hcnF1ZUFuZ2xlR2VvbWV0cmlxdWUA#####wAAAP8ABAAAAAFAMAAAAAAAAAAAABYAAAASAAAAF#####8AAAABAAhDU2VnbWVudAD#####AQAA#wAQAAABAAQAAAAXAAAAFv####8AAAABABBDTWFjcm9BcHBhcml0aW9uAP####8A#wAAAf####8QQIfIo9cKPXFAR2FHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAABUFwcEJDAAAAAAABAAAAGgD#####AAAAAQARQ01hY3JvRGlzcGFyaXRpb24A#####wAAAP8B#####xBAimij1wo9cUBKYUeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAGTWFzcUJDAAAAAAABAAAAGv####8AAAABAAtDTWFjcm9QYXVzZQD#####AP8AAAH#####EECNaKPXCj1xQErhR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAVQYXVzZQAAAAAAAQAAABgA#####wAAAP8B#####xBAh#Cj1wo9cUBbcKPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAKTWFzcUFuZ0RydAAAAAAAAQAAABkAAAAXAP####8AAAD#Af####8QQIw4o9cKPXFAXPCj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAACUFwcEFuZ0RydAAAAAAAAQAAABkA#####wAAAAEAEUNNYWNyb1N1aXRlTWFjcm9zAP####8AAAD#Af####8QQFjFHrhR64VAeHwo9cKPXAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAC2h5cG90w6ludXNlAAAAAAALAAAAHgAAABsAAAAdAAAAHwAAABwAAAAdAAAAHgAAABsAAAAdAAAAHwAAABwAAAAVAP####8AAAD#AAMAAAAgQELJWhOPSZcAAAABAAAAFwAAABYAAAAO##########8="
				}
			}
			texte = `Dans la figure ci-dessous, le triangle $${nom_du_triangle}$ est rectangle en $${s0}$.<br>`
			

			if (type_de_questions == 1) { // calcul de l'angle 1 (arccos)
				texte += `$${s1 + s2}=${s12}$~cm<br>`;
				texte += `$${s0 + s1}=${s01}$~cm<br>`;
				texte += `Calculer l'angle $\\widehat{${s0 + s1 + s2}}$ à 1° près.`;


			}
			if (type_de_questions == 2) { // Calcul de l'angle 2 (90-arccos)
			texte += `$${s1 + s2}=${s12}$~cm<br>`;
			texte += `$${s0 + s1}=${s01}$~cm<br>`;
			texte += `Calculer l'angle $\\widehat{${s0 + s2 + s1}}$ à 1° près.`;
			}
			if (type_de_questions == 3) { // calcul de l'angle 1 (arcsin)
				texte += `$${s0 + s2}=${s02}$~cm<br>`;
				texte += `$${s1 + s2}=${s12}$~cm<br>`;
				texte += `Calculer l'angle $\\widehat{${s0 + s1 + s2}}$ à 1° près.`;


			}
			if (type_de_questions == 4) { // Calcul de l'angle 2 (arcsin)
			texte += `$${s1 + s2}=${s12}$~cm<br>`;
			texte += `$${s0 + s1}=${s01}$~cm<br>`;
			texte += `Calculer l'angle $\\widehat{${s0 + s2 + s1}}$ à 1° près.`;
			}
			if (type_de_questions == 5) { // calcul de l'angle 1 (arctan)
				texte += `$${s0 + s2}=${s02}$~cm<br>`;
				texte += `$${s0 + s1}=${s01}$~cm<br>`;
				texte += `Calculer l'angle $\\widehat{${s0 + s1 + s2}}$ à 1° près.`;


			}
			if (type_de_questions == 6) { // Calcul de l'angle 2 (arctan)
			texte += `$${s0 + s2}=${s02}$~cm<br>`;
			texte += `$${s0 + s1}=${s01}$~cm<br>`;
			texte += `Calculer l'angle $\\widehat{${s0 + s2 + s1}}$ à 1° près.`;
			}

			this.type_exercice = 'MG32';
			this.MG32codeBase64 = codeBase64
			this.MG32code_pour_modifier_la_figure = `
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "x2", "${y2}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "x1", "${x1}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "alphadeg", "${alpha1deg}");
			mtg32App.rename("MG32svg${numero_de_l_exercice}","A","${s0}");
			mtg32App.rename("MG32svg${numero_de_l_exercice}","B","${s1}");
			mtg32App.rename("MG32svg${numero_de_l_exercice}","C","${s2}");
			mtg32App.calculate("MG32svg${numero_de_l_exercice}");
			mtg32App.display("MG32svg${numero_de_l_exercice}");
			`
			texte += `<br>$\\footnotesize{\\textit{Le point \\thickspace ${s0} peut être déplacé (si la figure est tronquée).}}$<br>`;
		}
		else { //sortie Latex
			texte = `\\begin{minipage}{.5 \\linewidth} 	\\vspace{0cm} Sur la figure ci-contre, on a  : \\begin{itemize}`
			texte += `\n\t\\item Le triangle $${nom_du_triangle}$ est rectangle en $${s0}$;`

			if (type_de_questions == 1) { // Calcul de l'angle coté adjacent (Arccos)
				texte += `\n\t\\item $${s1 + s2}=${s12}~\\text{cm}$`;
				texte += `\n\t\\item $${s0 + s1}=${s01}~\\text{cm}$`;
				texte += `\\end{itemize} \\bigskip\n\t  Calculer l'angle $\\widehat{${s0 + s1 + s2}}$ à 1° près. \\end{minipage}`
			}
			if (type_de_questions == 2) { // Calcul de l'angle opposé (90-Arccos)
				texte += `\n\t\\item $${s1 + s2}=${s12}~\\text{cm}$`;
				texte += `\n\t\\item $${s0 + s1}=${s01}~\\text{cm}$`;
				texte += `\\end{itemize} \\bigskip\n\t  Calculer l'angle $\\widehat{${s0 + s2 + s1}}$ à 1° près. \\end{minipage}`
			}
			if (type_de_questions == 3) { // Calcul de l'angle 1 (Arcsin)
				texte += `\n\t\\item $${s1 + s2}=${s12}~\\text{cm}$`;
				texte += `\n\t\\item $${s0 + s2}=${s02}~\\text{cm}$`;
				texte += `\\end{itemize} \\bigskip\n\t  Calculer l'angle $\\widehat{${s0 + s1 + s2}}$ à 1° près. \\end{minipage}`
			}
			if (type_de_questions == 4) { // Calcul de l'angle 2 (Arcsin)
				texte += `\n\t\\item $${s1 + s2}=${s12}~\\text{cm}$`;
				texte += `\n\t\\item $${s0 + s1}=${s01}~\\text{cm}$`;
				texte += `\\end{itemize} \\bigskip\n\t  Calculer l'angle $\\widehat{${s0 + s2 + s1}}$ à 1° près. \\end{minipage}`
			}
			if (type_de_questions == 5) { // Calcul de l'angle 1 (Arctan)
				texte += `\n\t\\item $${s0 + s2}=${s02}~\\text{cm}$`;
				texte += `\n\t\\item $${s0 + s1}=${s01}~\\text{cm}$`;
				texte += `\\end{itemize} \\bigskip\n\t  Calculer l'angle $\\widehat{${s0 + s1 + s2}}$ à 1° près. \\end{minipage}`
	
			}
			if (type_de_questions == 6) { // Calcul de l'angle 2 (Arctan)
				texte += `\n\t\\item $${s0 + s2}=${s02}~\\text{cm}$`;
				texte += `\n\t\\item $${s0 + s1}=${s01}~\\text{cm}$`;
				texte += `\\end{itemize} \\bigskip\n\t  Calculer l'angle $\\widehat{${s0 + s2 + s1}}$ à 1° près. \\end{minipage}`
			}
			texte += '\\begin{minipage}{0.5 \\linewidth}'
			// dessin de la figure
			texte += '\n \\begin{tikzpicture}' // Balise début de figure
			texte += '\n\t \\tkzDefPoints{0/0/' + s0 + ',' + x1 + '/0/B,0/' + y2 + '/C}' // créer les points du triangle initial 
			// Définit les points M et N par homothétie de centre C et de rapport 0,3<k<0,8
			texte += '\n\t \\tkzDefPointBy[rotation= center ' + s0 + ' angle ' + alpha1deg + '](B) \\tkzGetPoint{' + s1 + '}' // transformer le premier point par rotation
			texte += '\n\t \\tkzDefPointBy[rotation= center ' + s0 + ' angle ' + alpha1deg + '](C) \\tkzGetPoint{' + s2 + '}' // transformer le deuxième point par rotation
			texte += '\n\t \\tkzDrawPolygon(' + s0 + ',' + s1 + ',' + s2 + ')' // Trace le triangle
			// marquer l'angle droit
			texte += '\n\t \\tkzDefPointBy[homothety=center ' + s0 + ' ratio 0.1](' + s1 + ')' + '\\tkzGetPoint{B}'
			texte += '\n\t \\tkzDefPointBy[rotation= center ' + s0 + ' angle 90](B) \\tkzGetPoint{C}'
			texte += '\n\t \\tkzDefPointBy[homothety=center ' + s0 + ' ratio 0.1414](' + s1 + ')' + '\\tkzGetPoint{A}'
			texte += '\n\t \\tkzDefPointBy[rotation= center ' + s0 + ' angle 45](A) \\tkzGetPoint{A}'
			texte += '\n\t \\tkzDrawPolygon(' + s0 + ',B,A,C)' // Trace la marque d'angle droit
			if (alpha1deg > 0) { // rotation "angle droit dessous"
			texte += '\n\t \\tkzLabelPoints[below](' + s0 + ')' //nomme les points
			texte += '\n\t \\tkzLabelPoints[above right](' + s1 + ')'
			texte += '\n\t \\tkzLabelPoints[left](' + s2 + ')'
		}
		else {		// rotation "angle droit dessus" position du nom inversée 
			texte += '\n\t \\tkzLabelPoints[left](' + s0 + ')' //nomme les points
			texte += '\n\t \\tkzLabelPoints[below left](' + s1 + ')'
			texte += '\n\t \\tkzLabelPoints[above right](' + s2 + ')'
		}
			texte += '\n \\end{tikzpicture}' // Balise de fin de figure
			texte += '\\end{minipage}'
		}
		if (type_de_questions == 1) {	
			texte_corr+=`Le cosinus de l'angle $\\widehat{${s0+s1+s2}}$ est défini par :<br>`;
			texte_corr +=`$\\cos \\left(\\widehat{${s0+s1+s2}}\\right)=${tex_fraction(s0 + s1,s1+s2)}$<br>`;
			texte_corr += `D'où $\\cos\\left(\\widehat{${s0+s1+s2}}\\right)=${tex_fraction(s01,s12)}$<br>`;
			texte_corr += `On en déduit que $\\widehat{${s0+s1+s2}}=\\arccos\\left(${tex_fraction(s01,s12)}\\right)$<br>`;
			texte_corr += `Soit $\\widehat{${s0+s1+s2}}\\approx${angle1}$°`
		}
		if (type_de_questions == 2) {
			texte_corr+=`Le cosinus de l'angle $\\widehat{${s0+s1+s2}}$ est défini par :<br>`;
			texte_corr +=`$\\cos \\left(\\widehat{${s0+s1+s2}}\\right)=${tex_fraction(s0 + s1,s1+s2)}$<br>`;
			texte_corr += `D'où $\\cos\\left(\\widehat{${s0+s1+s2}}\\right)=${tex_fraction(s01,s12)}$<br>`;
			texte_corr += `On en déduit que $\\widehat{${s0+s1+s2}}=\\arccos\\left(${tex_fraction(s01,s12)}\\right)$<br>`;
			texte_corr += `Soit $\\widehat{${s0+s1+s2}}\\approx${angle1}$°<br>`
			texte_corr += `Or, dans un triangle rectangle les angles aigus sont complémentaires, donc :<br>`
			texte_corr += `$\\widehat{${s0+s2+s1}}\\approx90-${angle1}\\approx${angle2}$°`
		}	
		if (type_de_questions == 3) {
			texte_corr+=`Le sinus de l'angle $\\widehat{${s0+s1+s2}}$ est défini par :<br>`;
			texte_corr +=`$\\sin \\left(\\widehat{${s0+s1+s2}}\\right)=${tex_fraction(s0 + s2,s1+s2)}$<br>`;
			texte_corr += `D'où $\\sin\\left(\\widehat{${s0+s1+s2}}\\right)=${tex_fraction(s02,s12)}$<br>`;
			texte_corr += `On en déduit que $\\widehat{${s0+s1+s2}}=\\arcsin\\left(${tex_fraction(s02,s12)}\\right)$<br>`;
			texte_corr += `Soit $\\widehat{${s0+s1+s2}}\\approx${angle1}$°`
		}
		if (type_de_questions == 4) {
			texte_corr+=`Le sinus de l'angle $\\widehat{${s0+s2+s1}}$ est défini par :<br>`;
			texte_corr +=`$\\sin \\left(\\widehat{${s0+s2+s1}}\\right)=${tex_fraction(s0 + s1,s1+s2)}$<br>`;
			texte_corr += `D'où $\\sin\\left(\\widehat{${s0+s2+s1}}\\right)=${tex_fraction(s01,s12)}$<br>`;
			texte_corr += `On en déduit que $\\widehat{${s0+s2+s1}}=\\arcsin\\left(${tex_fraction(s01,s12)}\\right)$<br>`;
			texte_corr += `Soit $\\widehat{${s0+s2+s1}}\\approx${angle2}$°`
		}
		if (type_de_questions == 5) {
			texte_corr+=`La tangente de l'angle $\\widehat{${s0+s1+s2}}$ est définie par :<br>`;
			texte_corr +=`$\\tan \\left(\\widehat{${s0+s1+s2}}\\right)=${tex_fraction(s0 + s2,s0+s1)}$<br>`;
			texte_corr += `D'où $\\tan\\left(\\widehat{${s0+s1+s2}}\\right)=${tex_fraction(s02,s01)}$<br>`;
			texte_corr += `On en déduit que $\\widehat{${s0+s1+s2}}=\\arctan\\left(${tex_fraction(s02,s01)}\\right)$<br>`;
			texte_corr += `Soit $\\widehat{${s0+s1+s2}}\\approx${angle1}$°`
		}
		if (type_de_questions == 6) {
			texte_corr+=`La tangente de l'angle $\\widehat{${s0+s2+s1}}$ est définie par :<br>`;
			texte_corr +=`$\\tan \\left(\\widehat{${s0+s2+s1}}\\right)=${tex_fraction(s0 + s1,s0+s2)}$<br>`;
			texte_corr += `D'où $\\tan\\left(\\widehat{${s0+s2+s1}}\\right)=${tex_fraction(s01,s02)}$<br>`;
			texte_corr += `On en déduit que $\\widehat{${s0+s2+s1}}=\\arctan\\left(${tex_fraction(s01,s02)}\\right)$<br>`;
			texte_corr += `Soit $\\widehat{${s0+s2+s1}}\\approx${angle2}$°`
		}
		this.liste_questions.push(texte);
		this.liste_corrections.push(texte_corr);
		liste_de_question_to_contenu_sans_numero(this);;
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté', 2, '1 : Calcul de l\'angle avec Acos \n 2 : Calcul de l\'angle avec Acos, Asin ou Atan'];
}

/**
* À partir de la donnée des 3 longueurs d'un triangle, déterminer si il est rectangle ou pas.
* @Auteur Rémi Angot
*/
function Reciproque_Pythagore(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Déterminer si un triangle est rectangle ou pas.";
	this.consigne = "";
	this.nb_questions = 3;
	this.nb_cols = 2;
	this.nb_cols_corr = 2;
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1;

	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let liste_type_de_questions = combinaison_listes(['rectangle','rectangle','pas_rectangle','pas_rectangle'],this.nb_questions)
		let liste_triplets_pythagoriciens =  [[3,4,5],[5,12,13],[6,8,10],[7,24,25],[8,15,17],[9,12,15],[9,40,41], [10,24,26], [11,60,61], [12,16,20], [12,35,37], [13,84,85], [14,48,50], [15,20,25], [15,36,39], [16,30,34], [16,63,65], [18,24,30], [18,80,82],  [20,21,29], [20,48,52], [21,28,35], [21,72,75], [24,32,40], [24,45,51], [24,70,74], [25,60,65], [27,36,45], [28,45,53], [28,96,100], [30,40,50], [30,72,78], [32,60,68], [33,44,55], [33,56,65], [35,84,91], [36,48,60], [36,77,85], [39,52,65], [39,80,89], [40,42,58], [40,75,85], [42,56,70], [45,60,75], [48,55,73], [48,64,80], [51,68,85], [54,72,90], [57,76,95], [60,63,87], [60,80,100], [65,72,97]]
		let liste_noms_triangles = []; // on mémorise les noms des triangles pour ne pas les redonner
		for (let i = 0, texte, texte_corr, AB,BC,AC,a,b,c,nom_triangle,triplet, ordre_des_cotes, cpt=0; i < this.nb_questions && cpt<50; ) {
			nom_triangle = polygone(3,liste_noms_triangles);
			liste_noms_triangles.push(nom_triangle)
			A = nom_triangle[0];
			B = nom_triangle[1];
			C = nom_triangle[2];
			triplet = choice(liste_triplets_pythagoriciens);
			enleve_element(liste_triplets_pythagoriciens,triplet) // Supprime le triplet pour les prochaines questions
			a = triplet[0];
			b = triplet[1];
			c = triplet[2];
			if (liste_type_de_questions[i]=='pas_rectangle') {
				c += randint(-3,3,[0]) // on change la valeur de c 
				while (a**2+b**2==c**2){ // si par hasard (est-ce possible ?) on retombe sur un triplet pythagoricien on change les valeurs
					c += randint(-3,3,[0]) // on change la valeur de c
					b += randint(-3,3,[0]) // on change la valeur de b
				}
			}
			if (a>9 && choice([true,true,true,false]) ) { //le plus souvent on utilise des décimaux
				a = calcul(a/10);
				b = calcul(b/10);
				c = calcul(c/10);
			}
			ordre_des_cotes = randint(1,3)
			switch (ordre_des_cotes){
				case 1 : 
				texte = `Le triangle $${nom_triangle}$ est tel que $${A+B}=${tex_nombre(c)}$~cm, $${A+C}=${tex_nombre(b)}$~cm et $${B+C}=${tex_nombre(a)}$~cm.`
				break
				case 2 : 
				texte = `Le triangle $${nom_triangle}$ est tel que  $${B+C}=${tex_nombre(a)}$~cm, $${A+C}=${tex_nombre(b)}$~cm et $${A+B}=${tex_nombre(c)}$~cm.`
				break
				case 3 : 
				texte = `Le triangle $${nom_triangle}$ est tel que $${A+C}=${tex_nombre(b)}$~cm, $${A+B}=${tex_nombre(c)}$~cm,  et $${B+C}=${tex_nombre(a)}$~cm.`
				break 
			}
			texte += `<br>Ce triangle est-il rectangle ?`
			texte_corr = `Dans le triangle $${nom_triangle}$, le plus grand côté est $[${A+B}]$.`
			texte_corr += `<br>$${A+B}^2=${tex_nombre(c)}^2=${tex_nombrec(c**2)}$`
			texte_corr += `<br>$${A+C}^2+${B+C}^2=${tex_nombre(b)}^2+${tex_nombre(a)}^2=${tex_nombrec(b**2+a**2)}$`
			if (liste_type_de_questions[i]=='rectangle') {
				texte_corr += `<br>On constate que $${A+B}^2=${A+C}^2+${B+C}^2$, l'égalité de Pythagore est vérifiée donc $${nom_triangle}$ est rectangle en $${C}$.`
			} else {
				texte_corr += `<br>On constate que $${A+B}^2\\not=${A+C}^2+${B+C}^2$, l'égalité de Pythagore n'est pas vérifiée donc $${nom_triangle}$ n'est pas rectangle.`
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
	//this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}

/**
* Problèmes utilisant le théorème de Pythagore ou sa réciproque et des propriétés des quadrilatères particuliers.
*
* * Dans un losange, on connait la longueur du côté et une diagonale, il faut calculer l'autre.
* * Dans un rectangle on connait la longueur et une diagonale, il faut calculer la largeur.
* * Dans un rectangle on connait la longueur et la largeur, il faut calculer la diagonale.
* * Est-ce qu'un parallélogramme est un losange ? On peut démontrer que les diagonales sont perpendiculaires ou pas.
* * Est-ce qu'un parallélogramme est un rectangle ? On peut démontrer qu'il possède un angle droit ou pas . 
* @Auteur Rémi Angot
*/
function Problemes_Pythagore(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Problèmes utilisant le théorème de Pythagore";
	this.consigne = "";
	this.nb_questions = 2;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing = 1;
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1.5;

	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let type_de_questions_disponibles = ['losange','rectangle_diagonale_connue','rectangle_diagonale_a_trouver','parallelogramme_est_losange','parallelogramme_n_est_pas_losange','parallelogramme_est_rectangle','parallelogramme_n_est_pas_rectangle']
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions)
		let liste_triplets_pythagoriciens =  [[3,4,5],[5,12,13],[6,8,10],[7,24,25],[8,15,17],[9,12,15],[9,40,41], [10,24,26], [11,60,61], [12,16,20], [12,35,37], [13,84,85], [14,48,50], [15,20,25], [15,36,39], [16,30,34], [16,63,65], [18,24,30], [18,80,82],  [20,21,29], [20,48,52], [21,28,35], [21,72,75], [24,32,40], [24,45,51], [24,70,74], [25,60,65], [27,36,45], [28,45,53], [28,96,100], [30,40,50], [30,72,78], [32,60,68], [33,44,55], [33,56,65], [35,84,91], [36,48,60], [36,77,85], [39,52,65], [39,80,89], [40,42,58], [40,75,85], [42,56,70], [45,60,75], [48,55,73], [48,64,80], [51,68,85], [54,72,90], [57,76,95], [60,63,87], [60,80,100], [65,72,97]];
		let liste_noms_quadrilateres = ['L','M','N','O'] // pour que le O ne soit pas une des 4 lettres
		for (let i = 0, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) {
			let nom_quadrilatere = polygone(4,liste_noms_quadrilateres);
			liste_noms_quadrilateres.push(nom_quadrilatere)
			let A = nom_quadrilatere[0];
			let B = nom_quadrilatere[1];
			let C = nom_quadrilatere[2];
			let D = nom_quadrilatere[3]
			let O = `O`
			let triplet = choice(liste_triplets_pythagoriciens);
			enleve_element(liste_triplets_pythagoriciens,triplet) // Supprime le triplet pour les prochaines questions
			let a = triplet[0];
			let b = triplet[1];
			let c = triplet[2];
			if (liste_type_de_questions[i]=='parallelogramme_n_est_pas_losange' || liste_type_de_questions[i]=='parallelogramme_n_est_pas_rectangle') {
				c += randint(-3,3,[0]) // on change la valeur de c 
				while (a**2+b**2==c**2){ // si par hasard (est-ce possible ?) on retombe sur un triplet pythagoricien on change les valeurs
					c += randint(-3,3,[0]) // on change la valeur de c
					b += randint(-3,3,[0]) // on change la valeur de b
				}
			}
			if (a>9 && choice([true,true,true,false]) ) { //le plus souvent on utilise des décimaux
				a = calcul(a/10);
				b = calcul(b/10);
				c = calcul(c/10);
			}

			switch (liste_type_de_questions[i]) {
				case 'losange' :
				texte = `$${nom_quadrilatere}$ est un losange de centre $O$ tel que $${A+B}=${tex_nombre(c)}$ cm et $${A+C}=${tex_nombre(2*a)}$ cm.<br>`
				texte += `Calculer $${D+B}$.`

				if (sortie_html) {
					texte_corr = `<p style="margin-left:10%"><svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"><defs id="mtg32_patterns"/><rect width="100%" height="100%" fill="rgb(255,255,255)"/><g id="mtg32svgTraces" transform="scale(1)"/><g id=""/><g/><g id=""/><g id=""/><g/><g id=""/><g id=""/><g id="mtg32svg#6"/><text x="185.5" y="32.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${A}</tspan></text><text x="220.5" y="134.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${B}</tspan></text><line x1="190.5" y1="43.44" x2="216.5" y2="129.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><g id=""/><text x="144.54431444308477" y="133.14525664249953" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${D}</tspan></text><line x1="190.5" y1="43.44" x2="163.54431444308477" y2="129.14525664249953" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><g id=""/><text x="183.54431444308474" y="234.14525664249953" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${C}</tspan></text><line x1="216.5" y1="129.44" x2="189.54431444308474" y2="215.14525664249953" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="189.54431444308474" y1="215.14525664249953" x2="163.54431444308477" y2="129.14525664249953" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><g id=""/><g  id=""><line x1="208.86483613904568" y1="86.9074753482156" x2="199.2927218660596" y2="89.80137036097884" style="stroke-width:1;stroke:rgb(0,0,255);" /><line x1="207.7072781339404" y1="83.07862963902116" x2="198.13516386095432" y2="85.9725246517844" style="stroke-width:1;stroke:rgb(0,0,255);" /></g><g  id=""><line x1="207.19175809011574" y1="175.70062312711323" x2="197.652449829911" y2="172.70035681946817" style="stroke-width:1;stroke:rgb(0,0,255);" /><line x1="208.39186461317377" y1="171.88489982303136" x2="198.85255635296903" y2="168.8846335153863" style="stroke-width:1;stroke:rgb(0,0,255);" /></g><g  id=""><line x1="171.1794783040391" y1="171.67778129428393" x2="180.75159257702518" y2="168.78388628152072" style="stroke-width:1;stroke:rgb(0,0,255);" /><line x1="172.33703630914437" y1="175.50662700347834" x2="181.90915058213045" y2="172.61273199071513" style="stroke-width:1;stroke:rgb(0,0,255);" /></g><g  id=""><line x1="181.19175809011574" y1="89.70062312711323" x2="171.652449829911" y2="86.7003568194682" style="stroke-width:1;stroke:rgb(0,0,255);" /><line x1="182.39186461317377" y1="85.88489982303133" x2="172.85255635296903" y2="82.8846335153863" style="stroke-width:1;stroke:rgb(0,0,255);" /></g><text x="176.02215722154236" y="144.29262832124977" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>O</tspan></text><g  id=""><line x1="198.79500694133887" y1="129.34145667941502" x2="198.84383529950412" y2="120.56860695961849" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(255,0,0);"/><line x1="190.0709855797076" y1="120.51977860145324" x2="198.84383529950412" y2="120.56860695961849" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(255,0,0);"/></g><line x1="190.5" y1="43.44" x2="190.02215722154236" y2="129.29262832124977" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="190.02215722154236" y1="129.29262832124977" x2="189.54431444308474" y2="215.14525664249953" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="190.02215722154236" y1="129.29262832124977" x2="163.54431444308477" y2="129.14525664249953" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="190.02215722154236" y1="129.29262832124977" x2="216.5" y2="129.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><g  id=""><line x1="193.7768798113023" y1="89.9214712483418" x2="186.74527741024002" y2="82.81115707290796" style="stroke-width:1;stroke:rgb(255,0,0);" /><line x1="186.70592152305426" y1="89.88211536115601" x2="193.81623569848807" y2="82.85051296009375" style="stroke-width:1;stroke:rgb(255,0,0);" /></g><g  id=""><line x1="193.2990370328447" y1="175.77409956959156" x2="186.2674346317824" y2="168.66378539415774" style="stroke-width:1;stroke:rgb(255,0,0);" /><line x1="186.22807874459664" y1="175.7347436824058" x2="193.33839292003046" y2="168.7031412813435" style="stroke-width:1;stroke:rgb(255,0,0);" /></g><g  id=""><line x1="176.75540701760488" y1="134.21886503698207" x2="176.81106464702222" y2="124.21901992676723" style="stroke-width:1;stroke:rgb(255,0,0);" /></g><g  id=""><line x1="203.28890742547983" y1="124.36639160551746" x2="203.2332497960625" y2="134.3662367157323" style="stroke-width:1;stroke:rgb(255,0,0);" /></g></svg></p>`
				} else {
					texte_corr = ``
				}
				texte_corr += `$${nom_quadrilatere}$ est un losange donc ses diagonales se coupent en leur milieu : $${A+O}=${A+C}\\div2=${tex_nombre(2*a)}\\div2=${tex_nombre(a)}$~cm.<br>`
				texte_corr += `On sait que les diagonales d'un losange se coupent perpendiculairement donc $${A+O+C}$ est un triangle rectangle en $O$.<br>`
				texte_corr += `D'après le théorème de Pythagore, on a : $${A+O}^2+${O+B}^2=${A+B}^2$.<br>`
				texte_corr += `Donc $${O+B}^2=${A+B}^2-${A+O}^2=${tex_nombre(c)}^2-${tex_nombre(a)}^2=${tex_nombre(b**2)}$.<br>`
				texte_corr += `On a alors $${O+B}=\\sqrt{${tex_nombrec(b**2)}}=${tex_nombre(b)}$ cm.<br>`
				texte_corr += `Finalement comme $O$ est aussi le milieu de $[${D+B}]$ : $${D+B}=2\\times ${O+B}=2\\times${tex_nombre(b)}=${tex_nombre(2*b)}$ cm.`
				break

				case 'rectangle_diagonale_connue' :
				texte = `$${nom_quadrilatere}$ est un rectangle tel que $${A+B}=${tex_nombre(a)}$ cm et $${A+C}=${tex_nombre(c)}$ cm.<br>`
				texte += `Calculer $${B+C}$.`
				if (sortie_html) {
					texte_corr = `<p style="margin-left:10%"><svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><defs id="mtg32_patterns"/><rect width="100%" height="100%" fill="rgb(255,255,255)"/><g id="mtg32svgTraces" transform="scale(1)"/><g id=""/><g/><g id=""/><g id=""/><g/><g id=""/><g id=""/><g id=""/><text x="113.5" y="49.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${A}</tspan></text><g id=""/><text x="276.5" y="49.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${B}</tspan></text><g id=""/><g id=""/><text x="276.5" y="138.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${C}</tspan></text><g id=""/><text x="111.5" y="141.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${D}</tspan></text><polygon points="126.500,53.440 272.500,53.440 272.500,124.440 126.500,124.440 " style="stroke-width:1;stroke:rgb(0,0,0);fill:none"  id=""/><g  id=""><line x1="142.5" y1="53.44" x2="142.5" y2="69.44" style="stroke-width:1;stroke:rgb(0,0,255);"/><line x1="126.5" y1="69.44" x2="142.5" y2="69.44" style="stroke-width:1;stroke:rgb(0,0,255);"/></g><g  id=""><line x1="272.5" y1="69.44" x2="256.5" y2="69.44" style="stroke-width:1;stroke:rgb(0,0,255);"/><line x1="256.5" y1="53.44" x2="256.5" y2="69.44" style="stroke-width:1;stroke:rgb(0,0,255);"/></g><g  id=""><line x1="256.5" y1="124.44" x2="256.5" y2="108.44" style="stroke-width:1;stroke:rgb(0,0,255);"/><line x1="272.5" y1="108.44" x2="256.5" y2="108.44" style="stroke-width:1;stroke:rgb(0,0,255);"/></g><g  id=""><line x1="126.5" y1="108.44" x2="142.5" y2="108.44" style="stroke-width:1;stroke:rgb(0,0,255);"/><line x1="142.5" y1="124.44" x2="142.5" y2="108.44" style="stroke-width:1;stroke:rgb(0,0,255);"/></g><line x1="126.5" y1="53.44" x2="272.5" y2="124.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/></svg></svg></p>`
				} else {
					texte_corr = ``
				}
				texte_corr += `$${nom_quadrilatere}$ est un rectangle donc il possède 4 angles droits et $${A+B+C}$ est un triangle rectangle en $${B}$.<br>`
				texte_corr += `D'après le théorème de Pythagore, on a : $${A+B}^2+${B+C}^2=${A+C}^2$.<br>`
				texte_corr += `Donc $${B+C}^2=${A+C}^2-${A+B}^2=${tex_nombre(c)}^2-${tex_nombre(a)}^2=${tex_nombre(b**2)}$.<br>`
				texte_corr += `Finalement, $${B+C}=\\sqrt{${tex_nombrec(b**2)}}=${tex_nombre(b)}$ cm.`
				break

				case 'rectangle_diagonale_a_trouver' :
				texte = `$${nom_quadrilatere}$ est un rectangle tel que $${A+B}=${tex_nombre(a)}$ cm et $${B+C}=${tex_nombre(b)}$ cm.<br>`
				texte += `Calculer $${A+C}$.`
				if (sortie_html) {
					texte_corr = `<p style="margin-left:10%"><svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><defs id="mtg32_patterns"/><rect width="100%" height="100%" fill="rgb(255,255,255)"/><g id="mtg32svgTraces" transform="scale(1)"/><g id=""/><g/><g id=""/><g id=""/><g/><g id=""/><g id=""/><g id=""/><text x="113.5" y="49.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${A}</tspan></text><g id=""/><text x="276.5" y="49.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${B}</tspan></text><g id=""/><g id=""/><text x="276.5" y="138.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${C}</tspan></text><g id=""/><text x="111.5" y="141.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${D}</tspan></text><polygon points="126.500,53.440 272.500,53.440 272.500,124.440 126.500,124.440 " style="stroke-width:1;stroke:rgb(0,0,0);fill:none"  id=""/><g  id=""><line x1="142.5" y1="53.44" x2="142.5" y2="69.44" style="stroke-width:1;stroke:rgb(0,0,255);"/><line x1="126.5" y1="69.44" x2="142.5" y2="69.44" style="stroke-width:1;stroke:rgb(0,0,255);"/></g><g  id=""><line x1="272.5" y1="69.44" x2="256.5" y2="69.44" style="stroke-width:1;stroke:rgb(0,0,255);"/><line x1="256.5" y1="53.44" x2="256.5" y2="69.44" style="stroke-width:1;stroke:rgb(0,0,255);"/></g><g  id=""><line x1="256.5" y1="124.44" x2="256.5" y2="108.44" style="stroke-width:1;stroke:rgb(0,0,255);"/><line x1="272.5" y1="108.44" x2="256.5" y2="108.44" style="stroke-width:1;stroke:rgb(0,0,255);"/></g><g  id=""><line x1="126.5" y1="108.44" x2="142.5" y2="108.44" style="stroke-width:1;stroke:rgb(0,0,255);"/><line x1="142.5" y1="124.44" x2="142.5" y2="108.44" style="stroke-width:1;stroke:rgb(0,0,255);"/></g><line x1="126.5" y1="53.44" x2="272.5" y2="124.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/></svg></svg></p>`
				} else {
					texte_corr = ``
				}
				texte_corr += `$${nom_quadrilatere}$ est un rectangle donc il possède 4 angles droits et $${A+B+C}$ est un triangle rectangle en $${B}$.<br>`
				texte_corr += `D'après le théorème de Pythagore, on a : $${A+C}^2=${A+B}^2+${B+C}^2=${tex_nombrec(a)}^2+${tex_nombrec(b)}^2=${tex_nombrec(c**2)}$.<br>`
				texte_corr += `Finalement, $${A+C}=\\sqrt{${tex_nombrec(c**2)}}=${tex_nombre(c)}$ cm.`
				break

				case 'parallelogramme_est_losange' :
				texte = `$${nom_quadrilatere}$ est un parallélogramme de centre $O$ tel que $${A+O}=${tex_nombre(a)}$ cm, $${A+B}=${tex_nombre(c)}$ cm et $${B+O}=${tex_nombre(b)}$ cm.<br>`
				texte += `$${nom_quadrilatere}$ est-il un losange ?`
				if (sortie_html) {
					texte_corr = `<p style="margin-left:10%"><svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><defs id="mtg32_patterns"/><rect width="100%" height="100%" fill="rgb(255,255,255)"/><g id="mtg32svgTraces" transform="scale(1)"/><text x="85.5" y="46.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${A}</tspan></text><g id=""/><text x="252.5" y="45.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${B}</tspan></text><text x="302.5" y="156.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${C}</tspan></text><g id=""/><line x1="256.5" y1="52.44" x2="307.5" y2="138.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="92.5" y1="52.44" x2="256.5" y2="52.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><g id=""/><text x="137.5" y="155.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${D}</tspan></text><line x1="307.5" y1="138.44" x2="143.5" y2="138.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="143.5" y1="138.44" x2="92.5" y2="52.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="92.5" y1="52.44" x2="307.5" y2="138.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="256.5" y1="52.44" x2="143.5" y2="138.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><text x="200" y="114.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>O</tspan></text></svg></p>`
				} else {
					texte_corr = ``
				}
				texte_corr += `Dans le triangle $${A+O+B}$, le plus grand côté est $[${A+B}]$.<br>`
				texte_corr += `$${A+B}^2=${tex_nombre(c)}^2=${tex_nombrec(c**2)}$<br>`
				texte_corr += `$${A+O}^2+${O+B}^2=${tex_nombre(a)}^2+${tex_nombre(b)}^2=${tex_nombrec(a**2+b**2)}$<br>`
				texte_corr += `On constate que $${A+B}^2=${A+O}^2+${O+B}^2$, l'égalité de Pythagore est vérifiée donc $${A+O+B}$ est rectangle en $O$.<br>`
				texte_corr += `Finalement, comme $${nom_quadrilatere}$ est un parallélogramme qui a ses diagonales perpendiculaires alors c'est aussi un losange.`
				break

				case 'parallelogramme_n_est_pas_losange' :
				texte = `$${nom_quadrilatere}$ est un parallélogramme de centre $O$ tel que $${A+O}=${tex_nombre(a)}$ cm, $${A+B}=${tex_nombre(c)}$ cm et $${B+O}=${tex_nombre(b)}$ cm.<br>`
				texte += `$${nom_quadrilatere}$ est-il un losange ?`
				if (sortie_html) {
					texte_corr = `<p style="margin-left:10%"><svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><defs id="mtg32_patterns"/><rect width="100%" height="100%" fill="rgb(255,255,255)"/><g id="mtg32svgTraces" transform="scale(1)"/><text x="85.5" y="46.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${A}</tspan></text><g id=""/><text x="252.5" y="45.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${B}</tspan></text><text x="302.5" y="156.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${C}</tspan></text><g id=""/><line x1="256.5" y1="52.44" x2="307.5" y2="138.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="92.5" y1="52.44" x2="256.5" y2="52.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><g id=""/><text x="137.5" y="155.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${D}</tspan></text><line x1="307.5" y1="138.44" x2="143.5" y2="138.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="143.5" y1="138.44" x2="92.5" y2="52.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="92.5" y1="52.44" x2="307.5" y2="138.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="256.5" y1="52.44" x2="143.5" y2="138.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><text x="200" y="114.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>O</tspan></text></svg></p>`
				} else {
					texte_corr = ``
				}
				texte_corr += `Dans le triangle $${A+O+B}$, le plus grand côté est $[${A+B}]$.<br>`
				texte_corr += `$${A+B}^2=${tex_nombre(c)}^2=${tex_nombrec(c**2)}$<br>`
				texte_corr += `$${A+O}^2+${O+B}^2=${tex_nombre(a)}^2+${tex_nombre(b)}^2=${tex_nombrec(a**2+b**2)}$<br>`
				texte_corr += `On constate que $${A+B}^2\\not=${A+O}^2+${O+B}^2$, l'égalité de Pythagore n'est pas vérifiée donc $${A+O+B}$ n'est pas un triangle rectangle.<br>`
				texte_corr += `Si $${nom_quadrilatere}$ était un losange alors ses diagonales devraient être perpendiculaires et $${A+O+B}$ devrait être un triangle rectangle.<br>`
				texte_corr += `Finalement comme $${A+O+B}$ n'est pas un triangle rectangle, $${nom_quadrilatere}$ n'est pas un losange.`
				break

				case 'parallelogramme_est_rectangle' :
				texte = `$${nom_quadrilatere}$ est un parallélogramme de centre $O$ tel que $${A+B}=${tex_nombre(a)}$ cm, $${A+C}=${tex_nombre(c)}$ cm et $${B+C}=${tex_nombre(b)}$ cm.<br>`
				texte += `$${nom_quadrilatere}$ est-il un rectangle ?`
				if (sortie_html) {
					texte_corr = `<p style="margin-left:10%"><svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><defs id="mtg32_patterns"/><rect width="100%" height="100%" fill="rgb(255,255,255)"/><g id="mtg32svgTraces" transform="scale(1)"/><text x="85.5" y="46.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${A}</tspan></text><g id=""/><text x="252.5" y="45.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${B}</tspan></text><text x="302.5" y="156.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${C}</tspan></text><g id=""/><line x1="256.5" y1="52.44" x2="307.5" y2="138.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="92.5" y1="52.44" x2="256.5" y2="52.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><g id=""/><text x="137.5" y="155.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${D}</tspan></text><line x1="307.5" y1="138.44" x2="143.5" y2="138.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="143.5" y1="138.44" x2="92.5" y2="52.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="92.5" y1="52.44" x2="307.5" y2="138.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="256.5" y1="52.44" x2="143.5" y2="138.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><text x="200" y="114.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>O</tspan></text></svg></p>`
				} else {
					texte_corr = ``
				}
				texte_corr += `Dans le triangle $${A+B+C}$, le plus grand côté est $[${A+C}]$.<br>`
				texte_corr += `$${A+C}^2=${tex_nombre(c)}^2=${tex_nombrec(c**2)}$<br>`
				texte_corr += `$${A+B}^2+${B+C}^2=${tex_nombre(a)}^2+${tex_nombre(b)}^2=${tex_nombrec(a**2+b**2)}$<br>`
				texte_corr += `On constate que $${A+C}^2=${A+B}^2+${B+C}^2$, l'égalité de Pythagore est vérifiée donc $${A+B+C}$ est rectangle en $${B}$.<br>`
				texte_corr += `Finalement, comme $${nom_quadrilatere}$ est un parallélogramme qui a un angle droit en $${B}$ alors c'est aussi un rectangle.`
				break

				case 'parallelogramme_n_est_pas_rectangle' :
				texte = `$${nom_quadrilatere}$ est un parallélogramme de centre $O$ tel que $${A+B}=${tex_nombre(a)}$ cm, $${A+C}=${tex_nombre(c)}$ cm et $${B+C}=${tex_nombre(b)}$ cm.<br>`
				texte += `$${nom_quadrilatere}$ est-il un rectangle ?`
				if (sortie_html) {
					texte_corr = `<p style="margin-left:10%"><svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><defs id="mtg32_patterns"/><rect width="100%" height="100%" fill="rgb(255,255,255)"/><g id="mtg32svgTraces" transform="scale(1)"/><text x="85.5" y="46.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${A}</tspan></text><g id=""/><text x="252.5" y="45.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${B}</tspan></text><text x="302.5" y="156.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${C}</tspan></text><g id=""/><line x1="256.5" y1="52.44" x2="307.5" y2="138.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="92.5" y1="52.44" x2="256.5" y2="52.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><g id=""/><text x="137.5" y="155.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${D}</tspan></text><line x1="307.5" y1="138.44" x2="143.5" y2="138.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="143.5" y1="138.44" x2="92.5" y2="52.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="92.5" y1="52.44" x2="307.5" y2="138.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="256.5" y1="52.44" x2="143.5" y2="138.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><text x="200" y="114.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>O</tspan></text></svg></p>`
				} else {
					texte_corr = ``
				}
				texte_corr += `Dans le triangle $${A+B+C}$, le plus grand côté est $[${A+C}]$.<br>`
				texte_corr += `$${A+C}^2=${tex_nombre(c)}^2=${tex_nombrec(c**2)}$<br>`
				texte_corr += `$${A+B}^2+${B+C}^2=${tex_nombre(a)}^2+${tex_nombre(b)}^2=${tex_nombrec(a**2+b**2)}$<br>`
				texte_corr += `On constate que $${A+C}^2\\not=${A+B}^2+${B+C}^2$, l'égalité de Pythagore n'est pas vérifiée donc $${A+B+C}$ n'est pas rectangle en $${B}$.<br>`
				texte_corr += `Finalement, comme $${nom_quadrilatere}$ n'a pas d'angle droit en $${B}$ ce n'est pas un rectangle.`
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
	//this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}

/**
* Puissances d'un relatif (1)
* * Travailler des résultats automatisés 
* * mais aussi d'utiliser les propriétés du produit de puissance, du quotient de puissances et des puissances de puissances
* @auteur Sébastien Lozano
*/
function Puissances_d_un_relatif_1(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1 ; 
	this.titre = "Puissances : Calculs automatisés et règles de calculs"; 
	this.consigne = "Écrire sous la forme $\\mathbf{a^n}$.";
	this.spacing = 2;
	this.spacing_corr = 2;
	this.nb_questions = 8;
	this.nb_cols_corr = 2;

	// fonction pour ne pas avoir l'exposant 0 ou 1, retourne 1, la base ou base^exposant
	function testExp(b,e) {
		switch (e) {
			case 1 : 
				return ` = ${b}$`;
				break;
			case 0 : 
				return ` = 1$`;
				break;
			default : 
				//return `$ = ${b}^{${e}}$`;						
				return `$`;
		};
	}

	this.nouvelle_version = function(){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = [1,2,3,4,5,6,7,8];	
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions);

		for (let i = 0, base ,exp , texte, texte_corr, cpt=0; i < this.nb_questions&&cpt<50;) {
			type_de_questions = liste_type_de_questions[i];
			
			switch (type_de_questions) {
				case 1 :
					base = 3; // on travaille sur cette base mais on pourrait rendre la base aléatoire
					exp = [randint(1,7,[1]),randint(1,7,[1]),randint(1,7,[1])]; // on a besoin de 3 exposants distincts
					texte = `$\\dfrac{${base}^${exp[0]}\\times ${base*base}}{${base}^${exp[1]} \\times ${base}^${exp[2]}}$`;
					texte_corr = `$\\dfrac{${base}^${exp[0]}\\times ${base*base}}{${base}^${exp[1]} \\times ${base}^${exp[2]}}`;
					texte_corr += ` = \\dfrac{${base}^${exp[0]}\\times ${base}^{2}}{${base}^${exp[1]} \\times ${base}^${exp[2]}}`;
					texte_corr += ` = \\dfrac{${base}^{${exp[0]}+2}}{${base}^{${exp[1]}+${exp[2]}}}`;
					texte_corr += ` = \\dfrac{${base}^{${exp[0]+2}}}{${base}^{${exp[1]+exp[2]}}}`;
					texte_corr += ` = ${base}^{${exp[0]+2}-${exp[1]+exp[2]}}`;					
					texte_corr += ` = ${base}^{${exp[0]+2-exp[1]-exp[2]}}`;
					// on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
					texte_corr += testExp(base,exp[0]+2-exp[1]-exp[2]);
					break;
				case 2 :
					base = 2; // on travaille sur cette base mais on pourrait rendre la base aléatoire
					exp = [randint(1,7,[1]),randint(1,7,[1])]; // on a besoin de 2 exposants distincts
					texte = `$\\dfrac{${base}^${exp[0]}\\times ${base**3}}{${base}^${exp[1]}}$`;
					texte_corr = `$\\dfrac{${base}^${exp[0]}\\times ${base**3}}{${base}^${exp[1]}}`;
					texte_corr += ` = \\dfrac{${base}^${exp[0]}\\times ${base}^3}{${base}^${exp[1]}}`;
					texte_corr += ` = \\dfrac{${base}^{${exp[0]}+3}}{${base}^${exp[1]}}`;
					texte_corr += ` = \\dfrac{${base}^{${exp[0]+3}}}{${base}^${exp[1]}}`;
					texte_corr += ` = ${base}^{${exp[0]+3}-${exp[1]}}`;
					texte_corr += ` = ${base}^{${exp[0]+3-exp[1]}}`;
					// on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
					texte_corr += testExp(base,exp[0]+3-exp[1]);
					break;
				case 3 :
					base = 5; // on travaille sur cette base mais on pourrait rendre la base aléatoire
					exp = [randint(1,7,[1]),randint(1,2)]; // on a besoin de 2 exposants distincts
					// le second exposant ne peut valoir que 1 ou 2 la fonction testExp ne convient pas à l'affichage ici					
					if (exp[1]==2) {
						texte = `$\\dfrac{${base}\\times ${base}^${exp[0]}}{${base**2}^${exp[1]}}$`;
						texte_corr = `$\\dfrac{${base}\\times ${base}^${exp[0]}}{${base**2}^${exp[1]}}`;
						texte_corr += `=\\dfrac{${base}^{1+${exp[0]}}}{(${base}^2)^${exp[1]}}`;
						texte_corr += `=\\dfrac{${base}^{1+${exp[0]}}}{${base}^{2 \\times ${exp[1]}}}`;
						texte_corr += `=\\dfrac{${base}^{${1+exp[0]}}}{${base}^{${2*exp[1]}}}`;
					} else {						
						texte = `$\\dfrac{${base}\\times ${base}^${exp[0]}}{${base**2}}$`;
						texte_corr = `$\\dfrac{${base}\\times ${base}^${exp[0]}}{${base**2}}`;
						texte_corr += `=\\dfrac{${base}^{1+${exp[0]}}}{${base}^2}`;
					};
					texte_corr += `=${base}^{${1+exp[0]}-${2*exp[1]}}`;
					texte_corr += `=${base}^{${1+exp[0]-2*exp[1]}}`;
					// on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
					texte_corr += testExp(base,1+exp[0]-2*exp[1]);
					break;
				case 4 :
					base = 2; // on travaille sur cette base mais on pourrait rendre la base aléatoire
					exp = [randint(1,7,[1])]; // on a besoin de 1 exposant
					texte = `$\\dfrac{${base}\\times ${base}^${exp[0]}}{${base**2}\\times ${base**2}}$`;
					texte_corr = `$\\dfrac{${base}\\times ${base}^${exp[0]}}{${base**2}\\times ${base**2}}`;
					texte_corr += `=\\dfrac{${base}^{1+${exp[0]}}}{${base}^2\\times ${base}^2}`;
					texte_corr += `=\\dfrac{${base}^{${1+exp[0]}}}{${base}^{2+2}}`;
					texte_corr += `=\\dfrac{${base}^{${1+exp[0]}}}{${base}^{${2+2}}}`;
					texte_corr += `=${base}^{${1+exp[0]}-${2+2}}`;					
					texte_corr += `=${base}^{${1+exp[0]-2-2}}`;
					// on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
					texte_corr += testExp(base,1+exp[0]-2-2);
					break;
				case 5 :
					base = 2; // on travaille sur cette base mais on pourrait rendre la base aléatoire
					exp = [randint(1,7,[1])]; // on a besoin de 1 exposant
					texte = `$\\dfrac{${base**2}^${exp[0]}}{${base}}$`;
					texte_corr = `$\\dfrac{${base**2}^${exp[0]}}{${base}}`;
					texte_corr += `=\\dfrac{(${base}^2)^${exp[0]}}{${base}}`;
					texte_corr += `=\\dfrac{${base}^{2\\times ${exp[0]}}}{${base}}`;
					texte_corr += `=\\dfrac{${base}^{${2*exp[0]}}}{${base}}`;
					texte_corr += `=${base}^{${2*exp[0]}-1}`;					
					texte_corr += `=${base}^{${2*exp[0]-1}}$`;
					// Inutile de tester l'exposant final car il vaut au minimum 3
					// texte_corr += testExp(base,2*exp[0]-1);
					break;
				case 6 :
					base = 3; // on travaille sur cette base mais on pourrait rendre la base aléatoire
					exp = [randint(1,3,[1])]; // on a besoin de 1 exposant
					texte = `$\\dfrac{${base**3}^${exp[0]}}{${base}}$`;
					texte_corr = `$\\dfrac{${base**3}^${exp[0]}}{${base}}`;
					texte_corr += `=\\dfrac{(${base}^3)^${exp[0]}}{${base}}`;
					texte_corr += `=\\dfrac{${base}^{3\\times ${exp[0]}}}{${base}}`;
					texte_corr += `=\\dfrac{${base}^{${3*exp[0]}}}{${base}}`;
					texte_corr += `=${base}^{${3*exp[0]}-1}`;
					texte_corr += `=${base}^{${3*exp[0]-1}}$`;
					// inutile de tester l'exposant final car il vaut au minimum 5 
					// texte_corr += testExp(base,3*exp[0]-1);
					break;
				case 7 :
					base = 3; // on travaille sur cette base mais on pourrait rendre la base aléatoire
					exp = [randint(1,7,[1]),randint(1,7,[1]),randint(1,4,[1])]; // on a besoin de 3 exposants distincts
					texte = `$\\dfrac{${base}^${exp[0]}\\times ${base}^${exp[1]}}{${base**2}^${exp[2]}}\\times ${base}$`;
					texte_corr = `$\\dfrac{${base}^${exp[0]}\\times ${base}^${exp[1]}}{${base**2}^${exp[2]}}\\times ${base}`;
					texte_corr += `=\\dfrac{${base}^{${exp[0]}+${exp[1]}}}{(${base}^2)^${exp[2]}}\\times ${base}`;
					texte_corr += `=\\dfrac{${base}^{${exp[0]+exp[1]}}}{${base}^{2\\times ${exp[2]}}}\\times ${base}`;
					texte_corr += `=\\dfrac{${base}^{${exp[0]+exp[1]}}}{${base}^{${2*exp[2]}}}\\times ${base}`;
					texte_corr += `=\\dfrac{${base}^{${exp[0]+exp[1]}}\\times ${base}}{${base}^{${2*exp[2]}}}`;
					texte_corr += `=\\dfrac{${base}^{${exp[0]+exp[1]}+1}}{${base}^{${2*exp[2]}}}`;
					texte_corr += `=\\dfrac{${base}^{${exp[0]+exp[1]+1}}}{${base}^{${2*exp[2]}}}`;
					texte_corr += `=${base}^{${exp[0]+exp[1]+1}-${2*exp[2]}}`;					
					texte_corr += `=${base}^{${exp[0]+exp[1]+1-2*exp[2]}}`;
					// on ne teste l'exposant que pour la sortie puisque l'exposant est évincé
					texte_corr += testExp(base, exp[0]+exp[1]+1-2*exp[2]);
					break;
				case 8 :
					base = 2; // on travaille sur cette base mais on pourrait rendre la base aléatoire
					exp = [randint(1,7,[1])]; // on a besoin de 1 exposant
					texte = `$\\dfrac{${base**3}\\times ${base}}{${base**2}^${exp[0]}}$`;
					texte_corr = `$\\dfrac{${base**3}\\times ${base}}{${base**2}^${exp[0]}}`;
					texte_corr += `=\\dfrac{${base}^3\\times ${base}}{(${base}^2)^${exp[0]}}`;
					texte_corr += `=\\dfrac{${base}^{3+1}}{${base}^{2\\times${exp[0]}}}`;
					texte_corr += `=\\dfrac{${base}^{4}}{${base}^{${2*exp[0]}}}`;
					texte_corr += `=${base}^{4-${2*exp[0]}}`;
					texte_corr += `=${base}^{${3+1-2*exp[0]}}`;
					// on ne teste l'exposant que pour la sortie puisque l'exposant est évincé
					texte_corr += testExp(base,3+1-2*exp[0]);
					break;
																
			};
			

		
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++
		}
		liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
	}
	
}