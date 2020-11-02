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
  //this.correction_detaillee_disponible = true;
  //sortie_html ? correction_detaillee = true : correction_detaillee = false ;

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let liste_types_equations = combinaison_listes(["0solution","1solution","2solutions"],this.nb_questions)
    for (let i = 0, texte, texte_corr, a, b, c, delta, x1, x2, y1, y2, cpt = 0;i < this.nb_questions && cpt < 50;) {
      let a_nb_points_intersection
      switch (liste_types_equations[i]) {
        case "0solution": 
          a_nb_points_intersection = "n'a aucun point d'intersection"
          k = randint(1,5);
          x1 = randint(-3,3,[0]);
          y1 = randint(1,5);
          if (choice(['+','-'])=='+') { // k(x-x1)^2 + y1 avec k>0 et y1>0
            a = k;
            b = -2 * k * x1;
            c = k * x1 * x1 + y1;
          } else { // -k(x-x1)^2 -y1 avec k>0 et y1>0
            a = -k;
            b = 2 * k * x1;
            c = - k * x1 * x1 - y1
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
          a_nb_points_intersection = "n'a qu'un seul point d'intersection"
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
          a_nb_points_intersection = "a deux points d'intersection"
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
      if (sortie_html){
        let f = x => a * x**2 + b * x + c
        let graphique = courbe(f)
        graphique.color = 'blue';
        let s = segment(point(-10,0),point(10,0));
        s.epaisseur = 3;
        s.color = 'red';
        let r = repere2({afficheLabels:false,xLabelListe:[],yLabelListe:[]})
        let correction_complementaire = `Notons $f : x \\mapsto ${rien_si_1(a)}x^2${ecriture_algebrique_sauf1(b)}x${ecriture_algebrique_sauf1(c)}$.`
        correction_complementaire+= `<br>On observe que la courbe représentative de $f$ ${a_nb_points_intersection} avec l'axe des abscisses.`
        correction_complementaire+='<br>'
        correction_complementaire+= mathalea2d({xmin : -10.1, ymin : -10.1, xmax : 10.1, ymax : 10.1 , pixelsParCm : 15},
          graphique,r,s) 
        
        texte_corr += modal_texte_long(numero_de_l_exercice,'Complément graphique',correction_complementaire,label_bouton="Complément graphique",icone="info circle")
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
  this.spacing_corr = 3;
  this.sup = 1;

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let liste_type_de_questions
    if (this.sup == 1) {
      liste_type_de_questions = combinaison_listes(['solutionsEntieres','solutionsEntieres','solutionDouble','pasDeSolution'],this.nb_questions)
    }
    if (this.sup == 2) {
      liste_type_de_questions = combinaison_listes(['factorisationParx','pasDeSolution','ax2+c','solutionsReelles','solutionDouble'],this.nb_questions)
    }
    for (let i = 0, texte, texte_corr, a, b, c, delta, x1, x2, y1, y2, k, cpt = 0;i < this.nb_questions && cpt < 50;) {
      if (liste_type_de_questions[i]=="solutionsEntieres"){
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
        texte_corr += `<br>L'ensemble des solutions de cette équation est : $\\mathcal{S}=\\left\\{${x1} ; ${x2}\\right\\}$.`  
      }
      if (liste_type_de_questions[i]=="solutionDouble"){
        // (dx+e)^2=d^2x^2+2dex+e^2
        let d = randint(-11,11,[-1,1,0])
        let e = randint(-11,11,[0,-1,1])
        a = d*d;
        b = 2*d*e;
        c = e*e
        texte = `$${rien_si_1(a)}x^2${ecriture_algebrique_sauf1(b)}x${ecriture_algebrique(c)}=0$`
        
        texte_corr = `Il est possible de factoriser le membre de gauche : $(${d}x${ecriture_algebrique(e)})^2=0$. `
        texte_corr += `On a alors une solution double : $${tex_fraction_signe(-e,d)}`
        if (e%d==0){
          texte_corr += `=${-e/d}$.`
        } else {
          texte_corr +='$.'
        }
        texte_corr += `<br> Si on ne voit pas cette factorisation, on peut utiliser le discriminant.`
        texte_corr += `<br>$\\Delta = ${ecriture_parenthese_si_negatif(b)}^2-4\\times${ecriture_parenthese_si_negatif(a)}\\times${ecriture_parenthese_si_negatif(c)}=${b*b-4*a*c}$`
        texte_corr += `<br>$\\Delta=0$ donc l'équation admet une unique solution : $${tex_fraction('-b','2a')} = ${tex_fraction_reduite(-b,2*a)}$`
        if (b%(2*a)==0){
          texte_corr += `<br>L'ensemble des solutions de cette équation est : $\\mathcal{S}=\\left\\{${-b/(2*a)}\\right\\}$.`  
        } else {
          texte_corr += `<br>L'ensemble des solutions de cette équation est : $\\mathcal{S}=\\left\\{${tex_fraction_reduite(-b,2*a)}\\right\\}$.`  
        }
      }
      if (liste_type_de_questions[i]=="solutionsReelles"){
        // ax^2+bx+c
        a = randint(-11,11,0);
        b = randint(-11,11,0);
        c = randint(-11,11,0);
        while (b**2-4*a*c<0 || [1,4,9,16,25,36,49,64,81,100,121,144,169,196,225,256,289,324,361,400,441,484,529,576,625,676,729,784,841,900,961,1024,1089].includes(b**2-4*a*c)){
          a = randint(-11,11,0);
          b = randint(-11,11,0);
          c = randint(-11,11,0);
        }
        texte = `$${rien_si_1(a)}x^2${ecriture_algebrique_sauf1(b)}x${ecriture_algebrique(c)}=0$`
        
        texte_corr = `$\\Delta = ${ecriture_parenthese_si_negatif(b)}^2-4\\times${ecriture_parenthese_si_negatif(a)}\\times${ecriture_parenthese_si_negatif(c)}=${b*b-4*a*c}$`
        texte_corr += `<br>$\\Delta>0$ donc l'équation admet deux solutions : $x_1 = \\dfrac{-b-\\sqrt{\\Delta}}{2a}$ et $x_2 = \\dfrac{-b+\\sqrt{\\Delta}}{2a}$`
        texte_corr += `<br>$x_1 =\\dfrac{${-b}-\\sqrt{${b*b-4*a*c}}}{${2*a}}\\approx ${arrondi_virgule((-b-Math.sqrt(b**2-4*a*c))/(2*a),2)}$`
        texte_corr += `<br>$x_2 =\\dfrac{${-b}+\\sqrt{${b*b-4*a*c}}}{${2*a}}\\approx ${arrondi_virgule((-b+Math.sqrt(b**2-4*a*c))/(2*a),2)}$`
        texte_corr += `<br>L'ensemble des solutions de cette équation est : $\\mathcal{S}=\\left\\{\\dfrac{${-b}-\\sqrt{${b*b-4*a*c}}}{${2*a}} ; \\dfrac{${-b}+\\sqrt{${b*b-4*a*c}}}{${2*a}}\\right\\}$.`  
      }
      if (liste_type_de_questions[i]=="factorisationParx"){
        // x(ax+b)=ax^2+bx
        a = randint(-11,11,[0,-1,1]);
        b = randint(-11,11,0)
        texte = `$${rien_si_1(a)}x^2${ecriture_algebrique_sauf1(b)}x=0$`
        
        texte_corr = `On peut factoriser le membre de gauche par $x$.`
        texte_corr += `<br>$x(${rien_si_1(a)}x${ecriture_algebrique(b)})=0$`
        texte_corr += `<br>Si un produit est nul alors l'un au moins de ses facteurs est nul.`
        texte_corr += `<br>$x=0\\quad$ ou $\\quad${rien_si_1(a)}x${ecriture_algebrique(b)}=0$`
        texte_corr += `<br>$x=0\\quad$ ou $\\quad x=${tex_fraction_signe(-b,a)}$`
        texte_corr += `<br>L'ensemble des solutions de cette équation est : $\\mathcal{S}=\\left\\{0 ; ${tex_fraction_reduite(-b,a)}\\right\\}$.`  
      }
      if (liste_type_de_questions[i]=="ax2+c"){
        // x(ax+b)=ax^2+bx
        a = randint(-11,11,0);
        c = randint(-11,11,0)
        texte = `$${rien_si_1(a)}x^2${ecriture_algebrique(c)}=0$`
        
        texte_corr = `Il est possible de résoudre cette équation sans effectuer le calcul du discriminant.`
        texte_corr += `<br> $x^2=${tex_fraction_signe(-c,a)}$`
        if (-c/a>0){
          if ([1,4,9,16,25,36,49,64,81,100,121,144,169,196,225,256,289,324,361,400,441,484,529,576,625,676,729,784,841,900,961,1024,1089].includes(-c/a)){
            texte_corr += `<br>$x=\\sqrt{${tex_fraction_reduite(-c,a)}}=${Math.sqrt(-c/a)}\\quad$ ou $\\quad x=-\\sqrt{${tex_fraction_reduite(-c,a)}}=${-Math.sqrt(-c/a)}$`
            texte_corr += `<br><br>L'ensemble des solutions de cette équation est : $\\mathcal{S}=\\left\\{${Math.sqrt(-c/a)} ; ${-Math.sqrt(-c/a)}\\right\\}$.`  
          } 
          else if (-c%a == 0){
            texte_corr += `<br>$x=\\sqrt{${-c/a}}\\quad$ ou $\\quad x=-\\sqrt{${-c/a}}$`
            texte_corr += `<br><br>L'ensemble des solutions de cette équation est : $\\mathcal{S}=\\left\\{\\sqrt{${-c/a}} ; -\\sqrt{${-c/a}}\\right\\}$.`  
          }else {
            texte_corr += `<br>$x=\\sqrt{${tex_fraction_reduite(-c,a)}}\\quad$ ou $\\quad x=-\\sqrt{${tex_fraction_reduite(-c,a)}}$`
            texte_corr += `<br><br>L'ensemble des solutions de cette équation est : $\\mathcal{S}=\\left\\{\\sqrt{${tex_fraction_reduite(-c,a)}} ; -\\sqrt{${tex_fraction_reduite(-c,a)}}\\right\\}$.`  
          }
        } else {
          texte_corr += `<br>Dans $\\mathbb{R}$, un carré est toujours positif donc cette équation n'a pas de solution.`
          texte_corr += `<br>$\\mathcal{S}=\\emptyset$`
        }
      }
      if (liste_type_de_questions[i]=="pasDeSolution") {
          k = randint(1,5);
          x1 = randint(-3,3,[0]);
          y1 = randint(1,5);
          if (choice(['+','-'])=='+') { // k(x-x1)^2 + y1 avec k>0 et y1>0
            a = k;
            b = -2 * k * x1;
            c = k * x1 * x1 + y1;
          } else { // -k(x-x1)^2 -y1 avec k>0 et y1>0
            a = -k;
            b = 2 * k * x1;
            c = - k * x1 * x1 - y1
          }
          texte = `$${rien_si_1(a)}x^2${ecriture_algebrique_sauf1(b)}x${ecriture_algebrique(c)}=0$`
          if (b == 0) {
            texte = `$${rien_si_1(a)}x^2${ecriture_algebrique(c)}=0$`
          }
          texte_corr = `$\\Delta = ${ecriture_parenthese_si_negatif(b)}^2-4\\times${ecriture_parenthese_si_negatif(a)}\\times${ecriture_parenthese_si_negatif(c)}=${b*b-4*a*c}$`
          texte_corr += `<br>$\\Delta<0$ donc l'équation n'admet pas de solution.`
          texte_corr += `<br>$\\mathcal{S}=\\emptyset$`
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
  this.besoin_formulaire_numerique = ['Niveau de difficulté',2,"1 : Solutions entières\n2 : Solutions réelles et calcul du discriminant non obligatoire"];
}
/**
 * @Auteur Jean-Claude Lhote
 * Trois type de questions proposées :
 * 1) passant par trois dont deux d'abscisses opposées et le troisième d'abscisse 0 (pour simplifier la résolution du système)
 * 2) Passant par un point et dont on connait le sommet
 * 3) connaissant les deux racines et un autre point de passage à coordonnées entières
 * référence 1E12
 */
function Trouver_equation_parabole() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Trouver l'équation d'une parabole";
  this.consigne = "Trouver l'expression de la fonction f.";
  this.nb_questions = 5;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;
  this.spacing_corr = 3;
  this.sup = 4;
  this.correction_detaillee_disponible=true

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let liste_type_de_questions,type_de_questions_disponibles;
    if (this.sup<4) type_de_questions_disponibles=[parseInt(this.sup)]
    else type_de_questions_disponibles=[1,2,2,3,3]
    let f_name=[]
    liste_type_de_questions=combinaison_listes(type_de_questions_disponibles,this.nb_questions)
    for (let i = 0, texte, texte_corr, a, b, c, x1, x2,x3,f,r, cpt = 0;i < this.nb_questions && cpt < 50;) {
      f_name.push(lettre_minuscule_depuis_chiffre(i+6))
      texte = `Quelle est l'expression de la fonction polynomiale $\\mathscr{${f_name[i]}}$ du second degré `
      texte_corr=``
      switch (liste_type_de_questions[i]) {
          case 1 : // passe par 3 points à coordonnées entières dont -x1, 0 et x1.
          a=randint(-4,4,0)
          b=randint(-6,6,0)
          c=randint(-10,10,0)
          x1=randint(1,5)
          x2=randint(-5,5,x1)
          x3=randint(-5,5,[x1,x2])
           f = function(x) {
            return calcul(a*x**2+b*x+c)
          }
          texte+=`qui passe par les points de coordonnées $(${-x1};${f(-x1)})$, $(0;${f(0)})$ et $(${x1};${f(x1)})$ ?<br>`
          texte_corr=`Soit $\\mathscr{${f_name[i]}}(x)=ax^2+bx+c$ , l'expression de la fonction cherchée, comme $\\mathscr{${f_name[i]}}(0)=${f(0)}$ nous en déduisons que $c=${mise_en_evidence(f(0),'red')}$.<br>`
          texte_corr+=`Donc $\\mathscr{${f_name[i]}}(x)=ax^2+bx${mise_en_evidence(ecriture_algebrique(f(0)),'red')}$.<br>`
          texte_corr+=`En substituant dans cette expression les valeurs de l'énoncé, nous obtenons :<br>`
          texte_corr+=`$\\begin{cases}
          ${f(x1)}=a\\times${x1}^2+b\\times${x1}${ecriture_algebrique(f(0))}=${Algebrite.eval(ecriture_algebrique_sauf1(x1**2)+'a'+ecriture_algebrique_sauf1(x1)+'b'+ecriture_algebrique(f(0)))} \\\\
          ${f(-x1)}=a\\times(${-x1})^2+b\\times(${-x1})${ecriture_algebrique(f(0))}=${Algebrite.eval(ecriture_algebrique_sauf1(x1**2)+'a'+ecriture_algebrique_sauf1(-x1)+'b'+ecriture_algebrique(f(0)))}
       \\end{cases}$<br>`
          if (this.correction_detaillee) {
            texte_corr+=`Ce qui équivaut à <br>$\\begin{cases}
               ${f(x1)}${ecriture_algebrique(-f(0))}=${f(x1)-f(0)}=${Algebrite.eval(ecriture_algebrique_sauf1(x1**2)+'a' + ecriture_algebrique_sauf1(x1)+'b')} \\\\
               ${f(-x1)}${ecriture_algebrique(-f(0))}=${f(-x1)-f(0)}=${Algebrite.eval(ecriture_algebrique_sauf1(x1**2)+'a'+ecriture_algebrique_sauf1(-x1)+'b')}
             \\end{cases}$<br>`
             texte_corr+=`En ajoutant et en soustrayant les équations membre à membre, on obtient :<br>
              $\\begin{cases}
              ${f(x1)+f(-x1)-2*f(0)}=${2*x1**2}a \\\\
              ${f(x1)-f(-x1)}=${2*x1}b
           \\end{cases}$<br>`
          }
       texte_corr+=`La résolution de ce système donne $a=${mise_en_evidence(tex_nombre(a),'blue')}$ et $b=${mise_en_evidence(tex_nombre(b),'green')}$.<br>`
       texte_corr+=`D'où $\\mathscr{${f_name[i]}}(x)=${mise_en_evidence(ecriture_algebrique_sauf1(a),'blue')}x^2 ${mise_en_evidence(ecriture_algebrique_sauf1(b),'green')}x  ${mise_en_evidence(ecriture_algebrique(c),'red')}$<br>`
 
          break;
        case 2 : // Passant par le sommet (x1,y1) et par le point (x2,y2)
        a=randint(-3,3,0)
        b=randint(-3,3,0)*2*a
        c=randint(-10,10)
        x1=calcul(-b/(2*a))
        x2=randint(-5,5,x1)
        x3=randint(-5,5,[x1,x2])

       f = function(x) {
        return calcul(a*x**2+b*x+c)
      }
          texte+=`dont la parabole a pour sommet le point de coordonnées $(${x1};${f(x1)})$ et passe par le point de coordonnées $(${x2};${f(x2)})$ ?<br>`;
          texte_corr=`D'après les coordonnées $(${x1};${f(x1)})$ du sommet, $\\mathscr{${f_name[i]}}$ a pour forme canonique : $\\mathscr{${f_name[i]}}(x)=a(x${ecriture_algebrique(-x1)})^2${ecriture_algebrique(f(x1))}$.<br>`
  //       texte_corr+=`$=${Algebrite.eval('ax^2'+ecriture_algebrique(-2*x1)+'ax'+ecriture_algebrique(x1**2)+'a'+ecriture_algebrique(f(x1)))}$<br>`
          texte_corr+=`De plus $\\mathscr{${f_name[i]}}(${x2})=${f(x2)}$`
          if (this.correction_detaillee) {
            texte_corr+=` donc $a(${x2}${ecriture_algebrique(-x1)})^2${ecriture_algebrique(f(x1))}=${f(x2)}$ `
            texte_corr+=`soit $${Algebrite.eval(x2**2+'a'+ecriture_algebrique(-2*x1*x2)+'a'+ecriture_algebrique(x1**2)+'a'+ecriture_algebrique(f(x1)))}=${f(x2)}$.<br>`
          if (x2**2-2*x1*x2+x1**2!=1)
            texte_corr+=`On en déduit que $a=\\dfrac{${f(x2)}${ecriture_algebrique(-f(x1))}}{${(x2**2-2*x1*x2+x1**2)}}=${a}$.<br>`
          else
            texte_corr+=`On en déduit que $a=${f(x2)}${ecriture_algebrique(-f(x1))}=${a}$.<br>`
          }
          else texte_corr+=` donc $a=${a}$.<br>`
          if (this.correction_detaillee) {
            texte_corr+=`Développons la forme canonique : $\\mathscr{${f_name[i]}}(x)=
            a(x${ecriture_algebrique(-x1)})^2${ecriture_algebrique(f(x1))}=
            a(x^2${mise_en_evidence(ecriture_algebrique(-2*x1),'green')}x+${mise_en_evidence(tex_nombrec(x1**2),'red')})${mise_en_evidence(ecriture_algebrique(f(x1)),'red')}
            =${mise_en_evidence('a','blue')}x^2${mise_en_evidence(ecriture_algebrique(-2*x1)+'a','green')}x${mise_en_evidence(ecriture_algebrique_sauf1(x1**2)+'a'+ecriture_algebrique(f(x1)),'red')}$.<br>`
          }
          texte_corr+=`En remplaçant $a$ par sa valeur $${a}$ dans l'expression canonique développée $${mise_en_evidence('a','blue')}x^2${mise_en_evidence(ecriture_algebrique(-2*x1)+'a','green')}x${mise_en_evidence(ecriture_algebrique_sauf1(x1**2)+'a'+ecriture_algebrique(f(x1)),'red')}$ on obtient :<br>`
          texte_corr+=`$\\mathscr{${f_name[i]}}(x)=${mise_en_evidence(rien_si_1(a),'blue')}x^2${mise_en_evidence(ecriture_algebrique_sauf1(b),'green')}x${mise_en_evidence(ecriture_algebrique(c),'red')}$`
           break;
        case 3: // on a deux racines x1 et x2 et un troisième point (x3;f(x3))
        x1=randint(-6,-1)
        x2=randint(1,6,-x1)
        x3=randint(-5,5,[x1,x2])
        a=randint(-4,4,0)
        b=calcul(-a*(x1+x2))
        c=a*x1*x2
        f = function(x) {
          return calcul(a*x**2+b*x+c)
        }
             texte+=`qui s'annule en $x=${x1}$ et en $x=${x2}$ et dont la parabole passe par le point de coordonnées $(${x3};${f(x3)})$ ?<br>`
          texte_corr+=`Comme $${x1}$ et $${x2}$ sont les deux solutions de l'équation $\\mathscr{${f_name[i]}}(x)=0$, on peut factoriser $\\mathscr{${f_name[i]}}(x)$ :<br>`
          texte_corr+=`$\\mathscr{${f_name[i]}}(x)=a(x${ecriture_algebrique(-x1)})(x${ecriture_algebrique(-x2)})$.<br>`
          texte_corr+=`Comme $\\mathscr{${f_name[i]}}(${x3})=${f(x3)}$, on en déduit que `
          if (this.correction_detaillee) {
            texte_corr+=`$${f(x3)}=a(${x3}${ecriture_algebrique(-x1)})(${x3}${ecriture_algebrique(-x2)})$ `
            texte_corr+=`d'où $a=${f(x3)}\\div ${ecriture_parenthese_si_negatif((x3-x1)*(x3-x2))}=${a}$.<br>`
          }
          else texte_corr+=`$a=${a}$.<br>`
          texte_corr+=`On obtient ainsi $\\mathscr{${f_name[i]}}(x)=${rien_si_1(a)}(x${ecriture_algebrique(-x1)})(x${ecriture_algebrique(-x2)})$ ou en développant $\\mathscr{${f_name[i]}}(x)=${Algebrite.eval(`${ecriture_algebrique_sauf1(a)}x^2 ${ecriture_algebrique_sauf1(b)}x  ${ecriture_algebrique(c)}`)}$`
          break;

      }
      if (a<0) {
        Ymax=Math.ceil(f(-b/(2*a))+2)
        Ymin=Math.min(f(x1),f(x2),f(x3),f(-x1),f(0),f(-6),f(6))
      }
      else {
        Ymin=Math.floor(f(-b/(2*a))-2)
        Ymax=Math.max(f(x1),f(x2),f(x3),f(-x1),f(0),f(-6),f(6))
      }

      if (Ymax-Ymin<10) Yscale=2
      else Yscale =Math.max(1,calcul(Math.round(Math.ceil((Ymax-Ymin)/10)/5)*5))*2
/*      if (Ymin>=0) Ymin=-Yscale
        else Ymin=-premierMultipleSuperieur(Yscale,-Ymin)
      if (Ymax<=0) Ymax=Yscale
         else Ymax=premierMultipleSuperieur(Yscale,Ymax)
*/    

      r = repere({
        xmin: -10,
        ymin: Ymin-Yscale,
        ymax: Ymax+Yscale,
        xmax: 10,
        xscale: 1,
        yscale:Yscale,
        positionLabelY:-0.8
      })

      svgYmin=Math.min(calcul(Ymin/Yscale),-1)
      svgYmax=Math.max(calcul(Ymax/Yscale),1)
      F = x => a*x**2+b*x+c;
      texte+=mathalea2d({xmin:-10, xmax:11,ymin:svgYmin,ymax:svgYmax+2,scale:.6},courbe(F,-10,10,'blue',1.5,r),r)
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
  this.besoin_formulaire_numerique = ['Type de questions ',4,"1 : Passant par trois points à coordonnées entières 1\n2 : Connaissant le sommet et un point de passage\n3 : Connaissant les deux racines et un point de passage\n4 : Mélange des trois type de questions"];
}