/* auteur Stéphane Guyon*/


function valeur_absolue(){
Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Utiliser la notion de valeur absolue d'une quantité";
    this.consigne = "Déterminer la valeur du nombre proposé :"
    this.nb_questions = 5;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.sup = 1 ; // 

    this.nouvelle_version = function(numero_de_l_exercice){
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles = [1,2];
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) ;
    for (let i = 0, a,b,c,d,e, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) {
            type_de_questions = liste_type_de_questions[i];
    switch (type_de_questions){
                        // Cas par cas, on définit le type de nombres que l'on souhaite
                        // Combien de chiffres ? Quelles valeurs ?
            
                case 1 : 
        
                a = randint(1,150)*choice([-1,1]);
             
                    
                    texte = `$\\vert ${a}\\vert = \\dots$`;
                    if (a>0) {texte_corr = `$\\vert ${a}\\vert = ${a}$`;}
                    else {texte_corr = `$\\vert ${a}\\vert = ${-a}$`;}


                        
                    break ;
               case 2 : 
        
                a = randint(1,5);
             
                    
                    texte = `$\\vert \\pi - ${a}\\vert = \\dots$`;
                    if (a>3) {texte_corr = `On a : $\\pi - ${a}<0 $ donc $\\vert \\pi - ${a}\\vert = ${ a}-\\pi$`;}
                    else {texte_corr = `On a : $\\pi - ${a}>0 $ donc $\\vert \\pi - ${a}\\vert = \\pi - ${a }$`;}


                        
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
    
}
/* auteur Stéphane Guyon*/


function identites_remarquables_et_racine_carree(){
Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Développer les identités remarquables avec des racines carrées";
    this.consigne = "Effectuer les calculs suivants :"
    this.nb_questions = 5;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.sup = 1 ; // 

    this.nouvelle_version = function(numero_de_l_exercice){
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles = [1,2,3,4,5];
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) ;
    for (let i = 0, a,b,c,d,e, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) {
            type_de_questions = liste_type_de_questions[i];
    switch (type_de_questions){
                        // Cas par cas, on définit le type de nombres que l'on souhaite
                        // Combien de chiffres ? Quelles valeurs ?
            
                case 1 : 
        
                a = randint(2,6)*choice([-1,1]);
                b= randint(2,11,[4,8,9]);
                c = randint(2,6);
                    
                    texte = `$\\left(${a} \\sqrt{${b}} +${c}\\right)^{2}$`;
                    texte_corr = `$\\left(${a} \\sqrt{${b}} +${c}\\right)^{2}=
                    \\left(${a} \\sqrt{${b}} \\right)^{2}+2\\times ${ecriture_parenthese_si_negatif(a)}\\sqrt{${b}}\\times ${c}+${c}^{2}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\right)^{2}}=${ecriture_parenthese_si_negatif(a)}^{2}\\times ${b} ${ecriture_algebrique(2*a*c)}\\sqrt{${b}}+ ${c*c}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\right)^{2}}=${a*a*b}${ecriture_algebrique(2*a*c)}\\sqrt{${b}}+${c*c}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\right)^{2}}=${a*a*b+c*c}${ecriture_algebrique(2*a*c)}\\sqrt{${b}}$
                    `;


                        
                    break ;
                
            
                    
                case 2 : 

        
                a = randint(2,6)*choice([-1,1]);
                b= randint(2,11,[4,8,9]);
                c = randint(2,6);
                    
                    texte = `$\\left(${a} \\sqrt{${b}} -${c}\\right)^{2}$`;
                    texte_corr = `$\\left(${a} \\sqrt{${b}} -${c}\\right)^{2}=\\left(${a} \\sqrt{${b}} \\right)^{2}-2\\times ${ecriture_parenthese_si_negatif(a)}\\sqrt{${b}}\\times ${c}+${c}^{2}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\right)^{2}}=${ecriture_parenthese_si_negatif(a)}^{2}\\times ${b} ${ecriture_algebrique(-2*a*c)}\\sqrt{${b}}+ ${c*c}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\right)^{2}}=${a*a*b}${ecriture_algebrique(-2*a*c)}\\sqrt{${b}}+${c*c}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\right)^{2}}=${a*a*b+c*c}${ecriture_algebrique(-2*a*c)}\\sqrt{${b}}$

                    `;
                        break ;
            case 3 : 
                a = randint(2,6)*choice([-1,1]);
                b= randint(2,11,[4,8,9]);
                c = randint(2,6);
                    
                    texte = `$\\left(${a} \\sqrt{${b}} +${c}\\right)\\left(${a} \\sqrt{${b}}-${c}\\right)$`;
                    texte_corr = `$\\left(${a} \\sqrt{${b}} +${c}\\right)\\left(${a} \\sqrt{${b}}-${c}\\right)=\\left(${a} \\sqrt{${b}} \\right)^{2}-${c}^{2}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\right)\\left(${a} \\sqrt{${b}}-${c}\\right)}=${ecriture_parenthese_si_negatif(a)}^{2}\\times ${b}-${c*c}$<br>
                        $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\right)\\left(${a} \\sqrt{${b}}-${c}\\right)}=${a*a*b}-${c*c}$<br>
                        $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\right)\\left(${a} \\sqrt{${b}}-${c}\\right)}=${a*a*b-c*c}$
                    `;


                        
                    break ;
                case 4 : 
        
                a = randint(2,5)*choice([-1,1]);
                b= randint(3,11,[4,8,9]);
                c = randint(2,5);
                d= randint(3,11,[4,8,9,b,b*2,b*3,b*5]);
                    
                    texte = `$\\left(${a} \\sqrt{${b}} +${c}\\sqrt{${d}}\\right)^{2}$`;
                    texte_corr = `$\\left(${a} \\sqrt{${b}} +${c}\\sqrt{${d}}\\right)^{2}=
                    \\left(${a} \\sqrt{${b}} \\right)^{2}+2\\times ${ecriture_parenthese_si_negatif(a)}\\sqrt{${b}}\\times ${c}\\sqrt{${d}}+\\left(${c}\\sqrt{${d}}\\right)^{2}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\sqrt{${d}}\\right)^{2}}=${ecriture_parenthese_si_negatif(a)}^{2}\\times ${b} +2\\times ${ecriture_parenthese_si_negatif(a)}
                    \\times \\sqrt{${b}}\\times ${ecriture_parenthese_si_negatif(c)}    \\times\\sqrt{${d}}+ ${c*c}\\times ${d}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\sqrt{${d}}\\right)^{2}}=${a*a*b} ${ecriture_algebrique(2*a*c)}\\sqrt{${b}\\times${d}} ${ecriture_algebrique(c*c*d)}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\sqrt{${d}}\\right)^{2}}=${a*a*b+c*c*d}${ecriture_algebrique(2*a*c)}\\sqrt{${b*d}}

                    $`;

                        
                    break ;
            case 5 : 
                a = randint(2,6)*choice([-1,1]);
                b= randint(2,11,[4,8,9]);
                c = randint(2,6);
                d= randint(2,11,[4,8,9]);
                    texte = `$\\left(${a} \\sqrt{${b}} +${c}\\sqrt{${d}}\\right)\\left(${a} \\sqrt{${b}}-${c}\\sqrt{${d}}\\right)$`;
                    texte_corr = `$\\left(${a} \\sqrt{${b}} +${c}\\sqrt{${d}}\\right)\\left(${a} \\sqrt{${b}}-${c}\\sqrt{${d}}\\right)=
                    \\left(${a} \\sqrt{${b}} \\right)^{2}-\\left(${c}\\sqrt{${d}}\\right)^{2}$<br>
                $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\sqrt{${d}}\\right)\\left(${a} \\sqrt{${b}}-${c}\\sqrt{${d}}\\right)}
                    =${ecriture_parenthese_si_negatif(a)}^{2}\\times ${b}-${c}^{2}\\times ${ecriture_parenthese_si_negatif(d)}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\sqrt{${d}}\\right)\\left(${a} \\sqrt{${b}}-${c}\\sqrt{${d}}\\right)}
                    =${a*a*b}-${c*c*d}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\sqrt{${d}}\\right)\\left(${a} \\sqrt{${b}}-${c}\\sqrt{${d}}\\right)}
                    =${a*a*b-c*c*d}$
                    `;


                        
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
    

}
function Double_distributivité_avec_racine_carree(){
Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Appliquer la double distributivité avec les racines carrées";
    this.consigne = " Effectuer les calculs suivants :"
    this.nb_questions = 5;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.sup = 1 ; // 

    this.nouvelle_version = function(numero_de_l_exercice){
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles = [1,2];
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) ;
    for (let i = 0, a,b, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) {
            type_de_questions = liste_type_de_questions[i];
    switch (type_de_questions){
                        // Cas par cas, on définit le type de nombres que l'on souhaite
                        // Combien de chiffres ? Quelles valeurs ?
                case 1 : 
                    let a1=randint(2,9)*choice([-1,1]);
                    let a=randint(2,11,[4,8,9]);
                    let b1=randint(2,9)*choice([-1,1]);
                    let a2=randint(2,9);
                    let b2=randint(2,9)*choice([-1,1]);
                    let aa1=a1*a2*a;
                    let bb=b1*b2;
                    let aa2=a1*b2+b1*a2;
                    let aaa=aa1+bb
                    if (aa2==0) {
                            b2=-1*b2;
                            aa2=a1*b2+b1*a2;                    
                    }
                    texte = `$\\left(${a1}\\sqrt{${a}}${ecriture_algebrique(b1)}\\right)\\left(${a2}\\sqrt{${a}}${ecriture_algebrique(b2)}\\right)$`;
                    texte_corr = `$\\left(${a1}\\sqrt{${a}}${ecriture_algebrique(b1)}\\right)\\left(${a2}\\sqrt{${a}}${ecriture_algebrique(b2)}\\right)$<br>
                    
                    $=${a1}\\sqrt{${a}}\\times ${a2}\\sqrt{${a}}${ecriture_algebrique(a1)}\\sqrt{${a}} \\times ${ecriture_parenthese_si_negatif(b2)}
                    ${ecriture_algebrique(b1)} \\times ${a2}\\sqrt{${a}}${ecriture_algebrique(b1)} \\times ${ecriture_parenthese_si_negatif(b2)}$<br>
                    $=${a1}\\times ${a}\\times ${a2}+ \\left( ${a1} \\times ${ecriture_parenthese_si_negatif(b2)} 
                    ${ecriture_algebrique(b1)} \\times ${a2}\\right)\\sqrt{${a}} ${ecriture_algebrique(bb)}$<br>
                    $= ${aa1}${ecriture_algebrique(aa2)} \\sqrt{${a}}${ecriture_algebrique(bb)}$<br>
                    $=${aa2} \\sqrt{${a}}${ecriture_algebrique(aaa)}$`;

                        
                    break ;
                case 2 : 
                    let c1=randint(2,9)*choice([-1,1]);
                    let c=randint(2,11,[4,8,9]);
                    let d1=randint(2,9)*choice([-1,1]);
                    let d2=randint(2,9);
                    let c2=randint(2,9);
                    let cc1=c1*d2;
                    let cc2=c1*c2;
                    let dd=d1*d2;
                    let dd1 = d1*c2;
                    let dd2=dd-cc2*c;
                    let dd3=cc1-dd1;
                    texte = `$\\left(${c1}\\sqrt{${c}}${ecriture_algebrique(d1)}\\right)\\left(${d2} ${ecriture_algebrique(c2)}\\sqrt{${c}}\\right)$`;
                    texte_corr = `$\\left(${c1}\\sqrt{${c}}${ecriture_algebrique(d1)}\\right)\\left(${d2}${ecriture_algebrique(c2)}\\sqrt{${c}}\\right)$<br>
                    $=${c1}\\sqrt{${c}}\\times ${d2}${ecriture_algebrique(c1)}\\sqrt{${c}} \\times ${ecriture_parenthese_si_negatif(c2)}\\sqrt{${c}}${ecriture_algebrique(d1)} \\times ${d2}  ${ecriture_algebrique(d1)}  \\times ${c2}\\sqrt{${c}}$<br>
                    $= ${cc1}\\sqrt{${c}} ${ecriture_algebrique(cc2)}\\times ${c} ${ecriture_algebrique(dd)} ${ecriture_algebrique(dd1)} \\sqrt{${c}}   $<br>
                    $=${dd3}\\sqrt{${c}}${ecriture_algebrique(dd2)}$`;
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
    

}



function parite()
{
Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Déterminer la parité d'une expression.";
    this.consigne = "Soit $n$ un entier naturel."
    this.nb_questions = 4;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.sup = 1 ; // 

    this.nouvelle_version = function(numero_de_l_exercice)
    {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles = [1,2,3];
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) ;
    for (let i = 0, a,b,c,d,e, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) 
        {
            type_de_questions = liste_type_de_questions[i];
        switch (type_de_questions)
            {
                        // Cas par cas, on définit le type de nombres que l'on souhaite
                        // Combien de chiffres ? Quelles valeurs ?
            
                case 1 : 
        
                a = randint(2,6);
                b= randint(2,11,[4,8,9]);
                c = randint(2,6);
                    
                    texte = `Que peut-on dire de la parité de ${a}$n$ ?`;
                    if (a%2==0) {
                        texte_corr = `${a}$n=2\\times ${tex_nombre(a/2)}n$<br>
                        Comme $${tex_nombre(a/2)}n$ est un entier naturel, ${a}$n$ s'écrit comme le double d'un entier naturel, il est donc pair`;
                        }
                    else {
                        if (a==3) {
                            texte_corr = `${a}$n=2n+n$<br>
                            Comme $n$ est un entier naturel, $2 n$ est un nombre pair.<br>
                            Si $n$ est pair, $2n+n$ est la somme de deux nombres pairs, il sera donc pair. <br>
                            Si $n$ est impair, $2n+n$ est la somme d'un nombre pair et d'un impair, il sera donc impair. <br>
                            Au final, ${a}$n$ a donc la même parité que $n$.`;
                            }
                        else {
                            texte_corr = `${a}$n=2\\times ${tex_nombre((a-1)/2)}n+n$<br>
                            Comme $${tex_nombre((a-1)/2)}n$ est un entier naturel, $2\\times ${tex_nombre((a-1)/2)}n$ est un nombre pair.<br>
                            Si $n$ est pair, $2\\times${tex_nombre((a-1)/2)}n+n$ est la somme de deux nombres pairs, il sera donc pair. <br>
                            Si $n$ est impair, $2\\times${tex_nombre((a-1)/2)}n+n$ est la somme d'un nombre pair et d'un impair, il sera donc impair. <br>
                            Au final, ${a}$n$ a donc la même parité que $n$.`;
                            }
                        }
                                        
                    break ;
                case 2 : 
                a = randint(2,6);
                b= randint(2,11);
                c = randint(2,6);
                    
                    texte = `Que peut-on dire de la parité de $${a}n+${b}$ ?`;
                
                    if (a%2==0 && b%2==0 && a!=2) {
                        texte_corr = `$${a}n+${b}=2\\times ${tex_nombre(a/2)}n+${b}$<br>
                        Comme $${tex_nombre(a/2)}n$ est un entier naturel, $2\\times ${tex_nombre(a/2)}n$ est donc un nombre pair<br>
                        ${b} est aussi un nombre pair.
                        $${a}n+${b}$ est donc la somme de deux nombres pairs, il est donc pair`;}
                    if (a%2==0 && b%2!=0 && a!=2) {
                        texte_corr = `$${a}n+${b}=2\\times ${tex_nombre(a/2)}n+${b}$<br>
                        Comme $${tex_nombre(a/2)}n$ est un entier naturel, $2\\times ${tex_nombre(a/2)}n$ est donc un nombre pair<br>
                        ${b} est un nombre impair.
                        $${a}n+${b}$ est donc la somme d'un nombre pair et d'un nombre impair. Il est donc impair`;}


                    if (a==2 && b%2==0) {
                        texte_corr = `Comme $n$ est un entier naturel, $2n$ est un nombre pair<br>
                        ${b} est aussi un nombre pair.
                        $${a}n+${b}$ est donc la somme de deux nombres pairs, il est donc pair`;}
                    
                    if ( a==2 && b%2!=0) {
                        texte_corr = `
                        Comme $n$ est un entier naturel, $2n$ est un nombre pair<br>
                        ${b} est un nombre impair.<br>
                        $2n+${b}$ est donc la somme d'un nombre pair et d'un nombre impair. Il est donc impair`;
                                }
                    if (a==3 && b%2==0) {                   
                        texte_corr = `$${a}n+${b}=2n+n+${b}$<br>
                        Comme $n$ est un entier naturel, $2n$ est un nombre pair.<br>
                        ${b} est un nombre pair. <br>
                        $2n + ${b}$ est donc un nombre pair. <br>
                        $${a}n+${b}=2n+${b}+n$ est donc la somme d'un nombre pair et de $n$, il a donc la même parité que $n$.`;
                            }
                    if (a==3 && b%2!=0) {                   
                        texte_corr = `$${a}n+${b}=2n+n+${b}$<br>
                        Comme $n$ est un entier naturel, $2n$ est un nombre pair.<br>
                        ${b} est un nombre impair. <br>
                        $2n + ${b}$ est donc un nombre impair. <br>
                        $${a}n+${b}=2n+${b}+n$ est donc la somme d'un nombre impair et de $n$, il a donc la parité contraire de $n$.`;
                            }
                    if (a%2!=0 && b%2==0 && a!=3) {
                        texte_corr = `${a}$n=2\\times ${tex_nombre((a-1)/2)}n+n+${b}$<br>
                        Comme $${tex_nombre((a-1)/2)}n$ est un entier naturel, $2 ${tex_nombre((a-1)/2)}n$ est donc un nombre pair<br>
                        ${b} est aussi un nombre pair.<br>
                        $${tex_nombre((a-1)/2)}n +${b}$ est donc un nombre pair.<br>
                        $${a}n+${b}=2\\times${tex_nombre((a-1)/2)}n+${b}+n$ est donc la somme d'un nombre pair et de $n$, il a donc la même parité que $n$.`;
                            }
                    if (a%2!=0 && b%2!=0 && a!=3) {
                        texte_corr = `$${a}n+${b}=2\\times ${tex_nombre((a-1)/2)}n+n+${b}$<br>
                        Comme $${tex_nombre((a-1)/2)}n$ est un entier naturel, $2 \\times ${tex_nombre((a-1)/2)}n$ est donc un nombre pair<br>
                        ${b} est un nombre impair.<br>
                        $2\\times${tex_nombre((a-1)/2)}n +${b}$ est une somme d'un nombre pair et d'un nombre impair, c'est donc un nombre impair.<br>
                        $${a}n+${b}=2\\times${tex_nombre((a-1)/2)}n+${b}+n$ est donc la somme d'un nombre impair et de $n$,  il a donc la parité contraire de $n$.`;
                            }           
                        
                    break ;
                    
            case 3 : 
                a = randint(2,6);
                b= randint(2,11);
                c = randint(2,6);
                    
                    texte = `Que peut-on dire de la parité de $${a}n^{2}$ ?`;
                
            
                    if (a==2) {
                        texte_corr = `
                        Comme $n^{2}$ est un entier naturel, $2n^{2}$ est un nombre pair<br>
                        `;} 
                
                    if (a%2==0 && a!=2) {
                        texte_corr = `$${a}n^{2}=2\\times ${tex_nombre(a/2)}n^{2}$<br>
                        Comme $${tex_nombre(a/2)}n^{2}$ est un entier naturel, $2\\times ${tex_nombre(a/2)}n^{2}$ est donc un nombre pair<br>
                        `;}
                    if (a%2==2) {
                        texte_corr = `Comme $n^{2}$ est un entier naturel, $2n^{2}$ est un nombre pair<br>
                        `;}
                    if (a%2!=0 && a!=3) {
                        texte_corr = `$${a}n^{2}=2\\times ${tex_nombre((a-1)/2)}n^{2}+n^{2}$<br>
                        Comme $${tex_nombre((a-1)/2)}n^{2}$ est un entier naturel, $2\\times ${tex_nombre((a-1)/2)}n^{2}$ est donc un nombre pair<br>
                        $${a}n^{2}$ est donc la somme d'un nombre pair et de $n^{2}$. Il a donc la même parité que $n^{2}$<br>
                        Or, on sait d'après le cours (démonstration fondamentale) que $n^{2}$ et $n$ ont la même parité.<br>
                        Donc $${a}n^{2}$ a la même parité que $n$`;}
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
    
}



function ensemble_de_nombres(){
Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Déterminer le plus petit ensemble de nombres dans lequel le nombre proposé appartient.";
    this.consigne = "Déterminer le plus petit ensemble de nombres dans lequel le nombre proposé appartient. :"
    this.nb_questions = 5;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.sup = 1 ; // 

    this.nouvelle_version = function(numero_de_l_exercice){
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles = [1,2,3,4,5,6,7,8,9];
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) ;
    for (let i = 0, a,b,c,d,e, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) {
            type_de_questions = liste_type_de_questions[i];
    switch (type_de_questions){
                        // Cas par cas, on définit le type de nombres que l'on souhaite
                        // Combien de chiffres ? Quelles valeurs ?
            
                case 1 : 
        
                a = randint(0,150);
                
                    
                    texte = `$${a} \\in \\dots$`;
                    texte_corr = `$${a}$ est un entier naturel, on a donc $${a}\\in \\mathbb{N}$
                    `;


                        
                    break ;
                case 2 : 
        
                a = randint(0,150)*(-1);
                
                    
                    texte = `$${a} \\in \\dots$`;
                    texte_corr = `$${a}$ est un entier relatif, on a donc $${a}\\in \\mathbb{Z}$
                    `;


                        
                    break ;
                case 3 : 
        
                d = randint(0,9);
                b = randint(0,9)*choice([-1,1]);
                c = randint(0,9);
                a=b+c/10+d/100;
                a=a*choice([-1,1])
                    
                    texte = `$${tex_nombrec(b+c/10+d/100)}\\in \\dots$`;
                    texte_corr = `$${tex_nombrec(b+c/10+d/100)}$ est un nombre décimal, on a donc $${tex_nombrec(b+c/10+d/100)}\\in \\mathbb{D}$
                    `;


                        
                    break ;
                    case 4 : 
        
                a = randint(2,16);
                b = randint(0,9);
                c = randint(0,9);
                
                    
                    texte = `$\\sqrt{${tex_nombrec(a*a)}}\\in \\dots$`;
                    texte_corr = `$\\sqrt{${a*a}}=${a}$  est un entier naturel, on a donc $\\sqrt{${tex_nombrec(a*a)}}\\in \\mathbb{N}$
                    `;


                        
                    break ; 
                    case 5 : 
        
                a = randint(2,16);
                b = randint(2,6);
                c = randint(0,9);
            
                    
                    texte = `$\\dfrac{${tex_nombrec(b*a)}}{${a}}\\in \\dots$`;
                    texte_corr = `$\\dfrac{${tex_nombrec(b*a)}}{${a}}=\\dfrac{${b}\\times ${a}}{${a}}=${b}$  est un entier naturel, on a donc $\\dfrac{${tex_nombrec(b*a)}}{${a}}\\in \\mathbb{N}$
                    `;


                        
                    break ; 
                case 6 : 
        
                a = choice([3,5,7,11,13,17,19,23,29,31,37,39,41,43,47,53,57,61,67,71,73,79,83,87,89]);
                b = choice([3,5,7,11,13,17,19,23,29,31,37,39,41,43,47,53,57,61,67,71,73,79,83,87,89],[a]);
                
            
                    
                    texte = `$\\dfrac{${a}}{${b}}\\in \\dots$`;
                    texte_corr = `$\\dfrac{${a}}{${b}}$ n'est pas un nombre décimal. On a donc $\\dfrac{${a}}{${b}}\\in \\mathbb{Q}$
                    `;


                        
                    break ; 
                case 7 : 
        
                
                b = choice([4,5,8,10]);
                a= randint(4,100);
                while (a%b==0)
                    {a=randint(4,100);}
                
                
            
                    
                    texte = `$\\dfrac{${a}}{${b}}\\in \\dots$`;
                    texte_corr = `$\\dfrac{${a}}{${b}}=${tex_nombre(a/b)}$  est un nombre décimal. On a donc $\\dfrac{${a}}{${b}}\\in \\mathbb{D}$
                    `;


                        
                    break ; 
            case 8 : 
        
                
                a = randint(2,100,[4,9,16,25,36,49,64,81]);
                texte = `$\\sqrt{${a}} \\in \\dots$`;
                texte_corr = `$\\sqrt{${a}}$  est un nombre irrationnel. On a donc $\\sqrt{${a}}\\in \\mathbb{R}$
                    `;


                        
                    break ; 
            case 9 : 
                a=randint(2,9)
                texte = `$${a}\\pi \\in \\dots$`;
                texte_corr = `$${a}\\pi$   est un nombre irrationnel. On a donc $${a}\\pi \\in \\mathbb{R}$
                    `;


                        
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
    
}

function proprietes_racine_carree(){
    Exercice.call(this); // Héritage de la classe Exercice()
        this.titre = "Connaître les propriétés calculatoires des racines carrées";
        this.consigne = "Effectuer, si possible, les calculs suivants :"
        this.nb_questions = 5;
        this.nb_cols = 2;
        this.nb_cols_corr = 2;
        this.sup = 1 ; //
        this.nouvelle_version = function(numero_de_l_exercice){
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées
        let type_de_questions_disponibles = [1,2,3,4,5,6,7];
        let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) ;
        for (let i = 0, a,b,c,d,e, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) {
                type_de_questions = liste_type_de_questions[i];
        switch (type_de_questions){
                            // Cas par cas, on définit le type de nombres que l'on souhaite
                            // Combien de chiffres ? Quelles valeurs ?
                
                    case 1 :
            
                    a = randint(2,9)*choice([-1,1]);
                    b= randint(2,11,[4,8,9]);
                    c=a*a*b;
                    d=a*a
                        texte = `$\\left(${a} \\sqrt{${b}}\\right)^{2}$`;
                        texte_corr = `$\\left(${a} \\sqrt{${b}}\\right)^{2}=${a}^{2}\\times \\left(\\sqrt{${b}}\\right)^{2}$
                        $\\phantom{\\left(${a} \\sqrt{${b}}\\right)^{2}}$<br>
                        $\\phantom{\\left(${a} \\sqrt{${b}}\\right)^{2}}=${d}\\times ${b}$<br>
                        $\\phantom{\\left(${a} \\sqrt{${b}}\\right)^{2}}=${c}$`;
                            
                        break ;
                    case 2 :
            
                    a = randint(2,9)*choice([-1,1]);
                    c = randint(2,9)*choice([-1,1]);
                    d = randint(2,9)*choice([-1,1]);
                    b= randint(2,11,[4,8,9]);
                    e=c*d;
                
        
                        texte = `$ ${c} \\sqrt{${b}}\\times ${ecriture_parenthese_si_negatif(d)} \\sqrt{${b}}$`;
                        texte_corr = `$ ${c} \\sqrt{${b}}\\times ${ecriture_parenthese_si_negatif(d)} \\sqrt{${b}}=${c}\\times ${ecriture_parenthese_si_negatif(d)} \\sqrt{${b}} \\times \\sqrt{${b}}$<br>
                        $\\phantom{${c} \\sqrt{${b}}\\times ${ecriture_parenthese_si_negatif(d)} \\sqrt{${b}}}=${e}\\times ${b}$<br>
                        $\\phantom{${c} \\sqrt{${b}}\\times ${ecriture_parenthese_si_negatif(d)} \\sqrt{${b}}}=${e*b}$`;
                            
                        break ;
                    case 3 :
            
                    a = randint(2,9)*choice([-1,1]);
                    c = randint(2,9)*choice([-1,1]);
                    d = randint(2,9)*choice([-1,1]);
                    b= randint(2,11,[4,8,9]);
                    e=c*d;
                
        
                        texte = `$ ${a} \\sqrt{${b}}\\left( ${c}  ${ecriture_algebrique(d)}\\sqrt{${b}}\\right)$`;
                        texte_corr = `$${a} \\sqrt{${b}}\\left( ${c}  ${ecriture_algebrique(d)}\\sqrt{${b}}\\right)=
                        ${a} \\sqrt{${b}}\\times ${ecriture_parenthese_si_negatif(c)}${ecriture_algebrique(a)} \\sqrt{${b}}\\times ${ecriture_parenthese_si_negatif(d)}\\sqrt{${b}}$<br>
                        $\\phantom{${a} \\sqrt{${b}}\\left( ${c}  ${ecriture_algebrique(d)}\\sqrt{${b}}\\right)}=${a*c}\\sqrt{${b}}${ecriture_algebrique(a)}\\times ${ecriture_parenthese_si_negatif(d)}*${b}$<br>
                        $\\phantom{${a} \\sqrt{${b}}\\left( ${c}  ${ecriture_algebrique(d)}\\sqrt{${b}}\\right)}=${a*c}\\sqrt{${b}}${ecriture_algebrique(a*d*b)}$`;
                            
                        break ;
                        case 4 :
            
                    a = randint(2,9)
                
                    d = randint(2,9);
                    b= randint(2,11,[4,8,9]);
                    c = randint(2,19,[4,8,9,12,16,18,b]);
                    e=c*d;
                
        
                        texte = `$  \\sqrt{${b}}+\\sqrt{${c}}$`;
                        texte_corr = `$  \\sqrt{${b}}+\\sqrt{${c}}$ n'est pas simplifiable`;
                            
                        break ;
                case 5 :
            
                
                    b= randint(2,11);
                    c = randint(2,11,[b]);
                    e=c*d;
                
        
                        texte = `$  \\sqrt{${b*b}}+\\sqrt{${c*c}}$`;
                        texte_corr = `$  \\sqrt{${b*b}}+\\sqrt{${c*c}}=${b}+${c}=${b+c}$ `;
                            
                        break ;
                    case 6 :
            
                
                    b= randint(2,11);
                    c = randint(2,7,[b]);
                    d=b*b*c;
                
        
                        texte = `$ \\sqrt{\\dfrac{${d}}{${c}}}$`;
                        texte_corr = `$ \\sqrt{\\dfrac{${d}}{${c}}}= \\sqrt{\\dfrac{${b}^{2}\\times${c}}{${c}}}$<br>
                        $\\phantom{\\sqrt{\\dfrac{${d}}{${c}}}}=\\sqrt{${b}^{2}}$<br>
                        $\\phantom{\\sqrt{\\dfrac{${d}}{${c}}}}=${b}$ `;
                            
                        break ;
                    case 7 :
            
                
                    b= randint(2,11,[4,9]);
                    c = randint(2,7,[b]);
                    d=b*c;
                
        
                        texte = `$ \\sqrt{${d}}\\times \\sqrt{${c}}$`;
                        texte_corr = `$ \\sqrt{${d}}\\times \\sqrt{${c}}=\\sqrt{${d}\\times${c}}$<br>
                        $\\phantom{\\sqrt{${d}}\\times \\sqrt{${c}}}=\\sqrt{${b}\\times${c}\\times${c}}$<br>
                        $\\phantom{\\sqrt{${d}}\\times \\sqrt{${c}}}=${c}\\sqrt{${b}}$ `;
                            
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
        
    }
 
function Extraire_un_carre_parfait_d_une_racine_carree() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Extraire un carré parfait d'une racine carrée";
    this.consigne = " Ecrire le nombre proposé sous la forme $a\\sqrt{b}$ où $a$ est un entier et $b$ le plus petit entier possible:";
    this.nb_questions = 4;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.sup = 2; //

    this.nouvelle_version = function (numero_de_l_exercice) {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées

        for (let i = 0, a, b, c, d, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
            let a = randint(2, 11)
            b = a * a
            c = randint(2, 7, [4])
            d = c * b
            if (this.sup == 1)
                texte = `Ecrire $\\sqrt{${d}}$ sous la forme $a\\sqrt{${c}}$ où $a$ est un entier:`
            texte_corr = `On cherche le plus grand carré parfait diviseur de ${d}, c'est ${b}.
				On a donc la décomposition : $${d}=${c} \\times ${b}=${c} \\times ${a}^{2}$ qui permet d'écrire que
				$\\sqrt{${d}}=\\sqrt{${a}^{2} \\times ${c} }=${a}\\times \\sqrt{${c}}$`
            if (this.sup == 2)
                texte = `Ecrire $\\sqrt{${d}}$ sous la forme $a\\sqrt{b}$ où $a$ est un entier et $b$ le plus petit entier possible:`
            texte_corr = `On cherche le plus grand carré parfait diviseur de ${d}, c'est ${b}.
				On a donc la décomposition : $${d}=${c} \\times ${b}=${c} \\times ${a}^{2}$ qui permet d'écrire que
				$\\sqrt{${d}}=\\sqrt{${a}^{2} \\times ${c} }=${a}\\times \\sqrt{${c}}$`
            if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
                this.liste_questions.push(texte);
                this.liste_corrections.push(texte_corr);
                i++;
            }
            cpt++;
        }
        liste_de_question_to_contenu(this);
    }
    this.besoin_formulaire_numerique = ['Niveau de difficulté', 2, "1 : En donnat la racine carrée unité\n2 : Sans indication"];
}
function Simplifier_une_somme_de_racines_carrees() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Simplifier une somme de racine carrée";
    this.consigne = " Simplifier une somme de racine carrée"
    this.nb_questions = 4;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.sup = 1; //
    this.nouvelle_version = function (numero_de_l_exercice) {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées

        for (let i = 0, a1, a2, a3, b1, b2, b3, c, d1, d2, d3, f1, f2, f3, f, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {

            let e1 = randint(2, 8) * choice([-1, 1]);
            let e2 = randint(2, 8) * choice([-1, 1]);
            let e3 = randint(2, 8) * choice([-1, 1]);
            let a1 = randint(2, 11)
            let a2 = randint(2, 11, [a1])
            let a3 = randint(2, 11, [a1, a2])
            let b1 = a1 * a1
            let b2 = a2 * a2
            let b3 = a3 * a3
            let c = randint(2, 11, [4, 8, 9])
            let d1 = c * b1
            let d2 = c * b2
            let d3 = c * b3
            let f1 = e1 * a1
            let f2 = e2 * a2
            let f3 = e3 * a3
            let f = f1 + f2 + f3

            texte = `Ecrire $A=${e1}\\sqrt{${d1}} ${ecriture_algebrique(e2)}\\sqrt{${d2}} ${ecriture_algebrique(e3)}\\sqrt{${d3}}$ sous la forme $a\\sqrt{${c}}$ où $a$ est un entier:`
            texte_corr = `On cherche le plus grand carré parfait diviseur de ${d1}, ${d2} et ${d3}. <br>
                On trouve $${d1}=${b1} \\times ${c}~~$, $~~${d2}=${b2} \\times ${c}~~$	et $${d3}=${b3} \\times ${c}$<br>
                On a donc  : $\\sqrt{${d1}}=\\sqrt{${a1}^{2} \\times ${c} }=${a1}\\times \\sqrt{${c}}$,
                $~~\\sqrt{${d2}}=\\sqrt{${a2}^{2} \\times ${c} }=${a2}\\times \\sqrt{${c}}~$ et
                $~\\sqrt{${d3}}=\\sqrt{${a3}^{2} \\times ${c} }=${a3}\\times \\sqrt{${c}}$<br>
                On en déduit que : $A=${e1}\\times${a1}\\times \\sqrt{${c}} ${ecriture_algebrique(e2)}\\times ${a2}\\times \\sqrt{${c}}${ecriture_algebrique(e3)}\\times ${a3}\\times \\sqrt{${c}}$<br>
                $A=${f1}\\times \\sqrt{${c}} ${ecriture_algebrique(f2)}\\times \\sqrt{${c}}${ecriture_algebrique(f3)}\\times \\sqrt{${c}}$		<br>
                $A=	(${f1}${ecriture_algebrique(f2)}${ecriture_algebrique(f3)})\\times \\sqrt{${c}} = ${f}\\sqrt{${c}}$`

            if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
                this.liste_questions.push(texte);
                this.liste_corrections.push(texte_corr);
                i++;
            }
            cpt++;
        }
        liste_de_question_to_contenu(this);
    }
    this.besoin_formulaire_numerique = ['Niveau de difficulté', 2, "1 : En donnat la racine carrée unité\n2 : Sans indication"];
}

function Existence_d_une_racine_carree(){
Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Existence d'une racine carrée.";
    this.consigne = " Dire si le nombre proposé existe ou non, en justifiant."
    this.nb_questions = 5;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.sup = 1 ; // 

    this.nouvelle_version = function(numero_de_l_exercice){
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles = [1,2,3,4,5,6,7,8] ;
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) ;
    for (let i = 0, a,b, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) {
            type_de_questions = liste_type_de_questions[i];
    switch (type_de_questions){
                        // Cas par cas, on définit le type de nombres que l'on souhaite
                        // Combien de chiffres ? Quelles valeurs ?
                case 1 : 
                    let a=randint(2,9);
                    texte = `$\\sqrt{\\sqrt{${a}}}$`;
                    texte_corr = `$\\sqrt{${a}}$ existe car ${a} est un nombre positif.<br>
                    $\\sqrt{${a}}$ est un réel positif donc $\\sqrt{\\sqrt{${a}}}$ existe bien.`;
                    break ;
                case 2 :    
                    let b=randint(2,9)*(-1);
                    texte = `$\\sqrt{${b}}$`;
                    texte_corr =  `$\\sqrt{${b}}$ n'existe pas car $${b}$ est un nombre négatif. La racine carrée n'est définie que pour les réels positifs ou nul. `; 
                    break ;
                case 3 :    
                    let c=randint(2,9)*(-1);
                    let d=c*c;
                    texte = `$\\sqrt{\\left(${c}\\right)^{2}}$`;
                    texte_corr =  `$\\sqrt{\\left(${c}\\right)^{2}}$ existe pas car $\\left(${c}\\right)^{2}=${d}$ est un nombre positif.`; 
                    break ;
                case 4 :    
                    let e=randint(2,9);
                    texte = `$-\\sqrt{${e}}$`;
                    texte_corr =  `$-\\sqrt{${e}}$ existe car ${e} est un nombre positif. Le signe - est placé devant le symbole radical, le nombre $-\\sqrt{${e}}$ est donc négatif. `; 
                    break ;
                case 5 :    
                    let f=randint(2,9)*(-1);
                    let g=f*f;
                    texte = `$\\sqrt{-\\left(${f}\\right)^{2}}$`;
                    texte_corr =  `$\\sqrt{-\\left(${f}\\right)^{2}}$ n'existe pas car $-\\left(${f}\\right)^{2}=-${g}$  est un nombre négatif. La racine carrée n'est définie que pour les réels positifs ou nul. . `; 
                    break ;
                case 6 :    
                    let h=randint(2,3);
                    texte = `$\\sqrt{${h}-\\pi}$`;
                    texte_corr =  `$\\sqrt{${h}-\\pi}$ n'existe pas car $\\pi>3$ donc $${h}-\\pi$  est un nombre négatif. La racine carrée n'est définie que pour les réels positifs ou nul. . `; 
                    break ;
                case 7 :    
                    let i=randint(4,5);
                    texte = `$\\sqrt{${i}-\\pi}$`;
                    texte_corr =  `$\\sqrt{${i}-\\pi}$ existe car $\\pi\\approx 3,14$ donc $${i}-\\pi$  est un nombre positif.`; 
                    break ; 
                case 8 :    
                    let j=randint(2,12);
                    texte = `$\\sqrt{-${j}^{2}}$`;
                    texte_corr =  `$-${j}^{2}=-${j*j}$ est un réel négatif donc sa racine carrée n'est pas définie.`; 
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
    

}


function Extraire_un_carre_parfait_d_une_racine_carree() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Extraire un carré parfait d'une racine carrée";
    this.consigne = " Ecrire le nombre proposé sous la forme $a\\sqrt{b}$ où $a$ est un entier et $b$ le plus petit entier possible:";
    this.nb_questions = 4;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.sup = 2; //

    this.nouvelle_version = function (numero_de_l_exercice) {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées

        for (let i = 0, a, b, c, d, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
            a = randint(2, 11)
            b = a * a
            c = randint(2, 7, [4])
            d = c * b
            if (this.sup == 1)
                texte = `Ecrire $\\sqrt{ ${d} } $ sous la forme $a\\sqrt{ ${c} } $ où $a$ est un entier:`
            texte_corr = `On cherche le plus grand carré parfait diviseur de ${d}, c'est ${b}.
                            On a donc la décomposition : $${d}=${c} \\times ${b}=${c} \\times ${a}^{2}$ qui permet d'écrire que
                            $\\sqrt{${d}}=\\sqrt{${a}^{2} \\times ${c} }=${a}\\times \\sqrt{${c}}$`
            if (this.sup == 2)
                texte = `Ecrire $\\sqrt{ ${d} } $ sous la forme $a\\sqrt{ b } $ où $a$ est un entier et $b$ le plus petit entier possible:`
            texte_corr = `On cherche le plus grand carré parfait diviseur de ${d}, c'est ${b}.
                            On a donc la décomposition : $${d}=${c} \\times ${b}=${c} \\times ${a}^{2}$ qui permet d'écrire que
                            $\\sqrt{${d}}=\\sqrt{${a}^{2} \\times ${c} }=${a}\\times \\sqrt{${c}}$`
            if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
                this.liste_questions.push(texte);
                this.liste_corrections.push(texte_corr);
                i++;
            }
            cpt++;
        }
        liste_de_question_to_contenu(this);
    }
    this.besoin_formulaire_numerique = ['Niveau de difficulté', 2, "1 : En donnat la racine carrée unité\n2 : Sans indication"];
}
/**
 * Développer avec les 3 identités remarquables
* @auteur Jean-Claude Lhote
*/
function Developper_Identites_remarquables2() {
    'use strict';
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Développer avec les identités remarquables";
    this.consigne = "Développer les expressions suivantes.";
    this.nb_cols = 1;
    this.nb_cols_corr = 1;
    this.spacing = 1;
    this.spacing_corr = 1;
    this.nb_questions = 5;
    this.sup = 1;

    this.nouvelle_version = function (numero_de_l_exercice) {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées
        let liste_fractions = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5],
        [1, 6], [5, 6], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [1, 8], [3, 8], [5, 8], [7, 8],
        [1, 9], [2, 9], [4, 9], [5, 9], [7, 9], [8, 9], [1, 10], [3, 10], [7, 10], [9, 10]]
        let type_de_questions_disponibles = [];
        if (this.sup == 1) {
            type_de_questions_disponibles = [1, 2, 3] // coef de x = 1
        }
        else if (this.sup == 2) {
            type_de_questions_disponibles = [4, 5, 6]  // coef de x > 1
        }
        else { type_de_questions_disponibles = [7, 8, 9] }  // coef de x relatif

        let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions)
        for (let i = 0, texte, texte_corr, cpt = 0, a, b, type_de_questions, fraction = [], ds, ns; i < this.nb_questions && cpt < 50;) {
            type_de_questions = liste_type_de_questions[i];
            a = randint(1, 9);
            b = randint(2, 9);
            fraction = choice(liste_fractions);
            ns = fraction[0]
            ds = fraction[1]
            switch (type_de_questions) {
                case 1:
                    texte = `$(x+${a})^2$`; // (x+a)²
                    texte_corr = `$(x+${a})^2=x^2+2 \\times ${a} \\times x+${a}^2=x^2+${2 * a}x+${a * a}$`;
                    break;
                case 2:
                    texte = `$(x-${a})^2$`  // (x-a)²
                    texte_corr = `$(x-${a})^2=x^2-2 \\times ${a} \\times x+${a}^2=x^2-${2 * a}x+${a * a}$`;
                    break;
                case 3:
                    texte = `$(x-${a})(x+${a})$`    // (x-a)(x+a)
                    texte_corr = `$(x-${a})(x+${a})=x^2-${a}^2=x^2-${a * a}$`;
                    break;
                case 4:
                    texte = `$(${b}x+${a})^2$`; //(bx+a)²  b>1
                    texte_corr = `$(${b}x+${a})^2=(${b}x)^2+2 \\times ${b}x \\times ${a} + ${a}^2=${b * b}x^2+${2 * b * a}x+${a * a}$`;
                    break;
                case 5:
                    texte = `$(${b}x-${a})^2$`; //(bx-a)² b>1
                    texte_corr = `$(${b}x-${a})^2=(${b}x)^2-2 \\times ${b}x \\times ${a} + ${a}^2=${b * b}x^2-${2 * b * a}x+${a * a}$`;
                    break;
                case 6:
                    texte = `$(${b}x-${a})(${b}x+${a})$`; //(bx-a)(bx+a) b>1
                    texte_corr = `$(${b}x-${a})(${b}x+${a})=(${b}x)^2-${a}^2=${b * b}x^2-${a * a}$`;
                    break;
                case 7:
                    texte = `$\\left(${tex_fraction(ns, ds)}x+${a}\\right)^2$`; // (kx+a)² k rationnel 
                    texte_corr = `$\\left(${tex_fraction(ns, ds)}x+${a}\\right)^2=\\left(${tex_fraction(ns, ds)}x\\right)^2+2 \\times ${tex_fraction(ns, ds)}x \\times ${a} + ${a}^2=\\left(${tex_fraction(ns, ds)}x+${a}\\right)^2=${tex_fraction(ns * ns, ds * ds)}x^2+${tex_fraction_reduite(ns * 2 * a, ds)}x+${a * a}$`;
                    break;
                case 8:
                    texte = `$\\left(${tex_fraction(ns, ds)}x-${a}\\right)^2$`; // (kx-a)² k rationnel 
                    texte_corr = `$\\left(${tex_fraction(ns, ds)}x-${a}\\right)^2=\\left(${tex_fraction(ns, ds)}x\\right)^2-2 \\times ${tex_fraction(ns, ds)}x \\times ${a} + ${a}^2=${tex_fraction(ns * ns, ds * ds)}x^2-${tex_fraction_reduite(ns * 2 * a, ds)}x+${a * a}$`;
                    break;
                case 9:
                    //  (bx-a)(bx+a) avec a entier et b rationnel simple
                    texte = `$\\left(${tex_fraction(ns, ds)}x-${a}\\right)\\left(${tex_fraction(ns, ds)}x+${a}\\right)$`; // b>1
                    texte_corr = `$\\left(${tex_fraction(ns, ds)}x-${a}\\right)\\left(${tex_fraction(ns, ds)}x+${a}\\right)=\\left(${tex_fraction(ns, ds)}x\\right)^2-${a}^2=${tex_fraction(ns * ns, ds * ds)}x^2-${a * a}$`;
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
    }
    this.besoin_formulaire_numerique = ['Niveau de difficulté', 3, '1 : Coefficient de x égal à 1\n 2 : Coefficient de x supérieur à 1\n 3 : Coefficient de x relatif'];
}
/**
 * Factoriser en utilisant les 3 identités remarquables 
* @auteur Jean-Claude Lhote
*/
function Factoriser_Identites_remarquables2() {
    'use strict';
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Factoriser avec les identités remarquables";
    this.consigne = "Factoriser les expressions suivantes.";
    this.nb_cols = 1;
    this.nb_cols_corr = 1;
    this.spacing = 1;
    this.spacing_corr = 1;
    this.nb_questions = 5;
    this.sup = 1;

    this.nouvelle_version = function (numero_de_l_exercice) {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées
        let liste_fractions = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5],
        [1, 6], [5, 6], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [1, 8], [3, 8], [5, 8], [7, 8],
        [1, 9], [2, 9], [4, 9], [5, 9], [7, 9], [8, 9], [1, 10], [3, 10], [7, 10], [9, 10]]
        let type_de_questions_disponibles = [];
        if (this.sup == 1) {
            type_de_questions_disponibles = [1, 2, 3] // coef de x = 1
        }
        else if (this.sup == 2) {
            type_de_questions_disponibles = [4, 5, 6]  // coef de x > 1
        }
        else { type_de_questions_disponibles = [7, 8, 9] }  // coef de x rationnel

        let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions)
        for (let i = 0, texte, texte_corr, cpt = 0, a, b, fraction = [], ns, ds, type_de_questions; i < this.nb_questions && cpt < 50;) {
            type_de_questions = liste_type_de_questions[i];
            a = randint(1, 9);
            b = randint(2, 9);
            fraction = choice(liste_fractions);
            ns = fraction[0]
            ds = fraction[1]
            switch (type_de_questions) {
                case 1:
                    texte = `$x^2+${2 * a}x+${a * a}$`; // (x+a)²
                    texte_corr = `$x^2+${2 * a}x+${a * a}=x^2+2 \\times ${a} \\times x+${a}^2=(x+${a})^2$`;
                    break;
                case 2:
                    texte = `$x^2-${2 * a}x+${a * a}$`  // (x-a)²
                    texte_corr = `$x^2-${2 * a}x+${a * a}=(x-${a})^2=x^2-2 \\times ${a} \\times x+${a}^2=(x-${a})^2$`;
                    break;
                case 3:
                    texte = `$x^2-${a * a}$`    // (x-a)(x+a)
                    texte_corr = `$x^2-${a * a}=x^2-${a}^2=(x-${a})(x+${a})$`;
                    break;
                case 4:
                    texte = `$${b * b}x^2+${2 * b * a}x+${a * a}$`; //(bx+a)²  b>1
                    texte_corr = `$${b * b}x^2+${2 * b * a}x+${a * a}=(${b}x)^2+2 \\times ${b}x \\times {a} + ${a}^2=(${b}x+${a})^2$`;
                    break;
                case 5:
                    texte = `$${b * b}x^2-${2 * b * a}x+${a * a}$`; //(bx-a)² b>1
                    texte_corr = `$${b * b}x^2-${2 * b * a}x+${a * a}=(${b}x)^2-2 \\times ${b}x \\times {a} + ${a}^2=(${b}x-${a})^2$`;
                    break;
                case 6:
                    texte = `$${b * b}x^2-${a * a}$`; //(bx-a)(bx+a) b>1
                    texte_corr = `$${b * b}x^2-${a * a}=(${b}x)^2-${a}^2=(${b}x-${a})(${b}x+${a})$`;
                    break;
                case 7:

                    texte = `$${tex_fraction(ns * ns, ds * ds)}x^2+${tex_fraction(2 * ns * a, ds)}x+${a * a}$`; // (kx+a)² k rationnel 
                    texte_corr = `$${tex_fraction(ns * ns, ds * ds)}x^2+${tex_fraction(ns * 2 * a, ds)}x+${a * a}=\\left(${tex_fraction(ns, ds)}x\\right)^2+2 \\times ${tex_fraction(ns, ds)}x \\times ${a} + ${a}^2=\\left(${tex_fraction(ns, ds)}x+${a}\\right)^2$`;
                    break;
                case 8:
                    texte = `$${tex_fraction(ns * ns, ds * ds)}x^2-${tex_fraction(2 * ns * a, ds)}x+${a * a}$`; // (kx-a)² k rationnel 
                    texte_corr = `$${tex_fraction(ns * ns, ds * ds)}x^2-${tex_fraction(ns * 2 * a, ds)}x+${a * a}=\\left(${tex_fraction(ns, ds)}x\\right)^2-2 \\times ${tex_fraction(ns, ds)}x \\times ${a} + ${a}^2=\\left(${tex_fraction(ns, ds)}x-${a}\\right)^2$`;
                    break;
                case 9:
                    //  (bx-a)(bx+a) avec a entier et b rationnel simple
                    texte = `$${tex_fraction(ns * ns, ds * ds)}x^2-${a * a}$`; // b>1
                    texte_corr = `$${tex_fraction(ns * ns, ds * ds)}x^2-${a * a}=\\left(${tex_fraction(ns, ds)}x\\right)^2-${a}^2=\\left(${tex_fraction(ns, ds)}x-${a}\\right)\\left(${tex_fraction(ns, ds)}x+${a}\\right)$`;
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
    }
    this.besoin_formulaire_numerique = ['Niveau de difficulté', 3, '1 : Coefficient de x égal à 1\n 2 : Coefficient de x supérieur à 1\n 3 : Coefficient de x rationnel'];
}
