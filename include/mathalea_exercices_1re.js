/**
 * 1N10
 * @Auteur Gaelle Morvan
 */
function Terme_d_une_suite_definie_explicitement(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Déterminer les termes d'une suite définie de façon explicite";
	this.consigne = "Une suite étant donnée, calculer le terme demandé.";
	this.nb_questions = 4;

	this.nouvelle_version = function(){
		this.liste_questions = []; // Vide la liste de questions
    this.liste_corrections = []; // Vide la liste de questions corrigées
    
    let type_de_questions_disponibles = [1, 2, 3];
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

    for (
      let i = 0, texte, texte_corr, cpt = 0, a, b, c, d, k;
      i < this.nb_questions && cpt < 50;

      ) {
      switch (liste_type_de_questions[i]) {
        case 1: //fonction affine
          a = randint(1, 7)*choice([-1,1]);
          b = randint(1, 10)*choice([-1,1]);
          k = randint(0, 20);
			
          texte = `Soit $(u_n)$ une suite définie pour tout entier $n\\in\\mathbb{N}$ par $u_n = `;
          if (a == 1) {texte += `n`}
          else 
            if (a == -1) {texte += `-n`}
            else {texte += `${a}n`};

          if (b > 0) {texte += `+${b}$.`} 
          else {texte += `${b}$.`};
          texte += `<br>Calculer $u_{${k}}$.`;
			
          texte_corr = `Dans l'expression de $u_n$ on remplace $n$ par ${k}, on obtient : $u_{${k}} =`;
          if (a == 1) {
            texte_corr += `${k} ${ecriture_algebrique(b)}`
          } else {
            if (a == -1) {
              texte_corr += `-${k} ${ecriture_algebrique(b)}`
            } else {
              texte_corr += `${a} \\times ${k} ${ecriture_algebrique(b)}`
            }
          }
          texte_corr += `=${a*k+b}$.`;
          break;
        
        case 2: //fonction polynome de degré 2
          a = randint(1,5)*choice([-1,1]);
          b = randint(0,5)*choice([-1,1]);
          c = randint(0,9)*choice([-1,1]);
          k = randint(0,9);

          texte = `Soit $(u_n)$ une suite définie pour tout entier $n\\in\\mathbb{N}$ par $u_n = `;
          if (a == 1) {
            texte += `n^2$`
          } else {
            if (a == -1) {
              texte += `-n^2$`
            } else {
              texte += `${a}n^2$`
            }
          };
          if (b == 1) {texte += `$+n$`};
          if (b > 1) {texte += `$+${b}n$`};
          if (b == -1) {texte += `$-n$`};
          if (b < -1) {texte += `$${b}n$`};
          if (c > 0) {texte += `$+${c}$.`};
          if (c < 0) {texte += `$${c}$.`}
          texte += `<br>Calculer $u_{${k}}$.`;
			
          texte_corr = `Dans l'expression de $u_n$ on remplace $n$ par $${k}$, on obtient : $u_{${k}} = `;
          if (a == 1) {texte_corr += `${k}^2`}
          else {
            if (a == -1) {texte_corr += `-${k}^2`} 
            else {
              texte_corr += `${a}\\times ${k}^2`
            }
          };
          if (b == 1) {
            texte_corr += `+${k}`
          } else {
            if (b == -1) {
              texte_corr += `-${k}`
            } else {
              texte_corr += `${ecriture_algebrique(b)}\\times ${k}`
            }            
          }
          texte_corr += `${ecriture_algebrique(c)}=${a*k*k+b*k+c}$.`;
          break;
        
        case 3: //fonction homographique
          a = randint(1,5)*choice([-1,1]);
          b = randint(1,5)*choice([-1,1]);
          c = randint(2,4);
          d = randint(1,7);
          k = randint(1,9);

          texte = `Soit $(u_n)$ une suite définie pour tout entier $n\\in\\mathbb{N}$ par $u_n = \\dfrac{`;
          if (a == 1) {texte += `n`}
          else 
            if (a == -1) {texte += `-n`}
            else {texte += `${a}n`};
          if (b > 0) {texte += `+${b}}{`}
          else {texte += `${b}}{`};
          if (c == 1) {texte += `n`}
          else   
            if (c == -1) {texte += `-n`}
            else {texte += `${c}n`};
          if (d > 0) {texte += `+${d}}$.`}
          else {texte += `${d}}$.`};
          
          texte += `<br>Calculer $u_{${k}}$.`;
          frac=fraction(a*k+b,c*k+d)
          texte_corr = `Dans l'expression de $u_n$ on remplace $n$ par $${k}$, on obtient : $u_{${k}} = \\dfrac{${a}\\times ${k} ${ecriture_algebrique(b)}}{${c}\\times ${k}
          ${ecriture_algebrique(d)}} = ` +frac.texFraction()
          if (pgcd(a*k+b,c*k+d)!=1) texte_corr+=`=`+frac.texFractionSimplifiee()
          texte_corr+=`$.`
          break;
      }
      
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte); // Sinon on enregistre la question dans liste_questions
				this.liste_corrections.push(texte_corr); // On fait pareil pour la correction
				i++; // On passe à la question suivante
			}
			cpt++;	// Sinon on incrémente le compteur d'essai pour avoir une question nouvelle
		}
		liste_de_question_to_contenu(this); // La liste de question et la liste de la correction
		// sont transformés en chaine de caractère (avec une liste HTML ou LaTeX suivant le contexte)
	}
	//this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
	// On aurait pu ajouter un formulaire pour régler le niveau de difficulté à l'aide de l'attribut this.sup
}


/**
 * 1N11
 * @Auteur Gaelle Morvan
 */
function Terme_d_une_suite_definie_par_recurrence(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Déterminer les termes d'une suite définie par récurrence";
	this.consigne = "Une suite étant donnée, calculer le terme demandé.";
	this.nb_questions = 4;

	this.nouvelle_version = function(){
		this.liste_questions = []; // Vide la liste de questions
    this.liste_corrections = []; // Vide la liste de questions corrigées
    
    let type_de_questions_disponibles = [1, 2, 3, 4];
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

    for (
      let i = 0, texte, texte_corr, cpt = 0, u, a, b, k;
      i < this.nb_questions && cpt < 50;

      ) {
      switch (liste_type_de_questions[i]) {
        case 1: //suite arithmétique
          a = randint(1, 10)*choice([-1,1]);
          u = randint(0, 10)*choice([-1,1]);
          k = randint(2, 10);
			
          texte = `Soit $(u_n)$ une suite définie par $u_0=${u}$ et pour tout entier $n\\in\\mathbb{N}$ par $u_{n+1} = u_n ${ecriture_algebrique(a)}$.`;

          texte += `<br>Calculer $u_{${k}}$.`;
			
          texte_corr = `On calcule successivent les termes jusqu'à obtenir $u_{${k}}$ :`;
          for (
            let indice =0; indice < k; indice++ 
          ){
            texte_corr += `<br> $u_{${indice+1}} = ${mise_en_evidence('u_{' + indice + '}', arcenciel(indice,true))} ${ecriture_algebrique(a)} = 
              ${mise_en_evidence(u, arcenciel(indice,true))} + ${a} = ${mise_en_evidence(u + a, arcenciel(indice+1,true))}$`;
            u = u + a;
          }
          break;
        
        case 2: //suite géométrique
          a = randint(2,5)*choice([-1,1]);
          u = randint(1,9)*choice([-1,1]);
          k = randint(2,6);

          texte = `Soit $(u_n)$ une suite définie par $u_0=${u}$ et pour tout entier $n\\in\\mathbb{N}$ par $u_{n+1} = u_n \\times ${ecriture_parenthese_si_negatif(a)}$.`;

          texte += `<br>Calculer $u_{${k}}$.`;
			
          texte_corr = `On calcule successivent les termes jusqu'à obtenir $u_${k}$ :`;
          for (
            let indice =0; indice < k; indice++ 
          ){
            texte_corr += `<br> $u_{${indice+1}} = ${mise_en_evidence('u_{' + indice + '}', arcenciel(indice,true))} \\times ${ecriture_parenthese_si_negatif(a)} = 
              ${mise_en_evidence(u, arcenciel(indice,true))} \\times ${ecriture_parenthese_si_negatif(a)} = ${mise_en_evidence(u * a, arcenciel(indice+1,true))}$`;
            u = u * a;
          }
          break;
        
        case 3: //suite arithmético-géométrique
          a = randint(2,5)*choice([-1,1]);
          b = randint(1,5)*choice([-1,1]);
          u = randint(1,5)*choice([-1,1]);
          k = randint(2,6);

          texte = `Soit $(u_n)$ une suite définie par $u_0=${u}$ et pour tout entier $n\\in\\mathbb{N}$ par $u_{n+1} = ${a} u_n ${ecriture_algebrique(b)}$.`;
          
          texte += `<br>Calculer $u_{${k}}$.`;
			
          texte_corr = `On calcule successivent les termes jusqu'à obtenir $u_${k}$ :`;
          for (
            let indice =0; indice < k; indice++ 
          ){
            texte_corr += `<br> $u_{${indice+1}} = ${a}\\times ${mise_en_evidence('u_{' + indice + '}', arcenciel(indice,true))} ${ecriture_algebrique(b)}=`;
            texte_corr += `${a} \\times ${ecriture_parenthese_si_negatif(mise_en_evidence(u, arcenciel(indice,true)))} ${ecriture_algebrique(b)} = 
            ${mise_en_evidence(a*u+b, arcenciel(indice+1,true))}$`;
            u = u * a + b;
          }
          break;

        case 4: // suite de la forme u(n+1) = a +- u(n)^2
          a = randint(1,5)*choice([-1,1]);
          b = choice([-1,1]);
          u = randint(1,5)*choice([-1,1]);
          k = randint(2,3);

          texte = `Soit $(u_n)$ une suite définie par $u_0=${u}$ et pour tout entier $n\\in\\mathbb{N}$ par $u_{n+1} = ${a} ${signe(b)} u_n^2$.`;
                    
          texte += `<br>Calculer $u_{${k}}$.`;
			
          texte_corr = `On calcule successivent les termes jusqu'à obtenir $u_${k}$ :`;
          for (
            let indice =0; indice < k; indice++ 
          ){
            texte_corr += `<br> $u_{${indice+1}} = ${a} ${signe(b)} (${mise_en_evidence('u_{' + indice + '}', arcenciel(indice,true))})^2=`;
            texte_corr += `${a} ${signe(b)} ${ecriture_parenthese_si_negatif(mise_en_evidence(u, arcenciel(indice,true)))}^2 = 
              ${mise_en_evidence(tex_nombre(a+b*u*u), arcenciel(indice+1,true))}$`;
            u = a + b * u * u;
          }
          break;
      }
      
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte); // Sinon on enregistre la question dans liste_questions
				this.liste_corrections.push(texte_corr); // On fait pareil pour la correction
				i++; // On passe à la question suivante
			}
			cpt++;	// Sinon on incrémente le compteur d'essai pour avoir une question nouvelle
		}
		liste_de_question_to_contenu(this); // La liste de question et la liste de la correction
		// sont transformés en chaine de caractère (avec une liste HTML ou LaTeX suivant le contexte)
	}
	//this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
	// On aurait pu ajouter un formulaire pour régler le niveau de difficulté à l'aide de l'attribut this.sup
}


/**
 * Calcul de discriminant pour identifier la forme graphique associée (0 solution dans IR, 1 ou 2)
 * @Auteur Rémi Angot
 * Référence 1E10
*/
function Calcul_discriminant() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Calcul du discriminant d'une équation du second degré";
  this.consigne = "Pour chaque équation, calculer le discriminant et déterminer le nombre de solutions de cette équation dans $\\mathbb{R}$.";
  this.nb_questions = 6;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;
  if (sortie_html) {
    this.spacing_corr = 2
  }

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let liste_types_equations = combinaison_listes(["0solution","1solution","2solutions"],this.nb_questions)
    for (let i = 0, texte, texte_corr, a, b, c, delta, x1, x2, y1, y2, cpt = 0;i < this.nb_questions && cpt < 50;) {
      switch (liste_types_equations[i]) {
        case "0solution": 
          k = randint(1,5);
          x1 = randint(-3,3);
          y1 = randint(1,5);
          if (choice(['+','-'])=='+') { // k(x-x1)^2 + y1 avec k>0 et y1>0
            a = k;
            b = -2 * k * x1;
            c = k * x1 * x1 + y1;
          } else { // -k(x-x1)^2 -y1 avec k>0 et y1>0
            a = -k;
            b = 2 * k * x1;
            c = - k * x1 * x1 + y1
          }
          texte = `$${rien_si_1(a)}x^2${ecriture_algebrique_sauf1(b)}x${ecriture_algebrique(c)}=0$`
          if (b == 0) {
            texte = `$${rien_si_1(a)}x^2${ecriture_algebrique(c)}=0$`
          }
          texte_corr = `$\\Delta = ${ecriture_parenthese_si_negatif(b)}^2-4\\times${ecriture_parenthese_si_negatif(a)}\\times${ecriture_parenthese_si_negatif(c)}=${b*b-4*a*c}$`
          texte_corr += `<br>$\\Delta<0$ donc l'équation n'admet pas de solution.`
          texte_corr += `<br>$\\mathcal{S}=\\emptyset$`
          break;
        case "1solution": // k(x-x1)^2
          k = randint(-5,5,[0]);
          x1 = randint(-5,5,[0]);
          a = k;
          b = -2 * k * x1;
          c = k * x1 * x1;
          texte = `$${rien_si_1(a)}x^2${ecriture_algebrique_sauf1(b)}x${ecriture_algebrique(c)}=0$`
          if (b == 0) {
            texte = `$${rien_si_1(a)}x^2${ecriture_algebrique(c)}=0$`
          }
          if (c == 0) {
            texte = `$${rien_si_1(a)}x^2${ecriture_algebrique_sauf1(b)}x=0$`
          }
          texte_corr = `$\\Delta = ${ecriture_parenthese_si_negatif(b)}^2-4\\times${ecriture_parenthese_si_negatif(a)}\\times${ecriture_parenthese_si_negatif(c)}=${b*b-4*a*c}$`
          texte_corr += `<br>$\\Delta=0$ donc l'équation admet une unique solution.`
          //texte_corr += `<br>$\\mathcal{S}={${x1}}$`
          break;
          case "2solutions": // k(x-x1)^2
          k = randint(1,5);
          x1 = randint(-3,3);
          y1 = randint(1,5);
          if (choice(['+','-'])=='+') { // k(x-x1)^2 + y1 avec k>0 et y1<0
            y1 *=-1;
            a = k;
            b = -2 * k * x1;
            c = k * x1 * x1 + y1;
          } else { // -k(x-x1)^2 -y1 avec k>0 et y1>0
            a = -k;
            b = 2 * k * x1;
            c = - k * x1 * x1 + y1
          }
          texte = `$${rien_si_1(a)}x^2${ecriture_algebrique_sauf1(b)}x${ecriture_algebrique(c)}=0$`
          if (b == 0) {
            texte = `$${rien_si_1(a)}x^2${ecriture_algebrique(c)}=0$`
          }
          if (c == 0) {
            texte = `$${rien_si_1(a)}x^2${ecriture_algebrique_sauf1(b)}x=0$`
          }
          texte_corr = `$\\Delta = ${ecriture_parenthese_si_negatif(b)}^2-4\\times${ecriture_parenthese_si_negatif(a)}\\times${ecriture_parenthese_si_negatif(c)}=${b*b-4*a*c}$`
          texte_corr += `<br>$\\Delta>0$ donc l'équation admet deux solutions.`
          //texte_corr += `<br>$\\mathcal{S}=\\emptyset$`
          break;
        default:
          break;
      }

      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  //this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}


/**
 * Calcul de discriminant pour identifier la forme graphique associée (0 solution dans IR, 1 ou 2)
 * @Auteur Rémi Angot
 * Référence 1E11
*/
function Resoudre_equation_degre_2() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Résoudre une équation du second degré";
  this.consigne = "Résoudre dans $\\mathbb{R}$ les équations suivantes.";
  this.nb_questions = 4;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;
  this.spacing_corr = 3

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    for (let i = 0, texte, texte_corr, a, b, c, delta, x1, x2, y1, y2, cpt = 0;i < this.nb_questions && cpt < 50;) {
      // k(x-x1)(x-x2)
      x1 = randint(-5,2,[0]);
      x2 = randint(x1+1,5,[0,-x1]);
      k = randint(-4,4,[0]);
      a = k;
      b = -k * x1 -k * x2;
      c = k * x1 * x2
      texte = `$${rien_si_1(a)}x^2${ecriture_algebrique_sauf1(b)}x${ecriture_algebrique(c)}=0$`
      
      texte_corr = `$\\Delta = ${ecriture_parenthese_si_negatif(b)}^2-4\\times${ecriture_parenthese_si_negatif(a)}\\times${ecriture_parenthese_si_negatif(c)}=${b*b-4*a*c}$`
      texte_corr += `<br>$\\Delta>0$ donc l'équation admet deux solutions : $x_1 = \\dfrac{-b-\\sqrt{\\Delta}}{2a}$ et $x_2 = \\dfrac{-b+\\sqrt{\\Delta}}{2a}$`
      texte_corr += `<br>$x_1 =\\dfrac{${-b}-\\sqrt{${b*b-4*a*c}}}{${2*a}}=${x1}$`
      texte_corr += `<br>$x_2 =\\dfrac{${-b}+\\sqrt{${b*b-4*a*c}}}{${2*a}}=${x2}$`
      texte_corr += `<br>L'ensemble des solutions de cette équation est : $\\mathcal{S}=\\{${x1} ; ${x2}\\}$.`  

      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  //this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}