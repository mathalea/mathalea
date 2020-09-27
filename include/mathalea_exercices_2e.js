
/**
 * @Auteur Stéphane Guyon
 */
function calcul_coordonnees_vecteurs(){
Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Déterminer les coordonnées d'un vecteur.";
   
    this.nb_questions = 2;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.sup = 1 ; // 
    this.nouvelle_version = function(numero_de_l_exercice)
    {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles = [1];
        
           
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) ;
    for (let i = 0, ux,uy,xA,yA,xB,yB,xC,yC,xD,yD,texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) 
    {
    type_de_questions = liste_type_de_questions[i];
    switch (type_de_questions){
                        // Cas par cas, on définit le type de nombres que l'on souhaite
                        // Combien de chiffres ? Quelles valeurs ?
            
                case 1 : 
        
                  
                    xA=randint(0,5)*choice([-1,1])
                    yA=randint(0,5)*choice([-1,1])
                    ux=randint(1,5)*choice([-1,1])
                    uy=randint(1,5)*choice([-1,1])
                    xB=xA+ux
                  
                    yB=yA+uy
                   
                   
                    texte =`Dans un repère orthonormé $(O,\\vec i,\\vec j)$, on donne les points suivants :`
                    texte +=` $A\\left(${xA};${yA}\\right)$ et $B\\left(${xB};${yB}\\right)$`
                    texte += `<br>Déterminer les coordonnées du vecteur $\\overrightarrow{AB}$ `;
                                   
                    
                   
                    texte_corr = `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d'un repère,`
                    texte_corr +=` <br>alors on a : $\\overrightarrow{AB}\\begin{pmatrix}x_B-x_A  \\\\y_B-y_A\\end{pmatrix}$<br>`
                    texte_corr +=` <br>On applique ici aux données de l'énoncé :`
                    texte_corr+=` $\\overrightarrow{AB}\\begin{pmatrix}${xB}-${ecriture_parenthese_si_negatif(xA)}  \\\\${yB}-${ecriture_parenthese_si_negatif(yA)}\\end{pmatrix}$<br>`
                    texte_corr+=`Ce qui donne au final : $\\overrightarrow{AB}\\begin{pmatrix}${xB-xA}  \\\\${yB-yA}\\end{pmatrix}$<br>` 
                   

                     ;   
                   break ;
             case 2 : 

                  
                   
                   break ;
  
            
            } 
            if (this.liste_questions.indexOf(texte)==-1)
                { // Si la question n'a jamais été posée, on en créé une autre
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
 * 2G12
 * @Auteur Stéphane Guyon
 */
function Nature_polygone(){
Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Déterminer la nature d'un polygone.";
   
    this.nb_questions = 2;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.sup = 1 ; // 
    this.nouvelle_version = function(numero_de_l_exercice)
    {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles = [1,2,3,4,5];
        
           
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) ;
    for (let i = 0, a,ux,uy,d,e,g,xA,yA,xB,yB,xC,yC,xD,yD,AB,XAB,YAB,XAC,YAC,XBC,YBC,AC,BC,XAD,YAD,AD,XDC,YDC,DC,t,l,xI0,xI1,yI0,yI1,xJ0,xJ1,yJ0,yJ1, A,B,C,D,T,L,P,texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) 
    {
    type_de_questions = liste_type_de_questions[i];
    switch (type_de_questions){
                        // Cas par cas, on définit le type de nombres que l'on souhaite
                        // Combien de chiffres ? Quelles valeurs ?
            
                case 1 : 
        
                  
                    xA=randint(0,5)*choice([-1,1])
                    yA=randint(0,5)*choice([-1,1])
                    ux=randint(1,5)*choice([-1,1])
                    uy=randint(1,5)*choice([-1,1])
                    xB=xA+ux
                  
                    yB=yA+uy
                   
                    xC=xA-uy
                    yC=yA+ux
                      XAB=(xB-xA)*(xB-xA)
                   YAB=(yB-yA)*(yB-yA);
                   AB=XAB+YAB;
                   XAC=(xC-xA)*(xC-xA)
                   YAC=(yC-yA)*(yC-yA)
                   XBC=(xC-xB)*(xC-xB)
                   YBC=(yC-yB)*(yC-yB)
                   AC=XAC+YAC;
                    texte =`Dans un repère orthonormé $(O,I,J)$, on donne les points suivants :`
                    texte +=` $A\\left(${xA};${yA}\\right)$ ; $B\\left(${xB};${yB}\\right)$ et $C\\left(${xC};${yC}\\right)$`
                    texte += `<br>Déterminer la nature du triangle $ABC$ `;
                                   
                    
                    texte_corr = `A partir du repère, on a envie de prouver que$ABC$ est un triangle isocèle en $A$.`
                    texte_corr +=`<br> On calcule donc séparément les distances $AB$ et $AC$ `
                    texte_corr += `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d'un repère orthonormé,`
                    texte_corr +=` alors on a : $AB=\\sqrt{\\left(x_B-x_A\\right)^{2}+\\left(y_B-y_A\\right)^{2}}$<br>`
                    texte_corr +=`On applique la relation à l'énoncé : $AB=\\sqrt{\\left(${xB}-${ecriture_parenthese_si_negatif(xA)}\\right)^{2}+\\left(${yB}-${ecriture_parenthese_si_negatif(yA)}\\right)^{2}}$<br>`
                    texte_corr += `$\\phantom{On applique la relation à l'énoncé :        } AB=\\sqrt{${XAB}+${YAB}}$<br>`
                    texte_corr +=`$\\phantom{On applique la relation à l'énoncé :        } AB=\\sqrt{${tex_nombre(XAB+YAB)}}$<br>`
                    if (AB%100==0 && AB!=100)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=10\\sqrt{${tex_nombre((AB))/100}}$<br>`}
                    if (AB%81==0 && AB!=81)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=9\\sqrt{${tex_nombre((AB))/81}}$<br>`}
                    if (AB%64==0 && AB!=64)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=8\\sqrt{${tex_nombre((AB))/64}}$<br>`}
                    if (AB%49==0 && AB!=49)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=7\\sqrt{${tex_nombre((AB))/49}}$<br>`}
                     if (AB%36==0&& AB!=36)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=6\\sqrt{${tex_nombre((AB))/36}}$<br>`}
                     if (AB%25==0 && AB!=25)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=5\\sqrt{${tex_nombre((AB))/25}}$<br>`}
                     if (AB%64!=0 && AB%16==0&& AB!=16)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=4\\sqrt{${tex_nombre((AB))/16}}$<br>`}
                    if (AB%81!=0 && AB%9==0 && AB!=9)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=3\\sqrt{${tex_nombre((AB))/9}}$<br>`}
                    if (AB%16!=0 && AB%64!==0 &&AB%4==0 && AB!=4)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=2\\sqrt{${tex_nombre((AB))/4}}$<br>`}
                      if (AB==100)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=10$<br>`}
                    if (AB==81)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=9$<br>`}
                      if (AB==64)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=8$<br>`}
                      if (AB==49)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=7$<br>`}
                      if (AB==36)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=6$<br>`}
                      if (AB==25)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=5$<br>`}
                      if (AB==16)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=4$<br>`}
                      if (AB==9)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=3$<br>`}
                      if (AB==4)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=2$<br>`}
                      if (AB==1)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=1$<br>`}

                    texte_corr +=`De même : $AC=\\sqrt{\\left(${xC}-${ecriture_parenthese_si_negatif(xA)}\\right)^{2}+\\left(${yC}-${ecriture_parenthese_si_negatif(yA)}\\right)^{2}}$<br>`
                    texte_corr += `$\\phantom{De même :       } AC=\\sqrt{${XAC}+${YAC}}$<br>`
                    texte_corr +=`$\\phantom{De même :       } AC=\\sqrt{${tex_nombre(XAC+YAC)}}$<br>`
                    if (AC%100==0 && AC!=100)
                        { texte_corr +=`$\\phantom{De même :  } AC=10\\sqrt{${tex_nombre((AC))/100}}$<br>`}
                    if (AC%81==0 && AC!=81)
                        { texte_corr +=`$\\phantom{De même :  } AC=9\\sqrt{${tex_nombre((AC))/81}}$<br>`}
                    if (AC%64==0 && AC!=64)
                        { texte_corr +=`$\\phantom{De même :  } AC=8\\sqrt{${tex_nombre((AC))/64}}$<br>`}
                    if (AC%49==0 && AC!=49)
                        { texte_corr +=`$\\phantom{De même :  } AC=7\\sqrt{${tex_nombre((AC))/49}}$<br>`}
                     if (AC%36==0&& AC!=36)
                        { texte_corr +=`$\\phantom{De même :  } AC=6\\sqrt{${tex_nombre((AC))/36}}$<br>`}
                     if (AC%25==0 && AC!=25)
                        { texte_corr +=`$\\phantom{De même :  } AC=5\\sqrt{${tex_nombre((AC))/25}}$<br>`}
                     if (AC%64!=0 && AC%16==0&& AC!=16)
                        { texte_corr +=`$\\phantom{De même :  } AC=4\\sqrt{${tex_nombre((AC))/16}}$<br>`}
                    if (AC%81!=0 && AC%9==0 && AC!=9)
                        { texte_corr +=`$\\phantom{De même :  } AC=3\\sqrt{${tex_nombre((AC))/9}}$<br>`}
                    if (AC%16!=0 && AC%64!==0 &&AC%4==0 && AC!=4)
                        { texte_corr +=`$\\phantom{De même :  } AC=2\\sqrt{${tex_nombre((AC))/4}}$<br>`}
                      if (AC==100)
                        { texte_corr +=`$\\phantom{De même :  } AC=10$<br>`}
                    if (AC==81)
                        { texte_corr +=`$\\phantom{De même :  } AC=9$<br>`}
                      if (AC==64)
                        { texte_corr +=`$\\phantom{De même :  } AC=8$<br>`}
                      if (AC==49)
                        { texte_corr +=`$\\phantom{De même :  } AC=7$<br>`}
                      if (AC==36)
                        { texte_corr +=`$\\phantom{De même :  } AC=6$<br>`}
                      if (AC==25)
                        { texte_corr +=`$\\phantom{De même :  } AC=5$<br>`}
                      if (AC==16)
                        { texte_corr +=`$\\phantom{De même :  } AC=4$<br>`}
                      if (AC==9)
                        { texte_corr +=`$\\phantom{De même :  } AC=3$<br>`}
                      if (AC==4)
                        { texte_corr +=`$\\phantom{De même :  } AC=2$<br>`}
                      if (AC==1)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AC=1$<br>`}

                    texte_corr +=`On observe que $AC=AB$ donc le triangle $ABC$ est isocèle.`
                    texte_corr +=`<br>On calcule $BC$ pour vérifier s'il est ou non  équilatéral.`
                    texte_corr +=`<br>On obtient : $BC=\\sqrt{${XBC}+${YBC}}=\\sqrt{${tex_nombre(XBC+YBC)}}$<br>`
                     if (XBC+YBC==XAB+YAB){texte_corr+=`Le triangle $ABC$ est équilatéral.`}
                        else {texte_corr +=`Le triangle $ABC$ est simplement isocèle, il n'est pas équilatéral.`}

                     ;   
                   break ;
             case 2 : 

                  
                    xA=randint(0,5)*choice([-1,1])
                    yA=randint(0,5)*choice([-1,1])
                    ux=randint(1,5)*choice([-1,1])
                    uy=randint(1,5)*choice([-1,1])
                    xB=xA+ux;
                    yB=yA+uy;
                    xC=xA-uy;
                    yC=yA+ux;
                      XAB=(xB-xA)*(xB-xA)
                   YAB=(yB-yA)*(yB-yA);
                   AB=XAB+YAB;
                   XAC=(xC-xA)*(xC-xA)
                   YAC=(yC-yA)*(yC-yA)
                   XBC=(xC-xB)*(xC-xB)
                   YBC=(yC-yB)*(yC-yB)
                   AC=XAC+YAC;
                    texte =`Dans un repère orthonormé $(O,I,J)$, on donne les points suivants :`
                    texte +=` $A\\left(${xA};${yA}\\right)$ ; $B\\left(${xB};${yB}\\right)$ et $C\\left(${xC};${yC}\\right)$`
                    texte += `<br>Déterminer la nature du triangle $ABC$ `;
       
                                   
                    
                    texte_corr = `A partir du repère, on a envie de prouver que$ABC$ est un triangle rectangle en $A$.`
                      texte_corr +=`<br> Pour vérifier que le triangle est rectabgle, on va utiliser la réciproque du théorème de Pythagore.`
                    texte_corr +=`<br> On calcule donc séparément les distances $AB^{2}$ ; $AC^{2}$ et $BC^{2}$ pour vérifier si $BC^{2}=AB^{2}+AC^{2}$ .`
                    texte_corr += `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d'un repère orthonormé,`
                    texte_corr +=` alors on a : $AB^{2}=\\left(x_B-x_A\\right)^{2}+\\left(y_B-y_A\\right)^{2}$<br>`
                    texte_corr +=`On applique la relation à l'énoncé : $AB^{2}=\\left(${xB}-${ecriture_parenthese_si_negatif(xA)}\\right)^{2}+\\left(${yB}-${ecriture_parenthese_si_negatif(yA)}\\right)^{2}$<br>`
                    texte_corr += `$\\phantom{On applique la relation à l'énoncé :        } AB^{2}={${XAB}+${YAB}}$<br>`
                    texte_corr +=`$\\phantom{On applique la relation à l'énoncé :        } AB^{2}={${tex_nombre(XAB+YAB)}}$<br>`
                   
                    texte_corr +=`De même : $AC^{2}={\\left(${xC}-${ecriture_parenthese_si_negatif(xA)}\\right)^{2}+\\left(${yC}-${ecriture_parenthese_si_negatif(yA)}\\right)^{2}}$<br>`
                    texte_corr += `$\\phantom{De même :       } AC^{2}={${XAC}+${YAC}}$<br>`
                    texte_corr +=`$\\phantom{De même :       } AC^{2}={${tex_nombre(XAC+YAC)}}$<br>`
               
                    texte_corr +=`Enfin : $BC^{2}={\\left(${xB}-${ecriture_parenthese_si_negatif(xB)}\\right)^{2}+\\left(${yC}-${ecriture_parenthese_si_negatif(yB)}\\right)^{2}}$<br>`
                    texte_corr += `$\\phantom{De même :       } BC^{2}={${XBC}+${YBC}}$<br>`
                    texte_corr +=`$\\phantom{De même :       } BC^{2}={${tex_nombre(XBC+YBC)}}$<br>`
                    texte_corr +=`On observe que $AC^{2}+AB^{2}=${tex_nombre(XAC+YAC+XAB+YAB)} ~~et~~ BC^{2}={${tex_nombre(XBC+YBC)}}$.`
                    texte_corr +=`<br>On en déduit que $BC^{2}=AC^{2}+AB^{2}$.`
                    texte_corr +=`<br>D'après la réciproque du théorème de Pythagore,  le triangle ABC est rectangle en A.`                     ;   
                   break ;
            case 3:
                   xA=randint(0,9)*choice([-1,1])
                   yA=randint(0,9)*choice([-1,1])
                   ux=randint(1,5)*choice([-1,1])
                   uy=randint(1,5)*choice([-1,1])
                   xB=xA+ux
                   yB=yA+uy
                   xC=xA-ux
                   yC=yA-uy
                   xD=xC+ux
                   yD=yC+uy
                   xI0= fraction_simplifiee(xA+xD,2)[0]
                   xI1= fraction_simplifiee(xA+xD,2)[1]
                   yI0= fraction_simplifiee(yA+yD,2)[0]
                   yI1= fraction_simplifiee(yA+yD,2)[1]
                   xJ0= fraction_simplifiee(xB+xC,2)[0]
                   xJ1= fraction_simplifiee(xB+xC,2)[1]
                   yJ0= fraction_simplifiee(yB+yC,2)[0]
                   yJ1= fraction_simplifiee(yB+yC,2)[1]
                   XAB=(xB-xA)*(xB-xA)
                   YAB=(yB-yA)*(yB-yA);
                   AB=XAB+YAB;
                   XAD=(xD-xA)*(xD-xA)
                   YAD=(yD-yA)*(yD-yA);
                   AD=XAD+YAD;
                     XAC=(xC-xA)*(xC-xA)
                   YAC=(yC-yA)*(yC-yA)
                     AC=XAC+YAC;
                       g =grille(-9,-9,9,9)               
                    A = point(xA,yA,'A','red')
                    B = point(xB,yB,'B','red')
                    a=axes(xmin=-9,ymin=-9,xmax=9,ymax=9,thick=.2,step=1)
                    s = segment(A,B,'blue')
                    T=tracePoint(A,B) // Repère les points avec une croix
                    L=labelPoint(A,B)
                 
                
                    texte =`Dans un repère orthonormé (O,I,J), on donne les 4 points suivants :<br>`
                    texte +=` $A\\left(${xA};${yA}\\right)$ ; $B\\left(${xB};${yB}\\right).$`
                    texte +=` $C\\left(${xC};${yC}\\right)$ ; $D\\left(${xD};${yD}\\right).$`
                    texte += `<br>Démontrer que $ABDC$ est un losange.`;
                                   
                    texte_corr = `<br>Pour prouver que $ABDC$ est un losange, il y a deux stratégies :<br>`
                    texte_corr +=`$~~~~~~~~$<B>1.</B> On calcule les quatre longueurs du quadrilatère et on prouve leur égalité.<br>`
                    texte_corr+=`$\\phantom{~~~~~~~~}$Un quadrilatère qui possède quatre côtés de même longueur est un losange.<br>`
                    texte_corr+=`$~~~~~~~~$<B>2. </B> On prouve que $ABDC$ est un parallélogramme, puis il sufit de prouver qu'il possède deux côtés consécutifs de même longueur.<br>`
                    texte_corr+=`$\\phantom{~~~~~~~~}$ Un parallélogramme qui possède deux côtés consécutifs de même longueur est un losange`
                    texte_corr+=`<br>Les deux démonstrations se valent. On choisit ici la <B>démonstration n°2</B>, plus variée, mais la n°1 est valable.<br>`
                    texte_corr+=`<B>Démonstration :</B><br>`
                    texte_corr+=`On veut prouver que $ABDC$ est un parallélogramme :`
                    texte_corr += `<br>On sait que ABDC est un parallélogramme si et seulement si ses diagonales se coupent en leur milieu.`
                    texte_corr += `<br>On cherche donc les coordonnées du milieu de chacune des deux diagonales du quadrilatère, pour prouver qu'elles sont identiques. :`
                    texte_corr += `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $D(x_D;y_D)$ sont deux points d'un repère ,`
                    texte_corr +=`<br> alors les coordonnées du point $I$ milieu de $[AD]$ sont `
                    texte_corr +=`$I\\left(\\dfrac{x_A+x_D}{2};\\dfrac{y_A+y_D}{2}\\right)$ <br>`
                    texte_corr +=`On applique la relation à l'énoncé : `
                    texte_corr +=`$\\begin{cases}x_I=\\dfrac{${xA}+${ecriture_parenthese_si_negatif(xD)}}{2} \\\\ y_I=\\dfrac{${yA}+${ecriture_parenthese_si_negatif(yD)}}{2}\\end{cases}$`
                    texte_corr += `<br>On en déduit :  $\\begin{cases}x_I=\\dfrac{${tex_nombre(xA+xD)}}{2}\\\\y_I=\\dfrac{${tex_nombre(yA+yD)}}{2}\\end{cases}$`
                    if (xI1!=1 && yI1!=1) {texte_corr += `  <br>Ce qui donne au final : $ I\\left(\\dfrac{${xI0}}{${xI1}};\\dfrac{${yI0}}{${yI1}};\\right)$`}
                    if (xI1==1 && yI1!=1) {texte_corr += `  <br>Ce qui donne au final : $ I\\left(${xI0};\\dfrac{${yI0}}{${yI1}}\\right)$`}
                    if (xI1!=1 && yI1==1) {texte_corr += `  <br>Ce qui donne au final : $ I\\left(\\dfrac{${xI0}}{${xI1}};${yI0}\\right)$`}
                    if (xI1==1 && yI1==1) {texte_corr += `  <br>Ce qui donne au final : $ I\\left(${xI0};${yI0}\\right)$`}
                   texte_corr +=`<br> Les coordonnées du point $J$ milieu de $[BC]$ sont `
                    texte_corr +=`$J\\left(\\dfrac{x_B+x_C}{2};\\dfrac{y_B+y_C}{2}\\right)$ <br>`
                    texte_corr +=`On applique la relation à l'énoncé : `
                    texte_corr +=`$\\begin{cases}x_J=\\dfrac{${xB}+${ecriture_parenthese_si_negatif(xC)}}{2} \\\\ y_J=\\dfrac{${yB}+${ecriture_parenthese_si_negatif(yC)}}{2}\\end{cases}$`
                    texte_corr += `<br>On en déduit :  $\\begin{cases}x_J=\\dfrac{${tex_nombre(xB+xC)}}{2}\\\\y_J=\\dfrac{${tex_nombre(yB+yC)}}{2}\\end{cases}$`
                    if (xJ1!=1 && yJ1!=1) {texte_corr += `  <br>Ce qui donne au final : $ J\\left(\\dfrac{${xJ0}}{${xJ1}};\\dfrac{${yJ0}}{${yJ1}};\\right)$`}
                    if (xJ1==1 && yJ1!=1) {texte_corr += `  <br>Ce qui donne au final : $ J\\left(${xJ0};\\dfrac{${yJ0}}{${yJ1}}\\right)$`}
                    if (xJ1!=1 && yJ1==1) {texte_corr += `  <br>Ce qui donne au final : $ J\\left(\\dfrac{${xJ0}}{${xJ1}};${yJ0}\\right)$`}
                    if (xJ1==1 && yJ1==1) {texte_corr += `  <br>Ce qui donne au final : $ J\\left(${xJ0};${yJ0}\\right)$`}
                     texte_corr += `<br>On observe que $I$ et $J$ ont les mêmes coordonnées, donc les deux diagonales du quadrilatère se coupent en leur milieu.`
                    texte_corr += `<br>$ABDC$ est donc un parallélogramme.`
                    texte_corr += `<br>On calcule maintenant deux cotés consécutifs : $AB$ et $AC$ par exemple.`
                    texte_corr += `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d'un repère orthonormé,`
                    texte_corr +=` alors on a : $AB=\\sqrt{\\left(x_B-x_A\\right)^{2}+\\left(y_B-y_A\\right)^{2}}.$<br>`
                    texte_corr +=`On applique la relation à l'énoncé : $AB=\\sqrt{\\left(${xB}-${ecriture_parenthese_si_negatif(xA)}\\right)^{2}+\\left(${yB}-${ecriture_parenthese_si_negatif(yA)}\\right)^{2}}$<br>`
                    texte_corr += `$\\phantom{On applique la relation à l'énoncé :        } AB=\\sqrt{${XAB}+${YAB}}$<br>`
                    texte_corr +=`$\\phantom{On applique la relation à l'énoncé :        } AB=\\sqrt{${tex_nombre(XAB+YAB)}}$<br>`
                    if (AB%100==0 && AB!=100)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=10\\sqrt{${tex_nombre((AB))/100}}$<br>`}
                    if (AB%81==0 && AB!=81)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=9\\sqrt{${tex_nombre((AB))/81}}$<br>`}
                    if (AB%64==0 && AB!=64)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=8\\sqrt{${tex_nombre((AB))/64}}$<br>`}
                    if (AB%49==0 && AB!=49)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=7\\sqrt{${tex_nombre((AB))/49}}$<br>`}
                     if (AB%36==0&& AB!=36)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=6\\sqrt{${tex_nombre((AB))/36}}$<br>`}
                     if (AB%25==0 && AB!=25)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=5\\sqrt{${tex_nombre((AB))/25}}$<br>`}
                     if (AB%64!=0 && AB%16==0&& AB!=16)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=4\\sqrt{${tex_nombre((AB))/16}}$<br>`}
                    if (AB%81!=0 && AB%9==0 && AB!=9)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=3\\sqrt{${tex_nombre((AB))/9}}$<br>`}
                    if (AB%16!=0 && AB%64!==0 &&AB%4==0 && AB!=4)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=2\\sqrt{${tex_nombre((AB))/4}}$<br>`}
                      if (AB==100)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=10$<br>`}
                    if (AB==81)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=9$<br>`}
                      if (AB==64)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=8$<br>`}
                      if (AB==49)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=7$<br>`}
                      if (AB==36)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=6$<br>`}
                      if (AB==25)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=5$<br>`}
                      if (AB==16)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=4$<br>`}
                      if (AB==9)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=3$<br>`}
                      if (AB==4)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=2$<br>`}
                     if (AB==1)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=1$<br>`}
                     texte_corr +=`On procède de même pour $AC$: $AC=\\sqrt{\\left(${xC}-${ecriture_parenthese_si_negatif(xA)}\\right)^{2}+\\left(${yC}-${ecriture_parenthese_si_negatif(yA)}\\right)^{2}}$<br>`
                    texte_corr += `$\\phantom{On applique la relation à l'énoncé :        } AC=\\sqrt{${XAC}+${YAC}}$<br>`
                    texte_corr +=`$\\phantom{On applique la relation à l'énoncé :        } AC=\\sqrt{${tex_nombre(XAC+YAC)}}$<br>`
                    if (AC%100==0 && AC!=100)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AC=10\\sqrt{${tex_nombre((AC))/100}}$<br>`}
                    if (AC%81==0 && AC!=81)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AC=9\\sqrt{${tex_nombre((AC))/81}}$<br>`}
                    if (AC%64==0 && AC!=64)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AC=8\\sqrt{${tex_nombre((AC))/64}}$<br>`}
                    if (AC%49==0 && AC!=49)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AC=7\\sqrt{${tex_nombre((AC))/49}}$<br>`}
                     if (AC%36==0&& AC!=36)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AC=6\\sqrt{${tex_nombre((AC))/36}}$<br>`}
                     if (AC%25==0 && AC!=25)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AC=5\\sqrt{${tex_nombre((AC))/25}}$<br>`}
                     if (AC%64!=0 && AC%16==0&& AC!=16)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AC=4\\sqrt{${tex_nombre((AC))/16}}$<br>`}
                    if (AC%81!=0 && AC%9==0 && AC!=9)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AC=3\\sqrt{${tex_nombre((AC))/9}}$<br>`}
                    if (AC%16!=0 && AC%64!==0 &&AC%4==0 && AC!=4)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AC=2\\sqrt{${tex_nombre((AC))/4}}$<br>`}
                      if (AC==100)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AC=10$<br>`}
                    if (AC==81)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AC=9$<br>`}
                      if (AC==64)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AC=8$<br>`}
                      if (AC==49)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AC=7$<br>`}
                      if (AC==36)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AC=6$<br>`}
                      if (AC==25)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AC=5$<br>`}
                      if (AC==16)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AC=4$<br>`}
                      if (AC==9)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AC=3$<br>`}
                      if (AC==4)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AC=2$<br>`}
                     if (AD==1)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AC=1$<br>`}
                      texte_corr +=`<br>On observe que $AB=AC$, $ABDC$ est donc bien un losange.`
                  ;
               break;
                case 4:
                   xA=randint(0,6)*choice([-1,1])
                   yA=randint(0,6)*choice([-1,1])
                   ux=randint(1,3)*choice([-1,1])
                   uy=randint(1,3)*choice([-1,1])
                   a=randint(2,4)
                   xB=xA+ux*a
                   yB=yA+uy*a
                   xC=xA-uy
                   yC=yA+ux
                   xD=xC+ux*a
                   yD=yC+uy*a
                                  
                   xI0= fraction_simplifiee(xA+xD,2)[0]
                   xI1= fraction_simplifiee(xA+xD,2)[1]
                   yI0= fraction_simplifiee(yA+yD,2)[0]
                   yI1= fraction_simplifiee(yA+yD,2)[1]
                   xJ0= fraction_simplifiee(xB+xC,2)[0]
                   xJ1= fraction_simplifiee(xB+xC,2)[1]
                   yJ0= fraction_simplifiee(yB+yC,2)[0]
                   yJ1= fraction_simplifiee(yB+yC,2)[1]
                   XAB=(xB-xA)*(xB-xA)
                   YAB=(yB-yA)*(yB-yA);
                   AB=XAB+YAB;
                    XAC=(xC-xA)*(xC-xA)
                   YAC=(yC-yA)*(yC-yA);
                   AC=XAC+YAC;
                   XAD=(xD-xA)*(xD-xA)
                   YAD=(yD-yA)*(yD-yA);
                   AD=XAD+YAD;
                   XBC=(xB-xC)*(xB-xC)
                   YBC=(yB-yC)*(yB-yC);
                   BC=XBC+YBC;
                       g =grille(-9,-9,9,9)               
                    A = point(xA,yA,'A','red')
                    B = point(xB,yB,'B','red')
                    a=axes(xmin=-9,ymin=-9,xmax=9,ymax=9,thick=.2,step=1)
                    s = segment(A,B,'blue')
                    T=tracePoint(A,B) // Repère les points avec une croix
                    L=labelPoint(A,B)
                 
                
                    texte =`Dans un repère orthonormé (O,I,J), on donne les 4 points suivants :<br>`
                    texte +=` $A\\left(${xA};${yA}\\right)$ ; $B\\left(${xB};${yB}\\right).$`
                    texte +=` $C\\left(${xC};${yC}\\right)$ ; $D\\left(${xD};${yD}\\right).$`
                    texte += `<br>Démontrer que $ABDC$ est un rectangle.`;
                                   
                    texte_corr = `<br>Pour prouver que $ABDC$ est un rectangle, il y a pluieurs stratégies :<br>`
                    texte_corr +=`$~~~~~~~~$<B>1.</B> On prouve avec la réciproque du théorème de Pythagore que $ABDC$ possède un angle droit,<br>`
                    texte_corr+=`$puis on prouve qu'il a ses côtés opposés de même longueur.<br>`
                    texte_corr+=`$~~~~~~~~$<B>2. </B> On prouve que $ABDC$ est un parallélogramme, puis il sufit de prouver que ses diagonales sont de même longueur.<br>`
                    texte_corr+=`$\\phantom{~~~~~~~~}$ Un parallélogramme qui a ses diagonales de même longueur est un rectangle.`
                    texte_corr+=`<br>Plusiurs démonstrations se valent. On choisit ici la <B>démonstration n°2</B>, mais d'autres idées sont valables.<br>`
                    texte_corr+=`<B>Démonstration :</B><br>`
                    texte_corr+=`On veut prouver que $ABDC$ est un parallélogramme :`
                    texte_corr += `<br>On sait que $ABDC$ est un parallélogramme si et seulement si ses diagonales se coupent en leur milieu.`
                    texte_corr += `<br>On cherche donc les coordonnées du milieu de chacune des deux diagonales du quadrilatère, pour prouver qu'elles sont identiques. :`
                    texte_corr += `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $D(x_D;y_D)$ sont deux points d'un repère ,`
                    texte_corr +=`<br> alors les coordonnées du point $I$ milieu de $[AD]$ sont `
                    texte_corr +=`$I\\left(\\dfrac{x_A+x_D}{2};\\dfrac{y_A+y_D}{2}\\right)$ <br>`
                    texte_corr +=`On applique la relation à l'énoncé : `
                    texte_corr +=`$\\begin{cases}x_I=\\dfrac{${xA}+${ecriture_parenthese_si_negatif(xD)}}{2} \\\\ y_I=\\dfrac{${yA}+${ecriture_parenthese_si_negatif(yD)}}{2}\\end{cases}$`
                    texte_corr += `<br>On en déduit :  $\\begin{cases}x_I=\\dfrac{${tex_nombre(xA+xD)}}{2}\\\\y_I=\\dfrac{${tex_nombre(yA+yD)}}{2}\\end{cases}$`
                    if (xI1!=1 && yI1!=1) {texte_corr += `  <br>Ce qui donne au final : $ I\\left(\\dfrac{${xI0}}{${xI1}};\\dfrac{${yI0}}{${yI1}};\\right)$`}
                    if (xI1==1 && yI1!=1) {texte_corr += `  <br>Ce qui donne au final : $ I\\left(${xI0};\\dfrac{${yI0}}{${yI1}}\\right)$`}
                    if (xI1!=1 && yI1==1) {texte_corr += `  <br>Ce qui donne au final : $ I\\left(\\dfrac{${xI0}}{${xI1}};${yI0}\\right)$`}
                    if (xI1==1 && yI1==1) {texte_corr += `  <br>Ce qui donne au final : $ I\\left(${xI0};${yI0}\\right)$`}
                   texte_corr +=`<br> Les coordonnées du point $J$ milieu de $[BC]$ sont `
                    texte_corr +=`$J\\left(\\dfrac{x_B+x_C}{2};\\dfrac{y_B+y_C}{2}\\right)$ <br>`
                    texte_corr +=`On applique la relation à l'énoncé : `
                    texte_corr +=`$\\begin{cases}x_J=\\dfrac{${xB}+${ecriture_parenthese_si_negatif(xC)}}{2} \\\\ y_J=\\dfrac{${yB}+${ecriture_parenthese_si_negatif(yC)}}{2}\\end{cases}$`
                    texte_corr += `<br>On en déduit :  $\\begin{cases}x_J=\\dfrac{${tex_nombre(xB+xC)}}{2}\\\\y_J=\\dfrac{${tex_nombre(yB+yC)}}{2}\\end{cases}$`
                    if (xJ1!=1 && yJ1!=1) {texte_corr += `  <br>Ce qui donne au final : $ J\\left(\\dfrac{${xJ0}}{${xJ1}};\\dfrac{${yJ0}}{${yJ1}};\\right)$`}
                    if (xJ1==1 && yJ1!=1) {texte_corr += `  <br>Ce qui donne au final : $ J\\left(${xJ0};\\dfrac{${yJ0}}{${yJ1}}\\right)$`}
                    if (xJ1!=1 && yJ1==1) {texte_corr += `  <br>Ce qui donne au final : $ J\\left(\\dfrac{${xJ0}}{${xJ1}};${yJ0}\\right)$`}
                    if (xJ1==1 && yJ1==1) {texte_corr += `  <br>Ce qui donne au final : $ J\\left(${xJ0};${yJ0}\\right)$`}
                     texte_corr += `<br>On observe que $I$ et $J$ ont les mêmes coordonnées, donc les deux diagonales du quadrilatère se coupent en leur milieu.`
                    texte_corr += `<br>$ABDC$ est donc un parallélogramme.`
                    texte_corr += `<br>On calcule maintenant les diagonales de $ABDC$ : $AD$ et $BC$ par exemple.`
                    texte_corr += `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $D(x_D;y_D)$ sont deux points d'un repère orthonormé,`
                    texte_corr +=` alors on a : $AD=\\sqrt{\\left(x_D-x_A\\right)^{2}+\\left(y_D-y_A\\right)^{2}}.$<br>`
                    texte_corr +=`On applique la relation à l'énoncé : $AD=\\sqrt{\\left(${xD}-${ecriture_parenthese_si_negatif(xA)}\\right)^{2}+\\left(${yD}-${ecriture_parenthese_si_negatif(yA)}\\right)^{2}}$<br>`
                    texte_corr += `$\\phantom{On applique la relation à l'énoncé :        } AD=\\sqrt{${XAD}+${YAD}}$<br>`
                    texte_corr +=`$\\phantom{On applique la relation à l'énoncé :        } AD=\\sqrt{${tex_nombre(XAD+YAD)}}$<br>`
                    if (AD%100==0 && AD!=100)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=10\\sqrt{${tex_nombre((AD))/100}}$<br>`}
                    if (AD%81==0 && AD!=81)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=9\\sqrt{${tex_nombre((AD))/81}}$<br>`}
                    if (AD%64==0 && AD!=64)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=8\\sqrt{${tex_nombre((AD))/64}}$<br>`}
                    if (AD%49==0 && AD!=49)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=7\\sqrt{${tex_nombre((AD))/49}}$<br>`}
                     if (AD%36==0&& AD!=36)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=6\\sqrt{${tex_nombre((AD))/36}}$<br>`}
                     if (AD%25==0 && AD!=25)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=5\\sqrt{${tex_nombre((AD))/25}}$<br>`}
                     if (AD%64!=0 && AD%16==0&& AD!=16)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=4\\sqrt{${tex_nombre((AD))/16}}$<br>`}
                    if (AD%81!=0 && AD%9==0 && AD!=9)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=3\\sqrt{${tex_nombre((AD))/9}}$<br>`}
                    if (AD%16!=0 && AD%64!==0 &&AD%4==0 && AD!=4)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=2\\sqrt{${tex_nombre((AD))/4}}$<br>`}
                      if (AD==100)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=10$<br>`}
                    if (AD==81)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=9$<br>`}
                      if (AD==64)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=8$<br>`}
                      if (AD==49)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=7$<br>`}
                      if (AD==36)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=6$<br>`}
                      if (AD==25)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=5$<br>`}
                      if (AD==16)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=4$<br>`}
                      if (AD==9)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=3$<br>`}
                      if (AD==4)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=2$<br>`}
                     if (AD==1)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=1$<br>`}
                     texte_corr +=`On procède de même pour $BC$: $BC=\\sqrt{\\left(${xC}-${ecriture_parenthese_si_negatif(xB)}\\right)^{2}+\\left(${yC}-${ecriture_parenthese_si_negatif(yB)}\\right)^{2}}$<br>`
                    texte_corr += `$\\phantom{On applique la relation à l'énoncé :        } BC=\\sqrt{${XBC}+${YBC}}$<br>`
                    texte_corr +=`$\\phantom{On applique la relation à l'énoncé :        } BC=\\sqrt{${tex_nombre(XBC+YBC)}}$<br>`
                    if (BC%100==0 && BC!=100)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=10\\sqrt{${tex_nombre((BC))/100}}$<br>`}
                    if (BC%81==0 && BC!=81)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=9\\sqrt{${tex_nombre((BC))/81}}$<br>`}
                    if (BC%64==0 && BC!=64)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=8\\sqrt{${tex_nombre((BC))/64}}$<br>`}
                    if (BC%49==0 && BC!=49)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=7\\sqrt{${tex_nombre((BC))/49}}$<br>`}
                     if (BC%36==0&& BC!=36)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=6\\sqrt{${tex_nombre((BC))/36}}$<br>`}
                     if (BC%25==0 && BC!=25)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=5\\sqrt{${tex_nombre((BC))/25}}$<br>`}
                     if (BC%64!=0 && BC%16==0&& BC!=16)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=4\\sqrt{${tex_nombre((BC))/16}}$<br>`}
                    if (BC%81!=0 && BC%9==0 && BC!=9)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=3\\sqrt{${tex_nombre((BC))/9}}$<br>`}
                    if (BC%16!=0 && BC%64!==0 &&BC%4==0 && BC!=4)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=2\\sqrt{${tex_nombre((BC))/4}}$<br>`}
                      if (BC==100)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=10$<br>`}
                    if (BC==81)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=9$<br>`}
                      if (BC==64)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=8$<br>`}
                      if (BC==49)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=7$<br>`}
                      if (BC==36)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=6$<br>`}
                      if (BC==25)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=5$<br>`}
                      if (BC==16)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=4$<br>`}
                      if (BC==9)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=3$<br>`}
                      if (BC==4)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=2$<br>`}
                     if (BC==1)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=1$<br>`}
                      texte_corr +=`<br>On observe que $BC=AD$, $ABDC$ est donc bien un rectangle.`
                        
                  ;
               break;
             case 5:
                   xA=randint(0,9)*choice([-1,1])
                   yA=randint(0,9)*choice([-1,1])
                   ux=randint(1,9)*choice([-1,1])
                   uy=randint(1,9)*choice([-1,1])
                   xB=xA+ux
                   yB=yA+uy
                   xC=xA-uy
                   yC=yA+ux
                   xD=xC+ux
                   yD=yC+uy
                                  
                   xI0= fraction_simplifiee(xA+xD,2)[0]
                   xI1= fraction_simplifiee(xA+xD,2)[1]
                   yI0= fraction_simplifiee(yA+yD,2)[0]
                   yI1= fraction_simplifiee(yA+yD,2)[1]
                   xJ0= fraction_simplifiee(xB+xC,2)[0]
                   xJ1= fraction_simplifiee(xB+xC,2)[1]
                   yJ0= fraction_simplifiee(yB+yC,2)[0]
                   yJ1= fraction_simplifiee(yB+yC,2)[1]
                   XAB=(xB-xA)*(xB-xA)
                   YAB=(yB-yA)*(yB-yA);
                   AB=XAB+YAB;
                    XAC=(xC-xA)*(xC-xA)
                   YAC=(yC-yA)*(yC-yA);
                   AC=XAC+YAC;
                   XAD=(xD-xA)*(xD-xA)
                   YAD=(yD-yA)*(yD-yA);
                   AD=XAD+YAD;
                   XBC=(xB-xC)*(xB-xC)
                   YBC=(yB-yC)*(yB-yC);
                   BC=XBC+YBC;
                       g =grille(-9,-9,9,9)               
                    A = point(xA,yA,'A','red')
                    B = point(xB,yB,'B','red')
                    a=axes(xmin=-9,ymin=-9,xmax=9,ymax=9,thick=.2,step=1)
                    s = segment(A,B,'blue')
                    T=tracePoint(A,B) // Repère les points avec une croix
                    L=labelPoint(A,B)
                 
                
                    texte =`Dans un repère orthonormé (O,I,J), on donne les 4 points suivants :<br>`
                    texte +=` $A\\left(${xA};${yA}\\right)$ ; $B\\left(${xB};${yB}\\right).$`
                    texte +=` $C\\left(${xC};${yC}\\right)$ ; $D\\left(${xD};${yD}\\right).$`
                    texte += `<br>Démontrer que $ABDC$ est un carré.`;
                                   
                    texte_corr = `<br>Pour prouver que $ABDC$ est un carré, il y a pluieurs stratégies :<br>`
                    texte_corr +=`Dans cette correction, on propose de procéder par étapes :<br>`
                    texte_corr+=`On va prouver d'abord que $ABDC$ est un parallélogramme en utilisant les milieux des diagonales.<br>`
                    texte_corr+=`puis on prouvera qu'il est un rectangle en comparant ses diagonales.<br>`
                    texte_corr+=`<br>Enfin, en vérifiant qu'il a deux côtés consécutifs de même longueur, on aura prouvé qu'il est un carré. `

                    texte_corr+=`<br><B>Démonstration :</B><br>`
                    texte_corr+=`<B>1. On prouve que $ABDC$ est un parallélogramme :</B>`
                    texte_corr += `<br>On sait que $ABDC$ est un parallélogramme si et seulement si ses diagonales se coupent en leur milieu.`
                    texte_corr += `<br>On cherche donc les coordonnées du milieu de chacune des deux diagonales du quadrilatère, pour prouver qu'elles sont identiques. :`
                    texte_corr += `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $D(x_D;y_D)$ sont deux points d'un repère ,`
                    texte_corr +=`<br> alors les coordonnées du point $I$ milieu de $[AD]$ sont `
                    texte_corr +=`$I\\left(\\dfrac{x_A+x_D}{2};\\dfrac{y_A+y_D}{2}\\right)$ <br>`
                    texte_corr +=`On applique la relation à l'énoncé : `
                    texte_corr +=`$\\begin{cases}x_I=\\dfrac{${xA}+${ecriture_parenthese_si_negatif(xD)}}{2} \\\\ y_I=\\dfrac{${yA}+${ecriture_parenthese_si_negatif(yD)}}{2}\\end{cases}$`
                    texte_corr += `<br>On en déduit :  $\\begin{cases}x_I=\\dfrac{${tex_nombre(xA+xD)}}{2}\\\\y_I=\\dfrac{${tex_nombre(yA+yD)}}{2}\\end{cases}$`
                    if (xI1!=1 && yI1!=1) {texte_corr += `  <br>Ce qui donne au final : $ I\\left(\\dfrac{${xI0}}{${xI1}};\\dfrac{${yI0}}{${yI1}};\\right)$`}
                    if (xI1==1 && yI1!=1) {texte_corr += `  <br>Ce qui donne au final : $ I\\left(${xI0};\\dfrac{${yI0}}{${yI1}}\\right)$`}
                    if (xI1!=1 && yI1==1) {texte_corr += `  <br>Ce qui donne au final : $ I\\left(\\dfrac{${xI0}}{${xI1}};${yI0}\\right)$`}
                    if (xI1==1 && yI1==1) {texte_corr += `  <br>Ce qui donne au final : $ I\\left(${xI0};${yI0}\\right)$`}
                   texte_corr +=`<br> Les coordonnées du point $J$ milieu de $[BC]$ sont `
                    texte_corr +=`$J\\left(\\dfrac{x_B+x_C}{2};\\dfrac{y_B+y_C}{2}\\right)$ <br>`
                    texte_corr +=`On applique la relation à l'énoncé : `
                    texte_corr +=`$\\begin{cases}x_J=\\dfrac{${xB}+${ecriture_parenthese_si_negatif(xC)}}{2} \\\\ y_J=\\dfrac{${yB}+${ecriture_parenthese_si_negatif(yC)}}{2}\\end{cases}$`
                    texte_corr += `<br>On en déduit :  $\\begin{cases}x_J=\\dfrac{${tex_nombre(xB+xC)}}{2}\\\\y_J=\\dfrac{${tex_nombre(yB+yC)}}{2}\\end{cases}$`
                    if (xJ1!=1 && yJ1!=1) {texte_corr += `  <br>Ce qui donne au final : $ J\\left(\\dfrac{${xJ0}}{${xJ1}};\\dfrac{${yJ0}}{${yJ1}};\\right)$`}
                    if (xJ1==1 && yJ1!=1) {texte_corr += `  <br>Ce qui donne au final : $ J\\left(${xJ0};\\dfrac{${yJ0}}{${yJ1}}\\right)$`}
                    if (xJ1!=1 && yJ1==1) {texte_corr += `  <br>Ce qui donne au final : $ J\\left(\\dfrac{${xJ0}}{${xJ1}};${yJ0}\\right)$`}
                    if (xJ1==1 && yJ1==1) {texte_corr += `  <br>Ce qui donne au final : $ J\\left(${xJ0};${yJ0}\\right)$`}
                     texte_corr += `<br>On observe que $I$ et $J$ ont les mêmes coordonnées, donc les deux diagonales du quadrilatère se coupent en leur milieu.`
                    texte_corr += `<br>$ABDC$ est donc un parallélogramme.`
                    texte_corr += `<br><B>2. On prouve que $ABDC$ est un rectangle :</B>`
                      texte_corr += `<br>On calcule maintenant les diagonales de $ABDC$ : $AD$ et $BC$ .`
                    texte_corr += `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $D(x_D;y_D)$ sont deux points d'un repère orthonormé,`
                    texte_corr +=` alors on a : $AD=\\sqrt{\\left(x_D-x_A\\right)^{2}+\\left(y_D-y_A\\right)^{2}}.$<br>`
                    texte_corr +=`On applique la relation à l'énoncé : $AD=\\sqrt{\\left(${xD}-${ecriture_parenthese_si_negatif(xA)}\\right)^{2}+\\left(${yD}-${ecriture_parenthese_si_negatif(yA)}\\right)^{2}}$<br>`
                    texte_corr += `$\\phantom{On applique la relation à l'énoncé :        } AD=\\sqrt{${XAD}+${YAD}}$<br>`
                    texte_corr +=`$\\phantom{On applique la relation à l'énoncé :        } AD=\\sqrt{${tex_nombre(XAD+YAD)}}$<br>`
                    if (AD%100==0 && AD!=100)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=10\\sqrt{${tex_nombre((AD))/100}}$<br>`}
                    if (AD%81==0 && AD!=81)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=9\\sqrt{${tex_nombre((AD))/81}}$<br>`}
                    if (AD%64==0 && AD!=64)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=8\\sqrt{${tex_nombre((AD))/64}}$<br>`}
                    if (AD%49==0 && AD!=49)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=7\\sqrt{${tex_nombre((AD))/49}}$<br>`}
                     if (AD%36==0&& AD!=36)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=6\\sqrt{${tex_nombre((AD))/36}}$<br>`}
                     if (AD%25==0 && AD!=25)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=5\\sqrt{${tex_nombre((AD))/25}}$<br>`}
                     if (AD%64!=0 && AD%16==0&& AD!=16)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=4\\sqrt{${tex_nombre((AD))/16}}$<br>`}
                    if (AD%81!=0 && AD%9==0 && AD!=9)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=3\\sqrt{${tex_nombre((AD))/9}}$<br>`}
                    if (AD%16!=0 && AD%64!==0 &&AD%4==0 && AD!=4)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=2\\sqrt{${tex_nombre((AD))/4}}$<br>`}
                      if (AD==100)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=10$<br>`}
                    if (AD==81)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=9$<br>`}
                      if (AD==64)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=8$<br>`}
                      if (AD==49)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=7$<br>`}
                      if (AD==36)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=6$<br>`}
                      if (AD==25)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=5$<br>`}
                      if (AD==16)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=4$<br>`}
                      if (AD==9)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=3$<br>`}
                      if (AD==4)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=2$<br>`}
                     if (AD==1)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AD=1$<br>`}
                     texte_corr +=`On procède de même pour $BC$: $BC=\\sqrt{\\left(${xC}-${ecriture_parenthese_si_negatif(xB)}\\right)^{2}+\\left(${yC}-${ecriture_parenthese_si_negatif(yB)}\\right)^{2}}$<br>`
                    texte_corr += `$\\phantom{On applique la relation à l'énoncé :        } BC=\\sqrt{${XBC}+${YBC}}$<br>`
                    texte_corr +=`$\\phantom{On applique la relation à l'énoncé :        } BC=\\sqrt{${tex_nombre(XBC+YBC)}}$<br>`
                    if (BC%100==0 && BC!=100)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=10\\sqrt{${tex_nombre((BC))/100}}$<br>`}
                    if (BC%81==0 && BC!=81)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=9\\sqrt{${tex_nombre((BC))/81}}$<br>`}
                    if (BC%64==0 && BC!=64)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=8\\sqrt{${tex_nombre((BC))/64}}$<br>`}
                    if (BC%49==0 && BC!=49)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=7\\sqrt{${tex_nombre((BC))/49}}$<br>`}
                     if (BC%36==0&& BC!=36)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=6\\sqrt{${tex_nombre((BC))/36}}$<br>`}
                     if (BC%25==0 && BC!=25)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=5\\sqrt{${tex_nombre((BC))/25}}$<br>`}
                     if (BC%64!=0 && BC%16==0&& BC!=16)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=4\\sqrt{${tex_nombre((BC))/16}}$<br>`}
                    if (BC%81!=0 && BC%9==0 && BC!=9)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=3\\sqrt{${tex_nombre((BC))/9}}$<br>`}
                    if (BC%16!=0 && BC%64!==0 &&BC%4==0 && BC!=4)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=2\\sqrt{${tex_nombre((BC))/4}}$<br>`}
                      if (BC==100)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=10$<br>`}
                    if (BC==81)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=9$<br>`}
                      if (BC==64)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=8$<br>`}
                      if (BC==49)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=7$<br>`}
                      if (BC==36)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=6$<br>`}
                      if (BC==25)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=5$<br>`}
                      if (BC==16)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=4$<br>`}
                      if (BC==9)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=3$<br>`}
                      if (BC==4)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=2$<br>`}
                     if (BC==1)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } BC=1$<br>`}
                      texte_corr +=`<br>On observe que $BC=AD$, $ABDC$ est donc bien un rectangle.`
                        texte_corr += `<br><B>3. On prouve que $ABDC$ est un carré :</B>`
                      texte_corr += `<br>On calcule maintenant deux côtés consécutilfs de $ABDC$ : $AB$ et $AC$ par exemple.`  
                       texte_corr +=` <br>$AB=\\sqrt{\\left(${xB}-${ecriture_parenthese_si_negatif(xA)}\\right)^{2}+\\left(${yB}-${ecriture_parenthese_si_negatif(yA)}\\right)^{2}}$<br>`
                    texte_corr += `$\\phantom{On applique la relation à l'énoncé :        } AB=\\sqrt{${XAB}+${YAB}}$<br>`
                    texte_corr +=`$\\phantom{On applique la relation à l'énoncé :        } AB=\\sqrt{${tex_nombre(XAB+YAB)}}$<br>`
                    if (AB%100==0 && AB!=100)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=10\\sqrt{${tex_nombre((AB))/100}}$<br>`}
                    if (AB%81==0 && AB!=81)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=9\\sqrt{${tex_nombre((AB))/81}}$<br>`}
                    if (AB%64==0 && AB!=64)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=8\\sqrt{${tex_nombre((AB))/64}}$<br>`}
                    if (AB%49==0 && AB!=49)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=7\\sqrt{${tex_nombre((AB))/49}}$<br>`}
                     if (AB%36==0&& AB!=36)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=6\\sqrt{${tex_nombre((AB))/36}}$<br>`}
                     if (AB%25==0 && AB!=25)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=5\\sqrt{${tex_nombre((AB))/25}}$<br>`}
                     if (AB%64!=0 && AB%16==0&& AB!=16)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=4\\sqrt{${tex_nombre((AB))/16}}$<br>`}
                    if (AB%81!=0 && AB%9==0 && AB!=9)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=3\\sqrt{${tex_nombre((AB))/9}}$<br>`}
                    if (AB%16!=0 && AB%64!==0 &&AB%4==0 && AB!=4)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=2\\sqrt{${tex_nombre((AB))/4}}$<br>`}
                      if (AB==100)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=10$<br>`}
                    if (AB==81)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=9$<br>`}
                      if (AB==64)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=8$<br>`}
                      if (AB==49)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=7$<br>`}
                      if (AB==36)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=6$<br>`}
                      if (AB==25)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=5$<br>`}
                      if (AB==16)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=4$<br>`}
                      if (AB==9)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=3$<br>`}
                      if (AB==4)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=2$<br>`}
                      if (AB==1)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=1$<br>`}

                    texte_corr +=`De même : $AC=\\sqrt{\\left(${xC}-${ecriture_parenthese_si_negatif(xA)}\\right)^{2}+\\left(${yC}-${ecriture_parenthese_si_negatif(yA)}\\right)^{2}}$<br>`
                    texte_corr += `$\\phantom{De même :       } AC=\\sqrt{${XAC}+${YAC}}$<br>`
                    texte_corr +=`$\\phantom{De même :       } AC=\\sqrt{${tex_nombre(XAC+YAC)}}$<br>`
                    if (AC%100==0 && AC!=100)
                        { texte_corr +=`$\\phantom{De même :  } AC=10\\sqrt{${tex_nombre((AC))/100}}$<br>`}
                    if (AC%81==0 && AC!=81)
                        { texte_corr +=`$\\phantom{De même :  } AC=9\\sqrt{${tex_nombre((AC))/81}}$<br>`}
                    if (AC%64==0 && AC!=64)
                        { texte_corr +=`$\\phantom{De même :  } AC=8\\sqrt{${tex_nombre((AC))/64}}$<br>`}
                    if (AC%49==0 && AC!=49)
                        { texte_corr +=`$\\phantom{De même :  } AC=7\\sqrt{${tex_nombre((AC))/49}}$<br>`}
                     if (AC%36==0&& AC!=36)
                        { texte_corr +=`$\\phantom{De même :  } AC=6\\sqrt{${tex_nombre((AC))/36}}$<br>`}
                     if (AC%25==0 && AC!=25)
                        { texte_corr +=`$\\phantom{De même :  } AC=5\\sqrt{${tex_nombre((AC))/25}}$<br>`}
                     if (AC%64!=0 && AC%16==0&& AC!=16)
                        { texte_corr +=`$\\phantom{De même :  } AC=4\\sqrt{${tex_nombre((AC))/16}}$<br>`}
                    if (AC%81!=0 && AC%9==0 && AC!=9)
                        { texte_corr +=`$\\phantom{De même :  } AC=3\\sqrt{${tex_nombre((AC))/9}}$<br>`}
                    if (AC%16!=0 && AC%64!==0 &&AC%4==0 && AC!=4)
                        { texte_corr +=`$\\phantom{De même :  } AC=2\\sqrt{${tex_nombre((AC))/4}}$<br>`}
                      if (AC==100)
                        { texte_corr +=`$\\phantom{De même :  } AC=10$<br>`}
                    if (AC==81)
                        { texte_corr +=`$\\phantom{De même :  } AC=9$<br>`}
                      if (AC==64)
                        { texte_corr +=`$\\phantom{De même :  } AC=8$<br>`}
                      if (AC==49)
                        { texte_corr +=`$\\phantom{De même :  } AC=7$<br>`}
                      if (AC==36)
                        { texte_corr +=`$\\phantom{De même :  } AC=6$<br>`}
                      if (AC==25)
                        { texte_corr +=`$\\phantom{De même :  } AC=5$<br>`}
                      if (AC==16)
                        { texte_corr +=`$\\phantom{De même :  } AC=4$<br>`}
                      if (AC==9)
                        { texte_corr +=`$\\phantom{De même :  } AC=3$<br>`}
                      if (AC==4)
                        { texte_corr +=`$\\phantom{De même :  } AC=2$<br>`}
                      if (AC==1)
                        { texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AC=1$<br>`}

                    texte_corr +=`On observe que $AC=AB$ donc $ABDC$ est bien un carré.`
                  ;
               break;
            
            } 
            if (this.liste_questions.indexOf(texte)==-1)
                { // Si la question n'a jamais été posée, on en créé une autre
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
 * 2G11
 * @Auteur Stéphane Guyon
 */
function Milieu(){
Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Déterminer les coordonnées milieu d’un segment dans un repère";
   
    this.nb_questions = 2;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.sup = 1 ; // 

    this.nouvelle_version = function(numero_de_l_exercice)
    {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles = [1,2,3,4];
     if (this.sup == 1) {
            type_de_questions_disponibles = [1] 
        }
      if (this.sup == 2) {
            type_de_questions_disponibles = [2] 
           }
    if (this.sup == 3) {
            type_de_questions_disponibles = [3,4] 
           }
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) ;
    for (let i = 0, a,ux,uy,d,e,g,xA,yA,xB,yB,xC,yC,xD,yD,AB,XAB,YAB,XAC,YAC,AC,t,l,xI0,xI1,yI0,yI1,xJ0,xJ1,yJ0,yJ1, A,B,C,D,T,L,P,texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) 
    {
    type_de_questions = liste_type_de_questions[i];
    switch (type_de_questions){
                        // Cas par cas, on définit le type de nombres que l'on souhaite
                        // Combien de chiffres ? Quelles valeurs ?
            
                case 1 : 
        
                     xA=randint(0,9)*choice([-1,1])
                    yA=randint(0,5)*choice([-1,1])
                    xB=randint(0,5)*choice([-1,1])
                    yB=randint(0,5)*choice([-1,1])
                    if (xB==xA&&yA==yB) {xB=xB+randint(1,5)*choice([-1,1])}
                   
                    XAB=(xB-xA)*(xB-xA)
                    YAB=(yB-yA)*(yB-yA);
                    AB=XAB+YAB;
                    xI0= fraction_simplifiee(xA+xB,2)[0]
                    xI1= fraction_simplifiee(xA+xB,2)[1]
                    yI0= fraction_simplifiee(yA+yB,2)[0]
                    yI1= fraction_simplifiee(yA+yB,2)[1]
                    
                    g = grille(-9,-9,9,9)               
                    A = point(xA,yA,'A')
                    B = point(xB,yB,'B')
                    a = axes(-9,-9,9,9)
                    s = segment(A,B,'blue')
                    T = tracePoint(A,B) // Repère les points avec une croix
                    L = labelPoint(A,B)
                    texte =`Dans un repère orthonormé $(O,I,J)$, on donne les points suivants :`
                    texte +=` $A\\left(${xA};${yA}\\right)$ et $B\\left(${xB};${yB}\\right)$`
                    texte += `<br>Déterminer les coordonnées du point $I$ milieu du segment $[AB]$ `;
                     
                    texte_corr = mathalea2d({
                      xmin : -9,
                      ymin : -9,
                      xmax : 9,
                      ymax : 9
                    },a,g,T,s,L);


                    texte_corr += `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d'un repère orthonormé,`
                    texte_corr +=`<br> alors les coordonnées du point $I$ milieu de $[AB]$ sont `
                    texte_corr +=`$I\\left(\\dfrac{x_A+x_B}{2};\\dfrac{y_A+y_B}{2}\\right)$ <br>`
                    texte_corr +=`On applique la relation à l'énoncé : `
                    texte_corr +=`$\\begin{cases}x_I=\\dfrac{${xA}+${ecriture_parenthese_si_negatif(xB)}}{2} \\\\ y_I=\\dfrac{${yA}+${ecriture_parenthese_si_negatif(yB)}}{2}\\end{cases}$`
                    texte_corr += `<br>On en déduit :  $\\begin{cases}x_I=\\dfrac{${tex_nombre(xA+xB)}}{2}\\\\y_I=\\dfrac{${tex_nombre(yA+yB)}}{2}\\end{cases}$`
                    if (xI1!=1 && yI1!=1) {texte_corr += `  <br>Ce qui donne au final : $ I\\left(\\dfrac{${xI0}}{${xI1}};\\dfrac{${yI0}}{${yI1}};\\right)$`}
                    if (xI1==1 && yI1!=1) {texte_corr += `  <br>Ce qui donne au final : $ I\\left(${xI0};\\dfrac{${yI0}}{${yI1}}\\right)$`}
                    if (xI1!=1 && yI1==1) {texte_corr += `  <br>Ce qui donne au final : $ I\\left(\\dfrac{${xI0}}{${xI1}};${yI0}\\right)$`}
                    if (xI1==1 && yI1==1) {texte_corr += `  <br>Ce qui donne au final : $ I\\left(${xI0};${yI0}\\right)$`}
                   

                     ;   
                   break ;
             case 2 : 
        
                    
                     xA=randint(0,9)*choice([-1,1])
                    yA=randint(0,5)*choice([-1,1])
                    xI=randint(0,5)*choice([-1,1])
                    yI=randint(0,5)*choice([-1,1])
                      if (xI==xA&&yI==yA) {xI=xI+randint(1,5)*choice([-1,1])}
                    
                    XAB=(xB-xA)*(xB-xA)
                    YAB=(yB-yA)*(yB-yA);
                    AB=XAB+YAB;
                    xI0= fraction_simplifiee(xA+xB,2)[0]
                    xI1= fraction_simplifiee(xA+xB,2)[1]
                    yI0= fraction_simplifiee(yA+yB,2)[0]
                    yI1= fraction_simplifiee(yA+yB,2)[1]
                    g = grille(-9,-9,9,9)               
                    A = point(xA,yA,'A','red')
                    B = point(xB,yB,'B','red')
                    a = axes(-9,-9,9,9)
                    s = segment(A,B,'blue')
                    T=tracePoint(A,B) // Repère les points avec une croix
                    L=labelPoint(A,B)
                    texte =`Dans un repère orthonormé $(O,I,J)$, on donne les points suivants :`
                    texte +=` $A\\left(${xA};${yA}\\right)$ et $I\\left(${xI};${yI}\\right)$`
                    texte += `<br>Déterminer les coordonnées du point $B$ tel que I soit le milieu du segment $[AB]$ `;
                                   
                    
                    texte_corr = mathalea2d({
                      xmin : -9,
                      ymin : -9,
                      xmax : 9,
                      ymax : 9
                    },T,L,g,a,s);

                    
                    texte_corr += `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d'un repère orthonormé,`
                    texte_corr +=` <br>alors les coordonnées du point $I$ milieu de $[AB]$ sont `
                    texte_corr +=`$I\\left(\\dfrac{x_A+x_B}{2};\\dfrac{y_A+y_B}{2}\\right)$ <br>`
                    texte_corr +=`On applique la relation à l'énoncé : `
                    texte_corr +=`$\\begin{cases}${xI}=\\dfrac{${xA}+x_B}{2} \\\\ ${yI}=\\dfrac{${yA}+y_B}{2}\\end{cases}$`
                    texte_corr +=`$\\iff \\begin{cases}x_B=2\\times ${xI} -${ecriture_parenthese_si_negatif(xA)} \\\\ y_B=2\\times ${yI}-${ecriture_parenthese_si_negatif(yA)}\\end{cases}$`
                    texte_corr += `<br>On en déduit :  $\\begin{cases}x_B={${tex_nombre(2*xI-xA)}}\\\\y_B=${tex_nombre(2*yI-yA)}\\end{cases}$`
                   texte_corr += `<br>Au final : $B\\left( ${tex_nombre(2*xI-xA)};${tex_nombre(2*yI-yA)}\\right)$`
                   

                     ;   
                   break ;
             case 3 : 
                                 
                    xA=randint(0,9)*choice([-1,1])
                   yA=randint(0,9)*choice([-1,1])
                   ux=randint(1,9)*choice([-1,1])
                   uy=randint(1,9)*choice([-1,1])
                   xB=xA+ux
                   yB=yA+uy
                   xC=randint(0,5)*choice([-1,1])
                   yC=randint(0,9)*choice([-1,1])
                    if (xC==xA&&yA==yC) {xC=xC+randint(1,5)*choice([-1,1])}
                   xD=xC+ux
                   yD=yC+uy
                   xI0= fraction_simplifiee(xA+xD,2)[0]
                   xI1= fraction_simplifiee(xA+xD,2)[1]
                   yI0= fraction_simplifiee(yA+yD,2)[0]
                   yI1= fraction_simplifiee(yA+yD,2)[1]
                   xJ0= fraction_simplifiee(xB+xC,2)[0]
                   xJ1= fraction_simplifiee(xB+xC,2)[1]
                   yJ0= fraction_simplifiee(yB+yC,2)[0]
                   yJ1= fraction_simplifiee(yB+yC,2)[1]
                       g =grille(-9,-9,9,9)               
                    A = point(xA,yA,'A','red')
                    B = point(xB,yB,'B','red')
                    a=axes(xmin=-9,ymin=-9,xmax=9,ymax=9,thick=.2,step=1)
                    s = segment(A,B,'blue')
                    T=tracePoint(A,B) // Repère les points avec une croix
                    L=labelPoint(A,B)
                 
                
                    texte =`Dans un repère orthonormé (O,I,J), on donne les 4 points suivants :<br>`
                    texte +=` $A\\left(${xA};${yA}\\right)$ ; $B\\left(${xB};${yB}\\right).$`
                    texte +=` $C\\left(${xC};${yC}\\right)$ ; $D\\left(${xD};${yD}\\right).$`
                    texte += `<br>Déterminer si le quadrilatère $ABDC$ est un parallélogramme.`;
                                   
                      texte_corr = mathalea2d({
                      xmin : -9,
                      ymin : -9,
                      xmax : 9,
                      ymax : 9
                    },T,L,g,a,s);

                    
                    texte_corr += `<br>On sait que ABDC est un parallélogramme si et seulement si ses diagonales se coupent en leur milieu.$`
                    texte_corr += `<br>On cherche donc les coordonnées du milieu de chacune des deux diagonales du quadrilatère :`
                    texte_corr += `On sait d'après le cours, que si $A(x_A;y_A)$ et $D(x_D;y_D)$ sont deux points d'un repère ,`
                    texte_corr +=`<br> alors les coordonnées du point $I$ milieu de $[AD]$ sont `
                    texte_corr +=`$I\\left(\\dfrac{x_A+x_D}{2};\\dfrac{y_A+y_D}{2}\\right)$ <br>`
                    texte_corr +=`On applique la relation à l'énoncé : `
                    texte_corr +=`$\\begin{cases}x_I=\\dfrac{${xA}+${ecriture_parenthese_si_negatif(xD)}}{2} \\\\ y_I=\\dfrac{${yA}+${ecriture_parenthese_si_negatif(yD)}}{2}\\end{cases}$`
                    texte_corr += `<br>On en déduit :  $\\begin{cases}x_I=\\dfrac{${tex_nombre(xA+xD)}}{2}\\\\y_I=\\dfrac{${tex_nombre(yA+yD)}}{2}\\end{cases}$`
                    if (xI1!=1 && yI1!=1) {texte_corr += `  <br>Ce qui donne au final : $ I\\left(\\dfrac{${xI0}}{${xI1}};\\dfrac{${yI0}}{${yI1}};\\right)$`}
                    if (xI1==1 && yI1!=1) {texte_corr += `  <br>Ce qui donne au final : $ I\\left(${xI0};\\dfrac{${yI0}}{${yI1}}\\right)$`}
                    if (xI1!=1 && yI1==1) {texte_corr += `  <br>Ce qui donne au final : $ I\\left(\\dfrac{${xI0}}{${xI1}};${yI0}\\right)$`}
                    if (xI1==1 && yI1==1) {texte_corr += `  <br>Ce qui donne au final : $ I\\left(${xI0};${yI0}\\right)$`}
                   texte_corr +=`<br> Les coordonnées du point $J$ milieu de $[BC]$ sont `
                    texte_corr +=`$J\\left(\\dfrac{x_B+x_C}{2};\\dfrac{y_B+y_C}{2}\\right)$ <br>`
                    texte_corr +=`On applique la relation à l'énoncé : `
                    texte_corr +=`$\\begin{cases}x_J=\\dfrac{${xB}+${ecriture_parenthese_si_negatif(xC)}}{2} \\\\ y_J=\\dfrac{${yB}+${ecriture_parenthese_si_negatif(yC)}}{2}\\end{cases}$`
                    texte_corr += `<br>On en déduit :  $\\begin{cases}x_J=\\dfrac{${tex_nombre(xB+xC)}}{2}\\\\y_J=\\dfrac{${tex_nombre(yB+yC)}}{2}\\end{cases}$`
                    if (xJ1!=1 && yJ1!=1) {texte_corr += `  <br>Ce qui donne au final : $ J\\left(\\dfrac{${xJ0}}{${xJ1}};\\dfrac{${yJ0}}{${yJ1}};\\right)$`}
                    if (xJ1==1 && yJ1!=1) {texte_corr += `  <br>Ce qui donne au final : $ J\\left(${xJ0};\\dfrac{${yJ0}}{${yJ1}}\\right)$`}
                    if (xJ1!=1 && yJ1==1) {texte_corr += `  <br>Ce qui donne au final : $ J\\left(\\dfrac{${xJ0}}{${xJ1}};${yJ0}\\right)$`}
                    if (xJ1==1 && yJ1==1) {texte_corr += `  <br>Ce qui donne au final : $ J\\left(${xJ0};${yJ0}\\right)$`}
                     texte_corr += `<br>On observe que $I$ et $J$ ont les mêmes coordonnées, donc les deux diagonales du quadrilatère se coupent en leur milieu.`
                        texte_corr += `<br>$ABDC$ est donc un parallélogramme.`

                    ;   
                   break ;
             case 4 : 
                    
                                     
              
                   xA=randint(0,9)*choice([-1,1])
                   yA=randint(0,9)*choice([-1,1])
                   ux=randint(1,9)*choice([-1,1])
                   uy=randint(1,9)*choice([-1,1])
                   xB=xA+ux
                   yB=yA+uy
                   xC=randint(0,5)*choice([-1,1])
                   yC=randint(0,9)*choice([-1,1])
                   if (xC==xA&&yA==yC) {xC=xC+randint(1,5)*choice([-1,1])}
                   xD=xC+ux+randint(1,2)*choice([-1,1])
                   yD=yC+uy+randint(0,1)*choice([-1,1])
                   xI0= fraction_simplifiee(xA+xD,2)[0]
                   xI1= fraction_simplifiee(xA+xD,2)[1]
                   yI0= fraction_simplifiee(yA+yD,2)[0]
                   yI1= fraction_simplifiee(yA+yD,2)[1]
                   xJ0= fraction_simplifiee(xB+xC,2)[0]
                   xJ1= fraction_simplifiee(xB+xC,2)[1]
                   yJ0= fraction_simplifiee(yB+yC,2)[0]
                   yJ1= fraction_simplifiee(yB+yC,2)[1]
                    g = grille(-9,-9,9,9)               
                    A = point(xA,yA,'A','red')
                    B = point(xB,yB,'B','red')
                    a=axes(-9,-9,9,9)
                    s = segment(A,B,'blue')
                    T=tracePoint(A,B) // Repère les points avec une croix
                    L=labelPoint(A,B)
                
                    texte =`Dans un repère orthonormé (O,I,J), on donne les 4 points suivants :<br>`
                    texte +=` $A\\left(${xA};${yA}\\right)$ ; $B\\left(${xB};${yB}\\right).$`
                    texte +=` $C\\left(${xC};${yC}\\right)$ ; $D\\left(${xD};${yD}\\right).$`
                    texte += `<br>Déterminer si le quadrilatère $ABDC$ est un parallélogramme.`;
                                   
                    texte_corr = mathalea2d({
                      xmin : -9,
                      ymin : -9,
                      xmax : 9,
                      ymax : 9
                    },T,L,g,a,s);

                    
                    texte_corr += `<br>On sait que ABDC est un parallélogramme si et seulement si ses diagonales se coupent en leur milieu.$`
                    texte_corr += `<br>On cherche donc les coordonnées du milieu de chacune des deux diagonales du quadrilatère :`
                    texte_corr += `On sait d'après le cours, que si $A(x_A;y_A)$ et $D(x_D;y_D)$ sont deux points d'un repère ,`
                    texte_corr +=`<br> alors les coordonnées du point $I$ milieu de $[AD]$ sont `
                    texte_corr +=`$I\\left(\\dfrac{x_A+x_D}{2};\\dfrac{y_A+y_D}{2}\\right)$ <br>`
                    texte_corr +=`On applique la relation à l'énoncé : `
                    texte_corr +=`$\\begin{cases}x_I=\\dfrac{${xA}+${ecriture_parenthese_si_negatif(xD)}}{2} \\\\ y_I=\\dfrac{${yA}+${ecriture_parenthese_si_negatif(yD)}}{2}\\end{cases}$`
                    texte_corr += `<br>On en déduit :  $\\begin{cases}x_I=\\dfrac{${tex_nombre(xA+xD)}}{2}\\\\y_I=\\dfrac{${tex_nombre(yA+yD)}}{2}\\end{cases}$`
                    if (xI1!=1 && yI1!=1) {texte_corr += `  <br>Ce qui donne au final : $ I\\left(\\dfrac{${xI0}}{${xI1}};\\dfrac{${yI0}}{${yI1}};\\right)$`}
                    if (xI1==1 && yI1!=1) {texte_corr += `  <br>Ce qui donne au final : $ I\\left(${xI0};\\dfrac{${yI0}}{${yI1}}\\right)$`}
                    if (xI1!=1 && yI1==1) {texte_corr += `  <br>Ce qui donne au final : $ I\\left(\\dfrac{${xI0}}{${xI1}};${yI0}\\right)$`}
                    if (xI1==1 && yI1==1) {texte_corr += `  <br>Ce qui donne au final : $ I\\left(${xI0};${yI0}\\right)$`}
                    texte_corr +=`<br> Les coordonnées du point $J$ milieu de $[BC]$ sont `
                    texte_corr +=`$J\\left(\\dfrac{x_B+x_C}{2};\\dfrac{y_B+y_C}{2}\\right)$ <br>`
                    texte_corr +=`On applique la relation à l'énoncé : `
                    texte_corr +=`$\\begin{cases}x_J=\\dfrac{${xB}+${ecriture_parenthese_si_negatif(xC)}}{2} \\\\ y_J=\\dfrac{${yB}+${ecriture_parenthese_si_negatif(yC)}}{2}\\end{cases}$`
                    texte_corr += `<br>On en déduit :  $\\begin{cases}x_J=\\dfrac{${tex_nombre(xB+xC)}}{2}\\\\y_J=\\dfrac{${tex_nombre(yB+yC)}}{2}\\end{cases}$`
                    if (xJ1!=1 && yJ1!=1) {texte_corr += `  <br>Ce qui donne au final : $ J\\left(\\dfrac{${xJ0}}{${xJ1}};\\dfrac{${yJ0}}{${yJ1}};\\right)$`}
                    if (xJ1==1 && yJ1!=1) {texte_corr += `  <br>Ce qui donne au final : $ J\\left(${xJ0};\\dfrac{${yJ0}}{${yJ1}}\\right)$`}
                    if (xJ1!=1 && yJ1==1) {texte_corr += `  <br>Ce qui donne au final : $ J\\left(\\dfrac{${xJ0}}{${xJ1}};${yJ0}\\right)$`}
                    if (xJ1==1 && yJ1==1) {texte_corr += `  <br>Ce qui donne au final : $ J\\left(${xJ0};${yJ0}\\right)$`}
                     texte_corr += `<br>On observe que $I$ et $J$ n'ont pas les mêmes coordonnées, donc les deux diagonales du quadrilatère ne se coupent pas en leur milieu.`
                        texte_corr += `<br>$ABDC$ n'est donc pas un parallélogramme.`

                    ;   
                   break ;
            } 
            if (this.liste_questions.indexOf(texte)==-1)
                { // Si la question n'a jamais été posée, on en créé une autre
                this.liste_questions.push(texte);
                this.liste_corrections.push(texte_corr);
                i++;
                }
            cpt++;  
        }
        liste_de_question_to_contenu(this);
    }
     this.besoin_formulaire_numerique = ['Niveau de difficulté', 3, '1 : Application directe de la formule 2 : Application indirecte de la formule 3: Caractériser un parallélogramme.'];
}  

/**
 * 2G10
 * @Auteur Stéphane Guyon
 */
function Distance(){
Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Utiliser la distance entre deux points dans un repère orthonormé";
   
    this.nb_questions = 2;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.sup = 1 ; // 

    this.nouvelle_version = function(numero_de_l_exercice)
    {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles = [1,2,3];
     if (this.sup == 1) {
            type_de_questions_disponibles = [1] 
        }
      if (this.sup == 2) {
            type_de_questions_disponibles = [2,3] 
        }
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) ;
    for (let i = 0, a,ux,uy,d,e,g,xA,yA,xB,yB,xC,yC,AB,XAB,YAB,XAC,YAC,AC,t,l, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) 
    {
    type_de_questions = liste_type_de_questions[i];
    switch (type_de_questions){
                        // Cas par cas, on définit le type de nombres que l'on souhaite
                        // Combien de chiffres ? Quelles valeurs ?
            
                case 1 : 
        
                    g =grille(-9,-9,9,9)
                    xA=randint(0,5)*choice([-1,1])
                    yA=randint(0,5)*choice([-1,1])
                    xB=randint(0,5)*choice([-1,1])
                    yB=randint(0,5)*choice([-1,1])
                    if (xB==xA&&yA==yB) {xB=xB+randint(1,5)*choice([-1,1])}
                    A = point(xA,yA,'A','red')
                    B = point(xB,yB,'B','red')
                    t=tracePoint(A,B)
                    l=labelPoint(A,B)
                    a=axes(-2,-9,9,9)
                    XAB=(xB-xA)*(xB-xA)
                    YAB=(yB-yA)*(yB-yA);
                    AB=XAB+YAB;
                
                    texte =`Dans un repère orthonormé $(O,I,J)$, on donne les points suivants :`
                    texte +=` $A\\left(${xA};${yA}\\right)$ et $B\\left(${xB};${yB}\\right)$`
                    texte += `<br>Calculer la distance $AB$ en justifiant le calcul.`;
                                   
                    
                    texte_corr = `On sait d'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d'un repère orthonormé,`
                    texte_corr +=` alors on a : $AB=\\sqrt{\\left(x_B-x_A\\right)^{2}+\\left(y_B-y_A\\right)^{2}}.$<br>`
                    texte_corr +=`On applique la relation à l'énoncé : $AB=\\sqrt{\\left(${xB}-${ecriture_parenthese_si_negatif(xA)}\\right)^{2}+\\left(${yB}-${ecriture_parenthese_si_negatif(yA)}\\right)^{2}}$<br>`
                    texte_corr += `$\\phantom{On applique la relation à l'énoncé :        } AB=\\sqrt{${XAB}+${YAB}}$<br>`
                    texte_corr +=`$\\phantom{On applique la relation à l'énoncé :        } AB=\\sqrt{${tex_nombre(XAB+YAB)}}$<br>`
                    if (extraire_racine_carree(AB)[0]!=1) texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=${tex_racine_carree(AB)}$<br>`
                   break ;
             case 2 : 
        
              
                   xA=randint(0,5)*choice([-1,1])
                   yA=randint(0,9)*choice([-1,1])
                   ux=randint(0,9)*choice([-1,1])
                   uy=randint(0,9)*choice([-1,1])
                   xB=xA+ux
                   yB=yA+uy
                   xC=xA+uy*choice([-1,1])
                   yC=yA+ux*choice([-1,1])

                   XAB=(xB-xA)*(xB-xA)
                   YAB=(yB-yA)*(yB-yA);
                   AB=XAB+YAB;
                   XAC=(xC-xA)*(xC-xA)
                   YAC=(yC-yA)*(yC-yA);
                   AC=XAC+YAC;
                
                    texte =`Dans un repère orthonormé (O,I,J), on donne les points suivants :`
                    texte +=` $A\\left(${xA};${yA}\\right)$ ; $B\\left(${xB};${yB}\\right)$`
                    texte += `<br>Le point $C\\left(${xC};${yC}\\right)$ appartient-il au cercle de centre $A$ passant par $B$ ?`;
                                   
                    texte_corr = `Le point $C$ appartient au cercle de centre $A$ passant par $B$ si et seulement si $CA=CB.$`
                    texte_corr += `<br>On calcule séparément donc ces deux distances :`
                    texte_corr += `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d'un repère orthonormé,`
                    texte_corr +=` alors on a : $AB=\\sqrt{\\left(x_B-x_A\\right)^{2}+\\left(y_B-y_A\\right)^{2}}$<br>`
                    texte_corr +=`On applique la relation à l'énoncé : $AB=\\sqrt{\\left(${xB}-${ecriture_parenthese_si_negatif(xA)}\\right)^{2}+\\left(${yB}-${ecriture_parenthese_si_negatif(yA)}\\right)^{2}}$<br>`
                    texte_corr += `$\\phantom{On applique la relation à l'énoncé :        } AB=\\sqrt{${XAB}+${YAB}}$<br>`
                    texte_corr +=`$\\phantom{On applique la relation à l'énoncé :        } AB=\\sqrt{${tex_nombre(XAB+YAB)}}$<br>`
                    texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=${tex_racine_carree(AB)}$<br>`
                    texte_corr +=`De même : $AC=\\sqrt{\\left(${xC}-${ecriture_parenthese_si_negatif(xA)}\\right)^{2}+\\left(${yC}-${ecriture_parenthese_si_negatif(yA)}\\right)^{2}}$<br>`
                    texte_corr += `$\\phantom{De même :       } AC=\\sqrt{${XAC}+${YAC}}$<br>`
                    texte_corr +=`$\\phantom{De même :       } AC=\\sqrt{${tex_nombre(XAC+YAC)}}$<br>`
                    if (extraire_racine_carree(AC)[0]!=1) texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AC=${tex_racine_carree(AC)}$<br>`
                    texte_corr +=`On observe que $AC=AB$ donc le point $A$ est équidistant de $B$ et $C$.`
                     texte_corr +=`<br>Le point $C$ appartient bien au cercle de centre $A$ et passant par $B$.`
                    ;   
                   break ;
             case 3 : 
        
              
                   xA=randint(0,5)*choice([-1,1])
                   yA=randint(0,9)*choice([-1,1])
                   ux=randint(0,9)*choice([-1,1])
                   uy=randint(0,9)*choice([-1,1])
                   xB=xA+ux
                   yB=yA+uy
                   xC=xA+uy*choice([-1,1])+randint(1,3)
                   yC=yA+ux*choice([-1,1])

                   XAB=(xB-xA)*(xB-xA)
                   YAB=(yB-yA)*(yB-yA);
                   AB=XAB+YAB;
                   XAC=(xC-xA)*(xC-xA)
                   YAC=(yC-yA)*(yC-yA);
                   AC=XAC+YAC;
                
                    texte =`Dans un repère orthonormé (O,I,J), on donne les points suivants :`
                    texte +=` $A\\left(${xA};${yA}\\right)$ ; $B\\left(${xB};${yB}\\right).$`
                    texte += `<br>Le point $C\\left(${xC};${yC}\\right)$ appartient-il au cercle de centre $A$ passant par $B$ ?`;
                                   
                    texte_corr = `Le point $C$ appartient au cercle de centre $A$ passant par $B$ si et seulement si $CA=CB.$`
                    texte_corr += `<br>On calcule séparément donc ces deux distances :`
                    texte_corr += `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d'un repère orthonormé,`
                    texte_corr +=` alors on a : $AB=\\sqrt{\\left(x_B-x_A\\right)^{2}+\\left(y_B-y_A\\right)^{2}}.$<br>`
                    texte_corr +=`On applique la relation à l'énoncé : $AB=\\sqrt{\\left(${xB}-${ecriture_parenthese_si_negatif(xA)}\\right)^{2}+\\left(${yB}-${ecriture_parenthese_si_negatif(yA)}\\right)^{2}}$<br>`
                    texte_corr += `$\\phantom{On applique la relation à l'énoncé :        } AB=\\sqrt{${XAB}+${YAB}}$<br>`
                    texte_corr +=`$\\phantom{On applique la relation à l'énoncé :        } AB=\\sqrt{${tex_nombre(XAB+YAB)}}$<br>`
                    if (extraire_racine_carree(AB)[0]!=1) texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AB=${tex_racine_carree(AB)}$<br>`
                    texte_corr +=`De même : $AC=\\sqrt{\\left(${xC}-${ecriture_parenthese_si_negatif(xA)}\\right)^{2}+\\left(${yC}-${ecriture_parenthese_si_negatif(yA)}\\right)^{2}}$<br>`
                    texte_corr += `$\\phantom{De même :       } AC=\\sqrt{${XAC}+${YAC}}$<br>`
                    texte_corr +=`$\\phantom{De même :       } AC=\\sqrt{${tex_nombre(XAC+YAC)}}$<br>`
                    if (extraire_racine_carree(AC)[0]!=1) texte_corr +=`$\\phantom{On applique la relation à l'énoncé :   } AC=${tex_racine_carree(AC)}$<br>`    
                    texte_corr +=`On observe que $AC\\neq AB$ donc le point $C$ n'appartient pas au cercle de centre $A$ et passant par $B$`

                    ;   
                   break ;
            } 
            if (this.liste_questions.indexOf(texte)==-1)
                { // Si la question n'a jamais été posée, on en créé une autre
                this.liste_questions.push(texte);
                this.liste_corrections.push(texte_corr);
                i++;
                }
            cpt++;  
        }
        liste_de_question_to_contenu(this);
    }
     this.besoin_formulaire_numerique = ['Niveau de difficulté', 2, '1 : Application directe de la formule 2 : Application en situation'];
}   

/**
 * 2N25
 * @Auteur Stéphane Guyon
 */
function union_et_intersection_intervalles_de_R()
{
Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Utiliser et comprendre les symboles $\\cup $ et $\\cap $ avec les intervalles de $\\mathbb{R}$";
    this.consigne = "Répondre aux questions suivantes: :"
    this.nb_questions = 4;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.sup = 1 ; // 

    this.nouvelle_version = function(numero_de_l_exercice)
    {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles = [1,2,3,4,5,6,7,8,9,10];
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) ;
    for (let i = 0, a,b,c,d,s, e,f,A,B,c1,c2,c3,c4, X1,X2,int,int1,int2, axe, texte, texte_corr, cpt=0; 
        i < this.nb_questions && cpt<50; ) 
        {
            type_de_questions = liste_type_de_questions[i];
        switch (type_de_questions)
            {
                        // Cas par cas, on définit le type de nombres que l'on souhaite
                        // Combien de chiffres ? Quelles valeurs ?
                case 1 : 
                    a = randint(1,15);
                        e=a+1;
                    b = randint(e,25);
                        e=b+1;
                    c = randint(e,35);
                        e=c+1;
                    d = randint(e,45);
                    s = segment(0,0,10,0);
                    s.styleExtremites = '->';
                    X1 = point(0,0);
                    X2 = point(12,0);
                    A = point(2,0,a,'red');
                    B = point(5,0,b);
                    C = point(6,0,c);
                    D = point(9,0,d);
                    c1 = crochetD(A,'red');
                    c2 = crochetG(B,'red');
                    c3 = crochetD(C,'blue');
                    c4 = crochetG(D,'blue');
                    int = intervalle(X1,X2,'black',0);
                    int1 = intervalle(A,B,'red',0);
                    int2 = intervalle(C,D,'blue',0);


                    texte = `Donner si possible, une écriture simplifiée de $I=[${a};${b}] \\cap [${c};${d}].$`
                      ;
                        
                    texte_corr = mathalea2d({
                      xmin : -2,
                      ymin : -2,
                      xmax : 15,
                      ymax : 2
                    },int,int1,int2,A,B,C,D,c1,c2,c3,c4)
                    texte_corr += `<br>On cherche les réels qui sont à la fois dans $[${a};${b}]$ et dans $[${c};${d}]$.`
                    texte_corr += `<br>On regarde la partie de l'intervalle qui est coloriée à la fois en bleu et en rouge :<br>`
                    texte_corr += `<br>Les deux ensembles sont disjoints, ils n'ont aucun élément en commun.<br>
                    $I=\\emptyset$`;                     
                    break ;
                case 2 : 
                    a = randint(1,15);
                        e=a+1;
                    b = randint(e,25);
                        e=b+1;
                    c = randint(e,35);
                        e=c+1;
                    d = randint(e,45);
                      s = segment(0,0,10,0);
                    s.styleExtremites = '->';
                    X1 = point(0,0);
                    X2 = point(12,0);
                    A = point(2,0,a);
                    B = point(5,0,b);
                    C = point(6,0,c);
                    D = point(9,0,d);
                     c1 = crochetD(A,'red');
                    c2 = crochetG(B,'red');
                    c3 = crochetD(C,'blue');
                    c4 = crochetG(D,'blue');
                    int = intervalle(X1,X2,'black',0);
                    int1 = intervalle(A,B,'red',0);
                    int2 = intervalle(C,D,'blue',0);
                    texte = `Donner si possible, une écriture simplifiée de $I=[${a};${b}] \\cup [${c};${d}].$`;
                    texte_corr = mathalea2d({
                      xmin : -2,
                      ymin : -2,
                      xmax : 15,
                      ymax : 2
                    },int,int1,int2,A,B,C,D,c1,c2,c3,c4)
                    texte_corr += `<br>On cherche les réels qui sont ou bien dans $[${a};${b}]$, ou bien dans $[${c};${d}]$.`
                    texte_corr += `<br>On donc regarde la partie de l'intervalle qui est coloriée, soit en bleu, soit en rouge, soit en bleu et rouge :<br>`
                    texte_corr += `<br>Les deux ensembles sont disjoints, ils n'ont aucun élément en commun.<br>
                    On ne peut pas simplifier l'écriture de $I$ qui s'écrit donc $I=[${a};${b}] \\cup [${c};${d}].$`;                     
                    break ;
                case 3 : 
                    a = randint(1,15);
                        e=a+4;
                    b = randint(29,45);
                        e=b-1;
                    c = randint(16,e);
                        e=b+1;
                    d = randint(e,65);
                    s = segment(0,0,10,0);
                    s.styleExtremites = '->';
                    X1 = point(0,0);
                    X2 = point(12,0);
                    A = point(2,0,a);
                    B = point(6,0,b);
                    C = point(5,0,c);
                    D = point(9,0,d);
                    c1 = crochetD(A,'red');
                    c2 = crochetG(B,'red');
                    c3 = crochetD(C,'blue');
                    c4 = crochetG(D,'blue');
                    int = intervalle(X1,X2,'black',0);
                    int1 = intervalle(A,B,'red',-0.1);
                    int2 = intervalle(C,D,'blue',0.1);
                    texte = `Donner si possible, une écriture simplifiée de $I=[${a};${b}] \\cap [${c};${d}].$`;
                    texte_corr = mathalea2d({
                      xmin : -2,
                      ymin : -2,
                      xmax : 15,
                      ymax : 2
                    },int,int1,int2,A,B,C,D,c1,c2,c3,c4)

                    texte_corr += `<br>On cherche les réels qui sont à la fois dans $[${a};${b}]$ et dans $[${c};${d}]$.`
                    texte_corr += `<br>On regarde la partie de l'intervalle qui est coloriée à la fois en bleu et en rouge :<br>`
                     texte_corr += `$I=[${c};${b}]$`;                     
                    break ;
                case 4 : 
                   a = randint(1,15);
                        e=a+4;
                    b = randint(29,45);
                        e=b-1;
                    c = randint(16,e);
                        e=b+1;
                    d = randint(e,65);
                    s = segment(0,0,10,0);
                    s.styleExtremites = '->';
                    X1 = point(0,0);
                    X2 = point(12,0);
                    A = point(2,0,a);
                    B = point(6,0,b);
                    C = point(5,0,c);
                    D = point(9,0,d);
                    c1 = crochetD(A,'red');
                    c2 = crochetG(B,'red');
                    c3 = crochetD(C,'blue');
                    c4 = crochetG(D,'blue');
                    int = intervalle(X1,X2,'black',0);
                    int1 = intervalle(A,B,'red',-0.1);
                    int2 = intervalle(C,D,'blue',0.1);
                    texte = `Donner si possible, une écriture simplifiée de $I=[${a};${b}] \\cup [${c};${d}].$`;
                     texte_corr = mathalea2d({
                      xmin : -2,
                      ymin : -2,
                      xmax : 15,
                      ymax : 2
                    },int,int1,int2,A,B,C,D,c1,c2,c3,c4)
                     texte_corr += `<br>On cherche les réels qui sont ou bien dans $[${a};${b}]$, ou bien dans $[${c};${d}]$.`
                    texte_corr += `<br>On donc regarde la partie de l'intervalle qui est coloriée, soit en bleu, soit en rouge, soit en bleu et rouge :<br>`
                    texte_corr += `$I=[${a};${d}]$`;                     
                    break ;
                case 5 : 
                    a = randint(1,15);
                        e=a+15;
                    b = randint(e,35);
                        e=a+1;
                        f=b-10
                    c = randint(e,f);
                        e=c+1;
                    d = randint(e,f);
                     s = segment(0,0,10,0);
                    s.styleExtremites = '->';
                    X1 = point(0,0);
                    X2 = point(12,0);
                    A = point(2,0,a);
                    B = point(9,0,b);
                    C = point(5,0,c);
                    D = point(7,0,d);
                    c1 = crochetD(A,'red');
                    c2 = crochetG(B,'red');
                    c3 = crochetD(C,'blue');
                    c4 = crochetG(D,'blue');
                    int = intervalle(X1,X2,'black',0);
                    int1 = intervalle(A,B,'red',-0.1);
                    int2 = intervalle(C,D,'blue',0.1);
                    texte = `Donner si possible, une écriture simplifiée de $I=[${a};${b}] \\cap [${c};${d}].$`;
                    texte_corr = mathalea2d({
                      xmin : -2,
                      ymin : -2,
                      xmax : 15,
                      ymax : 2
                    },int,int1,int2,A,B,C,D,c1,c2,c3,c4)
                    texte_corr += `<br>On cherche les réels qui sont à la fois dans $[${a};${b}]$ et dans $[${c};${d}]$.`
                    texte_corr += `<br>On donc regarde la partie de l'intervalle qui est coloriée en bleu et rouge :<br>`
                    texte_corr += `On observe que $[${c};${d}]\\subset [${a};${b}]$ donc $I=[${c};${d}].$`;                     
                    break ;
                 case 6 : 
                    a = randint(1,15);
                        e=a+15;
                    b = randint(e,35);
                        e=a+1;
                        f=b-10
                    c = randint(e,f);
                        e=c+1;
                    d = randint(e,f);
                       s = segment(0,0,10,0);
                    s.styleExtremites = '->';
                    X1 = point(0,0);
                    X2 = point(12,0);
                    A = point(2,0,a);
                    B = point(9,0,b);
                    C = point(5,0,c);
                    D = point(7,0,d);
                    c1 = crochetD(A,'red');
                    c2 = crochetG(B,'red');
                    c3 = crochetD(C,'blue');
                    c4 = crochetG(D,'blue');
                    int = intervalle(X1,X2,'black',0);
                    int1 = intervalle(A,B,'red',-0.1);
                    int2 = intervalle(C,D,'blue',0.1);
                    texte = `Donner si possible, une écriture simplifiée de $I=[${a};${b}] \\cup [${c};${d}].$`;
                     texte_corr = mathalea2d({
                      xmin : -2,
                      ymin : -2,
                      xmax : 15,
                      ymax : 2
                    },int,int1,int2,A,B,C,D,c1,c2,c3,c4)
                     texte_corr += `<br>On cherche les réels qui sont ou bien dans $[${a};${b}]$, ou bien dans $[${c};${d}]$.`
                    texte_corr += `<br>On donc regarde la partie de l'intervalle qui est coloriée soit en bleu, soit en rouge, soit en bleu et rouge :<br>`
                    texte_corr += `On $[${c};${d}]\\subset [${a};${b}]$ donc $I=[${a};${b}].$`;                     
                    break ;
                case 7 : 
                    a = randint(1,15);
                        e=a+1;
                    b = randint(e,25);
                        e=b+1;
                    c = randint(e,35);
                        e=c+1;
                    d = randint(e,45);
                    s = segment(0,0,10,0);
                    s.styleExtremites = '->';
                    X1 = point(0,0);
                    X2 = point(12,0);
                    A = point(2,0,a,'red');
                    B = point(5,0,b);
                    C = point(6,0,c);
                    D = point(9,0,d);
                    c1 = crochetG(A,'red');
                    c2 = crochetG(B,'red');
                    c3 = crochetD(C,'blue');
                    c4 = crochetG(D,'blue');
                    int = intervalle(X1,X2,'black',0);
                    int1 = intervalle(A,B,'red',0);
                    int2 = intervalle(C,D,'blue',0);


                    texte = `Donner si possible, une écriture simplifiée de $I=]${a};${b}] \\cap [${c};${d}].$`
                      ;
                        
                    texte_corr = mathalea2d({
                      xmin : -2,
                      ymin : -2,
                      xmax : 15,
                      ymax : 2
                    },int,int1,int2,A,B,C,D,c1,c2,c3,c4)
                    texte_corr += `<br>On cherche les réels qui sont à la fois dans $]${a};${b}]$ et dans $[${c};${d}]$.`
                    texte_corr += `<br>On donc regarde la partie de l'intervalle qui est coloriée en bleu et rouge :<br>`
                    texte_corr +=`<br>Aucun réel n'appartient aux deux ensembles.<br>
                    $I=\\emptyset$`;                     
                    break ;
                case 8 : 
                    a = randint(1,15);
                        e=a+1;
                    b = randint(e,25);
                        e=b+1;
                    c = randint(e,35);
                        e=c+1;
                    d = randint(e,45);
                      s = segment(0,0,10,0);
                    s.styleExtremites = '->';
                    X1 = point(0,0);
                    X2 = point(12,0);
                    A = point(2,0,a);
                    B = point(5,0,b);
                    C = point(6,0,c);
                    D = point(9,0,d);
                    c1 = crochetD(A,'red');
                    c2 = crochetG(B,'red');
                    c3 = crochetD(C,'blue');
                    c4 = crochetD(D,'blue');
                    int = intervalle(X1,X2,'black',0);
                    int1 = intervalle(A,B,'red',0);
                    int2 = intervalle(C,D,'blue',0);
                    texte = `Donner si possible, une écriture simplifiée de $I=[${a};${b}] \\cup [${c};${d}[.$`;
                    texte_corr = mathalea2d({
                      xmin : -2,
                      ymin : -2,
                      xmax : 15,
                      ymax : 2
                    },int,int1,int2,A,B,C,D,c1,c2,c3,c4)
                    texte_corr += `<br>On cherche les réels qui sont ou bien dans $[${a};${b}]$, ou bien dans $[${c};${d}[$.`
                    texte_corr += `<br>On donc regarde la partie de l'intervalle qui est coloriée soit en bleu, soit en rouge, soit en bleu et rouge :`
                    texte_corr += `<br>Les deux ensembles sont disjoints, ils n'ont aucun élément en commun.<br>
                    On ne peut pas simplifier l'écriture de $I$ qui s'écrit donc $I=[${a};${b}] \\cup [${c};${d}[.$`;                     
                    break ;
                case 9 : 
                    a = randint(1,15);
                        e=a+4;
                    b = randint(29,45);
                        e=b-1;
                    c = randint(16,e);
                        e=b+1;
                    d = randint(e,65);
                    s = segment(0,0,10,0);
                    s.styleExtremites = '->';
                    X1 = point(0,0);
                    X2 = point(12,0);
                    A = point(2,0,a);
                    B = point(6,0,b);
                    C = point(5,0,c);
                    D = point(9,0,d);
                    c1 = crochetG(A,'red');
                    c2 = crochetD(B,'red');
                    c3 = crochetD(C,'blue');
                    c4 = crochetG(D,'blue');
                    int = intervalle(X1,X2,'black',0);
                    int1 = intervalle(A,B,'red',-0.1);
                    int2 = intervalle(C,D,'blue',0.1);
                    texte = `Donner si possible, une écriture simplifiée de $I=]${a};${b}[ \\cap [${c};${d}].$`;
                    texte_corr = mathalea2d({
                      xmin : -2,
                      ymin : -2,
                      xmax : 15,
                      ymax : 2
                    },int,int1,int2,A,B,C,D,c1,c2,c3,c4)

                    texte_corr += `<br>On cherche les réels qui sont à la fois dans $]${a};${b}[$ et dans $[${c};${d}]$.`
                    texte_corr += `<br>On regarde la partie de l'intervalle qui est coloriée à la fois en bleu et en rouge :<br>`
                     texte_corr += `$I=[${c};${b}[$`;                     
                    break ;
                case 10 : 
                   a = randint(1,15);
                        e=a+4;
                    b = randint(29,45);
                        e=b-1;
                    c = randint(16,e);
                        e=b+1;
                    d = randint(e,65);
                    s = segment(0,0,10,0);
                    s.styleExtremites = '->';
                    X1 = point(0,0);
                    X2 = point(12,0);
                    A = point(2,0,a);
                    B = point(6,0,b);
                    C = point(5,0,c);
                    D = point(9,0,d);
                    c1 = crochetG(A,'red');
                    c2 = crochetD(B,'red');
                    c3 = crochetG(C,'blue');
                    c4 = crochetD(D,'blue');
                    int = intervalle(X1,X2,'black',0);
                    int1 = intervalle(A,B,'red',-0.1);
                    int2 = intervalle(C,D,'blue',0.1);
                    texte = `Donner si possible, une écriture simplifiée de $I=]${a};${b}[ \\cup ]${c};${d}[.$`;
                     texte_corr = mathalea2d({
                      xmin : -2,
                      ymin : -2,
                      xmax : 15,
                      ymax : 2
                    },int,int1,int2,A,B,C,D,c1,c2,c3,c4)
                     texte_corr += `<br>On cherche les réels qui sont ou bien dans $]${a};${b}[$, ou bien dans $]${c};${d}[$.`
                    texte_corr += `<br>On donc regarde la partie de l'intervalle qui est coloriée, soit en bleu, soit en rouge, soit en bleu et rouge :<br>`
                    texte_corr += `$I=]${a};${d}[$`;                     
                    break ;
            } 
            if (this.liste_questions.indexOf(texte)==-1)
                { // Si la question n'a jamais été posée, on en créé une autre
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
 * 2N24
 * @Stéphane Guyon
 */
function intervalles_de_R(){
Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Associer un intervalle de  $\\mathbb{R}$ à une inéquation et son schéma sur une droite graduée";
    this.consigne = "Répondre aux questions suivantes: :"
    this.nb_questions = 4;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.sup = 1 ; // 

    this.nouvelle_version = function(numero_de_l_exercice){
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) ;
    for (let i = 0, a,b,c,d,e,s,X1,X2,X,A,B,c1,c2,int,int1, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) {
            type_de_questions = liste_type_de_questions[i];
       
      
        s = segment(0,0,12,0);
        s.styleExtremites = '->';
        X1 = point(0,0);
        X2 = point(12,0);
       
            
        int = intervalle(X1,X2,'black',0);
    
    switch (type_de_questions){
                        // Cas par cas, on définit le type de nombres que l'on souhaite
                        // Combien de chiffres ? Quelles valeurs ?
            
                case 1 : 
                    a = randint(1,15);
                    b = randint(a,25);
                    A = point(2,0,a);
                    B = point(6,0,b);
                    X = point(11.5,0);
                    c1 = crochetG(A,'red');
                    int1 = intervalle(A,X2,'red',-0.1);
                    texte = `Déterminer l'intervalle $I$ de $\\mathbb{R}$ correspondant à l'inéquation $x>${a}$ et représenter l'intervalle sur une droite graduée.`;
                    texte_corr = mathalea2d({
                      xmin : -2,
                      ymin : -2,
                      xmax : 15,
                      ymax : 2
                    },s,int,int1,A,B,c1)
                    texte_corr += `<br>$I=]${a};+\\infty[$`;                     
                    break ;
                
                case 2 : 
                    a = randint(1,15);
                    b = randint(a,25); 
                    A = point(2,0,a);
                    B = point(6,0,b);
                     X2 = point(12,0);
                    c1 = crochetD(A,'red');
                    int1 = intervalle(A,X2,'red',-0.1);
                    texte = `Déterminer l'intervalle $I$ de $\\mathbb{R}$ correspondant à l'inéquation $x\\geqslant ${a}$ et représenter l'intervalle sur une droite graduée.`;
                    texte_corr = mathalea2d({
                      xmin : -2,
                      ymin : -2,
                      xmax : 15,
                      ymax : 2
                    },s,int,int1,c1)
                    texte_corr += `$I=[${a};+\\infty[$`;
                    break ;

                case 3 : 
                    a = randint(1,15);
                    b = randint(a,25);
                    A = point(2,0,a);
                    B = point(6,0,b);
                    c1 = crochetD(A,'red');
                    int1 = intervalle(X1,A,'red',-0.1);
                    texte = `Déterminer l'intervalle $I$ de $\\mathbb{R}$ correspondant à l'inéquation $x<${a}$ et représenter l'intervalle sur une droite graduée.`;
                    texte_corr = mathalea2d(-2,-2,15,2,s,int,int1,A,c1)
                    texte_corr += `$I=]-\\infty;${a}[$`; 
                    break ;
                
                case 4 : 
                    a = randint(1,15);
                    b = randint(a,25);
                     A = point(2,0,a);
                    B = point(6,0,b);
                    c1 = crochetG(A,'red');
                    int1 = intervalle(X1,A,'red',-0.1);
                    texte = `Déterminer l'intervalle $I$ de $\\mathbb{R}$ correspondant à l'inéquation $x\\leqslant ${a}$ et représenter l'intervalle sur une droite graduée.`;
                    texte_corr = mathalea2d({
                      xmin : -2,
                      ymin : -2,
                      xmax : 15,
                      ymax : 2
                    },s,int,int1,A,c1)
                    texte_corr += `$I=]-\\infty;${a}]$`;
                    break ;
                
                case 5 : 
                    a = randint(1,15);
                    c=a+1;
                    b = randint(c,25);  
                    A = point(2,0,a);
                    B = point(6,0,b);
                    c1 = crochetG(A,'red');
                    c2 = crochetD(B,'red');
                    int1 = intervalle(A,B,'red',-0.1);                  
                    texte = `Déterminer l'intervalle $I$ de $\\mathbb{R}$ correspondant à l'inéquation $${a} < x < ${b}$ et représenter l'intervalle sur une droite graduée.`;
                     texte_corr = mathalea2d({
                      xmin : -2,
                      ymin : -2,
                      xmax : 15,
                      ymax : 2
                    },s,int,int1,A,B,c1,c2)
                     texte_corr += `$I=]${a};${b}[$`;
                    break ;

                case 6 : 
                    a = randint(1,15);
                    c=a+1;
                    b = randint(c,25);    
                     A = point(2,0,a);
                    B = point(6,0,b);
                    c1 = crochetD(A,'red');
                    c2 = crochetD(B,'red');
                    int1 = intervalle(A,B,'red',-0.1);                  
                    texte = `Déterminer l'intervalle $I$ de $\\mathbb{R}$ correspondant à l'inéquation $${a}\\leqslant x<${b}$ et représenter l'intervalle sur une droite graduée.`;
                                 texte_corr = mathalea2d({
                      xmin : -2,
                      ymin : -2,
                      xmax : 15,
                      ymax : 2
                    },s,int,int1,A,B,c1,c2)
                                 texte_corr += `$I=[${a};${b}[$`;
                    break ;
                
                case 7 : 
                    a = randint(1,15);
                    c=a+1;
                    b = randint(c,25);
                       A = point(2,0,a);
                    B = point(6,0,b);
                    c1 = crochetD(A,'red');
                    c2 = crochetG(B,'red');
                    int1 = intervalle(A,B,'red',-0.1);  
                    texte = `Déterminer l'intervalle $I$ de $\\mathbb{R}$ correspondant à l'inéquation $${a}\\leqslant x\\leqslant ${b}$ et représenter l'intervalle sur une droite graduée.`;
                      texte_corr = mathalea2d({
                      xmin : -2,
                      ymin : -2,
                      xmax : 15,
                      ymax : 2
                    },s,int,int1,A,B,c1,c2)
                      texte_corr += `$I=[${a};${b}]$`;
                    break ;
                
                case 8 :
                    a = randint(1,15);
                    c=a+1;
                    b = randint(c,25);
                    A = point(2,0,a);
                    B = point(6,0,b);
                    c1 = crochetG(A,'red');
                    c2 = crochetG(B,'red');
                    int1 = intervalle(A,B,'red',-0.1);  
                    texte = `Déterminer l'intervalle $I$ de $\\mathbb{R}$ correspondant à l'inéquation $${a}< x\\leqslant ${b}$ et représenter l'intervalle sur une droite graduée.`;
                      texte_corr = mathalea2d({
                      xmin : -2,
                      ymin : -2,
                      xmax : 15,
                      ymax : 2
                    },s,int,int1,A,B,c1,c2)
                      texte_corr += `$I=]${a};${b}]$`;
                    break ;
                
                case 9 : 
                    a = randint(1,15);
                    c=a+1;
                    b = randint(c,25);
                    A = point(2,0,a);
                    B = point(6,0,b);
                    c1 = crochetG(A,'red');
                    c2 = crochetG(B,'red');
                    int1 = intervalle(A,B,'red',-0.1);  
                    texte = `Déterminer l'inéquation correspondant à $x \\in ]${a};${b}]$ et représenter l'intervalle sur une droite graduée.`;
                    texte_corr = mathalea2d({
                      xmin : -2,
                      ymin : -2,
                      xmax : 15,
                      ymax : 2
                    },s,int,int1,A,B,c1,c2)
                    texte_corr += `$${a}< x\\leqslant ${b}$`;  
                     break ;
                case 10 : 
                    a = randint(1,15);
                    c=a+1;
                    b = randint(c,25);
                    A = point(2,0,a);
                    B = point(6,0,b);
                    c1 = crochetD(A,'red');
                    c2 = crochetG(B,'red');
                    int1 = intervalle(A,B,'red',-0.1);  
                    texte = `Déterminer l'inéquation correspondant à $x \\in [${a};${b}]$ et représenter l'intervalle sur une droite graduée.`; 
                     texte_corr = mathalea2d({
                      xmin : -2,
                      ymin : -2,
                      xmax : 15,
                      ymax : 2
                    },s,int,int1,A,B,c1,c2)
                     texte_corr += `$${a}\\leqslant x\\leqslant ${b}$`;  
                     break ;
                case 11 : 
                    a = randint(1,15);
                    c=a+1;
                    b = randint(c,25);
                     A = point(2,0,a);
                    B = point(6,0,b);
                    c1 = crochetD(A,'red');
                    c2 = crochetD(B,'red');
                    int1 = intervalle(A,B,'red',-0.1);  
                    texte = `Déterminer l'inéquation correspondant à $x \\in [${a};${b}[$ et représenter l'intervalle sur une droite graduée.`;
                       texte_corr = mathalea2d({
                      xmin : -2,
                      ymin : -2,
                      xmax : 15,
                      ymax : 2
                    },s,int,int1,A,B,c1,c2)  
                     texte_corr += `$${a}\\leqslant x< ${b}$`; 
                     break ;
                case 12 : 
                    a = randint(1,15);
                    c=a+1;
                    b = randint(c,25);
                    A = point(2,0,a);
                    B = point(12,0,b);
                    c1 = crochetG(A,'red');
                    
                    int1 = intervalle(A,B,'red',-0.1);  texte = `Déterminer l'inéquation correspondant à $x \\in ]${a};+\\infty[ et représenter l'intervalle sur une droite graduée.$`;
                       texte_corr = mathalea2d({
                      xmin : -2,
                      ymin : -2,
                      xmax : 15,
                      ymax : 2
                    },s,int,int1,A,B,c1)  
                       texte_corr += `$x > ${a}$`;    
                         break ;
                case 13 : 
                    a = randint(1,15);
                    c=a+1;
                    b = randint(c,25);
                     A = point(7,0,a);
                    B = point(12,0,b);
                    c1 = crochetD(A,'red');
                    
                    int1 = intervalle(X1,A,'red',-0.1);
                    texte = `Déterminer l'inéquation correspondant à $x \\in ]-\\infty;${a}[$ et représenter l'intervalle sur une droite graduée.`;
                      texte_corr = mathalea2d({
                      xmin : -2,
                      ymin : -2,
                      xmax : 15,
                      ymax : 2
                    },s,int,int1,A,B,c1)  
                      texte_corr += `$x < ${a}$`; 
                         break ;   
                case 14 : 
                    a = randint(1,15);
                    c=a+1;
                    b = randint(c,25);
                       A = point(7,0,a);
                    B = point(12,0,b);
                    c1 = crochetG(A,'red');
                    
                    int1 = intervalle(X1,A,'red',-0.1);
                    texte = `Déterminer l'inéquation correspondant à $x \\in ]-\\infty;${a}]$ et représenter l'intervalle sur une droite graduée.`;
                      texte_corr = mathalea2d({
                      xmin : -2,
                      ymin : -2,
                      xmax : 15,
                      ymax : 2
                    },s,int,int1,A,B,c1)  
                      texte_corr += `$x \\leqslant ${a}$`;   
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

/**
 * 2N23
 * @Auteur Stéphane Guyon
 */
function valeur_absolue_et_equation(){
Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Résoudre une équation avec des valeurs absolues";
    this.consigne = "Résoudre dans $\\mathbb{R}$ les équations suivantes  :"
    this.nb_questions = 4;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.sup = 1 ; // 
    this.correction_detaille_disponible = true;
    sortie_html ? this.correction_detaillee = true : this.correction_detaillee = false;

    this.nouvelle_version = function(numero_de_l_exercice){
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles = [1,2,2,2,2,2];
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) ;
    for (let i = 0, a,b,c,d,e, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) {
            type_de_questions = liste_type_de_questions[i];
    switch (type_de_questions){
                        // Cas par cas, on définit le type de nombres que l'on souhaite
                        // Combien de chiffres ? Quelles valeurs ?
            
                case 1 : 
        
                a = randint(1,15)*choice([-1,1]);
                b = randint(1,15)*(-1);
                    
                    texte = `$\\vert x ${ecriture_algebrique(a)}\\vert =${b}$`;
                    {texte_corr = ` ${b} étant négatif, il n'existe pas de solution à cette équation. $S=\\emptyset$`;}
                   

                        
                    break ;
               case 2 : 
        
                a = randint(1,15)*choice([-1,1]);
                b = randint(1,15);
                c=-a;
                      texte = `$\\vert x ${ecriture_algebrique(a)}\\vert =${b}$`;
                   
                    texte_corr = `Résoudre cette équation est équivalent à résoudre ces deux équations :<br>
                    $x ${ecriture_algebrique(a)} =${b}$ et    $x ${ecriture_algebrique(a)} =${-b}$<br>
                    Il existe donc deux solutions à cette équation :<br>
                    $x_1=${c} ${ecriture_algebrique(b)}$ et $x_2=${c} -${ecriture_parenthese_si_negatif(b)}$<br>
                    $S=\\{${c-b};${c+b}\\}$`;
                    if (this.correction_detaillee) {
                        let s = segment(point(0,0),point(12,0));
                        s.styleExtremites='->';
                        let x0 = point(3,0)
                        x0.nom = c-b
                        x0.positionLabel = 'below'
                        let A = point(6,0,c)
                        A.nom = c
                        A.positionLabel = 'below'
                        let x1 = point(9,0,c+b,'below')
                        x1.nom = c+b
                        x1.positionLabel = 'below'
                        let s1 = segmentAvecExtremites(x0,x1)
                        s1.color = 'blue'
                        s1.epaisseur = 2
                        let s2 = segmentAvecExtremites(x0,A)
                        let l = labelPoint(A,x0,x1)
                        let cote = segment(point(3,1),point(5.95,1))
                        cote.styleExtremites = '<->'
                        let texteCote = texteParPosition(b,4.5,1.6)
                        let cote2 = segment(point(6.05,1),point(9,1))
                        cote2.styleExtremites = '<->'
                        let texteCote2 = texteParPosition(b,7.5,1.6)
                        texte_corr += mathalea2d({xmin:-1,xmax:13,ymin:-2,ymax:2.5},
                            s,s1,s2,l,cote,texteCote,cote2,texteCote2)
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
    
}

/**
 * 2N22
 * @Auteur Stéphane Guyon
 */
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
    let type_de_questions_disponibles = [1,2,3];
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
                 case 3 : 
        
                a = randint(2,5);
                b = randint(2,7,4); 
                c= Math.sqrt(b);

                    texte = `$\\vert \\sqrt{${b}} - ${a}\\vert = \\dots $`;
                  
                    if (c>a) {texte_corr = `On a : $${b} > ${a*a}$ donc $\\sqrt{${b}} > ${a}$ <br>
                        $\\sqrt{${b}}- ${a}$ est donc un nombre positif, il en resulte que  $\\vert \\sqrt{${b}} - ${a}\\vert = \\sqrt{${b}} - ${a}$`;}
                    else {texte_corr = `On a : $${b}< ${a*a}$ donc $\\sqrt{${b}} < ${a}$ <br>
                        $\\sqrt{${b}}- ${a}$ est donc un nombre négatif, il en resulte que  $\\vert \\sqrt{${b}} -${a}\\vert = ${a}-\\sqrt{${b}}  $`;}


                        
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

/**
 * 2N12-1
 * @Auteur Stéphane Guyon
 */
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
/**
 * 2N12
 * @Auteur Stéphane Guyon
 */
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


/**
 * 2N21
 * @Auteur Stéphane Guyon
 */
function parite()
{
Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Déterminer la parité d'une expression";
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
                        if (a%2==0 && a!=2) {
                        texte_corr = `${a}$n=2\\times ${tex_nombre(a/2)}n$<br>
                        Comme $${tex_nombre(a/2)}n$ est un entier naturel, ${a}$n$ s'écrit comme le double d'un entier naturel, il est donc pair`;
                        }
                        if (a==2) {
                        texte_corr = `${a}$n=2\\times n$<br>
                        Comme $n$ est un entier naturel, ${a}$n$ s'écrit comme le double d'un entier naturel, il est donc pair`;
                        }
                   
                        if (a==3) {
                        texte_corr = `${a}$n=2n+n$<br>
                            Comme $n$ est un entier naturel, $2 n$ est un nombre pair.<br>
                            Si $n$ est pair, $2n+n$ est la somme de deux nombres pairs, il sera donc pair. <br>
                            Si $n$ est impair, $2n+n$ est la somme d'un nombre pair et d'un impair, il sera donc impair. <br>
                            Au final, ${a}$n$ a donc la même parité que $n$.`;
                            }
                        if  (a%2!=0 && a!=3) {
                        texte_corr = `${a}$n=2\\times ${tex_nombre((a-1)/2)}n+n$<br>
                            Comme $${tex_nombre((a-1)/2)}n$ est un entier naturel, $2\\times ${tex_nombre((a-1)/2)}n$ est un nombre pair.<br>
                            Si $n$ est pair, $2\\times${tex_nombre((a-1)/2)}n+n$ est la somme de deux nombres pairs, il sera donc pair. <br>
                            Si $n$ est impair, $2\\times${tex_nombre((a-1)/2)}n+n$ est la somme d'un nombre pair et d'un impair, il sera donc impair. <br>
                            Au final, ${a}$n$ a donc la même parité que $n$.`;
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


/**
 * 2N20
 * @Auteur Stéphane Guyon
 */
function ensemble_de_nombres(){
Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Déterminer le plus petit ensemble de nombres dans lequel le nombre proposé appartient";
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

/**
 * 2N10-1
 * @Auteur Stéphane Guyon
 */
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
 
/**
 * 2N11-1
 * @Auteur Stéphane Guyon
 */
function Simplifier_une_somme_de_racines_carrees() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Simplifier une somme de racines carrées";
    this.consigne = " Simplifier une somme de racines carrées"
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

            texte = `Écrire $A=${e1}\\sqrt{${d1}} ${ecriture_algebrique(e2)}\\sqrt{${d2}} ${ecriture_algebrique(e3)}\\sqrt{${d3}}$ sous la forme $a\\sqrt{${c}}$ où $a$ est un entier:`
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
/**
 * 2N10
 * @Auteur Stéphane Guyon
 */
function Existence_d_une_racine_carree(){
Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Existence d'une racine carrée";
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

/**
 * 2N11
 * @Auteur Stéphane Guyon
 */
function Extraire_un_carre_parfait_d_une_racine_carree() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Ecrire le nombre proposé sous la forme $a\\sqrt{b}$";
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
* 2L10
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
* 2L11
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
